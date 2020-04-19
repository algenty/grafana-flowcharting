import { GFState } from '../src/state_class';

describe.skip('States', () => {
  const xgraph: any = undefined;
  const mxcell: any = {
    id : "1234"
  };
  describe('GFState', () => {
    const gf = new GFState(xgraph, mxcell);
    const key1 ='key1';
    const key2 ='key2';
    test('should be new', () => {
      expect(gf).not.toBeNaN();
      expect(gf).toMatchSnapshot();
    });
    test('Add Key', () => {
      gf.addValue(key1,0);
      expect(gf.getOriginalValue(key1)).toBe(0);
      expect(gf.isChanged(key1)).toBe(false);
      expect(gf.isMatched(key1)).toBe(false);
      expect(gf.getLevel(key1)).toBe(GFState.DEFAULTLEVEL);
      expect(gf.getLevel()).toBe(GFState.DEFAULTLEVEL);
    });
    test('Match key1 Level: 1 Value: 10', () => {
      gf.set(key1,10,1);
      expect(gf.isMatched(key1)).toBe(true);
      expect(gf.getMatchValue(key1)).toBe(10);
      expect(gf.isMatched(key1)).toBe(true);
      expect(gf.isMatched()).toBe(true);
      expect(gf.isChanged()).toBe(false);
      expect(gf.getLevel(key1)).toBe(1);
      expect(gf.getLevel()).toBe(1);
    });
    test('Match key1 Level: 0 Value: 20', () => {
      gf.set(key1,10,1);
      expect(gf.isMatched(key1)).toBe(true);
      expect(gf.getMatchValue(key1)).toBe(10);
      expect(gf.isMatched(key1)).toBe(true);
      expect(gf.isMatched()).toBe(true);
      expect(gf.isChanged()).toBe(false);
      expect(gf.getLevel(key1)).toBe(1);
      expect(gf.getLevel()).toBe(1);
    });
    test('Match key1 Level: 2 Value: 30', () => {
      gf.set(key1,30,2);
      expect(gf.isMatched(key1)).toBe(true);
      expect(gf.getMatchValue(key1)).toBe(30);
      expect(gf.isMatched(key1)).toBe(true);
      expect(gf.isMatched()).toBe(true);
      expect(gf.isChanged()).toBe(false);
      expect(gf.getLevel(key1)).toBe(2);
      expect(gf.getLevel()).toBe(2);
    });
    test('Match key2 Level: 3 Value: 100', () => {
      gf.set(key2,100,3);
      expect(gf.isMatched(key2)).toBe(true);
      expect(gf.getMatchValue(key2)).toBe(100);
      expect(gf.isMatched(key2)).toBe(true);
      expect(gf.isMatched()).toBe(true);
      expect(gf.isChanged()).toBe(false);
      expect(gf.getLevel(key1)).toBe(2);
      expect(gf.getLevel(key2)).toBe(3);
      expect(gf.getLevel()).toBe(3);
    });
    test('Apply key1', () => {
      gf.apply(key1);
      expect(gf.isChanged(key1)).toBe(true);
      expect(gf.isChanged(key2)).toBe(false);
      expect(gf.isMatched(key1)).toBe(false);
    });
    test('Apply()', () => {
      gf.apply();
      expect(gf.isChanged(key1)).toBe(false);
      expect(gf.isChanged(key2)).toBe(true);
      expect(gf.isChanged()).toBe(true);
      expect(gf.isMatched()).toBe(false);
    });
  });
});
