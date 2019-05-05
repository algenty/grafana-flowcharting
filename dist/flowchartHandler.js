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
    u.log(0, 'FlowchartHandler.constructor() data', data);
    this.$scope = $scope || null;
    this.$elem = elem.find('.flowchart-panel__chart');
    this.ctrl = ctrl;
    this.flowcharts = [];
    this.data = data;
    this.changeSourceFlag = true;
    this.changeOptionFlag = true;
    this.changeDataFlag = true;
    this.changedRuleFlag = true;
    this.defaultXml = '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'; // '<mxGraphModel dx="1073" dy="521" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="arrow-1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-grafana" target="shape-love" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><object label="Grafana" href="www.google.fr" id="shape-grafana"><mxCell style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell></object><mxCell id="arrow-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-love" target="shape-mxgraph" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-love" value="loves" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="shape-mxgraph" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell><mxCell id="text-grafana" value="MyText : TextVal" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="9" y="50" width="120" height="20" as="geometry"/></mxCell><mxCell id="text-arrow1" value="Text 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="150" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow2" value="Text 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="280" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-mxgraph" value="Text 4" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="380" y="50" width="40" height="20" as="geometry"/></mxCell></root></mxGraphModel>';

    this.xgraph = undefined;
    this.$container = undefined;
    this.onMapping = {
      active: false,
      // boolean if pointer mapping is active
      object: undefined,
      // ojb to return id of mapping
      id: undefined // id of dom

    };
    this.import(this.data); // Events Render

    ctrl.events.on('render', function () {
      _this.render();
    });
  }

  _createClass(FlowchartHandler, [{
    key: "import",
    value: function _import(obj) {
      var _this2 = this;

      u.log(1, 'FlowchartHandler.import()');
      u.log(0, 'FlowchartHandler.import() obj', obj);
      this.flowcharts = [];

      if (obj !== undefined && obj !== null && obj.length > 0) {
        obj.forEach(function (map) {
          var container = _this2.createContainer();

          var newData = {};
          var fc = new _flowchart_class.default(map.name, map.xml, container, newData);
          fc.import(map);

          _this2.flowcharts.push(fc);

          _this2.data.push(newData);
        });
      }
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
    key: "countFlowcharts",
    value: function countFlowcharts() {
      if (this.flowcharts !== undefined && Array.isArray(this.flowcharts)) return this.flowcharts.length;
      return 0;
    }
  }, {
    key: "createContainer",
    value: function createContainer() {
      var $container = $("<div id=\"flowchart_".concat(u.uniqueID, "\" style=\"margin:auto;position:relative,width:100%;height:100%\"></div>"));
      this.$elem.html($container);
      return $container[0];
    }
  }, {
    key: "addFlowchart",
    value: function addFlowchart(name) {
      u.log(1, 'FlowchartHandler.addFlowchart()');
      var container = this.createContainer();
      var data = {};
      var flowchart = new _flowchart_class.default(name, this.defaultXml, container, data);
      this.data.push(data);
      this.flowcharts.push(flowchart);
    }
  }, {
    key: "render",
    value: function render() {
      u.log(1, 'flowchartHandler.render()');

      if (this.changeSourceFlag) {
        this.draw();
        this.changeSourceFlag = false;
        this.changeRuleFlag = true;
      }

      if (this.changeOptionFlag) {
        this.setOptions();
        this.changeOptionFlag = false;
      }

      if (this.changeRuleFlag || this.changeDataFlag) {
        this.setStates();
        this.applyStates();
        this.changeRuleFlag = false;
        this.changeDataFlag = false;
      }

      var width = this.$elem.width();
      var height = this.ctrl.height;
      this.refresh(width, height);
    }
  }, {
    key: "sourceChanged",
    value: function sourceChanged() {
      this.changeSourceFlag = true;
    }
  }, {
    key: "optionChanged",
    value: function optionChanged() {
      this.changeOptionFlag = true;
    }
  }, {
    key: "ruleChanged",
    value: function ruleChanged() {
      this.changeRuleFlag = true;
    }
  }, {
    key: "dataChanged",
    value: function dataChanged() {
      this.changeDataFlag = true;
    }
  }, {
    key: "refresh",
    value: function refresh(width, height) {
      u.log(1, "FlowchartHandler.refresh()");
      this.flowcharts.forEach(function (flowchart) {
        flowchart.refresh(width, height);
      });
    }
  }, {
    key: "setStates",
    value: function setStates() {
      var rules = this.ctrl.rulesHandler.getRules();
      var series = this.ctrl.series;
      this.flowcharts.forEach(function (flowchart) {
        flowchart.setStates(rules, series);
      });
    }
  }, {
    key: "applyStates",
    value: function applyStates() {
      this.flowcharts.forEach(function (flowchart) {
        flowchart.applyStates();
      });
    }
  }, {
    key: "setOptions",
    value: function setOptions() {
      this.flowcharts.forEach(function (flowchart) {
        flowchart.setScale(flowchart.data.scale);
        flowchart.setCenter(flowchart.data.center);
        flowchart.setGrid(flowchart.data.grid);
        flowchart.setTooltip(flowchart.data.tooltip);
        flowchart.setLock(flowchart.data.lock);
        flowchart.setZoom(flowchart.data.zoom);
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      u.log(1, "FlowchartHandler.draw()");
      this.flowcharts.forEach(function (flowchart) {
        flowchart.redraw();
      });
    }
  }, {
    key: "setMap",
    value: function setMap(objToMap) {
      var flowchart = this.getFlowchart(0);
      this.onMapping.active = true;
      this.onMapping.object = objToMap;
      this.onMapping.id = objToMap.getId();
      this.onMapping.$scope = this.$scope;
      flowchart.setMap(this.onMapping);
    }
  }, {
    key: "unsetMap",
    value: function unsetMap() {
      var flowchart = this.getFlowchart(0);
      this.onMapping.active = false;
      this.onMapping.object = undefined;
      this.onMapping.id = '';
      flowchart.unsetMap();
    }
  }, {
    key: "isMapping",
    value: function isMapping(objToMap) {
      if (objToMap === undefined || objToMap == null) return this.onMapping.active;
      if (this.onMapping.active === true && objToMap === this.onMapping.object) return true;
      return false;
    }
  }, {
    key: "openDrawEditor",
    value: function openDrawEditor(index) {
      var _this3 = this;

      var urlEditor = 'https://draw.io?embed=1';
      var editorWindow = window.open(urlEditor, 'MxGraph Editor', 'width=1280, height=720');
      window.addEventListener('message', function (event) {
        if (event.origin !== 'https://www.draw.io') return; // when editor is open

        if (event.data === 'ready') {
          // send xml
          event.source.postMessage(_this3.flowcharts[index].data.xml, event.origin);
        } else {
          if (event.data !== undefined && event.data.length > 0) {
            // this.flowcharts[index].setXml(event.data);
            _this3.flowcharts[index].redraw(event.data);

            _this3.sourceChanged();

            _this3.$scope.$apply(); // this.render();

          }

          if (event.data !== undefined || event.data.length === 0) {
            editorWindow.close();
          }
        }
      });
    }
  }]);

  return FlowchartHandler;
}();

exports.default = FlowchartHandler;
//# sourceMappingURL=flowchartHandler.js.map
