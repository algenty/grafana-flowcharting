declare var GFP: FlowChartingPlugin;
type mxCell = any;
type mxMouseEvent = any;

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

  declare type TSourceType = 'xml' | 'csv'; // Source type
  declare type TPropertieKey = 'id' | 'value'; //Type properties for finding cells
  declare interface TSelectSource extends TSelectString {
    value: TSourceType;
  }

  declare interface TIFlowchartOptionsScope extends ng.IScope {
    flowchartHandler: any;
    editor: FlowchartOptionsCtrl;
    GFP: FlowChartingPlugin;
    ctrl: any;
  }

  // Styles
  declare type TStyleArray = ['fillColor', 'strokeColor', 'fontColor', 'imageBorder', 'imageBackground'];
  declare type TStyleKey = 'fillColor' | 'strokeColor' | 'fontColor' | 'imageBorder' | 'imageBackground';
  declare interface TIStylesString {
    fillColor: string | null;
    strokeColor: string | null;
    fontColor: string | null;
    imageBorder: string | null;
    imageBackground: string | null;
  }

  declare interface TIStylesBoolean {
    fillColor: boolean;
    strokeColor: boolean;
    fontColor: boolean;
    imageBorder: boolean;
    imageBackground: boolean;
  }

  declare interface TIStylesNumber {
    fillColor: number;
    strokeColor: number;
    fontColor: number;
    imageBorder: number;
    imageBackground: number;
  }

  declare interface TSelectStyle extends TSelectString {
    value: TStyleKey;
  }

  // ToolTip
  declare type TDirection = 'v' | 'h';
  declare type TGraphType = 'line' | 'bar';
  declare type TGraphCoordinate = { x?: number; y: number };
  declare type TGraphScale = 'linear' | 'log';
  declare type TGraphSize = '100%' | '100px' | '200px' | '400px';

  declare interface TSelectGraphSize extends TSelectString {
    value: TGraphSize;
  }
  declare interface TSelectGraphType extends TSelectString {
    value: TGraphType;
  }

  declare interface TSelectGraphScale extends TSelectString {
    value: TGraphScale;
  }

  // Range or value
  declare type TTextType = 1 | 2;
  declare interface TSelectText extends TSelectNumber {
    value: TTextType;
  }

  // Aggregation
  declare type TAggregation = 'first' | 'current' | 'min' | 'max' | 'total' | 'avg' | 'count' | 'delta' | 'range' | 'diff';
  declare interface TSelectAggregation extends TSelectString {
    value: TAggregation;
  }

  // Metric
  declare type TMetricType = 'table' | 'serie';

  // Rules
  declare type TLinkOn = 'wc' | 'a';
  declare type TTooltipOn = 'wc' | 'a';
  declare type TColorOn = 'n' | 'wc' | 'a';
  declare type TTextOn = 'n' | 'wmd' | 'wc' | 'co';
  declare type TTextReplace = 'content' | 'pattern' | 'as' | 'anl';
  declare type TDateFormat = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm:ss.SSS' | 'MM/DD/YY h:mm:ss a' | 'MMMM D, YYYY LT' | 'YYYY-MM-DD';
  declare interface TIRulesHandlerData {
    rulesData: TIRuleData[];
  }
  declare interface TIRuleData {
    order: number;
    pattern: string;
    metricType: TMetricType;
    alias: string;
    refId: string;
    column: string;
    aggregation: TAggregation;
    unit: string;
    type: string;
    hidden: boolean;
    decimals: number;
    colors: string[];
    reduce: boolean;
    //style: TStyleKeyDisable;
    //colorOn: TColorOn;
    //link: boolean;
    //linkOn: TLinkOn;
    //linkUrl: string;
    //linkParams: boolean;
    //textOn: TTextOn;
    // textReplace: TTextReplace;
    // textPattern: string;
    dateFormat: TDateFormat;
    thresholds: number[];
    stringThresholds: string[];
    //stringWarning: string;
    //stringCritical: string;
    invert: boolean;
    gradient:boolean;
    overlayIcon: boolean;
    tooltip: boolean;
    tooltipLabel: string;
    tooltipColors: boolean;
    tooltipOn: TTooltipOn;
    tpDirection: TDirection;
    tpGraph: boolean;
    tpGraphSize: TGraphSize;
    tpGraphType: TGraphType;
    tpGraphLow: number | null;
    tpGraphHigh: number | null;
    tpGraphScale: TGraphScale;
    shapeProp: TPropertieKey;
    shapeData: TShapeMapData[];
    textProp: TPropertieKey;
    textData: TTextMapData[];
    linkProp: TPropertieKey;
    linkData: TlinkMapData[];
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
    style: TStyleKey;
    colorOn: TColorOn;
  }

  declare interface TTextMapData extends TGFMapData {
    textReplace: TTextReplace;
    textPattern: string;
    textOn: TTextOn;
  }

  declare interface TlinkMapData extends TGFMapData {
    linkUrl: string;
    linkParams: boolean;
    linkOn: TLinkOn;
  }

  declare interface TRangeMapData {
    from?: string | null;
    to?: string | null;
    text: string | null;
    hidden: boolean;
  }

  declare interface TValueMapData {
    value: string;
    text: string;
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
    id: string | null;
    $scope: ng.IScope | null;
  }

  // Export of id and label
  declare interface TICellsIdLabel {
    id: string[];
    value: string[]; // Label
  }

  // Inspect
  declare interface TInspectOptionsScope extends ng.IScope {
    flowchartHandler: any;
    editor: InspectOptionsCtrl;
    GFP: FlowChartingPlugin;
    ctrl: any; //TODO: define type
  }

  // Flowcharts
  declare interface TFlowchartData {
    name: string;
    xml: string;
    csv: string;
    download: boolean;
    type: TSourceType;
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
    rulesHandler: any;
    flowchartHandler: FlowchartHandler;
    editor: MappingOptionsCtrl;
    GFP: FlowChartingPlugin;
    ctrl: any;
  }
}
