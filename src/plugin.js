const plugin = {};
plugin.dirname = `${__dirname}/`;
plugin.repository = 'https://algenty.github.io/flowcharting-repository/';
plugin.mxBasePath = `${plugin.dirname}libs/mxgraph/javascript/dist/`;
plugin.mxImagePath = `${plugin.mxBasePath}images/`;
plugin.partialPath = `${plugin.dirname}/partials/`;
plugin.data = {};

$.ajaxSetup({
  async: false,
});

$.getJSON(`${plugin.dirname}/plugin.json`, (data) => {
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
  const url = this.repository;
  const images = `${this.repository}images/`;
  const textEncoded = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let result = `${textEncoded}<br /><br />`;
  if (tagBook) result = `${result}<a href="${url}${tagBook}" target="_blank"><i class="fa fa-book fa-fw"></i>Help</a>`;
  if (tagImage) result = `${result}<a href="${images}${tagImage}.png" target="_blank"><i class="fa fa-image fa-fw"></i>Example</a>`;
  return result;
};

plugin.logLevel = 2;
plugin.logDisplay = true;

window.GF_PLUGIN = window.GF_PLUGIN || plugin;
export default { plugin };
