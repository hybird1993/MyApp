import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, HostBinding, HostListener, OnInit} from '@angular/core';

// export enum ChangeDetectionStrategy {
//   OnPush, // 表示变化检测对象的状态为`CheckOnce`
//   Default, // 表示变化检测对象的状态为`CheckAlways`
// }

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss'],
  // 设置该组件的变化检测策略为onPush
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipeComponent implements OnInit, DoCheck, AfterViewInit {
  greeting: Promise<string>|null = null;
  arrived: boolean = false;

  aa: '';

  _show = true;
  showObj = {
    show: this.show()
  }

  private resolve: Function|null = null;
  @HostBinding('class.bg-r') bgIsRed = false;

  @HostListener('mousedown') hasPressed() {
    this.bgIsRed = true;
  }
  @HostListener('mouseup') hasReleased() {
    this.bgIsRed = false;
  }

  constructor(
    public cd: ChangeDetectorRef
  ) {
  //  this.cd.detach();
    this.reset();
  }

  ngOnInit() {
  }

  ngDoCheck() {
    console.log(this._show, '_show');
    console.log(this.aa)
  }
  reset() {
    this.arrived = false;
    this.greeting = new Promise<string>((resolve, reject) => { this.resolve = resolve; });
  }

  clicked() {
    if (this.arrived) {
      this.reset();
    } else {
      this.resolve('hi there!');
      this.arrived = true;
    }
  }

  show() {
    console.log(11);
    return true;
  }

  ngAfterViewInit() {
  //  this.cd.detach();
  }
}
