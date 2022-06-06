// import { each as _each } from 'lodash';
import { $GF, GFTimer, GFLog, GFCONSTANT } from 'globals_class';
const dioCustom = require('drawio_custom');
import chroma from 'chroma-js';
import { Rule } from 'rule_class';
import { XCell } from 'cell_class';
// import { InteractiveMap } from 'mapping_class';
import { GFEvents } from 'flowcharting_base';
import { GFDrawio } from 'drawio_base';

// Debug
const DEBUG = false;
const _log = (...args: any) => {
  DEBUG && console.log(...args);
};

// Define signals
const xgraphSignalsArray = ['graph_initialized', 'graph_updated', 'graph_changed', 'graph_freed'] as const;
type XGraphSignals = typeof xgraphSignalsArray[number];

/**
 * mxGraph interface class
 *
 * @export
 * @class XGraph
 */
export class XGraph {
  private readonly $gf: $GF;
  private _isGraphIniatilized = false;
  container: HTMLDivElement;
  private _xmlGraph = '';
  private _csvGraph = '';
  private _type: gf.TSourceTypeKeys = 'xml';
  private _graph: any = undefined;
  private _scale = true;
  private _tooltip = true;
  private _lock = true;
  private _center = true;
  private _AllowDioRessources = false;
  private _animation = true;
  // private _zoom = false;
  // private _zoomFactor = 1.2;
  private _definition = '';
  private _cumulativeZoomFactor = 1;
  private _grid = false;
  uid: string;
  private _zoomPercent = '1';
  xcells: XCell[];
  dioClick: any;
  dioDbclick: any;
  // onMapping: InteractiveMap;
  events: GFEvents<XGraphSignals> = GFEvents.create(xgraphSignalsArray);
  /**
   * Creates an instance of XGraph.
   * @param {DOM} container
   * @param {string} definition
   * @memberof XGraph
   */
  constructor($gf: $GF, container: HTMLDivElement, type: gf.TSourceTypeKeys, definition: string) {
    this.$gf = $gf;
    this.uid = $GF.genUid(this.constructor.name);
    this.container = container;
    this._type = type;
    this.xcells = [];
    // this.onMapping = this.$gf.ctrl.onMapping;
    this._definition = definition;
    this.init();
  }

  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE
  //############################################################################

  init() {
    this._eventsConnect();
    if (this._type === 'xml') {
      if (GFDrawio.isEncoded(this._definition)) {
        this._xmlGraph = GFDrawio.decode(this._definition);
      } else {
        this._xmlGraph = this._definition;
      }
    }
    if (this._type === 'csv') {
      this._csvGraph = this._definition;
    }
    if (GFDrawio.isInitalized()) {
      this.init_graph();
    }
    // // DEBUG MODE
    // const self = this;
    // if ($GF.DEBUG) {
    //   console.log('DEBUG ON');
    //   this.graph.addListener(mxEvent.CLICK, (_sender: any, _evt: { properties: { cell: any } }) => {
    //     console.log('DEBUG CLICK');
    //     this.eventDebug(_evt);
    //     if (_evt.properties.cell) {
    //       const mxcell = _evt.properties.cell;
    //       const id = mxcell.id;
    //       const state = this.$gf.getVar(`STATE_${id}`);
    //       const xcell = self.getXCell(id);
    //       console.log('DEBUG GF STATE', state);
    //       console.log('DEBUG XCELL', xcell);
    //       console.log('DEBUG MXCELL', mxcell);
    //       if (xcell) {
    //         const mxcellState = xcell.getMxCellState();
    //         console.log('DEBUG MXCELL STATE', mxcellState);
    //       }
    //     }
    //   });
    // }
    // this._display();
    // this.events.emit('graph_initialized', this);
    return this;
  }

  change() {
    this.events.emit('graph_changed', this);
    return this;
  }

  update() {
    this.update_graph();
    this.events.emit('graph_updated', this);
    return this;
  }

