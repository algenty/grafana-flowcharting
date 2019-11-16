export class InspectOptionsCtrl {
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.enable = false;
    $scope.GFP = window.GFP;
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    this.logDisplayOption = [{ text: 'True', value: true }, { text: 'False', value: false }];
    this.logLevelOption = [
      { text: 'DEBUG', value: 0 },
      { text: 'INFO', value: 1 },
      { text: 'WARNING', value: 2 },
      { text: 'ERROR', value: 3 },
    ];
    this.logLevel = GFP.logLevel;
    this.logDisplay = GFP.logDisplay;

    this.flowchartHandler = this.ctrl.flowchartHandler;
    $scope.flowchartHandler = this.ctrl.flowchartHandler;
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
    GFP.logLevel = this.logLevel;
    GFP.logDisplay = this.logDisplay;
  }

  onChangeId(state) {
    if (state.newcellId !== undefined && state.cellId !== state.newcellId) {
      this.flowchartHandler.getFlowchart().getStateHandler().edited = true;
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
    setTimeout(function () {
      elt.focus();
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
    states.forEach((state) => {
      if (state.edited) flowchart.renameId(state.previousId, state.cellId);
    });
    flowchart.applyModel();
  }

  selectCell(state) {
    state.highlightCell();
  }

  unselectCell(state) {
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
    controller: InspectOptionsCtrl
  };
}
