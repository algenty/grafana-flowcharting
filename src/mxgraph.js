// window.mxBasePath = window.mxBasePath || "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist";
// window.mxImageBasePath = mxImageBasePath || "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist";
// window.mxLanguage = window.mxLanguage || urlParams['lang'];
window.mxLanguages = window.mxLanguages || ['en'];

var mxgraph = require("mxgraph")({
  mxImageBasePath: "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/src/images",
  mxBasePath: "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist",
  mxLoadStylesheets: false,
  mxLanguage: 'en',
  mxLoadResources: true
});

window.BASE_PATH = window.BASE_PATH || 'public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist/';
window.RESOURCES_PATH = window.BASE_PATH || window.BASE_PATH + 'resources';
window.RESOURCE_BASE = window.RESOURCE_BASE || window.RESOURCES_PATH + '/grapheditor';
window.STENCIL_PATH = window.STENCIL_PATH || window.BASE_PATH + 'stencils';
window.IMAGE_PATH = window.IMAGE_PATH || window.BASE_PATH + 'images';
window.STYLE_PATH = window.STYLE_PATH || window.BASE_PATH + 'styles';
window.CSS_PATH = window.CSS_PATH || window.BASE_PATH + 'styles';
window.mxLanguages = window.mxLanguages || ['en'];

// Put to global vars to work
window.mxCell = window.mxCell || mxgraph.mxCell
window.mxCellEditor = window.mxCellEditor || mxgraph.mxCellEditor
window.mxCellHighlight = window.mxCellHighlight || mxgraph.mxCellHighlight
window.mxCellOverlay = window.mxCellOverlay || mxgraph.mxCellOverlay
window.mxCellRenderer = window.mxCellRenderer || mxgraph.mxCellRenderer
window.mxCellState = window.mxCellState || mxgraph.mxCellState
window.mxClient = window.mxClient || mxgraph.mxClient
window.mxCodec = window.mxCodec || mxgraph.mxCodec
window.mxCompactTreeLayout = window.mxCompactTreeLayout || mxgraph.mxCompactTreeLayout
window.mxConnectionConstraint = window.mxConnectionConstraint || mxgraph.mxConnectionConstraint
window.mxConnectionHandler = window.mxConnectionHandler || mxgraph.mxConnectionHandler
window.mxConnector = window.mxConnector || mxgraph.mxConnector
window.mxConstants = window.mxConstants || mxgraph.mxConstants
window.mxConstraintHandler = window.mxConstraintHandler || mxgraph.mxConstraintHandler
window.mxDefaultKeyHandler = window.mxDefaultKeyHandler || mxgraph.mxDefaultKeyHandler
window.mxDefaultPopupMenu = window.mxDefaultPopupMenu || mxgraph.mxDefaultPopupMenu
window.mxDefaultToolbar = window.mxDefaultToolbar || mxgraph.mxDefaultToolbar
window.mxDivResizer = window.mxDivResizer || mxgraph.mxDivResizer
window.mxEdgeStyle = window.mxEdgeStyle || mxgraph.mxEdgeStyle
window.mxEdgeHandler = window.mxEdgeHandler || mxgraph.mxEdgeHandler 
window.mxEditor = window.mxEditor || mxgraph.mxEditor
window.mxEvent = window.mxEvent || mxgraph.mxEvent
window.mxGeometry = window.mxGeometry || mxgraph.mxGeometry
window.mxGraph = window.mxGraph || mxgraph.mxGraph
window.mxGraphHandler = window.mxGraphHandler || mxgraph.mxGraphHandler
window.mxGraphModel = window.mxGraphModel || mxgraph.mxGraphModel
window.mxGraphView = window.mxGraphView || mxgraph.mxGraphView
window.mxGuide = window.mxGuide || mxgraph.mxGuide
window.mxImage = window.mxImage || mxgraph.mxImage
window.mxKeyHandler = window.mxKeyHandler || mxgraph.mxKeyHandler
window.mxLabel = window.mxLabel || mxgraph.mxLabel
window.mxOutline = window.mxOutline || mxgraph.mxOutline
window.mxPanningHandler = window.mxPanningHandler || mxgraph.mxPanningHandler
window.mxPoint = window.mxPoint || mxgraph.mxPoint
window.mxPolyline = window.mxPolyline || mxgraph.mxPolyline
window.mxPopupMenu = window.mxPopupMenu || mxgraph.mxPopupMenu
window.mxPrintPreview = window.mxPrintPreview || mxgraph.mxPrintPreview
window.mxRectangle = window.mxRectangle || mxgraph.mxRectangle
window.mxResources = window.mxResources || mxgraph.mxResources
window.mxRubberband = window.mxRubberband || mxgraph.mxRubberband
window.mxShape = window.mxShape || mxgraph.mxShape
window.mxStencil = window.mxStencil || mxgraph.mxStencil
window.mxStencilRegistry = window.mxStencilRegistry || mxgraph.mxStencilRegistry
window.mxStylesheet = window.mxStylesheet || mxgraph.mxStylesheet
window.mxSvgCanvas2D = window.mxSvgCanvas2D || mxgraph.mxSvgCanvas2D
window.mxText = window.mxText || mxgraph.mxText
window.mxToolbar = window.mxToolbar || mxgraph.mxToolbar
window.mxUndoManager = window.mxUndoManager || mxgraph.mxUndoManager
window.mxUtils = window.mxUtils || mxgraph.mxUtils
window.mxVertexHandler = window.mxVertexHandler || mxgraph.mxVertexHandler

