import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages のプロジェクトページ（https://kanikaniyou.github.io/YokosukaLineDashboard/）配信用
export default defineConfig({
  base: '/YokosukaLineDashboard/',
  plugins: [react(), tailwindcss()],
})