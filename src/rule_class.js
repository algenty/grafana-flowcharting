import kbn from "app/core/utils/kbn";
import { thisTypeAnnotation } from "@babel/types";

export default class Rule {
    /** @ngInject */
    constructor(pattern,data) {
        this.data = data;
        this.data.pattern = pattern;
        this.shapeMaps = [];
        this.textMaps = [];
        this.linkMaps = [];
        this.valueMaps = [];
        this.rangeMaps = [];
        this.import(data)
    }

    getData() {
        return this.data;
    }

    export() {
        return JSON.stringify(this);
    }

    import(obj) {
        this.data.unit = obj.unit || "short";
        this.data.type = obj.type || "nember";
        this.data.alias = obj.alias || "";
        this.data.aggregation = obj.aggregation || "current"
        this.data.decimals = obj.decimals || 2;
        this.data.colors = obj.colors || [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
        ];
        this.data.style = obj.style || 'fillColor'; 
        this.data.colorOn = obj.colorOn || "a";
        this.data.textOn = obj.textOn || "wmd";
        this.data.textReplace = obj.textReplace || "content";
        this.data.textPattern = obj.textPattern || "/.*";
        this.data.pattern = obj.pattern || this.data.pattern;
        this.data.dateFormat = obj.dateFormat || "YYYY-MM-DD HH:mm:ss";
        this.data.thresholds = obj.thresholds || [];
        this.data.invert = obj.invert || false;
        this.data.shapeProp = obj.shapeProp || "id"
        this.data.shapeData = [];
        obj.shapeData.forEach(map => {
            let data = {};
            let sm = new ShapeMap("",data);
            sm.import(map)
            this.shapeMaps.push(sm)
            this.data.shapeData.push(data);
        });
        this.data.textProp = obj.textProp || "id";
        this.data.textData = [];
        obj.textData.forEach(map => {
            let data = {};
            let tm = new TextMap("",data);
            tm.import(map)
            this.textMaps.push(tm);
            this.data.textData(data);
        });
        this.data.linkProp = obj.linkProp || "id";
        this.data.linkData = [];
        obj.linkData.forEach(map => {
            let data = {};
            let lm = new LinkMap("",data);
            lm.import(map);
            this.linkMaps.push(lm);
            this.data.linkData.push(data);
        });
        this.data.mappingType = obj.mappingType || 1;
        this.data.valueData = [];
        obj.valueData.forEach(map => {
            let data = {};
            let vm = new ValueMap("",data);
            vm.import(map);
            this.valueMaps.push(vm);
            this.data.valueData.push(data);
        });
        this.data.rangeData = [];
        obj.rangeData.forEach(map => {
            let data = {};
            let rm = new RangeMap("",data);
            rm.import(map)
            this.rangeMaps.push(rm)
            this.data.rangeData.push(data);
        });
        this.data.sanitize = obj.sanitize || false;

    }

    migrate(obj, version) {

    }

    invertColorOrder() {
        const ref = this.data.colors;
        const copy = ref[0];
        ref[0] = ref[2];
        ref[2] = copy;
        if (this.data.invert) this.data.invert = false;
        else this.data.invert = true;
    }

    newColor(index, color) {
        return newColor => {
            this.data.colors[index] = color;
        };
    }

    //
    // Conditions
    //
    toColorize(value) {
        if (this.data.colorOn === "a") return true;
        if (this.data.colorOn === "wc" && this.getThresholdLevel(value) >= 1) return true;
        return false
    }

    //
    // Series
    //
    matchSerie(serie) {
        if (this.data.pattern === null || this.data.pattern === undefined) return false;
        return u.matchString(serie.alias, this.data.pattern);
    }

    //
    // SHAPE MAPS
    //
    addShapeMap(pattern) { 
        let data = {};
        let m = new ShapeMap(pattern,data);
        this.shapeMaps.push(m);
        this.data.shapeData.push(data);
     }

