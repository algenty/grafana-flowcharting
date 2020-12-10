import { $GF } from 'globals_class';
import _ from 'lodash';

export type ObjectMap = ShapeMap | TextMap | LinkMap | EventMap;
export type ObjectMapArray = ObjectMap[];
export type DataMap = gf.TShapeMapData | gf.TTextMapData | gf.TlinkMapData | gf.TEventMapData;

export type ObjectVMap = ValueMap | RangeMap;
export type DataVMap = gf.TValueMapData | gf.TRangeMapData;

class GFMap {
  data: DataMap;
  id: string;
  reduce = true;
  static methods: any[] = [];
  constructor(pattern, data: DataMap) {
    this.data = data;
    this.data.pattern = pattern;
    this.id = $GF.utils.uniqueID();
  }

  /**
   * Import data from panel
   *
   * @param {*} obj
   * @returns {this}
   * @memberof GFMap
   */
  import(obj: any): this {
    if (!!obj.pattern) {
      this.data.pattern = obj.pattern;
    }

    if (!!obj.hidden) {
      this.data.hidden = obj.hidden;
    }
    return this;
  }

  /**
   * return the stored data
   *
   * @returns {DataMap}
   * @memberof GFMap
   */
  getData(): DataMap {
    return this.data;
  }

  /**
   * Clear object
   *
   * @returns {this}
   * @memberof GFMap
   */
  clear(): this {
    return this;
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
    const elt = this.methods.find(x => x.value === value);
    if (elt !== undefined) {
      return elt.placeholder;
    }
    return undefined;
  }

  static getDefaultValue(value: string): string | undefined {
    const elt = this.methods.find(x => x.value === value);
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
  match(text: string | null, regex = true): boolean {
    if (text === undefined || text === null || text.length === 0) {
      return false;
    }
    return $GF.utils.matchString(text, this.data.pattern, regex);
  }

  /**
   * Return uniq ID
   *
   * @returns {string}
   * @memberof GFMap
   */
  getId(): string {
    return this.id;
  }

  /**
   * Change pattern
   *
   * @param {string} pattern
   * @returns {this}
   * @memberof GFMap
   */
  setPattern(pattern: string): this {
    this.data.pattern = pattern;
    return this;
  }

  /**
   * Get target Pattern
   *
   * @readonly
   * @memberof GFMap
   */
  get Pattern() {
    return this.data.pattern;
  }

  /**
   * Show/enable
   *
   * @returns {this}
   * @memberof GFMap
   */
  show(): this {
    this.data.hidden = false;
    return this;
  }

  /**
   * Hide/disable
   *
   * @returns {this}
   * @memberof GFMap
   */
  hide(): this {
    this.data.hidden = true;
    return this;
  }

  /**
   * Return if hidden
   *
   * @returns {boolean}
   * @memberof GFMap
   */
  isHidden(): boolean {
    if (this.data.hidden === undefined) {
      return false;
    }
    return this.data.hidden;
  }

  /**
   * Toggle Visible/Hide
   *
   * @returns {boolean}
   * @memberof GFMap
   */
  toVisible(): boolean {
    if (this.data.hidden) {
      return false;
    }
    return true;
  }

  /**
   * Export current data
   *
   * @returns {gf.TGFMapData}
   * @memberof GFMap
   */
  export(): gf.TGFMapData {
    return {
      pattern: this.data.pattern,
      hidden: this.data.hidden,
    };
  }
}

/**
 * ShapeMap class for mapping
 * @class ShapeMap
 * @extends GFMap
 */
export class ShapeMap extends GFMap {
  data: gf.TShapeMapData;

