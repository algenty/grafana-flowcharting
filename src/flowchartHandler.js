import XGraph from "./graph_class";

export default class FlowchartHandler {
    /** @ngInject */
    constructor($scope, elem, ctrl, flowchart) {
        this.$scope = $scope || null;
        this.$elem = elem.find(".flowchart-panel__chart");
        this.flowchart = flowchart ;
        this.ctrl = ctrl;
        this.xgraph;
        // if (version != this.panel.version) this.migrate(this.rules)
        // else this.import(this.rules);
        this.initGraph();

        // Events Render
        ctrl.events.on("render", () => {
            this.render();
        });
    }

    initGraph() {
        let $container = $("<div></div>")
        this.$elem.html($container)
        this.xgraph = new XGraph($container[0],this.flowchart.source.xml.value);
        this.xgraph.drawGraph();
        if (this.flowchart.options.scale) this.xgraph.scaleGraph(true);
        if (this.flowchart.options.center) this.xgraph.centerGraph(true);
        if (this.flowchart.options.center) this.xgraph.lockGraph(true);
        this.xgraph.refreshGraph();
    }

    render() {
        console.log("flowchartHandler.render()");
        this.xgraph.refreshGraph();
    }
}