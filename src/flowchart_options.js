/* eslint-disable no-unused-vars */
import { plugin } from './plugin';

export class FlowchartOptionsCtrl {
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    $scope.GF_PLUGIN = window.GF_PLUGIN;
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.panel = this.ctrl.panel;
    this.sourceTypes = [{ text: 'Url', value: 'url' }, { text: 'XML Content', value: 'xml' }];
  }

  render() {
    this.flowchartHandler.render();
  }

  onSourceChange() {
    this.flowchartHandler.sourceChanged();
    this.render();
  }

  onOptionChange() {
    u.log(1, "FlowchartOptionsCtrl.onOptionChange()");
    this.flowchartHandler.optionChanged();
    this.render();
  }

  edit(index) {
    this.flowchartHandler.openDrawEditor(index);
  }

  getFlowcharts() {
    return this.flowchartHandler.getFlowcharts();
  }
}

/** @ngInject */
export function flowchartOptionsTab($q, $sce, uiSegmentSrv) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${GF_PLUGIN.getPartialPath()}/flowchart_options.html`,
    controller: FlowchartOptionsCtrl,
  };
}
