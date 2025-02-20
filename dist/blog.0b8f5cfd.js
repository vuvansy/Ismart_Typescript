/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */ /*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=b4196a9fd93da52ecb59ab811db4b200)
 * Config saved to config.json and https://gist.github.com/b4196a9fd93da52ecb59ab811db4b200
 */ if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
(function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3");
})(jQuery), function(t) {
    "use strict";
    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent();
    }
    function i(i) {
        i && 3 === i.which || (t(s).remove(), t(n).each(function() {
            var o = t(this), s = e(o), n = {
                relatedTarget: this
            };
            s.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(s[0], i.target) || (s.trigger(i = t.Event("hide.bs.dropdown", n)), i.isDefaultPrevented() || (o.attr("aria-expanded", "false"), s.removeClass("open").trigger(t.Event("hidden.bs.dropdown", n)))));
        }));
    }
    function o(e) {
        return this.each(function() {
            var i = t(this), o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new a(this)), "string" == typeof e && o[e].call(i);
        });
    }
    var s = ".dropdown-backdrop", n = '[data-toggle="dropdown"]', a = function(e) {
        t(e).on("click.bs.dropdown", this.toggle);
    };
    a.VERSION = "3.3.6", a.prototype.toggle = function(o) {
        var s = t(this);
        if (!s.is(".disabled, :disabled")) {
            var n = e(s), a = n.hasClass("open");
            if (i(), !a) {
                "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var r = {
                    relatedTarget: this
                };
                if (n.trigger(o = t.Event("show.bs.dropdown", r)), o.isDefaultPrevented()) return;
                s.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger(t.Event("shown.bs.dropdown", r));
            }
            return !1;
        }
    }, a.prototype.keydown = function(i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var o = t(this);
            if (i.preventDefault(), i.stopPropagation(), !o.is(".disabled, :disabled")) {
                var s = e(o), a = s.hasClass("open");
                if (!a && 27 != i.which || a && 27 == i.which) return 27 == i.which && s.find(n).trigger("focus"), o.trigger("click");
                var r = " li:not(.disabled):visible a", l = s.find(".dropdown-menu" + r);
                if (l.length) {
                    var h = l.index(i.target);
                    38 == i.which && h > 0 && h--, 40 == i.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus");
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = o, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r, this;
    }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation();
    }).on("click.bs.dropdown.data-api", n, a.prototype.toggle).on("keydown.bs.dropdown.data-api", n, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown);
}(jQuery), function(t) {
    "use strict";
    function e(e, o) {
        return this.each(function() {
            var s = t(this), n = s.data("bs.modal"), a = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
            n || s.data("bs.modal", n = new i(this, a)), "string" == typeof e ? n[e](o) : a.show && n.show(o);
        });
    }
    var i = function(e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t);
    }, i.prototype.show = function(e) {
        var o = this, s = t.Event("show.bs.modal", {
            relatedTarget: e
        });
        this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            o.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var s = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.adjustDialog(), s && o.$element[0].offsetWidth, o.$element.addClass("in"), o.enforceFocus();
            var n = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            s ? o.$dialog.one("bsTransitionEnd", function() {
                o.$element.trigger("focus").trigger(n);
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(n);
        }));
    }, i.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal());
    }, i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus");
        }, this));
    }, i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal");
    }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal");
        });
    }, i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, i.prototype.backdrop = function(e) {
        var o = this, s = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var n = t.support.transition && s;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + s).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            n ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                o.removeBackdrop(), e && e();
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a();
        } else e && e();
    }, i.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        });
    }, i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar();
    }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth);
    }, i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e;
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = o, this;
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var o = t(this), s = o.attr("href"), n = t(o.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")), a = n.data("bs.modal") ? "toggle" : t.extend({
            remote: !/#/.test(s) && s
        }, n.data(), o.data());
        o.is("a") && i.preventDefault(), n.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                o.is(":visible") && o.trigger("focus");
            });
        }), e.call(n, a, this);
    });
}(jQuery), function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), s = o.data("bs.tooltip"), n = "object" == typeof e && e;
            (s || !/destroy|hide/.test(e)) && (s || o.data("bs.tooltip", s = new i(this, n)), "string" == typeof e && s[e]());
        });
    }
    var i = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e);
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, i.prototype.init = function(e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for(var s = this.options.trigger.split(" "), n = s.length; n--;){
            var a = s[n];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" : "focusin", l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS;
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e;
    }, i.prototype.getDelegateOptions = function() {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o);
        }), e;
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void (i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void (i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show();
        }, i.options.delay.show)) : i.show());
    }, i.prototype.isInStateTrue = function() {
        for(var t in this.inState)if (this.inState[t]) return !0;
        return !1;
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void (i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide();
        }, i.options.delay.hide)) : i.hide());
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o) return;
            var s = this, n = this.tip(), a = this.getUID(this.type);
            this.setContent(), n.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && n.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement, l = /\s?auto?\s?/i, h = l.test(r);
            h && (r = r.replace(l, "") || "top"), n.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition(), p = n[0].offsetWidth, c = n[0].offsetHeight;
            if (h) {
                var f = r, u = this.getPosition(this.$viewport);
                r = "bottom" == r && d.bottom + c > u.bottom ? "top" : "top" == r && d.top - c < u.top ? "bottom" : "right" == r && d.right + p > u.width ? "left" : "left" == r && d.left - p < u.left ? "right" : r, n.removeClass(f).addClass(r);
            }
            var g = this.getCalculatedOffset(r, d, p, c);
            this.applyPlacement(g, r);
            var m = function() {
                var t = s.hoverState;
                s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == t && s.leave(s);
            };
            t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", m).emulateTransitionEnd(i.TRANSITION_DURATION) : m();
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var o = this.tip(), s = o[0].offsetWidth, n = o[0].offsetHeight, a = parseInt(o.css("margin-top"), 10), r = parseInt(o.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(r) && (r = 0), e.top += a, e.left += r, t.offset.setOffset(o[0], t.extend({
            using: function(t) {
                o.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                });
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth, h = o[0].offsetHeight;
        "top" == i && h != n && (e.top = e.top + n - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i), c = p ? 2 * d.left - s + l : 2 * d.top - n + h, f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(c, o[0][f], p);
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "");
    }, i.prototype.setContent = function() {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right");
    }, i.prototype.hide = function(e) {
        function o() {
            "in" != s.hoverState && n.detach(), s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type), e && e();
        }
        var s = this, n = t(this.$tip), a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), this.hoverState = null, this);
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "");
    }, i.prototype.hasContent = function() {
        return this.getTitle();
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0], o = "BODY" == i.tagName, s = i.getBoundingClientRect();
        null == s.width && (s = t.extend({}, s, {
            width: s.right - s.left,
            height: s.bottom - s.top
        }));
        var n = o ? {
            top: 0,
            left: 0
        } : e.offset(), a = {
            scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
        }, r = o ? {
            width: t(window).width(),
            height: t(window).height()
        } : null;
        return t.extend({}, s, a, r, n);
    }, i.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        };
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var s = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return s;
        var n = this.options.viewport && this.options.viewport.padding || 0, a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - n - a.scroll, l = e.top + n - a.scroll + o;
            r < a.top ? s.top = a.top - r : l > a.top + a.height && (s.top = a.top + a.height - l);
        } else {
            var h = e.left - n, d = e.left + n + i;
            h < a.left ? s.left = a.left - h : d > a.right && (s.left = a.left + a.width - d);
        }
        return s;
    }, i.prototype.getTitle = function() {
        var t, e = this.$element, i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title);
    }, i.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random());
        while (document.getElementById(t));
        return t;
    }, i.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, i.prototype.enable = function() {
        this.enabled = !0;
    }, i.prototype.disable = function() {
        this.enabled = !1;
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i);
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null;
        });
    };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = o, this;
    };
}(jQuery), function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), s = o.data("bs.tab");
            s || o.data("bs.tab", s = new i(this)), "string" == typeof e && s[e]();
        });
    }
    var i = function(e) {
        this.element = t(e);
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var s = i.find(".active:last a"), n = t.Event("hide.bs.tab", {
                relatedTarget: e[0]
            }), a = t.Event("show.bs.tab", {
                relatedTarget: s[0]
            });
            if (s.trigger(n), e.trigger(a), !a.isDefaultPrevented() && !n.isDefaultPrevented()) {
                var r = t(o);
                this.activate(e.closest("li"), i), this.activate(r, r.parent(), function() {
                    s.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: s[0]
                    });
                });
            }
        }
    }, i.prototype.activate = function(e, o, s) {
        function n() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), s && s();
        }
        var a = o.find("> .active"), r = s && t.support.transition && (a.length && a.hasClass("fade") || !!o.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), a.removeClass("in");
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = o, this;
    };
    var s = function(i) {
        i.preventDefault(), e.call(t(this), "show");
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', s).on("click.bs.tab.data-api", '[data-toggle="pill"]', s);
}(jQuery), function(t) {
    "use strict";
    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o);
    }
    function i(e) {
        return this.each(function() {
            var i = t(this), s = i.data("bs.collapse"), n = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !s && n.toggle && /show|hide/.test(e) && (n.toggle = !1), s || i.data("bs.collapse", s = new o(this, n)), "string" == typeof e && s[e]();
        });
    }
    var o = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
    };
    o.VERSION = "3.3.6", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
        toggle: !0
    }, o.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height";
    }, o.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, s = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(s && s.length && (e = s.data("bs.collapse"), e && e.transitioning))) {
                var n = t.Event("show.bs.collapse");
                if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                    s && s.length && (i.call(s, "hide"), e || s.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var r = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
                    };
                    if (!t.support.transition) return r.call(this);
                    var l = t.camelCase([
                        "scroll",
                        a
                    ].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l]);
                }
            }
        }
    }, o.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var s = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : s.call(this);
            }
        }
    }, o.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, o.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
            var s = t(o);
            this.addAriaAndCollapsedClass(e(s), s);
        }, this)).end();
    }, o.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i);
    };
    var s = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = s, this;
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
        var s = t(this);
        s.attr("data-target") || o.preventDefault();
        var n = e(s), a = n.data("bs.collapse"), r = a ? "toggle" : s.data();
        i.call(n, r);
    });
}(jQuery), function(t) {
    "use strict";
    function e(i, o) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process();
    }
    function i(i) {
        return this.each(function() {
            var o = t(this), s = o.data("bs.scrollspy"), n = "object" == typeof i && i;
            s || o.data("bs.scrollspy", s = new e(this, n)), "string" == typeof i && s[i]();
        });
    }
    e.VERSION = "3.3.6", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, e.prototype.refresh = function() {
        var e = this, i = "offset", o = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this), s = e.data("target") || e.attr("href"), n = /^#./.test(s) && t(s);
            return n && n.length && n.is(":visible") && [
                [
                    n[i]().top + o,
                    s
                ]
            ] || null;
        }).sort(function(t, e) {
            return t[0] - e[0];
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1]);
        });
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), s = this.offsets, n = this.targets, a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o) return a != (t = n[n.length - 1]) && this.activate(t);
        if (a && e < s[0]) return this.activeTarget = null, this.clear();
        for(t = s.length; t--;)a != n[t] && e >= s[t] && (void 0 === s[t + 1] || e < s[t + 1]) && this.activate(n[t]);
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy");
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = o, this;
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data());
        });
    });
}(jQuery), function(t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for(var i in e)if (void 0 !== t.style[i]) return {
            end: e[i]
        };
        return !1;
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1, o = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0;
        });
        var s = function() {
            i || t(o).trigger(t.support.transition.end);
        };
        return setTimeout(s, e), this;
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery);

//# sourceMappingURL=blog.0b8f5cfd.js.map
