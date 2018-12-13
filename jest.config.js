const common = {
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./src/test/setup.ts'],
  roots: ['<rootDir>/src',],
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@app/(.*)": "<rootDir>/src/$1"
  }
};

function reStr(...types) { return `\\.(${types.join('|')})\\.(js|ts)$`; }

module.exports = {
  projects: [
    {
      // e2e.ts files in 'src' or 'e2e' dir
      ...common,
      'displayName': 'e2e',
      testRegex: reStr('e2e'),
    },

    {
      // spec.ts or test.ts files in 'src' dir
      ...common,
      'displayName': 'unit',
      testRegex: reStr('spec', 'test'),
    },

    {
      // tslint
      ...common,
      'displayName': 'tslint',
      runner: "jest-runner-tslint",
      testMatch: ["**/*.ts"],
    },
  ],


  verbose: false,
};
