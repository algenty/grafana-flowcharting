const plugin = {};
plugin.dirname = __dirname;

$.getJSON(`${plugin.dirname}/plugin.json`, (data) => {
  plugin.data = data;
  console.log("data ", data);

});

plugin.getRootPath = function () {
  return plugin.dirname;
};

debugger;
window.GF_PLUGIN = window.GF_PLUGIN || plugin;
export default { plugin };
