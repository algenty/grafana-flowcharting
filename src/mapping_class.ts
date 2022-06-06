import { XCell } from 'cell_class';
import { GFEvents } from 'flowcharting_base';
import { $GF, GFCONSTANT, GFPlugin, GFVariables } from 'globals_class';
import { isString as _isString } from 'lodash';
import { Rule } from 'rule_class';

export type ObjectMap = ShapeMap | TextMap | LinkMap | EventMap;
export type ObjectMapArray = ShapeMapArray | TextMapArray | LinkMapArray | EventMapArray;
export type ShapeMapArray = ShapeMap[];
export type TextMapArray = TextMap[];
export type LinkMapArray = LinkMap[];
export type EventMapArray = EventMap[];
export type DataMap = gf.TShapeMapData | gf.TTextMapData | gf.TlinkMapData | gf.TEventMapData;

export type ObjectVMap = ValueMap | RangeMap;
export type DataVMap = gf.TValueMapData | gf.TRangeMapData;
export interface MapDataCommonProp {
  pattern: string;
  hidden: boolean;
}

// Debug
const DEBUG = false;
const _log = (...args: any) => {
  DEBUG && console.log(...args);
};

// Signal definition
const mappingSignalsArray = ['map_initalized', 'map_changed', 'map_freed'] as const;
type MappingSignals = typeof mappingSignalsArray[number];

abstract class GFMap<MapData extends gf.TDefObjMapData> {
  $gf: $GF;
  data: MapData;
  uid: string;
  type: gf.TTypeMap = 'shape';
  options: gf.TRuleMapOptions = Rule.getDefaultMapOptions();
  reduce = true;
  onMapping = false;
  events: GFEvents<MappingSignals> = GFEvents.create(mappingSignalsArray);
  static methods: any[] = [];
  constructor($gf: $GF, pattern: string, data: MapData, previousData?: any) {
    this.$gf = $gf;
    this.uid = $GF.genUid();
    this.data = data;
    this.data.pattern = pattern;
    if (previousData) {
      this.import(previousData);
    }
    this.init();
  }

  protected abstract _setType(): void;

  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE
  //############################################################################
  init() {
    this._setType();
    this.events.emit('map_initalized', this);
    this.$gf.events.connect('mapping_disabled', this, this._on_global_mapping_disabled.bind(this));
    // this.$gf.events.connect('xcell_clicked', this, this._on_global_xcell_clicked.bind(this));
  }

  change() {
    this.events.emit('map_changed', this);
  }

  free() {
    this.clear();
    this.$gf.events.disconnect('mapping_disabled', this);
    // this.$gf.events.disconnect('xcell_clicked', this);
    this.events.emit('map_freed', this);
  }

  clear() {
    this.events.clear();
  }

  //############################################################################
  //### CONVERT/MIGRATION
  //############################################################################
  /**
   * Import data from panel
   *
   * @param {*} obj
   * @returns {this}
   * @memberof GFMap
   */
  import(obj: any): this {
    if (!!obj.metadata) {
      this.data.pattern = obj.metadata;
    }

    if (!!obj.pattern) {
      this.data.pattern = obj.pattern;
    }

    if (!!obj.hidden) {
      this.data.hidden = obj.hidden;
    }
    return this;
  }

  //############################################################################
  //### ACCESSORS
  //############################################################################
  // PATTERN
  get pattern(): string {
    return this.data.pattern;
  }
  set pattern(v: string) {
    if (!v || v.length === 0 || v === this.data.pattern) {
      return;
    }
    this.data.pattern = v;
    this.change();
  }

  //HIDDEN
  set hidden(v: boolean) {
    if (v === this.data.hidden) {
      return;
    }
    this.data.hidden = v;
    this.change();
  }
  get hidden(): boolean {
    return this.data.hidden;
  }

  //############################################################################
  //### LOGICS
  //############################################################################
  /**
   * return the stored data
   *
   * @returns {MapData}
   * @memberof GFMap
   */
  getData(): MapData {
    return this.data;
  }

