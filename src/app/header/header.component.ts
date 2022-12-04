import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('scroll', (e) => {
        (document.getElementById('header-id')as any).style.backgroundColor = 'rgba(48, 45, 37, 1)';
    });
  }

}
