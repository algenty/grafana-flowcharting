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

// import BASIC from '/bower_components/mxgraph/javascript/examples/grapheditor/www/stencils/basic.xml';
// import BPMN from '/bower_components/mxgraph/javascript/examples/grapheditor/www/stencils//bpmn.xml';
// import ARROWS from '/bower_components/mxgraph/javascript/examples/grapheditor/www/stencils//arrows.xml';
// import FLOWCHART from '/bower_components/mxgraph/javascript/examples/grapheditor/www/stencils/flowchart.xml';
// import GENERAL from '/bower_components/mxgraph/javascript/examples/grapheditor/www/stencils/general.xml';

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
window.mxCellOverlay = window.mxCellOverlay || mxgraph.mxCellOverlay
window.mxCellRenderer = window.mxCellRenderer || mxgraph.mxCellRenderer
window.mxCellState = window.mxCellState || mxgraph.mxCellState
window.mxClient = window.mxClient || mxgraph.mxClient
window.mxCodec = window.mxCodec || mxgraph.mxCodec
window.mxCompactTreeLayout = window.mxCompactTreeLayout || mxgraph.mxCompactTreeLayout
window.mxConnectionConstraint = window.mxConnectionConstraint || mxgraph.mxConnectionConstraint
window.mxConstants = window.mxConstants || mxgraph.mxConstants
window.mxDefaultKeyHandler = window.mxDefaultKeyHandler || mxgraph.mxDefaultKeyHandler
window.mxDefaultPopupMenu = window.mxDefaultPopupMenu || mxgraph.mxDefaultPopupMenu
window.mxDefaultToolbar = window.mxDefaultToolbar || mxgraph.mxDefaultToolbar
window.mxDivResizer = window.mxDivResizer || mxgraph.mxDivResizer
window.mxEdgeStyle = window.mxEdgeStyle || mxgraph.mxEdgeStyle
window.mxEditor = window.mxEditor || mxgraph.mxEditor
window.mxEvent = window.mxEvent || mxgraph.mxEvent
window.mxGeometry = window.mxGeometry || mxgraph.mxGeometry
window.mxGraph = window.mxGraph || mxgraph.mxGraph
window.mxGraphModel = window.mxGraphModel || mxgraph.mxGraphModel
window.mxGraphView = window.mxGraphView || mxgraph.mxGraphView
window.mxImage = window.mxImage || mxgraph.mxImage
window.mxKeyHandler = window.mxKeyHandler || mxgraph.mxKeyHandler
window.mxLabel = window.mxLabel || mxgraph.mxLabel
window.mxOutline = window.mxOutline || mxgraph.mxOutline
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
window.mxToolbar = window.mxToolbar || mxgraph.mxToolbar
window.mxUndoManager = window.mxUndoManager || mxgraph.mxUndoManager
window.mxUtils = window.mxUtils || mxgraph.mxUtils
window.mxVertexHandler = window.mxVertexHandler || mxgraph.mxVertexHandler

