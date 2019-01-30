'use strict';

var mxbasePath = '../public/plugins/agenty-grafana-flowcharting/libs/mxgraph/javascript/dist';
var mxForceIncludes = false;

function initGlobalVar(varName,varValue) {

  var node = document.createElement("script");
  node.type = 'text/javascript';
  node.async = true;
  node.charset = 'utf-8';
  var code = varName + '="'+ varValue +'";';
  node.text = code;
  document.head.appendChild(node);
};

loadGlobalJs( filePath ){
  var node = document.createElement("script");
  node.type = 'text/javascript';
  node.async = true;
  node.charset = 'utf-8';
  node.src = filePath;
  document.head.appendChild(node);
};
