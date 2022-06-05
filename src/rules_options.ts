import { FlowchartHandler } from './flowchart_handler';
import { RulesHandler } from './rules_handler';
import { Rule } from './rule_class';
import { EventMap, ObjectMap } from './mapping_class';
import { $GF, GFTable, GFPlugin, GFCONSTANT } from './globals_class';
import grafana from 'grafana_func';
// import _ from 'lodash';
import { MetricHandler } from './metric_handler';
import { DateTH, NumberTH, StringTH } from 'threshold_class';
import { FlowchartCtrl } from 'flowchart_ctrl';

/**
 * Rules tab controller
 *
 * @export
 * @class RulesOptionsCtrl
 */
export class RulesOptionsCtrl {
  private readonly $gf: $GF;
  $scope: gf.TRulesOptionsScope;
  ctrl: FlowchartCtrl;
  // panel: any;
  flowchartHandler: FlowchartHandler | undefined;
  rulesHandler: RulesHandler | undefined;
  metricHandler: MetricHandler | undefined;
  unitFormats: any;
  parentDiv: HTMLDivElement;
  style = GFCONSTANT.COLORMETHODS;
  metricTypes: gf.TSelectString[] = GFCONSTANT.METRIC_TYPES;
  colorOn = GFCONSTANT.COLOR_APPLYON;
  linkOn = GFCONSTANT.LINK_APPLYON;
  tooltipOn = GFCONSTANT.TOOLTIP_APPLYON;
  textOn = GFCONSTANT.TEXT_APPLYON;
  textReplace = GFCONSTANT.TEXTMETHODS;
  comparator = GFCONSTANT.COMPARATOR_TYPES;
  EventType = EventMap.getDefaultMethods();
  tpDirection: gf.TSelectString[] = GFCONSTANT.TOOLTIP_DIRECTION_TYPES;
  propTypes: gf.TSelectString[] = GFCONSTANT.IDENT_TYPES;
  textPattern = '/.*/';
  rulesTableData: gf.TTableData;
  shapesTableData: gf.TTableData;
  textsTableData: gf.TTableData;
  linksTableData: gf.TTableData;
  eventsTableData: gf.TTableData;
  THsTableData: gf.TTableData;
  valuesTableData: gf.TTableData;
  rangesTableData: gf.TTableData;
  rulesTable: GFTable;
  shapesTable: GFTable;
  textsTable: GFTable;
  linksTable: GFTable;
  eventsTable: GFTable;
  THsTable: GFTable;
  valuesTable: GFTable;
  rangesTable: GFTable;
  valueTypes = GFCONSTANT.VALUE_TYPES;
  dateFormats: gf.TSelectString[] = GFCONSTANT.VALUE_DATEFORMAT_TYPES;
  aggregationTypes = GFCONSTANT.AGGREGATION_TYPES;
  mappingTypes = GFCONSTANT.VALUEMAPPINGTYPES;
  tpGraphType = GFCONSTANT.TOOLTIP_GRAPH_TYPES;
  tpGraphScale = GFCONSTANT.TOOLTIP_GRAPH_SCALE_TYPES;
  tpGraphSize = GFCONSTANT.TOOLTIP_GRAPH_SIZE_TYPES;
  currentParams = new Map();
  getMetricNames: () => any[];
  getVariables: () => any;
  getEventValues: string[];

