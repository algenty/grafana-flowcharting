import XGraph from './graph_class';
import { Rule, EventMap } from './rule_class';
import { Metric } from './metric_class';
import { TooltipHandler } from './tooltipHandler';
import { GFCONSTANT, GFGlobal, GFVariables } from 'globals_class';

/**
 * Class for state of one cell
 *
 * @export
 * @class State
 */
export class State {
  mxcell: mxCell; // mxCell State
  cellId: string; // cell ID in mxcell
  newcellId: string | undefined; // for inspect mode
  previousId: string | undefined; // for inspect mode
  edited: boolean | undefined; // if modified in inspector
  edit: boolean | undefined; // if modified in inspector
  xgraph: XGraph;
  changed = false;
  matched = false;
  shapeState: ShapeState;
  tooltipState: TooltipState;
  iconState: IconState;
  eventState: EventState;
  textState: TextState;
  linkState: LinkState;
  variables: GFVariables;
  globalLevel = -1;
  tooltipHandler: TooltipHandler | null = null;
  originalText: string;

  /**
   * Creates an instance of State.
   * @param {mxCell} mxcell
   * @param {XGraph} xgraph
   * @memberof State
   */
  constructor(mxcell: mxCell, xgraph: XGraph) {
    GFGlobal.log.info('State.constructor()');
    this.mxcell = mxcell;
    this.cellId = mxcell.id;
    this.xgraph = xgraph;
    this.shapeState = new ShapeState(xgraph, mxcell);
    this.tooltipState = new TooltipState(xgraph, mxcell);
    this.iconState = new IconState(xgraph, mxcell);
    this.eventState = new EventState(xgraph, mxcell);
    this.textState = new TextState(xgraph, mxcell);
    this.linkState = new LinkState(xgraph, mxcell);
    this.variables = GFGlobal.createLocalVars();
    this.tooltipHandler = null;
    this.mxcell.GF_tooltipHandler = null;
    this.originalText = this.xgraph.getLabelCell(mxcell);
  }

  /**
   * Call applyState() asynchronously
   *
   * @memberof State
   */
  async async_applyState() {
    // new Promise (this.applyState.bind(this));
    this.applyState();
  }

  /**
   * Define state according to 1 rule and 1 serie without apply display
   *
   * @returns {this}
   * @param {Rule} rule
   * @param {Metric} metric
   * @memberof State
   */
  setState(rule: Rule, metric: Metric): this {
    GFGlobal.log.info('State.setState()');
    let beginPref = performance.now();
    if (!rule.isHidden() && rule.matchMetric(metric)) {
      const shapeMaps = rule.getShapeMaps();
      const textMaps = rule.getTextMaps();
      const linkMaps = rule.getLinkMaps();
      const eventMaps = rule.getEventMaps();
      const value = rule.getValueForMetric(metric);
      const FormattedValue = rule.getFormattedValue(value);
      const level = rule.getThresholdLevel(value);
      const color = rule.data.gradient && rule.data.type === 'number' ? rule.getColorForValue(value) : rule.getColorForLevel(level);
      this.variables.set(GFCONSTANT.VAR_STR_RULENAME, rule.data.pattern);
      this.variables.set(GFCONSTANT.VAR_NUM_VALUE, value);
      this.variables.set(GFCONSTANT.VAR_STR_FORMATED, value);
      this.variables.set(GFCONSTANT.VAR_NUM_LEVEL, level);
      this.variables.set(GFCONSTANT.VAR_STR_COLOR, color);

      // SHAPE
      let cellProp = this.getCellProp(rule.data.shapeProp);
      shapeMaps.forEach(shape => {
        const k = shape.data.style;
        if (!shape.isHidden() && shape.match(cellProp, rule.data.shapeRegEx)) {
          const v = color;
          this.matched = true;
          if (shape.toColorize(level)) {
            this.shapeState.set(k, v, level);
          }
          // TOOLTIP
          if (rule.toTooltipize(level)) {
            this.tooltipState.set('tooltip', true, level);
            this.tooltipState.setTooltip(rule, metric, v, FormattedValue);
          }
          // ICONS
          if (rule.toIconize(level)) {
            this.iconState.set('icon', true, level);
          }
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        }
      });

      // TEXT
      cellProp = this.getCellProp(rule.data.textProp);
      textMaps.forEach(text => {
        const k = 'label';
        if (!text.isHidden() && text.match(cellProp, rule.data.textRegEx) && text.toLabelize(level)) {
          if (text.toLabelize(level)) {
            this.matched = true;
            const textScoped = this.variables.replaceText(FormattedValue);
            const v = text.getReplaceText(this.textState.getMatchValue(k), textScoped);
            this.textState.set(k, v, level);
          }
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        }
      });

      // EVENTS
      cellProp = this.getCellProp(rule.data.eventProp);
      eventMaps.forEach(event => {
        const k = event.data.style;
        if (!event.isHidden() && event.match(cellProp, rule.data.eventRegEx) && event.toEventable(level)) {
          if (event.toEventable(level)) {
            this.matched = true;
            const v = this.variables.eval(event.data.value);
            this.eventState.set(k, v, level);
          }
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        }
      });

      // LINK
      cellProp = this.getCellProp(rule.data.linkProp);
      linkMaps.forEach(link => {
        const k = 'link';
        if (!link.isHidden() && link.match(cellProp, rule.data.linkRegEx)) {
          if (link.toLinkable(level)) {
            this.matched = true;
            const v = this.variables.replaceText(link.getLink());
            this.linkState.set(k, v, level);
          }
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        }
      });
    }
    let endPerf = performance.now();
    rule.execTimes += endPerf - beginPref;
    return this;
  }

