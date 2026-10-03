/* ==========================================================================
   SLICED FEATURE: SUPERHERO BATTLE ARENA (PROTEGIDA POR CONFIGCAT)
   Historia nueva protegida con Feature Toggle (superhero_battle_arena)
   ========================================================================== */

import { POPULAR_SUPERHEROES } from '../api/mockHeroes.js';
import { configCatService, FEATURE_KEYS } from '../configcatService.js';

export function renderBattleArena(container) {
  if (!container) return;

  const isEnabled = configCatService.isBattleArenaEnabled();

  // Si el toggle está APAGADO (OFF), mostramos la vista protegida con información pedagógica
  if (!isEnabled) {
    container.innerHTML = `
      <section class="welcome-hero" style="background: linear-gradient(135deg, #1e293b, #0f172a); border-left: 4px solid var(--marvel-red);">
        <div class="hero-text">
          <span class="badge badge-warning" style="margin-bottom: 0.5rem;">
            🔒 FEATURE TOGGLE: APAGADO (OFF)
          </span>
          <h1>Simulador de Batalla 1v1</h1>
          <p>
            Esta funcionalidad está integrada en <code>main</code> bajo la disciplina de <strong>Trunk-Based Development (TBD)</strong>, pero se encuentra oculta para los usuarios finales mediante <strong>ConfigCat</strong>.
          </p>
        </div>
      </section>

      <div style="background: var(--color-surface); border: 2px dashed var(--color-border); border-radius: var(--radius-lg); padding: 3rem 2rem; text-align: center; margin-top: 1.5rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🛡️</div>
        <h2 style="font-size: 1.5rem; margin-bottom: 0.75rem;">Funcionalidad Protegida por Feature Flag</h2>
        <p style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto 1.5rem auto;">
          Para activar esta funcionalidad sin necesidad de hacer un nuevo despliegue ni esperar a completar el sprint, activa el toggle <code>${FEATURE_KEYS.SUPERHERO_BATTLE_ARENA}</code> desde la consola de ConfigCat o usando el botón de demostración en vivo de la barra superior.
        </p>

        <button id="btn-quick-enable-battle" class="btn btn-primary" style="font-size: 1rem; padding: 0.75rem 1.75rem; background: var(--marvel-red); border-color: var(--marvel-red);">
          ⚡ Activar Toggle en Vivo (Demostración PO)
        </button>
      </div>
    `;

    const quickBtn = container.querySelector('#btn-quick-enable-battle');
    if (quickBtn) {
      quickBtn.addEventListener('click', () => {
        configCatService.setFeatureToggle(FEATURE_KEYS.SUPERHERO_BATTLE_ARENA, true);
      });
    }
    return;
  }

  // Si el toggle está ENCENDIDO (ON), renderizamos la arena completa de combate
  const heroes = POPULAR_SUPERHEROES;
  let hero1 = heroes[0]; // Spider-Man
  let hero2 = heroes[8]; // Thanos

  container.innerHTML = `
    <section class="welcome-hero" style="background: linear-gradient(135deg, #7f1d1d, #450a0a); border-left: 4px solid #ef4444;">
      <div class="hero-text">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
          <span class="badge badge-success">
            🟢 FEATURE TOGGLE: ACTIVO (ON)
          </span>
          <span class="badge" style="background: rgba(255,255,255,0.2); color: white;">
            ConfigCat: ${FEATURE_KEYS.SUPERHERO_BATTLE_ARENA}
          </span>
        </div>
        <h1>⚔️ Arena de Batalla de Superhéroes</h1>
        <p>
          Simulador de combate 1v1 en tiempo real comparando estadísticas oficiales de Superhero API.
        </p>
      </div>
    </section>

    <!-- Panel de Selección de Contendientes -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
      <!-- Luchador 1 -->
      <div class="stat-card" style="border: 2px solid var(--marvel-blue);">
        <div class="stat-header">
          <span class="badge badge-primary">Contendiente 1 (Azul)</span>
          <select id="select-hero-1" class="search-input" style="width: auto; padding: 0.3rem 0.6rem;">
            ${heroes.map((h, i) => `<option value="${h.id}" ${i === 0 ? 'selected' : ''}>${h.name} (${h.biography?.publisher || 'Héroe'})</option>`).join('')}
          </select>
        </div>
        <div id="fighter-1-card" style="margin-top: 1rem; text-align: center;">
          <!-- Dinámico -->
        </div>
      </div>

      <!-- Luchador 2 -->
      <div class="stat-card" style="border: 2px solid var(--marvel-red);">
        <div class="stat-header">
          <span class="badge badge-danger">Contendiente 2 (Rojo)</span>
          <select id="select-hero-2" class="search-input" style="width: auto; padding: 0.3rem 0.6rem;">
            ${heroes.map((h, i) => `<option value="${h.id}" ${h.id === '10' ? 'selected' : ''}>${h.name} (${h.biography?.publisher || 'Héroe'})</option>`).join('')}
          </select>
        </div>
        <div id="fighter-2-card" style="margin-top: 1rem; text-align: center;">
          <!-- Dinámico -->
        </div>
      </div>
    </div>

    <!-- Botón de Simulación -->
    <div style="text-align: center; margin: 2rem 0;">
      <button id="btn-simulate-fight" class="btn btn-primary" style="font-size: 1.2rem; padding: 0.85rem 2.5rem; background: linear-gradient(135deg, #e62429, #b91c1c); box-shadow: 0 4px 15px rgba(230,36,41,0.4);">
        💥 Iniciar Simulación de Combate
      </button>
    </div>

    <!-- Resultados del Combate -->
    <div id="battle-result-container" style="display: none; background: var(--color-surface); border-radius: var(--radius-lg); border: 2px solid var(--color-border); padding: 2rem; margin-bottom: 2rem;">
      <!-- Dinámico -->
    </div>
  `;

  function updateFighter(hero, containerId, color) {
    const el = document.getElementById(containerId);
    if (!el || !hero) return;
    const stats = hero.powerstats || {};
    const totalPower = Object.values(stats).reduce((acc, val) => acc + (parseInt(val) || 0), 0);

    el.innerHTML = `
      <img src="${hero.images?.md || hero.image?.url || 'https://via.placeholder.com/200'}" alt="${hero.name}" style="width: 140px; height: 140px; object-fit: cover; border-radius: 50%; border: 4px solid ${color}; margin-bottom: 0.75rem;">
      <h3 style="font-size: 1.4rem; margin-bottom: 0.25rem;">${hero.name}</h3>
      <p style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.75rem;">${hero.biography?.fullName || hero.name}</p>
      <div style="background: rgba(0,0,0,0.05); padding: 0.5rem; border-radius: var(--radius-md); font-weight: 700; color: ${color};">
        Poder Total de Combate: ${totalPower} pts
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; font-size: 0.8rem; margin-top: 0.75rem; text-align: left;">
        <div>🧠 Inteligencia: <strong>${stats.intelligence || 50}</strong></div>
        <div>💪 Fuerza: <strong>${stats.strength || 50}</strong></div>
        <div>⚡ Velocidad: <strong>${stats.speed || 50}</strong></div>
        <div>🛡️ Durabilidad: <strong>${stats.durability || 50}</strong></div>
        <div>💥 Poder: <strong>${stats.power || 50}</strong></div>
        <div>🥊 Combate: <strong>${stats.combat || 50}</strong></div>
      </div>
    `;
  }

  // Inicializar contendientes
  updateFighter(hero1, 'fighter-1-card', 'var(--marvel-blue)');
  updateFighter(hero2, 'fighter-2-card', 'var(--marvel-red)');

  // Selectores
  const select1 = document.getElementById('select-hero-1');
  const select2 = document.getElementById('select-hero-2');

  if (select1) {
    select1.addEventListener('change', (e) => {
      hero1 = heroes.find(h => String(h.id) === String(e.target.value)) || heroes[0];
      updateFighter(hero1, 'fighter-1-card', 'var(--marvel-blue)');
    });
  }

  if (select2) {
    select2.addEventListener('change', (e) => {
      hero2 = heroes.find(h => String(h.id) === String(e.target.value)) || heroes[1];
      updateFighter(hero2, 'fighter-2-card', 'var(--marvel-red)');
    });
  }

  // Simulación
  const simulateBtn = document.getElementById('btn-simulate-fight');
  const resultBox = document.getElementById('battle-result-container');

  if (simulateBtn && resultBox) {
    simulateBtn.addEventListener('click', () => {
      const stats1 = hero1.powerstats || {};
      const stats2 = hero2.powerstats || {};

      let score1 = 0;
      let score2 = 0;
      const categories = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];

      const roundLogs = categories.map(cat => {
        const val1 = parseInt(stats1[cat]) || 50;
        const val2 = parseInt(stats2[cat]) || 50;
        let winner = 'Empate';
        if (val1 > val2) {
          score1++;
          winner = `Gana ${hero1.name}`;
        } else if (val2 > val1) {
          score2++;
          winner = `Gana ${hero2.name}`;
        }
        return `
          <div style="display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid var(--color-border); font-size: 0.9rem;">
            <span>${cat.toUpperCase()}: <strong>${val1}</strong> vs <strong>${val2}</strong></span>
            <span style="font-weight: 700; color: ${winner.includes(hero1.name) ? 'var(--marvel-blue)' : winner.includes(hero2.name) ? 'var(--marvel-red)' : 'var(--color-text-secondary)'};">
              ${winner}
            </span>
          </div>
        `;
      }).join('');

      let finalWinner = score1 > score2 ? hero1 : score2 > score1 ? hero2 : null;

      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 2rem; color: ${finalWinner === hero1 ? 'var(--marvel-blue)' : finalWinner === hero2 ? 'var(--marvel-red)' : 'var(--color-warning)'};">
            🏆 ${finalWinner ? `¡${finalWinner.name} es el Ganador!` : '¡Empate Épico!'}
          </h2>
          <p style="font-size: 1.1rem; color: var(--color-text-secondary);">
            Marcador de Rondas: ${hero1.name} (${score1}) - ${hero2.name} (${score2})
          </p>
        </div>
        <div style="max-width: 600px; margin: 0 auto; background: var(--color-surface-card); border-radius: var(--radius-md); padding: 1rem;">
          <h4 style="margin-bottom: 0.75rem; border-bottom: 2px solid var(--color-border); padding-bottom: 0.4rem;">Desglose de Estadísticas:</h4>
          ${roundLogs}
        </div>
      `;
      resultBox.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
