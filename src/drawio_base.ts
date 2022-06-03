import { GFCONSTANT, GFLog, GFPlugin } from 'globals_class';
import { inflateRaw, deflateRaw } from 'pako';
import { readFile } from 'fs';
import { GFEvents } from 'flowcharting_base';
const mxcustom = require('mxgraph_custom');

const _DEBUG = false;
const _log = (...args: unknown[]) => {
  if (_DEBUG) {
    console.log(...args);
  }
};

// const empty = new Promise<void>(() => {});
const gfdrawioSignalsArray = ['drawio_initialized'] as const;
type GFDrawioSignals = typeof gfdrawioSignalsArray[number];

export interface DrawioOptions {
  mode?: 'local' | 'server';
  libLoad?: boolean;
  libLocal?: string;
  libServer?: string;
}
type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : T[P] | undefined;
};
type DrawioRequiredOptions = Complete<DrawioOptions>;

export class GFDrawio {
  private static _GFInitialized = false;
  private static _libInitialized = false;
  private static _xmlTemplate: string;
  private static _csvTemplate: string;
  static libPromize: Promise<unknown> | undefined;
  static options: DrawioRequiredOptions;
  static events: GFEvents<GFDrawioSignals> = GFEvents.create(gfdrawioSignalsArray);

  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE/CLEAR
  //############################################################################
  static async init(options?: DrawioOptions) {
    this._GFInitialized = true;
    this.options = Object.assign(this._getDefaultRequiredOptions(), options);
    if (!GFDrawio._libInitialized && GFDrawio.options.libLoad) {
      return GFDrawio.loadEngine();
    }
    return;
  }

  //############################################################################
  //### LOGIC
  //############################################################################
  static isInitalized() {
    return GFDrawio._libInitialized;
  }

  static async loadEngine() {
    // const empty = new Promise<void>(() => {});
    if (GFDrawio._libInitialized) {
      return;
    }
    // If not initialized
    if (!GFDrawio._GFInitialized) {
      GFDrawio.init({ libLoad: false });
    }
    let result: Promise<any> = new Promise(() => {});
    // On local for jest
    if (GFDrawio.options.mode === 'local') {
      result = GFDrawio._loadLocal();
    }

    // On distant like grafana
    if (GFDrawio.options.mode === 'server') {
      result = GFDrawio._loadServer();
    }
    // eval result code

    return result.then(async (code) => {
      if (typeof code === 'string') {
        await GFDrawio._preLoad();
        await GFDrawio._evalLib(code);
        await GFDrawio._customization();
        await GFDrawio._postLoad();
      }
      return;
    });
    return;
  }

  static getTemplate(type: gf.TSourceTypeKeys) {
    if(type === 'xml') {
      return GFDrawio.getXmlTemplate();
    }
    if(type === 'csv') {
      return GFDrawio.getCsvTemplate();
    }
    throw new Error(`Unknown type ${type}`);

  }

  static getXmlTemplate() {
    if (GFDrawio._xmlTemplate) {
      return GFDrawio._xmlTemplate;
    }
    const url = `${GFPlugin.getRootPath()}${GFCONSTANT.CONF_FILE_DEFAULTDIO}`;
    return GFDrawio.loadFile(url).then((txt) => {
      GFDrawio._xmlTemplate = txt;
      return txt;
    });
  }

  static getCsvTemplate() {
    if (GFDrawio._csvTemplate) {
      return GFDrawio._csvTemplate;
    }
    const url = `${GFPlugin.getRootPath()}${GFCONSTANT.CONF_FILE_DEFAULTCSV}`;
    return GFDrawio.loadFile(url).then((txt) => {
      GFDrawio._csvTemplate = txt;
      return txt;
    });
  }

  static async loadFile(url: string) {
    try {
      const resp = await fetch(url);
      const txt = await resp.text();
      return txt;
    } catch (error) {
      throw new Error(`Can't load file ${url} : ${error}`);
    }
  }



  //############################################################################
  //### PRIVATE
  //############################################################################

  private static _getDefaultRequiredOptions(): DrawioRequiredOptions {
    return {
      mode: 'server',
      libLoad: true,
      libLocal: `./src/${GFCONSTANT.CONF_FILE_DRAWIOLIB}`,
      libServer: `${GFPlugin.getRootPath()}/${GFCONSTANT.CONF_FILE_DRAWIOLIB}`,
    };
  }

  private static async _loadLocal() {
    let source: string = this.options.libLocal ? this.options.libLocal : '';
    return new Promise<string>((resolve, reject) => {
      readFile(source, (error, data) => {
        resolve(data.toString());
      });
    });
  }

  private static async _evalLib(code: string) {
    // globalThis.eval(code);
    // const evalfunc = new Function(code);
    // Function.call(evalfunc)
    if (GFDrawio.options.mode === 'local') {
      globalThis.eval(code);
    } else {
      globalThis.eval(code);
    }
    GFDrawio._libInitialized = true;
    GFDrawio.events.emit('drawio_initialized');
  }

  private static async _loadServer() {
    if (!this._libInitialized && this.options.libServer) {
      const url = this.options.libServer;
      return fetch(url)
        .then((res: Response) => {
          return res.text();
        })
        .catch((error) => {
          _log(error);
        });
    }
  }

  private static async _customization() {
    mxcustom.customize();
    mxTooltipHandler.prototype.delay = GFCONSTANT.CONF_TOOLTIPS_DELAY;
  }

