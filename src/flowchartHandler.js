/* eslint-disable prefer-destructuring */
import Flowchart from './flowchart_class';

export default class FlowchartHandler {
  /** @ngInject */
  constructor($scope, elem, ctrl, data) {
    u.log(1, 'FlowchartHandler.constructor()');
    u.log(0, 'FlowchartHandler.constructor() data', data);
    this.$scope = $scope || null;
    this.$elem = elem.find('.flowchart-panel__chart');
    this.ctrl = ctrl;
    this.flowcharts = [];
    this.data = data;
    this.changeSourceFlag = true;
    this.changeOptionFlag = true;
    this.changeDataFlag = true;
    this.changedRuleFlag = true;
    this.defaultXml = '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';
      
    // '<mxGraphModel dx="1073" dy="521" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="arrow-1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-grafana" target="shape-love" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><object label="Grafana" href="www.google.fr" id="shape-grafana"><mxCell style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell></object><mxCell id="arrow-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-love" target="shape-mxgraph" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-love" value="loves" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="shape-mxgraph" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell><mxCell id="text-grafana" value="MyText : TextVal" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="9" y="50" width="120" height="20" as="geometry"/></mxCell><mxCell id="text-arrow1" value="Text 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="150" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow2" value="Text 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="280" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-mxgraph" value="Text 4" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="380" y="50" width="40" height="20" as="geometry"/></mxCell></root></mxGraphModel>';

    this.xgraph = undefined;
    this.$container = undefined;
    this.onMapping = {
      active: false, // boolean if pointer mapping is active
      object: undefined, // ojb to return id of mapping
      id: undefined, // id of dom
    };

    this.import(this.data);

    // Events Render
    ctrl.events.on('render', () => {
      this.render();
    });
  }

  import(obj) {
    u.log(1, 'FlowchartHandler.import()');
    u.log(0, 'FlowchartHandler.import() obj', obj);
    this.flowcharts = [];
    if (obj !== undefined && obj !== null && obj.length > 0) {
      obj.forEach((map) => {
        const container = this.createContainer();
        const newData = {};
        const fc = new Flowchart(map.name, map.xml, container, newData);
        fc.import(map);
        this.flowcharts.push(fc);
        this.data.push(newData);
      });
    }
  }

  getFlowchart(index) {
    return this.flowcharts[index];
  }

  getFlowcharts() {
    return this.flowcharts;
  }

  countFlowcharts() {
    if (this.flowcharts !== undefined && Array.isArray(this.flowcharts)) return this.flowcharts.length;
    return 0;
  }

  createContainer() {
    const $container = $(
      `<div id="flowchart_${
        u.uniqueID
      }" style="margin:auto;position:relative,width:100%;height:100%"></div>`
    );
    this.$elem.html($container);
    return $container[0];
  }

  addFlowchart(name) {
    u.log(1, 'FlowchartHandler.addFlowchart()');
    const container = this.createContainer();
    const data = {};
    const flowchart = new Flowchart(name, this.defaultXml, container, data);
    this.data.push(data);
    this.flowcharts.push(flowchart);
  }

  render() {
    u.log(1, 'flowchartHandler.render()');
    if (this.changeSourceFlag) {
      this.draw();
      this.changeSourceFlag = false;
      this.changeRuleFlag = true;
    }
    if (this.changeOptionFlag) {
      this.setOptions();
      this.changeOptionFlag = false;
    }
    if (this.changeRuleFlag || this.changeDataFlag) {
      this.setStates();
      this.applyStates();
      this.changeRuleFlag = false;
      this.changeDataFlag = false;
    }
    const width = this.$elem.width();
    const height = this.ctrl.height;
    this.refresh(width, height);
  }

  sourceChanged() {
    this.changeSourceFlag = true;
  }

  optionChanged() {
    this.changeOptionFlag = true;
  }

  ruleChanged() {
    this.changeRuleFlag = true;
  }

  dataChanged() {
    this.changeDataFlag = true;
  }

  refresh(width, height) {
    u.log(1, `FlowchartHandler.refresh()`);
    this.flowcharts.forEach((flowchart) => {
      flowchart.refresh(width, height);
    });
  }

  setStates() {
    const rules = this.ctrl.rulesHandler.getRules();
    const series = this.ctrl.series;
    this.flowcharts.forEach((flowchart) => {
      flowchart.setStates(rules, series);
    });
  }

  applyStates() {
    this.flowcharts.forEach((flowchart) => {
      flowchart.applyStates();
    });
  }

  setOptions() {
    this.flowcharts.forEach((flowchart) => {
      flowchart.setScale(flowchart.data.scale);
      flowchart.setCenter(flowchart.data.center);
      flowchart.setGrid(flowchart.data.grid);
      flowchart.setTooltip(flowchart.data.tooltip);
      flowchart.setLock(flowchart.data.lock);
      flowchart.setZoom(flowchart.data.zoom);
      flowchart.setBgColor(flowchart.data.bgColor);
    });
  }

  draw() {
    u.log(1, `FlowchartHandler.draw()`);
    this.flowcharts.forEach((flowchart) => {
      flowchart.redraw();
    });
  }

  setMap(objToMap) {
    const flowchart = this.getFlowchart(0);
    this.onMapping.active = true;
    this.onMapping.object = objToMap;
    this.onMapping.id = objToMap.getId();
    this.onMapping.$scope = this.$scope;
    flowchart.setMap(this.onMapping);
  }

  unsetMap() {
    const flowchart = this.getFlowchart(0);
    this.onMapping.active = false;
    this.onMapping.object = undefined;
    this.onMapping.id = '';
    flowchart.unsetMap();
  }

  isMapping(objToMap) {
    if (objToMap === undefined || objToMap == null) return this.onMapping.active;
    if (this.onMapping.active === true && objToMap === this.onMapping.object) return true;
    return false;
  }

  openDrawEditor(index) {
    const urlEditor = 'https://draw.io?embed=1';
    const editorWindow = window.open(urlEditor, 'MxGraph Editor', 'width=1280, height=720');
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://www.draw.io') return;
      // when editor is open
      if (event.data === 'ready') {
        // send xml
        event.source.postMessage(this.flowcharts[index].data.xml, event.origin);
      } else {
        if (event.data !== undefined && event.data.length > 0) {
          // this.flowcharts[index].setXml(event.data);
          this.flowcharts[index].redraw(event.data);
          this.sourceChanged();
          this.$scope.$apply();
          // this.render();
        }
        if (event.data !== undefined || event.data.length === 0) {
          editorWindow.close();
        }
      }
    });
  }
}
