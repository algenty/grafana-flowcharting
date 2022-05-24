declare type mxCell = any;
// declare interface mxCell {
//   [key: string]: any;
// }
declare type mxCellState = any;
declare type mxMouseEvent = any;
declare var mxUtils: any;
declare var mxCellHighlight: any;
declare var mxConstants: any;
declare type mxGeometry = { x: number; y: number; width: number; height: number };
declare var mxEvent: any;
declare var mxClient: any;
declare var mxCodec: any;
declare var mxUrlConverter: any;
declare var mxCellOverlay: any;
declare var mxRectangle: any;
declare var mxLog: any;
declare var Graph: any;
// declare interface Graph {
//   [key: string]: any;
// }
declare var mxTooltipHandler: any;

declare module gf {
  declare interface TXCellGF {
    defaultValues: {
      id: string | null | undefined;
      value: string | null | undefined;
      metadata: TXCellMetadata | undefined;
      link: string | null | undefined;
      styles: TXCellStyles | undefined;
      dimension: mxGeometry | undefined;
    };
    tooltip: {
      enableTooltip: boolean;
      displayMetadata: boolean;
      tooltipHandler: TooltipHandler | undefined;
    };
  }
  declare type TXCellDefaultValueKeys = gf.TPropertieKey | 'link' | 'styles' | 'dimension';
  declare type TXCellMetadata = Map<string, any>;
  declare type TXCellStyles = Map<TXCellStyleKeys, any>;
  declare type TXCellStyleKeys = TStyleKeys;
  declare type TXCellValueGF = string | null | TXCellMetadata | TXCellStyles | mxGeometry;

  declare interface TSelectString {
    text: string;
    value: string;
  }

  declare interface TSelectAny {
    text: string;
    value: any;
  }

  declare interface TSelectNumber {
    text: string;
    value: number;
  }

  declare interface TSelectBoolean {
    text: string;
    value: boolean;
  }

  declare type TPropertieKey = 'id' | 'value' | 'metadata'; //Type properties for finding cells
  declare type TPropertieList = Array<{ text: string; value: TPropertieKey }>;

  declare interface TIFlowchartOptionsScope extends ng.IScope {
    editor: FlowchartOptionsCtrl;
    $GF: $GF;
    GFPlugin: GFPlugin;
    ctrl: any;
  }

  // Styles
  // declare type TStyleArray = [
  //   'fillColor',
  //   'strokeColor',
  //   'fontColor',
  //   'gradientColor',
  //   'imageBorder',
  //   'imageBackground',
  //   'shape',
  //   'overflow'
  // ];
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
  declare type TStyleAnimEventKey = 'barPos' | 'gaugePos' | 'fontSize' | 'opacity' | 'textOpacity' | 'rotation';
  declare type TStyleStaticEventKeys =
    | 'shape'
    | 'endArrow'
    | 'startArrow'
    | 'flipH'
    | 'flipV'
    | 'gradientDirection'
    | 'image';
  declare type TStyleEventKeys = TStyleAnimEventKey | TStyleStaticEventKeys;
  declare type TOtherEventKeys =
    | 'blink'
    | 'class'
    | 'visibility'
    | 'fold'
    | 'height'
    | 'width'
    | 'size'
    | 'text'
    | 'tpText'
    | 'tpMetadata'
    | 'class_mxEdgeFlow';
  declare type TTypeEventKeys = TStyleEventKeys | TOtherEventKeys;
  declare type TStyleAnimKeys = TStyleAnimEventKey | TStyleColorKeys;
  declare type TStyleStaticKeys = TStyleStaticEventKey;

  declare type TTypeEventElt = {
    text: string;
    value: TTypeEventKeys;
    type: 'number' | 'text';
    placeholder: string;
    typeahead?: string;
    default?: any;
  };
  declare type TTypeEventList = TTypeEventElt[];
  declare type TStyleKeys = TStyleColorKeys | TStyleEventKeys;

  declare interface TSelectStyle extends TSelectString {
    value: TStyleColor.Keys;
  }

  // ToolTip
  declare type TDirectionKeys = 'v' | 'h';
  declare type TDirectionList = Array<{ text: string; value: TDirectionKeys }>;
  declare type TGraphTypeKeys = 'line' | 'bar';
  declare type TGraphTypeList = Array<{ text: string; value: TGraphTypeKeys }>;
  declare interface TGraphTypeInt extends TSelectString {
    value: TGraphTypeKeys;
  }
  declare type TGraphCoordinate = { x?: number; y: number };
  declare type TGraphScaleKeys = 'linear' | 'log';
  declare type TGraphScaleElt = { text: string; value: TGraphScaleKeys };
  declare type TGraphScaleList = TGraphScaleElt[];
  declare type TGraphSizeKeys = '100%' | '100px' | '200px' | '400px';
  declare type TGraphSizeList = Array<{ text: string; value: TGraphSizeKeys }>;
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
  declare type TValueMappingList = Array<{ text: string; value: TValueMappingKeys }>;
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
  declare type TAggregationList = Array<{ text: string; value: TAggregationKeys }>;
  declare interface TSelectAggregation extends TSelectString {
    value: TAggregationKeys;
  }