  clear() {
    this.xcells = [];
  }

  free() {
    const funcName = 'free';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.free_graph();
    this.clear();
    this.events.emit('graph_freed', this);
    this._eventsDisconnect();
    this.events.clear();
    return this;
  }

  //############################################################################
  //### ACCESSORS (All checks in flowchart)
  //############################################################################
  set source(value: string) {
    if (this._type === 'xml') {
      this._xmlGraph = value;
    }
    if (this._type === 'csv' && this._csvGraph === value) {
      this._csvGraph = value;
    }
  }
  get source() {
    return this._type === 'csv' ? this._csvGraph : this._xmlGraph;
  }

  //############################################################################
  //### PRIVATE
  //############################################################################
  private _eventsConnect() {
    this.$gf.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    GFDrawio.events.connect('drawio_initialized', this, this._on_drawio_drawio_initialized.bind(this));
  }

  private _eventsDisconnect() {
    this.$gf.events.disconnect('debug_asked', this);
    GFDrawio.events.disconnect('drawio_initialized', this);
  }

  //############################################################################
  //### LOGIC
  //############################################################################
  async init_graph() {
    if (!this._isGraphIniatilized && GFDrawio.isInitalized()) {
      this._isGraphIniatilized = true;
      await this._init_mxGraph();
      this._init_fonts();
      await this._display();
      await this.update_options();
      await this._init_xcells();
      this.events.emit('graph_initialized');
      this.change();
    }
    return;
  }

  isInitialized() {
    return this._isGraphIniatilized;
  }

  private async _init_mxGraph() {
    this._graph = new Graph(this.container);
    // /!\ What is setPannig
    this._graph.setPanning(true);
    // Backup funtions of clicks
    this.dioClick = this._graph.click.bind(this._graph);
    this._graph.click = this._on_xgraph_mxcell_clicked.bind(this);
    this.dioDbclick = this._graph.dblClick;
    // CTRL+MOUSEWHEEL
    mxEvent.addMouseWheelListener(mxUtils.bind(this, this.eventMouseWheel), this.container);
    if (mxClient.IS_IE || mxClient.IS_EDGE) {
      mxEvent.addListener(this.container, 'wheel', mxUtils.bind(this, this.eventMouseWheel));
    }
    // KEYS
    mxEvent.addListener(document, 'keydown', mxUtils.bind(this, this.eventKey));
    // CONTEXT MENU
    this.container.addEventListener('contextmenu', (e) => e.preventDefault());
    // DB CLICK
    this._graph.dblClick = this.eventDbClick.bind(this);
    return;
  }

  /**
   * Draw graph
   *
   * @returns {this}
   * @memberof XGraph
   */
  private _display(): this {
    if (this._graph === undefined) {
      throw new Error('Graph class was not created');
    }
    this._graph.getModel().beginUpdate();
    this._graph.getModel().clear();
    try {
      if (this._type === 'xml') {
        const xmlDoc = mxUtils.parseXml(this._xmlGraph);
        const codec = new mxCodec(xmlDoc);
        this._graph.model.clear();
        this._graph.view.scale = 1;
        codec.decode(xmlDoc.documentElement, this._graph.getModel());
        this._init_fonts();
        this._graph.updateCssTransform();
        this._graph.selectUnlockedLayer();
      }
      if (this._type === 'csv') {
        try {
          dioCustom.importCsv(this._graph, this._csvGraph);
          this.update_graph();
        } catch (error) {
          GFLog.error('Bad CSV format', error);
          this.$gf.notify('Bad CSV format', 'error');
        }
      }
    } catch (error) {
      GFLog.error('Error in draw', error);
    } finally {
      this._graph.getModel().endUpdate();
      this._init_xcells();
    }
    return this;
  }

