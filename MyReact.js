let globalId = 0
let globalParent
const componentState = new Map()

export function useState(initialState) {
  const id = globalId
  const parent = globalParent
  globalId++
  return (() => {
    console.log('component', componentState.get(parent))
    const { cache, props, component } = componentState.get(parent)
    if (cache[id] == null) {
      cache[id] = {
        value:
          typeof initialState === 'function' ? initialState() : initialState,
      }
    }
    const setState = (state) => {
      if (typeof state === 'function') {
        cache[id].value = state(cache[id].value)
      } else {
        cache[id].value = state
      }
      render(component, props, parent)
    }
    return [cache[id].value, setState]
  })()
}

export function render(component, props, parent) {
  const state = componentState.get(parent) || { cache: [] }
  componentState.set(parent, { ...state, component, props })
  globalParent = parent
  const output = component(props)
  globalId = 0
  parent.textContent = output
}
