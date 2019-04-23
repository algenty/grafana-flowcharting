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
    this.defaultXml = '<mxGraphModel dx="1073" dy="521" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="arrow-1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-grafana" target="shape-love" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><object label="Grafana" href="www.google.fr" id="shape-grafana"><mxCell style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell></object><mxCell id="arrow-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-love" target="shape-mxgraph" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-love" value="loves" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="shape-mxgraph" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell><mxCell id="text-grafana" value="MyText : TextVal" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="9" y="50" width="120" height="20" as="geometry"/></mxCell><mxCell id="text-arrow1" value="Text 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="150" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow2" value="Text 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="280" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-mxgraph" value="Text 4" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="380" y="50" width="40" height="20" as="geometry"/></mxCell></root></mxGraphModel>';
    this.xgraph = undefined;
    this.$container = undefined;
    this.onMapping = {
      active: false,
      // boolean if pointer mapping is active
      object: undefined,
      // ojb to return id of mapping
      id: undefined // id of dom

    };

    if (this.data !== undefined && this.data != null && this.data.length > 0) {
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

      u.log(1, 'FlowchartHandler.import()');
      u.log(0, 'FlowchartHandler.import() obj', obj);
      var i = 0;
      obj.forEach(function (map) {
        var container = _this2.createContainer();

        var fc = new _flowchart_class.default(map.name, map.xml, container, map);

        _this2.flowcharts.push(fc);

        _this2.data[i] = map;
        i += 1;
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
