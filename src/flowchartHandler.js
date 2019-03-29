export default class FlowchartHandler {
    /** @ngInject */
    constructor($scope,flowchart) {
        this.$scope = $scope || null;
        this.flowchart = flowchart ;
        // if (version != this.panel.version) this.migrate(this.rules)
        // else this.import(this.rules);
    }
}