  getType(): gf.TTypeMap {
    return this.type;
  }

  setOptions(options: gf.TRuleMapOptions): this {
    this.options = options;
    return this;
  }

  getOptions(): gf.TRuleMapOptions {
    return this.options;
  }

  setPattern(xcell: XCell) {
    const result = xcell.getDefaultValues(this.options);
    if (Array.isArray(result)) {
      this.pattern = result[0];
    } else {
      this.pattern = result;
    }
  }

  /**
   * Get default stored data
   *
   * @static
   * @returns
   * @memberof GFMap
   */
  static getDefaultMethods() {
    return this.methods;
  }

  static getDefaultPlaceHolder(value: string): string | undefined {
    const elt = this.methods.find((x) => x.value === value);
    if (elt !== undefined) {
      return elt.placeholder;
    }
    return undefined;
  }

  static getDefaultValue(value: string): string | undefined {
    const elt = this.methods.find((x) => x.value === value);
    if (elt !== undefined) {
      return elt.default;
    }
    return undefined;
  }

  /**
   * Return if text match pattern
   *
   * @param {(string | null)} text
   * @returns {boolean}
   * @memberof GFMap
   */
  match(
    text: string | null,
    options: gf.TRuleMapOptions = Rule.getDefaultMapOptions(),
    variables?: GFVariables
  ): boolean {
    let pattern = this.data.pattern;
    if (variables !== undefined) {
      pattern = variables.replaceText(pattern);
    }
    if (text === undefined || text === null || text.length === 0) {
      return false;
    }
    return $GF.matchString(text, pattern, options.enableRegEx);
  }

  enableMapping(bool = true) {
    this.onMapping = bool;
    this.$gf.setMappingCallBack(this.setPattern.bind(this));
  }

  /**
   * Return uniq ID
   *
   * @returns {string}
   * @memberof GFMap
   */
  // getId(): string {
  //   return this.uid;
  // }

  /**
   * Change pattern
   *
   * @param {string} pattern
   * @returns {this}
   * @memberof GFMap
   */
  // setPattern(pattern: string): this {
  //   this.data.pattern = pattern;
  //   return this;
  // }

  /**
   * Get target Pattern
   *
   * @readonly
   * @memberof GFMap
   */
  // getPattern() {
  //   return this.data.pattern;
  // }

  /**
   * Show/enable
   *
   * @returns {this}
   * @memberof GFMap
   */
  // show(): this {
  //   this.data.hidden = false;
  //   return this;
  // }

  /**
   * Hide/disable
   *
   * @returns {this}
   * @memberof GFMap
   */
  // hide(): this {
  //   this.data.hidden = true;
  //   return this;
  // }

  // /**
  //  * Return if hidden
  //  *
  //  * @returns {boolean}
  //  * @memberof GFMap
  //  */
  // isHidden(): boolean {
  //   if (this.data.hidden === undefined) {
  //     return false;
  //   }
  //   return this.data.hidden;
  // }

  /**
   * Toggle Visible/Hide
   *
   * @returns {boolean}
   * @memberof GFMap
   */
  // toVisible(): boolean {
  //   if (this.data.hidden) {
  //     return false;
  //   }
  //   return true;
  // }

  /**
   * Export current data
   *
   * @returns {gf.TDefObjMapData}
   * @memberof GFMap
   */
  export(): gf.TDefObjMapData {
    return {
      pattern: this.data.pattern,
      hidden: this.data.hidden,
    };
  }
  //############################################################################
  //### EVENTS
  //############################################################################
  private _on_global_mapping_disabled() {
    _log('📬', this.constructor.name, '_on_global_mapping_disabled');
    this.onMapping = false;
  }

  // private _on_xgraph_xcell_clicked(xcell: XCell) {
  //   _log('📬', this.constructor.name, '_on_global_xcell_clicked', xcell);
  //   if (this.onMapping && xcell) {
  //     this.setPattern(xcell);
  //     this.onMapping = false;
  //   }
  // }
}

