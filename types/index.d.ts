declare var GFP: FlowChartingPlugin;

interface TSelectString {
  text: string;
  value: string;
}


interface TFlowchartOptionsScope extends ng.IScope {
  flowchartHandler: any;
  editor: FlowchartOptionsCtrl;
  GFP: FlowChartingPlugin;
  ctrl: any;
}