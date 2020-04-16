export class GFCONSTANT {
  // CONDITIONS
  static TOOLTIP_APPLYON: gf.TTooltipOnList = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  static COLOR_APPLYON: gf.TColorOnList = [
    { text: 'Never', value: 'n' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  static TEXT_APPLYON: gf.TTextOnList = [
    { text: 'Never', value: 'n' },
    { text: 'When Metric Displayed', value: 'wmd' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Critical Only', value: 'co' },
  ];
  static LINK_APPLYON: gf.TLinkOnList = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];

  // TYPES
  static readonly VALUE_TYPES: gf.TValueTypeList = [
    { text: 'Number', value: 'number' },
    { text: 'String', value: 'string' },
    { text: 'Date', value: 'date' },
  ];
  static readonly METRIC_TYPES: gf.TMetricTypeList = [
    { text: 'Series', value: 'serie' },
    { text: 'Table', value: 'table' },
  ];
  static readonly IDENT_TYPES: { text: string; value: gf.TPropertieKey }[] = [
    { text: 'Id', value: 'id' },
    { text: 'Label', value: 'value' },
  ];
  static readonly AGGREGATION_TYPES: gf.TAggregationList = [
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
  static readonly TOOLTIP_GRAPH_TYPES: gf.TGraphTypeList = [
    { text: 'Line', value: 'line' },
    { text: 'Histogram', value: 'bar' },
  ];
  static readonly TOOLTIP_GRAPH_SCALE_TYPES: gf.TGraphScaleList = [
    { text: 'Linear', value: 'linear' },
    { text: 'Logarithmic', value: 'log' },
  ];
  static readonly TOOLTIP_GRAPH_SIZE_TYPES: gf.TGraphSizeList = [
    { text: 'Adjustable', value: '100%' },
    { text: 'Small', value: '100px' },
    { text: 'Medium', value: '200px' },
    { text: 'Large', value: '400px' },
  ];
  static readonly TOOLTIP_DIRECTION_TYPES: gf.TDirectionList = [
    { text: 'Vertical', value: 'v' },
    { text: 'Horizontal ', value: 'h' },
  ];
  static readonly VALUE_DATEFORMAT_TYPES: gf.TDateFormatList = [
    { text: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
    { text: 'YYYY-MM-DD HH:mm:ss.SSS', value: 'YYYY-MM-DD HH:mm:ss.SSS' },
    { text: 'MM/DD/YY h:mm:ss a', value: 'MM/DD/YY h:mm:ss a' },
    { text: 'MMMM D, YYYY LT', value: 'MMMM D, YYYY LT' },
    { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  ];

  static readonly VALUEMAPPINGTYPES: gf.TValueMappingList = [
    { text: 'Value to text', value: 1 },
    { text: 'Range to text', value: 2 },
  ];

  // METHODS
  static readonly TEXTMETHODS: gf.TTextMethodList = [
    { text: 'All content', value: 'content' },
    { text: 'Substring', value: 'pattern' },
    { text: 'Append (Space) ', value: 'as' },
    { text: 'Append (New line) ', value: 'anl' },
  ];
  static readonly COLORMETHODS: gf.TStyleColorList = [
    { text: 'Shape Stroke/Border', value: 'strokeColor' },
    { text: 'Shape Fill', value: 'fillColor' },
    { text: 'Label font color', value: 'fontColor' },
    { text: 'Label background color', value: 'labelBackgroundColor' },
    { text: 'Label border color', value: 'labelBorderColor' },
    { text: 'Image background', value: 'imageBackground' },
    { text: 'Image border', value: 'imageBorder' },
  ];
  static readonly EVENTMETHODS: gf.TStyleEventList = [
    { text: 'Shape : Change form (text)', value: 'shape', type: 'text', placeholder: 'Shape name' },
    { text: 'Shape : Rotate Shape (0-360)', value: 'rotation', type: 'number', placeholder: '0-360' },
    { text: 'Shape : Blink (frequence ms)', value: 'blink', type: 'number', placeholder: 'Number in ms' },
    { text: 'Shape : Hide/Show (0|1)', value: 'visibility', type: 'number', placeholder: '0 or 1' , typeahead: "0|1"},
    { text: 'Shape : Change height (number)', value: 'height', type: 'number', placeholder: 'Number of px' },
    { text: 'Shape : Change width (number)', value: 'width', type: 'number', placeholder: 'Number of px' },
    { text: 'Shape : Hide/Show (0|1)', value: 'visibility', type: 'number', placeholder: '0 or 1' },
    { text: 'Shape : Opacity (0-100)', value: 'opacity', type: 'number', placeholder: '0-100' },
    { text: 'Shape : Collapse/Expande (0|1)', value: 'fold', type: 'number', placeholder: '0 or 1' ,typeahead: "0|1"},
    { text: 'Shape : Change position in Bar (0-100)', value: 'barPos', type: 'number', placeholder: '0-100' },
    { text: 'Label : Replace text (text)', value: 'text', type: 'text', placeholder: 'Text' },
    { text: 'Label : Font Size (numeric)', value: 'fontSize', type: 'number', placeholder: 'Number' },
    { text: 'Label : Opacity (numeric)', value: 'textOpacity', type: 'number', placeholder: '0-100' },
  ];

  static readonly LOCALVARIABLENAMES: gf.TVariableList = [
    { text: 'Name of the rule', value: '_rule' },
    { text: 'Current color according to the thresholds', value: '_color' },
    { text: 'Current raw value according to the aggregation', value: '_value' },
    { text: 'Current level according to the thresholds', value: '_level' },
    { text: 'Current formated value accordingto the type', value: '_formated' },
  ];
}

export class GFVariables {
  protected _variables: Map<string, any>;
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
    return GFCONSTANT.LOCALVARIABLENAMES.map(x => '${' + x.value + '}');
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
    return GFUtils.getGrafanaVars().concat(this.getVarsNames());
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
      let templateSrv = GFUtils.getVar('templatesrv');
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
    try {
      text = eval(t);
    } catch (error) {
      return t;
    }
    return text;
  }
}

class GFLog {
  static DEBUG = 0;
  static INFO = 1;
  static WARN = 2;
  static ERROR = 3;
  private static logLevel = GFLog.DEBUG;
  private static logDisplay = false;
  constructor() { }

  /**
   * If message must be displayed
   *
   * @param {number} level (DEBUG : 0, INFO : 1, WARN:2, ERROR:3)
   * @returns {boolean}
   * @memberof Log
   */
  private static toDisplay(level: number): boolean {
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

export class GFUtils {
  private static _globalvars: GFVariables = new GFVariables();
  static log: GFLog = new GFLog();
  /**
   * Create and get local variables container
   *
   * @static
   * @returns {GFVariables}
   * @memberof GFUtils
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
   * @memberof GFUtils
   */
  private static getGlobalVars(): GFVariables {
    if (GFUtils._globalvars === undefined) {
      GFUtils._globalvars = new GFVariables();
    }
    return GFUtils._globalvars;
  }

  static getGrafanaVars(): string[] {
    const ctrl = GFUtils.getVar('ctrl');
    return ctrl !== undefined ? ctrl.getVariables() : [];
  }

  /**
   * Get global variable value
   *
   * @static
   * @param {*} key
   * @returns {*}
   * @memberof GFUtils
   */
  static getVar(key: any): any {
    return GFUtils.getGlobalVars().get(key);
  }

  /**
   * set global variable with value
   *
   * @static
   * @param {*} key
   * @param {*} value
   * @memberof GFUtils
   */
  static setVar(key: any, value: any) {
    GFUtils.getGlobalVars().set(key, value);
  }

  /**
   * Get available variable name
   *
   * @static
   * @returns {string[]}
   * @memberof GFUtils
   */
  static getFullAvailableVarNames(): string[] {
    return GFVariables.getAvailableLocalVarNames().concat(GFUtils.getGrafanaVars());
  }

  /**
   * Add a new Intervall (window.setInterval)
   *
   * @static
   * @param {CallableFunction} fc
   * @param {number} timer
   * @returns {number}
   * @memberof GFUtils
   */
  static setInterval(fc: CallableFunction, timer: number): number {
    let interval: Set<any> = GFUtils.getVar('interval');
    if (interval === undefined) {
      interval = new Set();
      GFUtils.setVar('interval', interval);
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
   * @memberof GFUtils
   */
  static clearInterval(key: number) {
    let interval: Set<any> = GFUtils.getVar('interval');
    if (interval !== undefined) {
      try {
        window.clearInterval(key);
      } catch (error) {
        GFUtils.log.warn('Failed to clear interval thread', key, error);
      }
      interval.delete(key);
    }
  }

  static async loadFile(varName: string, fileName: string) {
    console.log("loadFile :", fileName)
    let v = GFUtils.getVar(varName);
    if (v === undefined) {
      const filePath = `${GFUtils.getStaticPath()}/${fileName}`;
      if (!!window.fetch) {
        // exécuter ma requête fetch ici
        fetch(filePath)
          .then(response => {
            if (response.ok) {
              response.text()
                .then(text => GFUtils.setVar(varName, text))
                .catch(error => GFUtils.log.error('Error when download file', filePath, error));
            }
          })
          .catch(error => GFUtils.log.error('Error when download file', filePath, error));
      } else {
        // Faire quelque chose avec XMLHttpRequest?
      }

    }
  }

  static getRootPath(): string {
    return GFUtils.getVar('contextroot')
  }

  static getStaticPath(): string {
    return `${GFUtils.getRootPath()}static`;
  }

  static destroy() {
    let interval: Set<any> = GFUtils.getVar('interval');
    if (interval !== undefined) {
      interval.forEach(x => GFUtils.clearInterval(x));
      interval.clear();
    }
  }
}
