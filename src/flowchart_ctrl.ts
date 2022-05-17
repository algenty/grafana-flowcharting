import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
// import { appEvents } from 'grafana/app/core/core';
import { rulesOptionsTab } from 'rules_options';
import { flowchartsOptionsTab } from 'flowcharts_options';
import { inspectOptionsTab } from 'inspect_options';
import { RulesHandler } from 'rules_handler';
import { FlowchartHandler } from 'flowchart_handler';
import { MetricHandler } from 'metric_handler';
// import { PanelEvents } from '@grafana/data';
import { $GF, GFTimer, GFLog, GFPlugin, GFCONSTANT } from 'globals_class';
import { XGraph } from 'graph_class';
import grafana from 'grafana_func';
import { defaults as _defaults, cloneDeep as _cloneDeep } from 'lodash';
import { InteractiveMap } from 'mapping_class';

class FlowchartCtrl extends MetricsPanelCtrl {
  readonly $gf: $GF;
  $rootScope: any;
  $scope: any;
  $panelElem: any; // Type Jquery
  parentDiv: HTMLDivElement;
  flowchartsDiv: HTMLDivElement;
  templateSrv: any;
  version: any;
  graphOverTimeStamp = 0;
  message: GFMessage | undefined;
  changedSource: boolean;
  changedData: boolean;
  changedOptions: boolean;
  rulesHandler: RulesHandler | undefined;
  flowchartHandler: FlowchartHandler | undefined;
  metricHandler: MetricHandler | undefined;
  onMapping: InteractiveMap;
  uid: string;
  graphHoverTimer: GFTimer | undefined = undefined;
  mouseIn = false;
  firstLoad = true;
  panelDefaults: {
    // newFlag: boolean;
    format: string;
    valueName: string;
    rulesData: gf.TIRulesHandlerData;
    flowchartsData: gf.TFlowchartHandlerData;
    version: string;
  };
  containerDivId: string;
  static templateUrl: string;

  /**@ngInject*/
  constructor($scope: any, $injector: any, $rootScope: any, templateSrv: any) {
    super($scope, $injector);
    this.$gf = $GF.create($scope, templateSrv, this.dashboard, this);
    this.$scope.$GF = this.$gf;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    $scope.editor = this;
    this.version = GFPlugin.getVersion();
    this.templateSrv = templateSrv;
    this.changedSource = true;
    this.changedData = true;
    this.changedOptions = true;
    this.rulesHandler = undefined;
    this.flowchartHandler = undefined;
    this.metricHandler = undefined;
    this.onMapping = new InteractiveMap();
    this.parentDiv = document.createElement('div');
    this.flowchartsDiv = document.createElement('div');
    this.uid = $GF.genUid();
    this.panelDefaults = FlowchartCtrl.getDefaultData();
    _defaults(this.panel, this.panelDefaults);
    this.panel.graphId = `flowchart_${this.panel.id}`;
    this.containerDivId = `container_${this.panel.graphId}`;
    // console.log('this.panel', this.panel);
    // debugger;

    // If save in edited mode
    if (!this.isEditingMode() && this.isEditedMode()) {
      this.editModeFalse();
    }

    // Force refresh since 7.x
    window.setTimeout(() => {
      this._on_grafana_refreshed();
    }, 1000);

    this.events.on('render', this._on_grafana_rendered.bind(this));
    this.events.on('refresh', this._on_grafana_refreshed.bind(this));
    this.events.on('data-received', this._on_grafana_data_received.bind(this));
    this.events.on('data-error', this._on_grafana_data_error.bind(this));
    this.events.on('data-snapshot-load', this._on_grafana_data_received.bind(this));
    this.events.on('init-edit-mode', this._on_grafana_mode_edited.bind(this));
    this.events.on('panel-teardown', this._on_grafana_TearDown.bind(this));
    grafana.appEvents.on('graph-hover', this._on_grafana_graph_hover.bind(this), this.$scope);
    grafana.appEvents.on('graph-hover-clear', this._on_grafana_graph_hover_clear.bind(this), this.$scope);
    this.dashboard.events.on(
      'template-variable-value-updated',
      this._on_grafana_template_variable_value_updated.bind(this),
      $scope
    );
  }

  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE/CLEAR
  //############################################################################
  init_ctrl() {
    this.init_connectors();
    this.init_handlers();
  }

