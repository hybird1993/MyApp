import {Component, HostBinding, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-life-circle',
  templateUrl: './life-circle.component.html',
  styleUrls: ['./life-circle.component.scss'],
})
export class LifeCircleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('OnInit...');
  }
}
