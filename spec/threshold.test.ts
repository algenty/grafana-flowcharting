import { NumberTH, StringTH } from '../src/threshold_class';
import { Rule } from '../src/rule_class';
import { $GF } from '../src/globals_class';

describe('Threshold init', () => {
  describe('on NumberTH', () => {
    const data = NumberTH.getDefaultData();
    test('Data should be new', () => {
      expect(data).not.toBeNaN();
      expect(data).toMatchSnapshot();
    });
    test('Matched value for 100', () => {
      let tn1 = new NumberTH('Color1', 50, $GF.CONSTANTS.COMP_GE, NumberTH.getDefaultData());
      let tn2 = new NumberTH('Color2', 80, $GF.CONSTANTS.COMP_GT, NumberTH.getDefaultData());
      let tn3 = new NumberTH('Color3', 100, $GF.CONSTANTS.COMP_GE, NumberTH.getDefaultData());
      let value = 100;
      expect(tn1.match(value)).toBeTruthy();
      expect(tn2.match(value)).toBeTruthy();
      expect(tn3.match(value)).toBeTruthy();
    });

    test('Matched value for 80', () => {
      let tn1 = new NumberTH('Color1', 50, $GF.CONSTANTS.COMP_GE, NumberTH.getDefaultData());
      let tn2 = new NumberTH('Color2', 80, $GF.CONSTANTS.COMP_GT, NumberTH.getDefaultData());
      let tn3 = new NumberTH('Color3', 100, $GF.CONSTANTS.COMP_GE, NumberTH.getDefaultData());
      let value = 80;
      expect(tn1.match(value)).toBeTruthy();
      expect(tn2.match(value)).toBeFalsy();
      expect(tn3.match(value)).toBeFalsy();
    });
    test('Matched value for 20', () => {
      let tn1 = new NumberTH('Color1', 50, $GF.CONSTANTS.COMP_GE, NumberTH.getDefaultData());
      let tn2 = new NumberTH('Color2', 80, $GF.CONSTANTS.COMP_GT, NumberTH.getDefaultData());
      let tn3 = new NumberTH('Color3', 100, $GF.CONSTANTS.COMP_GE, NumberTH.getDefaultData());
      let value = 20;
      expect(tn1.match(value)).toBeFalsy();
      expect(tn2.match(value)).toBeFalsy();
      expect(tn3.match(value)).toBeFalsy();
    });
  });

  describe('on StringTH', () => {
    test('Data should be new', () => {
      const data = StringTH.getDefaultData();
      expect(data).not.toBeNaN();
      expect(data).toMatchSnapshot();
    });
    test('Matched value for every things', () => {
      let tn1 = new StringTH('Color1', '/.*/', $GF.CONSTANTS.COMP_EQ, StringTH.getDefaultData());
      let tn2 = new StringTH('Color2', '/.*/', $GF.CONSTANTS.COMP_NE, StringTH.getDefaultData());
      let value = 'toto';
      expect(tn1.match(value)).toBeTruthy();
      expect(tn2.match(value)).toBeFalsy();
    });

    test('Matched value for specific string', () => {
      let tn1 = new StringTH('Color1', 'toto', $GF.CONSTANTS.COMP_EQ, StringTH.getDefaultData());
      let tn2 = new StringTH('Color2', 'tata', $GF.CONSTANTS.COMP_NE, StringTH.getDefaultData());
      let value = 'toto';
      expect(tn1.match(value)).toBeTruthy();
      expect(tn2.match(value)).toBeTruthy();
    });
  });
});

