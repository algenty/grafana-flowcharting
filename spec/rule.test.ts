import { Rule } from '../src/rule_class';

describe('Rule', () => {
  const data = Rule.getDefaultData();

  describe('New', () => {
    const rule = new Rule('/.*/', data);
    test('Should be equals', () => {
      expect(rule.getData()).toMatchSnapshot();
    });
  });

  describe('Level', () => {
    const rule = new Rule('/.*/', data);
    test('In order', () => {
      rule.data.thresholds = [50, 80];
      expect(rule.data.invert).toBeFalsy();
      expect(rule.getThresholdLevel(25)).toBe(2);
      expect(rule.getThresholdLevel(60)).toBe(1);
      expect(rule.getThresholdLevel(90)).toBe(0);
    });

    test('Invert', () => {
      rule.invertThesholds();
      expect(rule.data.invert).toBeTruthy();
      expect(rule.getThresholdLevel(25)).toBe(0);
      expect(rule.getThresholdLevel(60)).toBe(1);
      expect(rule.getThresholdLevel(90)).toBe(2);
    });
  });

  describe('Colors', () => {
    const rule = new Rule('/.*/', data);
    rule.data.thresholds = [50, 80];
    test('Each colors', () => {
      expect(rule.getColorForValue(25)).toBe('rgba(50, 172, 45, 0.97)');
      expect(rule.getColorForValue(60)).toBe('rgba(237, 129, 40, 0.89)');
      expect(rule.getColorForValue(90)).toBe('rgba(245, 54, 54, 0.9)');
    });
    test('Each colors', () => {
      rule.invertThesholds();
      expect(rule.getColorForValue(25)).toBe('rgba(245, 54, 54, 0.9)');
      expect(rule.getColorForValue(60)).toBe('rgba(237, 129, 40, 0.89)');
      expect(rule.getColorForValue(90)).toBe('rgba(50, 172, 45, 0.97)');
    });
  });

  describe('Shape', () => {
    const pattern = '/.*Toto.*/';

    describe('Create', () => {
      test.skip('addshape & remove', () => {
        const rule = new Rule('/.*/', data);
        rule.addShapeMap(pattern);
        expect(rule.getShapeMaps().length).toBe(1);
        expect(rule.data.shapeData.length).toBe(1);
        rule.removeShapeMap(0);
        expect(rule.getShapeMaps().length).toBe(0);
        expect(rule.data.shapeData.length).toBe(0);
      });
    });

    describe('Match', () => {
      test('Match on one', () => {
        const rule = new Rule('/.*/', data);
        rule.addShapeMap(pattern);
        const sm = rule.getShapeMap(0);
        sm.match('Toto');
        expect(sm.match('Toto')).toBeTruthy();
      });

      test('Match on all', () => {
        const rule = new Rule('/.*/', data);
        rule.addShapeMap(pattern);
        expect(rule.matchShape('Toto')).toBeTruthy();
        expect(rule.matchShape('Tata')).toBeFalsy();
      });
    });

    describe('Colorize', () => {
      const rule = new Rule('/.*/', data);
      rule.data.thresholds = [50, 80];
      const shape = rule.addShapeMap(pattern);

      test('toColorize always ERR should be true', () => {
        shape.data.colorOn = 'a';
        expect(shape.toColorize(1)).toBeTruthy();
      });
      test('toColorize Warn/err ERR should be true', () => {
        shape.data.colorOn = 'wc';
        expect(shape.toColorize(0)).toBeFalsy();
      });
      test('toColorize Warn/err WARN should be true', () => {
        shape.data.colorOn = 'wc';
        expect(shape.toColorize(1)).toBeTruthy();
      });
      test('toColorize Warn/err OK should be false', () => {
        shape.data.colorOn = 'wc';
        expect(shape.toColorize(2)).toBeTruthy();
      });
    });
  });

  describe('Text', () => {
    const pattern = '/.*Toto.*/';

    test('addshape & remove', () => {
      const rule = new Rule('/.*/', data);
      rule.addTextMap(pattern);
      expect(rule.getTextMaps().length).toBe(1);
      rule.removeTextMap(0);
      expect(rule.getTextMaps().length).toBe(0);
    });

    test('Match on one', () => {
      const rule = new Rule('/.*/', data);
      rule.addTextMap(pattern);
      const sm = rule.getTextMap(0);
      expect(sm.match('Toto')).toBeTruthy();
    });

    test('Match on all', () => {
      const rule = new Rule('/.*/', data);
      rule.addTextMap(pattern);
      expect(rule.matchText('Toto')).toBeTruthy();
      expect(rule.matchText('Tata')).toBeFalsy();
    });
  });

  describe('Link', () => {
    const pattern = '/.*Toto.*/';
    test('addshape & remove', () => {
      const rule = new Rule('/.*/', data);
      rule.addLinkMap(pattern);
      expect(rule.getLinkMaps().length).toBe(1);
      expect(rule.data.linkData.length).toBe(1);
      rule.removeLinkMap(0);
      expect(rule.getLinkMaps().length).toBe(0);
    });

    test('Match on one', () => {
      const rule = new Rule('/.*/', data);
      rule.addLinkMap(pattern);
      const sm = rule.getLinkMap(0);
      expect(sm.match('Toto')).toBeTruthy();
    });

    test('Match on all', () => {
      const rule = new Rule('/.*/', data);
      rule.addLinkMap(pattern);
      expect(rule.matchLink('Toto')).toBeTruthy();
      expect(rule.matchLink('Tata')).toBeFalsy();
    });
  });

  describe('ValueMap', () => {
    test('addshape & remove', () => {
      const rule = new Rule('/.*/', data);
      rule.data.mappingType = 1;
      rule.addValueMap(1, 'This 1');
      expect(rule.getValueMaps().length).toBe(1);
      expect(rule.data.valueData.length).toBe(1);
      rule.addValueMap(2, 'This 2');
      expect(rule.getValueMaps().length).toBe(2);
      expect(rule.data.valueData.length).toBe(2);
    });

    test('Mapping values', () => {
      const rule = new Rule('/.*/', data);
      rule.data.mappingType = 1;
      rule.data.type = 'string';
      rule.addValueMap(1, 'This 1');
      rule.addValueMap(2, 'This 2');
      expect(rule.getFormattedValue(1)).toBe('This 1');
      expect(rule.getFormattedValue(2)).toBe('This 2');
      expect(rule.getFormattedValue(3)).toBe('3');
    });
  });

  describe('RangeMap', () => {
    test('addshape & remove', () => {
      const rule = new Rule('/.*/', data);
      rule.data.mappingType = 2;
      rule.data.type = 'string';
      rule.addRangeMap(0, 5, 'Between 0 and 5');
      expect(rule.getRangeMaps().length).toBe(1);
      expect(rule.data.rangeData.length).toBe(1);
      rule.addRangeMap(6, 10, 'Between 6 and 10');
      expect(rule.getRangeMaps().length).toBe(2);
      expect(rule.data.rangeData.length).toBe(2);
    });

    test('Mapping values', () => {
      const rule = new Rule('/.*/', data);
      rule.data.mappingType = 2;
      rule.data.type = 'string';
      rule.addRangeMap(0, 5, 'Between 0 and 5');
      rule.addRangeMap(6, 10, 'Between 6 and 10');
      expect(rule.getFormattedValue(3)).toBe('Between 0 and 5');
      expect(rule.getFormattedValue(7)).toBe('Between 6 and 10');
      expect(rule.getFormattedValue(12)).toBe('12');
    });

    //TODO: Fix It
    test('Mapping values upper and lower', () => {
      const rule = new Rule('/.*/', data);
      rule.data.mappingType = 2;
      rule.data.type = 'string';
      rule.addRangeMap(undefined, 33, 'Lower than 33');
      rule.addRangeMap(33, 66, 'Between 33 and 66');
      rule.addRangeMap(66, undefined, 'Upper than 66');
      expect(rule.getFormattedValue(10)).toBe('Lower than 33');
      expect(rule.getFormattedValue(50)).toBe('Between 33 and 66');
      expect(rule.getFormattedValue(80)).toBe('Upper than 66');
    });
  });

  describe('Text replace', () => {
    const data = Rule.getDefaultData();
    const rule = new Rule('/.*/', data);
    const text = 'This is my value';
    const patternText = '/value/';
    const formattedValue = '12.34';
    const tm = rule.addTextMap('');
    test('All content', () => {
      expect(tm.getReplaceText(text, formattedValue)).toBe('12.34');
    });
    test('pattern', () => {
      tm.data.textReplace = 'pattern';
      tm.data.textPattern = patternText;
      expect(tm.getReplaceText('This is my value', formattedValue)).toBe('This is my 12.34');
    });
  });
});