    removeShapeMap(index) { this.data.shapeData.splice(index, 1); this.shapeMaps.splice(index, 1); }
    getShapeMap(index) { return this.shapeMaps[index]; }
    getShapeMaps() { return this.shapeMaps; }
    matchShape(pattern) {
        let found = false;
        this.shapeMaps.forEach(element => {
            if (element.match(pattern)) found = true;
        });
        return found;
    }

    //
    // TEXT MAPS
    //
    addTextMap(pattern) { 
        let data = {};
        let m = new TextMap(pattern,data); 
        this.textMaps.push(m);
        this.data.textData(data); 
    };
    removeTextMap(index) { this.data.textData.splice(index, 1); this.textMaps.splice(index, 1); };
    getTextMap(index) { return this.textMaps[index]; };
    getTextMaps() { return this.textMaps; }
    matchText(pattern) {
        let found = false;
        this.textMaps.forEach(element => {
            if (element.match(pattern)) found = true;
        });
        return found;
    }


    //
    // LINK MAPS
    //
    addLinkMap(pattern) { 
        let data = {};
        let m = new LinkMap(pattern); 
        this.linkMaps.push(m); 
        this.data.linkdata.push(data);
    };
    removeLinkMap(index) { 
        this.linkData.splice(index, 1); 
        this.linkMaps.splice(index, 1); 
    };
    getLinkMap(index) { return this.linkMaps[index]; };
    getLinkMaps() { return this.linkMaps; }
    matchLink(pattern) {
        let found = false;
        this.linkMaps.forEach(element => {
            if (element.match(pattern)) found = true;
        });
        return found;
    }

    //
    // STRING VALUE MAPS
    //
    addValueMap(value, text) {
        let data = {}; 
        let m = new ValueMap(value, text, data); 
        this.valueMaps.push(m);
        this.data.valueData.push(data); 
    }
    removeValueMap(index) { this.data.valueData.splice(index, 1); this.valueMaps.splice(index, 1); }
    getValueMap(index) { return this.valueMaps[index]; }
    getValueMaps() { return this.valueMaps; }

    //
    // STRING RANGE VALUE MAPS
    //
    addRangeMap(from, to, text) { 
        let data = {};
        let m = new ValueMap(from, to, text); 
        this.rangeMaps.push(m); 
        this.data.rangeData.push(data);
    }
    removeRangeMap(index) { this.data.rangeData.splice(index, 1); this.rangeMaps.splice(index, 1); }
    getRangeMap(index) { return this.rangeMaps[index]; }
    getRangeMaps() { return this.rangeMaps; }
    hideRangeMap(index) { this.rangeMaps[index].hide(); }
    showRangeMap(index) { this.rangeMaps[index].show(); }

    //
    // Format value
    //
    getColorForValue(value) {
        if (!this.data.thresholds || this.data.thresholds.length == 0) {
            return null;
        }

        for (let i = this.data.thresholds.length; i > 0; i--) {
            if (value >= this.data.thresholds[i - 1]) {
                return this.data.colors[i];
            }
        }
        return _.first(this.data.colors);
    }

    getThresholdLevel(value) {
        var thresholdLevel = 0;

        var thresholds = this.data.thresholds;
        if (thresholds === undefined || thresholds.length == 0) return -1;
        if (thresholds.length !== 2) return -1;

        // non invert
        if (!this.data.invert) {
            thresholdLevel = 2;
            if (value >= thresholds[0]) thresholdLevel = 1;
            if (value >= thresholds[1]) thresholdLevel = 0;
        }
        else {
            thresholdLevel = 0;
            if (value >= thresholds[0]) thresholdLevel = 1;
            if (value >= thresholds[1]) thresholdLevel = 2;
        }
        return thresholdLevel;
    }

    getValueForSerie(serie) {
        if (this.matchSerie(serie)) {
            let value = _.get(serie.stats, this.data.aggregation);
            if (value === undefined || value === null) {
                value = serie.datapoints[serie.datapoints.length - 1][0];
            }
            return value;
        }
        return '-';
    }

    getFormattedValueForSerie(serie) {
        let formattedValue = this.getValueForSerie(serie)
        return this.getFormattedValue(formattedValue);
    }

