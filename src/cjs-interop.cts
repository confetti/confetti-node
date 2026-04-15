/*
 * Real CommonJS wrapper around the ESM entry point.
 *
 * Node 22.12+ supports synchronous `require()` of ESM modules, so this file
 * is authored as plain CJS (`.cts` -> `.cjs`) rather than as an ESM file with
 * a `"module.exports"` named export. Authoring it as real CJS means every
 * CJS loader hook (tsx, ts-node, swc-node, vitest under CJS, proxyquire,
 * etc.) handles `require('confetti')` correctly — no reliance on Node's
 * built-in unwrap of a named export literally called `module.exports`.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const mod = require('./index.js')

module.exports = mod.default
Object.assign(module.exports, mod)
