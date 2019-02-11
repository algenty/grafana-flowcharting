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
      content : '<mxGraphModel dx="2066" dy="1171" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">\n'+
      '  <root>\n'+
      '    <mxCell id="0"/>\n'+
      '    <mxCell id="1" parent="0"/>\n'+
      '    <mxCell id="5" style="rounded=0;html=1;entryX=0.5;entryY=0;jettySize=auto;orthogonalLoop=1;edgeStyle=orthogonalEdgeStyle;curved=1;" edge="1" parent="1" source="2" target="3">\n'+
      '      <mxGeometry relative="1" as="geometry"/>\n'+
      '    </mxCell>\n'+
      '    <mxCell id="6" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=0;html=1;jettySize=auto;orthogonalLoop=1;" edge="1" parent="1" source="2" target="4">\n'+
      '      <mxGeometry relative="1" as="geometry"/>\n'+
      '    </mxCell>\n'+
      '    <object label="Hello" composite="Hello" id="2">\n'+
      '      <mxCell style="rounded=1;whiteSpace=wrap;html=1;gradientColor=#ffffff;fillColor=#00FF00;" parent="1" vertex="1">\n'+
      '        <mxGeometry x="340" y="180" width="120" height="60" as="geometry"/>\n'+
      '      </mxCell>\n'+
      '    </object>\n'+
      '    <object label="mxGraph" composite="World" id="3">\n'+
      '      <mxCell style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;gradientColor=#ffffff;fillColor=#E580FF;" parent="1" vertex="1">\n'+
      '        <mxGeometry x="274" y="320" width="80" height="80" as="geometry"/>\n'+
      '      </mxCell>\n'+
      '    </object>\n'+
      '    <mxCell id="4" value="Grafana" style="shape=mxgraph.flowchart.display;whiteSpace=wrap;html=1;fillColor=#FF7654;strokeColor=#000000;strokeWidth=2;gradientColor=#ffffff;" vertex="1" parent="1">\n'+
      '      <mxGeometry x="440" y="330" width="98" height="60" as="geometry"/>\n'+
      '    </mxCell>\n'+
      '    <mxCell id="7" value="Author : Arnaud GENTY&lt;br&gt;&lt;div style=&quot;text-align: left&quot;&gt;Manthor :&amp;nbsp;&lt;span&gt;Jeremy&amp;nbsp;&lt;/span&gt;&lt;span&gt;jdbranham&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">\n'+
      '      <mxGeometry x="260" y="407" width="280" height="40" as="geometry"/>\n'+
      '    </mxCell>\n'+
      '  </root>\n'+
      '</mxGraphModel>\n',
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
    this.addEditorTab('Options', 'public/plugins/' + plugin.id + '/partials/displayEditor.html', 3);
    this.addEditorTab('Shapes', 'public/plugins/' + plugin.id + '/partials/shapeEditor.html', 4);
    this.addEditorTab('Values', 'public/plugins/' + plugin.id + '/partials/valueEditor.html', 5);
    this.unitFormats = kbn.getUnitFormats();
  }

  onRender() {
    // TODO:
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
