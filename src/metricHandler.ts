import FlowChartingPlugin from 'plugin';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
import { Table, Serie, Metric } from 'metric_class';
declare var GFP: FlowChartingPlugin;

export default class MetricHandler {
  panel: any;
  $scope: ng.IScope;
  table: Table[] = [];
  serie: Serie[] = []
  metric: Metric 
  constructor($scope: ng.IScope, ctrl: any) {
    this.panel = ctrl.panel;
    this.$scope = $scope;
  }

  onDataReceived(dataList: any) {
    const data: any = {
      scopedVars: _.extend({}, this.panel.scopedVars),
    };

    dataList.array.forEach( (dl) => {
      let met;
      if (dl.type === 'table') {
        dl.dataType = 'table';
        let met = new Table(dl);
        const tableData = dataList.map(this.tableHandler.bind(this));
        this.setTableValues(tableData, data);
      } else {

      }
    });
    this.data = data;
  }

  addTable(data:any) {
    let table = new Table(data);
    
  }

  addSerie(data:any) {

  }

}
