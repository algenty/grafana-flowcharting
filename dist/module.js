'use strict';

System.register([], function (_export2, _context2) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      System.register(['./properties', './flowchartControl'], function (_export, _context) {
        "use strict";

        var pluginName, FlowchartCtrl;
        return {
          setters: [function (_properties) {
            pluginName = _properties.pluginName;
          }, function (_flowchartControl) {
            DiagramCtrl = _flowchartControl.FlowchartCtrl;
          }],
          execute: function execute() {
            _export('PanelCtrl', FlowchartCtrl);
          }
        };
      });
    }
  };
});
//# sourceMappingURL=module.js.map
