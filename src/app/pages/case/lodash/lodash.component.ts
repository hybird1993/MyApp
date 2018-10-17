import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-lodash',
  templateUrl: './lodash.component.html',
  styleUrls: ['./lodash.component.scss']
})
export class LodashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const _obj = {
      a: 1,
      b: {
       c: 2
      }
    }
    let obj = _.cloneDeep(_obj);
    _obj.b.c = 3;
    console.log(_obj);
    console.log(obj);
  }

}
