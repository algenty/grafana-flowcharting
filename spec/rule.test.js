import Rule  from "../src/rule_class";
import toBeType from "jest-tobetype";
expect.extend(toBeType);

var newRule = {"aggregation": "current", "alias": "", "colorOn": "a", "colors": ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"], "dateFormat": "YYYY-MM-DD HH:mm:ss", "decimals": 2, "invert": false, "linkMaps": [], "linkProp": "id", "mappingType": 1, "pattern": "/.*/", "rangeMaps": [], "sanitize": false, "shapeMaps": [], "shapeProp": "id", "style": "fillColor", "textMaps": [], "textOn": "wmd", "textPattern": "/.*/", "textProp": "id", "textReplace": "content", "thresholds": [], "type": "number", "unit": "short", "valueMaps": []}
var rule = new Rule("/.*/");

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

test('Rule : matchShape', () => {
    rule.addShapeMap('ShapeToto');
    expect(rule.matchShape('ShapeToto')).toBe(true);
    expect(rule.matchShape('TextToto')).toBe(false);
});
