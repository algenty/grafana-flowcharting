// import kbn from "app/core/utils/kbn";
import _ from "lodash";
var u = require("./utils");

export default class Rule {
    /** @ngInject */
    constructor(pattern) {
        this.unit = "short";
        this.type = "number";
        this.alias = "";
        this.aggregation = "current";
        this.decimals = 2;
        this.colors = [
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)"
        ];
        this.style = 'fillColor';
        this.colorOn = "a";
        this.textOn = "wmd";
        this.textReplace = "content";
        this.textPattern = "/.*/";
        this.pattern = pattern;
        this.dateFormat = "YYYY-MM-DD HH:mm:ss";
        this.thresholds = [];
        this.invert = false;
        this.shapeProp = "id";
        this.shapeMaps = [];
        this.textProp = "id";
        this.textMaps = [];
        this.linkProp = "id";
        this.linkMaps = [];
        this.mappingType = 1;
        this.valueMaps = [];
        this.rangeMaps = [];
        this.sanitize = false;
    }

    export() {
        let sm = [];
        let tm = [];
        let lm = [];
        let vm = [];
        let rm = [];
        this.shapeMaps.forEach(element => { sm.push(element.export()); });
        this.textMaps.forEach(element => { tm.push(element.export()); });
        this.linkMaps.forEach(element => { lm.push(element.export()); });
        this.valueMaps.forEach(element => { vm.push(element.export()); });
        this.rangeMaps.forEach(element => { rm.push(element.export()); });
        return {
            unit: this.unit,
            type: this.type,
            alias: this.alias,
            aggregation: this,
            decimals: this.decimals,
            colors: this.colors,
            style: this.style,
            colorOn: this.colorOn,
            textOn: this.textOn,
            textReplace: this.textReplace,
            textPattern: this.textPattern,
            pattern: this.pattern,
            dateFormat: this.dateFormat,
            thresholds: this.thresholds,
            invert: this.invert,
            shapeProp: this.shapeProp,
            shapeMaps: sm,
            textProp: this.textProp,
            textMaps: tm,
            linkProp: this.linkProp,
            linkMaps: lm,
            mappingType: this.mappingType,
            valueMaps: vm,
            rangeMaps: rm,
            sanitize: this.sanitize
        }
    }

    import(obj) {
        this.unit = obj.unit;
        this.type = obj.type;
        this.alias = obj.alias;
        this.aggregation = obj.aggregation;
        this.decimals = obj.decimals;
        this.colors = obj.colors;
        this.style = obj.style;
        this.colorOn = obj.colorOn;
        this.textOn = obj.textOn;
        this.textReplace = obj.textReplace;
        this.textPattern = obj.textPattern;
        this.pattern = obj.pattern;
        this.dateFormat = obj.dateFormat;
        this.thresholds = obj.thresholds;
        this.invert = obj.invert;
        this.shapeProp = obj.shapeProp;
        this.shapeMaps = [];
        obj.shapeMaps.forEach(element => {
            let sm = new ShapeMap(this, "");
            sm.import()
            this.shapeMaps.push()
        });
        this.textProp = "id";
        this.textMaps = [];
        this.linkProp = "id";
        this.linkMaps = [];
        this.mappingType = 1;
        this.valueMaps = [];
        this.rangeMaps = [];
        this.sanitize = false;

    }

    migrate(obj, version) {

    }

    invertColorOrder() {
        const ref = this.colors;
        const copy = ref[0];
        ref[0] = ref[2];
        ref[2] = copy;
        this.invert = true;
    }

    newColor(index, color) {
        return newColor => {
            this.colors[index] = color;
        };
    }

    //
    // Series
    //
    matchSerie(serie) {
        if (this.pattern === null || this.pattern === undefined) return false;
        const regex = u.stringToJsRegex(this.pattern);
        let matching = serie.alias.match(regex);
        if (this.pattern == this.alias || matching) return true
    }

    //
    // SHAPE MAPS
    //
    addShapeMap(pattern) { let m = new ShapeMap(this, pattern); this.shapeMaps.push(m); }
    removeShapeMap(index) { this.shapeMaps.splice(index, 1); }
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
    addTextMap(pattern) { let m = new TextMap(this, pattern); this.textMaps.push(m); };
    removeTextMap(index) { let m = this.textMaps[index]; this.textMaps = _.without(this.textMaps, m) };
    getTextMap(index) { return this.textMaps[index]; };
    getTextMaps() { return textMaps; }
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
    addLinkMap(pattern) { let m = new LinkMap(this, pattern); this.linkMaps.push(m); };
    removeLinkMap(index) { let m = this.textMaps[index]; this.linkMaps = _.without(this.linkMaps, m) };
    getLinkMap(index) { return this.linkMaps[index]; };
    getLinkMaps() { return textMaps; }
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
    addValueMap(value, text) { let m = new ValueMap(this, value, text); this.valueMaps.push(m); }
    removeValueMap(index) { this.valueMaps.splice(index, 1); }
    getValueMap(index) { return this.valueMaps[index]; }
    getValueMaps() { return valueMaps; }

    //
    // STRING RANGE VALUE MAPS
    //
    addRangeMap(from, to, text) { let m = new ValueMap(this, from, to, text); this.rangeMaps.push(m); }
    removeRangeMap(index) { this.rangeMaps.splice(index, 1); }
    getRangeMap(index) { return this.rangeMaps[index]; }
    getRangeMaps() { return this.rangeMaps; }
    hideRangeMap(index) { this.rangeMaps[index].hide(); }
    showRangeMap(index) { this.rangeMaps[index].show(); }

    //
    // Format value
    //

    getColorForValue(value) {
        if (!this.thresholds || this.thresholds.length == 0) {
            return null;
        }

        for (let i = this.thresholds.length; i > 0; i--) {
            if (value >= this.thresholds[i - 1]) {
                return this.colors[i];
            }
        }
        return _.first(this.colors);
    }

    getThresholdLevel(value) {
        var thresholdLevel = 0;

        var thresholds = this.thresholds;
        if (thresholds === undefined || thresholds.length == 0) return -1;
        if (thresholds.length !== 2) return -1;

        // non invert
        if (!this.invert) {
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

    getValue(serie) {
        if (this.matchSerie(serie)) {
            let value = _.get(serie.stats, this.aggregation);
            if (value === undefined || value === null) {
                value = serie.datapoints[serie.datapoints.length - 1][0];
            }
            return value;
        }
        return '-';
    }

    getFormattedValue(serie) {
        let value = this.getValue(serie);
        // Number
        if (this.type === "number") {
            if (!_.isFinite(value)) return "Invalid Number";
            if (value === null || value === void 0) { return "-"; }
            let decimals = this.decimalPlaces(value);
            decimals =
                typeof this.decimals === "number"
                    ? Math.min(this.decimals, decimals)
                    : decimals;
            return kbn.valueFormats[this.unit](value, decimals, null).toString();
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
            return date.format(this.dateFormat);
        }
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
    constructor(rule, pattern) {
        this.id = u.uniqueID();
        this.rule = rule;
        this.pattern = pattern;
        this.hidden = false;
    }

    match(text) {
        if (text === undefined || text === null || text.length === 0) return false;
        const regex = u.stringToJsRegex(this.pattern);
        let matching = text.toString().match(regex);
        if (this.pattern === text || matching) return true;
        return false;
    }

    show() { this.hidden = false }
    hide() { this.hidden = true }
    isHidden() { return this.hidden }
    migrate(obj, version) {
        this.pattern = (obj.pattern != null && obj.pattern != undefined) ? obj.pattern : "/.*/";
        this.hidden = (obj.hidden != null && obj.hidden != undefined) ? obj.hidden : false;
    }
    import(obj) {
        this.pattern = obj.pattern;
        this.hidden = obj.hidden;
    }
    export() {
        return {
            'pattern': this.pattern,
            'hidden': this.hidden
        }
    }
}

//
// TextMap Class
//
class TextMap {
    constructor(rule, pattern) {
        this.id = u.uniqueID();
        this.rule = rule;
        this.pattern = pattern;
        this.hidden = false;
    }

    match(text) {
        if (text === undefined || text === null || text.length === 0) return false;
        const regex = u.stringToJsRegex(this.pattern);
        let matching = text.match(regex);
        if (this.pattern == text || matching) return true;
        return false;
    }

    getFormattedText(value) {
        let rule = this.rule;
        let formattedText = rule.getFormattedText(value);
        if (rule.textOn == "n") formattedText = "";
        if (rule.textOn == "wc" && rule.getThresholdLevel(value) < 1) formattedText = "";
        if (rule.textOn == "co" && level != 3) formattedText = "";
        return formattedText;
    }

    show() { this.hidden = false };
    hide() { this.hidden = true };
    isHidden() { return this.hidden };
    migrate(obj, version) {
        this.pattern = (obj.pattern != null && obj.pattern != undefined) ? obj.pattern : "/.*/";
        this.hidden = (obj.hidden != null && obj.hidden != undefined) ? obj.hidden : false;
    }
    import(obj) {
        this.pattern = obj.pattern;
        this.hidden = obj.hidden;
    }
    export() {
        return {
            'pattern': this.pattern,
            'hidden': this.hidden
        }
    }
}

//
// LinkMap Class
//
class LinkMap {
    constructor(rule, pattern) {
        this.id = u.uniqueID();
        this.rule = rule;
        this.pattern = pattern;
        this.hidden = false;
    }

    match(text) {
        if (text === undefined || text === null || text.length === 0) return false;
        const regex = u.stringToJsRegex(this.pattern);
        let matching = text.match(regex);
        if (this.pattern == text || matching) return true;
        return false;
    }

    show() { this.hidden = false };
    hide() { this.hidden = true };
    isHidden() { return this.hidden };
    migrate(obj, version) {
        this.pattern = (obj.pattern != null && obj.pattern != undefined) ? obj.pattern : "/.*/";
        this.hidden = (obj.hidden != null && obj.hidden != undefined) ? obj.hidden : false;
    }
    import(obj) {
        this.pattern = obj.pattern;
        this.hidden = obj.hidden;
    }
    export() {
        return {
            'pattern': this.pattern,
            'hidden': this.hidden
        }
    }
}

//
// RangeMap Class
//
class RangeMap {
    constructor(from, to, text) {
        this.id = u.uniqueID();
        this.from = from;
        this.to = to;
        this.text = text;
        this.hidden = false;
    }

    match(value) {
        if (this.from === "null" && this.to === "null") {
            return true;
        }
        if (value === null) {
            if (this.from === "null" && this.to === "null") {
                true;
            }
        }
        if (Number(map.from) <= Number(value) &&
            Number(map.to) >= Number(value)
        ) return true;
        return false;
    }

    getFormattedText(value, rule) {
        if (value === null) {
            if (this.from === "null" && this.to === "null") {
                return this.text;
            }
        }
        if (this.match(value)) {
            return this.defaultValueFormatter(this.text, rule);
        }
        else return '-';
    }

    show() { this.hidden = false };
    hide() { this.hidden = true };
    isHidden() { return this.hidden };
    migrate(obj, version) {
        this.from = (obj.from != null && obj.from != undefined) ? obj.from : "";
        this.to = (obj.to != null && obj.to != undefined) ? obj.to : "";
        this.text = (obj.text != null && obj.text != undefined) ? obj.text : "";
        this.hidden = (obj.hidden != null && obj.hidden != undefined) ? obj.hidden : false;
    }
    import(obj) {
        this.from = (obj.from != null && obj.from != undefined) ? obj.from : "";
        this.to = (obj.to != null && obj.to != undefined) ? obj.to : "";
        this.text = (obj.text != null && obj.text != undefined) ? obj.text : "";
        this.hidden = (obj.hidden != null && obj.hidden != undefined) ? obj.hidden : false;
    }
    export() {
        return {
            'from': this.from,
            'to': this.to,
            'text': this.text,
            'hidden': this.hidden
        }
    }
}

//
// ValueMap Class
//
class ValueMap {
    constructor(rule, value, text) {
        this.id = u.uniqueID();
        this.rule = rule;
        this.value = value;
        this.text = text;
        this.hidden = false;
    }

    match(value) {

        if (value === null || value === undefined) {
            if (this.value === "null") {
                return true;
            }
        }

        if (!_.isString(value) && Number(this.value) === Number(value)) {
            return true;
        }
        const regex = u.stringToJsRegex(this.value);
        let matching = text.match(regex);
        if (this.pattern == text || matching) return true;
        else return false;
    }

    getFormattedText(value) {
        let rule = this.rule;
        if (value === null) {
            if (this.value === "null") {
                return this.text;
            }
        }
        if (this.match(value)) {
            return this.defaultValueFormatter(this.text, rule);
        }
        else return '-';
    }

    show() { this.hidden = false };
    hide() { this.hidden = true };
    isHidden() { return this.hidden };
    migrate(obj, version) {
        this.value = (obj.value != null && obj.value != undefined) ? obj.value : "/.*/";
        this.text = (obj.text != null && obj.text != undefined) ? obj.text : "/.*/";
        this.hidden = (obj.hidden != null && obj.hidden != undefined) ? obj.hidden : false;
    }
    import(obj) {
        this.value = obj.value;
        this.text = obj.text;
        this.hidden = obj.hidden;
    }
    export() {
        return {
            'value': this.value,
            'text': this.text,
            'hidden': this.hidden
        }
    }
}