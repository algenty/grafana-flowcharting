import _ from 'lodash';

window.mxLanguages = window.mxLanguages || ['en'];

var mxgraph = require("mxgraph")({
  mxImageBasePath: "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/src/images",
  mxBasePath: "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist",
  mxLoadStylesheets: false,
  mxLanguage: 'en',
  mxLoadResources: false
});
var sanitizer = require("sanitizer");

window.BASE_PATH = window.BASE_PATH || 'public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist/';
window.RESOURCES_PATH = window.BASE_PATH || window.BASE_PATH + 'resources';
window.RESOURCE_BASE = window.RESOURCE_BASE || window.RESOURCES_PATH + '/grapheditor';
window.STENCIL_PATH = window.STENCIL_PATH || window.BASE_PATH + 'stencils';
window.IMAGE_PATH = window.IMAGE_PATH || window.BASE_PATH + 'images';
window.STYLE_PATH = window.STYLE_PATH || window.BASE_PATH + 'styles';
window.CSS_PATH = window.CSS_PATH || window.BASE_PATH + 'styles';
window.mxLanguages = window.mxLanguages || ['en'];

// Put to global vars to work
window.mxActor = window.mxActor || mxgraph.mxActor
window.mxArrow = window.mxArrow || mxgraph.mxArrow
window.mxArrowConnector = window.mxArrowConnector || mxgraph.mxArrowConnector
window.mxCell = window.mxCell || mxgraph.mxCell
window.mxCellEditor = window.mxCellEditor || mxgraph.mxCellEditor
window.mxCellHighlight = window.mxCellHighlight || mxgraph.mxCellHighlight
window.mxCellOverlay = window.mxCellOverlay || mxgraph.mxCellOverlay
window.mxCellRenderer = window.mxCellRenderer || mxgraph.mxCellRenderer
window.mxCellState = window.mxCellState || mxgraph.mxCellState
window.mxClient = window.mxClient || mxgraph.mxClient
mxClient.mxBasePath = "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist"
mxClient.mxImageBasePath = "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/src/images"
mxClient.mxLoadResources = true
mxClient.mxLanguage = 'en'
mxClient.mxLoadStylesheets = true
window.mxCloud = window.mxCloud || mxgraph.mxCloud
window.mxCodec = window.mxCodec || mxgraph.mxCodec
window.mxCompactTreeLayout = window.mxCompactTreeLayout || mxgraph.mxCompactTreeLayout
window.mxConnectionConstraint = window.mxConnectionConstraint || mxgraph.mxConnectionConstraint
window.mxConnectionHandler = window.mxConnectionHandler || mxgraph.mxConnectionHandler
window.mxConnector = window.mxConnector || mxgraph.mxConnector
window.mxConstants = window.mxConstants || mxgraph.mxConstants
window.mxConstraintHandler = window.mxConstraintHandler || mxgraph.mxConstraintHandler
window.mxCylinder = window.mxCylinder || mxgraph.mxCylinder
window.mxDefaultKeyHandler = window.mxDefaultKeyHandler || mxgraph.mxDefaultKeyHandler
window.mxDefaultPopupMenu = window.mxDefaultPopupMenu || mxgraph.mxDefaultPopupMenu
window.mxDefaultToolbar = window.mxDefaultToolbar || mxgraph.mxDefaultToolbar
window.mxDivResizer = window.mxDivResizer || mxgraph.mxDivResizer
window.mxDoubleEllipse = window.mxDoubleEllipse || mxgraph.mxDoubleEllipse
window.mxDragSource = window.mxDragSource || mxgraph.mxDragSource
window.mxEdgeStyle = window.mxEdgeStyle || mxgraph.mxEdgeStyle
window.mxEdgeHandler = window.mxEdgeHandler || mxgraph.mxEdgeHandler
window.mxEditor = window.mxEditor || mxgraph.mxEditor
window.mxElbowEdgeHandler = window.mxElbowEdgeHandler || mxgraph.mxElbowEdgeHandler
window.mxEllipse = window.mxEllipse || mxgraph.mxEllipse
window.mxEvent = window.mxEvent || mxgraph.mxEvent
window.mxGeometry = window.mxGeometry || mxgraph.mxGeometry
window.mxGraph = window.mxGraph || mxgraph.mxGraph
window.mxGraphHandler = window.mxGraphHandler || mxgraph.mxGraphHandler
window.mxGraphModel = window.mxGraphModel || mxgraph.mxGraphModel
window.mxGraphView = window.mxGraphView || mxgraph.mxGraphView
window.mxGuide = window.mxGuide || mxgraph.mxGuide
window.mxHexagon = window.mxHexagon || mxgraph.mxHexagon
window.mxHandle = window.mxHandle || mxgraph.mxHandle
window.mxImage = window.mxImage || mxgraph.mxImage
window.mxImageShape = window.mxImageShape || mxgraph.mxImageShape
window.mxKeyHandler = window.mxKeyHandler || mxgraph.mxKeyHandler
window.mxLabel = window.mxLabel || mxgraph.mxLabel
window.mxLayoutManager = window.mxLayoutManager || mxgraph.mxLayoutManager
window.mxLine = window.mxLine || mxgraph.mxLine
window.mxMarker = window.mxMarker || mxgraph.mxMarker
window.mxOutline = window.mxOutline || mxgraph.mxOutline
window.mxPanningHandler = window.mxPanningHandler || mxgraph.mxPanningHandler
window.mxPerimeter = window.mxPerimeter || mxgraph.mxPerimeter
window.mxPoint = window.mxPoint || mxgraph.mxPoint
window.mxPolyline = window.mxPolyline || mxgraph.mxPolyline
window.mxPopupMenu = window.mxPopupMenu || mxgraph.mxPopupMenu
window.mxPopupMenuHandler = window.mxPopupMenuHandler || mxgraph.mxPopupMenuHandler
window.mxPrintPreview = window.mxPrintPreview || mxgraph.mxPrintPreview
window.mxRectangle = window.mxRectangle || mxgraph.mxRectangle
window.mxRectangleShape = window.mxRectangleShape || mxgraph.mxRectangleShape
window.mxResources = window.mxResources || mxgraph.mxResources
window.mxRhombus = window.mxRhombus || mxgraph.mxRhombus
window.mxRubberband = window.mxRubberband || mxgraph.mxRubberband
window.mxShape = window.mxShape || mxgraph.mxShape
window.mxStencil = window.mxStencil || mxgraph.mxStencil
window.mxStencilRegistry = window.mxStencilRegistry || mxgraph.mxStencilRegistry
window.mxStylesheet = window.mxStylesheet || mxgraph.mxStylesheet
window.mxStyleRegistry = window.mxStyleRegistry || mxgraph.mxStyleRegistry
window.mxSvgCanvas2D = window.mxSvgCanvas2D || mxgraph.mxSvgCanvas2D
window.mxSwimlane = window.mxSwimlane || mxgraph.mxSwimlane
window.mxText = window.mxText || mxgraph.mxText
window.mxToolbar = window.mxToolbar || mxgraph.mxToolbar
window.mxTriangle = window.mxTriangle || mxgraph.mxTriangle
window.mxUndoManager = window.mxUndoManager || mxgraph.mxUndoManager
window.mxUtils = window.mxUtils || mxgraph.mxUtils
window.mxValueChange = window.mxValueChange || mxgraph.mxValueChange
window.mxVertexHandler = window.mxVertexHandler || mxgraph.mxVertexHandler



