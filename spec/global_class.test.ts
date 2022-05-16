import { $GF, GFDrawioTools, GFTimer, GFVariables } from '../src/globals_class';


const xmlGraph =
  '<mxGraphModel dx="1073" dy="521" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="arrow-1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-grafana" target="shape-love" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><object label="Grafana" href="www.google.fr" id="shape-grafana"><mxCell style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell></object><mxCell id="arrow-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-love" target="shape-mxgraph" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-love" value="loves" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="shape-mxgraph" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell><mxCell id="text-grafana" value="MyText : TextVal" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="9" y="50" width="120" height="20" as="geometry"/></mxCell><mxCell id="text-arrow1" value="Text 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="150" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow2" value="Text 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="280" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-mxgraph" value="Text 4" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="380" y="50" width="40" height="20" as="geometry"/></mxCell></root></mxGraphModel>';
const compGraph =
  '7ZfBcpswEIafxsdkANnYPiZO6h6akzttepTRAkoF65FlA336SiAMCnbGnnHSmUwvtvZfLYhvdyUYkUVWLiXdpE/IQIwCj5Uj8jAKAt+bEv1nlKpRJoHfCInkzE7qhBX/A22kVXecwdaZqBCF4htXjDDPIVKORqXEwp0Wo3DvuqGJvaPXCauIChhM+8mZSht1Fkw7/SvwJG3v7IfzxpPRdrK98DalDIueRB5HZCERVTPKygUIA6/l0sR9OeE9LExCrs4JqGnc2LCtqtonBKYf2JooVYoJ5lQ8duq9xF3OwFzG01aqMqGHvh5CydVzb/zLTLmdWOuhtBG1UbVGrmT13Dd6UcbswmqrjXsBpSpbH3SnUEvdar8hbuw6tkri70OuxkZpwRv3kFpLBHcyskh0xAZuEkljmlNbdFQmoPpugXtofIZg71oW/xIwA/0EeoIEQRXfuyVFbWUmh3ld8vTA5q82cf1iajvwBF2DaMKW/dWlEuJGLoriNkFMBNzGsnG2BTB4KrdOeiXRJdwgK1KuYLWhNZ1Ct7lbBDEXYoECZR1L4hjCKDokoudh0/na885OyB6kgvJNroddpomoXLPo+tVvmzDt9WroXZwIbdpcvNVjwf8eO7fHuiYaNlhWJuZM+aAeG+Ty9QL3VOzs1Y24HSRZSU7zpM7mZS0DPpvA9FjLzMMpoeE7tMyxJgmP9Mjs8h45AdLJZo+lfXMYtowQ+oy/HKZGOWPjYzBnwZqE7wGTjM/cca5BU69JuUdTD+ZT9V27tTYid/rXGD+oGFaqmeRAdGHlmMMrslaigie5NiNNC7R+byhx/bp0Zx0ZZ+xkC7ib3BXIz52Nf3JmGoJrpaHe7v1BFmwOhsfAp+HuT9wjNxiSH787+OAUePJ5wR+2kH8E/tQubsmPPy958or8kc3mSuS12X0V1r7etzV5/As=';

describe('Test Global $GF utils', () => {
  describe('utils ID', () => {
    test('Should not Nan', () => {
      expect($GF.genUid()).not.toBeNaN();
    });
    test('Should should be uniq', () => {
      expect($GF.genUid()).not.toBe($GF.genUid());
    });
  });

  // Test if encode/decode data from draw.io works
  describe('Encode/Decode', () => {
    test('Should Decode', () => {
      expect(GFDrawioTools.decode(compGraph)).toBe(xmlGraph);
    });
    test('Should Encode', () => {
      expect(GFDrawioTools.encode(xmlGraph)).toBe(compGraph);
    });
    test('Showld Isencoded', () => {
      expect(GFDrawioTools.isEncoded(compGraph)).toBeTruthy();
    });
    test('Showld ! Isencoded', () => {
      expect(GFDrawioTools.isEncoded(xmlGraph)).toBeFalsy();
    });
  });

  // Test if eval javascript works
  describe('Secure Eval', () => {
    let $gf: $GF;
    const $scope = jest.fn();
    const templateSrv = jest.fn();
    const dashboard = jest.fn();
    const ctrl = jest.fn();
    beforeAll(()=>{
      $gf = $GF.create($scope, templateSrv, dashboard, ctrl);
    });
    afterAll(()=>{
      $gf = $GF.create($scope, templateSrv, dashboard, ctrl);
    });
    //TODO : Fix eval
    // it('should be enable to understand Math Lib', () => {
    //   expect($gf.eval('Math.random()')).toBeGreaterThan(0);
    //   expect($gf.utils.evalIt_deprecated('Math.random() * 100')).toBeLessThanOrEqual(101);
    // });
    test('should be eval simple operation 2+2', () => {
      expect($GF.utils.evalIt_deprecated('2+2')).toBe(4);
    });
  });

  // Test if globalvariables
  describe('Variables', () => {
    // let $gf: $GF;
    // const $scope = jest.fn();
    // const templateSrv = jest.fn();
    // const dashboard = jest.fn();
    // const ctrl = jest.fn();
    const key = '_value';
    const value = 12345;
    const text_entry = 'My text is ${_value} at this time';
    const text_result = 'My text is 12345 at this time';
    let variable: GFVariables;
    beforeEach(()=>{
      // $gf = $GF.create($scope, templateSrv, dashboard, ctrl)
      variable = GFVariables.create();
    });
    beforeEach(()=>{
      // $gf = $GF.create($scope, templateSrv, dashboard, ctrl)
      variable.clear();
    });
    test('Should be not null', () => {
      expect(variable).not.toBe(undefined);
      expect(variable).toMatchSnapshot();
      expect(variable.get(key)).toBe(undefined);
    });

    test('Should be null for key ' + key, () => {
      expect(variable.get(key)).toBe(undefined);
    });
    test('Should be not null for key ' + key, () => {
      variable.set(key, value);
      expect(variable.get(key)).not.toBe(undefined);
      expect(variable.get(key)).toBe(value);
    });

    test('should be a list', () => {
      expect(variable.keys()).toStrictEqual(['_value']);
    });

    test('should be a list ${}', () => {
      expect(variable.getVarsNames()).toStrictEqual(['${_value}']);
    });

    test('Remplace text with variable', () => {
      expect(variable.replaceText(text_entry)).toBe(text_result);
    });

    test('should be evaluate', () => {
      expect(variable.eval('${_value}*2')).toBe(24690);
    });

    test('Should be null after remove key ' + key, () => {
      variable.unset(key);
      expect(variable.get(key)).toBe(undefined);
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
        })
      });
      test.skip('start with wait', async () => {
        myTimer.addStep(fn.bind(this), stepTime);
        await myTimer.start();
        expect(step).toBe(1);
      });
    });
  });
});
