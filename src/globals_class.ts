import _ from 'lodash';
class GFCONSTANT {
  // CONFIG
  CONF_FILE_SHAPES = 'static/shapes.txt';
  CONF_FILE_APPJS = 'libs/drawio/js/app.min.js';
  CONF_FILE_SHAPESJS = 'libs/drawio/js/shapes.min.js';
  CONF_FILE_VIEWERJS = 'libs/drawio/js/viewer.min.js';
  CONF_FILE_PRECONFIGJS = 'libs/drawio/js/PreConfig.js';
  CONF_FILE_POSTCONFIGJS = 'libs/drawio/js/PostConfig.js';
  CONF_COLORS_STEPS = 5;
  CONF_COLORS_MS = 40;
  CONF_ANIMS_STEP = 5;
  CONF_ANIMS_MS = 40;
  CONF_BLINK_COLOR = '#f5f242';

  // GLOBAL VARIABLE
  VAR_STG_SHAPES = 'shapestext';
  VAR_TBL_SHAPES = 'shapesarray';
  VAR_STR_VIEWERJS = 'viewer.min.js';
  VAR_STR_SHAPESJS = 'shapes.min.js';
  VAR_STG_CTXROOT = 'contextroot';
  VAR_OBJ_TEMPLATESRV = 'templatesrv';
  VAR_OBJ_CTRL = 'ctrl';
  VAR_MAP_INTERVAL = 'interval';
  VAR_STR_RULENAME: gf.TVariableKeys = '_rule';
  VAR_NUM_LEVEL: gf.TVariableKeys = '_level';
  VAR_NUM_VALUE: gf.TVariableKeys = '_value';
  VAR_STR_FORMATED: gf.TVariableKeys = '_formated';
  VAR_STR_COLOR: gf.TVariableKeys = '_color';

