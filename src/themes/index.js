// Lightweave Theme Registry
// 3 Kestris originals + 28 community themes

import kestrisDark from './kestris-dark.js';
import kestrisLight from './kestris-light.js';
import kestrisMidnight from './kestris-midnight.js';
import defaultTheme from './default.js';
import fictioneerTheme from './fictioneer.js';
import fictioneerDarkTheme from './fictioneer-dark.js';
import darkTheme from './dark.js';
import googleTheme from './google.js';
import spotifyTheme from './spotify.js';
import airbnbTheme from './airbnb.js';
import synthwaveTheme from './synthwave.js';
import synthwaveLightTheme from './synthwave-light.js';
import matrixTheme from './matrix.js';
import enterpriseTheme from './enterprise.js';
import falconTheme from './falcon.js';
import tronTheme from './tron.js';
import win95Theme from './win95.js';
import winxpTheme from './winxp.js';
import macClassicTheme from './mac-classic.js';
import dosTheme from './dos.js';
import wordperfectTheme from './wordperfect.js';
import geocitiesTheme from './geocities.js';
import bernersLeeTheme from './berners-lee.js';
import macosSequoiaTheme from './macos-sequoia.js';
import win31Theme from './win31.js';
import gameboyTheme from './gameboy.js';
import winterHearthTheme from './winter-hearth.js';
import democraticSteelTheme from './democratic-steel.js';
import mushroomKingdomTheme from './mushroom-kingdom.js';
import vintageColaTheme from './vintage-cola.js';
import cyberNoirTheme from './cyber-noir.js';

// Theme ID → theme object
export const themes = {
  default: defaultTheme,
  'kestris-dark': kestrisDark,
  'kestris-light': kestrisLight,
  'kestris-midnight': kestrisMidnight,
  fictioneer: fictioneerTheme,
  'fictioneer-dark': fictioneerDarkTheme,
  dark: darkTheme,
  google: googleTheme,
  spotify: spotifyTheme,
  airbnb: airbnbTheme,
  synthwave: synthwaveTheme,
  'synthwave-light': synthwaveLightTheme,
  matrix: matrixTheme,
  enterprise: enterpriseTheme,
  falcon: falconTheme,
  tron: tronTheme,
  win95: win95Theme,
  winxp: winxpTheme,
  'mac-classic': macClassicTheme,
  dos: dosTheme,
  wordperfect: wordperfectTheme,
  geocities: geocitiesTheme,
  'berners-lee': bernersLeeTheme,
  'macos-sequoia': macosSequoiaTheme,
  win31: win31Theme,
  gameboy: gameboyTheme,
  'winter-hearth': winterHearthTheme,
  'democratic-steel': democraticSteelTheme,
  'mushroom-kingdom': mushroomKingdomTheme,
  'vintage-cola': vintageColaTheme,
  'cyber-noir': cyberNoirTheme,
};

// Ordered list for UI display
export const themeList = [
  // Originals
  defaultTheme,
  kestrisDark,
  kestrisLight,
  kestrisMidnight,
  // Modern
  fictioneerTheme,
  fictioneerDarkTheme,
  darkTheme,
  googleTheme,
  spotifyTheme,
  airbnbTheme,
  enterpriseTheme,
  macosSequoiaTheme,
  // Retro
  win95Theme,
  winxpTheme,
  win31Theme,
  macClassicTheme,
  dosTheme,
  wordperfectTheme,
  geocitiesTheme,
  bernersLeeTheme,
  gameboyTheme,
  mushroomKingdomTheme,
  // Vibes
  synthwaveTheme,
  synthwaveLightTheme,
  matrixTheme,
  tronTheme,
  falconTheme,
  winterHearthTheme,
  democraticSteelTheme,
  vintageColaTheme,
  cyberNoirTheme,
];

// Group boundaries for the browser
export const themeGroups = [
  { label: 'Originals', start: 0, count: 4 },
  { label: 'Modern', start: 4, count: 8 },
  { label: 'Retro', start: 12, count: 10 },
  { label: 'Vibes', start: 22, count: 9 },
];

export default themes;