  /**
   * Creates an instance of ShapeMap.
   * @param {string} pattern
   * @param {gf.TShapeMapData} data
   * @memberof ShapeMap
   */
  constructor(pattern: string, data: gf.TShapeMapData) {
    super(pattern, data);
    this.data = data;
  }

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
  toColorize(level: number): boolean {
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
export class TextMap extends GFMap {
  data: gf.TTextMapData;

  constructor(pattern: string, data: gf.TTextMapData) {
    super(pattern, data);
    this.data = data;
  }

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
  toLabelize(level: number): boolean {
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
      const regexVal = $GF.utils.stringToJsRegex(this.data.textPattern);
      if (text.toString().match(regexVal)) {
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
export class LinkMap extends GFMap {
  data: gf.TlinkMapData;

  constructor(pattern: string, data: gf.TlinkMapData) {
    super(pattern, data);
    this.data = data;
  }

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
  toLinkable(level: number): boolean {
    if (this.data.linkOn === 'a') {
      return true;
    }
    if (this.data.linkOn === 'wc' && level >= 1) {
      return true;
    }
    return false;
  }
}

export class EventMap extends GFMap {
  data: gf.TEventMapData;
  static methods = $GF.CONSTANTS.EVENTMETHODS;
  validComp: gf.TEventComparator[] = ['lt', 'le', 'eq', 'ne', 'ge', 'gt', 'al'];
  // static shapes: string[] = EventMap.getFormNames();
  static shapes: string[] = [];

  /**
   * Creates an instance of EventMap.
   * @param {string} pattern
   * @param {gf.TEventMapData} data
   * @memberof EventMap
   */
  constructor(pattern: string, data: gf.TEventMapData) {
    super(pattern, data);
    this.data = data;
    // GFGlobal.loadFile(_GF.CONSTANTS.VAR_STG_SHAPES, _GF.CONSTANTS.CONF_FILE_SHAPES);
  }

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
    let result = $GF.getFullAvailableVarNames();
    const elt: gf.TStyleEventElt | undefined = EventMap.methods.find(x => x.value === self.data.style);
    if (elt !== undefined && elt.typeahead !== undefined) {
      result = result.concat(elt.typeahead.split('|'));
      return result;
    }
    if (this.data.style === 'shape') {
      const shapes = EventMap.getFormNames();
      Array.prototype.push.apply(result, shapes);
    }
    return result;
  }

  getValueByDefault(): string {
    const vbd = EventMap.getDefaultValue(this.data.style);
    return vbd !== undefined ? vbd : '';
  }

  static getFormNames(): string[] {
    // if (EventMap.shapes === undefined) {
    //   EventMap.shapes = [];
    // }

    if (EventMap.shapes.length > 0) {
      return EventMap.shapes;
    }
    // _GF.loadLocalFile(_GF.CONSTANTS.VAR_STG_SHAPES, _GF.CONSTANTS.CONF_FILE_SHAPES);
    // const shapesText: string = _GF.getVar(_GF.CONSTANTS.VAR_STG_SHAPES);
    const shapesText = $GF.utils.loadFile(
      $GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT) + $GF.CONSTANTS.CONF_FILE_SHAPESTXT
    );
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
  toEventable(level: number): boolean {
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

class VMAP {
  data: DataVMap;
  id: string;
  hidden = false;
  reduce = true;
  constructor(data: DataVMap) {
    this.data = data;
    this.id = $GF.utils.uniqueID();
  }

  import(obj: any): this {
    if (!!obj.text) {
      this.data.text = obj.text;
    }
    return this;
  }

  getId(): string {
    return this.id;
  }

  getData(): DataVMap {
    return this.data;
  }

  /**
   * Show/enable valuemap
   *
   * @memberof ValueMap
   */
  show() {
    this.data.hidden = false;
  }

  /**
   * Hide/disable valuemap
   *
   * @memberof ValueMap
   */
  hide() {
    this.data.hidden = true;
  }

  /**
   * Is hidden/disable
   *
   * @returns
   * @memberof ValueMap
   */
  isHidden() {
    return this.data.hidden;
  }
}

export class ValueMap extends VMAP {
  data: gf.TValueMapData;
  constructor(value: string = '', text: string = '', data: gf.TValueMapData) {
    super(data);
    this.data = data;
    this.data.value = value;
    this.data.text = text;
    this.import(data);
  }

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

    if (!_.isString(value) && Number(this.data.value) === Number(value)) {
      return true;
    }
    return $GF.utils.matchString(value.toString(), this.data.value);
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

export class RangeMap extends VMAP {
  data: gf.TRangeMapData;
  reduce = true;
  id = $GF.utils.uniqueID();
  constructor(from: string = '', to: string = '', text: string = '', data: gf.TRangeMapData) {
    super(data);
    this.data = data;
    this.data.from = from;
    this.data.to = to;
    this.data.text = text;
    this.data.hidden = false;
  }

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
      let v: number = Number(value);
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
