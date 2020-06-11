define(["@grafana/data","app/core/app_events","app/core/time_series2","app/core/utils/kbn","app/plugins/sdk","lodash"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_time_series2__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/chartist/dist/chartist.js":
/*!*************************************************!*\
  !*** ../node_modules/chartist/dist/chartist.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return (root['Chartist'] = factory());
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function () {

/* Chartist.js 0.11.4
 * Copyright © 2019 Gion Kunz
 * Free to use under either the WTFPL license or the MIT license.
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
 */
/**
 * The core module of Chartist that is mainly providing static functions and higher level functions for chart modules.
 *
 * @module Chartist.Core
 */
var Chartist = {
  version: '0.11.4'
};

(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  /**
   * This object contains all namespaces used within Chartist.
   *
   * @memberof Chartist.Core
   * @type {{svg: string, xmlns: string, xhtml: string, xlink: string, ct: string}}
   */
  Chartist.namespaces = {
    svg: 'http://www.w3.org/2000/svg',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    ct: 'http://gionkunz.github.com/chartist-js/ct'
  };

  /**
   * Helps to simplify functional style code
   *
   * @memberof Chartist.Core
   * @param {*} n This exact value will be returned by the noop function
   * @return {*} The same value that was provided to the n parameter
   */
  Chartist.noop = function (n) {
    return n;
  };

  /**
   * Generates a-z from a number 0 to 26
   *
   * @memberof Chartist.Core
   * @param {Number} n A number from 0 to 26 that will result in a letter a-z
   * @return {String} A character from a-z based on the input number n
   */
  Chartist.alphaNumerate = function (n) {
    // Limit to a-z
    return String.fromCharCode(97 + n % 26);
  };

  /**
   * Simple recursive object extend
   *
   * @memberof Chartist.Core
   * @param {Object} target Target object where the source will be merged into
   * @param {Object...} sources This object (objects) will be merged into target and then target is returned
   * @return {Object} An object that has the same reference as target but is extended and merged with the properties of source
   */
  Chartist.extend = function (target) {
    var i, source, sourceProp;
    target = target || {};

    for (i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (var prop in source) {
        sourceProp = source[prop];
        if (typeof sourceProp === 'object' && sourceProp !== null && !(sourceProp instanceof Array)) {
          target[prop] = Chartist.extend(target[prop], sourceProp);
        } else {
          target[prop] = sourceProp;
        }
      }
    }

    return target;
  };

  /**
   * Replaces all occurrences of subStr in str with newSubStr and returns a new string.
   *
   * @memberof Chartist.Core
   * @param {String} str
   * @param {String} subStr
   * @param {String} newSubStr
   * @return {String}
   */
  Chartist.replaceAll = function(str, subStr, newSubStr) {
    return str.replace(new RegExp(subStr, 'g'), newSubStr);
  };

  /**
   * Converts a number to a string with a unit. If a string is passed then this will be returned unmodified.
   *
   * @memberof Chartist.Core
   * @param {Number} value
   * @param {String} unit
   * @return {String} Returns the passed number value with unit.
   */
  Chartist.ensureUnit = function(value, unit) {
    if(typeof value === 'number') {
      value = value + unit;
    }

    return value;
  };

  /**
   * Converts a number or string to a quantity object.
   *
   * @memberof Chartist.Core
   * @param {String|Number} input
   * @return {Object} Returns an object containing the value as number and the unit as string.
   */
  Chartist.quantity = function(input) {
    if (typeof input === 'string') {
      var match = (/^(\d+)\s*(.*)$/g).exec(input);
      return {
        value : +match[1],
        unit: match[2] || undefined
      };
    }
    return { value: input };
  };

  /**
   * This is a wrapper around document.querySelector that will return the query if it's already of type Node
   *
   * @memberof Chartist.Core
   * @param {String|Node} query The query to use for selecting a Node or a DOM node that will be returned directly
   * @return {Node}
   */
  Chartist.querySelector = function(query) {
    return query instanceof Node ? query : document.querySelector(query);
  };

  /**
   * Functional style helper to produce array with given length initialized with undefined values
   *
   * @memberof Chartist.Core
   * @param length
   * @return {Array}
   */
  Chartist.times = function(length) {
    return Array.apply(null, new Array(length));
  };

  /**
   * Sum helper to be used in reduce functions
   *
   * @memberof Chartist.Core
   * @param previous
   * @param current
   * @return {*}
   */
  Chartist.sum = function(previous, current) {
    return previous + (current ? current : 0);
  };

  /**
   * Multiply helper to be used in `Array.map` for multiplying each value of an array with a factor.
   *
   * @memberof Chartist.Core
   * @param {Number} factor
   * @returns {Function} Function that can be used in `Array.map` to multiply each value in an array
   */
  Chartist.mapMultiply = function(factor) {
    return function(num) {
      return num * factor;
    };
  };

  /**
   * Add helper to be used in `Array.map` for adding a addend to each value of an array.
   *
   * @memberof Chartist.Core
   * @param {Number} addend
   * @returns {Function} Function that can be used in `Array.map` to add a addend to each value in an array
   */
  Chartist.mapAdd = function(addend) {
    return function(num) {
      return num + addend;
    };
  };

  /**
   * Map for multi dimensional arrays where their nested arrays will be mapped in serial. The output array will have the length of the largest nested array. The callback function is called with variable arguments where each argument is the nested array value (or undefined if there are no more values).
   *
   * @memberof Chartist.Core
   * @param arr
   * @param cb
   * @return {Array}
   */
  Chartist.serialMap = function(arr, cb) {
    var result = [],
        length = Math.max.apply(null, arr.map(function(e) {
          return e.length;
        }));

    Chartist.times(length).forEach(function(e, index) {
      var args = arr.map(function(e) {
        return e[index];
      });

      result[index] = cb.apply(null, args);
    });

    return result;
  };

  /**
   * This helper function can be used to round values with certain precision level after decimal. This is used to prevent rounding errors near float point precision limit.
   *
   * @memberof Chartist.Core
   * @param {Number} value The value that should be rounded with precision
   * @param {Number} [digits] The number of digits after decimal used to do the rounding
   * @returns {number} Rounded value
   */
  Chartist.roundWithPrecision = function(value, digits) {
    var precision = Math.pow(10, digits || Chartist.precision);
    return Math.round(value * precision) / precision;
  };

  /**
   * Precision level used internally in Chartist for rounding. If you require more decimal places you can increase this number.
   *
   * @memberof Chartist.Core
   * @type {number}
   */
  Chartist.precision = 8;

  /**
   * A map with characters to escape for strings to be safely used as attribute values.
   *
   * @memberof Chartist.Core
   * @type {Object}
   */
  Chartist.escapingMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };

  /**
   * This function serializes arbitrary data to a string. In case of data that can't be easily converted to a string, this function will create a wrapper object and serialize the data using JSON.stringify. The outcoming string will always be escaped using Chartist.escapingMap.
   * If called with null or undefined the function will return immediately with null or undefined.
   *
   * @memberof Chartist.Core
   * @param {Number|String|Object} data
   * @return {String}
   */
  Chartist.serialize = function(data) {
    if(data === null || data === undefined) {
      return data;
    } else if(typeof data === 'number') {
      data = ''+data;
    } else if(typeof data === 'object') {
      data = JSON.stringify({data: data});
    }

    return Object.keys(Chartist.escapingMap).reduce(function(result, key) {
      return Chartist.replaceAll(result, key, Chartist.escapingMap[key]);
    }, data);
  };

  /**
   * This function de-serializes a string previously serialized with Chartist.serialize. The string will always be unescaped using Chartist.escapingMap before it's returned. Based on the input value the return type can be Number, String or Object. JSON.parse is used with try / catch to see if the unescaped string can be parsed into an Object and this Object will be returned on success.
   *
   * @memberof Chartist.Core
   * @param {String} data
   * @return {String|Number|Object}
   */
  Chartist.deserialize = function(data) {
    if(typeof data !== 'string') {
      return data;
    }

    data = Object.keys(Chartist.escapingMap).reduce(function(result, key) {
      return Chartist.replaceAll(result, Chartist.escapingMap[key], key);
    }, data);

    try {
      data = JSON.parse(data);
      data = data.data !== undefined ? data.data : data;
    } catch(e) {}

    return data;
  };

  /**
   * Create or reinitialize the SVG element for the chart
   *
   * @memberof Chartist.Core
   * @param {Node} container The containing DOM Node object that will be used to plant the SVG element
   * @param {String} width Set the width of the SVG element. Default is 100%
   * @param {String} height Set the height of the SVG element. Default is 100%
   * @param {String} className Specify a class to be added to the SVG element
   * @return {Object} The created/reinitialized SVG element
   */
  Chartist.createSvg = function (container, width, height, className) {
    var svg;

    width = width || '100%';
    height = height || '100%';

    // Check if there is a previous SVG element in the container that contains the Chartist XML namespace and remove it
    // Since the DOM API does not support namespaces we need to manually search the returned list http://www.w3.org/TR/selectors-api/
    Array.prototype.slice.call(container.querySelectorAll('svg')).filter(function filterChartistSvgObjects(svg) {
      return svg.getAttributeNS(Chartist.namespaces.xmlns, 'ct');
    }).forEach(function removePreviousElement(svg) {
      container.removeChild(svg);
    });

    // Create svg object with width and height or use 100% as default
    svg = new Chartist.Svg('svg').attr({
      width: width,
      height: height
    }).addClass(className);

    svg._node.style.width = width;
    svg._node.style.height = height;

    // Add the DOM node to our container
    container.appendChild(svg._node);

    return svg;
  };

  /**
   * Ensures that the data object passed as second argument to the charts is present and correctly initialized.
   *
   * @param  {Object} data The data object that is passed as second argument to the charts
   * @return {Object} The normalized data object
   */
  Chartist.normalizeData = function(data, reverse, multi) {
    var labelCount;
    var output = {
      raw: data,
      normalized: {}
    };

    // Check if we should generate some labels based on existing series data
    output.normalized.series = Chartist.getDataArray({
      series: data.series || []
    }, reverse, multi);

    // If all elements of the normalized data array are arrays we're dealing with
    // multi series data and we need to find the largest series if they are un-even
    if (output.normalized.series.every(function(value) {
        return value instanceof Array;
      })) {
      // Getting the series with the the most elements
      labelCount = Math.max.apply(null, output.normalized.series.map(function(series) {
        return series.length;
      }));
    } else {
      // We're dealing with Pie data so we just take the normalized array length
      labelCount = output.normalized.series.length;
    }

    output.normalized.labels = (data.labels || []).slice();
    // Padding the labels to labelCount with empty strings
    Array.prototype.push.apply(
      output.normalized.labels,
      Chartist.times(Math.max(0, labelCount - output.normalized.labels.length)).map(function() {
        return '';
      })
    );

    if(reverse) {
      Chartist.reverseData(output.normalized);
    }

    return output;
  };

  /**
   * This function safely checks if an objects has an owned property.
   *
   * @param {Object} object The object where to check for a property
   * @param {string} property The property name
   * @returns {boolean} Returns true if the object owns the specified property
   */
  Chartist.safeHasProperty = function(object, property) {
    return object !== null &&
      typeof object === 'object' &&
      object.hasOwnProperty(property);
  };

  /**
   * Checks if a value is considered a hole in the data series.
   *
   * @param {*} value
   * @returns {boolean} True if the value is considered a data hole
   */
  Chartist.isDataHoleValue = function(value) {
    return value === null ||
      value === undefined ||
      (typeof value === 'number' && isNaN(value));
  };

  /**
   * Reverses the series, labels and series data arrays.
   *
   * @memberof Chartist.Core
   * @param data
   */
  Chartist.reverseData = function(data) {
    data.labels.reverse();
    data.series.reverse();
    for (var i = 0; i < data.series.length; i++) {
      if(typeof(data.series[i]) === 'object' && data.series[i].data !== undefined) {
        data.series[i].data.reverse();
      } else if(data.series[i] instanceof Array) {
        data.series[i].reverse();
      }
    }
  };

  /**
   * Convert data series into plain array
   *
   * @memberof Chartist.Core
   * @param {Object} data The series object that contains the data to be visualized in the chart
   * @param {Boolean} [reverse] If true the whole data is reversed by the getDataArray call. This will modify the data object passed as first parameter. The labels as well as the series order is reversed. The whole series data arrays are reversed too.
   * @param {Boolean} [multi] Create a multi dimensional array from a series data array where a value object with `x` and `y` values will be created.
   * @return {Array} A plain array that contains the data to be visualized in the chart
   */
  Chartist.getDataArray = function(data, reverse, multi) {
    // Recursively walks through nested arrays and convert string values to numbers and objects with value properties
    // to values. Check the tests in data core -> data normalization for a detailed specification of expected values
    function recursiveConvert(value) {
      if(Chartist.safeHasProperty(value, 'value')) {
        // We are dealing with value object notation so we need to recurse on value property
        return recursiveConvert(value.value);
      } else if(Chartist.safeHasProperty(value, 'data')) {
        // We are dealing with series object notation so we need to recurse on data property
        return recursiveConvert(value.data);
      } else if(value instanceof Array) {
        // Data is of type array so we need to recurse on the series
        return value.map(recursiveConvert);
      } else if(Chartist.isDataHoleValue(value)) {
        // We're dealing with a hole in the data and therefore need to return undefined
        // We're also returning undefined for multi value output
        return undefined;
      } else {
        // We need to prepare multi value output (x and y data)
        if(multi) {
          var multiValue = {};

          // Single series value arrays are assumed to specify the Y-Axis value
          // For example: [1, 2] => [{x: undefined, y: 1}, {x: undefined, y: 2}]
          // If multi is a string then it's assumed that it specified which dimension should be filled as default
          if(typeof multi === 'string') {
            multiValue[multi] = Chartist.getNumberOrUndefined(value);
          } else {
            multiValue.y = Chartist.getNumberOrUndefined(value);
          }

          multiValue.x = value.hasOwnProperty('x') ? Chartist.getNumberOrUndefined(value.x) : multiValue.x;
          multiValue.y = value.hasOwnProperty('y') ? Chartist.getNumberOrUndefined(value.y) : multiValue.y;

          return multiValue;

        } else {
          // We can return simple data
          return Chartist.getNumberOrUndefined(value);
        }
      }
    }

    return data.series.map(recursiveConvert);
  };

  /**
   * Converts a number into a padding object.
   *
   * @memberof Chartist.Core
   * @param {Object|Number} padding
   * @param {Number} [fallback] This value is used to fill missing values if a incomplete padding object was passed
   * @returns {Object} Returns a padding object containing top, right, bottom, left properties filled with the padding number passed in as argument. If the argument is something else than a number (presumably already a correct padding object) then this argument is directly returned.
   */
  Chartist.normalizePadding = function(padding, fallback) {
    fallback = fallback || 0;

    return typeof padding === 'number' ? {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    } : {
      top: typeof padding.top === 'number' ? padding.top : fallback,
      right: typeof padding.right === 'number' ? padding.right : fallback,
      bottom: typeof padding.bottom === 'number' ? padding.bottom : fallback,
      left: typeof padding.left === 'number' ? padding.left : fallback
    };
  };

  Chartist.getMetaData = function(series, index) {
    var value = series.data ? series.data[index] : series[index];
    return value ? value.meta : undefined;
  };

  /**
   * Calculate the order of magnitude for the chart scale
   *
   * @memberof Chartist.Core
   * @param {Number} value The value Range of the chart
   * @return {Number} The order of magnitude
   */
  Chartist.orderOfMagnitude = function (value) {
    return Math.floor(Math.log(Math.abs(value)) / Math.LN10);
  };

  /**
   * Project a data length into screen coordinates (pixels)
   *
   * @memberof Chartist.Core
   * @param {Object} axisLength The svg element for the chart
   * @param {Number} length Single data value from a series array
   * @param {Object} bounds All the values to set the bounds of the chart
   * @return {Number} The projected data length in pixels
   */
  Chartist.projectLength = function (axisLength, length, bounds) {
    return length / bounds.range * axisLength;
  };

  /**
   * Get the height of the area in the chart for the data series
   *
   * @memberof Chartist.Core
   * @param {Object} svg The svg element for the chart
   * @param {Object} options The Object that contains all the optional values for the chart
   * @return {Number} The height of the area in the chart for the data series
   */
  Chartist.getAvailableHeight = function (svg, options) {
    return Math.max((Chartist.quantity(options.height).value || svg.height()) - (options.chartPadding.top +  options.chartPadding.bottom) - options.axisX.offset, 0);
  };

  /**
   * Get highest and lowest value of data array. This Array contains the data that will be visualized in the chart.
   *
   * @memberof Chartist.Core
   * @param {Array} data The array that contains the data to be visualized in the chart
   * @param {Object} options The Object that contains the chart options
   * @param {String} dimension Axis dimension 'x' or 'y' used to access the correct value and high / low configuration
   * @return {Object} An object that contains the highest and lowest value that will be visualized on the chart.
   */
  Chartist.getHighLow = function (data, options, dimension) {
    // TODO: Remove workaround for deprecated global high / low config. Axis high / low configuration is preferred
    options = Chartist.extend({}, options, dimension ? options['axis' + dimension.toUpperCase()] : {});

    var highLow = {
        high: options.high === undefined ? -Number.MAX_VALUE : +options.high,
        low: options.low === undefined ? Number.MAX_VALUE : +options.low
      };
    var findHigh = options.high === undefined;
    var findLow = options.low === undefined;

    // Function to recursively walk through arrays and find highest and lowest number
    function recursiveHighLow(data) {
      if(data === undefined) {
        return undefined;
      } else if(data instanceof Array) {
        for (var i = 0; i < data.length; i++) {
          recursiveHighLow(data[i]);
        }
      } else {
        var value = dimension ? +data[dimension] : +data;

        if (findHigh && value > highLow.high) {
          highLow.high = value;
        }

        if (findLow && value < highLow.low) {
          highLow.low = value;
        }
      }
    }

    // Start to find highest and lowest number recursively
    if(findHigh || findLow) {
      recursiveHighLow(data);
    }

    // Overrides of high / low based on reference value, it will make sure that the invisible reference value is
    // used to generate the chart. This is useful when the chart always needs to contain the position of the
    // invisible reference value in the view i.e. for bipolar scales.
    if (options.referenceValue || options.referenceValue === 0) {
      highLow.high = Math.max(options.referenceValue, highLow.high);
      highLow.low = Math.min(options.referenceValue, highLow.low);
    }

    // If high and low are the same because of misconfiguration or flat data (only the same value) we need
    // to set the high or low to 0 depending on the polarity
    if (highLow.high <= highLow.low) {
      // If both values are 0 we set high to 1
      if (highLow.low === 0) {
        highLow.high = 1;
      } else if (highLow.low < 0) {
        // If we have the same negative value for the bounds we set bounds.high to 0
        highLow.high = 0;
      } else if (highLow.high > 0) {
        // If we have the same positive value for the bounds we set bounds.low to 0
        highLow.low = 0;
      } else {
        // If data array was empty, values are Number.MAX_VALUE and -Number.MAX_VALUE. Set bounds to prevent errors
        highLow.high = 1;
        highLow.low = 0;
      }
    }

    return highLow;
  };

  /**
   * Checks if a value can be safely coerced to a number. This includes all values except null which result in finite numbers when coerced. This excludes NaN, since it's not finite.
   *
   * @memberof Chartist.Core
   * @param value
   * @returns {Boolean}
   */
  Chartist.isNumeric = function(value) {
    return value === null ? false : isFinite(value);
  };

  /**
   * Returns true on all falsey values except the numeric value 0.
   *
   * @memberof Chartist.Core
   * @param value
   * @returns {boolean}
   */
  Chartist.isFalseyButZero = function(value) {
    return !value && value !== 0;
  };

  /**
   * Returns a number if the passed parameter is a valid number or the function will return undefined. On all other values than a valid number, this function will return undefined.
   *
   * @memberof Chartist.Core
   * @param value
   * @returns {*}
   */
  Chartist.getNumberOrUndefined = function(value) {
    return Chartist.isNumeric(value) ? +value : undefined;
  };

  /**
   * Checks if provided value object is multi value (contains x or y properties)
   *
   * @memberof Chartist.Core
   * @param value
   */
  Chartist.isMultiValue = function(value) {
    return typeof value === 'object' && ('x' in value || 'y' in value);
  };

  /**
   * Gets a value from a dimension `value.x` or `value.y` while returning value directly if it's a valid numeric value. If the value is not numeric and it's falsey this function will return `defaultValue`.
   *
   * @memberof Chartist.Core
   * @param value
   * @param dimension
   * @param defaultValue
   * @returns {*}
   */
  Chartist.getMultiValue = function(value, dimension) {
    if(Chartist.isMultiValue(value)) {
      return Chartist.getNumberOrUndefined(value[dimension || 'y']);
    } else {
      return Chartist.getNumberOrUndefined(value);
    }
  };

  /**
   * Pollard Rho Algorithm to find smallest factor of an integer value. There are more efficient algorithms for factorization, but this one is quite efficient and not so complex.
   *
   * @memberof Chartist.Core
   * @param {Number} num An integer number where the smallest factor should be searched for
   * @returns {Number} The smallest integer factor of the parameter num.
   */
  Chartist.rho = function(num) {
    if(num === 1) {
      return num;
    }

    function gcd(p, q) {
      if (p % q === 0) {
        return q;
      } else {
        return gcd(q, p % q);
      }
    }

    function f(x) {
      return x * x + 1;
    }

    var x1 = 2, x2 = 2, divisor;
    if (num % 2 === 0) {
      return 2;
    }

    do {
      x1 = f(x1) % num;
      x2 = f(f(x2)) % num;
      divisor = gcd(Math.abs(x1 - x2), num);
    } while (divisor === 1);

    return divisor;
  };

  /**
   * Calculate and retrieve all the bounds for the chart and return them in one array
   *
   * @memberof Chartist.Core
   * @param {Number} axisLength The length of the Axis used for
   * @param {Object} highLow An object containing a high and low property indicating the value range of the chart.
   * @param {Number} scaleMinSpace The minimum projected length a step should result in
   * @param {Boolean} onlyInteger
   * @return {Object} All the values to set the bounds of the chart
   */
  Chartist.getBounds = function (axisLength, highLow, scaleMinSpace, onlyInteger) {
    var i,
      optimizationCounter = 0,
      newMin,
      newMax,
      bounds = {
        high: highLow.high,
        low: highLow.low
      };

    bounds.valueRange = bounds.high - bounds.low;
    bounds.oom = Chartist.orderOfMagnitude(bounds.valueRange);
    bounds.step = Math.pow(10, bounds.oom);
    bounds.min = Math.floor(bounds.low / bounds.step) * bounds.step;
    bounds.max = Math.ceil(bounds.high / bounds.step) * bounds.step;
    bounds.range = bounds.max - bounds.min;
    bounds.numberOfSteps = Math.round(bounds.range / bounds.step);

    // Optimize scale step by checking if subdivision is possible based on horizontalGridMinSpace
    // If we are already below the scaleMinSpace value we will scale up
    var length = Chartist.projectLength(axisLength, bounds.step, bounds);
    var scaleUp = length < scaleMinSpace;
    var smallestFactor = onlyInteger ? Chartist.rho(bounds.range) : 0;

    // First check if we should only use integer steps and if step 1 is still larger than scaleMinSpace so we can use 1
    if(onlyInteger && Chartist.projectLength(axisLength, 1, bounds) >= scaleMinSpace) {
      bounds.step = 1;
    } else if(onlyInteger && smallestFactor < bounds.step && Chartist.projectLength(axisLength, smallestFactor, bounds) >= scaleMinSpace) {
      // If step 1 was too small, we can try the smallest factor of range
      // If the smallest factor is smaller than the current bounds.step and the projected length of smallest factor
      // is larger than the scaleMinSpace we should go for it.
      bounds.step = smallestFactor;
    } else {
      // Trying to divide or multiply by 2 and find the best step value
      while (true) {
        if (scaleUp && Chartist.projectLength(axisLength, bounds.step, bounds) <= scaleMinSpace) {
          bounds.step *= 2;
        } else if (!scaleUp && Chartist.projectLength(axisLength, bounds.step / 2, bounds) >= scaleMinSpace) {
          bounds.step /= 2;
          if(onlyInteger && bounds.step % 1 !== 0) {
            bounds.step *= 2;
            break;
          }
        } else {
          break;
        }

        if(optimizationCounter++ > 1000) {
          throw new Error('Exceeded maximum number of iterations while optimizing scale step!');
        }
      }
    }

    var EPSILON = 2.221E-16;
    bounds.step = Math.max(bounds.step, EPSILON);
    function safeIncrement(value, increment) {
      // If increment is too small use *= (1+EPSILON) as a simple nextafter
      if (value === (value += increment)) {
      	value *= (1 + (increment > 0 ? EPSILON : -EPSILON));
      }
      return value;
    }

    // Narrow min and max based on new step
    newMin = bounds.min;
    newMax = bounds.max;
    while (newMin + bounds.step <= bounds.low) {
    	newMin = safeIncrement(newMin, bounds.step);
    }
    while (newMax - bounds.step >= bounds.high) {
    	newMax = safeIncrement(newMax, -bounds.step);
    }
    bounds.min = newMin;
    bounds.max = newMax;
    bounds.range = bounds.max - bounds.min;

    var values = [];
    for (i = bounds.min; i <= bounds.max; i = safeIncrement(i, bounds.step)) {
      var value = Chartist.roundWithPrecision(i);
      if (value !== values[values.length - 1]) {
        values.push(value);
      }
    }
    bounds.values = values;
    return bounds;
  };

  /**
   * Calculate cartesian coordinates of polar coordinates
   *
   * @memberof Chartist.Core
   * @param {Number} centerX X-axis coordinates of center point of circle segment
   * @param {Number} centerY X-axis coordinates of center point of circle segment
   * @param {Number} radius Radius of circle segment
   * @param {Number} angleInDegrees Angle of circle segment in degrees
   * @return {{x:Number, y:Number}} Coordinates of point on circumference
   */
  Chartist.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  /**
   * Initialize chart drawing rectangle (area where chart is drawn) x1,y1 = bottom left / x2,y2 = top right
   *
   * @memberof Chartist.Core
   * @param {Object} svg The svg element for the chart
   * @param {Object} options The Object that contains all the optional values for the chart
   * @param {Number} [fallbackPadding] The fallback padding if partial padding objects are used
   * @return {Object} The chart rectangles coordinates inside the svg element plus the rectangles measurements
   */
  Chartist.createChartRect = function (svg, options, fallbackPadding) {
    var hasAxis = !!(options.axisX || options.axisY);
    var yAxisOffset = hasAxis ? options.axisY.offset : 0;
    var xAxisOffset = hasAxis ? options.axisX.offset : 0;
    // If width or height results in invalid value (including 0) we fallback to the unitless settings or even 0
    var width = svg.width() || Chartist.quantity(options.width).value || 0;
    var height = svg.height() || Chartist.quantity(options.height).value || 0;
    var normalizedPadding = Chartist.normalizePadding(options.chartPadding, fallbackPadding);

    // If settings were to small to cope with offset (legacy) and padding, we'll adjust
    width = Math.max(width, yAxisOffset + normalizedPadding.left + normalizedPadding.right);
    height = Math.max(height, xAxisOffset + normalizedPadding.top + normalizedPadding.bottom);

    var chartRect = {
      padding: normalizedPadding,
      width: function () {
        return this.x2 - this.x1;
      },
      height: function () {
        return this.y1 - this.y2;
      }
    };

    if(hasAxis) {
      if (options.axisX.position === 'start') {
        chartRect.y2 = normalizedPadding.top + xAxisOffset;
        chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
      } else {
        chartRect.y2 = normalizedPadding.top;
        chartRect.y1 = Math.max(height - normalizedPadding.bottom - xAxisOffset, chartRect.y2 + 1);
      }

      if (options.axisY.position === 'start') {
        chartRect.x1 = normalizedPadding.left + yAxisOffset;
        chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
      } else {
        chartRect.x1 = normalizedPadding.left;
        chartRect.x2 = Math.max(width - normalizedPadding.right - yAxisOffset, chartRect.x1 + 1);
      }
    } else {
      chartRect.x1 = normalizedPadding.left;
      chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
      chartRect.y2 = normalizedPadding.top;
      chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
    }

    return chartRect;
  };

  /**
   * Creates a grid line based on a projected value.
   *
   * @memberof Chartist.Core
   * @param position
   * @param index
   * @param axis
   * @param offset
   * @param length
   * @param group
   * @param classes
   * @param eventEmitter
   */
  Chartist.createGrid = function(position, index, axis, offset, length, group, classes, eventEmitter) {
    var positionalData = {};
    positionalData[axis.units.pos + '1'] = position;
    positionalData[axis.units.pos + '2'] = position;
    positionalData[axis.counterUnits.pos + '1'] = offset;
    positionalData[axis.counterUnits.pos + '2'] = offset + length;

    var gridElement = group.elem('line', positionalData, classes.join(' '));

    // Event for grid draw
    eventEmitter.emit('draw',
      Chartist.extend({
        type: 'grid',
        axis: axis,
        index: index,
        group: group,
        element: gridElement
      }, positionalData)
    );
  };

  /**
   * Creates a grid background rect and emits the draw event.
   *
   * @memberof Chartist.Core
   * @param gridGroup
   * @param chartRect
   * @param className
   * @param eventEmitter
   */
  Chartist.createGridBackground = function (gridGroup, chartRect, className, eventEmitter) {
    var gridBackground = gridGroup.elem('rect', {
        x: chartRect.x1,
        y: chartRect.y2,
        width: chartRect.width(),
        height: chartRect.height(),
      }, className, true);

      // Event for grid background draw
      eventEmitter.emit('draw', {
        type: 'gridBackground',
        group: gridGroup,
        element: gridBackground
      });
  };

  /**
   * Creates a label based on a projected value and an axis.
   *
   * @memberof Chartist.Core
   * @param position
   * @param length
   * @param index
   * @param labels
   * @param axis
   * @param axisOffset
   * @param labelOffset
   * @param group
   * @param classes
   * @param useForeignObject
   * @param eventEmitter
   */
  Chartist.createLabel = function(position, length, index, labels, axis, axisOffset, labelOffset, group, classes, useForeignObject, eventEmitter) {
    var labelElement;
    var positionalData = {};

    positionalData[axis.units.pos] = position + labelOffset[axis.units.pos];
    positionalData[axis.counterUnits.pos] = labelOffset[axis.counterUnits.pos];
    positionalData[axis.units.len] = length;
    positionalData[axis.counterUnits.len] = Math.max(0, axisOffset - 10);

    if(useForeignObject) {
      // We need to set width and height explicitly to px as span will not expand with width and height being
      // 100% in all browsers
      var content = document.createElement('span');
      content.className = classes.join(' ');
      content.setAttribute('xmlns', Chartist.namespaces.xhtml);
      content.innerText = labels[index];
      content.style[axis.units.len] = Math.round(positionalData[axis.units.len]) + 'px';
      content.style[axis.counterUnits.len] = Math.round(positionalData[axis.counterUnits.len]) + 'px';

      labelElement = group.foreignObject(content, Chartist.extend({
        style: 'overflow: visible;'
      }, positionalData));
    } else {
      labelElement = group.elem('text', positionalData, classes.join(' ')).text(labels[index]);
    }

    eventEmitter.emit('draw', Chartist.extend({
      type: 'label',
      axis: axis,
      index: index,
      group: group,
      element: labelElement,
      text: labels[index]
    }, positionalData));
  };

  /**
   * Helper to read series specific options from options object. It automatically falls back to the global option if
   * there is no option in the series options.
   *
   * @param {Object} series Series object
   * @param {Object} options Chartist options object
   * @param {string} key The options key that should be used to obtain the options
   * @returns {*}
   */
  Chartist.getSeriesOption = function(series, options, key) {
    if(series.name && options.series && options.series[series.name]) {
      var seriesOptions = options.series[series.name];
      return seriesOptions.hasOwnProperty(key) ? seriesOptions[key] : options[key];
    } else {
      return options[key];
    }
  };

  /**
   * Provides options handling functionality with callback for options changes triggered by responsive options and media query matches
   *
   * @memberof Chartist.Core
   * @param {Object} options Options set by user
   * @param {Array} responsiveOptions Optional functions to add responsive behavior to chart
   * @param {Object} eventEmitter The event emitter that will be used to emit the options changed events
   * @return {Object} The consolidated options object from the defaults, base and matching responsive options
   */
  Chartist.optionsProvider = function (options, responsiveOptions, eventEmitter) {
    var baseOptions = Chartist.extend({}, options),
      currentOptions,
      mediaQueryListeners = [],
      i;

    function updateCurrentOptions(mediaEvent) {
      var previousOptions = currentOptions;
      currentOptions = Chartist.extend({}, baseOptions);

      if (responsiveOptions) {
        for (i = 0; i < responsiveOptions.length; i++) {
          var mql = window.matchMedia(responsiveOptions[i][0]);
          if (mql.matches) {
            currentOptions = Chartist.extend(currentOptions, responsiveOptions[i][1]);
          }
        }
      }

      if(eventEmitter && mediaEvent) {
        eventEmitter.emit('optionsChanged', {
          previousOptions: previousOptions,
          currentOptions: currentOptions
        });
      }
    }

    function removeMediaQueryListeners() {
      mediaQueryListeners.forEach(function(mql) {
        mql.removeListener(updateCurrentOptions);
      });
    }

    if (!window.matchMedia) {
      throw 'window.matchMedia not found! Make sure you\'re using a polyfill.';
    } else if (responsiveOptions) {

      for (i = 0; i < responsiveOptions.length; i++) {
        var mql = window.matchMedia(responsiveOptions[i][0]);
        mql.addListener(updateCurrentOptions);
        mediaQueryListeners.push(mql);
      }
    }
    // Execute initially without an event argument so we get the correct options
    updateCurrentOptions();

    return {
      removeMediaQueryListeners: removeMediaQueryListeners,
      getCurrentOptions: function getCurrentOptions() {
        return Chartist.extend({}, currentOptions);
      }
    };
  };


  /**
   * Splits a list of coordinates and associated values into segments. Each returned segment contains a pathCoordinates
   * valueData property describing the segment.
   *
   * With the default options, segments consist of contiguous sets of points that do not have an undefined value. Any
   * points with undefined values are discarded.
   *
   * **Options**
   * The following options are used to determine how segments are formed
   * ```javascript
   * var options = {
   *   // If fillHoles is true, undefined values are simply discarded without creating a new segment. Assuming other options are default, this returns single segment.
   *   fillHoles: false,
   *   // If increasingX is true, the coordinates in all segments have strictly increasing x-values.
   *   increasingX: false
   * };
   * ```
   *
   * @memberof Chartist.Core
   * @param {Array} pathCoordinates List of point coordinates to be split in the form [x1, y1, x2, y2 ... xn, yn]
   * @param {Array} values List of associated point values in the form [v1, v2 .. vn]
   * @param {Object} options Options set by user
   * @return {Array} List of segments, each containing a pathCoordinates and valueData property.
   */
  Chartist.splitIntoSegments = function(pathCoordinates, valueData, options) {
    var defaultOptions = {
      increasingX: false,
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    var segments = [];
    var hole = true;

    for(var i = 0; i < pathCoordinates.length; i += 2) {
      // If this value is a "hole" we set the hole flag
      if(Chartist.getMultiValue(valueData[i / 2].value) === undefined) {
      // if(valueData[i / 2].value === undefined) {
        if(!options.fillHoles) {
          hole = true;
        }
      } else {
        if(options.increasingX && i >= 2 && pathCoordinates[i] <= pathCoordinates[i-2]) {
          // X is not increasing, so we need to make sure we start a new segment
          hole = true;
        }


        // If it's a valid value we need to check if we're coming out of a hole and create a new empty segment
        if(hole) {
          segments.push({
            pathCoordinates: [],
            valueData: []
          });
          // As we have a valid value now, we are not in a "hole" anymore
          hole = false;
        }

        // Add to the segment pathCoordinates and valueData
        segments[segments.length - 1].pathCoordinates.push(pathCoordinates[i], pathCoordinates[i + 1]);
        segments[segments.length - 1].valueData.push(valueData[i / 2]);
      }
    }

    return segments;
  };
}(this || global, Chartist));
;/**
 * Chartist path interpolation functions.
 *
 * @module Chartist.Interpolation
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  Chartist.Interpolation = {};

  /**
   * This interpolation function does not smooth the path and the result is only containing lines and no curves.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.none({
   *     fillHoles: false
   *   })
   * });
   *
   *
   * @memberof Chartist.Interpolation
   * @return {Function}
   */
  Chartist.Interpolation.none = function(options) {
    var defaultOptions = {
      fillHoles: false
    };
    options = Chartist.extend({}, defaultOptions, options);
    return function none(pathCoordinates, valueData) {
      var path = new Chartist.Svg.Path();
      var hole = true;

      for(var i = 0; i < pathCoordinates.length; i += 2) {
        var currX = pathCoordinates[i];
        var currY = pathCoordinates[i + 1];
        var currData = valueData[i / 2];

        if(Chartist.getMultiValue(currData.value) !== undefined) {

          if(hole) {
            path.move(currX, currY, false, currData);
          } else {
            path.line(currX, currY, false, currData);
          }

          hole = false;
        } else if(!options.fillHoles) {
          hole = true;
        }
      }

      return path;
    };
  };

  /**
   * Simple smoothing creates horizontal handles that are positioned with a fraction of the length between two data points. You can use the divisor option to specify the amount of smoothing.
   *
   * Simple smoothing can be used instead of `Chartist.Smoothing.cardinal` if you'd like to get rid of the artifacts it produces sometimes. Simple smoothing produces less flowing lines but is accurate by hitting the points and it also doesn't swing below or above the given data point.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The simple interpolation function accepts one configuration parameter `divisor`, between 1 and ∞, which controls the smoothing characteristics.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.simple({
   *     divisor: 2,
   *     fillHoles: false
   *   })
   * });
   *
   *
   * @memberof Chartist.Interpolation
   * @param {Object} options The options of the simple interpolation factory function.
   * @return {Function}
   */
  Chartist.Interpolation.simple = function(options) {
    var defaultOptions = {
      divisor: 2,
      fillHoles: false
    };
    options = Chartist.extend({}, defaultOptions, options);

    var d = 1 / Math.max(1, options.divisor);

    return function simple(pathCoordinates, valueData) {
      var path = new Chartist.Svg.Path();
      var prevX, prevY, prevData;

      for(var i = 0; i < pathCoordinates.length; i += 2) {
        var currX = pathCoordinates[i];
        var currY = pathCoordinates[i + 1];
        var length = (currX - prevX) * d;
        var currData = valueData[i / 2];

        if(currData.value !== undefined) {

          if(prevData === undefined) {
            path.move(currX, currY, false, currData);
          } else {
            path.curve(
              prevX + length,
              prevY,
              currX - length,
              currY,
              currX,
              currY,
              false,
              currData
            );
          }

          prevX = currX;
          prevY = currY;
          prevData = currData;
        } else if(!options.fillHoles) {
          prevX = currX = prevData = undefined;
        }
      }

      return path;
    };
  };

  /**
   * Cardinal / Catmull-Rome spline interpolation is the default smoothing function in Chartist. It produces nice results where the splines will always meet the points. It produces some artifacts though when data values are increased or decreased rapidly. The line may not follow a very accurate path and if the line should be accurate this smoothing function does not produce the best results.
   *
   * Cardinal splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The cardinal interpolation function accepts one configuration parameter `tension`, between 0 and 1, which controls the smoothing intensity.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.cardinal({
   *     tension: 1,
   *     fillHoles: false
   *   })
   * });
   *
   * @memberof Chartist.Interpolation
   * @param {Object} options The options of the cardinal factory function.
   * @return {Function}
   */
  Chartist.Interpolation.cardinal = function(options) {
    var defaultOptions = {
      tension: 1,
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    var t = Math.min(1, Math.max(0, options.tension)),
      c = 1 - t;

    return function cardinal(pathCoordinates, valueData) {
      // First we try to split the coordinates into segments
      // This is necessary to treat "holes" in line charts
      var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
        fillHoles: options.fillHoles
      });

      if(!segments.length) {
        // If there were no segments return 'Chartist.Interpolation.none'
        return Chartist.Interpolation.none()([]);
      } else if(segments.length > 1) {
        // If the split resulted in more that one segment we need to interpolate each segment individually and join them
        // afterwards together into a single path.
          var paths = [];
        // For each segment we will recurse the cardinal function
        segments.forEach(function(segment) {
          paths.push(cardinal(segment.pathCoordinates, segment.valueData));
        });
        // Join the segment path data into a single path and return
        return Chartist.Svg.Path.join(paths);
      } else {
        // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
        // segment
        pathCoordinates = segments[0].pathCoordinates;
        valueData = segments[0].valueData;

        // If less than two points we need to fallback to no smoothing
        if(pathCoordinates.length <= 4) {
          return Chartist.Interpolation.none()(pathCoordinates, valueData);
        }

        var path = new Chartist.Svg.Path().move(pathCoordinates[0], pathCoordinates[1], false, valueData[0]),
          z;

        for (var i = 0, iLen = pathCoordinates.length; iLen - 2 * !z > i; i += 2) {
          var p = [
            {x: +pathCoordinates[i - 2], y: +pathCoordinates[i - 1]},
            {x: +pathCoordinates[i], y: +pathCoordinates[i + 1]},
            {x: +pathCoordinates[i + 2], y: +pathCoordinates[i + 3]},
            {x: +pathCoordinates[i + 4], y: +pathCoordinates[i + 5]}
          ];
          if (z) {
            if (!i) {
              p[0] = {x: +pathCoordinates[iLen - 2], y: +pathCoordinates[iLen - 1]};
            } else if (iLen - 4 === i) {
              p[3] = {x: +pathCoordinates[0], y: +pathCoordinates[1]};
            } else if (iLen - 2 === i) {
              p[2] = {x: +pathCoordinates[0], y: +pathCoordinates[1]};
              p[3] = {x: +pathCoordinates[2], y: +pathCoordinates[3]};
            }
          } else {
            if (iLen - 4 === i) {
              p[3] = p[2];
            } else if (!i) {
              p[0] = {x: +pathCoordinates[i], y: +pathCoordinates[i + 1]};
            }
          }

          path.curve(
            (t * (-p[0].x + 6 * p[1].x + p[2].x) / 6) + (c * p[2].x),
            (t * (-p[0].y + 6 * p[1].y + p[2].y) / 6) + (c * p[2].y),
            (t * (p[1].x + 6 * p[2].x - p[3].x) / 6) + (c * p[2].x),
            (t * (p[1].y + 6 * p[2].y - p[3].y) / 6) + (c * p[2].y),
            p[2].x,
            p[2].y,
            false,
            valueData[(i + 2) / 2]
          );
        }

        return path;
      }
    };
  };

  /**
   * Monotone Cubic spline interpolation produces a smooth curve which preserves monotonicity. Unlike cardinal splines, the curve will not extend beyond the range of y-values of the original data points.
   *
   * Monotone Cubic splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
   *
   * The x-values of subsequent points must be increasing to fit a Monotone Cubic spline. If this condition is not met for a pair of adjacent points, then there will be a break in the curve between those data points.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.monotoneCubic({
   *     fillHoles: false
   *   })
   * });
   *
   * @memberof Chartist.Interpolation
   * @param {Object} options The options of the monotoneCubic factory function.
   * @return {Function}
   */
  Chartist.Interpolation.monotoneCubic = function(options) {
    var defaultOptions = {
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    return function monotoneCubic(pathCoordinates, valueData) {
      // First we try to split the coordinates into segments
      // This is necessary to treat "holes" in line charts
      var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
        fillHoles: options.fillHoles,
        increasingX: true
      });

      if(!segments.length) {
        // If there were no segments return 'Chartist.Interpolation.none'
        return Chartist.Interpolation.none()([]);
      } else if(segments.length > 1) {
        // If the split resulted in more that one segment we need to interpolate each segment individually and join them
        // afterwards together into a single path.
          var paths = [];
        // For each segment we will recurse the monotoneCubic fn function
        segments.forEach(function(segment) {
          paths.push(monotoneCubic(segment.pathCoordinates, segment.valueData));
        });
        // Join the segment path data into a single path and return
        return Chartist.Svg.Path.join(paths);
      } else {
        // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
        // segment
        pathCoordinates = segments[0].pathCoordinates;
        valueData = segments[0].valueData;

        // If less than three points we need to fallback to no smoothing
        if(pathCoordinates.length <= 4) {
          return Chartist.Interpolation.none()(pathCoordinates, valueData);
        }

        var xs = [],
          ys = [],
          i,
          n = pathCoordinates.length / 2,
          ms = [],
          ds = [], dys = [], dxs = [],
          path;

        // Populate x and y coordinates into separate arrays, for readability

        for(i = 0; i < n; i++) {
          xs[i] = pathCoordinates[i * 2];
          ys[i] = pathCoordinates[i * 2 + 1];
        }

        // Calculate deltas and derivative

        for(i = 0; i < n - 1; i++) {
          dys[i] = ys[i + 1] - ys[i];
          dxs[i] = xs[i + 1] - xs[i];
          ds[i] = dys[i] / dxs[i];
        }

        // Determine desired slope (m) at each point using Fritsch-Carlson method
        // See: http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation

        ms[0] = ds[0];
        ms[n - 1] = ds[n - 2];

        for(i = 1; i < n - 1; i++) {
          if(ds[i] === 0 || ds[i - 1] === 0 || (ds[i - 1] > 0) !== (ds[i] > 0)) {
            ms[i] = 0;
          } else {
            ms[i] = 3 * (dxs[i - 1] + dxs[i]) / (
              (2 * dxs[i] + dxs[i - 1]) / ds[i - 1] +
              (dxs[i] + 2 * dxs[i - 1]) / ds[i]);

            if(!isFinite(ms[i])) {
              ms[i] = 0;
            }
          }
        }

        // Now build a path from the slopes

        path = new Chartist.Svg.Path().move(xs[0], ys[0], false, valueData[0]);

        for(i = 0; i < n - 1; i++) {
          path.curve(
            // First control point
            xs[i] + dxs[i] / 3,
            ys[i] + ms[i] * dxs[i] / 3,
            // Second control point
            xs[i + 1] - dxs[i] / 3,
            ys[i + 1] - ms[i + 1] * dxs[i] / 3,
            // End point
            xs[i + 1],
            ys[i + 1],

            false,
            valueData[i + 1]
          );
        }

        return path;
      }
    };
  };

  /**
   * Step interpolation will cause the line chart to move in steps rather than diagonal or smoothed lines. This interpolation will create additional points that will also be drawn when the `showPoint` option is enabled.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The step interpolation function accepts one configuration parameter `postpone`, that can be `true` or `false`. The default value is `true` and will cause the step to occur where the value actually changes. If a different behaviour is needed where the step is shifted to the left and happens before the actual value, this option can be set to `false`.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.step({
   *     postpone: true,
   *     fillHoles: false
   *   })
   * });
   *
   * @memberof Chartist.Interpolation
   * @param options
   * @returns {Function}
   */
  Chartist.Interpolation.step = function(options) {
    var defaultOptions = {
      postpone: true,
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    return function step(pathCoordinates, valueData) {
      var path = new Chartist.Svg.Path();

      var prevX, prevY, prevData;

      for (var i = 0; i < pathCoordinates.length; i += 2) {
        var currX = pathCoordinates[i];
        var currY = pathCoordinates[i + 1];
        var currData = valueData[i / 2];

        // If the current point is also not a hole we can draw the step lines
        if(currData.value !== undefined) {
          if(prevData === undefined) {
            path.move(currX, currY, false, currData);
          } else {
            if(options.postpone) {
              // If postponed we should draw the step line with the value of the previous value
              path.line(currX, prevY, false, prevData);
            } else {
              // If not postponed we should draw the step line with the value of the current value
              path.line(prevX, currY, false, currData);
            }
            // Line to the actual point (this should only be a Y-Axis movement
            path.line(currX, currY, false, currData);
          }

          prevX = currX;
          prevY = currY;
          prevData = currData;
        } else if(!options.fillHoles) {
          prevX = prevY = prevData = undefined;
        }
      }

      return path;
    };
  };

}(this || global, Chartist));
;/**
 * A very basic event module that helps to generate and catch events.
 *
 * @module Chartist.Event
 */
/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  Chartist.EventEmitter = function () {
    var handlers = [];

    /**
     * Add an event handler for a specific event
     *
     * @memberof Chartist.Event
     * @param {String} event The event name
     * @param {Function} handler A event handler function
     */
    function addEventHandler(event, handler) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    }

    /**
     * Remove an event handler of a specific event name or remove all event handlers for a specific event.
     *
     * @memberof Chartist.Event
     * @param {String} event The event name where a specific or all handlers should be removed
     * @param {Function} [handler] An optional event handler function. If specified only this specific handler will be removed and otherwise all handlers are removed.
     */
    function removeEventHandler(event, handler) {
      // Only do something if there are event handlers with this name existing
      if(handlers[event]) {
        // If handler is set we will look for a specific handler and only remove this
        if(handler) {
          handlers[event].splice(handlers[event].indexOf(handler), 1);
          if(handlers[event].length === 0) {
            delete handlers[event];
          }
        } else {
          // If no handler is specified we remove all handlers for this event
          delete handlers[event];
        }
      }
    }

    /**
     * Use this function to emit an event. All handlers that are listening for this event will be triggered with the data parameter.
     *
     * @memberof Chartist.Event
     * @param {String} event The event name that should be triggered
     * @param {*} data Arbitrary data that will be passed to the event handler callback functions
     */
    function emit(event, data) {
      // Only do something if there are event handlers with this name existing
      if(handlers[event]) {
        handlers[event].forEach(function(handler) {
          handler(data);
        });
      }

      // Emit event to star event handlers
      if(handlers['*']) {
        handlers['*'].forEach(function(starHandler) {
          starHandler(event, data);
        });
      }
    }

    return {
      addEventHandler: addEventHandler,
      removeEventHandler: removeEventHandler,
      emit: emit
    };
  };

}(this || global, Chartist));
;/**
 * This module provides some basic prototype inheritance utilities.
 *
 * @module Chartist.Class
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  function listToArray(list) {
    var arr = [];
    if (list.length) {
      for (var i = 0; i < list.length; i++) {
        arr.push(list[i]);
      }
    }
    return arr;
  }

  /**
   * Method to extend from current prototype.
   *
   * @memberof Chartist.Class
   * @param {Object} properties The object that serves as definition for the prototype that gets created for the new class. This object should always contain a constructor property that is the desired constructor for the newly created class.
   * @param {Object} [superProtoOverride] By default extens will use the current class prototype or Chartist.class. With this parameter you can specify any super prototype that will be used.
   * @return {Function} Constructor function of the new class
   *
   * @example
   * var Fruit = Class.extend({
     * color: undefined,
     *   sugar: undefined,
     *
     *   constructor: function(color, sugar) {
     *     this.color = color;
     *     this.sugar = sugar;
     *   },
     *
     *   eat: function() {
     *     this.sugar = 0;
     *     return this;
     *   }
     * });
   *
   * var Banana = Fruit.extend({
     *   length: undefined,
     *
     *   constructor: function(length, sugar) {
     *     Banana.super.constructor.call(this, 'Yellow', sugar);
     *     this.length = length;
     *   }
     * });
   *
   * var banana = new Banana(20, 40);
   * console.log('banana instanceof Fruit', banana instanceof Fruit);
   * console.log('Fruit is prototype of banana', Fruit.prototype.isPrototypeOf(banana));
   * console.log('bananas prototype is Fruit', Object.getPrototypeOf(banana) === Fruit.prototype);
   * console.log(banana.sugar);
   * console.log(banana.eat().sugar);
   * console.log(banana.color);
   */
  function extend(properties, superProtoOverride) {
    var superProto = superProtoOverride || this.prototype || Chartist.Class;
    var proto = Object.create(superProto);

    Chartist.Class.cloneDefinitions(proto, properties);

    var constr = function() {
      var fn = proto.constructor || function () {},
        instance;

      // If this is linked to the Chartist namespace the constructor was not called with new
      // To provide a fallback we will instantiate here and return the instance
      instance = this === Chartist ? Object.create(proto) : this;
      fn.apply(instance, Array.prototype.slice.call(arguments, 0));

      // If this constructor was not called with new we need to return the instance
      // This will not harm when the constructor has been called with new as the returned value is ignored
      return instance;
    };

    constr.prototype = proto;
    constr.super = superProto;
    constr.extend = this.extend;

    return constr;
  }

  // Variable argument list clones args > 0 into args[0] and retruns modified args[0]
  function cloneDefinitions() {
    var args = listToArray(arguments);
    var target = args[0];

    args.splice(1, args.length - 1).forEach(function (source) {
      Object.getOwnPropertyNames(source).forEach(function (propName) {
        // If this property already exist in target we delete it first
        delete target[propName];
        // Define the property with the descriptor from source
        Object.defineProperty(target, propName,
          Object.getOwnPropertyDescriptor(source, propName));
      });
    });

    return target;
  }

  Chartist.Class = {
    extend: extend,
    cloneDefinitions: cloneDefinitions
  };

}(this || global, Chartist));
;/**
 * Base for all chart types. The methods in Chartist.Base are inherited to all chart types.
 *
 * @module Chartist.Base
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;

  // TODO: Currently we need to re-draw the chart on window resize. This is usually very bad and will affect performance.
  // This is done because we can't work with relative coordinates when drawing the chart because SVG Path does not
  // work with relative positions yet. We need to check if we can do a viewBox hack to switch to percentage.
  // See http://mozilla.6506.n7.nabble.com/Specyfing-paths-with-percentages-unit-td247474.html
  // Update: can be done using the above method tested here: http://codepen.io/gionkunz/pen/KDvLj
  // The problem is with the label offsets that can't be converted into percentage and affecting the chart container
  /**
   * Updates the chart which currently does a full reconstruction of the SVG DOM
   *
   * @param {Object} [data] Optional data you'd like to set for the chart before it will update. If not specified the update method will use the data that is already configured with the chart.
   * @param {Object} [options] Optional options you'd like to add to the previous options for the chart before it will update. If not specified the update method will use the options that have been already configured with the chart.
   * @param {Boolean} [override] If set to true, the passed options will be used to extend the options that have been configured already. Otherwise the chart default options will be used as the base
   * @memberof Chartist.Base
   */
  function update(data, options, override) {
    if(data) {
      this.data = data || {};
      this.data.labels = this.data.labels || [];
      this.data.series = this.data.series || [];
      // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
      this.eventEmitter.emit('data', {
        type: 'update',
        data: this.data
      });
    }

    if(options) {
      this.options = Chartist.extend({}, override ? this.options : this.defaultOptions, options);

      // If chartist was not initialized yet, we just set the options and leave the rest to the initialization
      // Otherwise we re-create the optionsProvider at this point
      if(!this.initializeTimeoutId) {
        this.optionsProvider.removeMediaQueryListeners();
        this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
      }
    }

    // Only re-created the chart if it has been initialized yet
    if(!this.initializeTimeoutId) {
      this.createChart(this.optionsProvider.getCurrentOptions());
    }

    // Return a reference to the chart object to chain up calls
    return this;
  }

  /**
   * This method can be called on the API object of each chart and will un-register all event listeners that were added to other components. This currently includes a window.resize listener as well as media query listeners if any responsive options have been provided. Use this function if you need to destroy and recreate Chartist charts dynamically.
   *
   * @memberof Chartist.Base
   */
  function detach() {
    // Only detach if initialization already occurred on this chart. If this chart still hasn't initialized (therefore
    // the initializationTimeoutId is still a valid timeout reference, we will clear the timeout
    if(!this.initializeTimeoutId) {
      window.removeEventListener('resize', this.resizeListener);
      this.optionsProvider.removeMediaQueryListeners();
    } else {
      window.clearTimeout(this.initializeTimeoutId);
    }

    return this;
  }

  /**
   * Use this function to register event handlers. The handler callbacks are synchronous and will run in the main thread rather than the event loop.
   *
   * @memberof Chartist.Base
   * @param {String} event Name of the event. Check the examples for supported events.
   * @param {Function} handler The handler function that will be called when an event with the given name was emitted. This function will receive a data argument which contains event data. See the example for more details.
   */
  function on(event, handler) {
    this.eventEmitter.addEventHandler(event, handler);
    return this;
  }

  /**
   * Use this function to un-register event handlers. If the handler function parameter is omitted all handlers for the given event will be un-registered.
   *
   * @memberof Chartist.Base
   * @param {String} event Name of the event for which a handler should be removed
   * @param {Function} [handler] The handler function that that was previously used to register a new event handler. This handler will be removed from the event handler list. If this parameter is omitted then all event handlers for the given event are removed from the list.
   */
  function off(event, handler) {
    this.eventEmitter.removeEventHandler(event, handler);
    return this;
  }

  function initialize() {
    // Add window resize listener that re-creates the chart
    window.addEventListener('resize', this.resizeListener);

    // Obtain current options based on matching media queries (if responsive options are given)
    // This will also register a listener that is re-creating the chart based on media changes
    this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
    // Register options change listener that will trigger a chart update
    this.eventEmitter.addEventHandler('optionsChanged', function() {
      this.update();
    }.bind(this));

    // Before the first chart creation we need to register us with all plugins that are configured
    // Initialize all relevant plugins with our chart object and the plugin options specified in the config
    if(this.options.plugins) {
      this.options.plugins.forEach(function(plugin) {
        if(plugin instanceof Array) {
          plugin[0](this, plugin[1]);
        } else {
          plugin(this);
        }
      }.bind(this));
    }

    // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
    this.eventEmitter.emit('data', {
      type: 'initial',
      data: this.data
    });

    // Create the first chart
    this.createChart(this.optionsProvider.getCurrentOptions());

    // As chart is initialized from the event loop now we can reset our timeout reference
    // This is important if the chart gets initialized on the same element twice
    this.initializeTimeoutId = undefined;
  }

  /**
   * Constructor of chart base class.
   *
   * @param query
   * @param data
   * @param defaultOptions
   * @param options
   * @param responsiveOptions
   * @constructor
   */
  function Base(query, data, defaultOptions, options, responsiveOptions) {
    this.container = Chartist.querySelector(query);
    this.data = data || {};
    this.data.labels = this.data.labels || [];
    this.data.series = this.data.series || [];
    this.defaultOptions = defaultOptions;
    this.options = options;
    this.responsiveOptions = responsiveOptions;
    this.eventEmitter = Chartist.EventEmitter();
    this.supportsForeignObject = Chartist.Svg.isSupported('Extensibility');
    this.supportsAnimations = Chartist.Svg.isSupported('AnimationEventsAttribute');
    this.resizeListener = function resizeListener(){
      this.update();
    }.bind(this);

    if(this.container) {
      // If chartist was already initialized in this container we are detaching all event listeners first
      if(this.container.__chartist__) {
        this.container.__chartist__.detach();
      }

      this.container.__chartist__ = this;
    }

    // Using event loop for first draw to make it possible to register event listeners in the same call stack where
    // the chart was created.
    this.initializeTimeoutId = setTimeout(initialize.bind(this), 0);
  }

  // Creating the chart base class
  Chartist.Base = Chartist.Class.extend({
    constructor: Base,
    optionsProvider: undefined,
    container: undefined,
    svg: undefined,
    eventEmitter: undefined,
    createChart: function() {
      throw new Error('Base chart type can\'t be instantiated!');
    },
    update: update,
    detach: detach,
    on: on,
    off: off,
    version: Chartist.version,
    supportsForeignObject: false
  });

}(this || global, Chartist));
;/**
 * Chartist SVG module for simple SVG DOM abstraction
 *
 * @module Chartist.Svg
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  var document = globalRoot.document;

  /**
   * Chartist.Svg creates a new SVG object wrapper with a starting element. You can use the wrapper to fluently create sub-elements and modify them.
   *
   * @memberof Chartist.Svg
   * @constructor
   * @param {String|Element} name The name of the SVG element to create or an SVG dom element which should be wrapped into Chartist.Svg
   * @param {Object} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param {String} className This class or class list will be added to the SVG element
   * @param {Object} parent The parent SVG wrapper object where this newly created wrapper and it's element will be attached to as child
   * @param {Boolean} insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   */
  function Svg(name, attributes, className, parent, insertFirst) {
    // If Svg is getting called with an SVG element we just return the wrapper
    if(name instanceof Element) {
      this._node = name;
    } else {
      this._node = document.createElementNS(Chartist.namespaces.svg, name);

      // If this is an SVG element created then custom namespace
      if(name === 'svg') {
        this.attr({
          'xmlns:ct': Chartist.namespaces.ct
        });
      }
    }

    if(attributes) {
      this.attr(attributes);
    }

    if(className) {
      this.addClass(className);
    }

    if(parent) {
      if (insertFirst && parent._node.firstChild) {
        parent._node.insertBefore(this._node, parent._node.firstChild);
      } else {
        parent._node.appendChild(this._node);
      }
    }
  }

  /**
   * Set attributes on the current SVG element of the wrapper you're currently working on.
   *
   * @memberof Chartist.Svg
   * @param {Object|String} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added. If this parameter is a String then the function is used as a getter and will return the attribute value.
   * @param {String} [ns] If specified, the attribute will be obtained using getAttributeNs. In order to write namepsaced attributes you can use the namespace:attribute notation within the attributes object.
   * @return {Object|String} The current wrapper object will be returned so it can be used for chaining or the attribute value if used as getter function.
   */
  function attr(attributes, ns) {
    if(typeof attributes === 'string') {
      if(ns) {
        return this._node.getAttributeNS(ns, attributes);
      } else {
        return this._node.getAttribute(attributes);
      }
    }

    Object.keys(attributes).forEach(function(key) {
      // If the attribute value is undefined we can skip this one
      if(attributes[key] === undefined) {
        return;
      }

      if (key.indexOf(':') !== -1) {
        var namespacedAttribute = key.split(':');
        this._node.setAttributeNS(Chartist.namespaces[namespacedAttribute[0]], key, attributes[key]);
      } else {
        this._node.setAttribute(key, attributes[key]);
      }
    }.bind(this));

    return this;
  }

  /**
   * Create a new SVG element whose wrapper object will be selected for further operations. This way you can also create nested groups easily.
   *
   * @memberof Chartist.Svg
   * @param {String} name The name of the SVG element that should be created as child element of the currently selected element wrapper
   * @param {Object} [attributes] An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param {String} [className] This class or class list will be added to the SVG element
   * @param {Boolean} [insertFirst] If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   * @return {Chartist.Svg} Returns a Chartist.Svg wrapper object that can be used to modify the containing SVG data
   */
  function elem(name, attributes, className, insertFirst) {
    return new Chartist.Svg(name, attributes, className, this, insertFirst);
  }

  /**
   * Returns the parent Chartist.SVG wrapper object
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} Returns a Chartist.Svg wrapper around the parent node of the current node. If the parent node is not existing or it's not an SVG node then this function will return null.
   */
  function parent() {
    return this._node.parentNode instanceof SVGElement ? new Chartist.Svg(this._node.parentNode) : null;
  }

  /**
   * This method returns a Chartist.Svg wrapper around the root SVG element of the current tree.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The root SVG element wrapped in a Chartist.Svg element
   */
  function root() {
    var node = this._node;
    while(node.nodeName !== 'svg') {
      node = node.parentNode;
    }
    return new Chartist.Svg(node);
  }

  /**
   * Find the first child SVG element of the current element that matches a CSS selector. The returned object is a Chartist.Svg wrapper.
   *
   * @memberof Chartist.Svg
   * @param {String} selector A CSS selector that is used to query for child SVG elements
   * @return {Chartist.Svg} The SVG wrapper for the element found or null if no element was found
   */
  function querySelector(selector) {
    var foundNode = this._node.querySelector(selector);
    return foundNode ? new Chartist.Svg(foundNode) : null;
  }

  /**
   * Find the all child SVG elements of the current element that match a CSS selector. The returned object is a Chartist.Svg.List wrapper.
   *
   * @memberof Chartist.Svg
   * @param {String} selector A CSS selector that is used to query for child SVG elements
   * @return {Chartist.Svg.List} The SVG wrapper list for the element found or null if no element was found
   */
  function querySelectorAll(selector) {
    var foundNodes = this._node.querySelectorAll(selector);
    return foundNodes.length ? new Chartist.Svg.List(foundNodes) : null;
  }

  /**
   * Returns the underlying SVG node for the current element.
   *
   * @memberof Chartist.Svg
   * @returns {Node}
   */
  function getNode() {
    return this._node;
  }

  /**
   * This method creates a foreignObject (see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) that allows to embed HTML content into a SVG graphic. With the help of foreignObjects you can enable the usage of regular HTML elements inside of SVG where they are subject for SVG positioning and transformation but the Browser will use the HTML rendering capabilities for the containing DOM.
   *
   * @memberof Chartist.Svg
   * @param {Node|String} content The DOM Node, or HTML string that will be converted to a DOM Node, that is then placed into and wrapped by the foreignObject
   * @param {String} [attributes] An object with properties that will be added as attributes to the foreignObject element that is created. Attributes with undefined values will not be added.
   * @param {String} [className] This class or class list will be added to the SVG element
   * @param {Boolean} [insertFirst] Specifies if the foreignObject should be inserted as first child
   * @return {Chartist.Svg} New wrapper object that wraps the foreignObject element
   */
  function foreignObject(content, attributes, className, insertFirst) {
    // If content is string then we convert it to DOM
    // TODO: Handle case where content is not a string nor a DOM Node
    if(typeof content === 'string') {
      var container = document.createElement('div');
      container.innerHTML = content;
      content = container.firstChild;
    }

    // Adding namespace to content element
    content.setAttribute('xmlns', Chartist.namespaces.xmlns);

    // Creating the foreignObject without required extension attribute (as described here
    // http://www.w3.org/TR/SVG/extend.html#ForeignObjectElement)
    var fnObj = this.elem('foreignObject', attributes, className, insertFirst);

    // Add content to foreignObjectElement
    fnObj._node.appendChild(content);

    return fnObj;
  }

  /**
   * This method adds a new text element to the current Chartist.Svg wrapper.
   *
   * @memberof Chartist.Svg
   * @param {String} t The text that should be added to the text element that is created
   * @return {Chartist.Svg} The same wrapper object that was used to add the newly created element
   */
  function text(t) {
    this._node.appendChild(document.createTextNode(t));
    return this;
  }

  /**
   * This method will clear all child nodes of the current wrapper object.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The same wrapper object that got emptied
   */
  function empty() {
    while (this._node.firstChild) {
      this._node.removeChild(this._node.firstChild);
    }

    return this;
  }

  /**
   * This method will cause the current wrapper to remove itself from its parent wrapper. Use this method if you'd like to get rid of an element in a given DOM structure.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The parent wrapper object of the element that got removed
   */
  function remove() {
    this._node.parentNode.removeChild(this._node);
    return this.parent();
  }

  /**
   * This method will replace the element with a new element that can be created outside of the current DOM.
   *
   * @memberof Chartist.Svg
   * @param {Chartist.Svg} newElement The new Chartist.Svg object that will be used to replace the current wrapper object
   * @return {Chartist.Svg} The wrapper of the new element
   */
  function replace(newElement) {
    this._node.parentNode.replaceChild(newElement._node, this._node);
    return newElement;
  }

  /**
   * This method will append an element to the current element as a child.
   *
   * @memberof Chartist.Svg
   * @param {Chartist.Svg} element The Chartist.Svg element that should be added as a child
   * @param {Boolean} [insertFirst] Specifies if the element should be inserted as first child
   * @return {Chartist.Svg} The wrapper of the appended object
   */
  function append(element, insertFirst) {
    if(insertFirst && this._node.firstChild) {
      this._node.insertBefore(element._node, this._node.firstChild);
    } else {
      this._node.appendChild(element._node);
    }

    return this;
  }

  /**
   * Returns an array of class names that are attached to the current wrapper element. This method can not be chained further.
   *
   * @memberof Chartist.Svg
   * @return {Array} A list of classes or an empty array if there are no classes on the current element
   */
  function classes() {
    return this._node.getAttribute('class') ? this._node.getAttribute('class').trim().split(/\s+/) : [];
  }

  /**
   * Adds one or a space separated list of classes to the current element and ensures the classes are only existing once.
   *
   * @memberof Chartist.Svg
   * @param {String} names A white space separated list of class names
   * @return {Chartist.Svg} The wrapper of the current element
   */
  function addClass(names) {
    this._node.setAttribute('class',
      this.classes(this._node)
        .concat(names.trim().split(/\s+/))
        .filter(function(elem, pos, self) {
          return self.indexOf(elem) === pos;
        }).join(' ')
    );

    return this;
  }

  /**
   * Removes one or a space separated list of classes from the current element.
   *
   * @memberof Chartist.Svg
   * @param {String} names A white space separated list of class names
   * @return {Chartist.Svg} The wrapper of the current element
   */
  function removeClass(names) {
    var removedClasses = names.trim().split(/\s+/);

    this._node.setAttribute('class', this.classes(this._node).filter(function(name) {
      return removedClasses.indexOf(name) === -1;
    }).join(' '));

    return this;
  }

  /**
   * Removes all classes from the current element.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The wrapper of the current element
   */
  function removeAllClasses() {
    this._node.setAttribute('class', '');

    return this;
  }

  /**
   * Get element height using `getBoundingClientRect`
   *
   * @memberof Chartist.Svg
   * @return {Number} The elements height in pixels
   */
  function height() {
    return this._node.getBoundingClientRect().height;
  }

  /**
   * Get element width using `getBoundingClientRect`
   *
   * @memberof Chartist.Core
   * @return {Number} The elements width in pixels
   */
  function width() {
    return this._node.getBoundingClientRect().width;
  }

  /**
   * The animate function lets you animate the current element with SMIL animations. You can add animations for multiple attributes at the same time by using an animation definition object. This object should contain SMIL animation attributes. Please refer to http://www.w3.org/TR/SVG/animate.html for a detailed specification about the available animation attributes. Additionally an easing property can be passed in the animation definition object. This can be a string with a name of an easing function in `Chartist.Svg.Easing` or an array with four numbers specifying a cubic Bézier curve.
   * **An animations object could look like this:**
   * ```javascript
   * element.animate({
   *   opacity: {
   *     dur: 1000,
   *     from: 0,
   *     to: 1
   *   },
   *   x1: {
   *     dur: '1000ms',
   *     from: 100,
   *     to: 200,
   *     easing: 'easeOutQuart'
   *   },
   *   y1: {
   *     dur: '2s',
   *     from: 0,
   *     to: 100
   *   }
   * });
   * ```
   * **Automatic unit conversion**
   * For the `dur` and the `begin` animate attribute you can also omit a unit by passing a number. The number will automatically be converted to milli seconds.
   * **Guided mode**
   * The default behavior of SMIL animations with offset using the `begin` attribute is that the attribute will keep it's original value until the animation starts. Mostly this behavior is not desired as you'd like to have your element attributes already initialized with the animation `from` value even before the animation starts. Also if you don't specify `fill="freeze"` on an animate element or if you delete the animation after it's done (which is done in guided mode) the attribute will switch back to the initial value. This behavior is also not desired when performing simple one-time animations. For one-time animations you'd want to trigger animations immediately instead of relative to the document begin time. That's why in guided mode Chartist.Svg will also use the `begin` property to schedule a timeout and manually start the animation after the timeout. If you're using multiple SMIL definition objects for an attribute (in an array), guided mode will be disabled for this attribute, even if you explicitly enabled it.
   * If guided mode is enabled the following behavior is added:
   * - Before the animation starts (even when delayed with `begin`) the animated attribute will be set already to the `from` value of the animation
   * - `begin` is explicitly set to `indefinite` so it can be started manually without relying on document begin time (creation)
   * - The animate element will be forced to use `fill="freeze"`
   * - The animation will be triggered with `beginElement()` in a timeout where `begin` of the definition object is interpreted in milli seconds. If no `begin` was specified the timeout is triggered immediately.
   * - After the animation the element attribute value will be set to the `to` value of the animation
   * - The animate element is deleted from the DOM
   *
   * @memberof Chartist.Svg
   * @param {Object} animations An animations object where the property keys are the attributes you'd like to animate. The properties should be objects again that contain the SMIL animation attributes (usually begin, dur, from, and to). The property begin and dur is auto converted (see Automatic unit conversion). You can also schedule multiple animations for the same attribute by passing an Array of SMIL definition objects. Attributes that contain an array of SMIL definition objects will not be executed in guided mode.
   * @param {Boolean} guided Specify if guided mode should be activated for this animation (see Guided mode). If not otherwise specified, guided mode will be activated.
   * @param {Object} eventEmitter If specified, this event emitter will be notified when an animation starts or ends.
   * @return {Chartist.Svg} The current element where the animation was added
   */
  function animate(animations, guided, eventEmitter) {
    if(guided === undefined) {
      guided = true;
    }

    Object.keys(animations).forEach(function createAnimateForAttributes(attribute) {

      function createAnimate(animationDefinition, guided) {
        var attributeProperties = {},
          animate,
          timeout,
          easing;

        // Check if an easing is specified in the definition object and delete it from the object as it will not
        // be part of the animate element attributes.
        if(animationDefinition.easing) {
          // If already an easing Bézier curve array we take it or we lookup a easing array in the Easing object
          easing = animationDefinition.easing instanceof Array ?
            animationDefinition.easing :
            Chartist.Svg.Easing[animationDefinition.easing];
          delete animationDefinition.easing;
        }

        // If numeric dur or begin was provided we assume milli seconds
        animationDefinition.begin = Chartist.ensureUnit(animationDefinition.begin, 'ms');
        animationDefinition.dur = Chartist.ensureUnit(animationDefinition.dur, 'ms');

        if(easing) {
          animationDefinition.calcMode = 'spline';
          animationDefinition.keySplines = easing.join(' ');
          animationDefinition.keyTimes = '0;1';
        }

        // Adding "fill: freeze" if we are in guided mode and set initial attribute values
        if(guided) {
          animationDefinition.fill = 'freeze';
          // Animated property on our element should already be set to the animation from value in guided mode
          attributeProperties[attribute] = animationDefinition.from;
          this.attr(attributeProperties);

          // In guided mode we also set begin to indefinite so we can trigger the start manually and put the begin
          // which needs to be in ms aside
          timeout = Chartist.quantity(animationDefinition.begin || 0).value;
          animationDefinition.begin = 'indefinite';
        }

        animate = this.elem('animate', Chartist.extend({
          attributeName: attribute
        }, animationDefinition));

        if(guided) {
          // If guided we take the value that was put aside in timeout and trigger the animation manually with a timeout
          setTimeout(function() {
            // If beginElement fails we set the animated attribute to the end position and remove the animate element
            // This happens if the SMIL ElementTimeControl interface is not supported or any other problems occured in
            // the browser. (Currently FF 34 does not support animate elements in foreignObjects)
            try {
              animate._node.beginElement();
            } catch(err) {
              // Set animated attribute to current animated value
              attributeProperties[attribute] = animationDefinition.to;
              this.attr(attributeProperties);
              // Remove the animate element as it's no longer required
              animate.remove();
            }
          }.bind(this), timeout);
        }

        if(eventEmitter) {
          animate._node.addEventListener('beginEvent', function handleBeginEvent() {
            eventEmitter.emit('animationBegin', {
              element: this,
              animate: animate._node,
              params: animationDefinition
            });
          }.bind(this));
        }

        animate._node.addEventListener('endEvent', function handleEndEvent() {
          if(eventEmitter) {
            eventEmitter.emit('animationEnd', {
              element: this,
              animate: animate._node,
              params: animationDefinition
            });
          }

          if(guided) {
            // Set animated attribute to current animated value
            attributeProperties[attribute] = animationDefinition.to;
            this.attr(attributeProperties);
            // Remove the animate element as it's no longer required
            animate.remove();
          }
        }.bind(this));
      }

      // If current attribute is an array of definition objects we create an animate for each and disable guided mode
      if(animations[attribute] instanceof Array) {
        animations[attribute].forEach(function(animationDefinition) {
          createAnimate.bind(this)(animationDefinition, false);
        }.bind(this));
      } else {
        createAnimate.bind(this)(animations[attribute], guided);
      }

    }.bind(this));

    return this;
  }

  Chartist.Svg = Chartist.Class.extend({
    constructor: Svg,
    attr: attr,
    elem: elem,
    parent: parent,
    root: root,
    querySelector: querySelector,
    querySelectorAll: querySelectorAll,
    getNode: getNode,
    foreignObject: foreignObject,
    text: text,
    empty: empty,
    remove: remove,
    replace: replace,
    append: append,
    classes: classes,
    addClass: addClass,
    removeClass: removeClass,
    removeAllClasses: removeAllClasses,
    height: height,
    width: width,
    animate: animate
  });

  /**
   * This method checks for support of a given SVG feature like Extensibility, SVG-animation or the like. Check http://www.w3.org/TR/SVG11/feature for a detailed list.
   *
   * @memberof Chartist.Svg
   * @param {String} feature The SVG 1.1 feature that should be checked for support.
   * @return {Boolean} True of false if the feature is supported or not
   */
  Chartist.Svg.isSupported = function(feature) {
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#' + feature, '1.1');
  };

  /**
   * This Object contains some standard easing cubic bezier curves. Then can be used with their name in the `Chartist.Svg.animate`. You can also extend the list and use your own name in the `animate` function. Click the show code button to see the available bezier functions.
   *
   * @memberof Chartist.Svg
   */
  var easingCubicBeziers = {
    easeInSine: [0.47, 0, 0.745, 0.715],
    easeOutSine: [0.39, 0.575, 0.565, 1],
    easeInOutSine: [0.445, 0.05, 0.55, 0.95],
    easeInQuad: [0.55, 0.085, 0.68, 0.53],
    easeOutQuad: [0.25, 0.46, 0.45, 0.94],
    easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
    easeInCubic: [0.55, 0.055, 0.675, 0.19],
    easeOutCubic: [0.215, 0.61, 0.355, 1],
    easeInOutCubic: [0.645, 0.045, 0.355, 1],
    easeInQuart: [0.895, 0.03, 0.685, 0.22],
    easeOutQuart: [0.165, 0.84, 0.44, 1],
    easeInOutQuart: [0.77, 0, 0.175, 1],
    easeInQuint: [0.755, 0.05, 0.855, 0.06],
    easeOutQuint: [0.23, 1, 0.32, 1],
    easeInOutQuint: [0.86, 0, 0.07, 1],
    easeInExpo: [0.95, 0.05, 0.795, 0.035],
    easeOutExpo: [0.19, 1, 0.22, 1],
    easeInOutExpo: [1, 0, 0, 1],
    easeInCirc: [0.6, 0.04, 0.98, 0.335],
    easeOutCirc: [0.075, 0.82, 0.165, 1],
    easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
    easeInBack: [0.6, -0.28, 0.735, 0.045],
    easeOutBack: [0.175, 0.885, 0.32, 1.275],
    easeInOutBack: [0.68, -0.55, 0.265, 1.55]
  };

  Chartist.Svg.Easing = easingCubicBeziers;

  /**
   * This helper class is to wrap multiple `Chartist.Svg` elements into a list where you can call the `Chartist.Svg` functions on all elements in the list with one call. This is helpful when you'd like to perform calls with `Chartist.Svg` on multiple elements.
   * An instance of this class is also returned by `Chartist.Svg.querySelectorAll`.
   *
   * @memberof Chartist.Svg
   * @param {Array<Node>|NodeList} nodeList An Array of SVG DOM nodes or a SVG DOM NodeList (as returned by document.querySelectorAll)
   * @constructor
   */
  function SvgList(nodeList) {
    var list = this;

    this.svgElements = [];
    for(var i = 0; i < nodeList.length; i++) {
      this.svgElements.push(new Chartist.Svg(nodeList[i]));
    }

    // Add delegation methods for Chartist.Svg
    Object.keys(Chartist.Svg.prototype).filter(function(prototypeProperty) {
      return ['constructor',
          'parent',
          'querySelector',
          'querySelectorAll',
          'replace',
          'append',
          'classes',
          'height',
          'width'].indexOf(prototypeProperty) === -1;
    }).forEach(function(prototypeProperty) {
      list[prototypeProperty] = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        list.svgElements.forEach(function(element) {
          Chartist.Svg.prototype[prototypeProperty].apply(element, args);
        });
        return list;
      };
    });
  }

  Chartist.Svg.List = Chartist.Class.extend({
    constructor: SvgList
  });
}(this || global, Chartist));
;/**
 * Chartist SVG path module for SVG path description creation and modification.
 *
 * @module Chartist.Svg.Path
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  /**
   * Contains the descriptors of supported element types in a SVG path. Currently only move, line and curve are supported.
   *
   * @memberof Chartist.Svg.Path
   * @type {Object}
   */
  var elementDescriptions = {
    m: ['x', 'y'],
    l: ['x', 'y'],
    c: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
    a: ['rx', 'ry', 'xAr', 'lAf', 'sf', 'x', 'y']
  };

  /**
   * Default options for newly created SVG path objects.
   *
   * @memberof Chartist.Svg.Path
   * @type {Object}
   */
  var defaultOptions = {
    // The accuracy in digit count after the decimal point. This will be used to round numbers in the SVG path. If this option is set to false then no rounding will be performed.
    accuracy: 3
  };

  function element(command, params, pathElements, pos, relative, data) {
    var pathElement = Chartist.extend({
      command: relative ? command.toLowerCase() : command.toUpperCase()
    }, params, data ? { data: data } : {} );

    pathElements.splice(pos, 0, pathElement);
  }

  function forEachParam(pathElements, cb) {
    pathElements.forEach(function(pathElement, pathElementIndex) {
      elementDescriptions[pathElement.command.toLowerCase()].forEach(function(paramName, paramIndex) {
        cb(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
      });
    });
  }

  /**
   * Used to construct a new path object.
   *
   * @memberof Chartist.Svg.Path
   * @param {Boolean} close If set to true then this path will be closed when stringified (with a Z at the end)
   * @param {Object} options Options object that overrides the default objects. See default options for more details.
   * @constructor
   */
  function SvgPath(close, options) {
    this.pathElements = [];
    this.pos = 0;
    this.close = close;
    this.options = Chartist.extend({}, defaultOptions, options);
  }

  /**
   * Gets or sets the current position (cursor) inside of the path. You can move around the cursor freely but limited to 0 or the count of existing elements. All modifications with element functions will insert new elements at the position of this cursor.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} [pos] If a number is passed then the cursor is set to this position in the path element array.
   * @return {Chartist.Svg.Path|Number} If the position parameter was passed then the return value will be the path object for easy call chaining. If no position parameter was passed then the current position is returned.
   */
  function position(pos) {
    if(pos !== undefined) {
      this.pos = Math.max(0, Math.min(this.pathElements.length, pos));
      return this;
    } else {
      return this.pos;
    }
  }

  /**
   * Removes elements from the path starting at the current position.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} count Number of path elements that should be removed from the current position.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function remove(count) {
    this.pathElements.splice(this.pos, count);
    return this;
  }

  /**
   * Use this function to add a new move SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The x coordinate for the move element.
   * @param {Number} y The y coordinate for the move element.
   * @param {Boolean} [relative] If set to true the move element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function move(x, y, relative, data) {
    element('M', {
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Use this function to add a new line SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The x coordinate for the line element.
   * @param {Number} y The y coordinate for the line element.
   * @param {Boolean} [relative] If set to true the line element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function line(x, y, relative, data) {
    element('L', {
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Use this function to add a new curve SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x1 The x coordinate for the first control point of the bezier curve.
   * @param {Number} y1 The y coordinate for the first control point of the bezier curve.
   * @param {Number} x2 The x coordinate for the second control point of the bezier curve.
   * @param {Number} y2 The y coordinate for the second control point of the bezier curve.
   * @param {Number} x The x coordinate for the target point of the curve element.
   * @param {Number} y The y coordinate for the target point of the curve element.
   * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function curve(x1, y1, x2, y2, x, y, relative, data) {
    element('C', {
      x1: +x1,
      y1: +y1,
      x2: +x2,
      y2: +y2,
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Use this function to add a new non-bezier curve SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} rx The radius to be used for the x-axis of the arc.
   * @param {Number} ry The radius to be used for the y-axis of the arc.
   * @param {Number} xAr Defines the orientation of the arc
   * @param {Number} lAf Large arc flag
   * @param {Number} sf Sweep flag
   * @param {Number} x The x coordinate for the target point of the curve element.
   * @param {Number} y The y coordinate for the target point of the curve element.
   * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function arc(rx, ry, xAr, lAf, sf, x, y, relative, data) {
    element('A', {
      rx: +rx,
      ry: +ry,
      xAr: +xAr,
      lAf: +lAf,
      sf: +sf,
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Parses an SVG path seen in the d attribute of path elements, and inserts the parsed elements into the existing path object at the current cursor position. Any closing path indicators (Z at the end of the path) will be ignored by the parser as this is provided by the close option in the options of the path object.
   *
   * @memberof Chartist.Svg.Path
   * @param {String} path Any SVG path that contains move (m), line (l) or curve (c) components.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function parse(path) {
    // Parsing the SVG path string into an array of arrays [['M', '10', '10'], ['L', '100', '100']]
    var chunks = path.replace(/([A-Za-z])([0-9])/g, '$1 $2')
      .replace(/([0-9])([A-Za-z])/g, '$1 $2')
      .split(/[\s,]+/)
      .reduce(function(result, element) {
        if(element.match(/[A-Za-z]/)) {
          result.push([]);
        }

        result[result.length - 1].push(element);
        return result;
      }, []);

    // If this is a closed path we remove the Z at the end because this is determined by the close option
    if(chunks[chunks.length - 1][0].toUpperCase() === 'Z') {
      chunks.pop();
    }

    // Using svgPathElementDescriptions to map raw path arrays into objects that contain the command and the parameters
    // For example {command: 'M', x: '10', y: '10'}
    var elements = chunks.map(function(chunk) {
        var command = chunk.shift(),
          description = elementDescriptions[command.toLowerCase()];

        return Chartist.extend({
          command: command
        }, description.reduce(function(result, paramName, index) {
          result[paramName] = +chunk[index];
          return result;
        }, {}));
      });

    // Preparing a splice call with the elements array as var arg params and insert the parsed elements at the current position
    var spliceArgs = [this.pos, 0];
    Array.prototype.push.apply(spliceArgs, elements);
    Array.prototype.splice.apply(this.pathElements, spliceArgs);
    // Increase the internal position by the element count
    this.pos += elements.length;

    return this;
  }

  /**
   * This function renders to current SVG path object into a final SVG string that can be used in the d attribute of SVG path elements. It uses the accuracy option to round big decimals. If the close parameter was set in the constructor of this path object then a path closing Z will be appended to the output string.
   *
   * @memberof Chartist.Svg.Path
   * @return {String}
   */
  function stringify() {
    var accuracyMultiplier = Math.pow(10, this.options.accuracy);

    return this.pathElements.reduce(function(path, pathElement) {
        var params = elementDescriptions[pathElement.command.toLowerCase()].map(function(paramName) {
          return this.options.accuracy ?
            (Math.round(pathElement[paramName] * accuracyMultiplier) / accuracyMultiplier) :
            pathElement[paramName];
        }.bind(this));

        return path + pathElement.command + params.join(',');
      }.bind(this), '') + (this.close ? 'Z' : '');
  }

  /**
   * Scales all elements in the current SVG path object. There is an individual parameter for each coordinate. Scaling will also be done for control points of curves, affecting the given coordinate.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The number which will be used to scale the x, x1 and x2 of all path elements.
   * @param {Number} y The number which will be used to scale the y, y1 and y2 of all path elements.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function scale(x, y) {
    forEachParam(this.pathElements, function(pathElement, paramName) {
      pathElement[paramName] *= paramName[0] === 'x' ? x : y;
    });
    return this;
  }

  /**
   * Translates all elements in the current SVG path object. The translation is relative and there is an individual parameter for each coordinate. Translation will also be done for control points of curves, affecting the given coordinate.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The number which will be used to translate the x, x1 and x2 of all path elements.
   * @param {Number} y The number which will be used to translate the y, y1 and y2 of all path elements.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function translate(x, y) {
    forEachParam(this.pathElements, function(pathElement, paramName) {
      pathElement[paramName] += paramName[0] === 'x' ? x : y;
    });
    return this;
  }

  /**
   * This function will run over all existing path elements and then loop over their attributes. The callback function will be called for every path element attribute that exists in the current path.
   * The method signature of the callback function looks like this:
   * ```javascript
   * function(pathElement, paramName, pathElementIndex, paramIndex, pathElements)
   * ```
   * If something else than undefined is returned by the callback function, this value will be used to replace the old value. This allows you to build custom transformations of path objects that can't be achieved using the basic transformation functions scale and translate.
   *
   * @memberof Chartist.Svg.Path
   * @param {Function} transformFnc The callback function for the transformation. Check the signature in the function description.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function transform(transformFnc) {
    forEachParam(this.pathElements, function(pathElement, paramName, pathElementIndex, paramIndex, pathElements) {
      var transformed = transformFnc(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
      if(transformed || transformed === 0) {
        pathElement[paramName] = transformed;
      }
    });
    return this;
  }

  /**
   * This function clones a whole path object with all its properties. This is a deep clone and path element objects will also be cloned.
   *
   * @memberof Chartist.Svg.Path
   * @param {Boolean} [close] Optional option to set the new cloned path to closed. If not specified or false, the original path close option will be used.
   * @return {Chartist.Svg.Path}
   */
  function clone(close) {
    var c = new Chartist.Svg.Path(close || this.close);
    c.pos = this.pos;
    c.pathElements = this.pathElements.slice().map(function cloneElements(pathElement) {
      return Chartist.extend({}, pathElement);
    });
    c.options = Chartist.extend({}, this.options);
    return c;
  }

  /**
   * Split a Svg.Path object by a specific command in the path chain. The path chain will be split and an array of newly created paths objects will be returned. This is useful if you'd like to split an SVG path by it's move commands, for example, in order to isolate chunks of drawings.
   *
   * @memberof Chartist.Svg.Path
   * @param {String} command The command you'd like to use to split the path
   * @return {Array<Chartist.Svg.Path>}
   */
  function splitByCommand(command) {
    var split = [
      new Chartist.Svg.Path()
    ];

    this.pathElements.forEach(function(pathElement) {
      if(pathElement.command === command.toUpperCase() && split[split.length - 1].pathElements.length !== 0) {
        split.push(new Chartist.Svg.Path());
      }

      split[split.length - 1].pathElements.push(pathElement);
    });

    return split;
  }

  /**
   * This static function on `Chartist.Svg.Path` is joining multiple paths together into one paths.
   *
   * @memberof Chartist.Svg.Path
   * @param {Array<Chartist.Svg.Path>} paths A list of paths to be joined together. The order is important.
   * @param {boolean} close If the newly created path should be a closed path
   * @param {Object} options Path options for the newly created path.
   * @return {Chartist.Svg.Path}
   */

  function join(paths, close, options) {
    var joinedPath = new Chartist.Svg.Path(close, options);
    for(var i = 0; i < paths.length; i++) {
      var path = paths[i];
      for(var j = 0; j < path.pathElements.length; j++) {
        joinedPath.pathElements.push(path.pathElements[j]);
      }
    }
    return joinedPath;
  }

  Chartist.Svg.Path = Chartist.Class.extend({
    constructor: SvgPath,
    position: position,
    remove: remove,
    move: move,
    line: line,
    curve: curve,
    arc: arc,
    scale: scale,
    translate: translate,
    transform: transform,
    parse: parse,
    stringify: stringify,
    clone: clone,
    splitByCommand: splitByCommand
  });

  Chartist.Svg.Path.elementDescriptions = elementDescriptions;
  Chartist.Svg.Path.join = join;
}(this || global, Chartist));
;/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  var axisUnits = {
    x: {
      pos: 'x',
      len: 'width',
      dir: 'horizontal',
      rectStart: 'x1',
      rectEnd: 'x2',
      rectOffset: 'y2'
    },
    y: {
      pos: 'y',
      len: 'height',
      dir: 'vertical',
      rectStart: 'y2',
      rectEnd: 'y1',
      rectOffset: 'x1'
    }
  };

  function Axis(units, chartRect, ticks, options) {
    this.units = units;
    this.counterUnits = units === axisUnits.x ? axisUnits.y : axisUnits.x;
    this.chartRect = chartRect;
    this.axisLength = chartRect[units.rectEnd] - chartRect[units.rectStart];
    this.gridOffset = chartRect[units.rectOffset];
    this.ticks = ticks;
    this.options = options;
  }

  function createGridAndLabels(gridGroup, labelGroup, useForeignObject, chartOptions, eventEmitter) {
    var axisOptions = chartOptions['axis' + this.units.pos.toUpperCase()];
    var projectedValues = this.ticks.map(this.projectValue.bind(this));
    var labelValues = this.ticks.map(axisOptions.labelInterpolationFnc);

    projectedValues.forEach(function(projectedValue, index) {
      var labelOffset = {
        x: 0,
        y: 0
      };

      // TODO: Find better solution for solving this problem
      // Calculate how much space we have available for the label
      var labelLength;
      if(projectedValues[index + 1]) {
        // If we still have one label ahead, we can calculate the distance to the next tick / label
        labelLength = projectedValues[index + 1] - projectedValue;
      } else {
        // If we don't have a label ahead and we have only two labels in total, we just take the remaining distance to
        // on the whole axis length. We limit that to a minimum of 30 pixel, so that labels close to the border will
        // still be visible inside of the chart padding.
        labelLength = Math.max(this.axisLength - projectedValue, 30);
      }

      // Skip grid lines and labels where interpolated label values are falsey (execpt for 0)
      if(Chartist.isFalseyButZero(labelValues[index]) && labelValues[index] !== '') {
        return;
      }

      // Transform to global coordinates using the chartRect
      // We also need to set the label offset for the createLabel function
      if(this.units.pos === 'x') {
        projectedValue = this.chartRect.x1 + projectedValue;
        labelOffset.x = chartOptions.axisX.labelOffset.x;

        // If the labels should be positioned in start position (top side for vertical axis) we need to set a
        // different offset as for positioned with end (bottom)
        if(chartOptions.axisX.position === 'start') {
          labelOffset.y = this.chartRect.padding.top + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
        } else {
          labelOffset.y = this.chartRect.y1 + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
        }
      } else {
        projectedValue = this.chartRect.y1 - projectedValue;
        labelOffset.y = chartOptions.axisY.labelOffset.y - (useForeignObject ? labelLength : 0);

        // If the labels should be positioned in start position (left side for horizontal axis) we need to set a
        // different offset as for positioned with end (right side)
        if(chartOptions.axisY.position === 'start') {
          labelOffset.x = useForeignObject ? this.chartRect.padding.left + chartOptions.axisY.labelOffset.x : this.chartRect.x1 - 10;
        } else {
          labelOffset.x = this.chartRect.x2 + chartOptions.axisY.labelOffset.x + 10;
        }
      }

      if(axisOptions.showGrid) {
        Chartist.createGrid(projectedValue, index, this, this.gridOffset, this.chartRect[this.counterUnits.len](), gridGroup, [
          chartOptions.classNames.grid,
          chartOptions.classNames[this.units.dir]
        ], eventEmitter);
      }

      if(axisOptions.showLabel) {
        Chartist.createLabel(projectedValue, labelLength, index, labelValues, this, axisOptions.offset, labelOffset, labelGroup, [
          chartOptions.classNames.label,
          chartOptions.classNames[this.units.dir],
          (axisOptions.position === 'start' ? chartOptions.classNames[axisOptions.position] : chartOptions.classNames['end'])
        ], useForeignObject, eventEmitter);
      }
    }.bind(this));
  }

  Chartist.Axis = Chartist.Class.extend({
    constructor: Axis,
    createGridAndLabels: createGridAndLabels,
    projectValue: function(value, index, data) {
      throw new Error('Base axis can\'t be instantiated!');
    }
  });

  Chartist.Axis.units = axisUnits;

}(this || global, Chartist));
;/**
 * The auto scale axis uses standard linear scale projection of values along an axis. It uses order of magnitude to find a scale automatically and evaluates the available space in order to find the perfect amount of ticks for your chart.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
 *   high: 100,
 *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
 *   low: 0,
 *   // This option will be used when finding the right scale division settings. The amount of ticks on the scale will be determined so that as many ticks as possible will be displayed, while not violating this minimum required space (in pixel).
 *   scaleMinSpace: 20,
 *   // Can be set to true or false. If set to true, the scale will be generated with whole numbers only.
 *   onlyInteger: true,
 *   // The reference value can be used to make sure that this value will always be on the chart. This is especially useful on bipolar charts where the bipolar center always needs to be part of the chart.
 *   referenceValue: 5
 * };
 * ```
 *
 * @module Chartist.AutoScaleAxis
 */
/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  function AutoScaleAxis(axisUnit, data, chartRect, options) {
    // Usually we calculate highLow based on the data but this can be overriden by a highLow object in the options
    var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
    this.bounds = Chartist.getBounds(chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart], highLow, options.scaleMinSpace || 20, options.onlyInteger);
    this.range = {
      min: this.bounds.min,
      max: this.bounds.max
    };

    Chartist.AutoScaleAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      this.bounds.values,
      options);
  }

  function projectValue(value) {
    return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.bounds.min) / this.bounds.range;
  }

  Chartist.AutoScaleAxis = Chartist.Axis.extend({
    constructor: AutoScaleAxis,
    projectValue: projectValue
  });

}(this || global, Chartist));
;/**
 * The fixed scale axis uses standard linear projection of values along an axis. It makes use of a divisor option to divide the range provided from the minimum and maximum value or the options high and low that will override the computed minimum and maximum.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
 *   high: 100,
 *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
 *   low: 0,
 *   // If specified then the value range determined from minimum to maximum (or low and high) will be divided by this number and ticks will be generated at those division points. The default divisor is 1.
 *   divisor: 4,
 *   // If ticks is explicitly set, then the axis will not compute the ticks with the divisor, but directly use the data in ticks to determine at what points on the axis a tick need to be generated.
 *   ticks: [1, 10, 20, 30]
 * };
 * ```
 *
 * @module Chartist.FixedScaleAxis
 */
/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  function FixedScaleAxis(axisUnit, data, chartRect, options) {
    var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
    this.divisor = options.divisor || 1;
    this.ticks = options.ticks || Chartist.times(this.divisor).map(function(value, index) {
      return highLow.low + (highLow.high - highLow.low) / this.divisor * index;
    }.bind(this));
    this.ticks.sort(function(a, b) {
      return a - b;
    });
    this.range = {
      min: highLow.low,
      max: highLow.high
    };

    Chartist.FixedScaleAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      this.ticks,
      options);

    this.stepLength = this.axisLength / this.divisor;
  }

  function projectValue(value) {
    return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.range.min) / (this.range.max - this.range.min);
  }

  Chartist.FixedScaleAxis = Chartist.Axis.extend({
    constructor: FixedScaleAxis,
    projectValue: projectValue
  });

}(this || global, Chartist));
;/**
 * The step axis for step based charts like bar chart or step based line charts. It uses a fixed amount of ticks that will be equally distributed across the whole axis length. The projection is done using the index of the data value rather than the value itself and therefore it's only useful for distribution purpose.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // Ticks to be used to distribute across the axis length. As this axis type relies on the index of the value rather than the value, arbitrary data that can be converted to a string can be used as ticks.
 *   ticks: ['One', 'Two', 'Three'],
 *   // If set to true the full width will be used to distribute the values where the last value will be at the maximum of the axis length. If false the spaces between the ticks will be evenly distributed instead.
 *   stretch: true
 * };
 * ```
 *
 * @module Chartist.StepAxis
 */
/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  function StepAxis(axisUnit, data, chartRect, options) {
    Chartist.StepAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      options.ticks,
      options);

    var calc = Math.max(1, options.ticks.length - (options.stretch ? 1 : 0));
    this.stepLength = this.axisLength / calc;
  }

  function projectValue(value, index) {
    return this.stepLength * index;
  }

  Chartist.StepAxis = Chartist.Axis.extend({
    constructor: StepAxis,
    projectValue: projectValue
  });

}(this || global, Chartist));
;/**
 * The Chartist line chart can be used to draw Line or Scatter charts. If used in the browser you can access the global `Chartist` namespace where you find the `Line` function as a main entry point.
 *
 * For examples on how to use the line chart please check the examples of the `Chartist.Line` method.
 *
 * @module Chartist.Line
 */
/* global Chartist */
(function(globalRoot, Chartist){
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  /**
   * Default options in line charts. Expand the code view to see a detailed list of options with comments.
   *
   * @memberof Chartist.Line
   */
  var defaultOptions = {
    // Options for X-Axis
    axisX: {
      // The offset of the labels to the chart area
      offset: 30,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'end',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined
    },
    // Options for Y-Axis
    axisY: {
      // The offset of the labels to the chart area
      offset: 40,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'start',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined,
      // This value specifies the minimum height in pixel of the scale steps
      scaleMinSpace: 20,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: false
    },
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // If the line should be drawn or not
    showLine: true,
    // If dots should be drawn or not
    showPoint: true,
    // If the line chart should draw an area
    showArea: false,
    // The base for the area chart that will be used to close the area shape (is normally 0)
    areaBase: 0,
    // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
    lineSmooth: true,
    // If the line chart should add a background fill to the .ct-grids group.
    showGridBackground: false,
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
    low: undefined,
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
    high: undefined,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
      top: 15,
      right: 15,
      bottom: 5,
      left: 10
    },
    // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
    fullWidth: false,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
      chart: 'ct-chart-line',
      label: 'ct-label',
      labelGroup: 'ct-labels',
      series: 'ct-series',
      line: 'ct-line',
      point: 'ct-point',
      area: 'ct-area',
      grid: 'ct-grid',
      gridGroup: 'ct-grids',
      gridBackground: 'ct-grid-background',
      vertical: 'ct-vertical',
      horizontal: 'ct-horizontal',
      start: 'ct-start',
      end: 'ct-end'
    }
  };

  /**
   * Creates a new chart
   *
   */
  function createChart(options) {
    var data = Chartist.normalizeData(this.data, options.reverseData, true);

    // Create new svg object
    this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart);
    // Create groups for labels, grid and series
    var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
    var seriesGroup = this.svg.elem('g');
    var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);

    var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
    var axisX, axisY;

    if(options.axisX.type === undefined) {
      axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
        ticks: data.normalized.labels,
        stretch: options.fullWidth
      }));
    } else {
      axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
    }

    if(options.axisY.type === undefined) {
      axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
        high: Chartist.isNumeric(options.high) ? options.high : options.axisY.high,
        low: Chartist.isNumeric(options.low) ? options.low : options.axisY.low
      }));
    } else {
      axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
    }

    axisX.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
    axisY.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

    if (options.showGridBackground) {
      Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
    }

    // Draw the series
    data.raw.series.forEach(function(series, seriesIndex) {
      var seriesElement = seriesGroup.elem('g');

      // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
      seriesElement.attr({
        'ct:series-name': series.name,
        'ct:meta': Chartist.serialize(series.meta)
      });

      // Use series class from series data or if not set generate one
      seriesElement.addClass([
        options.classNames.series,
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex))
      ].join(' '));

      var pathCoordinates = [],
        pathData = [];

      data.normalized.series[seriesIndex].forEach(function(value, valueIndex) {
        var p = {
          x: chartRect.x1 + axisX.projectValue(value, valueIndex, data.normalized.series[seriesIndex]),
          y: chartRect.y1 - axisY.projectValue(value, valueIndex, data.normalized.series[seriesIndex])
        };
        pathCoordinates.push(p.x, p.y);
        pathData.push({
          value: value,
          valueIndex: valueIndex,
          meta: Chartist.getMetaData(series, valueIndex)
        });
      }.bind(this));

      var seriesOptions = {
        lineSmooth: Chartist.getSeriesOption(series, options, 'lineSmooth'),
        showPoint: Chartist.getSeriesOption(series, options, 'showPoint'),
        showLine: Chartist.getSeriesOption(series, options, 'showLine'),
        showArea: Chartist.getSeriesOption(series, options, 'showArea'),
        areaBase: Chartist.getSeriesOption(series, options, 'areaBase')
      };

      var smoothing = typeof seriesOptions.lineSmooth === 'function' ?
        seriesOptions.lineSmooth : (seriesOptions.lineSmooth ? Chartist.Interpolation.monotoneCubic() : Chartist.Interpolation.none());
      // Interpolating path where pathData will be used to annotate each path element so we can trace back the original
      // index, value and meta data
      var path = smoothing(pathCoordinates, pathData);

      // If we should show points we need to create them now to avoid secondary loop
      // Points are drawn from the pathElements returned by the interpolation function
      // Small offset for Firefox to render squares correctly
      if (seriesOptions.showPoint) {

        path.pathElements.forEach(function(pathElement) {
          var point = seriesElement.elem('line', {
            x1: pathElement.x,
            y1: pathElement.y,
            x2: pathElement.x + 0.01,
            y2: pathElement.y
          }, options.classNames.point).attr({
            'ct:value': [pathElement.data.value.x, pathElement.data.value.y].filter(Chartist.isNumeric).join(','),
            'ct:meta': Chartist.serialize(pathElement.data.meta)
          });

          this.eventEmitter.emit('draw', {
            type: 'point',
            value: pathElement.data.value,
            index: pathElement.data.valueIndex,
            meta: pathElement.data.meta,
            series: series,
            seriesIndex: seriesIndex,
            axisX: axisX,
            axisY: axisY,
            group: seriesElement,
            element: point,
            x: pathElement.x,
            y: pathElement.y
          });
        }.bind(this));
      }

      if(seriesOptions.showLine) {
        var line = seriesElement.elem('path', {
          d: path.stringify()
        }, options.classNames.line, true);

        this.eventEmitter.emit('draw', {
          type: 'line',
          values: data.normalized.series[seriesIndex],
          path: path.clone(),
          chartRect: chartRect,
          index: seriesIndex,
          series: series,
          seriesIndex: seriesIndex,
          seriesMeta: series.meta,
          axisX: axisX,
          axisY: axisY,
          group: seriesElement,
          element: line
        });
      }

      // Area currently only works with axes that support a range!
      if(seriesOptions.showArea && axisY.range) {
        // If areaBase is outside the chart area (< min or > max) we need to set it respectively so that
        // the area is not drawn outside the chart area.
        var areaBase = Math.max(Math.min(seriesOptions.areaBase, axisY.range.max), axisY.range.min);

        // We project the areaBase value into screen coordinates
        var areaBaseProjected = chartRect.y1 - axisY.projectValue(areaBase);

        // In order to form the area we'll first split the path by move commands so we can chunk it up into segments
        path.splitByCommand('M').filter(function onlySolidSegments(pathSegment) {
          // We filter only "solid" segments that contain more than one point. Otherwise there's no need for an area
          return pathSegment.pathElements.length > 1;
        }).map(function convertToArea(solidPathSegments) {
          // Receiving the filtered solid path segments we can now convert those segments into fill areas
          var firstElement = solidPathSegments.pathElements[0];
          var lastElement = solidPathSegments.pathElements[solidPathSegments.pathElements.length - 1];

          // Cloning the solid path segment with closing option and removing the first move command from the clone
          // We then insert a new move that should start at the area base and draw a straight line up or down
          // at the end of the path we add an additional straight line to the projected area base value
          // As the closing option is set our path will be automatically closed
          return solidPathSegments.clone(true)
            .position(0)
            .remove(1)
            .move(firstElement.x, areaBaseProjected)
            .line(firstElement.x, firstElement.y)
            .position(solidPathSegments.pathElements.length + 1)
            .line(lastElement.x, areaBaseProjected);

        }).forEach(function createArea(areaPath) {
          // For each of our newly created area paths, we'll now create path elements by stringifying our path objects
          // and adding the created DOM elements to the correct series group
          var area = seriesElement.elem('path', {
            d: areaPath.stringify()
          }, options.classNames.area, true);

          // Emit an event for each area that was drawn
          this.eventEmitter.emit('draw', {
            type: 'area',
            values: data.normalized.series[seriesIndex],
            path: areaPath.clone(),
            series: series,
            seriesIndex: seriesIndex,
            axisX: axisX,
            axisY: axisY,
            chartRect: chartRect,
            index: seriesIndex,
            group: seriesElement,
            element: area
          });
        }.bind(this));
      }
    }.bind(this));

    this.eventEmitter.emit('created', {
      bounds: axisY.bounds,
      chartRect: chartRect,
      axisX: axisX,
      axisY: axisY,
      svg: this.svg,
      options: options
    });
  }

  /**
   * This method creates a new line chart.
   *
   * @memberof Chartist.Line
   * @param {String|Node} query A selector query string or directly a DOM element
   * @param {Object} data The data object that needs to consist of a labels and a series array
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object which exposes the API for the created chart
   *
   * @example
   * // Create a simple line chart
   * var data = {
   *   // A labels array that can contain any sort of values
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
   *   // Our series array that contains series objects or in this case series data arrays
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // As options we currently only set a static size of 300x200 px
   * var options = {
   *   width: '300px',
   *   height: '200px'
   * };
   *
   * // In the global name space Chartist we call the Line function to initialize a line chart. As a first parameter we pass in a selector where we would like to get our chart created. Second parameter is the actual data object and as a third parameter we pass in our options
   * new Chartist.Line('.ct-chart', data, options);
   *
   * @example
   * // Use specific interpolation function with configuration from the Chartist.Interpolation module
   *
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [
   *     [1, 1, 8, 1, 7]
   *   ]
   * }, {
   *   lineSmooth: Chartist.Interpolation.cardinal({
   *     tension: 0.2
   *   })
   * });
   *
   * @example
   * // Create a line chart with responsive options
   *
   * var data = {
   *   // A labels array that can contain any sort of values
   *   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
   *   // Our series array that contains series objects or in this case series data arrays
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
   * var responsiveOptions = [
   *   ['screen and (min-width: 641px) and (max-width: 1024px)', {
   *     showPoint: false,
   *     axisX: {
   *       labelInterpolationFnc: function(value) {
   *         // Will return Mon, Tue, Wed etc. on medium screens
   *         return value.slice(0, 3);
   *       }
   *     }
   *   }],
   *   ['screen and (max-width: 640px)', {
   *     showLine: false,
   *     axisX: {
   *       labelInterpolationFnc: function(value) {
   *         // Will return M, T, W etc. on small screens
   *         return value[0];
   *       }
   *     }
   *   }]
   * ];
   *
   * new Chartist.Line('.ct-chart', data, null, responsiveOptions);
   *
   */
  function Line(query, data, options, responsiveOptions) {
    Chartist.Line.super.constructor.call(this,
      query,
      data,
      defaultOptions,
      Chartist.extend({}, defaultOptions, options),
      responsiveOptions);
  }

  // Creating line chart type in Chartist namespace
  Chartist.Line = Chartist.Base.extend({
    constructor: Line,
    createChart: createChart
  });

}(this || global, Chartist));
;/**
 * The bar chart module of Chartist that can be used to draw unipolar or bipolar bar and grouped bar charts.
 *
 * @module Chartist.Bar
 */
/* global Chartist */
(function(globalRoot, Chartist){
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  /**
   * Default options in bar charts. Expand the code view to see a detailed list of options with comments.
   *
   * @memberof Chartist.Bar
   */
  var defaultOptions = {
    // Options for X-Axis
    axisX: {
      // The offset of the chart drawing area to the border of the container
      offset: 30,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'end',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // This value specifies the minimum width in pixel of the scale steps
      scaleMinSpace: 30,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: false
    },
    // Options for Y-Axis
    axisY: {
      // The offset of the chart drawing area to the border of the container
      offset: 40,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'start',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // This value specifies the minimum height in pixel of the scale steps
      scaleMinSpace: 20,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: false
    },
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
    high: undefined,
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
    low: undefined,
    // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
    referenceValue: 0,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
      top: 15,
      right: 15,
      bottom: 5,
      left: 10
    },
    // Specify the distance in pixel of bars in a group
    seriesBarDistance: 15,
    // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
    stackBars: false,
    // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
    // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
    stackMode: 'accumulate',
    // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
    horizontalBars: false,
    // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
    distributeSeries: false,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // If the bar chart should add a background fill to the .ct-grids group.
    showGridBackground: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
      chart: 'ct-chart-bar',
      horizontalBars: 'ct-horizontal-bars',
      label: 'ct-label',
      labelGroup: 'ct-labels',
      series: 'ct-series',
      bar: 'ct-bar',
      grid: 'ct-grid',
      gridGroup: 'ct-grids',
      gridBackground: 'ct-grid-background',
      vertical: 'ct-vertical',
      horizontal: 'ct-horizontal',
      start: 'ct-start',
      end: 'ct-end'
    }
  };

  /**
   * Creates a new chart
   *
   */
  function createChart(options) {
    var data;
    var highLow;

    if(options.distributeSeries) {
      data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
      data.normalized.series = data.normalized.series.map(function(value) {
        return [value];
      });
    } else {
      data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
    }

    // Create new svg element
    this.svg = Chartist.createSvg(
      this.container,
      options.width,
      options.height,
      options.classNames.chart + (options.horizontalBars ? ' ' + options.classNames.horizontalBars : '')
    );

    // Drawing groups in correct order
    var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
    var seriesGroup = this.svg.elem('g');
    var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);

    if(options.stackBars && data.normalized.series.length !== 0) {

      // If stacked bars we need to calculate the high low from stacked values from each series
      var serialSums = Chartist.serialMap(data.normalized.series, function serialSums() {
        return Array.prototype.slice.call(arguments).map(function(value) {
          return value;
        }).reduce(function(prev, curr) {
          return {
            x: prev.x + (curr && curr.x) || 0,
            y: prev.y + (curr && curr.y) || 0
          };
        }, {x: 0, y: 0});
      });

      highLow = Chartist.getHighLow([serialSums], options, options.horizontalBars ? 'x' : 'y');

    } else {

      highLow = Chartist.getHighLow(data.normalized.series, options, options.horizontalBars ? 'x' : 'y');
    }

    // Overrides of high / low from settings
    highLow.high = +options.high || (options.high === 0 ? 0 : highLow.high);
    highLow.low = +options.low || (options.low === 0 ? 0 : highLow.low);

    var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);

    var valueAxis,
      labelAxisTicks,
      labelAxis,
      axisX,
      axisY;

    // We need to set step count based on some options combinations
    if(options.distributeSeries && options.stackBars) {
      // If distributed series are enabled and bars need to be stacked, we'll only have one bar and therefore should
      // use only the first label for the step axis
      labelAxisTicks = data.normalized.labels.slice(0, 1);
    } else {
      // If distributed series are enabled but stacked bars aren't, we should use the series labels
      // If we are drawing a regular bar chart with two dimensional series data, we just use the labels array
      // as the bars are normalized
      labelAxisTicks = data.normalized.labels;
    }

    // Set labelAxis and valueAxis based on the horizontalBars setting. This setting will flip the axes if necessary.
    if(options.horizontalBars) {
      if(options.axisX.type === undefined) {
        valueAxis = axisX = new Chartist.AutoScaleAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
          highLow: highLow,
          referenceValue: 0
        }));
      } else {
        valueAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
          highLow: highLow,
          referenceValue: 0
        }));
      }

      if(options.axisY.type === undefined) {
        labelAxis = axisY = new Chartist.StepAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, {
          ticks: labelAxisTicks
        });
      } else {
        labelAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
      }
    } else {
      if(options.axisX.type === undefined) {
        labelAxis = axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, {
          ticks: labelAxisTicks
        });
      } else {
        labelAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
      }

      if(options.axisY.type === undefined) {
        valueAxis = axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
          highLow: highLow,
          referenceValue: 0
        }));
      } else {
        valueAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
          highLow: highLow,
          referenceValue: 0
        }));
      }
    }

    // Projected 0 point
    var zeroPoint = options.horizontalBars ? (chartRect.x1 + valueAxis.projectValue(0)) : (chartRect.y1 - valueAxis.projectValue(0));
    // Used to track the screen coordinates of stacked bars
    var stackedBarValues = [];

    labelAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
    valueAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

    if (options.showGridBackground) {
      Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
    }

    // Draw the series
    data.raw.series.forEach(function(series, seriesIndex) {
      // Calculating bi-polar value of index for seriesOffset. For i = 0..4 biPol will be -1.5, -0.5, 0.5, 1.5 etc.
      var biPol = seriesIndex - (data.raw.series.length - 1) / 2;
      // Half of the period width between vertical grid lines used to position bars
      var periodHalfLength;
      // Current series SVG element
      var seriesElement;

      // We need to set periodHalfLength based on some options combinations
      if(options.distributeSeries && !options.stackBars) {
        // If distributed series are enabled but stacked bars aren't, we need to use the length of the normaizedData array
        // which is the series count and divide by 2
        periodHalfLength = labelAxis.axisLength / data.normalized.series.length / 2;
      } else if(options.distributeSeries && options.stackBars) {
        // If distributed series and stacked bars are enabled we'll only get one bar so we should just divide the axis
        // length by 2
        periodHalfLength = labelAxis.axisLength / 2;
      } else {
        // On regular bar charts we should just use the series length
        periodHalfLength = labelAxis.axisLength / data.normalized.series[seriesIndex].length / 2;
      }

      // Adding the series group to the series element
      seriesElement = seriesGroup.elem('g');

      // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
      seriesElement.attr({
        'ct:series-name': series.name,
        'ct:meta': Chartist.serialize(series.meta)
      });

      // Use series class from series data or if not set generate one
      seriesElement.addClass([
        options.classNames.series,
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex))
      ].join(' '));

      data.normalized.series[seriesIndex].forEach(function(value, valueIndex) {
        var projected,
          bar,
          previousStack,
          labelAxisValueIndex;

        // We need to set labelAxisValueIndex based on some options combinations
        if(options.distributeSeries && !options.stackBars) {
          // If distributed series are enabled but stacked bars aren't, we can use the seriesIndex for later projection
          // on the step axis for label positioning
          labelAxisValueIndex = seriesIndex;
        } else if(options.distributeSeries && options.stackBars) {
          // If distributed series and stacked bars are enabled, we will only get one bar and therefore always use
          // 0 for projection on the label step axis
          labelAxisValueIndex = 0;
        } else {
          // On regular bar charts we just use the value index to project on the label step axis
          labelAxisValueIndex = valueIndex;
        }

        // We need to transform coordinates differently based on the chart layout
        if(options.horizontalBars) {
          projected = {
            x: chartRect.x1 + valueAxis.projectValue(value && value.x ? value.x : 0, valueIndex, data.normalized.series[seriesIndex]),
            y: chartRect.y1 - labelAxis.projectValue(value && value.y ? value.y : 0, labelAxisValueIndex, data.normalized.series[seriesIndex])
          };
        } else {
          projected = {
            x: chartRect.x1 + labelAxis.projectValue(value && value.x ? value.x : 0, labelAxisValueIndex, data.normalized.series[seriesIndex]),
            y: chartRect.y1 - valueAxis.projectValue(value && value.y ? value.y : 0, valueIndex, data.normalized.series[seriesIndex])
          }
        }

        // If the label axis is a step based axis we will offset the bar into the middle of between two steps using
        // the periodHalfLength value. Also we do arrange the different series so that they align up to each other using
        // the seriesBarDistance. If we don't have a step axis, the bar positions can be chosen freely so we should not
        // add any automated positioning.
        if(labelAxis instanceof Chartist.StepAxis) {
          // Offset to center bar between grid lines, but only if the step axis is not stretched
          if(!labelAxis.options.stretch) {
            projected[labelAxis.units.pos] += periodHalfLength * (options.horizontalBars ? -1 : 1);
          }
          // Using bi-polar offset for multiple series if no stacked bars or series distribution is used
          projected[labelAxis.units.pos] += (options.stackBars || options.distributeSeries) ? 0 : biPol * options.seriesBarDistance * (options.horizontalBars ? -1 : 1);
        }

        // Enter value in stacked bar values used to remember previous screen value for stacking up bars
        previousStack = stackedBarValues[valueIndex] || zeroPoint;
        stackedBarValues[valueIndex] = previousStack - (zeroPoint - projected[labelAxis.counterUnits.pos]);

        // Skip if value is undefined
        if(value === undefined) {
          return;
        }

        var positions = {};
        positions[labelAxis.units.pos + '1'] = projected[labelAxis.units.pos];
        positions[labelAxis.units.pos + '2'] = projected[labelAxis.units.pos];

        if(options.stackBars && (options.stackMode === 'accumulate' || !options.stackMode)) {
          // Stack mode: accumulate (default)
          // If bars are stacked we use the stackedBarValues reference and otherwise base all bars off the zero line
          // We want backwards compatibility, so the expected fallback without the 'stackMode' option
          // to be the original behaviour (accumulate)
          positions[labelAxis.counterUnits.pos + '1'] = previousStack;
          positions[labelAxis.counterUnits.pos + '2'] = stackedBarValues[valueIndex];
        } else {
          // Draw from the zero line normally
          // This is also the same code for Stack mode: overlap
          positions[labelAxis.counterUnits.pos + '1'] = zeroPoint;
          positions[labelAxis.counterUnits.pos + '2'] = projected[labelAxis.counterUnits.pos];
        }

        // Limit x and y so that they are within the chart rect
        positions.x1 = Math.min(Math.max(positions.x1, chartRect.x1), chartRect.x2);
        positions.x2 = Math.min(Math.max(positions.x2, chartRect.x1), chartRect.x2);
        positions.y1 = Math.min(Math.max(positions.y1, chartRect.y2), chartRect.y1);
        positions.y2 = Math.min(Math.max(positions.y2, chartRect.y2), chartRect.y1);

        var metaData = Chartist.getMetaData(series, valueIndex);

        // Create bar element
        bar = seriesElement.elem('line', positions, options.classNames.bar).attr({
          'ct:value': [value.x, value.y].filter(Chartist.isNumeric).join(','),
          'ct:meta': Chartist.serialize(metaData)
        });

        this.eventEmitter.emit('draw', Chartist.extend({
          type: 'bar',
          value: value,
          index: valueIndex,
          meta: metaData,
          series: series,
          seriesIndex: seriesIndex,
          axisX: axisX,
          axisY: axisY,
          chartRect: chartRect,
          group: seriesElement,
          element: bar
        }, positions));
      }.bind(this));
    }.bind(this));

    this.eventEmitter.emit('created', {
      bounds: valueAxis.bounds,
      chartRect: chartRect,
      axisX: axisX,
      axisY: axisY,
      svg: this.svg,
      options: options
    });
  }

  /**
   * This method creates a new bar chart and returns API object that you can use for later changes.
   *
   * @memberof Chartist.Bar
   * @param {String|Node} query A selector query string or directly a DOM element
   * @param {Object} data The data object that needs to consist of a labels and a series array
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object which exposes the API for the created chart
   *
   * @example
   * // Create a simple bar chart
   * var data = {
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // In the global name space Chartist we call the Bar function to initialize a bar chart. As a first parameter we pass in a selector where we would like to get our chart created and as a second parameter we pass our data object.
   * new Chartist.Bar('.ct-chart', data);
   *
   * @example
   * // This example creates a bipolar grouped bar chart where the boundaries are limitted to -10 and 10
   * new Chartist.Bar('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5, 6, 7],
   *   series: [
   *     [1, 3, 2, -5, -3, 1, -6],
   *     [-5, -2, -4, -1, 2, -3, 1]
   *   ]
   * }, {
   *   seriesBarDistance: 12,
   *   low: -10,
   *   high: 10
   * });
   *
   */
  function Bar(query, data, options, responsiveOptions) {
    Chartist.Bar.super.constructor.call(this,
      query,
      data,
      defaultOptions,
      Chartist.extend({}, defaultOptions, options),
      responsiveOptions);
  }

  // Creating bar chart type in Chartist namespace
  Chartist.Bar = Chartist.Base.extend({
    constructor: Bar,
    createChart: createChart
  });

}(this || global, Chartist));
;/**
 * The pie chart module of Chartist that can be used to draw pie, donut or gauge charts
 *
 * @module Chartist.Pie
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  /**
   * Default options in line charts. Expand the code view to see a detailed list of options with comments.
   *
   * @memberof Chartist.Pie
   */
  var defaultOptions = {
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: 5,
    // Override the class names that are used to generate the SVG structure of the chart
    classNames: {
      chartPie: 'ct-chart-pie',
      chartDonut: 'ct-chart-donut',
      series: 'ct-series',
      slicePie: 'ct-slice-pie',
      sliceDonut: 'ct-slice-donut',
      sliceDonutSolid: 'ct-slice-donut-solid',
      label: 'ct-label'
    },
    // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
    startAngle: 0,
    // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
    total: undefined,
    // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
    donut: false,
    // If specified the donut segments will be drawn as shapes instead of strokes.
    donutSolid: false,
    // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
    // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
    donutWidth: 60,
    // If a label should be shown or not
    showLabel: true,
    // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
    labelOffset: 0,
    // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
    labelPosition: 'inside',
    // An interpolation function for the label value
    labelInterpolationFnc: Chartist.noop,
    // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
    labelDirection: 'neutral',
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // If true empty values will be ignored to avoid drawing unncessary slices and labels
    ignoreEmptyValues: false
  };

  /**
   * Determines SVG anchor position based on direction and center parameter
   *
   * @param center
   * @param label
   * @param direction
   * @return {string}
   */
  function determineAnchorPosition(center, label, direction) {
    var toTheRight = label.x > center.x;

    if(toTheRight && direction === 'explode' ||
      !toTheRight && direction === 'implode') {
      return 'start';
    } else if(toTheRight && direction === 'implode' ||
      !toTheRight && direction === 'explode') {
      return 'end';
    } else {
      return 'middle';
    }
  }

  /**
   * Creates the pie chart
   *
   * @param options
   */
  function createChart(options) {
    var data = Chartist.normalizeData(this.data);
    var seriesGroups = [],
      labelsGroup,
      chartRect,
      radius,
      labelRadius,
      totalDataSum,
      startAngle = options.startAngle;

    // Create SVG.js draw
    this.svg = Chartist.createSvg(this.container, options.width, options.height,options.donut ? options.classNames.chartDonut : options.classNames.chartPie);
    // Calculate charting rect
    chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
    // Get biggest circle radius possible within chartRect
    radius = Math.min(chartRect.width() / 2, chartRect.height() / 2);
    // Calculate total of all series to get reference value or use total reference from optional options
    totalDataSum = options.total || data.normalized.series.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    }, 0);

    var donutWidth = Chartist.quantity(options.donutWidth);
    if (donutWidth.unit === '%') {
      donutWidth.value *= radius / 100;
    }

    // If this is a donut chart we need to adjust our radius to enable strokes to be drawn inside
    // Unfortunately this is not possible with the current SVG Spec
    // See this proposal for more details: http://lists.w3.org/Archives/Public/www-svg/2003Oct/0000.html
    radius -= options.donut && !options.donutSolid ? donutWidth.value / 2  : 0;

    // If labelPosition is set to `outside` or a donut chart is drawn then the label position is at the radius,
    // if regular pie chart it's half of the radius
    if(options.labelPosition === 'outside' || options.donut && !options.donutSolid) {
      labelRadius = radius;
    } else if(options.labelPosition === 'center') {
      // If labelPosition is center we start with 0 and will later wait for the labelOffset
      labelRadius = 0;
    } else if(options.donutSolid) {
      labelRadius = radius - donutWidth.value / 2;
    } else {
      // Default option is 'inside' where we use half the radius so the label will be placed in the center of the pie
      // slice
      labelRadius = radius / 2;
    }
    // Add the offset to the labelRadius where a negative offset means closed to the center of the chart
    labelRadius += options.labelOffset;

    // Calculate end angle based on total sum and current data value and offset with padding
    var center = {
      x: chartRect.x1 + chartRect.width() / 2,
      y: chartRect.y2 + chartRect.height() / 2
    };

    // Check if there is only one non-zero value in the series array.
    var hasSingleValInSeries = data.raw.series.filter(function(val) {
      return val.hasOwnProperty('value') ? val.value !== 0 : val !== 0;
    }).length === 1;

    // Creating the series groups
    data.raw.series.forEach(function(series, index) {
      seriesGroups[index] = this.svg.elem('g', null, null);
    }.bind(this));
    //if we need to show labels we create the label group now
    if(options.showLabel) {
      labelsGroup = this.svg.elem('g', null, null);
    }

    // Draw the series
    // initialize series groups
    data.raw.series.forEach(function(series, index) {
      // If current value is zero and we are ignoring empty values then skip to next value
      if (data.normalized.series[index] === 0 && options.ignoreEmptyValues) return;

      // If the series is an object and contains a name or meta data we add a custom attribute
      seriesGroups[index].attr({
        'ct:series-name': series.name
      });

      // Use series class from series data or if not set generate one
      seriesGroups[index].addClass([
        options.classNames.series,
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(index))
      ].join(' '));

      // If the whole dataset is 0 endAngle should be zero. Can't divide by 0.
      var endAngle = (totalDataSum > 0 ? startAngle + data.normalized.series[index] / totalDataSum * 360 : 0);

      // Use slight offset so there are no transparent hairline issues
      var overlappigStartAngle = Math.max(0, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));

      // If we need to draw the arc for all 360 degrees we need to add a hack where we close the circle
      // with Z and use 359.99 degrees
      if(endAngle - overlappigStartAngle >= 359.99) {
        endAngle = overlappigStartAngle + 359.99;
      }

      var start = Chartist.polarToCartesian(center.x, center.y, radius, overlappigStartAngle),
        end = Chartist.polarToCartesian(center.x, center.y, radius, endAngle);

      var innerStart,
        innerEnd,
        donutSolidRadius;

      // Create a new path element for the pie chart. If this isn't a donut chart we should close the path for a correct stroke
      var path = new Chartist.Svg.Path(!options.donut || options.donutSolid)
        .move(end.x, end.y)
        .arc(radius, radius, 0, endAngle - startAngle > 180, 0, start.x, start.y);

      // If regular pie chart (no donut) we add a line to the center of the circle for completing the pie
      if(!options.donut) {
        path.line(center.x, center.y);
      } else if (options.donutSolid) {
        donutSolidRadius = radius - donutWidth.value;
        innerStart = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));
        innerEnd = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, endAngle);
        path.line(innerStart.x, innerStart.y);
        path.arc(donutSolidRadius, donutSolidRadius, 0, endAngle - startAngle  > 180, 1, innerEnd.x, innerEnd.y);
      }

      // Create the SVG path
      // If this is a donut chart we add the donut class, otherwise just a regular slice
      var pathClassName = options.classNames.slicePie;
      if (options.donut) {
        pathClassName = options.classNames.sliceDonut;
        if (options.donutSolid) {
          pathClassName = options.classNames.sliceDonutSolid;
        }
      }
      var pathElement = seriesGroups[index].elem('path', {
        d: path.stringify()
      }, pathClassName);

      // Adding the pie series value to the path
      pathElement.attr({
        'ct:value': data.normalized.series[index],
        'ct:meta': Chartist.serialize(series.meta)
      });

      // If this is a donut, we add the stroke-width as style attribute
      if(options.donut && !options.donutSolid) {
        pathElement._node.style.strokeWidth = donutWidth.value + 'px';
      }

      // Fire off draw event
      this.eventEmitter.emit('draw', {
        type: 'slice',
        value: data.normalized.series[index],
        totalDataSum: totalDataSum,
        index: index,
        meta: series.meta,
        series: series,
        group: seriesGroups[index],
        element: pathElement,
        path: path.clone(),
        center: center,
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle
      });

      // If we need to show labels we need to add the label for this slice now
      if(options.showLabel) {
        var labelPosition;
        if(data.raw.series.length === 1) {
          // If we have only 1 series, we can position the label in the center of the pie
          labelPosition = {
            x: center.x,
            y: center.y
          };
        } else {
          // Position at the labelRadius distance from center and between start and end angle
          labelPosition = Chartist.polarToCartesian(
            center.x,
            center.y,
            labelRadius,
            startAngle + (endAngle - startAngle) / 2
          );
        }

        var rawValue;
        if(data.normalized.labels && !Chartist.isFalseyButZero(data.normalized.labels[index])) {
          rawValue = data.normalized.labels[index];
        } else {
          rawValue = data.normalized.series[index];
        }

        var interpolatedValue = options.labelInterpolationFnc(rawValue, index);

        if(interpolatedValue || interpolatedValue === 0) {
          var labelElement = labelsGroup.elem('text', {
            dx: labelPosition.x,
            dy: labelPosition.y,
            'text-anchor': determineAnchorPosition(center, labelPosition, options.labelDirection)
          }, options.classNames.label).text('' + interpolatedValue);

          // Fire off draw event
          this.eventEmitter.emit('draw', {
            type: 'label',
            index: index,
            group: labelsGroup,
            element: labelElement,
            text: '' + interpolatedValue,
            x: labelPosition.x,
            y: labelPosition.y
          });
        }
      }

      // Set next startAngle to current endAngle.
      // (except for last slice)
      startAngle = endAngle;
    }.bind(this));

    this.eventEmitter.emit('created', {
      chartRect: chartRect,
      svg: this.svg,
      options: options
    });
  }

  /**
   * This method creates a new pie chart and returns an object that can be used to redraw the chart.
   *
   * @memberof Chartist.Pie
   * @param {String|Node} query A selector query string or directly a DOM element
   * @param {Object} data The data object in the pie chart needs to have a series property with a one dimensional data array. The values will be normalized against each other and don't necessarily need to be in percentage. The series property can also be an array of value objects that contain a value property and a className property to override the CSS class name for the series group.
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object with a version and an update method to manually redraw the chart
   *
   * @example
   * // Simple pie chart example with four series
   * new Chartist.Pie('.ct-chart', {
   *   series: [10, 2, 4, 3]
   * });
   *
   * @example
   * // Drawing a donut chart
   * new Chartist.Pie('.ct-chart', {
   *   series: [10, 2, 4, 3]
   * }, {
   *   donut: true
   * });
   *
   * @example
   * // Using donut, startAngle and total to draw a gauge chart
   * new Chartist.Pie('.ct-chart', {
   *   series: [20, 10, 30, 40]
   * }, {
   *   donut: true,
   *   donutWidth: 20,
   *   startAngle: 270,
   *   total: 200
   * });
   *
   * @example
   * // Drawing a pie chart with padding and labels that are outside the pie
   * new Chartist.Pie('.ct-chart', {
   *   series: [20, 10, 30, 40]
   * }, {
   *   chartPadding: 30,
   *   labelOffset: 50,
   *   labelDirection: 'explode'
   * });
   *
   * @example
   * // Overriding the class names for individual series as well as a name and meta data.
   * // The name will be written as ct:series-name attribute and the meta data will be serialized and written
   * // to a ct:meta attribute.
   * new Chartist.Pie('.ct-chart', {
   *   series: [{
   *     value: 20,
   *     name: 'Series 1',
   *     className: 'my-custom-class-one',
   *     meta: 'Meta One'
   *   }, {
   *     value: 10,
   *     name: 'Series 2',
   *     className: 'my-custom-class-two',
   *     meta: 'Meta Two'
   *   }, {
   *     value: 70,
   *     name: 'Series 3',
   *     className: 'my-custom-class-three',
   *     meta: 'Meta Three'
   *   }]
   * });
   */
  function Pie(query, data, options, responsiveOptions) {
    Chartist.Pie.super.constructor.call(this,
      query,
      data,
      defaultOptions,
      Chartist.extend({}, defaultOptions, options),
      responsiveOptions);
  }

  // Creating pie chart type in Chartist namespace
  Chartist.Pie = Chartist.Base.extend({
    constructor: Pie,
    createChart: createChart,
    determineAnchorPosition: determineAnchorPosition
  });

}(this || global, Chartist));

return Chartist;

}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/chroma-js/chroma.js":
/*!*******************************************!*\
  !*** ../node_modules/chroma-js/chroma.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */

(function (global, factory) {
     true ? module.exports = factory() :
    undefined;
}(this, (function () { 'use strict';

    var limit = function (x, min, max) {
        if ( min === void 0 ) min=0;
        if ( max === void 0 ) max=1;

        return x < min ? min : x > max ? max : x;
    };

    var clip_rgb = function (rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (var i=0; i<=3; i++) {
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
                rgb[i] = limit(rgb[i], 0, 255);
            } else if (i === 3) {
                rgb[i] = limit(rgb[i], 0, 1);
            }
        }
        return rgb;
    };

    // ported from jQuery's $.type
    var classToType = {};
    for (var i = 0, list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i < list.length; i += 1) {
        var name = list[i];

        classToType[("[object " + name + "]")] = name.toLowerCase();
    }
    var type = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };

    var unpack = function (args, keyOrder) {
        if ( keyOrder === void 0 ) keyOrder=null;

    	// if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) { return Array.prototype.slice.call(args); }
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
    	if (type(args[0]) == 'object' && keyOrder) {
    		return keyOrder.split('')
    			.filter(function (k) { return args[0][k] !== undefined; })
    			.map(function (k) { return args[0][k]; });
    	}
    	// otherwise we just return the first argument
    	// (which we suppose is an array of args)
        return args[0];
    };

    var last = function (args) {
        if (args.length < 2) { return null; }
        var l = args.length-1;
        if (type(args[l]) == 'string') { return args[l].toLowerCase(); }
        return null;
    };

    var PI = Math.PI;

    var utils = {
    	clip_rgb: clip_rgb,
    	limit: limit,
    	type: type,
    	unpack: unpack,
    	last: last,
    	PI: PI,
    	TWOPI: PI*2,
    	PITHIRD: PI/3,
    	DEG2RAD: PI / 180,
    	RAD2DEG: 180 / PI
    };

    var input = {
    	format: {},
    	autodetect: []
    };

    var last$1 = utils.last;
    var clip_rgb$1 = utils.clip_rgb;
    var type$1 = utils.type;


    var Color = function Color() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var me = this;
        if (type$1(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        }

        // last argument could be the mode
        var mode = last$1(args);
        var autodetect = false;

        if (!mode) {
            autodetect = true;
            if (!input.sorted) {
                input.autodetect = input.autodetect.sort(function (a,b) { return b.p - a.p; });
                input.sorted = true;
            }
            // auto-detect format
            for (var i = 0, list = input.autodetect; i < list.length; i += 1) {
                var chk = list[i];

                mode = chk.test.apply(chk, args);
                if (mode) { break; }
            }
        }

        if (input.format[mode]) {
            var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
            me._rgb = clip_rgb$1(rgb);
        } else {
            throw new Error('unknown format: '+args);
        }

        // add alpha channel
        if (me._rgb.length === 3) { me._rgb.push(1); }
    };

    Color.prototype.toString = function toString () {
        if (type$1(this.hex) == 'function') { return this.hex(); }
        return ("[" + (this._rgb.join(',')) + "]");
    };

    var Color_1 = Color;

    var chroma = function () {
    	var args = [], len = arguments.length;
    	while ( len-- ) args[ len ] = arguments[ len ];

    	return new (Function.prototype.bind.apply( chroma.Color, [ null ].concat( args) ));
    };

    chroma.Color = Color_1;
    chroma.version = '2.1.0';

    var chroma_1 = chroma;

    var unpack$1 = utils.unpack;
    var max = Math.max;

    var rgb2cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$1(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max(r,max(g,b));
        var f = k < 1 ? 1 / (1-k) : 0;
        var c = (1-r-k) * f;
        var m = (1-g-k) * f;
        var y = (1-b-k) * f;
        return [c,m,y,k];
    };

    var rgb2cmyk_1 = rgb2cmyk;

    var unpack$2 = utils.unpack;

    var cmyk2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$2(args, 'cmyk');
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) { return [0,0,0,alpha]; }
        return [
            c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
            m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
            y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
            alpha
        ];
    };

    var cmyk2rgb_1 = cmyk2rgb;

    var unpack$3 = utils.unpack;
    var type$2 = utils.type;



    Color_1.prototype.cmyk = function() {
        return rgb2cmyk_1(this._rgb);
    };

    chroma_1.cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['cmyk']) ));
    };

    input.format.cmyk = cmyk2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$3(args, 'cmyk');
            if (type$2(args) === 'array' && args.length === 4) {
                return 'cmyk';
            }
        }
    });

    var unpack$4 = utils.unpack;
    var last$2 = utils.last;
    var rnd = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */
    var hsl2css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hsla = unpack$4(args, 'hsla');
        var mode = last$2(args) || 'lsa';
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1]*100) + '%';
        hsla[2] = rnd(hsla[2]*100) + '%';
        if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = 'hsla';
        } else {
            hsla.length = 3;
        }
        return (mode + "(" + (hsla.join(',')) + ")");
    };

    var hsl2css_1 = hsl2css;

    var unpack$5 = utils.unpack;

    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */
    var rgb2hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$5(args, 'rgba');
        var r = args[0];
        var g = args[1];
        var b = args[2];

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        var l = (max + min) / 2;
        var s, h;

        if (max === min){
            s = 0;
            h = Number.NaN;
        } else {
            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }

        if (r == max) { h = (g - b) / (max - min); }
        else if (g == max) { h = 2 + (b - r) / (max - min); }
        else if (b == max) { h = 4 + (r - g) / (max - min); }

        h *= 60;
        if (h < 0) { h += 360; }
        if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
        return [h,s,l];
    };

    var rgb2hsl_1 = rgb2hsl;

    var unpack$6 = utils.unpack;
    var last$3 = utils.last;


    var round = Math.round;

    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */
    var rgb2css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$6(args, 'rgba');
        var mode = last$3(args) || 'rgb';
        if (mode.substr(0,3) == 'hsl') {
            return hsl2css_1(rgb2hsl_1(rgba), mode);
        }
        rgba[0] = round(rgba[0]);
        rgba[1] = round(rgba[1]);
        rgba[2] = round(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = 'rgba';
        }
        return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
    };

    var rgb2css_1 = rgb2css;

    var unpack$7 = utils.unpack;
    var round$1 = Math.round;

    var hsl2rgb = function () {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$7(args, 'hsl');
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r,g,b;
        if (s === 0) {
            r = g = b = l*255;
        } else {
            var t3 = [0,0,0];
            var c = [0,0,0];
            var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1/3;
            t3[1] = h_;
            t3[2] = h_ - 1/3;
            for (var i=0; i<3; i++) {
                if (t3[i] < 0) { t3[i] += 1; }
                if (t3[i] > 1) { t3[i] -= 1; }
                if (6 * t3[i] < 1)
                    { c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
                else if (2 * t3[i] < 1)
                    { c[i] = t2; }
                else if (3 * t3[i] < 2)
                    { c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
                else
                    { c[i] = t1; }
            }
            (assign = [round$1(c[0]*255),round$1(c[1]*255),round$1(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
        }
        if (args.length > 3) {
            // keep alpha channel
            return [r,g,b,args[3]];
        }
        return [r,g,b,1];
    };

    var hsl2rgb_1 = hsl2rgb;

    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

    var round$2 = Math.round;

    var css2rgb = function (css) {
        css = css.toLowerCase().trim();
        var m;

        if (input.format.named) {
            try {
                return input.format.named(css);
            } catch (e) {
                // eslint-disable-next-line
            }
        }

        // rgb(250,20,0)
        if ((m = css.match(RE_RGB))) {
            var rgb = m.slice(1,4);
            for (var i=0; i<3; i++) {
                rgb[i] = +rgb[i];
            }
            rgb[3] = 1;  // default alpha
            return rgb;
        }

        // rgba(250,20,0,0.4)
        if ((m = css.match(RE_RGBA))) {
            var rgb$1 = m.slice(1,5);
            for (var i$1=0; i$1<4; i$1++) {
                rgb$1[i$1] = +rgb$1[i$1];
            }
            return rgb$1;
        }

        // rgb(100%,0%,0%)
        if ((m = css.match(RE_RGB_PCT))) {
            var rgb$2 = m.slice(1,4);
            for (var i$2=0; i$2<3; i$2++) {
                rgb$2[i$2] = round$2(rgb$2[i$2] * 2.55);
            }
            rgb$2[3] = 1;  // default alpha
            return rgb$2;
        }

        // rgba(100%,0%,0%,0.4)
        if ((m = css.match(RE_RGBA_PCT))) {
            var rgb$3 = m.slice(1,5);
            for (var i$3=0; i$3<3; i$3++) {
                rgb$3[i$3] = round$2(rgb$3[i$3] * 2.55);
            }
            rgb$3[3] = +rgb$3[3];
            return rgb$3;
        }

        // hsl(0,100%,50%)
        if ((m = css.match(RE_HSL))) {
            var hsl = m.slice(1,4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb_1(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }

        // hsla(0,100%,50%,0.5)
        if ((m = css.match(RE_HSLA))) {
            var hsl$1 = m.slice(1,4);
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb_1(hsl$1);
            rgb$5[3] = +m[4];  // default alpha = 1
            return rgb$5;
        }
    };

    css2rgb.test = function (s) {
        return RE_RGB.test(s) ||
            RE_RGBA.test(s) ||
            RE_RGB_PCT.test(s) ||
            RE_RGBA_PCT.test(s) ||
            RE_HSL.test(s) ||
            RE_HSLA.test(s);
    };

    var css2rgb_1 = css2rgb;

    var type$3 = utils.type;




    Color_1.prototype.css = function(mode) {
        return rgb2css_1(this._rgb, mode);
    };

    chroma_1.css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['css']) ));
    };

    input.format.css = css2rgb_1;

    input.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$3(h) === 'string' && css2rgb_1.test(h)) {
                return 'css';
            }
        }
    });

    var unpack$8 = utils.unpack;

    input.format.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$8(args, 'rgba');
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };

    chroma_1.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['gl']) ));
    };

    Color_1.prototype.gl = function() {
        var rgb = this._rgb;
        return [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]];
    };

    var unpack$9 = utils.unpack;

    var rgb2hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$9(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var c = delta * 100 / 255;
        var _g = min / (255 - delta) * 100;
        var h;
        if (delta === 0) {
            h = Number.NaN;
        } else {
            if (r === max) { h = (g - b) / delta; }
            if (g === max) { h = 2+(b - r) / delta; }
            if (b === max) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, c, _g];
    };

    var rgb2hcg_1 = rgb2hcg;

    var unpack$a = utils.unpack;
    var floor = Math.floor;

    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */

    var hcg2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$a(args, 'hcg');
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r,g,b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
            r = g = b = _g;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;
            var i = floor(h);
            var f = h - i;
            var p = _g * (1 - c);
            var q = p + _c * (1 - f);
            var t = p + _c * f;
            var v = p + _c;
            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var hcg2rgb_1 = hcg2rgb;

    var unpack$b = utils.unpack;
    var type$4 = utils.type;






    Color_1.prototype.hcg = function() {
        return rgb2hcg_1(this._rgb);
    };

    chroma_1.hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcg']) ));
    };

    input.format.hcg = hcg2rgb_1;

    input.autodetect.push({
        p: 1,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$b(args, 'hcg');
            if (type$4(args) === 'array' && args.length === 3) {
                return 'hcg';
            }
        }
    });

    var unpack$c = utils.unpack;
    var last$4 = utils.last;
    var round$3 = Math.round;

    var rgb2hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$c(args, 'rgba');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last$4(args) || 'auto';
        if (a === undefined) { a = 1; }
        if (mode === 'auto') {
            mode = a < 1 ? 'rgba' : 'rgb';
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        var hxa = '0' + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
            case 'rgba': return ("#" + str + hxa);
            case 'argb': return ("#" + hxa + str);
            default: return ("#" + str);
        }
    };

    var rgb2hex_1 = rgb2hex;

    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    var hex2rgb = function (hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substr(1);
            }
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [r,g,b,1];
        }

        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) {
                // remove optional leading #
                hex = hex.substr(1);
            }
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [r$1,g$1,b$1,a];
        }

        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb

        throw new Error(("unknown hex color: " + hex));
    };

    var hex2rgb_1 = hex2rgb;

    var type$5 = utils.type;




    Color_1.prototype.hex = function(mode) {
        return rgb2hex_1(this._rgb, mode);
    };

    chroma_1.hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hex']) ));
    };

    input.format.hex = hex2rgb_1;
    input.autodetect.push({
        p: 4,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$5(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
                return 'hex';
            }
        }
    });

    var unpack$d = utils.unpack;
    var TWOPI = utils.TWOPI;
    var min = Math.min;
    var sqrt = Math.sqrt;
    var acos = Math.acos;

    var rgb2hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */
        var ref = unpack$d(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min(r,g,b);
        var i = (r+g+b) / 3;
        var s = i > 0 ? 1 - min_/i : 0;
        if (s === 0) {
            h = NaN;
        } else {
            h = ((r-g)+(r-b)) / 2;
            h /= sqrt((r-g)*(r-g) + (r-b)*(g-b));
            h = acos(h);
            if (b > g) {
                h = TWOPI - h;
            }
            h /= TWOPI;
        }
        return [h*360,s,i];
    };

    var rgb2hsi_1 = rgb2hsi;

    var unpack$e = utils.unpack;
    var limit$1 = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos = Math.cos;

    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */
    var hsi2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */
        args = unpack$e(args, 'hsi');
        var h = args[0];
        var s = args[1];
        var i = args[2];
        var r,g,b;

        if (isNaN(h)) { h = 0; }
        if (isNaN(s)) { s = 0; }
        // normalize hue
        if (h > 360) { h -= 360; }
        if (h < 0) { h += 360; }
        h /= 360;
        if (h < 1/3) {
            b = (1-s)/3;
            r = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            g = 1 - (b+r);
        } else if (h < 2/3) {
            h -= 1/3;
            r = (1-s)/3;
            g = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            b = 1 - (r+g);
        } else {
            h -= 2/3;
            g = (1-s)/3;
            b = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            r = 1 - (g+b);
        }
        r = limit$1(i*r*3);
        g = limit$1(i*g*3);
        b = limit$1(i*b*3);
        return [r*255, g*255, b*255, args.length > 3 ? args[3] : 1];
    };

    var hsi2rgb_1 = hsi2rgb;

    var unpack$f = utils.unpack;
    var type$6 = utils.type;






    Color_1.prototype.hsi = function() {
        return rgb2hsi_1(this._rgb);
    };

    chroma_1.hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsi']) ));
    };

    input.format.hsi = hsi2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$f(args, 'hsi');
            if (type$6(args) === 'array' && args.length === 3) {
                return 'hsi';
            }
        }
    });

    var unpack$g = utils.unpack;
    var type$7 = utils.type;






    Color_1.prototype.hsl = function() {
        return rgb2hsl_1(this._rgb);
    };

    chroma_1.hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsl']) ));
    };

    input.format.hsl = hsl2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$g(args, 'hsl');
            if (type$7(args) === 'array' && args.length === 3) {
                return 'hsl';
            }
        }
    });

    var unpack$h = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;

    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */
    var rgb2hsl$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$h(args, 'rgb');
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h,s,v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) { h = (g - b) / delta; }
            if (g === max_) { h = 2+(b - r) / delta; }
            if (b === max_) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, s, v]
    };

    var rgb2hsv = rgb2hsl$1;

    var unpack$i = utils.unpack;
    var floor$1 = Math.floor;

    var hsv2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$i(args, 'hsv');
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r,g,b;
        v *= 255;
        if (s === 0) {
            r = g = b = v;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;

            var i = floor$1(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));

            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r,g,b,args.length > 3?args[3]:1];
    };

    var hsv2rgb_1 = hsv2rgb;

    var unpack$j = utils.unpack;
    var type$8 = utils.type;






    Color_1.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
    };

    chroma_1.hsv = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsv']) ));
    };

    input.format.hsv = hsv2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$j(args, 'hsv');
            if (type$8(args) === 'array' && args.length === 3) {
                return 'hsv';
            }
        }
    });

    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,  // 4 / 29
        t1: 0.206896552,  // 6 / 29
        t2: 0.12841855,   // 3 * t1 * t1
        t3: 0.008856452,  // t1 * t1 * t1
    };

    var unpack$k = utils.unpack;
    var pow = Math.pow;

    var rgb2lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$k(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r,g,b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };

    var rgb_xyz = function (r) {
        if ((r /= 255) <= 0.04045) { return r / 12.92; }
        return pow((r + 0.055) / 1.055, 2.4);
    };

    var xyz_lab = function (t) {
        if (t > labConstants.t3) { return pow(t, 1 / 3); }
        return t / labConstants.t2 + labConstants.t0;
    };

    var rgb2xyz = function (r,g,b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / labConstants.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / labConstants.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / labConstants.Zn);
        return [x,y,z];
    };

    var rgb2lab_1 = rgb2lab;

    var unpack$l = utils.unpack;
    var pow$1 = Math.pow;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var lab2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$l(args, 'lab');
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x,y,z, r,g,b_;

        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;

        y = labConstants.Yn * lab_xyz(y);
        x = labConstants.Xn * lab_xyz(x);
        z = labConstants.Zn * lab_xyz(z);

        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

        return [r,g,b_,args.length > 3 ? args[3] : 1];
    };

    var xyz_rgb = function (r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055)
    };

    var lab_xyz = function (t) {
        return t > labConstants.t1 ? t * t * t : labConstants.t2 * (t - labConstants.t0)
    };

    var lab2rgb_1 = lab2rgb;

    var unpack$m = utils.unpack;
    var type$9 = utils.type;






    Color_1.prototype.lab = function() {
        return rgb2lab_1(this._rgb);
    };

    chroma_1.lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lab']) ));
    };

    input.format.lab = lab2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$m(args, 'lab');
            if (type$9(args) === 'array' && args.length === 3) {
                return 'lab';
            }
        }
    });

    var unpack$n = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$1 = Math.sqrt;
    var atan2 = Math.atan2;
    var round$4 = Math.round;

    var lab2lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$n(args, 'lab');
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$1(a * a + b * b);
        var h = (atan2(b, a) * RAD2DEG + 360) % 360;
        if (round$4(c*10000) === 0) { h = Number.NaN; }
        return [l, c, h];
    };

    var lab2lch_1 = lab2lch;

    var unpack$o = utils.unpack;



    var rgb2lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$o(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab_1(r,g,b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch_1(l,a,b_);
    };

    var rgb2lch_1 = rgb2lch;

    var unpack$p = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin = Math.sin;
    var cos$1 = Math.cos;

    var lch2lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */
        var ref = unpack$p(args, 'lch');
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) { h = 0; }
        h = h * DEG2RAD;
        return [l, cos$1(h) * c, sin(h) * c]
    };

    var lch2lab_1 = lch2lab;

    var unpack$q = utils.unpack;



    var lch2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$q(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab_1 (l,c,h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb_1 (L,a,b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var lch2rgb_1 = lch2rgb;

    var unpack$r = utils.unpack;


    var hcl2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hcl = unpack$r(args, 'hcl').reverse();
        return lch2rgb_1.apply(void 0, hcl);
    };

    var hcl2rgb_1 = hcl2rgb;

    var unpack$s = utils.unpack;
    var type$a = utils.type;






    Color_1.prototype.lch = function() { return rgb2lch_1(this._rgb); };
    Color_1.prototype.hcl = function() { return rgb2lch_1(this._rgb).reverse(); };

    chroma_1.lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lch']) ));
    };
    chroma_1.hcl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcl']) ));
    };

    input.format.lch = lch2rgb_1;
    input.format.hcl = hcl2rgb_1;

    ['lch','hcl'].forEach(function (m) { return input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$s(args, m);
            if (type$a(args) === 'array' && args.length === 3) {
                return m;
            }
        }
    }); });

    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */

    var w3cx11 = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflower: '#6495ed',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        laserlemon: '#ffff54',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrod: '#fafad2',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        maroon2: '#7f0000',
        maroon3: '#b03060',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        purple2: '#7f007f',
        purple3: '#a020f0',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    var w3cx11_1 = w3cx11;

    var type$b = utils.type;





    Color_1.prototype.name = function() {
        var hex = rgb2hex_1(this._rgb, 'rgb');
        for (var i = 0, list = Object.keys(w3cx11_1); i < list.length; i += 1) {
            var n = list[i];

            if (w3cx11_1[n] === hex) { return n.toLowerCase(); }
        }
        return hex;
    };

    input.format.named = function (name) {
        name = name.toLowerCase();
        if (w3cx11_1[name]) { return hex2rgb_1(w3cx11_1[name]); }
        throw new Error('unknown color name: '+name);
    };

    input.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$b(h) === 'string' && w3cx11_1[h.toLowerCase()]) {
                return 'named';
            }
        }
    });

    var unpack$t = utils.unpack;

    var rgb2num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$t(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
    };

    var rgb2num_1 = rgb2num;

    var type$c = utils.type;

    var num2rgb = function (num) {
        if (type$c(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
            var r = num >> 16;
            var g = (num >> 8) & 0xFF;
            var b = num & 0xFF;
            return [r,g,b,1];
        }
        throw new Error("unknown num color: "+num);
    };

    var num2rgb_1 = num2rgb;

    var type$d = utils.type;



    Color_1.prototype.num = function() {
        return rgb2num_1(this._rgb);
    };

    chroma_1.num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['num']) ));
    };

    input.format.num = num2rgb_1;

    input.autodetect.push({
        p: 5,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            if (args.length === 1 && type$d(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
                return 'num';
            }
        }
    });

    var unpack$u = utils.unpack;
    var type$e = utils.type;
    var round$5 = Math.round;

    Color_1.prototype.rgb = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        if (rnd === false) { return this._rgb.slice(0,3); }
        return this._rgb.slice(0,3).map(round$5);
    };

    Color_1.prototype.rgba = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        return this._rgb.slice(0,4).map(function (v,i) {
            return i<3 ? (rnd === false ? v : round$5(v)) : v;
        });
    };

    chroma_1.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['rgb']) ));
    };

    input.format.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$u(args, 'rgba');
        if (rgba[3] === undefined) { rgba[3] = 1; }
        return rgba;
    };

    input.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$u(args, 'rgba');
            if (type$e(args) === 'array' && (args.length === 3 ||
                args.length === 4 && type$e(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
                return 'rgb';
            }
        }
    });

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */

    var log = Math.log;

    var temperature2rgb = function (kelvin) {
        var temp = kelvin / 100;
        var r,g,b;
        if (temp < 66) {
            r = 255;
            g = -155.25485562709179 - 0.44596950469579133 * (g = temp-2) + 104.49216199393888 * log(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp-10) + 115.67994401066147 * log(b);
        } else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp-55) - 40.25366309332127 * log(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp-50) - 28.0852963507957 * log(g);
            b = 255;
        }
        return [r,g,b,1];
    };

    var temperature2rgb_1 = temperature2rgb;

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/


    var unpack$v = utils.unpack;
    var round$6 = Math.round;

    var rgb2temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$v(args, 'rgb');
        var r = rgb[0], b = rgb[2];
        var minTemp = 1000;
        var maxTemp = 40000;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
            temp = (maxTemp + minTemp) * 0.5;
            var rgb$1 = temperature2rgb_1(temp);
            if ((rgb$1[2] / rgb$1[0]) >= (b / r)) {
                maxTemp = temp;
            } else {
                minTemp = temp;
            }
        }
        return round$6(temp);
    };

    var rgb2temperature_1 = rgb2temperature;

    Color_1.prototype.temp =
    Color_1.prototype.kelvin =
    Color_1.prototype.temperature = function() {
        return rgb2temperature_1(this._rgb);
    };

    chroma_1.temp =
    chroma_1.kelvin =
    chroma_1.temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['temp']) ));
    };

    input.format.temp =
    input.format.kelvin =
    input.format.temperature = temperature2rgb_1;

    var type$f = utils.type;

    Color_1.prototype.alpha = function(a, mutate) {
        if ( mutate === void 0 ) mutate=false;

        if (a !== undefined && type$f(a) === 'number') {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color_1([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
        }
        return this._rgb[3];
    };

    Color_1.prototype.clipped = function() {
        return this._rgb._clipped || false;
    };

    Color_1.prototype.darken = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lab = me.lab();
    	lab[0] -= labConstants.Kn * amount;
    	return new Color_1(lab, 'lab').alpha(me.alpha(), true);
    };

    Color_1.prototype.brighten = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.darken(-amount);
    };

    Color_1.prototype.darker = Color_1.prototype.darken;
    Color_1.prototype.brighter = Color_1.prototype.brighten;

    Color_1.prototype.get = function(mc) {
        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel);
            if (i > -1) { return src[i]; }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var type$g = utils.type;
    var pow$2 = Math.pow;

    var EPS = 1e-7;
    var MAX_ITER = 20;

    Color_1.prototype.luminance = function(lum) {
        if (lum !== undefined && type$g(lum) === 'number') {
            if (lum === 0) {
                // return pure black
                return new Color_1([0,0,0,this._rgb[3]], 'rgb');
            }
            if (lum === 1) {
                // return pure white
                return new Color_1([255,255,255,this._rgb[3]], 'rgb');
            }
            // compute new color using...
            var cur_lum = this.luminance();
            var mode = 'rgb';
            var max_iter = MAX_ITER;

            var test = function (low, high) {
                var mid = low.interpolate(high, 0.5, mode);
                var lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) {
                    // close enough
                    return mid;
                }
                return lm > lum ? test(low, mid) : test(mid, high);
            };

            var rgb = (cur_lum > lum ? test(new Color_1([0,0,0]), this) : test(this, new Color_1([255,255,255]))).rgb();
            return new Color_1(rgb.concat( [this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, (this._rgb).slice(0,3));
    };


    var rgb2luminance = function (r,g,b) {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    var luminance_x = function (x) {
        x /= 255;
        return x <= 0.03928 ? x/12.92 : pow$2((x+0.055)/1.055, 2.4);
    };

    var interpolator = {};

    var type$h = utils.type;


    var mix = function (col1, col2, f) {
        if ( f === void 0 ) f=0.5;
        var rest = [], len = arguments.length - 3;
        while ( len-- > 0 ) rest[ len ] = arguments[ len + 3 ];

        var mode = rest[0] || 'lrgb';
        if (!interpolator[mode] && !rest.length) {
            // fall back to the first supported mode
            mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
            throw new Error(("interpolation mode " + mode + " is not defined"));
        }
        if (type$h(col1) !== 'object') { col1 = new Color_1(col1); }
        if (type$h(col2) !== 'object') { col2 = new Color_1(col2); }
        return interpolator[mode](col1, col2, f)
            .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };

    Color_1.prototype.mix =
    Color_1.prototype.interpolate = function(col2, f) {
    	if ( f === void 0 ) f=0.5;
    	var rest = [], len = arguments.length - 2;
    	while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

    	return mix.apply(void 0, [ this, col2, f ].concat( rest ));
    };

    Color_1.prototype.premultiply = function(mutate) {
    	if ( mutate === void 0 ) mutate=false;

    	var rgb = this._rgb;
    	var a = rgb[3];
    	if (mutate) {
    		this._rgb = [rgb[0]*a, rgb[1]*a, rgb[2]*a, a];
    		return this;
    	} else {
    		return new Color_1([rgb[0]*a, rgb[1]*a, rgb[2]*a, a], 'rgb');
    	}
    };

    Color_1.prototype.saturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lch = me.lch();
    	lch[1] += labConstants.Kn * amount;
    	if (lch[1] < 0) { lch[1] = 0; }
    	return new Color_1(lch, 'lch').alpha(me.alpha(), true);
    };

    Color_1.prototype.desaturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.saturate(-amount);
    };

    var type$i = utils.type;

    Color_1.prototype.set = function(mc, value, mutate) {
        if ( mutate === void 0 ) mutate=false;

        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel);
            if (i > -1) {
                if (type$i(value) == 'string') {
                    switch(value.charAt(0)) {
                        case '+': src[i] += +value; break;
                        case '-': src[i] += +value; break;
                        case '*': src[i] *= +(value.substr(1)); break;
                        case '/': src[i] /= +(value.substr(1)); break;
                        default: src[i] = +value;
                    }
                } else if (type$i(value) === 'number') {
                    src[i] = value;
                } else {
                    throw new Error("unsupported value for Color.set");
                }
                var out = new Color_1(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var rgb$1 = function (col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color_1(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'rgb'
        )
    };

    // register interpolator
    interpolator.rgb = rgb$1;

    var sqrt$2 = Math.sqrt;
    var pow$3 = Math.pow;

    var lrgb = function (col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color_1(
            sqrt$2(pow$3(x1,2) * (1-f) + pow$3(x2,2) * f),
            sqrt$2(pow$3(y1,2) * (1-f) + pow$3(y2,2) * f),
            sqrt$2(pow$3(z1,2) * (1-f) + pow$3(z2,2) * f),
            'rgb'
        )
    };

    // register interpolator
    interpolator.lrgb = lrgb;

    var lab$1 = function (col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color_1(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'lab'
        )
    };

    // register interpolator
    interpolator.lab = lab$1;

    var _hsx = function (col1, col2, f, m) {
        var assign, assign$1;

        var xyz0, xyz1;
        if (m === 'hsl') {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === 'hsv') {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === 'hcg') {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === 'hsi') {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === 'lch' || m === 'hcl') {
            m = 'hcl';
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        }

        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === 'h') {
            (assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2]);
            (assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2]);
        }

        var sat, hue, lbv, dh;

        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) {
                dh = hue1-(hue0+360);
            } else if (hue1 < hue0 && hue0 - hue1 > 180) {
                dh = hue1+360-hue0;
            } else{
                dh = hue1 - hue0;
            }
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') { sat = sat0; }
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') { sat = sat1; }
        } else {
            hue = Number.NaN;
        }

        if (sat === undefined) { sat = sat0 + f * (sat1 - sat0); }
        lbv = lbv0 + f * (lbv1-lbv0);
        return new Color_1([hue, sat, lbv], m);
    };

    var lch$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'lch');
    };

    // register interpolator
    interpolator.lch = lch$1;
    interpolator.hcl = lch$1;

    var num$1 = function (col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color_1(c1 + f * (c2-c1), 'num')
    };

    // register interpolator
    interpolator.num = num$1;

    var hcg$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hcg');
    };

    // register interpolator
    interpolator.hcg = hcg$1;

    var hsi$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsi');
    };

    // register interpolator
    interpolator.hsi = hsi$1;

    var hsl$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsl');
    };

    // register interpolator
    interpolator.hsl = hsl$1;

    var hsv$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsv');
    };

    // register interpolator
    interpolator.hsv = hsv$1;

    var clip_rgb$2 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$3 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$1 = Math.sin;
    var atan2$1 = Math.atan2;

    var average = function (colors, mode, weights) {
        if ( mode === void 0 ) mode='lrgb';
        if ( weights === void 0 ) weights=null;

        var l = colors.length;
        if (!weights) { weights = Array.from(new Array(l)).map(function () { return 1; }); }
        // normalize weights
        var k = l / weights.reduce(function(a, b) { return a + b; });
        weights.forEach(function (w,i) { weights[i] *= k; });
        // convert colors to Color objects
        colors = colors.map(function (c) { return new Color_1(c); });
        if (mode === 'lrgb') {
            return _average_lrgb(colors, weights)
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        // initial color
        for (var i=0; i<xyz.length; i++) {
            xyz[i] = (xyz[i] || 0) * weights[0];
            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
            if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
                var A = xyz[i] / 180 * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$1(A) * weights[0];
            }
        }

        var alpha = first.alpha() * weights[0];
        colors.forEach(function (c,ci) {
            var xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci+1];
            for (var i=0; i<xyz.length; i++) {
                if (!isNaN(xyz2[i])) {
                    cnt[i] += weights[ci+1];
                    if (mode.charAt(i) === 'h') {
                        var A = xyz2[i] / 180 * PI$1;
                        dx += cos$2(A) * weights[ci+1];
                        dy += sin$1(A) * weights[ci+1];
                    } else {
                        xyz[i] += xyz2[i] * weights[ci+1];
                    }
                }
            }
        });

        for (var i$1=0; i$1<xyz.length; i$1++) {
            if (mode.charAt(i$1) === 'h') {
                var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
                while (A$1 < 0) { A$1 += 360; }
                while (A$1 >= 360) { A$1 -= 360; }
                xyz[i$1] = A$1;
            } else {
                xyz[i$1] = xyz[i$1]/cnt[i$1];
            }
        }
        alpha /= l;
        return (new Color_1(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };


    var _average_lrgb = function (colors, weights) {
        var l = colors.length;
        var xyz = [0,0,0,0];
        for (var i=0; i < colors.length; i++) {
            var col = colors[i];
            var f = weights[i] / l;
            var rgb = col._rgb;
            xyz[0] += pow$4(rgb[0],2) * f;
            xyz[1] += pow$4(rgb[1],2) * f;
            xyz[2] += pow$4(rgb[2],2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$3(xyz[0]);
        xyz[1] = sqrt$3(xyz[1]);
        xyz[2] = sqrt$3(xyz[2]);
        if (xyz[3] > 0.9999999) { xyz[3] = 1; }
        return new Color_1(clip_rgb$2(xyz));
    };

    // minimal multi-purpose interface

    // @requires utils color analyze


    var type$j = utils.type;

    var pow$5 = Math.pow;

    var scale = function(colors) {

        // constructor
        var _mode = 'rgb';
        var _nacol = chroma_1('#ccc');
        var _spread = 0;
        // const _fixed = false;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0,0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;

        // private methods

        var setColors = function(colors) {
            colors = colors || ['#fff', '#000'];
            if (colors && type$j(colors) === 'string' && chroma_1.brewer &&
                chroma_1.brewer[colors.toLowerCase()]) {
                colors = chroma_1.brewer[colors.toLowerCase()];
            }
            if (type$j(colors) === 'array') {
                // handle single color
                if (colors.length === 1) {
                    colors = [colors[0], colors[0]];
                }
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for (var c=0; c<colors.length; c++) {
                    colors[c] = chroma_1(colors[c]);
                }
                // auto-fill color position
                _pos.length = 0;
                for (var c$1=0; c$1<colors.length; c$1++) {
                    _pos.push(c$1/(colors.length-1));
                }
            }
            resetCache();
            return _colors = colors;
        };

        var getClass = function(value) {
            if (_classes != null) {
                var n = _classes.length-1;
                var i = 0;
                while (i < n && value >= _classes[i]) {
                    i++;
                }
                return i-1;
            }
            return 0;
        };

        var tMapLightness = function (t) { return t; };
        var tMapDomain = function (t) { return t; };

        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };

        var getColor = function(val, bypassMap) {
            var col, t;
            if (bypassMap == null) { bypassMap = false; }
            if (isNaN(val) || (val === null)) { return _nacol; }
            if (!bypassMap) {
                if (_classes && (_classes.length > 2)) {
                    // find the class
                    var c = getClass(val);
                    t = c / (_classes.length-2);
                } else if (_max !== _min) {
                    // just interpolate between min/max
                    t = (val - _min) / (_max - _min);
                } else {
                    t = 1;
                }
            } else {
                t = val;
            }

            // domain map
            t = tMapDomain(t);

            if (!bypassMap) {
                t = tMapLightness(t);  // lightness correction
            }

            if (_gamma !== 1) { t = pow$5(t, _gamma); }

            t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));

            t = Math.min(1, Math.max(0, t));

            var k = Math.floor(t * 10000);

            if (_useCache && _colorCache[k]) {
                col = _colorCache[k];
            } else {
                if (type$j(_colors) === 'array') {
                    //for i in [0.._pos.length-1]
                    for (var i=0; i<_pos.length; i++) {
                        var p = _pos[i];
                        if (t <= p) {
                            col = _colors[i];
                            break;
                        }
                        if ((t >= p) && (i === (_pos.length-1))) {
                            col = _colors[i];
                            break;
                        }
                        if (t > p && t < _pos[i+1]) {
                            t = (t-p)/(_pos[i+1]-p);
                            col = chroma_1.interpolate(_colors[i], _colors[i+1], t, _mode);
                            break;
                        }
                    }
                } else if (type$j(_colors) === 'function') {
                    col = _colors(t);
                }
                if (_useCache) { _colorCache[k] = col; }
            }
            return col;
        };

        var resetCache = function () { return _colorCache = {}; };

        setColors(colors);

        // public interface

        var f = function(v) {
            var c = chroma_1(getColor(v));
            if (_out && c[_out]) { return c[_out](); } else { return c; }
        };

        f.classes = function(classes) {
            if (classes != null) {
                if (type$j(classes) === 'array') {
                    _classes = classes;
                    _domain = [classes[0], classes[classes.length-1]];
                } else {
                    var d = chroma_1.analyze(_domain);
                    if (classes === 0) {
                        _classes = [d.min, d.max];
                    } else {
                        _classes = chroma_1.limits(d, 'e', classes);
                    }
                }
                return f;
            }
            return _classes;
        };


        f.domain = function(domain) {
            if (!arguments.length) {
                return _domain;
            }
            _min = domain[0];
            _max = domain[domain.length-1];
            _pos = [];
            var k = _colors.length;
            if ((domain.length === k) && (_min !== _max)) {
                // update positions
                for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
                    var d = list[i];

                  _pos.push((d-_min) / (_max-_min));
                }
            } else {
                for (var c=0; c<k; c++) {
                    _pos.push(c/(k-1));
                }
                if (domain.length > 2) {
                    // set domain map
                    var tOut = domain.map(function (d,i) { return i/(domain.length-1); });
                    var tBreaks = domain.map(function (d) { return (d - _min) / (_max - _min); });
                    if (!tBreaks.every(function (val, i) { return tOut[i] === val; })) {
                        tMapDomain = function (t) {
                            if (t <= 0 || t >= 1) { return t; }
                            var i = 0;
                            while (t >= tBreaks[i+1]) { i++; }
                            var f = (t - tBreaks[i]) / (tBreaks[i+1] - tBreaks[i]);
                            var out = tOut[i] + f * (tOut[i+1] - tOut[i]);
                            return out;
                        };
                    }

                }
            }
            _domain = [_min, _max];
            return f;
        };

        f.mode = function(_m) {
            if (!arguments.length) {
                return _mode;
            }
            _mode = _m;
            resetCache();
            return f;
        };

        f.range = function(colors, _pos) {
            setColors(colors, _pos);
            return f;
        };

        f.out = function(_o) {
            _out = _o;
            return f;
        };

        f.spread = function(val) {
            if (!arguments.length) {
                return _spread;
            }
            _spread = val;
            return f;
        };

        f.correctLightness = function(v) {
            if (v == null) { v = true; }
            _correctLightness = v;
            resetCache();
            if (_correctLightness) {
                tMapLightness = function(t) {
                    var L0 = getColor(0, true).lab()[0];
                    var L1 = getColor(1, true).lab()[0];
                    var pol = L0 > L1;
                    var L_actual = getColor(t, true).lab()[0];
                    var L_ideal = L0 + ((L1 - L0) * t);
                    var L_diff = L_actual - L_ideal;
                    var t0 = 0;
                    var t1 = 1;
                    var max_iter = 20;
                    while ((Math.abs(L_diff) > 1e-2) && (max_iter-- > 0)) {
                        (function() {
                            if (pol) { L_diff *= -1; }
                            if (L_diff < 0) {
                                t0 = t;
                                t += (t1 - t) * 0.5;
                            } else {
                                t1 = t;
                                t += (t0 - t) * 0.5;
                            }
                            L_actual = getColor(t, true).lab()[0];
                            return L_diff = L_actual - L_ideal;
                        })();
                    }
                    return t;
                };
            } else {
                tMapLightness = function (t) { return t; };
            }
            return f;
        };

        f.padding = function(p) {
            if (p != null) {
                if (type$j(p) === 'number') {
                    p = [p,p];
                }
                _padding = p;
                return f;
            } else {
                return _padding;
            }
        };

        f.colors = function(numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) { out = 'hex'; }
            var result = [];

            if (arguments.length === 0) {
                result = _colors.slice(0);

            } else if (numColors === 1) {
                result = [f(0.5)];

            } else if (numColors > 1) {
                var dm = _domain[0];
                var dd = _domain[1] - dm;
                result = __range__(0, numColors, false).map(function (i) { return f( dm + ((i/(numColors-1)) * dd) ); });

            } else { // returns all colors based on the defined classes
                colors = [];
                var samples = [];
                if (_classes && (_classes.length > 2)) {
                    for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                        samples.push((_classes[i-1]+_classes[i])*0.5);
                    }
                } else {
                    samples = _domain;
                }
                result = samples.map(function (v) { return f(v); });
            }

            if (chroma_1[out]) {
                result = result.map(function (c) { return c[out](); });
            }
            return result;
        };

        f.cache = function(c) {
            if (c != null) {
                _useCache = c;
                return f;
            } else {
                return _useCache;
            }
        };

        f.gamma = function(g) {
            if (g != null) {
                _gamma = g;
                return f;
            } else {
                return _gamma;
            }
        };

        f.nodata = function(d) {
            if (d != null) {
                _nacol = chroma_1(d);
                return f;
            } else {
                return _nacol;
            }
        };

        return f;
    };

    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
      }
      return range;
    }

    //
    // interpolates between a set of colors uzing a bezier spline
    //

    // @requires utils lab




    var bezier = function(colors) {
        var assign, assign$1, assign$2;

        var I, lab0, lab1, lab2;
        colors = colors.map(function (c) { return new Color_1(c); });
        if (colors.length === 2) {
            // linear interpolation
            (assign = colors.map(function (c) { return c.lab(); }), lab0 = assign[0], lab1 = assign[1]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return lab0[i] + (t * (lab1[i] - lab0[i])); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 3) {
            // quadratic bezier interpolation
            (assign$1 = colors.map(function (c) { return c.lab(); }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t) * lab0[i]) + (2 * (1-t) * t * lab1[i]) + (t * t * lab2[i]); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            var lab3;
            (assign$2 = colors.map(function (c) { return c.lab(); }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t)*(1-t) * lab0[i]) + (3 * (1-t) * (1-t) * t * lab1[i]) + (3 * (1-t) * t * t * lab2[i]) + (t*t*t * lab3[i]); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 5) {
            var I0 = bezier(colors.slice(0, 3));
            var I1 = bezier(colors.slice(2, 5));
            I = function(t) {
                if (t < 0.5) {
                    return I0(t*2);
                } else {
                    return I1((t-0.5)*2);
                }
            };
        }
        return I;
    };

    var bezier_1 = function (colors) {
        var f = bezier(colors);
        f.scale = function () { return scale(f); };
        return f;
    };

    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */




    var blend = function (bottom, top, mode) {
        if (!blend[mode]) {
            throw new Error('unknown blend mode ' + mode);
        }
        return blend[mode](bottom, top);
    };

    var blend_f = function (f) { return function (bottom,top) {
            var c0 = chroma_1(top).rgb();
            var c1 = chroma_1(bottom).rgb();
            return chroma_1.rgb(f(c0, c1));
        }; };

    var each = function (f) { return function (c0, c1) {
            var out = [];
            out[0] = f(c0[0], c1[0]);
            out[1] = f(c0[1], c1[1]);
            out[2] = f(c0[2], c1[2]);
            return out;
        }; };

    var normal = function (a) { return a; };
    var multiply = function (a,b) { return a * b / 255; };
    var darken$1 = function (a,b) { return a > b ? b : a; };
    var lighten = function (a,b) { return a > b ? a : b; };
    var screen = function (a,b) { return 255 * (1 - (1-a/255) * (1-b/255)); };
    var overlay = function (a,b) { return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255 ) * ( 1 - b / 255 )); };
    var burn = function (a,b) { return 255 * (1 - (1 - b / 255) / (a/255)); };
    var dodge = function (a,b) {
        if (a === 255) { return 255; }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a
    };

    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b

    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken$1));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    // blend.add = blend_f(each(add));

    var blend_1 = blend;

    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf

    var type$k = utils.type;
    var clip_rgb$3 = utils.clip_rgb;
    var TWOPI$2 = utils.TWOPI;
    var pow$6 = Math.pow;
    var sin$2 = Math.sin;
    var cos$3 = Math.cos;


    var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if ( start === void 0 ) start=300;
        if ( rotations === void 0 ) rotations=-1.5;
        if ( hue === void 0 ) hue=1;
        if ( gamma === void 0 ) gamma=1;
        if ( lightness === void 0 ) lightness=[0,1];

        var dh = 0, dl;
        if (type$k(lightness) === 'array') {
            dl = lightness[1] - lightness[0];
        } else {
            dl = 0;
            lightness = [lightness, lightness];
        }

        var f = function(fract) {
            var a = TWOPI$2 * (((start+120)/360) + (rotations * fract));
            var l = pow$6(lightness[0] + (dl * fract), gamma);
            var h = dh !== 0 ? hue[0] + (fract * dh) : hue;
            var amp = (h * l * (1-l)) / 2;
            var cos_a = cos$3(a);
            var sin_a = sin$2(a);
            var r = l + (amp * ((-0.14861 * cos_a) + (1.78277* sin_a)));
            var g = l + (amp * ((-0.29227 * cos_a) - (0.90649* sin_a)));
            var b = l + (amp * (+1.97294 * cos_a));
            return chroma_1(clip_rgb$3([r*255,g*255,b*255,1]));
        };

        f.start = function(s) {
            if ((s == null)) { return start; }
            start = s;
            return f;
        };

        f.rotations = function(r) {
            if ((r == null)) { return rotations; }
            rotations = r;
            return f;
        };

        f.gamma = function(g) {
            if ((g == null)) { return gamma; }
            gamma = g;
            return f;
        };

        f.hue = function(h) {
            if ((h == null)) { return hue; }
            hue = h;
            if (type$k(hue) === 'array') {
                dh = hue[1] - hue[0];
                if (dh === 0) { hue = hue[1]; }
            } else {
                dh = 0;
            }
            return f;
        };

        f.lightness = function(h) {
            if ((h == null)) { return lightness; }
            if (type$k(h) === 'array') {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [h,h];
                dl = 0;
            }
            return f;
        };

        f.scale = function () { return chroma_1.scale(f); };

        f.hue(hue);

        return f;
    };

    var digits = '0123456789abcdef';

    var floor$2 = Math.floor;
    var random = Math.random;

    var random_1 = function () {
        var code = '#';
        for (var i=0; i<6; i++) {
            code += digits.charAt(floor$2(random() * 16));
        }
        return new Color_1(code, 'hex');
    };

    var log$1 = Math.log;
    var pow$7 = Math.pow;
    var floor$3 = Math.floor;
    var abs = Math.abs;


    var analyze = function (data, key) {
        if ( key === void 0 ) key=null;

        var r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE*-1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === 'object') {
            data = Object.values(data);
        }
        data.forEach(function (val) {
            if (key && type(val) === 'object') { val = val[key]; }
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) { r.min = val; }
                if (val > r.max) { r.max = val; }
                r.count += 1;
            }
        });

        r.domain = [r.min, r.max];

        r.limits = function (mode, num) { return limits(r, mode, num); };

        return r;
    };


    var limits = function (data, mode, num) {
        if ( mode === void 0 ) mode='equal';
        if ( num === void 0 ) num=7;

        if (type(data) == 'array') {
            data = analyze(data);
        }
        var min = data.min;
        var max = data.max;
        var values = data.values.sort(function (a,b) { return a-b; });

        if (num === 1) { return [min,max]; }

        var limits = [];

        if (mode.substr(0,1) === 'c') { // continuous
            limits.push(min);
            limits.push(max);
        }

        if (mode.substr(0,1) === 'e') { // equal interval
            limits.push(min);
            for (var i=1; i<num; i++) {
                limits.push(min+((i/num)*(max-min)));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'l') { // log scale
            if (min <= 0) {
                throw new Error('Logarithmic scales are only possible for values > 0');
            }
            var min_log = Math.LOG10E * log$1(min);
            var max_log = Math.LOG10E * log$1(max);
            limits.push(min);
            for (var i$1=1; i$1<num; i$1++) {
                limits.push(pow$7(10, min_log + ((i$1/num) * (max_log - min_log))));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'q') { // quantile scale
            limits.push(min);
            for (var i$2=1; i$2<num; i$2++) {
                var p = ((values.length-1) * i$2)/num;
                var pb = floor$3(p);
                if (pb === p) {
                    limits.push(values[pb]);
                } else { // p > pb
                    var pr = p - pb;
                    limits.push((values[pb]*(1-pr)) + (values[pb+1]*pr));
                }
            }
            limits.push(max);

        }

        else if (mode.substr(0,1) === 'k') { // k-means clustering
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */
            var cluster;
            var n = values.length;
            var assignments = new Array(n);
            var clusterSizes = new Array(num);
            var repeat = true;
            var nb_iters = 0;
            var centroids = null;

            // get seed values
            centroids = [];
            centroids.push(min);
            for (var i$3=1; i$3<num; i$3++) {
                centroids.push(min + ((i$3/num) * (max-min)));
            }
            centroids.push(max);

            while (repeat) {
                // assignment step
                for (var j=0; j<num; j++) {
                    clusterSizes[j] = 0;
                }
                for (var i$4=0; i$4<n; i$4++) {
                    var value = values[i$4];
                    var mindist = Number.MAX_VALUE;
                    var best = (void 0);
                    for (var j$1=0; j$1<num; j$1++) {
                        var dist = abs(centroids[j$1]-value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j$1;
                        }
                        clusterSizes[best]++;
                        assignments[i$4] = best;
                    }
                }

                // update centroids step
                var newCentroids = new Array(num);
                for (var j$2=0; j$2<num; j$2++) {
                    newCentroids[j$2] = null;
                }
                for (var i$5=0; i$5<n; i$5++) {
                    cluster = assignments[i$5];
                    if (newCentroids[cluster] === null) {
                        newCentroids[cluster] = values[i$5];
                    } else {
                        newCentroids[cluster] += values[i$5];
                    }
                }
                for (var j$3=0; j$3<num; j$3++) {
                    newCentroids[j$3] *= 1/clusterSizes[j$3];
                }

                // check convergence
                repeat = false;
                for (var j$4=0; j$4<num; j$4++) {
                    if (newCentroids[j$4] !== centroids[j$4]) {
                        repeat = true;
                        break;
                    }
                }

                centroids = newCentroids;
                nb_iters++;

                if (nb_iters > 200) {
                    repeat = false;
                }
            }

            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            var kClusters = {};
            for (var j$5=0; j$5<num; j$5++) {
                kClusters[j$5] = [];
            }
            for (var i$6=0; i$6<n; i$6++) {
                cluster = assignments[i$6];
                kClusters[cluster].push(values[i$6]);
            }
            var tmpKMeansBreaks = [];
            for (var j$6=0; j$6<num; j$6++) {
                tmpKMeansBreaks.push(kClusters[j$6][0]);
                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length-1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a,b){ return a-b; });
            limits.push(tmpKMeansBreaks[0]);
            for (var i$7=1; i$7 < tmpKMeansBreaks.length; i$7+= 2) {
                var v = tmpKMeansBreaks[i$7];
                if (!isNaN(v) && (limits.indexOf(v) === -1)) {
                    limits.push(v);
                }
            }
        }
        return limits;
    };

    var analyze_1 = {analyze: analyze, limits: limits};

    var contrast = function (a, b) {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };

    var sqrt$4 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var abs$1 = Math.abs;
    var cos$4 = Math.cos;
    var PI$2 = Math.PI;

    var deltaE = function(a, b, L, C) {
        if ( L === void 0 ) L=1;
        if ( C === void 0 ) C=1;

        // Delta E (CMC)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
        a = new Color_1(a);
        b = new Color_1(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var c1 = sqrt$4((a1 * a1) + (b1 * b1));
        var c2 = sqrt$4((a2 * a2) + (b2 * b2));
        var sl = L1 < 16.0 ? 0.511 : (0.040975 * L1) / (1.0 + (0.01765 * L1));
        var sc = ((0.0638 * c1) / (1.0 + (0.0131 * c1))) + 0.638;
        var h1 = c1 < 0.000001 ? 0.0 : (atan2$2(b1, a1) * 180.0) / PI$2;
        while (h1 < 0) { h1 += 360; }
        while (h1 >= 360) { h1 -= 360; }
        var t = (h1 >= 164.0) && (h1 <= 345.0) ? (0.56 + abs$1(0.2 * cos$4((PI$2 * (h1 + 168.0)) / 180.0))) : (0.36 + abs$1(0.4 * cos$4((PI$2 * (h1 + 35.0)) / 180.0)));
        var c4 = c1 * c1 * c1 * c1;
        var f = sqrt$4(c4 / (c4 + 1900.0));
        var sh = sc * (((f * t) + 1.0) - f);
        var delL = L1 - L2;
        var delC = c1 - c2;
        var delA = a1 - a2;
        var delB = b1 - b2;
        var dH2 = ((delA * delA) + (delB * delB)) - (delC * delC);
        var v1 = delL / (L * sl);
        var v2 = delC / (C * sc);
        var v3 = sh;
        return sqrt$4((v1 * v1) + (v2 * v2) + (dH2 / (v3 * v3)));
    };

    // simple Euclidean distance
    var distance = function(a, b, mode) {
        if ( mode === void 0 ) mode='lab';

        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i in l1) {
            var d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d*d;
        }
        return Math.sqrt(sum_sq);
    };

    var valid = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        try {
            new (Function.prototype.bind.apply( Color_1, [ null ].concat( args) ));
            return true;
        } catch (e) {
            return false;
        }
    };

    // some pre-defined color scales:




    var scales = {
    	cool: function cool() { return scale([chroma_1.hsl(180,1,.9), chroma_1.hsl(250,.7,.4)]) },
    	hot: function hot() { return scale(['#000','#f00','#ff0','#fff'], [0,.25,.75,1]).mode('rgb') }
    };

    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */

    var colorbrewer = {
        // sequential
        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
        Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

        // diverging

        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

        // qualitative

        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],
    };

    // add lowercase aliases for case-insensitive matches
    for (var i$1 = 0, list$1 = Object.keys(colorbrewer); i$1 < list$1.length; i$1 += 1) {
        var key = list$1[i$1];

        colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }

    var colorbrewer_1 = colorbrewer;

    // feel free to comment out anything to rollup
    // a smaller chroma.js built

    // io --> convert colors















    // operators --> modify existing Colors










    // interpolators










    // generators -- > create new colors
    chroma_1.average = average;
    chroma_1.bezier = bezier_1;
    chroma_1.blend = blend_1;
    chroma_1.cubehelix = cubehelix;
    chroma_1.mix = chroma_1.interpolate = mix;
    chroma_1.random = random_1;
    chroma_1.scale = scale;

    // other utility methods
    chroma_1.analyze = analyze_1.analyze;
    chroma_1.contrast = contrast;
    chroma_1.deltaE = deltaE;
    chroma_1.distance = distance;
    chroma_1.limits = analyze_1.limits;
    chroma_1.valid = valid;

    // scale
    chroma_1.scales = scales;

    // colors
    chroma_1.colors = w3cx11_1;
    chroma_1.brewer = colorbrewer_1;

    var chroma_js = chroma_1;

    return chroma_js;

})));


/***/ }),

/***/ "../node_modules/pako/index.js":
/*!*************************************!*\
  !*** ../node_modules/pako/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Top level file is just a mixin of submodules & constants


var assign    = __webpack_require__(/*! ./lib/utils/common */ "../node_modules/pako/lib/utils/common.js").assign;

var deflate   = __webpack_require__(/*! ./lib/deflate */ "../node_modules/pako/lib/deflate.js");
var inflate   = __webpack_require__(/*! ./lib/inflate */ "../node_modules/pako/lib/inflate.js");
var constants = __webpack_require__(/*! ./lib/zlib/constants */ "../node_modules/pako/lib/zlib/constants.js");

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;


/***/ }),

/***/ "../node_modules/pako/lib/deflate.js":
/*!*******************************************!*\
  !*** ../node_modules/pako/lib/deflate.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_deflate = __webpack_require__(/*! ./zlib/deflate */ "../node_modules/pako/lib/zlib/deflate.js");
var utils        = __webpack_require__(/*! ./utils/common */ "../node_modules/pako/lib/utils/common.js");
var strings      = __webpack_require__(/*! ./utils/strings */ "../node_modules/pako/lib/utils/strings.js");
var msg          = __webpack_require__(/*! ./zlib/messages */ "../node_modules/pako/lib/zlib/messages.js");
var ZStream      = __webpack_require__(/*! ./zlib/zstream */ "../node_modules/pako/lib/zlib/zstream.js");

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;


/***/ }),

/***/ "../node_modules/pako/lib/inflate.js":
/*!*******************************************!*\
  !*** ../node_modules/pako/lib/inflate.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_inflate = __webpack_require__(/*! ./zlib/inflate */ "../node_modules/pako/lib/zlib/inflate.js");
var utils        = __webpack_require__(/*! ./utils/common */ "../node_modules/pako/lib/utils/common.js");
var strings      = __webpack_require__(/*! ./utils/strings */ "../node_modules/pako/lib/utils/strings.js");
var c            = __webpack_require__(/*! ./zlib/constants */ "../node_modules/pako/lib/zlib/constants.js");
var msg          = __webpack_require__(/*! ./zlib/messages */ "../node_modules/pako/lib/zlib/messages.js");
var ZStream      = __webpack_require__(/*! ./zlib/zstream */ "../node_modules/pako/lib/zlib/zstream.js");
var GZheader     = __webpack_require__(/*! ./zlib/gzheader */ "../node_modules/pako/lib/zlib/gzheader.js");

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);

  // Setup dictionary
  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) { //In raw mode we need to set the dictionary early
      status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== c.Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;


/***/ }),

/***/ "../node_modules/pako/lib/utils/common.js":
/*!************************************************!*\
  !*** ../node_modules/pako/lib/utils/common.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);


/***/ }),

/***/ "../node_modules/pako/lib/utils/strings.js":
/*!*************************************************!*\
  !*** ../node_modules/pako/lib/utils/strings.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// String encode/decode helpers



var utils = __webpack_require__(/*! ./common */ "../node_modules/pako/lib/utils/common.js");


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};


/***/ }),

/***/ "../node_modules/pako/lib/zlib/adler32.js":
/*!************************************************!*\
  !*** ../node_modules/pako/lib/zlib/adler32.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;


/***/ }),

/***/ "../node_modules/pako/lib/zlib/constants.js":
/*!**************************************************!*\
  !*** ../node_modules/pako/lib/zlib/constants.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};


/***/ }),

/***/ "../node_modules/pako/lib/zlib/crc32.js":
/*!**********************************************!*\
  !*** ../node_modules/pako/lib/zlib/crc32.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;


/***/ }),

/***/ "../node_modules/pako/lib/zlib/deflate.js":
/*!************************************************!*\
  !*** ../node_modules/pako/lib/zlib/deflate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = __webpack_require__(/*! ../utils/common */ "../node_modules/pako/lib/utils/common.js");
var trees   = __webpack_require__(/*! ./trees */ "../node_modules/pako/lib/zlib/trees.js");
var adler32 = __webpack_require__(/*! ./adler32 */ "../node_modules/pako/lib/zlib/adler32.js");
var crc32   = __webpack_require__(/*! ./crc32 */ "../node_modules/pako/lib/zlib/crc32.js");
var msg     = __webpack_require__(/*! ./messages */ "../node_modules/pako/lib/zlib/messages.js");

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/


/***/ }),

/***/ "../node_modules/pako/lib/zlib/gzheader.js":
/*!*************************************************!*\
  !*** ../node_modules/pako/lib/zlib/gzheader.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;


/***/ }),

/***/ "../node_modules/pako/lib/zlib/inffast.js":
/*!************************************************!*\
  !*** ../node_modules/pako/lib/zlib/inffast.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};


/***/ }),

/***/ "../node_modules/pako/lib/zlib/inflate.js":
/*!************************************************!*\
  !*** ../node_modules/pako/lib/zlib/inflate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = __webpack_require__(/*! ../utils/common */ "../node_modules/pako/lib/utils/common.js");
var adler32       = __webpack_require__(/*! ./adler32 */ "../node_modules/pako/lib/zlib/adler32.js");
var crc32         = __webpack_require__(/*! ./crc32 */ "../node_modules/pako/lib/zlib/crc32.js");
var inflate_fast  = __webpack_require__(/*! ./inffast */ "../node_modules/pako/lib/zlib/inffast.js");
var inflate_table = __webpack_require__(/*! ./inftrees */ "../node_modules/pako/lib/zlib/inftrees.js");

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0;           /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              utils.arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          utils.arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/


/***/ }),

/***/ "../node_modules/pako/lib/zlib/inftrees.js":
/*!*************************************************!*\
  !*** ../node_modules/pako/lib/zlib/inftrees.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __webpack_require__(/*! ../utils/common */ "../node_modules/pako/lib/utils/common.js");

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};


/***/ }),

/***/ "../node_modules/pako/lib/zlib/messages.js":
/*!*************************************************!*\
  !*** ../node_modules/pako/lib/zlib/messages.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};


/***/ }),

/***/ "../node_modules/pako/lib/zlib/trees.js":
/*!**********************************************!*\
  !*** ../node_modules/pako/lib/zlib/trees.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

var utils = __webpack_require__(/*! ../utils/common */ "../node_modules/pako/lib/utils/common.js");

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;


/***/ }),

/***/ "../node_modules/pako/lib/zlib/zstream.js":
/*!************************************************!*\
  !*** ../node_modules/pako/lib/zlib/zstream.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;


/***/ }),

/***/ "../node_modules/safe-eval/index.js":
/*!******************************************!*\
  !*** ../node_modules/safe-eval/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var vm = __webpack_require__(/*! vm */ "../node_modules/vm-browserify/index.js")

module.exports = function safeEval (code, context, opts) {
  var sandbox = {}
  var resultKey = 'SAFE_EVAL_' + Math.floor(Math.random() * 1000000)
  sandbox[resultKey] = {}
  var clearContext = `
    (function(){
      Function = undefined;
      const keys = Object.getOwnPropertyNames(this).concat(['constructor']);
      keys.forEach((key) => {
        const item = this[key];
        if(!item || typeof item.constructor !== 'function') return;
        this[key].constructor = undefined;
      });
    })();
  `
  code = clearContext + resultKey + '=' + code
  if (context) {
    Object.keys(context).forEach(function (key) {
      sandbox[key] = context[key]
    })
  }
  vm.runInNewContext(code, sandbox, opts)
  return sandbox[resultKey]
}


/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "../node_modules/vkbeautify/index.js":
/*!*******************************************!*\
  !*** ../node_modules/vkbeautify/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
* vkBeautify - javascript plugin to pretty-print or minify text in XML, JSON, CSS and SQL formats.
*
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vkbeautify/
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*   Pretty print
*
*        vkbeautify.xml(text [,indent_pattern]);
*        vkbeautify.json(text [,indent_pattern]);
*        vkbeautify.css(text [,indent_pattern]);
*        vkbeautify.sql(text [,indent_pattern]);
*
*        @text - String; text to beatufy;
*        @indent_pattern - Integer | String;
*                Integer:  number of white spaces;
*                String:   character string to visualize indentation ( can also be a set of white spaces )
*   Minify
*
*        vkbeautify.xmlmin(text [,preserve_comments]);
*        vkbeautify.jsonmin(text);
*        vkbeautify.cssmin(text [,preserve_comments]);
*        vkbeautify.sqlmin(text);
*
*        @text - String; text to minify;
*        @preserve_comments - Bool; [optional];
*                Set this flag to true to prevent removing comments from @text ( minxml and mincss functions only. )
*
*   Examples:
*        vkbeautify.xml(text); // pretty print XML
*        vkbeautify.json(text, 4 ); // pretty print JSON
*        vkbeautify.css(text, '. . . .'); // pretty print CSS
*        vkbeautify.sql(text, '----'); // pretty print SQL
*
*        vkbeautify.xmlmin(text, true);// minify XML, preserve comments
*        vkbeautify.jsonmin(text);// minify JSON
*        vkbeautify.cssmin(text);// minify CSS, remove comments ( default )
*        vkbeautify.sqlmin(text);// minify SQL
*
*/
function createShiftArr(step) {

	var space = '    ';

	if ( isNaN(parseInt(step)) ) {  // argument is string
		space = step;
	} else { // argument is integer
		switch(step) {
			case 1: space = ' '; break;
			case 2: space = '  '; break;
			case 3: space = '   '; break;
			case 4: space = '    '; break;
			case 5: space = '     '; break;
			case 6: space = '      '; break;
			case 7: space = '       '; break;
			case 8: space = '        '; break;
			case 9: space = '         '; break;
			case 10: space = '          '; break;
			case 11: space = '           '; break;
			case 12: space = '            '; break;
		}
	}

	var shift = ['\n']; // array of shifts
	for(var ix=0;ix<100;ix++) {
		shift.push(shift[ix]+space);
	}
	return shift;
}

function vkbeautify(){
	this.step = '    '; // 4 spaces
	this.shift = createShiftArr(this.step);
};

vkbeautify.prototype.xml = function(text,step) {

	var ar = text.replace(/>\s{0,}</g,"><")
				 .replace(/</g,"~::~<")
				 .replace(/\s*xmlns\:/g,"~::~xmlns:")
				 .replace(/\s*xmlns\=/g,"~::~xmlns=")
				 .split('~::~'),
		len = ar.length,
		inComment = false,
		deep = 0,
		str = '',
		ix = 0,
		shift = step ? createShiftArr(step) : this.shift;

		for(ix=0;ix<len;ix++) {
			// start comment or <![CDATA[...]]> or <!DOCTYPE //
			if(ar[ix].search(/<!/) > -1) {
				str += shift[deep]+ar[ix];
				inComment = true;
				// end comment  or <![CDATA[...]]> //
				if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) {
					inComment = false;
				}
			} else
			// end comment  or <![CDATA[...]]> //
			if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
				str += ar[ix];
				inComment = false;
			} else
			// <elm></elm> //
			if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
				/^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) {
				str += ar[ix];
				if(!inComment) deep--;
			} else
			 // <elm> //
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
				str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
			} else
			 // <elm>...</elm> //
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
				str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
			} else
			// </elm> //
			if(ar[ix].search(/<\//) > -1) {
				str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
			} else
			// <elm/> //
			if(ar[ix].search(/\/>/) > -1 ) {
				str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
			} else
			// <? xml ... ?> //
			if(ar[ix].search(/<\?/) > -1) {
				str += shift[deep]+ar[ix];
			} else
			// xmlns //
			if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1) {
				str += shift[deep]+ar[ix];
			}

			else {
				str += ar[ix];
			}
		}

	return  (str[0] == '\n') ? str.slice(1) : str;
}

vkbeautify.prototype.json = function(text,step) {

	var step = step ? step : this.step;

	if (typeof JSON === 'undefined' ) return text;

	if ( typeof text === "string" ) return JSON.stringify(JSON.parse(text), null, step);
	if ( typeof text === "object" ) return JSON.stringify(text, null, step);

	return text; // text is not string nor object
}

vkbeautify.prototype.css = function(text, step) {

	var ar = text.replace(/\s{1,}/g,' ')
				.replace(/\{/g,"{~::~")
				.replace(/\}/g,"~::~}~::~")
				.replace(/\;/g,";~::~")
				.replace(/\/\*/g,"~::~/*")
				.replace(/\*\//g,"*/~::~")
				.replace(/~::~\s{0,}~::~/g,"~::~")
				.split('~::~'),
		len = ar.length,
		deep = 0,
		str = '',
		ix = 0,
		shift = step ? createShiftArr(step) : this.shift;

		for(ix=0;ix<len;ix++) {

			if( /\{/.exec(ar[ix]))  {
				str += shift[deep++]+ar[ix];
			} else
			if( /\}/.exec(ar[ix]))  {
				str += shift[--deep]+ar[ix];
			} else
			if( /\*\\/.exec(ar[ix]))  {
				str += shift[deep]+ar[ix];
			}
			else {
				str += shift[deep]+ar[ix];
			}
		}
		return str.replace(/^\n{1,}/,'');
}

//----------------------------------------------------------------------------

function isSubquery(str, parenthesisLevel) {
	return  parenthesisLevel - (str.replace(/\(/g,'').length - str.replace(/\)/g,'').length )
}

function split_sql(str, tab) {

	return str.replace(/\s{1,}/g," ")

				.replace(/ AND /ig,"~::~"+tab+tab+"AND ")
				.replace(/ BETWEEN /ig,"~::~"+tab+"BETWEEN ")
				.replace(/ CASE /ig,"~::~"+tab+"CASE ")
				.replace(/ ELSE /ig,"~::~"+tab+"ELSE ")
				.replace(/ END /ig,"~::~"+tab+"END ")
				.replace(/ FROM /ig,"~::~FROM ")
				.replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ")
				.replace(/ HAVING /ig,"~::~HAVING ")
				//.replace(/ SET /ig," SET~::~")
				.replace(/ IN /ig," IN ")

				.replace(/ JOIN /ig,"~::~JOIN ")
				.replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ")
				.replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ")
				.replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ")
				.replace(/ RIGHT~::~{1,}JOIN /ig,"~::~RIGHT JOIN ")

				.replace(/ ON /ig,"~::~"+tab+"ON ")
				.replace(/ OR /ig,"~::~"+tab+tab+"OR ")
				.replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ")
				.replace(/ OVER /ig,"~::~"+tab+"OVER ")

				.replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ")
				.replace(/\)\s{0,}SELECT /ig,")~::~SELECT ")

				.replace(/ THEN /ig," THEN~::~"+tab+"")
				.replace(/ UNION /ig,"~::~UNION~::~")
				.replace(/ USING /ig,"~::~USING ")
				.replace(/ WHEN /ig,"~::~"+tab+"WHEN ")
				.replace(/ WHERE /ig,"~::~WHERE ")
				.replace(/ WITH /ig,"~::~WITH ")

				//.replace(/\,\s{0,}\(/ig,",~::~( ")
				//.replace(/\,/ig,",~::~"+tab+tab+"")

				.replace(/ ALL /ig," ALL ")
				.replace(/ AS /ig," AS ")
				.replace(/ ASC /ig," ASC ")
				.replace(/ DESC /ig," DESC ")
				.replace(/ DISTINCT /ig," DISTINCT ")
				.replace(/ EXISTS /ig," EXISTS ")
				.replace(/ NOT /ig," NOT ")
				.replace(/ NULL /ig," NULL ")
				.replace(/ LIKE /ig," LIKE ")
				.replace(/\s{0,}SELECT /ig,"SELECT ")
				.replace(/\s{0,}UPDATE /ig,"UPDATE ")
				.replace(/ SET /ig," SET ")

				.replace(/~::~{1,}/g,"~::~")
				.split('~::~');
}

vkbeautify.prototype.sql = function(text,step) {

	var ar_by_quote = text.replace(/\s{1,}/g," ")
							.replace(/\'/ig,"~::~\'")
							.split('~::~'),
		len = ar_by_quote.length,
		ar = [],
		deep = 0,
		tab = this.step,//+this.step,
		inComment = true,
		inQuote = false,
		parenthesisLevel = 0,
		str = '',
		ix = 0,
		shift = step ? createShiftArr(step) : this.shift;;

		for(ix=0;ix<len;ix++) {
			if(ix%2) {
				ar = ar.concat(ar_by_quote[ix]);
			} else {
				ar = ar.concat(split_sql(ar_by_quote[ix], tab) );
			}
		}

		len = ar.length;
		for(ix=0;ix<len;ix++) {

			parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);

			if( /\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
				ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
			}

			if( /\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix]))  {
				ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
			}

			if( /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
				deep++;
				str += shift[deep]+ar[ix];
			} else
			if( /\'/.exec(ar[ix]) )  {
				if(parenthesisLevel<1 && deep) {
					deep--;
				}
				str += ar[ix];
			}
			else  {
				str += shift[deep]+ar[ix];
				if(parenthesisLevel<1 && deep) {
					deep--;
				}
			}
			var junk = 0;
		}

		str = str.replace(/^\n{1,}/,'').replace(/\n{1,}/g,"\n");
		return str;
}


vkbeautify.prototype.xmlmin = function(text, preserveComments) {

	var str = preserveComments ? text
							   : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"")
									 .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns');
	return  str.replace(/>\s{0,}</g,"><");
}

vkbeautify.prototype.jsonmin = function(text) {

	if (typeof JSON === 'undefined' ) return text;

	return JSON.stringify(JSON.parse(text), null, 0);

}

vkbeautify.prototype.cssmin = function(text, preserveComments) {

	var str = preserveComments ? text
							   : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"") ;

	return str.replace(/\s{1,}/g,' ')
			  .replace(/\{\s{1,}/g,"{")
			  .replace(/\}\s{1,}/g,"}")
			  .replace(/\;\s{1,}/g,";")
			  .replace(/\/\*\s{1,}/g,"/*")
			  .replace(/\*\/\s{1,}/g,"*/");
}

vkbeautify.prototype.sqlmin = function(text) {
	return text.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")");
}

module.exports = new vkbeautify();


/***/ }),

/***/ "../node_modules/vm-browserify/index.js":
/*!**********************************************!*\
  !*** ../node_modules/vm-browserify/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var indexOf = function (xs, item) {
    if (xs.indexOf) return xs.indexOf(item);
    else for (var i = 0; i < xs.length; i++) {
        if (xs[i] === item) return i;
    }
    return -1;
};
var Object_keys = function (obj) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj, name, value) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj, name, value) {
            obj[name] = value;
        };
    }
}());

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript (code) {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win = iframe.contentWindow;
    var wEval = win.eval, wExecScript = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key) {
        win[key] = context[key];
    });
    forEach(globals, function (key) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys = Object_keys(win);

    var res = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });
    
    document.body.removeChild(iframe);
    
    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    if (context) {
        forEach(Object_keys(ctx), function (key) {
            context[key] = ctx[key];
        });
    }

    return res;
};

forEach(Object_keys(Script.prototype), function (name) {
    exports[name] = Script[name] = function (code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.isContext = function (context) {
    return context instanceof Context;
};

exports.createScript = function (code) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
    var copy = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key) {
            copy[key] = context[key];
        });
    }
    return copy;
};


/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./drawio_custom.js":
/*!**************************!*\
  !*** ./drawio_custom.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  executeLayout: function executeLayout(graph, exec, animate, post) {
    if (graph.isEnabled()) {
      graph.getModel().beginUpdate();

      try {
        exec();
      } catch (e) {
        throw e;
      } finally {
        graph.getModel().endUpdate();

        if (post != null) {
          post();
        }
      }
    }
  },
  executeLayoutList: function executeLayoutList(graph, layoutList, done) {
    var cells = graph.getSelectionCells();

    for (var i = 0; i < layoutList.length; i++) {
      var layout = new window[layoutList[i].layout](graph);

      if (layoutList[i].config != null) {
        for (var key in layoutList[i].config) {
          layout[key] = layoutList[i].config[key];
        }
      }

      this.executeLayout(graph, function () {
        layout.execute(graph.getDefaultParent(), cells.length === 0 ? null : cells);
      }, i === layoutList.length - 1, done);
    }
  },
  csvToArray: function csvToArray(text) {
    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;

    if (!re_valid.test(text)) {
      return null;
    }

    var a = [];
    text.replace(re_value, function (m0, m1, m2, m3) {
      if (m1 !== undefined) {
        a.push(m1.replace(/\\'/g, "'"));
      } else if (m2 !== undefined) {
          a.push(m2.replace(/\\"/g, '"'));
        } else if (m3 !== undefined) {
          a.push(m3);
        }

      return '';
    });

    if (/,\s*$/.test(text)) {
      a.push('');
    }

    return a;
  },
  importCsv: function importCsv(graph, text) {
    try {
      var lines = text.split('\n');
      var allCells = [];
      var cells = [];
      var dups = {};

      if (lines.length > 0) {
        var lookups = {};
        var style = null;
        var styles = null;
        var stylename = null;
        var labelname = null;
        var labels = null;
        var parentstyle = null;
        var identity = null;
        var parent = null;
        var namespace = '';
        var width = 'auto';
        var height = 'auto';
        var left = null;
        var top = null;
        var edgespacing = 40;
        var nodespacing = 40;
        var levelspacing = 100;
        var padding = 0;
        var view = graph.view;
        var bds = graph.getGraphBounds();

        var afterInsert = function afterInsert() {};

        var pt = graph.getFreeInsertPoint();
        var x0 = pt.x;
        var y0 = pt.y;
        var y = y0;
        var label = null;
        var layout = 'auto';
        parent = null;
        var edges = [];
        var link = null;
        var ignore = null;
        var index = 0;

        while (index < lines.length && lines[index].charAt(0) === '#') {
          text = lines[index];
          index++;

          while (index < lines.length && text.charAt(text.length - 1) === '\\' && lines[index].charAt(0) === '#') {
            text = text.substring(0, text.length - 1) + mxUtils.trim(lines[index].substring(1));
            index++;
          }

          if (text.charAt(1) !== '#') {
            var idx = text.indexOf(':');

            if (idx > 0) {
              var key = mxUtils.trim(text.substring(1, idx));
              var value = mxUtils.trim(text.substring(idx + 1));

              if (key === 'label') {
                label = graph.sanitizeHtml(value);
              } else if (key === 'labelname' && value.length > 0 && value !== '-') {
                labelname = value;
              } else if (key === 'labels' && value.length > 0 && value !== '-') {
                labels = JSON.parse(value);
              } else if (key === 'style') {
                style = value;
              } else if (key === 'parentstyle') {
                parentstyle = value;
              } else if (key === 'stylename' && value.length > 0 && value !== '-') {
                stylename = value;
              } else if (key === 'styles' && value.length > 0 && value !== '-') {
                styles = JSON.parse(value);
              } else if (key === 'identity' && value.length > 0 && value !== '-') {
                identity = value;
              } else if (key === 'parent' && value.length > 0 && value !== '-') {
                parent = value;
              } else if (key === 'namespace' && value.length > 0 && value !== '-') {
                namespace = value;
              } else if (key === 'width') {
                width = value;
              } else if (key === 'height') {
                height = value;
              } else if (key === 'left' && value.length > 0) {
                left = value;
              } else if (key === 'top' && value.length > 0) {
                top = value;
              } else if (key === 'ignore') {
                ignore = value.split(',');
              } else if (key === 'connect') {
                edges.push(JSON.parse(value));
              } else if (key === 'link') {
                link = value;
              } else if (key === 'padding') {
                padding = parseFloat(value);
              } else if (key === 'edgespacing') {
                edgespacing = parseFloat(value);
              } else if (key === 'nodespacing') {
                nodespacing = parseFloat(value);
              } else if (key === 'levelspacing') {
                levelspacing = parseFloat(value);
              } else if (key === 'layout') {
                layout = value;
              }
            }
          }
        }

        if (lines[index] == null) {
          throw new Error(mxResources.get('invalidOrMissingFile'));
        }

        var keys = this.csvToArray(lines[index]);
        var identityIndex = null;
        var parentIndex = null;
        var attribs = [];

        for (var i = 0; i < keys.length; i++) {
          if (identity === keys[i]) {
            identityIndex = i;
          }

          if (parent === keys[i]) {
            parentIndex = i;
          }

          attribs.push(mxUtils.trim(keys[i]).replace(/[^a-z0-9]+/gi, '_').replace(/^\d+/, '').replace(/_+$/, ''));
        }

        if (label == null) {
          label = '%' + attribs[0] + '%';
        }

        if (edges != null) {
          for (var e = 0; e < edges.length; e++) {
            if (lookups[edges[e].to] == null) {
              lookups[edges[e].to] = {};
            }
          }
        }

        var arrays = [];

        for (var _i = index + 1; _i < lines.length; _i++) {
          var values = this.csvToArray(lines[_i]);

          if (values == null) {
            var _short = lines[_i].length > 40 ? lines[_i].substring(0, 40) + '...' : lines[_i];

            throw new Error(_short + ' (' + _i + '):\n' + mxResources.get('containsValidationErrors'));
          } else if (values.length > 0) {
            arrays.push(values);
          }
        }

        graph.model.beginUpdate();

        try {
          for (var _i2 = 0; _i2 < arrays.length; _i2++) {
            var _values = arrays[_i2];
            var cell = null;
            var id = identityIndex != null ? namespace + _values[identityIndex] : null;

            if (id != null) {
              cell = graph.model.getCell(id);
            }

            var exists = cell != null;
            var newCell = new mxCell(label, new mxGeometry(x0, y, 0, 0), style || 'whiteSpace=wrap;html=1;');
            newCell.vertex = true;
            newCell.id = id;

            for (var j = 0; j < _values.length; j++) {
              graph.setAttributeForCell(newCell, attribs[j], _values[j]);
            }

            if (labelname != null && labels != null) {
              var tempLabel = labels[newCell.getAttribute(labelname)];

              if (tempLabel != null) {
                graph.labelChanged(newCell, tempLabel);
              }
            }

            if (stylename != null && styles != null) {
              var tempStyle = styles[newCell.getAttribute(stylename)];

              if (tempStyle != null) {
                newCell.style = tempStyle;
              }
            }

            graph.setAttributeForCell(newCell, 'placeholders', '1');
            newCell.style = graph.replacePlaceholders(newCell, newCell.style);

            if (exists) {
              graph.model.setGeometry(cell, newCell.geometry);
              graph.model.setStyle(cell, newCell.style);

              if (mxUtils.indexOf(cells, cell) < 0) {
                cells.push(cell);
              }
            }

            cell = newCell;

            if (!exists) {
              for (var _e = 0; _e < edges.length; _e++) {
                lookups[edges[_e].to][cell.getAttribute(edges[_e].to)] = cell;
              }
            }

            if (link != null && link !== 'link') {
              graph.setLinkForCell(cell, cell.getAttribute(link));
              graph.setAttributeForCell(cell, link, null);
            }

            graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
            var size = graph.getPreferredSizeForCell(cell);

            if (cell.vertex) {
              if (left != null && cell.getAttribute(left) != null) {
                cell.geometry.x = x0 + parseFloat(cell.getAttribute(left));
              }

              if (top != null && cell.getAttribute(top) != null) {
                cell.geometry.y = y0 + parseFloat(cell.getAttribute(top));
              }

              if (width.charAt(0) === '@' && cell.getAttribute(width.substring(1)) != null) {
                cell.geometry.width = parseFloat(cell.getAttribute(width.substring(1)));
              } else {
                cell.geometry.width = width === 'auto' ? size.width + padding : parseFloat(width);
              }

              if (height.charAt(0) === '@' && cell.getAttribute(height.substring(1)) != null) {
                cell.geometry.height = parseFloat(cell.getAttribute(height.substring(1)));
              } else {
                cell.geometry.height = height === 'auto' ? size.height + padding : parseFloat(height);
              }

              y += cell.geometry.height + nodespacing;
            }

            if (!exists) {
              parent = parentIndex != null ? graph.model.getCell(namespace + _values[parentIndex]) : null;
              allCells.push(cell);

              if (parent != null) {
                parent.style = graph.replacePlaceholders(parent, parentstyle);
                graph.addCell(cell, parent);
              } else {
                cells.push(graph.addCell(cell));
              }
            } else {
              if (dups[id] == null) {
                dups[id] = [];
              }

              dups[id].push(cell);
            }
          }

          var roots = cells.slice();
          var select = cells.slice();

          for (var _e2 = 0; _e2 < edges.length; _e2++) {
            var edge = edges[_e2];

            for (var _i3 = 0; _i3 < allCells.length; _i3++) {
              cell = allCells[_i3];
              var insertEdge = mxUtils.bind(this, function (realCell, dataCell, edge) {
                var tmp = dataCell.getAttribute(edge.from);

                if (tmp != null) {
                  graph.setAttributeForCell(dataCell, edge.from, null);

                  if (tmp !== '') {
                    var refs = tmp.split(',');

                    for (var j = 0; j < refs.length; j++) {
                      var ref = lookups[edge.to][refs[j]];

                      if (ref != null) {
                        var label = edge.label;

                        if (edge.fromlabel != null) {
                          label = (dataCell.getAttribute(edge.fromlabel) || '') + (label || '');
                        }

                        if (edge.tolabel != null) {
                          label = (label || '') + (ref.getAttribute(edge.tolabel) || '');
                        }

                        var placeholders = edge.placeholders === 'target' === !edge.invert ? ref : realCell;
                        var style = edge.style != null ? graph.replacePlaceholders(placeholders, edge.style) : graph.createCurrentEdgeStyle();
                        select.push(graph.insertEdge(null, null, label || '', edge.invert ? ref : realCell, edge.invert ? realCell : ref, style));
                        mxUtils.remove(edge.invert ? realCell : ref, roots);
                      }
                    }
                  }
                }
              });
              insertEdge(cell, cell, edge);

              if (dups[cell.id] != null) {
                for (var _j = 0; _j < dups[cell.id].length; _j++) {
                  insertEdge(cell, dups[cell.id][_j], edge);
                }
              }
            }
          }

          if (ignore != null) {
            for (var _i4 = 0; _i4 < allCells.length; _i4++) {
              cell = allCells[_i4];

              for (var _j2 = 0; _j2 < ignore.length; _j2++) {
                graph.setAttributeForCell(cell, mxUtils.trim(ignore[_j2]), null);
              }
            }
          }

          if (cells.length > 0) {
            var edgeLayout = new mxParallelEdgeLayout(graph);
            edgeLayout.spacing = edgespacing;

            var postProcess = function postProcess() {
              if (edgeLayout.spacing > 0) {
                edgeLayout.execute(graph.getDefaultParent());
              }

              for (var i = 0; i < cells.length; i++) {
                var geo = graph.getCellGeometry(cells[i]);
                geo.x = Math.round(graph.snap(geo.x));
                geo.y = Math.round(graph.snap(geo.y));

                if (width === 'auto') {
                  geo.width = Math.round(graph.snap(geo.width));
                }

                if (height === 'auto') {
                  geo.height = Math.round(graph.snap(geo.height));
                }
              }
            };

            if (layout.charAt(0) === '[') {
              var temp = afterInsert;
              graph.view.validate();
              this.executeLayoutList(graph, JSON.parse(layout), function () {
                postProcess();
                temp();
              });
              afterInsert = null;
            } else if (layout === 'circle') {
              var circleLayout = new mxCircleLayout(graph);
              circleLayout.resetEdges = false;
              var circleLayoutIsVertexIgnored = circleLayout.isVertexIgnored;

              circleLayout.isVertexIgnored = function (vertex) {
                return circleLayoutIsVertexIgnored.apply(this, arguments) || mxUtils.indexOf(cells, vertex) < 0;
              };

              this.executeLayout(graph, function () {
                circleLayout.execute(graph.getDefaultParent());
                postProcess();
              }, true, afterInsert);
              afterInsert = null;
            } else if (layout === 'horizontaltree' || layout === 'verticaltree' || layout === 'auto' && select.length === 2 * cells.length - 1 && roots.length === 1) {
              graph.view.validate();
              var treeLayout = new mxCompactTreeLayout(graph, layout === 'horizontaltree');
              treeLayout.levelDistance = nodespacing;
              treeLayout.edgeRouting = false;
              treeLayout.resetEdges = false;
              this.executeLayout(graph, function () {
                treeLayout.execute(graph.getDefaultParent(), roots.length > 0 ? roots[0] : null);
              }, true, afterInsert);
              afterInsert = null;
            } else if (layout === 'horizontalflow' || layout === 'verticalflow' || layout === 'auto' && roots.length === 1) {
              graph.view.validate();
              var flowLayout = new mxHierarchicalLayout(graph, layout === 'horizontalflow' ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH);
              flowLayout.intraCellSpacing = nodespacing;
              flowLayout.parallelEdgeSpacing = edgespacing;
              flowLayout.interRankCellSpacing = levelspacing;
              flowLayout.disableEdgeStyle = false;
              this.executeLayout(graph, function () {
                flowLayout.execute(graph.getDefaultParent(), select);
                graph.moveCells(select, x0, y0);
              }, true, afterInsert);
              afterInsert = null;
            } else if (layout === 'organic' || layout === 'auto' && select.length > cells.length) {
              graph.view.validate();
              var organicLayout = new mxFastOrganicLayout(graph);
              organicLayout.forceConstant = nodespacing * 3;
              organicLayout.resetEdges = false;
              var organicLayoutIsVertexIgnored = organicLayout.isVertexIgnored;

              organicLayout.isVertexIgnored = function (vertex) {
                return organicLayoutIsVertexIgnored.apply(this, arguments) || mxUtils.indexOf(cells, vertex) < 0;
              };

              edgeLayout = new mxParallelEdgeLayout(graph);
              edgeLayout.spacing = edgespacing;
              this.executeLayout(graph, function () {
                organicLayout.execute(graph.getDefaultParent());
                postProcess();
              }, true, afterInsert);
              afterInsert = null;
            }
          }
        } finally {
          graph.model.endUpdate();
        }

        if (afterInsert != null) {
          afterInsert();
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
  anonymize: function anonymize(graph) {
    var div = document.createElement('div');
    var model = graph.model;
    var ignoredAnonymizedChars = '\n\t`~!@#$%^&*()_+{}|:"<>?-=[];\'./,\n\t';

    var anonymizeString = function anonymizeString(text, zeros) {
      var result = [];

      for (var _i5 = 0; _i5 < text.length; _i5++) {
        var c = text.charAt(_i5);

        if (ignoredAnonymizedChars.indexOf(c) >= 0) {
          result.push(c);
        } else if (!isNaN(parseInt(c))) {
          result.push(zeros ? '0' : Math.round(Math.random() * 9));
        } else if (c.toLowerCase() !== c) {
          result.push(String.fromCharCode(65 + Math.round(Math.random() * 25)));
        } else if (c.toUpperCase() !== c) {
          result.push(String.fromCharCode(97 + Math.round(Math.random() * 25)));
        } else if (/\s/.test(c)) {
          result.push(' ');
        } else {
          result.push('?');
        }
      }

      return result.join('');
    };

    var replaceTextContent = function replaceTextContent(elt) {
      if (elt.nodeValue != null) {
        elt.nodeValue = anonymizeString(elt.nodeValue);
      }

      if (elt.nodeType === mxConstants.NODETYPE_ELEMENT) {
        var tmp = elt.firstChild;

        while (tmp != null) {
          replaceTextContent(tmp);
          tmp = tmp.nextSibling;
        }
      }
    };

    var anonymizeHtml = function anonymizeHtml(html) {
      div.innerHTML = html;
      replaceTextContent(div);
      return div.innerHTML;
    };

    model.beginUpdate();

    try {
      var queue = [];

      for (var id in model.cells) {
        var cell = model.cells[id];
        var label = graph.getLabel(cell);

        if (graph.isHtmlLabel(cell)) {
          label = anonymizeHtml(label);
        } else {
          label = anonymizeString(label);
        }

        queue.push({
          cell: cell,
          label: label
        });
      }

      for (var i = 0; i < queue.length; i++) {
        model.setValue(queue[i].cell, queue[i].label);
      }
    } finally {
      model.endUpdate();
    }
  },
  addExtFont: function addExtFont(fontName, fontUrl, dontRemember) {
    if (fontName && fontUrl) {
      var fontId = 'extFont_' + fontName;

      if (document.getElementById(fontId) === null) {
        if (fontUrl.indexOf(Editor.GOOGLE_FONTS) === 0) {
          mxClient.link('stylesheet', fontUrl, null, fontId);
        } else {
          var head = document.getElementsByTagName('head')[0];
          var style = document.createElement('style');
          style.appendChild(document.createTextNode('@font-face {\n' + '\tfont-family: "' + fontName + '";\n' + '\tsrc: url("' + fontUrl + '");\n' + '}'));
          style.setAttribute('id', fontId);
          head = document.getElementsByTagName('head')[0];
          head.appendChild(style);
        }
      }

      if (!dontRemember) {
        if (this.extFonts == null) {
          this.extFonts = [];
        }

        var extFonts = this.extFonts,
            notFound = true;

        for (var i = 0; i < extFonts.length; i++) {
          if (extFonts[i].name === fontName) {
            notFound = false;
            break;
          }
        }

        if (notFound) {
          this.extFonts.push({
            name: fontName,
            url: fontUrl
          });
        }
      }
    }
  }
};

/***/ }),

/***/ "./flowchartHandler.ts":
/*!*****************************!*\
  !*** ./flowchartHandler.ts ***!
  \*****************************/
/*! exports provided: FlowchartHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlowchartHandler", function() { return FlowchartHandler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var flowchart_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flowchart_class */ "./flowchart_class.ts");
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var FlowchartHandler = function () {
  function FlowchartHandler($scope, elem, ctrl, data) {
    var _this = this;

    _classCallCheck(this, FlowchartHandler);

    this.flowcharts = [];
    this.currentFlowchartName = 'Main';
    this.firstLoad = true;
    this.changeSourceFlag = [];
    this.changeOptionFlag = [];
    this.changeDataFlag = false;
    this.changeGraphHoverFlag = false;
    this.changeRuleFlag = false;
    this.newMode = false;
    this.sequenceNumber = 0;
    this.onMapping = {
      active: false,
      object: null,
      value: null,
      prop: 'id',
      $scope: null
    };
    this.mousedownTimeout = 0;
    this.mousedown = 0;
    this.onEdit = false;
    this.postedId = undefined;
    this.editorWindow = null;
    FlowchartHandler.getDefaultDioGraph();
    this.$scope = $scope;
    this.$elem = elem.find('.flowchart-panel__chart');
    this.parentDiv = this.$elem[0];
    this.ctrl = ctrl;
    this.data = data;
    this.currentFlowchartName = this.data.main;
    ctrl.events.on('render', function () {
      _this.render();
    });

    document.body.onmousedown = function () {
      _this.mousedown = 0;
      window.clearInterval(_this.mousedownTimeout);
      _this.mousedownTimeout = window.setInterval(function () {
        _this.mousedown += 1;
      }, 200);
    };

    document.body.onmouseup = function () {
      _this.mousedown = 0;
      window.clearInterval(_this.mousedownTimeout);
    };
  }

  _createClass(FlowchartHandler, [{
    key: "import",
    value: function _import(obj) {
      var _this2 = this;

      this.flowcharts = [];

      if (obj !== undefined && obj !== null) {
        var tmpFc;

        if (Array.isArray(obj)) {
          tmpFc = obj;
        } else {
          tmpFc = obj.flowcharts;
        }

        if (tmpFc.length === 1) {
          this.data.main = tmpFc[0].name;
          this.currentFlowchartName = this.data.main;
          this.data.editorTheme = tmpFc[0].editorTheme;
          this.data.editorUrl = tmpFc[0].editorUrl;
        }

        this.data.editorTheme = !!obj.editorTheme ? obj.editorTheme : this.data.editorTheme;
        this.data.editorUrl = !!obj.editorUrl ? obj.editorUrl : this.data.editorUrl;
        tmpFc.forEach(function (fcData) {
          var container = _this2.createContainer();

          var newData = flowchart_class__WEBPACK_IMPORTED_MODULE_1__["Flowchart"].getDefaultData();
          var fc = new flowchart_class__WEBPACK_IMPORTED_MODULE_1__["Flowchart"](fcData.name, container, _this2.ctrl, newData);
          fc["import"](fcData);

          _this2.flowcharts.push(fc);

          _this2.data.flowcharts.push(newData);
        });
        this.currentFlowchart = this.getFlowchart(this.data.main);
      }

      return this;
    }
  }, {
    key: "getFlowchart",
    value: function getFlowchart(name) {
      if (name) {
        var lg = this.flowcharts.length;

        for (var i = 0; i < lg; i++) {
          var fc = this.flowcharts[i];

          if (fc.getName() === name) {
            return fc;
          }
        }
      }

      var current = this.getCurrentFlowchart();
      return current !== undefined ? current : this.flowcharts[0];
    }
  }, {
    key: "getFlowchartById",
    value: function getFlowchartById(id) {
      var fcs = this.getFlowcharts();

      for (var index = 0; index < fcs.length; index++) {
        var fc = fcs[index];

        if (fc.id === id) {
          return fc;
        }
      }

      return undefined;
    }
  }, {
    key: "getFlowcharts",
    value: function getFlowcharts() {
      return this.flowcharts;
    }
  }, {
    key: "countFlowcharts",
    value: function countFlowcharts() {
      if (this.flowcharts !== undefined && Array.isArray(this.flowcharts)) {
        return this.flowcharts.length;
      }

      return 0;
    }
  }, {
    key: "getFlowchartTmpName",
    value: function getFlowchartTmpName() {
      if (this.sequenceNumber === 0) {
        this.sequenceNumber = this.countFlowcharts();
      }

      return "Flowchart-".concat(this.sequenceNumber++);
    }
  }, {
    key: "setCurrentFlowchart",
    value: function setCurrentFlowchart(name) {
      if (name === undefined) {
        this.currentFlowchart = this.getFlowchart('Main');
        this.currentFlowchartName = this.currentFlowchart.getName();
        this.currentFlowchart.toFront();
        return this.currentFlowchart;
      }

      if (this.currentFlowchart === undefined) {
        this.currentFlowchart = this.getFlowchart(name);
        this.currentFlowchartName = this.currentFlowchart.getName();
        this.currentFlowchart.toFront();
        return this.currentFlowchart;
      }

      if (this.currentFlowchart.getName() !== name) {
        this.currentFlowchart.toBack();
        this.currentFlowchart = this.getFlowchart(name);
        this.currentFlowchartName = name;
        this.currentFlowchart.toFront();
      }

      return this.currentFlowchart;
    }
  }, {
    key: "getCurrentFlowchart",
    value: function getCurrentFlowchart() {
      return this.currentFlowchart;
    }
  }, {
    key: "getCurrentFlowchartName",
    value: function getCurrentFlowchartName() {
      var cf = this.getCurrentFlowchart();
      return cf !== undefined ? cf.getName() : 'Main';
    }
  }, {
    key: "createContainer",
    value: function createContainer() {
      var div = document.createElement('div');
      div.style.margin = 'auto';
      div.style.position = 'relative';
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.touchAction = 'none';
      div.style.border = 'none';
      div.style.cursor = 'default';
      div.style.right = '0px';
      div.style.left = '0px';
      div.style.bottom = '0px';
      div.style.top = '0px';
      this.parentDiv.appendChild(div);
      return div;
    }
  }, {
    key: "addFlowchart",
    value: function addFlowchart(name) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'addFlowchart()');
      var container = this.createContainer();
      var data = flowchart_class__WEBPACK_IMPORTED_MODULE_1__["Flowchart"].getDefaultData();
      var flowchart = new flowchart_class__WEBPACK_IMPORTED_MODULE_1__["Flowchart"](name, container, this.ctrl, data);
      flowchart.init();
      this.data.flowcharts.push(data);
      this.flowcharts.push(flowchart);
      trc.after();
      return flowchart;
    }
  }, {
    key: "removeFlowchart",
    value: function removeFlowchart(name) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'removeFlowchart()');
      var fc = this.getFlowchart(name);
      var index = this.flowcharts.indexOf(fc);
      this.flowcharts.splice(index, 1);
      this.data.flowcharts.splice(index, 1);
      fc.destroy();
      trc.after();
    }
  }, {
    key: "render",
    value: function render() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var trc, optionsFlag, self, rules, metrics;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'render()');

                if (!this.mousedown) {
                  optionsFlag = true;
                  self = this;

                  if (self.isSourceChanged()) {
                    this.changeSourceFlag.forEach(function (name) {
                      self.load(name);
                    });
                    self.changeSourceFlag = [];
                    self.changeRuleFlag = true;
                    optionsFlag = true;
                  }

                  if (self.isOptionChanged()) {
                    this.changeOptionFlag.forEach(function (name) {
                      self.setOptions(name);
                    });
                    self.setOptions();
                    self.changeOptionFlag = [];
                    optionsFlag = true;
                  }

                  if (self.changeRuleFlag || self.changeDataFlag || self.changeGraphHoverFlag) {
                    rules = self.ctrl.rulesHandler.getRules();
                    metrics = self.ctrl.metricHandler.getMetrics();
                    self.async_refreshStates(rules, metrics);
                    self.changeDataFlag = false;
                    optionsFlag = false;
                    self.changeGraphHoverFlag = false;
                  }

                  if (optionsFlag || self.firstLoad) {
                    self.applyOptions();
                    optionsFlag = false;
                    self.firstLoad = false;
                  }
                }

                this.ctrl.renderingCompleted();
                trc.after();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "flagSourceChanged",
    value: function flagSourceChanged(name) {
      var _this3 = this;

      if (name !== undefined) {
        if (!this.changeSourceFlag.includes(name)) {
          this.changeSourceFlag.push(name);
        }
      } else {
        this.flowcharts.forEach(function (flowchart) {
          var name = flowchart.getName();

          if (!_this3.changeSourceFlag.includes(name)) {
            _this3.changeSourceFlag.push(name);
          }
        });
      }

      return this;
    }
  }, {
    key: "isSourceChanged",
    value: function isSourceChanged(name) {
      if (name === undefined) {
        return this.changeSourceFlag.length > 0;
      }

      return this.changeSourceFlag.includes(name);
    }
  }, {
    key: "flagOptionChanged",
    value: function flagOptionChanged(name) {
      var _this4 = this;

      if (name !== undefined) {
        if (!this.changeOptionFlag.includes(name)) {
          this.changeOptionFlag.push(name);
        }
      } else {
        this.flowcharts.forEach(function (flowchart) {
          var name = flowchart.getName();

          if (!_this4.changeOptionFlag.includes(name)) {
            _this4.changeOptionFlag.push(name);
          }
        });
      }

      return this;
    }
  }, {
    key: "isOptionChanged",
    value: function isOptionChanged(name) {
      if (name === undefined) {
        return this.changeOptionFlag.length > 0;
      }

      return this.changeOptionFlag.includes(name);
    }
  }, {
    key: "ruleChanged",
    value: function ruleChanged() {
      this.changeRuleFlag = true;
      return this;
    }
  }, {
    key: "dataChanged",
    value: function dataChanged() {
      this.changeDataFlag = true;
      return this;
    }
  }, {
    key: "graphHoverChanged",
    value: function graphHoverChanged() {
      this.changeGraphHoverFlag = true;
      return this;
    }
  }, {
    key: "applyOptions",
    value: function applyOptions() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'applyOptions()');
      this.flowcharts.forEach(function (flowchart) {
        flowchart.applyOptions();
      });
      trc.after();
      return this;
    }
  }, {
    key: "async_refreshStates",
    value: function async_refreshStates(rules, metrics) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'async_refreshStates()');
      this.refreshStates(rules, metrics);
      trc.after();
    }
  }, {
    key: "refreshStates",
    value: function refreshStates(rules, metrics) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'refreshStates()');

      if (this.changeRuleFlag) {
        this.updateStates(rules);
        this.changeRuleFlag = false;
      }

      this.setStates(rules, metrics);
      this.applyStates();
      trc.after();
      return this;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.flowcharts.forEach(function (flowchart) {
        flowchart.refresh();
      });
      return this;
    }
  }, {
    key: "setStates",
    value: function setStates(rules, metrics) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'setStates()');
      this.flowcharts.forEach(function (flowchart) {
        flowchart.setStates(rules, metrics);
      });
      trc.after();
      return this;
    }
  }, {
    key: "updateStates",
    value: function updateStates(rules) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'updateStates()');
      this.flowcharts.forEach(function (flowchart) {
        flowchart.updateStates(rules);
      });
      trc.after();
      return this;
    }
  }, {
    key: "applyStates",
    value: function applyStates() {
      var _this5 = this;

      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'applyStates()');
      new Promise(function () {
        _this5.flowcharts.forEach(function (flowchart) {
          flowchart.applyStates();
        });
      }).then(function () {
        _this5.refresh();
      });
      trc.after();
      return this;
    }
  }, {
    key: "setOptions",
    value: function setOptions(name) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'setOptions()');

      if (name === undefined) {
        this.flowcharts.forEach(function (flowchart) {
          flowchart.setOptions();
        });
      } else {
        var flowchart = this.getFlowchart(name);
        flowchart.setOptions();
      }

      trc.after();
      return this;
    }
  }, {
    key: "setCurrentOptions",
    value: function setCurrentOptions() {
      var name = this.getCurrentFlowchartName();
      this.setOptions(name);
      return this;
    }
  }, {
    key: "draw",
    value: function draw() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'draw()');
      this.flowcharts.forEach(function (flowchart) {
        flowchart.redraw();
      });
      trc.after();
      return this;
    }
  }, {
    key: "load",
    value: function load(name) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'draw()');

      if (name === undefined) {
        this.flowcharts.forEach(function (flowchart) {
          flowchart.reload();
        });
      } else {
        var flowchart = this.getFlowchart(name);
        flowchart.reload();
      }

      trc.after();
      return this;
    }
  }, {
    key: "loadCurrent",
    value: function loadCurrent() {
      var name = this.getCurrentFlowchartName();
      this.load(name);
      return this;
    }
  }, {
    key: "setMap",
    value: function setMap(objToMap) {
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
      var flowchart = this.getFlowchart(this.currentFlowchartName);
      this.onMapping.active = true;
      this.onMapping.object = objToMap;
      this.onMapping.value = objToMap.getId();
      this.onMapping.$scope = this.$scope;
      this.onMapping.prop = prop;
      flowchart.setMap(this.onMapping);
      return this;
    }
  }, {
    key: "unsetMap",
    value: function unsetMap() {
      var flowchart = this.getFlowchart(this.currentFlowchartName);
      this.onMapping.active = false;
      this.onMapping.object = undefined;
      this.onMapping.value = '';
      flowchart.unsetMap();
      return this;
    }
  }, {
    key: "isMapping",
    value: function isMapping(objToMap) {
      if (objToMap === undefined || objToMap == null) {
        return this.onMapping.active;
      }

      if (this.onMapping.active === true && objToMap === this.onMapping.object) {
        return true;
      }

      return false;
    }
  }, {
    key: "listenMessage",
    value: function listenMessage(event) {
      if (event.data !== undefined && event.data.length > 0 && event.data.substring(0, 3) === 'fc-') {
        var id = event.data.substring(3);
        var fc = this.getFlowchartById(id);
        this.currentFlowchart = fc;

        if (fc !== undefined) {
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].message.setMessage('Sending current data to draw.io editor', 'info');
          event.source.postMessage(fc.data.xml, event.origin);
          this.postedId = fc.id;
        }
      } else {
        if (this.onEdit && event.data !== undefined && event.data.length > 0 && event.data.substring(0, 3) !== 'fc-' && this.currentFlowchart !== undefined) {
          if (this.postedId !== undefined) {
            var _fc = this.getFlowchartById(this.postedId);

            if (_fc !== undefined) {
              globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].message.setMessage('Received data from draw.io editor, refresh in progress', 'info');

              _fc.redraw(event.data);

              this.flagSourceChanged();
              this.$scope.$apply();
              this.render();
            }
          }
        }

        if (this.onEdit && event.data !== undefined || event.data.length === 0) {
          if (this.editorWindow) {
            this.editorWindow.close();
          }

          this.onEdit = false;
          this.postedId = undefined;
          window.removeEventListener('message', this.listenMessage.bind(this), false);
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].message.setMessage('Draw.io editor closed', 'info');
        }
      }
    }
  }, {
    key: "openDrawEditor",
    value: function openDrawEditor(name) {
      var fc = this.getFlowchart(name);
      var urlEditor = fc.getUrlEditor();
      var theme = this.getFlowchart(name).getThemeEditor();
      var urlParams = "".concat(urlEditor, "?embed=1&spin=1&libraries=1&ui=").concat(theme, "&ready=fc-").concat(fc.id, "&src=grafana");
      this.editorWindow = window.open(urlParams, 'MxGraph Editor', 'width=1280, height=720');
      this.onEdit = true;
      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].message.setMessage("Opening current flowchart on draw.io editor", 'info');
      window.addEventListener('message', this.listenMessage.bind(this), false);
    }
  }, {
    key: "getFlowchartNames",
    value: function getFlowchartNames() {
      return this.flowcharts.map(function (f) {
        return f.data.name;
      });
    }
  }], [{
    key: "getDefaultData",
    value: function getDefaultData() {
      return {
        editorUrl: 'https://www.draw.io',
        editorTheme: 'kennedy',
        main: 'Main',
        flowcharts: []
      };
    }
  }, {
    key: "getDefaultDioGraph",
    value: function getDefaultDioGraph() {
      var result = FlowchartHandler.defaultXml;

      if (!result) {
        var url = "".concat(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getRootPath()).concat(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_FILE_DEFAULTDIO);
        result = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.$loadFile(url);
      }

      return result;
    }
  }, {
    key: "getDefaultCsvGraph",
    value: function getDefaultCsvGraph() {
      var result = FlowchartHandler.defaultCsv;

      if (!result) {
        var url = "".concat(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getRootPath()).concat(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_FILE_DEFAULTCSV);
        result = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.$loadFile(url);
      }

      return result;
    }
  }]);

  return FlowchartHandler;
}();

/***/ }),

/***/ "./flowchart_class.ts":
/*!****************************!*\
  !*** ./flowchart_class.ts ***!
  \****************************/
/*! exports provided: Flowchart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Flowchart", function() { return Flowchart; });
/* harmony import */ var graph_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graph_class */ "./graph_class.ts");
/* harmony import */ var statesHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! statesHandler */ "./statesHandler.ts");
/* harmony import */ var flowchartHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flowchartHandler */ "./flowchartHandler.ts");
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Flowchart = function () {
  function Flowchart(name, container, ctrl, data) {
    _classCallCheck(this, Flowchart);

    this.xgraph = undefined;
    this.data = data;
    this.data.name = name;
    this.container = container;
    this.templateSrv = ctrl.templateSrv;
    this.id = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].utils.uniqueID();
  }

  _createClass(Flowchart, [{
    key: "import",
    value: function _import(obj) {
      globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.info("flowchart[".concat(this.data.name, "].import()"));

      if (!!obj.download || this.data.download === false) {
        this.data.download = obj.download;
      }

      if (!!obj.source) {
        this.data.type = obj.source.type;
        this.data.xml = obj.source.xml.value;
        this.data.url = obj.source.url.value;
      }

      if (!!obj.options) {
        this.data.zoom = obj.options.zoom;
        this.data.center = obj.options.center;
        this.data.scale = obj.options.scale;
        this.data.lock = obj.options.lock;
        this.data.allowDrawio = false;
        this.data.tooltip = obj.options.tooltip;
        this.data.grid = obj.options.grid;
        this.data.bgColor = obj.options.bgColor;
      }

      if (!!obj.type) {
        this.data.type = obj.type;
      }

      if (!!obj.xml) {
        this.data.xml = obj.xml;
      }

      if (!!obj.csv) {
        this.data.csv = obj.csv;
      }

      if (!!obj.url) {
        this.data.url = obj.url;
      }

      if (!!obj.zoom) {
        this.data.zoom = obj.zoom;
      }

      if (!!obj.center || obj.center === false) {
        this.data.center = obj.center;
      }

      if (!!obj.scale || obj.scale === false) {
        this.data.scale = obj.scale;
      }

      if (!!obj.lock || obj.lock === false) {
        this.data.lock = obj.lock;
      }

      if (!!obj.allowDrawio || obj.allowDrawio === false) {
        this.data.allowDrawio = obj.allowDrawio;
      }

      if (!!obj.enableAnim || obj.enableAnim === false) {
        this.data.enableAnim = obj.enableAnim;
      }

      if (!!obj.tooltip) {
        this.data.tooltip = obj.tooltip;
      }

      if (!!obj.grid || obj.grid === false) {
        this.data.grid = obj.grid;
      }

      if (!!obj.bgColor) {
        this.data.bgColor = obj.bgColor;
      }

      if (!!obj.editorUrl) {
        this.data.editorUrl = obj.editorUrl;
      }

      if (!!obj.editorTheme) {
        this.data.editorTheme = obj.editorTheme;
      }

      this.init();
      return this;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "updateStates",
    value: function updateStates(rules) {
      var _this = this;

      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'updateStates()');
      rules.forEach(function (rule) {
        if (_this.stateHandler !== undefined) {
          rule.states = _this.stateHandler.getStatesForRule(rule);

          if (rule.states) {
            rule.states.forEach(function (state) {
              state.unsetState();
            });
          } else {
            globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.warn('States not defined for this rule');
          }
        } else {
          globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.error('updateStates => this.stateHandler undefined');
        }
      });
      trc.after();
      return this;
    }
  }, {
    key: "init",
    value: function init() {
      try {
        var content = this.getContent();

        if (this.xgraph === undefined) {
          this.xgraph = new graph_class__WEBPACK_IMPORTED_MODULE_0__["default"](this.container, this.data.type, content);
        }

        if (content !== undefined && content !== null) {
          if (this.data.allowDrawio) {
            this.xgraph.allowDrawio(true);
          } else {
            this.xgraph.allowDrawio(false);
          }

          if (this.data.enableAnim) {
            this.xgraph.enableAnim(true);
          } else {
            this.xgraph.enableAnim(false);
          }

          this.setOptions();
          this.xgraph.drawGraph();

          if (this.data.tooltip) {
            this.xgraph.tooltipGraph(true);
          }

          if (this.data.scale) {
            this.xgraph.scaleGraph(true);
          } else {
            this.xgraph.zoomGraph(this.data.zoom);
          }

          if (this.data.center) {
            this.xgraph.centerGraph(true);
          }

          if (this.data.lock) {
            this.xgraph.lockGraph(true);
          }

          this.stateHandler = new statesHandler__WEBPACK_IMPORTED_MODULE_1__["StateHandler"](this.xgraph);
          globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].message.clearMessage();
        } else {
          globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].message.setMessage('Source content empty Graph not defined', 'error');
          globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.error('Source content empty Graph not defined');
        }
      } catch (error) {
        globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].message.setMessage('Unable to initialize graph', 'error');
        globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.error('Unable to initialize graph', error);
      }

      return this;
    }
  }, {
    key: "getStateHandler",
    value: function getStateHandler() {
      return this.stateHandler;
    }
  }, {
    key: "getXGraph",
    value: function getXGraph() {
      return this.xgraph;
    }
  }, {
    key: "setStates",
    value: function setStates(rules, metrics) {
      globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.info("flowchart[".concat(this.data.name, "].setStates()"));

      if (rules === undefined) {
        globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.warn("Rules shoudn't be null");
      }

      if (metrics === undefined) {
        globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.warn("Metrics shoudn't be null");
      }

      if (this.stateHandler) {
        this.stateHandler.setStates(rules, metrics);
      }

      return this;
    }
  }, {
    key: "setOptions",
    value: function setOptions() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'setOptions()');
      this.setScale(this.data.scale);
      this.setCenter(this.data.center);
      this.setGrid(this.data.grid);
      this.setTooltip(this.data.tooltip);
      this.setLock(this.data.lock);
      this.setZoom(this.data.zoom);
      this.setBgColor(this.data.bgColor);
      trc.after();
      return this;
    }
  }, {
    key: "applyStates",
    value: function applyStates() {
      globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.info("flowchart[".concat(this.data.name, "].applyStates()"));

      if (this.stateHandler) {
        this.stateHandler.applyStates();
      }

      return this;
    }
  }, {
    key: "applyOptions",
    value: function applyOptions() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'applyOptions()');

      if (this.xgraph) {
        this.xgraph.applyGraph();
      }

      trc.after();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (this.xgraph) {
        this.xgraph.refresh();
      }
    }
  }, {
    key: "redraw",
    value: function redraw(content) {
      if (content !== undefined) {
        this.setContent(content);
      }

      if (this.xgraph !== undefined) {
        this.xgraph.setContent(this.getContent());
      }

      this.applyOptions();
    }
  }, {
    key: "reload",
    value: function reload() {
      if (this.xgraph !== undefined && this.xgraph !== null) {
        this.xgraph.destroyGraph();
        this.xgraph = undefined;
        this.init();
      } else {
        this.init();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.toBack();

      if (this.xgraph !== undefined && this.xgraph !== null) {
        this.xgraph.destroyGraph();
        this.xgraph = undefined;
      }

      this.container.remove();
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.data.name = name;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.data.name;
    }
  }, {
    key: "setLock",
    value: function setLock(bool) {
      this.data.lock = bool;

      if (this.xgraph) {
        this.xgraph.lock = bool;
      }

      return this;
    }
  }, {
    key: "applyLock",
    value: function applyLock(bool) {
      if (bool !== undefined) {
        this.data.lock = bool;
      }

      if (this.xgraph) {
        this.xgraph.lockGraph(this.data.lock);
      }

      return this;
    }
  }, {
    key: "setTooltip",
    value: function setTooltip(bool) {
      this.data.tooltip = bool;

      if (this.xgraph) {
        this.xgraph.tooltip = bool;
      }

      return this;
    }
  }, {
    key: "applyTooltip",
    value: function applyTooltip(bool) {
      if (bool !== undefined) {
        this.data.tooltip = bool;
      }

      if (this.xgraph) {
        this.xgraph.tooltipGraph(this.data.tooltip);
      }

      return this;
    }
  }, {
    key: "setScale",
    value: function setScale(bool) {
      this.data.scale = bool;

      if (this.xgraph) {
        this.xgraph.scale = bool;
      }

      return this;
    }
  }, {
    key: "setBgColor",
    value: function setBgColor(bgColor) {
      this.data.bgColor = bgColor;

      if (this.xgraph) {
        this.xgraph.bgColor = bgColor;
      }

      return this;
    }
  }, {
    key: "ApplyBgColor",
    value: function ApplyBgColor(bgColor) {
      this.data.bgColor = bgColor;

      if (bgColor) {
        if (this.xgraph) {
          this.xgraph.bgGraph(bgColor);
        }
      }

      return this;
    }
  }, {
    key: "applyScale",
    value: function applyScale(bool) {
      if (bool !== undefined) {
        this.data.scale = bool;
      }

      if (this.xgraph) {
        this.xgraph.scaleGraph(this.data.scale);
      }

      return this;
    }
  }, {
    key: "setCenter",
    value: function setCenter(bool) {
      this.data.center = bool;

      if (this.xgraph) {
        this.xgraph.center = bool;
      }

      return this;
    }
  }, {
    key: "getNamesByProp",
    value: function getNamesByProp(prop) {
      if (this.xgraph) {
        return this.xgraph.getOrignalCells(prop);
      }

      return [];
    }
  }, {
    key: "getXml",
    value: function getXml() {
      var replaceVarBool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!replaceVarBool) {
        return this.data.xml;
      }

      return this.templateSrv.replaceWithText(this.data.xml);
    }
  }, {
    key: "getCsv",
    value: function getCsv() {
      var replaceVarBool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!replaceVarBool) {
        return this.data.csv;
      }

      return this.templateSrv.replaceWithText(this.data.csv);
    }
  }, {
    key: "getSource",
    value: function getSource() {
      var replaceVarBool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.data.type === 'xml') {
        return this.getXml(replaceVarBool);
      }

      if (this.data.type === 'csv') {
        return this.getCsv(replaceVarBool);
      }

      return '';
    }
  }, {
    key: "getUrlEditor",
    value: function getUrlEditor() {
      return this.data.editorUrl;
    }
  }, {
    key: "getThemeEditor",
    value: function getThemeEditor() {
      return this.data.editorTheme;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var replaceVarBool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'getContent()');
      var content = '';

      if (this.data.download) {
        var url = this.templateSrv.replaceWithText(this.data.url);
        globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].message.setMessage('Loading content defition', 'info');
        content = this.loadContent(url);
        globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].message.clearMessage();

        if (content !== null) {
          if (replaceVarBool) {
            content = this.templateSrv.replaceWithText(content);
          }
        }
      } else {
        content = this.getSource(replaceVarBool);
      }

      trc.after();
      return content === null ? '' : content;
    }
  }, {
    key: "setContent",
    value: function setContent(content) {
      if (this.data.type === 'xml') {
        this.data.xml = content;
      }

      if (this.data.type === 'csv') {
        this.data.csv = content;
      }

      return this;
    }
  }, {
    key: "loadContent",
    value: function loadContent(url) {
      return globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].utils.$loadFile(url);
    }
  }, {
    key: "renameId",
    value: function renameId(oldId, newId) {
      if (this.xgraph) {
        this.xgraph.renameId(oldId, newId);
      }

      return this;
    }
  }, {
    key: "applyModel",
    value: function applyModel() {
      if (this.xgraph) {
        this.data.xml = this.xgraph.getXmlModel();
      }

      this.redraw();
      return this;
    }
  }, {
    key: "center",
    value: function center(bool) {
      if (bool !== undefined) {
        this.data.center = bool;
      }

      if (this.xgraph) {
        this.xgraph.centerGraph(this.data.center);
      }

      return this;
    }
  }, {
    key: "setZoom",
    value: function setZoom(percent) {
      this.data.zoom = percent;

      if (this.xgraph) {
        this.xgraph.zoomPercent = percent;
      }

      return this;
    }
  }, {
    key: "zoom",
    value: function zoom(percent) {
      if (percent !== undefined) {
        this.data.zoom = percent;
      }

      if (this.xgraph) {
        this.xgraph.zoomGraph(this.data.zoom);
      }

      return this;
    }
  }, {
    key: "setGrid",
    value: function setGrid(bool) {
      this.data.grid = bool;

      if (this.xgraph) {
        this.xgraph.grid = bool;
      }

      return this;
    }
  }, {
    key: "grid",
    value: function grid(bool) {
      if (bool !== undefined) {
        this.data.grid = bool;
      }

      if (this.xgraph) {
        this.xgraph.gridGraph(this.data.grid);
      }

      return this;
    }
  }, {
    key: "setXml",
    value: function setXml(xml) {
      this.data.xml = xml;
      return this;
    }
  }, {
    key: "setCsv",
    value: function setCsv(csv) {
      this.data.csv = csv;
      return this;
    }
  }, {
    key: "minify",
    value: function minify() {
      this.data.xml = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].utils.minify(this.data.xml);
    }
  }, {
    key: "prettify",
    value: function prettify() {
      this.data.xml = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].utils.prettify(this.data.xml);
    }
  }, {
    key: "decode",
    value: function decode() {
      if (globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].utils.isencoded(this.data.xml)) {
        this.data.xml = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].utils.decode(this.data.xml, true, true, true);
      }
    }
  }, {
    key: "encode",
    value: function encode() {
      if (!globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].utils.isencoded(this.data.xml)) {
        this.data.xml = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].utils.encode(this.data.xml, true, true, true);
      }
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }
  }, {
    key: "setMap",
    value: function setMap(onMappingObj) {
      var container = this.getContainer();

      if (this.xgraph) {
        this.xgraph.setMap(onMappingObj);
      }

      container.scrollIntoView();
      container.focus();
    }
  }, {
    key: "unsetMap",
    value: function unsetMap() {
      if (this.xgraph) {
        this.xgraph.unsetMap();
      }
    }
  }, {
    key: "toFront",
    value: function toFront() {
      this.container.className = 'GF_show';
    }
  }, {
    key: "toBack",
    value: function toBack() {
      this.container.className = 'GF_hide';
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.container.className !== 'GF_hide';
    }
  }], [{
    key: "getDefaultData",
    value: function getDefaultData() {
      return {
        name: 'name',
        xml: flowchartHandler__WEBPACK_IMPORTED_MODULE_2__["FlowchartHandler"].getDefaultDioGraph(),
        csv: flowchartHandler__WEBPACK_IMPORTED_MODULE_2__["FlowchartHandler"].getDefaultCsvGraph(),
        download: false,
        type: 'xml',
        url: 'http://<YourUrl>/<Your XML/drawio file/api>',
        zoom: '100%',
        center: true,
        scale: true,
        lock: true,
        allowDrawio: true,
        enableAnim: true,
        tooltip: true,
        grid: false,
        bgColor: null,
        editorUrl: 'https://www.draw.io',
        editorTheme: 'dark'
      };
    }
  }]);

  return Flowchart;
}();

/***/ }),

/***/ "./flowchart_ctrl.ts":
/*!***************************!*\
  !*** ./flowchart_ctrl.ts ***!
  \***************************/
/*! exports provided: FlowchartCtrl, MetricsPanelCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlowchartCtrl", function() { return FlowchartCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricsPanelCtrl", function() { return FlowchartCtrl; });
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mapping_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mapping_options */ "./mapping_options.ts");
/* harmony import */ var flowchart_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flowchart_options */ "./flowchart_options.ts");
/* harmony import */ var inspect_options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inspect_options */ "./inspect_options.ts");
/* harmony import */ var rulesHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rulesHandler */ "./rulesHandler.ts");
/* harmony import */ var flowchartHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flowchartHandler */ "./flowchartHandler.ts");
/* harmony import */ var metricHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! metricHandler */ "./metricHandler.ts");
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
/* harmony import */ var grafana_func__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! grafana_func */ "./grafana_func.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var FlowchartCtrl = function (_MetricsPanelCtrl) {
  FlowchartCtrl.$inject = ["$scope", "$injector", "$rootScope", "templateSrv"];

  _inherits(FlowchartCtrl, _MetricsPanelCtrl);

  function FlowchartCtrl($scope, $injector, $rootScope, templateSrv) {
    var _this;

    _classCallCheck(this, FlowchartCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlowchartCtrl).call(this, $scope, $injector));
    _this.GHApplied = false;
    globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].init($scope, templateSrv, _this.dashboard);
    _this.$rootScope = $rootScope;
    _this.$scope = $scope;
    _this.version = globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].plugin.getVersion();
    _this.templateSrv = templateSrv;
    _this.changedSource = true;
    _this.changedData = true;
    _this.changedOptions = true;
    _this.rulesHandler = undefined;
    _this.flowchartHandler = undefined;
    _this.metricHandler = undefined;
    _this.panelDefaults = {
      newFlag: true,
      format: 'short',
      valueName: 'current',
      rulesData: rulesHandler__WEBPACK_IMPORTED_MODULE_4__["RulesHandler"].getDefaultData(),
      flowchartsData: flowchartHandler__WEBPACK_IMPORTED_MODULE_5__["FlowchartHandler"].getDefaultData()
    };

    lodash__WEBPACK_IMPORTED_MODULE_9___default.a.defaults(_this.panel, _this.panelDefaults);

    _this.panel.graphId = "flowchart_".concat(_this.panel.id);
    _this.containerDivId = "container_".concat(_this.panel.graphId);

    _this.events.on(grafana_func__WEBPACK_IMPORTED_MODULE_8__["default"].PanelEvents.render, _this.onRender.bind(_assertThisInitialized(_this)));

    _this.events.on(grafana_func__WEBPACK_IMPORTED_MODULE_8__["default"].PanelEvents.refresh, _this.onRefresh.bind(_assertThisInitialized(_this)));

    _this.events.on(grafana_func__WEBPACK_IMPORTED_MODULE_8__["default"].PanelEvents.dataReceived, _this.onDataReceived.bind(_assertThisInitialized(_this)));

    _this.events.on(grafana_func__WEBPACK_IMPORTED_MODULE_8__["default"].PanelEvents.dataError, _this.onDataError.bind(_assertThisInitialized(_this)));

    _this.events.on(grafana_func__WEBPACK_IMPORTED_MODULE_8__["default"].PanelEvents.dataSnapshotLoad, _this.onDataReceived.bind(_assertThisInitialized(_this)));

    _this.events.on(grafana_func__WEBPACK_IMPORTED_MODULE_8__["default"].PanelEvents.editModeInitialized, _this.onInitEditMode.bind(_assertThisInitialized(_this)));

    grafana_func__WEBPACK_IMPORTED_MODULE_8__["default"].appEvents.on('graph-hover', _this.onGraphHover.bind(_assertThisInitialized(_this)), _this.$scope);
    grafana_func__WEBPACK_IMPORTED_MODULE_8__["default"].appEvents.on('graph-hover-clear', _this.clearCrosshair.bind(_assertThisInitialized(_this)), _this.$scope);

    _this.dashboard.events.on('template-variable-value-updated', _this.onVarChanged.bind(_assertThisInitialized(_this)), $scope);

    return _this;
  }

  _createClass(FlowchartCtrl, [{
    key: "onInitEditMode",
    value: function onInitEditMode() {
      this.addEditorTab('Flowchart', flowchart_options__WEBPACK_IMPORTED_MODULE_2__["flowchartOptionsTab"], 2);
      this.addEditorTab('Mapping', mapping_options__WEBPACK_IMPORTED_MODULE_1__["mappingOptionsTab"], 3);
      this.addEditorTab('Inspect', inspect_options__WEBPACK_IMPORTED_MODULE_3__["inspectOptionsTab"], 4);
    }
  }, {
    key: "onGraphHover",
    value: function onGraphHover(event) {
      var self = this;
      var flowchartHandler = this.flowchartHandler;

      if (this.dashboard.sharedTooltipModeEnabled() && flowchartHandler !== undefined) {
        var timestamp = event.pos.x;
        var id = 'graph-hover';
        globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].clearUniqTimeOut(id);

        var setGraphHover = function setGraphHover() {
          globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].setGraphHover(timestamp);
          flowchartHandler.graphHoverChanged();
          self.render();
          self.GHApplied = true;
          globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].clearUniqTimeOut(id);
        };

        globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].setUniqTimeOut(setGraphHover, globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].CONSTANTS.CONF_GRAPHHOVER_DELAY, id);
      } else if (self.GHApplied) {
        globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].unsetGraphHover();
      }
    }
  }, {
    key: "clearCrosshair",
    value: function clearCrosshair(event) {
      if (this.flowchartHandler !== undefined && this.GHApplied) {
        var id = 'graph-hover';
        this.GHApplied = false;
        globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].clearUniqTimeOut(id);
        globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].unsetGraphHover();
        this.flowchartHandler.graphHoverChanged();
        this.render();
      }
    }
  }, {
    key: "onRefresh",
    value: function onRefresh() {
      this.onRender();
    }
  }, {
    key: "onVarChanged",
    value: function onVarChanged() {
      if (this.flowchartHandler !== undefined) {
        this.flowchartHandler.flagSourceChanged();
        this.flowchartHandler.render();
      }
    }
  }, {
    key: "onRender",
    value: function onRender() {}
  }, {
    key: "onDataReceived",
    value: function onDataReceived(dataList) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].trace.before(this.constructor.name + '.' + 'onDataReceived()');

      if (!!this.metricHandler) {
        this.metricHandler.initData(dataList);

        if (!!this.flowchartHandler) {
          this.flowchartHandler.dataChanged();
        }
      }

      this.render();
      trc.after();
      globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].trace.resume();
    }
  }, {
    key: "onDataError",
    value: function onDataError() {
      this.render();
    }
  }, {
    key: "link",
    value: function link(scope, elem, attrs, ctrl) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].trace.before(this.constructor.name + '.' + 'link()');
      this.metricHandler = new metricHandler__WEBPACK_IMPORTED_MODULE_6__["MetricHandler"](this.$scope);
      var newRulesData = rulesHandler__WEBPACK_IMPORTED_MODULE_4__["RulesHandler"].getDefaultData();
      this.rulesHandler = new rulesHandler__WEBPACK_IMPORTED_MODULE_4__["RulesHandler"](newRulesData);

      if (this.panel.version === undefined && this.panel.styles !== undefined) {
        this.rulesHandler["import"](this.panel.styles);
        delete this.panel.styles;
      } else {
        this.rulesHandler["import"](this.panel.rulesData);
      }

      if (this.panel.newFlag && this.rulesHandler.countRules() === 0) {
        this.rulesHandler.addRule('.*');
      }

      this.panel.rulesData = newRulesData;
      var newFlowchartsData = flowchartHandler__WEBPACK_IMPORTED_MODULE_5__["FlowchartHandler"].getDefaultData();
      this.flowchartHandler = new flowchartHandler__WEBPACK_IMPORTED_MODULE_5__["FlowchartHandler"](scope, elem, ctrl, newFlowchartsData);

      if (this.panel.version === undefined && this.panel.flowchart !== undefined) {
        this.flowchartHandler["import"]([this.panel.flowchart]);
        delete this.panel.flowchart;
      } else {
        this.flowchartHandler["import"](this.panel.flowchartsData);
      }

      if (this.panel.newFlag && this.flowchartHandler.countFlowcharts() === 0) {
        this.flowchartHandler.addFlowchart('Main');
      }

      this.panel.flowchartsData = newFlowchartsData;
      this.panel.newFlag = false;
      this.panel.version = this.version;
      trc.after();
    }
  }, {
    key: "$onDestroy",
    value: function $onDestroy() {
      globals_class__WEBPACK_IMPORTED_MODULE_7__["$GF"].destroy();
    }
  }]);

  return FlowchartCtrl;
}(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__["MetricsPanelCtrl"]);


FlowchartCtrl.templateUrl = './partials/module.html';

/***/ }),

/***/ "./flowchart_options.ts":
/*!******************************!*\
  !*** ./flowchart_options.ts ***!
  \******************************/
/*! exports provided: FlowchartOptionsCtrl, flowchartOptionsTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlowchartOptionsCtrl", function() { return FlowchartOptionsCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flowchartOptionsTab", function() { return flowchartOptionsTab; });
/* harmony import */ var graph_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graph_class */ "./graph_class.ts");
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
flowchartOptionsTab.$inject = ["$q", "$sce", "uiSegmentSrv"];

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var FlowchartOptionsCtrl = function () {
  FlowchartOptionsCtrl.$inject = ["$scope"];

  function FlowchartOptionsCtrl($scope) {
    _classCallCheck(this, FlowchartOptionsCtrl);

    this.sourceTypes = globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].CONSTANTS.SOURCE_TYPES;
    this.themes = globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].CONSTANTS.DIOTHEME_TYPES;
    this.errorSourceFlag = false;
    this.errorSourceMsg = '';
    this.errorDownloadFlag = false;
    this.errorDownloadMsg = '';
    this.editMode = false;
    this.newName = '';
    this.currentFlowchartName = 'Main';
    $scope.editor = this;
    $scope.$GF = globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].me();
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.currentFlowchart = this.flowchartHandler.getFlowchart();
  }

  _createClass(FlowchartOptionsCtrl, [{
    key: "render",
    value: function render() {
      this.flowchartHandler.render();
    }
  }, {
    key: "onSourceChange",
    value: function onSourceChange() {
      var name = this.flowchartHandler.getCurrentFlowchartName();
      this.flowchartHandler.flagSourceChanged(name);
      this.render();
    }
  }, {
    key: "onOptionChange",
    value: function onOptionChange() {
      var name = this.flowchartHandler.getCurrentFlowchartName();
      this.flowchartHandler.flagOptionChanged(name);
      this.render();
    }
  }, {
    key: "onColorChange",
    value: function onColorChange() {
      this.onOptionChange();
    }
  }, {
    key: "checkSource_onSourceChange",
    value: function checkSource_onSourceChange(source) {
      var bool = graph_class__WEBPACK_IMPORTED_MODULE_0__["default"].isValidXml(source);
      this.errorSourceFlag = !bool;

      if (!bool) {
        globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage('Invalid Xml definition', 'error');
      } else {
        globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.clearMessage();
        this.onSourceChange();
        this.$scope.$applyAsync();
      }

      return bool;
    }
  }, {
    key: "addFlowchart",
    value: function addFlowchart() {
      this.editMode = true;
      this.currentFlowchart = this.flowchartHandler.addFlowchart(this.flowchartHandler.getFlowchartTmpName());
      this.flowchartHandler.setCurrentFlowchart(this.currentFlowchart.getName());
      globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage(this.currentFlowchart.getName());
      this.newName = this.currentFlowchart.getName();
    }
  }, {
    key: "removeFlowchart",
    value: function removeFlowchart() {
      var current = this.flowchartHandler.getCurrentFlowchart();

      if (current !== undefined && current.getName() !== 'Main') {
        this.currentFlowchart = this.flowchartHandler.setCurrentFlowchart();
        this.currentFlowchartName = this.flowchartHandler.getCurrentFlowchartName();
        globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage(this.currentFlowchartName);
        this.flowchartHandler.removeFlowchart(current.getName());
      }
    }
  }, {
    key: "selectFlowchart",
    value: function selectFlowchart() {
      this.flowchartHandler.setCurrentFlowchart(this.currentFlowchartName);
      this.currentFlowchart = this.flowchartHandler.getCurrentFlowchart();

      if (this.currentFlowchart) {
        this.currentFlowchartName = this.flowchartHandler.getCurrentFlowchartName();
        globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage(this.currentFlowchartName);
      }
    }
  }, {
    key: "cancelFlowchart",
    value: function cancelFlowchart() {
      this.editMode = false;
      var canceled = this.currentFlowchart;
      this.currentFlowchart = this.flowchartHandler.setCurrentFlowchart('Main');

      if (canceled) {
        this.flowchartHandler.removeFlowchart(canceled.getName());

        if (this.currentFlowchart) {
          this.currentFlowchartName = this.currentFlowchart.getName();
        }
      }

      globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage(this.currentFlowchartName);
    }
  }, {
    key: "isValideFlowchart",
    value: function isValideFlowchart() {
      var fcs = this.flowchartHandler.getFlowchartNames();

      if (this.newName === undefined) {
        return false;
      }

      if (this.newName.length === 0) {
        return false;
      }

      if (fcs.includes(this.newName) && this.currentFlowchart && this.newName !== this.currentFlowchart.getName()) {
        globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage("Flowchart with name \"".concat(this.newName, "\" already exist"), 'error');
        return false;
      }

      return true;
    }
  }, {
    key: "validateFlowchart",
    value: function validateFlowchart() {
      this.editMode = false;

      if (this.currentFlowchart) {
        this.currentFlowchart.setName(this.newName);
      }

      this.currentFlowchartName = this.newName;
      this.currentFlowchart = this.flowchartHandler.setCurrentFlowchart(this.newName);
    }
  }, {
    key: "checkUrl_onSourceChange",
    value: function checkUrl_onSourceChange(url) {
      var _this = this;

      this.errorDownloadFlag = false;
      var init = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      };

      try {
        url = this.ctrl.templateSrv.replaceWithText(url);
        fetch(url, init).then(function (response) {
          if (!(response.status >= 200 && response.status <= 299)) {
            _this.errorSourceFlag = true;
            globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage("Error ".concat(response.status, " : ").concat(response.statusText), 'error');

            _this.$scope.$applyAsync();
          } else {
            response.text().then(function (text) {
              var fc = _this.flowchartHandler.getCurrentFlowchart();

              if (fc && fc.data.type === 'xml') {
                var bool = graph_class__WEBPACK_IMPORTED_MODULE_0__["default"].isValidXml(text);
                _this.errorSourceFlag = !bool;

                if (_this.errorSourceFlag) {
                  globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage('Response is an invalid Xml definition', 'error');
                  globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].log.error('Response is an invalid Xml definition');
                } else {
                  globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.clearMessage();

                  _this.onSourceChange();
                }
              } else {
                _this.onSourceChange();
              }

              _this.$scope.$applyAsync();
            });
          }
        })["catch"](function (error) {
          _this.errorSourceFlag = true;
          globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage("Error : ".concat(error), 'error');

          _this.$scope.$applyAsync();
        });
      } catch (error) {
        this.errorDownloadFlag = true;
        globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].message.setMessage('Error when call url', 'error');
      }

      return true;
    }
  }, {
    key: "edit",
    value: function edit(name) {
      this.flowchartHandler.openDrawEditor(name);
    }
  }, {
    key: "getFlowcharts",
    value: function getFlowcharts() {
      return this.flowchartHandler.getFlowcharts();
    }
  }, {
    key: "getNames",
    value: function getNames() {
      return this.flowchartHandler.getFlowchartNames();
    }
  }, {
    key: "getCurrentFlowchart",
    value: function getCurrentFlowchart() {
      var current = this.flowchartHandler.getCurrentFlowchart();

      if (current) {
        return [current];
      }

      return [this.flowchartHandler.flowcharts[0]];
    }
  }]);

  return FlowchartOptionsCtrl;
}();
function flowchartOptionsTab($q, $sce, uiSegmentSrv) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: "".concat(globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].plugin.getPartialPath(), "/flowchart/index.html"),
    controller: FlowchartOptionsCtrl
  };
}

/***/ }),

/***/ "./globals_class.ts":
/*!**************************!*\
  !*** ./globals_class.ts ***!
  \**************************/
/*! exports provided: GFVariables, $GF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GFVariables", function() { return GFVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$GF", function() { return $GF; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var GFCONSTANT = function GFCONSTANT() {
  _classCallCheck(this, GFCONSTANT);

  this.CONF_PATH_LIBS = 'libs/';
  this.CONF_PATH_DRAWIO = 'libs/drawio/';
  this.CONF_PATH_STATIC = 'static/';
  this.CONF_PATH_PARTIALS = 'partials/';
  this.CONF_PATH_STYLES = 'styles/';
  this.CONF_FILE_PLUGINJSON = './plugin.json';
  this.CONF_FILE_DEFAULTDIO = 'static/defaultGraph.drawio';
  this.CONF_FILE_DEFAULTCSV = 'static/defaultGraph.csv';
  this.CONF_FILE_SHAPESTXT = 'static/shapes.txt';
  this.CONF_FILE_APPJS = 'libs/drawio/js/app.min.js';
  this.CONF_FILE_SHAPESJS = 'libs/drawio/js/shapes.min.js';
  this.CONF_FILE_VIEWERJS = 'libs/drawio/js/viewer.min.js';
  this.CONF_FILE_PRECONFIGJS = 'libs/drawio/js/PreConfig.js';
  this.CONF_FILE_POSTCONFIGJS = 'libs/drawio/js/PostConfig.js';
  this.CONF_TOOLTIPS_DELAY = 200;
  this.CONF_GRAPHHOVER_DELAY = 50;
  this.CONF_COLORS_STEPS = 5;
  this.CONF_COLORS_MS = 50;
  this.CONF_ANIMS_STEP = 5;
  this.CONF_ANIMS_MS = 50;
  this.CONF_GFMESSAGE_MS = 5000;
  this.CONF_BLINK_COLOR = '#f5f242';
  this.VAR_STG_SHAPES = 'shapestext';
  this.VAR_TBL_SHAPES = 'shapesarray';
  this.VAR_STR_VIEWERJS = 'viewer.min.js';
  this.VAR_STR_SHAPESJS = 'shapes.min.js';
  this.VAR_STG_CTXROOT = 'contextroot';
  this.VAR_NUM_GHTIMESTAMP = 'graph-hover-timestamp';
  this.VAR_OBJ_TEMPLATESRV = 'templatesrv';
  this.VAR_OBJ_CTRL = 'ctrl';
  this.VAR_OBJ_DASHBOARD = 'dashboard';
  this.VAR_MAP_INTERVAL = 'interval';
  this.VAR_MAP_TIMEOUT = 'timeout';
  this.VAR_STR_RULENAME = '_rule';
  this.VAR_NUM_LEVEL = '_level';
  this.VAR_NUM_VALUE = '_value';
  this.VAR_STR_FORMATED = '_formated';
  this.VAR_STR_COLOR = '_color';
  this.TOOLTIP_APPLYON = [{
    text: 'Warning / Critical',
    value: 'wc'
  }, {
    text: 'Always',
    value: 'a'
  }];
  this.COLOR_APPLYON = [{
    text: 'Never',
    value: 'n'
  }, {
    text: 'Warning / Critical',
    value: 'wc'
  }, {
    text: 'Always',
    value: 'a'
  }];
  this.TEXT_APPLYON = [{
    text: 'Never',
    value: 'n'
  }, {
    text: 'When Metric Displayed',
    value: 'wmd'
  }, {
    text: 'Warning / Critical',
    value: 'wc'
  }, {
    text: 'Critical Only',
    value: 'co'
  }];
  this.LINK_APPLYON = [{
    text: 'Warning / Critical',
    value: 'wc'
  }, {
    text: 'Always',
    value: 'a'
  }];
  this.VALUE_TYPES = [{
    text: 'Number',
    value: 'number'
  }, {
    text: 'String',
    value: 'string'
  }, {
    text: 'Date',
    value: 'date'
  }];
  this.METRIC_TYPES = [{
    text: 'Series',
    value: 'serie'
  }, {
    text: 'Table',
    value: 'table'
  }];
  this.SOURCE_TYPES = [{
    text: 'XML',
    value: 'xml'
  }, {
    text: 'CSV',
    value: 'csv'
  }];
  this.DIOTHEME_TYPES = [{
    text: 'Dark',
    value: 'dark'
  }, {
    text: 'Light',
    value: 'kennedy'
  }, {
    text: 'Mobile',
    value: 'minimal'
  }, {
    text: 'atlas',
    value: 'atlas'
  }];
  this.IDENT_TYPES = [{
    text: 'Id',
    value: 'id'
  }, {
    text: 'Label',
    value: 'value'
  }];
  this.AGGREGATION_TYPES = [{
    text: 'First',
    value: 'first'
  }, {
    text: 'First (not null)',
    value: 'first_notnull'
  }, {
    text: 'Last',
    value: 'current'
  }, {
    text: 'Last (not null)',
    value: 'current_notnull'
  }, {
    text: 'Min',
    value: 'min'
  }, {
    text: 'Max',
    value: 'max'
  }, {
    text: 'Sum',
    value: 'total'
  }, {
    text: 'Avg',
    value: 'avg'
  }, {
    text: 'Count',
    value: 'count'
  }, {
    text: 'Delta',
    value: 'delta'
  }, {
    text: 'Range',
    value: 'range'
  }, {
    text: 'Diff',
    value: 'diff'
  }, {
    text: 'Time of last point',
    value: 'last_time'
  }];
  this.TOOLTIP_GRAPH_TYPES = [{
    text: 'Line',
    value: 'line'
  }, {
    text: 'Histogram',
    value: 'bar'
  }];
  this.TOOLTIP_GRAPH_SCALE_TYPES = [{
    text: 'Linear',
    value: 'linear'
  }, {
    text: 'Logarithmic',
    value: 'log'
  }];
  this.TOOLTIP_GRAPH_SIZE_TYPES = [{
    text: 'Adjustable',
    value: '100%'
  }, {
    text: 'Small',
    value: '100px'
  }, {
    text: 'Medium',
    value: '200px'
  }, {
    text: 'Large',
    value: '400px'
  }];
  this.TOOLTIP_DIRECTION_TYPES = [{
    text: 'Vertical',
    value: 'v'
  }, {
    text: 'Horizontal ',
    value: 'h'
  }];
  this.VALUE_DATEFORMAT_TYPES = [{
    text: 'YYYY-MM-DD HH:mm:ss',
    value: 'YYYY-MM-DD HH:mm:ss'
  }, {
    text: 'YYYY-MM-DD HH:mm:ss.SSS',
    value: 'YYYY-MM-DD HH:mm:ss.SSS'
  }, {
    text: 'MM/DD/YY h:mm:ss a',
    value: 'MM/DD/YY h:mm:ss a'
  }, {
    text: 'MMMM D, YYYY LT',
    value: 'MMMM D, YYYY LT'
  }, {
    text: 'YYYY-MM-DD',
    value: 'YYYY-MM-DD'
  }];
  this.VALUEMAPPINGTYPES = [{
    text: 'Value to text',
    value: 1
  }, {
    text: 'Range to text',
    value: 2
  }];
  this.TEXTMETHODS = [{
    text: 'All content',
    value: 'content'
  }, {
    text: 'Substring',
    value: 'pattern',
    placeholder: '/RegEx/'
  }, {
    text: 'Append (Space) ',
    value: 'as'
  }, {
    text: 'Append (New line) ',
    value: 'anl'
  }];
  this.COLORMETHODS = [{
    text: 'Shape Stroke/Border',
    value: 'strokeColor'
  }, {
    text: 'Shape Fill',
    value: 'fillColor'
  }, {
    text: 'Shape Gradient',
    value: 'gradientColor'
  }, {
    text: 'Label font color',
    value: 'fontColor'
  }, {
    text: 'Label background color',
    value: 'labelBackgroundColor'
  }, {
    text: 'Label border color',
    value: 'labelBorderColor'
  }, {
    text: 'Image background',
    value: 'imageBackground'
  }, {
    text: 'Image border',
    value: 'imageBorder'
  }];
  this.EVENTMETHODS = [{
    text: 'Shape : Change form (text)',
    value: 'shape',
    type: 'text',
    placeholder: 'Shape name'
  }, {
    text: 'Shape : Rotate Shape (0-360)',
    value: 'rotation',
    type: 'number',
    placeholder: '0-360',
    "default": 0
  }, {
    text: 'Shape : Blink (frequence ms)',
    value: 'blink',
    type: 'number',
    placeholder: 'Number in ms',
    "default": 500
  }, {
    text: 'Shape : Hide/Show (0|1)',
    value: 'visibility',
    type: 'number',
    placeholder: '0 or 1',
    typeahead: '0|1'
  }, {
    text: 'Shape : Height (number)',
    value: 'height',
    type: 'number',
    placeholder: 'Number of px'
  }, {
    text: 'Shape : Width (number)',
    value: 'width',
    type: 'number',
    placeholder: 'Number of px'
  }, {
    text: 'Shape : Resize (percent)',
    value: 'size',
    type: 'number',
    placeholder: 'percent'
  }, {
    text: 'Shape : Opacity (0-100)',
    value: 'opacity',
    type: 'number',
    placeholder: '0-100',
    "default": 100
  }, {
    text: 'Shape : Gradient direction',
    value: 'gradientDirection',
    type: 'text',
    placeholder: 'Direction name',
    "default": 'south',
    typeahead: 'south|east|north|west'
  }, {
    text: 'Shape : Collapse/Expande (0|1)',
    value: 'fold',
    type: 'number',
    placeholder: '0 or 1',
    typeahead: '0|1',
    "default": '1'
  }, {
    text: 'Shape : Change position in Bar (0-100)',
    value: 'barPos',
    type: 'number',
    placeholder: '0-100'
  }, {
    text: 'Shape : Flip horizontally (0|1)',
    value: 'flipH',
    type: 'number',
    placeholder: '0 or 1',
    typeahead: '0|1'
  }, {
    text: 'Shape : Flip vertically (0|1)',
    value: 'flipV',
    type: 'number',
    placeholder: '0 or 1',
    typeahead: '0|1'
  }, {
    text: 'Arrow : change start marker (text)',
    value: 'startArrow',
    type: 'text',
    placeholder: 'Marker',
    typeahead: 'none|classic|classicThin|block|blockThin|open|openThin|oval|diamond|diamondThin|openAsync|async|box|halfCircle|dash|cross|circlePlus|circle|ERone|ERmandOne|ERoneToMany|ERzeroToOne'
  }, {
    text: 'Arrow : change end marker (text)',
    value: 'endArrow',
    type: 'text',
    placeholder: 'Marker',
    typeahead: 'none|classic|classicThin|block|blockThin|open|openThin|oval|diamond|diamondThin|openAsync|async|box|halfCircle|dash|cross|circlePlus|circle|ERone|ERmandOne|ERoneToMany|ERzeroToOne'
  }, {
    text: 'Arrow : Anime flow (frequence ms)',
    value: 'class_mxEdgeFlow',
    type: 'number',
    placeholder: 'Number in ms'
  }, {
    text: 'Label : Replace text (text)',
    value: 'text',
    type: 'text',
    placeholder: 'Text'
  }, {
    text: 'Label : Font Size (numeric)',
    value: 'fontSize',
    type: 'number',
    placeholder: 'Number'
  }, {
    text: 'Label : Opacity (numeric)',
    value: 'textOpacity',
    type: 'number',
    placeholder: '0-100',
    "default": 100
  }, {
    text: 'Image : Change URL (text)',
    value: 'image',
    type: 'text',
    placeholder: 'Url'
  }];
  this.LOCALVARIABLENAMES = [{
    text: 'Name of the rule',
    value: this.VAR_STR_RULENAME
  }, {
    text: 'Current color according to the thresholds',
    value: this.VAR_STR_COLOR
  }, {
    text: 'Current raw value according to the aggregation',
    value: this.VAR_NUM_VALUE
  }, {
    text: 'Current level according to the thresholds',
    value: this.VAR_NUM_LEVEL
  }, {
    text: 'Current formated value accordingto the type',
    value: this.VAR_STR_FORMATED
  }];
};

var GFVariables = function () {
  function GFVariables() {
    _classCallCheck(this, GFVariables);

    this._variables = new Map();
  }

  _createClass(GFVariables, [{
    key: "set",
    value: function set(key, value) {
      this._variables.set(key, value);

      return this;
    }
  }, {
    key: "unset",
    value: function unset(key) {
      this._variables["delete"](key);

      return this;
    }
  }, {
    key: "get",
    value: function get(key) {
      return this._variables.get(key);
    }
  }, {
    key: "keys",
    value: function keys() {
      return Array.from(this._variables.keys());
    }
  }, {
    key: "getFullVarsNames",
    value: function getFullVarsNames() {
      return $GF.getGrafanaVars().concat(this.getVarsNames());
    }
  }, {
    key: "getVarsNames",
    value: function getVarsNames() {
      return this.keys().map(function (x) {
        return '${' + x + '}';
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      this._variables.clear();

      return this;
    }
  }, {
    key: "replaceText",
    value: function replaceText(text) {
      try {
        var templateSrv = $GF.getVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV);
        text = templateSrv !== undefined ? templateSrv.replaceWithText(text) : text;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._variables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            text = text.replace('${' + key + '}', value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } catch (error) {
        return text;
      }

      return text;
    }
  }, {
    key: "eval",
    value: function _eval(text) {
      var t = this.replaceText(text);
      return $GF.utils.evalIt(t);
    }
  }], [{
    key: "getAvailableLocalVarNames",
    value: function getAvailableLocalVarNames() {
      return $GF.CONSTANTS.LOCALVARIABLENAMES.map(function (x) {
        return '${' + x.value + '}';
      });
    }
  }]);

  return GFVariables;
}();

var GFLog = function () {
  function GFLog() {
    _classCallCheck(this, GFLog);
  }

  _createClass(GFLog, [{
    key: "debug",
    value: function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var _console, title;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (GFLog.toDisplay(GFLog.DEBUG)) {
                  title = args.shift();

                  (_console = console).debug.apply(_console, ["GF DEBUG : ".concat(title)].concat(args));
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
        var _console2, title;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (GFLog.toDisplay(GFLog.WARN)) {
                  title = args.shift();

                  (_console2 = console).warn.apply(_console2, ["GF WARN : ".concat(title)].concat(args));
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
        var _console3, title;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (GFLog.toDisplay(GFLog.INFO)) {
                  title = args.shift();

                  (_console3 = console).info.apply(_console3, ["GF INFO : ".concat(title)].concat(args));
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee4() {
        var _console4, title;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (GFLog.toDisplay(GFLog.ERROR)) {
                  title = args.shift();

                  (_console4 = console).error.apply(_console4, ["GF ERROR : ".concat(title)].concat(args));
                }

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
    }
  }], [{
    key: "init",
    value: function init() {
      return new GFLog();
    }
  }, {
    key: "toDisplay",
    value: function toDisplay(level) {
      if (GFLog.logDisplay !== undefined && GFLog.logDisplay === true) {
        if (GFLog.logLevel !== undefined && level >= GFLog.logLevel) {
          return true;
        }
      }

      return false;
    }
  }]);

  return GFLog;
}();

GFLog.DEBUG = 0;
GFLog.INFO = 1;
GFLog.WARN = 2;
GFLog.ERROR = 3;
GFLog.logLevel = GFLog.WARN;
GFLog.logDisplay = true;

var GFPlugin = function () {
  function GFPlugin() {
    _classCallCheck(this, GFPlugin);
  }

  _createClass(GFPlugin, [{
    key: "getRepo",
    value: function getRepo() {
      var url = '';
      GFPlugin.data.info.links.forEach(function (link) {
        if (link.name === 'Documentation') {
          url = link.url;
        }
      });
      return url;
    }
  }, {
    key: "getVersion",
    value: function getVersion() {
      return GFPlugin.data.info.version;
    }
  }, {
    key: "getRootPath",
    value: function getRootPath() {
      return $GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT);
    }
  }, {
    key: "getLibsPath",
    value: function getLibsPath() {
      return "".concat($GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT), "libs/");
    }
  }, {
    key: "getDrawioPath",
    value: function getDrawioPath() {
      return "".concat(this.getLibsPath(), "drawio/");
    }
  }, {
    key: "getStaticPath",
    value: function getStaticPath() {
      return "".concat(this.getRootPath(), "static/");
    }
  }, {
    key: "getMxBasePath",
    value: function getMxBasePath() {
      return "".concat(this.getDrawioPath(), "mxgraph/");
    }
  }, {
    key: "getMxStylePath",
    value: function getMxStylePath() {
      return "".concat(this.getDrawioPath(), "styles/");
    }
  }, {
    key: "getShapesPath",
    value: function getShapesPath() {
      return "".concat(this.getDrawioPath(), "/shapes/");
    }
  }, {
    key: "getPartialPath",
    value: function getPartialPath() {
      return "".concat(this.getRootPath(), "partials/");
    }
  }, {
    key: "getStencilsPath",
    value: function getStencilsPath() {
      return "".concat(this.getDrawioPath(), "/stencils/");
    }
  }, {
    key: "getMxCssPath",
    value: function getMxCssPath() {
      return "".concat(this.getDrawioPath(), "styles/");
    }
  }, {
    key: "getMxResourcePath",
    value: function getMxResourcePath() {
      return "".concat(this.getMxBasePath(), "css/");
    }
  }, {
    key: "getMxImagePath",
    value: function getMxImagePath() {
      return "".concat(this.getMxBasePath(), "images/");
    }
  }], [{
    key: "init",
    value: function init($scope, templateSrv, dashboard) {
      var plug = new GFPlugin();
      this.contextRoot = GFPlugin.defaultContextRoot;

      if ($scope === undefined) {
        this.contextRoot = __dirname;

        if (this.contextRoot.length > 0) {
          $GF.setVar($GF.CONSTANTS.VAR_STG_CTXROOT, this.contextRoot);
        }
      } else {
        this.contextRoot = $scope.$root.appSubUrl + this.defaultContextRoot;
      }

      $GF.setVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV, templateSrv);
      $GF.setVar($GF.CONSTANTS.VAR_STG_CTXROOT, this.contextRoot);
      $GF.setVar($GF.CONSTANTS.VAR_OBJ_DASHBOARD, dashboard);
      return plug;
    }
  }]);

  return GFPlugin;
}();

GFPlugin.data = __webpack_require__(/*! ./plugin.json */ "./plugin.json");
GFPlugin.defaultContextRoot = '/public/plugins/agenty-flowcharting-panel/';

var GFMessage = function () {
  function GFMessage(parent) {
    _classCallCheck(this, GFMessage);

    var container = parent.querySelector('div#flowcharting-message');

    if (container !== null) {
      GFMessage.container = container;
      var span = container.querySelector('#message-text');

      if (span === null) {
        GFMessage.message = document.createElement('span');
        GFMessage.container.appendChild(GFMessage.message);
      } else {
        GFMessage.message = span;
      }
    }
  }

  _createClass(GFMessage, [{
    key: "setMessage",
    value: function setMessage(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : GFMessage.INFO_MESSAGE;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return");

              case 6:
                GFMessage.message.style.color = GFMessage.INFO_COLOR;
                return _context5.abrupt("break", 14);

              case 8:
                GFMessage.message.style.color = GFMessage.ERROR_COLOR;
                return _context5.abrupt("break", 14);

              case 10:
                GFMessage.message.style.color = GFMessage.WARNING_COLOR;
                return _context5.abrupt("break", 14);

              case 12:
                GFMessage.message.style.color = GFMessage.INFO_COLOR;
                return _context5.abrupt("break", 14);

              case 14:
                GFMessage.container.style.display = '';
                $GF.setUniqTimeOut(this.clearMessage, $GF.CONSTANTS.CONF_GFMESSAGE_MS, 'flowcharting-message');

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    }
  }, {
    key: "clearMessage",
    value: function clearMessage() {
      return;

      if (GFMessage.container && GFMessage.message) {
        GFMessage.container.style.display = 'none';
        GFMessage.message.innerHTML = '';
      }

      $GF.clearUniqTimeOut('flowcharting-message');
    }
  }], [{
    key: "init",
    value: function init(parentDiv) {
      return new GFMessage(parentDiv);
    }
  }]);

  return GFMessage;
}();

GFMessage.ERROR_MESSAGE = 'error';
GFMessage.ERROR_COLOR = 'red';
GFMessage.INFO_MESSAGE = 'info';
GFMessage.INFO_COLOR = 'white';
GFMessage.WARNING_MESSAGE = 'warning';
GFMessage.WARNING_COLOR = 'yellow';

var GFTrace = function () {
  function GFTrace(fn) {
    _classCallCheck(this, GFTrace);

    if (GFTrace.enable && fn !== undefined) {
      this.trace = {
        Name: fn,
        Id: $GF.utils.uniqueID(),
        Args: undefined,
        Return: undefined,
        Before: Date.now(),
        End: undefined,
        ExecTime: undefined,
        Indent: GFTrace.indent
      };
      GFTrace.trc.set(this.trace.Id, this.trace);
    }
  }

  _createClass(GFTrace, [{
    key: "before",
    value: function before(fn) {
      if (GFTrace.enable && fn !== undefined) {
        var t = new GFTrace(fn);
        GFTrace.indent++;

        GFTrace._inc(fn);

        return t;
      }

      return {
        after: function after() {}
      };
    }
  }, {
    key: "after",
    value: function after() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (GFTrace.enable && this.trace !== undefined) {
                  if (this.trace) {
                    this.trace.End = Date.now();
                    GFTrace.indent--;
                  }
                }

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
    }
  }, {
    key: "clear",
    value: function clear() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (GFTrace.enable) {
                  GFTrace.trc.clear();
                  GFTrace.fn.clear();
                }

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
    }
  }, {
    key: "enable",
    value: function enable() {
      GFTrace.enable = true;
    }
  }, {
    key: "disable",
    value: function disable() {
      GFTrace.enable = false;
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return GFTrace.enable;
    }
  }, {
    key: "resume",
    value: function resume() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee8() {
        var tb, fn;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (GFTrace.enable) {
                  tb = [];
                  fn = [];
                  GFTrace.trc.forEach(function (trace) {
                    trace.ExecTime = trace.End - trace.Before;
                    var f = GFTrace.fn.get(trace.Name);
                    f.TotalTimes += trace.ExecTime;
                    tb.push(trace);
                  });
                  console.table(tb, ['Indent', 'Name', 'ExecTime']);
                  GFTrace.fn.forEach(function (f) {
                    fn.push(f);
                  });
                  console.table(fn, ['Function', 'Calls', 'TotalTimes']);
                  this.clear();
                }

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
    }
  }], [{
    key: "init",
    value: function init() {
      return new GFTrace();
    }
  }, {
    key: "_inc",
    value: function _inc(fn) {
      var f = GFTrace.fn.get(fn);

      if (f === undefined) {
        f = {
          Calls: 0,
          Function: fn,
          TotalTimes: 0
        };
      }

      f.Calls++;
      GFTrace.fn.set(fn, f);
    }
  }]);

  return GFTrace;
}();

GFTrace.enable = true;
GFTrace.trc = new Map();
GFTrace.fn = new Map();
GFTrace.indent = 0;
var $GF = function () {
  function $GF() {
    _classCallCheck(this, $GF);
  }

  _createClass($GF, null, [{
    key: "init",
    value: function init($scope, templateSrv, dashboard) {
      this.plugin = GFPlugin.init($scope, templateSrv, dashboard);

      if (this.DEBUG) {
        console.log('DEBUG Scope', $scope);
        console.log('DEBUG TemplateSrv', templateSrv);
        console.log('DEBUG Theme', dashboard.style);
        console.log('DEBUG dashboard', dashboard);
      }

      return this;
    }
  }, {
    key: "me",
    value: function me() {
      return this;
    }
  }, {
    key: "setMessageDiv",
    value: function setMessageDiv(html) {
      this.message = GFMessage.init(html);
    }
  }, {
    key: "getTheme",
    value: function getTheme() {
      var templateSrv = $GF.getVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV);
      var theme = templateSrv !== undefined ? templateSrv.style : 'dark';
      return theme;
    }
  }, {
    key: "createLocalVars",
    value: function createLocalVars() {
      var _v = new GFVariables();

      return _v;
    }
  }, {
    key: "getGlobalVars",
    value: function getGlobalVars() {
      if ($GF._globalvars === undefined) {
        $GF._globalvars = new GFVariables();
      }

      return $GF._globalvars;
    }
  }, {
    key: "getGrafanaVars",
    value: function getGrafanaVars() {
      var templateSrv = $GF.getVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV);

      if (templateSrv !== undefined && templateSrv !== null) {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(templateSrv.variables, function (variable) {
          return "${".concat(variable.name, "}");
        });
      }

      return [];
    }
  }, {
    key: "getVar",
    value: function getVar(key) {
      return $GF.getGlobalVars().get(key);
    }
  }, {
    key: "setVar",
    value: function setVar(key, value) {
      $GF.getGlobalVars().set(key, value);
    }
  }, {
    key: "unsetVar",
    value: function unsetVar(key) {
      $GF.getGlobalVars().unset(key);
    }
  }, {
    key: "getFullAvailableVarNames",
    value: function getFullAvailableVarNames() {
      return GFVariables.getAvailableLocalVarNames().concat($GF.getGrafanaVars());
    }
  }, {
    key: "getIntervalCounter",
    value: function getIntervalCounter(begin, end, count) {
      var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'linear';
      var result = [];
      var distance = end - begin;
      var step = Math.round(distance / count);
      var current = begin;
      var index = 0;

      for (index = 0; index < count; index++) {
        current += step;
        result.push(current);
      }

      result[index] = end;
      return result;
    }
  }, {
    key: "setUniqTimeOut",
    value: function setUniqTimeOut(fc, timer, id) {
      var timeout = $GF.getVar($GF.CONSTANTS.VAR_MAP_TIMEOUT);

      if (timeout === undefined) {
        timeout = new Map();
        $GF.setVar($GF.CONSTANTS.VAR_MAP_TIMEOUT, timeout);
      }

      if (id !== undefined) {
        this.clearUniqTimeOut(id);
      }

      var thread = window.setTimeout(fc, timer);
      id = id === undefined ? thread.toString() : id;
      timeout.set(id, thread);
      return id;
    }
  }, {
    key: "clearUniqTimeOut",
    value: function clearUniqTimeOut(id) {
      var timeout = $GF.getVar($GF.CONSTANTS.VAR_MAP_TIMEOUT);

      if (timeout !== undefined) {
        try {
          var tm = timeout.get(id);

          if (tm !== undefined) {
            timeout["delete"](id);
            window.clearTimeout(tm);
          }
        } catch (error) {
          $GF.log.warn('Failed to clear timeout thread', id, error);
        }
      }
    }
  }, {
    key: "setUniqInterval",
    value: function setUniqInterval(fc, timer, id) {
      var interval = $GF.getVar($GF.CONSTANTS.VAR_MAP_INTERVAL);

      if (interval === undefined) {
        interval = new Map();
        $GF.setVar($GF.CONSTANTS.VAR_MAP_INTERVAL, interval);
      }

      if (id !== undefined) {
        this.clearUniqInterval(id);
      }

      var thread = window.setInterval(fc, timer);
      id = id === undefined ? thread.toString() : id;
      interval.set(id, thread);
      return id;
    }
  }, {
    key: "clearUniqInterval",
    value: function clearUniqInterval(id) {
      var interval = $GF.getVar($GF.CONSTANTS.VAR_MAP_INTERVAL);

      if (interval !== undefined) {
        try {
          var _int = interval.get(id);

          interval["delete"](id);
          window.clearInterval(_int);
        } catch (error) {
          $GF.log.warn('Failed to clear interval thread', id, error);
        }
      }
    }
  }, {
    key: "loadLocalFile",
    value: function loadLocalFile(varName, fileName) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee9() {
        var v, contextroot, filePath, txt;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                v = $GF.getVar(varName);

                if (!(v === undefined)) {
                  _context9.next = 16;
                  break;
                }

                contextroot = $GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT);

                if (!(contextroot !== undefined)) {
                  _context9.next = 15;
                  break;
                }

                filePath = "".concat(contextroot, "/").concat(fileName);

                if (!window.fetch) {
                  _context9.next = 9;
                  break;
                }

                fetch(filePath).then(function (response) {
                  if (response.ok) {
                    response.text().then(function (text) {
                      $GF.log.info('loadLocalFile called succesfully', filePath);
                      $GF.setVar(varName, text);
                      return text;
                    })["catch"](function (error) {
                      return $GF.log.error('Error when download text file', filePath, error);
                    });
                  }
                })["catch"](function (error) {
                  return $GF.log.error('Error when download file', filePath, error);
                });
                _context9.next = 13;
                break;

              case 9:
                txt = $GF.utils.loadFile(fileName);

                if (!txt) {
                  _context9.next = 13;
                  break;
                }

                $GF.setVar(varName, $GF.utils.loadFile(fileName));
                return _context9.abrupt("return", txt);

              case 13:
                _context9.next = 16;
                break;

              case 15:
                $GF.log.warn('loadLocalFile Contexroot : ', contextroot);

              case 16:
                return _context9.abrupt("return", false);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));
    }
  }, {
    key: "setGraphHover",
    value: function setGraphHover(timestamp) {
      if (this.isGraphHoverEnabled()) {
        this.graphHover = true;
        this.GHTimeStamp = timestamp;
      }
    }
  }, {
    key: "unsetGraphHover",
    value: function unsetGraphHover() {
      this.graphHover = false;
      this.GHTimeStamp = 0;
    }
  }, {
    key: "hasGraphHover",
    value: function hasGraphHover() {
      return this.graphHover && this.isGraphHoverEnabled();
    }
  }, {
    key: "isGraphHoverEnabled",
    value: function isGraphHoverEnabled() {
      var dashboard = this.getVar($GF.CONSTANTS.VAR_OBJ_DASHBOARD);
      return dashboard !== undefined && dashboard.sharedTooltipModeEnabled();
    }
  }, {
    key: "getGraphHover",
    value: function getGraphHover() {
      if (this.hasGraphHover()) {
        return this.GHTimeStamp;
      }

      return undefined;
    }
  }, {
    key: "popover",
    value: function popover(text, tagBook, tagImage) {
      var url = $GF.plugin.getRepo();
      var images = "".concat(this.plugin.getRepo(), "images/");
      var textEncoded = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      var desc = "".concat(textEncoded);
      var book = '';
      var image = '';

      if (tagBook) {
        book = "<a href=\"".concat(url).concat(tagBook, "\" target=\"_blank\"><i class=\"fa fa-book fa-fw\"></i>Help</a>");
      }

      if (tagImage) {
        image = "<a href=\"".concat(images).concat(tagImage, ".png\" target=\"_blank\"><i class=\"fa fa-image fa-fw\"></i>Example</a>");
      }

      return "\n    <div id=\"popover\" style=\"display:flex;flex-wrap:wrap;width: 100%;\">\n      <div style=\"flex:1;height:100px;margin-bottom: 20px;\">".concat(desc, "</div>\n      <div style=\"flex:1;height:100px;margin-bottom: 20px;\">").concat(book, "</div>\n      <div style=\"flex-basis: 100%;height:100px;margin-bottom:20px;\">").concat(image, "</div>\n    </div>");
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var interval = $GF.getVar($GF.CONSTANTS.VAR_MAP_INTERVAL);

      if (interval !== undefined) {
        interval.forEach(function (x) {
          return $GF.clearUniqInterval(x);
        });
        interval.clear();
      }

      var timeout = $GF.getVar($GF.CONSTANTS.VAR_MAP_TIMEOUT);

      if (timeout !== undefined) {
        timeout.forEach(function (x) {
          return $GF.clearUniqTimeOut(x);
        });
        timeout.clear();
      }
    }
  }]);

  return $GF;
}();
$GF._globalvars = new GFVariables();
$GF.CONSTANTS = new GFCONSTANT();
$GF.log = GFLog.init();
$GF.trace = GFTrace.init();
$GF.graphHover = false;
$GF.GHTimeStamp = 0;
$GF.DEBUG = true;
$GF.utils = __webpack_require__(/*! ./utils_raw */ "./utils_raw.js");
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./grafana_func.ts":
/*!*************************!*\
  !*** ./grafana_func.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/core/utils/kbn */ "grafana/app/core/utils/kbn");
/* harmony import */ var grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var grafana_app_core_time_series2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/time_series2 */ "grafana/app/core/time_series2");
/* harmony import */ var grafana_app_core_time_series2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_time_series2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grafana/app/core/app_events */ "grafana/app/core/app_events");
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_4__);





var grafana = {
  formatValue: function formatValue(value, unit, decimals) {
    return grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_0___default.a.valueFormats[unit](value, decimals, null).toString();
  },
  getUnitFormats: function getUnitFormats() {
    return grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_0___default.a.getUnitFormats();
  },
  loadCss: function loadCss() {
    Object(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__["loadPluginCss"])({
      dark: 'plugins/agenty-flowcharting-panel/static/css/flowchart.dark.css',
      light: 'plugins/agenty-flowcharting-panel/static/css/flowchart.light.css'
    });
  },
  getTimeSeries: function getTimeSeries(seriesData) {
    return new grafana_app_core_time_series2__WEBPACK_IMPORTED_MODULE_1___default.a({
      datapoints: seriesData.datapoints || [],
      alias: seriesData.target,
      unit: seriesData.unit
    });
  },
  getFormatedDate: function getFormatedDate(value, format) {
    return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTime"])(value).format(format);
  },
  appEvents: grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_4___default.a,
  MetricsPanelCtrl: grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__["MetricsPanelCtrl"],
  PanelEvents: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["PanelEvents"]
};
/* harmony default export */ __webpack_exports__["default"] = (grafana);

/***/ }),

/***/ "./graph_class.ts":
/*!************************!*\
  !*** ./graph_class.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return XGraph; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
/* harmony import */ var drawio_custom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drawio_custom */ "./drawio_custom.js");
/* harmony import */ var drawio_custom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(drawio_custom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chroma-js */ "../node_modules/chroma-js/chroma.js");
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_4__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var XGraph = function () {
  function XGraph(container, type, definition) {
    var _this = this;

    _classCallCheck(this, XGraph);

    this.xmlGraph = '';
    this.csvGraph = '';
    this.type = 'xml';
    this.graph = undefined;
    this.scale = true;
    this.tooltip = true;
    this.lock = true;
    this.center = true;
    this.animation = true;
    this.zoom = false;
    this.zoomFactor = 1.2;
    this.cumulativeZoomFactor = 1;
    this.grid = false;
    this.bgColor = null;
    this.zoomPercent = '1';
    this.cells = {
      id: [],
      value: []
    };
    this.container = container;
    this.type = type;
    this.onMapping = {
      active: false,
      $scope: null,
      value: null,
      prop: 'id',
      object: null
    };
    XGraph.initMxGraph();

    if (type === 'xml') {
      if (globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.isencoded(definition)) {
        this.xmlGraph = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.decode(definition, true, true, true);
      } else {
        this.xmlGraph = definition;
      }
    }

    if (type === 'csv') {
      this.csvGraph = definition;
    }

    this.initGraph();
    var self = this;

    if (globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].DEBUG) {
      console.log('DEBUG ON');
      this.graph.addListener(mxEvent.CLICK, function (_sender, _evt) {
        console.log('DEBUG CLICK');

        _this.eventDebug(_evt);

        if (_evt.properties.cell) {
          var id = _evt.properties.cell.id;
          var state = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getVar("STATE_".concat(id));
          console.log('DEBUG GF STATE', state);
          var view = self.graph.view;
          console.log('DEBUG CELL STATE', view.getState(_evt.properties.cell));
        }
      });
    }
  }

  _createClass(XGraph, [{
    key: "anonymize",
    value: function anonymize() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                drawio_custom__WEBPACK_IMPORTED_MODULE_3__["anonymize"](this.graph);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "initGraph",
    value: function initGraph() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'initGraph()');
      this.graph = new Graph(this.container);
      this.graph.setPanning(true);
      this.clickBackup = this.graph.click;
      this.dbclickBackup = this.graph.dblClick;
      mxEvent.addMouseWheelListener(mxUtils.bind(this, this.eventMouseWheel), this.container);

      if (mxClient.IS_IE || mxClient.IS_EDGE) {
        mxEvent.addListener(this.container, 'wheel', mxUtils.bind(this, this.eventMouseWheel));
      }

      mxEvent.addListener(document, 'keydown', mxUtils.bind(this, this.eventKey));
      this.container.addEventListener('contextmenu', function (e) {
        return e.preventDefault();
      });
      this.graph.dblClick = this.eventDbClick.bind(this);
      trc.after();
      return this;
    }
  }, {
    key: "drawGraph",
    value: function drawGraph() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'drawGraph()');
      this.graph.getModel().beginUpdate();
      this.graph.getModel().clear();

      try {
        if (this.type === 'xml') {
          var xmlDoc = mxUtils.parseXml(this.xmlGraph);
          var codec = new mxCodec(xmlDoc);
          this.graph.model.clear();
          this.graph.view.scale = 1;
          codec.decode(xmlDoc.documentElement, this.graph.getModel());
          this.loadExtFont();
          this.graph.updateCssTransform();
          this.graph.selectUnlockedLayer();
        }

        if (this.type === 'csv') {
          try {
            drawio_custom__WEBPACK_IMPORTED_MODULE_3__["importCsv"](this.graph, this.csvGraph);
            this.refresh();
          } catch (error) {
            globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('Bad CSV format', error);
            globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].message.setMessage('Bad CSV format');
          }
        }
      } catch (error) {
        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('Error in draw', error);
      } finally {
        this.cells['id'] = this.getCurrentCells('id');
        this.cells['value'] = this.getCurrentCells('value');
        this.graph.getModel().endUpdate();
      }

      trc.after();
      return this;
    }
  }, {
    key: "loadExtFont",
    value: function loadExtFont() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
        var model, extFonts, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = this.graph.getModel();
                extFonts = model.extFonts;

                if (extFonts) {
                  try {
                    extFonts = extFonts.split('|').map(function (ef) {
                      var parts = ef.split('^');
                      return {
                        name: parts[0],
                        url: parts[1]
                      };
                    });

                    for (i = 0; i < extFonts.length; i++) {
                      this.graph.addExtFont(extFonts[i].name, extFonts[i].url);
                    }
                  } catch (e) {
                    globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('ExtFonts format error:', e.message);
                  }
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "applyGraph",
    value: function applyGraph() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'applyGraph()');

      if (!this.scale) {
        this.zoomGraph(this.zoomPercent);
      } else {
        this.unzoomGraph();
      }

      this.tooltipGraph(this.tooltip);
      this.lockGraph(this.lock);

      if (this.scale && this.center) {
        this.fitGraph();
      } else {
        this.scaleGraph(this.scale);
        this.centerGraph(this.center);
      }

      this.gridGraph(this.grid);
      this.bgGraph(this.bgColor);
      this.graph.foldingEnabled = true;
      this.graph.cellRenderer.forceControlClickHandler = true;
      this.refresh();
      trc.after();
      return this;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'refresh()');
      this.graph.refresh();
      trc.after();
      return this;
    }
  }, {
    key: "destroyGraph",
    value: function destroyGraph() {
      this.graph.destroy();
      this.graph = undefined;
      return this;
    }
  }, {
    key: "lockGraph",
    value: function lockGraph(bool) {
      if (bool) {
        this.graph.setEnabled(false);
      } else {
        this.graph.setEnabled(true);
      }

      this.lock = bool;
      return this;
    }
  }, {
    key: "tooltipGraph",
    value: function tooltipGraph(bool) {
      if (bool) {
        this.graph.setTooltips(true);
      } else {
        this.graph.setTooltips(false);
      }

      this.tooltip = bool;
      return this;
    }
  }, {
    key: "allowDrawio",
    value: function allowDrawio(bool) {
      if (bool) {
        mxUrlConverter.prototype.baseUrl = 'http://draw.io/';
        mxUrlConverter.prototype.baseDomain = '';
      } else {
        mxUrlConverter.prototype.baseUrl = null;
        mxUrlConverter.prototype.baseDomain = null;
      }

      return this;
    }
  }, {
    key: "enableAnim",
    value: function enableAnim(bool) {
      this.animation = bool;
      return this;
    }
  }, {
    key: "centerGraph",
    value: function centerGraph(bool) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'centerGraph()');
      this.graph.centerZoom = false;

      if (bool) {
        this.graph.center(true, true);
      } else {
        this.graph.center(false, false);
      }

      this.center = bool;
      trc.after();
      return this;
    }
  }, {
    key: "scaleGraph",
    value: function scaleGraph(bool) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'scaleGraph()');

      if (bool) {
        this.unzoomGraph();
        this.graph.fit();
        this.graph.view.rendering = true;
      }

      this.scale = bool;
      trc.after();
      return this;
    }
  }, {
    key: "fitGraph",
    value: function fitGraph() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'fitGraph()');
      var margin = 2;
      var max = 3;
      var bounds = this.graph.getGraphBounds();
      var cw = this.graph.container.clientWidth - margin;
      var ch = this.graph.container.clientHeight - margin;
      var w = bounds.width / this.graph.view.scale;
      var h = bounds.height / this.graph.view.scale;
      var s = Math.min(max, Math.min(cw / w, ch / h));
      this.graph.view.scaleAndTranslate(s, (margin + cw - w * s) / (2 * s) - bounds.x / this.graph.view.scale, (margin + ch - h * s) / (2 * s) - bounds.y / this.graph.view.scale);
      trc.after();
      return this;
    }
  }, {
    key: "gridGraph",
    value: function gridGraph(bool) {
      if (bool) {
        this.container.style.backgroundImage = "url('data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=')";
      } else {
        this.container.style.backgroundImage = '';
      }

      this.grid = bool;
      return this;
    }
  }, {
    key: "zoomGraph",
    value: function zoomGraph(percent) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'zoomGraph()');

      if (!this.scale && percent && percent.length > 0 && percent !== '100%' && percent !== '0%') {
        var ratio = Number(percent.replace('%', '')) / 100;
        this.graph.zoomTo(ratio, true);
        this.zoomPercent = percent;
      } else {
        this.unzoomGraph();
      }

      this.zoom = true;
      trc.after();
      return this;
    }
  }, {
    key: "unzoomGraph",
    value: function unzoomGraph() {
      this.zoom = false;
      this.graph.zoomActual();
      return this;
    }
  }, {
    key: "bgGraph",
    value: function bgGraph(bgColor) {
      var $div = $(this.container);

      if (bgColor) {
        this.bgColor = bgColor;
        $div.css('background-color', bgColor);
      } else {
        $div.css('background-color', '');
      }

      return this;
    }
  }, {
    key: "getMxGraph",
    value: function getMxGraph() {
      return this.graph;
    }
  }, {
    key: "getxmlGraph",
    value: function getxmlGraph() {
      return this.xmlGraph;
    }
  }, {
    key: "setContent",
    value: function setContent(content) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'setContent()');

      if (this.type === 'xml') {
        if (globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.isencoded(content)) {
          this.xmlGraph = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.decode(content, true, true, true);
        } else {
          this.xmlGraph = content;
        }
      }

      if (this.type === 'csv') {
        this.csvGraph = content;
      }

      this.drawGraph();
      trc.after();
      return this;
    }
  }, {
    key: "getCurrentCells",
    value: function getCurrentCells(prop) {
      var _this2 = this;

      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'getCurrentCells()');
      var cellIds = [];
      var model = this.graph.getModel();
      var cells = model.cells;

      if (prop === 'id') {
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(cells, function (mxcell) {
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.debug("this.getStyleCell(mxcell, 'shape') [" + mxcell.id + '] : ', _this2.getStyleCell(mxcell, 'shape'));
          cellIds.push(_this2.getId(mxcell));
        });
      } else if (prop === 'value') {
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(cells, function (mxcell) {
          cellIds.push(_this2.getLabelCell(mxcell));
        });
      }

      trc.after();
      return cellIds;
    }
  }, {
    key: "findMxCells",
    value: function findMxCells(prop, pattern) {
      var _this3 = this;

      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'findMxCells()');
      var mxcells = this.getMxCells();
      var result = [];

      if (prop === 'id') {
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(mxcells, function (mxcell) {
          if (globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.matchString(mxcell.id, pattern)) {
            result.push(mxcell);
          }
        });
      } else if (prop === 'value') {
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(mxcells, function (mxcell) {
          if (globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.matchString(_this3.getLabelCell(mxcell), pattern)) {
            result.push(mxcell);
          }
        });
      }

      trc.after();
      return result;
    }
  }, {
    key: "selectMxCells",
    value: function selectMxCells(prop, pattern) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
        var mxcells;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                mxcells = this.findMxCells(prop, pattern);

                if (mxcells) {
                  this.highlightCells(mxcells);
                }

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "unselectMxCells",
    value: function unselectMxCells(prop, pattern) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee4() {
        var mxcells;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                mxcells = this.findMxCells(prop, pattern);

                if (mxcells) {
                  this.unhighlightCells(mxcells);
                }

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    }
  }, {
    key: "createOverlay",
    value: function createOverlay(image, tooltip) {
      var overlay = new mxCellOverlay(image, tooltip);
      overlay.addListener(mxEvent.CLICK, function (_sender, _evt) {
        mxUtils.alert("".concat(tooltip, "\nLast update: ").concat(new Date()));
      });
      return overlay;
    }
  }, {
    key: "addOverlay",
    value: function addOverlay(state, mxcell) {
      this.graph.addCellOverlay(mxcell, this.createOverlay(this.graph.warningImage, "State: ".concat(state)));
      return this;
    }
  }, {
    key: "removeOverlay",
    value: function removeOverlay(mxcell) {
      this.graph.removeCellOverlays(mxcell);
      return this;
    }
  }, {
    key: "addLink",
    value: function addLink(mxcell, link) {
      this.graph.setLinkForCell(mxcell, link);
      return this;
    }
  }, {
    key: "getLink",
    value: function getLink(mxcell) {
      return this.graph.getLinkForCell(mxcell);
    }
  }, {
    key: "removeLink",
    value: function removeLink(mxcell) {
      this.graph.setLinkForCell(mxcell, null);
      return this;
    }
  }, {
    key: "getOrignalCells",
    value: function getOrignalCells(prop) {
      if (prop === 'id' || prop === 'value') {
        return this.cells[prop];
      }

      return [];
    }
  }, {
    key: "renameId",
    value: function renameId(oldId, newId) {
      var cells = this.findMxCells('id', oldId);

      if (cells !== undefined && cells.length > 0) {
        cells.forEach(function (cell) {
          cell.id = newId;
        });
      } else {
        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.warn("Cell ".concat(oldId, " not found"));
      }

      return this;
    }
  }, {
    key: "getXmlModel",
    value: function getXmlModel() {
      var encoder = new mxCodec();
      var node = encoder.encode(this.graph.getModel());
      return mxUtils.getXml(node);
    }
  }, {
    key: "getMxCells",
    value: function getMxCells() {
      return this.graph.getModel().cells;
    }
  }, {
    key: "getValuePropOfMxCell",
    value: function getValuePropOfMxCell(prop, mxcell) {
      if (prop === 'id') {
        return this.getId(mxcell);
      }

      if (prop === 'value') {
        return this.getLabelCell(mxcell);
      }

      return null;
    }
  }, {
    key: "getStyleCell",
    value: function getStyleCell(mxcell, style) {
      var state = this.graph.view.getState(mxcell);

      if (state) {
        return state.style[style];
      }

      return null;
    }
  }, {
    key: "isAnimated",
    value: function isAnimated() {
      return this.animation;
    }
  }, {
    key: "setColorAnimCell",
    value: function setColorAnimCell(mxcell, style, color) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'setColorAnimCell()');
      var id = "".concat(style, "_").concat(mxcell.id);
      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(id);

      if (this.isAnimated() && color) {
        try {
          var startColor = this.getStyleCell(mxcell, style);

          if (startColor) {
            var graduate = function graduate() {
              if (count < lg) {
                self.setStyleCell(mxcell, style, steps[count]);
                count += 1;
                globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].setUniqTimeOut(graduate, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_COLORS_MS, id);
              } else {
                globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(id);
              }
            };

            var endColor = color;
            var steps = chroma_js__WEBPACK_IMPORTED_MODULE_4___default.a.scale([startColor, endColor]).mode('lrgb').colors(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_COLORS_STEPS + 1);
            var count = 1;
            var self = this;
            var lg = steps.length;
            graduate();
          } else {
            var hex = chroma_js__WEBPACK_IMPORTED_MODULE_4___default()(color).hex();
            this.setStyleCell(mxcell, style, hex);
          }
        } catch (error) {
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('Error on graduate color', error);
          this.setStyleCell(mxcell, style, color);
        }
      } else {
        if (color !== null) {
          try {
            color = chroma_js__WEBPACK_IMPORTED_MODULE_4___default()(color).hex();
          } catch (error) {
            globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('Invalid Color', color);
          }
        }

        this.setStyleCell(mxcell, style, color);
      }

      trc.after();
      return this;
    }
  }, {
    key: "setStyleCell",
    value: function setStyleCell(mxcell, style, value) {
      this.graph.setCellStyles(style, value, [mxcell]);
      return this;
    }
  }, {
    key: "setStyleAnimCell",
    value: function setStyleAnimCell(mxcell, style, endValue, beginValue) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee5() {
        var trc, end, begin, graduate, id, steps, lg, count, self;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'setStyleAnimCell()');

                if (this.isAnimated() && endValue !== null) {
                  try {
                    end = Number(endValue);
                    begin = beginValue !== undefined ? Number(beginValue) : Number(this.getStyleCell(mxcell, style));

                    if (end !== begin) {
                      graduate = function graduate() {
                        if (count < lg) {
                          self.setStyleCell(mxcell, style, steps[count].toString());
                          count += 1;
                          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].setUniqTimeOut(graduate, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_MS, id);
                        } else {
                          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(id);
                        }
                      };

                      id = "".concat(style, "_").concat(mxcell.id);
                      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(id);
                      steps = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getIntervalCounter(begin, end, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_STEP);
                      lg = steps.length;
                      count = 0;
                      self = this;
                      graduate();
                    }
                  } catch (error) {
                    this.graph.setCellStyles(style, endValue, [mxcell]);
                  }
                } else {
                  this.graph.setCellStyles(style, endValue, [mxcell]);
                }

                trc.after();

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    }
  }, {
    key: "setStyles",
    value: function setStyles(mxcell, styles) {
      this.graph.getModel().setStyle(mxcell, styles);
      return this;
    }
  }, {
    key: "setClassCell",
    value: function setClassCell(mxcell, className) {
      var state = this.graph.view.getState(mxcell);

      if (state && state.shape !== null) {
        var paths = state.shape.node.getElementsByTagName('path');

        if (paths.length > 1) {
          var currentClass = paths[1].getAttribute('class');
          var classes = [];

          if (currentClass !== null && currentClass !== undefined) {
            classes = currentClass.split(' ');
          }

          if (!classes.includes(className)) {
            classes.push(className);
            currentClass = classes.join(' ');
            paths[1].setAttribute('class', currentClass);

            if (mxUtils.getValue(state.style, mxConstants.STYLE_DASHED, '0') !== '1') {
              paths[1].setAttribute('stroke-dasharray', '8');
            }
          }
        }
      }

      return this;
    }
  }, {
    key: "unsetClassCell",
    value: function unsetClassCell(mxcell, className) {
      var state = this.graph.view.getState(mxcell);

      if (state && state.shape !== null) {
        var paths = state.shape.node.getElementsByTagName('path');

        if (paths.length > 1) {
          var currentClass = paths[1].getAttribute('class');
          var classes = [];

          if (currentClass !== null && currentClass !== undefined) {
            classes = currentClass.split(' ');
          }

          if (classes.includes(className)) {
            classes = classes.filter(function (c) {
              return c !== className;
            });

            if (classes.length > 1) {
              currentClass = classes.join(' ');
              paths[1].setAttribute('class', currentClass);
            } else {
              paths[1].removeAttribute('class');
            }

            if (mxUtils.getValue(state.style, mxConstants.STYLE_DASHED, '0') !== '1') {
              paths[1].removeAttribute('stroke-dasharray');
            }
          }
        }
      }

      return this;
    }
  }, {
    key: "getLabelCell",
    value: function getLabelCell(mxcell) {
      if (mxUtils.isNode(mxcell.value)) {
        return mxcell.value.getAttribute('label');
      }

      return mxcell.getValue(mxcell);
    }
  }, {
    key: "setLabelCell",
    value: function setLabelCell(mxcell, text) {
      this.graph.cellLabelChanged(mxcell, text, false);
      return this;
    }
  }, {
    key: "getId",
    value: function getId(mxcell) {
      return mxcell.getId();
    }
  }, {
    key: "setMap",
    value: function setMap(onMappingObj) {
      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.info('XGraph.setMapping()');
      this.onMapping = onMappingObj;

      if (this.onMapping.active === true) {
        this.container.style.cursor = 'crosshair';
        this.graph.click = this.eventClick.bind(this);
      }
    }
  }, {
    key: "unsetMap",
    value: function unsetMap() {
      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.info('XGraph.unsetMapping()');
      this.onMapping.active = false;
      this.container.style.cursor = 'auto';
      this.graph.click = this.clickBackup;

      if (this.onMapping.$scope) {
        this.onMapping.$scope.$applyAsync();
      }
    }
  }, {
    key: "eventClick",
    value: function eventClick(me) {
      if (this.onMapping.active) {
        var state = me.getState();

        if (state) {
          var prop = this.onMapping.prop !== null ? this.onMapping.prop : 'id';
          var value = this.getValuePropOfMxCell(prop, state.cell);

          if (this.onMapping.object) {
            this.onMapping.object.data.pattern = value;
          }

          if (this.onMapping.value) {
            var elt = document.getElementById(this.onMapping.value);

            if (elt) {
              setTimeout(function () {
                elt.focus();
              }, 100);
            }
          }

          this.unsetMap();
        }
      }
    }
  }, {
    key: "eventDebug",
    value: function eventDebug(me) {
      console.log('DEBUG mxMouseEvent', me);
    }
  }, {
    key: "eventDbClick",
    value: function eventDbClick(evt, mxcell) {
      if (mxcell !== undefined) {
        this.lazyZoomCell(mxcell);
      }
    }
  }, {
    key: "eventMouseWheel",
    value: function eventMouseWheel(evt, up) {
      if (this.graph.isZoomWheelEvent(evt)) {
        if (up === null || up === undefined) {
          if (evt.deltaY < 0) {
            up = true;
          } else {
            up = false;
          }
        }

        var rect = this.container.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;

        if (up) {
          this.cumulativeZoomFactor = this.cumulativeZoomFactor * 1.2;
        } else {
          this.cumulativeZoomFactor = this.cumulativeZoomFactor * 0.8;
        }

        this.lazyZoomPointer(this.cumulativeZoomFactor, x, y);
        mxEvent.consume(evt);
      }
    }
  }, {
    key: "eventKey",
    value: function eventKey(evt) {
      if (!mxEvent.isConsumed(evt) && evt.keyCode === 27) {
          this.cumulativeZoomFactor = 1;

          if (this.graph) {
            this.graph.zoomActual();
            this.applyGraph();
          }
        }
    }
  }, {
    key: "lazyZoomCenter",
    value: function lazyZoomCenter(factor) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.graph.zoomTo(factor, true);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
    }
  }, {
    key: "lazyZoomPointer",
    value: function lazyZoomPointer(factor, offsetX, offsetY) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee7() {
        var trc, dx, dy, scale, f, _f;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'lazyZoomPointer()');
                dx = offsetX * 2;
                dy = offsetY * 2;
                factor = Math.max(0.01, Math.min(this.graph.view.scale * factor, 160)) / this.graph.view.scale;
                factor = this.cumulativeZoomFactor / this.graph.view.scale;
                scale = Math.round(this.graph.view.scale * factor * 100) / 100;
                factor = scale / this.graph.view.scale;

                if (factor > 1) {
                  f = (factor - 1) / (scale * 2);
                  dx *= -f;
                  dy *= -f;
                } else {
                  _f = (1 / factor - 1) / (this.graph.view.scale * 2);
                  dx *= _f;
                  dy *= _f;
                }

                this.graph.view.scaleAndTranslate(scale, this.graph.view.translate.x + dx, this.graph.view.translate.y + dy);
                trc.after();

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
    }
  }, {
    key: "highlightCells",
    value: function highlightCells() {
      var cells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getMxCells();
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee8() {
        var i;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                for (i = 0; i < cells.length; i++) {
                  this.highlightCell(cells[i]);
                }

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
    }
  }, {
    key: "unhighlightCells",
    value: function unhighlightCells() {
      var mxcells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getMxCells();
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee9() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(mxcells, function (mxcell) {
                  _this4.unhighlightCell(mxcell);
                });

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));
    }
  }, {
    key: "highlightCell",
    value: function highlightCell(cell) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee10() {
        var color, opacity, state, sw, hl;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!cell.highlight) {
                  color = '#99ff33';
                  opacity = 100;
                  state = this.graph.view.getState(cell);

                  if (state != null) {
                    sw = Math.max(5, mxUtils.getValue(state.style, mxConstants.STYLE_STROKEWIDTH, 1) + 4);
                    hl = new mxCellHighlight(this.graph, color, sw, false);

                    if (opacity != null) {
                      hl.opacity = opacity;
                    }

                    hl.highlight(state);
                    cell.highlight = hl;
                  }
                }

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
    }
  }, {
    key: "unhighlightCell",
    value: function unhighlightCell(mxcell) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee11() {
        var hl;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (mxcell && mxcell.highlight) {
                  hl = mxcell.highlight;

                  if (hl.shape != null) {
                    mxUtils.setPrefixedStyle(hl.shape.node.style, 'transition', 'all 500ms ease-in-out');
                    hl.shape.node.style.opacity = 0;
                  }

                  window.setTimeout(function () {
                    hl.destroy();
                  }, 500);
                  mxcell.highlight = null;
                }

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));
    }
  }, {
    key: "blinkCell",
    value: function blinkCell(mxcell, ms) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee12() {
        var _self, _id, bl_on, bl_off;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!mxcell.blink) {
                  mxcell.blink = true;
                  _self = this;
                  _id = "blink_".concat(mxcell.id);
                  globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(_id);

                  bl_on = function bl_on() {
                    var color = '#f5f242';
                    var opacity = 100;

                    var state = _self.graph.view.getState(mxcell);

                    if (state != null) {
                      var sw = Math.max(5, mxUtils.getValue(state.style, mxConstants.STYLE_STROKEWIDTH, 1) + 4);
                      var hl = new mxCellHighlight(_self.graph, color, sw, false);

                      if (opacity != null) {
                        hl.opacity = opacity;
                      }

                      hl.highlight(state);
                      mxcell.blink_on = hl;
                      mxcell.blink_ms = ms;
                      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].setUniqTimeOut(bl_off, ms, _id);
                    }
                  };

                  bl_off = function bl_off() {
                    if (mxcell && mxcell.blink) {
                      var hl = mxcell.blink_on;

                      if (hl.shape != null) {
                        mxUtils.setPrefixedStyle(hl.shape.node.style, "transition", "all ".concat(ms, "ms ease-in-out"));
                        hl.shape.node.style.opacity = 0;
                      }

                      hl.destroy();
                      mxcell.blink_on = null;
                      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].setUniqTimeOut(bl_on, ms, _id);
                    }
                  };

                  bl_on();
                }

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
    }
  }, {
    key: "unblinkCell",
    value: function unblinkCell(mxcell) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee13() {
        var id, hl;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                id = "blink_".concat(mxcell.id);

                if (mxcell.blink) {
                  if (mxcell.blink_on) {
                    hl = mxcell.blink_on;

                    if (hl.shape != null) {
                      hl.shape.node.style.opacity = 0;
                      hl.destroy();
                      mxcell.blink_on = null;
                      mxcell.blink_ms = 0;
                    }
                  }

                  mxcell.blink = null;
                }

                globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(id);

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));
    }
  }, {
    key: "isBlinkCell",
    value: function isBlinkCell(mxcell) {
      return !!mxcell.blink;
    }
  }, {
    key: "geBlinkMxCell",
    value: function geBlinkMxCell(mxcell) {
      return !!mxcell.blink ? mxcell.blink_ms : 0;
    }
  }, {
    key: "isCollapsedCell",
    value: function isCollapsedCell(mxcell) {
      return this.graph.isCellCollapsed(mxcell);
    }
  }, {
    key: "collapseCell",
    value: function collapseCell(mxcell) {
      if (!this.isCollapsedCell(mxcell)) {
        this.graph.foldCells(true, false, [mxcell], null, null);
      }
    }
  }, {
    key: "expandCell",
    value: function expandCell(mxcell) {
      if (this.isCollapsedCell(mxcell)) {
        this.graph.foldCells(false, false, [mxcell], null, null);
      }
    }
  }, {
    key: "toggleFoldCell",
    value: function toggleFoldCell(mxcell) {
      var collapse = !this.isCollapsedCell(mxcell);
      this.graph.foldCells(collapse, false, [mxcell], null, null);
    }
  }, {
    key: "hideCell",
    value: function hideCell(mxcell) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (this.isVisibleCell(mxcell)) {
                  this.graph.model.setVisible(mxcell, false);
                }

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
    }
  }, {
    key: "showCell",
    value: function showCell(mxcell) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!this.isVisibleCell(mxcell)) {
                  this.graph.model.setVisible(mxcell, true);
                }

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
    }
  }, {
    key: "isVisibleCell",
    value: function isVisibleCell(mxcell) {
      return this.graph.model.isVisible(mxcell);
    }
  }, {
    key: "resizeCell",
    value: function resizeCell(mxcell, percent, origine) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee16() {
        var trc, geo, _id2, _x, _ow, _y, _oh, _w, _h, _graduate, steps_x, steps_y, steps_w, steps_h, _lg, _count, _self2, _rec;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'resizeCell()');
                geo = this.graph.model.getGeometry(mxcell);

                if (geo !== null) {
                  _id2 = "resize_".concat(mxcell.id);
                  globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(_id2);
                  _x = origine !== undefined ? origine.x : geo.x;
                  _ow = origine !== undefined ? origine.width : geo.x;
                  _y = origine !== undefined ? origine.y : geo.y;
                  _oh = origine !== undefined ? origine.height : geo.y;
                  _w = _ow * (percent / 100);
                  _h = _oh * (percent / 100);
                  _x = _x - (_w - _ow) / 2;
                  _y = _y - (_h - _oh) / 2;

                  if (this.isAnimated()) {
                    _graduate = function _graduate() {
                      if (_count < _lg) {
                        var _rec = new mxRectangle(steps_x[_count], steps_y[_count], steps_w[_count], steps_h[_count]);

                        _self2.graph.resizeCell(mxcell, _rec, true);

                        _count += 1;
                        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].setUniqTimeOut(_graduate, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_MS, _id2);
                      } else {
                        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(_id2);
                      }
                    };

                    steps_x = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getIntervalCounter(geo.x, _x, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_STEP);
                    steps_y = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getIntervalCounter(geo.y, _y, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_STEP);
                    steps_w = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getIntervalCounter(geo.width, _w, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_STEP);
                    steps_h = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getIntervalCounter(geo.height, _h, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_STEP);
                    _lg = steps_x.length;
                    _count = 0;
                    _self2 = this;

                    _graduate();
                  } else {
                    _rec = new mxRectangle(_x, _y, _w, _h);
                    this.graph.resizeCell(mxcell, _rec, true);
                  }
                }

                trc.after();

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
    }
  }, {
    key: "changeSizeCell",
    value: function changeSizeCell(mxcell, width, height, origine) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee17() {
        var trc, geo, _id3, _x, _ow, _y, _oh, _h, _w, _graduate2, _steps_x, _steps_y, _steps_w, _steps_h, _lg2, _count2, _self3, _rec;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'resizeCell()');
                geo = this.graph.model.getGeometry(mxcell);

                if (geo !== null) {
                  _id3 = "resize_".concat(mxcell.id);
                  globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(_id3);
                  _x = origine !== undefined ? origine.x : geo.x;
                  _ow = origine !== undefined ? origine.width : geo.x;
                  _y = origine !== undefined ? origine.y : geo.y;
                  _oh = origine !== undefined ? origine.height : geo.y;
                  _x = width !== undefined && width < 0 ? _x + width + _ow : _x;
                  _y = height !== undefined && height < 0 ? _y + height + _oh : _y;
                  _h = height !== undefined ? Math.abs(height) : origine !== undefined ? origine.height : geo.height;
                  _w = width !== undefined ? Math.abs(width) : origine !== undefined ? origine.width : geo.width;

                  if (this.isAnimated()) {
                    _graduate2 = function _graduate2() {
                      if (_count2 < _lg2) {
                        var _rec = new mxRectangle(_steps_x[_count2], _steps_y[_count2], _steps_w[_count2], _steps_h[_count2]);

                        _self3.graph.resizeCell(mxcell, _rec, true);

                        _count2 += 1;
                        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].setUniqTimeOut(_graduate2, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_MS, _id3);
                      } else {
                        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].clearUniqTimeOut(_id3);
                      }
                    };

                    _steps_x = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getIntervalCounter(geo.x, _x, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_STEP);
                    _steps_y = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getIntervalCounter(geo.y, _y, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_STEP);
                    _steps_w = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getIntervalCounter(geo.width, _w, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_STEP);
                    _steps_h = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getIntervalCounter(geo.height, _h, globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_ANIMS_STEP);
                    _lg2 = _steps_x.length;
                    _count2 = 0;
                    _self3 = this;

                    _graduate2();
                  } else {
                    _rec = new mxRectangle(_x, _y, _w, _h);
                    this.graph.resizeCell(mxcell, _rec, true);
                  }
                }

                trc.after();

              case 4:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));
    }
  }, {
    key: "getSizeCell",
    value: function getSizeCell(mxcell) {
      return this.graph.model.getGeometry(mxcell);
    }
  }, {
    key: "resetSizeCell",
    value: function resetSizeCell(mxcell, mxgeo) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee18() {
        var rec;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                rec = new mxRectangle(mxgeo.x, mxgeo.y, mxgeo.width, mxgeo.height);
                this.graph.resizeCell(mxcell, rec, true);

              case 2:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));
    }
  }, {
    key: "lazyZoomCell",
    value: function lazyZoomCell(mxcell) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee19() {
        var trc, state, rect;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'lazyZoomCell()');

                if (mxcell !== undefined && mxcell !== null && mxcell.isVertex()) {
                  state = this.graph.view.getState(mxcell);

                  if (state !== null) {
                    if (state.width !== undefined && state.width > 0 && state.height !== undefined && state.height > 0) {
                      rect = state.shape.bounds;
                    } else {
                      rect = state.text.boundingBox;
                    }

                    this.graph.zoomToRect(rect);
                    this.cumulativeZoomFactor = this.graph.view.scale;
                  }
                }

                trc.after();

              case 3:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));
    }
  }], [{
    key: "isValidXml",
    value: function isValidXml(source) {
      try {
        var div = document.createElement('div');
        var g = new Graph(div);

        if (globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.isencoded(source)) {
          source = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.decode(source, true, true, true);
        }

        var xmlDoc = mxUtils.parseXml(source);
        var codec = new mxCodec(xmlDoc);
        g.getModel().beginUpdate();
        codec.decode(xmlDoc.documentElement, g.getModel());
        g.getModel().endUpdate();
        g.destroy();
        return true;
      } catch (error) {
        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('isValidXml', error);
        return false;
      }
    }
  }, {
    key: "initMxGraph",
    value: function initMxGraph() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'initMxGgraph()');
      var myWindow = window;

      if (!XGraph.initialized) {
        if (myWindow.mxGraph === undefined || myWindow.mxGraph === undefined) {
          XGraph.preInitGlobalVars();
          var code = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.$loadFile("".concat(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getDrawioPath(), "js/viewer.min.js"));
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.evalRaw(code);
          XGraph.postInitGlobalVars();
          code = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.$loadFile("".concat(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getLibsPath(), "/Graph_custom.js"));
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.evalRaw(code);
          mxTooltipHandler.prototype.delay = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_TOOLTIPS_DELAY;
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].message.clearMessage();
        }

        XGraph.initialized = true;
      }

      trc.after();
    }
  }, {
    key: "preInitGlobalVars",
    value: function preInitGlobalVars() {
      var myWindow = window;
      myWindow.BASE_PATH = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxBasePath();
      myWindow.RESOURCES_PATH = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxResourcePath();
      myWindow.RESOURCE_BASE = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxResourcePath();
      myWindow.STENCIL_PATH = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getStencilsPath();
      myWindow.SHAPES_PATH = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getShapesPath();
      myWindow.IMAGE_PATH = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxImagePath();
      myWindow.STYLE_PATH = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxStylePath();
      myWindow.CSS_PATH = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxCssPath();
      myWindow.mxLanguages = ['en'];
      myWindow.DRAWIO_BASE_URL = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getDrawioPath();
      myWindow.DRAW_MATH_URL = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getDrawioPath();
      myWindow.DRAWIO_VIEWER_URL = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getDrawioPath() + 'viewer.min.js';
      myWindow.DRAW_MATH_URL = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getDrawioPath() + 'math/';
      myWindow.DRAWIO_CONFIG = null;
      var urlParams = new Object();
      myWindow.urlParams = urlParams;
      urlParams['sync'] = 'none';
      urlParams['lightbox'] = '1';
      urlParams['nav'] = '1';
      urlParams['local'] = '1';
      urlParams['embed'] = '1';
      urlParams['ui'] = 'min';
      myWindow.mxImageBasePath = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxImagePath();
      myWindow.mxBasePath = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxBasePath();
      myWindow.mxLoadStylesheets = true;
      myWindow.mxLanguage = 'en';
      myWindow.mxLoadResources = true;
    }
  }, {
    key: "postInitGlobalVars",
    value: function postInitGlobalVars() {
      var myWindow = window;
      myWindow.mxClient.mxBasePath = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxBasePath();
      myWindow.mxClient.mxImageBasePath = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getMxImagePath();
      myWindow.mxClient.mxLoadResources = true;
      myWindow.mxClient.mxLanguage = 'en';
      myWindow.mxClient.mxLoadStylesheets = true;
      myWindow.VSD_CONVERT_URL = null;
      myWindow.EMF_CONVERT_URL = null;
      myWindow.ICONSEARCH_PATH = null;
    }
  }, {
    key: "loadXml",
    value: function loadXml(url) {
      try {
        var req = mxUtils.load(url);

        if (req.getStatus() >= 200 && req.getStatus() <= 299) {
          return req.getText();
        } else {
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('Cannot load ' + url, req.getStatus());
        }
      } catch (error) {
        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('Cannot load ' + url, error);
      }

      return null;
    }
  }, {
    key: "compress",
    value: function compress(source) {
      return Graph.compress(source, true);
    }
  }, {
    key: "decompress",
    value: function decompress(source) {
      return Graph.decompress(source, true);
    }
  }]);

  return XGraph;
}();


XGraph.initialized = false;

/***/ }),

/***/ "./inspect_options.ts":
/*!****************************!*\
  !*** ./inspect_options.ts ***!
  \****************************/
/*! exports provided: InspectOptionsCtrl, inspectOptionsTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectOptionsCtrl", function() { return InspectOptionsCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectOptionsTab", function() { return inspectOptionsTab; });
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
inspectOptionsTab.$inject = ["$q", "uiSegmentSrv"];

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var InspectOptionsCtrl = function () {
  InspectOptionsCtrl.$inject = ["$scope"];

  function InspectOptionsCtrl($scope) {
    _classCallCheck(this, InspectOptionsCtrl);

    this.enable = false;
    this.traceEnable = globals_class__WEBPACK_IMPORTED_MODULE_0__["$GF"].trace.isEnabled();
    $scope.editor = this;
    $scope.$GF = globals_class__WEBPACK_IMPORTED_MODULE_0__["$GF"].me();
    this.state = {
      data: this.getStates(),
      columns: [{
        id: 'cellId',
        desc: 'Shape ID',
        sort: 'asc',
        select: false
      }, {
        id: 'label',
        desc: 'Label',
        sort: 'asc',
        select: false
      }, {
        id: 'cellId',
        desc: 'Shape ID',
        sort: 'asc',
        select: false
      }, {
        id: 'font',
        desc: 'Font color',
        sort: 'asc',
        select: false
      }, {
        id: 'fill',
        desc: 'Fill color',
        sort: 'asc',
        select: false
      }, {
        id: 'stroke',
        desc: 'Stroke color',
        sort: 'asc',
        select: false
      }, {
        id: 'tags',
        desc: 'Tags Mapping',
        sort: 'asc',
        select: false
      }]
    };
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.stateHandler = this.flowchartHandler.getFlowchart().getStateHandler();
  }

  _createClass(InspectOptionsCtrl, [{
    key: "render",
    value: function render() {
      this.panel.render();
    }
  }, {
    key: "onChangeId",
    value: function onChangeId(state) {
      if (state.newcellId !== undefined && state.cellId !== state.newcellId) {
        state.edited = true;
        var sh = this.flowchartHandler.getFlowchart().getStateHandler();

        if (sh !== undefined) {
          sh.edited = true;
        }

        if (state.previousId === undefined) {
          state.previousId = state.cellId;
        }

        state.cellId = state.newcellId;
        state.edited = true;
      }

      state.edit = false;
    }
  }, {
    key: "onEdit",
    value: function onEdit(state) {
      state.edit = true;
      state.newcellId = state.cellId;
      var elt = document.getElementById(state.cellId);
      setTimeout(function () {
        if (elt) {
          elt.focus();
        }
      }, 100);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.flowchartHandler.draw();
      this.flowchartHandler.refresh();
    }
  }, {
    key: "apply",
    value: function apply() {
      var flowchart = this.flowchartHandler.getFlowchart();
      var sh = flowchart.getStateHandler();

      if (sh !== undefined) {
        var states = sh.getStates();
        states.forEach(function (state) {
          if (state.edited && state.previousId) {
            flowchart.renameId(state.previousId, state.cellId);
            state.edited = false;
          }
        });
        sh.edited = false;
      }

      flowchart.applyModel();
    }
  }, {
    key: "selectCell",
    value: function selectCell(state) {
      state.highlightCell();
    }
  }, {
    key: "unselectCell",
    value: function unselectCell(state) {
      state.unhighlightCell();
    }
  }, {
    key: "getStates",
    value: function getStates() {
      if (this.stateHandler) {
        var states = this.stateHandler.getStatesForInspect();
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.orderBy(states, ['cellId', 'globalLevel'], ['asc']);
      }

      return [];
    }
  }, {
    key: "getStateValue",
    value: function getStateValue(state, col) {
      switch (col) {
        case 'cellId':
          return state.cellId;
          break;

        case 'level':
          return state.getTextLevel();
          break;

        case 'label':
          return state.getCellProp('value');
          break;

        default:
          return null;
          break;
      }
    }
  }, {
    key: "tracePerf",
    value: function tracePerf() {
      if (this.traceEnable) {
        globals_class__WEBPACK_IMPORTED_MODULE_0__["$GF"].trace.enable();
      } else {
        globals_class__WEBPACK_IMPORTED_MODULE_0__["$GF"].trace.disable();
      }
    }
  }, {
    key: "anonymize",
    value: function anonymize() {
      var fc = this.flowchartHandler.getFlowchart();
      var xg = fc.getXGraph();

      if (xg) {
        xg.anonymize();
      }
    }
  }]);

  return InspectOptionsCtrl;
}();
function inspectOptionsTab($q, uiSegmentSrv) {
  'use strict';

  return {
    restrict: 'E',
    scope: true,
    templateUrl: "".concat(globals_class__WEBPACK_IMPORTED_MODULE_0__["$GF"].plugin.getPartialPath(), "inspect/index.html"),
    controller: InspectOptionsCtrl
  };
}

/***/ }),

/***/ "./mapping_options.ts":
/*!****************************!*\
  !*** ./mapping_options.ts ***!
  \****************************/
/*! exports provided: MappingOptionsCtrl, mappingOptionsTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MappingOptionsCtrl", function() { return MappingOptionsCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mappingOptionsTab", function() { return mappingOptionsTab; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var rule_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rule_class */ "./rule_class.ts");
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
/* harmony import */ var grafana_func__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grafana_func */ "./grafana_func.ts");
mappingOptionsTab.$inject = ["$q", "uiSegmentSrv"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var MappingOptionsCtrl = function () {
  MappingOptionsCtrl.$inject = ["$scope"];

  function MappingOptionsCtrl($scope) {
    var _this = this;

    _classCallCheck(this, MappingOptionsCtrl);

    this.style = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.COLORMETHODS;
    this.metricType = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.METRIC_TYPES;
    this.colorOn = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.COLOR_APPLYON;
    this.linkOn = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.LINK_APPLYON;
    this.tooltipOn = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.TOOLTIP_APPLYON;
    this.textOn = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.TEXT_APPLYON;
    this.textReplace = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.TEXTMETHODS;
    this.EventType = rule_class__WEBPACK_IMPORTED_MODULE_1__["EventMap"].getDefaultMethods();
    this.tpDirection = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.TOOLTIP_DIRECTION_TYPES;
    this.propTypes = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.IDENT_TYPES;
    this.textPattern = '/.*/';
    this.metricTypes = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.VALUE_TYPES;
    this.dateFormats = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.VALUE_DATEFORMAT_TYPES;
    this.aggregationTypes = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.AGGREGATION_TYPES;
    this.mappingTypes = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.VALUEMAPPINGTYPES;
    this.tpGraphType = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.TOOLTIP_GRAPH_TYPES;
    this.tpGraphScale = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.TOOLTIP_GRAPH_SCALE_TYPES;
    this.tpGraphSize = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.TOOLTIP_GRAPH_SIZE_TYPES;
    $scope.editor = this;
    $scope.$GF = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].me();
    this.$scope = $scope;
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    this.rulesHandler = this.ctrl.rulesHandler;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.rulesHandler = this.ctrl.rulesHandler;
    this.metricHandler = this.ctrl.metricHandler;
    this.unitFormats = grafana_func__WEBPACK_IMPORTED_MODULE_3__["default"].getUnitFormats();
    this.tpGraphSize = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.TOOLTIP_GRAPH_SIZE_TYPES;

    this.getMetricNames = function () {
      return _this.metricHandler.getNames('serie');
    };

    this.getCellNames = function () {
      var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id';

      var flowchart = _this.flowchartHandler.getFlowchart();

      var cells = flowchart.getNamesByProp(prop);
      var uniq = new Set(cells);

      var filter = _toConsumableArray(uniq);

      filter = filter.filter(function (e) {
        return e !== undefined && e.length > 0;
      });
      return filter;
    };

    this.getCellNamesById = function () {
      return _this.getCellNames('id');
    };

    this.getCellNamesByValue = function () {
      return _this.getCellNames('value');
    };

    this.getVariables = function () {
      return globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getFullAvailableVarNames();
    };

    this.getEventValues = [];
  }

  _createClass(MappingOptionsCtrl, [{
    key: "isFirstRule",
    value: function isFirstRule(index) {
      if (index === 0) {
        return true;
      }

      return false;
    }
  }, {
    key: "isOnlySeries",
    value: function isOnlySeries() {
      var bool = this.metricHandler.isTypeOf('serie') && !this.metricHandler.isTypeOf('table');
      return bool;
    }
  }, {
    key: "isOnlyTables",
    value: function isOnlyTables() {
      var bool = !this.metricHandler.isTypeOf('serie') && this.metricHandler.isTypeOf('table');
      return bool;
    }
  }, {
    key: "isMultipleType",
    value: function isMultipleType() {
      var bool = this.metricHandler.isTypeOf('serie') && this.metricHandler.isTypeOf('table');
      return bool;
    }
  }, {
    key: "initType",
    value: function initType(rule) {
      if (this.isOnlyTables()) {
        rule.data.metricType = 'table';
      } else if (this.isOnlySeries()) {
        rule.data.metricType = 'serie';
      }
    }
  }, {
    key: "getTablesName",
    value: function getTablesName() {
      return this.metricHandler.getNames('table');
    }
  }, {
    key: "getColumnsForTable",
    value: function getColumnsForTable(tableName) {
      return this.metricHandler.getColumnsName(tableName, 'table');
    }
  }, {
    key: "isLastRule",
    value: function isLastRule(index) {
      var count = this.rulesHandler.countRules();

      if (index === count - 1) {
        return true;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      this.ctrl.render();
    }
  }, {
    key: "setUnitFormat",
    value: function setUnitFormat(rule, subItem) {
      rule.data.unit = subItem.value;
      this.onRulesChange();
    }
  }, {
    key: "onRulesChange",
    value: function onRulesChange() {
      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.info('MappingOptionsCtrl.onRulesChange()');
      this.flowchartHandler.ruleChanged();
      this.render();
      return true;
    }
  }, {
    key: "getLevels",
    value: function getLevels(rule) {
      var lvl = [];
      var count = rule.data.colors.length;

      for (var index = 0; index < count; index++) {
        lvl.push({
          text: "".concat(index),
          value: index
        });
      }

      return lvl;
    }
  }, {
    key: "removeShapeMap",
    value: function removeShapeMap(rule, index) {
      var shape = rule.getShapeMap(index);
      this.unselectCell(rule.data.shapeProp, shape.data.pattern);
      rule.removeShapeMap(index);
    }
  }, {
    key: "removeTextMap",
    value: function removeTextMap(rule, index) {
      var txt = rule.getTextMap(index);
      this.unselectCell(rule.data.textProp, txt.data.pattern);
      rule.removeTextMap(index);
    }
  }, {
    key: "removeLinkMap",
    value: function removeLinkMap(rule, index) {
      var lnk = rule.getLinkMap(index);
      this.unselectCell(rule.data.linkProp, lnk.data.pattern);
      rule.removeLinkMap(index);
    }
  }, {
    key: "removeEventMap",
    value: function removeEventMap(rule, index) {
      var evt = rule.getEventMap(index);
      this.unselectCell(rule.data.eventProp, evt.data.pattern);
      rule.removeEventMap(index);
    }
  }, {
    key: "onColorChange",
    value: function onColorChange(ruleIndex, colorIndex) {
      var _this2 = this;

      return function (newColor) {
        var rule = _this2.rulesHandler.getRule(ruleIndex);

        rule.data.colors[colorIndex] = newColor;

        _this2.onRulesChange();
      };
    }
  }, {
    key: "selectCell",
    value: function selectCell(prop, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var flowchart, xgraph;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                flowchart = this.flowchartHandler.getFlowchart();
                xgraph = flowchart.getXGraph();

                if (xgraph) {
                  xgraph.selectMxCells(prop, value);
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "unselectCell",
    value: function unselectCell(prop, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
        var flowchart, xgraph;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                flowchart = this.flowchartHandler.getFlowchart();
                xgraph = flowchart.getXGraph();

                if (xgraph) {
                  xgraph.unselectMxCells(prop, value);
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "toggleShow",
    value: function toggleShow(rule, bool) {
      rule.data.hidden = bool;
      this.onRulesChange();
    }
  }, {
    key: "highlightCells",
    value: function highlightCells(rule) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                rule.highlightCells();

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
    }
  }, {
    key: "unhighlightCells",
    value: function unhighlightCells(rule) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                rule.unhighlightCells();

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
    }
  }, {
    key: "unhighlightAllCells",
    value: function unhighlightAllCells() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee5() {
        var flowchart, xgraph;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                flowchart = this.flowchartHandler.getFlowchart();
                xgraph = flowchart.getXGraph();

                if (xgraph) {
                  xgraph.unhighlightCells();
                }

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    }
  }, {
    key: "removeRule",
    value: function removeRule(rule, force) {
      if (rule.removeClick === 1 || force) {
        this.rulesHandler.removeRule(rule);
        this.onRulesChange();
      }

      rule.removeClick = 1;
      window.setInterval(function () {
        if (rule) {
          rule.removeClick = 2;
        }
      }, 2000);
    }
  }, {
    key: "cloneRule",
    value: function cloneRule(rule) {
      this.rulesHandler.cloneRule(rule);
      this.onRulesChange();
    }
  }, {
    key: "moveRule",
    value: function moveRule(rule, up) {
      if (up) {
        this.rulesHandler.moveRuleToUp(rule);
      } else {
        this.rulesHandler.moveRuleToDown(rule);
      }

      this.onRulesChange();
    }
  }, {
    key: "onEventValue",
    value: function onEventValue(event) {
      this.getEventValues = event.getTypeahead();
    }
  }]);

  return MappingOptionsCtrl;
}();
function mappingOptionsTab($q, uiSegmentSrv) {
  'use strict';

  return {
    restrict: 'E',
    scope: true,
    templateUrl: "".concat(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].plugin.getPartialPath(), "/mapping/index.html"),
    controller: MappingOptionsCtrl
  };
}

/***/ }),

/***/ "./metricHandler.ts":
/*!**************************!*\
  !*** ./metricHandler.ts ***!
  \**************************/
/*! exports provided: MetricHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricHandler", function() { return MetricHandler; });
/* harmony import */ var _metric_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metric_class */ "./metric_class.ts");
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var MetricHandler = function () {
  function MetricHandler($scope) {
    _classCallCheck(this, MetricHandler);

    this.tables = [];
    this.series = [];
    this.metrics = [];
    this.$scope = $scope;
  }

  _createClass(MetricHandler, [{
    key: "initData",
    value: function initData(dataList) {
      var _this = this;

      var trc = globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].trace.before(this.constructor.name + '.' + 'initData()');
      this.tables = [];
      this.series = [];
      this.metrics = [];
      dataList.forEach(function (dl) {
        _this.addMetric(dl);
      });
      trc.after();
    }
  }, {
    key: "addMetric",
    value: function addMetric(data) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].trace.before(this.constructor.name + '.' + 'addMetric()');

      if (data.type === 'table') {
        this.addTable(data);
      } else {
        this.addSerie(data);
      }

      trc.after();
    }
  }, {
    key: "addTable",
    value: function addTable(data) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].trace.before(this.constructor.name + '.' + 'addTable()');
      var table = new _metric_class__WEBPACK_IMPORTED_MODULE_0__["Table"](data);
      this.tables.push(table);
      this.metrics.push(table);
      trc.after();
      return table;
    }
  }, {
    key: "addSerie",
    value: function addSerie(data) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].trace.before(this.constructor.name + '.' + 'addSerie()');
      var serie = new _metric_class__WEBPACK_IMPORTED_MODULE_0__["Serie"](data);
      this.series.push(serie);
      this.metrics.push(serie);
      trc.after();
      return serie;
    }
  }, {
    key: "getNames",
    value: function getNames(type) {
      var names = [];

      if (type === 'serie') {
        names = this.series.map(function (m) {
          return m.getName();
        });
      } else if (type === 'table') {
        names = this.tables.map(function (m) {
          return m.getName();
        });
      } else {
        names = this.metrics.map(function (m) {
          return m.getName();
        });
      }

      return names;
    }
  }, {
    key: "getMetrics",
    value: function getMetrics(type) {
      if (type === 'serie') {
        return this.series;
      }

      if (type === 'table') {
        return this.tables;
      }

      return this.metrics;
    }
  }, {
    key: "isTypeOf",
    value: function isTypeOf(type) {
      if (type === 'serie') {
        return this.series.length > 0;
      }

      if (type === 'table') {
        return this.tables.length > 0;
      }

      return false;
    }
  }, {
    key: "findMetrics",
    value: function findMetrics(name, type) {
      var metrics = [];

      if (type) {
        if (type === 'table') {
          metrics = this.tables.filter(function (m) {
            return m.getName() === name;
          });
        }

        if (type === 'serie') {
          metrics = this.series.filter(function (m) {
            return m.getName() === name;
          });
        }
      } else {
        metrics = this.metrics.filter(function (m) {
          return m.getName() === name;
        });
      }

      return metrics;
    }
  }, {
    key: "getColumnsName",
    value: function getColumnsName(metricName, type) {
      var metrics = this.findMetrics(metricName, type);
      var columns = [];
      metrics.forEach(function (m) {
        columns = columns.concat(m.getColumnsName());
      });
      return columns;
    }
  }]);

  return MetricHandler;
}();

/***/ }),

/***/ "./metric_class.ts":
/*!*************************!*\
  !*** ./metric_class.ts ***!
  \*************************/
/*! exports provided: Metric, Serie, Table */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Metric", function() { return Metric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Serie", function() { return Serie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony import */ var _grafana_func__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grafana_func */ "./grafana_func.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Metric = function () {
  function Metric(dataList) {
    _classCallCheck(this, Metric);

    this.type = 'unknow';
    this.metrics = {};
    this.name = '';
    this.nullPointMode = 'connected';
  }

  _createClass(Metric, [{
    key: "getName",
    value: function getName() {
      if (this.name === undefined || this.name === null) {
        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('Metric => getName : Name is null');
      }

      return this.name;
    }
  }, {
    key: "getValue",
    value: function getValue(aggregator, column) {
      return null;
    }
  }, {
    key: "findValue",
    value: function findValue(timestamp, column) {
      return null;
    }
  }, {
    key: "getData",
    value: function getData(column) {
      var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return [];
    }
  }, {
    key: "getColumnsName",
    value: function getColumnsName() {
      return [];
    }
  }]);

  return Metric;
}();
var Serie = function (_Metric) {
  _inherits(Serie, _Metric);

  function Serie(dataList) {
    var _this;

    _classCallCheck(this, Serie);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Serie).call(this, dataList));
    _this.type = 'serie';
    _this.metrics = _this.seriesHandler(dataList);

    _this.addCustomStats();

    _this.name = _this.metrics.alias;
    return _this;
  }

  _createClass(Serie, [{
    key: "seriesHandler",
    value: function seriesHandler(seriesData) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'seriesHandler()');
      var series = _grafana_func__WEBPACK_IMPORTED_MODULE_0__["default"].getTimeSeries(seriesData);
      series.flotpairs = series.getFlotPairs(this.nullPointMode);
      trc.after();
      return series;
    }
  }, {
    key: "addCustomStats",
    value: function addCustomStats() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'addCustomStats()');

      try {
        var lg = this.metrics.flotpairs.length;
        this.metrics.stats['last_time'] = this.metrics.flotpairs[lg - 1][0];
        this.metrics.stats['current'] = this.metrics.flotpairs[lg - 1][1];
        this.metrics.stats['current_notnull'] = null;
        var idx = lg - 1;

        while ((this.metrics.flotpairs[idx][1] === null || this.metrics.flotpairs[idx][1] === undefined) && idx >= 0) {
          idx -= 1;
        }

        if (idx >= 0) {
          this.metrics.stats['current_notnull'] = this.metrics.flotpairs[idx][1];
        }

        this.metrics.stats['first'] = this.metrics.flotpairs[0][1];
        this.metrics.stats['first_notnull'] = null;
        idx = 0;

        while ((this.metrics.flotpairs[idx][1] === null || this.metrics.flotpairs[idx][1] === undefined) && idx < lg) {
          idx += 1;
        }

        if (idx < lg) {
          this.metrics.stats['first_notnull'] = this.metrics.flotpairs[idx][1];
        }
      } catch (error) {
        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('Unable to add custom stats', error);
      }

      trc.after();
    }
  }, {
    key: "getValue",
    value: function getValue(aggregator) {
      try {
        var value = null;

        if (globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].hasGraphHover()) {
          var timestamp = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getGraphHover();
          value = timestamp !== undefined ? this.findValue(timestamp) : null;
        } else {
          value = this.metrics.stats[aggregator];
        }

        return value;
      } catch (error) {
        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('datapoint for serie is null', error);
        return null;
      }
    }
  }, {
    key: "findValue",
    value: function findValue(timestamp) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'findValue()');
      var low = 0;
      var high = this.metrics.flotpairs.length - 1;
      var found = !(high > 0);
      timestamp = Math.round(timestamp);
      var value = null;

      while (!found) {
        var middle = low + Math.round((high - low) / 2);

        if (this.metrics.flotpairs[middle][0] === timestamp) {
          value = this.metrics.flotpairs[middle][1];
          found = true;
        }

        if (!found && low < middle && middle < high) {
          if (timestamp > this.metrics.flotpairs[middle][0]) {
            low = middle;
          }

          if (timestamp < this.metrics.flotpairs[middle][0]) {
            high = middle;
          }
        } else {
          if (this.metrics.flotpairs[middle][0] > timestamp && middle >= 1) {
            value = this.metrics.flotpairs[middle - 1][1];
          } else {
            value = this.metrics.flotpairs[middle][1];
          }

          found = true;
        }
      }

      trc.after();
      return value;
    }
  }, {
    key: "getData",
    value: function getData() {
      var column = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.metrics.flotpairs.map(function (d) {
        if (!!log) {
          return {
            x: d[0],
            y: Math.log10(d[1])
          };
        }

        return {
          x: d[0],
          y: d[1]
        };
      });
    }
  }, {
    key: "getColumnsName",
    value: function getColumnsName() {
      return ['time', 'value'];
    }
  }]);

  return Serie;
}(Metric);
var Table = function (_Metric2) {
  _inherits(Table, _Metric2);

  function Table(dataList) {
    var _this2;

    _classCallCheck(this, Table);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, dataList));
    _this2.tableColumnOptions = {};
    _this2.tableColumn = '';
    _this2.allIsNull = true;
    _this2.allIsZero = true;
    _this2.type = 'table';
    _this2.name = dataList.refId;
    _this2.metrics = _this2.tableHandler(dataList);
    return _this2;
  }

  _createClass(Table, [{
    key: "tableHandler",
    value: function tableHandler(tableData) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'tableHandler()');
      var table = {
        datapoints: [],
        columnNames: {},
        stats: {}
      };
      tableData.columns.forEach(function (column, columnIndex) {
        table.columnNames[columnIndex] = column.text;

        if (column.text.toString().toLowerCase() === 'time') {
          table.timeIndex = columnIndex;
          table.timeColumn = column.text;
        }
      });
      this.tableColumnOptions = table.columnNames;

      if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(tableData.columns, ['text', this.tableColumn])) {
        this.setTableColumnToSensibleDefault(tableData);
      }

      tableData.rows.forEach(function (row) {
        var datapoint = {};
        row.forEach(function (value, columnIndex) {
          var key = table.columnNames[columnIndex];
          datapoint[key] = value;
        });
        table.datapoints.push(datapoint);
      });
      this.metrics.flotpairs = this.getFlotPairs(this.nullPointMode, table);
      trc.after();
      return table;
    }
  }, {
    key: "setTableColumnToSensibleDefault",
    value: function setTableColumnToSensibleDefault(tableData) {
      if (tableData.columns.length === 1) {
        this.tableColumn = tableData.columns[0].text;
      } else {
        this.tableColumn = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(tableData.columns, function (col) {
          return col.type !== 'time';
        }).text;
      }
    }
  }, {
    key: "getFlotPairs",
    value: function getFlotPairs(fillStyle, table) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'getFlotPairs()');
      var result = [];
      var ignoreNulls = fillStyle === 'connected';
      var nullAsZero = fillStyle === 'null as zero';
      table.allIsNull = true;
      table.allIsZero = true;

      for (var idx in table.columnNames) {
        var currName = table.columnNames[idx];
        table.stats[currName] = {};
        table.stats[currName].name = currName;
        table.stats[currName].total = 0;
        table.stats[currName].max = -Number.MAX_VALUE;
        table.stats[currName].min = Number.MAX_VALUE;
        table.stats[currName].logmin = Number.MAX_VALUE;
        table.stats[currName].avg = null;
        table.stats[currName].current = null;
        table.stats[currName].current_notnull = null;
        table.stats[currName].first = null;
        table.stats[currName].first_notnull = null;
        table.stats[currName].delta = 0;
        table.stats[currName].diff = null;
        table.stats[currName].range = null;
        table.stats[currName].timeStep = Number.MAX_VALUE;
        var currentTime = void 0;
        var currentValue = void 0;
        var nonNulls = 0;
        var previousTime = void 0;
        var previousValue = 0;
        var previousDeltaUp = true;

        try {
          for (var i = 0; i < table.datapoints.length; i++) {
            if (table.timeColumn) {
              currentTime = table.datapoints[i][table.timeColumn];
            }

            currentValue = table.datapoints[i][currName];

            if (previousTime !== undefined) {
              var timeStep = currentTime - previousTime;

              if (timeStep < table.stats[currName].timeStep) {
                table.stats[currName].timeStep = timeStep;
              }
            }

            previousTime = currentTime;

            if (currentValue === null) {
              if (ignoreNulls) {
                continue;
              }

              if (nullAsZero) {
                currentValue = 0;
              }
            }

            if (currentValue !== null) {
              if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNumber(currentValue)) {
                table.stats[currName].total += currentValue;
                this.allIsNull = false;
                nonNulls++;
              }

              if (currentValue > table.stats[currName].max) {
                table.stats[currName].max = currentValue;
              }

              if (currentValue < table.stats[currName].min) {
                table.stats[currName].min = currentValue;
              }

              if (table.stats[currName].first === null) {
                table.stats[currName].first = currentValue;
              } else {
                if (previousValue > currentValue) {
                  previousDeltaUp = false;

                  if (i === table.datapoints.length - 1) {
                    table.stats[currName].delta += currentValue;
                  }
                } else {
                  if (previousDeltaUp) {
                    table.stats[currName].delta += currentValue - previousValue;
                  } else {
                    table.stats[currName].delta += currentValue;
                  }

                  previousDeltaUp = true;
                }
              }

              previousValue = currentValue;

              if (currentValue < table.stats[currName].logmin && currentValue > 0) {
                table.stats[currName].logmin = currentValue;
              }

              if (currentValue !== 0) {
                this.allIsZero = false;
              }
            }

            result.push([currentTime, currentValue]);
          }
        } catch (error) {
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('Unable to aggregate data', error);
        }

        if (currentTime) {
          table.stats[currName].last_time = currentTime;
        }

        if (table.stats[currName].max === -Number.MAX_VALUE) {
          table.stats[currName].max = null;
        }

        if (table.stats[currName].min === Number.MAX_VALUE) {
          table.stats[currName].min = null;
        }

        if (result.length && !this.allIsNull) {
          table.stats[currName].avg = table.stats[currName].total / nonNulls;
          table.stats[currName].current = result[result.length - 1][1];

          if (table.stats[currName].current === null && result.length > 1) {
            table.stats[currName].current = result[result.length - 2][1];
          }
        }

        if (table.stats[currName].max !== null && table.stats[currName].min !== null) {
          table.stats[currName].range = table.stats[currName].max - table.stats[currName].min;
        }

        if (table.stats[currName].current !== null && table.stats[currName].first !== null) {
          table.stats[currName].diff = table.stats[currName].current - table.stats[currName].first;
        }

        table.stats[currName].count = result.length;
      }

      trc.after();
      return result;
    }
  }, {
    key: "getValue",
    value: function getValue(aggregator, column) {
      try {
        var value = null;

        if (globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].hasGraphHover()) {
          var timestamp = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getGraphHover();
          value = timestamp !== undefined ? this.findValue(timestamp, column) : null;
        } else {
          value = this.metrics.stats[column][aggregator];
        }

        return value;
      } catch (error) {
        globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('datapoint for table is null', error);
        return null;
      }
    }
  }, {
    key: "findValue",
    value: function findValue(timestamp, column) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'findValue()');
      var low = 0;
      var high = this.metrics.datapoints.length - 1;
      var found = !(high > 0 && this.metrics.datapoints[low][this.metrics.timeColumn] < timestamp);
      timestamp = Math.round(timestamp);
      var value = null;

      while (!found) {
        var middle = low + Math.round((high - low) / 2);

        if (this.metrics.datapoints[middle][this.metrics.timeColumn] === timestamp) {
          value = this.metrics.datapoints[middle][column];
          found = true;
        }

        if (!found && low < middle && middle < high) {
          if (timestamp > this.metrics.datapoints[middle][this.metrics.timeColumn]) {
            low = middle;
          }

          if (timestamp < this.metrics.datapoints[middle][this.metrics.timeColumn]) {
            high = middle;
          }
        } else {
          if (this.metrics.datapoints[middle][this.metrics.timeColumn] > timestamp && middle >= 1) {
            value = this.metrics.datapoints[middle - 1][column];
          } else {
            value = this.metrics.datapoints[middle][column];
          }

          found = true;
        }
      }

      trc.after();
      return value;
    }
  }, {
    key: "getColumnIndex",
    value: function getColumnIndex(column) {
      for (var idx in this.tableColumnOptions) {
        if (column === this.tableColumnOptions[idx]) {
          return Number(idx);
        }
      }

      return null;
    }
  }, {
    key: "getColumnsName",
    value: function getColumnsName() {
      var result = [];

      for (var idx in this.tableColumnOptions) {
        result.push(this.tableColumnOptions[idx]);
      }

      return result;
    }
  }, {
    key: "getData",
    value: function getData(column) {
      var _this3 = this;

      if (this.metrics.timeColumn) {
        return this.metrics.datapoints.map(function (d) {
          return {
            x: d[_this3.metrics.timeColumn],
            y: d[column]
          };
        });
      }

      return this.metrics.datapoints.map(function (d) {
        return d[column];
      });
    }
  }]);

  return Table;
}(Metric);

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: PanelCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _flowchart_ctrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flowchart_ctrl */ "./flowchart_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelCtrl", function() { return _flowchart_ctrl__WEBPACK_IMPORTED_MODULE_0__["FlowchartCtrl"]; });

/* harmony import */ var _grafana_func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grafana_func */ "./grafana_func.ts");


_grafana_func__WEBPACK_IMPORTED_MODULE_1__["default"].loadCss();


/***/ }),

/***/ "./plugin.json":
/*!*********************!*\
  !*** ./plugin.json ***!
  \*********************/
/*! exports provided: type, name, id, info, dependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"type\":\"panel\",\"name\":\"FlowCharting\",\"id\":\"agenty-flowcharting-panel\",\"info\":{\"description\":\"Flowcharting is a Grafana plugin. Use it to display complexe diagrams using the online graphing library draw.io like a vsio\",\"author\":{\"name\":\"Arnaud GENTY\",\"url\":\"https://github.com/algenty/grafana-flowcharting\"},\"keywords\":[\"flowchart\",\"panel\",\"diagram\",\"workflow\",\"floorplan\",\"map\",\"organigram\",\"draw.io\",\"visio\",\"mxgraph\"],\"links\":[{\"name\":\"Project site\",\"url\":\"https://github.com/algenty/grafana-flowcharting\"},{\"name\":\"Documentation\",\"url\":\"https://algenty.github.io/flowcharting-repository/\"},{\"name\":\"Demonstration\",\"url\":\"https://play.grafana.org/d/Unu5JcjWk/flowcharting-index?orgId=1\"},{\"name\":\"Apache License\",\"url\":\"https://github.com/algenty/grafana-flowcharting/blob/master/LICENSE\"}],\"version\":\"1.0.0\",\"updated\":\"2019-05-31\",\"logos\":{\"small\":\"img/agenty-flowcharting.svg\",\"large\":\"img/agenty-flowcharting.svg\"}},\"dependencies\":{\"grafanaVersion\":\"6.x.x\",\"plugins\":[]}}");

/***/ }),

/***/ "./rule_class.ts":
/*!***********************!*\
  !*** ./rule_class.ts ***!
  \***********************/
/*! exports provided: Rule, GFMap, ShapeMap, TextMap, LinkMap, EventMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return Rule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GFMap", function() { return GFMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeMap", function() { return ShapeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextMap", function() { return TextMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkMap", function() { return LinkMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventMap", function() { return EventMap; });
/* harmony import */ var grafana_func__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana_func */ "./grafana_func.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chroma-js */ "../node_modules/chroma-js/chroma.js");
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Rule = function () {
  function Rule(pattern, data) {
    _classCallCheck(this, Rule);

    this.shapeMaps = [];
    this.textMaps = [];
    this.linkMaps = [];
    this.eventMaps = [];
    this.valueMaps = [];
    this.rangeMaps = [];
    this.removeClick = 2;
    this.highestLevel = -1;
    this.highestColor = '';
    this.highestFormattedValue = '';
    this.highestValue = undefined;
    this.execTimes = 0;
    this.data = data;
    this.data.pattern = pattern;
    this.id = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.uniqueID();
    this.states = new Map();
  }

  _createClass(Rule, [{
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      var _this = this;

      var trc = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].trace.before(this.constructor.name + '.' + 'import()');

      if (!!obj.unit) {
        this.data.unit = obj.unit;
      }

      if (!!obj.type) {
        this.data.type = obj.type;
      }

      if (!!obj.metricType) {
        this.data.metricType = obj.metricType;
      }

      if (!!obj.alias) {
        this.data.alias = obj.alias;
      }

      if (!!obj.refId) {
        this.data.refId = obj.refId;
      }

      if (!!obj.column) {
        this.data.column = obj.column;
      }

      if (!!obj.aggregation) {
        this.data.aggregation = obj.aggregation;
      }

      if (!!obj.decimals || obj.decimals === 0) {
        this.data.decimals = obj.decimals;
      }

      if (!!obj.colors) {
        this.data.colors = obj.colors.slice(0);
      }

      if (!!this.data.reduce) {
        this.data.reduce = true;
      }

      var colorOn = undefined;

      if (!!obj.colorOn) {
        colorOn = obj.colorOn;
      }

      var style = undefined;

      if (!!obj.style) {
        style = obj.style;
      }

      var link = false;
      var linkUrl = undefined;
      var linkParams = undefined;

      if (!!obj.link) {
        link = obj.link;
      }

      if (!!obj.linkUrl) {
        linkUrl = obj.linkUrl;
      }

      if (!!obj.linkParams) {
        linkParams = obj.linkParams;
      }

      var linkOn = undefined;

      if (!!obj.linkOn) {
        linkOn = obj.linkOn;
      }

      var textOn = undefined;

      if (!!obj.textOn) {
        textOn = obj.textOn;
      }

      var textReplace = undefined;
      var textPattern = undefined;

      if (!!obj.textReplace) {
        textReplace = obj.textReplace;
      }

      if (!!obj.textPattern) {
        textPattern = obj.textPattern;
      }

      if (!!obj.pattern) {
        this.data.pattern = obj.pattern;
      }

      if (!!obj.dateFormat) {
        this.data.dateFormat = obj.dateFormat;
      }

      if (!!obj.thresholds) {
        this.data.thresholds = obj.thresholds.map(function (x) {
          var value = x;

          if (typeof value === 'string') {
            value = parseFloat(value);
          }

          return value;
        });
      }

      if (!!obj.stringThresholds) {
        this.data.stringThresholds = obj.stringThresholds.slice(0);
      }

      if (!!obj.stringWarning) {
        this.data.stringThresholds[1] = obj.stringWarning;
      }

      if (!!obj.stringCritical) {
        this.data.stringThresholds[0] = obj.stringCritical;
      }

      if (!!obj.invert || obj.invert === false) {
        this.data.invert = obj.invert;
      }

      if (!!obj.gradient || obj.gradient === false) {
        this.data.gradient = obj.gradient;
      }

      if (!!obj.overlayIcon || obj.overlayIcon === false) {
        this.data.overlayIcon = obj.overlayIcon;
      }

      if (!!obj.tooltip || obj.tooltip === false) {
        this.data.tooltip = obj.tooltip;
      }

      if (!!obj.tooltipLabel) {
        this.data.tooltipLabel = obj.tooltipLabel;
      }

      if (!!obj.tooltipColors || obj.tooltipColors === false) {
        this.data.tooltipColors = obj.tooltipColors;
      }

      if (!!obj.tooltipOn) {
        this.data.tooltipOn = obj.tooltipOn;
      }

      if (!!obj.tpDirection) {
        this.data.tpDirection = obj.tpDirection;
      }

      if (!!obj.tpGraph || this.data.tpGraph === false) {
        this.data.tpGraph = obj.tpGraph;
      }

      if (!!obj.tpGraphSize) {
        this.data.tpGraphSize = obj.tpGraphSize;
      }

      if (!!obj.tpGraphType) {
        this.data.tpGraphType = obj.tpGraphType;
      }

      if (!!obj.tpGraphLow || obj.tpGraphLow === 0) {
        this.data.tpGraphLow = obj.tpGraphLow;
      }

      if (!!obj.tpGraphHigh || obj.tpGraphHigh === 0) {
        this.data.tpGraphHigh = obj.tpGraphHigh;
      }

      if (!!obj.tpGraphScale) {
        this.data.tpGraphScale = obj.tpGraphScale;
      }

      var maps = [];

      if (!!obj.shapeProp) {
        this.data.shapeProp = obj.shapeProp;
      }

      if (!!obj.shapeRegEx || obj.shapeRegEx === false) {
        this.data.shapeRegEx = obj.shapeRegEx;
      }

      this.data.shapeData = [];
      maps = [];

      if (obj.shapeMaps !== undefined && obj.shapeMaps !== null && obj.shapeMaps.length > 0) {
        maps = obj.shapeMaps;
      } else {
        maps = obj.shapeData;
      }

      if (maps !== undefined && maps !== null && maps.length > 0) {
        maps.forEach(function (shapeData) {
          if (!!style) {
            shapeData.style = style;
          }

          if (!!colorOn) {
            shapeData.colorOn = colorOn;
          }

          _this.addShapeMap('')["import"](shapeData);
        });
      }

      this.data.textProp = obj.textProp || 'id';

      if (!!obj.textRegEx || obj.textRegEx === false) {
        this.data.textRegEx = obj.textRegEx;
      }

      this.data.textData = [];
      maps = [];

      if (obj.shapeMaps !== undefined && obj.shapeMaps !== null && obj.shapeMaps.length > 0) {
        maps = obj.textMaps;
      } else {
        maps = obj.textData;
      }

      if (maps !== undefined && maps != null && maps.length > 0) {
        maps.forEach(function (textData) {
          if (!!textReplace) {
            textData.textReplace = textReplace;
          }

          if (!!textPattern) {
            textData.textPattern = textPattern;
          }

          if (!!textOn) {
            textData.textOn = textOn;
          }

          _this.addTextMap('')["import"](textData);
        });
      }

      this.data.linkProp = obj.linkProp || 'id';

      if (!!obj.linkRegEx || obj.linkRegEx === false) {
        this.data.linkRegEx = obj.linkRegEx;
      }

      this.data.linkData = [];

      if (obj.linkData !== undefined && obj.linkData != null && obj.linkData.length > 0) {
        obj.linkData.forEach(function (linkData) {
          if (!!linkUrl && link) {
            linkData.linkUrl = linkUrl;
          }

          if (!!linkParams && link) {
            linkData.linkParams = linkParams;
          }

          if (!!linkOn) {
            linkData.linkOn = linkOn;
          }

          _this.addLinkMap('')["import"](linkData);
        });
      }

      this.data.eventProp = obj.eventProp || 'id';

      if (!!obj.eventRegEx || obj.eventRegEx === false) {
        this.data.eventRegEx = obj.eventRegEx;
      }

      this.data.eventData = [];

      if (obj.eventData !== undefined && obj.eventData != null && obj.eventData.length > 0) {
        obj.eventData.forEach(function (eventData) {
          _this.addEventMap('')["import"](eventData);
        });
      }

      this.data.mappingType = obj.mappingType || 1;
      this.data.valueData = [];

      if (obj.valueData !== undefined && obj.valueData != null && obj.valueData.length > 0) {
        obj.valueData.forEach(function (valueData) {
          _this.addValueMap('value', 'text')["import"](valueData);
        });
      }

      this.data.rangeData = [];

      if (obj.rangeData !== undefined && obj.rangeData != null && obj.rangeData.length > 0) {
        obj.rangeData.forEach(function (rangeData) {
          _this.addRangeMap('from', 'to', 'text')["import"](rangeData);
        });
      }

      this.data.sanitize = obj.sanitize || false;
      trc.after();
      return this;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "highlightCells",
    value: function highlightCells() {
      if (this.states) {
        this.states.forEach(function (state) {
          state.highlightCell();
        });
      }
    }
  }, {
    key: "unhighlightCells",
    value: function unhighlightCells() {
      if (this.states) {
        this.states.forEach(function (state) {
          state.unhighlightCell();
        });
      }
    }
  }, {
    key: "setOrder",
    value: function setOrder(order) {
      this.data.order = order;
    }
  }, {
    key: "getOrder",
    value: function getOrder() {
      return this.data.order;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.data.hidden;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.data.hidden = true;
      return this;
    }
  }, {
    key: "show",
    value: function show() {
      this.data.hidden = false;
      return this;
    }
  }, {
    key: "invertColorOrder",
    value: function invertColorOrder() {
      this.data.colors.reverse();
      return this;
    }
  }, {
    key: "invertThesholds",
    value: function invertThesholds() {
      this.invertColorOrder();
      this.data.invert = !this.data.invert;
      return this;
    }
  }, {
    key: "addColor",
    value: function addColor(index) {
      var thresholds = this.data.thresholds;
      var colors = this.data.colors;
      var colorStart = colors[index];
      var color;
      var value;

      if (index !== colors.length - 1) {
        var ratio = 0.5;
        var colorEnd = colors[index + 1];

        try {
          var f = chroma_js__WEBPACK_IMPORTED_MODULE_3___default.a.scale([colorStart, colorEnd]).mode('lrgb');
          color = f(ratio).hex();
        } catch (error) {
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error(error);
          color = colorStart;
        }

        if (this.data.type === 'number') {
          var absoluteDistance = thresholds[index] - thresholds[index - 1];
          value = absoluteDistance / 2 + thresholds[index - 1];
        } else {
          value = this.data.stringThresholds[index - 1];
        }
      } else {
        color = colorStart;
      }

      this.data.colors.splice(index + 1, 0, color);

      if (this.data.type === 'number') {
        this.data.thresholds.splice(index, 0, value);
      } else if (this.data.type === 'string') {
        this.data.stringThresholds.splice(index, 0, value);
      }

      return this;
    }
  }, {
    key: "removeColor",
    value: function removeColor(index) {
      this.data.thresholds.splice(index - 1, 1);
      this.data.stringThresholds.splice(index - 1, 1);
      this.data.colors.splice(index, 1);
      return this;
    }
  }, {
    key: "getColor",
    value: function getColor(index) {
      return this.data.colors[index];
    }
  }, {
    key: "getColors",
    value: function getColors() {
      return this.data.colors;
    }
  }, {
    key: "getColorsCount",
    value: function getColorsCount() {
      return this.data.colors.length;
    }
  }, {
    key: "toIconize",
    value: function toIconize(level) {
      if (this.data.overlayIcon === false) {
        return false;
      }

      if (this.data.overlayIcon === true && level >= 1) {
        return true;
      }

      return false;
    }
  }, {
    key: "toTooltipize",
    value: function toTooltipize(level) {
      if (this.data.tooltip === false) {
        return false;
      }

      if (this.data.tooltipOn === 'a') {
        return true;
      }

      if (this.data.tooltipOn === 'wc' && level >= 1) {
        return true;
      }

      return false;
    }
  }, {
    key: "matchMetric",
    value: function matchMetric(metric) {
      if (this.data.metricType === 'serie' && metric.type === 'serie') {
        return globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.matchString(metric.getName(), this.data.pattern);
      }

      if (this.data.metricType === 'table' && metric.type === 'table') {
        return metric.getName() === this.data.refId;
      }

      return false;
    }
  }, {
    key: "addShapeMap",
    value: function addShapeMap(pattern) {
      var data = ShapeMap.getDefaultData();
      var m = new ShapeMap(pattern, data);
      this.shapeMaps.push(m);
      this.data.shapeData.push(data);
      return m;
    }
  }, {
    key: "removeShapeMap",
    value: function removeShapeMap(index) {
      this.data.shapeData.splice(index, 1);
      this.shapeMaps.splice(index, 1);
      return this;
    }
  }, {
    key: "getShapeMap",
    value: function getShapeMap(index) {
      return this.shapeMaps[index];
    }
  }, {
    key: "getShapeMaps",
    value: function getShapeMaps() {
      return this.shapeMaps;
    }
  }, {
    key: "matchShape",
    value: function matchShape(pattern) {
      var _this2 = this;

      var found = false;
      this.shapeMaps.forEach(function (element) {
        if (element.match(pattern, _this2.data.shapeRegEx)) {
          found = true;
        }
      });
      return found;
    }
  }, {
    key: "addTextMap",
    value: function addTextMap(pattern) {
      var data = TextMap.getDefaultData();
      var m = new TextMap(pattern, data);
      this.textMaps.push(m);
      this.data.textData.push(data);
      return m;
    }
  }, {
    key: "removeTextMap",
    value: function removeTextMap(index) {
      this.data.textData.splice(index, 1);
      this.textMaps.splice(index, 1);
    }
  }, {
    key: "getTextMap",
    value: function getTextMap(index) {
      return this.textMaps[index];
    }
  }, {
    key: "getTextMaps",
    value: function getTextMaps() {
      return this.textMaps;
    }
  }, {
    key: "matchText",
    value: function matchText(pattern) {
      var found = false;
      this.textMaps.forEach(function (element) {
        if (element.match(pattern)) {
          found = true;
        }
      });
      return found;
    }
  }, {
    key: "addEventMap",
    value: function addEventMap(pattern) {
      var data = EventMap.getDefaultData();
      var m = new EventMap(pattern, data);
      this.eventMaps.push(m);
      this.data.eventData.push(data);
      return m;
    }
  }, {
    key: "removeEventMap",
    value: function removeEventMap(index) {
      this.data.eventData.splice(index, 1);
      this.eventMaps.splice(index, 1);
    }
  }, {
    key: "getEventMap",
    value: function getEventMap(index) {
      return this.eventMaps[index];
    }
  }, {
    key: "getEventMaps",
    value: function getEventMaps() {
      return this.eventMaps;
    }
  }, {
    key: "matchEvent",
    value: function matchEvent(pattern) {
      var found = false;
      this.eventMaps.forEach(function (element) {
        if (element.match(pattern)) {
          found = true;
        }
      });
      return found;
    }
  }, {
    key: "addLinkMap",
    value: function addLinkMap(pattern) {
      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.info('Rule.addLinkMap()');
      var data = LinkMap.getDefaultData();
      var m = new LinkMap(pattern, data);
      m["import"](data);
      this.linkMaps.push(m);
      this.data.linkData.push(data);
      return m;
    }
  }, {
    key: "removeLinkMap",
    value: function removeLinkMap(index) {
      this.data.linkData.splice(index, 1);
      this.linkMaps.splice(index, 1);
    }
  }, {
    key: "getLinkMap",
    value: function getLinkMap(index) {
      return this.linkMaps[index];
    }
  }, {
    key: "getLinkMaps",
    value: function getLinkMaps() {
      return this.linkMaps;
    }
  }, {
    key: "matchLink",
    value: function matchLink(pattern) {
      var found = false;
      this.linkMaps.forEach(function (element) {
        if (element.match(pattern)) {
          found = true;
        }
      });
      return found;
    }
  }, {
    key: "addValueMap",
    value: function addValueMap(value, text) {
      var data = ValueMap.getDefaultdata();
      var m = new ValueMap(value, text, data);
      this.valueMaps.push(m);
      this.data.valueData.push(data);
      return m;
    }
  }, {
    key: "removeValueMap",
    value: function removeValueMap(index) {
      this.data.valueData.splice(index, 1);
      this.valueMaps.splice(index, 1);
    }
  }, {
    key: "getValueMap",
    value: function getValueMap(index) {
      return this.valueMaps[index];
    }
  }, {
    key: "getValueMaps",
    value: function getValueMaps() {
      return this.valueMaps;
    }
  }, {
    key: "addRangeMap",
    value: function addRangeMap(from, to, text) {
      var data = RangeMap.getDefaultData();
      var m = new RangeMap(from, to, text, data);
      this.rangeMaps.push(m);
      this.data.rangeData.push(data);
      return m;
    }
  }, {
    key: "removeRangeMap",
    value: function removeRangeMap(index) {
      this.data.rangeData.splice(index, 1);
      this.rangeMaps.splice(index, 1);
    }
  }, {
    key: "getRangeMap",
    value: function getRangeMap(index) {
      return this.rangeMaps[index];
    }
  }, {
    key: "getRangeMaps",
    value: function getRangeMaps() {
      return this.rangeMaps;
    }
  }, {
    key: "hideRangeMap",
    value: function hideRangeMap(index) {
      this.rangeMaps[index].hide();
      return this;
    }
  }, {
    key: "showRangeMap",
    value: function showRangeMap(index) {
      this.rangeMaps[index].show();
      return this;
    }
  }, {
    key: "getExectedTime",
    value: function getExectedTime() {
      return typeof this.execTimes === 'number' ? "".concat(this.execTimes.toFixed(2), " ms") : "".concat(this.execTimes, " ms");
    }
  }, {
    key: "getColorForValue",
    value: function getColorForValue(value) {
      if (!this.data.gradient || this.data.type !== 'number') {
        var level = this.getThresholdLevel(value);
        return this.getColorForLevel(level);
      }

      if (this.data.type === 'number') {
        var thresholds = this.data.thresholds;
        var colors = this.data.colors;
        var l = thresholds.length;

        if (thresholds === undefined || l === 0) {
          return colors[0];
        }

        var cursor = 0;

        for (var index = 0; index < l; index++) {
          var t = thresholds[index];

          if (value < t) {
            break;
          }

          cursor = index;
        }

        if (cursor === 0 && value <= thresholds[0]) {
          return colors[0];
        }

        if (cursor === l - 1) {
          return colors[cursor + 1];
        }

        var absoluteDistance = thresholds[cursor + 1] - thresholds[cursor];
        var valueDistanceFromMin = value - thresholds[cursor];
        var ratio = valueDistanceFromMin / absoluteDistance;
        var color = colors[cursor + 1];

        try {
          color = chroma_js__WEBPACK_IMPORTED_MODULE_3___default.a.scale([colors[cursor + 1], colors[cursor + 2]]).mode('lrgb')(ratio).hex();
        } catch (error) {
          color = colors[cursor + 1];
        }

        return color;
      }

      return '';
    }
  }, {
    key: "getColorForLevel",
    value: function getColorForLevel(level) {
      var colors = this.data.colors;

      if (level < 0) {
        return colors[0];
      }

      var l = level;

      if (!this.data.invert) {
        l = this.data.colors.length - 1 - level;
      }

      if (colors[l] !== undefined) {
        return colors[l];
      }

      return colors[0];
    }
  }, {
    key: "getThresholdLevel",
    value: function getThresholdLevel(value) {
      if (this.data.type === 'number') {
        var thresholdLevel = 0;
        var thresholds = this.data.thresholds;

        if (thresholds === undefined || thresholds.length === 0) {
          return 0;
        }

        var l = thresholds.length;

        for (var index = 0; index < l; index++) {
          var t = thresholds[index];

          if (value < t) {
            break;
          }

          thresholdLevel = index + 1;
        }

        if (!this.data.invert) {
          thresholdLevel = this.data.colors.length - 1 - thresholdLevel;
        }

        return thresholdLevel;
      }

      if (this.data.type === 'string') {
        var _thresholdLevel = 0;
        var formatedValue = this.getFormattedValue(value);
        var _thresholds = this.data.stringThresholds;

        if (_thresholds === undefined || _thresholds.length === 0) {
          return 0;
        }

        var _l = _thresholds.length;

        for (var _index = 0; _index < _l; _index++) {
          var _t = _thresholds[_index];

          if (globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.matchString(value, _t) || globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.matchString(formatedValue, _t)) {
            _thresholdLevel = _index + 1;
            break;
          }
        }

        if (!this.data.invert) {
          _thresholdLevel = this.data.colors.length - 1 - _thresholdLevel;
        }

        return _thresholdLevel;
      }

      return 0;
    }
  }, {
    key: "getValueForMetric",
    value: function getValueForMetric(metric) {
      if (this.matchMetric(metric)) {
        try {
          var value = metric.getValue(this.data.aggregation, this.data.column);
          return value;
        } catch (error) {
          globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.error('datapoint for metric is null', error);
          return null;
        }
      }

      return '-';
    }
  }, {
    key: "getFormattedValueForMetric",
    value: function getFormattedValueForMetric(metric) {
      var formattedValue = this.getValueForMetric(metric);
      return this.getFormattedValue(formattedValue);
    }
  }, {
    key: "getFormattedValue",
    value: function getFormattedValue(value) {
      if (this.data.type === 'number') {
        if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isFinite(value)) {
          return 'null';
        }

        if (value === null || value === void 0) {
          return '-';
        }

        var decimals = this.decimalPlaces(value);
        decimals = typeof this.data.decimals === 'number' ? Math.min(this.data.decimals, decimals) : decimals;
        return grafana_func__WEBPACK_IMPORTED_MODULE_0__["default"].formatValue(value, this.data.unit, this.data.decimals);
      }

      if (this.data.type === 'string') {
        if (value === null || value === void 0) {
          value = 'null';
        }

        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray(value)) {
          value = value.join(', ');
        }

        var mappingType = this.data.mappingType || 0;

        if (mappingType === 1 && this.valueMaps) {
          for (var i = 0; i < this.valueMaps.length; i += 1) {
            var map = this.valueMaps[i];

            if (map.match(value)) {
              return map.getFormattedText(value);
            }
          }

          return value.toString();
        }

        if (mappingType === 2 && this.rangeMaps) {
          for (var _i = 0; _i < this.rangeMaps.length; _i += 1) {
            var _map = this.rangeMaps[_i];

            if (_map.match(value)) {
              return _map.getFormattedText(value);
            }
          }

          return value.toString();
        }

        if (value === null || value === void 0) {
          return 'null';
        }
      }

      if (this.data.type === 'date') {
        if (value === undefined || value === null) {
          return '-';
        }

        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray(value)) {
          value = value[0];
        }

        var d = grafana_func__WEBPACK_IMPORTED_MODULE_0__["default"].getFormatedDate(value, this.data.dateFormat);
        return d;
      }

      return value;
    }
  }, {
    key: "defaultValueFormatter",
    value: function defaultValueFormatter(value) {
      if (value === null || value === void 0 || value === undefined) {
        return '';
      }

      if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray(value)) {
        value = value.join(', ');
      }

      if (this.data.sanitize) {
        return this.$sanitize(value);
      }

      return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.escape(value);
    }
  }, {
    key: "$sanitize",
    value: function $sanitize(value) {
      throw new Error('Method not implemented.');
    }
  }, {
    key: "decimalPlaces",
    value: function decimalPlaces(num) {
      var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

      if (!match) {
        return 0;
      }

      return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    }
  }], [{
    key: "getDefaultData",
    value: function getDefaultData() {
      return {
        order: 1,
        pattern: '.*',
        unit: 'short',
        type: 'number',
        metricType: 'serie',
        alias: 'myRule',
        refId: 'A',
        column: 'Time',
        hidden: false,
        aggregation: 'current',
        decimals: 2,
        colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
        reduce: true,
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
        thresholds: [50, 80],
        stringThresholds: ['/.*/', '/.*/'],
        invert: false,
        gradient: false,
        overlayIcon: false,
        tooltip: false,
        tooltipLabel: '',
        tooltipColors: false,
        tooltipOn: 'a',
        tpDirection: 'v',
        tpGraph: false,
        tpGraphSize: '100%',
        tpGraphType: 'line',
        tpGraphLow: null,
        tpGraphHigh: null,
        tpGraphScale: 'linear',
        shapeProp: 'id',
        shapeRegEx: true,
        shapeData: [],
        textProp: 'id',
        textRegEx: true,
        textData: [],
        linkProp: 'id',
        linkRegEx: true,
        linkData: [],
        eventProp: 'id',
        eventRegEx: false,
        eventData: [],
        mappingType: 1,
        valueData: [],
        rangeData: [],
        sanitize: false
      };
    }
  }]);

  return Rule;
}();
var GFMap = function () {
  function GFMap(pattern, data) {
    _classCallCheck(this, GFMap);

    this.data = data;
    this.data.pattern = pattern;
    this.id = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.uniqueID();
  }

  _createClass(GFMap, [{
    key: "import",
    value: function _import(obj) {
      if (!!obj.pattern) {
        this.data.pattern = obj.pattern;
      }

      if (!!obj.hidden) {
        this.data.hidden = obj.hidden;
      }

      return this;
    }
  }, {
    key: "match",
    value: function match(text) {
      var regex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (text === undefined || text === null || text.length === 0) {
        return false;
      }

      return globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.matchString(text, this.data.pattern, regex);
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "show",
    value: function show() {
      this.data.hidden = false;
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.data.hidden = true;
      return this;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      if (this.data.hidden === undefined) {
        return false;
      }

      return this.data.hidden;
    }
  }, {
    key: "toVisible",
    value: function toVisible() {
      if (this.data.hidden) {
        return false;
      }

      return true;
    }
  }, {
    key: "export",
    value: function _export() {
      return {
        pattern: this.data.pattern,
        hidden: this.data.hidden
      };
    }
  }], [{
    key: "getDefaultMethods",
    value: function getDefaultMethods() {
      return this.methods;
    }
  }, {
    key: "getDefaultPlaceHolder",
    value: function getDefaultPlaceHolder(value) {
      var elt = this.methods.find(function (x) {
        return x.value === value;
      });

      if (elt !== undefined) {
        return elt.placeholder;
      }

      return undefined;
    }
  }, {
    key: "getDefaultValue",
    value: function getDefaultValue(value) {
      var elt = this.methods.find(function (x) {
        return x.value === value;
      });

      if (elt !== undefined) {
        return elt["default"];
      }

      return undefined;
    }
  }]);

  return GFMap;
}();
GFMap.methods = [];
var ShapeMap = function (_GFMap) {
  _inherits(ShapeMap, _GFMap);

  function ShapeMap(pattern, data) {
    var _this3;

    _classCallCheck(this, ShapeMap);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ShapeMap).call(this, pattern, data));
    _this3.data = data;
    return _this3;
  }

  _createClass(ShapeMap, [{
    key: "toColorize",
    value: function toColorize(level) {
      if (level === -1) {
        return false;
      }

      if (this.data.colorOn === 'n') {
        return false;
      }

      if (this.data.colorOn === 'a') {
        return true;
      }

      if (this.data.colorOn === 'wc' && level >= 1) {
        return true;
      }

      return false;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      _get(_getPrototypeOf(ShapeMap.prototype), "import", this).call(this, obj);

      if (!!obj.style) {
        this.data.style = obj.style;
      }

      if (!!obj.colorOn) {
        this.data.colorOn = obj.colorOn;
      }

      return this;
    }
  }], [{
    key: "getDefaultData",
    value: function getDefaultData() {
      return {
        pattern: '',
        hidden: false,
        style: 'fillColor',
        colorOn: 'a'
      };
    }
  }]);

  return ShapeMap;
}(GFMap);
var TextMap = function (_GFMap2) {
  _inherits(TextMap, _GFMap2);

  function TextMap(pattern, data) {
    var _this4;

    _classCallCheck(this, TextMap);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(TextMap).call(this, pattern, data));
    _this4.data = data;
    return _this4;
  }

  _createClass(TextMap, [{
    key: "toLabelize",
    value: function toLabelize(level) {
      if (this.data.textOn === 'wmd') {
        return true;
      }

      if (this.data.textOn === 'n') {
        return false;
      }

      if (this.data.textOn === 'wc' && level >= 1) {
        return true;
      }

      if (this.data.textOn === 'co' && level >= 2) {
        return true;
      }

      return false;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      _get(_getPrototypeOf(TextMap.prototype), "import", this).call(this, obj);

      if (!!obj.textReplace) {
        this.data.textReplace = obj.textReplace;
      }

      if (!!obj.textPattern) {
        this.data.textPattern = obj.textPattern;
      }

      if (!!obj.textOn) {
        this.data.textOn = obj.textOn;
      }

      return this;
    }
  }, {
    key: "getReplaceText",
    value: function getReplaceText(text, FormattedValue) {
      if (this.data.textReplace === 'content') {
        return FormattedValue;
      }

      if (this.data.textReplace === 'pattern') {
        var regexVal = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.stringToJsRegex(this.data.textPattern);

        if (text.toString().match(regexVal)) {
          return text.toString().replace(regexVal, FormattedValue);
        }

        return text;
      }

      if (this.data.textReplace === 'as') {
        return "".concat(text, " ").concat(FormattedValue);
      }

      if (this.data.textReplace === 'anl') {
        return "".concat(text, "\n").concat(FormattedValue);
      }

      return text;
    }
  }], [{
    key: "getDefaultData",
    value: function getDefaultData() {
      return {
        pattern: '',
        hidden: false,
        textReplace: 'content',
        textPattern: '/.*/',
        textOn: 'wmd'
      };
    }
  }]);

  return TextMap;
}(GFMap);
var LinkMap = function (_GFMap3) {
  _inherits(LinkMap, _GFMap3);

  function LinkMap(pattern, data) {
    var _this5;

    _classCallCheck(this, LinkMap);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(LinkMap).call(this, pattern, data));
    _this5.data = data;
    return _this5;
  }

  _createClass(LinkMap, [{
    key: "getLink",
    value: function getLink() {
      if (this.data.linkParams) {
        return this.data.linkUrl + window.location.search;
      }

      return this.data.linkUrl;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      _get(_getPrototypeOf(LinkMap.prototype), "import", this).call(this, obj);

      if (!!obj.linkUrl) {
        this.data.linkUrl = obj.linkUrl;
      }

      if (!!obj.linkParams) {
        this.data.linkParams = obj.linkParams;
      }

      if (!!obj.linkOn) {
        this.data.linkOn = obj.linkOn;
      }

      return this;
    }
  }, {
    key: "toLinkable",
    value: function toLinkable(level) {
      if (this.data.linkOn === 'a') {
        return true;
      }

      if (this.data.linkOn === 'wc' && level >= 1) {
        return true;
      }

      return false;
    }
  }], [{
    key: "getDefaultData",
    value: function getDefaultData() {
      return {
        pattern: '',
        hidden: false,
        linkUrl: '',
        linkParams: false,
        linkOn: 'a'
      };
    }
  }]);

  return LinkMap;
}(GFMap);
var EventMap = function (_GFMap4) {
  _inherits(EventMap, _GFMap4);

  function EventMap(pattern, data) {
    var _this6;

    _classCallCheck(this, EventMap);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(EventMap).call(this, pattern, data));
    _this6.data = data;
    return _this6;
  }

  _createClass(EventMap, [{
    key: "getPlaceHolder",
    value: function getPlaceHolder() {
      var ph = EventMap.getDefaultPlaceHolder(this.data.style);
      return ph !== undefined ? ph : '';
    }
  }, {
    key: "getTypeahead",
    value: function getTypeahead() {
      var self = this;
      var result = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getFullAvailableVarNames();
      var elt = EventMap.methods.find(function (x) {
        return x.value === self.data.style;
      });

      if (elt !== undefined && elt.typeahead !== undefined) {
        result = result.concat(elt.typeahead.split('|'));
        return result;
      }

      if (this.data.style === 'shape') {
        var shapes = EventMap.getFormNames();
        Array.prototype.push.apply(result, shapes);
      }

      return result;
    }
  }, {
    key: "getValueByDefault",
    value: function getValueByDefault() {
      var vbd = EventMap.getDefaultValue(this.data.style);
      return vbd !== undefined ? vbd : '';
    }
  }, {
    key: "toEventable",
    value: function toEventable(level) {
      return this.data.eventOn === -1 || level === this.data.eventOn;
    }
  }, {
    key: "import",
    value: function _import(obj) {
      _get(_getPrototypeOf(EventMap.prototype), "import", this).call(this, obj);

      if (!!obj.style) {
        this.data.style = obj.style;
      }

      if (!!obj.eventOn) {
        this.data.eventOn = obj.eventOn;
      }

      if (!!obj.value) {
        this.data.value = obj.value;
      }

      return this;
    }
  }], [{
    key: "getDefaultData",
    value: function getDefaultData() {
      return {
        pattern: '',
        hidden: false,
        style: 'shape',
        eventOn: 0,
        value: ''
      };
    }
  }, {
    key: "getFormNames",
    value: function getFormNames() {
      if (EventMap.shapes.length > 0) {
        return EventMap.shapes;
      }

      var shapesText = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.loadFile(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].getVar(globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.VAR_STG_CTXROOT) + globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.CONF_FILE_SHAPESTXT);

      if (shapesText !== undefined) {
        if (EventMap.shapes.length === 0) {
          EventMap.shapes = EventMap.shapes.concat(shapesText.split(/\n/));
          return EventMap.shapes;
        }
      }

      return EventMap.shapes;
    }
  }]);

  return EventMap;
}(GFMap);
EventMap.methods = globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].CONSTANTS.EVENTMETHODS;
EventMap.shapes = [];

var RangeMap = function () {
  function RangeMap(from, to, text, data) {
    _classCallCheck(this, RangeMap);

    this.data = data;
    this.data.from = from;
    this.data.to = to;
    this.data.text = text;
    this.data.hidden = false;
  }

  _createClass(RangeMap, [{
    key: "import",
    value: function _import(obj) {
      this.data.from = !!obj.from ? obj.from : undefined;
      this.data.to = !!obj.to ? obj.to : undefined;
      this.data.text = !!obj.text ? obj.text : undefined;
      this.data.hidden = !!obj.hidden || obj.hidden === false ? obj.hidden : false;
      return this;
    }
  }, {
    key: "match",
    value: function match(value) {
      if (value !== undefined && typeof value === 'string' && value.length > 0 || value !== undefined && typeof value === 'number') {
        var v = Number(value);

        if (this.data.from !== undefined && typeof value === 'string' && this.data.from.length > 0 || this.data.from !== undefined && typeof value === 'number') {
          var from = Number(this.data.from);

          if (v >= from) {
            if (this.data.to !== undefined && typeof this.data.to === 'string' && this.data.to.length > 0 || this.data.from !== undefined && typeof this.data.to === 'number') {
              var to = Number(this.data.to);
              return v < to;
            }

            return true;
          }

          return false;
        }

        if (this.data.to !== undefined && typeof this.data.to === 'string' && this.data.to.length > 0 || this.data.to !== undefined && typeof this.data.to === 'number') {
          var _to = Number(this.data.to);

          return v < _to;
        }

        return true;
      }

      return false;
    }
  }, {
    key: "getFormattedText",
    value: function getFormattedText(value) {
      if (this.match(value)) {
        return this.data.text;
      }

      return value;
    }
  }, {
    key: "show",
    value: function show() {
      this.data.hidden = false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.data.hidden = true;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.data.hidden;
    }
  }, {
    key: "toVisible",
    value: function toVisible() {
      if (this.data.hidden) {
        return false;
      }

      return true;
    }
  }, {
    key: "export",
    value: function _export() {
      return {
        from: this.data.from,
        to: this.data.to,
        text: this.data.text,
        hidden: this.data.hidden
      };
    }
  }], [{
    key: "getDefaultData",
    value: function getDefaultData() {
      return {
        from: undefined,
        to: undefined,
        text: undefined,
        hidden: false
      };
    }
  }]);

  return RangeMap;
}();

var ValueMap = function () {
  function ValueMap(value, text, data) {
    _classCallCheck(this, ValueMap);

    this.data = data;
    this.data.value = value;
    this.data.text = text;
    this.data.hidden = false;
    this["import"](data);
  }

  _createClass(ValueMap, [{
    key: "import",
    value: function _import(obj) {
      this.data.value = obj.value || this.data.value || undefined;
      this.data.text = obj.text || this.data.text || undefined;
      this.data.hidden = obj.hidden || this.data.hidden || false;
      return this;
    }
  }, {
    key: "match",
    value: function match(value) {
      if (value === null || value === undefined) {
        if (this.data.value === 'null') {
          return true;
        }

        return false;
      }

      if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isString(value) && Number(this.data.value) === Number(value)) {
        return true;
      }

      return globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].utils.matchString(value.toString(), this.data.value);
    }
  }, {
    key: "getFormattedText",
    value: function getFormattedText(value) {
      if (value === null || value === undefined) {
        if (this.data.value === 'null' || this.data.value === 'undefined') {
          return !!this.data.text ? this.data.text : '';
        }
      }

      if (this.match(value)) {
        return !!this.data.text ? this.data.text : '';
      }

      return "".concat(value);
    }
  }, {
    key: "show",
    value: function show() {
      this.data.hidden = false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.data.hidden = true;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.data.hidden;
    }
  }, {
    key: "export",
    value: function _export() {
      return {
        value: this.data.value,
        text: this.data.text,
        hidden: this.data.hidden
      };
    }
  }], [{
    key: "getDefaultdata",
    value: function getDefaultdata() {
      return {
        value: undefined,
        text: undefined,
        hidden: false
      };
    }
  }]);

  return ValueMap;
}();

/***/ }),

/***/ "./rulesHandler.ts":
/*!*************************!*\
  !*** ./rulesHandler.ts ***!
  \*************************/
/*! exports provided: RulesHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RulesHandler", function() { return RulesHandler; });
/* harmony import */ var rule_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rule_class */ "./rule_class.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var RulesHandler = function () {
  function RulesHandler(data) {
    _classCallCheck(this, RulesHandler);

    this.activeRuleIndex = 0;
    globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.info('RulesHandler.constructor()');
    this.rules = [];
    this.data = data;
  }

  _createClass(RulesHandler, [{
    key: "import",
    value: function _import(obj) {
      var _this = this;

      globals_class__WEBPACK_IMPORTED_MODULE_2__["$GF"].log.info('RuleHandler.import()');
      this.rules = [];
      var index = 1;

      if (obj !== undefined && obj !== null) {
        var tmpRules;

        if (Array.isArray(obj)) {
          tmpRules = obj;
        } else {
          tmpRules = obj.rulesData;
        }

        if (tmpRules.length > 0 && tmpRules[0].order !== undefined) {
          tmpRules = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.sortBy(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.sortBy(tmpRules, function (o) {
            return o.order;
          }));
        }

        tmpRules.forEach(function (ruleData) {
          _this.addRule('')["import"](ruleData).setOrder(index);

          index += 1;
        });
      }

      return this;
    }
  }, {
    key: "getRules",
    value: function getRules() {
      return this.rules;
    }
  }, {
    key: "getRule",
    value: function getRule(index) {
      return this.rules[index];
    }
  }, {
    key: "addRule",
    value: function addRule(pattern) {
      var data = rule_class__WEBPACK_IMPORTED_MODULE_0__["Rule"].getDefaultData();
      var newRule = new rule_class__WEBPACK_IMPORTED_MODULE_0__["Rule"](pattern, data);
      this.rules.push(newRule);
      this.data.rulesData.push(data);
      newRule.setOrder(this.countRules());
      return newRule;
    }
  }, {
    key: "countRules",
    value: function countRules() {
      if (this.rules !== undefined && Array.isArray(this.rules)) {
        return this.rules.length;
      }

      return 0;
    }
  }, {
    key: "setOrder",
    value: function setOrder() {
      var lg = this.rules.length;

      for (var index = 0; index < lg; index++) {
        var rule = this.rules[index];
        rule.setOrder(index + 1);
      }

      return this;
    }
  }, {
    key: "removeRule",
    value: function removeRule(rule) {
      var index = rule.getOrder() - 1;
      this.rules.splice(index, 1);
      this.data.rulesData.splice(index, 1);
      this.setOrder();
    }
  }, {
    key: "cloneRule",
    value: function cloneRule(rule) {
      var index = rule.getOrder() - 1;
      var data = rule.getData();
      var newData = rule_class__WEBPACK_IMPORTED_MODULE_0__["Rule"].getDefaultData();
      this.reduce();
      var newRule = new rule_class__WEBPACK_IMPORTED_MODULE_0__["Rule"](newData.pattern, newData);
      newRule["import"](data);
      newData.alias = "Copy of ".concat(newData.alias);
      this.rules.splice(index, 0, newRule);
      this.data.rulesData.splice(index, 0, newData);
      newRule.data.reduce = false;
      this.activeRuleIndex = index;
      this.setOrder();
      var elt = document.getElementById(newRule.getId());

      if (elt) {
        setTimeout(function () {
          elt.focus();
        }, 100);
      }

      return newRule;
    }
  }, {
    key: "reduce",
    value: function reduce() {
      this.getRules().forEach(function (rule) {
        rule.data.reduce = true;
      });
      return this;
    }
  }, {
    key: "moveRuleToUp",
    value: function moveRuleToUp(rule) {
      var index = rule.getOrder() - 1;
      var first = 0;
      var rules = this.rules;
      var last = rules.length - 1;

      if (index !== first && last !== first) {
        var curr = rules[index];
        curr.setOrder(index);
        var before = rules[index - 1];
        before.setOrder(index + 1);
        rules[index - 1] = curr;
        rules[index] = before;
      }
    }
  }, {
    key: "moveRuleToDown",
    value: function moveRuleToDown(rule) {
      var index = rule.getOrder() - 1;
      var first = 0;
      var rules = this.rules;
      var last = rules.length - 1;

      if (index !== last && last !== first) {
        var curr = rules[index];
        curr.setOrder(index + 2);
        var after = rules[index + 1];
        after.setOrder(index + 1);
        rules[index + 1] = curr;
        rules[index] = after;
      }
    }
  }], [{
    key: "getDefaultData",
    value: function getDefaultData() {
      return {
        rulesData: []
      };
    }
  }]);

  return RulesHandler;
}();

/***/ }),

/***/ "./state_class.ts":
/*!************************!*\
  !*** ./state_class.ts ***!
  \************************/
/*! exports provided: State, GFState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GFState", function() { return GFState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _rule_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rule_class */ "./rule_class.ts");
/* harmony import */ var _tooltipHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltipHandler */ "./tooltipHandler.ts");
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
function _get2(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get2 = Reflect.get; } else { _get2 = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get2(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var State = function () {
  function State(mxcell, xgraph) {
    _classCallCheck(this, State);

    this.changed = false;
    this.matched = false;
    this.globalLevel = -1;
    this.tooltipHandler = null;
    var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'constructor()');
    this.mxcell = mxcell;
    this.cellId = mxcell.id;
    this.xgraph = xgraph;
    this.shapeState = new ShapeState(xgraph, mxcell);
    this.tooltipState = new TooltipState(xgraph, mxcell);
    this.iconState = new IconState(xgraph, mxcell);
    this.eventState = new EventState(xgraph, mxcell);
    this.textState = new TextState(xgraph, mxcell);
    this.linkState = new LinkState(xgraph, mxcell);
    this.variables = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].createLocalVars();
    this.status = new Map();
    this.tooltipHandler = null;
    this.mxcell.GF_tooltipHandler = null;
    this.originalText = this.xgraph.getLabelCell(mxcell);
    trc.after();
  }

  _createClass(State, [{
    key: "async_applyState",
    value: function async_applyState() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.applyState();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "setState",
    value: function setState(rule, metric) {
      var _this = this;

      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'setState()');

      if (!rule.isHidden() && rule.matchMetric(metric)) {
        var beginPerf = Date.now();
        var shapeMaps = rule.getShapeMaps();
        var textMaps = rule.getTextMaps();
        var linkMaps = rule.getLinkMaps();
        var eventMaps = rule.getEventMaps();
        var value = rule.getValueForMetric(metric);
        var FormattedValue = rule.getFormattedValue(value);
        var level = rule.getThresholdLevel(value);
        var color = rule.data.gradient && rule.data.type === 'number' ? rule.getColorForValue(value) : rule.getColorForLevel(level);
        this.variables.set(globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].CONSTANTS.VAR_STR_RULENAME, rule.data.alias);
        this.variables.set(globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].CONSTANTS.VAR_NUM_VALUE, value);
        this.variables.set(globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].CONSTANTS.VAR_STR_FORMATED, FormattedValue);
        this.variables.set(globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].CONSTANTS.VAR_NUM_LEVEL, level);
        this.variables.set(globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].CONSTANTS.VAR_STR_COLOR, color);
        var cellProp = this.getCellProp(rule.data.shapeProp);
        shapeMaps.forEach(function (shape) {
          var k = shape.data.style;

          if (!shape.isHidden() && shape.match(cellProp, rule.data.shapeRegEx)) {
            var v = color;
            _this.matched = true;
            _this.globalLevel = level > _this.globalLevel ? level : _this.globalLevel;

            if (shape.toColorize(level)) {
              _this.shapeState.set(k, v, level) && _this.status.set(k, v);
            }

            if (rule.toTooltipize(level)) {
              k = 'tooltip';
              v = true;
              _this.tooltipState.set('tooltip', true, level) && _this.status.set(k, v);

              _this.tooltipState.setTooltip(rule, metric, color, FormattedValue);
            }

            if (rule.toIconize(level)) {
              k = 'icon';
              v = true;
              _this.iconState.set('icon', true, level) && _this.status.set(k, v);
            }
          }
        });
        cellProp = this.getCellProp(rule.data.textProp);
        textMaps.forEach(function (text) {
          var k = 'label';

          if (!text.isHidden() && text.match(cellProp, rule.data.textRegEx) && text.toLabelize(level)) {
            if (text.toLabelize(level)) {
              _this.matched = true;
              _this.globalLevel = level > _this.globalLevel ? level : _this.globalLevel;

              var textScoped = _this.variables.replaceText(FormattedValue);

              var v = text.getReplaceText(_this.textState.getMatchValue(k), textScoped);
              _this.textState.set(k, v, level) && _this.status.set(k, v);
            }
          }
        });
        cellProp = this.getCellProp(rule.data.eventProp);
        eventMaps.forEach(function (event) {
          var k = event.data.style;

          if (!event.isHidden() && event.match(cellProp, rule.data.eventRegEx) && event.toEventable(level)) {
            if (event.toEventable(level)) {
              _this.matched = true;
              _this.globalLevel = level > _this.globalLevel ? level : _this.globalLevel;

              var v = _this.variables.eval(event.data.value);

              _this.eventState.set(k, v, level) && _this.status.set(k, v);
            }
          }
        });
        cellProp = this.getCellProp(rule.data.linkProp);
        linkMaps.forEach(function (link) {
          var k = 'link';

          if (!link.isHidden() && link.match(cellProp, rule.data.linkRegEx)) {
            if (link.toLinkable(level)) {
              _this.matched = true;
              _this.globalLevel = level > _this.globalLevel ? level : _this.globalLevel;

              var v = _this.variables.replaceText(link.getLink());

              _this.linkState.set(k, v, level) && _this.status.set(k, v);
            }
          }
        });

        if (level >= rule.highestLevel && this.matched) {
          rule.highestLevel = level;
          rule.highestValue = value;
          rule.highestFormattedValue = FormattedValue;
          rule.highestColor = color;
        }

        var endPerf = Date.now();
        rule.execTimes += endPerf - beginPerf;
      }

      trc.after();
      return this;
    }
  }, {
    key: "unsetState",
    value: function unsetState() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'unsetState()');
      this.eventState.unset();
      this.textState.unset();
      this.linkState.unset();
      this.tooltipState.unset();
      this.iconState.unset();
      this.matched = false;
      trc.after();
      return this;
    }
  }, {
    key: "getCellProp",
    value: function getCellProp(prop) {
      if (prop === 'id') {
        return this.cellId;
      }

      if (prop === 'value') {
        return this.originalText;
      }

      return null;
    }
  }, {
    key: "getLevel",
    value: function getLevel() {
      return this.globalLevel;
    }
  }, {
    key: "getTextLevel",
    value: function getTextLevel() {
      return this.globalLevel === -1 ? '' : this.globalLevel.toString();
    }
  }, {
    key: "getStatus",
    value: function getStatus(key) {
      var style = this.status.get(key);

      if (style !== undefined && style !== null) {
        return style;
      }

      style = this.xgraph.getStyleCell(this.mxcell, key);

      if (style === null) {
        style = '';
      }

      this.status.set(key, style);
      return style;
    }
  }, {
    key: "haveStatus",
    value: function haveStatus(key) {
      return this.status.has(key);
    }
  }, {
    key: "isShape",
    value: function isShape() {
      return this.mxcell.isVertex();
    }
  }, {
    key: "isConnector",
    value: function isConnector() {
      return this.mxcell.isEdge();
    }
  }, {
    key: "applyState",
    value: function applyState() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'applyState()');

      if (this.matched || this.changed) {
        this.changed = true;
        this.shapeState.apply();
        this.tooltipState.apply();
        this.iconState.apply();
        this.textState.apply();
        this.eventState.apply();
        this.linkState.apply();
      }

      trc.after();
      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'reset()');
      this.shapeState.reset();
      this.tooltipState.reset();
      this.iconState.reset();
      this.textState.reset();
      this.eventState.reset();
      this.linkState.reset();
      this.variables.clear();
      this.status.clear();
      this.globalLevel = -1;
      this.changed = false;
      trc.after();
      return this;
    }
  }, {
    key: "prepare",
    value: function prepare() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'prepare()');

      if (this.changed) {
        this.shapeState.prepare();
        this.tooltipState.prepare();
        this.iconState.prepare();
        this.textState.prepare();
        this.eventState.prepare();
        this.linkState.prepare();
        this.variables.clear();
        this.status.clear();
        this.globalLevel = -1;
        this.matched = false;
      }

      trc.after();
      return this;
    }
  }, {
    key: "highlightCell",
    value: function highlightCell() {
      this.xgraph.highlightCell(this.mxcell);
      return this;
    }
  }, {
    key: "unhighlightCell",
    value: function unhighlightCell() {
      this.xgraph.unhighlightCell(this.mxcell);
      return this;
    }
  }]);

  return State;
}();
var GFState = function () {
  function GFState(xgraph, mxcell) {
    _classCallCheck(this, GFState);

    this.keys = [];
    this.matchedKey = new Map();
    this.changedKey = new Map();
    this.originalValue = new Map();
    this.matchValue = new Map();
    this.matchLevel = new Map();
    this.xgraph = xgraph;
    this.mxcell = mxcell;
    this.init_core();
  }

  _createClass(GFState, [{
    key: "init_core",
    value: function init_core() {}
  }, {
    key: "addValue",
    value: function addValue(key, value) {
      if (!this.hasKey(key)) {
        this.keys.push(key);
      }

      this.originalValue.set(key, value);
      this.matchValue.set(key, value);
      this.matchLevel.set(key, GFState.DEFAULTLEVEL);
      this.matchedKey.set(key, false);
      this.changedKey.set(key, false);
      globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.debug('GFState.addValue from ' + this.constructor.name + ' [' + this.mxcell.id + '] KEY=' + key + ' VALUE=' + value);
    }
  }, {
    key: "hasKey",
    value: function hasKey(key) {
      return this.keys.includes(key);
    }
  }, {
    key: "getOriginalValue",
    value: function getOriginalValue(key) {
      if (!this.hasKey(key)) {
        this.originalValue.set(key, this.default_core(key));
      }

      return this.originalValue.get(key);
    }
  }, {
    key: "getMatchValue",
    value: function getMatchValue(key) {
      if (!this.hasKey(key)) {
        this.matchValue.set(key, this.getOriginalValue(key));
      }

      return this.matchValue.get(key);
    }
  }, {
    key: "set",
    value: function set(key, value, level) {
      var matchLevel = this.matchLevel.get(key);

      if (matchLevel === undefined) {
        var defaultValue = this.default_core(key);
        this.addValue(key, defaultValue);
        return this.set(key, value, level);
      }

      if (matchLevel <= level) {
        this.matchLevel.set(key, level);
        this.matchedKey.set(key, true);
        this.matchValue.set(key, value);
        return true;
      }

      return false;
    }
  }, {
    key: "apply",
    value: function apply(key) {
      var _this2 = this;

      if (key !== undefined) {
        if (this.isMatched(key)) {
          globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.debug('GFState.apply from ' + this.constructor.name + ' [' + this.mxcell.id + '] MATCHED KEY=' + key);
          var value = this.getMatchValue(key);

          try {
            this.apply_core(key, value);
          } catch (error) {
            globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.error('Error on reset for key ' + key, error);
          }

          this.changedKey.set(key, true);
          this.matchedKey.set(key, false);
        } else if (this.isChanged(key)) {
          globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.debug('GFState.apply from ' + this.constructor.name + ' [' + this.mxcell.id + '] CHANGED KEY=' + key);
          this.reset(key);
        }
      } else {
        this.keys.forEach(function (key) {
          _this2.apply(key);
        });
      }

      return this;
    }
  }, {
    key: "default_core",
    value: function default_core(key) {
      return null;
    }
  }, {
    key: "apply_core",
    value: function apply_core(key, value) {}
  }, {
    key: "isMatched",
    value: function isMatched(key) {
      var _this3 = this;

      if (key !== undefined) {
        return this.matchedKey.get(key) === true;
      }

      var matched = false;
      this.keys.forEach(function (key) {
        matched = _this3.isMatched(key) || matched;
      });
      return matched;
    }
  }, {
    key: "isChanged",
    value: function isChanged(key) {
      var _this4 = this;

      if (key !== undefined) {
        return this.changedKey.get(key) === true;
      }

      var changed = false;
      this.keys.forEach(function (key) {
        changed = _this4.isChanged(key) ? true : changed;
      });
      return changed;
    }
  }, {
    key: "getLevel",
    value: function getLevel(key) {
      var _this5 = this;

      if (key !== undefined) {
        var _level = this.matchLevel.get(key);

        return _level !== undefined ? _level : GFState.DEFAULTLEVEL;
      }

      var level = GFState.DEFAULTLEVEL;
      this.keys.forEach(function (key) {
        return level = Math.max(_this5.getLevel(key));
      });
      return level;
    }
  }, {
    key: "unset",
    value: function unset(key) {
      var _this6 = this;

      if (key !== undefined) {
        this.matchValue.set(key, this.originalValue.get(key));
        this.matchedKey.set(key, false);
        this.matchLevel.set(key, -1);
      } else {
        this.keys.forEach(function (key) {
          _this6.unset(key);
        });
      }

      return this;
    }
  }, {
    key: "reset",
    value: function reset(key) {
      var _this7 = this;

      if (key !== undefined) {
        globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.debug('GFState.reset from ' + this.constructor.name + ' [' + this.mxcell.id + '] KEY=' + key);
        this.unset(key);
        var value = this.getOriginalValue(key);

        try {
          this.reset_core(key, value);
        } catch (error) {
          globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.error('Error on reset for key ' + key, error);
        }

        this.changedKey.set(key, false);
        this.matchedKey.set(key, false);
      } else {
        this.keys.forEach(function (key) {
          _this7.reset(key);
        });
      }

      return this;
    }
  }, {
    key: "reset_core",
    value: function reset_core(key, value) {}
  }, {
    key: "prepare",
    value: function prepare() {
      if (this.isChanged()) {
        this.unset();
      }

      return this;
    }
  }]);

  return GFState;
}();
GFState.DEFAULTLEVEL = -1;

var EventState = function (_GFState) {
  _inherits(EventState, _GFState);

  function EventState(xgraph, mxcell) {
    var _this8;

    _classCallCheck(this, EventState);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(EventState).call(this, xgraph, mxcell));
    _this8.keys = [];
    _this8.geo = undefined;

    _this8.init_core();

    return _this8;
  }

  _createClass(EventState, [{
    key: "init_core",
    value: function init_core() {
      this.geo = this.xgraph.getSizeCell(this.mxcell);
    }
  }, {
    key: "default_core",
    value: function default_core(key) {
      return this._get(key);
    }
  }, {
    key: "apply_core",
    value: function apply_core(key, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (value === undefined) {
                  value = null;
                }

                this._set(key, value);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "reset_core",
    value: function reset_core(key, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (value === undefined) {
                  value = null;
                }

                this._set(key, value);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "_set",
    value: function _set(key, value) {
      if (value === undefined) {
        value = null;
      }

      var beginValue = undefined;
      var toUnset = this.isChanged(key) && !this.isMatched(key);
      var className = '';
      var newkey = key;

      if (key.startsWith('class_')) {
        newkey = 'class';
        className = key.substring(6);
      }

      switch (newkey) {
        case 'class':
          if (toUnset) {
            this.xgraph.unsetClassCell(this.mxcell, className);
          } else {
            this.xgraph.setClassCell(this.mxcell, className);
          }

          break;

        case 'text':
          value = String(value);
          this.xgraph.setLabelCell(this.mxcell, value);
          break;

        case 'visibility':
          value = String(value);

          if (value === '0') {
            this.xgraph.hideCell(this.mxcell);
          } else if (value === '1') {
            this.xgraph.showCell(this.mxcell);
          }

          break;

        case 'fold':
          value = String(value);

          if (value === '0') {
            this.xgraph.collapseCell(this.mxcell);
          } else if (value === '1') {
            this.xgraph.expandCell(this.mxcell);
          }

          break;

        case 'height':
          if (this.geo !== undefined) {
            var height = Number(value);

            if (this.isMatched('height')) {
              var width = this.isMatched('width') ? Number(this.getMatchValue('width')) : undefined;
              this.xgraph.changeSizeCell(this.mxcell, width, height, this.geo);
              this.unset('width');
            } else {
              if (!this.isMatched('width')) {
                this.xgraph.resetSizeCell(this.mxcell, this.geo);
                this.unset('width');
              }
            }
          }

          break;

        case 'width':
          if (this.geo !== undefined) {
            var _width = Number(value);

            if (this.isMatched('width')) {
              var _height = this.isMatched('height') ? Number(this.getMatchValue('height')) : undefined;

              this.xgraph.changeSizeCell(this.mxcell, _width, _height, this.geo);
              this.unset('width');
            } else {
              if (!this.isMatched('height')) {
                this.xgraph.resetSizeCell(this.mxcell, this.geo);
                this.unset('height');
              }
            }
          }

          break;

        case 'size':
          if (this.geo !== undefined) {
            var percent = Number(value);
            this.xgraph.resizeCell(this.mxcell, percent, this.geo);
          }

          break;

        case 'barPos':
        case 'fontSize':
        case 'opacity':
        case 'textOpacity':
        case 'rotation':
          beginValue = this._get(key);
          beginValue = beginValue === undefined ? _rule_class__WEBPACK_IMPORTED_MODULE_1__["EventMap"].getDefaultValue(key) : beginValue;
          this.xgraph.setStyleAnimCell(this.mxcell, key, value, beginValue);
          break;

        case 'blink':
          if (!!value) {
            this.xgraph.blinkCell(this.mxcell, value);
          } else {
            this.xgraph.unblinkCell(this.mxcell);
          }

          break;

        default:
          this.xgraph.setStyleCell(this.mxcell, key, value);
          break;
      }
    }
  }, {
    key: "_get",
    value: function _get(key) {
      switch (key) {
        case 'text':
          return this.xgraph.getLabelCell(this.mxcell);
          break;

        case 'visibility':
          return this.xgraph.isVisibleCell(this.mxcell) === false ? '0' : '1';
          break;

        case 'height':
          return this.geo !== undefined ? this.geo.height : undefined;
          break;

        case 'width':
          return this.geo !== undefined ? this.geo.width : undefined;
          break;

        case 'size':
          return 100;
          break;

        case 'fold':
          return this.xgraph.isCollapsedCell(this.mxcell) === true ? '0' : '1';
          break;

        case 'blink':
          return this.xgraph.geBlinkMxCell(this.mxcell);
          break;

        default:
          return this.xgraph.getStyleCell(this.mxcell, key);
          break;
      }
    }
  }]);

  return EventState;
}(GFState);

var TextState = function (_GFState2) {
  _inherits(TextState, _GFState2);

  function TextState(xgraph, mxcell) {
    var _this9;

    _classCallCheck(this, TextState);

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(TextState).call(this, xgraph, mxcell));
    _this9.keys = [];

    _this9.init_core();

    return _this9;
  }

  _createClass(TextState, [{
    key: "init_core",
    value: function init_core() {}
  }, {
    key: "default_core",
    value: function default_core(key) {
      return this.xgraph.getLabelCell(this.mxcell);
    }
  }, {
    key: "apply_core",
    value: function apply_core(key, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.xgraph.setLabelCell(this.mxcell, value);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    }
  }, {
    key: "reset_core",
    value: function reset_core(key, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.xgraph.setLabelCell(this.mxcell, value);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    }
  }]);

  return TextState;
}(GFState);

var LinkState = function (_GFState3) {
  _inherits(LinkState, _GFState3);

  function LinkState(xgraph, mxcell) {
    var _this10;

    _classCallCheck(this, LinkState);

    _this10 = _possibleConstructorReturn(this, _getPrototypeOf(LinkState).call(this, xgraph, mxcell));
    _this10.keys = [];

    _this10.init_core();

    return _this10;
  }

  _createClass(LinkState, [{
    key: "init_core",
    value: function init_core() {}
  }, {
    key: "default_core",
    value: function default_core(key) {
      return this.xgraph.getLink(this.mxcell);
    }
  }, {
    key: "apply_core",
    value: function apply_core(key, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.xgraph.addLink(this.mxcell, value);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
    }
  }, {
    key: "reset_core",
    value: function reset_core(key, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (value === undefined || value === null || value.length === 0) {
                  this.xgraph.removeLink(this.mxcell);
                } else {
                  this.xgraph.addLink(this.mxcell, value);
                }

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
    }
  }]);

  return LinkState;
}(GFState);

var ShapeState = function (_GFState4) {
  _inherits(ShapeState, _GFState4);

  function ShapeState(xgraph, mxcell) {
    var _this11;

    _classCallCheck(this, ShapeState);

    _this11 = _possibleConstructorReturn(this, _getPrototypeOf(ShapeState).call(this, xgraph, mxcell));
    _this11.keys = [];

    _this11.init_core();

    return _this11;
  }

  _createClass(ShapeState, [{
    key: "init_core",
    value: function init_core() {
      globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.info('ShapeState [' + this.mxcell.id + ']');
      this.mxcell.GF_tooltipHandler = null;
    }
  }, {
    key: "default_core",
    value: function default_core(key) {
      return this.xgraph.getStyleCell(this.mxcell, key);
    }
  }, {
    key: "apply_core",
    value: function apply_core(key, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (value === undefined) {
                  value = null;
                }

                this.xgraph.setColorAnimCell(this.mxcell, key, value);

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
    }
  }, {
    key: "reset_core",
    value: function reset_core(key, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (value === undefined) {
                  value = null;
                }

                this.xgraph.setColorAnimCell(this.mxcell, key, value);

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
    }
  }]);

  return ShapeState;
}(GFState);

var TooltipState = function (_GFState5) {
  _inherits(TooltipState, _GFState5);

  function TooltipState(xgraph, mxcell) {
    var _this12;

    _classCallCheck(this, TooltipState);

    _this12 = _possibleConstructorReturn(this, _getPrototypeOf(TooltipState).call(this, xgraph, mxcell));
    _this12.keys = ['tooltip'];

    _this12.init_core();

    return _this12;
  }

  _createClass(TooltipState, [{
    key: "init_core",
    value: function init_core() {
      this.addValue('tooltip', false);
      this.tooltipHandler = undefined;
      this.mxcell.GF_tooltipHandler = null;
    }
  }, {
    key: "setTooltip",
    value: function setTooltip(rule, metric, color, value) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee10() {
        var tpColor, label, metricToolip, graph;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                tpColor = null;
                label = rule.data.tooltipLabel;

                if (this.tooltipHandler === null || this.tooltipHandler === undefined) {
                  this.tooltipHandler = new _tooltipHandler__WEBPACK_IMPORTED_MODULE_2__["TooltipHandler"](this.mxcell);
                }

                if (label === null || label.length === 0) {
                  if (rule.data.metricType === 'serie') {
                    label = metric.getName();
                  }

                  if (rule.data.metricType === 'table') {
                    label = rule.data.column;
                  }
                }

                if (rule.data.tooltipColors) {
                  tpColor = color;
                }

                metricToolip = this.tooltipHandler.addMetric().setLabel(label).setValue(value).setColor(tpColor).setDirection(rule.data.tpDirection);

                if (rule.data.tpGraph) {
                  graph = metricToolip.addGraph(rule.data.tpGraphType);
                  graph.setColor(tpColor).setColumn(rule.data.column).setMetric(metric).setSize(rule.data.tpGraphSize).setScaling(rule.data.tpGraphLow, rule.data.tpGraphHigh).setScale(rule.data.tpGraphScale);
                }

                this.tooltipHandler.updateDate();

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
    }
  }, {
    key: "apply",
    value: function apply(key) {
      var _this13 = this;

      if (key !== undefined && key === 'tooltip') {
        if (this.isMatched(key) && this.getMatchValue(key) === true) {
          if (this.tooltipHandler != null && this.tooltipHandler.isChecked()) {
            this.mxcell.GF_tooltipHandler = this.tooltipHandler;
          }

          _get2(_getPrototypeOf(TooltipState.prototype), "apply", this).call(this, key);
        }
      } else {
        this.keys.forEach(function (key) {
          _this13.apply(key);
        });
      }

      return this;
    }
  }, {
    key: "prepare",
    value: function prepare() {
      _get2(_getPrototypeOf(TooltipState.prototype), "prepare", this).call(this);

      this.reset();
      return this;
    }
  }, {
    key: "reset",
    value: function reset(key) {
      var _this14 = this;

      if (key !== undefined && key === 'tooltip') {
        this.mxcell.GF_tooltipHandler = null;

        if (this.tooltipHandler) {
          this.tooltipHandler.destroy();
        }

        this.tooltipHandler = undefined;

        _get2(_getPrototypeOf(TooltipState.prototype), "reset", this).call(this, key);
      } else {
        this.keys.forEach(function (key) {
          _this14.reset(key);
        });
      }

      return this;
    }
  }]);

  return TooltipState;
}(GFState);

var IconState = function (_GFState6) {
  _inherits(IconState, _GFState6);

  function IconState(xgraph, mxcell) {
    var _this15;

    _classCallCheck(this, IconState);

    _this15 = _possibleConstructorReturn(this, _getPrototypeOf(IconState).call(this, xgraph, mxcell));
    _this15.keys = [];

    _this15.init();

    return _this15;
  }

  _createClass(IconState, [{
    key: "init",
    value: function init() {}
  }, {
    key: "default_core",
    value: function default_core(key) {
      return false;
    }
  }, {
    key: "apply_core",
    value: function apply_core(key) {
      var _this16 = this;

      if (key !== undefined && key === 'icon') {
        if (this.isMatched(key) && this.getMatchValue(key) === true) {
          if (!this.isChanged(key)) {
            this.xgraph.addOverlay("WARNING/ERROR", this.mxcell);
          }
        } else if (this.isChanged(key)) {
          this.reset_core(key);
        }
      } else {
        this.keys.forEach(function (key) {
          _this16.apply_core(key);
        });
      }

      return this;
    }
  }, {
    key: "reset_core",
    value: function reset_core(key) {
      var _this17 = this;

      if (key !== undefined && key === 'icon') {
        this.xgraph.removeOverlay(this.mxcell);
      } else {
        this.keys.forEach(function (key) {
          _this17.reset_core(key);
        });
      }

      return this;
    }
  }]);

  return IconState;
}(GFState);

/***/ }),

/***/ "./statesHandler.ts":
/*!**************************!*\
  !*** ./statesHandler.ts ***!
  \**************************/
/*! exports provided: StateHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateHandler", function() { return StateHandler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _state_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state_class */ "./state_class.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var StateHandler = function () {
  function StateHandler(xgraph) {
    _classCallCheck(this, StateHandler);

    this.edited = false;
    this.states = new Map();
    this.xgraph = xgraph;
    this.initStates(this.xgraph);
  }

  _createClass(StateHandler, [{
    key: "initStates",
    value: function initStates(xgraph) {
      var _this = this;

      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'initStates()');
      this.xgraph = xgraph;
      this.states.clear();
      var mxcells = xgraph.getMxCells();

      lodash__WEBPACK_IMPORTED_MODULE_2___default.a.each(mxcells, function (mxcell) {
        _this.addState(mxcell);
      });

      trc.after();
      return this;
    }
  }, {
    key: "getStatesForRule",
    value: function getStatesForRule(rule) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'getStatesForRule()');
      var result = new Map();
      var name;
      var xgraph = this.xgraph;
      this.states.forEach(function (state) {
        var mxcell = state.mxcell;
        var id = mxcell.id;
        var found = false;
        name = xgraph.getValuePropOfMxCell(rule.data.shapeProp, mxcell);

        if (name !== null && rule.matchShape(name)) {
          result.set(id, state);
          found = true;
        }

        if (!found) {
          name = xgraph.getValuePropOfMxCell(rule.data.textProp, mxcell);

          if (rule.matchText(name)) {
            result.set(id, state);
            found = true;
          }
        }

        if (!found) {
          name = xgraph.getValuePropOfMxCell(rule.data.linkProp, mxcell);

          if (rule.matchLink(name)) {
            result.set(id, state);
            found = true;
          }
        }

        if (!found) {
          name = xgraph.getValuePropOfMxCell(rule.data.eventProp, mxcell);

          if (rule.matchEvent(name)) {
            result.set(id, state);
            found = true;
          }
        }
      });
      trc.after();
      return result;
    }
  }, {
    key: "updateStates",
    value: function updateStates(rules) {
      var _this2 = this;

      globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].log.info('StateHandler.updateStates()');
      rules.forEach(function (rule) {
        rule.states = _this2.getStatesForRule(rule);
      });
    }
  }, {
    key: "getStates",
    value: function getStates() {
      return this.states;
    }
  }, {
    key: "getStatesForInspect",
    value: function getStatesForInspect() {
      var states = [];
      this.states.forEach(function (state) {
        states.push(state);
      });
      return states;
    }
  }, {
    key: "getState",
    value: function getState(cellId) {
      return this.states.get(cellId);
    }
  }, {
    key: "addState",
    value: function addState(mxcell) {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'addState()');
      var state = new _state_class__WEBPACK_IMPORTED_MODULE_1__["State"](mxcell, this.xgraph);
      this.states.set(mxcell.id, state);

      if (globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].DEBUG) {
        globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].setVar("STATE_".concat(state.cellId), state);
      }

      trc.after();
      return state;
    }
  }, {
    key: "countStates",
    value: function countStates() {
      return this.states.size;
    }
  }, {
    key: "prepare",
    value: function prepare() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'prepare()');
      this.states.forEach(function (state) {
        state.prepare();
      });
      trc.after();
      return this;
    }
  }, {
    key: "setStates",
    value: function setStates(rules, metrics) {
      var _this3 = this;

      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'setStates()');
      this.prepare();
      rules.forEach(function (rule) {
        rule.highestLevel = -1;
        rule.highestFormattedValue = '';
        rule.highestColor = '';
        rule.highestValue = '';
        rule.execTimes = 0;

        if (rule.states === undefined || rule.states.size === 0) {
          rule.states = _this3.getStatesForRule(rule);
        }

        rule.states.forEach(function (state) {
          metrics.forEach(function (metric) {
            state.setState(rule, metric);
          });
        });
      });
      trc.after();
      return this;
    }
  }, {
    key: "applyStates",
    value: function applyStates() {
      var trc = globals_class__WEBPACK_IMPORTED_MODULE_3__["$GF"].trace.before(this.constructor.name + '.' + 'applyStates()');
      this.states.forEach(function (state) {
        state.async_applyState();
      });
      trc.after();
      return this;
    }
  }, {
    key: "async_applyStates",
    value: function async_applyStates() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.applyStates();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }]);

  return StateHandler;
}();

/***/ }),

/***/ "./tooltipHandler.ts":
/*!***************************!*\
  !*** ./tooltipHandler.ts ***!
  \***************************/
/*! exports provided: TooltipHandler, MetricTooltip, GraphTooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipHandler", function() { return TooltipHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricTooltip", function() { return MetricTooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphTooltip", function() { return GraphTooltip; });
/* harmony import */ var chartist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chartist */ "../node_modules/chartist/dist/chartist.js");
/* harmony import */ var chartist__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chartist__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var globals_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! globals_class */ "./globals_class.ts");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var TooltipHandler = function () {
  function TooltipHandler(mxcell) {
    _classCallCheck(this, TooltipHandler);

    this.timeFormat = 'YYYY-MM-DD HH:mm:ss';
    this.checked = false;
    this.div = null;
    this.mxcell = mxcell;
    this.checked = false;
    this.metrics = new Set();
  }

  _createClass(TooltipHandler, [{
    key: "isChecked",
    value: function isChecked() {
      return this.checked;
    }
  }, {
    key: "addMetric",
    value: function addMetric() {
      this.checked = true;
      var metric = new MetricTooltip();
      this.metrics.add(metric);
      return metric;
    }
  }, {
    key: "updateDate",
    value: function updateDate() {
      var currentDateTime = new Date();
      this.lastChange = currentDateTime.getFullYear() + '-' + (currentDateTime.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) + '-' + currentDateTime.getDate().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) + ' ' + currentDateTime.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) + ':' + currentDateTime.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) + ':' + currentDateTime.getSeconds().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.metrics.clear();

      if (this.mxcell.GF_tooltipHandler) {
        delete this.mxcell.GF_tooltipHandler;
      }
    }
  }, {
    key: "getDiv",
    value: function getDiv(parentDiv) {
      if (this.div !== null && this.div !== undefined) {
        if (parentDiv && this.div) {
          parentDiv.appendChild(this.div);
        }

        return this.div;
      }

      if (!this.checked) {
        return null;
      }

      var div = document.createElement('div');

      if (parentDiv !== undefined) {
        parentDiv.appendChild(div);
      }

      if (this.metrics.size > 0) {
        this.getDateDiv(div);
        this.metrics.forEach(function (metric) {
          metric.getDiv(div);
        });
      }

      this.div = div;
      return div;
    }
  }, {
    key: "getDateDiv",
    value: function getDateDiv(parentDiv) {
      var div = document.createElement('div');
      div.id = this.mxcell.mxObjectId + '_DATE';

      if (parentDiv !== undefined) {
        parentDiv.appendChild(div);
      }

      div.className = 'graph-tooltip-time tooltip-date';
      div.innerHTML = "".concat(this.lastChange);
      return div;
    }
  }]);

  return TooltipHandler;
}();
var MetricTooltip = function () {
  function MetricTooltip() {
    _classCallCheck(this, MetricTooltip);

    this.direction = 'v';
    this.color = '#8c8980';
    this.graphs = new Set();
    this.label = '';
    this.value = '';
  }

  _createClass(MetricTooltip, [{
    key: "setLabel",
    value: function setLabel(label) {
      this.label = label;
      return this;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.value = value;
      return this;
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      if (color !== null) {
        this.color = color;
      }

      return this;
    }
  }, {
    key: "setDirection",
    value: function setDirection(direction) {
      this.direction = direction;
      return this;
    }
  }, {
    key: "getDiv",
    value: function getDiv(parentDiv) {
      var div = document.createElement('div');
      div.className = 'tooltip-metric';

      if (this.direction === 'h') {
        div.style.display = 'inline-block';
      }

      if (parentDiv !== undefined) {
        parentDiv.appendChild(div);
      }

      this.div = div;
      this.getTextDiv(div);
      this.getGraphsDiv(div);
      return div;
    }
  }, {
    key: "getTextDiv",
    value: function getTextDiv(parentDiv) {
      var div = document.createElement('div');
      div.className = 'tooltip-text';
      var str = '';

      if (parentDiv !== undefined) {
        parentDiv.appendChild(div);
      }

      if (this.label !== undefined) {
        str += "".concat(this.label, " : ");
        str += "<span style=\"color:".concat(this.color, "\"><b>").concat(this.value, "</b></span>");
      }

      div.innerHTML = str;
      return div;
    }
  }, {
    key: "getGraphsDiv",
    value: function getGraphsDiv(parentDiv) {
      var div = document.createElement('div');

      if (parentDiv !== undefined) {
        parentDiv.appendChild(div);
      }

      if (this.graphs.size > 0) {
        this.graphs.forEach(function (graph) {
          graph.getDiv(div);
        });
      }

      return div;
    }
  }, {
    key: "addGraph",
    value: function addGraph(type) {
      var graph;

      switch (type) {
        case 'line':
          graph = new LineGraphTooltip();
          break;

        case 'bar':
          graph = new BarGraphTooltip();
          break;

        default:
          globals_class__WEBPACK_IMPORTED_MODULE_1__["$GF"].log.error('Graph type unknow', type);
          graph = new BarGraphTooltip();
          break;
      }

      this.graphs.add(graph);
      return graph;
    }
  }]);

  return MetricTooltip;
}();
var GraphTooltip = function () {
  function GraphTooltip() {
    _classCallCheck(this, GraphTooltip);

    this.color = '#8c8980';
    this.type = 'line';
    this.data = {
      series: [{
        data: [{
          x: 0,
          y: 0
        }]
      }]
    };
    this.size = '100%';
    this.low = null;
    this.high = null;
    this.scaleType = 'linear';
  }

  _createClass(GraphTooltip, [{
    key: "getDiv",
    value: function getDiv(div) {
      return this.div;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.name = name;
      return this;
    }
  }, {
    key: "setColumn",
    value: function setColumn(column) {
      this.column = column;
      return this;
    }
  }, {
    key: "setType",
    value: function setType(type) {
      this.type = type;
      return this;
    }
  }, {
    key: "setSize",
    value: function setSize(size) {
      this.size = size;
      return this;
    }
  }, {
    key: "setMetric",
    value: function setMetric(metric) {
      this.metric = metric;
      return this;
    }
  }, {
    key: "setScaling",
    value: function setScaling(low, high) {
      this.low = low;
      this.high = high;
      return this;
    }
  }, {
    key: "setScale",
    value: function setScale(type) {
      this.scaleType = type;
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      if (color !== null) {
        this.color = color;
      }

      return this;
    }
  }, {
    key: "setParentDiv",
    value: function setParentDiv(div) {
      this.parentDiv = div;
      return this;
    }
  }, {
    key: "getChart",
    value: function getChart() {
      return this.chart;
    }
  }]);

  return GraphTooltip;
}();

var LineGraphTooltip = function (_GraphTooltip) {
  _inherits(LineGraphTooltip, _GraphTooltip);

  function LineGraphTooltip() {
    var _this;

    _classCallCheck(this, LineGraphTooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LineGraphTooltip).call(this));
    _this.type = 'line';
    _this.chartistOptions = {
      showPoint: false,
      showLine: true,
      showArea: true,
      fullWidth: true,
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      chartPadding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    };
    return _this;
  }

  _createClass(LineGraphTooltip, [{
    key: "getDiv",
    value: function getDiv(parentDiv) {
      if (this.metric) {
        var log = this.scaleType === 'log' ? true : false;
        this.data.series[0]['data'] = this.metric.getData(this.column, log);
      }

      var div = document.createElement('div');
      var color = this.color;
      this.div = div;

      if (parentDiv !== undefined) {
        parentDiv.appendChild(div);
      }

      div.className = 'ct-chart ct-golden-section';

      if (this.size !== null) {
        div.style.width = this.size;
      }

      if (this.low !== null) {
        this.chartistOptions.low = this.low;
      }

      if (this.high !== null) {
        this.chartistOptions.high = this.high;
      }

      this.chart = new chartist__WEBPACK_IMPORTED_MODULE_0___default.a.Line(div, this.data, this.chartistOptions);
      this.chart.on('draw', function (data) {
        if (data.type === 'line' || data.type === 'area') {
          if (data.type === 'line') {
            data.element.attr({
              style: "stroke: ".concat(color)
            });
          }

          if (data.type === 'area') {
            data.element.attr({
              style: "fill: ".concat(color)
            });
          }

          data.element.animate({
            d: {
              begin: 1000 * data.index,
              dur: 1000,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: chartist__WEBPACK_IMPORTED_MODULE_0___default.a.Svg.Easing.easeOutQuint
            }
          });
        }
      });
      return div;
    }
  }]);

  return LineGraphTooltip;
}(GraphTooltip);

var BarGraphTooltip = function (_GraphTooltip2) {
  _inherits(BarGraphTooltip, _GraphTooltip2);

  function BarGraphTooltip() {
    var _this2;

    _classCallCheck(this, BarGraphTooltip);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(BarGraphTooltip).call(this));
    _this2.type = 'bar';
    _this2.chartistOptions = {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      chartPadding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    };
    return _this2;
  }

  _createClass(BarGraphTooltip, [{
    key: "getDiv",
    value: function getDiv(parentDiv) {
      if (this.metric) {
        var log = this.scaleType === 'log' ? true : false;
        this.data.series[0]['data'] = this.metric.getData(this.column, log);
      }

      var div = document.createElement('div');
      var color = this.color;
      this.div = div;

      if (parentDiv !== undefined) {
        parentDiv.appendChild(div);
      }

      div.className = 'ct-chart ct-golden-section';

      if (this.size !== null) {
        div.style.width = this.size;
      }

      if (this.low !== null) {
        this.chartistOptions.low = this.low;
      }

      if (this.high !== null) {
        this.chartistOptions.high = this.high;
      }

      this.chart = new chartist__WEBPACK_IMPORTED_MODULE_0___default.a.Bar(div, this.data, this.chartistOptions);
      var seq = 0;
      var length = this.data.series[0]['data'].length;
      var delays = Math.round(50 / (length / 10));
      var durations = Math.round(250 / (length / 10));
      this.chart.on('draw', function (data) {
        if (data.type === 'bar') {
          data.element.attr({
            style: "stroke: ".concat(color)
          });
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
        }
      });
      return div;
    }
  }]);

  return BarGraphTooltip;
}(GraphTooltip);

/***/ }),

/***/ "./utils_raw.js":
/*!**********************!*\
  !*** ./utils_raw.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pako = __webpack_require__(/*! pako */ "../node_modules/pako/index.js");

var vkbeautify = __webpack_require__(/*! vkbeautify */ "../node_modules/vkbeautify/index.js");

var safeEval = __webpack_require__(/*! safe-eval */ "../node_modules/safe-eval/index.js");

module.exports = {
  stringToBytes: function stringToBytes(str) {
    var arr = new Array(str.length);

    for (var i = 0; i < str.length; i += 1) {
      arr[i] = str.charCodeAt(i);
    }

    return arr;
  },
  bytesToString: function bytesToString(arr) {
    var str = '';

    for (var i = 0; i < arr.length; i += 1) {
      str += String.fromCharCode(arr[i]);
    }

    return str;
  },
  encode: function encode(data, _encode, deflate, base64) {
    var result = data;

    if (_encode) {
      try {
        result = encodeURIComponent(result);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (deflate && result.length > 0) {
      try {
        result = this.bytesToString(pako.deflateRaw(result));
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (base64) {
      try {
        result = btoa(result);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    return result;
  },
  removeLinebreaks: function removeLinebreaks(data) {
    return data.replace(/(\r\n|\n|\r)/gm, '');
  },
  isencoded: function isencoded(data) {
    try {
      var node = this.parseXml(data).documentElement;

      if (node != null && node.nodeName === 'mxfile') {
        var diagrams = node.getElementsByTagName('diagram');

        if (diagrams.length > 0) {
          return true;
        }
      } else {
        return data.indexOf('mxGraphModel') === -1;
      }
    } catch (error) {
      return true;
    }

    return false;
  },
  decode: function decode(data, encode, deflate, base64) {
    try {
      var node = this.parseXml(data).documentElement;

      if (node != null && node.nodeName === 'mxfile') {
        var diagrams = node.getElementsByTagName('diagram');

        if (diagrams.length > 0) {
          data = this.getTextContent(diagrams[0]);
        }
      }
    } catch (e) {}

    if (base64) {
      data = atob(data);
    }

    if (deflate && data.length > 0) {
      data = this.bytesToString(pako.inflateRaw(data));
    }

    if (encode) {
      data = decodeURIComponent(data);
    }

    return data;
  },
  parseXml: function parseXml(xml) {
    if (window.DOMParser) {
      var parser = new DOMParser();
      return parser.parseFromString(xml, 'text/xml');
    }

    var result = this.createXmlDocument();
    result.async = 'false';
    result.loadXML(xml);
    return result;
  },
  createXmlDocument: function createXmlDocument() {
    var doc = null;

    if (document.implementation && document.implementation.createDocument) {
      doc = document.implementation.createDocument('', '', null);
    } else if (window.ActiveXObject) {
      doc = new ActiveXObject('Microsoft.XMLDOM');
    }

    return doc;
  },
  decodeFromUri: function decodeFromUri(data) {
    try {
      data = decodeURIComponent(data);
    } catch (e) {
      console.error(e);
      return;
    }

    return data;
  },
  getTextContent: function getTextContent(node) {
    return node != null ? node[node.textContent === undefined ? 'text' : 'textContent'] : '';
  },
  normalizeXml: function normalizeXml(data) {
    try {
      var str = data;
      str = str.replace(/>\s*/g, '>');
      str = str.replace(/\s*</g, '<');
      return data;
    } catch (e) {
      return;
    }
  },
  sleep: function sleep(ms, mess) {
    var delay;
    return regeneratorRuntime.async(function sleep$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            delay = function _ref(ms) {
              return new Promise(function (resolve) {
                return setTimeout(resolve, ms);
              });
            };

            _context.next = 3;
            return regeneratorRuntime.awrap(delay(ms));

          case 3:
            if (mess) {
              console.log(mess);
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  uniqueID: function uniqueID() {
    function chr4() {
      return Math.random().toString(16).slice(-4);
    }

    return "".concat(chr4() + chr4(), "-").concat(chr4(), "-").concat(chr4(), "-").concat(chr4(), "-").concat(chr4()).concat(chr4()).concat(chr4());
  },
  stringToJsRegex: function stringToJsRegex(str) {
    if (str[0] !== '/') {
      return new RegExp("^".concat(str, "$"));
    }

    var match = str.match(new RegExp('^/(.*?)/(g?i?m?y?)$'));
    return new RegExp(match[1], match[2]);
  },
  matchString: function matchString(str, pattern) {
    var regex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (str === null || str === undefined || pattern === null || pattern === undefined || str.length === 0 || pattern.length === 0) {
      return false;
    }

    if (str === pattern) {
      return true;
    }

    if (regex) {
      var _regex = this.stringToJsRegex(pattern);

      return str.toString().match(_regex);
    }

    return false;
  },
  minify: function minify(text) {
    try {
      return vkbeautify.xmlmin(text, false);
    } catch (error) {
      this.log(3, 'Error in minify', error);
      return text;
    }
  },
  prettify: function prettify(text) {
    try {
      return vkbeautify.xml(text);
    } catch (error) {
      this.log(3, 'Error in prettify', error);
      return text;
    }
  },
  prettifyJSON: function prettifyJSON(text) {
    try {
      return vkbeautify.json(text);
    } catch (error) {
      this.log(3, 'Error in prettify', error);
      return text;
    }
  },
  addScript: function addScript(src) {
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', src);
    var r = false;
    var t = document.getElementsByTagName('script')[0];

    if (t != null) {
      t.parentNode.insertBefore(s, t);
    }
  },
  loadJS: function loadJS(fname) {
    try {
      var code = this.loadFile(fname);

      if (code) {
        this.evalRaw(code);
      }
    } catch (e) {
      if (window.console != null) {
        console.error('LoadJS failed:', fname, e);
      }
    }
  },
  loadFile: function loadFile(fname) {
    try {
      var req = mxUtils.load(fname);

      if (req != null && req.getStatus() >= 200 && req.getStatus() <= 299) {
        return req.getText();
      }
    } catch (e) {
      if (window.console != null) {
        console.error('Error loadFile:', fname, e);
      }
    }
  },
  $loadFile: function $loadFile(fname) {
    var result;
    $.ajax({
      type: 'GET',
      url: fname,
      async: false,
      success: function success(data) {
        result = data;
      },
      error: function error(_error) {
        console.log('Error when download ' + fname), _error;
      }
    });
    return result;
  },
  $evalFile: function $evalFile(fname) {
    var result;
    $.ajax({
      type: 'GET',
      url: fname,
      async: false,
      success: function success(data) {
        eval.call(window, data);
      },
      error: function error(_error2) {
        console.log('Error when download/eval ' + fname), _error2;
      }
    });
  },
  evalRaw: function evalRaw(code) {
    try {
      eval.call(window, code);
    } catch (e) {
      if (window.console != null) {
        console.error('Error eval.call : ', e);
      }
    }
  },
  evalIt: function evalIt(code) {
    var result = code;

    try {
      result = safeEval(code);
    } catch (error) {
      result = code;
    }

    return result;
  },
  getfileContent: function (_getfileContent) {
    function getfileContent(_x) {
      return _getfileContent.apply(this, arguments);
    }

    getfileContent.toString = function () {
      return _getfileContent.toString();
    };

    return getfileContent;
  }(function (url) {
    var result;

    var request = function request() {
      var response, result;
      return regeneratorRuntime.async(function request$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(fetch(url));

            case 2:
              response = _context2.sent;
              _context2.next = 5;
              return regeneratorRuntime.awrap(response.text());

            case 5:
              result = _context2.sent;
              console.log(getfileContent, url, result);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    };

    request();
    return result;
  })
};

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "grafana/app/core/app_events":
/*!**************************************!*\
  !*** external "app/core/app_events" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__;

/***/ }),

/***/ "grafana/app/core/time_series2":
/*!****************************************!*\
  !*** external "app/core/time_series2" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_time_series2__;

/***/ }),

/***/ "grafana/app/core/utils/kbn":
/*!*************************************!*\
  !*** external "app/core/utils/kbn" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map