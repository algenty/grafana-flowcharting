// setup-jest.js

import lodash from 'lodash';
global._ = lodash;

import u from "../src/utils";
global.u = u;

import $ from "jquery";
global.$ = $;

import * as moment from "moment";
global.moment = moment;

global.logDisplay = false;
global.logLevel = 2;