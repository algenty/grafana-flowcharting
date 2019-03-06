import { MetricsPanelCtrl } from "app/plugins/sdk";
import TimeSeries from "app/core/time_series2";
import kbn from "app/core/utils/kbn";
import { mappingOptionsTab } from "./mapping_options";
import { flowchartOptionsTab } from "./flowchart_options";
import { inspectOptionsTab } from "./inspect_options";
import _ from "lodash";
import { plugin } from "./plugin";
// import mxgraph from './mxgraph';
import mxHandler from "./mxHandler";

class FlowchartCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.hiddenSeries = {};
    this.unitFormats = kbn.getUnitFormats();
    this.changedSource;
    this.shapeStates = [];
    this.graph;
    this.mx;
    this.changedSource = true;
    this.changedData = true;
    this.changedOptions = true;

    // OLD OPTIONS
    this.options = {
      metrics: {
        handler: {
          types: [
            "Number Threshold",
            "String Threshold",
            "Date Threshold",
            "Disable Criteria",
            "Text Only"
          ],
          default: "Number Threshold"
        },
        format: {
          types: kbn.getUnitFormats()
        }
      }
    };

    var panelDefaults = {
      init: {
        logLevel: 3 //1:debug, 2:info, 3:warn, 4:error, 5:fatal
      },
      datasource: null,
      interval: null,
      targets: [{}],
      aliasColors: {},
      format: "short",
      valueName: "current",
      strokeWidth: 1,
      // NEW PANEL
      styleSeq: 1,
      metrics: [],
      styles: [
        {
          id: 1,
          unit: "short",
          type: "number",
          alias: "",
          aggregation: "current",
          decimals: 2,
          colors: [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
          ],
          colorMode: 'fillColor',
          colorOn: 'a',
          textOn: 'wmd',
          textReplace: 'content',
          textPattern: '/.*/',
          pattern: '/.*/',
          dateFormat: "YYYY-MM-DD HH:mm:ss",
          thresholds: [],
          invert: false,
          shapeSeq: 1,
          shapeMaps: [],
          textSeq: 1,
          textMaps: [],
          mappingType: 1
        }
      ],
      // OLD PANEL
      flowchart: {
        source: {
          type: "xml",
          xml: {
            //value: '<mxGraphModel  grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1"  math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="hPZ40pGzY2HQIh7cGHQj-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;gradientColor=#ffffff;fillColor=#FF8000;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="120" height="60" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-2" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-1" target="hPZ40pGzY2HQIh7cGHQj-3"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="150" as="sourcePoint"/><mxPoint x="80" y="150" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-3" value="Loves" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1"><mxGeometry x="20" y="134" width="120" height="80" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-4" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-3" target="hPZ40pGzY2HQIh7cGHQj-5"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="281" as="sourcePoint"/><mxPoint x="160" y="261" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-5" value="MxGraph" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;gradientColor=#ffffff;" vertex="1" parent="1"><mxGeometry x="20" y="261" width="120" height="60" as="geometry"/></mxCell></root></mxGraphModel>',
            value:
              '<mxGraphModel dx="840" dy="453" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="arrow-1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-grafana" target="shape-love" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-grafana" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell><mxCell id="arrow-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-love" target="shape-mxgraph" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-love" value="love" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="shape-mxgraph" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell><mxCell id="text-grafana" value="Text 1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="50" y="50" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow1" value="Text 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="150" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow2" value="Text 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="280" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-mxgraph" value="Text 4" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="380" y="50" width="40" height="20" as="geometry"/></mxCell></root></mxGraphModel>'
          },
          url: {
            value: "http://<source>:<port>/<pathToXml>"
          },
          editor: {
            value: "Not yet"
          },
          json: {
            value: "Not yet"
          },
          javascript: {
            value: "Not yet"
          }
        },
        options: {
          zoom: "100%",
          center: true,
          scale: true,
          lock: true,
          grid: false,
          bgColor: undefined
        }
      }
    };

    _.defaults(this.panel, panelDefaults);
    this.panel.graphId = "flowchart_" + this.panel.id;
    this.containerDivId = "container_" + this.panel.graphId;

    // events
    this.events.on("render", this.onRender.bind(this));
    this.events.on("refresh", this.onRefresh.bind(this));
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("data-error", this.onDataError.bind(this));
    this.events.on("data-snapshot-load", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    this.events.on("init-panel-actions", this.onInitPanelActions.bind(this));
  }

  //
  // EVENTS FCT
  //
  onInitEditMode() {
    this.addEditorTab("Flowchart", flowchartOptionsTab, 2);
    this.addEditorTab("Mapping", mappingOptionsTab, 3);
    this.addEditorTab("Inspect", inspectOptionsTab, 4);
  }

  onRefresh() {
    this.onRender();
  }

  onRender() {
    console.debug("ctrl.onRender");
    if (this.changedData == true || this.changedOptions == true) {
      this.analyzeData();
    }
  }

  onDataReceived(dataList) {
    this.changedData = true;
    console.debug("received data");
    console.debug(dataList);
    this.series = dataList.map(this.seriesHandler.bind(this));
    console.debug("mapped dataList to series");
    console.debug(this.series);
    this.render();
  }

  onDataError() {
    this.series = [];
    this.render();
  }

  onInitPanelActions(actions) {
    actions.push({
      text: "Export SVG",
      click: "ctrl.exportSVG()"
    });
  }

  //
  // FUNCTIONS
  //
  link(scope, elem, attrs, ctrl) {
    console.debug("ctrl.link");
    this.mx = new mxHandler(scope, elem, attrs, ctrl);
  }

  exportSVG() {
    const scope = this.$scope.$new(true);
    scope.panel = "table";
    this.publishAppEvent("show-modal", {
      templateHtml:
        '<export-data-modal panel="panel" data="tableData"></export-data-modal>',
      scope,
      modalClass: "modal--narrow"
    });
  }

  openEditor() {}

  setUnitFormat(subItem) {
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

  //
  // Data
  //
  analyzeData() {
    this.shapeStates = [];
    // Begin For Each Series
    _.each(this.series, _serie => {
      if (_serie.datapoints.length === 0) {
        return;
      }
      // Begin For Each Styles
      _.each(this.panel.styles, _style => {
        const regex = kbn.stringToJsRegex(_style.pattern);
        let matching = _serie.alias.toString().match(regex);
        if (_style.pattern == _serie.alias || matching) {
          let value = _.get(_serie.stats, _style.aggregation);
          if (value === undefined || value === null) {
            value = _serie.datapoints[_serie.datapoints.length - 1][0];
          }
          // Begin For Each Shape
          _.each(_style.shapeMaps, _shape => {
            // not hidden
            if (_shape.hidden != true) {
              // Structure shapeMaps
              // shape :
              // {
              //   pattern : text, /.*/
              //   level : number, 0,1 or 2
              //   hidden : true|false,
              //   colorMode : text, (fill, font or stoke)
              //   color : text,  (#color)
              //   value : number (value of aggregation)
              //   aggregation : text (min, max ...)
              // }
              let level = this.getThresholdLevel(value, _style);
              let color = this.getColorForValue(value, _style);
              let _state = _.find(this.shapeStates, _state => {
                return _state.pattern == _shape.pattern;
              });
              let new_state = {
                pattern: _shape.pattern,
                level: level,
                colorMode: _style.colorMode,
                color: color,
                value: value,
                aggregation: _style.aggregation,
                serie: _serie.alias
              };
              if (_state != null && _state != undefined) {
                if (level > _state.level) {
                  _.pull(this.shapeStates, _state);
                  this.shapeStates.push(new_state);
                }
                // else nothing todo, keep old
              } else {
                this.shapeStates.push(new_state);
              }
            }
          });
          // End For Each Shape
          console.debug(
            "analyzeData|" +
              _style.aggregation +
              " = " +
              value +
              " for " +
              _serie.alias
          );
        }
      });
      // End For Each Styles
    });
    // End For Each Series
    console.debug("analyzeData| result of shape mapping : ", this.shapeStates);
  }

  getColorForValue(value, style) {
    if (!style.thresholds || style.thresholds.length == 0) {
      return null;
    }

    for (let i = style.thresholds.length; i > 0; i--) {
      if (value >= style.thresholds[i - 1]) {
        return style.colors[i];
      }
    }
    return _.first(style.colors);
  }

  // returns level of threshold, -1 = disable, 0 = ok, 1 = warnimg, 2 = critical
  getThresholdLevel(value, style) {
    var thresholdLevel = 0;

    var thresholds = style.thresholds;
    // if no thresholds are defined, return 0
    if (thresholds === undefined || thresholds.length == 0) {
      return -1;
    }

    // make sure thresholds is an array of size 2
    if (thresholds.length !== 2) {
      return -1;
    }

    // non invert
    if (!style.invert) {
      if (value >= thresholds[0]) {
        // value is equal or greater than first threshold
        thresholdLevel = 1;
      }
      if (value >= thresholds[1]) {
        // value is equal or greater than second threshold
        thresholdLevel = 2;
      }
    }
    // invert mode
    else {
      var thresholdLevel = 2;
      if (value >= thresholds[0]) {
        // value is equal or greater than first threshold
        thresholdLevel = 1;
      }
      if (value >= thresholds[1]) {
        // value is equal or greater than second threshold
        thresholdLevel = 0;
      }
    }
    return thresholdLevel;
  }

  //
  // Validate
  //

  validateRegex(textRegex) {
    return _.isRegExp(textRegex);
  }
}

export { FlowchartCtrl, FlowchartCtrl as MetricsPanelCtrl };

FlowchartCtrl.templateUrl = "module.html";
