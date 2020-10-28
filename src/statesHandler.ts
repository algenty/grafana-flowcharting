import { State } from './state_class';
import { Rule } from './rule_class';
import _ from 'lodash';
import { Metric } from './metric_class';
import XGraph from 'graph_class';
import { $GF } from 'globals_class';

/**
 * States Handler class
 *
 * @export
 * @class StateHandler
 */
export class StateHandler {
  states: Map<string, State>;
  xgraph: XGraph;
  edited = false;
  /**
   * Creates an instance of StateHandler.
   * @param {XGraph} xgraph
   * @memberof StateHandler
   */
  constructor(xgraph: XGraph) {
    this.states = new Map();
    this.xgraph = xgraph;
    this.initStates(this.xgraph);
  }

  /**
   * Initialisation of states
   *
   * @returns {this}
   * @param {XGraph} xgraph
   * @memberof StateHandler
   */
  initStates(xgraph: XGraph): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initStates()');
    this.xgraph = xgraph;
    this.states.clear();
    const mxcells = xgraph.getMxCells();
    _.each(mxcells, mxcell => {
      this.addState(mxcell);
    });
    trc.after();
    return this;
  }

  /**
   * Reset/empty/destroy StateHandler
   *
   * @returns {this}
   * @memberof StateHandler
   */
  clear(): this {
    if (this.states) {
      this.states.forEach(st => {
        st.clear();
      });
      this.states.clear();
    }
    return this;
  }

  /**
   * Return states array for a rule
   *
   * @param {Rule} rule - rule mapping
   * @returns {Array<State>}
   * @memberof StateHandler
   */
  getStatesForRule(rule: Rule) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'getStatesForRule()');
    const result = new Map();
    let name: string | null;
    const xgraph = this.xgraph;
    this.states.forEach(state => {
      const mxcell: mxCell = state.mxcell;
      const id: string = mxcell.id;
      let found = false;

      // SHAPES
      name = xgraph.getValuePropOfMxCell(rule.data.shapeProp, mxcell);
      if (name !== null && rule.matchShape(name)) {
        result.set(id, state);
        found = true;
      }

      // TEXTS
      if (!found) {
        name = xgraph.getValuePropOfMxCell(rule.data.textProp, mxcell);
        if (rule.matchText(name)) {
          result.set(id, state);
          found = true;
        }
      }

      // LINKS
      if (!found) {
        name = xgraph.getValuePropOfMxCell(rule.data.linkProp, mxcell);
        if (rule.matchLink(name)) {
          result.set(id, state);
          found = true;
        }
      }

      // EVENTS
      if (!found) {
        name = xgraph.getValuePropOfMxCell(rule.data.eventProp, mxcell);
        if (rule.matchEvent(name)) {
          result.set(id, state);
          found = true;
        }
      }
    });
    trc.after();
    return result;
  }

  /**
   * Update States : Add or remove state in states when rules changed
   *
   * @param {XGraph} xgraph
   * @param {Array<Rule>} rules
   * @memberof StateHandler
   */
  updateStates(rules: Rule[]) {
    $GF.log.info('StateHandler.updateStates()');
    rules.forEach(rule => {
      rule.states = this.getStatesForRule(rule);
    });
  }

  /**
   * Return array of state
   *
   * @returns Map<States>
   * @memberof StateHandler
   */
  getStates() {
    return this.states;
  }

  /**
   * get array states
   *
   * @returns {State[]}
   * @memberof StateHandler
   */
  getStatesForInspect(): State[] {
    const states: State[] = [];
    this.states.forEach(state => {
      states.push(state);
    });
    return states;
  }

  /**
   * Find state by Id
   * @param  {string} cellId - Id of cell
   * @returns {state}
   */
  getState(cellId: string): State | undefined {
    return this.states.get(cellId);
  }

  /**
   * Add a state
   *
   * @param {mxCell} mxcell
   * @returns {State} created state
   * @memberof StateHandler
   */
  addState(mxcell: mxCell): State {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addState()');
    const state = new State(mxcell, this.xgraph);
    this.states.set(mxcell.id, state);
    if ($GF.DEBUG) {
      $GF.setVar(`STATE_${state.cellId}`, state);
    }
    trc.after();
    return state;
  }

  /**
   * Count number of state
   *
   * @returns {Number}
   * @memberof StateHandler
   */
  countStates(): number {
    return this.states.size;
  }

  /**
   * Restore initial status and prepare states object
   */
  prepare(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'prepare()');
    this.states.forEach(state => {
      state.prepare();
    });
    trc.after();
    return this;
  }

  /**
   * Change states according to rules and datas from grafana
   * @param  {Array<Rule>} rules - Array of Rule object
   * @param  {Array<Metric>} metrics - Array of serie object
   */
  setStates(rules: Rule[], metrics: Metric[]): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setStates()');
    this.prepare();
    rules.forEach(rule => {
      rule.highestLevel = -1;
      rule.highestFormattedValue = '';
      rule.highestColor = '';
      rule.highestValue = '';
      rule.execTimes = 0;
      if (rule.states === undefined || rule.states.size === 0) {
        rule.states = this.getStatesForRule(rule);
      }
      rule.states.forEach(state => {
        metrics.forEach(metric => {
          state.setState(rule, metric);
        });
      });
    });
    trc.after();
    return this;
  }

  /**
   * Apply color and text
   */
  applyStates(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'applyStates()');
    this.states.forEach(state => {
      state.async_applyState();
    });
    trc.after();
    return this;
  }

  /**
   * Call applyStates asynchronously
   *
   * @memberof StateHandler
   */
  async async_applyStates() {
    this.applyStates();
  }
}
