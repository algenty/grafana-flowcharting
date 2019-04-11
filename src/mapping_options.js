import _ from 'lodash';
import kbn from 'app/core/utils/kbn';
import { plugin } from './plugin';

export class MappingOptionsCtrl {
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    $scope.rulesHandler = this.panelCtrl.rulesHandler;
    $scope.flowchartHandler = this.panelCtrl.flowchartHandler;
    this.flowchartHandler = $scope.ctrl.flowchartHandler;
    this.unitFormats = kbn.getUnitFormats();
    this.style = [
      { text: 'Disabled', value: null },
      { text: 'Stroke', value: 'strokeColor' },
      { text: 'Fill', value: 'fillColor' },
      { text: 'Text', value: 'fontColor' }
    ];
    this.colorOn = [{ text: 'Warning / Critical', value: 'wc' }, { text: 'Always', value: 'a' }];
    this.textOn = [
      { text: 'Never', value: 'n' },
      { text: 'When Metric Displayed', value: 'wmd' },
      { text: 'Warning / Critical', value: 'wc' },
      { text: 'Critical Only', value: 'co' }
    ];
    this.textReplace = [
      { text: 'All content', value: 'content' },
      { text: 'Substring', value: 'pattern' }
    ];
    this.propTypes = [
      { text: 'Id', value: 'id' }
      // { text: "Substring", value: "pattern" }
    ];
    this.textPattern = '/.*/';
    this.metricTypes = [
      { text: 'Number', value: 'number' },
      { text: 'String', value: 'string' },
      { text: 'Date', value: 'date' }
    ];
    this.dateFormats = [
      { text: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
      { text: 'YYYY-MM-DD HH:mm:ss.SSS', value: 'YYYY-MM-DD HH:mm:ss.SSS' },
      { text: 'MM/DD/YY h:mm:ss a', value: 'MM/DD/YY h:mm:ss a' },
      { text: 'MMMM D, YYYY LT', value: 'MMMM D, YYYY LT' },
      { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
    ];
    this.aggregationTypes = [
      { text: 'First', value: 'first' },
      { text: 'Last', value: 'current' },
      { text: 'Min', value: 'min' },
      { text: 'Max', value: 'max' },
      { text: 'Sum', value: 'total' },
      { text: 'Avg', value: 'avg' },
      { text: 'Count', value: 'count' },
      { text: 'Delta', value: 'delta' },
      { text: 'Range', value: 'range' },
      { text: 'Diff', value: 'diff' }
    ];
    this.mappingTypes = [{ text: 'Value to text', value: 1 }, { text: 'Range to text', value: 2 }];

    this.getMetricNames = () => {
      if (!this.panelCtrl.series) {
        return [];
      }
      return _.map(this.panelCtrl.series, t => {
        return t.alias;
      });
    };

    this.getCellNamesForShape = () => {
      let cells = this.flowchartHandler.getNamesByProp('id');
      return _.map(cells, t => {
        return t;
      });
    };

    this.getCellNamesForText = () => {
      let cells = this.flowchartHandler.getNamesByProp('id');
      return _.map(cells, t => {
        return t;
      });
    };

    this.getCellNamesForLink = () => {
      let cells = this.flowchartHandler.getNamesByProp('id');
      return _.map(cells, t => {
        return t;
      });
    };
  }

  render() {
    this.panelCtrl.render();
  }

  setUnitFormat(column, subItem) {
    column.unit = subItem.value;
    this.onOptionsChange();
  }

  onOptionsChange() {
    this.panelCtrl.changedOptions = true;
    this.render();
  }
}

/** @ngInject */
export function mappingOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/plugins/' + plugin.id + '/partials/mapping_options.html',
    controller: MappingOptionsCtrl
  };
}
