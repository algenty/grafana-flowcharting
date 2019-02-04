module.exports = {

  initGlobalVar : function (varName, varValue) {

    var node = document.createElement("script");
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    var code = varName + '="' + varValue + '";';
    node.text = code;
    document.head.appendChild(node);

  }
  
};