  // CONDITIONS
  TOOLTIP_APPLYON: gf.TTooltipOnList = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  COLOR_APPLYON: gf.TColorOnList = [
    { text: 'Never', value: 'n' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  TEXT_APPLYON: gf.TTextOnList = [
    { text: 'Never', value: 'n' },
    { text: 'When Metric Displayed', value: 'wmd' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Critical Only', value: 'co' },
  ];
  LINK_APPLYON: gf.TLinkOnList = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];

  // TYPES
  VALUE_TYPES: gf.TValueTypeList = [
    { text: 'Number', value: 'number' },
    { text: 'String', value: 'string' },
    { text: 'Date', value: 'date' },
  ];
  METRIC_TYPES: gf.TMetricTypeList = [
    { text: 'Series', value: 'serie' },
    { text: 'Table', value: 'table' },
  ];
  IDENT_TYPES: { text: string; value: gf.TPropertieKey }[] = [
    { text: 'Id', value: 'id' },
    { text: 'Label', value: 'value' },
  ];
  AGGREGATION_TYPES: gf.TAggregationList = [
    { text: 'First', value: 'first' },
    { text: 'Last', value: 'current' },
    { text: 'Min', value: 'min' },
    { text: 'Max', value: 'max' },
    { text: 'Sum', value: 'total' },
    { text: 'Avg', value: 'avg' },
    { text: 'Count', value: 'count' },
    { text: 'Delta', value: 'delta' },
    { text: 'Range', value: 'range' },
    { text: 'Diff', value: 'diff' },
  ];
  TOOLTIP_GRAPH_TYPES: gf.TGraphTypeList = [
    { text: 'Line', value: 'line' },
    { text: 'Histogram', value: 'bar' },
  ];
  TOOLTIP_GRAPH_SCALE_TYPES: gf.TGraphScaleList = [
    { text: 'Linear', value: 'linear' },
    { text: 'Logarithmic', value: 'log' },
  ];
  TOOLTIP_GRAPH_SIZE_TYPES: gf.TGraphSizeList = [
    { text: 'Adjustable', value: '100%' },
    { text: 'Small', value: '100px' },
    { text: 'Medium', value: '200px' },
    { text: 'Large', value: '400px' },
  ];
  TOOLTIP_DIRECTION_TYPES: gf.TDirectionList = [
    { text: 'Vertical', value: 'v' },
    { text: 'Horizontal ', value: 'h' },
  ];
  VALUE_DATEFORMAT_TYPES: gf.TDateFormatList = [
    { text: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
    { text: 'YYYY-MM-DD HH:mm:ss.SSS', value: 'YYYY-MM-DD HH:mm:ss.SSS' },
    { text: 'MM/DD/YY h:mm:ss a', value: 'MM/DD/YY h:mm:ss a' },
    { text: 'MMMM D, YYYY LT', value: 'MMMM D, YYYY LT' },
    { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  ];

  VALUEMAPPINGTYPES: gf.TValueMappingList = [
    { text: 'Value to text', value: 1 },
    { text: 'Range to text', value: 2 },
  ];

  // METHODS
  TEXTMETHODS: gf.TTextMethodList = [
    { text: 'All content', value: 'content' },
    { text: 'Substring', value: 'pattern', placeholder: '/RegEx/' },
    { text: 'Append (Space) ', value: 'as' },
    { text: 'Append (New line) ', value: 'anl' },
  ];
  COLORMETHODS: gf.TStyleColorList = [
    { text: 'Shape Stroke/Border', value: 'strokeColor' },
    { text: 'Shape Fill', value: 'fillColor' },
    { text: 'Label font color', value: 'fontColor' },
    { text: 'Label background color', value: 'labelBackgroundColor' },
    { text: 'Label border color', value: 'labelBorderColor' },
    { text: 'Image background', value: 'imageBackground' },
    { text: 'Image border', value: 'imageBorder' },
  ];
  EVENTMETHODS: gf.TStyleEventList = [
    { text: 'Shape : Change form (text)', value: 'shape', type: 'text', placeholder: 'Shape name' },
    { text: 'Shape : Rotate Shape (0-360)', value: 'rotation', type: 'number', placeholder: '0-360', default: 0 },
    { text: 'Shape : Blink (frequence ms)', value: 'blink', type: 'number', placeholder: 'Number in ms', default: 500 },
    { text: 'Shape : Hide/Show (0|1)', value: 'visibility', type: 'number', placeholder: '0 or 1', typeahead: '0|1' },
    { text: 'Shape : Change height (number)', value: 'height', type: 'number', placeholder: 'Number of px' },
    { text: 'Shape : Change width (number)', value: 'width', type: 'number', placeholder: 'Number of px' },
    { text: 'Shape : Opacity (0-100)', value: 'opacity', type: 'number', placeholder: '0-100', default: 100 },
    { text: 'Shape : Collapse/Expande (0|1)', value: 'fold', type: 'number', placeholder: '0 or 1', typeahead: '0|1', default: '1' },
    { text: 'Shape : Change position in Bar (0-100)', value: 'barPos', type: 'number', placeholder: '0-100' },
    { text: 'Label : Replace text (text)', value: 'text', type: 'text', placeholder: 'Text' },
    { text: 'Label : Font Size (numeric)', value: 'fontSize', type: 'number', placeholder: 'Number' },
    { text: 'Label : Opacity (numeric)', value: 'textOpacity', type: 'number', placeholder: '0-100', default: 100 },
    { text: 'Image : Change URL (text)', value: 'image', type: 'text', placeholder: 'Url' },
  ];

  LOCALVARIABLENAMES: gf.TVariableList = [
    { text: 'Name of the rule', value: this.VAR_STR_RULENAME },
    { text: 'Current color according to the thresholds', value: this.VAR_STR_COLOR },
    { text: 'Current raw value according to the aggregation', value: this.VAR_NUM_VALUE },
    { text: 'Current level according to the thresholds', value: this.VAR_NUM_LEVEL },
    { text: 'Current formated value accordingto the type', value: this.VAR_STR_FORMATED },
  ];
}

export class GFVariables {
  _variables: Map<string, any>;
  constructor() {
    this._variables = new Map();
  }

  /**
   * Get the full available vars names
   *
   * @static
   * @returns {string[]}
   * @memberof GFVariables
   */
  static getAvailableLocalVarNames(): string[] {
    return $GF.CONSTANTS.LOCALVARIABLENAMES.map(x => '${' + x.value + '}');
  }

  /**
   * set or redefine varaible
   *
   * @param {string} key
   * @param {*} value
   * @returns {this}
   * @memberof GFVariables
   */
  set(key: gf.TVariableKeys, value: any): this {
    this._variables.set(key, value);
    return this;
  }

  unset(key: gf.TVariableKeys): this {
    this._variables.delete(key);
    return this;
  }

  /**
   * Get variable value
   *
   * @param {string} key
   * @returns {*}
   * @memberof GFVariables
   */
  get(key: gf.TVariableKeys): any {
    return this._variables.get(key);
  }

  /**
   * Return the name of variables without ${}
   *
   * @returns {string[]}
   * @memberof GFVariables
   */
  keys(): string[] {
    return Array.from(this._variables.keys());
  }

  /**
   * Return all local declared variables and grafana variables
   *
   * @returns {string[]}
   * @memberof GFVariables
   */
  getFullVarsNames(): string[] {
    return $GF.getGrafanaVars().concat(this.getVarsNames());
  }

  /**
   * Get the full names of declared local vars
   *
   * @returns {string[]}
   * @memberof GFVariables
   */
  getVarsNames(): string[] {
    return this.keys().map(x => '${' + x + '}');
  }

  /**
   * Clear all variables
   *
   * @returns {this}
   * @memberof GFVariables
   */
  clear(): this {
    this._variables.clear();
    return this;
  }

  /**
   * Replace text with variables
   *
   * @param {string} text
   * @returns {string}
   * @memberof GFVariables
   */
  replaceText(text: string): string {
    try {
      let templateSrv = $GF.getVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV);
      text = templateSrv !== undefined ? templateSrv.replaceWithText(text) : text;
      for (let [key, value] of this._variables) {
        text = text.replace('${' + key + '}', value);
      }
    } catch (error) {
      return text;
    }
    return text;
  }

  /**
   * Replace and eval text with variables
   *
   * @param {string} text
   * @returns {string}
   * @memberof GFVariables
   */
  eval(text: string): string {
    let t = this.replaceText(text);
    return $GF.utils.evalIt(t);
  }
}

class GFLog {
  static DEBUG = 0;
  static INFO = 1;
  static WARN = 2;
  static ERROR = 3;
  static logLevel = GFLog.WARN;
  static logDisplay = true;
  constructor() {}

  /**
   * If message must be displayed
   *
   * @param {number} level (DEBUG : 0, INFO : 1, WARN:2, ERROR:3)
   * @returns {boolean}
   * @memberof Log
   */
  static toDisplay(level: number): boolean {
    if (GFLog.logDisplay !== undefined && GFLog.logDisplay === true) {
      if (GFLog.logLevel !== undefined && level >= GFLog.logLevel) {
        return true;
      }
    }
    return false;
  }

  /**
   * Display debug message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async debug(...args) {
    if (GFLog.toDisplay(GFLog.DEBUG)) {
      const title = args.shift();
      console.debug(`GF DEBUG : ${title}`, ...args);
    }
  }

  /**
   * Display warn message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async warn(...args) {
    if (GFLog.toDisplay(GFLog.WARN)) {
      const title = args.shift();
      console.warn(`GF WARN : ${title}`, ...args);
    }
  }

  /**
   * Display info message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async info(...args) {
    if (GFLog.toDisplay(GFLog.INFO)) {
      const title = args.shift();
      console.info(`GF INFO : ${title}`, ...args);
    }
  }

  /**
   * Display error message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async error(...args) {
    if (GFLog.toDisplay(GFLog.ERROR)) {
      const title = args.shift();
      console.error(`GF ERROR : ${title}`, ...args);
    }
  }
}

class GFTrace {
  static enable = true;
  static trc = new Map();
  static fn = new Map();
  static indent = 0;
  trace:
    | {
        Name: string;
        Id: string;
        Args: any;
        Return: any;
        Before: number;
        End: number | undefined;
        ExecTime: number | undefined;
        Indent: number;
      }
    | undefined;

  constructor(fn?: string) {
    if (GFTrace.enable && fn !== undefined) {
      this.trace = {
        Name: fn,
        Id: $GF.utils.uniqueID(),
        Args: undefined,
        Return: undefined,
        Before: Date.now(),
        End: undefined,
        ExecTime: undefined,
        Indent: GFTrace.indent,
      };
      GFTrace.trc.set(this.trace.Id, this.trace);
    }
  }

  before(
    fn: string | undefined
  ):
    | GFTrace
    | {
        after: () => void;
      } {
    if (GFTrace.enable && fn !== undefined) {
      const t = new GFTrace(fn);
      GFTrace.indent++;
      GFTrace._inc(fn);
      return t;
    }
    return { after: () => {} };
  }

  static _inc(fn) {
    let f = GFTrace.fn.get(fn);
    if (f === undefined) {
      f = {
        Calls: 0,
        Function: fn,
        TotalTimes: 0,
      };
    }
    f.Calls++;
    GFTrace.fn.set(fn, f);
  }

  async after() {
    // console.log('trace', this.trace)
    if (GFTrace.enable && this.trace !== undefined) {
      // if (this.trace.Name === 'FlowchartCtrl.onDataReceived()') debugger
      if (this.trace) {
        this.trace.End = Date.now();
        GFTrace.indent--;
      }
    }
  }

  async clear() {
    if (GFTrace.enable) {
      GFTrace.trc.clear();
    }
  }

  async resume() {
    if (GFTrace.enable) {
      let tb: any[] = [];
      let fn: any[] = [];
      GFTrace.trc.forEach(trace => {
        // if (trace.Name === 'FlowchartCtrl.onDataReceived()') debugger
        trace.ExecTime = trace.End - trace.Before;
        const f = GFTrace.fn.get(trace.Name);
        f.TotalTimes += trace.ExecTime;
        tb.push(trace);
      });
      console.table(tb, ['Indent', 'Name', 'ExecTime']);
      GFTrace.fn.forEach(f => {
        fn.push(f);
      });
      console.table(fn, ['Function', 'Calls', 'TotalTimes']);
      GFTrace.trc.clear();
      GFTrace.fn.clear();
    }
  }
}

export class $GF {
  static _globalvars: GFVariables = new GFVariables();
  static log: GFLog = new GFLog();
  static CONSTANTS: GFCONSTANT = new GFCONSTANT();
  static trace: GFTrace = new GFTrace();
  static utils: {
    decode: (data: string, encode: boolean, deflate: boolean, base64: boolean) => string;
    encode: (data: string, encode: boolean, deflate: boolean, base64: boolean) => string;
    loadJS: (fname: string) => void;
    sleep: (ms: number, mess?: string) => void;
    uniqueID: () => string;
    getRatioColor: (ratio: number, colorStart: string, colorEnd: string) => string;
    matchString: (str: string, pattern: string | undefined, regex?: boolean) => boolean;
    stringToJsRegex: (str: string) => RegExp;
    isencoded: (data: string) => boolean;
    minify: (text: string) => string;
    prettify: (text: string) => string;
    getMarky: () => any;
    getStepColors: (colorStart: string, colorEnd: string, colorCount: number) => string[];
    evalIt: (code: string) => string;
    loadFile: (fname: string) => string;
    $loadFile: (fname: string) => string;
    evalRaw: (code: string) => void;
    addScript: (src: string) => void;
  } = require('./utils_raw');

  /**
   * Create and get local variables container
   *
   * @static
   * @returns {GFVariables}
   * @memberof GFGlobal
   */
  static createLocalVars(): GFVariables {
    let _v = new GFVariables();
    return _v;
  }

  /**
   * Get global variables container
   *
   * @static
   * @returns {GFVariables}
   * @memberof GFGlobal
   */
  static getGlobalVars(): GFVariables {
    // console.log('getGlobalVars()',_GF._globalvars)
    if ($GF._globalvars === undefined) {
      $GF._globalvars = new GFVariables();
    }
    return $GF._globalvars;
  }

  static getGrafanaVars(): string[] {
    const templateSrv = $GF.getVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV);
    if (templateSrv !== undefined && templateSrv !== null) {
      return _.map(templateSrv.variables, variable => `\${${variable.name}}`);
    }
    return [];
  }

  /**
   * Get global variable value
   *
   * @static
   * @param {*} key
   * @returns {*}
   * @memberof GFGlobal
   */
  static getVar(key: any): any {
    return $GF.getGlobalVars().get(key);
  }

  /**
   * set global variable with value
   *
   * @static
   * @param {*} key
   * @param {*} value
   * @memberof GFGlobal
   */
  static setVar(key: any, value: any) {
    $GF.getGlobalVars().set(key, value);
  }

  static unsetVar(key: any) {
    $GF.getGlobalVars().unset(key);
  }

  /**
   * Get all available variables name
   *
   * @static
   * @returns {string[]}
   * @memberof GFGlobal
   */
  static getFullAvailableVarNames(): string[] {
    return GFVariables.getAvailableLocalVarNames().concat($GF.getGrafanaVars());
  }

  static getIntervalCounter(begin: number, end: number, count: number, method: gf.TCounterKeys = 'linear'): number[] {
    let result: number[] = [];
    const distance = end - begin;
    const step = Math.round(distance / count);
    let current = begin;
    let index = 0;
    for (index = 0; index < count; index++) {
      current += step;
      result.push(current);
    }
    result[index] = end;
    return result;
  }

  /**
   * Add a new Intervall (window.setInterval)
   *
   * @static
   * @param {CallableFunction} fc
   * @param {number} timer
   * @returns {number}
   * @memberof GFGlobal
   */
  static setInterval(fc: CallableFunction, timer: number): number {
    let interval: Set<any> = $GF.getVar($GF.CONSTANTS.VAR_MAP_INTERVAL);
    if (interval === undefined) {
      interval = new Set();
      $GF.setVar($GF.CONSTANTS.VAR_MAP_INTERVAL, interval);
    }
    const newInterval = window.setInterval(fc, timer);
    interval.add(newInterval);
    return newInterval;
  }

  /**
   * Add/clear a  Intervall (window.clearInterval)
   *
   * @static
   * @param {number} key
   * @memberof GFGlobal
   */
  static clearInterval(key: number) {
    let interval: Set<any> = $GF.getVar($GF.CONSTANTS.VAR_MAP_INTERVAL);
    if (interval !== undefined) {
      try {
        window.clearInterval(key);
      } catch (error) {
        $GF.log.warn('Failed to clear interval thread', key, error);
      }
      interval.delete(key);
    }
  }

  /**
   * Load a file into variables
   *
   * @static
   * @param {string} varName
   * @param {string} fileName
   * @memberof GFGlobal
   */
  static async loadLocalFile(varName: string, fileName: string) {
    let v = $GF.getVar(varName);
    if (v === undefined) {
      const contextroot = $GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT);
      if (contextroot !== undefined) {
        const filePath = `${contextroot}/${fileName}`;
        if (!!window.fetch) {
          // exécuter ma requête fetch ici
          fetch(filePath)
            .then(response => {
              if (response.ok) {
                response
                  .text()
                  .then(text => {
                    $GF.log.info('loadLocalFile called succesfully', filePath);
                    $GF.setVar(varName, text);
                    return text;
                  })
                  .catch(error => $GF.log.error('Error when download text file', filePath, error));
              }
            })
            .catch(error => $GF.log.error('Error when download file', filePath, error));
        } else {
          // Faire quelque chose avec XMLHttpRequest?
          const txt = $GF.utils.loadFile(fileName);
          if (txt) {
            $GF.setVar(varName, $GF.utils.loadFile(fileName));
            return txt;
          }
        }
      } else {
        $GF.log.warn('loadLocalFile Contexroot : ', contextroot);
      }
    }
    return false;
  }

  static getRootPath(): string {
    return $GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT);
  }

