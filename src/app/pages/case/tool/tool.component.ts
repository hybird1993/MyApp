import { Component, OnInit } from '@angular/core';
import {CommonUtils} from '../../../core/utils/common-utils';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  word: string = '';
  result: string = '';
  constructor() { }

  ngOnInit() {
  }

  getUnicode() {
    console.log(this.word);
    if (this.word) {
      this.result = CommonUtils.getUnicode(this.word);
    }
  }
}
