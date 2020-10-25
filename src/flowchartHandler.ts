import { Flowchart } from 'flowchart_class';
import { Rule, GFMap } from 'rule_class';
import _ from 'lodash';
import { Metric } from './metric_class';
import { $GF } from 'globals_class';
import { FlowchartCtrl } from './flowchart_ctrl';

/**
 * Class FlowchartHandler
 */
export class FlowchartHandler {
  $scope: ng.IScope;
  $elem: any; //TODO: elem ?
  parentDiv: HTMLDivElement;
  ctrl: FlowchartCtrl; //TODO: ctrl ?
  flowcharts: Flowchart[] = [];
  currentFlowchart = 'Main'; // name of current Flowchart
  data: gf.TFlowchartHandlerData;
  firstLoad = true; // First load
  changeSourceFlag = false; // Source changed
  changeOptionFlag = true; // Options changed
  changeDataFlag = false; // Data changed
  changeGraphHoverFlag = false; // Graph Hover
  changeRuleFlag = false; // rules changed
  static defaultXml: string;
  static defaultCsv: string;
  onMapping: gf.TIOnMappingObj = {
    active: false,
    object: null,
    value: null,
    prop: 'id',
    $scope: null,
  };
  mousedownTimeout = 0;
  mousedown = 0;
  onEdit = false; // editor open or not
  editorWindow: Window | null = null; // Window draw.io editor

  /**
   * Creates an instance of FlowchartHandler to handle flowchart
   * @param {ng.IScope} $scope - angular scope
   * @param {any} elem - angular elem
   * @param {TODO:FlowchartCtrl} ctrl - ctrlPanel
   * @param {*} data - Empty data to store
   * @memberof FlowchartHandler
   */
  constructor($scope: ng.IScope, elem: any, ctrl: any, data: gf.TFlowchartHandlerData) {
    FlowchartHandler.getDefaultDioGraph();
    this.$scope = $scope;
    this.$elem = elem.find('.flowchart-panel__chart');
    this.parentDiv = this.$elem[0];
    this.ctrl = ctrl;
    this.data = data;

    // Events Render
    ctrl.events.on('render', () => {
      this.render();
    });

    document.body.onmousedown = () => {
      this.mousedown = 0;
      window.clearInterval(this.mousedownTimeout);
      this.mousedownTimeout = window.setInterval(() => {
        this.mousedown += 1;
      }, 200);
    };

    document.body.onmouseup = () => {
      this.mousedown = 0;
      window.clearInterval(this.mousedownTimeout);
    };
  }

  static getDefaultData(): gf.TFlowchartHandlerData {
    return {
      flowcharts: [],
    };
  }

  /**
   * import data into
   *
   * @returns {this}
   * @param {Object} obj
   * @memberof FlowchartHandler
   */
  import(obj: any): this {
    $GF.log.info('FlowchartHandler.import()');
    this.flowcharts = [];
    if (obj !== undefined && obj !== null) {
      // For version 0.5.0 and under
      let tmpFc: gf.TFlowchartData[];
      if (Array.isArray(obj)) {
        tmpFc = obj;
      } else {
        tmpFc = obj.flowcharts;
      }
      // import data
      tmpFc.forEach((fcData: gf.TFlowchartData) => {
        this.addFlowchart(fcData.name).import(fcData);
      });
    }
    return this;
  }

  /**
   * Reset/empty flowcharts, rules and children
   *
   * @returns {this}
   * @param {Object} obj
   * @memberof FlowchartHandler
   */
  clear(): this {
    this.flowcharts.forEach((fc: Flowchart) => {
      fc.clear();
    });
    this.flowcharts = [];
    this.data.flowcharts = [];
    return this;
  }

  /**
   * Return default xml source graph
   *
   * @static
   * @returns {string}
   * @memberof FlowchartHandler
   */
  static getDefaultDioGraph(): string {
    let result = FlowchartHandler.defaultXml;
    if (!result) {
      const url = `${$GF.plugin.getRootPath()}${$GF.CONSTANTS.CONF_FILE_DEFAULTDIO}`;
      result = $GF.utils.$loadFile(url);
      // $.ajax({
      //   type: 'GET',
      //   url: url,
      //   async: false,
      //   success: data => {
      //     FlowchartHandler.defaultXml = data;
      //     result = data;
      //   },
      //   error: () => {
      //     alert('Error when download ' + url);
      //   },
      // });
    }
    return result;
  }

