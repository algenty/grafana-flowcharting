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
    this.$scope = $scope;
    this.hiddenSeries = {}; 
    this.sourceTypeOptions = [ 'Url', 'XML Content', 'Editor', 'Javascript' ];

    var panelDefaults = {
      legend: {
        show: true, // disable/enable legend
        values: true
      },
      init: {
        logLevel: 3, //1:debug, 2:info, 3:warn, 4:error, 5:fatal
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
      },
      sourceType: 'XML Content',
      url: "http://<source>:<port>/<pathToXml>",
      javascript: "Not yet",
      editorContent : "",
      content : '<mxGraphModel  grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1"  math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="hPZ40pGzY2HQIh7cGHQj-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;gradientColor=#ffffff;fillColor=#FF8000;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="120" height="60" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-2" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-1" target="hPZ40pGzY2HQIh7cGHQj-3"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="150" as="sourcePoint"/><mxPoint x="80" y="150" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-3" value="Loves" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1"><mxGeometry x="20" y="134" width="120" height="80" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-4" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-3" target="hPZ40pGzY2HQIh7cGHQj-5"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="281" as="sourcePoint"/><mxPoint x="160" y="261" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-5" value="MxGraph" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;gradientColor=#ffffff;" vertex="1" parent="1"><mxGeometry x="20" y="261" width="120" height="60" as="geometry"/></mxCell></root></mxGraphModel>',
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
    //this.addEditorTab('Options', 'public/plugins/' + plugin.id + '/partials/displayEditor.html', 3);
    //this.addEditorTab('Shapes', 'public/plugins/' + plugin.id + '/partials/shapeEditor.html', 4);
    //this.addEditorTab('Values', 'public/plugins/' + plugin.id + '/partials/valueEditor.html', 5);
    this.unitFormats = kbn.getUnitFormats();
  }

  onRender() {
    // TODO:
    console.log("onRender")
    this.data = this.parseSeries(this.series);
  }

  onDataReceived(dataList) {
    this.series = dataList.map(this.seriesHandler.bind(this));
    this.data = this.parseSeries(this.series);
    this.render(this.data);
  }

  onDataError() {
    this.series = [];
    this.render();
  }

  // 
  // EVENTS OF EDITORS
  //
  onSourceTypeChanged() {
    console.log(this.$scope)
    this.render();
  }

  //
  // FUNCTIONS 
  //
  link(scope, elem, attrs, ctrl) {
    mxgraph(scope, elem, attrs, ctrl);
  }

  openEditor() {
    console.log("openEditor")
  }

  setUnitFormat(subItem) {
    this.panel.format = subItem.value;
    this.render();
  }

  seriesHandler(seriesData) {
    var series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target
    });

    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }

  getDecimalsForValue(value) {
    if (_.isNumber(this.panel.decimals)) {
      return { decimals: this.panel.decimals, scaledDecimals: null };
    }

    var delta = value / 2;
    var dec = -Math.floor(Math.log(delta) / Math.LN10);

    var magn = Math.pow(10, -dec);
    var norm = delta / magn; // norm is between 1.0 and 10.0
    var size;

    if (norm < 1.5) {
      size = 1;
    } else if (norm < 3) {
      size = 2;
      // special case for 2.5, requires an extra decimal
      if (norm > 2.25) {
        size = 2.5;
        ++dec;
      }
    } else if (norm < 7.5) {
      size = 5;
    } else {
      size = 10;
    }

    size *= magn;

    // reduce starting decimals if not needed
    if (Math.floor(value) === value) { dec = 0; }

    var result = {};
    result.decimals = Math.max(0, dec);
    result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;

    return result;
  }

  toggleSeries(serie) {
    if (this.hiddenSeries[serie.label]) {
      delete this.hiddenSeries[serie.label];
    } else {
      this.hiddenSeries[serie.label] = true;
    }
    this.render();
  }

  parseSeries(series) {
    return _.map(this.series, (serie, i) => {
      return {
        label: serie.alias,
        data: serie.stats[this.panel.valueName],
        color: this.panel.aliasColors[serie.alias] || this.$rootScope.colors[i],
        legendData: serie.stats[this.panel.valueName],
      };
    });
  }

  setLegendWidthForLegacyBrowser() {
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIE11 && this.panel.legendType === 'Right side' && !this.panel.legend.sideWidth) {
      this.panel.legend.sideWidth = 150;
    }
  }
}

export {
  FlowchartCtrl,
  FlowchartCtrl as MetricsPanelCtrl
}

FlowchartCtrl.templateUrl = 'module.html';
