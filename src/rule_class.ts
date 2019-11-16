// import kbn from 'grafana/app/core/utils/kbn';
import moment from 'moment';
import grafana from 'grafana_func';
import State from './state_class';
import _ from 'lodash';
import FlowChartingPlugin from './plugin';

declare var GFP: FlowChartingPlugin;
type Taggregation = 'first' | 'current' | 'min' | 'max' | 'total' | 'avg' | 'count' | 'delta' | 'range' | 'diff';
type TTypeStyle = 'fillColor' | 'strokeColor' | 'fontColor' | 'imageBorder' | 'imageBackground';
type TLinkOn = 'wc' | 'a';
type TTooltipOn = 'wc' | 'a';
type TColorOn = 'n' | 'wc' | 'a';
type TTextOn = 'n' | 'wmd' | 'wc' | 'co';
type TDirection = 'v' | 'h';
type TTextReplace = 'content' | 'pattern' | 'as' | 'anl';
type TDateFormat = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm:ss.SSS' | 'MM/DD/YY h:mm:ss a' | 'MMMM D, YYYY LT' | 'YYYY-MM-DD';
type TGraphSize = '100%' | '100px' | '200px' | '400px';
type TGraphType = 'line' | 'bar';
type TPropType = 'id' | 'value';
interface TIRuleData {
  order: number;
  pattern: string;
  unit: string;
  type: string;
  alias: string;
  aggregation: Taggregation;
  decimals: number;
  colors: string[];
  reduce: boolean;
  style: TTypeStyle;
  colorOn: TColorOn;
  link: boolean;
  linkOn: TLinkOn;
  linkUrl: string;
  linkParams: boolean;
  textOn: TTextOn;
  textReplace: TTextReplace;
  textPattern: string;
  dateFormat: TDateFormat;
  thresholds: number[];
  stringWarning: string;
  stringCritical: string;
  invert: boolean;
  overlayIcon: boolean;
  tooltip: boolean;
  tooltipLabel: string;
  tooltipColors: boolean;
  tooltipOn: TTooltipOn;
  tpDirection: TDirection;
  tpGraph: boolean;
  tpGraphSize: TGraphSize;
  tpGraphType: TGraphType;
  tpGraphLow: number;
  tpGraphHigh: number;
  shapeProp: TPropType;
  shapeData: TShapeMapData[];
  textProp: TPropType;
  textData: TTextMapData[];
  linkProp: TPropType;
  linkData: TlinkMapData[];
  mappingType: number;
  valueData: TValueMapData[];
  rangeData: TRangeMapData[];
  sanitize: boolean;
}

/**
 * Rule definition
 *
 * @export
 * @class Rule
 */
export default class Rule {
  data: TIRuleData;
  shapeMaps: ShapeMap[];
  textMaps: TextMap[];
  linkMaps: LinkMap[];
  valueMaps: ValueMap[];
  rangeMaps: RangeMap[];
  id: string;
  states!: Map<string, State>;

  /**
   * Creates an instance of Rule.
   * @param {string} pattern
   * @param {*} data
   * @memberof Rule
   */
  constructor(pattern, data) {
    this.data = data;
    this.data.pattern = pattern;
    this.shapeMaps = [];
    this.textMaps = [];
    this.linkMaps = [];
    this.valueMaps = [];
    this.rangeMaps = [];
    this.id = GFP.utils.uniqueID();
    this.import(data);
  }

  /**
   * return data of rule
   *
   * @returns {data}
   * @memberof Rule
   */
  getData() {
    return this.data;
  }

