module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    jsx: true,
    useJSXTextNode: true
  },
  extends: [
    "eslint:recommended",
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
    },
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint", "stencil"],

  rules: {}
};
