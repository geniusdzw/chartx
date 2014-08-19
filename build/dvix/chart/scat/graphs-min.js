KISSY.add('dvix/chart/scat/graphs-min', function (a, b, c, d) {
    var e = function (a, b) {
        this.w = 0, this.h = 0, this.pos = {
            x: 0,
            y: 0
        }, this._colors = [
            '#6f8cb2',
            '#c77029',
            '#f15f60',
            '#ecb44f',
            '#ae833a',
            '#896149'
        ], this.r = 10, this.sprite = null, this._circles = [], _.deepExtend(this, a), this.init(b);
    };
    return e.prototype = {
        init: function () {
            this.sprite = new b.Display.Sprite({ id: 'graphsEl' });
        },
        setX: function (a) {
            this.sprite.context.x = a;
        },
        setY: function (a) {
            this.sprite.context.y = a;
        },
        getFillStyle: function (a, b, c) {
            var d = null;
            return _.isArray(this.fillStyle) && (d = this.fillStyle[b]), _.isFunction(this.fillStyle) && (d = this.fillStyle(a, b, c)), d && '' != d || (d = this._colors[b]), d;
        },
        draw: function (a, d) {
            if (_.deepExtend(this, d), 0 != a.length) {
                for (var e = a[0].length, f = 0; e > f; f++) {
                    for (var g = new b.Display.Sprite({ id: 'barGroup' + f }), h = 0, i = a.length; i > h; h++) {
                        var j = a[h][f], k = new c({
                                context: {
                                    x: j.x,
                                    y: j.y,
                                    fillStyle: this.getFillStyle(f, h, j.value),
                                    r: this.r,
                                    globalAlpha: 0
                                }
                            });
                        g.addChild(k), this._circles.push(k);
                    }
                    this.sprite.addChild(g);
                }
                this.setX(this.pos.x), this.setY(this.pos.y);
            }
        },
        grow: function () {
            function a() {
                c = requestAnimationFrame(a), d.update();
            }
            var b = this, c = null, e = function () {
                    new d.Tween({ h: 0 }).to({ h: 100 }, 500).onUpdate(function () {
                        for (var a = 0, c = b._circles.length; c > a; a++)
                            b._circles[a].context.globalAlpha = this.h / 100, b._circles[a].context.r = this.h / 100 * b.r;
                    }).onComplete(function () {
                        cancelAnimationFrame(c);
                    }).start();
                    a();
                };
            e();
        }
    }, e;
}, {
    requires: [
        'canvax/',
        'canvax/shape/Circle',
        'canvax/animation/Tween'
    ]
});