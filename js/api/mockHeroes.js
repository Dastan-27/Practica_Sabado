/* ==========================================================================
   SUPERHERO DATASET (Schema oficial de https://www.superheroapi.com/)
   ========================================================================== */

export const POPULAR_SUPERHEROES = [
  {
    id: '620',
    name: 'Spider-Man',
    powerstats: {
      intelligence: 90,
      strength: 55,
      speed: 67,
      durability: 75,
      power: 74,
      combat: 85
    },
    biography: {
      'full-name': 'Peter Parker',
      'alter-egos': 'No alter egos found.',
      aliases: ['Spidey', 'Web-Slinger', 'Wall-Crawler'],
      'place-of-birth': 'New York, New York',
      'first-appearance': 'Amazing Fantasy #15 (August, 1962)',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Human',
      height: ["5'10", '178 cm'],
      weight: ['165 lb', '74 kg'],
      'eye-color': 'Hazel',
      'hair-color': 'Brown'
    },
    work: {
      occupation: 'Freelance photographer, scientist',
      base: 'New York City'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg'
    }
  },
  {
    id: '346',
    name: 'Iron Man',
    powerstats: {
      intelligence: 100,
      strength: 85,
      speed: 58,
      durability: 85,
      power: 100,
      combat: 64
    },
    biography: {
      'full-name': 'Tony Stark',
      'alter-egos': 'No alter egos found.',
      aliases: ['Shellhead', 'Golden Avenger', 'Invincible Iron Man'],
      'place-of-birth': 'Long Island, New York',
      'first-appearance': 'Tales of Suspense #39 (March, 1963)',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Human',
      height: ["6'6", '198 cm'],
      weight: ['425 lb', '191 kg'],
      'eye-color': 'Blue',
      'hair-color': 'Black'
    },
    work: {
      occupation: 'Inventor, Industrialist, Philanthropist',
      base: 'Stark Tower, New York City'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg'
    }
  },
  {
    id: '659',
    name: 'Thor',
    powerstats: {
      intelligence: 69,
      strength: 100,
      speed: 83,
      durability: 100,
      power: 100,
      combat: 100
    },
    biography: {
      'full-name': 'Thor Odinson',
      'alter-egos': 'No alter egos found.',
      aliases: ['God of Thunder', 'Lord of Asgard'],
      'place-of-birth': 'Asgard',
      'first-appearance': 'Journey into Mystery #83 (August, 1962)',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Asgardian',
      height: ["6'6", '198 cm'],
      weight: ['640 lb', '288 kg'],
      'eye-color': 'Blue',
      'hair-color': 'Blond'
    },
    work: {
      occupation: 'King of Asgard, Warrior',
      base: 'Asgard, New York City'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg'
    }
  },
  {
    id: '717',
    name: 'Wolverine',
    powerstats: {
      intelligence: 63,
      strength: 40,
      speed: 50,
      durability: 100,
      power: 89,
      combat: 100
    },
    biography: {
      'full-name': 'Logan',
      'alter-egos': 'No alter egos found.',
      aliases: ['Weapon X', 'Patch', 'Death'],
      'place-of-birth': 'Cold Lake, Alberta, Canada',
      'first-appearance': 'Incredible Hulk #180 (October, 1974)',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Mutant',
      height: ["5'3", '160 cm'],
      weight: ['300 lb', '135 kg'],
      'eye-color': 'Blue',
      'hair-color': 'Black'
    },
    work: {
      occupation: 'Adventurer, Instructor',
      base: 'Xavier Institute, Salem Center'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg'
    }
  },
  {
    id: '332',
    name: 'Hulk',
    powerstats: {
      intelligence: 88,
      strength: 100,
      speed: 63,
      durability: 100,
      power: 98,
      combat: 85
    },
    biography: {
      'full-name': 'Bruce Banner',
      'alter-egos': 'No alter egos found.',
      aliases: ['The Incredible Hulk', 'Green Goliath'],
      'place-of-birth': 'Dayton, Ohio',
      'first-appearance': 'Incredible Hulk #1 (May, 1962)',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Human / Radiation',
      height: ["8'0", '244 cm'],
      weight: ['1400 lb', '630 kg'],
      'eye-color': 'Green',
      'hair-color': 'Green'
    },
    work: {
      occupation: 'Nuclear Physicist',
      base: 'New Mexico'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg'
    }
  },
  {
    id: '149',
    name: 'Captain America',
    powerstats: {
      intelligence: 69,
      strength: 19,
      speed: 38,
      durability: 55,
      power: 60,
      combat: 100
    },
    biography: {
      'full-name': 'Steve Rogers',
      'alter-egos': 'No alter egos found.',
      aliases: ['Sentinel of Liberty', 'Cap'],
      'place-of-birth': 'Manhattan, New York',
      'first-appearance': 'Captain America Comics #1 (March, 1941)',
      publisher: 'Marvel Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Human',
      height: ["6'2", '188 cm'],
      weight: ['240 lb', '108 kg'],
      'eye-color': 'Blue',
      'hair-color': 'Blond'
    },
    work: {
      occupation: 'Adventurer, Special Agent',
      base: 'Avengers Mansion, New York'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg'
    }
  },
  {
    id: '70',
    name: 'Batman',
    powerstats: {
      intelligence: 100,
      strength: 26,
      speed: 27,
      durability: 50,
      power: 47,
      combat: 100
    },
    biography: {
      'full-name': 'Bruce Wayne',
      'alter-egos': 'No alter egos found.',
      aliases: ['The Dark Knight', 'Caped Crusader'],
      'place-of-birth': 'Crest Hill, Bristol Township; Gotham County',
      'first-appearance': 'Detective Comics #27 (May, 1939)',
      publisher: 'DC Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Human',
      height: ["6'2", '188 cm'],
      weight: ['210 lb', '95 kg'],
      'eye-color': 'Blue',
      'hair-color': 'Black'
    },
    work: {
      occupation: 'CEO of Wayne Enterprises, Vigilante',
      base: 'Batcave, Gotham City'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg'
    }
  },
  {
    id: '644',
    name: 'Superman',
    powerstats: {
      intelligence: 94,
      strength: 100,
      speed: 100,
      durability: 100,
      power: 100,
      combat: 85
    },
    biography: {
      'full-name': 'Clark Kent / Kal-El',
      'alter-egos': 'No alter egos found.',
      aliases: ['Man of Steel', 'Last Son of Krypton'],
      'place-of-birth': 'Kryptonopolis, Krypton',
      'first-appearance': 'Action Comics #1 (June, 1938)',
      publisher: 'DC Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Male',
      race: 'Kryptonian',
      height: ["6'3", '191 cm'],
      weight: ['225 lb', '101 kg'],
      'eye-color': 'Blue',
      'hair-color': 'Black'
    },
    work: {
      occupation: 'Reporter for Daily Planet',
      base: 'Metropolis, Fortress of Solitude'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg'
    }
  },
  {
    id: '720',
    name: 'Wonder Woman',
    powerstats: {
      intelligence: 88,
      strength: 100,
      speed: 79,
      durability: 100,
      power: 100,
      combat: 100
    },
    biography: {
      'full-name': 'Princess Diana of Themyscira',
      'alter-egos': 'No alter egos found.',
      aliases: ['Diana Prince', 'Amazon Princess'],
      'place-of-birth': 'Themyscira',
      'first-appearance': 'All Star Comics #8 (December, 1941)',
      publisher: 'DC Comics',
      alignment: 'good'
    },
    appearance: {
      gender: 'Female',
      race: 'Amazon / Demi-God',
      height: ["6'0", '183 cm'],
      weight: ['165 lb', '74 kg'],
      'eye-color': 'Blue',
      'hair-color': 'Black'
    },
    work: {
      occupation: 'Ambassador of Themyscira, Superhero',
      base: 'Gateway City, Themyscira'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg'
    }
  },
  {
    id: '213',
    name: 'Deadpool',
    powerstats: {
      intelligence: 69,
      strength: 32,
      speed: 50,
      durability: 100,
      power: 100,
      combat: 100
    },
    biography: {
      'full-name': 'Wade Wilson',
      'alter-egos': 'No alter egos found.',
      aliases: ['Merc with a Mouth', 'Regenerating Degenerate'],
      'place-of-birth': 'Canada',
      'first-appearance': 'New Mutants #98 (February, 1991)',
      publisher: 'Marvel Comics',
      alignment: 'neutral'
    },
    appearance: {
      gender: 'Male',
      race: 'Mutant',
      height: ["6'2", '188 cm'],
      weight: ['210 lb', '95 kg'],
      'eye-color': 'Brown',
      'hair-color': 'No Hair'
    },
    work: {
      occupation: 'Mercenary',
      base: 'Mobile'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg'
    }
  },
  {
    id: '655',
    name: 'Thanos',
    powerstats: {
      intelligence: 100,
      strength: 100,
      speed: 33,
      durability: 100,
      power: 100,
      combat: 80
    },
    biography: {
      'full-name': 'Thanos',
      'alter-egos': 'No alter egos found.',
      aliases: ['The Mad Titan', 'Master Overlord'],
      'place-of-birth': 'Titan',
      'first-appearance': 'Iron Man #55 (February, 1973)',
      publisher: 'Marvel Comics',
      alignment: 'bad'
    },
    appearance: {
      gender: 'Male',
      race: 'Eternal / Deviant',
      height: ["6'7", '201 cm'],
      weight: ['985 lb', '443 kg'],
      'eye-color': 'Red',
      'hair-color': 'No Hair'
    },
    work: {
      occupation: 'Conqueror, Nihilist',
      base: 'Sanctuary II'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/655-thanos.jpg'
    }
  },
  {
    id: '370',
    name: 'Joker',
    powerstats: {
      intelligence: 100,
      strength: 10,
      speed: 12,
      durability: 60,
      power: 43,
      combat: 70
    },
    biography: {
      'full-name': 'Jack Napier',
      'alter-egos': 'No alter egos found.',
      aliases: ['Clown Prince of Crime', 'Red Hood'],
      'place-of-birth': '-',
      'first-appearance': 'Batman #1 (Spring, 1940)',
      publisher: 'DC Comics',
      alignment: 'bad'
    },
    appearance: {
      gender: 'Male',
      race: 'Human',
      height: ["6'5", '196 cm'],
      weight: ['192 lb', '86 kg'],
      'eye-color': 'Green',
      'hair-color': 'Green'
    },
    work: {
      occupation: 'Criminal Mastermind',
      base: 'Arkham Asylum, Gotham City'
    },
    image: {
      url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/370-joker.jpg'
    }
  }
];

export const SIMULATED_USERS = [
  {
    id: 'usr_alpha_04',
    name: 'Sofia Valenzuela (Cohorte 4%)',
    role: 'Lead UI/UX Designer',
    email: 'sofia.v@superherodash.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    cohortScore: 4,
    inCanary10: true
  },
  {
    id: 'usr_beta_48',
    name: 'Mateo Cárdenas (Cohorte 48%)',
    role: 'Frontend Architect',
    email: 'mateo.c@superherodash.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    cohortScore: 48,
    inCanary10: false
  },
  {
    id: 'usr_gamma_08',
    name: 'Valentina Rios (Cohorte 8%)',
    role: 'Product Designer',
    email: 'valentina.r@superherodash.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    cohortScore: 8,
    inCanary10: true
  },
  {
    id: 'usr_delta_73',
    name: 'Alejandro Morales (Cohorte 73%)',
    role: 'QA & DevOps Engineer',
    email: 'alejandro.m@superherodash.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    cohortScore: 73,
    inCanary10: false
  }
];