  change() {}

  //############################################################################
  //### LOGIC
  //############################################################################
  init_connectors() {
    this.$gf.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    this.$gf.events.connect('panel_closed', this, this._on_global_panel_closed.bind(this));
  }

  init_handlers() {
    const funcName = 'initHandlers';
    GFLog.debug(`${this.constructor.name}.${funcName}()`);
    // METRICS / DATAS
    if (!this.metricHandler) {
      this.metricHandler = new MetricHandler(this.$gf);
    }
    // this.metricHandler.clear();
    // FLOWCHARTS
    if (!this.flowchartHandler) {
      const newFlowchartsData = FlowchartHandler.getDefaultData();
      this.flowchartHandler = new FlowchartHandler(this.$gf, newFlowchartsData, this.panel.flowchartsData);
      this.panel.flowchartsData = newFlowchartsData;
    } else {
      // TODO : when exit editor
      // this.flowchartHandler.free();
      // this.flowchartHandler._covert(this.panel.flowchartsData, );
    }

    // TODO : needed ?
    if (this.panel.newFlag && this.flowchartHandler && this.flowchartHandler.countFlowcharts() === 0) {
      this.flowchartHandler.addFlowchart('Main').init();
    }

    // RULES
    if (!this.rulesHandler) {
      const newRulesData = RulesHandler.getDefaultData();
      this.rulesHandler = new RulesHandler(this.$gf, newRulesData, this.panel.rulesData);
      this.panel.rulesData = newRulesData;
    } else {
      // TODO : when exit editor
    }

    // TODO : needed ?
    if (this.panel.newFlag && this.rulesHandler.countRules() === 0) {
      this.rulesHandler.addRule('.*');
    }
    this.$gf.setHandlers(this.flowchartHandler, this.rulesHandler, this.metricHandler);
  }

  clear_connectors() {
    this.$gf.events.disconnect('debug_asked', this);
    this.$gf.events.disconnect('panel_closed', this);
  }

  /**
   * Return data with default value
   *
   * @static
   * @returns PanelDatas
   * @memberof RulesHandler
   */
  static getDefaultData() {
    return {
      format: 'short',
      valueName: 'current',
      rulesData: RulesHandler.getDefaultData(),
      flowchartsData: FlowchartHandler.getDefaultData(),
      version: GFPlugin.getVersion(),
    };
  }

  private _setGraphHover() {
    this.metricHandler?.refreshMetrics(this.graphOverTimeStamp);
  }

