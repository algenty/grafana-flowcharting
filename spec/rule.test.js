import Rule  from "../src/rule_class";
import toBeType from "jest-tobetype";
expect.extend(toBeType);

var newRule = {"aggregation": "current", "alias": "", "colorOn": "a", "colors": ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"], "dateFormat": "YYYY-MM-DD HH:mm:ss", "decimals": 2, "invert": false, "linkMaps": [], "linkProp": "id", "mappingType": 1, "pattern": "/.*/", "rangeMaps": [], "sanitize": false, "shapeMaps": [], "shapeProp": "id", "style": "fillColor", "textMaps": [], "textOn": "wmd", "textPattern": "/.*/", "textProp": "id", "textReplace": "content", "thresholds": [], "type": "number", "unit": "short", "valueMaps": []}
var rule = new Rule("/.*/");
var series = [
    {
        "datapoints": [
            [
                87.2288864455515,
                1553029068638
            ],
            [
                87.3044867732176,
                1553029069138
            ],
            [
                87.41570847045853,
                1553029069638
            ]
        ],
        "label": "A-series",
        "id": "A-series",
        "alias": "A-series",
        "aliasEscaped": "A-series",
        "bars": {},
        "stats": {
            "total": 50819.34737192067,
            "max": 90.15954449591173,
            "min": 78.19373234740918,
            "logmin": 78.19373234740918,
            "avg": 84.69891228653445,
            "current": 79.17554249669148,
            "first": 87.2288864455515,
            "delta": 12316.4939445703,
            "diff": -8.053343948860018,
            "range": 11.96581214850255,
            "timeStep": 500,
            "count": 600
        },
        "legend": true,
        "hasMsResolution": true,
        "allIsNull": false,
        "allIsZero": false,
        "flotpairs": [
            [
                1553029068638,
                87.2288864455515
            ],
            [
                1553029069138,
                87.3044867732176
            ],
            [
                1553029069638,
                87.41570847045853
            ]
        ]
    }
];

test('Rule : new rule', () => {
    expect(rule).toEqual(newRule);
});

test('Rule : addshape', () => {
    rule.addShapeMap('myshape');
    expect(rule.getShapeMaps().length).toBe(1);
});

test('Rule : removeShape', () => {
    rule.removeShapeMap(0);
    expect(rule.getShapeMaps().length).toBe(0);
});

test('Rule : value level', () => {
    rule.thresholds = [50,80]
    expect(rule.getThresholdLevel(25)).toBe(2);
    expect(rule.getThresholdLevel(60)).toBe(1);
    expect(rule.getThresholdLevel(90)).toBe(0);
    rule.invertColorOrder();
    expect(rule.getThresholdLevel(25)).toBe(0);
    expect(rule.getThresholdLevel(60)).toBe(1);
    expect(rule.getThresholdLevel(90)).toBe(2);
    rule.invertColorOrder();
});

test('Rule : Colors', () => {
    expect(rule.getColorForValue(25)).toBe("rgba(245, 54, 54, 0.9)");
    expect(rule.getColorForValue(60)).toBe("rgba(237, 129, 40, 0.89)");
    expect(rule.getColorForValue(90)).toBe("rgba(50, 172, 45, 0.97)");
});

test('Rule : Formatted Value', () => {
    rule.removeShapeMap(0);
    expect(rule.getShapeMaps().length).toBe(0);
});

test('Rule : matchShape', () => {
    let shapePattern = '/Shape.*/';
    rule.addShapeMap(shapePattern);
    let sm = rule.getShapeMap(0);
    expect(sm.match('Shape')).toBe(true); 
    expect(rule.matchShape('ShapeToto')).toBe(true);
    expect(rule.matchShape('TextToto')).toBe(false);
});

test('Rule : matchSerie', () => {
    expect(rule.matchSerie(series[0])).toBe(true);
});

test('Rule : Values', () => {
    expect(rule.getValue(series[0])).toBe(79.17554249669148);
    expect(rule.getFormattedValue(series[0])).toBe(79.17554249669148);
});


