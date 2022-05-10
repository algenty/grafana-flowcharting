import { XGraph } from 'graph_class';
import { StateHandler } from 'statesHandler';
import { FlowchartHandler } from 'flowchart_handler';
import { $GF, GFDrawioTools } from 'globals_class';
import { FlowchartCtrl } from 'flowchart_ctrl';

/**
 * Flowchart handler
 *
 * @export
 * @class Flowchart
 */
export class Flowchart {
  data: gf.TFlowchartData;
  container: HTMLDivElement;
  ctrl: FlowchartCtrl;
  xgraph: XGraph | undefined = undefined;
  stateHandler: StateHandler | undefined;
  // states: Map<string, State> | undefined;
  uid: string;
  visible = false;
  reduce = true;

  constructor(name: string, container: HTMLDivElement, data: gf.TFlowchartData, ctrl: FlowchartCtrl) {
    this.uid = $GF.genUid(this.constructor.name);
    this.data = data;
    this.data.name = name;
    this.container = container;
    this.ctrl = ctrl;
    this.init();
  }

  /**
   * Import data object in current flowchart
   *
   * @param {Object} obj
   * @memberof Flowchart
   */
  import(obj: any): this {
    $GF.log.info(`flowchart[${this.data.name}].import()`);
    this.clear();
    if (!!obj.download || this.data.download === false) {
      this.data.download = obj.download;
    }
    // 0.3.0
    if (!!obj.source) {
      this.data.type = obj.source.type;
      this.data.xml = obj.source.xml.value;
      this.data.url = obj.source.url.value;
    }
    // 0.3.0
    if (!!obj.options) {
      this.data.zoom = obj.options.zoom;
      this.data.center = obj.options.center;
      this.data.scale = obj.options.scale;
      this.data.lock = obj.options.lock;
      this.data.tooltip = obj.options.tooltip;
      this.data.grid = obj.options.grid;
      this.data.bgColor = obj.options.bgColor;
    }
    if (!!obj.type) {
      this.data.type = obj.type;
    }
    if (!!obj.xml) {
      this.data.xml = obj.xml;
    }

    // 0.9.0
    if (!!obj.csv) {
      this.data.csv = obj.csv;
    }
    if (!!obj.url) {
      this.data.url = obj.url;
    }
    if (!!obj.zoom) {
      this.data.zoom = obj.zoom;
    }
    if (!!obj.center || obj.center === false) {
      this.data.center = obj.center;
    }
    if (!!obj.scale || obj.scale === false) {
      this.data.scale = obj.scale;
    }

    if (!!obj.lock || obj.lock === false) {
      this.data.lock = obj.lock;
    }

    if (!!obj.enableAnim || obj.enableAnim === false) {
      this.data.enableAnim = obj.enableAnim;
    }
    if (!!obj.tooltip) {
      this.data.tooltip = obj.tooltip;
    }
    if (!!obj.grid || obj.grid === false) {
      this.data.grid = obj.grid;
    }
    if (!!obj.bgColor) {
      this.data.bgColor = obj.bgColor;
    }
    // this.setBackgroundColor(this.data.bgColor);
    this.change();
    return this;
  }

  /**
   * Return the default XML when new
   *
   * @static
   * @returns {gf.TFlowchartData}
   * @memberof Flowchart
   */
  static getDefaultData(): gf.TFlowchartData {
    return {
      name: 'Main',
      xml: FlowchartHandler.getDefaultDioGraph(),
      csv: FlowchartHandler.getDefaultCsvGraph(),
      download: false,
      type: 'xml',
      url: 'http://<YourUrl>/<Your XML/drawio file/api>',
      zoom: '100%',
      center: true,
      scale: true,
      lock: true,
      enableAnim: true,
      tooltip: true,
      grid: false,
      bgColor: null,
    };
  }

  /**
   * Return data without functions to save json in grafana
   *
   * @returns {Object} Data object
   * @memberof Flowchart
   */
  getData(): gf.TFlowchartData {
    return this.data;
  }

