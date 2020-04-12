import XGraph from './graph_class';
import { Rule } from './rule_class';
import { Metric } from './metric_class';
import { TooltipHandler } from './tooltipHandler';
import { GFCONSTANT } from 'constant_class';

/**
 * Class for state of one cell
 *
 * @export
 * @class State
 */
export default class State {
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
    GFP.log.info('State.constructor()');
    this.mxcell = mxcell;
    this.cellId = mxcell.id;
    this.xgraph = xgraph;
    this.shapeState = new ShapeState(xgraph, mxcell);
    this.tooltipState = new TooltipState(xgraph, mxcell);
    this.iconState = new IconState(xgraph, mxcell);
    this.eventState = new EventState(xgraph, mxcell);
    this.textState = new TextState(xgraph, mxcell);
    this.linkState = new LinkState(xgraph, mxcell);
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
    GFP.log.info('State.setState()');
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

      // SHAPE
      let cellProp = this.getCellProp(rule.data.shapeProp);
      shapeMaps.forEach(shape => {
        const k = shape.data.style;
        // GFP.log.debug('SHAPE - event', shape);
        // GFP.log.debug('SHAPE - value', value);
        // GFP.log.debug('SHAPE - level', level);
        // GFP.log.debug('SHAPE - !shape.isHidden()', !shape.isHidden());
        // GFP.log.debug('SHAPE - shape.match(cellProp, rule.data.eventRegEx)', shape.match(cellProp, rule.data.eventRegEx));
        // GFP.log.debug('SHAPE - shape.toColorize(level)', shape.toColorize(level));
        // GFP.log.debug('SHAPE - Global conditions', !shape.isHidden() && shape.match(cellProp, rule.data.eventRegEx) && shape.toColorize(level));
        if (!shape.isHidden() && shape.match(cellProp, rule.data.shapeRegEx) && shape.toColorize(level)) {
          this.matched = true;
          const v = color;
          this.shapeState.set(k, v, level);
          // TOOLTIP
          if (rule.toTooltipize(level)) {
            this.tooltipState.set('tooltip', true, level);
            this.tooltipState.setTooltip(rule, metric, color, FormattedValue);
          }
          // ICONS
          if (rule.toIconize(level)) {
            this.iconState.set('icon', true, level);
          }
          rule.toIconize(level);
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        } 
        // else if (this.shapeState.isChanged(k) && !this.shapeState.isMatched(k)) {
        //   GFP.log.debug('SHAPE - Unset it');
        //   this.shapeState.unset(k);
        //   if (!this.shapeState.isMatched()) {
        //     this.tooltipState.unset();
        //     this.iconState.unset();
        //   }
        // }
      });

      // TEXT
      cellProp = this.getCellProp(rule.data.textProp);
      textMaps.forEach(text => {
        const k = 'label';
        if (!text.isHidden() && text.match(cellProp, rule.data.textRegEx) && text.toLabelize(level)) {
          this.matched = true;
          const v = GFP.replaceWithText(FormattedValue);
          this.textState.set(k, v, level);
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        }
        // else if (this.textState.isChanged() && !this.textState.isMatched(k)) {
        //   this.textState.unset();
        // }
      });

      // EVENTS
      cellProp = this.getCellProp(rule.data.eventProp);
      eventMaps.forEach(event => {
        const k = event.data.style;
        // GFP.log.debug('EVENT - event', event);
        // GFP.log.debug('EVENT - value', value);
        // GFP.log.debug('EVENT - level', level);
        // GFP.log.debug('EVENT - !event.isHidden()', !event.isHidden());
        // GFP.log.debug('EVENT - event.match(cellProp, rule.data.eventRegEx)', event.match(cellProp, rule.data.eventRegEx));
        // GFP.log.debug('EVENT - event.toEventable(level)', event.toEventable(level));
        // GFP.log.debug('EVENT - Global conditions', !event.isHidden() && event.match(cellProp, rule.data.eventRegEx) && event.toEventable(level));
        if (!event.isHidden() && event.match(cellProp, rule.data.eventRegEx) && event.toEventable(level)) {
          this.matched = true;
          const v = event.data.value;
          this.eventState.set(k, v, level);
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        }
        // else if (this.eventState.isChanged(k) && !this.eventState.isMatched(k)) {
        //   GFP.log.debug('EVENT - Unset it');
        //   this.eventState.unset(k);
        // }
      });

