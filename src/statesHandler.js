import State from "./state_class";
import XGraph from "./graph_class"

export default class StateHandler {
    /** @ngInject */
    constructor($scope, xgraph) {
        u.log(0,"StateHandler.constructor");
        this.$scope = $scope;
        this.states = [];
        this.xgraph = xgraph;

        this.initStates();
    }

    getStates() {
        return this.states
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
        let state = new State(mxcell, this.xgraph);
        this.states.push(state);
    }

    removeState(mxcell) {
        this.states = _.without(this.states, mxcell)
    }

    initStates() {
        this.states = [];
        let cells = this.xgraph.getAllMxCells();
        _.each(cells, (cell) => {
            this.addState(cell);
        });
    }

    countStates() {
        return this.states.length;
    }

    countStatesWithLevel(level) {
        let count = 0;
        this.states.forEach(state => {
            if (state.getLevel() == level) count++;
        });
        return count;
    }

    prepare() {
        this.states.forEach(state => {
            state.prepare();
        });
    }

    setStates(rules, series) {
        u.log(0,"statesHandler.setStates")
        this.prepare();
        this.states.forEach(state => {
            rules.forEach(rule => {
                series.forEach(serie => {
                    state.setState(rule, serie);
                });
            });
        });
    }

    updateStates() {
        this.states.forEach(state => {
            state.updateState();
        });
    }

}