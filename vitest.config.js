import { defineConfig } from 'vitest/config'

export default defineConfig({
  coverage: {
    thresholds: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
})
