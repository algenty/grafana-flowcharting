"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentPath = exports.valueEditor = exports.shapeEditor = exports.displayEditor = exports.flowchartEditor = exports.pluginName = void 0;
var pluginName = 'agenty-flowcharting-panel',
    flowchartEditor = 'public/plugins/' + pluginName + '/flowchartEditor.html',
    displayEditor = 'public/plugins/' + pluginName + '/displayEditor.html',
    valueEditor = 'public/plugins/' + pluginName + '/valueEditor.html',
    shapeEditor = 'public/plugins/' + pluginName + '/shapeEditor.html',
    currentPath = __dirname;
exports.currentPath = currentPath;
exports.shapeEditor = shapeEditor;
exports.valueEditor = valueEditor;
exports.displayEditor = displayEditor;
exports.flowchartEditor = flowchartEditor;
exports.pluginName = pluginName;
