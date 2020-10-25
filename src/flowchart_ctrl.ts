import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
// import { appEvents } from 'grafana/app/core/core';
import { mappingOptionsTab } from 'mapping_options';
import { flowchartOptionsTab } from 'flowchart_options';
import { inspectOptionsTab } from 'inspect_options';
import { RulesHandler } from 'rulesHandler';
import { FlowchartHandler } from 'flowchartHandler';
import { MetricHandler } from 'metricHandler';
// import { PanelEvents } from '@grafana/data';
import { $GF } from 'globals_class';
import grafana from 'grafana_func';
import _ from 'lodash';
import XGraph from 'graph_class';

class FlowchartCtrl extends MetricsPanelCtrl {
  $rootScope: any;
  $scope: any;
  templateSrv: any;
  version: any;
  changedSource: boolean;
  changedData: boolean;
  changedOptions: boolean;
  rulesHandler: RulesHandler | undefined;
  flowchartHandler: FlowchartHandler | undefined;
  metricHandler: MetricHandler | undefined;
  id: String;
  GHApplied = false;
  panelDefaults: {
    newFlag: boolean;
    format: string;
    valueName: string;
    rulesData: gf.TIRulesHandlerData;
    flowchartsData: gf.TFlowchartHandlerData;
    editedFlag: boolean;
  };
  containerDivId: string;
  static templateUrl: string;
  /**@ngInject*/
  constructor($scope, $injector, $rootScope, templateSrv) {
    super($scope, $injector);
    $GF.init($scope, templateSrv, this.dashboard);
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.version = $GF.plugin.getVersion();
    this.templateSrv = templateSrv;
    this.changedSource = true;
    this.changedData = true;
    this.changedOptions = true;
    this.rulesHandler = undefined;
    this.flowchartHandler = undefined;
    this.metricHandler = undefined;
    this.id = $GF.utils.uniqueID();
    this.panelDefaults = {
      newFlag: true,
      format: 'short',
      valueName: 'current',
      rulesData: RulesHandler.getDefaultData(),
      flowchartsData: FlowchartHandler.getDefaultData(),
      editedFlag: false,
    };

    // Identify panel
    $GF.log.debug('PANEL ID : ', this.id);

    _.defaults(this.panel, this.panelDefaults);
    this.panel.graphId = `flowchart_${this.panel.id}`;
    this.containerDivId = `container_${this.panel.graphId}`;

    // events
    this.events.on(grafana.PanelEvents.render, this.onRender.bind(this));
    this.events.on(grafana.PanelEvents.refresh, this.onRefresh.bind(this));
    this.events.on(grafana.PanelEvents.dataReceived, this.onDataReceived.bind(this));
    this.events.on(grafana.PanelEvents.dataError, this.onDataError.bind(this));
    this.events.on(grafana.PanelEvents.dataSnapshotLoad, this.onDataReceived.bind(this));
    this.events.on(grafana.PanelEvents.editModeInitialized, this.onInitEditMode.bind(this));
    this.events.on('panel-teardown', this.onTearDown.bind(this));
    grafana.appEvents.on('graph-hover', this.onGraphHover.bind(this), this.$scope);
    grafana.appEvents.on('graph-hover-clear', this.clearCrosshair.bind(this), this.$scope);
    this.dashboard.events.on('template-variable-value-updated', this.onVarChanged.bind(this), $scope);
    $GF.log.debug('CTRL : ', this.id, this);
  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    $GF.log.debug('EVENT : ', this.id, 'onInitEditMode');
    this.addEditorTab('Flowchart', flowchartOptionsTab, 2);
    this.addEditorTab('Mapping', mappingOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
    $GF.log.debug('CTRL : ', this.id, this);
    this.editModeTrue();
  }

  // For Grafana 7, who to know if edit mode is actived
  editModeTrue() {
    this.panel.editedFlag = true;
  }

  editModeFalse() {
    this.panel.editedFlag = false;
  }

  isEditedMode(): boolean {
    return this.panel.editedFlag;
  }

  isEditingMode(): boolean {
    return this.panel.isEditing === true;
  }

  // 9.1 : FIX for edit mode in grafana 7.x : Not work
  // Clean edit mode
  onTearDown() {
    $GF.log.debug('EVENT : ', this.id, 'onTearDown');
  }

  onGraphHover(event: any) {
    const self = this;
    const flowchartHandler = this.flowchartHandler;
    if (this.dashboard.sharedTooltipModeEnabled() && flowchartHandler !== undefined) {
      const timestamp = event.pos.x;
      const id = 'graph-hover';
      $GF.clearUniqTimeOut(id);
      const setGraphHover = () => {
        $GF.setGraphHover(timestamp);
        flowchartHandler.graphHoverChanged();
        self.render();
        self.GHApplied = true;
        $GF.clearUniqTimeOut(id);
      };
      $GF.setUniqTimeOut(setGraphHover, $GF.CONSTANTS.CONF_GRAPHHOVER_DELAY, id);
    } else if (self.GHApplied) {
      $GF.unsetGraphHover();
    }
  }

  clearCrosshair(event: any) {
    if (this.flowchartHandler !== undefined && this.GHApplied) {
      const id = 'graph-hover';
      this.GHApplied = false;
      $GF.clearUniqTimeOut(id);
      $GF.unsetGraphHover();
      this.flowchartHandler.graphHoverChanged();
      this.render();
    }
  }

  onRefresh() {
    $GF.log.debug('EVENT : ', this.id, 'onRefresh');
    this.onRender();
  }

  onVarChanged() {
    if (this.flowchartHandler !== undefined) {
      this.flowchartHandler.sourceChanged();
      this.flowchartHandler.render();
    }
  }

  onRender() {
    $GF.log.debug('EVENT : ', this.id, 'onRender', this);
    $GF.log.debug('EDIT MODE', this.id, this.isEditedMode());
    if (this.flowchartHandler && this.rulesHandler && this.isEditedMode() && !this.isEditingMode()) {
      this.editModeFalse();
      this.flowchartHandler.clear();
      this.flowchartHandler.import(this.panel.flowchartsData);
      // this.flowchartHandler.draw();
      this.rulesHandler.clear();
      this.rulesHandler.import(this.panel.rulesData);
      this.flowchartHandler.sourceChanged();
      this.flowchartHandler.render();
    }
  }

  onDataReceived(dataList) {
    $GF.log.debug('EVENT : ', this.id, 'onDataReceived');
    const trc = $GF.trace.before(this.constructor.name + '.' + 'onDataReceived()');
    if (!!this.metricHandler) {
      this.metricHandler.initData(dataList);
      if (!!this.flowchartHandler) {
        this.flowchartHandler.dataChanged();
      }
    }
    this.render();
    trc.after();
    $GF.trace.resume();
  }

  onDataError() {
    $GF.log.debug('EVENT : ', this.id, 'onDataError');
    this.render();
  }

  // onInitPanelActions(actions) {
  //   actions.push({
  //     text: 'Export SVG',
  //     click: 'ctrl.exportSVG()',
  //   });
  // }

  //
  // FUNCTIONS
  //
  link(scope, elem, attrs, ctrl) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'link()');

