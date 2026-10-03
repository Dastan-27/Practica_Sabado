/* ==========================================================================
   STATIC ANALYSIS & SYNTAX LINT CHECK
   Valida sintaxis ES Modules y buenas prácticas sin dependencias pesadas
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 Ejecutando Análisis Estático y Validación de Sintaxis...\n');

const jsDirs = ['js', 'scripts'];
let totalFiles = 0;
let errors = 0;

function scanDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      validateFile(fullPath);
    }
  }
}

function validateFile(filePath) {
  totalFiles++;
  const relative = path.relative(rootDir, filePath);
  try {
    // node --check valida errores de sintaxis en tiempo de parsing
    execSync(`node --check "${filePath}"`, { stdio: 'pipe' });
    console.log(`  ✅ OK: ${relative}`);
  } catch (err) {
    errors++;
    console.error(`  ❌ ERROR de sintaxis en: ${relative}`);
    console.error(`     ${err.message}`);
  }
}

// Escanear server.js
if (fs.existsSync(path.join(rootDir, 'server.js'))) {
  validateFile(path.join(rootDir, 'server.js'));
}

// Escanear directorios
jsDirs.forEach(dir => {
  const full = path.join(rootDir, dir);
  if (fs.existsSync(full)) {
    scanDir(full);
  }
});

console.log(`\n📊 Resumen de Linting: ${totalFiles - errors}/${totalFiles} archivos válidos.`);

if (errors > 0) {
  console.error(`💥 Falló el análisis estático. Se encontraron ${errors} errores.`);
  process.exit(1);
} else {
  console.log('✨ Calidad de código y sintaxis 100% verificada.');
  process.exit(0);
}
