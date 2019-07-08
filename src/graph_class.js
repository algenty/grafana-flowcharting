/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable dot-notation */
/* eslint-disable object-shorthand */
window.mxLanguages = window.mxLanguages || ['en'];

const sanitizer = require('sanitizer');
const mxgraph = require('mxgraph')({
  mxImageBasePath: GF_PLUGIN.getMxImagePath(),
  mxBasePath: GF_PLUGIN.getMxBasePath(),
  mxLoadStylesheets: false,
  mxLanguage: 'en',
  mxLoadResources: false,
});

window.BASE_PATH = window.BASE_PATH || GF_PLUGIN.getMxBasePath();
window.RESOURCES_PATH = window.BASE_PATH || `${window.BASE_PATH}resources`;
window.RESOURCE_BASE = window.RESOURCE_BASE || `${window.RESOURCES_PATH}/grapheditor`;
window.STENCIL_PATH = window.STENCIL_PATH || `${window.BASE_PATH}stencils`;
window.IMAGE_PATH = window.IMAGE_PATH || `${window.BASE_PATH}images`;
window.STYLE_PATH = window.STYLE_PATH || `${window.BASE_PATH}styles`;
window.CSS_PATH = window.CSS_PATH || `${window.BASE_PATH}styles`;
window.mxLanguages = window.mxLanguages || ['en'];