/**
 * ShapeMap class for mapping
 * @class ShapeMap
 * @extends GFMap
 */
export class ShapeMap extends GFMap<gf.TShapeMapData> {
  // data: gf.TShapeMapData;
  /**
   * Creates an instance of ShapeMap.
   * @param {string} pattern
   * @param {gf.TShapeMapData} data
   * @memberof ShapeMap
   */
  // constructor($gf:$GF, pattern: string, data: gf.TShapeMapData) {
  //   super($gf, pattern, data);
  //   this.type = 'shape';
  //   this.data = data;
  // }

  protected _setType() {
    this.type = 'shape';
  }
  //############################################################################
  //### ACCESSORS
  //############################################################################
  set condition(v: gf.TColorOnKeys) {
    if (!v || v.length === 0 || v === this.data.colorOn) {
      return;
    }
    this.data.colorOn = v;
    this.change();
  }
  get condition(): gf.TColorOnKeys {
    return this.data.colorOn;
  }

  set style(v: gf.TStyleColorKeys) {
    if (!v || v.length === 0 || v === this.data.style) {
      return;
    }
    this.data.style = v;
    this.change();
  }
  get style(): gf.TStyleColorKeys {
    return this.data.style;
  }

  //############################################################################
  //### LOGIC
  //############################################################################
  /**
   * Return default data
   *
   * @static
   * @returns {gf.TShapeMapData}
   * @memberof ShapeMap
   */
  static getDefaultData(): gf.TShapeMapData {
    return {
      pattern: '',
      hidden: false,
      style: 'fillColor',
      colorOn: 'a',
    };
  }

  /**
   * Return true or false for condition to colorize
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof ShapeMap
   * 0.7.0 : Moved to shape
   */
  isEligible(level: number): boolean {
    if (level === -1) {
      return false;
    }
    if (this.data.colorOn === 'n') {
      return false;
    }
    if (this.data.colorOn === 'a') {
      return true;
    }
    if (this.data.colorOn === 'wc' && level >= 1) {
      return true;
    }
    return false;
  }

  /**
   * Import data
   *
   * @param {*} obj
   * @returns {this}
   * @memberof ShapeMap
   */
  import(obj: any): this {
    super.import(obj);
    if (!!obj.style) {
      this.data.style = obj.style;
    }
    if (!!obj.colorOn) {
      this.data.colorOn = obj.colorOn;
    }
    return this;
  }
}

/**
 * TextMap class for mapping
 * @class TextMap
 * @extends GFMap
 */
export class TextMap extends GFMap<gf.TTextMapData> {
  // data: gf.TTextMapData;

  // constructor(pattern: string, data: gf.TTextMapData) {
  //   super(pattern, data);
  //   this.type = 'text';
  //   this.data = data;
  // }

  protected _setType() {
    this.type = 'text';
  }

  //############################################################################
  //### ACCESSORS
  //############################################################################
  set condition(v: gf.TTextOnKeys) {
    if (!v || v.length === 0 || v === this.data.textOn) {
      return;
    }
    this.data.textOn = v;
    this.change();
  }
  get condition(): gf.TTextOnKeys {
    return this.data.textOn;
  }

  set method(v: gf.TTextMethodKeys) {
    if (!v || v.length === 0 || v === this.data.textReplace) {
      return;
    }
    this.data.textReplace = v;
    this.change();
  }
  get method(): gf.TTextMethodKeys {
    return this.data.textReplace;
  }

  set textToReplace(v: string) {
    if (!v || v.length === 0 || v === this.data.textPattern) {
      return;
    }
    this.data.textPattern = v;
    this.change();
  }
  get textToReplace(): string {
    return this.data.textPattern;
  }

  //############################################################################
  //### ACCESSORS
  //############################################################################

