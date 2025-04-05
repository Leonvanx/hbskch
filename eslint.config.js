import pluginVue from 'eslint-plugin-vue';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import vueEslintParser from 'vue-eslint-parser';
import tsEslintParser from '@typescript-eslint/parser';

export default defineConfigWithVueTs([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue,js,jsx}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'node_modules'],
  },
  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    name: 'app/plugins',
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': typescriptEslint,
      prettier,
    },
  },
  {
    name: 'app/parser-config-vue',
    languageOptions: {
      parser: vueEslintParser,
    },
  },
  {
    name: 'app/parser-config-ts',
    files: ['**/*.{ts,mts,tsx}'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    name: 'app/custom-rules',
    rules: {
      // Vue相关规则
      'vue/multi-word-component-names': 'off', // 组件名是否要求多个单词
      'vue/no-mutating-props': 'error', // 禁止直接修改props
      'vue/require-default-prop': 'warn', // 要求为可选prop提供默认值
      'vue/require-prop-types': 'warn', // 要求props定义类型
      'vue/order-in-components': 'warn', // 组件选项的顺序
      'vue/attributes-order': 'warn', // 属性顺序
      'vue/no-unused-components': 'error', // 未使用的组件
      'vue/this-in-template': 'error', // 模板中禁止使用this
      'vue/no-template-shadow': 'error', // 禁止模板中的变量名与作用域变量冲突
      'vue/no-reserved-component-names': 'error', // 禁止使用保留的组件名
      // 其他常用规则
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'warn',
      // 全等
      eqeqeq: 'off',
    },
  },
]);
