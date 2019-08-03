/* global u */
import State from './state_class';

export default class StateHandler {
  /** @ngInject */
  constructor(xgraph, ctrl) {
    u.log(1, 'StateHandler.constructor()');
    this.states = [];
    this.ctrl = ctrl;
    this.templateSrv = this.ctrl.templateSrv;
    this.xgraph = xgraph;
    this.initStates(this.xgraph, ctrl.rulesHandler.getRules());
  }

  /**
   * Init states
   *
   * @param {XGraph} xgraph
   * @param {Array<Rule>} rules
   * @memberof StateHandler
   */
  initStates(xgraph, rules) {
    u.log(1, 'StateHandler.initStates()');
    this.xgraph = xgraph;
    this.states = [];
    this.updateStates(rules);
  }

  /**
   * Update States : Add or remove state in states when rules changed
   *
   * @param {XGraph} xgraph
   * @param {Array<Rule>} rules
   * @memberof StateHandler
   */
  updateStates(rules) {
    u.log(1, 'StateHandler.updateStates()');
    const mxcells = this.xgraph.getMxCells();
    // NEW
    _.each(mxcells, mxcell => {
      const state = this.getState(mxcell.id);
      let found = false;
      if (state === null) {
        for (const rule of rules) {
          const shapes = rule.getShapeMaps();
          const texts = rule.getTextMaps();
          const links = rule.getLinkMaps();
          let name = null;

          // SHAPES
          if (rule.data.shapeProp === 'id') name = mxcell.id;
          else if (rule.data.shapeProp === 'value') name = xgraph.getValueCell(mxcell);
          else name = null;
          if (rule.matchShape(name)) {
            this.addState(mxcell);
          }

          // TEXTS
          if (rule.data.textProp === 'id') name = mxcell.id;
          else if (rule.data.textProp === 'value') name = xgraph.getValueCell(mxcell);
          else name = null;
          if (rule.matchText(name)) {
            this.addState(mxcell);
          }

          // LINKS
          if (rule.data.linkProp === 'id') name = mxcell.id;
          else if (rule.data.linkProp === 'value') name = xgraph.getValueCell(mxcell);
          else name = null;
          if (rule.matchLink(name)) {
            this.addState(mxcell);
          }

        };
      }
    });
    // OLD
    // _.each(mxcells, mxcell => {
    //   this.addState(mxcell);
    // });
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
  getState(cellId) {
    let foundState = null;
    for (let index = 0; index < this.states.length; index++) {
      const state = this.states[index];
      if (cellId == state.cellId) {
        foundState = state;
        break;
      }
    }
    return foundState;
  }

  /**
   * Add a state 
   *
   * @param {mxCell} mxcell
   * @returns {State} created state
   * @memberof StateHandler
   */
  addState(mxcell) {
    let state = this.getState(mxcell.id)
    if (state === null ) {
      state = new State(mxcell, this.xgraph, this.ctrl);
      this.states.push(state);
    }
    return state;
  }

  /**
   * Remove state
   *
   * @param {mxCell} mxcell
   * @memberof StateHandler
   */
  removeState(mxcell) {
    this.states = _.without(this.states, mxcell);
  }

  /**
   * Count number of state
   *
   * @returns {Number} 
   * @memberof StateHandler
   */
  countStates() {
    return this.states.length;
  }

  /**
   * Count number of state with level
   *
   * @param {Number} level - 0 for OK | 1 for Warning | 2 for Error
   * @returns {Number}
   * @memberof StateHandler
   */
  countStatesWithLevel(level) {
    let count = 0;
    this.states.forEach(state => {
      if (state.getLevel() === level) count += 1;
    });
    return count;
  }
  /**
   * Restore initial status and prepare states object
   */
  prepare() {
    this.states.forEach(state => {
      state.prepare();
    });
  }
  /**
   * Change states according to rules and datas from grafana
   * @param  {Array<Rule>} rules - Array of Rule object
   * @param  {Array<Serie>} series - Array of serie object
   */
  setStates(rules, series) {
    u.log(1, 'StateHandler.setStates()');
    u.log(0, 'StatesHandler.setStates() Rules', rules);
    u.log(0, 'StatesHandler.setStates() Series', series);
    u.log(1, 'StatesHandler.setStates() States', this.states);
    this.prepare();
    this.states.forEach(state => {
      rules.forEach(rule => {
        series.forEach(serie => {
          state.setState(rule, serie);
        });
      });
    });
  }
  /**
   * Apply color and text
   */
  applyStates() {
    u.log(1, 'StateHandler.applyStates()');
    this.states.forEach(state => {
      state.applyState();
    });
  }
}
