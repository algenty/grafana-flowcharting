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

/**
 * Class FlowchartHandler
 */
var FlowchartHandler =
/*#__PURE__*/
function () {
  /** @ngInject */

  /**
   *Creates an instance of FlowchartHandler to handle flowchart
   * @param {*} $scope - angular scope
   * @param {*} elem - angular elem
   * @param {*} ctrl - ctrlPanel
   * @param {*} data - Empty data to store
   * @memberof FlowchartHandler
   */
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
  /**
   * import data into
   *
   * @param {Object} obj
   * @memberof FlowchartHandler
   */


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
    /**
     * Get flowchart in index position
     *
     * @param {Number} index
     * @returns {Flowchart}
     * @memberof FlowchartHandler
     */

  }, {
    key: "getFlowchart",
    value: function getFlowchart(index) {
      return this.flowcharts[index];
    }
    /**
     * Return array of flowchart
     *
     * @returns {Array} Array of flowchart
     * @memberof FlowchartHandler
     */

  }, {
    key: "getFlowcharts",
    value: function getFlowcharts() {
      return this.flowcharts;
    }
    /**
     *Return number of flowchart
     *
     * @returns {number} Nulber of flowchart
     * @memberof FlowchartHandler
     */

  }, {
    key: "countFlowcharts",
    value: function countFlowcharts() {
      if (this.flowcharts !== undefined && Array.isArray(this.flowcharts)) return this.flowcharts.length;
      return 0;
    }
    /**
     *Create a div container for graph
     *
     * @returns {DOM}
     * @memberof FlowchartHandler
     */

  }, {
    key: "createContainer",
    value: function createContainer() {
      var $container = $("<div id=\"flowchart_".concat(u.uniqueID, "\" style=\"margin:auto;position:relative,width:100%;height:100%\"></div>"));
      this.$elem.html($container);
      return $container[0];
    }
    /**
     *Add a flowchart
     *
     * @param {string} name
     * @memberof FlowchartHandler
     */

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
    /**
     *Render for draw
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "render",
    value: function render() {
      u.log(1, 'flowchartHandler.render()'); // not repeat render if mouse down

      if (!this.mousedown) {
        if (this.changeSourceFlag) {
          this.load();
          this.changeSourceFlag = false;
          this.changeRuleFlag = true;
        }

        if (this.changeOptionFlag) {
          this.setOptions();
          this.changeOptionFlag = false;
        }

        if (this.changeRuleFlag || this.changeDataFlag) {
          var rules = this.ctrl.rulesHandler.getRules();
          var series = this.ctrl.series;

          if (this.changeRuleFlag) {
            this.flowcharts.forEach(function (flowchart) {
              flowchart.updateStates(rules);
            });
            this.changeRuleFlag = false;
          }

          this.setStates(rules, series);
          this.applyStates();
          this.changeDataFlag = false;
        }

        var width = this.$elem.width();
        var height = this.ctrl.height;
        this.refresh(width, height); // console.log("FlowcharHandler.render() states",this.flowcharts[0].getStateHandler().getStates());
      }
    }
    /**
     *Flag source change
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "sourceChanged",
    value: function sourceChanged() {
      this.changeSourceFlag = true;
    }
    /**
     *Flag options change
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "optionChanged",
    value: function optionChanged() {
      this.changeOptionFlag = true;
    }
    /**
     *Flag rule change
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "ruleChanged",
    value: function ruleChanged() {
      this.changeRuleFlag = true;
    }
    /**
     *Flag data change
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "dataChanged",
    value: function dataChanged() {
      this.changeDataFlag = true;
    }
    /**
     *Refresh flowchart then graph
     *
     * @param {*} width
     * @param {*} height
     * @memberof FlowchartHandler
     */

  }, {
    key: "refresh",
    value: function refresh(width, height) {
      u.log(1, "FlowchartHandler.refresh()");
      this.flowcharts.forEach(function (flowchart) {
        flowchart.refresh(width, height);
      });
    }
    /**
     * Change states of cell according to rules and series
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "setStates",
    value: function setStates(rules, series) {
      this.flowcharts.forEach(function (flowchart) {
        flowchart.setStates(rules, series);
      });
    }
  }, {
    key: "updateStates",
    value: function updateStates(rules) {
      this.flowcharts.forEach(function (flowchart) {
        flowchart.updateStates(rules);
      });
    }
    /**
     * Apply state of cell after setStates
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "applyStates",
    value: function applyStates() {
      this.flowcharts.forEach(function (flowchart) {
        flowchart.applyStates();
      });
    }
    /**
     *Apply and set options
     *
     * @memberof FlowchartHandler
     */

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
    /**
     *(re)draw graph
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "draw",
    value: function draw() {
      u.log(1, "FlowchartHandler.draw()");
      this.flowcharts.forEach(function (flowchart) {
        flowchart.redraw();
      });
    }
    /**
     *(re)load graph
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "load",
    value: function load() {
      u.log(1, "FlowchartHandler.load()");
      this.flowcharts.forEach(function (flowchart) {
        flowchart.reload();
      });
    }
    /**
     *Active option link/map
     *
     * @param {Object} objToMap
     * @memberof FlowchartHandler
     */

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
    /**
     *Desactivate option
     *
     * @memberof FlowchartHandler
     */

  }, {
    key: "unsetMap",
    value: function unsetMap() {
      var flowchart = this.getFlowchart(0);
      this.onMapping.active = false;
      this.onMapping.object = undefined;
      this.onMapping.id = '';
      flowchart.unsetMap();
    }
    /**
     *Return true if mapping object is active
     *
     * @param {properties} objToMap
     * @returns true - true if mapping mode
     * @memberof FlowchartHandler
     */

  }, {
    key: "isMapping",
    value: function isMapping(objToMap) {
      if (objToMap === undefined || objToMap == null) return this.onMapping.active;
      if (this.onMapping.active === true && objToMap === this.onMapping.object) return true;
      return false;
    }
    /**
     *Open graph in draw.io
     *
     * @param {number} index - index of flowchart
     * @memberof FlowchartHandler
     */

  }, {
    key: "openDrawEditor",
    value: function openDrawEditor(index) {
      var _this3 = this;

      var urlEditor = 'https://draw.io?embed=1&spin=1&libraries=1&ui=dark';
      var editorWindow = window.open(urlEditor, 'MxGraph Editor', 'width=1280, height=720');
      window.addEventListener('message', function (event) {
        if (event.origin !== 'https://www.draw.io') return; // when editor is open

        if (event.data === 'ready') {
          // send xml
          event.source.postMessage(_this3.flowcharts[index].data.xml, event.origin);
        } else {
          if (event.data !== undefined && event.data.length > 0) {
            _this3.flowcharts[index].redraw(event.data);

            _this3.sourceChanged();

            _this3.$scope.$apply();

            _this3.render();
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
