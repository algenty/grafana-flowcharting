import { Flowchart } from 'flowchart_class';
import { $GF } from 'globals_class';
import { InteractiveMap, ObjectMap } from 'mapping_class';
import { GFEvents } from 'flowcharting_base';

const flowchartHandlerSignalsArray = ['flowchart_created', 'flowchart_deleted'] as const;
type FlowchartHandlerSignals = typeof flowchartHandlerSignalsArray[number];

/**
 * Class FlowchartHandler
 */
export class FlowchartHandler {
  _parentDiv: HTMLDivElement;
  flowcharts: Flowchart[] = [];
  currentFlowchartName = 'Main'; // name of current Flowchart
  currentFlowchart: Flowchart | undefined; // Current flowchart obj
  data: gf.TFlowchartHandlerData; // DATA panel
  firstLoad = true; // First load
  newMode = false; // Mode if new flowchart
  uid: string;
  sequenceNumber = 0; // Sequence Number for a name
  static defaultXml: string; // Default XML
  static defaultCsv: string; // Default CSV
  onMapping: InteractiveMap; // For link mapping, sharing
  mousedownTimeout = 0;
  mousedown = 0;
  onEdit = false; // editor open or not
  postedId: string | undefined = undefined; // Current ID on edit mode
  editorWindow: Window | null = null; // Window draw.io editor
  static events: GFEvents<FlowchartHandlerSignals> = GFEvents.create(flowchartHandlerSignalsArray);

  /**
   * Creates an instance of FlowchartHandler to handle flowchart
   * @param {ng.IScope} $scope - angular scope
   * @param {any} elem - angular elem
   * @param {TODO:FlowchartCtrl} ctrl - ctrlPanel
   * @param {*} data - Empty data to store
   * @memberof FlowchartHandler
   */
  constructor(data: gf.TFlowchartHandlerData) {
    FlowchartHandler.getDefaultDioGraph();
    this.uid = $GF.genUid(this.constructor.name);
    this._parentDiv = $GF.ctrl.flowchartsDiv;
    this.data = data;
    this.currentFlowchartName = 'Main';
    // TODO : Fix onMapping
    this.onMapping = $GF.ctrl.onMapping;

    // Events Render
    // this.ctrl.events.on('render', () => {
    //   this.render();
    // });

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
    this.init();
  }

