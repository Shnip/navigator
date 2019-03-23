module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  "transform": {
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform",
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
  'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  "transformIgnorePatterns": [
      "/node_modules/(?!test-component).+\\.js$"
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
}
