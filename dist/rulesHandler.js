"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rule_class = _interopRequireDefault(require("./rule_class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Rules Handler
 *
 * @export
 * @class RulesHandler
 */
var RulesHandler =
/*#__PURE__*/
function () {
  /** @ngInject */

  /**
   *Creates an instance of RulesHandler.
   * @param {*} $scope
   * @param {*} data
   * @memberof RulesHandler
   */
  function RulesHandler($scope, data) {
    _classCallCheck(this, RulesHandler);

    u.log(1, 'RulesHandler.constructor()');
    this.$scope = $scope || null;
    this.rules = [];
    this.data = data;
    this["import"](this.data);
  }
  /**
   * import datas in rule
   *
   * @param {*} obj
   * @memberof RulesHandler
   */


  _createClass(RulesHandler, [{
    key: "import",
    value: function _import(obj) {
      var _this = this;

      u.log(1, 'RuleHandler.import()');
      u.log(0, 'RuleHandler.import() obj', obj);
      this.rules = [];

      if (obj !== undefined && obj !== null && obj.length > 0) {
        obj.forEach(function (map) {
          var newData = {};
          var rule = new _rule_class["default"](map.pattern, newData);
          rule["import"](map);

          _this.rules.push(rule);

          _this.data.push(newData);
        });
      }
    }
    /**
     * Return array of rules
     *
     * @returns {Array} of Rules
     * @memberof RulesHandler
     */

  }, {
    key: "getRules",
    value: function getRules() {
      return this.rules;
    }
    /**
     * Get Rule at index
     *
     * @param {number} index
     * @returns {Rule}
     * @memberof RulesHandler
     */

  }, {
    key: "getRule",
    value: function getRule(index) {
      return this.rules[index];
    }
    /**
     * Add a new rule
     *
     * @param {string} pattern
     * @returns {Rule}
     * @memberof RulesHandler
     */

  }, {
    key: "addRule",
    value: function addRule(pattern) {
      var data = {};
      var newRule = new _rule_class["default"](pattern, data);
      this.rules.push(newRule);
      this.data.push(data);
      return newRule;
    }
    /**
     * count number of rules
     *
     * @returns {number}
     * @memberof RulesHandler
     */

  }, {
    key: "countRules",
    value: function countRules() {
      if (this.rules !== undefined && Array.isArray(this.rules)) return this.rules.length;
      return 0;
    }
    /**
     * Remove rule at index
     *
     * @param {number} index
     * @memberof RulesHandler
     */

  }, {
    key: "removeRule",
    value: function removeRule(index) {
      this.rules.splice(index, 1);
      this.data.splice(index, 1);
    }
    /**
     * Clone rules at index in index - 1
     *
     * @param {number} index
     * @memberof RulesHandler
     */

  }, {
    key: "cloneRule",
    value: function cloneRule(index) {
      var rule = this.getRule(index);
      var data = rule.getData();
      var newData = {};
      this.reduce();
      var newRule = new _rule_class["default"](newData.pattern, newData);
      newRule["import"](data);
      newData.alias = "Copy of ".concat(newData.alias);
      this.rules.splice(index, 0, newRule);
      this.data.splice(index, 0, newData);
      newRule.data.reduce = false;
      this.activeRuleIndex = index;
      var elt = document.getElementById(newRule.getId()); // NOT WORK : TODO

      if (elt) {
        setTimeout(function () {
          elt.focus();
        }, 100);
      }
    }
    /**
     *Reduce all rules
     *
     * @memberof RulesHandler
     */

  }, {
    key: "reduce",
    value: function reduce() {
      this.getRules().forEach(function (rule) {
        rule.data.reduce = true;
      });
    }
    /**
     * Move rule on index in index - 1
     *
     * @param {number} index index
     * @memberof RulesHandler
     */

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
    /**
     * Move rule on index in index + 1
     *
     * @param {number} index
     * @memberof RulesHandler
     */

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

exports["default"] = RulesHandler;
