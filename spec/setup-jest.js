// setup-jest.js
const lodash = require('lodash');
global._ = lodash;

const $ = require('jquery');
global.$ = $;

// import * as moment from 'moment';
// global.moment = moment;

import angular from 'angular';
global.angular = angular;

// import GFP from '../src/plugin';
// global.GFP = GFP;
