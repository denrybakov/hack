import { Menu } from './core/menu'

export class ContextMenu extends Menu {
  constructor(props) {
    super(props)
    this.state = {
      // главный стейт с 1 свойством в котором будут лежать экземпляры классов модулей которые будут добавлены через add() в файле app.js
      modules: []
    }
    // при вызове конструктора создается контекстное меню с тегом ul добавляю классы такие какие прописаны в файле styles.css 
    this.el = document.createElement('ul')
    this.el.className = `menu `

    this.el.addEventListener('click', e => {
      // клик событие на черном контекстном меню ul 
      this.state.modules.forEach(item => {
        // прохожусь по массиву modules так как этот массив состоит из экземпляров классов добавленных модулей в файле app.js и сравниваю если экземпляр класса со свойством type равен с e.target у которого дата атрибут 
        if (item.type === e.target.dataset.type) {
          item.trigger() // в item kt;bn экземпляр класса соотвественно могу вызвать метод trigger()
          this.close() // закрытие контекстного меню
        }
      })
    })

    document.addEventListener('contextmenu', (e) => { // событие контекстного меню
      e.preventDefault() // отменяю значение по умолчанию (убирается обычное значение)
      document.body.append(this.el) // вставляю созданное контекстное меню
      this.open(e.clientX, e.clientY) // координаты мыши
    })
  }

  open(x, y) {
    console.log(x, y);
    // здесь передаю значения мышки по оси X и по оси Y и записываю все это в стили контекстного меню. А потом циклом прохожусь по главному стейту из массива и вызываю метод ещHTML так как у модуля есть этот метод который возвращает тег li
    this.el.innerHTML = ''
    this.el.style.cssText = `top: ${y}px; left: ${x}px;`
    this.el.classList.add('open') // делаю видимым контекстное меню
    this.state.modules.forEach(item => this.el.innerHTML += item.toHTML())
  }

  close() {
    // удаляю класс OPEN у контекстного меню в css при его его наличии видно контекстное меню при его отсутствии нет 
    this.el.classList.remove('open')
  }

  add(module) {
    // добавялю в главнй стейт компонента ContextMenu новый экземпляр класса из файла app.js
    this.state.modules.push(module)
  }

}