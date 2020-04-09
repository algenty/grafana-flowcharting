// import FlowChartingPlugin from './plugin';
import _ from 'lodash';
import {Metric, Serie, Table } from './metric_class';

/**
 * Data Series/Tables handler
 *
 * @export
 * @class MetricHandler
 */
export default class MetricHandler {
  panel: any;
  $scope: ng.IScope;
  tables: Table[] = [];
  series: Serie[] = [];
  metrics: Array<Serie | Table> = [];
  constructor($scope: ng.IScope) {
    this.$scope = $scope;
  }

  /**
   * Init data with dataList
   *
   * @param {any} dataList
   * @memberof MetricHandler
   */
  initData(dataList: any) {
    GFP.log.info('initData');
    // GFP.log.debug('initData', dataList);
    this.tables = [];
    this.series = [];
    this.metrics = [];

    dataList.forEach(dl => {
      this.addMetric(dl);
    });

    // GFP.log.debug('tables : ', this.tables.length);
    // GFP.log.debug('series : ', this.series.length);
    // GFP.log.debug('metrics : ', this.metrics.length);
  }

  /**
   * Add/convert dataList to Metric
   *
   * @param {*} data
   * @memberof MetricHandler
   */
  addMetric(data: any) {
    // GFP.log.debug('addMetric', data);
    if (data.type === 'table') {
      this.addTable(data);
    } else {
      this.addSerie(data);
    }
  }

  /**
   * Convert and add dataList to a Metric Table
   *
   * @param {any} data
   * @returns {Table}
   * @memberof MetricHandler
   */
  addTable(data: any): Table {
    GFP.log.info('addTable');
    const table = new Table(data);
    this.tables.push(table);
    this.metrics.push(table);
    return table;
  }

  /**
   * Convert and add dataList to a Metric Serie
   *
   * @param {any} data
   * @returns {Serie}
   * @memberof MetricHandler
   */
  addSerie(data: any): Serie {
    GFP.log.info('addSerie');
    const serie = new Serie(data);
    this.series.push(serie);
    this.metrics.push(serie);
    return serie;
  }

  /**
   * get Names of metrics (serie or table or both if type is undefined)
   *
   * @param {gf.TMetricType} [type]
   * @returns {string[]}
   * @memberof MetricHandler
   */
  getNames(type?: gf.TMetricType): string[] {
    let names: string[] = [];
    if (type === 'serie') {
      names = this.series.map(m => m.getName());
    } else if (type === 'table') {
      names = this.tables.map(m => m.getName());
    } else {
      names = this.metrics.map(m => m.getName());
    }
    // GFP.log.debug('getNames', names);
    return names;
  }

  /**
   * get Metrics, series or tables or both if type is undefined
   *
   * @param {gf.TMetricType} [type]
   * @returns {Metric[]}
   * @memberof MetricHandler
   */
  getMetrics(type?: gf.TMetricType): Metric[] {
    if (type === 'serie') {
      return this.series;
    }
    if (type === 'table') {
      return this.tables;
    }
    return this.metrics;
  }

  /**
   * Define if have tables or serie
   *
   * @param {gf.TMetricType} [type]
   * @returns {boolean}
   * @memberof MetricHandler
   */
  isTypeOf(type?: gf.TMetricType): boolean {
    if (type === 'serie') {
      return this.series.length > 0;
    }
    if (type === 'table') {
      return this.tables.length > 0;
    }
    return false;
  }

  /**
   * Get metrics with this name Serie or table or both
   *
   * @param {string} name
   * @param {gf.TMetricType} [type]
   * @returns {Metric[]}
   * @memberof MetricHandler
   */
  findMetrics(name: string, type?: gf.TMetricType): Metric[] {
    let metrics: Metric[] = [];
    if (type) {
      if (type === 'table') {
        metrics = this.tables.filter(m => m.getName() === name);
      }
      if (type === 'serie') {
        metrics = this.series.filter(m => m.getName() === name);
      }
    } else {
      metrics = this.metrics.filter(m => m.getName() === name);
    }
    return metrics;
  }

  /**
   * Get column name for a metric
   *
   * @param {string} metricName
   * @param {gf.TMetricType} [type]
   * @returns {string[]}
   * @memberof MetricHandler
   */
  getColumnsName(metricName: string, type?: gf.TMetricType): string[] {
    const metrics = this.findMetrics(metricName, type);
    let columns: string[] = [];
    metrics.forEach(m => {
      columns = columns.concat(m.getColumnsName());
    });
    return columns;
  }
}
