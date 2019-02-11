import { debug } from "util";

var mxgraph = require("mxgraph")({
  mxImageBasePath: "/public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/src/images",
  mxBasePath: "/public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist",

});

// Put to global vars to work
window.mxGraph = mxgraph.mxGraph
window.mxShape = mxgraph.mxShape
window.mxConnectionConstraint = mxgraph.mxConnectionConstraint
window.mxPoint = mxgraph.mxPoint
window.mxPolyline = mxgraph.mxPolyline
window.mxEvent = mxgraph.mxEvent
window.mxRubberband = mxgraph.mxRubberband
window.mxCellState = mxgraph.mxCellState
window.mxClient = mxgraph.mxClient
window.mxUtils = mxgraph.mxUtils
window.mxConstants = mxgraph.mxConstants
window.mxPopupMenu = mxgraph.mxPopupMenu
window.mxDefaultPopupMenu = mxgraph.mxDefaultPopupMenu
window.mxEditor = mxgraph.mxEditor
window.mxGraphModel = mxgraph.mxGraphModel
window.mxGraphView = mxgraph.mxGraphView
window.mxToolbar = mxgraph.mxToolbar
window.mxDefaultToolbar = mxgraph.mxDefaultToolbar
window.mxGeometry = mxgraph.mxGeometry
window.mxKeyHandler = mxgraph.mxKeyHandler
window.mxDefaultKeyHandler = mxgraph.mxDefaultKeyHandler
window.mxVertexHandler = mxgraph.mxVertexHandler
window.mxStylesheet = mxgraph.mxStylesheet
window.mxCellRenderer = mxgraph.mxCellRenderer
window.mxCell = mxgraph.mxCell
window.mxCodec = mxgraph.mxCodec
window.mxDivResizer = mxgraph.mxDivResizer
window.mxOutline = mxgraph.mxOutline
window.mxUndoManager = mxgraph.mxUndoManager
window.mxEdgeStyle = mxgraph.mxEdgeStyle
window.mxCompactTreeLayout = mxgraph.mxCompactTreeLayout
window.mxLabel = mxgraph.mxLabel
window.mxRectangle = mxgraph.mxRectangle
window.mxCellOverlay = mxgraph.mxCellOverlay
window.mxImage = mxgraph.mxImage
window.mxPrintPreview = mxgraph.mxPrintPreview

export default function link(scope, elem, attrs, ctrl) {
  var data;
  var panel = ctrl.panel;
  elem = elem.find('.flowchart-panel__chart');
  var $tooltip = $('<div id="tooltip">');

  initDraw();
  
  ctrl.events.on('render', function () {
    if (panel.legendType === 'Right side') {
      render(false);
      setTimeout(function () { render(true); }, 50);
    } else {
      render(true);
    }
  });

  function getLegendHeight(panelHeight) {
    if (!ctrl.panel.legend.show || ctrl.panel.legendType === 'Right side' || ctrl.panel.legendType === 'On graph') {
      return 20;
    }

    if (ctrl.panel.legendType == 'Under graph' && ctrl.panel.legend.percentage || ctrl.panel.legend.values) {
      let breakPoint = parseInt(ctrl.panel.breakPoint) / 100;
      var total = 23 + 20 * data.length;
      return Math.min(total, Math.floor(panelHeight * breakPoint));
    }
  }

  function formatter(label, slice) {
    var slice_data = slice.data[0][slice.data[0].length - 1];
    var decimal = 2;
    var start = "<div style='font-size:" + ctrl.panel.fontSize + ";text-align:center;padding:2px;color:" + slice.color + ";'>" + label + "<br/>";

    if (ctrl.panel.legend.percentageDecimals) {
      decimal = ctrl.panel.legend.percentageDecimals;
    }
    if (ctrl.panel.legend.values && ctrl.panel.legend.percentage) {
      return start + ctrl.formatValue(slice_data) + "<br/>" + slice.percent.toFixed(decimal) + "%</div>";
    } else if (ctrl.panel.legend.values) {
      return start + ctrl.formatValue(slice_data) + "</div>";
    } else if (ctrl.panel.legend.percentage) {
      return start + slice.percent.toFixed(decimal) + "%</div>";
    } else {
      return start + '</div>';
    }
  }

  function noDataPoints() {
    var html = '<div class="datapoints-warning"><span class="small">No data points</span></div>';
    elem.html(html);
  }

  function addFlowChart() {
    var width = elem.width();
    var height = ctrl.height - getLegendHeight(ctrl.height);

    var size = Math.min(width, height);

    var plotCanvas = $('<div></div>');
    var plotCss = {
      margin: 'auto',
      position: 'relative',
      paddingBottom: 20 + 'px',
      height: size + 'px'
    };

    plotCanvas.css(plotCss);

    var backgroundColor = $('body').css('background-color')

    var options = {
      legend: {
        show: false
      },
      series: {
        chart: {
          show: true,
          stroke: {
            color: backgroundColor,
            width: parseFloat(ctrl.panel.strokeWidth).toFixed(1)
          },
          label: {
            show: ctrl.panel.legend.show && ctrl.panel.legendType === 'On graph',
            formatter: formatter
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
      grid: {
        hoverable: true,
        clickable: false
      }
    };

    data = ctrl.data;

    for (let i = 0; i < data.length; i++) {
      let series = data[i];

      // if hidden remove points
      if (ctrl.hiddenSeries[series.label]) {
        series.data = {};
      }
    }


    if (panel.legend.sort) {
      if (ctrl.panel.valueName !== panel.legend.sort) {
        panel.legend.sort = ctrl.panel.valueName;
      }
      if (panel.legend.sortDesc === true) {
        data.sort(function (a, b) {
          return b.legendData - a.legendData;
        });
      } else {
        data.sort(function (a, b) {
          return a.legendData - b.legendData;
        });
      }
    }


    elem.html(plotCanvas);
    //TODO : add draw mxgraph
 
    draw(plotCanvas[0])
    plotCanvas.bind("plothover", function (event, pos, item) {
      if (!item) {
        $tooltip.detach();
        return;
      }

      var body;
      var percent = parseFloat(item.series.percent).toFixed(2);
      var formatted = ctrl.formatValue(item.series.data[0][1]);

      body = '<div class="flowchart-tooltip-small"><div class="flowchart-tooltip-time">';
      body += '<div class="flowchart-tooltip-value">' + item.series.label + ': ' + formatted;
      body += " (" + percent + "%)" + '</div>';
      body += "</div></div>";

      $tooltip.html(body).place_tt(pos.pageX + 20, pos.pageY);
    });
  }

  function render(incrementRenderCounter) {
    if (!ctrl.data) { return; }

    data = ctrl.data;

    if (0 == ctrl.data.length) {
      noDataPoints();
    } else {
      addFlowChart();
    }

    if (incrementRenderCounter) {
      ctrl.renderingCompleted();
    }
  }

  function draw(container) {
    mxEvent.disableContextMenu(container);
    let graph = new mxGraph(container);

    graph.getModel().beginUpdate();
    try {
			var xmlDoc = mxUtils.parseXml(ctrl.panel.content);
			var codec = new mxCodec(xmlDoc);
			codec.decode(xmlDoc.documentElement, graph.getModel());
    } finally {
      // Updates the display 
      graph.getModel().endUpdate();
    }
  }

  function initDraw() {
    mxGraph.prototype.getAllConnectionConstraints = function(terminal, source) {
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
  }
}

