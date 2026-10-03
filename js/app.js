/* ==========================================================================
   APP.JS - Orquestador Principal
   Dashboard de Superhéroes (https://www.superheroapi.com/)
   ========================================================================== */

import { themeManager } from './themeManager.js';
import { renderSuperheroDashboard } from './components/superheroDashboard.js';
import { renderSuperheroExplorer } from './components/superheroExplorer.js';
import { renderBattleArena } from './components/battleArena.js';
import { configCatService, FEATURE_KEYS } from './configcatService.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Menú Desplegable Tipo Hamburguesa: Mode: [Símbolo] [☰]
  const modeMenuContainer = document.getElementById('mode-menu-container');
  themeManager.attachModeMenu(modeMenuContainer);

  // 2. Contenedor Principal de Vistas
  const mainContent = document.getElementById('main-view-container');
  let currentView = 'dashboard';

  function switchView(viewName) {
    currentView = viewName;

    // Actualizar estado activo en la navegación
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Renderizar vista seleccionada
    if (viewName === 'dashboard') {
      renderSuperheroDashboard(mainContent);
    } else if (viewName === 'superhero-api') {
      renderSuperheroExplorer(mainContent);
    } else if (viewName === 'battle-arena') {
      renderBattleArena(mainContent);
    }
  }

  // Enlazar navegación del sidebar
  document.querySelectorAll('.nav-item[data-view]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const view = item.getAttribute('data-view');
      switchView(view);

      // Cerrar menú móvil si está abierto
      const sidebar = document.querySelector('.app-sidebar');
      if (sidebar) sidebar.classList.remove('mobile-open');
    });
  });

  // Render inicial en el dashboard
  switchView('dashboard');

  // 3. Menú móvil
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.querySelector('.app-sidebar');
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // 4. Atajo de teclado: Ctrl+K para buscar
  const searchInput = document.getElementById('global-search-input');
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });

  // 5. Búsqueda en tiempo real de personajes en el catálogo
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.project-meta-desc')?.textContent.toLowerCase() || '';
        if (title.includes(term) || desc.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 6. ConfigCat Feature Flag UI Sync & Conmutador PO
  const configCatBtn = document.getElementById('configcat-toggle-btn');
  const configCatBadge = document.getElementById('configcat-status-badge');
  const sidebarArenaBadge = document.getElementById('badge-battle-toggle');

  function updateConfigCatUI() {
    const isEnabled = configCatService.isBattleArenaEnabled();
    if (configCatBadge) {
      configCatBadge.textContent = isEnabled ? 'Arena ON 🟢' : 'Arena OFF 🔒';
      configCatBadge.className = isEnabled ? 'badge badge-success' : 'badge badge-warning';
    }
    if (sidebarArenaBadge) {
      sidebarArenaBadge.textContent = isEnabled ? 'ON' : 'OFF';
      sidebarArenaBadge.className = isEnabled ? 'badge badge-success' : 'badge badge-warning';
    }

    // Si estamos en la vista de battle-arena, re-renderizar
    if (currentView === 'battle-arena') {
      renderBattleArena(mainContent);
    }
  }

  // Suscribirse a cambios en los toggles de ConfigCat
  configCatService.subscribe(() => {
    updateConfigCatUI();
  });

  // Toggle rápido con clic en el botón de ConfigCat
  if (configCatBtn) {
    configCatBtn.addEventListener('click', () => {
      const current = configCatService.isBattleArenaEnabled();
      const next = !current;
      configCatService.setFeatureToggle(FEATURE_KEYS.SUPERHERO_BATTLE_ARENA, next);
      console.log(`[ConfigCat] Toggle ${FEATURE_KEYS.SUPERHERO_BATTLE_ARENA} cambiado a: ${next ? 'ON' : 'OFF'}`);
    });
  }

  updateConfigCatUI();
  console.log('🚀 Superhero Dashboard inicializado con ConfigCat Feature Flags & Battle Arena.');
});
