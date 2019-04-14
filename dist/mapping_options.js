"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mappingOptionsTab = mappingOptionsTab;
exports.MappingOptionsCtrl = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _kbn = _interopRequireDefault(require("app/core/utils/kbn"));

var _plugin = require("./plugin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MappingOptionsCtrl =
/*#__PURE__*/
function () {
  /** @ngInject */
  function MappingOptionsCtrl($scope) {
    var _this = this;

    _classCallCheck(this, MappingOptionsCtrl);

    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    $scope.rulesHandler = this.panelCtrl.rulesHandler;
    $scope.flowchartHandler = this.panelCtrl.flowchartHandler;
    this.flowchartHandler = $scope.ctrl.flowchartHandler;
    this.unitFormats = _kbn.default.getUnitFormats();
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
    this.colorOn = [{
      text: 'Warning / Critical',
      value: 'wc'
    }, {
      text: 'Always',
      value: 'a'
    }];
    this.textOn = [{
      text: 'Never',
      value: 'n'
    }, {
      text: 'When Metric Displayed',
      value: 'wmd'
    }, {
      text: 'Warning / Critical',
      value: 'wc'
    }, {
      text: 'Critical Only',
      value: 'co'
    }];
    this.textReplace = [{
      text: 'All content',
      value: 'content'
    }, {
      text: 'Substring',
      value: 'pattern'
    }];
    this.propTypes = [{
      text: 'Id',
      value: 'id' // { text: "Substring", value: "pattern" }

    }];
    this.textPattern = '/.*/';
    this.metricTypes = [{
      text: 'Number',
      value: 'number'
    }, {
      text: 'String',
      value: 'string'
    }, {
      text: 'Date',
      value: 'date'
    }];
    this.dateFormats = [{
      text: 'YYYY-MM-DD HH:mm:ss',
      value: 'YYYY-MM-DD HH:mm:ss'
    }, {
      text: 'YYYY-MM-DD HH:mm:ss.SSS',
      value: 'YYYY-MM-DD HH:mm:ss.SSS'
    }, {
      text: 'MM/DD/YY h:mm:ss a',
      value: 'MM/DD/YY h:mm:ss a'
    }, {
      text: 'MMMM D, YYYY LT',
      value: 'MMMM D, YYYY LT'
    }, {
      text: 'YYYY-MM-DD',
      value: 'YYYY-MM-DD'
    }];
    this.aggregationTypes = [{
      text: 'First',
      value: 'first'
    }, {
      text: 'Last',
      value: 'current'
    }, {
      text: 'Min',
      value: 'min'
    }, {
      text: 'Max',
      value: 'max'
    }, {
      text: 'Sum',
      value: 'total'
    }, {
      text: 'Avg',
      value: 'avg'
    }, {
      text: 'Count',
      value: 'count'
    }, {
      text: 'Delta',
      value: 'delta'
    }, {
      text: 'Range',
      value: 'range'
    }, {
      text: 'Diff',
      value: 'diff'
    }];
    this.mappingTypes = [{
      text: 'Value to text',
      value: 1
    }, {
      text: 'Range to text',
      value: 2
    }];

    this.getMetricNames = function () {
      if (!_this.panelCtrl.series) {
        return [];
      }

      return _lodash.default.map(_this.panelCtrl.series, function (t) {
        return t.alias;
      });
    };

    this.getCellNamesForShape = function () {
      var cells = _this.flowchartHandler.getNamesByProp('id');

      return _lodash.default.map(cells, function (t) {
        return t;
      });
    };

    this.getCellNamesForText = function () {
      var cells = _this.flowchartHandler.getNamesByProp('id');

      return _lodash.default.map(cells, function (t) {
        return t;
      });
    };

    this.getCellNamesForLink = function () {
      var cells = _this.flowchartHandler.getNamesByProp('id');

      return _lodash.default.map(cells, function (t) {
        return t;
      });
    };
  }

  _createClass(MappingOptionsCtrl, [{
    key: "render",
    value: function render() {
      this.panelCtrl.render();
    }
  }, {
    key: "setUnitFormat",
    value: function setUnitFormat(column, subItem) {
      column.unit = subItem.value;
      this.onOptionsChange();
    }
  }, {
    key: "onOptionsChange",
    value: function onOptionsChange() {
      this.flowchartHandler.changedGraphFlag = true;
      this.render();
    }
  }]);

  return MappingOptionsCtrl;
}();
/** @ngInject */


exports.MappingOptionsCtrl = MappingOptionsCtrl;

function mappingOptionsTab($q, uiSegmentSrv) {
  'use strict';

  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/plugins/' + _plugin.plugin.id + '/partials/mapping_options.html',
    controller: MappingOptionsCtrl
  };
}
//# sourceMappingURL=mapping_options.js.map
