"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _state_class = _interopRequireDefault(require("./state_class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StateHandler =
/*#__PURE__*/
function () {
  /** @ngInject */
  function StateHandler(xgraph) {
    _classCallCheck(this, StateHandler);

    u.log(1, 'StateHandler.constructor()');
    this.states = [];
    this.xgraph = xgraph;
    this.initStates(this.xgraph);
  }

  _createClass(StateHandler, [{
    key: "getStates",
    value: function getStates() {
      return this.states;
    }
  }, {
    key: "getState",
    value: function getState(cellId) {
      var foundState = null;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.states[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var state = _step.value;
          if (cellId == state.cellId) foundState = state;
          break;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return foundState;
    }
  }, {
    key: "addState",
    value: function addState(mxcell) {
      var state = new _state_class.default(mxcell, this.xgraph);
      this.states.push(state);
    }
  }, {
    key: "removeState",
    value: function removeState(mxcell) {
      this.states = _.without(this.states, mxcell);
    }
  }, {
    key: "initStates",
    value: function initStates(xgraph) {
      var _this = this;

      this.xgraph = xgraph;
      this.states = [];
      var cells = this.xgraph.getAllMxCells();

      _.each(cells, function (cell) {
        _this.addState(cell);
      });
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
        if (state.getLevel() == level) count++;
      });
      return count;
    }
  }, {
    key: "prepare",
    value: function prepare() {
      this.states.forEach(function (state) {
        state.prepare();
      });
    }
  }, {
    key: "setStates",
    value: function setStates(rules, series) {
      u.log(1, 'StateHandler.setStates()');
      u.log(0, 'StatesHandler.setStates() Rules', rules);
      u.log(0, 'StatesHandler.setStates() Series', series);
      this.prepare();
      this.states.forEach(function (state) {
        rules.forEach(function (rule) {
          series.forEach(function (serie) {
            state.setState(rule, serie);
          });
        });
      });
    }
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

exports.default = StateHandler;
//# sourceMappingURL=statesHandler.js.map
