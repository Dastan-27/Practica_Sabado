/* ==========================================================================
   MOCK DATA: MarvelApp Prototyping Platform Data & Test Cohorts
   ========================================================================== */

export const SIMULATED_USERS = [
  {
    id: 'usr_alpha_04',
    name: 'Sofia Valenzuela (Cohorte 4%)',
    role: 'Lead UI/UX Designer',
    email: 'sofia.v@marvelapp-team.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    cohortScore: 4, // Está en el 10%
    inCanary10: true
  },
  {
    id: 'usr_beta_48',
    name: 'Mateo Cárdenas (Cohorte 48%)',
    role: 'Frontend Architect',
    email: 'mateo.c@marvelapp-team.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    cohortScore: 48, // Fuera del 10%
    inCanary10: false
  },
  {
    id: 'usr_gamma_08',
    name: 'Valentina Rios (Cohorte 8%)',
    role: 'Product Designer',
    email: 'valentina.r@marvelapp-team.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    cohortScore: 8, // Está en el 10%
    inCanary10: true
  },
  {
    id: 'usr_delta_73',
    name: 'Alejandro Morales (Cohorte 73%)',
    role: 'QA & Design Systems Lead',
    email: 'alejandro.m@marvelapp-team.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    cohortScore: 73, // Fuera del 10%
    inCanary10: false
  }
];

export const MOCK_PROJECTS = [
  {
    id: 'proj_fintech_24',
    name: 'Fintech NeoBank Mobile v2.4',
    category: 'prototype',
    isPrototype: true,
    status: 'Prototipo Activo',
    screensCount: 18,
    collaboratorsCount: 5,
    views: '3,420',
    userTestPassRate: '96.4%',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    updatedAt: 'Hace 12 min',
    screens: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80'
    ],
    collaborators: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'proj_ecommerce_checkout',
    name: 'E-Commerce 1-Click Checkout Redesign',
    category: 'review',
    isPrototype: true,
    status: 'En Revisión',
    screensCount: 12,
    collaboratorsCount: 4,
    views: '1,840',
    userTestPassRate: '92.1%',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    updatedAt: 'Hace 45 min',
    screens: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&auto=format&fit=crop&q=80'
    ],
    collaborators: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'proj_design_system_alpha',
    name: 'Marvel App Design System 3.0 (Tokens)',
    category: 'system',
    isPrototype: false,
    status: 'Aprobado',
    screensCount: 46,
    collaboratorsCount: 8,
    views: '8,950',
    userTestPassRate: '99.2%',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    updatedAt: 'Ayer',
    screens: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80'
    ],
    collaborators: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'proj_health_tracker',
    name: 'Health & Biometrics Smartwatch UI',
    category: 'prototype',
    isPrototype: true,
    status: 'Prototipo Activo',
    screensCount: 22,
    collaboratorsCount: 6,
    views: '4,110',
    userTestPassRate: '97.8%',
    thumbnail: 'https://images.unsplash.com/photo-1510519138161-58474dfab9c3?w=600&auto=format&fit=crop&q=80',
    updatedAt: 'Hace 2 horas',
    screens: [
      'https://images.unsplash.com/photo-1510519138161-58474dfab9c3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80'
    ],
    collaborators: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'proj_saas_analytics',
    name: 'SaaS Multi-Tenant Analytics Suite',
    category: 'draft',
    isPrototype: true,
    status: 'Borrador',
    screensCount: 14,
    collaboratorsCount: 3,
    views: '730',
    userTestPassRate: '88.5%',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    updatedAt: 'Hace 1 día',
    screens: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80'
    ],
    collaborators: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'proj_delivery_onboarding',
    name: 'Food & Groceries Onboarding Flow',
    category: 'prototype',
    isPrototype: true,
    status: 'Prototipo Activo',
    screensCount: 9,
    collaboratorsCount: 4,
    views: '2,340',
    userTestPassRate: '95.0%',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    updatedAt: 'Hace 3 horas',
    screens: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'
    ],
    collaborators: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80'
    ]
  }
];

export const MOCK_ACTIVITY_FEED = [
  {
    id: 1,
    author: 'Sofia Valenzuela',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    action: 'actualizó 3 pantallas en',
    target: 'Fintech NeoBank Mobile v2.4',
    time: 'Hace 10 min'
  },
  {
    id: 2,
    author: 'Mateo Cárdenas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    action: 'aprobó los wireframes de',
    target: 'E-Commerce 1-Click Checkout',
    time: 'Hace 38 min'
  },
  {
    id: 3,
    author: 'Valentina Rios',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    action: 'inició un test de usabilidad en',
    target: 'Health & Biometrics UI',
    time: 'Hace 1 hora'
  },
  {
    id: 4,
    author: 'MarvelApp Webhook',
    avatar: 'https://marvelapp.com/static/favicon.ico',
    action: 'sincronizó los tokens GraphQL de',
    target: 'Design System 3.0',
    time: 'Hace 2 horas'
  }
];
