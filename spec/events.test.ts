import { GFEvents } from '../src/flowcharting_base';
type TestSignals = 'number_add' | 'number_sub' | 'change_flag';

describe('Test Flowcharting Events', () => {
  const myObj = {
    myNumber: 0,
    flag: false,
    uid: 'myUniqId',
    fnAdd: (n: number) => {
      myObj.myNumber += n;
    },
    fnSub: (n: number) => {
      myObj.myNumber -= n;
    },
    fnflag: (obj) => {
      console.log('fnflag called with args', obj);
      obj.flag = !obj.flag;
    },
  };
  let events: GFEvents<TestSignals>;
  beforeEach(() => {
    events = new GFEvents();
    events.declare('number_add');
    events.declare('number_sub');
    events.declare('change_flag');
  });
  afterEach(() => {
    events.clear();
  });
  describe('Number of signals', () => {
    it('Should be have 2 signals', () => {
      expect(events.countSignal()).toEqual(3);
    });
    it('should be have no signals', () => {
      events.clear();
      expect(events.countSignal()).toEqual(0);
    });
  });

  describe('Connection test', () => {
    it('Connect to be true', () => {
      expect(events.connect('number_add', myObj, myObj.fnAdd.bind(myObj))).toBeTruthy();
      expect(events.isConnected('number_add', myObj)).toBeTruthy();
      expect(events.isConnected('number_sub', myObj)).toBeFalsy();
      events.disconnect('number_add', myObj);
      expect(events.isConnected('number_add', myObj)).toBeFalsy();
    });
  });

  describe('Connection test', () => {
    it('Callback Fn must be called', () => {
      expect(events.connect('number_add', myObj, myObj.fnflag.bind(myObj))).toBeTruthy();
      events.emit('change_flag', myObj);
      expect(myObj.flag).toBeTruthy();
      events.emit('change_flag', myObj);
      expect(myObj.flag).toBeFalsy();
    });
  });
});