  /**
   * import data in rule
   *
   * @param {data} obj
   * @memberof Rule
   */
  import(obj) {
    this.data.unit = obj.unit || 'short';
    this.data.type = obj.type || 'number';
    this.data.alias = obj.alias || 'No name';
    this.data.aggregation = obj.aggregation || 'current';
    this.data.decimals = obj.decimals !== undefined ? obj.decimals : 2;
    this.data.colors = obj.colors ? [...obj.colors] : ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'];
    this.data.reduce = true;
    this.data.style = obj.style || obj.colorMode || 'fillColor';
    this.data.colorOn = obj.colorOn || 'a';
    this.data.link = obj.link !== undefined ? obj.link : false;
    this.data.linkOn = obj.colorOn || 'a';
    this.data.linkUrl = obj.linkUrl || '';
    this.data.linkParams = obj.linkParams !== undefined ? obj.linkParams : false;
    this.data.textOn = obj.textOn || 'wmd';
    this.data.textReplace = obj.textReplace || 'content';
    this.data.textPattern = obj.textPattern || '/.*/';
    this.data.pattern = obj.pattern || this.data.pattern;
    this.data.dateFormat = obj.dateFormat || 'YYYY-MM-DD HH:mm:ss';
    this.data.thresholds = obj.thresholds !== undefined ? [...obj.thresholds] : [];
    this.data.stringWarning = obj.stringWarning || '';
    this.data.stringCritical = obj.stringCritical || '';
    this.data.invert = obj.invert !== undefined ? obj.invert : false;
    this.data.overlayIcon = obj.overlayIcon !== undefined ? obj.overlayIcon : false;
    this.data.tooltip = obj.tooltip !== undefined ? obj.tooltip : false;
    this.data.tooltipLabel = obj.tooltipLabel !== undefined ? obj.tooltipLabel : this.data.alias;
    this.data.tooltipColors = obj.tooltipColors !== undefined ? obj.tooltipColors : false;
    this.data.tooltipOn = obj.tooltipOn !== undefined ? obj.tooltipOn : 'a';
    this.data.tpDirection = obj.tpDirection !== undefined ? obj.tpDirection : 'v';
    this.data.tpGraph = obj.tpGraph !== undefined ? obj.tpGraph : false;
    this.data.tpGraphSize = obj.tpGraphSize !== undefined ? obj.tpGraphSize : '100%';
    this.data.tpGraphType = obj.tpGraphType !== undefined ? obj.tpGraphType : 'line';
    this.data.tpGraphLow = obj.tpGraphLow;
    this.data.tpGraphHigh = obj.tpGraphHigh;
    let maps: any = [];

    // SHAPES
    this.data.shapeProp = obj.shapeProp || 'id';
    this.data.shapeData = [];
    // For 0.2.0
    maps = [];
    if (obj.shapeMaps !== undefined && obj.shapeMaps !== null && obj.shapeMaps.length > 0) {
      maps = obj.shapeMaps;
    } else {
      maps = obj.shapeData;
    }

    if (maps !== undefined && maps !== null && maps.length > 0) {
      maps.forEach((map: TShapeMapData) => {
        const newData: TShapeMapData = {};
        const sm = new ShapeMap(map.pattern, newData);
        sm.import(map);
        this.shapeMaps.push(sm);
        this.data.shapeData.push(newData);
      });
    }

    // TEXT
    this.data.textProp = obj.textProp || 'id';
    this.data.textData = [];
    // For 0.2.0
    maps = [];
    if (obj.shapeMaps !== undefined && obj.shapeMaps !== null && obj.shapeMaps.length > 0) {
      maps = obj.textMaps;
    } else {
      maps = obj.textData;
    }
    if (maps !== undefined && maps != null && maps.length > 0) {
      maps.forEach((map: TTextMapData) => {
        const newData: TTextMapData = {};
        const tm = new TextMap(map.pattern, newData);
        tm.import(map);
        this.textMaps.push(tm);
        this.data.textData.push(newData);
      });
    }

    // LINK
    this.data.linkProp = obj.linkProp || 'id';
    this.data.linkData = [];
    if (obj.linkData !== undefined && obj.linkData != null && obj.linkData.length > 0) {
      obj.linkData.forEach((map: TlinkMapData) => {
        const newData: TlinkMapData = {};
        const lm = new LinkMap(map.pattern, newData);
        lm.import(map);
        this.linkMaps.push(lm);
        this.data.linkData.push(newData);
      });
    }

    this.data.mappingType = obj.mappingType || 1;

    // VALUES
    this.data.valueData = [];
    if (obj.valueData !== undefined && obj.valueData != null && obj.valueData.length > 0) {
      obj.valueData.forEach((map: TValueMapData) => {
        const newData: TValueMapData = {};
        const vm = new ValueMap(map.value, map.text, newData);
        vm.import(map);
        this.valueMaps.push(vm);
        this.data.valueData.push(newData);
      });
    }

    // RANGE
    this.data.rangeData = [];
    if (obj.rangeData !== undefined && obj.rangeData != null && obj.rangeData.length > 0) {
      obj.rangeData.forEach(map => {
        const newData = {};
        const rm = new RangeMap(map.from, map.to, map.text, newData);
        this.rangeMaps.push(rm);
        this.data.rangeData.push(newData);
      });
    }

    this.data.sanitize = obj.sanitize || false;
  }

