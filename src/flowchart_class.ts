import XGraph from 'graph_class';
import { StateHandler } from 'statesHandler';
import { State } from 'state_class';
import { Rule } from 'rule_class';

import { FlowchartHandler } from 'flowchartHandler';
import { Metric } from 'metric_class';
import { GFGlobal } from 'globals_class';

/**
 * Flowchart handler
 *
 * @export
 * @class Flowchart
 */
export class Flowchart {
  data: gf.TFlowchartData;
  container: HTMLDivElement;
  xgraph: XGraph | undefined = undefined;
  stateHandler: StateHandler | undefined;
  // ctrl: any;
  templateSrv: any;
  states: Map<string, State> | undefined;

  constructor(name: string, container: HTMLDivElement, ctrl: any, data: gf.TFlowchartData) {
    GFGlobal.log.info(`flowchart[${name}].constructor()`);
    // GFGlobal.log.debug(`flowchart[${name}].constructor() data`, data);
    this.data = data;
    this.data.name = name;
    this.container = container;
    this.templateSrv = ctrl.templateSrv;
  }

  /**
   * Import data object in current flowchart
   *
   * @param {Object} obj
   * @memberof Flowchart
   */
  import(obj: any): this {
    GFGlobal.log.info(`flowchart[${this.data.name}].import()`);
    // GFGlobal.log.debug(`flowchart[${this.data.name}].import() obj`, obj);
    if (!!obj.download || this.data.download === false) {
      this.data.download = obj.download;
    }
    // 0.3.0
    if (!!obj.source) {
      this.data.type = obj.source.type;
      this.data.xml = obj.source.xml.value;
      this.data.url = obj.source.url.value;
    }
    // 0.3.0
    if (!!obj.options) {
      this.data.zoom = obj.options.zoom;
      this.data.center = obj.options.center;
      this.data.scale = obj.options.scale;
      this.data.lock = obj.options.lock;
      this.data.allowDrawio = false;
      this.data.tooltip = obj.options.tooltip;
      this.data.grid = obj.options.grid;
      this.data.bgColor = obj.options.bgColor;
    }
    if (!!obj.type) {
      this.data.type = obj.type;
    }
    if (!!obj.xml) {
      this.data.xml = obj.xml;
    }
    if (!!obj.url) {
      this.data.url = obj.url;
    }
    if (!!obj.zoom) {
      this.data.zoom = obj.zoom;
    }
    if (!!obj.center || obj.center === false) {
      this.data.center = obj.center;
    }
    if (!!obj.scale || obj.scale === false) {
      this.data.scale = obj.scale;
    }

    if (!!obj.lock || obj.lock === false) {
      this.data.lock = obj.lock;
    }
    if (!!obj.allowDrawio || obj.allowDrawio === false) {
      this.data.allowDrawio = obj.allowDrawio;
    }
    if (!!obj.enableAnim || obj.enableAnim === false) {
      this.data.enableAnim = obj.enableAnim;
    }
    if (!!obj.tooltip) {
      this.data.tooltip = obj.tooltip;
    }
    if (!!obj.grid || obj.grid === false) {
      this.data.grid = obj.grid;
    }
    if (!!obj.bgColor) {
      this.data.bgColor = obj.bgColor;
    }
    if (!!obj.editorUrl) {
      this.data.editorUrl = obj.editorUrl;
    }
    if (!!obj.editorTheme) {
      this.data.editorTheme = obj.editorTheme;
    }
    this.init();
    return this;
  }

  /**
   * Return the default XML when new
   *
   * @static
   * @returns {gf.TFlowchartData}
   * @memberof Flowchart
   */
  static getDefaultData(): gf.TFlowchartData {
    return {
      name: 'name',
      xml: FlowchartHandler.getDefaultGraph(),
      csv: '',
      download: false,
      type: 'xml',
      url: 'http://<YourUrl>/<Your XML/drawio file/api>',
      zoom: '100%',
      center: true,
      scale: true,
      lock: true,
      allowDrawio: false,
      enableAnim: true,
      tooltip: true,
      grid: false,
      bgColor: null,
      editorUrl: 'https://www.draw.io',
      editorTheme: 'dark',
    };
  }

  /**
   * Return data without functions to save json in grafana
   *
   * @returns {Object} Data object
   * @memberof Flowchart
   */
  getData(): gf.TFlowchartData {
    return this.data;
  }

