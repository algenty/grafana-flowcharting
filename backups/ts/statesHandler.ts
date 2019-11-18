import State from './state_class';
import Rule from './rule_class';
import FlowChartingPlugin from './plugin';

declare var GFP: FlowChartingPlugin;

/**
 * States Handler class
 *
 * @export
 * @class StateHandler
 */
export default class StateHandler {
  states: Map<string, State>;
  xgraph: any;
  constructor(xgraph) {
    GFP.log.info( 'StateHandler.constructor()');
    this.states = new Map();
    this.xgraph = xgraph;
    this.initStates(this.xgraph);
  }

  /**
   * Initialisation of states
   *
   * @param {*} xgraph
   * @param {*} rules
   * @memberof StateHandler
   */
  initStates(xgraph:any) {
    GFP.log.info( 'StateHandler.initStates()');
    this.xgraph = xgraph;
    this.states.clear();
    let mxcells = xgraph.getMxCells();
    mxcells.forEach( (mxcell:any) => {
      this.addState(mxcell);
    });
  }

  /**
   * Return states array for a rule
   *
   * @param {Rule} rule - rule mapping
   * @returns {Array<State>}
   * @memberof StateHandler
   */
  getStatesForRule(rule:Rule) {
    GFP.log.info( 'StateHandler.getStatesForRule()');
    let result = new Map();
    let name = null;
    let xgraph = this.xgraph;
    this.states.forEach(state => {
      let mxcell = state.mxcell;
      let id = mxcell.id;
      let found = false;
      // SHAPES
      name = xgraph.getValuePropOfMxCell(rule.data.shapeProp, mxcell);
      if (rule.matchShape(name)) {
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
  updateStates(rules:Rule[]) {
    GFP.log.info( 'StateHandler.updateStates()');
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

  /**
   * Find state by Id
   * @param  {string} cellId - Id of cell
   * @returns {state}
   */
  getState(cellId:string):State|undefined {
    return this.states.get(cellId);
  }

  /**
   * Add a state
   *
   * @param {mxCell} mxcell
   * @returns {State} created state
   * @memberof StateHandler
   */
  addState(mxcell:any):State {
    let state = new State(mxcell, this.xgraph);
    this.states.set(mxcell.id, state);
    return state;
  }

  /**
   * Count number of state
   *
   * @returns {Number}
   * @memberof StateHandler
   */
  countStates():number {
    return this.states.size;
  }

  /**
   * Restore initial status and prepare states object
   */
  prepare():this {
    this.states.forEach(state => {
      state.prepare();
    });
    return this;
  }

  /**
   * Change states according to rules and datas from grafana
   * @param  {Array<Rule>} rules - Array of Rule object
   * @param  {Array<Serie>} series - Array of serie object
   */
  setStates(rules:Rule[], series:any[]):this {
    GFP.log.info( 'StateHandler.setStates()');
    // GFP.log.debug( 'StatesHandler.setStates() Rules', rules);
    // GFP.log.debug( 'StatesHandler.setStates() Series', series);
    // GFP.log.debug( 'StatesHandler.setStates() States', this.states);
    this.prepare();
    rules.forEach(rule => {
      if (rule.states === undefined || rule.states.size === 0) rule.states = this.getStatesForRule(rule);
      rule.states.forEach(state => {
        series.forEach(serie => {
          state.setState(rule, serie);
        });
      });
    });
    return this;
  }

  /**
   * Apply color and text
   */
  applyStates() {
    GFP.log.info( 'StateHandler.applyStates()');
    this.states.forEach(state => {
      state.async_applyState();
    });
  }

  /**
   *Call applyStates asynchronously
   *
   * @memberof StateHandler
   */
  async async_applyStates() {
    GFP.perf.start("async_applyStates");
    this.applyStates();
    GFP.perf.stop("async_applyStates");
  }
}