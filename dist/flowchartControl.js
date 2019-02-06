"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsPanelCtrl = exports.FlowchartCtrl = void 0;

var _sdk = require("app/plugins/sdk");

var _time_series = _interopRequireDefault(require("app/core/time_series2"));

var _kbn = _interopRequireDefault(require("app/core/utils/kbn"));

var _properties = require("./properties");

var _lodash = _interopRequireDefault(require("lodash"));

var _mxgraphinterface = _interopRequireDefault(require("./mxgraphinterface"));

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

var defaults = {
  currentPath: _properties.currentPath,
  content: '<mxGraphModel dx="2066" dy="1171" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">\n' + '  <root>\n' + '    <mxCell id="0"/>\n' + '    <mxCell id="1" parent="0"/>\n' + '    <mxCell id="5" style="rounded=0;html=1;entryX=0.5;entryY=0;jettySize=auto;orthogonalLoop=1;edgeStyle=orthogonalEdgeStyle;curved=1;" edge="1" parent="1" source="2" target="3">\n' + '      <mxGeometry relative="1" as="geometry"/>\n' + '    </mxCell>\n' + '    <mxCell id="6" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=0;html=1;jettySize=auto;orthogonalLoop=1;" edge="1" parent="1" source="2" target="4">\n' + '      <mxGeometry relative="1" as="geometry"/>\n' + '    </mxCell>\n' + '    <object label="Hello" composite="Hello" id="2">\n' + '      <mxCell style="rounded=1;whiteSpace=wrap;html=1;gradientColor=#ffffff;fillColor=#00FF00;" parent="1" vertex="1">\n' + '        <mxGeometry x="340" y="180" width="120" height="60" as="geometry"/>\n' + '      </mxCell>\n' + '    </object>\n' + '    <object label="mxGraph" composite="World" id="3">\n' + '      <mxCell style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;gradientColor=#ffffff;fillColor=#E580FF;" parent="1" vertex="1">\n' + '        <mxGeometry x="274" y="320" width="80" height="80" as="geometry"/>\n' + '      </mxCell>\n' + '    </object>\n' + '    <mxCell id="4" value="Grafana" style="shape=mxgraph.flowchart.display;whiteSpace=wrap;html=1;fillColor=#FF7654;strokeColor=#000000;strokeWidth=2;gradientColor=#ffffff;" vertex="1" parent="1">\n' + '      <mxGeometry x="440" y="330" width="98" height="60" as="geometry"/>\n' + '    </mxCell>\n' + '    <mxCell id="7" value="Author : Arnaud GENTY&lt;br&gt;&lt;div style=&quot;text-align: left&quot;&gt;Manthor :&amp;nbsp;&lt;span&gt;Jeremy&amp;nbsp;&lt;/span&gt;&lt;span&gt;jdbranham&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">\n' + '      <mxGeometry x="260" y="407" width="280" height="40" as="geometry"/>\n' + '    </mxCell>\n' + '  </root>\n' + '</mxGraphModel>\n',
  shapes: [],
  values: [],
  graph: null,
  legend: {
    show: true,
    min: true,
    max: true,
    avg: true,
    current: true,
    total: true,
    gradient: {
      enabled: true,
      show: true
    }
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

var FlowchartCtrl =
/*#__PURE__*/
function (_MetricsPanelCtrl) {
  _inherits(FlowchartCtrl, _MetricsPanelCtrl);

  function FlowchartCtrl($scope, $injector, $sce, $http) {
    var _this;

    _classCallCheck(this, FlowchartCtrl);

    console.log("FlowchartCtrl.constructor");
    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlowchartCtrl).call(this, $scope, $injector));

    _lodash.default.defaults(_this.panel, defaults);

    _this.$http = $http;
    _this.panel.graphId = 'flowchart_' + _this.panel.id;
    _this.containerDivId = 'container_' + _this.panel.graphId;
    console.log(_this.containerDivId);
    _this.$sce = $sce;
    _this.templateUrl = 'module.html'; // events

    _this.events.on('render', _this.onRender.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('refresh', _this.onRender.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('data-received', _this.onDataReceived.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('data-error', _this.onDataError.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.onRender();

    return _this;
  }

  _createClass(FlowchartCtrl, [{
    key: "getFlowchartContainer",
    value: function getFlowchartContainer() {
      // console.log($(document.getElementById(this.containerDivId)));
      //return $(document.getElementById(this.containerDivId));
      console.log(document.getElementById(this.containerDivId));
      return document.getElementById(this.containerDivId);
    }
  }, {
    key: "onInitEditMode",
    value: function onInitEditMode() {
      this.addEditorTab('Flowchart', _properties.flowchartEditor, 2);
      this.addEditorTab('Display', _properties.displayEditor, 3);
      this.addEditorTab('Metric Shapes', _properties.shapeEditor, 4);
      this.addEditorTab('Metric Values', _properties.valueEditor, 5);
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var t = new _mxgraphinterface.default(this.getFlowchartContainer());
      t.draw();
    }
  }, {
    key: "onDataReceived",
    value: function onDataReceived() {}
  }, {
    key: "onDataError",
    value: function onDataError() {// TODO:
    }
  }]);

  return FlowchartCtrl;
}(_sdk.MetricsPanelCtrl);

exports.MetricsPanelCtrl = exports.FlowchartCtrl = FlowchartCtrl;
FlowchartCtrl.templateUrl = 'module.html';
