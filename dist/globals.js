'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var mxBasePath, mxForceIncludes;


  function initGlobalVar(varName, varValue) {

    var node = document.createElement("script");
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    var code = varName + '="' + varValue + '";';
    node.text = code;
    document.head.appendChild(node);
  }

  return {
    setters: [],
    execute: function () {
      mxBasePath = './libs/mxgraph/javascript/dist';
      mxForceIncludes = false;
      initGlobalVar("mxBasePath", mxBasePath);
    }
  };
});
//# sourceMappingURL=globals.js.map