export default function link(scope, elem, attrs, ctrl) {
  var data;
  var panel = ctrl.panel;
  var $root = elem;
  var $elem = elem.find('.flowchart-panel__chart');
  var graph;
  var $graphCanvas;
  var container;
  var themes;
  var $parent;

  // ########################################  MAIN  ###############################################
  initFlowchart();

  // Events Render
  ctrl.events.on('render', function () {
    render();
  });

  // ########################################  OVERRITE MXGRAPH ####################################


  // ####################################### FLOWCHART #############################################

  //
  // INIT
  //
  function initFlowchart() {
    console.debug("mxgraph.initFlowChart");
    // Overridden to define per-shape connection points
    mxGraph.prototype.getAllConnectionConstraints = function (terminal, source) {
      if (terminal != null && terminal.shape != null) {
        if (terminal.shape.stencil != null) {
          if (terminal.shape.stencil != null) {
            return terminal.shape.stencil.constraints;
          }
        } else if (terminal.shape.constraints != null) {
          return terminal.shape.constraints;
        }
      }
      return null;
    }

    var Graph = require("./Graph")

    // definie object graph

    $graphCanvas = $('<div></div>');
    $elem.html($graphCanvas);
    $graphCanvas.bind("plothover", function (event, pos, item) {
      if (!item) {
        $tooltip.detach();
        return;
      }
    });

    container = $graphCanvas[0];
    graph = new mxGraph(container);

    // styles and stencils
    //loadStyle(graph);
    // loadSpencils();

    // overrite function to compatibility with draw.io
    //TODO:

  }

  //
  // ADD OR REPLACE GRAPH
  //
  function addFlowchart() {
    console.debug("mxgraph.addFlowChart");

    graph.getModel().beginUpdate();
    graph.getModel().clear();
    try {
      var xmlDoc = mxUtils.parseXml(ctrl.panel.flowchart.source.xml.value);
      var codec = new mxCodec(xmlDoc);
      codec.decode(xmlDoc.documentElement, graph.getModel());
    } catch {
      console.error("Error Graph")

    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }

  }

  //
  // REFRESH GRAPH
  //
  function refreshFlowChart() {
    console.debug("mxgraph.refreshFlowChart");
    let container = $graphCanvas[0]
    var width = $elem.width();
    var height = ctrl.height;
    var size = Math.min(width, height);


    // For center Graph
    var graphCss = {
      margin: 'auto',
      position: 'relative',
      paddingBottom: 20 + 'px',
      height: size + 'px'
    };
    $graphCanvas.css(graphCss);

    // LOCK
    if (ctrl.panel.flowchart.options.lock) {
      // Disables folding
      graph.setEnabled(false);
      graph.isCellFoldable = function (cell, collapse) {
        return false;
      };
    }

    // GRID
    if (ctrl.panel.flowchart.options.grid) {
      container.style.backgroundImage = "url('" + IMAGE_PATH + "/grid.gif')";
    } else {
      container.style.backgroundImage = '';
    }

    // Zoom
    if (ctrl.panel.flowchart.options.zoom || ctrl.panel.flowchart.options.zoom.length > 0 || ctrl.panel.flowchart.options.zoom != '100%' || ctrl.panel.flowchart.options.zoom != '0%' || ctrl.validatePercent(ctrl.panel.flowchart.options.zoom)) {
      let scale = _.replace(ctrl.panel.flowchart.options.zoom, '%', '') / 100;
      graph.zoomTo(scale, true)
    } else {
      if (!ctrl.panel.flowchart.options.scale) graph.zoomActual();
    }

    // Fit/scale
    if (ctrl.panel.flowchart.options.scale) {
      graph.fit();
      graph.view.rendering = true;
    }

    // CENTER
    if (ctrl.panel.flowchart.options.center) {
      graph.center(true, true);
    } else {
      graph.center(false, false);
    }

    // BG Color
    if (ctrl.panel.flowchart.options.bgColor) {
      $elem.css('background-color', ctrl.panel.flowchart.options.bgColor);
    } else {
      $elem.css('background-color', '');
    }

    // REFRESH GRAPH
    graph.refresh();

    // DATAS
    // var options = {
    //   series: {
    //     chart: {
    //       show: true,
    //       stroke: {
    //         color: backgroundColor,
    //         width: parseFloat(ctrl.panel.strokeWidth).toFixed(1)
    //       },
    //       highlight: {
    //         opacity: 0.0
    //       },
    //       combine: {
    //         threshold: ctrl.panel.combine.threshold,
    //         label: ctrl.panel.combine.label
    //       }
    //     }
    //   },
    // };

    // data = ctrl.data;

    // for (let i = 0; i < data.length; i++) {
    //   let series = data[i];

    //   // if hidden remove points
    //   if (ctrl.hiddenSeries[series.label]) {
    //     series.data = {};
    //   }
    // }

  }

  //
  // inspect Flowchart
  // 
  function inspectFlowchart() {
    let model = graph.getModel()
    let cells = model.cells;
    ctrl.graph = graph;
    ctrl.cells.columns = [{
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
      }
    ];

    ctrl.cells.rows = [];

    _.forEach(cells, function (element) {
      let row = {
        id: element.getId(),
        value: element.getValue(),
        style: element.getStyle(),
        isedge: element.isEdge(),
        isConnectable: element.isConnectable(),
        isVertex: element.isVertex(),
      }
      ctrl.cells.rows.push(row);
    })
  }

  var selectCell = function (id) {
    let model = graph.getModel()
    let cell = model.getCell(id)
    if (cell.isVertex()) {
      graph.setTooltips(true);
      graph.setSelectionCell(cell);
    }
  }

  var unselectCell = function (id) {
    graph.setTooltips(false);
  }


  function loadStyle() {
    var node = mxUtils.load(STYLE_PATH + '/default.xml').getDocumentElement();
    if (node != null) {
      var dec = new mxCodec(node.ownerDocument);
      dec.decode(node, graph.getStylesheet());
    }
  }

  function loadSpencils() {
    var stencils = ['basic', 'arrows', 'flowchart', 'bpmn'];
    stencils.forEach(element => {
      var node = mxUtils.load(STENCIL_PATH + "/" + element + '.xml').getDocumentElement();
      var shape = node.firstChild;
      while (shape != null) {
        if (shape.nodeType == mxConstants.NODETYPE_ELEMENT) {
          mxStencilRegistry.addStencil(shape.getAttribute('name'), new mxStencil(shape));
        }
        shape = shape.nextSibling;
      }

    });

  }

  // ###################################################################################################

  //
  // RENDER
  //

  function render() {
    if (!ctrl.data) {
      return;
    }
    data = ctrl.data;

    if (ctrl.changedSource == true) {
      ctrl.changedSource = false;
      addFlowchart();
      inspectFlowchart();
      refreshFlowChart();
    } else {
      refreshFlowChart();
    }


  }

  function noDataPoints() {
    var html = '<div class="datapoints-warning"><span class="small">No data points</span></div>';
    $elem.html(html);
  }
}