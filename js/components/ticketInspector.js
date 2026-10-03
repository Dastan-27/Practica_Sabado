/* ==========================================================================
   TICKET INSPECTOR: Panel de Control de Feature Flags y Rollout Ágil
   ========================================================================== */

import { featureFlags } from '../featureFlags.js';
import { SIMULATED_USERS } from '../api/mockHeroes.js';

export function renderTicketInspector(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="ticket-control-container">
      <div class="ticket-control-left">
        <div class="ticket-branding">
          <span class="ticket-pill-badge">Control Ágil</span>
          <span>Modo Noche / Día:</span>
        </div>

        <!-- Selector de los 3 Tickets -->
        <nav class="ticket-steps-nav" aria-label="Selector de Tickets de la Actividad">
          <button class="ticket-step-btn" data-ticket="1" title="Flag apagado (0%), nadie ve el toggle">
            <span class="step-number">1</span>
            <span>Ticket 1 (Flag 0%)</span>
          </button>
          <button class="ticket-step-btn" data-ticket="2" title="Toggle visible solo al 10% de usuarios, sin persistencia">
            <span class="step-number">2</span>
            <span>Ticket 2 (Canary 10%)</span>
          </button>
          <button class="ticket-step-btn active" data-ticket="3" title="Flag 100% y persistencia en localStorage">
            <span class="step-number">3</span>
            <span>Ticket 3 (100% + Persistencia)</span>
          </button>
        </nav>

        <!-- Selector de Usuario para probar Cohorte del 10% en Ticket 2 -->
        <div class="cohort-simulator" id="cohort-selector-box">
          <label for="cohort-user-select" style="font-weight: 600; color: var(--marvel-blue);">
            👤 Probar Usuario:
          </label>
          <select id="cohort-user-select">
            ${SIMULATED_USERS.map(u => `
              <option value="${u.id}" ${u.inCanary10 ? 'data-in="true"' : 'data-in="false"'}>
                ${u.name} ${u.inCanary10 ? '✨ (Ve el botón)' : '🚫 (Oculto)'}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Estado dinámico del Rollout -->
      <div class="ticket-control-right">
        <div class="ticket-status-card">
          <span class="ticket-status-label">Flag:</span>
          <span class="ticket-status-val" id="flag-val-indicator">dark_mode_enabled</span>
        </div>
        <div class="ticket-status-card">
          <span class="ticket-status-label">Persistencia:</span>
          <span class="ticket-status-val" id="persistence-val-indicator" style="color: var(--color-danger);">Deshabilitada</span>
        </div>

        <button class="btn-secondary" id="open-story-modal-btn" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Historia & Criterios
        </button>
      </div>
    </div>
  `;

  // Enlazar eventos de botones de Ticket
  const stepBtns = container.querySelectorAll('.ticket-step-btn');
  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const ticketId = parseInt(btn.getAttribute('data-ticket'), 10);
      featureFlags.setTicket(ticketId);
    });
  });

  // Enlazar selector de usuario para cohorte
  const userSelect = container.querySelector('#cohort-user-select');
  if (userSelect) {
    userSelect.addEventListener('change', (e) => {
      featureFlags.setCurrentUser(e.target.value);
    });
  }

  // Actualizar UI cuando cambia el estado
  function updateUI(state) {
    const { ticket, user, isToggleVisible, persistenceEnabled } = state;

    // Actualizar botones activos
    stepBtns.forEach(btn => {
      const tId = parseInt(btn.getAttribute('data-ticket'), 10);
      if (tId === ticket.id) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Controlar visibilidad del selector de cohorte (relevante principalmente para Ticket 2)
    const cohortBox = container.querySelector('#cohort-selector-box');
    if (cohortBox) {
      if (ticket.id === 1) {
        cohortBox.style.display = 'none';
      } else {
        cohortBox.style.display = 'flex';
      }
    }

    // Actualizar indicadores
    const flagVal = container.querySelector('#flag-val-indicator');
    if (flagVal) {
      if (ticket.id === 1) {
        flagVal.textContent = 'OFF (0% Rollout)';
        flagVal.style.color = 'var(--text-muted)';
      } else if (ticket.id === 2) {
        flagVal.textContent = `Canary (10% Rollout) - ${isToggleVisible ? 'Visible para usuario' : 'Oculto para usuario'}`;
        flagVal.style.color = isToggleVisible ? 'var(--color-success)' : 'var(--color-warning)';
      } else if (ticket.id === 3) {
        flagVal.textContent = 'ON (100% GA - Visible)';
        flagVal.style.color = 'var(--color-success)';
      }
    }

    const persistVal = container.querySelector('#persistence-val-indicator');
    if (persistVal) {
      if (persistenceEnabled) {
        persistVal.textContent = 'localStorage (Activa)';
        persistVal.style.color = 'var(--color-success)';
      } else {
        persistVal.textContent = 'Deshabilitada (En memoria)';
        persistVal.style.color = 'var(--color-danger)';
      }
    }
  }

  featureFlags.subscribe(updateUI);
  updateUI({
    ticket: featureFlags.getCurrentTicket(),
    user: featureFlags.getCurrentUser(),
    isToggleVisible: featureFlags.isThemeToggleVisibleForUser(),
    persistenceEnabled: featureFlags.isPersistenceEnabled()
  });
}
