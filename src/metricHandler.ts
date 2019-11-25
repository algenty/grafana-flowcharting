import FlowChartingPlugin from 'plugin';
import TimeSeries from 'app/core/time_series2';
import _ from "lodash";
declare var GFP: FlowChartingPlugin;


export default class MetricHandler {
  panel: any;
  $scope : ng.IScope;

  constructor($scope: ng.IScope, ctrl: any) {
    this.panel = ctrl.panel;
    this.$scope = $scope;

  }

  onDataReceived(dataList: any) {
    const data: any = {
      scopedVars: _.extend({}, this.panel.scopedVars),
    };

    if (dataList.length > 0 && dataList[0].type === 'table') {
      this.dataType = 'table';
      const tableData = dataList.map(this.tableHandler.bind(this));
      this.setTableValues(tableData, data);
    } else {
      this.dataType = 'timeseries';
      this.series = dataList.map(this.seriesHandler.bind(this));
      this.setValues(data);
    }
    this.data = data;
  }

  

}