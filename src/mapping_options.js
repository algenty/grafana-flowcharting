import _ from "lodash";
import kbn from "app/core/utils/kbn";
import { plugin } from "./plugin";

export class MappingOptionsCtrl {
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.activeRuleIndex = 0;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.mx = this.panelCtrl.mx;
    $scope.mx = this.panelCtrl.mx;
    $scope.onMapping = this.panelCtrl.onMapping;
    $scope.rulesHandler = this.panelCtrl.rulesHandler;
    this.unitFormats = kbn.getUnitFormats();
    this.colorModes = [
      { text: "Disabled", value: null },
      { text: "Stroke", value: this.mx.STYLE_STROKECOLOR },
      { text: "Fill", value: this.mx.STYLE_FILLCOLOR },
      { text: "Text", value: this.mx.STYLE_FONTCOLOR }
    ];
    this.colorOn = [
      { text: "Warning / Critical", value: "wc" },
      { text: "Always", value: "a" }
    ];
    this.textOn = [
      { text: "Never", value: "n" },
      { text: "When Metric Displayed", value: "wmd" },
      { text: "Warning / Critical", value: "wc" },
      { text: "Critical Only", value: "co" }
    ];
    this.textReplace = [
      { text: "All content", value: "content" },
      { text: "Substring", value: "pattern" }
    ];
    this.propTypes = [
      { text: "Id", value: "id" },
      // { text: "Substring", value: "pattern" }
    ];
    this.textPattern = "/.*/"
    this.metricTypes = [
      { text: "Number", value: "number" },
      { text: 'String', value: 'string' },
      { text: 'Date', value: 'date' },
    ];
    this.dateFormats = [
      { text: "YYYY-MM-DD HH:mm:ss", value: "YYYY-MM-DD HH:mm:ss" },
      { text: "YYYY-MM-DD HH:mm:ss.SSS", value: "YYYY-MM-DD HH:mm:ss.SSS" },
      { text: "MM/DD/YY h:mm:ss a", value: "MM/DD/YY h:mm:ss a" },
      { text: "MMMM D, YYYY LT", value: "MMMM D, YYYY LT" },
      { text: "YYYY-MM-DD", value: "YYYY-MM-DD" }
    ];
    this.aggregationTypes = [
      { text: "First", value: "first" },
      { text: "Last", value: "current" },
      { text: "Min", value: "min" },
      { text: "Max", value: "max" },
      { text: "Sum", value: "total" },
      { text: "Avg", value: "avg" },
      { text: "Count", value: "count" },
      { text: "Delta", value: "delta" },
      { text: "Range", value: "range" },
      { text: "Diff", value: "diff" }
    ];
    this.mappingTypes = [
      { text: "Value to text", value: 1 },
      { text: "Range to text", value: 2 }
    ];

    this.getMetricNames = () => {
      if (!this.panelCtrl.series) {
        return [];
      }
      return _.map(this.panelCtrl.series, t => {
        return t.alias;
      });
    };

    this.getCellNames = () => {
      if (!this.mx.cells) {
        return [];
      }
      return _.map(this.mx.cells, t => {
        return t.id;
      });
    };

    this.onColorChange = this.onColorChange.bind(this);
  }

  render() {
    this.panelCtrl.render();
  }

  setUnitFormat(column, subItem) {
    column.unit = subItem.value;
    this.onOptionsChange();
  }

  onColorChange(ruleIndex, colorIndex) {
    return newColor => {
      this.panel.rules[ruleIndex].colors[colorIndex] = newColor;
      this.onOptionsChange();
    };
  }

  onOptionsChange() {
    this.panelCtrl.changedOptions = true;
    console.log(this.panelCtrl.rulesHandler);
    this.render();
  }


  mapCell(map,id) {
    // init mapping event
    if (this.panelCtrl.onMapping.active && map == this.panelCtrl.onMapping.object ) { 
      this.panelCtrl.onMapping.active = false;
    }
    else {
      this.panelCtrl.onMapping.active = true;
      this.panelCtrl.onMapping.object = map;
      this.panelCtrl.onMapping.idFocus = id;
      let elt = document.getElementById('agenty-grafana-flowcharting')
      elt.scrollIntoView();
      elt.focus();
    }

  }

}

/** @ngInject */
export function mappingOptionsTab($q, uiSegmentSrv) {
  "use strict";
  return {
    restrict: "E",
    scope: true,
    templateUrl:
      "public/plugins/" + plugin.id + "/partials/mapping_options.html",
    controller: MappingOptionsCtrl
  };
}