// Put to global vars to work
window.mxActor = window.mxActor || mxgraph.mxActor;
window.mxArrow = window.mxArrow || mxgraph.mxArrow;
window.mxArrowConnector = window.mxArrowConnector || mxgraph.mxArrowConnector;
window.mxCell = window.mxCell || mxgraph.mxCell;
window.mxCellEditor = window.mxCellEditor || mxgraph.mxCellEditor;
window.mxCellHighlight = window.mxCellHighlight || mxgraph.mxCellHighlight;
window.mxCellOverlay = window.mxCellOverlay || mxgraph.mxCellOverlay;
window.mxCellRenderer = window.mxCellRenderer || mxgraph.mxCellRenderer;
window.mxCellState = window.mxCellState || mxgraph.mxCellState;
window.mxClient = window.mxClient || mxgraph.mxClient;
mxClient.mxBasePath = GF_PLUGIN.getMxBasePath();
mxClient.mxImageBasePath = GF_PLUGIN.getMxImagePath();
mxClient.mxLoadResources = true;
mxClient.mxLanguage = 'en';
mxClient.mxLoadStylesheets = true;
window.mxCloud = window.mxCloud || mxgraph.mxCloud;
window.mxCodec = window.mxCodec || mxgraph.mxCodec;
window.mxCompactTreeLayout = window.mxCompactTreeLayout || mxgraph.mxCompactTreeLayout;
window.mxConnectionConstraint = window.mxConnectionConstraint || mxgraph.mxConnectionConstraint;
window.mxConnectionHandler = window.mxConnectionHandler || mxgraph.mxConnectionHandler;
window.mxConnector = window.mxConnector || mxgraph.mxConnector;
window.mxConstants = window.mxConstants || mxgraph.mxConstants;
window.mxConstraintHandler = window.mxConstraintHandler || mxgraph.mxConstraintHandler;
window.mxCylinder = window.mxCylinder || mxgraph.mxCylinder;
window.mxDefaultKeyHandler = window.mxDefaultKeyHandler || mxgraph.mxDefaultKeyHandler;
window.mxDefaultPopupMenu = window.mxDefaultPopupMenu || mxgraph.mxDefaultPopupMenu;
window.mxDefaultToolbar = window.mxDefaultToolbar || mxgraph.mxDefaultToolbar;
window.mxDivResizer = window.mxDivResizer || mxgraph.mxDivResizer;
window.mxDoubleEllipse = window.mxDoubleEllipse || mxgraph.mxDoubleEllipse;
window.mxDragSource = window.mxDragSource || mxgraph.mxDragSource;
window.mxEdgeStyle = window.mxEdgeStyle || mxgraph.mxEdgeStyle;
window.mxEdgeHandler = window.mxEdgeHandler || mxgraph.mxEdgeHandler;
window.mxEditor = window.mxEditor || mxgraph.mxEditor;
window.mxElbowEdgeHandler = window.mxElbowEdgeHandler || mxgraph.mxElbowEdgeHandler;
window.mxEllipse = window.mxEllipse || mxgraph.mxEllipse;
window.mxEvent = window.mxEvent || mxgraph.mxEvent;
window.mxEventObject = window.mxEventObject || mxgraph.mxEventObject;
window.mxFile = window.mxFile || mxgraph.mxFile;
window.mxGeometry = window.mxGeometry || mxgraph.mxGeometry;
window.mxGraph = window.mxGraph || mxgraph.mxGraph;
window.mxGraphHandler = window.mxGraphHandler || mxgraph.mxGraphHandler;
window.mxGraphModel = window.mxGraphModel || mxgraph.mxGraphModel;
window.mxGraphView = window.mxGraphView || mxgraph.mxGraphView;
window.mxGuide = window.mxGuide || mxgraph.mxGuide;
window.mxHexagon = window.mxHexagon || mxgraph.mxHexagon;
window.mxHandle = window.mxHandle || mxgraph.mxHandle;
window.mxHierarchicalLayout = window.mxHierarchicalLayout || mxgraph.mxHierarchicalLayout;
window.mxImage = window.mxImage || mxgraph.mxImage;
window.mxImageShape = window.mxImageShape || mxgraph.mxImageShape;
window.mxKeyHandler = window.mxKeyHandler || mxgraph.mxKeyHandler;
window.mxLabel = window.mxLabel || mxgraph.mxLabel;
window.mxLayoutManager = window.mxLayoutManager || mxgraph.mxLayoutManager;
window.mxLine = window.mxLine || mxgraph.mxLine;
window.mxMarker = window.mxMarker || mxgraph.mxMarker;
window.mxOutline = window.mxOutline || mxgraph.mxOutline;
window.mxPanningHandler = window.mxPanningHandler || mxgraph.mxPanningHandler;
window.mxPerimeter = window.mxPerimeter || mxgraph.mxPerimeter;
window.mxPoint = window.mxPoint || mxgraph.mxPoint;
window.mxPolyline = window.mxPolyline || mxgraph.mxPolyline;
window.mxPopupMenu = window.mxPopupMenu || mxgraph.mxPopupMenu;
window.mxPopupMenuHandler = window.mxPopupMenuHandler || mxgraph.mxPopupMenuHandler;
window.mxPrintPreview = window.mxPrintPreview || mxgraph.mxPrintPreview;
window.mxRectangle = window.mxRectangle || mxgraph.mxRectangle;
window.mxRectangleShape = window.mxRectangleShape || mxgraph.mxRectangleShape;
window.mxResources = window.mxResources || mxgraph.mxResources;
window.mxRhombus = window.mxRhombus || mxgraph.mxRhombus;
window.mxRubberband = window.mxRubberband || mxgraph.mxRubberband;
window.mxShape = window.mxShape || mxgraph.mxShape;
window.mxStackLayout = window.mxStackLayout || mxgraph.mxStackLayout;
window.mxStencil = window.mxStencil || mxgraph.mxStencil;
window.mxStencilRegistry = window.mxStencilRegistry || mxgraph.mxStencilRegistry;
window.mxStylesheet = window.mxStylesheet || mxgraph.mxStylesheet;
window.mxStyleRegistry = window.mxStyleRegistry || mxgraph.mxStyleRegistry;
window.mxSvgCanvas2D = window.mxSvgCanvas2D || mxgraph.mxSvgCanvas2D;
window.mxSwimlane = window.mxSwimlane || mxgraph.mxSwimlane;
window.mxText = window.mxText || mxgraph.mxText;
window.mxToolbar = window.mxToolbar || mxgraph.mxToolbar;
window.mxTooltip = window.mxTooltip || mxgraph.mxTooltip;
window.mxTooltipHandler = window.mxTooltipHandler || mxgraph.mxTooltipHandler;
window.mxTriangle = window.mxTriangle || mxgraph.mxTriangle;
window.mxUndoManager = window.mxUndoManager || mxgraph.mxUndoManager;
window.mxUtils = window.mxUtils || mxgraph.mxUtils;
window.mxValueChange = window.mxValueChange || mxgraph.mxValueChange;
window.mxVertexHandler = window.mxVertexHandler || mxgraph.mxVertexHandler;

export default class XGraph {
  constructor(container, xmlGraph) {
    u.log(1, 'XGraph.constructor()');
    this.container = container;
    this.xmlGraph = undefined;
    if (u.isencoded(xmlGraph)) this.xmlGraph = u.decode(xmlGraph, true, true, true);
    else this.xmlGraph = xmlGraph;
    this.xmlGraph = xmlGraph;
    this.graph = undefined;
    this.scale = true;
    this.tooltip = true;
    this.lock = true;
    this.center = true;
    this.zoom = false;
    this.grid = false;
    this.bgColor = undefined;
    this.zoomPercent = '1';
    this.cells = {};
    this.cells.id = [];
    this.cells.value = [];
    this.cells.attributs = {};
    this.clickBackup = undefined;

    this.initGraph();
  }

