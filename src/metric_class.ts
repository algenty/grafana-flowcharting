import moment from 'moment';
import grafana from './grafana_func';
import _ from 'lodash';

/**
 * Metric parent
 *
 * @export
 * @class Metric
 */
export default class Metric {
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
    return this.name;
  }

  /**
   * Get value of metric for an aggregation
   *
   * @param {gf.TAggregation} aggregator
   * @param {string} [column]
   * @returns {(string | number | null)}
   * @memberof Metric
   */
  getValue(aggregator: gf.TAggregation, column?: string): string | number | null {
    return null;
  }

  /**
   * Return coordinates for graph {x:time,y:value}
   *
   * @param {string} [column]
   * @returns {gf.TGraphCoordinate[]}
   * @memberof Metric
   */
  getData(column?: string): number[] | Array<{ x: number | Date; y: number }> {
    return [];
  }

  /**
   * Return time labels for Chartist
   *
   * @param {string} [column]
   * @returns {string[]}
   * @memberof Metric
   */
  getLabels(column?: string): string[] {
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
    this.name = this.metrics.alias;
  }

  seriesHandler(seriesData) {
    const series = grafana.getTimeSeries(seriesData);
    series.flotpairs = series.getFlotPairs(this.nullPointMode);
    return series;
  }

  /**
   * Get value of serie for an aggregation
   *
   * @param {gf.TAggregation} aggregator
   * @param {string} [column]
   * @returns {(string | number | null)}
   * @memberof Metric
   */
  getValue(aggregator: gf.TAggregation): number | string | null {
    try {
      let value = this.metrics.stats[aggregator];
      if (value === undefined || value === null) {
        value = this.metrics.datapoints[this.metrics.datapoints.length - 1][0];
      }
      return value;
    } catch (error) {
      GFP.log.error('datapoint for serie is null', error);
      return null;
    }
  }

  getData(): number[] | Array<{ x: number | Date; y: number }> {
    return this.metrics.flotpairs.map(d => {
      return { x: d[0], y: d[1] };
    });
  }

  getLabels(): string[] {
    const timeFormat = 'MM/DD HH:mm';

    return this.metrics.flotpairs.map(d => {
      return moment.unix(d[0] / 1000).format(timeFormat);
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
  tableColumnOptions!: any;
  tableColumn = '';
  allIsNull!: boolean;
  allIsZero!: boolean;
  constructor(dataList: any) {
    super(dataList);
    this.type = 'table';
    this.name = dataList.refId;
    this.metrics = this.tableHandler(dataList);
  }

  tableHandler(tableData: any) {
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
      table.stats[currName].first = null;
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

      for (let i = 0; i < table.datapoints.length; i++) {
        if (table.timeColumn) {
          currentTime = table.datapoints[i][table.timeColumn];
        }
        currentValue = table.datapoints[i][currName];

        // Due to missing values we could have different timeStep all along the series
        // so we have to find the minimum one (could occur with aggregators such as ZimSum)
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
    return result;
  }

  /**
   * Get value of table for an aggregation
   *
   * @param {gf.TAggregation} aggregator
   * @param {string} [column]
   * @returns {(string | number | null)}
   * @memberof Metric
   */
  getValue(aggregator: gf.TAggregation, column: string): string | number | null {
    try {
      let value = this.metrics.stats[column][aggregator];
      if (value === undefined || value === null) {
        value = this.metrics.datapoints[this.metrics.datapoints.length - 1][column];
      }
      return value;
    } catch (error) {
      GFP.log.error('datapoint for table is null', error);
      return null;
    }
  }

  getColumnIndex(column: string): number | null {
    for (const idx in this.tableColumnOptions) {
      if (column === this.tableColumnOptions[idx]) {
        return Number(idx);
      }
    }
    return null;
  }

  getColumnsName(): string[] {
    const result: string[] = [];
    for (const idx in this.tableColumnOptions) {
      result.push(this.tableColumnOptions[idx]);
    }
    return result;
  }

  getData(column: string): number[] | Array<{ x: number | Date; y: number }> {
    if (this.metrics.timeColumn) {
      return this.metrics.datapoints.map(d => {
        return { x: d[this.metrics.timeColumn], y: d[column] };
      });
    }
    return this.metrics.datapoints.map(d => d[column]);
  }

  getLabels(column: string): string[] {
    const timeFormat = 'MM/DD HH:mm';

    if (this.metrics.timeColumn) {
      return this.metrics.datapoints.map(d => {
        return moment.unix(d[this.metrics.timeColumn] / 1000).format(timeFormat);
      });
    }
    return this.metrics.datapoints.map(d => moment.unix(d[column] / 1000).format(timeFormat));
  }
}
