"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graph_class = _interopRequireDefault(require("./graph_class"));

var _statesHandler = _interopRequireDefault(require("./statesHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Flowchart =
/*#__PURE__*/
function () {
  /** @ngInject */
  function Flowchart(name, xmlGraph, container, data) {
    _classCallCheck(this, Flowchart);

    u.log(1, "flowchart[".concat(name, "].constructor()"));
    this.data = data;
    this.data.name = name;
    this.data.xml = xmlGraph;
    this.container = container;
    this.xgraph = undefined;
    this.stateHandler = undefined;
    this.import(data);
    this.init();
  }

  _createClass(Flowchart, [{
    key: "import",
    value: function _import(obj) {
      u.log(1, "flowchart[".concat(this.data.name, "].import()"));
      u.log(0, "flowchart[".concat(this.data.name, "].import() obj"), obj);
      if (obj.source) this.data.type = obj.source.type;else this.data.type = obj.type || this.data.type || 'xml';
      if (obj.source) this.data.xml = obj.source.xml.value;else this.data.xml = obj.xml || this.data.xml || '';
      if (obj.source) this.data.url = obj.source.url.value;else this.data.url = 'http://<source>:<port>/<pathToXml>';
      if (obj.options) this.data.zoom = obj.options.zoom;else this.data.zoom = obj.zoom || '100%';
      if (obj.options) this.data.center = obj.options.center;else this.data.center = obj.center || true;
      if (obj.options) this.data.scale = obj.options.scale;else this.data.scale = obj.scale || true;
      if (obj.options) this.data.lock = obj.options.lock;else this.data.lock = obj.lock || true;
      if (obj.options) this.data.grid = obj.options.grid;else this.data.grid = obj.grid || false;
      if (obj.options) this.data.bgColor = obj.options.bgColor;else this.data.bgColor = obj.bgColor || undefined;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "init",
    value: function init() {
      u.log(1, "flowchart[".concat(this.data.name, "].init()"));
      this.xgraph = new _graph_class.default(this.container, this.data.xml);

      if (this.data.xml !== undefined && this.data.xml !== null) {
        this.xgraph.drawGraph();
        if (this.data.scale) this.xgraph.scaleGraph(true);
        if (this.data.center) this.xgraph.centerGraph(true);
        if (this.data.lock) this.xgraph.lockGraph(true);
        this.stateHandler = new _statesHandler.default(this.xgraph);
      } else {
        u.log(3, 'XML Graph not defined');
      }
    }
  }, {
    key: "setStates",
    value: function setStates(rules, series) {
      u.log(1, "flowchart[".concat(this.data.name, "].setStates()"));
      u.log(0, "flowchart[".concat(this.data.name, "].setStates() rules"), rules);
      u.log(0, "flowchart[".concat(this.data.name, "].setStates() series"), series);
      if (rules === undefined) u.log(3, "Rules shoudn't be null");
      if (series === undefined) u.log(3, "Series shoudn't be null");
      this.stateHandler.setStates(rules, series);
    }
  }, {
    key: "applyStates",
    value: function applyStates() {
      u.log(1, "flowchart[".concat(this.data.name, "].applyStates()"));
      this.stateHandler.applyStates();
    }
  }, {
    key: "refresh",
    value: function refresh(width, height) {
      u.log(1, "flowchart[".concat(this.data.name, "].refresh()"));
      if (width !== undefined && width != null) this.setWidth(width);
      if (height !== undefined && height != null) this.setHeight(height);
      this.xgraph.refreshGraph(this.width, this.height);

      if (this.data.scale) {
        this.xgraph.unzoomGraph();
        this.xgraph.scaleGraph(this.data.scale);
      } else {
        this.xgraph.zoomGraph(this.data.zoom);
        this.xgraph.lockGraph(this.data.lock);
        this.xgraph.centerGraph(this.data.center);
      }
    }
  }, {
    key: "redraw",
    value: function redraw(xmlGraph) {
      u.log(1, "flowchart[".concat(this.data.name, "].redraw()"));
      if (xmlGraph !== undefined) this.data.xml = xmlGraph;
      this.init();
      this.reflesh();
    }
  }, {
    key: "setWidth",
    value: function setWidth(width) {
      this.width = width;
    }
  }, {
    key: "setHeight",
    value: function setHeight(height) {
      this.height = height;
    }
  }, {
    key: "setXml",
    value: function setXml(xml) {
      this.data.xml = xml;
    }
  }, {
    key: "minify",
    value: function minify() {
      this.data.xml = u.minify(this.data.xml);
    }
  }, {
    key: "prettify",
    value: function prettify() {
      this.data.xml = u.prettify(this.data.xml);
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }
  }]);

  return Flowchart;
}();

exports.default = Flowchart;
//# sourceMappingURL=flowchart_class.js.map
