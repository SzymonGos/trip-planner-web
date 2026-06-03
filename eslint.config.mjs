import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: [
      '**/.keystone/**',
      '**/.next/**',
      '**/genqlTypes/**',
      '**/schema.graphql/**',
      '**/schema.prisma/**',
      'modules/graphql-types/src/**',
      '.vscode',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.config({
    extends: ['next', 'prettier'],
    settings: {
      next: {
        rootDir: 'apps/web/',
      },
    },
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  }),
];
