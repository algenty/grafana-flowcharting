const pako = require('pako');
const vkbeautify = require('vkbeautify');
const safeEval = require('safe-eval');

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
  },

  decode(data, encode, deflate, base64) {
    try {
      const node = this.parseXml(data).documentElement;

      if (node != null && node.nodeName === 'mxfile') {
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
    if (mess) {
      console.log(mess);
    }
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

  matchString(str, pattern, regex = true) {
    if (str === null || str === undefined || pattern === null || pattern === undefined || str.length === 0 || pattern.length === 0) {
      return false;
    }
    if (str === pattern) {
      return true;
    }
    if (regex) {
      const regex = this.stringToJsRegex(pattern);
      return str.toString().match(regex);
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

  // getRatioColor(ratio, colorStart, colorEnd) {
  //   // Get the smaller number to clamp at 0.999 max
  //   ratio = Math.min(0.999, ratio);
  //   // Get the larger number to clamp at 0.001 min
  //   ratio = Math.max(0.001, ratio);
  //   let start = colorconv(colorEnd, 'uint8');
  //   let end = colorconv(colorStart, 'uint8');
  //   let c = [];
  //   c[0] = Math.round(start[0] * ratio + (1 - ratio) * end[0]);
  //   c[1] = Math.round(start[1] * ratio + (1 - ratio) * end[1]);
  //   c[2] = Math.round(start[2] * ratio + (1 - ratio) * end[2]);
  //   c[3] = start[3] * ratio + (1 - ratio) * end[3];
  //   return `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
  // },

  // getStepColors(colorStart, colorEnd, colorCount) {
  //   // The beginning of your gradient
  //   let start = colorconv(colorStart, 'uint8');
  //   console.log('colorconv start', colorStart);
  //   console.log('Color start', Color(colorStart).array());
  //   let end = colorconv(colorEnd, 'uint8');
  //   console.log('colorconv end', colorEnd);
  //   console.log('Color end', Color(colorEnd).array());
    
  //   // The number of colors to compute
  //   var len = colorCount;

  //   //Alpha blending amount
  //   var alpha = 0.0;

  //   var saida = [];

  //   for (i = 0; i < len; i++) {
  //     var c = [];
  //     alpha += 1.0 / len;

  //     c[0] = Math.round(start[0] * alpha + (1 - alpha) * end[0]);
  //     c[1] = Math.round(start[1] * alpha + (1 - alpha) * end[1]);
  //     c[2] = Math.round(start[2] * alpha + (1 - alpha) * end[2]);
  //     c[3] = start[3] * alpha + (1 - alpha) * end[3];

  //     saida.push(Color(`rgba(${c[0]},${c[1]},${c[2]},${c[3]})`).hex());
  //   }

  //   return saida;
  // },

  prettifyJSON(text) {
    try {
      return vkbeautify.json(text);
    } catch (error) {
      this.log(3, 'Error in prettify', error);
      return text;
    }
  },

  addScript(src) {
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', src);
    var r = false;

    // if (id != null) {
    //   s.setAttribute('id', id);
    // }

    // if (dataAppKey != null) {
    //   s.setAttribute('data-app-key', dataAppKey);
    // }

    // if (window.onLoad != null) {
    //   s.onload = s.onreadystatechange = function () {
    //     if (!r && (!this.readyState || this.readyState === 'complete')) {
    //       r = true;
    //       onLoad();
    //     }
    //   };
    // }

    var t = document.getElementsByTagName('script')[0];

    if (t != null) {
      t.parentNode.insertBefore(s, t);
    }
  },

  loadJS(fname) {
    try {
      var code = this.loadFile(fname)
      if (code) {
        this.evalRaw(code);
        // console.info('LoadJS called succesfully', fname);
      }
    } catch (e) {
      if (window.console != null) {
        console.error('LoadJS failed:', fname, e);
      }
    }
  },

  loadFile(fname) {
    try {
      var req = mxUtils.load(fname);
      if (req != null && req.getStatus() >= 200 && req.getStatus() <= 299) {
        // console.info('loadFile called succesfully', fname);
        return req.getText();
      }
    } catch (e) {
      if (window.console != null) {
        console.error('Error loadFile:', fname, e);
      }
    }
  },

  $loadFile(fname) {
    let result;
    $.ajax({
      type: 'GET',
      url: fname,
      async: false,
      success: data => {
        result = data;
      },
      error: error => {
        console.log('Error when download ' + fname), error;
      },
    });
    return result;
  },

  evalRaw(code) {
    try {
      eval.call(window, code);
      // console.info('eval.call succesfully');
    } catch (e) {
      if (window.console != null) {
        console.error('Error eval.call : ', e);
      }
    }
  },

  evalIt(code) {
    let result = code;
    try {
      result = safeEval(code);
    } catch (error) {
      result = code;
    }
    return result;
  },

  getfileContent(url) {
    let result;
    const request = async () => {
      const response = await fetch(url);
      const result = await response.text();
      console.log(getfileContent, url, result);
    };
    request();
    return result;
  },
};
