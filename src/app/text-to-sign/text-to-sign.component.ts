import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-to-sign',
  templateUrl: './text-to-sign.component.html',
  styleUrls: ['./text-to-sign.component.scss']
})
export class TextToSignComponent implements OnInit {

  selectedButton = 'all';
  showSign = false;
  displayArray = [];
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

  getSpeech() {
    document.getElementById('mic-icon')?.classList.add('ping');
    //conversion here
  }

  translateText(){
    //Translate here
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

  playVideo(id: any){
    (document.getElementById('vid')as any).style.display = 'block';
    (document.getElementById('vid')as any).src = this.allConversations[id-1].video;
    (document.getElementById('vid')as any)?.play();
  }
}
