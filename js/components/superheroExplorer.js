/* ==========================================================================
   SUPERHERO API EXPLORER
   Documentación: https://www.superheroapi.com/
   ========================================================================== */

import { superheroApi } from '../api/superheroApi.js';
import { SUPERHERO_API_CONFIG } from '../config.js';

export function renderSuperheroExplorer(container) {
  if (!container) return;

  const currentToken = superheroApi.getToken();

  container.innerHTML = `
    <div class="section-card">
      <div class="section-card-header">
        <div>
          <h2>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
            Consola Superhero API (superheroapi.com)
          </h2>
          <p style="font-size: 0.8125rem; margin-top: 0.25rem;">
            Consulta la API de personajes, powerstats e imágenes en <code>${SUPERHERO_API_CONFIG.officialBaseUrl}</code> sin requerir backend.
          </p>
        </div>

        <a href="${SUPERHERO_API_CONFIG.documentationUrl}" target="_blank" rel="noopener" class="btn-ghost" style="font-size: 0.75rem;">
          Documentación Oficial SuperheroAPI ↗
        </a>
      </div>

      <!-- Configuración de Token de superheroapi.com -->
      <div class="api-token-banner">
        <div>
          <strong style="color: var(--marvel-red); display: block; font-size: 0.875rem;">
            🔑 Token de Acceso SuperheroAPI
          </strong>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">
            Obtén tu token iniciando sesión en <a href="https://www.superheroapi.com/" target="_blank" rel="noopener">superheroapi.com</a> o usa la base local de respaldo integrada.
          </span>
        </div>

        <div class="token-input-group">
          <input type="password" id="hero-token-input" placeholder="Tu Access Token de superheroapi.com" value="${currentToken || ''}">
          <button class="btn-primary" id="save-hero-token-btn" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;">
            Guardar Token
          </button>
        </div>
      </div>

      <!-- Barra de Prueba de Búsqueda de Personajes -->
      <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
        <input type="text" id="hero-search-query-input" class="search-input" placeholder="Nombre de superhéroe (ej. Spider-Man, Batman, Thor, Hulk...)" style="flex: 1; min-width: 250px;" value="Spider-Man">
        
        <button class="btn-primary" id="run-hero-search-btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Buscar en Superhero API
        </button>
      </div>

      <!-- Consola de Resultados JSON -->
      <div class="graphql-console-container">
        <!-- Panel Izquierdo: Endpoint y Parámetros -->
        <div class="graphql-pane">
          <div class="pane-header">
            <span class="pane-title">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              Endpoint Solicitado
            </span>
            <span class="badge badge-neutral" style="font-size: 0.6875rem;">REST API</span>
          </div>
          <div style="padding: 1.25rem; background: #0b1120; color: #38bdf8; font-family: monospace; font-size: 0.8125rem; font-weight: 700;" id="hero-endpoint-preview">
            GET https://superheroapi.com/api.php/{token}/search/Spider-Man
          </div>
          <div style="padding: 1rem 1.25rem; font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; border-top: 1px solid var(--border-default);">
            <strong>Campos disponibles en la respuesta:</strong>
            <ul style="padding-left: 1.2rem; margin-top: 0.35rem;">
              <li><code>powerstats</code> (intelligence, strength, speed, durability, power, combat)</li>
              <li><code>biography</code> (full-name, alter-egos, aliases, publisher, alignment)</li>
              <li><code>appearance</code> (gender, race, height, weight, eye-color, hair-color)</li>
              <li><code>work</code> (occupation, base)</li>
              <li><code>image</code> (url)</li>
            </ul>
          </div>
        </div>

        <!-- Panel Derecho: Respuesta JSON -->
        <div class="graphql-pane">
          <div class="pane-header">
            <span class="pane-title">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Respuesta JSON de la API
            </span>
            <span id="hero-status-badge" class="badge badge-success" style="font-size: 0.6875rem;">200 OK</span>
          </div>
          <pre id="hero-response-viewer" class="graphql-response-viewer">// Cargando datos de Superhero API...</pre>
          <div class="pane-footer">
            <button class="btn-ghost" id="copy-hero-json-btn" style="font-size: 0.6875rem; padding: 0.2rem 0.5rem;">
              Copiar JSON
            </button>
            <span id="hero-meta-latency" style="font-size: 0.6875rem; color: var(--text-muted);">Latencia: ~38ms</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const queryInput = container.querySelector('#hero-search-query-input');
  const runBtn = container.querySelector('#run-hero-search-btn');
  const responseViewer = container.querySelector('#hero-response-viewer');
  const statusBadge = container.querySelector('#hero-status-badge');
  const endpointPreview = container.querySelector('#hero-endpoint-preview');
  const latencySpan = container.querySelector('#hero-meta-latency');
  const tokenInput = container.querySelector('#hero-token-input');
  const saveTokenBtn = container.querySelector('#save-hero-token-btn');
  const copyBtn = container.querySelector('#copy-hero-json-btn');

  saveTokenBtn.addEventListener('click', () => {
    superheroApi.setToken(tokenInput.value);
    alert('Token de Superhero API guardado.');
  });

  async function search() {
    const q = queryInput.value.trim() || 'Spider-Man';
    runBtn.disabled = true;
    runBtn.textContent = 'Consultando...';
    statusBadge.textContent = 'Enviando...';
    statusBadge.className = 'badge badge-warning';

    const token = superheroApi.getToken() || '{token}';
    endpointPreview.textContent = `GET https://superheroapi.com/api.php/${token}/search/${encodeURIComponent(q)}`;

    const start = performance.now();
    try {
      const results = await superheroApi.searchHeroes(q);
      const elapsed = Math.round(performance.now() - start);

      latencySpan.textContent = `Latencia: ${elapsed}ms (${superheroApi.getToken() ? 'Live Token' : 'Local/CDN Mirror'})`;
      statusBadge.textContent = '200 OK';
      statusBadge.className = 'badge badge-success';

      responseViewer.textContent = JSON.stringify({
        response: 'success',
        'results-for': q,
        total: results.length,
        results: results.slice(0, 3) // Mostrar los primeros 3 para no saturar
      }, null, 2);
    } catch (e) {
      statusBadge.textContent = 'Error';
      statusBadge.className = 'badge badge-danger';
      responseViewer.textContent = JSON.stringify({ error: e.message }, null, 2);
    } finally {
      runBtn.disabled = false;
      runBtn.innerHTML = `
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        Buscar en Superhero API
      `;
    }
  }

  runBtn.addEventListener('click', search);
  queryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') search();
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(responseViewer.textContent);
    copyBtn.textContent = '¡Copiado!';
    setTimeout(() => { copyBtn.textContent = 'Copiar JSON'; }, 1800);
  });

  // Ejecución inicial
  setTimeout(search, 150);
}
