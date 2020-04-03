import Flowchart from './flowchart_class';
import Rule, { GFMap } from './rule_class';
import _ from 'lodash';
import Metric from './metric_class';

/**
 * Class FlowchartHandler
 */
export default class FlowchartHandler {
  $scope: ng.IScope;
  $elem: any; //TODO: elem ?
  ctrl: any; //TODO: ctrl ?
  flowcharts: Flowchart[] = [];
  currentFlowchart = 'Main'; // name of current Flowchart
  data: gf.TFlowchartHandlerData;
  firstLoad = true; // First load
  changeSourceFlag = false; // Source changed
  changeOptionFlag = true; // Options changed
  changeDataFlag = false; // Data changed
  changeRuleFlag = false; // rules changed
  static defaultXml: string;
  onMapping: gf.TIOnMappingObj = {
    active: false,
    object: null,
    id: null,
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
    GFP.log.info('FlowchartHandler.constructor()');
    // GFP.log.debug('FlowchartHandler.constructor() data', data);
    FlowchartHandler.getDefaultGraph();
    this.$scope = $scope;
    this.$elem = elem.find('.flowchart-panel__chart');
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
    GFP.log.info('FlowchartHandler.import()');
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
        const container = this.createContainer();
        const newData = Flowchart.getDefaultData();
        const fc = new Flowchart(fcData.name, container, this.ctrl, newData);
        fc.import(fcData);
        this.flowcharts.push(fc);
        this.data.flowcharts.push(newData);
      });
    }
    return this;
  }

  /**
   * Return default xml source graph
   *
   * @static
   * @returns {string}
   * @memberof FlowchartHandler
   */
  static getDefaultGraph(): string {
    const result = FlowchartHandler.defaultXml;
    if (!result) {
      const url = `${GFP.getStaticPath()}/defaultGraph.drawio`;
      $.ajax({
        type: 'GET',
        url: url,
        async: false,
        success: data => {
          FlowchartHandler.defaultXml = data;
        },
        error: () => {
          alert('Error when download ' + url);
        },
      });
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
    //TODO: Convert to createDocument
    const $container: any = $(`<div id="flowchart_${GFP.utils.uniqueID()}" style="margin:auto;position:relative,width:100%;height:100%"></div>`);
    this.$elem.html($container);
    return $container[0];
  }

  /**
   * Add a flowchart
   *
   * @param {string} name
   * @returns {Flowchart}
   * @memberof FlowchartHandler
   */
  addFlowchart(name: string): Flowchart {
    GFP.log.info('FlowchartHandler.addFlowchart()');
    const container = this.createContainer();
    const data = Flowchart.getDefaultData();
    const flowchart = new Flowchart(name, container, this.ctrl, data);
    flowchart.init();
    this.data.flowcharts.push(data);
    this.flowcharts.push(flowchart);
    return flowchart;
  }

  /**
   * Render for draw
   *
   * @memberof FlowchartHandler
   */
  async render() {
    // not repeat render if mouse down
    const id = GFP.utils.uniqueID();
    GFP.perf.start('PERF : Render ' + id);
    if (!this.mousedown) {
      let optionsFlag = true;
      const self = this;
      // SOURCE
      if (self.changeSourceFlag) {
        self.load();
        self.changeSourceFlag = false;
        self.changeRuleFlag = true;
        optionsFlag = true;
      }
      // OPTIONS
      if (self.changeOptionFlag) {
        self.setOptions();
        self.changeOptionFlag = false;
        optionsFlag = true;
      }
      // RULES or DATAS
      if (self.changeRuleFlag || self.changeDataFlag) {
        const rules = self.ctrl.rulesHandler.getRules();
        const metrics = self.ctrl.metricHandler.getMetrics();

        // Change to async to optimize
        self.async_refreshStates(rules, metrics);
        self.changeDataFlag = false;
        optionsFlag = false;
      }
      // OTHER : Resize, OnLoad
      if (optionsFlag || self.firstLoad) {
        self.applyOptions();
        optionsFlag = false;
        self.firstLoad = false;
      }
      // this.refresh();
    }
    // await GFP.utils.sleep(1000);
    this.ctrl.renderingCompleted();
    GFP.perf.stop('PERF : Render ' + id);
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
   * Apply options on graphs
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  applyOptions(): this {
    GFP.log.info(`FlowchartHandler.applyOptions()`);
    this.flowcharts.forEach(flowchart => {
      flowchart.applyOptions();
    });
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
    this.refreshStates(rules, metrics);
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
    GFP.perf.start(`${this.constructor.name}.refreshStates()`);
    if (this.changeRuleFlag) {
      this.updateStates(rules);
      this.changeRuleFlag = false;
    }
    this.setStates(rules, metrics);
    this.applyStates();
    GFP.perf.stop(`${this.constructor.name}.refreshStates()`);
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
    GFP.perf.start(`${this.constructor.name}.setStates()`);
    this.flowcharts.forEach(flowchart => {
      flowchart.setStates(rules, metrics);
    });
    GFP.perf.stop(`${this.constructor.name}.setStates()`);
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
    GFP.perf.start(`${this.constructor.name}.updateStates()`);
    this.flowcharts.forEach(flowchart => {
      flowchart.updateStates(rules);
    });
    GFP.perf.stop(`${this.constructor.name}.updateStates()`);
    return this;
  }

  /**
   * Apply state of cell after setStates
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  applyStates(): this {
    GFP.perf.start(`${this.constructor.name}.applyStates()`);
    new Promise(() => {
      this.flowcharts.forEach(flowchart => {
        flowchart.applyStates();
      });
    }).then(() => {
      this.refresh();
    });
    GFP.perf.stop(`${this.constructor.name}.applyStates()`);
    return this;
  }

  /**
   * Set and apply options
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  setOptions(): this {
    this.flowcharts.forEach(flowchart => {
      flowchart.setOptions();
    });
    return this;
  }

  /**
   * (re)draw graph
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  draw(): this {
    GFP.log.info(`FlowchartHandler.draw()`);
    this.flowcharts.forEach(flowchart => {
      flowchart.redraw();
    });
    return this;
  }

  /**
   * (re)load graph
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  load(): this {
    GFP.log.info(`FlowchartHandler.load()`);
    this.flowcharts.forEach(flowchart => {
      flowchart.reload();
    });
    return this;
  }

  /**
   * Active option link/map
   *
   * @param {Object} objToMap
   * @memberof FlowchartHandler
   */
  setMap(objToMap: GFMap): this {
    const flowchart = this.getFlowchart(this.currentFlowchart);
    this.onMapping.active = true;
    this.onMapping.object = objToMap;
    this.onMapping.id = objToMap.getId();
    this.onMapping.$scope = this.$scope;
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
    this.onMapping.id = '';
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
    const urlParams = `${urlEditor}?embed=1&spin=1&libraries=1&ui=${theme}`;
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
