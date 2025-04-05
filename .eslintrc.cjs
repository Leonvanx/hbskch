module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
            }
        }
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-essential', 'prettier'],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'vue', 'prettier'],
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
        'vue/component-tags-order': [
            'error',
            {
                // 组件标签顺序
                order: ['template', 'script', 'style']
            }
        ],
        // 其他常用规则
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-unused-vars': 'warn',
        'no-var': 'error',
        'prefer-const': 'warn',
        // 全等
        eqeqeq: 'off'
    }
};
