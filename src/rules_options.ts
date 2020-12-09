import { FlowchartHandler } from './flowchartHandler';
import { RulesHandler } from './rulesHandler';
import { Rule } from './rule_class';
import { EventMap, ObjectMapArray } from './mapping_class';
import { $GF, GFTable } from './globals_class';
import grafana from 'grafana_func';
import _ from 'lodash';
import { MetricHandler } from './metricHandler';
import { DateTH, NumberTH, StringTH } from 'threshold_class';
import XGraph from 'graph_class';

/**
 * Rules tab controller
 *
 * @export
 * @class RulesOptionsCtrl
 */
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
  comparator = $GF.CONSTANTS.COMPARATOR_TYPES;
  EventType = EventMap.getDefaultMethods();
  tpDirection: gf.TSelectString[] = $GF.CONSTANTS.TOOLTIP_DIRECTION_TYPES;
  propTypes: gf.TSelectString[] = $GF.CONSTANTS.IDENT_TYPES;
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
  getCellNames4: (prop : gf.TPropertieKey, attribute ?:string) => string[];
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
    let n = 0;
    this.rulesTableData = {
      data: [],
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '<>',
          desc: 'Expand/collapse',
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

    this.getCellNames4 = (prop : gf.TPropertieKey, attribute ?: string) => {
      return () => {
        const flowchart = this.flowchartHandler.getFlowchart();
        const cells = flowchart.getNamesByProp(prop);
        const uniq = new Set(cells);
        let filter = [...uniq];
        filter = filter.filter(e => e !== undefined && e.length > 0);
        return filter;
      }
    }

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

  getFastEditMectricNames(rule: Rule): string[] {
    const result: string[] = [];
    let prefix = '';
    if (this.isMultipleType()) {
      prefix = 'Series/';
    }
    this.getMetricNames().forEach(m => result.push(`${prefix}${m}`));
    if (this.isMultipleType()) {
      prefix = 'Tables/';
    }
    this.getTablesName().forEach(t => {
      this.getColumnsForTable(t).forEach(c => result.push(`${prefix}${t}/${c}`));
    });
    rule.FE_metricName = this.getFastEditMectricName(rule);
    return result;
  }

  getFastEditMectricName(rule: Rule): string {
    let result: string = '';
    if (this.isMultipleType()) {
      if (rule.data.metricType === 'serie') {
        result += 'Series/' + rule.data.pattern;
      } else {
        result += 'Tables/' + rule.data.refId + '/' + rule.data.column;
      }
    } else {
      if (this.isOnlySeries()) {
        result = rule.data.pattern;
      } else {
        result = rule.data.refId + '/' + rule.data.column;
      }
    }
    return result;
  }

  setFastEditMectricName(rule: Rule) {
    if (rule.FE_metricName) {
      const metric = rule.FE_metricName.split('/');
      const length = metric.length;
      if (this.isMultipleType()) {
        if (length === 3) {
          if (metric[0] === 'Tables') {
            rule.data.metricType = 'table';
            rule.data.refId = metric[1];
            rule.data.column = metric[2];
          } else {
            this.ctrl.notify('Invalid name metric : ' + rule.FE_metricName, 'error');
            return null;
          }
        } else if (length === 2) {
          if (metric[0] === 'Series') {
            rule.data.metricType = 'serie';
            rule.data.pattern = metric[1];
          } else {
            this.ctrl.notify('Invalid name metric : ' + rule.FE_metricName, 'error');
            return null;
          }
        } else {
          this.ctrl.notify('Invalid name metric : ' + rule.FE_metricName, 'error');
          return null;
        }
      } else if (this.isOnlySeries()) {
        rule.data.metricType = 'serie';
        rule.data.pattern = metric[0];
      } else if (this.isOnlyTables()) {
        rule.data.metricType = 'table';
        rule.data.refId = metric[0];
        rule.data.column = metric[1];
      } else {
        this.ctrl.notify('Invalid name metric : ' + rule.FE_metricName, 'error');
        return null;
      }
    }
    rule.FE_metricName = this.getFastEditMectricName(rule);
    return rule.FE_metricName;
  }

  ValidateDate(rule: Rule): boolean {
    if (rule.data.type !== 'date') {
      return true;
    }
    try {
      let metricType: gf.TMetricTypeKeys = 'serie';
      let metricName = rule.data.pattern;
      let columnName: string | undefined = undefined;
      if (rule.data.metricType === 'table') {
        metricType = 'table';
        metricName = rule.data.refId;
        columnName = rule.data.column;
      }
      const metrics = this.metricHandler.findMetrics(metricName, metricType);
      const length = metrics.length;
      for (let index = 0; index < length; index++) {
        const m = metrics[index];
        const value = m.getValue(rule.data.aggregation, columnName);
        if (!DateTH.isValidDate(value)) {
          this.ctrl.notify(
            `The value for the metric ${m.getName()} and the aggregation ${$GF.GetT4V(
              this.aggregationTypes,
              rule.data.aggregation
            )} is not a valid date : ${value}`
          );
          return false;
          break;
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
      tableName = rule.data.refId;
    }
    return this.metricHandler.getColumnsName(tableName, metricType);
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
    console.log('RulesOptionsCtrl -> onRulesChange -> onRulesChange');
    $GF.log.info('RulesOptionsCtrl.onRulesChange()');
    this.flowchartHandler.onRulesChange();
    this.render();
    return true;
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
  onColorChange(th: NumberTH | StringTH) {
    return (newColor: any) => {
      th.setColor(newColor);
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

  identifyCell(prop: gf.TPropertieKey, value: string) {
    const id = 'identifyCell';
    $GF.clearUniqTimeOut(id);
    const self = this;
    let count = 0;
    const select = () => {
      self.selectCell(prop, value);
      count = count + 1;
      $GF.setUniqTimeOut(unselect, 500, id);
    };
    const unselect = () => {
      self.unselectCell(prop, value);
      if (count < 3) {
        $GF.setUniqTimeOut(select, 500, id);
      }
    };
    select();
    return true;
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

  setRuleMappings(rule: Rule): this {
    const _setTarget = (cell: mxCell) => {
      if (cell) {
        let mapsList: ObjectMapArray[] = [rule.shapeMaps, rule.textMaps, rule.linkMaps, rule.eventMaps];
        let propList: gf.TPropertieKey[] = [
          rule.data.shapeProp,
          rule.data.textProp,
          rule.data.linkProp,
          rule.data.eventProp,
        ];
        for (let index = 0; index < propList.length; index++) {
          const prop = propList[index];
          const maps = mapsList[index];
          const value = XGraph.getValuePropOfMxCell(prop, cell);
          if (value) {
            maps.forEach(map => {
              map.setPattern(value);
            });
          }
        }
        this.onRulesChange();
      }
    };
    this.flowchartHandler.setMaps(_setTarget.bind(this));
    return this;
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
