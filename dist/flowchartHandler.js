"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlowchartHandler =
/** @ngInject */
function FlowchartHandler($scope, flowchart) {
  _classCallCheck(this, FlowchartHandler);

  this.$scope = $scope || null;
  this.flowchart = flowchart; // if (version != this.panel.version) this.migrate(this.rules)
  // else this.import(this.rules);
};

exports.default = FlowchartHandler;
