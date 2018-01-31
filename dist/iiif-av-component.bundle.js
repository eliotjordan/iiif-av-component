// base-component v1.1.2 https://github.com/iiif-commons/base-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.baseComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var _Components;
(function (_Components) {
    var BaseComponent = /** @class */ (function () {
        function BaseComponent(options) {
            this.options = options;
            this.options.data = $.extend(this.data(), options.data);
        }
        BaseComponent.prototype._init = function () {
            this._$element = $(this.options.target);
            if (!this._$element.length) {
                console.warn('element not found');
                return false;
            }
            this._$element.empty();
            return true;
        };
        BaseComponent.prototype.data = function () {
            return {};
        };
        BaseComponent.prototype.on = function (name, callback, ctx) {
            var e = this._e || (this._e = {});
            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx: ctx
            });
        };
        BaseComponent.prototype.fire = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this._e || (this._e = {}))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;
            for (i; i < len; i++) {
                evtArr[i].fn.apply(evtArr[i].ctx, data);
            }
        };
        BaseComponent.prototype._resize = function () {
        };
        BaseComponent.prototype.set = function (data) {
        };
        return BaseComponent;
    }());
    _Components.BaseComponent = BaseComponent;
})(_Components || (_Components = {}));
(function (g) {
    if (!g._Components) {
        g._Components = _Components;
    }
})(global);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.iiifAvComponent=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){(function(global){var IIIFComponents,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(IIIFComponents){var AVComponent=function(_super){function AVComponent(options){var _this=_super.call(this,options)||this;return _this._currentCanvas=null,_this._data=_this.data(),_this.canvasInstances=[],_this._init(),_this._resize(),_this}return __extends(AVComponent,_super),AVComponent.prototype._init=function(){var success=_super.prototype._init.call(this);return success||console.error("Component failed to initialise"),success},AVComponent.prototype.data=function(){return{autoPlay:!1,defaultAspectRatio:.56,doubleClickMS:350,limitToRange:!1,content:{currentTime:"Current Time",duration:"Duration",next:"Next",pause:"Pause",play:"Play",previous:"Previous"}}},AVComponent.prototype.set=function(data){this._propertiesChanged(data,["helper"])?($.extend(this._data,data),this._reset()):$.extend(this._data,data),this._update(),this._resize()},AVComponent.prototype._propertiesChanged=function(data,properties){for(var propChanged=!1,i=0;i<properties.length&&!(propChanged=this._propertyChanged(data,properties[i]));i++);return propChanged},AVComponent.prototype._propertyChanged=function(data,propertyName){return!!data[propertyName]&&this._data[propertyName]!==data[propertyName]},AVComponent.prototype._reset=function(){for(var i=0;i<this.canvasInstances.length;i++){var canvasInstance=this.canvasInstances[i];canvasInstance.destroy()}this.canvasInstances=[],this._$element.empty();for(var canvases=this._getCanvases(),i=0;i<canvases.length;i++)this._initCanvas(canvases[i])},AVComponent.prototype._update=function(){for(var i=0;i<this.canvasInstances.length;i++){var canvasInstance=this.canvasInstances[i];canvasInstance.set(this._data)}},AVComponent.prototype._getCanvases=function(){return this._data.helper?this._data.helper.getCanvases():[]},AVComponent.prototype._initCanvas=function(canvas){var _this=this,canvasInstance=new IIIFComponents.CanvasInstance({target:document.createElement("div"),data:Object.assign({},{canvas:canvas},this._data)});canvasInstance.logMessage=this._logMessage.bind(this),this._$element.append(canvasInstance.$playerElement),canvasInstance.init(),this.canvasInstances.push(canvasInstance),canvasInstance.on(AVComponent.Events.CANVASREADY,function(){_this.fire(AVComponent.Events.CANVASREADY)},!1),canvasInstance.on(AVComponent.Events.PREVIOUS_RANGE,function(){_this._prevRange()},!1),canvasInstance.on(AVComponent.Events.NEXT_RANGE,function(){_this._nextRage()},!1)},AVComponent.prototype._prevRange=function(){if(this._data&&this._data.helper){var prevRange=this._data.helper.getPreviousRange();if(prevRange){var canvasIds=prevRange.getCanvasIds();canvasIds.length&&(this._data.helper.rangeId=prevRange.id,this.playCanvas(canvasIds[0]),this.fire(AVComponent.Events.PREVIOUS_RANGE))}else this._rewind()}},AVComponent.prototype._nextRage=function(){if(this._data&&this._data.helper){var nextRange=this._data.helper.getNextRange();if(nextRange){var canvasIds=nextRange.getCanvasIds();canvasIds.length&&(this._data.helper.rangeId=nextRange.id,this.playCanvas(canvasIds[0]),this.fire(AVComponent.Events.NEXT_RANGE))}}},AVComponent.prototype.getCanvasInstanceById=function(canvasId){canvasId=manifesto.Utils.normaliseUrl(canvasId);for(var i=0;i<this.canvasInstances.length;i++){var canvasInstance=this.canvasInstances[i],id=canvasInstance.getCanvasId();if(id){var canvasInstanceId=manifesto.Utils.normaliseUrl(id);if(canvasInstanceId===canvasId)return canvasInstance}}return null},AVComponent.prototype._getCurrentCanvas=function(){return this._currentCanvas?this.getCanvasInstanceById(this._currentCanvas):null},AVComponent.prototype._rewind=function(){if(!this._data.limitToRange){var canvasInstance=this._getCurrentCanvas();canvasInstance&&(canvasInstance.unhighlightDuration(),canvasInstance.rewind())}},AVComponent.prototype.playCanvas=function(canvasId){this.showCanvas(canvasId);var canvasInstance=this.getCanvasInstanceById(canvasId);if(canvasInstance){this._currentCanvas=canvasId;var temporal=/t=([^&]+)/g.exec(canvasId);if(temporal&&temporal.length>1){var rangeTiming=temporal[1].split(","),duration=new IIIFComponents.AVComponentObjects.Duration(Number(rangeTiming[0]),Number(rangeTiming[1]));canvasInstance.currentDuration=duration,canvasInstance.highlightDuration(),canvasInstance.setCurrentTime(duration.start),canvasInstance.play()}}},AVComponent.prototype.playRange=function(rangeId){if(this._data&&this._data.helper){var range=this._data.helper.getRangeById(rangeId);if(range&&(this._data.helper.rangeId=rangeId,range.canvases)){var canvasId=range.canvases[0];this.playCanvas(canvasId)}}},AVComponent.prototype.showCanvas=function(canvasId){for(var i=0;i<this.canvasInstances.length;i++)this.canvasInstances[i].pause();this._$element.find(".player").hide();var canvasInstance=this.getCanvasInstanceById(canvasId);canvasInstance&&canvasInstance.$playerElement&&canvasInstance.$playerElement.show()},AVComponent.prototype._logMessage=function(message){this.fire(AVComponent.Events.LOG,message)},AVComponent.prototype.resize=function(){this._resize()},AVComponent.prototype._resize=function(){for(var i=0;i<this.canvasInstances.length;i++){var canvasInstance=this.canvasInstances[i];canvasInstance.resize()}},AVComponent}(_Components.BaseComponent);IIIFComponents.AVComponent=AVComponent}(IIIFComponents||(IIIFComponents={})),function(IIIFComponents){var AVComponent;!function(AVComponent){var Events=function(){function Events(){}return Events.CANVASREADY="canvasready",Events.LOG="log",Events.NEXT_RANGE="nextrange",Events.PAUSECANVAS="pause",Events.PLAYCANVAS="play",Events.PREVIOUS_RANGE="previousrange",Events}();AVComponent.Events=Events}(AVComponent=IIIFComponents.AVComponent||(IIIFComponents.AVComponent={}))}(IIIFComponents||(IIIFComponents={})),function(g){g.IIIFComponents?g.IIIFComponents.AVComponent=IIIFComponents.AVComponent:g.IIIFComponents=IIIFComponents}(global);var IIIFComponents,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(IIIFComponents){var AVVolumeControl=function(_super){function AVVolumeControl(options){var _this=_super.call(this,options)||this;return _this._state={currentVolume:1,lastVolume:1},_this._init(),_this._resize(),_this}return __extends(AVVolumeControl,_super),AVVolumeControl.prototype._init=function(){var _this=this,success=_super.prototype._init.call(this);success||console.error("Component failed to initialise"),this._$volumeMute=$('<button class="btn volume-mute"><i class="av-icon-mute on" aria-hidden="true"></i></button>'),this._$volumeSlider=$('<input type="range" class="volume-slider" min="0" max="1" step="0.01" value="1">'),this._$element.append(this._$volumeMute,this._$volumeSlider);var that=this;return this._$volumeMute.on("click",function(){0!==_this._state.currentVolume?(_this._state.lastVolume=_this._state.currentVolume,_this._state.currentVolume=0):_this._state.currentVolume=_this._state.lastVolume,_this._render(),_this.fire(AVVolumeControl.Events.VOLUME_CHANGED,_this._state.currentVolume)}),this._$volumeSlider.on("input",function(){that._state.currentVolume=Number(this.value),0===that._state.currentVolume&&(that._state.lastVolume=0),that._render(),that.fire(AVVolumeControl.Events.VOLUME_CHANGED,that._state.currentVolume)}),this._$volumeSlider.on("change",function(){that._state.currentVolume=Number(this.value),0===that._state.currentVolume&&(that._state.lastVolume=0),that._render(),that.fire(AVVolumeControl.Events.VOLUME_CHANGED,that._state.currentVolume)}),success},AVVolumeControl.prototype._render=function(){this._$volumeSlider.val(this._state.currentVolume),0===this._state.currentVolume?this._$volumeMute.find("i").switchClass("on","off"):this._$volumeMute.find("i").switchClass("off","on")},AVVolumeControl.prototype._resize=function(){},AVVolumeControl}(_Components.BaseComponent);IIIFComponents.AVVolumeControl=AVVolumeControl}(IIIFComponents||(IIIFComponents={})),function(IIIFComponents){var AVVolumeControl;!function(AVVolumeControl){var Events=function(){function Events(){}return Events.VOLUME_CHANGED="volumechanged",Events}();AVVolumeControl.Events=Events}(AVVolumeControl=IIIFComponents.AVVolumeControl||(IIIFComponents.AVVolumeControl={}))}(IIIFComponents||(IIIFComponents={}));var IIIFComponents,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(IIIFComponents){var CanvasInstance=function(_super){function CanvasInstance(options){var _this=_super.call(this,options)||this;return _this._highPriorityFrequency=25,_this._lowPriorityFrequency=100,_this._canvasClockDuration=0,_this._canvasClockFrequency=25,_this._canvasClockStartDate=0,_this._canvasClockTime=0,_this._canvasHeight=0,_this._canvasWidth=0,_this._isPlaying=!1,_this._isStalled=!1,_this._readyCanvasesCount=0,_this._stallRequestedBy=[],_this._wasPlaying=!1,_this.currentDuration=null,_this.$playerElement=$('<div class="player"></div>'),_this}return __extends(CanvasInstance,_super),CanvasInstance.prototype.init=function(){var _this=this;this._$canvasContainer=$('<div class="canvas-container"></div>'),this._$optionsContainer=$('<div class="options-container"></div>'),this._$rangeTimelineContainer=$('<div class="range-timeline-container"></div>'),this._$canvasTimelineContainer=$('<div class="canvas-timeline-container"></div>'),this._$durationHighlight=$('<div class="duration-highlight"></div>'),this._$timelineItemContainer=$('<div class="timeline-item-container"></div>'),this._$controlsContainer=$('<div class="controls-container"></div>'),this._$prevButton=$('<button class="btn"><i class="av-icon-previous" aria-hidden="true"></i></button>'),this._$playButton=$('<button class="btn"><i class="av-icon-play play" aria-hidden="true"></i></button>'),this._$nextButton=$('<button class="btn"><i class="av-icon-next" aria-hidden="true"></i></button>'),this._$timingControls=$("<span>"+this.options.data.content.currentTime+': <span class="canvas-time"></span> / '+this.options.data.content.duration+': <span class="canvas-duration"></span></span>'),this._$canvasTime=this._$timingControls.find(".canvas-time"),this._$canvasDuration=this._$timingControls.find(".canvas-duration");var $volume=$('<div class="volume"></div>');this._volume=new IIIFComponents.AVVolumeControl({target:$volume[0]}),this._volume.on(IIIFComponents.AVVolumeControl.Events.VOLUME_CHANGED,function(value){_this.setVolume(value)},!1),this._$controlsContainer.append(this._$prevButton,this._$playButton,this._$nextButton,this._$timingControls,$volume),this._$canvasTimelineContainer.append(this._$durationHighlight),this._$optionsContainer.append(this._$canvasTimelineContainer,this._$rangeTimelineContainer,this._$timelineItemContainer,this._$controlsContainer),this.$playerElement.append(this._$canvasContainer,this._$optionsContainer),this._canvasClockDuration=this.options.data.canvas.getDuration();var canvasWidth=this.options.data.canvas.getWidth(),canvasHeight=this.options.data.canvas.getHeight();canvasWidth?this._canvasWidth=canvasWidth:this._canvasWidth=this.$playerElement.parent().width(),canvasHeight?this._canvasHeight=canvasHeight:this._canvasHeight=this._canvasWidth*this.options.data.defaultAspectRatio;var that=this,prevClicks=0,prevTimeout=0;this._$prevButton.on("click",function(){prevClicks++,1===prevClicks?(_this._previous(!1),prevTimeout=setTimeout(function(){prevClicks=0,prevTimeout=0},_this.options.data.doubleClickMS)):(_this._previous(!0),clearTimeout(prevTimeout),prevClicks=0,prevTimeout=0)}),this._$playButton.on("click",function(){_this._isPlaying?_this.pause():_this.play()}),this._$nextButton.on("click",function(){_this.fire(IIIFComponents.AVComponent.Events.NEXT_RANGE)}),this._$canvasTimelineContainer.slider({value:0,step:.01,orientation:"horizontal",range:"min",max:that._canvasClockDuration,animate:!1,create:function(evt,ui){},slide:function(evt,ui){that.setCurrentTime(ui.value)},stop:function(evt,ui){}}),this._contentAnnotations=[];var items=this.options.data.canvas.__jsonld.content[0].items;1===items.length&&this._$timelineItemContainer.hide();for(var i=0;i<items.length;i++){var item=items[i],mediaSource=void 0;if(Array.isArray(item.body)&&"choice"===item.body[0].type.toLowerCase()){var tmpItem=item;item.body=tmpItem.body[0].items[0],mediaSource=item.body.id.split("#")[0]}else mediaSource="textualbody"===item.body.type.toLowerCase()?item.body.value:item.body.id.split("#")[0];var spatial=/xywh=([^&]+)/g.exec(item.target),temporal=/t=([^&]+)/g.exec(item.target),xywh=void 0;xywh=spatial&&spatial[1]?spatial[1].split(","):[0,0,this._canvasWidth,this._canvasHeight];var t=void 0;t=temporal&&temporal[1]?temporal[1].split(","):[0,this._canvasClockDuration];var positionLeft=parseInt(xywh[0]),positionTop=parseInt(xywh[1]),mediaWidth=parseInt(xywh[2]),mediaHeight=parseInt(xywh[3]),startTime=parseInt(t[0]),endTime=parseInt(t[1]),percentageTop=this._convertToPercentage(positionTop,this._canvasHeight),percentageLeft=this._convertToPercentage(positionLeft,this._canvasWidth),percentageWidth=this._convertToPercentage(mediaWidth,this._canvasWidth),percentageHeight=this._convertToPercentage(mediaHeight,this._canvasHeight),temporalOffsets=/t=([^&]+)/g.exec(item.body.id),ot=void 0;ot=temporalOffsets&&temporalOffsets[1]?temporalOffsets[1].split(","):[null,null];var offsetStart=ot[0]?parseInt(ot[0]):ot[0],offsetEnd=ot[1]?parseInt(ot[1]):ot[1],itemData={type:item.body.type,source:mediaSource,start:startTime,end:endTime,top:percentageTop,left:percentageLeft,width:percentageWidth,height:percentageHeight,startOffset:offsetStart,endOffset:offsetEnd,active:!1};this._renderMediaElement(itemData)}},CanvasInstance.prototype.getCanvasId=function(){return this.options.data.canvas.id},CanvasInstance.prototype._previous=function(isDouble){this._isLimitedToRange()&&this.currentDuration?isDouble?this.fire(IIIFComponents.AVComponent.Events.PREVIOUS_RANGE):this.rewind():this.currentDuration?isDouble?(this.unhighlightDuration(),this.rewind()):this.fire(IIIFComponents.AVComponent.Events.PREVIOUS_RANGE):this.rewind()},CanvasInstance.prototype.set=function(data){data&&(this.options.data=Object.assign({},this.options.data,data)),this._isLimitedToRange()&&this.currentDuration?(this._$canvasTimelineContainer.hide(),this._$rangeTimelineContainer.show()):(this._$canvasTimelineContainer.show(),this._$rangeTimelineContainer.hide()),this._updateCurrentTimeDisplay(),this._updateDurationDisplay()},CanvasInstance.prototype.destroy=function(){window.clearInterval(this._highPriorityInterval),window.clearInterval(this._lowPriorityInterval),window.clearInterval(this._canvasClockInterval)},CanvasInstance.prototype._convertToPercentage=function(pixelValue,maxValue){var percentage=pixelValue/maxValue*100;return percentage},CanvasInstance.prototype._renderMediaElement=function(data){var $mediaElement;switch(data.type.toLowerCase()){case"image":$mediaElement=$('<img class="anno" src="'+data.source+'" />');break;case"video":$mediaElement=$('<video class="anno" src="'+data.source+'" />');break;case"audio":$mediaElement=$('<audio class="anno" src="'+data.source+'" />');break;case"textualbody":$mediaElement=$('<div class="anno">'+data.source+"</div>");break;default:return}if($mediaElement.css({top:data.top+"%",left:data.left+"%",width:data.width+"%",height:data.height+"%"}).hide(),data.element=$mediaElement,"video"===data.type.toLowerCase()||"audio"===data.type.toLowerCase()){data.timeout=null;var that_1=this;data.checkForStall=function(){var self=this;this.active?(that_1._checkMediaSynchronization(),this.element.get(0).readyState>0&&!this.outOfSync?that_1._playbackStalled(!1,self):(that_1._playbackStalled(!0,self),this.timeout&&window.clearTimeout(this.timeout),this.timeout=window.setTimeout(function(){self.checkForStall()},1e3))):that_1._playbackStalled(!1,self)}}if(this._contentAnnotations.push(data),this.$playerElement&&this._$canvasContainer.append($mediaElement),"video"===data.type.toLowerCase()||"audio"===data.type.toLowerCase()){var that_2=this,self_1=data;$mediaElement.on("loadstart",function(){self_1.checkForStall()}),$mediaElement.on("waiting",function(){self_1.checkForStall()}),$mediaElement.on("seeking",function(){}),$mediaElement.on("loadedmetadata",function(){that_2._readyCanvasesCount++,that_2._readyCanvasesCount===that_2._contentAnnotations.length&&(that_2.setCurrentTime(0),that_2.options.data.autoPlay&&that_2.play(),that_2._updateDurationDisplay(),that_2.fire(IIIFComponents.AVComponent.Events.CANVASREADY))}),$mediaElement.attr("preload","auto"),$mediaElement.get(0).load()}this._renderSyncIndicator(data)},CanvasInstance.prototype._updateCurrentTimeDisplay=function(){if(this._isLimitedToRange()&&this.currentDuration){var rangeClockTime=this._canvasClockTime-this.currentDuration.start;this._$canvasTime.text(IIIFComponents.AVComponentUtils.Utils.formatTime(rangeClockTime))}else this._$canvasTime.text(IIIFComponents.AVComponentUtils.Utils.formatTime(this._canvasClockTime))},CanvasInstance.prototype._updateDurationDisplay=function(){this._isLimitedToRange()&&this.currentDuration?this._$canvasDuration.text(IIIFComponents.AVComponentUtils.Utils.formatTime(this.currentDuration.getLength())):this._$canvasDuration.text(IIIFComponents.AVComponentUtils.Utils.formatTime(this._canvasClockDuration))},CanvasInstance.prototype.unhighlightDuration=function(){this.currentDuration=null,this.options.data&&this.options.data.helper&&(this.options.data.helper.rangeId=null),this._$durationHighlight.hide()},CanvasInstance.prototype.highlightDuration=function(){if(this.currentDuration){var totalLength=this._canvasClockDuration,timelineLength=this._$canvasTimelineContainer.width(),ratio=timelineLength/totalLength,start=this.currentDuration.start*ratio,end=this.currentDuration.end*ratio,width=end-start;this._$durationHighlight.show(),this._$durationHighlight.css({left:start,width:width});var that=this;this._$rangeTimelineContainer.slider("destroy"),this._$rangeTimelineContainer.slider({value:this.currentDuration.start,step:.01,orientation:"horizontal",range:"min",min:this.currentDuration.start,max:this.currentDuration.end,animate:!1,create:function(evt,ui){},slide:function(evt,ui){that.setCurrentTime(ui.value)},stop:function(evt,ui){}}),this.set({})}},CanvasInstance.prototype.setVolume=function(value){for(var i=0;i<this._contentAnnotations.length;i++){var $mediaElement=this._contentAnnotations[i];$($mediaElement.element).prop("volume",value)}},CanvasInstance.prototype._renderSyncIndicator=function(mediaElementData){var leftPercent=this._convertToPercentage(mediaElementData.start,this._canvasClockDuration),widthPercent=this._convertToPercentage(mediaElementData.end-mediaElementData.start,this._canvasClockDuration),$timelineItem=$('<div class="timeline-item" title="'+mediaElementData.source+'" data-start="'+mediaElementData.start+'" data-end="'+mediaElementData.end+'"></div>');$timelineItem.css({left:leftPercent+"%",width:widthPercent+"%"});var $lineWrapper=$('<div class="line-wrapper"></div>');$timelineItem.appendTo($lineWrapper),mediaElementData.timelineElement=$timelineItem,this.$playerElement&&this._$timelineItemContainer.append($lineWrapper)},CanvasInstance.prototype.setCurrentTime=function(seconds){this._canvasClockTime=seconds,this._canvasClockStartDate=Date.now()-1e3*this._canvasClockTime,this.logMessage("SET CURRENT TIME to: "+this._canvasClockTime+" seconds."),this._canvasClockUpdater(),this._highPriorityUpdater(),this._lowPriorityUpdater(),this._synchronizeMedia()},CanvasInstance.prototype.rewind=function(withoutUpdate){this.pause(),this._isLimitedToRange()&&this.currentDuration?this._canvasClockTime=this.currentDuration.start:this._canvasClockTime=0,this.play()},CanvasInstance.prototype.play=function(withoutUpdate){if(!this._isPlaying){this._isLimitedToRange()&&this.currentDuration&&this._canvasClockTime>=this.currentDuration.end&&(this._canvasClockTime=this.currentDuration.start),this._canvasClockTime===this._canvasClockDuration&&(this._canvasClockTime=0),this._canvasClockStartDate=Date.now()-1e3*this._canvasClockTime;var self=this;this._highPriorityInterval=window.setInterval(function(){self._highPriorityUpdater()},this._highPriorityFrequency),this._lowPriorityInterval=window.setInterval(function(){self._lowPriorityUpdater()},this._lowPriorityFrequency),this._canvasClockInterval=window.setInterval(function(){self._canvasClockUpdater()},this._canvasClockFrequency),this._isPlaying=!0,withoutUpdate||this._synchronizeMedia(),this._$playButton.find("i").switchClass("play","pause"),this.fire(IIIFComponents.AVComponent.Events.PLAYCANVAS),this.logMessage("PLAY canvas")}},CanvasInstance.prototype.pause=function(withoutUpdate){window.clearInterval(this._highPriorityInterval),window.clearInterval(this._lowPriorityInterval),window.clearInterval(this._canvasClockInterval),this._isPlaying=!1,withoutUpdate||(this._highPriorityUpdater(),this._lowPriorityUpdater(),this._synchronizeMedia()),this._$playButton.find("i").switchClass("pause","play"),this.fire(IIIFComponents.AVComponent.Events.PAUSECANVAS),this.logMessage("PAUSE canvas")},CanvasInstance.prototype._isLimitedToRange=function(){return this.options.data.limitToRange},CanvasInstance.prototype._canvasClockUpdater=function(){this._canvasClockTime=(Date.now()-this._canvasClockStartDate)/1e3,this._isLimitedToRange()&&this.currentDuration&&this._canvasClockTime>=this.currentDuration.end&&this.pause(),this._canvasClockTime>=this._canvasClockDuration&&(this._canvasClockTime=this._canvasClockDuration,this.pause())},CanvasInstance.prototype._highPriorityUpdater=function(){this._$rangeTimelineContainer.slider({value:this._canvasClockTime}),this._$canvasTimelineContainer.slider({value:this._canvasClockTime}),this._updateCurrentTimeDisplay(),this._updateDurationDisplay()},CanvasInstance.prototype._lowPriorityUpdater=function(){this._updateMediaActiveStates()},CanvasInstance.prototype._updateMediaActiveStates=function(){for(var contentAnnotation,i=0;i<this._contentAnnotations.length;i++)contentAnnotation=this._contentAnnotations[i],contentAnnotation.start<=this._canvasClockTime&&contentAnnotation.end>=this._canvasClockTime?(this._checkMediaSynchronization(),contentAnnotation.active||(this._synchronizeMedia(),contentAnnotation.active=!0,contentAnnotation.element.show(),contentAnnotation.timelineElement.addClass("active")),"Video"!=contentAnnotation.type&&"Audio"!=contentAnnotation.type||contentAnnotation.element[0].currentTime>contentAnnotation.element[0].duration-contentAnnotation.endOffset&&contentAnnotation.element[0].pause()):contentAnnotation.active&&(contentAnnotation.active=!1,contentAnnotation.element.hide(),contentAnnotation.timelineElement.removeClass("active"),"Video"!=contentAnnotation.type&&"Audio"!=contentAnnotation.type||contentAnnotation.element[0].pause())},CanvasInstance.prototype._synchronizeMedia=function(){for(var contentAnnotation,i=0;i<this._contentAnnotations.length;i++)if(contentAnnotation=this._contentAnnotations[i],"video"===contentAnnotation.type.toLowerCase()||"audio"===contentAnnotation.type.toLowerCase()){if(contentAnnotation.element[0].currentTime=this._canvasClockTime-contentAnnotation.start+contentAnnotation.startOffset,contentAnnotation.start<=this._canvasClockTime&&contentAnnotation.end>=this._canvasClockTime)if(this._isPlaying){if(contentAnnotation.element[0].paused){var promise=contentAnnotation.element[0].play();promise&&promise["catch"](function(){})}}else contentAnnotation.element[0].pause();else contentAnnotation.element[0].pause();contentAnnotation.element[0].currentTime>contentAnnotation.element[0].duration-contentAnnotation.endOffset&&contentAnnotation.element[0].pause()}this.logMessage("SYNC MEDIA at: "+this._canvasClockTime+" seconds.")},CanvasInstance.prototype._checkMediaSynchronization=function(){for(var contentAnnotation,i=0,l=this._contentAnnotations.length;i<l;i++)if(contentAnnotation=this._contentAnnotations[i],("video"===contentAnnotation.type.toLowerCase()||"audio"===contentAnnotation.type.toLowerCase())&&contentAnnotation.start<=this._canvasClockTime&&contentAnnotation.end>=this._canvasClockTime){var correctTime=this._canvasClockTime-contentAnnotation.start+contentAnnotation.startOffset,factualTime=contentAnnotation.element[0].currentTime;if(Math.abs(factualTime-correctTime)>.4){contentAnnotation.outOfSync=!0;var lag=Math.abs(factualTime-correctTime);this.logMessage("DETECTED synchronization lag: "+Math.abs(lag)),contentAnnotation.element[0].currentTime=correctTime}else contentAnnotation.outOfSync=!1}},CanvasInstance.prototype._playbackStalled=function(aBoolean,syncMediaRequestingStall){if(aBoolean)this._stallRequestedBy.indexOf(syncMediaRequestingStall)<0&&this._stallRequestedBy.push(syncMediaRequestingStall),this._isStalled||(this.$playerElement&&this._showWorkingIndicator(this._$canvasContainer),this._wasPlaying=this._isPlaying,this.pause(!0),this._isStalled=aBoolean);else{var idx=this._stallRequestedBy.indexOf(syncMediaRequestingStall);idx>=0&&this._stallRequestedBy.splice(idx,1),0===this._stallRequestedBy.length&&(this._hideWorkingIndicator(),this._isStalled&&this._wasPlaying&&this.play(!0),this._isStalled=aBoolean)}},CanvasInstance.prototype._showWorkingIndicator=function($targetElement){var workingIndicator=$('<div class="working-indicator">Waiting...</div>');0==$targetElement.find(".working-indicator").length&&$targetElement.append(workingIndicator)},CanvasInstance.prototype._hideWorkingIndicator=function(){$(".workingIndicator").remove()},CanvasInstance.prototype.resize=function(){if(this.$playerElement){var containerWidth=this._$canvasContainer.width();if(containerWidth){this._$canvasTimelineContainer.width(containerWidth);var $options=this.$playerElement.find(".options-container");this._$canvasContainer.height(this.$playerElement.parent().height()-$options.height())}this.highlightDuration()}},CanvasInstance}(_Components.BaseComponent);IIIFComponents.CanvasInstance=CanvasInstance}(IIIFComponents||(IIIFComponents={}));var IIIFComponents;!function(IIIFComponents){var AVComponentObjects;!function(AVComponentObjects){var Duration=function(){function Duration(start,end){this.start=start,this.end=end}return Duration.prototype.getLength=function(){return this.end-this.start},Duration}();AVComponentObjects.Duration=Duration}(AVComponentObjects=IIIFComponents.AVComponentObjects||(IIIFComponents.AVComponentObjects={}))}(IIIFComponents||(IIIFComponents={}));var IIIFComponents;!function(IIIFComponents){var AVComponentUtils;!function(AVComponentUtils){var Utils=function(){function Utils(){}return Utils.formatTime=function(aNumber){var hours,minutes,seconds,hourValue;return seconds=Math.ceil(aNumber),hours=Math.floor(seconds/3600),hours=hours>=10?hours:"0"+hours,minutes=Math.floor(seconds%3600/60),minutes=minutes>=10?minutes:"0"+minutes,seconds=Math.floor(seconds%3600%60),seconds=seconds>=10?seconds:"0"+seconds,hourValue=hours>=1?hours+":":"",hourValue+minutes+":"+seconds},Utils}();AVComponentUtils.Utils=Utils}(AVComponentUtils=IIIFComponents.AVComponentUtils||(IIIFComponents.AVComponentUtils={}))}(IIIFComponents||(IIIFComponents={}))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});