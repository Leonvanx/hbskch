import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
// import { visualizer } from 'rollup-plugin-visualizer';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    Components({
      // 配置选项
      dts: true, // 生成类型声明文件
      dirs: ['src/components'], // 自动导入的目录
      extensions: ['vue'], // 文件扩展名
      deep: true, // 是否搜索子目录
      resolvers: [NaiveUiResolver(), IconsResolver()],
      // 自定义组件前缀(默认空)
      // 例如: 设置为'El'则ElButton会被解析为element-plus的Button
      // prefix: 'El',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar', 'useModal'],
        },
      ],
      dts: true, // 生成类型声明文件
      eslintrc: {
        enabled: true, // 生成eslint配置
      },
    }),
    Icons({
      autoInstall: true,
    }),
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/apiProxy': {
        target: 'http://8.136.107.212',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiProxy/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          aieditor: ['aieditor'],
        },
      },
    },
  },
});
