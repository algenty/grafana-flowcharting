"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _kbn = _interopRequireDefault(require("app/core/utils/kbn"));

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rule =
/*#__PURE__*/
function () {
  function Rule(seq) {
    _classCallCheck(this, Rule);

    this.id = seq;
    this.unit = "short";
    this.type = "number";
    this.alias = "";
    this.aggregation = "current";
    this.decimals = 2;
    this.colors = ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"];
    this.colorMode = 'fillColor';
    this.colorOn = "a";
    this.textOn = "wmd";
    this.textReplace = "content";
    this.textPattern = "/.*/";
    this.pattern = "/.*/";
    this.dateFormat = "YYYY-MM-DD HH:mm:ss";
    this.thresholds = [];
    this.invert = false;
    this.shapeSeq = 1;
    this.shapeProp = "id";
    this.shapeMaps = [];
    this.textSeq = 1;
    this.textProp = "id";
    this.textMaps = [];
    this.linkSeq = 1;
    this.linkProp = "id";
    this.linkMaps = [];
    this.mappingType = 1;
    this.sanitize = false;
  }

  _createClass(Rule, [{
    key: "export",
    value: function _export() {}
  }, {
    key: "import",
    value: function _import(obj) {}
  }, {
    key: "migrate",
    value: function migrate(obj) {}
  }, {
    key: "invertColorOrder",
    value: function invertColorOrder() {
      var ref = this.colors;
      var copy = ref[0];
      ref[0] = ref[2];
      ref[2] = copy;
      this.invert = this.ref;
    }
  }, {
    key: "newColor",
    value: function newColor(index, color) {
      var _this = this;

      return function (newColor) {
        _this.colors[index] = color;
      };
    } //
    // Series
    //

  }, {
    key: "matchSerie",
    value: function matchSerie(serie) {
      if (this.pattern === null || this.pattern === undefined) return false;

      var regex = _kbn.default.stringToJsRegex(this.pattern);

      var matching = _serie.alias.match(regex);

      if (this.pattern == this.alias || matching) return true;
    } //
    // SHAPE MAPS
    //

  }, {
    key: "addShapeMap",
    value: function addShapeMap(pattern) {
      var m = new ShapeMap(this, pattern);
      shapeMaps.push(m);
    }
  }, {
    key: "removeShapeMap",
    value: function removeShapeMap(index) {
      this.shapeMaps.splice(index, 1);
    }
  }, {
    key: "getShapeMap",
    value: function getShapeMap(index) {
      return this.shapeMaps[index];
    }
  }, {
    key: "getShapeMaps",
    value: function getShapeMaps() {
      return shapeMaps;
    } //
    // TEXT MAPS
    //

  }, {
    key: "addTextMap",
    value: function addTextMap(pattern) {
      var m = new TextMap(this, pattern);
      textMaps.push(m);
    }
  }, {
    key: "removeTextMap",
    value: function removeTextMap(index) {
      var m = this.textMaps[index];
      this.textMaps = _lodash.default.without(this.textMaps, m);
    }
  }, {
    key: "getTextMap",
    value: function getTextMap(index) {
      return this.textMaps[index];
    }
  }, {
    key: "getTextMaps",
    value: function getTextMaps() {
      return textMaps;
    } //
    // LINK MAPS
    //

  }, {
    key: "addLinkMap",
    value: function addLinkMap(pattern) {
      var m = new LinkMap(this, pattern);
      linkMaps.push(m);
    }
  }, {
    key: "removeLinkMap",
    value: function removeLinkMap(index) {
      var m = this.textMaps[index];
      this.linkMaps = _lodash.default.without(this.linkMaps, m);
    }
  }, {
    key: "getLinkMap",
    value: function getLinkMap(index) {
      return this.linkMaps[index];
    }
  }, {
    key: "getLinkMaps",
    value: function getLinkMaps() {
      return textMaps;
    } //
    // STRING VALUE MAPS
    //

  }, {
    key: "addValueMap",
    value: function addValueMap(value, text) {
      var m = new ValueMap(this, value, text);
      valueMaps.push(m);
    }
  }, {
    key: "removeValueMap",
    value: function removeValueMap(index) {
      this.valueMaps.splice(index, 1);
    }
  }, {
    key: "getValueMap",
    value: function getValueMap(index) {
      return this.valueMaps[index];
    }
  }, {
    key: "getValueMaps",
    value: function getValueMaps() {
      return valueMaps;
    } //
    // STRING RANGE VALUE MAPS
    //

  }, {
    key: "addRangeMap",
    value: function addRangeMap(from, to, text) {
      var m = new ValueMap(this, from, to, text);
      valueMaps.push(m);
    }
  }, {
    key: "removeRangeMap",
    value: function removeRangeMap(index) {
      this.rangeMaps.splice(index, 1);
    }
  }, {
    key: "getRangeMap",
    value: function getRangeMap(index) {
      return this.rangeMaps[index];
    }
  }, {
    key: "getRangeMaps",
    value: function getRangeMaps() {
      return rangeMaps;
    }
  }, {
    key: "hideRangeMap",
    value: function hideRangeMap(index) {
      this.rangeMaps[index].hide();
    }
  }, {
    key: "showRangeMap",
    value: function showRangeMap(index) {
      this.rangeMaps[index].show();
    } //
    // Format value
    //

  }, {
    key: "getColorForValue",
    value: function getColorForValue(value) {
      if (!this.thresholds || this.thresholds.length == 0) {
        return null;
      }

      for (var i = this.thresholds.length; i > 0; i--) {
        if (value >= style.thresholds[i - 1]) {
          return this.colors[i];
        }
      }

      return _lodash.default.first(this.colors);
    }
  }, {
    key: "getThresholdLevel",
    value: function getThresholdLevel(value) {
      var thresholdLevel = 0;
      var thresholds = this.thresholds;
      if (thresholds === undefined || thresholds.length == 0) return -1;
      if (thresholds.length !== 2) return -1; // non invert

      if (!this.invert) {
        thresholdLevel = 3;
        if (value >= thresholds[0]) thresholdLevel = 1;
        if (value >= thresholds[1]) thresholdLevel = 0;
      } else {
        thresholdLevel = 0;
        if (value >= thresholds[0]) thresholdLevel = 1;
        if (value >= thresholds[1]) thresholdLevel = 2;
      }

      return thresholdLevel;
    }
  }, {
    key: "getValue",
    value: function getValue(serie) {
      if (this.match(serie)) {
        var _value = _lodash.default.get(serie.stats, this.aggregation);

        if (_value === undefined || _value === null) {
          _value = serie.datapoints[serie.datapoints.length - 1][0];
        }

        return _value;
      }

      return '-';
    }
  }, {
    key: "getFormattedValue",
    value: function getFormattedValue(serie) {
      value = this.getValue(serie); // Number

      if (this.type === "number") {
        if (!_lodash.default.isFinite(value)) return "Invalid Number";

        if (value === null || value === void 0) {
          return "-";
        }

        var decimals = this.decimalPlaces(value);
        decimals = typeof this.decimals === "number" ? Math.min(this.decimals, decimals) : decimals;
        return _kbn.default.valueFormats[this.unit](value, decimals, null).toString();
      }

      if (this.type === "string") {
        if (_lodash.default.isArray(value)) {
          value = value.join(", ");
        }

        var mappingType = this.mappingType || 0;

        if (mappingType === 1 && this.valueMaps) {
          for (var i = 0; i < this.valueMaps.length; i++) {
            var _map = this.valueMaps[i];
            if (_map.match(value)) return _map.getFormattedText(value);
          }

          return '-';
        }

        if (mappingType === 2 && this.rangeMaps) {
          for (var _i = 0; _i < this.rangeMaps.length; _i++) {
            var _map2 = this.rangeMaps[_i];
            if (_map2.match(value)) return _map2.getFormattedText(value);
          }

          return '-';
        }

        if (value === null || value === void 0) {
          return "-";
        }
      }

      if (this.type === "date") {
        if (value === undefined || value === null) {
          return "-";
        }

        if (_lodash.default.isArray(value)) {
          value = value[0];
        }

        var date = (0, _moment.default)(value); // if (this.dashboard.isTimezoneUtc()) {
        //     date = date.utc();
        // }

        return date.format(this.dateFormat);
      }
    }
  }, {
    key: "defaultValueFormatter",
    value: function defaultValueFormatter(value, rule) {
      if (value === null || value === void 0 || value === undefined) {
        return "";
      }

      if (_lodash.default.isArray(value)) {
        value = value.join(", ");
      }

      if (this.sanitize) {
        return this.$sanitize(value);
      } else {
        return _lodash.default.escape(value);
      }
    }
  }, {
    key: "decimalPlaces",
    value: function decimalPlaces(num) {
      var match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

      if (!match) {
        return 0;
      }

      return Math.max(0, // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0) - ( // Adjust for scientific notation.
      match[2] ? +match[2] : 0));
    }
  }]);

  return Rule;
}(); //
// ShapeMap Class
//


