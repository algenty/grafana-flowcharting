import { XGraph } from 'graph_class';
import { StateHandler } from 'statesHandler';
import { FlowchartHandler } from 'flowchart_handler';
import { $GF, GFLog } from 'globals_class';
import { GFEvents } from 'flowcharting_base';
import { GFDrawio } from 'drawio_base';

const flowchartSignalsArray = [
  'flowchart_initialized',
  'flowchart_updated',
  'flowchart_changed',
  'flowchart_freed',
] as const;
type FlowchartSignals = typeof flowchartSignalsArray[number];

/**
 * Flowchart handler
 *
 * @export
 * @class Flowchart
 */
export class Flowchart {
  data: gf.TFlowchartData;
  private container: HTMLDivElement;
  private xgraph: XGraph | undefined = undefined;
  private stateHandler: StateHandler | undefined;
  private readonly $gf: $GF;
  uid: string;
  visible = false;
  reduce = true;
  events: GFEvents<FlowchartSignals> = GFEvents.create(flowchartSignalsArray);

  constructor($gf: $GF, name: string, container: HTMLDivElement, newData: gf.TFlowchartData, oldData?: any) {
    this.$gf = $gf;
    this.uid = $GF.genUid(this.constructor.name);
    this.data = newData;
    this.data.name = name;
    this.container = container;
    if (oldData) {
      this._convert(oldData);
    }
    this.init();
  }

  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE
  //############################################################################

  init() {
    const funcName = 'init';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.initGraph();
    this.initStateHandler();
    this.events.emit('flowchart_initialized', this);
  }

  update() {
    const funcName = 'refresh';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.xgraph?.update();
    // this.stateHandler?.refresh();
    // this.refreshStates();
    this.setBackgroundColor(this.data.bgColor);
    // this.onRefreshed();
    this.events.emit('flowchart_updated', this);
  }

  change() {
    const funcName = 'change';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.updateGraph();
    this.events.emit('flowchart_changed', this);
  }

  async free() {
    const funcName = 'destroy';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.xgraph?.free();
    this.stateHandler?.free();
    await this.events.emit('flowchart_freed', this);
    this.events.clear();
    this.clear();
  }

  clear(): this {
    this.xgraph?.clear();
    this.stateHandler?.clear();
    return this;
  }

  //############################################################################
  //### LOGIC
  //############################################################################
  private _convert(oldData: any): this {
    GFLog.info(`flowchart[${this.data.name}].import()`);
    if (!!oldData.download || this.data.download === false) {
      this.data.download = oldData.download;
    }
    // 0.3.0
    if (!!oldData.source) {
      this.data.type = oldData.source.type;
      this.data.xml = oldData.source.xml.value;
      this.data.url = oldData.source.url.value;
    }
    // 0.3.0
    if (!!oldData.options) {
      this.data.zoom = oldData.options.zoom;
      this.data.center = oldData.options.center;
      this.data.scale = oldData.options.scale;
      this.data.lock = oldData.options.lock;
      this.data.tooltip = oldData.options.tooltip;
      this.data.grid = oldData.options.grid;
      this.data.bgColor = oldData.options.bgColor;
    }
    if (!!oldData.type) {
      this.data.type = oldData.type;
    }
    if (!!oldData.xml) {
      this.data.xml = oldData.xml;
    }

    // 0.9.0
    if (!!oldData.csv) {
      this.data.csv = oldData.csv;
    }
    if (!!oldData.url) {
      this.data.url = oldData.url;
    }
    if (!!oldData.zoom) {
      this.data.zoom = oldData.zoom;
    }
    if (!!oldData.center || oldData.center === false) {
      this.data.center = oldData.center;
    }
    if (!!oldData.scale || oldData.scale === false) {
      this.data.scale = oldData.scale;
    }

    if (!!oldData.lock || oldData.lock === false) {
      this.data.lock = oldData.lock;
    }

    if (!!oldData.enableAnim || oldData.enableAnim === false) {
      this.data.enableAnim = oldData.enableAnim;
    }
    if (!!oldData.tooltip) {
      this.data.tooltip = oldData.tooltip;
    }
    if (!!oldData.grid || oldData.grid === false) {
      this.data.grid = oldData.grid;
    }
    if (!!oldData.bgColor) {
      this.data.bgColor = oldData.bgColor;
    }
    // this.setBackgroundColor(this.data.bgColor);
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

  initStateHandler(): this {
    if (this.xgraph) {
      this.stateHandler = new StateHandler(this.$gf, this.xgraph);
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
    const $GF = this.$gf;
    try {
      const content = this.getContent();
      if (this.xgraph === undefined) {
        this.xgraph = new XGraph(this.$gf, this.container, this.data.type, content);
      }
    } catch (error) {
      $GF.notify('Unable to initialize graph', 'error');
      GFLog.error('Unable to initialize graph', error);
    }
    return this;
  }

  updateGraph(): this {
    const $GF = this.$gf;
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
        $GF.clearNotify();
      } else {
        $GF.notify('Source content empty Graph not defined', 'error');
        GFLog.error('Source content empty Graph not defined');
      }
    } catch (error) {
      $GF.notify('Unable to initialize graph', 'error');
      GFLog.error('Unable to initialize graph', error);
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
  //   // GFLog.info(`flowchart[${this.data.name}].setStates()`);
  //   if (rules === undefined) {
  //     GFLog.warn("Rules shoudn't be null");
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
    // TODO: simplify it
    this.xgraph?.enableAnim(this.data.enableAnim);
    this.setScale(this.data.scale);
    this.setCenter(this.data.center);
    this.setGrid(this.data.grid);
    this.setTooltip(this.data.tooltip);
    this.setLock(this.data.lock);
    this.setZoom(this.data.zoom);
    // this.setBgColor(this.data.bgColor);
    return this;
  }

  /**
   * Apply new states (colors,text ...)
   *
   * @memberof Flowchart
   */
  // applyStates(): this {
  //   // GFLog.info(`flowchart[${this.data.name}].applyStates()`);
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
    return this.$gf.resolveVars(this.data.xml);
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
    return this.$gf.resolveVars(this.data.csv);
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
    const $GF = this.$gf;
    let content: string | null = '';
    if (this.data.download) {
      const url = $GF.resolveVars(this.data.url);
      $GF.notify(`Loading content definition for ${this.data.name}`, 'info');
      content = this.loadContent(url);
      $GF.clearNotify();
      if (content !== null) {
        if (replaceVarBool) {
          content = $GF.resolveVars(content);
        }
      }
    } else {
      content = this.getSource(replaceVarBool);
    }
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
    if (GFDrawio.isEncoded(this.data.xml)) {
      this.data.xml = GFDrawio.decode(this.data.xml);
      // this.data.xml = XGraph.decompress(this.data.xml);
    }
  }

  _encode() {
    if (!GFDrawio.isEncoded(this.data.xml)) {
      const xml = GFDrawio.encode(this.data.xml);
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

}
