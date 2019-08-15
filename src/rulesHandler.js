import Rule from './rule_class';

export default class RulesHandler {
  /** @ngInject */
  constructor($scope, data) {
    u.log(1, 'RulesHandler.constructor()');
    this.$scope = $scope || null;
    this.rules = [];
    this.data = data;
    this.import(this.data);
  }

  import(obj) {
    u.log(1, 'RuleHandler.import()');
    u.log(0, 'RuleHandler.import() obj', obj);
    this.rules = [];
    if (obj !== undefined && obj !== null && obj.length > 0) {
      obj.forEach(map => {
        const newData = {};
        const rule = new Rule(map.pattern, newData);
        rule.import(map);
        this.rules.push(rule);
        this.data.push(newData);
      });
    }
  }

  getRules() {
    return this.rules;
  }

  getRule(index) {
    return this.rules[index];
  }

  addRule(pattern) {
    const data = {};
    const newRule = new Rule(pattern, data);
    this.rules.push(newRule);
    this.data.push(data);
  }

  countRules() {
    if (this.rules !== undefined && Array.isArray(this.rules)) return this.rules.length;
    return 0;
  }

  removeRule(index) {
    this.rules.splice(index, 1);
    this.data.splice(index, 1);
  }

  cloneRule(index) {
    const rule = this.getRule(index);
    const data = rule.getData();
    const newData = {};
    this.reduce();
    const newRule = new Rule(newData.pattern, newData);
    newRule.import(data);
    newData.alias = `Copy of ${newData.alias}`;
    this.rules.splice(index, 0, newRule);
    this.data.splice(index, 0, newData);
    newRule.data.reduce = false;
    this.activeRuleIndex = index;
    const elt = document.getElementById(newRule.getId());
    // NOT WORK : TODO
    if (elt) {
      setTimeout(() => {
        elt.focus();
      }, 100);
    }
  }

  /**
   *Reduce all rules
   *
   * @memberof RulesHandler
   */
  reduce() {
    this.getRules().forEach(rule => {
      rule.data.reduce = true;
    });
  }

  moveRuleToUp(index) {
    const first = 0;
    const rules = this.rules;
    const last = rules.length - 1;
    if (index !== first && last !== first) {
      const curr = rules[index];
      const before = rules[index - 1];
      rules[index - 1] = curr;
      rules[index] = before;
    }
  }

  moveRuleToDown(index) {
    const first = 0;
    const rules = this.rules;
    const last = rules.length - 1;
    if (index !== last && last !== first) {
      const curr = rules[index];
      const after = rules[index + 1];
      rules[index + 1] = curr;
      rules[index] = after;
    }
  }
}
