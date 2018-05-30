import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.services';

@Component({
  selector: 'app-section4',
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.scss']
})
export class Section4Component implements OnInit {

  constructor(private _AppService : AppService) {}

  ngOnInit() {
  }

}
