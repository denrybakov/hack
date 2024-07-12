import { Module } from '../core/module'
import { addElemNode } from '../utils'

export class PaintModule extends Module {
  constructor(type, text) {
    super(type, text)
    this.isDrawing = false
  }

  trigger() {
    if (this.$container) {
      this.$container.remove()
    }
    this.#createDOMElements()
    this.#resizeCanvas()
    this.$canvas.addEventListener('mousedown', this.#startDrawing)
    this.$canvas.addEventListener('mousemove', this.#draw)
    this.$canvas.addEventListener('mouseup', this.#stopDrawing)
    this.$canvas.addEventListener('mouseout', this.#stopDrawing)
    this.$btnClose.addEventListener('click', () => this.$container.remove())
  }

  #resizeCanvas() {
    this.$canvas.width = this.$container.clientWidth;
    this.$canvas.height = this.$container.clientHeight;
  }

  #startDrawing = (e) => {
    this.isDrawing = true
    this.ctx.strokeStyle = "red";
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

  #createDOMElements = () => {
    this.$container = addElemNode('div', 'paint', '')
    this.$canvas = addElemNode('canvas', 'paint__canvas', '')
    this.ctx = this.$canvas.getContext('2d')
    this.$btnDownload = addElemNode('button', 'paint__download', 'Скачать')
    this.$btnClose = addElemNode('button', 'paint__close', 'Закрыть')
    this.$container.append(this.$btnClose, this.$canvas, this.$btnDownload)
    document.body.append(this.$container)
  }
}