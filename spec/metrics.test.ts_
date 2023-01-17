const datas = require('./samples/metricdatas.json');
import { $GF } from '../src/globals_class';
import { MetricHandler } from '../src/metric_handler';

const $scope = require('$scope');
const templateSrv = {};
const dashboard = {};
const ctrl = {
  notify: jest.fn(),
  clearNotify: jest.fn(),
};

const $gf = $GF.create($scope, templateSrv, dashboard, ctrl);

describe.only('MetricHandler', () => {
  let metricHandler;
  beforeEach(() => {
    metricHandler = new MetricHandler($gf);
    metricHandler.setDataList(datas);
    metricHandler.change();
  });
  test.skip('Should be equals', () => {
    // expect(metricHandler.dataList).toMatchSnapshot();
    expect(metricHandler.getMetrics().length).toBe(1);
    expect(metricHandler.isTypeOf('serie')).toBeTruthy();
  });
});
