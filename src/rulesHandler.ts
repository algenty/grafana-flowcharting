import { Rule } from 'rule_class';
import { sortBy as _sortBy } from 'lodash';
import { $GF } from 'globals_class';
import { FlowchartCtrl } from 'flowchart_ctrl';
import { Observer } from 'rxjs';
import { ObjectMetric } from 'metric_class';
import { State } from 'state_class';

/**
 * Rules Handler
 *
 * @export
 * @class RulesHandler
 */
export class RulesHandler {
  rules: Rule[];
  ctrl: FlowchartCtrl;
  uid: string;
  data: gf.TIRulesHandlerData;
  activeRuleIndex = 0;
  observers$: gf.TObserver<Rule>[] = [];
  metricsCompleted: boolean = true;

  /**
   * Creates an instance of RulesHandler.
   * @param {TIRulesHandlerData} data
   * @memberof RulesHandler
   */
  constructor(data: gf.TIRulesHandlerData, ctrl: FlowchartCtrl) {
    this.uid = $GF.uniqID(this.constructor.name);
    this.rules = [];
    this.data = data;
    this.ctrl = ctrl;
    this.init();
  }

  setData(data: gf.TIRulesHandlerData): this {
    this.data = data;
    return this;
  }

  /**
   * import datas in rule from current or old version
   *
   * @return this
   * @param {any} obj
   * @memberof RulesHandler
   */
  import(obj: any): this {
    $GF.log.info('RuleHandler.import()');
    // this.rules = [];
    this.clear();
    let index = 1;
    if (obj !== undefined && obj !== null) {
      // For version < 0.6.0
      let tmpRules: gf.TIRuleData[];
      if (Array.isArray(obj)) {
        tmpRules = obj;
      } else {
        tmpRules = obj.rulesData;
      }
      // Fix bug of grafana 6+
      if (tmpRules.length > 0 && tmpRules[0].order !== undefined) {
        tmpRules = _sortBy(_sortBy(tmpRules, o => o.order));
      }

      tmpRules.forEach(ruleData => {
        this.addRule('')
          .import(ruleData)
          .setOrder(index);
        index += 1;
      });
    }
    this.change();
    return this;
  }

  /**
   * Reset/clear/empty rules
   *
   * @returns {this}
   * @memberof RulesHandler
   */

  /**
   * Return data with default value
   *
   * @static
   * @returns {gf.TIRulesHandlerData}
   * @memberof RulesHandler
   */
  static getDefaultData(): gf.TIRulesHandlerData {
    return {
      rulesData: [Rule.getDefaultData()],
    };
  }

  /**
   * Return array of rules
   *
   * @returns {Array} of Rules
   * @memberof RulesHandler
   */
  getRules(): Rule[] {
    return this.rules;
  }

  /**
   * Get Rule at index
   *
   * @param {number} index
   * @returns {Rule}
   * @memberof RulesHandler
   */
  getRule(index: number): Rule {
    return this.rules[index];
  }

  /**
   * Add a new rule
   *
   * @param {string} pattern
   * @returns {Rule} New rule
   * @memberof RulesHandler
   */
  addRule(pattern: string): Rule {
    const data = Rule.getDefaultData();
    const newRule = new Rule(pattern, data, this.ctrl);
    newRule.initThresholds();
    this.rules.push(newRule);
    this.data.rulesData.push(data);
    newRule.setOrder(this.countRules());
    return newRule;
  }

  /**
   * count number of rules
   *
   * @returns {number}
   * @memberof RulesHandler
   */
  countRules(): number {
    if (this.rules !== undefined && Array.isArray(this.rules)) {
      return this.rules.length;
    }
    return 0;
  }

  /**
   * Redefine Order number of rules
   *
   * @memberof RulesHandler
   */
  setOrder(): this {
    const lg = this.rules.length;
    for (let index = 0; index < lg; index++) {
      const rule = this.rules[index];
      rule.setOrder(index + 1);
    }
    return this;
  }

  /**
   * Remove rule at index
   *
   * @param {number} index
   * @memberof RulesHandler
   */
  removeRule(rule: Rule): this {
    $GF.log.debug(this.constructor.name + '.removeRule()', rule);
    const index = rule.getOrder() - 1;
    rule.destroy();
    this.rules.splice(index, 1);
    this.data.rulesData.splice(index, 1);
    this.setOrder();
    return this;
  }

  /**
   * Clone rules at index in index - 1
   *
   * @param {number} index
   * @returns {Rule}
   * @memberof RulesHandler
   */
  cloneRule(rule: Rule): Rule {
    $GF.log.debug(this.constructor.name + '.cloneRule()', rule);
    const index = rule.getOrder() - 1;
    const data = rule.getData();
    const newData: gf.TIRuleData = Rule.getDefaultData();
    this.reduce();
    const newRule = new Rule(newData.pattern, newData, this.ctrl);
    newRule.import(data);
    newData.alias = `Copy of ${newData.alias}`;
    this.rules.splice(index, 0, newRule);
    this.data.rulesData.splice(index, 0, newData);
    newRule.data.reduce = false;
    this.activeRuleIndex = index;
    this.setOrder();
    // const elt = document.getElementById(newRule.uid);
    // if (elt) {
    //   setTimeout(() => {
    //     elt.focus();
    //   }, 100);
    // }
    $GF.setFocus(newRule.uid);
    return newRule;
  }

  /**
   * Reduce all rules
   *
   * @memberof RulesHandler
   */
  reduce(): this {
    this.getRules().forEach(rule => {
      rule.data.reduce = true;
    });
    return this;
  }

