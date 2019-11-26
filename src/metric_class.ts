import FlowChartingPlugin from './plugin';
import grafana from './grafana_func';
import _ from 'lodash';
import { TimeSeries, TableData } from 'app/core/core';

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
  constructor(dataList: any, scopedVars) {
    this.scopedVars = scopedVars;
  }

  getScopedData(): any {
    return {
      scopedVars: _.extend({}, this.scopedVars),
    };
  }
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
  constructor(dataList: any, scopedVars) {
    super(dataList, scopedVars);
    this.type = 'timeseries';
    this.metrics = dataList.map(this.seriesHandler.bind(this));
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
  tableColumnOptions: any;
  tableColumn: string = '';
  constructor(dataList: any, scopedVars: any) {
    super(dataList, scopedVars);
    this.type = 'table'
    this.metrics = dataList.map(this.tableHandler.bind(this));
  }

  tableHandler(tableData) {
    const datapoints: any = [];
    const columnNames: any = {};

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

}