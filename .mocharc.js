process.env.NODE_ENV = 'test'

export default {
  exit: true,
  recursive: true,
  diff: true,
  extension: ['ts'],
  reporter: 'spec',
  require: ['tsx/esm'],
  ui: 'bdd',
  'watch-files': ['test/**/*.ts', 'src/**/*.ts'],
}
