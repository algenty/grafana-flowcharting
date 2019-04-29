"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var plugin = {};
plugin.dirname = "".concat(__dirname, "/");
plugin.repository = 'https://algenty.github.io/flowcharting-repository/';
plugin.mxBasePath = "".concat(plugin.dirname, "libs/mxgraph/javascript/dist/");
plugin.mxImagePath = "".concat(plugin.mxBasePath, "images/");
plugin.partialPath = "".concat(plugin.dirname, "/partials/");
plugin.data = {};
$.ajaxSetup({
  async: false
});
$.getJSON("".concat(plugin.dirname, "/plugin.json"), function (data) {
  plugin.data = data;
});

plugin.getRootPath = function () {
  return this.dirname;
};

plugin.getMxBasePath = function () {
  return this.mxBasePath;
};

plugin.getMxImagePath = function () {
  return this.mxImagePath;
};

plugin.getName = function () {
  return this.data.id;
};

plugin.getPartialPath = function () {
  return this.partialPath;
};

plugin.popover = function (text, tagBook, tagImage) {
  var url = this.repository;
  var images = "".concat(this.repository, "images/");
  var textEncoded = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  var result = "".concat(textEncoded, "<br /><br />");
  if (tagBook) result = "".concat(result, "<a href=\"").concat(url).concat(tagBook, "\" target=\"_blank\"><i class=\"fa fa-book fa-fw\"></i>Help</a>");
  if (tagImage) result = "".concat(result, "<a href=\"").concat(images).concat(tagImage, ".png\" target=\"_blank\"><i class=\"fa fa-image fa-fw\"></i>Example</a>");
  return result;
};

window.GF_PLUGIN = window.GF_PLUGIN || plugin;
var _default = {
  plugin: plugin
};
exports.default = _default;
//# sourceMappingURL=plugin.js.map
