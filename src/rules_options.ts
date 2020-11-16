import { FlowchartHandler } from './flowchartHandler';
import { RulesHandler } from './rulesHandler';
import { Rule, EventMap } from './rule_class';
import { $GF, GFTable } from './globals_class';
import grafana from 'grafana_func';
import _ from 'lodash';
import { MetricHandler } from './metricHandler';

export class RulesOptionsCtrl {
  $scope: gf.TRulesOptionsScope;
  ctrl: any;
  panel: any;
  flowchartHandler: FlowchartHandler;
  rulesHandler: RulesHandler;
  metricHandler: MetricHandler;
  unitFormats: any;
  parentDiv: HTMLDivElement;
  style = $GF.CONSTANTS.COLORMETHODS;
  metricType: gf.TSelectString[] = $GF.CONSTANTS.METRIC_TYPES;
  colorOn = $GF.CONSTANTS.COLOR_APPLYON;
  linkOn = $GF.CONSTANTS.LINK_APPLYON;
  tooltipOn = $GF.CONSTANTS.TOOLTIP_APPLYON;
  textOn = $GF.CONSTANTS.TEXT_APPLYON;
  textReplace = $GF.CONSTANTS.TEXTMETHODS;
  EventType = EventMap.getDefaultMethods();
  tpDirection: gf.TSelectString[] = $GF.CONSTANTS.TOOLTIP_DIRECTION_TYPES;
  propTypes: gf.TSelectString[] = $GF.CONSTANTS.IDENT_TYPES;
  textPattern = '/.*/';
  rulesTableData: gf.TTableData;
  shapesTableData: gf.TTableData;
  rulesTable: GFTable;
  shapesTable: GFTable;
  metricTypes = $GF.CONSTANTS.VALUE_TYPES;
  dateFormats: gf.TSelectString[] = $GF.CONSTANTS.VALUE_DATEFORMAT_TYPES;
  aggregationTypes = $GF.CONSTANTS.AGGREGATION_TYPES;
  mappingTypes = $GF.CONSTANTS.VALUEMAPPINGTYPES;
  tpGraphType = $GF.CONSTANTS.TOOLTIP_GRAPH_TYPES;
  tpGraphScale = $GF.CONSTANTS.TOOLTIP_GRAPH_SCALE_TYPES;
  tpGraphSize = $GF.CONSTANTS.TOOLTIP_GRAPH_SIZE_TYPES;
  getMetricNames: () => any[];
  getCellNames: (prop: gf.TPropertieKey) => any[];
  getCellNamesById: () => any[];
  getCellNamesByValue: () => any[];
  getVariables: () => any;
  // getEventValues: () => any;
  getEventValues: string[];

  /** @ngInject */
  constructor($scope: gf.TRulesOptionsScope, $element) {
    $scope.editor = this;
    $scope.$GF = $GF.me();
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    const $div = $element.find('#templateMapping');
    this.parentDiv = $div[0];
    this.rulesHandler = this.ctrl.rulesHandler;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.rulesHandler = this.ctrl.rulesHandler;
    this.metricHandler = this.ctrl.metricHandler;
    this.unitFormats = grafana.getUnitFormats();
    this.tpGraphSize = $GF.CONSTANTS.TOOLTIP_GRAPH_SIZE_TYPES;
    this.rulesTableData = {
      data: [],
      columns: [
        {
          index: 0,
          id: 'expand',
          label: '<>',
          desc: 'Expand/collapse',
          size: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: 1,
          id: 'rule',
          label: 'Rule',
          desc: 'Rule Name',
          size: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: 2,
          id: 'level',
          label: 'Lvl',
          desc: 'Highest level',
          size: '40px',
          sort: 'asc',
          select: false,
        },
        {
          index: 3,
          id: 'rval',
          label: 'R. val.',
          desc: 'Raw value',
          size: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: 4,
          id: 'fval',
          label: 'F. val.',
          desc: 'Formated value',
          size: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: 5,
          id: 'color',
          label: 'Color',
          desc: 'Highest color',
          size: '50px',
          sort: 'asc',
          select: false,
        },
        {
          index: 6,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          size: '100px',
          sort: 'asc',
          select: false,
        },
      ],
    };
    let n = 0;
    this.shapesTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '',
          desc: 'Expand/collapse',
          size: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'what',
          label: 'What',
          desc: 'What is the shape to apply this rule',
          size: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'when',
          label: 'When',
          desc: 'When to apply this rule on shape',
          size: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'how',
          label: 'How',
          desc: 'How to apply this rule on shape',
          size: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: 3,
          id: 'rval',
          label: 'R. val.',
          desc: 'Raw value',
          size: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: 6,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          size: '100px',
          sort: 'asc',
          select: false,
        },
      ],
    };

    const $rulesTable = $div.find('#RulesTable');
    const rulesTable = $rulesTable[0];
    this.rulesTable = new GFTable(this.rulesTableData, rulesTable);

    const $shapesTable = $div.find('#ShapesTable');
    const shapesTable = $shapesTable[0];
    this.shapesTable = new GFTable(this.shapesTableData, shapesTable);

    this.getMetricNames = (): string[] => {
      return this.metricHandler.getNames('serie');
    };

    this.getCellNames = (prop: gf.TPropertieKey = 'id'): string[] => {
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
      return $GF.getFullAvailableVarNames();
    };

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
    this.ctrl.render();
  }

  setUnitFormat(rule: Rule, subItem: any) {
    rule.data.unit = subItem.value;
    this.onRulesChange();
  }

  onRulesChange() {
    $GF.log.info('RulesOptionsCtrl.onRulesChange()');
    this.flowchartHandler.onRulesChange();
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
   * @memberof RulesOptionsCtrl
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
   * @memberof RulesOptionsCtrl
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
   * @memberof RulesOptionsCtrl
   */
  toggleShow(rule: Rule, bool: boolean) {
    rule.data.hidden = bool;
    this.onRulesChange();
  }

  /**
   * Turn Highlight on of cells in rule
   *
   * @param {*} rule
   * @memberof RulesOptionsCtrl
   */
  async highlightCells(rule: Rule) {
    rule.highlightCells();
  }

  /**
   * Turn Highlight off of cells in rule
   *
   * @param {*} rule
   * @memberof RulesOptionsCtrl
   */
  async unhighlightCells(rule: Rule) {
    rule.unhighlightCells();
  }

  /**
   * Turn Highlight off all cells
   *
   * @param {*} rule
   * @memberof RulesOptionsCtrl
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
   * @memberof RulesOptionsCtrl
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
   * @memberof RulesOptionsCtrl
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
   * @memberof RulesOptionsCtrl
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
export function rulesOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${$GF.plugin.getPartialPath()}/rules/rulesTab.html`,
    controller: RulesOptionsCtrl,
  };
}
