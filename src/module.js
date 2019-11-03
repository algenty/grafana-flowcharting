import { FlowChartingPlugin } from './plugin';
import { loadPluginCss } from 'grafana/app/plugins/sdk';
import { FlowchartCtrl } from './flowchart_ctrl';


loadPluginCss({
  dark: 'plugins/agenty-flowcharting-panel/css/flowchart.dark.css',
  light: 'plugins/agenty-flowcharting-panel/css/flowchart.light.css',
});

export { FlowchartCtrl as PanelCtrl };
