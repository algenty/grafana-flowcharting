import RuleHandler from "../src/rulesHandler";
var scope = {
    ctrl : {
        version : "0.2.0",
        panel : {
            version : "0.2.0",
            rules : []
        }
    }
}
var rules = scope.ctrl.panel.rules;

describe("RuleHandler", function () {
    let rh = new RuleHandler(scope,rules);
    test('Add & Remove', function () {
        rh.addRule("RULE1");
        expect(rh.getRules().length).toBe(1);
        expect(rh.countRules()).toBe(1);
        rh.removeRule(0);
        expect(rh.getRules().length).toBe(0);
        expect(rh.countRules()).toBe(0);
    });

    test('Up and Down', function () {
        rh.addRule("RULE1");
        expect(rh.getRule(0).pattern).toBe('RULE1');
        rh.addRule("RULE2");
        expect(rh.getRule(1).pattern).toBe('RULE2');
        rh.moveRuleToUp(1);
        expect(rh.getRule(0).pattern).toBe('RULE2');
        rh.rules = [];
    });

    test('Clone', () => {
        rh.addRule("RULE1");
        expect(rh.getRules().length).toBe(1);
        rh.cloneRule(rh.getRule(0));
        expect(rh.getRules().length).toBe(2);
        expect(rh.getRule(0)).toEqual(rh.getRule(1));
        rh.rules = [];
    });
});