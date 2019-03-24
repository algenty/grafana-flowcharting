"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inspectOptionsTab = inspectOptionsTab;
exports.InspectOptionsCtrl = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _plugin = require("./plugin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InspectOptionsCtrl =
/*#__PURE__*/
function () {
  /** @ngInject */
  function InspectOptionsCtrl($scope) {
    _classCallCheck(this, InspectOptionsCtrl);

    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.mx = this.panelCtrl.mx;
    this.cells = this.mx.cells;
    this.colors = ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'];
    this.colorModes = [{
      text: 'Disabled',
      value: null
    }, {
      text: 'Stroke',
      value: this.mx.STYLE_STROKECOLOR
    }, {
      text: 'Fill',
      value: this.mx.STYLE_FILLCOLOR
    }, {
      text: 'Text',
      value: this.mx.STYLE_FONTCOLOR
    }];
    this.colorMode = this.mx.STYLE_FILLCOLOR;
    $scope.mx = this.panelCtrl.mx;
    this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
  }

  _createClass(InspectOptionsCtrl, [{
    key: "render",
    value: function render() {
      this.panelCtrl.render();
    }
  }, {
    key: "onColorChange",
    value: function onColorChange(styleIndex, colorIndex) {
      var _this = this;

      return function (newColor) {
        _this.colors[colorIndex] = newColor;
      };
    }
  }]);

  return InspectOptionsCtrl;
}();
/** @ngInject */


exports.InspectOptionsCtrl = InspectOptionsCtrl;

function inspectOptionsTab($q, uiSegmentSrv) {
  'use strict';

  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/plugins/' + _plugin.plugin.id + '/partials/inspect_options.html',
    controller: InspectOptionsCtrl
  };
}
