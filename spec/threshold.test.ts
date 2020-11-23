import { NumberTH, StringTH } from '../src/threshold_class';
// import { Rule } from '../src/rule_class';
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
            let tn1 = new StringTH("Color1","/.*/",$GF.CONSTANTS.COMP_EQ,NumberTH.getDefaultData());
            let tn2 = new StringTH("Color2","/.*/",$GF.CONSTANTS.COMP_NE,NumberTH.getDefaultData());
            let value = 'toto';
            expect(tn1.match(value)).toBeTruthy();
            expect(tn2.match(value)).toBeFalsy();
        });

        test('Matched value for specific string', () => {
            let tn1 = new StringTH("Color1","toto",$GF.CONSTANTS.COMP_EQ,NumberTH.getDefaultData());
            let tn2 = new StringTH("Color2","tata",$GF.CONSTANTS.COMP_NE,NumberTH.getDefaultData());
            let value = 'toto';
            expect(tn1.match(value)).toBeTruthy();
            expect(tn2.match(value)).toBeTruthy();
        });

    });

    describe('Threshold Handler', () => {


    });

});