  /**
   * Restore initial status of state without apply display.
   * Use applyState() to apply on graph (color, level and text)
   *
   * @returns {this}
   * @memberof State
   */
  unsetState(): this {
    GFGlobal.log.info('State.unsetState()');
    this.eventState.unset();
    this.textState.unset();
    this.linkState.unset();
    this.tooltipState.unset();
    this.iconState.unset();
    this.matched = false;
    return this;
  }

  /**
   *
   *
   * @param {string} prop - id|value
   * @returns {string|null} return original value of id or label of cell
   * @memberof State
   */
  getCellProp(prop: gf.TPropertieKey): string | null {
    if (prop === 'id') {
      return this.cellId;
    }
    if (prop === 'value') {
      return this.originalText;
    }
    return null;
  }

  /**
   * Get the highest/global level
   *
   * @returns {number}
   * @memberof State
   */
  getLevel(): number {
    return this.globalLevel;
  }

  /**
   * Return true if is a shape/vertex
   *
   * @returns
   * @memberof State
   */
  isShape(): boolean {
    return this.mxcell.isVertex();
  }

  /**
   * Return true if is a arrow/connector
   *
   * @returns
   * @memberof State
   */
  isConnector(): boolean {
    return this.mxcell.isEdge();
  }

  /**
   * Apply new state
   *
   * @returns {this}
   * @memberof State
   */
  applyState(): this {
    GFGlobal.log.info('State.applyState()');
    if (this.matched || this.changed) {
      this.changed = true;
      this.shapeState.apply();
      this.tooltipState.apply();
      this.iconState.apply();
      this.textState.apply();
      this.eventState.apply();
      this.linkState.apply();
    }
    return this;
  }

  /**
   * Reset and restore state
   *
   * @returns {this}
   * @memberof State
   */
  reset(): this {
    this.shapeState.reset();
    this.tooltipState.reset();
    this.iconState.reset();
    this.textState.reset();
    this.eventState.reset();
    this.linkState.reset();
    this.variables.clear();
    this.changed = false;
    return this;
  }

  /**
   * Prepare state for a new rule and serie
   *
   * @returns {this}
   * @memberof State
   */
  prepare(): this {
    if (this.changed) {
      this.shapeState.prepare();
      this.tooltipState.prepare();
      this.iconState.prepare();
      this.textState.prepare();
      this.eventState.prepare();
      this.linkState.prepare();
      this.variables.clear();
      this.matched = false;
    }
    return this;
  }

  /**
   * Highlight mxcell
   *
   * @returns {this}
   * @memberof State
   */
  highlightCell(): this {
    this.xgraph.highlightCell(this.mxcell);
    return this;
  }

  /**
   * Unhighlight mxcell
   *
   * @returns {this}
   * @memberof State
   */
  unhighlightCell(): this {
    this.xgraph.unhighlightCell(this.mxcell);
    return this;
  }
}

/**
 * Mother of sub states
 *
 * @class GFState
 */
