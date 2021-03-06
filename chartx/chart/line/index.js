define(
    "chartx/chart/line/index", [
        'chartx/chart/index',
        'chartx/utils/tools',
        'chartx/utils/datasection',
        './xaxis',
        'chartx/components/yaxis/yAxis',
        'chartx/components/back/Back',
        'chartx/components/anchor/Anchor',
        'chartx/chart/line/graphs',
        './tips',
        'chartx/utils/dataformat'
    ],
    function(Chart, Tools, DataSection, xAxis, yAxis, Back, Anchor, Graphs, Tips, dataFormat) {
        /*
         *@node chart在dom里的目标容器节点。
         */
        var Canvax = Chart.Canvax;

        return Chart.extend({

            init: function(node, data, opts) {
                this._opts = opts;
                this._xAxis = null;
                this._yAxis = null;
                this._anchor = null;
                this._back = null;
                this._graphs = null;
                this._tip = null;

                this.xAxis = {};
                this.yAxis = {};
                this.graphs = {};

                this.biaxial = false;

                //this._preTipsInode =  null; //如果有tips的话，最近的一次tip是在iNode

                _.deepExtend(this, opts);
                this.dataFrame = this._initData(data, this);
            },
            draw: function() {
                this.stageTip = new Canvax.Display.Sprite({
                    id: 'tip'
                });
                this.core = new Canvax.Display.Sprite({
                    id: 'core'
                });
                this.stageBg = new Canvax.Display.Sprite({
                    id: 'bg'
                });

                this.stage.addChild(this.stageBg);
                this.stage.addChild(this.core);
                this.stage.addChild(this.stageTip);

                if (this.rotate) {
                    this._rotate(this.rotate);
                }
                this._initModule(); //初始化模块  

                this._startDraw(); //开始绘图

            },
            /*
             *添加一个yAxis字段，也就是添加一条brokenline折线
             *@params field 添加的字段
             *@params ind 添加到哪个位置 默认在最后面
             **/
            add: function(field, ind) {

                if (_.indexOf(this.yAxis.field, field) >= 0) {
                    return;
                }

                var i = 0;
                _.each(this._graphs.groups, function(g, gi) {
                    i = Math.max(i, g._groupInd);
                });
                if (ind != undefined && ind != null) {
                    i = ind;
                };


                //首先，yAxis要重新计算
                if (ind == undefined) {
                    this.yAxis.field.push(field);
                    ind = this.yAxis.field.length - 1;
                } else {
                    this.yAxis.field.splice(ind, 0, field);
                }
                this.dataFrame = this._initData(this.dataFrame.org, this);

                this._yAxis.update(this.yAxis, this.dataFrame.yAxis);

                //然后yAxis更新后，对应的背景也要更新
                this._back.update({
                    xAxis: {
                        data: this._yAxis.layoutData
                    }
                });

                this._graphs.add({
                    data: this._trimGraphs()
                }, ind);
                //this._graphs.update();


            },
            /*
             *删除一个yaxis字段，也就是删除一条brokenline线
             *@params target 也可以是字段名字，也可以是 index
             **/
            remove: function(target) {
                var ind = null;
                if (_.isNumber(target)) {
                    //说明是索引
                    ind = target;
                } else {
                    //说明是名字，转换为索引
                    ind = _.indexOf(this.yAxis.field, target);
                }
                if (ind != null && ind != undefined && ind != -1) {
                    this._remove(ind);
                }
            },
            _remove: function(ind) {

                //首先，yAxis要重新计算
                //先在dataFrame中更新yAxis的数据
                this.dataFrame.yAxis.field.splice(ind, 1);
                this.dataFrame.yAxis.org.splice(ind, 1);
                //this.yAxis.field.splice(ind , 1);

                this._yAxis.update(this.yAxis, this.dataFrame.yAxis);

                //然后yAxis更新后，对应的背景也要更新
                this._back.update({
                    xAxis: {
                        data: this._yAxis.layoutData
                    }
                });

                //然后就是删除graphs中对应的brokenline，并且把剩下的brokenline缓动到对应的位置
                this._graphs.remove(ind);
                this._graphs.update({
                    data: this._trimGraphs()
                });
            },
            _initData: dataFormat,
            _initModule: function() {

                this._xAxis = new xAxis(this.xAxis, this.dataFrame.xAxis);

                if (this.biaxial) {
                    this.yAxis.biaxial = true;
                }

                this._yAxis = new yAxis(this.yAxis, this.dataFrame.yAxis);
                //再折线图中会有双轴图表
                if (this.biaxial) {
                    this._yAxisR = new yAxis(_.extend(_.clone(this.yAxis), {
                        place: "right"
                    }), this.dataFrame.yAxis);
                }

                this._back = new Back(this.back);
                this._anchor = new Anchor(this.anchor);
                this._graphs = new Graphs(this.graphs, this);
                this._tip = new Tips(this.tips, this.dataFrame, this.canvax.getDomContainer());

                this.stageBg.addChild(this._back.sprite);
                this.stageBg.addChild(this._anchor.sprite);
                this.core.addChild(this._xAxis.sprite);
                this.core.addChild(this._yAxis.sprite);
                if (this._yAxisR) {
                    this.core.addChild(this._yAxisR.sprite);
                }
                this.core.addChild(this._graphs.sprite);
                this.stageTip.addChild(this._tip.sprite);
            },
            _startDraw: function() {
                // this.dataFrame.yAxis.org = [[201,245,288,546,123,1000,445],[500,200,700,200,100,300,400]]
                // this.dataFrame.xAxis.org = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
                var y = this.height - this._xAxis.h;

                //绘制yAxis
                this._yAxis.draw({
                    pos: {
                        x: 0,
                        y: y
                    },
                    yMaxHeight: y
                });

                var _yAxisW = this._yAxis.w;

                //如果有双轴
                var _yAxisRW = 0;
                if (this._yAxisR) {
                    this._yAxisR.draw({
                        pos: {
                            x: 0,
                            y: y
                        },
                        yMaxHeight: y
                    });
                    _yAxisRW = this._yAxisR.w;
                    this._yAxisR.setX(this.width - _yAxisRW);
                }

                //绘制x轴
                this._xAxis.draw({
                    graphh: this.height,
                    graphw: this.width - _yAxisRW,
                    yAxisW: _yAxisW
                });
                if (this._xAxis.yAxisW != _yAxisW) {
                    //说明在xaxis里面的时候被修改过了。那么要同步到yaxis
                    this._yAxis.resetWidth(this._xAxis.yAxisW);
                    _yAxisW = this._xAxis.yAxisW;
                };

                var _graphsH = this._yAxis.yGraphsHeight;
                //Math.abs(this._yAxis.layoutData[ 0 ].y - this._yAxis.layoutData.slice(-1)[0].y);

                //绘制背景网格
                this._back.draw({
                    w: this._xAxis.xGraphsWidth,
                    h: _graphsH,
                    xAxis: {
                        data: this._yAxis.layoutData
                    },
                    yAxis: {
                        data: this._xAxis.layoutData
                    },
                    yOrigin: {
                        biaxial: this.biaxial
                    },
                    pos: {
                        x: _yAxisW,
                        y: y
                    }
                });

                this._graphs.draw({
                    w: this._xAxis.xGraphsWidth,
                    h: this._yAxis.yGraphsHeight,
                    data: this._trimGraphs(),
                    disX: this._getGraphsDisX(),
                    smooth: this.smooth
                });

                this._graphs.setX(_yAxisW), this._graphs.setY(y);

                var me = this;


                //如果是双轴折线，那么graphs之后，还要根据graphs中的两条折线的颜色，来设置左右轴的颜色
                if (this.biaxial) {
                    _.each(this._graphs.groups, function(group, i) {
                        var color = group._bline.context.strokeStyle;
                        if (i == 0) {
                            me._yAxis.setAllStyle(color);
                        } else {
                            me._yAxisR.setAllStyle(color);
                        }
                    });
                }

                //执行生长动画
                this._graphs.grow(function(g) {
                    me._initPlugs( me._opts , g );
                });

                this.bindEvent(this._graphs.sprite);


                if (this._anchor.enabled) {
                    //绘制点位线
                    var pos = this._getPosAtGraphs(this._anchor.xIndex, this._anchor.num)
                    this._anchor.draw({
                        w: this.width - _yAxisW - _yAxisRW,
                        h: _graphsH,
                        cross: {
                            x: pos.x,
                            y: _graphsH + pos.y
                        },
                        pos: {
                            x: _yAxisW,
                            y: y - _graphsH
                        }
                    });
                    //, this._anchor.setY(y)
                }
            },
            _initPlugs : function( opts , g){
                if ("markLine" in opts) {
                    this._initMarkLine(g);
                }
                if ("markPoint" in opts) {
                    this._initMarkPoint(g);
                }
            },
            _initMarkPoint: function(g) {
                var me = this;
                require(["chartx/components/markpoint/index"], function(MarkPoint) {
                    var lastNode = g._circles.children[g._circles.children.length - 1];
                    var mpCtx = {
                        markTarget: g.field,
                        point: lastNode.localToGlobal(),
                        r: lastNode.context.r + 1,
                        globalAlpha: 0.8,
                        realTime: true
                    };
                    new MarkPoint(me._opts, mpCtx).done(function() {
                        //this.shape.context.visible = false;
                        me.core.addChild(this.sprite);
                    });
                });
            },
            _initMarkLine: function(g) {
                var me = this
                var pointList = _.clone(g._pointList)
                var max = 0
                var center
                _.each(pointList, function(data, i) {
                    max += data[1]
                })
                center = parseInt(max / pointList.length)

                require(['chartx/components/markline/index'], function(MarkLine) {
                    new MarkLine(_.extend({
                        origin: {
                            x: me._back.pos.x,
                            y: me._back.pos.y
                        },
                        line: {
                            y: center,
                            list: [
                                [0, 0],
                                [me._xAxis.xGraphsWidth, 0]
                            ],
                            strokeStyle: g.line.strokeStyle,
                            lineType: 'dashed'
                        },
                        field : g.field
                    } , me._opts.markLine)).done(function() {
                        me.core.addChild(this.sprite)
                    })
                })
            },
            bindEvent: function(spt, _setXaxisYaxisToTipsInfo) {
                var self = this;
                _setXaxisYaxisToTipsInfo || (_setXaxisYaxisToTipsInfo = self._setXaxisYaxisToTipsInfo);
                spt.on("panstart mouseover", function(e) {
                    if (self._tip.enabled && e.eventInfo.nodesInfoList.length > 0) {
                        _setXaxisYaxisToTipsInfo.apply(self, [e]);
                        self._tip.show(e);
                    }
                });
                spt.on("panmove mousemove", function(e) {
                    if (self._tip.enabled) {
                        if (e.eventInfo.nodesInfoList.length > 0) {
                            _setXaxisYaxisToTipsInfo.apply(self, [e]);
                            if (self._tip._isShow) {
                                self._tip.move(e);
                            } else {
                                self._tip.show(e);
                            }
                        } else {
                            if (self._tip._isShow) {
                                self._tip.hide(e);
                            }
                        }
                    }
                });
                spt.on("panend mouseout", function(e) {
                    if (self._tip.enabled) {
                        self._tip.hide(e);
                    }
                });
                spt.on("click", function(e) {
                    _setXaxisYaxisToTipsInfo.apply(self, [e]);
                    self.fire("click", e.eventInfo);
                });
            },
            //把这个点位置对应的x轴数据和y轴数据存到tips的info里面
            //方便外部自定义tip是的content
            _setXaxisYaxisToTipsInfo: function(e) {
                e.eventInfo.xAxis = {
                    field: this.dataFrame.xAxis.field,
                    value: this.dataFrame.xAxis.org[0][e.eventInfo.iNode]
                }
                var me = this;
                _.each(e.eventInfo.nodesInfoList, function(node, i) {
                    node.field = me.dataFrame.yAxis.field[node._groupInd];
                });
            },
            _trimGraphs: function(_yAxis, dataFrame) {
                _yAxis || (_yAxis = this._yAxis);
                dataFrame || (dataFrame = this.dataFrame);

                var maxYAxis = _yAxis.dataSection[_yAxis.dataSection.length - 1];
                var arr = dataFrame.yAxis.org;
                var tmpData = [];
                for (var a = 0, al = arr.length; a < al; a++) {
                    if (this.biaxial && a > 0) {
                        _yAxis = this._yAxisR;
                        maxYAxis = _yAxis.dataSection[_yAxis.dataSection.length - 1];
                    }
                    for (var b = 0, bl = arr[a].length; b < bl; b++) {
                        !tmpData[a] ? tmpData[a] = [] : '';
                        if (b >= this._xAxis.data.length) {
                            break;
                        }
                        var x = this._xAxis.data[b].x;
                        var y = -(arr[a][b] - _yAxis._bottomNumber) / (maxYAxis - _yAxis._bottomNumber) * _yAxis.yGraphsHeight
                        y = isNaN(y) ? 0 : y
                        tmpData[a][b] = {
                            value: arr[a][b],
                            x: x,
                            y: y
                        };
                    }
                }
                return tmpData
            },
            //根据x轴分段索引和具体值,计算出处于Graphs中的坐标
            _getPosAtGraphs: function(index, num) {
                var x = this._xAxis.data[index].x;
                var y = this._graphs.data[0][index].y
                return {
                    x: x,
                    y: y
                }
            },
            //每两个点之间的距离
            _getGraphsDisX: function() {
                var dsl = this._xAxis.dataSection.length;
                var n = this._xAxis.xGraphsWidth / (dsl - 1);
                if (dsl == 1) {
                    n = 0
                }
                return n
            }
        });
    }
);
