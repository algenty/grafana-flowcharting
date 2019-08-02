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

  initStates(xgraph, rules) {
    this.xgraph = xgraph;
    this.states = [];
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
          
          // SHAPES
          for (const shape of shapes) {
            let name = null;
            if (rule.data.shapeProp === 'id') name = mxcell.id;
            else if (rule.data.shapeProp === 'value') name = xgraph.getValueCell(mxcell);
            else name = null;
            if (rule.matchShape(name)) {
              this.addState(mxcell);
              found = true;
              break;
            }
          }
          if (found) break;

          // TEXTS
          for (const text of texts) {
            let name = null;
            if (rule.data.textProp === 'id') name = mxcell.id;
            else if (rule.data.textProp === 'value') name = xgraph.getValueCell(mxcell);
            else name = null;
            if (rule.matchText(name) && !this.isInclude(mxcell)) {
              this.addState(mxcell);
              found = true;
            }
          }
          if (found) break;

          // LINKS
          for (const link of links) {
            let name = null;
            if (rule.data.textProp === 'id') name = mxcell.id;
            else if (rule.data.textProp === 'value') name = xgraph.getValueCell(mxcell);
            else name = null;
            if (rule.matchLink(name) && !this.isInclude(mxcell)) {
              this.addState(mxcell);
            }
          };
          if (found) break;
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
    for (const state of this.states) {
      if (cellId == state.cellId) foundState = state;
      break;
    }
    return foundState;
  }

  addState(mxcell) {
    const state = new State(mxcell, this.xgraph, this.ctrl);
    this.states.push(state);
  }

  removeState(mxcell) {
    this.states = _.without(this.states, mxcell);
  }

  countStates() {
    return this.states.length;
  }

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
   * @param  {} rules
   * @param  {} series
   */
  setStates(rules, series) {
    u.log(1, 'StateHandler.setStates()');
    u.log(0, 'StatesHandler.setStates() Rules', rules);
    u.log(0, 'StatesHandler.setStates() Series', series);
    u.log(0, 'StatesHandler.setStates() States', this.states);
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
