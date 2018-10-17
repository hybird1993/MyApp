import {AfterContentInit, Component, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit() {
    console.log('child: OnInit');
  }

  ngAfterContentInit() {
    console.log('child: AfterContentInit');
  }

  ngOnChange(changes: SimpleChanges) {

  }
}
