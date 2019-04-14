"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flowchart_class = _interopRequireDefault(require("./flowchart_class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FlowchartHandler =
/*#__PURE__*/
function () {
  /** @ngInject */
  function FlowchartHandler($scope, elem, ctrl, data) {
    var _this = this;

    _classCallCheck(this, FlowchartHandler);

    u.log(1, 'FlowchartHandler.constructor()');
    this.$scope = $scope || null;
    this.$elem = elem.find('.flowchart-panel__chart');
    this.ctrl = ctrl;
    this.flowcharts = [];
    this.data = data;
    this.changedGraphFlag = true;
    this.changedDataFlag = true;
    this.changedRulesFlag = true;
    this.defaultXml = '<mxGraphModel dx="1073" dy="521" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="arrow-1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-grafana" target="shape-love" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><object label="Grafana" href="www.google.fr" id="shape-grafana"><mxCell style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell></object><mxCell id="arrow-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-love" target="shape-mxgraph" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-love" value="loves" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="shape-mxgraph" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell><mxCell id="text-grafana" value="MyText : TextVal" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="9" y="50" width="120" height="20" as="geometry"/></mxCell><mxCell id="text-arrow1" value="Text 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="150" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow2" value="Text 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="280" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-mxgraph" value="Text 4" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="380" y="50" width="40" height="20" as="geometry"/></mxCell></root></mxGraphModel>';
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

    if (this.data != undefined && this.data != null && this.data.length > 0) {
      this.import(this.data);
    } // Events Render


    ctrl.events.on('render', function () {
      _this.render();
    });
  }

  _createClass(FlowchartHandler, [{
    key: "import",
    value: function _import(obj) {
      var _this2 = this;

      var i = 0;
      obj.forEach(function (map) {
        var container = _this2.createContainer();

        var rule = new _flowchart_class.default(map.name, container, map);

        _this2.flowcharts.push(rule);

        _this2.data[i++] = map;
      });
    }
  }, {
    key: "getFlowchart",
    value: function getFlowchart(index) {
      return this.flowcharts[index];
    }
  }, {
    key: "getFlowcharts",
    value: function getFlowcharts() {
      return this.flowcharts;
    }
  }, {
    key: "createContainer",
    value: function createContainer() {
      var $container = $('<div id="flowchart_' + u.uniqueID + '" style="margin:auto;position:relative,width:100%;height:100%"></div>');
      this.$elem.html($container);
      return $container[0];
    }
  }, {
    key: "addFlowchart",
    value: function addFlowchart(name) {
      var container = this.createContainer();
      var data = {};
      var flowchart = new _flowchart_class.default(name, container, data);
      this.data.push(data);
      this.flowcharts.push(flowchart);
    }
  }, {
    key: "getStatesHandler",
    value: function getStatesHandler() {
      return this.stateHandler;
    }
  }, {
    key: "render",
    value: function render() {
      u.log(1, 'flowchartHandler.render()');
      var width = this.$elem.width();
      var height = this.ctrl.height;
      this.refresh(width, height);
    }
  }, {
    key: "refresh",
    value: function refresh(width, height) {
      this.flowcharts.forEach(function (flowchart) {
        flowchart.refresh(width, height);
      });
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
      if (objToMap == undefined || objToMap == null) return this.onMapping.active;
      if (this.onMapping.active === true && objToMap == this.onMapping.object) return true;
      return false;
    }
  }]);

  return FlowchartHandler;
}();

exports.default = FlowchartHandler;
//# sourceMappingURL=flowchartHandler.js.map
