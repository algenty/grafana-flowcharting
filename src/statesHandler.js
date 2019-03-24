import State from "./state_class";

export default class StateHandler  {
    /** @ngInject */
    constructor($scope, graph) {
        this.states = [];
        this.$scope = $scope;
        this.graph = graph;
    }

    getStates() {
        return this.states
    }

    getStates(cellId) {
        let foundState = null;
        for ( let state of this.states ) {
            if ( cellId == state.cellId) foundState = state;
            break; 
        }
        return foundState;
    }

    addState(cell) {
        let state = new State(cell,graph);
        this.states.push(state);
    }

    removeState(cell) {
        this.states = _.without(this.states,cell)
    }
}