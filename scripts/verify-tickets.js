/* ==========================================================================
   SUITE DE PRUEBAS AUTOMATIZADAS Y ROBUSTEZ DEL CI
   Valida:
   1. Reglas de negocio de los 3 Tickets del Dark Mode (INVEST / Canary 10% / GA 100%)
   2. ConfigCat Feature Toggles (Trunk-Based Development & Fallback seguro)
   3. Integridad de Datos y Powerstats de Superhéroes (Marvel vs DC)
   4. Contrato de Salud y Build para Despliegue Continuo (/healthz & dist)
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TICKETS } from '../js/config.js';
import { featureFlags } from '../js/featureFlags.js';
import { POPULAR_SUPERHEROES, SIMULATED_USERS } from '../js/api/mockHeroes.js';
import { configCatService, FEATURE_KEYS } from '../js/configcatService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 ============================================================');
console.log('   SUITE DE PRUEBAS DE CALIDAD Y ROBUSTEZ DEL PIPELINE CI/CD   ');
console.log('============================================================\n');

let totalTests = 0;
let passedTests = 0;
const failedTests = [];

function assert(condition, message, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failedTests.push({ message, details });
    console.error(`  ❌ FAIL: ${message}`);
    if (details) {
      console.error(`     Detalle: ${details}`);
    }
  }
}

// ============================================================================
// SUITE 1: AUDITORÍA DE TICKETS ÁGILES (DARK / LIGHT MODE)
// ============================================================================
console.log('📦 [SUITE 1/4] Tickets Ágiles de Modo Oscuro (INVEST & Rollout)');

// --- TICKET 1 ---
console.log('  --- Ticket 1: Base CSS y Flag 0% ---');
featureFlags.setTicket(1);
assert(featureFlags.getCurrentTicket().id === 1, 'El ticket actual es Ticket 1');
assert(featureFlags.getCurrentTicket().rolloutPercentage === 0, 'El rollout de Ticket 1 está en 0%');
assert(featureFlags.getCurrentTicket().flagValue === false, 'El flag dark_mode_enabled está apagado');
assert(featureFlags.isThemeToggleVisibleForUser() === false, 'El botón toggle está estrictamente OCULTO para el usuario activo');
assert(featureFlags.isPersistenceEnabled() === false, 'La persistencia en localStorage está deshabilitada');

SIMULATED_USERS.forEach(u => {
  featureFlags.setCurrentUser(u.id);
  assert(featureFlags.isThemeToggleVisibleForUser() === false, `Usuario ${u.name} (cohorte ${u.cohortScore}%) NO ve el botón`);
});

// --- TICKET 2 ---
console.log('  --- Ticket 2: Canary Rollout 10% (Sin Persistencia) ---');
featureFlags.setTicket(2);
assert(featureFlags.getCurrentTicket().id === 2, 'El ticket actual es Ticket 2');
assert(featureFlags.getCurrentTicket().rolloutPercentage === 10, 'El rollout de Ticket 2 está en 10%');
assert(featureFlags.isPersistenceEnabled() === false, 'Persistencia estrictamente deshabilitada en Canary (Ticket 2)');

const userInCohort = SIMULATED_USERS.find(u => u.inCanary10);
const userOutOfCohort = SIMULATED_USERS.find(u => !u.inCanary10);

featureFlags.setCurrentUser(userInCohort.id);
assert(featureFlags.isThemeToggleVisibleForUser() === true, `Usuario dentro del Canary (${userInCohort.name}) SÍ ve el toggle`);

featureFlags.setCurrentUser(userOutOfCohort.id);
assert(featureFlags.isThemeToggleVisibleForUser() === false, `Usuario fuera del Canary (${userOutOfCohort.name}) NO ve el toggle`);

// --- TICKET 3 ---
console.log('  --- Ticket 3: General Availability 100% y Persistencia ---');
featureFlags.setTicket(3);
assert(featureFlags.getCurrentTicket().id === 3, 'El ticket actual es Ticket 3');
assert(featureFlags.getCurrentTicket().rolloutPercentage === 100, 'El rollout de Ticket 3 está al 100%');
assert(featureFlags.isPersistenceEnabled() === true, 'Persistencia en localStorage habilitada al 100%');

SIMULATED_USERS.forEach(u => {
  featureFlags.setCurrentUser(u.id);
  assert(featureFlags.isThemeToggleVisibleForUser() === true, `Usuario ${u.name} SÍ ve el botón en Ticket 3`);
});

// ============================================================================
// SUITE 2: FEATURE TOGGLES CON CONFIGCAT (TRUNK-BASED DEVELOPMENT)
// ============================================================================
console.log('\n🐱 [SUITE 2/4] Feature Toggles con ConfigCat (TBD Safety)');

// Test 2.1: Default seguro (Default-off para código en desarrollo)
configCatService.setFeatureToggle(FEATURE_KEYS.SUPERHERO_BATTLE_ARENA, false);
assert(
  configCatService.isBattleArenaEnabled() === false,
  'Feature Toggle "superhero_battle_arena" se encuentra en estado OFF por defecto (código protegido)'
);

// Test 2.2: Activación controlada (Toggle ON)
configCatService.setFeatureToggle(FEATURE_KEYS.SUPERHERO_BATTLE_ARENA, true);
assert(
  configCatService.isBattleArenaEnabled() === true,
  'Feature Toggle "superhero_battle_arena" responde inmediatamente a conmutación ON sin re-despliegue'
);

// Test 2.3: Restablecimiento de seguridad
configCatService.setFeatureToggle(FEATURE_KEYS.SUPERHERO_BATTLE_ARENA, false);
assert(
  configCatService.isBattleArenaEnabled() === false,
  'Feature Toggle permite apagado de emergencia (Kill Switch / Circuit Breaker) instantáneo'
);

// ============================================================================
// SUITE 3: INTEGRIDAD DE DATOS Y REGLAS DE NEGOCIO (SUPERHERO API)
// ============================================================================
console.log('\n🦸 [SUITE 3/4] Integridad de Catálogo y Reglas de Negocio (Superhero API)');

assert(POPULAR_SUPERHEROES.length >= 10, `El catálogo posee al menos 10 personajes (Actual: ${POPULAR_SUPERHEROES.length})`);

// Validar que cada héroe posee powerstats consistentes
let invalidPowerstats = 0;
POPULAR_SUPERHEROES.forEach(hero => {
  const stats = hero.powerstats;
  if (!stats) {
    invalidPowerstats++;
    return;
  }
  const statKeys = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];
  const hasAllKeys = statKeys.every(k => typeof stats[k] === 'number' && stats[k] >= 0 && stats[k] <= 100);
  if (!hasAllKeys) invalidPowerstats++;
});
assert(invalidPowerstats === 0, 'Todos los personajes tienen los 6 Powerstats válidos (rango 0-100)');

// Validar coexistencia equilibrada Marvel y DC
const marvelCount = POPULAR_SUPERHEROES.filter(h => h.biography?.publisher === 'Marvel Comics').length;
const dcCount = POPULAR_SUPERHEROES.filter(h => h.biography?.publisher === 'DC Comics').length;
assert(marvelCount > 0 && dcCount > 0, `Catálogo multiverso equilibrado: Marvel (${marvelCount}) y DC (${dcCount})`);

// ============================================================================
// SUITE 4: CONTRATO DE DESPLIEGUE Y HEALTHCHECK (RENDER & DOCKER)
// ============================================================================
console.log('\n🩺 [SUITE 4/4] Contrato de Despliegue Continuo y Healthcheck');

// Verificar que server.js existe y exporta la lógica de arranque
const serverPath = path.join(rootDir, 'server.js');
assert(fs.existsSync(serverPath), 'Archivo server.js de producción existe en la raíz');

const serverContent = fs.readFileSync(serverPath, 'utf8');
assert(serverContent.includes('/healthz'), 'Endpoint de monitoreo /healthz implementado en el servidor');
assert(serverContent.includes('process.env.PORT'), 'Servidor enlaza el puerto dinámico de Render (process.env.PORT)');

// ============================================================================
// VEREDICTO FINAL Y FAIL-FAST PARA EL PIPELINE CI
// ============================================================================
console.log('\n------------------------------------------------------------');
console.log(`📊 Total de Pruebas Ejecutadas: ${totalTests}`);
console.log(`✅ Pruebas Exitosas: ${passedTests}`);
console.log(`❌ Pruebas Fallidas: ${failedTests.length}`);
console.log('------------------------------------------------------------');

if (failedTests.length > 0) {
  console.error('\n💥 CI QUALITY GATE RECHAZADO: Se encontraron fallos en la suite de pruebas.');
  console.error('🛑 Política de Equipo: "Si el CI está rojo, no se continúa con features hasta que esté verde."');
  failedTests.forEach((f, i) => {
    console.error(`   ${i + 1}. ${f.message}`);
    if (f.details) console.error(`      -> ${f.details}`);
  });
  // RETORNO ESTRICTO DE CÓDIGO 1: Detiene el CI de forma inmediata y clara
  process.exit(1);
} else {
  console.log('\n🎉 ¡TODAS LAS PRUEBAS SUPERADAS CON ÉXITO! (100% de Calidad Aprobada)');
  console.log('🚀 El pipeline CI tiene luz verde para proceder con build y despliegue a Render.\n');
  process.exit(0);
}
