export default class State  {
    /** @ngInject */
    constructor(pattern) {
        this.pattern = pattern;
        this.level = -1;
        this.value = '-';
        this.hidden = false;
        // shapeColors : { style (mxgraph), color, level } 
        shapeColors = [];
        // textValues : { formattedValue, isPattern, textPattern, level }
        textValues = [];
        // linkUrls :  { url, mode : tab or curr window, level }
        linkUrls = [];
    }
    
    // set Color and level if higher
    setColorShape (value, rule, color, level) {
      let shapeColor = _.find(this.shapeColors, function (shape) { 
        return rule.colorMode === shape.style;
      });
      if (shapeColor != undefined && shapeColor != null )  {
        if (shapeColor.level <= level) {
          shapeColor.level = level;
          shape.Color.color =  color;
        }
        // else ignore
      }
      else {
        this.shapeColors.push({ 'style' : rule.colorMode, 'color' : color, 'level': level})
      }
    }

     getColorShape (style) {
      let shapeColor = _.find(this.shapeColors, function (shape) { 
        return style = shape.style;
      });
      if (shapeColor != undefined && shapeColor != null ) return null;
      else return shapeColor.color;
    }

    setTextValue (value, rule, level) {
      let formattedValue = this.getFormattedValue(value, rule);
      let textValue = _.find(this.textValues, function(text) {
        text.level === level
      });
      if (textValue != undefined && textValue != null) {
        if (textValue.level >= level) {
          textValue
        }
      }
    }

    getText() {}

    setLink(value, rule, level) {}

    getLink() {}
    setValue(value,level) {
      if(level >= this.level) {
        this.level = level;
        this.value = value; 
      }
    }

    getValue() {
      return this.value;
    }

    setFormattedValue(value,rule,level) {

    }

    getFormattedValue (rule) {

    }

    getFormattedValue(value, style) {
        // console.log("getFormattedValue style", style)
        if (style.type === "number") {
          if (!_.isFinite(value)) return "Invalid Number";
          if (value === null || value === void 0) {
            return "-";
          }
          let decimals = this.decimalPlaces(value);
          decimals =
            typeof style.decimals === "number"
              ? Math.min(style.decimals, decimals)
              : decimals;
          return kbn.valueFormats[style.unit](value, decimals, null).toString();
        }
    
        if (style.type === "string") {
          if (_.isArray(value)) {
            value = value.join(", ");
          }
          const mappingType = style.mappingType || 0;
          if (mappingType === 1 && style.valueMaps) {
            for (let i = 0; i < style.valueMaps.length; i++) {
              const map = style.valueMaps[i];
    
              if (value === null) {
                if (map.value === "null") {
                  return map.text;
                }
                continue;
              }
    
              // Allow both numeric and string values to be mapped
              if (
                (!_.isString(value) && Number(map.value) === Number(value)) ||
                map.value === value
              ) {
                return this.defaultValueFormatter(map.text, style);
              }
            }
          }
    
          if (mappingType === 2 && style.rangeMaps) {
            for (let i = 0; i < style.rangeMaps.length; i++) {
              const map = style.rangeMaps[i];
    
              if (value === null) {
                if (map.from === "null" && map.to === "null") {
                  return map.text;
                }
                continue;
              }
    
              if (
                Number(map.from) <= Number(value) &&
                Number(map.to) >= Number(value)
              ) {
                return this.defaultValueFormatter(map.text, style);
              }
            }
          }
    
          if (value === null || value === void 0) {
            return "-";
          }
    
          return this.defaultValueFormatter(value, style);
        }
    
        if (style.type === "date") {
          if (value === undefined || value === null) {
            return "-";
          }
    
          if (_.isArray(value)) {
            value = value[0];
          }
          let date = moment(value);
          if (this.dashboard.isTimezoneUtc()) {
            date = date.utc();
          }
          return date.format(style.dateFormat);
        }
      }
  }