  initGraph() {
    u.log(1, 'XGraph.initGraph()');
    const Graph = require('./Graph')({
      libs: 'arrows;basic;bpmn;flowchart',
    });
    require('./Shapes');
    window.Graph = window.Graph || Graph;
    // require('./Graph_over');
    this.graph = new Graph(this.container);
    // /!\ What is setPannig
    // this.graph.setPanning(true);
    this.clickBackup = this.graph.click;
  }

  drawGraph() {
    u.log(1, 'XGraph.drawGraph()');
    this.graph.getModel().beginUpdate();
    this.graph.getModel().clear();
    try {
      const xmlDoc = mxUtils.parseXml(this.xmlGraph);
      const codec = new mxCodec(xmlDoc);
      codec.decode(xmlDoc.documentElement, this.graph.getModel());
    } catch (error) {
      u.log(3, 'Error in draw', error);
    } finally {
      this.graph.getModel().endUpdate();
      this.cells['id'] = this.getCurrentCells('id');
      this.cells['value'] = this.getCurrentCells('value');
    }
  }

  refreshGraph(width, height) {
    u.log(1, 'XGraph.refreshGraph()');
    const $div = $(this.container);
    const size = Math.min(width, height);

    const css = {
      margin: 'auto',
      position: 'relative',
      width: width,
      height: `${size - 30}px`,
    };

    $div.css(css);
    if (!this.scale) this.zoomGraph(this.zoomPercent);
    else this.unzoomGraph();

    this.tooltipGraph(this.tooltip);
    this.lockGraph(this.lock);
    this.scaleGraph(this.scale);
    this.gridGraph(this.grid);
    this.centerGraph(this.center);
    this.bgGraph(this.bgColor);
    this.graph.refresh();
  }

  lockGraph(bool) {
    if (bool) this.graph.setEnabled(false);
    else this.graph.setEnabled(true);
    this.lock = bool;
  }

  tooltipGraph(bool) {
    if (bool) this.graph.setTooltips(true);
    else this.graph.setTooltips(false);
    this.tooltip = bool;
  }

  centerGraph(bool) {
    this.graph.centerZoom = false;
    if (bool) this.graph.center(true, true);
    else this.graph.center(false, false);
    this.center = bool;
  }

  scaleGraph(bool) {
    if (bool) {
      this.unzoomGraph();
      this.graph.fit();
      this.graph.view.rendering = true;
    }
    this.scale = bool;
  }

  gridGraph(bool) {
    if (bool) {
      // eslint-disable-next-line no-undef
      this.container.style.backgroundImage = `url('${IMAGE_PATH}/grid.gif')`;
    } else {
      this.container.style.backgroundImage = '';
    }
    this.grid = bool;
  }

  zoomGraph(percent) {
    u.log(1, 'XGraph.zoomGraph()');
    if (!this.scale && percent && percent.length > 0 && percent !== '100%' && percent !== '0%') {
      const ratio = percent.replace('%', '') / 100;
      this.graph.zoomTo(ratio, true);
      this.zoomPercent = percent;
    } else {
      this.unzoomGraph();
    }
    this.zoom = true;
  }

  unzoomGraph() {
    this.zoom = false;
    this.graph.zoomActual();
  }

  bgGraph(bgColor) {
    const $div = $(this.container);
    if (bgColor) {
      this.bgColor = bgColor;
      $div.css("background-color", bgColor);
    } else {
      $div.css("background-color", "");
    }
  }

  getMxGraph() {
    return this.graph;
  }

  getxmlGraph() {
    return this.xmlGraph;
  }

  setXmlGraph(xmlGraph) {
    u.log(1, 'XGraph.setXmlGraph()');
    if (u.isencoded(xmlGraph)) this.xmlGraph = u.decode(xmlGraph, true, true, true);
    else this.xmlGraph = xmlGraph;
    this.drawGraph();
  }

  getCurrentCells(prop) {
    const cellIds = [];
    const model = this.graph.getModel();
    const cells = model.cells;
    if (prop === 'id') {
      _.each(cells, (cell) => {
        cellIds.push(cell.getId());
      });
    } else if (prop === 'value') {
      _.each(cells, (cell) => {
        cellIds.push(cell.getValue());
      });
    }
    return cellIds;
  }

  findMxCells(prop, pattern) {
    const mxcells = this.getMxCells();
    const result = [];
    if (prop === 'id') {
      _.each(mxcells, (mxcell) => {
        if (u.matchString(mxcell.id, pattern)) result.push(mxcell);
      });
    } else if (prop === 'value') {
      _.each(mxcells, (mxcell) => {
        if (u.matchString(mxcell.getValue(), pattern)) result.push(mxcell);
      });
    }
    return result;
  }

