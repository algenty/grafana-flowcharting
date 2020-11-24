import { NumberTH, StringTH } from '../src/threshold_class';
import { Rule } from '../src/rule_class';
import {$GF} from '../src/globals_class';

describe('Thresholds', () => {

    describe('NumberTH', () => {
        const data = NumberTH.getDefaultData();
        test('Data should be new', () => {
            expect(data).not.toBeNaN();
            expect(data).toMatchSnapshot();
        });
        test('Matched value for 100', () => {
            let tn1 = new NumberTH("Color1",50,$GF.CONSTANTS.COMP_GE,NumberTH.getDefaultData());
            let tn2 = new NumberTH("Color2",80,$GF.CONSTANTS.COMP_GT,NumberTH.getDefaultData());
            let tn3 = new NumberTH("Color3",100,$GF.CONSTANTS.COMP_GE,NumberTH.getDefaultData());
            let value = 100;
            expect(tn1.match(value)).toBeTruthy();
            expect(tn2.match(value)).toBeTruthy();
            expect(tn3.match(value)).toBeTruthy();
        });
        
        test('Matched value for 80', () => {
            let tn1 = new NumberTH("Color1",50,$GF.CONSTANTS.COMP_GE,NumberTH.getDefaultData());
            let tn2 = new NumberTH("Color2",80,$GF.CONSTANTS.COMP_GT,NumberTH.getDefaultData());
            let tn3 = new NumberTH("Color3",100,$GF.CONSTANTS.COMP_GE,NumberTH.getDefaultData());
            let value = 80;
            expect(tn1.match(value)).toBeTruthy();
            expect(tn2.match(value)).toBeFalsy();
            expect(tn3.match(value)).toBeFalsy();
        });
        test('Matched value for 20', () => {
            let tn1 = new NumberTH("Color1",50,$GF.CONSTANTS.COMP_GE,NumberTH.getDefaultData());
            let tn2 = new NumberTH("Color2",80,$GF.CONSTANTS.COMP_GT,NumberTH.getDefaultData());
            let tn3 = new NumberTH("Color3",100,$GF.CONSTANTS.COMP_GE,NumberTH.getDefaultData());
            let value = 20;
            expect(tn1.match(value)).toBeFalsy();
            expect(tn2.match(value)).toBeFalsy();
            expect(tn3.match(value)).toBeFalsy();
        });
    });

    describe('StringTH', () => {
        test('Data should be new', () => {
            const data = StringTH.getDefaultData();
            expect(data).not.toBeNaN();
            expect(data).toMatchSnapshot();
        });
        test('Matched value for every things', () => {
            let tn1 = new StringTH("Color1","/.*/",$GF.CONSTANTS.COMP_EQ,StringTH.getDefaultData());
            let tn2 = new StringTH("Color2","/.*/",$GF.CONSTANTS.COMP_NE,StringTH.getDefaultData());
            let value = 'toto';
            expect(tn1.match(value)).toBeTruthy();
            expect(tn2.match(value)).toBeFalsy();
        });

        test('Matched value for specific string', () => {
            let tn1 = new StringTH("Color1","toto",$GF.CONSTANTS.COMP_EQ,StringTH.getDefaultData());
            let tn2 = new StringTH("Color2","tata",$GF.CONSTANTS.COMP_NE,StringTH.getDefaultData());
            let value = 'toto';
            expect(tn1.match(value)).toBeTruthy();
            expect(tn2.match(value)).toBeTruthy();
        });

    });

    describe('Thresholds Handler', () => {
        const rule = new Rule('/.*/', Rule.getDefaultData());
        
        describe('NumberTHs', () => {
            let th1 = rule.addThreshold(undefined, "COLOR1", 10);
            let th2 = rule.addThreshold(undefined, "COLOR2", 20);
            let th3 = rule.addThreshold(undefined, "COLOR3", 30);
            test.skip('th1 should be', () => {
                expect(th1.getValue()).toEqual(10);
                expect(th1.getColor()).toEqual("COLOR1");
            });
            test.skip('th2 should be', () => {
                expect(th2.getValue()).toEqual(20);
                expect(th2.getColor()).toEqual("COLOR2");
            });
            test.skip('th3 should be', () => {
                expect(th3.getValue()).toEqual(30);
                expect(th3.getColor()).toEqual("COLOR3");
            });
            test.skip('Count Thresholds should be', () => {
                expect(rule.getThresholdCount()).toEqual(3);
            });
            test.skip('Level should be with invert == false', () => {
                expect(rule.getThresholdLevel(5)).toEqual(2);
                expect(rule.getThresholdLevel(25)).toEqual(1);
                expect(rule.getThresholdLevel(30)).toEqual(0);
                expect(rule.getThresholdLevel(35)).toEqual(0);
            });
            test.skip('Level should be with invert == false', () => {
                rule.data.invert = true;
                expect(rule.getThresholdLevel(5)).toEqual(0);
                expect(rule.getThresholdLevel(25)).toEqual(1);
                expect(rule.getThresholdLevel(30)).toEqual(2);
                expect(rule.getThresholdLevel(35)).toEqual(2);
            });
            test('should be after Add a new TH', () => {
                let thbis = rule.addThreshold();
                expect(thbis.getValue()).toEqual(30);
            });
        });


    });

});