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
    this.defaultXml =
      '<mxGraphModel dx="1073" dy="521" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="arrow-1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-grafana" target="shape-love" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><object label="Grafana" href="www.google.fr" id="shape-grafana"><mxCell style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell></object><mxCell id="arrow-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-love" target="shape-mxgraph" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-love" value="loves" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="shape-mxgraph" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell><mxCell id="text-grafana" value="MyText : TextVal" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="9" y="50" width="120" height="20" as="geometry"/></mxCell><mxCell id="text-arrow1" value="Text 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="150" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow2" value="Text 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="280" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-mxgraph" value="Text 4" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="380" y="50" width="40" height="20" as="geometry"/></mxCell></root></mxGraphModel>';
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
