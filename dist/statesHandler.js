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

/**
 *States Handler class
 *
 * @export
 * @class StateHandler
 */
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
   * @memberof StateHandler
   */
  // initStates(xgraph, rules) {
  //   u.log(1, 'StateHandler.initStates()');
  //   this.xgraph = xgraph;
  //   this.states = [];
  //   this.updateStates(rules);
  // }


  _createClass(StateHandler, [{
    key: "initStates",
    value: function initStates(xgraph, rules) {
      var _this = this;

      u.log(1, 'StateHandler.initStates()');
      this.xgraph = xgraph;
      this.states = [];
      var mxcells = xgraph.getMxCells();

      _.each(mxcells, function (mxcell) {
        _this.addState(mxcell);
      });
    }
    /**
     *Return states array for a rule
     *
     * @param {Rule} rule - rule mapping
     * @returns {Array<State>}
     * @memberof StateHandler
     */

  }, {
    key: "getStatesForRule",
    value: function getStatesForRule(rule) {
      u.log(1, 'StateHandler.getStatesForRule()');
      var result = [];
      var name = null;
      var xgraph = this.xgraph;
      this.states.forEach(function (state) {
        var mxcell = state.mxcell;
        var found = false; // SHAPES

        name = xgraph.getValuePropOfMxCell(rule.data.shapeProp, mxcell);

        if (rule.matchShape(name)) {
          result.push(state);
          found = true;
        } // TEXTS


        if (!found) {
          name = xgraph.getValuePropOfMxCell(rule.data.textProp, mxcell);

          if (rule.matchText(name)) {
            result.push(state);
            found = true;
          }
        } // LINKS


        if (!found) {
          name = xgraph.getValuePropOfMxCell(rule.data.linkProp, mxcell);

          if (rule.matchText(name)) {
            result.push(state);
            found = true;
          }
        }
      });
      return result;
    }
    /**
     * Update States : Add or remove state in states when rules changed
     *
     * @param {XGraph} xgraph
     * @param {Array<Rule>} rules
     * @memberof StateHandler
     */
    // OLD METHOD : see getStatesForRule

  }, {
    key: "updateStates",
    value: function updateStates(rules) {
      var _this2 = this;

      u.log(1, 'StateHandler.updateStates()');
      rules.forEach(function (rule) {
        rule.states = _this2.getStatesForRule(rule);
      });
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
    // NOT USED
    // removeState(mxcell) {
    //   this.states = _.without(this.states, mxcell);
    // }

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
      var _this3 = this;

      u.log(1, 'StateHandler.setStates()');
      u.log(0, 'StatesHandler.setStates() Rules', rules);
      u.log(0, 'StatesHandler.setStates() Series', series);
      u.log(1, 'StatesHandler.setStates() States', this.states);
      this.prepare();
      rules.forEach(function (rule) {
        if (rule.states === undefined || rule.states.length === 0) rule.states = _this3.getStatesForRule(rule);
        rule.states.forEach(function (state) {
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
