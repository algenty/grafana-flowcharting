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
    GF_PLUGIN.log.info( `flowchart[${name}].constructor()`);
    GF_PLUGIN.log.debug( `flowchart[${name}].constructor() data`, data);
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].import()`);
    GF_PLUGIN.log.debug( `flowchart[${this.data.name}].import() obj`, obj);
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].init()`);
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
      GF_PLUGIN.log.error( 'XML Graph not defined');
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].setStates()`);
    // GF_PLUGIN.log.debug( `flowchart[${this.data.name}].setStates() rules`, rules);
    // GF_PLUGIN.log.debug( `flowchart[${this.data.name}].setStates() series`, series);
    if (rules === undefined) GF_PLUGIN.log.error( "Rules shoudn't be null");
    if (series === undefined) GF_PLUGIN.log.error( "Series shoudn't be null");
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].applyStates()`);
    GF_PLUGIN.perf.start(`flowchart[${this.data.name}].applyStates()`);
    this.stateHandler.applyStates();
    GF_PLUGIN.perf.stop(`flowchart[${this.data.name}].applyStates()`);
  }

  /**
   *Apply options
   *
   * @memberof Flowchart
   */
  applyOptions() {
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].refresh()`);
    // GF_PLUGIN.log.debug( `flowchart[${this.data.name}].refresh() data`, this.data);
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].redraw()`);
    if (xmlGraph !== undefined) {
      this.data.xml = xmlGraph;
      this.xgraph.setXmlGraph(this.getXml(true));
    } else {
      GF_PLUGIN.log.warn( 'XML Content not defined');
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].reload()`);
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
    GF_PLUGIN.log.info( 'Flowchart.scale()');
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].getXml()`);
    if (!replaceVarBool) return this.data.xml;
    return this.templateSrv.replaceWithText(this.data.xml);
  }

  getCsv(replaceVarBool) {
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].getXml()`);
    if (!replaceVarBool) return this.data.csv;
    return this.templateSrv.replaceWithText(this.data.csv);
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].getContent()`);
    if (this.data.download) {
      let url = this.templateSrv.replaceWithText(this.data.url);
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].loadContent()`);
    var req = mxUtils.load(url);
    if (req.getStatus() === 200) {
      return req.getText();
    } else {
      GF_PLUGIN.log.error( 'Cannot load ' + url, req.getStatus());
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
    GF_PLUGIN.log.info( `flowchart[${this.data.name}].setMap()`);
    const container = this.getContainer();
    this.xgraph.setMap(onMappingObj);
    container.scrollIntoView();
    container.focus();
  }

  unsetMap() {
    this.xgraph.unsetMap();
  }
}
