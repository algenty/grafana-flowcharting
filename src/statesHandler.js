/* global u */
import State from './state_class';

export default class StateHandler {
  /** @ngInject */
  constructor(xgraph) {
    u.log(1, 'StateHandler.constructor()');
    this.states = [];
    this.xgraph = xgraph;
    this.initStates(this.xgraph);
  }

  getStates() {
    return this.states;
  }

  getState(cellId) {
    let foundState = null;
    for (let state of this.states) {
      if (cellId == state.cellId) foundState = state;
      break;
    }
    return foundState;
  }

  addState(mxcell) {
    const state = new State(mxcell, this.xgraph);
    this.states.push(state);
  }

  removeState(mxcell) {
    this.states = _.without(this.states, mxcell);
  }

  initStates(xgraph) {
    this.xgraph = xgraph;
    this.states = [];
    const cells = this.xgraph.getMxCells();
    _.each(cells, (cell) => {
      this.addState(cell);
    });
  }

  countStates() {
    return this.states.length;
  }

  countStatesWithLevel(level) {
    let count = 0;
    this.states.forEach((state) => {
      if (state.getLevel() === level) count += 1;
    });
    return count;
  }

  prepare() {
    this.states.forEach((state) => {
      state.prepare();
    });
  }

  setStates(rules, series) {
    u.log(1, 'StateHandler.setStates()');
    u.log(0, 'StatesHandler.setStates() Rules', rules);
    u.log(0, 'StatesHandler.setStates() Series', series);
    this.prepare();
    this.states.forEach((state) => {
      rules.forEach((rule) => {
        series.forEach((serie) => {
          state.setState(rule, serie);
        });
      });
    });
  }

  applyStates() {
    u.log(1, 'StateHandler.applyStates()');
    this.states.forEach((state) => {
      state.applyState();
    });
  }
}