export default function link(scope, elem, attrs, ctrl) {
  var data;
  var panel = ctrl.panel;
  elem = elem.find('.flowchart-panel__chart');
  var themes;

  init();

  ctrl.events.on('render', function () {
    if (panel.legendType === 'Right side') {
      render(false);
      setTimeout(function () { render(true); }, 50);
    } else {
      render(true);
    }
  });

  function noDataPoints() {
    var html = '<div class="datapoints-warning"><span class="small">No data points</span></div>';
    elem.html(html);
  }

  function addFlowChart() {
    var width = elem.width();
    var height = ctrl.height; // - getLegendHeight(ctrl.height);

    var size = Math.min(width, height);

    var $graphCanvas = $('<div></div>');

    // Center Graph
    var graphCss = {
      margin: 'auto',
      position: 'relative',
      paddingBottom: 20 + 'px',
      height: size + 'px'
    };

    $graphCanvas.css(graphCss);

    var backgroundColor = $('body').css('background-color')

    var options = {
      series: {
        chart: {
          show: true,
          stroke: {
            color: backgroundColor,
            width: parseFloat(ctrl.panel.strokeWidth).toFixed(1)
          },
          highlight: {
            opacity: 0.0
          },
          combine: {
            threshold: ctrl.panel.combine.threshold,
            label: ctrl.panel.combine.label
          }
        }
      },
    };

    data = ctrl.data;

    for (let i = 0; i < data.length; i++) {
      let series = data[i];

      // if hidden remove points
      if (ctrl.hiddenSeries[series.label]) {
        series.data = {};
      }
    }

    elem.html($graphCanvas);
    draw($graphCanvas[0])
    $graphCanvas.bind("plothover", function (event, pos, item) {
      if (!item) {
        $tooltip.detach();
        return;
      }

    });
  }

  function render() {
    if (!ctrl.data) { return; }

    data = ctrl.data;

    if (0 == ctrl.data.length) {
      noDataPoints();
    } else {
      addFlowChart();
    }

  }

  //
  // DRAW
  //
  function draw(container) {

    mxEvent.disableContextMenu(container);
    let graph = new mxGraph(container);

    //
    // LOAD STYLES ET STENCIL
    //
    loadStyle(graph);
    // loadSpencils();

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    var parent = graph.getDefaultParent();


    if (ctrl.panel.flowchart.options.lock) {
      // Disables folding
      graph.setEnabled(false);
      graph.isCellFoldable = function (cell, collapse) {
        return false;
      };
    }


    // grid
    if (ctrl.panel.flowchart.options.grid) {
      container.style.backgroundImage = "url('"+ IMAGE_PATH +"/grid.gif')";
    }
    else {
      container.style.backgroundImage = '';
    }

    graph.getModel().beginUpdate();
    try {
      var xmlDoc = mxUtils.parseXml(ctrl.panel.flowchart.source.xml.value);
      var codec = new mxCodec(xmlDoc);
      codec.decode(xmlDoc.documentElement, graph.getModel());
    }
    catch {
      console.error("Error Graph")
      //TODO:
    } finally {
      // Updates the display 
      graph.getModel().endUpdate();


      // Zoom
      if (ctrl.panel.flowchart.options.zoom || ctrl.panel.flowchart.options.zoom.length > 0 || ctrl.panel.flowchart.options.zoom != '100%' || ctrl.panel.flowchart.options.zoom != '0%' || ctrl.validatePercent(ctrl.panel.flowchart.options.zoom)) {
        let scale = _.replace(ctrl.panel.flowchart.options.zoom, '%', '') / 100;
        graph.zoomTo(scale, true)
      }
      else {
        if (!ctrl.panel.flowchart.options.scale) graph.zoomActual();
      }

      // Fit/scale
      // https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph.mxGraph
      if (ctrl.panel.flowchart.options.scale) {
        graph.fit();
        graph.view.rendering = true;
        graph.refresh();
      }

      // ne fonctionne pas : chercher dans API la fonction
      // https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph.fit
      if (ctrl.panel.flowchart.options.center) {
        //graph.resizeContainer = true;
        graph.center(true, true);
      }
      else {
        graph.center(false, false);
      }

    }


  }


  //
  // INIT
  //
  function init() {

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
    };

    /**
     * Sets global constants.
     */
    // Changes default colors
    mxConstants.SHADOW_OPACITY = 0.25;
    mxConstants.SHADOWCOLOR = '#000000';
    mxConstants.VML_SHADOWCOLOR = '#d0d0d0';
    mxGraph.pageBreakColor = '#c0c0c0';
    mxGraph.pageScale = 1;

    // Keeps edges between relative child cells inside parent
    mxGraphModel.ignoreRelativeEdgeParent = false;

    // UrlParams is null in embed mode
    mxGraphView.gridColor = '#e0e0e0';

    // Hook for custom constraints
    mxShape.prototype.getConstraints = function (style) {
      return null;
    };

    // Adds required resources (disables loading of fallback properties, this can only
    // be used if we know that all keys are defined in the language specific file)

    // mxResources.loadDefaultBundle = false;
    // // var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) || mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);
    // var bundle = RESOURCE_BASE + '.txt'

    // // Fixes possible asynchronous requests
    // mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function (xhr) {
    //   // Adds bundle text to resources
    //   mxResources.parse(xhr[0].getText());

    //   // Configures the default graph theme
    //   var themes = new Object();
    //   themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

    //   // Main
    //   new EditorUi(new Editor(urlParams['chrome'] == '0', themes));
    // }, function () {
    //   document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
    // });


  }

  function loadStyle(graph) {
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
}