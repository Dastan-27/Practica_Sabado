/* ==========================================================================
   SUPERHERO DASHBOARD VIEW
   Conectado a https://www.superheroapi.com/
   ========================================================================== */

import { superheroApi } from '../api/superheroApi.js';

export function renderSuperheroDashboard(container) {
  if (!container) return;

  container.innerHTML = `
    <!-- Hero Banner Limpio -->
    <section class="welcome-hero" aria-label="Catálogo de Superhéroes">
      <div class="hero-text">
        <span class="badge" style="background: rgba(255,255,255,0.25); color: #fff; margin-bottom: 0.5rem; font-weight: 800;">
          API: superheroapi.com
        </span>
        <h1>Directorio de Superhéroes</h1>
        <p>
          Base de datos de personajes de Marvel Comics y DC Comics con estadísticas de poder, biografías completas y fichas técnicas.
        </p>
      </div>
    </section>

    <!-- Grilla de Métricas KPI -->
    <section class="stats-grid" aria-label="Estadísticas de Superhéroes">
      <article class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Superhéroes Listados</span>
          <div class="stat-icon-wrapper blue">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </div>
        </div>
        <div class="stat-value" id="kpi-total-heroes">12</div>
        <div class="stat-footer">
          <span class="stat-trend positive">730+</span>
          <span class="stat-subtext">personajes en la API</span>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Marvel Comics</span>
          <div class="stat-icon-wrapper orange">
            <span style="font-weight: 900; font-size: 15px; color: var(--marvel-red);">M</span>
          </div>
        </div>
        <div class="stat-value" id="kpi-marvel-heroes">8</div>
        <div class="stat-footer">
          <span class="stat-trend positive">Spider-Man, Thor...</span>
          <span class="stat-subtext">Universo Marvel</span>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-header">
          <span class="stat-title">DC Comics</span>
          <div class="stat-icon-wrapper purple">
            <span style="font-weight: 900; font-size: 15px; color: var(--dc-blue);">DC</span>
          </div>
        </div>
        <div class="stat-value" id="kpi-dc-heroes">4</div>
        <div class="stat-footer">
          <span class="stat-trend positive">Batman, Superman...</span>
          <span class="stat-subtext">Universo DC</span>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Nivel Máximo (Tier S)</span>
          <div class="stat-icon-wrapper green">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
        </div>
        <div class="stat-value">100%</div>
        <div class="stat-footer">
          <span class="stat-trend positive">Superman / Thor</span>
          <span class="stat-subtext">Powerstats Top</span>
        </div>
      </article>
    </section>

    <!-- Contenedor Principal: Filtros y Tarjetas de Personajes -->
    <section class="section-card">
      <div class="section-card-header">
        <div>
          <h2>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            Personajes y Estadísticas de Combate
          </h2>
          <p style="font-size: 0.8125rem;">Haz clic sobre cualquier superhéroe para abrir su ficha técnica detallada.</p>
        </div>

        <!-- Filtros de Editorial / Alineación -->
        <div class="section-filter-tabs" id="hero-filter-tabs">
          <button class="filter-tab-btn active" data-filter="all">Todos</button>
          <button class="filter-tab-btn" data-filter="marvel">Marvel</button>
          <button class="filter-tab-btn" data-filter="dc">DC Comics</button>
          <button class="filter-tab-btn" data-filter="good">Héroes</button>
          <button class="filter-tab-btn" data-filter="bad">Villanos</button>
        </div>
      </div>

      <!-- Grilla de Tarjetas de Superhéroes -->
      <div class="projects-gallery-grid" id="heroes-cards-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
        <!-- Renderizado dinámico -->
      </div>
    </section>

    <!-- Modal de Ficha Técnica Completa de Superhéroe -->
    <div class="modal-overlay" id="hero-detail-modal" role="dialog" aria-modal="true">
      <div class="modal-container" style="max-width: 680px;" id="hero-modal-content">
        <!-- Contenido inyectado dinámicamente -->
      </div>
    </div>
  `;

  const heroesGrid = container.querySelector('#heroes-cards-grid');
  const filterBtns = container.querySelectorAll('.filter-tab-btn');
  const modal = container.querySelector('#hero-detail-modal');
  let currentFilter = 'all';
  let heroesList = [];

  function calculateTotalPower(powerstats) {
    const stats = Object.values(powerstats).map(v => parseInt(v, 10) || 0);
    const sum = stats.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / stats.length);
  }

  function renderCards() {
    let filtered = heroesList;

    if (currentFilter === 'marvel') {
      filtered = heroesList.filter(h => (h.biography?.publisher || '').toLowerCase().includes('marvel'));
    } else if (currentFilter === 'dc') {
      filtered = heroesList.filter(h => (h.biography?.publisher || '').toLowerCase().includes('dc'));
    } else if (currentFilter === 'good') {
      filtered = heroesList.filter(h => (h.biography?.alignment || '').toLowerCase() === 'good');
    } else if (currentFilter === 'bad') {
      filtered = heroesList.filter(h => (h.biography?.alignment || '').toLowerCase() === 'bad');
    }

    if (!filtered.length) {
      heroesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
          No se encontraron personajes para este filtro.
        </div>
      `;
      return;
    }

    heroesGrid.innerHTML = filtered.map(hero => {
      const avgPower = calculateTotalPower(hero.powerstats);
      const isMarvel = (hero.biography?.publisher || '').toLowerCase().includes('marvel');
      const isGood = hero.biography?.alignment === 'good';

      return `
        <article class="project-card" data-hero-id="${hero.id}" title="Ver ficha de ${hero.name}">
          <div class="project-card-thumb" style="height: 220px; background: #0b1120;">
            <img src="${hero.image?.url}" alt="${hero.name}" class="project-thumb-img" loading="lazy" style="object-position: top center;" onerror="this.src='https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500'">
            <span class="badge ${isMarvel ? 'badge-danger' : 'badge-blue'} project-type-badge" style="font-weight: 800;">
              ${hero.biography?.publisher || 'Comic'}
            </span>
            <div class="project-screens-pill" style="left: auto; right: 0.75rem;">
              ⚡ Nivel: ${avgPower}%
            </div>
          </div>

          <div class="project-card-body">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h3>${hero.name}</h3>
              <span class="badge ${isGood ? 'badge-success' : 'badge-warning'}" style="font-size: 0.65rem;">
                ${isGood ? 'Héroe' : 'Villano / Anti'}
              </span>
            </div>
            <p class="project-meta-desc">
              <strong>${hero.biography?.['full-name'] || hero.name}</strong> • ${hero.work?.base || 'Base Desconocida'}
            </p>

            <!-- Mini barras de estadísticas clave -->
            <div style="display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.5rem; font-size: 0.75rem;">
              <div>
                <div style="display: flex; justify-content: space-between; color: var(--text-secondary); margin-bottom: 2px;">
                  <span>Fuerza</span>
                  <strong>${hero.powerstats.strength}%</strong>
                </div>
                <div style="height: 4px; background: var(--border-default); border-radius: 2px; overflow: hidden;">
                  <div style="width: ${hero.powerstats.strength}%; height: 100%; background: #ef4444;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; color: var(--text-secondary); margin-bottom: 2px;">
                  <span>Inteligencia</span>
                  <strong>${hero.powerstats.intelligence}%</strong>
                </div>
                <div style="height: 4px; background: var(--border-default); border-radius: 2px; overflow: hidden;">
                  <div style="width: ${hero.powerstats.intelligence}%; height: 100%; background: #0284c7;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; color: var(--text-secondary); margin-bottom: 2px;">
                  <span>Poder</span>
                  <strong>${hero.powerstats.power}%</strong>
                </div>
                <div style="height: 4px; background: var(--border-default); border-radius: 2px; overflow: hidden;">
                  <div style="width: ${hero.powerstats.power}%; height: 100%; background: #10b981;"></div>
                </div>
              </div>
            </div>

            <div class="project-card-footer" style="margin-top: 0.75rem;">
              <span style="font-size: 0.75rem; color: var(--text-muted);">
                ID: #${hero.id}
              </span>
              <span style="font-size: 0.75rem; color: var(--marvel-red); font-weight: 700;">
                Ficha Técnica ↗
              </span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    heroesGrid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-hero-id');
        openHeroModal(id);
      });
    });
  }

  function openHeroModal(heroId) {
    const hero = heroesList.find(h => String(h.id) === String(heroId));
    if (!hero) return;

    const modalContent = container.querySelector('#hero-modal-content');
    modalContent.innerHTML = `
      <header class="modal-header">
        <div>
          <span class="badge ${hero.biography.publisher?.toLowerCase().includes('marvel') ? 'badge-danger' : 'badge-blue'}">
            ${hero.biography.publisher || 'Editorial'}
          </span>
          <h2 style="margin-top: 0.25rem;">${hero.name} (${hero.biography['full-name'] || hero.name})</h2>
        </div>
        <button class="modal-close-btn" id="close-hero-detail-btn">✕</button>
      </header>

      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
        <img src="${hero.image?.url}" alt="${hero.name}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-md); box-shadow: var(--shadow-md);">

        <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.8125rem;">
          <div>
            <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Biografía</strong>
            <p style="color: var(--text-primary);"><strong>Alias:</strong> ${Array.isArray(hero.biography.aliases) ? hero.biography.aliases.join(', ') : hero.biography.aliases}</p>
            <p style="color: var(--text-primary);"><strong>Lugar de Nacimiento:</strong> ${hero.biography['place-of-birth'] || '-'}</p>
            <p style="color: var(--text-primary);"><strong>Primera Aparición:</strong> ${hero.biography['first-appearance'] || '-'}</p>
            <p style="color: var(--text-primary);"><strong>Alineación:</strong> ${hero.biography.alignment === 'good' ? 'Heroica (Good)' : 'Villano / Neutral'}</p>
          </div>

          <div>
            <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Apariencia</strong>
            <p style="color: var(--text-primary);"><strong>Raza / Género:</strong> ${hero.appearance.race} • ${hero.appearance.gender}</p>
            <p style="color: var(--text-primary);"><strong>Altura / Peso:</strong> ${hero.appearance.height?.[1] || '-'} • ${hero.appearance.weight?.[1] || '-'}</p>
          </div>

          <div>
            <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Ocupación y Base</strong>
            <p style="color: var(--text-primary);">${hero.work?.occupation || '-'}</p>
            <p style="color: var(--text-muted);">${hero.work?.base || '-'}</p>
          </div>
        </div>
      </div>

      <h3 style="font-size: 1rem; margin-bottom: 0.75rem;">⚡ Powerstats (Estadísticas de Combate)</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
        ${Object.entries(hero.powerstats).map(([stat, val]) => `
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 2px;">
              <span style="text-transform: capitalize;">${stat}</span>
              <span>${val}%</span>
            </div>
            <div style="height: 6px; background: var(--border-default); border-radius: 3px; overflow: hidden;">
              <div style="width: ${val}%; height: 100%; background: var(--superhero-gradient);"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    modal.classList.add('active');

    modalContent.querySelector('#close-hero-detail-btn').addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderCards();
    });
  });

  // Cargar datos
  superheroApi.getAllHeroes().then(heroes => {
    heroesList = heroes;
    renderCards();

    const kpiTotal = container.querySelector('#kpi-total-heroes');
    const kpiMarvel = container.querySelector('#kpi-marvel-heroes');
    const kpiDc = container.querySelector('#kpi-dc-heroes');

    if (kpiTotal) kpiTotal.textContent = heroes.length;
    if (kpiMarvel) kpiMarvel.textContent = heroes.filter(h => (h.biography?.publisher || '').toLowerCase().includes('marvel')).length;
    if (kpiDc) kpiDc.textContent = heroes.filter(h => (h.biography?.publisher || '').toLowerCase().includes('dc')).length;
  });
}
