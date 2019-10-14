"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = require("path");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.mxLanguages = window.mxLanguages || ['en'];

require('./libs/sanitizer.min');

var mxgraph = require('mxgraph')({
  mxImageBasePath: GF_PLUGIN.getMxImagePath(),
  mxBasePath: GF_PLUGIN.getMxBasePath(),
  mxLoadStylesheets: false,
  mxLanguage: 'en',
  mxLoadResources: false
});

var Chartist = require('chartist');

window.BASE_PATH = window.BASE_PATH || GF_PLUGIN.getMxBasePath();
window.RESOURCES_PATH = window.BASE_PATH || "".concat(window.BASE_PATH, "resources");
window.RESOURCE_BASE = window.RESOURCE_BASE || "".concat(window.RESOURCES_PATH, "/grapheditor");
window.STENCIL_PATH = window.STENCIL_PATH || "".concat(window.BASE_PATH, "stencils");
window.SHAPES_PATH = window.SHAPES_PATH || GF_PLUGIN.getShapesPath();
window.IMAGE_PATH = window.IMAGE_PATH || "".concat(window.BASE_PATH, "images");
window.STYLE_PATH = window.STYLE_PATH || "".concat(window.BASE_PATH, "styles");
window.CSS_PATH = window.CSS_PATH || "".concat(window.BASE_PATH, "styles");
window.mxLanguages = window.mxLanguages || ['en'];
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
window.mxUrlConverter = window.mxUrlConverter || mxgraph.mxUrlConverter;
window.mxUtils = window.mxUtils || mxgraph.mxUtils;
window.mxValueChange = window.mxValueChange || mxgraph.mxValueChange;
window.mxVertexHandler = window.mxVertexHandler || mxgraph.mxVertexHandler;

require('./Shapes');

var Graph = require('./Graph')({
  libs: 'arrows;basic;bpmn;flowchart'
});

Graph.handleFactory = mxGraph.handleFactory;
Graph.createHandle = mxGraph.createHandle;

require('./Graph_over');

window.Graph = window.Graph || Graph;

