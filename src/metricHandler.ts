import { SerieMetric, TableMetric, ObjectMetric } from 'metric_class';
import { $GF } from 'globals_class';
import { FlowchartCtrl } from 'flowchart_ctrl';
/**
 * Data Series/Tables handler
 *
 * @export
 * @class MetricHandler
 */
export class MetricHandler {
  dataList: any[] = [];
  uid: string = $GF.utils.uniqueID();
  tables: TableMetric[] = [];
  series: SerieMetric[] = [];
  metrics: ObjectMetric[] = [];
  observers$: gf.TObserver<ObjectMetric>[] = [];
  ctrl: FlowchartCtrl;

  constructor(ctrl: FlowchartCtrl) {
    this.ctrl = ctrl;
    this.init();
  }

  setDataList(datas: any[]) {
    this.dataList = datas;
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
    $GF.trace.before(this.constructor.name + '.addTable()');
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addTable()');
    const table = new TableMetric(data, this.ctrl);
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
    $GF.trace.before(this.constructor.name + '.addSerie()');
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addSerie()');
    const serie = new SerieMetric(data, this.ctrl);
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
      names = this.series.map(m => m.getName());
    } else if (type === 'table') {
      names = this.tables.map(m => m.getName());
    } else {
      names = this.metrics.map(m => m.getName());
    }
    return names;
  }

  /**
   * get Metrics, series or tables or both if type is undefined
   *
   * @param {gf.TMetricTypeKeys} [type]
   * @returns {Metric[]}
   * @memberof MetricHandler
   */
  getMetrics(type?: gf.TMetricTypeKeys): ObjectMetric[] {
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
    if (type) {
      if (type === 'table') {
        metrics = this.tables.filter(m => $GF.utils.matchString(m.getName(), name, true));
      }
      if (type === 'serie') {
        metrics = this.series.filter(m => $GF.utils.matchString(m.getName(), name, true));
      }
    } else {
      metrics = this.metrics.filter(m => $GF.utils.matchString(m.getName(), name, true));
    }
    return metrics;
  }

  refreshMetrics(timestamp?: number): this {
    this.metrics.forEach(m => {
      m.refresh(timestamp);
    });
    this.ctrl.eventHandler.ack('metric', 'completed');
    return this;
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
    metrics.forEach(m => {
      columns = columns.concat(m.getColumnsName());
    });
    return columns;
  }

  /**
   * Reset/clear/destroy metrics
   *
   * @memberof MetricHandler
   */
  clear(): this {
    // this.dataList = [];
    this.tables = [];
    this.series = [];
    this.metrics = [];
    return this;
  }

  //
  // Updates
  //
  refresh() {
    const funcName = 'refresh';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initData()');
    this.destroy();
    this.onInitialized();
    this.dataList.forEach(dl => {
      this.addMetric(dl);
    });
    this.onRefreshed();
    trc.after();
  }

  change(): this {
    const funcName = 'change';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.onChanged();
    return this;
  }

  init(): this {
    const funcName = 'init';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.onInitialized();
    return this;
  }

  destroy(): this {
    const funcName = 'destroy';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.metrics.forEach(m => m.destroy());
    this.clear();
    this.onDestroyed();
    return this;
  }

  complete(): this {
    const funcName = 'complete';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.onCompleted();
    return this;
  }

  //
  // Events
  //
  async onDestroyed() {
    const funcName = 'onDestroyed';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  }

  async onRefreshed() {
    const funcName = 'onRefreshed';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.onCompleted();
  }

  async onInitialized() {
    const funcName = 'onInitialized';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.ctrl.eventHandler.ack('metric', 'initialized');
  }

  async onChanged() {
    const funcName = 'onChanged';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  }

  async onCompleted() {
    const funcName = 'onCompleted';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.ctrl.eventHandler.ack('metric', 'completed');
  }
}
