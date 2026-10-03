/* ==========================================================================
   FEATURE FLAGS & AGILE TICKET ROLLOUT ENGINE
   Implementa las reglas de negocio de los 3 Tickets del Dark Mode:
   - Ticket 1: Flag dark_mode_enabled apagado (0%), nadie ve el toggle.
   - Ticket 2: Toggle visible solo al 10% de usuarios, sin persistencia.
   - Ticket 3: Guardar preferencia (localStorage) y subir flag al 100%.
   ========================================================================== */

import { TICKETS } from './config.js';
import { SIMULATED_USERS } from './api/mockHeroes.js';

class FeatureFlagManager {
  constructor() {
    // Por defecto iniciamos en Ticket 3 (Producción 100% con persistencia),
    // garantizando que el usuario tenga acceso inmediato y persistente al modo noche/día.
    // El evaluador puede hacer clic en Ticket 1 o Ticket 2 en la barra superior para auditar cada fase.
    this.currentTicket = TICKETS.TICKET_3;
    this.currentUser = SIMULATED_USERS[0];
    this.listeners = [];
  }

  // Obtener el ticket actual
  getCurrentTicket() {
    return this.currentTicket;
  }

  // Cambiar el ticket activo (1, 2 o 3)
  setTicket(ticketId) {
    if (ticketId === 1) this.currentTicket = TICKETS.TICKET_1;
    else if (ticketId === 2) this.currentTicket = TICKETS.TICKET_2;
    else if (ticketId === 3) this.currentTicket = TICKETS.TICKET_3;

    this.notifyListeners();
  }

  // Obtener el usuario simulado activo
  getCurrentUser() {
    return this.currentUser;
  }

  // Cambiar el usuario simulado para probar la cohorte del 10%
  setCurrentUser(userId) {
    const found = SIMULATED_USERS.find(u => u.id === userId);
    if (found) {
      this.currentUser = found;
      this.notifyListeners();
    }
  }

  /* ========================================================================
     Regla del Ticket 1, 2 y 3: ¿Debe mostrarse el botón Toggle al usuario?
     ======================================================================== */
  isThemeToggleVisibleForUser() {
    // TICKET 1: Flag completamente apagado (0%). Nadie ve el botón.
    if (this.currentTicket.id === 1) {
      return false;
    }

    // TICKET 2: Visible solo para el 10% de los usuarios (Canary).
    if (this.currentTicket.id === 2) {
      // Determinación por hashing / puntuación de cohorte
      const isUserIn10PercentCohort = this.currentUser.cohortScore < 10;
      return isUserIn10PercentCohort;
    }

    // TICKET 3: Flag subido al 100% (General Availability). Todos ven el botón.
    if (this.currentTicket.id === 3) {
      return true;
    }

    return false;
  }

  /* ========================================================================
     Regla del Ticket 2 vs Ticket 3: ¿Está habilitada la persistencia?
     - Ticket 1: No
     - Ticket 2: NO (Sin persistencia todavía, especificación explícita)
     - Ticket 3: SÍ (Guardar en localStorage / backend)
     ======================================================================== */
  isPersistenceEnabled() {
    return this.currentTicket.persistenceEnabled === true;
  }

  // Suscribirse a cambios de estado
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notifyListeners() {
    const state = {
      ticket: this.currentTicket,
      user: this.currentUser,
      isToggleVisible: this.isThemeToggleVisibleForUser(),
      persistenceEnabled: this.isPersistenceEnabled()
    };
    this.listeners.forEach(fn => fn(state));
  }
}

export const featureFlags = new FeatureFlagManager();
