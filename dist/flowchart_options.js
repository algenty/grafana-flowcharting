"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flowchartOptionsTab = flowchartOptionsTab;
exports.FlowchartOptionsCtrl = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _plugin = require("./plugin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FlowchartOptionsCtrl =
/*#__PURE__*/
function () {
  /** @ngInject */
  function FlowchartOptionsCtrl($scope) {
    _classCallCheck(this, FlowchartOptionsCtrl);

    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.mx = this.panelCtrl.mx;
    this.sourceTypes = [{
      text: "Url",
      value: "url"
    }, {
      text: "XML Content",
      value: "xml" // { text: 'CSV', value: 'csv' },

    }];
  }

  _createClass(FlowchartOptionsCtrl, [{
    key: "render",
    value: function render() {
      this.panelCtrl.render();
    }
  }, {
    key: "onSourceChange",
    value: function onSourceChange() {
      this.panelCtrl.changedSource = true;
      this.render();
    }
  }, {
    key: "openDrawEditor",
    value: function openDrawEditor() {
      var _this = this;

      // source : 
      // https://desk.draw.io/support/solutions/articles/16000042542-how-to-embed-html-
      // https://support.draw.io/display/DOB/2016/05/09/Simple+draw.io+embedding+walk-through
      var myWindow = window.open("https://draw.io?embed=1", "MxGraph Editor", "width=1280, height=720");
      var opened = false;
      window.addEventListener("message", function (event) {
        if (event.origin !== "https://www.draw.io") return;

        if (event.data == "ready") {
          event.source.postMessage(_this.panel.flowchart.source.xml.value, event.origin);
          opened = false;
        } else {
          if (event.data != undefined && event.data.length > 0) {
            _this.panel.flowchart.source.xml.value = _this.mx.decodeXml(event.data);
            _this.panelCtrl.changedSource = true;

            _this.render();
          }

          if (event.data != undefined || event.data.length == 0) {
            myWindow.close();
          }
        }
      });
    }
  }, {
    key: "validatePercent",
    value: function validatePercent(percentText) {
      if (percentText == null || percentText.length == 0) {
        return true;
      }

      var regexPattern = new RegExp(/^\d+(\.\d+)?%{0,1}/);
      var result = regexPattern.test(percentText);

      if (!result) {
        return false;
      }

      return true;
    }
  }]);

  return FlowchartOptionsCtrl;
}();
/** @ngInject */


exports.FlowchartOptionsCtrl = FlowchartOptionsCtrl;

function flowchartOptionsTab($q, uiSegmentSrv) {
  "use strict";

  return {
    restrict: "E",
    scope: true,
    templateUrl: "public/plugins/" + _plugin.plugin.id + "/partials/flowchart_options.html",
    controller: FlowchartOptionsCtrl
  };
}
