import { GFLog } from "globals_class";
import { inflateRaw, deflateRaw } from 'pako';

export class GFDrawio {
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
