"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TooltipHandler = function () {
  function TooltipHandler(cell) {
    _classCallCheck(this, TooltipHandler);

    this.defaultColor = '#8c8980';
    this.timeFormat = 'YYYY-MM-DD HH:mm:ss';
    this.metrics = [];
    cell.GF_tooltip = this;
  }

  _createClass(TooltipHandler, [{
    key: "addMetric",
    value: function addMetric(name, label, value, color, direction) {
      var metric = this.findTooltipValue(name);
      var found = metric != null ? true : false;

      if (!found) {
        metric = {
          graphOptions: {}
        };
      }

      metric.name = name;
      metric.label = label;
      metric.value = value;
      metric.color = color != null ? color : this.defaultColor;
      metric.direction = direction;
      if (!found) this.metrics.push(metric);
    }
  }, {
    key: "addGraph",
    value: function addGraph(name, type, size, serie) {
      var metric = this.findTooltipValue(name);
      var found = metric != null ? true : false;

      if (!found) {
        metric = {
          graphOptions: {}
        };
      }

      metric.name = name;
      metric.graph = true;
      metric.graphOptions.type = type;
      metric.graphOptions.size = size;
      metric.graphOptions.serie = serie;
      if (!found) this.metrics.push(metric);
    }
  }, {
    key: "updateDate",
    value: function updateDate() {
      this.lastChange = this.ctrl.dashboard.formatDate(new Date(), this.timeFormat);
    }
  }, {
    key: "findTooltipValue",
    value: function findTooltipValue(name) {
      for (var index = 0; index < this.metrics.length; index += 1) {
        var metric = this.metrics[index];
        if (metric.name === name) return metric;
      }

      return null;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      delete this.cell.GF_tooltip;
    }
  }]);

  return TooltipHandler;
}();

exports["default"] = TooltipHandler;
