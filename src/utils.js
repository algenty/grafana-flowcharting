const pako = require('pako');
const vkbeautify = require('vkbeautify');


// sources :
// https://jgraph.github.io/drawio-tools/tools/convert.html

module.exports = {
  stringToBytes(str) {
    var arr = new Array(str.length);

    for (var i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i);
    }

    return arr;
  },
  bytesToString(arr) {
    var str = "";

    for (var i = 0; i < arr.length; i++) {
      str += String.fromCharCode(arr[i]);
    }

    return str;
  },
  encode(data, encode, deflate, base64) {
    if (encode) {
      try {
        data = encodeURIComponent(data);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (deflate && data.length > 0) {
      try {
        data = this.bytesToString(pako.deflateRaw(data));
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (base64) {
      try {
        data = btoa(data);
      } catch (e) {
        console.error(e);
        return;
      }
    }
    return data;
  },

  removeLinebreaks(data) {
    return data.replace(/(\r\n|\n|\r)/gm, "");
  },

  isencoded(data) {
    try {
      var node = this.parseXml(data).documentElement;
      if (node != null && node.nodeName == "mxfile") {
        var diagrams = node.getElementsByTagName("diagram");
        if (diagrams.length > 0) {
          return true;
        }
      } else return (data.indexOf('mxGraphModel') == -1);
    } catch (error) {
      return true;
    }
    return false;
  },

  decode(data, encode, deflate, base64) {
    try {
      var node = this.parseXml(data).documentElement;

      if (node != null && node.nodeName == "mxfile") {
        var diagrams = node.getElementsByTagName("diagram");

        if (diagrams.length > 0) {
          data = this.getTextContent(diagrams[0]);
        }
      }
    } catch (e) {
      // ignore
    }

    if (base64) {
      try {
        data = atob(data);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (deflate && data.length > 0) {
      try {
        data = this.bytesToString(pako.inflateRaw(data));
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (encode) {
      try {
        data = decodeURIComponent(data);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    return data;
  },

  parseXml(xml) {
    if (window.DOMParser) {
      var parser = new DOMParser();

      return parser.parseFromString(xml, "text/xml");
    } else {
      var result = createXmlDocument();

      result.async = "false";
      result.loadXML(xml);

      return result;
    }
  },

  createXmlDocument() {
    var doc = null;

    if (document.implementation && document.implementation.createDocument) {
      doc = document.implementation.createDocument("", "", null);
    } else if (window.ActiveXObject) {
      doc = new ActiveXObject("Microsoft.XMLDOM");
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
    return node != null
      ? node[node.textContent === undefined ? "text" : "textContent"]
      : "";
  },

  normalizeXml(data) {
    try {
      var str = data;
      str = str.replace(/>\s*/g, ">"); // Replace "> " with ">"
      str = str.replace(/\s*</g, "<"); // Replace "< " with "<"
      return data;
    } catch (e) {
      return;
    }
  },

  uniqueID() {
    function chr4() {
      return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
      '-' + chr4() +
      '-' + chr4() +
      '-' + chr4() +
      '-' + chr4() + chr4() + chr4();
  },

  stringToJsRegex(str) {
    if (str[0] !== "/") {
      return new RegExp("^" + str + "$");
    }
    const match = str.match(new RegExp("^/(.*?)/(g?i?m?y?)$"));
    return new RegExp(match[1], match[2]);
  }, 

  matchString(str,pattern) {
    if(str === undefined || pattern === undefined || str.length === 0 || pattern.length === 0) {
      u.log(0,"Match str="+str+" pattern="+pattern, false);
      return false;
    }
    const regex = this.stringToJsRegex(pattern);
    let matching = str.toString().match(regex);
    if (str === pattern || matching) {
      u.log(0,"Match str="+str+" pattern="+pattern, true);
      return true;
    }
  },

  minify(text) {
    try {
      return vkbeautify.xmlmin(text,false);
    } catch (error) {
      this.log(3,"Error in minify",error);
      return text;
    }
  },

  prettify(text) {
    try {
      return vkbeautify.xml(text);
    } catch (error) {
      this.log(3,"Error in prettify",error);
      return text;
    }
  },

  log(level,title,obj) {
    // 0 : DEBUG
    // 1 : INFO
    // 2 : WARN
    // 3 : ERROR
    if(logDisplay != undefined && logDisplay === true) {
      if(logLevel != undefined && level >= logLevel) {
        if(level == 0) console.debug("DEBUG : "+title,obj)
        if(level == 1)  console.info(" INFO : "+title,obj)
        if(level == 2)  console.warn(" WARN : "+title,obj)
        if(level == 3) console.error("ERROR : "+title,obj)
      }
    }
  }
};
