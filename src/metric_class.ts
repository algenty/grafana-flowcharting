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
    let table:any  = {
      datapoints:  [],
      columnNames:  {},
      stats : {},
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
    this.metrics.flotpairs = this.getFlotPairs(this.nullPointMode,table);
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

  getFlotPairs(fillStyle: string, table : any) {
    const result = Array();
    const ignoreNulls = fillStyle === 'connected';
    const nullAsZero = fillStyle === 'null as zero';
    debugger
    for(const index in table.columnNames) {
      let currName = table.columnNames[index].text;
      table.stats[index] = {};
      table.stats[index].name = currName;
      table.stats[index].total = 0;
      table.stats[index].max = -Number.MAX_VALUE;
      table.stats[index].min = Number.MAX_VALUE;
      table.stats[index].logmin = Number.MAX_VALUE;
      table.stats[index].avg = null;
      table.stats[index].current = null;
      table.stats[index].first = null;
      table.stats[index].delta = 0;
      table.stats[index].diff = null;
      table.stats[index].range = null;
      table.stats[index].timeStep = Number.MAX_VALUE;
      table.allIsNull = true;
      table.allIsZero = true;

      let currentTime: any;
      let currentValue: any;
      let nonNulls = 0;
      let previousTime;
      let previousValue = 0;
      let previousDeltaUp = true;

      for (let i = 0; i < table.datapoints.length; i++) {
        currentValue = table.datapoints[i][currName];
        currentTime = table.datapoints[i][0];

        // Due to missing values we could have different timeStep all along the series
        // so we have to find the minimum one (could occur with aggregators such as ZimSum)
        if (previousTime !== undefined) {
          const timeStep = currentTime - previousTime;
          if (timeStep < table.stats[index].timeStep) {
            table.stats[index].timeStep = timeStep;
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
            table.stats[index].total += currentValue;
            this.allIsNull = false;
            nonNulls++;
          }

          if (currentValue > table.stats[index].max) {
            table.stats[index].max = currentValue;
          }

          if (currentValue < table.stats[index].min) {
            table.stats[index].min = currentValue;
          }

          if (table.stats[index].first === null) {
            table.stats[index].first = currentValue;
          } else {
            if (previousValue > currentValue) {
              // counter reset
              previousDeltaUp = false;
              if (i === table.datapoints.length - 1) {
                // reset on last
                table.stats[index].delta += currentValue;
              }
            } else {
              if (previousDeltaUp) {
                table.stats[index].delta += currentValue - previousValue; // normal increment
              } else {
                table.stats[index].delta += currentValue; // account for counter reset
              }
              previousDeltaUp = true;
            }
          }
          previousValue = currentValue;

          if (currentValue < table.stats[index].logmin && currentValue > 0) {
            table.stats[index].logmin = currentValue;
          }

          if (currentValue !== 0) {
            this.allIsZero = false;
          }
        }
        result.push([currentTime, currentValue]);
      }

      if (table.stats[index].max === -Number.MAX_VALUE) {
        table.stats[index].max = null;
      }
      if (table.stats[index].min === Number.MAX_VALUE) {
        table.stats[index].min = null;
      }

      if (result.length && !this.allIsNull) {
        table.stats[index].avg = table.stats[index].total / nonNulls;
        table.stats[index].current = result[result.length - 1][1];
        if (table.stats[index].current === null && result.length > 1) {
          table.stats[index].current = result[result.length - 2][1];
        }
      }
      if (table.stats[index].max !== null && table[index].stats[index].min !== null) {
        table.stats[index].range = table[index][index].stats[index].max - table.stats[index].min;
      }
      if (table.stats[index].current !== null && table.stats[index].first !== null) {
        table.stats[index].diff = table.stats[index].current - table.stats[index].first;
      }

      table.stats[index].count = result.length;
    }
    return result;
  }
}
