import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      [
        './src/http/controllers/**',
        './prisma/vitest-environments-prisma/prisma-test-environments.ts',
      ],
    ],
  },
})
