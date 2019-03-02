import {
  MetricsPanelCtrl
} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import kbn from 'app/core/utils/kbn';
import { mappingOptionsTab } from './mapping_options';
import { flowchartOptionsTab } from './flowchart_options';
import { inspectOptionsTab } from './inspect_options';
import _ from 'lodash';
import {
  plugin
} from './plugin';
// import mxgraph from './mxgraph';
import mxHandler from './mxHandler'

class FlowchartCtrl extends MetricsPanelCtrl {

  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.hiddenSeries = {};
    this.unitFormats = kbn.getUnitFormats();
    this.cells = [];
    this.graph;
    this.mx;

    // OLD OPTIONS
    this.options = {
      flowchart: {
        source: {
          types: ['Url', 'XML Content', 'JSON ', 'Editor', 'Javascript'],
          default: 'XML Content',
        }
      },
      metrics: {
        colorsMode: {
          types: ['Fill', 'Stroke', 'Text'],
          default: 'Fill',
        },
        aggregation: {
          types: ['Last', 'First', 'Max', 'Min', 'Sum', 'Avg', 'Delta'],
          default: 'Last',
        },
        handler: {
          types: ['Number Threshold', 'String Threshold', 'Date Threshold', 'Disable Criteria', 'Text Only'],
          default: 'Number Threshold',

        },
        shape: {
          types: ['Warning / Critical', 'Always'],
          default: 'Warning / Critical',
        },
        value: {
          types: ['Never', 'When Metric Displayed', 'Warning / Critical', 'Critical Only'],
          default: 'When Alias Displayed'
        },
        format: {
          types: kbn.getUnitFormats(),
        }
      },
    }

    var panelDefaults = {
      init: {
        logLevel: 3, //1:debug, 2:info, 3:warn, 4:error, 5:fatal
      },
      datasource: null,
      interval: null,
      targets: [{}],
      aliasColors: {},
      format: 'short',
      valueName: 'current',
      strokeWidth: 1,
      // NEW PANEL
      styleSeq : 1,
      metrics: [],
      styles: [
        {
          id : 1,
          unit: 'short',
          type: 'number',
          alias: '',
          decimals: 2,
          colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
          colorMode: null,
          pattern: '/.*/',
          thresholds: [],
          shapeSeq: 1,
          textSeq: 1,
        },
      ],
      // OLD PANEL
      flowchart: {
        source: {
          type: 'xml',
          xml: {
            //value: '<mxGraphModel  grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1"  math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="hPZ40pGzY2HQIh7cGHQj-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;gradientColor=#ffffff;fillColor=#FF8000;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="120" height="60" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-2" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-1" target="hPZ40pGzY2HQIh7cGHQj-3"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="150" as="sourcePoint"/><mxPoint x="80" y="150" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-3" value="Loves" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1"><mxGeometry x="20" y="134" width="120" height="80" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-4" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-3" target="hPZ40pGzY2HQIh7cGHQj-5"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="281" as="sourcePoint"/><mxPoint x="160" y="261" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-5" value="MxGraph" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;gradientColor=#ffffff;" vertex="1" parent="1"><mxGeometry x="20" y="261" width="120" height="60" as="geometry"/></mxCell></root></mxGraphModel>',
            value: '<mxGraphModel dx="1426" dy="810" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="GLtmsq4S9DwVswmQGahX-3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="GLtmsq4S9DwVswmQGahX-1" target="GLtmsq4S9DwVswmQGahX-2" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="GLtmsq4S9DwVswmQGahX-2" target="GLtmsq4S9DwVswmQGahX-4" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-2" value="love" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-4" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell></root></mxGraphModel>'
          },
          url: {
            value: "http://<source>:<port>/<pathToXml>",
          },
          editor: {
            value: "Not yet",
          },
          json: {
            value: "Not yet",
          },
          javascript: {
            value: "Not yet",
          }
        },
        options: {
          zoom: '100%',
          center: true,
          scale: true,
          lock: true,
          grid: false,
          bgColor: undefined,
        },
      }
    };

    _.defaults(this.panel, panelDefaults);
    this.panel.graphId = 'flowchart_' + this.panel.id;
    this.containerDivId = 'container_' + this.panel.graphId;
    this.changedSource = true;

    // events
    this.events.on('render', this.onRender.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('init-panel-actions', this.onInitPanelActions.bind(this));

  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    console.debug("ctrl.onInitEditMode")
    // this.addEditorTab('Flowcharting', 'public/plugins/' + plugin.id + '/partials/flowchartEditor.html', 2);
    // this.addEditorTab('Mapping', 'public/plugins/' + plugin.id + '/partials/shapeEditor.html', 3);
        // this.addEditorTab('Inspect', 'public/plugins/' + plugin.id + '/partials/inspectFlowchart.html', 4)
    this.addEditorTab('Flowchart', flowchartOptionsTab, 2);
    this.addEditorTab('Mapping', mappingOptionsTab, 3);
    this.addEditorTab('Inspect', inspectOptionsTab, 4);
    this.addEditorTab('Debug', 'public/plugins/' + plugin.id + '/partials/debug.html', 5)
  }

  onRefresh() {
    console.debug("ctrl.onRefresh")
  }


  onRender() {
    console.debug("ctrl.onRender")
    this.data = this.parseSeries(this.series);
  }

  onDataReceived(dataList) {
    console.debug("ctrl.onDataReceived")
    console.debug('received data');
    console.debug(dataList);
    this.series = dataList.map(this.seriesHandler.bind(this));
    console.debug('mapped dataList to series');
    console.debug(this.series);
    this.render();

  }

  onDataError() {
    this.series = [];
    this.render();
  }

  onInitPanelActions(actions) {
    actions.push({
      text: 'Export SVG',
      click: 'ctrl.exportSVG()'
    });
  }

  //
  // FUNCTIONS 
  //
  link(scope, elem, attrs, ctrl) {
    console.debug("ctrl.link")
    this.mx = new mxHandler(scope, elem, attrs, ctrl);
  }

  exportSVG() {
    const scope = this.$scope.$new(true);
    scope.panel = 'table';
    this.publishAppEvent('show-modal', {
      templateHtml: '<export-data-modal panel="panel" data="tableData"></export-data-modal>',
      scope,
      modalClass: 'modal--narrow',
    });
  }

  openEditor() {
    console.debug("ctrl.openEditor")
  }

  setUnitFormat(subItem) {
    console.debug("ctrl.setUnitFormat")
    this.panel.format = subItem.value;
    this.refresh();
  }

  //
  // Series
  //
  seriesHandler(seriesData) {
    var series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target,
      unit: seriesData.unit
    });

    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    var datapoints = seriesData.datapoints || [];
    if (datapoints && datapoints.length > 0) {
      var last = datapoints[datapoints.length - 1][1];
      var from = this.range.from;
      if (last - from < -10000) {
        series.isOutsideRange = true;
      }
    }

    return series;
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

  //
  // Validate
  //
  validateRegex(textRegex) {
    if (textRegex == null || textRegex.length == 0) {
      return true
    }
    try {
      let regex = new RegExp(textRegex);
      return true
    } catch (e) {
      return false
    }
  }


}

export {
  FlowchartCtrl,
  FlowchartCtrl as MetricsPanelCtrl
}

FlowchartCtrl.templateUrl = 'module.html';