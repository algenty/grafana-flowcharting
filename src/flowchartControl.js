import {MetricsPanelCtrl} from 'app/plugins/sdk';

// mxGraph libs
import mxClient from './libs/mxgraph/js/mxClient';
import mxUtils from './libs/mxgraph/js/mxUtils';
import mxCodec from './libs/mxgraph/js/mxCodec';

import {
  diagramEditor,
  displayEditor,
  shapeEditor,
  valueEditor
} from './properties';

import _ from 'lodash';
import './series_overrides_flowchart_ctrl';

const mxBasePath = './libs/mxgraph/src';

export class FlowchartCtrl extends MetricsPanelCtrl {

  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);
    this.$rootScope = $rootScope;
    this.hiddenSeries = {};

    var panelDefaults = {
      xmlContent: '<mxGraphModel dx="2066" dy="1171" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">\n'+
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
      shapes: [],
      graph : null,
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

    this.panel = panelDefaults;
    this.panel.legend = panelDefaults.legend;
    this.panel.graphId = 'flowchart_' + this.panel.id;
    this.$http = $http;
    this.panel.graphId = 'flowchart_' + this.panel.id;
    this.containerDivId = 'container_' + this.panel.graphId;
    this.$sce = $sce;
    this.unitFormats = kbn.getUnitFormats();

    this.events.on('render', this.onRender.bind(this));
    this.events.on('refresh', this.onRender.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

    this.onRender();

  }

  initializeMxgraph() {
    // initialize mxClient
    // Checks if browser is supported
    if (!mxClient.isBrowserSupported())
    {
      // Displays an error message if the browser is
      // not supported.
      mxUtils.error('Browser is not supported!', 200, false);
    }
    else
    {
      // Creates the graph inside the given container
      if ( this.graph != null) {
        graph = new mxGraph(this.Container());
      }
      graph.getModel().beginUpdate();
      try{
        var dec = new mxCodec(root.ownerDocument);
        dec.decode(root, graph.getModel());
      }
      finally{
        // Updates the display
        graph.getModel().endUpdate();
      }
    }

  }
  getContainer() {
    return $(document.getElementById(this.containerDivId));
  }

  onInitEditMode() {
    this.addEditorTab('Flowchart', flowchartEditor, 2);
    this.addEditorTab('Display', displayEditor, 3);
    this.addEditorTab('Metric Composites', shapeEditor, 4);
    this.addEditorTab('Metric Composites', valueEditor, 4);
  }

  onRender() {
    initializeMxgraph();
  }

  onDataReceived() {
    //TODO
  }


  onDataError() {

  }


}

FlowchartCtrl.templateUrl = 'module.html';
