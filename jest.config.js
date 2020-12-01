module.exports = {
  verbose: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  roots: ['./spec'],
  moduleDirectories: ['node_modules', 'public', 'src'],
  modulePaths: ['./node_modules', './public', './src'],
  // globalSetup: '<rootDir>/spec/globalSetup.js',
  // globalTeardown: '<rootDir>/spec/globalTeardown.js',
  setupFiles: ['<rootDir>/spec/setup-jest.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    underscore$: 'lodash',
    'grafana/app/core/utils/kbn': '<rootDir>/spec/__mocks__/kbn.ts',
    'grafana/app/plugins/sdk': '<rootDir>/spec/__mocks__/sdk.ts',
    'grafana/app/core/time_series2': '<rootDir>/spec/__mocks__/time_series2.ts',
    'grafana/app/core/app_events': '<rootDir>/spec/__mocks__/app_events.ts',
  },
  // transformIgnorePatterns: ['./public/.*', './node_modules/.*', './dist/.*'],
  testRegex: '(\\.|/)(test)\\.(jsx?|tsx?)$',
  transformIgnorePatterns: ['/node_modules/(?!vue-awesome)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
