import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
// import { appEvents } from 'grafana/app/core/core';
import { rulesOptionsTab } from 'rules_options';
import { flowchartsOptionsTab } from 'flowcharts_options';
import { inspectOptionsTab } from 'inspect_options';
import { RulesHandler } from 'rules_handler';
import { FlowchartHandler } from 'flowchart_handler';
import { MetricHandler } from 'metric_handler';
// import { PanelEvents } from '@grafana/data';
import { $GF, GFTimer, GFLog } from 'globals_class';
import { XGraph } from 'graph_class';
import grafana from 'grafana_func';
import { defaults as _defaults, cloneDeep as _cloneDeep } from 'lodash';
import { InteractiveMap } from 'mapping_class';

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
    $GF.init($scope, templateSrv, this.dashboard, this);
    this.$scope.$GF = $GF.me();
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
    this.onMapping = new InteractiveMap();
    this.parentDiv = document.createElement('div');
    this.flowchartsDiv = document.createElement('div');
    this.uid = $GF.genUid();
    this.panelDefaults = FlowchartCtrl.getDefaultData();
    _defaults(this.panel, this.panelDefaults);
    this.panel.graphId = `flowchart_${this.panel.id}`;
    this.containerDivId = `container_${this.panel.graphId}`;

    // If save in edited mode
    if (!this.isEditingMode() && this.isEditedMode()) {
      this.editModeFalse();
    }

    // Force refresh since 7.x
    window.setTimeout(() => {
      this._on_events_refreshed();
    }, 1000);

    this.events.on('render', this._on_events_rendered.bind(this));
    this.events.on('refresh', this._on_events_refreshed.bind(this));
    this.events.on('data-received', this._on_events_data_updated.bind(this));
    this.events.on('data-error', this._on_events_data_error.bind(this));
    this.events.on('data-snapshot-load', this._on_events_data_updated.bind(this));
    this.events.on('init-edit-mode', this._on_events_mode_edited.bind(this));
    this.events.on('panel-teardown', this._on_TearDown.bind(this));
    grafana.appEvents.on('graph-hover', this._on_events_graph_shared.bind(this), this.$scope);
    grafana.appEvents.on('graph-hover-clear', this._on_events_graph_unshared.bind(this), this.$scope);
    this.dashboard.events.on('template-variable-value-updated', this._on_events_variables_changed.bind(this), $scope);
    $GF.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this))
    $GF.events.emit('debug_asked');
    //TODO : Have 2 flowchart after loaded
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
      version: $GF.plugin.getVersion(),
    };
  }

  //
  // EVENTS FCT
  //
  /**
   * Edit Mode Event
   *
   * @memberof FlowchartCtrl
   */
  _on_events_mode_edited() {
    this.addEditorTab('Flowcharts', flowchartsOptionsTab, 2);
    this.addEditorTab('Rules', rulesOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
    this.editModeTrue();
  }

  // 9.1 : FIX for edit mode in grafana 7.x : Not work
  // Clean edit mode
  _on_TearDown() {
    // GFLog.debug('EVENT : ', this.id, 'onTearDown');
  }

  /**
   * GraphHover Event
   *
   * @param {*} event
   * @memberof FlowchartCtrl
   */
  _on_events_graph_shared(event: any) {
    const flowchartHandler = this.flowchartHandler;
    if (this.dashboard.sharedTooltipModeEnabled() && flowchartHandler !== undefined) {
      const timestamp = event.pos.x;
      const timeId = 'graph-hover';
      const self = this;
      const setGraphHover = () => {
        self.metricHandler?.refreshMetrics(timestamp);
      };
      if (this.graphHoverTimer === undefined) {
        this.graphHoverTimer = GFTimer.create(timeId);
      }
      const ms = $GF.CONSTANTS.CONF_GRAPHHOVER_DELAY;
      this.graphHoverTimer.addStep(setGraphHover.bind(this), ms).start();
    } else {
      this.graphHoverTimer?.cancel();
      this.graphHoverTimer = undefined;
    }
  }

  /**
   * Clear GraphHover
   *
   * @param {*} event
   * @memberof FlowchartCtrl
   */
  _on_events_graph_unshared(event: any) {
    if (this.flowchartHandler !== undefined && this.graphHoverTimer !== undefined) {
      this.graphHoverTimer?.cancel();
      this.graphHoverTimer = undefined;
      this.metricHandler?.refreshMetrics();
    }
  }

  _on_events_refreshed() {
    const funcName = 'onRefresh';
    GFLog.debug(`${this.constructor.name}.${funcName}()`);
    this.flowchartHandler?.update();
  }

  /**
   * OnVar Event
   *
   * @memberof FlowchartCtrl
   */
  _on_events_variables_changed() {
    const funcName = 'onVarChanged';
    GFLog.debug(`${this.constructor.name}.${funcName}()`);
    if (this.flowchartHandler !== undefined) {
      // this.flowchartHandler.onChangeGraph();
      // this.flowchartHandler.render();
    }
  }

  /**
   * OnRender Event
   *
   * @memberof FlowchartCtrl
   */
  _on_events_rendered() {
    const funcName = 'onRender';
    GFLog.debug(`${this.constructor.name}.${funcName}()`);
    if (this.flowchartHandler && this.rulesHandler && this.isEditedMode() && !this.isEditingMode()) {
      this.notify('Configuration updating...');
      this.editModeFalse();
      // const panelClone = _cloneDeep(this.panel);
      this.flowchartHandler.free();
      this.flowchartHandler = undefined;
      this.rulesHandler.free();
      this.flowchartHandler = undefined;
      this.initHandlers();
      // this.flowchartHandler._covert(panelClone.flowchartsData);
      // this.flowchartHandler.update();
      // this.rulesHandler._convert(panelClone.rulesData);
      // this.rulesHandler.update();
    }
    this.flowchartHandler?.render();
  }

  /**
   * Data receved Event
   *
   * @param {*} dataList : Array of dalalist
   * @memberof FlowchartCtrl
   */
  private _on_events_data_updated(dataList: any) {
    const funcName = 'onDataReceived';
    GFLog.debug(`${this.constructor.name}.${funcName}()`);
    const trc = $GF.trace.before(this.constructor.name + '.' + 'onDataReceived()');
    $GF.events.emit('data_updated', dataList);
    // this.metricHandler?.setDataList(dataList);
    // this.metricHandler?.change();
    trc.after();
    $GF.trace.resume();
  }

  private _on_events_data_error() {
    this.render();
  }

  private _on_global_debug_asked() {
    console.log("🧰", 'DATA', this.panel);
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
    const funcName = 'initHandlers';
    GFLog.debug(`${this.constructor.name}.${funcName}()`);
    // METRICS / DATAS
    if (!this.metricHandler) {
      this.metricHandler = new MetricHandler();
    }
    this.metricHandler.clear();
    // FLOWCHARTS
    if (!this.flowchartHandler) {
      const newFlowchartsData = FlowchartHandler.getDefaultData();
      this.flowchartHandler = new FlowchartHandler(newFlowchartsData, this.panel.flowchartsData);
      // this.flowchartHandler._covert(this.panel.flowchartsData);
      this.panel.flowchartsData = newFlowchartsData;
    } else {
      // TODO : when exit editor
      // this.flowchartHandler.free();
      // this.flowchartHandler._covert(this.panel.flowchartsData, );
    }
    if (this.panel.newFlag && this.flowchartHandler && this.flowchartHandler.countFlowcharts() === 0) {
      this.flowchartHandler.addFlowchart('Main').init();
    }

    // RULES
    if (this.rulesHandler) {
      this.rulesHandler.clear();
    } else {
      const newRulesData = RulesHandler.getDefaultData();
      this.rulesHandler = new RulesHandler(newRulesData,this.panel.rulesData);
      // this.rulesHandler._convert(this.panel.rulesData);
      this.panel.rulesData = newRulesData;
    }
    if (this.panel.newFlag && this.rulesHandler.countRules() === 0) {
      this.rulesHandler.addRule('.*');
    }
  }

  link(scope: any, elem: any, attrs: any, ctrl: any) {
    const funcName = 'link';
    GFLog.debug(`${this.constructor.name}.${funcName}()`);
    const trc = $GF.trace.before(this.constructor.name + '.' + 'link()');
    this.$panelElem = elem;

    const $section = this.$panelElem.find('#flowcharting-section');
    this.parentDiv = $section[0];

    // const $flowchartsDiv = this.$panelElem.find('#flowcharting-panel-content');
    const $flowchartsDiv = $section.find('#flowcharting-panel-content');
    this.flowchartsDiv = $flowchartsDiv[0];
    this.onMapping.setContainer(this.flowchartsDiv);

    // const $message = $section.find('#flowcharting-message');
    // $GF.setMessageDiv($message[0]);
    // this.message = new GFMessage($message[0]);
    this.notify('Initialisation MXGRAPH/DRAW.IO Libs');

    // MxGraph Init
    XGraph.initMxGraphLib();
    this.notify('Load configuration');

    this.initHandlers();

    // Versions
    // this.panel.newFlag = false;
    if (this.panel.version !== $GF.plugin.getVersion()) {
      this.notify(
        `The plugin version has changed, save the dashboard to optimize loading : ${
          this.panel.version
        } <> ${$GF.plugin.getVersion()}`
      );
    }
    this.panel.version = this.version;
    // this.onRender();
    // this.flowchartHandler?.refresh();
    trc.after();
  }

  // onMouseIn(event: MouseEvent) {
  //   this.mouseIn = true;
  // }

  // onMouseOut(event: MouseEvent) {
  //   this.mouseIn = false;
  // }

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

  //
  // EVENTS
  //

  $onDestroy() {
    $GF.destroy();
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
    this.uid = $GF.genUid()
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
        `flowcharting-message-${this.uid}`
      );
    }
  }

  clearMessage() {
    if (this.container && this.message) {
      this.container.style.display = 'none';
      this.message.innerHTML = '';
    }
    $GF.clearUniqTimeOut(`flowcharting-message-${this.uid}`);
  }
}