  /**
   * Return uniq id of rule
   *
   * @returns
   * @memberof Rule
   */
  getId() {
    return this.id;
  }

  /**
   * Highlight Cells in rule (mapping color text and link)
   *
   * @memberof Rule
   */
  highlightCells() {
    if (this.states) {
      this.states.forEach(state => {
        state.highlightCell();
      });
    }
  }

  /**
   * Highlight Cells in rule (mapping color text and link)
   *
   * @memberof Rule
   */
  unhighlightCells() {
    if (this.states) {
      this.states.forEach(state => {
        state.unhighlightCell();
      });
    }
  }

  /**
   * Return the order of this rule
   * Grafana 6+ have a bug when reload dashboad, array are not in order
   *
   * @param {number} order
   * @memberof Rule
   */
  setOrder(order) {
    this.data.order = order;
  }

  /**
   * Return order of rule
   *
   * @memberof Rule
   */
  getOrder() {
    return this.data.order;
  }

  /**
   * Invert color order
   *
   * @memberof Rule
   */
  invertColorOrder() {
    const ref = this.data.colors;
    const copy = ref[0];
    ref[0] = ref[2];
    ref[2] = copy;
    if (this.data.invert) {
      this.data.invert = false;
    } else {
      this.data.invert = true;
    }
  }