  /** @ngInject */
  constructor($scope: gf.TRulesOptionsScope, $element: any) {
    $scope.editor = this;
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    $scope.GFPlugin = this.ctrl.GFPlugin;
    $scope.$GF = this.ctrl.$gf;
    this.$gf = this.ctrl.$gf
    // this.panel = this.ctrl.panel;
    const $div = $element.find('#templateMapping');
    this.parentDiv = $div[0];
    this.rulesHandler = this.ctrl.rulesHandler;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.rulesHandler = this.ctrl.rulesHandler;
    this.metricHandler = this.ctrl.metricHandler;
    this.unitFormats = grafana.getUnitFormats();
    this.tpGraphSize = GFCONSTANT.TOOLTIP_GRAPH_SIZE_TYPES;
    let n = 0;
    this.rulesTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '<>',
          desc: 'Show/Hide detail',
          width: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'rule',
          label: 'Rule',
          desc: 'Rule Name',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'metric',
          label: 'Metric',
          desc: 'Metric Name',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'level',
          label: 'Lvl',
          desc: 'Highest level',
          width: '40px',
          sort: 'asc',
          select: false,
        },
        // {
        //   index: n++,
        //   id: 'rval',
        //   label: 'R. val.',
        //   desc: 'Raw value',
        //   width: '100px',
        //   sort: 'asc',
        //   select: false,
        // },
        {
          index: n++,
          id: 'fval',
          label: 'F. val.',
          desc: 'Formated value',
          width: '50px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'color',
          label: 'Color',
          desc: 'Highest color',
          width: '50px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'options',
          label: 'Options',
          desc: 'Options',
          width: '80px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          width: '120px',
          sort: 'asc',
          select: false,
        },
      ],
    };
    n = 0;
    this.shapesTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '',
          desc: 'Expand/collapse',
          width: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'what',
          label: 'What',
          desc: 'What is the shape to apply this rule',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'when',
          label: 'When',
          desc: 'When to apply this rule on shape',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'how',
          label: 'How',
          desc: 'How to apply this rule on shape',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          width: '100px',
          sort: 'asc',
          select: false,
        },
      ],
    };
    n = 0;
    this.textsTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '',
          desc: 'Expand/collapse',
          width: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'what',
          label: 'What',
          desc: 'What is the shape/label to apply this rule',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'when',
          label: 'When',
          desc: 'When to apply this rule on shape',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'how',
          label: 'How',
          desc: 'How to apply this rule on shape',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'with',
          label: 'With',
          desc: 'Text to replace',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          width: '100px',
          sort: 'asc',
          select: false,
        },
      ],
    };
    n = 0;
    this.linksTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '',
          desc: 'Expand/collapse',
          width: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'what',
          label: 'What',
          desc: 'What is the shape/label to apply this rule',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'when',
          label: 'When',
          desc: 'When to apply this rule on shape',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'url',
          label: 'URL',
          desc: 'URL relative or absolute',
          width: '150px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'options',
          label: 'Options',
          desc: 'Options',
          width: '45px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          width: '100px',
          sort: 'asc',
          select: false,
        },
      ],
    };
    n = 0;
    this.eventsTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '',
          desc: 'Expand/collapse',
          width: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'what',
          label: 'What',
          desc: 'What is the shape/label to apply this rule',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'when',
          label: 'When',
          desc: 'When current level is',
          width: '80px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'level',
          label: 'Lvl',
          desc: 'Threshold level',
          width: '60px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'then',
          label: 'Then',
          desc: 'Then execute this action',
          width: '120px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'with',
          label: 'With',
          desc: 'With this value/parameter',
          width: '80px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          width: '100px',
          sort: 'asc',
          select: false,
        },
      ],
    };
    n = 0;
    this.THsTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '',
          desc: 'Expand/collapse',
          width: '30px',
          align: 'center',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'colors',
          label: 'Colors',
          desc: 'Colorize object',
          align: 'center',
          width: '75px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'when',
          label: 'When',
          desc: 'When metric value like...',
          width: '67px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'value',
          label: 'Than',
          desc: 'Enter a value to define the level',
          width: '80px',
          align: 'left',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'level',
          label: 'lvl.',
          desc: 'Level',
          width: '50px',
          sort: 'asc',
          select: false,
        },
        // {
        //   index: n++,
        //   id: 'options',
        //   label: 'With',
        //   desc: 'With this value/parameter',
        //   width: '80px',
        //   sort: 'asc',
        //   select: false,
        // },
        {
          index: n++,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          width: '100px',
          sort: 'asc',
          select: false,
        },
      ],
    };
    n = 0;
    this.valuesTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '',
          desc: 'Expand/collapse',
          width: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'value',
          label: 'Value',
          desc: 'Origin value',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'text',
          label: 'Text',
          desc: 'Final value',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          width: '100px',
          sort: 'asc',
          select: false,
        },
      ],
    };
    n = 0;
    this.rangesTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '',
          desc: 'Expand/collapse',
          width: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'from',
          label: 'From',
          desc: 'Min of value to replace',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'to',
          label: 'To',
          desc: 'Max of value to replace',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'text',
          label: 'Text',
          desc: 'Final value',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'actions',
          label: 'Actions',
          desc: 'Actions',
          width: '100px',
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

    const $textsTable = $div.find('#TextsTable');
    const textsTable = $textsTable[0];
    this.textsTable = new GFTable(this.textsTableData, textsTable);

    const $linksTable = $div.find('#LinksTable');
    const linksTable = $linksTable[0];
    this.linksTable = new GFTable(this.linksTableData, linksTable);

    const $eventsTable = $div.find('#EventsTable');
    const eventsTable = $eventsTable[0];
    this.eventsTable = new GFTable(this.eventsTableData, eventsTable);

    const $THsTable = $div.find('#THsTable');
    const THsTable = $THsTable[0];
    this.THsTable = new GFTable(this.THsTableData, THsTable);

    const $valuesTable = $div.find('#ValuesTable');
    const valuesTable = $valuesTable[0];
    this.valuesTable = new GFTable(this.valuesTableData, valuesTable);

    const $rangesTable = $div.find('#RangesTable');
    const rangesTable = $rangesTable[0];
    this.rangesTable = new GFTable(this.rangesTableData, rangesTable);

    this.getMetricNames = (): string[] => {
      if (this.metricHandler) {
        return this.metricHandler.getNames('serie');
      }
      return [];
    };

    this.getVariables = () => {
      return this.$gf.getFullAvailableVarNames();
    };

    this.getEventValues = [];
  }

  setCurrentParam(prop: string, value: any) {
    this.currentParams.set(prop, value);
  }

  unsetCurrentParam(prop: string) {
    this.currentParams.delete(prop);
  }

  setCurrentMap(map: ObjectMap) {
    this.setCurrentParam('currentMap', map);
  }

  unsetCurrentMap() {
    this.unsetCurrentParam('currentMap');
  }

  getCurrentMap() {
    return this.getCurrentParam('currentMap');
  }

  getCurrentParam(prop: string) {
    return this.currentParams.get(prop);
  }

  getCellNamesTypeHead = () => {
    const map = this.getCurrentMap();
    let values: any = [];
    let options = undefined;
    if (map) {
      options = map.getOptions();
    } else {
      options = this.getCurrentParam('currentOptions');
    }
    if (options) {
      values = this.getCellNames4(options);
    }
    return values;
  };

  getCellNamesMD = () => {
    const map = this.getCurrentMap();
    let values: any = [];
    if (map) {
      const options = map.getOptions();
      const flowchart = this.flowchartHandler?.getFlowchart();
      if (flowchart) {
        values = flowchart.getNamesByOptions(options, 'value');
      }
    }
    return values;
  };

  getCellNames4(options: gf.TRuleMapOptions) {
    let filter: any[] = [];
    if (options) {
      const flowchart = this.flowchartHandler?.getFlowchart();
      if (flowchart) {
        filter = flowchart.getNamesByOptions(options);
      }
    }
    return filter;
  }

  isFirstRule(index: number): boolean {
    if (index === 0) {
      return true;
    }
    return false;
  }

  isOnlySeries(): boolean {
    const bool = this.metricHandler?.isTypeOf('serie') && !this.metricHandler?.isTypeOf('table');
    if (bool !== undefined) {
      return bool;
    }
    return false;
  }

  isOnlyTables(): boolean {
    const bool = !this.metricHandler?.isTypeOf('serie') && this.metricHandler?.isTypeOf('table');
    if (bool !== undefined) {
      return bool;
    }
    return false;
  }

  isMultipleType(): boolean {
    const bool = this.metricHandler?.isTypeOf('serie') && this.metricHandler?.isTypeOf('table');
    if (bool !== undefined) {
      return bool;
    }
    return false;
  }

  initType(rule: Rule) {
    if (this.isOnlyTables()) {
      rule.data.metricType = 'table';
    } else if (this.isOnlySeries()) {
      rule.data.metricType = 'serie';
    }
  }

  getTablesName(): string[] {
    if (this.metricHandler) {
      return this.metricHandler.getNames('table');
    }
    return [];
  }

  getColumnsForTable(tableName: string): string[] {
    if (this.metricHandler) {
      return this.metricHandler.getColumnsName(tableName, 'table');
    }
    return [];
  }

  getFastEditMectricNames(rule: Rule): string[] {
    if(this.$gf.metricHandler) {
      return this.$gf.metricHandler?.getMetricNames()
    }
    return []
  }

  // getFastEditMectricName(rule: Rule): string {
  //   let result = '';
  //   if (this.isMultipleType()) {
  //     if (rule.data.metricType === 'serie') {
  //       result += 'Series/' + rule.data.pattern;
  //     } else {
  //       result += 'Tables/' + rule.data.refId + '/' + rule.data.column;
  //     }
  //   } else {
  //     if (this.isOnlySeries()) {
  //       result = rule.data.pattern;
  //     } else {
  //       result = rule.data.refId + '/' + rule.data.column;
  //     }
  //   }
  //   return result;
  // }

  // setFastEditMectricName(rule: Rule) {
  //   if (rule.FE_metricName) {
  //     const metric = rule.FE_metricName.split('/');
  //     const length = metric.length;
  //     if (this.isMultipleType()) {
  //       if (length === 3) {
  //         if (metric[0] === 'Tables') {
  //           rule.data.metricType = 'table';
  //           rule.data.refId = metric[1];
  //           rule.data.column = metric[2];
  //         } else {
  //           this.$gf.notify('Invalid name metric : ' + rule.FE_metricName, 'error');
  //           return null;
  //         }
  //       } else if (length === 2) {
  //         if (metric[0] === 'Series') {
  //           rule.data.metricType = 'serie';
  //           rule.data.pattern = metric[1];
  //         } else {
  //           this.$gf.notify('Invalid name metric : ' + rule.FE_metricName, 'error');
  //           return null;
  //         }
  //       } else {
  //         this.$gf.notify('Invalid name metric : ' + rule.FE_metricName, 'error');
  //         return null;
  //       }
  //     } else if (this.isOnlySeries()) {
  //       rule.data.metricType = 'serie';
  //       rule.data.pattern = metric[0];
  //     } else if (this.isOnlyTables()) {
  //       rule.data.metricType = 'table';
  //       rule.data.refId = metric[0];
  //       rule.data.column = metric[1];
  //     } else {
  //       this.$gf.notify('Invalid name metric : ' + rule.FE_metricName, 'error');
  //       return null;
  //     }
  //   }
  //   rule.FE_metricName = this.getFastEditMectricName(rule);
  //   return rule.FE_metricName;
  // }

  ValidateDate(rule: Rule): boolean {
    if (rule.dataType !== 'date') {
      return true;
    }
    try {
      let metricType: gf.TMetricTypeKeys = 'serie';
      let metricName = rule.metricPattern;
      let columnName: string | undefined = undefined;
      if (rule.metricType === 'table') {
        metricType = 'table';
        metricName = rule.metricTable;
        columnName = rule.metricColumn;
      }
      if (this.metricHandler) {
        const metrics = this.metricHandler.findMetrics(metricName, metricType);
        const length = metrics.length;
        for (let index = 0; index < length; index++) {
          const m = metrics[index];
          const value = m.getValue(rule.aggregation, columnName);
          if (!DateTH.isValidDate(value)) {
            this.$gf.notify(
              `The value for the metric ${m.getName()} and the aggregation ${this.$gf.GetT4V(
                this.aggregationTypes,
                rule.aggregation
              )} is not a valid date : ${value}`
            );
            return false;
          }
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  getColumnsNameForRule(rule: Rule): string[] {
    let metricType: gf.TMetricTypeKeys = 'serie';
    let tableName = rule.data.pattern;
    if (rule.data.metricType === 'table') {
      metricType = 'table';
      tableName = rule.metricTable;
    }
    if (this.metricHandler) {
      return this.metricHandler.getColumnsName(tableName, metricType);
    }
    return [];
  }

  isLastRule(index: number): boolean {
    const count = this.rulesHandler?.countRules();
    if (count !== undefined && index === count - 1) {
      return true;
    }
    return false;
  }

  render() {
    this.ctrl.render();
  }

  setUnitFormat(rule: Rule, subItem: any) {
    rule.data.unit = subItem.value;
    // this.onRulesChange();
  }

  onRulesChange(rule?: Rule) {
    if(rule) {
      rule.change();
    }
    else {
      this.ctrl.rulesHandler?.change();
    }
    return true;
  }

  removeShapeMap(rule: Rule, index: number) {
    const shape = rule.getShapeMap(index);
    this.unhighlightXCells(shape);
    rule.removeShapeMap(index);
  }

  removeTextMap(rule: Rule, index: number) {
    const txt = rule.getTextMap(index);
    this.unhighlightXCells(txt);
    rule.removeTextMap(index);
  }

  removeLinkMap(rule: Rule, index: number) {
    const lnk = rule.getLinkMap(index);
    this.unhighlightXCells(lnk);
    rule.removeLinkMap(index);
  }

  removeEventMap(rule: Rule, index: number) {
    const evt = rule.getEventMap(index);
    this.unhighlightXCells(evt);
    rule.removeEventMap(index);
  }

  /**
   * Add Color
   *
   * @param {Number} ruleIndex
   * @param {Number} colorIndex
   * @memberof RulesOptionsCtrl
   */
  onColorChange(th: NumberTH | StringTH | DateTH) {
    return (newColor: any) => {
      th.color = newColor;
    };
  }

  /**
   * Display cell selection in graph
   * @param  {} prop
   * @param  {} pattern
   */
  highlightXCells(map: ObjectMap) {
    const flowchart = this.flowchartHandler?.getFlowchart();
    const xgraph = flowchart?.getXGraph();
    if (xgraph) {
      xgraph.highlightXCells(map.pattern, map.getOptions(), true);
    }
  }

  /**
   * Undisplay cell selection
   *
   * @memberof RulesOptionsCtrl
   */
  unhighlightXCells(map: ObjectMap) {
    const flowchart = this.flowchartHandler?.getFlowchart();
    const xgraph = flowchart?.getXGraph();
    if (xgraph) {
      xgraph.highlightXCells(map.pattern, map.getOptions(), false);
    }
  }

  /**
   * Disable/Enable rule
   *
   * @param {Rule} rule
   * @param {boolean} bool
   * @memberof RulesOptionsCtrl
   */
  // toggleShow(rule: Rule, bool: boolean) {
  //   rule.data.hidden = bool;
  //   this.onRulesChange();
  // }

  /**
   * Turn Highlight on of cells in rule
   *
   * @param {*} rule
   * @memberof RulesOptionsCtrl
   */
  async highlightXCells4Rule(rule: Rule) {
    rule.highlightXCells();
  }

  /**
   * Turn Highlight off of cells in rule
   *
   * @param {*} rule
   * @memberof RulesOptionsCtrl
   */
  async unhighlightXCells4Rule(rule: Rule) {
    rule.unhighlightXCells();
  }

  /**
   * Turn Highlight off all cells
   *
   * @param {*} rule
   * @memberof RulesOptionsCtrl
   */
  async unhighlightAllCells() {
    const flowchart = this.flowchartHandler?.getFlowchart();
    const xgraph = flowchart?.getXGraph();
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
      this.unhighlightAllCells();
      this.rulesHandler?.removeRule(rule);
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
    this.rulesHandler?.cloneRule(rule);
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
      this.rulesHandler?.moveRuleToUp(rule);
    } else {
      this.rulesHandler?.moveRuleToDown(rule);
    }
    this.onRulesChange();
  }

  // setRuleMappings(rule: Rule): this {
  //   const _setTarget = (xcell: XCell) => {
  //     if (xcell) {
  //       let mapsList: ObjectMapArray[] = [
  //         rule.getShapeMaps(),
  //         rule.getTextMaps(),
  //         rule.getLinkMaps(),
  //         rule.getEventMaps(),
  //       ];
  //       let optionsList: gf.TRuleMapOptions[] = [
  //         rule.getShapeMapOptions(),
  //         rule.getTextMapOptions(),
  //         rule.getLinkMapOptions(),
  //         rule.getEventMapOptions(),
  //       ];
  //       for (let index = 0; index < optionsList.length; index++) {
  //         const options = optionsList[index];
  //         const maps = mapsList[index];
  //         const value = xcell.getDefaultValues(options);
  //         if (value) {
  //           maps.forEach((map) => {
  //             map.setPattern(value);
  //           });
  //         }
  //       }
  //       this.onRulesChange();
  //     }
  //   };
  //   this.flowchartHandler?.setMaps(_setTarget.bind(this));
  //   return this;
  // }

  //
  // Events
  //
  onEventValue(event: EventMap) {
    this.getEventValues = event.getTypeahead();
  }
}

/** @ngInject */
export function rulesOptionsTab($q: any, uiSegmentSrv: any) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${GFPlugin.getPartialPath()}/rules/rulesTab.html`,
    controller: RulesOptionsCtrl,
  };
}
