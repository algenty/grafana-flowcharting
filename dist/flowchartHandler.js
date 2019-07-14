"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flowchart_class = _interopRequireDefault(require("./flowchart_class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    this.defaultXml = '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';
    this.xgraph = undefined;
    this.$container = undefined;
    this.onMapping = {
      active: false,
      // boolean if pointer mapping is active
      object: undefined,
      // ojb to return id of mapping
      id: undefined // id of dom

    };
    this["import"](this.data); // Events Render

    ctrl.events.on('render', function () {
      _this.render();
    });
    this.mousedownTimeout = 0;
    this.mousedown = 0;

    document.body.onmousedown = function () {
      _this.mousedown = 0;
      window.clearInterval(_this.mousedownTimeout);
      _this.mousedownTimeout = window.setInterval(function () {
        _this.mousedown += 1;
      }, 200);
    };

    document.body.onmouseup = function () {
      _this.mousedown = 0;
      window.clearInterval(_this.mousedownTimeout);
    };
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
          var fc = new _flowchart_class["default"](map.name, map.xml, container, _this2.ctrl, newData);
          fc["import"](map);

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
      var flowchart = new _flowchart_class["default"](name, this.defaultXml, container, this.ctrl, data);
      this.data.push(data);
      this.flowcharts.push(flowchart);
    }
  }, {
    key: "render",
    value: function render() {
      u.log(1, 'flowchartHandler.render()'); // not repeat render is mouse down

      if (!this.mousedown) {
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

exports["default"] = FlowchartHandler;
