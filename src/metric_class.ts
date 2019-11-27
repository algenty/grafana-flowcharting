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
  metrics: any = {}
  name : string = '';
  nullPointMode: string = 'connected';
  constructor(dataList: any) { }
}

/**
 * Serie data
 *
 * @export
 * @class Serie
 * @extends {Metric}
 */
export class Serie extends Metric {
  constructor(dataList: any) {
    super(dataList);
    this.type = 'timeseries';
    this.name = dataList.alias;
    this.metrics = this.seriesHandler(dataList);
    console.log("TCL: Serie -> constructor -> this", this)

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
  allIsNull!: boolean;
  allIsZero!: boolean;
  constructor(dataList: any) {
    super(dataList);
    this.type = 'table';
    this.metrics = this.tableHandler(dataList);
    console.log("TCL: Table -> constructor -> this", this)
  }

  tableHandler(tableData: any) {
    const table: any = {
      datapoints: [],
      columnNames: {},
    }

    // index columns {0: "Time", 1: "Value", 2: "Min", 3: "Max", 4: "Info"}
    tableData.columns.forEach((column, columnIndex) => {
      table.columnNames[columnIndex] = column.text;
    });

    this.tableColumnOptions = table.columnNames;
    if (!_.find(tableData.columns, ['text', this.tableColumn])) {
      this.setTableColumnToSensibleDefault(tableData);
    }

    tableData.rows.forEach(row => {
      const datapoint = {};
      row.forEach((value, columnIndex) => {
        const key = table.columnNames[columnIndex];
        datapoint[key] = value;
      });

      table.datapoints.push(datapoint);
    });
    debugger
    this.metrics.flotpairs = this.getFlotPairs(this.nullPointMode);
    return table;
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
    const result = Array();
    this.metrics.state = {};
    const ignoreNulls = fillStyle === 'connected';
    const nullAsZero = fillStyle === 'null as zero';

    for(const index of this.tableColumnOptions) {
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

      let currentTime: any;
      let currentValue: any;
      let nonNulls = 0;
      let previousTime;
      let previousValue = 0;
      let previousDeltaUp = true;

      for (let i = 0; i < this.metrics.datapoints.length; i++) {
        currentValue = this.metrics.datapoints[i][0];
        currentTime = this.metrics.datapoints[i][1];

        // Due to missing values we could have different timeStep all along the series
        // so we have to find the minimum one (could occur with aggregators such as ZimSum)
        if (previousTime !== undefined) {
          const timeStep = currentTime - previousTime;
          if (timeStep < this.metrics.stats[index].timeStep) {
            this.metrics.stats[index].timeStep = timeStep;
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
            this.metrics.stats[index].total += currentValue;
            this.allIsNull = false;
            nonNulls++;
          }

          if (currentValue > this.metrics.stats[index].max) {
            this.metrics.stats[index].max = currentValue;
          }

          if (currentValue < this.metrics.stats[index].min) {
            this.metrics.stats[index].min = currentValue;
          }

          if (this.metrics.stats[index].first === null) {
            this.metrics.stats[index].first = currentValue;
          } else {
            if (previousValue > currentValue) {
              // counter reset
              previousDeltaUp = false;
              if (i === this.metrics.datapoints.length - 1) {
                // reset on last
                this.metrics.stats[index].delta += currentValue;
              }
            } else {
              if (previousDeltaUp) {
                this.metrics.stats[index].delta += currentValue - previousValue; // normal increment
              } else {
                this.metrics.stats[index].delta += currentValue; // account for counter reset
              }
              previousDeltaUp = true;
            }
          }
          previousValue = currentValue;

          if (currentValue < this.metrics.stats[index].logmin && currentValue > 0) {
            this.metrics.stats[index].logmin = currentValue;
          }

          if (currentValue !== 0) {
            this.allIsZero = false;
          }
        }
        result.push([currentTime, currentValue]);
      }

      if (this.metrics.stats[index].max === -Number.MAX_VALUE) {
        this.metrics.stats[index].max = null;
      }
      if (this.metrics.stats[index].min === Number.MAX_VALUE) {
        this.metrics.stats[index].min = null;
      }

      if (result.length && !this.allIsNull) {
        this.metrics.stats[index].avg = this.metrics.stats[index].total / nonNulls;
        this.metrics.stats[index].current = result[result.length - 1][1];
        if (this.metrics.stats[index].current === null && result.length > 1) {
          this.metrics.stats[index].current = result[result.length - 2][1];
        }
      }
      if (this.metrics.stats[index].max !== null && this.metrics[index].stats[index].min !== null) {
        this.metrics.stats[index].range = this.metrics[index][index].stats[index].max - this.metrics.stats[index].min;
      }
      if (this.metrics.stats[index].current !== null && this.metrics.stats[index].first !== null) {
        this.metrics.stats[index].diff = this.metrics.stats[index].current - this.metrics.stats[index].first;
      }

      this.metrics.stats[index].count = result.length;
    }
    return result;
  }
}
