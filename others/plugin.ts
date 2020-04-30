import { $GF } from 'globals_class';

// declare var GFP: FlowChartingPlugin;
/**
 * Global Manager of plugin
 * @export
 * @class FlowChartingPlugin
 */
export class FlowChartingPlugin {
  contextRoot: string;
  data: any;
  repo: string;
  // perf: Perf;
  // log: Log;
  utils: any;
  static defaultContextRoot = '/public/plugins/agenty-flowcharting-panel/';
  templateSrv: any;

  constructor(contextRoot: string, templateSrv: any) {
    this.contextRoot = contextRoot;
    $GF.setVar($GF.CONSTANTS.VAR_STG_CTXROOT, contextRoot);
    $GF.setVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV, templateSrv);
    this.data = this.loadJson();
    this.repo = this.getRepo();
    // this.perf = new Perf();
    // this.log = new Log();
    this.templateSrv = templateSrv;
    this.utils = require('./utils_raw');
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
      contextRoot = __dirname;
      if (contextRoot.length > 0) {
        plugin = new FlowChartingPlugin(contextRoot, templateSrv);
      } else {
        contextRoot = FlowChartingPlugin.defaultContextRoot;
        plugin = new FlowChartingPlugin(contextRoot, templateSrv);
      }
    } else {
      contextRoot = $scope.$root.appSubUrl + FlowChartingPlugin.defaultContextRoot;
      plugin = new FlowChartingPlugin(contextRoot, templateSrv);
    }
    $GF.setVar($GF.CONSTANTS.VAR_STG_CTXROOT, contextRoot);

    window.GFP = plugin;
    return plugin;
  }

  // static async loadLocalFile() {
  //   Promise.all([
  //     _GF.loadLocalFile(_GF.CONSTANTS.VAR_STR_VIEWERJS, _GF.CONSTANTS.CONF_FILE_VIEWERJS),
  //     _GF.loadLocalFile(_GF.CONSTANTS.VAR_STR_SHAPESJS, _GF.CONSTANTS.CONF_FILE_SHAPESJS),
  //   ])
  //     .then(() => {
  //       console.log('All JS File loaded');
  //       return true;
  //     })
  //     .catch(err => {
  //       console.log('Load files JS failed');
  //       return false;
  //     });
  // }

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
