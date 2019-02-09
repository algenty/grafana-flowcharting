import { MetricsPanelCtrl } from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import kbn from 'app/core/utils/kbn';
import _ from 'lodash';
import { plugin } from './plugin';
import mxgraph from './mxgraph';


class FlowchartCtrl extends MetricsPanelCtrl {

  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);
    this.$rootScope = $rootScope;
    this.hiddenSeries = {};

    var panelDefaults = {
      pieType: 'pie',
      legend: {
        show: true, // disable/enable legend
        values: true
      },
      links: [],
      datasource: null,
      maxDataPoints: 3,
      interval: null,
      targets: [{}],
      cacheTimeout: null,
      nullPointMode: 'connected',
      legendType: 'Under graph',
      breakPoint: '50%',
      aliasColors: {},
      format: 'short',
      valueName: 'current',
      strokeWidth: 1,
      fontSize: '80%',
      combine: {
        threshold: 0.0,
        label: 'Others'
      }
    };

    _.defaults(this.panel, panelDefaults);

    // events
    this.events.on('render', this.onRender.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    this.addEditorTab('Flowcharting', 'public/plugins/' + plugin.id + '/partials/flowchartEditor.html', 2);
    this.addEditorTab('Display', 'public/plugins/' + plugin.id + '/partials/displayEditor.html', 3);
    this.addEditorTab('Shapes', 'public/plugins/' + plugin.id + '/partials/shapeEditor.html', 4);
    this.addEditorTab('Values', 'public/plugins/' + plugin.id + '/partials/valueEditor.html', 5);
    this.unitFormats = kbn.getUnitFormats();
  }

  onRender() {
    // TODO:
  }

  onDataReceived() {
    // TODO:
  }

  onDataError() {
    // TODO:
  }

  //
  // FUNCTIONS
  //
  link(scope, elem, attrs, ctrl) {
    //mxgraph(scope, elem, attrs, ctrl);
  }
}

export {
  FlowchartCtrl,
  FlowchartCtrl as MetricsPanelCtrl
}

FlowchartCtrl.templateUrl = 'module.html';
