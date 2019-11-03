import $ from 'jquery';
export default class FlowChartingPlugin {
  // constructor(context_root) {
  /* @ngInject */
  constructor(context_root) {
    this.contextroot = context_root;
    this.dirname = this.contextroot + '/public/plugins/agenty-flowcharting-panel/';
    this.data = this.loadJson();
    this.repo = this.getRepo();
    this.logLevel = 0;
    this.logDisplay = true;
    window.GF_PLUGIN = window.GF_PLUGIN || this;
  }

  static init($scope, $injector, $rootScope, templateSrv) {
    let plugin;
    if($rootScope == undefined) {
      plugin = new FlowChartingPlugin('');
    }
    else {
      plugin = new FlowChartingPlugin($rootScope.appSubUrl);
      plugin.$rootScope = $rootScope;
      plugin.templateSrv = templateSrv;
    }
    window.GF_PLUGIN = plugin;
    return plugin;
  }

  getLevel() {
    return this.logLevel;
  }

  setLevel(level) {
    this.logLevel = level;
  }

  isLogEnable() {
    return this.logDisplay;
  }

  setLog(enable) {
    this.logDisplay = enable;
  }

  getRepo() {
    this.data.info.links.forEach(link => {
      if (link.name === 'Documentation') return link.url;
      return null;
    });
  }

  loadJson() {
    let data;
    $.ajaxSetup({
      async: false
    });

    $.getJSON(`${this.dirname}/plugin.json`, obj => {
      data = obj;
    });
    return data;
  }

  getRootPath() {
    return this.dirname;
  }

  getRepoPath() {}

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
    return `${this.getRootPath}/partials/`;
  }

  popover(text, tagBook, tagImage) {
    const url = plugin.repository;
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

// /* @ngInject */
FlowChartingPlugin.init();