define("canvax/geom/Math",[],function(){function a(a,b){return a=(b?a*g:a).toFixed(4),"undefined"==typeof f.sin[a]&&(f.sin[a]=Math.sin(a)),f.sin[a]}function b(a,b){return a=(b?a*g:a).toFixed(4),"undefined"==typeof f.cos[a]&&(f.cos[a]=Math.cos(a)),f.cos[a]}function c(a){return a*g}function d(a){return a/g}function e(a){var b=(360+a%360)%360;return 0==b&&0!==a&&(b=360),b}var f={sin:{},cos:{}},g=Math.PI/180;return{PI:Math.PI,sin:a,cos:b,degreeToRadian:c,radianToDegree:d,degreeTo360:e}});