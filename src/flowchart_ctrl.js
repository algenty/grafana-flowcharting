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
            type : 'Number Threshold',
            decimals : 2,
            format : 'none',
            display : 'When Metric Displayed',
          }
        },
      },
      flowchart: {
        source: {
          type: 'XML Content',
          xml: {
            value: '<mxGraphModel  grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1"  math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="hPZ40pGzY2HQIh7cGHQj-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;gradientColor=#ffffff;fillColor=#FF8000;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="120" height="60" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-2" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-1" target="hPZ40pGzY2HQIh7cGHQj-3"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="150" as="sourcePoint"/><mxPoint x="80" y="150" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-3" value="Loves" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1"><mxGeometry x="20" y="134" width="120" height="80" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-4" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-3" target="hPZ40pGzY2HQIh7cGHQj-5"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="281" as="sourcePoint"/><mxPoint x="160" y="261" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-5" value="MxGraph" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;gradientColor=#ffffff;" vertex="1" parent="1"><mxGeometry x="20" y="261" width="120" height="60" as="geometry"/></mxCell></root></mxGraphModel>',
          },
          url: {
            value: "http://<source>:<port>/<pathToXml>",
          },
          editor: {
            value: "Not yet",
          }
        },
        checks: {
          center: false,
          scale: false,
          lock: true,
        },

      }
    };

    _.defaults(this.panel, panelDefaults);


    // Dates get stored as strings and will need to be converted back to a Date objects
    // _.each(this.panel.targets, (t) => {
    //   if (t.valueHandler === "Date Threshold") {
    //     if (typeof t.crit != "undefined") t.crit = new Date(t.crit);
    //     if (typeof t.warn != "undefined") t.warn = new Date(t.warn);
    //   }
    // });


    // events
    this.events.on('render', this.onRender.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

    this.addFilters()
  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    this.addEditorTab('Flowcharting', 'public/plugins/' + plugin.id + '/partials/flowchartEditor.html', 2);
    this.addEditorTab('Shapes Mapping', 'public/plugins/' + plugin.id + '/partials/shapeEditor.html', 3);
    //this.addEditorTab('Values', 'public/plugins/' + plugin.id + '/partials/valueEditor.html', 5);
  }

  onRefresh() {

    if (this.panel.fixedSpan) {
      this.panel.span = this.panel.fixedSpan;
    }

    // this.panel.measurements.measurement = this.panel.targets;


    this.panel.measurements = _.filter(this.panel.measurements, (measurement) => {
      return !measurement.hide;
    });

    _.each(this.panel.measurements, (m) => {
      let res = _.filter(this.panel.measurements, (measurement) => {
        return (m.alias == measurement.alias || (m.target == measurement.target && m.target)) && !m.hide;
      });

      if (res.length > 1) {
        this.duplicates = true;
      }
    });
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

  onColorChange(alarmLevel) {

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
    this.refresh();
  }


  seriesHandler(seriesData) {
    var series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target
    });

    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
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

  setLegendWidthForLegacyBrowser() {
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIE11 && this.panel.legendType === 'Right side' && !this.panel.legend.sideWidth) {
      this.panel.legend.sideWidth = 150;
    }
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
