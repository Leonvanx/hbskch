import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      // 配置选项
      dts: true, // 生成类型声明文件
      dirs: ['src/components'], // 自动导入的目录
      extensions: ['vue'], // 文件扩展名
      deep: true, // 是否搜索子目录
      resolvers: [
        // UI库解析器
        // ElementPlusResolver(), // Element Plus
        // AntDesignVueResolver(), // Ant Design Vue
        // VantResolver(), // Vant
      ]
      // 自定义组件前缀(默认空)
      // 例如: 设置为'El'则ElButton会被解析为element-plus的Button
      // prefix: 'El',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        // 其他自动导入
        {
          '@vueuse/core': [
            // 按需导入
            'useMouse',
            ['useFetch', 'useMyFetch']
          ]
        }
      ],
      dts: true, // 生成类型声明文件
      eslintrc: {
        enabled: true // 生成eslint配置
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
      // 添加更多你需要的别名
    }
  },
  server: {
    proxy: {
      '/apiProxy': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/apiProxy/, '')
      }
    }
  }
});
