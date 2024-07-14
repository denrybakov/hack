import { Module } from '../core/module'



export class SoundModule extends Module {
  

  constructor(type, text) {
    super(type, text)
  }


  #createPlayer(src) {
    this.playerBlock = document.createElement('div');
    this.playerBlock.className = 'total';
    this.player = document.createElement('video');
    this.player.name = 'media';
    this.player.setAttribute('controls', '');
    this.player.setAttribute('autoplay', '');
    this.source = document.createElement('source');
    this.source.src = src;
    this.source.type = 'audio/mpeg';
    this.player.append(this.source);
    this.playerBlock.append(this.player);
    document.body.append(this.playerBlock);

  }

  trigger() {

    if (this.playerBlock) {
      this.playerBlock.remove();
    }
        
        this.sounds = [
          './assets/sound1.mp3',
          './assets/sound2.mp3',
          './assets/sound3.mp3',
          './assets/sound4.mp3',
          './assets/sound5.mp3',
          './assets/sound6.mp3',
          './assets/sound7.mp3'
      ];
    

      this.randomIndex = Math.floor(Math.random() * this.sounds.length);
      this.randomSound = this.sounds[this.randomIndex];
  
      this.audio = new Audio(this.randomSound);

      
      this.#createPlayer(this.audio.src);

      


  }

  
}