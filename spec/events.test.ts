import { GFEvents } from '../src/flowcharting_base';

const signalsArray = ['number_add', 'number_sub', 'change_flag'] as const;
type TestSignals = typeof signalsArray[number];


describe('Test Flowcharting Events', () => {
  const myObj = {
    myNumber: 0,
    flag: false,
    uid: 'myUniqId',
    fnAdd: (obj) => {
      obj.myNumber += 1;
    },
    fnSub: (obj) => {
      obj.myNumber -= 1;
    },
    fnflag: (obj) => {
      obj.flag = !obj.flag;
    },
  };
  let events: GFEvents<TestSignals>;
  beforeEach(() => {
    events = new GFEvents();
    events.declare(signalsArray);
    //events.declare('number_add');
    //events.declare('number_sub');
    //events.declare('change_flag');
    myObj.flag = false;
    myObj.myNumber = 0;
  });
  afterEach(() => {
    events.clear();
  });
  describe('Number of signals', () => {
    test('Should be have 3 signals', () => {
      expect(events.countSignal()).toEqual(3);
    });
    test('should be have no signals', () => {
      events.clear();
      expect(events.countSignal()).toEqual(0);
    });
  });

  describe('Connection test', () => {
    test('Connect to be true', () => {
      expect(events.connect('number_add', myObj, myObj.fnAdd.bind(myObj))).toBeTruthy();
      expect(events.isConnected('number_add', myObj)).toBeTruthy();
      expect(events.isConnected('number_sub', myObj)).toBeFalsy();
      events.disconnect('number_add', myObj);
      expect(events.isConnected('number_add', myObj)).toBeFalsy();
    });
  });

  describe('Connection test', () => {
    test('Callback Fn must be called', () => {
      events.connect('change_flag', myObj, myObj.fnflag.bind(myObj));
      events.emit('change_flag', myObj);
      expect(myObj.flag).toBeTruthy();
      events.emit('change_flag', myObj);
      expect(myObj.flag).toBeFalsy();
    });
  });
  describe('Concurrence test with wait emit result', () => {
    const myObj2 = {
      uid: 'myUniqId2',
      fnAdd: (obj) => {
        obj.myNumber += 1;
      },
    };
    test('Number must be 2', async () => {
      events.connect('number_add', myObj, myObj.fnAdd.bind(myObj));
      events.connect('number_add', myObj2, myObj2.fnAdd.bind(myObj));
      await events.emit('number_add', myObj);
      expect(myObj.myNumber).toEqual(2);
    });
  });
  describe('Concurrence test with no wait emit result', () => {
    const pause = 3000;
    const myObj2 = {
      uid: 'myUniqId2',
      fnAdd: async (obj) => {
        await new Promise((r) => setTimeout(r, pause));
        obj.myNumber += 1;
      },
    };
    test('Number must be 2', async () => {
      let finished = false;
      events.connect('number_add', myObj, myObj.fnAdd.bind(myObj));
      events.connect('number_add', myObj2, myObj2.fnAdd.bind(myObj));
      const myPromise = events.emit('number_add', myObj);
      expect(myObj.myNumber).toEqual(1);
      await myPromise
        .then(() => {
          expect(myObj.myNumber).toEqual(2);
          finished = true;
        })
        .catch(() => {
          // Generate an error test
          expect(false).toBe(true);
        });
      expect(finished).toBeTruthy();
    });
  });
  describe('Test disconnect', () => {
    const myObj2 = {
      uid: 'myUniqId2',
      fnAdd: (obj) => {
        obj.myNumber += 1;
      },
    };
    test('Test disconnect', async () => {
      events.connect('number_add', myObj, myObj.fnAdd.bind(myObj));
      events.connect('number_add', myObj2, myObj2.fnAdd.bind(myObj));
      // 2 obj then 2 calls
      await events.emit('number_add', myObj);
      expect(myObj.myNumber).toEqual(2);
      // reset and diconnect 1 obj : Result must be 1
      myObj.myNumber = 0;
      events.disconnect('number_add', myObj2);
      await events.emit('number_add', myObj);
      expect(myObj.myNumber).toEqual(1);
    });
  });
});
