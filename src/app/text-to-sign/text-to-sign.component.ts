import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-to-sign',
  templateUrl: './text-to-sign.component.html',
  styleUrls: ['./text-to-sign.component.scss']
})
export class TextToSignComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getSpeech() {
    document.getElementById('mic-icon')?.classList.add('ping');
    //conversion here
  }

  translateText(){
    //Translate here
  }
}
