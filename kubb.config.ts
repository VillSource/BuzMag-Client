import { defineConfig } from 'kubb'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig({
  input: './v1.json',
  output: {
    path: './src/api',
    clean: true,
  },
  plugins: [
    pluginTs({ output: { path: './types' } }),
    pluginZod({ output: { path: './zod' } }),
    pluginFetch({ output: { path: './clients' } }),
    pluginReactQuery({ output: { path: './hooks' } }),
  ],
})
