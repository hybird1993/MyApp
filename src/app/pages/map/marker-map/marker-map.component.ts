import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { points  } from './mock-data';
import { MapConfig } from './config';
import { DeviceStatus, DeviceType } from './device';

declare let AMap: any;    // 一定要声明AMap，要不然报错找不到AMap
declare let BMap: any;
declare let BMapLib: any;
declare const BMAP_NORMAL_MAP: any;
declare const BMAP_HYBRID_MAP: any;
declare const BMAP_ANCHOR_BOTTOM_RIGHT: any;
declare const OBMap_ANCHOR_TOP_LEFT: any;
declare const BMAP_ANCHOR_TOP_LEFT: any;

@Component({
  selector: 'marker-map',
  templateUrl: './marker-map.component.html',
  styleUrls: ['./marker-map.component.scss']
})
export class MarkerMapComponent implements OnInit, AfterViewInit, OnDestroy {
  cluster = [];
  markers = [];
  map;
  scaleControl;
  navigationControl;
  markerClusterer;
  DEVICESTATUS = [
    {value: 1, label: '正常', checked: true},
    {value: 2, label: '非法开门', checked: true},
    {value: 3, label: '电量低', checked: true},
    {value: 4, label: '其他', checked: true}
  ];
  DEVICETYPE = [
    {value: 1, label: '人井', checked: true},
    {value: 2, label: '光交', checked: true},
    {value: 3, label: '室外柜', checked: true},
    {value: 4, label: '网络柜', checked: true}
  ];
  DATASOURCE = [
    {value: 0, label: '模拟后台获取'},
    {value: 500, label: '随机500个点'},
    {value: 5000, label: '随机5000个点'},
    {value: 20000, label: '随机20000个点'},
    {value: 50000, label: '随机50000个点'},
    {value: 100000, label: '随机100000个点'},
  ];
  dataCount = MapConfig.randomMarkersNum;
  _points;
  typeArr = [];
  statusArr = [];
  constructor(
  ) { }

  ngOnInit() {
    this.typeArr = this.DEVICETYPE.map(item => item.value);
    this.statusArr = this.DEVICESTATUS.map(item => item.value);
    this.initBaiduMap();
    // this.initGaodeMap();
  }

  ngAfterViewInit() {
    // this.initBaiduMap();

    setTimeout(() => {
      this.dataCount === 0 ? this.addMarkers() : this.addRandomMarks();
    }, 100);
  }

  ngOnDestroy() {
    this.markers = [];
    this.cluster = [];
  }

  dataCountChange() {
    this.markerClusterer.clearMarkers();
    if (this.dataCount === 0) {
      this.addMarkers();
    } else {
      this.addRandomMarks();
    }
  }

  /**
   * 初始化百度地图
   */
  initBaiduMap() {
    this.map = new BMap.Map('container');
    this.map.enableScrollWheelZoom();
    this.map.addEventListener('zoomend', () => {
      console.log('地图缩放至：' + this.map.getZoom() + '级');
      if (this.map.getZoom() >= MapConfig.showLineZoom) {
        this.addLine();
      } else {

      }
    });

    this.addNavigationControl();

    this.addOverviewMapControl();

    this.addCitysControl();

    this.addLine();

    // this.addlabel();

    this.addMapTypeControl();

     // this.addBoundary();
  }

