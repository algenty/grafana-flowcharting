declare var GFP: FlowChartingPlugin;
/**
 * Global Manager of plugin
 * @export
 * @class FlowChartingPlugin
 */
export default class FlowChartingPlugin {
  contextRoot: string;
  data: any;
  repo: string;
  perf: Perf;
  log: Log;
  utils: any;
  static defaultContextRoot = '/public/plugins/agenty-flowcharting-panel/';
  templateSrv: any;

  constructor(contextRoot: string, templateSrv: any) {
    this.contextRoot = contextRoot;
    this.data = this.loadJson();
    this.repo = this.getRepo();
    this.perf = new Perf();
    this.log = new Log();
    this.templateSrv = templateSrv;
    this.utils = require('./utils');
  }

  /**
   * Initialize
   * @static
   * @param  {*} $scope
   * @return FlowChartingPlugin
   * @memberof FlowChartingPlugin
   */
  static init($scope: any, templateSrv: any): FlowChartingPlugin {
    let plugin, contextRoot;
    if ($scope === undefined) {
      // console.warn('$scope is undefined, use __dirname instead');
      contextRoot = __dirname;
      if (contextRoot.length > 0) {
        plugin = new FlowChartingPlugin(contextRoot, templateSrv);
      } else {
        contextRoot = FlowChartingPlugin.defaultContextRoot;
        // console.warn('__dirname is empty, user default', contextRoot);
        plugin = new FlowChartingPlugin(contextRoot, templateSrv);
      }
    } else {
      contextRoot = $scope.$root.appSubUrl + FlowChartingPlugin.defaultContextRoot;
      // console.info('Context-root for plugin is', contextRoot);
      plugin = new FlowChartingPlugin(contextRoot, templateSrv);
    }
    window.GFP = plugin;
    return plugin;
  }

  /**
   * Get templateSrv from dashboard
   * @return TemplateSrv
   * @memberof FlowChartingPlugin
   */
  getTemplateSrv(): any {
    return this.templateSrv;
  }

  replaceWithText(content: string): string {
    return this.templateSrv.replaceWithText(content);
  }

  /**
   * Get url of documentation site
   * @return string
   * @memberof FlowChartingPlugin
   */
  getRepo(): string {
    let url = '';
    this.data.info.links.forEach((link: { name: string; url: string }) => {
      if (link.name === 'Documentation') {
        url = link.url;
      }
    });
    return url;
  }

  /**
   *
   * @private
   * @return *
   * @memberof FlowChartingPlugin
   */
  loadJson(): any {
    const data: any = require('./plugin.json');
    return data;
  }

  /**
   * return the uri path for GF
   *
   * @returns {string} Uri path of plugin
   * @memberof FlowChartingPlugin
   */
  getRootPath(): string {
    return this.contextRoot;
  }

  /**
   * return the uri path for static
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getStaticPath(): string {
    return `${this.getRootPath()}static`;
  }

  /**
   * return the uri libs path for GF
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getLibsPath(): string {
    return `${this.getRootPath()}libs`;
  }

  /**
   * return the uri draw.io libs for GF
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getDrawioPath(): string {
    return `${this.getLibsPath()}/drawio`;
  }

  /**
   * return the uri path of shapes js for GF
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getShapesPath(): string {
    return `${this.getDrawioPath()}/shapes`;
  }

  /**
   * return the uri path of stencils xml for GF
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getStencilsPath(): string {
    return `${this.getDrawioPath()}/stencils`;
  }

  /**
   * return the uri path of mxgraph base for GF
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getMxBasePath(): string {
    return `${this.getLibsPath()}/mxgraph/javascript/dist/`;
  }

  /**
   * return the uri path of mxgraph styles for GF
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getMxStylePath(): string {
    return `${this.getMxBasePath()}styles/`;
  }

  /**
   * return the uri path of mxgraph Css for GF
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getMxCssPath(): string {
    return `${this.getMxBasePath()}css/`;
  }

  /**
   * return the uri path of mxgraph ressources for GF
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getMxResourcePath(): string {
    return `${this.getMxBasePath()}resources/`;
  }

  /**
   * return the uri path of mxgraph image for GF
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getMxImagePath(): string {
    return `${this.getMxBasePath()}images/`;
  }

  /**
   * Return partials path (html) for edit mode in grafana
   *
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  getPartialPath(): string {
    return `${this.getRootPath()}/partials/`;
  }

  /**
   * return version of GF
   *
   * @returns {string} version (plugin.json)
   * @memberof FlowChartingPlugin
   */
  getVersion(): string {
    return this.data.info.version;
  }

