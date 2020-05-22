import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import appEvents from 'grafana/app/core/app_events';
import { mappingOptionsTab } from 'mapping_options';
import { flowchartOptionsTab } from 'flowchart_options';
import { inspectOptionsTab } from 'inspect_options';
import { RulesHandler } from 'rulesHandler';
import { FlowchartHandler } from 'flowchartHandler';
import { MetricHandler } from 'metricHandler';
import { PanelEvents } from '@grafana/data';
import { $GF } from 'globals_class';
import _ from 'lodash';

class FlowchartCtrl extends MetricsPanelCtrl {
  $rootScope: any;
  version: any;
  changedSource: boolean;
  changedData: boolean;
  changedOptions: boolean;
  rulesHandler: RulesHandler | undefined;
  flowchartHandler: FlowchartHandler | undefined;
  metricHandler: MetricHandler | undefined;
  GHTimeout = 0;
  GHPlanified = false;
  GHApplied = false;
  GHTimeStamp = 0;
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
    this.events.on(PanelEvents.render, this.onRender.bind(this));
    this.events.on(PanelEvents.refresh, this.onRefresh.bind(this));
    this.events.on(PanelEvents.dataReceived, this.onDataReceived.bind(this));
    this.events.on(PanelEvents.dataError, this.onDataError.bind(this));
    this.events.on(PanelEvents.dataSnapshotLoad, this.onDataReceived.bind(this));
    this.events.on(PanelEvents.editModeInitialized, this.onInitEditMode.bind(this));
    // this.events.on('init-panel-actions', this.onInitPanelActions.bind(this));
    this.events.on('template-variable-value-updated', this.onVarChanged.bind(this));
    appEvents.on('graph-hover', this.onGraphHover.bind(this), this.$scope);
    appEvents.on('graph-hover-clear', this.clearCrosshair.bind(this), this.$scope);
    this.dashboard.events.on('template-variable-value-updated', this.onVarChanged.bind(this), $scope);
    if ($scope.$root.onAppEvent) {
      $scope.$root.onAppEvent('template-variable-value-updated', this.onVarChanged.bind(this), $scope);
      // $scope.$root.onAppEvent('graph-hover', this.onVarChanged.bind(this), $scope);
    }
  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    this.addEditorTab('Flowchart', flowchartOptionsTab, 2);
    this.addEditorTab('Mapping', mappingOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
  }

  onGraphHover(event: any) {
    // console.log('onGraphHover')
    if (!this.dashboard.sharedTooltipModeEnabled()) {
      return;
    }

    if (this.flowchartHandler !== undefined) {
      this.flowchartHandler.graphHoverChanged();
      this.waitForGraphOver(event.pos.x);
    }
  }

  clearCrosshair(event: any) {
    // console.log('graph-hover-clear');
    if (this.flowchartHandler !== undefined && (this.GHApplied || this.GHPlanified)) {
      this.unplanifyGraphOver();
      this.flowchartHandler.graphHoverChanged();
      this.render();
    }
  }

  waitForGraphOver(timestamp: number) {
    if (this.GHPlanified) {
      this.unplanifyGraphOver();
    }
    if (!this.GHPlanified) {
      this.planifyGraphOver(timestamp);
    }
  }

  unplanifyGraphOver() {
    // console.log('unplanifyGraphOver');
    if (this.GHTimeout !== 0) {
      window.clearInterval(this.GHTimeout);
    }
    this.GHPlanified = false;
    this.GHTimeout = 0;
    $GF.unsetGraphHover();
  }

  planifyGraphOver(timestamp: number) {
    // console.log('planifyGraphOver');
    this.GHPlanified = true;
    $GF.setGraphHover(timestamp);
    this.GHTimeStamp = timestamp;
    const self = this;
    this.GHTimeout = window.setTimeout(() => {
      // console.log('Render Graph-over');
      $GF.setGraphHover(timestamp);
      self.render();
      $GF.unsetGraphHover();
      self.GHPlanified = false;
      self.GHTimeStamp = 0;
      self.GHTimeout = 0;
      self.GHApplied = true;
    },
      $GF.CONSTANTS.CONF_GRAPHHOVER_DELAY
    );
  }


  onRefresh() {
    this.onRender();
  }

  onVarChanged() {
    if (this.flowchartHandler !== undefined) {
      this.flowchartHandler.sourceChanged();
      this.flowchartHandler.render();
    }
  }

  onRender() {}

  onDataReceived(dataList) {
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
      this.flowchartHandler.addFlowchart('Main');
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
