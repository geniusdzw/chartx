define("chartx/chart/line/index",["chartx/chart/index","chartx/utils/tools","chartx/utils/datasection","./xaxis","chartx/components/yaxis/yAxis","chartx/components/back/Back","chartx/components/anchor/Anchor","chartx/components/line/Graphs","./tips","chartx/utils/dataformat"],function(a,b,c,d,e,f,g,h,i,j){var k=a.Canvax;return a.extend({init:function(a,b,c){this.event={enabled:0,This:this,on:null},this._xAxis=null,this._yAxis=null,this._anchor=null,this._back=null,this._graphs=null,this._tips=null,_.deepExtend(this,c),this.dataFrame=this._initData(b,this)},draw:function(){this.stageTip=new k.Display.Sprite({id:"tip"}),this.core=new k.Display.Sprite({id:"core"}),this.stageBg=new k.Display.Sprite({id:"bg"}),this.stage.addChild(this.stageBg),this.stage.addChild(this.core),this.stage.addChild(this.stageTip),this.rotate&&this._rotate(this.rotate),this._initModule(),this._startDraw(),this._arguments=arguments},add:function(a,b){if(!(_.indexOf(this.yAxis.field,a)>=0)){var c=this.yAxis.field.length;void 0!=b&&null!=b&&(c=b),this.yAxis.field.splice(b,0,a),this.dataFrame=this._initData(this.dataFrame.org,this),this._yAxis.update(this.yAxis,this.dataFrame.yAxis),this._back.update({xAxis:{data:this._yAxis.layoutData}}),this._graphs.add({data:this._trimGraphs()},b)}},remove:function(a){var b=null;b=_.isNumber(a)?a:_.indexOf(this.yAxis.field,a),null!=b&&void 0!=b&&-1!=b&&this._remove(b)},_remove:function(a){this.dataFrame.yAxis.field.splice(a,1),this.dataFrame.yAxis.org.splice(a,1),this._yAxis.update(this.yAxis,this.dataFrame.yAxis),this._back.update({xAxis:{data:this._yAxis.layoutData}}),this._graphs.remove(a),this._graphs.update({data:this._trimGraphs()})},_initData:j,_initModule:function(){this._xAxis=new d(this.xAxis,this.dataFrame.xAxis),this._yAxis=new e(this.yAxis,this.dataFrame.yAxis),this._back=new f(this.back),this._anchor=new g(this.anchor),this._graphs=new h(this.graphs,this),this._tips=new i(this.tips,this.dataFrame,this.canvax.getDomContainer()),this.stageBg.addChild(this._back.sprite),this.stageBg.addChild(this._anchor.sprite),this.core.addChild(this._xAxis.sprite),this.core.addChild(this._yAxis.sprite),this.core.addChild(this._graphs.sprite),this.stageTip.addChild(this._tips.sprite)},_startDraw:function(){var a=this.height-this._xAxis.h;this._yAxis.draw({pos:{x:0,y:a},yMaxHeight:a});var b=this._yAxis.w;this._xAxis.draw({graphh:this.height,graphw:this.width,yAxisW:b}),this._xAxis.yAxisW!=b&&(this._yAxis.resetWidth(this._xAxis.yAxisW),b=this._xAxis.yAxisW),this._back.draw({w:this._xAxis.w,h:a,xAxis:{data:this._yAxis.layoutData},yAxis:{data:this._xAxis.layoutData},pos:{x:b,y:a}}),this._graphs.draw({w:this._xAxis.xGraphsWidth,h:this._yAxis.yGraphsHeight,data:this._trimGraphs(),disX:this._getGraphsDisX(),smooth:this.smooth}),this._graphs.setX(b),this._graphs.setY(a),this._graphs.grow();var c=this;if(this._graphs.sprite.on("hold mouseover",function(a){c._tips.enabled&&a.tipsInfo.nodesInfoList.length>0&&(c._setXaxisYaxisToTipsInfo(a),c._tips.show(a))}),this._graphs.sprite.on("drag mousemove",function(a){c._tips.enabled&&(a.tipsInfo.nodesInfoList.length>0?(c._setXaxisYaxisToTipsInfo(a),c._tips._isShow?c._tips.move(a):c._tips.show(a)):c._tips._isShow&&c._tips.hide(a))}),this._graphs.sprite.on("release mouseout",function(a){c._tips.enabled&&c._tips.hide(a)}),this._anchor.enabled){var d=this._getPosAtGraphs(this._anchor.xIndex,this._anchor.num);this._anchor.draw({w:this.width-b,h:a,cross:{x:d.x,y:a+d.y},pos:{x:b,y:0}})}},_setXaxisYaxisToTipsInfo:function(a){a.tipsInfo.xAxis={field:this.dataFrame.xAxis.field,value:this.dataFrame.xAxis.org[0][a.tipsInfo.iNode]};var b=this;_.each(a.tipsInfo.nodesInfoList,function(a,c){a.field=b.dataFrame.yAxis.field[c]})},_trimGraphs:function(){for(var a=this._yAxis.dataSection[this._yAxis.dataSection.length-1],b=this.dataFrame.yAxis.org,c=[],d=0,e=b.length;e>d;d++)for(var f=0,g=b[d].length;g>f;f++){c[d]?"":c[d]=[];var h=this._xAxis.data[f].x,i=-(b[d][f]-this._yAxis._bottomNumber)/(a-this._yAxis._bottomNumber)*this._yAxis.yGraphsHeight;i=isNaN(i)?0:i,c[d][f]={value:b[d][f],x:h,y:i}}return c},_getPosAtGraphs:function(a,b){var c=this._xAxis.data[a].x,d=this._graphs.data[0][a].y;return{x:c,y:d}},_getGraphsDisX:function(){var a=this._xAxis.dataSection.length,b=this._xAxis.xGraphsWidth/(a-1);return 1==a&&(b=0),b},_click:function(a){var b=this.This;_.isFunction(b.on)&&b.on(a)}})});