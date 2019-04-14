import XGraph from './graph_class';
import StateHandler from './statesHandler';

export default class Flowchart {
  /** @ngInject */
  constructor(name, container, data) {
    this.data = data;
    this.data.name = name;
    this.container;
    this.xgraph;
    this.stateHandler;
    this.import(data);
    this.init();
  }

  import(obj) {
    if(obj.source) this.data.type = obj.source.type;
    else this.data.type = obj.type || this.data.type || 'xml';
    if(obj.source) this.data.xml = obj.source.xml.value ;
    else this.data.xml = obj.xml || this.data.xml || "";
    if(obj.source) this.data.url = obj.source.url.value;
    else this.data.url = 'http://<source>:<port>/<pathToXml>';
    if(obj.options) this.data.zoom = obj.options.zoom;
    else this.data.zoom = obj.zoom || '100%';
    if(obj.options) this.data.center = obj.options.center;
    else this.data.center = obj.center || true;
    if(obj.options) this.data.scale = obj.options.scale;
    else this.data.scale = obj.scale || true;
    if(obj.options) this.data.lock = obj.options.lock;
    else this.data.lock = obj.lock || true;
    if(obj.options) this.data.grid = obj.options.grid;
    else this.data.grid = obj.grid || false;
    if(obj.options) this.data.bgColor = obj.options.bgColor;
    else this.data.bgColor = obj.bgColor || undefined;
  }

  getData() {
    return this.data;
  }

  init() {
    u.log(1,"flowchart.init()")
    this.xgraph = new XGraph(this.container, this.data.xml);
    this.xgraph.drawGraph();
    if (this.data.scale) this.xgraph.scaleGraph(true);
    if (this.data.center) this.xgraph.centerGraph(true);
    if (this.data.lock) this.xgraph.lockGraph(true);
    this.stateHandler = new StateHandler(this.xgraph);
  }
  
  setStates(rules,series) {
    u.log(1,"flowchart.setStates()");
    // u.log(0,"flowchart.setStates() rules",rules);
    // u.log(0,"flowchart.setStates() series",series);
    this.stateHandler.setStates(rule,series);
  }

  applyStates() {
    u.log(1,"flowchart.applyStates()");
    this.stateHandler.applyStates();
  }

  refresh() {
    this.data.xgraph.refreshGraph(this.width, this.height);
  }

  refresh(width,height) {
    if (width != undefined && width != null ) this.setWidth(width);
    if (height != undefined && height != null ) this.setHeight(height);
    this.refresh();
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

  getContainer() {
    return this.container;
  }
}
