import { Module } from '../core/module';

export class SoundModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.playerBlock = null;
    this.player = null;
  }

  #stopCurrentTrack() {
    if (this.player) {
      this.player.pause();
      this.player.src = '';
      this.player.load();
    }
    if (this.playerBlock) {
      this.playerBlock.remove();
      this.playerBlock = null;
    }
  }

  #createPlayer(src) {
    this.#stopCurrentTrack(); // Остановить текущий трек перед созданием нового

    this.playerBlock = document.createElement('div');
    this.playerBlock.className = 'total';
    this.player = document.createElement('video');
    this.player.name = 'media';
    this.player.setAttribute('controls', '');
    this.player.setAttribute('autoplay', '');
    const source = document.createElement('source');
    source.src = src;
    source.type = 'audio/mpeg';
    this.player.append(source);
    this.playerBlock.append(this.player);
    document.body.append(this.playerBlock);
  }

  trigger() {
    const sounds = [
      './assets/sound1.mp3',
      './assets/sound2.mp3',
      './assets/sound3.mp3',
      './assets/sound4.mp3',
      './assets/sound5.mp3',
      './assets/sound6.mp3',
      './assets/sound7.mp3'
    ];

    const randomIndex = Math.floor(Math.random() * sounds.length);
    const randomSound = sounds[randomIndex];

    this.#createPlayer(randomSound);
  }
}