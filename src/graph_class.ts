import _ from 'lodash';
declare var Graph: any;

declare var mxEvent: any;
declare var mxClient: any;
declare var mxCodec: any;
declare var mxUrlConverter: any;
declare var mxCellOverlay: any;
declare var mxConstants: any;
declare var mxCellHighlight: any;
declare var mxRectangle: any;
declare var mxUtils: any;
// declare var mxStencilRegistry: any;

// type mxCellOverlay = any;

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
  type: gf.TSourceType = 'xml';
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
  bgColor: string | null = null;
  zoomPercent = '1';
  cells: { id: string[]; value: string[] } = {
    id: [],
    value: [],
  };
  clickBackup: any;
  dbclickBackup: any;
  onMapping: gf.TIOnMappingObj;
  /**
   * Creates an instance of XGraph.
   * @param {DOM} container
   * @param {string} definition
   * @memberof XGraph
   */
  constructor(container: HTMLDivElement, type: gf.TSourceType, definition: string) {
    GFP.log.info('XGraph.constructor()');
    this.container = container;
    this.type = type;
    this.onMapping = {
      active: false,
      $scope: null,
      id: null,
      prop: null,
      object: null,
    };
    // END ZOOM MouseWheele
    XGraph.initMxGgraph();
    if (type === 'xml') {
      if (GFP.utils.isencoded(definition)) {
        this.xmlGraph = GFP.utils.decode(definition, true, true, true);
      } else {
        this.xmlGraph = definition;
      }
    }
    this.initGraph();
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
      if (GFP.utils.isencoded(source)) {
        source = GFP.utils.decode(source, true, true, true);
      }
      const xmlDoc = mxUtils.parseXml(source);
      const codec = new mxCodec(xmlDoc);
      g.getModel().beginUpdate();
      codec.decode(xmlDoc.documentElement, g.getModel());
      g.getModel().endUpdate();
      g.destroy();
      return true;
    } catch (error) {
      GFP.log.error('isValidXml', error);
      return false;
    }
  }

  /**
   * Init Global vars an libs for mxgraph
   *
   * @static
   * @returns
   * @memberof XGraph
   */
  static initMxGgraph() {
    // START PERFinitMxGgraph
    const myWindow: any = window;
    GFP.perf.start(`======> initMxGgraph`);
    if (XGraph.initialized) {
      GFP.perf.stop(`======> initMxGgraph`);
      return;
    }

    myWindow.mxLanguages = myWindow.mxLanguages || ['en'];

    const mxgraph = require('mxgraph')({
      mxImageBasePath: GFP.getMxImagePath(),
      mxBasePath: GFP.getMxBasePath(),
      mxLoadStylesheets: false,
      mxLanguage: 'en',
      mxLoadResources: false,
    });

    myWindow.BASE_PATH = myWindow.BASE_PATH || GFP.getMxBasePath();
    myWindow.RESOURCES_PATH = myWindow.BASE_PATH || GFP.getMxResourcePath(); //`${myWindow.BASE_PATH}resources`;
    myWindow.RESOURCE_BASE = myWindow.RESOURCE_BASE || GFP.getMxResourcePath(); //`${myWindow.RESOURCES_PATH}/grapheditor`;
    myWindow.STENCIL_PATH = myWindow.STENCIL_PATH || GFP.getStencilsPath();
    myWindow.SHAPES_PATH = myWindow.SHAPES_PATH || GFP.getShapesPath();
    myWindow.IMAGE_PATH = myWindow.IMAGE_PATH || GFP.getMxImagePath(); //`${myWindow.BASE_PATH}images`;
    myWindow.STYLE_PATH = myWindow.STYLE_PATH || GFP.getMxStylePath(); //`${myWindow.BASE_PATH}styles`;
    myWindow.CSS_PATH = myWindow.CSS_PATH || GFP.getMxCssPath(); //`${myWindow.BASE_PATH}styles`;
    myWindow.mxLanguages = myWindow.mxLanguages || ['en'];

    // Put to global vars to work
    myWindow.mxActor = myWindow.mxActor || mxgraph.mxActor;
    myWindow.mxArrow = myWindow.mxArrow || mxgraph.mxArrow;
    myWindow.mxArrowConnector = myWindow.mxArrowConnector || mxgraph.mxArrowConnector;
    myWindow.mxCell = myWindow.mxCell || mxgraph.mxCell;
    myWindow.mxCellEditor = myWindow.mxCellEditor || mxgraph.mxCellEditor;
    myWindow.mxCellHighlight = myWindow.mxCellHighlight || mxgraph.mxCellHighlight;
    myWindow.mxCellOverlay = myWindow.mxCellOverlay || mxgraph.mxCellOverlay;
    myWindow.mxCellRenderer = myWindow.mxCellRenderer || mxgraph.mxCellRenderer;
    myWindow.mxCellState = myWindow.mxCellState || mxgraph.mxCellState;
    myWindow.mxClient = myWindow.mxClient || mxgraph.mxClient;
    myWindow.mxClient.mxBasePath = GFP.getMxBasePath();
    myWindow.mxClient.mxImageBasePath = GFP.getMxImagePath();
    myWindow.mxClient.mxLoadResources = true;
    myWindow.mxClient.mxLanguage = 'en';
    myWindow.mxClient.mxLoadStylesheets = true;
    myWindow.mxCloud = myWindow.mxCloud || mxgraph.mxCloud;
    myWindow.mxCodec = myWindow.mxCodec || mxgraph.mxCodec;
    myWindow.mxCompactTreeLayout = myWindow.mxCompactTreeLayout || mxgraph.mxCompactTreeLayout;
    myWindow.mxConnectionConstraint = myWindow.mxConnectionConstraint || mxgraph.mxConnectionConstraint;
    myWindow.mxConnectionHandler = myWindow.mxConnectionHandler || mxgraph.mxConnectionHandler;
    myWindow.mxConnector = myWindow.mxConnector || mxgraph.mxConnector;
    myWindow.mxConstants = myWindow.mxConstants || mxgraph.mxConstants;
    myWindow.mxConstraintHandler = myWindow.mxConstraintHandler || mxgraph.mxConstraintHandler;
    myWindow.mxCylinder = myWindow.mxCylinder || mxgraph.mxCylinder;
    myWindow.mxDefaultKeyHandler = myWindow.mxDefaultKeyHandler || mxgraph.mxDefaultKeyHandler;
    myWindow.mxDefaultPopupMenu = myWindow.mxDefaultPopupMenu || mxgraph.mxDefaultPopupMenu;
    myWindow.mxDefaultToolbar = myWindow.mxDefaultToolbar || mxgraph.mxDefaultToolbar;
    myWindow.mxDivResizer = myWindow.mxDivResizer || mxgraph.mxDivResizer;
    myWindow.mxDoubleEllipse = myWindow.mxDoubleEllipse || mxgraph.mxDoubleEllipse;
    myWindow.mxDragSource = myWindow.mxDragSource || mxgraph.mxDragSource;
    myWindow.mxEdgeStyle = myWindow.mxEdgeStyle || mxgraph.mxEdgeStyle;
    myWindow.mxEdgeHandler = myWindow.mxEdgeHandler || mxgraph.mxEdgeHandler;
    myWindow.mxEditor = myWindow.mxEditor || mxgraph.mxEditor;
    myWindow.mxElbowEdgeHandler = myWindow.mxElbowEdgeHandler || mxgraph.mxElbowEdgeHandler;
    myWindow.mxEllipse = myWindow.mxEllipse || mxgraph.mxEllipse;
    myWindow.mxEvent = myWindow.mxEvent || mxgraph.mxEvent;
    myWindow.mxEventObject = myWindow.mxEventObject || mxgraph.mxEventObject;
    myWindow.mxFile = myWindow.mxFile || mxgraph.mxFile;
    myWindow.mxGeometry = myWindow.mxGeometry || mxgraph.mxGeometry;
    myWindow.mxGraph = myWindow.mxGraph || mxgraph.mxGraph;
    myWindow.mxGraphHandler = myWindow.mxGraphHandler || mxgraph.mxGraphHandler;
    myWindow.mxGraphModel = myWindow.mxGraphModel || mxgraph.mxGraphModel;
    myWindow.mxGraphView = myWindow.mxGraphView || mxgraph.mxGraphView;
    myWindow.mxGuide = myWindow.mxGuide || mxgraph.mxGuide;
    myWindow.mxHexagon = myWindow.mxHexagon || mxgraph.mxHexagon;
    myWindow.mxHandle = myWindow.mxHandle || mxgraph.mxHandle;
    myWindow.mxHierarchicalLayout = myWindow.mxHierarchicalLayout || mxgraph.mxHierarchicalLayout;
    myWindow.mxImage = myWindow.mxImage || mxgraph.mxImage;
    myWindow.mxImageShape = myWindow.mxImageShape || mxgraph.mxImageShape;
    myWindow.mxKeyHandler = myWindow.mxKeyHandler || mxgraph.mxKeyHandler;
    myWindow.mxLabel = myWindow.mxLabel || mxgraph.mxLabel;
    myWindow.mxLayoutManager = myWindow.mxLayoutManager || mxgraph.mxLayoutManager;
    myWindow.mxLine = myWindow.mxLine || mxgraph.mxLine;
    myWindow.mxMarker = myWindow.mxMarker || mxgraph.mxMarker;
    myWindow.mxOutline = myWindow.mxOutline || mxgraph.mxOutline;
    myWindow.mxPanningHandler = myWindow.mxPanningHandler || mxgraph.mxPanningHandler;
    myWindow.mxPerimeter = myWindow.mxPerimeter || mxgraph.mxPerimeter;
    myWindow.mxPoint = myWindow.mxPoint || mxgraph.mxPoint;
    myWindow.mxPolyline = myWindow.mxPolyline || mxgraph.mxPolyline;
    myWindow.mxPopupMenu = myWindow.mxPopupMenu || mxgraph.mxPopupMenu;
    myWindow.mxPopupMenuHandler = myWindow.mxPopupMenuHandler || mxgraph.mxPopupMenuHandler;
    myWindow.mxPrintPreview = myWindow.mxPrintPreview || mxgraph.mxPrintPreview;
    myWindow.mxRectangle = myWindow.mxRectangle || mxgraph.mxRectangle;
    myWindow.mxRectangleShape = myWindow.mxRectangleShape || mxgraph.mxRectangleShape;
    myWindow.mxResources = myWindow.mxResources || mxgraph.mxResources;
    myWindow.mxRhombus = myWindow.mxRhombus || mxgraph.mxRhombus;
    myWindow.mxRubberband = myWindow.mxRubberband || mxgraph.mxRubberband;
    myWindow.mxShape = myWindow.mxShape || mxgraph.mxShape;
    myWindow.mxStackLayout = myWindow.mxStackLayout || mxgraph.mxStackLayout;
    myWindow.mxStencil = myWindow.mxStencil || mxgraph.mxStencil;
    myWindow.mxStencilRegistry = myWindow.mxStencilRegistry || mxgraph.mxStencilRegistry;
    myWindow.mxStylesheet = myWindow.mxStylesheet || mxgraph.mxStylesheet;
    myWindow.mxStyleRegistry = myWindow.mxStyleRegistry || mxgraph.mxStyleRegistry;
    myWindow.mxSvgCanvas2D = myWindow.mxSvgCanvas2D || mxgraph.mxSvgCanvas2D;
    myWindow.mxSwimlane = myWindow.mxSwimlane || mxgraph.mxSwimlane;
    myWindow.mxText = myWindow.mxText || mxgraph.mxText;
    myWindow.mxToolbar = myWindow.mxToolbar || mxgraph.mxToolbar;
    myWindow.mxTooltip = myWindow.mxTooltip || mxgraph.mxTooltip;
    myWindow.mxTooltipHandler = myWindow.mxTooltipHandler || mxgraph.mxTooltipHandler;
    myWindow.mxTriangle = myWindow.mxTriangle || mxgraph.mxTriangle;
    myWindow.mxUndoManager = myWindow.mxUndoManager || mxgraph.mxUndoManager;
    myWindow.mxUrlConverter = myWindow.mxUrlConverter || mxgraph.mxUrlConverter;
    myWindow.mxUtils = myWindow.mxUtils || mxgraph.mxUtils;
    myWindow.mxValueChange = myWindow.mxValueChange || mxgraph.mxValueChange;
    myWindow.mxVertexHandler = myWindow.mxVertexHandler || mxgraph.mxVertexHandler;

    // Async load not work
    // const loadfiles = [
    //   `${GFP.getLibsPath()}/sanitizer.min.js`,
    //   `${GFP.getLibsPath()}/viewer.min.js`,
    //   `${GFP.getLibsPath()}/shapes.min.js`,
    //   `${GFP.getLibsPath()}/stencils.min.js`,
    //   `${GFP.getLibsPath()}/Graph_custom.js`,
    // ];
    // await GFP.utils.loadJS_2(loadfiles);

    //Load libs for Draw.io
    require('./libs/sanitizer.min');
    // GFP.utils.loadJS(`${GFP.getLibsPath()}/sanitizer.min.js`);

    // Load Draw.io libs
    GFP.utils.loadJS(`${GFP.getLibsPath()}/viewer.min.js`);
    // require('./libs/viewer.min');

    // Shapes
    GFP.utils.loadJS(`${GFP.getLibsPath()}/shapes.min.js`);
    // require('./libs/shapes.min');

    // Stencils
    // GFP.utils.loadJS(`${GFP.getLibsPath()}/stencils.min.js`);
    require('./libs/stencils.min');

    // Specifics function for Flowcharting
    require('./libs/Graph_custom');
    // GFP.utils.loadJS(`${GFP.getLibsPath()}/Graph_custom.js`);

    XGraph.initialized = true;
    // STOP PERF
    GFP.perf.stop(`======> initMxGgraph`);
  }

  /**
   * Graph initilisation and reset
   *
   * @memberof XGraph
   */
  initGraph(): this {
    GFP.log.info('XGraph.initGraph()');
    GFP.perf.start(`${this.constructor.name}.initGraph()`);
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
    GFP.perf.stop(`${this.constructor.name}.initGraph()`);
    return this;
  }

  /**
   * Draw graph
   *
   * @returns {this}
   * @memberof XGraph
   */
  drawGraph(): this {
    GFP.log.info('XGraph.drawGraph()');
    this.graph.getModel().beginUpdate();
    this.graph.getModel().clear();
    try {
      const xmlDoc = mxUtils.parseXml(this.xmlGraph);
      const codec = new mxCodec(xmlDoc);
      codec.decode(xmlDoc.documentElement, this.graph.getModel());
    } catch (error) {
      GFP.log.error('Error in draw', error);
    } finally {
      this.graph.getModel().endUpdate();
      this.cells['id'] = this.getCurrentCells('id');
      this.cells['value'] = this.getCurrentCells('value');
    }
    return this;
  }

  /**
   * Apply options on graph
   *
   * @return this
   * @memberof XGraph
   */
  applyGraph(): this {
    GFP.log.info('XGraph.refreshGraph()');
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
    this.refresh();
    return this;
  }

  /**
   * Refresh graph
   *
   * @returns {this}
   * @memberof XGraph
   */
  refresh(): this {
    this.graph.refresh();
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
      // eslint-disable-next-line no-undef
      this.container.style.backgroundImage = `url('${GFP.getMxImagePath}/grid.gif')`;
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
    GFP.log.info('XGraph.zoomGraph()');
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
   * Assign xml definition and redraw graph
   *
   * @param {string} xmlGraph
   * @returns {this}
   * @memberof XGraph
   */
  setXmlGraph(xmlGraph: string): this {
    GFP.log.info('XGraph.setXmlGraph()');
    if (GFP.utils.isencoded(xmlGraph)) {
      this.xmlGraph = GFP.utils.decode(xmlGraph, true, true, true);
    } else {
      this.xmlGraph = xmlGraph;
    }
    this.drawGraph();
    return this;
  }

  /**
   * Get list of values or id
   *
   * @param { gf.TPropertieKey} prop
   * @returns {string[]}
   * @memberof XGraph
   */
  getCurrentCells(prop: gf.TPropertieKey): string[] {
    const cellIds: string[] = [];
    const model = this.graph.getModel();
    const cells = model.cells;
    // GFP.log.debug('cells', cells);
    // GFP.log.debug('mxStencilRegistry', mxStencilRegistry);
    if (prop === 'id') {
      _.each(cells, (mxcell: mxCell) => {
        GFP.log.debug("this.getStyleCell(mxcell, 'shape') [" + mxcell.id + '] : ', this.getStyleCell(mxcell, 'shape'));
        // this.graph.setCellStyles('shape','mxgraph.aws4.spot_instance',[mxcell]);
        cellIds.push(this.getId(mxcell));
      });
    } else if (prop === 'value') {
      _.each(cells, (mxcell: mxCell) => {
        cellIds.push(this.getLabelCell(mxcell));
      });
    }
    return cellIds;
  }

  /**
   * Get list of mxCell
   *
   * @param {string} prop - id|value
   * @param {string} pattern - regex like or string
   * @returns {mxCell[]}
   * @memberof XGraph
   */
  findMxCells(prop: gf.TPropertieKey, pattern: string): mxCell[] {
    const mxcells = this.getMxCells();
    const result: any[] = [];
    if (prop === 'id') {
      _.each(mxcells, (mxcell: mxCell) => {
        if (GFP.utils.matchString(mxcell.id, pattern)) {
          result.push(mxcell);
        }
      });
    } else if (prop === 'value') {
      _.each(mxcells, (mxcell: mxCell) => {
        if (GFP.utils.matchString(this.getLabelCell(mxcell), pattern)) {
          result.push(mxcell);
        }
      });
    }
    return result;
  }

  /**
   * Select cells in graph with pattern for id or value
   *
   * @param {string} prop - "id"|"value"
   * @param {string} pattern - regex like
   * @memberof XGraph
   */
  async selectMxCells(prop: gf.TPropertieKey, pattern: string) {
    const mxcells = this.findMxCells(prop, pattern);
    if (mxcells) {
      this.highlightCells(mxcells);
    }
  }

  /**
   * Unselect cells
   *
   * @returns {this}
   * @memberof XGraph
   */
  async unselectMxCells(prop: gf.TPropertieKey, pattern: string) {
    const mxcells = this.findMxCells(prop, pattern);
    if (mxcells) {
      this.unhighlightCells(mxcells);
    }
  }

  /**
   * Create tooltip on image
   *
   * @param {*} image
   * @param {*} tooltip
   * @returns {mxCellOverlay}
   * @memberof XGraph
   */
  createOverlay(image, tooltip): any {
    const overlay = new mxCellOverlay(image, tooltip);
    overlay.addListener(mxEvent.CLICK, (_sender, _evt) => {
      mxUtils.alert(`${tooltip}\nLast update: ${new Date()}`);
    });
    return overlay;
  }

  /**
   * Add Warning icon
   *
   * @param {string} state (OK|WARN|ERROR)
   * @param {mxCell} mxcell
   * @returns {this}
   * @memberof XGraph
   */
  addOverlay(state: string, mxcell: mxCell) {
    this.graph.addCellOverlay(mxcell, this.createOverlay(this.graph.warningImage, `State: ${state}`));
    return this;
  }

  /**
   * Remove Warning icon
   *
   * @param {mxCell} mxcell
   * @returns {this}
   * @memberof XGraph
   */
  removeOverlay(mxcell: mxCell) {
    this.graph.removeCellOverlays(mxcell);
    return this;
  }

  /**
   * Add link to cell
   *
   * @param {mxCell} mxcell
   * @param {string} link - Url
   * @returns {this}
   * @memberof XGraph
   */
  addLink(mxcell: mxCell, link) {
    this.graph.setLinkForCell(mxcell, link);
    return this;
  }

  /**
   * Get link from cell
   *
   * @param {mxCell} mxcell
   * @memberof XGraph
   */
  getLink(mxcell: mxCell): string | null {
    return this.graph.getLinkForCell(mxcell);
  }

  /**
   * Remove link of cell
   *
   * @param {mxCell} mxcell
   * @returns {this}
   * @memberof XGraph
   */
  removeLink(mxcell: mxCell): this {
    this.graph.setLinkForCell(mxcell, null);
    return this;
  }

  /**
   * Get value or id from cell source
   *
   * @param { gf.TPropertieKey} prop
   * @returns {string[]} value of labels or id frome source
   * @memberof XGraph
   */
  getOrignalCells(prop: gf.TPropertieKey): string[] {
    if (prop === 'id' || prop === 'value') {
      return this.cells[prop];
    }
    // TODO: attributs
    return [];
  }

  /**
   * Rename Id of cell
   * Must be uniq
   * @param {string} oldId
   * @param {string} newId
   * @returns {this} XGraph
   * @memberof XGraph
   */
  renameId(oldId: string, newId: string): this {
    const cells = this.findMxCells('id', oldId);
    if (cells !== undefined && cells.length > 0) {
      cells.forEach(cell => {
        cell.id = newId;
      });
    } else {
      GFP.log.warn(`Cell ${oldId} not found`);
    }
    return this;
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

  /**
   * Return all cells
   *
   * @returns {Map<mxCell>} mxCells
   * @memberof XGraph
   */
  getMxCells(): any {
    return this.graph.getModel().cells;
  }

  /**
   * Return value of id or value of mxcell
   *
   * @param {string} prop - "id"|"value"
   * @param {mxCell} mxcell
   * @memberof XGraph
   */
  getValuePropOfMxCell(prop: gf.TPropertieKey, mxcell: mxCell): string | null {
    if (prop === 'id') {
      return this.getId(mxcell);
    }
    if (prop === 'value') {
      return this.getLabelCell(mxcell);
    }
    return null;
  }

  getStyleCell(mxcell: mxCell, style: any): string | null {
    const state = this.graph.view.getState(mxcell);
    if (state) {
      return state.style[style];
    }
    return null;
  }

  /**
   * Apply color style on Cell
   *
   * @param {mxCell} mxcell
   * @param {gf.TStyleColor.Keys} style
   * @param {(string | null)} color
   * @param {boolean} [animate=false]
   * @returns {this}
   * @memberof XGraph
   */
  setColorCell(mxcell: mxCell, style: gf.TStyleColorKeys, color: string | null): this {
    if (this.animation) {
      try {
        const endColor = this.getStyleCell(mxcell, style);
        const startColor = color;
        const steps = GFP.utils.getStepColors(startColor, endColor, 5);
        const count = 0;
        const self = this;
        function graduate(count, steps) {
          if (count < steps.length) {
            // self.graph.setCellStyles(style, steps[count], [mxcell]);
            self.setStyleCell(mxcell, style, steps[count]);
            window.setTimeout(() => {
              graduate(count + 1, steps);
            }, 40);
          }
        }
        graduate(count, steps);
      } catch (error) {
        GFP.log.error('Error on graduate color', error);
        this.setStyleCell(mxcell, style, color);
      }
    } else {
      this.setStyleCell(mxcell, style, color);
    }
    return this;
  }

  /**
   * Change or apply style
   *
   * @param {mxCell} mxcell
   * @param {gf.TStyleColor.Keys} style
   * @param {(string | null)} value
   * @returns {this}
   * @memberof XGraph
   */
  setStyleCell(mxcell: mxCell, style: any, value: string | null): this {
    if (value !== null) {
      this.graph.setCellStyles(style, value, [mxcell]);
    }
    return this;
  }

  /**
   * Apply the styles to mxcell
   *
   * @param {mxCell} mxcell
   * @param {string} styles
   * @memberof XGraph
   */
  setStyles(mxcell: mxCell, styles: string) {
    this.graph.getModel().setStyle(mxcell, styles);
  }

  /**
   * Return Label/value of mxcell
   *
   * @param {mxCell} mxcell
   * @returns {string} Label of current cell
   * @memberof XGraph
   */
  getLabelCell(mxcell: mxCell): string {
    if (mxUtils.isNode(mxcell.value)) {
      return mxcell.value.getAttribute('label');
    }
    return mxcell.getValue(mxcell);
  }

  /**
   * Assign new label for mxcell
   *
   * @param {mxCell} mxcell
   * @param {string} text - New label
   * @returns {this}
   * @memberof XGraph
   */
  setLabelCell(mxcell: mxCell, text: string): this {
    this.graph.cellLabelChanged(mxcell, text, false);
    return this;
  }

  /**
   * Return Id of mxCell
   *
   * @param {mxCell} mxcell
   * @returns {string} Id of mxCell
   * @memberof XGraph
   */
  getId(mxcell): string {
    return mxcell.getId();
  }

  /**
   * Active mapping option when user click on mapping
   *
   * @param {Object} onMappingObj
   * @memberof XGraph
   */
  setMap(onMappingObj: gf.TIOnMappingObj) {
    GFP.log.info('XGraph.setMapping()');
    // GFP.log.debug('XGraph.setMapping() onMappingObject : ', onMappingObj);
    this.onMapping = onMappingObj;
    if (this.onMapping.active === true) {
      this.container.style.cursor = 'crosshair';
      this.graph.click = this.eventClick.bind(this);
    }
  }

  /**
   * Disable mapping when user click on mapping
   *
   * @memberof XGraph
   */
  unsetMap() {
    GFP.log.info('XGraph.unsetMapping()');
    this.onMapping.active = false;
    this.container.style.cursor = 'auto';
    this.graph.click = this.clickBackup;
    if (this.onMapping.$scope) {
      this.onMapping.$scope.$applyAsync();
    }
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
    GFP.log.info('XGraph.eventClick()');

    if (this.onMapping.active) {
      const state = me.getState();
      if (state) {
        const id = state.cell.id;
        if (this.onMapping.object) {
          this.onMapping.object.data.pattern = id;
        }
        if (this.onMapping.id) {
          const elt = document.getElementById(this.onMapping.id);
          if (elt) {
            setTimeout(() => {
              elt.focus();
            }, 100);
          }
        }
        this.unsetMap();
      }
    }
  }

  /**
   * Event for double click on graph
   *
   * @param {MouseEvent} evt
   * @param {mxCell} mxcell
   * @memberof XGraph
   */
  eventDbClick(evt: MouseEvent, mxcell: mxCell) {
    GFP.log.info('XGraph.eventDbClick()');
    // GFP.log.debug('XGraph.eventDbClick() evt', evt);
    // GFP.log.debug('XGraph.eventDbClick() cell', mxcell);
    GFP.log.info('XGraph.eventDbClick() container.getBoundingClientRect()', this.container.getBoundingClientRect());
    if (mxcell !== undefined) {
      this.lazyZoomCell(mxcell);
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
    GFP.log.info('XGraph.eventMouseWheel()');
    if (this.graph.isZoomWheelEvent(evt)) {
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
    GFP.log.info('XGraph.lazyZoomPointer()');
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
   * @param {mxCell[]} cells
   * @memberof XGraph
   */
  async highlightCells(cells: mxCell[] = this.getMxCells()) {
    for (let i = 0; i < cells.length; i++) {
      this.highlightCell(cells[i]);
    }
  }

  /**
   * UnHighlights the given array of cells.
   *
   * @param {mxCell[]} cells
   * @memberof XGraph
   */
  async unhighlightCells(mxcells: mxCell[] = this.getMxCells()) {
    _.each(mxcells, (mxcell: mxCell) => {
      this.unhighlightCell(mxcell);
    });
  }

  /**
   * Highlights the given cell.
   *
   * @param {*} cell
   * @returns
   * @memberof XGraph
   */
  async highlightCell(cell: mxCell) {
    if (!cell.highlight) {
      const color = '#99ff33';
      const opacity = 100;
      const state = this.graph.view.getState(cell);

      if (state != null) {
        const sw = Math.max(5, mxUtils.getValue(state.style, mxConstants.STYLE_STROKEWIDTH, 1) + 4);
        const hl = new mxCellHighlight(this.graph, color, sw, false);

        if (opacity != null) {
          hl.opacity = opacity;
        }

        hl.highlight(state);
        cell.highlight = hl;
      }
    }
  }

  /**
   * UnHighlights the given cell.
   *
   * @param {mxCell} cell
   * @memberof XGraph
   */
  async unhighlightCell(cell: mxCell) {
    if (cell && cell.highlight) {
      const hl = cell.highlight;
      // Fades out the highlight after a duration
      if (hl.shape != null) {
        mxUtils.setPrefixedStyle(hl.shape.node.style, 'transition', 'all 500ms ease-in-out');
        hl.shape.node.style.opacity = 0;
      }
      // Destroys the highlight after the fade
      window.setTimeout(() => {
        hl.destroy();
      }, 500);
      cell.highlight = null;
    }
  }

  /**
   * Zoom cell on full panel
   *
   * @param {mxCell} mxcell
   * @memberof XGraph
   */
  async lazyZoomCell(mxcell: mxCell) {
    GFP.log.info('XGraph.lazyZoomCell() mxcell', mxcell);
    GFP.log.debug('XGraph.lazyZoomCell() mxcellState', this.graph.view.getState(mxcell));
    if (mxcell !== undefined && mxcell !== null && mxcell.isVertex()) {
      const state = this.graph.view.getState(mxcell);
      if (state !== null) {
        const x = state.x;
        const y = state.y;
        const width = state.width;
        const height = state.height;
        const rect = new mxRectangle(x, y, width, height);
        this.graph.zoomToRect(rect);
        this.cumulativeZoomFactor = this.graph.view.scale;
      }
    }
  }

  static loadXml(url): string | null {
    try {
      const req: any = mxUtils.load(url);
      if (req.getStatus() >= 200 && req.getStatus() <= 299) {
        return req.getText();
      } else {
        GFP.log.error('Cannot load ' + url, req.getStatus());
      }
    } catch (error) {
      GFP.log.error('Cannot load ' + url, error);
    }
    return null;
  }

  /**
   * Change Cells to visible
   *
   * @param {*} mxcell
   * @param {*} includeEdges
   * @memberof XGraph
   */
  async toggleVisible(mxcell, includeEdges) {
    this.graph.toggleCells(!this.graph.getModel().isVisible(mxcell), [mxcell], includeEdges);
  }

  static compress(source: string): string {
    return Graph.compress(source, true);
  }

  static decompress(source: string): string {
    return Graph.decompress(source, true);
  }
}
