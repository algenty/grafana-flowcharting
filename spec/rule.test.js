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
