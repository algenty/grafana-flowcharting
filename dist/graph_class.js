"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-undef */

/* eslint-disable new-cap */

/* eslint-disable dot-notation */

/* eslint-disable object-shorthand */
window.mxLanguages = window.mxLanguages || ['en'];

var sanitizer = require('sanitizer');

var mxgraph = require('mxgraph')({
  mxImageBasePath: GF_PLUGIN.getMxImagePath(),
  mxBasePath: GF_PLUGIN.getMxBasePath(),
  mxLoadStylesheets: false,
  mxLanguage: 'en',
  mxLoadResources: false
});

window.BASE_PATH = window.BASE_PATH || GF_PLUGIN.getMxBasePath();
window.RESOURCES_PATH = window.BASE_PATH || "".concat(window.BASE_PATH, "resources");
window.RESOURCE_BASE = window.RESOURCE_BASE || "".concat(window.RESOURCES_PATH, "/grapheditor");
window.STENCIL_PATH = window.STENCIL_PATH || "".concat(window.BASE_PATH, "stencils");
window.IMAGE_PATH = window.IMAGE_PATH || "".concat(window.BASE_PATH, "images");
window.STYLE_PATH = window.STYLE_PATH || "".concat(window.BASE_PATH, "styles");
window.CSS_PATH = window.CSS_PATH || "".concat(window.BASE_PATH, "styles");
window.mxLanguages = window.mxLanguages || ['en']; // Put to global vars to work

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
/**
 *mxGraph interface class
 *
 * @export
 * @class XGraph
 */

