import { FlowchartHandler } from './flowchartHandler';
import { State } from 'state_class';
import { $GF } from 'globals_class';
import { StateHandler } from 'statesHandler';
import _ from 'lodash';
// import { MetricHandler } from './metricHandler';

export class InspectOptionsCtrl {
  enable = false; // enable inspector or not
  ctrl: any; //TODO: define type
  flowchartHandler: FlowchartHandler;
  stateHandler: StateHandler|undefined;
  panel: any;
  column: string = 'cellId';
  sens: 'asc'|'desc' = 'asc';

  /** @ngInject */
  constructor($scope: gf.TInspectOptionsScope) {
    $scope.editor = this;
    $scope.$GF = $GF.me();
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.stateHandler = this.flowchartHandler.getFlowchart().getStateHandler();

  }

  render() {
    this.panel.render();
  }


  // onDebug() {
  //   GFP.log.logLevel = this.logLevel;
  //   GFP.log.logDisplay = this.logDisplay;
  // }

  onChangeId(state: State) {
    if (state.newcellId !== undefined && state.cellId !== state.newcellId) {
      state.edited = true;
      const sh = this.flowchartHandler.getFlowchart().getStateHandler();
      if (sh !== undefined) {
        sh.edited = true;
      }
      if (state.previousId === undefined) {
        state.previousId = state.cellId;
      }
      state.cellId = state.newcellId;
      state.edited = true;
    }
    state.edit = false;
  }

  onEdit(state: State) {
    state.edit = true;
    state.newcellId = state.cellId;
    // let stateHandler = this.flowchartHandler.getFlowchart().getStateHandler();
    // stateHandler.edited = true;
    const elt = document.getElementById(state.cellId);
    setTimeout(() => {
      if (elt) {
        elt.focus();
      }
    }, 100);
  }

  reset() {
    this.flowchartHandler.draw();
    this.flowchartHandler.refresh();
    // this.$scope.$apply();
  }

  apply() {
    const flowchart = this.flowchartHandler.getFlowchart();
    const sh = flowchart.getStateHandler();
    if (sh !== undefined) {
      const states = sh.getStates();
      states.forEach(state => {
        if (state.edited && state.previousId) {
          flowchart.renameId(state.previousId, state.cellId);
          state.edited = false;
        }
      });
      sh.edited = false;
    }
    flowchart.applyModel();
  }

  selectCell(state: State) {
    state.highlightCell();
  }

  unselectCell(state: State) {
    state.unhighlightCell();
  }

  getStates(): State[] {
    if (this.stateHandler) {
      const states = this.stateHandler.getStatesForInspect();
      return _.orderBy(states, [this.column,'cellId'],[this.sens])
    }
    return []
  }

  // execute() {
  //   const flowchart = this.flowchartHandler.getFlowchart();
  //   const xgraph = flowchart.getXGraph();
  //   if (xgraph) {
  //     const graph = xgraph.graph;
  //     const model = graph.getModel();
  //     const mxcell = model.getCell(this.testData.id);
  //     // eslint-disable-next-line no-eval
  //     let value: any = undefined;
  //     try {
  //       value = eval(this.testData.value);
  //     } catch (error) {
  //       value = this.testData.value;
  //     }
  //     // console.log('Value : ', value);
  //     // graph.setCellStyles(this.testData.style, value, [mxcell]);
  //     // console.log("before", mxcell);
  //     xgraph.resizeCell(mxcell, value, undefined);
  //     // console.log("after", mxcell);
  //   }
  // }
}

/** @ngInject */
export function inspectOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${$GF.plugin.getPartialPath()}inspect/index.html`,
    controller: InspectOptionsCtrl,
  };
}