  /**
   * Return default xml source graph
   *
   * @static
   * @returns {string}
   * @memberof FlowchartHandler
   */
  static getDefaultCsvGraph(): string {
    let result = FlowchartHandler.defaultCsv;
    if (!result) {
      const url = `${$GF.plugin.getRootPath()}${$GF.CONSTANTS.CONF_FILE_DEFAULTCSV}`;
      result = $GF.utils.$loadFile(url);
      // $.ajax({
      //   type: 'GET',
      //   url: url,
      //   async: false,
      //   success: data => {
      //     FlowchartHandler.defaultCsv = data;
      //     result = data;
      //   },
      //   error: () => {
      //     alert('Error when download ' + url);
      //   },
      // });
    }
    return result;
  }

  /**
   * Get flowchart with name
   *
   * @param {string} name
   * @returns {Flowchart}
   * @memberof FlowchartHandler
   */
  getFlowchart(name?: string): Flowchart {
    //TODO: When multi flowchart
    return this.flowcharts[0];
  }

  /**
   * Return array of flowchart
   *
   * @returns {Flowchart[]} Array of flowchart
   * @memberof FlowchartHandler
   */
  getFlowcharts(): Flowchart[] {
    return this.flowcharts;
  }

  /**
   * Return number of flowchart
   *
   * @returns {number} Nulber of flowchart
   * @memberof FlowchartHandler
   */
  countFlowcharts(): number {
    if (this.flowcharts !== undefined && Array.isArray(this.flowcharts)) {
      return this.flowcharts.length;
    }
    return 0;
  }

  /**
   * Create a div container for graph
   *
   * @returns {HTMLDivElement}
   * @memberof FlowchartHandler
   */
  createContainer(): HTMLDivElement {
    const div = document.createElement('div');
    div.style.margin = 'auto';
    div.style.position = 'relative';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.touchAction = 'none';
    div.style.border = 'none';
    div.style.cursor = 'default';
    div.style.right = '0px';
    div.style.left = '0px';
    div.style.bottom = '0px';
    div.style.top = '0px';
    // div.style.overflow = 'none';
    this.parentDiv.appendChild(div);
    return div;

    // const $container: any = $(`<div class="geDiagramContainer" id="flowchart_${$GF.utils.uniqueID()}" style="right: 0px; border: none; left: 0px; top: 0px; bottom: 0px; touch-action: none; cursor: default; overflow: auto;"></div>`);
    // const $container: any = $(`<div class="geDiagramContainer" id="flowchart_${$GF.utils.uniqueID()}" style="margin: auto; position: relative; width: 100%; height: 100%; touch-action: none;border: none;cursor: default"></div>`);
    // GOOD : const $container: any = $(`<div class="geDiagramContainer" id="flowchart_${$GF.utils.uniqueID()}" style="margin:auto;position:relative;width:100%;height:100%" style="right: 0px; border: none; left: 0px; top: 0px; bottom: 0px; touch-action: none; cursor: default; overflow: auto;"></div>`);
    // const $container: any = $(`<div class="geDiagramContainer" id="flowchart_${$GF.utils.uniqueID()}" tabindex="0" style="right: 0px; border: none; left: 0px; top: 0px; bottom: 0px; touch-action: none; overflow: auto; cursor: default;">`);
    // this.$elem.html($container);
    // return $container[0];
  }

  /**
   * Add a flowchart
   *
   * @param {string} name
   * @returns {Flowchart}
   * @memberof FlowchartHandler
   */
  addFlowchart(name: string): Flowchart {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addFlowchart()');
    const container = this.createContainer();
    const data = Flowchart.getDefaultData();
    const flowchart = new Flowchart(name, container, this.ctrl, data);
    // flowchart.init();
    this.data.flowcharts.push(data);
    this.flowcharts.push(flowchart);
    trc.after();
    return flowchart;
  }

