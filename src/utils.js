const pako = require('pako');
const vkbeautify = require('vkbeautify');
const colorconv = require('color-normalize');
const marky = require('marky');

// sources :
// https://jgraph.github.io/drawio-tools/tools/convert.html

module.exports = {
  stringToBytes(str) {
    const arr = new Array(str.length);

    for (let i = 0; i < str.length; i += 1) {
      arr[i] = str.charCodeAt(i);
    }

    return arr;
  },
  bytesToString(arr) {
    let str = '';

    for (let i = 0; i < arr.length; i += 1) {
      str += String.fromCharCode(arr[i]);
    }
    return str;
  },
  encode(data, encode, deflate, base64) {
    let result = data;
    if (encode) {
      try {
        result = encodeURIComponent(result);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (deflate && result.length > 0) {
      try {
        result = this.bytesToString(pako.deflateRaw(result));
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (base64) {
      try {
        result = btoa(result);
      } catch (e) {
        console.error(e);
        return;
      }
    }
    return result;
  },

  removeLinebreaks(data) {
    return data.replace(/(\r\n|\n|\r)/gm, '');
  },

  isencoded(data) {
    try {
      const node = this.parseXml(data).documentElement;
      if (node != null && node.nodeName == 'mxfile') {
        const diagrams = node.getElementsByTagName('diagram');
        if (diagrams.length > 0) {
          return true;
        }
      } else return data.indexOf('mxGraphModel') == -1;
    } catch (error) {
      return true;
    }
    return false;
  },

  decode(data, encode, deflate, base64) {
    try {
      const node = this.parseXml(data).documentElement;

      if (node != null && node.nodeName == 'mxfile') {
        const diagrams = node.getElementsByTagName('diagram');

        if (diagrams.length > 0) {
          data = this.getTextContent(diagrams[0]);
        }
      }
    } catch (e) {
      // ignore
    }

    if (base64) {
      data = atob(data);
    }

    if (deflate && data.length > 0) {
      data = this.bytesToString(pako.inflateRaw(data));
    }

    if (encode) {
      data = decodeURIComponent(data);
    }

    return data;
  },

  parseXml(xml) {
    if (window.DOMParser) {
      const parser = new DOMParser();

      return parser.parseFromString(xml, 'text/xml');
    }
    const result = this.createXmlDocument();
    result.async = 'false';
    result.loadXML(xml);
    return result;
  },

  createXmlDocument() {
    let doc = null;

    if (document.implementation && document.implementation.createDocument) {
      doc = document.implementation.createDocument('', '', null);
    } else if (window.ActiveXObject) {
      doc = new ActiveXObject('Microsoft.XMLDOM');
    }

    return doc;
  },

  decodeFromUri(data) {
    try {
      data = decodeURIComponent(data);
    } catch (e) {
      console.error(e);
      return;
    }
    return data;
  },

  getTextContent(node) {
    return node != null ? node[node.textContent === undefined ? 'text' : 'textContent'] : '';
  },

  normalizeXml(data) {
    try {
      let str = data;
      str = str.replace(/>\s*/g, '>'); // Replace "> " with ">"
      str = str.replace(/\s*</g, '<'); // Replace "< " with "<"
      return data;
    } catch (e) {
      return;
    }
  },

  async sleep(ms, mess) {
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await delay(ms);
    if (mess) console.log(mess);
  },

  uniqueID() {
    function chr4() {
      return Math.random()
        .toString(16)
        .slice(-4);
    }
    return `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
  },

  stringToJsRegex(str) {
    if (str[0] !== '/') {
      return new RegExp(`^${str}$`);
    }
    const match = str.match(new RegExp('^/(.*?)/(g?i?m?y?)$'));
    return new RegExp(match[1], match[2]);
  },

  matchString(str, pattern) {
    if (str === null || str === undefined || pattern === null || pattern === undefined || str.length === 0 || pattern.length === 0) {
      // GFP.log.debug( `Match str=${str} pattern=${pattern}`, false);
      return false;
    }
    if (str === pattern) return true;
    const regex = this.stringToJsRegex(pattern);
    const matching = str.toString().match(regex);
    if (matching) {
      // GFP.log.debug( `Match str=${str} pattern=${pattern}`, true);
      return true;
    }
    return false;
  },

  minify(text) {
    try {
      return vkbeautify.xmlmin(text, false);
    } catch (error) {
      this.log(3, 'Error in minify', error);
      return text;
    }
  },

  prettify(text) {
    try {
      return vkbeautify.xml(text);
    } catch (error) {
      this.log(3, 'Error in prettify', error);
      return text;
    }
  },

  getRatioColor(ratio, colorStart, colorEnd) {

    // Get the smaller number to clamp at 0.999 max
    ratio = Math.min(0.999, ratio);
    // Get the larger number to clamp at 0.001 min
    ratio = Math.max(0.001, ratio);
    let start = colorconv(colorEnd, 'uint8');
    let end = colorconv(colorStart, 'uint8');
    let c = [];
    c[0] = start[0] * ratio + (1 - ratio) * end[0];
    c[1] = start[1] * ratio + (1 - ratio) * end[1];
    c[2] = start[2] * ratio + (1 - ratio) * end[2];
    c[3] = start[3] * ratio + (1 - ratio) * end[3];
    return `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
  },

  getStepColors(colorStart, colorEnd, colorCount) {
    // The beginning of your gradient
    let start = colorconv(colorStart, 'uint8');
    let end = colorconv(colorEnd, 'uint8');
    // The number of colors to compute
    var len = colorCount;

    //Alpha blending amount
    var alpha = 0.0;

    var saida = [];

    for (i = 0; i < len; i++) {
      var c = [];
      alpha += 1.0 / len;

      c[0] = start[0] * alpha + (1 - alpha) * end[0];
      c[1] = start[1] * alpha + (1 - alpha) * end[1];
      c[2] = start[2] * alpha + (1 - alpha) * end[2];
      c[3] = start[3] * alpha + (1 - alpha) * end[3];

      saida.push(`rgba(${c[0]},${c[1]},${c[2]},${c[3]})`);
    }

    return saida;
  },

  prettifyJSON(text) {
    try {
      return vkbeautify.json(text);
    } catch (error) {
      this.log(3, 'Error in prettify', error);
      return text;
    }
  },

  getMarky() {
    return marky;
  },

  loadJS(fname) {
    try {
      var req = mxUtils.load(fname);
      if (req != null && req.getStatus() >= 200 && req.getStatus() <= 299) {
        eval.call(window, req.getText());
        console.info('eval.call succesfully', fname);
      }
    }
    catch (e) {
      if (window.console != null) {
        console.error('Error eval.call:', fname, e);
      }
    }
  },

  loadJS_2(fnames) {
    let fetchs = []
    fnames.forEach(fn => {
      fetchs.push(
        fetch(fn).then((response) => {
          return response.text();
        }).then((text) => {
          try {
            eval.call(window, text);
            console.info(`${fn} eval with success`);
          } catch (error) {
            console.error(`Unable to eval ${fn}`);
          }
        }).catch((error) => {
          console.error(`Unable to load ${fn}`, error);
        })
      )
    });
    return Promise.all(fetchs);
  },

  getfileContent(url) {
    let result;
    const request = async () => {
      const response = await fetch(url);
      const result = await response.text();
      console.log(getfileContent, url, result);
    }
    request();
    return result;
  }
};
