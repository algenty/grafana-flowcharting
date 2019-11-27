
// import FlowChartingPlugin from './plugin';
import _ from 'lodash';
import {Serie,Table} from './metric_class';

// import { Table, Serie } from './metric_class';
// declare var GFP: FlowChartingPlugin;

export default class MetricHandler {
  panel: any;
  $scope: ng.IScope;
  tables: Table[] = [];
  series: Serie[] = []
  metrics: (Serie|Table)[] = [];
  constructor($scope: ng.IScope) {
    this.$scope = $scope;
  }

  onDataReceived(dataList: any) {
    this.tables = [];
    this.series = [];
    this.metrics = [];

    dataList.forEach( (dl) => {
      this.addMetric(dl);
    });
  }

  addMetric(data:any) {
    console.log("TCL: MetricHandler -> addMetric -> data", data)
    if (data.type === 'table') {
      this.addTable(data)
    } else {
      this.addSerie(data);
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
