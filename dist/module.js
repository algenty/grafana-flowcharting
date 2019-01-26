'use strict';

System.register(['./properties', './flowchartControl'], function (_export, _context) {
  "use strict";

  var pluginName, FlowchartCtrl;
  return {
    setters: [function (_properties) {
      pluginName = _properties.pluginName;
    }, function (_flowchartControl) {
      DiagramCtrl = _flowchartControl.FlowchartCtrl;
    }],
    execute: function () {
      _export('PanelCtrl', FlowchartCtrl);
    }
  };
});
