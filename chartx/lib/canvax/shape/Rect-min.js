define("canvax/shape/Rect",["canvax/display/Shape","canvax/core/Base"],function(a,b){var c=function(a){var c=this;c.type="rect",a=b.checkOpt(a),c._context={width:a.context.width||0,height:a.context.height||0,radius:a.context.radius||[]},arguments.callee.superclass.constructor.apply(this,arguments)};return b.creatClass(c,a,{_buildRadiusPath:function(a,c){var d=0,e=0,f=this.context.width,g=this.context.height,h=b.getCssOrderArr(c.radius);a.moveTo(parseInt(d+h[0]),parseInt(e)),a.lineTo(parseInt(d+f-h[1]),parseInt(e)),0!==h[1]&&a.quadraticCurveTo(d+f,e,d+f,e+h[1]),a.lineTo(parseInt(d+f),parseInt(e+g-h[2])),0!==h[2]&&a.quadraticCurveTo(d+f,e+g,d+f-h[2],e+g),a.lineTo(parseInt(d+h[3]),parseInt(e+g)),0!==h[3]&&a.quadraticCurveTo(d,e+g,d,e+g-h[3]),a.lineTo(parseInt(d),parseInt(e+h[0])),0!==h[0]&&a.quadraticCurveTo(d,e,d+h[0],e)},draw:function(a,b){b.$model.radius.length?this._buildRadiusPath(a,b):(b.fillStyle&&a.fillRect(0,0,this.context.width,this.context.height),b.lineWidth&&a.strokeRect(0,0,this.context.width,this.context.height))},getRect:function(a){var b,a=a?a:this.context;return b=a.fillStyle||a.strokeStyle?a.lineWidth||1:0,{x:Math.round(0-b/2),y:Math.round(0-b/2),width:this.context.width+b,height:this.context.height+b}}}),c});