import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this is correct
  server: {
    port: 3000, // Change this to your desired port
    watch: {
      ignored: ['**/public/audios/**']
    },
    
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        // Custom name for your JavaScript entry files
        entryFileNames: 'assets/js/[name].js',
        
        // Custom name for chunks (code-split files)
        chunkFileNames: 'assets/js/[name].js',
        
        // Custom name for assets like CSS, images, etc.
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (ext === 'css') {
            return 'assets/css/[name].[ext]';
          }
          
          return 'assets/[ext]/[name].[ext]';
        }
      }
    }
  }
})