  // Flowchart flag type
  // declare type TFlowchartFlagKeys =
  //   | 'sources'
  //   | 'options'
  //   | 'rules'
  //   | 'datas'
  //   | 'graphHover'
  //   | 'applyOptions'
  //   | 'hiddenChange';
  declare type TFlowchartFlagElt = { text: string; value: TFlowchartFlagKeys };
  declare type TFlowchartFlagList = TFlowchartFlagElt[];

  // Source graph
  declare type TSourceTypeKeys = 'xml' | 'csv';
  declare type TSourceTypeElt = { text: string; value: TSourceTypeKeys };
  declare type TSourceTypeList = TSourceTypeElt[];

  // Metric
  declare type TMetricTypeKeys = 'table' | 'serie';
  declare type TMetricTypeElt = { text: string; value: TMetricTypeKeys };
  declare type TMetricTypeList = TMetricTypeElt[];

  // Rules
  declare type TLinkOnKeys = 'wc' | 'a';
  declare type TLinkOnElt = { text: string; value: TLinkOnKeys };
  declare type TLinkOnList = TLinkOnElt[];

  declare type TTooltipOnKeys = 'wc' | 'a';
  declare type TTooltipOnElt = { text: string; value: TTooltipOnKeys };
  declare type TTooltipOnList = TTooltipOnElt[];

  declare type TColorOnKeys = 'n' | 'wc' | 'a';
  declare type TColorOnList = Array<{ text: string; value: TColorOnKeys }>;

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
  declare type TDateFormatElt = { text: string; value: TDateFormatKeys };
  declare type TDateFormatList = TDateFormatElt[];

  declare type TComparatorKeys = 'lt' | 'le' | 'eq' | 'ne' | 'ge' | 'gt' | 'al';
  declare type TComparatorElt = { text: string; value: TComparatorKeys };
  declare type TComparatorList = TComparatorElt[];

  declare type TVariableKeys = '_rule' | '_level' | '_value' | '_color' | '_formated' | '_date' | '_metric';
  declare type TVariableList = Array<{ text: string; value: TVariableKeys }>;
  declare interface TIRulesHandlerData {
    rulesData: TIRuleData[];
  }

  declare interface TRuleMaps {
    shapes: ShapeMap[];
    texts: TextMap[];
    links: LinkMap[];
    events: EventMap[];
  }
  declare type TMapDataArray = TShapeMapData[] | TTextMapData[] | TlinkMapData[] | TEventMapData[];
  declare interface TRuleMapOptions {
    identByProp: TPropertieKey;
    metadata: string;
    enableRegEx: boolean;
  }

  declare type TTypeMap = 'shape' | 'text' | 'link' | 'event';
  declare interface TRuleMapData {
    options: TRuleMapOptions;
    dataList: TMapDataArray;
  }

  declare interface TRuleShapeMapData extends TRuleMapData {
    dataList: TShapeMapData[];
  }
  declare interface TRuleTextMapData extends TRuleMapData {
    dataList: TTextMapData[];
  }
  declare interface TRuleLinkMapData extends TRuleMapData {
    dataList: TLinkMapData[];
  }

  declare interface TRuleEventMapData extends TRuleMapData {
    dataList: TEventMapData[];
  }

  declare interface TIRuleData {
    order: number; // Index of rule
    pattern: string;
    metricType: TMetricTypeKeys;
    alias: string;
    refId: string;
    column: string;
    aggregation: TAggregationKeys;
    unit: string;
    type: TValueTypeKeys;
    hidden: boolean;
    decimals: number;
    // colors: string[];
    reduce: boolean;
    dateColumn: string;
    dateFormat: TDateFormatKeys;
    // thresholds: number[];
    // stringThresholds: string[];
    invert: boolean;
    gradient: boolean;
    overlayIcon: boolean;
    tooltip: boolean;
    tooltipLabel: string;
    tooltipColors: boolean;
    tooltipOn: TTooltipOnKeys;
    tpDirection: TDirectionKeys;
    tpMetadata: boolean;
    tpGraph: boolean;
    tpGraphSize: TGraphSizeKeys;
    tpGraphType: TGraphTypeKeys;
    tpGraphLow: number | null;
    tpGraphHigh: number | null;
    tpGraphScale: TGraphScaleKeys;
    mapsDat: {
      shapes: TRuleShapeMapData;
      texts: TRuleTextMapData;
      links: TRuleLinkMapData;
      events: TRuleEventMapData;
    };
    // shapeProp: TPropertieKey;
    // shapeRegEx: boolean;
    // shapeData: TShapeMapData[];
    numberTHData: TTHNumberData[];
    stringTHData: TTHStringData[];
    dateTHData: TTHDateData[];
    // textProp: TPropertieKey;
    // textMD: string;
    // textRegEx: boolean;
    // textData: TTextMapData[];
    // linkProp: TPropertieKey;
    // linkMD: string;
    // linkRegEx: boolean;
    // linkData: TlinkMapData[];
    // eventProp: TPropertieKey;
    // eventMD: string;
    // eventRegEx: boolean;
    // eventData: TeventMapData[];
    mappingType: number;
    valueData: TValueMapData[];
    rangeData: TRangeMapData[];
    sanitize: boolean;
    newRule: boolean;
  }

