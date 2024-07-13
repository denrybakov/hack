import { ContextMenu } from './menu.js';
import { BackgroundModule } from './modules/background.module.js';
import { ClicksModule } from './modules/clicks.module.js';
import { MessageModule } from './modules/message.module.js';
import { PaintModule } from './modules/paint.module.js';
import { ShapeModule } from './modules/shape.module.js';
import { SoundModule } from './modules/sound.module.js';
import { TimerModule } from './modules/timer.module.js';
import './styles.css';
const contextMenu = new ContextMenu();

contextMenu.add(new ClicksModule('click', 'Считать клики (за 3 секунды)'));
contextMenu.add(new ShapeModule('shape', 'Создать фигуру'));
contextMenu.add(new BackgroundModule('fon', 'Поменять цвет'));
contextMenu.add(new MessageModule('message', 'Вызвать сообщение'));
contextMenu.add(new SoundModule('sound', 'Случайный звук'));
contextMenu.add(new PaintModule('paint', 'Хочу рисовать!'));
contextMenu.add(new TimerModule('timer', 'Запустить таймер'));
