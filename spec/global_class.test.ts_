import { $GF, GFTimer, GFVariables } from '../src/globals_class';
import { GFDrawio } from '../src/drawio_base';

const $scope = require('$scope');
const templateSrv = {};
const dashboard = {};
const ctrl = require('ctrl');
const $gf = $GF.create($scope, templateSrv, dashboard, ctrl);

describe('Test Global $GF utils', () => {
  describe('utils ID', () => {
    test('Should not Nan', () => {
      expect($GF.genUid()).not.toBeNaN();
    });
    test('Should should be uniq', () => {
      expect($GF.genUid()).not.toBe($GF.genUid());
    });
  });

  // Test if eval javascript works
  describe('Secure Eval', () => {
    let variables;
    beforeAll(() => {
      variables = GFVariables.create();
    });
    afterAll(() => {
      variables = GFVariables.create();
    });
    it('should be enable to understand Math Lib', () => {
      expect(variables.eval('Math.random()')).toBeGreaterThan(0);
      expect(variables.eval('Math.random() * 100')).toBeLessThanOrEqual(101);
    });
    it('should be eval simple operation 2+2', () => {
      expect(variables.eval('2+2')).toBe(4);
    });
  });

  // Test if globalvariables
  describe('Variables', () => {
    let variables, key, value, text_entry, text_result;
    beforeEach(() => {
      key = '_value';
      value = 12345;
      text_entry = 'My text is ${_value} at this time';
      text_result = 'My text is 12345 at this time';
      variables = GFVariables.create();
    });
    beforeEach(() => {
      variables.clear();
    });
    test('Should be not null', () => {
      expect(variables).not.toBe(undefined);
      expect(variables).toMatchSnapshot();
      expect(variables.get(key)).toBe(undefined);
    });

    test('Should be null for key ' + key, () => {
      expect(variables.get(key)).toBe(undefined);
    });
    test('Should be not null for key ' + key, () => {
      variables.set(key, value);
      expect(variables.get(key)).not.toBe(undefined);
      expect(variables.get(key)).toBe(value);
    });

    test('should be a list', () => {
      variables.set(key, value);
      expect(variables.keys()).toStrictEqual(['_value']);
    });

    test('should be a list ${}', () => {
      variables.set(key, value);
      expect(variables.getVarsNames()).toStrictEqual(['${_value}']);
    });

    test('Remplace text with variable', () => {
      variables.set(key, value);
      expect(variables.replaceText(text_entry)).toBe(text_result);
    });

    test('should be evaluate', () => {
      variables.set(key, value);
      expect(variables.eval('${_value}*2')).toBe(24690);
    });

    test('Should be null after remove key ' + key, () => {
      variables.unset(key);
      expect(variables.get(key)).toBe(undefined);
    });

    test('Static should ', () => {
      expect(GFVariables.getAvailableLocalVarNames()).toMatchSnapshot();
    });
  });

  // Test if GFTimer works
  describe('GFTimer tests', () => {
    let myTimer: GFTimer;
    beforeEach(() => {
      myTimer = GFTimer.create();
    });
    afterEach(() => {
      GFTimer.stop();
    });

    test('Search timer', () => {
      expect(GFTimer.get(myTimer.getUid())).not.toBeNull();
      expect(GFTimer.get(myTimer.getUid())).toMatchObject(myTimer);
    });

    test('Stop GFTimer with object', () => {
      GFTimer.stop(myTimer);
      expect(GFTimer.get(myTimer.getUid())).toBeNull();
    });

    test('Stop GFTimer with uid', () => {
      GFTimer.stop(myTimer.uid);
      expect(GFTimer.get(myTimer.uid)).toBeNull();
    });

    describe('Test callback', () => {
      let step = 0;
      let pauseTime = 500;
      let stepTime = 100;
      const myfunc = () => {
        step += 1;
      };
      beforeEach(() => {
        step = 0;
      });
      test('With 3 adds', async () => {
        myTimer.addStep(myfunc.bind(this), stepTime);
        myTimer.addStep(myfunc.bind(this), stepTime);
        myTimer.addStep(myfunc.bind(this), stepTime);
        myTimer.start();
        await new Promise((r) => setTimeout(r, pauseTime));
        expect(step).toEqual(3);
        expect(myTimer.isFinished()).toBeTruthy();
      });
      test('With 3 iterations', async () => {
        myTimer.addStep(myfunc.bind(this), stepTime);
        myTimer.setIteration(3);
        expect(step).toEqual(0);
        myTimer.start();
        await new Promise((r) => setTimeout(r, pauseTime));
        expect(step).toEqual(3);
        expect(myTimer.isFinished()).toBeTruthy();
      });
      test('With cycle', async () => {
        myTimer.addStep(myfunc.bind(this), stepTime);
        myTimer.setCyclic(true);
        let currentStep = step;
        expect(currentStep).toEqual(0);
        myTimer.start();
        await new Promise((r) => setTimeout(r, pauseTime));
        expect(step).toBeGreaterThan(currentStep);
        currentStep = step;
        await new Promise((r) => setTimeout(r, pauseTime));
        expect(step).toBeGreaterThan(currentStep);
        expect(myTimer.isFinished()).toBeFalsy();
        GFTimer.stop(myTimer);
        currentStep = step;
        expect(myTimer.isFinished()).toBeTruthy();
        expect(currentStep).toEqual(step);
      });
    });

    describe('test async start', () => {
      let step = 0;
      let pauseTime = 5000;
      let stepTime = 100;
      const fn = () => {
        step += 1;
      };
      test('start with no wait', () => {
        myTimer.addStep(fn.bind(this), stepTime);
        const pr = myTimer.start();
        expect(step).toBe(0);
        expect(myTimer.isFinished()).toBeFalsy();
        pr.then(() => {
          expect(step).toBe(1);
          expect(myTimer.isFinished()).toBeTruthy();
        });
      });
      test.skip('start with wait', async () => {
        myTimer.addStep(fn.bind(this), stepTime);
        await myTimer.start();
        expect(step).toBe(1);
      });
    });
  });
});
