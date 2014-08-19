KISSY.add('dvix/components/tips/Line', function (a, b, c) {
    var d = function (a) {
        this.xStart = 0, this.yStart = 0, this.xEnd = 0, this.yEnd = 0, this.line = {
            lineType: 'dashed',
            thinkness: 1,
            strokeStyle: '#333333'
        }, this.sprite = null, this.init(a);
    };
    return d.prototype = {
        init: function (a) {
            var c = this;
            c._initConfig(a), c.sprite = new b.Display.Sprite({ id: 'tipLine' });
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
        _initConfig: function (a) {
            var b = this;
            a && (b.line.lineType = '' == a.lineType ? '' : b.line.lineType, b.line.thinkness = a.thinkness || b.line.thinkness, b.line.strokeStyle = a.strokeStyle || b.line.strokeStyle);
        },
        _configData: function (a) {
            var b = this;
            a && (b.xStart = a.xStart || b.xStart, b.yStart = a.yStart || b.yStart, b.xEnd = a.xEnd || b.xEnd, b.yEnd = a.yEnd || b.yEnd);
        },
        _widget: function () {
            var a = this, b = new c({
                    context: {
                        xStart: a.xStart,
                        yStart: a.yStart,
                        xEnd: a.xEnd,
                        yEnd: a.yEnd,
                        lineType: a.line.lineType,
                        lineWidth: a.line.thinkness,
                        strokeStyle: a.line.strokeStyle
                    }
                });
            a.sprite.addChild(b);
        }
    }, d;
}, {
    requires: [
        'canvax/',
        'canvax/shape/Line',
        'dvix/utils/tools'
    ]
});