  /**
   * Update states of flowchart/graph
   *
   * @param {*} rules
   * @returns {this}
   * @memberof Flowchart
   */
  // updateStates(rules: Rule[]): this {
  //   const trc = $GF.trace.before(this.constructor.name + '.' + 'updateStates()');
  //   rules.forEach(rule => {
  //     if (this.stateHandler !== undefined) {
  //       rule.states = this.stateHandler.getStatesForRule(rule);
  //       if (rule.states) {
  //         rule.states.forEach((state: any) => {
  //           state.unsetState();
  //         });
  //       } else {
  //         $GF.log.warn('States not defined for this rule');
  //       }
  //     } else {
  //       $GF.log.error('updateStates => this.stateHandler undefined');
  //     }
  //   });
  //   trc.after();
  //   return this;
  // }

  initStateHandler(): this {
    if (this.xgraph) {
      this.stateHandler = new StateHandler(this.xgraph, this.ctrl);
    }
    return this;
  }

  /**
   * Initialisation of flowchart class
   *
   * @return {this}
   * @memberof Flowchart
   */
  initGraph(): this {
    try {
      const content = this.getContent();
      if (this.xgraph === undefined) {
        this.xgraph = new XGraph(this.container, this.data.type, content, this.ctrl);
      }
    } catch (error) {
      this.ctrl.notify('Unable to initialize graph', 'error');
      $GF.log.error('Unable to initialize graph', error);
    }
    return this;
  }

  changeGraph(): this {
    try {
      const content = this.getContent();
      if (this.xgraph === undefined) {
        this.initGraph();
      }
      if (content !== undefined && content !== null) {
        if (this.data.enableAnim) {
          this.xgraph?.enableAnim(true);
        } else {
          this.xgraph?.enableAnim(false);
        }
        this.setGraphOptions(); //TODO :simplify
        this.xgraph?.setContent(content);
        this.xgraph?.change();
        this.xgraph?.update();
        //TODO : already in setOptions, if yes call xgraph.change();
        // if (this.data.tooltip) {
        //   this.xgraph?.tooltipGraph(true);
        // }
        // if (this.data.scale) {
        //   this.xgraph?.scaleGraph(true);
        // } else {
        //   this.xgraph?.zoomGraph(this.data.zoom);
        // }
        // if (this.data.center) {
        //   this.xgraph?.centerGraph(true);
        // }
        // if (this.data.lock) {
        //   this.xgraph?.lockGraph(true);
        // }
        // if(this.xgraph) {
        //   this.stateHandler = new StateHandler(this.xgraph, this.ctrl);
        // }
        this.ctrl.clearNotify();
      } else {
        this.ctrl.notify('Source content empty Graph not defined', 'error');
        $GF.log.error('Source content empty Graph not defined');
      }
    } catch (error) {
      this.ctrl.notify('Unable to initialize graph', 'error');
      $GF.log.error('Unable to initialize graph', error);
    }
    return this;
  }

  /**
   * Get states handler
   *
   * @returns
   * @memberof Flowchart
   */
  getStateHandler() {
    return this.stateHandler;
  }

  /**
   * Get XGraph
   *
   * @returns
   * @memberof Flowchart
   */
  getXGraph() {
    return this.xgraph;
  }

  /**
   * Init states with rules and metrics
   *
   * @param {Rule[]} rules
   * @param {Metric[]} metrics
   * @memberof Flowchart
   */
  // setStates(rules: Rule[]): this {
  //   // $GF.log.info(`flowchart[${this.data.name}].setStates()`);
  //   if (rules === undefined) {
  //     $GF.log.warn("Rules shoudn't be null");
  //   }
  //   if (this.stateHandler) {
  //     this.stateHandler.setStates(rules);
  //   }
  //   return this;
  // }

