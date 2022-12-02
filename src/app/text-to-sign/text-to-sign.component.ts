import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

@Component({
  selector: 'app-text-to-sign',
  templateUrl: './text-to-sign.component.html',
  styleUrls: ['./text-to-sign.component.scss']
})
export class TextToSignComponent implements OnInit {

  selectedButton = 'all';
  showSign = false;
  displayArray = [];
  words: string = '';

  allConversations = [{
    display: 'Hi, How are you?',
    video: '../../assets/videos/1.webm',
    fav: false,
    id: 1
  },
{
  display: 'What is your name?',
    video: '../../assets/videos/2.webm',
    fav: false,
    id: 2
},
{
  display: 'Where are you going?',
    video: '../../assets/videos/3.webm',
    fav: true,
    id: 3
},
{
  display: 'How are you?',
    video: '../../assets/videos/4.webm',
    fav: true,
    id: 4
},
{
  display: 'Where are you from?',
    video: '../../assets/videos/5.webm',
    fav: false,
    id: 5
},
{
  display: 'How was your day?',
    video: '../../assets/videos/6.webm',
    fav: false,
    id: 6
}
];
  favConversations = [];
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  async translateText(){
    (document.getElementById('vid')as any).style.display = 'block';
    const allSpaces = this.words.replaceAll(' ', '');
    const allSpacesRemoved = allSpaces.toLowerCase();
    for (var i = 0; i < allSpacesRemoved.length; i++) {
      let temp = await this.showMessageSuccess();
        (document.getElementById('vid')as any).src = `../../assets/Alphebates/${allSpacesRemoved.charAt(i)}.mp4`;
    }
    (document.getElementById('vid')as any).loop = false;
  }

  changeToSpeech() {
    this.router.navigateByUrl('app?show=true');
  }

  isActive(value: string): boolean {
      return value === this.selectedButton;
  }

  changeFav(index: any, status: boolean){
    this.allConversations[index].fav = status;
  }

  playVideo(id: any, video?: any){
    (document.getElementById('vid')as any).style.display = 'block';
    (document.getElementById('vid')as any).src = this.allConversations[id-1].video;
    (document.getElementById('vid')as any)?.play();
    (document.getElementById('vid')as any).loop = true;
  }

  onTabChanged(event: any) {
    (document.getElementById('vid')as any).style.display = 'none';
    this.words = '';
  }


  async showMessageSuccess(){
    console.log("this might take some time....");
    await delay(1500);
    console.log("done!")
    return 2;
  }

   getSpeech = () => {
      document.getElementById('mic-icon')?.classList.add('ping');
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      let recognition = new SpeechRecognition();

      recognition.onstart = () => {
        console.log("starting listening, speak in microphone");
      }
      recognition.onspeechend = () => {
        document.getElementById('mic-icon')?.classList.remove('ping');
        console.log("stopped listening");
        recognition.stop();
      }
      recognition.onresult = (result) => {
        document.getElementById('speechToTextResult')!.innerHTML = result.results[0][0].transcript;
        this.words = result.results[0][0].transcript;
        console.log(result.results[0][0].transcript);
        this.translateText();
      }
      recognition.start();
    }
}
