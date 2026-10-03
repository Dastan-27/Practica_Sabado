/* ==========================================================================
   THEME MANAGER: Gestión de Modo Día y Noche (Light / Dark Mode)
   Soporta el botón "Mode: [Símbolo] [Hamburguesa]" con menú desplegable
   ========================================================================== */

import { SUPERHERO_API_CONFIG } from './config.js';

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.menuTrigger = null;
    this.dropdownMenu = null;
    this.modeIcon = null;
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    // 1. Obtener preferencia guardada en localStorage o sistema
    let initialTheme = 'light';
    try {
      const savedTheme = localStorage.getItem(SUPERHERO_API_CONFIG.storageKeyTheme);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        initialTheme = savedTheme;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initialTheme = 'dark';
      }
    } catch (e) {
      console.warn('Error accediendo a localStorage:', e);
    }

    this.applyThemeToDOM(initialTheme);

    // Escuchar preferencia del SO si el usuario no ha guardado una
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(SUPERHERO_API_CONFIG.storageKeyTheme)) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  // Enlazar el componente de menú Modo
  attachModeMenu(container) {
    if (!container) return;

    this.menuTrigger = container.querySelector('#mode-menu-trigger');
    this.dropdownMenu = container.querySelector('#mode-dropdown-menu');
    this.modeIcon = container.querySelector('#mode-current-icon');

    if (!this.menuTrigger || !this.dropdownMenu) return;

    // Toggle al hacer clic en el botón principal
    this.menuTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Opciones del menú (Light / Dark)
    const options = this.dropdownMenu.querySelectorAll('[data-mode-value]');
    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const mode = opt.getAttribute('data-mode-value');
        this.setTheme(mode);
        this.closeMenu();
      });
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Cerrar con tecla Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    this.updateUI();
  }

  // Abrir / Cerrar el menú desplegable
  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isMenuOpen = true;
    if (this.menuTrigger) {
      this.menuTrigger.classList.add('is-open');
      this.menuTrigger.setAttribute('aria-expanded', 'true');
    }
    if (this.dropdownMenu) {
      this.dropdownMenu.classList.add('is-active');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    if (this.menuTrigger) {
      this.menuTrigger.classList.remove('is-open');
      this.menuTrigger.setAttribute('aria-expanded', 'false');
    }
    if (this.dropdownMenu) {
      this.dropdownMenu.classList.remove('is-active');
    }
  }

  // Establecer el tema
  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;

    this.applyThemeToDOM(theme);

    // Guardar en localStorage
    try {
      localStorage.setItem(SUPERHERO_API_CONFIG.storageKeyTheme, theme);
    } catch (err) {
      console.warn('No se pudo guardar en localStorage:', err);
    }

    this.updateUI();
  }

  // Aplicar tema en el DOM
  applyThemeToDOM(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (document.body) {
      document.body.setAttribute('data-theme', theme);
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${theme}`);
    }
  }

  // Actualizar indicadores visuales
  updateUI() {
    const isDark = this.currentTheme === 'dark';

    // Actualizar símbolo en el botón Mode: ☀️ o 🌙
    if (this.modeIcon) {
      this.modeIcon.textContent = isDark ? '🌙' : '☀️';
      this.modeIcon.setAttribute('title', isDark ? 'Modo Oscuro Activo' : 'Modo Claro Activo');
    }

    // Actualizar clase activa en las opciones del menú
    if (this.dropdownMenu) {
      this.dropdownMenu.querySelectorAll('[data-mode-value]').forEach(btn => {
        const val = btn.getAttribute('data-mode-value');
        if (val === this.currentTheme) {
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        }
      });
    }
  }
}

export const themeManager = new ThemeManager();
