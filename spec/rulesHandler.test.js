import RuleHandler from "../src/rulesHandler";

const scope = {
  ctrl: {
    version: "0.2.0",
    panel: {
      version: "0.2.0",
      rulesData: [],
    },
  },
};
const rules = scope.ctrl.panel.rulesData;

describe("RuleHandler", () => {
  const rh = new RuleHandler(scope, rules);

  test('Add & Remove', () => {
    rh.addRule("RULE1");
    expect(rh.getRules().length).toBe(1);
    expect(rh.countRules()).toBe(1);
    rh.removeRule(0);
    expect(rh.getRules().length).toBe(0);
    expect(rh.countRules()).toBe(0);
  });

  test('Up and Down', () => {
    rh.addRule("RULE1");
    expect(rh.getRule(0).data.pattern).toBe('RULE1');
    rh.addRule("RULE2");
    expect(rh.getRule(1).data.pattern).toBe('RULE2');
    rh.moveRuleToUp(1);
    expect(rh.getRule(0).data.pattern).toBe('RULE2');
    rh.rules = [];
  });

  test('Clone', () => {
    rh.addRule("RULE1");
    expect(rh.getRules().length).toBe(1);
    rh.cloneRule(0);
    rh.getRule(0).data.alias = "No name";
    expect(rh.getRules().length).toBe(2);
    expect(rh.getRule(0)).toEqual(rh.getRule(1));
    rh.rules = [];
  });
});
