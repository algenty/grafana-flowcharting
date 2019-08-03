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
  /**
   * Init states
   *
   * @param {XGraph} xgraph
   * @param {Array<Rule>} rules
   * @memberof StateHandler
   */


  _createClass(StateHandler, [{
    key: "initStates",
    value: function initStates(xgraph, rules) {
      u.log(1, 'StateHandler.initStates()');
      this.xgraph = xgraph;
      this.states = [];
      this.updateStates(rules);
    }
    /**
     * Update States : Add or remove state in states when rules changed
     *
     * @param {XGraph} xgraph
     * @param {Array<Rule>} rules
     * @memberof StateHandler
     */

  }, {
    key: "updateStates",
    value: function updateStates(rules) {
      var _this = this;

      u.log(1, 'StateHandler.updateStates()');
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
              var links = rule.getLinkMaps();
              var name = null; // SHAPES

              if (rule.data.shapeProp === 'id') name = mxcell.id;else if (rule.data.shapeProp === 'value') name = xgraph.getValueCell(mxcell);else name = null;

              if (rule.matchShape(name)) {
                _this.addState(mxcell);
              } // TEXTS


              if (rule.data.textProp === 'id') name = mxcell.id;else if (rule.data.textProp === 'value') name = xgraph.getValueCell(mxcell);else name = null;

              if (rule.matchText(name)) {
                _this.addState(mxcell);
              } // LINKS


              if (rule.data.linkProp === 'id') name = mxcell.id;else if (rule.data.linkProp === 'value') name = xgraph.getValueCell(mxcell);else name = null;

              if (rule.matchLink(name)) {
                _this.addState(mxcell);
              }
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

      for (var index = 0; index < this.states.length; index++) {
        var state = this.states[index];

        if (cellId == state.cellId) {
          foundState = state;
          break;
        }
      }

      return foundState;
    }
    /**
     * Add a state 
     *
     * @param {mxCell} mxcell
     * @returns {State} created state
     * @memberof StateHandler
     */

  }, {
    key: "addState",
    value: function addState(mxcell) {
      var state = this.getState(mxcell.id);

      if (state === null) {
        state = new _state_class["default"](mxcell, this.xgraph, this.ctrl);
        this.states.push(state);
      }

      return state;
    }
    /**
     * Remove state
     *
     * @param {mxCell} mxcell
     * @memberof StateHandler
     */

  }, {
    key: "removeState",
    value: function removeState(mxcell) {
      this.states = _.without(this.states, mxcell);
    }
    /**
     * Count number of state
     *
     * @returns {Number} 
     * @memberof StateHandler
     */

  }, {
    key: "countStates",
    value: function countStates() {
      return this.states.length;
    }
    /**
     * Count number of state with level
     *
     * @param {Number} level - 0 for OK | 1 for Warning | 2 for Error
     * @returns {Number}
     * @memberof StateHandler
     */

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
     * @param  {Array<Rule>} rules - Array of Rule object
     * @param  {Array<Serie>} series - Array of serie object
     */

  }, {
    key: "setStates",
    value: function setStates(rules, series) {
      u.log(1, 'StateHandler.setStates()');
      u.log(0, 'StatesHandler.setStates() Rules', rules);
      u.log(0, 'StatesHandler.setStates() Series', series);
      u.log(1, 'StatesHandler.setStates() States', this.states);
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
