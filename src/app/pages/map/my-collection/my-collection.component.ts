import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit {
  @Input() id: boolean;
  constructor() { }

  ngOnInit() {
  }

}