  /**
   * Init XCells
   *
   * @memberof XGraph
   */
  private async _init_xcells() {
    const model = this._graph.getModel();
    this.xcells = [];
    const cells = Object.values(model.cells);
    return Promise.all(
      cells.map(async (mxcell: mxCell) => {
        const xcell = XCell.refactore(this._graph, mxcell);
        this.xcells.push(xcell);
      })
    );
  }

  /**
   * Load external Fonts
   *
   * @memberof XGraph
   */
  private async _init_fonts() {
    if (!this._graph) {
      return;
    }
    const model = this._graph.getModel();
    let extFonts = model.extFonts;
    if (extFonts) {
      try {
        extFonts = extFonts.split('|').map((ef: any) => {
          var parts = ef.split('^');
          return { name: parts[0], url: parts[1] };
        });

        for (var i = 0; i < extFonts.length; i++) {
          this._graph?.addExtFont(extFonts[i].name, extFonts[i].url);
        }
      } catch (e: any) {
        GFLog.error('ExtFonts format error:', e.message);
      }
    }
    return;
  }

  /**
   * Apply options on graph
   *
   * @return this
   * @memberof XGraph
   */
  async update_options() {
    if (!this.isInitialized()) {
      return this;
    }
    this.zoomDisplay();
    this.enableTooltip();
    this.enableLock();
    this.scaleDisplay();
    this.centerDisplay();
    this.gridDisplay();
    this.enableDioRessources();
    this.enableAnimation();
    this._graph.foldingEnabled = true;
    this._graph.cellRenderer.forceControlClickHandler = true;
    return;
  }

  /**
   * Refresh graph
   *
   * @returns {this}
   * @memberof XGraph
   */
  update_graph(): this {
    if (!this.isInitialized()) {
      return this;
    }
    this._cumulativeZoomFactor = 1;
    this._graph.zoomActual();
    this.update_options();
    this._graph.refresh();
    return this;
  }

  /**
   * Destroy Graph object and DOM
   *
   * @returns {this}
   * @memberof XGraph
   */
  free_graph(): this {
    this._graph?.destroy();
    this._graph = undefined;
    return this;
  }

  /**
   * lock cells
   *
   * @returns {this}
   * @param {Boolean} bool
   * @memberof XGraph
   */
  enableLock(bool: boolean = this._lock): this {
    this._lock = bool;
    if (!this.isInitialized()) {
      return this;
    }
    if (bool) {
      this._graph.setEnabled(false);
    } else {
      this._graph.setEnabled(true);
    }
    return this;
  }

  /**
   * Enable tooltip
   *
   * @returns {this}
   * @param {Boolean} bool
   * @memberof XGraph
   */
  enableTooltip(bool: boolean = this._tooltip): this {
    this._tooltip = bool;
    if (!this._isGraphIniatilized) {
      return this;
    }
    if (bool) {
      this._graph.setTooltips(true);
    } else {
      this._graph.setTooltips(false);
    }
    return this;
  }

  //TODO : Move to GFDrawio
  /**
   * Anonymize Graph
   *
   * @memberof XGraph
   */
  async anonymize() {
    dioCustom.anonymize(this._graph);
  }

  /**
   * Allow downloads images from site draw.io
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof XGraph
   */
  enableDioRessources(bool: boolean = this._AllowDioRessources): this {
    if (!this._isGraphIniatilized) {
      return this;
    }
    this._AllowDioRessources = bool;
    if (!this._isGraphIniatilized) {
      return this;
    }
    if (bool) {
      mxUrlConverter.prototype.baseUrl = GFCONSTANT.CONF_EDITOR_URL;
      mxUrlConverter.prototype.baseDomain = '';
      return this;
    }
    // Else
    mxUrlConverter.prototype.baseUrl = null;
    mxUrlConverter.prototype.baseDomain = null;
    return this;
  }

  /**
   * Enable Animation when change mxcell (colors, size ...)
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof XGraph
   */
  enableAnimation(bool: boolean = this._animation): this {
    this._animation = bool;
    return this;
  }

