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
  function StateHandler($scope, graph) {
    _classCallCheck(this, StateHandler);

    this.states = [];
    this.$scope = $scope;
    this.graph = graph;
  }

  _createClass(StateHandler, [{
    key: "getStates",
    value: function getStates() {
      return this.states;
    }
  }, {
    key: "getStates",
    value: function getStates(cellId) {
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
    value: function addState(cell) {
      var state = new _state_class.default(cell, graph);
      this.states.push(state);
    }
  }, {
    key: "removeState",
    value: function removeState(cell) {
      this.states = _.without(this.states, cell);
    }
  }]);

  return StateHandler;
}();

exports.default = StateHandler;
