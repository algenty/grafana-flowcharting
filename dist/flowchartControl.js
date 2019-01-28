'use strict';

System.register(['./libs/mxgraph-js/dist/mxgraph-js', 'app/plugins/sdk', 'app/core/time_series2', 'app/core/utils/kbn', './properties', 'lodash', './series_overrides_flowchart_ctrl'], function (_export, _context) {
  "use strict";

  var mx, MetricsPanelCtrl, TimeSeries, kbn, flowchartEditor, displayEditor, shapeEditor, valueEditor, _, _createClass, panelDefaults, FlowchartCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_libsMxgraphJsDistMxgraphJs) {
      mx = _libsMxgraphJsDistMxgraphJs;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_properties) {
      flowchartEditor = _properties.flowchartEditor;
      displayEditor = _properties.displayEditor;
      shapeEditor = _properties.shapeEditor;
      valueEditor = _properties.valueEditor;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_series_overrides_flowchart_ctrl) {}],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
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

      _export('FlowchartCtrl', FlowchartCtrl = function (_MetricsPanelCtrl) {
        _inherits(FlowchartCtrl, _MetricsPanelCtrl);

        function FlowchartCtrl($scope, $injector, $sce, $http) {
          _classCallCheck(this, FlowchartCtrl);

          var _this = _possibleConstructorReturn(this, (FlowchartCtrl.__proto__ || Object.getPrototypeOf(FlowchartCtrl)).call(this, $scope, $injector));

          _.defaults(_this.panel, panelDefaults);
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
          key: 'initializeMxgraph',
          value: function initializeMxgraph() {
            //initialize mxClient
            //Checks if browser is supported
            //this.initLibs();

            if (!mx.mxClient.isBrowserSupported()) {
              // Displays an error message if the browser is not supported.
              mx.mxUtils.error('Browser is not supported!', 200, false);
            } else {
              //Creates the graph inside the given container
              // if ( this.graph == null) {
              //   // Creates the graph inside the given container
              //   graph = new mx.mxGraph(this.getFlowchartContainer());
              // }
              // graph.getModel().beginUpdate();
              // try{
              //   var dec = new mx.mxCodec(root.ownerDocument);
              //   dec.decode(root, graph.getModel());
              // }
              // finally{
              //   // Updates the display
              //   graph.getModel().endUpdate();
              // }
              // Disables the built-in context menu
              var container = $(document.getElementById(this.containerDivId));
              mx.mxEvent.disableContextMenu(container);

              // Creates the graph inside the given container
              var graph = new mx.mxGraph(container);

              // Enables rubberband selection
              new mx.mxRubberband(graph);

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
          key: 'initLibs',
          value: function initLibs() {
            var node = document.createElement("script");
            node.type = 'text/javascript';
            node.async = true;
            node.charset = 'utf-8';
            var code = 'mxBasePath="' + mxBasePath + '";';
            node.text = code;
            document.head.appendChild(node);
          }
        }, {
          key: 'getFlowchartContainer',
          value: function getFlowchartContainer() {
            return $(document.getElementById(this.containerDivId));
          }
        }, {
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Flowchart', flowchartEditor, 2);
            this.addEditorTab('Display', displayEditor, 3);
            this.addEditorTab('Metric Shapes', shapeEditor, 4);
            this.addEditorTab('Metric Values', valueEditor, 5);
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
      }(MetricsPanelCtrl));

      _export('FlowchartCtrl', FlowchartCtrl);

      FlowchartCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=flowchartControl.js.map
