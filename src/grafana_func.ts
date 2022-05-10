// import { getValueFormat } from '@grafana/data';
import kbn from 'grafana/app/core/utils/kbn';
import TimeSeries from 'grafana/app/core/time_series2';
// import _ from 'lodash';
import { loadPluginCss, MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import { dateTime, PanelEvents } from '@grafana/data';
import appEvents from 'grafana/app/core/app_events';

var grafana = {
  // formatValue(value, unit, decimals) {
  //   const fmt = getValueFormat(unit);
  //   const result = fmt(value, decimals).toString();
  //   return result.toString();
  // }
  formatValue(value: any, unit: any, decimals: any) {
    return kbn.valueFormats[unit](value, decimals, null).toString();
  },

  getUnitFormats() {
    return kbn.getUnitFormats();
  },

  loadCss() {
    loadPluginCss({
      dark: 'plugins/agenty-flowcharting-panel/styles/dark.css',
      light: 'plugins/agenty-flowcharting-panel/styles/light.css',
    });
    // loadPluginCss({
    //   dark: 'plugins/agenty-flowcharting-panel/static/css/flowchart.dark.css',
    //   light: 'plugins/agenty-flowcharting-panel/static/css/flowchart.light.css',
    // });
  },

  getTimeSeries(seriesData: any) {
    return new TimeSeries({
      datapoints: seriesData.datapoints || [],
      alias: seriesData.target,
      unit: seriesData.unit,
    });
  },

  getFormatedDate(value: any, format: any) {
    return dateTime(value).format(format);
  },
  appEvents: appEvents,
  MetricsPanelCtrl: MetricsPanelCtrl,
  PanelEvents: PanelEvents,
};

export default grafana;