export default class MxPluginCtrl {

  /** @ngInject */
  constructor($scope, elem, attrs, ctrl) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.$graphCanvas;
    this.container;
    this.$elem = elem.find('.flowchart-panel__chart');
    this.graph;
    this.style = [];

    // Static
    this.STYLE_FILLCOLOR = mxConstants.STYLE_FILLCOLOR;
    this.STYLE_FONTCOLOR = mxConstants.STYLE_FONTCOLOR;
    this.STYLE_STROKECOLOR = mxConstants.STYLE_STROKECOLOR;

    this.initFlowchart();

    // Events Render
    // this.render = self.render.bind(this);
    ctrl.events.on('render', () => {
      this.render();
    });

  }


  // ####################################### FLOWCHART #############################################

  //
  // INIT
  //
  initFlowchart() {
    console.debug("mxgraph.initFlowChart");

    // definie object graph
    this.$graphCanvas = $('<div></div>');
    this.$elem.html(this.$graphCanvas);
    this.$graphCanvas.bind("plothover", function (event, pos, item) {
      if (!item) {
        $tooltip.detach();
        return;
      }
    });

    var Graph = require("./Graph")({
      touch: '1',
      libs: 'arrows;basic;bpmn;flowchart',
    })
    var Shapes = require("./Shapes")

    this.container = this.$graphCanvas[0];
    this.graph = new Graph(this.container);

  }

  //
  // ADD OR REPLACE GRAPH
  //
  addFlowchart() {
    console.debug("mxgraph.addFlowChart");

    this.graph.getModel().beginUpdate();
    this.graph.getModel().clear();
    try {
      var xmlDoc = mxUtils.parseXml(this.panel.flowchart.source.xml.value);
      var codec = new mxCodec(xmlDoc);
      codec.decode(xmlDoc.documentElement, this.graph.getModel());
    } catch {
      //TODO:

    } finally {
      // Updates the display
      this.graph.getModel().endUpdate();
    }

  }

  //
  // REFRESH GRAPH
  //
  refreshFlowChart() {
    console.debug("mxgraph.refreshFlowChart");
    let container = this.$graphCanvas[0]
    var width = this.$elem.width();
    var height = this.panelCtrl.height;
    var size = Math.min(width, height);


    // For center Graph
    var graphCss = {
      margin: 'auto',
      position: 'relative',
      paddingBottom: 20 + 'px',
      height: size + 'px'
    };

    this.$graphCanvas.css(graphCss);

    // LOCK
    if (this.panel.flowchart.options.lock) {
      // Disables folding
      this.graph.setEnabled(false);
      this.graph.isCellFoldable = function (cell, collapse) {
        return false;
      };
    }

    // GRID
    if (this.panel.flowchart.options.grid) {
      this.container.style.backgroundImage = "url('" + IMAGE_PATH + "/grid.gif')";
    } else {
      this.container.style.backgroundImage = '';
    }

    // Zoom
    if (this.panel.flowchart.options.zoom || this.panel.flowchart.options.zoom.length > 0 || this.panel.flowchart.options.zoom != '100%' || this.panel.flowchart.options.zoom != '0%') {
      let scale = _.replace(this.panel.flowchart.options.zoom, '%', '') / 100;
      this.graph.zoomTo(scale, true)
    } else {
      if (!this.panel.flowchart.options.scale) graph.zoomActual();
    }

    // Fit/scale
    if (this.panel.flowchart.options.scale) {
      this.graph.fit();
      this.graph.view.rendering = true;
    }

    // CENTER
    if (this.panel.flowchart.options.center) {
      this.graph.center(true, true);
    } else {
      this.graph.center(false, false);
    }

    // BG Color
    if (this.panel.flowchart.options.bgColor) {
      this.$elem.css('background-color', this.panel.flowchart.options.bgColor);
    } else {
      this.$elem.css('background-color', '');
    }

    // REFRESH GRAPH
    this.graph.refresh();

  }

  //
  // inspect Flowchart
  // 
  inspectFlowchart() {
    let model = this.graph.getModel()
    let view = this.graph.view;
    let cells = model.cells;
    this.panelCtrl.graph = this.graph;
    this.panelCtrl.cells.columns = [{
        title: "Id",
        desc: "Id of the cell",
      },
      {
        title: "value",
        desc: "Value of the cell",
      },
      {
        title: "Geometry",
        desc: "Represent the geometry of a cell",
      },
      {
        title: "IsEdge",
        desc: "true if the cell is an edge",
      },
      {
        title: "isConnectable",
        desc: "true if the cell is connectable"
      },
      {
        title: "state",
        desc: "State of cell"
      }
    ];

    this.panelCtrl.cells.rows = [];


    _.forEach(cells, (cell) => {
      let row = {
        id: cell.getId(),
        cell: cell,
        value: cell.getValue(),
        text: (view.getState(cell).text != null ? view.getState(cell).text.lastValue : ""),
        shape: view.getState(cell).style[mxConstants.STYLE_SHAPE],
        // mxShape : view.getState(cell).shape,
        fontColor: view.getState(cell).style[mxConstants.STYLE_FONTCOLOR],
        fillColor: view.getState(cell).style[mxConstants.STYLE_FILLCOLOR],
        strokeColor: view.getState(cell).style[mxConstants.STYLE_STROKECOLOR],
        // state : view.getState(cell),
        // style: cell.getStyle(),
        isEdge: cell.isEdge(),
        isVertex: cell.isVertex(),
        thresholdLevel:0,
      }
      this.panelCtrl.cells.rows.push(row);
      // console.log("cell "+cell.getId() ,row)
    })
  }
  //
  // EVENTS
  //
  selectCell(id) {
    let model = this.graph.getModel()
    let cell = model.getCell(id)
    this.graph.setSelectionCell(cell);
  }

  unselectCell() {
    this.graph.clearSelection();
  }

  //
  // Functions
  //

  changeState(id, color, style) {
    if (style) {
      let cell = this.graph.getModel().getCell(id)
      if (cell) {
        this.graph.setCellStyles(style, color, [cell]);
      }
    }
  }

  restoreState(id) {
    let cell = this.graph.getModel().getCell(id)
    let old = _.find(this.panelCtrl.cells.rows, {
      'id': id
    })
    if (old) {
      this.graph.setCellStyles(this.STYLE_FILLCOLOR, old.fillColor, [cell]);
      this.graph.setCellStyles(this.STYLE_FONTCOLOR, old.fontColor, [cell]);
      this.graph.setCellStyles(this.STYLE_STROKECOLOR, old.strokeColor, [cell]);
    }
  }

  // ###################################################################################################

  //
  // RENDER
  //

  render() {
    if (!this.panelCtrl.data) {
      return;
    }
    let data = this.panelCtrl.data;

    if (this.panelCtrl.changedSource == true) {
      this.panelCtrl.changedSource = false;
      this.addFlowchart();
      this.inspectFlowchart();
      this.refreshFlowChart();
    } else {
      this.refreshFlowChart();
    }
  }

  noDataPoints() {
    var html = '<div class="datapoints-warning"><span class="small">No data points</span></div>';
    this.$elem.html(html);
  }
}