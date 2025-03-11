import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginTypescript from '@typescript-eslint/eslint-plugin'
import parserTypescript from '@typescript-eslint/parser'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue,ts,tsx}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended, // Рекомендуемые правила для JS
  ...pluginVue.configs['flat/essential'], // Рекомендуемые правила для Vue
  skipFormatting, // Для работы с Prettier

  // Добавляем конфигурацию для TypeScript
  {
    parser: parserTypescript, // Указываем парсер для TypeScript
    plugins: [pluginTypescript], // Добавляем плагин TypeScript
    extends: [
      'eslint:recommended', // Рекомендуемые правила ESLint
      'plugin:@typescript-eslint/recommended', // Рекомендуемые правила для TypeScript
      'plugin:vue/vue3-recommended', // Рекомендуемые правила для Vue 3
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Правило для неиспользуемых переменных
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Отключаем требование явного указания типов
    },
  },
]
