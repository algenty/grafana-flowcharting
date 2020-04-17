import FlowchartHandler from './flowchartHandler';
import RulesHandler from 'rulesHandler';
import { Rule, EventMap } from 'rule_class';
import { GFCONSTANT, GFGlobal } from 'globals_class';
import grafana from 'grafana_func';
import _ from 'lodash';
import MetricHandler from './metricHandler';

export class MappingOptionsCtrl {
  $scope: gf.TMappingOptionsScope;
  panelCtrl: any;
  panel: any;
  flowchartHandler: FlowchartHandler;
  rulesHandler: RulesHandler;
  metricHandler: MetricHandler;
  unitFormats: any;
  style = GFCONSTANT.COLORMETHODS;
  metricType: gf.TSelectString[] = GFCONSTANT.METRIC_TYPES;
  colorOn = GFCONSTANT.COLOR_APPLYON;
  linkOn = GFCONSTANT.LINK_APPLYON;
  tooltipOn = GFCONSTANT.TOOLTIP_APPLYON;
  textOn = GFCONSTANT.TEXT_APPLYON;
  textReplace = GFCONSTANT.TEXTMETHODS;
  // EventType: gf.TSelectString[] = GFCONSTANT.EVENTMETHODS;
  EventType = EventMap.getDefaultMethods();
  tpDirection: gf.TSelectString[] = GFCONSTANT.TOOLTIP_DIRECTION_TYPES;
  propTypes: gf.TSelectString[] = GFCONSTANT.IDENT_TYPES;
  textPattern = '/.*/';
  metricTypes = GFCONSTANT.VALUE_TYPES;
  dateFormats: gf.TSelectString[] = GFCONSTANT.VALUE_DATEFORMAT_TYPES;
  aggregationTypes = GFCONSTANT.AGGREGATION_TYPES;
  mappingTypes = GFCONSTANT.VALUEMAPPINGTYPES;
  tpGraphType = GFCONSTANT.TOOLTIP_GRAPH_TYPES;
  tpGraphScale = GFCONSTANT.TOOLTIP_GRAPH_SCALE_TYPES;
  tpGraphSize = GFCONSTANT.TOOLTIP_GRAPH_SIZE_TYPES;
  getMetricNames: () => any[];
  getCellNames: (prop: gf.TPropertieKey) => any[];
  getCellNamesById: () => any[];
  getCellNamesByValue: () => any[];
  getVariables: () => any;
  // getEventValues: () => any;
  getEventValues: string[];

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
    this.metricHandler = this.panelCtrl.metricHandler;
    this.unitFormats = grafana.getUnitFormats();
    this.tpGraphSize = GFCONSTANT.TOOLTIP_GRAPH_SIZE_TYPES;
    this.getMetricNames = (): string[] => {
      return this.metricHandler.getNames('serie');
    };

    this.getCellNames = (prop: gf.TPropertieKey = 'id'): string[] => {
      GFGlobal.log.info('MappingOptionsCtrl.getCellNamesForShape()');
      prop = prop !== 'id' && prop !== 'value' ? 'id' : prop;
      const flowchart = this.flowchartHandler.getFlowchart();
      const cells = flowchart.getNamesByProp(prop);
      const uniq = new Set(cells);
      let filter = [...uniq];
      filter = filter.filter(e => e !== undefined && e.length > 0);
      return filter;
    };

    this.getCellNamesById = (): string[] => {
      return this.getCellNames('id');
    };

    this.getCellNamesByValue = (): string[] => {
      return this.getCellNames('value');
    };

    this.getVariables = () => {
      return GFGlobal.getFullAvailableVarNames();
    };

