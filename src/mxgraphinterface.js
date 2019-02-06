var mxgraph = require("mxgraph")({
  mxImageBasePath: "/public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/src/images",
  mxBasePath: "/public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist",

});

// for global calls
// mxGraph = mxgraph.mxGraph;
// mxShape = mxgraph.mxShape;
// mxConnectionConstraint = mxgraph.mxConnectionConstraint;
// mxPoint = mxgraph.mxPoint;
// mxPolyline = mxgraph.mxPolyline;
// mxEvent = mxgraph.mxEvent;
// mxRubberband = mxgraph.mxRubberband;
// mxCellState = mxgraph.mxCellState;
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


class Mx {
  constructor(container) {
    console.log("Mx.constructor");
    // this._container = container;
    // this._mxGraph = mxgraph.mxGraph;
    // this._mxShape = mxgraph.mxShape;
    // this._mxConnectionConstraint = mxgraph.mxConnectionConstraint;
    // this._mxPoint = mxgraph.mxPoint;
    // this._mxPolyline = mxgraph.mxPolyline;
    // this._mxEvent = mxgraph.mxEvent;
    // this._mxRubberband = mxgraph.mxRubberband;
    // this._mxCellState = mxgraph.mxCellState;
    this.init();
  }

  init() {
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
  draw() {
    console.log("Mx.draw");
    var container = this._container;
    // Disables the built-in context menu
    //mxEvent.disableContextMenu(container);

    // Creates the graph inside the given container
    var graph = new mxGraph(container);

    // Enables rubberband selection
    new mxRubberband(graph);

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    var parent = graph.getDefaultParent();

    // Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    try {
      var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
      var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
      var e1 = graph.insertEdge(parent, null, '', v1, v2);
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }

  }
}

export default Mx;
