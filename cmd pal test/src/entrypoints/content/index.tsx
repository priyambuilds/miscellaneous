import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    // Add "await" here! ⬇️
    const ui = await createShadowRootUi(ctx, {
      name: 'command-palette',
      position: 'inline',
      anchor: 'body',
      append: 'last',
      onMount: container => {
        const app = document.createElement('div')
        container.append(app)
        const root = ReactDOM.createRoot(app)
        root.render(<App />)
        return root
      },
      onRemove: root => {
        root?.unmount()
      },
    })

    ui.mount()
  },
})
