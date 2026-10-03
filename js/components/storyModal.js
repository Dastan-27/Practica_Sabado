/* ==========================================================================
   STORY MODAL: Documentación Ágil de la Historia de Usuario & Tickets
   ========================================================================== */

export function renderStoryModal(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="modal-overlay" id="agile-story-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-container">
        <header class="modal-header">
          <div>
            <span class="badge badge-blue" style="margin-bottom: 0.5rem;">Práctica Diplomado • Metodología Ágil</span>
            <h2 id="modal-title">División de Historias: Dark Mode en Dashboard</h2>
          </div>
          <button class="modal-close-btn" id="close-story-modal-btn" aria-label="Cerrar modal">
            ✕
          </button>
        </header>

        <section class="modal-body">
          <div class="scrum-comparison-grid">
            <!-- Historia Grande Rechazada -->
            <div class="scrum-box rejected">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 1.25rem;">❌</span>
                <h3 style="color: var(--color-danger); font-size: 1rem;">Historia Grande (Rechazar)</h3>
              </div>
              <blockquote style="font-style: italic; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.75rem; border-left: 3px solid var(--color-danger); padding-left: 0.75rem;">
                "Como usuario, quiero poder cambiar entre modo claro y oscuro en toda la aplicación, y que se recuerde mi preferencia."
              </blockquote>
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-danger); margin-bottom: 0.35rem;">¿Por qué se rechaza?</h4>
              <ul style="font-size: 0.8125rem; color: var(--text-secondary); padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem;">
                <li><strong>No es INVEST</strong>: Abarca diseño de tokens, interfaz UI, persistencia y despliegue a la vez.</li>
                <li><strong>Riesgo elevado</strong>: Cualquier fallo en variables o estilos rompe toda la aplicación en producción.</li>
                <li><strong>Sin validación temprana</strong>: No permite probar el contraste de colores con un grupo reducido antes del lanzamiento masivo.</li>
                <li><strong>Pull Request gigante</strong>: Difícil de revisar y propenso a conflictos de fusión (merge conflicts).</li>
              </ul>
            </div>

            <!-- División Correcta Aprobada -->
            <div class="scrum-box approved">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 1.25rem;">✅</span>
                <h3 style="color: var(--color-success); font-size: 1rem;">División Correcta (Aprobada)</h3>
              </div>
              <p style="font-size: 0.875rem; color: var(--text-primary); margin-bottom: 0.75rem;">
                Se divide en <strong>3 tickets incrementales</strong> utilizando la técnica de <strong>Feature Flags y Rollout Progresivo (Canary)</strong>:
              </p>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8125rem;">
                <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border-left: 3px solid #6366f1;">
                  <strong>Ticket 1:</strong> Base CSS + Flag 0% (Oculto).
                </div>
                <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border-left: 3px solid #1fb6ff;">
                  <strong>Ticket 2:</strong> Botón Toggle + Rollout 10% (Sin persistencia).
                </div>
                <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border-left: 3px solid #10b981;">
                  <strong>Ticket 3:</strong> Persistencia (localStorage) + Rollout 100%.
                </div>
              </div>
            </div>
          </div>

          <!-- Cronograma Detallado de Tickets -->
          <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem;">📋 Criterios de Aceptación de los 3 Tickets</h3>
          <div class="ticket-timeline">
            <!-- Ticket 1 -->
            <div class="ticket-timeline-card">
              <h4>
                <span>Ticket 1: Cimientos de Diseño y Lógica Base</span>
                <span class="badge badge-neutral">Flag OFF (0%)</span>
              </h4>
              <p style="font-size: 0.8125rem; margin-bottom: 0.5rem;">
                Definir variables CSS/tema oscuro y lógica de cambio de clase en el HTML raíz, detrás de un flag <code>dark_mode_enabled</code> apagado (nadie lo ve aún).
              </p>
              <ul style="font-size: 0.78125rem; color: var(--text-secondary); padding-left: 1.25rem;">
                <li>Tokens de color definidos para tema claro en <code>:root</code> y oscuro en <code>[data-theme="dark"]</code>.</li>
                <li>Lógica JavaScript lista para manipular atributos en <code>document.documentElement</code>.</li>
                <li>El botón toggle permanece estrictamente oculto para usuarios finales (Rollout 0%).</li>
              </ul>
            </div>

            <!-- Ticket 2 -->
            <div class="ticket-timeline-card">
              <h4>
                <span>Ticket 2: Despliegue Canary a 10% de Usuarios</span>
                <span class="badge badge-blue">Canary 10%</span>
              </h4>
              <p style="font-size: 0.8125rem; margin-bottom: 0.5rem;">
                Agregar el botón toggle visible solo al 10% de usuarios, sin persistencia todavía.
              </p>
              <ul style="font-size: 0.78125rem; color: var(--text-secondary); padding-left: 1.25rem;">
                <li>Botón toggle interactivo agregado en el topbar (con iconos de Sol y Luna).</li>
                <li>Segmentación por cohorte: visible únicamente para usuarios con <code>cohortScore < 10</code>.</li>
                <li><strong>Sin persistencia</strong>: Al refrescar la página, el estado se reinicia (permite validar adopción y rendimiento sin almacenar datos aún).</li>
              </ul>
            </div>

            <!-- Ticket 3 -->
            <div class="ticket-timeline-card">
              <h4>
                <span>Ticket 3: Persistencia Completa y Lanzamiento Global (100%)</span>
                <span class="badge badge-success">Producción 100%</span>
              </h4>
              <p style="font-size: 0.8125rem; margin-bottom: 0.5rem;">
                Guardar la preferencia (localStorage o backend) y subir el flag al 100%.
              </p>
              <ul style="font-size: 0.78125rem; color: var(--text-secondary); padding-left: 1.25rem;">
                <li>Flag elevado al 100%: Todos los usuarios tienen acceso al toggle.</li>
                <li>Preferencia almacenada de forma persistente en <code>localStorage</code>.</li>
                <li>Sincronización con la preferencia del sistema operativo (<code>prefers-color-scheme</code>).</li>
              </ul>
            </div>
          </div>

          <!-- Fuente de Datos: Superhero API -->
          <div style="margin-top: 1.5rem; padding: 1rem; background: var(--color-info-bg); border: 1px solid var(--border-accent); border-radius: var(--radius-md);">
            <h4 style="font-size: 0.875rem; color: var(--marvel-red); margin-bottom: 0.35rem;">
              🌐 Integración de API (Sin Backend Propio)
            </h4>
            <p style="font-size: 0.8125rem; color: var(--text-secondary);">
              Para evitar el desarrollo de un servidor backend, se utiliza la API oficial de superhéroes <strong>Superhero API</strong> (<a href="https://www.superheroapi.com/" target="_blank" rel="noopener">superheroapi.com</a>). Permite consultar personajes de Marvel Comics, DC Comics, estadísticas de combate (powerstats), biografías e imágenes directamente desde el frontend.
            </p>
          </div>
        </section>
      </div>
    </div>
  `;

  const modal = container.querySelector('#agile-story-modal');
  const closeBtn = container.querySelector('#close-story-modal-btn');
  const openBtn = document.getElementById('open-story-modal-btn');

  function open() {
    if (modal) modal.classList.add('active');
  }

  function close() {
    if (modal) modal.classList.remove('active');
  }

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      close();
    }
  });

  return { open, close };
}
