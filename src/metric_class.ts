import grafana from './grafana_func';
import _ from 'lodash';
import { $GF } from 'globals_class';

/**
 * Metric parent
 *
 * @export
 * @class Metric
 */
export class Metric {
  type = 'unknow';
  scopedVars: any;
  metrics: any = {};
  name = '';
  nullPointMode = 'connected';
  constructor(dataList: any) {}

  /**
   * Get name of metric
   *
   * @returns {string}
   * @memberof Metric
   */
  getName(): string {
    if (this.name === undefined || this.name === null) {
      $GF.log.error('Metric => getName : Name is null');
    }
    return this.name;
  }

  /**
   * Get value of metric for an aggregation
   *
   * @param {gf.TAggregationKeys} aggregator
   * @param {string} [column]
   * @returns {(string | number | null)}
   * @memberof Metric
   */
  getValue(aggregator: gf.TAggregationKeys, column?: string): string | number | null {
    return null;
  }

  findValue(timestamp: number, column?: string): string | number | null {
    return null;
  }

  /**
   * Return coordinates for graph {x:time,y:value}
   *
   * @param {string} [column]
   * @returns {gf.TGraphCoordinate[]}
   * @memberof Metric
   */
  getData(column?: string, log: boolean = false): number[] | Array<{ x: number | Date; y: number }> {
    return [];
  }

  /**
   * Return columns for this metric
   *
   * @returns {string[]}
   * @memberof Metric
   */
  getColumnsName(): string[] {
    return [];
  }
}

/**
 * Serie data
 *
 * @export
 * @class Serie
 * @extends {Metric}
 */
/**
 * Serie type for a metric
 *
 * @export
 * @class Serie
 * @extends {Metric}
 */
export class Serie extends Metric {
  constructor(dataList: any) {
    super(dataList);
    this.type = 'serie';
    this.metrics = this.seriesHandler(dataList);
    this.addCustomStats();
    this.name = this.metrics.alias;
  }

