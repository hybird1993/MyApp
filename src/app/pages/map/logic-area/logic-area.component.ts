import {Component, Input, OnInit} from '@angular/core';
import {NzFormatEmitEvent} from 'ng-zorro-antd';

@Component({
  selector: 'app-logic-area',
  templateUrl: './logic-area.component.html',
  styleUrls: ['./logic-area.component.scss']
})
export class LogicAreaComponent implements OnInit {
  @Input() id: boolean;
  constructor() { }

  defaultCheckedKeys = [ '0-0-0' ];
  defaultSelectedKeys = [];
  defaultExpandedKeys = [ '0-0', '0-0-0', '0-0-1' ];

  nodes = [ {
    title   : '0-0',
    key     : '0-0',
    expanded: true,
    children: [ {
      title   : '0-0-0',
      key     : '0-0-0',
      children: [
        { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
        { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
        { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
      ]
    }, {
      title   : '0-0-1',
      key     : '0-0-1',
      children: [
        { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
        { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
        { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
      ]
    }, {
      title : '0-0-2',
      key   : '0-0-2',
      isLeaf: true
    } ]
  }, {
    title   : '0-1',
    key     : '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
      { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
      { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
    ]
  }, {
    title : '0-2',
    key   : '0-2',
    isLeaf: true
  } ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
