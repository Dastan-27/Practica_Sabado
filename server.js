/* ==========================================================================
   PRODUCTION HTTP SERVER & HEALTH CHECK ENDPOINT
   Compatible con Render Web Service y Contenedores Docker
   ========================================================================== */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 10000;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8',
  '.map': 'application/json'
};

const startTime = Date.now();

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // 1. Endpoint de Health Check para Render / Docker / Orquestadores
  if (pathname === '/healthz' || pathname === '/health') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    return res.end(JSON.stringify({
      status: 'ok',
      service: 'superhero-hub',
      uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      version: '1.2.0',
      checks: {
        http: 'healthy',
        distBuilt: fs.existsSync(DIST_DIR)
      }
    }));
  }

  // 2. Servir archivos estáticos desde dist/
  let relativeFilePath = pathname === '/' ? '/index.html' : pathname;
  let targetFilePath = path.join(DIST_DIR, relativeFilePath);

  // Prevenir Directory Traversal
  if (!targetFilePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Acceso denegado');
  }

  fs.stat(targetFilePath, (err, stats) => {
    // Si no existe, servir index.html (SPA Fallback)
    if (err || !stats.isFile()) {
      targetFilePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(targetFilePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(targetFilePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error interno del servidor al leer archivo');
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor de Producción iniciado en http://0.0.0.0:${PORT}`);
  console.log(`🩺 Health Check endpoint activo en: http://0.0.0.0:${PORT}/healthz`);
});
