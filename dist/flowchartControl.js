'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowchartCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mxgraphJs = require('./libs/mxgraph-js/dist/mxgraph-js');

var _sdk = require('app/plugins/sdk');

var _time_series = require('app/core/time_series2');

var _time_series2 = _interopRequireDefault(_time_series);

var _kbn = require('app/core/utils/kbn');

var _kbn2 = _interopRequireDefault(_kbn);

var _properties = require('./properties');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('./series_overrides_flowchart_ctrl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import './externals/globals.js';
//import './externals/mxInt';


var panelDefaults = {
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

var FlowchartCtrl = exports.FlowchartCtrl = function (_MetricsPanelCtrl) {
  _inherits(FlowchartCtrl, _MetricsPanelCtrl);

  function FlowchartCtrl($scope, $injector, $sce, $http) {
    _classCallCheck(this, FlowchartCtrl);

    var _this = _possibleConstructorReturn(this, (FlowchartCtrl.__proto__ || Object.getPrototypeOf(FlowchartCtrl)).call(this, $scope, $injector));

    _lodash2.default.defaults(_this.panel, panelDefaults);
    _this.$http = $http;
    _this.panel.graphId = 'flowchart_' + _this.panel.id;
    _this.containerDivId = 'container_' + _this.panel.graphId;
    _this.$sce = $sce;

    // events
    _this.events.on('render', _this.onRender.bind(_this));
    _this.events.on('refresh', _this.onRender.bind(_this));
    _this.events.on('data-received', _this.onDataReceived.bind(_this));
    _this.events.on('data-error', _this.onDataError.bind(_this));
    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

    _this.onRender();

    return _this;
  }

  _createClass(FlowchartCtrl, [{
    key: 'test',
    value: function test(container) {
      // Checks if the browser is supported
      if (!_mxgraphJs.arnaud.mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        _mxgraphJs.arnaud.mxUtils.error('Browser is not supported!', 200, false);
      } else {
        // Disables the built-in context menu
        _mxgraphJs.arnaud.mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        var graph = new _mxgraphJs.arnaud.mxGraph(container);

        // Enables rubberband selection
        new _mxgraphJs.arnaud.mxRubberband(graph);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
          var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
          var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
          var e1 = graph.insertEdge(parent, null, '', v1, v2);
        } finally {
          // Updates the display
          graph.getModel().endUpdate();
        }
      }
    }
  }, {
    key: 'initializeMxgraph',
    value: function initializeMxgraph() {
      //mxInt.test(this.initializeMxgraph());
      this.test(this.getFlowchartContainer());
    }
  }, {
    key: 'getFlowchartContainer',
    value: function getFlowchartContainer() {
      return $(document.getElementById(this.containerDivId));
    }
  }, {
    key: 'onInitEditMode',
    value: function onInitEditMode() {
      this.addEditorTab('Flowchart', _properties.flowchartEditor, 2);
      this.addEditorTab('Display', _properties.displayEditor, 3);
      this.addEditorTab('Metric Shapes', _properties.shapeEditor, 4);
      this.addEditorTab('Metric Values', _properties.valueEditor, 5);
    }
  }, {
    key: 'onRender',
    value: function onRender() {
      this.initializeMxgraph();
    }
  }, {
    key: 'onDataReceived',
    value: function onDataReceived() {
      //TODO : complete
    }
  }, {
    key: 'onDataError',
    value: function onDataError() {
      // TODO:
    }
  }]);

  return FlowchartCtrl;
}(_sdk.MetricsPanelCtrl);

FlowchartCtrl.templateUrl = 'module.html';
