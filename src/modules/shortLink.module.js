import { Module } from '../core/module'
import { TOKEN_TINY, addElemNode, postDataUrl } from '../utils'

export class ShortLinkModule extends Module {
  constructor(type, text) {
    super(type, text)
  }

  trigger() {
    document.body.innerHTML = ''
    this.#createDOMElements()
    this.$inputLink.addEventListener('change', this.#getShortLink)
  }

  #getShortLink = () => {
    this.$span.textContent = 'Идет сокращение ссылки, ждите...'
    this.dataPost = JSON.stringify({ url: this.$inputLink.value, domain: 'tiny.one' })
    this.$inputLink.value
      ? this.#postShortLink('https://api.tinyurl.com/create?', this.dataPost)
      : this.$span.textContent = 'Пустое поле, попробуйте еще раз'
  }

  #postShortLink = async (url, data) => {
    try {
      this.data = await postDataUrl(url, 'POST', data, TOKEN_TINY)
      this.data.data && this.data.data.tiny_url
        ? this.$span.innerHTML = `Ваша ссылка: 
            <a href="${this.data.data.tiny_url}" target="_blank">
              ${this.data.data.tiny_url}
            </a>`
        : this.$span.textContent = 'Ошибка, попробуйте еще раз'
    } catch (err) { console.log('Error catch, ', err) }
  }

  #createDOMElements = () => {
    this.$container = addElemNode('section', 'shortLink')
    this.$h2 = addElemNode('h2', 'shortLink__title', 'URL shorts')
    this.$inputLink = document.createElement('input')
    this.$span = addElemNode('span', 'shortLink__text')

    this.$inputLink.type = 'text'
    this.$inputLink.placeholder = 'Вставьте ссылку...'

    this.$container.append(this.$h2, this.$inputLink, this.$span)
    document.body.append(this.$container)
  }
}