KISSY.add("dvix/chart/pie/index",function(a,b,c,d,e,f,g,h){var i=b.Canvax;return b.extend({init:function(){this.config={mode:1,event:{enabled:1}},this.stageBg=new i.Display.Sprite({id:"bg"}),this.core=new i.Display.Sprite({id:"core"}),this.stageTip=new i.Display.Stage({id:"stageTip"}),this.canvax.addChild(this.stageTip),this.stageTip.toFront(),this.stage.addChild(this.core)},draw:function(a,b){this.dataFrame=this._initData(a,b),this._initModule(b),this._startDraw(b),this._drawEnd(),this._arguments=arguments},_initData:function(b){var c={};if(c.org=b,c.data=[],a.isArray(b))for(var d=0;d<b.length;d++){var e={};a.isArray(b[d])?(e.name=b[d][0],e.y=parseFloat(b[d][1]),e.sliced=!1,e.selected=!1):"object"==typeof b[d]&&(e.name=b[d].name,e.y=parseFloat(b[d].y),e.sliced=b[d].sliced||!1,e.selected=b[d].selected||!1),e.name&&c.data.push(e)}return c},clear:function(){this.stageBg.removeAllChildren(),this.core.removeAllChildren(),this.stageTip.removeAllChildren()},reset:function(a,b){this.clear(),this.width=parseInt(this.element.width()),this.height=parseInt(this.element.height()),this.draw(a,b)},_initModule:function(a){var b=this,c=b.width,d=b.height,e=2*Math.min(c,d)/3/2,g=parseInt(a.innerRadius||0),i=2*e/3;g=g>=0?g:0,g=i>=g?g:i;var j=c/2,k=d/2;a=a||{},a.pie={x:j,y:k,r0:g,r:e,boundWidth:c,boundHeight:d},a.tip.enabled&&(b._tip=new h(a),a.tipCallback={position:function(a){b._tip&&(b._tip.sprite.context.visible=!0,b._tip.sprite.context.x=a.x+5,b._tip.sprite.context.y=a.y-5)},isshow:function(a){b._tip.sprite.context.visible=a},update:function(a){b._tip._reset(a)}}),b._pie=new f(a,this.dataFrame)},_startDraw:function(a){this._pie.draw(a)},_drawEnd:function(){this.core.addChild(this._pie.sprite),this._tip&&this.stageTip.addChild(this._tip.sprite)}})},{requires:["dvix/chart/","dvix/utils/tools","dvix/utils/datasection","dvix/event/eventtype","dvix/components/pie/Pie","dvix/components/line/Graphs","dvix/components/pie/PieTip"]});