    getFormattedValue(value) {
        // Number
        if (this.type === "number") {
            if (!_.isFinite(value)) return "Invalid Number";
            if (value === null || value === void 0) { return "-"; }
            let decimals = this.decimalPlaces(value);
            decimals =
                typeof this.data.decimals === "number"
                    ? Math.min(this.data.decimals, decimals)
                    : decimals;
            return formatValue(value, this.unit, this.data.decimals);
        }

        if (this.type === "string") {
            if (_.isArray(value)) {
                value = value.join(", ");
            }
            const mappingType = this.mappingType || 0;
            if (mappingType === 1 && this.valueMaps) {
                for (let i = 0; i < this.valueMaps.length; i++) {
                    const map = this.valueMaps[i];
                    if (map.match(value)) return map.getFormattedText(value);
                }
                return '-';
            }

            if (mappingType === 2 && this.rangeMaps) {
                for (let i = 0; i < this.rangeMaps.length; i++) {
                    const map = this.rangeMaps[i];
                    if (map.match(value)) return map.getFormattedText(value);
                }
                return '-';
            }

            if (value === null || value === void 0) {
                return "-";
            }
        }

        if (this.type === "date") {
            if (value === undefined || value === null) {
                return "-";
            }

            if (_.isArray(value)) {
                value = value[0];
            }
            let date = moment(value);
            // if (this.dashboard.isTimezoneUtc()) {
            //     date = date.utc();
            // }
            return date.format(this.data.dateFormat);
        }
    }

    getReplaceText(text, FormattedValue) {
        if (this.data.textReplace === 'content') return FormattedValue;
        else {
            const regexVal = u.stringToJsRegex(this.data.textPattern);
            if (text.toString().match(regexVal))
                return text.toString().replace(regexVal, FormattedValue)
        }
        return text;
    }

    defaultValueFormatter(value, rule) {
        if (value === null || value === void 0 || value === undefined) {
            return "";
        }

        if (_.isArray(value)) {
            value = value.join(", ");
        }

        if (this.sanitize) {
            return this.$sanitize(value);
        } else {
            return _.escape(value);
        }
    }

    decimalPlaces(num) {
        var match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) {
            return 0;
        }
        return Math.max(
            0,
            // Number of digits right of decimal point.
            (match[1] ? match[1].length : 0) -
            // Adjust for scientific notation.
            (match[2] ? +match[2] : 0)
        );
    }
}


//
// ShapeMap Class
//
class ShapeMap {
    constructor(pattern,data) {
        this.data = data
        this.id = u.uniqueID();
        this.data.pattern;
        this.data.pattern = pattern;
        this.import(data);
    }

    import(obj) {
        this.data.pattern = obj.pattern || "";
        this.data.hidden = obj.hidden || false;
    }

    migrate(obj, version) {

    }

    match(text) {
        if (text === undefined || text === null || text.length === 0) return false;
        return u.matchString(text, this.data.pattern);
    }

    getId() { return this.id; }
    show() { this.data.hidden = false }
    hide() { this.data.hidden = true }
    isHidden() { return this.data.hidden }
    export() {
        return {
            'pattern': this.data.pattern,
            'hidden': this.data.hidden
        }
    }
    toColorize(value) {
        if (this.data.hidden) return false;
        return this.rule.toColorize(value);
    }
    toVisible() {
        if (this.data.hidden) return false;
        return true;
    }
}

//
// TextMap Class
//
class TextMap {
    constructor(pattern,data) {
        this.data = data;
        this.id = u.uniqueID();
        this.data.pattern = pattern;
        this.import(data);
    }

    migrate(obj, version) {

    }

    import(obj) {
        this.data.pattern = obj.pattern || data.pattern;
        this.data.hidden = obj.hidden || false;
    }

    match(text) {
        if (text === undefined || text === null || text.length === 0) return false;
        return u.matchString(text, this.data.pattern);
    }

