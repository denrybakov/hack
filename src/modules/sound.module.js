import { Module } from '../core/module'



export class SoundModule extends Module {
  constructor(type, text) {
    super(type, text)
  }


  trigger() {
    const sounds = [
      '../assets/Sound_04572.mp3',
      '../assets/Sound_04563.wav',
  ];

  const randomIndex = Math.floor(Math.random() * sounds.length);
  const randomSound = sounds[randomIndex];

  const audio = new Audio(randomSound);
    audio.play();
  }
}