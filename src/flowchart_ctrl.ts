import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
// import { appEvents } from 'grafana/app/core/core';
import { rulesOptionsTab } from 'rules_options';
import { flowchartsOptionsTab } from 'flowcharts_options';
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
  message: GFMessage | undefined;
  changedSource: boolean;
  changedData: boolean;
  changedOptions: boolean;
  rulesHandler: RulesHandler | undefined;
  flowchartHandler: FlowchartHandler | undefined;
  metricHandler: MetricHandler | undefined;
  id: String;
  GHApplied = false;
  mouseIn = false;
  panelDefaults: {
    newFlag: boolean;
    format: string;
    valueName: string;
    rulesData: gf.TIRulesHandlerData;
    flowchartsData: gf.TFlowchartHandlerData;
    version: string;
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
      version: $GF.plugin.getVersion(),
    };

    _.defaults(this.panel, this.panelDefaults);
    this.panel.graphId = `flowchart_${this.panel.id}`;
    this.containerDivId = `container_${this.panel.graphId}`;

    // events
    // console.log('grafana.PanelEvents', grafana.PanelEvents);
    // this.events.on(grafana.PanelEvents.render, this.onRender.bind(this));
    this.events.on('render', this.onRender.bind(this));
    // this.events.on(grafana.PanelEvents.refresh, this.onRefresh.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    // this.events.on(grafana.PanelEvents.dataReceived, this.onDataReceived.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    // this.events.on(grafana.PanelEvents.dataError, this.onDataError.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    // this.events.on(grafana.PanelEvents.dataSnapshotLoad, this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    // this.events.on(grafana.PanelEvents.editModeInitialized, this.onInitEditMode.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-teardown', this.onTearDown.bind(this));
    grafana.appEvents.on('graph-hover', this.onGraphHover.bind(this), this.$scope);
    grafana.appEvents.on('graph-hover-clear', this.clearCrosshair.bind(this), this.$scope);
    this.dashboard.events.on('template-variable-value-updated', this.onVarChanged.bind(this), $scope);
  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    this.addEditorTab('Flowcharts', flowchartsOptionsTab, 2);
    this.addEditorTab('Rules', rulesOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
    this.editModeTrue();
  }

  // 9.1 : FIX for edit mode in grafana 7.x : Not work
  // Clean edit mode
  onTearDown() {
    // $GF.log.debug('EVENT : ', this.id, 'onTearDown');
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
    // $GF.log.debug('EVENT : ', this.id, 'onRender', this);
    // $GF.log.debug('EDIT MODE', this.id, this.isEditedMode());
    if (this.flowchartHandler && this.rulesHandler && this.isEditedMode() && !this.isEditingMode()) {
      this.notify('Configuration updating...');
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
      this.flowchartHandler = new FlowchartHandler(this.flowchartsDiv, newFlowchartsData, this);
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

    const $section = this.$panelElem.find('#flowcharting-section');
    this.parentDiv = $section[0];

    // const $flowchartsDiv = this.$panelElem.find('#flowcharting-panel-content');
    const $flowchartsDiv = $section.find('#flowcharting-panel-content');
    this.flowchartsDiv = $flowchartsDiv[0];

    // const $message = $section.find('#flowcharting-message');
    // $GF.setMessageDiv($message[0]);
    // this.message = new GFMessage($message[0]);
    this.notify('Initialisation MXGRAPH/DRAW.IO Libs');

    // MxGraph Init
    XGraph.initMxGraph();
    this.notify('Load configuration');

    this.initHandlers();

    // Versions
    this.panel.newFlag = false;
    if (this.panel.version !== $GF.plugin.getVersion()) {
      this.notify(
        `The plugin version has changed, save the dashboard to optimize loading : ${
          this.panel.version
        } <> ${$GF.plugin.getVersion()}`
      );
    }
    this.panel.version = this.version;
    trc.after();
  }

  onMouseIn(event) {
    this.mouseIn = true;
  }

  onMouseOut(event) {
    this.mouseIn = false;
  }

  isMouseInPanel(): boolean {
    return this.mouseIn;
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

  /**
   * Display a message in current panel
   *
   * @memberof FlowchartCtrl
   */
  notify(message: string, type: string = GFMessage.INFO_MESSAGE) {
    if (this.message) {
      this.message.setMessage(message, type);
    } else {
      const $section = this.$panelElem.find('#flowcharting-section');
      const $message = $section.find('#flowcharting-message');
      this.message = new GFMessage($message[0]);
      this.notify(message, type);
    }
  }

  clearNotify() {
    if (this.message) {
      this.message.clearMessage();
    }
  }
}

export { FlowchartCtrl, FlowchartCtrl as MetricsPanelCtrl };
FlowchartCtrl.templateUrl = './partials/module.html';

class GFMessage {
  container: HTMLDivElement;
  message: HTMLSpanElement;
  id: String;
  static ERROR_MESSAGE = 'error';
  static ERROR_COLOR = 'red';
  static INFO_MESSAGE = 'info';
  static INFO_COLOR = 'white';
  static WARNING_MESSAGE = 'warning';
  static WARNING_COLOR = 'yellow';

  constructor(parent: HTMLDivElement) {
    this.id = $GF.utils.uniqueID();
    this.container = parent;
    const span = this.container.querySelector<HTMLSpanElement>('#message-text');
    if (span == null) {
      this.message = document.createElement('span');
      this.container.appendChild(this.message);
    } else {
      this.message = span;
    }
  }

  async setMessage(message: string, type: string = GFMessage.INFO_MESSAGE) {
    if (this.container && this.message) {
      this.message.innerHTML = message;
      switch (type) {
        case GFMessage.INFO_MESSAGE:
          this.message.style.color = GFMessage.INFO_COLOR;
          break;
        case GFMessage.ERROR_MESSAGE:
          this.message.style.color = GFMessage.ERROR_COLOR;
          break;
        case GFMessage.WARNING_MESSAGE:
          this.message.style.color = GFMessage.WARNING_COLOR;
          break;

        default:
          this.message.style.color = GFMessage.INFO_COLOR;
          break;
      }
      this.container.style.display = '';
      $GF.setUniqTimeOut(
        this.clearMessage.bind(this),
        $GF.CONSTANTS.CONF_GFMESSAGE_MS,
        `flowcharting-message-${this.id}`
      );
    }
  }

  clearMessage() {
    if (this.container && this.message) {
      this.container.style.display = 'none';
      this.message.innerHTML = '';
    }
    $GF.clearUniqTimeOut(`flowcharting-message-${this.id}`);
  }
}
