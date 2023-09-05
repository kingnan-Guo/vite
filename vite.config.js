import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { resolve } from "path";
export default defineConfig({
    base: './',//项目部署基础路径
    // mode: 'development',
    mode: 'production',
    // publicDir: './',
    cacheDir: './cache',
    plugins: [Vue()],
    resolve:{
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        // minify: "terser",//使用terser
        // terserOptions: {
        //     compress: {
        //         // 生产环境时移除console
        //         drop_console: true,
        //         drop_debugger: true
        //     }
        // }
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
        minify: "terser",//使用terser
        terserOptions:{
            compress: {
                // 生产环境时移除console
                drop_console: false,
                drop_debugger: true
            }  
        },
        assetsInlineLimit: 4096,
        rollupOptions: {
            // input: {
            //     // home: path.resolve(__dirname, 'src/pages/home/home.vue')
            // },
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name].[ext]'
            }

        },
        chunkSizeWarningLimit: 500
    },
    server: {
        host: '127.0.0.1',
        port: '8000',
        open:true,
        proxy: {
            '/api': 'http://192.168.1.1'
        }
    }
})