  /**
   * Center graph in panel
   *
   * @returns {this}
   * @param {Boolean} bool
   * @memberof XGraph
   */
  centerDisplay(bool: boolean = this._center): this {
    this._center = bool;
    if (!this._isGraphIniatilized) {
      return this;
    }
    this._graph.centerZoom = false;
    if (this._center === true) {
      if (this._scale === true) {
        this._fitDisplay();
      } else {
        this._graph.center(true, true);
      }
    }
    if (this._center === false) {
      this._graph.center(false, false);
    }
    return this;
  }

  /**
   * Scale graph in panel
   *
   * @returns {this}
   * @param {boolean} bool
   * @memberof XGraph
   */
  scaleDisplay(bool: boolean = this._scale): this {
    this._scale = bool;
    if (!this._isGraphIniatilized) {
      return this;
    }
    if (this._scale === false) {
      this.zoomDisplay();
    }
    if (this._scale === true) {
      // Scale and center
      if (this._center) {
        this._fitDisplay();
      }
      // Only scale
      else {
        this._graph.fit();
        this._graph.zoomActual();
      }
      return this;
    }
    return this;
  }

  /**
   * Scale graph into container
   *
   * @returns {this}
   * @memberof XGraph
   */
  private _fitDisplay(): this {
    if (!this._isGraphIniatilized) {
      return this;
    }
    const margin = 2;
    const max = 3;

    const bounds = this._graph.getGraphBounds();
    const cw = this._graph.container.clientWidth - margin;
    const ch = this._graph.container.clientHeight - margin;
    const w = bounds.width / this._graph.view.scale;
    const h = bounds.height / this._graph.view.scale;
    const s = Math.min(max, Math.min(cw / w, ch / h));

    this._graph.view.scaleAndTranslate(
      s,
      (margin + cw - w * s) / (2 * s) - bounds.x / this._graph.view.scale,
      (margin + ch - h * s) / (2 * s) - bounds.y / this._graph.view.scale
    );
    return this;
  }

  /**
   * Display grid in panel
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof XGraph
   */
  gridDisplay(bool: boolean = this._grid): this {
    this._grid = bool;
    if (bool) {
      this.container.style.backgroundImage =
        "url('data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=')";
    } else {
      this.container.style.backgroundImage = '';
    }
    return this;
  }

  /**
   * Zoom/unzoom
   *
   * @param {string} percent
   * @returns {this}
   * @memberof XGraph
   */
  zoomDisplay(percent: string = this._zoomPercent): this {
    this._zoomPercent = percent;
    if (!this.isInitialized()) {
      return this;
    }
    if (!this._scale) {
      if (percent && percent.length > 0 && percent !== '100%' && percent !== '0%') {
        const ratio: number = Number(percent.replace('%', '')) / 100;
        this._graph.zoomTo(ratio, true);
      }
      this._graph.zoomActual();
    } else {
      this._fitDisplay();
    }
    // this._zoom = true;
    return this;
  }

  /**
   * Restore initial size
   *
   * @returns {this}
   * @memberof XGraph
   */
  // unzoomDisplay(): this {
  //   if (!this.isInitialized()) {
  //     return this;
  //   }
  //   // this._zoom = false;
  //   this._graph.zoomActual();
  //   return this;
  // }

  /**
   * Return mxgraph object
   *
   * @returns
   * @memberof XGraph
   */
  getMxGraph() {
    return this._graph;
  }

  /**
   * Return xml definition
   *
   * @returns {string}
   * @memberof XGraph
   */
  // getxmlGraph(): string {
  //   return this._xmlGraph;
  // }

  /**
   * Assign source definition and redraw graph
   *
   * @param {string} xmlGraph
   * @returns {this}
   * @memberof XGraph
   */
  // setContent(content: string): this {
  //   if (this.type === 'xml') {
  //     if (GFDrawio.isEncoded(content)) {
  //       this._xmlGraph = GFDrawio.decode(content);
  //     } else {
  //       this._xmlGraph = content;
  //     }
  //   }
  //   if (this.type === 'csv') {
  //     this._csvGraph = content;
  //   }
  //   return this;
  // }

