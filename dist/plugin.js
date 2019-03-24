"use strict";

// var plugin
// $.getJSON("public/plugins/" + "agenty-flowcharting-panel" + "/plugin.json","json", function(data) {plugin=data})
// console.log(plugin)
// debugger
// export {plugin};
var plugin = {
  "type": "panel",
  "name": "FlowCharting",
  "id": "agenty-flowcharting-panel",
  "info": {
    "description": "FlowCharting panel for grafana",
    "author": {
      "name": "Arnaud GENTY",
      "url": "https://github.com/algenty/grafana-flowcharting"
    },
    "contributors": ["Jeremy Branham (https://www.linkedin.com/in/jeremybranham/)"],
    "keywords": ["flowchart", "panel", "diagram", "mxgraph"],
    "links": [{
      "name": "Project site",
      "url": "https://github.com/algenty/grafana-flowcharting"
    }, {
      "name": "Apache License",
      "url": "https://github.com/algenty/grafana-flowcharting/blob/master/LICENSE"
    }],
    "version": "0.0.1",
    "updated": "2019-01-26",
    "logos": {
      "small": "img/agenty-flowcharting.svg",
      "large": "img/agenty-flowcharting.svg"
    }
  },
  "dependencies": {
    "grafanaVersion": "4.x.x",
    "plugins": []
  }
};
module.exports = {
  plugin: plugin
};
