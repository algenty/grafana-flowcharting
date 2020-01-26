import FlowchartHandler from './flowchartHandler';
import State from 'state_class';
import MetricHandler from './metricHandler';

export class InspectOptionsCtrl {
  enable = false; // enable inspector or not
  $scope: gf.TInspectOptionsScope;
  ctrl: any; //TODO: define type
  panel: any; //TODO: define type
  logDisplayOption: gf.TSelectBoolean[] = [
    { text: 'True', value: true },
    { text: 'False', value: false },
  ];
  logLevelOption: gf.TSelectNumber[] = [
    { text: 'DEBUG', value: 0 },
    { text: 'INFO', value: 1 },
    { text: 'WARNING', value: 2 },
    { text: 'ERROR', value: 3 },
  ];
  logLevel: number;
  logDisplay: boolean;
  flowchartHandler: FlowchartHandler;
  metricHandler: MetricHandler;
  panelCtrl: any;
  colors: any; //TODO: define style
  /** @ngInject */
  constructor($scope: gf.TInspectOptionsScope) {
    $scope.editor = this;
    $scope.GFP = GFP;
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    this.logLevel = GFP.log.logLevel;
    this.logDisplay = GFP.log.logDisplay;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.metricHandler = this.ctrl.metricHandler;
    $scope.flowchartHandler = this.ctrl.flowchartHandler;
  }

  render() {
    this.panelCtrl.render();
  }

  onColorChange(styleIndex, colorIndex) {
    return newColor => {
      this.colors[colorIndex] = newColor;
    };
  }

  onDebug() {
    GFP.log.logLevel = this.logLevel;
    GFP.log.logDisplay = this.logDisplay;
  }

  onChangeId(state: State) {
    if (state.newcellId !== undefined && state.cellId !== state.newcellId) {
      state.edited = true;
      let sh = this.flowchartHandler.getFlowchart().getStateHandler();
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
    const states = flowchart.getStateHandler().getStates();
    states.forEach(state => {
      if (state.edited && state.previousId) {
        flowchart.renameId(state.previousId, state.cellId);
        state.edited = false;
      }
    });
    this.flowchartHandler.getFlowchart().getStateHandler().edited = false;
    flowchart.applyModel();
  }

  selectCell(state: State) {
    state.highlightCell();
  }

  unselectCell(state: State) {
    state.unhighlightCell();
  }
}

/** @ngInject */
export function inspectOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${GFP.getPartialPath()}/inspect_options.html`,
    controller: InspectOptionsCtrl,
  };
}