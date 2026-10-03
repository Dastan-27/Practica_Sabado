/* ==========================================================================
   DASHBOARD VIEW: Vista Principal de Proyectos y Métricas MarvelApp
   ========================================================================== */

import { MOCK_PROJECTS, MOCK_ACTIVITY_FEED } from '../api/mockData.js';

export function renderDashboardView(container) {
  if (!container) return;

  container.innerHTML = `
    <!-- Hero Banner -->
    <section class="welcome-hero" aria-label="Bienvenida al Dashboard">
      <div class="hero-text">
        <span class="badge" style="background: rgba(255,255,255,0.2); color: #fff; margin-bottom: 0.75rem;">
          MarvelApp Prototyping Platform
        </span>
        <h1>Dashboard de Diseño y Prototipado</h1>
        <p>
          Gestiona prototipos en tiempo real, pantallas sincronizadas y pruebas de usuario consumiendo la API GraphQL oficial de MarvelApp.
        </p>
      </div>
      <div class="hero-actions">
        <button class="hero-btn-white" id="quick-graphql-btn">
          ⚡ Explorar GraphQL
        </button>
        <button class="hero-btn-outline" id="quick-story-btn">
          📋 Criterios Scrum
        </button>
      </div>
    </section>

    <!-- Grilla de Métricas KPI -->
    <section class="stats-grid" aria-label="Indicadores Clave de Desempeño">
      <!-- Métrica 1 -->
      <article class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Prototipos Activos</span>
          <div class="stat-icon-wrapper blue">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </div>
        </div>
        <div class="stat-value">18</div>
        <div class="stat-footer">
          <span class="stat-trend positive">↑ 12.5%</span>
          <span class="stat-subtext">vs semana anterior</span>
        </div>
      </article>

      <!-- Métrica 2 -->
      <article class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Pantallas Sincronizadas</span>
          <div class="stat-icon-wrapper purple">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
        </div>
        <div class="stat-value">142</div>
        <div class="stat-footer">
          <span class="stat-trend positive">↑ 8 nuevas</span>
          <span class="stat-subtext">hoy vía GraphQL</span>
        </div>
      </article>

      <!-- Métrica 3 -->
      <article class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Diseñadores & Colaboradores</span>
          <div class="stat-icon-wrapper orange">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </div>
        </div>
        <div class="stat-value">24</div>
        <div class="stat-footer">
          <span class="stat-trend positive">↑ 3 activos</span>
          <span class="stat-subtext">en este momento</span>
        </div>
      </article>

      <!-- Métrica 4 -->
      <article class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Efectividad User Testing</span>
          <div class="stat-icon-wrapper green">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>
        <div class="stat-value">96.4%</div>
        <div class="stat-footer">
          <span class="stat-trend positive">↑ 4.2%</span>
          <span class="stat-subtext">tasa de finalización</span>
        </div>
      </article>
    </section>

    <!-- Grilla Dividida: Galería de Prototipos + Feed de Actividad -->
    <div class="dashboard-main-grid">
      <!-- Columna Izquierda: Galería de Proyectos Marvel -->
      <section class="section-card">
        <div class="section-card-header">
          <div>
            <h2>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              Proyectos y Prototipos Recientes
            </h2>
            <p style="font-size: 0.8125rem;">Colección sincronizada desde MarvelApp Workspace</p>
          </div>

          <div class="section-filter-tabs" id="project-filter-tabs">
            <button class="filter-tab-btn active" data-category="all">Todos</button>
            <button class="filter-tab-btn" data-category="prototype">Prototipos</button>
            <button class="filter-tab-btn" data-category="review">En Revisión</button>
            <button class="filter-tab-btn" data-category="system">Design System</button>
          </div>
        </div>

        <!-- Grid de Proyectos -->
        <div class="projects-gallery-grid" id="projects-container">
          <!-- Renderizado dinámicamente -->
        </div>
      </section>

      <!-- Columna Derecha: Feed de Actividad y User Testing -->
      <aside style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Feed de Actividad -->
        <section class="section-card">
          <div class="section-card-header">
            <h2>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Actividad del Equipo
            </h2>
            <span class="status-dot online" title="Sincronización en vivo activa"></span>
          </div>

          <div class="activity-feed-list" id="activity-feed-container">
            ${MOCK_ACTIVITY_FEED.map(item => `
              <div class="activity-item">
                <img src="${item.avatar}" alt="${item.author}" class="activity-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(item.author)}'">
                <div class="activity-content">
                  <div>
                    <span class="activity-author">${item.author}</span>
                    <span class="activity-action">${item.action}</span>
                    <span class="activity-target">${item.target}</span>
                  </div>
                  <div class="activity-time">${item.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Widget de Métricas de User Testing de Marvel -->
        <section class="section-card">
          <div class="section-card-header">
            <h2>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              Métricas de Pruebas de Usuario
            </h2>
            <span class="badge badge-success">Marvel Testing</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
                <span>Tasa de Éxito en Tareas (NeoBank v2.4)</span>
                <strong>96.4%</strong>
              </div>
              <div class="test-progress-bar">
                <div class="test-progress-fill" style="width: 96.4%;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
                <span>Tiempo Promedio por Flujo</span>
                <strong>1m 18s</strong>
              </div>
              <div class="test-progress-bar">
                <div class="test-progress-fill" style="width: 82%; background: linear-gradient(135deg, #10b981 0%, #059669 100%);"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
                <span>Puntos de Abandono (Hotspot Misses)</span>
                <strong>3.6% (Bajo)</strong>
              </div>
              <div class="test-progress-bar">
                <div class="test-progress-fill" style="width: 14%; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);"></div>
              </div>
            </div>
          </div>
        </section>
      </aside>
    </div>

    <!-- Modal de Vista de Pantalla del Prototipo -->
    <div class="modal-overlay" id="prototype-preview-modal" role="dialog" aria-modal="true">
      <div class="modal-container" style="max-width: 520px; text-align: center;">
        <header class="modal-header">
          <h3 id="proto-modal-title">Visor de Prototipo MarvelApp</h3>
          <button class="modal-close-btn" id="close-proto-modal-btn">✕</button>
        </header>
        <div class="prototype-modal-preview">
          <div class="device-mockup-frame">
            <img id="proto-device-screen" src="" alt="Pantalla de prototipo" class="device-screen-img">
          </div>
          <div class="screen-stepper">
            <button class="btn-secondary" id="proto-prev-btn" style="padding: 0.4rem 0.8rem;">◀ Anterior</button>
            <span id="proto-screen-indicator" style="font-size: 0.8125rem; font-weight: 700;">Pantalla 1 de 3</span>
            <button class="btn-secondary" id="proto-next-btn" style="padding: 0.4rem 0.8rem;">Siguiente ▶</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Renderizar proyectos
  const projectsContainer = container.querySelector('#projects-container');
  let currentCategory = 'all';

  function renderProjects() {
    const filtered = currentCategory === 'all'
      ? MOCK_PROJECTS
      : MOCK_PROJECTS.filter(p => p.category === currentCategory);

    projectsContainer.innerHTML = filtered.map(proj => `
      <article class="project-card" data-id="${proj.id}">
        <div class="project-card-thumb">
          <img src="${proj.thumbnail}" alt="${proj.name}" class="project-thumb-img" loading="lazy">
          <span class="badge ${proj.isPrototype ? 'badge-blue' : 'badge-neutral'} project-type-badge">
            ${proj.status}
          </span>
          <div class="project-screens-pill">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            ${proj.screensCount} pantallas
          </div>
        </div>

        <div class="project-card-body">
          <h3>${proj.name}</h3>
          <p class="project-meta-desc">Actualizado ${proj.updatedAt} • ${proj.views} visualizaciones de prototipo.</p>

          <div class="project-card-footer">
            <div class="collaborators-avatars">
              ${proj.collaborators.map(c => `
                <img src="${c}" alt="Colaborador" class="avatar-stack-item">
              `).join('')}
            </div>

            <button class="btn-ghost" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; color: var(--marvel-blue);">
              Probar Interacción ↗
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Click en cards para abrir modal de pantallas
    projectsContainer.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openPrototypeModal(id);
      });
    });
  }

  // Filtrado de pestañas
  const filterBtns = container.querySelectorAll('.filter-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderProjects();
    });
  });

  // Modal de Prototipo
  const protoModal = container.querySelector('#prototype-preview-modal');
  const closeProtoBtn = container.querySelector('#close-proto-modal-btn');
  const protoScreenImg = container.querySelector('#proto-device-screen');
  const protoTitle = container.querySelector('#proto-modal-title');
  const protoIndicator = container.querySelector('#proto-screen-indicator');
  const protoPrevBtn = container.querySelector('#proto-prev-btn');
  const protoNextBtn = container.querySelector('#proto-next-btn');

  let activeProject = null;
  let currentScreenIndex = 0;

  function openPrototypeModal(projectId) {
    activeProject = MOCK_PROJECTS.find(p => p.id === projectId);
    if (!activeProject || !activeProject.screens.length) return;

    currentScreenIndex = 0;
    updateModalScreen();
    protoModal.classList.add('active');
  }

  function updateModalScreen() {
    protoTitle.textContent = `${activeProject.name} (Pantalla ${currentScreenIndex + 1})`;
    protoScreenImg.src = activeProject.screens[currentScreenIndex];
    protoIndicator.textContent = `Pantalla ${currentScreenIndex + 1} de ${activeProject.screens.length}`;
    protoPrevBtn.disabled = currentScreenIndex === 0;
    protoNextBtn.disabled = currentScreenIndex === activeProject.screens.length - 1;
  }

  protoPrevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentScreenIndex > 0) {
      currentScreenIndex--;
      updateModalScreen();
    }
  });

  protoNextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (activeProject && currentScreenIndex < activeProject.screens.length - 1) {
      currentScreenIndex++;
      updateModalScreen();
    }
  });

  closeProtoBtn.addEventListener('click', () => protoModal.classList.remove('active'));
  protoModal.addEventListener('click', (e) => {
    if (e.target === protoModal) protoModal.classList.remove('active');
  });

  // Botones de acción rápida en el hero
  container.querySelector('#quick-graphql-btn').addEventListener('click', () => {
    const navItem = document.querySelector('[data-view="graphql"]');
    if (navItem) navItem.click();
  });

  container.querySelector('#quick-story-btn').addEventListener('click', () => {
    const storyBtn = document.getElementById('open-story-modal-btn');
    if (storyBtn) storyBtn.click();
  });

  renderProjects();
}
