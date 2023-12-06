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
  extends: ['eslint-config-next', 'next/core-web-vitals'],
  plugins: ['import'],
  rules: {
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
            pattern: '@/{types,data}{/,}**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/public/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '{./,../,@/styles/}**.scss',
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
    indent: ['error', 2],
    'no-console': process.env.NODE_ENV === 'production'
      ? 'error'
      : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production'
      ? 'error'
      : 'warn',
    'no-unused-vars': ['warn'],
    'multiline-ternary': ['warn', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    'prefer-const': 2,
  },
};
