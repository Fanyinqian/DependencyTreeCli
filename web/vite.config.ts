import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import * as path from "path";
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  plugins: [
    reactRefresh(),
    // {
    //   ...visualizer({
    //     filename: './bundle-visualizer.html',
    //     gzipSize: true,
    //     brotliSize: true,
    //     emitFile: false,
    //     open:true //如果存在本地服务端口，将在打包后自动展示
    //   }),
    //   apply: 'build' // 将插件应用到构建过程
    // }
    visualizer({
      filename: './bundle-visualizer.html',
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        open:true //如果存在本地服务端口，将在打包后自动展示
    }),
  ],
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
});