  /**
   * Update states of flowchart/graph
   *
   * @param {*} rules
   * @returns {this}
   * @memberof Flowchart
   */
  updateStates(rules: Rule[]): this {
    rules.forEach(rule => {
      if (this.stateHandler !== undefined) {
        rule.states = this.stateHandler.getStatesForRule(rule);
        if (rule.states) {
          rule.states.forEach((state: any) => {
            state.unsetState();
          });
        } else {
          GFGlobal.log.warn('States not defined for this rule');
        }
      } else {
        GFGlobal.log.error('updateStates => this.stateHandler undefined');
      }
    });
    return this;
  }

  /**
   * Initialisation of flowchart class
   *
   * @return {this}
   * @memberof Flowchart
   */
  init(): this {
    GFGlobal.log.info(`flowchart[${this.data.name}].init()`);
    try {
      if (this.xgraph === undefined) {
        this.xgraph = new XGraph(this.container, this.data.type, this.getContent());
      }
      if (this.data.xml !== undefined && this.data.xml !== null) {
        if (this.data.download) {
          this.xgraph.setXmlGraph(this.getContent());
        }
        if (this.data.allowDrawio) {
          this.xgraph.allowDrawio(true);
        } else {
          this.xgraph.allowDrawio(false);
        }
        if (this.data.enableAnim) {
          this.xgraph.enableAnim(true);
        } else {
          this.xgraph.enableAnim(false);
        }
        this.setOptions();
        this.xgraph.drawGraph();
        if (this.data.tooltip) {
          this.xgraph.tooltipGraph(true);
        }
        if (this.data.scale) {
          this.xgraph.scaleGraph(true);
        } else {
          this.xgraph.zoomGraph(this.data.zoom);
        }
        if (this.data.center) {
          this.xgraph.centerGraph(true);
        }
        if (this.data.lock) {
          this.xgraph.lockGraph(true);
        }
        this.stateHandler = new StateHandler(this.xgraph);
      } else {
        GFGlobal.log.error('XML Graph not defined');
      }
    } catch (error) {
      GFGlobal.log.error('Unable to initialize graph', error);
    }
    return this;
  }

  /**
   * Get states handler
   *
   * @returns
   * @memberof Flowchart
   */
  getStateHandler() {
    return this.stateHandler;
  }

  /**
   * Get XGraph
   *
   * @returns
   * @memberof Flowchart
   */
  getXGraph() {
    return this.xgraph;
  }

  /**
   * Init states with rules and metrics
   *
   * @param {Rule[]} rules
   * @param {Metric[]} metrics
   * @memberof Flowchart
   */
  setStates(rules: Rule[], metrics: Metric[]): this {
    GFGlobal.log.info(`flowchart[${this.data.name}].setStates()`);
    if (rules === undefined) {
      GFGlobal.log.warn("Rules shoudn't be null");
    }
    if (metrics === undefined) {
      GFGlobal.log.warn("Metrics shoudn't be null");
    }
    if (this.stateHandler) {
      this.stateHandler.setStates(rules, metrics);
    }
    return this;
  }

  /**
   * Init options of graph
   *
   * @memberof Flowchart
   */
  setOptions(): this {
    this.setScale(this.data.scale);
    this.setCenter(this.data.center);
    this.setGrid(this.data.grid);
    this.setTooltip(this.data.tooltip);
    this.setLock(this.data.lock);
    this.setZoom(this.data.zoom);
    this.setBgColor(this.data.bgColor);
    return this;
  }

  /**
   * Apply new states (colors,text ...)
   *
   * @memberof Flowchart
   */
  applyStates(): this {
    GFGlobal.log.info(`flowchart[${this.data.name}].applyStates()`);
    if (this.stateHandler) {
      this.stateHandler.applyStates();
    }
    return this;
  }

  /**
   * Apply options
   *
   * @memberof Flowchart
   */
  applyOptions() {
    GFGlobal.log.info(`flowchart[${this.data.name}].refresh()`);
    if (this.xgraph) {
      this.xgraph.applyGraph();
    }
  }

  /**
   * Refresh graph
   *
   * @memberof Flowchart
   */
  refresh() {
    if (this.xgraph) {
      this.xgraph.refresh();
    }
  }

