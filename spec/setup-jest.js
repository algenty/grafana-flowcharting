// setup-jest.js
const lodash = require('lodash');
global._ = lodash;

const $ = require('jquery');
global.$ = $;

import angular from 'angular';
global.angular = angular;

import grafana from '../src/grafana_func';
global.grafana = grafana;

jest.mock('grafana/app/core/utils/kbn');
jest.mock('grafana/app/core/time_series2');
jest.mock('grafana/app/plugins/sdk');
