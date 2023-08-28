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
});

