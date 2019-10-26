import { loadPluginCss } from 'grafana/app/plugins/sdk';
import { FlowchartCtrl } from './flowchart_ctrl';

loadPluginCss({
  dark: 'plugins/agenty-flowcharting-panel/styles/dark.css',
  light: 'plugins/agenty-flowcharting-panel/styles/light.css',
});

export { FlowchartCtrl as PanelCtrl };
