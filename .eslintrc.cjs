module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true, "vitest-globals/env": true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vitest-globals/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: '**/generated/**/*.tsx',
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-irregular-whitespace': 'off',
      },
    },
  ],
};
