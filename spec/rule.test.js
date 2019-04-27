import Rule from '../src/rule_class';

// const modeleRule = {
//   data: {
//     aggregation: 'current',
//     alias: 'No name',
//     colorOn: 'a',
//     colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
//     dateFormat: 'YYYY-MM-DD HH:mm:ss',
//     decimals: 2,
//     invert: false,
//     linkData: [],
//     linkProp: 'id',
//     mappingType: 1,
//     pattern: '/.*/',
//     rangeData: [],
//     sanitize: false,
//     shapeData: [],
//     shapeProp: 'id',
//     style: 'fillColor',
//     textData: [],
//     textOn: 'wmd',
//     linkOn: "a",
//     textPattern: '/.*/',
//     textProp: 'id',
//     textReplace: 'content',
//     thresholds: [],
//     type: 'number',
//     unit: 'short',
//     valueData: [],
//   },
//   linkMaps: [],
//   rangeMaps: [],
//   shapeMaps: [],
//   textMaps: [],
//   valueMaps: [],
// };

const series = [
  {
    datapoints: [
      [87.2288864455515, 1553029068638],
      [87.3044867732176, 1553029069138],
      [87.41570847045853, 1553029069638],
    ],
    label: 'A-series',
    id: 'A-series',
    alias: 'A-series',
    aliasEscaped: 'A-series',
    bars: {},
    stats: {
      total: 50819.34737192067,
      max: 90.15954449591173,
      min: 78.19373234740918,
      logmin: 78.19373234740918,
      avg: 84.69891228653445,
      current: 79.17554249669148,
      first: 87.2288864455515,
      delta: 12316.4939445703,
      diff: -8.053343948860018,
      range: 11.96581214850255,
      timeStep: 500,
      count: 600,
    },
    legend: true,
    hasMsResolution: true,
    allIsNull: false,
    allIsZero: false,
    flotpairs: [
      [1553029068638, 87.2288864455515],
      [1553029069138, 87.3044867732176],
      [1553029069638, 87.41570847045853],
    ],
  },
];

describe('Rule', () => {
  const data = {};
  const rule = new Rule('/.*/', data);
  test('Should be equals', () => {
    // expect(rule).toEqual(modeleRule);
    expect(rule.getData()).toMatchSnapshot();
  });
});

describe('Level', () => {
  const data = {};
  const rule = new Rule('/.*/', data);
  test('In order', () => {
    rule.data.thresholds = [50, 80];
    expect(rule.data.invert).toBeFalsy();
    expect(rule.getThresholdLevel(25)).toBe(2);
    expect(rule.getThresholdLevel(60)).toBe(1);
    expect(rule.getThresholdLevel(90)).toBe(0);
  });

  test('Invert', () => {
    rule.invertColorOrder();
    expect(rule.data.invert).toBeTruthy();
    expect(rule.getThresholdLevel(25)).toBe(0);
    expect(rule.getThresholdLevel(60)).toBe(1);
    expect(rule.getThresholdLevel(90)).toBe(2);
  });
});

describe('Colors', () => {
  const data = {};
  const rule = new Rule('/.*/', data);
  rule.data.thresholds = [50, 80];
  test('Each colors', () => {
    expect(rule.getColorForValue(25)).toBe('rgba(245, 54, 54, 0.9)');
    expect(rule.getColorForValue(60)).toBe('rgba(237, 129, 40, 0.89)');
    expect(rule.getColorForValue(90)).toBe('rgba(50, 172, 45, 0.97)');
  });
});

describe('Colorize', () => {
  const data = {};
  const rule = new Rule('/.*/', data);
  rule.data.thresholds = [50, 80];

  test('toColorize always ERR should be true', () => {
    rule.data.colorOn = 'a';
    expect(rule.toColorize(25)).toBeTruthy();
  });
  test('toColorize always WARN should be true', () => {
    rule.data.colorOn = 'a';
    expect(rule.toColorize(60)).toBeTruthy();
  });
  test('toColorize always OK should be true', () => {
    rule.data.colorOn = 'a';
    expect(rule.toColorize(90)).toBeTruthy();
  });

  test('toColorize Warn/err ERR should be true', () => {
    rule.data.colorOn = 'wc';
    expect(rule.toColorize(25)).toBeTruthy();
  });
  test('toColorize Warn/err WARN should be true', () => {
    rule.data.colorOn = 'wc';
    expect(rule.toColorize(60)).toBeTruthy();
  });
  test('toColorize Warn/err OK should be false', () => {
    rule.data.colorOn = 'wc';
    expect(rule.toColorize(90)).toBeFalsy();
  });
});

