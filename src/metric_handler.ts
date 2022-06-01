import { SerieMetric, TableMetric, ObjectMetric, Metric } from 'metric_class';
import { $GF, GFLog } from 'globals_class';
import { GFEvents } from 'flowcharting_base';

// Debug
const DEBUG = false;
const _log = (...args: any) => {
  DEBUG && console.log(...args);
};

// Define signals
const metricHandlerSignalsArray = ['metric_created', 'metric_updated', 'metric_deleted'] as const;
type MetricHandlerSignals = typeof metricHandlerSignalsArray[number];

export class MetricHandler {
  private readonly $gf: $GF;
  dataList: any[] = [];
  uid: string;
  tables: Map<string, TableMetric> = new Map();
  series: Map<string, SerieMetric> = new Map();
  metrics: Map<string, ObjectMetric> = new Map();
  events: GFEvents<MetricHandlerSignals> = GFEvents.create(metricHandlerSignalsArray);

  constructor($gf: $GF) {
    this.$gf = $gf;
    this.$gf.metricHandler = this;
    this.uid = $GF.genUid('MetricHandler');
    this.init();
  }

  //
  // Updates
  //
  async change() {
    const $GF = this.$gf;
    this.clear();
    await Promise.all(this.dataList.map(async (dl) => {
      this.addMetric(dl);
    }));
    $GF.events.emit('data_processed');
    return;
  }

  update(timestamp?: number): this {
    const funcName = 'refresh';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.metrics.forEach((m) => m.update(timestamp));
    return this;
  }

  init(): this {
    const funcName = 'init';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    const $GF = this.$gf;
    $GF.events.connect('data_updated', this, this._on_global_data_updated.bind(this));
    $GF.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    $GF.events.connect('panel_closed', this, this._on_global_panel_closed.bind(this));
    // $GF.events.connect('editmode_closed', this, this._on_editmode_closed.bind(this));
    return this;
  }

  free(): this {
    const funcName = 'free';
    const $GF = this.$gf;
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.metrics.forEach((m: ObjectMetric) => {
      m.free();
      this.events.emit('metric_deleted', m);
    });
    $GF.events.disconnect('data_updated', this);
    $GF.events.disconnect('debug_asked', this);
    $GF.events.disconnect('panel_closed', this);
    $GF.events.disconnect('editmode_closed', this);
    this.clear();
    return this;
  }

  /**
   * setter this.data
   * @param  {any[]} datas
   */
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
    let metric: ObjectMetric;
    if (data.type === 'table') {
      metric = this.addTable(data);
    } else {
      metric = this.addSerie(data);
    }
    return metric;
  }

  async removeMetric(metric: Metric) {
    const uid = metric.uid;
    const type = metric.type;
    metric.free();
    if (type === 'serie') {
      this.series.delete(uid);
    }
    if (type === 'table') {
      this.tables.delete(uid);
    }
    this.metrics.delete(uid);
    await this.events.emit('metric_deleted', metric);
  }

  /**
   * Convert and add dataList to a Metric Table
   *
   * @param {any} data
   * @returns {TableMetric}
   * @memberof MetricHandler
   */
  addTable(data: any): TableMetric {
    const table = new TableMetric(this.$gf, data);
    this.tables.set(table.uid, table);
    this.metrics.set(table.uid, table);
    this.events.emit('metric_created', table);
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
    const serie = new SerieMetric(this.$gf, data);
    this.series.set(serie.uid, serie);
    this.metrics.set(serie.uid, serie);
    this.events.emit('metric_created', serie);
    return serie;
  }

  /**
   *
   * @param {gf.TMetricTypeKeys} [type]
   * @returns {string[]}
   * @memberof MetricHandler
   */
  getNames(type?: gf.TMetricTypeKeys): string[] {
    let names: string[] = [];
    names = this.getMetrics(type).map((m) => m.getName());
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
      return Array.from(this.series.values());
    }
    if (type === 'table') {
      return Array.from(this.tables.values());
    }
    return Array.from(this.metrics.values());
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
      return this.series.size > 0;
    }
    if (type === 'table') {
      return this.series.size > 0;
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
    metrics = this.getMetrics(type).filter((m) => $GF.matchString(m.getName(), name, true));
    return metrics;
  }

  refreshMetrics(timestamp?: number): this {
    this.metrics.forEach((m) => {
      m.update(timestamp);
    });
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
    metrics.forEach((m) => {
      columns = columns.concat(m.getColumnsName());
    });
    return columns;
  }

  /**
   * Reset/clear/destroy metrics
   *
   * @memberof MetricHandler
   */
  clear() {
    this.metrics.forEach((metric) => {
      this.removeMetric(metric);
    });
  }

  isMultipleType() {
    return this.isTypeOf('serie') && this.isTypeOf('table');
  }

  getMetricNames(): string[] {
    const result: string[] = [];
    let prefix = '';
    const multiple = this.isMultipleType();
    if (multiple) {
      prefix = 'Series/';
    }
    this.series.forEach((m) => result.push(`${prefix}${m.getName()}`));
    if (multiple) {
      prefix = 'Tables/';
    }
    this.tables.forEach((t) => {
      t.getColumnsName().forEach((c) => result.push(`${prefix}${t}/${c}`));
    });
    return result;
  }

  //##############################################################
  //### EVENTS
  //##############################################################
  private _on_global_data_updated(dataList: any) {
    _log('📬', this.constructor.name, '_on_global_data_updated');
    this.setDataList(dataList);
    this.change();
  }

  // private _on_editmode_closed(dataList: any) {
  //   _log('📬', this.constructor.name, '_on_editmode_closed');
  //   this.change();
  // }

  private _on_global_debug_asked() {
    _log('🗃️', this.constructor.name, this);
  }

  private _on_global_panel_closed() {
    _log('📬', this.constructor.name, '_on_global_panel_close');
    this.free();
  }
}