  /**
   * Init options of graph
   *
   * @memberof Flowchart
   */
  setGraphOptions(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setOptions()');
    // TODO: simplify it
    this.xgraph?.enableAnim(this.data.enableAnim);
    this.setScale(this.data.scale);
    this.setCenter(this.data.center);
    this.setGrid(this.data.grid);
    this.setTooltip(this.data.tooltip);
    this.setLock(this.data.lock);
    this.setZoom(this.data.zoom);
    // this.setBgColor(this.data.bgColor);
    trc.after();
    return this;
  }

  /**
   * Apply new states (colors,text ...)
   *
   * @memberof Flowchart
   */
  // applyStates(): this {
  //   // $GF.log.info(`flowchart[${this.data.name}].applyStates()`);
  //   if (this.stateHandler) {
  //     this.stateHandler.applyStates();
  //   }
  //   return this;
  // }

  /**
   * Apply options
   *
   * @memberof Flowchart
   */
  // refreshGraph() {
  //   const trc = $GF.trace.before(this.constructor.name + '.' + 'applyOptions()');
  //   if (this.xgraph) {
  //     this.xgraph?.refresh();
  //   }
  //   trc.after();
  // }

  // refreshStates() {
  //   this.stateHandler?.refresh();
  // }

  /**
   * Reset and redraw graph when source changed
   *
   * @param {*} xmlGraph
   * @memberof Flowchart
   */
  setContent(content?: string) {
    if (content !== undefined) {
      this.setGraphContent(content);
    }
    if (this.xgraph !== undefined) {
      this.xgraph.setContent(this.getContent());
    }
    // this.applyOptions();
  }

  /**
   * Reload source of graph
   *
   * @memberof Flowchart
   */
  // reload() {
  //   if (this.xgraph !== undefined && this.xgraph !== null) {
  //     // this.xgraph.destroyGraph();
  //     this.xgraph = undefined;
  //     this.init();
  //   } else {
  //     this.init();
  //   }
  // }

  /**
   * Reset/empty/destroy flowchart
   *
   * @returns {this}
   * @memberof Flowchart
   */
  clear(): this {
    this.xgraph?.clear();
    this.stateHandler?.clear();
    return this;
  }

  /**
   * Set the name
   *
   * @param {string} name
   * @memberof Flowchart
   */
  setName(name: string) {
    this.data.name = name;
  }

  getName(): string {
    return this.data.name;
  }

  /**
   * Set paramater lock
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  setLock(bool: boolean): this {
    this.data.lock = bool;
    if (this.xgraph) {
      this.xgraph.lock = bool;
    }
    return this;
  }

  /**
   * Lock graph
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  applyLock(bool: boolean): this {
    if (bool !== undefined) {
      this.data.lock = bool;
    }
    if (this.xgraph) {
      this.xgraph.lockGraph(this.data.lock);
    }
    return this;
  }

  /**
   * Set enable tooltip
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  setTooltip(bool: boolean): this {
    this.data.tooltip = bool;
    if (this.xgraph) {
      this.xgraph.tooltip = bool;
    }
    return this;
  }

  /**
   * Enable tooltip
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  applyTooltip(bool: boolean): this {
    if (bool !== undefined) {
      this.data.tooltip = bool;
    }
    if (this.xgraph) {
      this.xgraph.tooltipGraph(this.data.tooltip);
    }
    return this;
  }

  /**
   * Set scale parameter
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  setScale(bool: boolean): this {
    this.data.scale = bool;
    if (this.xgraph) {
      this.xgraph.scale = bool;
    }
    return this;
  }

  /**
   * Set BgColor
   *
   * @param {(string | null)} bgColor
   * @returns {this}
   * @memberof Flowchart
   */
  setBackgroundColor(bgColor: string | null): this {
    this.data.bgColor = bgColor;
    if (bgColor) {
      this.container.style.backgroundColor = bgColor;
    } else {
      this.container.style.backgroundColor = '';
    }
    return this;
  }

