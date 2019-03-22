import RuleHandler from "../src/rulesHandler";


describe("RuleHandler", function () {
    let rh = new RuleHandler();
    test('addRule', () => {
        rh.addRule("/.*/")
        expect(rule.getShapeMaps().length).toBe(1);
    });

    test('addRule', () => {
        rh.removeRule(0)
        expect(rule.getShapeMaps().length).toBe(0);
    });
});