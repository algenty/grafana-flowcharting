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
  function State(cell, graph) {
    _classCallCheck(this, State);

    this.cell = cell;
    this.graph = graph;
    this.cellId = cell.id;
    this.matched = false;
    this.matchedShape = false;
    this.matchedText = false;
    this.matchedLink = false;
    this.globalLevel = -1;
    this.styles = ["fillColor", "strokeColor", "fontColor"];
    this.level = {
      fillColor: -1,
      strokeColor: -1,
      fontColor: -1
    };
    this.currentColors = {
      fillColor: cell.style["fillColor"],
      strokeColor: cell.style["strokeColor"],
      fontColor: cell.style["fontColor"]
    };
    this.originalColors = {
      fillColor: cell.style["fillColor"],
      strokeColor: cell.style["strokeColor"],
      fontColor: cell.style["fontColor"]
    };
    this.originalValue = cell.getValue();
    this.currentValue = cell.getValue();
    this.originalLink = cell.getAttribute("link");
    this.currentLink = cell.getAttribute("link");
  }

  _createClass(State, [{
    key: "setState",
    value: function setState(rule, serie) {
      var _this = this;

      if (rule.matchSerie(serie)) {
        var shapeMaps = rule.getShapeMaps();
        var textMaps = rule.getTextMaps();
        var linkMaps = rule.getTextMaps();
        var value = rule.getValueForSerie(serie);
        var FormattedValue = rule.getFormattedValue(value);
        var level = rule.getThresholdLevel(value); //SHAPE

        var cellProp = this.getCellProp(rule.shapeProp);
        shapeMaps.forEach(function (shape) {
          if (!shape.isHidden() && shape.match(cellProp)) {
            _this.matchedShape = true;
            _this.matched = true;

            if (_this.globalLevel <= level) {
              _this.setLevelStyle(rule.style, level);

              if (rule.toColorize()) {
                _this.setColorStyle(rule.style, rule.getColorForValue(value));
              }
            }
          }
        }); //TEXT

        cellProp = this.getCellProp(rule.textProp);
        textMaps.forEach(function (text) {
          if (!text.isHidden() && text.match(cellProp)) {
            _this.matchedText = true;
            _this.matched = true;

            if (_this.globalLevel <= level) {
              _this.setText(rule.getReplaceText(_this.originalValue, FormattedValue));
            }
          }
        }); // LINK

        cellProp = this.getCellProp(rule.linkProp);
        linkMaps.forEach(function (link) {
          if (!link.isHidden() && link.match(cellProp)) {
            _this.matchedLink = true;
            _this.matched = true;
          }
        });
      }
    }
  }, {
    key: "unsetState",
    value: function unsetState() {
      this.unsetLevel();
      this.unsetColor();
      this.unsetText();
      this.unsetLink();
      this.matched = false;
      this.matchedShape = false;
      this.matchedText = false;
      this.matchedLink = false;
    }
  }, {
    key: "getCellProp",
    value: function getCellProp(prop) {
      if (prop === "id") return this.cellId;
      if (prop === "value") return this.originalValue;
    }
  }, {
    key: "setColorStyle",
    value: function setColorStyle(style, color) {
      this.currentColors[style] = color; // this.graph.setCellStyles(style, color, [this.cell]);
    }
  }, {
    key: "unsetColorStyle",
    value: function unsetColorStyle(style) {
      var color = this.originalColors[style];
      this.currentColors[style] = color; // this.graph.setCellStyles(style, color, [this.cell]);
    }
  }, {
    key: "unsetColor",
    value: function unsetColor() {
      var _this2 = this;

      this.styles.forEach(function (style) {
        _this2.unsetColorStyle(style);
      });
    }
  }, {
    key: "getCurrentColorStyle",
    value: function getCurrentColorStyle(style) {
      return this.currentColors[style];
    }
  }, {
    key: "unsetLevelStyle",
    value: function unsetLevelStyle(style) {
      this.level[style] = -1;
    }
  }, {
    key: "unsetLevel",
    value: function unsetLevel() {
      var _this3 = this;

      this.styles.forEach(function (style) {
        _this3.unsetLevelStyle(style);
      });
    }
  }, {
    key: "setLevelStyle",
    value: function setLevelStyle(style, level) {
      this.level[style] = level;
      if (this.globalLevel < level) this.globalLevel = level;
    }
  }, {
    key: "getLevelStyle",
    value: function getLevelStyle(style) {
      return this.level[style];
    }
  }, {
    key: "getLevel",
    value: function getLevel() {
      return this.globalLevel;
    }
  }, {
    key: "setText",
    value: function setText(text) {
      this.currentValue = text; // this.cell.setValue(text);
    }
  }, {
    key: "getCurrentText",
    value: function getCurrentText() {
      return this.currentValue;
    }
  }, {
    key: "unsetText",
    value: function unsetText() {
      this.currentValue = this.originalValue;
    }
  }, {
    key: "setLink",
    value: function setLink(url) {
      this.currentLink = url;
    }
  }, {
    key: "unsetLink",
    value: function unsetLink() {
      this.currentLink = this.originalLink;
    }
  }, {
    key: "getCurrentLink",
    value: function getCurrentLink() {
      return this.currentLink;
    }
  }, {
    key: "isGradient",
    value: function isGradient() {//TODO:
    }
  }, {
    key: "isShape",
    value: function isShape() {
      return this.cell.isVertex();
    }
  }, {
    key: "isConnector",
    value: function isConnector() {
      return this.cell.isEdge();
    }
  }, {
    key: "updateCell",
    value: function updateCell() {
      var _this4 = this;

      if (this.matchedShape) {
        this.styles.forEach(function (style) {
          _this4.graph.setCellStyles(style, _this4.getCurrentColorStyle(style), [_this4.cell]);
        });
      }

      if (this.matchedText) {
        this.cell.setValue(this.getCurrentText());
      } //TODO:LINK

    }
  }, {
    key: "restoreCell",
    value: function restoreCell() {
      var _this5 = this;

      this.unsetState();
      this.styles.forEach(function (style) {
        _this5.graph.setCellStyles(style, _this5.getCurrentColorStyle(style), [_this5.cell]);
      });
      this.cell.setValue(this.getCurrentText());
      this.cell.setAttribut("link", this.getCurrentLink());
    }
  }]);

  return State;
}();

exports.default = State;
