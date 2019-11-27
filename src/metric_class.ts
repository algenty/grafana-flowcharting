import FlowChartingPlugin from './plugin';
import grafana from './grafana_func';
import _ from 'lodash';

import * as gf from '../types/flowcharting';
declare var GFP: FlowChartingPlugin;

/**
 *
 *
 * @export
 * @class Metric
 */
export default class Metric {
  type: string = 'unknow';
  scopedVars: any;
  metrics: any;
  constructor(dataList: any) {}
}

/**
 * Serie data
 *
 * @export
 * @class Serie
 * @extends {Metric}
 */
export class Serie extends Metric {
  nullPointMode: string = 'connected';
  metrics: any = {};
  constructor(dataList: any) {
    super(dataList);
    this.type = 'timeseries';
    this.metrics = this.seriesHandler(dataList);
  }

  seriesHandler(seriesData) {
    const series = grafana.getTimeSeries(seriesData);
    series.flotpairs = series.getFlotPairs(this.nullPointMode);
    return series;
  }

  getValue(aggregator: gf.TAggregation): number | string | null {
    try {
      let value = this.metrics.stats[this.metrics.aggregation];
      if (value === undefined || value === null) {
        value = this.metrics.datapoints[this.metrics.datapoints.length - 1][0];
      }
      return value;
    } catch (error) {
      GFP.log.error('datapoint for serie is null', error);
      return null;
    }
  }
}

/**
 * Table data
 *
 * @export
 * @class Table
 * @extends {Metric}
 */
export class Table extends Metric {
  tableColumnOptions!: any;
  tableColumn: string = '';
  constructor(dataList: any) {
    super(dataList);
    this.type = 'table';
    debugger
    this.metrics.datapoints = this.tableHandler(dataList);
    debugger;
  }

  tableHandler(tableData:any) {
    const datapoints: any = [];
    const columnNames: any = {};

    // index columns {0: "Time", 1: "Value", 2: "Min", 3: "Max", 4: "Info"}
    tableData.columns.forEach((column, columnIndex) => {
      columnNames[columnIndex] = column.text;
    });

    this.tableColumnOptions = columnNames;
    if (!_.find(tableData.columns, ['text', this.tableColumn])) {
      this.setTableColumnToSensibleDefault(tableData);
    }

    tableData.rows.forEach(row => {
      const datapoint = {};
      row.forEach((value, columnIndex) => {
        const key = columnNames[columnIndex];
        datapoint[key] = value;
      });

      datapoints.push(datapoint);
    });
    return datapoints;
  }

  setTableColumnToSensibleDefault(tableData) {
    if (tableData.columns.length === 1) {
      this.tableColumn = tableData.columns[0].text;
    } else {
      this.tableColumn = _.find(tableData.columns, col => {
        return col.type !== 'time';
      }).text;
    }
  }

  getFlotPairs(fillStyle: string) {
    const result = [];
    this.metrics.state = {};
    for (let index = 0; index < columnNames.length; index++) {
      // const element = this.metrics.datapoints[index];
      this.metrics.stats[index].total = 0;
      this.metrics.stats[index].max = -Number.MAX_VALUE;
      this.metrics.stats[index].min = Number.MAX_VALUE;
      this.metrics.stats[index].logmin = Number.MAX_VALUE;
      this.metrics.stats[index].avg = null;
      this.metrics.stats[index].current = null;
      this.metrics.stats[index].first = null;
      this.metrics.stats[index].delta = 0;
      this.metrics.stats[index].diff = null;
      this.metrics.stats[index].range = null;
      this.metrics.stats[index].timeStep = Number.MAX_VALUE;
      this.allIsNull = true;
      this.allIsZero = true;
    }

    const ignoreNulls = fillStyle === 'connected';
    const nullAsZero = fillStyle === 'null as zero';
    let currentTime;
    let currentValue;
    let nonNulls = 0;
    let previousTime;
    let previousValue = 0;
    let previousDeltaUp = true;

    for (let i = 0; i < this.datapoints.length; i++) {
      currentValue = this.datapoints[i][0];
      currentTime = this.datapoints[i][1];

      // Due to missing values we could have different timeStep all along the series
      // so we have to find the minimum one (could occur with aggregators such as ZimSum)
      if (previousTime !== undefined) {
        const timeStep = currentTime - previousTime;
        if (timeStep < this.stats.timeStep) {
          this.stats.timeStep = timeStep;
        }
      }
      previousTime = currentTime;

      if (currentValue === null) {
        if (ignoreNulls) {
          continue;
        }
        if (nullAsZero) {
          currentValue = 0;
        }
      }

      if (currentValue !== null) {
        if (_.isNumber(currentValue)) {
          this.stats.total += currentValue;
          this.allIsNull = false;
          nonNulls++;
        }

        if (currentValue > this.stats.max) {
          this.stats.max = currentValue;
        }

        if (currentValue < this.stats.min) {
          this.stats.min = currentValue;
        }

        if (this.stats.first === null) {
          this.stats.first = currentValue;
        } else {
          if (previousValue > currentValue) {
            // counter reset
            previousDeltaUp = false;
            if (i === this.datapoints.length - 1) {
              // reset on last
              this.stats.delta += currentValue;
            }
          } else {
            if (previousDeltaUp) {
              this.stats.delta += currentValue - previousValue; // normal increment
            } else {
              this.stats.delta += currentValue; // account for counter reset
            }
            previousDeltaUp = true;
          }
        }
        previousValue = currentValue;

        if (currentValue < this.stats.logmin && currentValue > 0) {
          this.stats.logmin = currentValue;
        }

        if (currentValue !== 0) {
          this.allIsZero = false;
        }
      }

      result.push([currentTime, currentValue]);
    }

    if (this.stats.max === -Number.MAX_VALUE) {
      this.stats.max = null;
    }
    if (this.stats.min === Number.MAX_VALUE) {
      this.stats.min = null;
    }

    if (result.length && !this.allIsNull) {
      this.stats.avg = this.stats.total / nonNulls;
      this.stats.current = result[result.length - 1][1];
      if (this.stats.current === null && result.length > 1) {
        this.stats.current = result[result.length - 2][1];
      }
    }
    if (this.stats.max !== null && this.stats.min !== null) {
      this.stats.range = this.stats.max - this.stats.min;
    }
    if (this.stats.current !== null && this.stats.first !== null) {
      this.stats.diff = this.stats.current - this.stats.first;
    }

    this.stats.count = result.length;
    return result;
  }
}
