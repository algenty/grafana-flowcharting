import XGraph from "./graph_class";
import StateHandler from "./statesHandler";

export default class FlowchartHandler {
    /** @ngInject */
    constructor($scope, elem, ctrl, flowchart) {
        u.log(1,"FlowchartHandler.constructor()");
        this.$scope = $scope || null;
        this.$elem = elem.find(".flowchart-panel__chart");
        this.flowchart = flowchart;
        this.ctrl = ctrl;
        this.xgraph;
        this.stateHandler;

        // if (version != this.panel.version) this.migrate(this.rules)
        // else this.import(this.rules);

        this.initGraph();

        this.stateHandler = new StateHandler(this.$scope, this.xgraph);


        // Events Render
        ctrl.events.on("render", () => {
            this.render();
        });
    }

    initGraph() {
        let $container = $('<div id="flowchart_' + u.uniqueID + '" style="margin:auto;position:relative,width:100%;height:100%"></div>')
        this.$elem.html($container);
        this.xgraph = new XGraph($container[0], this.flowchart.source.xml.value);
        this.xgraph.drawGraph();
        if (this.flowchart.options.scale) this.xgraph.scaleGraph(true);
        if (this.flowchart.options.center) this.xgraph.centerGraph(true);
        if (this.flowchart.options.center) this.xgraph.lockGraph(true);
        let width = this.$elem.width;
        let height = this.ctrl.height;
        this.xgraph.refreshGraph(width, height);
    }

    SetUpdateStates(rules, series) {
        u.log(1,"flowchartHandler.SetUpdateStates()");
        this.stateHandler.setStates(rules, series);
        this.stateHandler.updateStates();
        u.log(0,"flowchartHandler.SetUpdateStates() States",this.stateHandler.getStates());
    }

    render() {
        u.log(1,"flowchartHandler.render()");
        let width = this.$elem.width();
        let height = this.ctrl.height;
        this.xgraph.refreshGraph(width, height)
    }

    getNamesByProp(prop) {
        return this.xgraph.getOrignalCells(prop);
    }
}