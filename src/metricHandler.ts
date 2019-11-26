import FlowChartingPlugin from 'plugin';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
import { Table, Serie, Metric } from 'metric_class';
declare var GFP: FlowChartingPlugin;

export default class MetricHandler {
  panel: any;
  $scope: ng.IScope;
  tables: Table[] = [];
  series: Serie[] = []
  metrics: (Serie|Table)[] = [];
  constructor($scope: ng.IScope, ctrl: any) {
    this.panel = ctrl.panel;
    this.$scope = $scope;
  }

  onDataReceived(dataList: any) {
    this.tables = [];
    this.series = [];
    this.metrics = [];
    const data: any = {
      scopedVars: _.extend({}, this.panel.scopedVars),
    };

    dataList.array.forEach( (dl) => {
      this.addMetric(dl);
    });
  }

  addMetric(data:any) {
    if (data.type === 'table') {
      this.addTable(data)
    } else {
      this.addMetric(data);
    }
  }
  
  addTable(data:any):Table {
    let table = new Table(data);
    this.tables.push(table);
    this.metrics.push(table);
    return table;
  }

  addSerie(data:any):Serie {
    let serie = new Serie(data);
    this.series.push(serie);
    this.metrics.push(serie);
    return serie;
  }

}