export class GFState {
  xgraph: XGraph;
  mxcell: mxCell;
  keys: string[] = [];
  matchedKey: Map<string, boolean> = new Map();
  changedKey: Map<string, boolean> = new Map();
  originalValue: Map<string, any> = new Map();
  matchValue: Map<string, any> = new Map();
  // lastValue: Map<string, any> = new Map(); To not apply the same value
  matchLevel: Map<string, number> = new Map();

  constructor(xgraph: XGraph, mxcell: mxCell) {
    this.xgraph = xgraph;
    this.mxcell = mxcell;
    this.init_core();
  }

  init_core() {}

  addValue(key: string, value: any) {
    this.originalValue.set(key, value);
    this.matchValue.set(key, value);
    // this.lastValue.set(key, value); To not apply the same value
    this.matchLevel.set(key, -1);
    this.matchedKey.set(key, false);
    this.changedKey.set(key, false);
    GFGlobal.log.debug('GFState.addValue from ' + this.constructor.name + ' [' + this.mxcell.id + '] KEY=' + key + ' VALUE=' + value);
  }

  getOriginalValue(key: string): any | undefined {
    return this.originalValue.get(key);
  }

  getMatchValue(key: string): any | undefined {
    return this.matchValue.get(key);
  }

  set(key: string, value: any, level: number): this {
    let matchLevel = this.matchLevel.get(key);
    if (matchLevel === undefined) {
      this.addValue(key, value);
      this.set(key, value, level);
      return this;
    }
    if (matchLevel <= level) {
      this.matchLevel.set(key, level);
      this.matchedKey.set(key, true);
      this.matchValue.set(key, value);
    }
    return this;
  }

  apply(key?: string): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        GFGlobal.log.debug('GFState.apply from ' + this.constructor.name + ' [' + this.mxcell.id + '] MATCHED KEY=' + key);
        let value = this.getMatchValue(key);
        try {
          this.apply_core(key, value);
        } catch (error) {
          GFGlobal.log.error('Error on reset for key ' + key, error);
        }
        this.changedKey.set(key, true);
        this.matchedKey.set(key, false);
      } else if (this.isChanged(key)) {
        GFGlobal.log.debug('GFState.apply from ' + this.constructor.name + ' [' + this.mxcell.id + '] CHANGED KEY=' + key);
        this.reset(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  apply_core(key: any, value: any) {}

  isMatched(key?: string): boolean {
    if (key !== undefined) {
      return this.matchedKey.get(key) === true;
    }
    let matched = false;
    this.keys.forEach(key => {
      matched = this.isMatched(key) ? true : matched;
    });
    return matched;
  }

  isChanged(key?: string): boolean {
    if (key !== undefined) {
      return this.changedKey.get(key) === true;
    }
    let changed = false;
    this.keys.forEach(key => {
      changed = this.isChanged(key) ? true : changed;
    });
    return changed;
  }

  unset(key?: string): this {
    if (key !== undefined) {
      this.matchValue.set(key, this.originalValue.get(key));
      this.matchedKey.set(key, false);
      this.matchLevel.set(key, -1);
    } else {
      this.keys.forEach(key => {
        this.unset(key);
      });
    }
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined) {
      GFGlobal.log.debug('GFState.reset from ' + this.constructor.name + ' [' + this.mxcell.id + '] KEY=' + key);
      this.unset(key);
      let value = this.getOriginalValue(key);
      try {
        // debugger
        this.reset_core(key, value);
      } catch (error) {
        GFGlobal.log.error('Error on reset for key ' + key, error);
      }
      this.changedKey.set(key, false);
      this.matchedKey.set(key, false);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
    }
    return this;
  }

  reset_core(key: any, value: any) {}

  prepare(): this {
    if (this.isChanged()) {
      this.unset();
    }
    return this;
  }
}

/**
 * Event SubState
 *
 * @class EventState
 * @extends {GFState}
 */
class EventState extends GFState {
  keys: gf.TStyleEventKeys[] = [];
  geo:
    | {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    | undefined = undefined;
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init_core();
  }

  init_core() {
    this.keys = GFCONSTANT.EVENTMETHODS.map(x => x.value);
    this.geo = this.xgraph.getSizeCell(this.mxcell);
    this.keys.forEach(key => {
      const value = this._get(key);
      this.addValue(key, value);
    });
  }

  async apply_core(key: gf.TStyleEventKeys, value: any) {
    if (value === undefined) {
      value = null;
    }
    this._set(key, value);
  }

  async reset_core(key: gf.TStyleEventKeys, value: any) {
    if (value === undefined) {
      value = null;
    }
    this._set(key, value);
  }

