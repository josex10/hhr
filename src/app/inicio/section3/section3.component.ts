import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CurrencyPipe } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';

import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppService } from '../../services/app.services';
import { GLOBAL } from '../../services/global.services';

@Component({
  selector: 'app-section3',
  templateUrl: './section3.component.html',
  styleUrls: ['./section3.component.scss']
})
export class Section3Component implements OnInit {

  private lenguaje: string;
  
  constructor(private _AppService : AppService) {}

  ngOnInit() {
  }

}