  /**
   * Reset and redraw graph when source changed
   *
   * @param {*} xmlGraph
   * @memberof Flowchart
   */
  redraw(xmlGraph?: string) {
    GFGlobal.log.info(`flowchart[${this.data.name}].redraw()`);
    if (xmlGraph !== undefined) {
      this.data.xml = xmlGraph;
      if (this.xgraph) {
        this.xgraph.setXmlGraph(this.getXml(true));
      }
    } else {
      GFGlobal.log.warn('XML Content not defined');
      if (this.xgraph) {
        this.xgraph.setXmlGraph(this.getXml(true));
      }
    }
    this.applyOptions();
  }

  /**
   * Reload source of graph
   *
   * @memberof Flowchart
   */
  reload() {
    GFGlobal.log.info(`flowchart[${this.data.name}].reload()`);
    if (this.xgraph !== undefined && this.xgraph !== null) {
      this.xgraph.destroyGraph();
      this.xgraph = undefined;
      this.init();
    } else {
      this.init();
    }
  }

  /**
   * Set paramater lock
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  setLock(bool: boolean): this {
    this.data.lock = bool;
    if (this.xgraph) {
      this.xgraph.lock = bool;
    }
    return this;
  }

  /**
   * Lock graph
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  applyLock(bool: boolean): this {
    if (bool !== undefined) {
      this.data.lock = bool;
    }
    if (this.xgraph) {
      this.xgraph.lockGraph(this.data.lock);
    }
    return this;
  }

  /**
   * Set enable tooltip
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  setTooltip(bool: boolean): this {
    this.data.tooltip = bool;
    if (this.xgraph) {
      this.xgraph.tooltip = bool;
    }
    return this;
  }

  /**
   * Enable tooltip
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  applyTooltip(bool: boolean): this {
    if (bool !== undefined) {
      this.data.tooltip = bool;
    }
    if (this.xgraph) {
      this.xgraph.tooltipGraph(this.data.tooltip);
    }
    return this;
  }

  /**
   * Set scale parameter
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  setScale(bool: boolean): this {
    this.data.scale = bool;
    if (this.xgraph) {
      this.xgraph.scale = bool;
    }
    return this;
  }

  /**
   * Set BgColor
   *
   * @param {(string | null)} bgColor
   * @returns {this}
   * @memberof Flowchart
   */
  setBgColor(bgColor: string | null): this {
    this.data.bgColor = bgColor;
    if (this.xgraph) {
      this.xgraph.bgColor = bgColor;
    }
    return this;
  }

  /**
   * Apply Background color
   *
   * @param {string} bgColor
   * @returns {this}
   * @memberof Flowchart
   */
  ApplyBgColor(bgColor: string): this {
    this.data.bgColor = bgColor;
    if (bgColor) {
      if (this.xgraph) {
        this.xgraph.bgGraph(bgColor);
      }
    }
    return this;
  }

  /**
   * Apply scale parameter
   *
   * @param {boolean} bool
   * @returns {this}
   * @memberof Flowchart
   */
  applyScale(bool: boolean): this {
    GFGlobal.log.info('Flowchart.scale()');
    if (bool !== undefined) {
      this.data.scale = bool;
    }
    if (this.xgraph) {
      this.xgraph.scaleGraph(this.data.scale);
    }
    return this;
  }

  /**
   * set center parameter
   *
   * @param {boolean} bool
   * @returns
   * @memberof Flowchart
   */
  setCenter(bool: boolean) {
    this.data.center = bool;
    if (this.xgraph) {
      this.xgraph.center = bool;
    }
    return this;
  }

  /**
   * Get names array of names according id or value
   *
   * @param {gf.TPropertieKey} prop
   * @returns {string[]}
   * @memberof Flowchart
   */
  getNamesByProp(prop: gf.TPropertieKey): string[] {
    if (this.xgraph) {
      return this.xgraph.getOrignalCells(prop);
    }
    return [];
  }

  /**
   * get XML def with var replaced
   *
   * @param {boolean} replaceVarBool
   * @returns {string}
   * @memberof Flowchart
   */
  getXml(replaceVarBool: boolean): string {
    GFGlobal.log.info(`flowchart[${this.data.name}].getXml()`);
    if (!replaceVarBool) {
      return this.data.xml;
    }
    return this.templateSrv.replaceWithText(this.data.xml);
  }

