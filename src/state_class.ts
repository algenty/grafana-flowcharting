import { XGraph } from 'graph_class';
import { Rule } from 'rule_class';
import { EventMap } from 'mapping_class';
import { TooltipHandler } from 'tooltipHandler';
import { $GF, GFVariables } from 'globals_class';
import { XCell } from 'cell_class';
import { ObjectMetric } from 'metric_class';

/**
 * Class for state of one cell
 *
 * @export
 * @class State
 */
export class State {
  xcell: XCell; // mxCell State
  uid: string; // cell ID in mxcell
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
  status: Map<string, any>;
  globalLevel = -1;
  highestFormattedValue: string = '';
  highestValue: any = undefined;
  tooltipHandler: TooltipHandler | null = null;
  reduce: boolean = true;
  rules: Map<string, Rule> = new Map();
  currRules: string[] = [];
  currMetrics: string[] = [];
  // originalText: string;

  /**
   * Creates an instance of State.
   * @param {mxCell} mxcell
   * @param {XGraph} xgraph
   * @memberof State
   */
  constructor(xcell: XCell, xgraph: XGraph) {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'constructor()');
    this.xcell = xcell;
    this.uid = $GF.utils.uniqueID();
    this.xgraph = xgraph;
    this.shapeState = new ShapeState(xgraph, xcell);
    this.tooltipState = new TooltipState(xgraph, xcell);
    this.iconState = new IconState(xgraph, xcell);
    this.eventState = new EventState(xgraph, xcell);
    this.textState = new TextState(xgraph, xcell);
    this.linkState = new LinkState(xgraph, xcell);
    this.variables = $GF.createLocalVars();
    this.status = new Map();
    this.tooltipHandler = null;
    // this.xcell.GF_tooltipHandler = null;
    // this.originalText = XGraph.getLabelCell(xcell);
    trc.after();
  }

  /**
   * Return Xcell
   *
   * @returns {XCell}
   * @memberof State
   */
  getXCell(): XCell {
    return this.xcell;
  }

  /**
   * Reset/empty/clear/destroy it
   *
   * @returns {this}
   * @memberof State
   */
  clear(): this {
    this.clearTag();
    return this;
  }

  /**
   * Call applyState() asynchronously
   *
   * @memberof State
   */
  async async_applyState() {
    // new Promise (this.applyState.bind(this));
    this.applyCycle();
  }

  tagRule(rule: Rule): this {
    this.rules.set(rule.uid, rule);
    return this;
  }

  untagRule(rule: Rule): this {
    this.rules.delete(rule.uid);
    return this;
  }

  clearTag() {
    this.rules.clear();
  }

  /**
   * Define state according to 1 rule and 1 serie without apply display
   *
   * @returns {this}
   * @param {Rule} rule
   * @param {Metric} metric
   * @memberof State
   */
  setCycle(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setCycle()');
    console.log('State -> setState -> this.rules', this.rules);
    this.rules.forEach(rule => {
      let beginPerf = Date.now();
      if (!rule.isHidden()) {
        const shapeMaps = rule.getShapeMaps();
        const textMaps = rule.getTextMaps();
        const linkMaps = rule.getLinkMaps();
        const eventMaps = rule.getEventMaps();
        this.variables.set($GF.CONSTANTS.VAR_STR_RULENAME, rule.data.alias);
        rule.getMetrics().forEach(metric => {
          try {
            this.currMetrics.push(metric.getName());
            this.variables.set($GF.CONSTANTS.VAR_STR_METRIC, metric.getName);
          } catch (error) {
            $GF.log.error(error);
          }
          const value = rule.getValueForMetric(metric);
          const FormattedValue = rule.getFormattedValue(value);
          const level = rule.getThresholdLevel(value);
          const color = rule.getThresholdColor(value);
          this.variables.set($GF.CONSTANTS.VAR_NUM_VALUE, value);
          this.variables.set($GF.CONSTANTS.VAR_STR_FORMATED, FormattedValue);
          this.variables.set($GF.CONSTANTS.VAR_NUM_LEVEL, level);
          this.variables.set($GF.CONSTANTS.VAR_STR_COLOR, color);
          this.variables.set($GF.CONSTANTS.VAR_STR_DATE, $GF.getCurrentDate());

          // SHAPE
          let matchedRule = false;
          let mapOptions = rule.getShapeMapOptions();
          let cellValue = this.xcell.getDefaultValues(mapOptions);
          shapeMaps.forEach(shape => {
            let k = shape.data.style;
            if (!shape.isHidden() && shape.match(cellValue, mapOptions, this.variables)) {
              let v: any = color;
              if (shape.isEligible(level)) {
                matchedRule = true;
                this.matched = true;
                this.shapeState.set(k, v, level) && this.status.set(k, v);
              }

              // TOOLTIP
              if (rule.toTooltipize(level)) {
                k = 'tooltip';
                v = true;
                this.tooltipState.set('tooltip', true, level) && this.status.set(k, v);
                this.tooltipState.setTooltip(rule, metric, color, FormattedValue, this.xcell.getMetadatas());
              }
              // ICONS
              if (rule.toIconize(level)) {
                k = 'icon';
                v = true;
                this.iconState.set('icon', true, level) && this.status.set(k, v);
              }
            }
          });

          // TEXT
          mapOptions = rule.getTextMapOptions();
          cellValue = this.xcell.getDefaultValues(mapOptions);
          textMaps.forEach(text => {
            const k = 'label';
            if (!text.isHidden() && text.match(cellValue, mapOptions, this.variables)) {
              if (text.isEligible(level)) {
                matchedRule = true;
                this.matched = true;
                const textScoped = this.variables.replaceText(FormattedValue);
                const v = text.getReplaceText(this.textState.getMatchValue(k), textScoped);
                this.textState.set(k, v, level) && this.status.set(k, v);
              }
            }
          });

          // EVENTS
          mapOptions = rule.getEventMapOptions();
          cellValue = this.xcell.getDefaultValues(mapOptions);
          eventMaps.forEach(event => {
            const k = event.data.style;
            if (!event.isHidden() && event.match(cellValue, mapOptions, this.variables)) {
              if (event.isEligible(level)) {
                matchedRule = true;
                this.matched = true;
                const v = this.variables.eval(event.data.value);
                this.eventState.set(k, v, level) && this.status.set(k, v);
              }
            }
          });

          // LINK
          mapOptions = rule.getEventMapOptions();
          cellValue = this.xcell.getDefaultValues(mapOptions);
          linkMaps.forEach(link => {
            const k = 'link';
            if (!link.isHidden() && link.match(cellValue, mapOptions, this.variables)) {
              if (link.isEligible(level)) {
                matchedRule = true;
                this.matched = true;
                const v = this.variables.replaceText(link.getLink());
                this.linkState.set(k, v, level) && this.status.set(k, v);
              }
            }
          });

          if (matchedRule) {
            this.currRules.push(rule.data.alias);
            if (level > this.globalLevel) {
              this.globalLevel = level;
              this.highestValue = value;
              this.highestFormattedValue = FormattedValue;
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
      let endPerf = Date.now();
      rule.execTimes += endPerf - beginPerf;
    }),
      trc.after();
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'unsetState()');
    this.eventState.unset();
    this.textState.unset();
    this.linkState.unset();
    this.tooltipState.unset();
    this.iconState.unset();
    this.matched = false;
    trc.after();
    return this;
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
   * Get Level in text
   *
   * @returns {number}
   * @memberof State
   */
  getTextLevel(): string {
    return this.globalLevel === -1 ? '' : this.globalLevel.toString();
  }

  // ????
  getStatus(key: gf.TStyleKeys): string {
    let style: string | null | undefined = this.status.get(key);
    if (style !== undefined && style !== null) {
      return style;
    }
    style = this.xcell.getStyle(key);
    if (style === null) {
      style = '';
    }
    this.status.set(key, style);
    return style;
  }

  haveStatus(key: string): boolean {
    return this.status.has(key);
  }

  /**
   * Return true if is a shape/vertex
   *
   * @returns
   * @memberof State
   */
  isShape(): boolean {
    return this.xcell.getMxCell().isVertex();
  }

  /**
   * Return true if is a arrow/connector
   *
   * @returns
   * @memberof State
   */
  isConnector(): boolean {
    return this.xcell.getMxCell().isEdge();
  }

  /**
   * Return the name of the shape
   *
   * @returns {string}
   * @memberof State
   */
  getShapeName(): string {
    if (this.xcell) {
      const name = this.xcell.getStyle('shape');
      if (name === null) {
        return '';
      }
      return name;
    }
    return 'Unknown';
  }

  /**
   *Return all styles/properties 'draw.io'
   *
   * @returns {string}
   * @memberof State
   */
  getShapeStyles(): string {
    if (this.xcell) {
      return this.xcell.getMxCell().style;
    }
    return 'Unknown';
  }

  /**
   * Apply new state
   *
   * @returns {this}
   * @memberof State
   */
  applyCycle(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'applyState()');
    if (this.matched || this.changed) {
      this.changed = true;
      this.shapeState.apply();
      this.tooltipState.apply();
      this.iconState.apply();
      this.textState.apply();
      this.eventState.apply();
      this.linkState.apply();
    }
    trc.after();
    return this;
  }

  /**
   * Reset and restore state
   *
   * @returns {this}
   * @memberof State
   */
  reset(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'reset()');
    this.shapeState.reset();
    this.tooltipState.reset();
    this.iconState.reset();
    this.textState.reset();
    this.eventState.reset();
    this.linkState.reset();
    this.variables.clear();
    this.status.clear();
    this.globalLevel = -1;
    this.highestFormattedValue = '';
    this.highestValue = undefined;
    this.changed = false;
    trc.after();
    return this;
  }

  /**
   * Prepare state for a new rule and serie
   *
   * @returns {this}
   * @memberof State
   */
  prepareCycle(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'prepare()');
    if (this.changed) {
      this.shapeState.prepare();
      this.tooltipState.prepare();
      this.iconState.prepare();
      this.textState.prepare();
      this.eventState.prepare();
      this.linkState.prepare();
      this.variables.clear();
      this.status.clear();
      this.globalLevel = -1;
      this.highestFormattedValue = '';
      this.currMetrics = [];
      this.currRules = [];
      this.highestValue = undefined;
      this.matched = false;
    }
    trc.after();
    return this;
  }

  /**
   * Highlight mxcell
   *
   * @returns {this}
   * @memberof State
   */
  highlightCell(): this {
    this.xcell.highlight();
    return this;
  }

  /**
   * Unhighlight mxcell
   *
   * @returns {this}
   * @memberof State
   */
  unhighlightCell(): this {
    this.xcell.highlight(false);
    return this;
  }

  //
  // Events
  //
  async onDestroy() {
    $GF.log.debug(this.constructor.name + '/onDestroy : ' + this.uid);
  }

  async onRefresh() {
    $GF.log.debug(this.constructor.name + '/onRefresh : ' + this.uid);
    this.prepareCycle();
    this.setCycle();
    this.applyCycle();
  }

  async onInit() {
    $GF.log.debug(this.constructor.name + '/onInit : ' + this.uid);
    this.onChange();
  }

  async onChange() {
    $GF.log.debug(this.constructor.name + '/onChange : ' + this.uid);
    this.onRefresh();
  }
}

/**
 * Mother of sub states
 *
 * @class GFState
 */
export class GFState {
  xgraph: XGraph;
  xcell: XCell;
  keys: string[] = [];
  matchedKey: Map<string, boolean> = new Map();
  ackKey: Set<string> = new Set();
  changedKey: Map<string, boolean> = new Map();
  defaultValue: Map<string, any> = new Map();
  matchValue: Map<string, any> = new Map();
  static DEFAULTLEVEL: number = -1;
  matchLevel: Map<string, number> = new Map();

  constructor(xgraph: XGraph, mxcell: mxCell) {
    this.xgraph = xgraph;
    this.xcell = mxcell;
    this.init_core();
  }

  init_core() {}

  addValue(key: string, value: any) {
    if (!this.hasKey(key)) {
      this.keys.push(key);
    }
    this.defaultValue.set(key, value);
    this.matchValue.set(key, value);
    this.matchLevel.set(key, GFState.DEFAULTLEVEL);
    this.matchedKey.set(key, false);
    this.changedKey.set(key, false);
  }

  hasKey(key: string): boolean {
    return this.keys.includes(key);
  }

  getDefaultValue(key: string): any | undefined {
    if (!this.hasKey(key)) {
      this.defaultValue.set(key, this.default_core(key));
    }
    return this.defaultValue.get(key);
  }

  getMatchValue(key: string): any | undefined {
    if (!this.hasKey(key)) {
      this.matchValue.set(key, this.getDefaultValue(key));
    }
    return this.matchValue.get(key);
  }

  getTargetValue(key: string): any | undefined {
    if (this.isMatched(key)) {
      return this.getMatchValue(key);
    }
    if (this.isChanged(key)) {
      return this.getDefaultValue(key);
    }
    return undefined;
  }

  ack(key: string): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        this.matchedKey.set(key, false);
        this.changedKey.set(key, true);
      } else if (this.isChanged(key)) {
        this.matchedKey.set(key, false);
        this.changedKey.set(key, false);
      }
      this.ackKey.add(key);
    }
    return this;
  }

  isAcked(key: string) {
    return this.ackKey.has(key);
  }

  /**
   * Insert key and value if >= level
   *
   * @param {string} key
   * @param {*} value
   * @param {number} level
   * @returns {boolean} true if applied
   * @memberof GFState
   */
  set(key: string, value: any, level: number): boolean {
    let matchLevel = this.matchLevel.get(key);
    if (matchLevel === undefined) {
      const defaultValue = this.default_core(key);
      this.addValue(key, defaultValue);
      return this.set(key, value, level);
    }
    if (matchLevel <= level) {
      this.matchLevel.set(key, level);
      this.matchedKey.set(key, true);
      this.matchValue.set(key, value);
      return true;
    }
    return false;
  }

  apply(key?: string): this {
    if (key !== undefined) {
      if (this.isMatched(key) && !this.isAcked(key)) {
        let value = this.getMatchValue(key);
        try {
          this.apply_core(key, value);
        } catch (error) {
          $GF.log.error('Error on reset for key ' + key, error);
        }
        // this.changedKey.set(key, true);
        // this.matchedKey.set(key, false);
        this.ack(key);
      } else if (this.isChanged(key) && !this.isAcked(key)) {
        this.reset(key);
        this.ack(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  default_core(key: any): any {
    return null;
  }

  apply_core(key: any, value: any) {}

  isMatched(key?: string): boolean {
    if (key !== undefined) {
      return this.matchedKey.get(key) === true;
    }
    let matched = false;
    this.keys.forEach(key => {
      matched = this.isMatched(key) || matched;
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

  getLevel(key?: string): number {
    if (key !== undefined) {
      let level = this.matchLevel.get(key);
      return level !== undefined ? level : GFState.DEFAULTLEVEL;
    }
    let level = GFState.DEFAULTLEVEL;
    this.keys.forEach(key => (level = Math.max(this.getLevel(key))));
    return level;
  }

  unset(key?: string): this {
    if (key !== undefined) {
      this.matchValue.set(key, this.defaultValue.get(key));
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
      let value = this.getDefaultValue(key);
      try {
        this.reset_core(key, value);
      } catch (error) {
        $GF.log.error('Error on reset for key ' + key, error);
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
    this.ackKey.clear();
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
  keys: gf.TTypeEventKeys[] = [];
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
    // this.keys = $GF.CONSTANTS.EVENTMETHODS.map(x => x.value);
    this.geo = this.xcell.getDefaultDimension();
    // this.keys.forEach(key => {
    //   const value = this._get(key);
    //   this.addValue(key, value);
    // });
  }

  default_core(key: gf.TTypeEventKeys): any {
    return this._get(key);
  }

  async apply_core(key: gf.TTypeEventKeys, value: any) {
    if (value === undefined) {
      value = null;
    }
    this._set(key, value);
  }

  async reset_core(key: gf.TTypeEventKeys, value: any) {
    if (value === undefined) {
      value = null;
    }
    this._set(key, value);
  }

  _set(key: gf.TTypeEventKeys, value: any) {
    if (value === undefined || value === 'null') {
      value = null;
    }
    switch (key) {
      case 'class':
        throw new Error('Class not implemented');
        break;
      case 'text':
        value = String(value);
        this.xcell.setLabel(value);
        break;
      case 'tpMetadata':
        if (value !== null) {
          const tbl = String(value).split('@');
          if (tbl !== undefined && tbl.length > 0) {
            let k: any = tbl.shift();
            let v: any = null;
            if (tbl.length > 0) {
              v = tbl.join('@');
            }
            this.xcell.setMetadata(k, v);
          }
        }
        break;
      case 'tpText':
        if (value === undefined || value === null || value.length === 0 || value === 'null') {
          value = null;
        }
        this.xcell.setMetadata('tooltip', value);
        break;
      case 'visibility':
        value = String(value);
        if (value === '0') {
          this.xcell.hide();
        } else if (value === '1') {
          this.xcell.hide(false);
        }
        break;
      case 'fold':
        value = String(value);
        if (value === '0') {
          this.xcell.collapse(true);
        } else if (value === '1') {
          this.xcell.collapse(false);
        }
        break;

      case 'height':
        if (value !== undefined) {
          const height = Number(value);
          const width = this.getTargetValue('width');
          this.ack('width');
          this.xgraph.setAnimSizeCell(this.xcell, width, height);
        }
        break;

      case 'width':
        if (value !== undefined) {
          const width = Number(value);
          const height = this.getTargetValue('height');
          this.ack('height');
          this.xgraph.setAnimSizeCell(this.xcell, width, height);
        }
        break;

      case 'size':
        if (this.geo !== undefined) {
          let percent = Number(value);
          this.xgraph.setAnimZoomCell(this.xcell, percent);
        }
        break;

      case 'blink':
        if (!!value) {
          this.xcell.blink(value);
        } else {
          this.xcell.blink(value, false);
        }
        break;

      default:
        const k: any = key;
        if (XGraph.isMxGraphAnimStyle(key)) {
          let beginValue = this._get(k);
          beginValue = beginValue === undefined ? EventMap.getDefaultValue(k) : beginValue;
          this.xgraph.setAnimStyleCell(this.xcell, k, value, beginValue);
        } else if (XGraph.isMxGraphStyle(k)) {
          this.xcell.setStyle(k, value);
        } else {
          throw new Error(`Unknow type ${k}`);
        }
        break;
    }
  }

  _get(key: gf.TTypeEventKeys): any {
    switch (key) {
      case 'text':
        return this.xcell.getLabel();
        break;

      case 'visibility':
        // return this.xgraph.isVisibleCell(this.xcell) === false ? '0' : '1';
        return !this.xcell.isHidden;
        break;

      case 'height':
        return this.geo !== undefined ? this.geo.height : undefined;
        break;

      case 'width':
        return this.geo !== undefined ? this.geo.width : undefined;
        break;

      case 'tpText':
        return this.xcell.getMetadata('tooltip');
        break;

      case 'tpMetadata':
        // TODO
        return null;
        break;

      case 'size':
        return 100;
        break;

      case 'fold':
        return this.xcell.isCollapsed() === true ? '0' : '1';
        break;

      case 'blink':
        return this.xcell.isBlink;
        break;

      default:
        if (XGraph.isMxGraphStyle(key)) {
          const k: any = key;
          return this.xcell.getStyle(k);
        } else {
          throw new Error(`Unknow type ${key}`);
        }
        break;
    }
  }
}

class TextState extends GFState {
  // keys: string[] = ['label'];
  keys: string[] = [];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init_core();
  }

  init_core() {
    // const value = this.xgraph.getLabelCell(this.mxcell);
    // this.addValue('label', value);
  }

  default_core(key: any): string | null {
    return this.xcell.getLabel();
  }

  async apply_core(key: string, value: any) {
    this.xcell.setLabel(value);
  }

  async reset_core(key: string, value: any) {
    this.xcell.restoreLabel();
  }
}

class LinkState extends GFState {
  // keys: string[] = ['link'];
  keys: string[] = [];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init_core();
  }

  init_core() {
    // const value = this.xgraph.getLink(this.mxcell);
    // this.addValue('link', value);
  }

  default_core(key: any): string | null {
    return this.xcell.getDefaultLink();
  }

  async apply_core(key: string, value: any) {
    this.xcell.setLink(value);
  }

  async reset_core(key: string, value: any) {
    // if (value === undefined || value === null || value.length === 0) {
    //   this.xgraph.removeLink(this.xcell);
    // } else {
    //   this.xgraph.addLink(this.xcell, value);
    // }
    this.xcell.restoreLink();
  }
}

/**
 * State for shape color
 *
 * @class ShapeState
 * @extends {GFState}
 */
class ShapeState extends GFState {
  keys: gf.TStyleColorKeys[] = [];
  fullStylesString: string | undefined;
  constructor(xgraph: XGraph, xcell: XCell) {
    super(xgraph, xcell);
    this.init_core();
  }

  init_core() {
    // this.keys = $GF.CONSTANTS.COLORMETHODS.map(x => x.value);
    // this.fullStylesString = this.mxcell.getStyle();
    // this.keys.forEach(key => {
    //   const value = this.xgraph.getStyleCell(this.mxcell, key);
    //   this.addValue(key, value);
    //   $GF.log.debug('ShapeState [' + this.mxcell.id + '] Add value : ' + key, value);
    // });
    // this.xcell.GF_tooltipHandler = null;
    this.xcell.enableTooltip(false);
  }

  default_core(key: any): string | null {
    return this.xcell.getDefaultStyle(key);
  }

  async apply_core(key: gf.TStyleColorKeys, value: any) {
    if (value === undefined) {
      value = null;
    }
    this.xgraph.setAnimColorCell(this.xcell, key, value);
  }

  async reset_core(key: gf.TStyleColorKeys, value: any) {
    // if (value === undefined) {
    //   value = null;
    // }
    // this.xgraph.setColorAnimCell(this.xcell, key, value);
    this.xcell.restoreStyle(key);
  }
}

class TooltipState extends GFState {
  keys: string[] = ['tooltip'];
  tooltipHandler: TooltipHandler | undefined;
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init_core();
  }

  init_core() {
    this.addValue('tooltip', false);
    this.tooltipHandler = undefined;
    // this.xcell.GF_tooltipHandler = null;
    this.xcell.enableTooltip(false);
  }

  async setTooltip(rule: Rule, metric: ObjectMetric, color: string, value: string, metadata: gf.TXCellMetadata) {
    let tpColor: string | null = null;
    let label: string = rule.data.tooltipLabel;
    if (this.tooltipHandler === null || this.tooltipHandler === undefined) {
      this.tooltipHandler = new TooltipHandler();
    }
    if (rule.data.tooltip) {
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
    }
    // Metadata
    if (rule.data.tpMetadata) {
      this.tooltipHandler.addMetadata().setXCell(this.xcell);
    }
    // Date
    this.tooltipHandler.updateDate();
  }

  apply(key?: string): this {
    if (key !== undefined && key === 'tooltip') {
      if (this.isMatched(key) && this.getMatchValue(key) === true) {
        if (this.tooltipHandler != null && this.tooltipHandler.isChecked()) {
          // this.xcell.GF_tooltipHandler = this.tooltipHandler;
          this.xcell.enableTooltip().setTooltipHandler(this.tooltipHandler);
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
      this.xcell.enableTooltip(false);
      // if (this.tooltipHandler) {
      //   this.tooltipHandler.destroy();
      // }
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
  // keys: string[] = ['icon'];
  keys: string[] = [];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    // this.addValue('icon', false);
  }

  default_core(key: string): any {
    return false;
  }

  apply_core(key?: string): this {
    if (key !== undefined && key === 'icon') {
      if (this.isMatched(key) && this.getMatchValue(key) === true) {
        if (!this.isChanged(key)) {
          // this.xgraph.addOverlay(`WARNING/ERROR`, this.xcell);
          this.xcell.addOverlay(`WARNING/ERROR`);
        }
        // super.apply(key);
      } else if (this.isChanged(key)) {
        this.reset_core(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply_core(key);
      });
    }
    return this;
  }

  reset_core(key?: string): this {
    if (key !== undefined && key === 'icon') {
      // this.xgraph.removeOverlay(this.xcell);
      // super.reset(key);
      this.xcell.removeOverlay();
    } else {
      this.keys.forEach(key => {
        this.reset_core(key);
      });
    }
    return this;
  }
}
