import _ from 'lodash';
import { Metric, SerieMetric, TableMetric, ObjectMetric } from './metric_class';
import { $GF } from 'globals_class';

/**
 * Data Series/Tables handler
 *
 * @export
 * @class MetricHandler
 */
export class MetricHandler {
  panel: any;
  // $scope: ng.IScope;
  tables: TableMetric[] = [];
  series: SerieMetric[] = [];
  metrics: Array<SerieMetric | TableMetric> = [];

  constructor() {}

  /**
   * Init data with dataList
   *
   * @param {any} dataList
   * @memberof MetricHandler
   */
  initData(dataList: any) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initData()');
    this.tables = [];
    this.series = [];
    this.metrics = [];

    dataList.forEach((dl) => {
      this.addMetric(dl);
    });
    trc.after();
  }

  /**
   * Reset/clear/destroy metrics
   *
   * @memberof MetricHandler
   */
  clear(): this {
    this.tables.forEach((table) => {
      table.clear();
    });
    this.series.forEach((serie) => {
      serie.clear();
    });
    this.metrics.forEach((metric) => {
      metric.clear();
    });
    this.tables = [];
    this.series = [];
    this.metrics = [];
    return this;
  }

  /**
   * Add/convert dataList to Metric
   *
   * @param {*} data
   * @memberof MetricHandler
   */
  addMetric(data: any): ObjectMetric {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addMetric()');
    let metric: ObjectMetric;
    if (data.type === 'table') {
      metric = this.addTable(data);
    } else {
      metric = this.addSerie(data);
    }
    return metric;
    trc.after();
  }

  /**
   * Convert and add dataList to a Metric Table
   *
   * @param {any} data
   * @returns {TableMetric}
   * @memberof MetricHandler
   */
  addTable(data: any): TableMetric {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addTable()');
    const table = new TableMetric(data);
    this.tables.push(table);
    this.metrics.push(table);
    trc.after();
    return table;
  }

  /**
   * Convert and add dataList to a Metric Serie
   *
   * @param {any} data
   * @returns {SerieMetric}
   * @memberof MetricHandler
   */
  addSerie(data: any): SerieMetric {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addSerie()');
    const serie = new SerieMetric(data);
    this.series.push(serie);
    this.metrics.push(serie);
    trc.after();
    return serie;
  }

  /**
   * get Names of metrics (serie or table or both if type is undefined)
   *
   * @param {gf.TMetricTypeKeys} [type]
   * @returns {string[]}
   * @memberof MetricHandler
   */
  getNames(type?: gf.TMetricTypeKeys): string[] {
    let names: string[] = [];
    if (type === 'serie') {
      names = this.series.map((m) => m.getName());
    } else if (type === 'table') {
      names = this.tables.map((m) => m.getName());
    } else {
      names = this.metrics.map((m) => m.getName());
    }
    // GFGlobal.log.debug('getNames', names);
    return names;
  }

  /**
   * get Metrics, series or tables or both if type is undefined
   *
   * @param {gf.TMetricTypeKeys} [type]
   * @returns {Metric[]}
   * @memberof MetricHandler
   */
  getMetrics(type?: gf.TMetricTypeKeys): Metric[] {
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
   * @param {gf.TMetricTypeKeys} [type]
   * @returns {boolean}
   * @memberof MetricHandler
   */
  isTypeOf(type?: gf.TMetricTypeKeys): boolean {
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
   * @param {string} name (regex)
   * @param {gf.TMetricTypeKeys} [type]
   * @returns {Metric[]}
   * @memberof MetricHandler
   */
  findMetrics(name: string, type?: gf.TMetricTypeKeys): ObjectMetric[] {
    let metrics: ObjectMetric[] = [];
    // < 0.9.1 strict name
    // if (type) {
    //   if (type === 'table') {
    //     metrics = this.tables.filter(m => m.getName() === name);
    //   }
    //   if (type === 'serie') {
    //     metrics = this.series.filter(m => m.getName() === name);
    //   }
    // } else {
    //   metrics = this.metrics.filter(m => m.getName() === name);
    // }

    // >= 0.9.1 : Add RegEx on name
    if (type) {
      if (type === 'table') {
        metrics = this.tables.filter((m) => $GF.utils.matchString(m.getName(), name, true));
      }
      if (type === 'serie') {
        metrics = this.series.filter((m) => $GF.utils.matchString(m.getName(), name, true));
      }
    } else {
      metrics = this.metrics.filter((m) => $GF.utils.matchString(m.getName(), name, true));
    }
    return metrics;
  }

  /**
   * Get column name for a metric
   *
   * @param {string} metricName
   * @param {gf.TMetricTypeKeys} [type]
   * @returns {string[]}
   * @memberof MetricHandler
   */
  getColumnsName(metricName: string, type?: gf.TMetricTypeKeys): string[] {
    const metrics = this.findMetrics(metricName, type);
    let columns: string[] = [];
    metrics.forEach((m) => {
      columns = columns.concat(m.getColumnsName());
    });
    return columns;
  }
}