  /**
   * Apply scale parameter
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  applyScale(bool: boolean): this {
    if (bool !== undefined) {
      this.data.scale = bool;
    }
    if (this.xgraph) {
      this.xgraph.scaleGraph(this.data.scale);
    }
    return this;
  }

  /**
   * set center parameter
   *
   * @param {boolean} bool
   * @returns
   * @memberof Flowchart
   */
  setCenter(bool: boolean) {
    this.data.center = bool;
    if (this.xgraph) {
      this.xgraph.center = bool;
    }
    return this;
  }

  /**
   * Get names array of names according id or value
   *
   * @param {gf.TPropertieKey} prop
   * @returns {string[]}
   * @memberof Flowchart
   */
  getNamesByOptions(options: gf.TRuleMapOptions, type: 'key' | 'value' = 'key'): string[] {
    let values: any = [];
    if (this.xgraph) {
      if (type === 'key') {
        values = this.xgraph.getDefaultValues(options);
      } else {
        values = this.xgraph.getDefaultValuesWithKey(options, options.metadata);
      }
    }
    return values;
  }

  /**
   * get XML def with var replaced
   *
   * @param {boolean} replaceVarBool
   * @returns {string}
   * @memberof Flowchart
   */
  getXml(replaceVarBool = true): string {
    if (!replaceVarBool) {
      return this.data.xml;
    }
    return $GF.resolveVars(this.data.xml);
  }

  /**
   * get CSV def with var replaced
   *
   * @param {boolean} replaceVarBool
   * @returns {string}
   * @memberof Flowchart
   */
  getCsv(replaceVarBool = true): string {
    if (!replaceVarBool) {
      return this.data.csv;
    }
    return $GF.resolveVars(this.data.csv);
  }

  /**
   * Get data source according type
   *
   * @param {boolean} [replaceVarBool=true]
   * @returns
   * @memberof Flowchart
   */
  getSource(replaceVarBool = true) {
    if (this.data.type === 'xml') {
      return this.getXml(replaceVarBool);
    }
    if (this.data.type === 'csv') {
      return this.getCsv(replaceVarBool);
    }
    return '';
  }

  allowDrawio(flag: boolean): this {
    if (this.xgraph) {
      this.xgraph.allowDrawio(flag);
    }
    return this;
  }