  /**
   * Return default data
   *
   * @static
   * @returns {gf.TTextMapData}
   * @memberof TextMap
   */
  static getDefaultData(): gf.TTextMapData {
    return {
      pattern: '',
      hidden: false,
      textReplace: 'content',
      textPattern: '/.*/',
      textOn: 'wmd',
    };
  }

  /**
   * Return true or false for condition to change label
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof TextMap
   */
  isEligible(level: number): boolean {
    // if (this.data.textOn === 'wmd' && level > 0) return true;
    // if (this.data.textOn === 'wmd' && level === -1) return false;
    if (this.data.textOn === 'wmd') {
      return true;
    }
    if (this.data.textOn === 'n') {
      return false;
    }
    if (this.data.textOn === 'wc' && level >= 1) {
      return true;
    }
    if (this.data.textOn === 'co' && level >= 2) {
      return true;
    }
    return false;
  }

  /**
   * Import data from current or old version
   *
   * @param {*} obj
   * @returns {this}
   * @memberof TextMap
   */
  import(obj: any): this {
    super.import(obj);
    if (!!obj.textReplace) {
      this.data.textReplace = obj.textReplace;
    }
    if (!!obj.textPattern) {
      this.data.textPattern = obj.textPattern;
    }
    if (!!obj.textOn) {
      this.data.textOn = obj.textOn;
    }

    return this;
  }

  /**
   * Replace text according text options
   *
   * @param {string} text
   * @param {string} FormattedValue
   * @returns
   * @memberof Rule
   */
  getReplaceText(text: string, FormattedValue: string): string {
    if (this.data.textReplace === 'content') {
      return FormattedValue;
    }
    if (this.data.textReplace === 'pattern') {
      const regexVal = $GF.stringToRegEx(this.data.textPattern);
      if (regexVal && text.toString().match(regexVal)) {
        return text.toString().replace(regexVal, FormattedValue);
      }
      return text;
    }
    if (this.data.textReplace === 'as') {
      return `${text} ${FormattedValue}`;
    }
    if (this.data.textReplace === 'anl') {
      return `${text}\n${FormattedValue}`;
    }
    return text;
  }
}

/**
 * LinkMap class for mapping
 * @class LinkMap
 * @extends GFMap
 */
export class LinkMap extends GFMap<gf.TlinkMapData> {
  // data: gf.TlinkMapData;

  // constructor(pattern: string, data: gf.TlinkMapData) {
  //   super(pattern, data);
  //   this.type = 'link';
  //   this.data = data;
  // }

  protected _setType() {
    this.type = 'link';
  }

  //############################################################################
  //### ACCESSORS
  //############################################################################
  set condition(v: gf.TLinkOnKeys) {
    if (!v || v.length === 0 || v === this.data.linkOn) {
      return;
    }
    this.data.linkOn = v;
    this.change();
  }
  get condition(): gf.TLinkOnKeys {
    return this.data.linkOn;
  }

  set url(v: string) {
    if (!v || v.length === 0 || v === this.data.linkUrl) {
      return;
    }
    this.data.linkUrl = v;
    this.change();
  }
  get url(): string {
    return this.data.linkUrl;
  }

  set dasboardParams(v: boolean) {
    if (v === this.data.linkParams) {
      return;
    }
    this.data.linkParams = v;
    this.change();
  }
  get dashboardParams(): boolean {
    return this.data.linkParams;
  }

  //############################################################################
  //### LOGICS
  //############################################################################

  static getDefaultData(): gf.TlinkMapData {
    return {
      pattern: '',
      hidden: false,
      linkUrl: '',
      linkParams: false,
      linkOn: 'a',
    };
  }

  /**
   * Get defined link
   *
   * @returns
   * @memberof Rule
   */
  getLink() {
    if (this.data.linkParams) {
      return this.data.linkUrl + window.location.search;
    }
    return this.data.linkUrl;
  }

