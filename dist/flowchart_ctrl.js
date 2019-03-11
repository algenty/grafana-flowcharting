"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsPanelCtrl = exports.FlowchartCtrl = void 0;

var _sdk = require("app/plugins/sdk");

var _time_series = _interopRequireDefault(require("app/core/time_series2"));

var _kbn = _interopRequireDefault(require("app/core/utils/kbn"));

var _mapping_options = require("./mapping_options");

var _flowchart_options = require("./flowchart_options");

var _inspect_options = require("./inspect_options");

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

var _plugin = require("./plugin");

var _mxHandler = _interopRequireDefault(require("./mxHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var FlowchartCtrl =
/*#__PURE__*/
function (_MetricsPanelCtrl) {
  _inherits(FlowchartCtrl, _MetricsPanelCtrl);

  function FlowchartCtrl($scope, $injector, $rootScope) {
    var _this;

    _classCallCheck(this, FlowchartCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlowchartCtrl).call(this, $scope, $injector));
    _this.$rootScope = $rootScope;
    _this.$scope = $scope;
    _this.hiddenSeries = {};
    _this.unitFormats = _kbn.default.getUnitFormats();
    _this.changedSource;
    _this.shapeStates = [];
    _this.textStates = [];
    _this.graph;
    _this.mx;
    _this.changedSource = true;
    _this.changedData = true;
    _this.changedOptions = true; // OLD OPTIONS

    _this.options = {
      metrics: {
        handler: {
          types: ["Number Threshold", "String Threshold", "Date Threshold", "Disable Criteria", "Text Only"],
          default: "Number Threshold"
        },
        format: {
          types: _kbn.default.getUnitFormats()
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
      styles: [{
        id: 1,
        unit: "short",
        type: "number",
        alias: "",
        aggregation: "current",
        decimals: 2,
        colors: ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"],
        colorMode: "fillColor",
        colorOn: "a",
        textOn: "wmd",
        textReplace: "content",
        textPattern: "/.*/",
        pattern: "/.*/",
        dateFormat: "YYYY-MM-DD HH:mm:ss",
        thresholds: [],
        invert: false,
        shapeSeq: 1,
        shapeProp: 'id',
        shapeMaps: [],
        textSeq: 1,
        textProp: 'id',
        textMaps: [],
        mappingType: 1
      }],
      // OLD PANEL
      flowchart: {
        source: {
          type: "xml",
          xml: {
            //value: '<mxGraphModel  grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1"  math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="hPZ40pGzY2HQIh7cGHQj-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;gradientColor=#ffffff;fillColor=#FF8000;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="120" height="60" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-2" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-1" target="hPZ40pGzY2HQIh7cGHQj-3"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="150" as="sourcePoint"/><mxPoint x="80" y="150" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-3" value="Loves" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1"><mxGeometry x="20" y="134" width="120" height="80" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-4" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-3" target="hPZ40pGzY2HQIh7cGHQj-5"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="281" as="sourcePoint"/><mxPoint x="160" y="261" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-5" value="MxGraph" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;gradientColor=#ffffff;" vertex="1" parent="1"><mxGeometry x="20" y="261" width="120" height="60" as="geometry"/></mxCell></root></mxGraphModel>',
            value: '<mxGraphModel dx="1394" dy="796" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="arrow-1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-grafana" target="shape-love" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-grafana" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell><mxCell id="arrow-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-love" target="shape-mxgraph" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-love" value="love" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="shape-mxgraph" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell><mxCell id="text-grafana" value="Le text : TextVal" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="9" y="50" width="120" height="20" as="geometry"/></mxCell><mxCell id="text-arrow1" value="Text 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="150" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow2" value="Text 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="280" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-mxgraph" value="Text 4" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="380" y="50" width="40" height="20" as="geometry"/></mxCell></root></mxGraphModel>'
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
          },
          csv: {
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

    _lodash.default.defaults(_this.panel, panelDefaults);

    _this.panel.graphId = "flowchart_" + _this.panel.id;
    _this.containerDivId = "container_" + _this.panel.graphId; // events

    _this.events.on("render", _this.onRender.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on("refresh", _this.onRefresh.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on("data-received", _this.onDataReceived.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on("data-error", _this.onDataError.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on("data-snapshot-load", _this.onDataReceived.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on("init-panel-actions", _this.onInitPanelActions.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    return _this;
  } //
  // EVENTS FCT
  //


  _createClass(FlowchartCtrl, [{
    key: "onInitEditMode",
    value: function onInitEditMode() {
      this.addEditorTab("Flowchart", _flowchart_options.flowchartOptionsTab, 2);
      this.addEditorTab("Mapping", _mapping_options.mappingOptionsTab, 3);
      this.addEditorTab("Inspect", _inspect_options.inspectOptionsTab, 4);
    }
  }, {
    key: "onRefresh",
    value: function onRefresh() {
      this.onRender();
    }
  }, {
    key: "onRender",
    value: function onRender() {
      console.debug("ctrl.onRender");

      if (this.changedData == true || this.changedOptions == true) {
        this.analyzeData();
      }
    }
  }, {
    key: "onDataReceived",
    value: function onDataReceived(dataList) {
      this.changedData = true; // console.debug("received data");
      // console.debug(dataList);

      this.series = dataList.map(this.seriesHandler.bind(this)); // console.debug("mapped dataList to series");
      // console.debug(this.series);

      this.render();
    }
  }, {
    key: "onDataError",
    value: function onDataError() {
      this.series = [];
      this.render();
    }
  }, {
    key: "onInitPanelActions",
    value: function onInitPanelActions(actions) {
      actions.push({
        text: "Export SVG",
        click: "ctrl.exportSVG()"
      });
    } //
    // FUNCTIONS
    //

  }, {
    key: "link",
    value: function link(scope, elem, attrs, ctrl) {
      console.debug("ctrl.link");
      this.mx = new _mxHandler.default(scope, elem, attrs, ctrl);
    }
  }, {
    key: "exportSVG",
    value: function exportSVG() {
      var scope = this.$scope.$new(true);
      scope.panel = "table";
      this.publishAppEvent("show-modal", {
        templateHtml: '<export-data-modal panel="panel" data="tableData"></export-data-modal>',
        scope: scope,
        modalClass: "modal--narrow"
      });
    }
  }, {
    key: "openEditor",
    value: function openEditor() {}
  }, {
    key: "setUnitFormat",
    value: function setUnitFormat(subItem) {
      this.panel.format = subItem.value;
      this.refresh();
    } //
    // Series
    //

  }, {
    key: "seriesHandler",
    value: function seriesHandler(seriesData) {
      var series = new _time_series.default({
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
    } //
    // Data
    //

  }, {
    key: "analyzeData",
    value: function analyzeData() {
      this.analyzeDataForShape();
      this.analyzeDataForText();
    }
  }, {
    key: "analyzeDataForShape",
    value: function analyzeDataForShape() {
      var _this2 = this;

      this.shapeStates = []; // Begin For Each style

      _lodash.default.each(this.panel.styles, function (_style) {
        // Begin For Each Series
        _lodash.default.each(_this2.series, function (_serie) {
          if (_serie.datapoints.length === 0) {
            return;
          }

          var regex = _kbn.default.stringToJsRegex(_style.pattern);

          var matching = _serie.alias.toString().match(regex); // if pattern of style = serie.alias


          if (_style.pattern == _serie.alias || matching) {
            var value = _lodash.default.get(_serie.stats, _style.aggregation);

            var level = _this2.getThresholdLevel(value, _style);

            var color = _this2.getColorForValue(value, _style);

            if (value === undefined || value === null) {
              value = _serie.datapoints[_serie.datapoints.length - 1][0];
            } // Begin For Each Shape


            _lodash.default.each(_style.shapeMaps, function (_shape) {
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
                var _state = _lodash.default.find(_this2.shapeStates, function (_state) {
                  return _state.pattern == _shape.pattern;
                });

                var new_state = {
                  pattern: _shape.pattern,
                  level: level,
                  colorMode: _style.colorMode,
                  color: color,
                  value: value,
                  aggregation: _style.aggregation,
                  serie: _serie.alias
                };

                if (_state != null && _state != undefined) {
                  // if level is upper of older level : change state
                  if (level > _state.level) {
                    // if always or display when warn/err
                    if (_style.colorOn == "a" || _style.colorOn == "wc" && level > 0) {
                      _lodash.default.pull(_this2.shapeStates, _state);

                      _this2.shapeStates.push(new_state);
                    }
                  } // else nothing todo, keep old

                } else {
                  // if always or display when warn/err
                  if (_style.colorOn == "a" || _style.colorOn == "wc" && level > 0) {
                    _this2.shapeStates.push(new_state);
                  }
                }
              }
            }); // End For Each Shape
            //   console.debug(
            //     "analyzeDataForShape|" +
            //       _style.aggregation +
            //       " = " +
            //       value +
            //       " for " +
            //       _serie.alias +
            //       "Level = " +
            //       level
            //   );

          }
        }); // End For Each Styles

      }); // End For Each Series
      // console.debug(
      //   "analyzeDataForShape| result of shape mapping : ",
      //   this.shapeStates
      // );

    }
  }, {
    key: "analyzeDataForText",
    value: function analyzeDataForText() {
      var _this3 = this;

      this.textStates = []; // Begin For Each Series

      _lodash.default.each(this.series, function (_serie) {
        if (_serie.datapoints.length === 0) {
          return;
        } // Begin For Each Styles


        _lodash.default.each(_this3.panel.styles, function (_style) {
          var regex = _kbn.default.stringToJsRegex(_style.pattern);

          var matching = _serie.alias.toString().match(regex);

          if (_style.pattern == _serie.alias || matching) {
            var value = _lodash.default.get(_serie.stats, _style.aggregation);

            var level = _this3.getThresholdLevel(value, _style);

            if (value === undefined || value === null) {
              value = _serie.datapoints[_serie.datapoints.length - 1][0];
            } // Begin For Each Text


            _lodash.default.each(_style.textMaps, function (_text) {
              // not hidden or not never
              if (_text === undefined || _text === null || _text.pattern.length == 0 || _text.hidden != true) {
                // Structure textMaps
                // text :
                // {
                //   pattern : text, /.*/
                //   level : number, 0,1 or 2
                //   hidden : true|false,
                //   color : text,  (#color)
                //   value : number (value of aggregation)
                //   aggregation : text (min, max ...)
                // }
                var _state = _lodash.default.find(_this3.textStates, function (_state) {
                  return _state.pattern == _text.pattern;
                }); // Adapte value


                var textValue = _this3.getFormattedValue(value, _style);

                if (_style.textOn == "n") textValue = "";
                if (_style.textOn == "wc" && level < 1) textValue = "";
                if (_style.textOn == "co" && level != 3) textValue = ""; //TODO : "When Metric Displayed"

                var isPattern = true;
                var textPattern = "";

                if (_style.textReplace == "content") {
                  isPattern = false;
                } else {
                  textPattern = _style.textPattern;
                }

                var new_state = {
                  pattern: _text.pattern,
                  level: level,
                  value: value,
                  textValue: textValue,
                  isPattern: isPattern,
                  textPattern: textPattern,
                  aggregation: _style.aggregation,
                  serie: _serie.alias,
                  alias: _style.alias
                };

                if (_state != null && _state != undefined) {
                  if (level > _state.level) {
                    _lodash.default.pull(_this3.textStates, _state);

                    _this3.textStates.push(new_state);
                  } // else nothing todo, keep old

                } else {
                  _this3.textStates.push(new_state);
                }
              }
            }); // End For Each text
            // console.debug(
            //   "analyzeDataForText|" +
            //     _style.aggregation +
            //     " = " +
            //     value +
            //     " for " +
            //     _serie.alias +
            //     " Level = " +
            //     level
            // );

          }
        }); // End For Each Styles

      }); // End For Each Series
      // console.debug(
      //   "analyzeDataForText| result of Text mapping : ",
      //   this.textStates
      // );

    }
  }, {
    key: "getColorForValue",
    value: function getColorForValue(value, style) {
      if (!style.thresholds || style.thresholds.length == 0) {
        return null;
      }

      for (var i = style.thresholds.length; i > 0; i--) {
        if (value >= style.thresholds[i - 1]) {
          return style.colors[i];
        }
      }

      return _lodash.default.first(style.colors);
    }
  }, {
    key: "getFormattedValue",
    value: function getFormattedValue(value, style) {
      // console.log("getFormattedValue style", style)
      if (style.type === 'number') {
        if (!_lodash.default.isFinite(value)) return "Invalid Number";

        if (value === null || value === void 0) {
          return '-';
        }

        var decimals = this.decimalPlaces(value);
        decimals = typeof style.decimals === "number" ? Math.min(style.decimals, decimals) : decimals;
        return _kbn.default.valueFormats[style.unit](value, decimals, null).toString();
      }

      if (style.type === 'string') {
        if (_lodash.default.isArray(value)) {
          value = value.join(', ');
        }

        var mappingType = style.mappingType || 0;

        if (mappingType === 1 && style.valueMaps) {
          for (var i = 0; i < style.valueMaps.length; i++) {
            var map = style.valueMaps[i];

            if (value === null) {
              if (map.value === 'null') {
                return map.text;
              }

              continue;
            } // Allow both numeric and string values to be mapped


            if (!_lodash.default.isString(value) && Number(map.value) === Number(value) || map.value === value) {
              return this.defaultValueFormatter(map.text, style);
            }
          }
        }

        if (mappingType === 2 && style.rangeMaps) {
          for (var _i = 0; _i < style.rangeMaps.length; _i++) {
            var _map = style.rangeMaps[_i];

            if (value === null) {
              if (_map.from === 'null' && _map.to === 'null') {
                return _map.text;
              }

              continue;
            }

            if (Number(_map.from) <= Number(value) && Number(_map.to) >= Number(value)) {
              return this.defaultValueFormatter(_map.text, style);
            }
          }
        }

        if (value === null || value === void 0) {
          return '-';
        }

        return this.defaultValueFormatter(value, style);
      }

      if (style.type === 'date') {
        if (value === undefined || value === null) {
          return '-';
        }

        if (_lodash.default.isArray(value)) {
          value = value[0];
        }

        var date = (0, _moment.default)(value);

        if (this.dashboard.isTimezoneUtc()) {
          date = date.utc();
        }

        return date.format(style.dateFormat);
      }
    }
  }, {
    key: "decimalPlaces",
    value: function decimalPlaces(num) {
      var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

      if (!match) {
        return 0;
      }

      return Math.max(0, // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0) - ( // Adjust for scientific notation.
      match[2] ? +match[2] : 0));
    }
  }, {
    key: "defaultValueFormatter",
    value: function defaultValueFormatter(value, style) {
      if (value === null || value === void 0 || value === undefined) {
        return '';
      }

      if (_lodash.default.isArray(value)) {
        value = value.join(', ');
      }

      if (style && style.sanitize) {
        return this.$sanitize(value);
      } else {
        return _lodash.default.escape(value);
      }
    } // returns level of threshold, -1 = disable, 0 = ok, 1 = warnimg, 2 = critical

  }, {
    key: "getThresholdLevel",
    value: function getThresholdLevel(value, style) {
      var thresholdLevel = 0;
      var thresholds = style.thresholds; // if no thresholds are defined, return 0

      if (thresholds === undefined || thresholds.length == 0) {
        return -1;
      } // make sure thresholds is an array of size 2


      if (thresholds.length !== 2) {
        return -1;
      } // non invert


      if (!style.invert) {
        thresholdLevel = 3;

        if (value >= thresholds[0]) {
          // value is equal or greater than first threshold
          thresholdLevel = 1;
        }

        if (value >= thresholds[1]) {
          // value is equal or greater than second threshold
          thresholdLevel = 0;
        }
      } // invert mode
      else {
          thresholdLevel = 0;

          if (value >= thresholds[0]) {
            // value is equal or greater than first threshold
            thresholdLevel = 1;
          }

          if (value >= thresholds[1]) {
            // value is equal or greater than second threshold
            thresholdLevel = 2;
          }
        }

      return thresholdLevel;
    } //
    // Validate
    //

  }, {
    key: "validateRegex",
    value: function validateRegex(textRegex) {
      return _lodash.default.isRegExp(textRegex);
    }
  }]);

  return FlowchartCtrl;
}(_sdk.MetricsPanelCtrl);

exports.MetricsPanelCtrl = exports.FlowchartCtrl = FlowchartCtrl;
FlowchartCtrl.templateUrl = "module.html";
