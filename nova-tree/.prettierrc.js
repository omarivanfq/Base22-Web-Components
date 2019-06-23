/**
 * Prettier config file with all the default values to make sure we are using them.
 *
 * @todo make this into a shareable as explained in
 *       https://prettier.io/docs/en/configuration.html#sharing-configurations
 *       so we can use a simple entry in the package.json file.
 */

module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: "avoid",
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "auto" // Sergio: I would highly recommend changing this settings to lf for consistency.
};