  /**
   * 添加标记点
   */
  addMarkers() {
    const opts = {
      width : 300,     // 信息窗口宽度
     // height: 200,     // 信息窗口高度
      title : '设施情况' , // 信息窗口标题
    };
    let markers = [];
    let pt = null;
    this._points = points.concat([]);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const l = point['lnglat'];
      pt = new BMap.Point(...l);
      const marker = new BMap.Marker(pt);
      marker.info = point.info;
      marker.enableDragging();
      marker.addEventListener('dragend', e => {
        console.log('当前位置：' + e.point.lng + ',' + e.point.lat);
      }, {capture: true, passive: true});
      marker.addEventListener('mouseover', e => {
        const _marker = new BMap.Point(e.point.lng, e.point.lat);
        const infoWindow = new BMap.InfoWindow(this.setContent('m', e.target.info), opts);  // 创建信息窗口对象
        this.map.openInfoWindow(infoWindow, _marker); // 开启信息窗口
      });
      marker.addEventListener('mouseout', e => {
        this.map.closeInfoWindow(); // 关闭信息窗口
      });

      markers.push(marker);
    }
    // 最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
    // console.log(markers);
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), MapConfig.defalutZoom);
    this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers, maxZoom: MapConfig.maxZoom}, this.callback);
  }

  /**
   * 随机生成标记点并添加进地图
   */
  addRandomMarks() {
    let maxLng, minLng, maxLat, minLat;
    const opts = {
      width : 300,     // 信息窗口宽度
      // height: 200,     // 信息窗口高度
      title : '设施情况' , // 信息窗口标题
    };
    let markers = [];
    let pt = null;
    let __points = [];
    for (let i = 0; i < this.dataCount; i++) {
      const randomlng = Math.random();
      const randomlat = Math.random();
      const randomType = Math.random();
      const randomStatus = Math.random();
      const l = [randomlng * 65 + 73, randomlat * 40 + 16];
      const point = {
        lnglat: l,
        info: {
          id: i,
          name: `${i}号箱`,
          type: Math.ceil(randomType * 4),
          number: (i + '').padStart(6, 0),
          area: i,
          address: `区域${i}的${(i + '').padStart(6, 0)}号箱的地理位置`,
          status:  Math.ceil(randomStatus * 4)
        }
      };
      __points.push(point);
      maxLng = maxLng ? (l[0] > maxLng ?  l[0] : maxLng) : l[0];
      minLng = minLng ? (l[0] < maxLng ?  l[0] : minLng) : l[0];
      maxLat = maxLat ? (l[1] > maxLat ?  l[1] : maxLat) : l[1];
      minLat = minLat ? (l[1] < minLat ?  l[1] : minLat) : l[1];
      pt = new BMap.Point(...l);
      const marker = new BMap.Marker(pt);
      marker.info = point.info;
      marker.addEventListener('dragend', e => {
        console.log('当前位置：' + e.point.lng + ',' + e.point.lat);
      }, {capture: true, passive: true});
      marker.addEventListener('mouseover', e => {
        const _marker = new BMap.Point(e.point.lng, e.point.lat);
        const infoWindow = new BMap.InfoWindow(this.setContent('m', e.target.info), opts);  // 创建信息窗口对象
        this.map.openInfoWindow(infoWindow, _marker); // 开启信息窗口
      });
      marker.addEventListener('mouseout', e => {
        this.map.closeInfoWindow(); // 关闭信息窗口
      });
      marker.addEventListener('click', e => {
        const _marker = new BMap.Point(e.point.lng, e.point.lat);
        const infoWindow = new BMap.InfoWindow(this.setContent('m', e.target.info), opts);  // 创建信息窗口对象
        this.map.openInfoWindow(infoWindow, _marker); // 开启信息窗口
      });
      markers.push(marker);
    }
    this._points = __points.concat([]);
    // 最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
    // console.log(markers);
    this.map.centerAndZoom(new BMap.Point((maxLng + minLng) / 2, (maxLat + minLat) / 2), MapConfig.defalutZoom);
    this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers, maxZoom: MapConfig.maxZoom}, this.callback);
  }

  callback = (event, markers, map) => {
    const marker = new BMap.Point(event.point.lng, event.point.lat);
    const type = event.type;
    console.log(event);
    if (type === 'onclick') {
      console.log('onclick');
    } else if (type === 'onmouseover') {
      console.log('onmouseover');
      // event.stopPropagation();
      const opts = {
        width : 300,     // 信息窗口宽度
        title : '设施情况'  // 信息窗口标题
      };
      const infoWindow = new BMap.InfoWindow(this.setContent('c', markers), opts);
      map.openInfoWindow(infoWindow, marker);
    } else if (type === 'onmouseout') {
      console.log('onmouseout');
      // event.stopPropagation();
      map.closeInfoWindow();
    } else {
      console.log('未知事件');
    }
  }

  /**
   * 设置infoWindow的内容
   * @param type
   * @param data
   * @returns {any}
   */
  setContent(type, data) {
    let str = '';
    if (type === 'm') { // 覆盖物
      str = `<div>设施名称：${data.name}</div>
      <div>类型：${DeviceType[data.type]}</div>
      <div>编号：${data.number}</div>
      <div>区域：${data.area}</div>
      <div>详细地址：${data.address}</div>
      <div>当前状态：${DeviceStatus[data.status]}</div>`;
    } else if (type === 'c') { // 聚合点   数组
      console.log(data);
      let obj = {};
      data.forEach(marker => {
        const info = marker.info;
        if (obj[info.area]) {
          obj[info.area].push(info);
        } else {
          obj[info.area] = [info];
        }
      });
      Object.keys(obj).forEach(key => {
        str += `<div>区域${key}: ${obj[key].length}</div>`;
      });
    } else {
      str = '未知';
    }
    return str;
  }

  /**
   * 添加连线
   */
  addLine() {
    const polyline = new BMap.Polyline(
      [
        new BMap.Point(114.399, 26.910),
        new BMap.Point(113.905, 26.920),
        new BMap.Point(112.985037, 23.15046)
      ],
      {strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5}
    );   // 创建折线
    this.map.addOverlay(polyline);   // 增加折线
  }

  /**
   * 添加行政区划
   */
  addBoundary() {
    const bdary = new BMap.Boundary();
    bdary.get('武汉市', res => {
      // console.log(res);
      let pointArray = [];
      this.map.clearOverlays();        // 清除地图覆盖物
      const count = res.boundaries.length; // 行政区域的点有多少个
      if (count === 0) {
        alert('未能获取当前输入行政区域');
        return ;
      }
      res.boundaries.forEach(item => {
        const ply = new BMap.Polygon(item, {strokeWeight: 3, strokeColor: '#ff0000', fillColor: 'transparent'});
        this.map.addOverlay(ply);
        pointArray = pointArray.concat(ply.getPath());
      });
      this.map.setViewport(pointArray);
    });
  }

  /**
   * 添加缩略图控件
   */
  addOverviewMapControl() {
    this.map.addControl(new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1}));
  }

  addMapTypeControl() {
    this.map.addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ]})
    );
  }

  /**
   * 添加城市切换控件
   */
  addCitysControl() {
    const size = new BMap.Size(70, 20);
    this.map.addControl(new BMap.CityListControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: size,
      // 切换城市之间事件
      // onChangeBefore: function(){
      //    alert('before');
      // },
      // 切换城市之后事件
      // onChangeAfter:function(){
      //   alert('after');
      // }
    }));
  }

  /**
   * 添加比例尺控件
   */
  addScaleControl() {
    this.scaleControl = new BMap.ScaleControl({anchor: OBMap_ANCHOR_TOP_LEFT}); // 左上角，添加比例尺
    this.map.addControl(this.scaleControl);
  }

  /**
   * 移除比例尺控件
   */
  removeScaleControl() {
    this.map.removeControl(this.scaleControl);
  }

  /**
   * 添加缩放平移控件
   */
  addNavigationControl() {
    this.navigationControl = new BMap.NavigationControl();  // 左上角，添加默认缩放平移控件
    this.map.addControl(this.navigationControl);
  }

  /**
   * 设备类型过滤
   * @param event
   */
  deviceTypeChange(event) {
    // console.log(event);
    let arr = [];
    event.forEach(device => {
      if (device.checked) {
        arr.push(device.value);
      }
    });
    this.typeArr = arr;
    this.updataMarkers();
  }

  /**
   * 设备状态过滤
   * @param event
   */
  deviceStatusChange(event) {
    console.log(event);
    let arr = [];
    event.forEach(device => {
      if (device.checked) {
        arr.push(device.value);
      }
    });
    this.statusArr = arr;
    this.updataMarkers();
  }

  /**
   * 更细标记点
   */
  updataMarkers() {
    const opts = {
      width : 300,     // 信息窗口宽度
      // height: 200,     // 信息窗口高度
      title : '设施情况' , // 信息窗口标题
    };
    let markers = [];
    let pt = null;
    for (let i = 0; i < this._points.length; i++) {
      const info = this._points[i].info;
      if (this.typeArr.indexOf(info.type) > -1 && this.statusArr.indexOf(info.status) > -1) {
        const l = this._points[i]['lnglat'];
        pt = new BMap.Point(...l);
        const marker = new BMap.Marker(pt);
        marker.info = info;
        marker.enableDragging();
        marker.addEventListener('dragend', e => {
          console.log('当前位置：' + e.point.lng + ',' + e.point.lat);
        }, {capture: true, passive: true});
        marker.addEventListener('mouseover', e => {
          const _marker = new BMap.Point(e.point.lng, e.point.lat);
          const infoWindow = new BMap.InfoWindow(this.setContent('m', e.target.info), opts);  // 创建信息窗口对象
          this.map.openInfoWindow(infoWindow, _marker); // 开启信息窗口
        });
        marker.addEventListener('mouseout', e => {
          this.map.closeInfoWindow(); // 关闭信息窗口
        });

        markers.push(marker);
      }

    }
    // 最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
    // console.log(markers);
    // this.map.clearOverlays();
    // console.log(markers);
    this.markerClusterer.clearMarkers();
    this.markerClusterer.addMarkers(markers);
  }

  /**
   * 移除缩放平移控件
   */
  removeNavigationControl() {
    this.map.removeControl(this.scaleControl);
  }

  /**
   * 添加标签
   */
  addlabel() {
    const pointArray = [
      new BMap.Point(121.716076, 23.703799),
      new BMap.Point(112.121885, 14.570616),
      new BMap.Point(123.776573, 25.695422)];
    let optsArray = [{}, {}, {}];
    let labelArray = [];
    const contentArray = [
      '台湾是中国的！',
      '南海是中国的！',
      '钓鱼岛是中国的！'];
    for (let i = 0; i < pointArray.length; i++) {
      optsArray[i]['position'] = pointArray[i];
      labelArray[i] = new BMap.Label(contentArray[i], optsArray[i]);
      labelArray[i].setStyle({
        color : 'red',
        fontSize : '12px',
        height : '20px',
        lineHeight : '20px',
        fontFamily: '微软雅黑'
      });
      this.map.addOverlay(labelArray[i]);
    }
  }


  /**
   * 初始化高德地图
   */
  initGaodeMap() {
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
}