describe('Thresholds Handler', () => {
  describe('on NumberTHs', () => {
    const rule = new Rule('/.*/', Rule.getDefaultData());
    let th1 = rule.addThreshold(undefined, '#111111', 10);
    let th2 = rule.addThreshold(undefined, '#222222', 20);
    let th3 = rule.addThreshold(undefined, '#333333', 30);
    test('th1 should be', () => {
      expect(th1.getValue()).toEqual(10);
      expect(th1.getColor()).toEqual('#111111');
    });
    test('th2 should be', () => {
      expect(th2.getValue()).toEqual(20);
      expect(th2.getColor()).toEqual('#222222');
    });
    test('th3 should be', () => {
      expect(th3.getValue()).toEqual(30);
      expect(th3.getColor()).toEqual('#333333');
    });
    test('Count Thresholds should be', () => {
      expect(rule.getThresholdCount()).toEqual(3);
    });
    test('Level with an object should be', () => {
      expect(rule.getTHLevel(th1)).toEqual(2);
      expect(rule.getTHLevel(th2)).toEqual(1);
      expect(rule.getTHLevel(th3)).toEqual(0);
    });

    test('Level with a value should be with invert == false', () => {
      expect(rule.getThresholdLevel(5)).toEqual(2);
      expect(rule.getThresholdLevel(25)).toEqual(1);
      expect(rule.getThresholdLevel(30)).toEqual(0);
      expect(rule.getThresholdLevel(35)).toEqual(0);
    });
    test('Level should be with invert == true', () => {
      rule.data.invert = true;
      expect(rule.getThresholdLevel(5)).toEqual(0);
      expect(rule.getThresholdLevel(25)).toEqual(1);
      expect(rule.getThresholdLevel(30)).toEqual(2);
      expect(rule.getThresholdLevel(35)).toEqual(2);
      rule.data.invert = false;
    });
    test('Colors should be with invert == false', () => {
      rule.invertThesholds();
      expect(th1.getColor()).toEqual('#333333');
      expect(th2.getColor()).toEqual('#222222');
      expect(th3.getColor()).toEqual('#111111');
      rule.invertThesholds();
      expect(th1.getColor()).toEqual('#111111');
      expect(th2.getColor()).toEqual('#222222');
      expect(th3.getColor()).toEqual('#333333');
    });
    test('should be after Add a new TH', () => {
      let thbis = rule.addThreshold();
      expect(thbis.getValue()).toEqual(30);
      expect(thbis.getColor()).toEqual('#333333');
      thbis = rule.addThreshold(0);
      expect(thbis.getValue()).toEqual(20);
      expect(thbis.getColor()).toEqual('#222222');
      thbis = rule.addThreshold(2);
      expect(thbis.getValue()).toEqual(25);
      expect(thbis.getColor()).toEqual('#2b2b2b');
    });
  });
  describe('on StringTHs', () => {
    const rule = new Rule('/.*/', Rule.getDefaultData());
    rule.data.type = 'string';
    let th1 = rule.addThreshold(undefined, '#111111', 'Error');
    let th2 = rule.addThreshold(undefined, '#222222', '/.*warning.*/');
    let th3 = rule.addThreshold(undefined, '#333333', '/.*ok.*/');
    test('th1 should be', () => {
      expect(th1.getValue()).toEqual('Error');
      expect(th1.getColor()).toEqual('#111111');
    });
    test('th2 should be', () => {
      expect(th2.getValue()).toEqual('/.*warning.*/');
      expect(th2.getColor()).toEqual('#222222');
    });
    test('th3 should be', () => {
      expect(th3.getValue()).toEqual('/.*ok.*/');
      expect(th3.getColor()).toEqual('#333333');
    });
    test('Count Thresholds should be', () => {
      expect(rule.getThresholdCount()).toEqual(3);
    });
    test('Level should be with invert == false', () => {
      expect(rule.getThresholdLevel('Losc')).toEqual(2);
      expect(rule.getThresholdLevel(undefined)).toEqual(2);
      expect(rule.getThresholdLevel('This is a warning')).toEqual(1);
      expect(rule.getThresholdLevel('All is ok')).toEqual(0);
    });
    test('Level should be with invert == true', () => {
      rule.data.invert = true;
      expect(rule.getThresholdLevel('Losc')).toEqual(0);
      expect(rule.getThresholdLevel(undefined)).toEqual(0);
      expect(rule.getThresholdLevel('This is a warning')).toEqual(1);
      expect(rule.getThresholdLevel('All is ok')).toEqual(2);
      rule.data.invert = false;
    });
    test('Colors should be with invert == false', () => {
      rule.invertThesholds();
      expect(th1.getColor()).toEqual('#333333');
      expect(th2.getColor()).toEqual('#222222');
      expect(th3.getColor()).toEqual('#111111');
      rule.invertThesholds();
      expect(th1.getColor()).toEqual('#111111');
      expect(th2.getColor()).toEqual('#222222');
      expect(th3.getColor()).toEqual('#333333');
    });
    test('should be after Add a new TH', () => {
      let thbis = rule.addThreshold();
      expect(thbis.getValue()).toEqual('/.*ok.*/');
      expect(thbis.getColor()).toEqual('#333333');
      thbis = rule.addThreshold(0);
      expect(thbis.getValue()).toEqual('/.*warning.*/');
      expect(thbis.getColor()).toEqual('#222222');
      thbis = rule.addThreshold(2);
      expect(thbis.getValue()).toEqual('/.*warning.*/');
      expect(thbis.getColor()).toEqual('#2b2b2b');
    });
  });
});