  /**
   * Import data to Link
   *
   * @param {*} obj
   * @returns {this}
   * @memberof LinkMap
   */
  import(obj: any): this {
    super.import(obj);
    if (!!obj.linkUrl) {
      this.data.linkUrl = obj.linkUrl;
    }
    if (!!obj.linkParams) {
      this.data.linkParams = obj.linkParams;
    }
    if (!!obj.linkOn) {
      this.data.linkOn = obj.linkOn;
    }
    return this;
  }

  /**
   * Return true or false for condition to add/replace link
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof LinkMap
   */
  isEligible(level: number): boolean {
    if (this.data.linkOn === 'a') {
      return true;
    }
    if (this.data.linkOn === 'wc' && level >= 1) {
      return true;
    }
    return false;
  }
}

export class EventMap extends GFMap<gf.TEventMapData> {
  // data: gf.TEventMapData;
  static methods = GFCONSTANT.EVENTMETHODS;
  validComp: gf.TEventComparator[] = ['lt', 'le', 'eq', 'ne', 'ge', 'gt', 'al'];
  // static shapes: string[] = EventMap.getFormNames();
  static shapes: string[] = [];

  /**
   * Creates an instance of EventMap.
   * @param {string} pattern
   * @param {gf.TEventMapData} data
   * @memberof EventMap
   */
  // constructor(pattern: string, data: gf.TEventMapData) {
  //   super(pattern, data);
  //   this.type = 'event';
  //   this.data = data;
  //   // GFGlobal.loadFile(_GF.CONSTANTS.VAR_STG_SHAPES, _GF.CONSTANTS.CONF_FILE_SHAPES);
  // }

  protected _setType() {
    this.type = 'event';
  }

  //############################################################################
  //### ACCESSORS
  //############################################################################
  set level(v: number) {
    if (v === this.data.eventOn) {
      return;
    }
    this.data.eventOn = v;
  }
  get level(): number {
    return this.data.eventOn;
  }

  set comparator(v: gf.TEventComparator) {
    if (!v || v.length === 0 || v === this.data.comparator) {
      return
    }
    this.data.comparator = v;
    this.change();
  }
  get comparator(): gf.TEventComparator {
    return this.data.comparator;
  }

  set animation(v: gf.TTypeEventKeys) {
    if (!v || v.length === 0 || v === this.data.style) {
      return;
    }
    this.data.style = v;
    this.change();
  }
  get animation() {
    return this.data.style;
  }

  set value(v: string) {
    if (!v || v.length === 0 || v === this.data.value) {
      return;
    }
    this.data.value = v;
    this.change();
  }
  get value() {
    return this.data.value;
  }

  //############################################################################
  //### LOGIC
  //############################################################################

  /**
   * Return default data
   *
   * @static
   * @returns {gf.TShapeMapData}
   * @memberof ShapeMap
   */
  static getDefaultData(): gf.TEventMapData {
    return {
      pattern: '',
      hidden: false,
      style: 'shape',
      comparator: 'eq',
      eventOn: 0,
      value: '',
    };
  }

  getPlaceHolder(): string {
    const ph = EventMap.getDefaultPlaceHolder(this.data.style);
    return ph !== undefined ? ph : '';
  }

  isValidComp(comp: gf.TEventComparator): boolean {
    return this.validComp.indexOf(comp) !== -1;
  }

  getTypeahead(): string[] {
    const self = this;
    let result = this.$gf.getFullAvailableVarNames();
    const elt: gf.TTypeEventElt | undefined = EventMap.methods.find((x) => x.value === self.data.style);
    if (elt !== undefined && elt.typeahead !== undefined) {
      result = result.concat(elt.typeahead.split('|'));
      return result;
    }
    if (this.data.style === 'shape') {
      const shapes = this.getFormNames();
      Array.prototype.push.apply(result, shapes);
    }
    return result;
  }

  getValueByDefault(): string {
    const vbd = EventMap.getDefaultValue(this.data.style);
    return vbd !== undefined ? vbd : '';
  }

