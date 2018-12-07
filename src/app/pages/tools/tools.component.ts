import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  word: string = '';
  result: string = '';
  divEle;
  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.divEle = this.elementRef.nativeElement.querySelector('#selectCopy');
  }

  /**
   *获取字符串unicode编码
   */
  getUnicode(event) {
    if (event) {
      let str = '';
      for (let s of event) {
        str += '\\u' + s.codePointAt(0).toString(16).padStart(4, '0');
      }
      this.result = str;
    } else {
      this.result = '';
    }
  }

  copy() {
    this.divEle.value = this.result;  // 给input赋值
    this.divEle.select(); // 选中赋值过的input
    const tag = document.execCommand('Copy');  // 执行复制
    if (tag) {
      alert('复制成功。');
    }
  }

}
