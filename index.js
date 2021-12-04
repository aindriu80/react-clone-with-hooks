import { render } from './MyReact.js'
import Component from './Component.js'

function renderComponent() {
  render(Component, { propCount: 1 }, document.getElementById('root'))
}
renderComponent()
