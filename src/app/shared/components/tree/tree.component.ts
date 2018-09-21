import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TreeData} from './tree.model';
import {fadeIn} from '../../../animations/fadeIn';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  animations: [
    fadeIn
   ]
})
export class TreeComponent implements OnInit {
  @Input() datas: TreeData[];
  @Output() checkBoxChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  checkboxChange(event, id) {
    console.log(event, id);
    this.checkBoxChange.emit({id, value: event});
  }
}

