import { SerieMetric, TableMetric, ObjectMetric } from 'metric_class';
import { $GF,GFLog } from 'globals_class';
import { GFEvents } from 'flowcharting_base';

const metricHandlerSignalsArray = ['metric_created', 'metric_updated', 'metric_deleted'] as const;
type MetricHandlerSignals = typeof metricHandlerSignalsArray[number];

export class MetricHandler {
  dataList: any[] = [];
  uid: string;
  tables: TableMetric[] = [];
  series: SerieMetric[] = [];
  metrics: ObjectMetric[] = [];
  static events: GFEvents<MetricHandlerSignals> = GFEvents.create(metricHandlerSignalsArray);

  constructor() {
    this.uid = $GF.genUid('MetricHandler');
    this.init();
  }

    //
  // Updates
  //
  change() {
    const funcName = 'change';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initData()');
    this.free();
    this.dataList.map( async (dl) => {
      this.addMetric(dl);
    });
    $GF.events.emit('data_processed');
    trc.after();
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
    return this;
  }

  free(): this {
    const funcName = 'free';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.metrics.forEach((m: ObjectMetric) => {
      m.free();
      MetricHandler.events.emit('metric_deleted', m);
    });
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
    const table = new TableMetric(data);
    this.tables.push(table);
    this.metrics.push(table);
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
    this.series.push(serie);
    this.metrics.push(serie);
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
    if (type === 'serie') {
      names = this.series.map((m) => m.getName());
    } else if (type === 'table') {
      names = this.tables.map((m) => m.getName());
    } else {
      names = this.metrics.map((m) => m.getName());
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
  clear(): this {
    // this.dataList = [];
    this.tables = [];
    this.series = [];
    this.metrics = [];
    return this;
  }

  //##############################################################
  //### EVENTS
  //##############################################################
  private _on_global_data_updated(dataList: any) {
    this.setDataList(dataList);
    this.change();
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
