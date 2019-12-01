import FlowchartHandler from 'flowchartHandler';
import * as gf from '../types/flowcharting';

import FlowChartingPlugin from './plugin';
import XGraph from 'graph_class';
declare var GFP: FlowChartingPlugin;

export class FlowchartOptionsCtrl {
  $scope: gf.TIFlowchartOptionsScope;
  ctrl: any; //TODO: redefine any
  flowchartHandler: FlowchartHandler;
  panel: any;
  sourceTypes: gf.TSelectSource[] = [{ text: 'XML Content', value: 'xml' }];
  themes: gf.TSelectString[] = [
    { text: 'Dark', value: 'dark' },
    { text: 'Light', value: 'kennedy' },
    { text: 'Mobile', value: 'minimal' },
    { text: 'Atlas', value: 'atlas' },
  ];
  errorSourceFlag: boolean = false;
  errorSourceMsg: string = '';
  errorDownloadFlag: boolean = false;
  errorDownloadMsg: string = '';
  /* @ngInject */
  constructor($scope: gf.TIFlowchartOptionsScope) {
    $scope.editor = this;
    $scope.GFP = GFP;
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.panel = this.ctrl.panel;
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
    GFP.log.info('FlowchartOptionsCtrl.onOptionChange()');
    this.flowchartHandler.optionChanged();
    this.render();
  }

  checkSource_onSourceChange(source: string): boolean {
    let bool = XGraph.isValidXml(source);
    this.errorSourceFlag = !bool;
    if (!bool) this.errorSourceMsg = 'Invalid Xml definition';
    else this.errorSourceMsg = '';
    return bool;
  }

  checkUrl_onSourceChange(url: string): boolean {
    console.log('TCL: FlowchartOptionsCtrl -> url', url);
    this.errorDownloadFlag = false;
    this.errorDownloadMsg = '';
    let init: RequestInit = { method: 'GET', mode: 'cors', cache: 'default' };
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
              let bool = XGraph.isValidXml(text);
              this.errorSourceFlag = !bool;
              if (this.errorSourceFlag) this.errorSourceMsg = 'Response is an invalid Xml definition';
              else {
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
}

/** @ngInject */
export function flowchartOptionsTab($q, $sce, uiSegmentSrv) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${GFP.getPartialPath()}/flowchart_options.html`,
    controller: FlowchartOptionsCtrl,
  };
}
