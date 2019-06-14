/**
 * Configuration file for eslint, we use the .js version so we can have comments
 */

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true // For the test files
  },
  extends: [
    "eslint:recommended", // Default
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:stencil/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    jsx: true,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@typescript-eslint", "stencil"],
  rules: {}
};
