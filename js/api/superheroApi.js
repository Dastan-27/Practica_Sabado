/* ==========================================================================
   SUPERHERO API CLIENT
   Documentación Oficial: https://www.superheroapi.com/
   Endpoints:
   - https://superheroapi.com/api.php/{access-token}/{character-id}
   - https://superheroapi.com/api.php/{access-token}/search/{name}
   ========================================================================== */

import { SUPERHERO_API_CONFIG } from '../config.js';
import { POPULAR_SUPERHEROES } from './mockHeroes.js';

class SuperheroApiClient {
  constructor() {
    this.token = localStorage.getItem(SUPERHERO_API_CONFIG.storageKeyToken) || '';
    this.cachedHeroes = [...POPULAR_SUPERHEROES];
    this.hasLoadedExternal = false;
  }

  setToken(newToken) {
    this.token = newToken.trim();
    if (this.token) {
      localStorage.setItem(SUPERHERO_API_CONFIG.storageKeyToken, this.token);
    } else {
      localStorage.removeItem(SUPERHERO_API_CONFIG.storageKeyToken);
    }
  }

  getToken() {
    return this.token;
  }

  // Cargar lista completa de personajes (vía CDN abierto o dataset interno)
  async getAllHeroes() {
    if (!this.hasLoadedExternal) {
      try {
        const response = await fetch(`${SUPERHERO_API_CONFIG.corsFreeCdnBaseUrl}all.json`, {
          signal: AbortSignal.timeout(3000)
        });
        if (response.ok) {
          const externalHeroes = await response.json();
          // Mapear al esquema exacto de superheroapi.com
          const mapped = externalHeroes.slice(0, 36).map(h => ({
            id: String(h.id),
            name: h.name,
            powerstats: h.powerstats,
            biography: {
              'full-name': h.biography?.fullName || h.name,
              'alter-egos': h.biography?.alterEgos || 'No alter egos found.',
              aliases: h.biography?.aliases || [],
              'place-of-birth': h.biography?.placeOfBirth || '-',
              'first-appearance': h.biography?.firstAppearance || '-',
              publisher: h.biography?.publisher || 'Marvel Comics',
              alignment: h.biography?.alignment || 'good'
            },
            appearance: {
              gender: h.appearance?.gender || '-',
              race: h.appearance?.race || '-',
              height: h.appearance?.height || ["-", "-"],
              weight: h.appearance?.weight || ["-", "-"],
              'eye-color': h.appearance?.eyeColor || '-',
              'hair-color': h.appearance?.hairColor || '-'
            },
            work: {
              occupation: h.work?.occupation || '-',
              base: h.work?.base || '-'
            },
            image: {
              url: h.images?.lg || h.images?.md || h.image?.url
            }
          }));

          // Mezclar con los populares prioritarios
          const popularIds = new Set(POPULAR_SUPERHEROES.map(p => p.name));
          this.cachedHeroes = [
            ...POPULAR_SUPERHEROES,
            ...mapped.filter(m => !popularIds.has(m.name))
          ];
          this.hasLoadedExternal = true;
        }
      } catch (e) {
        console.info('Usando dataset integrado de superhéroes (offline/rápido).');
      }
    }
    return this.cachedHeroes;
  }

  // Buscar héroes por nombre
  async searchHeroes(name) {
    const term = (name || '').trim().toLowerCase();
    if (!term) return this.getAllHeroes();

    // Si tiene token configurado de superheroapi.com, intentamos consulta en vivo
    if (this.token) {
      try {
        const url = `${SUPERHERO_API_CONFIG.officialBaseUrl}${this.token}/search/${encodeURIComponent(term)}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.response === 'success' && json.results) {
            return json.results;
          }
        }
      } catch (err) {
        console.warn('Fallo en superheroapi.com (usando búsqueda local):', err.message);
      }
    }

    // Búsqueda en el dataset en memoria
    const all = await this.getAllHeroes();
    return all.filter(h => {
      const matchName = h.name.toLowerCase().includes(term);
      const matchReal = (h.biography['full-name'] || '').toLowerCase().includes(term);
      const matchPub = (h.biography.publisher || '').toLowerCase().includes(term);
      return matchName || matchReal || matchPub;
    });
  }

  // Obtener un superhéroe por ID
  async getHeroById(id) {
    if (this.token) {
      try {
        const url = `${SUPERHERO_API_CONFIG.officialBaseUrl}${this.token}/${id}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.response === 'success') return json;
        }
      } catch (err) {
        console.warn('Fallo en superheroapi.com por ID:', err.message);
      }
    }

    const all = await this.getAllHeroes();
    return all.find(h => String(h.id) === String(id)) || null;
  }
}

export const superheroApi = new SuperheroApiClient();