      // LINK
      cellProp = this.getCellProp(rule.data.linkProp);
      linkMaps.forEach(link => {
        const k = 'link';
        if (!link.isHidden() && link.match(cellProp, rule.data.linkRegEx) && link.toLinkable(level)) {
          this.matched = true;
          const v = GFP.replaceWithText(link.getLink());
          this.linkState.set(k, v, level);
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        }
        // else if (this.linkState.isChanged() && !this.linkState.isMatched(k)) {
        //   this.linkState.unset();
        // }
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
    GFP.log.info('State.unsetState()');
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
    GFP.log.info('State.applyState()');
    if (this.matched) {
      this.changed = true;

      // SHAPE
      // if (this.shapeState.isMatched()) {
      //   this.shapeState.apply();
      // } else if (this.shapeState.isChanged()) {
      //   this.shapeState.reset();
      // }
      this.shapeState.apply();

      // TOOLTIP
      // if (this.tooltipState.isMatched()) {
      //   this.tooltipState.apply();
      // } else if (this.tooltipState.isChanged()) {
      //   this.tooltipState.reset();
      // }
      this.tooltipState.apply();

      // ICON
      // if (this.iconState.isMatched()) {
      //   this.iconState.apply();
      // } else if (this.iconState.isChanged()) {
      //   this.iconState.reset();
      // }
      this.iconState.apply();

      // TEXTS
      // if (this.textState.isMatched()) {
      //   this.textState.apply();
      // } else if (this.textState.isChanged()) {
      //   this.textState.reset();
      // }
      this.textState.apply();

      // EVENTS
      // // debugger
      // if (this.eventState.isMatched()) {
      //   this.eventState.apply();
      // } else if (this.eventState.isChanged()) {
      //   this.eventState.reset();
      // }
      this.eventState.apply();

      // LINKS
      // if (this.linkState.isMatched()) {
      //   this.linkState.apply();
      // } else if (this.linkState.isChanged()) {
      //   this.linkState.reset();
      // }
      this.linkState.apply();

    } else if (this.changed) {
      this.reset();
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
class GFState {
  // changed = false;
  // matched = false;
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
    this.init();
  }

  init() { }

  addValue(key: string, value: any) {
    this.originalValue.set(key, value);
    this.matchValue.set(key, value);
    // this.lastValue.set(key, value); To not apply the same value
    this.matchLevel.set(key, -1);
    this.matchedKey.set(key, false);
    this.changedKey.set(key, false);
    GFP.log.debug("GFState.addValue from " + this.constructor.name + " [" + this.mxcell.id + "] KEY=" + key + " VALUE=" + value);
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
        GFP.log.debug("GFState.apply from " + this.constructor.name + " [" + this.mxcell.id + "] MATCHED KEY=" + key);
        this.changedKey.set(key, true);
        this.matchedKey.set(key,false);
      }
      else if (this.isChanged(key)) {
        GFP.log.debug("GFState.apply from " + this.constructor.name + " [" + this.mxcell.id + "] CHANGED KEY=" + key);
        this.reset(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

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
      this.unset(key);
      GFP.log.debug("GFState.reset from " + this.constructor.name + " [" + this.mxcell.id + "] KEY=" + key);
      this.changedKey.set(key, false);
      this.matchedKey.set(key, false);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
    }
    return this;
  }

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
  keys: gf.TStyleEventKeys[] = GFCONSTANT.EVENTMETHODS.map(x => x.value);
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    this.keys.forEach(key => {
      const value = this.xgraph.getStyleCell(this.mxcell, key);
      this.addValue(key, value);
    });
  }

  apply(key?: gf.TStyleEventKeys): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        let value: any = this.getMatchValue(key);
        if (value === undefined) {
          value = null;
        }
        this.xgraph.setStyleCell(this.mxcell, key, value);
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

  reset(key?: gf.TStyleEventKeys): this {
    if (key !== undefined) {
      let value: any = this.getOriginalValue(key);
      if (value === undefined) {
        value = null;
      }
      this.xgraph.setStyleCell(this.mxcell, key, value);
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
    }
    return this;
  }
}

class TextState extends GFState {
  keys: string[] = ['label'];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    const value = this.xgraph.getLabelCell(this.mxcell);
    this.addValue('label', value);
  }

  apply(key?: string): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        let value: any = this.getMatchValue(key);
        if (value === undefined) {
          value = null;
        }
        this.xgraph.setLabelCell(this.mxcell, value);
        super.apply(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
      super.apply();
    }
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined) {
      let value: any = this.getOriginalValue(key);
      if (value === undefined) {
        value = null;
      }
      this.xgraph.setLabelCell(this.mxcell, value);
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
      super.reset();
    }
    return this;
  }
}

