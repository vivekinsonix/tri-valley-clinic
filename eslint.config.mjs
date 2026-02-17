import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js recommended rules
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/recommended', 'prettier'),

  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'dist/**'],
  },

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      /* =====================
         GENERAL CODE QUALITY
      ====================== */
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-duplicate-imports': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'consistent-return': 'error',

      /* =====================
         TYPESCRIPT BEST PRACTICES
      ====================== */
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],

      /* =====================
         REACT / NEXT.JS
      ====================== */
      'react/jsx-key': 'error',
      'react/react-in-jsx-scope': 'off', // Next.js handles this
      'react/jsx-no-useless-fragment': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* =====================
         ACCESSIBILITY (A11Y)
      ====================== */
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/anchor-is-valid': 'error',

      /* =====================
         IMPORT / STRUCTURE
      ====================== */
      'sort-imports': [
        'warn',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],

      /* =====================
         PRETTIER
      ====================== */
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