  getFormNames(): string[] {
    // if (EventMap.shapes === undefined) {
    //   EventMap.shapes = [];
    // }

    if (EventMap.shapes.length > 0) {
      return EventMap.shapes;
    }
    // _GF.loadLocalFile(_GF.CONSTANTS.VAR_STG_SHAPES, _GF.CONSTANTS.CONF_FILE_SHAPES);
    // const shapesText: string = _GF.getVar(_GF.CONSTANTS.VAR_STG_SHAPES);
    const shapesText = $GF.utils.loadFile(GFPlugin.getRootPath() + GFCONSTANT.CONF_FILE_SHAPESTXT);
    if (shapesText !== undefined) {
      if (EventMap.shapes.length === 0) {
        EventMap.shapes = EventMap.shapes.concat(shapesText.split(/\n/));
        // _GF.unsetVar(_GF.CONSTANTS.VAR_STG_SHAPES);
        return EventMap.shapes;
      }
    }
    return EventMap.shapes;
  }

  /**
   * Return true or false for condition to colorize
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof ShapeMap
   * 0.7.0 : Moved to shape
   */
  isEligible(level: number): boolean {
    switch (this.data.comparator) {
      case 'al':
        return true;
        break;
      case 'lt':
        return level < this.data.eventOn;
        break;
      case 'le':
        return level <= this.data.eventOn;
        break;
      case 'eq':
        return level === this.data.eventOn;
        break;
      case 'ne':
        return level !== this.data.eventOn;
        break;
      case 'ge':
        return level >= this.data.eventOn;
        break;
      case 'gt':
        return level > this.data.eventOn;
        break;
      default:
        return this.data.eventOn === -1 || level === this.data.eventOn;
        break;
    }
  }

  /**
   * Import data
   *
   * @param {*} obj
   * @returns {this}
   * @memberof ShapeMap
   */
  import(obj: any): this {
    super.import(obj);
    if (!!obj.style) {
      this.data.style = obj.style;
    }
    if (!!obj.comparator) {
      this.data.comparator = obj.comparator;
    }

    if (!!obj.eventOn) {
      this.data.eventOn = obj.eventOn;
      if (this.data.eventOn === -1) {
        this.data.comparator = 'al';
        this.data.eventOn = 0;
      }
    }
    if (!!obj.value) {
      this.data.value = obj.value;
    }
    return this;
  }
}

class VMAP<VMAPType extends gf.TDefMapData> {
  data: VMAPType;
  uid: string = $GF.genUid(this.constructor.name);
  reduce = true;
  events: GFEvents<MappingSignals> = GFEvents.create(mappingSignalsArray);
  constructor(data: VMAPType) {
    this.data = data;
    this.init();
  }

  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE
  //############################################################################
  init(): void {
    this.events.emit('map_initalized', this);
  }

  change(): void {
    this.events.emit('map_changed', this);
  }

  free(): void {
    this.events.clear();
    this.events.emit('map_freed', this);
  }

  //############################################################################
  //### ACCESSORS GETTERS/SETTERS
  //############################################################################
  set hidden(v: boolean) {
    if (v !== this.data.hidden) {
      this.data.hidden = v;
      this.change();
    }
  }
  get hidden(): boolean {
    return this.data.hidden;
  }

  set text(v: string) {
    if (v !== this.data.text) {
      this.data.text = v.trim();
      this.change();
    }
  }
  get text(): string {
    return this.data.text ?? '';
  }

  //############################################################################
  //### LOGICS
  //############################################################################

  import(obj: any): this {
    if (!!obj.text) {
      this.data.text = obj.text;
    }
    return this;
  }

  // getId(): string {
  //   return this.id;
  // }

  getData(): VMAPType {
    return this.data;
  }

  /**
   * Show/enable valuemap
   *
   * @memberof ValueMap
   */
  // show() {
  //   this.data.hidden = false;
  // }

