import State from './state_class';
import Rule from './rule_class';
import _ from 'lodash';
import Metric from './metric_class';
import XGraph from 'graph_class';

/**
 * States Handler class
 *
 * @export
 * @class StateHandler
 */
export default class StateHandler {
  states: Map<string, State>;
  xgraph: XGraph;
  edited = false;
  constructor(xgraph: XGraph) {
    GFP.log.info('StateHandler.constructor()');
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
    GFP.log.info('StateHandler.initStates()');
    this.xgraph = xgraph;
    this.states.clear();
    const mxcells = xgraph.getMxCells();
    _.each(mxcells, mxcell => {
      this.addState(mxcell);
    });
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
    GFP.log.info('StateHandler.getStatesForRule()');
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
  updateStates(rules: Rule[]) {
    GFP.log.info('StateHandler.updateStates()');
    rules.forEach(rule => {
      rule.states = this.getStatesForRule(rule);
    });
  }

  /**
   * Return array of state
   * @returns {Array} Array of state object
   */
  getStates() {
    return this.states;
  }

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
    const state = new State(mxcell, this.xgraph);
    this.states.set(mxcell.id, state);
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
    this.states.forEach(state => {
      state.prepare();
    });
    return this;
  }

  /**
   * Change states according to rules and datas from grafana
   * @param  {Array<Rule>} rules - Array of Rule object
   * @param  {Array<Metric>} metrics - Array of serie object
   */
  setStates(rules: Rule[], metrics: Metric[]): this {
    GFP.log.info('StateHandler.setStates()');
    this.prepare();
    rules.forEach(rule => {
      rule.highestLevel = -1;
      rule.highestFormattedValue = '';
      rule.highestColor = '';
      if (rule.states === undefined || rule.states.size === 0) {
        rule.states = this.getStatesForRule(rule);
      }
      rule.states.forEach(state => {
        metrics.forEach(metric => {
          state.setState(rule, metric);
        });
        // No data series
        if (metrics.length === 0) {
          state.setState(rule);
        }
      });
    });
    return this;
  }

  /**
   * Apply color and text
   */
  applyStates(): this {
    GFP.log.info('StateHandler.applyStates()');
    this.states.forEach(state => {
      state.async_applyState();
    });
    return this;
  }

  /**
   * Call applyStates asynchronously
   *
   * @memberof StateHandler
   */
  async async_applyStates() {
    GFP.perf.start('async_applyStates');
    this.applyStates();
    GFP.perf.stop('async_applyStates');
  }
}
