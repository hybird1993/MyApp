import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.scss']
})
export class TypescriptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.test3();
  }
  // 扩展接口
  test1() {
    interface Shape {
      color: string;
    }

    interface PenStroke {
      penWidth: number;
    }

    interface Square extends Shape, PenStroke {
      sideLength: number;
    }

    let square = <Square>{};
    square.color = 'blue';
    square.sideLength = 10;
    square.penWidth = 100;
    console.log(square, 'test1');
  }
  test2() {
    interface Counter {
      (start: number): string;
      interval: number;
      reset(): void;
    }

    function getCounter(): Counter {
      let counter = <Counter>function (start: number) { };
      counter.interval = 123;
      counter.reset = function () { };
      return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
    console.log(c, 'test2');
  }

  test3() {
    class Animal {
      name: string;
      constructor(theName: string) { this.name = theName; }
      move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
      }
    }

    class Snake extends Animal {
      constructor(name: string) { super(name); }
      move(distanceInMeters = 5) {
        console.log('Slithering...');
        super.move(distanceInMeters);
      }
    }

    class Horse extends Animal {
      constructor(name: string) { super(name); }
      move(distanceInMeters = 45) {
        console.log('Galloping...');
        super.move(distanceInMeters);
      }
    }

    let sam = new Snake('Sammy the Python');
    let tom: Animal = new Horse('Tommy the Palomino');

    sam.move();
    tom.move(34);
  }
}