  // /**
  //  * Hide/disable valuemap
  //  *
  //  * @memberof ValueMap
  //  */
  // hide() {
  //   this.data.hidden = true;
  // }

  /**
   * Is hidden/disable
   *
   * @returns
   * @memberof ValueMap
   */
  // isHidden() {
  //   return this.data.hidden;
  // }
}

export class ValueMap extends VMAP<gf.TValueMapData> {
  // data: gf.TValueMapData;
  constructor(value = '', text = '', data: gf.TValueMapData) {
    super(data);
    this.data.value = value;
    this.data.text = text;
    this.import(data);
  }

  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE
  //############################################################################

  //############################################################################
  //### ACCESSORS
  //############################################################################
  get value(): string {
    return this.data.value ?? '';
  }
  set value(v: string) {
    if (v !== this.data.value) {
      this.data.value = v;
      this.change();
    }
  }

  //############################################################################
  //### LOGICS
  //############################################################################
  /**
   * Get default data
   *
   * @static
   * @returns
   * @memberof ValueMap
   */
  static getDefaultdata(): gf.TValueMapData {
    return {
      value: undefined,
      text: undefined,
      hidden: false,
    };
  }

  /**
   * import data from panel
   *
   * @param {*} obj
   * @returns {this}
   * @memberof ValueMap
   */
  import(obj: any): this {
    this.data.value = obj.value || this.data.value || undefined;
    this.data.text = obj.text || this.data.text || undefined;
    this.data.hidden = obj.hidden || this.data.hidden || false;
    return this;
  }

  /**
   * Match value with datas
   *
   * @param {any} value
   * @returns {boolean}
   * @memberof ValueMap
   */
  match(value: any): boolean {
    if (value === null || value === undefined) {
      if (this.data.value === 'null') {
        return true;
      }
      return false;
    }

    if (!_isString(value) && Number(this.data.value) === Number(value)) {
      return true;
    }
    return $GF.matchString(value.toString(), this.data.value);
  }

  /**
   * Get formatted value
   *
   * @param {any} value
   * @returns
   * @memberof ValueMap
   */
  getFormattedText(value: any): string {
    if (value === null || value === undefined) {
      if (this.data.value === 'null' || this.data.value === 'undefined') {
        return !!this.data.text ? this.data.text : '';
      }
    }
    if (this.match(value)) {
      return !!this.data.text ? this.data.text : '';
    }
    return `${value}`;
  }
}

export class RangeMap extends VMAP<gf.TRangeMapData> {
  // data: gf.TRangeMapData;
  reduce = true;
  uid: string;
  constructor(from = '', to = '', text = '', data: gf.TRangeMapData) {
    super(data);
    this.uid = $GF.genUid();
    this.data = data;
    this.data.from = from;
    this.data.to = to;
    this.data.text = text;
    this.data.hidden = false;
  }
  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE
  //############################################################################

  //############################################################################
  //### ACCESSORS
  //############################################################################
  get to(): string {
    return this.data.to ?? '';
  }
  set to(v: string) {
    if (v !== this.data.to) {
      this.data.to = v;
      this.change();
    }
  }
  get from(): string {
    return this.data.from ?? '';
  }
  set from(v: string) {
    if (v !== this.data.from) {
      this.data.from = v;
      this.change();
    }
  }

  //############################################################################
  //### LOGICS
  //############################################################################
  /**
   * import data from panel
   *
   * @param {*} obj
   * @returns {this}
   * @memberof RangeMap
   */
  import(obj: any): this {
    this.data.from = !!obj.from ? obj.from : undefined;
    this.data.to = !!obj.to ? obj.to : undefined;
    this.data.text = !!obj.text ? obj.text : undefined;
    this.data.hidden = !!obj.hidden || obj.hidden === false ? obj.hidden : false;
    return this;
  }