  /**
   * Render for draw
   *
   * @memberof FlowchartHandler
   */
  async render() {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'render()');
    // not repeat render if mouse down
    if (!this.mousedown) {
      let optionsFlag = true;
      const self = this;

      // SOURCE
      if (self.changeSourceFlag) {
        self.load();
        self.changeSourceFlag = false;
        self.changeRuleFlag = true;
        optionsFlag = true;
        // this.ctrl.editModeFalse();
      }
      // OPTIONS
      if (self.changeOptionFlag) {
        self.setOptions();
        self.changeOptionFlag = false;
        optionsFlag = true;
      }
      // RULES or DATAS
      if (self.changeRuleFlag || self.changeDataFlag || self.changeGraphHoverFlag) {
        if (self.ctrl.rulesHandler && self.ctrl.metricHandler) {
          const rules = self.ctrl.rulesHandler.getRules();
          const metrics = self.ctrl.metricHandler.getMetrics();
          // Change to async to optimize
          self.async_refreshStates(rules, metrics);
        }
        self.changeDataFlag = false;
        optionsFlag = false;
        self.changeGraphHoverFlag = false;
      }
      // OTHER : Resize, OnLoad
      if (optionsFlag || self.firstLoad) {
        self.applyOptions();
        optionsFlag = false;
        self.firstLoad = false;
      }
      // this.refresh();
    }
    this.ctrl.renderingCompleted();
    trc.after();
  }

  /**
   * Flag source change
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  sourceChanged(): this {
    this.changeSourceFlag = true;
    return this;
  }

  /**
   * Flag options change
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  optionChanged(): this {
    this.changeOptionFlag = true;
    return this;
  }

  /**
   * Flag rule change
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  ruleChanged(): this {
    this.changeRuleFlag = true;
    return this;
  }

  /**
   * Flag data change
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  dataChanged(): this {
    this.changeDataFlag = true;
    return this;
  }

  /**
   * Flag data Graph-Hover change
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  graphHoverChanged(): this {
    this.changeGraphHoverFlag = true;
    return this;
  }

  /**
   * Apply options on graphs
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  applyOptions(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'applyOptions()');
    this.flowcharts.forEach(flowchart => {
      flowchart.applyOptions();
    });
    trc.after();
    return this;
  }

  /**
   * Call refreshStates asynchronously
   *
   * @param {Rule[]} rules
   * @param {Metric[]} metrics
   * @memberof FlowchartHandler
   */
  async_refreshStates(rules: Rule[], metrics: Metric[]) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'async_refreshStates()');
    this.refreshStates(rules, metrics);
    trc.after();
  }

  /**
   * Refresh rules according new rules or data
   *
   * @param {Rule[]} rules
   * @param {Metric[]} metrics
   * @returns {this}
   * @memberof FlowchartHandler
   */
  refreshStates(rules: Rule[], metrics: Metric[]): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'refreshStates()');
    if (this.changeRuleFlag) {
      this.updateStates(rules);
      this.changeRuleFlag = false;
    }
    this.setStates(rules, metrics);
    this.applyStates();
    trc.after();
    return this;
  }

  /**
   * Refresh all flowchart
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  refresh(): this {
    this.flowcharts.forEach(flowchart => {
      flowchart.refresh();
    });
    return this;
  }

  /**
   * Change states of cell according to rules and metrics
   *
   * @param {Rule[]} rules
   * @param {any[]} metrics
   * @returns {this}
   * @memberof FlowchartHandler
   */
  setStates(rules: Rule[], metrics: any[]): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setStates()');
    this.flowcharts.forEach(flowchart => {
      flowchart.setStates(rules, metrics);
    });
    trc.after();
    return this;
  }

  /**
   * Update states with rule
   *
   * @param {Rule[]} rules
   * @returns {this}
   * @memberof FlowchartHandler
   */
  updateStates(rules: Rule[]): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'updateStates()');
    this.flowcharts.forEach(flowchart => {
      flowchart.updateStates(rules);
    });
    trc.after();
    return this;
  }

  /**
   * Apply state of cell after setStates
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  applyStates(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'applyStates()');
    new Promise(() => {
      this.flowcharts.forEach(flowchart => {
        flowchart.applyStates();
      });
    }).then(() => {
      this.refresh();
    });
    trc.after();
    return this;
  }

  /**
   * Set and apply options
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  setOptions(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setOptions()');
    this.flowcharts.forEach(flowchart => {
      flowchart.setOptions();
    });
    trc.after();
    return this;
  }

  /**
   * (re)draw graph
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  draw(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'draw()');
    this.flowcharts.forEach(flowchart => {
      flowchart.redraw();
    });
    trc.after();
    return this;
  }

  /**
   * (re)load graph
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  load(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'draw()');
    this.flowcharts.forEach(flowchart => {
      flowchart.reload();
    });
    trc.after();
    return this;
  }

  /**
   * Active option link/map
   *
   * @param {Object} objToMap
   * @memberof FlowchartHandler
   */
  setMap(objToMap: GFMap, prop: gf.TPropertieKey = 'id'): this {
    const flowchart = this.getFlowchart(this.currentFlowchart);
    this.onMapping.active = true;
    this.onMapping.object = objToMap;
    this.onMapping.value = objToMap.getId();
    this.onMapping.$scope = this.$scope;
    this.onMapping.prop = prop;
    flowchart.setMap(this.onMapping);
    return this;
  }

  /**
   * Desactivate option
   *
   * @memberof FlowchartHandler
   */
  unsetMap(): this {
    const flowchart = this.getFlowchart(this.currentFlowchart);
    this.onMapping.active = false;
    this.onMapping.object = undefined;
    this.onMapping.value = '';
    flowchart.unsetMap();
    return this;
  }

  /**
   * Return true if mapping object is active
   *
   * @param {properties} objToMap
   * @returns true - true if mapping mode
   * @memberof FlowchartHandler
   */
  isMapping(objToMap: GFMap): boolean {
    if (objToMap === undefined || objToMap == null) {
      return this.onMapping.active;
    }
    if (this.onMapping.active === true && objToMap === this.onMapping.object) {
      return true;
    }
    return false;
  }

  /**
   * Wait for draw.io answer
   *
   * @private
   * @param {MessageEvent} event
   * @memberof FlowchartHandler
   */
  listenMessage(event: any) {
    if (event.data === 'ready') {
      // send xml
      // if (event.source) {
      //   if (!(event.source instanceof MessagePort) && !(event.source instanceof ServiceWorker)) {
      event.source.postMessage(this.getFlowchart(this.currentFlowchart).data.xml, event.origin);
      //   }
      // }
    } else {
      if (this.onEdit && event.data !== undefined && event.data.length > 0) {
        this.getFlowchart(this.currentFlowchart).redraw(event.data);
        this.sourceChanged();
        this.$scope.$apply();
        this.render();
      }
      if ((this.onEdit && event.data !== undefined) || event.data.length === 0) {
        if (this.editorWindow) {
          this.editorWindow.close();
        }
        this.onEdit = false;
        window.removeEventListener('message', this.listenMessage.bind(this), false);
      }
    }
  }

  /**
   * Open graph in draw.io
   *
   * @memberof FlowchartHandler
   */
  openDrawEditor(name?: string) {
    const urlEditor = this.getFlowchart(name).getUrlEditor();
    const theme = this.getFlowchart(name).getThemeEditor();
    const urlParams = `${urlEditor}?embed=1&spin=1&libraries=1&ui=${theme}&src=grafana`;
    this.editorWindow = window.open(urlParams, 'MxGraph Editor', 'width=1280, height=720');
    this.onEdit = true;
    window.addEventListener('message', this.listenMessage.bind(this), false);
  }

  /**
   * Get flowchart names
   *
   * @returns {string[]}
   * @memberof FlowchartHandler
   */
  getFlowchartNames(): string[] {
    return this.flowcharts.map(f => f.data.name);
  }
}
