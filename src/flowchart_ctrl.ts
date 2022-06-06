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
import grafana from 'grafana_func';
import { defaults as _defaults, cloneDeep as _cloneDeep } from 'lodash';
// import { InteractiveMap } from 'mapping_class';
import { GFDrawio } from 'drawio_base';

// Debug
const DEBUG = false;
const _log = (...args: any) => {
  DEBUG && console.log(...args);
};

// Signal definition

class FlowchartCtrl extends MetricsPanelCtrl {
  readonly $gf: $GF;
  $rootScope: any;
  $scope: any;
  $panelElem: any; // Type Jquery
  parentDiv: HTMLDivElement;
  flowchartsDiv: HTMLDivElement;
  templateSrv: any;
  version: any;
  GFPlugin!: GFPlugin; // Initialized in GFPlugin.init()
  graphOverTimeStamp = 0;
  message: GFMessage | undefined;
  changedSource: boolean;
  changedData: boolean;
  changedOptions: boolean;
  dataList: any;
  rulesHandler: RulesHandler | undefined;
  flowchartHandler: FlowchartHandler | undefined;
  metricHandler: MetricHandler | undefined;
  onMapping = false;
  uid: string = $GF.genUid(this.constructor.name);
  graphHoverTimer: GFTimer | undefined = undefined;
  mouseIn = false;
  firstLoad = true;
  panelDefaults: {
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
    _log('FlowchartCtrl', this.uid);
    this.$gf = $GF.create($scope, templateSrv, this.dashboard, this);
    // this.$scope.$GF = this.$gf;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    $scope.editor = this;
    this.version = GFPlugin.getVersion();
    this.templateSrv = templateSrv;
    this.changedSource = true;
    this.changedData = true;
    this.changedOptions = true;
    // this.onMapping = new InteractiveMap();
    this.parentDiv = document.createElement('div');
    this.flowchartsDiv = document.createElement('div');
    // this.uid = $GF.genUid();
    this.panelDefaults = FlowchartCtrl.getDefaultData();
    _defaults(this.panel, this.panelDefaults);
    this.panel.graphId = `flowchart_${this.panel.id}`;
    this.containerDivId = `container_${this.panel.graphId}`;
    _log('INIT DATA', Object.assign({}, this.panel));

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
  //### INIT/UPDATE/CHANGE/FREE/CLEAR (DO NOT NAME INIT, Called by angular by default)
  //############################################################################
  init_ctrl() {
    this._eventsConnect();
    this.init_handlers();
  }

  free() {
    this.free_ctrl();
  }

  free_ctrl() {
    this._eventsDisconnect();
    this.free_handlers();
  }

  change() {
    this.free_ctrl();
    this.init_ctrl();
  }

  //############################################################################
  //### LOGIC
  //############################################################################
  _eventsConnect() {
    this.$gf.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    this.$gf.events.connect('panel_closed', this, this._on_global_panel_closed.bind(this));
    this.$gf.events.connect('editmode_closed', this, this._on_global_editmode_closed.bind(this));
    this.$gf.events.connect('mapping_enabled', this, this._on_global_mapping_enabled.bind(this));
    this.$gf.events.connect('mapping_disabled', this, this._on_global_mapping_disabled.bind(this));
  }

  _eventsDisconnect() {
    this.$gf.events.disconnect('debug_asked', this);
    this.$gf.events.disconnect('panel_closed', this);
    this.$gf.events.disconnect('mapping_enabled', this);
    this.$gf.events.disconnect('mapping_disabled', this);
  }

  init_handlers() {
    const funcName = 'initHandlers';
    GFLog.debug(`${this.constructor.name}.${funcName}()`);
    // METRICS / DATAS
    if (!this.metricHandler) {
      this.metricHandler = new MetricHandler(this.$gf);
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
  }

  free_handlers() {
    this.metricHandler?.free();
    this.rulesHandler?.free();
    this.flowchartHandler?.free();
    this.metricHandler = undefined;
    this.rulesHandler = undefined;
    this.flowchartHandler = undefined;
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

  private _isClosedMode() {
    if (this.panel.gf_isEdited && !this.panel.isEditing) {
      delete this.panel.gf_isEdited;
      _log('EVENTS', this.events);
      this._eventsDisconnect();
      this._eventsConnect();
      this.$gf.events.emit('editmode_closed');
      // this._on_global_editmode_closed();
      return true;
    }
    return false;
  }

  link(scope: any, elem: any, attrs: any, ctrl: any) {
    this.$panelElem = elem;
    const $section = this.$panelElem.find('#flowcharting-section');
    this.parentDiv = $section[0];
    const $flowchartsDiv = $section.find('#flowcharting-panel-content');
    this.flowchartsDiv = $flowchartsDiv[0];
    // this.onMapping.setContainer(this.flowchartsDiv);
    this.notify('Initialisation MXGRAPH/DRAW.IO Libs');

    // MxGraph Init
    this.notify('Load configuration');
    if (this.panel.gf_isEdited) {
      delete this.panel.gf_isEdited;
    }
    GFDrawio.init();
    this.init_ctrl();
    if (this.panel.version !== GFPlugin.getVersion()) {
      //TODO : Reactive this
      // this.notify(
      //   `The plugin version has changed, save the dashboard to optimize loading : ${
      //     this.panel.version
      //   } <> ${$GF.plugin.getVersion()}`
      // );
    }
    this.clearNotify();
    this.panel.version = this.version;
    // Open is edit mode
    if (this.panel.isEditing === true) {
      this.panel.gf_isEdited = true;
    }
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

  //###########################################################################
  //### EVENTS
  //###########################################################################
  _on_grafana_mode_edited() {
    _log('📬', this.constructor.name, this.uid, `isEditing=${this.panel.isEditing}`, '_on_grafana_mode_edited');
    this.addEditorTab('Flowcharts', flowchartsOptionsTab, 2);
    this.addEditorTab('Rules', rulesOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
  }

  _on_grafana_TearDown() {
    _log('📬', this.constructor.name, this.uid, `isEditing=${this.panel.isEditing}`, '_on_TearDown');
    this.$gf.events.emit('panel_closed');
  }

  _on_grafana_graph_hover(event: any) {
    _log('📬', this.constructor.name, this.uid, '_on_grafana_graph_hover');
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
    _log('📬', this.constructor.name, this.uid, '_on_grafana_graph_hover_clear');
    if (this.flowchartHandler !== undefined && this.graphHoverTimer !== undefined) {
      this.graphHoverTimer?.cancel();
      this.graphHoverTimer = undefined;
      this.metricHandler?.refreshMetrics();
    }
  }

  private _on_grafana_refreshed() {
    _log('📬', this.constructor.name, this.uid, '_on_grafana_refreshed');
    // if(! this.firstLoad) {
    this.flowchartHandler?.update();
    this.firstLoad = false;
    // }
  }

  private _on_grafana_template_variable_value_updated() {
    _log('📬', this.constructor.name, this.uid, '_on_grafana_template_variable_value_updated');
    this.$gf.events.emit('variables_changed');
    if (this.flowchartHandler !== undefined) {
      // TODO refresh with new variable
      // this.flowchartHandler.onChangeGraph();
      // this.flowchartHandler.render();
    }
  }

  private _on_grafana_rendered() {
    _log('📬', this.constructor.name, this.uid, '_on_grafana_rendered');
    !this._isClosedMode() && this.flowchartHandler?.update();
  }

  private _on_grafana_data_received(dataList: any) {
    _log('📬', this.constructor.name, this.uid, '_on_grafana_data_received');
    this.dataList = dataList;
    this.$gf.events.emit('data_updated', dataList);
  }

  private _on_grafana_data_error() {
    _log('📬', this.constructor.name, this.uid, '_on_grafana_data_error');
    this.render();
  }

  private _on_global_debug_asked() {
    _log('📬', this.constructor.name, this.uid, '_on_global_debug_asked');
    _log('🗃️', 'DATA', this.panel);
  }

  private _on_global_panel_closed() {
    _log('📬', this.constructor.name, this.uid, '_on_global_panel_closed');
    this.free();
  }

  private async _on_global_editmode_closed() {
    _log('📬', this.constructor.name, this.uid, '_on_global_editmode_closed');
    this.notify('Configuration updating...');
    this.free_ctrl();
    this.init_ctrl();
    await new Promise((r) => setTimeout(r, 100));
    this.$gf.events.emit('data_updated', this.dataList);
    this.clearNotify();
    return;
  }

  private _on_global_mapping_enabled() {
    _log('📬', this.constructor.name, this.uid, '_on_global_mapping_enabled');
    this.onMapping = true;
    this.flowchartsDiv.style.cursor = `url("${GFPlugin.getStaticPath()}cursor-marker.svg") 8 16, crosshair`;
    this.flowchartsDiv.scrollIntoView();
    this.flowchartsDiv.focus();
  }

  private _on_global_mapping_disabled() {
    _log('📬', this.constructor.name, this.uid, '_on_global_mapping_disabled');
    this.onMapping = false;
    this.flowchartsDiv.style.cursor = 'auto';
  }

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
