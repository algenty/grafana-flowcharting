import { FlowchartCtrl } from './flowchart_ctrl';
import { loadPluginCss } from 'app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/agenty-flowcharting-panel/css/flowchart.dark.css',
  light: 'plugins/agenty-flowcharting-panel/css/flowchart.light.css',
});

window.logLevel = 0;
window.logDisplay = false;

export { FlowchartCtrl as PanelCtrl };