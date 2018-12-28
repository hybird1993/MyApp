import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MapConfig } from './config';
import { FacilityStatus, FacilityType } from './facility';
import {CommonUtils} from '../../../core/utils/common-utils';
import {BMap, BMapLib} from '../b-map/b-map.component';
import {data} from './data'

declare let google: any;
declare let MarkerClusterer: any;
@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.scss']
})
export class GMapComponent implements OnInit, AfterViewInit, OnDestroy {
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
    {value: 200000, label: '随机200000个点'},
    {value: 300000, label: '随机300000个点'},
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
  flightPath;
  constructor(
  ) { }

  ngOnInit() {
    // this.resetFilter();
    // this.initGoogleMap();
    // this.map.addListener('zoom_changed', () => {
    //   console.log(this.map.getZoom());
    // });
    // const imageUrl = `https://chart.apis.google.com/chart?cht=mm&chs=24x32&chco=FFFFFF,008CFF,000000&ext=.png`;
    // this.icon = new google.maps.MarkerImage(imageUrl, new google.maps.Size(24, 32));
    this.mockData();
  }

  ngAfterViewInit() {

    // setTimeout(() => {
      // this.addRandomMarks();
    // }, 100);
  }

  ngOnDestroy() {
    this.markers = [];
    this.cluster = [];
  }

  mockData() {
    let center = new google.maps.LatLng(37.4419, -122.1419);

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    let markers = [];
    for (let i = 0; i < 100; i++) {
      let dataPhoto = data.photos[i];
      let latLng = new google.maps.LatLng(dataPhoto.latitude,
        dataPhoto.longitude);
      let marker = new google.maps.Marker({
        position: latLng
      });
      markers.push(marker);
    }
    console.log(markers)
    const imgPath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
    let markerCluster = new MarkerClusterer(map, markers, {
      averageCenter: true, imagePath: imgPath
    });

    google.maps.event.addListener(markerCluster, 'click', function (c) {
      console.log('click');
    });
    google.maps.event.addListener(markerCluster, 'mouseover', function (c) {
      console.log('mouseover');
    });
    google.maps.event.addListener(markerCluster, 'mouseout', function (c) {
      console.log('mouseout');
    });
    console.log(markerCluster);

  }

  /**
   * 初始化谷歌地图
   */
  initGoogleMap() {
    const locations = [
      {lat: -43.999792, lng: 170.463352},
      {lat: -43.999792, lng: 170.463352},
      {lat: -43.999792, lng: 170.463352}
    ];
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom:  MapConfig.defalutZoom,
      center: {lat: -28.024, lng: 140.887},
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      scaleControl: true,
      streetViewControl: false,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      fullscreenControl: false
    });

    // Add a marker clusterer to manage the markers.
    // const markerCluster = new MarkerClusterer(this.map, markers,
    //   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    // google.maps.event.addListener(markerCluster, 'click', function (c) {
    //   console.log('click');
    //   const m = c.getMarkers();
    //   const p = [];
    //   for (let i = 0; i < m.length; i++ ) {
    //     p.push(m[i].getPosition());
    //   }
    //   console.log(p);
    // });
    // google.maps.event.addListener(markerCluster, 'mouseover', function (c) {
    //   console.log('mouseover');
    //   const m = c.getMarkers();
    //   const p = [];
    //   for (let i = 0; i < m.length; i++ ) {
    //     p.push(m[i].getPosition());
    //   }
    // });
    // google.maps.event.addListener(markerCluster, 'mouseout', function (c) {
    //   console.log('mouseover');
    //   const m = c.getMarkers();
    //   const p = [];
    //   for (let i = 0; i < m.length; i++ ) {
    //     p.push(m[i].getPosition());
    //   }
    // });

    // this.addLine();

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
      const l = [randomlat * 2.3 + 30, randomlng * 3.8 + 110];
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
      pt = new google.maps.LatLng(...l);
      // , icon: this.icon
      const marker = new google.maps.Marker({position: pt});
     // this.addEventListener(marker);
      markers.push(marker);
    }
    console.log(markers);
    this._points = __points.concat([]);
    const imgPath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
    this.markerClusterer = new MarkerClusterer(this.map, markers, { averageCenter: true, imagePath: imgPath});
    this.map.setCenter(new google.maps.LatLng( (maxLng + minLng) / 2, (maxLat + minLat) / 2));
    google.maps.event.addListener(this.markerClusterer, 'click', function (c) {
      console.log('click');
      const m = c.getMarkers();
      const p = [];
      for (let i = 0; i < m.length; i++ ) {
        p.push(m[i].getPosition());
      }
      console.log(p);
    });
    google.maps.event.addListener(this.markerClusterer, 'mouseover', function (c) {
      console.log('mouseover');
      const m = c.getMarkers();
      const p = [];
      for (let i = 0; i < m.length; i++ ) {
        p.push(m[i].getPosition());
      }
    });
    google.maps.event.addListener(this.markerClusterer, 'mouseout', function (c) {
      console.log('mouseover');
      const m = c.getMarkers();
      const p = [];
      for (let i = 0; i < m.length; i++ ) {
        p.push(m[i].getPosition());
      }
    });


    console.log(this.markerClusterer);
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
    const flightPlanCoordinates = [
      {lat: 37.772, lng: -122.214},
      {lat: 21.291, lng: -157.821},
      {lat: -18.142, lng: 178.431},
      {lat: -27.467, lng: 153.027}
    ];
    this.flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.flightPath.setMap(this.map);
  }

  removeLine() {
    this.flightPath.setMap(null);
  }

  /**
   * 添加缩略图控件
   */
  addOverviewMapControl() {

  }

  /**
   * 添加地图类型控件
   */
  addMapTypeControl() {

  }

  /**
   * 添加城市切换控件
   */
  addCitysControl() {

  }

  /**
   * 添加比例尺控件
   */
  addScaleControl() {

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


  changeTab(tab) {
    console.log(tab);
  }

  closeFacilityPanel() {
    this.isShowFacilityPanel = false;
  }
}