var XGraph =
/*#__PURE__*/
function () {
  /**
   *Creates an instance of XGraph.
   * @param {DOM} container
   * @param {string} definition
   * @memberof XGraph
   */
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
    this.zoom = false; // BEGIN ZOOM MouseWheele

    this.zoomFactor = 1.2;
    this.cumulativeZoomFactor = 1;
    this.updateZoomTimeout = null;
    this.resize = null; // END ZOOM MouseWheele

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
  /**
   *Graph initilisation and reset
   *
   * @memberof XGraph
   */


  _createClass(XGraph, [{
    key: "initGraph",
    value: function initGraph() {
      u.log(1, 'XGraph.initGraph()');

      var Graph = require('./Graph')({
        libs: 'arrows;basic;bpmn;flowchart'
      });

      require('./Shapes');

      window.Graph = window.Graph || Graph;

      require('./Graph_over');

      this.graph = new Graph(this.container); // /!\ What is setPannig

      this.graph.setPanning(true); // Backup funtions of clicks

      this.clickBackup = this.graph.click;
      this.dbclickBackup = this.graph.dblClick; // EVENTS
      // CTRL+MOUSEWHEEL

      mxEvent.addMouseWheelListener(mxUtils.bind(this, this.eventMouseWheel), this.container); // KEYS

      mxEvent.addListener(document, 'keydown', mxUtils.bind(this, this.eventKey)); // CONTEXT MENU
      // mxEvent.addListener(this.container, 'contextmenu', mxUtils.bind(this, function() {return false;}));

      this.container.addEventListener('contextmenu', function (e) {
        return e.preventDefault();
      }); // DB CLICK

      this.graph.dblClick = this.eventDbClick.bind(this);
    }
    /**
     *Draw graph
     *
     * @memberof XGraph
     */

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
    /**
     *Refresh graph
     *
     * @param {*} width
     * @param {*} height
     * @memberof XGraph
     */

  }, {
    key: "refreshGraph",
    value: function refreshGraph(width, height) {
      u.log(1, 'XGraph.refreshGraph()');
      var $div = $(this.container);
      var size = Math.min(width, height);
      this.width = width;
      this.height = height;
      var css = {
        margin: 'auto',
        position: 'relative',
        width: width,
        height: "".concat(size - 30, "px")
      };
      $div.css(css);
      if (!this.scale) this.zoomGraph(this.zoomPercent);else this.unzoomGraph();
      this.tooltipGraph(this.tooltip);
      this.lockGraph(this.lock);
      this.scaleGraph(this.scale);
      this.gridGraph(this.grid);
      this.centerGraph(this.center);
      this.bgGraph(this.bgColor);
      this.graph.refresh();
    }
  }, {
    key: "destroyGraph",
    value: function destroyGraph() {
      this.graph.destroy();
      this.graph = undefined;
    }
    /**
     *lock cells
     *
     * @param {Boolean} bool
     * @memberof XGraph
     */

  }, {
    key: "lockGraph",
    value: function lockGraph(bool) {
      if (bool) this.graph.setEnabled(false);else this.graph.setEnabled(true);
      this.lock = bool;
    }
    /**
     *Enable tooltip
     *
     * @param {Boolean} bool
     * @memberof XGraph
     */

  }, {
    key: "tooltipGraph",
    value: function tooltipGraph(bool) {
      if (bool) this.graph.setTooltips(true);else this.graph.setTooltips(false);
      this.tooltip = bool;
    }
    /**
     *Center graph in panel
     *
     * @param {Boolean} bool
     * @memberof XGraph
     */

  }, {
    key: "centerGraph",
    value: function centerGraph(bool) {
      this.graph.centerZoom = false;
      if (bool) this.graph.center(true, true);else this.graph.center(false, false);
      this.center = bool;
    }
    /**
     *Scale graph in panel
     *
     * @param {Boolean} bool
     * @memberof XGraph
     */

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
    /**
     *Display grid in panel
     *
     * @param {Boolean} bool
     * @memberof XGraph
     */

  }, {
    key: "gridGraph",
    value: function gridGraph(bool) {
      if (bool) {
        // eslint-disable-next-line no-undef
        this.container.style.backgroundImage = "url('".concat(IMAGE_PATH, "/grid.gif')");
      } else {
        this.container.style.backgroundImage = '';
      }

      this.grid = bool;
    }
    /**
     *Zoom/unzoom
     *
     * @param {string} percent
     * @memberof XGraph
     */

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
    /**
     *Restore initial size
     *
     * @memberof XGraph
     */

  }, {
    key: "unzoomGraph",
    value: function unzoomGraph() {
      this.zoom = false;
      this.graph.zoomActual();
    }
    /**
     *Define background color
     *
     * @param {string} bgColor
     * @memberof XGraph
     */

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
    /**
     *Return mxgraph object
     *
     * @returns {mxGraph}
     * @memberof XGraph
     */

  }, {
    key: "getMxGraph",
    value: function getMxGraph() {
      return this.graph;
    }
    /**
     *Return xml definition
     *
     * @returns {string}
     * @memberof XGraph
     */

  }, {
    key: "getxmlGraph",
    value: function getxmlGraph() {
      return this.xmlGraph;
    }
    /**
     *Assign xml definition and redraw graph
     *
     * @param {string} xmlGraph
     * @memberof XGraph
     */

  }, {
    key: "setXmlGraph",
    value: function setXmlGraph(xmlGraph) {
      u.log(1, 'XGraph.setXmlGraph()');
      if (u.isencoded(xmlGraph)) this.xmlGraph = u.decode(xmlGraph, true, true, true);else this.xmlGraph = xmlGraph;
      this.drawGraph();
    }
    /**
     *Get list of values or id
     *
     * @param {string} prop - id|value
     * @returns {Array<string>}
     * @memberof XGraph
     */

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
    /**
     *Get list of mxCell
     *
     * @param {string} prop - id|value
     * @param {string} pattern - regex like or string
     * @returns {Array<mxCell>}
     * @memberof XGraph
     */

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
    /**
     *Select cells in graph with pattern for id or value
     *
     * @param {string} prop - "id"|"value"
     * @param {string} pattern - regex like
     * @memberof XGraph
     */

  }, {
    key: "selectMxCells",
    value: function selectMxCells(prop, pattern) {
      var mxcells = this.findMxCells(prop, pattern);

      if (mxcells) {
        this.graph.setSelectionCells(mxcells);
      }
    }
    /**
     *Unselect cells
     *
     * @memberof XGraph
     */

  }, {
    key: "unselectMxCells",
    value: function unselectMxCells() {
      // this.graph.removeCellOverlays(cell);
      this.graph.clearSelection();
    }
    /**
     *Create tooltip on image
     *
     * @param {*} image
     * @param {*} tooltip
     * @returns
     * @memberof XGraph
     */

  }, {
    key: "createOverlay",
    value: function createOverlay(image, tooltip) {
      var overlay = new mxCellOverlay(image, tooltip);
      overlay.addListener(mxEvent.CLICK, function (_sender, _evt) {
        mxUtils.alert("".concat(tooltip, "\nLast update: ").concat(new Date()));
      });
      return overlay;
    }
    /**
     *Add Warning icon
     *
     * @param {string} state (OK|WARN|ERROR)
     * @param {mxCell} mxcell
     * @memberof XGraph
     */

  }, {
    key: "addOverlay",
    value: function addOverlay(state, mxcell) {
      this.graph.addCellOverlay(mxcell, this.createOverlay(this.graph.warningImage, "State: ".concat(state)));
    }
    /**
     *Remove Warning icon
     *
     * @param {mxCell} mxcell
     * @memberof XGraph
     */

  }, {
    key: "removeOverlay",
    value: function removeOverlay(mxcell) {
      this.graph.removeCellOverlays(mxcell);
    }
    /**
     *Add link to cell
     *
     * @param {mxCell} mxcell
     * @param {string} link - Url
     * @memberof XGraph
     */

  }, {
    key: "addLink",
    value: function addLink(mxcell, link) {
      this.graph.setLinkForCell(mxcell, link);
    }
    /**
     *Get link from cell
     *
     * @param {*} mxcell
     * @memberof XGraph
     */

  }, {
    key: "getLink",
    value: function getLink(mxcell) {
      this.graph.getLinkForCell(mxcell);
    }
    /**
     *Remove link of cell
     *
     * @param {mxCell} mxcell
     * @memberof XGraph
     */

  }, {
    key: "removeLink",
    value: function removeLink(mxcell) {
      this.graph.setLinkForCell(mxcell, null);
    }
    /**
     *Get value or id from cell source
     *
     * @param {*} prop
     * @returns
     * @memberof XGraph
     */

  }, {
    key: "getOrignalCells",
    value: function getOrignalCells(prop) {
      if (prop === 'id' || prop === 'value') return this.cells[prop]; // TODO: attributs

      return [];
    }
    /**
     *Rename Id of cell
     *Must be uniq
     *
     * @param {string} oldId
     * @param {string} newId
     * @memberof XGraph
     */

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
    /**
     *Get xml definition from current graph
     *
     * @returns
     * @memberof XGraph
     */

  }, {
    key: "getXmlModel",
    value: function getXmlModel() {
      var encoder = new mxCodec();
      var node = encoder.encode(this.graph.getModel());
      return mxUtils.getXml(node);
    }
    /**
     *Find and return current cell with matching pattern for id or value
     *
     * @param {string} prop - "id"|"value"
     * @param {string} pattern - regex
     * @returns {Array} strings of id
     * @memberof XGraph
     */
    // NOT USED
    // findCurrentCells(prop, pattern) {
    //   const cells = this.getCurrentCells(prop);
    //   const result = _.find(cells, cell => {
    //     u.matchString(cell, pattern);
    //   });
    //   return result;
    // }

    /**
     *Find and return original cell with matching pattern for id or value
     *
     * @param {string} prop - "id"|"value"
     * @param {string} pattern - regex
     * @returns {Array} strings of id
     * @memberof XGraph
     */
    // NOT USED
    // findOriginalCells(prop, pattern) {
    //   const cells = this.getOrignalCells(prop);
    //   const result = _.find(cells, cell => {
    //     u.matchString(cell, pattern);
    //   });
    //   return result;
    // }

    /**
     *Return all cells
     *
     * @returns {array} mxCells
     * @memberof XGraph
     */

  }, {
    key: "getMxCells",
    value: function getMxCells() {
      return this.graph.getModel().cells;
    }
    /**
     * Return value of id or value of mxcell
     *
     * @param {string} prop - "id"|"value"
     * @param {mxCell} mxcell
     * @memberof XGraph
     */

  }, {
    key: "getValuePropOfMxCell",
    value: function getValuePropOfMxCell(prop, mxcell) {
      if (prop === "id") return this.getId(mxcell);
      if (prop === "value") return this.getLabel(mxcell);
      return null;
    } // NOT USED
    // findCurrentMxCells(prop, pattern) {
    //   const cells = [];
    //   _.each(this.getMxCells(), mxcell => {
    //     if (prop === 'id') {
    //       const id = mxcell.getId();
    //       if (u.matchString(id, pattern)) cells.push(mxcell);
    //     } else if (prop === 'value') {
    //       const value = this.getLabel(mxcell);
    //       if (u.matchString(value, pattern)) cells.push(mxcell);
    //     }
    //   });
    //   return cells;
    // }

  }, {
    key: "getStyleCell",
    value: function getStyleCell(mxcell, style) {
      var state = this.graph.view.getState(mxcell);
      return state.style[style];
    }
  }, {
    key: "setStyleCell",
    value: function setStyleCell(mxcell, style, color) {
      this.graph.setCellStyles(style, color, [mxcell]);
    } // eslint-disable-next-line class-methods-use-this

    /**
     *Return Label/value of mxcell
     *
     * @param {mxCell} mxcell
     * @returns
     * @memberof XGraph
     */

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
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "setValueCell",
    value: function setValueCell(mxcell, text) {
      if (mxUtils.isNode(mxcell.value)) {
        var label = mxcell.value.setAttribute('label', text);
      } else mxcell.setValue(text);
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
    } //
    // GRAPH HANDLER
    //

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

      if (this.graph.isZoomWheelEvent(evt)) {
        var rect = evt.target.getBoundingClientRect();
        var x = evt.offsetX - evt.currentTarget.offsetLeft;
        var y = evt.offsetY - evt.currentTarget.offsetTop;

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
      if (!mxEvent.isConsumed(evt) && evt.keyCode == 27
      /* Escape */
      ) {
          this.cumulativeZoomFactor = 1;

          if (this.graph) {
            this.graph.zoomActual();
            this.refreshGraph(this.width, this.height);
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
    key: "lazyZoomCell",
    value: function lazyZoomCell(mxcell) {
      u.log(1, 'XGraph.lazyZoomPointer() mxcell', mxcell);
      u.log(0, 'XGraph.lazyZoomPointer() mxcellState', this.graph.view.getState(mxcell));

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
  }]);

  return XGraph;
}();

exports["default"] = XGraph;