  /**
   * Return Html for popup with links to documentation
   *
   * @param {string} text
   * @param {string} tagBook
   * @param {string} [tagImage]
   * @returns {string}
   * @memberof FlowChartingPlugin
   */
  popover(text: string, tagBook: string, tagImage?: string): string {
    const url = this.repo;
    const images = `${this.repo}images/`;
    const textEncoded = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    const desc = `${textEncoded}`;
    let book = '';
    let image = '';
    if (tagBook) {
      book = `<a href="${url}${tagBook}" target="_blank"><i class="fa fa-book fa-fw"></i>Help</a>`;
    }
    if (tagImage) {
      image = `<a href="${images}${tagImage}.png" target="_blank"><i class="fa fa-image fa-fw"></i>Example</a>`;
    }
    return `
    <div id="popover" style="display:flex;flex-wrap:wrap;width: 100%;">
      <div style="flex:1;height:100px;margin-bottom: 20px;">${desc}</div>
      <div style="flex:1;height:100px;margin-bottom: 20px;">${book}</div>
      <div style="flex-basis: 100%;height:100px;margin-bottom:20px;">${image}</div>
    </div>`;
  }
}

class Perf {
  enablePerf = false;
  marky: any = null;
  stack: string[] = [];
  constructor() {}

  enable(bool: boolean): void {
    this.enablePerf = bool;
  }

  start(name?: string) {
    if (this.enablePerf) {
      try {
        if (this.marky == null) {
          this.marky = GFP.utils.getMarky();
        }
        if (name == null) {
          name = `GFP ${GFP.utils.uniqueID()}`;
        }
        this.stack.push(name);
        this.marky.mark(name);
      } catch (error) {
        GFP.log.warn('Unable to start perf', error);
      }
    }
  }

  stop(name: string | undefined): PerformanceEntry | undefined | void {
    if (this.enablePerf) {
      try {
        if (name === undefined) {
          name = this.stack.shift();
        }
        const entry: PerformanceEntry = this.marky.stop(name);
        console.log('Perfomance of ' + name, entry);
        return entry;
      } catch (error) {
        GFP.log.warn('Unable to stop perf', error);
      }
    }
  }
}

class Log {
  static DEBUG = 0;
  static INFO = 1;
  static WARN = 2;
  static ERROR = 3;
  logLevel = 0;
  logDisplay = true;
  constructor() {}

  /**
   * If message must be displayed
   *
   * @param {number} level (DEBUG : 0, INFO : 1, WARN:2, ERROR:3)
   * @returns {boolean}
   * @memberof Log
   */
  toDisplay(level: number): boolean {
    if (this.logDisplay !== undefined && this.logDisplay === true) {
      if (this.logLevel !== undefined && level >= this.logLevel) {
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
  async debug(title: string, obj: any | undefined) {
    if (this.toDisplay(Log.DEBUG)) {
      console.debug(`GF DEBUG : ${title}`, obj);
    }
  }

  /**
   * Display warn message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async warn(title: string, obj?: any) {
    if (this.toDisplay(Log.WARN)) {
      console.warn(`GF WARN : ${title}`, obj);
    }
  }

  /**
   * Display info message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async info(title: string, obj?: any) {
    if (this.toDisplay(Log.INFO)) {
      // console.info(`GF INFO : ${title}`, obj);
    }
  }

  /**
   * Display error message in console
   *
   * @param {string} title
   * @param {((any | undefined))} obj
   * @memberof Log
   */
  async error(title: string, obj?: any) {
    if (this.toDisplay(Log.ERROR)) {
      console.error(`GF ERROR : ${title}`, obj);
    }
  }
}
