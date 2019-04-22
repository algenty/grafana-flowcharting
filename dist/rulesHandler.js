"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rule_class = _interopRequireDefault(require("./rule_class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RulesHandler =
/*#__PURE__*/
function () {
  /** @ngInject */
  function RulesHandler($scope, data) {
    _classCallCheck(this, RulesHandler);

    u.log(1, 'RulesHandler.constructor()');
    this.$scope = $scope || null;
    this.rules = [];
    this.data = data; // if (version != this.panel.version) this.migrate(this.rules)
    // else this.import(this.rules);

    if (this.data !== undefined && this.data !== null && this.data.length > 0) {
      this.import(this.data);
    }
  }

  _createClass(RulesHandler, [{
    key: "import",
    value: function _import(obj) {
      var _this = this;

      u.log(1, 'RuleHandler.import()');
      u.log(0, 'RuleHandler.import() obj', obj);
      var i = 0;
      obj.forEach(function (map) {
        var rule = new _rule_class.default(map.pattern, map);

        _this.rules.push(rule);

        _this.data[i] = map;
        i += 1;
      });
    }
  }, {
    key: "getRules",
    value: function getRules() {
      return this.rules;
    }
  }, {
    key: "getRule",
    value: function getRule(index) {
      return this.rules[index];
    }
  }, {
    key: "addRule",
    value: function addRule(pattern) {
      var data = {};
      var newRule = new _rule_class.default(pattern, data);
      this.rules.push(newRule);
      this.data.push(data);
    }
  }, {
    key: "countRules",
    value: function countRules() {
      if (this.rules !== undefined && Array.isArray(this.rules)) return this.rules.length;
      return 0;
    }
  }, {
    key: "removeRule",
    value: function removeRule(index) {
      this.rules.splice(index, 1);
      this.data.splice(index, 1);
    }
  }, {
    key: "cloneRule",
    value: function cloneRule(index) {
      var rule = this.getRule(index);
      var data = rule.getData();
      var newData = JSON.parse(JSON.stringify(data));
      var newRule = new _rule_class.default(newData.pattern, newData);
      this.rules.splice(index, 0, newRule);
      this.data.splice(index, 0, newData);
      this.activeRuleIndex = index;
    }
  }, {
    key: "moveRuleToUp",
    value: function moveRuleToUp(index) {
      var first = 0;
      var rules = this.rules;
      var last = rules.length - 1;

      if (index !== first && last !== first) {
        var curr = rules[index];
        var before = rules[index - 1];
        rules[index - 1] = curr;
        rules[index] = before;
      }
    }
  }, {
    key: "moveRuleToDown",
    value: function moveRuleToDown(index) {
      var first = 0;
      var rules = this.rules;
      var last = rules.length - 1;

      if (index !== last && last !== first) {
        var curr = rules[index];
        var after = rules[index + 1];
        rules[index + 1] = curr;
        rules[index] = after;
      }
    }
  }]);

  return RulesHandler;
}();

exports.default = RulesHandler;
//# sourceMappingURL=rulesHandler.js.map
