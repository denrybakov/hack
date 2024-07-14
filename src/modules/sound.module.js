import { Module } from '../core/module'
import { random } from '../utils';


export class SoundModule extends Module {
  constructor(type, text) {
    super(type, text)
  }


  trigger() {
    this.sounds = [
      '../../assets/Sound_04572.mp3',
      '../../assets/Sound_04563.wav',
      '../../assets/Sound_19561.mp3',
      '../../assets/Звук С выкриком полундра.mp3',
      '../../assets/Звук Где пираты аплодируют и радуются.mp3',
    ]
    this.randomIndex = random(0, this.sounds.length - 1)
    console.log(this.randomIndex)
    this.sound = new Audio(this.sounds[this.randomIndex])
    this.sound.play()
  }
}