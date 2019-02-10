"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsPanelCtrl = exports.FlowchartCtrl = void 0;

var _sdk = require("app/plugins/sdk");

var _time_series = _interopRequireDefault(require("app/core/time_series2"));

var _kbn = _interopRequireDefault(require("app/core/utils/kbn"));

var _lodash = _interopRequireDefault(require("lodash"));

var _plugin = require("./plugin");

var _mxgraph = _interopRequireDefault(require("./mxgraph"));

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
    _this.hiddenSeries = {};
    console.log(_this.data);
    var panelDefaults = {
      legend: {
        show: true,
        // disable/enable legend
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

    _lodash.default.defaults(_this.panel, panelDefaults); // events


    _this.events.on('render', _this.onRender.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('data-received', _this.onDataReceived.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('data-error', _this.onDataError.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    return _this;
  } //
  // EVENTS FCT
  //


  _createClass(FlowchartCtrl, [{
    key: "onInitEditMode",
    value: function onInitEditMode() {
      this.addEditorTab('Flowcharting', 'public/plugins/' + _plugin.plugin.id + '/partials/flowchartEditor.html', 2);
      this.addEditorTab('Display', 'public/plugins/' + _plugin.plugin.id + '/partials/displayEditor.html', 3);
      this.addEditorTab('Shapes', 'public/plugins/' + _plugin.plugin.id + '/partials/shapeEditor.html', 4);
      this.addEditorTab('Values', 'public/plugins/' + _plugin.plugin.id + '/partials/valueEditor.html', 5);
      this.unitFormats = _kbn.default.getUnitFormats();
    }
  }, {
    key: "onRender",
    value: function onRender() {
      // TODO:
      this.data = this.parseSeries(this.series);
    }
  }, {
    key: "onDataReceived",
    value: function onDataReceived(dataList) {
      this.series = dataList.map(this.seriesHandler.bind(this));
      this.data = this.parseSeries(this.series);
      this.render(this.data);
    }
  }, {
    key: "onDataError",
    value: function onDataError() {
      this.series = [];
      this.render();
    } //
    // FUNCTIONS
    //

  }, {
    key: "link",
    value: function link(scope, elem, attrs, ctrl) {
      (0, _mxgraph.default)(scope, elem, attrs, ctrl);
    }
  }, {
    key: "setUnitFormat",
    value: function setUnitFormat(subItem) {
      this.panel.format = subItem.value;
      this.render();
    }
  }, {
    key: "seriesHandler",
    value: function seriesHandler(seriesData) {
      var series = new _time_series.default({
        datapoints: seriesData.datapoints,
        alias: seriesData.target
      });
      series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
      return series;
    }
  }, {
    key: "getDecimalsForValue",
    value: function getDecimalsForValue(value) {
      if (_lodash.default.isNumber(this.panel.decimals)) {
        return {
          decimals: this.panel.decimals,
          scaledDecimals: null
        };
      }

      var delta = value / 2;
      var dec = -Math.floor(Math.log(delta) / Math.LN10);
      var magn = Math.pow(10, -dec);
      var norm = delta / magn; // norm is between 1.0 and 10.0

      var size;

      if (norm < 1.5) {
        size = 1;
      } else if (norm < 3) {
        size = 2; // special case for 2.5, requires an extra decimal

        if (norm > 2.25) {
          size = 2.5;
          ++dec;
        }
      } else if (norm < 7.5) {
        size = 5;
      } else {
        size = 10;
      }

      size *= magn; // reduce starting decimals if not needed

      if (Math.floor(value) === value) {
        dec = 0;
      }

      var result = {};
      result.decimals = Math.max(0, dec);
      result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;
      return result;
    }
  }, {
    key: "toggleSeries",
    value: function toggleSeries(serie) {
      if (this.hiddenSeries[serie.label]) {
        delete this.hiddenSeries[serie.label];
      } else {
        this.hiddenSeries[serie.label] = true;
      }

      this.render();
    }
  }, {
    key: "parseSeries",
    value: function parseSeries(series) {
      var _this2 = this;

      return _lodash.default.map(this.series, function (serie, i) {
        return {
          label: serie.alias,
          data: serie.stats[_this2.panel.valueName],
          color: _this2.panel.aliasColors[serie.alias] || _this2.$rootScope.colors[i],
          legendData: serie.stats[_this2.panel.valueName]
        };
      });
    }
  }, {
    key: "setLegendWidthForLegacyBrowser",
    value: function setLegendWidthForLegacyBrowser() {
      var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

      if (isIE11 && this.panel.legendType === 'Right side' && !this.panel.legend.sideWidth) {
        this.panel.legend.sideWidth = 150;
      }
    }
  }]);

  return FlowchartCtrl;
}(_sdk.MetricsPanelCtrl);

exports.MetricsPanelCtrl = exports.FlowchartCtrl = FlowchartCtrl;
FlowchartCtrl.templateUrl = 'module.html';