describe('Shape', () => {
  const pattern = '/.*Toto.*/';
  test('addshape & remove', () => {
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.addShapeMap(pattern);
    expect(rule.getShapeMaps().length).toBe(1);
    expect(rule.data.shapeData.length).toBe(1);
    rule.removeShapeMap(0);
    expect(rule.getShapeMaps().length).toBe(0);
    expect(rule.data.shapeData.length).toBe(0);
  });

  test('Match on one', () => {
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.addShapeMap(pattern);
    const sm = rule.getShapeMap(0);
    sm.match('Toto');
    expect(sm.match('Toto')).toBeTruthy();
  });

  test('Match on all', () => {
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.addShapeMap(pattern);
    expect(rule.matchShape('Toto')).toBeTruthy();
    expect(rule.matchShape('Tata')).toBeFalsy();
  });
});

describe('Text', () => {
  const pattern = '/.*Toto.*/';

  test('addshape & remove', () => {
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.addTextMap(pattern);
    expect(rule.getTextMaps().length).toBe(1);
    rule.removeTextMap(0);
    expect(rule.getTextMaps().length).toBe(0);
  });

  test('Match on one', () => {
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.addTextMap(pattern);
    const sm = rule.getTextMap(0);
    expect(sm.match('Toto')).toBeTruthy();
  });

  test('Match on all', () => {
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.addTextMap(pattern);
    expect(rule.matchText('Toto')).toBeTruthy();
    expect(rule.matchText('Tata')).toBeFalsy();
  });
});

describe('Link', () => {
  const pattern = '/.*Toto.*/';
  test('addshape & remove', () => {
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.addLinkMap(pattern);
    expect(rule.getLinkMaps().length).toBe(1);
    expect(rule.data.linkData.length).toBe(1);
    rule.removeLinkMap(0);
    expect(rule.getLinkMaps().length).toBe(0);
  });

  test('Match on one', () => {
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.addLinkMap(pattern);
    const sm = rule.getLinkMap(0);
    expect(sm.match('Toto')).toBeTruthy();
  });

  test('Match on all', () => {
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.addLinkMap(pattern);
    expect(rule.matchLink('Toto')).toBeTruthy();
    expect(rule.matchLink('Tata')).toBeFalsy();
  });
});

describe('ValueMap', () => {
  test('addshape & remove', () => {
    const data = {};
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
    const data = {};
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
    const data = {};
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
    const data = {};
    const rule = new Rule('/.*/', data);
    rule.data.mappingType = 2;
    rule.data.type = 'string';
    rule.addRangeMap(0, 5, 'Between 0 and 5');
    rule.addRangeMap(6, 10, 'Between 6 and 10');
    expect(rule.getFormattedValue(3)).toBe('Between 0 and 5');
    expect(rule.getFormattedValue(7)).toBe('Between 6 and 10');
    expect(rule.getFormattedValue(12)).toBe('12');
  });
});

describe('Series', () => {
  const data = {};
  const rule = new Rule('/.*/', data);
  const serie = series[0];
  test('matchSerie', () => {
    expect(rule.matchSerie(serie)).toBeTruthy();
  });

  test('Values', () => {
    expect(rule.getValueForSerie(serie)).toBe(79.17554249669148);
  });

  test('Formatted Values', () => {
    const value = rule.getValueForSerie(serie);
    expect(rule.getFormattedValue(value)).toBe('79.18');
  });

  test('Change aggregation to max', () => {
    rule.data.aggregation = 'max';
    expect(rule.getValueForSerie(serie)).toBe(90.15954449591173);
  });
});

describe('Text replace', () => {
  const data = {};
  const rule = new Rule('/.*/', data);
  const text = 'This is my value';
  const patternText = '/value/';
  const formattedValue = rule.getFormattedValue(12.34);
  test('All content', () => {
    expect(rule.getReplaceText(text, formattedValue)).toBe('12.34');
  });
  test('pattern', () => {
    rule.data.textReplace = 'textReplace';
    rule.data.textPattern = patternText;
    expect(rule.getReplaceText('This is my value', formattedValue)).toBe('This is my 12.34');
  });
});
