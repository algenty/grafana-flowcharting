//declare var GFP: FlowChartingPlugin;
type mxCell = any;
type mxMouseEvent = any;
type mxGeometry = { x: number; y: number; width: number; height: number };

declare module gf {
  declare interface TSelectString {
    text: string;
    value: string;
  }

  declare interface TSelectNumber {
    text: string;
    value: number;
  }

  declare interface TSelectBoolean {
    text: string;
    value: boolean;
  }

  declare type TPropertieKey = 'id' | 'value' | 'form'; //Type properties for finding cells
  declare type TPropertieList = { text: string; value: TPropertieKey }[];

  declare interface TIFlowchartOptionsScope extends ng.IScope {
    editor: FlowchartOptionsCtrl;
    $GF: $GF;
    ctrl: any;
  }

  // Styles
  declare type TStyleArray = [
    'fillColor',
    'strokeColor',
    'fontColor',
    'gradientColor',
    'imageBorder',
    'imageBackground',
    'shape',
    'overflow'
  ];
  declare type TStyleColorKeys =
    | 'fillColor'
    | 'strokeColor'
    | 'gradientColor'
    | 'fontColor'
    | 'labelBackgroundColor'
    | 'labelBorderColor'
    | 'imageBorder'
    | 'imageBackground';
  declare type TStyleColorElt = { text: string; value: TStyleColor.Keys };
  declare type TStyleColorList = TStyleColorElt[];
  declare type TStyleEventKeys =
    | 'shape'
    | 'rotation'
    | 'visibility'
    | 'fontSize'
    | 'blink'
    | 'barPos'
    | 'text'
    | 'opacity'
    | 'textOpacity'
    | 'fold'
    | 'height'
    | 'width'
    | 'size'
    | 'image'
    | 'endArrow'
    | 'startArrow'
    | 'flipH'
    | 'flipV'
    | 'class_mxEdgeFlow'
    | 'gradientDirection';
  declare type TStyleEventElt = {
    text: string;
    value: TStyleEventKeys;
    type: 'number' | 'text';
    placeholder: string;
    typeahead?: string;
    default?: any;
  };
  declare type TStyleEventList = TStyleEventElt[];
  declare type TStyleKey = TStyleColor.Keys | TStyleEventKeys;

  declare interface TSelectStyle extends TSelectString {
    value: TStyleColor.Keys;
  }

  // ToolTip
  declare type TDirectionKeys = 'v' | 'h';
  declare type TDirectionList = { text: string; value: TDirectionKeys }[];
  declare type TGraphTypeKeys = 'line' | 'bar';
  declare type TGraphTypeList = { text: string; value: TGraphTypeKeys }[];
  declare interface TGraphTypeInt extends TSelectString {
    value: TGraphTypeKeys;
  }
  declare type TGraphCoordinate = { x?: number; y: number };
  declare type TGraphScaleKeys = 'linear' | 'log';
  declare type TGraphScaleElt = { text: string; value: TGraphScaleKeys };
  declare type TGraphScaleList = TGraphScaleElt[];
  declare type TGraphSizeKeys = '100%' | '100px' | '200px' | '400px';
  declare type TGraphSizeList = { text: string; value: TGraphSizeKeys }[];
  declare interface TGraphSizeInt extends TSelectString {
    value: TGraphSizeKeys;
  }

  declare interface TSelectGraphScale extends TSelectString {
    value: TGraphScaleKeys;
  }

  declare type TCounterKeys = 'linear' | 'progressive';
  declare type TCounterElt = { text: string; value: TCounterKeys };
  declare type TCounterList = TCounterElt[];

  declare type TDioThemeKeys = 'dark' | 'kennedy' | 'minimal' | 'atlas';
  declare type TDioThemeElt = { text: string; value: TDioThemeKeys };
  declare type TDioThemeList = TDioThemeElt[];

  // Range or value
  declare type TValueMappingKeys = 1 | 2;
  declare type TValueMappingList = { text: string; value: TValueMappingKeys }[];
  declare interface TValueMappingInt extends TSelectNumber {
    value: TValueMappingKeys;
  }

  // Aggregation
  declare type TAggregationKeys =
    | 'first'
    | 'first_notnull'
    | 'current'
    | 'current_notnull'
    | 'min'
    | 'max'
    | 'total'
    | 'avg'
    | 'count'
    | 'delta'
    | 'range'
    | 'diff'
    | 'last_time'
    | 'graph-hover';
  declare type TAggregationList = { text: string; value: TAggregationKeys }[];
  declare interface TSelectAggregation extends TSelectString {
    value: TAggregationKeys;
  }

  // Source graph
  declare type TSourceTypeKeys = 'xml' | 'csv';
  declare type TSourceTypeList = { text: string; value: TSourceTypeKeys }[];

  // Metric
  declare type TMetricTypeKeys = 'table' | 'serie';
  declare type TMetricTypeList = { text: string; value: TMetricTypeKeys }[];

  // Rules
  declare type TLinkOnKeys = 'wc' | 'a';
  declare type TLinkOnList = { text: string; value: TLinkOnKeys }[];

  declare type TTooltipOn = 'wc' | 'a';
  declare type TTooltipOnList = { text: string; value: TTooltipOn }[];

  declare type TColorOnKeys = 'n' | 'wc' | 'a';
  declare type TColorOnList = { text: string; value: TColorOnKeys }[];

