var bmapcfg = {
  'imgext'      : '.jpg',   //瓦片图的后缀 ------ 根据需要修改，一般是 .png .jpg
  'tiles_dir'   : '',       //普通瓦片图的地址，为空默认在 offlinemap/tiles/ 目录
  'tiles_hybrid': '',       //卫星瓦片图的地址，为空默认在 offlinemap/tiles_hybrid/ 目录
  'tiles_self'  : ''        //自定义图层的地址，为空默认在 offlinemap/tiles_self/ 目录
};
var script = document.getElementById("map_load");
var JS__FILE__ = script.getAttribute("src");  //获得当前js文件路径
bmapcfg.home = JS__FILE__.substr(0, JS__FILE__.lastIndexOf("/")+1); //地图API主目录

(function(){
  window.Map_loadScriptTime = (new Date).getTime();
  const offline = false;
  const isBMap = false;
  // document.write('<script type="text/javascript" id="map" src=""></script>');
  // document.write('<script type="text/javascript" id="textIconOverlay" src=""></script>');
  // document.write('<script type="text/javascript" id="markerClusterer" src=""></script>');

    // document.write('<script type="text/javascript" id="map" src="http://api.map.baidu.com/api?v=3.0&ak=G10n9DSB7eL67v6L4QOtOlsqYq7WWGNr"></script>');
    // document.write('<script type="text/javascript" id="textIconOverlay" src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>');
    // document.write('<script type="text/javascript" id="markerClusterer" src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>');
   localStorage.setItem('isBMap', isBMap);

   if(isBMap && offline) {  // 百度离线地图
    //加载地图API主文件
    document.write('<script type="text/javascript" src="'+bmapcfg.home+'bmap_offline_api_v3.0_min.js"></script>');
    //加载扩展函数
   // document.write('<script type="text/javascript" src="'+bmapcfg.home+'map_plus.js"></script>');
    //加载城市坐标
  //  document.write('<script type="text/javascript" src="'+bmapcfg.home+'map_city.js"></script>');
    document.write('<script type="text/javascript" src="'+bmapcfg.home+'modules/TextIconOverlay_min.js"></script>');
    document.write('<script type="text/javascript" src="'+bmapcfg.home+'modules/MarkerClusterer_min.js"></script>');
   } else if (isBMap && !offline) {   // 百度在线地图
    <!--百度地图-->
    document.write('<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=ZczWHZo66FceT4MYuVkK4kY3"></script>');
    document.write('<script type="text/javascript" src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>');
   // document.write('<script type="text/javascript" src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>');
    document.write('<script type="text/javascript" src="'+bmapcfg.home + 'MarkerClusterer.js"></script>');
  } else if (!isBMap && !offline) {  // 谷歌在线地图
    document.write('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGwT3XelPA7xS3wtyOekwZ6RKCJKV_GKM"> </script>');
    document.write('<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>');

   } else {  // 谷歌离线地图

   }

})();
