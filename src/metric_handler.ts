import { SerieMetric, TableMetric, ObjectMetric, Metric } from 'metric_class';
import { $GF,GFLog } from 'globals_class';
import { GFEvents } from 'flowcharting_base';

const metricHandlerSignalsArray = ['metric_created', 'metric_updated', 'metric_deleted'] as const;
type MetricHandlerSignals = typeof metricHandlerSignalsArray[number];

export class MetricHandler {
  dataList: any[] = [];
  uid: string;
  tables: Map<string, TableMetric> = new Map();
  series: Map<string, SerieMetric> = new Map();
  metrics: Map<string, ObjectMetric> = new Map();
  static events: GFEvents<MetricHandlerSignals> = GFEvents.create(metricHandlerSignalsArray);

  constructor() {
    this.uid = $GF.genUid('MetricHandler');
    this.init();
  }

    //
  // Updates
  //
  change() {
    this.clear();
    this.dataList.map( async (dl) => {
      this.addMetric(dl);
    });
    $GF.events.emit('data_processed');
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
    $GF.events.connect('data_updated', this, this._on_global_data_updated.bind(this));
    $GF.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    $GF.events.connect('panel_closed', this, this._on_global_panel_closed.bind(this));
    return this;
  }

  free(): this {
    const funcName = 'free';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.metrics.forEach((m: ObjectMetric) => {
      m.free();
      MetricHandler.events.emit('metric_deleted', m);
    });
    // $GF.events.disconnect('data_updated', this);
    $GF.events.disconnect('debug_asked', this);
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addMetric()');
    let metric: ObjectMetric;
    if (data.type === 'table') {
      metric = this.addTable(data);
    } else {
      metric = this.addSerie(data);
    }
    trc.after();
    return metric;
  }

  async removeMetric(metric: Metric) {
    const uid = metric.uid;
    const type = metric.type;
    metric.free();
    if(type === 'serie') {
      this.series.delete(uid);
    }
    if(type === 'table') {
      this.tables.delete(uid);
    }
    this.metrics.delete(uid);
    await MetricHandler.events.emit('metric_deleted', metric);
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
    const table = new TableMetric(data);
    this.tables.set(table.uid, table);
    this.metrics.set(table.uid, table);
    MetricHandler.events.emit('metric_created', table);
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
    const serie = new SerieMetric(data);
    this.series.set(serie.uid, serie);
    this.metrics.set(serie.uid, serie);
    MetricHandler.events.emit('metric_created', serie);
    trc.after();
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
    metrics = this.getMetrics(type).filter((m) => $GF.utils.matchString(m.getName(), name, true));
    return metrics;
  }

  refreshMetrics(timestamp?: number): this {
    this.metrics.forEach((m) => {
      m.update(timestamp);
    });
    // this.ctrl.eventHandler.ack('metric', 'completed');
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
    this.metrics.forEach( metric => {
      this.removeMetric(metric)
    });
  }

  //##############################################################
  //### EVENTS
  //##############################################################
  private _on_global_data_updated(dataList: any) {
    this.setDataList(dataList);
    this.change();
  }

  private _on_global_debug_asked() {
    console.log("🧰", this.constructor.name, this);
  }
  
  private _on_global_panel_closed() {
    console.log('📩', this.constructor.name, "_on_global_panel_close");
    this.free();
  }


  //
  // Events
  //
  // async onDestroyed() {
  //   const funcName = 'onDestroyed';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  // }

  // async onRefreshed() {
  //   const funcName = 'onRefreshed';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  //   this.onCompleted();
  // }

  // async onInitialized() {
  //   const funcName = 'onInitialized';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  //   this.ctrl.eventHandler.ack('metric', 'initialized');
  // }

  // async onChanged() {
  //   const funcName = 'onChanged';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  //   this.onCompleted();
  // }

  // async onCompleted() {
  //   const funcName = 'onCompleted';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  //   this.ctrl.eventHandler.ack('metric', 'completed');
  // }
}
