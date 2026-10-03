/* ==========================================================================
   CONFIGURACIÓN Y DEFINICIÓN DE TICKETS ÁGILES - SUPERHERO API
   ========================================================================== */

export const TICKETS = {
  TICKET_1: {
    id: 1,
    title: 'Ticket 1: Base CSS y Flag Oculto (0%)',
    summary: 'Definir variables CSS/tema oscuro y lógica de cambio de clase en el HTML raíz, detrás de un flag dark_mode_enabled apagado.',
    flagValue: false,
    rolloutPercentage: 0,
    persistenceEnabled: false,
    buttonVisible: false,
    tag: 'Feature Flag: OFF (0%)'
  },
  TICKET_2: {
    id: 2,
    title: 'Ticket 2: Canary Rollout 10% (Sin Persistencia)',
    summary: 'Agregar el botón toggle visible solo al 10% de usuarios, sin persistencia todavía.',
    flagValue: true,
    rolloutPercentage: 10,
    persistenceEnabled: false,
    buttonVisible: 'canary_10',
    tag: 'Canary Rollout: 10%'
  },
  TICKET_3: {
    id: 3,
    title: 'Ticket 3: GA 100% con Persistencia (localStorage)',
    summary: 'Guardar la preferencia (localStorage o backend) y subir el flag al 100%.',
    flagValue: true,
    rolloutPercentage: 100,
    persistenceEnabled: true,
    buttonVisible: true,
    tag: 'General Availability: 100%'
  }
};

export const SUPERHERO_API_CONFIG = {
  officialBaseUrl: 'https://www.superheroapi.com/api.php/',
  documentationUrl: 'https://www.superheroapi.com/',
  corsFreeCdnBaseUrl: 'https://akabab.github.io/superhero-api/api/',
  storageKeyToken: 'superhero_api_access_token',
  storageKeyTheme: 'superhero_theme_preference'
};