  declare type TTextOnKeys = 'n' | 'wmd' | 'wc' | 'co';
  declare type TTextOnElt = { text: string; value: TTextOnKeys };
  declare type TTextOnList = TTextOnElt[];

  declare type TValueTypeKeys = 'number' | 'string' | 'date';
  declare type TValueTypeElt = { text: string; value: TValueTypeKeys };
  declare type TValueTypeList = TValueTypeElt[];

  declare type TTextMethodKeys = 'content' | 'pattern' | 'as' | 'anl';
  declare type TTextMethodElt = { text: string; value: TTextMethodKeys; placeholder?: string };
  declare type TTextMethodList = TTextMethodElt[];
  declare type TDateFormatKeys =
    | 'YYYY-MM-DD HH:mm:ss'
    | 'YYYY-MM-DD HH:mm:ss.SSS'
    | 'MM/DD/YY h:mm:ss a'
    | 'MMMM D, YYYY LT'
    | 'YYYY-MM-DD';
  declare type TDateFormatList = { text: string; value: TDateFormatKeys }[];

  declare type TVariableKeys = '_rule' | '_level' | '_value' | '_color' | '_formated';
  declare type TVariableList = { text: string; value: TVariableKeys }[];
  declare interface TIRulesHandlerData {
    rulesData: TIRuleData[];
  }
  declare interface TIRuleData {
    order: number;
    pattern: string;
    metricType: TMetricTypeKeys;
    alias: string;
    refId: string;
    column: string;
    aggregation: TAggregationKeys;
    unit: string;
    type: string;
    hidden: boolean;
    decimals: number;
    colors: string[];
    reduce: boolean;
    dateFormat: TDateFormatKeys;
    thresholds: number[];
    stringThresholds: string[];
    invert: boolean;
    gradient: boolean;
    overlayIcon: boolean;
    tooltip: boolean;
    tooltipLabel: string;
    tooltipColors: boolean;
    tooltipOn: TTooltipOn;
    tpDirection: TDirectionKeys;
    tpGraph: boolean;
    tpGraphSize: TGraphSizeKeys;
    tpGraphType: TGraphTypeKeys;
    tpGraphLow: number | null;
    tpGraphHigh: number | null;
    tpGraphScale: TGraphScaleKeys;
    shapeProp: TPropertieKey;
    shapeRegEx: boolean;
    shapeData: TShapeMapData[];
    textProp: TPropertieKey;
    textRegEx: boolean;
    textData: TTextMapData[];
    linkProp: TPropertieKey;
    linkRegEx: boolean;
    linkData: TlinkMapData[];
    eventProp: TPropertieKey;
    eventRegEx: boolean;
    eventData: TeventMapData[];
    mappingType: number;
    valueData: TValueMapData[];
    rangeData: TRangeMapData[];
    sanitize: boolean;
  }

  declare interface TGFMapData {
    pattern: string;
    hidden: boolean;
  }

  declare interface TShapeMapData extends TGFMapData {
    style: TStyleColor.Keys;
    colorOn: TColorOnKeys;
  }

  declare interface TEventMapData extends TGFMapData {
    style: TStyleEventKeys;
    eventOn: number;
    value: string;
  }

  declare interface TTextMapData extends TGFMapData {
    textReplace: TTextMethodKeys;
    textPattern: string;
    textOn: TTextOnKeys;
  }

  declare interface TlinkMapData extends TGFMapData {
    linkUrl: string;
    linkParams: boolean;
    linkOn: TLinkOnKeys;
  }

  declare interface TRangeMapData {
    from: string | undefined;
    to: string | undefined;
    text: string | undefined;
    hidden: boolean;
  }

  declare interface TValueMapData {
    value: string | undefined;
    text: string | undefined;
    hidden: boolean;
  }

  // mxGraph API
  // mxGraph API
  declare var mxCellHighlight: any;
  declare var mxEvent: any;
  declare var mxClient: any;
  declare var mxUtils: any;
  declare var mxCodec: any;
  declare var mxConstants: any;
  declare var mxRectangle: any;
  declare var mxUrlConverter: any;

  declare type mxCellOverlay = any;

  // For mapping object
  declare interface TIOnMappingObj {
    active: boolean;
    object: GFMap | null;
    value: string | null;
    prop: TPropertieKey;
    $scope: ng.IScope | null;
  }

  // Export of id and label
  declare interface TICellsProp {
    id: string[];
    value: string[]; // Label
    form: string[];
  }

  // Inspect
  declare interface TInspectOptionsScope extends ng.IScope {
    flowchartHandler: any;
    editor: InspectOptionsCtrl;
    $GF: $GF;
    ctrl: any; //TODO: define type
    // testData: any;
  }

  // Flowcharts
  declare interface TFlowchartData {
    name: string;
    xml: string;
    csv: string;
    download: boolean;
    type: gf.TSourceTypeKeys;
    url: string;
    zoom: string;
    center: boolean;
    scale: boolean;
    lock: boolean;
    allowDrawio: boolean;
    enableAnim: boolean;
    tooltip: boolean;
    grid: boolean;
    bgColor: string | null;
    editorUrl: string;
    editorTheme: string;
  }

  declare interface TFlowchartHandlerData {
    flowcharts: TFlowchartData[];
  }

  declare interface TMappingOptionsScope extends ng.IScope {
    editor: MappingOptionsCtrl;
    $GF: $GF;
    ctrl: any;
  }
}
