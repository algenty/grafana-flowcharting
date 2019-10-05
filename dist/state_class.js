"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var State = function () {
  function State(mxcell, xgraph, ctrl) {
    var _this = this;

    _classCallCheck(this, State);

    u.log(1, 'State.constructor()');
    this.mxcell = mxcell;
    this.cellId = mxcell.id;
    this.xgraph = xgraph;
    this.ctrl = ctrl;
    this.templateSrv = this.ctrl.templateSrv;
    this.changed = false;
    this.changedShape = false;
    this.changedStyle = {
      fillColor: false,
      strokeColor: false,
      fontColor: false
    };
    this.changedText = false;
    this.changedLink = false;
    this.matched = false;
    this.matchedShape = false;
    this.matchedStyle = {
      fillColor: false,
      strokeColor: false,
      fontColor: false
    };
    this.matchedText = false;
    this.matchedLink = false;
    this.globalLevel = -1;
    this.styleKeys = ['fillColor', 'strokeColor', 'fontColor'];
    this.level = {
      fillColor: -1,
      strokeColor: -1,
      fontColor: -1
    };
    this.tooltips = [];
    this.currentColors = {};
    this.originalColors = {};
    this.originalStyle = mxcell.getStyle();
    this.originalText = this.xgraph.getLabel(mxcell);
    this.currentText = this.originalText;
    var link = this.xgraph.getLink(mxcell);
    if (link === undefined) link = null;
    this.originalLink = link;
    this.currentLink = link;
    this.styleKeys.forEach(function (style) {
      var color = _this.xgraph.getStyleCell(mxcell, style);

      _this.currentColors[style] = color;
      _this.originalColors[style] = color;
    });
  }

  _createClass(State, [{
    key: "setState",
    value: function setState(rule, serie) {
      var _this2 = this;

      u.log(1, 'State.setState()');
      u.log(0, 'State.setState() Rule', rule);
      u.log(0, 'State.setState() Serie', serie);

      if (rule.matchSerie(serie)) {
        var shapeMaps = rule.getShapeMaps();
        var textMaps = rule.getTextMaps();
        var linkMaps = rule.getLinkMaps();
        var value = rule.getValueForSerie(serie);
        var FormattedValue = rule.getFormattedValue(value);
        var level = rule.getThresholdLevel(value);
        var color = rule.getColorForLevel(level);
        var tooltipTimeFormat = 'YYYY-MM-DD HH:mm:ss';
        var time = this.ctrl.dashboard.formatDate(new Date(), tooltipTimeFormat);
        var cellProp = this.getCellProp(rule.data.shapeProp);
        shapeMaps.forEach(function (shape) {
          if (!shape.isHidden() && shape.match(cellProp)) {
            _this2.matchedShape = true;
            _this2.matched = true;

            if (rule.toTooltipize(level)) {
              if (rule.data.tooltipColors) _this2.addTooltipValue(rule.data.tooltipLabel, FormattedValue, color);else _this2.addTooltipValue(rule.data.tooltipLabel, FormattedValue, null);
              _this2.lastChange = time;
            }

            if (_this2.globalLevel <= level) {
              _this2.setLevelStyle(rule.data.style, level);

              if (rule.toColorize(level)) {
                _this2.setColorStyle(rule.data.style, color);

                _this2.matchedStyle[rule.data.style] = true;
              } else if (_this2.changedShape) {
                if (_this2.changedStyle[rule.data.style]) _this2.unsetColorStyle(rule.data.style);
              }

              _this2.overlayIcon = rule.toIconize(level);
            }
          }
        });
        cellProp = this.getCellProp(rule.data.textProp);
        textMaps.forEach(function (text) {
          if (!text.isHidden() && text.match(cellProp)) {
            _this2.matchedText = true;
            _this2.matched = true;

            if (rule.toLabelize(level)) {
              var textScoped = _this2.templateSrv.replaceWithText(FormattedValue);

              _this2.setText(rule.getReplaceText(_this2.currentText, textScoped));
            } else {
              _this2.setText(rule.getReplaceText(_this2.currentText, ''));
            }
          }
        });
        cellProp = this.getCellProp(rule.data.linkProp);
        linkMaps.forEach(function (link) {
          if (!link.isHidden() && link.match(cellProp)) {
            _this2.matchedLink = true;
            _this2.matched = true;

            if (_this2.globalLevel <= level) {
              if (rule.toLinkable(level)) {
                var linkScoped = _this2.templateSrv.replaceWithText(rule.getLink());

                _this2.setLink(linkScoped);
              }
            }
          }
        });
      }

      u.log(0, 'State.setState() state', this);
    }
  }, {
    key: "unsetState",
    value: function unsetState() {
      var _this3 = this;

      u.log(1, 'State.unsetState()');
      this.lastChange = null;
      this.unsetLevel();
      this.resetStyle();
      this.unsetText();
      this.unsetLink();
      this.unsetTooltip();
      this.matched = false;
      this.matchedShape = false;
      this.styleKeys.forEach(function (key) {
        _this3.matchedStyle[key] = false;
      });
      this.matchedText = false;
      this.matchedLink = false;
    }
  }, {
    key: "isMatched",
    value: function isMatched() {
      return this.matched;
    }
  }, {
    key: "isChanged",
    value: function isChanged() {
      return this.changed;
    }
  }, {
    key: "getCellProp",
    value: function getCellProp(prop) {
      if (prop === 'id') return this.cellId;
      if (prop === 'value') return this.originalText;
      return '/!\\ Not found';
    }
  }, {
    key: "setColorStyle",
    value: function setColorStyle(style, color) {
      u.log(1, 'State.setColorStyle()');
      this.currentColors[style] = color;
    }
  }, {
    key: "unsetColorStyle",
    value: function unsetColorStyle(style) {
      this.currentColors[style] = this.originalColors[style];
    }
  }, {
    key: "unsetColor",
    value: function unsetColor() {
      var _this4 = this;

      this.styleKeys.forEach(function (style) {
        _this4.unsetColorStyle(style);
      });
    }
  }, {
    key: "unsetLevelStyle",
    value: function unsetLevelStyle(style) {
      this.level[style] = -1;
    }
  }, {
    key: "unsetTooltip",
    value: function unsetTooltip() {
      this.tooltips = [];
      this.mxcell.GF_tooltips = undefined;
      this.mxcell.GF_lastChange = undefined;
    }
  }, {
    key: "unsetLevel",
    value: function unsetLevel() {
      var _this5 = this;

      this.styleKeys.forEach(function (key) {
        _this5.unsetLevelStyle(key);
      });
      this.globalLevel = -1;
    }
  }, {
    key: "setLevelStyle",
    value: function setLevelStyle(style, level) {
      u.log(1, 'State.setLevelStyle()');
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
    key: "getTextLevel",
    value: function getTextLevel() {
      var level = this.getLevel();

      switch (level) {
        case -1:
          return 'NO DATA';

        case 0:
          return 'OK';

        case 1:
          return 'WARN';

        case 2:
          return 'ERROR';

        default:
          return 'NULL';
      }
    }
  }, {
    key: "setText",
    value: function setText(text) {
      this.currentText = text;
    }
  }, {
    key: "unsetText",
    value: function unsetText() {
      this.currentText = this.originalText;
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
    key: "addTooltipValue",
    value: function addTooltipValue(name, value, color) {
      u.log(1, 'State.addTooltipValue()');
      u.log(0, 'State.addTooltipValue() name', name);
      u.log(0, 'State.addTooltipValue() value', value);
      var element = this.findTooltipValue(name);

      if (element === null) {
        element = {
          name: name,
          value: value,
          color: color
        };
        this.tooltips.push(element);
      } else {
        element.value = value;
        element.color = color;
      }
    }
  }, {
    key: "findTooltipValue",
    value: function findTooltipValue(name) {
      for (var index = 0; index < this.tooltips.length; index += 1) {
        var element = this.tooltips[index];
        if (element.name === name) return element;
      }

      return null;
    }
  }, {
    key: "isGradient",
    value: function isGradient() {}
  }, {
    key: "isShape",
    value: function isShape() {
      return this.mxcell.isVertex();
    }
  }, {
    key: "isConnector",
    value: function isConnector() {
      return this.mxcell.isEdge();
    }
  }, {
    key: "applyShape",
    value: function applyShape() {
      this.changedShape = true;
      this.applyStyle();
      this.applyIcon();
    }
  }, {
    key: "applyStyle",
    value: function applyStyle() {
      var _this6 = this;

      this.styleKeys.forEach(function (key) {
        if (_this6.matchedStyle[key]) {
          var color = _this6.currentColors[key];

          _this6.xgraph.setStyleCell(_this6.mxcell, key, color);

          if (color !== _this6.originalColors[key]) _this6.changedStyle[key] = true;
        }
      });
    }
  }, {
    key: "applyIcon",
    value: function applyIcon() {
      if (this.overlayIcon) {
        this.changedIcon = true;
        this.xgraph.addOverlay(this.getTextLevel(), this.mxcell);
      } else {
        this.xgraph.removeOverlay(this.mxcell);
      }
    }
  }, {
    key: "resetShape",
    value: function resetShape() {
      this.changedShape = false;
      this.resetStyle();
      this.resetIcon();
    }
  }, {
    key: "resetIcon",
    value: function resetIcon() {
      this.changedIcon = false;
      this.xgraph.removeOverlay(this.mxcell);
    }
  }, {
    key: "resetStyle",
    value: function resetStyle() {
      var _this7 = this;

      this.unsetColor();
      this.mxcell.setStyle(this.originalStyle);
      this.styleKeys.forEach(function (key) {
        _this7.changedStyle[key] = false;
      });
    }
  }, {
    key: "applyText",
    value: function applyText() {
      this.changedText = true;
      this.xgraph.setLabelCell(this.mxcell, this.currentText);
    }
  }, {
    key: "resetText",
    value: function resetText() {
      this.changedText = false;
      this.unsetText();
      this.xgraph.setLabelCell(this.mxcell, this.originalText);
    }
  }, {
    key: "applyLink",
    value: function applyLink() {
      this.changedLink = true;
      this.xgraph.addLink(this.mxcell, this.currentLink);
    }
  }, {
    key: "resetLink",
    value: function resetLink() {
      this.changedLink = false;
      this.unsetLink();
      this.xgraph.addLink(this.mxcell, this.originalLink);
    }
  }, {
    key: "applyTooltip",
    value: function applyTooltip() {
      if (this.tooltips.length > 0) {
        this.mxcell.GF_lastChange = this.lastChange;
        this.mxcell.GF_tooltips = this.tooltips;
      }
    }
  }, {
    key: "applyState",
    value: function applyState() {
      u.log(1, 'State.applyState()');

      if (this.matched) {
        this.changed = true;
        this.applyTooltip();

        if (this.matchedShape) {
          this.applyShape();
        } else if (this.changedShape) {
          this.resetShape();
        }

        if (this.matchedText) {
          this.applyText();
        } else if (this.changedText) {
          this.resetText();
        }

        if (this.matchedLink) {
          this.applyLink();
        } else if (this.changedLink) {
          this.resetLink();
        }
      } else if (this.changed) this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.resetShape();
      this.resetText();
      this.resetLink();
      this.changed = false;
    }
  }, {
    key: "prepare",
    value: function prepare() {
      if (this.changed) {
        this.lastChange = null;
        this.unsetLevel();
        this.unsetTooltip();
        this.unsetText();
        this.matched = false;
        this.matchedShape = false;
        this.matchedText = false;
        this.matchedLink = false;
        this.tooltips = [];
      }
    }
  }, {
    key: "highlightCell",
    value: function highlightCell() {
      this.xgraph.highlightCell(this.mxcell);
    }
  }, {
    key: "unhighlightCell",
    value: function unhighlightCell() {
      this.xgraph.unhighlightCell(this.mxcell);
    }
  }]);

  return State;
}();

exports["default"] = State;
