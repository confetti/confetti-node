// Låt import och require träffa samma ESM-kod:
export * from './index.js';
// Gör att require('confetti') returnerar default direkt (ingen .default):
export { default as 'module.exports' } from './index.js';
