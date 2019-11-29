declare var GFP: FlowChartingPlugin;

interface TSelectString {
  text: string;
  value: string;
}

interface TSelectNumber {
  text: string;
  value: number;
}

interface TSelectBoolean {
  text: string;
  value: boolean;
}

type TSourceType = 'xml' | 'csv'; // Source type
type TPropertieKey = 'id' | 'value'; //Type properties for finding cells
interface TSelectSource extends TSelectString {
  value: TSourceType;
}

interface TIFlowchartOptionsScope extends ng.IScope {
  flowchartHandler: any;
  editor: FlowchartOptionsCtrl;
  GFP: FlowChartingPlugin;
  ctrl: any;
}

// Styles
type TStyleArray = ['fillColor', 'strokeColor', 'fontColor', 'imageBorder', 'imageBackground'];
type TStyleKey = 'fillColor' | 'strokeColor' | 'fontColor' | 'imageBorder' | 'imageBackground';
interface TIStylesString {
  fillColor: string | null;
  strokeColor: string | null;
  fontColor: string | null;
  imageBorder: string | null;
  imageBackground: string | null;
}

interface TIStylesBoolean {
  fillColor: boolean;
  strokeColor: boolean;
  fontColor: boolean;
  imageBorder: boolean;
  imageBackground: boolean;
}

interface TIStylesNumber {
  fillColor: number;
  strokeColor: number;
  fontColor: number;
  imageBorder: number;
  imageBackground: number;
}

interface TSelectStyle extends TSelectString {
  value: TStyleKey;
}

// ToolTip
type TDirection = 'v' | 'h';
type TGraphType = 'line' | 'bar';
type TGraphCoordinate = { x?: number; y: number };
type TGraphScale = 'linear' | 'log';
type TGraphSize = '100%' | '100px' | '200px' | '400px';

interface TSelectGraphSize extends TSelectString {
  value: TGraphSize;
}
interface TSelectGraphType extends TSelectString {
  value: TGraphType;
}

interface TSelectGraphScale extends TSelectString {
  value: TGraphScale;
}

// Range or value
type TTextType = 1 | 2;
interface TSelectText extends TSelectNumber {
  value: TTextType;
}

// Aggregation
type TAggregation = 'first' | 'current' | 'min' | 'max' | 'total' | 'avg' | 'count' | 'delta' | 'range' | 'diff';
interface TSelectAggregation extends TSelectString {
  value: TAggregation;
}

// Metric
type TMetricType = 'table' | 'serie';

// Rules
type TLinkOn = 'wc' | 'a';
type TTooltipOn = 'wc' | 'a';
type TColorOn = 'n' | 'wc' | 'a';
type TTextOn = 'n' | 'wmd' | 'wc' | 'co';
type TTextReplace = 'content' | 'pattern' | 'as' | 'anl';
type TDateFormat = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm:ss.SSS' | 'MM/DD/YY h:mm:ss a' | 'MMMM D, YYYY LT' | 'YYYY-MM-DD';
interface TIRuleData {
  order: number;
  pattern: string;
  metricType : TMetricType;
  alias: string;
  refId: string;
  column : string;
  aggregation: TAggregation;
  unit: string; 
  type: string;
  hidden : boolean;
  decimals: number;
  colors: string[];
  reduce: boolean;
  style: TStyleKeyDisable;
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
  tpGraphLow: number | null;
  tpGraphHigh: number | null;
  tpGraphScale : TGraphScale;
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

interface TGFMapData {
  pattern: string;
  hidden: boolean;
}

type TShapeMapData = TGFMapData;
type TTextMapData = TGFMapData;
type TlinkMapData = TGFMapData;

interface TRangeMapData {
  from?: string | null;
  to?: string | null;
  text: string | null;
  hidden: boolean;
}

interface TValueMapData {
  value: string;
  text: string;
  hidden: boolean;
}

type mxCell = any;
type mxMouseEvent = any;

// XGraph
declare var mxCellHighlight: any,
  mxCellOverlay: any,
  mxEvent: any,
  mxClient: any,
  mxUtils: any,
  mxCodec: any,
  mxConstants: any,
  mxRectangle: any,
  mxUrlConverter: any;



// For mapping object
interface TIOnMappingObj {
  active: boolean;
  object: GFMap | null;
  id: string | null;
  $scope: ng.IScope | null;
}

// Export of id and label
export interface TICellsIdLabel {
  id: string[];
  value: string[]; // Label
}

// Inspect
interface TInspectOptionsScope extends ng.IScope {
  flowchartHandler: any;
  editor: InspectOptionsCtrl;
  GFP: FlowChartingPlugin;
  ctrl: any; //TODO: define type
}

// Flowcharts
interface TFlowchartData {
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
  tooltip: boolean;
  grid: boolean;
  bgColor: string | null;
  editorUrl: string;
  editorTheme: string;
}

interface TMappingOptionsScope extends ng.IScope {
  rulesHandler: any;
  flowchartHandler: FlowchartHandler;
  editor: MappingOptionsCtrl;
  GFP: FlowChartingPlugin;
  ctrl: any; //TODO: define type
}