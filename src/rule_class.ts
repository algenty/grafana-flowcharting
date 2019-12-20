import moment from 'moment';
import grafana from 'grafana_func';
import State from './state_class';
import _ from 'lodash';
import Metric from 'metric_class';

/**
 * Rule definition
 *
 * @export
 * @class Rule
 */
export default class Rule {
  data: gf.TIRuleData;
  shapeMaps: ShapeMap[] = [];
  textMaps: TextMap[] = [];
  linkMaps: LinkMap[] = [];
  valueMaps: ValueMap[] = [];
  rangeMaps: RangeMap[] = [];
  id: string;
  removeClick = 2;
  states: Map<string, State>;
  highestLevel = -1;
  highestColor = '';
  highestFormattedValue = '';

  /**
   * Creates an instance of Rule.
   * @param {string} pattern
   * @param {*} data
   * @memberof Rule
   */
  constructor(pattern: string, data: gf.TIRuleData) {
    this.data = data;
    this.data.pattern = pattern;
    this.id = GFP.utils.uniqueID();
    this.states = new Map();
  }

  /**
   * Get default data
   *
   * @static
   * @returns {gf.TIRuleData}
   * @memberof Rule
   */
  static getDefaultData(): gf.TIRuleData {
    return {
      order: 1,
      pattern: '.*',
      unit: 'short',
      type: 'number',
      metricType: 'serie',
      alias: 'myRule',
      refId: 'A',
      column: 'Time',
      hidden: false,
      aggregation: 'current',
      decimals: 2,
      colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
      reduce: true,
      style: 'fillColor',
      colorOn: 'a',
      link: false,
      linkOn: 'a',
      linkUrl: '',
      linkParams: false,
      textOn: 'wmd',
      textReplace: 'content',
      textPattern: '/.*/',
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      thresholds: [],
      stringWarning: '',
      stringCritical: '',
      invert: false,
      overlayIcon: false,
      tooltip: false,
      tooltipLabel: '',
      tooltipColors: false,
      tooltipOn: 'a',
      tpDirection: 'v',
      tpGraph: false,
      tpGraphSize: '100%',
      tpGraphType: 'line',
      tpGraphLow: null,
      tpGraphHigh: null,
      tpGraphScale: 'linear',
      shapeProp: 'id',
      shapeData: [],
      textProp: 'id',
      textData: [],
      linkProp: 'id',
      linkData: [],
      mappingType: 1,
      valueData: [],
      rangeData: [],
      sanitize: false,
    };
  }

  /**
   * return data of rule
   *
   * @returns {data}
   * @memberof Rule
   */
  getData(): gf.TIRuleData {
    return this.data;
  }

