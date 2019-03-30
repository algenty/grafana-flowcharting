"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graph_class = _interopRequireDefault(require("./graph_class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FlowchartHandler =
/*#__PURE__*/
function () {
  /** @ngInject */
  function FlowchartHandler($scope, elem, ctrl, flowchart) {
    var _this = this;

    _classCallCheck(this, FlowchartHandler);

    this.$scope = $scope || null;
    this.$elem = elem.find(".flowchart-panel__chart");
    this.flowchart = flowchart;
    this.ctrl = ctrl;
    this.xgraph; // if (version != this.panel.version) this.migrate(this.rules)
    // else this.import(this.rules);

    this.initGraph(); // Events Render

    ctrl.events.on("render", function () {
      _this.render();
    });
  }

  _createClass(FlowchartHandler, [{
    key: "initGraph",
    value: function initGraph() {
      var $container = $("<div></div>");
      this.$elem.html($container);
      this.xgraph = new _graph_class.default($container[0], this.flowchart.source.xml.value);
      this.xgraph.drawGraph();
      if (this.flowchart.options.scale) this.xgraph.scaleGraph(true);
      if (this.flowchart.options.center) this.xgraph.centerGraph(true);
      if (this.flowchart.options.center) this.xgraph.lockGraph(true);
      this.xgraph.refreshGraph();
    }
  }, {
    key: "render",
    value: function render() {
      console.log("flowchartHandler.render()");
      this.xgraph.refreshGraph();
    }
  }]);

  return FlowchartHandler;
}();

exports.default = FlowchartHandler;