  declare interface TDefObjMapData {
    pattern: string;
    hidden: boolean;
  }

  declare interface TShapeMapData extends TDefObjMapData {
    style: TStyleColor.Keys;
    colorOn: TColorOnKeys;
  }

  declare interface TEventMapData extends TDefObjMapData {
    style: TTypeEventKeys;
    comparator: TComparatorKeys;
    eventOn: number;
    value: string;
  }

  declare interface TTextMapData extends TDefObjMapData {
    textReplace: TTextMethodKeys;
    textPattern: string;
    textOn: TTextOnKeys;
  }

  declare interface TlinkMapData extends TDefObjMapData {
    linkUrl: string;
    linkParams: boolean;
    linkOn: TLinkOnKeys;
  }

// For RANGE AND VALUE MAPPING
  declare interface TDefMapData {
    text: string | undefined;
    hidden: boolean;
  }
  declare interface TRangeMapData extends TDefMapData{
    from: string | undefined;
    to: string | undefined;
  }

  declare interface TValueMapData extends TDefMapData{
    value: string | undefined;
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
  declare var mxLog: any;

  declare type mxCellOverlay = any;

  // For mapping object
  // declare interface TIOnMappingObj {
  //   active: boolean;
  //   object: ObjectMap | null;
  //   xcell: Xcell | null;
  //   focusId: string | null;
  //   value: string | null;
  //   options: gf.TRuleMapOptions | null;
  //   callback: CallableFunction | null;
  // }

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
    GFPlugin: GFPlugin;
    ctrl: FlowchartCtrl;
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
    enableAnim: boolean;
    tooltip: boolean;
    grid: boolean;
    bgColor: string | null;
  }

  declare interface TFlowchartHandlerData {
    editorUrl: string;
    editorTheme: string;
    allowDrawio: boolean;
    flowcharts: TFlowchartData[];
  }

  declare interface TRulesOptionsScope extends ng.IScope {
    editor: RulesOptionsCtrl;
    $GF: $GF;
    GFPlugin: GFPlugin;
    ctrl: FlowchartCtrl;
  }

  declare type TTableProperty = 'index' | 'id' | 'label' | 'desc' | 'width' | 'align' | 'sort' | 'select';
  declare type TTableAlign = 'left' | 'center' | 'right';
  declare type TTableSort = 'asc' | 'desc';
  declare interface TTableColumn {
    index: number;
    id: string;
    label: string;
    desc: string;
    width: string;
    align?: TTableAlign;
    sort?: TTableSort;
    select: boolean;
  }

  declare interface TTableData {
    data: any[];
    columns: TTableColumn[];
  }

  // declare type ObjectTH = NumberTH | StringTH;
  declare type TTHType = 'string' | 'number' | 'date';
  declare type TTHNumberComparator = 'ge' | 'gt';
  declare type TTHStringComparator = 'eq' | 'ne';
  declare type TTHDateComparator = 'eq' | 'ne' | 'ge' | 'gt';
  declare type TEventComparator = 'lt' | 'le' | 'eq' | 'ne' | 'ge' | 'gt' | 'al';
  declare interface TTHData {
    color: string;
    comparator: string;
    value: unknown;
    level: number;
  }

  declare interface TTHStringData extends TTHData {
    comparator: THStringComparator;
    value: string;
  }
  declare interface TTHNumberData extends TTHData {
    comparator: THNumberComparator;
    value: number;
  }
  declare interface TTHDateData extends TTHData {
    comparator: THDateComparator;
    value: string|number;
  }

  declare type THDatePrecision = 'y' | 'M' | 'w' | 'd' | 'h' | 'm' | 's';

  declare interface TObserver<T> {
    closed?: boolean;
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
    uid: string;
  }
}