exports.default = Rule;

var ShapeMap =
/*#__PURE__*/
function () {
  function ShapeMap(rule, pattern) {
    _classCallCheck(this, ShapeMap);

    this.rule = rule;
    this.pattern = pattern;
    this.hidden = false;
  }

  _createClass(ShapeMap, [{
    key: "match",
    value: function match(text) {
      if (text === undefined || text === null || text.length === 0) return false;

      var regex = _kbn.default.stringToJsRegex(this.pattern);

      var matching = text.match(regex);
      if (this.pattern == text || matching) return true;
      return false;
    }
  }, {
    key: "show",
    value: function show() {
      this.hidden = false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.hidden = true;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.hidden;
    }
  }, {
    key: "migrate",
    value: function migrate(obj) {}
  }, {
    key: "import",
    value: function _import(obj) {}
  }, {
    key: "export",
    value: function _export() {}
  }]);

  return ShapeMap;
}(); //
// TextMap Class
//


var TextMap =
/*#__PURE__*/
function () {
  function TextMap(rule, pattern) {
    _classCallCheck(this, TextMap);

    this.rule = rule;
    this.pattern = pattern;
    this.hidden = false;
  }

  _createClass(TextMap, [{
    key: "match",
    value: function match(text) {
      if (text === undefined || text === null || text.length === 0) return false;

      var regex = _kbn.default.stringToJsRegex(this.pattern);

      var matching = text.match(regex);
      if (this.pattern == text || matching) return true;
      return false;
    }
  }, {
    key: "getFormattedText",
    value: function getFormattedText(value) {
      var rule = this.rule;
      var formattedText = rule.getFormattedText(value);
      if (rule.textOn == "n") formattedText = "";
      if (rule.textOn == "wc" && rule.getThresholdLevel(value) < 1) formattedText = "";
      if (_style.textOn == "co" && level != 3) formattedText = "";
      return formattedText;
    }
  }, {
    key: "show",
    value: function show() {
      this.hidden = false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.hidden = true;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.hidden;
    }
  }]);

  return TextMap;
}(); //
// LinkMap Class
//


