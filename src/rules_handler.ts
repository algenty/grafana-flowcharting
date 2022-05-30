import { Rule } from 'rule_class';
import { sortBy as _sortBy } from 'lodash';
import { $GF, GFLog } from 'globals_class';
import { GFEvents } from 'flowcharting_base';

// Debug
const DEBUG = false;
const _log = (...args: any) => {
  DEBUG && console.log(...args);
};

// Define signals
const ruleHandlerSignalsArray = ['rule_created', 'rule_updated', 'rule_changed', 'rule_deleted'] as const;
type RuleHandlerSignals = typeof ruleHandlerSignalsArray[number];

/**
 * Rules Handler
 *
 * @export
 * @class RulesHandler
 */
export class RulesHandler {
  private readonly $gf: $GF;
  rules: Rule[];
  // ctrl: FlowchartCtrl;
  uid: string;
  data: gf.TIRulesHandlerData;
  activeRuleIndex = 0;
  events: GFEvents<RuleHandlerSignals> = GFEvents.create(ruleHandlerSignalsArray);
  // metricsCompleted =true;

  /**
   * Creates an instance of RulesHandler.
   * @param {TIRulesHandlerData} data
   * @memberof RulesHandler
   */
  constructor($gf: $GF, data: gf.TIRulesHandlerData, oldData?: any) {
    this.$gf = $gf;
    this.$gf.rulesHandler = this;
    this.uid = $GF.genUid(this.constructor.name);
    this.rules = [];
    this.data = data;
    if (oldData) {
      this._convert(oldData);
    }
    this.init();
  }

  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE
  //############################################################################
  clear(): this {
    GFLog.debug(this.constructor.name + '.clear()');
    this.rules.forEach((r) => r.clear());
    this.rules = [];
    this.data.rulesData = [];
    return this;
  }

  //
  // Updates
  //
  init(): this {
    GFLog.debug(this.constructor.name + '.init()');
    this.$gf.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    this.$gf.events.connect('panel_closed', this, this._on_global_panel_closed.bind(this));
    return this;
  }

  update(): this {
    GFLog.debug(this.constructor.name + '.refresh()');
    this.rules.forEach((r) => r.update());
    // this.onRefreshed();
    return this;
  }

  change(): this {
    GFLog.debug(this.constructor.name + '.change()');
    this.rules.forEach((r) => r.change());
    // this.onChanged();
    return this;
  }

  free(): this {
    GFLog.debug(this.constructor.name + '.free()');
    this.$gf.events.disconnect('debug_asked', this);
    this.$gf.events.disconnect('panel_closed', this);
    this.rules.forEach((r) => r.free());
    this.clear();
    this.events.clear();
    this.$gf.rulesHandler = undefined;
    return this;
  }

  //############################################################################
  //### ACCESSORS
  //############################################################################

  //############################################################################
  //### LOGIC
  //############################################################################

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
  private _convert(obj: any): this {
    GFLog.info('RuleHandler.import()');
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
        tmpRules = _sortBy(_sortBy(tmpRules, (o) => o.order));
      }

      tmpRules.map(async (ruleData) => {
        const r = this.addRule('', ruleData);
        r.setOrder(index);
        index += 1;
        this.events.emit('rule_created', r);
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
   * Get Rule at index or alias
   *
   * @param {number} index
   * @returns {Rule}
   * @memberof RulesHandler
   */
  getRule(value: number | string): Rule | null {
    if (typeof value === 'number') {
      return this.rules[value];
    }
    for (let index = 0; index < this.rules.length; index++) {
      const r = this.rules[index];
      if(value === r.name){
        return r;
      };
    }
    return null;
  }

  /**
   * Add a new rule
   *
   * @param {string} pattern
   * @returns {Rule} New rule
   * @memberof RulesHandler
   */
  addRule(pattern: string, previousData?: any): Rule {
    const data: gf.TIRuleData = Rule.getDefaultData();
    const newRule = new Rule(this.$gf, pattern, data, previousData);
    // TODO : Why initThresholds outside, same in _convert()
    // newRule.initThresholds();
    this.rules.push(newRule);
    this.data.rulesData.push(data);
    newRule.setOrder(this.countRules());
    newRule.events.connect('rule_updated', this, this._on_rule_rule_updated.bind(this));
    newRule.events.connect('rule_changed', this, this._on_rule_rule_changed.bind(this));
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
    GFLog.debug(this.constructor.name + '.removeRule()', rule);
    rule.events.disconnect('rule_updated', this);
    rule.events.disconnect('rule_changed', this);
    const index = rule.getOrder() - 1;
    rule.free();
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
    GFLog.debug(this.constructor.name + '.cloneRule()', rule);
    const index = rule.getOrder() - 1;
    const data = rule.getData();
    const newData: gf.TIRuleData = Rule.getDefaultData();
    this.reduce();
    const newRule = new Rule(this.$gf, newData.pattern, newData, data);
    // newRule._convert(data);
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
    this.getRules().forEach((rule) => {
      rule.reduce = true;
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

  //#############################################################
  //### EVENTS
  //#############################################################
  private _on_rule_rule_updated(rule: Rule) {
    _log('📬', this.constructor.name, '_on_rule_rule_updated');
    this.events.emit('rule_updated', rule);
  }

  private _on_rule_rule_changed(rule: Rule) {
    _log('📬', this.constructor.name, '_on_rule_rule_changed');
    this.events.emit('rule_changed', rule);
  }

  private _on_global_debug_asked() {
    _log('📬', this.constructor.name, '_on_rule_rule_changed');
    _log('🗃️', this.constructor.name, this);
  }

  private _on_global_panel_closed() {
    this.free();
  }
}
