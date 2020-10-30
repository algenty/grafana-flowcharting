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
import XGraph from 'graph_class';
import grafana from 'grafana_func';
import _ from 'lodash';

class FlowchartCtrl extends MetricsPanelCtrl {
  $rootScope: any;
  $scope: any;
  $panelElem: any; // Type Jquery
  parentDiv: HTMLDivElement;
  flowchartsDiv: HTMLDivElement;
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
  };
  containerDivId: string;
  static templateUrl: string;
  /**@ngInject*/
  constructor($scope, $injector, $rootScope, templateSrv) {
    super($scope, $injector);
    $GF.init($scope, templateSrv, this.dashboard, this);
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    $scope.editor = this;
    this.version = $GF.plugin.getVersion();
    this.templateSrv = templateSrv;
    this.changedSource = true;
    this.changedData = true;
    this.changedOptions = true;
    this.rulesHandler = undefined;
    this.flowchartHandler = undefined;
    this.metricHandler = undefined;
    this.parentDiv = document.createElement('div');
    this.flowchartsDiv = document.createElement('div');
    this.id = $GF.utils.uniqueID();
    this.panelDefaults = {
      newFlag: true,
      format: 'short',
      valueName: 'current',
      rulesData: RulesHandler.getDefaultData(),
      flowchartsData: FlowchartHandler.getDefaultData(),
    };

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
  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    this.addEditorTab('Flowchart', flowchartOptionsTab, 2);
    this.addEditorTab('Mapping', mappingOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
    $GF.log.debug('CTRL : ', this.id, this);
    this.editModeTrue();
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
        flowchartHandler.onGraphHoverChange();
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
      this.flowchartHandler.onGraphHoverChange();
      this.render();
    }
  }

  onRefresh() {
    this.onRender();
  }

  onVarChanged() {
    if (this.flowchartHandler !== undefined) {
      this.flowchartHandler.onSourceChange();
      this.flowchartHandler.render();
    }
  }

  onRender() {
    $GF.log.debug('EVENT : ', this.id, 'onRender', this);
    $GF.log.debug('EDIT MODE', this.id, this.isEditedMode());
    if (this.flowchartHandler && this.rulesHandler && this.isEditedMode() && !this.isEditingMode()) {
      $GF.message.setMessage('Configuration updating...');
      this.editModeFalse();
      const panelClone = _.cloneDeep(this.panel);
      this.flowchartHandler.clear();
      this.flowchartHandler.import(panelClone.flowchartsData);
      // this.flowchartHandler.draw();
      this.rulesHandler.clear();
      this.rulesHandler.import(panelClone.rulesData);
      this.flowchartHandler.onSourceChange();
      this.flowchartHandler.render();
    }
  }

  onDataReceived(dataList) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'onDataReceived()');
    if (!!this.metricHandler) {
      this.metricHandler.initData(dataList);
      if (!!this.flowchartHandler) {
        this.flowchartHandler.onDatasChange();
      }
    }
    this.render();
    trc.after();
    $GF.trace.resume();
  }

  onDataError() {
    this.render();
  }

  //
  // Functions ----------------------------------------------------------------
  //
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

  initHandlers() {
    // METRICS / DATAS
    if (!this.metricHandler) {
      this.metricHandler = new MetricHandler();
    }
    this.metricHandler.clear();
    // FLOWCHARTS
    if (!this.flowchartHandler) {
      const newFlowchartsData = FlowchartHandler.getDefaultData();
      this.flowchartHandler = new FlowchartHandler(this.flowchartsDiv, newFlowchartsData);
      if (this.flowchartHandler) {
        this.flowchartHandler.import(this.panel.flowchartsData);
      }
      this.panel.flowchartsData = newFlowchartsData;
    } else {
      this.flowchartHandler.clear();
      this.flowchartHandler.import(this.panel.flowchartsData);
    }
    if (this.panel.newFlag && this.flowchartHandler && this.flowchartHandler.countFlowcharts() === 0) {
      this.flowchartHandler.addFlowchart('Main').init();
    }

    // RULES
    if (this.rulesHandler) {
      this.rulesHandler.clear();
    } else {
      const newRulesData = RulesHandler.getDefaultData();
      this.rulesHandler = new RulesHandler(newRulesData);
      this.rulesHandler.import(this.panel.rulesData);
      this.panel.rulesData = newRulesData;
    }
    if (this.panel.newFlag && this.rulesHandler.countRules() === 0) {
      this.rulesHandler.addRule('.*');
    }
  }

  link(scope, elem, attrs, ctrl) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'link()');
    this.$panelElem = elem;

    const $section = elem.find('#flowcharting-section');
    this.parentDiv = $section[0];

    const $elem = elem.find('#flowcharting-panel-content');
    this.flowchartsDiv = $elem[0];

    const $message = $section.find('#flowcharting-message');
    $GF.setMessageDiv($message[0]);

    $GF.message.setMessage('Initialisation MXGRAPH/DRAW.IO Libs');
    // MxGraph Init
    XGraph.initMxGraph();

    $GF.message.setMessage('Load configuration');

    this.initHandlers();
    // DATA
    // this.metricHandler = new MetricHandler();

    // RULES
    // const newRulesData = RulesHandler.getDefaultData();
    // this.rulesHandler = new RulesHandler(newRulesData);
    // // for version < 0.4.0
    // if (this.panel.version === undefined && this.panel.styles !== undefined) {
    //   this.rulesHandler.import(this.panel.styles);
    //   delete this.panel.styles;
    // } else {
    //   this.rulesHandler.import(this.panel.rulesData);
    // }
    // if (this.panel.newFlag && this.rulesHandler.countRules() === 0) {
    //   this.rulesHandler.addRule('.*');
    // }
    // this.panel.rulesData = newRulesData;

    // FLOWCHART
    // const newFlowchartsData = FlowchartHandler.getDefaultData();
    // this.flowchartHandler = new FlowchartHandler(scope, elem, ctrl, newFlowchartsData);
    // // for version < 0.4.0
    // if (this.panel.version === undefined && this.panel.flowchart !== undefined) {
    //   this.flowchartHandler.import([this.panel.flowchart]);
    //   delete this.panel.flowchart;
    // } else {
    //   this.flowchartHandler.import(this.panel.flowchartsData);
    // }
    // if (this.panel.newFlag && this.flowchartHandler.countFlowcharts() === 0) {
    //   this.flowchartHandler.addFlowchart('Main').init();
    // }
    // this.panel.flowchartsData = newFlowchartsData;

    // Position to main flowchart
    // if(this.flowchartHandler) {
    //   this.flowchartHandler.setCurrentFlowchart('Main');
    // }

    // Versions
    this.panel.newFlag = false;
    if (this.panel.version !== $GF.plugin.getVersion()) {
      $GF.message.setMessage('The plugin version has changed, save the dashboard to optimize loading');
    }
    this.panel.version = this.version;
    trc.after();
  }

  displayMultiCursor(): boolean {
    if (this.flowchartHandler) {
      return this.flowchartHandler?.isMultiFlowcharts();
    }
    return false;
  }

  displayFirstCursor(): boolean {
    if (this.flowchartHandler) {
      return !this.flowchartHandler?.isCurrentfirst();
    }
    return false;
  }

  displayLastCursor(): boolean {
    if (this.flowchartHandler) {
      return !this.flowchartHandler?.isCurrentLast();
    }
    return false;
  }

  displayNextFlowchart() {
    if (this.flowchartHandler) {
      this.flowchartHandler.setNextFlowchart();
    }
  }

  displayPreviousFlowchart() {
    if (this.flowchartHandler) {
      this.flowchartHandler.setPreviousFlowchart();
    }
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