  private static async _preLoad() {
    const globalDio: any = globalThis;
    globalDio.BASE_PATH = GFPlugin.getMxBasePath();
    globalDio.RESOURCES_PATH = GFPlugin.getMxResourcePath();
    globalDio.RESOURCE_BASE = GFPlugin.getMxResourcePath();
    globalDio.STENCIL_PATH = GFPlugin.getStencilsPath();
    globalDio.SHAPES_PATH = GFPlugin.getShapesPath();
    globalDio.IMAGE_PATH = GFPlugin.getMxImagePath();
    globalDio.STYLE_PATH = GFPlugin.getMxStylePath();
    globalDio.CSS_PATH = GFPlugin.getMxCssPath();
    globalDio.mxLanguages = ['en'];
    globalDio.DRAWIO_BASE_URL = GFPlugin.getDrawioPath(); // Replace with path to base of deployment, e.g. https://www.example.com/folder
    globalDio.DRAW_MATH_URL = GFPlugin.getDrawioPath(); // Replace with path to base of deployment, e.g. https://www.example.com/folder
    globalDio.DRAWIO_VIEWER_URL = GFPlugin.getDrawioPath() + 'viewer.min.js'; // Replace your path to the viewer js, e.g. https://www.example.com/js/viewer.min.js
    globalDio.DRAW_MATH_URL = GFPlugin.getDrawioPath() + 'math/';
    globalDio.DRAWIO_CONFIG = null; // Replace with your custom draw.io configurations. For more details, https://desk.draw.io/support/solutions/articles/16000058316
    const urlParams = {
      sync: 'none', // Disabled realtime
      lightbox: '1', // Uses lightbox in chromeless mode (larger zoom, no page visible, chromeless)
      nav: '1', // Enables folding in chromeless mode
      local: '1', // Uses device mode only
      embed: '1', // Runs in embed mode
      ui: 'min',
    };
    globalDio.urlParams = urlParams;
    globalDio.mxImageBasePath = GFPlugin.getMxImagePath();
    globalDio.mxBasePath = GFPlugin.getMxBasePath();
    globalDio.mxLoadStylesheets = true;
    globalDio.mxLanguage = 'en';
    globalDio.mxLoadResources = true;
  }

  private static async _postLoad() {
    const globalDio: any = globalThis;
    globalDio.mxClient.mxBasePath = GFPlugin.getMxBasePath();
    globalDio.mxClient.mxImageBasePath = GFPlugin.getMxImagePath();
    globalDio.mxClient.mxLoadResources = true;
    globalDio.mxClient.mxLanguage = 'en';
    globalDio.mxClient.mxLoadStylesheets = true;
    globalDio.VSD_CONVERT_URL = null;
    globalDio.EMF_CONVERT_URL = null;
    globalDio.ICONSEARCH_PATH = null;
  }

  //############################################################################
  //### UTILS
  //############################################################################
  static parseXml(xmlString: string): Document {
    var parser = new DOMParser();
    return parser.parseFromString(xmlString, 'text/xml');
  }

  /**
   * drawio context source
   * @param  {Object} node
   * @returns string
   */
  static getTextContent(node: Object): string {
    const _node: any = node;
    return _node != null ? _node[_node.hasOwnProperty('textContent') === undefined ? 'text' : 'textContent'] : '';
  }

  /**
   * Valided XML definition
   *
   * @static
   * @param {string} source
   * @returns
   * @memberof XGraph
   */
  static isValidXml(source: string) {
    try {
      const div = document.createElement('div');
      const g = new Graph(div);
      if (GFDrawio.isEncoded(source)) {
        source = GFDrawio.decode(source);
      }
      const xmlDoc = mxUtils.parseXml(source);
      const codec = new mxCodec(xmlDoc);
      g.getModel().beginUpdate();
      codec.decode(xmlDoc.documentElement, g.getModel());
      g.getModel().endUpdate();
      g.destroy();
      return true;
    } catch (error) {
      GFLog.error('isValidXml', error);
      return false;
    }
  }

  static decode(data: string): string {
    try {
      let node = this.parseXml(data).documentElement;
      if (node != null && node.nodeName === 'mxfile') {
        var diagrams = node.getElementsByTagName('diagram');
        if (diagrams.length > 0) {
          data = this.getTextContent(diagrams[0]);
        }
      }
    } catch (e) {
      // GFLog.error(`parseXml : Unable to decode ${data}`);
      throw new Error("parseXml : Unable to decode");

      return '';
    }
    // data = atob(data);
    data = Buffer.from(data, 'base64').toString('binary');
    if (data.length > 0) {
      try {
        data = inflateRaw(
          Uint8Array.from(data, (c) => c.charCodeAt(0)),
          { to: 'string' }
        );
      } catch (e) {
        // GFLog.error(`Pako : Unable to decode ${data}`);
        throw new Error("Pako : Unable to decode");
      }
    }

    try {
      data = decodeURIComponent(data);
    } catch (e) {
      GFLog.error(`Unable to decode ${data}`);
      return '';
    }
    return data;
  }

  static encode(data: string) {
    {
      try {
        data = encodeURIComponent(data);
      } catch (e) {
        GFLog.error(`Unable to encode/encodeURIComponent : ${data}`, e);
        return;
      }
      if (data.length > 0) {
        try {
          let deflateRaws = deflateRaw(data);
          data = String.fromCharCode.apply(null, new Array(...deflateRaws));
        } catch (e) {
          console.error(e);
          GFLog.error(`Unable to encode ${data}`);
          return '';
        }
      }

      try {
        data = Buffer.from(data, 'binary').toString('base64');
      } catch (e) {
        GFLog.error(`Unable to encode ${data}`);
        return;
      }

      return data;
    }
  }

  static isEncoded(data: string) {
    try {
      GFDrawio.decode(data);
    } catch (error) {
      return false;
    }
    return true;
  }
}
