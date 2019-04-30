import Rule from './rule_class';

export default class RulesHandler {
  /** @ngInject */
  constructor($scope, data) {
    u.log(1, 'RulesHandler.constructor()');
    this.$scope = $scope || null;
    this.rules = [];
    this.data = data;
    // if (version != this.panel.version) this.migrate(this.rules)
    // else this.import(this.rules);
    if (this.data !== undefined && this.data !== null && this.data.length > 0) {
      this.import(this.data);
    }
  }

  import(obj) {
    u.log(1, 'RuleHandler.import()');
    u.log(0, 'RuleHandler.import() obj', obj);
    let i = 0;
    if (this.data != obj) {
      this.data = [];
      const newObj = true;
    }
    this.rules = [];
    obj.forEach((map) => {
      if (newObj) {
        let data = {}
        const rule = new Rule(map.pattern, data);
        rule.import(map);
      else {
          const rule = new Rule(map.pattern, map);
        }
        this.rules.push(rule);
        this.data[i] = map;
        i += 1;
      });
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
    const newData = JSON.parse(JSON.stringify(data));
    const newRule = new Rule(newData.pattern, newData);
    this.rules.splice(index, 0, newRule);
    this.data.splice(index, 0, newData);
    this.activeRuleIndex = index;
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
