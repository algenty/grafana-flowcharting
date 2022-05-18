// setup-jest.js
// import fetchMock from 'jest-fetch-mock';
// fetchMock.enableMocks();

const lodash = require('lodash');
global._ = lodash;

global.$ = require('jquery');

import angular from 'angular';
global.angular = angular;

import grafana from '../src/grafana_func';
global.grafana = grafana;

jest.mock('grafana/app/core/utils/kbn');
jest.mock('grafana/app/core/time_series2');
jest.mock('grafana/app/plugins/sdk');
