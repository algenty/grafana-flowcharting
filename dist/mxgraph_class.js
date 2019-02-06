"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mxgraph = require("mxgraph")({
  mxImageBasePath: "/public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/src/images",
  mxBasePath: "/public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist"
});

var Mx =
/*#__PURE__*/
function () {
  function Mx(container) {
    _classCallCheck(this, Mx);

    this._container = container;
    this._mxGraph = mxgraph.mxGraph;
    this._mxShape = mxgraph.mxShape;
    this._mxConnectionConstraint = mxgraph.mxConnectionConstraint;
    this._mxPoint = mxgraph.mxPoint;
    this._mxPolyline = mxgraph.mxPolyline;
    this._mxEvent = mxgraph.mxEvent;
    this._mxRubberband = mxgraph.mxRubberband;
    this._mxCellState = mxgraph.mxCellState;
    this.init();
  }

  _createClass(Mx, [{
    key: "init",
    value: function init() {
      this._mxGraph.prototype.getAllConnectionConstraints = function (terminal, source) {
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
  }, {
    key: "draw",
    value: function draw() {
      console.log("Mx.draw");
      var container = this._container;
      this._mxShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true), new mxConnectionConstraint(new mxPoint(0.5, 0), true), new mxConnectionConstraint(new mxPoint(0.75, 0), true), new mxConnectionConstraint(new mxPoint(0, 0.25), true), new mxConnectionConstraint(new mxPoint(0, 0.5), true), new mxConnectionConstraint(new mxPoint(0, 0.75), true), new mxConnectionConstraint(new mxPoint(1, 0.25), true), new mxConnectionConstraint(new mxPoint(1, 0.5), true), new mxConnectionConstraint(new mxPoint(1, 0.75), true), new mxConnectionConstraint(new mxPoint(0.25, 1), true), new mxConnectionConstraint(new mxPoint(0.5, 1), true), new mxConnectionConstraint(new mxPoint(0.75, 1), true)]; // Edges have no connection points

      this._mxPolyline.prototype.constraints = null; // Disables the built-in context menu

      this._mxEvent.disableContextMenu(container); // Creates the graph inside the given container


      var graph = new mxGraph(container);
      graph.setConnectable(true); // Enables connect preview for the default edge style

      graph.connectionHandler.createEdgeState = function (me) {
        var edge = graph.createEdge(null, null, null, null, null);
        return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
      }; // Specifies the default edge style


      graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle'; // Enables rubberband selection

      new mxRubberband(graph); // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).

      var parent = graph.getDefaultParent(); // Adds cells to the model in a single step

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
  }]);

  return Mx;
}();

exports.default = Mx;
