export default class FlowChartingPlugin {
  constructor(context_root) {
    this.contextRoot = context_root;
    this.data = this.loadJson();
    this.repo = this.getRepo();
    this.logLevel = 3;
    this.logDisplay = true;
    this.perf = true;
    this.marky = null;
  }

  static initUtils() {
    const u = require('./utils');
    window.u = window.u || u;
  }

  static init($scope, $injector, $rootScope, templateSrv) {
    FlowChartingPlugin.initUtils();
    let plugin, contextRoot;
    if($scope == undefined) {
      console.warn("$scope is undefined, use __dirname instead");
      contextRoot = __dirname;
      if (contextRoot.length >0) plugin = new FlowChartingPlugin(contextRoot);
      else {
        contextRoot = FlowChartingPlugin.defaultContextRoot;
        console.warn("__dirname is empty, user default",contextRoot);
        plugin = new FlowChartingPlugin(contextRoot);
      }
    }
    else {
      contextRoot = $scope.$root.appSubUrl + FlowChartingPlugin.defaultContextRoot;
      console.info("Context-root for plugin is",contextRoot);
      plugin = new FlowChartingPlugin(contextRoot);
      plugin.$rootScope = $rootScope;
      plugin.$scope = $scope;
      plugin.$injector = $injector;
      plugin.templateSrv = templateSrv;
    }
    window.GF_PLUGIN = plugin;
    return plugin;
  }

  setPerf(bool) {
    this.perf = bool;
  }

  getLevel() {
    return this.logLevel;
  }

  setLevel(level) {
    this.logLevel = level;
  }

  getTemplateSrv() {
    return this.templateSrv;
  }

  isLogEnable() {
    return this.logDisplay;
  }

  setLog(enable) {
    this.logDisplay = enable;
  }

  getRepo() {
    let url = null;
    this.data.info.links.forEach(link => {
      if (link.name === 'Documentation') url =  link.url;
    });
    return url;
  }

  loadJson() {
    let data;
    $.ajaxSetup({
      async: false
    });

    $.getJSON(`${this.contextRoot}/plugin.json`, obj => {
      data = obj;
    });
    return data;
  }

  getRootPath() {
    return this.contextRoot;
  }

   getVersion() {
    return this.data.info.version;
  }

  getLibsPath() {
    return `${this.getRootPath()}libs`;
  }

  getShapesPath() {
    return `${this.getLibsPath()}libs/shapes`;
  }

  getMxBasePath() {
    return `${this.getLibsPath()}/mxgraph/javascript/dist/`;
  }

  getMxImagePath() {
    return `${this.getMxBasePath()}images/`;
  }

  getName() {
    return this.data.id;
  }

  getPartialPath() {
    return `${this.getRootPath()}/partials/`;
  }

  popover(text, tagBook, tagImage) {
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
    if (tagBook)
      book = `<a href="${url}${tagBook}" target="_blank"><i class="fa fa-book fa-fw"></i>Help</a>`;
    if (tagImage)
      image = `<a href="${images}${tagImage}.png" target="_blank"><i class="fa fa-image fa-fw"></i>Example</a>`;
    return `
    <div id="popover" style="display:flex;flex-wrap:wrap;width: 100%;">
      <div style="flex:1;height:100px;margin-bottom: 20px;">${desc}</div>
      <div style="flex:1;height:100px;margin-bottom: 20px;">${book}</div>
      <div style="flex-basis: 100%;height:100px;margin-bottom:20px;">${image}</div>
    </div>`;
  }

  startPerf(name) {
    if(this.perf) {
      if(this.marky == null) this.marky = u.getMarky();
      if(name == null) name = "Flowcharting";
      return this.marky.mark(name);
    }
  }

  stopPerf(name) {
    if(this.perf) {
      if(name == null) name = "Flowcharting";
      let entry = this.marky.stop(name);
      console.log("Perfomance of "+name,entry);
    }
  }

  log(level, title, obj) {
    // 0 : DEBUG
    // 1 : INFO
    // 2 : WARN
    // 3 : ERROR
    // eslint-disable-next-line no-undef
    if (this.logDisplay !== undefined && this.logDisplay === true) {
      // eslint-disable-next-line no-undef
      if (this.logLevel !== undefined && level >= this.logLevel) {
        if (level === 3) {
          console.error(`ERROR : ${title}`, obj);
        }
        if (level === 2) {
          console.warn(` WARN : ${title}`, obj);
          return;
        }
        if (level === 1) {
          console.info(` INFO : ${title}`, obj);
          return;
        }
        if (level === 0) {
          console.debug(`DEBUG : ${title}`, obj);
          return;
        }
      }
    }
  }
}
FlowChartingPlugin.defaultContextRoot = '/public/plugins/agenty-flowcharting-panel/';