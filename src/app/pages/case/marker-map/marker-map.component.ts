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
    // this.map.plugin(['AMap.ToolBar'], function() {
    //   this.map.addControl(new AMap.ToolBar());
    // });
    setTimeout(() => {
      this.map.plugin(['AMap.ToolBar'], function() {
        this.map.addControl(new AMap.ToolBar());
      });
    }, 0)
    // // 同时引入工具条插件，比例尺插件和鹰眼插件
    // AMap.plugin([
    //   'AMap.ToolBar',
    //   'AMap.Scale',
    //   'AMap.OverView',
    //   'AMap.MapType',
    //   'AMap.Geolocation',
    // ], function() {
    //   // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
    //   this.map.addControl(new AMap.ToolBar());
    //
    //   // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    //   this.map.addControl(new AMap.Scale());
    //
    //   // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
    //   this.map.addControl(new AMap.OverView({isOpen: true}));
    //
    //   // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    //   this.map.addControl(new AMap.MapType());
    //
    //   // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
    //   this.map.addControl(new AMap.Geolocation());
    // });
    //
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
