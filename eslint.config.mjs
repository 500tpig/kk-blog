import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/**', '.next/**', 'build/**', 'dist/**']
  },
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'prettier': {}
    },
    rules: {
      // TypeScript 规则
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      // 其他规则
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'import/order': [
        'error',
        {
          //按照分组顺序进行排序
          'groups': [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'internal',
            'object',
            'type'
          ],
          //通过路径自定义分组
          'pathGroups': [
            {
              pattern: 'react*',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: '@/components/**',
              group: 'parent',
              position: 'before'
            },
            {
              pattern: '@/utils/**',
              group: 'parent',
              position: 'after'
            },
            {
              pattern: '@/apis/**',
              group: 'parent',
              position: 'after'
            }
          ],
          'pathGroupsExcludedImportTypes': ['react'],
          'newlines-between': 'always', //每个分组之间换行
          //根据字母顺序对每个组内的顺序进行排序
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }
]

export default eslintConfig
