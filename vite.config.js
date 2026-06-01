import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-assets-folder',
      configureServer(server) {
        server.middlewares.use('/assets', (req, res, next) => {
          try {
            const filePath = path.join(process.cwd(), 'assets', decodeURIComponent(req.url.split('?')[0]))
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase()
              const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp' }
              res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
              res.setHeader('Cache-Control', 'public, max-age=3600')
              fs.createReadStream(filePath).pipe(res)
            } else { next() }
          } catch (e) { next() }
        })
      }
    }
  ],
  server: {
    port: 3001,
    open: true,
  },
})
