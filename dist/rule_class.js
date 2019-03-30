"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import kbn from "app/core/utils/kbn";
var Rule =
/*#__PURE__*/
function () {
  /** @ngInject */
  function Rule(pattern) {
    _classCallCheck(this, Rule);

    this.unit = "short";
    this.type = "number";
    this.alias = "";
    this.aggregation = "current";
    this.decimals = 2;
    this.colors = ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"];
    this.style = 'fillColor';
    this.colorOn = "a";
    this.textOn = "wmd";
    this.textReplace = "content";
    this.textPattern = "/.*/";
    this.pattern = pattern;
    this.dateFormat = "YYYY-MM-DD HH:mm:ss";
    this.thresholds = [];
    this.invert = false;
    this.shapeProp = "id";
    this.shapeMaps = [];
    this.textProp = "id";
    this.textMaps = [];
    this.linkProp = "id";
    this.linkMaps = [];
    this.mappingType = 1;
    this.valueMaps = [];
    this.rangeMaps = [];
    this.sanitize = false;
  }

  _createClass(Rule, [{
    key: "export",
    value: function _export() {
      var sm = [];
      var tm = [];
      var lm = [];
      var vm = [];
      var rm = [];
      this.shapeMaps.forEach(function (element) {
        sm.push(element.export());
      });
      this.textMaps.forEach(function (element) {
        tm.push(element.export());
      });
      this.linkMaps.forEach(function (element) {
        lm.push(element.export());
      });
      this.valueMaps.forEach(function (element) {
        vm.push(element.export());
      });
      this.rangeMaps.forEach(function (element) {
        rm.push(element.export());
      });
      return {
        unit: this.unit,
        type: this.type,
        alias: this.alias,
        aggregation: this,
        decimals: this.decimals,
        colors: this.colors,
        style: this.style,
        colorOn: this.colorOn,
        textOn: this.textOn,
        textReplace: this.textReplace,
        textPattern: this.textPattern,
        pattern: this.pattern,
        dateFormat: this.dateFormat,
        thresholds: this.thresholds,
        invert: this.invert,
        shapeProp: this.shapeProp,
        shapeMaps: sm,
        textProp: this.textProp,
        textMaps: tm,
        linkProp: this.linkProp,
        linkMaps: lm,
        mappingType: this.mappingType,
        valueMaps: vm,
        rangeMaps: rm,
        sanitize: this.sanitize
      };
    }
  }, {
    key: "import",
    value: function _import(obj) {
      var _this = this;

      this.unit = obj.unit;
      this.type = obj.type;
      this.alias = obj.alias;
      this.aggregation = obj.aggregation;
      this.decimals = obj.decimals;
      this.colors = obj.colors;
      this.style = obj.style;
      this.colorOn = obj.colorOn;
      this.textOn = obj.textOn;
      this.textReplace = obj.textReplace;
      this.textPattern = obj.textPattern;
      this.pattern = obj.pattern;
      this.dateFormat = obj.dateFormat;
      this.thresholds = obj.thresholds;
      this.invert = obj.invert;
      this.shapeProp = obj.shapeProp;
      this.shapeMaps = [];
      obj.shapeMaps.forEach(function (element) {
        var sm = new ShapeMap(_this, "");
        sm.import();

        _this.shapeMaps.push();
      });
      this.textProp = "id";
      this.textMaps = [];
      this.linkProp = "id";
      this.linkMaps = [];
      this.mappingType = 1;
      this.valueMaps = [];
      this.rangeMaps = [];
      this.sanitize = false;
    }
  }, {
    key: "migrate",
    value: function migrate(obj, version) {}
  }, {
    key: "invertColorOrder",
    value: function invertColorOrder() {
      var ref = this.colors;
      var copy = ref[0];
      ref[0] = ref[2];
      ref[2] = copy;
      if (this.invert) this.invert = false;else this.invert = true;
    }
  }, {
    key: "newColor",
    value: function newColor(index, color) {
      var _this2 = this;

      return function (newColor) {
        _this2.colors[index] = color;
      };
    } //
    // Conditions
    //

  }, {
    key: "toColorize",
    value: function toColorize(value) {
      if (this.colorOn === "a") return true;
      if (this.colorOn === "wc" && this.getThresholdLevel(value) >= 1) return true;
      return false;
    } //
    // Series
    //

  }, {
    key: "matchSerie",
    value: function matchSerie(serie) {
      if (this.pattern === null || this.pattern === undefined) return false;
      return u.matchString(serie.alias, this.pattern);
    } //
    // SHAPE MAPS
    //

  }, {
    key: "addShapeMap",
    value: function addShapeMap(pattern) {
      var m = new ShapeMap(this, pattern);
      this.shapeMaps.push(m);
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
      return this.shapeMaps;
    }
  }, {
    key: "matchShape",
    value: function matchShape(pattern) {
      var found = false;
      this.shapeMaps.forEach(function (element) {
        if (element.match(pattern)) found = true;
      });
      return found;
    } //
    // TEXT MAPS
    //

  }, {
    key: "addTextMap",
    value: function addTextMap(pattern) {
      var m = new TextMap(this, pattern);
      this.textMaps.push(m);
    }
  }, {
    key: "removeTextMap",
    value: function removeTextMap(index) {
      var m = this.textMaps[index];
      this.textMaps = _.without(this.textMaps, m);
    }
  }, {
    key: "getTextMap",
    value: function getTextMap(index) {
      return this.textMaps[index];
    }
  }, {
    key: "getTextMaps",
    value: function getTextMaps() {
      return this.textMaps;
    }
  }, {
    key: "matchText",
    value: function matchText(pattern) {
      var found = false;
      this.textMaps.forEach(function (element) {
        if (element.match(pattern)) found = true;
      });
      return found;
    } //
    // LINK MAPS
    //

  }, {
    key: "addLinkMap",
    value: function addLinkMap(pattern) {
      var m = new LinkMap(this, pattern);
      this.linkMaps.push(m);
    }
  }, {
    key: "removeLinkMap",
    value: function removeLinkMap(index) {
      var m = this.linkMaps[index];
      this.linkMaps = _.without(this.linkMaps, m);
    }
  }, {
    key: "getLinkMap",
    value: function getLinkMap(index) {
      return this.linkMaps[index];
    }
  }, {
    key: "getLinkMaps",
    value: function getLinkMaps() {
      return this.linkMaps;
    }
  }, {
    key: "matchLink",
    value: function matchLink(pattern) {
      var found = false;
      this.linkMaps.forEach(function (element) {
        if (element.match(pattern)) found = true;
      });
      return found;
    } //
    // STRING VALUE MAPS
    //

  }, {
    key: "addValueMap",
    value: function addValueMap(value, text) {
      var m = new ValueMap(this, value, text);
      this.valueMaps.push(m);
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
      return this.valueMaps;
    } //
    // STRING RANGE VALUE MAPS
    //

  }, {
    key: "addRangeMap",
    value: function addRangeMap(from, to, text) {
      var m = new ValueMap(this, from, to, text);
      this.rangeMaps.push(m);
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
      return this.rangeMaps;
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
        if (value >= this.thresholds[i - 1]) {
          return this.colors[i];
        }
      }

      return _.first(this.colors);
    }
  }, {
    key: "getThresholdLevel",
    value: function getThresholdLevel(value) {
      var thresholdLevel = 0;
      var thresholds = this.thresholds;
      if (thresholds === undefined || thresholds.length == 0) return -1;
      if (thresholds.length !== 2) return -1; // non invert

      if (!this.invert) {
        thresholdLevel = 2;
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
    key: "getValueForSerie",
    value: function getValueForSerie(serie) {
      if (this.matchSerie(serie)) {
        var value = _.get(serie.stats, this.aggregation);

        if (value === undefined || value === null) {
          value = serie.datapoints[serie.datapoints.length - 1][0];
        }

        return value;
      }

      return '-';
    }
  }, {
    key: "getFormattedValueForSerie",
    value: function getFormattedValueForSerie(serie) {
      var formattedValue = this.getValueForSerie(serie);
      return this.getFormattedValue(formattedValue);
    }
  }, {
    key: "getFormattedValue",
    value: function getFormattedValue(value) {
      // Number
      if (this.type === "number") {
        if (!_.isFinite(value)) return "Invalid Number";

        if (value === null || value === void 0) {
          return "-";
        }

        var decimals = this.decimalPlaces(value);
        decimals = typeof this.decimals === "number" ? Math.min(this.decimals, decimals) : decimals;
        return formatValue(value, this.unit, this.decimals);
      }

      if (this.type === "string") {
        if (_.isArray(value)) {
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

        if (_.isArray(value)) {
          value = value[0];
        }

        var date = moment(value); // if (this.dashboard.isTimezoneUtc()) {
        //     date = date.utc();
        // }

        return date.format(this.dateFormat);
      }
    }
  }, {
    key: "getReplaceText",
    value: function getReplaceText(text, FormattedValue) {
      if (this.textReplace === 'content') return FormattedValue;else {
        var regexVal = u.stringToJsRegex(this.textPattern);
        if (text.toString().match(regexVal)) return text.toString().replace(regexVal, FormattedValue);
      }
      return text;
    }
  }, {
    key: "defaultValueFormatter",
    value: function defaultValueFormatter(value, rule) {
      if (value === null || value === void 0 || value === undefined) {
        return "";
      }

      if (_.isArray(value)) {
        value = value.join(", ");
      }

      if (this.sanitize) {
        return this.$sanitize(value);
      } else {
        return _.escape(value);
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

    this.id = u.uniqueID();
    this.rule = rule;
    this.pattern = pattern;
    this.hidden = false;
  }

  _createClass(ShapeMap, [{
    key: "match",
    value: function match(text) {
      if (text === undefined || text === null || text.length === 0) return false;
      return u.matchString(text, this.pattern);
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
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
    value: function migrate(obj, version) {
      this.pattern = obj.pattern != null && obj.pattern != undefined ? obj.pattern : "/.*/";
      this.hidden = obj.hidden != null && obj.hidden != undefined ? obj.hidden : false;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      this.pattern = obj.pattern;
      this.hidden = obj.hidden;
    }
  }, {
    key: "export",
    value: function _export() {
      return {
        'pattern': this.pattern,
        'hidden': this.hidden
      };
    }
  }, {
    key: "toColorize",
    value: function toColorize(value) {
      if (this.hidden) return false;
      return this.rule.toColorize(value);
    }
  }, {
    key: "toVisible",
    value: function toVisible() {
      if (this.hidden) return false;
      return true;
    }
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

    this.id = u.uniqueID();
    this.rule = rule;
    this.pattern = pattern;
    this.hidden = false;
  }

  _createClass(TextMap, [{
    key: "match",
    value: function match(text) {
      if (text === undefined || text === null || text.length === 0) return false;
      return u.matchString(text, this.pattern);
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
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
    value: function migrate(obj, version) {
      this.pattern = obj.pattern != null && obj.pattern != undefined ? obj.pattern : "/.*/";
      this.hidden = obj.hidden != null && obj.hidden != undefined ? obj.hidden : false;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      this.pattern = obj.pattern;
      this.hidden = obj.hidden;
    }
  }, {
    key: "export",
    value: function _export() {
      return {
        'pattern': this.pattern,
        'hidden': this.hidden
      };
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

    this.id = u.uniqueID();
    this.rule = rule;
    this.pattern = pattern;
    this.hidden = false;
  }

  _createClass(LinkMap, [{
    key: "match",
    value: function match(text) {
      if (text === undefined || text === null || text.length === 0) return false;
      return u.matchString(text, this.pattern);
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
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
    value: function migrate(obj, version) {
      this.pattern = obj.pattern != null && obj.pattern != undefined ? obj.pattern : "/.*/";
      this.hidden = obj.hidden != null && obj.hidden != undefined ? obj.hidden : false;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      this.pattern = obj.pattern;
      this.hidden = obj.hidden;
    }
  }, {
    key: "export",
    value: function _export() {
      return {
        'pattern': this.pattern,
        'hidden': this.hidden
      };
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

    this.id = u.uniqueID();
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
    key: "getId",
    value: function getId() {
      return this.id;
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
  }, {
    key: "migrate",
    value: function migrate(obj, version) {
      this.from = obj.from != null && obj.from != undefined ? obj.from : "";
      this.to = obj.to != null && obj.to != undefined ? obj.to : "";
      this.text = obj.text != null && obj.text != undefined ? obj.text : "";
      this.hidden = obj.hidden != null && obj.hidden != undefined ? obj.hidden : false;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      this.from = obj.from != null && obj.from != undefined ? obj.from : "";
      this.to = obj.to != null && obj.to != undefined ? obj.to : "";
      this.text = obj.text != null && obj.text != undefined ? obj.text : "";
      this.hidden = obj.hidden != null && obj.hidden != undefined ? obj.hidden : false;
    }
  }, {
    key: "export",
    value: function _export() {
      return {
        'from': this.from,
        'to': this.to,
        'text': this.text,
        'hidden': this.hidden
      };
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

    this.id = u.uniqueID();
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

      if (!_.isString(value) && Number(this.value) === Number(value)) {
        return true;
      }

      var regex = u.stringToJsRegex(this.value);
      var matching = text.match(regex);
      if (this.pattern == text || matching) return true;else return false;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
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
  }, {
    key: "migrate",
    value: function migrate(obj, version) {
      this.value = obj.value != null && obj.value != undefined ? obj.value : "/.*/";
      this.text = obj.text != null && obj.text != undefined ? obj.text : "/.*/";
      this.hidden = obj.hidden != null && obj.hidden != undefined ? obj.hidden : false;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      this.value = obj.value;
      this.text = obj.text;
      this.hidden = obj.hidden;
    }
  }, {
    key: "export",
    value: function _export() {
      return {
        'value': this.value,
        'text': this.text,
        'hidden': this.hidden
      };
    }
  }]);

  return ValueMap;
}();

function formatValue(value, unit, decimals) {
  return kbn.valueFormats[unit](value, decimals, null).toString();
}
