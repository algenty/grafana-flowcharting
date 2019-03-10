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
    this.sourceTypes = [{
      text: "Url",
      value: "url"
    }, {
      text: "XML Content",
      value: "xml" // { text: 'CSV', value: 'csv' },

    }];
    this.fontSizes = ["80%", "90%", "100%", "110%", "120%", "130%", "150%", "160%", "180%", "200%", "220%", "250%"];
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

      var myWindow = window.open("https://draw.io?embed=1", "MxGraph Editor", "width=1280, height=720");
      var opened = false;
      window.addEventListener("message", function (event) {
        console.log("Draw is open :" + event);
        console.log("event.origin", event.origin);
        console.log("event.lastEventId", event.lastEventId);
        console.log("event.data", event.data);
        if (event.origin !== "https://www.draw.io") return;

        if (event.data == "ready") {
          event.source.postMessage(_this.panel.flowchart.source.xml.value, event.origin);
          opened = false;
        } else {
          _this.panel.flowchart.source.xml.value = event.data;
          _this.panelCtrl.changedSource = true;

          _this.render();
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