  /**
   * Move rule on index in index - 1
   *
   * @param {rule} rule
   * @memberof RulesHandler
   */
  moveRuleToUp(rule: Rule) {
    const index = rule.getOrder() - 1;
    const first = 0;
    const rules = this.rules;
    const last = rules.length - 1;
    if (index !== first && last !== first) {
      const curr = rules[index];
      curr.setOrder(index);
      const before = rules[index - 1];
      before.setOrder(index + 1);
      rules[index - 1] = curr;
      rules[index] = before;
    }
  }

  /**
   * Move rule on index in index + 1
   *
   * @param {Rule} rule
   * @memberof RulesHandler
   */
  moveRuleToDown(rule: Rule) {
    const index = rule.getOrder() - 1;
    const first = 0;
    const rules = this.rules;
    const last = rules.length - 1;
    if (index !== last && last !== first) {
      const curr = rules[index];
      curr.setOrder(index + 2);
      const after = rules[index + 1];
      after.setOrder(index + 1);
      rules[index + 1] = curr;
      rules[index] = after;
    }
  }

  clear(): this {
    $GF.log.debug(this.constructor.name + '.clear()');
    this.rules.forEach(r => r.clear());
    this.rules = [];
    this.data.rulesData = [];
    return this;
  }

  //
  // Updates
  //
  init(): this {
    $GF.log.debug(this.constructor.name + '.init()');
    this.onInitialized();
    return this;
  }

  refresh(): this {
    $GF.log.debug(this.constructor.name + '.refresh()');
    this.rules.forEach(r => r.refresh());
    this.onRefreshed();
    return this;
  }

  change(): this {
    $GF.log.debug(this.constructor.name + '.change()');
    this.rules.forEach(r => r.change());
    this.onChanged();
    return this;
  }

  destroy(): this {
    $GF.log.debug(this.constructor.name + '.destroy()');
    this.rules.forEach(r => r.destroy());
    this.clear();
    this.onDestroyed();
    return this;
  }

  complete(): this {
    this.rules.forEach(r => r.complete());
    this.metricsCompleted = true;
    this.onCompleted();
    return this;
  }

  //
  // Events
  //
  async onDestroyed() {
    const funcName = 'onDestroyed';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.ctrl.eventHandler.unsubscribes(this);
  }

  async onRefreshed() {
    const funcName = 'onRefreshed';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  }

  async onInitialized() {
    const funcName = 'onInitialized';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.ctrl.eventHandler.subscribes(this);
  }

  async onChanged() {
    const funcName = 'onChanged';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  }

  async onCompleted() {
    const funcName = 'onCompleted';
    $GF.log.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.ctrl.eventHandler.ack('rule', 'completed');
  }

  //
  // RXJS Observer
  //
  getMetric$changed(): Observer<ObjectMetric> {
    const self = this;
    const funcName = 'getMetric$changed';
    return {
      next: (metric: ObjectMetric) => {
        $GF.log.debug(`${this.constructor.name}.${funcName}().next() : ${this.uid}`);
        const len = this.rules.length;
        if (self.metricsCompleted) {
          self.metricsCompleted = false;
          for (let i = 0; i < len; i++) {
            this.rules[i].clearMetrics();
          }
        }
        if (metric !== null) {
          for (let i = 0; i < len; i++) {
            this.rules[i].refreshWithMetric(metric);
          }
          this.onRefreshed();
        }
      },
      error: err => {
        $GF.log.error(err);
      },
      complete: () => {
        $GF.log.debug(`${this.constructor.name}.${funcName}().complete() : ${this.uid}`);
      },
    };
  }

  getMetric$refreshed(): Observer<ObjectMetric> {
    const self = this;
    const funcName = 'getMetric$refreshed';
    return {
      next: (metric: ObjectMetric) => {
        $GF.log.debug(`${self.constructor.name}.${funcName}().next() : ${self.uid}`);
        if (metric !== null) {
          const len = self.rules.length;
          for (let i = 0; i < len; i++) {
            if (self.rules[i].hasMetric(metric)) {
              self.metricsCompleted = false;
            }
          }
        }
      },
      error: err => {
        $GF.log.error(`${self.constructor.name}.${funcName}().next() : ${self.uid}`, err);
      },
      complete: () => {
        $GF.log.debug(`${self.constructor.name}.${funcName}().complete() : ${self.uid}`);
      },
    };
  }

  getMetric$completed(): Observer<ObjectMetric> {
    const self = this;
    const funcName = 'getMetric$completed';
    return {
      next: (metric: ObjectMetric) => {
        $GF.log.debug(`${self.constructor.name}.${funcName}().next() : ${self.uid}`);
        if (metric === null && !self.metricsCompleted) {
          // const len = self.rules.length;
          // for (let i = 0; i < len; i++) {
          //   self.rules[i].complete();
          // }
          self.complete();
        }
      },
      error: err => {
        $GF.log.error(err);
      },
      complete: () => {
        $GF.log.debug(`${this.constructor.name}.${funcName}().complete() : ${this.uid}`);
      },
    };
  }

  getState$initialized(): Observer<State> {
    const self = this;
    const funcName = 'getState$initialized';
    return {
      next: (state: State) => {
        $GF.log.debug(`${this.constructor.name}.${funcName}().next() : ${this.uid}`);
        if (state !== null) {
          const len = self.rules.length;
          for (let i = 0; i < len; i++) {
            state.changeWithRule(self.rules[i]);
          }
        }
      },
      error: err => {
        $GF.log.error(err);
      },
      complete: () => {
        $GF.log.debug(`${this.constructor.name}.${funcName}().complete() : ${this.uid}`);
      },
    };
  }
}
