import XGraph from './graph_class';
import { Rule } from './rule_class';
import { EventMap } from 'mapping_class';
import { Metric } from './metric_class';
import { TooltipHandler } from './tooltipHandler';
import { $GF, GFVariables } from 'globals_class';
import { XCell } from 'cell_class';

/**
 * Class for state of one cell
 *
 * @export
 * @class State
 */
export class State {
  xcell: XCell; // mxCell State
  id: string; // cell ID in mxcell
  // newcellId: string | undefined; // for inspect mode
  // previousId: string | undefined; // for inspect mode
  // edited: boolean | undefined; // if modified in inspector
  // edit: boolean | undefined; // if modified in inspector
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
    this.id = xcell.getId();
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
    return this;
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
    const trc = $GF.trace.before(this.constructor.name + '.' + 'setState()');
    if (!rule.isHidden() && rule.matchMetric(metric)) {
      let beginPerf = Date.now();
      const shapeMaps = rule.getShapeMaps();
      const textMaps = rule.getTextMaps();
      const linkMaps = rule.getLinkMaps();
      const eventMaps = rule.getEventMaps();
      const value = rule.getValueForMetric(metric);
      const FormattedValue = rule.getFormattedValue(value);
      const level = rule.getThresholdLevel(value);
      const color = rule.getThresholdColor(value);
      this.variables.set($GF.CONSTANTS.VAR_STR_RULENAME, rule.data.alias);
      this.variables.set($GF.CONSTANTS.VAR_NUM_VALUE, value);
      this.variables.set($GF.CONSTANTS.VAR_STR_FORMATED, FormattedValue);
      this.variables.set($GF.CONSTANTS.VAR_NUM_LEVEL, level);
      this.variables.set($GF.CONSTANTS.VAR_STR_COLOR, color);

      // SHAPE
      let mapOptions = rule.getShapeMapOptions();
      let cellValue = this.xcell.getValues(mapOptions);
      shapeMaps.forEach(shape => {
        let k = shape.data.style;
        if (!shape.isHidden() && shape.match(cellValue, mapOptions)) {
          let v: any = color;
          this.matched = true;
          if (level > this.globalLevel) {
            this.globalLevel = level;
            this.highestValue = value;
            this.highestFormattedValue = FormattedValue;
          }
          if (shape.isEligible(level)) {
            this.shapeState.set(k, v, level) && this.status.set(k, v);
          }
          // TOOLTIP
          if (rule.toTooltipize(level)) {
            k = 'tooltip';
            v = true;
            this.tooltipState.set('tooltip', true, level) && this.status.set(k, v);
            this.tooltipState.setTooltip(rule, metric, color, FormattedValue);
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
      cellValue = this.xcell.getValues(mapOptions);
      textMaps.forEach(text => {
        const k = 'label';
        if (!text.isHidden() && text.match(cellValue, mapOptions) && text.isEligible(level)) {
          if (text.isEligible(level)) {
            this.matched = true;
            if (level > this.globalLevel) {
              this.globalLevel = level;
              this.highestValue = value;
              this.highestFormattedValue = FormattedValue;
            }
            const textScoped = this.variables.replaceText(FormattedValue);
            const v = text.getReplaceText(this.textState.getMatchValue(k), textScoped);
            this.textState.set(k, v, level) && this.status.set(k, v);
          }
        }
      });

      // EVENTS
      mapOptions = rule.getEventMapOptions();
      cellValue = this.xcell.getValues(mapOptions);
      eventMaps.forEach(event => {
        const k = event.data.style;
        if (!event.isHidden() && event.match(cellValue, mapOptions) && event.isEligible(level)) {
          if (event.isEligible(level)) {
            this.matched = true;
            if (level > this.globalLevel) {
              this.globalLevel = level;
              this.highestValue = value;
              this.highestFormattedValue = FormattedValue;
            }
            const v = this.variables.eval(event.data.value);
            this.eventState.set(k, v, level) && this.status.set(k, v);
          }
        }
      });

      // LINK
      mapOptions = rule.getEventMapOptions();
      cellValue = this.xcell.getValues(mapOptions);
      linkMaps.forEach(link => {
        const k = 'link';
        if (!link.isHidden() && link.match(cellValue, mapOptions)) {
          if (link.isEligible(level)) {
            this.matched = true;
            if (level > this.globalLevel) {
              this.globalLevel = level;
              this.highestValue = value;
              this.highestFormattedValue = FormattedValue;
            }
            const v = this.variables.replaceText(link.getLink());
            this.linkState.set(k, v, level) && this.status.set(k, v);
          }
        }
      });

      if (level >= rule.highestLevel && this.matched) {
        rule.highestLevel = level;
        rule.highestValue = value;
        rule.highestFormattedValue = FormattedValue;
        rule.highestColor = color;
      }
      let endPerf = Date.now();
      rule.execTimes += endPerf - beginPerf;
    }
    trc.after();
    return this;
  }

  /**
   * Return if id is edited
   *
   * @returns
   * @memberof State
   */
  // isEdited() {
  //   return this.edited;
  // }

  /**
   * Return if is in edit mode
   *
   * @returns
   * @memberof State
   */
  // isEditMode() {
  //   return this.edit;
  // }

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
   *
   *
   * @param {string} prop - id|value
   * @returns {string|null} return original value of id or label of cell
   * @memberof State
   */
  // getCellProp(options: gf.TRuleMapOptions): string | null {
  //   if (options.identByProp === 'id') {
  //     return this.cellId;
  //   }
  //   if (options.identByProp === 'value') {
  //     return this.originalText;
  //   }
  //   if (options.identByProp === 'metadata') {
  //     // TODO
  //     throw new Error('Metadata not implemented');
  //   }
  //   return null;
  // }

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
  applyState(): this {
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
  prepare(): this {
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
  changedKey: Map<string, boolean> = new Map();
  originalValue: Map<string, any> = new Map();
  matchValue: Map<string, any> = new Map();
  static DEFAULTLEVEL: number = -1;
  // lastValue: Map<string, any> = new Map(); To not apply the same value
  matchLevel: Map<string, number> = new Map();

  constructor(xgraph: XGraph, mxcell: mxCell) {
    this.xgraph = xgraph;
    this.xcell = mxcell;
    this.init_core();
  }

  init_core() {}

  addValue(key: string, value: any) {
    if (!this.hasKey(key)) {
      // _GF.log.warn('GFState.addValue()', key, 'not found');
      this.keys.push(key);
    }
    this.originalValue.set(key, value);
    this.matchValue.set(key, value);
    // this.lastValue.set(key, value); To not apply the same value
    this.matchLevel.set(key, GFState.DEFAULTLEVEL);
    this.matchedKey.set(key, false);
    this.changedKey.set(key, false);
  }

  hasKey(key: string): boolean {
    return this.keys.includes(key);
  }

  getOriginalValue(key: string): any | undefined {
    if (!this.hasKey(key)) {
      this.originalValue.set(key, this.default_core(key));
    }
    return this.originalValue.get(key);
  }

  getMatchValue(key: string): any | undefined {
    if (!this.hasKey(key)) {
      this.matchValue.set(key, this.getOriginalValue(key));
    }
    return this.matchValue.get(key);
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
      if (this.isMatched(key)) {
        let value = this.getMatchValue(key);
        try {
          this.apply_core(key, value);
        } catch (error) {
          $GF.log.error('Error on reset for key ' + key, error);
        }
        this.changedKey.set(key, true);
        this.matchedKey.set(key, false);
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
      let value = this.getOriginalValue(key);
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
    this.geo = this.xcell.getDimension();
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
    if (value === undefined) {
      value = null;
    }
    let beginValue: any = undefined;
    // const toUnset: boolean = this.isChanged(key) && !this.isMatched(key);
    // let className = '';
    // let newkey: gf.TTypeEventKeys | 'class' = key;
    // if (key.startsWith('class_')) {
    //   newkey = 'class';
    //   className = key.substring(6);
    // }
    switch (key) {
      case 'class':
        //
        throw new Error('Class not implemented');
        // if (toUnset) {
        //   this.xgraph.unsetClassCell(this.mxcell, className);
        // } else {
        //   this.xgraph.setClassCell(this.mxcell, className);
        // }
        break;
      case 'text':
        value = String(value);
        this.xcell.setLabel(value);
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
        if (this.geo !== undefined) {
          let height = Number(value);
          if (this.isMatched('height')) {
            let width = this.isMatched('width') ? Number(this.getMatchValue('width')) : undefined;
            this.xgraph.setAnimSizeCell(this.xcell, width, height);
            this.unset('width');
          } else {
            if (!this.isMatched('width')) {
              // this.xgraph.resetSizeCell(this.xcell, this.geo);
              this.xcell.restoreDimension();
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
            this.xgraph.setAnimSizeCell(this.xcell, width, height);
            this.unset('width');
          } else {
            if (!this.isMatched('height')) {
              // this.xgraph.resetSizeCell(this.xcell, this.geo);
              this.xcell.restoreDimension();
              this.unset('height');
            }
          }
        }
        break;

      case 'size':
        if (this.geo !== undefined) {
          let percent = Number(value);
          this.xgraph.setAnimZoomCell(this.xcell, percent);
        }
        break;

      // case 'barPos':
      // case 'gaugePos':
      // case 'fontSize':
      // case 'opacity':
      // case 'textOpacity':
      // case 'rotation':
      //   beginValue = this._get(key);
      //   beginValue = beginValue === undefined ? EventMap.getDefaultValue(key) : beginValue;
      //   this.xgraph.setStyleAnimCell(this.xcell, key, value, beginValue);
      //   break;

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
          beginValue = this._get(k);
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
    // this.xcell.setLabel(value);
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

  async setTooltip(rule: Rule, metric: Metric, color: string, value: string) {
    let tpColor: string | null = null;
    let label: string = rule.data.tooltipLabel;
    if (this.tooltipHandler === null || this.tooltipHandler === undefined) {
      this.tooltipHandler = new TooltipHandler();
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
