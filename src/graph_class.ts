// import { each as _each } from 'lodash';
import { $GF, GFTimer, GFLog, GFPlugin, GFCONSTANT } from 'globals_class';
const dioCustom = require('drawio_custom');
import chroma from 'chroma-js';
const mxcustom = require('mxgraph_custom');
import { Rule } from 'rule_class';
import { XCell } from 'cell_class';
import { InteractiveMap } from 'mapping_class';
import { GFEvents } from 'flowcharting_base';
import { GFDrawio } from 'drawio_base';

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
  static initialized = false;
  container: HTMLDivElement;
  xmlGraph = '';
  csvGraph = '';
  type: gf.TSourceTypeKeys = 'xml';
  graph: any = undefined;
  scale = true;
  tooltip = true;
  lock = true;
  center = true;
  animation = true;
  zoom = false;
  zoomFactor = 1.2;
  definition = '';
  cumulativeZoomFactor = 1;
  grid = false;
  uid: string;
  zoomPercent = '1';
  xcells: XCell[];
  clickBackup: any;
  dbclickBackup: any;
  onMapping: InteractiveMap;
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
    this.type = type;
    this.xcells = [];
    this.onMapping = this.$gf.ctrl.onMapping;
    this.definition = definition;
    this.init();
    // TODO : not good, just for test
    // this.change();
  }

  init() {
    const funcName = 'init';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.$gf.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    XGraph.initMxGraphLib();
    if (this.type === 'xml') {
      if (GFDrawio.isEncoded(this.definition)) {
        this.xmlGraph = GFDrawio.decode(this.definition);
      } else {
        this.xmlGraph = this.definition;
      }
    }
    if (this.type === 'csv') {
      this.csvGraph = this.definition;
    }
    this.initMxGraph();
    // DEBUG MODE
    const self = this;
    if ($GF.DEBUG) {
      console.log('DEBUG ON');
      this.graph.addListener(mxEvent.CLICK, (_sender: any, _evt: { properties: { cell: any } }) => {
        console.log('DEBUG CLICK');
        this.eventDebug(_evt);
        if (_evt.properties.cell) {
          const mxcell = _evt.properties.cell;
          const id = mxcell.id;
          const state = this.$gf.getVar(`STATE_${id}`);
          const xcell = self.getXCell(id);
          console.log('DEBUG GF STATE', state);
          console.log('DEBUG XCELL', xcell);
          console.log('DEBUG MXCELL', mxcell);
          if (xcell) {
            const mxcellState = xcell.getMxCellState();
            console.log('DEBUG MXCELL STATE', mxcellState);
          }
        }
      });
    }
    this.renderGraph();
    this.events.emit('graph_initialized', this);
    return this;
  }

  change() {
    const funcName = 'change';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    // this._drawGraph();
    this.events.emit('graph_changed', this);
    return this;
  }

  update() {
    const funcName = 'update';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.updateGraph();
    this.events.emit('graph_updated', this);
    return this;
  }

  free() {
    const funcName = 'free';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.freeGraph();
    this.clear();
    this.events.emit('graph_freed', this);
    this.$gf.events.disconnect('debug_asked', this);
    this.events.clear()
    return this;
  }

  /**
   * Anonymize Graph
   *
   * @memberof XGraph
   */
  async anonymize() {
    dioCustom.anonymize(this.graph);
  }

  /**
   * Init Global vars an libs for mxgraph
   *
   * @static
   * @returns
   * @memberof XGraph
   */
  static async initMxGraphLib() {
    let myWindow: any = window;
    if (!XGraph.initialized) {
      if (myWindow.mxGraph === undefined) {
        XGraph.preInitGlobalVars();
        // Before 0.9
        // let code = $GF.utils.$loadFile(`${GFPlugin.getDrawioPath()}js/viewer.min.js`);
        // $GF.utils.evalRaw(code);

        // $GF.utils.$evalFile(`${GFPlugin.getDrawioPath()}js/viewer-static.min.js`);
        // $GF.utils.$evalFile(`${GFPlugin.getDrawioPath()}js/shapes.min.js`);

        // Eval Fileor Eval Code
        $GF.utils.$evalFile(`${GFPlugin.getRootPath()}${GFCONSTANT.CONF_FILE_DRAWIOLIB}`);
        // mxcustom.evalCode();
        mxcustom.customize();
        XGraph.postInitGlobalVars();
        // $GF.utils.$evalFile(`${GFPlugin.getLibsPath()}/Graph_custom.js`);
        // $GF.utils.evalRaw(code);
        mxTooltipHandler.prototype.delay = GFCONSTANT.CONF_TOOLTIPS_DELAY;
      }
      XGraph.initialized = true;
    }
  }

  /**
   * Init Vars for mxGraph
   *
   * @static
   * @memberof XGraph
   */
  static preInitGlobalVars() {
    const myWindow: any = window;
    myWindow.BASE_PATH = GFPlugin.getMxBasePath();
    myWindow.RESOURCES_PATH = GFPlugin.getMxResourcePath();
    myWindow.RESOURCE_BASE = GFPlugin.getMxResourcePath();
    myWindow.STENCIL_PATH = GFPlugin.getStencilsPath();
    myWindow.SHAPES_PATH = GFPlugin.getShapesPath();
    myWindow.IMAGE_PATH = GFPlugin.getMxImagePath();
    myWindow.STYLE_PATH = GFPlugin.getMxStylePath();
    myWindow.CSS_PATH = GFPlugin.getMxCssPath();
    myWindow.mxLanguages = ['en'];
    myWindow.DRAWIO_BASE_URL = GFPlugin.getDrawioPath(); // Replace with path to base of deployment, e.g. https://www.example.com/folder
    myWindow.DRAW_MATH_URL = GFPlugin.getDrawioPath(); // Replace with path to base of deployment, e.g. https://www.example.com/folder
    myWindow.DRAWIO_VIEWER_URL = GFPlugin.getDrawioPath() + 'viewer.min.js'; // Replace your path to the viewer js, e.g. https://www.example.com/js/viewer.min.js
    myWindow.DRAW_MATH_URL = GFPlugin.getDrawioPath() + 'math/';
    myWindow.DRAWIO_CONFIG = null; // Replace with your custom draw.io configurations. For more details, https://desk.draw.io/support/solutions/articles/16000058316
    const urlParams = {
      sync: 'none', // Disabled realtime
      lightbox: '1', // Uses lightbox in chromeless mode (larger zoom, no page visible, chromeless)
      nav: '1', // Enables folding in chromeless mode
      local: '1', // Uses device mode only
      embed: '1', // Runs in embed mode
      ui: 'min',
    };
    myWindow.urlParams = urlParams;
    myWindow.mxImageBasePath = GFPlugin.getMxImagePath();
    myWindow.mxBasePath = GFPlugin.getMxBasePath();
    myWindow.mxLoadStylesheets = true;
    myWindow.mxLanguage = 'en';
    myWindow.mxLoadResources = true;
  }

  static postInitGlobalVars() {
    const myWindow: any = window;
    myWindow.mxClient.mxBasePath = GFPlugin.getMxBasePath();
    myWindow.mxClient.mxImageBasePath = GFPlugin.getMxImagePath();
    myWindow.mxClient.mxLoadResources = true;
    myWindow.mxClient.mxLanguage = 'en';
    myWindow.mxClient.mxLoadStylesheets = true;
    myWindow.VSD_CONVERT_URL = null;
    myWindow.EMF_CONVERT_URL = null;
    myWindow.ICONSEARCH_PATH = null;
  }

  /**
   * Graph initilisation and reset
   *
   * @memberof XGraph
   */
  initMxGraph(): this {
    this.graph = new Graph(this.container);

    // /!\ What is setPannig
    this.graph.setPanning(true);

    // Backup funtions of clicks
    this.clickBackup = this.graph.click;
    this.dbclickBackup = this.graph.dblClick;

    // EVENTS

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
    this.graph.dblClick = this.eventDbClick.bind(this);
    return this;
  }

  /**
   * Draw graph
   *
   * @returns {this}
   * @memberof XGraph
   */
  renderGraph(): this {
    if (this.graph === undefined) {
      this.initMxGraph();
    }
    this.graph.getModel().beginUpdate();
    this.graph.getModel().clear();
    try {
      if (this.type === 'xml') {
        const xmlDoc = mxUtils.parseXml(this.xmlGraph);
        const codec = new mxCodec(xmlDoc);
        this.graph.model.clear();
        this.graph.view.scale = 1;
        codec.decode(xmlDoc.documentElement, this.graph.getModel());
        this.loadExtFont();
        this.graph.updateCssTransform();
        this.graph.selectUnlockedLayer();
      }
      if (this.type === 'csv') {
        try {
          dioCustom.importCsv(this.graph, this.csvGraph);
          this.updateGraph();
        } catch (error) {
          GFLog.error('Bad CSV format', error);
          this.$gf.notify('Bad CSV format', 'error');
        }
      }
    } catch (error) {
      GFLog.error('Error in draw', error);
    } finally {
      this.graph.getModel().endUpdate();
      this.initXCells();
    }
    return this;
  }

  clear() {
    // this.graph.model.clear();
    // this.graph.view.scale = 1;
    this.xcells = [];
  }

  /**
   * Init XCells
   *
   * @memberof XGraph
   */
  async initXCells() {
    const model = this.graph.getModel();
    this.xcells = [];
    // const cells = model.cells;
    const cells = Object.values(model.cells);
    // const keys = Object.keys(cells);
    // _each(cells, (mxcell: mxCell) => {
    //   if (mxcell.id !== '0' && mxcell.id !== '1') {
    //     const xcell = XCell.refactore(this.graph, mxcell);
    //     this.xcells.push(xcell);
    //   }
    // });
    await Promise.all(
      cells.map(async (mxcell: mxCell) => {
        const xcell = XCell.refactore(this.graph, mxcell);
        this.xcells.push(xcell);
      })
    );
  }

  /**
   * Load external Fonts
   *
   * @memberof XGraph
   */
  async loadExtFont() {
    const model = this.graph.getModel();
    let extFonts = model.extFonts;
    if (extFonts) {
      try {
        extFonts = extFonts.split('|').map(function (ef: any) {
          var parts = ef.split('^');
          return { name: parts[0], url: parts[1] };
        });

        for (var i = 0; i < extFonts.length; i++) {
          this.graph.addExtFont(extFonts[i].name, extFonts[i].url);
        }
      } catch (e: any) {
        GFLog.error('ExtFonts format error:', e.message);
      }
    }
  }

  /**
   * Apply options on graph
   *
   * @return this
   * @memberof XGraph
   */
  applyOptions(): this {
    if (!this.scale) {
      this.zoomGraph(this.zoomPercent);
    } else {
      this.unzoomGraph();
    }
    this.tooltipGraph(this.tooltip);
    this.lockGraph(this.lock);
    if (this.scale && this.center) {
      this.fitGraph();
    } else {
      this.scaleGraph(this.scale);
      this.centerGraph(this.center);
    }
    this.gridGraph(this.grid);
    // this.bgGraph(this.bgColor);
    this.graph.foldingEnabled = true;
    this.graph.cellRenderer.forceControlClickHandler = true;
    return this;
  }

  /**
   * Refresh graph
   *
   * @returns {this}
   * @memberof XGraph
   */
  updateGraph(): this {
    this.cumulativeZoomFactor = 1;
    if (this.graph) {
      this.graph.zoomActual();
      this.applyOptions();
      this.graph.refresh();
    }
    return this;
  }

  /**
   * Destroy Graph object and DOM
   *
   * @returns {this}
   * @memberof XGraph
   */
  freeGraph(): this {
    this.graph.destroy();
    this.graph = undefined;
    return this;
  }

  /**
   * lock cells
   *
   * @returns {this}
   * @param {Boolean} bool
   * @memberof XGraph
   */
  lockGraph(bool: boolean): this {
    if (bool) {
      this.graph.setEnabled(false);
    } else {
      this.graph.setEnabled(true);
    }
    this.lock = bool;
    return this;
  }

  /**
   * Enable tooltip
   *
   * @returns {this}
   * @param {Boolean} bool
   * @memberof XGraph
   */
  tooltipGraph(bool: boolean): this {
    if (bool) {
      this.graph.setTooltips(true);
    } else {
      this.graph.setTooltips(false);
    }
    this.tooltip = bool;
    return this;
  }

  /**
   * Allow downloads images from site draw.io
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof XGraph
   */
  allowDrawio(bool: boolean): this {
    if (bool) {
      mxUrlConverter.prototype.baseUrl = GFCONSTANT.CONF_EDITOR_URL;
      mxUrlConverter.prototype.baseDomain = '';
    } else {
      mxUrlConverter.prototype.baseUrl = null;
      mxUrlConverter.prototype.baseDomain = null;
    }
    return this;
  }

  /**
   * Enable Animation when change mxcell (colors, size ...)
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof XGraph
   */
  enableAnim(bool: boolean): this {
    this.animation = bool;
    return this;
  }

  /**
   * Center graph in panel
   *
   * @returns {this}
   * @param {Boolean} bool
   * @memberof XGraph
   */
  centerGraph(bool: boolean): this {
    this.graph.centerZoom = false;
    if (bool) {
      this.graph.center(true, true);
    } else {
      this.graph.center(false, false);
    }
    this.center = bool;
    return this;
  }

  /**
   * Scale graph in panel
   *
   * @returns {this}
   * @param {boolean} bool
   * @memberof XGraph
   */
  scaleGraph(bool: boolean): this {
    if (bool) {
      this.unzoomGraph();
      this.graph.fit();
      this.graph.view.rendering = true;
    }
    this.scale = bool;
    return this;
  }

  /**
   * Scale graph into container
   *
   * @returns {this}
   * @memberof XGraph
   */
  fitGraph(): this {
    const margin = 2;
    const max = 3;

    const bounds = this.graph.getGraphBounds();
    const cw = this.graph.container.clientWidth - margin;
    const ch = this.graph.container.clientHeight - margin;
    const w = bounds.width / this.graph.view.scale;
    const h = bounds.height / this.graph.view.scale;
    const s = Math.min(max, Math.min(cw / w, ch / h));

    this.graph.view.scaleAndTranslate(
      s,
      (margin + cw - w * s) / (2 * s) - bounds.x / this.graph.view.scale,
      (margin + ch - h * s) / (2 * s) - bounds.y / this.graph.view.scale
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
  gridGraph(bool: boolean): this {
    if (bool) {
      this.container.style.backgroundImage =
        "url('data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=')";
    } else {
      this.container.style.backgroundImage = '';
    }
    this.grid = bool;
    return this;
  }

  /**
   * Zoom/unzoom
   *
   * @param {string} percent
   * @returns {this}
   * @memberof XGraph
   */
  zoomGraph(percent: string): this {
    if (!this.scale && percent && percent.length > 0 && percent !== '100%' && percent !== '0%') {
      const ratio: number = Number(percent.replace('%', '')) / 100;
      this.graph.zoomTo(ratio, true);
      this.zoomPercent = percent;
    } else {
      this.unzoomGraph();
    }
    this.zoom = true;
    return this;
  }

  /**
   * Restore initial size
   *
   * @returns {this}
   * @memberof XGraph
   */
  unzoomGraph(): this {
    this.zoom = false;
    this.graph.zoomActual();
    return this;
  }

  /**
   * Return mxgraph object
   *
   * @returns
   * @memberof XGraph
   */
  getMxGraph() {
    return this.graph;
  }

  /**
   * Return xml definition
   *
   * @returns {string}
   * @memberof XGraph
   */
  getxmlGraph(): string {
    return this.xmlGraph;
  }

  /**
   * Assign source definition and redraw graph
   *
   * @param {string} xmlGraph
   * @returns {this}
   * @memberof XGraph
   */
  setContent(content: string): this {
    if (this.type === 'xml') {
      if (GFDrawio.isEncoded(content)) {
        this.xmlGraph = GFDrawio.decode(content);
      } else {
        this.xmlGraph = content;
      }
    }
    if (this.type === 'csv') {
      this.csvGraph = content;
    }
    // this.drawGraph();
    return this;
  }

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
    xcells.forEach((x) => {
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
    this.highlightXCells(pattern, options, false);
  }

  /**
   * Create tooltip on image
   *
   * @param {*} image
   * @param {*} tooltip
   * @returns {mxCellOverlay}
   * @memberof XGraph
   */
  // createOverlay(image, tooltip): any {
  //   const overlay = new mxCellOverlay(image, tooltip);
  //   overlay.addListener(mxEvent.CLICK, (_sender, _evt) => {
  //     mxUtils.alert(`${tooltip}\nLast update: ${new Date()}`);
  //   });
  //   return overlay;
  // }

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
    const node = encoder.encode(this.graph.getModel());
    return mxUtils.getXml(node);
  }

  isAnimated() {
    return this.animation;
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
        this.graph.setCellStyles(style, endValue, [xcell]);
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

  /**
   * Active mapping option when user click on mapping
   *
   * @param {Object} onMappingObj
   * @memberof XGraph
   */
  setMap() {
    this.graph.click = this.eventClick.bind(this);
    this.onMapping.setContainer(this.container);
    this.onMapping.activate();
  }

  /**
   * Disable mapping when user click on mapping
   *
   * @memberof XGraph
   */
  unsetMap() {
    this.graph.click = this.clickBackup;
    this.$gf.$refresh();
  }

  //
  // GRAPH HANDLER
  //

  /**
   * Event for click on graph
   *
   * @param {MouseEvent} me
   * @memberof XGraph
   */
  eventClick(me: mxMouseEvent) {
    if (this.onMapping.active) {
      const state = me.getState();
      if (state) {
        const xcell = this.getXCell(state.cell.id);
        const options = this.onMapping.options !== null ? this.onMapping.options : Rule.getDefaultMapOptions();
        if (xcell !== undefined) {
          this.onMapping.setXCell(xcell).setValue(xcell.getDefaultValues(options)).valide();
          this.unsetMap();
        }
      }
    }
  }

  eventDebug(me: mxMouseEvent) {
    console.log('DEBUG mxMouseEvent', me);
    // const state = me.getState();
    // if (state) {
    //   console.log("DEBUG state",state);
    // }
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
    if (this.graph.isZoomWheelEvent(evt) && this.$gf.ctrl.isMouseInPanel()) {
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
        this.cumulativeZoomFactor = this.cumulativeZoomFactor * 1.2;
      } else {
        this.cumulativeZoomFactor = this.cumulativeZoomFactor * 0.8;
      }
      this.lazyZoomPointer(this.cumulativeZoomFactor, x, y);
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
      this.updateGraph();
    }
  }

  /**
   * Zoom/Unzoom on graph on center
   *
   * @param {number} factor - 1 = 100%
   * @memberof XGraph
   */
  async lazyZoomCenter(factor: number) {
    this.graph.zoomTo(factor, true);
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

    factor = Math.max(0.01, Math.min(this.graph.view.scale * factor, 160)) / this.graph.view.scale;
    factor = this.cumulativeZoomFactor / this.graph.view.scale;
    const scale = Math.round(this.graph.view.scale * factor * 100) / 100;
    factor = scale / this.graph.view.scale;

    if (factor > 1) {
      const f = (factor - 1) / (scale * 2);
      dx *= -f;
      dy *= -f;
    } else {
      const f = (1 / factor - 1) / (this.graph.view.scale * 2);
      dx *= f;
      dy *= f;
    }
    this.graph.view.scaleAndTranslate(scale, this.graph.view.translate.x + dx, this.graph.view.translate.y + dy);
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
        this.graph.zoomToRect(rect);
        this.cumulativeZoomFactor = this.graph.view.scale;
      }
    }
  }

  static loadXml(url: string): string | null {
    try {
      const req: any = mxUtils.load(url);
      if (req.getStatus() >= 200 && req.getStatus() <= 299) {
        return req.getText();
      } else {
        GFLog.error('Cannot load ' + url, req.getStatus());
      }
    } catch (error) {
      GFLog.error('Cannot load ' + url, error);
    }
    return null;
  }

  static compress(source: string): string {
    return Graph.compress(source, true);
  }

  static decompress(source: string): string {
    return Graph.decompress(source, true);
  }

  static preview(container: HTMLElement, xcell: XCell, force = false) {
    const g = new Graph(container);
    if (g) {
      // const mxcell = xcell.getMxCell();
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
    console.log('🧰', this.constructor.name, this);
  }

}

