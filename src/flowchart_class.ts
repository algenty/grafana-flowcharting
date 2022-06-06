import { XGraph } from 'graph_class';
import { StateHandler } from 'states_handler';
// import { FlowchartHandler } from 'flowchart_handler';
import { $GF, GFLog } from 'globals_class';
import { GFEvents } from 'flowcharting_base';
import { GFDrawio } from 'drawio_base';

// Debug
const DEBUG = false;
const _log = (...args: any) => {
  DEBUG && console.log(...args);
};

// Define signals
const flowchartSignalsArray = [
  'flowchart_initialized',
  'flowchart_updated',
  'flowchart_changed',
  'flowchart_freed',
  'graph_changed',
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
  private xgraph: XGraph | undefined;
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
    this.init_xgraph();
    this.init_stateHandler();
    this.$gf.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    this.events.emit('flowchart_initialized', this);
  }

  update() {
    const funcName = 'refresh';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.update_graph();
    this.events.emit('flowchart_updated', this);
  }

  change() {
    this.change_xgraph();
    this.events.emit('flowchart_changed', this);
  }

  async free() {
    this?.xgraph?.events.disconnect('graph_changed', this);
    this.$gf.events.disconnect('debug_asked', this);
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
  //### ACCESSORS
  //############################################################################
  // NAME
  set name(value: string) {
    if (!value || value.length === 0 || value === this.data.name) {
      return;
    }
    const exist = this.$gf.flowchartHandler?.getFlowchart(value);
    if (exist) {
      this.$gf.notify(`Flowchart with name ${value} already exit`, 'error');
    } else {
      this.data.name = value;
    }
  }
  get name() {
    return this.data.name;
  }

  // TYPE
  set type(value: gf.TSourceTypeKeys) {
    if (this.data.type !== value) {
      this.data.type = value;
      this.change();
    }
  }
  get type() {
    return this.data.type;
  }

  // SOURCE
  set source(value: string) {
    if (this.type === 'xml') {
      if (this.data.xml === value) {
        return;
      }
      value = GFDrawio.isEncoded(value) ? GFDrawio.decode(value) : value;
      if (GFDrawio.isValidXml(value) === false) {
        this.$gf.notify('Invalid XML format', 'error');
        return;
      }
      this.data.xml = value;
    }
    if (this.type === 'csv') {
      if (this.data.csv === value) {
        return;
      }
      this.data.csv = value;
    }
    this.change();
  }
  get source() {
    return this.data.type === 'csv' ? this.data.csv : this.data.xml;
  }

  // DOWNLOAD
  set download(value: boolean) {
    if (value === this.data.download) {
      return;
    }
    this.data.download = value;
    this.change();
  }
  get download() {
    return this.data.download;
  }

  // URL
  set url(value: string) {
    if (value === this.data.url) {
      return;
    }
    //TODO : Check url
    this.data.url = value;
    this.change();
  }
  get url() {
    return this.data.url;
  }

  //BACKGROUND
  set background(value: string) {
    if (value !== this.data.bgColor) {
      this.data.bgColor = value ?? '';
      this._colorBackgroundContainer(value);
    }
  }
  get background() {
    return this.data.bgColor ?? '';
  }

  //SCALE
  set scale(value: boolean) {
    if (value === this.data.scale || !this.xgraph) {
      return;
    }
    this.data.scale = value;
    this.scaleGraph(value);
  }
  get scale() {
    return this.data.scale;
  }

  //CENTER
  set center(value: boolean) {
    if (value === this.data.center || !this.xgraph) {
      return;
    }
    this.data.center = value;
    this.centerGraph(value);
  }
  get center() {
    return this.data.center;
  }

  //TOOLTIP
  set tooltip(value: boolean) {
    if (value === this.data.tooltip || !this.xgraph) {
      return;
    }
    this.data.tooltip = value;
    this.enableTooltip(value);
  }
  get tooltip() {
    return this.data.tooltip;
  }

  //GRID
  set grid(value: boolean) {
    if (value === this.data.grid || !this.xgraph) {
      return;
    }
    this.data.grid = value;
    this.enableGrid(value);
  }
  get grid() {
    return this.data.grid;
  }

  //LOCK
  set lock(value: boolean) {
    if (value === this.data.lock || !this.xgraph) {
      return;
    }
    this.data.lock = value;
    this.enableLock(value);
  }
  get lock() {
    return this.data.lock;
  }

  //ANIMATION
  set animation(value: boolean) {
    if (value === this.data.enableAnim || !this.xgraph) {
      return;
    }
    this.data.enableAnim = value;
    this.enableAnimation(value);
  }
  get animation() {
    return this.data.enableAnim;
  }

  //zoom
  set zoom(value: string) {
    if (value === this.data.zoom || !this.xgraph) {
      return;
    }
    this.data.zoom = value;
    this.zoomGraph(value);
  }
  get zoom() {
    return this.data.zoom;
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
      xml: '',
      csv: '',
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

  init_stateHandler(): this {
    if (this.stateHandler) {
      this.stateHandler.free();
    }
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
  async init_xgraph() {
    const $GF = this.$gf;
    try {
      return this.resolveSource().then((content) => {
        if (this.xgraph !== undefined) {
          this.xgraph.free();
        }
        this.xgraph = new XGraph(this.$gf, this.container, this.data.type, content);
        this.xgraph.events.connect('graph_changed', this, this._on_flowchart_graph_changed.bind(this));
        this.update_graph();
        this.events.emit('graph_changed', this.xgraph);
      });
    } catch (error) {
      $GF.notify('Unable to initialize graph', 'error');
      GFLog.error('Unable to initialize graph', error);
    }
    return;
  }

  change_xgraph(): this {
    const $GF = this.$gf;
    try {
      // const content = this.getResolvedSource();
      this.init_xgraph();
      $GF.clearNotify();
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
   * Init options of graph
   *
   * @memberof Flowchart
   */
  update_graph(): this {
    this.scaleGraph();
    this.centerGraph();
    this.enableGrid();
    this.enableTooltip();
    this.enableLock();
    this.zoomGraph();
    this.enableAnimation();
    this._colorBackgroundContainer(this.data.bgColor);
    this.xgraph?.update();
    return this;
  }

  /**
   * Reset and redraw graph when source changed
   *
   * @param {*} xmlGraph
   * @memberof Flowchart
   */
  // setContent(content?: string) {
  //   if (content !== undefined) {
  //     this.setGraphContent(content);
  //   }
  //   if (this.xgraph !== undefined) {
  //     this.xgraph?.setContent(this.getContent());
  //   }
  //   // this.applyOptions();
  // }

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
  // setName(name: string) {
  //   this.data.name = name;
  // }

  // getName(): string {
  //   return this.data.name;
  // }

  /**
   * Set paramater lock
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  enableLock(bool: boolean = this.lock): this {
    if (this.xgraph) {
      this.xgraph.enableLock(bool);
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
  // applyLock(bool: boolean): this {
  //   if (bool !== undefined) {
  //     this.data.lock = bool;
  //   }
  //   if (this.xgraph) {
  //     this.xgraph.enableLock(this.data.lock);
  //   }
  //   return this;
  // }

  enableAnimation(bool: boolean = this.animation): this {
    if (this.xgraph) {
      this.xgraph.enableAnimation(bool);
    }
    return this;
  }

  enableTooltip(bool: boolean = this.tooltip): this {
    if (this.xgraph) {
      this.xgraph.enableTooltip(bool);
    }
    return this;
  }

  // applyTooltip(bool: boolean): this {
  //   if (bool !== undefined) {
  //     this.data.tooltip = bool;
  //   }
  //   if (this.xgraph) {
  //     this.xgraph.enableTooltip(this.data.tooltip);
  //   }
  //   return this;
  // }

  /**
   * Set scale parameter
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  scaleGraph(bool: boolean = this.scale): this {
    this.xgraph?.scaleDisplay(bool);
    return this;
  }

  private _colorBackgroundContainer(color: string | null = this.background): this {
    if (color) {
      this.container.style.backgroundColor = color;
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
  // applyScale(bool: boolean): this {
  //   if (bool !== undefined) {
  //     this.data.scale = bool;
  //   }
  //   if (this.xgraph) {
  //     this.xgraph.scaleDisplay(this.data.scale);
  //   }
  //   return this;
  // }

  /**
   * set center parameter
   *
   * @param {boolean} bool
   * @returns
   * @memberof Flowchart
   */
  // centerGraph(bool: boolean) {
  //   this.data.center = bool;
  //   if (this.xgraph) {
  //     this.xgraph.centerDisplay(bool);
  //   }
  //   return this;
  // }

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
  // getXml(replaceVarBool = true): string {
  //   if (!replaceVarBool) {
  //     return this.data.xml;
  //   }
  //   return this.$gf.resolveVars(this.data.xml);
  // }

  /**
   * get CSV def with var replaced
   *
   * @param {boolean} replaceVarBool
   * @returns {string}
   * @memberof Flowchart
   */
  // getCsv(replaceVarBool = true): string {
  //   if (!replaceVarBool) {
  //     return this.data.csv;
  //   }
  //   return this.$gf.resolveVars(this.data.csv);
  // }

  /**
   * Get data source according type
   *
   * @param {boolean} [replaceVarBool=true]
   * @returns
   * @memberof Flowchart
   */
  // getSource(replaceVarBool = true) {
  //   if (this.data.type === 'xml') {
  //     return this.getXml(replaceVarBool);
  //   }
  //   if (this.data.type === 'csv') {
  //     return this.getCsv(replaceVarBool);
  //   }
  //   return '';
  // }

  enableDioREssources(bool: boolean): this {
    if (this.xgraph) {
      this.xgraph.enableDioRessources(bool);
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
  async resolveSource(replaceVarBool = true): Promise<string> {
    const $GF = this.$gf;
    let content = '';
    if (this.download) {
      const url = $GF.resolveVars(this.data.url);
      $GF.notify(`Loading content definition for ${this.data.name}`, 'info');
      content = await GFDrawio.loadFile(url);
      $GF.clearNotify();
      if (content !== null) {
        if (replaceVarBool) {
          content = $GF.resolveVars(content);
        }
      }
    } else {
      if (!this.source || this.source.length === 0) {
        content = await GFDrawio.getTemplate(this.type);
        if (this.type === 'xml') {
          this.data.xml = content;
        }
        if (this.type === 'csv') {
          this.data.csv = content;
        }
      }
      if (GFDrawio.isEncoded(content)) {
        content = GFDrawio.decode(content);
      }
      content = $GF.resolveVars(this.source);
    }
    return content;
  }

  /**
   * Load source from url
   *
   * @param {*} url
   * @returns
   * @memberof Flowchart
   */
  //TODO : Transform to fetch
  // loadContent(url: string): string | null {
  //   return $GF.utils.$loadFile(url);
  // }

  /**
   * Apply xml to graph
   *
   * @returns {this}
   * @memberof Flowchart
   */
  // applyModel(): this {
  //   if (this.xgraph) {
  //     this.data.xml = this.xgraph.getXmlModel();
  //   }
  //   this.setContent();
  //   return this;
  // }

  centerGraph(bool: boolean = this.center): this {
    this.xgraph?.centerDisplay(bool);
    return this;
  }

  zoomGraph(percent: string = this.zoom): this {
    if (this.xgraph) {
      this.xgraph.zoomDisplay(this.data.zoom);
    }
    return this;
  }

  enableGrid(bool: boolean = this.grid): this {
    if (this.xgraph) {
      this.xgraph.gridDisplay(this.data.grid);
    }
    return this;
  }

  minify() {
    this.data.xml = $GF.utils.minify(this.data.xml);
  }

  prettify() {
    this.data.xml = $GF.utils.prettify(this.data.xml);
  }

  decode() {
    if (GFDrawio.isEncoded(this.data.xml)) {
      this.data.xml = GFDrawio.decode(this.data.xml);
    }
  }

  encode() {
    if (!GFDrawio.isEncoded(this.data.xml)) {
      const xml = GFDrawio.encode(this.data.xml);
      this.data.xml = xml ? xml : this.data.xml;
    }
  }

  getContainer(): HTMLDivElement {
    return this.container;
  }

  // setMap() {
  //   if (this.xgraph) {
  //     this.xgraph.setMap();
  //   }
  // }

  // unsetMap() {
  //   if (this.xgraph) {
  //     this.xgraph.unsetMap();
  //   }
  // }

  toFront(forceRefresh = false): this {
    this.visible = true;
    this.container.className = 'gf-flowchartShow';
    if (forceRefresh) {
      this.update_graph();
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

  //###########################################################################
  //### EVENTS
  //###########################################################################
  private _on_flowchart_graph_changed() {
    _log('📬', this.constructor.name, '_on_flowchart_graph_changed');
    if (this.xgraph) {
      this.init_stateHandler();
      // this.stateHandler?.setXGraph(this.xgraph);
      // this.stateHandler?.init();
    }
  }

  private _on_global_debug_asked() {
    _log('📬', this.constructor.name, '_on_global_debug_asked');
    _log('🗃️', this.constructor.name, this);
  }
}
