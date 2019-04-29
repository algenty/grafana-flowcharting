"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var plugin = {};
plugin.dirname = __dirname;
$.getJSON("".concat(plugin.dirname, "/plugin.json"), function (data) {
  plugin.data = data;
  console.log("data ", data);
});

plugin.getRootPath = function () {
  return plugin.dirname;
};

debugger;
window.GF_PLUGIN = window.GF_PLUGIN || plugin;
var _default = {
  plugin: plugin
};
exports.default = _default;
//# sourceMappingURL=plugin.js.map
