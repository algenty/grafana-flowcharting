import { DateTH, NumberTH, StringTH } from '../src/threshold_class';
import { Rule } from '../src/rule_class';
import { $GF, GFCONSTANT } from '../src/globals_class';
import { default as dayjs } from 'dayjs';

const $scope = require('$scope');
const templateSrv = {};
const dashboard = {};
const ctrl = {
  notify: jest.fn(),
  clearNotify: jest.fn(),
};
const $gf = $GF.create($scope, templateSrv, dashboard, ctrl);

describe('Test thresholds', () => {
  describe('Threshold init', () => {
    describe('on NumberTH', () => {
      const data = NumberTH.getDefaultData();
      let tn1, tn2, tn3;
      beforeEach(() => {
        tn1 = new NumberTH('Color1', GFCONSTANT.COMP_GE, 50, NumberTH.getDefaultData());
        tn2 = new NumberTH('Color2', GFCONSTANT.COMP_GT, 80, NumberTH.getDefaultData());
        tn3 = new NumberTH('Color3', GFCONSTANT.COMP_GE, 100, NumberTH.getDefaultData());
      });
      test('Data should be new', () => {
        expect(data).not.toBeNaN();
        expect(data).toMatchSnapshot();
      });
      test('Matched value for 100', () => {
        let value = 100;
        expect(tn1.match(value)).toBeTruthy();
        expect(tn2.match(value)).toBeTruthy();
        expect(tn3.match(value)).toBeTruthy();
      });

      test('Matched value for 80', () => {
        let value = 80;
        expect(tn1.match(value)).toBeTruthy();
        expect(tn2.match(value)).toBeFalsy();
        expect(tn3.match(value)).toBeFalsy();
      });
      test('Matched value for 20', () => {
        let value = 20;
        expect(tn1.match(value)).toBeFalsy();
        expect(tn2.match(value)).toBeFalsy();
        expect(tn3.match(value)).toBeFalsy();
      });
    });

    describe('on StringTH', () => {
      beforeEach(() => {});
      test('Data should be new', () => {
        const data = StringTH.getDefaultData();
        expect(data).not.toBeNaN();
        expect(data).toMatchSnapshot();
      });
      test('Matched value for every things', () => {
        let tn1 = new StringTH('Color1', GFCONSTANT.COMP_EQ, '/.*/', StringTH.getDefaultData());
        let tn2 = new StringTH('Color2', GFCONSTANT.COMP_NE, '/.*/', StringTH.getDefaultData());
        let value = 'toto';
        expect(tn1.match(value)).toBeTruthy();
        expect(tn2.match(value)).toBeFalsy();
      });

      test('Matched value for specific string', () => {
        let tn1 = new StringTH('Color1', GFCONSTANT.COMP_EQ, 'toto', StringTH.getDefaultData());
        let tn2 = new StringTH('Color2', GFCONSTANT.COMP_NE, 'tata', StringTH.getDefaultData());
        let value = 'toto';
        expect(tn1.match(value)).toBeTruthy();
        expect(tn2.match(value)).toBeTruthy();
      });
    });

    describe('On DateTH', () => {
      test('dayjs format ', () => {
        expect(dayjs(new Date()).isValid()).toBeTruthy();
        expect(dayjs(1483228810000).isValid()).toBeTruthy();
        expect(dayjs('2020-11-28').isValid()).toBeTruthy();
      });

      test('Data should be new', () => {
        const data = DateTH.getDefaultData();
        expect(data).not.toBeNaN();
        expect(data).toMatchSnapshot();
      });
      test('Should be valid TH', () => {
        let td1 = new DateTH('Color1', GFCONSTANT.COMP_GE, '5d', StringTH.getDefaultData());
        expect(td1.isValidValue()).toBeTruthy();
        td1.value = '-8w';
        expect(td1.isValidValue()).toBeTruthy();
        td1.value = '1974-07-25';
        expect(td1.isValidValue()).toBeTruthy();
        td1.value = 1606586657059;
        expect(td1.isValidValue()).toBeTruthy();
      });
      test('Should be match or not with pattern', () => {
        //1606586657059
        //1606586733
        // 1day = 86400 or 86400000
        let now = new Date().getTime();
        let td2 = new DateTH('Color2', GFCONSTANT.COMP_GT, '-2d', StringTH.getDefaultData());
        let td1 = new DateTH('Color1', GFCONSTANT.COMP_GE, '-2d', StringTH.getDefaultData());
        let td3 = new DateTH('Color3', GFCONSTANT.COMP_GE, '-6d', StringTH.getDefaultData());
        expect(td1.match(now)).toBeTruthy();
        expect(td2.match(now)).toBeTruthy();
        expect(td3.match(now)).toBeTruthy();
        now = now - 86400000 * 2; // now -1d
        expect(td1.match(now)).toBeTruthy();
        expect(td2.match(now)).toBeFalsy();
        expect(td3.match(now)).toBeTruthy();
        now = now - 86400000; // now - 3d
        expect(td1.match(now)).toBeFalsy();
        expect(td2.match(now)).toBeFalsy();
        expect(td3.match(now)).toBeTruthy();
        now = now - 86400000 * 5; // before 6d
        expect(td1.match(now)).toBeFalsy();
        expect(td2.match(now)).toBeFalsy();
        expect(td3.match(now)).toBeFalsy();
      });

      test('Should be match or not with date', () => {
        let now = new Date().getTime();
        let date_2 = dayjs(now).subtract(2, 'd').format('YYYY-MM-DD');
        let date_6 = dayjs(now).subtract(6, 'd').format('YYYY-MM-DD');
        let td1 = new DateTH('Color1', GFCONSTANT.COMP_GE,  date_2,StringTH.getDefaultData());
        let td2 = new DateTH('Color2', GFCONSTANT.COMP_GT,  date_2,StringTH.getDefaultData());
        let td3 = new DateTH('Color3', GFCONSTANT.COMP_GE,  date_6,StringTH.getDefaultData());
        expect(td1.match(now)).toBeTruthy();
        expect(td2.match(now)).toBeTruthy();
        expect(td3.match(now)).toBeTruthy();
        now = now - 86400000 * 2; // now -1d
        expect(td1.match(now)).toBeTruthy();
        expect(td2.match(now)).toBeFalsy();
        expect(td3.match(now)).toBeTruthy();
        now = now - 86400000; // now - 3d
        expect(td1.match(now)).toBeFalsy();
        expect(td2.match(now)).toBeFalsy();
        expect(td3.match(now)).toBeTruthy();
        now = now - 86400000 * 5; // before 6d
        expect(td1.match(now)).toBeFalsy();
        expect(td2.match(now)).toBeFalsy();
        expect(td3.match(now)).toBeFalsy();
      });
    });
  });

  describe('Thresholds Handler', () => {
    describe('on NumberTHs', () => {
      let rule, th1, th2, th3;
      beforeEach(()=>{
        rule = new Rule($gf, '/.*/', Rule.getDefaultData());
        th1 = rule.addThreshold(0, '#111111', 10);
        th2 = rule.addThreshold(1, '#222222', 20);
        th3 = rule.addThreshold(2, '#333333', 30);
      })

      test('th1 should be', () => {
        expect(th1.value).toEqual(10);
        expect(th1.color).toEqual('#111111');
      });
      test('th2 should be', () => {
        expect(th2.value).toEqual(20);
        expect(th2.color).toEqual('#222222');
      });
      test('th3 should be', () => {
        expect(th3.value).toEqual(30);
        expect(th3.color).toEqual('#333333');
      });
      test('Count Thresholds should be', () => {
        expect(rule.getThresholdCount()).toEqual(3);
      });
      test('Level with an object should be', () => {
        expect(rule.getThresholdLevelForTH(th1)).toEqual(2);
        expect(rule.getThresholdLevelForTH(th2)).toEqual(1);
        expect(rule.getThresholdLevelForTH(th3)).toEqual(0);
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
        expect(th1.color).toEqual('#333333');
        expect(th2.color).toEqual('#222222');
        expect(th3.color).toEqual('#111111');
        rule.invertThesholds();
        expect(th1.color).toEqual('#111111');
        expect(th2.color).toEqual('#222222');
        expect(th3.color).toEqual('#333333');
      });
      test('should be after Add a new TH', () => {
        let thbis = rule.addThreshold();
        expect(thbis.value).toEqual(30);
        expect(thbis.color).toEqual('#333333');
        thbis = rule.addThreshold(0);
        expect(thbis.value).toEqual(20);
        expect(thbis.color).toEqual('#222222');
        thbis = rule.addThreshold(2);
        expect(thbis.value).toEqual(25);
        expect(thbis.color).toEqual('#2b2b2b');
      });
    });
    describe('on StringTHs', () => {
      const rule = new Rule($gf, '/.*/', Rule.getDefaultData());
      rule.data.type = 'string';
      let th1 = rule.addThreshold(undefined, '#111111', 'Error');
      let th2 = rule.addThreshold(undefined, '#222222', '/.*warning.*/');
      let th3 = rule.addThreshold(undefined, '#333333', '/.*ok.*/');
      test('th1 should be', () => {
        expect(th1.value).toEqual('Error');
        expect(th1.color).toEqual('#111111');
      });
      test('th2 should be', () => {
        expect(th2.value).toEqual('/.*warning.*/');
        expect(th2.color).toEqual('#222222');
      });
      test('th3 should be', () => {
        expect(th3.value).toEqual('/.*ok.*/');
        expect(th3.color).toEqual('#333333');
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
        expect(th1.color).toEqual('#333333');
        expect(th2.color).toEqual('#222222');
        expect(th3.color).toEqual('#111111');
        rule.invertThesholds();
        expect(th1.color).toEqual('#111111');
        expect(th2.color).toEqual('#222222');
        expect(th3.color).toEqual('#333333');
      });
      test('should be after Add a new TH', () => {
        let thbis = rule.addThreshold();
        expect(thbis.value).toEqual('/.*ok.*/');
        expect(thbis.color).toEqual('#333333');
        thbis = rule.addThreshold(0);
        expect(thbis.value).toEqual('/.*warning.*/');
        expect(thbis.color).toEqual('#222222');
        thbis = rule.addThreshold(2);
        expect(thbis.value).toEqual('/.*warning.*/');
        expect(thbis.color).toEqual('#2b2b2b');
      });
    });
  });

  describe('Import modele',()=> {
    describe('Number modele', ()=> {
      let rule,tn1, tn2, tn3;
      beforeEach(()=>{
        rule = new Rule($gf, '/.*/', Rule.getDefaultData());
        rule.dataType = 'number';
        tn1 = new NumberTH('Color1', GFCONSTANT.COMP_GE, 50, NumberTH.getDefaultData());
        tn2 = new NumberTH('Color2', GFCONSTANT.COMP_GT, 80, NumberTH.getDefaultData());
        tn3 = new NumberTH('Color3', GFCONSTANT.COMP_GE, 100, NumberTH.getDefaultData());
        rule.addThreshold().import(tn1.getData())
        rule.addThreshold().import(tn2.getData())
        rule.addThreshold().import(tn3.getData())
      });
      test('Verify init', ()=>{
        expect(rule.getThresholds().length).toBe(3);
        expect(tn1.color).toBe("Color1");
        expect(tn1.value).toBe(50);
        expect(tn1.comparator).toBe(GFCONSTANT.COMP_GE);
        expect(tn2.color).toBe("Color2");
        expect(tn2.value).toBe(80);
        expect(tn2.comparator).toBe(GFCONSTANT.COMP_GT);
        expect(tn3.color).toBe("Color3");
        expect(tn3.value).toBe(100);
        expect(tn3.comparator).toBe(GFCONSTANT.COMP_GE);
      })
      test('should be same value after import', ()=> {
        let ths = rule.getThresholds();
        expect(ths[0].color).toBe(tn1.color);
        expect(ths[0].value).toBe(tn1.value);
        expect(ths[0].comparator).toBe(tn1.comparator);
        expect(ths[1].color).toBe('Color2');
        expect(ths[1].value).toBe(80);
        expect(ths[1].comparator).toBe(GFCONSTANT.COMP_GT);
        expect(ths[2].color).toBe('Color3');
        expect(ths[2].value).toBe(100);
        expect(ths[2].comparator).toBe(GFCONSTANT.COMP_GE);
      })
    });
    describe('String modele', ()=> {
      let rule,tn1, tn2, tn3;
      beforeEach(()=>{
        rule = new Rule($gf, '/.*/', Rule.getDefaultData());
        rule.dataType = 'string';
        tn1 = new StringTH('Color1', GFCONSTANT.COMP_GE, 'A', StringTH.getDefaultData());
        tn2 = new StringTH('Color2', GFCONSTANT.COMP_GT, 'B', StringTH.getDefaultData());
        tn3 = new StringTH('Color3', GFCONSTANT.COMP_GE, 'C', StringTH.getDefaultData());
        rule.addThreshold().import(tn1.getData())
        rule.addThreshold().import(tn2.getData())
        rule.addThreshold().import(tn3.getData())
      });
      test('Verify init', ()=>{
        expect(rule.getThresholds().length).toBe(3);
        expect(tn1.color).toBe("Color1");
        expect(tn1.value).toBe('A');
        expect(tn1.comparator).toBe(GFCONSTANT.COMP_GE);
        expect(tn2.color).toBe("Color2");
        expect(tn2.value).toBe('B');
        expect(tn2.comparator).toBe(GFCONSTANT.COMP_GT);
        expect(tn3.color).toBe("Color3");
        expect(tn3.value).toBe('C');
        expect(tn3.comparator).toBe(GFCONSTANT.COMP_GE);
      })
      test('should be same value after import', ()=> {
        let ths = rule.getThresholds();
        expect(ths[0].color).toBe(tn1.color);
        expect(ths[0].value).toBe(tn1.value);
        expect(ths[0].comparator).toBe(tn1.comparator);
        expect(ths[1].color).toBe('Color2');
        expect(ths[1].value).toBe('B');
        expect(ths[1].comparator).toBe(GFCONSTANT.COMP_GT);
        expect(ths[2].color).toBe('Color3');
        expect(ths[2].value).toBe('C');
        expect(ths[2].comparator).toBe(GFCONSTANT.COMP_GE);
      })
    });
    describe('Date modele', ()=> {
      let rule,tn1, tn2, tn3;
      beforeEach(()=>{
        rule = new Rule($gf, '/.*/', Rule.getDefaultData());
        rule.dataType = 'date';
        tn1 = new DateTH('Color1', GFCONSTANT.COMP_GE, 'A', DateTH.getDefaultData());
        tn2 = new DateTH('Color2', GFCONSTANT.COMP_GT, 'B', DateTH.getDefaultData());
        tn3 = new DateTH('Color3', GFCONSTANT.COMP_GE, 'C', DateTH.getDefaultData());
        rule.addThreshold().import(tn1.getData())
        rule.addThreshold().import(tn2.getData())
        rule.addThreshold().import(tn3.getData())
      });
      test('Verify init', ()=>{
        expect(rule.getThresholds().length).toBe(3);
        expect(tn1.color).toBe("Color1");
        expect(tn1.value).toBe('A');
        expect(tn1.comparator).toBe(GFCONSTANT.COMP_GE);
        expect(tn2.color).toBe("Color2");
        expect(tn2.value).toBe('B');
        expect(tn2.comparator).toBe(GFCONSTANT.COMP_GT);
        expect(tn3.color).toBe("Color3");
        expect(tn3.value).toBe('C');
        expect(tn3.comparator).toBe(GFCONSTANT.COMP_GE);
      })
      test('should be same value after import', ()=> {
        let ths = rule.getThresholds();
        expect(ths[0].color).toBe(tn1.color);
        expect(ths[0].value).toBe(tn1.value);
        expect(ths[0].comparator).toBe(tn1.comparator);
        expect(ths[1].color).toBe('Color2');
        expect(ths[1].value).toBe('B');
        expect(ths[1].comparator).toBe(GFCONSTANT.COMP_GT);
        expect(ths[2].color).toBe('Color3');
        expect(ths[2].value).toBe('C');
        expect(ths[2].comparator).toBe(GFCONSTANT.COMP_GE);
      })
    });
  });
});