  _set(key: gf.TStyleEventKeys, value: any) {
    if (value === undefined) {
      value = null;
    }
    let beginValue: any = undefined;
    switch (key) {
      case 'text':
        value = String(value);
        this.xgraph.setLabelCell(this.mxcell, value);
        break;

      case 'visibility':
        value = String(value);
        if (value === '0') {
          this.xgraph.hideCell(this.mxcell);
        } else if (value === '1') {
          this.xgraph.showCell(this.mxcell);
        }
        break;

      case 'fold':
        value = String(value);
        if (value === '0') {
          this.xgraph.collapseCell(this.mxcell);
        } else if (value === '1') {
          this.xgraph.expandCell(this.mxcell);
        }
        break;

      case 'height':
        if (this.geo !== undefined) {
          let height = Number(value);
          if (this.isMatched('height')) {
            let width = this.isMatched('width') ? Number(this.getMatchValue('width')) : undefined;
            this.xgraph.resizeCell(this.mxcell, width, height, this.geo);
            this.unset('width');
          } else {
            if (!this.isMatched('width')) {
              this.xgraph.resetSizeCell(this.mxcell, this.geo);
              this.unset('width');
            }
          }
        }
        break;

      case 'width':
        if (this.geo !== undefined) {
          let width = Number(value);
          if (this.isMatched('width')) {
            let height = this.isMatched('height') ? Number(this.getMatchValue('height')) : undefined;
            this.xgraph.resizeCell(this.mxcell, width, height, this.geo);
            this.unset('width');
          } else {
            if (!this.isMatched('height')) {
              this.xgraph.resetSizeCell(this.mxcell, this.geo);
              this.unset('height');
            }
          }
        }
        break;
      case 'barPos':
      case 'fontSize':
      case 'opacity':
      case 'textOpacity':
      case 'rotation':
        beginValue = this._get(key);
        beginValue = beginValue === undefined ? EventMap.getDefaultValue(key) : beginValue;
        this.xgraph.setStyleAnimCell(this.mxcell, key, value, beginValue);
        break;

      case 'blink':
        if (!!value) {
          this.xgraph.blinkCell(this.mxcell, value);
        } else {
          this.xgraph.unblinkCell(this.mxcell);
        }
        break;

      default:
        this.xgraph.setStyleCell(this.mxcell, key, value);
        break;
    }
  }

  _get(key: gf.TStyleEventKeys): any {
    switch (key) {
      case 'text':
        return this.xgraph.getLabelCell(this.mxcell);
        break;

      case 'visibility':
        return this.xgraph.isVisibleCell(this.mxcell) === false ? '0' : '1';
        break;

      case 'height':
        return this.geo !== undefined ? this.geo.height : undefined;
        break;

      case 'width':
        return this.geo !== undefined ? this.geo.width : undefined;
        break;

      case 'fold':
        return this.xgraph.isCollapsedCell(this.mxcell) === true ? '0' : '1';
        break;

      case 'blink':
        return this.xgraph.geBlinkMxCell(this.mxcell);
        break;

      default:
        return this.xgraph.getStyleCell(this.mxcell, key);
        break;
    }
  }
}

class TextState extends GFState {
  keys: string[] = ['label'];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init_core();
  }

  init_core() {
    const value = this.xgraph.getLabelCell(this.mxcell);
    this.addValue('label', value);
  }

  async apply_core(key: string, value: any) {
    this.xgraph.setLabelCell(this.mxcell, value);
  }

  async reset_core(key: string, value: any) {
    this.xgraph.setLabelCell(this.mxcell, value);
  }
}

class LinkState extends GFState {
  keys: string[] = ['link'];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init_core();
  }

  init_core() {
    const value = this.xgraph.getLink(this.mxcell);
    this.addValue('link', value);
  }

  async apply_core(key: string, value: any) {
    this.xgraph.addLink(this.mxcell, value);
  }

  async reset_core(key: string, value: any) {
    if (value === undefined || value === null || value.length === 0) {
      this.xgraph.removeLink(this.mxcell);
    } else {
      this.xgraph.addLink(this.mxcell, value);
    }
  }
}