  /**
   * Return XCells of graph
   *
   * @returns {XCell[]}
   * @memberof XGraph
   */
  getXCells(): XCell[] {
    return this.xcells;
  }

  /**
   * Get a value list
   *
   * @param {gf.TPropertieKey} type
   * @returns
   * @memberof XGraph
   */
  getXCellValues(type: gf.TPropertieKey): string[] {
    const values: string[] = [];
    this.getXCells().forEach((c) => values.push(c.getDefaultValue(type)));
    return values;
  }

  /**
   * Get the XCell according id
   *
   * @param {string} id
   * @returns {(XCell | undefined)}
   * @memberof XGraph
   */
  getXCell(id: string): XCell | undefined {
    const length = this.xcells.length;
    for (let index = 0; index < length; index++) {
      const x = this.xcells[index];
      if (x.getDefaultValue('id') === id) {
        return x;
      }
    }
    return undefined;
  }

  /**
   * Get list of XCell
   *
   * @param {string} pattern
   * @param {gf.TRuleMapOptions} [options=Rule.getDefaultMapOptions()]
   * @returns {XCell[]}
   * @memberof XGraph
   */
  findXCells(pattern: string, options: gf.TRuleMapOptions = Rule.getDefaultMapOptions()): XCell[] {
    const xcells = this.getXCells();
    const result: any[] = [];
    const length = xcells.length;
    for (let index = 0; index < length; index++) {
      const x = xcells[index];
      if (x.match(pattern, options)) {
        result.push(x);
      }
    }
    return result;
  }

  /**
   * Hightlight XCells
   *
   * @param {string} prop - "id"|"value"|"metadata"
   * @param {string} pattern - regex like
   * @memberof XGraph
   */
  async highlightXCells(pattern: string, options?: gf.TRuleMapOptions, bool = true) {
    const xcells = this.findXCells(pattern, options);
    return xcells.map(async (x) => {
      x.highlight(bool);
    });
  }

  /**
   * unHightlight XCells
   *
   * @returns {this}
   * @memberof XGraph
   */
  async unhighlightXCells(pattern: string, options?: gf.TRuleMapOptions) {
    return this.highlightXCells(pattern, options, false);
  }

  /**
   * Get value or id from cell source
   *
   * @param { gf.TPropertieKey} prop
   * @returns {string[]} value of labels or id frome source
   * @memberof XGraph
   */
  getDefaultValues(options: gf.TRuleMapOptions): string[] {
    return this.getXCellValues(options.identByProp);
  }

  getDefaultValuesWithKey(options: gf.TRuleMapOptions, key: string): string[] {
    const xcells = this.getXCells();
    const length = xcells.length;
    let values: Set<string> = new Set();
    for (let i = 0; i < length; i++) {
      const xcell = xcells[i];
      const datas = xcell.getDefaultValues(options);
      datas.forEach((x: string) => {
        if (x !== null && x !== undefined && x.length > 0) {
          values.add(x);
        }
      });
    }
    return Array.from(values.keys());
  }

  /**
   * Get xml definition from current graph
   *
   * @returns
   * @memberof XGraph
   */
  getXmlModel() {
    const encoder = new mxCodec();
    const node = encoder.encode(this._graph.getModel());
    return mxUtils.getXml(node);
  }

  isAnimated() {
    return this._animation;
  }

