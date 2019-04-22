// eslint-disable-next-line import/no-unresolved
import { MetricsPanelCtrl } from 'app/plugins/sdk';
// eslint-disable-next-line import/no-unresolved
import TimeSeries from 'app/core/time_series2';
// eslint-disable-next-line import/no-unresolved
import kbn from 'app/core/utils/kbn';
import { mappingOptionsTab } from './mapping_options';
import { flowchartOptionsTab } from './flowchart_options';
import { inspectOptionsTab } from './inspect_options';
import RulesHandler from './rulesHandler';
import FlowchartHandler from './flowchartHandler';

const u = require('./utils');

window.u = window.u || u;

class FlowchartCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);
    this.version = '0.3.0';
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.unitFormats = kbn.getUnitFormats();
    this.changedSource = true;
    this.changedData = true;
    this.changedOptions = true;
    this.rulesHandler = undefined;
    this.flowchartHandler = undefined;
    this.series = [];
    this.panelDefaults = {
      version: this.version,
      newFlag: true,
      format: 'short',
      valueName: 'current',
      rulesData: [],
      flowchartsData: [],
    };

    _.defaults(this.panel, this.panelDefaults);
    this.panel.graphId = `flowchart_${this.panel.id}`;
    this.containerDivId = `container_${this.panel.graphId}`;

    // events
    this.events.on('render', this.onRender.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('init-panel-actions', this.onInitPanelActions.bind(this));
  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    this.addEditorTab('Flowchart', flowchartOptionsTab, 2);
    this.addEditorTab('Mapping', mappingOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
  }

  onRefresh() {
    u.log(1, 'ctrl.onRefresh()');
    this.onRender();
  }

  onRender() {
    u.log(1, 'ctrl.onRender()');
  }

  onDataReceived(dataList) {
    u.log(1, 'ctrl.onDataReceived()');
    u.log(0, 'ctrl.onDataReceived() dataList', dataList);
    this.series = dataList.map(this.seriesHandler.bind(this));
    u.log(0, 'ctrl.onDataReceived() this.series', dataList);
    this.flowchartHandler.dataChanged();
    this.render();
  }

  onDataError() {
    this.series = [];
    this.render();
  }

  onInitPanelActions(actions) {
    actions.push({
      text: 'Export SVG',
      click: 'ctrl.exportSVG()'
    });
  }

  //
  // FUNCTIONS
  //
  link(scope, elem, attrs, ctrl) {
    u.log(1, 'ctrl.link()');
    this.rulesHandler = new RulesHandler(scope, this.panel.rulesData);
    // TODO: Migrate old version
    if (this.panel.newFlag && this.rulesHandler.countRules() === 0) this.rulesHandler.addRule('.*');
    this.flowchartHandler = new FlowchartHandler(scope, elem, ctrl, this.panel.flowchartsData);
    if (this.panel.version === undefined) this.flowchartHandler.import(this.panel.flowchartsData);
    else if (this.panel.version !== this.version) {
      this.flowchartHandler.import(this.panel.flowchartsData);
    }
    if (this.panel.newFlag && this.flowchartHandler.countFlowcharts() === 0) {
      this.flowchartHandler.addFlowchart('Main');
    }
    this.panel.newFlag = false;
  }

  exportSVG() {
    const scope = this.$scope.$new(true);
    scope.panel = 'table';
    this.publishAppEvent('show-modal', {
      templateHtml: '<export-data-modal panel="panel" data="tableData"></export-data-modal>',
      scope,
      modalClass: 'modal--narrow'
    });
  }

  setUnitFormat(subItem) {
    this.panel.format = subItem.value;
    this.refresh();
  }

  //
  // Series
  //

  seriesHandler(seriesData) {
    u.log(1, 'ctrl.seriesHandler()');
    const series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target,
      unit: seriesData.unit
    });
    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    const datapoints = seriesData.datapoints || [];
    if (datapoints && datapoints.length > 0) {
      const last = datapoints[datapoints.length - 1][1];
      const from = this.range.from;
      if (last - from < -10000) {
        series.isOutsideRange = true;
      }
    }
    return series;
  }
}

export { FlowchartCtrl, FlowchartCtrl as MetricsPanelCtrl };

FlowchartCtrl.templateUrl = './partials/module.html';
