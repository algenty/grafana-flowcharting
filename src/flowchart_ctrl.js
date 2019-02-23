import { MetricsPanelCtrl } from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import kbn from 'app/core/utils/kbn';
import coreModule from "app/core/core_module";
import _ from 'lodash';
import { plugin } from './plugin';
import mxgraph from './mxgraph';


class FlowchartCtrl extends MetricsPanelCtrl {

  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.hiddenSeries = {};
    this.unitFormats = kbn.getUnitFormats();
    this.cells = [];
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
      sort: { col: 0, desc: true },
      legend: {
        show: false, // disable/enable legend
        values: false
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
      aliasColors: {},
      format: 'short',
      valueName: 'current',
      strokeWidth: 1,
      fontSize: '80%',
      combine: {
        threshold: 0.0,
        label: 'Others'
      },
      metrics: {
        threshold: {
          colors: {
            crit: 'rgba(245, 54, 54, 0.9)',
            warn: 'rgba(237, 129, 40, 0.9)',
            ok: 'rgba(50, 128, 45, 0.9)',
            disable: 'rgba(128, 128, 128, 0.9)',
          },
          colorsModes: {
            type: 'Fill',
          },
          checks: {
            isGrayOnNoData: false,
            isIgnoreOKColors: false
          },
          handler: {
            type: 'Number Threshold',
            decimals: 2,
            format: 'none',
            display: 'When Metric Displayed',
          }
        },
      },
      flowchart: {
        source: {
          type: 'XML Content',
          xml: {
            //value: '<mxGraphModel  grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1"  math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="hPZ40pGzY2HQIh7cGHQj-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;gradientColor=#ffffff;fillColor=#FF8000;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="120" height="60" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-2" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-1" target="hPZ40pGzY2HQIh7cGHQj-3"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="150" as="sourcePoint"/><mxPoint x="80" y="150" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-3" value="Loves" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1"><mxGeometry x="20" y="134" width="120" height="80" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-4" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-3" target="hPZ40pGzY2HQIh7cGHQj-5"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="281" as="sourcePoint"/><mxPoint x="160" y="261" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-5" value="MxGraph" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;gradientColor=#ffffff;" vertex="1" parent="1"><mxGeometry x="20" y="261" width="120" height="60" as="geometry"/></mxCell></root></mxGraphModel>',
            value : '<mxGraphModel dx="1426" dy="810" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="GLtmsq4S9DwVswmQGahX-3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="GLtmsq4S9DwVswmQGahX-1" target="GLtmsq4S9DwVswmQGahX-2" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="GLtmsq4S9DwVswmQGahX-2" target="GLtmsq4S9DwVswmQGahX-4" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-2" value="love" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-4" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell></root></mxGraphModel>'
          },
          url: {
            value: "http://<source>:<port>/<pathToXml>",
          },
          editor: {
            value: "Not yet",
          }
        },
        options: {
          zoom: '100%',
          center: true,
          scale: false,
          lock: false,
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


    this.addFilters()
  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    console.debug("ctrl.onInitEditMode")
    this.addEditorTab('Flowcharting', 'public/plugins/' + plugin.id + '/partials/flowchartEditor.html', 2);
    this.addEditorTab('Shapes Mapping', 'public/plugins/' + plugin.id + '/partials/shapeEditor.html', 3);
    this.addEditorTab('Inspect', 'public/plugins/' + plugin.id + '/partials/inspectFlowchart.html', 4)
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
    // console.debug('received data');
    // console.debug(dataList);
    this.series = dataList.map(this.seriesHandler.bind(this));
    // console.debug('mapped dataList to series');
    // console.debug(this.series);
    this.render();

  }

  onDataError() {
    this.series = [];
    this.render();
  }

  onInitPanelActions(actions) {
    actions.push({ text: 'Export SVG', click: 'ctrl.exportSVG()' });
  }

  // 
  // EVENTS OF EDITORS
  //
  onSourceChanged() {
    console.debug("ctrl.onSourceChanged")
    this.changedSource = true;
    this.render();
  }

  onColorChange(alarmLevel) {
    console.debug("ctrl.onColorChange")
  }

  onMouseOver(id) {
    console.debug("$scope.onMouseOver : " + id);
    mxgraph.selectCell(id);
  }

  onMouseLeave(id) {
    console.debug("$scope.onMouseLeave : " + id)
    mxgraph.unselectCell(id);
  }

  //
  // FUNCTIONS 
  //
  link(scope, elem, attrs, ctrl) {
    console.debug("ctrl.link")
    mxgraph(scope, elem, attrs, ctrl);
  }

  exportSVG() {
    const scope = this.$scope.$new(true);
    //scope.tableData = this.renderer.render_values();
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

  toggleColumnSort(col, colIndex) {
    // remove sort flag from current column
    if (this.cells.columns[this.panel.sort.col]) {
      this.cells.columns[this.panel.sort.col].sort = false;
    }

    if (this.cells.sort.col === colIndex) {
      if (this.cells.sort.desc) {
        this.cells.sort.desc = false;
      } else {
        this.cells.sort.col = null;
      }
    } else {
      this.cells.sort.col = colIndex;
      this.cells.sort.desc = true;
    }
  }

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

  validatePercent(percentText) {
    if (percentText == null || percentText.length == 0) {
      return true
    }
    let regexPattern = new RegExp(/^\d+(\.\d+)?%{0,1}/);
    let result = regexPattern.test(percentText);
    if (!result) {
      return false;
    }
    return true;
  }

  addFilters() {
    coreModule.filter('numberOrText', () => {
      let numberOrTextFilter = (input) => {
        if (angular.isNumber(input)) {
          return this.filter('number')(input);
        } else {
          return input;
        }
      };

      numberOrTextFilter.$stateful = true;
      return numberOrTextFilter;
    });

    coreModule.filter('numberOrTextWithRegex', () => {
      let numberOrTextFilter = (input, textRegex) => {
        if (angular.isNumber(input)) {
          return this.filter('number')(input);
        } else {
          if (textRegex == null || textRegex.length == 0) {
            return input;
          } else {
            let regex;

            try {
              regex = new RegExp(textRegex);
            } catch (e) {
              return input;
            }

            if (!input) {
              return input;
            }

            let matchResults = input.match(regex);
            if (matchResults == null) {
              return input;
            } else {
              return matchResults[0];
            }
          }
        }
      };

      numberOrTextFilter.$stateful = true;
      return numberOrTextFilter;
    });
  }
}

export {
  FlowchartCtrl,
  FlowchartCtrl as MetricsPanelCtrl
}

FlowchartCtrl.templateUrl = 'module.html';
