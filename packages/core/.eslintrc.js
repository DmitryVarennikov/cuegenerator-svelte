module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  ignorePatterns: ['/build/**/*', '.eslintrc.js', 'jest.config.js'],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    quotes: ['warn', 'single'],
    'no-unused-vars': 1,
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      env: { jest: true },
    },
  ],
};
