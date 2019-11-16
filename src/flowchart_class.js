import XGraph from './graph_class';
import StateHandler from './statesHandler';

/**
 *Flowchart handler
 *
 * @export
 * @class Flowchart
 */
export default class Flowchart {
  constructor(name, xmlGraph, container, ctrl, data) {
    GFP.log.info( `flowchart[${name}].constructor()`);
    GFP.log.debug( `flowchart[${name}].constructor() data`, data);
    this.data = data;
    this.data.name = name;
    this.data.xml = xmlGraph;
    this.data.download = false; 
    this.container = container;
    this.xgraph = undefined;
    this.stateHandler = undefined;
    this.ctrl = ctrl;
    this.templateSrv = ctrl.templateSrv;
    this.import(data);
  }

  /**
   *Import data object in current flowchart
   *
   * @param {Object} obj
   * @memberof Flowchart
   */
  import(obj) {
    GFP.log.info( `flowchart[${this.data.name}].import()`);
    GFP.log.debug( `flowchart[${this.data.name}].import() obj`, obj);
    this.data.download = (obj.download !== undefined ? obj.download : false);
    if (obj.source) this.data.type = obj.source.type;
    else this.data.type = obj.type || this.data.type || 'xml';
    if (obj.source) this.data.xml = obj.source.xml.value;
    else this.data.xml = obj.xml || this.data.xml || '';
    if (obj.source) this.data.url = obj.source.url.value;
    else this.data.url = (obj.url !== undefined ? obj.url : 'http://<source>:<port>/<pathToXml>');
    if (obj.options) this.data.zoom = obj.options.zoom;
    else this.data.zoom = obj.zoom || '100%';
    if (obj.options) this.data.center = obj.options.center;
    else this.data.center = obj.center !== undefined ? obj.center : true;
    if (obj.options) this.data.scale = obj.options.scale;
    else this.data.scale = obj.scale !== undefined ? obj.scale : true;
    if (obj.options) this.data.lock = obj.options.lock;
    else this.data.lock = obj.lock !== undefined ? obj.lock : true;
    if (obj.options) this.data.allowDrawio = false;
    else this.data.allowDrawio = obj.allowDrawio !== undefined ? obj.allowDrawio : false;
    if (obj.options) this.data.tooltip = obj.options.tooltip;
    else this.data.tooltip = obj.tooltip !== undefined ? obj.tooltip : true;
    if (obj.options) this.data.grid = obj.options.grid;
    else this.data.grid = obj.grid !== undefined ? obj.grid : false;
    if (obj.options) this.data.bgColor = obj.options.bgColor;
    else this.data.bgColor = obj.bgColor;
    this.data.editorUrl = obj.editorUrl !== undefined ? obj.editorUrl : "https://www.draw.io";
    this.data.editorTheme = obj.editorTheme !== undefined ? obj.editorTheme : "dark";
    this.init();
  }

  /**
   * Return data without functions to save json in grafana
   *
   * @returns {Object} Data object
   * @memberof Flowchart
   */
  getData() {
    return this.data;
  }

  /**
   *Update states of flowchart/graph
   *
   * @param {*} rules
   * @memberof Flowchart
   */
  updateStates(rules) {
    // if (this.stateHandler !== undefined) this.stateHandler.updateStates(rules);
    // this.stateHandler.prepare();
    rules.forEach(rule => {
      rule.states = this.stateHandler.getStatesForRule(rule);
      rule.states.forEach(state => {
        state.unsetState();
      });
    });
  }

  /**
   *Initialisation of flowchart class
   *
   * @memberof Flowchart
   */
  init() {
    GFP.log.info( `flowchart[${this.data.name}].init()`);
    if (this.xgraph === undefined)
      this.xgraph = new XGraph(this.container, this.data.type, this.getContent());
    if (this.data.xml !== undefined && this.data.xml !== null) {
      if (this.data.download) this.xgraph.setXmlGraph(this.getContent());
      if (this.data.allowDrawio) this.xgraph.allowDrawio(true);
      else this.xgraph.allowDrawio(false);
      this.setOptions();
      this.xgraph.drawGraph();
      if (this.data.tooltip) this.xgraph.tooltipGraph(true);
      if (this.data.scale) this.xgraph.scaleGraph(true);
      else this.xgraph.zoomGraph(this.data.zoom);
      if (this.data.center) this.xgraph.centerGraph(true);
      if (this.data.lock) this.xgraph.lockGraph(true);
      this.stateHandler = new StateHandler(this.xgraph, this.ctrl);
    } else {
      GFP.log.error( 'XML Graph not defined');
    }
  }

  /**
   *Get states handler
   *
   * @returns
   * @memberof Flowchart
   */
  getStateHandler() {
    return this.stateHandler;
  }

  /**
   *Get XGraph
   *
   * @returns
   * @memberof Flowchart
   */
  getXGraph() {
    return this.xgraph;
  }

