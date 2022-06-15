import strawhats from './assets/images/pirates/strawhats-pirates.webp';
import heart from './assets/images/pirates/heart-pirates.webp';
import kid from './assets/images/pirates/kid-pirates.webp';
import buggy from './assets/images/pirates/buggy-pirates.webp';
import jimbei from './assets/images/pirates/jimbei.png';

import evilFruit from './assets/images/cells_assets/evil-fruit.png';
import pirate from './assets/images/cells_assets/pirate-cell.png';
import island from './assets/images/cells_assets/island.jpeg';
import chest from './assets/images/cells_assets/chest-cell.png';
import card from './assets/images/cells_assets/card.png';
import kaido from './assets/images/cells_assets/kaido-pirates.webp';
import blackbeard from './assets/images/cells_assets/blackbeard-pirates.png';
import redhair from './assets/images/cells_assets/redhair-pirates.png';
import bigmom from './assets/images/cells_assets/bigmom-pirates.png';
import end from './assets/images/cells_assets/laugh-tale.png';

export default {
  CONSUMABLES: [
    {
      name: 'Tone Dial Chico',
      price: 10,
    },
    {
      name: 'Tone Dial',
      price: 20,
    },
    {
      name: 'Tone Dial Grande',
      price: 30,
    },
    {
      name: 'Cañon Chico',
      price: 10,
    },
    {
      name: 'Cañon',
      price: 20,
    },
    {
      name: 'Cañon Grande',
      price: 30,
    },
  ],
  FRUITS: [
    {
      name: 'gomu',
      price: 30,
      strength: 3,
    },
    {
      name: 'ope',
      price: 20,
      strength: 4,
    },
    {
      name: 'mera',
      price: 50,
      strength: 4,
    },
    {
      name: 'yami',
      price: 60,
      strength: 4,
    },
    {
      name: 'sara',
      price: 10,
      strength: 2,
    },
    {
      name: 'bara',
      price: 10,
      strength: 1,
    },
    {
      name: 'ito',
      price: 20,
      strength: 1,
    },
    {
      name: 'hito',
      price: 15,
      strength: 1,
    },
    {
      name: 'hana',
      price: 30,
      strength: 2,
    },
    {
      name: 'awa',
      price: 10,
      strength: 1,
    },
    {
      name: 'kage',
      price: 30,
      strength: 1,
    },
    {
      name: 'yomi',
      price: 30,
      strength: 1,
    },
  ],
  CELLS: [
    'START',
    'CARD',
    'PIRATE',
    'ISLAND',
    'FRUIT',
    'CHEST',
    'PIRATE',
    'CHEST',
    'FRUIT',
    'ISLAND',
    'PIRATE',
    'CHEST',
    'PIRATE',
    'CARD',
    'CHEST',
    'FRUIT',
    'ISLAND',
    'CARD',
    'PIRATE',
    'PIRATE',
    'CARD',
    'CHEST',
    'PIRATE',
    'FRUIT',
    'ISLAND',
    'CHEST',
    'CARD',
    'PIRATE',
    'FRUIT',
    'CARD',
    'CARD',
    'PIRATE',
    'FRUIT',
    'PIRATE',
    'CARD',
    'PIRATE',
    'PIRATE',
    'KAIDO',
    'BIGMOM',
    'SHANKS',
    'BLACKBEARD',
    'END',
  ],
  PIRATEIMAGES: {
    'Monkey D. Luffy': strawhats,
    'Trafalgar D. Law': heart,
    'Eustass Kidd': kid,
    'Buggy el payaso': buggy,
    Jimbei: jimbei,
  },
  CELLASSETS: {
    FRUIT: evilFruit,
    PIRATE: pirate,
    ISLAND: island,
    CHEST: chest,
    CARD: card,
    KAIDO: kaido,
    BLACKBEARD: blackbeard,
    SHANKS: redhair,
    BIGMOM: bigmom,
    END: end,
  },
};
