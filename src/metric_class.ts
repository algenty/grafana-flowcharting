import FlowChartingPlugin from './plugin';
import grafana from './grafana_func';
import _ from 'lodash';
import { TimeSeries, TableData } from 'app/core/core';

import * as gf from '../types/flowcharting';
declare var GFP: FlowChartingPlugin;


export default class Metric {
  type: string = 'unknow';
  constructor() {

  }
}

export class Serie extends Metric {
  nullPointMode: string = 'connected';
  constructor() {
    super();
    this.type = 'timeseries'
  }

  seriesHandler(seriesData) {
    const series = grafana.getTimeSeries(seriesData);
    series.flotpairs = series.getFlotPairs(this.nullPointMode);
    return series;
  }

}

export class Table extends Metric {
  tableColumnOptions: any;
  tableColumn:string = '';
  constructor() {
    super();
    this.type = 'table'
    
  }

  tableHandler(tableData) {
    const datapoints:any = [];
    const columnNames:any = {};

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