  /**
   * import data in rule
   *
   * @returns {this}
   * @param {data} obj
   * @memberof Rule
   */
  import(obj: any): this {
    if (!!obj.unit) {
      this.data.unit = obj.unit;
    }
    if (!!obj.type) {
      this.data.type = obj.type;
    }
    if (!!obj.metricType) {
      this.data.metricType = obj.metricType;
    }
    if (!!obj.alias) {
      this.data.alias = obj.alias;
    }
    if (!!obj.refId) {
      this.data.refId = obj.refId;
    }
    if (!!obj.column) {
      this.data.column = obj.column;
    }
    if (!!obj.aggregation) {
      this.data.aggregation = obj.aggregation;
    }
    if (!!obj.decimals || obj.decimals === 0) {
      this.data.decimals = obj.decimals;
    }
    if (!!obj.colors) {
      this.data.colors = obj.colors;
    }
    if (!!this.data.reduce) {
      this.data.reduce = true;
    }
    if (!!obj.style) {
      this.data.style = obj.style;
    }
    if (!!obj.colorOn) {
      this.data.colorOn = obj.colorOn;
    }
    if (!!obj.link) {
      this.data.link = obj.link;
    }
    if (!!obj.linkUrl) {
      this.data.linkUrl = obj.linkUrl;
    }
    if (!!obj.linkParams) {
      this.data.linkParams = obj.linkParams;
    }
    if (!!obj.textOn) {
      this.data.textOn = obj.textOn;
    }
    if (!!obj.textReplace) {
      this.data.textReplace = obj.textReplace;
    }
    if (!!obj.textPattern) {
      this.data.textPattern = obj.textPattern;
    }
    if (!!obj.pattern) {
      this.data.pattern = obj.pattern;
    }
    if (!!obj.dateFormat) {
      this.data.dateFormat = obj.dateFormat;
    }
    if (!!obj.thresholds) {
      this.data.thresholds = obj.thresholds;
    }
    if (!!obj.stringWarning) {
      this.data.stringWarning = obj.stringWarning;
    }
    if (!!obj.stringCritical) {
      this.data.stringCritical = obj.stringCritical;
    }
    if (!!obj.invert) {
      this.data.invert = obj.invert;
    }
    if (!!obj.overlayIcon) {
      this.data.overlayIcon = obj.overlayIcon;
    }
    if (!!obj.tooltip) {
      this.data.tooltip = obj.tooltip;
    }
    if (!!obj.tooltipLabel) {
      this.data.tooltipLabel = obj.tooltipLabel;
    }
    if (!!obj.tooltipColors) {
      this.data.tooltipColors = obj.tooltipColors;
    }
    if (!!obj.tooltipOn) {
      this.data.tooltipOn = obj.tooltipOn;
    }
    if (!!obj.tpDirection) {
      this.data.tpDirection = obj.tpDirection;
    }
    if (!!obj.tpGraph) {
      this.data.tpGraph = obj.tpGraph !== undefined;
    }
    if (!!obj.tpGraphSize) {
      this.data.tpGraphSize = obj.tpGraphSize;
    }
    if (!!obj.tpGraphType) {
      this.data.tpGraphType = obj.tpGraphType;
    }
    if (!!obj.tpGraphLow || obj.tpGraphLow === 0) {
      this.data.tpGraphLow = obj.tpGraphLow;
    }
    if (!!obj.tpGraphHigh || obj.tpGraphHigh === 0) {
      this.data.tpGraphHigh = obj.tpGraphHigh;
    }
    if (!!obj.tpGraphScale) {
      this.data.tpGraphScale = obj.tpGraphScale;
    }
    let maps: any = [];

    // SHAPES
    if (!!obj.shapeProp) {
      this.data.shapeProp = obj.shapeProp;
    }
    this.data.shapeData = [];

    // For 0.2.0
    maps = [];
    if (obj.shapeMaps !== undefined && obj.shapeMaps !== null && obj.shapeMaps.length > 0) {
      maps = obj.shapeMaps;
    } else {
      maps = obj.shapeData;
    }

    if (maps !== undefined && maps !== null && maps.length > 0) {
      maps.forEach((shapeData: gf.TShapeMapData) => {
        this.addShapeMap('new').import(shapeData);
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
      maps.forEach((textData: gf.TTextMapData) => {
        this.addTextMap('new').import(textData);
      });
    }

    // LINK
    this.data.linkProp = obj.linkProp || 'id';
    this.data.linkData = [];
    if (obj.linkData !== undefined && obj.linkData != null && obj.linkData.length > 0) {
      obj.linkData.forEach((linkData: gf.TlinkMapData) => {
        this.addLinkMap('new').import(linkData);
      });
    }

    this.data.mappingType = obj.mappingType || 1;

    // VALUES
    this.data.valueData = [];
    if (obj.valueData !== undefined && obj.valueData != null && obj.valueData.length > 0) {
      obj.valueData.forEach((valueData: gf.TValueMapData) => {
        this.addValueMap('value', 'text').import(valueData);
      });
    }

    // RANGE
    this.data.rangeData = [];
    if (obj.rangeData !== undefined && obj.rangeData != null && obj.rangeData.length > 0) {
      obj.rangeData.forEach(rangeData => {
        this.addRangeMap('from', 'to', 'text').import(rangeData);
      });
    }
    this.data.sanitize = obj.sanitize || false;
    return this;
  }

  /**
   * Return uniq id of rule
   *
   * @returns
   * @memberof Rule
   */
  getId(): string {
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
  setOrder(order: number) {
    this.data.order = order;
  }

  /**
   * Return order of rule
   *
   * @memberof Rule
   */
  getOrder(): number {
    return this.data.order;
  }

  isHidden(): boolean {
    return this.data.hidden;
  }

  hide(): this {
    this.data.hidden = true;
    return this;
  }

  show(): this {
    this.data.hidden = false;
    return this;
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
   * @returns {boolean}
   * @memberof Rule
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
   * Return true or false for condition to change label
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof Rule
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
   * Return true or false for condition to display icon warning
   *
   * @param {level} level
   * @returns {boolean}
   * @memberof Rule
   */
  toIconize(level: number): boolean {
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
   * @returns {boolean}
   * @memberof Rule
   */
  toLinkable(level: number): boolean {
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
  toTooltipize(level: number): boolean {
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
  // Series|Tables
  //
  /**
   * Return boolean if metrics is matched by rule
   *
   * @param {Metric} metric
   * @returns {boolean}
   * @memberof Rule
   */
  matchMetric(metric: Metric): boolean {
    if (this.data.metricType === 'serie' && metric.type === 'serie') {
      return GFP.utils.matchString(metric.getName(), this.data.pattern);
    }
    if (this.data.metricType === 'table' && metric.type === 'table') {
      return metric.getName() === this.data.refId;
    }
    return false;
  }

  //
  // SHAPE MAPS
  //
  /**
   * Add new shape for rule
   *
   * @param {string} pattern
   * @memberof Rule
   */
  addShapeMap(pattern: string): ShapeMap {
    const data = ShapeMap.getDefaultData() as gf.TShapeMapData;
    const m = new ShapeMap(pattern, data);
    this.shapeMaps.push(m);
    this.data.shapeData.push(data);
    return m;
  }

  /**
   * Remove shape for rule
   *
   * @returns {this}
   * @param {number} index
   * @memberof Rule
   */
  removeShapeMap(index: number): this {
    this.data.shapeData.splice(index, 1);
    this.shapeMaps.splice(index, 1);
    return this;
  }

  /**
   * Return shape objet in index position
   *
   * @param {number} index
   * @returns {ShapeMap}
   * @memberof Rule
   */
  getShapeMap(index: number): ShapeMap {
    return this.shapeMaps[index];
  }

  /**
   * Return all ShapeMaps
   *
   * @returns {Array<ShapeMap>}
   * @memberof Rule
   */
  getShapeMaps(): ShapeMap[] {
    return this.shapeMaps;
  }

  /**
   * Return bool if shape name (value|id) is in rule
   *
   * @param {string} pattern
   * @returns {boolean}
   * @memberof Rule
   */
  matchShape(pattern: string | null): boolean {
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
  addTextMap(pattern: string): TextMap {
    const data = TextMap.getDefaultData() as gf.TTextMapData;
    const m = new TextMap(pattern, data);
    // m.import(data);
    this.textMaps.push(m);
    this.data.textData.push(data);
    return m;
  }

  removeTextMap(index: number) {
    this.data.textData.splice(index, 1);
    this.textMaps.splice(index, 1);
  }

  getTextMap(index: number): TextMap {
    return this.textMaps[index];
  }

  getTextMaps(): TextMap[] {
    return this.textMaps;
  }

  matchText(pattern: string | null): boolean {
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
  addLinkMap(pattern: string): LinkMap {
    GFP.log.info('Rule.addLinkMap()');
    const data = LinkMap.getDefaultData() as gf.TlinkMapData;
    const m = new LinkMap(pattern, data);
    m.import(data);
    this.linkMaps.push(m);
    this.data.linkData.push(data);
    return m;
  }

  removeLinkMap(index: number) {
    this.data.linkData.splice(index, 1);
    this.linkMaps.splice(index, 1);
  }

  getLinkMap(index: number): LinkMap {
    return this.linkMaps[index];
  }

  getLinkMaps(): LinkMap[] {
    return this.linkMaps;
  }

  matchLink(pattern: string | null): boolean {
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
  addValueMap(value: string, text: string): ValueMap {
    const data: gf.TValueMapData = ValueMap.getDefaultdata();
    const m = new ValueMap(value, text, data);
    this.valueMaps.push(m);
    this.data.valueData.push(data);
    return m;
  }

  removeValueMap(index) {
    this.data.valueData.splice(index, 1);
    this.valueMaps.splice(index, 1);
  }

  getValueMap(index): ValueMap {
    return this.valueMaps[index];
  }

  getValueMaps(): ValueMap[] {
    return this.valueMaps;
  }

  //
  // STRING RANGE VALUE MAPS
  //
  addRangeMap(from, to, text): RangeMap {
    const data = RangeMap.getDefaultData();
    const m = new RangeMap(from, to, text, data);
    this.rangeMaps.push(m);
    this.data.rangeData.push(data);
    return m;
  }

  removeRangeMap(index) {
    this.data.rangeData.splice(index, 1);
    this.rangeMaps.splice(index, 1);
  }

  getRangeMap(index): RangeMap {
    return this.rangeMaps[index];
  }

  getRangeMaps(): RangeMap[] {
    return this.rangeMaps;
  }

  hideRangeMap(index): this {
    this.rangeMaps[index].hide();
    return this;
  }

  showRangeMap(index): this {
    this.rangeMaps[index].show();
    return this;
  }

  //
  // Format value
  //
  /**
   * Get color according to value
   *
   * @param {number} value
   * @returns {string} html color
   * @memberof Rule
   */
  getColorForValue(value: number): string | null {
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
  getColorForLevel(level: number): string {
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
   * @param {number} value
   * @returns 0, 1 or 2
   * @memberof Rule
   */
  getThresholdLevel(value: any): number {
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
      if (GFP.utils.matchString(value, this.data.stringWarning)) {
        return 1;
      }
      if (GFP.utils.matchString(this.data.stringCritical, this.data.stringWarning)) {
        return 2;
      }
      const formatedValue = this.getFormattedValue(value);
      if (GFP.utils.matchString(formatedValue, this.data.stringWarning)) {
        return 1;
      }
      if (GFP.utils.matchString(formatedValue, this.data.stringCritical)) {
        return 2;
      }
      return 0;
    }
    return 0;
  }

  /**
   * Get value for this metric
   *
   * @param {Metric} metric
   * @returns {(string | number | null)}
   * @memberof Rule
   */
  getValueForMetric(metric: Metric): string | number | null {
    if (this.matchMetric(metric)) {
      try {
        const value = metric.getValue(this.data.aggregation, this.data.column);
        return value;
      } catch (error) {
        GFP.log.error('datapoint for metric is null', error);
        return null;
      }
    }
    return '-';
  }

  /**
   * Get formatting value according unit
   *
   * @param {Metric} metric
   * @returns {string}
   * @memberof Rule
   */
  getFormattedValueForMetric(metric: Metric): string {
    const formattedValue = this.getValueForMetric(metric);
    return this.getFormattedValue(formattedValue);
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
   * Format a one value according rule
   *
   * @param {*} value
   * @returns
   * @memberof Rule
   */
  getFormattedValue(value: any) {
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

  /**
   * Replace text according text options
   *
   * @param {*} text
   * @param {*} FormattedValue
   * @returns
   * @memberof Rule
   */
  getReplaceText(text: string, FormattedValue: string): string {
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
    return text;
  }

  defaultValueFormatter(value: any) {
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

export class GFMap {
  data!: gf.TGFMapData;
  id: string;
  constructor(pattern, data: gf.TGFMapData) {
    this.data = data;
    this.data.pattern = pattern;
    this.id = GFP.utils.uniqueID();
    // this.import(data);
  }

  /**
   * Import data from panel
   *
   * @param {*} obj
   * @returns {this}
   * @memberof GFMap
   */
  import(obj: any): this {
    this.data.pattern = obj.pattern || '';
    this.data.hidden = obj.hidden || false;
    return this;
  }

  /**
   * Return default data
   *
   * @static
   * @returns
   * @memberof GFMap
   */
  static getDefaultData() {
    return {};
  }

  /**
   * Return if text match pattern
   *
   * @param {(string | null)} text
   * @returns {boolean}
   * @memberof GFMap
   */
  match(text: string | null): boolean {
    if (text === undefined || text === null || text.length === 0) {
      return false;
    }
    return GFP.utils.matchString(text, this.data.pattern);
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
class ShapeMap extends GFMap {
  constructor(pattern: string, data: gf.TShapeMapData) {
    super(pattern, data);
  }
}

/**
 * TextMap class for mapping
 * @class TextMap
 * @extends GFMap
 */
class TextMap extends GFMap {
  constructor(pattern: string, data: gf.TTextMapData) {
    super(pattern, data);
    // this.import(data);
  }
}

/**
 * LinkMap class for mapping
 * @class LinkMap
 * @extends GFMap
 */
class LinkMap extends GFMap {
  constructor(pattern: string, data: gf.TlinkMapData) {
    super(pattern, data);
  }
}

/**
 * TextMap class for Range Value
 * @class RangeMap
 */
class RangeMap {
  data: gf.TRangeMapData;
  constructor(from: string, to: string, text: string, data: gf.TRangeMapData) {
    this.data = data;
    this.data.from = from;
    this.data.to = to;
    this.data.text = text;
    this.data.hidden = false;
    // this.import(data);
  }

  /**
   * import data from panel
   *
   * @param {*} obj
   * @returns {this}
   * @memberof RangeMap
   */
  import(obj: any): this {
    this.data.from = obj.from || this.data.from || '';
    this.data.to = obj.to || this.data.to || '';
    this.data.text = obj.text || this.data.text || '';
    this.data.hidden = obj.hidden || this.data.hidden || false;
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
      from: null,
      to: null,
      text: null,
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

  /**
   * Return Formatted value
   *
   * @param {*} value
   * @returns {(string | null)}
   * @memberof RangeMap
   */
  getFormattedText(value: any): string | null {
    if (this.match(value)) {
      return this.data.text;
    }
    return value;
  }

  /**
   * Show/enable range
   *
   * @memberof RangeMap
   */
  show() {
    this.data.hidden = false;
  }

  /**
   * Hide/disable range
   *
   * @memberof RangeMap
   */
  hide() {
    this.data.hidden = true;
  }

  /**
   * Is hidden
   *
   * @returns
   * @memberof RangeMap
   */
  isHidden() {
    return this.data.hidden;
  }

  /**
   * is visible
   *
   * @returns
   * @memberof RangeMap
   */
  toVisible() {
    if (this.data.hidden) {
      return false;
    }
    return true;
  }

  /**
   * Export current data
   *
   * @returns
   * @memberof RangeMap
   */
  export() {
    return {
      from: this.data.from,
      to: this.data.to,
      text: this.data.text,
      hidden: this.data.hidden,
    };
  }
}

class ValueMap {
  data: gf.TValueMapData;
  constructor(value: string, text: string, data: gf.TValueMapData) {
    this.data = data;
    this.data.value = value;
    this.data.text = text;
    this.data.hidden = false;
    this.import(data);
  }

  /**
   * Get default data
   *
   * @static
   * @returns
   * @memberof ValueMap
   */
  static getDefaultdata() {
    return {
      value: '',
      text: '',
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
    this.data.value = obj.value || this.data.value || '';
    this.data.text = obj.text || this.data.text || '';
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
    return GFP.utils.matchString(value.toString(), this.data.value);
  }

  /**
   * Get formatted value
   *
   * @param {any} value
   * @returns
   * @memberof ValueMap
   */
  getFormattedText(value: any): string {
    if (value === null) {
      if (this.data.value === 'null') {
        return this.data.text;
      }
    }
    if (this.match(value)) {
      return this.data.text;
    }
    return `${value}`;
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

  /**
   * export data
   *
   * @returns
   * @memberof ValueMap
   */
  export() {
    return {
      value: this.data.value,
      text: this.data.text,
      hidden: this.data.hidden,
    };
  }
}
