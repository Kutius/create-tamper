import { resolve } from 'node:path'
import { defineBuildConfig } from 'unbuild'

// @ts-expect-error types
import userScriptHeader from 'rollup-plugin-tampermonkey-header'

const userDefinedOptions = {
  metaPath: resolve(__dirname, 'src', 'meta.json'),
}

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  hooks: {
    'rollup:options': (ctx, options) => {
      if (Array.isArray(options.plugins)) {
        const outputFile = 'index.js'
        options.plugins.push(userScriptHeader({
          metaPath: userDefinedOptions.metaPath,
          outputFile,
        }))
      }
    },
    'build:done': (ctx) => {
      const path = ctx.buildEntries.find(e => e.path.includes('cjs'))?.path
      if (path) {
        // eslint-disable-next-line no-console
        console.log(
          '\n✅Dev plugin is created. Please paste the path to browser and install in Tampermonkey: \n\x1B[1m\x1B[4m\x1B[36m%s\x1B[0m\n',
          resolve(__dirname, 'dist', path),
        )
      }
    },
  },
})
