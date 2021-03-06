define(
    'chartx/chart/original/relcontrast',
    [
        'chartx/chart/index',
        'chartx/chart/original/relcontrast/dataformat',
        'chartx/chart/original/relcontrast/layout',
        'canvax/shape/Circle',
        'canvax/shape/Line',
        'chartx/components/tips/tip'
    ],
    function( Chart , DataFormat , Layout , Circle , Line , Tip ){
        var Canvax = Chart.Canvax;
        return Chart.extend({
            init : function( el , data , opts){
                this.padding = {
                    top:10,right:10,bottom:10,left:10
                };
                opts.padding && _.extend( this.padding , opts.padding );
                this.graphs  = {
                    w : this.width  - this.padding.left - this.padding.right,
                    h : this.height - this.padding.top  - this.padding.bottom,
                    group : {
                        fillStyle : [ "#428dbc" , "#cc345b" ]
                    },
                    node  : {
                        text : {
                            format : function( v ){ return v },
                            fillStyle : "white",
                            fontSize  : 12
                        }
                    },
                    edge : {
                        
                    }
                };

                _.deepExtend( this , opts );
                this.layout = Layout( this._initData( data, opts ) , this.graphs );    
            },
            draw : function(){
                this._initModule();
                this._widget();
            },
            _initModule : function(){
                this.edgeSprite = new Canvax.Display.Sprite({
                    id  : "edgeSprite",
                    context : {
                        x : this.padding.left,
                        y : this.padding.top
                    }
                });
                this.stage.addChild( this.edgeSprite );

                this.nodeSprite = new Canvax.Display.Sprite({
                    id : "nodeSprite",
                    context : {
                        x : this.padding.left,
                        y : this.padding.top
                    }
                });
                this.stage.addChild( this.nodeSprite );

                this.txtSprite = new Canvax.Display.Sprite({
                    id : "txtSprite",
                    context : {
                        x : this.padding.left,
                        y : this.padding.top
                    }
                });
                this.stage.addChild( this.txtSprite );
                this.stageTip = new Canvax.Display.Sprite({
                    id      : 'tip'
                });
                this.stage.addChild( this.stageTip );
                this._tip    = new Tip(this.tips, this.canvax.getDomContainer());
                this._tip._getDefaultContent = this._getTipDefaultContent;
                this.stageTip.addChild( this._tip.sprite );
            },
            _getTipDefaultContent : function( info ){
                return info.node.node+"："+info.node.value;
            },
            _initData : DataFormat,
            _widget   : function(){
                var me = this;
                _.each(me.layout.nodes , function( node ){
                    var circle = new Circle({
                        id     : node.node,
                        hoverClone : false,
                        context : {
                            x : node.pos.x,
                            y : node.pos.y,
                            r : node.r,
                            fillStyle : node.fillStyle,
                            cursor : "pointer"
                        }
                    });
                    circle.node = node;
                    circle.hover(function(e){
                        this.context.r ++;
                        me.circleOver( this );
                        me._setEventInfo(e , this);
                        me._tip.show( e );
                    } , function(){
                        this.context.r --;
                        me.circleOut( this );
                        me._tip.hide();
                    });
                    circle.on("mousemove" , function(e){
                        me._setEventInfo(e , this);
                        me._tip.move(e)
                    });
                    circle.on("click" , function(e){
                        e.node = this.node;
                        me.fire( "click" , e );
                    });
                    me.nodeSprite.addChild( circle );

                    //label
                    var textOpt = me.graphs.node.text;
                    var label = textOpt.format( node.node ) || node.node;
                    var txt = new Canvax.Display.Text( label ,
                       {
                        context : {
                            x  : node.pos.x,
                            y  : node.pos.y,
                            fillStyle   : textOpt.fillStyle,
                            fontSize    : textOpt.fontSize,
                            textAlign   : "center",
                            textBaseline: "middle"
                       }
                  	});
                    if( txt.getTextWidth() > node.r*2 ){
                        txt.context.x = ( node.direction=="left"? node.pos.x-node.r-3 : node.pos.x+node.r+3);
                        txt.context.textAlign = (node.direction=="left"?"right":"left");
                        txt.context.fillStyle = node.fillStyle;
                    }
                    me.txtSprite.addChild( txt );

                });

                _.each( me.layout.edges , function( edge , key ){
                    if( edge.to ){
                        //线条
                        var line = new Line({
                            id   : key,
                            context : {
                                xStart      : edge.from.pos.x,
                                yStart      : edge.from.pos.y,
                                xEnd        : edge.to.pos.x,
                                yEnd        : edge.to.pos.y,
                                lineWidth   : edge.lineWidth,
                                strokeStyle : edge.from.fillStyle,
                                globalAlpha : 0.6
                            }
                        });
                        me.edgeSprite.addChild( line );
                    }
                } );
            },
            circleOver : function( circle ){
                var me = this;
                _.each( this.nodeSprite.children , function(circle){
                    circle.context.globalAlpha = 0.2;
                } );
                this.nodeSprite.getChildById(circle.node.node).context.globalAlpha = 1;
                _.each( this.edgeSprite.children , function(line){
                    line.context.visible = false;
                } );

                for( var e in me.layout.edges ){
                    if( e.indexOf( circle.node.node ) >= 0 ){
                        this.edgeSprite.getChildById( e ).context.visible = true;
                        var key = e;
                        var targetNode = key.replace( circle.node.node , "" ).replace("_","");
                        this.nodeSprite.getChildById( targetNode ).context.globalAlpha = 1;
                    }
                }
            },
            circleOut  : function( circle ){
                _.each( this.nodeSprite.children , function(circle){
                    circle.context.globalAlpha = 1;
                } );
                for( var e in this.layout.edges ){
                    this.edgeSprite.getChildById( e ).context.visible = true;
                }
            },
            _setEventInfo : function( e , el ){
                e.eventInfo = {
                    el : el,
                    node   : el.node
                }
            }
        })
    }
);