  /**
   * Get default data
   *
   * @static
   * @returns {gf.TRangeMapData}
   * @memberof RangeMap
   */
  static getDefaultData(): gf.TRangeMapData {
    return {
      from: undefined,
      to: undefined,
      text: undefined,
      hidden: false,
    };
  }

  /**
   * Match value
   *
   * @param {*} value
   * @returns {boolean}
   * @memberof RangeMap
   */
  match(value: any): boolean {
    if (
      (value !== undefined && typeof value === 'string' && value.length > 0) ||
      (value !== undefined && typeof value === 'number')
    ) {
      let v = Number(value);
      if (
        (this.data.from !== undefined && typeof value === 'string' && this.data.from.length > 0) ||
        (this.data.from !== undefined && typeof value === 'number')
      ) {
        let from = Number(this.data.from);
        if (v >= from) {
          if (
            (this.data.to !== undefined && typeof this.data.to === 'string' && this.data.to.length > 0) ||
            (this.data.from !== undefined && typeof this.data.to === 'number')
          ) {
            let to = Number(this.data.to);
            return v < to;
          }
          return true;
        }
        return false;
      }
      // from is empty here
      if (
        (this.data.to !== undefined && typeof this.data.to === 'string' && this.data.to.length > 0) ||
        (this.data.to !== undefined && typeof this.data.to === 'number')
      ) {
        let to = Number(this.data.to);
        return v < to;
      }
      // from and to is empty
      return true;
    }
    return false;
  }

  /**
   * Return Formatted value
   *
   * @param {*} value
   * @returns {(string | null)}
   * @memberof RangeMap
   */
  getFormattedText(value: any): string | undefined {
    if (this.match(value)) {
      return this.data.text;
    }
    return value;
  }
}

export class InteractiveMap {
  active = false;
  map: ObjectMap | null = null;
  xcell: XCell | null = null;
  focusId: string | null = null;
  value: string | null = null;
  options: gf.TRuleMapOptions | null = null;
  callback: CallableFunction | null = null;
  container: HTMLDivElement | undefined;
  constructor(container?: HTMLDivElement) {
    this.container = container;
    this.init();
  }

  init(): this {
    this.active = false;
    this.map = null;
    this.xcell = null;
    this.focusId = null;
    this.value = null;
    this.options = null;
    this.callback = null;
    return this;
  }

  setContainer(container: HTMLDivElement): this {
    this.container = container;
    return this;
  }

  setFocus(focusId: string): this {
    this.focusId = focusId;
    return this;
  }

  setCallBack(fn: CallableFunction): this {
    this.callback = fn;
    return this;
  }

  isActive(): boolean {
    return this.active;
  }

  activate(): this {
    if (this.container) {
      // this.container.style.cursor = 'crosshair';
      GFPlugin.getStaticPath();
      this.container.style.cursor = `url("${GFPlugin.getStaticPath()}cursor-marker.svg") 8 16, crosshair`;
      this.container.scrollIntoView();
      this.container.focus();
    }
    this.active = true;
    return this;
  }

  setOptions(options: gf.TRuleMapOptions): this {
    this.options = options;
    return this;
  }

  getOptions(): gf.TRuleMapOptions | null {
    return this.options;
  }

  setXCell(xcell: XCell): this {
    this.xcell = xcell;
    return this;
  }

  getXCell(): XCell | null {
    return this.xcell;
  }

  getMap(): ObjectMap | null {
    return this.map;
  }

  setMap(map: ObjectMap): this {
    this.map = map;
    return this;
  }

  setValue(value: string): this {
    this.value = value;
    return this;
  }

  valide(): this {
    if (this.map !== null && this.value !== null) {
      this.map.pattern = this.value;
    }
    if (this.callback !== null) {
      this.callback(this.xcell);
    }
    if (this.focusId !== null) {
      $GF.setFocus(this.focusId);
    }
    this.close();
    return this;
  }

  close(): this {
    if (this.container) {
      this.container.style.cursor = 'auto';
    }
    this.init();
    return this;
  }
}