  /**
   * get CSV def with var replaced
   *
   * @param {boolean} replaceVarBool
   * @returns {string}
   * @memberof Flowchart
   */
  getCsv(replaceVarBool: boolean): string {
    GFGlobal.log.info(`flowchart[${this.data.name}].getXml()`);
    if (!replaceVarBool) {
      return this.data.csv;
    }
    return this.templateSrv.replaceWithText(this.data.csv);
  }

  /**
   * Get Url editor
   *
   * @returns {string}
   * @memberof Flowchart
   */
  getUrlEditor(): string {
    return this.data.editorUrl;
  }

  getThemeEditor(): string {
    return this.data.editorTheme;
  }

  /**
   * Get Source of graph (csv|xml) or get content from url
   *
   * @returns
   * @memberof Flowchart
   */
  getContent(): string {
    GFGlobal.log.info(`flowchart[${this.data.name}].getContent()`);
    if (this.data.download) {
      const url = this.templateSrv.replaceWithText(this.data.url);
      const content = this.loadContent(url);
      if (content !== null) {
        return content;
      } else {
        return '';
      }
    } else {
      if (this.data.type === 'xml') {
        return this.getXml(true);
      }
      if (this.data.type === 'csv') {
        return this.getCsv(true);
      }
    }
    GFGlobal.log.error('type unknow', this.data.type);
    return '';
  }

  /**
   * Load source from url
   *
   * @param {*} url
   * @returns
   * @memberof Flowchart
   */
  loadContent(url: string): string | null {
    return XGraph.loadXml(url);
  }

  renameId(oldId: string, newId: string): this {
    if (this.xgraph) {
      this.xgraph.renameId(oldId, newId);
    }
    return this;
  }

  /**
   * Apply xml to graph
   *
   * @returns {this}
   * @memberof Flowchart
   */
  applyModel(): this {
    if (this.xgraph) {
      this.data.xml = this.xgraph.getXmlModel();
    }
    this.redraw(this.data.xml);
    return this;
  }

  center(bool: boolean): this {
    if (bool !== undefined) {
      this.data.center = bool;
    }
    if (this.xgraph) {
      this.xgraph.centerGraph(this.data.center);
    }
    return this;
  }

  setZoom(percent: string): this {
    this.data.zoom = percent;
    if (this.xgraph) {
      this.xgraph.zoomPercent = percent;
    }
    return this;
  }

  zoom(percent: string): this {
    if (percent !== undefined) {
      this.data.zoom = percent;
    }
    if (this.xgraph) {
      this.xgraph.zoomGraph(this.data.zoom);
    }
    return this;
  }

  setGrid(bool: boolean): this {
    this.data.grid = bool;
    if (this.xgraph) {
      this.xgraph.grid = bool;
    }
    return this;
  }

  grid(bool: boolean): this {
    if (bool !== undefined) {
      this.data.grid = bool;
    }
    if (this.xgraph) {
      this.xgraph.gridGraph(this.data.grid);
    }
    return this;
  }

  setXml(xml: string): this {
    this.data.xml = xml;
    return this;
  }

  minify() {
    this.data.xml = GFP.utils.minify(this.data.xml);
  }

  prettify() {
    this.data.xml = GFP.utils.prettify(this.data.xml);
  }

  decode() {
    if (GFP.utils.isencoded(this.data.xml)) {
      this.data.xml = GFP.utils.decode(this.data.xml, true, true, true);
      // this.data.xml = XGraph.decompress(this.data.xml);
    }
  }

  encode() {
    if (!GFP.utils.isencoded(this.data.xml)) {
      this.data.xml = GFP.utils.encode(this.data.xml, true, true, true);
      // this.data.xml = XGraph.compress(this.data.xml);
    }
  }

  getContainer(): HTMLDivElement {
    return this.container;
  }

  setMap(onMappingObj: gf.TIOnMappingObj) {
    GFGlobal.log.info(`flowchart[${this.data.name}].setMap()`);
    const container = this.getContainer();
    if (this.xgraph) {
      this.xgraph.setMap(onMappingObj);
    }
    container.scrollIntoView();
    container.focus();
  }

  unsetMap() {
    if (this.xgraph) {
      this.xgraph.unsetMap();
    }
  }
}