  /**
   * Get Source of graph (csv|xml) or get content from url
   *
   * @param {boolean} replaceVarBool
   * @returns
   * @memberof Flowchart
   */
  getContent(replaceVarBool = true): string {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'getContent()');
    let content: string | null = '';
    if (this.data.download) {
      const url = $GF.resolveVars(this.data.url);
      this.ctrl.notify(`Loading content definition for ${this.data.name}`, 'info');
      content = this.loadContent(url);
      this.ctrl.clearNotify();
      if (content !== null) {
        if (replaceVarBool) {
          content = $GF.resolveVars(content);
        }
      }
    } else {
      content = this.getSource(replaceVarBool);
    }
    trc.after();
    return content === null ? '' : content;
  }

  /**
   * Set the data source
   *
   * @param {string} content
   * @returns {this}
   * @memberof Flowchart
   */
  setGraphContent(content: string): this {
    if (this.data.type === 'xml') {
      this.data.xml = content;
    }
    if (this.data.type === 'csv') {
      this.data.csv = content;
    }
    return this;
  }

  /**
   * Load source from url
   *
   * @param {*} url
   * @returns
   * @memberof Flowchart
   */
  loadContent(url: string): string | null {
    return $GF.utils.$loadFile(url);
  }

  // renameId(oldId: string, newId: string): this {
  //   if (this.xgraph) {
  //     this.xgraph.renameId(oldId, newId);
  //   }
  //   return this;
  // }

  /**
   * Apply xml to graph
   *
   * @returns {this}
   * @memberof Flowchart
   */
  applyModel(): this {
    if (this.xgraph) {
      this.data.xml = this.xgraph.getXmlModel();
    }
    this.setContent();
    return this;
  }

  center(bool: boolean): this {
    if (bool !== undefined) {
      this.data.center = bool;
    }
    if (this.xgraph) {
      this.xgraph.centerGraph(this.data.center);
    }
    return this;
  }

  setZoom(percent: string): this {
    this.data.zoom = percent;
    if (this.xgraph) {
      this.xgraph.zoomPercent = percent;
    }
    return this;
  }

  zoom(percent: string): this {
    if (percent !== undefined) {
      this.data.zoom = percent;
    }
    if (this.xgraph) {
      this.xgraph.zoomGraph(this.data.zoom);
    }
    return this;
  }

  setGrid(bool: boolean): this {
    this.data.grid = bool;
    if (this.xgraph) {
      this.xgraph.grid = bool;
    }
    return this;
  }

  grid(bool: boolean): this {
    if (bool !== undefined) {
      this.data.grid = bool;
    }
    if (this.xgraph) {
      this.xgraph.gridGraph(this.data.grid);
    }
    return this;
  }

  setXml(xml: string): this {
    this.data.xml = xml;
    return this;
  }

  setCsv(csv: string): this {
    this.data.csv = csv;
    return this;
  }

  minify() {
    this.data.xml = $GF.utils.minify(this.data.xml);
  }

  prettify() {
    this.data.xml = $GF.utils.prettify(this.data.xml);
  }

  _decode() {
    if (GFDrawioTools.isEncoded(this.data.xml)) {
      this.data.xml = GFDrawioTools.decode(this.data.xml);
      // this.data.xml = XGraph.decompress(this.data.xml);
    }
  }

  _encode() {
    if (!GFDrawioTools.isEncoded(this.data.xml)) {
      const xml = GFDrawioTools.encode(this.data.xml);
      this.data.xml = xml ? xml : this.data.xml;
    }
  }

  getContainer(): HTMLDivElement {
    return this.container;
  }

  setMap() {
    if (this.xgraph) {
      this.xgraph.setMap();
    }
  }

  unsetMap() {
    if (this.xgraph) {
      this.xgraph.unsetMap();
    }
  }

  toFront(forceRefresh = false): this {
    this.visible = true;
    this.container.className = 'gf-flowchartShow';
    if (forceRefresh) {
      this.xgraph?.update();
    }
    return this;
  }

  toBack(): this {
    this.visible = false;
    this.container.className = 'gf-flowchartHide';
    return this;
  }

  isVisible(): boolean {
    return this.visible;
  }

  //
  // Updates
  //
  destroy(): this {
    const funcName = 'destroy';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.xgraph?.free();
    this.stateHandler?.destroy();
    this.clear();
    this.onDestroyed();
    return this;
  }

  refresh(): this {
    const funcName = 'refresh';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.xgraph?.update();
    // this.stateHandler?.refresh();
    // this.refreshStates();
    this.setBackgroundColor(this.data.bgColor);
    this.onRefreshed();
    return this;
  }

  change(): this {
    const funcName = 'change';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.changeGraph();
    this.onChanged();
    return this;
  }

  init(): this {
    const funcName = 'init';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.initGraph();
    this.initStateHandler();
    this.onInitialized();
    return this;
  }

  //
  // Events
  //
  async onDestroyed() {
    const funcName = 'onDestroyed';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.ctrl.eventHandler.emit(this, 'destroyed');
    this.ctrl.eventHandler.unsubscribes(this);
  }

  async onRefreshed() {
    const funcName = 'onRefreshed';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.ctrl.eventHandler.emit(this, 'refreshed');
  }

  async onInitialized() {
    const funcName = 'onInitialized';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.ctrl.eventHandler.subscribes(this);
    this.ctrl.eventHandler.emit(this, 'initialized');
  }

  async onChanged() {
    const funcName = 'onChanged';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.ctrl.eventHandler.emit(this, 'changed');
    // this.refresh(); //TODO : Verify
  }
}