    // Init mxGraph/draw.io libs
    XGraph.initMxGraph();

    // DATA
    this.metricHandler = new MetricHandler(this.$scope);

    // RULES
    const newRulesData = RulesHandler.getDefaultData();
    this.rulesHandler = new RulesHandler(newRulesData);
    // for version < 0.4.0
    if (this.panel.version === undefined && this.panel.styles !== undefined) {
      this.rulesHandler.import(this.panel.styles);
      delete this.panel.styles;
    } else {
      this.rulesHandler.import(this.panel.rulesData);
    }
    if (this.panel.newFlag && this.rulesHandler.countRules() === 0) {
      this.rulesHandler.addRule('.*');
    }
    this.panel.rulesData = newRulesData;

    // FLOWCHART
    const newFlowchartsData = FlowchartHandler.getDefaultData();
    this.flowchartHandler = new FlowchartHandler(scope, elem, ctrl, newFlowchartsData);
    // for version < 0.4.0
    if (this.panel.version === undefined && this.panel.flowchart !== undefined) {
      this.flowchartHandler.import([this.panel.flowchart]);
      delete this.panel.flowchart;
    } else {
      this.flowchartHandler.import(this.panel.flowchartsData);
    }

    if (this.panel.newFlag && this.flowchartHandler.countFlowcharts() === 0) {
      this.flowchartHandler.addFlowchart('Main').init();
    }
    this.panel.flowchartsData = newFlowchartsData;

    // Versions
    this.panel.newFlag = false;
    this.panel.version = this.version;
    trc.after();
  }

  // exportSVG() {
  //   const scope = this.$scope.$new(true);
  //   scope.panel = 'table';
  //   this.publishAppEvent('show-modal', {
  //     templateHtml: '<export-data-modal panel="panel" data="tableData"></export-data-modal>',
  //     scope,
  //     modalClass: 'modal--narrow',
  //   });
  // }

  // setUnitFormat(subItem) {
  //   this.panel.format = subItem.value;
  //   this.refresh();
  // }

  // getVariables() {
  //   if (this.templateSrv !== undefined && this.templateSrv !== null) {
  //     return _.map(this.templateSrv.variables, variable => `\${${variable.name}}`);
  //   }
  //   return null;
  // }

  $onDestroy() {
    $GF.destroy();
  }
}

export { FlowchartCtrl, FlowchartCtrl as MetricsPanelCtrl };

FlowchartCtrl.templateUrl = './partials/module.html';
