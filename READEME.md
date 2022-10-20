针对vue项目，复制粘贴package文件夹内容至index.html同级目录下

index.html引入如下

```
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script type="text/javascript">
      var env = '<%= NODE_ENV %>';
    </script>
    <script type="text/javascript" src="./map3.0_init.js"></script>
    <script type="text/javascript" src="./map3.0.js"></script>
    <script type="text/javascript" src="./baidu_map_library/RichMarker.js"></script>
    <script type="text/javascript" src="./baidu_map_library/DrawingManager.js"></script>
    <script type="text/javascript" src="./baidu_map_library/GeoUtils.js"></script>
    <script type="text/javascript" src="./baidu_map_library/TextIconOverlay.js"></script>
    <script type="text/javascript" src="./baidu_map_library/MarkerClusterer.js"></script>
    <script type="text/javascript" src="./baidu_map_library/AreaRestriction.js"></script>
  </body>
</html>
```

瓦片通过**全能电子地图下载器3.0(已破).rar**下载

瓦片存放目录package/tiles、package/tiles_satellite、package/tiles_hybird，具体看package/map3.0_init.js

TS需额外引入ts/bmap.d.ts类型声明文件，页面使用api如下

```
const BMap = window.BMap;
const BMapLib = window.BMapLib;
map.value = new BMap.Map("Map")
```

Dockerfile配合打包需将package/tiles、package/tiles_satellite、package/tiles_hybird移出public,新建文件夹将三个文件夹移入，配置如

```
COPY tiles /项目根目录
```

