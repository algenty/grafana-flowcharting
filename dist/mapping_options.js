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
    $scope.mapping = this;
    this.activeStyleIndex = 0;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.mx = this.panelCtrl.mx;
    $scope.mx = this.panelCtrl.mx;
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
      text: "Regular expression",
      value: "pattern"
    }];
    this.textPattern = "/.*/";
    this.metricTypes = [{
      text: "Number",
      value: "number" // { text: 'String', value: 'string' },
      // { text: 'Date', value: 'date' },
      // { text: 'Disabled', value: 'disabled' },

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
    key: "cloneMetricStyle",
    value: function cloneMetricStyle(style) {
      var newStyleRule = angular.copy(style);
      newStyleRule.id = ++this.panel.styleSeq;
      var styles = this.panel.styles;
      var stylesCount = styles.length;
      var indexToInsert = stylesCount; // check if last is a catch all rule, then add it before that one

      if (stylesCount > 0) {
        var last = styles[stylesCount - 1];

        if (last.pattern === "/.*/") {
          indexToInsert = stylesCount - 1;
        }
      }

      styles.splice(indexToInsert, 0, newStyleRule);
      this.activeStyleIndex = indexToInsert;
    }
  }, {
    key: "addMetricStyle",
    value: function addMetricStyle() {
      var newStyleRule = {
        id: ++this.panel.styleSeq,
        unit: "short",
        type: "number",
        alias: "",
        aggregation: "current",
        decimals: 2,
        colors: ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"],
        colorMode: this.mx.STYLE_FILLCOLOR,
        colorOn: "a",
        textOn: "wmd",
        textReplace: 'content',
        textPattern: '/.*/',
        pattern: "/.*/",
        dateFormat: "YYYY-MM-DD HH:mm:ss",
        thresholds: [],
        invert: false,
        shapeSeq: 1,
        shapeMaps: [],
        textSeq: 1,
        textMaps: [],
        mappingType: 1
      };
      var styles = this.panel.styles;
      var stylesCount = styles.length;
      var indexToInsert = stylesCount; // check if last is a catch all rule, then add it before that one

      if (stylesCount > 0) {
        var last = styles[stylesCount - 1];

        if (last.pattern === "/.*/") {
          indexToInsert = stylesCount - 1;
        }
      }

      styles.splice(indexToInsert, 0, newStyleRule);
      this.activeStyleIndex = indexToInsert;
    }
  }, {
    key: "removeMetricStyle",
    value: function removeMetricStyle(style) {
      this.panel.styles = _lodash.default.without(this.panel.styles, style);
    }
  }, {
    key: "invertColorOrder",
    value: function invertColorOrder(index) {
      var ref = this.panel.styles[index].colors;
      var copy = ref[0];
      ref[0] = ref[2];
      ref[2] = copy;
      this.panel.styles[index].invert = !this.panel.styles[index].invert;
      this.onOptionsChange();
    }
  }, {
    key: "onColorChange",
    value: function onColorChange(styleIndex, colorIndex) {
      var _this2 = this;

      return function (newColor) {
        _this2.panel.styles[styleIndex].colors[colorIndex] = newColor;

        _this2.onOptionsChange();
      };
    }
  }, {
    key: "onOptionsChange",
    value: function onOptionsChange() {
      this.panelCtrl.changedOptions = true;
      this.render();
    } //
    // Validate
    //

  }, {
    key: "validateRegex",
    value: function validateRegex(textRegex) {
      if (textRegex == null || textRegex.length == 0) {
        return true;
      }

      try {
        var regex = new RegExp(textRegex);
        return true;
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "addValueMap",
    value: function addValueMap(style) {
      if (!style.valueMaps) {
        style.valueMaps = [];
      }

      style.valueMaps.push({
        value: "",
        text: ""
      });
      this.onOptionsChange();
    }
  }, {
    key: "removeValueMap",
    value: function removeValueMap(style, index) {
      style.valueMaps.splice(index, 1);
      this.onOptionsChange();
    }
  }, {
    key: "addRangeMap",
    value: function addRangeMap(style) {
      if (!style.rangeMaps) {
        style.rangeMaps = [];
      }

      style.rangeMaps.push({
        from: "",
        to: "",
        text: ""
      });
      this.onOptionsChange();
    }
  }, {
    key: "removeRangeMap",
    value: function removeRangeMap(style, index) {
      style.rangeMaps.splice(index, 1);
      this.onOptionsChange();
    }
  }, {
    key: "addShapeToStyle",
    value: function addShapeToStyle(style) {
      console.debug("mapping.addShapeToStyle");

      if (!style.shapeMaps) {
        style.shapeMaps = [];
      }

      style.shapeMaps.push({
        pattern: "",
        prop: "id",
        id: style.shapeSeq++
      });
      this.onOptionsChange();
    }
  }, {
    key: "removeShapeFromStyle",
    value: function removeShapeFromStyle(style, shape) {
      style.shapeMaps = _lodash.default.without(style.shapeMaps, shape);
      this.onOptionsChange();
    }
  }, {
    key: "hideShapeFromStyle",
    value: function hideShapeFromStyle(shape) {
      shape.hidden = true;
      this.onOptionsChange();
    }
  }, {
    key: "showShapeFromStyle",
    value: function showShapeFromStyle(shape) {
      shape.hidden = false;
      this.onOptionsChange();
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
