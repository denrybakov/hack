import { Module } from '../core/module'
import { addElemNode } from '../utils'

export class PaintModule extends Module {
  constructor(type, text) {
    super(type, text)
    this.isDrawing = false
    this.colors = ['black', 'blue', 'red', 'green', 'yellow']
    this.tools = ['none', 'clear', 'fill']
  }

  trigger() {
    if (this.$container) {
      this.$container.remove()
    }
    this.#createDOMElements()
    this.#resizeCanvas()
    this.$container.addEventListener('contextmenu', e => e.preventDefault())
    this.$canvas.addEventListener('mousedown', this.#startDrawing)
    this.$canvas.addEventListener('mousemove', this.#draw)
    this.$canvas.addEventListener('mouseup', this.#stopDrawing)
    this.$canvas.addEventListener('mouseout', this.#stopDrawing)
    this.$btnClose.addEventListener('click', () => this.$container.remove())
    this.$btnDownload.addEventListener('click', () => {
      this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height)
    })

    this.$ulTools.addEventListener('click', this.#listenerTools)
  }

  #resizeCanvas() {
    this.$canvas.width = this.$container.clientWidth - 200;
    this.$canvas.height = this.$container.clientHeight - 50;
  }

  #startDrawing = (e) => {
    this.isDrawing = true
    // this.ctx.strokeStyle = "red";
    this.ctx.beginPath()
    this.ctx.moveTo(e.offsetX, e.offsetY)
  }

  #draw = (e) => {
    if (!this.isDrawing) return
    this.ctx.lineTo(e.offsetX, e.offsetY)
    this.ctx.stroke()
  }

  #stopDrawing = (e) => {
    this.ctx.lineTo(e.offsetX, e.offsetY)
    this.ctx.closePath();
    this.isDrawing = false;
  }

  #listenerTools = (e) => {

    this.$ulTools.childNodes.forEach(li => li.classList.remove('active'))
    this.ctx.strokeStyle = e.target.className;
    if (e.target.classList.contains('clear')) {
      this.ctx.strokeStyle = 'white';
    }
    e.target.classList.add('active')

    console.log(e.target.className);
  }

  #createDOMElements = () => {
    this.$container = addElemNode('div', 'paint', '')
    this.$canvas = addElemNode('canvas', 'paint__canvas', '')
    this.ctx = this.$canvas.getContext('2d')

    this.$btnDownload = addElemNode('button', 'paint__download', 'Скачать')
    this.$btnClose = addElemNode('button', 'paint__close', 'Закрыть')
    this.$ulTools = addElemNode('ul', 'tools', '')
    this.colors.forEach(color => this.$ulTools.append(addElemNode('li', `${color}`, '')))
    this.tools.forEach(tool => this.$ulTools.append(addElemNode('li', `${tool}`, '')))
    this.$ulTools.childNodes[0].classList.add('active')

    this.$container.append(this.$btnClose, this.$ulTools, this.$canvas, this.$btnDownload)
    document.body.append(this.$container)
  }
}