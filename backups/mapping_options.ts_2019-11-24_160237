import FlowchartHandler from './flowchartHandler';
import RulesHandler from 'rulesHandler';
import Rule from 'rule_class';
import grafana from 'grafana_func';
import _ from 'lodash';
import * as gf from '../types/flowcharting';

import FlowChartingPlugin from 'plugin';
declare var GFP: FlowChartingPlugin;

export class MappingOptionsCtrl {
  $scope: gf.TMappingOptionsScope;
  panelCtrl: any;
  panel: any;
  flowchartHandler: FlowchartHandler;
  rulesHandler: RulesHandler;
  unitFormats: any;
  style: gf.TSelectStyle[] = [
    { text: 'Stroke', value: 'strokeColor' },
    { text: 'Fill', value: 'fillColor' },
    { text: 'Text', value: 'fontColor' },
    { text: 'Background (image)', value: 'imageBackground' },
    { text: 'Border (image)', value: 'imageBorder' },
  ];
  colorOn: gf.TSelectString[] = [
    { text: 'Never', value: 'n' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  linkOn: gf.TSelectString[] = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  tooltipOn: gf.TSelectString[] = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  tpDirection: gf.TSelectString[] = [
    { text: 'Vertical', value: 'v' },
    { text: 'Horizontal ', value: 'h' },
  ];
  textOn: gf.TSelectString[] = [
    { text: 'Never', value: 'n' },
    { text: 'When Metric Displayed', value: 'wmd' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Critical Only', value: 'co' },
  ];
  textReplace: gf.TSelectString[] = [
    { text: 'All content', value: 'content' },
    { text: 'Substring', value: 'pattern' },
    { text: 'Append (Space) ', value: 'as' },
    { text: 'Append (New line) ', value: 'anl' },
  ];
  propTypes: gf.TSelectString[] = [
    { text: 'Id', value: 'id' },
    // { text: "Value", value: "value" }
  ];
  textPattern = '/.*/';
  metricTypes: gf.TSelectString[] = [
    { text: 'Number', value: 'number' },
    { text: 'String', value: 'string' },
    { text: 'Date', value: 'date' },
  ];
  dateFormats: gf.TSelectString[] = [
    { text: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
    { text: 'YYYY-MM-DD HH:mm:ss.SSS', value: 'YYYY-MM-DD HH:mm:ss.SSS' },
    { text: 'MM/DD/YY h:mm:ss a', value: 'MM/DD/YY h:mm:ss a' },
    { text: 'MMMM D, YYYY LT', value: 'MMMM D, YYYY LT' },
    { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  ];
  aggregationTypes: gf.TSelectAggregation[] = [
    { text: 'First', value: 'first' },
    { text: 'Last', value: 'current' },
    { text: 'Min', value: 'min' },
    { text: 'Max', value: 'max' },
    { text: 'Sum', value: 'total' },
    { text: 'Avg', value: 'avg' },
    { text: 'Count', value: 'count' },
    { text: 'Delta', value: 'delta' },
    { text: 'Range', value: 'range' },
    { text: 'Diff', value: 'diff' },
  ];
  mappingTypes: gf.TSelectText[] = [
    { text: 'Value to text', value: 1 },
    { text: 'Range to text', value: 2 },
  ];
  tpGraphType: gf.TSelectGraphType[] = [
    { text: 'Line', value: 'line' },
    { text: 'Histogram', value: 'bar' },
  ];
  tpGraphSize: gf.TSelectGraphSize[] = [
    { text: 'Adjustable', value: '100%' },
    { text: 'Small', value: '100px' },
    { text: 'Medium', value: '200px' },
    { text: 'Large', value: '400px' },
  ];
  getMetricNames: () => any[];
  getCellNamesForShape: () => any[];
  getCellNamesForText: () => any[];
  getCellNamesForLink: () => any[];
  getVariables: () => any;

  /** @ngInject */
  constructor($scope: gf.TMappingOptionsScope) {
    $scope.editor = this;
    $scope.GFP = GFP;
    this.$scope = $scope;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    $scope.rulesHandler = this.panelCtrl.rulesHandler;
    $scope.flowchartHandler = this.panelCtrl.flowchartHandler;
    this.flowchartHandler = $scope.ctrl.flowchartHandler;
    this.rulesHandler = this.panelCtrl.rulesHandler;
    this.unitFormats = grafana.getUnitFormats();
    this.tpGraphSize = [
      { text: 'Adjustable', value: '100%' },
      { text: 'Small', value: '100px' },
      { text: 'Medium', value: '200px' },
      { text: 'Large', value: '400px' },
    ];

    this.getMetricNames = (): string[] => {
      if (!this.panelCtrl.series) {
        return [];
      }
      return _.map(this.panelCtrl.series, t => t.alias);
    };

    this.getCellNamesForShape = (): string[] => {
      GFP.log.info('MappingOptionsCtrl.getCellNamesForShape()');
      const flowchart = this.flowchartHandler.getFlowchart();
      const cells = flowchart.getNamesByProp('id');
      return _.map(cells, t => t);
    };

    this.getCellNamesForText = (): string[] => {
      GFP.log.info('MappingOptionsCtrl.getCellNamesForText()');
      const flowchart = this.flowchartHandler.getFlowchart();
      const cells = flowchart.getNamesByProp('id');
      return _.map(cells, t => t);
    };

    this.getCellNamesForLink = (): string[] => {
      GFP.log.info('MappingOptionsCtrl.getCellNamesForLink()');
      const flowchart = this.flowchartHandler.getFlowchart();
      const cells = flowchart.getNamesByProp('id');
      return _.map(cells, t => t);
    };

    this.getVariables = () => {
      GFP.log.info('MappingOptionsCtrl.getVariables');
      return this.panelCtrl.getVariables();
    };
  }

  isFirstRule(index: number): boolean {
    if (index === 0) {
      return true;
    }
    return false;
  }

  isLastRule(index: number): boolean {
    const count = this.rulesHandler.countRules();
    if (index === count - 1) {
      return true;
    }
    return false;
  }

  render() {
    this.panelCtrl.render();
  }

  setUnitFormat(rule: Rule, subItem: any) {
    rule.data.unit = subItem.value;
    this.onRulesChange();
  }

  onRulesChange() {
    GFP.log.info('MappingOptionsCtrl.onRulesChange()');
    this.flowchartHandler.ruleChanged();
    this.render();
  }

  /**
   * Add Color
   *
   * @param {Number} ruleIndex
   * @param {Number} colorIndex
   * @memberof MappingOptionsCtrl
   */
  onColorChange(ruleIndex: number, colorIndex: number) {
    return (newColor: any) => {
      const rule = this.rulesHandler.getRule(ruleIndex);
      rule.data.colors[colorIndex] = newColor;
      this.onRulesChange();
    };
  }

  /**
   * Display cell selection in graph
   * @param  {} prop
   * @param  {} value
   */
  selectCell(prop: gf.TPropertieKey, value: string) {
    const flowchart = this.flowchartHandler.getFlowchart();
    const xgraph = flowchart.getXGraph();
    if (xgraph) {
      xgraph.selectMxCells(prop, value);
    }
  }

  /**
   * Undisplay cell selection
   *
   * @memberof MappingOptionsCtrl
   */
  unselectCell(prop: gf.TPropertieKey, value: string) {
    const flowchart = this.flowchartHandler.getFlowchart();
    const xgraph = flowchart.getXGraph();
    if (xgraph) {
      xgraph.unselectMxCells(prop, value);
    }
  }

  toggleShow(rule: Rule, bool: boolean) {
    rule.data.hidden = bool;
    this.onRulesChange();
  }

  /**
   * Turn Highlight on of cells in rule
   *
   * @param {*} rule
   * @memberof MappingOptionsCtrl
   */
  highlightCells(rule: Rule) {
    rule.highlightCells();
  }

  removeRule(rule: Rule, force?: boolean) {
    if (rule.removeClick === 1 || force) {
      this.rulesHandler.removeRule(rule);
      this.onRulesChange();
    }
    rule.removeClick = 1;
    window.setInterval(() => {
      if (rule) { rule.removeClick = 2; }
    }, 2000);
  }

  cloneRule(rule: Rule) {
    this.rulesHandler.cloneRule(rule);
    this.onRulesChange();
  }

  getStyleRemove(rule: Rule) {
    if (rule) {
      if (rule.removeClick === 1) { return 'color:brown'; }
    }
    return '';
  }

  moveRule(rule: Rule, up: boolean) {
    if (up) {
      this.rulesHandler.moveRuleToUp(rule);
    } else {
      this.rulesHandler.moveRuleToDown(rule);
    }
    this.onRulesChange();
  }

  /**
   * Turn Highlight off of cells in rule
   *
   * @param {*} rule
   * @memberof MappingOptionsCtrl
   */
  unhighlightCells(rule: Rule) {
    rule.unhighlightCells();
  }
}

/** @ngInject */
export function mappingOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${GFP.getPartialPath()}/mapping_options.html`,
    controller: MappingOptionsCtrl,
  };
}
