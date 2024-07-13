import { Module } from '../core/module'
import { random } from '../utils'


export class SoundModule extends Module {
  constructor(type, text) {
    super(type, text)
  }


  trigger() {


      // var audio1 = new Audio()
      // audio1.src = '../sound/Sound_04572.mp3'
      // audio1.autoplay = true
      


        // var audio = new Audio(); // Создаём новый элемент Audio
        // audio.src = '../sound/Sound_04572.mp3'; // Указываем путь к звуку "клика"
        // audio.autoplay = true; // Автоматически запускаем
      
      // const audio = new Audio('../../../../sound/Sound_04572.mp3')
      // audio.play() 

        // const player = document.createElement('audio')
        // player.src = '../sound/Sound_04572.mp3'
        // player.preload = "auto";
        // player.autoplay = true
        // player.play()

        const sounds = [
          './assets/sound1.mp3',
          './assets/sound2.mp3',
          './assets/sound3.mp3'
      ];
  
      const randomIndex = Math.floor(Math.random() * sounds.length);
      const randomSound = sounds[randomIndex];
  
      const audio = new Audio(randomSound);
      audio.play();
   

      //   // player.play()
      // soundClick()
    // this.soundArray = []
    // this.myAudio1 = new Audio('../sound/Sound_04563.wav')
    // this.myAudio1.autoplay = true
    // // this.myAudio2 = new Audio('../sound/Sound_04563.wav')
    // // this.myAudio2.autoplay = true
    //   console.log(this.myAudio1)
    //   this.myAudio1.play()
  
      

    // this.soundArray. push(this.myAudio1, this.myAudio2) 
    // console.log(this.soundArray)
    // // console.log(this.soundArray[0].play())
    
    // this.soundArray[random(0, this.soundArray.length)].play()


  }
}