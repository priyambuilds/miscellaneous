import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'
import pluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default [
  { ignores: ['dist/', '.wxt/', 'node_modules/', '**/*.d.ts'] },

  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    settings: {
      react: { version: 'detect' },
      'better-tailwindcss': {
        entryPoint: 'src/entrypoints/content/style.css',
      },
    },
  },

  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: [...tseslint.configs.recommended],
    plugins: { '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  },

  pluginReact.configs.flat.recommended,

  // React Hooks + Compiler rules
  {
    name: 'react-hooks-and-compiler',
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/react-compiler': 'error', // Compiler-specific rule
    },
  },

  pluginBetterTailwindcss.configs.recommended,

  prettierConfig,
]
