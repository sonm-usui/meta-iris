import { Component, OnInit } from '@angular/core';
import * as fp from '../assets/fingerpose'
import { ActivatedRoute } from '@angular/router';
declare let handpose: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showST = true;
  showTS = !this.showST;
  constructor(private route: ActivatedRoute) {
  }
  ngOnInit() {
     this.route.queryParams
      .subscribe(params => {
        this.showST = params['show'] === 'true';
        this.showTS = !this.showST;
      }
    );
  }

}
