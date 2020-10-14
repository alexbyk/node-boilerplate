const common = {
  transform: { "^.+\\.tsx?$": "ts-jest" },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["./src/test/setup.ts"],
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^@app/(.*)": "<rootDir>/src/$1",
  },
};

function reStr(...types) {
  return `\\.(${types.join("|")})\\.(js|ts)$`;
}

module.exports = {
  projects: [
    {
      // spec.ts or test.ts files in 'src' dir
      ...common,
      displayName: "unit",
      testRegex: reStr("spec", "test"),
    },
  ],

  verbose: false,
};