    // this.getEventValues = () => {
    //   return [];
    // };
    this.getEventValues = [];
  }

  isFirstRule(index: number): boolean {
    if (index === 0) {
      return true;
    }
    return false;
  }

  isOnlySeries(): boolean {
    const bool = this.metricHandler.isTypeOf('serie') && !this.metricHandler.isTypeOf('table');
    return bool;
  }

  isOnlyTables(): boolean {
    const bool = !this.metricHandler.isTypeOf('serie') && this.metricHandler.isTypeOf('table');
    return bool;
  }

  isMultipleType(): boolean {
    const bool = this.metricHandler.isTypeOf('serie') && this.metricHandler.isTypeOf('table');
    return bool;
  }

  initType(rule: Rule) {
    if (this.isOnlyTables()) {
      rule.data.metricType = 'table';
    } else if (this.isOnlySeries()) {
      rule.data.metricType = 'serie';
    }
  }

  getTablesName(): string[] {
    return this.metricHandler.getNames('table');
  }

  getColumnsForTable(tableName: string): string[] {
    return this.metricHandler.getColumnsName(tableName, 'table');
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
    GFGlobal.log.info('MappingOptionsCtrl.onRulesChange()');
    this.flowchartHandler.ruleChanged();
    this.render();
    return true;
  }

  getLevels(rule: Rule): gf.TSelectNumber[] {
    let lvl: gf.TSelectNumber[] = [];
    let count = rule.data.colors.length;
    for (let index = 0; index < count; index++) {
      lvl.push({ text: `${index}`, value: index });
    }
    return lvl;
  }

  removeShapeMap(rule: Rule, index: number) {
    const shape = rule.getShapeMap(index);
    this.unselectCell(rule.data.shapeProp, shape.data.pattern);
    rule.removeShapeMap(index);
  }

  removeTextMap(rule: Rule, index: number) {
    const txt = rule.getTextMap(index);
    this.unselectCell(rule.data.textProp, txt.data.pattern);
    rule.removeTextMap(index);
  }

  removeLinkMap(rule: Rule, index: number) {
    const lnk = rule.getLinkMap(index);
    this.unselectCell(rule.data.linkProp, lnk.data.pattern);
    rule.removeLinkMap(index);
  }

  removeEventMap(rule: Rule, index: number) {
    const evt = rule.getEventMap(index);
    this.unselectCell(rule.data.eventProp, evt.data.pattern);
    rule.removeEventMap(index);
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
  async selectCell(prop: gf.TPropertieKey, value: string) {
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
  async unselectCell(prop: gf.TPropertieKey, value: string) {
    const flowchart = this.flowchartHandler.getFlowchart();
    const xgraph = flowchart.getXGraph();
    if (xgraph) {
      xgraph.unselectMxCells(prop, value);
    }
  }

  /**
   * Disable/Enable rule
   *
   * @param {Rule} rule
   * @param {boolean} bool
   * @memberof MappingOptionsCtrl
   */
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
  async highlightCells(rule: Rule) {
    rule.highlightCells();
  }

  /**
   * Turn Highlight off of cells in rule
   *
   * @param {*} rule
   * @memberof MappingOptionsCtrl
   */
  async unhighlightCells(rule: Rule) {
    rule.unhighlightCells();
  }

  /**
   * Turn Highlight off all cells
   *
   * @param {*} rule
   * @memberof MappingOptionsCtrl
   */
  async unhighlightAllCells() {
    const flowchart = this.flowchartHandler.getFlowchart();
    const xgraph = flowchart.getXGraph();
    if (xgraph) {
      xgraph.unhighlightCells();
    }
  }

  //
  // RULE
  //

  /**
   * Remove a rule
   *
   * @param {Rule} rule
   * @param {boolean} [force]
   * @memberof MappingOptionsCtrl
   */
  removeRule(rule: Rule, force?: boolean) {
    if (rule.removeClick === 1 || force) {
      this.rulesHandler.removeRule(rule);
      this.onRulesChange();
    }
    rule.removeClick = 1;
    window.setInterval(() => {
      if (rule) {
        rule.removeClick = 2;
      }
    }, 2000);
  }

  /**
   * Clone a rule
   *
   * @param {Rule} rule
   * @memberof MappingOptionsCtrl
   */
  cloneRule(rule: Rule) {
    this.rulesHandler.cloneRule(rule);
    this.onRulesChange();
  }

  /**
   * Move rule up or down
   *
   * @param {Rule} rule
   * @param {boolean} up
   * @memberof MappingOptionsCtrl
   */
  moveRule(rule: Rule, up: boolean) {
    if (up) {
      this.rulesHandler.moveRuleToUp(rule);
    } else {
      this.rulesHandler.moveRuleToDown(rule);
    }
    this.onRulesChange();
  }

  //
  // Events
  //
  onEventValue(event: EventMap) {
    this.getEventValues = event.getTypeahead();
  }
}

/** @ngInject */
export function mappingOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${GFP.getPartialPath()}/mapping/index.html`,
    controller: MappingOptionsCtrl,
  };
}
