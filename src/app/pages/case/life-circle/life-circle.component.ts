import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-life-circle',
  templateUrl: './life-circle.component.html',
  styleUrls: ['./life-circle.component.scss'],
})
export class LifeCircleComponent implements OnInit, AfterViewInit, AfterViewChecked {
  a = 1;
  bb = 2;
  constructor() { }

  ngOnInit() {
    console.log('OnInit...');
    setTimeout(() => {
      this.a++;
      this.bb++;
      }, 10000);
  }

  ngAfterViewInit() {
    console.log('AfterViewInit...');
  }

  ngAfterViewChecked() {
    console.log('AfterViewChecked...');
  }
}
