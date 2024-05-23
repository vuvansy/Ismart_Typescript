/*
 *	jQuery elevateZoom 3.0.8
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *
 
 /*
 *	jQuery elevateZoom 3.0.3
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */ if (typeof Object.create !== "function") Object.create = function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
};
(function($, window1, document1, undefined) {
    var ElevateZoom = {
        init: function(options, elem) {
            var self1 = this;
            self1.elem = elem;
            self1.$elem = $(elem);
            self1.imageSrc = self1.$elem.data("zoom-image") ? self1.$elem.data("zoom-image") : self1.$elem.attr("src");
            self1.options = $.extend({}, $.fn.elevateZoom.options, options);
            //TINT OVERRIDE SETTINGS
            if (self1.options.tint) self1.options.lensColour = "none", self1.options.lensOpacity = "1" //opacity of the lens
            ;
            //INNER OVERRIDE SETTINGS
            if (self1.options.zoomType == "inner") self1.options.showLens = false;
            //Remove alt on hover
            self1.$elem.parent().removeAttr("title").removeAttr("alt");
            self1.zoomImage = self1.imageSrc;
            self1.refresh(1);
            //Create the image swap from the gallery 
            $("#" + self1.options.gallery + " a").click(function(e) {
                //Set a class on the currently active gallery image
                if (self1.options.galleryActiveClass) {
                    $("#" + self1.options.gallery + " a").removeClass(self1.options.galleryActiveClass);
                    $(this).addClass(self1.options.galleryActiveClass);
                }
                //stop any link on the a tag from working
                e.preventDefault();
                //call the swap image function            
                if ($(this).data("zoom-image")) self1.zoomImagePre = $(this).data("zoom-image");
                else self1.zoomImagePre = $(this).data("image");
                self1.swaptheimage($(this).data("image"), self1.zoomImagePre);
                return false;
            });
        },
        refresh: function(length) {
            var self1 = this;
            setTimeout(function() {
                self1.fetch(self1.imageSrc);
            }, length || self1.options.refresh);
        },
        fetch: function(imgsrc) {
            //get the image
            var self1 = this;
            var newImg = new Image();
            newImg.onload = function() {
                //set the large image dimensions - used to calculte ratio's
                self1.largeWidth = newImg.width;
                self1.largeHeight = newImg.height;
                //once image is loaded start the calls
                self1.startZoom();
                self1.currentImage = self1.imageSrc;
                //let caller know image has been loaded
                self1.options.onZoomedImageLoaded(self1.$elem);
            };
            newImg.src = imgsrc; // this must be done AFTER setting onload
            return;
        },
        startZoom: function() {
            var self1 = this;
            //get dimensions of the non zoomed image
            self1.nzWidth = self1.$elem.width();
            self1.nzHeight = self1.$elem.height();
            //activated elements
            self1.isWindowActive = false;
            self1.isLensActive = false;
            self1.isTintActive = false;
            self1.overWindow = false;
            //CrossFade Wrappe
            if (self1.options.imageCrossfade) {
                self1.zoomWrap = self1.$elem.wrap('<div style="height:' + self1.nzHeight + "px;width:" + self1.nzWidth + 'px;" class="zoomWrapper" />');
                self1.$elem.css("position", "absolute");
            }
            self1.zoomLock = 1;
            self1.scrollingLock = false;
            self1.changeBgSize = false;
            self1.currentZoomLevel = self1.options.zoomLevel;
            //get offset of the non zoomed image
            self1.nzOffset = self1.$elem.offset();
            //calculate the width ratio of the large/small image
            self1.widthRatio = self1.largeWidth / self1.currentZoomLevel / self1.nzWidth;
            self1.heightRatio = self1.largeHeight / self1.currentZoomLevel / self1.nzHeight;
            //if window zoom        
            if (self1.options.zoomType == "window") self1.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(self1.options.zoomWindowBgColour) + ";width: " + String(self1.options.zoomWindowWidth) + "px;" + "height: " + String(self1.options.zoomWindowHeight) + "px;float: left;" + "background-size: " + self1.largeWidth / self1.currentZoomLevel + "px " + self1.largeHeight / self1.currentZoomLevel + "px;" + "display: none;z-index:100;" + "border: " + String(self1.options.borderSize) + "px solid " + self1.options.borderColour + ";background-repeat: no-repeat;" + "position: absolute;";
            //if inner  zoom    
            if (self1.options.zoomType == "inner") {
                //has a border been put on the image? Lets cater for this
                var borderWidth = self1.$elem.css("border-left-width");
                self1.zoomWindowStyle = "overflow: hidden;margin-left: " + String(borderWidth) + ";" + "margin-top: " + String(borderWidth) + ";" + "background-position: 0px 0px;" + "width: " + String(self1.nzWidth) + "px;" + "height: " + String(self1.nzHeight) + "px;" + "px;float: left;" + "display: none;" + "cursor:" + self1.options.cursor + ";" + "px solid " + self1.options.borderColour + ";background-repeat: no-repeat;" + "position: absolute;";
            }
            //lens style for window zoom
            if (self1.options.zoomType == "window") {
                // adjust images less than the window height
                if (self1.nzHeight < self1.options.zoomWindowWidth / self1.widthRatio) lensHeight = self1.nzHeight;
                else lensHeight = String(self1.options.zoomWindowHeight / self1.heightRatio);
                if (self1.largeWidth < self1.options.zoomWindowWidth) lensWidth = self1.nzWidth;
                else lensWidth = self1.options.zoomWindowWidth / self1.widthRatio;
                self1.lensStyle = "background-position: 0px 0px;width: " + String(self1.options.zoomWindowWidth / self1.widthRatio) + "px;height: " + String(self1.options.zoomWindowHeight / self1.heightRatio) + "px;float: right;display: none;" + "overflow: hidden;" + "z-index: 999;" + "-webkit-transform: translateZ(0);" + "opacity:" + self1.options.lensOpacity + ";filter: alpha(opacity = " + self1.options.lensOpacity * 100 + "); zoom:1;" + "width:" + lensWidth + "px;" + "height:" + lensHeight + "px;" + "background-color:" + self1.options.lensColour + ";" + "cursor:" + self1.options.cursor + ";" + "border: " + self1.options.lensBorderSize + "px" + " solid " + self1.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;";
            }
            //tint style
            self1.tintStyle = "display: block;position: absolute;background-color: " + self1.options.tintColour + ";" + "filter:alpha(opacity=0);" + "opacity: 0;" + "width: " + self1.nzWidth + "px;" + "height: " + self1.nzHeight + "px;";
            //lens style for lens zoom with optional round for modern browsers
            self1.lensRound = "";
            if (self1.options.zoomType == "lens") self1.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(self1.options.borderSize) + "px solid " + self1.options.borderColour + ";" + "width:" + String(self1.options.lensSize) + "px;" + "height:" + String(self1.options.lensSize) + "px;" + "background-repeat: no-repeat;position: absolute;";
            //does not round in all browsers
            if (self1.options.lensShape == "round") self1.lensRound = "border-top-left-radius: " + String(self1.options.lensSize / 2 + self1.options.borderSize) + "px;" + "border-top-right-radius: " + String(self1.options.lensSize / 2 + self1.options.borderSize) + "px;" + "border-bottom-left-radius: " + String(self1.options.lensSize / 2 + self1.options.borderSize) + "px;" + "border-bottom-right-radius: " + String(self1.options.lensSize / 2 + self1.options.borderSize) + "px;";
            //create the div's                                                + ""
            //self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});
            self1.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + self1.nzOffset.left + "px;top:" + self1.nzOffset.top + "px;height:" + self1.nzHeight + "px;width:" + self1.nzWidth + 'px;"></div>');
            $("body").append(self1.zoomContainer);
            //this will add overflow hidden and contrain the lens on lens mode       
            if (self1.options.containLensZoom && self1.options.zoomType == "lens") self1.zoomContainer.css("overflow", "hidden");
            if (self1.options.zoomType != "inner") {
                self1.zoomLens = $("<div class='zoomLens' style='" + self1.lensStyle + self1.lensRound + "'>&nbsp;</div>").appendTo(self1.zoomContainer).click(function() {
                    self1.$elem.trigger("click");
                });
                if (self1.options.tint) {
                    self1.tintContainer = $("<div/>").addClass("tintContainer");
                    self1.zoomTint = $("<div class='zoomTint' style='" + self1.tintStyle + "'></div>");
                    self1.zoomLens.wrap(self1.tintContainer);
                    self1.zoomTintcss = self1.zoomLens.after(self1.zoomTint);
                    //if tint enabled - set an image to show over the tint
                    self1.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + self1.nzWidth + "px; height: " + self1.nzHeight + 'px;" src="' + self1.imageSrc + '">').appendTo(self1.zoomLens).click(function() {
                        self1.$elem.trigger("click");
                    });
                }
            }
            //create zoom window 
            if (isNaN(self1.options.zoomWindowPosition)) self1.zoomWindow = $("<div style='z-index:999;left:" + self1.windowOffsetLeft + "px;top:" + self1.windowOffsetTop + "px;" + self1.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function() {
                self1.$elem.trigger("click");
            });
            else self1.zoomWindow = $("<div style='z-index:999;left:" + self1.windowOffsetLeft + "px;top:" + self1.windowOffsetTop + "px;" + self1.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(self1.zoomContainer).click(function() {
                self1.$elem.trigger("click");
            });
            self1.zoomWindowContainer = $("<div/>").addClass("zoomWindowContainer").css("width", self1.options.zoomWindowWidth);
            self1.zoomWindow.wrap(self1.zoomWindowContainer);
            //  self.captionStyle = "text-align: left;background-color: black;color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";                                                                                                                                                                                                                                          
            // self.zoomCaption = $('<div class="elevatezoom-caption" style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());
            if (self1.options.zoomType == "lens") self1.zoomLens.css({
                backgroundImage: "url('" + self1.imageSrc + "')"
            });
            if (self1.options.zoomType == "window") self1.zoomWindow.css({
                backgroundImage: "url('" + self1.imageSrc + "')"
            });
            if (self1.options.zoomType == "inner") self1.zoomWindow.css({
                backgroundImage: "url('" + self1.imageSrc + "')"
            });
            /*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/ //touch events
            self1.$elem.bind("touchmove", function(e) {
                e.preventDefault();
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                self1.setPosition(touch);
            });
            self1.zoomContainer.bind("touchmove", function(e) {
                if (self1.options.zoomType == "inner") self1.showHideWindow("show");
                e.preventDefault();
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                self1.setPosition(touch);
            });
            self1.zoomContainer.bind("touchend", function(e) {
                self1.showHideWindow("hide");
                if (self1.options.showLens) self1.showHideLens("hide");
                if (self1.options.tint && self1.options.zoomType != "inner") self1.showHideTint("hide");
            });
            self1.$elem.bind("touchend", function(e) {
                self1.showHideWindow("hide");
                if (self1.options.showLens) self1.showHideLens("hide");
                if (self1.options.tint && self1.options.zoomType != "inner") self1.showHideTint("hide");
            });
            if (self1.options.showLens) {
                self1.zoomLens.bind("touchmove", function(e) {
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self1.setPosition(touch);
                });
                self1.zoomLens.bind("touchend", function(e) {
                    self1.showHideWindow("hide");
                    if (self1.options.showLens) self1.showHideLens("hide");
                    if (self1.options.tint && self1.options.zoomType != "inner") self1.showHideTint("hide");
                });
            }
            //Needed to work in IE
            self1.$elem.bind("mousemove", function(e) {
                if (self1.overWindow == false) self1.setElements("show");
                //make sure on orientation change the setposition is not fired
                if (self1.lastX !== e.clientX || self1.lastY !== e.clientY) {
                    self1.setPosition(e);
                    self1.currentLoc = e;
                }
                self1.lastX = e.clientX;
                self1.lastY = e.clientY;
            });
            self1.zoomContainer.bind("mousemove", function(e) {
                if (self1.overWindow == false) self1.setElements("show");
                //make sure on orientation change the setposition is not fired 
                if (self1.lastX !== e.clientX || self1.lastY !== e.clientY) {
                    self1.setPosition(e);
                    self1.currentLoc = e;
                }
                self1.lastX = e.clientX;
                self1.lastY = e.clientY;
            });
            if (self1.options.zoomType != "inner") self1.zoomLens.bind("mousemove", function(e) {
                //make sure on orientation change the setposition is not fired
                if (self1.lastX !== e.clientX || self1.lastY !== e.clientY) {
                    self1.setPosition(e);
                    self1.currentLoc = e;
                }
                self1.lastX = e.clientX;
                self1.lastY = e.clientY;
            });
            if (self1.options.tint && self1.options.zoomType != "inner") self1.zoomTint.bind("mousemove", function(e) {
                //make sure on orientation change the setposition is not fired
                if (self1.lastX !== e.clientX || self1.lastY !== e.clientY) {
                    self1.setPosition(e);
                    self1.currentLoc = e;
                }
                self1.lastX = e.clientX;
                self1.lastY = e.clientY;
            });
            if (self1.options.zoomType == "inner") self1.zoomWindow.bind("mousemove", function(e) {
                //self.overWindow = true;
                //make sure on orientation change the setposition is not fired
                if (self1.lastX !== e.clientX || self1.lastY !== e.clientY) {
                    self1.setPosition(e);
                    self1.currentLoc = e;
                }
                self1.lastX = e.clientX;
                self1.lastY = e.clientY;
            });
            //  lensFadeOut: 500,  zoomTintFadeIn
            self1.zoomContainer.add(self1.$elem).mouseenter(function() {
                if (self1.overWindow == false) self1.setElements("show");
            }).mouseleave(function() {
                if (!self1.scrollLock) {
                    self1.setElements("hide");
                    self1.options.onDestroy(self1.$elem);
                }
            });
            //end ove image
            if (self1.options.zoomType != "inner") self1.zoomWindow.mouseenter(function() {
                self1.overWindow = true;
                self1.setElements("hide");
            }).mouseleave(function() {
                self1.overWindow = false;
            });
            //end ove image
            //				var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);
            //      $(this).empty();    
            //    return false;
            //fix for initial zoom setting
            self1.options.zoomLevel;
            //set the min zoomlevel
            if (self1.options.minZoomLevel) self1.minZoomLevel = self1.options.minZoomLevel;
            else self1.minZoomLevel = self1.options.scrollZoomIncrement * 2;
            if (self1.options.scrollZoom) self1.zoomContainer.add(self1.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(e) {
                //						in IE there is issue with firing of mouseleave - So check whether still scrolling
                //						and on mouseleave check if scrolllock          
                self1.scrollLock = true;
                clearTimeout($.data(this, "timer"));
                $.data(this, "timer", setTimeout(function() {
                    self1.scrollLock = false;
                //do something
                }, 250));
                var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                //this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                //   e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                if (theEvent / 120 > 0) //scrolling up
                {
                    if (self1.currentZoomLevel >= self1.minZoomLevel) self1.changeZoomLevel(self1.currentZoomLevel - self1.options.scrollZoomIncrement);
                } else {
                    //scrolling down
                    if (self1.options.maxZoomLevel) {
                        if (self1.currentZoomLevel <= self1.options.maxZoomLevel) self1.changeZoomLevel(parseFloat(self1.currentZoomLevel) + self1.options.scrollZoomIncrement);
                    } else //andy 
                    self1.changeZoomLevel(parseFloat(self1.currentZoomLevel) + self1.options.scrollZoomIncrement);
                }
                return false;
            });
        },
        setElements: function(type) {
            var self1 = this;
            if (!self1.options.zoomEnabled) return false;
            if (type == "show") {
                if (self1.isWindowSet) {
                    if (self1.options.zoomType == "inner") self1.showHideWindow("show");
                    if (self1.options.zoomType == "window") self1.showHideWindow("show");
                    if (self1.options.showLens) self1.showHideLens("show");
                    if (self1.options.tint && self1.options.zoomType != "inner") self1.showHideTint("show");
                }
            }
            if (type == "hide") {
                if (self1.options.zoomType == "window") self1.showHideWindow("hide");
                if (!self1.options.tint) self1.showHideWindow("hide");
                if (self1.options.showLens) self1.showHideLens("hide");
                if (self1.options.tint) self1.showHideTint("hide");
            }
        },
        setPosition: function(e) {
            var self1 = this;
            if (!self1.options.zoomEnabled) return false;
            //recaclc offset each time in case the image moves
            //this can be caused by other on page elements
            self1.nzHeight = self1.$elem.height();
            self1.nzWidth = self1.$elem.width();
            self1.nzOffset = self1.$elem.offset();
            if (self1.options.tint && self1.options.zoomType != "inner") {
                self1.zoomTint.css({
                    top: 0
                });
                self1.zoomTint.css({
                    left: 0
                });
            }
            //set responsive       
            //will checking if the image needs changing before running this code work faster?
            if (self1.options.responsive && !self1.options.scrollZoom) {
                if (self1.options.showLens) {
                    if (self1.nzHeight < self1.options.zoomWindowWidth / self1.widthRatio) lensHeight = self1.nzHeight;
                    else lensHeight = String(self1.options.zoomWindowHeight / self1.heightRatio);
                    if (self1.largeWidth < self1.options.zoomWindowWidth) lensWidth = self1.nzWidth;
                    else lensWidth = self1.options.zoomWindowWidth / self1.widthRatio;
                    self1.widthRatio = self1.largeWidth / self1.nzWidth;
                    self1.heightRatio = self1.largeHeight / self1.nzHeight;
                    if (self1.options.zoomType != "lens") {
                        //possibly dont need to keep recalcalculating
                        //if the lens is heigher than the image, then set lens size to image size
                        if (self1.nzHeight < self1.options.zoomWindowWidth / self1.widthRatio) lensHeight = self1.nzHeight;
                        else lensHeight = String(self1.options.zoomWindowHeight / self1.heightRatio);
                        if (self1.nzWidth < self1.options.zoomWindowHeight / self1.heightRatio) lensWidth = self1.nzWidth;
                        else lensWidth = String(self1.options.zoomWindowWidth / self1.widthRatio);
                        self1.zoomLens.css("width", lensWidth);
                        self1.zoomLens.css("height", lensHeight);
                        if (self1.options.tint) {
                            self1.zoomTintImage.css("width", self1.nzWidth);
                            self1.zoomTintImage.css("height", self1.nzHeight);
                        }
                    }
                    if (self1.options.zoomType == "lens") self1.zoomLens.css({
                        width: String(self1.options.lensSize) + "px",
                        height: String(self1.options.lensSize) + "px"
                    });
                //end responsive image change
                }
            }
            //container fix
            self1.zoomContainer.css({
                top: self1.nzOffset.top
            });
            self1.zoomContainer.css({
                left: self1.nzOffset.left
            });
            self1.mouseLeft = parseInt(e.pageX - self1.nzOffset.left);
            self1.mouseTop = parseInt(e.pageY - self1.nzOffset.top);
            //calculate the Location of the Lens
            //calculate the bound regions - but only if zoom window
            if (self1.options.zoomType == "window") {
                self1.Etoppos = self1.mouseTop < self1.zoomLens.height() / 2;
                self1.Eboppos = self1.mouseTop > self1.nzHeight - self1.zoomLens.height() / 2 - self1.options.lensBorderSize * 2;
                self1.Eloppos = self1.mouseLeft < 0 + self1.zoomLens.width() / 2;
                self1.Eroppos = self1.mouseLeft > self1.nzWidth - self1.zoomLens.width() / 2 - self1.options.lensBorderSize * 2;
            }
            //calculate the bound regions - but only for inner zoom
            if (self1.options.zoomType == "inner") {
                self1.Etoppos = self1.mouseTop < self1.nzHeight / 2 / self1.heightRatio;
                self1.Eboppos = self1.mouseTop > self1.nzHeight - self1.nzHeight / 2 / self1.heightRatio;
                self1.Eloppos = self1.mouseLeft < 0 + self1.nzWidth / 2 / self1.widthRatio;
                self1.Eroppos = self1.mouseLeft > self1.nzWidth - self1.nzWidth / 2 / self1.widthRatio - self1.options.lensBorderSize * 2;
            }
            // if the mouse position of the slider is one of the outerbounds, then hide  window and lens
            if (self1.mouseLeft < 0 || self1.mouseTop < 0 || self1.mouseLeft > self1.nzWidth || self1.mouseTop > self1.nzHeight) {
                self1.setElements("hide");
                return;
            } else {
                //lens options
                if (self1.options.showLens) {
                    //		self.showHideLens("show");
                    //set background position of lens
                    self1.lensLeftPos = String(Math.floor(self1.mouseLeft - self1.zoomLens.width() / 2));
                    self1.lensTopPos = String(Math.floor(self1.mouseTop - self1.zoomLens.height() / 2));
                }
                //adjust the background position if the mouse is in one of the outer regions 
                //Top region
                if (self1.Etoppos) self1.lensTopPos = 0;
                //Left Region
                if (self1.Eloppos) {
                    self1.windowLeftPos = 0;
                    self1.lensLeftPos = 0;
                    self1.tintpos = 0;
                }
                //Set bottom and right region for window mode
                if (self1.options.zoomType == "window") {
                    if (self1.Eboppos) self1.lensTopPos = Math.max(self1.nzHeight - self1.zoomLens.height() - self1.options.lensBorderSize * 2, 0);
                    if (self1.Eroppos) self1.lensLeftPos = self1.nzWidth - self1.zoomLens.width() - self1.options.lensBorderSize * 2;
                }
                //Set bottom and right region for inner mode
                if (self1.options.zoomType == "inner") {
                    if (self1.Eboppos) self1.lensTopPos = Math.max(self1.nzHeight - self1.options.lensBorderSize * 2, 0);
                    if (self1.Eroppos) self1.lensLeftPos = self1.nzWidth - self1.nzWidth - self1.options.lensBorderSize * 2;
                }
                //if lens zoom
                if (self1.options.zoomType == "lens") {
                    self1.windowLeftPos = String(((e.pageX - self1.nzOffset.left) * self1.widthRatio - self1.zoomLens.width() / 2) * -1);
                    self1.windowTopPos = String(((e.pageY - self1.nzOffset.top) * self1.heightRatio - self1.zoomLens.height() / 2) * -1);
                    self1.zoomLens.css({
                        backgroundPosition: self1.windowLeftPos + "px " + self1.windowTopPos + "px"
                    });
                    if (self1.changeBgSize) {
                        if (self1.nzHeight > self1.nzWidth) {
                            if (self1.options.zoomType == "lens") self1.zoomLens.css({
                                "background-size": self1.largeWidth / self1.newvalueheight + "px " + self1.largeHeight / self1.newvalueheight + "px"
                            });
                            self1.zoomWindow.css({
                                "background-size": self1.largeWidth / self1.newvalueheight + "px " + self1.largeHeight / self1.newvalueheight + "px"
                            });
                        } else {
                            if (self1.options.zoomType == "lens") self1.zoomLens.css({
                                "background-size": self1.largeWidth / self1.newvaluewidth + "px " + self1.largeHeight / self1.newvaluewidth + "px"
                            });
                            self1.zoomWindow.css({
                                "background-size": self1.largeWidth / self1.newvaluewidth + "px " + self1.largeHeight / self1.newvaluewidth + "px"
                            });
                        }
                        self1.changeBgSize = false;
                    }
                    self1.setWindowPostition(e);
                }
                //if tint zoom   
                if (self1.options.tint && self1.options.zoomType != "inner") self1.setTintPosition(e);
                //set the css background position 
                if (self1.options.zoomType == "window") self1.setWindowPostition(e);
                if (self1.options.zoomType == "inner") self1.setWindowPostition(e);
                if (self1.options.showLens) {
                    if (self1.fullwidth && self1.options.zoomType != "lens") self1.lensLeftPos = 0;
                    self1.zoomLens.css({
                        left: self1.lensLeftPos + "px",
                        top: self1.lensTopPos + "px"
                    });
                }
            } //end else
        },
        showHideWindow: function(change) {
            var self1 = this;
            if (change == "show") {
                if (!self1.isWindowActive) {
                    if (self1.options.zoomWindowFadeIn) self1.zoomWindow.stop(true, true, false).fadeIn(self1.options.zoomWindowFadeIn);
                    else self1.zoomWindow.show();
                    self1.isWindowActive = true;
                }
            }
            if (change == "hide") {
                if (self1.isWindowActive) {
                    if (self1.options.zoomWindowFadeOut) self1.zoomWindow.stop(true, true).fadeOut(self1.options.zoomWindowFadeOut, function() {
                        if (self1.loop) {
                            //stop moving the zoom window when zoom window is faded out
                            clearInterval(self1.loop);
                            self1.loop = false;
                        }
                    });
                    else self1.zoomWindow.hide();
                    self1.isWindowActive = false;
                }
            }
        },
        showHideLens: function(change) {
            var self1 = this;
            if (change == "show") {
                if (!self1.isLensActive) {
                    if (self1.options.lensFadeIn) self1.zoomLens.stop(true, true, false).fadeIn(self1.options.lensFadeIn);
                    else self1.zoomLens.show();
                    self1.isLensActive = true;
                }
            }
            if (change == "hide") {
                if (self1.isLensActive) {
                    if (self1.options.lensFadeOut) self1.zoomLens.stop(true, true).fadeOut(self1.options.lensFadeOut);
                    else self1.zoomLens.hide();
                    self1.isLensActive = false;
                }
            }
        },
        showHideTint: function(change) {
            var self1 = this;
            if (change == "show") {
                if (!self1.isTintActive) {
                    if (self1.options.zoomTintFadeIn) self1.zoomTint.css({
                        opacity: self1.options.tintOpacity
                    }).animate().stop(true, true).fadeIn("slow");
                    else {
                        self1.zoomTint.css({
                            opacity: self1.options.tintOpacity
                        }).animate();
                        self1.zoomTint.show();
                    }
                    self1.isTintActive = true;
                }
            }
            if (change == "hide") {
                if (self1.isTintActive) {
                    if (self1.options.zoomTintFadeOut) self1.zoomTint.stop(true, true).fadeOut(self1.options.zoomTintFadeOut);
                    else self1.zoomTint.hide();
                    self1.isTintActive = false;
                }
            }
        },
        setLensPostition: function(e) {},
        setWindowPostition: function(e) {
            //return obj.slice( 0, count );
            var self1 = this;
            if (!isNaN(self1.options.zoomWindowPosition)) switch(self1.options.zoomWindowPosition){
                case 1:
                    self1.windowOffsetTop = self1.options.zoomWindowOffety; //DONE - 1
                    self1.windowOffsetLeft = +self1.nzWidth; //DONE 1, 2, 3, 4, 16
                    break;
                case 2:
                    if (self1.options.zoomWindowHeight > self1.nzHeight) {
                        self1.windowOffsetTop = (self1.options.zoomWindowHeight / 2 - self1.nzHeight / 2) * -1;
                        self1.windowOffsetLeft = self1.nzWidth; //DONE 1, 2, 3, 4, 16
                    }
                    break;
                case 3:
                    self1.windowOffsetTop = self1.nzHeight - self1.zoomWindow.height() - self1.options.borderSize * 2; //DONE 3,9
                    self1.windowOffsetLeft = self1.nzWidth; //DONE 1, 2, 3, 4, 16
                    break;
                case 4:
                    self1.windowOffsetTop = self1.nzHeight; //DONE - 4,5,6,7,8
                    self1.windowOffsetLeft = self1.nzWidth; //DONE 1, 2, 3, 4, 16
                    break;
                case 5:
                    self1.windowOffsetTop = self1.nzHeight; //DONE - 4,5,6,7,8
                    self1.windowOffsetLeft = self1.nzWidth - self1.zoomWindow.width() - self1.options.borderSize * 2; //DONE - 5,15
                    break;
                case 6:
                    if (self1.options.zoomWindowHeight > self1.nzHeight) {
                        self1.windowOffsetTop = self1.nzHeight; //DONE - 4,5,6,7,8
                        self1.windowOffsetLeft = (self1.options.zoomWindowWidth / 2 - self1.nzWidth / 2 + self1.options.borderSize * 2) * -1;
                    }
                    break;
                case 7:
                    self1.windowOffsetTop = self1.nzHeight; //DONE - 4,5,6,7,8
                    self1.windowOffsetLeft = 0; //DONE 7, 13
                    break;
                case 8:
                    self1.windowOffsetTop = self1.nzHeight; //DONE - 4,5,6,7,8
                    self1.windowOffsetLeft = (self1.zoomWindow.width() + self1.options.borderSize * 2) * -1; //DONE 8,9,10,11,12
                    break;
                case 9:
                    self1.windowOffsetTop = self1.nzHeight - self1.zoomWindow.height() - self1.options.borderSize * 2; //DONE 3,9
                    self1.windowOffsetLeft = (self1.zoomWindow.width() + self1.options.borderSize * 2) * -1; //DONE 8,9,10,11,12
                    break;
                case 10:
                    if (self1.options.zoomWindowHeight > self1.nzHeight) {
                        self1.windowOffsetTop = (self1.options.zoomWindowHeight / 2 - self1.nzHeight / 2) * -1;
                        self1.windowOffsetLeft = (self1.zoomWindow.width() + self1.options.borderSize * 2) * -1; //DONE 8,9,10,11,12
                    }
                    break;
                case 11:
                    self1.windowOffsetTop = self1.options.zoomWindowOffety;
                    self1.windowOffsetLeft = (self1.zoomWindow.width() + self1.options.borderSize * 2) * -1; //DONE 8,9,10,11,12
                    break;
                case 12:
                    self1.windowOffsetTop = (self1.zoomWindow.height() + self1.options.borderSize * 2) * -1; //DONE 12,13,14,15,16
                    self1.windowOffsetLeft = (self1.zoomWindow.width() + self1.options.borderSize * 2) * -1; //DONE 8,9,10,11,12
                    break;
                case 13:
                    self1.windowOffsetTop = (self1.zoomWindow.height() + self1.options.borderSize * 2) * -1; //DONE 12,13,14,15,16
                    self1.windowOffsetLeft = 0; //DONE 7, 13
                    break;
                case 14:
                    if (self1.options.zoomWindowHeight > self1.nzHeight) {
                        self1.windowOffsetTop = (self1.zoomWindow.height() + self1.options.borderSize * 2) * -1; //DONE 12,13,14,15,16
                        self1.windowOffsetLeft = (self1.options.zoomWindowWidth / 2 - self1.nzWidth / 2 + self1.options.borderSize * 2) * -1;
                    }
                    break;
                case 15:
                    self1.windowOffsetTop = (self1.zoomWindow.height() + self1.options.borderSize * 2) * -1; //DONE 12,13,14,15,16
                    self1.windowOffsetLeft = self1.nzWidth - self1.zoomWindow.width() - self1.options.borderSize * 2; //DONE - 5,15
                    break;
                case 16:
                    self1.windowOffsetTop = (self1.zoomWindow.height() + self1.options.borderSize * 2) * -1; //DONE 12,13,14,15,16
                    self1.windowOffsetLeft = self1.nzWidth; //DONE 1, 2, 3, 4, 16
                    break;
                default:
                    self1.windowOffsetTop = self1.options.zoomWindowOffety; //DONE - 1
                    self1.windowOffsetLeft = self1.nzWidth; //DONE 1, 2, 3, 4, 16
            }
            else {
                //WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
                self1.externalContainer = $("#" + self1.options.zoomWindowPosition);
                self1.externalContainerWidth = self1.externalContainer.width();
                self1.externalContainerHeight = self1.externalContainer.height();
                self1.externalContainerOffset = self1.externalContainer.offset();
                self1.windowOffsetTop = self1.externalContainerOffset.top; //DONE - 1
                self1.windowOffsetLeft = self1.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16
            }
            self1.isWindowSet = true;
            self1.windowOffsetTop = self1.windowOffsetTop + self1.options.zoomWindowOffety;
            self1.windowOffsetLeft = self1.windowOffsetLeft + self1.options.zoomWindowOffetx;
            self1.zoomWindow.css({
                top: self1.windowOffsetTop
            });
            self1.zoomWindow.css({
                left: self1.windowOffsetLeft
            });
            if (self1.options.zoomType == "inner") {
                self1.zoomWindow.css({
                    top: 0
                });
                self1.zoomWindow.css({
                    left: 0
                });
            }
            self1.windowLeftPos = String(((e.pageX - self1.nzOffset.left) * self1.widthRatio - self1.zoomWindow.width() / 2) * -1);
            self1.windowTopPos = String(((e.pageY - self1.nzOffset.top) * self1.heightRatio - self1.zoomWindow.height() / 2) * -1);
            if (self1.Etoppos) self1.windowTopPos = 0;
            if (self1.Eloppos) self1.windowLeftPos = 0;
            if (self1.Eboppos) self1.windowTopPos = (self1.largeHeight / self1.currentZoomLevel - self1.zoomWindow.height()) * -1;
            if (self1.Eroppos) self1.windowLeftPos = (self1.largeWidth / self1.currentZoomLevel - self1.zoomWindow.width()) * -1;
            //stops micro movements
            if (self1.fullheight) self1.windowTopPos = 0;
            if (self1.fullwidth) self1.windowLeftPos = 0;
            //set the css background position 
            if (self1.options.zoomType == "window" || self1.options.zoomType == "inner") {
                if (self1.zoomLock == 1) {
                    //overrides for images not zoomable
                    if (self1.widthRatio <= 1) self1.windowLeftPos = 0;
                    if (self1.heightRatio <= 1) self1.windowTopPos = 0;
                }
                // adjust images less than the window height
                if (self1.options.zoomType == "window") {
                    if (self1.largeHeight < self1.options.zoomWindowHeight) self1.windowTopPos = 0;
                    if (self1.largeWidth < self1.options.zoomWindowWidth) self1.windowLeftPos = 0;
                }
                //set the zoomwindow background position
                if (self1.options.easing) {
                    //     if(self.changeZoom){
                    //           clearInterval(self.loop);
                    //           self.changeZoom = false;
                    //           self.loop = false;
                    //            }
                    //set the pos to 0 if not set
                    if (!self1.xp) self1.xp = 0;
                    if (!self1.yp) self1.yp = 0;
                    //if loop not already started, then run it 
                    if (!self1.loop) self1.loop = setInterval(function() {
                        //using zeno's paradox    
                        self1.xp += (self1.windowLeftPos - self1.xp) / self1.options.easingAmount;
                        self1.yp += (self1.windowTopPos - self1.yp) / self1.options.easingAmount;
                        if (self1.scrollingLock) {
                            clearInterval(self1.loop);
                            self1.xp = self1.windowLeftPos;
                            self1.yp = self1.windowTopPos;
                            self1.xp = ((e.pageX - self1.nzOffset.left) * self1.widthRatio - self1.zoomWindow.width() / 2) * -1;
                            self1.yp = ((e.pageY - self1.nzOffset.top) * self1.heightRatio - self1.zoomWindow.height() / 2) * -1;
                            if (self1.changeBgSize) {
                                if (self1.nzHeight > self1.nzWidth) {
                                    if (self1.options.zoomType == "lens") self1.zoomLens.css({
                                        "background-size": self1.largeWidth / self1.newvalueheight + "px " + self1.largeHeight / self1.newvalueheight + "px"
                                    });
                                    self1.zoomWindow.css({
                                        "background-size": self1.largeWidth / self1.newvalueheight + "px " + self1.largeHeight / self1.newvalueheight + "px"
                                    });
                                } else {
                                    if (self1.options.zoomType != "lens") self1.zoomLens.css({
                                        "background-size": self1.largeWidth / self1.newvaluewidth + "px " + self1.largeHeight / self1.newvalueheight + "px"
                                    });
                                    self1.zoomWindow.css({
                                        "background-size": self1.largeWidth / self1.newvaluewidth + "px " + self1.largeHeight / self1.newvaluewidth + "px"
                                    });
                                }
                                /*
                                     if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
                                     if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}  
                                     if (!self.bgloop){   
                                     self.bgloop = setInterval(function(){   
                                     
                                     self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount; 
                                     self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;
                                     
                                     self.zoomWindow.css({ "background-size": self.bgxp + 'px ' + self.bgyp + 'px' });
                                     
                                     
                                     }, 16);
                                     
                                     }
                                     */ self1.changeBgSize = false;
                            }
                            self1.zoomWindow.css({
                                backgroundPosition: self1.windowLeftPos + "px " + self1.windowTopPos + "px"
                            });
                            self1.scrollingLock = false;
                            self1.loop = false;
                        } else if (Math.round(Math.abs(self1.xp - self1.windowLeftPos) + Math.abs(self1.yp - self1.windowTopPos)) < 1) {
                            //stops micro movements
                            clearInterval(self1.loop);
                            self1.zoomWindow.css({
                                backgroundPosition: self1.windowLeftPos + "px " + self1.windowTopPos + "px"
                            });
                            self1.loop = false;
                        } else {
                            if (self1.changeBgSize) {
                                if (self1.nzHeight > self1.nzWidth) {
                                    if (self1.options.zoomType == "lens") self1.zoomLens.css({
                                        "background-size": self1.largeWidth / self1.newvalueheight + "px " + self1.largeHeight / self1.newvalueheight + "px"
                                    });
                                    self1.zoomWindow.css({
                                        "background-size": self1.largeWidth / self1.newvalueheight + "px " + self1.largeHeight / self1.newvalueheight + "px"
                                    });
                                } else {
                                    if (self1.options.zoomType != "lens") self1.zoomLens.css({
                                        "background-size": self1.largeWidth / self1.newvaluewidth + "px " + self1.largeHeight / self1.newvaluewidth + "px"
                                    });
                                    self1.zoomWindow.css({
                                        "background-size": self1.largeWidth / self1.newvaluewidth + "px " + self1.largeHeight / self1.newvaluewidth + "px"
                                    });
                                }
                                self1.changeBgSize = false;
                            }
                            self1.zoomWindow.css({
                                backgroundPosition: self1.xp + "px " + self1.yp + "px"
                            });
                        }
                    }, 16);
                } else {
                    if (self1.changeBgSize) {
                        if (self1.nzHeight > self1.nzWidth) {
                            if (self1.options.zoomType == "lens") self1.zoomLens.css({
                                "background-size": self1.largeWidth / self1.newvalueheight + "px " + self1.largeHeight / self1.newvalueheight + "px"
                            });
                            self1.zoomWindow.css({
                                "background-size": self1.largeWidth / self1.newvalueheight + "px " + self1.largeHeight / self1.newvalueheight + "px"
                            });
                        } else {
                            if (self1.options.zoomType == "lens") self1.zoomLens.css({
                                "background-size": self1.largeWidth / self1.newvaluewidth + "px " + self1.largeHeight / self1.newvaluewidth + "px"
                            });
                            if (self1.largeHeight / self1.newvaluewidth < self1.options.zoomWindowHeight) self1.zoomWindow.css({
                                "background-size": self1.largeWidth / self1.newvaluewidth + "px " + self1.largeHeight / self1.newvaluewidth + "px"
                            });
                            else self1.zoomWindow.css({
                                "background-size": self1.largeWidth / self1.newvalueheight + "px " + self1.largeHeight / self1.newvalueheight + "px"
                            });
                        }
                        self1.changeBgSize = false;
                    }
                    self1.zoomWindow.css({
                        backgroundPosition: self1.windowLeftPos + "px " + self1.windowTopPos + "px"
                    });
                }
            }
        },
        setTintPosition: function(e) {
            var self1 = this;
            self1.nzOffset = self1.$elem.offset();
            self1.tintpos = String((e.pageX - self1.nzOffset.left - self1.zoomLens.width() / 2) * -1);
            self1.tintposy = String((e.pageY - self1.nzOffset.top - self1.zoomLens.height() / 2) * -1);
            if (self1.Etoppos) self1.tintposy = 0;
            if (self1.Eloppos) self1.tintpos = 0;
            if (self1.Eboppos) self1.tintposy = (self1.nzHeight - self1.zoomLens.height() - self1.options.lensBorderSize * 2) * -1;
            if (self1.Eroppos) self1.tintpos = (self1.nzWidth - self1.zoomLens.width() - self1.options.lensBorderSize * 2) * -1;
            if (self1.options.tint) {
                //stops micro movements
                if (self1.fullheight) self1.tintposy = 0;
                if (self1.fullwidth) self1.tintpos = 0;
                self1.zoomTintImage.css({
                    "left": self1.tintpos + "px"
                });
                self1.zoomTintImage.css({
                    "top": self1.tintposy + "px"
                });
            }
        },
        swaptheimage: function(smallimage, largeimage) {
            var self1 = this;
            var newImg = new Image();
            if (self1.options.loadingIcon) {
                self1.spinner = $("<div style=\"background: url('" + self1.options.loadingIcon + "') no-repeat center;height:" + self1.nzHeight + "px;width:" + self1.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>');
                self1.$elem.after(self1.spinner);
            }
            self1.options.onImageSwap(self1.$elem);
            newImg.onload = function() {
                self1.largeWidth = newImg.width;
                self1.largeHeight = newImg.height;
                self1.zoomImage = largeimage;
                self1.zoomWindow.css({
                    "background-size": self1.largeWidth + "px " + self1.largeHeight + "px"
                });
                self1.swapAction(smallimage, largeimage);
                return;
            };
            newImg.src = largeimage; // this must be done AFTER setting onload
        },
        swapAction: function(smallimage, largeimage) {
            var self1 = this;
            var newImg2 = new Image();
            newImg2.onload = function() {
                //re-calculate values
                self1.nzHeight = newImg2.height;
                self1.nzWidth = newImg2.width;
                self1.options.onImageSwapComplete(self1.$elem);
                self1.doneCallback();
                return;
            };
            newImg2.src = smallimage;
            //reset the zoomlevel to that initially set in options
            self1.currentZoomLevel = self1.options.zoomLevel;
            self1.options.maxZoomLevel = false;
            //swaps the main image
            //self.$elem.attr("src",smallimage);
            //swaps the zoom image     
            if (self1.options.zoomType == "lens") self1.zoomLens.css({
                backgroundImage: "url('" + largeimage + "')"
            });
            if (self1.options.zoomType == "window") self1.zoomWindow.css({
                backgroundImage: "url('" + largeimage + "')"
            });
            if (self1.options.zoomType == "inner") self1.zoomWindow.css({
                backgroundImage: "url('" + largeimage + "')"
            });
            self1.currentImage = largeimage;
            if (self1.options.imageCrossfade) {
                var oldImg = self1.$elem;
                var newImg = oldImg.clone();
                self1.$elem.attr("src", smallimage);
                self1.$elem.after(newImg);
                newImg.stop(true).fadeOut(self1.options.imageCrossfade, function() {
                    $(this).remove();
                });
                //       				if(self.options.zoomType == "inner"){
                //remove any attributes on the cloned image so we can resize later
                self1.$elem.width("auto").removeAttr("width");
                self1.$elem.height("auto").removeAttr("height");
                //   }
                oldImg.fadeIn(self1.options.imageCrossfade);
                if (self1.options.tint && self1.options.zoomType != "inner") {
                    var oldImgTint = self1.zoomTintImage;
                    var newImgTint = oldImgTint.clone();
                    self1.zoomTintImage.attr("src", largeimage);
                    self1.zoomTintImage.after(newImgTint);
                    newImgTint.stop(true).fadeOut(self1.options.imageCrossfade, function() {
                        $(this).remove();
                    });
                    oldImgTint.fadeIn(self1.options.imageCrossfade);
                    //self.zoomTintImage.attr("width",elem.data("image"));
                    //resize the tint window
                    self1.zoomTint.css({
                        height: self1.$elem.height()
                    });
                    self1.zoomTint.css({
                        width: self1.$elem.width()
                    });
                }
                self1.zoomContainer.css("height", self1.$elem.height());
                self1.zoomContainer.css("width", self1.$elem.width());
                if (self1.options.zoomType == "inner") {
                    if (!self1.options.constrainType) {
                        self1.zoomWrap.parent().css("height", self1.$elem.height());
                        self1.zoomWrap.parent().css("width", self1.$elem.width());
                        self1.zoomWindow.css("height", self1.$elem.height());
                        self1.zoomWindow.css("width", self1.$elem.width());
                    }
                }
                if (self1.options.imageCrossfade) {
                    self1.zoomWrap.css("height", self1.$elem.height());
                    self1.zoomWrap.css("width", self1.$elem.width());
                }
            } else {
                self1.$elem.attr("src", smallimage);
                if (self1.options.tint) {
                    self1.zoomTintImage.attr("src", largeimage);
                    //self.zoomTintImage.attr("width",elem.data("image"));
                    self1.zoomTintImage.attr("height", self1.$elem.height());
                    //self.zoomTintImage.attr('src') = elem.data("image");
                    self1.zoomTintImage.css({
                        height: self1.$elem.height()
                    });
                    self1.zoomTint.css({
                        height: self1.$elem.height()
                    });
                }
                self1.zoomContainer.css("height", self1.$elem.height());
                self1.zoomContainer.css("width", self1.$elem.width());
                if (self1.options.imageCrossfade) {
                    self1.zoomWrap.css("height", self1.$elem.height());
                    self1.zoomWrap.css("width", self1.$elem.width());
                }
            }
            if (self1.options.constrainType) {
                //This will contrain the image proportions
                if (self1.options.constrainType == "height") {
                    self1.zoomContainer.css("height", self1.options.constrainSize);
                    self1.zoomContainer.css("width", "auto");
                    if (self1.options.imageCrossfade) {
                        self1.zoomWrap.css("height", self1.options.constrainSize);
                        self1.zoomWrap.css("width", "auto");
                        self1.constwidth = self1.zoomWrap.width();
                    } else {
                        self1.$elem.css("height", self1.options.constrainSize);
                        self1.$elem.css("width", "auto");
                        self1.constwidth = self1.$elem.width();
                    }
                    if (self1.options.zoomType == "inner") {
                        self1.zoomWrap.parent().css("height", self1.options.constrainSize);
                        self1.zoomWrap.parent().css("width", self1.constwidth);
                        self1.zoomWindow.css("height", self1.options.constrainSize);
                        self1.zoomWindow.css("width", self1.constwidth);
                    }
                    if (self1.options.tint) {
                        self1.tintContainer.css("height", self1.options.constrainSize);
                        self1.tintContainer.css("width", self1.constwidth);
                        self1.zoomTint.css("height", self1.options.constrainSize);
                        self1.zoomTint.css("width", self1.constwidth);
                        self1.zoomTintImage.css("height", self1.options.constrainSize);
                        self1.zoomTintImage.css("width", self1.constwidth);
                    }
                }
                if (self1.options.constrainType == "width") {
                    self1.zoomContainer.css("height", "auto");
                    self1.zoomContainer.css("width", self1.options.constrainSize);
                    if (self1.options.imageCrossfade) {
                        self1.zoomWrap.css("height", "auto");
                        self1.zoomWrap.css("width", self1.options.constrainSize);
                        self1.constheight = self1.zoomWrap.height();
                    } else {
                        self1.$elem.css("height", "auto");
                        self1.$elem.css("width", self1.options.constrainSize);
                        self1.constheight = self1.$elem.height();
                    }
                    if (self1.options.zoomType == "inner") {
                        self1.zoomWrap.parent().css("height", self1.constheight);
                        self1.zoomWrap.parent().css("width", self1.options.constrainSize);
                        self1.zoomWindow.css("height", self1.constheight);
                        self1.zoomWindow.css("width", self1.options.constrainSize);
                    }
                    if (self1.options.tint) {
                        self1.tintContainer.css("height", self1.constheight);
                        self1.tintContainer.css("width", self1.options.constrainSize);
                        self1.zoomTint.css("height", self1.constheight);
                        self1.zoomTint.css("width", self1.options.constrainSize);
                        self1.zoomTintImage.css("height", self1.constheight);
                        self1.zoomTintImage.css("width", self1.options.constrainSize);
                    }
                }
            }
        },
        doneCallback: function() {
            var self1 = this;
            if (self1.options.loadingIcon) self1.spinner.hide();
            self1.nzOffset = self1.$elem.offset();
            self1.nzWidth = self1.$elem.width();
            self1.nzHeight = self1.$elem.height();
            // reset the zoomlevel back to default
            self1.currentZoomLevel = self1.options.zoomLevel;
            //ratio of the large to small image
            self1.widthRatio = self1.largeWidth / self1.nzWidth;
            self1.heightRatio = self1.largeHeight / self1.nzHeight;
            //NEED TO ADD THE LENS SIZE FOR ROUND
            // adjust images less than the window height
            if (self1.options.zoomType == "window") {
                if (self1.nzHeight < self1.options.zoomWindowWidth / self1.widthRatio) lensHeight = self1.nzHeight;
                else lensHeight = String(self1.options.zoomWindowHeight / self1.heightRatio);
                if (self1.options.zoomWindowWidth < self1.options.zoomWindowWidth) lensWidth = self1.nzWidth;
                else lensWidth = self1.options.zoomWindowWidth / self1.widthRatio;
                if (self1.zoomLens) {
                    self1.zoomLens.css("width", lensWidth);
                    self1.zoomLens.css("height", lensHeight);
                }
            }
        },
        getCurrentImage: function() {
            var self1 = this;
            return self1.zoomImage;
        },
        getGalleryList: function() {
            var self1 = this;
            //loop through the gallery options and set them in list for fancybox
            self1.gallerylist = [];
            if (self1.options.gallery) $("#" + self1.options.gallery + " a").each(function() {
                var img_src = "";
                if ($(this).data("zoom-image")) img_src = $(this).data("zoom-image");
                else if ($(this).data("image")) img_src = $(this).data("image");
                //put the current image at the start
                if (img_src == self1.zoomImage) self1.gallerylist.unshift({
                    href: "" + img_src + "",
                    title: $(this).find("img").attr("title")
                });
                else self1.gallerylist.push({
                    href: "" + img_src + "",
                    title: $(this).find("img").attr("title")
                });
            });
            else self1.gallerylist.push({
                href: "" + self1.zoomImage + "",
                title: $(this).find("img").attr("title")
            });
            return self1.gallerylist;
        },
        changeZoomLevel: function(value) {
            var self1 = this;
            //flag a zoom, so can adjust the easing during setPosition     
            self1.scrollingLock = true;
            //round to two decimal places
            self1.newvalue = parseFloat(value).toFixed(2);
            newvalue = parseFloat(value).toFixed(2);
            //maxwidth & Maxheight of the image
            maxheightnewvalue = self1.largeHeight / (self1.options.zoomWindowHeight / self1.nzHeight * self1.nzHeight);
            maxwidthtnewvalue = self1.largeWidth / (self1.options.zoomWindowWidth / self1.nzWidth * self1.nzWidth);
            //calculate new heightratio
            if (self1.options.zoomType != "inner") {
                if (maxheightnewvalue <= newvalue) {
                    self1.heightRatio = self1.largeHeight / maxheightnewvalue / self1.nzHeight;
                    self1.newvalueheight = maxheightnewvalue;
                    self1.fullheight = true;
                } else {
                    self1.heightRatio = self1.largeHeight / newvalue / self1.nzHeight;
                    self1.newvalueheight = newvalue;
                    self1.fullheight = false;
                }
                //					calculate new width ratio
                if (maxwidthtnewvalue <= newvalue) {
                    self1.widthRatio = self1.largeWidth / maxwidthtnewvalue / self1.nzWidth;
                    self1.newvaluewidth = maxwidthtnewvalue;
                    self1.fullwidth = true;
                } else {
                    self1.widthRatio = self1.largeWidth / newvalue / self1.nzWidth;
                    self1.newvaluewidth = newvalue;
                    self1.fullwidth = false;
                }
                if (self1.options.zoomType == "lens") {
                    if (maxheightnewvalue <= newvalue) {
                        self1.fullwidth = true;
                        self1.newvaluewidth = maxheightnewvalue;
                    } else {
                        self1.widthRatio = self1.largeWidth / newvalue / self1.nzWidth;
                        self1.newvaluewidth = newvalue;
                        self1.fullwidth = false;
                    }
                }
            }
            if (self1.options.zoomType == "inner") {
                maxheightnewvalue = parseFloat(self1.largeHeight / self1.nzHeight).toFixed(2);
                maxwidthtnewvalue = parseFloat(self1.largeWidth / self1.nzWidth).toFixed(2);
                if (newvalue > maxheightnewvalue) newvalue = maxheightnewvalue;
                if (newvalue > maxwidthtnewvalue) newvalue = maxwidthtnewvalue;
                if (maxheightnewvalue <= newvalue) {
                    self1.heightRatio = self1.largeHeight / newvalue / self1.nzHeight;
                    if (newvalue > maxheightnewvalue) self1.newvalueheight = maxheightnewvalue;
                    else self1.newvalueheight = newvalue;
                    self1.fullheight = true;
                } else {
                    self1.heightRatio = self1.largeHeight / newvalue / self1.nzHeight;
                    if (newvalue > maxheightnewvalue) self1.newvalueheight = maxheightnewvalue;
                    else self1.newvalueheight = newvalue;
                    self1.fullheight = false;
                }
                if (maxwidthtnewvalue <= newvalue) {
                    self1.widthRatio = self1.largeWidth / newvalue / self1.nzWidth;
                    if (newvalue > maxwidthtnewvalue) self1.newvaluewidth = maxwidthtnewvalue;
                    else self1.newvaluewidth = newvalue;
                    self1.fullwidth = true;
                } else {
                    self1.widthRatio = self1.largeWidth / newvalue / self1.nzWidth;
                    self1.newvaluewidth = newvalue;
                    self1.fullwidth = false;
                }
            } //end inner
            scrcontinue = false;
            if (self1.options.zoomType == "inner") {
                if (self1.nzWidth >= self1.nzHeight) {
                    if (self1.newvaluewidth <= maxwidthtnewvalue) scrcontinue = true;
                    else {
                        scrcontinue = false;
                        self1.fullheight = true;
                        self1.fullwidth = true;
                    }
                }
                if (self1.nzHeight > self1.nzWidth) {
                    if (self1.newvaluewidth <= maxwidthtnewvalue) scrcontinue = true;
                    else {
                        scrcontinue = false;
                        self1.fullheight = true;
                        self1.fullwidth = true;
                    }
                }
            }
            if (self1.options.zoomType != "inner") scrcontinue = true;
            if (scrcontinue) {
                self1.zoomLock = 0;
                self1.changeZoom = true;
                //if lens height is less than image height
                if (self1.options.zoomWindowHeight / self1.heightRatio <= self1.nzHeight) {
                    self1.currentZoomLevel = self1.newvalueheight;
                    if (self1.options.zoomType != "lens" && self1.options.zoomType != "inner") {
                        self1.changeBgSize = true;
                        self1.zoomLens.css({
                            height: String(self1.options.zoomWindowHeight / self1.heightRatio) + "px"
                        });
                    }
                    if (self1.options.zoomType == "lens" || self1.options.zoomType == "inner") self1.changeBgSize = true;
                }
                if (self1.options.zoomWindowWidth / self1.widthRatio <= self1.nzWidth) {
                    if (self1.options.zoomType != "inner") {
                        if (self1.newvaluewidth > self1.newvalueheight) self1.currentZoomLevel = self1.newvaluewidth;
                    }
                    if (self1.options.zoomType != "lens" && self1.options.zoomType != "inner") {
                        self1.changeBgSize = true;
                        self1.zoomLens.css({
                            width: String(self1.options.zoomWindowWidth / self1.widthRatio) + "px"
                        });
                    }
                    if (self1.options.zoomType == "lens" || self1.options.zoomType == "inner") self1.changeBgSize = true;
                }
                if (self1.options.zoomType == "inner") {
                    self1.changeBgSize = true;
                    if (self1.nzWidth > self1.nzHeight) self1.currentZoomLevel = self1.newvaluewidth;
                    if (self1.nzHeight > self1.nzWidth) self1.currentZoomLevel = self1.newvaluewidth;
                }
            } //under
            //sets the boundry change, called in setWindowPos
            self1.setPosition(self1.currentLoc);
        //
        },
        closeAll: function() {
            if (self.zoomWindow) self.zoomWindow.hide();
            if (self.zoomLens) self.zoomLens.hide();
            if (self.zoomTint) self.zoomTint.hide();
        },
        changeState: function(value) {
            var self1 = this;
            if (value == "enable") self1.options.zoomEnabled = true;
            if (value == "disable") self1.options.zoomEnabled = false;
        }
    };
    $.fn.elevateZoom = function(options) {
        return this.each(function() {
            var elevate = Object.create(ElevateZoom);
            elevate.init(options, this);
            $.data(this, "elevateZoom", elevate);
        });
    };
    $.fn.elevateZoom.options = {
        zoomActivation: "hover",
        zoomEnabled: true,
        preloading: 1,
        zoomLevel: 1,
        scrollZoom: false,
        scrollZoomIncrement: 0.1,
        minZoomLevel: false,
        maxZoomLevel: false,
        easing: false,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: false,
        lensFadeOut: false,
        debug: false,
        zoomWindowFadeIn: false,
        zoomWindowFadeOut: false,
        zoomWindowAlwaysShow: false,
        zoomTintFadeIn: false,
        zoomTintFadeOut: false,
        borderSize: 4,
        showLens: true,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: false,
        lensColour: "white",
        lensOpacity: 0.4,
        lenszoom: false,
        tint: false,
        tintColour: "#333",
        tintOpacity: 0.4,
        gallery: false,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: false,
        constrainType: false,
        constrainSize: false,
        loadingIcon: false,
        cursor: "default",
        responsive: true,
        onComplete: $.noop,
        onDestroy: function() {},
        onZoomedImageLoaded: function() {},
        onImageSwap: $.noop,
        onImageSwapComplete: $.noop
    };
})(jQuery, window, document);

//# sourceMappingURL=detail_product.5092f669.js.map
