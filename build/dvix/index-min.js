var Dvix={start:function(){/daily.taobao.net/g.test(location.host)&&(Dvix.site.daily=!0);var a="http://g.tbcdn.cn/thx/canvax/2014.12.02/",b="http://g.tbcdn.cn/thx/charts/1.2.8/";Dvix.setPackages([{name:"canvax",path:a},{name:"dvix",path:b}])},site:{local:!!~location.search.indexOf("local"),daily:!!~location.search.indexOf("daily"),debug:!!~location.search.indexOf("debug"),build:!!~location.search.indexOf("build")},setPackages:function(a){function b(b){if(a.length>0)for(var c=0,d=a.length;d>c;c++)if(0==b.indexOf(a.name))return!0}function c(a){return-1!=a.constructor.toString().indexOf("Array")}if(a=a||[],window.define||KISSY&&(window.define=function(a,b,c){function d(){var a=[].slice.call(arguments,1,arguments.length);return c.apply(window,a)}switch(arguments.length){case 2:c=b,b=a,KISSY.add(d,{requires:b});break;case 3:KISSY.add(a,d,{requires:b})}},window.define.kmd={},window.require||(window.require=function(a,b){function d(){var a=[].slice.call(arguments,1,arguments.length);return b.apply(window,a)}KISSY.use(c(a)?a.join(","):a,d)})),"function"==typeof define&&define.cmd){var d=define;window.define=function(a,c,e){return"string"==typeof a&&b(a)?d(a,c,function(a,b,d){for(var f=[],g=0,h=c.length;h>g;g++)f.push(a(c[g]));d.exports=e.apply(window,f)}):d.apply(window,arguments)},window.require&&(window.require=seajs.use)}"function"==typeof define&&define.amd;for(var e=0,f=a.length;f>e;e++){var g=a[e].name.toString(),h=a[e].path;window.KISSY&&KISSY.config({packages:[{name:g,path:h,debug:Dvix.site.debug,combine:!Dvix.site.local}]});var i={};i[g]=h,window.seajs&&(i[g]=h+g,seajs.config({paths:i})),window.requirejs&&(i[g]=h+g,requirejs.config({paths:i}))}},getEl:function(a){return _.isString(a)?document.getElementById(a):1==a.nodeType?a:a.length?a[0]:null},getStyle:function(a,b){var c,d=arguments.length;return"currentStyle"in a?c=a.currentStyle:"getComputedStyle"in window?c=window.getComputedStyle(a,null):null,c=2==d?c[b]:c},getOffset:function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.body,e=c.documentElement,f=e.clientTop||d.clientTop||0,g=e.clientLeft||d.clientLeft||0,h=1;if(d.getBoundingClientRect){var i=d.getBoundingClientRect();h=(i.right-i.left)/d.clientWidth}h>1&&(f=0,g=0);var j=b.top/h+(window.pageYOffset||e&&e.scrollTop/h||d.scrollTop/h)-f,k=b.left/h+(window.pageXOffset||e&&e.scrollLeft/h||d.scrollLeft/h)-g;return{top:j,left:k}}};Dvix.start();