"use strict";

var pako = require("pako"); // sources :
// https://jgraph.github.io/drawio-tools/tools/convert.html


module.exports = {
  stringToBytes: function stringToBytes(str) {
    var arr = new Array(str.length);

    for (var i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i);
    }

    return arr;
  },
  bytesToString: function bytesToString(arr) {
    var str = "";

    for (var i = 0; i < arr.length; i++) {
      str += String.fromCharCode(arr[i]);
    }

    return str;
  },
  encode: function encode(data, _encode, deflate, base64) {
    if (_encode) {
      try {
        data = encodeURIComponent(data);
        return data;
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (deflate && data.length > 0) {
      try {
        data = bytesToString(pako.deflateRaw(data));
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
  removeLinebreaks: function removeLinebreaks(data) {
    return data.replace(/(\r\n|\n|\r)/gm, "");
  },
  isencoded: function isencoded(data) {
    try {
      var node = parseXml(data).documentElement;

      if (node != null && node.nodeName == "mxfile") {
        var diagrams = node.getElementsByTagName("diagram");

        if (diagrams.length > 0) {
          return true;
        }
      } else return false;
    } catch (error) {
      return false;
    }

    return false;
  },
  decode: function decode(data, encode, deflate, base64) {
    try {
      var node = this.parseXml(data).documentElement;

      if (node != null && node.nodeName == "mxfile") {
        var diagrams = node.getElementsByTagName("diagram");

        if (diagrams.length > 0) {
          data = this.getTextContent(diagrams[0]);
        }
      }
    } catch (e) {// ignore
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
  parseXml: function parseXml(xml) {
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
  createXmlDocument: function createXmlDocument() {
    var doc = null;

    if (document.implementation && document.implementation.createDocument) {
      doc = document.implementation.createDocument("", "", null);
    } else if (window.ActiveXObject) {
      doc = new ActiveXObject("Microsoft.XMLDOM");
    }

    return doc;
  },
  decodeFromUri: function decodeFromUri(data) {
    try {
      data = decodeURIComponent(data);
    } catch (e) {
      console.error(e);
      return;
    }

    return data;
  },
  getTextContent: function getTextContent(node) {
    return node != null ? node[node.textContent === undefined ? "text" : "textContent"] : "";
  },
  normalizeXml: function normalizeXml(data) {
    try {
      var str = data;
      str = str.replace(/>\s*/g, ">"); // Replace "> " with ">"

      str = str.replace(/\s*</g, "<"); // Replace "< " with "<"

      return data;
    } catch (e) {
      return;
    }
  }
};
