/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 2.5.0
 *
 * A simple yet powerful JQuery star rating plugin that allows rendering
 * fractional star ratings and supports Right to Left (RTL) input.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */!function(t){var a=0,e=5,n=.5,r=function(a,e){return"undefined"==typeof a||null===a||void 0===a||a==[]||""===a||e&&""===t.trim(a)},l=function(t,a,e){var n=r(t.data(a))?t.attr(a):t.data(a);return n?n:e[a]},i=function(t){var a=(""+t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return a?Math.max(0,(a[1]?a[1].length:0)-(a[2]?+a[2]:0)):0},s=function(t,a){return parseFloat(t.toFixed(a))},o=function(a,e){this.$element=t(a),this.init(e)};o.prototype={constructor:o,_parseAttr:function(t,i){var s=this,o=s.$element;if("range"===o.attr("type")||"number"===o.attr("type")){var c=l(o,t,i),p=n;"min"===t?p=a:"max"===t?p=e:"step"===t&&(p=n);var u=r(c)?p:c;return parseFloat(u)}return parseFloat(i[t])},listen:function(){var a=this;a.$rating.on("click",function(t){a.inactive||(w=t.pageX-a.$rating.offset().left,a.setStars(w),a.$element.trigger("change"),a.$element.trigger("rating.change",[a.$element.val(),a.$caption.html()]))}),a.$clear.on("click",function(){a.inactive||a.clear()}),t(a.$element[0].form).on("reset",function(){a.inactive||a.reset()})},initSlider:function(t){var l=this;r(l.$element.val())&&l.$element.val(0),l.initialValue=l.$element.val(),l.min="undefined"!=typeof t.min?t.min:l._parseAttr("min",t),l.max="undefined"!=typeof t.max?t.max:l._parseAttr("max",t),l.step="undefined"!=typeof t.step?t.step:l._parseAttr("step",t),(isNaN(l.min)||r(l.min))&&(l.min=a),(isNaN(l.max)||r(l.max))&&(l.max=e),(isNaN(l.step)||r(l.step)||0==l.step)&&(l.step=n),l.diff=l.max-l.min},init:function(a){var e=this;e.options=a,e.initSlider(a),e.checkDisabled(),$element=e.$element,e.containerClass=a.containerClass,e.glyphicon=a.glyphicon;var n=e.glyphicon?"":"★";e.symbol=r(a.symbol)?n:a.symbol,e.rtl=a.rtl||e.$element.attr("dir"),e.rtl&&e.$element.attr("dir","rtl"),e.showClear=a.showClear,e.showCaption=a.showCaption,e.size=a.size,e.stars=a.stars,e.defaultCaption=a.defaultCaption,e.starCaptions=a.starCaptions,e.starCaptionClasses=a.starCaptionClasses,e.clearButton=a.clearButton,e.clearButtonTitle=a.clearButtonTitle,e.clearButtonBaseClass=r(a.clearButtonBaseClass)?"clear-rating":a.clearButtonBaseClass,e.clearButtonActiveClass=r(a.clearButtonActiveClass)?"clear-rating-active":a.clearButtonActiveClass,e.clearCaption=a.clearCaption,e.clearCaptionClass=a.clearCaptionClass,e.clearValue=a.clearValue,e.$element.removeClass("form-control").addClass("form-control"),e.$clearElement=r(a.clearElement)?null:t(a.clearElement),e.$captionElement=r(a.captionElement)?null:t(a.captionElement),"undefined"==typeof e.$rating&&"undefined"==typeof e.$container&&(e.$rating=t(document.createElement("div")).html('<div class="rating-stars"></div>'),e.$container=t(document.createElement("div")),e.$container.before(e.$rating),e.$container.append(e.$rating),e.$element.before(e.$container).appendTo(e.$rating)),e.$stars=e.$rating.find(".rating-stars"),e.generateRating(),e.$clear=r(e.$clearElement)?e.$container.find("."+e.clearButtonBaseClass):e.$clearElement,e.$caption=r(e.$captionElement)?e.$container.find(".caption"):e.$captionElement,e.setStars(),e.$element.hide(),e.listen(),e.showClear&&e.$clear.attr({"class":e.getClearClass()}),e.$element.removeClass("rating-loading")},checkDisabled:function(){var t=this;t.disabled=l(t.$element,"disabled",t.options),t.readonly=l(t.$element,"readonly",t.options),t.inactive=t.disabled||t.readonly},getClearClass:function(){return this.clearButtonBaseClass+" "+(this.inactive?"":this.clearButtonActiveClass)},generateRating:function(){var t=this,a=t.renderClear(),e=t.renderCaption(),n=t.rtl?"rating-container-rtl":"rating-container",l=t.getStars();n+=t.glyphicon?""==t.symbol?" rating-gly-star":" rating-gly":" rating-uni",t.$rating.attr("class",n),t.$rating.attr("data-content",l),t.$stars.attr("data-content",l);var n=t.rtl?"star-rating-rtl":"star-rating";t.$container.attr("class",n+" rating-"+t.size),t.inactive?t.$container.removeClass("rating-active").addClass("rating-disabled"):t.$container.removeClass("rating-disabled").addClass("rating-active"),"undefined"==typeof t.$caption&&"undefined"==typeof t.$clear&&(t.rtl?t.$container.prepend(e).append(a):t.$container.prepend(a).append(e)),r(t.containerClass)||t.$container.removeClass(t.containerClass).addClass(t.containerClass)},getStars:function(){for(var t=this,a=t.stars,e="",n=1;a>=n;n++)e+=t.symbol;return e},renderClear:function(){var t=this;if(!t.showClear)return"";var a=t.getClearClass();return r(t.$clearElement)?'<div class="'+a+'" title="'+t.clearButtonTitle+'">'+t.clearButton+"</div>":(t.$clearElement.removeClass(a).addClass(a).attr({title:t.clearButtonTitle}),t.$clearElement.html(t.clearButton),"")},renderCaption:function(){var t=this,a=t.$element.val();if(!t.showCaption)return"";var e=t.fetchCaption(a);return r(t.$captionElement)?'<div class="caption">'+e+"</div>":(t.$captionElement.removeClass("caption").addClass("caption").attr({title:t.clearCaption}),t.$captionElement.html(e),"")},fetchCaption:function(t){var a,e,n=this,l=parseFloat(t);if(a="function"==typeof n.starCaptionClasses?r(n.starCaptionClasses(l))?n.clearCaptionClass:n.starCaptionClasses(l):r(n.starCaptionClasses[l])?n.clearCaptionClass:n.starCaptionClasses[l],"function"==typeof n.starCaptions)var e=r(n.starCaptions(l))?n.defaultCaption.replace(/\{rating\}/g,l):n.starCaptions(l);else var e=r(n.starCaptions[l])?n.defaultCaption.replace(/\{rating\}/g,l):n.starCaptions[l];var i=l==n.clearValue?n.clearCaption:e;return'<span class="'+a+'">'+i+"</span>"},getValueFromPosition:function(t){var a,e,n=this,r=i(n.step),l=n.$rating.width();return a=t/l,e=n.rtl?n.min+Math.floor(n.diff*a/n.step)*n.step:n.min+Math.ceil(n.diff*a/n.step)*n.step,e<n.min?e=n.min:e>n.max&&(e=n.max),e=s(parseFloat(e),r),n.rtl&&(e=n.max-e),e},setStars:function(t){var a=this,e=a.min,n=a.max,l=(a.step,arguments.length?a.getValueFromPosition(t):r(a.$element.val())?0:a.$element.val()),i=0,s=(a.$rating.width(),a.fetchCaption(l));i=(l-e)/n*100,a.rtl&&(i=100-i),a.$element.val(l),i+="%",a.$stars.css("width",i),a.$caption.html(s)},clear:function(){var t=this,a='<span class="'+t.clearCaptionClass+'">'+t.clearCaption+"</span>";t.$stars.removeClass("rated"),t.inactive||t.$caption.html(a),t.$element.val(t.clearValue),t.setStars(),t.$element.trigger("rating.clear")},reset:function(){var t=this;t.$element.val(t.initialValue),t.setStars(),t.$element.trigger("rating.reset")},update:function(t){if(arguments.length>0){var a=this;a.$element.val(t),a.setStars()}},refresh:function(a){var e=this;if(arguments.length){e.init(t.extend(e.options,a)),e.showClear?e.$clear.show():e.$clear.hide(),e.showCaption?e.$caption.show():e.$caption.hide()}}},t.fn.rating=function(a){var e=Array.apply(null,arguments);return e.shift(),this.each(function(){var n=t(this),r=n.data("rating"),l="object"==typeof a&&a;r||n.data("rating",r=new o(this,t.extend({},t.fn.rating.defaults,l,t(this).data()))),"string"==typeof a&&r[a].apply(r,e)})},t.fn.rating.defaults={stars:5,glyphicon:!0,symbol:null,disabled:!1,readonly:!1,rtl:!1,size:"md",showClear:!0,showCaption:!0,defaultCaption:"{rating} Stars",starCaptions:{.5:"Half Star",1:"One Star",1.5:"One & Half Star",2:"Two Stars",2.5:"Two & Half Stars",3:"Three Stars",3.5:"Three & Half Stars",4:"Four Stars",4.5:"Four & Half Stars",5:"Five Stars"},starCaptionClasses:{.5:"label label-danger",1:"label label-danger",1.5:"label label-warning",2:"label label-warning",2.5:"label label-info",3:"label label-info",3.5:"label label-primary",4:"label label-primary",4.5:"label label-success",5:"label label-success"},clearButton:'<i class="glyphicon glyphicon-minus-sign"></i>',clearButtonTitle:"Clear",clearButtonBaseClass:"clear-rating",clearButtonActiveClass:"clear-rating-active",clearCaption:"Not Rated",clearCaptionClass:"label label-default",clearValue:0,captionElement:null,clearElement:null,containerClass:null},t("input.rating").addClass("rating-loading"),t(document).ready(function(){var a=t("input.rating"),e=Object.keys(a).length;e>0&&a.rating()})}(jQuery);
/* ===========================================================
 * jquery-simple-text-rotator.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * A very simple and light weight jQuery plugin that 
 * allows you to rotate multiple text without changing 
 * the layout
 * https://github.com/peachananr/simple-text-rotator
 *
 * ========================================================== */

!function($){
  
  var defaults = {
		animation: "dissolve",
		separator: ",",
		speed: 2000
	};
	
	$.fx.step.textShadowBlur = function(fx) {
    $(fx.elem).prop('textShadowBlur', fx.now).css({textShadow: '0 0 ' + Math.floor(fx.now) + 'px black'});
  };
	
  $.fn.textrotator = function(options){
    var settings = $.extend({}, defaults, options);
    
    return this.each(function(){
      var el = $(this)
      var array = [];
      $.each(el.text().split(settings.separator), function(key, value) { 
        array.push(value); 
      });
      el.text(array[0]);
      
      // animation option
      var rotate = function() {
        switch (settings.animation) { 
          case 'dissolve':
            el.animate({
              textShadowBlur:20,
              opacity: 0
            }, 500 , function() {
              index = $.inArray(el.text(), array)
              if((index + 1) == array.length) index = -1
              el.text(array[index + 1]).animate({
                textShadowBlur:0,
                opacity: 1
              }, 500 );
            });
          break;
          
          case 'flip':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({
              "-webkit-transform": " rotateY(-180deg)",
              "-moz-transform": " rotateY(-180deg)",
              "-o-transform": " rotateY(-180deg)",
              "transform": " rotateY(-180deg)"
            })
            
          break;
          
          case 'flipUp':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({
              "-webkit-transform": " rotateX(-180deg)",
              "-moz-transform": " rotateX(-180deg)",
              "-o-transform": " rotateX(-180deg)",
              "transform": " rotateX(-180deg)"
            })
            
          break;
          
          case 'flipCube':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({
              "-webkit-transform": " rotateY(180deg)",
              "-moz-transform": " rotateY(180deg)",
              "-o-transform": " rotateY(180deg)",
              "transform": " rotateY(180deg)"
            })
            
          break;
          
          case 'flipCubeUp':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({
              "-webkit-transform": " rotateX(180deg)",
              "-moz-transform": " rotateX(180deg)",
              "-o-transform": " rotateX(180deg)",
              "transform": " rotateX(180deg)"
            })
            
          break;
          
          case 'spin':
            if(el.find(".rotating").length > 0) {
              el.html(el.find(".rotating").html())
            }
            index = $.inArray(el.text(), array)
            if((index + 1) == array.length) index = -1
            
            el.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(array[index + 1]).show().css({
              "-webkit-transform": " rotate(0) scale(1)",
              "-moz-transform": "rotate(0) scale(1)",
              "-o-transform": "rotate(0) scale(1)",
              "transform": "rotate(0) scale(1)"
            })
          break;
          
          case 'fade':
            el.fadeOut(settings.speed, function() {
              index = $.inArray(el.text(), array)
              if((index + 1) == array.length) index = -1
              el.text(array[index + 1]).fadeIn(settings.speed);
            });
          break;
        }
      };
      setInterval(rotate, settings.speed);
    });
  }
  
}(window.jQuery);