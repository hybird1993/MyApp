import {Component, HostBinding, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss']
})
export class PipeComponent implements OnInit {
  greeting: Promise<string>|null = null;
  arrived: boolean = false;

  private resolve: Function|null = null;
  @HostBinding('class.bg-r') bgIsRed = false;

  @HostListener('mousedown') hasPressed() {
    this.bgIsRed = true;
  }
  @HostListener('mouseup') hasReleased() {
    this.bgIsRed = false;
  }

  constructor() {
    this.reset();
  }

  ngOnInit() {
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
}
