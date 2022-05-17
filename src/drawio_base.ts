import { GFCONSTANT, GFLog, GFPlugin } from 'globals_class';
import { inflateRaw, deflateRaw } from 'pako';
import { readFile } from 'fs';
import { GFEvents } from 'flowcharting_base';

const _DEBUG = true;
const _log = (...args: unknown[]) => {
  if (_DEBUG) {
    console.log(args);
  }
};

const gfdrawioSignalsArray = ['drawio_initialized'] as const;
type GFDrawioSignals = typeof gfdrawioSignalsArray[number];


export interface DrawioOptions {
  mode?: 'local' | 'server';
  libLoad?: boolean;
  libLocal?: string;
  libServer?: string;
}
export class GFDrawio {
  static GFInitialized = false;
  static libInitialized = false;
  static libLoaded = false;
  static libPromize: Promise<unknown> | undefined;
  static libContent: string;
  static options: DrawioOptions;
  static events: GFEvents<GFDrawioSignals> = GFEvents.create(gfdrawioSignalsArray)

  static init(options?: DrawioOptions) {
    _log('📋', this.constructor.name, options);
    this.GFInitialized = true;
    this.options = Object.assign(this._getDefaultOptions(), options);
  }

  private static _getDefaultOptions(): DrawioOptions {
    return {
      mode: 'server',
      libLoad: true,
      libLocal: `./src/${GFCONSTANT.CONF_FILE_DRAWIOLIB}`,
      libServer: `${GFPlugin.getRootPath()}/${GFCONSTANT.CONF_FILE_DRAWIOLIB}`,
    };
  }

  static async loadLibs() {
    if (!GFDrawio.GFInitialized) {
      GFDrawio.init();
    }
    let result: Promise<any>;
    if (GFDrawio.options.mode === 'local') {
      result = GFDrawio._loadLocal();
    } else {
      result = GFDrawio._loadServer();
    }
    return result.then((code) => {
      GFDrawio.libLoaded = true;
      if (typeof code === 'string') {
        return GFDrawio._evalLib(code);
      }
      return;
    });
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
    globalThis.eval(code);
    // const evalfunc = new Function(code);
    // evalfunc();
    GFDrawio.libInitialized = true;
    console.log(globalThis);
  }

  private static async _loadServer() {
    if (!this.libInitialized && this.options.libServer) {
      const url = this.options.libServer;
      return fetch(url).then( (res: Response) => {
        return res.text();
      }).catch((error)=>{
        _log(error)
      })
    }
    return;
  }

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
    // TODO : fixit
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
      GFLog.error(`parseXml : Unable to decode ${data}`);
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
        GFLog.error(`Pako : Unable to decode ${data}`);
        return '';
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
          console.log(e);
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
      const node = this.parseXml(data).documentElement;
      if (node != null && node.nodeName === 'mxfile') {
        const diagrams = node.getElementsByTagName('diagram');
        if (diagrams.length > 0) {
          return true;
        }
      } else {
        return data.indexOf('mxGraphModel') === -1;
      }
    } catch (error) {
      return true;
    }
    return false;
  }
}
