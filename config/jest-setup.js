// setup-jest.js
// import 'babel-polyfill';
require('regenerator-runtime/runtime');
import lodash from 'lodash';
global._ = lodash;

// import u from "../src/utils";
// global.u = u;

import $ from 'jquery';
global.$ = $;

import grafana from '../src/grafana_func';
global.grafana = grafana;

// import * as moment from "moment";
// global.moment = moment;

import angular from 'angular';
global.angular = angular;

// import FlowChartingPlugin from "../src/plugin";
// GFP = FlowChartingPlugin.init($scope, templateSrv);
// global.GF_PLUGIN = GFP;
