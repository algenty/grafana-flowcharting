"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var State =
/*#__PURE__*/
function () {
  /** @ngInject */
  function State(pattern) {
    _classCallCheck(this, State);

    this.pattern = pattern;
    this.level = -1;
    this.value = '-';
    this.hidden = false; // shapeColors : { style (mxgraph), color, level } 

    shapeColors = []; // textValues : { formattedValue, isPattern, textPattern, level }

    textValues = []; // linkUrls :  { url, mode : tab or curr window, level }

    linkUrls = [];
  } // set Color and level if higher


  _createClass(State, [{
    key: "setColorShape",
    value: function setColorShape(value, rule, color, level) {
      var shapeColor = _.find(this.shapeColors, function (shape) {
        return rule.colorMode === shape.style;
      });

      if (shapeColor != undefined && shapeColor != null) {
        if (shapeColor.level <= level) {
          shapeColor.level = level;
          shape.Color.color = color;
        } // else ignore

      } else {
        this.shapeColors.push({
          'style': rule.colorMode,
          'color': color,
          'level': level
        });
      }
    }
  }, {
    key: "getColorShape",
    value: function getColorShape(style) {
      var shapeColor = _.find(this.shapeColors, function (shape) {
        return style = shape.style;
      });

      if (shapeColor != undefined && shapeColor != null) return null;else return shapeColor.color;
    }
  }, {
    key: "setTextValue",
    value: function setTextValue(value, rule, level) {
      var formattedValue = this.getFormattedValue(value, rule);

      var textValue = _.find(this.textValues, function (text) {
        text.level === level;
      });

      if (textValue != undefined && textValue != null) {
        if (textValue.level >= level) {
          textValue;
        }
      }
    }
  }, {
    key: "getText",
    value: function getText() {}
  }, {
    key: "setLink",
    value: function setLink(value, rule, level) {}
  }, {
    key: "getLink",
    value: function getLink() {}
  }, {
    key: "setValue",
    value: function setValue(value, level) {
      if (level >= this.level) {
        this.level = level;
        this.value = value;
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }, {
    key: "setFormattedValue",
    value: function setFormattedValue(value, rule, level) {}
  }, {
    key: "getFormattedValue",
    value: function getFormattedValue(rule) {}
  }, {
    key: "getFormattedValue",
    value: function getFormattedValue(value, style) {
      // console.log("getFormattedValue style", style)
      if (style.type === "number") {
        if (!_.isFinite(value)) return "Invalid Number";

        if (value === null || value === void 0) {
          return "-";
        }

        var decimals = this.decimalPlaces(value);
        decimals = typeof style.decimals === "number" ? Math.min(style.decimals, decimals) : decimals;
        return kbn.valueFormats[style.unit](value, decimals, null).toString();
      }

      if (style.type === "string") {
        if (_.isArray(value)) {
          value = value.join(", ");
        }

        var mappingType = style.mappingType || 0;

        if (mappingType === 1 && style.valueMaps) {
          for (var i = 0; i < style.valueMaps.length; i++) {
            var map = style.valueMaps[i];

            if (value === null) {
              if (map.value === "null") {
                return map.text;
              }

              continue;
            } // Allow both numeric and string values to be mapped


            if (!_.isString(value) && Number(map.value) === Number(value) || map.value === value) {
              return this.defaultValueFormatter(map.text, style);
            }
          }
        }

        if (mappingType === 2 && style.rangeMaps) {
          for (var _i = 0; _i < style.rangeMaps.length; _i++) {
            var _map = style.rangeMaps[_i];

            if (value === null) {
              if (_map.from === "null" && _map.to === "null") {
                return _map.text;
              }

              continue;
            }

            if (Number(_map.from) <= Number(value) && Number(_map.to) >= Number(value)) {
              return this.defaultValueFormatter(_map.text, style);
            }
          }
        }

        if (value === null || value === void 0) {
          return "-";
        }

        return this.defaultValueFormatter(value, style);
      }

      if (style.type === "date") {
        if (value === undefined || value === null) {
          return "-";
        }

        if (_.isArray(value)) {
          value = value[0];
        }

        var date = moment(value);

        if (this.dashboard.isTimezoneUtc()) {
          date = date.utc();
        }

        return date.format(style.dateFormat);
      }
    }
  }]);

  return State;
}();

exports.default = State;
