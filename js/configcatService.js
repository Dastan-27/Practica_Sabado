/* ==========================================================================
   CONFIGCAT FEATURE TOGGLE SERVICE
   Integración con @configcat/sdk para Trunk-Based Development
   ========================================================================== */

import * as configcat from '@configcat/sdk';

// Claves de Feature Toggles gestionados en ConfigCat
export const FEATURE_KEYS = {
  SUPERHERO_BATTLE_ARENA: 'superhero_battle_arena',
  DARK_MODE_V2: 'dark_mode_v2',
  ADVANCED_ANALYTICS: 'advanced_analytics'
};

class ConfigCatService {
  constructor() {
    this.sdkKey = (typeof localStorage !== 'undefined' && localStorage.getItem('configcat_sdk_key')) || 'PKDVCLfd-5kick_example_sandbox_key/DEMO_KEY_SUPERHERO';
    this.client = null;
    this.isReady = false;
    this.listeners = new Set();

    // Estado local / fallback de toggles (Default seguro: OFF)
    this.flags = {
      [FEATURE_KEYS.SUPERHERO_BATTLE_ARENA]: false,
      [FEATURE_KEYS.DARK_MODE_V2]: true,
      [FEATURE_KEYS.ADVANCED_ANALYTICS]: false
    };

    // Cargar overrides locales de prueba si existen
    try {
      if (typeof localStorage !== 'undefined') {
        const savedBattle = localStorage.getItem(`override_${FEATURE_KEYS.SUPERHERO_BATTLE_ARENA}`);
        if (savedBattle !== null) {
          this.flags[FEATURE_KEYS.SUPERHERO_BATTLE_ARENA] = savedBattle === 'true';
        }
      }
    } catch (e) {
      console.warn('No se pudo acceder a localStorage para flags:', e);
    }

    this.initClient();
  }

  initClient() {
    // Si la clave es un placeholder o no tiene el formato estándar de ConfigCat, operar en modo sandbox local
    const isValidKeyFormat = typeof this.sdkKey === 'string' && 
                             this.sdkKey.length >= 20 && 
                             !this.sdkKey.includes('example_sandbox');

    if (!isValidKeyFormat) {
      this.isReady = true;
      return;
    }

    try {
      this.client = configcat.getClient(this.sdkKey, configcat.PollingMode.AutoPoll, {
        pollIntervalSeconds: 60,
        logger: configcat.createConsoleLogger(configcat.LogLevel.Warn)
      });

      this.client.getValueAsync(FEATURE_KEYS.SUPERHERO_BATTLE_ARENA, this.flags[FEATURE_KEYS.SUPERHERO_BATTLE_ARENA])
        .then(value => {
          this.isReady = true;
          // Si no hay override manual, actualizar con el valor de ConfigCat
          if (typeof localStorage !== 'undefined' && localStorage.getItem(`override_${FEATURE_KEYS.SUPERHERO_BATTLE_ARENA}`) === null) {
            this.flags[FEATURE_KEYS.SUPERHERO_BATTLE_ARENA] = Boolean(value);
          }
          this.notify();
        })
        .catch(err => {
          console.info('ConfigCat SDK usando modo fallback local / sandbox:', err.message || err);
          this.isReady = true;
          this.notify();
        });
    } catch (err) {
      console.info('ConfigCat SDK inicializado en modo defensivo local:', err);
      this.isReady = true;
    }
  }

  // Actualizar SDK Key en caliente (desde UI o variables)
  setSdkKey(newKey) {
    if (!newKey) return;
    this.sdkKey = newKey.trim();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('configcat_sdk_key', this.sdkKey);
      localStorage.removeItem(`override_${FEATURE_KEYS.SUPERHERO_BATTLE_ARENA}`);
    }
    this.initClient();
  }

  getSdkKey() {
    return this.sdkKey;
  }

  // Obtener valor sincrónico del toggle
  isFeatureEnabled(key) {
    return Boolean(this.flags[key]);
  }

  // Conveniencia para la historia sliceada: Arena de Batalla
  isBattleArenaEnabled() {
    return this.isFeatureEnabled(FEATURE_KEYS.SUPERHERO_BATTLE_ARENA);
  }

  // Conmutador manual para demostración rápida en vivo (Demo Toggle ON / OFF)
  setFeatureToggle(key, isEnabled) {
    this.flags[key] = Boolean(isEnabled);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`override_${key}`, String(isEnabled));
    }
    this.notify();
  }

  // Limpiar overrides y volver a la configuración remota
  resetToRemote(key) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(`override_${key}`);
    }
    if (this.client) {
      this.client.getValueAsync(key, false).then(val => {
        this.flags[key] = Boolean(val);
        this.notify();
      });
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.flags);
      } catch (e) {
        console.error('Error en listener de ConfigCat:', e);
      }
    }
  }
}

export const configCatService = new ConfigCatService();