    getId() { return this.id; }
    show() { this.data.hidden = false };
    hide() { this.data.hidden = true };
    isHidden() { return this.data.hidden };
    export() {
        return {
            'pattern': this.data.pattern,
            'hidden': this.data.hidden
        }
    }
}

//
// LinkMap Class
//
class LinkMap {
    constructor(pattern,data) {
        this.data = data;
        this.id = u.uniqueID();
        this.data.pattern = pattern;
        this.import(data);
    }
    
    migrate(obj, version) {

    }

    import(obj) {
        this.data.pattern = obj.pattern || this.data.pattern || ""
        this.data.hidden = obj.hidden || false;
    }

    match(text) {
        if (text === undefined || text === null || text.length === 0) return false;
        return u.matchString(text, this.data.pattern);
    }

    getId() { return this.id; }
    show() { this.data.hidden = false };
    hide() { this.data.hidden = true };
    isHidden() { return this.data.hidden };
    export() {
        return {
            'pattern': this.data.pattern,
            'hidden': this.data.hidden
        }
    }
}

//
// RangeMap Class
//
class RangeMap {
    constructor(from, to, text, data) {
        this.data = data;
        this.id = u.uniqueID();
        this.data.from = from;
        this.data.to = to;
        this.data.text = text;
        this.data.hidden = false;
        this.import(obj);
    }

    migrate(obj, version) {

    }
    import(obj) {
        this.data.from = obj.from || this.data.from || "";
        this.data.to = obj.to || this.data.to || "";
        this.data.text = obj.text || this.data.text || "";
        this.data.hidden = obj.hidden || this.data.hidden || false;
    }

    match(value) {
        if (this.data.from === "null" && this.data.to === "null") {
            return true;
        }
        if (value === null) {
            if (this.data.from === "null" && this.data.to === "null") {
                true;
            }
        }
        if (Number(map.from) <= Number(value) &&
            Number(map.to) >= Number(value)
        ) return true;
        return false;
    }
    getId() { return this.id; }

    getFormattedText(value, rule) {
        if (value === null) {
            if (this.data.from === "null" && this.data.to === "null") {
                return this.data.text;
            }
        }
        if (this.match(value)) {
            return this.defaultValueFormatter(this.data.text, rule);
        }
        else return '-';
    }

    show() { this.data.hidden = false };
    hide() { this.data.hidden = true };
    isHidden() { return this.data.hidden };
    export() {
        return {
            'from': this.data.from,
            'to': this.data.to,
            'text': this.data.text,
            'hidden': this.data.hidden
        }
    }
}

//
// ValueMap Class
//
class ValueMap {
    constructor(rule, value, text,data) {
        this.id = u.uniqueID();
        this.data.rule = rule;
        this.data.value = value;
        this.data.text = text;
        this.data.hidden = false;
        this.import(data)
    }

    import(obj) {
        this.data.value = obj.value || this.data.value || "";
        this.data.text = obj.text || this.data.text || "";
        this.data.hidden = obj.hidden || this.data.hidden || false;
    }
    
    match(value) {
        
        if (value === null || value === undefined) {
            if (this.data.value === "null") {
                return true;
            }
        }

        if (!_.isString(value) && Number(this.data.value) === Number(value)) {
            return true;
        }
        const regex = u.stringToJsRegex(this.data.value);
        let matching = text.match(regex);
        if (this.pattern == text || matching) return true;
        else return false;
    }
    
    getId() { return this.id; }

    getFormattedText(value) {
        let rule = this.data.rule;
        if (value === null) {
            if (this.data.value === "null") {
                return this.data.text;
            }
        }
        if (this.match(value)) {
            return this.defaultValueFormatter(this.data.text, rule);
        }
        else return '-';
    }

    show() { this.data.hidden = false };
    hide() { this.data.hidden = true };
    isHidden() { return this.data.hidden };
    export() {
        return {
            'value': this.data.value,
            'text': this.data.text,
            'hidden': this.data.hidden
        }
    }
}

function formatValue(value, unit, decimals) {
    return kbn.valueFormats[unit](value, decimals, null).toString();
}