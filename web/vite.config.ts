import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  // 配置路径别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@import "./src/mixin.scss";'
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://localhost",
        changeOrigin: true,
        cookieDomainRewrite: "",
        secure: false,
      },
    },
  },
  build: {  
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      }
    },
    minify: 'terser', // 启用 terser 压缩  
    terserOptions: {  
        compress: {  
            pure_funcs: ['console.log'], // 只删除 console.log 
            //drop_console: true, // 删除所有 console
            drop_debugger: true, // 删除 debugger  
        }  
    }  
  } 
});

