import _ from "lodash";
import kbn from "app/core/utils/kbn";
import { plugin } from "./plugin";

export class MappingOptionsCtrl {
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    $scope.mapping = this;
    this.activeStyleIndex = 0;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.mx = this.panelCtrl.mx;
    $scope.mx = this.panelCtrl.mx;
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
      // { text: "When Metric Displayed", value: "wmd" },
      { text: "Warning / Critical", value: "wc" },
      { text: "Critical Only", value: "co" }
    ];
    this.textReplace = [
      { text: "All content", value: "content" },
      { text: "Substring", value: "pattern" }
    ];
    this.textPattern = "/.*/"
    this.metricTypes = [
      { text: "Number", value: "number" },
      // { text: 'String', value: 'string' },
      // { text: 'Date', value: 'date' },
      // { text: 'Hidden', value: 'hidden' },
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
  cloneMetricStyle(style) {
    let newStyleRule = angular.copy(style);
    newStyleRule.id = ++this.panel.styleSeq;
    const styles = this.panel.styles;
    const stylesCount = styles.length;
    let indexToInsert = stylesCount;

    // check if last is a catch all rule, then add it before that one
    if (stylesCount > 0) {
      const last = styles[stylesCount - 1];
      if (last.pattern === "/.*/") {
        indexToInsert = stylesCount - 1;
      }
    }
    styles.splice(indexToInsert, 0, newStyleRule);
    this.activeStyleIndex = indexToInsert;
  }

  addMetricStyle() {
    const newStyleRule = {
      id: ++this.panel.styleSeq,
      unit: "short",
      type: "number",
      alias: "",
      aggregation: "current",
      decimals: 2,
      colors: [
        "rgba(245, 54, 54, 0.9)",
        "rgba(237, 129, 40, 0.89)",
        "rgba(50, 172, 45, 0.97)"
      ],
      colorMode: this.mx.STYLE_FILLCOLOR,
      colorOn: "a",
      textOn: "wmd",
      textReplace: 'content',
      textPattern: '/.*/',
      pattern: "/.*/",
      dateFormat: "YYYY-MM-DD HH:mm:ss",
      thresholds: [],
      invert: false,
      shapeSeq: 1,
      shapeMaps: [],
      textSeq: 1,
      textMaps: [],
      mappingType: 1
    };

    const styles = this.panel.styles;
    const stylesCount = styles.length;
    let indexToInsert = stylesCount;

    // check if last is a catch all rule, then add it before that one
    if (stylesCount > 0) {
      const last = styles[stylesCount - 1];
      if (last.pattern === "/.*/") {
        indexToInsert = stylesCount - 1;
      }
    }

    styles.splice(indexToInsert, 0, newStyleRule);
    this.activeStyleIndex = indexToInsert;
  }

  removeMetricStyle(style) {
    this.panel.styles = _.without(this.panel.styles, style);
  }

  invertColorOrder(index) {
    const ref = this.panel.styles[index].colors;
    const copy = ref[0];
    ref[0] = ref[2];
    ref[2] = copy;
    this.panel.styles[index].invert = !this.panel.styles[index].invert;
    this.onOptionsChange();
  }

  onColorChange(styleIndex, colorIndex) {
    return newColor => {
      this.panel.styles[styleIndex].colors[colorIndex] = newColor;
      this.onOptionsChange();
    };
  }

  onOptionsChange() {
    this.panelCtrl.changedOptions = true;
    this.render();
  }

  //
  // Validate
  //

  validateRegex(textRegex) {
    if (textRegex == null || textRegex.length == 0) {
      return true;
    }
    try {
      let regex = new RegExp(textRegex);
      return true;
    } catch (e) {
      return false;
    }
  }

  addValueMap(style) {
    if (!style.valueMaps) {
      style.valueMaps = [];
    }
    style.valueMaps.push({ value: "", text: "" });
    this.onOptionsChange();
  }

  removeValueMap(style, index) {
    style.valueMaps.splice(index, 1);
    this.onOptionsChange();
  }

  addRangeMap(style) {
    if (!style.rangeMaps) {
      style.rangeMaps = [];
    }
    style.rangeMaps.push({ from: "", to: "", text: "" });
    this.onOptionsChange();
  }

  removeRangeMap(style, index) {
    style.rangeMaps.splice(index, 1);
    this.onOptionsChange();
  }

  //
  // ON SHAPE
  //
  addShapeToStyle(style) {
    console.debug("mapping.addShapeToStyle");
    if (!style.shapeMaps) {
      style.shapeMaps = [];
    }
    style.shapeMaps.push({ pattern: "", prop: "id", id: style.shapeSeq++ });
    this.onOptionsChange();
  }

  removeShapeFromStyle(style, shape) {
    style.shapeMaps = _.without(style.shapeMaps, shape);
    this.onOptionsChange();
  }

  hideShapeFromStyle(shape) {
    shape.hidden = true;
    this.onOptionsChange();
  }

  showShapeFromStyle(shape) {
    shape.hidden = false;
    this.onOptionsChange();
  }

  //
  // ON TEXT
  //
  addTextToStyle(style) {
    if (!style.textMaps) {
      style.textMaps = [];
    }
    style.textMaps.push({ pattern: "", prop: "id", id: style.textSeq++ });
    this.onOptionsChange();
  }

  removeTextFromStyle(style, text) {
    style.textMaps = _.without(style.textMaps, text);
    this.onOptionsChange();
  }

  hideTextFromStyle(text) {
    text.hidden = true;
    this.onOptionsChange();
  }

  showTextFromStyle(text) {
    text.hidden = false;
    this.onOptionsChange();
  }

  findShapeInPanel(style) {
    this.scrollToAnchor("agenty-grafana-flowcharting");
  }

  scrollToAnchor(anchor_id){
    var tag = $("#"+anchor_id+"");
    $('html,body').animate({scrollTop: tag.offset().top},'slow');
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


