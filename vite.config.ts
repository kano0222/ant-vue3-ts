import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend' //components的name
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/',
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: [
        'src/hooks',
      ],
      // dts: 'src/auto-imports.d.ts',
    }),
    Components({
      // 指定组件位置，默认是src/components
      // dirs: ['src/components/common'],
      // extensions: ['vue'],
      // 配置文件生成位置
      // dts: 'components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        })]
    })
  ],
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      "@": resolve(__dirname, "./src")
    }
  },
})