  static getLibsPath(): string {
    return `${$GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT)}libs/`;
  }

  static getDrawioPath(): string {
    return `${$GF.getLibsPath()}drawio/`;
  }

  static getStaticPath(): string {
    return `${$GF.getRootPath()}static/`;
  }

  static getMxBasePath(): string {
    return `${$GF.getDrawioPath()}mxgraph/`;
  }

  static getMxStylePath(): string {
    return `${$GF.getDrawioPath()}styles/`;
  }

  static getShapesPath(): string {
    return `${$GF.getDrawioPath()}/shapes/`;
  }

  static getPartialPath(): string {
    return `${$GF.getRootPath()}partials/`;
  }

  static getStencilsPath(): string {
    return `${$GF.getDrawioPath()}/stencils/`;
  }

  static getMxCssPath(): string {
    return `${$GF.getDrawioPath()}styles/`;
  }

  static getMxResourcePath(): string {
    return `${$GF.getMxBasePath()}css/`;
  }

  static getMxImagePath(): string {
    return `${$GF.getMxBasePath()}images/`;
  }

  static destroy() {
    let interval: Set<any> = $GF.getVar('interval');
    if (interval !== undefined) {
      interval.forEach(x => $GF.clearInterval(x));
      interval.clear();
    }
  }
}