  //###########################################################################
  //### EVENTS
  //###########################################################################
  _on_grafana_mode_edited() {
    console.log('📩', this.constructor.name, '_on_grafana_mode_edited');
    this.addEditorTab('Flowcharts', flowchartsOptionsTab, 2);
    this.addEditorTab('Rules', rulesOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
    this.editModeTrue();
  }

  _on_grafana_TearDown() {
    console.log('📩', this.constructor.name, '_on_TearDown');
    this.$gf.events.emit('panel_closed');
  }

  _on_grafana_graph_hover(event: any) {
    console.log('📩', this.constructor.name, '_on_grafana_graph_hover');
    const flowchartHandler = this.flowchartHandler;
    if (this.dashboard.sharedTooltipModeEnabled() && flowchartHandler !== undefined) {
      this.graphHoverTimer = event.pos.x;
      const timeId = 'graph-hover';
      if (this.graphHoverTimer === undefined) {
        this.graphHoverTimer = GFTimer.create(timeId);
      }
      const ms = GFCONSTANT.CONF_GRAPHHOVER_DELAY;
      this.graphHoverTimer.addStep(this._setGraphHover.bind(this), ms).start();
    } else {
      this.graphHoverTimer?.cancel();
      this.graphHoverTimer = undefined;
    }
  }

  private _on_grafana_graph_hover_clear(event: any) {
    console.log('📩', this.constructor.name, '_on_grafana_graph_hover_clear');
    if (this.flowchartHandler !== undefined && this.graphHoverTimer !== undefined) {
      this.graphHoverTimer?.cancel();
      this.graphHoverTimer = undefined;
      this.metricHandler?.refreshMetrics();
    }
  }

  private _on_grafana_refreshed() {
    console.log('📩', this.constructor.name, '_on_grafana_refreshed');
    this.flowchartHandler?.update();
  }

  private _on_grafana_template_variable_value_updated() {
    console.log('📩', this.constructor.name, '_on_grafana_template_variable_value_updated');
    this.$gf.events.emit('variables_changed');
    if (this.flowchartHandler !== undefined) {
      // TODO refresh with new variable
      // this.flowchartHandler.onChangeGraph();
      // this.flowchartHandler.render();
    }
  }

  private _on_grafana_rendered() {
    console.log('📩', this.constructor.name, '_on_grafana_rendered');
    if (this.flowchartHandler && this.rulesHandler && this.isEditedMode() && !this.isEditingMode()) {
      this.notify('Configuration updating...');
      this.editModeFalse();
      // const panelClone = _cloneDeep(this.panel);
      this.flowchartHandler.free();
      this.flowchartHandler = undefined;
      this.rulesHandler.free();
      this.flowchartHandler = undefined;
      this.init_handlers();
    }
    this.flowchartHandler?.render();
  }

  private _on_grafana_data_received(dataList: any) {
    console.log('📩', this.constructor.name, '_on_grafana_data_received');
    this.$gf.events.emit('data_updated', dataList);
  }

  private _on_grafana_data_error() {
    console.log('📩', this.constructor.name, '_on_grafana_data_error');
    this.render();
  }

  private _on_global_debug_asked() {
    console.log('📩', this.constructor.name, '_on_global_debug_asked');
    console.log('🧰', 'DATA', this.panel);
  }

  private _on_global_panel_closed() {
    console.log('📩', this.constructor.name, '_on_global_panel_closed');
    console.log('Close connectors');
    this.clear_connectors();
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

  link(scope: any, elem: any, attrs: any, ctrl: any) {
    const funcName = 'link';
    GFLog.debug(`${this.constructor.name}.${funcName}()`);
    this.$panelElem = elem;
    const $section = this.$panelElem.find('#flowcharting-section');
    this.parentDiv = $section[0];
    const $flowchartsDiv = $section.find('#flowcharting-panel-content');
    this.flowchartsDiv = $flowchartsDiv[0];
    this.onMapping.setContainer(this.flowchartsDiv);
    this.notify('Initialisation MXGRAPH/DRAW.IO Libs');

    // MxGraph Init
    this.notify('Load configuration');
    XGraph.initMxGraphLib().then(()=> {
      this.init_ctrl();
    })

    // Versions
    // this.panel.newFlag = false;
    if (this.panel.version !== GFPlugin.getVersion()) {
      //TODO : Reactive this
      // this.notify(
      //   `The plugin version has changed, save the dashboard to optimize loading : ${
      //     this.panel.version
      //   } <> ${$GF.plugin.getVersion()}`
      // );
    }
    this.panel.version = this.version;
    // this.onRender();
    // this.flowchartHandler?.refresh();
  }

  isMouseInPanel(): boolean {
    return this.mouseIn;
  }

  displayMultiCursor(): boolean {
    if (this.flowchartHandler) {
      return this.flowchartHandler.isMultiFlowcharts();
    }
    return false;
  }

  displayFirstCursor(): boolean {
    if (this.flowchartHandler) {
      return !this.flowchartHandler.isCurrentfirst();
    }
    return false;
  }

  displayLastCursor(): boolean {
    if (this.flowchartHandler) {
      return !this.flowchartHandler.isCurrentLast();
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

  //
  // EVENTS
  //

  $onDestroy() {
    // $GF.destroy();
    GFTimer.stop();
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
  uid: String;
  static ERROR_MESSAGE = 'error';
  static ERROR_COLOR = 'red';
  static INFO_MESSAGE = 'info';
  static INFO_COLOR = 'white';
  static WARNING_MESSAGE = 'warning';
  static WARNING_COLOR = 'yellow';

  constructor(parent: HTMLDivElement) {
    this.uid = $GF.genUid();
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
      GFTimer.create(`message-${this.uid}`).addStep(this.clearMessage.bind(this), GFCONSTANT.CONF_GFMESSAGE_MS);
      this.container.style.display = '';

    }
  }

  clearMessage() {
    if (this.container && this.message) {
      this.container.style.display = 'none';
      this.message.innerHTML = '';
    }
    GFTimer.stop(`message-${this.uid}`);
  }
}
