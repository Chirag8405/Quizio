import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
    strictPort: false,
    hmr: {
      overlay: true,
      host: "localhost",
      port: 8080,
    },
    watch: {
      usePolling: false,
    },
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use('/api', app);
      
      // Configure proper MIME types for PowerPoint files
      server.middlewares.use('/presentations', (req, res, next) => {
        if (req.url?.endsWith('.pptx')) {
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
          res.setHeader('Content-Disposition', 'inline');
        } else if (req.url?.endsWith('.ppt')) {
          res.setHeader('Content-Type', 'application/vnd.ms-powerpoint');
          res.setHeader('Content-Disposition', 'inline');
        }
        next();
      });
    },
  };
}