  seriesHandler(seriesData) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'seriesHandler()');
    const series = grafana.getTimeSeries(seriesData);
    series.flotpairs = series.getFlotPairs(this.nullPointMode);
    trc.after();
    return series;
  }

  addCustomStats() {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addCustomStats()');
    try {
      let lg = this.metrics.flotpairs.length;
      // LAST TIME
      this.metrics.stats['last_time'] = this.metrics.flotpairs[lg - 1][0];
      // LAST
      this.metrics.stats['current'] = this.metrics.flotpairs[lg - 1][1];
      // LAST NOT NULL
      this.metrics.stats['current_notnull'] = null;
      let idx = lg - 1;
      while ((this.metrics.flotpairs[idx][1] === null || this.metrics.flotpairs[idx][1] === undefined) && idx >= 0) {
        idx -= 1;
      }
      if (idx >= 0) {
        this.metrics.stats['current_notnull'] = this.metrics.flotpairs[idx][1];
      }
      // FIRST
      this.metrics.stats['first'] = this.metrics.flotpairs[0][1];
      // FIRST NOT NULL
      this.metrics.stats['first_notnull'] = null;
      idx = 0;
      while ((this.metrics.flotpairs[idx][1] === null || this.metrics.flotpairs[idx][1] === undefined) && idx < lg) {
        idx += 1;
      }
      if (idx < lg) {
        this.metrics.stats['first_notnull'] = this.metrics.flotpairs[idx][1];
      }
    } catch (error) {
      $GF.log.error('Unable to add custom stats', error);
    }
    trc.after();
  }

  /**
   * Get value of serie for an aggregation
   *
   * @param {gf.TAggregationKeys} aggregator
   * @param {string} [column]
   * @returns {(string | number | null)}
   * @memberof Metric
   */
  getValue(aggregator: gf.TAggregationKeys): string | number | null {
    try {
      let value: string | number | null = null;
      if ($GF.hasGraphHover()) {
        const timestamp = $GF.getGraphHover();
        value = timestamp !== undefined ? this.findValue(timestamp) : null;
      } else {
        value = this.metrics.stats[aggregator];
      }
      return value;
    } catch (error) {
      $GF.log.error('datapoint for serie is null', error);
      return null;
    }
  }

  /**
   * find a value by a timestamp
   *
   * @param {number} timestamp
   * @returns {(string | number | null)}
   * @memberof Serie
   */
  findValue(timestamp: number): string | number | null {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'findValue()');
    let low = 0;
    let high = this.metrics.flotpairs.length - 1;
    let found = !(high > 0);
    timestamp = Math.round(timestamp);
    let value = null;
    while (!found) {
      let middle = low + Math.round((high - low) / 2);
      if (this.metrics.flotpairs[middle][0] === timestamp) {
        value = this.metrics.flotpairs[middle][1];
        found = true;
      }
      if (!found && low < middle && middle < high) {
        if (timestamp > this.metrics.flotpairs[middle][0]) {
          low = middle;
        }
        if (timestamp < this.metrics.flotpairs[middle][0]) {
          high = middle;
        }
      } else {
        if (this.metrics.flotpairs[middle][0] > timestamp && middle >= 1) {
          value = this.metrics.flotpairs[middle - 1][1];
        } else {
          value = this.metrics.flotpairs[middle][1];
        }
        found = true;
      }
    }
    trc.after();
    return value;
  }

  getData(column: string = '', log: boolean = false): number[] | Array<{ x: number | Date; y: number }> {
    return this.metrics.flotpairs.map(d => {
      if (!!log) {
        return { x: d[0], y: Math.log10(d[1]) };
      }
      return { x: d[0], y: d[1] };
    });
  }

  getColumnsName(): string[] {
    //TODO: If multi column
    return ['time', 'value'];
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
  tableColumnOptions: any = {};
  tableColumn = '';
  allIsNull = true;
  allIsZero = true;
  constructor(dataList: any) {
    super(dataList);
    this.type = 'table';
    this.name = dataList.refId;
    this.metrics = this.tableHandler(dataList);
  }

  tableHandler(tableData: any) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'tableHandler()');
    const table: any = {
      datapoints: [],
      columnNames: {},
      stats: {},
    };

    tableData.columns.forEach((column, columnIndex) => {
      table.columnNames[columnIndex] = column.text;
      if (column.text.toString().toLowerCase() === 'time') {
        table.timeIndex = columnIndex;
        table.timeColumn = column.text;
      }
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
    this.metrics.flotpairs = this.getFlotPairs(this.nullPointMode, table);
    trc.after();
    return table;
  }

  setTableColumnToSensibleDefault(tableData: any) {
    if (tableData.columns.length === 1) {
      this.tableColumn = tableData.columns[0].text;
    } else {
      this.tableColumn = _.find(tableData.columns, col => {
        return col.type !== 'time';
      }).text;
    }
  }

  getFlotPairs(fillStyle: string, table: any) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'getFlotPairs()');
    const result: any[] = [];
    const ignoreNulls = fillStyle === 'connected';
    const nullAsZero = fillStyle === 'null as zero';
    table.allIsNull = true;
    table.allIsZero = true;

    for (const idx in table.columnNames) {
      // let index = Number(idx);
      // if (table.timeIndex !== undefined && table.timeIndex !== null && index === table.timeIndex) continue;
      const currName = table.columnNames[idx];
      table.stats[currName] = {};
      table.stats[currName].name = currName;
      table.stats[currName].total = 0;
      table.stats[currName].max = -Number.MAX_VALUE;
      table.stats[currName].min = Number.MAX_VALUE;
      table.stats[currName].logmin = Number.MAX_VALUE;
      table.stats[currName].avg = null;
      table.stats[currName].current = null;
      table.stats[currName].current_notnull = null;
      table.stats[currName].first = null;
      table.stats[currName].first_notnull = null;
      table.stats[currName].delta = 0;
      table.stats[currName].diff = null;
      table.stats[currName].range = null;
      table.stats[currName].timeStep = Number.MAX_VALUE;

      let currentTime: any;
      let currentValue: any;
      let nonNulls = 0;
      let previousTime;
      let previousValue = 0;
      let previousDeltaUp = true;

      try {
        for (let i = 0; i < table.datapoints.length; i++) {
          if (table.timeColumn) {
            currentTime = table.datapoints[i][table.timeColumn];
          }
          currentValue = table.datapoints[i][currName];

          if (previousTime !== undefined) {
            const timeStep = currentTime - previousTime;
            if (timeStep < table.stats[currName].timeStep) {
              table.stats[currName].timeStep = timeStep;
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
              table.stats[currName].total += currentValue;
              this.allIsNull = false;
              nonNulls++;
            }

            if (currentValue > table.stats[currName].max) {
              table.stats[currName].max = currentValue;
            }

            if (currentValue < table.stats[currName].min) {
              table.stats[currName].min = currentValue;
            }

            if (table.stats[currName].first === null) {
              table.stats[currName].first = currentValue;
            } else {
              if (previousValue > currentValue) {
                // counter reset
                previousDeltaUp = false;
                if (i === table.datapoints.length - 1) {
                  // reset on last
                  table.stats[currName].delta += currentValue;
                }
              } else {
                if (previousDeltaUp) {
                  table.stats[currName].delta += currentValue - previousValue; // normal increment
                } else {
                  table.stats[currName].delta += currentValue; // account for counter reset
                }
                previousDeltaUp = true;
              }
            }
            previousValue = currentValue;

            if (currentValue < table.stats[currName].logmin && currentValue > 0) {
              table.stats[currName].logmin = currentValue;
            }

            if (currentValue !== 0) {
              this.allIsZero = false;
            }
          }
          result.push([currentTime, currentValue]);
        }
      } catch (error) {
        $GF.log.error('Unable to aggregate data', error);
      }

      if (currentTime) {
        table.stats[currName].last_time = currentTime;
      }

      if (table.stats[currName].max === -Number.MAX_VALUE) {
        table.stats[currName].max = null;
      }
      if (table.stats[currName].min === Number.MAX_VALUE) {
        table.stats[currName].min = null;
      }

      if (result.length && !this.allIsNull) {
        table.stats[currName].avg = table.stats[currName].total / nonNulls;
        table.stats[currName].current = result[result.length - 1][1];
        if (table.stats[currName].current === null && result.length > 1) {
          table.stats[currName].current = result[result.length - 2][1];
        }
      }
      if (table.stats[currName].max !== null && table.stats[currName].min !== null) {
        table.stats[currName].range = table.stats[currName].max - table.stats[currName].min;
      }
      if (table.stats[currName].current !== null && table.stats[currName].first !== null) {
        table.stats[currName].diff = table.stats[currName].current - table.stats[currName].first;
      }

      table.stats[currName].count = result.length;
    }
    trc.after();
    return result;
  }

  /**
   * Get value of table for an aggregation
   *
   * @param {gf.TAggregationKeys} aggregator
   * @param {string} [column]
   * @returns {(string | number | null)}
   * @memberof Metric
   */
  getValue(aggregator: gf.TAggregationKeys, column: string): string | number | null {
    try {
      let value: string | number | null = null;
      if ($GF.hasGraphHover()) {
        const timestamp = $GF.getGraphHover();
        value = timestamp !== undefined ? this.findValue(timestamp, column) : null;
      } else {
        value = this.metrics.stats[column][aggregator];
      }
      return value;
    } catch (error) {
      $GF.log.error('datapoint for table is null', error);
      return null;
    }
  }

  /**
   * find a value by a timestamp
   *
   * @param {number} timestamp
   * @returns {(string | number | null)}
   * @memberof Serie
   */
  findValue(timestamp: number, column: string): string | number | null {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'findValue()');
    let low = 0;
    let high = this.metrics.datapoints.length - 1;
    let found = !(high > 0 && this.metrics.datapoints[low][this.metrics.timeColumn] < timestamp);
    timestamp = Math.round(timestamp);
    let value = null;
    while (!found) {
      let middle = low + Math.round((high - low) / 2);
      if (this.metrics.datapoints[middle][this.metrics.timeColumn] === timestamp) {
        value = this.metrics.datapoints[middle][column];
        found = true;
      }
      if (!found && low < middle && middle < high) {
        if (timestamp > this.metrics.datapoints[middle][this.metrics.timeColumn]) {
          low = middle;
        }
        if (timestamp < this.metrics.datapoints[middle][this.metrics.timeColumn]) {
          high = middle;
        }
      } else {
        if (this.metrics.datapoints[middle][this.metrics.timeColumn] > timestamp && middle >= 1) {
          value = this.metrics.datapoints[middle - 1][column];
        } else {
          value = this.metrics.datapoints[middle][column];
        }
        found = true;
      }
    }
    trc.after();
    return value;
  }

  /**
   * Return the index of a column
   *
   * @param {string} column
   * @returns {(number | null)}
   * @memberof Table
   */
  getColumnIndex(column: string): number | null {
    for (const idx in this.tableColumnOptions) {
      if (column === this.tableColumnOptions[idx]) {
        return Number(idx);
      }
    }
    return null;
  }

  /**
   * Return name of columns
   *
   * @returns {string[]}
   * @memberof Table
   */
  getColumnsName(): string[] {
    const result: string[] = [];
    for (const idx in this.tableColumnOptions) {
      result.push(this.tableColumnOptions[idx]);
    }
    return result;
  }

  /**
   * Return formated data for tooltips graph
   *
   * @param {string} column
   * @returns {(number[] | Array<{ x: number | Date; y: number }>)}
   * @memberof Table
   */
  getData(column: string): number[] | Array<{ x: number | Date; y: number }> {
    if (this.metrics.timeColumn) {
      return this.metrics.datapoints.map(d => {
        return { x: d[this.metrics.timeColumn], y: d[column] };
      });
    }
    return this.metrics.datapoints.map(d => d[column]);
  }
}
