import { FlowchartHandler } from 'flowchartHandler';

import XGraph from 'graph_class';
import { Flowchart } from 'flowchart_class';
import { $GF } from 'globals_class';

export class FlowchartOptionsCtrl {
  $scope: gf.TIFlowchartOptionsScope;
  ctrl: any; //TODO: redefine any
  flowchartHandler: FlowchartHandler;
  panel: any;
  sourceTypes = $GF.CONSTANTS.SOURCE_TYPES;
  themes = $GF.CONSTANTS.DIOTHEME_TYPES;
  errorSourceFlag = false;
  errorSourceMsg = '';
  errorDownloadFlag = false;
  errorDownloadMsg = '';
  /** @ngInject */
  constructor($scope: gf.TIFlowchartOptionsScope) {
    $scope.editor = this;
    $scope.$GF = $GF.me();
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    this.flowchartHandler = this.ctrl.flowchartHandler;
  }

  /**
   * Render
   *
   * @memberof FlowchartOptionsCtrl
   */
  render() {
    this.flowchartHandler.render();
  }

  /**
   * onSourceChange event when source changes
   *
   * @memberof FlowchartOptionsCtrl
   */
  onSourceChange() {
    this.flowchartHandler.sourceChanged();
    this.render();
  }

  /**
   * onOptionChange event when options change
   *
   * @memberof FlowchartOptionsCtrl
   */
  onOptionChange() {
    $GF.log.info('FlowchartOptionsCtrl.onOptionChange()');
    this.flowchartHandler.optionChanged();
    this.render();
  }

  onColorChange() {
    this.onOptionChange();
  }

  checkSource_onSourceChange(source: string): boolean {
    const bool = XGraph.isValidXml(source);
    this.errorSourceFlag = !bool;
    if (!bool) {
      this.errorSourceMsg = 'Invalid Xml definition';
    } else {
      this.errorSourceMsg = '';
      this.onSourceChange();
      this.$scope.$applyAsync();
    }
    return bool;
  }

  checkUrl_onSourceChange(url: string): boolean {
    this.errorDownloadFlag = false;
    this.errorDownloadMsg = '';
    const init: RequestInit = { method: 'GET', mode: 'cors', cache: 'default' };
    try {
      url = this.ctrl.templateSrv.replaceWithText(url);
      fetch(url, init)
        .then(response => {
          if (!(response.status >= 200 && response.status <= 299)) {
            this.errorSourceFlag = true;
            this.errorDownloadMsg = `Error ${response.status} : ${response.statusText}`;
            this.$scope.$applyAsync();
          } else {
            response.text().then(text => {
              const fc = this.flowchartHandler.getFlowchart();
              if (fc.data.type === 'xml') {
                const bool = XGraph.isValidXml(text);
                this.errorSourceFlag = !bool;
                if (this.errorSourceFlag) {
                  this.errorSourceMsg = 'Response is an invalid Xml definition';
                } else {
                  this.errorDownloadMsg = '';
                  this.onSourceChange();
                }
              } else {
                this.errorDownloadMsg = '';
                this.onSourceChange();
              }
              this.$scope.$applyAsync();
            });
          }
        })
        .catch(error => {
          this.errorSourceFlag = true;
          this.errorDownloadMsg = `Error : ${error}`;
          this.$scope.$applyAsync();
        });
    } catch (error) {
      this.errorDownloadFlag = true;
      this.errorDownloadMsg = 'Error when call url';
    }
    return true;
  }

  /**
   * Open graph in index in draw.io
   *
   * @param {Number} name - index of graph
   * @memberof FlowchartOptionsCtrl
   * @see flowchartHandler:openDrawEditor
   */
  edit(name: string) {
    this.flowchartHandler.openDrawEditor(name);
  }

  getFlowcharts() {
    return this.flowchartHandler.getFlowcharts();
  }

  getNames(): string[] {
    return this.flowchartHandler.getFlowchartNames();
  }

  getCurrentFlowchart(): Flowchart[] {
    return [this.flowchartHandler.getFlowchart()];
  }
}

/** @ngInject */
export function flowchartOptionsTab($q, $sce, uiSegmentSrv) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${$GF.plugin.getPartialPath()}/flowchart/index.html`,
    controller: FlowchartOptionsCtrl,
  };
}
