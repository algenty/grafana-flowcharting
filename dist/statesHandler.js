"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _state_class = _interopRequireDefault(require("./state_class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StateHandler =
/*#__PURE__*/
function () {
  /** @ngInject */
  function StateHandler(xgraph, ctrl) {
    _classCallCheck(this, StateHandler);

    u.log(1, 'StateHandler.constructor()');
    this.states = [];
    this.ctrl = ctrl;
    this.templateSrv = this.ctrl.templateSrv;
    this.xgraph = xgraph;
    this.initStates(this.xgraph, ctrl.rulesHandler.getRules());
  }

  _createClass(StateHandler, [{
    key: "initStates",
    value: function initStates(xgraph, rules) {
      var _this = this;

      this.xgraph = xgraph;
      this.states = [];
      var mxcells = this.xgraph.getMxCells(); // NEW

      _.each(mxcells, function (mxcell) {
        var state = _this.getState(mxcell.id);

        var found = false;

        if (state === null) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var rule = _step.value;
              var shapes = rule.getShapeMaps();
              var texts = rule.getTextMaps();
              var links = rule.getLinkMaps(); // SHAPES

              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = shapes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var shape = _step2.value;
                  var name = null;
                  if (rule.data.shapeProp === 'id') name = mxcell.id;else if (rule.data.shapeProp === 'value') name = xgraph.getValueCell(mxcell);else name = null;

                  if (rule.matchShape(name)) {
                    _this.addState(mxcell);

                    found = true;
                    break;
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              if (found) break; // TEXTS

              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = texts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var text = _step3.value;
                  var _name = null;
                  if (rule.data.textProp === 'id') _name = mxcell.id;else if (rule.data.textProp === 'value') _name = xgraph.getValueCell(mxcell);else _name = null;

                  if (rule.matchText(_name) && !_this.isInclude(mxcell)) {
                    _this.addState(mxcell);

                    found = true;
                  }
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                    _iterator3["return"]();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              if (found) break; // LINKS

              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = links[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var link = _step4.value;
                  var _name2 = null;
                  if (rule.data.textProp === 'id') _name2 = mxcell.id;else if (rule.data.textProp === 'value') _name2 = xgraph.getValueCell(mxcell);else _name2 = null;

                  if (rule.matchLink(_name2) && !_this.isInclude(mxcell)) {
                    _this.addState(mxcell);
                  }
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                    _iterator4["return"]();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }

              ;
              if (found) break;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          ;
        }
      }); // OLD
      // _.each(mxcells, mxcell => {
      //   this.addState(mxcell);
      // });

    }
    /**
     * Return array of state
     * @returns {Array} Array of state object
     */

  }, {
    key: "getStates",
    value: function getStates() {
      return this.states;
    }
    /**
     * Find state by Id
     * @param  {string} cellId - Id of cell
     * @returns {state}
     */

  }, {
    key: "getState",
    value: function getState(cellId) {
      var foundState = null;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.states[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var state = _step5.value;
          if (cellId == state.cellId) foundState = state;
          break;
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return foundState;
    }
  }, {
    key: "addState",
    value: function addState(mxcell) {
      var state = new _state_class["default"](mxcell, this.xgraph, this.ctrl);
      this.states.push(state);
    }
  }, {
    key: "removeState",
    value: function removeState(mxcell) {
      this.states = _.without(this.states, mxcell);
    }
  }, {
    key: "countStates",
    value: function countStates() {
      return this.states.length;
    }
  }, {
    key: "countStatesWithLevel",
    value: function countStatesWithLevel(level) {
      var count = 0;
      this.states.forEach(function (state) {
        if (state.getLevel() === level) count += 1;
      });
      return count;
    }
    /**
     * Restore initial status and prepare states object
     */

  }, {
    key: "prepare",
    value: function prepare() {
      this.states.forEach(function (state) {
        state.prepare();
      });
    }
    /**
     * Change states according to rules and datas from grafana
     * @param  {} rules
     * @param  {} series
     */

  }, {
    key: "setStates",
    value: function setStates(rules, series) {
      u.log(1, 'StateHandler.setStates()');
      u.log(0, 'StatesHandler.setStates() Rules', rules);
      u.log(0, 'StatesHandler.setStates() Series', series);
      u.log(0, 'StatesHandler.setStates() States', this.states);
      this.prepare();
      this.states.forEach(function (state) {
        rules.forEach(function (rule) {
          series.forEach(function (serie) {
            state.setState(rule, serie);
          });
        });
      });
    }
    /**
     * Apply color and text
     */

  }, {
    key: "applyStates",
    value: function applyStates() {
      u.log(1, 'StateHandler.applyStates()');
      this.states.forEach(function (state) {
        state.applyState();
      });
    }
  }]);

  return StateHandler;
}();

exports["default"] = StateHandler;
