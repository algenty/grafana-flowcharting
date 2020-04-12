export class GFCONSTANT {
  // CONDITIONS
  static TOOLTIP_APPLYON: gf.TTooltipOnList = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  static COLOR_APPLYON: gf.TColorOnList = [
    { text: 'Never', value: 'n' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];
  static TEXT_APPLYON: gf.TTextOnList = [
    { text: 'Never', value: 'n' },
    { text: 'When Metric Displayed', value: 'wmd' },
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Critical Only', value: 'co' },
  ];
  static LINK_APPLYON: gf.TLinkOnList = [
    { text: 'Warning / Critical', value: 'wc' },
    { text: 'Always', value: 'a' },
  ];

  // TYPES
  static VALUE_TYPES: gf.TValueTypeList = [
    { text: 'Number', value: 'number' },
    { text: 'String', value: 'string' },
    { text: 'Date', value: 'date' },
  ];
  static METRIC_TYPES: gf.TMetricTypeList = [
    { text: 'Series', value: 'serie' },
    { text: 'Table', value: 'table' },
  ];
  static IDENT_TYPES: { text: string; value: gf.TPropertieKey }[] = [
    { text: 'Id', value: 'id' },
    { text: 'Label', value: 'value' },
  ];
  static AGGREGATION_TYPES: gf.TAggregationList = [
    { text: 'First', value: 'first' },
    { text: 'Last', value: 'current' },
    { text: 'Min', value: 'min' },
    { text: 'Max', value: 'max' },
    { text: 'Sum', value: 'total' },
    { text: 'Avg', value: 'avg' },
    { text: 'Count', value: 'count' },
    { text: 'Delta', value: 'delta' },
    { text: 'Range', value: 'range' },
    { text: 'Diff', value: 'diff' },
  ];
  static TOOLTIP_GRAPH_TYPES: gf.TGraphTypeList = [
    { text: 'Line', value: 'line' },
    { text: 'Histogram', value: 'bar' },
  ];
  static TOOLTIP_GRAPH_SCALE_TYPES: gf.TGraphScaleList = [
    { text: 'Linear', value: 'linear' },
    { text: 'Logarithmic', value: 'log' },
  ];
  static TOOLTIP_GRAPH_SIZE_TYPES: gf.TGraphSizeList = [
    { text: 'Adjustable', value: '100%' },
    { text: 'Small', value: '100px' },
    { text: 'Medium', value: '200px' },
    { text: 'Large', value: '400px' },
  ];
  static TOOLTIP_DIRECTION_TYPES: gf.TDirectionList = [
    { text: 'Vertical', value: 'v' },
    { text: 'Horizontal ', value: 'h' },
  ];
  static VALUE_DATEFORMAT_TYPES: gf.TDateFormatList = [
    { text: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
    { text: 'YYYY-MM-DD HH:mm:ss.SSS', value: 'YYYY-MM-DD HH:mm:ss.SSS' },
    { text: 'MM/DD/YY h:mm:ss a', value: 'MM/DD/YY h:mm:ss a' },
    { text: 'MMMM D, YYYY LT', value: 'MMMM D, YYYY LT' },
    { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  ];

  static VALUEMAPPINGTYPES: gf.TValueMappingList = [
    { text: 'Value to text', value: 1 },
    { text: 'Range to text', value: 2 },
  ];

  // METHODS
  static TEXTMETHODS: gf.TTextMethodList = [
    { text: 'All content', value: 'content' },
    { text: 'Substring', value: 'pattern' },
    { text: 'Append (Space) ', value: 'as' },
    { text: 'Append (New line) ', value: 'anl' },
  ];
  static COLORMETHODS: gf.TStyleColorList = [
    { text: 'Shape Stroke/Border', value: 'strokeColor' },
    { text: 'Shape Fill', value: 'fillColor' },
    { text: 'Label font color', value: 'fontColor' },
    { text: 'Label background color', value: 'labelBackgroundColor' },
    { text: 'Label border color', value: 'labelBorderColor' },
    { text: 'Image background', value: 'imageBackground' },
    { text: 'Image border', value: 'imageBorder' },
  ];
  static EVENTMETHODS: gf.TStyleEventList = [
    { text: 'Change Shape (text)', value: 'shape', type: 'text' },
    { text: 'Rotate Shape (0-360)', value: 'rotation', type: 'number' },
    { text: 'Hide Shape (0|1)', value: 'visibility', type: 'number' },
    { text: 'Font Size (numeric)', value: 'fontSize', type: 'number' },
    { text: 'Blink shape (frequence ms)', value: 'blink', type: 'number' },
  ];
}

export class GFVariables {
  private variables: Map<string, any>;
  constructor() {
    this.variables = new Map();
  }

  set(key: string, value: any): this {
    this.variables.set(key, value);
    return this;
  }

  get(key: string): any {
    return this.variables.get(key);
  }

  clear(): this {
    this.variables.clear();
    return this;
  }

  replaceText(text: string): string {
    try {
      for (let [key, value] of this.variables) {
        text = text.replace('${' + key + '}',value);
      }
    } catch (error) {
      return text;
    }
    return text;
  }

  eval(text:string):string {
      let t = this.replaceText(text);
      try {
          text = eval(t);
      } catch (error) {
          return t; 
      }
      return text;
  }
}

export class GFUtils {
  static GLOBAL_VARS: GFVariables = new GFVariables();
  static getLocalVars(): GFVariables {
    let _v = new GFVariables();
    return _v;
  }

  static getGlobalVars(): GFVariables {
    return GFUtils.GLOBAL_VARS;
  }
}
