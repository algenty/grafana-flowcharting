import _ from 'lodash';
import { $GF, GFTimer } from 'globals_class';
import * as Drawio from 'drawio_custom';
import chroma from 'chroma-js';
import * as mxcustom from 'mxgraph_custom';
import { Rule } from 'rule_class';
import { XCell } from 'cell_class';
import { FlowchartCtrl } from 'flowchart_ctrl';
import { InteractiveMap } from 'mapping_class';

declare interface TXGraphDefaultValues {
  id: Set<string> | undefined;
  value: Set<string> | undefined;
  metadata: Set<string> | undefined;
}

/**
 * mxGraph interface class
 *
 * @export
 * @class XGraph
 */
export default class XGraph {
  static initialized = false;
  container: HTMLDivElement;
  xmlGraph = '';
  csvGraph = '';
  type: gf.TSourceTypeKeys = 'xml';
  ctrl: FlowchartCtrl;
  graph: any = undefined;
  scale = true;
  tooltip = true;
  lock = true;
  center = true;
  animation = true;
  zoom = false;
  zoomFactor = 1.2;
  cumulativeZoomFactor = 1;
  grid = false;
  id = $GF.utils.uniqueID();
  bgColor: string | null = null;
  zoomPercent = '1';
  // cells: { id: string[]; value: string[] } = {
  //   id: [],
  //   value: [],
  // };
  defaultXCellValues: TXGraphDefaultValues = {
    id: undefined,
    value: undefined,
    metadata: undefined,
  };
  xcells: XCell[];
  clickBackup: any;
  dbclickBackup: any;
  onMapping: InteractiveMap;
  /**
   * Creates an instance of XGraph.
   * @param {DOM} container
   * @param {string} definition
   * @memberof XGraph
   */
  constructor(container: HTMLDivElement, type: gf.TSourceTypeKeys, definition: string, ctrl: FlowchartCtrl) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'constructor()');
    this.container = container;
    this.type = type;
    this.ctrl = ctrl;
    this.xcells = [];
    // this.onMapping = FlowchartHandler.getDefaultMapping();
    this.onMapping = this.ctrl.onMapping;
    XGraph.initMxGraphLib();
    if (type === 'xml') {
      if ($GF.utils.isencoded(definition)) {
        this.xmlGraph = $GF.utils.decode(definition, true, true, true);
      } else {
        this.xmlGraph = definition;
      }
    }
    if (type === 'csv') {
      this.csvGraph = definition;
    }
    this.initGraph();

    // DEBUG MODE
    const self = this;
    if ($GF.DEBUG) {
      console.log('DEBUG ON');
      this.graph.addListener(mxEvent.CLICK, (_sender, _evt) => {
        console.log('DEBUG CLICK');
        this.eventDebug(_evt);
        if (_evt.properties.cell) {
          const mxcell = _evt.properties.cell;
          const id = mxcell.id;
          const state = $GF.getVar(`STATE_${id}`);
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
    trc.after();
  }

  /**
   * Valided XML definition
   *
   * @static
   * @param {string} source
   * @returns
   * @memberof XGraph
   */
  static isValidXml(source: string) {
    try {
      const div = document.createElement('div');
      const g = new Graph(div);
      if ($GF.utils.isencoded(source)) {
        source = $GF.utils.decode(source, true, true, true);
      }
      const xmlDoc = mxUtils.parseXml(source);
      const codec = new mxCodec(xmlDoc);
      g.getModel().beginUpdate();
      codec.decode(xmlDoc.documentElement, g.getModel());
      g.getModel().endUpdate();
      g.destroy();
      return true;
    } catch (error) {
      $GF.log.error('isValidXml', error);
      return false;
    }
  }

  /**
   * Anonymize Graph
   *
   * @memberof XGraph
   */
  async anonymize() {
    Drawio.anonymize(this.graph);
  }

  /**
   * Init Global vars an libs for mxgraph
   *
   * @static
   * @returns
   * @memberof XGraph
   */
  static async initMxGraphLib() {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initMxGgraph()');
    let myWindow: any = window;
    if (!XGraph.initialized) {
      if (myWindow.mxGraph === undefined || myWindow.mxGraph === undefined) {
        XGraph.preInitGlobalVars();
        // Before 0.9
        // let code = $GF.utils.$loadFile(`${$GF.plugin.getDrawioPath()}js/viewer.min.js`);
        // $GF.utils.evalRaw(code);

        // $GF.utils.$evalFile(`${$GF.plugin.getDrawioPath()}js/viewer-static.min.js`);
        // $GF.utils.$evalFile(`${$GF.plugin.getDrawioPath()}js/shapes.min.js`);

        // Eval Fileor Eval Code
        $GF.utils.$evalFile(`${$GF.plugin.getRootPath()}${$GF.CONSTANTS.CONF_FILE_VIEWERJS}`);
        // mxcustom.evalCode();
        mxcustom.customize();
        XGraph.postInitGlobalVars();
        // $GF.utils.$evalFile(`${$GF.plugin.getLibsPath()}/Graph_custom.js`);
        // $GF.utils.evalRaw(code);
        mxTooltipHandler.prototype.delay = $GF.CONSTANTS.CONF_TOOLTIPS_DELAY;
      }
      XGraph.initialized = true;
    }
    trc.after();
  }

  /**
   * Init Vars for mxGraph
   *
   * @static
   * @memberof XGraph
   */
  static preInitGlobalVars() {
    const myWindow: any = window;
    myWindow.BASE_PATH = $GF.plugin.getMxBasePath();
    myWindow.RESOURCES_PATH = $GF.plugin.getMxResourcePath();
    myWindow.RESOURCE_BASE = $GF.plugin.getMxResourcePath();
    myWindow.STENCIL_PATH = $GF.plugin.getStencilsPath();
    myWindow.SHAPES_PATH = $GF.plugin.getShapesPath();
    myWindow.IMAGE_PATH = $GF.plugin.getMxImagePath();
    myWindow.STYLE_PATH = $GF.plugin.getMxStylePath();
    myWindow.CSS_PATH = $GF.plugin.getMxCssPath();
    myWindow.mxLanguages = ['en'];
    myWindow.DRAWIO_BASE_URL = $GF.plugin.getDrawioPath(); // Replace with path to base of deployment, e.g. https://www.example.com/folder
    myWindow.DRAW_MATH_URL = $GF.plugin.getDrawioPath(); // Replace with path to base of deployment, e.g. https://www.example.com/folder
    myWindow.DRAWIO_VIEWER_URL = $GF.plugin.getDrawioPath() + 'viewer.min.js'; // Replace your path to the viewer js, e.g. https://www.example.com/js/viewer.min.js
    myWindow.DRAW_MATH_URL = $GF.plugin.getDrawioPath() + 'math/';
    myWindow.DRAWIO_CONFIG = null; // Replace with your custom draw.io configurations. For more details, https://desk.draw.io/support/solutions/articles/16000058316
    const urlParams = new Object();
    myWindow.urlParams = urlParams;
    urlParams['sync'] = 'none'; // Disabled realtime
    urlParams['lightbox'] = '1'; // Uses lightbox in chromeless mode (larger zoom, no page visible, chromeless)
    urlParams['nav'] = '1'; // Enables folding in chromeless mode
    urlParams['local'] = '1'; // Uses device mode only
    urlParams['embed'] = '1'; // Runs in embed mode
    urlParams['ui'] = 'min';
    myWindow.mxImageBasePath = $GF.plugin.getMxImagePath();
    myWindow.mxBasePath = $GF.plugin.getMxBasePath();
    myWindow.mxLoadStylesheets = true;
    myWindow.mxLanguage = 'en';
    myWindow.mxLoadResources = true;
  }

  static postInitGlobalVars() {
    const myWindow: any = window;
    myWindow.mxClient.mxBasePath = $GF.plugin.getMxBasePath();
    myWindow.mxClient.mxImageBasePath = $GF.plugin.getMxImagePath();
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
  initGraph(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initGraph()');
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
    this.container.addEventListener('contextmenu', e => e.preventDefault());

    // DB CLICK
    this.graph.dblClick = this.eventDbClick.bind(this);
    trc.after();
    return this;
  }

  /**
   * Draw graph
   *
   * @returns {this}
   * @memberof XGraph
   */
  drawGraph(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'drawGraph()');
    console.trace();
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
          Drawio.importCsv(this.graph, this.csvGraph);
          this.refresh();
        } catch (error) {
          $GF.log.error('Bad CSV format', error);
          this.ctrl.notify('Bad CSV format', 'error');
        }
      }
    } catch (error) {
      $GF.log.error('Error in draw', error);
    } finally {
      this.graph.getModel().endUpdate();
      this.initXCells();
    }
    trc.after();
    return this;
  }

  /**
   * Init XCells
   *
   * @memberof XGraph
   */
  async initXCells() {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initXCells()');
    const model = this.graph.getModel();
    const cells = model.cells;
    this.xcells = [];
    this.defaultXCellValues.id = undefined;
    this.defaultXCellValues.value = undefined;
    this.defaultXCellValues.metadata = undefined;
    _.each(cells, (mxcell: mxCell) => {
      const xcell = XCell.refactore(this.graph, mxcell);
      this.xcells.push(xcell);
    });
    trc.after();
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
        extFonts = extFonts.split('|').map(function(ef) {
          var parts = ef.split('^');
          return { name: parts[0], url: parts[1] };
        });

        for (var i = 0; i < extFonts.length; i++) {
          // Drawio.addExtFont(extFonts[i].name, extFonts[i].url);
          this.graph.addExtFont(extFonts[i].name, extFonts[i].url);
        }
      } catch (e) {
        if (e instanceof Error) {
          $GF.log.error('ExtFonts format error:', e.message);
        }
      }
    }
  }

  /**
   * Apply options on graph
   *
   * @return this
   * @memberof XGraph
   */
  applyGraph(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'applyGraph()');
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
    this.bgGraph(this.bgColor);
    this.graph.foldingEnabled = true;
    this.graph.cellRenderer.forceControlClickHandler = true;
    this.refresh();
    trc.after();
    return this;
  }

  /**
   * Refresh graph
   *
   * @returns {this}
   * @memberof XGraph
   */
  refresh(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'refresh()');
    this.graph.refresh();
    trc.after();
    return this;
  }

  /**
   * Destroy Graph object and DOM
   *
   * @returns {this}
   * @memberof XGraph
   */
  destroyGraph(): this {
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
      mxUrlConverter.prototype.baseUrl = 'http://draw.io/';
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'centerGraph()');
    this.graph.centerZoom = false;
    if (bool) {
      this.graph.center(true, true);
    } else {
      this.graph.center(false, false);
    }
    this.center = bool;
    trc.after();
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'scaleGraph()');
    if (bool) {
      this.unzoomGraph();
      this.graph.fit();
      this.graph.view.rendering = true;
    }
    this.scale = bool;
    trc.after();
    return this;
  }

  /**
   * Scale graph into container
   *
   * @returns {this}
   * @memberof XGraph
   */
  fitGraph(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'fitGraph()');
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
    trc.after();
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'zoomGraph()');
    if (!this.scale && percent && percent.length > 0 && percent !== '100%' && percent !== '0%') {
      const ratio: number = Number(percent.replace('%', '')) / 100;
      this.graph.zoomTo(ratio, true);
      this.zoomPercent = percent;
    } else {
      this.unzoomGraph();
    }
    this.zoom = true;
    trc.after();
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
   * Define background color
   *
   * @param {this} bgColor
   * @memberof XGraph
   */
  bgGraph(bgColor): this {
    const $div = $(this.container);
    if (bgColor) {
      this.bgColor = bgColor;
      $div.css('background-color', bgColor);
    } else {
      $div.css('background-color', '');
    }
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setContent()');
    if (this.type === 'xml') {
      if ($GF.utils.isencoded(content)) {
        this.xmlGraph = $GF.utils.decode(content, true, true, true);
      } else {
        this.xmlGraph = content;
      }
    }
    if (this.type === 'csv') {
      this.csvGraph = content;
    }
    this.drawGraph();
    trc.after();
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'getXCellValues()');
    let values = this.defaultXCellValues[type];
    if (values === undefined) {
      this.initXCellValues(type);
    }
    values = this.defaultXCellValues[type];
    if (values !== undefined) {
      return Array.from(values.keys());
    }
    trc.after();
    return [];
  }

  /**
   * Init initials values
   *
   * @param {gf.TPropertieKey} type
   * @memberof XGraph
   */
  async initXCellValues(type: gf.TPropertieKey) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initXCellValues()');
    const xcells = this.getXCells();
    let s: Set<string> = new Set();
    xcells.forEach(x => {
      if (type === 'id' || type === 'value') {
        const value: any = x.getDefaultValue(type);
        if (value !== null && value !== undefined && value.length > 0) {
          s.add(value);
        }
      }
      if (type === 'metadata') {
        const values = x.getDefaultMetadatasKeys();
        const length = values.length;
        for (let i = 0; i < length; i++) {
          const value = values[i];
          if (value !== null && value !== undefined && value.length > 0) {
            s.add(value);
          }
        }
      }
    });
    this.defaultXCellValues[type] = s;
    trc.after();
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'findXCells()');
    const xcells = this.getXCells();
    const result: any[] = [];
    const length = xcells.length;
    for (let index = 0; index < length; index++) {
      const x = xcells[index];
      if (x.match(pattern, options)) {
        result.push(x);
      }
    }
    trc.after();
    return result;
  }

  /**
   * Hightlight XCells
   *
   * @param {string} prop - "id"|"value"|"metadata"
   * @param {string} pattern - regex like
   * @memberof XGraph
   */
  async highlightXCells(pattern: string, options?: gf.TRuleMapOptions, bool: boolean = true) {
    const xcells = this.findXCells(pattern, options);
    xcells.forEach(x => {
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'getDefaultValuesWithKey()');
    const xcells = this.getXCells();
    const length = xcells.length;
    let values: Set<string> = new Set();
    for (let i = 0; i < length; i++) {
      const xcell = xcells[i];
      const datas = xcell.getDefaultValues(options);
      datas.forEach(x => {
        if (x !== null && x !== undefined && x.length > 0) {
          values.add(x);
        }
      });
    }
    trc.after();
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setAnimColorCell()');
    if (this.isAnimated() && color) {
      try {
        const timeId = `${style}-${this.id}-${xcell.getId()}`;
        const startColor = xcell.getStyle(style);
        if (startColor) {
          const endColor = color;
          const steps = chroma
            .scale([startColor, endColor])
            .mode('lrgb')
            .colors($GF.CONSTANTS.CONF_COLORS_STEPS + 1);
          const timer = GFTimer.getNewTimer(timeId);
          const ms = $GF.CONSTANTS.CONF_COLORS_MS;
          for (let i = 1; i < steps.length; i++) {
            timer.add(xcell.setStyle.bind(xcell, style, steps[i]), ms * i);
          }
          timer.run();
        } else {
          // let hex = Color(color).hex();
          let hex = chroma(color).hex();
          xcell.setStyle(style, hex);
        }
      } catch (error) {
        $GF.log.error('Error on graduate color', error);
        xcell.setStyle(style, color);
      }
    } else {
      if (color !== null) {
        try {
          color = chroma(color).hex();
        } catch (error) {
          $GF.log.error('Invalid Color', color);
        }
      }
      xcell.setStyle(style, color);
    }
    trc.after();
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setAnimStyleCell()');
    if (this.isAnimated() && endValue !== null) {
      try {
        const end = Number(endValue);
        const begin = beginValue !== undefined ? Number(beginValue) : Number(xcell.getStyle(style));
        if (end !== begin) {
          const timeId = `${style}-${this.id}-${xcell.getId()}`;
          // Cancel Previous anim
          $GF.clearUniqTimeOut(timeId);
          const steps = $GF.calculateIntervalCounter(begin, end, $GF.CONSTANTS.CONF_ANIMS_STEP);
          const length = steps.length;
          const timer = GFTimer.getNewTimer(timeId);
          const ms = $GF.CONSTANTS.CONF_ANIMS_MS;
          for (let i = 1; i < length; i++) {
            timer.add(xcell.setStyle.bind(xcell, style, steps[i].toString()), ms * i);
          }
          timer.run();
        }
      } catch (error) {
        this.graph.setCellStyles(style, endValue, [xcell]);
      }
    } else {
      // this.graph.setCellStyles(style, endValue, [xcell]);
      xcell.setStyle(style, endValue);
    }
    trc.after();
  }

  static isMxGraphStyle(type: string): boolean {
    const t: any = type;
    return $GF.CONSTANTS.MXGRAPH_STYLES.includes(t);
  }

  static isMxGraphAnimStyle(type: string): boolean {
    const t: any = type;
    return $GF.CONSTANTS.MXGRAPH_STYLES_ANIM.includes(t);
  }

  static isMxGraphStaticStyle(type: string): boolean {
    const t: any = type;
    return $GF.CONSTANTS.MXGRAPH_STYLES_STATIC.includes(t);
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
    this.ctrl.$scope.$applyAsync();
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
          this.onMapping
            .setXCell(xcell)
            .setValue(xcell.getDefaultValues(options))
            .valide();
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
    if (this.graph.isZoomWheelEvent(evt) && this.ctrl.isMouseInPanel()) {
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
      this.cumulativeZoomFactor = 1;
      if (this.graph) {
        this.graph.zoomActual();
        this.applyGraph();
      }
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'lazyZoomPointer()');
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
    trc.after();
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setAnimZoomCell()');
    if (this.isAnimated()) {
      const timeId = `setAnimZoomCell-${this.id}${xcell.getId}`;
      const percents = $GF.calculateIntervalCounter(xcell.percent, percent, $GF.CONSTANTS.CONF_ANIMS_STEP);
      const timer = GFTimer.getNewTimer(timeId);
      const length = percents.length;
      const ms = $GF.CONSTANTS.CONF_ANIMS_MS;
      for (let i = 1; i < length; i++) {
        timer.add(xcell.zoom.bind(xcell, percents[i]), ms * i);
      }
      timer.run();
    } else {
      xcell.zoom(percent);
    }
    trc.after();
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setAnimSizeCell()');
    const dim = xcell.getDimension();
    const wdir = width !== undefined && width >= 0 ? 1 : -1;
    const hdir = height !== undefined && height >= 0 ? 1 : -1;
    width = width !== undefined ? width : undefined;
    height = height !== undefined ? height : undefined;
    // $GF.clearUniqTimeOut(timeId);
    if (this.isAnimated()) {
      const timeId = `setAnimSizeCell-${this.id}-${xcell.getId()}`;
      const widths = $GF.calculateIntervalCounter(dim.width * wdir, width, $GF.CONSTANTS.CONF_ANIMS_STEP);
      const heights = $GF.calculateIntervalCounter(dim.height * hdir, height, $GF.CONSTANTS.CONF_ANIMS_STEP);
      const length = widths.length;
      const timer = GFTimer.getNewTimer(timeId);
      const ms = $GF.CONSTANTS.CONF_ANIMS_MS;
      for (let i = 1; i < length; i++) {
        timer.add(xcell.resize.bind(xcell, widths[i], heights[i]), ms * i);
      }
      timer.run();
    } else {
      xcell.resize(width, height);
    }
    trc.after();
  }

  /**
   * Zoom cell on full panel
   *
   * @param {mxCell} mxcell
   * @memberof XGraph
   */
  async lazyZoomCell(xcell: XCell) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'lazyZoomCell()');
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
    trc.after();
  }

  static loadXml(url: string): string | null {
    try {
      const req: any = mxUtils.load(url);
      if (req.getStatus() >= 200 && req.getStatus() <= 299) {
        return req.getText();
      } else {
        $GF.log.error('Cannot load ' + url, req.getStatus());
      }
    } catch (error) {
      $GF.log.error('Cannot load ' + url, error);
    }
    return null;
  }

  static compress(source: string): string {
    return Graph.compress(source, true);
  }

  static decompress(source: string): string {
    return Graph.decompress(source, true);
  }

  static preview(container: HTMLElement, xcell: XCell, force: boolean = false) {
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
        $GF.log.error('Error in preview', error);
      }
    }
  }
}
