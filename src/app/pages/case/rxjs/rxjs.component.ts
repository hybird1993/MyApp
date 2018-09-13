import {Component, ElementRef, OnInit} from '@angular/core';
import {fromEvent, interval} from 'rxjs';
import { map } from 'rxjs/operators';
import {skip} from 'rxjs/internal/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor(
    private $eleRef: ElementRef
  ) { }

  ngOnInit() {
    const button = this.$eleRef.nativeElement.querySelector('button');
    fromEvent(button, 'click').subscribe(event => {
      console.log(event)
      interval(1000).pipe(
        skip(1)
      ).subscribe(num => {
          console.log(num);
        });
    });
    // const button = document.querySelector('button');
    // console.log(button);
    // const click$ = fromEvent(button, 'click');
    // const interval$ = interval(1000);
    // console.log(click$);
    // const clicksToInterval$ = click$.pipe(map(event => {
    //   console.log(event);
    //   return interval$;
    // }));
    //
    // clicksToInterval$.subscribe(intervalObservable =>
    //   console.log(intervalObservable)
    // );
  }

}
