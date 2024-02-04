/* eslint-disable perfectionist/sort-objects */
/* eslint-disable sort-keys */
module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-next',
    'next/core-web-vitals',
  ],
  plugins: ['import', 'perfectionist'],
  ignorePatterns: ['!.stylelintrc*', '!.lintstagedrc*', '!.prettierrc*'],
  rules: {
    'adjacent-overload-signatures': 'off',
    'arrow-parens': ['warn', 'as-needed'],
    'comma-dangle': ['warn', 'always-multiline'],
    'import/newline-after-import': ['warn', { count: 1, exactCount: true }],
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '{react,next}{/,}*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/{types,lib,data,utils,api}{/,}**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/context/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/components/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '{./!(*.scss),../**}',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/{assets,public}/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '{@/styles/**,./**.module.scss}',
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        warnOnUnassignedImports: true,
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    // indent: ['error', 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': ['off'],
    // 'object-curly-newline': [
    //   'warn',
    //   {
    //     ObjectExpression: { consistent: true, multiline: true },
    //     ObjectPattern: { consistent: true, multiline: true },
    //     ImportDeclaration: 'never',
    //     ExportDeclaration: { multiline: true, minProperties: 4 },
    //   },
    // ],
    'object-curly-spacing': ['warn', 'always'],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: ['return', 'export'] },
    ],
    'perfectionist/sort-enums': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-interfaces': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
        groups: ['id', 'unknown'],
        'custom-groups': {
          id: 'id',
        },
      },
    ],
    'perfectionist/sort-named-imports': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-objects': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
        'partition-by-comment': 'Part:**',
        groups: ['id', 'unknown'],
        'custom-groups': {
          id: 'id',
        },
      },
    ],
    'perfectionist/sort-object-types': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
        groups: ['id', 'unknown'],
        'custom-groups': {
          id: 'id',
        },
      },
    ],
    'perfectionist/sort-union-types': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'prefer-const': 2,
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};