var XGraph = function () {
  function XGraph(container, type, definition) {
    _classCallCheck(this, XGraph);

    u.log(1, 'XGraph.constructor()');
    this.container = container;
    this.xmlGraph = undefined;
    this.type = type;
    this.graph = undefined;
    this.scale = true;
    this.tooltip = true;
    this.lock = true;
    this.center = true;
    this.zoom = false;
    this.zoomFactor = 1.2;
    this.cumulativeZoomFactor = 1;
    this.updateZoomTimeout = null;
    this.resize = null;
    this.grid = false;
    this.bgColor = undefined;
    this.zoomPercent = '1';
    this.cells = {};
    this.cells.id = [];
    this.cells.value = [];
    this.cells.attributs = {};
    this.clickBackup = undefined;

    if (type === 'xml') {
      if (u.isencoded(definition)) this.xmlGraph = u.decode(definition, true, true, true);else this.xmlGraph = definition;
    }

    this.initGraph();
  }

  _createClass(XGraph, [{
    key: "initGraph",
    value: function initGraph() {
      u.log(1, 'XGraph.initGraph()');
      this.graph = new Graph(this.container);
      this.graph.getTooltipForCell = this.getTooltipForCell;
      this.graph.getTooltipChart = this.getTooltipChart;
      this.graph.getTooltipGFs = this.getTooltipGFs;
      this.graph.getTooltipMetric = this.getTooltipMetric;
      this.graph.getTooltipDate = this.getTooltipDate;
      this.graph.setPanning(true);
      this.clickBackup = this.graph.click;
      this.dbclickBackup = this.graph.dblClick;
      mxEvent.addMouseWheelListener(mxUtils.bind(this, this.eventMouseWheel), this.container);
      if (mxClient.IS_IE || mxClient.IS_EDGE) mxEvent.addListener(this.container, 'wheel', mxUtils.bind(this, this.eventMouseWheel));
      mxEvent.addListener(document, 'keydown', mxUtils.bind(this, this.eventKey));
      this.container.addEventListener('contextmenu', function (e) {
        return e.preventDefault();
      });
      this.graph.dblClick = this.eventDbClick.bind(this);
    }
  }, {
    key: "drawGraph",
    value: function drawGraph() {
      u.log(1, 'XGraph.drawGraph()');
      this.graph.getModel().beginUpdate();
      this.graph.getModel().clear();

      try {
        var xmlDoc = mxUtils.parseXml(this.xmlGraph);
        var codec = new mxCodec(xmlDoc);
        codec.decode(xmlDoc.documentElement, this.graph.getModel());
      } catch (error) {
        u.log(3, 'Error in draw', error);
      } finally {
        this.graph.getModel().endUpdate();
        this.cells['id'] = this.getCurrentCells('id');
        this.cells['value'] = this.getCurrentCells('value');
      }
    }
  }, {
    key: "applyGraph",
    value: function applyGraph() {
      u.log(1, 'XGraph.refreshGraph()');
      if (!this.scale) this.zoomGraph(this.zoomPercent);else this.unzoomGraph();
      this.tooltipGraph(this.tooltip);
      this.lockGraph(this.lock);
      if (this.scale && this.center) this.fitGraph();else {
        this.scaleGraph(this.scale);
        this.centerGraph(this.center);
      }
      this.gridGraph(this.grid);
      this.bgGraph(this.bgColor);
      this.refresh();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.graph.refresh();
    }
  }, {
    key: "destroyGraph",
    value: function destroyGraph() {
      this.graph.destroy();
      this.graph = undefined;
    }
  }, {
    key: "lockGraph",
    value: function lockGraph(bool) {
      if (bool) this.graph.setEnabled(false);else this.graph.setEnabled(true);
      this.lock = bool;
    }
  }, {
    key: "tooltipGraph",
    value: function tooltipGraph(bool) {
      if (bool) this.graph.setTooltips(true);else this.graph.setTooltips(false);
      this.tooltip = bool;
    }
  }, {
    key: "allowDrawio",
    value: function allowDrawio(bool) {
      if (bool) {
        mxUrlConverter.prototype.baseUrl = 'http://draw.io/';
        mxUrlConverter.prototype.baseDomain = '';
      } else {
        mxUrlConverter.prototype.baseUrl = null;
        mxUrlConverter.prototype.baseDomain = null;
      }
    }
  }, {
    key: "centerGraph",
    value: function centerGraph(bool) {
      this.graph.centerZoom = false;
      if (bool) this.graph.center(true, true);else this.graph.center(false, false);
      this.center = bool;
    }
  }, {
    key: "scaleGraph",
    value: function scaleGraph(bool) {
      if (bool) {
        this.unzoomGraph();
        this.graph.fit();
        this.graph.view.rendering = true;
      }

      this.scale = bool;
    }
  }, {
    key: "fitGraph",
    value: function fitGraph() {
      var margin = 2;
      var max = 3;
      var bounds = this.graph.getGraphBounds();
      var cw = this.graph.container.clientWidth - margin;
      var ch = this.graph.container.clientHeight - margin;
      var w = bounds.width / this.graph.view.scale;
      var h = bounds.height / this.graph.view.scale;
      var s = Math.min(max, Math.min(cw / w, ch / h));
      this.graph.view.scaleAndTranslate(s, (margin + cw - w * s) / (2 * s) - bounds.x / this.graph.view.scale, (margin + ch - h * s) / (2 * s) - bounds.y / this.graph.view.scale);
    }
  }, {
    key: "gridGraph",
    value: function gridGraph(bool) {
      if (bool) {
        this.container.style.backgroundImage = "url('".concat(IMAGE_PATH, "/grid.gif')");
      } else {
        this.container.style.backgroundImage = '';
      }

      this.grid = bool;
    }
  }, {
    key: "zoomGraph",
    value: function zoomGraph(percent) {
      u.log(1, 'XGraph.zoomGraph()');

      if (!this.scale && percent && percent.length > 0 && percent !== '100%' && percent !== '0%') {
        var ratio = percent.replace('%', '') / 100;
        this.graph.zoomTo(ratio, true);
        this.zoomPercent = percent;
      } else {
        this.unzoomGraph();
      }

      this.zoom = true;
    }
  }, {
    key: "unzoomGraph",
    value: function unzoomGraph() {
      this.zoom = false;
      this.graph.zoomActual();
    }
  }, {
    key: "bgGraph",
    value: function bgGraph(bgColor) {
      var $div = $(this.container);

      if (bgColor) {
        this.bgColor = bgColor;
        $div.css('background-color', bgColor);
      } else {
        $div.css('background-color', '');
      }
    }
  }, {
    key: "getMxGraph",
    value: function getMxGraph() {
      return this.graph;
    }
  }, {
    key: "getxmlGraph",
    value: function getxmlGraph() {
      return this.xmlGraph;
    }
  }, {
    key: "setXmlGraph",
    value: function setXmlGraph(xmlGraph) {
      u.log(1, 'XGraph.setXmlGraph()');
      if (u.isencoded(xmlGraph)) this.xmlGraph = u.decode(xmlGraph, true, true, true);else this.xmlGraph = xmlGraph;
      this.drawGraph();
    }
  }, {
    key: "getCurrentCells",
    value: function getCurrentCells(prop) {
      var cellIds = [];
      var model = this.graph.getModel();
      var cells = model.cells;

      if (prop === 'id') {
        _.each(cells, function (cell) {
          cellIds.push(cell.getId());
        });
      } else if (prop === 'value') {
        _.each(cells, function (cell) {
          cellIds.push(cell.getValue());
        });
      }

      return cellIds;
    }
  }, {
    key: "findMxCells",
    value: function findMxCells(prop, pattern) {
      var mxcells = this.getMxCells();
      var result = [];

      if (prop === 'id') {
        _.each(mxcells, function (mxcell) {
          if (u.matchString(mxcell.id, pattern)) result.push(mxcell);
        });
      } else if (prop === 'value') {
        _.each(mxcells, function (mxcell) {
          if (u.matchString(mxcell.getValue(), pattern)) result.push(mxcell);
        });
      }

      return result;
    }
  }, {
    key: "selectMxCells",
    value: function selectMxCells(prop, pattern) {
      var mxcells = this.findMxCells(prop, pattern);

      if (mxcells) {
        this.highlightCells(mxcells);
      }
    }
  }, {
    key: "unselectMxCells",
    value: function unselectMxCells(prop, pattern) {
      var mxcells = this.findMxCells(prop, pattern);

      if (mxcells) {
        this.unhighlightCells(mxcells);
      }
    }
  }, {
    key: "createOverlay",
    value: function createOverlay(image, tooltip) {
      var overlay = new mxCellOverlay(image, tooltip);
      overlay.addListener(mxEvent.CLICK, function (_sender, _evt) {
        mxUtils.alert("".concat(tooltip, "\nLast update: ").concat(new Date()));
      });
      return overlay;
    }
  }, {
    key: "addOverlay",
    value: function addOverlay(state, mxcell) {
      this.graph.addCellOverlay(mxcell, this.createOverlay(this.graph.warningImage, "State: ".concat(state)));
    }
  }, {
    key: "removeOverlay",
    value: function removeOverlay(mxcell) {
      this.graph.removeCellOverlays(mxcell);
    }
  }, {
    key: "addLink",
    value: function addLink(mxcell, link) {
      this.graph.setLinkForCell(mxcell, link);
    }
  }, {
    key: "getLink",
    value: function getLink(mxcell) {
      this.graph.getLinkForCell(mxcell);
    }
  }, {
    key: "removeLink",
    value: function removeLink(mxcell) {
      this.graph.setLinkForCell(mxcell, null);
    }
  }, {
    key: "getOrignalCells",
    value: function getOrignalCells(prop) {
      if (prop === 'id' || prop === 'value') return this.cells[prop];
      return [];
    }
  }, {
    key: "renameId",
    value: function renameId(oldId, newId) {
      var cells = this.findMxCells('id', oldId);

      if (cells !== undefined && cells.length > 0) {
        cells.forEach(function (cell) {
          cell.id = newId;
        });
      } else {
        u.log(2, "Cell ".concat(oldId, " not found"));
      }
    }
  }, {
    key: "getXmlModel",
    value: function getXmlModel() {
      var encoder = new mxCodec();
      var node = encoder.encode(this.graph.getModel());
      return mxUtils.getXml(node);
    }
  }, {
    key: "getMxCells",
    value: function getMxCells() {
      return this.graph.getModel().cells;
    }
  }, {
    key: "getValuePropOfMxCell",
    value: function getValuePropOfMxCell(prop, mxcell) {
      if (prop === 'id') return this.getId(mxcell);
      if (prop === 'value') return this.getLabel(mxcell);
      return null;
    }
  }, {
    key: "getStyleCell",
    value: function getStyleCell(mxcell, style) {
      var state = this.graph.view.getState(mxcell);
      if (state) return state.style[style];
      return null;
    }
  }, {
    key: "setStyleCell",
    value: function setStyleCell(mxcell, style, color) {
      this.graph.setCellStyles(style, color, [mxcell]);
    }
  }, {
    key: "getLabel",
    value: function getLabel(mxcell) {
      if (mxUtils.isNode(mxcell.value)) {
        return mxcell.value.getAttribute('label');
      }

      return mxcell.getValue(mxcell);
    }
  }, {
    key: "getId",
    value: function getId(mxcell) {
      return mxcell.getId();
    }
  }, {
    key: "setLabelCell",
    value: function setLabelCell(mxcell, text) {
      if (mxUtils.isNode(mxcell.value)) {
        var label = mxcell.value.setAttribute('label', text);
      } else mxcell.setValue(text);

      return text;
    }
  }, {
    key: "setMap",
    value: function setMap(onMappingObj) {
      u.log(1, 'XGraph.setMapping()');
      u.log(0, 'XGraph.setMapping() onMappingObject : ', onMappingObj);
      this.onMapping = onMappingObj;

      if (this.onMapping.active === true) {
        this.container.style.cursor = 'crosshair';
        this.graph.click = this.eventClick.bind(this);
      }
    }
  }, {
    key: "unsetMap",
    value: function unsetMap() {
      u.log(1, 'XGraph.unsetMapping()');
      this.onMapping.active = false;
      this.container.style.cursor = 'auto';
      this.graph.click = this.clickBackup;
      this.onMapping.$scope.$apply();
    }
  }, {
    key: "eventClick",
    value: function eventClick(me) {
      u.log(1, 'XGraph.eventClick()');
      var self = this;

      if (this.onMapping.active) {
        var state = me.getState();

        if (state) {
          var id = state.cell.id;
          this.onMapping.object.data.pattern = id;
          var elt = document.getElementById(this.onMapping.id);

          if (elt) {
            setTimeout(function () {
              elt.focus();
            }, 100);
          }

          this.unsetMap();
        }
      }
    }
  }, {
    key: "eventDbClick",
    value: function eventDbClick(evt, mxcell) {
      u.log(1, 'XGraph.eventDbClick()');
      u.log(0, 'XGraph.eventDbClick() evt', evt);
      u.log(0, 'XGraph.eventDbClick() cell', mxcell);
      u.log(1, 'XGraph.eventDbClick() container.getBoundingClientRect()', this.container.getBoundingClientRect());

      if (mxcell !== undefined) {
        this.lazyZoomCell(mxcell);
      }
    }
  }, {
    key: "eventMouseWheel",
    value: function eventMouseWheel(evt, up) {
      u.log(1, 'XGraph.eventMouseWheel()');
      u.log(0, 'XGraph.eventMouseWheel() evt', evt);
      u.log(0, 'XGraph.eventMouseWheel() up', up);

      if (this.graph.isZoomWheelEvent(evt)) {
        if (up == null || up == undefined) {
          u.log(0, 'XGraph.eventMouseWheel() up', "Not defined");
          if (evt.deltaY < 0) up = true;else up = false;
        }

        var x = evt.layerX;
        var y = evt.layerY;

        if (up) {
          this.cumulativeZoomFactor = this.cumulativeZoomFactor * 1.2;
        } else {
          this.cumulativeZoomFactor = this.cumulativeZoomFactor * 0.8;
        }

        this.lazyZoomPointer(this.cumulativeZoomFactor, x, y);
        mxEvent.consume(evt);
      }
    }
  }, {
    key: "eventKey",
    value: function eventKey(evt) {
      if (!mxEvent.isConsumed(evt) && evt.keyCode == 27) {
          this.cumulativeZoomFactor = 1;

          if (this.graph) {
            this.graph.zoomActual();
            this.applyGraph(this.width, this.height);
          }
        }
    }
  }, {
    key: "lazyZoomCenter",
    value: function lazyZoomCenter(factor) {
      this.graph.zoomTo(factor, true);
    }
  }, {
    key: "lazyZoomPointer",
    value: function lazyZoomPointer(factor, offsetX, offsetY) {
      u.log(1, 'XGraph.lazyZoomPointer()');
      u.log(0, 'XGraph.lazyZoomPointer() factor', factor);
      u.log(0, 'XGraph.lazyZoomPointer() offsetX', offsetX);
      u.log(0, 'XGraph.lazyZoomPointer() offsetY', offsetY);
      var dx = offsetX * 2;
      var dy = offsetY * 2;
      factor = Math.max(0.01, Math.min(this.graph.view.scale * factor, 160)) / this.graph.view.scale;
      factor = this.cumulativeZoomFactor / this.graph.view.scale;
      var scale = Math.round(this.graph.view.scale * factor * 100) / 100;
      factor = scale / this.graph.view.scale;

      if (factor > 1) {
        var f = (factor - 1) / (scale * 2);
        dx *= -f;
        dy *= -f;
      } else {
        var f = (1 / factor - 1) / (this.graph.view.scale * 2);
        dx *= f;
        dy *= f;
      }

      this.graph.view.scaleAndTranslate(scale, this.graph.view.translate.x + dx, this.graph.view.translate.y + dy);
    }
  }, {
    key: "highlightCells",
    value: function highlightCells(cells) {
      for (var i = 0; i < cells.length; i++) {
        this.highlightCell(cells[i]);
      }
    }
  }, {
    key: "unhighlightCells",
    value: function unhighlightCells(cells) {
      for (var i = 0; i < cells.length; i++) {
        this.unhighlightCell(cells[i]);
      }
    }
  }, {
    key: "highlightCell",
    value: function highlightCell(cell) {
      if (cell.highlight) return;
      var color = '#99ff33';
      var opacity = 100;
      var state = this.graph.view.getState(cell);

      if (state != null) {
        var sw = Math.max(5, mxUtils.getValue(state.style, mxConstants.STYLE_STROKEWIDTH, 1) + 4);
        var hl = new mxCellHighlight(this.graph, color, sw, false);

        if (opacity != null) {
          hl.opacity = opacity;
        }

        hl.highlight(state);
        cell.highlight = hl;
      }
    }
  }, {
    key: "unhighlightCell",
    value: function unhighlightCell(cell) {
      if (cell && cell.highlight) {
        var hl = cell.highlight;

        if (hl.shape != null) {
          mxUtils.setPrefixedStyle(hl.shape.node.style, 'transition', 'all 500ms ease-in-out');
          hl.shape.node.style.opacity = 0;
        }

        window.setTimeout(function () {
          hl.destroy();
        }, 500);
        cell.highlight = null;
      }
    }
  }, {
    key: "lazyZoomCell",
    value: function lazyZoomCell(mxcell) {
      u.log(1, 'XGraph.lazyZoomCell() mxcell', mxcell);
      u.log(0, 'XGraph.lazyZoomCell() mxcellState', this.graph.view.getState(mxcell));

      if (mxcell !== undefined && mxcell !== null && mxcell.isVertex()) {
        var state = this.graph.view.getState(mxcell);

        if (state !== null) {
          var x = state.x;
          var y = state.y;
          var width = state.width;
          var height = state.height;
          var rect = new mxRectangle(x, y, width, height);
          this.graph.zoomToRect(rect);
          this.cumulativeZoomFactor = this.graph.view.scale;
        }
      }
    }
  }, {
    key: "toggleVisible",
    value: function toggleVisible(mxcell, includeEdges) {
      this.graph.toggleCells(!this.graph.getModel().isVisible(mxcell), [mxcell], includeEdges);
    }
  }, {
    key: "getTooltipForCell",
    value: function getTooltipForCell(cell) {
      u.log(1, 'Graph.prototype.getTooltipForCell()');
      var hasTips = false;
      var div = document.createElement('div');

      if (mxUtils.isNode(cell.value)) {
        var tmp = cell.value.getAttribute('tooltip');

        if (tmp != null) {
          hasTips = true;

          if (tmp != null && this.isReplacePlaceholders(cell)) {
            tmp = this.replacePlaceholders(cell, tmp);
          }

          var ttDiv = document.createElement('div');
          ttDiv.className = 'tooltip-text';
          ttDiv.innerHTML = this.sanitizeHtml(tmp);
          div.appendChild(ttDiv);
        }

        var ignored = this.builtInProperties;
        var attrs = cell.value.attributes;
        var temp = [];
        ignored.push('link');

        for (var i = 0; i < attrs.length; i++) {
          if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 && attrs[i].nodeValue.length > 0) {
            temp.push({
              name: attrs[i].nodeName,
              value: attrs[i].nodeValue
            });
          }
        }

        temp.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });

        if (temp.length > 0) {
          hasTips = true;
          var attrDiv = document.createElement('div');
          var attrString = '';

          for (var i = 0; i < temp.length; i++) {
            if (temp[i].name != 'link' || !this.isCustomLink(temp[i].value)) {
              attrString += (temp[i].name != 'link' ? '<b>' + temp[i].name + ':</b> ' : '') + mxUtils.htmlEntities(temp[i].value) + '\n';
            }
          }

          attrDiv.innerHTML = attrString;
          div.appendChild(attrDiv);
        }
      }

      var divs = this.getTooltipGFs(cell);

      if (divs !== null) {
        hasTips = true;
        div.appendChild(divs);
      }

      if (hasTips) return div;
      return '';
    }
  }, {
    key: "getTooltipDate",
    value: function getTooltipDate(date) {
      var dateDiv = document.createElement('div');

      if (date !== undefined && date !== null) {
        dateDiv.className = 'graph-tooltip-time';
        dateDiv.innerHTML = "</br>".concat(date);
      }

      return dateDiv;
    }
  }, {
    key: "getTooltipGFs",
    value: function getTooltipGFs(cell) {
      var tooltips = cell.GF_tooltips;
      if (tooltips == undefined || !tooltips.checked) return null;
      var GFsDiv = document.createElement('div');

      if (tooltips.metrics.length > 0) {
        GFsDiv.appendChild(this.getTooltipDate(tooltips.lastChange));
        var MetricsDiv = document.createElement('div');

        for (var i = 0; i < tooltips.metrics.length; i++) {
          var GFDiv = document.createElement('div');
          GFDiv.className = 'tooltip-metric';
          var metric = tooltips.metrics[i];
          if (metric.direction != null && metric.direction === 'h') GFDiv.style = 'display:inline-block;*display:inline;*zoom:1';
          GFDiv.appendChild(this.getTooltipMetric(metric));
          GFDiv.appendChild(this.getTooltipChart(metric));
          MetricsDiv.appendChild(GFDiv);
        }

        GFsDiv.appendChild(MetricsDiv);
      }

      return GFsDiv;
    }
  }, {
    key: "getTooltipMetric",
    value: function getTooltipMetric(metric) {
      var metricDiv = document.createElement('div');
      var metricString = '';

      if (metric !== undefined) {
        metricString += "".concat(metric.name, " : ");
        metricString += "<span style=\"color:".concat(metric.color, "\"><b>").concat(metric.value, "</b></span></br>");
      }

      metricDiv.innerHTML = metricString;
      return metricDiv;
    }
  }, {
    key: "getTooltipChart",
    value: function getTooltipChart(metric) {
      u.log(0, 'getTooltipChart() metric ', metric);
      var defaultColor = '#8c8980';

      function arrayColumn(arr, n) {
        return arr.map(function (x) {
          return x[n];
        });
      }

      function array2Coor(arr) {
        var result = [];

        for (var index = 0; index < arr.length; index++) {
          result.push({
            x: arr[index][0],
            y: arr[index][1]
          });
        }

        return result;
      }

      if (metric.chartDiv === undefined) {
        var chartDiv = document.createElement('div');
        chartDiv.className = 'tooltip-graph';
        if (!metric.graph) return chartDiv;
        var serie = metric.graphOptions.serie;
        var coor = array2Coor(serie.flotpairs);
        var color = metric.color != null ? metric.color : defaultColor;
        var size = undefined;

        if (metric.graphOptions.size != null) {
          size = metric.graphOptions.size;
          chartDiv.style = "width:".concat(size, ";");
        }

        chartDiv.className = 'ct-chart ct-golden-section';
        var data = {
          series: [coor]
        };
        var options = {
          showPoint: false,
          showLine: true,
          showArea: true,
          fullWidth: true,
          showLabel: false,
          width: size,
          axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          chartPadding: 0,
          low: 0
        };
        var chart = new Chartist.Line(chartDiv, data, options);
        metric.chart = chart;
        chart.on('draw', function (data) {
          u.log(0, 'Chartis.on() data ', data);

          if (data.type === 'line' || data.type === 'area') {
            if (data.type === 'line') data.element.attr({
              style: "stroke: ".concat(color)
            });
            if (data.type === 'area') data.element.attr({
              style: "fill: ".concat(color)
            });
            data.element.animate({
              d: {
                begin: 1000 * data.index,
                dur: 1000,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          }
        });
        metric.chartDiv = chartDiv;
        return chartDiv;
      } else return metric.chartDiv;
    }
  }]);

  return XGraph;
}();

exports["default"] = XGraph;
