"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graph_class = _interopRequireDefault(require("./graph_class"));

var _statesHandler = _interopRequireDefault(require("./statesHandler"));

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

    u.log(1, 'FlowchartHandler.constructor()');
    this.$scope = $scope || null;
    this.$elem = elem.find('.flowchart-panel__chart');
    this.flowchart = flowchart;
    this.ctrl = ctrl;
    this.xgraph;
    this.stateHandler;
    this.$container;
    this.onMapping = {
      active: false,
      // boolean if pointer mapping is active
      object: undefined,
      // ojb to return id of mapping
      id: undefined // id of dom

    };
    this.initGraph();
    this.stateHandler = new _statesHandler.default(this.$scope, this.xgraph); // Events Render

    ctrl.events.on('render', function () {
      _this.render();
    });
  }

  _createClass(FlowchartHandler, [{
    key: "initGraph",
    value: function initGraph() {
      this.$container = $('<div id="flowchart_' + u.uniqueID + '" style="margin:auto;position:relative,width:100%;height:100%"></div>');
      this.$elem.html(this.$container);
      this.xgraph = new _graph_class.default(this.$container[0], this.flowchart.source.xml.value);
      this.xgraph.drawGraph();
      if (this.flowchart.options.scale) this.xgraph.scaleGraph(true);
      if (this.flowchart.options.center) this.xgraph.centerGraph(true);
      if (this.flowchart.options.center) this.xgraph.lockGraph(true);
      var width = this.$elem.width;
      var height = this.ctrl.height;
      this.xgraph.refreshGraph(width, height);
    }
  }, {
    key: "SetUpdateStates",
    value: function SetUpdateStates(rules, series) {
      u.log(1, 'flowchartHandler.SetUpdateStates()');
      this.stateHandler.setStates(rules, series);
      this.stateHandler.updateStates();
      u.log(0, 'flowchartHandler.SetUpdateStates() States', this.stateHandler.getStates());
    }
  }, {
    key: "render",
    value: function render() {
      u.log(1, 'flowchartHandler.render()');
      var width = this.$elem.width();
      var height = this.ctrl.height;
      this.xgraph.refreshGraph(width, height);
    }
  }, {
    key: "getNamesByProp",
    value: function getNamesByProp(prop) {
      return this.xgraph.getOrignalCells(prop);
    }
  }, {
    key: "setMap",
    value: function setMap(objToMap) {
      this.onMapping.active = true;
      this.onMapping.object = objToMap;
      this.onMapping.id = objToMap.getId();
      this.onMapping.container = this.$container[0];
      this.$container[0].scrollIntoView();
      this.$container[0].focus();
    }
  }, {
    key: "unsetMap",
    value: function unsetMap() {
      this.onMapping.active = false;
      this.onMapping.object = undefined;
      this.onMapping.id = '';
    }
  }, {
    key: "isMapping",
    value: function isMapping(objToMap) {
      if (this.onMapping.active === true && objToMap == this.onMapping.object) return true;
      return false;
    }
  }]);

  return FlowchartHandler;
}();

exports.default = FlowchartHandler;