  selectMxCells(prop, pattern) {
    const mxcells = this.findMxCells(prop, pattern);
    if (mxcells) {
      this.graph.setSelectionCells(mxcells);
    }
  }

  unselectMxCells() {
    // this.graph.removeCellOverlays(cell);
    this.graph.clearSelection();
  }

  createOverlay(image, tooltip) {
    const overlay = new mxCellOverlay(image, tooltip);
    overlay.addListener(mxEvent.CLICK, (_sender, _evt) => {
      mxUtils.alert(`${tooltip}\nLast update: ${new Date()}`);
    });
    return overlay;
  }

  addOverlay(state, mxcell) {
    this.graph.addCellOverlay(
      mxcell,
      this.createOverlay(this.graph.warningImage, `State: ${state}`),
    );
  }

  removeOverlay(mxcell) {
    this.graph.removeCellOverlays(mxcell);
  }

  addLink(mxcell, link) {
    this.graph.setLinkForCell(mxcell, link);
  }

  getLink(mxcell) {
    this.graph.getLinkForCell(mxcell);
  }

  addTooltip(mxcell, name, value, color) {
    this.graph.setAttributeForCell(mxcell, name, value);
  }

  removeTooltip(mxcell, name) {
    this.graph.setAttributeForCell(mxcell, name, null);
  }

  removeLink(mxcell) {
    this.graph.setLinkForCell(mxcell, null);
  }

  getOrignalCells(prop) {
    if (prop === 'id' || prop === 'value') return this.cells[prop];
    // TODO: attributs
    return [];
  }

  renameId(oldId, newId) {
    const cells = this.findMxCells('id', oldId);
    if (cells !== undefined && cells.length > 0) {
      cells.forEach((cell) => {
        cell.id = newId;
      });
    } else {
      u.log(2, `Cell ${oldId} not found`);
    }
  }

  getXmlModel() {
    const encoder = new mxCodec();
    const node = encoder.encode(this.graph.getModel());
    return mxUtils.getXml(node);
  }

  findCurrentCells(prop, pattern) {
    const cells = this.getCurrentCells(prop);
    const result = _.find(cells, (cell) => {
      u.matchString(cell, pattern);
    });
    return result;
  }

  findOriginalCells(prop, pattern) {
    const cells = this.getOrignalCells(prop);
    const result = _.find(cells, (cell) => {
      u.matchString(cell, pattern);
    });
    return result;
  }

  getMxCells() {
    return this.graph.getModel().cells;
  }

  findCurrentMxCells(prop, pattern) {
    const cells = [];
    _.each(this.getMxCells(), (cell) => {
      if (prop === 'id') {
        const id = cell.getId();
        if (u.matchString(id, pattern)) cells.push(cell);
      } else if (prop === 'value') {
        const value = cell.getValue();
        if (u.matchString(value, pattern)) cells.push(cell);
      }
    });
    return cells;
  }

  getStyleCell(mxcell, style) {
    const state = this.graph.view.getState(mxcell);
    return state.style[style];
  }

  setStyleCell(mxcell, style, color) {
    this.graph.setCellStyles(style, color, [mxcell]);
  }

  // eslint-disable-next-line class-methods-use-this
  getValueCell(mxcell) {
    const view = this.graph.view;
    if (view.getState(mxcell).text != null) return view.getState(mxcell).text.lastValue;
    return mxcell.getValue();
  }

  // eslint-disable-next-line class-methods-use-this
  setValueCell(mxcell, text) {
    return mxcell.setValue(text);
  }

  setMap(onMappingObj) {
    u.log(1, 'XGraph.setMapping()');
    u.log(0, 'XGraph.setMapping() onMappingObject : ', onMappingObj);
    this.onMapping = onMappingObj;
    if (this.onMapping.active === true) {
      this.graph.click = this.eventGraph.bind(this);
    }
  }

  unsetMap() {
    u.log(1, 'XGraph.unsetMapping()');
    u.log(0, 'XGraph.unsetMapping() onMapping', this.onMapping);
    this.onMapping.active = false;
    this.graph.click = this.clickBackup;
    this.onMapping.$scope.$apply();
  }

  //
  // GRAPH HANDLER
  //

  eventGraph(me) {
    u.log(1, 'XGraph.eventGraph()');
    u.log(0, 'XGraph.eventGraph() me : ', me);
    u.log(0, 'XGraph.eventGraph() onMapping : ', this.onMapping);
    const self = this;

    if (this.onMapping.active) {
      const state = me.getState();
      if (state) {
        const id = state.cell.id;
        this.onMapping.object.data.pattern = id;
        const elt = document.getElementById(this.onMapping.id);
        if (elt) {
          setTimeout(() => {
            elt.focus();
          }, 100);
        }
        this.unsetMap();
      }
    }
  }
}
