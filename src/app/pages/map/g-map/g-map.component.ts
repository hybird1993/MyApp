import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MapConfig } from './config';
import { FacilityStatus, FacilityType } from './facility';
import {CommonUtils} from '../../../core/utils/common-utils';

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
    this.initGoogleMap();
    this.map.addListener('zoom_changed', () => {
      console.log(this.map.getZoom());
    });

    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(
      document.querySelector('.zoom-control'));
  }

  ngAfterViewInit() {

    setTimeout(() => {
       // this.addRandomMarks();
    }, 100);
  }

  ngOnDestroy() {
    this.markers = [];
    this.cluster = [];
  }

  /**
   * 初始化谷歌地图
   */
  initGoogleMap() {
    const locations = [
      {lat: -31.563910, lng: 147.154312},
      {lat: -33.718234, lng: 150.363181},
      {lat: -33.727111, lng: 150.371124},
      {lat: -33.848588, lng: 151.209834},
      {lat: -33.851702, lng: 151.216968},
      {lat: -34.671264, lng: 150.863657},
      {lat: -35.304724, lng: 148.662905},
      {lat: -36.817685, lng: 175.699196},
      {lat: -36.828611, lng: 175.790222},
      {lat: -37.750000, lng: 145.116667},
      {lat: -37.759859, lng: 145.128708},
      {lat: -37.765015, lng: 145.133858},
      {lat: -37.770104, lng: 145.143299},
      {lat: -37.773700, lng: 145.145187},
      {lat: -37.774785, lng: 145.137978},
      {lat: -37.819616, lng: 144.968119},
      {lat: -38.330766, lng: 144.695692},
      {lat: -39.927193, lng: 175.053218},
      {lat: -41.330162, lng: 174.865694},
      {lat: -42.734358, lng: 147.439506},
      {lat: -42.734358, lng: 147.501315},
      {lat: -42.735258, lng: 147.438000},
      {lat: -43.999792, lng: 170.463352}
    ];
    this.map = new google.maps.Map(document.getElementById('container'), {
      zoom: 3,
      center: {lat: -28.024, lng: 140.887}
    });
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    const markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });

    // Add a marker clusterer to manage the markers.
    const markerCluster = new MarkerClusterer(this.map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

  }

  initMapTypeControl() {
    const mapTypeControlDiv = document.querySelector('.maptype-control');
    // document.querySelector('.maptype-control-map').onclick = function() {
    //   mapTypeControlDiv.classList.add('maptype-control-is-map');
    //   mapTypeControlDiv.classList.remove('maptype-control-is-satellite');
    //   this.map.setMapTypeId('roadmap');
    // };
    // document.querySelector('.maptype-control-satellite').onclick =
    //   function() {
    //     mapTypeControlDiv.classList.remove('maptype-control-is-map');
    //     mapTypeControlDiv.classList.add('maptype-control-is-satellite');
    //     this.map.setMapTypeId('hybrid');
    //   };

    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
      mapTypeControlDiv);
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
    }
    this._points = __points.concat([]);
    // 最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
    // console.log(markers);

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
