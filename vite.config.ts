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
      imports: ['vue'],
    }),
    Components({
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
