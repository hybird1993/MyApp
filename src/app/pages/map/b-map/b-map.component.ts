import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MapConfig } from './config';
import { FacilityStatus, FacilityType } from './facility';
import {CommonUtils} from '../../../core/utils/common-utils';

declare let BMap: any;   // 一定要声明BMap，要不然报错找不到BMap
declare let BMapLib: any;
declare const BMAP_NORMAL_MAP: any;
declare const BMAP_SATELLITE_MAP: any;
declare const BMAP_ANCHOR_BOTTOM_RIGHT: any;
declare const OBMap_ANCHOR_TOP_LEFT: any;
declare const BMAP_ANCHOR_TOP_LEFT: any;

@Component({
  selector: 'app-b-map',
  templateUrl: './b-map.component.html',
  styleUrls: ['./b-map.component.scss']
})
export class BMapComponent implements OnInit, AfterViewInit, OnDestroy {
  cluster = [];
  markers = [];
  map;
  scaleControl;
  navigationControl;
  markerClusterer;
  facilityStatus;
  facilityType;
  typeArr = [];
  statusArr = [];
  DEVICESTATUS = [
    {value: 1, label: '正常', checked: true},
    {value: 2, label: '离线', checked: true},
    {value: 3, label: '告警', checked: true}
  ];
  DEVICETYPE = [
    {value: 1, label: '配架线', checked: true},
    {value: 2, label: '光缆', checked: true},
    {value: 3, label: '光交箱', checked: true},
    {value: 4, label: '人井', checked: true},
    {value: 5, label: '接头盒', checked: true},
    {value: 6, label: '分纤箱', checked: true},
  ];
  DATASOURCE = [
    {value: 100, label: '随机100个点'},
    {value: 500, label: '随机500个点'},
    {value: 5000, label: '随机5000个点'},
    {value: 20000, label: '随机20000个点'},
    {value: 50000, label: '随机50000个点'},
    {value: 100000, label: '随机100000个点'},
  ];
  dataCount = MapConfig.randomMarkersNum;
  _points;
  markerOpt = {
    width : 300,     // 信息窗口宽度
    // height: 200,     // 信息窗口高度
    title : '设施情况' , // 信息窗口标题
  };
  isShowFacilityPanel = false;
  isExpandLogicArea = false;
  isExpandFacilityList = false;
  isExpandMyCollection = false;
  tabs = [
    {value: 'info', label: '设施信息'},
    {value: 'alarm', label: '告警'},
    {value: 'log', label: '日志'},
  ];
  selectedIndex = 0;
  icon;
  timer;
  _markersIdArr = [];
  constructor(
  ) { }

  ngOnInit() {
    this.resetFilter();
    this.initBaiduMap();
    // this.initGaodeMap();
    this.icon = new BMap.Icon('http://api.map.baidu.com/img/markers.png', new BMap.Size(23, 25), {
      offset: new BMap.Size(10, 25), // 指定定位位置
      imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
    });
  }

  ngAfterViewInit() {
    // this.initBaiduMap();

    setTimeout(() => {
       this.addRandomMarks();
    }, 100);
  }

  ngOnDestroy() {
    this.markers = [];
    this.cluster = [];
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

    // this.addOverviewMapControl();

    this.addCitysControl();

    this.addLine();

    // this.addlabel();

    this.addMapTypeControl();

     // this.addBoundary();
  }


