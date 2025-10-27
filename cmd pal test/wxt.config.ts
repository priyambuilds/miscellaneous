import { defineConfig } from 'wxt'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  srcDir: 'src',

  modules: ['@wxt-dev/module-react'],

  alias: {
    '@': resolve('src'),
  },

  manifest: ({ browser, manifestVersion }) => {
    return {
      name: 'Cmd pal',
      description: 'Command Pallete for the web',
      version: '1.0.0',

      permissions: ['tabs', 'storage', 'bookmarks', 'history', 'activeTab'],
      host_permissions: ['<all_urls>'],

      action: {
        default_title: 'Cmd Pal',
        default_popup: 'popup.html',
      },

      options_ui: {
        page: 'options.html',
        open_in_tab: true,
      },

      icons: {
        16: 'icon/16.png',
        48: 'icon/48.png',
        128: 'icon/128.png',
      },

      ...(manifestVersion === 3 && {
        content_security_policy: {
          extension_pages:
            "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
        },
      }),

      commands: {
        'toggle-palette': {
          suggested_key: {
            default: 'Ctrl+K',
            mac: 'Command+K',
          },
          description: 'Toggle command palette',
        },
      },

      ...(browser === 'firefox' && {
        browser_specific_settings: {
          gecko: {
            id: 'zen-youtube@example.com',
            strict_min_version: '109.0',
          },
        },
      }),
    }
  },

  vite: () => ({
    css: { postcss: './postcss.config.js' },
    build: { target: 'esnext', minify: 'esbuild' },
    plugins: [
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
    ],
  }),
})
