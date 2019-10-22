
// setup-jest.js
// import 'babel-polyfill';
import lodash from 'lodash';
global._ = lodash;

import u from "../src/utils";
global.u = u;

import $ from "jquery";
global.$ = $;

import * as moment from "moment";
global.moment = moment;

import angular from "angular";
global.angular = angular;

import GF_PLUGIN from "../src/plugin";
GF_PLUGIN.dirname = '/public/plugins/agenty-flowcharting-panel/';
GF_PLUGIN.mxBasePath = `${GF_PLUGIN.dirname}libs/mxgraph/javascript/dist/`;
GF_PLUGIN.mxImagePath = `${GF_PLUGIN.mxBasePath}images/`;
GF_PLUGIN.partialPath = `${GF_PLUGIN.dirname}/partials/`;
global.GF_PLUGIN = GF_PLUGIN;
