module.exports = {
  env: {
    es2020: true,
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prefer-arrow', 'simple-import-sort'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-debugger': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'prefer-arrow/prefer-arrow-functions': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    'no-param-reassign': 'error',
    'import/prefer-default-export': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-key': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-danger': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/require-default-props': [
      'error',
      { forbidDefaultForRequired: true, ignoreFunctionalComponents: true },
    ],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
