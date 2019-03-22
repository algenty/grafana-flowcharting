import RuleHandler from "../src/rulesHandler";

var rh = new RuleHandler();
console.log("rh ", rh);

describe("RuleHandler", () => {
    test('addRule', () => {
        rh.addRule("/.*/")
        expect(rule.getShapeMaps().length).toBe(1);
    });

    test('addRule', () => {
        rh.removeRule(0)
        expect(rule.getShapeMaps().length).toBe(0);
    });
});