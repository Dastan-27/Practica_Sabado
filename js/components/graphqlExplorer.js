/* ==========================================================================
   GRAPHQL EXPLORER: Consola de Consultas a la API de MarvelApp
   Documentación: https://marvelapp.com/developers/documentation/getting-started/
   ========================================================================== */

import { marvelApi } from '../api/marvelApi.js';
import { MARVEL_API_CONFIG } from '../config.js';

const PRESET_QUERIES = {
  user: `# Consulta 1: Obtener detalles del diseñador autenticado
query GetUserProfile {
  user {
    id
    email
    name
    username
    company
    plan
  }
}`,
  projects: `# Consulta 2: Listar prototipos y proyectos de diseño de MarvelApp
query GetUserProjects {
  user {
    projects {
      totalCount
      edges {
        node {
          id
          name
          isPrototype
          screensCount
          status
        }
      }
    }
  }
}`,
  teams: `# Consulta 3: Equipos y colaboradores en la organización
query GetOrganizationTeams {
  user {
    teams {
      totalCount
      edges {
        node {
          id
          name
          role
          membersCount
        }
      }
    }
  }
}`
};

export function renderGraphqlExplorer(container) {
  if (!container) return;

  const currentToken = marvelApi.getToken();

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
            MarvelApp GraphQL API Explorer
          </h2>
          <p style="font-size: 0.8125rem; margin-top: 0.25rem;">
            Interactúa en vivo con el endpoint <code>${MARVEL_API_CONFIG.graphqlEndpoint}</code> sin requerir un backend propio.
          </p>
        </div>

        <a href="${MARVEL_API_CONFIG.documentationUrl}" target="_blank" rel="noopener" class="btn-ghost" style="font-size: 0.75rem;">
          Documentación Oficial ↗
        </a>
      </div>

      <!-- Configuración de Token de MarvelApp -->
      <div class="api-token-banner">
        <div>
          <strong style="color: var(--marvel-blue); display: block; font-size: 0.875rem;">
            🔑 MarvelApp Personal Access Token
          </strong>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">
            Obtén tu token personal en <a href="https://marvelapp.com/oauth/devtoken" target="_blank" rel="noopener">marvelapp.com/oauth/devtoken</a> o usa el modo sandbox integrado.
          </span>
        </div>

        <div class="token-input-group">
          <input type="password" id="marvel-token-input" placeholder="Bearer Token (opcional para sandbox)" value="${currentToken || ''}">
          <button class="btn-primary" id="save-token-btn" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;">
            Guardar
          </button>
        </div>
      </div>

      <!-- Selector de Consultas Predefinidas -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
        <div style="display: flex; gap: 0.5rem;">
          <button class="filter-tab-btn active" data-preset="projects">Proyectos & Pantallas</button>
          <button class="filter-tab-btn" data-preset="user">Perfil de Usuario</button>
          <button class="filter-tab-btn" data-preset="teams">Equipos</button>
        </div>

        <button class="btn-primary" id="run-graphql-btn">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Ejecutar Consulta GraphQL
        </button>
      </div>

      <!-- Consola Dividida (Editor a la izquierda, Respuesta a la derecha) -->
      <div class="graphql-console-container">
        <!-- Editor de Consulta -->
        <div class="graphql-pane">
          <div class="pane-header">
            <span class="pane-title">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              GraphQL Query (POST Payload)
            </span>
            <span class="badge badge-neutral" style="font-size: 0.6875rem;">GraphQL Schema</span>
          </div>
          <textarea id="graphql-query-editor" class="graphql-editor" spellcheck="false">${PRESET_QUERIES.projects}</textarea>
          <div class="pane-footer">
            <span style="font-size: 0.6875rem; color: var(--text-muted);">POST a ${MARVEL_API_CONFIG.graphqlEndpoint}</span>
          </div>
        </div>

        <!-- Visor de Respuesta -->
        <div class="graphql-pane">
          <div class="pane-header">
            <span class="pane-title">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Respuesta JSON
            </span>
            <span id="graphql-status-badge" class="badge badge-success" style="font-size: 0.6875rem;">200 OK (Listo)</span>
          </div>
          <pre id="graphql-response-display" class="graphql-response-viewer">// Haz clic en "Ejecutar Consulta GraphQL" para ver la respuesta en tiempo real.</pre>
          <div class="pane-footer">
            <button class="btn-ghost" id="copy-response-btn" style="font-size: 0.6875rem; padding: 0.2rem 0.5rem;">
              Copiar JSON
            </button>
            <span id="response-meta-time" style="font-size: 0.6875rem; color: var(--text-muted);">Latencia: ~42ms</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Elementos
  const editor = container.querySelector('#graphql-query-editor');
  const responseDisplay = container.querySelector('#graphql-response-display');
  const runBtn = container.querySelector('#run-graphql-btn');
  const statusBadge = container.querySelector('#graphql-status-badge');
  const latencyDisplay = container.querySelector('#response-meta-time');
  const tokenInput = container.querySelector('#marvel-token-input');
  const saveTokenBtn = container.querySelector('#save-token-btn');
  const presetBtns = container.querySelectorAll('[data-preset]');
  const copyBtn = container.querySelector('#copy-response-btn');

  // Guardar Token
  saveTokenBtn.addEventListener('click', () => {
    marvelApi.setToken(tokenInput.value);
    alert('Token guardado correctamente en la sesión.');
  });

  // Cambiar Presets
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const presetKey = btn.getAttribute('data-preset');
      if (PRESET_QUERIES[presetKey]) {
        editor.value = PRESET_QUERIES[presetKey];
      }
    });
  });

  // Ejecutar Consulta
  async function execute() {
    runBtn.disabled = true;
    runBtn.textContent = 'Ejecutando...';
    statusBadge.textContent = 'Enviando...';
    statusBadge.className = 'badge badge-warning';

    const startTime = performance.now();
    const query = editor.value;

    try {
      const result = await marvelApi.executeGraphQL(query);
      const elapsed = Math.round(performance.now() - startTime);

      latencyDisplay.textContent = `Latencia: ${elapsed}ms (${result.isLive ? '🟢 En Vivo' : '⚡ Sandbox Mock'})`;
      statusBadge.textContent = result.isLive ? '200 OK (Marvel Live)' : '200 OK (Sandbox Mock)';
      statusBadge.className = 'badge badge-success';

      responseDisplay.textContent = JSON.stringify(result, null, 2);
    } catch (err) {
      statusBadge.textContent = 'Error de Red / CORS';
      statusBadge.className = 'badge badge-danger';
      responseDisplay.textContent = JSON.stringify({ error: err.message }, null, 2);
    } finally {
      runBtn.disabled = false;
      runBtn.innerHTML = `
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Ejecutar Consulta GraphQL
      `;
    }
  }

  runBtn.addEventListener('click', execute);

  // Copiar respuesta
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(responseDisplay.textContent);
    copyBtn.textContent = '¡Copiado!';
    setTimeout(() => { copyBtn.textContent = 'Copiar JSON'; }, 1800);
  });

  // Ejecutar una consulta inicial automáticamente
  setTimeout(execute, 200);
}