  /**
   * Apply color style on Cell
   *
   * @param {mxCell} xcell
   * @param {gf.TStyleColor.Keys} style
   * @param {(string | null)} color
   * @param {boolean} [animate=false]
   * @returns {this}
   * @memberof XGraph
   */
  setAnimColorCell(xcell: XCell, style: gf.TStyleColorKeys, color: string | null): this {
    if (this.isAnimated() && color) {
      try {
        const timeId = `${style}-${this.uid}-${xcell.uid}`;
        const startColor = xcell.getStyle(style);
        if (startColor) {
          const endColor = color;
          const steps = chroma
            .scale([startColor, endColor])
            .mode('lrgb')
            .colors(GFCONSTANT.CONF_COLORS_STEPS + 1);
          const timer = GFTimer.create(timeId);
          const ms = GFCONSTANT.CONF_COLORS_MS;
          for (let i = 1; i < steps.length; i++) {
            timer.addStep(xcell.setStyle.bind(xcell, style, steps[i]), ms * i);
          }
          timer.start();
        } else {
          // let hex = Color(color).hex();
          let hex = chroma(color).hex();
          xcell.setStyle(style, hex);
        }
      } catch (error) {
        GFLog.error('Error on graduate color', error);
        xcell.setStyle(style, color);
      }
    } else {
      if (color !== null) {
        try {
          color = chroma(color).hex();
        } catch (error) {
          GFLog.error('Invalid Color', color);
        }
      }
      xcell.setStyle(style, color);
    }
    return this;
  }

  /**
   * Change style with steps to anime
   *
   * @param {mxCell} xcell
   * @param {*} style
   * @param {(string | null)} endValue
   * @param {string} [beginValue]
   * @memberof XGraph
   */
  async setAnimStyleCell(xcell: XCell, style: gf.TStyleAnimKeys, endValue: string | null, beginValue?: string) {
    if (this.isAnimated() && endValue !== null) {
      try {
        const end = Number(endValue);
        const begin = beginValue !== undefined ? Number(beginValue) : Number(xcell.getStyle(style));
        if (end !== begin) {
          const timeId = `${style}-${this.uid}-${xcell.uid}`;
          // Cancel Previous anim
          const steps = $GF.calculateIntervalCounter(begin, end, GFCONSTANT.CONF_ANIMS_STEP);
          const length = steps.length;
          const timer = GFTimer.create(timeId);
          const ms = GFCONSTANT.CONF_ANIMS_MS;
          for (let i = 1; i < length; i++) {
            timer.addStep(xcell.setStyle.bind(xcell, style, steps[i].toString()), ms * i);
          }
          timer.start();
        }
      } catch (error) {
        this._graph.setCellStyles(style, endValue, [xcell]);
      }
    } else {
      // this.graph.setCellStyles(style, endValue, [xcell]);
      xcell.setStyle(style, endValue);
    }
  }

  static isMxGraphStyle(type: string): boolean {
    const t: any = type;
    return GFCONSTANT.MXGRAPH_STYLES.includes(t);
  }

  static isMxGraphAnimStyle(type: string): boolean {
    const t: any = type;
    return GFCONSTANT.MXGRAPH_STYLES_ANIM.includes(t);
  }

  static isMxGraphStaticStyle(type: string): boolean {
    const t: any = type;
    return GFCONSTANT.MXGRAPH_STYLES_STATIC.includes(t);
  }

  eventDebug(me: mxMouseEvent) {
    console.log('🔎', 'mxMouseEvent', me);
  }

  /**
   * Event for double click on graph
   *
   * @param {MouseEvent} evt
   * @param {mxCell} mxcell
   * @memberof XGraph
   */
  eventDbClick(evt: MouseEvent, mxcell: mxCell) {
    if (mxcell !== undefined) {
      const xcell = this.getXCell(mxcell.id);
      if (xcell) {
        this.lazyZoomCell(xcell);
      }
    }
  }