var LinkMap =
/*#__PURE__*/
function () {
  function LinkMap(rule, pattern) {
    _classCallCheck(this, LinkMap);

    this.rule = rule;
    this.pattern = pattern;
    this.hidden = false;
  }

  _createClass(LinkMap, [{
    key: "match",
    value: function match(text) {
      if (text === undefined || text === null || text.length === 0) return false;

      var regex = _kbn.default.stringToJsRegex(this.pattern);

      var matching = text.match(regex);
      if (this.pattern == text || matching) return true;
      return false;
    }
  }, {
    key: "show",
    value: function show() {
      this.hidden = false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.hidden = true;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.hidden;
    }
  }]);

  return LinkMap;
}(); //
// RangeMap Class
//


var RangeMap =
/*#__PURE__*/
function () {
  function RangeMap(from, to, text) {
    _classCallCheck(this, RangeMap);

    this.from = from;
    this.to = to;
    this.text = text;
    this.hidden = false;
  }

  _createClass(RangeMap, [{
    key: "match",
    value: function match(value) {
      if (this.from === "null" && this.to === "null") {
        return true;
      }

      if (value === null) {
        if (this.from === "null" && this.to === "null") {
          true;
        }
      }

      if (Number(map.from) <= Number(value) && Number(map.to) >= Number(value)) return true;
      return false;
    }
  }, {
    key: "getFormattedText",
    value: function getFormattedText(value, rule) {
      if (value === null) {
        if (this.from === "null" && this.to === "null") {
          return this.text;
        }
      }

      if (this.match(value)) {
        return this.defaultValueFormatter(this.text, rule);
      } else return '-';
    }
  }, {
    key: "show",
    value: function show() {
      this.hidden = false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.hidden = true;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.hidden;
    }
  }]);

  return RangeMap;
}(); //
// ValueMap Class
//


var ValueMap =
/*#__PURE__*/
function () {
  function ValueMap(rule, value, text) {
    _classCallCheck(this, ValueMap);

    this.rule = rule;
    this.value = value;
    this.text = text;
    this.hidden = false;
  }

  _createClass(ValueMap, [{
    key: "match",
    value: function match(value) {
      if (value === null || value === undefined) {
        if (this.value === "null") {
          return true;
        }
      }

      if (!_lodash.default.isString(value) && Number(this.value) === Number(value)) {
        return true;
      }

      var regex = _kbn.default.stringToJsRegex(this.value);

      var matching = text.match(regex);
      if (this.pattern == text || matching) return true;else return false;
    }
  }, {
    key: "getFormattedText",
    value: function getFormattedText(value) {
      var rule = this.rule;

      if (value === null) {
        if (this.value === "null") {
          return this.text;
        }
      }

      if (this.match(value)) {
        return this.defaultValueFormatter(this.text, rule);
      } else return '-';
    }
  }, {
    key: "show",
    value: function show() {
      this.hidden = false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.hidden = true;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.hidden;
    }
  }]);

  return ValueMap;
}();
