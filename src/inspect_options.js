import { plugin } from './plugin';

export class InspectOptionsCtrl {
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    const text = u.stringify(this.panel);
    this.json = u.prettifyJSON(text);
    this.logDisplayOption = [{ text: 'True', value: true }, { text: 'False', value: false }];
    this.logDisplay = logDisplay;
    this.logLevelOption = [
      { text: 'DEBUG', value: 0 },
      { text: 'INFO', value: 1 },
      { text: 'WARNING', value: 2 },
      { text: 'ERROR', value: 3 },
    ];
    this.logLevel = logLevel;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    $scope.flowchartHandler = this.ctrl.flowchartHandler;

    $scope.doBlur = function ($event) {
      console.log("$event", $event);
      const target = $event.target;
      target.blur();
    };
  }

  render() {
    this.panelCtrl.render();
  }

  onColorChange(styleIndex, colorIndex) {
    return (newColor) => {
      this.colors[colorIndex] = newColor;
    };
  }

  onDebug() {
    window.logLevel = this.logLevel;
    window.logDisplay = this.logDisplay;
  }

  onChangeId(state) {
    if (state.newcellId !== undefined && state.cellId !== state.newcellId) {
      this.flowchartHandler.getFlowchart(0).getStateHandler().edited = true;
      if (state.previousId === undefined) state.previousId = state.cellId;
      state.cellId = state.newcellId;
      state.edited = true;
    }
    state.edit = false;
  }

  onEdit(state) {
    state.edit = true;
    state.newcellId = state.cellId;
    let elt = document.getElementById(state.cellId);
    setTimeout(function() {
      elt.focus();
    }, 100);
  }

  reset() {
    this.flowchartHandler.draw();
    this.flowchartHandler.refresh();
    // this.$scope.$apply();
  }

  apply() {
    const flowchart = this.flowchartHandler.getFlowchart(0);
    const states = flowchart.getStateHandler().getStates();
    states.forEach((state) => {
      if (state.edited) flowchart.renameId(state.previousId, state.cellId);
    });
    flowchart.applyModel();
  }

  selectCell(state) {
    const flowchart = this.flowchartHandler.getFlowchart(0);
    const xgraph = flowchart.getXGraph();
    if (state.edited) xgraph.selectMxCells('id', state.previousId);
    else xgraph.selectMxCells('id', state.cellId);
  }

  unselectCell() {
    const flowchart = this.flowchartHandler.getFlowchart(0);
    const xgraph = flowchart.getXGraph();
    xgraph.unselectMxCells();
  }
}

/** @ngInject */
export function inspectOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `public/plugins/${plugin.id}/partials/inspect_options.html`,
    controller: InspectOptionsCtrl
  };
}
