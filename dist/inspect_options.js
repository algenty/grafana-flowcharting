"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inspectOptionsTab = inspectOptionsTab;
exports.InspectOptionsCtrl = void 0;

var _plugin = require("./plugin");

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
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    this.colors = ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'];
    this.style = [{
      text: 'Disabled',
      value: null
    }, {
      text: 'Stroke',
      value: 'strokeColor'
    }, {
      text: 'Fill',
      value: 'fillColor'
    }, {
      text: 'Text',
      value: 'fontColor'
    }];
    this.colorMode = 'fillColor';
    this.logDisplayOption = [{
      text: 'True',
      value: true
    }, {
      text: 'False',
      value: false
    }];
    this.logDisplay = logDisplay;
    this.logLevelOption = [{
      text: 'DEBUG',
      value: 0
    }, {
      text: 'INFO',
      value: 1
    }, {
      text: 'WARNING',
      value: 2
    }, {
      text: 'ERROR',
      value: 3
    }];
    this.logLevel = logLevel;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    $scope.flowchartHandler = this.ctrl.flowchartHandler;
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
  }, {
    key: "onDebug",
    value: function onDebug() {
      window.logLevel = this.logLevel;
      window.logDisplay = this.logDisplay;
    }
  }, {
    key: "onChangeId",
    value: function onChangeId(state) {
      if (state.newcellId !== undefined && state.cellId !== state.newcellId) {
        this.flowchartHandler.getFlowchart(0).getStateHandler().edited = true;
        if (state.previousId === undefined) state.previousId = state.cellId;
        state.cellId = state.newcellId;
        state.edited = true;
      }

      state.edit = false;
    }
  }, {
    key: "onEdit",
    value: function onEdit(state) {
      state.edit = true;
      state.newcellId = state.cellId;
      var elt = document.getElementById(state.cellId);
      setTimeout(function () {
        elt.focus();
      }, 100);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.flowchartHandler.draw();
      this.flowchartHandler.refresh(); // this.$scope.$apply();
    }
  }, {
    key: "apply",
    value: function apply() {
      var flowchart = this.flowchartHandler.getFlowchart(0);
      var states = flowchart.getStateHandler().getStates();
      states.forEach(function (state) {
        if (state.edited) flowchart.renameId(state.previousId, state.cellId);
      });
      flowchart.applyModel();
    }
  }, {
    key: "selectCell",
    value: function selectCell(id) {
      var flowchart = this.flowchartHandler.getFlowchart(0);
      var xgraph = flowchart.getXGraph();
      xgraph.selectMxCells('id', id);
    }
  }, {
    key: "unselectCell",
    value: function unselectCell() {
      var flowchart = this.flowchartHandler.getFlowchart(0);
      var xgraph = flowchart.getXGraph();
      xgraph.unselectMxCells('id', id);
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
    templateUrl: "public/plugins/".concat(_plugin.plugin.id, "/partials/inspect_options.html"),
    controller: InspectOptionsCtrl
  };
}
//# sourceMappingURL=inspect_options.js.map
