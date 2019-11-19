// setup-jest.js

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

import GFP from "../src/plugin";
GFP.dirname = '/public/plugins/agenty-flowcharting-panel/';
GFP.mxBasePath = `${GFP.dirname}libs/mxgraph/javascript/dist/`;
GFP.mxImagePath = `${GFP.mxBasePath}images/`;
GFP.partialPath = `${GFP.dirname}/partials/`;
global.GFP = GFP;