  //
  // Conditions
  //
  /**
   * Return true or false for condition to colorize
   *
   * @param {number} level
   * @returns
   * @memberof Rule
   */
  toColorize(level) {
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
   * Return true or false for condition to change label
   *
   * @param {number} level
   * @returns
   * @memberof Rule
   */
  toLabelize(level) {
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
   * Return true or false for condition to display icon warning
   *
   * @param {level} level
   * @returns
   * @memberof Rule
   */
  toIconize(level) {
    if (this.data.overlayIcon === false) {
      return false;
    }
    if (this.data.overlayIcon === true && level >= 1) {
      return true;
    }
    return false;
  }

  /**
   * Return true or false for condition to add/replace link
   *
   * @param {number} level
   * @returns
   * @memberof Rule
   */
  toLinkable(level) {
    if (this.data.link === false) {
      return false;
    }
    if (this.data.linkOn === 'a') {
      return true;
    }
    if (this.data.linkOn === 'wc' && level >= 1) {
      return true;
    }
    return false;
  }

  /**
   * Return true or false for condition to display tooltip with values
   *
   * @param {number} level
   * @returns
   * @memberof Rule
   */
  toTooltipize(level) {
    if (this.data.tooltip === false) {
      return false;
    }
    if (this.data.tooltipOn === 'a') {
      return true;
    }
    if (this.data.tooltipOn === 'wc' && level >= 1) {
      return true;
    }
    return false;
  }

  //
  // Series
  //
  /**
   * Return boolean if serie is matched by rule
   *
   * @param {*} serie
   * @returns
   * @memberof Rule
   */
  matchSerie(serie) {
    return GFP.utils.matchString(serie.alias, this.data.pattern);
  }

  //
  // SHAPE MAPS
  //
  /**
   * Add new shape for rule
   *
   * @param {*} pattern
   * @memberof Rule
   */
  addShapeMap(pattern) {
    const data = {};
    const m = new ShapeMap(pattern, data);
    m.import(data);
    this.shapeMaps.push(m);
    this.data.shapeData.push(data);
  }

  /**
   * Remove shape for rule
   *
   * @param {number} index
   * @memberof Rule
   */
  removeShapeMap(index) {
    this.data.shapeData.splice(index, 1);
    this.shapeMaps.splice(index, 1);
  }

  /**
   * Return shape objet in index position
   *
   * @param {number} index
   * @returns {ShapeMap}
   * @memberof Rule
   */
  getShapeMap(index) {
    return this.shapeMaps[index];
  }

  /**
   * Return all ShapeMaps
   *
   * @returns {Array<ShapeMap>}
   * @memberof Rule
   */
  getShapeMaps() {
    return this.shapeMaps;
  }

  /**
   * Return bool if shape name (value|id) is in rule
   *
   * @param {string} pattern
   * @returns
   * @memberof Rule
   */
  matchShape(pattern) {
    let found = false;
    this.shapeMaps.forEach(element => {
      if (element.match(pattern)) {
        found = true;
      }
    });
    return found;
  }

  //
  // TEXT MAPS
  //
  addTextMap(pattern) {
    const data = {};
    const m = new TextMap(pattern, data);
    m.import(data);
    this.textMaps.push(m);
    this.data.textData.push(data);
  }

  removeTextMap(index) {
    this.data.textData.splice(index, 1);
    this.textMaps.splice(index, 1);
  }

  getTextMap(index) {
    return this.textMaps[index];
  }

  getTextMaps() {
    return this.textMaps;
  }

  matchText(pattern) {
    let found = false;
    this.textMaps.forEach(element => {
      if (element.match(pattern)) {
        found = true;
      }
    });
    return found;
  }

  //
  // LINK MAPS
  //
  addLinkMap(pattern) {
    GFP.log.info('Rule.addLinkMap()');
    const data = {};
    const m = new LinkMap(pattern, data);
    m.import(data);
    this.linkMaps.push(m);
    this.data.linkData.push(data);
  }

  removeLinkMap(index) {
    this.data.linkData.splice(index, 1);
    this.linkMaps.splice(index, 1);
  }

  getLinkMap(index) {
    return this.linkMaps[index];
  }

  getLinkMaps() {
    return this.linkMaps;
  }

  matchLink(pattern) {
    let found = false;
    this.linkMaps.forEach(element => {
      if (element.match(pattern)) {
        found = true;
      }
    });
    return found;
  }

  //
  // STRING VALUE MAPS
  //
  addValueMap(value, text) {
    const data = {};
    const m = new ValueMap(value, text, data);
    m.import(data);
    this.valueMaps.push(m);
    this.data.valueData.push(data);
  }

  removeValueMap(index) {
    this.data.valueData.splice(index, 1);
    this.valueMaps.splice(index, 1);
  }

  getValueMap(index) {
    return this.valueMaps[index];
  }

  getValueMaps() {
    return this.valueMaps;
  }

  //
  // STRING RANGE VALUE MAPS
  //
  addRangeMap(from, to, text) {
    const data = {};
    const m = new RangeMap(from, to, text, data);
    this.rangeMaps.push(m);
    this.data.rangeData.push(data);
  }

  removeRangeMap(index) {
    this.data.rangeData.splice(index, 1);
    this.rangeMaps.splice(index, 1);
  }

  getRangeMap(index) {
    return this.rangeMaps[index];
  }

  getRangeMaps() {
    return this.rangeMaps;
  }

  hideRangeMap(index) {
    this.rangeMaps[index].hide();
  }

  showRangeMap(index) {
    this.rangeMaps[index].show();
  }

  //
  // Format value
  //
  /**
   * Get color according to value
   *
   * @param {*} value
   * @returns {string} html color
   * @memberof Rule
   */
  getColorForValue(value) {
    if (!this.data.thresholds || this.data.thresholds.length === 0) {
      return null;
    }

    for (let i = this.data.thresholds.length; i > 0; i -= 1) {
      if (value >= this.data.thresholds[i - 1]) {
        return this.data.colors[i];
      }
    }
    return this.data.colors[0];
  }

  /**
   * Get color according level (-1,0,1,2)
   *
   * @param {*} level
   * @returns
   * @memberof Rule
   */
  getColorForLevel(level: number) {
    let colors = [...this.data.colors];
    if (!this.data.invert) {
      colors = colors.reverse();
    }
    if (level <= 0) {
      return colors[0];
    } else if (colors[level] !== undefined) {
      return colors[level];
    }
    return colors[0];
  }

  /**
   * Return Level according to value and rule options
   *
   * @param {float} value
   * @returns 0, 1 or 2
   * @memberof Rule
   */
  getThresholdLevel(value) {
    if (this.data.type === 'number') {
      let thresholdLevel = 0;
      const thresholds = this.data.thresholds;

      if (thresholds === undefined || thresholds.length === 0) {
        return -1;
      }
      if (thresholds.length !== 2) {
        return -1;
      }

      // non invert
      if (!this.data.invert) {
        thresholdLevel = 2;
        if (value >= thresholds[0]) {
          thresholdLevel = 1;
        }
        if (value >= thresholds[1]) {
          thresholdLevel = 0;
        }
      } else {
        thresholdLevel = 0;
        if (value >= thresholds[0]) {
          thresholdLevel = 1;
        }
        if (value >= thresholds[1]) {
          thresholdLevel = 2;
        }
      }
      return thresholdLevel;
    } else if (this.data.type === 'string') {
      if (value === this.data.stringWarning) {
        return 1;
      }
      if (value === this.data.stringCritical) {
        return 2;
      }
      const formatedValue = this.getFormattedValue(value);
      if (formatedValue === this.data.stringWarning) {
        return 1;
      }
      if (formatedValue === this.data.stringCritical) {
        return 2;
      }
      return 0;
    }
    return 0;
  }

  getValueForSerie(serie) {
    if (this.matchSerie(serie)) {
      try {
        // let value = _.get(serie.stats, this.data.aggregation);
        let value = serie.stats[this.data.aggregation];
        if (value === undefined || value === null) {
          value = serie.datapoints[serie.datapoints.length - 1][0];
        }
        return value;
      } catch (error) {
        GFP.log.error('datapoint for serie is null', error);
        return null;
      }
    }
    return '-';
  }

  getFormattedValueForSerie(serie) {
    const formattedValue = this.getValueForSerie(serie);
    return this.getFormattedValue(formattedValue);
  }

  getLink() {
    if (this.data.linkParams) {
      return this.data.linkUrl + window.location.search;
    }
    return this.data.linkUrl;
  }

  getFormattedValue(value) {
    // Number
    if (this.data.type === 'number') {
      if (!_.isFinite(value)) {
        return 'Invalid Number';
      }
      if (value === null || value === void 0) {
        return '-';
      }
      let decimals = this.decimalPlaces(value);
      decimals = typeof this.data.decimals === 'number' ? Math.min(this.data.decimals, decimals) : decimals;
      return grafana.formatValue(value, this.data.unit, this.data.decimals);
    }

    if (this.data.type === 'string') {
      if (value === null || value === void 0) {
        value = 'null';
      }

      if (_.isArray(value)) {
        value = value.join(', ');
      }
      const mappingType = this.data.mappingType || 0;
      if (mappingType === 1 && this.valueMaps) {
        for (let i = 0; i < this.valueMaps.length; i += 1) {
          const map = this.valueMaps[i];
          if (map.match(value)) {
            return map.getFormattedText(value);
          }
        }
        return value.toString();
      }

      if (mappingType === 2 && this.rangeMaps) {
        for (let i = 0; i < this.rangeMaps.length; i += 1) {
          const map = this.rangeMaps[i];
          if (map.match(value)) {
            return map.getFormattedText(value);
          }
        }
        return value.toString();
      }

      if (value === null || value === void 0) {
        return 'null';
      }
    }

    if (this.data.type === 'date') {
      if (value === undefined || value === null) {
        return '-';
      }

      if (_.isArray(value)) {
        value = value[0];
      }
      const date = moment(value);
      // if (this.dashboard.isTimezoneUtc()) {
      //     date = date.utc();
      // }
      return date.format(this.data.dateFormat);
    }
    return value;
  }

  getReplaceText(text, FormattedValue) {
    if (this.data.textReplace === 'content') {
      return FormattedValue;
    }
    if (this.data.textReplace === 'pattern') {
      const regexVal = GFP.utils.stringToJsRegex(this.data.textPattern);
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
  }

  defaultValueFormatter(value) {
    if (value === null || value === void 0 || value === undefined) {
      return '';
    }

    if (_.isArray(value)) {
      value = value.join(', ');
    }

    if (this.data.sanitize) {
      return this.$sanitize(value);
    }
    return _.escape(value);
  }
  $sanitize(value: any) {
    throw new Error('Method not implemented.');
  }

  decimalPlaces(num) {
    const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(
      0,
      // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0) -
        // Adjust for scientific notation.
        (match[2] ? +match[2] : 0)
    );
  }
}

interface TGFMapData {
  pattern?: string;
  hidden?: boolean;
}
class GFMap {
  data!: TGFMapData;
  id: string;
  constructor(pattern, data: TGFMapData) {
    this.data = data;
    this.data.pattern = pattern;
    this.id = GFP.utils.uniqueID();
    this.import(data);
  }

  import(obj: any): this {
    this.data.pattern = obj.pattern || '';
    this.data.hidden = obj.hidden || false;
    return this;
  }

  match(text: string): boolean {
    if (text === undefined || text === null || text.length === 0) {
      return false;
    }
    return GFP.utils.matchString(text, this.data.pattern);
  }

  getId(): string {
    return this.id;
  }

  show(): this {
    this.data.hidden = false;
    return this;
  }

  hide(): this {
    this.data.hidden = true;
    return this;
  }

  isHidden(): boolean {
    if (this.data.hidden === undefined) return false;
    return this.data.hidden;
  }

  toVisible(): boolean {
    if (this.data.hidden) {
      return false;
    }
    return true;
  }

  export(): TGFMapData {
    return {
      pattern: this.data.pattern,
      hidden: this.data.hidden,
    };
  }
}

interface TShapeMapData extends TGFMapData {}
/**
 * ShapeMap class for mapping
 * @class ShapeMap
 * @extends GFMap
 */
class ShapeMap extends GFMap {
  constructor(pattern: string | undefined, data: TShapeMapData | {}) {
    super(pattern, data);
  }
}

interface TTextMapData extends TGFMapData {}
/**
 * TextMap class for mapping
 * @class TextMap
 * @extends GFMap
 */
class TextMap extends GFMap {
  constructor(pattern, data: TTextMapData) {
    super(pattern, data);
    // this.import(data);
  }
}

interface TlinkMapData extends TGFMapData {}
/**
 * LinkMap class for mapping
 * @class LinkMap
 * @extends GFMap
 */
class LinkMap extends GFMap {
  constructor(pattern, data: TlinkMapData) {
    super(pattern, data);
  }
}

interface TRangeMapData {
  from?: string | null;
  to?: string | null;
  text?: string;
  hidden?: boolean;
}

/**
 * TextMap class for Range Value
 * @class RangeMap
 */
class RangeMap {
  data: TRangeMapData;
  constructor(from: string, to: string, text: string, data: TRangeMapData) {
    this.data = data;
    this.data.from = from;
    this.data.to = to;
    this.data.text = text;
    this.data.hidden = false;
    this.import(data);
  }

  import(obj: any) {
    this.data.from = obj.from || this.data.from || '';
    this.data.to = obj.to || this.data.to || '';
    this.data.text = obj.text || this.data.text || '';
    this.data.hidden = obj.hidden || this.data.hidden || false;
  }

  match(value) {
    if (this.data.from === 'null' && this.data.to === 'null') {
      return true;
    }
    if (value === null) {
      if (this.data.from === 'null' && this.data.to === 'null') {
        return true;
      }
    }
    if (Number(this.data.from) <= Number(value) && Number(this.data.to) >= Number(value)) {
      return true;
    }
    return false;
  }

  getFormattedText(value) {
    if (this.match(value)) {
      return this.data.text;
    }
    return value;
  }

  show() {
    this.data.hidden = false;
  }

  hide() {
    this.data.hidden = true;
  }

  isHidden() {
    return this.data.hidden;
  }

  toVisible() {
    if (this.data.hidden) {
      return false;
    }
    return true;
  }

  export() {
    return {
      from: this.data.from,
      to: this.data.to,
      text: this.data.text,
      hidden: this.data.hidden,
    };
  }
}

interface TValueMapData {
  value?: string;
  text?: string;
  hidden?: boolean;
}
class ValueMap {
  data: TValueMapData;
  constructor(value: string | undefined, text: string | undefined, data: TValueMapData) {
    this.data = data;
    this.data.value = value;
    this.data.text = text;
    this.data.hidden = false;
    this.import(data);
  }

  import(obj: any) {
    this.data.value = obj.value || this.data.value || '';
    this.data.text = obj.text || this.data.text || '';
    this.data.hidden = obj.hidden || this.data.hidden || false;
  }

  match(value) {
    if (value === null || value === undefined) {
      if (this.data.value === 'null') {
        return true;
      }
      return false;
    }

    if (!_.isString(value) && Number(this.data.value) === Number(value)) {
      return true;
    }

    return GFP.utils.matchString(value.toString(), this.data.value);
  }

  getFormattedText(value) {
    if (value === null) {
      if (this.data.value === 'null') {
        return this.data.text;
      }
    }
    if (this.match(value)) {
      return this.data.text;
    }
    return value;
  }

  show() {
    this.data.hidden = false;
  }

  hide() {
    this.data.hidden = true;
  }

  isHidden() {
    return this.data.hidden;
  }

  export() {
    return {
      value: this.data.value,
      text: this.data.text,
      hidden: this.data.hidden,
    };
  }
}
