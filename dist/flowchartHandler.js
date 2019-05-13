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
        flowchart.setBgColor(flowchart.data.bgColor);
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