  /**
   * Event for mouse wheel on graph
   *
   * @param {Event} evt
   * @param {boolean} up
   * @memberof XGraph
   */
  eventMouseWheel(evt: WheelEvent, up: boolean) {
    // console.log('eventMouseWheel', this.ctrl.id, this.ctrl.isMouseInPanel());
    // this.ctrl.notify(`Zoom ${this.cumulativeZoomFactor}`);
    if (this._graph.isZoomWheelEvent(evt) && this.$gf.ctrl.isMouseInPanel()) {
      if (up === null || up === undefined) {
        if (evt.deltaY < 0) {
          up = true;
        } else {
          up = false;
        }
      }
      const rect = this.container.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;

      if (up) {
        this._cumulativeZoomFactor = this._cumulativeZoomFactor * 1.2;
      } else {
        this._cumulativeZoomFactor = this._cumulativeZoomFactor * 0.8;
      }
      this.lazyZoomPointer(this._cumulativeZoomFactor, x, y);
      mxEvent.consume(evt);
    }
  }

  /**
   * Event for key on graph
   *
   * @param {KeyboardEvent} evt
   * @memberof XGraph
   */
  eventKey(evt: KeyboardEvent) {
    if (!mxEvent.isConsumed(evt) && evt.keyCode === 27 /* Escape */) {
      this.update_graph();
    }
  }

  /**
   * Zoom/Unzoom on graph on center
   *
   * @param {number} factor - 1 = 100%
   * @memberof XGraph
   */
  async lazyZoomCenter(factor: number) {
    this._graph.zoomTo(factor, true);
  }

  /**
   * Zoom/Unzoom on graph on mouse pointer
   *
   * @param {number} factor
   * @param {number} offsetX
   * @param {number} offsetY
   * @memberof XGraph
   */
  async lazyZoomPointer(factor: number, offsetX: number, offsetY: number) {
    let dx = offsetX * 2;
    let dy = offsetY * 2;

    factor = Math.max(0.01, Math.min(this._graph.view.scale * factor, 160)) / this._graph.view.scale;
    factor = this._cumulativeZoomFactor / this._graph.view.scale;
    const scale = Math.round(this._graph.view.scale * factor * 100) / 100;
    factor = scale / this._graph.view.scale;

    if (factor > 1) {
      const f = (factor - 1) / (scale * 2);
      dx *= -f;
      dy *= -f;
    } else {
      const f = (1 / factor - 1) / (this._graph.view.scale * 2);
      dx *= f;
      dy *= f;
    }
    this._graph.view.scaleAndTranslate(scale, this._graph.view.translate.x + dx, this._graph.view.translate.y + dy);
  }

  /**
   * Highlights the given cell.
   *
   * @param {mxCell[]} xcells
   * @memberof XGraph
   */
  async highlightCells(xcells: XCell[] = this.getXCells()) {
    for (let i = 0; i < xcells.length; i++) {
      xcells[i].highlight();
    }
  }

  /**
   * UnHighlights the given array of cells.
   *
   * @param {mxCell[]} cells
   * @memberof XGraph
   */
  async unhighlightCells(xcells: XCell[] = this.getXCells()) {
    for (let i = 0; i < xcells.length; i++) {
      xcells[i].highlight(false);
    }
  }

  /**
   * Zoom cell with animation
   *
   * @param {XCell} xcell
   * @param {number} percent
   * @memberof XGraph
   */
  async setAnimZoomCell(xcell: XCell, percent: number) {
    if (this.isAnimated()) {
      const timeId = `setAnimZoomCell-${this.uid}${xcell.getId}`;
      const percents = $GF.calculateIntervalCounter(xcell.percent, percent, GFCONSTANT.CONF_ANIMS_STEP);
      const timer = GFTimer.create(timeId);
      const length = percents.length;
      const ms = GFCONSTANT.CONF_ANIMS_MS;
      for (let i = 1; i < length; i++) {
        timer.addStep(xcell.zoom.bind(xcell, percents[i]), ms * i);
      }
      timer.start();
    } else {
      xcell.zoom(percent);
    }
  }

