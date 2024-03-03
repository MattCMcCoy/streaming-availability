/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports'
  ],
  importOrder: [
    '^(react)$',
    '^(next/(.*)$)|^(next$)|^(next-auth$)|^(next-auth/(.*)$)',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^[.]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'auto',
  bracketSpacing: true,
  proseWrap: 'always'
};

export default config;