  static getDefaultData(): gf.TFlowchartHandlerData {
    return {
      editorUrl: $GF.CONSTANTS.CONF_EDITOR_URL,
      editorTheme: $GF.CONSTANTS.CONF_EDITOR_THEME,
      flowcharts: [Flowchart.getDefaultData()],
      allowDrawio: true,
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
    // TODO : why free instead init
    this.free();
    if (obj !== undefined && obj !== null) {
      // For version 0.5.0 and under
      let tmpFc: any[];
      if (Array.isArray(obj)) {
        tmpFc = obj;
      } else {
        tmpFc = obj.flowcharts;
      }

      // For 0.9.0 and under
      if (tmpFc.length === 1) {
        this.currentFlowchartName = 'Main';
        if (tmpFc[0].editorTheme) {
          this.data.editorTheme = tmpFc[0].editorTheme;
        }
        if (tmpFc[0].editorUrl) {
          this.data.editorUrl = tmpFc[0].editorUrl;
        }
        if (tmpFc[0].allowDrawio || tmpFc[0].allowDrawio === false) {
          this.data.allowDrawio = tmpFc[0].allowDrawio;
        }
      }

      this.data.editorTheme = !!obj.editorTheme ? obj.editorTheme : this.data.editorTheme;
      this.data.editorUrl = !!obj.editorUrl ? obj.editorUrl : this.data.editorUrl;
      if (obj.allowDrawio || obj.allowDrawio === false) {
        this.data.allowDrawio = obj.allowDrawio;
      }

      // import data
      tmpFc.forEach((fcData: gf.TFlowchartData) => {
        this.addFlowchart(fcData.name, fcData, fcData)
          .toBack()
          .allowDrawio(this.data.allowDrawio);
      });
      this.currentFlowchart = this.getFlowchart('Main');
    }
    this.change();
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
    }
    return result;
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
  static getDefaultCsvGraph(): string {
    let result = FlowchartHandler.defaultCsv;
    if (!result) {
      const url = `${$GF.plugin.getRootPath()}${$GF.CONSTANTS.CONF_FILE_DEFAULTCSV}`;
      result = $GF.utils.$loadFile(url);
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
    if (name) {
      const lg = this.flowcharts.length;
      for (let i = 0; i < lg; i++) {
        const fc = this.flowcharts[i];
        if (fc.getName() === name) {
          return fc;
        }
      }
    }
    const current = this.getCurrentFlowchart();
    return current !== undefined ? current : this.flowcharts[0];
  }

  getFlowchartById(id: string): Flowchart | undefined {
    const fcs = this.getFlowcharts();
    for (let index = 0; index < fcs.length; index++) {
      const fc = fcs[index];
      if (fc.uid === id) {
        return fc;
      }
    }
    return undefined;
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
   * get a temp name
   *
   * @returns {string}
   * @memberof FlowchartHandler
   */
  getFlowchartTmpName(): string {
    if (this.sequenceNumber === 0) {
      this.sequenceNumber = this.countFlowcharts();
    }
    return `Flowchart-${this.sequenceNumber++}`;
  }

  isMultiFlowcharts(): boolean {
    return this.flowcharts.length > 1;
  }

  isCurrentfirst(): boolean {
    const index = this.getCurrentIndex();
    return index === 0;
  }

  isCurrentLast(): boolean {
    const index = this.getCurrentIndex();
    return index === this.flowcharts.length - 1;
  }

  getCurrentIndex(): number {
    if (this.currentFlowchart) {
      return this.flowcharts.indexOf(this.currentFlowchart);
    }
    return 0;
  }

  /**
   * Define current flowchart to display
   *
   * @param {string} name, Main if empty
   * @returns {(Flowchart|undefined)}
   * @memberof FlowchartHandler
   */
  setCurrentFlowchart(name?: string): Flowchart | undefined {
    if (name === undefined) {
      this.currentFlowchart = this.getFlowchart('Main');
      this.currentFlowchartName = this.currentFlowchart.getName();
      this.currentFlowchart.toFront();
      return this.currentFlowchart;
    }
    if (this.currentFlowchart === undefined) {
      this.currentFlowchart = this.getFlowchart(name);
      this.currentFlowchartName = this.currentFlowchart.getName();
      this.currentFlowchart.toFront();
      return this.currentFlowchart;
    }
    if (this.currentFlowchart.getName() !== name) {
      this.currentFlowchart.toBack();
    }
    this.currentFlowchart = this.getFlowchart(name);
    this.currentFlowchartName = name;
    this.currentFlowchart.toFront();
    return this.currentFlowchart;
  }

  setNextFlowchart() {
    const index = this.getCurrentIndex();
    if (index < this.flowcharts.length - 1) {
      const name = this.flowcharts[index + 1].getName();
      this.setCurrentFlowchart(name);
    }
  }

  setPreviousFlowchart() {
    const index = this.getCurrentIndex();
    if (index !== 0) {
      const name = this.flowcharts[index - 1].getName();
      this.setCurrentFlowchart(name);
    }
  }

  /**
   * get Current Flowchart
   *
   * @returns {(Flowchart|undefined)}
   * @memberof FlowchartHandler
   */
  getCurrentFlowchart(): Flowchart | undefined {
    return this.currentFlowchart;
  }

  /**
   * Give the name of current flowchart
   *
   * @returns {string}
   * @memberof FlowchartHandler
   */
  getCurrentFlowchartName(): string {
    const cf = this.getCurrentFlowchart();
    return cf !== undefined ? cf.getName() : 'Main';
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
    // div.style.position = 'relative';
    div.style.position = 'absolute';
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
    this._parentDiv.appendChild(div);
    return div;
  }

  /**
   * Add a flowchart
   *
   * @param {string} name
   * @returns {Flowchart}
   * @memberof FlowchartHandler
   */
  addFlowchart(name: string, data?: gf.TFlowchartData, previousData?: any): Flowchart {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addFlowchart()');
    data = data ? data : Flowchart.getDefaultData();
    const container = this.createContainer();
    const flowchart = new Flowchart(name, container, data, previousData);
    this.flowcharts.push(flowchart);
    this.data.flowcharts.push(data);
    trc.after();
    return flowchart;
  }

  /**
   * Remove a flowchart
   *
   * @param {string} name
   * @memberof FlowchartHandler
   */
  removeFlowchart(name: string) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'removeFlowchart()');
    const fc = this.getFlowchart(name);
    fc.free();
    const index = this.flowcharts.indexOf(fc);
    this.flowcharts.splice(index, 1);
    this.data.flowcharts.splice(index, 1);
    fc.clear();
    trc.after();
  }

  /**
   * Render for draw
   *
   * @memberof FlowchartHandler
   */
  async render(name?: string) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'render()');
    // not repeat render if mouse down
    if (!this.mousedown || this.firstLoad) {
      this.firstLoad = false;
      this.update();
      $GF.ctrl.renderingCompleted();
    }
    //TODO : Update only if mouse up
    // this.refresh();
    trc.after();
  }

  /**
   * Refresh all flowchart
   *
   * @returns {this}
   * @memberof FlowchartHandler
   */
  updateFlowchart(): this {
    this.flowcharts.forEach(f => f.update());
    return this;
  }

  updateMetrics(): this {
    // TODO : Fix it
    // this.ctrl.metricHandler?.update();
    return this;
  }

  updateRules(): this {
    // TODO : Fix it
    // this.ctrl.rulesHandler?.update();
    return this;
  }

  refreshStates(): this {
    this.flowcharts.forEach(f => f.getStateHandler()?.update());
    return this;
  }

  /**
   * Active option link/map
   *
   * @param {Object} objToMap
   * @memberof FlowchartHandler
   */
  setMap(objToMap: ObjectMap, options: gf.TRuleMapOptions): this {
    const flowchart = this.getFlowchart(this.currentFlowchartName);
    this.onMapping
      .setMap(objToMap)
      .setOptions(options)
      .setFocus(objToMap.uid);
    flowchart.setMap();
    return this;
  }

  setMaps(fn: CallableFunction): this {
    const flowchart = this.getFlowchart(this.currentFlowchartName);
    this.onMapping.callback = fn;
    flowchart.setMap();
    return this;
  }

  /**
   * Desactivate option
   *
   * @memberof FlowchartHandler
   */
  unsetMap(): this {
    const flowchart = this.getFlowchart(this.currentFlowchartName);
    flowchart.unsetMap();
    this.onMapping.close();
    return this;
  }

  /**
   * Return true if mapping object is active
   *
   * @param {properties} objToMap
   * @returns true - true if mapping mode
   * @memberof FlowchartHandler
   */
  isMapping(): boolean {
    return this.onMapping.isActive();
  }

  /**
   * Wait for draw.io answer
   *
   * @private
   * @param {MessageEvent} event
   * @memberof FlowchartHandler
   */
  listenMessage(event: any) {
    if (event.data !== undefined && event.data.length > 0 && event.data.substring(0, 3) === 'fc-') {
      const uid = event.data.substring(3);
      const fc = this.getFlowchartById(uid);
      this.currentFlowchart = fc;
      // send xml
      // if (event.source) {
      //   if (!(event.source instanceof MessagePort) && !(event.source instanceof ServiceWorker)) {
      if (fc !== undefined) {
        $GF.notify('Sending current data to draw.io editor', 'info');
        event.source.postMessage(fc.data.xml, event.origin);
        this.postedId = fc.uid;
      }
      //   }
      // }
    } else {
      if (
        this.onEdit &&
        event.data !== undefined &&
        event.data.length > 0 &&
        event.data.substring(0, 3) !== 'fc-' &&
        this.currentFlowchart !== undefined
      ) {
        if (this.postedId !== undefined) {
          const fc = this.getFlowchartById(this.postedId);
          if (fc !== undefined) {
            $GF.notify('Received data from draw.io editor, refresh in progress', 'info');
            fc.setContent(event.data);
            this.change();
            this.render();
          }
        }
      }
      if ((this.onEdit && event.data !== undefined) || event.data.length === 0) {
        if (this.editorWindow) {
          this.editorWindow.close();
        }
        this.onEdit = false;
        this.postedId = undefined;
        window.removeEventListener('message', this.listenMessage.bind(this), false);
        $GF.notify('Draw.io editor closed', 'info');
      }
    }
  }

  /**
   * Open graph in draw.io
   *
   * @memberof FlowchartHandler
   */
  openDrawEditor(name?: string) {
    const fc = this.getFlowchart(name);
    const urlEditor = this.data.editorUrl;
    const theme = this.data.editorTheme;
    const urlParams = `${urlEditor}?embed=1&spin=1&libraries=1&ui=${theme}&ready=fc-${fc.uid}&src=grafana`;
    this.editorWindow = window.open(urlParams, 'MxGraph Editor', 'width=1280, height=720');
    this.onEdit = true;
    $GF.notify(`Opening current flowchart on draw.io editor`, 'info');
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

  //
  // updates
  //
  update(): this {
    // this.refreshMetrics();
    // this.refreshRules();
    // this.refreshStates();
    this.updateFlowchart();
    // this.onRefreshed();
    return this;
  }

  change(): this {
    this.flowcharts.forEach(f => f.change());
    this.setCurrentFlowchart('Main');
    // this.onChanged();
    return this;
  }

  free(): this {
    this.flowcharts.forEach(f => f.free());
    this.clear();
    // this.onDestroyed();
    return this;
  }

  init(): this {
    return this;
  }

  //
  // Events
  //
  // async onDestroyed() {
  //   const funcName = 'onDestroyed';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  //   this.ctrl.eventHandler.unsubscribes(this);
  // }

  // async onRefreshed() {
  //   const funcName = 'onRefreshed';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  // }

  // async onInitialized() {
  //   const funcName = 'onInitialized';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  //   this.ctrl.eventHandler.subscribes(this);
  // }

  // async onChanged() {
  //   const funcName = 'onChanged';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  // }
}