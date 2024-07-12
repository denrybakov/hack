import { ContextMenu } from './menu.js';
import { BackgroundModule } from './modules/background.module.js';
import { ClicksModule } from './modules/clicks.module.js';
import { ShapeModule } from './modules/shape.module.js';
import './styles.css'

const contextMenu = new ContextMenu()

contextMenu.add(new ClicksModule('click', 'Считать клики (за 3 секунды)'))
contextMenu.add(new ShapeModule('shape', 'Создать фигуру'))
contextMenu.add(new BackgroundModule('fon', 'Поменять цвет'))