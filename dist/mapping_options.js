"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mappingOptionsTab = mappingOptionsTab;
exports.MappingOptionsCtrl = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _kbn = _interopRequireDefault(require("app/core/utils/kbn"));

var _plugin = require("./plugin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MappingOptionsCtrl =
/*#__PURE__*/
function () {
  /** @ngInject */
  function MappingOptionsCtrl($scope) {
    var _this = this;

    _classCallCheck(this, MappingOptionsCtrl);

    $scope.editor = this;
    this.activeRuleIndex = 0;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.mx = this.panelCtrl.mx;
    $scope.mx = this.panelCtrl.mx;
    $scope.onMapping = this.panelCtrl.onMapping;
    $scope.rulesHandler = this.panelCtrl.rulesHandler;
    this.unitFormats = _kbn.default.getUnitFormats();
    this.colorModes = [{
      text: "Disabled",
      value: null
    }, {
      text: "Stroke",
      value: this.mx.STYLE_STROKECOLOR
    }, {
      text: "Fill",
      value: this.mx.STYLE_FILLCOLOR
    }, {
      text: "Text",
      value: this.mx.STYLE_FONTCOLOR
    }];
    this.colorOn = [{
      text: "Warning / Critical",
      value: "wc"
    }, {
      text: "Always",
      value: "a"
    }];
    this.textOn = [{
      text: "Never",
      value: "n"
    }, {
      text: "When Metric Displayed",
      value: "wmd"
    }, {
      text: "Warning / Critical",
      value: "wc"
    }, {
      text: "Critical Only",
      value: "co"
    }];
    this.textReplace = [{
      text: "All content",
      value: "content"
    }, {
      text: "Substring",
      value: "pattern"
    }];
    this.propTypes = [{
      text: "Id",
      value: "id"
    }];
    this.textPattern = "/.*/";
    this.metricTypes = [{
      text: "Number",
      value: "number"
    }, {
      text: 'String',
      value: 'string'
    }, {
      text: 'Date',
      value: 'date'
    }];
    this.dateFormats = [{
      text: "YYYY-MM-DD HH:mm:ss",
      value: "YYYY-MM-DD HH:mm:ss"
    }, {
      text: "YYYY-MM-DD HH:mm:ss.SSS",
      value: "YYYY-MM-DD HH:mm:ss.SSS"
    }, {
      text: "MM/DD/YY h:mm:ss a",
      value: "MM/DD/YY h:mm:ss a"
    }, {
      text: "MMMM D, YYYY LT",
      value: "MMMM D, YYYY LT"
    }, {
      text: "YYYY-MM-DD",
      value: "YYYY-MM-DD"
    }];
    this.aggregationTypes = [{
      text: "First",
      value: "first"
    }, {
      text: "Last",
      value: "current"
    }, {
      text: "Min",
      value: "min"
    }, {
      text: "Max",
      value: "max"
    }, {
      text: "Sum",
      value: "total"
    }, {
      text: "Avg",
      value: "avg"
    }, {
      text: "Count",
      value: "count"
    }, {
      text: "Delta",
      value: "delta"
    }, {
      text: "Range",
      value: "range"
    }, {
      text: "Diff",
      value: "diff"
    }];
    this.mappingTypes = [{
      text: "Value to text",
      value: 1
    }, {
      text: "Range to text",
      value: 2
    }];

    this.getMetricNames = function () {
      if (!_this.panelCtrl.series) {
        return [];
      }

      return _lodash.default.map(_this.panelCtrl.series, function (t) {
        return t.alias;
      });
    };

    this.getCellNames = function () {
      if (!_this.mx.cells) {
        return [];
      }

      return _lodash.default.map(_this.mx.cells, function (t) {
        return t.id;
      });
    };

    this.onColorChange = this.onColorChange.bind(this);
  }

  _createClass(MappingOptionsCtrl, [{
    key: "render",
    value: function render() {
      this.panelCtrl.render();
    }
  }, {
    key: "setUnitFormat",
    value: function setUnitFormat(column, subItem) {
      column.unit = subItem.value;
      this.onOptionsChange();
    }
  }, {
    key: "onColorChange",
    value: function onColorChange(ruleIndex, colorIndex) {
      var _this2 = this;

      return function (newColor) {
        _this2.panel.rules[ruleIndex].colors[colorIndex] = newColor;

        _this2.onOptionsChange();
      };
    }
  }, {
    key: "onOptionsChange",
    value: function onOptionsChange() {
      this.panelCtrl.changedOptions = true;
      console.log(this.panelCtrl.rulesHandler);
      this.render();
    }
  }, {
    key: "mapCell",
    value: function mapCell(map, id) {
      // init mapping event
      if (this.panelCtrl.onMapping.active && map == this.panelCtrl.onMapping.object) {
        this.panelCtrl.onMapping.active = false;
      } else {
        this.panelCtrl.onMapping.active = true;
        this.panelCtrl.onMapping.object = map;
        this.panelCtrl.onMapping.idFocus = id;
        var elt = document.getElementById('agenty-grafana-flowcharting');
        elt.scrollIntoView();
        elt.focus();
      }
    }
  }]);

  return MappingOptionsCtrl;
}();
/** @ngInject */


exports.MappingOptionsCtrl = MappingOptionsCtrl;

function mappingOptionsTab($q, uiSegmentSrv) {
  "use strict";

  return {
    restrict: "E",
    scope: true,
    templateUrl: "public/plugins/" + _plugin.plugin.id + "/partials/mapping_options.html",
    controller: MappingOptionsCtrl
  };
}
