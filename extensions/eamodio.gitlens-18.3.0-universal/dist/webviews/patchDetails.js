let e,t,i,r,o,s,n,a,c,h;var p,u,g,f,m,b,_={518(e){function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,r="",o=0,s=-1,n=0,a=0;a<=e.length;++a){if(a<e.length)i=e.charCodeAt(a);else if(47===i)break;else i=47;if(47===i){if(s===a-1||1===n);else if(s!==a-1&&2===n){if(r.length<2||2!==o||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){var c=r.lastIndexOf("/");if(c!==r.length-1){-1===c?(r="",o=0):o=(r=r.slice(0,c)).length-1-r.lastIndexOf("/"),s=a,n=0;continue}}else if(2===r.length||1===r.length){r="",o=0,s=a,n=0;continue}}t&&(r.length>0?r+="/..":r="..",o=2)}else r.length>0?r+="/"+e.slice(s+1,a):r=e.slice(s+1,a),o=a-s-1;s=a,n=0}else 46===i&&-1!==n?++n:n=-1}return r}var r={resolve:function(){for(var e,r,o="",s=!1,n=arguments.length-1;n>=-1&&!s;n--)n>=0?r=arguments[n]:(void 0===e&&(e=process.cwd()),r=e),t(r),0!==r.length&&(o=r+"/"+o,s=47===r.charCodeAt(0));if(o=i(o,!s),s)if(o.length>0)return"/"+o;else return"/";return o.length>0?o:"."},normalize:function(e){if(t(e),0===e.length)return".";var r=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return(0!==(e=i(e,!r)).length||r||(e="."),e.length>0&&o&&(e+="/"),r)?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var o=arguments[i];t(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":r.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=r.resolve(e))===(i=r.resolve(i)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var s=e.length,n=s-o,a=1;a<i.length&&47===i.charCodeAt(a);++a);for(var c=i.length-a,h=n<c?n:c,p=-1,u=0;u<=h;++u){if(u===h){if(c>h){if(47===i.charCodeAt(a+u))return i.slice(a+u+1);else if(0===u)return i.slice(a+u)}else n>h&&(47===e.charCodeAt(o+u)?p=u:0===u&&(p=0));break}var g=e.charCodeAt(o+u);if(g!==i.charCodeAt(a+u))break;47===g&&(p=u)}var f="";for(u=o+p+1;u<=s;++u)(u===s||47===e.charCodeAt(u))&&(0===f.length?f+="..":f+="/..");return f.length>0?f+i.slice(a+p):(a+=p,47===i.charCodeAt(a)&&++a,i.slice(a))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),r=47===i,o=-1,s=!0,n=e.length-1;n>=1;--n)if(47===(i=e.charCodeAt(n))){if(!s){o=n;break}}else s=!1;return -1===o?r?"/":".":r&&1===o?"//":e.slice(0,o)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var r,o=0,s=-1,n=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var a=i.length-1,c=-1;for(r=e.length-1;r>=0;--r){var h=e.charCodeAt(r);if(47===h){if(!n){o=r+1;break}}else -1===c&&(n=!1,c=r+1),a>=0&&(h===i.charCodeAt(a)?-1==--a&&(s=r):(a=-1,s=c))}return o===s?s=c:-1===s&&(s=e.length),e.slice(o,s)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!n){o=r+1;break}}else -1===s&&(n=!1,s=r+1);return -1===s?"":e.slice(o,s)},extname:function(e){t(e);for(var i=-1,r=0,o=-1,s=!0,n=0,a=e.length-1;a>=0;--a){var c=e.charCodeAt(a);if(47===c){if(!s){r=a+1;break}continue}-1===o&&(s=!1,o=a+1),46===c?-1===i?i=a:1!==n&&(n=1):-1!==i&&(n=-1)}return -1===i||-1===o||0===n||1===n&&i===o-1&&i===r+1?"":e.slice(i,o)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i,r={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return r;var o=e.charCodeAt(0),s=47===o;s?(r.root="/",i=1):i=0;for(var n=-1,a=0,c=-1,h=!0,p=e.length-1,u=0;p>=i;--p){if(47===(o=e.charCodeAt(p))){if(!h){a=p+1;break}continue}-1===c&&(h=!1,c=p+1),46===o?-1===n?n=p:1!==u&&(u=1):-1!==n&&(u=-1)}return -1===n||-1===c||0===u||1===u&&n===c-1&&n===a+1?-1!==c&&(0===a&&s?r.base=r.name=e.slice(1,c):r.base=r.name=e.slice(a,c)):(0===a&&s?(r.name=e.slice(1,n),r.base=e.slice(1,c)):(r.name=e.slice(a,n),r.base=e.slice(a,c)),r.ext=e.slice(n,c)),a>0?r.dir=e.slice(0,a-1):s&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,e.exports=r},285(e,t,i){i.d(t,{FlowLayout:()=>FlowLayout,flow:()=>o}),i.r(t);let SizeCache=class SizeCache{constructor(e){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,e?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(e,t){let i=this._map.get(e)||0;this._map.set(e,t),this.totalSize+=t-i}get averageSize(){if(this._map.size>0){let e=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(e):e}return 0}getSize(e){return this._map.get(e)}clear(){this._map.clear(),this.totalSize=0}};function r(e){return"horizontal"===e?"width":"height"}let BaseLayout=class BaseLayout{_getDefaultConfig(){return{direction:"vertical"}}constructor(e,t){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=e,Promise.resolve().then(()=>this.config=t||this._getDefaultConfig())}set config(e){Object.assign(this,Object.assign({},this._getDefaultConfig(),e))}get config(){return{direction:this.direction}}get items(){return this._items}set items(e){this._setItems(e)}_setItems(e){e!==this._items&&(this._items=e,this._scheduleReflow())}get direction(){return this._direction}set direction(e){(e="horizontal"===e?e:"vertical")!==this._direction&&(this._direction=e,this._sizeDim="horizontal"===e?"width":"height",this._secondarySizeDim="horizontal"===e?"height":"width",this._positionDim="horizontal"===e?"left":"top",this._secondaryPositionDim="horizontal"===e?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(e){let{_viewDim1:t,_viewDim2:i}=this;Object.assign(this._viewportSize,e),i!==this._viewDim2?this._scheduleLayoutUpdate():t!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(e){Object.assign(this._latestCoords,e);let t=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(t-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(e=!1){(e||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(e){this._pin=e,this._triggerReflow()}get pin(){if(null!==this._pin){let{index:e,block:t}=this._pin;return{index:Math.max(0,Math.min(e,this.items.length-1)),block:t}}return null}_clampScrollPosition(e){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(e,this.totalScrollSize[r(this.direction)]-this._viewDim1))}unpin(){null!==this._pin&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(null!==this.pin){let e=this._scrollPosition,{index:t,block:i}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:t,block:i||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=e-this._scrollPosition}}_calculateScrollIntoViewPosition(e){let{block:t}=e,i=Math.min(this.items.length,Math.max(0,e.index)),r=this._getItemPosition(i)[this._positionDim],o=r;if("start"!==t){let e=this._getItemSize(i)[this._sizeDim];if("center"===t)o=r-.5*this._viewDim1+.5*e;else{let i=r-this._viewDim1+e;if("end"===t)o=i;else{let e=this._scrollPosition;o=Math.abs(e-r)<Math.abs(e-i)?r:i}}}return o+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(o)}getScrollIntoViewCoordinates(e){return{[this._positionDim]:this._calculateScrollIntoViewPosition(e)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let e=new Map;if(-1!==this._first&&-1!==this._last)for(let t=this._first;t<=this._last;t++)e.set(t,this._getItemPosition(t));let t={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:e};this._scrollError&&(t.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(t)}get _num(){return -1===this._first||-1===this._last?0:this._last-this._first+1}_checkThresholds(){if(0===this._viewDim1&&this._num>0||null!==this._pin)this._scheduleReflow();else{let e=Math.max(0,this._scrollPosition-this._overhang),t=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>e||this._physicalMax<t?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(e){if(-1===this._first||-1===this._last)return;let t=this._first;for(;t<this._last&&Math.round(this._getItemPosition(t)[this._positionDim]+this._getItemSize(t)[this._sizeDim])<=Math.round(this._scrollPosition);)t++;let i=this._last;for(;i>this._first&&Math.round(this._getItemPosition(i)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)i--;(t!==this._firstVisible||i!==this._lastVisible)&&(this._firstVisible=t,this._lastVisible=i,e&&e.emit&&this._sendVisibilityChangedMessage())}};let o=e=>Object.assign({type:FlowLayout},e);function s(e){return"horizontal"===e?"marginLeft":"marginTop"}let MetricsCache=class MetricsCache{constructor(){this._childSizeCache=new SizeCache,this._marginSizeCache=new SizeCache,this._metricsCache=new Map}update(e,t){let i=new Set;for(let o of(Object.keys(e).forEach(o=>{let s=Number(o);this._metricsCache.set(s,e[s]),this._childSizeCache.set(s,e[s][r(t)]),i.add(s),i.add(s+1)}),i)){let e=this._metricsCache.get(o)?.[s(t)]||0,i=this._metricsCache.get(o-1)?.["horizontal"===t?"marginRight":"marginBottom"]||0;this._marginSizeCache.set(o,function(e,t){let i=[e,t].sort();return i[1]<=0?Math.min(...i):i[0]>=0?Math.max(...i):i[0]+i[1]}(e,i))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(e,t){return this._metricsCache.get(e)?.[s(t)]||0}getChildSize(e){return this._childSizeCache.getSize(e)}getMarginSize(e){return this._marginSizeCache.getSize(e)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}};let FlowLayout=class FlowLayout extends BaseLayout{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new MetricsCache,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(e){this._metricsCache.update(e,this.direction),this._scheduleReflow()}_getPhysicalItem(e){return this._newPhysicalItems.get(e)??this._physicalItems.get(e)}_getSize(e){return this._getPhysicalItem(e)&&this._metricsCache.getChildSize(e)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(e){let t=this._metricsCache;if(-1===this._first||-1===this._last)return t.averageMarginSize+e*(t.averageMarginSize+this._getAverageSize());if(e<this._first){let i=this._first-e;return this._getPhysicalItem(this._first).pos-(t.getMarginSize(this._first-1)||t.averageMarginSize)-(i*t.averageChildSize+(i-1)*t.averageMarginSize)}{let i=e-this._last;return this._getPhysicalItem(this._last).pos+(t.getChildSize(this._last)||t.averageChildSize)+(t.getMarginSize(this._last)||t.averageMarginSize)+i*(t.averageChildSize+t.averageMarginSize)}}_getPosition(e){let t=this._getPhysicalItem(e),{averageMarginSize:i}=this._metricsCache;return 0===e?this._metricsCache.getMarginSize(0)??i:t?t.pos:this._estimatePosition(e)}_calculateAnchor(e,t){return e<=0?0:t>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((e+t)/2/this._delta)))}_getAnchor(e,t){if(0===this._physicalItems.size||this._first<0||this._last<0)return this._calculateAnchor(e,t);let i=this._getPhysicalItem(this._first),r=this._getPhysicalItem(this._last),o=i.pos;if(r.pos+this._metricsCache.getChildSize(this._last)<e||o>t)return this._calculateAnchor(e,t);let s=this._firstVisible-1,n=-1/0;for(;n<e;)n=this._getPhysicalItem(++s).pos+this._metricsCache.getChildSize(s);return s}_getActiveItems(){0===this._viewDim1||0===this.items.length?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let e=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e,this._stable=!0}_getItems(){let e,t,i=this._newPhysicalItems;if(this._stable=!0,null!==this.pin){let{index:e}=this.pin;this._anchorIdx=e,this._anchorPos=this._getPosition(e)}if(e=this._scrollPosition-this._overhang,(t=this._scrollPosition+this._viewDim1+this._overhang)<0||e>this._scrollSize)return void this._clearItems();(null===this._anchorIdx||null===this._anchorPos)&&(this._anchorIdx=this._getAnchor(e,t),this._anchorPos=this._getPosition(this._anchorIdx));let r=this._getSize(this._anchorIdx);void 0===r&&(this._stable=!1,r=this._getAverageSize());let o=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,s=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;0===this._anchorIdx&&(this._anchorPos=o),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-s-r);let n=0;for(this._anchorPos+r+s<e&&(n=e-(this._anchorPos+r+s)),this._anchorPos-o>t&&(n=t-(this._anchorPos-o)),n&&(this._scrollPosition-=n,e-=n,t-=n,this._scrollError+=n),i.set(this._anchorIdx,{pos:this._anchorPos,size:r}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-o,this._physicalMax=this._anchorPos+r+s;this._physicalMin>e&&this._first>0;){let e=this._getSize(--this._first);void 0===e&&(this._stable=!1,e=this._getAverageSize());let t=this._metricsCache.getMarginSize(this._first);void 0===t&&(this._stable=!1,t=this._metricsCache.averageMarginSize),this._physicalMin-=e;let r=this._physicalMin;if(i.set(this._first,{pos:r,size:e}),this._physicalMin-=t,!1===this._stable&&!1===this._estimate)break}for(;this._physicalMax<t&&this._last<this.items.length-1;){let e=this._getSize(++this._last);void 0===e&&(this._stable=!1,e=this._getAverageSize());let t=this._metricsCache.getMarginSize(this._last);void 0===t&&(this._stable=!1,t=this._metricsCache.averageMarginSize);let r=this._physicalMax;if(i.set(this._last,{pos:r,size:e}),this._physicalMax+=e+t,!this._stable&&!this._estimate)break}let a=this._calculateError();a&&(this._physicalMin-=a,this._physicalMax-=a,this._anchorPos-=a,this._scrollPosition-=a,i.forEach(e=>e.pos-=a),this._scrollError+=a),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=i)}_calculateError(){return 0===this._first?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:e,_last:t}=this;super._reflow(),(-1===this._first&&-1==this._last||this._first===e&&this._last===t)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:e}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(e+this._getAverageSize())+e)}get _delta(){let{averageMarginSize:e}=this._metricsCache;return this._getAverageSize()+e}_getItemPosition(e){return{[this._positionDim]:this._getPosition(e),[this._secondaryPositionDim]:0,["horizontal"===this.direction?"xOffset":"yOffset"]:-(this._metricsCache.getLeadingMarginValue(e,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(e){return{[this._sizeDim]:this._getSize(e)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}}};let v={};function y(e){let t=v[e];if(void 0!==t)return t.exports;let i=v[e]={exports:{}};return _[e](i,i.exports,y),i.exports}function w(e,t,i){let r,o,s,n,a,c,h,p,u,g,f=0;null!=i&&({edges:c,maxWait:h,cancellation:p,aggregator:u}=i);let m="leading"===(c??="trailing")||"both"===c,b="trailing"===c||"both"===c;function _(){if(null!=r){f=Date.now();let t=r,i=g;return g=void 0,r=void 0,s=e.apply(i,t)}}function v(){null!=n&&(clearTimeout(n),n=void 0)}function y(){null!=a&&(clearTimeout(a),a=void 0)}function w(){v(),y(),g=void 0,r=void 0,o=void 0,f=0}function x(...e){if(p?.aborted)return;let i=Date.now();null!=u&&null!=r?r=u(r,e):(g=this,r=e);let c=null==n&&null==a;o=i,v();let y=Date.now();if(o=y,n=setTimeout(()=>{n=void 0,function e(){let i,r,s=Date.now();if(i=s-(o??0),r=s-f,null==o||i>=t||i<0||null!=h&&r>=h){b&&_(),w();return}n=setTimeout(()=>{n=void 0,e()},t-(s-(o??0)))}()},t),null!=h&&!a){0===f&&(f=y);let e=h-(y-f);e>0?a=setTimeout(()=>{a=void 0,b&&null!=r&&_(),f=Date.now()},e):(b&&null!=r&&_(),w())}return m&&c?_():s}return x.cancel=w,x.flush=function(){return v(),y(),_()},x.pending=function(){return null!=n||null!=a},p?.addEventListener("abort",w,{once:!0}),x}y.d=(e,t)=>{if(Array.isArray(t))for(var i=0;i<t.length;){var r=t[i++],o=t[i++];y.o(e,r)?0===o&&i++:0===o?Object.defineProperty(e,r,{enumerable:!0,value:t[i++]}):Object.defineProperty(e,r,{enumerable:!0,get:o})}else for(var r in t)y.o(t,r)&&!y.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},y.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),y.r=e=>{Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},Object.defineProperty(y,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(e){}});let IpcCall=class IpcCall{constructor(e,t,i=!1){this.scope=e,this.reset=i,this.method=`${e}/${t}`}is(e){return e.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(e,t,i){super(e,t,i),this.response=new IpcNotification(this.scope,`${t}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let x="patchDetails",C=new IpcCommand(x,"apply"),$=new IpcCommand(x,"archive"),E=new IpcCommand(x,"create");new IpcCommand(x,"openInGraph");let A=new IpcCommand(x,"checked"),P=new IpcCommand(x,"selectRepo"),T=new IpcCommand(x,"selectBase"),j=new IpcCommand(x,"file/actions/execute"),O=new IpcCommand(x,"file/open"),M=new IpcCommand(x,"file/openOnRemote"),D=new IpcCommand(x,"file/compareWorking"),B=new IpcCommand(x,"file/comparePrevious"),F=new IpcCommand(x,"preferences/update"),N=new IpcCommand(x,"switchMode"),U=new IpcCommand(x,"cloud/copyLink"),q=new IpcCommand(x,"local/createPatch"),V=new IpcCommand(x,"create/repository/check"),K=new IpcCommand(x,"update/create/metadata"),W=new IpcCommand(x,"update/draft/metadata"),G=new IpcCommand(x,"update/draft/permissions"),X=new IpcCommand(x,"update/users"),Q=new IpcCommand(x,"update/userSelection"),Y=new IpcRequest(x,"explain"),J=new IpcRequest(x,"generate"),ee=new IpcNotification(x,"didChange",!0),et=new IpcNotification(x,"create/didChange"),ei=new IpcNotification(x,"draft/didChange"),er=new IpcNotification(x,"preferences/didChange"),eo=new IpcNotification(x,"draft/didChangeRepository");new IpcNotification(x,"org/settings/didChange");let es=new IpcRequest("core","webview/ready"),en=new IpcCommand("core","webview/focus/changed"),ea=new IpcCommand("core","command/execute"),el=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let ec=new IpcCommand("core","telemetry/sendEvent"),eh=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let ed=new IpcCommand("core","webview/focus/didChange"),ep=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");var eu=Object.defineProperty,eg=(e,t,i)=>{let r;return(r="symbol"!=typeof t?t+"":t)in e?eu(e,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[r]=i,i},ef=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},em=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},eb=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot access private method");return i};function e_(e,t){return Object.is(e,t)}let ev=null,ey=!1,ew=1,ek=Symbol("SIGNAL");function ex(e){let t=ev;return ev=e,t}let eC={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function e$(e){if(ey)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===ev)return;ev.consumerOnSignalRead(e);let t=ev.nextProducerIndex++;eA(ev),t<ev.producerNode.length&&ev.producerNode[t]!==e&&eS(ev)&&eE(ev.producerNode[t],ev.producerIndexOfThis[t]),ev.producerNode[t]!==e&&(ev.producerNode[t]=e,ev.producerIndexOfThis[t]=eS(ev)?function e(t,i,r){var o;if(eI(t),eA(t),0===t.liveConsumerNode.length){null==(o=t.watched)||o.call(t.wrapper);for(let i=0;i<t.producerNode.length;i++)t.producerIndexOfThis[i]=e(t.producerNode[i],t,i)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(i)-1}(e,ev,t):0),ev.producerLastReadVersion[t]=e.version}function eE(e,t){var i;if(eI(e),eA(e),"u">typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(i=e.unwatched)||i.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)eE(e.producerNode[t],e.producerIndexOfThis[t])}let r=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[r],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[r],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let i=e.liveConsumerIndexOfThis[t],r=e.liveConsumerNode[t];eA(r),r.producerIndexOfThis[i]=t}}function eS(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function eA(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function eI(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function eP(e){if(function e(t){if(t.dirty||t.lastCleanEpoch!==ew){if(!t.producerMustRecompute(t)&&!function(t){eA(t);for(let i=0;i<t.producerNode.length;i++){let r=t.producerNode[i],o=t.producerLastReadVersion[i];if(o!==r.version||(e(r),o!==r.version))return!0}return!1}(t)){t.dirty=!1,t.lastCleanEpoch=ew;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=ew}}(e),e$(e),e.value===ej)throw e.error;return e.value}let ez=Symbol("UNSET"),eT=Symbol("COMPUTING"),ej=Symbol("ERRORED"),eR={...eC,value:ez,dirty:!0,error:null,equal:e_,producerMustRecompute:e=>e.value===ez||e.value===eT,producerRecomputeValue(e){let t;if(e.value===eT)throw Error("Detected cycle in computations.");let i=e.value;e.value=eT;let r=(e&&(e.nextProducerIndex=0),ex(e)),o=!1;try{t=e.computation.call(e.wrapper),o=i!==ez&&i!==ej&&e.equal.call(e.wrapper,i,t)}catch(i){t=ej,e.error=i}finally{if(ex(r),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(eS(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)eE(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}if(o){e.value=i;return}e.value=t,e.version++}},eO=function(){throw Error()};function eM(){return e$(this),this.value}let eL={...eC,equal:e_,value:void 0},eD=Symbol("node");(e=>{var t,i,r,o;let State=class State{constructor(r,o={}){let s,n;em(this,i),eg(this,t);let a=((s=Object.create(eL)).value=r,(n=()=>(e$(s),s.value))[ek]=s,n)[ek];if(this[eD]=a,a.wrapper=this,o){let t=o.equals;t&&(a.equal=t),a.watched=o[e.subtle.watched],a.unwatched=o[e.subtle.unwatched]}}get(){if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return eM.call(this[eD])}set(t){var i,r;if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(ey)throw Error("Writes to signals not permitted during Watcher callback");i=this[eD],(null==ev?void 0:ev.consumerAllowSignalWrites)===!1&&eO(),i.equal.call(i.wrapper,i.value,t)||(i.value=t,r=i,r.version++,ew++,function e(t){if(void 0===t.liveConsumerNode)return;let i=ey;ey=!0;try{for(let i of t.liveConsumerNode)i.dirty||function(t){var i;t.dirty=!0,e(t),null==(i=t.consumerMarkedDirty)||i.call(t.wrapper??t)}(i)}finally{ey=i}}(r))}};t=eD,i=new WeakSet,e.isState=e=>"object"==typeof e&&ef(i,e),e.State=State;let Computed=class Computed{constructor(t,i){let s,n;em(this,o),eg(this,r);let a=((s=Object.create(eR)).computation=t,(n=()=>eP(s))[ek]=s,n)[ek];if(a.consumerAllowSignalWrites=!0,this[eD]=a,a.wrapper=this,i){let t=i.equals;t&&(a.equal=t),a.watched=i[e.subtle.watched],a.unwatched=i[e.subtle.unwatched]}}get(){if(!(0,e.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return eP(this[eD])}};r=eD,o=new WeakSet,e.isComputed=e=>"object"==typeof e&&ef(o,e),e.Computed=Computed,(t=>{var i,r,o,s;t.untrack=function(e){let t,i=null;try{i=ex(null),t=e()}finally{ex(i)}return t},t.introspectSources=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(i=t[eD].producerNode)?void 0:i.map(e=>e.wrapper))??[]},t.introspectSinks=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called introspectSinks without a Signal argument");return(null==(i=t[eD].liveConsumerNode)?void 0:i.map(e=>e.wrapper))??[]},t.hasSinks=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called hasSinks without a Signal argument");let i=t[eD].liveConsumerNode;return!!i&&i.length>0},t.hasSources=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called hasSources without a Computed or Watcher argument");let i=t[eD].producerNode;return!!i&&i.length>0};let Watcher=class Watcher{constructor(e){em(this,r),em(this,o),eg(this,i);let t=Object.create(eC);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[eD]=t}watch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eb(this,o,s).call(this,t);let i=this[eD];i.dirty=!1;let r=ex(i);for(let e of t)e$(e[eD]);ex(r)}unwatch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eb(this,o,s).call(this,t);let i=this[eD];eA(i);for(let e=i.producerNode.length-1;e>=0;e--)if(t.includes(i.producerNode[e].wrapper)){eE(i.producerNode[e],i.producerIndexOfThis[e]);let t=i.producerNode.length-1;if(i.producerNode[e]=i.producerNode[t],i.producerIndexOfThis[e]=i.producerIndexOfThis[t],i.producerNode.length--,i.producerIndexOfThis.length--,i.nextProducerIndex--,e<i.producerNode.length){let t=i.producerIndexOfThis[e],r=i.producerNode[e];eI(r),r.liveConsumerIndexOfThis[t]=e}}}getPending(){if(!(0,e.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[eD].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}};i=eD,r=new WeakSet,o=new WeakSet,s=function(t){for(let i of t)if(!(0,e.isComputed)(i)&&!(0,e.isState)(i))throw TypeError("Called watch/unwatch without a Computed or State argument")},e.isWatcher=e=>ef(r,e),t.Watcher=Watcher,t.currentComputed=function(){var e;return null==(e=ev)?void 0:e.wrapper},t.watched=Symbol("watched"),t.unwatched=Symbol("unwatched")})(e.subtle||(e.subtle={}))})(g||(g={}));let eB=!1,eF=new g.subtle.Watcher(()=>{eB||(eB=!0,queueMicrotask(()=>{for(let e of(eB=!1,eF.getPending()))e.get();eF.watch()}))}),eN=Symbol("SignalWatcherBrand"),eU=(new FinalizationRegistry(e=>{e.unwatch(...g.subtle.introspectSources(e))}),new WeakMap,e=>(...t)=>({_$litDirective$:e,values:t}));let directive_i=class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let eq=globalThis,eV=e=>e,eH=eq.trustedTypes,eK=eH?eH.createPolicy("lit-html",{createHTML:e=>e}):void 0,eW="$lit$",eG=`lit$${Math.random().toFixed(9).slice(2)}$`,eZ="?"+eG,eX=`<${eZ}>`,eQ=document,eY=()=>eQ.createComment(""),eJ=e=>null===e||"object"!=typeof e&&"function"!=typeof e,e0=Array.isArray,e1=e=>e0(e)||"function"==typeof e?.[Symbol.iterator],e2=`[ 	
\x0c\r]`,e5=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,e3=/-->/g,e4=/>/g,e7=RegExp(`>|${e2}(?:([^\\s"'>=/]+)(${e2}*=${e2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),e6=/'/g,e8=/"/g,e9=/^(?:script|style|textarea|title)$/i,te=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),tt=te(1),ti=te(2),tr=(te(3),Symbol.for("lit-noChange")),to=Symbol.for("lit-nothing"),ts=new WeakMap,tn=eQ.createTreeWalker(eQ,129);function ta(e,t){if(!e0(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==eK?eK.createHTML(t):t}let tl=(e,t)=>{let i=e.length-1,r=[],o,s=2===t?"<svg>":3===t?"<math>":"",n=e5;for(let t=0;t<i;t++){let i=e[t],a,c,h=-1,p=0;for(;p<i.length&&(n.lastIndex=p,null!==(c=n.exec(i)));)p=n.lastIndex,n===e5?"!--"===c[1]?n=e3:void 0!==c[1]?n=e4:void 0!==c[2]?(e9.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=e7):void 0!==c[3]&&(n=e7):n===e7?">"===c[0]?(n=o??e5,h=-1):void 0===c[1]?h=-2:(h=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?e7:'"'===c[3]?e8:e6):n===e8||n===e6?n=e7:n===e3||n===e4?n=e5:(n=e7,o=void 0);let u=n===e7&&e[t+1].startsWith("/>")?" ":"";s+=n===e5?i+eX:h>=0?(r.push(a),i.slice(0,h)+eW+i.slice(h)+eG+u):i+eG+(-2===h?t:u)}return[ta(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};let S=class S{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,s=0,n=e.length-1,a=this.parts,[c,h]=tl(e,t);if(this.el=S.createElement(c,i),tn.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=tn.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(let e of r.getAttributeNames())if(e.endsWith(eW)){let t=h[s++],i=r.getAttribute(e).split(eG),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?I:"?"===n[1]?L:"@"===n[1]?z:H}),r.removeAttribute(e)}else e.startsWith(eG)&&(a.push({type:6,index:o}),r.removeAttribute(e));if(e9.test(r.tagName)){let e=r.textContent.split(eG),t=e.length-1;if(t>0){r.textContent=eH?eH.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],eY()),tn.nextNode(),a.push({type:2,index:++o});r.append(e[t],eY())}}}else if(8===r.nodeType)if(r.data===eZ)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(eG,e+1));)a.push({type:7,index:o}),e+=eG.length-1}o++}}static createElement(e,t){let i=eQ.createElement("template");return i.innerHTML=e,i}};function tc(e,t,i=e,r){if(t===tr)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl,s=eJ(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(e))._$AT(e,i,r),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=tc(e,o._$AS(e,t.values),o,r)),t}let R=class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??eQ).importNode(t,!0);tn.currentNode=r;let o=tn.nextNode(),s=0,n=0,a=i[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new k(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new Z(o,this,e)),this._$AV.push(t),a=i[++n]}s!==a?.index&&(o=tn.nextNode(),s++)}return tn.currentNode=eQ,r}p(e){let t=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=to,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){eJ(e=tc(this,e,t))?e===to||null==e||""===e?(this._$AH!==to&&this._$AR(),this._$AH=to):e!==this._$AH&&e!==tr&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):e1(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==to&&eJ(this._$AH)?this._$AA.nextSibling.data=e:this.T(eQ.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=S.createElement(ta(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new R(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=ts.get(e.strings);return void 0===t&&ts.set(e.strings,t=new S(e)),t}k(e){e0(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let o of e)r===t.length?t.push(i=new k(this.O(eY()),this.O(eY()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=eV(e).nextSibling;eV(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=to,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=to}_$AI(e,t=this,i,r){let o=this.strings,s=!1;if(void 0===o)(s=!eJ(e=tc(this,e,t,0))||e!==this._$AH&&e!==tr)&&(this._$AH=e);else{let r,n,a=e;for(e=o[0],r=0;r<o.length-1;r++)(n=tc(this,a[i+r],t,r))===tr&&(n=this._$AH[r]),s||=!eJ(n)||n!==this._$AH[r],n===to?e=to:e!==to&&(e+=(n??"")+o[r+1]),this._$AH[r]=n}s&&!r&&this.j(e)}j(e){e===to?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===to?void 0:e}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==to)}};let z=class z extends H{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=tc(this,e,t,0)??to)===tr)return;let i=this._$AH,r=e===to&&i!==to||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==to&&(i===to||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};let Z=class Z{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){tc(this,e)}};let th=eq.litHtmlPolyfillSupport;th?.(S,k),(eq.litHtmlVersions??=[]).push("3.3.3");let{I:td}={M:eW,P:eG,A:eZ,C:1,L:tl,R,D:e1,V:tc,I:k,H,N:L,U:z,B:I,F:Z},tp=e=>e,tu=(e,t,i)=>{let r=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i)i=new td(r.insertBefore(document.createComment(""),o),r.insertBefore(document.createComment(""),o),e,e.options);else{let t=i._$AB.nextSibling,s=i._$AM,n=s!==e;if(n){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==s._$AU&&i._$AP(t)}if(t!==o||n){let e=i._$AA;for(;e!==t;){let t=tp(e).nextSibling;tp(r).insertBefore(e,o),e=t}}}return i},tg=(e,t,i=e)=>(e._$AI(t,i),e),tf={},tm=e=>{e._$AR(),e._$AA.remove()},tb=(e,t)=>{let i=e._$AN;if(void 0===i)return!1;for(let e of i)e._$AO?.(t,!1),tb(e,t);return!0},t_=e=>{let t,i;do{if(void 0===(t=e._$AM))break;(i=t._$AN).delete(e),e=t}while(0===i?.size)},tv=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),tk(t)}};function ty(e){void 0!==this._$AN?(t_(this),this._$AM=e,tv(this)):this._$AM=e}function tw(e,t=!1,i=0){let r=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(r))for(let e=i;e<r.length;e++)tb(r[e],!1),t_(r[e]);else null!=r&&(tb(r,!1),t_(r));else tb(this,e)}let tk=e=>{2==e.type&&(e._$AP??=tw,e._$AQ??=ty)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),tv(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(tb(this,e),t_(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};let tx=!1,tC=new g.subtle.Watcher(async()=>{tx||(tx=!0,queueMicrotask(()=>{for(let e of(tx=!1,tC.getPending()))e.get();tC.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var e,t;void 0===this._$Sm&&(this._$Sj=new g.Computed(()=>{var e;let t=null==(e=this._$SW)?void 0:e.get();return this.setValue(t),t}),this._$Sm=null!=(t=null==(e=this._$Sk)?void 0:e.h)?t:tC,this._$Sm.watch(this._$Sj),g.subtle.untrack(()=>{var e;return null==(e=this._$Sj)?void 0:e.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return g.subtle.untrack(()=>e.get())}update(e,[t]){var i;return null!=this._$Sk||(this._$Sk=null==(i=e.options)?void 0:i.host),t!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=t,this._$S_(),g.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let t$=eU(watch_r),tE=e=>(t,...i)=>e(t,...i.map(e=>e instanceof g.State||e instanceof g.Computed?t$(e):e));tE(tt),tE(ti),g.State,g.Computed;let context_request_event_s=class context_request_event_s extends Event{constructor(e,t,i,r){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=i,this.subscribe=r??!1}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let i=t||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}};let context_provider_e=class context_provider_e extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(e,t,i){super(void 0!==t.context?t.initialValue:i),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:i}]of this.subscriptions)t.has(e)||(t.add(e),i.dispatchEvent(new context_request_event_s(this.context,i,e,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new context_provider_e(this.context,this.host))}};function tS({context:e}){return(t,i)=>{let r=new WeakMap;if("object"==typeof i)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new context_provider_i(this,{context:e,initialValue:t})),t}};{let o;t.constructor.addInitializer(t=>{r.set(t,new context_provider_i(t,{context:e}))});let s=Object.getOwnPropertyDescriptor(t,i);if(void 0===s){let e=new WeakMap;o={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=s.set;o={...s,set(t){r.get(this).setValue(t),e?.call(this,t)}}}return void Object.defineProperty(t,i,o)}}}let tA=globalThis,tI=tA.ShadowRoot&&(void 0===tA.ShadyCSS||tA.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tP=Symbol(),tz=new WeakMap;let css_tag_n=class css_tag_n{constructor(e,t,i){if(this._$cssResult$=!0,i!==tP)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(tI&&void 0===e){let i=void 0!==t&&1===t.length;i&&(e=tz.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&tz.set(t,e))}return e}toString(){return this.cssText}};let tT=e=>new css_tag_n("string"==typeof e?e:e+"",void 0,tP),tj=(e,...t)=>new css_tag_n(1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]),e,tP),tR=tI?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return tT(t)})(e):e,{is:tO,defineProperty:tM,getOwnPropertyDescriptor:tL,getOwnPropertyNames:tD,getOwnPropertySymbols:tB,getPrototypeOf:tF}=Object,tN=globalThis,tU=tN.trustedTypes,tq=tU?tU.emptyScript:"",tV=tN.reactiveElementPolyfillSupport,tH={toAttribute(e,t){switch(t){case Boolean:e=e?tq:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},tK=(e,t)=>!tO(e,t),tW={attribute:!0,type:String,converter:tH,reflect:!1,useDefault:!1,hasChanged:tK};Symbol.metadata??=Symbol("metadata"),tN.litPropertyMetadata??=new WeakMap;let reactive_element_y=class reactive_element_y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=tW){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&tM(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:o}=tL(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let s=r?.call(this);o?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??tW}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=tF(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...tD(e),...tB(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,i]of t)this.elementProperties.set(e,i)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let i of new Set(e.flat(1/0).reverse()))t.unshift(tR(i));else void 0!==e&&t.push(tR(e));return t}static _$Eu(e,t){let i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(tI)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let i of t){let t=document.createElement("style"),r=tA.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){let o=(void 0!==i.converter?.toAttribute?i.converter:tH).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){let e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:tH;this._$Em=r;let s=o.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){if(void 0!==e){let s=this.constructor;if(!1===r&&(o=this[e]),!(((i??=s.getPropertyOptions(e)).hasChanged??tK)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==o||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,i]of e){let{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};reactive_element_y.elementStyles=[],reactive_element_y.shadowRootOptions={mode:"open"},reactive_element_y.elementProperties=new Map,reactive_element_y.finalized=new Map,tV?.({ReactiveElement:reactive_element_y}),(tN.reactiveElementVersions??=[]).push("2.1.2");let tG=globalThis;let lit_element_i=class lit_element_i extends reactive_element_y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{let r=i?.renderBefore??t,o=r._$litPart$;if(void 0===o){let e=i?.renderBefore??null;r._$litPart$=o=new k(t.insertBefore(eY(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tr}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,tG.litElementHydrateSupport?.({LitElement:lit_element_i});let tZ=tG.litElementPolyfillSupport;tZ?.({LitElement:lit_element_i}),(tG.litElementVersions??=[]).push("4.2.2");let tX=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},tQ={attribute:!0,type:String,converter:tH,reflect:!1,hasChanged:tK};function tY(e){return(t,i)=>{let r;return"object"==typeof i?((e=tQ,t,i)=>{let{kind:r,metadata:o}=i,s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===r){let{name:r}=i;return{set(i){let o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){let{name:r}=i;return function(i){let o=this[r];t.call(this,i),this.requestUpdate(r,o,e,!0,i)}}throw Error("Unsupported decorator location: "+r)})(e,t,i):(r=t.hasOwnProperty(i),t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0)}}function tJ(e){return tY({...e,state:!0,attribute:!1})}let t0=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);function t1(e,t){return(i,r,o)=>{let s=t=>t.renderRoot?.querySelector(e)??null;if(t){let e,{get:t,set:n}="object"==typeof r?i:o??(e=Symbol(),{get(){return this[e]},set(t){this[e]=t}});return t0(i,r,{get(){let e=t.call(this);return void 0===e&&(null!==(e=s(this))||this.hasUpdated)&&n.call(this,e),e}})}return t0(i,r,{get(){return s(this)}})}}let{fromCharCode:t2}=String;new TextEncoder;let t5=new TextDecoder;function t3(e,t,i,r){return`command:${e}?${encodeURIComponent(JSON.stringify({webview:t,webviewInstance:i,...r}))}`}let t4=new WeakMap;function t7(e,t){return function(i,r,o){let s=t4.get(i.constructor);null==s&&t4.set(i.constructor,s=[]),s.push({method:o.value,keys:Array.isArray(e)?e:[e],afterFirstUpdate:t?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(e,t,i){let r=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,...i,detail:t});return this.dispatchEvent(r),r}update(e){let t=t4.get(this.constructor);if(null!=t)for(let{keys:i,method:r,afterFirstUpdate:o}of t){if(o&&!this.hasUpdated)continue;let t=i.filter(t=>e.has(t));t.length&&r.call(this,t)}super.update(e)}};let t6=new Map;function t8(t,i){t??="decimal";let r=`${i??""}:${t}`,o=t6.get(r);if(null==o){let s={localeMatcher:"best fit",style:t};o=new Intl.NumberFormat(null==i?e:"system"===i?void 0:[i],s),t6.set(r,o)}return o.format}function t9(e,i,r){let o;if(null==r)return t??=t8(),`${t(i)} ${e}${1===i?"":"s"}`;let s=1===i?e:r.plural??`${e}s`;return r.only?s:(0===i?o=r.zero??i:!1===r.format?o=i:null!=r.format?o=r.format(i):(t??=t8(),o=t(i)),`${o}${r.infix??" "}${s}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let ie=/T/,it=/.*\s*?at\s(.+?)\s/,ii=/^_+/,ir=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(e,t=!1){this.#t={...e,sanitizeKeys:new Set([...ir,...e.sanitizeKeys??[]])},this.#i=t,this.#e=e.createChannel(e.name),this.#r=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(e=>{this.#r=e})}enabled(e){return!!this.isDebugging||0!==this.#r&&(null==e||this.#r<=function(e){switch(e){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(e))}#i=!1;get isDebugging(){return this.#i}#r=0;get logLevel(){var e=this.#r;switch(e){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(ie," ").slice(0,-1)}]`}trace(e,...t){let i;(0!==this.#r&&!(this.#r>1)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.trace(`  ${i??""}${this.#o(!0,t)}`))}debug(e,...t){let i;(0!==this.#r&&!(this.#r>2)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.debug(`  ${i??""}${this.#o(!1,t)}`))}info(e,...t){let i;(0!==this.#r&&!(this.#r>3)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.info(`   ${i??""}${this.#o(!1,t)}`))}warn(e,...t){let i;(0!==this.#r&&!(this.#r>4)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.warn(`${i??""}${this.#o(!1,t)}`))}error(e,t,...i){let r;if((0===this.#r||this.#r>5)&&!this.isDebugging)return;if(null==(r=null==t||"string"==typeof t?t:`${t.prefix} ${i.shift()??""}`)){let t=e instanceof Error?e.stack:void 0;if(t){let e=it.exec(t);null!=e&&(r=e[1])}}this.isDebugging;let o=`  ${r??""}${this.#o(!1,i)}`;null!=e?this.#e?.error(String(e),o):this.#e?.error(o)}showOutputChannel(e){this.#e?.show?.(e)}toLoggable(e,t){if(null!=t){let i=this.sanitize(t,e);if(null!=i)return i}if("function"==typeof e)return"<function>";if(null==e||"object"!=typeof e||e instanceof Error)return String(e);if(Array.isArray(e)){let t=e.length>10?e.slice(0,10):e,i=e.length>10?`, \u2026+${e.length-10}`:"";return`[${t.map(e=>this.toLoggable(e)).join(", ")}${i}]`}let i=this.#t?.toLoggable,r=i?.(e);if(null!=r)return r;let o=this.#t?.sanitizeKeys;try{return JSON.stringify(e,(e,t)=>{if(95!==e.charCodeAt(0))return o?.has(e)?this.sanitize(e,t):""===e||"object"!=typeof t||null==t||Array.isArray(t)?t:t instanceof Error?String(t):i?.(t)??t})}catch{return"<error>"}}sanitize(e,t){if(null==t)return;let i=e.replace(ii,"")||e;if(this.#t?.sanitizeKeys?.has(i))return null!=this.#t.hash?`<${i}:${this.#t.hash("string"==typeof t?t:JSON.stringify(t))}>`:`<${i}>`}#o(e,t){if(0===t.length||e&&(0===this.#r||this.#r>2)&&!this.isDebugging)return"";let i=t.map(e=>this.toLoggable(e)).join(", ");return 0!==i.length?` \u2014 ${i}`:""}};let io=new Logger,is=new WeakMap,ia={enabled:e=>io.enabled(e),log:(e,t,i,...r)=>{switch(e){case"error":io.error(void 0,t,i,...r);break;case"warn":t?.warn(i,...r);break;case"info":t?.info(i,...r);break;case"debug":default:t?.debug(i,...r);break;case"trace":t?.trace(i,...r)}}},il=new Map;function ic(e,t){let r=i;i=e.scopeId,il.set(e.scopeId,e);try{return t()}finally{i=r,il.delete(e.scopeId)}}function ih(){return null!=i?il.get(i):void 0}let id=0x40000000-1;function ip(){let e=0;return{get current(){return e},next:function(){return e===id&&(e=0),++e},reset:function(){e=0}}}function iu(e){let t=.001*performance.now(),i=Math.floor(t),r=Math.floor(t%1*1e9);return void 0!==e&&(i-=e[0],(r-=e[1])<0&&(i--,r+=1e9)),[i,r]}function ig(e){let[t,i]=iu(e);return 1e3*t+Math.floor(i/1e6)}let im=ip();function ib(e,t,i){var r;let o,s,n={scopeId:e,prevScopeId:t,prefix:i,enabled:e=>io.enabled(e),addExitInfo:function(...e){(o??=[]).push(...e)},setFailed:function(e){s=e},getExitInfo:function(){return{details:o?.length?` \u2022 ${o.join(", ")}`:void 0,failed:s}}};return i_(n,"trace",io.trace),i_(n,"debug",io.debug),i_(n,"info",io.info),i_(n,"warn",io.warn),Object.defineProperty(r=n,"error",{configurable:!0,enumerable:!0,get:function(){let e=(e,t,...i)=>io.error(e,r,t,...i);return Object.defineProperty(r,"error",{value:e,writable:!1,enumerable:!0}),e}}),n}function i_(e,t,i){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){let r=i.bind(io,e);return Object.defineProperty(e,t,{value:r,writable:!1,enumerable:!0}),r}})}function iv(e,t,i){if(null!=i){let r=null==t?e.toString(16):`${t.toString(16)} \u2192 ${e.toString(16)}`;return null==r?`[${i.padEnd(13)}]`:`[${i}${r.padStart(13-i.length)}]`}return null==t?`[${e.toString(16).padStart(13)}]`:`[${t.toString(16).padStart(5)} \u2192 ${e.toString(16).padStart(5)}]`}function iy(){let e=ih();if(null==e)return;let t=Object.create(e);return t[Symbol.dispose]=()=>{},t}function iw(e,t,i){if(null!=t&&"boolean"!=typeof t)return ib(t.scopeId,t.prevScopeId,`${t.prefix}${e}`);let r=t?ih()?.scopeId:void 0,o=im.next();return ib(o,r,`${iv(o,r,i)} ${e}`)}function ik(e,t,i,...r){switch(t){case"trace":io.trace(e,i,...r);break;case"info":io.info(e,i,...r);break;default:io.debug(e,i,...r)}}let LoggerContext=class LoggerContext{constructor(e){this.scope=iw(e,void 0),io.configure({name:e,createChannel:function(e){let t=io.isDebugging?function(e){}:function(e){};return{name:e,logLevel:0,trace:t,debug:t,info:t,warn:t,error:t}}},!1)}trace(e,...t){"string"==typeof e?io.trace(this.scope,e,...t):io.trace(e,t.shift(),...t)}debug(e,...t){"string"==typeof e?io.debug(this.scope,e,...t):io.debug(e,t.shift(),...t)}info(e,...t){"string"==typeof e?io.info(this.scope,e,...t):io.info(e,t.shift(),...t)}};let ix=new IpcNotification("home","subscription/didChange"),iC="graph";new IpcCommand(iC,"chooseRepository"),new IpcCommand(iC,"dblclick"),new IpcCommand(iC,"avatars/get"),new IpcCommand(iC,"avatars/proxy"),new IpcCommand(iC,"refs/metadata/get"),new IpcCommand(iC,"rows/get"),new IpcCommand(iC,"pullRequest/openDetails"),new IpcCommand(iC,"row/action"),new IpcCommand(iC,"treemap/file/action"),new IpcCommand(iC,"search/openInView"),new IpcCommand(iC,"search/cancel"),new IpcCommand(iC,"columns/update"),new IpcCommand(iC,"refs/update/visibility"),new IpcCommand(iC,"refs/update/pinned"),new IpcCommand(iC,"filters/update/excludeTypes"),new IpcCommand(iC,"configuration/update"),new IpcCommand(iC,"displayMode/update"),new IpcCommand(iC,"search/update/mode"),new IpcCommand(iC,"filters/update/includedRefs"),new IpcCommand(iC,"filters/reset"),new IpcCommand(iC,"selection/update"),new IpcCommand(iC,"wipDraft/update"),new IpcRequest(iC,"jumpToHead"),new IpcRequest(iC,"chooseRef"),new IpcRequest(iC,"chooseComparison"),new IpcRequest(iC,"chooseAuthor"),new IpcRequest(iC,"chooseFile"),new IpcRequest(iC,"scope/resolve"),new IpcRequest(iC,"rows/ensure"),new IpcRequest(iC,"search/history/get"),new IpcRequest(iC,"search/history/store"),new IpcRequest(iC,"search/history/delete"),new IpcRequest(iC,"counts"),new IpcRequest(iC,"overview/get"),new IpcRequest(iC,"overview/wip/get"),new IpcRequest(iC,"overview/wip/detailed/get"),new IpcRequest(iC,"overview/enrichment/get"),new IpcRequest(iC,"agentSessions/get"),new IpcRequest(iC,"wip/stats/get"),new IpcRequest(iC,"wip/lineStats/get"),new IpcCommand(iC,"wip/watches/sync"),new IpcNotification(iC,"wip/refetch/request"),new IpcRequest(iC,"row/hover/get"),new IpcRequest(iC,"search"),new IpcNotification(iC,"overview/didChange"),new IpcNotification(iC,"agentSessions/didChange"),new IpcNotification(iC,"repositories/integration/didChange"),new IpcNotification(iC,"wipDrafts/didChange"),new IpcNotification(iC,"didChange",!0),new IpcNotification(iC,"configuration/didChange");let i$=new IpcNotification(iC,"subscription/didChange");new IpcNotification(iC,"org/settings/didChange"),new IpcNotification(iC,"avatars/didChange"),new IpcNotification(iC,"mcp/didChange"),new IpcNotification(iC,"hooks/didChange"),new IpcNotification(iC,"agents/canInstallClaudeHook/didChange"),new IpcCommand(iC,"graphWalkthrough/banner/close"),new IpcNotification(iC,"graphWalkthrough/banner/didChange"),new IpcNotification(iC,"graphWalkthrough/complete/didChange"),new IpcNotification(iC,"graphWalkthrough/started/didChange"),new IpcNotification(iC,"visualizationsButtonCallout/didChange"),new IpcCommand(iC,"visualizationsButtonCallout/dismiss"),new IpcNotification(iC,"sidebar/activePanel/didRequest"),new IpcNotification(iC,"action/didRequest"),new IpcCommand(iC,"track/overview/shown"),new IpcCommand(iC,"track/scope/changed"),new IpcCommand(iC,"track/details/reviewMode"),new IpcCommand(iC,"track/details/composeMode"),new IpcCommand(iC,"track/details/resolveMode"),new IpcCommand(iC,"track/details/compareMode"),new IpcCommand(iC,"track/details/wipShown"),new IpcNotification(iC,"branchState/didChange"),new IpcNotification(iC,"refs/didChangeMetadata"),new IpcNotification(iC,"columns/didChange"),new IpcNotification(iC,"scrollMarkers/didChange"),new IpcNotification(iC,"refs/didChangeVisibility"),new IpcNotification(iC,"refs/didChangePinned"),new IpcNotification(iC,"rows/didChange"),new IpcNotification(iC,"rows/stats/didChange"),new IpcNotification(iC,"selection/didChange"),new IpcNotification(iC,"compareMode/didRequestOpen"),new IpcNotification(iC,"timeline/didRequestOpenScope"),new IpcNotification(iC,"search/didRequest"),new IpcNotification(iC,"workingTree/didChange"),new IpcNotification(iC,"didSearch"),new IpcNotification(iC,"didFetch"),new IpcNotification(iC,"scope/anchors/didInvalidate"),new IpcNotification(iC,"treemap/didInvalidate"),new IpcNotification(iC,"featurePreview/didStart");let iE=new IpcNotification("timeline","didChange");let PromosContext=class PromosContext{constructor(e){this.disposables=[],this._promos=new Map,this.ipc=e,this.disposables.push(this.ipc.onReceiveMessage(e=>{(ix.is(e)||i$.is(e)||iE.is(e))&&this._promos.clear()}))}async getApplicablePromo(e,t){let i=`${e}|${t}`,r=this._promos.get(i);return null==r&&(r=this.ipc.sendRequest(el,{plan:e,location:t}).then(e=>e.promo,()=>void 0),this._promos.set(i,r)),await r}dispose(){this.disposables.forEach(e=>e.dispose())}};let TelemetryContext=class TelemetryContext{constructor(e){this.disposables=[],this.ipc=e}sendEvent(e){this.ipc.sendCommand(ec,e)}dispose(){this.disposables.forEach(e=>e.dispose())}};function iS(e){return(e=e.toString().toLowerCase()).includes("ms")?parseFloat(e):e.includes("s")?1e3*parseFloat(e):parseFloat(e)}function iA(e,t){return new Promise(i=>{e.addEventListener(t,function r(o){o.target===e&&(e.removeEventListener(t,r),i())})})}(f||(f={})).on=function(e,t,i,r){let o=!1;if("string"==typeof e){let s=function(t){let r=t?.target?.closest(e);null!=r&&i(t,r)};return document.addEventListener(t,s,r??!0),{dispose:()=>{o||(o=!0,document.removeEventListener(t,s,r??!0))}}}let s=function(e){i(e,this)};return e.addEventListener(t,s,r??!1),{dispose:()=>{o||(o=!0,e.removeEventListener(t,s,r??!1))}}};var iI=Uint8Array,iP=Uint16Array,iz=Int32Array,iT=new iI([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ij=new iI([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),iR=new iI([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),iO=function(e,t){for(var i=new iP(31),r=0;r<31;++r)i[r]=t+=1<<e[r-1];for(var o=new iz(i[30]),r=1;r<30;++r)for(var s=i[r];s<i[r+1];++s)o[s]=s-i[r]<<5|r;return{b:i,r:o}},iM=iO(iT,2),iL=iM.b,iD=iM.r;iL[28]=258,iD[258]=28;var iB=iO(ij,0),iF=iB.b;iB.r;for(var iN=new iP(32768),iU=0;iU<32768;++iU){var iq=(43690&iU)>>1|(21845&iU)<<1;iq=(61680&(iq=(52428&iq)>>2|(13107&iq)<<2))>>4|(3855&iq)<<4,iN[iU]=((65280&iq)>>8|(255&iq)<<8)>>1}for(var iV=function(e,t,i){for(var r,o=e.length,s=0,n=new iP(t);s<o;++s)e[s]&&++n[e[s]-1];var a=new iP(t);for(s=1;s<t;++s)a[s]=a[s-1]+n[s-1]<<1;if(i){r=new iP(1<<t);var c=15-t;for(s=0;s<o;++s)if(e[s])for(var h=s<<4|e[s],p=t-e[s],u=a[e[s]-1]++<<p,g=u|(1<<p)-1;u<=g;++u)r[iN[u]>>c]=h}else for(r=new iP(o),s=0;s<o;++s)e[s]&&(r[s]=iN[a[e[s]-1]++]>>15-e[s]);return r},iH=new iI(288),iU=0;iU<144;++iU)iH[iU]=8;for(var iU=144;iU<256;++iU)iH[iU]=9;for(var iU=256;iU<280;++iU)iH[iU]=7;for(var iU=280;iU<288;++iU)iH[iU]=8;for(var iK=new iI(32),iU=0;iU<32;++iU)iK[iU]=5;var iW=iV(iH,9,1),iG=iV(iK,5,1),iZ=function(e){for(var t=e[0],i=1;i<e.length;++i)e[i]>t&&(t=e[i]);return t},iX=function(e,t,i){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(7&t)&i},iQ=function(e,t){var i=t/8|0;return(e[i]|e[i+1]<<8|e[i+2]<<16)>>(7&t)},iY=function(e,t,i){return(null==t||t<0)&&(t=0),(null==i||i>e.length)&&(i=e.length),new iI(e.subarray(t,i))},iJ=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],i0=function(e,t,i){var r=Error(t||iJ[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,i0),!i)throw r;return r},i1=function(e,t,i,r){var o=e.length,s=r?r.length:0;if(!o||t.f&&!t.l)return i||new iI(0);var n=!i,a=n||2!=t.i,c=t.i;n&&(i=new iI(3*o));var h=function(e){var t=i.length;if(e>t){var r=new iI(Math.max(2*t,e));r.set(i),i=r}},p=t.f||0,u=t.p||0,g=t.b||0,f=t.l,m=t.d,b=t.m,_=t.n,v=8*o;do{if(!f){p=iX(e,u,1);var y=iX(e,u+1,3);if(u+=3,y)if(1==y)f=iW,m=iG,b=9,_=5;else if(2==y){var w=iX(e,u,31)+257,x=iX(e,u+10,15)+4,C=w+iX(e,u+5,31)+1;u+=14;for(var $=new iI(C),E=new iI(19),A=0;A<x;++A)E[iR[A]]=iX(e,u+3*A,7);u+=3*x;for(var P=iZ(E),T=(1<<P)-1,j=iV(E,P,1),A=0;A<C;){var O=j[iX(e,u,T)];u+=15&O;var M=O>>4;if(M<16)$[A++]=M;else{var D=0,B=0;for(16==M?(B=3+iX(e,u,3),u+=2,D=$[A-1]):17==M?(B=3+iX(e,u,7),u+=3):18==M&&(B=11+iX(e,u,127),u+=7);B--;)$[A++]=D}}var F=$.subarray(0,w),N=$.subarray(w);b=iZ(F),_=iZ(N),f=iV(F,b,1),m=iV(N,_,1)}else i0(1);else{var M=((u+7)/8|0)+4,U=e[M-4]|e[M-3]<<8,q=M+U;if(q>o){c&&i0(0);break}a&&h(g+U),i.set(e.subarray(M,q),g),t.b=g+=U,t.p=u=8*q,t.f=p;continue}if(u>v){c&&i0(0);break}}a&&h(g+131072);for(var V=(1<<b)-1,K=(1<<_)-1,W=u;;W=u){var D=f[iQ(e,u)&V],G=D>>4;if((u+=15&D)>v){c&&i0(0);break}if(D||i0(2),G<256)i[g++]=G;else if(256==G){W=u,f=null;break}else{var X=G-254;if(G>264){var A=G-257,Q=iT[A];X=iX(e,u,(1<<Q)-1)+iL[A],u+=Q}var Y=m[iQ(e,u)&K],J=Y>>4;Y||i0(3),u+=15&Y;var N=iF[J];if(J>3){var Q=ij[J];N+=iQ(e,u)&(1<<Q)-1,u+=Q}if(u>v){c&&i0(0);break}a&&h(g+131072);var ee=g+X;if(g<N){var et=s-N,ei=Math.min(N,ee);for(et+g<0&&i0(3);g<ei;++g)i[g]=r[et+g]}for(;g<ee;++g)i[g]=i[g-N]}}t.l=f,t.p=W,t.b=g,t.f=p,f&&(p=1,t.m=b,t.d=m,t.n=_)}while(!p)return g!=i.length&&n?iY(i,0,g):i.subarray(0,g)},i2=new iI(0),i5="u">typeof TextDecoder&&new TextDecoder;try{i5.decode(i2,{stream:!0})}catch{}var i3=function(e){for(var t="",i=0;;){var r=e[i++],o=(r>127)+(r>223)+(r>239);if(i+o>e.length)return{s:t,r:iY(e,i-1)};o?3==o?t+=String.fromCharCode(55296|(r=((15&r)<<18|(63&e[i++])<<12|(63&e[i++])<<6|63&e[i++])-65536)>>10,56320|1023&r):1&o?t+=String.fromCharCode((31&r)<<6|63&e[i++]):t+=String.fromCharCode((15&r)<<12|(63&e[i++])<<6|63&e[i++]):t+=String.fromCharCode(r)}};function i4(e,t){if(t){for(var i="",r=0;r<e.length;r+=16384)i+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return i}if(i5)return i5.decode(e);var o=i3(e),s=o.s,i=o.r;return i.length&&i0(8),s}"function"==typeof queueMicrotask&&queueMicrotask;let i7=/\(([\s\S]*)\)/,i6=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,i8=/\s?=.*$/;function i9(e){var t,i;let r,o,s,n,a,c,h,p,u;return t="debug",a=!1,c=!0,null!=(i=e)&&({args:r,when:o,exit:s,prefix:n,onlyExit:a=!1,timing:c=!0}=i),h="object"==typeof c?c.warnAfter:1500,p=!1!==c||"object"==typeof a&&a.after>0,u="trace"===t?io.trace:"debug"===t?io.debug:io.info,(e,i,c)=>{let g,f;if("function"==typeof c.value?(g=c.value,f="value"):"function"==typeof c.get&&(g=c.get,f="get"),null==g||null==f)throw Error("Not supported");let m=null==r?function(e){if("function"!=typeof e)throw Error("Not supported");if(0===e.length)return[];let t=Function.prototype.toString.call(e),i=(t=(t=t.replace(i6,"")||t).slice(0,t.indexOf("{"))).indexOf("("),r=t.indexOf(")");i=i>=0?i+1:0,r=r>0?r:t.indexOf("="),t=t.slice(i,r),t=`(${t})`;let o=i7.exec(t);return null!=o?o[1].split(",").map(e=>e.trim().replace(i8,"")):[]}(g):[];c[f]=function(...e){let c;if(!io.enabled()||null!=o&&!o.apply(this,e))return g.apply(this,e);let f=io.enabled(t),b=iy(),_=b?.scopeId,v=im.next(),y=this!=null?function(e){let t;if("function"==typeof e){if(null==(t=e.prototype?.constructor))return e.name}else t=e.constructor;let i=t?.name??"",r=i.indexOf("_");-1!==r&&(i=i.substring(r+1));let o=t;for(;null!=o;){let t=is.get(o);if(null!=t)return t(e,i);o=Object.getPrototypeOf(o)}return i}(this):void 0,w=y?`${iv(v,_)} ${y}.${i}`:`${iv(v,_)} ${i}`;null!=n&&(w=n({id:v,instance:this,instanceName:y??"",name:i,prefix:w},...e));let x=ib(v,_,w),C=!1,$=()=>(C||(C=!0,c=function(e,t,i){if(!1===e||!t.length)return;if("function"==typeof e){let i=e(...t);if(!1===i)return;let r="";for(let[e,t]of Object.entries(i))r.length&&(r+=", "),r+=`${e}=${io.toLoggable(t,e)}`;return r||void 0}let r="",o=-1;for(let e of t){let t=i[++o];r.length&&(r+=", "),r+=t?`${t}=${io.toLoggable(e,t)}`:io.toLoggable(e)}return r||void 0}(r,e,m)),c);if(!a&&f){let e=$();u.call(io,e?`${w}(${e})`:w)}if(a||p||null!=s){let t=p?iu():void 0,i=e=>{let i=void 0!==t?` [${ig(t)}ms]`:"",r=x.getExitInfo();if(a){let t=$();io.error(e,t?`${w}(${t})`:w,r?.details?`failed${r.details}${i}`:`failed${i}`)}else io.error(e,w,r?.details?`failed${r.details}${i}`:`failed${i}`)},r=e=>{let i,r,o,n;null!=t?(i=ig(t))>h?(r=io.warn,o=` [*${i}ms] (slow)`):(r=u,o=` [${i}ms]`):(o="",r=u);let c=x.getExitInfo();if(null!=s)if("function"==typeof s)try{n=s(e)}catch(e){n=`@log.exit error: ${e}`}else!0===s&&(n=`returned ${io.toLoggable(e)}`);else c?.failed?(n=c.failed,r=(e,...t)=>io.error(null,e,...t)):n="completed";if(f||r!==u){let e=$();a?(!0===a||0===a.after||i>a.after)&&r.call(io,e?`${w}(${e}) ${n}${c?.details||""}${o}`:`${w} ${n}${c?.details||""}${o}`):r.call(io,e?`${w}(${e}) ${n}${c?.details||""}${o}`:`${w} ${n}${c?.details||""}${o}`)}};return ic(x,()=>{var t;let o;try{o=g.apply(this,e)}catch(e){throw i(e),e}return null!=o&&null!=(t=o)&&(t instanceof Promise||"function"==typeof t?.then)?o.then(r,i).catch(()=>{}):r(o),o})}return ic(x,()=>g.apply(this,e))}}}globalThis.scheduler?.yield?.bind(globalThis.scheduler),Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(e,t,...i){let r;this._stopped=!1,this.logScope=null!=e&&"string"!=typeof e?e:iw(e??"",!1,t?.scopeLabel);let o=t?.log;if(r=null==o||!0===o?{}:!1===o||o.onlyExit?void 0:o,this.logLevel=("object"==typeof o?o.level:void 0)??"debug",this.logProvider=t?.provider??ia,this._time=iu(),null!=r){if(!this.logProvider.enabled(this.logLevel))return;i.length?this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`,...i):this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return ig(this._time)}log(e){this.logCore(e,!1)}restart(e){this.logCore(e,!0),this._time=iu(),this._stopped=!1}stop(e){this._stopped||(this.restart(e),this._stopped=!0)}logCore(e,t){if(!this.logProvider.enabled(this.logLevel))return;if(!t)return void this.logProvider.log(this.logLevel,this.logScope,`${e?.message??""}${e?.suffix??""}`);let i=ig(this._time),r=e?.message??"";this.logProvider.log(i>250?"warn":this.logLevel,this.logScope,`${r?`${r} `:""}[${i}ms]${e?.suffix??""}`)}};(()=>{let e;var t,i,r={975:e=>{function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,r="",o=0,s=-1,n=0,a=0;a<=e.length;++a){if(a<e.length)i=e.charCodeAt(a);else{if(47===i)break;i=47}if(47===i){if(s===a-1||1===n);else if(s!==a-1&&2===n){if(r.length<2||2!==o||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){var c=r.lastIndexOf("/");if(c!==r.length-1){-1===c?(r="",o=0):o=(r=r.slice(0,c)).length-1-r.lastIndexOf("/"),s=a,n=0;continue}}else if(2===r.length||1===r.length){r="",o=0,s=a,n=0;continue}}t&&(r.length>0?r+="/..":r="..",o=2)}else r.length>0?r+="/"+e.slice(s+1,a):r=e.slice(s+1,a),o=a-s-1;s=a,n=0}else 46===i&&-1!==n?++n:n=-1}return r}var r={resolve:function(){for(var e,r,o="",s=!1,n=arguments.length-1;n>=-1&&!s;n--)n>=0?e=arguments[n]:(void 0===r&&(r=process.cwd()),e=r),t(e),0!==e.length&&(o=e+"/"+o,s=47===e.charCodeAt(0));return o=i(o,!s),s?o.length>0?"/"+o:"/":o.length>0?o:"."},normalize:function(e){if(t(e),0===e.length)return".";var r=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return 0!==(e=i(e,!r)).length||r||(e="."),e.length>0&&o&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var o=arguments[i];t(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":r.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=r.resolve(e))===(i=r.resolve(i)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var s=e.length,n=s-o,a=1;a<i.length&&47===i.charCodeAt(a);++a);for(var c=i.length-a,h=n<c?n:c,p=-1,u=0;u<=h;++u){if(u===h){if(c>h){if(47===i.charCodeAt(a+u))return i.slice(a+u+1);if(0===u)return i.slice(a+u)}else n>h&&(47===e.charCodeAt(o+u)?p=u:0===u&&(p=0));break}var g=e.charCodeAt(o+u);if(g!==i.charCodeAt(a+u))break;47===g&&(p=u)}var f="";for(u=o+p+1;u<=s;++u)u!==s&&47!==e.charCodeAt(u)||(0===f.length?f+="..":f+="/..");return f.length>0?f+i.slice(a+p):(a+=p,47===i.charCodeAt(a)&&++a,i.slice(a))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),r=47===i,o=-1,s=!0,n=e.length-1;n>=1;--n)if(47===(i=e.charCodeAt(n))){if(!s){o=n;break}}else s=!1;return -1===o?r?"/":".":r&&1===o?"//":e.slice(0,o)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var r,o=0,s=-1,n=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var a=i.length-1,c=-1;for(r=e.length-1;r>=0;--r){var h=e.charCodeAt(r);if(47===h){if(!n){o=r+1;break}}else -1===c&&(n=!1,c=r+1),a>=0&&(h===i.charCodeAt(a)?-1==--a&&(s=r):(a=-1,s=c))}return o===s?s=c:-1===s&&(s=e.length),e.slice(o,s)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!n){o=r+1;break}}else -1===s&&(n=!1,s=r+1);return -1===s?"":e.slice(o,s)},extname:function(e){t(e);for(var i=-1,r=0,o=-1,s=!0,n=0,a=e.length-1;a>=0;--a){var c=e.charCodeAt(a);if(47!==c)-1===o&&(s=!1,o=a+1),46===c?-1===i?i=a:1!==n&&(n=1):-1!==i&&(n=-1);else if(!s){r=a+1;break}}return -1===i||-1===o||0===n||1===n&&i===o-1&&i===r+1?"":e.slice(i,o)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return i;var r,o=e.charCodeAt(0),s=47===o;s?(i.root="/",r=1):r=0;for(var n=-1,a=0,c=-1,h=!0,p=e.length-1,u=0;p>=r;--p)if(47!==(o=e.charCodeAt(p)))-1===c&&(h=!1,c=p+1),46===o?-1===n?n=p:1!==u&&(u=1):-1!==n&&(u=-1);else if(!h){a=p+1;break}return -1===n||-1===c||0===u||1===u&&n===c-1&&n===a+1?-1!==c&&(i.base=i.name=0===a&&s?e.slice(1,c):e.slice(a,c)):(0===a&&s?(i.name=e.slice(1,n),i.base=e.slice(1,c)):(i.name=e.slice(a,n),i.base=e.slice(a,c)),i.ext=e.slice(n,c)),a>0?i.dir=e.slice(0,a-1):s&&(i.dir="/"),i},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,e.exports=r}},o={};function s(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return r[e](i,i.exports,s),i.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(s.r(n),s.d(n,{URI:()=>l,Utils:()=>i}),"object"==typeof process)?e="win32"===process.platform:"object"==typeof navigator&&(e=navigator.userAgent.indexOf("Windows")>=0);let a=/^\w[\w\d+.-]*$/,c=/^\//,h=/^\/\//;function p(e,t){if(!e.scheme&&t)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!a.test(e.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(e.path){if(e.authority){if(!c.test(e.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(h.test(e.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let u=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(e){return e instanceof l||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString}scheme;authority;path;query;fragment;constructor(e,t,i,r,o,s=!1){"object"==typeof e?(this.scheme=e.scheme||"",this.authority=e.authority||"",this.path=e.path||"",this.query=e.query||"",this.fragment=e.fragment||""):(this.scheme=e||s?e:"file",this.authority=t||"",this.path=function(e,t){switch(e){case"https":case"http":case"file":t?"/"!==t[0]&&(t="/"+t):t="/"}return t}(this.scheme,i||""),this.query=r||"",this.fragment=o||"",p(this,s))}get fsPath(){return v(this,!1)}with(e){if(!e)return this;let{scheme:t,authority:i,path:r,query:o,fragment:s}=e;return void 0===t?t=this.scheme:null===t&&(t=""),void 0===i?i=this.authority:null===i&&(i=""),void 0===r?r=this.path:null===r&&(r=""),void 0===o?o=this.query:null===o&&(o=""),void 0===s?s=this.fragment:null===s&&(s=""),t===this.scheme&&i===this.authority&&r===this.path&&o===this.query&&s===this.fragment?this:new d(t,i,r,o,s)}static parse(e,t=!1){let i=u.exec(e);return i?new d(i[2]||"",x(i[4]||""),x(i[5]||""),x(i[7]||""),x(i[9]||""),t):new d("","","","","")}static file(t){let i="";if(e&&(t=t.replace(/\\/g,"/")),"/"===t[0]&&"/"===t[1]){let e=t.indexOf("/",2);-1===e?(i=t.substring(2),t="/"):(i=t.substring(2,e),t=t.substring(e)||"/")}return new d("file",i,t,"","")}static from(e){let t=new d(e.scheme,e.authority,e.path,e.query,e.fragment);return p(t,!0),t}toString(e=!1){return y(this,e)}toJSON(){return this}static revive(e){if(e){if(e instanceof l)return e;{let t=new d(e);return t._formatted=e.external,t._fsPath=e._sep===g?e.fsPath:null,t}}return e}};let g=e?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(e=!1){return e?y(this,!0):(this._formatted||(this._formatted=y(this,!1)),this._formatted)}toJSON(){let e={$mid:1};return this._fsPath&&(e.fsPath=this._fsPath,e._sep=g),this._formatted&&(e.external=this._formatted),this.path&&(e.path=this.path),this.scheme&&(e.scheme=this.scheme),this.authority&&(e.authority=this.authority),this.query&&(e.query=this.query),this.fragment&&(e.fragment=this.fragment),e}};let f={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function b(e,t,i){let r,o=-1;for(let s=0;s<e.length;s++){let n=e.charCodeAt(s);if(n>=97&&n<=122||n>=65&&n<=90||n>=48&&n<=57||45===n||46===n||95===n||126===n||t&&47===n||i&&91===n||i&&93===n||i&&58===n)-1!==o&&(r+=encodeURIComponent(e.substring(o,s)),o=-1),void 0!==r&&(r+=e.charAt(s));else{void 0===r&&(r=e.substr(0,s));let t=f[n];void 0!==t?(-1!==o&&(r+=encodeURIComponent(e.substring(o,s)),o=-1),r+=t):-1===o&&(o=s)}}return -1!==o&&(r+=encodeURIComponent(e.substring(o))),void 0!==r?r:e}function _(e){let t;for(let i=0;i<e.length;i++){let r=e.charCodeAt(i);35===r||63===r?(void 0===t&&(t=e.substr(0,i)),t+=f[r]):void 0!==t&&(t+=e[i])}return void 0!==t?t:e}function v(t,i){let r;return r=t.authority&&t.path.length>1&&"file"===t.scheme?`//${t.authority}${t.path}`:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&90>=t.path.charCodeAt(1)||t.path.charCodeAt(1)>=97&&122>=t.path.charCodeAt(1))&&58===t.path.charCodeAt(2)?i?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,e&&(r=r.replace(/\//g,"\\")),r}function y(e,t){let i=t?_:b,r="",{scheme:o,authority:s,path:n,query:a,fragment:c}=e;if(o&&(r+=o,r+=":"),(s||"file"===o)&&(r+="/",r+="/"),s){let e=s.indexOf("@");if(-1!==e){let t=s.substr(0,e);s=s.substr(e+1),-1===(e=t.lastIndexOf(":"))?r+=i(t,!1,!1):(r+=i(t.substr(0,e),!1,!1),r+=":",r+=i(t.substr(e+1),!1,!0)),r+="@"}-1===(e=(s=s.toLowerCase()).lastIndexOf(":"))?r+=i(s,!1,!0):(r+=i(s.substr(0,e),!1,!0),r+=s.substr(e))}if(n){if(n.length>=3&&47===n.charCodeAt(0)&&58===n.charCodeAt(2)){let e=n.charCodeAt(1);e>=65&&e<=90&&(n=`/${String.fromCharCode(e+32)}:${n.substr(3)}`)}else if(n.length>=2&&58===n.charCodeAt(1)){let e=n.charCodeAt(0);e>=65&&e<=90&&(n=`${String.fromCharCode(e+32)}:${n.substr(2)}`)}r+=i(n,!0,!1)}return a&&(r+="?",r+=i(a,!1,!1)),c&&(r+="#",r+=t?c:b(c,!1,!1)),r}let w=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function x(e){return e.match(w)?e.replace(w,e=>(function e(t){try{return decodeURIComponent(t)}catch{return t.length>3?t.substr(0,3)+e(t.substr(3)):t}})(e)):e}var C=s(975);let $=C.posix||C;(t=i||(i={})).joinPath=function(e,...t){return e.with({path:$.join(e.path,...t)})},t.resolvePath=function(e,...t){let i=e.path,r=!1;"/"!==i[0]&&(i="/"+i,r=!0);let o=$.resolve(i,...t);return r&&"/"===o[0]&&!e.authority&&(o=o.substring(1)),e.with({path:o})},t.dirname=function(e){if(0===e.path.length||"/"===e.path)return e;let t=$.dirname(e.path);return 1===t.length&&46===t.charCodeAt(0)&&(t=""),e.with({path:t})},t.basename=function(e){return $.basename(e.path)},t.extname=function(e){return $.extname(e.path)},m=n})();let{URI:re,Utils:rt}=m;function ri(e,t){return JSON.parse(e,(e,i)=>(function(e,t){let i=function(e){if("object"!=typeof e||null==e)return;let t=e.__ipc;if(null!=t)switch(t){case"date":return"number"==typeof e.value?e:void 0;case"promise":return"object"==typeof e.value&&"string"==typeof e.value.id&&"string"==typeof e.value.method?e:void 0;case"uri":return"object"==typeof e.value&&"string"==typeof e.value?.scheme?e:void 0;default:return}}(e);if(null==i)return e;switch(i.__ipc){case"date":return new Date(i.value);case"promise":return t(i.value);case"uri":return re.revive(i.value)}})(i,t))}let rr="__supertalk_rpc__";new TextEncoder,new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._type="fire"}static{this._noop=function(){}}get event(){return this._event??=(e,t,i)=>{if(this._disposed)return{dispose:Emitter._noop};this._target??=new EventTarget;let r=i=>{try{e.call(t,i.detail)}catch{}};this._target.addEventListener(Emitter._type,r);let o={dispose:()=>{o.dispose=Emitter._noop,this._target?.removeEventListener(Emitter._type,r)}};return i?.push(o),o},this._event}fire(e){this._disposed||this._target?.dispatchEvent(new CustomEvent(Emitter._type,{detail:e}))}dispose(){this._disposed=!0,this._target=void 0}};var ro=Object.defineProperty,rs=Object.getOwnPropertyDescriptor,rn=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),ra=e=>{throw TypeError(e)},rl=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?rs(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ro(t,i,s),s};function rc(){return r??=null!=o?o():acquireVsCodeApi()}let rh=ip();function rd(){return`webview:${rh.next()}`}let rp=`wv-${Math.random().toString(36).slice(2,10)}`,ru=Date.now(),rg=class{constructor(e){this.appName=e,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=rc(),this._disposable=f.on(window,"message",e=>this.onMessageReceived(e))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(e){var t,r,o,s,n,a,c,h,p,u=[];try{if(o=e.data,"object"==typeof o&&null!==o&&rr in o&&!0===o[rr])return;let n=e.data,a=((e,t,i)=>{if(null!=t){var r,o;"object"!=typeof t&&"function"!=typeof t&&ra("Object expected"),i&&(r=t[rn("asyncDispose")]),void 0===r&&(r=t[rn("dispose")],i&&(o=r)),"function"!=typeof r&&ra("Object not disposable"),o&&(r=function(){try{o.call(this)}catch(e){return Promise.reject(e)}}),e.push([i,r,t])}else i&&e.push([i]);return t})(u,function(e,t,r){var o,s;let n,a,c;if(!io.enabled())return;let h=(o=r?.scope??!0,s=r?.scopeLabel,a=ih(),i=(c=iw(e,o,s)).scopeId,il.set(c.scopeId,c),c[Symbol.dispose]=()=>{let e;e=c?.scopeId??i,null!=e&&il.delete(e),i=a?.scopeId},c);if(!t)return h;let p="debug",u=!1;"object"==typeof t&&(p=t.level??p,n=t.message,u=!0===t.onlyExit);let g=iu();u||ik(h,p,n??"");let f=h[Symbol.dispose];return h[Symbol.dispose]=()=>{let e=ig(g),t=` [${e}ms]`,i=h.getExitInfo(),r=i.failed??"completed";null!=i.failed?io.error(null,h,`${r}${i.details??""}${t}`):ik(h,p,`${r}${i.details??""}${t}`),f()},h}(`(e=${n.id}|${n.method})`,void 0,{scope:iy()})),c=function(e,t,...i){let r=("object"==typeof t?.log?t.log.level:void 0)??"info";return(t?.provider??ia).enabled(r)?new Stopwatch(e,t,...i):void 0}(a,{log:{onlyExit:!0,level:"debug"}});if(n.compressed&&n.params instanceof Uint8Array){if("deflate"===n.compressed)try{n.params=i4((s=n.params,i1(s,{i:2},void 0,void 0)))}catch(e){n.params=i4(n.params)}else n.params=i4(n.params);c?.restart({message:`\u2022 decompressed (${n.compressed}) serialized params`})}if("string"==typeof n.params?(n.params=ri(n.params,e=>this.getResponsePromise(e.method,e.id)),c?.stop({message:"• deserialized params"})):null==n.params?c?.stop({message:"• no params"}):c?.stop({message:"• invalid params"}),a?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-n.timestamp}ms`),null!=n.completionId){let e=(t=n.method,r=n.completionId,`${t}|${r}`);this._pendingHandlers.get(e)?.(n);return}this._onReceiveMessage.fire(n)}catch(e){var g=e,f=!0}finally{n=g,a=f,c="function"==typeof SuppressedError?SuppressedError:function(e,t,i,r){return(r=Error(i)).name="SuppressedError",r.error=e,r.suppressed=t,r},h=e=>n=a?new c(e,n,"An error was suppressed during disposal"):(a=!0,e),(p=e=>{for(;e=u.pop();)try{var t=e[1]&&e[1].call(e[2]);if(e[0])return Promise.resolve(t).then(p,e=>(h(e),p()))}catch(e){h(e)}if(a)throw n})()}}deserializeIpcData(e){return ri(e,e=>this.getResponsePromise(e.method,e.id))}sendCommand(e,t){let i=rd();this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now()})}async sendRequest(e,t){let i=rd(),r=this.getResponsePromise(e.response.method,i);return this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now(),completionId:i}),r}getResponsePromise(e,t){return new Promise((i,r)=>{var o,s;let n,a=(o=e,s=t,`${o}|${s}`);function c(){clearTimeout(n),n=void 0,this._pendingHandlers.delete(a)}n=setTimeout(()=>{c.call(this),r(Error(`Timed out waiting for completion of ${a}`))},(io.isDebugging?60:5)*6e4),this._pendingHandlers.set(a,e=>{if(c.call(this),e.method===eh.method){let t=e.params;"rejected"===t.status?queueMicrotask(()=>r(Error(t.reason))):queueMicrotask(()=>i(t.value))}else queueMicrotask(()=>i(e.params))})})}setPersistedState(e){this._api.setState(e)}updatePersistedState(e){let t=this._api.getState();null!=t&&"object"==typeof t?(t={...t,...e},this._api.setState(t)):t=e,this.setPersistedState(t)}postMessage(e){this._api.postMessage(e)}};function rf(e,t){let i=Math.pow(10,t);return Math.round(e*i)/i}rl([i9({args:e=>({e:`${e.data.id}|${e.data.method}`})})],rg.prototype,"onMessageReceived",1),rl([i9({args:e=>({commandType:e.method})})],rg.prototype,"sendCommand",1),rl([i9({args:e=>({requestType:e.method})})],rg.prototype,"sendRequest",1),rl([i9({args:e=>({e:`${e.id}, method=${e.method}`})})],rg.prototype,"postMessage",1),rg=rl([(p=e=>`${e.appName}(HostIpc)`,e=>void is.set(e,p))],rg);let RGBA=class RGBA{constructor(e,t,i,r=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,e)),this.g=0|Math.min(255,Math.max(0,t)),this.b=0|Math.min(255,Math.max(0,i)),this.a=rf(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}};let HSLA=class HSLA{constructor(e,t,i,r){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rf(Math.max(Math.min(1,t),0),3),this.l=rf(Math.max(Math.min(1,i),0),3),this.a=rf(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.l===t.l&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,r=e.b/255,o=e.a,s=Math.max(t,i,r),n=Math.min(t,i,r),a=0,c=0,h=(n+s)/2,p=s-n;if(p>0){switch(c=Math.min(h<=.5?p/(2*h):p/(2-2*h),1),s){case t:a=(i-r)/p+6*(i<r);break;case i:a=(r-t)/p+2;break;case r:a=(t-i)/p+4}a*=60,a=Math.round(a)}return new HSLA(a,c,h,o)}static _hue2rgb(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e}static toRGBA(e){let t,i,r,o=e.h/360,{s,l:n,a}=e;if(0===s)t=i=r=n;else{let e=n<.5?n*(1+s):n+s-n*s,a=2*n-e;t=HSLA._hue2rgb(a,e,o+1/3),i=HSLA._hue2rgb(a,e,o),r=HSLA._hue2rgb(a,e,o-1/3)}return new RGBA(Math.round(255*t),Math.round(255*i),Math.round(255*r),a)}};let HSVA=class HSVA{constructor(e,t,i,r){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rf(Math.max(Math.min(1,t),0),3),this.v=rf(Math.max(Math.min(1,i),0),3),this.a=rf(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.v===t.v&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,r=e.b/255,o=Math.max(t,i,r),s=o-Math.min(t,i,r);return new HSVA(Math.round(60*(0===s?0:o===t?((i-r)/s%6+6)%6:o===i?(r-t)/s+2:(t-i)/s+4)),0===o?0:s/o,o,e.a)}static toRGBA(e){let{h:t,s:i,v:r,a:o}=e,s=r*i,n=s*(1-Math.abs(t/60%2-1)),a=r-s,[c,h,p]=[0,0,0];return t<60?(c=s,h=n):t<120?(c=n,h=s):t<180?(h=s,p=n):t<240?(h=n,p=s):t<300?(c=n,p=s):t<=360&&(c=s,p=n),new RGBA(c=Math.round((c+a)*255),h=Math.round((h+a)*255),p=Math.round((p+a)*255),o)}};function rm(e,t){return t.getPropertyValue(e).trim()}let Color=class Color{static from(e){return e instanceof Color?e:parseColor(e)||Color.red}static fromCssVariable(e,t){return parseColor(rm(e,t))||Color.red}static fromHex(e){return parseHexColor(e)||Color.red}static equals(e,t){return!e&&!t||!!e&&!!t&&e.equals(t)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(e){if(e)if(e instanceof RGBA)this.rgba=e;else if(e instanceof HSLA)this._hsla=e,this.rgba=HSLA.toRGBA(e);else if(e instanceof HSVA)this._hsva=e,this.rgba=HSVA.toRGBA(e);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(e){return null!=e&&!!e&&RGBA.equals(this.rgba,e.rgba)&&HSLA.equals(this.hsla,e.hsla)&&HSVA.equals(this.hsva,e.hsva)}getRelativeLuminance(){return rf(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(e){let t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}luminance(e){return luminance(this,e)}getContrastRatio(e){let t=this.getRelativeLuminance(),i=e.getRelativeLuminance();return t>i?(t+.05)/(i+.05):(i+.05)/(t+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(e){return this.getRelativeLuminance()>e.getRelativeLuminance()}isDarkerThan(e){return this.getRelativeLuminance()<e.getRelativeLuminance()}lighten(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*e,this.hsla.a))}darken(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*e,this.hsla.a))}transparent(e){let{r:t,g:i,b:r,a:o}=this.rgba;return new Color(new RGBA(t,i,r,o*e))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(e){let t=e.rgba,i=this.rgba.a,r=t.a,o=i+r*(1-i);return o<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*i/o+t.r*r*(1-i)/o,this.rgba.g*i/o+t.g*r*(1-i)/o,this.rgba.b*i/o+t.b*r*(1-i)/o,o))}mix(e,t){return mixColors(this,e,t)}makeOpaque(e){if(this.isOpaque()||1!==e.rgba.a)return this;let{r:t,g:i,b:r,a:o}=this.rgba;return new Color(new RGBA(e.rgba.r-o*(e.rgba.r-t),e.rgba.g-o*(e.rgba.g-i),e.rgba.b-o*(e.rgba.b-r),1))}flatten(...e){let t=e.reduceRight((e,t)=>Color._flatten(t,e));return Color._flatten(this,t)}static _flatten(e,t){let i=1-e.rgba.a;return new Color(new RGBA(i*t.rgba.r+e.rgba.a*e.rgba.r,i*t.rgba.g+e.rgba.a*e.rgba.g,i*t.rgba.b+e.rgba.a*e.rgba.b))}toString(){return this._toString||(this._toString=function(e){return e.isOpaque()?`#${rb(e.rgba.r)}${rb(e.rgba.g)}${rb(e.rgba.b)}`:`rgba(${e.rgba.r}, ${e.rgba.g}, ${e.rgba.b}, ${Number(e.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(e,t,i){if(e.isLighterThan(t))return e;i=i||.5;let r=e.getRelativeLuminance(),o=t.getRelativeLuminance();return i=i*(o-r)/o,e.lighten(i)}static getDarkerColor(e,t,i){if(e.isDarkerThan(t))return e;i=i||.5;let r=e.getRelativeLuminance(),o=t.getRelativeLuminance();return i=i*(r-o)/r,e.darken(i)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function rb(e){let t=e.toString(16);return 2!==t.length?`0${t}`:t}let r_=new Emitter,rv=r_.event;function ry(e){let t=document.documentElement,i=window.getComputedStyle(t),r=document.body.classList,o=r.contains("vscode-light")||r.contains("vscode-high-contrast-light"),s=r.contains("vscode-high-contrast")||r.contains("vscode-high-contrast-light"),n=rm("--vscode-editor-background",i),a=rm("--vscode-editor-foreground",i);return a||(a=rm("--vscode-foreground",i)),{colors:{background:n,foreground:a},computedStyle:i,isLightTheme:o,isHighContrastTheme:s,isInitializing:null==e}}function rw(){let e=new MutationObserver(e=>{r_.fire(ry(e))});return e.observe(document.body,{attributeFilter:["class"]}),{dispose:()=>e.disconnect()}}var rk=Object.defineProperty,rx=Object.getOwnPropertyDescriptor,rC=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?rx(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&rk(t,i,s),s};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(e){let t=JSON.parse(t5.decode(function(e){let t=globalThis.atob(e),i=t.length,r=new Uint8Array(i),o=0,s=i-i%8;for(;o<s;o+=8)r[o]=t.charCodeAt(o),r[o+1]=t.charCodeAt(o+1),r[o+2]=t.charCodeAt(o+2),r[o+3]=t.charCodeAt(o+3),r[o+4]=t.charCodeAt(o+4),r[o+5]=t.charCodeAt(o+5),r[o+6]=t.charCodeAt(o+6),r[o+7]=t.charCodeAt(o+7);for(;o<i;o++)r[o]=t.charCodeAt(o);return r}(e))),i=t.webviewId,r=t.webviewInstanceId;this._webview={webviewId:i,webviewInstanceId:r,createCommandLink:(e,t)=>(e.endsWith(":")&&(e=`${e}${i.split(".").at(-1)}`),t3(e,i,r,t))}}connectedCallback(){let e,t,i,r;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new rg(this.name),this.disposables.push(rw()),null!=this.onThemeUpdated&&(this.onThemeUpdated(ry()),this.disposables.push(rv(this.onThemeUpdated,this))),this.disposables.push(this._ipc.onReceiveMessage(e=>{switch(!0){case ed.is(e):this.onWebviewFocusChanged?.(e.params.focused),window.dispatchEvent(new CustomEvent(e.params.focused?"webview-focus":"webview-blur"));break;case ep.is(e):this.onWebviewVisibilityChanged?.(e.params.visible),window.dispatchEvent(new CustomEvent(e.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(i=0,r=w(e=>{let t=`webview:${++i}`,r=document.hasFocus();e.focused=r,r||(e.inputFocused=!1),rc().postMessage({id:t,scope:en.scope,method:en.method,params:e,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:i=>{let o=i.composedPath().some(e=>"INPUT"===e.tagName);(!0!==e||t!==o)&&(e=!0,t=o,r({focused:!0,inputFocused:o}))},onFocusOut:e=>{r({focused:!1,inputFocused:!1})}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(e=>{e.href===e.title&&e.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(e=>e.dispose())}render(){return tt`<slot></slot>`}};rC([tY({type:String})],GlWebviewApp.prototype,"name",2),rC([tY({type:String})],GlWebviewApp.prototype,"placement",2),rC([tS({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),rC([tS({context:"logger"})],GlWebviewApp.prototype,"_logger",2),rC([tS({context:"promos"})],GlWebviewApp.prototype,"_promos",2),rC([tS({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),rC([tS({context:"webview"})],GlWebviewApp.prototype,"_webview",2),GlWebviewApp[eN];let App=class App{constructor(e){this.appName=e;let t=[],i=ry();null!=this.onThemeUpdated&&(this.onThemeUpdated(i),t.push(rv(this.onThemeUpdated,this))),this.state=window.bootstrap,window.bootstrap=void 0,this.placement=document.body.getAttribute("data-placement")??"editor",this._logger=new LoggerContext(e),this.log("opening..."),this._api=rc(),this._hostIpc=new rg(this.appName),t.push(this._hostIpc),this._promos=new PromosContext(this._hostIpc),t.push(this._promos),this._telemetry=new TelemetryContext(this._hostIpc),t.push(this._telemetry);let{webviewId:r,webviewInstanceId:o}=this.state;if(this._webview={webviewId:r,webviewInstanceId:o,createCommandLink:(e,t)=>(e.endsWith(":")&&(e=`${e}${r.split(".").at(-1)}`),t3(e,r,o,t))},new context_provider_i(document.body,{context:"ipc",initialValue:this._hostIpc}),new context_provider_i(document.body,{context:"logger",initialValue:this._logger}),new context_provider_i(document.body,{context:"promos",initialValue:this._promos}),new context_provider_i(document.body,{context:"telemetry",initialValue:this._telemetry}),new context_provider_i(document.body,{context:"webview",initialValue:this._webview}),null!=this.state){let e=this.getState();this.state.timestamp>=(e?.timestamp??0)?this._api.setState(this.state):this.state=e}t.push(rw()),requestAnimationFrame(()=>{this.log("initializing...");try{this.onInitialize?.(),this.bind(),null!=this.onMessageReceived&&t.push(this._hostIpc.onReceiveMessage(e=>{switch(!0){case ed.is(e):window.dispatchEvent(new CustomEvent(e.params.focused?"webview-focus":"webview-blur"));break;case ep.is(e):window.dispatchEvent(new CustomEvent(e.params.visible?"webview-visible":"webview-hidden"));break;default:this.onMessageReceived(e)}})),this.sendRequest(es,{bootstrap:!1,clientId:rp,clientLoadedAt:ru}),this.onInitialized?.()}finally{this.log("initialized"),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}}),t.push(f.on(window,"pagehide",()=>{t?.forEach(e=>e.dispose()),this.bindDisposables?.forEach(e=>e.dispose()),this.bindDisposables=void 0})),t.push(f.on(window,"gl-telemetry-fired",e=>{this._telemetry.sendEvent(e.detail)})),this.log("opened")}bind(){document.querySelectorAll("a").forEach(e=>{e.href===e.title&&e.removeAttribute("title")}),this.bindDisposables?.forEach(e=>e.dispose()),this.bindDisposables=this.onBind?.(),this.bindDisposables??=[];let e=w(e=>{let t=document.hasFocus();e.focused=t,t||(e.inputFocused=!1),this.sendCommand(en,e)},150);this.bindDisposables.push(f.on(document,"focusin",t=>{e({focused:!0,inputFocused:t.composedPath().some(e=>"INPUT"===e.tagName)})}),f.on(document,"focusout",()=>{e({focused:!1,inputFocused:!1})}))}log(e,...t){this._logger.debug(e,...t)}getState(){return this._api.getState()}sendCommand(e,t){this._hostIpc.sendCommand(e,t)}sendRequest(e,t){return this._hostIpc.sendRequest(e,t)}setState(e){this._api.setState(e)}};function r$(e,t,i){return e?t(e):i?.(e)}let ContextMenuProxyController=class ContextMenuProxyController{constructor(e){this._onContextMenu=e=>{let t=e.composedPath().find(e=>e instanceof HTMLElement&&null!=e.dataset.vscodeContext);null!=t&&t!==this._host&&(this._host.dataset.vscodeContext=t.dataset.vscodeContext,setTimeout(()=>{delete this._host.dataset.vscodeContext},100))},this._host=e,e.addController(this)}hostConnected(){this._host.addEventListener("contextmenu",this._onContextMenu)}hostDisconnected(){this._host.removeEventListener("contextmenu",this._onContextMenu)}};function*rE(e,t){if(void 0!==e){let i=0;for(let r of e)yield t(r,i++)}}let rS=(e,t,i)=>{let r=new Map;for(let o=t;o<=i;o++)r.set(e[o],o);return r},rA=eU(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);let o=[],s=[],n=0;for(let t of e)o[n]=r?r(t,n):n,s[n]=i(t,n),n++;return{values:s,keys:o}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,r]){let o=e._$AH,{values:s,keys:n}=this.dt(t,i,r);if(!Array.isArray(o))return this.ut=n,s;let a=this.ut??=[],c=[],h,p,u=0,g=o.length-1,f=0,m=s.length-1;for(;u<=g&&f<=m;)if(null===o[u])u++;else if(null===o[g])g--;else if(a[u]===n[f])c[f]=tg(o[u],s[f]),u++,f++;else if(a[g]===n[m])c[m]=tg(o[g],s[m]),g--,m--;else if(a[u]===n[m])c[m]=tg(o[u],s[m]),tu(e,c[m+1],o[u]),u++,m--;else if(a[g]===n[f])c[f]=tg(o[g],s[f]),tu(e,o[u],o[g]),g--,f++;else if(void 0===h&&(h=rS(n,f,m),p=rS(a,u,g)),h.has(a[u]))if(h.has(a[g])){let t=p.get(n[f]),i=void 0!==t?o[t]:null;if(null===i){let t=tu(e,o[u]);tg(t,s[f]),c[f]=t}else c[f]=tg(i,s[f]),tu(e,o[u],i),o[t]=null;f++}else tm(o[g]),g--;else tm(o[u]),u++;for(;f<=m;){let t=tu(e,c[m+1]);tg(t,s[f]),c[f++]=t}for(;u<=g;){let e=o[u++];null!==e&&tm(e)}return this.ut=n,((e,t=tf)=>e._$AH=t)(e,c),tr}});let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=to,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===to||null==e)return this._t=void 0,this.it=e;if(e===tr)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let rI=eU(unsafe_html_e);function rP(e,t,i,r=!1,o){let s={name:"",relativePath:"",children:new Map,descendants:[]},n=e.reduce((e,r)=>{let o=e,s="";for(let e of t(r)){s=i(s,e),o.children??=new Map;let t=o.children.get(e);null==t&&(t={name:e,relativePath:s,parent:o,children:void 0,descendants:void 0},o.children.set(e,t)),o.descendants??=[],o.descendants.push(r),o=t}return o.value=r,e},s);return r&&(n=function e(t,i,r=!0,o){if(null==t.children)return t;let s=[...t.children.values()];for(let t of s)e(t,i,!1,o);if(!r&&null==t.value&&1===s.length){let e=s[0];if((null==e.value||o?.(e.value))&&(t.name=i(t.name,e.name),t.relativePath=e.relativePath,t.children=e.children,t.descendants=e.descendants,t.value=e.value,null!=t.children))for(let e of t.children.values())e.parent=t}return t}(n,i,!0,o)),n}function rz(e,t){if(null==e)return 0;let i=0;for(let r of e)i+=t(r);return i}var rT=y(518);let rj=navigator?.userAgentData?.platform,rR=navigator.userAgent;"Linux"===rj||rR.includes("Linux");let rO="macOS"===rj||rR.includes("Macintosh");function rM(){return rO?"⌥":"Alt"}"Windows"===rj||rR.includes("Windows");let rL=tj`
	a {
		font-weight: 400;
		color: var(--link-foreground);
		text-decoration: var(--link-decoration-default, none);
		outline: none;
		border: 0;
	}

	a:focus-visible {
		outline: var(--gl-border-width) solid var(--color-focus-border);
		border-radius: var(--gl-radius-xs);
	}

	a:hover {
		color: var(--link-foreground-active);
		text-decoration: underline;
	}
`,rD=tj`
	hr {
		border: none;
		border-top: var(--gl-border-width) solid var(--color-foreground--25);
	}
`;let ModifierKeysTracker=class ModifierKeysTracker{constructor(){this._altKey=!1,this._shiftKey=!1,this._ctrlKey=!1,this._metaKey=!1,this._hosts=new Set,this._listening=!1,this._onKey=e=>{let t=e.altKey||"keydown"===e.type&&"Alt"===e.key,i=e.shiftKey||"keydown"===e.type&&"Shift"===e.key,r=e.ctrlKey||"keydown"===e.type&&"Control"===e.key,o=e.metaKey||"keydown"===e.type&&"Meta"===e.key,s=("keyup"!==e.type||"Alt"!==e.key)&&t,n=("keyup"!==e.type||"Shift"!==e.key)&&i,a=("keyup"!==e.type||"Control"!==e.key)&&r,c=("keyup"!==e.type||"Meta"!==e.key)&&o;(this._altKey!==s||this._shiftKey!==n||this._ctrlKey!==a||this._metaKey!==c)&&(this._altKey=s,this._shiftKey=n,this._ctrlKey=a,this._metaKey=c,this._notify())},this._onPointer=e=>{(this._altKey!==e.altKey||this._shiftKey!==e.shiftKey||this._ctrlKey!==e.ctrlKey||this._metaKey!==e.metaKey)&&(this._altKey=e.altKey,this._shiftKey=e.shiftKey,this._ctrlKey=e.ctrlKey,this._metaKey=e.metaKey,this._notify())},this._onVisibilityChange=()=>{"hidden"===document.visibilityState&&this._reset()}}get altKey(){return this._altKey}get shiftKey(){return this._shiftKey}get ctrlKey(){return this._ctrlKey}get metaKey(){return this._metaKey}subscribe(e){return this._hosts.add(e),this._listening||this._start(),()=>{this._hosts.delete(e),0===this._hosts.size&&this._stop()}}_start(){this._listening=!0,window.addEventListener("keydown",this._onKey,{capture:!0}),window.addEventListener("keyup",this._onKey,{capture:!0}),window.addEventListener("mousemove",this._onPointer,{capture:!0}),window.addEventListener("mouseover",this._onPointer,{capture:!0}),document.addEventListener("visibilitychange",this._onVisibilityChange)}_stop(){this._listening=!1,window.removeEventListener("keydown",this._onKey,{capture:!0}),window.removeEventListener("keyup",this._onKey,{capture:!0}),window.removeEventListener("mousemove",this._onPointer,{capture:!0}),window.removeEventListener("mouseover",this._onPointer,{capture:!0}),document.removeEventListener("visibilitychange",this._onVisibilityChange),this._reset()}_reset(){let e=this._altKey||this._shiftKey||this._ctrlKey||this._metaKey;this._altKey=this._shiftKey=this._ctrlKey=this._metaKey=!1,e&&this._notify()}_notify(){for(let e of this._hosts)e.requestUpdate()}};let rB=new ModifierKeysTracker;let ModifierKeysController=class ModifierKeysController{constructor(e){this.host=e,e.addController(this)}get altKey(){return rB.altKey}get shiftKey(){return rB.shiftKey}get ctrlKey(){return rB.ctrlKey}get metaKey(){return rB.metaKey}hostConnected(){this._unsubscribe=rB.subscribe(this.host)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}};function rF(e){return e?.includes(`
`)?rI(e.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):e}let rN=tj`
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;tj`
	.sr-only,
	.sr-only-focusable:not(:active, :focus-visible, :focus-within) {
		${rN}
	}
`;let rU=tj`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: -1px;
`,rq=tj`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: 2px;
`;tj`
	:focus-visible {
		${rU}
	}
`;let rV=tj`
	:host {
		box-sizing: border-box;
	}

	:host *,
	:host *::before,
	:host *::after {
		box-sizing: inherit;
	}

	[hidden] {
		display: none !important;
	}
`;tj`
	* {
		box-sizing: border-box;
	}
`,tj`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}

	a:focus {
		${rU}
	}

	a:hover {
		text-decoration: underline;
	}
`;let rH=tj`
	::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	::-webkit-scrollbar-corner {
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		background-color: transparent;
		border-color: inherit;
		border-right-style: inset;
		border-right-width: calc(100vw + 100vh);
		border-radius: unset !important;
	}

	::-webkit-scrollbar-thumb:hover {
		border-color: var(--vscode-scrollbarSlider-hoverBackground);
	}

	::-webkit-scrollbar-thumb:active {
		border-color: var(--vscode-scrollbarSlider-activeBackground);
	}

	.scrollable {
		border-color: transparent;
		transition: border-color 1s linear;
	}

	:host(:hover) .scrollable,
	:host(:focus-within) .scrollable {
		border-color: var(--vscode-scrollbarSlider-background);
		transition: none;
	}

	:host-context(.preload) .scrollable {
		transition: none;
	}
`;tj`
	.inline-code {
		padding: 0 var(--gl-space-4) var(--gl-space-2);
		font-family: var(--vscode-editor-font-family);
		background: var(--vscode-textCodeBlock-background);
		border-radius: var(--gl-radius-sm);
	}
`,tj`
	@keyframes sub-panel-enter {
		from {
			overflow: hidden;
			opacity: 0;
			transform: translateY(4px);
		}

		to {
			overflow: hidden;
			opacity: 1;
			transform: translateY(0);
		}
	}

	.sub-panel-enter {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		overflow: hidden;
		animation: sub-panel-enter var(--gl-duration-medium) var(--gl-ease-out);
	}

	@media (prefers-reduced-motion: reduce) {
		.sub-panel-enter {
			animation: none;
		}
	}
`,tj`
	:host {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		overflow: hidden;
	}
`,tj`
	:host {
		--gl-metadata-bar-bg: color-mix(in srgb, var(--color-background) 95%, var(--color-foreground) 5%);
		--gl-metadata-bar-border: var(--vscode-sideBarSectionHeader-border, var(--color-foreground--25));
		--gl-metadata-bar-min-height: 2.94rem;
	}
`;let rK=tj`
	border: var(--gl-border-width) solid var(--gl-elevation-border-color, var(--vscode-contrastBorder));
	box-shadow: var(--gl-elevation);
`;var rW=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},rG=tj`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`,rZ=Object.defineProperty,rX=Object.getOwnPropertyDescriptor,rQ=e=>{throw TypeError(e)},rY=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?rX(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&rZ(t,i,s),s},rJ=(e,t,i)=>t.has(e)||rQ("Cannot "+i),r0=tj`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`,r1=/;\s+$/;function r2(e){let{property:t,value:i,element:r}=e;if(i){let e=r.getAttribute("style")||"";e&&(e.match(r1)||(e+=";"),e+=" ");let o=`${t}: ${i}`;if(e.includes(o))return;return`${e}${o};`}return null}var r5=class extends lit_element_i{constructor(){let e;super(),(e=b).has(this)?rQ("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(this):e.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,t)=>{if(this.internals?.states)try{t?this.internals.states.add(e):this.internals.states.delete(e)}catch(e){if(String(e).includes("must start with '--'"));else throw e}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{}for(let[e,t]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===t.default&&void 0!==t.initial&&"string"==typeof e&&this.customStates.set(`initial-${e}-${t.initial}`,!0)}static get styles(){return[r0,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))})}attributeChangedCallback(e,t,i){let r,o;if(rJ(this,r=b,"read from private field"),o?!o.call(this):!r.get(this)){let e,t;this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),rJ(this,e=b,"write to private field"),t?t.call(this,!0):e.set(this,!0)}super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&null==this[i]&&(this[i]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(e){if(this.didSSR&&!this.hasUpdated){let t=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});t.error=e,this.dispatchEvent(t)}throw e}}setStyle(e,t){if(!this.style){let i=r2({property:e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),value:t,element:this});i&&this.setAttribute("style",i);return}this.style[e]=t}setStyleProperty(e,t){if(!this.style){let i=r2({property:e,value:t,element:this});i&&this.setAttribute("style",i);return}this.style.setProperty(e,t)}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};b=new WeakMap,rY([tY()],r5.prototype,"dir",2),rY([tY()],r5.prototype,"lang",2),rY([tY({type:Boolean,reflect:!0,attribute:"did-ssr"})],r5.prototype,"didSSR",2);let r3=new Set,r4=new Map,r7="ltr",r6="en",r8="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(r8){let e=new MutationObserver(oe);r7=document.documentElement.dir||"ltr",r6=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function r9(...e){e.map(e=>{let t=e.$code.toLowerCase();r4.has(t)?r4.set(t,Object.assign(Object.assign({},r4.get(t)),e)):r4.set(t,e),s||(s=e)}),oe()}function oe(){r8&&(r7=document.documentElement.dir||"ltr",r6=document.documentElement.lang||navigator.language),[...r3.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){r3.add(this.host)}hostDisconnected(){r3.delete(this.host)}dir(){return`${this.host.dir||r7}`.toLowerCase()}lang(){return`${this.host.lang||r6}`.toLowerCase()}getTranslationData(e){var t,i;let r;try{r=new Intl.Locale(e.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let o=r.language.toLowerCase(),s=null!=(i=null==(t=r.region)?void 0:t.toLowerCase())?i:"",n=r4.get(`${o}-${s}`),a=r4.get(o);return{locale:r,language:o,region:s,primary:n,secondary:a}}exists(e,t){var i;let{primary:r,secondary:o}=this.getTranslationData(null!=(i=t.lang)?i:this.lang());return t=Object.assign({includeFallback:!1},t),!!r&&!!r[e]||!!o&&!!o[e]||!!t.includeFallback&&!!s&&!!s[e]}term(e,...t){let i,{primary:r,secondary:o}=this.getTranslationData(this.lang());if(r&&r[e])i=r[e];else if(o&&o[e])i=o[e];else{if(!s||!s[e])return String(e);i=s[e]}return"function"==typeof i?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}};var ot={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",captions:"Captions",chooseDate:"Choose date",chooseDecade:"Choose decade",chooseMonth:"Choose month",chooseYear:"Choose year",clearEntry:"Clear entry",close:"Close",closeCalendar:"Close calendar",createOption:e=>`Create "${e}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",date:"Date",datePickerKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",day:"Day",incompleteDate:"Enter a valid date.",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",empty:"Empty",endDate:"End date",error:"Error",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",month:"Month",moreOptions:"More Options",mute:"Mute",nextDecade:"Next decade",nextMonth:"Next month",nextSlide:"Next slide",nextVideo:"Next Video",nextYear:"Next year",numCharacters:e=>1===e?"1 character":`${e} characters`,numCharactersRemaining:e=>1===e?"1 character remaining":`${e} characters remaining`,numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",play:"Play",playbackSpeed:"Playback speed",playlist:"Playlist",playAnimation:"Play animation",previousDecade:"Previous decade",previousMonth:"Previous month",previousSlide:"Previous slide",previousVideo:"Previous video",previousYear:"Previous year",progress:"Progress",rangeTooLong:e=>1===e?"Select a range no longer than 1 day":`Select a range no longer than ${e} days`,rangeTooShort:e=>1===e?"Select a range at least 1 day long":`Select a range at least ${e} days long`,readonly:"Read-only",selected:"Selected",selectedDateLabel:e=>`Selected: ${e}`,selectedRangeLabel:e=>`Selected range: ${e}`,selectionCleared:"Selection cleared",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,startDate:"Start date",today:"Today",toggleColorFormat:"Toggle color format",seek:"Seek",seekProgress:(e,t)=>`${e} of ${t}`,currentlyPlaying:"currently playing",unmute:"Unmute",videoPlayer:"Video player",volume:"Volume",year:"Year",zoomIn:"Zoom in",zoomOut:"Zoom out",am:"AM",chooseTime:"Choose time",closeTimeInput:"Close time picker",dayPeriod:"AM/PM",hour:"Hour",minute:"Minute",now:"Now",pm:"PM",second:"Second",time:"Time",timeInputKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the time picker."};r9(ot);var oi=class extends LocalizeController{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||"en":super.lang()}};r9(ot);let or=Math.min,oo=Math.max,os=Math.round,on=Math.floor,oa=e=>({x:e,y:e}),ol={left:"right",right:"left",bottom:"top",top:"bottom"};function oc(e,t){return"function"==typeof e?e(t):e}function oh(e){return e.split("-")[0]}function od(e){return e.split("-")[1]}function op(e){return"x"===e?"y":"x"}function ou(e){return"y"===e?"height":"width"}function og(e){let t=e[0];return"t"===t||"b"===t?"y":"x"}function of(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}let om=["left","right"],ob=["right","left"],o_=["top","bottom"],ov=["bottom","top"];function oy(e){let t=oh(e);return ol[t]+e.slice(t.length)}function ow(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function ok(e){let{x:t,y:i,width:r,height:o}=e;return{width:r,height:o,top:i,left:t,right:t+r,bottom:i+o,x:t,y:i}}function ox(e,t,i){let r,{reference:o,floating:s}=e,n=og(t),a=op(og(t)),c=ou(a),h=oh(t),p="y"===n,u=o.x+o.width/2-s.width/2,g=o.y+o.height/2-s.height/2,f=o[c]/2-s[c]/2;switch(h){case"top":r={x:u,y:o.y-s.height};break;case"bottom":r={x:u,y:o.y+o.height};break;case"right":r={x:o.x+o.width,y:g};break;case"left":r={x:o.x-s.width,y:g};break;default:r={x:o.x,y:o.y}}switch(od(t)){case"start":r[a]-=f*(i&&p?-1:1);break;case"end":r[a]+=f*(i&&p?-1:1)}return r}async function oC(e,t){var i;void 0===t&&(t={});let{x:r,y:o,platform:s,rects:n,elements:a,strategy:c}=e,{boundary:h="clippingAncestors",rootBoundary:p="viewport",elementContext:u="floating",altBoundary:g=!1,padding:f=0}=oc(t,e),m=ow(f),b=a[g?"floating"===u?"reference":"floating":u],_=ok(await s.getClippingRect({element:null==(i=await (null==s.isElement?void 0:s.isElement(b)))||i?b:b.contextElement||await (null==s.getDocumentElement?void 0:s.getDocumentElement(a.floating)),boundary:h,rootBoundary:p,strategy:c})),v="floating"===u?{x:r,y:o,width:n.floating.width,height:n.floating.height}:n.reference,y=await (null==s.getOffsetParent?void 0:s.getOffsetParent(a.floating)),w=await (null==s.isElement?void 0:s.isElement(y))&&await (null==s.getScale?void 0:s.getScale(y))||{x:1,y:1},x=ok(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:v,offsetParent:y,strategy:c}):v);return{top:(_.top-x.top+m.top)/w.y,bottom:(x.bottom-_.bottom+m.bottom)/w.y,left:(_.left-x.left+m.left)/w.x,right:(x.right-_.right+m.right)/w.x}}let o$=async(e,t,i)=>{let{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:n}=i,a=n.detectOverflow?n:{...n,detectOverflow:oC},c=await (null==n.isRTL?void 0:n.isRTL(t)),h=await n.getElementRects({reference:e,floating:t,strategy:o}),{x:p,y:u}=ox(h,r,c),g=r,f=0,m={};for(let i=0;i<s.length;i++){let b=s[i];if(!b)continue;let{name:_,fn:v}=b,{x:y,y:w,data:x,reset:C}=await v({x:p,y:u,initialPlacement:r,placement:g,strategy:o,middlewareData:m,rects:h,platform:a,elements:{reference:e,floating:t}});p=null!=y?y:p,u=null!=w?w:u,m[_]={...m[_],...x},C&&f<50&&(f++,"object"==typeof C&&(C.placement&&(g=C.placement),C.rects&&(h=!0===C.rects?await n.getElementRects({reference:e,floating:t,strategy:o}):C.rects),{x:p,y:u}=ox(h,g,c)),i=-1)}return{x:p,y:u,placement:g,strategy:o,middlewareData:m}},oE=new Set(["left","top"]);async function oS(e,t){let{placement:i,platform:r,elements:o}=e,s=await (null==r.isRTL?void 0:r.isRTL(o.floating)),n=oh(i),a=od(i),c="y"===og(i),h=oE.has(n)?-1:1,p=s&&c?-1:1,u=oc(t,e),{mainAxis:g,crossAxis:f,alignmentAxis:m}="number"==typeof u?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return a&&"number"==typeof m&&(f="end"===a?-1*m:m),c?{x:f*p,y:g*h}:{x:g*h,y:f*p}}function oA(){return"u">typeof window}function oI(e){return oT(e)?(e.nodeName||"").toLowerCase():"#document"}function oP(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function oz(e){var t;return null==(t=(oT(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function oT(e){return!!oA()&&(e instanceof Node||e instanceof oP(e).Node)}function oj(e){return!!oA()&&(e instanceof Element||e instanceof oP(e).Element)}function oR(e){return!!oA()&&(e instanceof HTMLElement||e instanceof oP(e).HTMLElement)}function oO(e){return!(!oA()||"u"<typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof oP(e).ShadowRoot)}function oM(e){let{overflow:t,overflowX:i,overflowY:r,display:o}=oV(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+i)&&"inline"!==o&&"contents"!==o}function oL(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}let oD=/transform|translate|scale|rotate|perspective|filter/,oB=/paint|layout|strict|content/,oF=e=>!!e&&"none"!==e;function oN(e){let t=oj(e)?oV(e):e;return oF(t.transform)||oF(t.translate)||oF(t.scale)||oF(t.rotate)||oF(t.perspective)||!oU()&&(oF(t.backdropFilter)||oF(t.filter))||oD.test(t.willChange||"")||oB.test(t.contain||"")}function oU(){return null==n&&(n="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),n}function oq(e){return/^(html|body|#document)$/.test(oI(e))}function oV(e){return oP(e).getComputedStyle(e)}function oH(e){return oj(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function oK(e){if("html"===oI(e))return e;let t=e.assignedSlot||e.parentNode||oO(e)&&e.host||oz(e);return oO(t)?t.host:t}function oW(e,t,i){var r;void 0===t&&(t=[]),void 0===i&&(i=!0);let o=function e(t){let i=oK(t);return oq(i)?t.ownerDocument?t.ownerDocument.body:t.body:oR(i)&&oM(i)?i:e(i)}(e),s=o===(null==(r=e.ownerDocument)?void 0:r.body),n=oP(o);if(!s)return t.concat(o,oW(o,[],i));{let e=oG(n);return t.concat(n,n.visualViewport||[],oM(o)?o:[],e&&i?oW(e):[])}}function oG(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function oZ(e){let t=oV(e),i=parseFloat(t.width)||0,r=parseFloat(t.height)||0,o=oR(e),s=o?e.offsetWidth:i,n=o?e.offsetHeight:r,a=os(i)!==s||os(r)!==n;return a&&(i=s,r=n),{width:i,height:r,$:a}}function oX(e){return oj(e)?e:e.contextElement}function oQ(e){let t=oX(e);if(!oR(t))return oa(1);let i=t.getBoundingClientRect(),{width:r,height:o,$:s}=oZ(t),n=(s?os(i.width):i.width)/r,a=(s?os(i.height):i.height)/o;return n&&Number.isFinite(n)||(n=1),a&&Number.isFinite(a)||(a=1),{x:n,y:a}}let oY=oa(0);function oJ(e){let t=oP(e);return oU()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:oY}function o0(e,t,i,r){var o;void 0===t&&(t=!1),void 0===i&&(i=!1);let s=e.getBoundingClientRect(),n=oX(e),a=oa(1);t&&(r?oj(r)&&(a=oQ(r)):a=oQ(e));let c=(void 0===(o=i)&&(o=!1),r&&(!o||r===oP(n))&&o)?oJ(n):oa(0),h=(s.left+c.x)/a.x,p=(s.top+c.y)/a.y,u=s.width/a.x,g=s.height/a.y;if(n){let e=oP(n),t=r&&oj(r)?oP(r):r,i=e,o=oG(i);for(;o&&r&&t!==i;){let e=oQ(o),t=o.getBoundingClientRect(),r=oV(o),s=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,n=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;h*=e.x,p*=e.y,u*=e.x,g*=e.y,h+=s,p+=n,o=oG(i=oP(o))}}return ok({width:u,height:g,x:h,y:p})}function o1(e,t){let i=oH(e).scrollLeft;return t?t.left+i:o0(oz(e)).left+i}function o2(e,t){let i=e.getBoundingClientRect();return{x:i.left+t.scrollLeft-o1(e,i),y:i.top+t.scrollTop}}function o5(e,t,i){var r;let o;if("viewport"===t)o=function(e,t){let i=oP(e),r=oz(e),o=i.visualViewport,s=r.clientWidth,n=r.clientHeight,a=0,c=0;if(o){s=o.width,n=o.height;let e=oU();(!e||e&&"fixed"===t)&&(a=o.offsetLeft,c=o.offsetTop)}let h=o1(r);if(h<=0){let e=r.ownerDocument,t=e.body,i=getComputedStyle(t),o="CSS1Compat"===e.compatMode&&parseFloat(i.marginLeft)+parseFloat(i.marginRight)||0,n=Math.abs(r.clientWidth-t.clientWidth-o);n<=25&&(s-=n)}else h<=25&&(s+=h);return{width:s,height:n,x:a,y:c}}(e,i);else if("document"===t){let t,i,s,n,a,c,h;r=oz(e),t=oz(r),i=oH(r),s=r.ownerDocument.body,n=oo(t.scrollWidth,t.clientWidth,s.scrollWidth,s.clientWidth),a=oo(t.scrollHeight,t.clientHeight,s.scrollHeight,s.clientHeight),c=-i.scrollLeft+o1(r),h=-i.scrollTop,"rtl"===oV(s).direction&&(c+=oo(t.clientWidth,s.clientWidth)-n),o={width:n,height:a,x:c,y:h}}else if(oj(t)){let e,r,s,n,a,c;r=(e=o0(t,!0,"fixed"===i)).top+t.clientTop,s=e.left+t.clientLeft,n=oR(t)?oQ(t):oa(1),a=t.clientWidth*n.x,c=t.clientHeight*n.y,o={width:a,height:c,x:s*n.x,y:r*n.y}}else{let i=oJ(e);o={x:t.x-i.x,y:t.y-i.y,width:t.width,height:t.height}}return ok(o)}function o3(e){return"static"===oV(e).position}function o4(e,t){if(!oR(e)||"fixed"===oV(e).position)return null;if(t)return t(e);let i=e.offsetParent;return oz(e)===i&&(i=i.ownerDocument.body),i}function o7(e,t){var i;let r=oP(e);if(oL(e))return r;if(!oR(e)){let t=oK(e);for(;t&&!oq(t);){if(oj(t)&&!o3(t))return t;t=oK(t)}return r}let o=o4(e,t);for(;o&&(i=o,/^(table|td|th)$/.test(oI(i)))&&o3(o);)o=o4(o,t);return o&&oq(o)&&o3(o)&&!oN(o)?r:o||function(e){let t=oK(e);for(;oR(t)&&!oq(t);){if(oN(t))return t;if(oL(t))break;t=oK(t)}return null}(e)||r}let o6=async function(e){let t=this.getOffsetParent||o7,i=this.getDimensions,r=await i(e.floating);return{reference:function(e,t,i){let r=oR(t),o=oz(t),s="fixed"===i,n=o0(e,!0,s,t),a={scrollLeft:0,scrollTop:0},c=oa(0);if(r||!r&&!s)if(("body"!==oI(t)||oM(o))&&(a=oH(t)),r){let e=o0(t,!0,s,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else o&&(c.x=o1(o));s&&!r&&o&&(c.x=o1(o));let h=!o||r||s?oa(0):o2(o,a);return{x:n.left+a.scrollLeft-c.x-h.x,y:n.top+a.scrollTop-c.y-h.y,width:n.width,height:n.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},o8={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:i,offsetParent:r,strategy:o}=e,s="fixed"===o,n=oz(r),a=!!t&&oL(t.floating);if(r===n||a&&s)return i;let c={scrollLeft:0,scrollTop:0},h=oa(1),p=oa(0),u=oR(r);if((u||!u&&!s)&&(("body"!==oI(r)||oM(n))&&(c=oH(r)),u)){let e=o0(r);h=oQ(r),p.x=e.x+r.clientLeft,p.y=e.y+r.clientTop}let g=!n||u||s?oa(0):o2(n,c);return{width:i.width*h.x,height:i.height*h.y,x:i.x*h.x-c.scrollLeft*h.x+p.x+g.x,y:i.y*h.y-c.scrollTop*h.y+p.y+g.y}},getDocumentElement:oz,getClippingRect:function(e){let{element:t,boundary:i,rootBoundary:r,strategy:o}=e,s=[..."clippingAncestors"===i?oL(t)?[]:function(e,t){let i=t.get(e);if(i)return i;let r=oW(e,[],!1).filter(e=>oj(e)&&"body"!==oI(e)),o=null,s="fixed"===oV(e).position,n=s?oK(e):e;for(;oj(n)&&!oq(n);){let t=oV(n),i=oN(n);i||"fixed"!==t.position||(o=null),(s?i||o:!(!i&&"static"===t.position&&o&&("absolute"===o.position||"fixed"===o.position)||oM(n)&&!i&&function e(t,i){let r=oK(t);return!(r===i||!oj(r)||oq(r))&&("fixed"===oV(r).position||e(r,i))}(e,n)))?o=t:r=r.filter(e=>e!==n),n=oK(n)}return t.set(e,r),r}(t,this._c):[].concat(i),r],n=o5(t,s[0],o),a=n.top,c=n.right,h=n.bottom,p=n.left;for(let e=1;e<s.length;e++){let i=o5(t,s[e],o);a=oo(i.top,a),c=or(i.right,c),h=or(i.bottom,h),p=oo(i.left,p)}return{width:c-p,height:h-a,x:p,y:a}},getOffsetParent:o7,getElementRects:o6,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:i}=oZ(e);return{width:t,height:i}},getScale:oQ,isElement:oj,isRTL:function(e){return"rtl"===oV(e).direction}};function o9(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}let se=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var i,r;let o,s,{placement:n,rects:a,platform:c,elements:h}=t,{apply:p=()=>{},...u}=oc(e,t),g=await c.detectOverflow(t,u),f=oh(n),m=od(n),b="y"===og(n),{width:_,height:v}=a.floating;"top"===f||"bottom"===f?(o=f,s=m===(await (null==c.isRTL?void 0:c.isRTL(h.floating))?"start":"end")?"left":"right"):(s=f,o="end"===m?"top":"bottom");let y=v-g.top-g.bottom,w=_-g.left-g.right,x=or(v-g[o],y),C=or(_-g[s],w),$=!t.middlewareData.shift,E=x,A=C;if(null!=(i=t.middlewareData.shift)&&i.enabled.x&&(A=w),null!=(r=t.middlewareData.shift)&&r.enabled.y&&(E=y),$&&!m){let e=oo(g.left,0),t=oo(g.right,0),i=oo(g.top,0),r=oo(g.bottom,0);b?A=_-2*(0!==e||0!==t?e+t:oo(g.left,g.right)):E=v-2*(0!==i||0!==r?i+r:oo(g.top,g.bottom))}await p({...t,availableWidth:A,availableHeight:E});let P=await c.getDimensions(h.floating);return _!==P.width||v!==P.height?{reset:{rects:!0}}:{}}}};function st(e){var t=e;for(let e=t;e;e=si(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=si(t);e;e=si(e)){if(!(e instanceof Element))continue;let t=getComputedStyle(e);if("contents"!==t.display&&("static"!==t.position||oN(t)||"BODY"===e.tagName))return e}return null}function si(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}let sr=eU(class extends directive_i{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let i=e.element.classList;for(let e of this.st)e in t||(i.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return tr}});function so(e){return null!==e&&"object"==typeof e&&"getBoundingClientRect"in e&&(!("contextElement"in e)||e instanceof Element)}var ss=!!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),sn=class extends r5{constructor(){super(...arguments),this.localize=new oi(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),r=0,o=0,s=0,n=0,a=0,c=0,h=0,p=0;i?e.top<t.top?(r=e.left,o=e.bottom,s=e.right,n=e.bottom,a=t.left,c=t.top,h=t.right,p=t.top):(r=t.left,o=t.bottom,s=t.right,n=t.bottom,a=e.left,c=e.top,h=e.right,p=e.top):e.left<t.left?(r=e.right,o=e.top,s=t.left,n=t.top,a=e.right,c=e.bottom,h=t.left,p=t.bottom):(r=t.right,o=t.top,s=e.left,n=e.top,a=t.right,c=t.bottom,h=e.left,p=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${p}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=ss,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||so(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=function(e,t,i,r){let o;void 0===r&&(r={});let{ancestorScroll:s=!0,ancestorResize:n=!0,elementResize:a="function"==typeof ResizeObserver,layoutShift:c="function"==typeof IntersectionObserver,animationFrame:h=!1}=r,p=oX(e),u=s||n?[...p?oW(p):[],...t?oW(t):[]]:[];u.forEach(e=>{s&&e.addEventListener("scroll",i,{passive:!0}),n&&e.addEventListener("resize",i)});let g=p&&c?function(e,t){let i,r=null,o=oz(e);function s(){var e;clearTimeout(i),null==(e=r)||e.disconnect(),r=null}return!function n(a,c){void 0===a&&(a=!1),void 0===c&&(c=1),s();let h=e.getBoundingClientRect(),{left:p,top:u,width:g,height:f}=h;if(a||t(),!g||!f)return;let m={rootMargin:-on(u)+"px "+-on(o.clientWidth-(p+g))+"px "+-on(o.clientHeight-(u+f))+"px "+-on(p)+"px",threshold:oo(0,or(1,c))||1},b=!0;function _(t){let r=t[0].intersectionRatio;if(r!==c){if(!b)return n();r?n(!1,r):i=setTimeout(()=>{n(!1,1e-7)},1e3)}1!==r||o9(h,e.getBoundingClientRect())||n(),b=!1}try{r=new IntersectionObserver(_,{...m,root:o.ownerDocument})}catch{r=new IntersectionObserver(_,m)}r.observe(e)}(!0),s}(p,i):null,f=-1,m=null;a&&(m=new ResizeObserver(e=>{let[r]=e;r&&r.target===p&&m&&t&&(m.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;null==(e=m)||e.observe(t)})),i()}),p&&!h&&m.observe(p),t&&m.observe(t));let b=h?o0(e):null;return h&&function t(){let r=o0(e);b&&!o9(b,r)&&i(),b=r,o=requestAnimationFrame(t)}(),i(),()=>{var e;u.forEach(e=>{s&&e.removeEventListener("scroll",i),n&&e.removeEventListener("resize",i)}),null==g||g(),null==(e=m)||e.disconnect(),m=null,h&&cancelAnimationFrame(o)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){var e,t,i,r,o,s;let n,a,c,h,p;if(!this.active||!this.anchorEl||!this.popup)return;let u=[{name:"offset",options:e={mainAxis:this.distance,crossAxis:this.skidding},async fn(t){var i,r;let{x:o,y:s,placement:n,middlewareData:a}=t,c=await oS(t,e);return n===(null==(i=a.offset)?void 0:i.placement)&&null!=(r=a.arrow)&&r.alignmentOffset?{}:{x:o+c.x,y:s+c.y,data:{...c,placement:n}}}}];this.sync?u.push(se({apply:({rects:e})=>{let t="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.SUPPORTS_POPOVER&&!so(this.anchor)&&"scroll"===this.boundary&&(n=oW(this.anchorEl).filter(e=>e instanceof Element)),this.flip&&u.push({name:"flip",options:t={boundary:this.flipBoundary||n,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(e){var i,r,o,s,n,a,c,h;let p,u,g,{placement:f,middlewareData:m,rects:b,initialPlacement:_,platform:v,elements:y}=e,{mainAxis:w=!0,crossAxis:x=!0,fallbackPlacements:C,fallbackStrategy:$="bestFit",fallbackAxisSideDirection:E="none",flipAlignment:A=!0,...P}=oc(t,e);if(null!=(i=m.arrow)&&i.alignmentOffset)return{};let T=oh(f),j=og(_),O=oh(_)===_,M=await (null==v.isRTL?void 0:v.isRTL(y.floating)),D=C||(O||!A?[oy(_)]:(p=oy(_),[of(_),p,of(p)])),B="none"!==E;!C&&B&&D.push(...(u=od(_),g=function(e,t,i){switch(e){case"top":case"bottom":if(i)return t?ob:om;return t?om:ob;case"left":case"right":return t?o_:ov;default:return[]}}(oh(_),"start"===E,M),u&&(g=g.map(e=>e+"-"+u),A&&(g=g.concat(g.map(of)))),g));let F=[_,...D],N=await v.detectOverflow(e,P),U=[],q=(null==(r=m.flip)?void 0:r.overflows)||[];if(w&&U.push(N[T]),x){let e,t,i,r,o=(a=f,c=b,void 0===(h=M)&&(h=!1),e=od(a),i=ou(t=op(og(a))),r="x"===t?e===(h?"end":"start")?"right":"left":"start"===e?"bottom":"top",c.reference[i]>c.floating[i]&&(r=oy(r)),[r,oy(r)]);U.push(N[o[0]],N[o[1]])}if(q=[...q,{placement:f,overflows:U}],!U.every(e=>e<=0)){let e=((null==(o=m.flip)?void 0:o.index)||0)+1,t=F[e];if(t&&("alignment"!==x||j===og(t)||q.every(e=>og(e.placement)!==j||e.overflows[0]>0)))return{data:{index:e,overflows:q},reset:{placement:t}};let i=null==(s=q.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:s.placement;if(!i)switch($){case"bestFit":{let e=null==(n=q.filter(e=>{if(B){let t=og(e.placement);return t===j||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:n[0];e&&(i=e);break}case"initialPlacement":i=_}if(f!==i)return{reset:{placement:i}}}return{}}}),this.shift&&u.push({name:"shift",options:i={boundary:this.shiftBoundary||n,padding:this.shiftPadding},async fn(e){let{x:t,y:r,placement:o,platform:s}=e,{mainAxis:n=!0,crossAxis:a=!1,limiter:c={fn:e=>{let{x:t,y:i}=e;return{x:t,y:i}}},...h}=oc(i,e),p={x:t,y:r},u=await s.detectOverflow(e,h),g=og(oh(o)),f=op(g),m=p[f],b=p[g];if(n){let e="y"===f?"top":"left",t="y"===f?"bottom":"right",i=m+u[e],r=m-u[t];m=oo(i,or(m,r))}if(a){let e="y"===g?"top":"left",t="y"===g?"bottom":"right",i=b+u[e],r=b-u[t];b=oo(i,or(b,r))}let _=c.fn({...e,[f]:m,[g]:b});return{..._,data:{x:_.x-t,y:_.y-r,enabled:{[f]:n,[g]:a}}}}}),this.autoSize?u.push(se({boundary:this.autoSizeBoundary||n,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&u.push({name:"arrow",options:a={element:this.arrowEl,padding:this.arrowPadding},async fn(e){let{x:t,y:i,placement:r,rects:o,platform:s,elements:n,middlewareData:c}=e,{element:h,padding:p=0}=oc(a,e)||{};if(null==h)return{};let u=ow(p),g={x:t,y:i},f=op(og(r)),m=ou(f),b=await s.getDimensions(h),_="y"===f,v=_?"clientHeight":"clientWidth",y=o.reference[m]+o.reference[f]-g[f]-o.floating[m],w=g[f]-o.reference[f],x=await (null==s.getOffsetParent?void 0:s.getOffsetParent(h)),C=x?x[v]:0;C&&await (null==s.isElement?void 0:s.isElement(x))||(C=n.floating[v]||o.floating[m]);let $=C/2-b[m]/2-1,E=or(u[_?"top":"left"],$),A=or(u[_?"bottom":"right"],$),P=C-b[m]-A,T=C/2-b[m]/2+(y/2-w/2),j=oo(E,or(T,P)),O=!c.arrow&&null!=od(r)&&T!==j&&o.reference[m]/2-(T<E?E:A)-b[m]/2<0,M=O?T<E?T-E:T-P:0;return{[f]:g[f]+M,data:{[f]:j,centerOffset:T-j-M,...O&&{alignmentOffset:M}},reset:O}}});let g=this.SUPPORTS_POPOVER?e=>o8.getOffsetParent(e,st):o8.getOffsetParent;(r=this.anchorEl,o=this.popup,s={placement:this.placement,middleware:u,strategy:this.SUPPORTS_POPOVER?"absolute":"fixed",platform:{...o8,getOffsetParent:g}},c=new Map,p={...(h={platform:o8,...s}).platform,_c:c},o$(r,o,{...h,platform:p})).then(({x:e,y:t,middlewareData:i,placement:r})=>{let o="rtl"===this.localize.dir(),s={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=i.arrow.x,t=i.arrow.y,r="",n="",a="",c="";if("start"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",n=o?i:"",c=o?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";n=o?"":i,c=o?i:"",a="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(c="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",r="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(c="number"==typeof e?`${e}px`:"",r="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:r,right:n,bottom:a,left:c,[s]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new rW)}render(){return tt`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${sr({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${sr({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?tt`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};sn.css=rG,rY([t1(".popup")],sn.prototype,"popup",2),rY([t1(".arrow")],sn.prototype,"arrowEl",2),rY([tY({attribute:!1,type:Boolean})],sn.prototype,"SUPPORTS_POPOVER",2),rY([tY()],sn.prototype,"anchor",2),rY([tY({type:Boolean,reflect:!0})],sn.prototype,"active",2),rY([tY({reflect:!0})],sn.prototype,"placement",2),rY([tY()],sn.prototype,"boundary",2),rY([tY({type:Number})],sn.prototype,"distance",2),rY([tY({type:Number})],sn.prototype,"skidding",2),rY([tY({type:Boolean})],sn.prototype,"arrow",2),rY([tY({attribute:"arrow-placement"})],sn.prototype,"arrowPlacement",2),rY([tY({attribute:"arrow-padding",type:Number})],sn.prototype,"arrowPadding",2),rY([tY({type:Boolean})],sn.prototype,"flip",2),rY([tY({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],sn.prototype,"flipFallbackPlacements",2),rY([tY({attribute:"flip-fallback-strategy"})],sn.prototype,"flipFallbackStrategy",2),rY([tY({type:Object})],sn.prototype,"flipBoundary",2),rY([tY({attribute:"flip-padding",type:Number})],sn.prototype,"flipPadding",2),rY([tY({type:Boolean})],sn.prototype,"shift",2),rY([tY({type:Object})],sn.prototype,"shiftBoundary",2),rY([tY({attribute:"shift-padding",type:Number})],sn.prototype,"shiftPadding",2),rY([tY({attribute:"auto-size"})],sn.prototype,"autoSize",2),rY([tY()],sn.prototype,"sync",2),rY([tY({type:Object})],sn.prototype,"autoSizeBoundary",2),rY([tY({attribute:"auto-size-padding",type:Number})],sn.prototype,"autoSizePadding",2),rY([tY({attribute:"hover-bridge",type:Boolean})],sn.prototype,"hoverBridge",2),sn=rY([tX("wa-popup")],sn);var sa=Object.defineProperty,sl=Object.getOwnPropertyDescriptor,sc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sa(t,i,s),s};let sh=["top","right","bottom","left","top-left","top-right","bottom-left","bottom-right"],sd=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.autoSizeVertical=!1,this.skidding=0,this.trigger="hover focus",this.suppressed=!1,this.handleReposition=()=>{let e=this.popup?.getAttribute("data-current-placement");null!=e&&e!==this._resolvedPlacement&&(this._resolvedPlacement=e)},this.handleResizePointerDown=e=>{if(0!==e.button)return;let t=e.currentTarget,i=t.dataset.handle;if(null==i)return;e.preventDefault();let r="right"===i||"top-right"===i||"bottom-right"===i,o="left"===i||"top-left"===i||"bottom-left"===i,s="bottom"===i||"bottom-left"===i||"bottom-right"===i,n="top"===i||"top-left"===i||"top-right"===i,a=this.body,c=e.clientX,h=e.clientY,p=a.getBoundingClientRect(),u=p.width,g=p.height;t.setPointerCapture(e.pointerId),t.classList.add("popover__resizer--active"),this.toggleAttribute("dragging",!0);let f=e=>{let t=e.clientX-c,i=e.clientY-h;r?a.style.width=`${Math.max(0,u+t)}px`:o&&(a.style.width=`${Math.max(0,u-t)}px`),s?a.style.height=`${Math.max(0,g+i)}px`:n&&(a.style.height=`${Math.max(0,g-i)}px`),this.popup?.reposition()},m=()=>{this.toggleAttribute("dragging",!1),t.classList.remove("popover__resizer--active"),t.removeEventListener("pointermove",f),t.removeEventListener("lostpointercapture",m),t.removeEventListener("pointerup",m)};t.addEventListener("pointermove",f,{passive:!0}),t.addEventListener("lostpointercapture",m),t.addEventListener("pointerup",m)},this.handleTriggerBlur=e=>{this.open&&(this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&(e.relatedTarget&&this.contains(e.relatedTarget)||this.hide())},this.handleTriggerClick=e=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(e.composedPath().includes(this.body))return;this.hide()}else this._skipHideOnClick=!1,this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=e=>{let t=this.hasTrigger("focus")||this.hasTrigger("focus-visible");this.hasTrigger("click")&&t&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,!this.open||"hover"!==this._triggeredBy||this.hasTrigger("click")||e.composedPath().includes(this.body)||(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=e=>{let t=this.hasTrigger("focus"),i=this.hasTrigger("focus-visible");if(t||i){if(!t&&i){let t=e.target;if(null==t||"function"!=typeof t.matches||!t.matches(":focus-visible"))return}this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus")}},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handlePopupBlur=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let e=iS(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let e=iS(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),e)}}}static closeOthers(e){for(let t of sd.openPopovers)t===e||function(e,t){let i=t;for(;null!=i;){if(i===e)return!0;i=i.parentNode??(i instanceof ShadowRoot?i.host:null)}return!1}(t,e)||t.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,sd.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),this.updateResizeObserver()}updateResizeObserver(){null!=this.resize?null==this.resizeObserver&&null!=this.body&&(this.resizeObserver=new ResizeObserver(()=>this.popup?.reposition()),this.resizeObserver.observe(this.body)):null!=this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}render(){let e=this._resolvedPlacement??this.placement,t=(function(e){if(!e)return[];let t=new Set;for(let i of e.trim().split(/\s+/))switch(i){case"horizontal":t.add("right");break;case"vertical":t.add("bottom");break;case"both":t.add("right"),t.add("bottom"),t.add("bottom-right");break;case"all":for(let e of sh)t.add(e);break;default:sh.includes(i)&&t.add(i)}return[...t]})(this.resize).filter(t=>!function(e,t){let i,r;if(!t)return!1;let[o,s]=t.split("-");switch(o){case"top":i="bottom";break;case"right":i="left";break;case"bottom":i="top";break;case"left":i="right"}let n="left"===o||"right"===o;"start"===s?r=n?"top":"left":"end"===s&&(r=n?"bottom":"right");let a=t=>null!=t&&(e===t||e.startsWith(`${t}-`)||e.endsWith(`-${t}`));return a(i)||a(r)}(t,e));return tt`<wa-popup
			part="base"
			exportparts="
				popup:base__popup,
				arrow:base__arrow,
				hover-bridge:base__hover-bridge
			"
			class="popover"
			.anchor=${this.anchor}
			placement=${this.placement}
			.distance=${this.distance}
			.skidding=${this.skidding}
			auto-size=${this.autoSizeVertical?"both":"horizontal"}
			auto-size-padding="3"
			flip-padding="3"
			flip
			shift
			?arrow=${this.arrow}
			hover-bridge
			@wa-reposition=${this.handleReposition}
		>
			<div slot="anchor" aria-describedby="popover">
				<slot name="anchor"></slot>
			</div>

			<div
				part="body"
				id="popover"
				class="popover__body scrollable ${"menu"===this.appearance?"is-menu":""}"
				role="tooltip"
				aria-live=${this.open?"polite":"off"}
			>
				<slot name="content"></slot>
				${t.map(e=>tt`<div
							class="popover__resizer popover__resizer--${e}"
							role="separator"
							aria-orientation=${"top"===e||"bottom"===e?"horizontal":"vertical"}
							aria-label="Resize"
							data-handle=${e}
							@pointerdown=${this.handleResizePointerDown}
						></div>`)}
			</div>
		</wa-popup>`}async show(e){if(this.open||this.suppressed){"click"===e&&"hover"===this._triggeredBy&&(this._triggeredBy=e);return}return(null==this._triggeredBy||"hover"!==e)&&(this._triggeredBy=e),sd.closeOthers(this),this.open=!0,sd.openPopovers.add(this),iA(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,sd.openPopovers.delete(this),iA(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(e){return this.trigger.split(" ").includes(e)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleResizeChange(){this.updateResizeObserver()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};sd.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sd.openPopovers=new Set,sd.styles=[rH,tj`
			:host {
				--hide-delay: 100ms;
				--show-delay: 500ms;

				display: contents;
			}

			.popover {
				--arrow-size: var(--wa-tooltip-arrow-size);
				--arrow-color: var(--wa-tooltip-background-color);

				/* tells wa-popup to overlap the arrow with the inside edge of our 1px body
		   border, so the arrow base aligns with the body's content area instead of
		   sitting on top of the border line */
				--popup-border-width: 1px;
			}

			.popover[placement^='top']::part(popup) {
				transform-origin: bottom;
			}

			.popover[placement^='bottom']::part(popup) {
				transform-origin: top;
			}

			.popover[placement^='left']::part(popup) {
				transform-origin: right;
			}

			.popover[placement^='right']::part(popup) {
				transform-origin: left;
			}

			.popover__body {
				--gl-elevation: var(--gl-shadow-popover);
				--gl-elevation-border-color: var(--gl-tooltip-border-color);

				display: block;
				width: fit-content;
				min-width: 0;
				max-width: min(var(--auto-size-available-width), var(--max-width, 70vw));
				padding: var(--wa-tooltip-padding);
				overflow: hidden;
				font-family: var(--wa-tooltip-font-family);
				font-size: var(--wa-tooltip-font-size);
				font-weight: var(--wa-tooltip-font-weight);
				line-height: var(--wa-tooltip-line-height);
				color: var(--wa-tooltip-color);
				text-align: start;
				white-space: normal;
				pointer-events: all;
				-webkit-user-select: none;
				user-select: none;
				background-color: var(--wa-tooltip-background-color);
				border-radius: var(--wa-tooltip-border-radius);

				${rK}
			}

			/* Keep the body's visible border at the elevation color on hover/focus. The body carries the
			   .scrollable class (so it can scroll when content overflows), and scrollableBase's
			   :host(:hover) .scrollable rule would otherwise flip its border-color to the scrollbar-slider
			   color — the body's own scrollbar thumb is handled separately below. */
			:host(:hover) .popover__body,
			:host(:focus-within) .popover__body {
				border-color: var(--gl-elevation-border-color, var(--vscode-contrastBorder));
			}

			:host([auto-size-vertical]) .popover__body {
				display: flex;
				flex-direction: column;
				max-height: var(--auto-size-available-height);
				overflow: hidden;
			}

			:host([resize]) .popover__body {
				position: relative;
			}

			.popover__resizer {
				position: absolute;
				z-index: 1;
				touch-action: none;
				background-color: transparent;
				transition: background-color var(--gl-duration-x-fast) var(--gl-ease-out);
			}

			/* Edges — 4px thick bars */
			.popover__resizer--top {
				top: 0;
				right: 0;
				left: 0;
				height: 4px;
				cursor: ns-resize;
			}

			.popover__resizer--right {
				top: 0;
				right: 0;
				bottom: 0;
				width: 4px;
				cursor: ew-resize;
			}

			.popover__resizer--bottom {
				right: 0;
				bottom: 0;
				left: 0;
				height: 4px;
				cursor: ns-resize;
			}

			.popover__resizer--left {
				top: 0;
				bottom: 0;
				left: 0;
				width: 4px;
				cursor: ew-resize;
			}

			/* Corners — 12px squares, layered above edges */
			.popover__resizer--top-left,
			.popover__resizer--top-right,
			.popover__resizer--bottom-left,
			.popover__resizer--bottom-right {
				z-index: 2;
				width: 12px;
				height: 12px;
			}

			.popover__resizer--top-left {
				top: 0;
				left: 0;
				cursor: nwse-resize;
			}

			.popover__resizer--top-right {
				top: 0;
				right: 0;
				cursor: nesw-resize;
			}

			.popover__resizer--bottom-left {
				bottom: 0;
				left: 0;
				cursor: nesw-resize;
			}

			.popover__resizer--bottom-right {
				right: 0;
				bottom: 0;
				cursor: nwse-resize;
			}

			/* Extended hit area for easier grabbing on edges */
			.popover__resizer--top::after,
			.popover__resizer--right::after,
			.popover__resizer--bottom::after,
			.popover__resizer--left::after {
				position: absolute;
				content: '';
			}

			.popover__resizer--top::after {
				inset: -4px 0 -2px;
			}

			.popover__resizer--right::after {
				inset: 0 -4px 0 -2px;
			}

			.popover__resizer--bottom::after {
				inset: -2px 0 -4px;
			}

			.popover__resizer--left::after {
				inset: 0 -2px 0 -4px;
			}

			.popover__resizer:hover,
			:host([dragging]) .popover__resizer--active {
				background-color: var(--vscode-sash-hoverBorder, var(--vscode-focusBorder));
				transition-delay: 0.2s;
			}

			:host([dragging]) .popover__resizer--active {
				transition-delay: 0s;
			}

			/* Override scrollbar thumb to not inherit border-color from the popover
	   body's visible border, which conflicts with the scrollableBase trick */
			.popover__body::-webkit-scrollbar-thumb {
				border-color: transparent;
			}

			:host(:hover) .popover__body::-webkit-scrollbar-thumb,
			:host(:focus-within) .popover__body::-webkit-scrollbar-thumb {
				border-color: var(--vscode-scrollbarSlider-background);
			}

			.popover[data-current-placement^='top'] .popover__body,
			.popover[data-current-placement^='bottom'] .popover__body {
				width: max-content;
			}

			/* Scope menu styling to the popover body + arrow so it doesn't leak via
			   custom-property inheritance into a tooltip slotted as the anchor (which
			   would wrongly paint that tooltip with the menu background). */
			:host([appearance='menu']) .popover__body {
				--wa-tooltip-padding: var(--wa-spacing-2x-small);
				--wa-tooltip-font-size: var(--vscode-font-size);
				--wa-tooltip-background-color: var(--vscode-menu-background);
			}

			:host([appearance='menu']) .popover {
				--arrow-color: var(--vscode-menu-background);
			}

			[slot='anchor'] {
				width: var(--gl-popover-anchor-width, fit-content);
				max-width: 100%;
				overflow: hidden;
			}
		`],sc([t1("#popover")],sd.prototype,"body",2),sc([t1("wa-popup")],sd.prototype,"popup",2),sc([tY({reflect:!0})],sd.prototype,"placement",2),sc([tY({type:Object})],sd.prototype,"anchor",2),sc([tY({reflect:!0,type:Boolean})],sd.prototype,"disabled",2),sc([tY({type:Number})],sd.prototype,"distance",2),sc([tY({reflect:!0,type:Boolean})],sd.prototype,"open",2),sc([tY({reflect:!0,type:Boolean})],sd.prototype,"arrow",2),sc([tY({reflect:!0,type:Boolean,attribute:"auto-size-vertical"})],sd.prototype,"autoSizeVertical",2),sc([tY({reflect:!0})],sd.prototype,"resize",2),sc([tY({type:Number})],sd.prototype,"skidding",2),sc([tY()],sd.prototype,"trigger",2),sc([tY({reflect:!0})],sd.prototype,"appearance",2),sc([tJ()],sd.prototype,"suppressed",2),sc([tJ()],sd.prototype,"_resolvedPlacement",2),sc([t7("open",{afterFirstUpdate:!0})],sd.prototype,"handleOpenChange",1),sc([t7(["distance","placement","skidding"])],sd.prototype,"handleOptionsChange",1),sc([t7("resize",{afterFirstUpdate:!0})],sd.prototype,"handleResizeChange",1),sc([t7("disabled")],sd.prototype,"handleDisabledChange",1),sd=sc([tX("gl-popover")],sd);var sp=Object.defineProperty,su=Object.getOwnPropertyDescriptor,sg=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?su(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sp(t,i,s),s};let sf=0,sm=[],sb=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.showDelay=500,this.hideDelay=0,this.suppressed=!1,this.open=!1,this.bodyId=`gl-tooltip-${++sf}`,this.onAnchorSlotChange=e=>{let t=e.target.assignedElements({flatten:!0})[0];t!==this.anchorEl&&(this.detachAnchor(),this.attachAnchor(t))},this.onDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&sm.at(-1)===this&&(e.preventDefault(),e.stopPropagation(),this.open=!1)},this.onMouseOver=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!0},this.showDelay))},this.onMouseOut=()=>{this.anchorEl?.matches(":hover")||this.matches(":hover")||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!1},this.hideDelay))},this.onFocusIn=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.open=!0)},this.onFocusOut=()=>{clearTimeout(this.hoverTimeout),this.open=!1},this.onMouseDown=e=>{this.suppressed=!0,this.open=!1},this.onMouseUp=e=>{this.suppressed=!1},this.onDragStart=e=>{this.suppressed=!0,this.open=!1},this.onDragEnd=e=>{this.suppressed=!1},this.onClick=e=>{this.hideOnClick&&(this.open=!1)}}connectedCallback(){super.connectedCallback?.(),this.eventController=new AbortController;let{signal:e}=this.eventController;this.addEventListener("mouseover",this.onMouseOver,{signal:e}),this.addEventListener("mouseout",this.onMouseOut,{signal:e}),this.addEventListener("focusin",this.onFocusIn,{signal:e}),this.addEventListener("focusout",this.onFocusOut,{signal:e}),this.addEventListener("mousedown",this.onMouseDown,{signal:e}),this.addEventListener("click",this.onClick,{signal:e}),window.addEventListener("mouseup",this.onMouseUp,{signal:e}),window.addEventListener("dragstart",this.onDragStart,{capture:!0,signal:e}),window.addEventListener("dragend",this.onDragEnd,{capture:!0,signal:e})}disconnectedCallback(){this.eventController?.abort(),this.eventController=void 0,this.detachAnchor(),this.unregisterDismissible(),clearTimeout(this.hoverTimeout),super.disconnectedCallback?.()}updated(e){e.has("open")&&(this.open?this.registerDismissible():this.unregisterDismissible()),e.has("disabled")&&this.disabled&&this.open&&(this.open=!1)}attachAnchor(e){null!=e&&(this.anchorEl=e,this.addAriaDescribedBy(e,this.bodyId))}detachAnchor(){null!=this.anchorEl&&(this.removeAriaDescribedBy(this.anchorEl,this.bodyId),this.anchorEl=void 0)}addAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);i.includes(t)||(i.push(t),e.setAttribute("aria-describedby",i.join(" ")))}removeAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean).filter(e=>e!==t);0===i.length?e.removeAttribute("aria-describedby"):e.setAttribute("aria-describedby",i.join(" "))}registerDismissible(){sm.includes(this)||(sm.push(this),document.addEventListener("keydown",this.onDocumentKeyDown,{signal:this.eventController?.signal}))}unregisterDismissible(){let e=sm.indexOf(this);-1!==e&&sm.splice(e,1),document.removeEventListener("keydown",this.onDocumentKeyDown)}async hide(){this.open=!1,await this.updateComplete}async show(){this.disabled||this.suppressed||(this.open=!0,await this.updateComplete)}render(){return tt`<wa-popup
			part="base"
			exportparts="
				popup:base__popup,
				arrow:base__arrow
			"
			class="tooltip"
			placement=${this.placement}
			.distance=${this.distance}
			?active=${this.open&&!this.disabled&&!this.suppressed}
			flip
			flip-padding="3"
			shift
			shift-padding="3"
			auto-size="horizontal"
			auto-size-padding="3"
			arrow
			hover-bridge
		>
			<slot slot="anchor" @slotchange=${this.onAnchorSlotChange}></slot>
			<div
				part="body"
				id=${this.bodyId}
				class="tooltip__body"
				role="tooltip"
				aria-live=${this.open?"polite":"off"}
			>
				<slot name="content">${rF(this.content)}</slot>
			</div>
		</wa-popup>`}};sb.styles=tj`
		:host {
			--max-width: var(--gl-tooltip-max-width, 320px);

			display: contents;
			max-width: inherit;
			overflow: inherit;
			text-transform: var(--gl-tooltip-text-transform, none);
		}

		.tooltip {
			--arrow-size: var(--wa-tooltip-arrow-size);
			--arrow-color: var(--wa-tooltip-background-color);

			/* tells wa-popup to overlap the arrow with the inside edge of our 1px body
		   border, so the arrow base aligns with the body's content area instead of
		   sitting on top of the border line */
			--popup-border-width: 1px;
		}

		.tooltip::part(popup) {
			pointer-events: none;
		}

		/* Suppress the corner-flash that happens on first open: wa-popup adds the popup
	   to the DOM with active=true a microtask BEFORE floating-ui computes its position,
	   so the popup briefly renders at top:0/left:0 (page corner) for one paint frame.
	   wa-popup sets data-current-placement once positioned — gate visibility on that
	   so the user never sees the unpositioned frame. Verified live: the unpositioned
	   frame lands at (0,0) ~1ms before the positioned frame lands at the anchor. */
		.tooltip:not([data-current-placement]) .tooltip__body {
			visibility: hidden;
		}

		.tooltip__body {
			--gl-elevation: var(--gl-shadow-tooltip);
			--gl-elevation-border-color: var(--gl-tooltip-border-color);

			max-width: min(var(--auto-size-available-width, 100vw), var(--max-width));
			padding: var(--wa-tooltip-padding);
			font-family: var(--wa-tooltip-font-family);
			font-size: var(--wa-tooltip-font-size);
			font-weight: var(--wa-tooltip-font-weight);
			line-height: var(--wa-tooltip-line-height);
			color: var(--wa-tooltip-color);
			text-align: start;
			text-transform: var(--gl-tooltip-text-transform, none);
			white-space: normal;
			-webkit-user-select: none;
			user-select: none;
			background-color: var(--wa-tooltip-background-color);
			border-radius: var(--wa-tooltip-border-radius);

			${rK}
		}

		/* Style hr inside the tooltip body. The slot[name=content] selector matches
	   fallback content, which is where handleUnsafeOverlayContent puts the hr it
	   generates from "\\n\\n" in a .content string (e.g. gl-copy-container's tooltip).
	   Slotted content from consumers lives in their light DOM and isn't reachable
	   from here — those consumers need their own [slot=content] hr rule. */
		slot[name='content'] hr {
			margin: var(--gl-space-4) 0;
			border: none;
			border-top: var(--gl-border-width) solid var(--color-foreground--25);
		}
	`,sg([tY()],sb.prototype,"content",2),sg([tY({reflect:!0})],sb.prototype,"placement",2),sg([tY({type:Boolean})],sb.prototype,"disabled",2),sg([tY({type:Number})],sb.prototype,"distance",2),sg([tY({type:Number,attribute:"show-delay"})],sb.prototype,"showDelay",2),sg([tY({type:Number,attribute:"hide-delay"})],sb.prototype,"hideDelay",2),sg([tY({type:Boolean,attribute:"hide-on-click"})],sb.prototype,"hideOnClick",2),sg([t1("wa-popup")],sb.prototype,"popup",2),sg([tJ()],sb.prototype,"suppressed",2),sg([tJ()],sb.prototype,"open",2),sb=sg([tX("gl-tooltip")],sb);let s_=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a","add-small":"\\ec7b","remove-small":"\\ec7c","worktree-small":"\\ec7d",worktree:"\\ec7e","screen-cut":"\\ec7f",ask:"\\ec80",openai:"\\ec81",claude:"\\ec82","open-in-window":"\\ec83","new-session":"\\ec84"}),sv=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147","diff-right":"\\f11b","diff-left":"\\f12e","accept-right":"\\f12f","accept-left":"\\f130","accept-all-right":"\\f131","accept-all-left":"\\f132",continue:"\\f148",skip:"\\f149",abort:"\\f14a",pause:"\\f14b","kanban-view":"\\f14c","filter-mixed":"\\f14d","start-new":"\\f14e",merge:"\\f14f"});var sy=Object.defineProperty,sw=Object.getOwnPropertyDescriptor,sk=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sw(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sy(t,i,s),s};function sx(e,t=""){return tT(Object.entries(e).map(([e,i])=>(function(e,t,i=""){return`:host([icon='${i}${e}'])::before { content: '${t}'; }`})(e,i,t)).join(""))}let sC=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(e){e.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(e)}};sC.styles=tj`
		:host {
			display: inline-block;
			font: normal normal normal var(--code-icon-size, 16px) / 1 codicon;
			vertical-align: var(--code-icon-v-align, text-bottom);
			color: inherit;
			text-align: center;
			letter-spacing: normal;
			text-decoration: none;
			-webkit-user-select: none;
			-ms-user-select: none;
			user-select: none;
			text-rendering: auto;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}

		:host([icon^='gl-']) {
			font-family: glicons;
		}

		${sx(s_)}

		${sx(sv,"gl-")}

		:host([icon='custom-start-work']) {
			position: relative;
		}

		:host([icon='custom-start-work'])::before {
			content: '\\ea68';
		}

		:host([icon='custom-start-work'])::after {
			position: absolute;
			right: -0.2em;
			bottom: -0.2em;
			font-size: 0.6em;
			line-height: normal;
			content: '\\ea60';
		}

		:host([icon='gl-pinned-filled'])::before {
			/* TODO: see relative positioning needed in every use-case */
			position: relative;
			left: 1px;
		}

		@keyframes codicon-spin {
			100% {
				transform: rotate(360deg);
			}
		}

		:host([modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;
		}

		:host([icon='loading'][modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;

			/* custom speed & easing for loading icon */
			animation-duration: 1s !important;
			animation-timing-function: var(--gl-ease-spin) !important;
		}

		:host([flip='inline']) {
			transform: rotateY(180deg);
		}

		:host([flip='block']) {
			transform: rotateX(180deg);
		}

		:host([rotate='45']) {
			transform: rotateZ(45deg);
		}
	`,sk([tY({reflect:!0})],sC.prototype,"icon",2),sk([tY({reflect:!0})],sC.prototype,"modifier",2),sk([tY({type:Number})],sC.prototype,"size",2),sk([tY({reflect:!0})],sC.prototype,"flip",2),sk([tY({reflect:!0})],sC.prototype,"rotate",2),sC=sk([tX("code-icon")],sC);var s$=Object.defineProperty,sE=Object.getOwnPropertyDescriptor,sS=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sE(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&s$(t,i,s),s};let sA=class extends lit_element_i{constructor(){super(...arguments),this.truncate=!1,this.overlay="tooltip",this.icon="",this.disabled=!1,this._modifiers=new ModifierKeysController(this)}get isAltKeyPressed(){return this._modifiers.altKey||this._modifiers.shiftKey}get effectiveIcon(){return this.isAltKeyPressed&&this.altIcon?this.altIcon:this.icon}get effectiveHref(){return this.isAltKeyPressed&&this.altHref?this.altHref:this.href}get effectiveLabel(){return this.isAltKeyPressed&&this.altLabel?this.altLabel:this.label}get effectiveTooltip(){if(this.label||this.altLabel)return this.altLabel?this.isAltKeyPressed?this.altLabel:`${this.label}
[${rM()}] ${this.altLabel}`:this.label}render(){return this.label&&"none"!==this.overlay?"popover"===this.overlay?tt`<gl-popover
				>${this.renderContent()}
				<div slot="content">${rF(this.label)}</div></gl-popover
			>`:tt`<gl-tooltip content="${this.effectiveTooltip}">${this.renderContent()}</gl-tooltip>`:this.renderContent()}renderContent(){let e="popover"===this.overlay?"anchor":to,t=this.effectiveIcon,i=tt`<code-icon
				class="chip__icon"
				part="icon"
				icon="${t}"
				flip="${this.iconFlip??to}"
				modifier="${("loading"===t?"spin":"")??to}"
			></code-icon
			>${this.activeIcon?tt`<code-icon class="chip__icon-active" part="active-icon" icon="${this.activeIcon}"></code-icon>`:to}`,r=this.effectiveHref,o=this.effectiveLabel;return r?tt`
				<a
					class="chip"
					part="base"
					?disabled=${this.disabled}
					href=${r}
					slot=${e}
					aria-label=${o??to}
				>
					${i}<slot></slot><slot name="suffix"></slot>
				</a>
			`:tt`
			<button
				class="chip"
				part="base"
				type="button"
				?disabled=${this.disabled}
				slot=${e}
				aria-label=${o??to}
			>
				${i}<slot></slot><slot name="suffix"></slot>
			</button>
		`}focus(e){this.defaultFocusEl.focus(e)}};sA.styles=[rL,rD,tj`
			:host {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				min-width: 0;
				max-width: 100%;
				vertical-align: text-bottom;
				border-radius: var(--gl-radius-sm);
			}

			* {
				box-sizing: border-box;
			}

			:host(:focus-within) {
				${rU}
			}

			:host(:hover) {
				background-color: var(--vscode-toolbar-hoverBackground);
			}

			:host(:active) {
				background-color: var(--vscode-toolbar-activeBackground);
			}

			:host([disabled]) {
				pointer-events: none;
				opacity: 0.5;
			}

			.chip__icon-active {
				display: none;
			}

			.chip:hover:has(.chip__icon-active) .chip__icon,
			.chip:focus-visible:has(.chip__icon-active) .chip__icon {
				display: none;
			}

			.chip:hover .chip__icon-active,
			.chip:focus-visible .chip__icon-active {
				display: inline-flex;
			}

			.chip {
				display: inline-flex;
				gap: var(--gl-space-4);
				align-items: center;
				justify-content: center;
				min-width: 2rem;
				max-width: 100%;
				height: 2rem;
				padding: var(--gl-space-2);
				overflow: hidden;
				font: inherit;

				/* vertical-align: middle; */
				color: inherit;
				text-decoration: none;
				cursor: pointer;
				background: none;
				border: none;
			}

			.chip:hover {
				text-decoration: none;
			}

			.chip:focus {
				outline: none;
			}

			a:not(.chip) {
				text-decoration: underline;
			}

			::slotted(*) {
				padding-inline-end: var(--gl-space-2);
				vertical-align: middle;
				text-transform: var(--chip-text-transform, capitalize);
			}

			/* Optically center the label against the icon — text sits slightly low in its line-box
			   under flex centering, so nudge it up a hair. Excludes the suffix icon (centered fine). */
			::slotted(:not([slot='suffix'])) {
				margin-block-start: -0.1rem;
			}

			/* Drop the trailing inline padding for suffix-slotted icons — the asymmetric box
	   shifts the rotation axis off the glyph's visual center, so a spinning loading
	   codicon wobbles. Flex gap already spaces this from the preceding label. */
			::slotted([slot='suffix']) {
				padding-inline-end: 0;
			}

			:host([truncate]) {
				min-width: 0;
				max-width: 100%;
			}

			:host([truncate]) ::slotted(*) {
				display: inline-block;
				min-width: 0;
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				vertical-align: middle;
				white-space: nowrap;
			}
		`],sS([tY({type:Boolean,reflect:!0})],sA.prototype,"truncate",2),sS([tY()],sA.prototype,"href",2),sS([tY({attribute:"alt-href"})],sA.prototype,"altHref",2),sS([tY()],sA.prototype,"label",2),sS([tY({attribute:"alt-label"})],sA.prototype,"altLabel",2),sS([tY()],sA.prototype,"overlay",2),sS([tY()],sA.prototype,"icon",2),sS([tY()],sA.prototype,"iconFlip",2),sS([tY({attribute:"alt-icon"})],sA.prototype,"altIcon",2),sS([tY()],sA.prototype,"activeIcon",2),sS([tY({type:Boolean})],sA.prototype,"disabled",2),sS([t1(".chip")],sA.prototype,"defaultFocusEl",2),sA=sS([tX("gl-action-chip")],sA);var sI=y(285);let sP=()=>new ref_h;let ref_h=class ref_h{};let sz=new WeakMap,sT=eU(class extends async_directive_f{render(e){return to}update(e,[t]){let i=t!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),to}rt(e){if(void 0!==this.G)if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,i=sz.get(t);void 0===i&&(i=new WeakMap,sz.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?sz.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});let FilterController=class FilterController{constructor(e,t){this.host=e,this.options=t,this._query="",this._terms=[],e.addController(this)}hostConnected(){}hostDisconnected(){clearTimeout(this._debounceTimer),this._debounceTimer=void 0}get query(){return this._query}get terms(){return this._terms}get isFiltering(){return this._terms.length>0}setQuery(e,t){(this._query!==e||t?.debounce)&&(this._query=e,this.options.onQueryChanged?.(e),clearTimeout(this._debounceTimer),t?.debounce?this._debounceTimer=setTimeout(()=>this.apply(),this.options.debounceMs??150):this.apply())}clear(){this.setQuery("")}apply(){this._terms=this._query.toLowerCase().trim().split(/\s+/).filter(e=>e.length>0),this.options.applyMatch(this._terms),this.options.onApplied?.(),this.host.requestUpdate()}};let CollectionIndexController=class CollectionIndexController{constructor(e,t){this.options=t,this._idToIndex=new Map,e.addController(this)}hostConnected(){this.rebuild()}hostDisconnected(){this._idToIndex.clear()}rebuild(){this._idToIndex.clear();let e=this.options.getItems();if(null!=e)for(let t=0;t<e.length;t++)this._idToIndex.set(this.options.getItemId(e[t]),t)}get size(){return this.options.getItems()?.length??0}indexOf(e){return this._idToIndex.get(e)??-1}has(e){return this._idToIndex.has(e)}itemAt(e){return this.options.getItems()?.[e]}idAt(e){let t=this.itemAt(e);return null==t?void 0:this.options.getItemId(t)}itemFor(e){let t=this.indexOf(e);return -1===t?void 0:this.itemAt(t)}ids(){let e=this.options.getItems();return null==e?[]:e.map(e=>this.options.getItemId(e))}};let FocusController=class FocusController{constructor(e,t){this.host=e,this.options=t,this._focusedIndex=-1,this._containerHasFocus=!1,this._connected=!1,e.addController(this)}hostConnected(){this._connected=!0}hostDisconnected(){this._connected=!1}get strategy(){return this.options.strategy??"activedescendant"}get focusedId(){return this._focusedId}get focusedIndex(){return this._focusedIndex}setFocusedId(e){this._focusedId=e}setFocusedIndex(e){this._focusedIndex=e}get containerHasFocus(){return this._containerHasFocus}setContainerHasFocus(e){this._containerHasFocus!==e&&(this._containerHasFocus=e,this.host.requestUpdate())}currentIndex(){let e=this.options.index;if(null!=this._focusedId){let t=e.indexOf(this._focusedId);if(-1!==t)return t}return this._focusedIndex>=0&&this._focusedIndex<e.size?this._focusedIndex:e.size>0?0:-1}focusIndex(e,t){let i=this.options.index.size;if(0===i)return;let r=Math.max(0,Math.min(e,i-1)),o=this.options.index.idAt(r);null!=o&&(this._focusedId=o,this._focusedIndex=r,this.options.onChange?.(),this.host.requestUpdate(),t?.scroll!==!1&&this.options.scroll?.scrollToIndex(r,{restoreFocus:t?.restoreFocus??!0}))}setFocused(e,t){let i=this.options.index.indexOf(e);-1!==i&&this.focusIndex(i,{scroll:t?.scroll})}move(e,t){let i=this.currentIndex()+e;this.focusIndex(i,{scroll:t?.scroll})}first(){this.focusIndex(0)}last(){this.focusIndex(this.options.index.size-1)}pageBy(e,t){this.move(e*Math.max(1,t))}focusElement(e){let t=e??this._focusedId;if(null==t)return;let i=this.options.index.indexOf(t);-1!==i&&this.options.scroll?.scrollToIndex(i,{restoreFocus:!1}),requestAnimationFrame(()=>{if(this._connected)if("roving"===this.strategy){var e;let i,r=this.options.getElementForId?.(t)??this.options.getContainer?.()?.querySelector(`[data-id="${(e=t,i=globalThis.CSS,i?.escape!=null?i.escape(e):e.replace(/["\\]/g,"\\$&"))}"]`);r?.focus()}else this.options.getContainer?.()?.focus()})}reconcile(){let e=this.options.index;if(null!=this._focusedId){let t=e.indexOf(this._focusedId);if(-1!==t){this._focusedIndex=t;return}if(e.size>0){let t=Math.max(0,Math.min(this._focusedIndex,e.size-1));this._focusedIndex=t,this._focusedId=e.idAt(t)}else this._focusedId=void 0,this._focusedIndex=-1}else e.size>0&&(this._focusedId=e.idAt(0),this._focusedIndex=0)}seedFirstIfUnset(){null!=this._focusedId||0!==this.options.index.size&&(this._focusedId=this.options.index.idAt(0),this._focusedIndex=0)}};let KeyboardNavController=class KeyboardNavController{constructor(e,t){this.host=e,this.options=t,e.addController(this)}hostConnected(){}hostDisconnected(){}get multi(){return"multi"===this.options.mode()}get followsFocus(){return this.options.selectionFollowsFocus?.()??!0}handleKeydown(e){let{focus:t,selection:i}=this.options;switch(e.key){case"ArrowDown":case"ArrowUp":{let i="ArrowDown"===e.key?1:-1;if(this.multi&&(e.ctrlKey||e.metaKey))return t.move(i),!0;return t.move(i),this.applyNavSelection(e),!0}case"Home":case"End":return"Home"===e.key?t.first():t.last(),this.applyNavSelection(e),!0;case"PageUp":case"PageDown":return t.pageBy("PageDown"===e.key?1:-1,this.options.pageSize?.()??10),this.applyNavSelection(e),!0;case"Enter":{let e=t.focusedId;return null!=e&&this.options.onActivate?.(e),!0}case" ":{let e=t.focusedId;if(null==e)return!0;return this.multi?i.toggle(e):this.options.onActivate?.(e),!0}case"a":case"A":if(this.multi&&(e.ctrlKey||e.metaKey))return i.selectAll(),!0;return this.options.onUnhandledKey?.(e)??!1;default:return this.options.onUnhandledKey?.(e)??!1}}applyNavSelection(e){let t=this.options.focus.focusedId;if(null!=t){if(this.multi&&e.shiftKey)return void this.options.selection.selectRange(t);if(this.followsFocus){if(this.multi&&!this.options.selection.canSelect(t))return void this.options.selection.clear();this.options.selection.setSingle(t)}}}};let SelectionController=class SelectionController{constructor(e,t){this.options=t,this._selected=new Set,e.addController(this)}hostConnected(){}hostDisconnected(){}get mode(){return this.options.mode?.()??"single"}get selectedIds(){return this._selected}get size(){return this._selected.size}get anchorId(){return this._anchorId}has(e){return this._selected.has(e)}isSelectable(e){return this.options.isSelectable?.(e)??!0}canSelect(e){return this.isSelectable(e)}commit(e){this._selected=e,this.options.onChange?.()}setSingle(e){this._anchorId=e,this.commit(new Set([e]))}setAnchor(e){this._anchorId=e}toggle(e){if(!this.isSelectable(e))return;let t=new Set(this._selected);t.has(e)?t.delete(e):t.add(e),this._anchorId=e,this.commit(t)}selectRange(e,t){let i=this.options.orderedIds(),r=this._anchorId??e,o=i.indexOf(r),s=i.indexOf(e);if(-1===o||-1===s)return void this.setSingle(e);let[n,a]=o<=s?[o,s]:[s,o],c=t?.additive?new Set(this._selected):new Set;for(let e=n;e<=a;e++){let t=i[e];this.isSelectable(t)&&c.add(t)}this.commit(c)}selectAll(){let e=new Set;for(let t of this.options.orderedIds())this.isSelectable(t)&&e.add(t);(0!==e.size||0!==this._selected.size)&&this.commit(e)}clear(){0!==this._selected.size&&(this._anchorId=void 0,this.commit(new Set))}pruneTo(e){let t="function"==typeof e?e:t=>e.has(t),i=!1,r=new Set;for(let e of this._selected)t(e)?r.add(e):i=!0;null==this._anchorId||t(this._anchorId)||(this._anchorId=void 0),i&&this.commit(r)}};let VirtualScrollController=class VirtualScrollController{constructor(e,t){this.host=e,this.options=t,this._scrolling=!1,e.addController(this)}hostConnected(){}hostDisconnected(){this._scrolling=!1}scrollToIndex(e,t){if(this._scrolling)return;this._scrolling=!0;let i=t?.restoreFocus??!0;this.host.updateComplete.then(()=>{let t=this.options.getVirtualizer(),r=this.options.getContainer?.();if(null==t){this._scrolling=!1;return}let o=()=>{i&&null!=r&&document.activeElement!==r&&r.focus(),this._scrolling=!1},s=0===e,n=e===this.options.getCount()-1;s||n?requestAnimationFrame(()=>{s?t.scrollTop=0:t.scrollTop=t.scrollHeight,requestAnimationFrame(o)}):requestAnimationFrame(()=>{let i=t.scrollToIndex?.(e,"nearest");null!=i&&"function"==typeof i.then?i.then(o):requestAnimationFrame(o)})},()=>{this._scrolling=!1})}async kickAfterFirstLayout(e){let t=this.options.getVirtualizer();null!=t&&(await t.layoutComplete,e())}};let VirtualCollectionController=class VirtualCollectionController{constructor(e,t){this.host=e,this.options=t,e.addController(this),this.index=new CollectionIndexController(e,{getItems:t.getItems,getItemId:t.getItemId}),this.scroll=new VirtualScrollController(e,{getVirtualizer:t.getVirtualizer,getContainer:t.getContainer,getCount:()=>this.index.size}),this.selection=new SelectionController(e,{mode:t.mode,orderedIds:()=>this.index.ids(),isSelectable:null!=t.isSelectable?e=>this.isSelectable(e):void 0,onChange:t.onSelectionChange}),this.focus=new FocusController(e,{index:this.index,scroll:this.scroll,strategy:t.focusStrategy,getContainer:t.getContainer}),this.keyboard=new KeyboardNavController(e,{index:this.index,focus:this.focus,selection:this.selection,mode:t.mode??(()=>"single"),pageSize:t.pageSize,selectionFollowsFocus:t.selectionFollowsFocus,onActivate:t.onActivate,onUnhandledKey:t.onUnhandledKey})}hostConnected(){}hostDisconnected(){}hostUpdated(){this.seedAnchor()}seedAnchor(){if("multi"!==this.selection.mode||null!=this.selection.anchorId)return;let e=this.focus.focusedId;null!=e&&this.selection.setAnchor(e)}isSelectable(e){let t=this.options.isSelectable;if(null==t)return!0;let i=this.index.itemFor(e);return null!=i&&t(i)}onItemsChanged(){this.index.rebuild(),this.focus.reconcile(),this.selection.pruneTo(e=>this.index.has(e))}handleKeydown(e){return this.keyboard.handleKeydown(e)}};function sj(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n}let RangeChangedEvent=class RangeChangedEvent extends Event{constructor(e){super(RangeChangedEvent.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};RangeChangedEvent.eventName="rangeChanged";let VisibilityChangedEvent=class VisibilityChangedEvent extends Event{constructor(e){super(VisibilityChangedEvent.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};VisibilityChangedEvent.eventName="visibilityChanged";let UnpinnedEvent=class UnpinnedEvent extends Event{constructor(){super(UnpinnedEvent.eventName,{bubbles:!1})}};UnpinnedEvent.eventName="unpinned";let ScrollerShim=class ScrollerShim{constructor(e){this._element=null;let t=e??window;this._node=t,e&&(this._element=e)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}};let ScrollerController=class ScrollerController extends ScrollerShim{constructor(e,t){super(t),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let i=this._node;this._originalScrollTo=i.scrollTo,this._originalScrollBy=i.scrollBy,this._originalScroll=i.scroll,this._attach(e)}get _destination(){return this.__destination}get scrolling(){return null!==this._destination}scrollTo(e,t){this._scrollTo("number"==typeof e&&"number"==typeof t?{left:e,top:t}:e)}scrollBy(e,t){let i="number"==typeof e&&"number"==typeof t?{left:e,top:t}:e;void 0!==i.top&&(i.top+=this.scrollTop),void 0!==i.left&&(i.left+=this.scrollLeft),this._scrollTo(i)}_nativeScrollTo(e){this._originalScrollTo.bind(this._element||window)(e)}_scrollTo(e,t=null,i=null){null!==this._end&&this._end(),"smooth"===e.behavior?(this._setDestination(e),this._retarget=t,this._end=i):this._resetScrollState(),this._nativeScrollTo(e)}_setDestination(e){let{top:t,left:i}=e;return t=void 0===t?void 0:Math.max(0,Math.min(t,this.maxScrollTop)),i=void 0===i?void 0:Math.max(0,Math.min(i,this.maxScrollLeft)),(null===this._destination||i!==this._destination.left||t!==this._destination.top)&&(this.__destination={top:t,left:i,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(e){this._destination&&this._setDestination(e)&&this._nativeScrollTo(this._destination)}managedScrollTo(e,t,i){return this._scrollTo(e,t,i),this._updateManagedScrollTo}correctScrollError(e){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(e),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(null!==this._destination){let{scrollTop:e,scrollLeft:t}=this,{top:i,left:r}=this._destination;i=Math.min(i||0,this.maxScrollTop);let o=Math.abs((r=Math.min(r||0,this.maxScrollLeft))-t);1>Math.abs(i-e)&&o<1&&(this._end&&this._end(),this._resetScrollState())}}detach(e){return this._clients.delete(e),0===this._clients.size&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(e){this._clients.add(e),1===this._clients.size&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};let sR="u">typeof window?window.ResizeObserver:void 0,sO=Symbol("virtualizerRef"),sM="virtualizer-sizer";let Virtualizer=class Virtualizer{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!e)throw Error("Virtualizer constructor requires a configuration object");if(e.hostElement)this._init(e);else throw Error('Virtualizer configuration requires the "hostElement" property')}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e);let t=e.layout||{};this._layoutInitialized=this._initLayout(t)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new sR(()=>this._hostElementSizeChanged()),this._childrenRO=new sR(this._childrenSizeChanged.bind(this))}_initHostElement(e){let t=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),t[sO]=this}connected(){this._initObservers();let e=this._isScroller;this._clippingAncestors=function(e,t=!1){let i=!1;return(function(e,t=!1){let i=[],r=t?e:sD(e);for(;null!==r;)i.push(r),r=sD(r);return i})(e,t).filter(e=>{if(i)return!1;let t=getComputedStyle(e);return i="fixed"===t.position,"visible"!==t.overflow})}(this._hostElement,e),this._scrollerController=new ScrollerController(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(e=>this._childrenRO.observe(e)),this._scrollEventListeners.forEach(e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){let e=this._hostElement;if(!this._sizer){let t=e.querySelector(`[${sM}]`);t||((t=document.createElement("div")).setAttribute(sM,""),e.appendChild(t)),Object.assign(t.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),t.textContent="&nbsp;",t.setAttribute(sM,""),this._sizer=t}return this._sizer}async updateLayoutConfig(e){await this._layoutInitialized;let t=e.type||a;if("function"==typeof t&&this._layout instanceof t){let t={...e};return delete t.type,this._layout.config=t,!0}return!1}async _initLayout(e){let t,i;if("function"==typeof e.type){i=e.type;let r={...e};delete r.type,t=r}else t=e;void 0===i&&(a=i=(await Promise.resolve().then(y.bind(y,285))).FlowLayout),this._layout=new i(e=>this._handleLayoutMessage(e),t),this._layout.measureChildren&&"function"==typeof this._layout.updateItemSizes&&("function"==typeof this._layout.measureChildren&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){null===this._benchmarkStart&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(null!==this._benchmarkStart){let e=window.performance.now(),t=e-this._benchmarkStart,i=performance.getEntriesByName("uv-virtualizing","measure").filter(t=>t.startTime>=this._benchmarkStart&&t.startTime<e).reduce((e,t)=>e+t.duration,0);return this._benchmarkStart=null,{timeElapsed:t,virtualizationTime:i}}return null}_measureChildren(){let e={},t=this._children,i=this._measureChildOverride||this._measureChild;for(let r=0;r<t.length;r++){let o=t[r],s=this._first+r;(this._itemsChanged||this._toBeMeasured.has(o))&&(e[s]=i.call(this,o,this._items[s]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){var t;let i,{width:r,height:o}=e.getBoundingClientRect();return Object.assign({width:r,height:o},(t=e,{marginTop:sL((i=window.getComputedStyle(t)).marginTop),marginRight:sL(i.marginRight),marginBottom:sL(i.marginBottom),marginLeft:sL(i.marginLeft)}))}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(e){this._scrollSize=e.scrollSize,this._adjustRange(e.range),this._childrenPos=e.childPositions,this._scrollError=e.scrollError||null;let{_rangeChanged:t,_itemsChanged:i}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(t||i)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(e=>this._childrenRO.observe(e)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),null!==this._childMeasurements&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch{}window.performance.mark("uv-start")}!1===this._scrollerController.correctingScrollError&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(e){"scroll"===e.type&&(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent()}_handleLayoutMessage(e){"stateChanged"===e.type?this._updateDOM(e):"visibilityChanged"===e.type?(this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._notifyVisibility()):"unpinned"===e.type&&this._hostElement.dispatchEvent(new UnpinnedEvent)}get _children(){let e=[],t=this._hostElement.firstElementChild;for(;t;)t.hasAttribute(sM)||e.push(t),t=t.nextElementSibling;return e}_updateView(){let e=this._hostElement,t=this._scrollerController?.element,i=this._layout;if(e&&t&&i){let r,o,s,n,a=e.getBoundingClientRect();r=0,o=0,s=window.innerHeight,n=window.innerWidth;let c=this._clippingAncestors.map(e=>e.getBoundingClientRect());for(let e of(c.unshift(a),c))r=Math.max(r,e.top),o=Math.max(o,e.left),s=Math.min(s,e.bottom),n=Math.min(n,e.right);let h=t.getBoundingClientRect(),p={left:a.left-h.left,top:a.top-h.top},u={width:t.scrollWidth,height:t.scrollHeight},g=r-a.top+e.scrollTop,f=o-a.left+e.scrollLeft;i.viewportSize={width:Math.max(0,n-o),height:Math.max(0,s-r)},i.viewportScroll={top:g,left:f},i.totalScrollSize=u,i.offsetWithinScroller=p}}_sizeHostElement(e){let t=e&&null!==e.width?Math.min(82e5,e.width):0,i=e&&null!==e.height?Math.min(82e5,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${t}px, ${i}px)`;else{let e=this._hostElement.style;e.minWidth=t?`${t}px`:"100%",e.minHeight=i?`${i}px`:"100%"}}_positionChildren(e){e&&e.forEach(({top:e,left:t,width:i,height:r,xOffset:o,yOffset:s},n)=>{let a=this._children[n-this._first];a&&(a.style.position="absolute",a.style.boxSizing="border-box",a.style.transform=`translate(${t}px, ${e}px)`,void 0!==i&&(a.style.width=i+"px"),void 0!==r&&(a.style.height=r+"px"),a.style.left=void 0===o?null:o+"px",a.style.top=void 0===s?null:s+"px")})}async _adjustRange(e){let{_first:t,_last:i,_firstVisible:r,_lastVisible:o}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==t||this._last!==i,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==r||this._lastVisible!==o}_correctScrollError(){if(this._scrollError){let{scrollTop:e,scrollLeft:t}=this._scrollerController,{top:i,left:r}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:e-i,left:t-r})}}element(e){return e===1/0&&(e=this._items.length-1),this._items?.[e]===void 0?void 0:{scrollIntoView:(t={})=>this._scrollElementIntoView({...t,index:e})}}_scrollElementIntoView(e){if(e.index>=this._first&&e.index<=this._last)this._children[e.index-this._first].scrollIntoView(e);else if(e.index=Math.min(e.index,this._items.length-1),"smooth"===e.behavior){let t=this._layout.getScrollIntoViewCoordinates(e),{behavior:i}=e;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(t,{behavior:i}),()=>this._layout.getScrollIntoViewCoordinates(e),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=e}else this._layout.pin=e}_checkScrollIntoViewTarget(e){let{index:t}=this._scrollIntoViewTarget||{};t&&e?.has(t)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new RangeChangedEvent({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new VisibilityChangedEvent({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((e,t)=>{this._layoutCompleteResolver=e,this._layoutCompleteRejecter=t})),this._layoutCompletePromise}_rejectLayoutCompletePromise(e){null!==this._layoutCompleteRejecter&&this._layoutCompleteRejecter(e),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&null===this._pendingLayoutComplete&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){null!==this._layoutCompleteResolver&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(e){if(this._layout?.measureChildren){for(let t of e)this._toBeMeasured.set(t.target,t.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function sL(e){let t=e?parseFloat(e):NaN;return Number.isNaN(t)?0:t}function sD(e){if(null!==e.assignedSlot)return e.assignedSlot;if(null!==e.parentElement)return e.parentElement;let t=e.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}let sB=e=>e,sF=(e,t)=>tt`${t}: ${JSON.stringify(e,null,2)}`;let VirtualizeDirective=class VirtualizeDirective extends async_directive_f{constructor(e){if(super(e),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,t)=>sF(e,t+this._first),this._keyFunction=(e,t)=>sB(e,this._first),this._items=[],2!==e.type)throw Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);let t=[];if(this._first>=0&&this._last>=this._first)for(let e=this._first;e<=this._last;e++)t.push(this._items[e]);return rA(t,this._keyFunction,this._renderItem)}update(e,[t]){this._setFunctions(t);let i=this._items!==t.items;return this._items=t.items||[],this._virtualizer?this._updateVirtualizerConfig(e,t):this._initialize(e,t),i?tr:this.render()}async _updateVirtualizerConfig(e,t){if(!await this._virtualizer.updateLayoutConfig(t.layout||{})){let i=e.parentNode;this._makeVirtualizer(i,t)}this._virtualizer.items=this._items}_setFunctions(e){let{renderItem:t,keyFunction:i}=e;t&&(this._renderItem=(e,i)=>t(e,i+this._first)),i&&(this._keyFunction=(e,t)=>i(e,t+this._first))}_makeVirtualizer(e,t){this._virtualizer&&this._virtualizer.disconnected();let{layout:i,scroller:r,items:o}=t;this._virtualizer=new Virtualizer({hostElement:e,layout:i,scroller:r}),this._virtualizer.items=o,this._virtualizer.connected()}_initialize(e,t){let i=e.parentNode;i&&1===i.nodeType&&(i.addEventListener("rangeChanged",e=>{this._first=e.first,this._last=e.last,this.setValue(this.render())}),this._makeVirtualizer(i,t))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}};let sN=eU(VirtualizeDirective);let LitVirtualizer=class LitVirtualizer extends lit_element_i{constructor(){super(...arguments),this.items=[],this.renderItem=sF,this.keyFunction=sB,this.layout={},this.scroller=!1}createRenderRoot(){return this}render(){let{items:e,renderItem:t,keyFunction:i,layout:r,scroller:o}=this;return tt`${sN({items:e,renderItem:t,keyFunction:i,layout:r,scroller:o})}`}element(e){return this[sO]?.element(e)}get layoutComplete(){return this[sO]?.layoutComplete}scrollToIndex(e,t="start"){this.element(e)?.scrollIntoView({block:t})}};sj([tY({attribute:!1})],LitVirtualizer.prototype,"items",void 0),sj([tY()],LitVirtualizer.prototype,"renderItem",void 0),sj([tY()],LitVirtualizer.prototype,"keyFunction",void 0),sj([tY({attribute:!1})],LitVirtualizer.prototype,"layout",void 0),sj([tY({reflect:!0,type:Boolean})],LitVirtualizer.prototype,"scroller",void 0),customElements.define("lit-virtualizer",LitVirtualizer);var sU=Object.defineProperty,sq=Object.getOwnPropertyDescriptor,sV=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sq(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sU(t,i,s),s};let sH=class extends lit_element_i{constructor(){super(...arguments),this.size=12,this.worktree=!1,this.chevron=!1,this.onKeydown=e=>{"button"===this.appearance&&("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}updated(e){e.has("appearance")&&("button"===this.appearance?(this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")):("button"===this.getAttribute("role")&&this.removeAttribute("role"),"0"===this.getAttribute("tabindex")&&this.removeAttribute("tabindex")))}render(){let e=this.icon??(this.worktree?"gl-worktree":"git-branch");return tt`<code-icon class="icon" icon="${e}" size="${this.size}"></code-icon
			><span class="label">${this.name??"<missing>"}</span>${this.chevron?tt`<code-icon class="chevron" icon="chevron-down" size="12"></code-icon>`:to}`}};function sK(e,t){return tt`<gl-branch-name .name=${e} .size=${12} ?worktree=${t??!1}></gl-branch-name>`}sH.styles=tj`
		:host {
			display: inline-flex;
			align-items: baseline;
			min-width: 0;
			max-width: 100%;
			margin-inline: var(--gl-space-2);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		:host([appearance='pill']) {
			padding: 0.1rem 0.6rem;
			color: var(--gl-branch-color, var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0));
			background-color: color-mix(
				in srgb,
				var(--gl-branch-color, var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0)) 15%,
				transparent
			);
			border-radius: var(--gl-radius-sm);
		}

		:host([appearance='button']) {
			padding: var(--gl-space-2) var(--gl-space-4);
			font-size: var(--gl-font-base);
			color: var(--gl-branch-color, var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, inherit));
			cursor: pointer;
			border-radius: var(--gl-radius-sm);
		}

		:host([appearance='button']:hover) {
			background: var(--vscode-toolbar-hoverBackground);
		}

		:host([appearance='button']:focus-visible) {
			outline: var(--gl-border-width) solid var(--vscode-focusBorder);
			outline-offset: 2px;
		}

		:host(:focus:not([appearance='button'])) {
			outline: var(--gl-border-width) solid var(--vscode-focusBorder);
			outline-offset: 2px;
		}

		.icon {
			align-self: center;
			margin-right: 0.3rem;
		}

		.label {
			/* Block-level box (default span is inline → text-overflow is ignored). flex 1 1 auto
		   lets the label both grow into available space and shrink when the parent narrows;
		   min-width: 0 unlocks shrinking past intrinsic content size. */
			display: block;
			flex: 1 1 auto;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: 600;
			white-space: nowrap;
		}

		.chevron {
			flex-shrink: 0;
			align-self: center;
			margin-left: var(--gl-space-2);
		}
	`,sV([tY({reflect:!0})],sH.prototype,"appearance",2),sV([tY({type:String})],sH.prototype,"name",2),sV([tY({type:Number})],sH.prototype,"size",2),sV([tY({type:Boolean})],sH.prototype,"worktree",2),sV([tY({type:Boolean})],sH.prototype,"chevron",2),sV([tY()],sH.prototype,"icon",2),sH=sV([tX("gl-branch-name")],sH);var sW=Object.defineProperty,sG=Object.getOwnPropertyDescriptor,sZ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sG(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sW(t,i,s),s};let sX=class extends lit_element_i{constructor(){super(...arguments),this.hasChanges=!1,this.worktree=!1,this.isDefault=!1}render(){return tt`<gl-tooltip placement="bottom"
			>${this.renderIcon()}<span slot="content">${this.renderTooltipContent()}</span></gl-tooltip
		>`}renderIcon(){let e;if(!this.worktree&&(!this.status||"local"===this.status))return tt`<code-icon icon="git-branch"></code-icon>`;if("detached"===this.status)return tt`<code-icon icon="git-commit"></code-icon>`;let t="0.5";switch(this.status){case"diverged":e="var(--gl-icon-color-status-diverged)";break;case"behind":e="var(--gl-icon-color-status-behind)";break;case"ahead":e="var(--gl-icon-color-status-ahead)";break;case"missingUpstream":e="var(--gl-icon-color-status-missingUpstream)";break;case"upToDate":e=`var(--gl-icon-color-status-${this.hasChanges?"changes":"synced"})`;break;default:this.hasChanges?e="var(--gl-icon-color-status-changes)":(e="transparent",t="1")}return this.worktree&&!1===this.isDefault?ti`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="var(--gl-icon-color-foreground, #c5c5c5)"
					d="M13.5 4h.501v1.003h-.2a5.5 5.5 0 0 1 1.2.755V3.5l-.5-.5H13.5v1zm-4 0V3H7.713l-.852-.854L6.507 2H1.511l-.5.5v3.996L1 6.507v6.995l.5.5h6.227a5.528 5.528 0 0 1-.836-1H2V7.496h.01v-.489h4.486l.354-.146.858-.858h.014a5.51 5.51 0 0 1 1.477-1H7.5l-.353.147-.858.857H2.011V3H6.3l.853.853.353.146H9.5z"
				/>
				<path
					fill="${e}"
					stroke="var(--gl-icon-color-foreground, #c5c5c5)"
					stroke-width="${t}"
					d="M11.5 6.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z"
				/>
				<path stroke="var(--gl-icon-color-foreground, #c5c5c5)" d="M11.5 13v3M11.5 1v6" />
			</svg>`:ti`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="${e}"
				stroke="var(--gl-icon-color-foreground, #c5c5c5)"
				stroke-width="${t}"
				d="M12 10.25a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5z"
			/>
			<path
				fill="var(--gl-icon-color-foreground, #c5c5c5)"
				d="M6 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM5 5.95a2.5 2.5 0 1 0-1 0v4.1a2.5 2.5 0 1 0 1.165.04c.168-.38.383-.622.61-.78.327-.227.738-.32 1.214-.31H7c.387 0 .76.03 1.124.059l.026.002c.343.027.694.055 1.003.046.313-.01.661-.06.954-.248.29-.185.466-.466.544-.812a.756.756 0 0 1 .046-.055 2.5 2.5 0 1 0-1.03-.134c-.028.108-.07.14-.1.16-.063.04-.191.08-.446.089a8.783 8.783 0 0 1-.917-.045A14.886 14.886 0 0 0 7.005 8c-.61-.013-1.249.105-1.8.488-.07.05-.14.102-.205.159V5.95zm7-.45a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-9 7a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
			/>
		</svg>`}renderTooltipContent(){let e,t=this.branch?sK(this.branch):"Branch",i=this.upstream?sK(this.upstream):"its upstream";switch(this.status){case"diverged":e=tt`${t} has diverged from ${i}`;break;case"behind":e=tt`${t} is behind ${i}`;break;case"ahead":e=tt`${t} is ahead of ${i}`;break;case"missingUpstream":e=tt`${t} is missing its upstream ${i}`;break;case"upToDate":e=tt`${t} is up to date with ${i}`;break;case"local":e=tt`${t} is a local branch which hasn't been published`;break;case"remote":e=tt`${t} is a remote branch`;break;case"detached":e=tt`${t} is in a detached state, i.e. checked out to a commit or tag`;break;default:e=tt`${t} is in an unknown state`}return e=tt`<p>${e}</p>`,this.worktree?e=this.hasChanges?tt`${e}
					<p>Checked out in a worktree and has working (uncommitted) changes</p>`:tt`${e}
					<p>Checked out in a worktree</p>`:this.hasChanges&&(e=tt`${e}
				<p>Has working (uncommitted) changes</p>`),e}};sX.styles=tj`
		:host {
			display: inline-flex;
			width: 16px;
			height: 16px;

			--gl-icon-color-foreground: var(--vscode-foreground, #c5c5c5);

			--gl-icon-color-status-synced: var(
				--gl-icon-color-foreground,
				var(--vscode-gitlens-decoration\\.branchUpToDateForegroundColor)
			);
			--gl-icon-color-status-diverged: var(--vscode-gitlens-decorations\\.branchDivergedForegroundColor, #ff5);
			--gl-icon-color-status-behind: var(--vscode-gitlens-decorations\\.branchBehindForegroundColor, #f05);
			--gl-icon-color-status-ahead: var(--vscode-gitlens-decorations\\.branchAheadForegroundColor, #0f5);
			--gl-icon-color-status-missingUpstream: var(
				--vscode-gitlens-decorations\\.branchMissingUpstreamForegroundColor,
				#c74e39
			);
			--gl-icon-color-status-changes: #1a79ff;
		}

		:host-context(.vscode-dark),
		:host-context(.vscode-high-contrast) {
			--gl-icon-color-foreground: #c5c5c5;
		}

		:host-context(.vscode-light),
		:host-context(.vscode-high-contrast-light) {
			--gl-icon-color-foreground: #424242;
		}

		p {
			margin: 0;
		}

		p + p {
			margin-top: var(--gl-space-4);
		}

		svg {
			width: 100%;
			height: 100%;
			margin-top: -0.2rem;
			vertical-align: middle;
		}
	`,sZ([tY({type:String})],sX.prototype,"branch",2),sZ([tY({type:String})],sX.prototype,"status",2),sZ([tY({type:Boolean})],sX.prototype,"hasChanges",2),sZ([tY({type:String})],sX.prototype,"upstream",2),sZ([tY({type:Boolean})],sX.prototype,"worktree",2),sZ([tY({type:Boolean,attribute:"is-default"})],sX.prototype,"isDefault",2),sX=sZ([tX("gl-branch-icon")],sX);let sQ={"cherry-pick":{label:"Cherry picking",conflicts:"Resolve conflicts to continue cherry picking",directionality:"into"},merge:{label:"Merging",conflicts:"Resolve conflicts to continue merging",directionality:"into"},rebase:{label:"Rebasing",conflicts:"Resolve conflicts to continue rebasing",directionality:"onto",pending:"Pending rebase of"},revert:{label:"Reverting",conflicts:"Resolve conflicts to continue reverting",directionality:"in"}},sY=tj`
	:host {
		box-sizing: border-box;
		display: inline-block;
		vertical-align: text-bottom;
	}

	.pill {
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: var(--gl-pill-min-height, auto);
		padding: var(--gl-pill-padding, 0.2rem 0.5rem);
		font-size: var(--gl-pill-font-size, 1rem);
		font-weight: 500;
		line-height: var(--gl-pill-line-height, 1);
		color: var(--gl-pill-foreground, var(--vscode-foreground));
		text-transform: uppercase;
		white-space: nowrap;
		background-color: var(--gl-pill-background, var(--vscode-editorWidget-background));
		border-radius: var(--gl-pill-border-radius, var(--gl-radius-sm));
	}

	.pill--outlined {
		padding: var(--gl-pill-padding, 0.2rem 0.4rem);
		background-color: transparent;
		border: var(--gl-border-width) solid var(--gl-pill-border, var(--vscode-foreground));
	}
`;var sJ=Object.defineProperty,s0=Object.getOwnPropertyDescriptor,s1=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?s0(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sJ(t,i,s),s};let s2=Object.freeze([["added",["+","add"]],["modified",["~","edit"]],["removed",["-","remove"]]]),s5=class extends lit_element_i{constructor(){super(...arguments),this.noTooltip=!1}render(){let e=s2.map(([e,t])=>this.renderStat(e,t));return this.noTooltip?tt`${e}<slot></slot>`:tt`<gl-tooltip>
			${e}<slot></slot>
			<div slot="content">${this.renderTooltipContent()}</div>
		</gl-tooltip>`}renderStat(e,t){let i=this[e];if(null==i)return to;let[r,o]=t,s="icons"===this.symbol?tt`<code-icon class="icon" icon=${o}></code-icon>`:tt`<span class="symbol">${r}</span>`;return tt`<span class="stat ${e}" aria-label="${i} ${e}"
			><span class="label">${s}${i}</span></span
		>`}renderTooltipContent(){let e=this.added??0,t=this.modified??0,i=this.removed??0,r=e+t+i,o=[];e>0&&o.push(tt`<span class="added">${e} added</span>`),t>0&&(o.length&&o.push(", "),o.push(tt`<span class="modified">${t} modified</span>`)),i>0&&(o.length&&o.push(", "),o.push(tt`<span class="removed">${i} removed</span>`));let s=e>0||i>0?tt`${t9("file",r)} changed (${o})`:t9("file changed",r,{plural:"files changed",zero:"No files changed"}),n=[];null!=this.additions&&n.push(tt`<span class="added">${t9("addition",this.additions)}</span>`),null!=this.deletions&&(n.length&&n.push(", "),n.push(tt`<span class="removed">${t9("deletion",this.deletions)}</span>`));let a=[tt`<div>${s}</div>`];return n.length>0&&a.push(tt`<div>${n}</div>`),a}};s5.styles=tj`
		:host {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			font-size: var(--gl-font-sm);
			font-weight: 600;
			white-space: nowrap;
		}

		:host([appearance='pill']) {
			min-height: var(--commit-stats-pill-line-height, 1.5rem);
			padding: var(--commit-stats-pill-padding, 0 0.8rem 0 0.6rem);
			line-height: var(--commit-stats-pill-line-height, 1.5rem);
			white-space: nowrap;
			background-color: color-mix(
				in srgb,
				var(--vscode-sideBarSectionHeader-background) 90%,
				var(--vscode-foreground) 10%
			);
			border: var(--gl-border-width) solid color-mix(in srgb, transparent 80%, var(--color-foreground));
			border-radius: var(--gl-radius-sm);
		}

		:host-context(.vscode-light):host([appearance='pill']),
		:host-context(.vscode-high-contrast-light):host([appearance='pill']) {
			background-color: color-mix(
				in srgb,
				var(--vscode-sideBarSectionHeader-background) 98%,
				var(--vscode-foreground) 2%
			);
		}

		.stat {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
		}

		.stat + .stat {
			margin-inline-start: var(--gl-space-10);
		}

		:host([symbol='icons']) .stat + .stat {
			margin-inline-start: var(--gl-space-8);
		}

		.added {
			color: var(--gl-stat-added);
		}

		.modified {
			color: var(--gl-stat-modified);
		}

		.removed {
			color: var(--gl-stat-removed);
		}

		.label {
			user-select: none;
		}

		.icon {
			--code-icon-size: 1.1rem;
			--code-icon-v-align: middle;

			margin-inline-end: var(--gl-space-2);
			font-weight: 600;
		}

		/* Pill styles */
		:host([appearance='pill']) .stat {
			padding: 0;
		}

		:host([appearance='pill']) .stat + .stat {
			margin-inline-start: var(--gl-space-8);
		}

		:host([appearance='pill']) .icon {
			margin-inline-end: 0.3rem;
		}
	`,s1([tY({type:Number})],s5.prototype,"added",2),s1([tY({type:Number})],s5.prototype,"modified",2),s1([tY({type:Number})],s5.prototype,"removed",2),s1([tY({type:Number})],s5.prototype,"additions",2),s1([tY({type:Number})],s5.prototype,"deletions",2),s1([tY()],s5.prototype,"symbol",2),s1([tY({reflect:!0})],s5.prototype,"appearance",2),s1([tY({type:Boolean,attribute:"no-tooltip"})],s5.prototype,"noTooltip",2),s5=s1([tX("commit-stats")],s5);var s3=Object.defineProperty,s4=Object.getOwnPropertyDescriptor,s7=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?s4(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&s3(t,i,s),s};let s6=class extends lit_element_i{constructor(){super(...arguments),this.showClean=!1,this.badge=!1,this.noTooltip=!1,this.hasConflicts=!1}render(){if(null!=this.pausedOpStatus)return this.renderPausedOp(this.pausedOpStatus);let e=this.added??0,t=this.modified??0,i=this.removed??0;if(this.dirty??e+t+i>0){var r;let o,s=this.badge?tt`<span class="indicator-pill pill pill--outlined" aria-label="Working tree has changes">
						<code-icon icon="pencil"></code-icon>
					</span>`:tt`<commit-stats
						added=${e||to}
						modified=${t||to}
						removed=${i||to}
						symbol="icons"
						appearance="pill"
						no-tooltip
					></commit-stats>`;if(this.noTooltip)return s;let n=(o=[],(r={added:e,changed:t,deleted:i}).added&&o.push(`${t9("file",r.added)} added`),r.changed&&o.push(`${t9("file",r.changed)} changed`),r.deleted&&o.push(`${t9("file",r.deleted)} deleted`),o),a=n.length?`${n.join(", ")} in the working tree`:"Working tree has changes";return tt`<gl-tooltip placement="bottom"
				>${s}<span slot="content">${a}</span></gl-tooltip
			>`}if(!this.showClean||null==this.dirty&&null==this.added&&null==this.modified&&null==this.removed)return to;if(this.badge){let e=tt`<span class="indicator-pill pill pill--outlined" aria-label="No changes">
				<code-icon class="wip-clean-check" icon="check"></code-icon>
			</span>`;return this.noTooltip?e:tt`<gl-tooltip placement="bottom">${e}<span slot="content">No changes</span></gl-tooltip>`}let o=tt`<commit-stats class="indicator-pill" appearance="pill" no-tooltip aria-label="No changes">
			<code-icon class="wip-clean-check" icon="check"></code-icon>
		</commit-stats>`;return this.noTooltip?o:tt`<gl-tooltip placement="bottom">${o}<span slot="content">No changes</span></gl-tooltip>`}renderPausedOp(e){let t=sQ[e.type],i=this.hasConflicts?t9("conflict",this.conflictsCount??1):t.label,r=tt`<span
			class="paused-op-badge${this.hasConflicts?" paused-op-badge--conflicts":""}"
			aria-label=${i}
		>
			<code-icon icon="warning"></code-icon>
			${i}
		</span>`;return this.noTooltip?r:tt`<gl-tooltip placement="bottom"
			>${r}<span slot="content">${t.label} in progress</span></gl-tooltip
		>`}};s6.styles=[sY,tj`
			:host {
				display: contents;
			}

			.wip-clean-check {
				--code-icon-size: 1.1rem;
				--code-icon-v-align: middle;

				color: var(--gl-stat-added);
			}

			.indicator-pill {
				--gl-pill-border: color-mix(in srgb, transparent 80%, var(--color-foreground));
			}

			.indicator-pill.pill {
				gap: var(--gl-space-2);
				text-transform: none;
				user-select: none;
			}

			.indicator-pill.pill code-icon {
				font-size: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}

			.wip__tooltip {
				display: contents;
				vertical-align: middle;
			}

			.paused-op-badge {
				display: inline-flex;
				gap: var(--gl-space-6);
				align-items: center;
				padding: 0.1rem 0.4rem;
				font-size: var(--gl-font-sm);
				font-weight: 600;
				line-height: 2rem;
				color: #000;
				white-space: nowrap;
				background-color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
				border-radius: var(--gl-radius-sm);
			}

			.paused-op-badge--conflicts {
				color: #fff;
				background-color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor);
			}
		`],s7([tY({type:Number})],s6.prototype,"added",2),s7([tY({type:Number})],s6.prototype,"modified",2),s7([tY({type:Number})],s6.prototype,"removed",2),s7([tY({type:Boolean})],s6.prototype,"dirty",2),s7([tY({type:Boolean,attribute:"show-clean"})],s6.prototype,"showClean",2),s7([tY({type:Boolean})],s6.prototype,"badge",2),s7([tY({type:Boolean,attribute:"no-tooltip"})],s6.prototype,"noTooltip",2),s7([tY({attribute:!1})],s6.prototype,"pausedOpStatus",2),s7([tY({type:Boolean,attribute:"has-conflicts"})],s6.prototype,"hasConflicts",2),s7([tY({type:Number,attribute:"conflicts-count"})],s6.prototype,"conflictsCount",2),s6=s7([tX("gl-wip-stats")],s6);var s8=Object.defineProperty,s9=Object.getOwnPropertyDescriptor,ne=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?s9(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&s8(t,i,s),s};let nt=class extends lit_element_i{constructor(){super(...arguments),this.ahead=0,this.behind=0,this.working=0,this.alwaysShow=!1,this.outlined=!1,this.colorized=!1,this.missingUpstream=!1}render(){return 0===this.ahead&&0===this.behind&&0===this.working?this.alwaysShow?this.missingUpstream?tt`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
					<span class="state${this.colorized?" state--missing":""}"
						><code-icon icon="error"></code-icon></span
				></span>`:tt`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
				<span class="state${this.colorized?" state--ahead":""}"><code-icon icon="sync"></code-icon></span>
			</span>`:to:tt`<span part="base" class="pill${this.outlined?" pill--outlined":""}"
			>${r$(this.behind>0,()=>tt`<span class="state${this.colorized?" state--behind":""}"
						>${this.behind}<code-icon icon="arrow-down"></code-icon
					></span>`)}${r$(this.ahead>0,()=>tt`<span class="state${this.colorized?" state--ahead":""}"
						>${this.ahead}<code-icon icon="arrow-up"></code-icon
					></span>`)}${r$(this.working>0,()=>tt`<span class="state${this.colorized?" state--working":""}"
						>${this.working}<span class="working">&#177;</span></span
					>`)}</span
		>`}};nt.styles=[sY,tj`
			.pill {
				gap: var(--gl-space-2);
				text-transform: none;
				user-select: none;
			}

			.state {
				display: inline-flex;
				gap: 0.1rem;
				align-items: center;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}

			.state--missing code-icon {
				color: var(--gl-tracking-missing);
			}

			.state--ahead code-icon {
				color: var(--gl-tracking-ahead);
			}

			.state--behind code-icon {
				color: var(--gl-tracking-behind);
			}

			.state--working .working {
				color: var(--gl-tracking-working);
			}

			.state code-icon {
				font-size: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}

			.working {
				display: inline-block;
				width: 1rem;
				font-weight: normal;
				vertical-align: text-bottom;
				text-align: center;
			}
		`],ne([tY({type:Number})],nt.prototype,"ahead",2),ne([tY({type:Number})],nt.prototype,"behind",2),ne([tY({type:Number})],nt.prototype,"working",2),ne([tY({type:Boolean,attribute:"always-show"})],nt.prototype,"alwaysShow",2),ne([tY({type:Boolean})],nt.prototype,"outlined",2),ne([tY({type:Boolean})],nt.prototype,"colorized",2),ne([tY({type:Boolean})],nt.prototype,"missingUpstream",2),nt=ne([tX("gl-tracking-pill")],nt);let ni="important",nr=` !${ni}`,no=0-nr.length;let CspStyleMapDirective=class CspStyleMapDirective extends directive_i{constructor(e){if(super(e),1!==e.type||"style"!==e.name||e.strings?.length>2)throw Error("The `cspStyleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return tr}update(e,[t]){let i=e.element.style,r=this._previous??=new Map;for(let e of r.keys())null==t[e]&&(r.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(let e in t){let o=t[e];if(null==o)continue;let s="string"==typeof o&&o.endsWith(nr),n=s?o.slice(0,no):String(o);r.get(e)!==n&&(r.set(e,n),e.includes("-")||s?i.setProperty(e,n,s?ni:""):i[e]=n)}return tr}};let ns=eU(CspStyleMapDirective),nn={_argdown:["\\E003","#519aba"],_argdown_light:["\\E003","#498ba7"],_asm:["\\E004","#cc3e44"],_asm_light:["\\E004","#b8383d"],_audio:["\\E005","#a074c4"],_audio_light:["\\E005","#9068b0"],_babel:["\\E006","#cbcb41"],_babel_light:["\\E006","#b7b73b"],_bazel:["\\E007","#8dc149"],_bazel_1:["\\E007","#4d5a5e"],_bazel_1_light:["\\E007","#455155"],_bazel_light:["\\E007","#7fae42"],_bicep:["\\E008","#519aba"],_bicep_light:["\\E008","#498ba7"],_bower:["\\E009","#e37933"],_bower_light:["\\E009","#cc6d2e"],_bsl:["\\E00A","#cc3e44"],_bsl_light:["\\E00A","#b8383d"],_c:["\\E00C","#519aba"],_c_1:["\\E00C","#a074c4"],_c_1_light:["\\E00C","#9068b0"],_c_2:["\\E00C","#cbcb41"],_c_2_light:["\\E00C","#b7b73b"],_c_light:["\\E00C","#498ba7"],"_c-sharp":["\\E00B","#519aba"],"_c-sharp_light":["\\E00B","#498ba7"],_cake:["\\E00D","#cc3e44"],_cake_light:["\\E00D","#b8383d"],_cake_php:["\\E00E","#cc3e44"],_cake_php_light:["\\E00E","#b8383d"],_clock:["\\E012","#519aba"],_clock_1:["\\E012","#6d8086"],_clock_1_light:["\\E012","#627379"],_clock_light:["\\E012","#498ba7"],_clojure:["\\E013","#8dc149"],_clojure_1:["\\E013","#519aba"],_clojure_1_light:["\\E013","#498ba7"],_clojure_light:["\\E013","#7fae42"],"_code-climate":["\\E014","#8dc149"],"_code-climate_light":["\\E014","#7fae42"],"_code-search":["\\E015","#a074c4"],"_code-search_light":["\\E015","#9068b0"],_coffee:["\\E016","#cbcb41"],_coffee_light:["\\E016","#b7b73b"],_coldfusion:["\\E018","#519aba"],_coldfusion_light:["\\E018","#498ba7"],_config:["\\E019","#6d8086"],_config_light:["\\E019","#627379"],_cpp:["\\E01A","#519aba"],_cpp_1:["\\E01A","#a074c4"],_cpp_1_light:["\\E01A","#9068b0"],_cpp_2:["\\E01A","#cbcb41"],_cpp_2_light:["\\E01A","#b7b73b"],_cpp_light:["\\E01A","#498ba7"],_crystal:["\\E01B","#d4d7d6"],_crystal_embedded:["\\E01C","#d4d7d6"],_crystal_embedded_light:["\\E01C","#bfc2c1"],_crystal_light:["\\E01B","#bfc2c1"],_css:["\\E01D","#519aba"],_css_light:["\\E01D","#498ba7"],_csv:["\\E01E","#8dc149"],_csv_light:["\\E01E","#7fae42"],_cu:["\\E01F","#8dc149"],_cu_1:["\\E01F","#a074c4"],_cu_1_light:["\\E01F","#9068b0"],_cu_light:["\\E01F","#7fae42"],_d:["\\E020","#cc3e44"],_d_light:["\\E020","#b8383d"],_dart:["\\E021","#519aba"],_dart_light:["\\E021","#498ba7"],_db:["\\E022","#f55385"],_db_1:["\\E022","#519aba"],_db_1_light:["\\E022","#498ba7"],_db_light:["\\E022","#dd4b78"],_default:["\\E023","#d4d7d6"],_default_light:["\\E023","#bfc2c1"],_docker:["\\E025","#519aba"],_docker_1:["\\E025","#4d5a5e"],_docker_1_light:["\\E025","#455155"],_docker_2:["\\E025","#8dc149"],_docker_2_light:["\\E025","#7fae42"],_docker_3:["\\E025","#f55385"],_docker_3_light:["\\E025","#dd4b78"],_docker_light:["\\E025","#498ba7"],_ejs:["\\E027","#cbcb41"],_ejs_light:["\\E027","#b7b73b"],_elixir:["\\E028","#a074c4"],_elixir_light:["\\E028","#9068b0"],_elixir_script:["\\E029","#a074c4"],_elixir_script_light:["\\E029","#9068b0"],_elm:["\\E02A","#519aba"],_elm_light:["\\E02A","#498ba7"],_eslint:["\\E02C","#a074c4"],_eslint_1:["\\E02C","#4d5a5e"],_eslint_1_light:["\\E02C","#455155"],_eslint_light:["\\E02C","#9068b0"],_ethereum:["\\E02D","#519aba"],_ethereum_light:["\\E02D","#498ba7"],"_f-sharp":["\\E02E","#519aba"],"_f-sharp_light":["\\E02E","#498ba7"],_favicon:["\\E02F","#cbcb41"],_favicon_light:["\\E02F","#b7b73b"],_firebase:["\\E030","#e37933"],_firebase_light:["\\E030","#cc6d2e"],_firefox:["\\E031","#e37933"],_firefox_light:["\\E031","#cc6d2e"],_font:["\\E033","#cc3e44"],_font_light:["\\E033","#b8383d"],_git:["\\E034","#41535b"],_git_light:["\\E034","#3b4b52"],_github:["\\E037","#d4d7d6"],_github_light:["\\E037","#bfc2c1"],_gitlab:["\\E038","#e37933"],_gitlab_light:["\\E038","#cc6d2e"],_go:["\\E039","#519aba"],_go_light:["\\E039","#498ba7"],_go2:["\\E03A","#519aba"],_go2_light:["\\E03A","#498ba7"],_godot:["\\E03B","#519aba"],_godot_1:["\\E03B","#cc3e44"],_godot_1_light:["\\E03B","#b8383d"],_godot_2:["\\E03B","#cbcb41"],_godot_2_light:["\\E03B","#b7b73b"],_godot_3:["\\E03B","#a074c4"],_godot_3_light:["\\E03B","#9068b0"],_godot_light:["\\E03B","#498ba7"],_gradle:["\\E03C","#519aba"],_gradle_light:["\\E03C","#498ba7"],_grails:["\\E03D","#8dc149"],_grails_light:["\\E03D","#7fae42"],_graphql:["\\E03E","#f55385"],_graphql_light:["\\E03E","#dd4b78"],_grunt:["\\E03F","#e37933"],_grunt_light:["\\E03F","#cc6d2e"],_gulp:["\\E040","#cc3e44"],_gulp_light:["\\E040","#b8383d"],_hacklang:["\\E041","#e37933"],_hacklang_light:["\\E041","#cc6d2e"],_haml:["\\E042","#cc3e44"],_haml_light:["\\E042","#b8383d"],_happenings:["\\E043","#519aba"],_happenings_light:["\\E043","#498ba7"],_haskell:["\\E044","#a074c4"],_haskell_light:["\\E044","#9068b0"],_haxe:["\\E045","#e37933"],_haxe_1:["\\E045","#cbcb41"],_haxe_1_light:["\\E045","#b7b73b"],_haxe_2:["\\E045","#519aba"],_haxe_2_light:["\\E045","#498ba7"],_haxe_3:["\\E045","#a074c4"],_haxe_3_light:["\\E045","#9068b0"],_haxe_light:["\\E045","#cc6d2e"],_heroku:["\\E046","#a074c4"],_heroku_light:["\\E046","#9068b0"],_hex:["\\E047","#cc3e44"],_hex_light:["\\E047","#b8383d"],_html:["\\E048","#519aba"],_html_1:["\\E048","#8dc149"],_html_1_light:["\\E048","#7fae42"],_html_2:["\\E048","#cbcb41"],_html_2_light:["\\E048","#b7b73b"],_html_3:["\\E048","#e37933"],_html_3_light:["\\E048","#cc6d2e"],_html_erb:["\\E049","#cc3e44"],_html_erb_light:["\\E049","#b8383d"],_html_light:["\\E048","#498ba7"],_ignored:["\\E04A","#41535b"],_ignored_light:["\\E04A","#3b4b52"],_illustrator:["\\E04B","#cbcb41"],_illustrator_light:["\\E04B","#b7b73b"],_image:["\\E04C","#a074c4"],_image_light:["\\E04C","#9068b0"],_info:["\\E04D","#519aba"],_info_light:["\\E04D","#498ba7"],_ionic:["\\E04E","#519aba"],_ionic_light:["\\E04E","#498ba7"],_jade:["\\E04F","#cc3e44"],_jade_light:["\\E04F","#b8383d"],_java:["\\E050","#cc3e44"],_java_1:["\\E050","#519aba"],_java_1_light:["\\E050","#498ba7"],_java_light:["\\E050","#b8383d"],_javascript:["\\E051","#cbcb41"],_javascript_1:["\\E051","#e37933"],_javascript_1_light:["\\E051","#cc6d2e"],_javascript_2:["\\E051","#519aba"],_javascript_2_light:["\\E051","#498ba7"],_javascript_light:["\\E051","#b7b73b"],_jenkins:["\\E052","#cc3e44"],_jenkins_light:["\\E052","#b8383d"],_jinja:["\\E053","#cc3e44"],_jinja_light:["\\E053","#b8383d"],_json:["\\E055","#cbcb41"],_json_1:["\\E055","#8dc149"],_json_1_light:["\\E055","#7fae42"],_json_light:["\\E055","#b7b73b"],_julia:["\\E056","#a074c4"],_julia_light:["\\E056","#9068b0"],_karma:["\\E057","#8dc149"],_karma_light:["\\E057","#7fae42"],_kotlin:["\\E058","#e37933"],_kotlin_light:["\\E058","#cc6d2e"],_less:["\\E059","#519aba"],_less_light:["\\E059","#498ba7"],_license:["\\E05A","#cbcb41"],_license_1:["\\E05A","#e37933"],_license_1_light:["\\E05A","#cc6d2e"],_license_2:["\\E05A","#cc3e44"],_license_2_light:["\\E05A","#b8383d"],_license_light:["\\E05A","#b7b73b"],_liquid:["\\E05B","#8dc149"],_liquid_light:["\\E05B","#7fae42"],_livescript:["\\E05C","#519aba"],_livescript_light:["\\E05C","#498ba7"],_lock:["\\E05D","#8dc149"],_lock_light:["\\E05D","#7fae42"],_lua:["\\E05E","#519aba"],_lua_light:["\\E05E","#498ba7"],_makefile:["\\E05F","#e37933"],_makefile_1:["\\E05F","#a074c4"],_makefile_1_light:["\\E05F","#9068b0"],_makefile_2:["\\E05F","#6d8086"],_makefile_2_light:["\\E05F","#627379"],_makefile_3:["\\E05F","#519aba"],_makefile_3_light:["\\E05F","#498ba7"],_makefile_light:["\\E05F","#cc6d2e"],_markdown:["\\E060","#519aba"],_markdown_light:["\\E060","#498ba7"],_maven:["\\E061","#cc3e44"],_maven_light:["\\E061","#b8383d"],_mdo:["\\E062","#cc3e44"],_mdo_light:["\\E062","#b8383d"],_mustache:["\\E063","#e37933"],_mustache_light:["\\E063","#cc6d2e"],_nim:["\\E065","#cbcb41"],_nim_light:["\\E065","#b7b73b"],_notebook:["\\E066","#519aba"],_notebook_light:["\\E066","#498ba7"],_npm:["\\E067","#41535b"],_npm_1:["\\E067","#cc3e44"],_npm_1_light:["\\E067","#b8383d"],_npm_ignored:["\\E068","#41535b"],_npm_ignored_light:["\\E068","#3b4b52"],_npm_light:["\\E067","#3b4b52"],_nunjucks:["\\E069","#8dc149"],_nunjucks_light:["\\E069","#7fae42"],_ocaml:["\\E06A","#e37933"],_ocaml_light:["\\E06A","#cc6d2e"],_odata:["\\E06B","#e37933"],_odata_light:["\\E06B","#cc6d2e"],_pddl:["\\E06C","#a074c4"],_pddl_light:["\\E06C","#9068b0"],_pdf:["\\E06D","#cc3e44"],_pdf_light:["\\E06D","#b8383d"],_perl:["\\E06E","#519aba"],_perl_light:["\\E06E","#498ba7"],_photoshop:["\\E06F","#519aba"],_photoshop_light:["\\E06F","#498ba7"],_php:["\\E070","#a074c4"],_php_light:["\\E070","#9068b0"],_pipeline:["\\E071","#e37933"],_pipeline_light:["\\E071","#cc6d2e"],_plan:["\\E072","#8dc149"],_plan_light:["\\E072","#7fae42"],_platformio:["\\E073","#e37933"],_platformio_light:["\\E073","#cc6d2e"],_powershell:["\\E074","#519aba"],_powershell_light:["\\E074","#498ba7"],_prisma:["\\E075","#519aba"],_prisma_light:["\\E075","#498ba7"],_prolog:["\\E077","#e37933"],_prolog_light:["\\E077","#cc6d2e"],_pug:["\\E078","#cc3e44"],_pug_light:["\\E078","#b8383d"],_puppet:["\\E079","#cbcb41"],_puppet_light:["\\E079","#b7b73b"],_purescript:["\\E07A","#d4d7d6"],_purescript_light:["\\E07A","#bfc2c1"],_python:["\\E07B","#519aba"],_python_light:["\\E07B","#498ba7"],_R:["\\E001","#519aba"],_R_light:["\\E001","#498ba7"],_react:["\\E07D","#519aba"],_react_1:["\\E07D","#e37933"],_react_1_light:["\\E07D","#cc6d2e"],_react_light:["\\E07D","#498ba7"],_reasonml:["\\E07E","#cc3e44"],_reasonml_light:["\\E07E","#b8383d"],_rescript:["\\E07F","#cc3e44"],_rescript_1:["\\E07F","#f55385"],_rescript_1_light:["\\E07F","#dd4b78"],_rescript_light:["\\E07F","#b8383d"],_rollup:["\\E080","#cc3e44"],_rollup_light:["\\E080","#b8383d"],_ruby:["\\E081","#cc3e44"],_ruby_light:["\\E081","#b8383d"],_rust:["\\E082","#6d8086"],_rust_light:["\\E082","#627379"],_salesforce:["\\E083","#519aba"],_salesforce_light:["\\E083","#498ba7"],_sass:["\\E084","#f55385"],_sass_light:["\\E084","#dd4b78"],_sbt:["\\E085","#519aba"],_sbt_light:["\\E085","#498ba7"],_scala:["\\E086","#cc3e44"],_scala_light:["\\E086","#b8383d"],_shell:["\\E089","#8dc149"],_shell_light:["\\E089","#7fae42"],_slim:["\\E08A","#e37933"],_slim_light:["\\E08A","#cc6d2e"],_smarty:["\\E08B","#cbcb41"],_smarty_light:["\\E08B","#b7b73b"],_spring:["\\E08C","#8dc149"],_spring_light:["\\E08C","#7fae42"],_stylelint:["\\E08D","#d4d7d6"],_stylelint_1:["\\E08D","#4d5a5e"],_stylelint_1_light:["\\E08D","#455155"],_stylelint_light:["\\E08D","#bfc2c1"],_stylus:["\\E08E","#8dc149"],_stylus_light:["\\E08E","#7fae42"],_sublime:["\\E08F","#e37933"],_sublime_light:["\\E08F","#cc6d2e"],_svelte:["\\E090","#cc3e44"],_svelte_light:["\\E090","#b8383d"],_svg:["\\E091","#a074c4"],_svg_1:["\\E091","#519aba"],_svg_1_light:["\\E091","#498ba7"],_svg_light:["\\E091","#9068b0"],_swift:["\\E092","#e37933"],_swift_light:["\\E092","#cc6d2e"],_terraform:["\\E093","#a074c4"],_terraform_light:["\\E093","#9068b0"],_tex:["\\E094","#519aba"],_tex_1:["\\E094","#cbcb41"],_tex_1_light:["\\E094","#b7b73b"],_tex_2:["\\E094","#e37933"],_tex_2_light:["\\E094","#cc6d2e"],_tex_3:["\\E094","#d4d7d6"],_tex_3_light:["\\E094","#bfc2c1"],_tex_light:["\\E094","#498ba7"],_todo:["\\E096",""],_tsconfig:["\\E097","#519aba"],_tsconfig_light:["\\E097","#498ba7"],_twig:["\\E098","#8dc149"],_twig_light:["\\E098","#7fae42"],_typescript:["\\E099","#519aba"],_typescript_1:["\\E099","#e37933"],_typescript_1_light:["\\E099","#cc6d2e"],_typescript_light:["\\E099","#498ba7"],_vala:["\\E09A","#6d8086"],_vala_light:["\\E09A","#627379"],_video:["\\E09B","#f55385"],_video_light:["\\E09B","#dd4b78"],_vite:["\\E09C","#cbcb41"],_vite_light:["\\E09C","#b7b73b"],_vue:["\\E09D","#8dc149"],_vue_light:["\\E09D","#7fae42"],_wasm:["\\E09E","#a074c4"],_wasm_light:["\\E09E","#9068b0"],_wat:["\\E09F","#a074c4"],_wat_light:["\\E09F","#9068b0"],_webpack:["\\E0A0","#519aba"],_webpack_light:["\\E0A0","#498ba7"],_wgt:["\\E0A1","#519aba"],_wgt_light:["\\E0A1","#498ba7"],_windows:["\\E0A2","#519aba"],_windows_light:["\\E0A2","#498ba7"],_word:["\\E0A3","#519aba"],_word_light:["\\E0A3","#498ba7"],_xls:["\\E0A4","#8dc149"],_xls_light:["\\E0A4","#7fae42"],_xml:["\\E0A5","#e37933"],_xml_light:["\\E0A5","#cc6d2e"],_yarn:["\\E0A6","#519aba"],_yarn_light:["\\E0A6","#498ba7"],_yml:["\\E0A7","#a074c4"],_yml_light:["\\E0A7","#9068b0"],_zig:["\\E0A8","#e37933"],_zig_light:["\\E0A8","#cc6d2e"],_zip:["\\E0A9","#cc3e44"],_zip_1:["\\E0A9","#6d8086"],_zip_1_light:["\\E0A9","#627379"],_zip_light:["\\E0A9","#b8383d"]},na={"babel.config.cjs":"_babel","babel.config.js":"_babel","babel.config.json":"_babel","bower.json":"_bower",build:"_bazel","build.bazel":"_bazel",changelog:"_clock","changelog.md":"_clock","changelog.txt":"_clock",changes:"_clock","changes.md":"_clock","changes.txt":"_clock","cmakelists.txt":"_makefile_3",compiling:"_license_1","compiling.md":"_license_1","compiling.txt":"_license_1",contributing:"_license_2","contributing.md":"_license_2","contributing.txt":"_license_2",copying:"_license","copying.md":"_license","copying.txt":"_license","docker-healthcheck":"_docker_2","eslint.config.js":"_eslint","firebase.json":"_firebase",geckodriver:"_firefox","gruntfile.babel.js":"_grunt","gruntfile.coffee":"_grunt","gruntfile.js":"_grunt",gulpfile:"_gulp","gulpfile.js":"_gulp","ionic.config.json":"_ionic","ionic.project":"_ionic",jenkinsfile:"_jenkins","karma.conf.cjs":"_karma","karma.conf.coffee":"_karma","karma.conf.js":"_karma","karma.conf.mjs":"_karma",licence:"_license","licence.md":"_license","licence.txt":"_license",license:"_license","license.md":"_license","license.txt":"_license","mime.types":"_config",mix:"_hex",mvnw:"_maven","npm-debug.log":"_npm_ignored",omakefile:"_makefile_2","platformio.ini":"_platformio","pom.xml":"_maven",procfile:"_heroku",qmakefile:"_makefile_1",readme:"_info","readme.md":"_info","readme.txt":"_info","rollup.config.js":"_rollup","sass-lint.yml":"_sass","stylelint.config.cjs":"_stylelint","stylelint.config.js":"_stylelint","stylelint.config.mjs":"_stylelint","swagger.json":"_json_1","swagger.yaml":"_json_1","swagger.yml":"_json_1",todo:"_todo","todo.md":"_todo","todo.txt":"_todo","tsconfig.json":"_tsconfig",version:"_clock","version.md":"_clock","version.txt":"_clock","vite.config.cjs":"_vite","vite.config.cts":"_vite","vite.config.js":"_vite","vite.config.mjs":"_vite","vite.config.mts":"_vite","vite.config.ts":"_vite","webpack.common.cjs":"_webpack","webpack.common.js":"_webpack","webpack.common.mjs":"_webpack","webpack.common.ts":"_webpack","webpack.config.build.cjs":"_webpack","webpack.config.build.js":"_webpack","webpack.config.build.mjs":"_webpack","webpack.config.build.ts":"_webpack","webpack.config.cjs":"_webpack","webpack.config.js":"_webpack","webpack.config.mjs":"_webpack","webpack.config.ts":"_webpack","webpack.dev.cjs":"_webpack","webpack.dev.js":"_webpack","webpack.dev.mjs":"_webpack","webpack.dev.ts":"_webpack","webpack.prod.cjs":"_webpack","webpack.prod.js":"_webpack","webpack.prod.mjs":"_webpack","webpack.prod.ts":"_webpack",workspace:"_bazel","workspace.bazel":"_bazel","yarn.clean":"_yarn","yarn.lock":"_yarn"},nl={"3dm":"_svg_1","3ds":"_svg_1",ad:"_argdown",ai:"_illustrator",apex:"_salesforce",argdown:"_argdown",article:"_go",asax:"_html_2",ascx:"_html_1",asm:"_asm",aspx:"_html",avi:"_video",avif:"_image",babelrc:"_babel","babelrc.cjs":"_babel","babelrc.js":"_babel",bazel:"_bazel",bazelignore:"_bazel",bazelrc:"_bazel_1",bazelversion:"_bazel",bicep:"_bicep",bowerrc:"_bower",bsl:"_bsl",build:"_bazel",bzl:"_bazel",cake:"_cake",cer:"_lock",cert:"_lock",cfc:"_coldfusion",cfm:"_coldfusion","cjs.map":"_javascript",cjsx:"_react",class:"_java_1",classpath:"_java",cls:"_salesforce",cmx:"_ocaml",cmxa:"_ocaml","codeclimate.yml":"_code-climate",component:"_html_3",config:"_config",cr:"_crystal",crt:"_lock",cson:"_json","css.map":"_css",csv:"_csv",ctp:"_cake_php",cuh:"_cu_1",d:"_d",dae:"_svg_1",direnv:"_config",doc:"_word",dockerignore:"_docker_1",docx:"_word",ds_store:"_ignored",dtx:"_tex_2",ecr:"_crystal_embedded",edn:"_clojure_1",ejs:"_ejs",elm:"_elm",eot:"_font",epp:"_puppet",erb:"_html_erb","erb.html":"_html_erb",es:"_javascript",es5:"_javascript",es7:"_javascript",eslintignore:"_eslint_1",eslintrc:"_eslint","eslintrc.cjs":"_eslint","eslintrc.js":"_eslint","eslintrc.json":"_eslint","eslintrc.yaml":"_eslint","eslintrc.yml":"_eslint",ex:"_elixir",exs:"_elixir_script",firebaserc:"_firebase",flac:"_audio",gd:"_godot",gif:"_image",gitattributes:"_git",gitconfig:"_git","github-issues":"_github",gitkeep:"_git","gitlab-ci.yml":"_gitlab",gitmodules:"_git",godot:"_godot_1",gql:"_graphql",gradle:"_gradle",graphql:"_graphql",graphqls:"_graphql",gsp:"_grails",h:"_c_1","h++":"_cpp_1",hack:"_hacklang",haml:"_haml",happenings:"_happenings",hh:"_cpp_1",hpp:"_cpp_1",hs:"_haskell",htaccess:"_config","html.erb":"_html_erb",hu:"_cu_1",hx:"_haxe",hxml:"_haxe_3",hxp:"_haxe_2",hxs:"_haxe_1",hxx:"_cpp_1",ico:"_favicon",ins:"_tex_3",ipynb:"_notebook",jade:"_jade",jar:"_zip",jinja:"_jinja",jinja2:"_jinja",jpeg:"_image",jpg:"_image","js.map":"_javascript",jscsrc:"_javascript_2",jshintrc:"_javascript_2",key:"_lock",kt:"_kotlin",kts:"_kotlin",lhs:"_haskell",liquid:"_liquid",litcoffee:"_coffee",ls:"_livescript",master:"_html_2",mdo:"_mdo","mjs.map":"_javascript",ml:"_ocaml",mli:"_ocaml",mov:"_video",mp3:"_audio",mp4:"_video",mpg:"_video",mustache:"_mustache",nim:"_nim",nims:"_nim",nj:"_nunjucks",njk:"_nunjucks",njs:"_nunjucks","npm-debug.log":"_npm",npmignore:"_npm_1",npmrc:"_npm_1",nunj:"_nunjucks",nunjs:"_nunjucks",nunjucks:"_nunjucks",obj:"_svg_1",odata:"_odata",ogg:"_audio",ogv:"_video",otf:"_font",pddl:"_pddl",pdf:"_pdf",pem:"_lock","php.inc":"_php",pipeline:"_pipeline",plan:"_plan",png:"_image",pp:"_puppet",prisma:"_prisma",pro:"_prolog",psd:"_photoshop",purs:"_purescript",pxm:"_image",r:"_R",re:"_reasonml",res:"_rescript",resi:"_rescript_1",rmd:"_R",s:"_asm",sass:"_sass",sbt:"_sbt",scala:"_scala",slang:"_crystal_embedded",slide:"_go",slim:"_slim",slugignore:"_config","smarty.tpl":"_smarty",sol:"_ethereum",soql:"_db_1","spec.cjs":"_javascript_1","spec.js":"_javascript_1","spec.jsx":"_react_1","spec.mjs":"_javascript_1","spec.ts":"_typescript_1","spec.tsx":"_react_1",springbeans:"_spring",sss:"_css",stache:"_mustache",static:"_config",stl:"_svg_1",styl:"_stylus",stylelintignore:"_stylelint_1",stylelintrc:"_stylelint","stylelintrc.js":"_stylelint","stylelintrc.json":"_stylelint","stylelintrc.yaml":"_stylelint","stylelintrc.yml":"_stylelint","sublime-project":"_sublime","sublime-workspace":"_sublime",svelte:"_svelte",svg:"_svg",svgx:"_image","test.cjs":"_javascript_1","test.js":"_javascript_1","test.jsx":"_react_1","test.mjs":"_javascript_1","test.ts":"_typescript_1","test.tsx":"_react_1",tf:"_terraform","tf.json":"_terraform",tfvars:"_terraform","tfvars.json":"_terraform",tiff:"_image",tmp:"_clock_1",toml:"_config",tpl:"_smarty",tres:"_godot_2",tscn:"_godot_3",ttf:"_font",twig:"_twig",vala:"_vala",vapi:"_vala",vue:"_vue",wasm:"_wasm",wat:"_wat",wav:"_audio",webm:"_video",webp:"_image",wgt:"_wgt",woff:"_font",woff2:"_font",workspace:"_bazel",xls:"_xls",xlsx:"_xls",zig:"_zig",zip:"_zip_1"},nc={argdown:"_argdown",bat:"_windows",bicep:"_bicep",blade:"_php",c:"_c",chatagent:"_markdown",clojure:"_clojure",coffeescript:"_coffee",cpp:"_cpp",csharp:"_c-sharp",css:"_css","cuda-cpp":"_cu",dart:"_dart","django-html":"_html_3",dockercompose:"_docker_3",dockerfile:"_docker",dotenv:"_config",elixir:"_elixir",elm:"_elm",erb:"_html_erb",fsharp:"_f-sharp","git-commit":"_git","github-issues":"_github",go:"_go2",godot:"_godot",gradle:"_gradle",groovy:"_grails",haml:"_haml",handlebars:"_mustache",haskell:"_haskell",haxe:"_haxe",html:"_html_3",ignore:"_git",instructions:"_markdown",jade:"_pug",java:"_java",javascript:"_javascript",javascriptreact:"_react",jinja:"_jinja",json:"_json",jsonc:"_json",jsonl:"_json",julia:"_julia",kotlin:"_kotlin",latex:"_tex",less:"_less",lua:"_lua",makefile:"_makefile",markdown:"_markdown",mustache:"_mustache",nunjucks:"_nunjucks","objective-c":"_c_2","objective-cpp":"_cpp_2",ocaml:"_ocaml",perl:"_perl",php:"_php",postcss:"_css",powershell:"_powershell",prompt:"_markdown",properties:"_config",python:"_python",r:"_R",razor:"_html",rescript:"_rescript",ruby:"_ruby",rust:"_rust",sass:"_sass",scss:"_sass","search-result":"_code-search",shellscript:"_shell",skill:"_markdown",sql:"_db",stylus:"_stylus",swift:"_swift",terraform:"_terraform",tex:"_tex_1",todo:"_todo",typescript:"_typescript",typescriptreact:"_react",vala:"_vala",vue:"_vue",xml:"_xml",yaml:"_yml"},nh={"babel.config.cjs":"_babel_light","babel.config.js":"_babel_light","babel.config.json":"_babel_light","bower.json":"_bower_light",build:"_bazel_light","build.bazel":"_bazel_light",changelog:"_clock_light","changelog.md":"_clock_light","changelog.txt":"_clock_light",changes:"_clock_light","changes.md":"_clock_light","changes.txt":"_clock_light","cmakelists.txt":"_makefile_3_light",compiling:"_license_1_light","compiling.md":"_license_1_light","compiling.txt":"_license_1_light",contributing:"_license_2_light","contributing.md":"_license_2_light","contributing.txt":"_license_2_light",copying:"_license_light","copying.md":"_license_light","copying.txt":"_license_light","docker-healthcheck":"_docker_2_light","eslint.config.js":"_eslint_light","firebase.json":"_firebase_light",geckodriver:"_firefox_light","gruntfile.babel.js":"_grunt_light","gruntfile.coffee":"_grunt_light","gruntfile.js":"_grunt_light",gulpfile:"_gulp_light","gulpfile.js":"_gulp_light","ionic.config.json":"_ionic_light","ionic.project":"_ionic_light",jenkinsfile:"_jenkins_light","karma.conf.cjs":"_karma_light","karma.conf.coffee":"_karma_light","karma.conf.js":"_karma_light","karma.conf.mjs":"_karma_light",licence:"_license_light","licence.md":"_license_light","licence.txt":"_license_light",license:"_license_light","license.md":"_license_light","license.txt":"_license_light","mime.types":"_config_light",mix:"_hex_light",mvnw:"_maven_light","npm-debug.log":"_npm_ignored_light",omakefile:"_makefile_2_light","platformio.ini":"_platformio_light","pom.xml":"_maven_light",procfile:"_heroku_light",qmakefile:"_makefile_1_light",readme:"_info_light","readme.md":"_info_light","readme.txt":"_info_light","rollup.config.js":"_rollup_light","sass-lint.yml":"_sass_light","stylelint.config.cjs":"_stylelint_light","stylelint.config.js":"_stylelint_light","stylelint.config.mjs":"_stylelint_light","swagger.json":"_json_1_light","swagger.yaml":"_json_1_light","swagger.yml":"_json_1_light","tsconfig.json":"_tsconfig_light",version:"_clock_light","version.md":"_clock_light","version.txt":"_clock_light","vite.config.cjs":"_vite_light","vite.config.cts":"_vite_light","vite.config.js":"_vite_light","vite.config.mjs":"_vite_light","vite.config.mts":"_vite_light","vite.config.ts":"_vite_light","webpack.common.cjs":"_webpack_light","webpack.common.js":"_webpack_light","webpack.common.mjs":"_webpack_light","webpack.common.ts":"_webpack_light","webpack.config.build.cjs":"_webpack_light","webpack.config.build.js":"_webpack_light","webpack.config.build.mjs":"_webpack_light","webpack.config.build.ts":"_webpack_light","webpack.config.cjs":"_webpack_light","webpack.config.js":"_webpack_light","webpack.config.mjs":"_webpack_light","webpack.config.ts":"_webpack_light","webpack.dev.cjs":"_webpack_light","webpack.dev.js":"_webpack_light","webpack.dev.mjs":"_webpack_light","webpack.dev.ts":"_webpack_light","webpack.prod.cjs":"_webpack_light","webpack.prod.js":"_webpack_light","webpack.prod.mjs":"_webpack_light","webpack.prod.ts":"_webpack_light",workspace:"_bazel_light","workspace.bazel":"_bazel_light","yarn.clean":"_yarn_light","yarn.lock":"_yarn_light"},nd={"3dm":"_svg_1_light","3ds":"_svg_1_light",ad:"_argdown_light",ai:"_illustrator_light",apex:"_salesforce_light",argdown:"_argdown_light",article:"_go_light",asax:"_html_2_light",ascx:"_html_1_light",asm:"_asm_light",aspx:"_html_light",avi:"_video_light",avif:"_image_light",babelrc:"_babel_light","babelrc.cjs":"_babel_light","babelrc.js":"_babel_light",bazel:"_bazel_light",bazelignore:"_bazel_light",bazelrc:"_bazel_1_light",bazelversion:"_bazel_light",bicep:"_bicep_light",bowerrc:"_bower_light",bsl:"_bsl_light",build:"_bazel_light",bzl:"_bazel_light",cake:"_cake_light",cer:"_lock_light",cert:"_lock_light",cfc:"_coldfusion_light",cfm:"_coldfusion_light","cjs.map":"_javascript_light",cjsx:"_react_light",class:"_java_1_light",classpath:"_java_light",cls:"_salesforce_light",cmx:"_ocaml_light",cmxa:"_ocaml_light","codeclimate.yml":"_code-climate_light",component:"_html_3_light",config:"_config_light",cr:"_crystal_light",crt:"_lock_light",cson:"_json_light","css.map":"_css_light",csv:"_csv_light",ctp:"_cake_php_light",cuh:"_cu_1_light",d:"_d_light",dae:"_svg_1_light",direnv:"_config_light",doc:"_word_light",dockerignore:"_docker_1_light",docx:"_word_light",ds_store:"_ignored_light",dtx:"_tex_2_light",ecr:"_crystal_embedded_light",edn:"_clojure_1_light",ejs:"_ejs_light",elm:"_elm_light",eot:"_font_light",epp:"_puppet_light",erb:"_html_erb_light","erb.html":"_html_erb_light",es:"_javascript_light",es5:"_javascript_light",es7:"_javascript_light",eslintignore:"_eslint_1_light",eslintrc:"_eslint_light","eslintrc.cjs":"_eslint_light","eslintrc.js":"_eslint_light","eslintrc.json":"_eslint_light","eslintrc.yaml":"_eslint_light","eslintrc.yml":"_eslint_light",ex:"_elixir_light",exs:"_elixir_script_light",firebaserc:"_firebase_light",flac:"_audio_light",gd:"_godot_light",gif:"_image_light",gitattributes:"_git_light",gitconfig:"_git_light","github-issues":"_github_light",gitkeep:"_git_light","gitlab-ci.yml":"_gitlab_light",gitmodules:"_git_light",godot:"_godot_1_light",gql:"_graphql_light",gradle:"_gradle_light",graphql:"_graphql_light",graphqls:"_graphql_light",gsp:"_grails_light",h:"_c_1_light","h++":"_cpp_1_light",hack:"_hacklang_light",haml:"_haml_light",happenings:"_happenings_light",hh:"_cpp_1_light",hpp:"_cpp_1_light",hs:"_haskell_light",htaccess:"_config_light","html.erb":"_html_erb_light",hu:"_cu_1_light",hx:"_haxe_light",hxml:"_haxe_3_light",hxp:"_haxe_2_light",hxs:"_haxe_1_light",hxx:"_cpp_1_light",ico:"_favicon_light",ins:"_tex_3_light",ipynb:"_notebook_light",jade:"_jade_light",jar:"_zip_light",jinja:"_jinja_light",jinja2:"_jinja_light",jpeg:"_image_light",jpg:"_image_light","js.map":"_javascript_light",jscsrc:"_javascript_2_light",jshintrc:"_javascript_2_light",key:"_lock_light",kt:"_kotlin_light",kts:"_kotlin_light",lhs:"_haskell_light",liquid:"_liquid_light",litcoffee:"_coffee_light",ls:"_livescript_light",master:"_html_2_light",mdo:"_mdo_light","mjs.map":"_javascript_light",ml:"_ocaml_light",mli:"_ocaml_light",mov:"_video_light",mp3:"_audio_light",mp4:"_video_light",mpg:"_video_light",mustache:"_mustache_light",nim:"_nim_light",nims:"_nim_light",nj:"_nunjucks_light",njk:"_nunjucks_light",njs:"_nunjucks_light","npm-debug.log":"_npm_light",npmignore:"_npm_1_light",npmrc:"_npm_1_light",nunj:"_nunjucks_light",nunjs:"_nunjucks_light",nunjucks:"_nunjucks_light",obj:"_svg_1_light",odata:"_odata_light",ogg:"_audio_light",ogv:"_video_light",otf:"_font_light",pddl:"_pddl_light",pdf:"_pdf_light",pem:"_lock_light","php.inc":"_php_light",pipeline:"_pipeline_light",plan:"_plan_light",png:"_image_light",pp:"_puppet_light",prisma:"_prisma_light",pro:"_prolog_light",psd:"_photoshop_light",purs:"_purescript_light",pxm:"_image_light",r:"_R_light",re:"_reasonml_light",res:"_rescript_light",resi:"_rescript_1_light",rmd:"_R_light",s:"_asm_light",sass:"_sass_light",sbt:"_sbt_light",scala:"_scala_light",slang:"_crystal_embedded_light",slide:"_go_light",slim:"_slim_light",slugignore:"_config_light","smarty.tpl":"_smarty_light",sol:"_ethereum_light",soql:"_db_1_light","spec.cjs":"_javascript_1_light","spec.js":"_javascript_1_light","spec.jsx":"_react_1_light","spec.mjs":"_javascript_1_light","spec.ts":"_typescript_1_light","spec.tsx":"_react_1_light",springbeans:"_spring_light",sss:"_css_light",stache:"_mustache_light",static:"_config_light",stl:"_svg_1_light",styl:"_stylus_light",stylelintignore:"_stylelint_1_light",stylelintrc:"_stylelint_light","stylelintrc.js":"_stylelint_light","stylelintrc.json":"_stylelint_light","stylelintrc.yaml":"_stylelint_light","stylelintrc.yml":"_stylelint_light","sublime-project":"_sublime_light","sublime-workspace":"_sublime_light",svelte:"_svelte_light",svg:"_svg_light",svgx:"_image_light","test.cjs":"_javascript_1_light","test.js":"_javascript_1_light","test.jsx":"_react_1_light","test.mjs":"_javascript_1_light","test.ts":"_typescript_1_light","test.tsx":"_react_1_light",tf:"_terraform_light","tf.json":"_terraform_light",tfvars:"_terraform_light","tfvars.json":"_terraform_light",tiff:"_image_light",tmp:"_clock_1_light",toml:"_config_light",tpl:"_smarty_light",tres:"_godot_2_light",tscn:"_godot_3_light",ttf:"_font_light",twig:"_twig_light",vala:"_vala_light",vapi:"_vala_light",vue:"_vue_light",wasm:"_wasm_light",wat:"_wat_light",wav:"_audio_light",webm:"_video_light",webp:"_image_light",wgt:"_wgt_light",woff:"_font_light",woff2:"_font_light",workspace:"_bazel_light",xls:"_xls_light",xlsx:"_xls_light",zig:"_zig_light",zip:"_zip_1_light"},np={argdown:"_argdown_light",bat:"_windows_light",bicep:"_bicep_light",blade:"_php_light",c:"_c_light",chatagent:"_markdown_light",clojure:"_clojure_light",coffeescript:"_coffee_light",cpp:"_cpp_light",csharp:"_c-sharp_light",css:"_css_light","cuda-cpp":"_cu_light",dart:"_dart_light","django-html":"_html_3_light",dockercompose:"_docker_3_light",dockerfile:"_docker_light",dotenv:"_config_light",elixir:"_elixir_light",elm:"_elm_light",erb:"_html_erb_light",fsharp:"_f-sharp_light","git-commit":"_git_light","github-issues":"_github_light",go:"_go2_light",godot:"_godot_light",gradle:"_gradle_light",groovy:"_grails_light",haml:"_haml_light",handlebars:"_mustache_light",haskell:"_haskell_light",haxe:"_haxe_light",html:"_html_3_light",ignore:"_git_light",instructions:"_markdown_light",jade:"_pug_light",java:"_java_light",javascript:"_javascript_light",javascriptreact:"_react_light",jinja:"_jinja_light",json:"_json_light",jsonc:"_json_light",jsonl:"_json_light",julia:"_julia_light",kotlin:"_kotlin_light",latex:"_tex_light",less:"_less_light",lua:"_lua_light",makefile:"_makefile_light",markdown:"_markdown_light",mustache:"_mustache_light",nunjucks:"_nunjucks_light","objective-c":"_c_2_light","objective-cpp":"_cpp_2_light",ocaml:"_ocaml_light",perl:"_perl_light",php:"_php_light",postcss:"_css_light",powershell:"_powershell_light",prompt:"_markdown_light",properties:"_config_light",python:"_python_light",r:"_R_light",razor:"_html_light",rescript:"_rescript_light",ruby:"_ruby_light",rust:"_rust_light",sass:"_sass_light",scss:"_sass_light","search-result":"_code-search_light",shellscript:"_shell_light",skill:"_markdown_light",sql:"_db_light",stylus:"_stylus_light",swift:"_swift_light",terraform:"_terraform_light",tex:"_tex_1_light",typescript:"_typescript_light",typescriptreact:"_react_light",vala:"_vala_light",vue:"_vue_light",xml:"_xml_light",yaml:"_yml_light"},nu="_default_light",ng={".bash":"shellscript",".bat":"bat",".c":"c",".cc":"cpp",".cjs":"javascript",".clj":"clojure",".cljc":"clojure",".cljs":"clojure",".cmd":"bat",".coffee":"coffeescript",".cpp":"cpp",".cs":"csharp",".cshtml":"razor",".css":"css",".cu":"cuda-cpp",".cxx":"cpp",".dart":"dart",".dockerfile":"dockerfile",".fs":"fsharp",".fsx":"fsharp",".gitignore":"ignore",".go":"go",".gradle":"groovy",".groovy":"groovy",".h":"c",".handlebars":"handlebars",".hbs":"handlebars",".hpp":"cpp",".htm":"html",".html":"html",".java":"java",".jl":"julia",".js":"javascript",".json":"json",".jsonc":"jsonc",".jsx":"javascriptreact",".kt":"kotlin",".kts":"kotlin",".less":"less",".lua":"lua",".m":"objective-c",".makefile":"makefile",".markdown":"markdown",".md":"markdown",".mjs":"javascript",".mk":"makefile",".mm":"objective-cpp",".npmignore":"ignore",".php":"php",".pl":"perl",".pm":"perl",".properties":"properties",".ps1":"powershell",".psm1":"powershell",".py":"python",".r":"r",".rb":"ruby",".rs":"rust",".sass":"scss",".scss":"scss",".sh":"shellscript",".sql":"sql",".swift":"swift",".tex":"latex",".ts":"typescript",".tsx":"typescriptreact",".xml":"xml",".xsd":"xml",".xsl":"xml",".yaml":"yaml",".yml":"yaml",".zsh":"shellscript"};function nf(e){let t=nn[e];if(null!=t)return{character:t[0],color:t[1]}}var nm=Object.defineProperty,nb=Object.getOwnPropertyDescriptor,n_=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nb(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nm(t,i,s),s};let nv=class extends lit_element_i{render(){if(null==this.filename)return to;let e=document.body.classList.contains("vscode-light")||document.body.classList.contains("vscode-high-contrast-light"),t=function(e,t=!1){let i=e.toLowerCase(),r=(t?nh:na)[i];if(null!=r)return nf(r);let o=t?nd:nl,s=i.indexOf(".");for(;-1!==s&&s<i.length-1;){if(null!=(r=o[i.substring(s+1)]))return nf(r);s=i.indexOf(".",s+1)}let n=i.lastIndexOf(".");if(-1!==n){let e=ng[i.substring(n)];if(null!=e&&null!=(r=(t?np:nc)[e]))return nf(r)}return nf(t&&nu?nu:"_default")}(this.filename,e);return null==t?to:tt`<span class="font-icon" style=${ns({color:t.color||"inherit"})}
			>${function(e){if(1===e.length)return e;let t=/^\\+(?:u)?([0-9a-fA-F]{4,6})$/.exec(e);return null!=t?String.fromCodePoint(parseInt(t[1],16)):e}(t.character)}</span
		>`}};nv.styles=tj`
		:host {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: var(--gl-file-icon-size, 16px);
			height: var(--gl-file-icon-size, 16px);
			vertical-align: text-bottom;
		}

		.font-icon {
			display: inline-block;
			font-family: seti;
			font-size: var(--gl-file-icon-size, 16px);
			line-height: 1;
			text-align: center;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}
	`,n_([tY()],nv.prototype,"filename",2),nv=n_([tX("gl-file-icon")],nv);let ny={".":"Unchanged","!":"Ignored","?":"Untracked",A:"Added",D:"Deleted",M:"Modified",R:"Renamed",C:"Copied",AA:"Added (Both)",AU:"Added (Current)",UA:"Added (Incoming)",DD:"Deleted (Both)",DU:"Deleted (Current)",UD:"Deleted (Incoming)",UU:"Modified (Both)",T:"Modified",U:"Updated but Unmerged"};var nw=Object.defineProperty,nk=Object.getOwnPropertyDescriptor,nx=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nk(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nw(t,i,s),s};let nC=class extends lit_element_i{get statusName(){return this.status?ny[this.status]??"Unknown":""}updated(e){super.updated(e),e.has("status")&&(this.statusName?this.setAttribute("title",this.statusName):this.removeAttribute("title"),this.status?.length===2?this.setAttribute("conflict",""):this.removeAttribute("conflict"))}renderIgnored(){return tt`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#969696"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM10 4l-6.01 6.01 1.06 1.061 6.01-6.01L10 4z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderUntracked(){return tt`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3.942-3.942l7.5-7.5.884.884-.664.664c.95.655 1.65 1.524 2.222 2.394-1.15 1.75-2.824 3.5-6 3.5-.696 0-1.32-.084-1.882-.234l-1.176 1.176-.884-.884zm5.188-3.42l1.629-1.629c.634.393 1.147.913 1.594 1.491C10.99 8.767 9.692 9.75 7.5 9.75c-.287 0-.56-.017-.817-.05l.455-.454a1.5 1.5 0 0 0 1.608-1.608zM7.362 6.254L5.754 7.862a1.5 1.5 0 0 1 1.608-1.608zm.955-.955A6.595 6.595 0 0 0 7.5 5.25c-2.192 0-3.49.982-4.469 2.25.447.578.96 1.098 1.594 1.491l-.903.903C2.772 9.239 2.072 8.369 1.5 7.5 2.65 5.75 4.324 4 7.5 4c.696 0 1.32.084 1.882.234L8.317 5.299z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderAdded(){return tt`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#388A34"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm.75-6.75h3v-1.5h-3v-3h-1.5v3h-3v1.5h3v3h1.5v-3z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderDeleted(){return tt`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#9E121D"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-6.75v-1.5h-7.5v1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderModified(){return tt`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#1B80B2"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-9.5V7h-3v2.5h-1.5V7h-3V5.5h3v-3h1.5v3h3zm0 5V12h-7.5v-1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderRenamed(){return tt`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#C63"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.25 4.5v1.25h1.25l1 1v2.5l-1 1H9.25v1.25H10v1.25H7V11.5h.75v-1.25H4l-1-1v-2.5l1-1h3.75V4.5H7V3.25h3V4.5h-.75zm-5 2.5h3.5v2h-3.5V7zm5 0v2h1V7h-1z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderCopied(){return tt`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#692C77"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM6.964 3.75L5.893 4.813v.53h1.071v-.53h3.215v4.25h-.536v1.062h.536l1.071-1.063v-4.25L10.179 3.75H6.964zM3.75 6.938l1.071-1.063h3.215l1.071 1.063v4.25L8.036 12.25H4.82L3.75 11.187v-4.25zm1.071 0v4.25h3.215v-4.25H4.82z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderConflictGlyphs(e,t,i,r,o,s){return tt`
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 22 16">
				<path d="M3 0H10V16H3C1.35 16 0 14.65 0 13V3C0 1.35 1.35 0 3 0Z" fill="${e}" />
				<path d="M12 0H19C20.65 0 22 1.35 22 3V13C22 14.65 20.65 16 19 16H12V0Z" fill="${r}" />
				<text
					x="5"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${i}"
				>
					${t}
				</text>
				<text
					x="17"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${s}"
				>
					${o}
				</text>
			</svg>
		`}renderConflictUU(){let e="var(--gl-git-status-conflict-modified, #c4a000)";return this.renderConflictGlyphs(e,"±","#000",e,"±","#000")}renderConflictAA(){let e="var(--gl-git-status-added)";return this.renderConflictGlyphs(e,"+","#fff",e,"+","#fff")}renderConflictDD(){let e="var(--gl-git-status-deleted)";return this.renderConflictGlyphs(e,"−","#fff",e,"−","#fff")}renderConflictDU(){return this.renderConflictGlyphs("var(--gl-git-status-deleted)","−","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUD(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-deleted)","−","#fff")}renderConflictAU(){return this.renderConflictGlyphs("var(--gl-git-status-added)","+","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUA(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-added)","+","#fff")}renderUnknown(){return tt`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.19 2.822c-.439-.215-.97-.322-1.596-.322-1.25 0-2.282.478-3.094 1.435l1.05.798c.275-.331.579-.574.91-.728.331-.154.66-.231.987-.231.415 0 .76.093 1.036.28.275.182.413.448.413.798 0 .275-.082.509-.245.7-.159.187-.36.364-.602.532a9.506 9.506 0 0 0-.728.56 2.66 2.66 0 0 0-.602.763c-.159.299-.238.679-.238 1.141v.483h1.498v-.413c0-.364.086-.663.259-.896a2.76 2.76 0 0 1 .637-.616c.252-.177.504-.362.756-.553.257-.196.471-.436.644-.721.173-.285.259-.651.259-1.099 0-.387-.114-.749-.343-1.085-.229-.34-.562-.616-1.001-.826zm-1.169 7.917a1.024 1.024 0 0 0-.763-.315c-.294 0-.544.105-.749.315-.2.205-.301.453-.301.742 0 .294.1.546.301.756.205.205.455.308.749.308.303 0 .558-.103.763-.308.205-.21.308-.462.308-.756 0-.29-.103-.537-.308-.742z"
					clip-rule="evenodd"
				/>
			</svg>
		`}render(){switch(this.status){case"!":return this.renderIgnored();case"?":return this.renderUntracked();case"A":return this.renderAdded();case"D":return this.renderDeleted();case"M":case"T":case"U":return this.renderModified();case"R":return this.renderRenamed();case"C":return this.renderCopied();case"AA":return this.renderConflictAA();case"AU":return this.renderConflictAU();case"UA":return this.renderConflictUA();case"DD":return this.renderConflictDD();case"DU":return this.renderConflictDU();case"UD":return this.renderConflictUD();case"UU":return this.renderConflictUU()}return this.renderUnknown()}};nC.styles=[tj`
			:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)),
			:host-context(.vscode-dark) {
				--gl-git-status-ignored: #969696;
				--gl-git-status-untracked: #6c6c6c;
				--gl-git-status-added: #388a34;
				--gl-git-status-deleted: #9e121d;
				--gl-git-status-modified: #1b80b2;
				--gl-git-status-renamed: #c63;
				--gl-git-status-copied: #692c77;
				--gl-git-status-conflict: #7f4e7e;
				--gl-git-status-unknown: #6c6c6c;
			}

			:host-context(.vscode-high-contrast-light),
			:host-context(.vscode-light) {
				--gl-git-status-ignored: #969696;
				--gl-git-status-untracked: #6c6c6c;
				--gl-git-status-added: #388a34;
				--gl-git-status-deleted: #9e121d;
				--gl-git-status-modified: #1b80b2;
				--gl-git-status-renamed: #c63;
				--gl-git-status-copied: #692c77;
				--gl-git-status-conflict: #7f4e7e;
				--gl-git-status-unknown: #6c6c6c;
			}

			:host {
				--gl-icon-size: 1.6rem;

				display: inline-block;
				width: 16px;
				aspect-ratio: 1 / 1;
			}

			:host([conflict]) {
				--gl-icon-size: 2.2rem;

				width: 22px;
				aspect-ratio: auto;
				margin-right: var(--gl-space-4);
			}

			svg {
				display: inline-block;
				vertical-align: text-bottom;
			}
		`],nx([tY()],nC.prototype,"status",2),nx([tJ()],nC.prototype,"statusName",1),nC=nx([tX("gl-git-status")],nC);var n$=Object.defineProperty,nE=Object.getOwnPropertyDescriptor,nS=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nE(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&n$(t,i,s),s};let nA=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1,this.ariaLabel=null}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(e){if(e.has("href")&&this.setAttribute("role",this.href?"link":"button"),e.has("disabled")){let t=e.get("disabled");t?this.setAttribute("aria-disabled",t.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(e)}render(){return this.tooltip?tt`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??to}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?tt`<gl-tooltip placement=${this.tooltipPlacement??to}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?tt`<a
				class="control"
				aria-label=${this.ariaLabel??to}
				tabindex="${(!1===this.disabled?void 0:-1)??to}"
				href=${this.href}
				@keypress=${e=>this.onLinkKeypress(e)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:tt`<button
			class="control"
			role=${this.role??to}
			aria-label=${this.ariaLabel??to}
			aria-checked=${this.ariaChecked??to}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(e){" "===e.key&&this.control.click()}focus(e){this.control.focus(e)}blur(){this.control.blur()}click(){this.control.click()}};function nI(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}nA.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nA.styles=[rV,tj`
			:host {
				/* Base color variables - can be overridden by variant */
				--button-foreground: var(--vscode-button-foreground);
				--button-background: var(--vscode-button-background);
				--button-hover-background: var(--vscode-button-hoverBackground);
				--button-border: var(--vscode-button-border, transparent);

				/* Layout variables */
				--button-width: max-content;
				--button-padding: 0.4rem;
				--button-gap: 0.6rem;
				--button-compact-padding: 0.4rem;
				--button-input-padding: 0.1rem;
				--button-tight-padding: 0.4rem 0.8rem;
				--button-line-height: 1.35;

				display: inline-block;
				width: var(--button-width);
				font-family: inherit;
				font-size: inherit;
				line-height: var(--button-line-height);
				color: var(--button-foreground);
				text-align: center;
				text-decoration: none;
				cursor: pointer;
				user-select: none;
				background: var(--button-background);
				border: none;
				border: var(--gl-border-width) solid var(--button-border);
				border-radius: var(--gl-radius-sm);
				-webkit-font-smoothing: auto;
			}

			.control {
				box-sizing: border-box;
				display: inline-flex;
				flex-direction: row;
				gap: var(--button-gap);
				align-items: center;
				justify-content: center;
				width: var(--button-width);
				max-width: 100%;
				height: 100%;
				padding: var(--button-padding);
				font-family: inherit;
				font-size: inherit;
				line-height: var(--button-line-height);
				color: inherit;
				text-decoration: none;
				cursor: pointer;
			}

			/* When truncate is enabled, allow the control to shrink */
			:host([truncate]) .control {
				min-width: 0;
			}

			button.control {
				appearance: none;
				background: transparent;
				border: none;
			}

			.control:focus {
				outline: none;
			}

			.label {
				display: inline-flex;
				align-items: center;
				max-width: 100%;
			}

			/* Text truncation option - enabled via truncate attribute */
			:host([truncate]) .label {
				display: block; /* Change from flex to block for ellipsis to work */
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			:host(:hover) {
				background: var(--button-hover-background);
			}

			:host(:focus-within) {
				${rq}
			}

			:host([appearance='input']),
			:host([role='checkbox']:focus-within),
			:host([aria-checked]:focus-within) {
				outline-offset: -1px;
			}

			:host([full]),
			:host([full]) .control {
				width: 100%;
			}

			:host([appearance='secondary']) {
				--button-background: var(--vscode-button-secondaryBackground);
				--button-foreground: var(--vscode-button-secondaryForeground);
				--button-hover-background: var(--vscode-button-secondaryHoverBackground);
			}

			:host([appearance='input']),
			:host([appearance='toolbar']) {
				--button-background: transparent;
				--button-foreground: var(--vscode-foreground);
				--button-hover-background: var(--vscode-toolbar-hoverBackground);
				--button-border: transparent;
			}

			:host([appearance='alert']) {
				--button-background: transparent;
				--button-border: var(--color-alert-infoBorder);
				--button-foreground: var(--color-alert-infoForeground);
				--button-hover-background: var(--color-alert-infoBorder);
				--button-line-height: 1.64;

				width: max-content;
			}

			:host([appearance='alert']:hover) {
				--button-foreground: var(--vscode-button-foreground);
			}

			/* Variant property for semantic states - appearance controls structure, variant controls color */

			/* Solid buttons (default and secondary) with variants get full color treatment */
			:host([variant='danger']) {
				--button-foreground: var(--vscode-inputValidation-errorForeground, #f48771);
				--button-background: var(--vscode-inputValidation-errorBackground, #5a1d1d);
				--button-hover-background: color-mix(
					in srgb,
					#000 30%,
					var(--vscode-inputValidation-errorBorder, #be1100)
				);
				--button-border: var(--vscode-inputValidation-errorBorder, #be1100);
			}

			:host([variant='warning']) {
				--button-foreground: var(--vscode-inputValidation-warningForeground, #fc6);
				--button-background: var(--vscode-inputValidation-warningBackground, #352a05);
				--button-hover-background: color-mix(
					in srgb,
					#000 30%,
					var(--vscode-inputValidation-warningBorder, #b89500)
				);
				--button-border: var(--vscode-inputValidation-warningBorder, #b89500);
			}

			:host([variant='success']) {
				--button-foreground: #fff;
				--button-background: color-mix(in srgb, #000 40%, var(--vscode-testing-iconPassed, #73c991));
				--button-hover-background: color-mix(in srgb, #000 30%, var(--vscode-testing-iconPassed, #73c991));
				--button-border: color-mix(in srgb, #000 40%, var(--vscode-testing-iconPassed, #73c991));
			}

			/* Transparent appearances (toolbar, input, alert) with variants only change foreground color */

			/* These come after the main variant rules to override background/border back to transparent */
			:host([appearance='toolbar'][variant='danger']),
			:host([appearance='input'][variant='danger']),
			:host([appearance='alert'][variant='danger']) {
				--button-foreground: var(--vscode-errorForeground, #f48771);
				--button-background: transparent;
				--button-border: transparent;
			}

			:host([appearance='toolbar'][variant='warning']),
			:host([appearance='input'][variant='warning']),
			:host([appearance='alert'][variant='warning']) {
				--button-foreground: var(--vscode-editorWarning-foreground, #cca700);
				--button-background: transparent;
				--button-border: transparent;
			}

			:host([appearance='toolbar'][variant='success']),
			:host([appearance='input'][variant='success']),
			:host([appearance='alert'][variant='success']) {
				--button-foreground: var(--vscode-testing-iconPassed, #73c991);
				--button-background: transparent;
				--button-border: transparent;
			}

			:host([appearance='input']) .control {
				gap: var(--gl-space-2);
				height: var(--button-input-height, 1.8rem);
				padding: var(--button-input-padding);
				--button-line-height: 1.1;
			}

			:host([appearance='input'][href]) > a,
			:host([appearance='toolbar'][href]) > a {
				display: flex;
				align-items: center;
			}

			:host([appearance='alert'][href]) > a {
				display: block;
				width: max-content;
			}

			/* Give solid-filled buttons a bit more horizontal breathing room. Exposed via a
	   CSS var so consumers (e.g. compose-mode commit checkbox) can collapse to a
	   square icon button. */
			:host(:not([appearance])) .control,
			:host([appearance='secondary']) .control {
				padding-inline: var(--button-padding-inline, 0.8rem);
			}

			:host([density='compact']) .control {
				padding: var(--button-compact-padding);
			}

			:host([density='tight']) .control {
				padding: var(--button-tight-padding);
			}

			:host([density='tight']) .control ::slotted(code-icon) {
				--code-icon-size: 11px;
				--code-icon-v-align: unset;
			}

			:host([aria-checked]:hover:not([disabled], [aria-checked='true'])) {
				background-color: var(--vscode-inputOption-hoverBackground);
			}

			:host([disabled]) {
				pointer-events: none;
				cursor: not-allowed;
				opacity: 0.4;
			}

			:host([disabled][aria-checked='true']) {
				opacity: 0.8;
			}

			:host([aria-checked='true']) {
				color: var(--vscode-inputOption-activeForeground);
				background-color: var(--vscode-inputOption-activeBackground);
				border-color: var(--vscode-inputOption-activeBorder);
			}

			gl-tooltip {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
			}
		`],nS([t1(".control")],nA.prototype,"control",2),nS([tY({reflect:!0})],nA.prototype,"appearance",2),nS([tY({reflect:!0})],nA.prototype,"variant",2),nS([tY({type:Boolean,reflect:!0})],nA.prototype,"disabled",2),nS([tY({reflect:!0})],nA.prototype,"density",2),nS([tY({type:Boolean,reflect:!0})],nA.prototype,"full",2),nS([tY()],nA.prototype,"href",2),nS([tY()],nA.prototype,"tooltip",2),nS([tY()],nA.prototype,"tooltipPlacement",2),nS([tY({type:Boolean,reflect:!0})],nA.prototype,"truncate",2),nS([tY({type:String,attribute:"aria-label"})],nA.prototype,"ariaLabel",2),nA=nS([tX("gl-button")],nA);var nP=nI(),nz={exec:()=>null};function nT(e){let t=[];return i=>{let r=Math.max(0,Math.min(3,i-1)),o=t[r];return o||(o=e(r),t[r]=o),o}}function nj(e,t=""){let i="string"==typeof e?e:e.source,r={replace:(e,t)=>{let o="string"==typeof t?t:t.source;return o=o.replace(nO.caret,"$1"),i=i.replace(e,o),r},getRegex:()=>new RegExp(i,t)};return r}var nR=((e="")=>{try{return!!RegExp("(?<=1)(?<!1)"+e)}catch{return!1}})(),nO={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:nT(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:nT(e=>RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:nT(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:nT(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:nT(e=>RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:nT(e=>RegExp(`^ {0,${e}}>`))},nM=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,nL=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,nD=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,nB=nj(nD).replace(/bull/g,nL).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),nF=nj(nD).replace(/bull/g,nL).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),nN=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nU=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,nq=nj(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",nU).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nV=nj(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,nL).getRegex(),nH="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",nK=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,nW=nj("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",nK).replace("tag",nH).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),nG=nj(nN).replace("hr",nM).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",nH).getRegex(),nZ={blockquote:nj(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",nG).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:nq,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:nM,html:nW,lheading:nB,list:nV,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:nG,table:nz,text:/^[^\n]+/},nX=nj("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",nM).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",nH).getRegex(),nQ={...nZ,lheading:nF,table:nX,paragraph:nj(nN).replace("hr",nM).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",nX).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",nH).getRegex()},nY={...nZ,html:nj("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",nK).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:nz,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:nj(nN).replace("hr",nM).replace("heading",` *#{1,6} *[^
]`).replace("lheading",nB).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},nJ=/^( {2,}|\\)\n(?!\s*$)/,n0=/[\p{P}\p{S}]/u,n1=/[\s\p{P}\p{S}]/u,n2=/[^\s\p{P}\p{S}]/u,n5=nj(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,n1).getRegex(),n3=/(?!~)[\p{P}\p{S}]/u,n4=nj(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",nR?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),n7=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,n6=nj(n7,"u").replace(/punct/g,n0).getRegex(),n8=nj(n7,"u").replace(/punct/g,n3).getRegex(),n9="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ae=nj(n9,"gu").replace(/notPunctSpace/g,n2).replace(/punctSpace/g,n1).replace(/punct/g,n0).getRegex(),at=nj(n9,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,n3).getRegex(),ai=nj("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,n2).replace(/punctSpace/g,n1).replace(/punct/g,n0).getRegex(),ar=nj(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,n0).getRegex(),ao=nj("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,n2).replace(/punctSpace/g,n1).replace(/punct/g,n0).getRegex(),as=nj(/\\(punct)/,"gu").replace(/punct/g,n0).getRegex(),an=nj(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),aa=nj(nK).replace("(?:--\x3e|$)","--\x3e").getRegex(),al=nj("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",aa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ac=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,ah=nj(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",ac).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ad=nj(/^!?\[(label)\]\[(ref)\]/).replace("label",ac).replace("ref",nU).getRegex(),ap=nj(/^!?\[(ref)\](?:\[\])?/).replace("ref",nU).getRegex(),au=nj("reflink|nolink(?!\\()","g").replace("reflink",ad).replace("nolink",ap).getRegex(),ag=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,af={_backpedal:nz,anyPunctuation:as,autolink:an,blockSkip:n4,br:nJ,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:nz,delLDelim:nz,delRDelim:nz,emStrongLDelim:n6,emStrongRDelimAst:ae,emStrongRDelimUnd:ai,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:ah,nolink:ap,punctuation:n5,reflink:ad,reflinkSearch:au,tag:al,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:nz},am={...af,link:nj(/^!?\[(label)\]\((.*?)\)/).replace("label",ac).getRegex(),reflink:nj(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ac).getRegex()},ab={...af,emStrongRDelimAst:at,emStrongLDelim:n8,delLDelim:ar,delRDelim:ao,url:nj(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ag).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:nj(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ag).getRegex()},a_={...ab,br:nj(nJ).replace("{2,}","*").getRegex(),text:nj(ab.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},av={normal:nZ,gfm:nQ,pedantic:nY},ay={normal:af,gfm:ab,breaks:a_,pedantic:am},aw={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ak=e=>aw[e];function ax(e,t){if(t){if(nO.escapeTest.test(e))return e.replace(nO.escapeReplace,ak)}else if(nO.escapeTestNoEncode.test(e))return e.replace(nO.escapeReplaceNoEncode,ak);return e}function aC(e){try{e=encodeURI(e).replace(nO.percentDecode,"%")}catch{return null}return e}function a$(e,t){let i=e.replace(nO.findPipe,(e,t,i)=>{let r=!1,o=t;for(;--o>=0&&"\\"===i[o];)r=!r;return r?"|":" |"}).split(nO.splitPipe),r=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;r<i.length;r++)i[r]=i[r].trim().replace(nO.slashPipe,"|");return i}function aE(e,t,i){let r=e.length;if(0===r)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s!==t||i)if(s!==t&&i)o++;else break;else o++}return e.slice(0,r-o)}function aS(e){let t=e.split(`
`),i=t.length-1;for(;i>=0&&nO.blankLine.test(t[i]);)i--;return t.length-i<=2?e:t.slice(0,i+1).join(`
`)}function aA(e,t,i,r,o){let s=t.href,n=t.title||null,a=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:s,title:n,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,c}var aI=class{options;rules;lexer;constructor(e){this.options=e||nP}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:aS(t[0]),i=e.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e,codeBlockStyle:"indented",text:i}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let r=e.match(i.other.indentCodeCompensation);if(null===r)return t;let o=r[1];return t.split(`
`).map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[r]=t;return r.length>=o.length?e.slice(o.length):e}).join(`
`)}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=aE(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:aE(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:aE(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=aE(t[0],`
`).split(`
`),i="",r="",o=[];for(;e.length>0;){let t=!1,s=[],n;for(n=0;n<e.length;n++)if(this.rules.other.blockquoteStart.test(e[n]))s.push(e[n]),t=!0;else if(t)break;else s.push(e[n]);e=e.slice(n);let a=s.join(`
`),c=a.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${a}`:a,r=r?`${r}
${c}`:c;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,o,!0),this.lexer.state.top=h,0===e.length)break;let p=o.at(-1);if(p?.type==="code")break;if(p?.type==="blockquote"){let t=p.raw+`
`+e.join(`
`),s=this.blockquote(t);o[o.length-1]=s,i=i.substring(0,i.length-p.raw.length)+s.raw,r=r.substring(0,r.length-p.text.length)+s.text;break}if(p?.type==="list"){let t=p.raw+`
`+e.join(`
`),s=this.list(t);o[o.length-1]=s,i=i.substring(0,i.length-p.raw.length)+s.raw,r=r.substring(0,r.length-p.raw.length)+s.raw,e=t.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),r=i.length>1,o={type:"list",raw:"",ordered:r,start:r?+i.slice(0,-1):"",loose:!1,items:[]};i=r?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=r?i:"[*+-]");let s=this.rules.other.listItemRegex(i),n=!1;for(;e;){let i=!1,r="",a="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let c=function(e,t=0){let i=t,r="";for(let t of e)if("	"===t){let e=4-i%4;r+=" ".repeat(e),i+=e}else r+=t,i++;return r}(t[2].split(`
`,1)[0],t[1].length),h=e.split(`
`,1)[0],p=!c.trim(),u=0;if(this.options.pedantic?(u=2,a=c.trimStart()):p?u=t[1].length+1:(u=(u=c.search(this.rules.other.nonSpaceChar))>4?1:u,a=c.slice(u),u+=t[1].length),p&&this.rules.other.blankLine.test(h)&&(r+=h+`
`,e=e.substring(h.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(u),i=this.rules.other.hrRegex(u),o=this.rules.other.fencesBeginRegex(u),s=this.rules.other.headingBeginRegex(u),n=this.rules.other.htmlBeginRegex(u),g=this.rules.other.blockquoteBeginRegex(u);for(;e;){let f=e.split(`
`,1)[0],m;if(h=f,m=this.options.pedantic?h=h.replace(this.rules.other.listReplaceNesting,"  "):h.replace(this.rules.other.tabCharGlobal,"    "),o.test(h)||s.test(h)||n.test(h)||g.test(h)||t.test(h)||i.test(h))break;if(m.search(this.rules.other.nonSpaceChar)>=u||!h.trim())a+=`
`+m.slice(u);else{if(p||c.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(c)||s.test(c)||i.test(c))break;a+=`
`+h}p=!h.trim(),r+=f+`
`,e=e.substring(f.length+1),c=m.slice(u)}}o.loose||(n?o.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(n=!0)),o.items.push({type:"list_item",raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(a),loose:!1,text:a,tokens:[]}),o.raw+=r}let a=o.items.at(-1);if(!a)return;for(let e of(a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd(),o.raw=o.raw.trimEnd(),o.items)){this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]);let t=e.tokens[0];if(e.task&&(t?.type==="text"||t?.type==="paragraph")){e.text=e.text.replace(this.rules.other.listReplaceTask,""),t.raw=t.raw.replace(this.rules.other.listReplaceTask,""),t.text=t.text.replace(this.rules.other.listReplaceTask,"");for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,"");break}let i=this.rules.other.listTaskCheckbox.exec(e.raw);if(i){let t={type:"checkbox",raw:i[0]+" ",checked:"[ ]"!==i[0]};e.checked=t.checked,o.loose?e.tokens[0]&&["paragraph","text"].includes(e.tokens[0].type)&&"tokens"in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:"paragraph",raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&(e.task=!1);if(!o.loose){let t=e.tokens.filter(e=>"space"===e.type);o.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(o.loose)for(let e of o.items)for(let t of(e.loose=!0,e.tokens))"text"===t.type&&(t.type="paragraph");return o}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=aS(t[0]);return{type:"html",block:!0,raw:e,pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:aE(t[0],`
`),href:i,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=a$(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:aE(t[0],`
`),header:[],align:[],rows:[]};if(i.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?s.align.push("right"):this.rules.other.tableAlignCenter.test(e)?s.align.push("center"):this.rules.other.tableAlignLeft.test(e)?s.align.push("left"):s.align.push(null);for(let e=0;e<i.length;e++)s.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:s.align[e]});for(let e of o)s.rows.push(a$(e,s.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:s.align[t]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:"heading",raw:aE(t[0],`
`),depth:"="===t[2].charAt(0)?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=aE(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e){if(-1===e.indexOf(")"))return -1;let t=0;for(let i=0;i<e.length;i++)if("\\"===e[i])i++;else if("("===e[i])t++;else if(")"===e[i]&&--t<0)return i;return t>0?-2:-1}(t[2]);if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),aA(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return aA(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!i||this.rules.inline.punctuation.exec(i))){let i=[...r[0]].length-1,o,s,n=i,a=0,c="*"===r[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+i);null!==(r=c.exec(t));){if(!(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6]))continue;if(s=[...o].length,r[3]||r[4]){n+=s;continue}if((r[5]||r[6])&&i%3&&!((i+s)%3)){a+=s;continue}if((n-=s)>0)continue;s=Math.min(s,s+n+a);let t=[...r[0]][0].length,c=e.slice(0,i+r.index+t+s);if(Math.min(i,s)%2){let e=c.slice(1,-1);return{type:"em",raw:c,text:e,tokens:this.lexer.inlineTokens(e)}}let h=c.slice(2,-2);return{type:"strong",raw:c,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&r&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,i=""){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!i||this.rules.inline.punctuation.exec(i))){let i=[...r[0]].length-1,o,s,n=i,a=this.rules.inline.delRDelim;for(a.lastIndex=0,t=t.slice(-1*e.length+i);null!==(r=a.exec(t));){if(!(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6])||(s=[...o].length)!==i)continue;if(r[3]||r[4]){n+=s;continue}if((n-=s)>0)continue;s=Math.min(s,s+n);let t=[...r[0]][0].length,a=e.slice(0,i+r.index+t+s),c=a.slice(i,-i);return{type:"del",raw:a,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return i="@"===t[2]?"mailto:"+(e=t[1]):e=t[1],{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])i="mailto:"+(e=t[0]);else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(r!==t[0])e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},aP=class l{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||nP,this.options.tokenizer=this.options.tokenizer||new aI,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:nO,block:av.normal,inline:ay.normal};this.options.pedantic?(t.block=av.pedantic,t.inline=ay.pedantic):this.options.gfm&&(t.block=av.gfm,this.options.breaks?t.inline=ay.breaks:t.inline=ay.gfm),this.tokenizer.rules=t}static get rules(){return{block:av,inline:ay}}static lex(e,t){return new l(t).lex(e)}static lexInline(e,t){return new l(t).inlineTokens(e)}lex(e){e=e.replace(nO.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(nO.tabCharGlobal,"    ").replace(nO.spaceLine,""));let r=1/0;for(;e;){let o;if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}if(this.options.extensions?.block?.some(i=>!!(o=i.call({lexer:this},e,t))&&(e=e.substring(o.raw.length),t.push(o),!0)))continue;if(o=this.tokenizer.space(e)){e=e.substring(o.raw.length);let i=t.at(-1);1===o.raw.length&&void 0!==i?i.raw+=`
`:t.push(o);continue}if(o=this.tokenizer.code(e)){e=e.substring(o.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):t.push(o);continue}if((o=this.tokenizer.fences(e))||(o=this.tokenizer.heading(e))||(o=this.tokenizer.hr(e))||(o=this.tokenizer.blockquote(e))||(o=this.tokenizer.list(e))||(o=this.tokenizer.html(e))){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.def(e)){e=e.substring(o.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},t.push(o));continue}if((o=this.tokenizer.table(e))||(o=this.tokenizer.lheading(e))){e=e.substring(o.raw.length),t.push(o);continue}let s=e;if(this.options.extensions?.startBlock){let t=1/0,i=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{"number"==typeof(r=e.call({lexer:this},i))&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let r=t.at(-1);i&&r?.type==="paragraph"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+o.raw,r.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(o),i=s.length!==e.length,e=e.substring(o.raw.length);continue}if(o=this.tokenizer.text(e)){e=e.substring(o.raw.length);let i=t.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(o);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i;this.tokenizer.lexer=this;let r=e,o=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!==(o=this.tokenizer.rules.inline.reflinkSearch.exec(r));)e.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!==(o=this.tokenizer.rules.inline.anyPunctuation.exec(r));)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!==(o=this.tokenizer.rules.inline.blockSkip.exec(r));)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,n="",a=1/0;for(;e;){let i;if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}if(s||(n=""),s=!1,this.options.extensions?.inline?.some(r=>!!(i=r.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if((i=this.tokenizer.escape(e))||(i=this.tokenizer.tag(e))||(i=this.tokenizer.link(e))){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let r=t.at(-1);"text"===i.type&&r?.type==="text"?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if((i=this.tokenizer.emStrong(e,r,n))||(i=this.tokenizer.codespan(e))||(i=this.tokenizer.br(e))||(i=this.tokenizer.del(e,r,n))||(i=this.tokenizer.autolink(e))||!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let o=e;if(this.options.extensions?.startInline){let t=1/0,i=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{"number"==typeof(r=e.call({lexer:this},i))&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(i=this.tokenizer.inlineText(o)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(n=i.raw.slice(-1)),s=!0;let r=t.at(-1);r?.type==="text"?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){if(this.options.silent);else throw Error("Infinite loop on byte: "+e)}},az=class{options;parser;constructor(e){this.options=e||nP}space(e){return""}code({text:e,lang:t,escaped:i}){let r=(t||"").match(nO.notSpaceStart)?.[0],o=e.replace(nO.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ax(r)+'">'+(i?o:ax(o,!0))+`</code></pre>
`:"<pre><code>"+(i?o:ax(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,i=e.start,r="";for(let t=0;t<e.items.length;t++){let i=e.items[t];r+=this.listitem(i)}let o=t?"ol":"ul";return"<"+o+(t&&1!==i?' start="'+i+'"':"")+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let r="";for(let t=0;t<e.rows.length;t++){let o=e.rows[t];i="";for(let e=0;e<o.length;e++)i+=this.tablecell(o[e]);r+=this.tablerow({text:i})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ax(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let r=this.parser.parseInline(i),o=aC(e);if(null===o)return r;let s='<a href="'+(e=o)+'"';return t&&(s+=' title="'+ax(t)+'"'),s+=">"+r+"</a>"}image({href:e,title:t,text:i,tokens:r}){r&&(i=this.parser.parseInline(r,this.parser.textRenderer));let o=aC(e);if(null===o)return ax(i);e=o;let s=`<img src="${e}" alt="${ax(i)}"`;return t&&(s+=` title="${ax(t)}"`),s+=">"}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ax(e.text)}},aT=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},aj=class l{options;renderer;textRenderer;constructor(e){this.options=e||nP,this.options.renderer=this.options.renderer||new az,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new aT}static parse(e,t){return new l(t).parse(e)}static parseInline(e,t){return new l(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let i=0;i<e.length;i++){let r=e[i];if(this.options.extensions?.renderers?.[r.type]){let e=this.options.extensions.renderers[r.type].call({parser:this},r);if(!1!==e||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(r.type)){t+=e||"";continue}}switch(r.type){case"space":t+=this.renderer.space(r);break;case"hr":t+=this.renderer.hr(r);break;case"heading":t+=this.renderer.heading(r);break;case"code":t+=this.renderer.code(r);break;case"table":t+=this.renderer.table(r);break;case"blockquote":t+=this.renderer.blockquote(r);break;case"list":t+=this.renderer.list(r);break;case"checkbox":t+=this.renderer.checkbox(r);break;case"html":t+=this.renderer.html(r);break;case"def":t+=this.renderer.def(r);break;case"paragraph":t+=this.renderer.paragraph(r);break;case"text":t+=this.renderer.text(r);break;default:{let e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let i="";for(let r=0;r<e.length;r++){let o=e[r];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){i+=e||"";continue}}switch(o.type){case"escape":case"text":i+=t.text(o);break;case"html":i+=t.html(o);break;case"link":i+=t.link(o);break;case"image":i+=t.image(o);break;case"checkbox":i+=t.checkbox(o);break;case"strong":i+=t.strong(o);break;case"em":i+=t.em(o);break;case"codespan":i+=t.codespan(o);break;case"br":i+=t.br(o);break;case"del":i+=t.del(o);break;default:{let e='Token with "'+o.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return i}},aR=class{options;block;constructor(e){this.options=e||nP}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?aP.lex:aP.lexInline}provideParser(e=this.block){return e?aj.parse:aj.parseInline}},aO=class{defaults=nI();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=aj;Renderer=az;TextRenderer=aT;Lexer=aP;Tokenizer=aI;Hooks=aR;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let r of e)switch(i=i.concat(t.call(this,r)),r.type){case"table":for(let e of r.header)i=i.concat(this.walkTokens(e.tokens,t));for(let e of r.rows)for(let r of e)i=i.concat(this.walkTokens(r.tokens,t));break;case"list":i=i.concat(this.walkTokens(r.items,t));break;default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let o=e[r].flat(1/0);i=i.concat(this.walkTokens(o,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];i?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return!1===r&&(r=i.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new az(this.defaults);for(let i in e.renderer){if(!(i in t))throw Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let r=e.renderer[i],o=t[i];t[i]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=o.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new aI(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let r=e.tokenizer[i],o=t[i];t[i]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=o.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new aR;for(let i in e.hooks){if(!(i in t))throw Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let r=e.hooks[i],o=t[i];aR.passThroughHooks.has(i)?t[i]=e=>{if(this.defaults.async&&aR.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await r.call(t,e);return o.call(t,i)})();let s=r.call(t,e);return o.call(t,s)}:t[i]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await r.apply(t,e);return!1===i&&(i=await o.apply(t,e)),i})();let i=r.apply(t,e);return!1===i&&(i=o.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(r.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return aP.lex(e,t??this.defaults)}parser(e,t){return aj.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let r={...i},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===r.async)return s(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return s(Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return s(Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,r=await (o.hooks?await o.hooks.provideLexer(e):e?aP.lex:aP.lexInline)(i,o),s=o.hooks?await o.hooks.processAllTokens(r):r;o.walkTokens&&await Promise.all(this.walkTokens(s,o.walkTokens));let n=await (o.hooks?await o.hooks.provideParser(e):e?aj.parse:aj.parseInline)(s,o);return o.hooks?await o.hooks.postprocess(n):n})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer(e):e?aP.lex:aP.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let r=(o.hooks?o.hooks.provideParser(e):e?aj.parse:aj.parseInline)(i,o);return o.hooks&&(r=o.hooks.postprocess(r)),r}catch(e){return s(e)}}}onError(e,t){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e="<p>An error occurred:</p><pre>"+ax(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},aM=new aO;function aL(e,t){return aM.parse(e,t)}aL.options=aL.setOptions=function(e){return aM.setOptions(e),aL.defaults=aM.defaults,nP=aL.defaults,aL},aL.getDefaults=nI,aL.defaults=nP,aL.use=function(...e){return aM.use(...e),aL.defaults=aM.defaults,nP=aL.defaults,aL},aL.walkTokens=function(e,t){return aM.walkTokens(e,t)},aL.parseInline=aM.parseInline,aL.Parser=aj,aL.parser=aj.parse,aL.Renderer=az,aL.TextRenderer=aT,aL.Lexer=aP,aL.lexer=aP.lex,aL.Tokenizer=aI,aL.Hooks=aR,aL.parse=aL,aL.options,aL.setOptions,aL.use,aL.walkTokens,aL.parseInline,aj.parse,aP.lex;let aD=/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi,aB=/\s*!important\s*$/i;function aF(e){return e.includes("style")?e.replace(aD," data-gl-style=$1"):e}var aN=Object.defineProperty,aU=Object.getOwnPropertyDescriptor,aq=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?aU(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&aN(t,i,s),s};let aV=class extends lit_element_i{constructor(){super(...arguments),this.markdown="",this.density="compact",this.inline=!1}render(){return tt`${this.markdown?this.renderMarkdown(this.markdown):""}`}updated(e){for(let t of(super.updated(e),this.renderRoot.querySelectorAll("[data-gl-style]"))){let e=t.dataset.glStyle;e&&function(e,t){for(let i of t.split(";")){let t=i.indexOf(":");if(-1===t)continue;let r=i.slice(0,t).trim();if(!r)continue;let o=i.slice(t+1).trim();if(!o)continue;let s="";aB.test(o)&&(o=o.replace(aB,""),s="important"),e.style.setProperty(r,o,s)}}(t,e),t.removeAttribute("data-gl-style")}}renderMarkdown(e){let t,i,r,o;return this.inline?(c??=new aO({breaks:!1,gfm:!0,renderer:(i=0,r=!1,{blockquote:function({tokens:e}){return this.parser.parse(e)},code:function({text:e}){return`<code>${aW(e)}</code>`},codespan:function({text:e}){return`<code>${aW(e)}</code>`},heading:function({tokens:e}){return this.parser.parseInline(e)},hr:function(){return""},image:function({text:e}){return e||""},link:function({tokens:e}){return this.parser.parseInline(e)},list:function(e){r=e.ordered,i="number"==typeof e.start?e.start:1;let t="";for(let i of e.items)t+=o.call(this,i);return t},listitem:o=function(e){let t,o=this.parser.parse(e.tokens);return e.task?t=e.checked?"☑":"☐":r?(t=`${i}.`,i++):t="•",`${t} ${o.trim()} `},paragraph:function({tokens:e}){return this.parser.parseInline(e)},table:function(){return""},br:function(){return" "},html:function(){return""}})}),t=a1(t=c.parse(a0(e),{async:!1})),tt`<span>${rI(aF(t))}</span>`):(h??=new aO({breaks:!0,gfm:!0,renderer:{image:function({href:e,title:t,text:i}){let r=[],o=[];return e&&({href:e,dimensions:r}=function(e){let t=[],i=e.split("|").map(e=>e.trim());e=i[0];let r=i[1];if(r){let e=/height=(\d+)/.exec(r),i=/width=(\d+)/.exec(r),o=e?e[1]:"",s=i?i[1]:"",n=isFinite(parseInt(s)),a=isFinite(parseInt(o));n&&t.push(`width="${s}"`),a&&t.push(`height="${o}"`)}return{href:e,dimensions:t}}(e),o.push(`src="${a5(e)}"`)),i&&o.push(`alt="${a5(i)}"`),t&&o.push(`title="${a5(t)}"`),r.length&&(o=[...o,...r]),`<img ${o.join(" ")}>`},codespan:function({text:e}){return`<code>${aW(e)}</code>`},paragraph:function({tokens:e}){let t=this.parser.parseInline(e);return`<p>${t}</p>`},html:function({text:e}){return e.match(/^(<span[^>]+>)|(<\/\s*span>)$/)?e:""}}}),rI(aF(t=a1(t=h.parse(a0(e),{async:!1})))))}};aV.styles=[rD,tj`
			:host {
				display: contents;

				--markdown-compact-block-spacing: 8px;
				--markdown-list-spacing: 20px;
			}

			a,
			a code {
				text-decoration: none;
				color: var(--vscode-textLink-foreground);
			}

			a:hover,
			a:hover code {
				color: var(--vscode-textLink-activeForeground);
			}

			a:hover:not(.disabled) {
				cursor: pointer;
			}

			p,
			.code,
			ul,
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				margin-inline: 0;
			}

			:where(:host([density='compact'])) p,
			:where(:host([density='compact'])) .code,
			:where(:host([density='compact'])) ul,
			:where(:host([density='compact'])) h1,
			:where(:host([density='compact'])) h2,
			:where(:host([density='compact'])) h3,
			:where(:host([density='compact'])) h4,
			:where(:host([density='compact'])) h5,
			:where(:host([density='compact'])) h6 {
				margin-block: var(--markdown-compact-block-spacing);
			}

			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				line-height: 1.1;
			}

			code {
				background: var(--vscode-textCodeBlock-background);
				border-radius: var(--gl-radius-sm);
				padding: 0px 4px 2px 4px;
				font-family: var(--vscode-editor-font-family);
			}

			code code-icon {
				color: inherit;
				font-size: inherit;
				vertical-align: middle;
			}

			p:first-child,
			.code:first-child,
			ul:first-child {
				margin-top: 0;
			}

			p:last-child,
			.code:last-child,
			ul:last-child {
				margin-bottom: 0;
			}

			/* MarkupContent Layout */
			ul {
				padding-left: var(--markdown-list-spacing);
			}
			ol {
				padding-left: var(--markdown-list-spacing);
			}

			li > p {
				margin-bottom: 0;
			}

			li > ul {
				margin-top: 0;
			}
=		`],aq([tY({type:String})],aV.prototype,"markdown",2),aq([tY({type:String,reflect:!0})],aV.prototype,"density",2),aq([tY({type:Boolean,reflect:!0})],aV.prototype,"inline",2),aV=aq([tX("gl-markdown")],aV);let aH={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},aK=e=>aH[e];function aW(e,t){if(t){if(/[&<>"']/.test(e))return e.replace(/[&<>"']/g,aK)}else if(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/.test(e))return e.replace(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,aK);return e}let aG="[A-Za-z0-9-]+",aZ="~[A-Za-z]+",aX=RegExp(`^(${aG})(${aZ})?$`),aQ=RegExp(`\\$\\(${aG}(?:${aZ})?\\)`,"g"),aY=RegExp(`\\\\${aQ.source}`,"g"),aJ=RegExp(`(\\\\)?\\$\\((${aG}(?:${aZ})?)\\)`,"g");function a0(e){return e.replace(aY,e=>`\\${e}`)}function a1(e){let t,i,r=[],o=0;for(;null!==(t=aJ.exec(e));){o<(i=t.index||0)&&r.push(e.substring(o,i)),o=(t.index||0)+t[0].length;let[,s,n]=t;r.push(s?`$(${n})`:function(e){let[,t,i]=aX.exec(e.id)??[void 0,"error",void 0];return t.startsWith("gitlens-")&&(t=`gl-${t.substring(8)}`),`<code-icon icon="${t}"${i?` modifier="${i}"`:""}></code-icon>`}({id:n}))}return o<e.length&&r.push(e.substring(o)),r.join("")}let a2=/"/g;function a5(e){return e.replace(a2,"&quot;")}tj`
		:host {
			display: block;
			height: 100%;
		}
	`;let a3=[rV,tj`
		:host {
			--tree-connector-spacing: 0.6rem;
			--tree-connector-size: var(--gitlens-tree-indent, 1.6rem);

			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 2.2rem;
			padding: 0.1rem 0.5rem 0.1rem var(--gitlens-gutter-width);

			/* Reduced containment to allow tooltips to escape */
			contain: layout;
			font-size: var(--vscode-font-size);
			line-height: 2.2rem;
			color: var(--gitlens-tree-foreground, var(--vscode-foreground));
			cursor: pointer;
		}

		:host([aria-hidden='true']) {
			display: none;
		}

		/* Rich mode: host a multi-line / card component (e.g. gl-commit-row) in the default slot.
	   Relaxes the single-line tree-row constraints so the consumer's content drives row height. */
		:host([rich]) {
			height: auto;
			min-height: var(--gl-tree-item-min-height, 2.2rem);
			padding-top: var(--gl-tree-item-padding-y, 0.4rem);
			padding-bottom: var(--gl-tree-item-padding-y, 0.4rem);
			line-height: normal;
		}

		:host([rich]) .item {
			align-items: stretch;
		}

		:host([rich]) .text {
			text-overflow: clip;
			line-height: normal;
			white-space: normal;
		}

		:host([rich]) .main,
		:host([rich]) .description {
			display: block;
		}

		:host(:hover) {
			/* Raise above sibling items so action tooltips aren't painted behind the next row */
			z-index: 1;
			color: var(--vscode-list-hoverForeground);
			background-color: var(--vscode-list-hoverBackground);
		}

		/* Disabled state — propagated from disable-check so AI-excluded files (or any other
	   row that shouldn't be acted on) read as visually inactive AND inert (clicking the
	   row will not open the file or trigger any action — same UX as a disabled menu item).
	   The checkbox visual is already dimmed via .checkbox:has(:disabled) and the underlying
	   <input> is :disabled, so it cannot be activated regardless. */
		:host([disable-check]) .item,
		:host([disable-check]) slot[name='decorations-before'],
		:host([disable-check]) slot[name='decorations-after'],
		:host([disable-check]) .actions {
			color: var(--vscode-disabledForeground, inherit);
			opacity: 0.7;
		}

		:host([disable-check]) .item {
			pointer-events: none;
			cursor: default;
		}

		:host([disable-check]) .actions {
			pointer-events: none;
		}

		:host([disable-check]:hover) {
			background-color: transparent;
		}

		/* Selection AND the focused-cursor highlight get identical treatment: both brighten from the
	   inactive to the active selection colors via the --gl-tree-focus-within var (0/1), set by
	   gl-tree-view's :host(:focus-within) and inherited across the shadow boundary. It must be a
	   CSS-only signal because DOM focus routinely lands *inside* a row — clicking focuses the row's
	   inner button and Tab focuses its checkbox — so the container's own focus/blur can't be trusted,
	   but :focus-within still holds while focus is anywhere in the tree. Folders are never selection
	   members, so a folder cursor only hits the second selector; giving it the same colors means a
	   focused folder reads like a selected file — active while the tree (or a checkbox in it) has
	   focus, and keeping the inactive highlight when the tree loses focus. */
		:host([aria-selected='true']),
		:host([focused]:not([aria-selected='true'])) {
			color: color-mix(
				in srgb,
				var(--vscode-list-activeSelectionForeground) calc(var(--gl-tree-focus-within, 0) * 100%),
				var(--vscode-list-inactiveSelectionForeground)
			);
			background-color: color-mix(
				in srgb,
				var(--vscode-list-activeSelectionBackground) calc(var(--gl-tree-focus-within, 0) * 100%),
				var(--vscode-list-inactiveSelectionBackground)
			);
		}

		/* Focus outline on the cursor row; fades out with the var when focus leaves the tree. */
		:host([focused]) {
			z-index: 1;
			outline: var(--gl-border-width) solid
				color-mix(
					in srgb,
					var(--vscode-list-focusOutline) calc(var(--gl-tree-focus-within, 0) * 100%),
					transparent
				);
			outline-offset: -0.1rem;
		}

		/* A row that physically contains DOM focus (its button or checkbox) is unambiguously in the
	   focused tree — show a solid outline regardless of the var. */
		:host(:focus-within) {
			z-index: 1;
			outline: var(--gl-border-width) solid var(--vscode-list-focusOutline);
			outline-offset: -0.1rem;
		}

		.item {
			display: flex;
			flex: 1;
			flex-direction: row;
			gap: var(--gl-space-6);
			align-items: center;
			justify-content: flex-start;
			min-width: 0;
			padding: 0;
			font-family: inherit;
			font-size: inherit;
			color: inherit;
			text-decoration: none;
			appearance: none;
			cursor: pointer;
			outline: none;
			background: none;
			border: none;
		}

		.icon {
			display: inline-flex;
			flex: none;
			align-items: center;
			justify-content: center;
			width: var(--gl-icon-size, 1.6rem);
			height: 2.2rem;
			pointer-events: none;
		}

		slot[name='icon']::slotted(*) {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: var(--gl-icon-size, 1.6rem);
			height: 1.6rem;
			vertical-align: middle;
		}

		.node {
			display: inline-block;
			flex: none;
			width: var(--tree-connector-size);
			height: 2.2rem;
			line-height: 2.2rem;
			vertical-align: text-bottom;
			text-align: center;
			pointer-events: none;
		}

		.node:last-of-type {
			margin-right: 0.3rem;
		}

		.node--connector {
			position: relative;
		}

		.node--connector::before {
			position: absolute;
			top: 50%;
			left: 0.8rem;
			width: 0.1rem;
			height: 2.2rem;
			content: '';
			border-left: var(--gl-border-width) solid transparent;
			opacity: 0.4;
			transform: translate(-1px, -50%);
			transition: border-color var(--gl-duration-x-fast) linear;
		}

		@media (prefers-reduced-motion: reduce) {
			.node--connector::before {
				transition: none;
			}
		}

		:host-context([guides='always']) .node--connector::before,
		:host-context([guides='onHover']:focus-within) .node--connector::before,
		:host-context([guides='onHover'][focused]) .node--connector::before,
		:host-context([guides='onHover']:hover) .node--connector::before {
			border-color: var(--vscode-tree-indentGuidesStroke);
		}

		.branch {
			display: inline-block;
			height: 2.2rem;
			margin-right: var(--gl-space-6);
			line-height: 2.2rem;
			vertical-align: text-bottom;
		}

		.text {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			line-height: 1.8rem;
			text-align: left;
			white-space: nowrap;
		}

		.main {
			display: inline;
		}

		.description {
			display: inline;
			margin-left: 0.3rem;
			font-size: 0.9em;
			pointer-events: none;
			opacity: 0.7;
		}

		.actions {
			flex: none;
			margin-left: var(--gl-space-4);
			color: var(--vscode-icon-foreground);
			user-select: none;
		}

		:host(:focus-within) .actions,
		:host([focused]) .actions {
			color: var(--vscode-list-activeSelectionIconForeground);
		}

		:host(:not(:hover, :focus-within, [focused])) .actions {
			display: none;
		}

		/* Rows with no actions still render an empty action-nav; its margin would otherwise appear on
		   hover and shift the decorations. Keep it out of layout entirely when nothing is slotted. */
		:host(:not(:has([slot='actions']))) .actions {
			display: none;
		}

		/* Tooltip wrapper around the checkbox has display: block + line-height from the host,
	   which adds inline leading and pushes the checkbox 1px above the row. Center-fit it. */
		gl-tooltip:has(> .checkbox) {
			display: inline-flex;
			align-items: center;
			line-height: 0;
		}

		.checkbox {
			position: relative;
			display: inline-flex;
			width: 1.6rem;
			aspect-ratio: 1 / 1;
			margin-right: var(--gl-space-8);
			color: var(--vscode-checkbox-foreground);
			text-align: center;
			background: var(--vscode-checkbox-background);
			border: var(--gl-border-width) solid var(--vscode-checkbox-border);
			border-radius: var(--gl-radius-sm);
		}

		.checkbox:has(:checked),
		.checkbox:has(:indeterminate) {
			color: var(--vscode-checkbox-foreground);
			background-color: var(--vscode-checkbox-selectBackground);
			border-color: var(--vscode-checkbox-selectBorder);
		}

		.checkbox:has(:disabled) {
			opacity: 0.4;
		}

		/* Theme-aware keyboard focus ring — the appearance:none input would otherwise show the browser
	   default outline. Drawn on the wrapper so it frames the whole 1.6rem box; the input's own outline
	   stays off (see .checkbox__input). :focus-visible keeps it keyboard-only, matching VS Code. */
		.checkbox:has(.checkbox__input:focus-visible) {
			outline: var(--gl-border-width) solid var(--vscode-focusBorder);
			outline-offset: 0.1rem;
		}

		.checkbox__input {
			position: absolute;
			top: 0;
			left: 0;
			width: 1.4rem;
			aspect-ratio: 1 / 1;
			margin: 0;
			appearance: none;
			cursor: pointer;
			outline: none;
			border-radius: var(--gl-radius-sm);
		}

		.checkbox__input:disabled {
			cursor: default;
		}

		.checkbox__check,
		.checkbox__dash {
			position: absolute;
			top: 0;
			left: 0;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 1.6rem;
			aspect-ratio: 1 / 1;
			color: var(--vscode-checkbox-foreground);
			pointer-events: none;
			opacity: 0;
			transition: opacity var(--gl-duration-x-fast) linear;
		}

		.checkbox__input:checked + .checkbox__check {
			opacity: 1;
		}

		.checkbox__input:indeterminate ~ .checkbox__dash {
			opacity: 1;
		}

		slot[name='decorations-before'],
		slot[name='decorations-after'] {
			display: inline-flex;
			flex: none;
			gap: var(--gl-space-4);
			align-items: center;
			margin-left: var(--gl-space-4);
			white-space: nowrap;
			--gl-pill-border: color-mix(in srgb, transparent 80%, var(--color-foreground));
		}

		::slotted([slot='decorations-before'].decoration-text) {
			font-size: var(--gl-decoration-before-font-size, inherit);
			opacity: var(--gl-decoration-before-opacity, 1);
		}

		::slotted([slot='decorations-after'].decoration-text) {
			font-size: var(--gl-decoration-after-font-size, inherit);
			opacity: var(--gl-decoration-after-opacity, 1);
		}

		::slotted([slot^='decorations-'].decoration-text--added),
		::slotted([slot^='decorations-'].conflict-count--added) {
			color: var(--vscode-gitDecoration-addedResourceForeground);
		}

		::slotted([slot^='decorations-'].conflict-count--added) {
			border-color: color-mix(in srgb, transparent 60%, var(--vscode-gitDecoration-addedResourceForeground));
		}

		::slotted([slot^='decorations-'].decoration-text--deleted),
		::slotted([slot^='decorations-'].conflict-count--deleted) {
			color: var(--vscode-gitDecoration-deletedResourceForeground);
		}

		::slotted([slot^='decorations-'].conflict-count--deleted) {
			border-color: color-mix(in srgb, transparent 60%, var(--vscode-gitDecoration-deletedResourceForeground));
		}

		::slotted([slot^='decorations-'].decoration-text--modified),
		::slotted([slot^='decorations-'].conflict-count--modified) {
			color: var(--vscode-gitDecoration-modifiedResourceForeground);
		}

		::slotted([slot^='decorations-'].conflict-count--modified) {
			border-color: color-mix(in srgb, transparent 60%, var(--vscode-gitDecoration-modifiedResourceForeground));
		}

		::slotted([slot^='decorations-'].decoration-text--untracked) {
			color: var(--vscode-gitDecoration-untrackedResourceForeground);
		}

		::slotted([slot^='decorations-'].decoration-text--renamed) {
			color: var(--vscode-gitDecoration-renamedResourceForeground);
		}

		::slotted([slot^='decorations-'].decoration-text--conflict),
		::slotted([slot^='decorations-'].conflict-count--conflict) {
			color: var(--vscode-gitDecoration-conflictingResourceForeground);
		}

		::slotted([slot^='decorations-'].conflict-count--conflict) {
			border-color: color-mix(
				in srgb,
				transparent 60%,
				var(--vscode-gitDecoration-conflictingResourceForeground)
			);
		}

		::slotted([slot^='decorations-'].decoration-text--muted) {
			color: var(--vscode-descriptionForeground);
		}

		/* High Contrast Mode Support */
		@media (forced-colors: active) {
			:host {
				forced-color-adjust: none;
			}

			:host([focused]) {
				outline: 2px solid CanvasText;
				outline-offset: -2px;
			}

			:host([aria-selected='true']) {
				color: HighlightText;
				background-color: Highlight;
			}

			:host([aria-selected='true'][focused]) {
				outline: 2px solid CanvasText;
				outline-offset: -2px;
			}

			.checkbox {
				border: var(--gl-border-width) solid CanvasText;
			}

			.checkbox:has(:checked),
			.checkbox:has(:indeterminate) {
				background-color: Highlight;
				border-color: CanvasText;
			}

			.node--connector::before {
				border-color: CanvasText;
				opacity: 1;
			}

			slot[name='decorations-after'] span {
				color: CanvasText !important;
			}
		}
	`];var a4=Object.defineProperty,a7=Object.getOwnPropertyDescriptor,a6=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?a7(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&a4(t,i,s),s};let a8=class extends lit_element_i{firstUpdated(){this.role="navigation"}disconnectedCallback(){this._slotSubscriptionsDisposer?.(),super.disconnectedCallback?.()}render(){return tt`<slot @slotchange=${this.handleSlotChange}></slot>`}handleSlotChange(e){if(this._slotSubscriptionsDisposer?.(),this.actionNodes.length<1)return;let t=this.handleKeydown.bind(this),i=`${this.actionNodes.length}`,r=this.actionNodes.map((e,r)=>(e.setAttribute("aria-posinset",`${r+1}`),e.setAttribute("aria-setsize",i),e.setAttribute("tabindex",0===r?"0":"-1"),this.actionNodes.length>=2&&e.addEventListener("keydown",t,!1),{dispose:()=>{e?.removeEventListener("keydown",t,!1)}}));this._slotSubscriptionsDisposer=()=>{r?.forEach(({dispose:e})=>e())}}handleKeydown(e){if(!e.target||null==this.actionNodes)return;let t=e.target,i=parseInt(t.getAttribute("aria-posinset")??"0",10);if("ArrowLeft"!==e.key&&"ArrowRight"!==e.key||this.actionNodes.length<2)return;let r=null;if("ArrowLeft"===e.key){let e=1===i?this.actionNodes.length-1:i-2;r=this.actionNodes[e]}else if("ArrowRight"===e.key){let e=i===this.actionNodes.length?0:i;r=this.actionNodes[e]}null!=r&&r!==t&&(e.preventDefault(),e.stopPropagation(),t.setAttribute("tabindex","-1"),r.setAttribute("tabindex","0"),r.focus())}};a8.styles=tj`
		:host {
			display: flex;
			align-items: center;
			user-select: none;
		}
	`,a6([(u={flatten:!0},(e,t)=>{let{slot:i,selector:r}=u??{},o="slot"+(i?`[name=${i}]`:":not([name])");return t0(e,t,{get(){let e=this.renderRoot?.querySelector(o),t=e?.assignedElements(u)??[];return void 0===r?t:t.filter(e=>e.matches(r))}})})],a8.prototype,"actionNodes",2),a8=a6([tX("action-nav")],a8);var a9=Object.defineProperty,le=Object.getOwnPropertyDescriptor,lt=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?le(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&a9(t,i,s),s};let li=class extends GlElement{constructor(){super(...arguments),this.branch=!1,this.expanded=!0,this.path="",this.level=0,this.size=1,this.position=1,this.checkable=!1,this.checked=!1,this.controlledCheck=!1,this.controlledSelection=!1,this.disableCheck=!1,this._modifiers=new ModifierKeysController(this),this.showIcon=!0,this.draggableItem=!1,this.rich=!1,this.matched=!1,this.tabIndex=-1,this.selected=!1,this.focused=!1,this.onComponentClick=e=>{this.selectCore({dblClick:!1,altKey:e.altKey})},this.onDragStart=e=>{this.draggableItem&&!this.branch&&null!=e.dataTransfer&&(e.dataTransfer.setData("application/x-gitlens-file-path",this.path),e.dataTransfer.effectAllowed="move")},this._checkboxClickAlt=!1}get isHidden(){return!1===this.parentExpanded||!this.branch&&!this.expanded}connectedCallback(){super.connectedCallback?.(),this.addEventListener("click",this.onComponentClick),this.addEventListener("dragstart",this.onDragStart)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("click",this.onComponentClick),this.removeEventListener("dragstart",this.onDragStart)}onChevronClick(e){e.stopPropagation(),this.emit("gl-tree-item-toggle")}updateAttrs(e,t=!1){(e.has("expanded")||e.has("branch")||t)&&(this.branch?this.setAttribute("aria-expanded",this.expanded.toString()):this.removeAttribute("aria-expanded")),(e.has("parentExpanded")||t)&&this.setAttribute("aria-hidden",this.isHidden.toString()),(e.has("selected")||t)&&this.setAttribute("aria-selected",this.selected.toString()),(e.has("size")||t)&&this.setAttribute("aria-setsize",this.size.toString()),(e.has("position")||t)&&this.setAttribute("aria-posinset",this.position.toString()),(e.has("level")||t)&&this.setAttribute("aria-level",this.level.toString()),(e.has("draggableItem")||e.has("branch")||t)&&(this.draggable=this.draggableItem&&!this.branch)}firstUpdated(){this.role="treeitem"}updated(e){this.updateAttrs(e)}renderBranching(){let e=this.level-1;if(e<1&&!this.branch)return to;let t=[];if(e>0)for(let i=0;i<e;i++)t.push(tt`<span class="node node--connector"><code-icon name="blank"></code-icon></span>`);return this.branch&&t.push(tt`<code-icon
					class="branch"
					icon="${this.expanded?"chevron-down":"chevron-right"}"
					@click=${this.onChevronClick}
				></code-icon>`),t}renderCheckbox(){if(!this.checkable)return to;let e=tt`<span
			class="checkbox"
			@mouseenter=${this.onCheckboxMouseEnter}
			@mouseleave=${this.onCheckboxMouseLeave}
			><input
				class="checkbox__input"
				id="checkbox"
				type="checkbox"
				tabindex="-1"
				.checked=${!0===this.checked}
				.indeterminate=${"indeterminate"===this.checked}
				?disabled=${this.disableCheck}
				@change=${this.onCheckboxChange}
				@click=${this.onCheckboxClick} /><code-icon icon="check" size="14" class="checkbox__check"></code-icon
			><code-icon icon="dash" size="14" class="checkbox__dash"></code-icon
		></span>`,t=this.getEffectiveCheckboxTooltip();return t?tt`<gl-tooltip placement="right" content=${t}>${e}</gl-tooltip>`:e}getEffectiveCheckboxTooltip(){let e=this.checkableTooltip,t=this.checkableAltTooltip;return t?e?this._modifiers.altKey?t:`${e}
[${rM()}] ${t}`:t:e}renderActions(){return tt`<action-nav class="actions" part="actions"><slot name="actions"></slot></action-nav>`}renderBefore(){return tt`<slot name="decorations-before" class="decorations-before"></slot>`}renderAfter(){return tt`<slot name="decorations-after" class="decorations-after"></slot>`}render(){return tt`
			${this.renderBranching()}${this.renderCheckbox()}
			<button
				id="button"
				class="item"
				part="item"
				type="button"
				tabindex=${this.tabIndex}
				@click=${this.onButtonClick}
				@dblclick=${this.onButtonDblClick}
				@contextmenu=${this.onButtonContextMenu}
			>
				${r$(this.showIcon,()=>tt`<slot name="icon" class="icon"></slot>`)}
				<span class="text" part="text">
					<slot class="main" part="main"></slot>
					<slot name="description" class="description"></slot>
				</span>
			</button>
			${this.renderBefore()}${this.renderActions()}${this.renderAfter()}
		`}selectCore(e,t=!1){this.emit("gl-tree-item-select"),this.controlledSelection||(this.selected=!0),t||window.requestAnimationFrame(()=>{this.emit("gl-tree-item-selected",{node:this,dblClick:e?.dblClick??!1,altKey:e?.altKey??!1,ctrlKey:e?.ctrlKey??!1,metaKey:e?.metaKey??!1,shiftKey:e?.shiftKey??!1})})}select(){this.selectCore(void 0,!0)}deselect(){this.selected=!1}focus(){this.buttonEl.focus()}focusCheckbox(){let e=this.checkboxEl;return null!=e&&!e.disabled&&(e.focus(),!0)}onButtonClick(e){e.stopPropagation(),this.selectCore({dblClick:!1,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey,shiftKey:e.shiftKey})}onButtonDblClick(e){e.stopPropagation(),this.selectCore({dblClick:!0,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey})}onButtonContextMenu(e){e.preventDefault(),e.stopPropagation();let t=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey});this.dispatchEvent(t)}onCheckboxClick(e){e.stopPropagation(),this._checkboxClickAlt=e.altKey}onCheckboxChange(e){e.preventDefault(),e.stopPropagation();let t=e.target.checked,i=this._checkboxClickAlt||this._modifiers.altKey;"indeterminate"===this.checked&&i&&(t=!1,e.target.checked=!1),this._checkboxClickAlt=!1,this.controlledCheck?e.target.checked=!0===this.checked:this.checked=t,this.emit("gl-tree-item-checked",{node:this,checked:t})}onCheckboxMouseEnter(){this.emit("gl-tree-item-suspend-tooltip")}onCheckboxMouseLeave(){this.emit("gl-tree-item-resume-tooltip")}};li.styles=a3,lt([tY({type:Boolean})],li.prototype,"branch",2),lt([tY({type:Boolean})],li.prototype,"expanded",2),lt([tY({type:String})],li.prototype,"path",2),lt([tY({type:String,attribute:"parent-path"})],li.prototype,"parentPath",2),lt([tY({type:Boolean,attribute:"parent-expanded"})],li.prototype,"parentExpanded",2),lt([tY({type:Number})],li.prototype,"level",2),lt([tY({type:Number})],li.prototype,"size",2),lt([tY({type:Number})],li.prototype,"position",2),lt([tY({type:Boolean})],li.prototype,"checkable",2),lt([tY()],li.prototype,"checked",2),lt([tY({type:Boolean})],li.prototype,"controlledCheck",2),lt([tY({type:Boolean})],li.prototype,"controlledSelection",2),lt([tY({type:Boolean,reflect:!0,attribute:"disable-check"})],li.prototype,"disableCheck",2),lt([tY({attribute:"checkable-tooltip"})],li.prototype,"checkableTooltip",2),lt([tY({attribute:"checkable-alt-tooltip"})],li.prototype,"checkableAltTooltip",2),lt([tY({type:Boolean})],li.prototype,"showIcon",2),lt([tY({type:Boolean,attribute:"draggable-item"})],li.prototype,"draggableItem",2),lt([tY({type:Boolean,reflect:!0})],li.prototype,"rich",2),lt([tY({type:Boolean,reflect:!0})],li.prototype,"matched",2),lt([tY({type:Number})],li.prototype,"tabIndex",2),lt([tY({type:String,attribute:"data-vscode-context",reflect:!0})],li.prototype,"vscodeContext",2),lt([tJ()],li.prototype,"selected",2),lt([tY({type:Boolean,reflect:!0})],li.prototype,"focused",2),lt([t1("#button")],li.prototype,"buttonEl",2),lt([t1("#checkbox")],li.prototype,"checkboxEl",2),li=lt([tX("gl-tree-item")],li);var lr=Object.defineProperty,lo=Object.getOwnPropertyDescriptor,ls=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lo(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lr(t,i,s),s};let ln=/^[a-zA-Z0-9\s\-_.]$/,la=class extends GlElement{constructor(){super(...arguments),this.treeItems=void 0,this.filtered=!1,this.filterable=!1,this.filterPlaceholder="Filter...",this.searchBoxFilter=!0,this.dimUnmatched=!1,this.emptyText="No items",this.tooltipAnchorRight=!1,this._filter=new FilterController(this,{debounceMs:150,applyMatch:e=>{0===e.length?(this.filtered=!1,null!=this._model&&function e(t){for(let i of t)i.matched=!1,null!=i.children&&e(i.children)}(this._model)):(this.filtered=!0,null!=this._model&&lh(this._model,[...e]))},onApplied:()=>this.rebuildFlattenedTree()}),this.ariaLabel="Tree",this.virtualizerRef=sP(),this.scrollableRef=sP(),this._actionButtonHasFocus=!1,this._collection=new VirtualCollectionController(this,{getItems:()=>this.treeItems,getItemId:e=>ll(e),isSelectable:e=>!1===e.branch,mode:()=>this.multiSelectable?"multi":"single",focusStrategy:"activedescendant",getVirtualizer:()=>this.virtualizerRef.value,getContainer:()=>this.scrollableRef.value,onSelectionChange:()=>{this.requestUpdate(),this.multiSelectable&&this.emitSelectionChanged()},onActivate:e=>{let t=this._index.itemFor(e);null!=t&&this.handleItemActivation(t)},onUnhandledKey:e=>this.handleTreeKey(e)}),this._hoverOpen=!1,this._typeAheadBuffer="",this._typeAheadTimeout=800,this._nodeMap=new Map,this.multiSelectable=!1,this.draggableFiles=!1,this._virtualAnchorRect={x:0,y:0,top:0,bottom:0,left:0,right:0,width:0,height:0},this._virtualAnchor={getBoundingClientRect:()=>this._virtualAnchorRect},this.dismissRowTooltip=()=>{clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},this.handleContainerFocus=()=>{this._focusedItemPath||(this._lastSelectedPath?(this._focusedItemPath=this._lastSelectedPath,this._focusedItemIndex=this.getItemIndex(this._lastSelectedPath)):this.treeItems?.length&&(this._focusedItemPath=ll(this.treeItems[0]),this._focusedItemIndex=0),this.requestUpdate())},this.handleFocusIn=e=>{let t=e.target;("GL-ACTION-CHIP"===t.tagName?t:t.closest("gl-action-chip"))&&(this._actionButtonHasFocus=!0)},this.handleFocusOut=e=>{let t=e.target,i=e.relatedTarget,r="GL-ACTION-CHIP"===t.tagName?t:t.closest("gl-action-chip"),o=i?.tagName==="GL-ACTION-CHIP"?i:i?.closest("gl-action-chip");r&&!o&&(this._actionButtonHasFocus=!1)},this.handleKeydown=e=>{if("Tab"!==e.key)return;let t=e.composedPath(),i=t.some(e=>"GL-ACTION-CHIP"===e.tagName),r=t.some(e=>"INPUT"===e.tagName&&e.classList?.contains("checkbox__input"));if(!i&&!r)return;e.preventDefault(),e.stopPropagation();let o=t.find(e=>"GL-TREE-ITEM"===e.tagName);if(r){if(e.shiftKey)this.scrollableRef.value?.focus();else{let e=o?.querySelector("gl-action-chip");e?e.focus():this.exitTreeForward()}return}e.shiftKey?o?.focusCheckbox()||this.scrollableRef.value?.focus():this.exitTreeForward()},this.handleContainerKeydown=e=>{if(this.treeItems?.length&&!this._actionButtonHasFocus){if("Tab"===e.key&&!e.shiftKey){let t=this.getFocusedTreeItemElement();if(t){if(t.focusCheckbox()){e.preventDefault(),e.stopPropagation();return}let i=t.querySelector("gl-action-chip");i&&(e.preventDefault(),e.stopPropagation(),i.focus())}return}if("ArrowUp"===e.key&&this.filterable&&0>=this.getCurrentFocusedIndex()){let t=this.renderRoot.querySelector(".filter-input");if(null!=t){e.preventDefault(),e.stopPropagation(),t.focus(),t.select();return}}if(" "===e.key){if(e.composedPath().some(e=>"INPUT"===e.tagName&&e.classList?.contains("checkbox__input")))return;let t=this.treeItems[this.getCurrentFocusedIndex()];if(t?.branch){e.preventDefault(),e.stopPropagation(),this.handleItemActivation(t);return}}this._collection.handleKeydown(e)&&(e.preventDefault(),e.stopPropagation())}},this.handleFilterInput=e=>{let t=e.target.value;this.dispatchEvent(new CustomEvent("gl-tree-filter-changed",{detail:t,bubbles:!0,composed:!0})),this._filter.setQuery(t,{debounce:!0})},this.handleFilterFocus=()=>{!this._focusedItemPath&&this.treeItems?.length&&(this._focusedItemPath=ll(this.treeItems[0]),this._focusedItemIndex=0)},this.handleFilterKeydown=e=>{if(!this.treeItems?.length)return;let t=this.getCurrentFocusedIndex(),i=t,r=!1;switch(e.key){case"ArrowDown":i=t<0?0:Math.min(t+1,this.treeItems.length-1),r=!0;break;case"ArrowUp":i=t<=0?0:t-1,r=!0;break;case"Home":i=0,r=!0;break;case"End":i=this.treeItems.length-1,r=!0;break;case"Enter":{e.preventDefault(),e.stopPropagation();let i=this.treeItems[t]??this.treeItems[0];this.handleItemActivation(i);return}}r&&(e.preventDefault(),e.stopPropagation(),this.setActiveDescendant(i))},this.toggleSearchBoxFilter=()=>{this.searchBoxFilter=!this.searchBoxFilter,this.dispatchEvent(new CustomEvent("gl-tree-search-box-filter-changed",{detail:this.searchBoxFilter,bubbles:!0,composed:!0})),this.filtered&&this.rebuildFlattenedTree()}}get filterText(){return this._filter.query}set filterText(e){let t=this._filter.query;t!==e&&(this._filter.setQuery(e),this.requestUpdate("filterText",t))}get _lastSelectedPath(){return this._selection.anchorId}set _lastSelectedPath(e){this.multiSelectable||(null==e?this._selection.clear():this._selection.setSingle(e))}get _focusedItemPath(){return this._focus.focusedId}set _focusedItemPath(e){this._focus.setFocusedId(e)}get _focusedItemIndex(){return this._focus.focusedIndex}set _focusedItemIndex(e){this._focus.setFocusedIndex(e)}get _index(){return this._collection.index}get _scroll(){return this._collection.scroll}get _selection(){return this._collection.selection}get _focus(){return this._collection.focus}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.handleKeydown,{capture:!0}),this.addEventListener("focusin",this.handleFocusIn,{capture:!0}),this.addEventListener("focusout",this.handleFocusOut,{capture:!0}),this.addEventListener("mousedown",this.dismissRowTooltip,{capture:!0})}focus(e){if(this.filterable){let t=this.renderRoot.querySelector(".filter-input");if(null!=t)return void t.focus(e)}this.scrollableRef.value?.focus(e)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("keydown",this.handleKeydown,{capture:!0}),this.removeEventListener("focusin",this.handleFocusIn,{capture:!0}),this.removeEventListener("focusout",this.handleFocusOut,{capture:!0}),this.removeEventListener("mousedown",this.dismissRowTooltip,{capture:!0}),this._typeAheadTimer&&(clearTimeout(this._typeAheadTimer),this._typeAheadTimer=void 0),this._typeAheadBuffer=""}set model(e){let t;if(this._model!==e){if(this._model=e,this._filter.terms.length>0&&null!=this._model&&lh(this._model,[...this._filter.terms]),this._nodeMap.clear(),null!=this._model){let e=this._model.length,i=this.filtered&&this.searchBoxFilter&&!this.dimUnmatched;t=[];for(let r=0;r<e;r++)lc(this._model[r],e,r+1,void 0,this._nodeMap,i,t)}if(this.treeItems=t,this.buildPathToIndexMap(),this.focusedPath&&(this._focusedItemPath=this.focusedPath,this._lastSelectedPath=this.focusedPath),this._focusedItemPath){let e=this._index.indexOf(this._focusedItemPath);if(-1!==e)this._focusedItemIndex=e;else{if(this.treeItems?.length){let e=Math.min(this._focusedItemIndex,this.treeItems.length-1);this._focusedItemPath=ll(this.treeItems[Math.max(0,e)]),this._focusedItemIndex=Math.max(0,e)}else this._focusedItemPath=void 0,this._focusedItemIndex=-1;this._lastSelectedPath&&!this._index.has(this._lastSelectedPath)&&(this._lastSelectedPath=this._focusedItemPath)}}else this.treeItems?.length&&(this._focusedItemPath=ll(this.treeItems[0]),this._focusedItemIndex=0)}}get model(){return this._model}willUpdate(e){if((e.has("filtered")||e.has("searchBoxFilter")||e.has("dimUnmatched"))&&null!=this._model&&this.rebuildFlattenedTree(),this.focusedPath&&(e.has("focusedPath")||e.has("model"))){let e=this._index.indexOf(this.focusedPath);-1!==e&&(this._focusedItemPath=this.focusedPath,this._focusedItemIndex=e,this._lastSelectedPath=this.focusedPath,this._pendingScrollToIndex=e)}}updated(e){if(super.updated?.(e),null!=this._pendingScrollToIndex){let e=this._pendingScrollToIndex;this._pendingScrollToIndex=void 0,this.scrollToItem(e,!1)}if(e.has("treeItems")){let t=e.get("treeItems");!t?.length&&(this.treeItems?.length??0)>0&&this.kickVirtualizerAfterFirstLayout()}}async kickVirtualizerAfterFirstLayout(){let e=this.virtualizerRef.value;e&&(await e.layoutComplete,this.treeItems?.length&&(this.treeItems=this.treeItems.slice()))}renderIcon(e){if(null==e)return to;if("string"==typeof e)return tt`<code-icon slot="icon" icon=${e}></code-icon>`;if("status"===e.type)return tt`<gl-git-status slot="icon" .status=${e.name}></gl-git-status>`;if("branch"===e.type)return tt`<gl-branch-icon
				slot="icon"
				.status=${e.status}
				.worktree=${e.worktree??!1}
				.hasChanges=${e.hasChanges??!1}
			></gl-branch-icon>`;if("file-icon"===e.type)return tt`<gl-file-icon slot="icon" .filename=${e.filename}></gl-file-icon>`;if("agent"===e.type){let t="working"===e.phase?"sync":"waiting"===e.phase?"warning":"claude",i="working"===e.phase?"spin":void 0;return tt`<code-icon
				slot="icon"
				icon="${t}"
				modifier=${i??to}
				class="tree-icon-agent tree-icon-agent--${e.phase}"
			></code-icon>`}return to}renderActions(e){let t=e.actions;return null==t||0===t.length?to:t.map(t=>tt`<gl-action-chip
				slot="actions"
				.icon=${t.icon}
				.label=${t.label}
				.altIcon=${t.altIcon}
				.altLabel=${t.altLabel}
				@mouseenter=${()=>this.onSuspendRowTooltip()}
				@mouseleave=${()=>this.onResumeRowTooltip()}
				@click=${i=>this.onTreeItemActionClicked(i,e,t,!1)}
				@dblclick=${i=>this.onTreeItemActionClicked(i,e,t,!0)}
			></gl-action-chip>`)}renderDecorations(e){let t=e.decorations;return null==t||0===t.length?to:t.map(e=>{let t="before"===e.position?"decorations-before":"decorations-after";if("icon"===e.type)return tt`<code-icon
					slot=${t}
					part=${t}
					aria-label="${e.label}"
					.icon=${e.icon}
				></code-icon>`;if("text"===e.type){let i=`decoration-text${e.kind?` decoration-text--${e.kind}`:""}`;return tt`<span
					slot=${t}
					part=${t}
					class=${i}
					aria-label=${e.tooltip??e.label??to}
					>${e.label}</span
				>`}if("tracking"===e.type)return tt`<gl-tracking-pill
					slot=${t}
					part=${t}
					.ahead=${e.ahead}
					.behind=${e.behind}
					colorized
					outlined
					?missingUpstream=${e.missingUpstream??!1}
				></gl-tracking-pill>`;if("wip"===e.type)return tt`<gl-wip-stats
					slot=${t}
					part=${t}
					badge
					show-clean
					no-tooltip
					.dirty=${e.hasChanges}
					added=${e.added??to}
					modified=${e.changed??to}
					removed=${e.deleted??to}
				></gl-wip-stats>`;if("conflict"===e.type){let i=`conflict-count${e.kind?` conflict-count--${e.kind}`:""}`;return tt`<span
					slot=${t}
					part=${t}
					class=${i}
					aria-label=${e.tooltip??e.label??to}
					><code-icon icon="warning" size="12"></code-icon>${e.count}</span
				>`}if("agent"===e.type){let i=e.tooltip??e.label;return tt`<gl-tooltip slot=${t} part=${t} placement="top">
					<span class="tree-icon-agent-pair">
						<code-icon
							icon="robot"
							class="tree-icon-agent tree-icon-agent--${e.phase}"
							aria-label=${i??to}
						></code-icon>
						${"working"===e.phase?tt`<code-icon
									icon="sync"
									modifier="spin"
									class="tree-icon-agent tree-icon-agent--${e.phase}"
									aria-hidden="true"
								></code-icon>`:to}
					</span>
					<span slot="content">${i}</span>
				</gl-tooltip>`}})}highlightText(e){if(!this.filtered||0===this._filter.terms.length)return e;let t=e.toLowerCase(),i=new Set;for(let e of this._filter.terms){let r=t.indexOf(e);if(-1!==r){for(let t=r;t<r+e.length;t++)i.add(t);continue}let o=ld(t,e);if(null!=o)for(let e of o)i.add(e)}return 0===i.size?e:function(e,t){let i=[],r=0,o=0;for(;o<t.length;){let s=o;for(;s+1<t.length&&t[s+1]===t[s]+1;)s++;let n=t[o],a=t[s]+1;n>r&&i.push(e.substring(r,n)),i.push(tt`<mark>${e.substring(n,a)}</mark>`),r=a,o=s+1}return r<e.length&&i.push(e.substring(r)),i}(e,[...i].sort((e,t)=>e-t))}renderTreeItem(e){let t=ll(e),i=this.multiSelectable?this._selection.has(t):this._lastSelectedPath===t,r=this._focusedItemPath===t,o=`tree-item-${t}`;return tt`<gl-tree-item
			id=${o}
			.branch=${e.branch}
			.expanded=${e.expanded}
			.path=${e.path}
			.parentPath=${e.parentPath}
			.parentExpanded=${e.parentExpanded}
			.level=${e.level}
			.size=${e.size}
			.position=${e.position}
			.checkable=${e.checkable}
			.checked=${e.checked??!1}
			.controlledCheck=${e.controlledCheck??!1}
			.disableCheck=${e.disableCheck??!1}
			.checkableTooltip=${e.checkableTooltip}
			.checkableAltTooltip=${e.checkableAltTooltip}
			.showIcon=${null!=e.icon}
			.matched=${e.matched??!1}
			.selected=${i}
			.controlledSelection=${!0}
			.focused=${r}
			.tabIndex=${-1}
			.vscodeContext=${e.contextData}
			.draggableItem=${this.draggableFiles&&!e.branch}
			@gl-tree-item-select=${()=>this.onBeforeTreeItemSelected(e)}
			@gl-tree-item-selected=${t=>this.onTreeItemSelected(t,e)}
			@gl-tree-item-toggle=${()=>this.onTreeItemToggle(e)}
			@gl-tree-item-checked=${t=>this.onTreeItemChecked(t,e)}
			@mouseenter=${t=>this.onTreeItemHover(t,e)}
			@mouseleave=${()=>this.onTreeItemUnhover()}
			@gl-tree-item-suspend-tooltip=${()=>this.onSuspendRowTooltip()}
			@gl-tree-item-resume-tooltip=${()=>this.onResumeRowTooltip()}
		>
			${this.renderIcon(e.icon)}
			${this.highlightText(e.label)}${r$(null!=e.description,()=>tt`<span slot="description">${this.highlightText(e.description)}</span>`)}
			${this.renderActions(e)} ${this.renderDecorations(e)}
		</gl-tree-item>`}renderFilterBar(e){return this.filterable?tt`<div class="filter">
			<div class="filter-field">
				<input
					class="filter-input"
					type="search"
					role="combobox"
					aria-controls="tree-list"
					aria-expanded="true"
					aria-haspopup="tree"
					aria-autocomplete="list"
					aria-activedescendant=${e||to}
					placeholder="${this.searchBoxFilter?this.filterPlaceholder:this.searchPlaceholder??this.filterPlaceholder}"
					.value=${this._filter.query}
					@input=${this.handleFilterInput}
					@keydown=${this.handleFilterKeydown}
					@focus=${this.handleFilterFocus}
				/>
				<div class="filter-controls">
					<gl-button
						appearance="input"
						role="checkbox"
						aria-checked=${this.searchBoxFilter?"true":"false"}
						tooltip="Filter Results"
						aria-label="Filter Results"
						@click=${this.toggleSearchBoxFilter}
					>
						<code-icon icon="list-filter"></code-icon>
					</gl-button>
				</div>
			</div>
			<slot name="filter-actions"></slot>
		</div>`:to}render(){let e=!!this.treeItems?.length,t=!e&&this._filter.query&&this._model?.length,i=!e&&!t&&!!this.emptyText;if(!e&&!t&&!i)return to;let r=this._focusedItemPath?`tree-item-${this._focusedItemPath}`:void 0;return tt`
			${this.renderFilterBar(r)}
			${e?tt`<div
						${sT(this.scrollableRef)}
						id="tree-list"
						class="scrollable"
						tabindex="0"
						role="tree"
						aria-label=${this.ariaLabel}
						aria-multiselectable=${this.multiSelectable?"true":"false"}
						aria-activedescendant=${r||to}
						@keydown=${this.handleContainerKeydown}
						@focus=${this.handleContainerFocus}
					>
						<lit-virtualizer
							class="scrollable"
							${sT(this.virtualizerRef)}
							.items=${this.treeItems}
							.keyFunction=${e=>ll(e)}
							.layout=${(0,sI.flow)({direction:"vertical"})}
							.renderItem=${e=>this.renderTreeItem(e)}
							scroller
						></lit-virtualizer>
					</div>`:t?tt`<div class="no-results">No results found</div>`:tt`<div class="no-results">${this.emptyText}</div>`}
			${this._hoverOpen&&this._hoveredTooltip?tt`<gl-popover
						class="hover-popover"
						?open=${this._hoverOpen}
						.anchor=${this._hoveredAnchor}
						placement="right-start"
						trigger="manual"
						.distance=${12}
					>
						<div slot="content" class="hover-content">
							${"string"==typeof this._hoveredTooltip?tt`<gl-markdown density="compact" .markdown=${this._hoveredTooltip}></gl-markdown>`:this._hoveredTooltip}
						</div>
					</gl-popover>`:to}
		`}findTreeNode(e){return this._nodeMap.get(e)}getItemIndex(e){return this._index.indexOf(e)}rebuildFlattenedTree(){if(!this._model)return;this._nodeMap.clear();let e=this.filtered&&this.searchBoxFilter&&!this.dimUnmatched,t=this._model.length,i=[];for(let r=0;r<t;r++)lc(this._model[r],t,r+1,void 0,this._nodeMap,e,i);if(this.treeItems=i,this.buildPathToIndexMap(),this._focusedItemPath){let e=this._index.indexOf(this._focusedItemPath);-1!==e?this._focusedItemIndex=e:this.treeItems?.length?(this._focusedItemPath=ll(this.treeItems[0]),this._focusedItemIndex=0):(this._focusedItemPath=void 0,this._focusedItemIndex=-1)}}onBeforeTreeItemSelected(e){let t=ll(e);this._lastSelectedPath!==t&&(this._lastSelectedPath=t),this._focusedItemPath!==t&&(this._focusedItemPath=t,this._focusedItemIndex=this.getItemIndex(t)),this.toggleNodeExpansion(e),this.requestUpdate()}toggleNodeExpansion(e){if(!e.branch)return!1;let t=ll(e),i=this.findTreeNode(t);return null!=i&&(i.expanded=!i.expanded,this.rebuildFlattenedTree(),this.emit("gl-tree-expansion-changed",{path:e.path,key:t,expanded:i.expanded}),!0)}onTreeItemToggle(e){let t=ll(e);this._focusedItemPath!==t&&(this._focusedItemPath=t,this._focusedItemIndex=this.getItemIndex(t)),this.toggleNodeExpansion(e),this.requestUpdate()}onTreeItemSelected(e,t){if(e.stopPropagation(),this.multiSelectable)if(t.branch)e.detail.shiftKey||e.detail.ctrlKey||e.detail.metaKey||this._selection.clear();else{let i=ll(t),r=e.detail;if(r.shiftKey)return void this._selection.selectRange(i,{additive:r.ctrlKey||r.metaKey});if(r.ctrlKey||r.metaKey)return void this._selection.toggle(i);this._selection.setSingle(i)}this.emit("gl-tree-generated-item-selected",{...e.detail,node:t,context:t.context})}emitSelectionChanged(){let e=this._selection.selectedIds,t=[],i=[],r=[];for(let o of this.treeItems??[])e.has(ll(o))&&(t.push(o.path),i.push(o),r.push(o.context));let o=this._selection.anchorId;this.emit("gl-tree-generated-selection-changed",{nodes:i,paths:t,contexts:r,lastPath:null!=o?this.findTreeNode(o)?.path:void 0})}pruneSelection(){this.multiSelectable&&this._selection.pruneTo(e=>this._index.has(e))}onTreeItemChecked(e,t){e.stopPropagation(),this.emit("gl-tree-generated-item-checked",{...e.detail,node:t,context:t.context})}onTreeItemHover(e,t){if(!t.tooltip)return void this.onTreeItemUnhover();let i=e.currentTarget;clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer);let r=i.getBoundingClientRect(),o=this.tooltipAnchorRight?this.getBoundingClientRect().right:e.clientX,s=this._virtualAnchorRect;(s.x=s.left=s.right=o,s.y=s.top=r.top,s.bottom=r.bottom,s.height=r.height,this._hoveredAnchor=this._virtualAnchor,this._hoveredTooltip=t.tooltip,this._hoverOpen)?this._repositionHoverPopover():this._hoverTimer=setTimeout(()=>{this._hoverOpen=!0},500)}async _repositionHoverPopover(){await this.updateComplete;let e=this.renderRoot?.querySelector("gl-popover.hover-popover"),t=e?.shadowRoot?.querySelector("wa-popup");t?.reposition?.()}onTreeItemUnhover(){clearTimeout(this._hoverTimer),this._unhoverTimer=setTimeout(()=>{this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},100)}onSuspendRowTooltip(){clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1}onResumeRowTooltip(){null!=this._hoveredTooltip&&null!=this._hoveredAnchor&&(this._hoverOpen=!0)}onTreeItemActionClicked(e,t,i,r=!1){e.stopPropagation(),this.emit("gl-tree-generated-item-action-clicked",{node:t,context:t.context,action:i,dblClick:r,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey})}getFocusedTreeItemElement(){if(!this._focusedItemPath)return;let e=this.virtualizerRef.value;if(e)return[...e.querySelectorAll("gl-tree-item")].find(e=>e.id===`tree-item-${this._focusedItemPath}`)}exitTreeForward(){let e=document.activeElement;setTimeout(()=>e?.blur?.(),0)}getCurrentFocusedIndex(){if(!this.treeItems?.length)return -1;if(this._focusedItemPath){let e=this.getItemIndex(this._focusedItemPath);if(-1!==e)return e}if(this._focusedItemIndex>=0&&this._focusedItemIndex<this.treeItems.length)return this._focusedItemIndex;if(this._lastSelectedPath){let e=this.getItemIndex(this._lastSelectedPath);if(-1!==e)return e}return 0}handleTreeKey(e){let t=this.treeItems;if(null==t||0===t.length)return!1;if("ArrowLeft"===e.key||"ArrowRight"===e.key){let i,r=this.getCurrentFocusedIndex(),o=t[r];if(null==o)return!1;if(this.handleBranchToggle(e,o))return!0;if("ArrowRight"===e.key)i=Math.min(r+1,t.length-1);else if(o.parentPath){let e=this.getItemIndex(o.parentPath);i=-1!==e?e:Math.max(r-1,0)}else i=Math.max(r-1,0);if(this.focusItemAtIndex(i),this.multiSelectable){let r=t[i];if(null!=r&&!r.branch){let t=ll(r);e.shiftKey?this._selection.selectRange(t):e.ctrlKey||e.metaKey||this._selection.setSingle(t)}}return!0}return!!(!e.ctrlKey&&!e.metaKey&&!e.altKey&&this.isPrintableCharacter(e.key))&&(this.handleTypeAhead(e.key),!0)}handleItemActivation(e){e&&(this.onBeforeTreeItemSelected(e),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),e))}handleBranchToggle(e,t){if(!t?.branch)return!1;let i="ArrowRight"===e.key,r="ArrowLeft"===e.key;return(!i||!t.expanded)&&(!r||!!t.expanded)&&(e.preventDefault(),e.stopPropagation(),!!this.toggleNodeExpansion(t)&&(this.requestUpdate(),!0))}focusItemAtIndex(e){let t=this.treeItems?.[e];if(!t)return;let i=ll(t);this._focusedItemPath=i,this._focusedItemIndex=e,this._lastSelectedPath!==i&&(this._lastSelectedPath=i),this.requestUpdate(),this.scrollToItem(e)}scrollToItem(e,t=!0){this._scroll.scrollToIndex(e,{restoreFocus:t})}handleTypeAhead(e){this._typeAheadTimer&&clearTimeout(this._typeAheadTimer);let t=!this._typeAheadBuffer;this._typeAheadBuffer+=e.toLowerCase();let i=this.treeItems?.[this._focusedItemIndex],r=i?.label?.toLowerCase().startsWith(this._typeAheadBuffer),o=!1;if(t?o=!0:r||(o=!0),o){let e=this.findNextMatchingItem(this._typeAheadBuffer);-1!==e&&this.focusItemAtIndex(e)}this._typeAheadTimer=window.setTimeout(()=>{this._typeAheadBuffer="",this._typeAheadTimer=void 0},this._typeAheadTimeout)}buildPathToIndexMap(){this._index.rebuild(),this.pruneSelection()}findNextMatchingItem(e){if(!this.treeItems?.length||!e)return -1;let t=e.toLowerCase(),i=this._focusedItemIndex,r=this.treeItems.length;for(let e=1;e<r;e++){let o=(i+e)%r;if(this.treeItems[o].label?.toLowerCase().startsWith(t))return o}return -1}isPrintableCharacter(e){return 1===e.length&&ln.test(e)}setActiveDescendant(e){let t=this.treeItems?.[e];if(!t)return;let i=ll(t);this._focusedItemPath=i,this._focusedItemIndex=e,this._lastSelectedPath!==i&&(this._lastSelectedPath=i),this.requestUpdate(),this.scrollToItem(e,!1)}};function ll(e){return e.key??e.path}function lc(e,t,i,r,o,s,n){if(s&&!1===e.matched)return n??[];let a=n??[];if(o?.set(ll(e),e),a.push({...e,size:t,position:i,parentPath:r}),!1!==e.expanded&&null!=e.children&&e.children.length>0){let t=e.children.length;for(let i=0;i<t;i++)lc(e.children[i],t,i+1,ll(e),o,s,a)}return a}function lh(e,t){let i=!1;for(let r of e){let e=(r.label??"").toLowerCase(),o=r.filterText?.toLowerCase(),s=r.description?.toLowerCase(),n=t.every(t=>o?.includes(t)||e.includes(t)||null!=ld(e,t)||s?.includes(t)),a=!1;null!=r.children&&r.children.length>0&&(a=lh(r.children,t)),r.matched=n||a,r.matched&&(i=!0),r.branch&&a&&(r.expanded=!0)}return i}function ld(e,t){let i=[],r=0;for(let o=0;o<e.length&&r<t.length;o++)e[o]===t[r]&&(i.push(o),r++);return r===t.length?i:void 0}la.styles=[rH,tj`
			:host {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}

			/* Signals "the tree has focus" to descendant gl-tree-item rows (inherits across the shadow
	   boundary). Drives the active-vs-inactive selection background on every selected row —
	   reliable for click-focus, which doesn't surface as a focusin on this host. */
			:host(:focus-within) {
				--gl-tree-focus-within: 1;
			}

			.scrollable {
				flex: 1;
				width: 100%;
				min-height: 0;
				overflow: visible auto; /* Allow horizontal overflow for tooltips */
				outline: none;
			}

			.scrollable:focus-within {
				outline: none;
			}

			lit-virtualizer {
				display: block;
				width: 100%;
				height: 100%;

				/* lit-virtualizer sets an inline min-height based on its initial item-size
		   estimate, which can exceed the scrollable container in small viewports and
		   push scrolling onto the outer .scrollable div instead of the virtualizer's
		   own scroller. Since height: 100% already provides correct sizing from the
		   flex layout, the min-height is always redundant. */
				min-height: 0 !important;

				/* Use layout containment instead of strict to avoid rendering issues */

				/* Removed paint containment to allow tooltips to escape */
				contain: layout;
			}

			gl-tree-item {
				width: 100%;
			}

			/* Dim non-matched items when highlighting: either the search box is in highlight mode
	   (search-box-filter absent) or an external source forces dim (dim-unmatched). */
			:host([filtered]:not([search-box-filter])) gl-tree-item:not([matched]),
			:host([filtered][dim-unmatched]) gl-tree-item:not([matched]) {
				opacity: 0.6;
			}

			.filter {
				display: flex;
				flex: none;
				gap: var(--gl-space-4);
				align-items: center;
				padding: var(--gl-space-4) var(--gl-space-6);
			}

			.filter-field {
				position: relative;
				flex: 1;
				min-width: 0;
			}

			.filter-input {
				box-sizing: border-box;
				width: 100%;
				height: 2.4rem;
				padding: 0 var(--gl-space-20) 0 var(--gl-space-6);
				font-family: var(--vscode-font-family);
				font-size: var(--vscode-font-size);
				color: var(--vscode-input-foreground);
				outline: none;
				background-color: var(--vscode-input-background);
				border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
				border-radius: var(--gl-input-border-radius);
			}

			.filter-input:focus {
				outline: var(--gl-border-width) solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.filter-input::placeholder {
				color: var(--vscode-input-placeholderForeground);
			}

			.filter-input::-webkit-search-cancel-button {
				width: 16px;
				height: 16px;
				-webkit-appearance: none;
				cursor: pointer;
				background-color: var(--vscode-foreground);
				-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z'/%3E%3C/svg%3E");
				-webkit-mask-size: contain;
			}

			.filter-controls {
				position: absolute;
				top: 1px;
				right: 0;
				bottom: 1px;
				display: inline-flex;
				gap: 0.1rem;
				align-items: center;
				padding-right: var(--gl-space-2);
			}

			.filter-controls gl-button {
				--button-line-height: 1;
				--button-input-height: 2rem;
			}

			mark {
				color: inherit;
				background-color: var(--vscode-editor-findMatchHighlightBackground, rgb(234 92 0 / 33%));
				border-radius: 1px;
			}

			/* Shared by both the no-data case (emptyText) and the filter-yields-no-matches
	   case ("No results found"); class name dates from the latter. */
			.no-results {
				padding: var(--gl-space-10);
				font-style: italic;
				color: var(--vscode-descriptionForeground);
				text-align: center;
			}

			.hover-popover {
				pointer-events: none;
				--max-width: min(40rem, 90vw);
			}

			.hover-popover::part(body) {
				box-sizing: border-box;
			}

			.hover-content {
				font-size: var(--gl-font-md);
				line-height: 1.5;

				/* anywhere wraps at any character when forced — avoids the default behavior of
		   breaking paths at hyphens (the worst possible split point). */
				overflow-wrap: anywhere;
			}

			.conflict-count {
				display: inline-flex;
				gap: 0.3rem;
				align-items: center;
				height: 1.8rem;
				padding: 0 var(--gl-space-6);
				font-size: var(--gl-font-sm);
				font-weight: 500;
				border: var(--gl-border-width) solid;
				border-radius: 0.9rem;
			}

			/* Phase-tinted agent icon — pulls from the shared --gl-agent-* palette defined in
	   theme.scss so leaf, tooltip, pill, and details panel all dereference the same set
	   of variables. code-icon's :host inherits color from its parent, so styling the
	   element here flows through to its rendered glyph. */
			code-icon.tree-icon-agent {
				color: var(--gl-agent-idle-color);
			}

			code-icon.tree-icon-agent--working {
				color: var(--gl-agent-working-color);
			}

			code-icon.tree-icon-agent--waiting {
				color: var(--gl-agent-waiting-color);
			}

			/* Pair wrapper for the robot + spinner glyphs so they sit flush as one identity
	   marker. The decoration slot's gap applies between the wrapper and any sibling
	   decoration but not between the icons inside. */
			.tree-icon-agent-pair {
				display: inline-flex;
				gap: 0;
				align-items: center;
			}
		`],ls([tJ()],la.prototype,"treeItems",2),ls([tY({reflect:!0})],la.prototype,"guides",2),ls([tY({type:Boolean,reflect:!0})],la.prototype,"filtered",2),ls([tY({type:Boolean,reflect:!0})],la.prototype,"filterable",2),ls([tY({type:String,attribute:"filter-placeholder"})],la.prototype,"filterPlaceholder",2),ls([tY({type:String,attribute:"search-placeholder"})],la.prototype,"searchPlaceholder",2),ls([tY({type:Boolean,attribute:"search-box-filter",reflect:!0})],la.prototype,"searchBoxFilter",2),ls([tY({type:Boolean,attribute:"dim-unmatched",reflect:!0})],la.prototype,"dimUnmatched",2),ls([tY({type:String,attribute:"empty-text"})],la.prototype,"emptyText",2),ls([tY({type:Boolean,attribute:"tooltip-anchor-right"})],la.prototype,"tooltipAnchorRight",2),ls([tY({type:String,attribute:"filter-text"})],la.prototype,"filterText",1),ls([tY({type:String,attribute:"aria-label"})],la.prototype,"ariaLabel",2),ls([tY({type:String,attribute:"focused-path"})],la.prototype,"focusedPath",2),ls([tJ()],la.prototype,"_actionButtonHasFocus",2),ls([tJ()],la.prototype,"_hoveredTooltip",2),ls([tJ()],la.prototype,"_hoveredAnchor",2),ls([tJ()],la.prototype,"_hoverOpen",2),ls([tY({type:Boolean,attribute:"multi-selectable"})],la.prototype,"multiSelectable",2),ls([tY({type:Boolean,attribute:"draggable-files"})],la.prototype,"draggableFiles",2),ls([tY({type:Array,attribute:!1})],la.prototype,"model",1),la=ls([tX("gl-tree-view")],la);var lp=Object.defineProperty,lu=Object.getOwnPropertyDescriptor,lg=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lu(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lp(t,i,s),s};let lf=class extends lit_element_i{constructor(){super(...arguments),this.lines=1}render(){return tt`<div class="skeleton" style=${ns({"--skeleton-lines":String(this.lines)})}></div>`}};lf.styles=tj`
		:host {
			--skeleton-line-height: 1.2;
			--skeleton-lines: 1;
		}

		.skeleton {
			position: relative;
			display: block;
			width: 100%;
			height: calc(1em * var(--skeleton-line-height, 1.2) * var(--skeleton-lines, 1));
			overflow: hidden;
			background-color: var(--color-background--lighten-15);
			border-radius: 0.25em;
		}

		.skeleton::before {
			position: absolute;
			inset: 0;
			display: block;
			content: '';
			background-image: linear-gradient(
				to right,
				transparent 0%,
				var(--color-background--lighten-15) 20%,
				var(--color-background--lighten-30) 60%,
				transparent 100%
			);
			transform: translateX(-100%);
			animation: skeleton-loader 2s var(--gl-ease-in-out) infinite;
		}

		@keyframes skeleton-loader {
			100% {
				transform: translateX(100%);
			}
		}
	`,lg([tY({type:Number})],lf.prototype,"lines",2),lf=lg([tX("skeleton-loader")],lf);let GlTreeBase=class GlTreeBase extends GlElement{renderLoading(){return tt`
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
		`}renderLayoutAction(e){if(!e)return to;let t="tree",i="list-tree",r="View as Tree";switch(e){case"auto":t="list",i="gl-list-auto",r="View as List";break;case"list":t="tree",i="list-flat",r="View as Tree";break;case"tree":t="auto",i="list-tree",r="View as Auto"}return tt`<gl-action-chip data-switch-value="${t}" label="${r}" icon="${i}"></gl-action-chip>`}renderTreeView(e,t="none",i){return tt`<gl-tree-view
			.model=${e}
			.guides=${t}
			empty-text=${i??to}
			@gl-tree-generated-item-action-clicked=${this.onTreeItemActionClicked}
			@gl-tree-generated-item-checked=${this.onTreeItemChecked}
			@gl-tree-generated-item-selected=${this.onTreeItemSelected}
		></gl-tree-view>`}renderFiles(e,t=!1,i=!1,r=2){let o=[];if(t){let t=e[0]?.repoPath,s=rP(e,e=>e.path.split("/"),(...e)=>e.join("/"),i);if(null!=s.children)for(let e of s.children.values()){let i=this.walkFileTree(e,{level:r},t);o.push(i)}}else for(let t of e){let e=this.fileToTreeModel(t,{level:r,branch:!1},!0);o.push(e)}return o}walkFileTree(e,t={level:1},i){let r;if(void 0===t.level&&(t.level=1),null==e.value?(r=this.folderToTreeModel(e.name,e.relativePath,t),i&&(r.tooltip=(0,rT.join)(i,e.relativePath))):r=this.fileToTreeModel(e.value,t),null!=e.children){let o=[];for(let r of e.children.values()){let e=this.walkFileTree(r,{...t,level:t.level+1},i);o.push(e)}o.length>0&&(r.branch=!0,r.children=o)}return r}folderToTreeModel(e,t,i){return{branch:!1,expanded:!0,path:t,level:1,checkable:!1,checked:!1,icon:"folder",label:e,tooltip:t,...i}}getRepoActions(e,t,i){return[]}emptyTreeModel(e,t){return{branch:!1,expanded:!0,path:"",level:1,checkable:!0,checked:!0,icon:void 0,label:e,...t}}repoToTreeModel(e,t,i,r){return{branch:!1,expanded:!0,path:t,level:1,checkable:!0,checked:!0,icon:"gl-repository",label:e,description:r,context:[t],actions:this.getRepoActions(e,t,i),...i}}getFileActions(e,t){return[]}fileToTreeModel(e,t,i=!1,r="/"){let o,s,n,a=e.path.lastIndexOf(r),c=-1!==a?e.path.substring(a+1):e.path,h=i&&-1!==a?e.path.substring(0,a):"";return{branch:!1,expanded:!0,path:e.path,level:1,checkable:!1,checked:!1,icon:"file",label:c,description:!0===i?h:void 0,tooltip:(o=function(e){switch(e){case"A":return{letter:"A",tooltip:"Added",kind:"added"};case"?":return{letter:"U",tooltip:"Untracked",kind:"untracked"};case"M":return{letter:"M",tooltip:"Modified",kind:"modified"};case"D":return{letter:"D",tooltip:"Deleted",kind:"deleted"};case"R":return{letter:"R",tooltip:"Renamed",kind:"renamed"};case"C":return{letter:"C",tooltip:"Copied",kind:"renamed"};case"T":return{letter:"T",tooltip:"Type Changed",kind:"modified"};case"U":case"AA":case"AU":case"UA":case"DD":case"DU":case"UD":case"UU":return{letter:"!",tooltip:"Conflict",kind:"conflict"};default:return}}(e.status)?.tooltip,s=e.repoPath?(0,rT.join)(e.repoPath,e.path):e.path,n=[`${s}${null!=e.submodule?" (submodule)":""}`],o&&n.push(o),"R"===e.status&&e.originalPath&&n.push(`\u2190 ${e.originalPath}`),n.join(`
`)),context:[e],actions:this.getFileActions(e,t),decorations:[{type:"text",label:e.status}],...t}}};var lm=Object.defineProperty,lb=Object.getOwnPropertyDescriptor,l_=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lb(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lm(t,i,s),s};let lv=class extends lit_element_i{render(){return this.name?tt`<gl-tooltip .content=${this.name}>${this.renderAvatar()}</gl-tooltip>`:this.renderAvatar()}renderAvatar(){return this.href?tt`<a href=${this.href} class="avatar" part="avatar">${this.renderContent()}</a>`:tt`<span class="avatar" part="avatar">${this.renderContent()}</span>`}renderContent(){return this.src?tt`<img class="thumb thumb--media" src="${this.src}" alt="${this.name}" />`:tt`<slot class="thumb thumb--text"></slot>`}};lv.styles=[tj`
			:host {
				display: inline-block;
				vertical-align: middle;
			}

			.avatar {
				display: inline-flex;
				justify-content: center;
				width: var(--gl-avatar-size, 1.6rem);
				aspect-ratio: 1;
				vertical-align: middle;
				border-radius: 100%;
			}

			.thumb {
				border-radius: 50%;
			}

			.thumb--text {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: clamp(0.8rem, calc(var(--gl-avatar-size, 1.6rem) * 0.5), 1.1rem);
				line-height: 1;
				color: var(--gl-avatar-text-color, var(--vscode-descriptionForeground));
				text-transform: uppercase;
				cursor: default;
			}

			.thumb--media {
				display: block;
				width: 100%;
				height: auto;
				object-fit: cover;
				object-position: 50% 50%;
			}

			.avatar:hover {
				transform: scale(1.2);
			}
		`],l_([tY()],lv.prototype,"src",2),l_([tY()],lv.prototype,"name",2),l_([tY()],lv.prototype,"href",2),lv=l_([tX("gl-avatar")],lv);let ly=tj`
	.badge {
		display: inline-flex;
		padding: 0 0.8rem 0.1rem;
		font-size: var(--gl-badge-font-size, x-small);
		font-weight: 600;
		font-variant: all-small-caps;
		color: var(--gl-badge-color, var(--color-foreground--50));
		white-space: nowrap;
		border: currentcolor 1px solid;
		border-radius: 1rem;
	}

	:host([appearance='filled']) .badge {
		justify-content: center;
		min-width: 1.6rem;
		padding: var(--gl-space-2) var(--gl-space-4);
		font-weight: 500;
		line-height: 1;
		color: var(--vscode-badge-foreground);
		background-color: var(--vscode-badge-background);
		border: none;
		border-radius: var(--gl-radius-sm);
	}

	:host([appearance='warning']) .badge {
		justify-content: center;
		min-width: 1.6rem;
		padding: var(--gl-space-2) var(--gl-space-4);
		font-weight: 500;
		line-height: 1;
		color: var(--vscode-button-foreground, #fff);
		background-color: var(--vscode-gitDecoration-conflictingResourceForeground);
		border: none;
		border-radius: var(--gl-radius-sm);
	}

	/* Recessed sub-segment meant to nest INSIDE a filled badge (e.g. "+N Mixed" inside
	 * "x of y Staged"). Translucent foreground tint reads as a chip carved into the accent fill,
	 * while text keeps the badge foreground so it stays legible across themes. */
	:host([appearance='muted']) .badge {
		justify-content: center;
		padding: 0.1rem 0.4rem;
		font-weight: 500;
		line-height: 1;
		color: var(--vscode-badge-foreground);
		background-color: color-mix(in srgb, var(--vscode-badge-foreground) 20%, transparent);
		border: none;
		border-radius: var(--gl-radius-sm);
	}

	/* "Experimental" stamp used by features still gated behind a config flag (e.g. Agent Kanban,
	 * Visualizations treemap). Uses the editor-warning tone with color-mix so the badge reads as
	 * a heads-up without overwhelming the surrounding chrome. */
	:host([appearance='experimental']) {
		display: inline-flex;
	}

	:host([appearance='experimental']) .badge {
		align-items: center;
		justify-content: center;
		padding: 0.1rem 0.6rem;
		font-weight: 600;
		font-variant: normal;
		color: var(--vscode-editorWarning-foreground, var(--color-foreground--65));
		letter-spacing: 0.06em;
		background-color: color-mix(in srgb, var(--vscode-editorWarning-foreground, currentColor) 12%, transparent);
		border: var(--gl-border-width) solid
			color-mix(in srgb, var(--vscode-editorWarning-foreground, currentColor) 60%, transparent);
		border-radius: var(--gl-radius-sm);
	}
`;var lw=Object.defineProperty,lk=Object.getOwnPropertyDescriptor,lx=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lk(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lw(t,i,s),s};let lC=class extends lit_element_i{render(){return tt`<slot class="badge" part="base"></slot>`}};lC.styles=[ly],lx([tY({reflect:!0})],lC.prototype,"appearance",2),lC=lx([tX("gl-badge")],lC);var l$=Object.defineProperty,lE=Object.getOwnPropertyDescriptor,lS=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lE(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&l$(t,i,s),s};let lA=class extends lit_element_i{constructor(){super(...arguments),this.editor=!1,this.layout="shift",this.grouping="gap"}render(){return tt`<div class="group"><slot></slot></div>`}};lA.styles=[rV,tj`
			:host {
				--button-group-gap: 0.4rem;
				--button-max-width: 30rem;
				--button-group-max-width: 30rem;

				display: block;
				max-width: var(--button-max-width, 30rem);
				margin-inline: auto;
				text-align: left;
				transition: max-width var(--gl-duration-medium) var(--gl-ease-out);
			}

			:host([grouping='gap-wide']) {
				--button-group-gap: 1rem;
			}

			:host([grouping='split']) {
				--button-group-gap: 0.1rem;
			}

			@media (width >= 640px) {
				:host([layout='shift']) {
					--button-max-width: 100%;
				}
			}

			:host([layout='full']) {
				--button-max-width: 100%;
				--button-group-max-width: 100%;
			}

			.group {
				display: inline-flex;
				gap: var(--button-group-gap, 0.4rem);
				width: 100%;
				max-width: var(--button-group-max-width, 30rem);
			}

			:host([grouping='split']) ::slotted(*:not(:first-child)) {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}

			:host([grouping='split']) ::slotted(*:not(:last-child)) {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		`],lS([tY({type:Boolean})],lA.prototype,"editor",2),lS([tY({reflect:!0})],lA.prototype,"layout",2),lS([tY({reflect:!0})],lA.prototype,"grouping",2),lA=lS([tX("button-container")],lA);var lI=Object.defineProperty,lP=Object.getOwnPropertyDescriptor,lz=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lP(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lI(t,i,s),s};let lT=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.role="option",this.onKeydown=e=>{this.disabled||e.target!==this||("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.click())}}updateInteractiveState(){this.tabIndex=this.disabled?-1:"option"===this.role?0:-1}updated(e){(e.has("disabled")||e.has("role"))&&this.updateInteractiveState()}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}render(){return this.href?tt`<a href=${this.href}><slot></slot></a>`:tt`<slot></slot>`}};lT.styles=[rV,tj`
			:host {
				display: block;
				height: auto;
				padding: 0 var(--gl-space-6);
				font-family: inherit;
				line-height: 2.2rem;
				color: var(--vscode-menu-foreground);
				text-align: left;
				cursor: pointer;
				background-color: var(--vscode-menu-background);
				border: none;
				border-radius: var(--menu-item-radius, var(--gl-radius-sm));
				-webkit-font-smoothing: auto;
			}

			:host([role='option']:hover:not([aria-selected='true'])),
			:host([role='option']:focus-visible:not([aria-selected='true'])) {
				color: var(--vscode-menu-selectionForeground);
				outline: none;
				background-color: color-mix(
					in oklch,
					var(--vscode-menu-selectionBackground) 50%,
					var(--vscode-menu-background)
				);
			}

			:host([disabled]) {
				pointer-events: none;
				cursor: default;
				opacity: 0.5;
			}

			:host([aria-selected='true']) {
				color: var(--vscode-menu-selectionForeground);
				background-color: var(--vscode-menu-selectionBackground);
				opacity: 1;
			}

			:host([href]) {
				padding-inline: 0;
			}

			a {
				display: block;
				padding: 0 var(--gl-space-6);
				color: inherit;
				text-decoration: none;
			}
		`],lz([tY({type:Boolean,reflect:!0})],lT.prototype,"disabled",2),lz([tY({reflect:!0})],lT.prototype,"href",2),lz([tY({reflect:!0})],lT.prototype,"role",2),lT=lz([tX("menu-item")],lT);var lj=Object.defineProperty,lR=Object.getOwnPropertyDescriptor;let lO=class extends lit_element_i{firstUpdated(e){this.role="listbox"}render(){return tt`<slot></slot>`}};lO.styles=[rV,tj`
			:host {
				width: max-content;
				padding-bottom: var(--gl-space-6);
				background-color: var(--vscode-menu-background);
				border: var(--gl-border-width) solid var(--vscode-menu-border);
			}
		`],lO=((e,t,i,r)=>{for(var o,s=r>1?void 0:r?lR(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lj(t,i,s),s})([tX("menu-list")],lO);var lM=Object.defineProperty,lL=Object.getOwnPropertyDescriptor,lD=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lL(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lM(t,i,s),s};let lB=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.minVisible=0,this.position="bottom",this._shownAt=0}willUpdate(e){if(e.has("active")){if(this.active)null!=this._hideTimer&&(clearTimeout(this._hideTimer),this._hideTimer=void 0),this._shownAt=performance.now(),this.toggleAttribute("visible",!0);else if(this.hasAttribute("visible")){let e=this.minVisible-(performance.now()-this._shownAt);e>0?this._hideTimer=setTimeout(()=>{this._hideTimer=void 0,this.toggleAttribute("visible",!1)},e):this.toggleAttribute("visible",!1)}}}firstUpdated(){this.setAttribute("role","progressbar")}disconnectedCallback(){super.disconnectedCallback?.(),null!=this._hideTimer&&(clearTimeout(this._hideTimer),this._hideTimer=void 0,this.toggleAttribute("visible",!1))}render(){return tt`<div class="progress-bar"></div>`}};lB.styles=tj`
		* {
			box-sizing: border-box;
		}

		:host {
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: var(--gl-z-raised);
			width: 100%;
			height: 2px;
			overflow: hidden;
		}

		:host([position='top']) {
			top: 0;
			bottom: auto;
		}

		.progress-bar {
			position: absolute;
			left: 0;
			display: none;
			width: 2%;
			height: 2px;
			background-color: var(--vscode-progressBar-background);
		}

		:host([visible]) .progress-bar {
			display: inherit;
		}

		:host([mode='discrete']) .progress-bar {
			left: 0;
			transition: width var(--gl-duration-x-fast) linear;
		}

		:host([mode='discrete done']) .progress-bar {
			width: 100%;
		}

		:host([mode='infinite']) .progress-bar {
			transform: translateZ(0);
			animation-name: progress;
			animation-duration: 4s;
			animation-timing-function: steps(100);
			animation-iteration-count: infinite;
		}

		@keyframes progress {
			0% {
				transform: translateX(0) scaleX(1);
			}

			50% {
				transform: translateX(2500%) scaleX(3);
			}

			100% {
				transform: translateX(4900%) scaleX(1);
			}
		}
	`,lD([tY({reflect:!0})],lB.prototype,"mode",2),lD([tY({type:Boolean})],lB.prototype,"active",2),lD([tY({type:Number,attribute:"min-visible"})],lB.prototype,"minVisible",2),lD([tY()],lB.prototype,"position",2),lB=lD([tX("progress-indicator")],lB);var lF=Object.defineProperty,lN=Object.getOwnPropertyDescriptor,lU=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lN(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lF(t,i,s),s};let lq=class extends lit_element_i{constructor(){super(...arguments),this.collapsable=!1,this.expanded=!1,this.loading=!1}renderTitle(){return this.collapsable?tt`<button
			type="button"
			class="label"
			aria-controls="content"
			aria-expanded=${this.expanded}
			@click="${this.toggleExpanded}"
		>
			<code-icon class="icon" icon=${this.expanded?"chevron-down":"chevron-right"}></code-icon
			><span class="title"><slot name="title">Section</slot></span>
			<span class="subtitle"><slot name="subtitle"></slot></span>
		</button>`:tt`<div class="label">
				<span class="title"><slot name="title">Section</slot></span>
				<span class="subtitle"><slot name="subtitle"></slot></span>
			</div>`}render(){return tt`
			<header class="header" part="header">
				${this.renderTitle()}
				<slot name="actions"></slot>
				<progress-indicator ?active="${this.loading}"></progress-indicator>
			</header>
			<div id="content" role="region" part="content" class="content scrollable">
				<slot></slot>
			</div>
		`}toggleExpanded(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("expanded-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}};lq.styles=[rH,tj`
			:host {
				display: flex;
				flex-direction: column;

				/* background-color: var(--vscode-sideBar-background); */
				min-height: 23px;
			}

			* {
				box-sizing: border-box;
			}

			.header {
				position: relative;
				display: flex;
				flex: none;
				color: var(--vscode-sideBarSectionHeader-foreground, var(--vscode-foreground));
				background-color: var(--vscode-sideBarSectionHeader-background);
				border-top: var(--gl-border-width) solid var(--vscode-sideBarSectionHeader-border);
			}

			:host([collapsable]) .header:focus-within {
				outline: var(--gl-border-width) solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.label {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 100%;
				height: 2.2rem;
				padding: 0;
				text-overflow: ellipsis;
				font-family: var(--font-family);
				font-size: var(--gl-font-sm);
				line-height: 2.2rem;
				color: inherit;
				text-align: left;
				appearance: none;
				user-select: none;
				outline: none;
				background: transparent;
				border: none;
			}

			:host([collapsable]) .label {
				cursor: pointer;
			}

			.title {
				flex: 1;
				width: 0;
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				font-weight: bold;
				text-transform: uppercase;
				white-space: nowrap;
			}

			:host(:not([collapsable])) .title {
				margin-left: var(--gl-space-8);
			}

			.subtitle {
				margin-left: var(--gl-space-10);
			}

			.subtitle::slotted(*) {
				opacity: 0.6;
			}

			.icon {
				margin: 0 var(--gl-space-2);
				font-weight: normal;
			}

			.content {
				display: flex;
				flex: 1;
				flex-direction: column;
				min-height: 0;

				/*
	scrollbar-gutter: stable;
	box-shadow: #000000 0 0.6rem 0.6rem -0.6rem inset;
	*/
				padding-top: var(--gl-space-6);
				overflow: auto;
			}

			:host([collapsable]:not([expanded])) .content,
			:host([collapsable][expanded='false']) .content {
				display: none;
			}

			slot[name='actions']::slotted(*) {
				flex: none;
				margin-left: auto;
			}
		`],lU([tY({type:Boolean,reflect:!0})],lq.prototype,"collapsable",2),lU([tY({type:Boolean,reflect:!0})],lq.prototype,"expanded",2),lU([tY({type:Boolean,reflect:!0})],lq.prototype,"loading",2),lq=lU([tX("webview-pane")],lq);var lV=Object.defineProperty,lH=Object.getOwnPropertyDescriptor,lK=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lH(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lV(t,i,s),s};let lW=class extends GlTreeBase{constructor(){super(...arguments),this.explainBusy=!1,this.selectedPatches=[],this._copiedLink=!1}get cloudDraft(){if(this.state.draft?.draftType==="cloud")return this.state.draft}get isCodeSuggestion(){return this.cloudDraft?.type==="suggested_pr_change"}get canSubmit(){return this.selectedPatches.length>0}updated(e){if(e.has("explain")&&(this.explainBusy=!1,this.querySelector('[data-region="ai-explanation"]')?.scrollIntoView()),e.has("state")){let e=this.state?.draft?.patches;if(e?.length)for(let t of(this.selectedPatches=e.map(e=>e.id),e)){let e=this.selectedPatches.indexOf(t.id);t.repository.located?-1===e&&this.selectedPatches.push(t.id):e>-1&&this.selectedPatches.splice(e,1)}else this.selectedPatches=[]}}renderEmptyContent(){return tt`
			<div class="section section--empty" id="empty">
				<button-container>
					<gl-button full href="command:gitlens.openPatch">Open Patch...</gl-button>
				</button-container>
			</div>
		`}renderPatchMessage(){if(this.state?.draft?.title==null)return;let e=this.cloudDraft?.description;if(null!=e)return e=e.trim(),tt`
			<div class="message-block">
				<p class="message-block__text scrollable" data-region="message">
					<span>${rI(e)}</span>
				</p>
			</div>
		`}renderExplainAi(){if(this.state?.orgSettings.ai===!1||this.state?.preferences.aiEnabled===!1)return;let e=this.explain?.result!=null?`${this.explain.result.summary}

${this.explain.result.body}`:void 0;return tt`
			<webview-pane collapsable data-region="explain-pane">
				<span slot="title">Explain (AI)</span>
				<action-nav slot="actions">
					<gl-action-chip
						data-action="switch-ai"
						label="Switch AI Provider/Model"
						icon="arrow-swap"
					></gl-action-chip>
				</action-nav>

				<div class="section">
					<p>Let AI assist in understanding the changes made with this patch.</p>
					<p class="button-container">
						<span class="button-group button-group--single">
							<gl-button
								full
								class="button--busy"
								data-action="ai-explain"
								aria-busy="${(this.explainBusy?"true":void 0)??to}"
								@click=${this.onExplainChanges}
								@keydown=${this.onExplainChanges}
								><code-icon icon="loading" modifier="spin" slot="prefix"></code-icon>Explain
								Changes</gl-button
							>
						</span>
					</p>
					${e?tt`<div class="ai-content" data-region="commit-explanation">
								<gl-markdown
									class="ai-content__summary scrollable"
									markdown="${e}"
								></gl-markdown>
							</div>`:this.explain?.error?tt`<div class="ai-content has-error" data-region="commit-explanation">
									<p class="ai-content__summary scrollable">
										${this.explain.error.message??"Error retrieving content"}
									</p>
								</div>`:void 0}
				</div>
			</webview-pane>
		`}renderChangedFiles(){let e=this.state?.preferences?.files?.layout??"auto";return tt`
			<webview-pane collapsable expanded>
				<span slot="title">Files changed </span>
				<!-- <span slot="subtitle" data-region="stats">\${this.renderCommitStats()}</span> -->
				<action-nav slot="actions">${this.renderLayoutAction(e)}</action-nav>

				${r$(null!=this.validityMessage,()=>tt`<div class="section">
							<div class="alert alert--error">
								<code-icon icon="error"></code-icon>
								<p class="alert__content">${this.validityMessage}</p>
							</div>
						</div>`)}
				<div class="change-list" data-region="files">
					${r$(this.state?.draft?.patches==null,()=>this.renderLoading(),()=>this.renderTreeView(this.treeModel,this.state?.preferences?.indentGuides,"No files"))}
				</div>
			</webview-pane>
		`}get treeModel(){if(this.state?.draft?.patches==null)return[];let{draft:{patches:e}}=this.state,t=this.state?.preferences?.files?.layout??"auto",i=!1,r=rz(e,e=>e?.files?.length??0);return i="auto"===t?r>(this.state.preferences?.files?.threshold??5):"tree"===t,e?.map(e=>this.draftPatchToTreeModel(e,i,this.state.preferences?.files?.compact,{checkable:!0,checked:this.selectedPatches.includes(e.id)}))}renderUserSelection(e,t){if("delete"===e.change)return;let i=e.pendingRole??e.user.role,r=new Map([["owner","owner"],["admin","admin"],["editor","can edit"],["viewer","can view"],["remove","un-invite"]]),o=r.get(i);return tt`
			<div class="user-selection">
				<div class="user-selection__avatar">
					<gl-avatar .src=${e.avatarUrl}></gl-avatar>
				</div>
				<div class="user-selection__info">
					<div class="user-selection__name">
						${e.member?.name??e.member?.username??"Unknown"}
					</div>
				</div>
				<div class="user-selection__actions">
					${r$("owner"!==i&&("owner"===t||"admin"===t),()=>tt`
							<gl-popover trigger="click" appearance="menu" ?arrow=${!1}>
								<gl-button slot="anchor"
									>${o} <code-icon icon="chevron-down"></code-icon
								></gl-button>
								<menu-list slot="content">
									${rE(r,([t,r])=>"owner"===t?void 0:tt`<menu-item
													@click=${i=>this.onChangeSelectionRole(i,e,t)}
												>
													<code-icon
														icon="check"
														class="user-selection__check ${i===t?"is-active":""}"
													></code-icon>
													${r}
												</menu-item>`)}
								</menu-list>
							</gl-popover>
						`,()=>tt`${o}`)}
				</div>
			</div>
		`}renderUserSelectionList(e,t=!1){if(!e.userSelections?.length)return;let i=e.userSelections;return!1===t&&(i=i.filter(e=>e.user?.role!=="owner")),tt`
			<div class="message-input">
				<div class="user-selection-container scrollable">
					${rA(i,e=>e.member?.id??e.user?.id,t=>this.renderUserSelection(t,e.role))}
				</div>
			</div>
		`}renderPatchPermissions(){let e=this.cloudDraft;if(null!=e){if("admin"===e.role||"owner"===e.role){let t,i=e.userSelections?.some(e=>void 0!==e.change);switch(e.visibility){case"private":t="organization";break;case"invite_only":t="lock";break;default:t="globe"}return tt`
				${r$(!0!==this.isCodeSuggestion,()=>tt` <div class="message-input message-input--group">
							<div class="message-input__select">
								<span class="message-input__select-icon"
									><code-icon icon=${t}></code-icon
								></span>
								<select
									id="visibility"
									class="message-input__control"
									@change=${this.onVisibilityChange}
								>
									<option value="public" ?selected=${"public"===e.visibility}>
										Anyone with the link
									</option>
									<option value="private" ?selected=${"private"===e.visibility}>
										Members of my Org with the link
									</option>
									<option value="invite_only" ?selected=${"invite_only"===e.visibility}>
										Collaborators only
									</option>
								</select>
								<span class="message-input__select-caret"
									><code-icon icon="chevron-down"></code-icon
								></span>
							</div>
							<gl-button appearance="secondary" @click=${this.onInviteUsers}
								><code-icon icon="person-add" slot="prefix"></code-icon> Invite</gl-button
							>
						</div>`)}
				${this.renderUserSelectionList(e)}
				${r$(i,()=>tt`
						<p class="button-container">
							<span class="button-group button-group--single">
								<gl-button appearance="secondary" full @click=${this.onUpdatePatch}
									>Update Patch</gl-button
								>
							</span>
						</p>
					`)}
			`}return tt`
			${r$(!0!==this.isCodeSuggestion,()=>tt` <div class="message-input">
						<div class="message-input__control message-input__control--text">
							${r$("public"===e.visibility,()=>tt`<code-icon icon="globe"></code-icon> Anyone with the link`)}
							${r$("private"===e.visibility,()=>tt`<code-icon icon="organization"></code-icon> Members of my Org with the link`)}
							${r$("invite_only"===e.visibility,()=>tt`<code-icon icon="lock"></code-icon> Collaborators only`)}
						</div>
					</div>`)}
			${this.renderUserSelectionList(e,!0)}
		`}}renderCodeSuggectionActions(){if(this.isCodeSuggestion&&null!=this.cloudDraft&&!this.cloudDraft.isArchived&&"viewer"!==this.cloudDraft.role)return tt`
			<p class="button-container">
				<span class="button-group button-group--single">
					<gl-button appearance="secondary" full @click=${()=>this.onArchiveDraft("accepted")}
						>Accept</gl-button
					>
					<gl-button appearance="secondary" full @click=${()=>this.onArchiveDraft("rejected")}
						>Reject</gl-button
					>
				</span>
			</p>
		`}renderPatches(){return tt`
			<div class="section section--action">
				${this.renderPatchPermissions()}
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button full @click=${this.onApplyPatch}>Apply Patch</gl-button>
						<gl-popover placement="top" trigger="click" appearance="menu" ?arrow=${!1}>
							<gl-button
								slot="anchor"
								density="compact"
								aria-label="Apply Patch Options..."
								title="Apply Patch Options..."
								><code-icon icon="chevron-down"></code-icon
							></gl-button>
							<menu-list slot="content" class="mine-menu">
								<menu-item data-value="branch" @click=${this.onSelectApplyOption}
									>Apply to a Branch</menu-item
								>
								<!-- <menu-item data-value="worktree">Apply to new worktree</menu-item> -->
							</menu-list>
						</gl-popover>
					</span>
				</p>
				${this.renderCodeSuggectionActions()}
			</div>
		`}renderActionbar(){let e=this.state?.draft;if(null!=e)return"local"===e.draftType?tt`
				<div class="top-details__actionbar">
					<div class="top-details__actionbar-group"></div>
					<div class="top-details__actionbar-group">
						<a
							class="commit-action"
							href="#"
							aria-label="Share Patch"
							title="Share Patch"
							@click=${this.onShareLocalPatch}
							>Share</a
						>
					</div>
				</div>
			`:tt`
			<div class="top-details__actionbar">
				<div class="top-details__actionbar-group"></div>
				<div class="top-details__actionbar-group">
					<a class="commit-action" href="#" @click=${this.onCopyCloudLink}>
						<code-icon icon="${this._copiedLink?"check":"link"}"></code-icon>
						<span class="top-details__sha">Copy Link</span></a
					>
					${r$(this.cloudDraft?.gkDevLink!=null,()=>tt`
							<a class="commit-action" href=${this.cloudDraft.gkDevLink} title="Open on gitkraken.dev">
								<code-icon icon="globe"></code-icon>
							</a>
						`)}
				</div>
			</div>
		`}renderDraftInfo(){let e;if(this.state.draft?.title==null)return to;if(this.cloudDraft?.isArchived){let t=this.cloudDraft.archivedReason??"archived";e=tt`<gl-badge class="title__badge">${t}</gl-badge>`}return tt`
			<h1 class="title">${this.state.draft?.title} ${e}</h1>
			${this.renderPatchMessage()}
		`}render(){return this.state?.draft==null?tt` <div class="commit-detail-panel scrollable">${this.renderEmptyContent()}</div>`:tt`
			<div class="pane-groups">
				<div class="pane-groups__group-fixed">
					<div class="section">${this.renderActionbar()}${this.renderDraftInfo()}</div>
				</div>
				<div class="pane-groups__group">${this.renderChangedFiles()}</div>
				<div class="pane-groups__group-fixed pane-groups__group--bottom">
					${this.renderExplainAi()}${this.renderPatches()}
				</div>
			</div>
		`}createRenderRoot(){return this}onInviteUsers(e){this.emit("gl-patch-details-invite-users")}onChangeSelectionRole(e,t,i){this.emit("gl-patch-details-update-selection",{selection:t,role:i});let r=e.target?.closest("gl-popover");r?.hide()}onVisibilityChange(e){let t=this.state.draft;t.visibility=e.target.value,this.emit("gl-patch-details-update-metadata",{visibility:t.visibility})}onUpdatePatch(e){this.emit("gl-patch-details-update-permissions")}onExplainChanges(e){if(!0===this.explainBusy||e instanceof KeyboardEvent&&"Enter"!==e.key){e.preventDefault(),e.stopPropagation();return}this.explainBusy=!0}onTreeItemActionClicked(e){if(e.detail.context&&e.detail.action)switch(e.detail.action.action){case"apply-patch":this.onApplyPatch();break;case"change-patch-base":this.onChangePatchBase();break;case"show-patch-in-graph":this.onShowInGraph();break;case"file-open":this.onOpenFile(e);break;case"file-compare-working":this.onCompareWorking(e)}}fireFileEvent(e,t,i){let r=new CustomEvent(e,{detail:{...t,showOptions:i}});this.dispatchEvent(r)}onCompareWorking(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-compare-working",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onOpenFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-open",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onTreeItemChecked(e){if(!e.detail.context)return;let[t]=e.detail.context,i=this.state.draft?.patches?.find(e=>e.gkRepositoryId===t);if(!i)return;let r=this.selectedPatches.indexOf(i?.id);e.detail.checked?-1===r&&(this.selectedPatches.push(i.id),this.validityMessage=void 0):r>-1&&this.selectedPatches.splice(r,1);let o=new CustomEvent("gl-patch-checked",{detail:{patch:i,checked:e.detail.checked}});this.dispatchEvent(o)}onTreeItemSelected(e){let{node:t,context:i}=e.detail;if(!0===t.branch||null==i)return;let[r]=i;this.emit("gl-patch-file-compare-previous",{...r})}onApplyPatch(e,t="current"){if(!1===this.canSubmit){this.validityMessage="Please select changes to apply";return}this.validityMessage=void 0,this.emit("gl-patch-apply-patch",{draft:this.state.draft,target:t,selectedPatches:this.selectedPatches})}onArchiveDraft(e){this.emit("gl-draft-archive",{reason:e})}onSelectApplyOption(e){if(!1===this.canSubmit){this.validityMessage="Please select changes to apply";return}let t=e.target?.closest("menu-item");t?.dataset?.value!=null&&this.onApplyPatch(void 0,t.dataset.value)}onChangePatchBase(e){let t=new CustomEvent("change-patch-base",{detail:{draft:this.state.draft}});this.dispatchEvent(t)}onSelectPatchRepo(e){let t=new CustomEvent("select-patch-repo",{detail:{draft:this.state.draft}});this.dispatchEvent(t)}onShowInGraph(e){this.emit("gl-patch-details-graph-show-patch",{draft:this.state.draft})}onCopyCloudLink(){this.emit("gl-patch-details-copy-cloud-link",{draft:this.state.draft}),this._copiedLink=!0,setTimeout(()=>this._copiedLink=!1,1e3)}onShareLocalPatch(){this.emit("gl-patch-details-share-local-patch",{draft:this.state.draft})}draftPatchToTreeModel(e,t=!1,i=!0,r){let o=this.repoToTreeModel(e.repository.name,e.gkRepositoryId,r,e.repository.located?void 0:"missing");if(!e.files?.length)return o;let s=[];if(t){let t=rP(e.files,e=>e.path.split("/"),(...e)=>e.join("/"),i);if(null!=t.children)for(let e of t.children.values()){let t=this.walkFileTree(e,{level:2});s.push(t)}}else for(let t of e.files){let e=this.fileToTreeModel(t,{level:2,branch:!1},!0);s.push(e)}return s.length>0&&(o.branch=!0,o.children=s),o}getFileActions(e,t){return[{icon:"go-to-file",label:"Open file",action:"file-open"},{icon:"git-compare",label:"Open Changes with Working File",action:"file-compare-working"}]}};lK([tY({type:Object})],lW.prototype,"state",2),lK([tJ()],lW.prototype,"explainBusy",2),lK([tY({type:Object})],lW.prototype,"explain",2),lK([tJ()],lW.prototype,"selectedPatches",2),lK([tJ()],lW.prototype,"validityMessage",2),lK([tJ()],lW.prototype,"_copiedLink",2),lW=lK([tX("gl-draft-details")],lW),Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]),Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let lG="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",lZ=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${lG}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${lG}`,graph:`https://gitkraken.com/solutions/commit-graph?${lG}`,launchpad:`https://gitkraken.com/solutions/launchpad?${lG}`,platform:`https://gitkraken.com/devex?${lG}`,pricing:`https://gitkraken.com/gitlens/pricing?${lG}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${lG}`,security:`https://help.gitkraken.com/gitlens/security?${lG}`,workspaces:`https://gitkraken.com/solutions/workspaces?${lG}`,kepler:`https://www.gitkraken.com/kepler?${lG}`,cli:`https://gitkraken.com/cli?${lG}`,browserExtension:`https://gitkraken.com/browser-extension?${lG}`,desktop:`https://gitkraken.com/git-client?${lG}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${lG}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${lG}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lG}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${lG}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${lG}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${lG}`,helpCenterAiHooks:`https://help.gitkraken.com/cli/cli-home/?${lG}#how-to-uninstall-gitkraken-cli-ai-hooks`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lG}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${lG}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${lG}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lG}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lG}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${lG}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${lG}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${lG}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${lG}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${lG}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${lG}`});var lX=Object.defineProperty,lQ=Object.getOwnPropertyDescriptor,lY=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lQ(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lX(t,i,s),s};let lJ=class extends GlTreeBase{constructor(){super(...arguments),this.review=!1,this.generateBusy=!1,this.creationBusy=!1,this.onDebounceTitleInput=w(this.onTitleInput,500),this.onDebounceDescriptionInput=w(this.onDescriptionInput,500)}get create(){return this.state.create}get createChanges(){return Object.values(this.create.changes)}get createEntries(){return Object.entries(this.create.changes)}get hasWipChanges(){return this.createChanges.some(e=>e?.type==="wip")}get selectedChanges(){return 1===this.createChanges.length?this.createEntries:this.createEntries.filter(([,e])=>!1!==e.checked)}get canSubmit(){return null!=this.create.title&&this.create.title.length>0&&this.selectedChanges.length>0}get fileLayout(){return this.state?.preferences?.files?.layout??"auto"}get isCompact(){return this.state?.preferences?.files?.compact??!0}get filesModified(){return rz(this.createChanges,e=>e.files?.length??0)}get draftVisibility(){return this.state?.create?.visibility??"public"}updated(e){e.has("state")&&(this.creationBusy=!1),e.has("generate")&&(this.generateBusy=!1,this.generateAiButton.scrollIntoView())}firstUpdated(){window.requestAnimationFrame(()=>{this.titleInput.focus()})}renderUserSelection(e){let t=e.pendingRole,i=new Map([["admin","admin"],["editor","can edit"],["viewer","can view"],["remove","un-invite"]]),r=i.get(t);return tt`
			<div class="user-selection">
				<div class="user-selection__avatar">
					<gl-avatar .src=${e.avatarUrl}></gl-avatar>
				</div>
				<div class="user-selection__info">
					<div class="user-selection__name">
						${e.member.name??e.member.username??"Unknown"}
					</div>
				</div>
				<div class="user-selection__actions">
					<gl-popover trigger="click" appearance="menu" ?arrow=${!1}>
						<gl-button slot="anchor">${r} <code-icon icon="chevron-down"></code-icon></gl-button>
						<menu-list slot="content">
							${rE(i,([i,r])=>tt`<menu-item
										@click=${t=>this.onChangeSelectionRole(t,e,i)}
									>
										<code-icon
											icon="check"
											class="user-selection__check ${t===i?"is-active":""}"
										></code-icon>
										${r}
									</menu-item>`)}
						</menu-list>
					</gl-popover>
				</div>
			</div>
		`}renderUserSelectionList(){if(this.state?.create?.userSelections!=null&&this.state?.create?.userSelections.length!==0)return tt`
			<div class="message-input">
				<div class="user-selection-container scrollable">
					${rA(this.state.create.userSelections,e=>e.member.id,e=>this.renderUserSelection(e))}
				</div>
			</div>
		`}renderForm(){let e;switch(this.draftVisibility){case"private":e="organization";break;case"invite_only":e="lock";break;default:e="globe"}let t=this.review?"Code Suggestion":"Cloud Patch",i=this.review?"Code Suggestions":"Cloud Patches";return tt`
			<div class="section section--action">
				${r$(this.state?.create?.creationError!=null,()=>tt` <div class="alert alert--error">
							<code-icon icon="error"></code-icon>
							<p class="alert__content">${this.state.create.creationError}</p>
						</div>`)}
				${r$(!1===this.review,()=>tt`
						<div class="message-input message-input--group">
							<div class="message-input__select">
								<span class="message-input__select-icon"
									><code-icon icon=${e}></code-icon
								></span>
								<select
									id="visibility"
									class="message-input__control"
									@change=${this.onVisibilityChange}
								>
									<option value="public" ?selected=${"public"===this.draftVisibility}>
										Anyone with the link
									</option>
									<option value="private" ?selected=${"private"===this.draftVisibility}>
										Members of my Org with the link
									</option>
									<option value="invite_only" ?selected=${"invite_only"===this.draftVisibility}>
										Collaborators only
									</option>
								</select>
								<span class="message-input__select-caret"
									><code-icon icon="chevron-down"></code-icon
								></span>
							</div>
							<gl-button appearance="secondary" @click=${this.onInviteUsers}
								><code-icon icon="person-add" slot="prefix"></code-icon> Invite</gl-button
							>
						</div>
						${this.renderUserSelectionList()}
					`)}
				<div class="message-input message-input--with-menu">
					<input
						id="title"
						type="text"
						class="message-input__control"
						placeholder="Title (required)"
						maxlength="100"
						.value=${this.create.title??""}
						?disabled=${this.generateBusy}
						@input=${e=>this.onDebounceTitleInput(e)}
					/>
					${r$(this.state?.orgSettings.ai===!0&&this.state?.preferences.aiEnabled===!0,()=>tt`<div class="message-input__menu">
								<gl-button
									id="generate-ai"
									appearance="toolbar"
									density="compact"
									tooltip="Generate Title and Description..."
									@click=${e=>this.onGenerateTitleClick(e)}
									?disabled=${this.generateBusy}
									><code-icon
										icon=${this.generateBusy?"loading":"sparkle"}
										modifier="${this.generateBusy?"spin":""}"
									></code-icon
								></gl-button>
							</div>`)}
				</div>

				${r$(this.generate?.error!=null,()=>tt`
						<div class="alert alert--error">
							<code-icon icon="error"></code-icon>
							<p class="alert__content">${this.generate.error.message??"Error retrieving content"}</p>
						</div>
					`)}
				<div class="message-input">
					<textarea
						id="desc"
						class="message-input__control"
						placeholder="Description (optional)"
						maxlength="10000"
						.value=${this.create.description??""}
						?disabled=${this.generateBusy}
						@input=${e=>this.onDebounceDescriptionInput(e)}
					></textarea>
				</div>
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button ?disabled=${this.creationBusy} full @click=${e=>this.onCreateAll(e)}
							>Create ${t}</gl-button
						>
					</span>
				</p>
				${r$(!0===this.review,()=>tt`
						<p class="button-container">
							<span class="button-group button-group--single">
								<gl-button appearance="secondary" full @click=${()=>this.onCancel()}
									>Cancel</gl-button
								>
							</span>
						</p>
					`)}
				${r$(this.state?.orgSettings.byob===!1,()=>tt`<p class="h-deemphasize">
							<code-icon icon="lock"></code-icon>
							<a
								href="${lZ.cloudPatches}"
								title="Learn more about ${i}"
								aria-label="Learn more about ${i}"
								>${i}</a
							>
							are
							<a
								href="https://help.gitkraken.com/gitlens/security"
								title="Learn more about GitKraken security"
								aria-label="Learn more about GitKraken security"
								>securely stored</a
							>
							by GitKraken.
						</p>`,()=>tt`<p class="h-deemphasize">
							<code-icon icon="info"></code-icon>
							Your
							<a
								href="${lZ.cloudPatches}"
								title="Learn more about ${i}"
								aria-label="Learn more about ${i}"
								>${t}</a
							>
							will be securely stored in your organization's self-hosted storage
						</p>`)}
			</div>
		`}render(){return tt`
			<div class="pane-groups">
				<div class="pane-groups__group">${this.renderChangedFiles()}</div>
				<div class="pane-groups__group-fixed pane-groups__group--bottom">${this.renderForm()}</div>
			</div>
		`}renderChangedFiles(){return tt`
			<webview-pane class="h-no-border" expanded>
				<span slot="title">${this.review?"Changes to Suggest":"Changes to Include"}</span>
				<action-nav slot="actions">${this.renderLayoutAction(this.fileLayout)}</action-nav>

				${r$(null!=this.validityMessage,()=>tt`<div class="section">
							<div class="alert alert--error">
								<code-icon icon="error"></code-icon>
								<p class="alert__content">${this.validityMessage}</p>
							</div>
						</div>`)}
				<div class="change-list" data-region="files">
					${r$(null==this.create.changes,()=>this.renderLoading(),()=>this.renderTreeViewWithModel())}
				</div>
			</webview-pane>
		`}onTreeItemChecked(e){if(null==e.detail.context||e.detail.context.length<1)return;let[t,i]=e.detail.context,r=e.detail.checked;"unstaged"===i&&(r=!!e.detail.checked||"staged");let o=this.getChangeForRepo(t);null==o||o.checked!==r&&(o.checked=r,this.requestUpdate("state"),this.emit("gl-patch-create-repo-checked",{repoUri:t,checked:r}))}onTreeItemSelected(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-compare-previous",{...t})}renderTreeViewWithModel(){if(null==this.createChanges||0===this.createChanges.length)return this.renderTreeView([],"none","No changes");let e=[],t=this.createChanges.length>1,i=this.isTree(this.filesModified??0),r=this.isCompact;if(t)for(let t of this.createChanges){let o=this.getTreeForChange(t,!0,i,r);null!=o&&e.push(...o)}else{let t=this.createChanges[0],o=this.getTreeForChange(t,!1,i,r);null!=o&&e.push(...o)}return this.renderTreeView(e,this.state?.preferences?.indentGuides,"No changes")}getTreeForChange(e,t=!1,i=!1,r=!0){if(null==e.files||0===e.files.length)return;let o=[];if("wip"===e.type){let s=[],n=[];for(let t of e.files)t.staged?s.push(t):n.push(t);0===s.length||0===n.length?o.push(...this.renderFiles(e.files,i,r,t?2:1)):(n.length&&o.push({label:"Unstaged Changes",path:"",level:t?2:1,branch:!0,checkable:!0,expanded:!0,checked:!0===e.checked,context:[e.repository.uri,"unstaged"],children:this.renderFiles(n,i,r,t?3:2)}),s.length&&o.push({label:"Staged Changes",path:"",level:t?2:1,branch:!0,checkable:!0,expanded:!0,checked:!1!==e.checked,disableCheck:!0,children:this.renderFiles(s,i,r,t?3:2)}))}else o.push(...this.renderFiles(e.files,i,r));if(!t)return o;let s=this.repoToTreeModel(e.repository.name,e.repository.uri,{branch:!0,checkable:!0,checked:!1!==e.checked});return s.children=o,[s]}isTree(e){return"auto"===this.fileLayout?e>(this.state?.preferences?.files?.threshold??5):"tree"===this.fileLayout}createPatch(){if(!this.canSubmit){0===this.titleInput.value.length?(this.titleInput.setCustomValidity("Title is required"),this.titleInput.reportValidity(),this.titleInput.focus()):this.titleInput.setCustomValidity(""),null==this.selectedChanges||0===this.selectedChanges.length?this.validityMessage="Check at least one change":this.validityMessage=void 0;return}this.validityMessage=void 0,this.titleInput.setCustomValidity("");let e=this.selectedChanges.reduce((e,[t,i])=>(e[t]=i,e),{}),t={title:this.create.title??"",description:this.create.description,changesets:e,visibility:this.create.visibility,userSelections:this.create.userSelections};this.emit("gl-patch-create-patch",t)}onCreateAll(e){this.createPatch(),this.state?.create&&(this.creationBusy=!0)}onSelectCreateOption(e){}getChangeForRepo(e){return this.create.changes[e]}onTitleInput(e){this.create.title=this.titleInput.value,this.fireMetadataUpdate()}onDescriptionInput(e){this.create.description=this.descInput.value,this.fireMetadataUpdate()}onInviteUsers(e){this.emit("gl-patch-create-invite-users")}onChangeSelectionRole(e,t,i){this.emit("gl-patch-create-update-selection",{selection:t,role:i});let r=e.target?.closest("gl-popover");r?.hide()}onVisibilityChange(e){this.create.visibility=e.target.value,this.fireMetadataUpdate()}onGenerateTitleClick(e){this.generateBusy=!0,this.emit("gl-patch-generate-title",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}fireMetadataUpdate(){this.emit("gl-patch-create-update-metadata",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}createRenderRoot(){return this}onTreeItemActionClicked(e){if(e.detail.context&&e.detail.action)switch(e.detail.action.action){case"show-patch-in-graph":this.onShowInGraph(e);break;case"file-open":this.onOpenFile(e);break;case"file-stage":this.onStageFile(e);break;case"file-unstage":this.onUnstageFile(e)}}onOpenFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-open",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onStageFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-stage",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onUnstageFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-unstage",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onShowInGraph(e){}onCancel(){this.emit("gl-patch-create-cancelled")}getFileActions(e,t){let i={icon:"go-to-file",label:"Open File",action:"file-open"};return this.review?[i]:!0===e.staged?[i,{icon:"remove",label:"Unstage Changes",action:"file-unstage"}]:[i,{icon:"plus",label:"Stage Changes",action:"file-stage"}]}getRepoActions(e,t,i){return[{icon:"gl-graph",label:"Open in Commit Graph",action:"show-patch-in-graph"}]}};lY([tY({type:Object})],lJ.prototype,"state",2),lY([tY({type:Boolean})],lJ.prototype,"review",2),lY([tY({type:Object})],lJ.prototype,"generate",2),lY([tJ()],lJ.prototype,"generateBusy",2),lY([tJ()],lJ.prototype,"creationBusy",2),lY([t1("#title")],lJ.prototype,"titleInput",2),lY([t1("#desc")],lJ.prototype,"descInput",2),lY([t1("#generate-ai")],lJ.prototype,"generateAiButton",2),lY([tJ()],lJ.prototype,"validityMessage",2),lJ=lY([tX("gl-patch-create")],lJ);var l0=Object.defineProperty,l1=Object.getOwnPropertyDescriptor,l2=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?l1(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&l0(t,i,s),s};let l5=class extends GlElement{constructor(){super(...arguments),this._contextMenuProxy=new ContextMenuProxyController(this),this.indentPreference=16}get wipChangesCount(){return this.state?.create==null?0:Object.values(this.state.create.changes).reduce((e,t)=>e+=t.files?.length??0,0)}get wipChangeState(){if(this.state?.create==null)return;let e=Object.values(this.state.create.changes).reduce((e,t)=>(null!=t.files&&(e.files+=t.files.length,e.on.add(t.repository.uri)),e),{files:0,on:new Set});return{count:e.files,branches:[...e.on].join(", ")}}get mode(){return this.state?.mode??"view"}updateDocumentProperties(){let e=this.state?.preferences?.indent;e===this.indentPreference||(this.indentPreference=e??16,document.documentElement.style.setProperty("--gitlens-tree-indent",`${this.indentPreference}px`))}updated(e){e.has("state")&&this.updateDocumentProperties()}render(){return tt`
			<div class="commit-detail-panel scrollable">
				<main id="main" tabindex="-1">
					${r$("view"===this.mode,()=>tt`<gl-draft-details .state=${this.state} .explain=${this.explain}></gl-draft-details>`,()=>tt`<gl-patch-create .state=${this.state} .generate=${this.generate}></gl-patch-create>`)}
				</main>
			</div>
		`}createRenderRoot(){return this}};l2([tY({type:Object})],l5.prototype,"state",2),l2([tY({type:Object})],l5.prototype,"explain",2),l2([tY({type:Object})],l5.prototype,"generate",2),l2([tY({attribute:!1,type:Object})],l5.prototype,"app",2),l5=l2([tX("gl-patch-details-app")],l5);let l3="0000000000000000000000000000000000000000";let PatchDetailsApp=class PatchDetailsApp extends App{constructor(){super("PatchDetailsApp"),this.debouncedAttachState=w(this.attachState.bind(this),100)}onInitialize(){this.debouncedAttachState()}onBind(){return[f.on("[data-switch-value]","click",e=>this.onToggleFilesLayout(e)),f.on('[data-action="ai-explain"]',"click",e=>this.onAIExplain(e)),f.on('[data-action="switch-ai"]',"click",e=>this.onSwitchAIModel(e)),f.on('[data-action="mode"]',"click",e=>this.onModeClicked(e)),f.on("gl-draft-details","gl-patch-apply-patch",e=>this.onApplyPatch(e.detail)),f.on("gl-draft-details","gl-draft-archive",e=>this.onArchiveDraft(e.detail.reason)),f.on("gl-patch-details-app","change-patch-base",e=>this.onChangePatchBase(e.detail)),f.on("gl-patch-details-app","select-patch-repo",e=>this.onSelectPatchRepo(e.detail)),f.on("gl-patch-details-app","gl-patch-details-graph-show-patch",e=>this.onShowPatchInGraph(e.detail)),f.on("gl-patch-details-app","gl-patch-create-patch",e=>this.onCreatePatch(e.detail)),f.on("gl-patch-details-app","gl-patch-share-local-patch",()=>this.onShareLocalPatch()),f.on("gl-draft-details","gl-patch-details-copy-cloud-link",()=>this.onCopyCloudLink()),f.on("gl-patch-create","gl-patch-create-invite-users",()=>this.onInviteUsers()),f.on("gl-draft-details","gl-patch-details-invite-users",()=>this.onInviteUsers()),f.on("gl-patch-create","gl-patch-create-update-selection",e=>this.onUpdateUserSelection(e.detail)),f.on("gl-draft-details","gl-patch-details-update-selection",e=>this.onUpdateUserSelection(e.detail)),f.on("gl-patch-create","gl-patch-create-repo-checked",e=>this.onCreateCheckRepo(e.detail)),f.on("gl-patch-create","gl-patch-generate-title",e=>this.onCreateGenerateTitle(e.detail)),f.on("gl-patch-create","gl-patch-create-update-metadata",e=>this.onCreateUpdateMetadata(e.detail)),f.on("gl-draft-details","gl-patch-details-update-metadata",e=>this.onDraftUpdateMetadata(e.detail)),f.on("gl-draft-details","gl-patch-details-update-permissions",()=>this.onDraftUpdatePermissions()),f.on("gl-patch-create,gl-draft-details","gl-patch-file-compare-previous",e=>this.onCompareFileWithPrevious(e.detail)),f.on("gl-patch-create,gl-draft-details","gl-patch-file-compare-working",e=>this.onCompareFileWithWorking(e.detail)),f.on("gl-patch-create,gl-draft-details","gl-patch-file-open",e=>this.onOpenFile(e.detail)),f.on("gl-draft-details","gl-patch-checked",e=>this.onPatchChecked(e.detail))]}onMessageReceived(e){switch(!0){case ee.is(e):e.params.state,this.state=e.params.state,this.setState(this.state),this.debouncedAttachState();break;case et.is(e):case ei.is(e):case er.is(e):this.state={...this.state,...e.params},this.setState(this.state),this.debouncedAttachState(!0);break;case eo.is(e):{let t=this.state.draft,i=t.patches,r=i.findIndex(t=>t.id===e.params.patch.id);i.splice(r,1,e.params.patch),this.state={...this.state,draft:t},this.setState(this.state),this.debouncedAttachState(!0);break}default:super.onMessageReceived?.(e)}}onPatchChecked(e){this.sendCommand(A,e)}onCreateCheckRepo(e){this.sendCommand(V,e)}onCreateUpdateMetadata(e){this.sendCommand(K,e)}async onCreateGenerateTitle(e){try{let e=await this.sendRequest(J,void 0);e.error?this.component.generate={error:{message:e.error.message??"Error retrieving content"}}:e.title||e.description?(this.component.generate={title:e.title,description:e.description},this.state={...this.state,create:{...this.state.create,title:e.title??this.state.create?.title,description:e.description??this.state.create?.description}},this.setState(this.state),this.debouncedAttachState()):this.component.generate=void 0}catch{this.component.generate={error:{message:"Error retrieving content"}}}}onDraftUpdateMetadata(e){this.sendCommand(W,e)}onDraftUpdatePermissions(){this.sendCommand(G,void 0)}onShowPatchInGraph(e){}onCreatePatch(e){this.sendCommand(E,e)}onShareLocalPatch(){this.sendCommand(q,void 0)}onCopyCloudLink(){this.sendCommand(U,void 0)}onModeClicked(e){let t=e.target?.dataset.actionValue??void 0;t!==this.state.mode&&this.sendCommand(N,{mode:t})}onApplyPatch(e){null!=e.selectedPatches&&0!==e.selectedPatches.length&&this.sendCommand(C,{details:e.draft,target:e.target??"current",selected:e.selectedPatches})}onArchiveDraft(e){this.sendCommand($,{reason:e})}onChangePatchBase(e){this.sendCommand(T,void 0)}onSelectPatchRepo(e){this.sendCommand(P,void 0)}onCommandClickedCore(e){let t=e?.startsWith("command:")?e.slice(8):e;null!=t&&this.sendCommand(ea,{command:t})}onSwitchAIModel(e){this.onCommandClickedCore("gitlens.ai.switchProvider")}async onAIExplain(e){try{let e=await this.sendRequest(Y,void 0);e.error?this.component.explain={error:{message:e.error.message??"Error retrieving content"}}:this.component.explain=e}catch{this.component.explain={error:{message:"Error retrieving content"}}}}onToggleFilesLayout(e){let t=e.target?.dataset.switchValue??void 0;if(t===this.state.preferences.files?.layout)return;let i={...this.state.preferences.files,layout:t??"auto",compact:this.state.preferences.files?.compact??!0,threshold:this.state.preferences.files?.threshold??5,icon:this.state.preferences.files?.icon??"type"};this.state={...this.state,preferences:{...this.state.preferences,files:i}},this.debouncedAttachState(),this.sendCommand(F,{files:i})}onInviteUsers(){this.sendCommand(X,void 0)}onUpdateUserSelection(e){this.sendCommand(Q,e)}onOpenFileOnRemote(e){this.sendCommand(M,e)}onOpenFile(e){this.sendCommand(O,e)}onCompareFileWithWorking(e){this.sendCommand(D,e)}onCompareFileWithPrevious(e){this.sendCommand(B,e)}onFileMoreActions(e){this.sendCommand(j,e)}get component(){return null==this._component&&(this._component=document.getElementById("app"),this._component.app=this),this._component}attachState(e){this.component.state=this.state}};new PatchDetailsApp;export{PatchDetailsApp,l3 as uncommittedSha};