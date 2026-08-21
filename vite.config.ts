import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

const portable = process.env.PORTABLE === 'true'

export default defineConfig({
  plugins: [react(), ...(portable ? [viteSingleFile()] : [])],
  base: './',
  build: {
    target: 'es2020',
    cssCodeSplit: !portable,
    assetsInlineLimit: portable ? 100000000 : 4096,
    rollupOptions: portable ? { output: { inlineDynamicImports: true } } : undefined
  }
})
