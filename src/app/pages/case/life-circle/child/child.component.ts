import {
  AfterContentInit, Component, OnInit, OnChanges, SimpleChanges, Input, AfterContentChecked, TemplateRef,
  ViewChild, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit {
  @Input() aa;
  @ViewChild('tpl') tpl: TemplateRef<any>;
  constructor() { }

  ngOnInit() {
    console.dir(this.tpl);
    console.log('child: OnInit...');
  }

  ngAfterContentInit() {
    console.log('child: AfterContentInit...');
  }

  ngAfterContentChecked() {
    console.log('child: AfterContentChecked...');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('child: OnChanges...');
  }

  ngAfterViewInit() {
    console.log('child: AfterViewInit...');
    console.dir(this.tpl);
  }
}
