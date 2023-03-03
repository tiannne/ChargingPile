import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //以下配置反向代理 去vite官网自己找（这是为了解决跨域问题）
  server: {
    port:8080,
    proxy: {
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      //只要是访问api都可以访问到以下接口
      //http://localhost:5173/api/users/yzm 访问这个就能访问到http://localhost:3000/users/yzm
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }

    }
  }
})
