import { Module } from '../core/module'
import { addElemNode, addFileInput } from '../utils'

export class PaintModule extends Module {
  constructor(type, text) {
    super(type, text)
    this.isDrawing = false
    this.colors = ['black', 'blue', 'red', 'green', 'yellow']
    this.tools = ['none', 'clear', 'fill']
  }

  trigger() {
    document.body.innerHTML = ''
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
    this.$btnDownload.addEventListener('click', this.#downloadCanvas)
    this.$ulTools.addEventListener('click', this.#listenerTools)
    document.querySelector('input').addEventListener('change', this.#loadImgToCanvas.bind(this))
  }

  #resizeCanvas() {
    this.$canvas.width = 650
    this.$canvas.height = 400
  }

  #startDrawing = (e) => {
    this.isDrawing = true
    this.ctx.lineWidth = 2
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
      this.ctx.lineWidth = 4
      this.ctx.strokeStyle = 'white';
    }

    if (e.target.classList.contains('fill')) {
      if (confirm('Вы уверены что хотите очистить свое произведение искусства?')) {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height)
        this.$ulTools.childNodes[0].classList.add('active')
        this.ctx.strokeStyle = 'black'
      } else {
        this.$ulTools.childNodes[0].classList.add('active')
        this.ctx.strokeStyle = 'black'
      }
    }

    if (e.target.classList.contains('none')) {
      this.$ulTools.childNodes[0].classList.add('active')
      this.ctx.strokeStyle = 'black'
    }

    if (e.target.classList.contains('tools')) {
      this.$ulTools.childNodes[0].classList.add('active')
      this.ctx.strokeStyle = 'black'
    }
    e.target.classList.add('active')
  }

  #downloadCanvas = () => {
    this.$linkDownload = document.createElement('a')
    this.$linkDownload.download = `${Date.now()}-MyPicture.png`
    this.$linkDownload.href = this.$canvas.toDataURL('image/png')
    this.$linkDownload.click()
  }

  #loadImgToCanvas = (e) => {
    this.file = e.target.files[0]
    this.file ? this.#onReaderFile(this.ctx, this.$canvas, this.file) : null
  }

  #onReaderFile = (ctx, canvas, file) => {
    const reader = new FileReader()
    reader.onload = function (event) {
      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scaleWidth = canvas.width / img.width;
        const scaleHeight = canvas.height / img.height;
        const scale = Math.min(scaleWidth, scaleHeight);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  #createDOMElements = () => {
    this.$container = addElemNode('div', 'paint')
    this.$label = addElemNode('div', 'paint__label', ' Твори Созидай Улучшай Изменяй ')
    this.$canvas = addElemNode('canvas', 'paint__canvas')
    this.ctx = this.$canvas.getContext('2d')
    this.$btnDownload = addElemNode('button', 'paint__download', 'Скачать искусство')
    this.$btnClose = addElemNode('span', 'paint__close')
    this.$blockBtnFileInput = addFileInput('paint__file', 'paint__file', 'Загрузить картинку')
    this.$ulTools = addElemNode('ul', 'tools')

    this.colors.forEach(color => this.$ulTools.append(addElemNode('li', `${color}`)))
    this.tools.forEach(tool => this.$ulTools.append(addElemNode('li', `${tool}`)))
    this.$ulTools.childNodes[0].classList.add('active')
    this.ctx.fillStyle = 'white'

    this.$container.innerHTML += this.$blockBtnFileInput
    this.$container.append(this.$btnClose, this.$ulTools, this.$label, this.$canvas, this.$btnDownload)

    document.body.append(this.$container)
  }
}