class ShapeState extends GFState {
  keys: gf.TStyleColorKeys[] = [];
  fullStylesString: string | undefined;
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init_core();
  }

  init_core() {
    GFGlobal.log.info('ShapeState [' + this.mxcell.id + ']');
    this.keys = GFCONSTANT.COLORMETHODS.map(x => x.value);
    this.fullStylesString = this.mxcell.getStyle();
    this.keys.forEach(key => {
      const value = this.xgraph.getStyleCell(this.mxcell, key);
      this.addValue(key, value);
      GFGlobal.log.debug('ShapeState [' + this.mxcell.id + '] Add value : ' + key, value);
    });
    this.mxcell.GF_tooltipHandler = null;
  }

  async apply_core(key: gf.TStyleColorKeys, value: any) {
    if (value === undefined) {
      value = null;
    }
    this.xgraph.setColorAnimCell(this.mxcell, key, value);
  }

  async reset_core(key: gf.TStyleColorKeys, value: any) {
    if (value === undefined) {
      value = null;
    }
    this.xgraph.setColorAnimCell(this.mxcell, key, value);
  }

  // reset(key?: gf.TStyleColorKeys): this {
  //   if (key !== undefined) {
  //     let value: any = this.getOriginalValue(key);
  //     if (value === undefined) {
  //       value = null;
  //     }
  //     this.xgraph.setColorCell(this.mxcell, key, value);
  //     super.reset(key);
  //   } else {
  //     if (!!this.fullStylesString) {
  //       this.xgraph.setStyles(this.mxcell, this.fullStylesString);
  //     }
  //     super.reset();
  //   }
  //   return this;
  // }
}

class TooltipState extends GFState {
  keys: string[] = ['tooltip'];
  tooltipHandler: TooltipHandler | undefined;
  // constructor(xgraph: XGraph, mxcell: mxCell) {
  //   super(xgraph, mxcell);
  //   this.init();
  // }

  init_core() {
    this.addValue('tooltip', false);
    this.tooltipHandler = undefined;
    this.mxcell.GF_tooltipHandler = null;
  }

  async setTooltip(rule: Rule, metric: Metric, color: string, value: string) {
    let tpColor: string | null = null;
    let label: string = rule.data.tooltipLabel;
    if (this.tooltipHandler === null || this.tooltipHandler === undefined) {
      this.tooltipHandler = new TooltipHandler(this.mxcell);
    }
    if (label === null || label.length === 0) {
      if (rule.data.metricType === 'serie') {
        label = metric.getName();
      }
      if (rule.data.metricType === 'table') {
        label = rule.data.column;
      }
    }
    if (rule.data.tooltipColors) {
      tpColor = color;
    }
    // METRIC
    const metricToolip = this.tooltipHandler
      .addMetric()
      .setLabel(label)
      .setValue(value)
      .setColor(tpColor)
      .setDirection(rule.data.tpDirection);
    // GRAPH
    if (rule.data.tpGraph) {
      const graph = metricToolip.addGraph(rule.data.tpGraphType);
      graph
        .setColor(tpColor)
        .setColumn(rule.data.column)
        .setMetric(metric)
        .setSize(rule.data.tpGraphSize)
        .setScaling(rule.data.tpGraphLow, rule.data.tpGraphHigh)
        .setScale(rule.data.tpGraphScale);
    }
    // Date
    this.tooltipHandler.updateDate();
  }

  apply(key?: string): this {
    if (key !== undefined && key === 'tooltip') {
      if (this.isMatched(key) && this.getMatchValue(key) === true) {
        if (this.tooltipHandler != null && this.tooltipHandler.isChecked()) {
          this.mxcell.GF_tooltipHandler = this.tooltipHandler;
        }
        super.apply(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  prepare(): this {
    super.prepare();
    this.reset();
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined && key === 'tooltip') {
      this.mxcell.GF_tooltipHandler = null;
      if (this.tooltipHandler) {
        this.tooltipHandler.destroy();
      }
      this.tooltipHandler = undefined;
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
    }
    return this;
  }
}

class IconState extends GFState {
  keys: string[] = ['icon'];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    this.addValue('icon', false);
  }

  apply(key?: string): this {
    if (key !== undefined && key === 'icon') {
      if (this.isMatched(key) && this.getMatchValue(key) === true) {
        if (!this.isChanged(key)) {
          this.xgraph.addOverlay(`WARNING/ERROR`, this.mxcell);
        }
        super.apply(key);
      } else if (this.isChanged(key)) {
        this.reset(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined && key === 'icon') {
      this.xgraph.removeOverlay(this.mxcell);
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
    }
    return this;
  }
}