  /**
   * 随机生成标记点并添加进地图
   */
  addRandomMarks() {
    let maxLng, minLng, maxLat, minLat;
    let markers = [];
    let pt = null;
    let __points = [];
    const __randomlng = Math.random();
    const __randomlat = Math.random();

    let _randomlng = __randomlng;
    let _randomlat = __randomlat;
    const __times =  Math.ceil((__randomlng + __randomlat) * 10 / 2);
    let times = __times > 1 ? __times : 1;
    for (let i = 0; i < this.dataCount; i++) {
      const randomlng = times < 1 ? Math.random() : _randomlng;
      const randomlat = times < 1 ? Math.random() : _randomlat;
      const randomType = Math.random();
      const randomStatus = Math.random();
      if (times < 1) {
        const _times = Math.ceil((randomlng + randomlat + randomType + randomStatus) * 10 / 4);
        times = _times > 1 ? _times : 1;
      }
      _randomlng = randomlng;
      _randomlat = randomlat;
      times--;
      const l = [randomlng * 3.8 + 110, randomlat * 2.3 + 30];
      const point = {
        lnglat: l,
        info: {
          id: i,
          name: `${(i + '').padStart(6, '0')}号箱`,
          type: Math.ceil(randomType * 6),
          number: (i + '').padStart(6, '0'),
          area: i,
          address: `区域${i}的${(i + '').padStart(6, '0')}号箱的地理位置`,
          status:  Math.ceil(randomStatus * 3)
        }
      };
      __points.push(point);
      maxLng = maxLng ? (l[0] > maxLng ?  l[0] : maxLng) : l[0];
      minLng = minLng ? (l[0] < maxLng ?  l[0] : minLng) : l[0];
      maxLat = maxLat ? (l[1] > maxLat ?  l[1] : maxLat) : l[1];
      minLat = minLat ? (l[1] < minLat ?  l[1] : minLat) : l[1];
      pt = new BMap.Point(...l);
      const marker = new BMap.Marker(pt, {icon: this.icon});
      marker.info = point.info;
      this.addEventListener(marker);
      markers.push(marker);
    }
    this._points = __points.concat([]);
    // 最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
    // console.log(markers);
    this.map.centerAndZoom(new BMap.Point((maxLng + minLng) / 2, (maxLat + minLat) / 2), MapConfig.defalutZoom);
    this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers, maxZoom: MapConfig.maxZoom}, this.callback);
    console.log(this.map);
  }

  /**
   * 自定义的聚合点事件回调
   * @param event
   * @param markers
   * @param map
   */
  callback = (event, markers, map) => {
    const marker = new BMap.Point(event.point.lng, event.point.lat);
    const type = event.type;
    if (type === 'onclick') {
     // console.log('onclick');
    } else if (type === 'onmouseover') {
      console.log('onmouseover');
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.checkIsOpen(markers)) {
        const opts = {
          title : '设施情况', // 信息窗口标题
          width : 300,     // 信息窗口宽度
        };
        const infoWindow = new BMap.InfoWindow(this.setContent('c', markers), opts);
        map.openInfoWindow(infoWindow, marker);
        console.log('open');
      }
    } else if (type === 'onmouseout') {
      console.log('onmouseout');
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this._markersIdArr = [];
        map.closeInfoWindow();
        console.log('close');
      }, 200);
    } else {
     // console.log('未知事件');
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
      <div>类型：${FacilityType[data.type]}</div>
      <div>编号：${data.number}</div>
      <div>区域：${data.area}</div>
      <div>详细地址：${data.address}</div>
      <div>当前状态：${FacilityStatus[data.status]}</div>`;
      this._markersIdArr.push(data.id);
    } else if (type === 'c') { // 聚合点   数组
      // console.log(data);
      let obj = {};
      data.forEach(marker => {
        const info = marker.info;
        if (obj[info.area]) {
          obj[info.area].push(info);
        } else {
          obj[info.area] = [info];
        }
        this._markersIdArr.push(info.id);
      });
     // console.log(this._markersIdArr)
      Object.keys(obj).forEach(key => {
        str += `<div>区域${key}: ${obj[key].length}</div>`;
      });
    } else {
      str = '未知';
    }
    return str;
  }

  checkIsOpen(data) {
    let bol = true;
    data.forEach((marker, index) => {
      const info = marker.info;
      bol = bol && info.id === this._markersIdArr[index];
    });
    // console.log(data);
    // console.log([...this._markersIdArr])
    // console.log(bol);
    return bol;
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

  /**
   * 添加地图类型控件
   */
  addMapTypeControl() {
    this.map.addControl(new BMap.MapTypeControl({
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_SATELLITE_MAP
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
   * 设施类型过滤
   * @param event
   */
  facilityTypeChange(event) {
    // console.log(event);
    let arr = [];
    event.forEach(facility => {
      if (facility.checked) {
        arr.push(facility.value);
      }
    });
    this.typeArr = arr;
    this.updataMarkers();
  }

  /**
   * 设施状态过滤
   * @param event
   */
  facilityStatusChange(event) {
    console.log(event);
    let arr = [];
    event.forEach(facility => {
      if (facility.checked) {
        arr.push(facility.value);
      }
    });
    this.statusArr = arr;
    this.updataMarkers();
  }

  /**
   * 随机点生成数目改变
   * @param event
   */
  dataCountChange(event) {
    this.markerClusterer.clearMarkers();
    this.addRandomMarks();
    this.resetFilter();
  }

  /**
   * 重置过滤条件
   */
  resetFilter() {
    this.facilityType = CommonUtils.deepClone(this.DEVICETYPE);
    this.facilityStatus = CommonUtils.deepClone(this.DEVICESTATUS);
    this.typeArr = this.facilityType.map(item => item.value);
    this.statusArr = this.facilityStatus.map(item => item.value);
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
        const marker = new BMap.Marker(pt , {icon: this.icon});
        marker.info = info;
        // marker.enableDragging();
        this.addEventListener(marker);
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
   * marker添加事件
   * @param target
   */
  addEventListener(target) {
    target.addEventListener('dragend', e => {
      console.log('当前位置：' + e.point.lng + ',' + e.point.lat);
    }, {capture: true, passive: true});
    target.addEventListener('mouseover', e => {
      const _marker = new BMap.Point(e.point.lng, e.point.lat);
      const infoWindow = new BMap.InfoWindow(this.setContent('m', e.target.info), this.markerOpt);  // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, _marker); // 开启信息窗口
    });
    target.addEventListener('mouseout', e => {
      this.map.closeInfoWindow(); // 关闭信息窗口
    });
    target.addEventListener('mouseenter', e => {
      console.log('mouseenter');
    });
    target.addEventListener('click', e => {
      this.isShowFacilityPanel = true;

    });
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

  changeTab(tab) {
    console.log(tab);
  }

  closeFacilityPanel() {
    this.isShowFacilityPanel = false;
  }
}
