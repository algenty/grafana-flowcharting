import XGraph from './graph_class';
import StateHandler from './statesHandler';

export default class FlowchartHandler {
  /** @ngInject */
  constructor($scope, elem, ctrl, flowchart) {
    u.log(1, 'FlowchartHandler.constructor()');
    this.$scope = $scope || null;
    this.$elem = elem.find('.flowchart-panel__chart');
    this.flowchart = flowchart;
    this.ctrl = ctrl;
    this.xgraph;
    this.stateHandler;
    this.$container;
    this.onMapping = {
      active: false, // boolean if pointer mapping is active
      object: undefined, // ojb to return id of mapping
      id: undefined // id of dom
    };

    this.initGraph();
    this.stateHandler = new StateHandler(this.$scope, this.xgraph);

    // Events Render
    ctrl.events.on('render', () => {
      this.render();
    });
  }

  initGraph() {
    this.$container = $(
      '<div id="flowchart_' +
        u.uniqueID +
        '" style="margin:auto;position:relative,width:100%;height:100%"></div>'
    );
    this.$elem.html(this.$container);
    this.xgraph = new XGraph(this.$container[0], this.flowchart.source.xml.value);
    this.xgraph.drawGraph();
    if (this.flowchart.options.scale) this.xgraph.scaleGraph(true);
    if (this.flowchart.options.center) this.xgraph.centerGraph(true);
    if (this.flowchart.options.center) this.xgraph.lockGraph(true);
    let width = this.$elem.width;
    let height = this.ctrl.height;
    this.xgraph.refreshGraph(width, height);
  }

  SetUpdateStates(rules, series) {
    u.log(1, 'flowchartHandler.SetUpdateStates()');
    this.stateHandler.setStates(rules, series);
    this.stateHandler.updateStates();
    u.log(0, 'flowchartHandler.SetUpdateStates() States', this.stateHandler.getStates());
  }

  render() {
    u.log(1, 'flowchartHandler.render()');
    let width = this.$elem.width();
    let height = this.ctrl.height;
    this.xgraph.refreshGraph(width, height);
  }

  getNamesByProp(prop) {
    return this.xgraph.getOrignalCells(prop);
  }

  setMap(objToMap) {
    this.onMapping.active = true;
    this.onMapping.object = objToMap;
    this.onMapping.id = objToMap.getId();
    this.onMapping.container = this.$container[0];
    this.$container[0].scrollIntoView();
    this.$container[0].focus();
  }

  unsetMap() {
    this.onMapping.active = false;
    this.onMapping.object = undefined;
    this.onMapping.id = '';
  }

  isMapping(objToMap) {
    if (this.onMapping.active === true && objToMap == this.onMapping.object) return true;
    return false;
  }
}