  /**
   *Init states with rules and series
   *
   * @param {*} rules
   * @param {*} series
   * @memberof Flowchart
   */
  setStates(rules, series) {
    GFP.log.info( `flowchart[${this.data.name}].setStates()`);
    // GFP.log.debug( `flowchart[${this.data.name}].setStates() rules`, rules);
    // GFP.log.debug( `flowchart[${this.data.name}].setStates() series`, series);
    if (rules === undefined) GFP.log.error( "Rules shoudn't be null");
    if (series === undefined) GFP.log.error( "Series shoudn't be null");
    this.stateHandler.setStates(rules, series);
  }

  /**
   *Init options of graph
   *
   * @memberof Flowchart
   */
  setOptions() {
    this.setScale(this.data.scale);
    this.setCenter(this.data.center);
    this.setGrid(this.data.grid);
    this.setTooltip(this.data.tooltip);
    this.setLock(this.data.lock);
    this.setZoom(this.data.zoom);
    this.setBgColor(this.data.bgColor);
  }


  /**
   *Apply new states (colors,text ...)
   *
   * @memberof Flowchart
   */
  applyStates() {
    GFP.log.info( `flowchart[${this.data.name}].applyStates()`);
    this.stateHandler.applyStates();
  }

  /**
   *Apply options
   *
   * @memberof Flowchart
   */
  applyOptions() {
    GFP.log.info( `flowchart[${this.data.name}].refresh()`);
    // GFP.log.debug( `flowchart[${this.data.name}].refresh() data`, this.data);
    this.xgraph.applyGraph(this.width, this.height);
  }

  /**
   *Refresh graph
   *
   * @memberof Flowchart
   */
  refresh()
  {
    this.xgraph.refresh();
  }

  /**
   *Reset and redraw graph when source changed
   *
   * @param {*} xmlGraph
   * @memberof Flowchart
   */
  redraw(xmlGraph) {
    GFP.log.info( `flowchart[${this.data.name}].redraw()`);
    if (xmlGraph !== undefined) {
      this.data.xml = xmlGraph;
      this.xgraph.setXmlGraph(this.getXml(true));
    } else {
      GFP.log.warn( 'XML Content not defined');
      this.xgraph.setXmlGraph(this.getXml(true));
    }
    this.applyOptions();
  }

  /**
   *Reload source of graph
   *
   * @memberof Flowchart
   */
  reload() {
    GFP.log.info( `flowchart[${this.data.name}].reload()`);
    if (this.xgraph !== undefined && this.xgraph !== null) {
      this.xgraph.destroyGraph();
      this.xgraph = undefined;
      this.init();
    }
    else this.init();
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

  setBgColor(bgColor) {
    this.data.bgColor = bgColor;
    this.xgraph.bgColor = bgColor;
  }

  bgColor(bgColor) {
    this.data.bgColor = bgColor;
    if (bgColor) this.xgraph.bgGraph(bgColor);
  }

  scale(bool) {
    GFP.log.info( 'Flowchart.scale()');
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

  getXml(replaceVarBool) {
    GFP.log.info( `flowchart[${this.data.name}].getXml()`);
    if (!replaceVarBool) return this.data.xml;
    return GFP.replaceWithText(this.data.xml);
  }

  getCsv(replaceVarBool) {
    GFP.log.info( `flowchart[${this.data.name}].getXml()`);
    if (!replaceVarBool) return this.data.csv;
    return GFP.nreplaceWithText(this.data.csv);
  }

  getUrlEditor() {
    return this.data.editorUrl;
  }

  getThemeEditor() {
    return this.data.editorTheme;
  }

  /**
   *Get Source of graph (csv|xml) or get content from url
   *
   * @returns
   * @memberof Flowchart
   */
  getContent() {
    GFP.log.info( `flowchart[${this.data.name}].getContent()`);
    if (this.data.download) {
      let url = GFP.replaceWithText(this.data.url);
      let content = this.loadContent(url);
      if (content !== null) {
        return content;
      } else return '';
    } else {
      if (this.data.type === 'xml') return this.getXml(true);
      if (this.data.type === 'csv') return this.getCsv(true);
    }
  }

  /**
   *Load source from url
   *
   * @param {*} url
   * @returns
   * @memberof Flowchart
   */
  loadContent(url) {
    GFP.log.info( `flowchart[${this.data.name}].loadContent()`);
    var req = mxUtils.load(url);
    if (req.getStatus() === 200) {
      return req.getText();
    } else {
      GFP.log.error( 'Cannot load ' + url, req.getStatus());
      return null;
    }
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
    this.data.xml = GFP.utils.minify(this.data.xml);
  }

  prettify() {
    this.data.xml = GFP.utils.prettify(this.data.xml);
  }

  decode() {
    if (GFP.utils.isencoded(this.data.xml)) this.data.xml = GFP.utils.decode(this.data.xml, true, true, true);
  }

  encode() {
    if (!GFP.utils.isencoded(this.data.xml)) this.data.xml = GFP.utils.encode(this.data.xml, true, true, true);
  }

  getContainer() {
    return this.container;
  }

  setMap(onMappingObj) {
    GFP.log.info( `flowchart[${this.data.name}].setMap()`);
    const container = this.getContainer();
    this.xgraph.setMap(onMappingObj);
    container.scrollIntoView();
    container.focus();
  }

  unsetMap() {
    this.xgraph.unsetMap();
  }
}
