import { Menu } from './core/menu'

export class ContextMenu extends Menu {
  constructor(props) {
    super(props)
    this.state = {
      modules: []
    }

    this.el = document.createElement('ul')
    this.el.className = `menu `

    this.el.addEventListener('click', this.#handlerContextMenuUl)
    document.addEventListener('contextmenu', this.#listenerContextMenu)
  }

  open = (x, y) => {
    this.el.innerHTML = ''
    this.el.style.cssText = `top: ${y}px; left: ${x}px;`
    this.el.classList.add('open')
    this.state.modules.forEach(item => this.el.innerHTML += item.toHTML())
  }

  close = () => {
    this.el.classList.remove('open')
  }

  add = (module) => {
    this.state.modules.push(module)
  }

  #handlerContextMenuUl = (e) => {
    this.state.modules.forEach(item => {
      if (item.type === e.target.dataset.type) {
        item.trigger()
        this.close()
      }
    })
  }

  #listenerContextMenu = (e) => {
    e.preventDefault()
    document.body.append(this.el)
    this.open(e.clientX, e.clientY)
  }
}