import XGraph from './graph_class';
import StateHandler from './statesHandler';

export default class Flowchart {
  /** @ngInject */
  constructor(name, xmlGraph, container, data) {
    u.log(1, `flowchart[${name}].constructor()`);
    u.log(0, `flowchart[${name}].constructor() data`, data);
    this.data = data;
    this.data.name = name;
    this.data.xml = xmlGraph;
    this.container = container;
    this.xgraph = undefined;
    this.stateHandler = undefined;
    this.import(data);
    this.init();
  }

  import(obj) {
    u.log(1, `flowchart[${this.data.name}].import()`);
    u.log(0, `flowchart[${this.data.name}].import() obj`, obj);
    if (obj.source) this.data.type = obj.source.type;
    else this.data.type = obj.type || this.data.type || 'xml';
    if (obj.source) this.data.xml = obj.source.xml.value;
    else this.data.xml = obj.xml || this.data.xml || '';
    if (obj.source) this.data.url = obj.source.url.value;
    else this.data.url = 'http://<source>:<port>/<pathToXml>';
    if (obj.options) this.data.zoom = obj.options.zoom;
    else this.data.zoom = obj.zoom || '100%';
    if (obj.options) this.data.center = obj.options.center;
    else this.data.center = obj.center !== undefined ? obj.center : true;
    if (obj.options) this.data.scale = obj.options.scale;
    else this.data.scale = obj.scale !== undefined ? obj.scale : true;
    if (obj.options) this.data.lock = obj.options.lock;
    else this.data.lock = obj.lock !== undefined ? obj.lock : true;
    if (obj.options) this.data.tooltip = obj.options.tooltip;
    else this.data.tooltip = obj.tooltip !== undefined ? obj.tooltip : true;
    if (obj.options) this.data.grid = obj.options.grid;
    else this.data.grid = obj.grid !== undefined ? obj.grid : false;
    if (obj.options) this.data.bgColor = obj.options.bgColor;
    else this.data.bgColor = obj.bgColor;
  }

  getData() {
    return this.data;
  }

  init() {
    u.log(1, `flowchart[${this.data.name}].init()`);
    if (this.xgraph === undefined) this.xgraph = new XGraph(this.container, this.data.xml);
    if (this.data.xml !== undefined && this.data.xml !== null) {
      this.xgraph.drawGraph();
      if (this.data.tooltip) this.xgraph.tooltipGraph(true);
      if (this.data.scale) this.xgraph.scaleGraph(true);
      else this.xgraph.zoomGraph(this.data.zoom);
      if (this.data.center) this.xgraph.centerGraph(true);
      if (this.data.lock) this.xgraph.lockGraph(true);
      this.stateHandler = new StateHandler(this.xgraph);
    } else {
      u.log(3, 'XML Graph not defined');
    }
  }

  getStateHandler() {
    return this.stateHandler;
  }

  getXGraph() {
    return this.xgraph;
  }

  setStates(rules, series) {
    u.log(1, `flowchart[${this.data.name}].setStates()`);
    u.log(0, `flowchart[${this.data.name}].setStates() rules`, rules);
    u.log(0, `flowchart[${this.data.name}].setStates() series`, series);
    if (rules === undefined) u.log(3, "Rules shoudn't be null");
    if (series === undefined) u.log(3, "Series shoudn't be null");
    this.stateHandler.setStates(rules, series);
  }

  applyStates() {
    u.log(1, `flowchart[${this.data.name}].applyStates()`);
    this.stateHandler.applyStates();
  }

  refresh(width, height) {
    u.log(1, `flowchart[${this.data.name}].refresh()`);
    u.log(0, `flowchart[${this.data.name}].refresh() data`, this.data);
    if (width !== undefined && width != null) this.setWidth(width);
    if (height !== undefined && height != null) this.setHeight(height);
    this.xgraph.refreshGraph(this.width, this.height);
  }

  redraw(xmlGraph) {
    u.log(1, `flowchart[${this.data.name}].redraw()`);
    if (xmlGraph !== undefined) {
      this.data.xml = xmlGraph;
      this.xgraph.setXmlGraph(this.data.xml);
    } else {
      u.log(2, 'XML Content not defined');
      this.xgraph.setXmlGraph(this.data.xml);
    }
    this.init();
  }

  setLock(bool) {
    this.data.lock = bool;
    this.xgraph.lock = bool;
  }

  lock(bool) {
    if (bool !== undefined) this.data.lock = bool;
    this.xgraph.lockGraph(this.data.lock);
  }

  setTooltip(bool) {
    this.data.tooltip = bool;
    this.xgraph.tooltip = bool;
  }

  tooltip(bool) {
    if (bool !== undefined) this.data.tooltip = bool;
    this.xgraph.tooltipGraph(this.data.tooltip);
  }

  setScale(bool) {
    this.data.scale = bool;
    this.xgraph.scale = bool;
  }

  scale(bool) {
    // u.log(1, "Flowchart.scale()");
    if (bool !== undefined) this.data.scale = bool;
    this.xgraph.scaleGraph(this.data.scale);
  }

  setCenter(bool) {
    this.data.center = bool;
    this.xgraph.center = bool;
  }

  getNamesByProp(prop) {
    return this.xgraph.getOrignalCells(prop);
  }

  renameId(oldId, newId) {
    this.xgraph.renameId(oldId, newId);
  }

  applyModel() {
    this.xmlGraph = this.xgraph.getXmlModel();
    this.redraw(this.xmlGraph);
  }

  center(bool) {
    if (bool !== undefined) this.data.center = bool;
    this.xgraph.centerGraph(this.data.center);
  }

  setZoom(percent) {
    this.data.zoom = percent;
    this.xgraph.zoomPercent = percent;
  }

  zoom(percent) {
    if (percent !== undefined) this.data.percent = percent;
    this.xgraph.zoomGraph(this.data.percent);
  }

  setGrid(bool) {
    this.data.grid = bool;
    this.xgraph.grid = bool;
  }

  grid(bool) {
    if (bool !== undefined) this.data.grid = bool;
    this.xgraph.gridGraph(this.data.grid);
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  setXml(xml) {
    this.data.xml = xml;
  }

  minify() {
    this.data.xml = u.minify(this.data.xml);
  }

  prettify() {
    this.data.xml = u.prettify(this.data.xml);
  }

  decode() {
    if (u.isencoded(this.data.xml)) this.data.xml = u.decode(this.data.xml, true, true, true);
  }

  encode() {
    if (!u.isencoded(this.data.xml)) this.data.xml = u.encode(this.data.xml, true, true, true);
  }

  getContainer() {
    return this.container;
  }

  setMap(onMappingObj) {
    u.log(1, `flowchart[${this.data.name}].setMap()`);
    u.log(0, `flowchart[${this.data.name}].setMap() onMappingObj`, onMappingObj);
    const container = this.getContainer();
    this.xgraph.setMap(onMappingObj);
    container.scrollIntoView();
    container.focus();
  }

  unsetMap() {
    u.log(1, `flowchart[${this.data.name}].unsetMap()`);
    this.xgraph.unsetMap();
  }
}
