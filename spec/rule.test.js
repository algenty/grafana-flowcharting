import Rule from "../src/rule_class";

var modeleRule = { "aggregation": "current", "alias": "", "colorOn": "a", "colors": ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"], "dateFormat": "YYYY-MM-DD HH:mm:ss", "decimals": 2, "invert": false, "linkMaps": [], "linkProp": "id", "mappingType": 1, "pattern": "/.*/", "rangeMaps": [], "sanitize": false, "shapeMaps": [], "shapeProp": "id", "style": "fillColor", "textMaps": [], "textOn": "wmd", "textPattern": "/.*/", "textProp": "id", "textReplace": "content", "thresholds": [], "type": "number", "unit": "short", "valueMaps": [] }
var series = [{ "datapoints": [[87.2288864455515, 1553029068638], [87.3044867732176, 1553029069138], [87.41570847045853, 1553029069638]], "label": "A-series", "id": "A-series", "alias": "A-series", "aliasEscaped": "A-series", "bars": {}, "stats": { "total": 50819.34737192067, "max": 90.15954449591173, "min": 78.19373234740918, "logmin": 78.19373234740918, "avg": 84.69891228653445, "current": 79.17554249669148, "first": 87.2288864455515, "delta": 12316.4939445703, "diff": -8.053343948860018, "range": 11.96581214850255, "timeStep": 500, "count": 600 }, "legend": true, "hasMsResolution": true, "allIsNull": false, "allIsZero": false, "flotpairs": [[1553029068638, 87.2288864455515], [1553029069138, 87.3044867732176], [1553029069638, 87.41570847045853]] }];


describe("Rule", function () {
    var rule = new Rule("/.*/");
    test('Should be equals', () => {
        expect(rule).toEqual(modeleRule);
    });

});

describe("Level", function () {
    var rule = new Rule("/.*/");
    test('In order', () => {
        rule.thresholds = [50, 80];
        expect(rule.invert).toBeFalsy();
        expect(rule.getThresholdLevel(25)).toBe(2);
        expect(rule.getThresholdLevel(60)).toBe(1);
        expect(rule.getThresholdLevel(90)).toBe(0);
    });


    test('Invert', function () {
        rule.invertColorOrder();
        expect(rule.invert).toBeTruthy();
        expect(rule.getThresholdLevel(25)).toBe(0);
        expect(rule.getThresholdLevel(60)).toBe(1);
        expect(rule.getThresholdLevel(90)).toBe(2);
    });
    
});

describe("Colors", function () {
    var rule = new Rule("/.*/");
    rule.thresholds = [50, 80];
    test('Each colors', () => {
        expect(rule.getColorForValue(25)).toBe("rgba(245, 54, 54, 0.9)");
        expect(rule.getColorForValue(60)).toBe("rgba(237, 129, 40, 0.89)");
        expect(rule.getColorForValue(90)).toBe("rgba(50, 172, 45, 0.97)");
    });
});

describe("Colorize", function () { 
    var rule = new Rule("/.*/");
    rule.thresholds = [50, 80];

    test('toColorize always ERR should be true', () => {
        rule.colorOn = 'a';
        expect(rule.toColorize(25)).toBeTruthy();
    });
    test('toColorize always WARN should be true', () => {
        rule.colorOn = 'a';
        expect(rule.toColorize(60)).toBeTruthy();
    });
    test('toColorize always OK should be true', () => {
        rule.colorOn = 'a';
        expect(rule.toColorize(90)).toBeTruthy();
    });

    test('toColorize Warn/err ERR should be true', () => {
        rule.colorOn = 'wc';
        expect(rule.toColorize(25)).toBeTruthy();
    });
    test('toColorize Warn/err WARN should be true', () => {
        rule.colorOn = 'wc';
        expect(rule.toColorize(60)).toBeTruthy();
    });
    test('toColorize Warn/err OK should be false', () => {
        rule.colorOn = 'wc';
        expect(rule.toColorize(90)).toBeFalsy();
    });

});

describe("Shape", function () {
    var pattern = '/.*Toto.*/';
    test('addshape & remove', () => {
        var rule = new Rule("/.*/");
        rule.addShapeMap(pattern);
        expect(rule.getShapeMaps().length).toBe(1);
        rule.removeShapeMap(0);
        expect(rule.getShapeMaps().length).toBe(0);
    });
    
    test('Match on one', () => {
        let rule = new Rule("/.*/");
        rule.addShapeMap(pattern);
        let sm = rule.getShapeMap(0);
        sm.match('Toto')
        expect(sm.match('Toto')).toBeTruthy();
    });

    test('Match on all', () => {
        let rule = new Rule("/.*/");
        rule.addShapeMap(pattern);
        expect(rule.matchShape('Toto')).toBeTruthy();
        expect(rule.matchShape('Tata')).toBeFalsy();
    });

});

describe("Text", function () {
    var pattern = '/.*Toto.*/';
    
    test('addshape & remove', () => {
        var rule = new Rule("/.*/");
        rule.addTextMap(pattern);
        expect(rule.getTextMaps().length).toBe(1);
        rule.removeTextMap(0);
        expect(rule.getTextMaps().length).toBe(0);
    });
    
    test('Match on one', () => {
        let rule = new Rule("/.*/");
        rule.addTextMap(pattern);
        let sm = rule.getTextMap(0);
        expect(sm.match('Toto')).toBeTruthy();
    });

    test('Match on all', () => {
        let rule = new Rule("/.*/");
        rule.addTextMap(pattern);
        expect(rule.matchText('Toto')).toBeTruthy();
        expect(rule.matchText('Tata')).toBeFalsy();
    });

});

describe("Link", function () {
    var pattern = '/.*Toto.*/';
    
    test('addshape & remove', () => {
        var rule = new Rule("/.*/");
        rule.addLinkMap(pattern);
        expect(rule.getLinkMaps().length).toBe(1);
        rule.removeLinkMap(0);
        expect(rule.getLinkMaps().length).toBe(0);
    });
    
    test('Match on one', () => {
        let rule = new Rule("/.*/");
        rule.addLinkMap(pattern);
        let sm = rule.getLinkMap(0);
        expect(sm.match('Toto')).toBeTruthy();
    });

    test('Match on all', () => {
        let rule = new Rule("/.*/");
        rule.addLinkMap(pattern);
        expect(rule.matchLink('Toto')).toBeTruthy();
        expect(rule.matchLink('Tata')).toBeFalsy();
    });

});

describe("Series", () => {
    var rule = new Rule("/.*/");
    test('matchSerie', () => {
        expect(rule.matchSerie(series[0])).toBeTruthy();
    });

    test('Values', () => {
        expect(rule.getValueForSerie(series[0])).toBe(79.17554249669148);
    });

    test('Formatted Values', () => {
        let value = rule.getValueForSerie(series[0]);
        expect(rule.getFormattedValue(value)).toBe("79.18");
    });
});

describe("Text replace", () => {
    var rule = new Rule("/.*/");
    var text = "This is my value";
    var patternText = "/value/"
    let formattedValue = rule.getFormattedValue(12.34)
    test('All content', () => {
        expect(rule.getReplaceText("This is my value",formattedValue)).toBe("12.34")
    });
    test('pattern', () => {
        rule.textReplace = "textReplace";
        rule.textPattern = patternText;
        expect(rule.getReplaceText("This is my value",formattedValue)).toBe("This is my 12.34")
    });
});

