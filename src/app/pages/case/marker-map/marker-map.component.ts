import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { points  } from './mock-data';
declare let AMap: any;    // 一定要声明AMap，要不然报错找不到AMap

@Component({
  selector: 'marker-map',
  templateUrl: './marker-map.component.html',
  styleUrls: ['./marker-map.component.scss']
})
export class MarkerMapComponent implements OnInit {
  cluster = [];
  markers = [];
  map;
  @ViewChild('container') private container: ElementRef<any>;
  constructor(
  ) { }

  ngOnInit() {
    // this.getMap();
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      center: [105, 34],
      zoom: 4
    });
    console.log(points.length);
    for (let i = 0; i < points.length; i++) {
      this.markers.push(new AMap.Marker({
        position: points[i]['lnglat'],
        content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px;' +
        ' border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
        offset: new AMap.Pixel(-15, -15)
      }));
    }

    this.map.plugin(['AMap.ToolBar'], () => {
      this.map.addControl(new AMap.ToolBar());
    });

    this.cluster = new AMap.MarkerClusterer(
      this.map, this.markers, { gridSize: 80}
     );
  }

  // getMap() {
  //   const map = new AMap.Map('container', {
  //     resizeEnable: true,
  //     zoom: 11,
  //     center: [116.397428, 39.90923]
  //   });
  // }
}
