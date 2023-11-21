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
      eslintrc: {
        // 默认 false, true 启用生成。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把 enable 关掉，即改成 false。
        // 否则这个文件每次会在重新加载的时候重新生成，这会导致 eslint 有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
        enabled: false,
        // filepath: './.eslintrc-auto-import.json', // 默认就是 ./.eslintrc-auto-import.json
        // globalsPropValue: true, // 默认 true
      },
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
