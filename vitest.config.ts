import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      server: {
        deps: {
          inline: ['element-plus']
        }
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*', '**.config.ts'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      globals: true,
      coverage: {
        exclude: ['**.config**', '**.d.**', '**.cjs', '**/assets', '**/types', '**/vite-env.d.ts', '**/App.vue', '**/main.ts', '**/constants'],
        provider: 'v8',
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80
        }
      },
    }
  })
)
