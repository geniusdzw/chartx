KISSY.add('dvix/components/line/Group', function (a, b, c, d, e) {
    var f = function (a) {
        this.w = 0, this.h = 0, this.y = 0, this.line = { strokeStyle: '#FF0000' }, this.fill = {
            strokeStyle: '#FF0000',
            alpha: 1
        }, this.data = [], this.sprite = null, this.init(a);
    };
    return f.prototype = {
        init: function (a) {
            var c = this;
            c._initConfig(a), c.sprite = new b.Display.Sprite();
        },
        setX: function (a) {
            this.sprite.context.x = a;
        },
        setY: function (a) {
            this.sprite.context.y = a;
        },
        draw: function (a) {
            var b = this;
            b._configData(a), b._widget();
        },
        getNodeInfoAt: function (b) {
            var c = this, d = a.clone(c.data[b]);
            return d ? (d.fillStyle = c.line.strokeStyle, d.alpha = c.fill.alpha, d) : null;
        },
        _initConfig: function (a) {
            var b = this;
            if (a) {
                var c = a.line;
                c && (b.line.strokeStyle = c.strokeStyle || b.line.strokeStyle);
                var d = a.fill;
                d && (b.fill.strokeStyle = d.strokeStyle || b.fill.strokeStyle, b.fill.alpha = d.alpha || 0 == d.alpha ? d.alpha : b.fill.alpha);
            }
        },
        _configData: function (a) {
            var b = this, a = a || {};
            b.w = a.w || 0, b.h = a.h || 0, b.y = a.y || 0, b.data = a.data || [];
        },
        _widget: function () {
            for (var a = this, b = [], e = 0, f = a.data.length; f > e; e++) {
                var g = a.data[e];
                b.push([
                    g.x,
                    g.y
                ]);
            }
            var h = new c({
                    context: {
                        pointList: b,
                        strokeStyle: a.line.strokeStyle,
                        lineWidth: 2,
                        y: a.y,
                        smooth: !0
                    }
                });
            a.sprite.addChild(h), a.sprite.addChild(new d({
                context: {
                    path: a._fillLine(h),
                    fillStyle: a.fill.strokeStyle,
                    globalAlpha: a.fill.alpha
                }
            }));
        },
        _fillLine: function (a) {
            var b = _.clone(a.getPointList());
            return b.push([
                b[a.pointsLen - 1][0],
                -1.5
            ], [
                b[0][0],
                -1.5
            ], [
                b[0][0],
                b[0][1]
            ]), e.getPath(b);
        }
    }, f;
}, {
    requires: [
        'canvax/',
        'canvax/shape/BrokenLine',
        'canvax/shape/Path',
        'dvix/utils/tools'
    ]
});