class LinkState extends GFState {
  keys: string[] = ['link'];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    const value = this.xgraph.getLink(this.mxcell);
    this.addValue('link', value);
    GFP.log.debug('Original Link', this.originalValue);
  }

  apply(key?: string): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        let value: any = this.getMatchValue(key);
        if (value === undefined) {
          value = null;
        }
        this.xgraph.addLink(this.mxcell, value);
        super.apply(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined) {
      let value: any = this.getOriginalValue(key);
      if (value === undefined) {
        value = null;
      }
      this.xgraph.addLink(this.mxcell, value);
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
    }
    return this;
  }
}

class ShapeState extends GFState {
  keys: gf.TStyleColorKeys[] = GFCONSTANT.COLORMETHODS.map(x => x.value);
  fullStylesString: string;
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.fullStylesString = mxcell.getStyle();
    this.init();
  }

  init() {
    GFP.log.info('ShapeState [' + this.mxcell.id + ']');
    this.keys.forEach(key => {
      const value = this.xgraph.getStyleCell(this.mxcell, key);
      this.addValue(key, value);
      GFP.log.debug('ShapeState [' + this.mxcell.id + '] Add value : ' + key, value);
    });
    this.mxcell.GF_tooltipHandler = null;
  }

  apply(key?: gf.TStyleColorKeys): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        let value: any = this.getMatchValue(key);
        if (value === undefined) {
          value = null;
        }
        this.xgraph.setColorCell(this.mxcell, key, value);
        super.apply(key);
      }
      else if (this.isChanged(key)) {
        this.reset(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  reset(key?: gf.TStyleColorKeys): this {
    if (key !== undefined) {
      let value: any = this.getOriginalValue(key);
      if (value === undefined) {
        value = null;
      }
      this.xgraph.setColorCell(this.mxcell, key, value);
      super.reset(key);
    } else {
      this.xgraph.setStyles(this.mxcell, this.fullStylesString);
      super.reset();
    }
    return this;
  }
}

class TooltipState extends GFState {
  keys: string[] = ['tooltip'];
  tooltipHandler: TooltipHandler | undefined;
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    this.addValue('tooltip', false);
    this.tooltipHandler = undefined;
    this.mxcell.GF_tooltipHandler = null;
  }

  setTooltip(rule: Rule, metric: Metric, color: string, value: string) {
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
        if (! this.isChanged(key)) {
          this.xgraph.addOverlay(`WARNING/ERROR`, this.mxcell);
        }
        super.apply(key);
      }
      else if (this.isChanged(key)) {
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