  /**
   * Resize cell with animation
   *
   * @param {mxCell} xcell
   * @param {(number | undefined)} width
   * @param {(number | undefined)} height
   * @param {mxGeometry} [origine]
   * @memberof XGraph
   */
  async setAnimSizeCell(xcell: XCell, width: number | undefined, height: number | undefined) {
    const dim = xcell.getDimension();
    const wdir = width !== undefined && width >= 0 ? 1 : -1;
    const hdir = height !== undefined && height >= 0 ? 1 : -1;
    width = width !== undefined ? width : undefined;
    height = height !== undefined ? height : undefined;
    // $GF.clearUniqTimeOut(timeId);
    if (this.isAnimated()) {
      const timeId = `setAnimSizeCell-${this.uid}-${xcell.getId()}`;
      const widths = $GF.calculateIntervalCounter(dim.width * wdir, width, GFCONSTANT.CONF_ANIMS_STEP);
      const heights = $GF.calculateIntervalCounter(dim.height * hdir, height, GFCONSTANT.CONF_ANIMS_STEP);
      const length = widths.length;
      const timer = GFTimer.create(timeId);
      const ms = GFCONSTANT.CONF_ANIMS_MS;
      for (let i = 1; i < length; i++) {
        timer.addStep(xcell.resize.bind(xcell, widths[i], heights[i]), ms * i);
      }
      timer.start();
    } else {
      xcell.resize(width, height);
    }
  }

  /**
   * Zoom cell on full panel
   *
   * @param {mxCell} mxcell
   * @memberof XGraph
   */
  async lazyZoomCell(xcell: XCell) {
    if (xcell.isVertex()) {
      const state = xcell.getMxCellState();
      if (state !== null) {
        let rect: any;
        if (state.width !== undefined && state.width > 0 && state.height !== undefined && state.height > 0) {
          rect = state.shape.bounds;
        } else {
          rect = state.text.boundingBox;
        }
        this._graph.zoomToRect(rect);
        this._cumulativeZoomFactor = this._graph.view.scale;
      }
    }
  }

  // static compress(source: string): string {
  //   return Graph.compress(source, true);
  // }

  // static decompress(source: string): string {
  //   return Graph.decompress(source, true);
  // }

  static preview(container: HTMLElement, xcell: XCell, force = false) {
    const g = new Graph(container);
    if (g) {
      try {
        const model = g.getModel();
        model.beginUpdate();
        model.clear();
        const clone = xcell.cloneMxCell();
        g.setTooltips(false);
        const parent = model.getChildAt(model.getRoot(), 0);
        model.add(parent, clone);
        g.updateCssTransform();
        g.selectUnlockedLayer();
        g.view.rendering = true;
        g.setEnabled(false);
        g.getModel().endUpdate();
        const margin = 2;
        const max = 3;
        const bounds = g.getGraphBounds();
        const cw = g.container.clientWidth - margin;
        const ch = g.container.clientHeight - margin;
        const w = bounds.width / g.view.scale;
        const h = bounds.height / g.view.scale;
        const s = Math.min(max, Math.min(cw / w, ch / h));

        g.view.scaleAndTranslate(
          s,
          (margin + cw - w * s) / (2 * s) - bounds.x / g.view.scale,
          (margin + ch - h * s) / (2 * s) - bounds.y / g.view.scale
        );
      } catch (error) {
        GFLog.error('Error in preview', error);
      }
    }
  }

  //#############################################################################
  //### EVENTS
  //#############################################################################
  private _on_global_debug_asked() {
    _log('📬', this.constructor.name, '_on_global_debug_asked');
    _log('🗃️', this.constructor.name, this);
  }

  private _on_drawio_drawio_initialized() {
    _log('📬', this.constructor.name, '_on_drawio_drawio_initialized');
    this.init_graph();
  }

  private _on_xgraph_mxcell_clicked(e: mxMouseEvent) {
    _log('📬', this.constructor.name, '_on_xgraph_mxcell_clicked', e);
    this.dioClick(e);
    const state = e.getState();
    if (state) {
      const xcell = this.getXCell(state.cell.id);
      this.$gf.events.emit('xcell_clicked', xcell);
    }
  }
}
