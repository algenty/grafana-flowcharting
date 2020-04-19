import plugin from '../src/plugin';


describe('Plugin', () => {
  test('Loading', () => {
    expect(plugin.data.id).toBe('agenty-flowcharting-panel');
  });
  test('Snapshot', () => {
    expect(plugin).toMatchSnapshot();
  });
  test('getRootPath', () => {
    expect(plugin.getRootPath()).tobe("public/plugins/agenty-flowcharting-panel");
  });
});
