"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PanelCtrl", {
  enumerable: true,
  get: function get() {
    return _flowchart_ctrl.FlowchartCtrl;
  }
});

var _flowchart_ctrl = require("./flowchart_ctrl");

var _sdk = require("app/plugins/sdk");

(0, _sdk.loadPluginCss)({
  dark: 'plugins/agenty-flowcharting-panel/css/flowchart.dark.css',
  light: 'plugins/agenty-flowcharting-panel/css/flowchart.light.css'
});
window.logLevel = 0;
window.logDisplay = true;
