let e,t,i,o,r,s,a,c,h,p,u,g,m,f;var b,v,_,w,x,C,$={518(e){function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,o="",r=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)i=e.charCodeAt(c);else if(47===i)break;else i=47;if(47===i){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(o.length<2||2!==r||46!==o.charCodeAt(o.length-1)||46!==o.charCodeAt(o.length-2)){if(o.length>2){var h=o.lastIndexOf("/");if(h!==o.length-1){-1===h?(o="",r=0):r=(o=o.slice(0,h)).length-1-o.lastIndexOf("/"),s=c,a=0;continue}}else if(2===o.length||1===o.length){o="",r=0,s=c,a=0;continue}}t&&(o.length>0?o+="/..":o="..",r=2)}else o.length>0?o+="/"+e.slice(s+1,c):o=e.slice(s+1,c),r=c-s-1;s=c,a=0}else 46===i&&-1!==a?++a:a=-1}return o}var o={resolve:function(){for(var e,o,r="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?o=arguments[a]:(void 0===e&&(e=process.cwd()),o=e),t(o),0!==o.length&&(r=o+"/"+r,s=47===o.charCodeAt(0));if(r=i(r,!s),s)if(r.length>0)return"/"+r;else return"/";return r.length>0?r:"."},normalize:function(e){if(t(e),0===e.length)return".";var o=47===e.charCodeAt(0),r=47===e.charCodeAt(e.length-1);return(0!==(e=i(e,!o)).length||o||(e="."),e.length>0&&r&&(e+="/"),o)?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var r=arguments[i];t(r),r.length>0&&(void 0===e?e=r:e+="/"+r)}return void 0===e?".":o.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=o.resolve(e))===(i=o.resolve(i)))return"";for(var r=1;r<e.length&&47===e.charCodeAt(r);++r);for(var s=e.length,a=s-r,c=1;c<i.length&&47===i.charCodeAt(c);++c);for(var h=i.length-c,p=a<h?a:h,u=-1,g=0;g<=p;++g){if(g===p){if(h>p){if(47===i.charCodeAt(c+g))return i.slice(c+g+1);else if(0===g)return i.slice(c+g)}else a>p&&(47===e.charCodeAt(r+g)?u=g:0===g&&(u=0));break}var m=e.charCodeAt(r+g);if(m!==i.charCodeAt(c+g))break;47===m&&(u=g)}var f="";for(g=r+u+1;g<=s;++g)(g===s||47===e.charCodeAt(g))&&(0===f.length?f+="..":f+="/..");return f.length>0?f+i.slice(c+u):(c+=u,47===i.charCodeAt(c)&&++c,i.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),o=47===i,r=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(i=e.charCodeAt(a))){if(!s){r=a;break}}else s=!1;return -1===r?o?"/":".":o&&1===r?"//":e.slice(0,r)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var o,r=0,s=-1,a=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var c=i.length-1,h=-1;for(o=e.length-1;o>=0;--o){var p=e.charCodeAt(o);if(47===p){if(!a){r=o+1;break}}else -1===h&&(a=!1,h=o+1),c>=0&&(p===i.charCodeAt(c)?-1==--c&&(s=o):(c=-1,s=h))}return r===s?s=h:-1===s&&(s=e.length),e.slice(r,s)}for(o=e.length-1;o>=0;--o)if(47===e.charCodeAt(o)){if(!a){r=o+1;break}}else -1===s&&(a=!1,s=o+1);return -1===s?"":e.slice(r,s)},extname:function(e){t(e);for(var i=-1,o=0,r=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47===h){if(!s){o=c+1;break}continue}-1===r&&(s=!1,r=c+1),46===h?-1===i?i=c:1!==a&&(a=1):-1!==i&&(a=-1)}return -1===i||-1===r||0===a||1===a&&i===r-1&&i===o+1?"":e.slice(i,r)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i,o={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return o;var r=e.charCodeAt(0),s=47===r;s?(o.root="/",i=1):i=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,g=0;u>=i;--u){if(47===(r=e.charCodeAt(u))){if(!p){c=u+1;break}continue}-1===h&&(p=!1,h=u+1),46===r?-1===a?a=u:1!==g&&(g=1):-1!==a&&(g=-1)}return -1===a||-1===h||0===g||1===g&&a===h-1&&a===c+1?-1!==h&&(0===c&&s?o.base=o.name=e.slice(1,h):o.base=o.name=e.slice(c,h)):(0===c&&s?(o.name=e.slice(1,a),o.base=e.slice(1,h)):(o.name=e.slice(c,a),o.base=e.slice(c,h)),o.ext=e.slice(a,h)),c>0?o.dir=e.slice(0,c-1):s&&(o.dir="/"),o},sep:"/",delimiter:":",win32:null,posix:null};o.posix=o,e.exports=o},285(e,t,i){i.d(t,{FlowLayout:()=>FlowLayout,flow:()=>r}),i.r(t);let SizeCache=class SizeCache{constructor(e){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,e?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(e,t){let i=this._map.get(e)||0;this._map.set(e,t),this.totalSize+=t-i}get averageSize(){if(this._map.size>0){let e=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(e):e}return 0}getSize(e){return this._map.get(e)}clear(){this._map.clear(),this.totalSize=0}};function o(e){return"horizontal"===e?"width":"height"}let BaseLayout=class BaseLayout{_getDefaultConfig(){return{direction:"vertical"}}constructor(e,t){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=e,Promise.resolve().then(()=>this.config=t||this._getDefaultConfig())}set config(e){Object.assign(this,Object.assign({},this._getDefaultConfig(),e))}get config(){return{direction:this.direction}}get items(){return this._items}set items(e){this._setItems(e)}_setItems(e){e!==this._items&&(this._items=e,this._scheduleReflow())}get direction(){return this._direction}set direction(e){(e="horizontal"===e?e:"vertical")!==this._direction&&(this._direction=e,this._sizeDim="horizontal"===e?"width":"height",this._secondarySizeDim="horizontal"===e?"height":"width",this._positionDim="horizontal"===e?"left":"top",this._secondaryPositionDim="horizontal"===e?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(e){let{_viewDim1:t,_viewDim2:i}=this;Object.assign(this._viewportSize,e),i!==this._viewDim2?this._scheduleLayoutUpdate():t!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(e){Object.assign(this._latestCoords,e);let t=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(t-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(e=!1){(e||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(e){this._pin=e,this._triggerReflow()}get pin(){if(null!==this._pin){let{index:e,block:t}=this._pin;return{index:Math.max(0,Math.min(e,this.items.length-1)),block:t}}return null}_clampScrollPosition(e){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(e,this.totalScrollSize[o(this.direction)]-this._viewDim1))}unpin(){null!==this._pin&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(null!==this.pin){let e=this._scrollPosition,{index:t,block:i}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:t,block:i||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=e-this._scrollPosition}}_calculateScrollIntoViewPosition(e){let{block:t}=e,i=Math.min(this.items.length,Math.max(0,e.index)),o=this._getItemPosition(i)[this._positionDim],r=o;if("start"!==t){let e=this._getItemSize(i)[this._sizeDim];if("center"===t)r=o-.5*this._viewDim1+.5*e;else{let i=o-this._viewDim1+e;if("end"===t)r=i;else{let e=this._scrollPosition;r=Math.abs(e-o)<Math.abs(e-i)?o:i}}}return r+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(r)}getScrollIntoViewCoordinates(e){return{[this._positionDim]:this._calculateScrollIntoViewPosition(e)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let e=new Map;if(-1!==this._first&&-1!==this._last)for(let t=this._first;t<=this._last;t++)e.set(t,this._getItemPosition(t));let t={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:e};this._scrollError&&(t.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(t)}get _num(){return -1===this._first||-1===this._last?0:this._last-this._first+1}_checkThresholds(){if(0===this._viewDim1&&this._num>0||null!==this._pin)this._scheduleReflow();else{let e=Math.max(0,this._scrollPosition-this._overhang),t=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>e||this._physicalMax<t?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(e){if(-1===this._first||-1===this._last)return;let t=this._first;for(;t<this._last&&Math.round(this._getItemPosition(t)[this._positionDim]+this._getItemSize(t)[this._sizeDim])<=Math.round(this._scrollPosition);)t++;let i=this._last;for(;i>this._first&&Math.round(this._getItemPosition(i)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)i--;(t!==this._firstVisible||i!==this._lastVisible)&&(this._firstVisible=t,this._lastVisible=i,e&&e.emit&&this._sendVisibilityChangedMessage())}};let r=e=>Object.assign({type:FlowLayout},e);function s(e){return"horizontal"===e?"marginLeft":"marginTop"}let MetricsCache=class MetricsCache{constructor(){this._childSizeCache=new SizeCache,this._marginSizeCache=new SizeCache,this._metricsCache=new Map}update(e,t){let i=new Set;for(let r of(Object.keys(e).forEach(r=>{let s=Number(r);this._metricsCache.set(s,e[s]),this._childSizeCache.set(s,e[s][o(t)]),i.add(s),i.add(s+1)}),i)){let e=this._metricsCache.get(r)?.[s(t)]||0,i=this._metricsCache.get(r-1)?.["horizontal"===t?"marginRight":"marginBottom"]||0;this._marginSizeCache.set(r,function(e,t){let i=[e,t].sort();return i[1]<=0?Math.min(...i):i[0]>=0?Math.max(...i):i[0]+i[1]}(e,i))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(e,t){return this._metricsCache.get(e)?.[s(t)]||0}getChildSize(e){return this._childSizeCache.getSize(e)}getMarginSize(e){return this._marginSizeCache.getSize(e)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}};let FlowLayout=class FlowLayout extends BaseLayout{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new MetricsCache,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(e){this._metricsCache.update(e,this.direction),this._scheduleReflow()}_getPhysicalItem(e){return this._newPhysicalItems.get(e)??this._physicalItems.get(e)}_getSize(e){return this._getPhysicalItem(e)&&this._metricsCache.getChildSize(e)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(e){let t=this._metricsCache;if(-1===this._first||-1===this._last)return t.averageMarginSize+e*(t.averageMarginSize+this._getAverageSize());if(e<this._first){let i=this._first-e;return this._getPhysicalItem(this._first).pos-(t.getMarginSize(this._first-1)||t.averageMarginSize)-(i*t.averageChildSize+(i-1)*t.averageMarginSize)}{let i=e-this._last;return this._getPhysicalItem(this._last).pos+(t.getChildSize(this._last)||t.averageChildSize)+(t.getMarginSize(this._last)||t.averageMarginSize)+i*(t.averageChildSize+t.averageMarginSize)}}_getPosition(e){let t=this._getPhysicalItem(e),{averageMarginSize:i}=this._metricsCache;return 0===e?this._metricsCache.getMarginSize(0)??i:t?t.pos:this._estimatePosition(e)}_calculateAnchor(e,t){return e<=0?0:t>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((e+t)/2/this._delta)))}_getAnchor(e,t){if(0===this._physicalItems.size||this._first<0||this._last<0)return this._calculateAnchor(e,t);let i=this._getPhysicalItem(this._first),o=this._getPhysicalItem(this._last),r=i.pos;if(o.pos+this._metricsCache.getChildSize(this._last)<e||r>t)return this._calculateAnchor(e,t);let s=this._firstVisible-1,a=-1/0;for(;a<e;)a=this._getPhysicalItem(++s).pos+this._metricsCache.getChildSize(s);return s}_getActiveItems(){0===this._viewDim1||0===this.items.length?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let e=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e,this._stable=!0}_getItems(){let e,t,i=this._newPhysicalItems;if(this._stable=!0,null!==this.pin){let{index:e}=this.pin;this._anchorIdx=e,this._anchorPos=this._getPosition(e)}if(e=this._scrollPosition-this._overhang,(t=this._scrollPosition+this._viewDim1+this._overhang)<0||e>this._scrollSize)return void this._clearItems();(null===this._anchorIdx||null===this._anchorPos)&&(this._anchorIdx=this._getAnchor(e,t),this._anchorPos=this._getPosition(this._anchorIdx));let o=this._getSize(this._anchorIdx);void 0===o&&(this._stable=!1,o=this._getAverageSize());let r=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,s=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;0===this._anchorIdx&&(this._anchorPos=r),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-s-o);let a=0;for(this._anchorPos+o+s<e&&(a=e-(this._anchorPos+o+s)),this._anchorPos-r>t&&(a=t-(this._anchorPos-r)),a&&(this._scrollPosition-=a,e-=a,t-=a,this._scrollError+=a),i.set(this._anchorIdx,{pos:this._anchorPos,size:o}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-r,this._physicalMax=this._anchorPos+o+s;this._physicalMin>e&&this._first>0;){let e=this._getSize(--this._first);void 0===e&&(this._stable=!1,e=this._getAverageSize());let t=this._metricsCache.getMarginSize(this._first);void 0===t&&(this._stable=!1,t=this._metricsCache.averageMarginSize),this._physicalMin-=e;let o=this._physicalMin;if(i.set(this._first,{pos:o,size:e}),this._physicalMin-=t,!1===this._stable&&!1===this._estimate)break}for(;this._physicalMax<t&&this._last<this.items.length-1;){let e=this._getSize(++this._last);void 0===e&&(this._stable=!1,e=this._getAverageSize());let t=this._metricsCache.getMarginSize(this._last);void 0===t&&(this._stable=!1,t=this._metricsCache.averageMarginSize);let o=this._physicalMax;if(i.set(this._last,{pos:o,size:e}),this._physicalMax+=e+t,!this._stable&&!this._estimate)break}let c=this._calculateError();c&&(this._physicalMin-=c,this._physicalMax-=c,this._anchorPos-=c,this._scrollPosition-=c,i.forEach(e=>e.pos-=c),this._scrollError+=c),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=i)}_calculateError(){return 0===this._first?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:e,_last:t}=this;super._reflow(),(-1===this._first&&-1==this._last||this._first===e&&this._last===t)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:e}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(e+this._getAverageSize())+e)}get _delta(){let{averageMarginSize:e}=this._metricsCache;return this._getAverageSize()+e}_getItemPosition(e){return{[this._positionDim]:this._getPosition(e),[this._secondaryPositionDim]:0,["horizontal"===this.direction?"xOffset":"yOffset"]:-(this._metricsCache.getLeadingMarginValue(e,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(e){return{[this._sizeDim]:this._getSize(e)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}}};let S={};function E(e){let t=S[e];if(void 0!==t)return t.exports;let i=S[e]={exports:{}};return $[e](i,i.exports,E),i.exports}E.d=(e,t)=>{if(Array.isArray(t))for(var i=0;i<t.length;){var o=t[i++],r=t[i++];E.o(e,o)?0===r&&i++:0===r?Object.defineProperty(e,o,{enumerable:!0,value:t[i++]}):Object.defineProperty(e,o,{enumerable:!0,get:r})}else for(var o in t)E.o(t,o)&&!E.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},E.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),E.r=e=>{Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},Object.defineProperty(E,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(e){}});let A=globalThis,P=A.ShadowRoot&&(void 0===A.ShadyCSS||A.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,T=Symbol(),M=new WeakMap;let n=class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==T)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(P&&void 0===e){let i=void 0!==t&&1===t.length;i&&(e=M.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&M.set(t,e))}return e}toString(){return this.cssText}};let B=e=>new n("string"==typeof e?e:e+"",void 0,T),j=(e,...t)=>new n(1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]),e,T),O=P?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return B(t)})(e):e,{is:D,defineProperty:F,getOwnPropertyDescriptor:N,getOwnPropertyNames:q,getOwnPropertySymbols:U,getPrototypeOf:W}=Object,V=globalThis,K=V.trustedTypes,G=K?K.emptyScript:"",Y=V.reactiveElementPolyfillSupport,X={toAttribute(e,t){switch(t){case Boolean:e=e?G:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},J=(e,t)=>!D(e,t),Q={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??=Symbol("metadata"),V.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Q){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&F(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){let{get:o,set:r}=N(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){let s=o?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Q}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=W(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...q(e),...U(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,i]of t)this.elementProperties.set(e,i)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let i of new Set(e.flat(1/0).reverse()))t.unshift(O(i));else void 0!==e&&t.push(O(e));return t}static _$Eu(e,t){let i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(P)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let i of t){let t=document.createElement("style"),o=A.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){let r=(void 0!==i.converter?.toAttribute?i.converter:X).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){let e=i.getPropertyOptions(o),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:X;this._$Em=o;let s=r.fromAttribute(t,e.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(e,t,i,o=!1,r){if(void 0!==e){let s=this.constructor;if(!1===o&&(r=this[e]),!(((i??=s.getPropertyOptions(e)).hasChanged??J)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,i]of e){let{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,Y?.({ReactiveElement:y}),(V.reactiveElementVersions??=[]).push("2.1.2");let ee=globalThis,et=e=>e,ei=ee.trustedTypes,eo=ei?ei.createPolicy("lit-html",{createHTML:e=>e}):void 0,er="$lit$",es=`lit$${Math.random().toFixed(9).slice(2)}$`,en="?"+es,ea=`<${en}>`,el=document,ec=()=>el.createComment(""),eh=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ed=Array.isArray,ep=e=>ed(e)||"function"==typeof e?.[Symbol.iterator],eu=`[ 	
\x0c\r]`,eg=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,em=/-->/g,ef=/>/g,eb=RegExp(`>|${eu}(?:([^\\s"'>=/]+)(${eu}*=${eu}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ev=/'/g,e_=/"/g,ey=/^(?:script|style|textarea|title)$/i,ew=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),ex=ew(1),ek=ew(2),eC=(ew(3),Symbol.for("lit-noChange")),e$=Symbol.for("lit-nothing"),eS=new WeakMap,eE=el.createTreeWalker(el,129);function eA(e,t){if(!ed(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==eo?eo.createHTML(t):t}let eI=(e,t)=>{let i=e.length-1,o=[],r,s=2===t?"<svg>":3===t?"<math>":"",a=eg;for(let t=0;t<i;t++){let i=e[t],c,h,p=-1,u=0;for(;u<i.length&&(a.lastIndex=u,null!==(h=a.exec(i)));)u=a.lastIndex,a===eg?"!--"===h[1]?a=em:void 0!==h[1]?a=ef:void 0!==h[2]?(ey.test(h[2])&&(r=RegExp("</"+h[2],"g")),a=eb):void 0!==h[3]&&(a=eb):a===eb?">"===h[0]?(a=r??eg,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?eb:'"'===h[3]?e_:ev):a===e_||a===ev?a=eb:a===em||a===ef?a=eg:(a=eb,r=void 0);let g=a===eb&&e[t+1].startsWith("/>")?" ":"";s+=a===eg?i+ea:p>=0?(o.push(c),i.slice(0,p)+er+i.slice(p)+es+g):i+es+(-2===p?t:g)}return[eA(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};let lit_html_S=class lit_html_S{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,s=0,a=e.length-1,c=this.parts,[h,p]=eI(e,t);if(this.el=lit_html_S.createElement(h,i),eE.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=eE.nextNode())&&c.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(let e of o.getAttributeNames())if(e.endsWith(er)){let t=p[s++],i=o.getAttribute(e).split(es),a=/([.?@])?(.*)/.exec(t);c.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),o.removeAttribute(e)}else e.startsWith(es)&&(c.push({type:6,index:r}),o.removeAttribute(e));if(ey.test(o.tagName)){let e=o.textContent.split(es),t=e.length-1;if(t>0){o.textContent=ei?ei.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],ec()),eE.nextNode(),c.push({type:2,index:++r});o.append(e[t],ec())}}}else if(8===o.nodeType)if(o.data===en)c.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(es,e+1));)c.push({type:7,index:r}),e+=es.length-1}r++}}static createElement(e,t){let i=el.createElement("template");return i.innerHTML=e,i}};function eP(e,t,i=e,o){if(t===eC)return t;let r=void 0!==o?i._$Co?.[o]:i._$Cl,s=eh(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e))._$AT(e,i,o),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(t=eP(e,r._$AS(e,t.values),r,o)),t}let R=class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??el).importNode(t,!0);eE.currentNode=o;let r=eE.nextNode(),s=0,a=0,c=i[0];for(;void 0!==c;){if(s===c.index){let t;2===c.type?t=new k(r,r.nextSibling,this,e):1===c.type?t=new c.ctor(r,c.name,c.strings,this,e):6===c.type&&(t=new Z(r,this,e)),this._$AV.push(t),c=i[++a]}s!==c?.index&&(r=eE.nextNode(),s++)}return eE.currentNode=el,o}p(e){let t=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=e$,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){eh(e=eP(this,e,t))?e===e$||null==e||""===e?(this._$AH!==e$&&this._$AR(),this._$AH=e$):e!==this._$AH&&e!==eC&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):ep(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==e$&&eh(this._$AH)?this._$AA.nextSibling.data=e:this.T(el.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=lit_html_S.createElement(eA(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{let e=new R(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=eS.get(e.strings);return void 0===t&&eS.set(e.strings,t=new lit_html_S(e)),t}k(e){ed(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,o=0;for(let r of e)o===t.length?t.push(i=new k(this.O(ec()),this.O(ec()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=et(e).nextSibling;et(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=e$,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=e$}_$AI(e,t=this,i,o){let r=this.strings,s=!1;if(void 0===r)(s=!eh(e=eP(this,e,t,0))||e!==this._$AH&&e!==eC)&&(this._$AH=e);else{let o,a,c=e;for(e=r[0],o=0;o<r.length-1;o++)(a=eP(this,c[i+o],t,o))===eC&&(a=this._$AH[o]),s||=!eh(a)||a!==this._$AH[o],a===e$?e=e$:e!==e$&&(e+=(a??"")+r[o+1]),this._$AH[o]=a}s&&!o&&this.j(e)}j(e){e===e$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===e$?void 0:e}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==e$)}};let z=class z extends H{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=eP(this,e,t,0)??e$)===eC)return;let i=this._$AH,o=e===e$&&i!==e$||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==e$&&(i===e$||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};let Z=class Z{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){eP(this,e)}};let ez=ee.litHtmlPolyfillSupport;ez?.(lit_html_S,k),(ee.litHtmlVersions??=[]).push("3.3.3");let eT=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{let o=i?.renderBefore??t,r=o._$litPart$;if(void 0===r){let e=i?.renderBefore??null;o._$litPart$=r=new k(t.insertBefore(ec(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return eC}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,eT.litElementHydrateSupport?.({LitElement:lit_element_i});let eR=eT.litElementPolyfillSupport;eR?.({LitElement:lit_element_i}),(eT.litElementVersions??=[]).push("4.2.2");let eM=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},eB={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:J};function ej(e){return(t,i)=>{let o;return"object"==typeof i?((e=eB,t,i)=>{let{kind:o,metadata:r}=i,s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===o){let{name:o}=i;return{set(i){let r=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,r,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){let{name:o}=i;return function(i){let r=this[o];t.call(this,i),this.requestUpdate(o,r,e,!0,i)}}throw Error("Unsupported decorator location: "+o)})(e,t,i):(o=t.hasOwnProperty(i),t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0)}}function eO(e){return ej({...e,state:!0,attribute:!1})}let eD=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);function eL(e,t){return(i,o,r)=>{let s=t=>t.renderRoot?.querySelector(e)??null;if(t){let e,{get:t,set:a}="object"==typeof o?i:r??(e=Symbol(),{get(){return this[e]},set(t){this[e]=t}});return eD(i,o,{get(){let e=t.call(this);return void 0===e&&(null!==(e=s(this))||this.hasUpdated)&&a.call(this,e),e}})}return eD(i,o,{get(){return s(this)}})}}var eF=Object.defineProperty,eN=(e,t,i)=>{let o;return(o="symbol"!=typeof t?t+"":t)in e?eF(e,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[o]=i,i},eq=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},eU=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},eW=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot access private method");return i};function eH(e,t){return Object.is(e,t)}let eV=null,eK=!1,eG=1,eZ=Symbol("SIGNAL");function eY(e){let t=eV;return eV=e,t}let eX={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function eJ(e){if(eK)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===eV)return;eV.consumerOnSignalRead(e);let t=eV.nextProducerIndex++;e1(eV),t<eV.producerNode.length&&eV.producerNode[t]!==e&&e0(eV)&&eQ(eV.producerNode[t],eV.producerIndexOfThis[t]),eV.producerNode[t]!==e&&(eV.producerNode[t]=e,eV.producerIndexOfThis[t]=e0(eV)?function e(t,i,o){var r;if(e2(t),e1(t),0===t.liveConsumerNode.length){null==(r=t.watched)||r.call(t.wrapper);for(let i=0;i<t.producerNode.length;i++)t.producerIndexOfThis[i]=e(t.producerNode[i],t,i)}return t.liveConsumerIndexOfThis.push(o),t.liveConsumerNode.push(i)-1}(e,eV,t):0),eV.producerLastReadVersion[t]=e.version}function eQ(e,t){var i;if(e2(e),e1(e),"u">typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(i=e.unwatched)||i.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)eQ(e.producerNode[t],e.producerIndexOfThis[t])}let o=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[o],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[o],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let i=e.liveConsumerIndexOfThis[t],o=e.liveConsumerNode[t];e1(o),o.producerIndexOfThis[i]=t}}function e0(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function e1(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function e2(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function e5(e){if(function e(t){if(t.dirty||t.lastCleanEpoch!==eG){if(!t.producerMustRecompute(t)&&!function(t){e1(t);for(let i=0;i<t.producerNode.length;i++){let o=t.producerNode[i],r=t.producerLastReadVersion[i];if(r!==o.version||(e(o),r!==o.version))return!0}return!1}(t)){t.dirty=!1,t.lastCleanEpoch=eG;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=eG}}(e),eJ(e),e.value===e6)throw e.error;return e.value}let e3=Symbol("UNSET"),e4=Symbol("COMPUTING"),e6=Symbol("ERRORED"),e7={...eX,value:e3,dirty:!0,error:null,equal:eH,producerMustRecompute:e=>e.value===e3||e.value===e4,producerRecomputeValue(e){let t;if(e.value===e4)throw Error("Detected cycle in computations.");let i=e.value;e.value=e4;let o=(e&&(e.nextProducerIndex=0),eY(e)),r=!1;try{t=e.computation.call(e.wrapper),r=i!==e3&&i!==e6&&e.equal.call(e.wrapper,i,t)}catch(i){t=e6,e.error=i}finally{if(eY(o),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(e0(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)eQ(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}if(r){e.value=i;return}e.value=t,e.version++}},e8=function(){throw Error()};function e9(){return eJ(this),this.value}let te={...eX,equal:eH,value:void 0},tt=Symbol("node");(e=>{var t,i,o,r;let State=class State{constructor(o,r={}){let s,a;eU(this,i),eN(this,t);let c=((s=Object.create(te)).value=o,(a=()=>(eJ(s),s.value))[eZ]=s,a)[eZ];if(this[tt]=c,c.wrapper=this,r){let t=r.equals;t&&(c.equal=t),c.watched=r[e.subtle.watched],c.unwatched=r[e.subtle.unwatched]}}get(){if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return e9.call(this[tt])}set(t){var i,o;if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(eK)throw Error("Writes to signals not permitted during Watcher callback");i=this[tt],(null==eV?void 0:eV.consumerAllowSignalWrites)===!1&&e8(),i.equal.call(i.wrapper,i.value,t)||(i.value=t,o=i,o.version++,eG++,function e(t){if(void 0===t.liveConsumerNode)return;let i=eK;eK=!0;try{for(let i of t.liveConsumerNode)i.dirty||function(t){var i;t.dirty=!0,e(t),null==(i=t.consumerMarkedDirty)||i.call(t.wrapper??t)}(i)}finally{eK=i}}(o))}};t=tt,i=new WeakSet,e.isState=e=>"object"==typeof e&&eq(i,e),e.State=State;let Computed=class Computed{constructor(t,i){let s,a;eU(this,r),eN(this,o);let c=((s=Object.create(e7)).computation=t,(a=()=>e5(s))[eZ]=s,a)[eZ];if(c.consumerAllowSignalWrites=!0,this[tt]=c,c.wrapper=this,i){let t=i.equals;t&&(c.equal=t),c.watched=i[e.subtle.watched],c.unwatched=i[e.subtle.unwatched]}}get(){if(!(0,e.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return e5(this[tt])}};o=tt,r=new WeakSet,e.isComputed=e=>"object"==typeof e&&eq(r,e),e.Computed=Computed,(t=>{var i,o,r,s;t.untrack=function(e){let t,i=null;try{i=eY(null),t=e()}finally{eY(i)}return t},t.introspectSources=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(i=t[tt].producerNode)?void 0:i.map(e=>e.wrapper))??[]},t.introspectSinks=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called introspectSinks without a Signal argument");return(null==(i=t[tt].liveConsumerNode)?void 0:i.map(e=>e.wrapper))??[]},t.hasSinks=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called hasSinks without a Signal argument");let i=t[tt].liveConsumerNode;return!!i&&i.length>0},t.hasSources=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called hasSources without a Computed or Watcher argument");let i=t[tt].producerNode;return!!i&&i.length>0};let Watcher=class Watcher{constructor(e){eU(this,o),eU(this,r),eN(this,i);let t=Object.create(eX);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[tt]=t}watch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eW(this,r,s).call(this,t);let i=this[tt];i.dirty=!1;let o=eY(i);for(let e of t)eJ(e[tt]);eY(o)}unwatch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eW(this,r,s).call(this,t);let i=this[tt];e1(i);for(let e=i.producerNode.length-1;e>=0;e--)if(t.includes(i.producerNode[e].wrapper)){eQ(i.producerNode[e],i.producerIndexOfThis[e]);let t=i.producerNode.length-1;if(i.producerNode[e]=i.producerNode[t],i.producerIndexOfThis[e]=i.producerIndexOfThis[t],i.producerNode.length--,i.producerIndexOfThis.length--,i.nextProducerIndex--,e<i.producerNode.length){let t=i.producerIndexOfThis[e],o=i.producerNode[e];e2(o),o.liveConsumerIndexOfThis[t]=e}}}getPending(){if(!(0,e.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[tt].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}};i=tt,o=new WeakSet,r=new WeakSet,s=function(t){for(let i of t)if(!(0,e.isComputed)(i)&&!(0,e.isState)(i))throw TypeError("Called watch/unwatch without a Computed or State argument")},e.isWatcher=e=>eq(o,e),t.Watcher=Watcher,t.currentComputed=function(){var e;return null==(e=eV)?void 0:e.wrapper},t.watched=Symbol("watched"),t.unwatched=Symbol("unwatched")})(e.subtle||(e.subtle={}))})(_||(_={}));let ti=!1,to=new _.subtle.Watcher(()=>{ti||(ti=!0,queueMicrotask(()=>{for(let e of(ti=!1,to.getPending()))e.get();to.watch()}))}),tr=Symbol("SignalWatcherBrand"),ts=new FinalizationRegistry(e=>{e.unwatch(..._.subtle.introspectSources(e))}),tn=new WeakMap;function ta(e){return!0===e[tr]?e:class extends e{constructor(){super(...arguments),this._$St=new Map,this._$So=new _.State(0),this._$Si=!1}_$Sl(){var e,t;let i=[],o=[];this._$St.forEach((e,t)=>{((null==e?void 0:e.beforeUpdate)?i:o).push(t)});let r=null==(e=this.h)?void 0:e.getPending().filter(e=>e!==this._$Su&&!this._$St.has(e));i.forEach(e=>e.get()),null==(t=this._$Su)||t.get(),r.forEach(e=>e.get()),o.forEach(e=>e.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(void 0!==this.h)return;this._$Su=new _.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new _.subtle.Watcher(function(){let e=tn.get(this);void 0!==e&&(!1===e._$Si&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});tn.set(e,this),ts.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(void 0===this.h)return;let e=!1;this.h.unwatch(..._.subtle.introspectSources(this.h).filter(t=>{var i;let o=!0!==(null==(i=this._$St.get(t))?void 0:i.manualDispose);return o&&this._$St.delete(t),e||(e=!o),o})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,t){var i;this._$S_();let o=new _.Computed(()=>{e()});return this.h.watch(o),this._$St.set(o,t),null!=(i=null==t?void 0:t.beforeUpdate)&&i?_.subtle.untrack(()=>o.get()):this.updateComplete.then(()=>_.subtle.untrack(()=>o.get())),()=>{this._$St.delete(o),this.h.unwatch(o),!1===this.isConnected&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{!1===this.isConnected&&this._$Sp()})}}}let tl=e=>(...t)=>({_$litDirective$:e,values:t});let directive_i=class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let{I:tc}={M:er,P:es,A:en,C:1,L:eI,R,D:ep,V:eP,I:k,H,N:L,U:z,B:I,F:Z},th=e=>e,td=(e,t,i)=>{let o=e._$AA.parentNode,r=void 0===t?e._$AB:t._$AA;if(void 0===i)i=new tc(o.insertBefore(document.createComment(""),r),o.insertBefore(document.createComment(""),r),e,e.options);else{let t=i._$AB.nextSibling,s=i._$AM,a=s!==e;if(a){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==s._$AU&&i._$AP(t)}if(t!==r||a){let e=i._$AA;for(;e!==t;){let t=th(e).nextSibling;th(o).insertBefore(e,r),e=t}}}return i},tp=(e,t,i=e)=>(e._$AI(t,i),e),tu={},tg=(e,t=tu)=>e._$AH=t,tm=e=>{e._$AR(),e._$AA.remove()},tf=(e,t)=>{let i=e._$AN;if(void 0===i)return!1;for(let e of i)e._$AO?.(t,!1),tf(e,t);return!0},tb=e=>{let t,i;do{if(void 0===(t=e._$AM))break;(i=t._$AN).delete(e),e=t}while(0===i?.size)},tv=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),tw(t)}};function t_(e){void 0!==this._$AN?(tb(this),this._$AM=e,tv(this)):this._$AM=e}function ty(e,t=!1,i=0){let o=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(t)if(Array.isArray(o))for(let e=i;e<o.length;e++)tf(o[e],!1),tb(o[e]);else null!=o&&(tf(o,!1),tb(o));else tf(this,e)}let tw=e=>{2==e.type&&(e._$AP??=ty,e._$AQ??=t_)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),tv(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(tf(this,e),tb(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};let tx=!1,tk=new _.subtle.Watcher(async()=>{tx||(tx=!0,queueMicrotask(()=>{for(let e of(tx=!1,tk.getPending()))e.get();tk.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var e,t;void 0===this._$Sm&&(this._$Sj=new _.Computed(()=>{var e;let t=null==(e=this._$SW)?void 0:e.get();return this.setValue(t),t}),this._$Sm=null!=(t=null==(e=this._$Sk)?void 0:e.h)?t:tk,this._$Sm.watch(this._$Sj),_.subtle.untrack(()=>{var e;return null==(e=this._$Sj)?void 0:e.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return _.subtle.untrack(()=>e.get())}update(e,[t]){var i;return null!=this._$Sk||(this._$Sk=null==(i=e.options)?void 0:i.host),t!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=t,this._$S_(),_.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tC=tl(watch_r),t$=e=>(t,...i)=>e(t,...i.map(e=>e instanceof _.State||e instanceof _.Computed?tC(e):e));t$(ex),t$(ek),_.State,_.Computed;let tS=(e,t)=>new _.State(e,t),tE=(e,t)=>new _.Computed(e,t);let context_request_event_s=class context_request_event_s extends Event{constructor(e,t,i,o){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=i,this.subscribe=o??!1}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let i=t||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:o}=this.subscriptions.get(e);e(this.value,o)}clearCallbacks(){this.subscriptions.clear()}};let context_provider_e=class context_provider_e extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(e,t,i){super(void 0!==t.context?t.initialValue:i),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:i}]of this.subscriptions)t.has(e)||(t.add(e),i.dispatchEvent(new context_request_event_s(this.context,i,e,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new context_provider_e(this.context,this.host))}};function tA({context:e}){return(t,i)=>{let o=new WeakMap;if("object"==typeof i)return{get(){return t.get.call(this)},set(e){return o.get(this).setValue(e),t.set.call(this,e)},init(t){return o.set(this,new context_provider_i(this,{context:e,initialValue:t})),t}};{let r;t.constructor.addInitializer(t=>{o.set(t,new context_provider_i(t,{context:e}))});let s=Object.getOwnPropertyDescriptor(t,i);if(void 0===s){let e=new WeakMap;r={get(){return e.get(this)},set(t){o.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=s.set;r={...s,set(t){o.get(this).setValue(t),e?.call(this,t)}}}return void Object.defineProperty(t,i,r)}}}let{fromCharCode:tI}=String;new TextEncoder;let tP=new TextDecoder;function tz(e){return JSON.stringify(e)}let IpcCall=class IpcCall{constructor(e,t,i=!1){this.scope=e,this.reset=i,this.method=`${e}/${t}`}is(e){return e.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(e,t,i){super(e,t,i),this.response=new IpcNotification(this.scope,`${t}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let tT=new IpcRequest("core","webview/ready"),tR=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let tM=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let tB=new IpcCommand("core","telemetry/sendEvent"),tj=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let tO=new IpcCommand("core","webview/focus/didChange"),tD=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let tL=new WeakMap;function tF(e,t){return function(i,o,r){let s=tL.get(i.constructor);null==s&&tL.set(i.constructor,s=[]),s.push({method:r.value,keys:Array.isArray(e)?e:[e],afterFirstUpdate:t?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(e,t,i){let o=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,...i,detail:t});return this.dispatchEvent(o),o}update(e){let t=tL.get(this.constructor);if(null!=t)for(let{keys:i,method:o,afterFirstUpdate:r}of t){if(r&&!this.hasUpdated)continue;let t=i.filter(t=>e.has(t));t.length&&o.call(this,t)}super.update(e)}};let tN=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,tq=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,tU=[["year",629856e5,31536e6,"yr"],["month",2628e6,2628e6,"mo"],["week",6048e5,6048e5,"wk"],["day",864e5,864e5,"d"],["hour",36e5,36e5,"h"],["minute",6e4,6e4,"m"],["second",1e3,1e3,"s"]],tW=new Map,tH=new Map;function tV(r,s){let a=("number"==typeof r?r:r.getTime())-Date.now();if(!Number.isFinite(a))return"";for(let[r,c,h,p]of tU){let u=Math.abs(a);if(u>=c||1e3===c){if(s){if(null==e&&(e=null!=o?o.resolvedOptions().locale:null!=i?i.resolvedOptions().locale:(o=new Intl.RelativeTimeFormat(t,{localeMatcher:"best fit",numeric:"always",style:"narrow"})).resolvedOptions().locale),"en"===e||e?.startsWith("en-")){let e=Math.floor(u/h);return`${e}${p}`}return(o??=new Intl.RelativeTimeFormat(t,{localeMatcher:"best fit",numeric:"always",style:"narrow"})).format(Math.trunc(a/h),r)}return(i??=new Intl.RelativeTimeFormat(t,{localeMatcher:"best fit",numeric:"auto",style:"long"})).format(Math.trunc(a/h),r)}}return""}function tK(e,i,o,r=!0){if(i=i??void 0,Number.isNaN("number"==typeof e?e:e.getTime()))return"";let s=`${o??""}:${i}`,a=tW.get(s);if(null==a){let e,c=function(e){if(null==e)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};let t=tq.exec(e);if(t?.groups!=null){let{dateStyle:e,timeStyle:i}=t.groups;return{localeMatcher:"best fit",dateStyle:e||"full",timeStyle:i||void 0}}let i={localeMatcher:"best fit"};for(let{groups:t}of e.matchAll(tN))if(null!=t){for(let[e,o]of Object.entries(t))if(null!=o)switch(e){case"year":i.year=4===o.length?"numeric":"2-digit";break;case"month":switch(o.length){case 4:i.month="long";break;case 3:i.month="short";break;case 2:i.month="2-digit";break;case 1:i.month="numeric"}break;case"day":"DD"===o?i.day="2-digit":i.day="numeric";break;case"weekday":switch(o.length){case 4:i.weekday="long";break;case 3:i.weekday="short";break;case 2:i.weekday="narrow"}break;case"hour":i.hour=2===o.length?"2-digit":"numeric",i.hour12="hh"===o||"h"===o;break;case"minute":i.minute=2===o.length?"2-digit":"numeric";break;case"second":i.second=2===o.length?"2-digit":"numeric";break;case"fractionalSecond":i.fractionalSecondDigits=3;break;case"dayPeriod":i.dayPeriod="narrow",i.hour12=!0,i.hourCycle="h12";break;case"timeZoneName":i.timeZoneName=2===o.length?"long":"short"}}return i}(i);e=null==o?t:"system"===o?void 0:[o],a=new Intl.DateTimeFormat(e,c),r&&tW.set(s,a)}if(null==i||tq.test(i))return a.format(e);let c=a.formatToParts(e);return i.replace(tN,(i,s,a,h,p,u,g,m,f,b,v,_,w,x,C)=>{if(null!=s)return s.substring(1,s.length-1);for(let[i,s]of Object.entries(C)){if(null==s)continue;let a=c.find(e=>e.type===i);if("Do"===s&&a?.type==="day")return function(e){let t=e%100;return`${e}${tG[(t-20)%10]??tG[t]??tG[0]}`}(Number(a.value));if("a"===s&&a?.type==="dayPeriod"){let i=(function(e){let i=`${o??""}:time:${e}`,s=tW.get(i);if(null==s){let a;a=null==o?t:"system"===o?void 0:[o],s=new Intl.DateTimeFormat(a,{localeMatcher:"best fit",timeStyle:e}),r&&tW.set(i,s)}return s})("short").formatToParts(e).find(e=>"dayPeriod"===e.type);return` ${(i??a)?.value??""}`}return a?.value??""}return""})}let tG=["th","st","nd","rd"];function tZ(e,i){e??="decimal";let o=`${i??""}:${e}`,r=tH.get(o);if(null==r){let s,a={localeMatcher:"best fit",style:e};s=null==i?t:"system"===i?void 0:[i],r=new Intl.NumberFormat(s,a),tH.set(o,r)}return r.format}function tY(e,t,i){let o;if(null==i)return r??=tZ(),`${r(t)} ${e}${1===t?"":"s"}`;let s=1===t?e:i.plural??`${e}s`;return i.only?s:(0===t?o=i.zero??t:!1===i.format?o=t:null!=i.format?o=i.format(t):(r??=tZ(),o=r(t)),`${o}${i.infix??" "}${s}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let tX=/T/,tJ=/.*\s*?at\s(.+?)\s/,tQ=/^_+/,t0=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(e,t=!1){this.#t={...e,sanitizeKeys:new Set([...t0,...e.sanitizeKeys??[]])},this.#i=t,this.#e=e.createChannel(e.name),this.#o=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(e=>{this.#o=e})}enabled(e){return!!this.isDebugging||0!==this.#o&&(null==e||this.#o<=function(e){switch(e){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(e))}#i=!1;get isDebugging(){return this.#i}#o=0;get logLevel(){var e=this.#o;switch(e){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(tX," ").slice(0,-1)}]`}trace(e,...t){let i;(0!==this.#o&&!(this.#o>1)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.trace(`  ${i??""}${this.#r(!0,t)}`))}debug(e,...t){let i;(0!==this.#o&&!(this.#o>2)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.debug(`  ${i??""}${this.#r(!1,t)}`))}info(e,...t){let i;(0!==this.#o&&!(this.#o>3)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.info(`   ${i??""}${this.#r(!1,t)}`))}warn(e,...t){let i;(0!==this.#o&&!(this.#o>4)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.warn(`${i??""}${this.#r(!1,t)}`))}error(e,t,...i){let o;if((0===this.#o||this.#o>5)&&!this.isDebugging)return;if(null==(o=null==t||"string"==typeof t?t:`${t.prefix} ${i.shift()??""}`)){let t=e instanceof Error?e.stack:void 0;if(t){let e=tJ.exec(t);null!=e&&(o=e[1])}}this.isDebugging;let r=`  ${o??""}${this.#r(!1,i)}`;null!=e?this.#e?.error(String(e),r):this.#e?.error(r)}showOutputChannel(e){this.#e?.show?.(e)}toLoggable(e,t){if(null!=t){let i=this.sanitize(t,e);if(null!=i)return i}if("function"==typeof e)return"<function>";if(null==e||"object"!=typeof e||e instanceof Error)return String(e);if(Array.isArray(e)){let t=e.length>10?e.slice(0,10):e,i=e.length>10?`, \u2026+${e.length-10}`:"";return`[${t.map(e=>this.toLoggable(e)).join(", ")}${i}]`}let i=this.#t?.toLoggable,o=i?.(e);if(null!=o)return o;let r=this.#t?.sanitizeKeys;try{return JSON.stringify(e,(e,t)=>{if(95!==e.charCodeAt(0))return r?.has(e)?this.sanitize(e,t):""===e||"object"!=typeof t||null==t||Array.isArray(t)?t:t instanceof Error?String(t):i?.(t)??t})}catch{return"<error>"}}sanitize(e,t){if(null==t)return;let i=e.replace(tQ,"")||e;if(this.#t?.sanitizeKeys?.has(i))return null!=this.#t.hash?`<${i}:${this.#t.hash("string"==typeof t?t:JSON.stringify(t))}>`:`<${i}>`}#r(e,t){if(0===t.length||e&&(0===this.#o||this.#o>2)&&!this.isDebugging)return"";let i=t.map(e=>this.toLoggable(e)).join(", ");return 0!==i.length?` \u2014 ${i}`:""}};let t1=new Logger,t2=new WeakMap,t5={enabled:e=>t1.enabled(e),log:(e,t,i,...o)=>{switch(e){case"error":t1.error(void 0,t,i,...o);break;case"warn":t?.warn(i,...o);break;case"info":t?.info(i,...o);break;case"debug":default:t?.debug(i,...o);break;case"trace":t?.trace(i,...o)}}},t3=new Map;function t4(e,t){let i=s;s=e.scopeId,t3.set(e.scopeId,e);try{return t()}finally{s=i,t3.delete(e.scopeId)}}function t6(){return null!=s?t3.get(s):void 0}let t7=0x40000000-1;function t8(){let e=0;return{get current(){return e},next:function(){return e===t7&&(e=0),++e},reset:function(){e=0}}}function t9(e){let t=.001*performance.now(),i=Math.floor(t),o=Math.floor(t%1*1e9);return void 0!==e&&(i-=e[0],(o-=e[1])<0&&(i--,o+=1e9)),[i,o]}function ie(e){let[t,i]=t9(e);return 1e3*t+Math.floor(i/1e6)}let it=t8();function ii(e,t,i){var o;let r,s,a={scopeId:e,prevScopeId:t,prefix:i,enabled:e=>t1.enabled(e),addExitInfo:function(...e){(r??=[]).push(...e)},setFailed:function(e){s=e},getExitInfo:function(){return{details:r?.length?` \u2022 ${r.join(", ")}`:void 0,failed:s}}};return io(a,"trace",t1.trace),io(a,"debug",t1.debug),io(a,"info",t1.info),io(a,"warn",t1.warn),Object.defineProperty(o=a,"error",{configurable:!0,enumerable:!0,get:function(){let e=(e,t,...i)=>t1.error(e,o,t,...i);return Object.defineProperty(o,"error",{value:e,writable:!1,enumerable:!0}),e}}),a}function io(e,t,i){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){let o=i.bind(t1,e);return Object.defineProperty(e,t,{value:o,writable:!1,enumerable:!0}),o}})}function ir(e,t,i){if(null!=i){let o=null==t?e.toString(16):`${t.toString(16)} \u2192 ${e.toString(16)}`;return null==o?`[${i.padEnd(13)}]`:`[${i}${o.padStart(13-i.length)}]`}return null==t?`[${e.toString(16).padStart(13)}]`:`[${t.toString(16).padStart(5)} \u2192 ${e.toString(16).padStart(5)}]`}function is(){let e=t6();if(null==e)return;let t=Object.create(e);return t[Symbol.dispose]=()=>{},t}function ia(e,t,i){if(null!=t&&"boolean"!=typeof t)return ii(t.scopeId,t.prevScopeId,`${t.prefix}${e}`);let o=t?t6()?.scopeId:void 0,r=it.next();return ii(r,o,`${ir(r,o,i)} ${e}`)}function il(e,t,i,...o){switch(t){case"trace":t1.trace(e,i,...o);break;case"info":t1.info(e,i,...o);break;default:t1.debug(e,i,...o)}}let LoggerContext=class LoggerContext{constructor(e){this.scope=ia(e,void 0),t1.configure({name:e,createChannel:function(e){let t=t1.isDebugging?function(e){}:function(e){};return{name:e,logLevel:0,trace:t,debug:t,info:t,warn:t,error:t}}},!1)}trace(e,...t){"string"==typeof e?t1.trace(this.scope,e,...t):t1.trace(e,t.shift(),...t)}debug(e,...t){"string"==typeof e?t1.debug(this.scope,e,...t):t1.debug(e,t.shift(),...t)}info(e,...t){"string"==typeof e?t1.info(this.scope,e,...t):t1.info(e,t.shift(),...t)}};let ic=new IpcNotification("home","subscription/didChange"),ih="graph";new IpcCommand(ih,"chooseRepository"),new IpcCommand(ih,"dblclick"),new IpcCommand(ih,"avatars/get"),new IpcCommand(ih,"avatars/proxy"),new IpcCommand(ih,"refs/metadata/get"),new IpcCommand(ih,"rows/get"),new IpcCommand(ih,"pullRequest/openDetails"),new IpcCommand(ih,"row/action"),new IpcCommand(ih,"treemap/file/action"),new IpcCommand(ih,"search/openInView"),new IpcCommand(ih,"search/cancel"),new IpcCommand(ih,"columns/update"),new IpcCommand(ih,"refs/update/visibility"),new IpcCommand(ih,"refs/update/pinned"),new IpcCommand(ih,"filters/update/excludeTypes"),new IpcCommand(ih,"configuration/update"),new IpcCommand(ih,"displayMode/update"),new IpcCommand(ih,"search/update/mode"),new IpcCommand(ih,"filters/update/includedRefs"),new IpcCommand(ih,"filters/reset"),new IpcCommand(ih,"selection/update"),new IpcCommand(ih,"wipDraft/update"),new IpcRequest(ih,"jumpToHead"),new IpcRequest(ih,"chooseRef"),new IpcRequest(ih,"chooseComparison"),new IpcRequest(ih,"chooseAuthor"),new IpcRequest(ih,"chooseFile"),new IpcRequest(ih,"scope/resolve"),new IpcRequest(ih,"rows/ensure"),new IpcRequest(ih,"search/history/get"),new IpcRequest(ih,"search/history/store"),new IpcRequest(ih,"search/history/delete"),new IpcRequest(ih,"counts"),new IpcRequest(ih,"overview/get"),new IpcRequest(ih,"overview/wip/get"),new IpcRequest(ih,"overview/wip/detailed/get"),new IpcRequest(ih,"overview/enrichment/get"),new IpcRequest(ih,"agentSessions/get"),new IpcRequest(ih,"wip/stats/get"),new IpcRequest(ih,"wip/lineStats/get"),new IpcCommand(ih,"wip/watches/sync"),new IpcNotification(ih,"wip/refetch/request"),new IpcRequest(ih,"row/hover/get"),new IpcRequest(ih,"search"),new IpcNotification(ih,"overview/didChange"),new IpcNotification(ih,"agentSessions/didChange"),new IpcNotification(ih,"repositories/integration/didChange"),new IpcNotification(ih,"wipDrafts/didChange"),new IpcNotification(ih,"didChange",!0),new IpcNotification(ih,"configuration/didChange");let id=new IpcNotification(ih,"subscription/didChange");new IpcNotification(ih,"org/settings/didChange"),new IpcNotification(ih,"avatars/didChange"),new IpcNotification(ih,"mcp/didChange"),new IpcNotification(ih,"hooks/didChange"),new IpcNotification(ih,"agents/canInstallClaudeHook/didChange"),new IpcCommand(ih,"graphWalkthrough/banner/close"),new IpcNotification(ih,"graphWalkthrough/banner/didChange"),new IpcNotification(ih,"graphWalkthrough/complete/didChange"),new IpcNotification(ih,"graphWalkthrough/started/didChange"),new IpcNotification(ih,"visualizationsButtonCallout/didChange"),new IpcCommand(ih,"visualizationsButtonCallout/dismiss"),new IpcNotification(ih,"sidebar/activePanel/didRequest"),new IpcNotification(ih,"action/didRequest"),new IpcCommand(ih,"track/overview/shown"),new IpcCommand(ih,"track/scope/changed"),new IpcCommand(ih,"track/details/reviewMode"),new IpcCommand(ih,"track/details/composeMode"),new IpcCommand(ih,"track/details/resolveMode"),new IpcCommand(ih,"track/details/compareMode"),new IpcCommand(ih,"track/details/wipShown"),new IpcNotification(ih,"branchState/didChange"),new IpcNotification(ih,"refs/didChangeMetadata"),new IpcNotification(ih,"columns/didChange"),new IpcNotification(ih,"scrollMarkers/didChange"),new IpcNotification(ih,"refs/didChangeVisibility"),new IpcNotification(ih,"refs/didChangePinned"),new IpcNotification(ih,"rows/didChange"),new IpcNotification(ih,"rows/stats/didChange"),new IpcNotification(ih,"selection/didChange"),new IpcNotification(ih,"compareMode/didRequestOpen"),new IpcNotification(ih,"timeline/didRequestOpenScope"),new IpcNotification(ih,"search/didRequest"),new IpcNotification(ih,"workingTree/didChange"),new IpcNotification(ih,"didSearch"),new IpcNotification(ih,"didFetch"),new IpcNotification(ih,"scope/anchors/didInvalidate"),new IpcNotification(ih,"treemap/didInvalidate"),new IpcNotification(ih,"featurePreview/didStart");let ip=new IpcNotification("timeline","didChange");let PromosContext=class PromosContext{constructor(e){this.disposables=[],this._promos=new Map,this.ipc=e,this.disposables.push(this.ipc.onReceiveMessage(e=>{(ic.is(e)||id.is(e)||ip.is(e))&&this._promos.clear()}))}async getApplicablePromo(e,t){let i=`${e}|${t}`,o=this._promos.get(i);return null==o&&(o=this.ipc.sendRequest(tM,{plan:e,location:t}).then(e=>e.promo,()=>void 0),this._promos.set(i,o)),await o}dispose(){this.disposables.forEach(e=>e.dispose())}};let TelemetryContext=class TelemetryContext{constructor(e){this.disposables=[],this.ipc=e}sendEvent(e){this.ipc.sendCommand(tB,e)}dispose(){this.disposables.forEach(e=>e.dispose())}};function iu(e){return(e=e.toString().toLowerCase()).includes("ms")?parseFloat(e):e.includes("s")?1e3*parseFloat(e):parseFloat(e)}function ig(e,t){return new Promise(i=>{e.addEventListener(t,function o(r){r.target===e&&(e.removeEventListener(t,o),i())})})}(w||(w={})).on=function(e,t,i,o){let r=!1;if("string"==typeof e){let s=function(t){let o=t?.target?.closest(e);null!=o&&i(t,o)};return document.addEventListener(t,s,o??!0),{dispose:()=>{r||(r=!0,document.removeEventListener(t,s,o??!0))}}}let s=function(e){i(e,this)};return e.addEventListener(t,s,o??!1),{dispose:()=>{r||(r=!0,e.removeEventListener(t,s,o??!1))}}};var im=Uint8Array,ib=Uint16Array,iv=Int32Array,i_=new im([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),iy=new im([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),iw=new im([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ix=function(e,t){for(var i=new ib(31),o=0;o<31;++o)i[o]=t+=1<<e[o-1];for(var r=new iv(i[30]),o=1;o<30;++o)for(var s=i[o];s<i[o+1];++s)r[s]=s-i[o]<<5|o;return{b:i,r:r}},ik=ix(i_,2),iC=ik.b,i$=ik.r;iC[28]=258,i$[258]=28;var iS=ix(iy,0),iE=iS.b;iS.r;for(var iA=new ib(32768),iI=0;iI<32768;++iI){var iP=(43690&iI)>>1|(21845&iI)<<1;iP=(61680&(iP=(52428&iP)>>2|(13107&iP)<<2))>>4|(3855&iP)<<4,iA[iI]=((65280&iP)>>8|(255&iP)<<8)>>1}for(var iz=function(e,t,i){for(var o,r=e.length,s=0,a=new ib(t);s<r;++s)e[s]&&++a[e[s]-1];var c=new ib(t);for(s=1;s<t;++s)c[s]=c[s-1]+a[s-1]<<1;if(i){o=new ib(1<<t);var h=15-t;for(s=0;s<r;++s)if(e[s])for(var p=s<<4|e[s],u=t-e[s],g=c[e[s]-1]++<<u,m=g|(1<<u)-1;g<=m;++g)o[iA[g]>>h]=p}else for(o=new ib(r),s=0;s<r;++s)e[s]&&(o[s]=iA[c[e[s]-1]++]>>15-e[s]);return o},iT=new im(288),iI=0;iI<144;++iI)iT[iI]=8;for(var iI=144;iI<256;++iI)iT[iI]=9;for(var iI=256;iI<280;++iI)iT[iI]=7;for(var iI=280;iI<288;++iI)iT[iI]=8;for(var iR=new im(32),iI=0;iI<32;++iI)iR[iI]=5;var iM=iz(iT,9,1),iB=iz(iR,5,1),ij=function(e){for(var t=e[0],i=1;i<e.length;++i)e[i]>t&&(t=e[i]);return t},iO=function(e,t,i){var o=t/8|0;return(e[o]|e[o+1]<<8)>>(7&t)&i},iD=function(e,t){var i=t/8|0;return(e[i]|e[i+1]<<8|e[i+2]<<16)>>(7&t)},iL=function(e,t,i){return(null==t||t<0)&&(t=0),(null==i||i>e.length)&&(i=e.length),new im(e.subarray(t,i))},iF=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],iN=function(e,t,i){var o=Error(t||iF[e]);if(o.code=e,Error.captureStackTrace&&Error.captureStackTrace(o,iN),!i)throw o;return o},iq=function(e,t,i,o){var r=e.length,s=o?o.length:0;if(!r||t.f&&!t.l)return i||new im(0);var a=!i,c=a||2!=t.i,h=t.i;a&&(i=new im(3*r));var p=function(e){var t=i.length;if(e>t){var o=new im(Math.max(2*t,e));o.set(i),i=o}},u=t.f||0,g=t.p||0,m=t.b||0,f=t.l,b=t.d,v=t.m,_=t.n,w=8*r;do{if(!f){u=iO(e,g,1);var x=iO(e,g+1,3);if(g+=3,x)if(1==x)f=iM,b=iB,v=9,_=5;else if(2==x){var C=iO(e,g,31)+257,$=iO(e,g+10,15)+4,S=C+iO(e,g+5,31)+1;g+=14;for(var E=new im(S),A=new im(19),P=0;P<$;++P)A[iw[P]]=iO(e,g+3*P,7);g+=3*$;for(var T=ij(A),M=(1<<T)-1,B=iz(A,T,1),P=0;P<S;){var j=B[iO(e,g,M)];g+=15&j;var O=j>>4;if(O<16)E[P++]=O;else{var D=0,F=0;for(16==O?(F=3+iO(e,g,3),g+=2,D=E[P-1]):17==O?(F=3+iO(e,g,7),g+=3):18==O&&(F=11+iO(e,g,127),g+=7);F--;)E[P++]=D}}var N=E.subarray(0,C),q=E.subarray(C);v=ij(N),_=ij(q),f=iz(N,v,1),b=iz(q,_,1)}else iN(1);else{var O=((g+7)/8|0)+4,U=e[O-4]|e[O-3]<<8,W=O+U;if(W>r){h&&iN(0);break}c&&p(m+U),i.set(e.subarray(O,W),m),t.b=m+=U,t.p=g=8*W,t.f=u;continue}if(g>w){h&&iN(0);break}}c&&p(m+131072);for(var V=(1<<v)-1,K=(1<<_)-1,G=g;;G=g){var D=f[iD(e,g)&V],Y=D>>4;if((g+=15&D)>w){h&&iN(0);break}if(D||iN(2),Y<256)i[m++]=Y;else if(256==Y){G=g,f=null;break}else{var X=Y-254;if(Y>264){var P=Y-257,J=i_[P];X=iO(e,g,(1<<J)-1)+iC[P],g+=J}var Q=b[iD(e,g)&K],ee=Q>>4;Q||iN(3),g+=15&Q;var q=iE[ee];if(ee>3){var J=iy[ee];q+=iD(e,g)&(1<<J)-1,g+=J}if(g>w){h&&iN(0);break}c&&p(m+131072);var et=m+X;if(m<q){var ei=s-q,eo=Math.min(q,et);for(ei+m<0&&iN(3);m<eo;++m)i[m]=o[ei+m]}for(;m<et;++m)i[m]=i[m-q]}}t.l=f,t.p=G,t.b=m,t.f=u,f&&(u=1,t.m=v,t.d=b,t.n=_)}while(!u)return m!=i.length&&a?iL(i,0,m):i.subarray(0,m)},iU=new im(0),iW="u">typeof TextDecoder&&new TextDecoder;try{iW.decode(iU,{stream:!0})}catch{}var iH=function(e){for(var t="",i=0;;){var o=e[i++],r=(o>127)+(o>223)+(o>239);if(i+r>e.length)return{s:t,r:iL(e,i-1)};r?3==r?t+=String.fromCharCode(55296|(o=((15&o)<<18|(63&e[i++])<<12|(63&e[i++])<<6|63&e[i++])-65536)>>10,56320|1023&o):1&r?t+=String.fromCharCode((31&o)<<6|63&e[i++]):t+=String.fromCharCode((15&o)<<12|(63&e[i++])<<6|63&e[i++]):t+=String.fromCharCode(o)}};function iV(e,t){if(t){for(var i="",o=0;o<e.length;o+=16384)i+=String.fromCharCode.apply(null,e.subarray(o,o+16384));return i}if(iW)return iW.decode(e);var r=iH(e),s=r.s,i=r.r;return i.length&&iN(8),s}"function"==typeof queueMicrotask&&queueMicrotask;let iK=/\(([\s\S]*)\)/,iG=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,iZ=/\s?=.*$/;function iY(e,t){return e?.status==="fulfilled"?e.value:t}function iX(e){var t,i;let o,r,s,a,c,h,p,u,g;return t="debug",c=!1,h=!0,null!=(i=e)&&({args:o,when:r,exit:s,prefix:a,onlyExit:c=!1,timing:h=!0}=i),p="object"==typeof h?h.warnAfter:1500,u=!1!==h||"object"==typeof c&&c.after>0,g="trace"===t?t1.trace:"debug"===t?t1.debug:t1.info,(e,i,h)=>{let m,f;if("function"==typeof h.value?(m=h.value,f="value"):"function"==typeof h.get&&(m=h.get,f="get"),null==m||null==f)throw Error("Not supported");let b=null==o?function(e){if("function"!=typeof e)throw Error("Not supported");if(0===e.length)return[];let t=Function.prototype.toString.call(e),i=(t=(t=t.replace(iG,"")||t).slice(0,t.indexOf("{"))).indexOf("("),o=t.indexOf(")");i=i>=0?i+1:0,o=o>0?o:t.indexOf("="),t=t.slice(i,o),t=`(${t})`;let r=iK.exec(t);return null!=r?r[1].split(",").map(e=>e.trim().replace(iZ,"")):[]}(m):[];h[f]=function(...e){let h;if(!t1.enabled()||null!=r&&!r.apply(this,e))return m.apply(this,e);let f=t1.enabled(t),v=is(),_=v?.scopeId,w=it.next(),x=this!=null?function(e){let t;if("function"==typeof e){if(null==(t=e.prototype?.constructor))return e.name}else t=e.constructor;let i=t?.name??"",o=i.indexOf("_");-1!==o&&(i=i.substring(o+1));let r=t;for(;null!=r;){let t=t2.get(r);if(null!=t)return t(e,i);r=Object.getPrototypeOf(r)}return i}(this):void 0,C=x?`${ir(w,_)} ${x}.${i}`:`${ir(w,_)} ${i}`;null!=a&&(C=a({id:w,instance:this,instanceName:x??"",name:i,prefix:C},...e));let $=ii(w,_,C),S=!1,E=()=>(S||(S=!0,h=function(e,t,i){if(!1===e||!t.length)return;if("function"==typeof e){let i=e(...t);if(!1===i)return;let o="";for(let[e,t]of Object.entries(i))o.length&&(o+=", "),o+=`${e}=${t1.toLoggable(t,e)}`;return o||void 0}let o="",r=-1;for(let e of t){let t=i[++r];o.length&&(o+=", "),o+=t?`${t}=${t1.toLoggable(e,t)}`:t1.toLoggable(e)}return o||void 0}(o,e,b)),h);if(!c&&f){let e=E();g.call(t1,e?`${C}(${e})`:C)}if(c||u||null!=s){let t=u?t9():void 0,i=e=>{let i=void 0!==t?` [${ie(t)}ms]`:"",o=$.getExitInfo();if(c){let t=E();t1.error(e,t?`${C}(${t})`:C,o?.details?`failed${o.details}${i}`:`failed${i}`)}else t1.error(e,C,o?.details?`failed${o.details}${i}`:`failed${i}`)},o=e=>{let i,o,r,a;null!=t?(i=ie(t))>p?(o=t1.warn,r=` [*${i}ms] (slow)`):(o=g,r=` [${i}ms]`):(r="",o=g);let h=$.getExitInfo();if(null!=s)if("function"==typeof s)try{a=s(e)}catch(e){a=`@log.exit error: ${e}`}else!0===s&&(a=`returned ${t1.toLoggable(e)}`);else h?.failed?(a=h.failed,o=(e,...t)=>t1.error(null,e,...t)):a="completed";if(f||o!==g){let e=E();c?(!0===c||0===c.after||i>c.after)&&o.call(t1,e?`${C}(${e}) ${a}${h?.details||""}${r}`:`${C} ${a}${h?.details||""}${r}`):o.call(t1,e?`${C}(${e}) ${a}${h?.details||""}${r}`:`${C} ${a}${h?.details||""}${r}`)}};return t4($,()=>{var t;let r;try{r=m.apply(this,e)}catch(e){throw i(e),e}return null!=r&&null!=(t=r)&&(t instanceof Promise||"function"==typeof t?.then)?r.then(o,i).catch(()=>{}):o(r),r})}return t4($,()=>m.apply(this,e))}}}globalThis.scheduler?.yield?.bind(globalThis.scheduler),Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(e,t,...i){let o;this._stopped=!1,this.logScope=null!=e&&"string"!=typeof e?e:ia(e??"",!1,t?.scopeLabel);let r=t?.log;if(o=null==r||!0===r?{}:!1===r||r.onlyExit?void 0:r,this.logLevel=("object"==typeof r?r.level:void 0)??"debug",this.logProvider=t?.provider??t5,this._time=t9(),null!=o){if(!this.logProvider.enabled(this.logLevel))return;i.length?this.logProvider.log(this.logLevel,this.logScope,`${o.message??""}${o.suffix??""}`,...i):this.logProvider.log(this.logLevel,this.logScope,`${o.message??""}${o.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return ie(this._time)}log(e){this.logCore(e,!1)}restart(e){this.logCore(e,!0),this._time=t9(),this._stopped=!1}stop(e){this._stopped||(this.restart(e),this._stopped=!0)}logCore(e,t){if(!this.logProvider.enabled(this.logLevel))return;if(!t)return void this.logProvider.log(this.logLevel,this.logScope,`${e?.message??""}${e?.suffix??""}`);let i=ie(this._time),o=e?.message??"";this.logProvider.log(i>250?"warn":this.logLevel,this.logScope,`${o?`${o} `:""}[${i}ms]${e?.suffix??""}`)}};(()=>{let e;var t,i,o={975:e=>{function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,o="",r=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)i=e.charCodeAt(c);else{if(47===i)break;i=47}if(47===i){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(o.length<2||2!==r||46!==o.charCodeAt(o.length-1)||46!==o.charCodeAt(o.length-2)){if(o.length>2){var h=o.lastIndexOf("/");if(h!==o.length-1){-1===h?(o="",r=0):r=(o=o.slice(0,h)).length-1-o.lastIndexOf("/"),s=c,a=0;continue}}else if(2===o.length||1===o.length){o="",r=0,s=c,a=0;continue}}t&&(o.length>0?o+="/..":o="..",r=2)}else o.length>0?o+="/"+e.slice(s+1,c):o=e.slice(s+1,c),r=c-s-1;s=c,a=0}else 46===i&&-1!==a?++a:a=-1}return o}var o={resolve:function(){for(var e,o,r="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?e=arguments[a]:(void 0===o&&(o=process.cwd()),e=o),t(e),0!==e.length&&(r=e+"/"+r,s=47===e.charCodeAt(0));return r=i(r,!s),s?r.length>0?"/"+r:"/":r.length>0?r:"."},normalize:function(e){if(t(e),0===e.length)return".";var o=47===e.charCodeAt(0),r=47===e.charCodeAt(e.length-1);return 0!==(e=i(e,!o)).length||o||(e="."),e.length>0&&r&&(e+="/"),o?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var r=arguments[i];t(r),r.length>0&&(void 0===e?e=r:e+="/"+r)}return void 0===e?".":o.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=o.resolve(e))===(i=o.resolve(i)))return"";for(var r=1;r<e.length&&47===e.charCodeAt(r);++r);for(var s=e.length,a=s-r,c=1;c<i.length&&47===i.charCodeAt(c);++c);for(var h=i.length-c,p=a<h?a:h,u=-1,g=0;g<=p;++g){if(g===p){if(h>p){if(47===i.charCodeAt(c+g))return i.slice(c+g+1);if(0===g)return i.slice(c+g)}else a>p&&(47===e.charCodeAt(r+g)?u=g:0===g&&(u=0));break}var m=e.charCodeAt(r+g);if(m!==i.charCodeAt(c+g))break;47===m&&(u=g)}var f="";for(g=r+u+1;g<=s;++g)g!==s&&47!==e.charCodeAt(g)||(0===f.length?f+="..":f+="/..");return f.length>0?f+i.slice(c+u):(c+=u,47===i.charCodeAt(c)&&++c,i.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),o=47===i,r=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(i=e.charCodeAt(a))){if(!s){r=a;break}}else s=!1;return -1===r?o?"/":".":o&&1===r?"//":e.slice(0,r)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var o,r=0,s=-1,a=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var c=i.length-1,h=-1;for(o=e.length-1;o>=0;--o){var p=e.charCodeAt(o);if(47===p){if(!a){r=o+1;break}}else -1===h&&(a=!1,h=o+1),c>=0&&(p===i.charCodeAt(c)?-1==--c&&(s=o):(c=-1,s=h))}return r===s?s=h:-1===s&&(s=e.length),e.slice(r,s)}for(o=e.length-1;o>=0;--o)if(47===e.charCodeAt(o)){if(!a){r=o+1;break}}else -1===s&&(a=!1,s=o+1);return -1===s?"":e.slice(r,s)},extname:function(e){t(e);for(var i=-1,o=0,r=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47!==h)-1===r&&(s=!1,r=c+1),46===h?-1===i?i=c:1!==a&&(a=1):-1!==i&&(a=-1);else if(!s){o=c+1;break}}return -1===i||-1===r||0===a||1===a&&i===r-1&&i===o+1?"":e.slice(i,r)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return i;var o,r=e.charCodeAt(0),s=47===r;s?(i.root="/",o=1):o=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,g=0;u>=o;--u)if(47!==(r=e.charCodeAt(u)))-1===h&&(p=!1,h=u+1),46===r?-1===a?a=u:1!==g&&(g=1):-1!==a&&(g=-1);else if(!p){c=u+1;break}return -1===a||-1===h||0===g||1===g&&a===h-1&&a===c+1?-1!==h&&(i.base=i.name=0===c&&s?e.slice(1,h):e.slice(c,h)):(0===c&&s?(i.name=e.slice(1,a),i.base=e.slice(1,h)):(i.name=e.slice(c,a),i.base=e.slice(c,h)),i.ext=e.slice(a,h)),c>0?i.dir=e.slice(0,c-1):s&&(i.dir="/"),i},sep:"/",delimiter:":",win32:null,posix:null};o.posix=o,e.exports=o}},r={};function s(e){var t=r[e];if(void 0!==t)return t.exports;var i=r[e]={exports:{}};return o[e](i,i.exports,s),i.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(s.r(a),s.d(a,{URI:()=>l,Utils:()=>i}),"object"==typeof process)?e="win32"===process.platform:"object"==typeof navigator&&(e=navigator.userAgent.indexOf("Windows")>=0);let c=/^\w[\w\d+.-]*$/,h=/^\//,p=/^\/\//;function u(e,t){if(!e.scheme&&t)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!c.test(e.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(e.path){if(e.authority){if(!h.test(e.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(e.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let g=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(e){return e instanceof l||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString}scheme;authority;path;query;fragment;constructor(e,t,i,o,r,s=!1){"object"==typeof e?(this.scheme=e.scheme||"",this.authority=e.authority||"",this.path=e.path||"",this.query=e.query||"",this.fragment=e.fragment||""):(this.scheme=e||s?e:"file",this.authority=t||"",this.path=function(e,t){switch(e){case"https":case"http":case"file":t?"/"!==t[0]&&(t="/"+t):t="/"}return t}(this.scheme,i||""),this.query=o||"",this.fragment=r||"",u(this,s))}get fsPath(){return _(this,!1)}with(e){if(!e)return this;let{scheme:t,authority:i,path:o,query:r,fragment:s}=e;return void 0===t?t=this.scheme:null===t&&(t=""),void 0===i?i=this.authority:null===i&&(i=""),void 0===o?o=this.path:null===o&&(o=""),void 0===r?r=this.query:null===r&&(r=""),void 0===s?s=this.fragment:null===s&&(s=""),t===this.scheme&&i===this.authority&&o===this.path&&r===this.query&&s===this.fragment?this:new d(t,i,o,r,s)}static parse(e,t=!1){let i=g.exec(e);return i?new d(i[2]||"",$(i[4]||""),$(i[5]||""),$(i[7]||""),$(i[9]||""),t):new d("","","","","")}static file(t){let i="";if(e&&(t=t.replace(/\\/g,"/")),"/"===t[0]&&"/"===t[1]){let e=t.indexOf("/",2);-1===e?(i=t.substring(2),t="/"):(i=t.substring(2,e),t=t.substring(e)||"/")}return new d("file",i,t,"","")}static from(e){let t=new d(e.scheme,e.authority,e.path,e.query,e.fragment);return u(t,!0),t}toString(e=!1){return w(this,e)}toJSON(){return this}static revive(e){if(e){if(e instanceof l)return e;{let t=new d(e);return t._formatted=e.external,t._fsPath=e._sep===m?e.fsPath:null,t}}return e}};let m=e?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=_(this,!1)),this._fsPath}toString(e=!1){return e?w(this,!0):(this._formatted||(this._formatted=w(this,!1)),this._formatted)}toJSON(){let e={$mid:1};return this._fsPath&&(e.fsPath=this._fsPath,e._sep=m),this._formatted&&(e.external=this._formatted),this.path&&(e.path=this.path),this.scheme&&(e.scheme=this.scheme),this.authority&&(e.authority=this.authority),this.query&&(e.query=this.query),this.fragment&&(e.fragment=this.fragment),e}};let f={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function b(e,t,i){let o,r=-1;for(let s=0;s<e.length;s++){let a=e.charCodeAt(s);if(a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||45===a||46===a||95===a||126===a||t&&47===a||i&&91===a||i&&93===a||i&&58===a)-1!==r&&(o+=encodeURIComponent(e.substring(r,s)),r=-1),void 0!==o&&(o+=e.charAt(s));else{void 0===o&&(o=e.substr(0,s));let t=f[a];void 0!==t?(-1!==r&&(o+=encodeURIComponent(e.substring(r,s)),r=-1),o+=t):-1===r&&(r=s)}}return -1!==r&&(o+=encodeURIComponent(e.substring(r))),void 0!==o?o:e}function v(e){let t;for(let i=0;i<e.length;i++){let o=e.charCodeAt(i);35===o||63===o?(void 0===t&&(t=e.substr(0,i)),t+=f[o]):void 0!==t&&(t+=e[i])}return void 0!==t?t:e}function _(t,i){let o;return o=t.authority&&t.path.length>1&&"file"===t.scheme?`//${t.authority}${t.path}`:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&90>=t.path.charCodeAt(1)||t.path.charCodeAt(1)>=97&&122>=t.path.charCodeAt(1))&&58===t.path.charCodeAt(2)?i?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,e&&(o=o.replace(/\//g,"\\")),o}function w(e,t){let i=t?v:b,o="",{scheme:r,authority:s,path:a,query:c,fragment:h}=e;if(r&&(o+=r,o+=":"),(s||"file"===r)&&(o+="/",o+="/"),s){let e=s.indexOf("@");if(-1!==e){let t=s.substr(0,e);s=s.substr(e+1),-1===(e=t.lastIndexOf(":"))?o+=i(t,!1,!1):(o+=i(t.substr(0,e),!1,!1),o+=":",o+=i(t.substr(e+1),!1,!0)),o+="@"}-1===(e=(s=s.toLowerCase()).lastIndexOf(":"))?o+=i(s,!1,!0):(o+=i(s.substr(0,e),!1,!0),o+=s.substr(e))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2)){let e=a.charCodeAt(1);e>=65&&e<=90&&(a=`/${String.fromCharCode(e+32)}:${a.substr(3)}`)}else if(a.length>=2&&58===a.charCodeAt(1)){let e=a.charCodeAt(0);e>=65&&e<=90&&(a=`${String.fromCharCode(e+32)}:${a.substr(2)}`)}o+=i(a,!0,!1)}return c&&(o+="?",o+=i(c,!1,!1)),h&&(o+="#",o+=t?h:b(h,!1,!1)),o}let C=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function $(e){return e.match(C)?e.replace(C,e=>(function e(t){try{return decodeURIComponent(t)}catch{return t.length>3?t.substr(0,3)+e(t.substr(3)):t}})(e)):e}var S=s(975);let E=S.posix||S;(t=i||(i={})).joinPath=function(e,...t){return e.with({path:E.join(e.path,...t)})},t.resolvePath=function(e,...t){let i=e.path,o=!1;"/"!==i[0]&&(i="/"+i,o=!0);let r=E.resolve(i,...t);return o&&"/"===r[0]&&!e.authority&&(r=r.substring(1)),e.with({path:r})},t.dirname=function(e){if(0===e.path.length||"/"===e.path)return e;let t=E.dirname(e.path);return 1===t.length&&46===t.charCodeAt(0)&&(t=""),e.with({path:t})},t.basename=function(e){return E.basename(e.path)},t.extname=function(e){return E.extname(e.path)},x=a})();let{URI:iJ,Utils:iQ}=x;function i0(e,t){return JSON.parse(e,(e,i)=>(function(e,t){let i=function(e){if("object"!=typeof e||null==e)return;let t=e.__ipc;if(null!=t)switch(t){case"date":return"number"==typeof e.value?e:void 0;case"promise":return"object"==typeof e.value&&"string"==typeof e.value.id&&"string"==typeof e.value.method?e:void 0;case"uri":return"object"==typeof e.value&&"string"==typeof e.value?.scheme?e:void 0;default:return}}(e);if(null==i)return e;switch(i.__ipc){case"date":return new Date(i.value);case"promise":return t(i.value);case"uri":return iJ.revive(i.value)}})(i,t))}let i1="__supertalk_rpc__";function i2(e){return"object"==typeof e&&null!==e&&i1 in e&&!0===e[i1]}let i5=new TextEncoder,i3=new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._type="fire"}static{this._noop=function(){}}get event(){return this._event??=(e,t,i)=>{if(this._disposed)return{dispose:Emitter._noop};this._target??=new EventTarget;let o=i=>{try{e.call(t,i.detail)}catch{}};this._target.addEventListener(Emitter._type,o);let r={dispose:()=>{r.dispose=Emitter._noop,this._target?.removeEventListener(Emitter._type,o)}};return i?.push(r),r},this._event}fire(e){this._disposed||this._target?.dispatchEvent(new CustomEvent(Emitter._type,{detail:e}))}dispose(){this._disposed=!0,this._target=void 0}};var i4=Object.defineProperty,i6=Object.getOwnPropertyDescriptor,i7=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),i8=e=>{throw TypeError(e)},i9=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?i6(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&i4(t,i,s),s};function oe(){return a??=null!=c?c():acquireVsCodeApi()}let ot=t8();function oi(){return`webview:${ot.next()}`}let oo=`wv-${Math.random().toString(36).slice(2,10)}`,or=Date.now(),os=class{constructor(e){this.appName=e,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=oe(),this._disposable=w.on(window,"message",e=>this.onMessageReceived(e))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(e){var t,i,o,r,a,c,h,p,u=[];try{if(i2(e.data))return;let r=e.data,a=((e,t,i)=>{if(null!=t){var o,r;"object"!=typeof t&&"function"!=typeof t&&i8("Object expected"),i&&(o=t[i7("asyncDispose")]),void 0===o&&(o=t[i7("dispose")],i&&(r=o)),"function"!=typeof o&&i8("Object not disposable"),r&&(o=function(){try{r.call(this)}catch(e){return Promise.reject(e)}}),e.push([i,o,t])}else i&&e.push([i]);return t})(u,function(e,t,i){var o,r;let a,c,h;if(!t1.enabled())return;let p=(o=i?.scope??!0,r=i?.scopeLabel,c=t6(),s=(h=ia(e,o,r)).scopeId,t3.set(h.scopeId,h),h[Symbol.dispose]=()=>{let e;e=h?.scopeId??s,null!=e&&t3.delete(e),s=c?.scopeId},h);if(!t)return p;let u="debug",g=!1;"object"==typeof t&&(u=t.level??u,a=t.message,g=!0===t.onlyExit);let m=t9();g||il(p,u,a??"");let f=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let e=ie(m),t=` [${e}ms]`,i=p.getExitInfo(),o=i.failed??"completed";null!=i.failed?t1.error(null,p,`${o}${i.details??""}${t}`):il(p,u,`${o}${i.details??""}${t}`),f()},p}(`(e=${r.id}|${r.method})`,void 0,{scope:is()})),c=function(e,t,...i){let o=("object"==typeof t?.log?t.log.level:void 0)??"info";return(t?.provider??t5).enabled(o)?new Stopwatch(e,t,...i):void 0}(a,{log:{onlyExit:!0,level:"debug"}});if(r.compressed&&r.params instanceof Uint8Array){if("deflate"===r.compressed)try{r.params=iV((o=r.params,iq(o,{i:2},void 0,void 0)))}catch(e){r.params=iV(r.params)}else r.params=iV(r.params);c?.restart({message:`\u2022 decompressed (${r.compressed}) serialized params`})}if("string"==typeof r.params?(r.params=i0(r.params,e=>this.getResponsePromise(e.method,e.id)),c?.stop({message:"• deserialized params"})):null==r.params?c?.stop({message:"• no params"}):c?.stop({message:"• invalid params"}),a?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-r.timestamp}ms`),null!=r.completionId){let e=(t=r.method,i=r.completionId,`${t}|${i}`);this._pendingHandlers.get(e)?.(r);return}this._onReceiveMessage.fire(r)}catch(e){var g=e,m=!0}finally{r=g,a=m,c="function"==typeof SuppressedError?SuppressedError:function(e,t,i,o){return(o=Error(i)).name="SuppressedError",o.error=e,o.suppressed=t,o},h=e=>r=a?new c(e,r,"An error was suppressed during disposal"):(a=!0,e),(p=e=>{for(;e=u.pop();)try{var t=e[1]&&e[1].call(e[2]);if(e[0])return Promise.resolve(t).then(p,e=>(h(e),p()))}catch(e){h(e)}if(a)throw r})()}}deserializeIpcData(e){return i0(e,e=>this.getResponsePromise(e.method,e.id))}sendCommand(e,t){let i=oi();this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now()})}async sendRequest(e,t){let i=oi(),o=this.getResponsePromise(e.response.method,i);return this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now(),completionId:i}),o}getResponsePromise(e,t){return new Promise((i,o)=>{var r,s;let a,c=(r=e,s=t,`${r}|${s}`);function h(){clearTimeout(a),a=void 0,this._pendingHandlers.delete(c)}a=setTimeout(()=>{h.call(this),o(Error(`Timed out waiting for completion of ${c}`))},(t1.isDebugging?60:5)*6e4),this._pendingHandlers.set(c,e=>{if(h.call(this),e.method===tj.method){let t=e.params;"rejected"===t.status?queueMicrotask(()=>o(Error(t.reason))):queueMicrotask(()=>i(t.value))}else queueMicrotask(()=>i(e.params))})})}setPersistedState(e){this._api.setState(e)}updatePersistedState(e){let t=this._api.getState();null!=t&&"object"==typeof t?(t={...t,...e},this._api.setState(t)):t=e,this.setPersistedState(t)}postMessage(e){this._api.postMessage(e)}};function on(e,t){let i=Math.pow(10,t);return Math.round(e*i)/i}i9([iX({args:e=>({e:`${e.data.id}|${e.data.method}`})})],os.prototype,"onMessageReceived",1),i9([iX({args:e=>({commandType:e.method})})],os.prototype,"sendCommand",1),i9([iX({args:e=>({requestType:e.method})})],os.prototype,"sendRequest",1),i9([iX({args:e=>({e:`${e.id}, method=${e.method}`})})],os.prototype,"postMessage",1),os=i9([(b=e=>`${e.appName}(HostIpc)`,e=>void t2.set(e,b))],os);let RGBA=class RGBA{constructor(e,t,i,o=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,e)),this.g=0|Math.min(255,Math.max(0,t)),this.b=0|Math.min(255,Math.max(0,i)),this.a=on(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}};let HSLA=class HSLA{constructor(e,t,i,o){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=on(Math.max(Math.min(1,t),0),3),this.l=on(Math.max(Math.min(1,i),0),3),this.a=on(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.l===t.l&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,o=e.b/255,r=e.a,s=Math.max(t,i,o),a=Math.min(t,i,o),c=0,h=0,p=(a+s)/2,u=s-a;if(u>0){switch(h=Math.min(p<=.5?u/(2*p):u/(2-2*p),1),s){case t:c=(i-o)/u+6*(i<o);break;case i:c=(o-t)/u+2;break;case o:c=(t-i)/u+4}c*=60,c=Math.round(c)}return new HSLA(c,h,p,r)}static _hue2rgb(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e}static toRGBA(e){let t,i,o,r=e.h/360,{s,l:a,a:c}=e;if(0===s)t=i=o=a;else{let e=a<.5?a*(1+s):a+s-a*s,c=2*a-e;t=HSLA._hue2rgb(c,e,r+1/3),i=HSLA._hue2rgb(c,e,r),o=HSLA._hue2rgb(c,e,r-1/3)}return new RGBA(Math.round(255*t),Math.round(255*i),Math.round(255*o),c)}};let HSVA=class HSVA{constructor(e,t,i,o){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=on(Math.max(Math.min(1,t),0),3),this.v=on(Math.max(Math.min(1,i),0),3),this.a=on(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.v===t.v&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,o=e.b/255,r=Math.max(t,i,o),s=r-Math.min(t,i,o);return new HSVA(Math.round(60*(0===s?0:r===t?((i-o)/s%6+6)%6:r===i?(o-t)/s+2:(t-i)/s+4)),0===r?0:s/r,r,e.a)}static toRGBA(e){let{h:t,s:i,v:o,a:r}=e,s=o*i,a=s*(1-Math.abs(t/60%2-1)),c=o-s,[h,p,u]=[0,0,0];return t<60?(h=s,p=a):t<120?(h=a,p=s):t<180?(p=s,u=a):t<240?(p=a,u=s):t<300?(h=a,u=s):t<=360&&(h=s,u=a),new RGBA(h=Math.round((h+c)*255),p=Math.round((p+c)*255),u=Math.round((u+c)*255),r)}};function oa(e,t){return t.getPropertyValue(e).trim()}let Color=class Color{static from(e){return e instanceof Color?e:parseColor(e)||Color.red}static fromCssVariable(e,t){return parseColor(oa(e,t))||Color.red}static fromHex(e){return parseHexColor(e)||Color.red}static equals(e,t){return!e&&!t||!!e&&!!t&&e.equals(t)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(e){if(e)if(e instanceof RGBA)this.rgba=e;else if(e instanceof HSLA)this._hsla=e,this.rgba=HSLA.toRGBA(e);else if(e instanceof HSVA)this._hsva=e,this.rgba=HSVA.toRGBA(e);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(e){return null!=e&&!!e&&RGBA.equals(this.rgba,e.rgba)&&HSLA.equals(this.hsla,e.hsla)&&HSVA.equals(this.hsva,e.hsva)}getRelativeLuminance(){return on(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(e){let t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}luminance(e){return luminance(this,e)}getContrastRatio(e){let t=this.getRelativeLuminance(),i=e.getRelativeLuminance();return t>i?(t+.05)/(i+.05):(i+.05)/(t+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(e){return this.getRelativeLuminance()>e.getRelativeLuminance()}isDarkerThan(e){return this.getRelativeLuminance()<e.getRelativeLuminance()}lighten(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*e,this.hsla.a))}darken(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*e,this.hsla.a))}transparent(e){let{r:t,g:i,b:o,a:r}=this.rgba;return new Color(new RGBA(t,i,o,r*e))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(e){let t=e.rgba,i=this.rgba.a,o=t.a,r=i+o*(1-i);return r<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*i/r+t.r*o*(1-i)/r,this.rgba.g*i/r+t.g*o*(1-i)/r,this.rgba.b*i/r+t.b*o*(1-i)/r,r))}mix(e,t){return mixColors(this,e,t)}makeOpaque(e){if(this.isOpaque()||1!==e.rgba.a)return this;let{r:t,g:i,b:o,a:r}=this.rgba;return new Color(new RGBA(e.rgba.r-r*(e.rgba.r-t),e.rgba.g-r*(e.rgba.g-i),e.rgba.b-r*(e.rgba.b-o),1))}flatten(...e){let t=e.reduceRight((e,t)=>Color._flatten(t,e));return Color._flatten(this,t)}static _flatten(e,t){let i=1-e.rgba.a;return new Color(new RGBA(i*t.rgba.r+e.rgba.a*e.rgba.r,i*t.rgba.g+e.rgba.a*e.rgba.g,i*t.rgba.b+e.rgba.a*e.rgba.b))}toString(){return this._toString||(this._toString=function(e){return e.isOpaque()?`#${ol(e.rgba.r)}${ol(e.rgba.g)}${ol(e.rgba.b)}`:`rgba(${e.rgba.r}, ${e.rgba.g}, ${e.rgba.b}, ${Number(e.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(e,t,i){if(e.isLighterThan(t))return e;i=i||.5;let o=e.getRelativeLuminance(),r=t.getRelativeLuminance();return i=i*(r-o)/r,e.lighten(i)}static getDarkerColor(e,t,i){if(e.isDarkerThan(t))return e;i=i||.5;let o=e.getRelativeLuminance(),r=t.getRelativeLuminance();return i=i*(o-r)/o,e.darken(i)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function ol(e){let t=e.toString(16);return 2!==t.length?`0${t}`:t}let oc=new Emitter,oh=oc.event;function od(e){let t=document.documentElement,i=window.getComputedStyle(t),o=document.body.classList,r=o.contains("vscode-light")||o.contains("vscode-high-contrast-light"),s=o.contains("vscode-high-contrast")||o.contains("vscode-high-contrast-light"),a=oa("--vscode-editor-background",i),c=oa("--vscode-editor-foreground",i);return c||(c=oa("--vscode-foreground",i)),{colors:{background:a,foreground:c},computedStyle:i,isLightTheme:r,isHighContrastTheme:s,isInitializing:null==e}}var op=Object.defineProperty,ou=Object.getOwnPropertyDescriptor,og=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?ou(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&op(t,i,s),s};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(e){let t=JSON.parse(tP.decode(function(e){let t=globalThis.atob(e),i=t.length,o=new Uint8Array(i),r=0,s=i-i%8;for(;r<s;r+=8)o[r]=t.charCodeAt(r),o[r+1]=t.charCodeAt(r+1),o[r+2]=t.charCodeAt(r+2),o[r+3]=t.charCodeAt(r+3),o[r+4]=t.charCodeAt(r+4),o[r+5]=t.charCodeAt(r+5),o[r+6]=t.charCodeAt(r+6),o[r+7]=t.charCodeAt(r+7);for(;r<i;r++)o[r]=t.charCodeAt(r);return o}(e))),i=t.webviewId,o=t.webviewInstanceId;this._webview={webviewId:i,webviewInstanceId:o,createCommandLink:(e,t)=>{var r;return e.endsWith(":")&&(e=`${e}${i.split(".").at(-1)}`),r=e,`command:${r}?${encodeURIComponent(JSON.stringify({webview:i,webviewInstance:o,...t}))}`}}}connectedCallback(){let e,t,i,o,r;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new os(this.name),this.disposables.push(((e=new MutationObserver(e=>{oc.fire(od(e))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>e.disconnect()})),null!=this.onThemeUpdated&&(this.onThemeUpdated(od()),this.disposables.push(oh(this.onThemeUpdated,this))),this.disposables.push(this._ipc.onReceiveMessage(e=>{switch(!0){case tO.is(e):this.onWebviewFocusChanged?.(e.params.focused),window.dispatchEvent(new CustomEvent(e.params.focused?"webview-focus":"webview-blur"));break;case tD.is(e):this.onWebviewVisibilityChanged?.(e.params.visible),window.dispatchEvent(new CustomEvent(e.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(o=0,r=function(e){let t,i,o,r,s,a,c,h,p,u,g=0,m="leading"===(a??="trailing")||"both"===a,f="trailing"===a||"both"===a;function b(){if(null!=t){g=Date.now();let i=t,r=u;return u=void 0,t=void 0,o=e.apply(r,i)}}function v(){null!=r&&(clearTimeout(r),r=void 0)}function _(){null!=s&&(clearTimeout(s),s=void 0)}function w(){v(),_(),u=void 0,t=void 0,i=void 0,g=0}function x(...e){if(h?.aborted)return;let a=Date.now();null!=p&&null!=t?t=p(t,e):(u=this,t=e);let _=null==r&&null==s;i=a,v();let C=Date.now();if(i=C,r=setTimeout(()=>{r=void 0,function e(){let t,o,s=Date.now();if(t=s-(i??0),o=s-g,null==i||t>=150||t<0||null!=c&&o>=c){f&&b(),w();return}r=setTimeout(()=>{r=void 0,e()},150-(s-(i??0)))}()},150),null!=c&&!s){0===g&&(g=C);let e=c-(C-g);e>0?s=setTimeout(()=>{s=void 0,f&&null!=t&&b(),g=Date.now()},e):(f&&null!=t&&b(),w())}return m&&_?b():o}return x.cancel=w,x.flush=function(){return v(),_(),b()},x.pending=function(){return null!=r||null!=s},h?.addEventListener("abort",w,{once:!0}),x}(e=>{let t=`webview:${++o}`,i=document.hasFocus();e.focused=i,i||(e.inputFocused=!1),oe().postMessage({id:t,scope:tR.scope,method:tR.method,params:e,compressed:!1,timestamp:Date.now()})}),{onFocusIn:e=>{let o=e.composedPath().some(e=>"INPUT"===e.tagName);(!0!==t||i!==o)&&(t=!0,i=o,r({focused:!0,inputFocused:o}))},onFocusOut:e=>{r({focused:!1,inputFocused:!1})}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(e=>{e.href===e.title&&e.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(e=>e.dispose())}render(){return ex`<slot></slot>`}};og([ej({type:String})],GlWebviewApp.prototype,"name",2),og([ej({type:String})],GlWebviewApp.prototype,"placement",2),og([tA({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),og([tA({context:"logger"})],GlWebviewApp.prototype,"_logger",2),og([tA({context:"promos"})],GlWebviewApp.prototype,"_promos",2),og([tA({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),og([tA({context:"webview"})],GlWebviewApp.prototype,"_webview",2);let om=ta(GlWebviewApp);let SignalWatcherWebviewApp=class SignalWatcherWebviewApp extends om{connectedCallback(){super.connectedCallback?.(),this._ipc.sendRequest(tT,{bootstrap:!1,clientId:oo,clientLoadedAt:or})}};let VsCodeStorage=class VsCodeStorage{constructor(){this._api=oe()}get(){return this._api.getState()}set(e){this._api.setState(e)}};function of(){return{storage:new VsCodeStorage,createEndpoint:()=>{let e,t;return e=oe(),t=new Map,{postMessage:function(t,i){let o={[i1]:!0,payload:i5.encode(JSON.stringify(t))};e.postMessage(o)},addEventListener:function(e,i){if("message"!==e)return;let o=e=>{let t=e.data;if(!i2(t))return;let{payload:o}=t;i(new MessageEvent("message",{data:o instanceof Uint8Array||o instanceof ArrayBuffer?JSON.parse(i3.decode(o)):o,origin:e.origin,lastEventId:e.lastEventId,source:e.source,ports:[...e.ports]}))};t.set(i,o),window.addEventListener("message",o)},removeEventListener:function(e,i){if("message"!==e)return;let o=t.get(i);o&&(window.removeEventListener("message",o),t.delete(i))},dispose:function(){for(let e of t.values())window.removeEventListener("message",e);t.clear()}}}}}function ob(e){return null!=e&&"object"==typeof e&&(e instanceof Error||"string"==typeof e.name&&"string"==typeof e.message)}function ov(e){return e.stack??`${e.name}: ${e.message}`}let o_=Symbol(),oy=Symbol(),ow=()=>{},ox=Symbol(),ok=Symbol();function oC(e){if(e instanceof Error){let t={name:e.name,message:e.message};return void 0!==e.stack&&(t.stack=e.stack),t}return{name:"Error",message:String(e)}}function o$(e){let t=Error(e.message);return t.name=e.name,t.stack=e.stack,t}Symbol(),new WeakMap;let NonCloneableError=class NonCloneableError extends Error{valueType;path;constructor(e,t){super(`The nested ${e} at "${t}" cannot be cloned. Use nestedProxies: true.`),this.valueType=e,this.path=t,this.name="NonCloneableError"}};let Connection=class Connection{#s;#n;#a;#l;#c;#h=new Map;#d=0;#p=1;#u=!1;#g=new Map;#m=new WeakMap;#f=new Map;#b=new WeakMap;#v;#_=0;#y=new Map;#w=new Map;#x;#k=[];#C=!1;constructor(e,t={}){for(let i of(this.#s=e,this.#n=t.nestedProxies??!1,this.#a=t.debug??!1,this.#l=t.logger,this.#c=t.handlers??[],this.#x=t.batching??!1,this.#c))this.#h.set(i.wireType,i),"function"==typeof i.connect&&i.connect({sendMessage:e=>{this.#$(i.wireType,e)}});this.#v=new FinalizationRegistry(({id:e,session:t})=>{t===this.#_&&(this.#f.delete(e),this.#S({type:"release",id:e}))}),e.addEventListener("message",this.#E)}#S(e,t){if(!this.#u){if(!this.#x)return void this.#s.postMessage(e,t);this.#k.push({message:e,transfers:t}),this.#C||(this.#C=!0,queueMicrotask(()=>this.#A()))}}#A(){this.#C=!1;let e=this.#k;if(this.#k=[],0===e.length)return;let t=t=>{let i=t instanceof Error?t:Error(String(t));for(let{message:t}of e)if("call"===t.type&&void 0!==t.id){let e=this.#y.get(t.id);e&&(this.#y.delete(t.id),e.reject(i))}};if(1===e.length){let{message:i,transfers:o}=e[0];try{this.#s.postMessage(i,o)}catch(e){t(e)}}else{let i=[],o=[];for(let{message:t,transfers:r}of e)o.push(t),r&&i.push(...r);try{this.#s.postMessage({type:"batch",messages:o},i.length>0?i:void 0)}catch(e){t(e)}}}#$(e,t){let i=[];this.#S({type:"handler",wireType:e,payload:this.#I(t,"",i)},i)}#P(){let e=this.#d;return this.#d+=this.#p,e}expose(e){this.#p=2,this.#z(e),this.#S({type:"return",id:0,value:this.#T(e)})}#R(e){this.#k=[],this.#C=!1;let t=Error(e);for(let{reject:e}of this.#y.values())e(t);for(let{reject:e}of(this.#y.clear(),this.#w.values()))e(t);this.#w.clear()}close(){for(let e of(this.#u=!0,this.#R("Connection closed"),this.#s.removeEventListener("message",this.#E),this.#c))e.disconnect?.()}reset(e){for(let e of(this.#R("Connection reset"),this.#g.clear(),this.#m=new WeakMap,this.#f.clear(),this.#b=new WeakMap,this.#_++,this.#d=0,this.#p=1,this.#c))e.disconnect?.();for(let t of(void 0!==e&&e!==this.#s?(this.#u||this.#s.removeEventListener("message",this.#E),this.#s=e,e.addEventListener("message",this.#E)):this.#u&&this.#s.addEventListener("message",this.#E),this.#u=!1,this.#c))"function"==typeof t.connect&&t.connect({sendMessage:e=>{this.#$(t.wireType,e)}})}#M(e){if(e!==this.#_)throw Error("Stale proxy from previous session")}waitForReady(){return this.#d=1,this.#p=2,new Promise((e,t)=>{this.#y.set(0,{resolve:e,reject:t})})}#z(e){let t=this.#m.get(e);return void 0!==t||(t=this.#P(),this.#g.set(t,e),this.#m.set(e,t)),t}#B(e){return this.#g.get(e)}#j(e){return this.#f.get(e)?.deref()}#O(e){return this.#b.get(e)}#I(e,t,i){return"object"==typeof e?.[ox]?{__st__:"property",...e[ox]}:this.#D(e,t,i,new Map)}#T(e,t=!1){return{__st__:"proxy",id:this.#O(e)??this.#z(e),o:t}}#D(e,t,i,o,r){if(null==e||"object"!=typeof e&&"function"!=typeof e)return e;let s=o.get(e);if(void 0!==s)return s;if(e?.[oy]===!0){if(t&&this.#a&&!this.#n)throw new NonCloneableError("transfer",t);return i.includes(e.value)||i.push(e.value),o.set(e,e.value),e.value}if(e?.[o_]!==void 0){if(t&&this.#a&&!this.#n)throw new NonCloneableError("proxy",t);let i=this.#T(e[o_],e?.[ok]==="handle");return o.set(e,i),i}if("function"==typeof e){if(t&&this.#a&&!this.#n)throw new NonCloneableError("function",t);let i=this.#T(e);return o.set(e,i),i}if(void 0!==this.#O(e)){let t=this.#T(e,"__o"in e);return o.set(e,t),t}if("function"==typeof e?.then){if(t&&this.#a&&!this.#n)throw new NonCloneableError("promise",t);let i={__st__:"promise",id:this.#L(e)};return o.set(e,i),i}if(this.#c.length>0){for(let s of this.#c)if(s.canHandle(e)){let a={toWire:(e,s)=>{let a=s?t?`${t}.${s}`:s:t;return this.#D(e,a,i,o,r)},...void 0!==r&&{callId:r}},c=s.toWire(e,a);return o.set(e,c),c}}if(!(this.#n||this.#a))return e;if(Array.isArray(e)){let s=[];o.set(e,s);for(let a=0;a<e.length;a++)s.push(this.#D(e[a],`${t}[${String(a)}]`,i,o,r));return s}let a=Object.getPrototypeOf(e);if(a===Object.prototype||null===a){let s={};for(let a of(o.set(e,s),Object.keys(e)))s[a]=this.#D(e[a],t?`${t}.${a}`:a,i,o,r);return s}return e}#F(e){return{fromWire:t=>this.#N(t,e)}}#q(e){let t=e?.__st__;if("property"===t){let t=this.#B(e.targetProxyId);if(!t)throw ReferenceError(`Proxy property target ${String(e.targetProxyId)} not found`);return t[e.property]}if("thrown"===t)throw o$(e.error);return this.#N(e,new Map)}#N(e,t){if(null===e||"object"!=typeof e)return e;let i=t.get(e);if(void 0!==i)return i;if(e?.__st__==="proxy"){let i=this.#B(e.id);if(i){let o=e.o?{[o_]:i,[ok]:"handle",__nc:ow}:new Proxy(ow,{get:(e,t)=>{var o,r,s;let a;return t===o_?i:t===ok?"proxy":"then"!==t?(o=i,r=t,s=i[t],(a=(...e)=>{if("function"==typeof s)return Promise.resolve(s.apply(o,e));throw TypeError(`${String(r)} is not a function`)}).then=(e,t)=>Promise.resolve(s).then(e,t),a):void 0},set:(e,t,o)=>(i[t]=o,!0),apply(e,t,o){if("function"==typeof i)return Promise.resolve(i(...o));throw TypeError("Proxy target is not callable")}});return t.set(e,o),o}let o=this.#j(e.id)??this.#U(e.id,e.o);return t.set(e,o),o}if(e?.__st__==="promise"){let{promise:i,resolve:o,reject:r}=Promise.withResolvers();return this.#w.set(e.id,{resolve:o,reject:r}),t.set(e,i),i}let o=e.__st__;if("string"==typeof o){let i=this.#h.get(o);if(i?.fromWire){let o=i.fromWire(e,this.#F(t));return t.set(e,o),o}}if(!this.#n)return e;if(Array.isArray(e)){let i=[];for(let o of(t.set(e,i),e))i.push(this.#N(o,t));return i}if(Object.getPrototypeOf(e)!==Object.prototype)return e;let r={};for(let i of(t.set(e,r),Object.keys(e)))r[i]=this.#N(e[i],t);return r}#L(e){let t=this.#P();return e.then(e=>{try{let i=[],o=this.#I(e,"",i);this.#S({type:"resolve",id:t,value:o},i)}catch{this.#S({type:"reject",id:t,error:oC(Error("Failed to serialize resolved promise value"))})}},e=>{try{this.#S({type:"reject",id:t,error:oC(e)})}catch{}}),t}#U(e,t){let i=this.#j(e);if(void 0===i){let o=this.#_;i=t?{__o:ow}:new Proxy(ow,{apply:(t,i,r)=>(this.#M(o),this.#W(e,void 0,r)),get:(t,i)=>"string"==typeof i&&"then"!==i?this.#H(e,i,o):void 0,set:(t,i,r)=>{if("string"!=typeof i)return!1;this.#M(o);let s=[];return this.#V(this.#P(),e,"set",i,[this.#I(r,"",s)],s).catch(()=>{}),!0}}),this.#f.set(e,new WeakRef(i)),this.#b.set(i,e),this.#v.register(i,{id:e,session:this.#_})}return i}#H(e,t,i){let o=(...o)=>(this.#M(i),this.#W(e,t,o));return o.then=(o,r)=>(this.#M(i),this.#V(this.#P(),e,"get",t,[],[]).then(o,r)),o[ox]={targetProxyId:e,property:t},o}#V(e,t,i,o,r,s){let{promise:a,resolve:c,reject:h}=Promise.withResolvers();this.#y.set(e,{resolve:c,reject:h});try{this.#S({type:"call",id:e,target:t,action:i,method:o,args:r},s)}catch(t){this.#y.delete(e),h(t instanceof Error?t:Error(String(t)))}return a}#W(e,t,i){let o=[],r=new Map,s=this.#P();return this.#V(s,e,"call",t,i.map(e=>this.#D(e,"",o,r,s)),o)}#E=e=>{let t=e.data;if(null!=t)if("batch"===t.type)for(let e of t.messages)this.#K(e);else this.#K(t)};#K(e){switch(e.type){case"release":{let t=this.#g.get(e.id);void 0!==t&&(this.#g.delete(e.id),this.#m.delete(t));break}case"resolve":this.#G(this.#w,e.id,e.value);break;case"reject":this.#Z(this.#w,e.id,e.error);break;case"return":this.#G(this.#y,e.id,e.value),this.#Y(e.id);break;case"throw":this.#Z(this.#y,e.id,e.error),this.#Y(e.id);break;case"call":this.#X(e);break;case"handler":this.#J(e.wireType,e.payload)}}#G(e,t,i){let o=e.get(t);if(o){e.delete(t);try{o.resolve(this.#q(i))}catch(e){o.reject(e instanceof Error?e:Error(String(e)))}}}#Z(e,t,i){let o=e.get(t);o&&(e.delete(t),o.reject(o$(i)))}#Y(e){for(let t of this.#c)t.onCallSettle?.(e)}#J(e,t){try{let i=this.#h.get(e);if(i?.onMessage){let e=new Map;i.onMessage(this.#N(t,e),this.#F(e))}}catch(t){this.#l?.error?.(`Error in handler.onMessage for wireType "${e}":`,t)}}async #X(e){let{id:t,target:i,method:o,args:r,action:s}=e,a=new Map,c=r.map(e=>this.#N(e,a)),h=this.#B(i);if(!h)return this.#S({type:"throw",id:t,error:{name:"ReferenceError",message:`Proxy target ${String(i)} not found`}});let p=this.#l,u=p?.debug?performance.now():0;try{let e;if("get"===s){if(void 0===o)throw TypeError("Property name required for get action");e=h[o]}else if("set"===s){if(void 0===o)throw TypeError("Property name required for set action");h[o]=c[0],e=void 0}else if(void 0===o){if("function"!=typeof h)throw TypeError("Target is not callable");e=await h(...c)}else{let t=h[o];if("function"!=typeof t)throw TypeError(`${o} is not a function`);e=await t.apply(h,c)}let i=[],r=this.#I(e,"",i);this.#S({type:"return",id:t,value:r},i),p?.debug?.(`${s} ${o??"(direct)"} completed`,{duration:performance.now()-u})}catch(e){p?.debug?.(`${s} ${o??"(direct)"} failed`,{duration:performance.now()-u,error:e}),this.#S({type:"throw",id:t,error:oC(e)})}}};let RemoteSignal=class RemoteSignal{#Q;#ee;#et;constructor(e,t,i){this.#ee=e,this.#et=i,this.#Q=new _.State(t,{[_.subtle.watched]:()=>{this.#et?.(this.#ee,!0)},[_.subtle.unwatched]:()=>{this.#et?.(this.#ee,!1)}})}get(){return this.#Q.get()}set(e){throw Error("RemoteSignal is read-only. The signal can only be modified on the sender side.")}get signalId(){return this.#ee}_update(e){this.#Q.set(e)}};let SignalHandler=class SignalHandler{wireType="signal";#ei;#eo;#er=0;#es=1;#en=new Map;#ea=new WeakMap;#el;#C=!1;#ec=new Map;#eh=new Map;#ed=new Map;#ep=new Map;#v=new FinalizationRegistry(({signalId:e,session:t})=>{t===this.#er&&(this.#ed.delete(e),this.#eo?.sendMessage({type:"signal:release",signalId:e}))});constructor(e={}){this.#ei=e.autoWatch??!1}connect(e){this.#eo=e}onMessage(e){(null!==e&&"object"==typeof e&&"type"in e?"signal:batch"!==e.type:1)?(null!==e&&"object"==typeof e&&"type"in e?"signal:release"!==e.type:1)?(null!==e&&"object"==typeof e&&"type"in e?"signal:watch"!==e.type:1)?null!==e&&"object"==typeof e&&"type"in e&&"signal:unwatch"===e.type&&this.#eu(e.signalId):this.#eg(e.signalId):this.releaseSignal(e.signalId):this.#em(e)}disconnect(){this.#eo=void 0,this.#C=!1,void 0!==this.#el&&(this.#el.unwatch(...this.#ec.values()),this.#el=void 0),this.#en.clear(),this.#ec.clear(),this.#eh.clear(),this.#ed.clear(),this.#ep.clear(),this.#er++,this.#ea=new WeakMap,this.#es=1}canHandle(e){return e instanceof _.State||e instanceof _.Computed}toWire(e,t){return this.#ef(e,t)}fromWire(e,t){return this.#eb(e,t)}#ef(e,t){let i=this.#ea.get(e);return void 0===i&&(i=this.#es++,this.#en.set(i,e),this.#ea.set(e,i),this.#ei&&this.#eg(i)),{__st__:"signal",signalId:i,value:t.toWire(e.get())}}#eb(e,t){let i=t.fromWire(e.value),o=this.#ed.get(e.signalId),r=o?.deref();if(void 0!==r)return r._update(i),r;let s=this.#ep.get(e.signalId);this.#ep.delete(e.signalId);let a=new RemoteSignal(e.signalId,void 0!==s?s:i,this.#ev);return this.#ed.set(e.signalId,new WeakRef(a)),this.#v.register(a,{signalId:e.signalId,session:this.#er}),a}#ev=(e,t)=>{void 0!==this.#eo&&(t?this.#eo.sendMessage({type:"signal:watch",signalId:e}):this.#eo.sendMessage({type:"signal:unwatch",signalId:e}))};#eg(e){if(this.#ec.has(e))return;let t=this.#en.get(e);if(void 0===t)return;let i=this.#e_(),o=new _.Computed(()=>t.get());this.#ec.set(e,o),this.#eh.set(o,e),i.watch(o);let r=o.get();this.#eo?.sendMessage({type:"signal:batch",updates:[{signalId:e,value:r}]})}#eu(e){let t=this.#ec.get(e);void 0!==t&&(this.#el?.unwatch(t),this.#ec.delete(e),this.#eh.delete(t))}#e_(){return this.#el??=new _.subtle.Watcher(()=>{this.#C||(this.#C=!0,queueMicrotask(this.#A))})}#A=()=>{if(this.#C=!1,void 0===this.#el||void 0===this.#eo)return;let e=this.#el.getPending(),t=[];for(let i of e){let e=this.#eh.get(i);if(void 0!==e&&this.#en.has(e)){let o=i.get();t.push({signalId:e,value:o})}}this.#el.watch(),t.length>0&&this.#eo.sendMessage({type:"signal:batch",updates:t})};#em(e){for(let t of e.updates){let e=this.#ed.get(t.signalId),i=e?.deref();void 0!==i?i._update(t.value):this.#ep.set(t.signalId,t.value)}}releaseSignal(e){let t=this.#ec.get(e);void 0!==t&&(this.#el?.unwatch(t),this.#ec.delete(e),this.#eh.delete(t)),this.#en.delete(e)}get _sentSignalCount(){return this.#en.size}get _remoteSignalCount(){return this.#ed.size}_isWatching(e){return this.#ec.has(e)}};let oS="abort-signal";let AbortSignalHandler=class AbortSignalHandler{wireType=oS;#eo;#er=0;#d=1;#ea=new WeakMap;#en=new Map;#ey=new Map;#ew=new FinalizationRegistry(({id:e,session:t})=>{t!==this.#er||this.#ey.has(e)&&(this.#ey.delete(e),this.#en.delete(e),this.#eo?.sendMessage({type:"release",id:e}))});#ex=new Map;canHandle(e){return e instanceof AbortSignal}toWire(e,t){if(e.aborted)return{__st__:oS,id:0,aborted:!0,reason:e.reason};let i=this.#ea.get(e);if(void 0!==i)return{__st__:oS,id:i,aborted:!1};i=this.#d++,this.#ea.set(e,i),this.#en.set(i,new WeakRef(e)),this.#ew.register(e,{id:i,session:this.#er},e);let o=new WeakRef(e),r=i,s=()=>{let e=o.deref(),t=e?.reason;"completed"===t?this.#eo?.sendMessage({type:"release",id:r}):this.#eo?.sendMessage({type:"abort",id:r,reason:t}),void 0!==e&&this.#ew.unregister(e),this.#ek(r)};return e.addEventListener("abort",s,{once:!0}),this.#ey.set(i,s),{__st__:oS,id:i,aborted:!1}}fromWire(e){if(e.aborted)return AbortSignal.abort(e.reason);let t=this.#ex.get(e.id);if(void 0!==t)return t.signal;let i=new AbortController;return this.#ex.set(e.id,i),i.signal}connect(e){this.#eo=e}onMessage(e){"abort"===e.type?(this.#ex.get(e.id)?.abort(e.reason),this.#ex.delete(e.id)):"release"===e.type&&this.#ex.delete(e.id)}disconnect(){for(let e of(this.#eo=void 0,this.#ex.values()))e.abort("disconnected");for(let[e,t]of(this.#ex.clear(),this.#ey)){let i=this.#en.get(e)?.deref();void 0!==i&&(i.removeEventListener("abort",t),this.#ew.unregister(i))}this.#ey.clear(),this.#en.clear(),this.#er++,this.#ea=new WeakMap,this.#d=1}#ek(e){this.#ey.delete(e),this.#en.delete(e)}get _sentCount(){return this.#en.size}get _receivedCount(){return this.#ex.size}};let oE="st-error";function oA(e){return null!=e&&"object"==typeof e&&e.__st__===oE}function oI(e){if(null==e||"object"!=typeof e)return e;if(e instanceof Error||"string"==typeof e.name&&"string"==typeof e.message){let t={__st__:oE,name:e.name,message:e.message};return"string"==typeof e.stack&&(t.stack=e.stack),t}return e}function oP(e){if(!oA(e))return e;if("AbortError"===e.name&&"u">typeof DOMException)return new DOMException(e.message,"AbortError");let t=Error(e.message);return t.name=e.name,void 0!==e.stack&&(t.stack=e.stack),t}function oz(e){return null!=e&&"object"==typeof e&&"abort"===e.type}let GlAbortSignalHandler=class GlAbortSignalHandler extends AbortSignalHandler{toWire(e,t){let i=super.toWire(e,t);return i.aborted&&void 0!==i.reason&&(i.reason=oI(i.reason)),i}fromWire(e){return e.aborted&&oA(e.reason)&&(e={...e,reason:oP(e.reason)}),super.fromWire(e)}connect(e){super.connect({sendMessage:t=>{oz(t)&&void 0!==t.reason&&(t.reason=oI(t.reason)),e.sendMessage(t)}})}onMessage(e){oz(e)&&oA(e.reason)&&(e.reason=oP(e.reason)),super.onMessage(e)}};let oT="__st__",oR=[{wireType:"date",canHandle:function(e){return e instanceof Date},toWire:function(e){return{[oT]:"date",value:e.getTime()}},fromWire:function(e){return new Date(e.value)}},{wireType:"map",canHandle:function(e){return e instanceof Map},toWire:function(e,t){let i=[];for(let[o,r]of e)i.push([t.toWire(o),t.toWire(r)]);return{[oT]:"map",entries:i}},fromWire:function(e,t){let i=new Map;for(let o of e.entries){let[e,r]=o;i.set(t.fromWire(e),t.fromWire(r))}return i}},{wireType:"set",canHandle:function(e){return e instanceof Set},toWire:function(e,t){let i=[];for(let o of e)i.push(t.toWire(o));return{[oT]:"set",values:i}},fromWire:function(e,t){let i=new Set;for(let o of e.values)i.add(t.fromWire(o));return i}},{wireType:"regexp",canHandle:function(e){return e instanceof RegExp},toWire:function(e){return{[oT]:"regexp",source:e.source,flags:e.flags}},fromWire:function(e){return new RegExp(e.source,e.flags)}}];function oM(e){return"string"==typeof e[0]?[e[0],e.slice(1)]:[e.map(String).join(" "),[]]}function oB(e){return e.map(e=>{let t;if(ob(e))return ov(e);if(null==e||"object"!=typeof e||Array.isArray(e))return e;for(let[i,o]of Object.entries(e))ob(o)&&((t??={...e})[i]=ov(o));return t??e})}function oj(e){let t=`[RPC:${e}]`;return{debug:(...e)=>{let[i,o]=oM(e);t1.debug(`${t} ${i}`,...oB(o))},warn:(...e)=>{let[i,o]=oM(e);t1.warn(`${t} ${i}`,...oB(o))},error:(...e)=>{let[i,o]=oM(e),r=function(e){for(let t of e){if(ob(t))return t;if(null!=t&&"object"==typeof t&&!Array.isArray(t)){for(let e of Object.values(t))if(ob(e))return e}}}(o);t1.error(r,`${t} ${i}`)}}}async function oO(e){let t,i,o="function"==typeof e?.webviewId?e.webviewId():e?.webviewId,r="function"==typeof e?.webviewInstanceId?e.webviewInstanceId():e?.webviewInstanceId,s=null==o&&null==r?"?":null==r?o:`${o??"?"}|${r}`,a=`RpcClient(${s})`,c=e?.endpoint?.()??(h??=of()).createEndpoint(),p=new Connection(c,{handlers:[...oR,new SignalHandler({autoWatch:e?.autoWatchSignals}),new GlAbortSignalHandler,...e?.handlers??[]],nestedProxies:e?.nestedProxies??!0,debug:e?.debug,batching:!0,logger:oj(`client(${s})`)}),u=e?.timeout??6e4,g=[],m=()=>{for(let e of g)clearTimeout(e);g.length=0,null!=t&&(clearTimeout(t),t=void 0),null!=i&&(e?.signal?.removeEventListener("abort",i),i=void 0)},f=()=>{m(),p.close(),c.dispose()},b=()=>{let t=e?.signal?.reason;return t instanceof Error?t:Error("RPC connection aborted")};try{let o;if(e?.signal?.aborted)throw b();t1.debug(`${a}: Connecting to host...`),2e4<u&&g.push(setTimeout(()=>t1.warn(`${a}: Connection still pending after 20000ms`),2e4)),4e4<u&&g.push(setTimeout(()=>t1.warn(`${a}: Connection still pending after 40000ms \u2014 peer may be stuck`),4e4));let r=await Promise.race([p.waitForReady(),new Promise((e,i)=>t=setTimeout(()=>i(Error(`RPC connection timed out after ${u}ms`)),u)),...e?.signal!=null?[new Promise((t,o)=>{i=()=>o(b()),e.signal.addEventListener("abort",i,{once:!0})})]:[]]);return m(),t1.debug(`${a}: Connected to host successfully`),{services:(o=new Map,new Proxy(r,{get:function(e,t,i){if(o.has(t))return o.get(t);let r=Reflect.get(e,t,i);if("function"==typeof r||null==r||"object"!=typeof r||"function"!=typeof r.then)return r;let s=Promise.resolve(r);return o.set(t,s),s}})),dispose:()=>{t1.debug(`${a}: Disposing connection...`),f()}}}catch(e){throw f(),t1.error(e,`${a}: Failed to connect to host`),e}}oj("?");let oD=new DOMException("rpc reconnect: host reconnected","AbortError"),oL=new DOMException("rpc disconnect: host disconnected","AbortError");let RpcController=class RpcController{constructor(e,t){this.host=e,this.options=t,e.addController(this)}get services(){return this._services}hostConnected(){null!=this._connectionAbort&&this._connectionAbort.abort(oD),this._connectionAbort=new AbortController,this._connect(this._connectionAbort.signal)}hostDisconnected(){this._connectionAbort?.abort(oL),this._connectionAbort=void 0,this._disposeRpc?.(),this._disposeRpc=void 0,this._services=void 0}async _connect(e){try{let{services:t,dispose:i}=await oO({...this.options?.rpcOptions,signal:e});if(e.aborted)return void i();if(this._services=t,this._disposeRpc=i,this.options?.onReady!=null)try{await this.options.onReady(t)}catch(e){throw i(),this._disposeRpc=void 0,this._services=void 0,e}}catch(c){if(e.aborted)return;let t=function(e){if(e instanceof Error)return e;if(ob(e)){let t=Error(`${e.name}: ${e.message}`);return t.cause=e,t}return Error(String(e))}(c),i=this.options?.rpcOptions?.webviewId,o=this.options?.rpcOptions?.webviewInstanceId,r="function"==typeof i?i():i,s="function"==typeof o?o():o,a=null!=s?`${r??"?"}|${s}`:r??"?";t1.error(t,`RpcController(${a}): Failed to connect`),this.options?.onError!=null&&this.options.onError(t)}}};function oF(e,t){let i,o,r=t?.cancelPrevious??!0,s=t?.initialValue,a=tS(s),c=tS(!1),h=tS(void 0),p=tS(!1),u=new _.Computed(()=>c.get()?"loading":null!=h.get()?"error":p.get()?"success":"idle"),g=!1,m=0,f=0;function b(){null!=i&&(i.abort(new DOMException("resource: cancelled by newer fetch","AbortError")),i=void 0),c.set(!1)}async function v(...t){if(g)return;r&&b(),o=t;let s=new AbortController,u=++m;f=u,i=s,c.set(!0),h.set(void 0);try{let i=await e(s.signal,...t);if(s.signal.aborted||u!==f)return;a.set(i),p.set(!0)}catch(e){if(s.signal.aborted||u!==f)return;h.set(e instanceof Error?e.message:String(e))}finally{i===s&&(i=void 0,c.set(!1))}}async function w(){if(null!=o)return v(...o)}return{value:a,loading:c,error:h,status:{get:()=>u.get()},generationId:{get:()=>f},fetch:v,refetch:w,mutate:function(e){g||(a.set(e),h.set(void 0),p.set(!0))},cancel:b,reset:function(){b(),a.set(s),h.set(void 0),p.set(!1),o=void 0},dispose:function(){g=!0,b()}}}let oN="0000000000000000000000000000000000000000:",oq=/^([\w\-/]+(?:\.[\w\-/]+)*)?(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)?$/,oU=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)$/,oW=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,oH=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,oV=/(^[0-9a-f]{40}([\^@~:]\S*)?$)|(^[0]{40}(:|-)$)/,oK=/^(.*?)([\^@~:].*)?$/,oG=/^[0]{40}(?:[\^@~:]\S*)?:?$/,oZ=/^[0]{40}([\^@~]\S*)?:$/;function oY(e,t){return!!t&&e.test(t)}function oX(e,t=!1){return"0000000000000000000000000000000000000000"===e||e===oN||!t&&oY(oG,e)}function oJ(e,t=!1){return e===oN||!t&&oY(oZ,e)}function oQ(e,t){if("0000000000000000000000000000000000000000-"===e)return"(deleted)";if(!e)return t?.strings?.working??"";if(oX(e))return oJ(e)?t?.strings?.uncommittedStaged??"Index":t?.strings?.uncommitted??"Working Tree";if(function(e,t="any"){if(null==e)return!1;switch(t){case"qualified":return oU.test(e);case"qualified-double-dot":return oW.test(e);case"qualified-triple-dot":return oH.test(e);default:return oq.test(e)}}(e)||!oY(oV,e))return e;let i=oK.exec(e);if(null!=i){let[,e,t]=i;if(null!=t)return`${e.substring(0,7)}${t}`}return e.substring(0,7)}let LruMap=class LruMap{constructor(e){this.limit=e,this._map=new Map,this._pinned=new Set}pin(e){this._pinned.add(e)}unpin(e){this._pinned.delete(e)}get size(){return this._map.size}get(e){return this._map.get(e)}has(e){return this._map.has(e)}set(e,t){return this._map.delete(e),this._map.set(e,t),this.evict(),this}update(e,t){let i={...this._map.get(e)??{},...t};return this.set(e,i),i}touch(e){if(!this._map.has(e))return!1;let t=this._map.get(e);return this._map.delete(e),this._map.set(e,t),!0}delete(e){return this._map.delete(e)}clear(){this._map.clear(),this._pinned.clear()}keys(){return this._map.keys()}values(){return this._map.values()}evict(){if(!(this._map.size<=this.limit))for(let e of this._map.keys()){if(this._map.size<=this.limit)break;this._pinned.has(e)||this._map.delete(e)}}};let o0={layout:"auto",compact:!0,threshold:5,icon:"type"},o1=e=>{if(null!=e){let t=e instanceof Error?e.message:"unknown error";t1.warn(`RPC call rejected (noop handler): ${t}`)}},o2=e=>{if(null==e||e instanceof Error&&"AbortError"===e.name)return;let t=e instanceof Error?e.message:"unknown error";t1.warn(`RPC call rejected (noopUnlessReal handler): ${t}`)},o5=new WeakMap;function o3(e,t,i,o){var r,s,a;let c;r=[{signal:e,value:t}],s=i,a=o,c=r.map(e=>{var t;let i,o=e.signal.get(),r=(t=e.signal,i=(o5.get(t)??0)+1,o5.set(t,i),i);return e.signal.set(e.value),{signal:e.signal,optimistic:e.value,previous:o,version:r}}),s.catch(e=>{for(let e of c)o5.get(e.signal)===e.version&&e.signal.get()===e.optimistic&&e.signal.set(e.previous);t1.error(e,`RPC call failed${a?` (${a})`:""}, rolled back`)})}function o4(e,t){let i=e.generationId.get();return o=>{i===e.generationId.get()&&t(o)}}function o6(e,t,i,o,r){r?.skipIf?.()||i().then(o4(e,e=>{t.aborted||o(e)}),o2)}function o7(e,t){e.catch(e=>{t1.error(e,`RPC call failed${t?` (${t})`:""}`)})}function o8(e,t,i){t.catch(t=>{t1.error(t,`RPC call failed${i?` (${i})`:""}`),e.set(t instanceof Error?t.message:"RPC call failed")})}let MRU=class MRU{constructor(e=10,t){this.maxSize=e,this.comparator=t,this.stack=[],this._position=0}get count(){return this.stack.length}get position(){return this._position}add(e){this._position>0&&(this.stack.splice(0,this._position),this._position=0);let t=null!=this.comparator?this.stack.findIndex(t=>this.comparator(e,t)):this.stack.indexOf(e);-1!==t?this.stack.splice(t,1):this.stack.length===this.maxSize&&this.stack.pop(),this.stack.unshift(e),this._position=0}get(e){if(null!=e){if(e<0||e>=this.stack.length)return;return this.stack[e]}return this.stack.length>0?this.stack[0]:void 0}insert(e){this._position>0&&(this.stack.splice(0,this._position),this._position=0),this.stack.unshift(e),this._position++}navigate(e){if(!(this.stack.length<=1)){if("back"===e){if(this._position>=this.stack.length-1)return;this._position+=1}else{if(this._position<=0)return;this._position-=1}return this.stack[this._position]}}};let NavigationStack=class NavigationStack{constructor(e=10,t=(e,t)=>e.sha===t.sha,i){this.maxSize=e,this.comparator=t,this.onChange=i,this._mru=new MRU(e,t)}record(e){this._mru.add(e),this.emit()}back(){let e=this._mru.navigate("back");return null!=e&&this.emit(),e}forward(){let e=this._mru.navigate("forward");return null!=e&&this.emit(),e}current(){return this._mru.get()}reset(){this._mru=new MRU(this.maxSize,this.comparator),this.emit()}emit(){let e=this.state,t=this._lastEmitted;(t?.count!==e.count||t.position!==e.position||t.canBack!==e.canBack||t.canForward!==e.canForward)&&(this._lastEmitted=e,this.onChange?.(e))}get state(){let e=this._mru.count,t=this._mru.position;return{count:e,position:t,canForward:t>0,canBack:t<e-1}}};let CommitDetailsActions=class CommitDetailsActions{constructor(e,t,i){this.state=e,this.services=t,this.resources=i,this._navigating=!1,this._commitEnrichmentCache=new LruMap(32),this._nav=new NavigationStack(10,void 0,e=>this.state.navigationStack.set(e))}resetEnrichment(){this._enrichmentController?.abort();let e=new AbortController;return this._enrichmentController=e,e.signal}cancelPendingRequests(){this.resources.commit.cancel(),this.resources.reachability.cancel(),this.resources.explain.cancel()}updateTelemetryContext(e){o7(this.services.telemetry.updateContext(e))}sendTelemetryEvent(e,t){o7(this.services.telemetry.sendEvent(e,t))}async navigateBack(){if(this._navigating||!this.state.canNavigateBack.get())return;let e=this._nav.back();if(null!=e){this._navigating=!0;try{this.state.searchContext.set(void 0),await this.fetchCommit(e.repoPath,e.sha,{force:!0})}catch(e){t1.error(e,"navigate back failed")}finally{this._navigating=!1}}}async navigateForward(){if(this._navigating||!this.state.canNavigateForward.get())return;let e=this._nav.forward();if(null!=e){this._navigating=!0;try{this.state.searchContext.set(void 0),await this.fetchCommit(e.repoPath,e.sha,{force:!0})}catch(e){t1.error(e,"navigate forward failed")}finally{this._navigating=!1}}}async refetchCurrentCommit(){let e=this.state.currentCommit.get();null!=e&&await this.fetchCommit(e.repoPath,e.sha,{force:!0})}togglePin(){let e=!this.state.pinned.get();o3(this.state.pinned,e,this.services.inspect.setPin(e),"toggle pin")}pickCommit(){o7(this.services.inspect.pickCommit(),"pick commit")}searchCommit(){o7(this.services.inspect.searchCommit(),"search commit")}updatePullRequestExpanded(e){let t=this.state.preferences.get();null==t?o8(this.state.error,this.services.storage.updateWorkspace("views:commitDetails:pullRequestExpanded",e),"update pullRequestExpanded"):o3(this.state.preferences,{...t,pullRequestExpanded:e},this.services.storage.updateWorkspace("views:commitDetails:pullRequestExpanded",e),"update pullRequestExpanded")}updateShowSearchBox(e){let t=this.state.preferences.get();null==t?o8(this.state.error,this.services.storage.updateWorkspace("views:commitDetails:showSearchBox",e),"update showSearchBox"):o3(this.state.preferences,{...t,showSearchBox:e},this.services.storage.updateWorkspace("views:commitDetails:showSearchBox",e),"update showSearchBox")}updateSearchBoxFilter(e){let t=this.state.preferences.get();null==t?o8(this.state.error,this.services.storage.updateWorkspace("views:commitDetails:searchBoxFilter",e),"update searchBoxFilter"):o3(this.state.preferences,{...t,searchBoxFilter:e},this.services.storage.updateWorkspace("views:commitDetails:searchBoxFilter",e),"update searchBoxFilter")}updateFilesLayout(e){let t=this.state.preferences.get();if(null==t)return;let i={...t,files:{...t.files,...e}};this.state.preferences.set(i),null!=e.compact&&o7(this.services.config.update("views.commitDetails.files.compact",e.compact),"update files.compact"),null!=e.icon&&o7(this.services.config.update("views.commitDetails.files.icon",e.icon),"update files.icon"),null!=e.layout&&o7(this.services.config.update("views.commitDetails.files.layout",e.layout),"update files.layout"),null!=e.threshold&&o7(this.services.config.update("views.commitDetails.files.threshold",e.threshold),"update files.threshold")}getCurrentRef(){let e=this.state.currentCommit.get();if(!(e?.sha==null||oX(e.sha)))return{ref:e.sha,stash:null!=e.stashNumber}}openFile(e,t){var i,o;i=this.services.files,o=this.getCurrentRef(),o7(i.openFile(e,t,o),"open file")}openFileOnRemote(e){var t,i;t=this.services.files,i=this.getCurrentRef(),o7(t.openFileOnRemote(e,i),"open file on remote")}openFileCompareWorking(e,t){var i,o;i=this.services.files,o=this.getCurrentRef(),o7(i.openFileCompareWorking(e,t,o),"compare file with working")}openFileComparePrevious(e,t){var i,o;i=this.services.files,o=this.getCurrentRef(),o7(i.openFileComparePrevious(e,t,o),"compare file with previous")}openFileCompareWipChanges(e,t){var i;i=this.services.files,o7(i.openFileCompareWipChanges(e,t),"compare WIP file changes")}executeFileAction(e,t){var i,o;i=this.services.files,o=this.getCurrentRef(),o7(i.executeFileAction(e,t,o),"file action")}openMultipleChanges(e){var t;t=this.services.files,o7(t.openMultipleChanges(e),"open multiple changes")}copyCommitPatchToClipboard(e,t,i){o7(this.services.drafts.copyCommitPatchToClipboard(e,t,i),"copy commit patch")}executeCommitAction(e,t){let i=this.state.currentCommit.get();i&&o7(this.services.inspect.executeCommitAction(i.repoPath,i.sha,e,t),`commit action: ${e}`)}executeCommand(e,...t){o7(this.services.commands.execute(e,...t),`command: ${e}`)}openOnRemote(e,t){!e||oX(t)||this.services.commands.execute("gitlens.openOnRemote",{repoPath:e,resource:{type:"commit",sha:t}})}openCommitInGraphMode(e,t){t?.repoPath==null||null==t.sha||("review"===e||"compose"===e)&&this.services.commands.execute("gitlens.showGraph",{action:"review"===e?"enter-review":"enter-compose",target:{sha:t.sha,worktreePath:t.repoPath}})}changeFilesLayout(e){let t=this.state.preferences.get();if(!t?.files)return;let i={...t.files,layout:e};this.state.preferences.set({...t,files:i}),this.services.config.update("views.commitDetails.files.layout",e)}getPrContext(){let e=this.state.pullRequest.get(),t=this.state.currentCommit.get()?.repoPath;if(e?.refs&&t)return{repoPath:t,refs:e.refs,url:e.url,id:e.id,provider:e.provider?.id??"unknown"}}openPullRequestDetails(){let e=this.getPrContext();if(e){var t,i,o,r;t=this.services.pullRequests,i=e.repoPath,o=e.id,r=e.provider,o7(t.openPullRequestDetails(i,o,r),"open PR details")}}async explainCommit(e){this.state.currentCommit.get()&&await this.resources.explain.fetch(e)}async loadReachability(){this.resources.reachability.loading.get()||null!=this.state.currentCommit.get()&&await this.resources.reachability.fetch()}clearReachability(){this.resources.reachability.cancel(),this.resources.reachability.mutate(void 0)}refreshReachability(){this.resources.reachability.mutate(void 0),this.loadReachability()}async fetchInitialState(){this.state.loading.set(!0),this.state.error.set(void 0);let e=this.state.pinned.get(),t=this.state.commitRef.get();try{let i=await this.services.inspect.getInitialContext();this.state.pinned.set(e||i.pinned),this.fetchPreferences(),this.services.config.get("views.commitDetails.autolinks.enabled").then(e=>this.state.capabilities.autolinksEnabled=e,o1),this.services.integrations.getIntegrationStates().then(e=>this.state.capabilities.hasIntegrationsConnected=e.some(e=>e.connected),o1),this.services.ai.getModel().then(e=>this.state.aiModel.set(e),o1);let o=i.initialCommit??t;null!=o&&await this.fetchCommit(o.repoPath,o.sha)}catch(e){t1.error(e,"Failed to fetch initial state"),this.state.error.set(e instanceof Error?e.message:"Failed to initialize")}finally{this.state.loading.set(!1)}}async fetchCommit(e,t,i){let o=this.state.currentCommit.get();if(!i?.force&&o?.repoPath===e&&o?.sha===t)return void this.resources.commit.cancel();o?.sha===t&&o?.repoPath===e||this._navigating||this._nav.record({sha:t,repoPath:e}),this.state.error.set(void 0),this.resources.reachability.cancel(),this.resources.explain.cancel();let r=this.resetEnrichment(),s=`${t}:${e}`,a=this._commitEnrichmentCache.get(s);if(null!=a?(null!=a.commit&&(this.state.currentCommit.set(a.commit),this.state.commitRef.set({sha:a.commit.sha,repoPath:a.commit.repoPath})),this.state.autolinks.set(a.autolinks),this.state.formattedMessage.set(a.formattedMessage),this.state.autolinkedIssues.set(a.autolinkedIssues),this.state.pullRequest.set(a.hasPullRequest?a.pullRequest:void 0),this.state.signature.set(a.hasSignature?a.signature:void 0)):(this.state.autolinks.set(void 0),this.state.formattedMessage.set(void 0),this.state.autolinkedIssues.set(void 0),this.state.pullRequest.set(void 0),this.state.signature.set(void 0)),await this.resources.commit.fetch(e,t),"success"===this.resources.commit.status.get()){let i=this.resources.commit.value.get();this.state.currentCommit.set(i),this.state.commitRef.set(i?{sha:i.sha,repoPath:i.repoPath}:void 0),null!=i&&(this._commitEnrichmentCache.update(s,{commit:i}),function(e,t,i,o,r){let{repoPath:s,sha:a,isStash:c,autolinksEnabled:h}=o,p=o.headlineSplitterToken??`\0
\0`,u=()=>!h;o6(t,i,()=>e.autolinks.getCommitAutolinks(s,a,p,c,i),e=>{null!=e&&r.setBasicAutolinks(e.autolinks,e.formattedMessage)},{skipIf:u}),o6(t,i,()=>e.autolinks.getEnrichedAutolinks(s,a,p,c,i),e=>{null!=e&&r.setEnrichedAutolinks(e.autolinkedIssues,e.formattedMessage)},{skipIf:u}),o6(t,i,()=>e.pullRequests.getPullRequestForCommit(s,a,i),e=>r.setPullRequest(e)),o6(t,i,()=>e.repository.getCommitSignature(s,a,i),e=>r.setSignature(e))}(this.services,this.resources.commit,r,{repoPath:e,sha:t,isStash:null!=i.stashNumber,autolinksEnabled:this.state.capabilities.autolinksEnabled},{setBasicAutolinks:(e,t)=>{this._commitEnrichmentCache.update(s,{autolinks:e,formattedMessage:t}),this.state.autolinks.set(e),this.state.formattedMessage.set(t)},setEnrichedAutolinks:(e,t)=>{this._commitEnrichmentCache.update(s,{autolinkedIssues:e,formattedMessage:t}),this.state.autolinkedIssues.set(e),this.state.formattedMessage.set(t)},setPullRequest:e=>{this._commitEnrichmentCache.update(s,{pullRequest:e,hasPullRequest:!0}),this.state.pullRequest.set(e)},setSignature:e=>{this._commitEnrichmentCache.update(s,{signature:e,hasSignature:!0}),this.state.signature.set(e)}}),this.services.repository.hasRemotes(e).then(o4(this.resources.commit,e=>{r.aborted||this.state.hasRemotes.set(e)}),o2))}else null!=this.resources.commit.error.get()&&this.state.error.set(this.resources.commit.error.get())}async fetchPreferences(){try{let[e,t,i,o,r,s]=await Promise.allSettled([this.services.storage.getWorkspace("views:commitDetails:pullRequestExpanded"),this.services.storage.getWorkspace("views:commitDetails:showSearchBox"),this.services.storage.getWorkspace("views:commitDetails:searchBoxFilter"),this.services.config.getMany("views.commitDetails.avatars","defaultCurrentUserNameStyle","defaultDateFormat","defaultDateStyle","views.commitDetails.files","signing.showSignatureBadges","views.commitDetails.autolinks.enabled","sortWorkingChangesBy"),this.services.config.getManyCore("workbench.tree.renderIndentGuides","workbench.tree.indent","git.enableSmartCommit","scm.defaultViewSortKey"),this.services.ai.isEnabled()]),a=iY(e),c=iY(t),h=iY(i),[p,u,g,m,f,b,v,_]=iY(o)??[],[w,x,C,$]=iY(r)??[],S=iY(s);this.state.preferences.set({currentUserNameStyle:u??"you",pullRequestExpanded:a??!0,avatars:p??!0,dateFormat:g??"MMMM Do, YYYY h:mma",dateStyle:m??"relative",files:f??this.state.preferences.get()?.files??o0,indentGuides:w??"onHover",indent:x,workingFilesOrderBy:$??"path",workingChangesSortBy:_??"stage",aiEnabled:S??!1,enableSmartCommit:C??!1,showSignatureBadges:b??!1,showSearchBox:c??!0,searchBoxFilter:h??!0}),null!=v&&(this.state.capabilities.autolinksEnabled=v)}catch(e){t1.error(e,"Failed to fetch preferences")}}async checkIntegrations(){try{let e=await this.services.integrations.getIntegrationStates();this.state.capabilities.hasIntegrationsConnected=e.some(e=>e.connected)}catch(e){t1.error(e,"Failed to check integrations status")}}};async function o9(e){let t=await Promise.allSettled(e.map(e=>e())),i=[];for(let e of t)"fulfilled"===e.status&&"function"==typeof e.value?i.push(e.value):"rejected"===e.status&&t1.error(e.reason,"Failed to subscribe");return()=>{for(let e of i)try{e()}catch(e){t1.error(e,"Failed to unsubscribe")}}}let re=(e=null)=>new _.State(e,{equals:()=>!1});new WeakMap;let SignalObjectImpl=class SignalObjectImpl{static fromEntries(e){return new SignalObjectImpl(Object.fromEntries(e))}#eC=new Map;#e$=re();constructor(e={}){let t=Object.getPrototypeOf(e),i=Object.getOwnPropertyDescriptors(e),o=Object.create(t);for(let e in i)Object.defineProperty(o,e,i[e]);let r=this;return new Proxy(o,{get:(e,t,i)=>(r.#eS(t),Reflect.get(e,t,i)),has:(e,t)=>(r.#eS(t),t in e),ownKeys:e=>(r.#e$.get(),Reflect.ownKeys(e)),set(e,t,i,o){let s=Reflect.set(e,t,i,o);return r.#eE(t),r.#eA(),s},deleteProperty:(e,t)=>(t in e&&(delete e[t],r.#eE(t),r.#eA()),!0),getPrototypeOf:()=>SignalObjectImpl.prototype})}#eS(e){let t=this.#eC.get(e);void 0===t&&(t=re(),this.#eC.set(e,t)),t.get()}#eE(e){let t=this.#eC.get(e);t&&t.set(null)}#eA(){this.#e$.set(null)}};function rt(e){let t=new _.State(e),i=new _.State(void 0),o=new _.Computed(()=>{let e=i.get();return null!=e?e.get():t.get()});return{get:function(){return o.get()},connect:function(e){i.set(e)},disconnect:function(){let e=i.get();null!=e&&t.set(e.get()),i.set(void 0)}}}let ri="__rk",ro="__ts",rr=new Set(["__v",ri,ro]),rs=tl(class extends directive_i{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let i=e.element.classList;for(let e of this.st)e in t||(i.remove(e),this.st.delete(e));for(let e in t){let o=!!t[e];o===this.st.has(e)||this.nt?.has(e)||(o?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return eC}});let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=e$,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===e$||null==e)return this._t=void 0,this.it=e;if(e===eC)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let rn=tl(unsafe_html_e),ra=j`
	:host {
		/* Banner color custom properties */
		--gl-banner-primary-background: var(--vscode-sideBar-background);
		--gl-banner-secondary-background: var(--vscode-editor-background);
		--gl-banner-primary-emphasis-background: var(--vscode-button-background);
		--gl-banner-secondary-emphasis-background: var(--vscode-button-secondaryBackground);
		--gl-banner-text-color: var(--vscode-foreground);
		--gl-banner-dim-text-color: var(--vscode-descriptionForeground);
		--gl-banner-transparency: 0.5;

		/* Layout properties */
		--gl-banner-padding: 1.2rem;
		--gl-banner-gap: 0.8rem;
		--gl-banner-border-radius: var(--gl-radius-sm);

		/* Button customization - use 8px horizontal padding, keep original vertical padding */
		--gl-banner-button-padding: 0.4rem 0.8rem;

		display: block;
		margin-block-end: var(--gl-space-12);
	}

	.banner {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: var(--gl-banner-padding);
		container-type: inline-size;
		overflow: hidden;
		border-radius: var(--gl-banner-border-radius);
	}

	/* Solid display mode - same as card background */
	.banner--solid {
		background-color: var(--gl-banner-primary-background);
		border: var(--gl-border-width) solid
			color-mix(in lab, var(--gl-banner-primary-background) 100%, var(--vscode-foreground) 12%);
	}

	/* Outline display mode - emphasis color outline with secondary background */
	.banner--outline {
		background-color: var(--gl-banner-secondary-background);
		border: 2px solid var(--gl-banner-primary-emphasis-background);
	}

	/* Gradient display mode - horizontal gradient from primary to secondary emphasis */
	.banner--gradient {
		background: linear-gradient(
			to right,
			var(--gl-banner-primary-emphasis-background) 0%,
			var(--gl-banner-secondary-emphasis-background) 100%
		);
		border: var(--gl-border-width) solid
			color-mix(
				in lab,
				var(--gl-banner-primary-emphasis-background) 50%,
				var(--gl-banner-secondary-emphasis-background) 50%
			);
	}

	/* Gradient transparent display mode - same gradient but with transparency */
	.banner--gradient-transparent {
		background: linear-gradient(
			to right,
			color-mix(
					in lab,
					var(--gl-banner-primary-emphasis-background) calc(100% * (1 - var(--gl-banner-transparency))),
					transparent
				)
				0%,
			color-mix(
					in lab,
					var(--gl-banner-secondary-emphasis-background) calc(100% * (1 - var(--gl-banner-transparency))),
					transparent
				)
				100%
		);
		border: var(--gl-border-width) solid
			color-mix(
				in lab,
				color-mix(
						in lab,
						var(--gl-banner-primary-emphasis-background) 50%,
						var(--gl-banner-secondary-emphasis-background) 50%
					)
					calc(100% * (1 - var(--gl-banner-transparency))),
				transparent
			);
	}

	/* Gradient purple display mode - matches the auto-composer container styling */
	.banner--gradient-purple {
		background: var(--gl-gradient-brand-subtle);
		border: var(--gl-border-width) solid var(--vscode-panel-border);
		border-radius: var(--gl-radius-md);
	}

	.banner--gradient-purple .banner__title {
		font-size: var(--gl-font-base);
		font-weight: normal;
		color: var(--vscode-foreground);
	}

	.banner--gradient-purple .banner__body {
		font-size: var(--gl-font-md);
		line-height: 1.4;
		color: var(--vscode-descriptionForeground);
	}

	.banner--gradient-purple .banner__body a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}

	.banner--gradient-purple .banner__body a:hover {
		color: var(--vscode-textLink-activeForeground);
		text-decoration: underline;
	}

	.banner__content {
		display: flex;
		flex-direction: column;
		gap: var(--gl-banner-gap);
		align-items: center;
		text-align: center;
	}

	/* Responsive layout */
	.banner--responsive .banner__content {
		display: flex;
		flex-direction: column;
		gap: var(--gl-banner-gap);
		align-items: stretch;
		text-align: left;
	}

	.banner--responsive .banner__text {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-4);
	}

	.banner--responsive .banner__title,
	.banner--responsive .banner__body {
		text-align: left;
	}

	/* < 500px: Stack vertically with full-width buttons */
	.banner--responsive .banner__buttons {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-8);
		width: 100%;
		margin-top: var(--gl-space-8);
	}

	.banner--responsive .banner__button {
		flex: 1;
		grid-column: unset;
		justify-content: center;
		justify-self: unset;
		width: 100% !important;
		min-width: 100% !important;
		max-width: 100% !important;
	}

	/* >= 500px: Three-group horizontal layout */
	@container (min-width: 500px) {
		.banner--responsive .banner__content {
			flex-direction: row;
			gap: var(--gl-space-16);
			align-items: center;
		}

		/* Group 1: Text content (left-aligned) */
		.banner--responsive .banner__text {
			flex: 1;
			align-self: center;
			min-width: 0;
		}

		/* Group 2: Buttons (content-sized) */
		.banner--responsive .banner__buttons {
			display: flex;
			flex-shrink: 0;
			flex-direction: column;
			gap: var(--gl-space-8);
			align-self: center;
			width: auto;
			margin-top: 0;
		}

		.banner--responsive .banner__button {
			width: auto;
			white-space: nowrap;
		}

		/* Group 3: Dismiss button (to the right of buttons) */
		.banner--responsive .banner__dismiss {
			position: static !important;
			top: auto !important;
			right: auto !important;
			flex-shrink: 0;
			align-self: center;
		}
	}

	.banner__title {
		margin: 0;
		font-size: 1.2em;
		font-weight: bold;
		color: var(--gl-banner-text-color);
		text-wrap: pretty;
	}

	.banner__body {
		margin: 0;
		font-size: 1em;
		line-height: 1.4;
		color: var(--gl-banner-text-color);
		text-wrap: pretty;
	}

	.banner__buttons {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: var(--gl-space-8);
		align-items: center;
		width: 100%;
		margin-top: var(--gl-space-8);
	}

	.banner:not(.banner--gradient-purple) .banner__button--primary {
		grid-column: 2;
		justify-self: center;
		white-space: nowrap;
		--button-background: color-mix(in lab, var(--gl-banner-primary-background) 10%, #fff 20%);
		--button-foreground: var(--gl-banner-text-color);
		--button-hover-background: color-mix(in lab, var(--gl-banner-primary-background) 20%, #fff 30%);
		--button-padding: var(--gl-banner-button-padding);
	}

	.banner--gradient-purple .banner__button--primary {
		grid-column: 2;
		justify-self: center;
		white-space: nowrap;
		--button-padding: var(--gl-banner-button-padding);
	}

	.banner__button--secondary {
		grid-column: 3;
		justify-self: end;
		white-space: nowrap;
		--button-background: transparent;
		--button-foreground: var(--gl-banner-dim-text-color);
		--button-hover-background: color-mix(in lab, var(--gl-banner-dim-text-color) 10%, transparent);
	}

	/* When only primary button exists, center it across the full width */
	.banner__buttons:has(.banner__button--primary):not(:has(.banner__button--secondary)) .banner__button--primary {
		grid-column: 1 / -1;
		justify-self: center;
	}

	/* Dismiss button */
	.banner__dismiss {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		--button-background: transparent;
		--button-foreground: var(--gl-banner-dim-text-color);
		--button-hover-background: color-mix(in lab, var(--gl-banner-dim-text-color) 15%, transparent);
		--button-padding: 0.4rem;

		z-index: 1;
	}

	/* Responsive layout dismiss button */
	.banner--responsive .banner__dismiss {
		/* < 500px: Upper right corner (default positioning) */
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
	}

	/* Theme-specific adjustments */

	/* Light theme: Brighten gradient colors for better contrast with dark text */
	:host-context(.vscode-light),
	:host-context(.vscode-high-contrast-light) {
		--gl-banner-primary-emphasis-background: color-mix(in lab, var(--vscode-button-background) 40%, #fff 60%);
		--gl-banner-secondary-emphasis-background: color-mix(
			in lab,
			var(--vscode-button-secondaryBackground) 40%,
			#fff 60%
		);
	}

	/* Override text color for high contrast light theme specifically */
	:host-context(.vscode-high-contrast-light) {
		--gl-banner-text-color: #000;
	}

	:host-context(.vscode-dark) .banner:not(.banner--gradient-purple) .banner__button--primary,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light))
		.banner:not(.banner--gradient-purple)
		.banner__button--primary {
		--button-background: color-mix(in lab, var(--gl-banner-primary-background) 10%, #fff 20%);
		--button-hover-background: color-mix(in lab, var(--gl-banner-primary-background) 20%, #fff 30%);
		--button-foreground: #fff;
	}

	:host-context(.vscode-light) .banner:not(.banner--gradient-purple) .banner__button--primary,
	:host-context(.vscode-high-contrast-light) .banner:not(.banner--gradient-purple) .banner__button--primary {
		--button-background: color-mix(in lab, var(--gl-banner-primary-background) 8%, #fff 25%);
		--button-hover-background: color-mix(in lab, var(--gl-banner-primary-background) 15%, #fff 35%);
		--button-foreground: #000;
	}

	/* Make banner text darker in light themes */
	:host-context(.vscode-light) .banner__body,
	:host-context(.vscode-high-contrast-light) .banner__body {
		color: color-mix(in lab, var(--gl-banner-text-color) 20%, #000 80%);
	}

	/* Strong colors for banner title - pure black/white for maximum contrast */
	:host-context(.vscode-light) .banner__title,
	:host-context(.vscode-high-contrast-light) .banner__title {
		color: #000 !important;
	}

	:host-context(.vscode-dark) .banner__title,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .banner__title {
		color: #fff !important;
	}

	/* Responsive adjustments */
	@media (width <= 640px) {
		.banner__buttons {
			flex-direction: column;
			width: 100%;
		}

		.banner__button {
			width: 100%;
		}
	}

	/* More aggressive responsive layout for narrow sidebars */
	@media (width <= 400px) {
		.banner__buttons {
			display: flex;
			flex-direction: column;
			gap: var(--gl-space-6);
			align-items: center;
			width: 100%;
			margin-top: var(--gl-space-8);
		}

		.banner__button--primary,
		.banner__button--secondary {
			grid-column: unset;
			justify-self: unset;
			width: 100%;
			max-width: 200px;
		}

		.banner__button--primary {
			order: 1;
		}

		.banner__button--secondary {
			order: 2;
		}
	}

	/* Support for custom banner buttons layout */
	:host([data-banner-buttons-layout='column']) .banner__buttons,
	.banner__buttons[data-layout='column'] {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-6);
		align-items: center;
		width: 100%;
		margin-top: var(--gl-space-8);
	}

	:host([data-banner-buttons-layout='column']) .banner__button--primary,
	:host([data-banner-buttons-layout='column']) .banner__button--secondary,
	.banner__buttons[data-layout='column'] .banner__button--primary,
	.banner__buttons[data-layout='column'] .banner__button--secondary {
		grid-column: unset;
		justify-self: unset;
		width: 100%;
		max-width: 200px;
	}
`,rl=j`
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;j`
	.sr-only,
	.sr-only-focusable:not(:active, :focus-visible, :focus-within) {
		${rl}
	}
`;let rc=j`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: -1px;
`,rh=j`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: 2px;
`;j`
	:focus-visible {
		${rc}
	}
`;let rd=j`
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
`;j`
	* {
		box-sizing: border-box;
	}
`,j`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}

	a:focus {
		${rc}
	}

	a:hover {
		text-decoration: underline;
	}
`;let rp=j`
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
`;j`
	.inline-code {
		padding: 0 var(--gl-space-4) var(--gl-space-2);
		font-family: var(--vscode-editor-font-family);
		background: var(--vscode-textCodeBlock-background);
		border-radius: var(--gl-radius-sm);
	}
`;let ru=j`
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
`;j`
	:host {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		overflow: hidden;
	}
`;let rg=j`
	:host {
		--gl-metadata-bar-bg: color-mix(in srgb, var(--color-background) 95%, var(--color-foreground) 5%);
		--gl-metadata-bar-border: var(--vscode-sideBarSectionHeader-border, var(--color-foreground--25));
		--gl-metadata-bar-min-height: 2.94rem;
	}
`,rm=j`
	border: var(--gl-border-width) solid var(--gl-elevation-border-color, var(--vscode-contrastBorder));
	box-shadow: var(--gl-elevation);
`;function rf(e){return e?.includes(`
`)?rn(e.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):e}var rb=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},rv=j`
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
`,r_=Object.defineProperty,ry=Object.getOwnPropertyDescriptor,rw=e=>{throw TypeError(e)},rx=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?ry(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&r_(t,i,s),s},rk=(e,t,i)=>t.has(e)||rw("Cannot "+i),rC=j`
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
`,r$=/;\s+$/;function rS(e){let{property:t,value:i,element:o}=e;if(i){let e=o.getAttribute("style")||"";e&&(e.match(r$)||(e+=";"),e+=" ");let r=`${t}: ${i}`;if(e.includes(r))return;return`${e}${r};`}return null}var rE=class extends lit_element_i{constructor(){let e;super(),(e=C).has(this)?rw("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(this):e.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,t)=>{if(this.internals?.states)try{t?this.internals.states.add(e):this.internals.states.delete(e)}catch(e){if(String(e).includes("must start with '--'"));else throw e}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{}for(let[e,t]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===t.default&&void 0!==t.initial&&"string"==typeof e&&this.customStates.set(`initial-${e}-${t.initial}`,!0)}static get styles(){return[rC,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))})}attributeChangedCallback(e,t,i){let o,r;if(rk(this,o=C,"read from private field"),r?!r.call(this):!o.get(this)){let e,t;this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),rk(this,e=C,"write to private field"),t?t.call(this,!0):e.set(this,!0)}super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&null==this[i]&&(this[i]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(e){if(this.didSSR&&!this.hasUpdated){let t=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});t.error=e,this.dispatchEvent(t)}throw e}}setStyle(e,t){if(!this.style){let i=rS({property:e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),value:t,element:this});i&&this.setAttribute("style",i);return}this.style[e]=t}setStyleProperty(e,t){if(!this.style){let i=rS({property:e,value:t,element:this});i&&this.setAttribute("style",i);return}this.style.setProperty(e,t)}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};C=new WeakMap,rx([ej()],rE.prototype,"dir",2),rx([ej()],rE.prototype,"lang",2),rx([ej({type:Boolean,reflect:!0,attribute:"did-ssr"})],rE.prototype,"didSSR",2);let rA=new Set,rI=new Map,rP="ltr",rz="en",rT="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(rT){let e=new MutationObserver(rM);rP=document.documentElement.dir||"ltr",rz=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function rR(...e){e.map(e=>{let t=e.$code.toLowerCase();rI.has(t)?rI.set(t,Object.assign(Object.assign({},rI.get(t)),e)):rI.set(t,e),p||(p=e)}),rM()}function rM(){rT&&(rP=document.documentElement.dir||"ltr",rz=document.documentElement.lang||navigator.language),[...rA.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){rA.add(this.host)}hostDisconnected(){rA.delete(this.host)}dir(){return`${this.host.dir||rP}`.toLowerCase()}lang(){return`${this.host.lang||rz}`.toLowerCase()}getTranslationData(e){var t,i;let o;try{o=new Intl.Locale(e.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let r=o.language.toLowerCase(),s=null!=(i=null==(t=o.region)?void 0:t.toLowerCase())?i:"",a=rI.get(`${r}-${s}`),c=rI.get(r);return{locale:o,language:r,region:s,primary:a,secondary:c}}exists(e,t){var i;let{primary:o,secondary:r}=this.getTranslationData(null!=(i=t.lang)?i:this.lang());return t=Object.assign({includeFallback:!1},t),!!o&&!!o[e]||!!r&&!!r[e]||!!t.includeFallback&&!!p&&!!p[e]}term(e,...t){let i,{primary:o,secondary:r}=this.getTranslationData(this.lang());if(o&&o[e])i=o[e];else if(r&&r[e])i=r[e];else{if(!p||!p[e])return String(e);i=p[e]}return"function"==typeof i?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}};var rB={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",captions:"Captions",chooseDate:"Choose date",chooseDecade:"Choose decade",chooseMonth:"Choose month",chooseYear:"Choose year",clearEntry:"Clear entry",close:"Close",closeCalendar:"Close calendar",createOption:e=>`Create "${e}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",date:"Date",datePickerKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",day:"Day",incompleteDate:"Enter a valid date.",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",empty:"Empty",endDate:"End date",error:"Error",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",month:"Month",moreOptions:"More Options",mute:"Mute",nextDecade:"Next decade",nextMonth:"Next month",nextSlide:"Next slide",nextVideo:"Next Video",nextYear:"Next year",numCharacters:e=>1===e?"1 character":`${e} characters`,numCharactersRemaining:e=>1===e?"1 character remaining":`${e} characters remaining`,numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",play:"Play",playbackSpeed:"Playback speed",playlist:"Playlist",playAnimation:"Play animation",previousDecade:"Previous decade",previousMonth:"Previous month",previousSlide:"Previous slide",previousVideo:"Previous video",previousYear:"Previous year",progress:"Progress",rangeTooLong:e=>1===e?"Select a range no longer than 1 day":`Select a range no longer than ${e} days`,rangeTooShort:e=>1===e?"Select a range at least 1 day long":`Select a range at least ${e} days long`,readonly:"Read-only",selected:"Selected",selectedDateLabel:e=>`Selected: ${e}`,selectedRangeLabel:e=>`Selected range: ${e}`,selectionCleared:"Selection cleared",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,startDate:"Start date",today:"Today",toggleColorFormat:"Toggle color format",seek:"Seek",seekProgress:(e,t)=>`${e} of ${t}`,currentlyPlaying:"currently playing",unmute:"Unmute",videoPlayer:"Video player",volume:"Volume",year:"Year",zoomIn:"Zoom in",zoomOut:"Zoom out",am:"AM",chooseTime:"Choose time",closeTimeInput:"Close time picker",dayPeriod:"AM/PM",hour:"Hour",minute:"Minute",now:"Now",pm:"PM",second:"Second",time:"Time",timeInputKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the time picker."};rR(rB);var rj=class extends LocalizeController{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||"en":super.lang()}};rR(rB);let rO=Math.min,rD=Math.max,rL=Math.round,rF=Math.floor,rN=e=>({x:e,y:e}),rq={left:"right",right:"left",bottom:"top",top:"bottom"};function rU(e,t){return"function"==typeof e?e(t):e}function rW(e){return e.split("-")[0]}function rH(e){return e.split("-")[1]}function rV(e){return"x"===e?"y":"x"}function rK(e){return"y"===e?"height":"width"}function rG(e){let t=e[0];return"t"===t||"b"===t?"y":"x"}function rZ(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}let rY=["left","right"],rX=["right","left"],rJ=["top","bottom"],rQ=["bottom","top"];function r0(e){let t=rW(e);return rq[t]+e.slice(t.length)}function r1(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function r2(e){let{x:t,y:i,width:o,height:r}=e;return{width:o,height:r,top:i,left:t,right:t+o,bottom:i+r,x:t,y:i}}function r5(e,t,i){let o,{reference:r,floating:s}=e,a=rG(t),c=rV(rG(t)),h=rK(c),p=rW(t),u="y"===a,g=r.x+r.width/2-s.width/2,m=r.y+r.height/2-s.height/2,f=r[h]/2-s[h]/2;switch(p){case"top":o={x:g,y:r.y-s.height};break;case"bottom":o={x:g,y:r.y+r.height};break;case"right":o={x:r.x+r.width,y:m};break;case"left":o={x:r.x-s.width,y:m};break;default:o={x:r.x,y:r.y}}switch(rH(t)){case"start":o[c]-=f*(i&&u?-1:1);break;case"end":o[c]+=f*(i&&u?-1:1)}return o}async function r3(e,t){var i;void 0===t&&(t={});let{x:o,y:r,platform:s,rects:a,elements:c,strategy:h}=e,{boundary:p="clippingAncestors",rootBoundary:u="viewport",elementContext:g="floating",altBoundary:m=!1,padding:f=0}=rU(t,e),b=r1(f),v=c[m?"floating"===g?"reference":"floating":g],_=r2(await s.getClippingRect({element:null==(i=await (null==s.isElement?void 0:s.isElement(v)))||i?v:v.contextElement||await (null==s.getDocumentElement?void 0:s.getDocumentElement(c.floating)),boundary:p,rootBoundary:u,strategy:h})),w="floating"===g?{x:o,y:r,width:a.floating.width,height:a.floating.height}:a.reference,x=await (null==s.getOffsetParent?void 0:s.getOffsetParent(c.floating)),C=await (null==s.isElement?void 0:s.isElement(x))&&await (null==s.getScale?void 0:s.getScale(x))||{x:1,y:1},$=r2(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:w,offsetParent:x,strategy:h}):w);return{top:(_.top-$.top+b.top)/C.y,bottom:($.bottom-_.bottom+b.bottom)/C.y,left:(_.left-$.left+b.left)/C.x,right:($.right-_.right+b.right)/C.x}}let r4=async(e,t,i)=>{let{placement:o="bottom",strategy:r="absolute",middleware:s=[],platform:a}=i,c=a.detectOverflow?a:{...a,detectOverflow:r3},h=await (null==a.isRTL?void 0:a.isRTL(t)),p=await a.getElementRects({reference:e,floating:t,strategy:r}),{x:u,y:g}=r5(p,o,h),m=o,f=0,b={};for(let i=0;i<s.length;i++){let v=s[i];if(!v)continue;let{name:_,fn:w}=v,{x:x,y:C,data:$,reset:S}=await w({x:u,y:g,initialPlacement:o,placement:m,strategy:r,middlewareData:b,rects:p,platform:c,elements:{reference:e,floating:t}});u=null!=x?x:u,g=null!=C?C:g,b[_]={...b[_],...$},S&&f<50&&(f++,"object"==typeof S&&(S.placement&&(m=S.placement),S.rects&&(p=!0===S.rects?await a.getElementRects({reference:e,floating:t,strategy:r}):S.rects),{x:u,y:g}=r5(p,m,h)),i=-1)}return{x:u,y:g,placement:m,strategy:r,middlewareData:b}},r6=new Set(["left","top"]);async function r7(e,t){let{placement:i,platform:o,elements:r}=e,s=await (null==o.isRTL?void 0:o.isRTL(r.floating)),a=rW(i),c=rH(i),h="y"===rG(i),p=r6.has(a)?-1:1,u=s&&h?-1:1,g=rU(t,e),{mainAxis:m,crossAxis:f,alignmentAxis:b}="number"==typeof g?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:g.mainAxis||0,crossAxis:g.crossAxis||0,alignmentAxis:g.alignmentAxis};return c&&"number"==typeof b&&(f="end"===c?-1*b:b),h?{x:f*u,y:m*p}:{x:m*p,y:f*u}}function r8(){return"u">typeof window}function r9(e){return si(e)?(e.nodeName||"").toLowerCase():"#document"}function se(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function st(e){var t;return null==(t=(si(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function si(e){return!!r8()&&(e instanceof Node||e instanceof se(e).Node)}function so(e){return!!r8()&&(e instanceof Element||e instanceof se(e).Element)}function sr(e){return!!r8()&&(e instanceof HTMLElement||e instanceof se(e).HTMLElement)}function ss(e){return!(!r8()||"u"<typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof se(e).ShadowRoot)}function sn(e){let{overflow:t,overflowX:i,overflowY:o,display:r}=sg(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+i)&&"inline"!==r&&"contents"!==r}function sa(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}let sl=/transform|translate|scale|rotate|perspective|filter/,sc=/paint|layout|strict|content/,sh=e=>!!e&&"none"!==e;function sd(e){let t=so(e)?sg(e):e;return sh(t.transform)||sh(t.translate)||sh(t.scale)||sh(t.rotate)||sh(t.perspective)||!sp()&&(sh(t.backdropFilter)||sh(t.filter))||sl.test(t.willChange||"")||sc.test(t.contain||"")}function sp(){return null==u&&(u="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),u}function su(e){return/^(html|body|#document)$/.test(r9(e))}function sg(e){return se(e).getComputedStyle(e)}function sm(e){return so(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function sf(e){if("html"===r9(e))return e;let t=e.assignedSlot||e.parentNode||ss(e)&&e.host||st(e);return ss(t)?t.host:t}function sb(e,t,i){var o;void 0===t&&(t=[]),void 0===i&&(i=!0);let r=function e(t){let i=sf(t);return su(i)?t.ownerDocument?t.ownerDocument.body:t.body:sr(i)&&sn(i)?i:e(i)}(e),s=r===(null==(o=e.ownerDocument)?void 0:o.body),a=se(r);if(!s)return t.concat(r,sb(r,[],i));{let e=sv(a);return t.concat(a,a.visualViewport||[],sn(r)?r:[],e&&i?sb(e):[])}}function sv(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function s_(e){let t=sg(e),i=parseFloat(t.width)||0,o=parseFloat(t.height)||0,r=sr(e),s=r?e.offsetWidth:i,a=r?e.offsetHeight:o,c=rL(i)!==s||rL(o)!==a;return c&&(i=s,o=a),{width:i,height:o,$:c}}function sy(e){return so(e)?e:e.contextElement}function sw(e){let t=sy(e);if(!sr(t))return rN(1);let i=t.getBoundingClientRect(),{width:o,height:r,$:s}=s_(t),a=(s?rL(i.width):i.width)/o,c=(s?rL(i.height):i.height)/r;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}let sx=rN(0);function sk(e){let t=se(e);return sp()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:sx}function sC(e,t,i,o){var r;void 0===t&&(t=!1),void 0===i&&(i=!1);let s=e.getBoundingClientRect(),a=sy(e),c=rN(1);t&&(o?so(o)&&(c=sw(o)):c=sw(e));let h=(void 0===(r=i)&&(r=!1),o&&(!r||o===se(a))&&r)?sk(a):rN(0),p=(s.left+h.x)/c.x,u=(s.top+h.y)/c.y,g=s.width/c.x,m=s.height/c.y;if(a){let e=se(a),t=o&&so(o)?se(o):o,i=e,r=sv(i);for(;r&&o&&t!==i;){let e=sw(r),t=r.getBoundingClientRect(),o=sg(r),s=t.left+(r.clientLeft+parseFloat(o.paddingLeft))*e.x,a=t.top+(r.clientTop+parseFloat(o.paddingTop))*e.y;p*=e.x,u*=e.y,g*=e.x,m*=e.y,p+=s,u+=a,r=sv(i=se(r))}}return r2({width:g,height:m,x:p,y:u})}function s$(e,t){let i=sm(e).scrollLeft;return t?t.left+i:sC(st(e)).left+i}function sS(e,t){let i=e.getBoundingClientRect();return{x:i.left+t.scrollLeft-s$(e,i),y:i.top+t.scrollTop}}function sE(e,t,i){var o;let r;if("viewport"===t)r=function(e,t){let i=se(e),o=st(e),r=i.visualViewport,s=o.clientWidth,a=o.clientHeight,c=0,h=0;if(r){s=r.width,a=r.height;let e=sp();(!e||e&&"fixed"===t)&&(c=r.offsetLeft,h=r.offsetTop)}let p=s$(o);if(p<=0){let e=o.ownerDocument,t=e.body,i=getComputedStyle(t),r="CSS1Compat"===e.compatMode&&parseFloat(i.marginLeft)+parseFloat(i.marginRight)||0,a=Math.abs(o.clientWidth-t.clientWidth-r);a<=25&&(s-=a)}else p<=25&&(s+=p);return{width:s,height:a,x:c,y:h}}(e,i);else if("document"===t){let t,i,s,a,c,h,p;o=st(e),t=st(o),i=sm(o),s=o.ownerDocument.body,a=rD(t.scrollWidth,t.clientWidth,s.scrollWidth,s.clientWidth),c=rD(t.scrollHeight,t.clientHeight,s.scrollHeight,s.clientHeight),h=-i.scrollLeft+s$(o),p=-i.scrollTop,"rtl"===sg(s).direction&&(h+=rD(t.clientWidth,s.clientWidth)-a),r={width:a,height:c,x:h,y:p}}else if(so(t)){let e,o,s,a,c,h;o=(e=sC(t,!0,"fixed"===i)).top+t.clientTop,s=e.left+t.clientLeft,a=sr(t)?sw(t):rN(1),c=t.clientWidth*a.x,h=t.clientHeight*a.y,r={width:c,height:h,x:s*a.x,y:o*a.y}}else{let i=sk(e);r={x:t.x-i.x,y:t.y-i.y,width:t.width,height:t.height}}return r2(r)}function sA(e){return"static"===sg(e).position}function sI(e,t){if(!sr(e)||"fixed"===sg(e).position)return null;if(t)return t(e);let i=e.offsetParent;return st(e)===i&&(i=i.ownerDocument.body),i}function sP(e,t){var i;let o=se(e);if(sa(e))return o;if(!sr(e)){let t=sf(e);for(;t&&!su(t);){if(so(t)&&!sA(t))return t;t=sf(t)}return o}let r=sI(e,t);for(;r&&(i=r,/^(table|td|th)$/.test(r9(i)))&&sA(r);)r=sI(r,t);return r&&su(r)&&sA(r)&&!sd(r)?o:r||function(e){let t=sf(e);for(;sr(t)&&!su(t);){if(sd(t))return t;if(sa(t))break;t=sf(t)}return null}(e)||o}let sz=async function(e){let t=this.getOffsetParent||sP,i=this.getDimensions,o=await i(e.floating);return{reference:function(e,t,i){let o=sr(t),r=st(t),s="fixed"===i,a=sC(e,!0,s,t),c={scrollLeft:0,scrollTop:0},h=rN(0);if(o||!o&&!s)if(("body"!==r9(t)||sn(r))&&(c=sm(t)),o){let e=sC(t,!0,s,t);h.x=e.x+t.clientLeft,h.y=e.y+t.clientTop}else r&&(h.x=s$(r));s&&!o&&r&&(h.x=s$(r));let p=!r||o||s?rN(0):sS(r,c);return{x:a.left+c.scrollLeft-h.x-p.x,y:a.top+c.scrollTop-h.y-p.y,width:a.width,height:a.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},sT={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:i,offsetParent:o,strategy:r}=e,s="fixed"===r,a=st(o),c=!!t&&sa(t.floating);if(o===a||c&&s)return i;let h={scrollLeft:0,scrollTop:0},p=rN(1),u=rN(0),g=sr(o);if((g||!g&&!s)&&(("body"!==r9(o)||sn(a))&&(h=sm(o)),g)){let e=sC(o);p=sw(o),u.x=e.x+o.clientLeft,u.y=e.y+o.clientTop}let m=!a||g||s?rN(0):sS(a,h);return{width:i.width*p.x,height:i.height*p.y,x:i.x*p.x-h.scrollLeft*p.x+u.x+m.x,y:i.y*p.y-h.scrollTop*p.y+u.y+m.y}},getDocumentElement:st,getClippingRect:function(e){let{element:t,boundary:i,rootBoundary:o,strategy:r}=e,s=[..."clippingAncestors"===i?sa(t)?[]:function(e,t){let i=t.get(e);if(i)return i;let o=sb(e,[],!1).filter(e=>so(e)&&"body"!==r9(e)),r=null,s="fixed"===sg(e).position,a=s?sf(e):e;for(;so(a)&&!su(a);){let t=sg(a),i=sd(a);i||"fixed"!==t.position||(r=null),(s?i||r:!(!i&&"static"===t.position&&r&&("absolute"===r.position||"fixed"===r.position)||sn(a)&&!i&&function e(t,i){let o=sf(t);return!(o===i||!so(o)||su(o))&&("fixed"===sg(o).position||e(o,i))}(e,a)))?r=t:o=o.filter(e=>e!==a),a=sf(a)}return t.set(e,o),o}(t,this._c):[].concat(i),o],a=sE(t,s[0],r),c=a.top,h=a.right,p=a.bottom,u=a.left;for(let e=1;e<s.length;e++){let i=sE(t,s[e],r);c=rD(i.top,c),h=rO(i.right,h),p=rO(i.bottom,p),u=rD(i.left,u)}return{width:h-u,height:p-c,x:u,y:c}},getOffsetParent:sP,getElementRects:sz,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:i}=s_(e);return{width:t,height:i}},getScale:sw,isElement:so,isRTL:function(e){return"rtl"===sg(e).direction}};function sR(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}let sM=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var i,o;let r,s,{placement:a,rects:c,platform:h,elements:p}=t,{apply:u=()=>{},...g}=rU(e,t),m=await h.detectOverflow(t,g),f=rW(a),b=rH(a),v="y"===rG(a),{width:_,height:w}=c.floating;"top"===f||"bottom"===f?(r=f,s=b===(await (null==h.isRTL?void 0:h.isRTL(p.floating))?"start":"end")?"left":"right"):(s=f,r="end"===b?"top":"bottom");let x=w-m.top-m.bottom,C=_-m.left-m.right,$=rO(w-m[r],x),S=rO(_-m[s],C),E=!t.middlewareData.shift,A=$,P=S;if(null!=(i=t.middlewareData.shift)&&i.enabled.x&&(P=C),null!=(o=t.middlewareData.shift)&&o.enabled.y&&(A=x),E&&!b){let e=rD(m.left,0),t=rD(m.right,0),i=rD(m.top,0),o=rD(m.bottom,0);v?P=_-2*(0!==e||0!==t?e+t:rD(m.left,m.right)):A=w-2*(0!==i||0!==o?i+o:rD(m.top,m.bottom))}await u({...t,availableWidth:P,availableHeight:A});let T=await h.getDimensions(p.floating);return _!==T.width||w!==T.height?{reset:{rects:!0}}:{}}}};function sB(e){var t=e;for(let e=t;e;e=sj(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=sj(t);e;e=sj(e)){if(!(e instanceof Element))continue;let t=getComputedStyle(e);if("contents"!==t.display&&("static"!==t.position||sd(t)||"BODY"===e.tagName))return e}return null}function sj(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function sO(e){return null!==e&&"object"==typeof e&&"getBoundingClientRect"in e&&(!("contextElement"in e)||e instanceof Element)}var sD=!!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),sL=class extends rE{constructor(){super(...arguments),this.localize=new rj(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),o=0,r=0,s=0,a=0,c=0,h=0,p=0,u=0;i?e.top<t.top?(o=e.left,r=e.bottom,s=e.right,a=e.bottom,c=t.left,h=t.top,p=t.right,u=t.top):(o=t.left,r=t.bottom,s=t.right,a=t.bottom,c=e.left,h=e.top,p=e.right,u=e.top):e.left<t.left?(o=e.right,r=e.top,s=t.left,a=t.top,c=e.right,h=e.bottom,p=t.left,u=t.bottom):(o=t.right,r=t.top,s=e.left,a=e.top,c=t.right,h=t.bottom,p=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=sD,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||sO(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=function(e,t,i,o){let r;void 0===o&&(o={});let{ancestorScroll:s=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:p=!1}=o,u=sy(e),g=s||a?[...u?sb(u):[],...t?sb(t):[]]:[];g.forEach(e=>{s&&e.addEventListener("scroll",i,{passive:!0}),a&&e.addEventListener("resize",i)});let m=u&&h?function(e,t){let i,o=null,r=st(e);function s(){var e;clearTimeout(i),null==(e=o)||e.disconnect(),o=null}return!function a(c,h){void 0===c&&(c=!1),void 0===h&&(h=1),s();let p=e.getBoundingClientRect(),{left:u,top:g,width:m,height:f}=p;if(c||t(),!m||!f)return;let b={rootMargin:-rF(g)+"px "+-rF(r.clientWidth-(u+m))+"px "+-rF(r.clientHeight-(g+f))+"px "+-rF(u)+"px",threshold:rD(0,rO(1,h))||1},v=!0;function _(t){let o=t[0].intersectionRatio;if(o!==h){if(!v)return a();o?a(!1,o):i=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==o||sR(p,e.getBoundingClientRect())||a(),v=!1}try{o=new IntersectionObserver(_,{...b,root:r.ownerDocument})}catch{o=new IntersectionObserver(_,b)}o.observe(e)}(!0),s}(u,i):null,f=-1,b=null;c&&(b=new ResizeObserver(e=>{let[o]=e;o&&o.target===u&&b&&t&&(b.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;null==(e=b)||e.observe(t)})),i()}),u&&!p&&b.observe(u),t&&b.observe(t));let v=p?sC(e):null;return p&&function t(){let o=sC(e);v&&!sR(v,o)&&i(),v=o,r=requestAnimationFrame(t)}(),i(),()=>{var e;g.forEach(e=>{s&&e.removeEventListener("scroll",i),a&&e.removeEventListener("resize",i)}),null==m||m(),null==(e=b)||e.disconnect(),b=null,p&&cancelAnimationFrame(r)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){var e,t,i,o,r,s;let a,c,h,p,u;if(!this.active||!this.anchorEl||!this.popup)return;let g=[{name:"offset",options:e={mainAxis:this.distance,crossAxis:this.skidding},async fn(t){var i,o;let{x:r,y:s,placement:a,middlewareData:c}=t,h=await r7(t,e);return a===(null==(i=c.offset)?void 0:i.placement)&&null!=(o=c.arrow)&&o.alignmentOffset?{}:{x:r+h.x,y:s+h.y,data:{...h,placement:a}}}}];this.sync?g.push(sM({apply:({rects:e})=>{let t="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.SUPPORTS_POPOVER&&!sO(this.anchor)&&"scroll"===this.boundary&&(a=sb(this.anchorEl).filter(e=>e instanceof Element)),this.flip&&g.push({name:"flip",options:t={boundary:this.flipBoundary||a,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(e){var i,o,r,s,a,c,h,p;let u,g,m,{placement:f,middlewareData:b,rects:v,initialPlacement:_,platform:w,elements:x}=e,{mainAxis:C=!0,crossAxis:$=!0,fallbackPlacements:S,fallbackStrategy:E="bestFit",fallbackAxisSideDirection:A="none",flipAlignment:P=!0,...T}=rU(t,e);if(null!=(i=b.arrow)&&i.alignmentOffset)return{};let M=rW(f),B=rG(_),j=rW(_)===_,O=await (null==w.isRTL?void 0:w.isRTL(x.floating)),D=S||(j||!P?[r0(_)]:(u=r0(_),[rZ(_),u,rZ(u)])),F="none"!==A;!S&&F&&D.push(...(g=rH(_),m=function(e,t,i){switch(e){case"top":case"bottom":if(i)return t?rX:rY;return t?rY:rX;case"left":case"right":return t?rJ:rQ;default:return[]}}(rW(_),"start"===A,O),g&&(m=m.map(e=>e+"-"+g),P&&(m=m.concat(m.map(rZ)))),m));let N=[_,...D],q=await w.detectOverflow(e,T),U=[],W=(null==(o=b.flip)?void 0:o.overflows)||[];if(C&&U.push(q[M]),$){let e,t,i,o,r=(c=f,h=v,void 0===(p=O)&&(p=!1),e=rH(c),i=rK(t=rV(rG(c))),o="x"===t?e===(p?"end":"start")?"right":"left":"start"===e?"bottom":"top",h.reference[i]>h.floating[i]&&(o=r0(o)),[o,r0(o)]);U.push(q[r[0]],q[r[1]])}if(W=[...W,{placement:f,overflows:U}],!U.every(e=>e<=0)){let e=((null==(r=b.flip)?void 0:r.index)||0)+1,t=N[e];if(t&&("alignment"!==$||B===rG(t)||W.every(e=>rG(e.placement)!==B||e.overflows[0]>0)))return{data:{index:e,overflows:W},reset:{placement:t}};let i=null==(s=W.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:s.placement;if(!i)switch(E){case"bestFit":{let e=null==(a=W.filter(e=>{if(F){let t=rG(e.placement);return t===B||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:a[0];e&&(i=e);break}case"initialPlacement":i=_}if(f!==i)return{reset:{placement:i}}}return{}}}),this.shift&&g.push({name:"shift",options:i={boundary:this.shiftBoundary||a,padding:this.shiftPadding},async fn(e){let{x:t,y:o,placement:r,platform:s}=e,{mainAxis:a=!0,crossAxis:c=!1,limiter:h={fn:e=>{let{x:t,y:i}=e;return{x:t,y:i}}},...p}=rU(i,e),u={x:t,y:o},g=await s.detectOverflow(e,p),m=rG(rW(r)),f=rV(m),b=u[f],v=u[m];if(a){let e="y"===f?"top":"left",t="y"===f?"bottom":"right",i=b+g[e],o=b-g[t];b=rD(i,rO(b,o))}if(c){let e="y"===m?"top":"left",t="y"===m?"bottom":"right",i=v+g[e],o=v-g[t];v=rD(i,rO(v,o))}let _=h.fn({...e,[f]:b,[m]:v});return{..._,data:{x:_.x-t,y:_.y-o,enabled:{[f]:a,[m]:c}}}}}),this.autoSize?g.push(sM({boundary:this.autoSizeBoundary||a,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&g.push({name:"arrow",options:c={element:this.arrowEl,padding:this.arrowPadding},async fn(e){let{x:t,y:i,placement:o,rects:r,platform:s,elements:a,middlewareData:h}=e,{element:p,padding:u=0}=rU(c,e)||{};if(null==p)return{};let g=r1(u),m={x:t,y:i},f=rV(rG(o)),b=rK(f),v=await s.getDimensions(p),_="y"===f,w=_?"clientHeight":"clientWidth",x=r.reference[b]+r.reference[f]-m[f]-r.floating[b],C=m[f]-r.reference[f],$=await (null==s.getOffsetParent?void 0:s.getOffsetParent(p)),S=$?$[w]:0;S&&await (null==s.isElement?void 0:s.isElement($))||(S=a.floating[w]||r.floating[b]);let E=S/2-v[b]/2-1,A=rO(g[_?"top":"left"],E),P=rO(g[_?"bottom":"right"],E),T=S-v[b]-P,M=S/2-v[b]/2+(x/2-C/2),B=rD(A,rO(M,T)),j=!h.arrow&&null!=rH(o)&&M!==B&&r.reference[b]/2-(M<A?A:P)-v[b]/2<0,O=j?M<A?M-A:M-T:0;return{[f]:m[f]+O,data:{[f]:B,centerOffset:M-B-O,...j&&{alignmentOffset:O}},reset:j}}});let m=this.SUPPORTS_POPOVER?e=>sT.getOffsetParent(e,sB):sT.getOffsetParent;(o=this.anchorEl,r=this.popup,s={placement:this.placement,middleware:g,strategy:this.SUPPORTS_POPOVER?"absolute":"fixed",platform:{...sT,getOffsetParent:m}},h=new Map,u={...(p={platform:sT,...s}).platform,_c:h},r4(o,r,{...p,platform:u})).then(({x:e,y:t,middlewareData:i,placement:o})=>{let r="rtl"===this.localize.dir(),s={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=i.arrow.x,t=i.arrow.y,o="",a="",c="",h="";if("start"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=r?i:"",h=r?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=r?"":i,h=r?i:"",c="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(h="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",o="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(h="number"==typeof e?`${e}px`:"",o="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:o,right:a,bottom:c,left:h,[s]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new rb)}render(){return ex`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${rs({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${rs({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?ex`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};sL.css=rv,rx([eL(".popup")],sL.prototype,"popup",2),rx([eL(".arrow")],sL.prototype,"arrowEl",2),rx([ej({attribute:!1,type:Boolean})],sL.prototype,"SUPPORTS_POPOVER",2),rx([ej()],sL.prototype,"anchor",2),rx([ej({type:Boolean,reflect:!0})],sL.prototype,"active",2),rx([ej({reflect:!0})],sL.prototype,"placement",2),rx([ej()],sL.prototype,"boundary",2),rx([ej({type:Number})],sL.prototype,"distance",2),rx([ej({type:Number})],sL.prototype,"skidding",2),rx([ej({type:Boolean})],sL.prototype,"arrow",2),rx([ej({attribute:"arrow-placement"})],sL.prototype,"arrowPlacement",2),rx([ej({attribute:"arrow-padding",type:Number})],sL.prototype,"arrowPadding",2),rx([ej({type:Boolean})],sL.prototype,"flip",2),rx([ej({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],sL.prototype,"flipFallbackPlacements",2),rx([ej({attribute:"flip-fallback-strategy"})],sL.prototype,"flipFallbackStrategy",2),rx([ej({type:Object})],sL.prototype,"flipBoundary",2),rx([ej({attribute:"flip-padding",type:Number})],sL.prototype,"flipPadding",2),rx([ej({type:Boolean})],sL.prototype,"shift",2),rx([ej({type:Object})],sL.prototype,"shiftBoundary",2),rx([ej({attribute:"shift-padding",type:Number})],sL.prototype,"shiftPadding",2),rx([ej({attribute:"auto-size"})],sL.prototype,"autoSize",2),rx([ej()],sL.prototype,"sync",2),rx([ej({type:Object})],sL.prototype,"autoSizeBoundary",2),rx([ej({attribute:"auto-size-padding",type:Number})],sL.prototype,"autoSizePadding",2),rx([ej({attribute:"hover-bridge",type:Boolean})],sL.prototype,"hoverBridge",2),sL=rx([eM("wa-popup")],sL);var sF=Object.defineProperty,sN=Object.getOwnPropertyDescriptor,sq=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?sN(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&sF(t,i,s),s};let sU=0,sW=[],sH=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.showDelay=500,this.hideDelay=0,this.suppressed=!1,this.open=!1,this.bodyId=`gl-tooltip-${++sU}`,this.onAnchorSlotChange=e=>{let t=e.target.assignedElements({flatten:!0})[0];t!==this.anchorEl&&(this.detachAnchor(),this.attachAnchor(t))},this.onDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&sW.at(-1)===this&&(e.preventDefault(),e.stopPropagation(),this.open=!1)},this.onMouseOver=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!0},this.showDelay))},this.onMouseOut=()=>{this.anchorEl?.matches(":hover")||this.matches(":hover")||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!1},this.hideDelay))},this.onFocusIn=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.open=!0)},this.onFocusOut=()=>{clearTimeout(this.hoverTimeout),this.open=!1},this.onMouseDown=e=>{this.suppressed=!0,this.open=!1},this.onMouseUp=e=>{this.suppressed=!1},this.onDragStart=e=>{this.suppressed=!0,this.open=!1},this.onDragEnd=e=>{this.suppressed=!1},this.onClick=e=>{this.hideOnClick&&(this.open=!1)}}connectedCallback(){super.connectedCallback?.(),this.eventController=new AbortController;let{signal:e}=this.eventController;this.addEventListener("mouseover",this.onMouseOver,{signal:e}),this.addEventListener("mouseout",this.onMouseOut,{signal:e}),this.addEventListener("focusin",this.onFocusIn,{signal:e}),this.addEventListener("focusout",this.onFocusOut,{signal:e}),this.addEventListener("mousedown",this.onMouseDown,{signal:e}),this.addEventListener("click",this.onClick,{signal:e}),window.addEventListener("mouseup",this.onMouseUp,{signal:e}),window.addEventListener("dragstart",this.onDragStart,{capture:!0,signal:e}),window.addEventListener("dragend",this.onDragEnd,{capture:!0,signal:e})}disconnectedCallback(){this.eventController?.abort(),this.eventController=void 0,this.detachAnchor(),this.unregisterDismissible(),clearTimeout(this.hoverTimeout),super.disconnectedCallback?.()}updated(e){e.has("open")&&(this.open?this.registerDismissible():this.unregisterDismissible()),e.has("disabled")&&this.disabled&&this.open&&(this.open=!1)}attachAnchor(e){null!=e&&(this.anchorEl=e,this.addAriaDescribedBy(e,this.bodyId))}detachAnchor(){null!=this.anchorEl&&(this.removeAriaDescribedBy(this.anchorEl,this.bodyId),this.anchorEl=void 0)}addAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);i.includes(t)||(i.push(t),e.setAttribute("aria-describedby",i.join(" ")))}removeAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean).filter(e=>e!==t);0===i.length?e.removeAttribute("aria-describedby"):e.setAttribute("aria-describedby",i.join(" "))}registerDismissible(){sW.includes(this)||(sW.push(this),document.addEventListener("keydown",this.onDocumentKeyDown,{signal:this.eventController?.signal}))}unregisterDismissible(){let e=sW.indexOf(this);-1!==e&&sW.splice(e,1),document.removeEventListener("keydown",this.onDocumentKeyDown)}async hide(){this.open=!1,await this.updateComplete}async show(){this.disabled||this.suppressed||(this.open=!0,await this.updateComplete)}render(){return ex`<wa-popup
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
				<slot name="content">${rf(this.content)}</slot>
			</div>
		</wa-popup>`}};sH.styles=j`
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

			${rm}
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
	`,sq([ej()],sH.prototype,"content",2),sq([ej({reflect:!0})],sH.prototype,"placement",2),sq([ej({type:Boolean})],sH.prototype,"disabled",2),sq([ej({type:Number})],sH.prototype,"distance",2),sq([ej({type:Number,attribute:"show-delay"})],sH.prototype,"showDelay",2),sq([ej({type:Number,attribute:"hide-delay"})],sH.prototype,"hideDelay",2),sq([ej({type:Boolean,attribute:"hide-on-click"})],sH.prototype,"hideOnClick",2),sq([eL("wa-popup")],sH.prototype,"popup",2),sq([eO()],sH.prototype,"suppressed",2),sq([eO()],sH.prototype,"open",2),sH=sq([eM("gl-tooltip")],sH);var sV=Object.defineProperty,sK=Object.getOwnPropertyDescriptor,sG=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?sK(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&sV(t,i,s),s};let sZ=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1,this.ariaLabel=null}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(e){if(e.has("href")&&this.setAttribute("role",this.href?"link":"button"),e.has("disabled")){let t=e.get("disabled");t?this.setAttribute("aria-disabled",t.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(e)}render(){return this.tooltip?ex`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??e$}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?ex`<gl-tooltip placement=${this.tooltipPlacement??e$}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?ex`<a
				class="control"
				aria-label=${this.ariaLabel??e$}
				tabindex="${(!1===this.disabled?void 0:-1)??e$}"
				href=${this.href}
				@keypress=${e=>this.onLinkKeypress(e)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:ex`<button
			class="control"
			role=${this.role??e$}
			aria-label=${this.ariaLabel??e$}
			aria-checked=${this.ariaChecked??e$}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(e){" "===e.key&&this.control.click()}focus(e){this.control.focus(e)}blur(){this.control.blur()}click(){this.control.click()}};sZ.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sZ.styles=[rd,j`
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
				${rh}
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
		`],sG([eL(".control")],sZ.prototype,"control",2),sG([ej({reflect:!0})],sZ.prototype,"appearance",2),sG([ej({reflect:!0})],sZ.prototype,"variant",2),sG([ej({type:Boolean,reflect:!0})],sZ.prototype,"disabled",2),sG([ej({reflect:!0})],sZ.prototype,"density",2),sG([ej({type:Boolean,reflect:!0})],sZ.prototype,"full",2),sG([ej()],sZ.prototype,"href",2),sG([ej()],sZ.prototype,"tooltip",2),sG([ej()],sZ.prototype,"tooltipPlacement",2),sG([ej({type:Boolean,reflect:!0})],sZ.prototype,"truncate",2),sG([ej({type:String,attribute:"aria-label"})],sZ.prototype,"ariaLabel",2),sZ=sG([eM("gl-button")],sZ);var sY=Object.defineProperty,sX=Object.getOwnPropertyDescriptor,sJ=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?sX(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&sY(t,i,s),s};let sQ=class extends lit_element_i{constructor(){super(...arguments),this.display="solid",this.dismissible=!1,this.layout="default"}get classNames(){return{banner:!0,[`banner--${this.display}`]:!0,[`banner--${this.layout}`]:"default"!==this.layout}}render(){return ex`<div part="base" class=${rs(this.classNames)}>
			<div class="banner__content">
				${"responsive"===this.layout?this.renderResponsiveContent():this.renderDefaultContent()}
			</div>
			${"responsive"!==this.layout?this.renderDismissButton():void 0}
		</div>`}renderDefaultContent(){return ex`${this.renderTitle()} ${this.renderBody()} ${this.renderButtons()}`}renderResponsiveContent(){return ex`
			<div class="banner__text">${this.renderTitle()} ${this.renderBody()}</div>
			${this.renderButtons()} ${this.renderDismissButton()}
		`}renderTitle(){if(this.bannerTitle)return ex`<div class="banner__title">${this.bannerTitle}</div>`}renderBody(){if(this.body)return ex`<div class="banner__body">${rn(this.body)}</div>`}renderButtons(){let e=this.renderPrimaryButton(),t=this.renderSecondaryButton();if(e||t)return ex`<div class="banner__buttons">${e} ${t}</div>`}renderPrimaryButton(){if(this.primaryButton)return ex`
			<gl-button
				class="banner__button banner__button--primary"
				appearance=${"gradient-purple"===this.display?"secondary":void 0}
				?full=${"gradient-purple"===this.display}
				href=${this.primaryButtonHref??e$}
				truncate
				@click=${this.onPrimaryButtonClick}
			>
				${this.primaryButton}
			</gl-button>
		`}renderSecondaryButton(){if(this.secondaryButton)return ex`
			<gl-button
				class="banner__button banner__button--secondary"
				appearance="toolbar"
				href=${this.secondaryButtonHref??e$}
				@click=${this.onSecondaryButtonClick}
			>
				${this.secondaryButton}
			</gl-button>
		`}renderDismissButton(){if(this.dismissible)return ex`
			<gl-button
				class="banner__dismiss"
				appearance="toolbar"
				href=${this.dismissHref??e$}
				aria-label="Dismiss"
				tooltip="Dismiss"
				@click=${this.onDismissClick}
			>
				<code-icon icon="close"></code-icon>
			</gl-button>
		`}onPrimaryButtonClick(e){this.primaryButtonCommand&&e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-primary-click",{detail:{command:this.primaryButtonCommand},bubbles:!0,composed:!0}))}onSecondaryButtonClick(e){this.secondaryButtonCommand&&e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-secondary-click",{detail:{command:this.secondaryButtonCommand},bubbles:!0,composed:!0}))}onDismissClick(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-dismiss",{bubbles:!0,composed:!0}))}};sQ.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sQ.styles=[ra],sJ([ej({reflect:!0})],sQ.prototype,"display",2),sJ([ej({attribute:"banner-title"})],sQ.prototype,"bannerTitle",2),sJ([ej()],sQ.prototype,"body",2),sJ([ej({attribute:"primary-button"})],sQ.prototype,"primaryButton",2),sJ([ej({attribute:"primary-button-href"})],sQ.prototype,"primaryButtonHref",2),sJ([ej({attribute:"primary-button-command"})],sQ.prototype,"primaryButtonCommand",2),sJ([ej({attribute:"secondary-button"})],sQ.prototype,"secondaryButton",2),sJ([ej({attribute:"secondary-button-href"})],sQ.prototype,"secondaryButtonHref",2),sJ([ej({attribute:"secondary-button-command"})],sQ.prototype,"secondaryButtonCommand",2),sJ([ej({type:Boolean,attribute:"dismissible"})],sQ.prototype,"dismissible",2),sJ([ej({attribute:"dismiss-href"})],sQ.prototype,"dismissHref",2),sJ([ej({attribute:"layout"})],sQ.prototype,"layout",2),sQ=sJ([eM("gl-banner")],sQ);var s0=Object.defineProperty,s1=Object.getOwnPropertyDescriptor,s2=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?s1(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&s0(t,i,s),s};let s5=class extends ta(lit_element_i){render(){let e=this.error.get();return e?ex`<gl-banner
			display="solid"
			banner-title="Something went wrong"
			.body=${e}
			dismissible
			@gl-banner-dismiss=${()=>this.error.set(void 0)}
		></gl-banner>`:e$}};function s3(e,t,i){return e?t(e):i?.(e)}function s4(e,t,i={refType:"revision"}){switch(i.refType){case"branch":return{refType:"branch",repoPath:t,ref:e,name:i.name,id:i.id,remote:i.remote,sha:i.sha,upstream:i.upstream,worktree:i.worktree};case"stash":return{refType:"stash",repoPath:t,ref:e,sha:e,name:i.name,stashNumber:i.number,message:i.message,stashOnRef:i.stashOnRef};case"tag":return{refType:"tag",repoPath:t,ref:e,name:i.name,id:i.id,sha:i.sha};default:return{refType:"revision",repoPath:t,ref:e,sha:e,name:i.name??oQ(e,{strings:{working:"Working Tree"}}),message:i.message}}}function s6(e,t){return null==t?`command:${e}`:`command:${e}?${encodeURIComponent("string"==typeof t?t:JSON.stringify(t))}`}s2([ej({attribute:!1})],s5.prototype,"error",2),s5=s2([eM("gl-error-banner")],s5);let s7=navigator?.userAgentData?.platform,s8=navigator.userAgent;"Linux"===s7||s8.includes("Linux");let s9="macOS"===s7||s8.includes("Macintosh");function ne(){return s9?"⌥":"Alt"}"Windows"===s7||s8.includes("Windows");let nt=j`
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
`,ni=j`
	hr {
		border: none;
		border-top: var(--gl-border-width) solid var(--color-foreground--25);
	}
`;let ModifierKeysTracker=class ModifierKeysTracker{constructor(){this._altKey=!1,this._shiftKey=!1,this._ctrlKey=!1,this._metaKey=!1,this._hosts=new Set,this._listening=!1,this._onKey=e=>{let t=e.altKey||"keydown"===e.type&&"Alt"===e.key,i=e.shiftKey||"keydown"===e.type&&"Shift"===e.key,o=e.ctrlKey||"keydown"===e.type&&"Control"===e.key,r=e.metaKey||"keydown"===e.type&&"Meta"===e.key,s=("keyup"!==e.type||"Alt"!==e.key)&&t,a=("keyup"!==e.type||"Shift"!==e.key)&&i,c=("keyup"!==e.type||"Control"!==e.key)&&o,h=("keyup"!==e.type||"Meta"!==e.key)&&r;(this._altKey!==s||this._shiftKey!==a||this._ctrlKey!==c||this._metaKey!==h)&&(this._altKey=s,this._shiftKey=a,this._ctrlKey=c,this._metaKey=h,this._notify())},this._onPointer=e=>{(this._altKey!==e.altKey||this._shiftKey!==e.shiftKey||this._ctrlKey!==e.ctrlKey||this._metaKey!==e.metaKey)&&(this._altKey=e.altKey,this._shiftKey=e.shiftKey,this._ctrlKey=e.ctrlKey,this._metaKey=e.metaKey,this._notify())},this._onVisibilityChange=()=>{"hidden"===document.visibilityState&&this._reset()}}get altKey(){return this._altKey}get shiftKey(){return this._shiftKey}get ctrlKey(){return this._ctrlKey}get metaKey(){return this._metaKey}subscribe(e){return this._hosts.add(e),this._listening||this._start(),()=>{this._hosts.delete(e),0===this._hosts.size&&this._stop()}}_start(){this._listening=!0,window.addEventListener("keydown",this._onKey,{capture:!0}),window.addEventListener("keyup",this._onKey,{capture:!0}),window.addEventListener("mousemove",this._onPointer,{capture:!0}),window.addEventListener("mouseover",this._onPointer,{capture:!0}),document.addEventListener("visibilitychange",this._onVisibilityChange)}_stop(){this._listening=!1,window.removeEventListener("keydown",this._onKey,{capture:!0}),window.removeEventListener("keyup",this._onKey,{capture:!0}),window.removeEventListener("mousemove",this._onPointer,{capture:!0}),window.removeEventListener("mouseover",this._onPointer,{capture:!0}),document.removeEventListener("visibilitychange",this._onVisibilityChange),this._reset()}_reset(){let e=this._altKey||this._shiftKey||this._ctrlKey||this._metaKey;this._altKey=this._shiftKey=this._ctrlKey=this._metaKey=!1,e&&this._notify()}_notify(){for(let e of this._hosts)e.requestUpdate()}};let no=new ModifierKeysTracker;let ModifierKeysController=class ModifierKeysController{constructor(e){this.host=e,e.addController(this)}get altKey(){return no.altKey}get shiftKey(){return no.shiftKey}get ctrlKey(){return no.ctrlKey}get metaKey(){return no.metaKey}hostConnected(){this._unsubscribe=no.subscribe(this.host)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}};var nr=Object.defineProperty,ns=Object.getOwnPropertyDescriptor,nn=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?ns(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&nr(t,i,s),s};let na=["top","right","bottom","left","top-left","top-right","bottom-left","bottom-right"],nl=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.autoSizeVertical=!1,this.skidding=0,this.trigger="hover focus",this.suppressed=!1,this.handleReposition=()=>{let e=this.popup?.getAttribute("data-current-placement");null!=e&&e!==this._resolvedPlacement&&(this._resolvedPlacement=e)},this.handleResizePointerDown=e=>{if(0!==e.button)return;let t=e.currentTarget,i=t.dataset.handle;if(null==i)return;e.preventDefault();let o="right"===i||"top-right"===i||"bottom-right"===i,r="left"===i||"top-left"===i||"bottom-left"===i,s="bottom"===i||"bottom-left"===i||"bottom-right"===i,a="top"===i||"top-left"===i||"top-right"===i,c=this.body,h=e.clientX,p=e.clientY,u=c.getBoundingClientRect(),g=u.width,m=u.height;t.setPointerCapture(e.pointerId),t.classList.add("popover__resizer--active"),this.toggleAttribute("dragging",!0);let f=e=>{let t=e.clientX-h,i=e.clientY-p;o?c.style.width=`${Math.max(0,g+t)}px`:r&&(c.style.width=`${Math.max(0,g-t)}px`),s?c.style.height=`${Math.max(0,m+i)}px`:a&&(c.style.height=`${Math.max(0,m-i)}px`),this.popup?.reposition()},b=()=>{this.toggleAttribute("dragging",!1),t.classList.remove("popover__resizer--active"),t.removeEventListener("pointermove",f),t.removeEventListener("lostpointercapture",b),t.removeEventListener("pointerup",b)};t.addEventListener("pointermove",f,{passive:!0}),t.addEventListener("lostpointercapture",b),t.addEventListener("pointerup",b)},this.handleTriggerBlur=e=>{this.open&&(this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&(e.relatedTarget&&this.contains(e.relatedTarget)||this.hide())},this.handleTriggerClick=e=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(e.composedPath().includes(this.body))return;this.hide()}else this._skipHideOnClick=!1,this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=e=>{let t=this.hasTrigger("focus")||this.hasTrigger("focus-visible");this.hasTrigger("click")&&t&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,!this.open||"hover"!==this._triggeredBy||this.hasTrigger("click")||e.composedPath().includes(this.body)||(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=e=>{let t=this.hasTrigger("focus"),i=this.hasTrigger("focus-visible");if(t||i){if(!t&&i){let t=e.target;if(null==t||"function"!=typeof t.matches||!t.matches(":focus-visible"))return}this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus")}},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handlePopupBlur=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let e=iu(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let e=iu(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),e)}}}static closeOthers(e){for(let t of nl.openPopovers)t===e||function(e,t){let i=t;for(;null!=i;){if(i===e)return!0;i=i.parentNode??(i instanceof ShadowRoot?i.host:null)}return!1}(t,e)||t.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,nl.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),this.updateResizeObserver()}updateResizeObserver(){null!=this.resize?null==this.resizeObserver&&null!=this.body&&(this.resizeObserver=new ResizeObserver(()=>this.popup?.reposition()),this.resizeObserver.observe(this.body)):null!=this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}render(){let e=this._resolvedPlacement??this.placement,t=(function(e){if(!e)return[];let t=new Set;for(let i of e.trim().split(/\s+/))switch(i){case"horizontal":t.add("right");break;case"vertical":t.add("bottom");break;case"both":t.add("right"),t.add("bottom"),t.add("bottom-right");break;case"all":for(let e of na)t.add(e);break;default:na.includes(i)&&t.add(i)}return[...t]})(this.resize).filter(t=>!function(e,t){let i,o;if(!t)return!1;let[r,s]=t.split("-");switch(r){case"top":i="bottom";break;case"right":i="left";break;case"bottom":i="top";break;case"left":i="right"}let a="left"===r||"right"===r;"start"===s?o=a?"top":"left":"end"===s&&(o=a?"bottom":"right");let c=t=>null!=t&&(e===t||e.startsWith(`${t}-`)||e.endsWith(`-${t}`));return c(i)||c(o)}(t,e));return ex`<wa-popup
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
				${t.map(e=>ex`<div
							class="popover__resizer popover__resizer--${e}"
							role="separator"
							aria-orientation=${"top"===e||"bottom"===e?"horizontal":"vertical"}
							aria-label="Resize"
							data-handle=${e}
							@pointerdown=${this.handleResizePointerDown}
						></div>`)}
			</div>
		</wa-popup>`}async show(e){if(this.open||this.suppressed){"click"===e&&"hover"===this._triggeredBy&&(this._triggeredBy=e);return}return(null==this._triggeredBy||"hover"!==e)&&(this._triggeredBy=e),nl.closeOthers(this),this.open=!0,nl.openPopovers.add(this),ig(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,nl.openPopovers.delete(this),ig(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(e){return this.trigger.split(" ").includes(e)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleResizeChange(){this.updateResizeObserver()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};nl.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nl.openPopovers=new Set,nl.styles=[rp,j`
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

				${rm}
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
		`],nn([eL("#popover")],nl.prototype,"body",2),nn([eL("wa-popup")],nl.prototype,"popup",2),nn([ej({reflect:!0})],nl.prototype,"placement",2),nn([ej({type:Object})],nl.prototype,"anchor",2),nn([ej({reflect:!0,type:Boolean})],nl.prototype,"disabled",2),nn([ej({type:Number})],nl.prototype,"distance",2),nn([ej({reflect:!0,type:Boolean})],nl.prototype,"open",2),nn([ej({reflect:!0,type:Boolean})],nl.prototype,"arrow",2),nn([ej({reflect:!0,type:Boolean,attribute:"auto-size-vertical"})],nl.prototype,"autoSizeVertical",2),nn([ej({reflect:!0})],nl.prototype,"resize",2),nn([ej({type:Number})],nl.prototype,"skidding",2),nn([ej()],nl.prototype,"trigger",2),nn([ej({reflect:!0})],nl.prototype,"appearance",2),nn([eO()],nl.prototype,"suppressed",2),nn([eO()],nl.prototype,"_resolvedPlacement",2),nn([tF("open",{afterFirstUpdate:!0})],nl.prototype,"handleOpenChange",1),nn([tF(["distance","placement","skidding"])],nl.prototype,"handleOptionsChange",1),nn([tF("resize",{afterFirstUpdate:!0})],nl.prototype,"handleResizeChange",1),nn([tF("disabled")],nl.prototype,"handleDisabledChange",1),nl=nn([eM("gl-popover")],nl);let nc=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a","add-small":"\\ec7b","remove-small":"\\ec7c","worktree-small":"\\ec7d",worktree:"\\ec7e","screen-cut":"\\ec7f",ask:"\\ec80",openai:"\\ec81",claude:"\\ec82","open-in-window":"\\ec83","new-session":"\\ec84"}),nh=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147","diff-right":"\\f11b","diff-left":"\\f12e","accept-right":"\\f12f","accept-left":"\\f130","accept-all-right":"\\f131","accept-all-left":"\\f132",continue:"\\f148",skip:"\\f149",abort:"\\f14a",pause:"\\f14b","kanban-view":"\\f14c","filter-mixed":"\\f14d","start-new":"\\f14e",merge:"\\f14f"});var nd=Object.defineProperty,np=Object.getOwnPropertyDescriptor,nu=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?np(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&nd(t,i,s),s};function ng(e,t=""){return B(Object.entries(e).map(([e,i])=>(function(e,t,i=""){return`:host([icon='${i}${e}'])::before { content: '${t}'; }`})(e,i,t)).join(""))}let nm=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(e){e.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(e)}};nm.styles=j`
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

		${ng(nc)}

		${ng(nh,"gl-")}

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
	`,nu([ej({reflect:!0})],nm.prototype,"icon",2),nu([ej({reflect:!0})],nm.prototype,"modifier",2),nu([ej({type:Number})],nm.prototype,"size",2),nu([ej({reflect:!0})],nm.prototype,"flip",2),nu([ej({reflect:!0})],nm.prototype,"rotate",2),nm=nu([eM("code-icon")],nm);var nf=Object.defineProperty,nb=Object.getOwnPropertyDescriptor,nv=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?nb(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&nf(t,i,s),s};let n_=class extends lit_element_i{constructor(){super(...arguments),this.truncate=!1,this.overlay="tooltip",this.icon="",this.disabled=!1,this._modifiers=new ModifierKeysController(this)}get isAltKeyPressed(){return this._modifiers.altKey||this._modifiers.shiftKey}get effectiveIcon(){return this.isAltKeyPressed&&this.altIcon?this.altIcon:this.icon}get effectiveHref(){return this.isAltKeyPressed&&this.altHref?this.altHref:this.href}get effectiveLabel(){return this.isAltKeyPressed&&this.altLabel?this.altLabel:this.label}get effectiveTooltip(){if(this.label||this.altLabel)return this.altLabel?this.isAltKeyPressed?this.altLabel:`${this.label}
[${ne()}] ${this.altLabel}`:this.label}render(){return this.label&&"none"!==this.overlay?"popover"===this.overlay?ex`<gl-popover
				>${this.renderContent()}
				<div slot="content">${rf(this.label)}</div></gl-popover
			>`:ex`<gl-tooltip content="${this.effectiveTooltip}">${this.renderContent()}</gl-tooltip>`:this.renderContent()}renderContent(){let e="popover"===this.overlay?"anchor":e$,t=this.effectiveIcon,i=ex`<code-icon
				class="chip__icon"
				part="icon"
				icon="${t}"
				flip="${this.iconFlip??e$}"
				modifier="${("loading"===t?"spin":"")??e$}"
			></code-icon
			>${this.activeIcon?ex`<code-icon class="chip__icon-active" part="active-icon" icon="${this.activeIcon}"></code-icon>`:e$}`,o=this.effectiveHref,r=this.effectiveLabel;return o?ex`
				<a
					class="chip"
					part="base"
					?disabled=${this.disabled}
					href=${o}
					slot=${e}
					aria-label=${r??e$}
				>
					${i}<slot></slot><slot name="suffix"></slot>
				</a>
			`:ex`
			<button
				class="chip"
				part="base"
				type="button"
				?disabled=${this.disabled}
				slot=${e}
				aria-label=${r??e$}
			>
				${i}<slot></slot><slot name="suffix"></slot>
			</button>
		`}focus(e){this.defaultFocusEl.focus(e)}};function ny(e){let t=s6("gitlens.showSettingsPage!autolinks",{showOptions:{preserveFocus:!0}}),i="Configure autolinks to linkify external references, like Jira or Zendesk tickets, in commit messages.";return e.hasIntegrationsConnected||(i=`<a href="${t}">Configure autolinks</a> to linkify external references, like Jira or Zendesk tickets, in commit messages.

<a href="${s6("gitlens.plus.cloudIntegrations.connect",{source:{source:"inspect",detail:{action:"connect"}}})}">Connect an Integration</a> &mdash;`,e.hasAccount||(i+=" sign up and"),i+=" to get access to automatic rich autolinks for services like Jira, GitHub, and more."),ex`<gl-action-chip
		slot=${e.slotName??e$}
		href=${t}
		data-action="autolink-settings"
		icon="info"
		.label=${i}
		truncate
		overlay=${e.hasIntegrationsConnected?"tooltip":"popover"}
		>${e.showLabel?ex`<span class="mq-hide-sm">&nbsp;No autolinks found</span>`:e$}</gl-action-chip
	>`}n_.styles=[nt,ni,j`
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
				${rc}
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
		`],nv([ej({type:Boolean,reflect:!0})],n_.prototype,"truncate",2),nv([ej()],n_.prototype,"href",2),nv([ej({attribute:"alt-href"})],n_.prototype,"altHref",2),nv([ej()],n_.prototype,"label",2),nv([ej({attribute:"alt-label"})],n_.prototype,"altLabel",2),nv([ej()],n_.prototype,"overlay",2),nv([ej()],n_.prototype,"icon",2),nv([ej()],n_.prototype,"iconFlip",2),nv([ej({attribute:"alt-icon"})],n_.prototype,"altIcon",2),nv([ej()],n_.prototype,"activeIcon",2),nv([ej({type:Boolean})],n_.prototype,"disabled",2),nv([eL(".chip")],n_.prototype,"defaultFocusEl",2),n_=nv([eM("gl-action-chip")],n_);let nw=[rd,rp,ru,rg,j`
		:host {
			display: contents;
		}

		.commit-stats-subtitle {
			opacity: 1;
		}

		a {
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}

		.compare-header__title {
			display: inline-flex;
			gap: 0.5rem;
			align-items: center;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: var(--gl-font-base);
			font-weight: 500;
			color: var(--color-foreground--85);
			white-space: nowrap;
		}

		.compare-header__mode-icon {
			flex: 0 0 auto;
			color: var(--mode-accent, var(--vscode-foreground));
		}

		/* Section layout */
		.section {
			padding: 0 var(--gitlens-scrollbar-gutter-width) 1.5rem var(--gitlens-gutter-width);
		}

		.section:first-child {
			padding-top: var(--gl-space-8);
		}

		.section > :first-child {
			margin-top: 0;
		}

		.section > :last-child {
			margin-bottom: 0;
		}

		.section--message {
			padding: 0 var(--gitlens-scrollbar-gutter-width) 1rem var(--gitlens-scrollbar-gutter-width);
		}

		.section--empty > :last-child {
			margin-top: 0.5rem;
		}

		.section--skeleton {
			padding-top: 1px;
			padding-bottom: 1px;
		}

		.section--actions {
			padding: 0 var(--gitlens-scrollbar-gutter-width) 0 var(--gitlens-gutter-width);
		}

		/* Message block */
		.message-block {
			position: relative;
			padding: 0.5rem;
			font-size: var(--gl-font-base);
			background: var(--vscode-input-background);
			border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
			border-radius: var(--gl-radius-xs) var(--gl-radius-xs) 0 0;
		}

		.message-block__text {
			max-height: 9rem;
			margin: 0;
			overflow: hidden auto;
		}

		.message-block__text strong {
			font-size: var(--gl-font-lg);
			font-weight: 600;
		}

		.message-block__copy {
			position: absolute;
			right: 0;
			bottom: 0.4rem;
			z-index: 1;
			color: var(--vscode-descriptionForeground);
			opacity: 0.7;
			transition: opacity var(--gl-duration-fast) ease;
		}

		.message-block__copy:hover,
		.message-block__copy:focus-within {
			color: var(--vscode-foreground);
			opacity: 1;
		}

		/* Message block rows (actions bar below message) */
		.message-block-row,
		.message-block-group {
			display: flex;
			flex-direction: row;
			gap: var(--gl-space-6);
		}

		.message-block-row {
			justify-content: space-between;
		}

		.message-block-row--actions {
			padding: var(--gl-space-2);
			font-size: var(--gl-font-base);
			color: var(--color-foreground--65);
			background: var(--color-background--level-075);
		}

		.message-block-row--actions:last-child {
			border-radius: 0 0 var(--gl-radius-xs) var(--gl-radius-xs);
		}

		.message-block-row--actions:first-of-type:last-child {
			border-radius: var(--gl-radius-xs);
		}

		.message-block-row--actions gl-action-chip::part(icon),
		.message-block-row--actions gl-autolink-chip::part(icon) {
			--code-icon-size: 1.3rem;
		}

		/* Inline autolinks loading state — replaces "No autolinks found" while the commit
	   identity (sha) is changing. min-height matches gl-action-chip's intrinsic 2rem so
	   the strip doesn't jump between the spinner and the chip-based states. */
		.autolinks-loading {
			display: inline-flex;
			gap: var(--gl-space-4);
			align-items: center;
			min-height: 2rem;
			color: var(--vscode-descriptionForeground);
		}

		/* File-section loading container — sits in the gl-file-tree-pane "before-tree" slot in
	   place of the "No Files" empty text while the embedded panel is showing a "lite" commit
	   shell waiting for the full fetch. */
		.files-loading {
			display: flex;
			gap: var(--gl-space-6);
			align-items: center;
			justify-content: center;
			padding: var(--gl-space-20) var(--gl-space-12);
			color: var(--vscode-descriptionForeground);
			text-align: center;
		}

		.message-block-row--actions .reachability-summary code-icon,
		.message-block-row--actions .reachability-summary gl-action-chip::part(icon) {
			--code-icon-size: 12px;
		}

		.message-block-row--actions gl-action-chip.error {
			background-color: var(--color-alert-errorBackground);
		}

		.message-block-row--actions gl-action-chip.warning {
			background-color: var(--color-alert-warningHoverBackground);
		}

		/* Reachability styles */
		.reachability-summary {
			display: flex;
			flex: 1 1 0;
			flex-wrap: wrap;
			gap: var(--gl-space-6);
			align-items: center;
			min-width: 0;
			overflow: hidden;
		}

		.reachability-summary code-icon,
		.reachability-summary gl-action-chip::part(icon) {
			--code-icon-size: 12px;
		}

		.reachability-summary gl-action-chip::part(base) {
			overflow: hidden;
		}

		.reachability-range-chip-wrapper {
			display: inline-flex;
			min-width: 0;
			max-width: 100%;
			overflow: hidden;
		}

		@media (width <= 768px) {
			.reachability-range-chip-wrapper {
				flex: 1 1 100%;
			}
		}

		.reachability-range-chip {
			display: inline-flex !important;
			width: auto;
			min-width: 0;
			max-width: 100%;
			padding: 0.1rem 0.25rem;
			overflow: hidden;
			color: var(--color-foreground--65);
			border-radius: var(--gl-radius-sm);
			--chip-text-transform: none;
			--chip-background: transparent;
		}

		.reachability-range-chip:hover,
		.reachability-range-chip:focus {
			opacity: 1;
		}

		.reachability-range-chip--range {
			cursor: pointer;
		}

		.reachability-range-chip--local-branch {
			font-weight: 600;
			color: var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0);
		}

		.reachability-range-chip--remote-branch {
			color: var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0);
		}

		.reachability-range-chip--tag {
			color: color-mix(in srgb, var(--vscode-editorWarning-foreground, #cca700) 70%, var(--color-foreground) 30%);
		}

		.reachability-range-chip--current .reachability-range-chip__label {
			font-weight: 600;
		}

		.reachability-range-chip__label {
			flex: 1 1 auto;
			min-width: 0;
			max-width: 100%;
			padding-left: 0.25rem;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: inherit;
			white-space: nowrap;
		}

		.reachability-range-chip__label code-icon {
			margin-right: var(--gl-space-2);
			vertical-align: middle;
		}

		.reachability-range-chip__ellipsis {
			padding: 0 var(--gl-space-4);
			opacity: 0.8;
		}

		.reachability-range-chip__count {
			padding-left: var(--gl-space-4);
			font-size: var(--gl-font-micro);
			font-weight: 600;
			color: var(--color-foreground--50);
		}

		.reachability-popover {
			min-width: 200px;
			max-width: 400px;
		}

		.reachability-popover__header {
			padding-bottom: var(--gl-space-6);
			font-weight: 500;
		}

		.reachability-popover__list {
			display: flex;
			flex-direction: column;
			gap: var(--gl-space-2);
			max-height: 300px;
			overflow-y: auto;
		}

		.reachability-list-item {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			padding: 0.3rem 0.4rem;
			font-size: var(--gl-font-base);
			line-height: 1.4;
		}

		.reachability-list-item--current {
			font-weight: 600;
		}

		.reachability-list-item__icon {
			flex-shrink: 0;
			opacity: 0.8;
			--code-icon-size: 14px;
		}

		.reachability-list-item__label {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		/* Media query hiding */
		@media (width <= 300px) {
			.mq-hide-sm {
				display: none !important;
			}
		}

		/* Button styles */
		.button--busy[aria-busy='true'] {
			opacity: 0.5;
		}

		.button--busy:not([aria-busy='true']) code-icon {
			display: none;
		}

		.button-container {
			max-width: 30rem;
			margin: 1rem auto 0;
			text-align: left;
			transition: max-width var(--gl-duration-medium) var(--gl-ease-out);
		}

		@media (width >= 640px) {
			.button-container {
				max-width: 100%;
			}
		}

		.button-group {
			display: inline-flex;
			gap: 0.1rem;
		}

		.button-group--single {
			width: 100%;
			max-width: 30rem;
		}

		.button-group > *:not(:first-child),
		.button-group > *:not(:first-child) gl-button {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		.button-group > *:not(:last-child),
		.button-group > *:not(:last-child) gl-button {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		/* AI content */
		.ai-content {
			padding: 0.5rem;
			margin-top: var(--gl-space-10);
			font-size: var(--gl-font-base);
			background: var(--vscode-input-background);
			border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
			border-radius: var(--gl-radius-xs);
		}

		.ai-content.has-error {
			padding-left: var(--gl-space-8);
			border-left-color: var(--color-alert-errorBorder);
			border-left-width: 0.3rem;
		}

		.ai-content:empty {
			display: none;
		}

		.ai-content__summary {
			display: block;
			max-height: 20rem;
			margin: 0;
			overflow: hidden auto;
		}

		/* Popover content */
		.popover-content {
			padding: var(--gl-space-8) var(--gl-space-12);
			background-color: var(--color-background--level-15);
		}

		/* Alert */
		.alert {
			box-sizing: border-box;
			display: flex;
			gap: var(--gl-space-6);
			align-items: center;
			width: 100%;
			max-width: 100%;
			padding: var(--gl-space-4) var(--gl-space-8);
			margin-block: 0;
			color: var(--color-alert-warningForeground, var(--vscode-input-foreground));
			background-color: var(--color-alert-warningBackground);
			border: var(--gl-border-width) solid var(--color-alert-warningBorder);
			border-radius: var(--gl-radius-sm);
		}

		.alert code-icon {
			flex: none;
			--code-icon-size: 13px;
		}

		.alert__content {
			flex: 1;
			min-width: 0;
			margin: 0;
			font-size: var(--gl-font-base);
			line-height: 1.4;
		}

		/* Inline popover / tooltip hint */
		.inline-popover {
			display: inline-block;
		}

		.tooltip-hint {
			white-space: nowrap;
			border-bottom: var(--gl-border-width) dashed currentcolor;
		}

		/* Child component layout — these live inside the shadow root */
		webview-pane-group {
			flex: 1;
			height: 100%;
			min-height: 0;
			overflow: hidden;
		}

		webview-pane {
			display: flex;
			flex-direction: column;
			min-height: 0;
		}

		webview-pane[flexible] {
			flex: 1;
			overflow: hidden;
		}
	`,j`
		:host([variant='embedded']) .split__handle {
			position: relative;
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			border-top: var(--gl-border-width) solid
				color-mix(in srgb, var(--vscode-sideBarSectionHeader-border) 60%, transparent);
		}

		:host([variant='embedded']) .split__handle::after {
			position: relative;
			top: -0.3rem;
			width: 7rem;
			height: 0.3rem;
			content: '';
			background-color: color-mix(in srgb, var(--color-foreground) 55%, var(--color-background));
			border-radius: var(--gl-radius-xs);
			transition: background-color var(--gl-duration-fast) ease;
		}

		:host([variant='embedded']) .split__handle:hover::after,
		:host([variant='embedded']) .split[dragging] .split__handle::after {
			background-color: var(--vscode-sash-hoverBorder, var(--vscode-focusBorder));
		}

		:host([variant='embedded']) gl-badge {
			font-size: var(--gl-font-micro);
		}
	`];var nx=Object.defineProperty,nk=Object.getOwnPropertyDescriptor,nC=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?nk(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&nx(t,i,s),s};let n$=Object.freeze([["added",["+","add"]],["modified",["~","edit"]],["removed",["-","remove"]]]),nS=class extends lit_element_i{constructor(){super(...arguments),this.noTooltip=!1}render(){let e=n$.map(([e,t])=>this.renderStat(e,t));return this.noTooltip?ex`${e}<slot></slot>`:ex`<gl-tooltip>
			${e}<slot></slot>
			<div slot="content">${this.renderTooltipContent()}</div>
		</gl-tooltip>`}renderStat(e,t){let i=this[e];if(null==i)return e$;let[o,r]=t,s="icons"===this.symbol?ex`<code-icon class="icon" icon=${r}></code-icon>`:ex`<span class="symbol">${o}</span>`;return ex`<span class="stat ${e}" aria-label="${i} ${e}"
			><span class="label">${s}${i}</span></span
		>`}renderTooltipContent(){let e=this.added??0,t=this.modified??0,i=this.removed??0,o=e+t+i,r=[];e>0&&r.push(ex`<span class="added">${e} added</span>`),t>0&&(r.length&&r.push(", "),r.push(ex`<span class="modified">${t} modified</span>`)),i>0&&(r.length&&r.push(", "),r.push(ex`<span class="removed">${i} removed</span>`));let s=e>0||i>0?ex`${tY("file",o)} changed (${r})`:tY("file changed",o,{plural:"files changed",zero:"No files changed"}),a=[];null!=this.additions&&a.push(ex`<span class="added">${tY("addition",this.additions)}</span>`),null!=this.deletions&&(a.length&&a.push(", "),a.push(ex`<span class="removed">${tY("deletion",this.deletions)}</span>`));let c=[ex`<div>${s}</div>`];return a.length>0&&c.push(ex`<div>${a}</div>`),c}};nS.styles=j`
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
	`,nC([ej({type:Number})],nS.prototype,"added",2),nC([ej({type:Number})],nS.prototype,"modified",2),nC([ej({type:Number})],nS.prototype,"removed",2),nC([ej({type:Number})],nS.prototype,"additions",2),nC([ej({type:Number})],nS.prototype,"deletions",2),nC([ej()],nS.prototype,"symbol",2),nC([ej({reflect:!0})],nS.prototype,"appearance",2),nC([ej({type:Boolean,attribute:"no-tooltip"})],nS.prototype,"noTooltip",2),nS=nC([eM("commit-stats")],nS);let nE={".":"Unchanged","!":"Ignored","?":"Untracked",A:"Added",D:"Deleted",M:"Modified",R:"Renamed",C:"Copied",AA:"Added (Both)",AU:"Added (Current)",UA:"Added (Incoming)",DD:"Deleted (Both)",DU:"Deleted (Current)",UD:"Deleted (Incoming)",UU:"Modified (Both)",T:"Modified",U:"Updated but Unmerged"},nA=new Set(["U","AA","AU","UA","DD","DU","UD","UU"]);function nI(e){return null!=e&&nA.has(e)}var nP=E(518);function nz(e){switch(e){case"auto":return{value:"list",icon:"gl-list-auto",label:"View as List"};case"list":return{value:"tree",icon:"list-flat",label:"View as Tree"};case"tree":return{value:"auto",icon:"list-tree",label:"View as Auto"}}}let nT={M:1,T:2,A:3,D:4,R:5,C:6,"?":7},nR=new Set;function nM(e,t){return t.has(e.path)?1:2*!e.staged}function nB(e,t,i,o){let r=+!nI(t.status),s=+!nI(i.status);if(r!==s)return r-s;if(null!=o&&1===r){let e=nM(t,o.mixedPaths),r=nM(i,o.mixedPaths);if(e!==r)return e-r}switch(e){case"path":return t.path.localeCompare(i.path)||(0,nP.basename)(t.path).localeCompare((0,nP.basename)(i.path));case"status":{let e=nT[t.status]??99,o=nT[i.status]??99;if(e!==o)return e-o;return(0,nP.basename)(t.path).localeCompare((0,nP.basename)(i.path))||t.path.localeCompare(i.path)}default:return(0,nP.basename)(t.path).localeCompare((0,nP.basename)(i.path))||t.path.localeCompare(i.path)}}function nj(e,t){return e.sort((e,i)=>{let o=e.priority??0,r=i.priority??0;if(o!==r)return o-r;if(e.branch&&!i.branch)return -1;if(!e.branch&&i.branch)return 1;if(null!=t&&!e.branch&&!i.branch){let o=t(e,i);if(0!==o)return o}return e.label<i.label?-1:+(e.label>i.label)}),e}function nO(e,t,i,o,r,s,a={level:1},c,h,p,u){void 0===a.level&&(a.level=1);let g=e;if("matched"===o&&r?.matchedFiles!=null){let t=new Set(r.matchedFiles.map(e=>e.path));g=e.filter(e=>t.has(e.path))}if(!g.length)return[];let m=p?{mixedPaths:u??nR}:void 0,f=null!=h?(e,t)=>{let i=e.context?.[0],o=t.context?.[0];return i?.path==null||o?.path==null?0:nB(h,i,o,m)}:void 0,b=g[0]?.repoPath,v=[];if(t){let e=function(e,t,i,o=!1){let r={name:"",relativePath:"",children:new Map,descendants:[]},s=e.reduce((e,o)=>{let r=e,s="";for(let e of t(o)){s=i(s,e),r.children??=new Map;let t=r.children.get(e);null==t&&(t={name:e,relativePath:s,parent:r,children:void 0,descendants:void 0},r.children.set(e,t)),r.descendants??=[],r.descendants.push(o),r=t}return r.value=o,e},r);return o&&(s=function e(t,i,o=!0,r){if(null==t.children)return t;let s=[...t.children.values()];for(let t of s)e(t,i,!1,r);if(!o&&null==t.value&&1===s.length){let e=s[0];if((null==e.value||r?.(e.value))&&(t.name=i(t.name,e.name),t.relativePath=e.relativePath,t.children=e.children,t.descendants=e.descendants,t.value=e.value,null!=t.children))for(let e of t.children.values())e.parent=t}return t}(s,i,!0,void 0)),s}(g,e=>e.path.split("/"),(...e)=>e.join("/"),i);if(null!=e.children)for(let t of e.children.values()){let e=function e(t,i,o={level:1},r,s,a){let c;if(void 0===o.level&&(o.level=1),null==t.value){var h,p;h=t.name,c={branch:!1,expanded:!0,path:p=t.relativePath,level:1,checked:!1,icon:"folder",label:h,tooltip:p,...o,checkable:!1},r&&(c.tooltip=(0,nP.join)(r,t.relativePath)),null!=s&&(c.contextData=s({name:t.name,relativePath:t.relativePath,repoPath:r}))}else c=i(t.value,o,!1);if(null!=t.children){let h=[];for(let c of t.children.values()){let t=e(c,i,{...o,level:o.level+1},r,s,a);h.push(t)}h.length>0&&(nj(h,a),c.branch=!0,c.children=h,h.some(e=>e.matched)&&(c.matched=!0))}return c}(t,s,a,b,c,f);v.push(e)}}else for(let e of null!=h?g.toSorted((e,t)=>nB(h,e,t,m)):g){let t=s(e,{...a,branch:!1},!0);v.push(t)}return(t||null==h)&&nj(v,f),v}function nD(e){switch(e){case"A":return{letter:"A",tooltip:"Added",kind:"added"};case"?":return{letter:"U",tooltip:"Untracked",kind:"untracked"};case"M":return{letter:"M",tooltip:"Modified",kind:"modified"};case"D":return{letter:"D",tooltip:"Deleted",kind:"deleted"};case"R":return{letter:"R",tooltip:"Renamed",kind:"renamed"};case"C":return{letter:"C",tooltip:"Copied",kind:"renamed"};case"T":return{letter:"T",tooltip:"Type Changed",kind:"modified"};case"U":case"AA":case"AU":case"UA":case"DD":case"DU":case"UD":case"UU":return{letter:"!",tooltip:"Conflict",kind:"conflict"};default:return}}let ContextMenuProxyController=class ContextMenuProxyController{constructor(e){this._onContextMenu=e=>{let t=e.composedPath().find(e=>e instanceof HTMLElement&&null!=e.dataset.vscodeContext);null!=t&&t!==this._host&&(this._host.dataset.vscodeContext=t.dataset.vscodeContext,setTimeout(()=>{delete this._host.dataset.vscodeContext},100))},this._host=e,e.addController(this)}hostConnected(){this._host.addEventListener("contextmenu",this._onContextMenu)}hostDisconnected(){this._host.removeEventListener("contextmenu",this._onContextMenu)}};let nL=tl(class extends directive_i{constructor(e){if(super(e),3!==e.type&&1!==e.type&&4!==e.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==e.strings)throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===eC||t===e$)return t;let i=e.element,o=e.name;if(3===e.type){if(t===i[o])return eC}else if(4===e.type){if(!!t===i.hasAttribute(o))return eC}else if(1===e.type&&i.getAttribute(o)===t+"")return eC;return tg(e),t}});function nF(e,t){let i=t?`$(git-branch) ${t}`:"incoming";switch(e){case"UU":return{label:"Modified (Both)",kind:"modified",description:`Modified on both ${i} and the target`};case"AA":return{label:"Added (Both)",kind:"added",description:`Added on both ${i} and the target`};case"DD":return{label:"Deleted (Both)",kind:"deleted",description:`Deleted on both ${i} and the target`};case"AU":return{label:"Added by Current",kind:"added",description:`Added on the target (conflict with ${i} \u2014 possible rename or directory/file clash)`};case"UA":return{label:"Added by Incoming",kind:"added",description:`Added on ${i} (conflict with the target \u2014 possible rename or directory/file clash)`};case"UD":return{label:"Modified (Current), Deleted (Incoming)",kind:"deleted",description:`Deleted on ${i}
Modified on the target`};case"DU":return{label:"Deleted (Current), Modified (Incoming)",kind:"deleted",description:`Modified on ${i}
Deleted on the target`};default:return}}let nN=j`
	:host {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		overflow: hidden;
	}

	webview-pane {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
	}

	webview-pane[flexible] {
		overflow: hidden;
	}

	gl-tree-view {
		flex: 1;
		min-height: 0;
		margin-top: var(--gl-tree-view-margin-top, 0);
		overflow: hidden;
		--gl-decoration-before-font-size: 0.9em;
		--gl-decoration-before-opacity: 0.8;
		--gl-decoration-after-font-size: 0.9em;
		--gl-decoration-after-opacity: 0.8;
	}

	gl-tree-view[filterable] {
		margin-top: var(--gl-tree-view-filterable-margin-top, var(--gl-tree-view-margin-top, 0));
	}

	/* inline-flex matches the original so webview-pane's .label baseline stays centered.
	   width:100% lets inner children (.checkbox-header__title, badge) ellipse against
	   the .title slot's actual width instead of overflow-clipping at max-content.
	   vertical-align:middle pins the wrapper to the line's vertical middle so its taller
	   contents (checkbox + label + badge) center-align with the action buttons. */
	webview-pane [slot='title'] {
		display: inline-flex;
		gap: var(--gl-space-6);
		align-items: center;
		width: 100%;
		min-width: 0;
		vertical-align: middle;
	}

	/* The Stash button's min-height makes the header taller than .label's fixed
	   2.2rem, and webview-pane's header uses default align-items: stretch which falls
	   back to start (top) for children with an explicit height. That puts .label at
	   the top of the header while .header-actions fills it — visually 3px too high.
	   align-items: center re-centers .label so the title content lines up with the
	   action buttons. */

	/* !important is required: webview-pane's own .header rule (specificity 0,1,0) outranks this
	   ::part() selector (0,0,2), so without it webview-pane's default border-top bleeds through
	   wherever the --gl-file-tree-pane-header-border-top var isn't set (compose/review/etc.). */
	webview-pane::part(header) {
		align-items: center;
		margin-right: 0.6rem;
		background-color: inherit;
		border-top: var(--gl-file-tree-pane-header-border-top, none) !important;
	}

	.header-actions {
		display: flex;

		/* Gap separating the consumer's file-set action cluster (leading-actions) from the pane's view toggles (action-nav). */
		gap: var(--gl-header-actions-gap, 0.4rem);
		align-items: center;
	}

	/* Make the slot a flex box (not the default display:contents) so multiple slotted chips form ONE
	   tight cluster riding their own padding — otherwise each becomes a separate header-actions flex
	   item and picks up the cluster↔toggles gap between them. */
	.leading-actions {
		display: flex;
		align-items: center;
	}

	gl-badge {
		flex: 0 1 auto;
		min-width: 0;
		max-width: 100%;

		/* The slot inside (.badge) has content-box sizing + 4px padding, so width:100%
		   makes it overflow the host by 8px. Clipping at the host pins everything to the
		   visible badge box. */
		overflow: hidden;
		font-size: var(--gl-font-micro);
	}

	/* Make the badge slot itself overflow-clip so ellipsis at the wrapper text can
	   actually trigger. box-sizing:border-box + width:100% pins the slot inside the
	   host (instead of overflowing 8px due to default content-box + padding). Display
	   stays as the slot's default inline-flex so vertical centering remains intact.
	   !important is needed because the internal .badge class selector (specificity
	   0,1,0) outranks ::part() (0,0,2). */
	gl-badge::part(base) {
		box-sizing: border-box !important;
		width: 100% !important;
		min-width: 0 !important;
		overflow: hidden !important;
	}

	.checkbox-header__badge-text {
		display: block;
		min-width: 0;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* The "+N Mixed" sub-badge nested inside the primary staged badge: keep it intact (don't
	   shrink) so the staged text ellipses first under width pressure, and inset it from that text. */
	gl-badge.checkbox-header__badge-mixed {
		flex: 0 0 auto;
		margin-left: var(--gl-space-4);
		overflow: visible;
	}

	.checkbox-header {
		display: inline-flex;
		flex: 1 1 auto;
		gap: var(--gl-space-6);
		align-items: center;
		min-width: 0;
		padding: 5px 0 5px 2px; /* prevent focus ring from clipping */
	}

	.checkbox-header gl-checkbox {
		--checkbox-foreground: var(--vscode-sideBarSectionHeader-foreground);
		--checkbox-size: 1.6rem;
		--checkbox-spacing: 0;
		--code-icon-size: 14px;

		flex-shrink: 0;
		margin-block: 0;
	}

	.checkbox-header__label {
		display: inline-flex;
		flex: 1 1 auto;
		gap: var(--gl-space-6);
		align-items: center;
		min-width: 0;
		color: var(--vscode-sideBarSectionHeader-foreground);
	}

	/* Title yields width before the badge — title clips to ellipsis first, then badge clips.
	   The same shape applies to the non-checkbox header path (.file-tree-pane__title) so
	   multi-commit / commit-details file trees ellipse the title before their badge/stats.
	   display:block is required for text-overflow:ellipsis to actually trigger — when
	   the title sits inside a default <slot> (display:contents), some browsers don't
	   blockify its outer display, leaving it inline. */
	.checkbox-header__title,
	.file-tree-pane__title {
		display: block;
		flex: 0 1 auto;
		flex-shrink: 10;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* Active state for the toggle chips (e.g. Show/Hide Search). Inherits the chip's own 0.5rem
	   radius so the active background matches the hover/idle box exactly. */
	gl-action-chip.active-toggle {
		color: var(--vscode-inputOption-activeForeground);
		background-color: var(--vscode-inputOption-activeBackground);
	}
`,nq=j`
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
`;var nU=Object.defineProperty,nW=Object.getOwnPropertyDescriptor,nH=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?nW(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&nU(t,i,s),s};let nV=class extends lit_element_i{render(){return ex`<slot class="badge" part="base"></slot>`}};nV.styles=[nq],nH([ej({reflect:!0})],nV.prototype,"appearance",2),nV=nH([eM("gl-badge")],nV);var nK=Object.defineProperty,nG=Object.getOwnPropertyDescriptor,nZ=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?nG(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&nK(t,i,s),s};let nY=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.minVisible=0,this.position="bottom",this._shownAt=0}willUpdate(e){if(e.has("active")){if(this.active)null!=this._hideTimer&&(clearTimeout(this._hideTimer),this._hideTimer=void 0),this._shownAt=performance.now(),this.toggleAttribute("visible",!0);else if(this.hasAttribute("visible")){let e=this.minVisible-(performance.now()-this._shownAt);e>0?this._hideTimer=setTimeout(()=>{this._hideTimer=void 0,this.toggleAttribute("visible",!1)},e):this.toggleAttribute("visible",!1)}}}firstUpdated(){this.setAttribute("role","progressbar")}disconnectedCallback(){super.disconnectedCallback?.(),null!=this._hideTimer&&(clearTimeout(this._hideTimer),this._hideTimer=void 0,this.toggleAttribute("visible",!1))}render(){return ex`<div class="progress-bar"></div>`}};nY.styles=j`
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
	`,nZ([ej({reflect:!0})],nY.prototype,"mode",2),nZ([ej({type:Boolean})],nY.prototype,"active",2),nZ([ej({type:Number,attribute:"min-visible"})],nY.prototype,"minVisible",2),nZ([ej()],nY.prototype,"position",2),nY=nZ([eM("progress-indicator")],nY);var nX=Object.defineProperty,nJ=Object.getOwnPropertyDescriptor,nQ=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?nJ(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&nX(t,i,s),s};let n0=class extends lit_element_i{constructor(){super(...arguments),this.collapsable=!1,this.expanded=!1,this.loading=!1}renderTitle(){return this.collapsable?ex`<button
			type="button"
			class="label"
			aria-controls="content"
			aria-expanded=${this.expanded}
			@click="${this.toggleExpanded}"
		>
			<code-icon class="icon" icon=${this.expanded?"chevron-down":"chevron-right"}></code-icon
			><span class="title"><slot name="title">Section</slot></span>
			<span class="subtitle"><slot name="subtitle"></slot></span>
		</button>`:ex`<div class="label">
				<span class="title"><slot name="title">Section</slot></span>
				<span class="subtitle"><slot name="subtitle"></slot></span>
			</div>`}render(){return ex`
			<header class="header" part="header">
				${this.renderTitle()}
				<slot name="actions"></slot>
				<progress-indicator ?active="${this.loading}"></progress-indicator>
			</header>
			<div id="content" role="region" part="content" class="content scrollable">
				<slot></slot>
			</div>
		`}toggleExpanded(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("expanded-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}};n0.styles=[rp,j`
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
		`],nQ([ej({type:Boolean,reflect:!0})],n0.prototype,"collapsable",2),nQ([ej({type:Boolean,reflect:!0})],n0.prototype,"expanded",2),nQ([ej({type:Boolean,reflect:!0})],n0.prototype,"loading",2),n0=nQ([eM("webview-pane")],n0);var n1=Object.defineProperty,n2=Object.getOwnPropertyDescriptor,n5=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?n2(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&n1(t,i,s),s};let n3=class extends lit_element_i{firstUpdated(){this.role="navigation"}disconnectedCallback(){this._slotSubscriptionsDisposer?.(),super.disconnectedCallback?.()}render(){return ex`<slot @slotchange=${this.handleSlotChange}></slot>`}handleSlotChange(e){if(this._slotSubscriptionsDisposer?.(),this.actionNodes.length<1)return;let t=this.handleKeydown.bind(this),i=`${this.actionNodes.length}`,o=this.actionNodes.map((e,o)=>(e.setAttribute("aria-posinset",`${o+1}`),e.setAttribute("aria-setsize",i),e.setAttribute("tabindex",0===o?"0":"-1"),this.actionNodes.length>=2&&e.addEventListener("keydown",t,!1),{dispose:()=>{e?.removeEventListener("keydown",t,!1)}}));this._slotSubscriptionsDisposer=()=>{o?.forEach(({dispose:e})=>e())}}handleKeydown(e){if(!e.target||null==this.actionNodes)return;let t=e.target,i=parseInt(t.getAttribute("aria-posinset")??"0",10);if("ArrowLeft"!==e.key&&"ArrowRight"!==e.key||this.actionNodes.length<2)return;let o=null;if("ArrowLeft"===e.key){let e=1===i?this.actionNodes.length-1:i-2;o=this.actionNodes[e]}else if("ArrowRight"===e.key){let e=i===this.actionNodes.length?0:i;o=this.actionNodes[e]}null!=o&&o!==t&&(e.preventDefault(),e.stopPropagation(),t.setAttribute("tabindex","-1"),o.setAttribute("tabindex","0"),o.focus())}};n3.styles=j`
		:host {
			display: flex;
			align-items: center;
			user-select: none;
		}
	`,n5([(v={flatten:!0},(e,t)=>{let{slot:i,selector:o}=v??{},r="slot"+(i?`[name=${i}]`:":not([name])");return eD(e,t,{get(){let e=this.renderRoot?.querySelector(r),t=e?.assignedElements(v)??[];return void 0===o?t:t.filter(e=>e.matches(o))}})})],n3.prototype,"actionNodes",2),n3=n5([eM("action-nav")],n3);let n4=j`
	:host {
		--checkbox-foreground: var(--vscode-checkbox-foreground);
		--checkbox-background: var(--vscode-checkbox-background);
		--checkbox-border: var(--vscode-checkbox-border);
		--checkbox-checked-foreground: var(--vscode-checkbox-foreground);
		--checkbox-checked-background: var(--vscode-checkbox-selectBackground);
		--checkbox-checked-border: var(--vscode-checkbox-selectBorder);
		--checkbox-active-background: var(--vscode-checkbox-selectBackground);
		--checkbox-active-border: var(--vscode-checkbox-selectBorder);
		--checkbox-hover-background: var(--vscode-inputOption-hoverBackground);
		--checkbox-radius: 3px;
		--checkbox-border-width: 1px;
		--checkbox-size: 1.6rem;
		--checkbox-spacing: 1rem;

		display: block;
		margin-block: var(--gl-space-8);
	}

	label {
		display: flex;
		gap: var(--checkbox-spacing);
		align-items: center;
		color: var(--checkbox-foreground);
		white-space: nowrap;
		cursor: pointer;
		user-select: none;
	}

	:host([disabled]) label {
		cursor: default;
		opacity: 0.5;
	}

	.label-text {
		display: block;
		margin-inline-end: var(--checkbox-spacing);
		line-height: normal;
	}

	.input {
		position: absolute;
		z-index: -1;
		opacity: 0;
	}

	.control {
		position: relative;
		left: 1px;
		box-sizing: border-box;
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: var(--checkbox-size);
		height: var(--checkbox-size);
		color: var(--checkbox-foreground);
		background: var(--checkbox-background);
		border: var(--checkbox-border-width, 1px) solid var(--vscode-checkbox-border);
		border-radius: var(--checkbox-radius);
	}

	.input:hover + .control {
		background-color: var(--checkbox-hover-background);
	}

	.input:focus-visible + .control,
	.input:focus + .control {
		outline: var(--gl-border-width) solid var(--vscode-focusBorder);
		outline-offset: 2px;
	}

	.input:active + .control {
		background-color: var(--checkbox-active-background);
		border-color: var(--checkbox-active-border);
	}

	:host([checked]) .control,
	:host([indeterminate]) .control {
		color: var(--checkbox-checked-foreground);
		background-color: var(--checkbox-checked-background);
		border-color: var(--checkbox-checked-border);
	}

	code-icon {
		visibility: hidden;
		pointer-events: none;
	}

	:host([checked]) code-icon,
	:host([indeterminate]) code-icon {
		visibility: visible;
	}
`;var n6=Object.defineProperty,n7=Object.getOwnPropertyDescriptor,n8=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?n7(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&n6(t,i,s),s};let n9=class extends GlElement{constructor(){super(),this.disabled=!1,this.value="",this._defaultChecked=!1,this.checked=!1,this.indeterminate=!1,this._clickAlt=!1,this._modifiers=new ModifierKeysController(this),this._defaultChecked=this.checked}get defaultChecked(){return this._defaultChecked}handleClick(e){this._clickAlt=e.altKey}handleChange(e){let t=e.target.checked,i=this._clickAlt||this._modifiers.altKey;this.indeterminate&&i&&(t=!1,e.target.checked=!1),this._clickAlt=!1,this.checked=t,this.indeterminate=!1,this.dispatchEvent(new CustomEvent("gl-change-value"))}renderCheck(){return ex`<code-icon icon=${this.indeterminate?"dash":"check"}></code-icon>`}render(){return ex`<label ?aria-disabled=${this.disabled}
			><input
				class="input"
				.disabled=${this.disabled}
				type="checkbox"
				.checked=${this.checked}
				@change=${this.handleChange}
				@click=${this.handleClick}
			/>
			<div class="control">${this.renderCheck()}</div>
			<slot class="label-text" part="label"></slot>
		</label>`}};n9.shadowRootOptions={...GlElement.shadowRootOptions,delegatesFocus:!0},n9.styles=[n4],n8([ej({type:Boolean,reflect:!0})],n9.prototype,"disabled",2),n8([ej({type:String})],n9.prototype,"value",2),n8([ej({type:Boolean})],n9.prototype,"defaultChecked",1),n8([ej({type:Boolean,reflect:!0})],n9.prototype,"checked",2),n8([ej({type:Boolean,reflect:!0})],n9.prototype,"indeterminate",2),n9=n8([eM("gl-checkbox")],n9);var ae=E(285);let at=()=>new ref_h;let ref_h=class ref_h{};let ai=new WeakMap,ao=tl(class extends async_directive_f{render(e){return e$}update(e,[t]){let i=t!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),e$}rt(e){if(void 0!==this.G)if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,i=ai.get(t);void 0===i&&(i=new WeakMap,ai.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?ai.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});let FilterController=class FilterController{constructor(e,t){this.host=e,this.options=t,this._query="",this._terms=[],e.addController(this)}hostConnected(){}hostDisconnected(){clearTimeout(this._debounceTimer),this._debounceTimer=void 0}get query(){return this._query}get terms(){return this._terms}get isFiltering(){return this._terms.length>0}setQuery(e,t){(this._query!==e||t?.debounce)&&(this._query=e,this.options.onQueryChanged?.(e),clearTimeout(this._debounceTimer),t?.debounce?this._debounceTimer=setTimeout(()=>this.apply(),this.options.debounceMs??150):this.apply())}clear(){this.setQuery("")}apply(){this._terms=this._query.toLowerCase().trim().split(/\s+/).filter(e=>e.length>0),this.options.applyMatch(this._terms),this.options.onApplied?.(),this.host.requestUpdate()}};let CollectionIndexController=class CollectionIndexController{constructor(e,t){this.options=t,this._idToIndex=new Map,e.addController(this)}hostConnected(){this.rebuild()}hostDisconnected(){this._idToIndex.clear()}rebuild(){this._idToIndex.clear();let e=this.options.getItems();if(null!=e)for(let t=0;t<e.length;t++)this._idToIndex.set(this.options.getItemId(e[t]),t)}get size(){return this.options.getItems()?.length??0}indexOf(e){return this._idToIndex.get(e)??-1}has(e){return this._idToIndex.has(e)}itemAt(e){return this.options.getItems()?.[e]}idAt(e){let t=this.itemAt(e);return null==t?void 0:this.options.getItemId(t)}itemFor(e){let t=this.indexOf(e);return -1===t?void 0:this.itemAt(t)}ids(){let e=this.options.getItems();return null==e?[]:e.map(e=>this.options.getItemId(e))}};let FocusController=class FocusController{constructor(e,t){this.host=e,this.options=t,this._focusedIndex=-1,this._containerHasFocus=!1,this._connected=!1,e.addController(this)}hostConnected(){this._connected=!0}hostDisconnected(){this._connected=!1}get strategy(){return this.options.strategy??"activedescendant"}get focusedId(){return this._focusedId}get focusedIndex(){return this._focusedIndex}setFocusedId(e){this._focusedId=e}setFocusedIndex(e){this._focusedIndex=e}get containerHasFocus(){return this._containerHasFocus}setContainerHasFocus(e){this._containerHasFocus!==e&&(this._containerHasFocus=e,this.host.requestUpdate())}currentIndex(){let e=this.options.index;if(null!=this._focusedId){let t=e.indexOf(this._focusedId);if(-1!==t)return t}return this._focusedIndex>=0&&this._focusedIndex<e.size?this._focusedIndex:e.size>0?0:-1}focusIndex(e,t){let i=this.options.index.size;if(0===i)return;let o=Math.max(0,Math.min(e,i-1)),r=this.options.index.idAt(o);null!=r&&(this._focusedId=r,this._focusedIndex=o,this.options.onChange?.(),this.host.requestUpdate(),t?.scroll!==!1&&this.options.scroll?.scrollToIndex(o,{restoreFocus:t?.restoreFocus??!0}))}setFocused(e,t){let i=this.options.index.indexOf(e);-1!==i&&this.focusIndex(i,{scroll:t?.scroll})}move(e,t){let i=this.currentIndex()+e;this.focusIndex(i,{scroll:t?.scroll})}first(){this.focusIndex(0)}last(){this.focusIndex(this.options.index.size-1)}pageBy(e,t){this.move(e*Math.max(1,t))}focusElement(e){let t=e??this._focusedId;if(null==t)return;let i=this.options.index.indexOf(t);-1!==i&&this.options.scroll?.scrollToIndex(i,{restoreFocus:!1}),requestAnimationFrame(()=>{if(this._connected)if("roving"===this.strategy){var e;let i,o=this.options.getElementForId?.(t)??this.options.getContainer?.()?.querySelector(`[data-id="${(e=t,i=globalThis.CSS,i?.escape!=null?i.escape(e):e.replace(/["\\]/g,"\\$&"))}"]`);o?.focus()}else this.options.getContainer?.()?.focus()})}reconcile(){let e=this.options.index;if(null!=this._focusedId){let t=e.indexOf(this._focusedId);if(-1!==t){this._focusedIndex=t;return}if(e.size>0){let t=Math.max(0,Math.min(this._focusedIndex,e.size-1));this._focusedIndex=t,this._focusedId=e.idAt(t)}else this._focusedId=void 0,this._focusedIndex=-1}else e.size>0&&(this._focusedId=e.idAt(0),this._focusedIndex=0)}seedFirstIfUnset(){null!=this._focusedId||0!==this.options.index.size&&(this._focusedId=this.options.index.idAt(0),this._focusedIndex=0)}};let KeyboardNavController=class KeyboardNavController{constructor(e,t){this.host=e,this.options=t,e.addController(this)}hostConnected(){}hostDisconnected(){}get multi(){return"multi"===this.options.mode()}get followsFocus(){return this.options.selectionFollowsFocus?.()??!0}handleKeydown(e){let{focus:t,selection:i}=this.options;switch(e.key){case"ArrowDown":case"ArrowUp":{let i="ArrowDown"===e.key?1:-1;if(this.multi&&(e.ctrlKey||e.metaKey))return t.move(i),!0;return t.move(i),this.applyNavSelection(e),!0}case"Home":case"End":return"Home"===e.key?t.first():t.last(),this.applyNavSelection(e),!0;case"PageUp":case"PageDown":return t.pageBy("PageDown"===e.key?1:-1,this.options.pageSize?.()??10),this.applyNavSelection(e),!0;case"Enter":{let e=t.focusedId;return null!=e&&this.options.onActivate?.(e),!0}case" ":{let e=t.focusedId;if(null==e)return!0;return this.multi?i.toggle(e):this.options.onActivate?.(e),!0}case"a":case"A":if(this.multi&&(e.ctrlKey||e.metaKey))return i.selectAll(),!0;return this.options.onUnhandledKey?.(e)??!1;default:return this.options.onUnhandledKey?.(e)??!1}}applyNavSelection(e){let t=this.options.focus.focusedId;if(null!=t){if(this.multi&&e.shiftKey)return void this.options.selection.selectRange(t);if(this.followsFocus){if(this.multi&&!this.options.selection.canSelect(t))return void this.options.selection.clear();this.options.selection.setSingle(t)}}}};let SelectionController=class SelectionController{constructor(e,t){this.options=t,this._selected=new Set,e.addController(this)}hostConnected(){}hostDisconnected(){}get mode(){return this.options.mode?.()??"single"}get selectedIds(){return this._selected}get size(){return this._selected.size}get anchorId(){return this._anchorId}has(e){return this._selected.has(e)}isSelectable(e){return this.options.isSelectable?.(e)??!0}canSelect(e){return this.isSelectable(e)}commit(e){this._selected=e,this.options.onChange?.()}setSingle(e){this._anchorId=e,this.commit(new Set([e]))}setAnchor(e){this._anchorId=e}toggle(e){if(!this.isSelectable(e))return;let t=new Set(this._selected);t.has(e)?t.delete(e):t.add(e),this._anchorId=e,this.commit(t)}selectRange(e,t){let i=this.options.orderedIds(),o=this._anchorId??e,r=i.indexOf(o),s=i.indexOf(e);if(-1===r||-1===s)return void this.setSingle(e);let[a,c]=r<=s?[r,s]:[s,r],h=t?.additive?new Set(this._selected):new Set;for(let e=a;e<=c;e++){let t=i[e];this.isSelectable(t)&&h.add(t)}this.commit(h)}selectAll(){let e=new Set;for(let t of this.options.orderedIds())this.isSelectable(t)&&e.add(t);(0!==e.size||0!==this._selected.size)&&this.commit(e)}clear(){0!==this._selected.size&&(this._anchorId=void 0,this.commit(new Set))}pruneTo(e){let t="function"==typeof e?e:t=>e.has(t),i=!1,o=new Set;for(let e of this._selected)t(e)?o.add(e):i=!0;null==this._anchorId||t(this._anchorId)||(this._anchorId=void 0),i&&this.commit(o)}};let VirtualScrollController=class VirtualScrollController{constructor(e,t){this.host=e,this.options=t,this._scrolling=!1,e.addController(this)}hostConnected(){}hostDisconnected(){this._scrolling=!1}scrollToIndex(e,t){if(this._scrolling)return;this._scrolling=!0;let i=t?.restoreFocus??!0;this.host.updateComplete.then(()=>{let t=this.options.getVirtualizer(),o=this.options.getContainer?.();if(null==t){this._scrolling=!1;return}let r=()=>{i&&null!=o&&document.activeElement!==o&&o.focus(),this._scrolling=!1},s=0===e,a=e===this.options.getCount()-1;s||a?requestAnimationFrame(()=>{s?t.scrollTop=0:t.scrollTop=t.scrollHeight,requestAnimationFrame(r)}):requestAnimationFrame(()=>{let i=t.scrollToIndex?.(e,"nearest");null!=i&&"function"==typeof i.then?i.then(r):requestAnimationFrame(r)})},()=>{this._scrolling=!1})}async kickAfterFirstLayout(e){let t=this.options.getVirtualizer();null!=t&&(await t.layoutComplete,e())}};let VirtualCollectionController=class VirtualCollectionController{constructor(e,t){this.host=e,this.options=t,e.addController(this),this.index=new CollectionIndexController(e,{getItems:t.getItems,getItemId:t.getItemId}),this.scroll=new VirtualScrollController(e,{getVirtualizer:t.getVirtualizer,getContainer:t.getContainer,getCount:()=>this.index.size}),this.selection=new SelectionController(e,{mode:t.mode,orderedIds:()=>this.index.ids(),isSelectable:null!=t.isSelectable?e=>this.isSelectable(e):void 0,onChange:t.onSelectionChange}),this.focus=new FocusController(e,{index:this.index,scroll:this.scroll,strategy:t.focusStrategy,getContainer:t.getContainer}),this.keyboard=new KeyboardNavController(e,{index:this.index,focus:this.focus,selection:this.selection,mode:t.mode??(()=>"single"),pageSize:t.pageSize,selectionFollowsFocus:t.selectionFollowsFocus,onActivate:t.onActivate,onUnhandledKey:t.onUnhandledKey})}hostConnected(){}hostDisconnected(){}hostUpdated(){this.seedAnchor()}seedAnchor(){if("multi"!==this.selection.mode||null!=this.selection.anchorId)return;let e=this.focus.focusedId;null!=e&&this.selection.setAnchor(e)}isSelectable(e){let t=this.options.isSelectable;if(null==t)return!0;let i=this.index.itemFor(e);return null!=i&&t(i)}onItemsChanged(){this.index.rebuild(),this.focus.reconcile(),this.selection.pruneTo(e=>this.index.has(e))}handleKeydown(e){return this.keyboard.handleKeydown(e)}};function ar(e,t,i,o){var r,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(a=(s<3?r(a):s>3?r(t,i,a):r(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}let as=(e,t,i)=>{let o=new Map;for(let r=t;r<=i;r++)o.set(e[r],r);return o},an=tl(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let o;void 0===i?i=t:void 0!==t&&(o=t);let r=[],s=[],a=0;for(let t of e)r[a]=o?o(t,a):a,s[a]=i(t,a),a++;return{values:s,keys:r}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,o]){let r=e._$AH,{values:s,keys:a}=this.dt(t,i,o);if(!Array.isArray(r))return this.ut=a,s;let c=this.ut??=[],h=[],p,u,g=0,m=r.length-1,f=0,b=s.length-1;for(;g<=m&&f<=b;)if(null===r[g])g++;else if(null===r[m])m--;else if(c[g]===a[f])h[f]=tp(r[g],s[f]),g++,f++;else if(c[m]===a[b])h[b]=tp(r[m],s[b]),m--,b--;else if(c[g]===a[b])h[b]=tp(r[g],s[b]),td(e,h[b+1],r[g]),g++,b--;else if(c[m]===a[f])h[f]=tp(r[m],s[f]),td(e,r[g],r[m]),m--,f++;else if(void 0===p&&(p=as(a,f,b),u=as(c,g,m)),p.has(c[g]))if(p.has(c[m])){let t=u.get(a[f]),i=void 0!==t?r[t]:null;if(null===i){let t=td(e,r[g]);tp(t,s[f]),h[f]=t}else h[f]=tp(i,s[f]),td(e,r[g],i),r[t]=null;f++}else tm(r[m]),m--;else tm(r[g]),g++;for(;f<=b;){let t=td(e,h[b+1]);tp(t,s[f]),h[f++]=t}for(;g<=m;){let e=r[g++];null!==e&&tm(e)}return this.ut=a,tg(e,h),eC}});let RangeChangedEvent=class RangeChangedEvent extends Event{constructor(e){super(RangeChangedEvent.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};RangeChangedEvent.eventName="rangeChanged";let VisibilityChangedEvent=class VisibilityChangedEvent extends Event{constructor(e){super(VisibilityChangedEvent.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};VisibilityChangedEvent.eventName="visibilityChanged";let UnpinnedEvent=class UnpinnedEvent extends Event{constructor(){super(UnpinnedEvent.eventName,{bubbles:!1})}};UnpinnedEvent.eventName="unpinned";let ScrollerShim=class ScrollerShim{constructor(e){this._element=null;let t=e??window;this._node=t,e&&(this._element=e)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}};let ScrollerController=class ScrollerController extends ScrollerShim{constructor(e,t){super(t),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let i=this._node;this._originalScrollTo=i.scrollTo,this._originalScrollBy=i.scrollBy,this._originalScroll=i.scroll,this._attach(e)}get _destination(){return this.__destination}get scrolling(){return null!==this._destination}scrollTo(e,t){this._scrollTo("number"==typeof e&&"number"==typeof t?{left:e,top:t}:e)}scrollBy(e,t){let i="number"==typeof e&&"number"==typeof t?{left:e,top:t}:e;void 0!==i.top&&(i.top+=this.scrollTop),void 0!==i.left&&(i.left+=this.scrollLeft),this._scrollTo(i)}_nativeScrollTo(e){this._originalScrollTo.bind(this._element||window)(e)}_scrollTo(e,t=null,i=null){null!==this._end&&this._end(),"smooth"===e.behavior?(this._setDestination(e),this._retarget=t,this._end=i):this._resetScrollState(),this._nativeScrollTo(e)}_setDestination(e){let{top:t,left:i}=e;return t=void 0===t?void 0:Math.max(0,Math.min(t,this.maxScrollTop)),i=void 0===i?void 0:Math.max(0,Math.min(i,this.maxScrollLeft)),(null===this._destination||i!==this._destination.left||t!==this._destination.top)&&(this.__destination={top:t,left:i,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(e){this._destination&&this._setDestination(e)&&this._nativeScrollTo(this._destination)}managedScrollTo(e,t,i){return this._scrollTo(e,t,i),this._updateManagedScrollTo}correctScrollError(e){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(e),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(null!==this._destination){let{scrollTop:e,scrollLeft:t}=this,{top:i,left:o}=this._destination;i=Math.min(i||0,this.maxScrollTop);let r=Math.abs((o=Math.min(o||0,this.maxScrollLeft))-t);1>Math.abs(i-e)&&r<1&&(this._end&&this._end(),this._resetScrollState())}}detach(e){return this._clients.delete(e),0===this._clients.size&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(e){this._clients.add(e),1===this._clients.size&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};let aa="u">typeof window?window.ResizeObserver:void 0,al=Symbol("virtualizerRef"),ac="virtualizer-sizer";let Virtualizer=class Virtualizer{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!e)throw Error("Virtualizer constructor requires a configuration object");if(e.hostElement)this._init(e);else throw Error('Virtualizer configuration requires the "hostElement" property')}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e);let t=e.layout||{};this._layoutInitialized=this._initLayout(t)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new aa(()=>this._hostElementSizeChanged()),this._childrenRO=new aa(this._childrenSizeChanged.bind(this))}_initHostElement(e){let t=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),t[al]=this}connected(){this._initObservers();let e=this._isScroller;this._clippingAncestors=function(e,t=!1){let i=!1;return(function(e,t=!1){let i=[],o=t?e:ad(e);for(;null!==o;)i.push(o),o=ad(o);return i})(e,t).filter(e=>{if(i)return!1;let t=getComputedStyle(e);return i="fixed"===t.position,"visible"!==t.overflow})}(this._hostElement,e),this._scrollerController=new ScrollerController(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(e=>this._childrenRO.observe(e)),this._scrollEventListeners.forEach(e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){let e=this._hostElement;if(!this._sizer){let t=e.querySelector(`[${ac}]`);t||((t=document.createElement("div")).setAttribute(ac,""),e.appendChild(t)),Object.assign(t.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),t.textContent="&nbsp;",t.setAttribute(ac,""),this._sizer=t}return this._sizer}async updateLayoutConfig(e){await this._layoutInitialized;let t=e.type||g;if("function"==typeof t&&this._layout instanceof t){let t={...e};return delete t.type,this._layout.config=t,!0}return!1}async _initLayout(e){let t,i;if("function"==typeof e.type){i=e.type;let o={...e};delete o.type,t=o}else t=e;void 0===i&&(g=i=(await Promise.resolve().then(E.bind(E,285))).FlowLayout),this._layout=new i(e=>this._handleLayoutMessage(e),t),this._layout.measureChildren&&"function"==typeof this._layout.updateItemSizes&&("function"==typeof this._layout.measureChildren&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){null===this._benchmarkStart&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(null!==this._benchmarkStart){let e=window.performance.now(),t=e-this._benchmarkStart,i=performance.getEntriesByName("uv-virtualizing","measure").filter(t=>t.startTime>=this._benchmarkStart&&t.startTime<e).reduce((e,t)=>e+t.duration,0);return this._benchmarkStart=null,{timeElapsed:t,virtualizationTime:i}}return null}_measureChildren(){let e={},t=this._children,i=this._measureChildOverride||this._measureChild;for(let o=0;o<t.length;o++){let r=t[o],s=this._first+o;(this._itemsChanged||this._toBeMeasured.has(r))&&(e[s]=i.call(this,r,this._items[s]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){var t;let i,{width:o,height:r}=e.getBoundingClientRect();return Object.assign({width:o,height:r},(t=e,{marginTop:ah((i=window.getComputedStyle(t)).marginTop),marginRight:ah(i.marginRight),marginBottom:ah(i.marginBottom),marginLeft:ah(i.marginLeft)}))}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(e){this._scrollSize=e.scrollSize,this._adjustRange(e.range),this._childrenPos=e.childPositions,this._scrollError=e.scrollError||null;let{_rangeChanged:t,_itemsChanged:i}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(t||i)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(e=>this._childrenRO.observe(e)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),null!==this._childMeasurements&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch{}window.performance.mark("uv-start")}!1===this._scrollerController.correctingScrollError&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(e){"scroll"===e.type&&(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent()}_handleLayoutMessage(e){"stateChanged"===e.type?this._updateDOM(e):"visibilityChanged"===e.type?(this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._notifyVisibility()):"unpinned"===e.type&&this._hostElement.dispatchEvent(new UnpinnedEvent)}get _children(){let e=[],t=this._hostElement.firstElementChild;for(;t;)t.hasAttribute(ac)||e.push(t),t=t.nextElementSibling;return e}_updateView(){let e=this._hostElement,t=this._scrollerController?.element,i=this._layout;if(e&&t&&i){let o,r,s,a,c=e.getBoundingClientRect();o=0,r=0,s=window.innerHeight,a=window.innerWidth;let h=this._clippingAncestors.map(e=>e.getBoundingClientRect());for(let e of(h.unshift(c),h))o=Math.max(o,e.top),r=Math.max(r,e.left),s=Math.min(s,e.bottom),a=Math.min(a,e.right);let p=t.getBoundingClientRect(),u={left:c.left-p.left,top:c.top-p.top},g={width:t.scrollWidth,height:t.scrollHeight},m=o-c.top+e.scrollTop,f=r-c.left+e.scrollLeft;i.viewportSize={width:Math.max(0,a-r),height:Math.max(0,s-o)},i.viewportScroll={top:m,left:f},i.totalScrollSize=g,i.offsetWithinScroller=u}}_sizeHostElement(e){let t=e&&null!==e.width?Math.min(82e5,e.width):0,i=e&&null!==e.height?Math.min(82e5,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${t}px, ${i}px)`;else{let e=this._hostElement.style;e.minWidth=t?`${t}px`:"100%",e.minHeight=i?`${i}px`:"100%"}}_positionChildren(e){e&&e.forEach(({top:e,left:t,width:i,height:o,xOffset:r,yOffset:s},a)=>{let c=this._children[a-this._first];c&&(c.style.position="absolute",c.style.boxSizing="border-box",c.style.transform=`translate(${t}px, ${e}px)`,void 0!==i&&(c.style.width=i+"px"),void 0!==o&&(c.style.height=o+"px"),c.style.left=void 0===r?null:r+"px",c.style.top=void 0===s?null:s+"px")})}async _adjustRange(e){let{_first:t,_last:i,_firstVisible:o,_lastVisible:r}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==t||this._last!==i,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==o||this._lastVisible!==r}_correctScrollError(){if(this._scrollError){let{scrollTop:e,scrollLeft:t}=this._scrollerController,{top:i,left:o}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:e-i,left:t-o})}}element(e){return e===1/0&&(e=this._items.length-1),this._items?.[e]===void 0?void 0:{scrollIntoView:(t={})=>this._scrollElementIntoView({...t,index:e})}}_scrollElementIntoView(e){if(e.index>=this._first&&e.index<=this._last)this._children[e.index-this._first].scrollIntoView(e);else if(e.index=Math.min(e.index,this._items.length-1),"smooth"===e.behavior){let t=this._layout.getScrollIntoViewCoordinates(e),{behavior:i}=e;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(t,{behavior:i}),()=>this._layout.getScrollIntoViewCoordinates(e),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=e}else this._layout.pin=e}_checkScrollIntoViewTarget(e){let{index:t}=this._scrollIntoViewTarget||{};t&&e?.has(t)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new RangeChangedEvent({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new VisibilityChangedEvent({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((e,t)=>{this._layoutCompleteResolver=e,this._layoutCompleteRejecter=t})),this._layoutCompletePromise}_rejectLayoutCompletePromise(e){null!==this._layoutCompleteRejecter&&this._layoutCompleteRejecter(e),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&null===this._pendingLayoutComplete&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){null!==this._layoutCompleteResolver&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(e){if(this._layout?.measureChildren){for(let t of e)this._toBeMeasured.set(t.target,t.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function ah(e){let t=e?parseFloat(e):NaN;return Number.isNaN(t)?0:t}function ad(e){if(null!==e.assignedSlot)return e.assignedSlot;if(null!==e.parentElement)return e.parentElement;let t=e.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}let ap=e=>e,au=(e,t)=>ex`${t}: ${JSON.stringify(e,null,2)}`;let VirtualizeDirective=class VirtualizeDirective extends async_directive_f{constructor(e){if(super(e),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,t)=>au(e,t+this._first),this._keyFunction=(e,t)=>ap(e,this._first),this._items=[],2!==e.type)throw Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);let t=[];if(this._first>=0&&this._last>=this._first)for(let e=this._first;e<=this._last;e++)t.push(this._items[e]);return an(t,this._keyFunction,this._renderItem)}update(e,[t]){this._setFunctions(t);let i=this._items!==t.items;return this._items=t.items||[],this._virtualizer?this._updateVirtualizerConfig(e,t):this._initialize(e,t),i?eC:this.render()}async _updateVirtualizerConfig(e,t){if(!await this._virtualizer.updateLayoutConfig(t.layout||{})){let i=e.parentNode;this._makeVirtualizer(i,t)}this._virtualizer.items=this._items}_setFunctions(e){let{renderItem:t,keyFunction:i}=e;t&&(this._renderItem=(e,i)=>t(e,i+this._first)),i&&(this._keyFunction=(e,t)=>i(e,t+this._first))}_makeVirtualizer(e,t){this._virtualizer&&this._virtualizer.disconnected();let{layout:i,scroller:o,items:r}=t;this._virtualizer=new Virtualizer({hostElement:e,layout:i,scroller:o}),this._virtualizer.items=r,this._virtualizer.connected()}_initialize(e,t){let i=e.parentNode;i&&1===i.nodeType&&(i.addEventListener("rangeChanged",e=>{this._first=e.first,this._last=e.last,this.setValue(this.render())}),this._makeVirtualizer(i,t))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}};let ag=tl(VirtualizeDirective);let LitVirtualizer=class LitVirtualizer extends lit_element_i{constructor(){super(...arguments),this.items=[],this.renderItem=au,this.keyFunction=ap,this.layout={},this.scroller=!1}createRenderRoot(){return this}render(){let{items:e,renderItem:t,keyFunction:i,layout:o,scroller:r}=this;return ex`${ag({items:e,renderItem:t,keyFunction:i,layout:o,scroller:r})}`}element(e){return this[al]?.element(e)}get layoutComplete(){return this[al]?.layoutComplete}scrollToIndex(e,t="start"){this.element(e)?.scrollIntoView({block:t})}};ar([ej({attribute:!1})],LitVirtualizer.prototype,"items",void 0),ar([ej()],LitVirtualizer.prototype,"renderItem",void 0),ar([ej()],LitVirtualizer.prototype,"keyFunction",void 0),ar([ej({attribute:!1})],LitVirtualizer.prototype,"layout",void 0),ar([ej({reflect:!0,type:Boolean})],LitVirtualizer.prototype,"scroller",void 0),customElements.define("lit-virtualizer",LitVirtualizer);var am=Object.defineProperty,af=Object.getOwnPropertyDescriptor,ab=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?af(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&am(t,i,s),s};let av=class extends lit_element_i{constructor(){super(...arguments),this.size=12,this.worktree=!1,this.chevron=!1,this.onKeydown=e=>{"button"===this.appearance&&("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}updated(e){e.has("appearance")&&("button"===this.appearance?(this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")):("button"===this.getAttribute("role")&&this.removeAttribute("role"),"0"===this.getAttribute("tabindex")&&this.removeAttribute("tabindex")))}render(){let e=this.icon??(this.worktree?"gl-worktree":"git-branch");return ex`<code-icon class="icon" icon="${e}" size="${this.size}"></code-icon
			><span class="label">${this.name??"<missing>"}</span>${this.chevron?ex`<code-icon class="chevron" icon="chevron-down" size="12"></code-icon>`:e$}`}};function a_(e,t){return ex`<gl-branch-name .name=${e} .size=${12} ?worktree=${t??!1}></gl-branch-name>`}av.styles=j`
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
	`,ab([ej({reflect:!0})],av.prototype,"appearance",2),ab([ej({type:String})],av.prototype,"name",2),ab([ej({type:Number})],av.prototype,"size",2),ab([ej({type:Boolean})],av.prototype,"worktree",2),ab([ej({type:Boolean})],av.prototype,"chevron",2),ab([ej()],av.prototype,"icon",2),av=ab([eM("gl-branch-name")],av);var ay=Object.defineProperty,aw=Object.getOwnPropertyDescriptor,ax=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?aw(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&ay(t,i,s),s};let ak=class extends lit_element_i{constructor(){super(...arguments),this.hasChanges=!1,this.worktree=!1,this.isDefault=!1}render(){return ex`<gl-tooltip placement="bottom"
			>${this.renderIcon()}<span slot="content">${this.renderTooltipContent()}</span></gl-tooltip
		>`}renderIcon(){let e;if(!this.worktree&&(!this.status||"local"===this.status))return ex`<code-icon icon="git-branch"></code-icon>`;if("detached"===this.status)return ex`<code-icon icon="git-commit"></code-icon>`;let t="0.5";switch(this.status){case"diverged":e="var(--gl-icon-color-status-diverged)";break;case"behind":e="var(--gl-icon-color-status-behind)";break;case"ahead":e="var(--gl-icon-color-status-ahead)";break;case"missingUpstream":e="var(--gl-icon-color-status-missingUpstream)";break;case"upToDate":e=`var(--gl-icon-color-status-${this.hasChanges?"changes":"synced"})`;break;default:this.hasChanges?e="var(--gl-icon-color-status-changes)":(e="transparent",t="1")}return this.worktree&&!1===this.isDefault?ek`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
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
			</svg>`:ek`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
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
		</svg>`}renderTooltipContent(){let e,t=this.branch?a_(this.branch):"Branch",i=this.upstream?a_(this.upstream):"its upstream";switch(this.status){case"diverged":e=ex`${t} has diverged from ${i}`;break;case"behind":e=ex`${t} is behind ${i}`;break;case"ahead":e=ex`${t} is ahead of ${i}`;break;case"missingUpstream":e=ex`${t} is missing its upstream ${i}`;break;case"upToDate":e=ex`${t} is up to date with ${i}`;break;case"local":e=ex`${t} is a local branch which hasn't been published`;break;case"remote":e=ex`${t} is a remote branch`;break;case"detached":e=ex`${t} is in a detached state, i.e. checked out to a commit or tag`;break;default:e=ex`${t} is in an unknown state`}return e=ex`<p>${e}</p>`,this.worktree?e=this.hasChanges?ex`${e}
					<p>Checked out in a worktree and has working (uncommitted) changes</p>`:ex`${e}
					<p>Checked out in a worktree</p>`:this.hasChanges&&(e=ex`${e}
				<p>Has working (uncommitted) changes</p>`),e}};ak.styles=j`
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
	`,ax([ej({type:String})],ak.prototype,"branch",2),ax([ej({type:String})],ak.prototype,"status",2),ax([ej({type:Boolean})],ak.prototype,"hasChanges",2),ax([ej({type:String})],ak.prototype,"upstream",2),ax([ej({type:Boolean})],ak.prototype,"worktree",2),ax([ej({type:Boolean,attribute:"is-default"})],ak.prototype,"isDefault",2),ak=ax([eM("gl-branch-icon")],ak);let aC={"cherry-pick":{label:"Cherry picking",conflicts:"Resolve conflicts to continue cherry picking",directionality:"into"},merge:{label:"Merging",conflicts:"Resolve conflicts to continue merging",directionality:"into"},rebase:{label:"Rebasing",conflicts:"Resolve conflicts to continue rebasing",directionality:"onto",pending:"Pending rebase of"},revert:{label:"Reverting",conflicts:"Resolve conflicts to continue reverting",directionality:"in"}},a$=j`
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
`;var aS=Object.defineProperty,aE=Object.getOwnPropertyDescriptor,aA=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?aE(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&aS(t,i,s),s};let aI=class extends lit_element_i{constructor(){super(...arguments),this.showClean=!1,this.badge=!1,this.noTooltip=!1,this.hasConflicts=!1}render(){if(null!=this.pausedOpStatus)return this.renderPausedOp(this.pausedOpStatus);let e=this.added??0,t=this.modified??0,i=this.removed??0;if(this.dirty??e+t+i>0){var o;let r,s=this.badge?ex`<span class="indicator-pill pill pill--outlined" aria-label="Working tree has changes">
						<code-icon icon="pencil"></code-icon>
					</span>`:ex`<commit-stats
						added=${e||e$}
						modified=${t||e$}
						removed=${i||e$}
						symbol="icons"
						appearance="pill"
						no-tooltip
					></commit-stats>`;if(this.noTooltip)return s;let a=(r=[],(o={added:e,changed:t,deleted:i}).added&&r.push(`${tY("file",o.added)} added`),o.changed&&r.push(`${tY("file",o.changed)} changed`),o.deleted&&r.push(`${tY("file",o.deleted)} deleted`),r),c=a.length?`${a.join(", ")} in the working tree`:"Working tree has changes";return ex`<gl-tooltip placement="bottom"
				>${s}<span slot="content">${c}</span></gl-tooltip
			>`}if(!this.showClean||null==this.dirty&&null==this.added&&null==this.modified&&null==this.removed)return e$;if(this.badge){let e=ex`<span class="indicator-pill pill pill--outlined" aria-label="No changes">
				<code-icon class="wip-clean-check" icon="check"></code-icon>
			</span>`;return this.noTooltip?e:ex`<gl-tooltip placement="bottom">${e}<span slot="content">No changes</span></gl-tooltip>`}let r=ex`<commit-stats class="indicator-pill" appearance="pill" no-tooltip aria-label="No changes">
			<code-icon class="wip-clean-check" icon="check"></code-icon>
		</commit-stats>`;return this.noTooltip?r:ex`<gl-tooltip placement="bottom">${r}<span slot="content">No changes</span></gl-tooltip>`}renderPausedOp(e){let t=aC[e.type],i=this.hasConflicts?tY("conflict",this.conflictsCount??1):t.label,o=ex`<span
			class="paused-op-badge${this.hasConflicts?" paused-op-badge--conflicts":""}"
			aria-label=${i}
		>
			<code-icon icon="warning"></code-icon>
			${i}
		</span>`;return this.noTooltip?o:ex`<gl-tooltip placement="bottom"
			>${o}<span slot="content">${t.label} in progress</span></gl-tooltip
		>`}};aI.styles=[a$,j`
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
		`],aA([ej({type:Number})],aI.prototype,"added",2),aA([ej({type:Number})],aI.prototype,"modified",2),aA([ej({type:Number})],aI.prototype,"removed",2),aA([ej({type:Boolean})],aI.prototype,"dirty",2),aA([ej({type:Boolean,attribute:"show-clean"})],aI.prototype,"showClean",2),aA([ej({type:Boolean})],aI.prototype,"badge",2),aA([ej({type:Boolean,attribute:"no-tooltip"})],aI.prototype,"noTooltip",2),aA([ej({attribute:!1})],aI.prototype,"pausedOpStatus",2),aA([ej({type:Boolean,attribute:"has-conflicts"})],aI.prototype,"hasConflicts",2),aA([ej({type:Number,attribute:"conflicts-count"})],aI.prototype,"conflictsCount",2),aI=aA([eM("gl-wip-stats")],aI);var aP=Object.defineProperty,az=Object.getOwnPropertyDescriptor,aT=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?az(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&aP(t,i,s),s};let aR=class extends lit_element_i{constructor(){super(...arguments),this.ahead=0,this.behind=0,this.working=0,this.alwaysShow=!1,this.outlined=!1,this.colorized=!1,this.missingUpstream=!1}render(){return 0===this.ahead&&0===this.behind&&0===this.working?this.alwaysShow?this.missingUpstream?ex`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
					<span class="state${this.colorized?" state--missing":""}"
						><code-icon icon="error"></code-icon></span
				></span>`:ex`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
				<span class="state${this.colorized?" state--ahead":""}"><code-icon icon="sync"></code-icon></span>
			</span>`:e$:ex`<span part="base" class="pill${this.outlined?" pill--outlined":""}"
			>${s3(this.behind>0,()=>ex`<span class="state${this.colorized?" state--behind":""}"
						>${this.behind}<code-icon icon="arrow-down"></code-icon
					></span>`)}${s3(this.ahead>0,()=>ex`<span class="state${this.colorized?" state--ahead":""}"
						>${this.ahead}<code-icon icon="arrow-up"></code-icon
					></span>`)}${s3(this.working>0,()=>ex`<span class="state${this.colorized?" state--working":""}"
						>${this.working}<span class="working">&#177;</span></span
					>`)}</span
		>`}};aR.styles=[a$,j`
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
		`],aT([ej({type:Number})],aR.prototype,"ahead",2),aT([ej({type:Number})],aR.prototype,"behind",2),aT([ej({type:Number})],aR.prototype,"working",2),aT([ej({type:Boolean,attribute:"always-show"})],aR.prototype,"alwaysShow",2),aT([ej({type:Boolean})],aR.prototype,"outlined",2),aT([ej({type:Boolean})],aR.prototype,"colorized",2),aT([ej({type:Boolean})],aR.prototype,"missingUpstream",2),aR=aT([eM("gl-tracking-pill")],aR);let aM="important",aB=` !${aM}`,aj=0-aB.length;let CspStyleMapDirective=class CspStyleMapDirective extends directive_i{constructor(e){if(super(e),1!==e.type||"style"!==e.name||e.strings?.length>2)throw Error("The `cspStyleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return eC}update(e,[t]){let i=e.element.style,o=this._previous??=new Map;for(let e of o.keys())null==t[e]&&(o.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(let e in t){let r=t[e];if(null==r)continue;let s="string"==typeof r&&r.endsWith(aB),a=s?r.slice(0,aj):String(r);o.get(e)!==a&&(o.set(e,a),e.includes("-")||s?i.setProperty(e,a,s?aM:""):i[e]=a)}return eC}};let aO=tl(CspStyleMapDirective),aD={_argdown:["\\E003","#519aba"],_argdown_light:["\\E003","#498ba7"],_asm:["\\E004","#cc3e44"],_asm_light:["\\E004","#b8383d"],_audio:["\\E005","#a074c4"],_audio_light:["\\E005","#9068b0"],_babel:["\\E006","#cbcb41"],_babel_light:["\\E006","#b7b73b"],_bazel:["\\E007","#8dc149"],_bazel_1:["\\E007","#4d5a5e"],_bazel_1_light:["\\E007","#455155"],_bazel_light:["\\E007","#7fae42"],_bicep:["\\E008","#519aba"],_bicep_light:["\\E008","#498ba7"],_bower:["\\E009","#e37933"],_bower_light:["\\E009","#cc6d2e"],_bsl:["\\E00A","#cc3e44"],_bsl_light:["\\E00A","#b8383d"],_c:["\\E00C","#519aba"],_c_1:["\\E00C","#a074c4"],_c_1_light:["\\E00C","#9068b0"],_c_2:["\\E00C","#cbcb41"],_c_2_light:["\\E00C","#b7b73b"],_c_light:["\\E00C","#498ba7"],"_c-sharp":["\\E00B","#519aba"],"_c-sharp_light":["\\E00B","#498ba7"],_cake:["\\E00D","#cc3e44"],_cake_light:["\\E00D","#b8383d"],_cake_php:["\\E00E","#cc3e44"],_cake_php_light:["\\E00E","#b8383d"],_clock:["\\E012","#519aba"],_clock_1:["\\E012","#6d8086"],_clock_1_light:["\\E012","#627379"],_clock_light:["\\E012","#498ba7"],_clojure:["\\E013","#8dc149"],_clojure_1:["\\E013","#519aba"],_clojure_1_light:["\\E013","#498ba7"],_clojure_light:["\\E013","#7fae42"],"_code-climate":["\\E014","#8dc149"],"_code-climate_light":["\\E014","#7fae42"],"_code-search":["\\E015","#a074c4"],"_code-search_light":["\\E015","#9068b0"],_coffee:["\\E016","#cbcb41"],_coffee_light:["\\E016","#b7b73b"],_coldfusion:["\\E018","#519aba"],_coldfusion_light:["\\E018","#498ba7"],_config:["\\E019","#6d8086"],_config_light:["\\E019","#627379"],_cpp:["\\E01A","#519aba"],_cpp_1:["\\E01A","#a074c4"],_cpp_1_light:["\\E01A","#9068b0"],_cpp_2:["\\E01A","#cbcb41"],_cpp_2_light:["\\E01A","#b7b73b"],_cpp_light:["\\E01A","#498ba7"],_crystal:["\\E01B","#d4d7d6"],_crystal_embedded:["\\E01C","#d4d7d6"],_crystal_embedded_light:["\\E01C","#bfc2c1"],_crystal_light:["\\E01B","#bfc2c1"],_css:["\\E01D","#519aba"],_css_light:["\\E01D","#498ba7"],_csv:["\\E01E","#8dc149"],_csv_light:["\\E01E","#7fae42"],_cu:["\\E01F","#8dc149"],_cu_1:["\\E01F","#a074c4"],_cu_1_light:["\\E01F","#9068b0"],_cu_light:["\\E01F","#7fae42"],_d:["\\E020","#cc3e44"],_d_light:["\\E020","#b8383d"],_dart:["\\E021","#519aba"],_dart_light:["\\E021","#498ba7"],_db:["\\E022","#f55385"],_db_1:["\\E022","#519aba"],_db_1_light:["\\E022","#498ba7"],_db_light:["\\E022","#dd4b78"],_default:["\\E023","#d4d7d6"],_default_light:["\\E023","#bfc2c1"],_docker:["\\E025","#519aba"],_docker_1:["\\E025","#4d5a5e"],_docker_1_light:["\\E025","#455155"],_docker_2:["\\E025","#8dc149"],_docker_2_light:["\\E025","#7fae42"],_docker_3:["\\E025","#f55385"],_docker_3_light:["\\E025","#dd4b78"],_docker_light:["\\E025","#498ba7"],_ejs:["\\E027","#cbcb41"],_ejs_light:["\\E027","#b7b73b"],_elixir:["\\E028","#a074c4"],_elixir_light:["\\E028","#9068b0"],_elixir_script:["\\E029","#a074c4"],_elixir_script_light:["\\E029","#9068b0"],_elm:["\\E02A","#519aba"],_elm_light:["\\E02A","#498ba7"],_eslint:["\\E02C","#a074c4"],_eslint_1:["\\E02C","#4d5a5e"],_eslint_1_light:["\\E02C","#455155"],_eslint_light:["\\E02C","#9068b0"],_ethereum:["\\E02D","#519aba"],_ethereum_light:["\\E02D","#498ba7"],"_f-sharp":["\\E02E","#519aba"],"_f-sharp_light":["\\E02E","#498ba7"],_favicon:["\\E02F","#cbcb41"],_favicon_light:["\\E02F","#b7b73b"],_firebase:["\\E030","#e37933"],_firebase_light:["\\E030","#cc6d2e"],_firefox:["\\E031","#e37933"],_firefox_light:["\\E031","#cc6d2e"],_font:["\\E033","#cc3e44"],_font_light:["\\E033","#b8383d"],_git:["\\E034","#41535b"],_git_light:["\\E034","#3b4b52"],_github:["\\E037","#d4d7d6"],_github_light:["\\E037","#bfc2c1"],_gitlab:["\\E038","#e37933"],_gitlab_light:["\\E038","#cc6d2e"],_go:["\\E039","#519aba"],_go_light:["\\E039","#498ba7"],_go2:["\\E03A","#519aba"],_go2_light:["\\E03A","#498ba7"],_godot:["\\E03B","#519aba"],_godot_1:["\\E03B","#cc3e44"],_godot_1_light:["\\E03B","#b8383d"],_godot_2:["\\E03B","#cbcb41"],_godot_2_light:["\\E03B","#b7b73b"],_godot_3:["\\E03B","#a074c4"],_godot_3_light:["\\E03B","#9068b0"],_godot_light:["\\E03B","#498ba7"],_gradle:["\\E03C","#519aba"],_gradle_light:["\\E03C","#498ba7"],_grails:["\\E03D","#8dc149"],_grails_light:["\\E03D","#7fae42"],_graphql:["\\E03E","#f55385"],_graphql_light:["\\E03E","#dd4b78"],_grunt:["\\E03F","#e37933"],_grunt_light:["\\E03F","#cc6d2e"],_gulp:["\\E040","#cc3e44"],_gulp_light:["\\E040","#b8383d"],_hacklang:["\\E041","#e37933"],_hacklang_light:["\\E041","#cc6d2e"],_haml:["\\E042","#cc3e44"],_haml_light:["\\E042","#b8383d"],_happenings:["\\E043","#519aba"],_happenings_light:["\\E043","#498ba7"],_haskell:["\\E044","#a074c4"],_haskell_light:["\\E044","#9068b0"],_haxe:["\\E045","#e37933"],_haxe_1:["\\E045","#cbcb41"],_haxe_1_light:["\\E045","#b7b73b"],_haxe_2:["\\E045","#519aba"],_haxe_2_light:["\\E045","#498ba7"],_haxe_3:["\\E045","#a074c4"],_haxe_3_light:["\\E045","#9068b0"],_haxe_light:["\\E045","#cc6d2e"],_heroku:["\\E046","#a074c4"],_heroku_light:["\\E046","#9068b0"],_hex:["\\E047","#cc3e44"],_hex_light:["\\E047","#b8383d"],_html:["\\E048","#519aba"],_html_1:["\\E048","#8dc149"],_html_1_light:["\\E048","#7fae42"],_html_2:["\\E048","#cbcb41"],_html_2_light:["\\E048","#b7b73b"],_html_3:["\\E048","#e37933"],_html_3_light:["\\E048","#cc6d2e"],_html_erb:["\\E049","#cc3e44"],_html_erb_light:["\\E049","#b8383d"],_html_light:["\\E048","#498ba7"],_ignored:["\\E04A","#41535b"],_ignored_light:["\\E04A","#3b4b52"],_illustrator:["\\E04B","#cbcb41"],_illustrator_light:["\\E04B","#b7b73b"],_image:["\\E04C","#a074c4"],_image_light:["\\E04C","#9068b0"],_info:["\\E04D","#519aba"],_info_light:["\\E04D","#498ba7"],_ionic:["\\E04E","#519aba"],_ionic_light:["\\E04E","#498ba7"],_jade:["\\E04F","#cc3e44"],_jade_light:["\\E04F","#b8383d"],_java:["\\E050","#cc3e44"],_java_1:["\\E050","#519aba"],_java_1_light:["\\E050","#498ba7"],_java_light:["\\E050","#b8383d"],_javascript:["\\E051","#cbcb41"],_javascript_1:["\\E051","#e37933"],_javascript_1_light:["\\E051","#cc6d2e"],_javascript_2:["\\E051","#519aba"],_javascript_2_light:["\\E051","#498ba7"],_javascript_light:["\\E051","#b7b73b"],_jenkins:["\\E052","#cc3e44"],_jenkins_light:["\\E052","#b8383d"],_jinja:["\\E053","#cc3e44"],_jinja_light:["\\E053","#b8383d"],_json:["\\E055","#cbcb41"],_json_1:["\\E055","#8dc149"],_json_1_light:["\\E055","#7fae42"],_json_light:["\\E055","#b7b73b"],_julia:["\\E056","#a074c4"],_julia_light:["\\E056","#9068b0"],_karma:["\\E057","#8dc149"],_karma_light:["\\E057","#7fae42"],_kotlin:["\\E058","#e37933"],_kotlin_light:["\\E058","#cc6d2e"],_less:["\\E059","#519aba"],_less_light:["\\E059","#498ba7"],_license:["\\E05A","#cbcb41"],_license_1:["\\E05A","#e37933"],_license_1_light:["\\E05A","#cc6d2e"],_license_2:["\\E05A","#cc3e44"],_license_2_light:["\\E05A","#b8383d"],_license_light:["\\E05A","#b7b73b"],_liquid:["\\E05B","#8dc149"],_liquid_light:["\\E05B","#7fae42"],_livescript:["\\E05C","#519aba"],_livescript_light:["\\E05C","#498ba7"],_lock:["\\E05D","#8dc149"],_lock_light:["\\E05D","#7fae42"],_lua:["\\E05E","#519aba"],_lua_light:["\\E05E","#498ba7"],_makefile:["\\E05F","#e37933"],_makefile_1:["\\E05F","#a074c4"],_makefile_1_light:["\\E05F","#9068b0"],_makefile_2:["\\E05F","#6d8086"],_makefile_2_light:["\\E05F","#627379"],_makefile_3:["\\E05F","#519aba"],_makefile_3_light:["\\E05F","#498ba7"],_makefile_light:["\\E05F","#cc6d2e"],_markdown:["\\E060","#519aba"],_markdown_light:["\\E060","#498ba7"],_maven:["\\E061","#cc3e44"],_maven_light:["\\E061","#b8383d"],_mdo:["\\E062","#cc3e44"],_mdo_light:["\\E062","#b8383d"],_mustache:["\\E063","#e37933"],_mustache_light:["\\E063","#cc6d2e"],_nim:["\\E065","#cbcb41"],_nim_light:["\\E065","#b7b73b"],_notebook:["\\E066","#519aba"],_notebook_light:["\\E066","#498ba7"],_npm:["\\E067","#41535b"],_npm_1:["\\E067","#cc3e44"],_npm_1_light:["\\E067","#b8383d"],_npm_ignored:["\\E068","#41535b"],_npm_ignored_light:["\\E068","#3b4b52"],_npm_light:["\\E067","#3b4b52"],_nunjucks:["\\E069","#8dc149"],_nunjucks_light:["\\E069","#7fae42"],_ocaml:["\\E06A","#e37933"],_ocaml_light:["\\E06A","#cc6d2e"],_odata:["\\E06B","#e37933"],_odata_light:["\\E06B","#cc6d2e"],_pddl:["\\E06C","#a074c4"],_pddl_light:["\\E06C","#9068b0"],_pdf:["\\E06D","#cc3e44"],_pdf_light:["\\E06D","#b8383d"],_perl:["\\E06E","#519aba"],_perl_light:["\\E06E","#498ba7"],_photoshop:["\\E06F","#519aba"],_photoshop_light:["\\E06F","#498ba7"],_php:["\\E070","#a074c4"],_php_light:["\\E070","#9068b0"],_pipeline:["\\E071","#e37933"],_pipeline_light:["\\E071","#cc6d2e"],_plan:["\\E072","#8dc149"],_plan_light:["\\E072","#7fae42"],_platformio:["\\E073","#e37933"],_platformio_light:["\\E073","#cc6d2e"],_powershell:["\\E074","#519aba"],_powershell_light:["\\E074","#498ba7"],_prisma:["\\E075","#519aba"],_prisma_light:["\\E075","#498ba7"],_prolog:["\\E077","#e37933"],_prolog_light:["\\E077","#cc6d2e"],_pug:["\\E078","#cc3e44"],_pug_light:["\\E078","#b8383d"],_puppet:["\\E079","#cbcb41"],_puppet_light:["\\E079","#b7b73b"],_purescript:["\\E07A","#d4d7d6"],_purescript_light:["\\E07A","#bfc2c1"],_python:["\\E07B","#519aba"],_python_light:["\\E07B","#498ba7"],_R:["\\E001","#519aba"],_R_light:["\\E001","#498ba7"],_react:["\\E07D","#519aba"],_react_1:["\\E07D","#e37933"],_react_1_light:["\\E07D","#cc6d2e"],_react_light:["\\E07D","#498ba7"],_reasonml:["\\E07E","#cc3e44"],_reasonml_light:["\\E07E","#b8383d"],_rescript:["\\E07F","#cc3e44"],_rescript_1:["\\E07F","#f55385"],_rescript_1_light:["\\E07F","#dd4b78"],_rescript_light:["\\E07F","#b8383d"],_rollup:["\\E080","#cc3e44"],_rollup_light:["\\E080","#b8383d"],_ruby:["\\E081","#cc3e44"],_ruby_light:["\\E081","#b8383d"],_rust:["\\E082","#6d8086"],_rust_light:["\\E082","#627379"],_salesforce:["\\E083","#519aba"],_salesforce_light:["\\E083","#498ba7"],_sass:["\\E084","#f55385"],_sass_light:["\\E084","#dd4b78"],_sbt:["\\E085","#519aba"],_sbt_light:["\\E085","#498ba7"],_scala:["\\E086","#cc3e44"],_scala_light:["\\E086","#b8383d"],_shell:["\\E089","#8dc149"],_shell_light:["\\E089","#7fae42"],_slim:["\\E08A","#e37933"],_slim_light:["\\E08A","#cc6d2e"],_smarty:["\\E08B","#cbcb41"],_smarty_light:["\\E08B","#b7b73b"],_spring:["\\E08C","#8dc149"],_spring_light:["\\E08C","#7fae42"],_stylelint:["\\E08D","#d4d7d6"],_stylelint_1:["\\E08D","#4d5a5e"],_stylelint_1_light:["\\E08D","#455155"],_stylelint_light:["\\E08D","#bfc2c1"],_stylus:["\\E08E","#8dc149"],_stylus_light:["\\E08E","#7fae42"],_sublime:["\\E08F","#e37933"],_sublime_light:["\\E08F","#cc6d2e"],_svelte:["\\E090","#cc3e44"],_svelte_light:["\\E090","#b8383d"],_svg:["\\E091","#a074c4"],_svg_1:["\\E091","#519aba"],_svg_1_light:["\\E091","#498ba7"],_svg_light:["\\E091","#9068b0"],_swift:["\\E092","#e37933"],_swift_light:["\\E092","#cc6d2e"],_terraform:["\\E093","#a074c4"],_terraform_light:["\\E093","#9068b0"],_tex:["\\E094","#519aba"],_tex_1:["\\E094","#cbcb41"],_tex_1_light:["\\E094","#b7b73b"],_tex_2:["\\E094","#e37933"],_tex_2_light:["\\E094","#cc6d2e"],_tex_3:["\\E094","#d4d7d6"],_tex_3_light:["\\E094","#bfc2c1"],_tex_light:["\\E094","#498ba7"],_todo:["\\E096",""],_tsconfig:["\\E097","#519aba"],_tsconfig_light:["\\E097","#498ba7"],_twig:["\\E098","#8dc149"],_twig_light:["\\E098","#7fae42"],_typescript:["\\E099","#519aba"],_typescript_1:["\\E099","#e37933"],_typescript_1_light:["\\E099","#cc6d2e"],_typescript_light:["\\E099","#498ba7"],_vala:["\\E09A","#6d8086"],_vala_light:["\\E09A","#627379"],_video:["\\E09B","#f55385"],_video_light:["\\E09B","#dd4b78"],_vite:["\\E09C","#cbcb41"],_vite_light:["\\E09C","#b7b73b"],_vue:["\\E09D","#8dc149"],_vue_light:["\\E09D","#7fae42"],_wasm:["\\E09E","#a074c4"],_wasm_light:["\\E09E","#9068b0"],_wat:["\\E09F","#a074c4"],_wat_light:["\\E09F","#9068b0"],_webpack:["\\E0A0","#519aba"],_webpack_light:["\\E0A0","#498ba7"],_wgt:["\\E0A1","#519aba"],_wgt_light:["\\E0A1","#498ba7"],_windows:["\\E0A2","#519aba"],_windows_light:["\\E0A2","#498ba7"],_word:["\\E0A3","#519aba"],_word_light:["\\E0A3","#498ba7"],_xls:["\\E0A4","#8dc149"],_xls_light:["\\E0A4","#7fae42"],_xml:["\\E0A5","#e37933"],_xml_light:["\\E0A5","#cc6d2e"],_yarn:["\\E0A6","#519aba"],_yarn_light:["\\E0A6","#498ba7"],_yml:["\\E0A7","#a074c4"],_yml_light:["\\E0A7","#9068b0"],_zig:["\\E0A8","#e37933"],_zig_light:["\\E0A8","#cc6d2e"],_zip:["\\E0A9","#cc3e44"],_zip_1:["\\E0A9","#6d8086"],_zip_1_light:["\\E0A9","#627379"],_zip_light:["\\E0A9","#b8383d"]},aL={"babel.config.cjs":"_babel","babel.config.js":"_babel","babel.config.json":"_babel","bower.json":"_bower",build:"_bazel","build.bazel":"_bazel",changelog:"_clock","changelog.md":"_clock","changelog.txt":"_clock",changes:"_clock","changes.md":"_clock","changes.txt":"_clock","cmakelists.txt":"_makefile_3",compiling:"_license_1","compiling.md":"_license_1","compiling.txt":"_license_1",contributing:"_license_2","contributing.md":"_license_2","contributing.txt":"_license_2",copying:"_license","copying.md":"_license","copying.txt":"_license","docker-healthcheck":"_docker_2","eslint.config.js":"_eslint","firebase.json":"_firebase",geckodriver:"_firefox","gruntfile.babel.js":"_grunt","gruntfile.coffee":"_grunt","gruntfile.js":"_grunt",gulpfile:"_gulp","gulpfile.js":"_gulp","ionic.config.json":"_ionic","ionic.project":"_ionic",jenkinsfile:"_jenkins","karma.conf.cjs":"_karma","karma.conf.coffee":"_karma","karma.conf.js":"_karma","karma.conf.mjs":"_karma",licence:"_license","licence.md":"_license","licence.txt":"_license",license:"_license","license.md":"_license","license.txt":"_license","mime.types":"_config",mix:"_hex",mvnw:"_maven","npm-debug.log":"_npm_ignored",omakefile:"_makefile_2","platformio.ini":"_platformio","pom.xml":"_maven",procfile:"_heroku",qmakefile:"_makefile_1",readme:"_info","readme.md":"_info","readme.txt":"_info","rollup.config.js":"_rollup","sass-lint.yml":"_sass","stylelint.config.cjs":"_stylelint","stylelint.config.js":"_stylelint","stylelint.config.mjs":"_stylelint","swagger.json":"_json_1","swagger.yaml":"_json_1","swagger.yml":"_json_1",todo:"_todo","todo.md":"_todo","todo.txt":"_todo","tsconfig.json":"_tsconfig",version:"_clock","version.md":"_clock","version.txt":"_clock","vite.config.cjs":"_vite","vite.config.cts":"_vite","vite.config.js":"_vite","vite.config.mjs":"_vite","vite.config.mts":"_vite","vite.config.ts":"_vite","webpack.common.cjs":"_webpack","webpack.common.js":"_webpack","webpack.common.mjs":"_webpack","webpack.common.ts":"_webpack","webpack.config.build.cjs":"_webpack","webpack.config.build.js":"_webpack","webpack.config.build.mjs":"_webpack","webpack.config.build.ts":"_webpack","webpack.config.cjs":"_webpack","webpack.config.js":"_webpack","webpack.config.mjs":"_webpack","webpack.config.ts":"_webpack","webpack.dev.cjs":"_webpack","webpack.dev.js":"_webpack","webpack.dev.mjs":"_webpack","webpack.dev.ts":"_webpack","webpack.prod.cjs":"_webpack","webpack.prod.js":"_webpack","webpack.prod.mjs":"_webpack","webpack.prod.ts":"_webpack",workspace:"_bazel","workspace.bazel":"_bazel","yarn.clean":"_yarn","yarn.lock":"_yarn"},aF={"3dm":"_svg_1","3ds":"_svg_1",ad:"_argdown",ai:"_illustrator",apex:"_salesforce",argdown:"_argdown",article:"_go",asax:"_html_2",ascx:"_html_1",asm:"_asm",aspx:"_html",avi:"_video",avif:"_image",babelrc:"_babel","babelrc.cjs":"_babel","babelrc.js":"_babel",bazel:"_bazel",bazelignore:"_bazel",bazelrc:"_bazel_1",bazelversion:"_bazel",bicep:"_bicep",bowerrc:"_bower",bsl:"_bsl",build:"_bazel",bzl:"_bazel",cake:"_cake",cer:"_lock",cert:"_lock",cfc:"_coldfusion",cfm:"_coldfusion","cjs.map":"_javascript",cjsx:"_react",class:"_java_1",classpath:"_java",cls:"_salesforce",cmx:"_ocaml",cmxa:"_ocaml","codeclimate.yml":"_code-climate",component:"_html_3",config:"_config",cr:"_crystal",crt:"_lock",cson:"_json","css.map":"_css",csv:"_csv",ctp:"_cake_php",cuh:"_cu_1",d:"_d",dae:"_svg_1",direnv:"_config",doc:"_word",dockerignore:"_docker_1",docx:"_word",ds_store:"_ignored",dtx:"_tex_2",ecr:"_crystal_embedded",edn:"_clojure_1",ejs:"_ejs",elm:"_elm",eot:"_font",epp:"_puppet",erb:"_html_erb","erb.html":"_html_erb",es:"_javascript",es5:"_javascript",es7:"_javascript",eslintignore:"_eslint_1",eslintrc:"_eslint","eslintrc.cjs":"_eslint","eslintrc.js":"_eslint","eslintrc.json":"_eslint","eslintrc.yaml":"_eslint","eslintrc.yml":"_eslint",ex:"_elixir",exs:"_elixir_script",firebaserc:"_firebase",flac:"_audio",gd:"_godot",gif:"_image",gitattributes:"_git",gitconfig:"_git","github-issues":"_github",gitkeep:"_git","gitlab-ci.yml":"_gitlab",gitmodules:"_git",godot:"_godot_1",gql:"_graphql",gradle:"_gradle",graphql:"_graphql",graphqls:"_graphql",gsp:"_grails",h:"_c_1","h++":"_cpp_1",hack:"_hacklang",haml:"_haml",happenings:"_happenings",hh:"_cpp_1",hpp:"_cpp_1",hs:"_haskell",htaccess:"_config","html.erb":"_html_erb",hu:"_cu_1",hx:"_haxe",hxml:"_haxe_3",hxp:"_haxe_2",hxs:"_haxe_1",hxx:"_cpp_1",ico:"_favicon",ins:"_tex_3",ipynb:"_notebook",jade:"_jade",jar:"_zip",jinja:"_jinja",jinja2:"_jinja",jpeg:"_image",jpg:"_image","js.map":"_javascript",jscsrc:"_javascript_2",jshintrc:"_javascript_2",key:"_lock",kt:"_kotlin",kts:"_kotlin",lhs:"_haskell",liquid:"_liquid",litcoffee:"_coffee",ls:"_livescript",master:"_html_2",mdo:"_mdo","mjs.map":"_javascript",ml:"_ocaml",mli:"_ocaml",mov:"_video",mp3:"_audio",mp4:"_video",mpg:"_video",mustache:"_mustache",nim:"_nim",nims:"_nim",nj:"_nunjucks",njk:"_nunjucks",njs:"_nunjucks","npm-debug.log":"_npm",npmignore:"_npm_1",npmrc:"_npm_1",nunj:"_nunjucks",nunjs:"_nunjucks",nunjucks:"_nunjucks",obj:"_svg_1",odata:"_odata",ogg:"_audio",ogv:"_video",otf:"_font",pddl:"_pddl",pdf:"_pdf",pem:"_lock","php.inc":"_php",pipeline:"_pipeline",plan:"_plan",png:"_image",pp:"_puppet",prisma:"_prisma",pro:"_prolog",psd:"_photoshop",purs:"_purescript",pxm:"_image",r:"_R",re:"_reasonml",res:"_rescript",resi:"_rescript_1",rmd:"_R",s:"_asm",sass:"_sass",sbt:"_sbt",scala:"_scala",slang:"_crystal_embedded",slide:"_go",slim:"_slim",slugignore:"_config","smarty.tpl":"_smarty",sol:"_ethereum",soql:"_db_1","spec.cjs":"_javascript_1","spec.js":"_javascript_1","spec.jsx":"_react_1","spec.mjs":"_javascript_1","spec.ts":"_typescript_1","spec.tsx":"_react_1",springbeans:"_spring",sss:"_css",stache:"_mustache",static:"_config",stl:"_svg_1",styl:"_stylus",stylelintignore:"_stylelint_1",stylelintrc:"_stylelint","stylelintrc.js":"_stylelint","stylelintrc.json":"_stylelint","stylelintrc.yaml":"_stylelint","stylelintrc.yml":"_stylelint","sublime-project":"_sublime","sublime-workspace":"_sublime",svelte:"_svelte",svg:"_svg",svgx:"_image","test.cjs":"_javascript_1","test.js":"_javascript_1","test.jsx":"_react_1","test.mjs":"_javascript_1","test.ts":"_typescript_1","test.tsx":"_react_1",tf:"_terraform","tf.json":"_terraform",tfvars:"_terraform","tfvars.json":"_terraform",tiff:"_image",tmp:"_clock_1",toml:"_config",tpl:"_smarty",tres:"_godot_2",tscn:"_godot_3",ttf:"_font",twig:"_twig",vala:"_vala",vapi:"_vala",vue:"_vue",wasm:"_wasm",wat:"_wat",wav:"_audio",webm:"_video",webp:"_image",wgt:"_wgt",woff:"_font",woff2:"_font",workspace:"_bazel",xls:"_xls",xlsx:"_xls",zig:"_zig",zip:"_zip_1"},aN={argdown:"_argdown",bat:"_windows",bicep:"_bicep",blade:"_php",c:"_c",chatagent:"_markdown",clojure:"_clojure",coffeescript:"_coffee",cpp:"_cpp",csharp:"_c-sharp",css:"_css","cuda-cpp":"_cu",dart:"_dart","django-html":"_html_3",dockercompose:"_docker_3",dockerfile:"_docker",dotenv:"_config",elixir:"_elixir",elm:"_elm",erb:"_html_erb",fsharp:"_f-sharp","git-commit":"_git","github-issues":"_github",go:"_go2",godot:"_godot",gradle:"_gradle",groovy:"_grails",haml:"_haml",handlebars:"_mustache",haskell:"_haskell",haxe:"_haxe",html:"_html_3",ignore:"_git",instructions:"_markdown",jade:"_pug",java:"_java",javascript:"_javascript",javascriptreact:"_react",jinja:"_jinja",json:"_json",jsonc:"_json",jsonl:"_json",julia:"_julia",kotlin:"_kotlin",latex:"_tex",less:"_less",lua:"_lua",makefile:"_makefile",markdown:"_markdown",mustache:"_mustache",nunjucks:"_nunjucks","objective-c":"_c_2","objective-cpp":"_cpp_2",ocaml:"_ocaml",perl:"_perl",php:"_php",postcss:"_css",powershell:"_powershell",prompt:"_markdown",properties:"_config",python:"_python",r:"_R",razor:"_html",rescript:"_rescript",ruby:"_ruby",rust:"_rust",sass:"_sass",scss:"_sass","search-result":"_code-search",shellscript:"_shell",skill:"_markdown",sql:"_db",stylus:"_stylus",swift:"_swift",terraform:"_terraform",tex:"_tex_1",todo:"_todo",typescript:"_typescript",typescriptreact:"_react",vala:"_vala",vue:"_vue",xml:"_xml",yaml:"_yml"},aq={"babel.config.cjs":"_babel_light","babel.config.js":"_babel_light","babel.config.json":"_babel_light","bower.json":"_bower_light",build:"_bazel_light","build.bazel":"_bazel_light",changelog:"_clock_light","changelog.md":"_clock_light","changelog.txt":"_clock_light",changes:"_clock_light","changes.md":"_clock_light","changes.txt":"_clock_light","cmakelists.txt":"_makefile_3_light",compiling:"_license_1_light","compiling.md":"_license_1_light","compiling.txt":"_license_1_light",contributing:"_license_2_light","contributing.md":"_license_2_light","contributing.txt":"_license_2_light",copying:"_license_light","copying.md":"_license_light","copying.txt":"_license_light","docker-healthcheck":"_docker_2_light","eslint.config.js":"_eslint_light","firebase.json":"_firebase_light",geckodriver:"_firefox_light","gruntfile.babel.js":"_grunt_light","gruntfile.coffee":"_grunt_light","gruntfile.js":"_grunt_light",gulpfile:"_gulp_light","gulpfile.js":"_gulp_light","ionic.config.json":"_ionic_light","ionic.project":"_ionic_light",jenkinsfile:"_jenkins_light","karma.conf.cjs":"_karma_light","karma.conf.coffee":"_karma_light","karma.conf.js":"_karma_light","karma.conf.mjs":"_karma_light",licence:"_license_light","licence.md":"_license_light","licence.txt":"_license_light",license:"_license_light","license.md":"_license_light","license.txt":"_license_light","mime.types":"_config_light",mix:"_hex_light",mvnw:"_maven_light","npm-debug.log":"_npm_ignored_light",omakefile:"_makefile_2_light","platformio.ini":"_platformio_light","pom.xml":"_maven_light",procfile:"_heroku_light",qmakefile:"_makefile_1_light",readme:"_info_light","readme.md":"_info_light","readme.txt":"_info_light","rollup.config.js":"_rollup_light","sass-lint.yml":"_sass_light","stylelint.config.cjs":"_stylelint_light","stylelint.config.js":"_stylelint_light","stylelint.config.mjs":"_stylelint_light","swagger.json":"_json_1_light","swagger.yaml":"_json_1_light","swagger.yml":"_json_1_light","tsconfig.json":"_tsconfig_light",version:"_clock_light","version.md":"_clock_light","version.txt":"_clock_light","vite.config.cjs":"_vite_light","vite.config.cts":"_vite_light","vite.config.js":"_vite_light","vite.config.mjs":"_vite_light","vite.config.mts":"_vite_light","vite.config.ts":"_vite_light","webpack.common.cjs":"_webpack_light","webpack.common.js":"_webpack_light","webpack.common.mjs":"_webpack_light","webpack.common.ts":"_webpack_light","webpack.config.build.cjs":"_webpack_light","webpack.config.build.js":"_webpack_light","webpack.config.build.mjs":"_webpack_light","webpack.config.build.ts":"_webpack_light","webpack.config.cjs":"_webpack_light","webpack.config.js":"_webpack_light","webpack.config.mjs":"_webpack_light","webpack.config.ts":"_webpack_light","webpack.dev.cjs":"_webpack_light","webpack.dev.js":"_webpack_light","webpack.dev.mjs":"_webpack_light","webpack.dev.ts":"_webpack_light","webpack.prod.cjs":"_webpack_light","webpack.prod.js":"_webpack_light","webpack.prod.mjs":"_webpack_light","webpack.prod.ts":"_webpack_light",workspace:"_bazel_light","workspace.bazel":"_bazel_light","yarn.clean":"_yarn_light","yarn.lock":"_yarn_light"},aU={"3dm":"_svg_1_light","3ds":"_svg_1_light",ad:"_argdown_light",ai:"_illustrator_light",apex:"_salesforce_light",argdown:"_argdown_light",article:"_go_light",asax:"_html_2_light",ascx:"_html_1_light",asm:"_asm_light",aspx:"_html_light",avi:"_video_light",avif:"_image_light",babelrc:"_babel_light","babelrc.cjs":"_babel_light","babelrc.js":"_babel_light",bazel:"_bazel_light",bazelignore:"_bazel_light",bazelrc:"_bazel_1_light",bazelversion:"_bazel_light",bicep:"_bicep_light",bowerrc:"_bower_light",bsl:"_bsl_light",build:"_bazel_light",bzl:"_bazel_light",cake:"_cake_light",cer:"_lock_light",cert:"_lock_light",cfc:"_coldfusion_light",cfm:"_coldfusion_light","cjs.map":"_javascript_light",cjsx:"_react_light",class:"_java_1_light",classpath:"_java_light",cls:"_salesforce_light",cmx:"_ocaml_light",cmxa:"_ocaml_light","codeclimate.yml":"_code-climate_light",component:"_html_3_light",config:"_config_light",cr:"_crystal_light",crt:"_lock_light",cson:"_json_light","css.map":"_css_light",csv:"_csv_light",ctp:"_cake_php_light",cuh:"_cu_1_light",d:"_d_light",dae:"_svg_1_light",direnv:"_config_light",doc:"_word_light",dockerignore:"_docker_1_light",docx:"_word_light",ds_store:"_ignored_light",dtx:"_tex_2_light",ecr:"_crystal_embedded_light",edn:"_clojure_1_light",ejs:"_ejs_light",elm:"_elm_light",eot:"_font_light",epp:"_puppet_light",erb:"_html_erb_light","erb.html":"_html_erb_light",es:"_javascript_light",es5:"_javascript_light",es7:"_javascript_light",eslintignore:"_eslint_1_light",eslintrc:"_eslint_light","eslintrc.cjs":"_eslint_light","eslintrc.js":"_eslint_light","eslintrc.json":"_eslint_light","eslintrc.yaml":"_eslint_light","eslintrc.yml":"_eslint_light",ex:"_elixir_light",exs:"_elixir_script_light",firebaserc:"_firebase_light",flac:"_audio_light",gd:"_godot_light",gif:"_image_light",gitattributes:"_git_light",gitconfig:"_git_light","github-issues":"_github_light",gitkeep:"_git_light","gitlab-ci.yml":"_gitlab_light",gitmodules:"_git_light",godot:"_godot_1_light",gql:"_graphql_light",gradle:"_gradle_light",graphql:"_graphql_light",graphqls:"_graphql_light",gsp:"_grails_light",h:"_c_1_light","h++":"_cpp_1_light",hack:"_hacklang_light",haml:"_haml_light",happenings:"_happenings_light",hh:"_cpp_1_light",hpp:"_cpp_1_light",hs:"_haskell_light",htaccess:"_config_light","html.erb":"_html_erb_light",hu:"_cu_1_light",hx:"_haxe_light",hxml:"_haxe_3_light",hxp:"_haxe_2_light",hxs:"_haxe_1_light",hxx:"_cpp_1_light",ico:"_favicon_light",ins:"_tex_3_light",ipynb:"_notebook_light",jade:"_jade_light",jar:"_zip_light",jinja:"_jinja_light",jinja2:"_jinja_light",jpeg:"_image_light",jpg:"_image_light","js.map":"_javascript_light",jscsrc:"_javascript_2_light",jshintrc:"_javascript_2_light",key:"_lock_light",kt:"_kotlin_light",kts:"_kotlin_light",lhs:"_haskell_light",liquid:"_liquid_light",litcoffee:"_coffee_light",ls:"_livescript_light",master:"_html_2_light",mdo:"_mdo_light","mjs.map":"_javascript_light",ml:"_ocaml_light",mli:"_ocaml_light",mov:"_video_light",mp3:"_audio_light",mp4:"_video_light",mpg:"_video_light",mustache:"_mustache_light",nim:"_nim_light",nims:"_nim_light",nj:"_nunjucks_light",njk:"_nunjucks_light",njs:"_nunjucks_light","npm-debug.log":"_npm_light",npmignore:"_npm_1_light",npmrc:"_npm_1_light",nunj:"_nunjucks_light",nunjs:"_nunjucks_light",nunjucks:"_nunjucks_light",obj:"_svg_1_light",odata:"_odata_light",ogg:"_audio_light",ogv:"_video_light",otf:"_font_light",pddl:"_pddl_light",pdf:"_pdf_light",pem:"_lock_light","php.inc":"_php_light",pipeline:"_pipeline_light",plan:"_plan_light",png:"_image_light",pp:"_puppet_light",prisma:"_prisma_light",pro:"_prolog_light",psd:"_photoshop_light",purs:"_purescript_light",pxm:"_image_light",r:"_R_light",re:"_reasonml_light",res:"_rescript_light",resi:"_rescript_1_light",rmd:"_R_light",s:"_asm_light",sass:"_sass_light",sbt:"_sbt_light",scala:"_scala_light",slang:"_crystal_embedded_light",slide:"_go_light",slim:"_slim_light",slugignore:"_config_light","smarty.tpl":"_smarty_light",sol:"_ethereum_light",soql:"_db_1_light","spec.cjs":"_javascript_1_light","spec.js":"_javascript_1_light","spec.jsx":"_react_1_light","spec.mjs":"_javascript_1_light","spec.ts":"_typescript_1_light","spec.tsx":"_react_1_light",springbeans:"_spring_light",sss:"_css_light",stache:"_mustache_light",static:"_config_light",stl:"_svg_1_light",styl:"_stylus_light",stylelintignore:"_stylelint_1_light",stylelintrc:"_stylelint_light","stylelintrc.js":"_stylelint_light","stylelintrc.json":"_stylelint_light","stylelintrc.yaml":"_stylelint_light","stylelintrc.yml":"_stylelint_light","sublime-project":"_sublime_light","sublime-workspace":"_sublime_light",svelte:"_svelte_light",svg:"_svg_light",svgx:"_image_light","test.cjs":"_javascript_1_light","test.js":"_javascript_1_light","test.jsx":"_react_1_light","test.mjs":"_javascript_1_light","test.ts":"_typescript_1_light","test.tsx":"_react_1_light",tf:"_terraform_light","tf.json":"_terraform_light",tfvars:"_terraform_light","tfvars.json":"_terraform_light",tiff:"_image_light",tmp:"_clock_1_light",toml:"_config_light",tpl:"_smarty_light",tres:"_godot_2_light",tscn:"_godot_3_light",ttf:"_font_light",twig:"_twig_light",vala:"_vala_light",vapi:"_vala_light",vue:"_vue_light",wasm:"_wasm_light",wat:"_wat_light",wav:"_audio_light",webm:"_video_light",webp:"_image_light",wgt:"_wgt_light",woff:"_font_light",woff2:"_font_light",workspace:"_bazel_light",xls:"_xls_light",xlsx:"_xls_light",zig:"_zig_light",zip:"_zip_1_light"},aW={argdown:"_argdown_light",bat:"_windows_light",bicep:"_bicep_light",blade:"_php_light",c:"_c_light",chatagent:"_markdown_light",clojure:"_clojure_light",coffeescript:"_coffee_light",cpp:"_cpp_light",csharp:"_c-sharp_light",css:"_css_light","cuda-cpp":"_cu_light",dart:"_dart_light","django-html":"_html_3_light",dockercompose:"_docker_3_light",dockerfile:"_docker_light",dotenv:"_config_light",elixir:"_elixir_light",elm:"_elm_light",erb:"_html_erb_light",fsharp:"_f-sharp_light","git-commit":"_git_light","github-issues":"_github_light",go:"_go2_light",godot:"_godot_light",gradle:"_gradle_light",groovy:"_grails_light",haml:"_haml_light",handlebars:"_mustache_light",haskell:"_haskell_light",haxe:"_haxe_light",html:"_html_3_light",ignore:"_git_light",instructions:"_markdown_light",jade:"_pug_light",java:"_java_light",javascript:"_javascript_light",javascriptreact:"_react_light",jinja:"_jinja_light",json:"_json_light",jsonc:"_json_light",jsonl:"_json_light",julia:"_julia_light",kotlin:"_kotlin_light",latex:"_tex_light",less:"_less_light",lua:"_lua_light",makefile:"_makefile_light",markdown:"_markdown_light",mustache:"_mustache_light",nunjucks:"_nunjucks_light","objective-c":"_c_2_light","objective-cpp":"_cpp_2_light",ocaml:"_ocaml_light",perl:"_perl_light",php:"_php_light",postcss:"_css_light",powershell:"_powershell_light",prompt:"_markdown_light",properties:"_config_light",python:"_python_light",r:"_R_light",razor:"_html_light",rescript:"_rescript_light",ruby:"_ruby_light",rust:"_rust_light",sass:"_sass_light",scss:"_sass_light","search-result":"_code-search_light",shellscript:"_shell_light",skill:"_markdown_light",sql:"_db_light",stylus:"_stylus_light",swift:"_swift_light",terraform:"_terraform_light",tex:"_tex_1_light",typescript:"_typescript_light",typescriptreact:"_react_light",vala:"_vala_light",vue:"_vue_light",xml:"_xml_light",yaml:"_yml_light"},aH="_default_light",aV={".bash":"shellscript",".bat":"bat",".c":"c",".cc":"cpp",".cjs":"javascript",".clj":"clojure",".cljc":"clojure",".cljs":"clojure",".cmd":"bat",".coffee":"coffeescript",".cpp":"cpp",".cs":"csharp",".cshtml":"razor",".css":"css",".cu":"cuda-cpp",".cxx":"cpp",".dart":"dart",".dockerfile":"dockerfile",".fs":"fsharp",".fsx":"fsharp",".gitignore":"ignore",".go":"go",".gradle":"groovy",".groovy":"groovy",".h":"c",".handlebars":"handlebars",".hbs":"handlebars",".hpp":"cpp",".htm":"html",".html":"html",".java":"java",".jl":"julia",".js":"javascript",".json":"json",".jsonc":"jsonc",".jsx":"javascriptreact",".kt":"kotlin",".kts":"kotlin",".less":"less",".lua":"lua",".m":"objective-c",".makefile":"makefile",".markdown":"markdown",".md":"markdown",".mjs":"javascript",".mk":"makefile",".mm":"objective-cpp",".npmignore":"ignore",".php":"php",".pl":"perl",".pm":"perl",".properties":"properties",".ps1":"powershell",".psm1":"powershell",".py":"python",".r":"r",".rb":"ruby",".rs":"rust",".sass":"scss",".scss":"scss",".sh":"shellscript",".sql":"sql",".swift":"swift",".tex":"latex",".ts":"typescript",".tsx":"typescriptreact",".xml":"xml",".xsd":"xml",".xsl":"xml",".yaml":"yaml",".yml":"yaml",".zsh":"shellscript"};function aK(e){let t=aD[e];if(null!=t)return{character:t[0],color:t[1]}}var aG=Object.defineProperty,aZ=Object.getOwnPropertyDescriptor,aY=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?aZ(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&aG(t,i,s),s};let aX=class extends lit_element_i{render(){if(null==this.filename)return e$;let e=document.body.classList.contains("vscode-light")||document.body.classList.contains("vscode-high-contrast-light"),t=function(e,t=!1){let i=e.toLowerCase(),o=(t?aq:aL)[i];if(null!=o)return aK(o);let r=t?aU:aF,s=i.indexOf(".");for(;-1!==s&&s<i.length-1;){if(null!=(o=r[i.substring(s+1)]))return aK(o);s=i.indexOf(".",s+1)}let a=i.lastIndexOf(".");if(-1!==a){let e=aV[i.substring(a)];if(null!=e&&null!=(o=(t?aW:aN)[e]))return aK(o)}return aK(t&&aH?aH:"_default")}(this.filename,e);return null==t?e$:ex`<span class="font-icon" style=${aO({color:t.color||"inherit"})}
			>${function(e){if(1===e.length)return e;let t=/^\\+(?:u)?([0-9a-fA-F]{4,6})$/.exec(e);return null!=t?String.fromCodePoint(parseInt(t[1],16)):e}(t.character)}</span
		>`}};aX.styles=j`
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
	`,aY([ej()],aX.prototype,"filename",2),aX=aY([eM("gl-file-icon")],aX);var aJ=Object.defineProperty,aQ=Object.getOwnPropertyDescriptor,a0=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?aQ(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&aJ(t,i,s),s};let a1=class extends lit_element_i{get statusName(){return this.status?nE[this.status]??"Unknown":""}updated(e){super.updated(e),e.has("status")&&(this.statusName?this.setAttribute("title",this.statusName):this.removeAttribute("title"),this.status?.length===2?this.setAttribute("conflict",""):this.removeAttribute("conflict"))}renderIgnored(){return ex`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#969696"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM10 4l-6.01 6.01 1.06 1.061 6.01-6.01L10 4z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderUntracked(){return ex`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3.942-3.942l7.5-7.5.884.884-.664.664c.95.655 1.65 1.524 2.222 2.394-1.15 1.75-2.824 3.5-6 3.5-.696 0-1.32-.084-1.882-.234l-1.176 1.176-.884-.884zm5.188-3.42l1.629-1.629c.634.393 1.147.913 1.594 1.491C10.99 8.767 9.692 9.75 7.5 9.75c-.287 0-.56-.017-.817-.05l.455-.454a1.5 1.5 0 0 0 1.608-1.608zM7.362 6.254L5.754 7.862a1.5 1.5 0 0 1 1.608-1.608zm.955-.955A6.595 6.595 0 0 0 7.5 5.25c-2.192 0-3.49.982-4.469 2.25.447.578.96 1.098 1.594 1.491l-.903.903C2.772 9.239 2.072 8.369 1.5 7.5 2.65 5.75 4.324 4 7.5 4c.696 0 1.32.084 1.882.234L8.317 5.299z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderAdded(){return ex`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#388A34"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm.75-6.75h3v-1.5h-3v-3h-1.5v3h-3v1.5h3v3h1.5v-3z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderDeleted(){return ex`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#9E121D"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-6.75v-1.5h-7.5v1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderModified(){return ex`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#1B80B2"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-9.5V7h-3v2.5h-1.5V7h-3V5.5h3v-3h1.5v3h3zm0 5V12h-7.5v-1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderRenamed(){return ex`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#C63"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.25 4.5v1.25h1.25l1 1v2.5l-1 1H9.25v1.25H10v1.25H7V11.5h.75v-1.25H4l-1-1v-2.5l1-1h3.75V4.5H7V3.25h3V4.5h-.75zm-5 2.5h3.5v2h-3.5V7zm5 0v2h1V7h-1z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderCopied(){return ex`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#692C77"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM6.964 3.75L5.893 4.813v.53h1.071v-.53h3.215v4.25h-.536v1.062h.536l1.071-1.063v-4.25L10.179 3.75H6.964zM3.75 6.938l1.071-1.063h3.215l1.071 1.063v4.25L8.036 12.25H4.82L3.75 11.187v-4.25zm1.071 0v4.25h3.215v-4.25H4.82z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderConflictGlyphs(e,t,i,o,r,s){return ex`
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 22 16">
				<path d="M3 0H10V16H3C1.35 16 0 14.65 0 13V3C0 1.35 1.35 0 3 0Z" fill="${e}" />
				<path d="M12 0H19C20.65 0 22 1.35 22 3V13C22 14.65 20.65 16 19 16H12V0Z" fill="${o}" />
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
					${r}
				</text>
			</svg>
		`}renderConflictUU(){let e="var(--gl-git-status-conflict-modified, #c4a000)";return this.renderConflictGlyphs(e,"±","#000",e,"±","#000")}renderConflictAA(){let e="var(--gl-git-status-added)";return this.renderConflictGlyphs(e,"+","#fff",e,"+","#fff")}renderConflictDD(){let e="var(--gl-git-status-deleted)";return this.renderConflictGlyphs(e,"−","#fff",e,"−","#fff")}renderConflictDU(){return this.renderConflictGlyphs("var(--gl-git-status-deleted)","−","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUD(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-deleted)","−","#fff")}renderConflictAU(){return this.renderConflictGlyphs("var(--gl-git-status-added)","+","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUA(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-added)","+","#fff")}renderUnknown(){return ex`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.19 2.822c-.439-.215-.97-.322-1.596-.322-1.25 0-2.282.478-3.094 1.435l1.05.798c.275-.331.579-.574.91-.728.331-.154.66-.231.987-.231.415 0 .76.093 1.036.28.275.182.413.448.413.798 0 .275-.082.509-.245.7-.159.187-.36.364-.602.532a9.506 9.506 0 0 0-.728.56 2.66 2.66 0 0 0-.602.763c-.159.299-.238.679-.238 1.141v.483h1.498v-.413c0-.364.086-.663.259-.896a2.76 2.76 0 0 1 .637-.616c.252-.177.504-.362.756-.553.257-.196.471-.436.644-.721.173-.285.259-.651.259-1.099 0-.387-.114-.749-.343-1.085-.229-.34-.562-.616-1.001-.826zm-1.169 7.917a1.024 1.024 0 0 0-.763-.315c-.294 0-.544.105-.749.315-.2.205-.301.453-.301.742 0 .294.1.546.301.756.205.205.455.308.749.308.303 0 .558-.103.763-.308.205-.21.308-.462.308-.756 0-.29-.103-.537-.308-.742z"
					clip-rule="evenodd"
				/>
			</svg>
		`}render(){switch(this.status){case"!":return this.renderIgnored();case"?":return this.renderUntracked();case"A":return this.renderAdded();case"D":return this.renderDeleted();case"M":case"T":case"U":return this.renderModified();case"R":return this.renderRenamed();case"C":return this.renderCopied();case"AA":return this.renderConflictAA();case"AU":return this.renderConflictAU();case"UA":return this.renderConflictUA();case"DD":return this.renderConflictDD();case"DU":return this.renderConflictDU();case"UD":return this.renderConflictUD();case"UU":return this.renderConflictUU()}return this.renderUnknown()}};function a2(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}a1.styles=[j`
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
		`],a0([ej()],a1.prototype,"status",2),a0([eO()],a1.prototype,"statusName",1),a1=a0([eM("gl-git-status")],a1);var a5=a2(),a3={exec:()=>null};function a4(e){let t=[];return i=>{let o=Math.max(0,Math.min(3,i-1)),r=t[o];return r||(r=e(o),t[o]=r),r}}function a6(e,t=""){let i="string"==typeof e?e:e.source,o={replace:(e,t)=>{let r="string"==typeof t?t:t.source;return r=r.replace(a8.caret,"$1"),i=i.replace(e,r),o},getRegex:()=>new RegExp(i,t)};return o}var a7=((e="")=>{try{return!!RegExp("(?<=1)(?<!1)"+e)}catch{return!1}})(),a8={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:a4(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:a4(e=>RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:a4(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:a4(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:a4(e=>RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:a4(e=>RegExp(`^ {0,${e}}>`))},a9=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,le=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,lt=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,li=a6(lt).replace(/bull/g,le).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),lo=a6(lt).replace(/bull/g,le).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),lr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ls=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ln=a6(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ls).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),la=a6(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,le).getRegex(),ll="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,lh=a6("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lc).replace("tag",ll).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ld=a6(lr).replace("hr",a9).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ll).getRegex(),lp={blockquote:a6(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ld).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:ln,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:a9,html:lh,lheading:li,list:la,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:ld,table:a3,text:/^[^\n]+/},lu=a6("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",a9).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ll).getRegex(),lg={...lp,lheading:lo,table:lu,paragraph:a6(lr).replace("hr",a9).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",lu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ll).getRegex()},lm={...lp,html:a6("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",lc).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:a3,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:a6(lr).replace("hr",a9).replace("heading",` *#{1,6} *[^
]`).replace("lheading",li).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lf=/^( {2,}|\\)\n(?!\s*$)/,lb=/[\p{P}\p{S}]/u,lv=/[\s\p{P}\p{S}]/u,l_=/[^\s\p{P}\p{S}]/u,ly=a6(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,lv).getRegex(),lw=/(?!~)[\p{P}\p{S}]/u,lx=a6(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",a7?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),lk=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,lC=a6(lk,"u").replace(/punct/g,lb).getRegex(),l$=a6(lk,"u").replace(/punct/g,lw).getRegex(),lS="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",lE=a6(lS,"gu").replace(/notPunctSpace/g,l_).replace(/punctSpace/g,lv).replace(/punct/g,lb).getRegex(),lA=a6(lS,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,lw).getRegex(),lI=a6("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,l_).replace(/punctSpace/g,lv).replace(/punct/g,lb).getRegex(),lP=a6(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,lb).getRegex(),lz=a6("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,l_).replace(/punctSpace/g,lv).replace(/punct/g,lb).getRegex(),lT=a6(/\\(punct)/,"gu").replace(/punct/g,lb).getRegex(),lR=a6(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),lM=a6(lc).replace("(?:--\x3e|$)","--\x3e").getRegex(),lB=a6("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",lM).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),lj=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,lO=a6(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",lj).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),lD=a6(/^!?\[(label)\]\[(ref)\]/).replace("label",lj).replace("ref",ls).getRegex(),lL=a6(/^!?\[(ref)\](?:\[\])?/).replace("ref",ls).getRegex(),lF=a6("reflink|nolink(?!\\()","g").replace("reflink",lD).replace("nolink",lL).getRegex(),lN=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,lq={_backpedal:a3,anyPunctuation:lT,autolink:lR,blockSkip:lx,br:lf,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:a3,delLDelim:a3,delRDelim:a3,emStrongLDelim:lC,emStrongRDelimAst:lE,emStrongRDelimUnd:lI,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:lO,nolink:lL,punctuation:ly,reflink:lD,reflinkSearch:lF,tag:lB,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:a3},lU={...lq,link:a6(/^!?\[(label)\]\((.*?)\)/).replace("label",lj).getRegex(),reflink:a6(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",lj).getRegex()},lW={...lq,emStrongRDelimAst:lA,emStrongLDelim:l$,delLDelim:lP,delRDelim:lz,url:a6(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",lN).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:a6(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",lN).getRegex()},lH={...lW,br:a6(lf).replace("{2,}","*").getRegex(),text:a6(lW.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},lV={normal:lp,gfm:lg,pedantic:lm},lK={normal:lq,gfm:lW,breaks:lH,pedantic:lU},lG={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},lZ=e=>lG[e];function lY(e,t){if(t){if(a8.escapeTest.test(e))return e.replace(a8.escapeReplace,lZ)}else if(a8.escapeTestNoEncode.test(e))return e.replace(a8.escapeReplaceNoEncode,lZ);return e}function lX(e){try{e=encodeURI(e).replace(a8.percentDecode,"%")}catch{return null}return e}function lJ(e,t){let i=e.replace(a8.findPipe,(e,t,i)=>{let o=!1,r=t;for(;--r>=0&&"\\"===i[r];)o=!o;return o?"|":" |"}).split(a8.splitPipe),o=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;o<i.length;o++)i[o]=i[o].trim().replace(a8.slashPipe,"|");return i}function lQ(e,t,i){let o=e.length;if(0===o)return"";let r=0;for(;r<o;){let s=e.charAt(o-r-1);if(s!==t||i)if(s!==t&&i)r++;else break;else r++}return e.slice(0,o-r)}function l0(e){let t=e.split(`
`),i=t.length-1;for(;i>=0&&a8.blankLine.test(t[i]);)i--;return t.length-i<=2?e:t.slice(0,i+1).join(`
`)}function l1(e,t,i,o,r){let s=t.href,a=t.title||null,c=e[1].replace(r.other.outputLinkReplace,"$1");o.state.inLink=!0;let h={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:s,title:a,text:c,tokens:o.inlineTokens(c)};return o.state.inLink=!1,h}var l2=class{options;rules;lexer;constructor(e){this.options=e||a5}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:l0(t[0]),i=e.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e,codeBlockStyle:"indented",text:i}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let o=e.match(i.other.indentCodeCompensation);if(null===o)return t;let r=o[1];return t.split(`
`).map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[o]=t;return o.length>=r.length?e.slice(r.length):e}).join(`
`)}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=lQ(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:lQ(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:lQ(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=lQ(t[0],`
`).split(`
`),i="",o="",r=[];for(;e.length>0;){let t=!1,s=[],a;for(a=0;a<e.length;a++)if(this.rules.other.blockquoteStart.test(e[a]))s.push(e[a]),t=!0;else if(t)break;else s.push(e[a]);e=e.slice(a);let c=s.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,o=o?`${o}
${h}`:h;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,r,!0),this.lexer.state.top=p,0===e.length)break;let u=r.at(-1);if(u?.type==="code")break;if(u?.type==="blockquote"){let t=u.raw+`
`+e.join(`
`),s=this.blockquote(t);r[r.length-1]=s,i=i.substring(0,i.length-u.raw.length)+s.raw,o=o.substring(0,o.length-u.text.length)+s.text;break}if(u?.type==="list"){let t=u.raw+`
`+e.join(`
`),s=this.list(t);r[r.length-1]=s,i=i.substring(0,i.length-u.raw.length)+s.raw,o=o.substring(0,o.length-u.raw.length)+s.raw,e=t.substring(r.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:r,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),o=i.length>1,r={type:"list",raw:"",ordered:o,start:o?+i.slice(0,-1):"",loose:!1,items:[]};i=o?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=o?i:"[*+-]");let s=this.rules.other.listItemRegex(i),a=!1;for(;e;){let i=!1,o="",c="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;o=t[0],e=e.substring(o.length);let h=function(e,t=0){let i=t,o="";for(let t of e)if("	"===t){let e=4-i%4;o+=" ".repeat(e),i+=e}else o+=t,i++;return o}(t[2].split(`
`,1)[0],t[1].length),p=e.split(`
`,1)[0],u=!h.trim(),g=0;if(this.options.pedantic?(g=2,c=h.trimStart()):u?g=t[1].length+1:(g=(g=h.search(this.rules.other.nonSpaceChar))>4?1:g,c=h.slice(g),g+=t[1].length),u&&this.rules.other.blankLine.test(p)&&(o+=p+`
`,e=e.substring(p.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(g),i=this.rules.other.hrRegex(g),r=this.rules.other.fencesBeginRegex(g),s=this.rules.other.headingBeginRegex(g),a=this.rules.other.htmlBeginRegex(g),m=this.rules.other.blockquoteBeginRegex(g);for(;e;){let f=e.split(`
`,1)[0],b;if(p=f,b=this.options.pedantic?p=p.replace(this.rules.other.listReplaceNesting,"  "):p.replace(this.rules.other.tabCharGlobal,"    "),r.test(p)||s.test(p)||a.test(p)||m.test(p)||t.test(p)||i.test(p))break;if(b.search(this.rules.other.nonSpaceChar)>=g||!p.trim())c+=`
`+b.slice(g);else{if(u||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||r.test(h)||s.test(h)||i.test(h))break;c+=`
`+p}u=!p.trim(),o+=f+`
`,e=e.substring(f.length+1),h=b.slice(g)}}r.loose||(a?r.loose=!0:this.rules.other.doubleBlankLine.test(o)&&(a=!0)),r.items.push({type:"list_item",raw:o,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),r.raw+=o}let c=r.items.at(-1);if(!c)return;for(let e of(c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd(),r.raw=r.raw.trimEnd(),r.items)){this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]);let t=e.tokens[0];if(e.task&&(t?.type==="text"||t?.type==="paragraph")){e.text=e.text.replace(this.rules.other.listReplaceTask,""),t.raw=t.raw.replace(this.rules.other.listReplaceTask,""),t.text=t.text.replace(this.rules.other.listReplaceTask,"");for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,"");break}let i=this.rules.other.listTaskCheckbox.exec(e.raw);if(i){let t={type:"checkbox",raw:i[0]+" ",checked:"[ ]"!==i[0]};e.checked=t.checked,r.loose?e.tokens[0]&&["paragraph","text"].includes(e.tokens[0].type)&&"tokens"in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:"paragraph",raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&(e.task=!1);if(!r.loose){let t=e.tokens.filter(e=>"space"===e.type);r.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(r.loose)for(let e of r.items)for(let t of(e.loose=!0,e.tokens))"text"===t.type&&(t.type="paragraph");return r}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=l0(t[0]);return{type:"html",block:!0,raw:e,pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:lQ(t[0],`
`),href:i,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=lJ(t[1]),o=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:lQ(t[0],`
`),header:[],align:[],rows:[]};if(i.length===o.length){for(let e of o)this.rules.other.tableAlignRight.test(e)?s.align.push("right"):this.rules.other.tableAlignCenter.test(e)?s.align.push("center"):this.rules.other.tableAlignLeft.test(e)?s.align.push("left"):s.align.push(null);for(let e=0;e<i.length;e++)s.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:s.align[e]});for(let e of r)s.rows.push(lJ(e,s.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:s.align[t]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:"heading",raw:lQ(t[0],`
`),depth:"="===t[2].charAt(0)?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=lQ(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e){if(-1===e.indexOf(")"))return -1;let t=0;for(let i=0;i<e.length;i++)if("\\"===e[i])i++;else if("("===e[i])t++;else if(")"===e[i]&&--t<0)return i;return t>0?-2:-1}(t[2]);if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],o="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],o=e[3])}else o=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),l1(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return l1(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let o=this.rules.inline.emStrongLDelim.exec(e);if(!(!o||!o[1]&&!o[2]&&!o[3]&&!o[4]||o[4]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!(o[1]||o[3])||!i||this.rules.inline.punctuation.exec(i))){let i=[...o[0]].length-1,r,s,a=i,c=0,h="*"===o[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+i);null!==(o=h.exec(t));){if(!(r=o[1]||o[2]||o[3]||o[4]||o[5]||o[6]))continue;if(s=[...r].length,o[3]||o[4]){a+=s;continue}if((o[5]||o[6])&&i%3&&!((i+s)%3)){c+=s;continue}if((a-=s)>0)continue;s=Math.min(s,s+a+c);let t=[...o[0]][0].length,h=e.slice(0,i+o.index+t+s);if(Math.min(i,s)%2){let e=h.slice(1,-1);return{type:"em",raw:h,text:e,tokens:this.lexer.inlineTokens(e)}}let p=h.slice(2,-2);return{type:"strong",raw:h,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),o=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&o&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,i=""){let o=this.rules.inline.delLDelim.exec(e);if(o&&(!o[1]||!i||this.rules.inline.punctuation.exec(i))){let i=[...o[0]].length-1,r,s,a=i,c=this.rules.inline.delRDelim;for(c.lastIndex=0,t=t.slice(-1*e.length+i);null!==(o=c.exec(t));){if(!(r=o[1]||o[2]||o[3]||o[4]||o[5]||o[6])||(s=[...r].length)!==i)continue;if(o[3]||o[4]){a+=s;continue}if((a-=s)>0)continue;s=Math.min(s,s+a);let t=[...o[0]][0].length,c=e.slice(0,i+o.index+t+s),h=c.slice(i,-i);return{type:"del",raw:c,text:h,tokens:this.lexer.inlineTokens(h)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return i="@"===t[2]?"mailto:"+(e=t[1]):e=t[1],{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])i="mailto:"+(e=t[0]);else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0])e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},l5=class l{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||a5,this.options.tokenizer=this.options.tokenizer||new l2,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:a8,block:lV.normal,inline:lK.normal};this.options.pedantic?(t.block=lV.pedantic,t.inline=lK.pedantic):this.options.gfm&&(t.block=lV.gfm,this.options.breaks?t.inline=lK.breaks:t.inline=lK.gfm),this.tokenizer.rules=t}static get rules(){return{block:lV,inline:lK}}static lex(e,t){return new l(t).lex(e)}static lexInline(e,t){return new l(t).inlineTokens(e)}lex(e){e=e.replace(a8.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(a8.tabCharGlobal,"    ").replace(a8.spaceLine,""));let o=1/0;for(;e;){let r;if(e.length<o)o=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}if(this.options.extensions?.block?.some(i=>!!(r=i.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let i=t.at(-1);1===r.raw.length&&void 0!==i?i.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if((r=this.tokenizer.fences(e))||(r=this.tokenizer.heading(e))||(r=this.tokenizer.hr(e))||(r=this.tokenizer.blockquote(e))||(r=this.tokenizer.list(e))||(r=this.tokenizer.html(e))){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if((r=this.tokenizer.table(e))||(r=this.tokenizer.lheading(e))){e=e.substring(r.raw.length),t.push(r);continue}let s=e;if(this.options.extensions?.startBlock){let t=1/0,i=e.slice(1),o;this.options.extensions.startBlock.forEach(e=>{"number"==typeof(o=e.call({lexer:this},i))&&o>=0&&(t=Math.min(t,o))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(this.state.top&&(r=this.tokenizer.paragraph(s))){let o=t.at(-1);i&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+r.raw,o.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):t.push(r),i=s.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i;this.tokenizer.lexer=this;let o=e,r=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!==(r=this.tokenizer.rules.inline.reflinkSearch.exec(o));)e.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!==(r=this.tokenizer.rules.inline.anyPunctuation.exec(o));)o=o.slice(0,r.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!==(r=this.tokenizer.rules.inline.blockSkip.exec(o));)i=r[2]?r[2].length:0,o=o.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);o=this.options.hooks?.emStrongMask?.call({lexer:this},o)??o;let s=!1,a="",c=1/0;for(;e;){let i;if(e.length<c)c=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}if(s||(a=""),s=!1,this.options.extensions?.inline?.some(o=>!!(i=o.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if((i=this.tokenizer.escape(e))||(i=this.tokenizer.tag(e))||(i=this.tokenizer.link(e))){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let o=t.at(-1);"text"===i.type&&o?.type==="text"?(o.raw+=i.raw,o.text+=i.text):t.push(i);continue}if((i=this.tokenizer.emStrong(e,o,a))||(i=this.tokenizer.codespan(e))||(i=this.tokenizer.br(e))||(i=this.tokenizer.del(e,o,a))||(i=this.tokenizer.autolink(e))||!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let r=e;if(this.options.extensions?.startInline){let t=1/0,i=e.slice(1),o;this.options.extensions.startInline.forEach(e=>{"number"==typeof(o=e.call({lexer:this},i))&&o>=0&&(t=Math.min(t,o))}),t<1/0&&t>=0&&(r=e.substring(0,t+1))}if(i=this.tokenizer.inlineText(r)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(a=i.raw.slice(-1)),s=!0;let o=t.at(-1);o?.type==="text"?(o.raw+=i.raw,o.text+=i.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){if(this.options.silent);else throw Error("Infinite loop on byte: "+e)}},l3=class{options;parser;constructor(e){this.options=e||a5}space(e){return""}code({text:e,lang:t,escaped:i}){let o=(t||"").match(a8.notSpaceStart)?.[0],r=e.replace(a8.endingNewline,"")+`
`;return o?'<pre><code class="language-'+lY(o)+'">'+(i?r:lY(r,!0))+`</code></pre>
`:"<pre><code>"+(i?r:lY(r,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,i=e.start,o="";for(let t=0;t<e.items.length;t++){let i=e.items[t];o+=this.listitem(i)}let r=t?"ol":"ul";return"<"+r+(t&&1!==i?' start="'+i+'"':"")+`>
`+o+"</"+r+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let o="";for(let t=0;t<e.rows.length;t++){let r=e.rows[t];i="";for(let e=0;e<r.length;e++)i+=this.tablecell(r[e]);o+=this.tablerow({text:i})}return o&&(o=`<tbody>${o}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+o+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${lY(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let o=this.parser.parseInline(i),r=lX(e);if(null===r)return o;let s='<a href="'+(e=r)+'"';return t&&(s+=' title="'+lY(t)+'"'),s+=">"+o+"</a>"}image({href:e,title:t,text:i,tokens:o}){o&&(i=this.parser.parseInline(o,this.parser.textRenderer));let r=lX(e);if(null===r)return lY(i);e=r;let s=`<img src="${e}" alt="${lY(i)}"`;return t&&(s+=` title="${lY(t)}"`),s+=">"}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:lY(e.text)}},l4=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},l6=class l{options;renderer;textRenderer;constructor(e){this.options=e||a5,this.options.renderer=this.options.renderer||new l3,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new l4}static parse(e,t){return new l(t).parse(e)}static parseInline(e,t){return new l(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let i=0;i<e.length;i++){let o=e[i];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){t+=e||"";continue}}switch(o.type){case"space":t+=this.renderer.space(o);break;case"hr":t+=this.renderer.hr(o);break;case"heading":t+=this.renderer.heading(o);break;case"code":t+=this.renderer.code(o);break;case"table":t+=this.renderer.table(o);break;case"blockquote":t+=this.renderer.blockquote(o);break;case"list":t+=this.renderer.list(o);break;case"checkbox":t+=this.renderer.checkbox(o);break;case"html":t+=this.renderer.html(o);break;case"def":t+=this.renderer.def(o);break;case"paragraph":t+=this.renderer.paragraph(o);break;case"text":t+=this.renderer.text(o);break;default:{let e='Token with "'+o.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let i="";for(let o=0;o<e.length;o++){let r=e[o];if(this.options.extensions?.renderers?.[r.type]){let e=this.options.extensions.renderers[r.type].call({parser:this},r);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=e||"";continue}}switch(r.type){case"escape":case"text":i+=t.text(r);break;case"html":i+=t.html(r);break;case"link":i+=t.link(r);break;case"image":i+=t.image(r);break;case"checkbox":i+=t.checkbox(r);break;case"strong":i+=t.strong(r);break;case"em":i+=t.em(r);break;case"codespan":i+=t.codespan(r);break;case"br":i+=t.br(r);break;case"del":i+=t.del(r);break;default:{let e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return i}},l7=class{options;block;constructor(e){this.options=e||a5}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?l5.lex:l5.lexInline}provideParser(e=this.block){return e?l6.parse:l6.parseInline}},l8=class{defaults=a2();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=l6;Renderer=l3;TextRenderer=l4;Lexer=l5;Tokenizer=l2;Hooks=l7;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let o of e)switch(i=i.concat(t.call(this,o)),o.type){case"table":for(let e of o.header)i=i.concat(this.walkTokens(e.tokens,t));for(let e of o.rows)for(let o of e)i=i.concat(this.walkTokens(o.tokens,t));break;case"list":i=i.concat(this.walkTokens(o.items,t));break;default:{let e=o;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(o=>{let r=e[o].flat(1/0);i=i.concat(this.walkTokens(r,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];i?t.renderers[e.name]=function(...t){let o=e.renderer.apply(this,t);return!1===o&&(o=i.apply(this,t)),o}:t.renderers[e.name]=e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new l3(this.defaults);for(let i in e.renderer){if(!(i in t))throw Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=e.renderer[i],r=t[i];t[i]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=r.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new l2(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=e.tokenizer[i],r=t[i];t[i]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=r.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new l7;for(let i in e.hooks){if(!(i in t))throw Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=e.hooks[i],r=t[i];l7.passThroughHooks.has(i)?t[i]=e=>{if(this.defaults.async&&l7.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await o.call(t,e);return r.call(t,i)})();let s=o.call(t,e);return r.call(t,s)}:t[i]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await o.apply(t,e);return!1===i&&(i=await r.apply(t,e)),i})();let i=o.apply(t,e);return!1===i&&(i=r.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,o=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(o.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return l5.lex(e,t??this.defaults)}parser(e,t){return l6.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let o={...i},r={...this.defaults,...o},s=this.onError(!!r.silent,!!r.async);if(!0===this.defaults.async&&!1===o.async)return s(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return s(Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return s(Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=e),r.async)return(async()=>{let i=r.hooks?await r.hooks.preprocess(t):t,o=await (r.hooks?await r.hooks.provideLexer(e):e?l5.lex:l5.lexInline)(i,r),s=r.hooks?await r.hooks.processAllTokens(o):o;r.walkTokens&&await Promise.all(this.walkTokens(s,r.walkTokens));let a=await (r.hooks?await r.hooks.provideParser(e):e?l6.parse:l6.parseInline)(s,r);return r.hooks?await r.hooks.postprocess(a):a})().catch(s);try{r.hooks&&(t=r.hooks.preprocess(t));let i=(r.hooks?r.hooks.provideLexer(e):e?l5.lex:l5.lexInline)(t,r);r.hooks&&(i=r.hooks.processAllTokens(i)),r.walkTokens&&this.walkTokens(i,r.walkTokens);let o=(r.hooks?r.hooks.provideParser(e):e?l6.parse:l6.parseInline)(i,r);return r.hooks&&(o=r.hooks.postprocess(o)),o}catch(e){return s(e)}}}onError(e,t){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e="<p>An error occurred:</p><pre>"+lY(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},l9=new l8;function ce(e,t){return l9.parse(e,t)}ce.options=ce.setOptions=function(e){return l9.setOptions(e),ce.defaults=l9.defaults,a5=ce.defaults,ce},ce.getDefaults=a2,ce.defaults=a5,ce.use=function(...e){return l9.use(...e),ce.defaults=l9.defaults,a5=ce.defaults,ce},ce.walkTokens=function(e,t){return l9.walkTokens(e,t)},ce.parseInline=l9.parseInline,ce.Parser=l6,ce.parser=l6.parse,ce.Renderer=l3,ce.TextRenderer=l4,ce.Lexer=l5,ce.lexer=l5.lex,ce.Tokenizer=l2,ce.Hooks=l7,ce.parse=ce,ce.options,ce.setOptions,ce.use,ce.walkTokens,ce.parseInline,l6.parse,l5.lex;let ct=/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi,ci=/\s*!important\s*$/i;function co(e){return e.includes("style")?e.replace(ct," data-gl-style=$1"):e}var cr=Object.defineProperty,cs=Object.getOwnPropertyDescriptor,cn=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?cs(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&cr(t,i,s),s};let ca=class extends lit_element_i{constructor(){super(...arguments),this.markdown="",this.density="compact",this.inline=!1}render(){return ex`${this.markdown?this.renderMarkdown(this.markdown):""}`}updated(e){for(let t of(super.updated(e),this.renderRoot.querySelectorAll("[data-gl-style]"))){let e=t.dataset.glStyle;e&&function(e,t){for(let i of t.split(";")){let t=i.indexOf(":");if(-1===t)continue;let o=i.slice(0,t).trim();if(!o)continue;let r=i.slice(t+1).trim();if(!r)continue;let s="";ci.test(r)&&(r=r.replace(ci,""),s="important"),e.style.setProperty(o,r,s)}}(t,e),t.removeAttribute("data-gl-style")}}renderMarkdown(e){let t,i,o,r;return this.inline?(m??=new l8({breaks:!1,gfm:!0,renderer:(i=0,o=!1,{blockquote:function({tokens:e}){return this.parser.parse(e)},code:function({text:e}){return`<code>${ch(e)}</code>`},codespan:function({text:e}){return`<code>${ch(e)}</code>`},heading:function({tokens:e}){return this.parser.parseInline(e)},hr:function(){return""},image:function({text:e}){return e||""},link:function({tokens:e}){return this.parser.parseInline(e)},list:function(e){o=e.ordered,i="number"==typeof e.start?e.start:1;let t="";for(let i of e.items)t+=r.call(this,i);return t},listitem:r=function(e){let t,r=this.parser.parse(e.tokens);return e.task?t=e.checked?"☑":"☐":o?(t=`${i}.`,i++):t="•",`${t} ${r.trim()} `},paragraph:function({tokens:e}){return this.parser.parseInline(e)},table:function(){return""},br:function(){return" "},html:function(){return""}})}),t=cv(t=m.parse(cb(e),{async:!1})),ex`<span>${rn(co(t))}</span>`):(f??=new l8({breaks:!0,gfm:!0,renderer:{image:function({href:e,title:t,text:i}){let o=[],r=[];return e&&({href:e,dimensions:o}=function(e){let t=[],i=e.split("|").map(e=>e.trim());e=i[0];let o=i[1];if(o){let e=/height=(\d+)/.exec(o),i=/width=(\d+)/.exec(o),r=e?e[1]:"",s=i?i[1]:"",a=isFinite(parseInt(s)),c=isFinite(parseInt(r));a&&t.push(`width="${s}"`),c&&t.push(`height="${r}"`)}return{href:e,dimensions:t}}(e),r.push(`src="${cy(e)}"`)),i&&r.push(`alt="${cy(i)}"`),t&&r.push(`title="${cy(t)}"`),o.length&&(r=[...r,...o]),`<img ${r.join(" ")}>`},codespan:function({text:e}){return`<code>${ch(e)}</code>`},paragraph:function({tokens:e}){let t=this.parser.parseInline(e);return`<p>${t}</p>`},html:function({text:e}){return e.match(/^(<span[^>]+>)|(<\/\s*span>)$/)?e:""}}}),rn(co(t=cv(t=f.parse(cb(e),{async:!1})))))}};ca.styles=[ni,j`
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
=		`],cn([ej({type:String})],ca.prototype,"markdown",2),cn([ej({type:String,reflect:!0})],ca.prototype,"density",2),cn([ej({type:Boolean,reflect:!0})],ca.prototype,"inline",2),ca=cn([eM("gl-markdown")],ca);let cl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},cc=e=>cl[e];function ch(e,t){if(t){if(/[&<>"']/.test(e))return e.replace(/[&<>"']/g,cc)}else if(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/.test(e))return e.replace(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,cc);return e}let cd="[A-Za-z0-9-]+",cp="~[A-Za-z]+",cu=RegExp(`^(${cd})(${cp})?$`),cg=RegExp(`\\$\\(${cd}(?:${cp})?\\)`,"g"),cm=RegExp(`\\\\${cg.source}`,"g"),cf=RegExp(`(\\\\)?\\$\\((${cd}(?:${cp})?)\\)`,"g");function cb(e){return e.replace(cm,e=>`\\${e}`)}function cv(e){let t,i,o=[],r=0;for(;null!==(t=cf.exec(e));){r<(i=t.index||0)&&o.push(e.substring(r,i)),r=(t.index||0)+t[0].length;let[,s,a]=t;o.push(s?`$(${a})`:function(e){let[,t,i]=cu.exec(e.id)??[void 0,"error",void 0];return t.startsWith("gitlens-")&&(t=`gl-${t.substring(8)}`),`<code-icon icon="${t}"${i?` modifier="${i}"`:""}></code-icon>`}({id:a}))}return r<e.length&&o.push(e.substring(r)),o.join("")}let c_=/"/g;function cy(e){return e.replace(c_,"&quot;")}j`
		:host {
			display: block;
			height: 100%;
		}
	`;let cw=[rd,j`
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
	`];var cx=Object.defineProperty,ck=Object.getOwnPropertyDescriptor,cC=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?ck(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&cx(t,i,s),s};let c$=class extends GlElement{constructor(){super(...arguments),this.branch=!1,this.expanded=!0,this.path="",this.level=0,this.size=1,this.position=1,this.checkable=!1,this.checked=!1,this.controlledCheck=!1,this.controlledSelection=!1,this.disableCheck=!1,this._modifiers=new ModifierKeysController(this),this.showIcon=!0,this.draggableItem=!1,this.rich=!1,this.matched=!1,this.tabIndex=-1,this.selected=!1,this.focused=!1,this.onComponentClick=e=>{this.selectCore({dblClick:!1,altKey:e.altKey})},this.onDragStart=e=>{this.draggableItem&&!this.branch&&null!=e.dataTransfer&&(e.dataTransfer.setData("application/x-gitlens-file-path",this.path),e.dataTransfer.effectAllowed="move")},this._checkboxClickAlt=!1}get isHidden(){return!1===this.parentExpanded||!this.branch&&!this.expanded}connectedCallback(){super.connectedCallback?.(),this.addEventListener("click",this.onComponentClick),this.addEventListener("dragstart",this.onDragStart)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("click",this.onComponentClick),this.removeEventListener("dragstart",this.onDragStart)}onChevronClick(e){e.stopPropagation(),this.emit("gl-tree-item-toggle")}updateAttrs(e,t=!1){(e.has("expanded")||e.has("branch")||t)&&(this.branch?this.setAttribute("aria-expanded",this.expanded.toString()):this.removeAttribute("aria-expanded")),(e.has("parentExpanded")||t)&&this.setAttribute("aria-hidden",this.isHidden.toString()),(e.has("selected")||t)&&this.setAttribute("aria-selected",this.selected.toString()),(e.has("size")||t)&&this.setAttribute("aria-setsize",this.size.toString()),(e.has("position")||t)&&this.setAttribute("aria-posinset",this.position.toString()),(e.has("level")||t)&&this.setAttribute("aria-level",this.level.toString()),(e.has("draggableItem")||e.has("branch")||t)&&(this.draggable=this.draggableItem&&!this.branch)}firstUpdated(){this.role="treeitem"}updated(e){this.updateAttrs(e)}renderBranching(){let e=this.level-1;if(e<1&&!this.branch)return e$;let t=[];if(e>0)for(let i=0;i<e;i++)t.push(ex`<span class="node node--connector"><code-icon name="blank"></code-icon></span>`);return this.branch&&t.push(ex`<code-icon
					class="branch"
					icon="${this.expanded?"chevron-down":"chevron-right"}"
					@click=${this.onChevronClick}
				></code-icon>`),t}renderCheckbox(){if(!this.checkable)return e$;let e=ex`<span
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
		></span>`,t=this.getEffectiveCheckboxTooltip();return t?ex`<gl-tooltip placement="right" content=${t}>${e}</gl-tooltip>`:e}getEffectiveCheckboxTooltip(){let e=this.checkableTooltip,t=this.checkableAltTooltip;return t?e?this._modifiers.altKey?t:`${e}
[${ne()}] ${t}`:t:e}renderActions(){return ex`<action-nav class="actions" part="actions"><slot name="actions"></slot></action-nav>`}renderBefore(){return ex`<slot name="decorations-before" class="decorations-before"></slot>`}renderAfter(){return ex`<slot name="decorations-after" class="decorations-after"></slot>`}render(){return ex`
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
				${s3(this.showIcon,()=>ex`<slot name="icon" class="icon"></slot>`)}
				<span class="text" part="text">
					<slot class="main" part="main"></slot>
					<slot name="description" class="description"></slot>
				</span>
			</button>
			${this.renderBefore()}${this.renderActions()}${this.renderAfter()}
		`}selectCore(e,t=!1){this.emit("gl-tree-item-select"),this.controlledSelection||(this.selected=!0),t||window.requestAnimationFrame(()=>{this.emit("gl-tree-item-selected",{node:this,dblClick:e?.dblClick??!1,altKey:e?.altKey??!1,ctrlKey:e?.ctrlKey??!1,metaKey:e?.metaKey??!1,shiftKey:e?.shiftKey??!1})})}select(){this.selectCore(void 0,!0)}deselect(){this.selected=!1}focus(){this.buttonEl.focus()}focusCheckbox(){let e=this.checkboxEl;return null!=e&&!e.disabled&&(e.focus(),!0)}onButtonClick(e){e.stopPropagation(),this.selectCore({dblClick:!1,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey,shiftKey:e.shiftKey})}onButtonDblClick(e){e.stopPropagation(),this.selectCore({dblClick:!0,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey})}onButtonContextMenu(e){e.preventDefault(),e.stopPropagation();let t=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey});this.dispatchEvent(t)}onCheckboxClick(e){e.stopPropagation(),this._checkboxClickAlt=e.altKey}onCheckboxChange(e){e.preventDefault(),e.stopPropagation();let t=e.target.checked,i=this._checkboxClickAlt||this._modifiers.altKey;"indeterminate"===this.checked&&i&&(t=!1,e.target.checked=!1),this._checkboxClickAlt=!1,this.controlledCheck?e.target.checked=!0===this.checked:this.checked=t,this.emit("gl-tree-item-checked",{node:this,checked:t})}onCheckboxMouseEnter(){this.emit("gl-tree-item-suspend-tooltip")}onCheckboxMouseLeave(){this.emit("gl-tree-item-resume-tooltip")}};c$.styles=cw,cC([ej({type:Boolean})],c$.prototype,"branch",2),cC([ej({type:Boolean})],c$.prototype,"expanded",2),cC([ej({type:String})],c$.prototype,"path",2),cC([ej({type:String,attribute:"parent-path"})],c$.prototype,"parentPath",2),cC([ej({type:Boolean,attribute:"parent-expanded"})],c$.prototype,"parentExpanded",2),cC([ej({type:Number})],c$.prototype,"level",2),cC([ej({type:Number})],c$.prototype,"size",2),cC([ej({type:Number})],c$.prototype,"position",2),cC([ej({type:Boolean})],c$.prototype,"checkable",2),cC([ej()],c$.prototype,"checked",2),cC([ej({type:Boolean})],c$.prototype,"controlledCheck",2),cC([ej({type:Boolean})],c$.prototype,"controlledSelection",2),cC([ej({type:Boolean,reflect:!0,attribute:"disable-check"})],c$.prototype,"disableCheck",2),cC([ej({attribute:"checkable-tooltip"})],c$.prototype,"checkableTooltip",2),cC([ej({attribute:"checkable-alt-tooltip"})],c$.prototype,"checkableAltTooltip",2),cC([ej({type:Boolean})],c$.prototype,"showIcon",2),cC([ej({type:Boolean,attribute:"draggable-item"})],c$.prototype,"draggableItem",2),cC([ej({type:Boolean,reflect:!0})],c$.prototype,"rich",2),cC([ej({type:Boolean,reflect:!0})],c$.prototype,"matched",2),cC([ej({type:Number})],c$.prototype,"tabIndex",2),cC([ej({type:String,attribute:"data-vscode-context",reflect:!0})],c$.prototype,"vscodeContext",2),cC([eO()],c$.prototype,"selected",2),cC([ej({type:Boolean,reflect:!0})],c$.prototype,"focused",2),cC([eL("#button")],c$.prototype,"buttonEl",2),cC([eL("#checkbox")],c$.prototype,"checkboxEl",2),c$=cC([eM("gl-tree-item")],c$);var cS=Object.defineProperty,cE=Object.getOwnPropertyDescriptor,cA=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?cE(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&cS(t,i,s),s};let cI=/^[a-zA-Z0-9\s\-_.]$/,cP=class extends GlElement{constructor(){super(...arguments),this.treeItems=void 0,this.filtered=!1,this.filterable=!1,this.filterPlaceholder="Filter...",this.searchBoxFilter=!0,this.dimUnmatched=!1,this.emptyText="No items",this.tooltipAnchorRight=!1,this._filter=new FilterController(this,{debounceMs:150,applyMatch:e=>{0===e.length?(this.filtered=!1,null!=this._model&&function e(t){for(let i of t)i.matched=!1,null!=i.children&&e(i.children)}(this._model)):(this.filtered=!0,null!=this._model&&cR(this._model,[...e]))},onApplied:()=>this.rebuildFlattenedTree()}),this.ariaLabel="Tree",this.virtualizerRef=at(),this.scrollableRef=at(),this._actionButtonHasFocus=!1,this._collection=new VirtualCollectionController(this,{getItems:()=>this.treeItems,getItemId:e=>cz(e),isSelectable:e=>!1===e.branch,mode:()=>this.multiSelectable?"multi":"single",focusStrategy:"activedescendant",getVirtualizer:()=>this.virtualizerRef.value,getContainer:()=>this.scrollableRef.value,onSelectionChange:()=>{this.requestUpdate(),this.multiSelectable&&this.emitSelectionChanged()},onActivate:e=>{let t=this._index.itemFor(e);null!=t&&this.handleItemActivation(t)},onUnhandledKey:e=>this.handleTreeKey(e)}),this._hoverOpen=!1,this._typeAheadBuffer="",this._typeAheadTimeout=800,this._nodeMap=new Map,this.multiSelectable=!1,this.draggableFiles=!1,this._virtualAnchorRect={x:0,y:0,top:0,bottom:0,left:0,right:0,width:0,height:0},this._virtualAnchor={getBoundingClientRect:()=>this._virtualAnchorRect},this.dismissRowTooltip=()=>{clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},this.handleContainerFocus=()=>{this._focusedItemPath||(this._lastSelectedPath?(this._focusedItemPath=this._lastSelectedPath,this._focusedItemIndex=this.getItemIndex(this._lastSelectedPath)):this.treeItems?.length&&(this._focusedItemPath=cz(this.treeItems[0]),this._focusedItemIndex=0),this.requestUpdate())},this.handleFocusIn=e=>{let t=e.target;("GL-ACTION-CHIP"===t.tagName?t:t.closest("gl-action-chip"))&&(this._actionButtonHasFocus=!0)},this.handleFocusOut=e=>{let t=e.target,i=e.relatedTarget,o="GL-ACTION-CHIP"===t.tagName?t:t.closest("gl-action-chip"),r=i?.tagName==="GL-ACTION-CHIP"?i:i?.closest("gl-action-chip");o&&!r&&(this._actionButtonHasFocus=!1)},this.handleKeydown=e=>{if("Tab"!==e.key)return;let t=e.composedPath(),i=t.some(e=>"GL-ACTION-CHIP"===e.tagName),o=t.some(e=>"INPUT"===e.tagName&&e.classList?.contains("checkbox__input"));if(!i&&!o)return;e.preventDefault(),e.stopPropagation();let r=t.find(e=>"GL-TREE-ITEM"===e.tagName);if(o){if(e.shiftKey)this.scrollableRef.value?.focus();else{let e=r?.querySelector("gl-action-chip");e?e.focus():this.exitTreeForward()}return}e.shiftKey?r?.focusCheckbox()||this.scrollableRef.value?.focus():this.exitTreeForward()},this.handleContainerKeydown=e=>{if(this.treeItems?.length&&!this._actionButtonHasFocus){if("Tab"===e.key&&!e.shiftKey){let t=this.getFocusedTreeItemElement();if(t){if(t.focusCheckbox()){e.preventDefault(),e.stopPropagation();return}let i=t.querySelector("gl-action-chip");i&&(e.preventDefault(),e.stopPropagation(),i.focus())}return}if("ArrowUp"===e.key&&this.filterable&&0>=this.getCurrentFocusedIndex()){let t=this.renderRoot.querySelector(".filter-input");if(null!=t){e.preventDefault(),e.stopPropagation(),t.focus(),t.select();return}}if(" "===e.key){if(e.composedPath().some(e=>"INPUT"===e.tagName&&e.classList?.contains("checkbox__input")))return;let t=this.treeItems[this.getCurrentFocusedIndex()];if(t?.branch){e.preventDefault(),e.stopPropagation(),this.handleItemActivation(t);return}}this._collection.handleKeydown(e)&&(e.preventDefault(),e.stopPropagation())}},this.handleFilterInput=e=>{let t=e.target.value;this.dispatchEvent(new CustomEvent("gl-tree-filter-changed",{detail:t,bubbles:!0,composed:!0})),this._filter.setQuery(t,{debounce:!0})},this.handleFilterFocus=()=>{!this._focusedItemPath&&this.treeItems?.length&&(this._focusedItemPath=cz(this.treeItems[0]),this._focusedItemIndex=0)},this.handleFilterKeydown=e=>{if(!this.treeItems?.length)return;let t=this.getCurrentFocusedIndex(),i=t,o=!1;switch(e.key){case"ArrowDown":i=t<0?0:Math.min(t+1,this.treeItems.length-1),o=!0;break;case"ArrowUp":i=t<=0?0:t-1,o=!0;break;case"Home":i=0,o=!0;break;case"End":i=this.treeItems.length-1,o=!0;break;case"Enter":{e.preventDefault(),e.stopPropagation();let i=this.treeItems[t]??this.treeItems[0];this.handleItemActivation(i);return}}o&&(e.preventDefault(),e.stopPropagation(),this.setActiveDescendant(i))},this.toggleSearchBoxFilter=()=>{this.searchBoxFilter=!this.searchBoxFilter,this.dispatchEvent(new CustomEvent("gl-tree-search-box-filter-changed",{detail:this.searchBoxFilter,bubbles:!0,composed:!0})),this.filtered&&this.rebuildFlattenedTree()}}get filterText(){return this._filter.query}set filterText(e){let t=this._filter.query;t!==e&&(this._filter.setQuery(e),this.requestUpdate("filterText",t))}get _lastSelectedPath(){return this._selection.anchorId}set _lastSelectedPath(e){this.multiSelectable||(null==e?this._selection.clear():this._selection.setSingle(e))}get _focusedItemPath(){return this._focus.focusedId}set _focusedItemPath(e){this._focus.setFocusedId(e)}get _focusedItemIndex(){return this._focus.focusedIndex}set _focusedItemIndex(e){this._focus.setFocusedIndex(e)}get _index(){return this._collection.index}get _scroll(){return this._collection.scroll}get _selection(){return this._collection.selection}get _focus(){return this._collection.focus}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.handleKeydown,{capture:!0}),this.addEventListener("focusin",this.handleFocusIn,{capture:!0}),this.addEventListener("focusout",this.handleFocusOut,{capture:!0}),this.addEventListener("mousedown",this.dismissRowTooltip,{capture:!0})}focus(e){if(this.filterable){let t=this.renderRoot.querySelector(".filter-input");if(null!=t)return void t.focus(e)}this.scrollableRef.value?.focus(e)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("keydown",this.handleKeydown,{capture:!0}),this.removeEventListener("focusin",this.handleFocusIn,{capture:!0}),this.removeEventListener("focusout",this.handleFocusOut,{capture:!0}),this.removeEventListener("mousedown",this.dismissRowTooltip,{capture:!0}),this._typeAheadTimer&&(clearTimeout(this._typeAheadTimer),this._typeAheadTimer=void 0),this._typeAheadBuffer=""}set model(e){let t;if(this._model!==e){if(this._model=e,this._filter.terms.length>0&&null!=this._model&&cR(this._model,[...this._filter.terms]),this._nodeMap.clear(),null!=this._model){let e=this._model.length,i=this.filtered&&this.searchBoxFilter&&!this.dimUnmatched;t=[];for(let o=0;o<e;o++)cT(this._model[o],e,o+1,void 0,this._nodeMap,i,t)}if(this.treeItems=t,this.buildPathToIndexMap(),this.focusedPath&&(this._focusedItemPath=this.focusedPath,this._lastSelectedPath=this.focusedPath),this._focusedItemPath){let e=this._index.indexOf(this._focusedItemPath);if(-1!==e)this._focusedItemIndex=e;else{if(this.treeItems?.length){let e=Math.min(this._focusedItemIndex,this.treeItems.length-1);this._focusedItemPath=cz(this.treeItems[Math.max(0,e)]),this._focusedItemIndex=Math.max(0,e)}else this._focusedItemPath=void 0,this._focusedItemIndex=-1;this._lastSelectedPath&&!this._index.has(this._lastSelectedPath)&&(this._lastSelectedPath=this._focusedItemPath)}}else this.treeItems?.length&&(this._focusedItemPath=cz(this.treeItems[0]),this._focusedItemIndex=0)}}get model(){return this._model}willUpdate(e){if((e.has("filtered")||e.has("searchBoxFilter")||e.has("dimUnmatched"))&&null!=this._model&&this.rebuildFlattenedTree(),this.focusedPath&&(e.has("focusedPath")||e.has("model"))){let e=this._index.indexOf(this.focusedPath);-1!==e&&(this._focusedItemPath=this.focusedPath,this._focusedItemIndex=e,this._lastSelectedPath=this.focusedPath,this._pendingScrollToIndex=e)}}updated(e){if(super.updated?.(e),null!=this._pendingScrollToIndex){let e=this._pendingScrollToIndex;this._pendingScrollToIndex=void 0,this.scrollToItem(e,!1)}if(e.has("treeItems")){let t=e.get("treeItems");!t?.length&&(this.treeItems?.length??0)>0&&this.kickVirtualizerAfterFirstLayout()}}async kickVirtualizerAfterFirstLayout(){let e=this.virtualizerRef.value;e&&(await e.layoutComplete,this.treeItems?.length&&(this.treeItems=this.treeItems.slice()))}renderIcon(e){if(null==e)return e$;if("string"==typeof e)return ex`<code-icon slot="icon" icon=${e}></code-icon>`;if("status"===e.type)return ex`<gl-git-status slot="icon" .status=${e.name}></gl-git-status>`;if("branch"===e.type)return ex`<gl-branch-icon
				slot="icon"
				.status=${e.status}
				.worktree=${e.worktree??!1}
				.hasChanges=${e.hasChanges??!1}
			></gl-branch-icon>`;if("file-icon"===e.type)return ex`<gl-file-icon slot="icon" .filename=${e.filename}></gl-file-icon>`;if("agent"===e.type){let t="working"===e.phase?"sync":"waiting"===e.phase?"warning":"claude",i="working"===e.phase?"spin":void 0;return ex`<code-icon
				slot="icon"
				icon="${t}"
				modifier=${i??e$}
				class="tree-icon-agent tree-icon-agent--${e.phase}"
			></code-icon>`}return e$}renderActions(e){let t=e.actions;return null==t||0===t.length?e$:t.map(t=>ex`<gl-action-chip
				slot="actions"
				.icon=${t.icon}
				.label=${t.label}
				.altIcon=${t.altIcon}
				.altLabel=${t.altLabel}
				@mouseenter=${()=>this.onSuspendRowTooltip()}
				@mouseleave=${()=>this.onResumeRowTooltip()}
				@click=${i=>this.onTreeItemActionClicked(i,e,t,!1)}
				@dblclick=${i=>this.onTreeItemActionClicked(i,e,t,!0)}
			></gl-action-chip>`)}renderDecorations(e){let t=e.decorations;return null==t||0===t.length?e$:t.map(e=>{let t="before"===e.position?"decorations-before":"decorations-after";if("icon"===e.type)return ex`<code-icon
					slot=${t}
					part=${t}
					aria-label="${e.label}"
					.icon=${e.icon}
				></code-icon>`;if("text"===e.type){let i=`decoration-text${e.kind?` decoration-text--${e.kind}`:""}`;return ex`<span
					slot=${t}
					part=${t}
					class=${i}
					aria-label=${e.tooltip??e.label??e$}
					>${e.label}</span
				>`}if("tracking"===e.type)return ex`<gl-tracking-pill
					slot=${t}
					part=${t}
					.ahead=${e.ahead}
					.behind=${e.behind}
					colorized
					outlined
					?missingUpstream=${e.missingUpstream??!1}
				></gl-tracking-pill>`;if("wip"===e.type)return ex`<gl-wip-stats
					slot=${t}
					part=${t}
					badge
					show-clean
					no-tooltip
					.dirty=${e.hasChanges}
					added=${e.added??e$}
					modified=${e.changed??e$}
					removed=${e.deleted??e$}
				></gl-wip-stats>`;if("conflict"===e.type){let i=`conflict-count${e.kind?` conflict-count--${e.kind}`:""}`;return ex`<span
					slot=${t}
					part=${t}
					class=${i}
					aria-label=${e.tooltip??e.label??e$}
					><code-icon icon="warning" size="12"></code-icon>${e.count}</span
				>`}if("agent"===e.type){let i=e.tooltip??e.label;return ex`<gl-tooltip slot=${t} part=${t} placement="top">
					<span class="tree-icon-agent-pair">
						<code-icon
							icon="robot"
							class="tree-icon-agent tree-icon-agent--${e.phase}"
							aria-label=${i??e$}
						></code-icon>
						${"working"===e.phase?ex`<code-icon
									icon="sync"
									modifier="spin"
									class="tree-icon-agent tree-icon-agent--${e.phase}"
									aria-hidden="true"
								></code-icon>`:e$}
					</span>
					<span slot="content">${i}</span>
				</gl-tooltip>`}})}highlightText(e){if(!this.filtered||0===this._filter.terms.length)return e;let t=e.toLowerCase(),i=new Set;for(let e of this._filter.terms){let o=t.indexOf(e);if(-1!==o){for(let t=o;t<o+e.length;t++)i.add(t);continue}let r=cM(t,e);if(null!=r)for(let e of r)i.add(e)}return 0===i.size?e:function(e,t){let i=[],o=0,r=0;for(;r<t.length;){let s=r;for(;s+1<t.length&&t[s+1]===t[s]+1;)s++;let a=t[r],c=t[s]+1;a>o&&i.push(e.substring(o,a)),i.push(ex`<mark>${e.substring(a,c)}</mark>`),o=c,r=s+1}return o<e.length&&i.push(e.substring(o)),i}(e,[...i].sort((e,t)=>e-t))}renderTreeItem(e){let t=cz(e),i=this.multiSelectable?this._selection.has(t):this._lastSelectedPath===t,o=this._focusedItemPath===t,r=`tree-item-${t}`;return ex`<gl-tree-item
			id=${r}
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
			.focused=${o}
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
			${this.highlightText(e.label)}${s3(null!=e.description,()=>ex`<span slot="description">${this.highlightText(e.description)}</span>`)}
			${this.renderActions(e)} ${this.renderDecorations(e)}
		</gl-tree-item>`}renderFilterBar(e){return this.filterable?ex`<div class="filter">
			<div class="filter-field">
				<input
					class="filter-input"
					type="search"
					role="combobox"
					aria-controls="tree-list"
					aria-expanded="true"
					aria-haspopup="tree"
					aria-autocomplete="list"
					aria-activedescendant=${e||e$}
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
		</div>`:e$}render(){let e=!!this.treeItems?.length,t=!e&&this._filter.query&&this._model?.length,i=!e&&!t&&!!this.emptyText;if(!e&&!t&&!i)return e$;let o=this._focusedItemPath?`tree-item-${this._focusedItemPath}`:void 0;return ex`
			${this.renderFilterBar(o)}
			${e?ex`<div
						${ao(this.scrollableRef)}
						id="tree-list"
						class="scrollable"
						tabindex="0"
						role="tree"
						aria-label=${this.ariaLabel}
						aria-multiselectable=${this.multiSelectable?"true":"false"}
						aria-activedescendant=${o||e$}
						@keydown=${this.handleContainerKeydown}
						@focus=${this.handleContainerFocus}
					>
						<lit-virtualizer
							class="scrollable"
							${ao(this.virtualizerRef)}
							.items=${this.treeItems}
							.keyFunction=${e=>cz(e)}
							.layout=${(0,ae.flow)({direction:"vertical"})}
							.renderItem=${e=>this.renderTreeItem(e)}
							scroller
						></lit-virtualizer>
					</div>`:t?ex`<div class="no-results">No results found</div>`:ex`<div class="no-results">${this.emptyText}</div>`}
			${this._hoverOpen&&this._hoveredTooltip?ex`<gl-popover
						class="hover-popover"
						?open=${this._hoverOpen}
						.anchor=${this._hoveredAnchor}
						placement="right-start"
						trigger="manual"
						.distance=${12}
					>
						<div slot="content" class="hover-content">
							${"string"==typeof this._hoveredTooltip?ex`<gl-markdown density="compact" .markdown=${this._hoveredTooltip}></gl-markdown>`:this._hoveredTooltip}
						</div>
					</gl-popover>`:e$}
		`}findTreeNode(e){return this._nodeMap.get(e)}getItemIndex(e){return this._index.indexOf(e)}rebuildFlattenedTree(){if(!this._model)return;this._nodeMap.clear();let e=this.filtered&&this.searchBoxFilter&&!this.dimUnmatched,t=this._model.length,i=[];for(let o=0;o<t;o++)cT(this._model[o],t,o+1,void 0,this._nodeMap,e,i);if(this.treeItems=i,this.buildPathToIndexMap(),this._focusedItemPath){let e=this._index.indexOf(this._focusedItemPath);-1!==e?this._focusedItemIndex=e:this.treeItems?.length?(this._focusedItemPath=cz(this.treeItems[0]),this._focusedItemIndex=0):(this._focusedItemPath=void 0,this._focusedItemIndex=-1)}}onBeforeTreeItemSelected(e){let t=cz(e);this._lastSelectedPath!==t&&(this._lastSelectedPath=t),this._focusedItemPath!==t&&(this._focusedItemPath=t,this._focusedItemIndex=this.getItemIndex(t)),this.toggleNodeExpansion(e),this.requestUpdate()}toggleNodeExpansion(e){if(!e.branch)return!1;let t=cz(e),i=this.findTreeNode(t);return null!=i&&(i.expanded=!i.expanded,this.rebuildFlattenedTree(),this.emit("gl-tree-expansion-changed",{path:e.path,key:t,expanded:i.expanded}),!0)}onTreeItemToggle(e){let t=cz(e);this._focusedItemPath!==t&&(this._focusedItemPath=t,this._focusedItemIndex=this.getItemIndex(t)),this.toggleNodeExpansion(e),this.requestUpdate()}onTreeItemSelected(e,t){if(e.stopPropagation(),this.multiSelectable)if(t.branch)e.detail.shiftKey||e.detail.ctrlKey||e.detail.metaKey||this._selection.clear();else{let i=cz(t),o=e.detail;if(o.shiftKey)return void this._selection.selectRange(i,{additive:o.ctrlKey||o.metaKey});if(o.ctrlKey||o.metaKey)return void this._selection.toggle(i);this._selection.setSingle(i)}this.emit("gl-tree-generated-item-selected",{...e.detail,node:t,context:t.context})}emitSelectionChanged(){let e=this._selection.selectedIds,t=[],i=[],o=[];for(let r of this.treeItems??[])e.has(cz(r))&&(t.push(r.path),i.push(r),o.push(r.context));let r=this._selection.anchorId;this.emit("gl-tree-generated-selection-changed",{nodes:i,paths:t,contexts:o,lastPath:null!=r?this.findTreeNode(r)?.path:void 0})}pruneSelection(){this.multiSelectable&&this._selection.pruneTo(e=>this._index.has(e))}onTreeItemChecked(e,t){e.stopPropagation(),this.emit("gl-tree-generated-item-checked",{...e.detail,node:t,context:t.context})}onTreeItemHover(e,t){if(!t.tooltip)return void this.onTreeItemUnhover();let i=e.currentTarget;clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer);let o=i.getBoundingClientRect(),r=this.tooltipAnchorRight?this.getBoundingClientRect().right:e.clientX,s=this._virtualAnchorRect;(s.x=s.left=s.right=r,s.y=s.top=o.top,s.bottom=o.bottom,s.height=o.height,this._hoveredAnchor=this._virtualAnchor,this._hoveredTooltip=t.tooltip,this._hoverOpen)?this._repositionHoverPopover():this._hoverTimer=setTimeout(()=>{this._hoverOpen=!0},500)}async _repositionHoverPopover(){await this.updateComplete;let e=this.renderRoot?.querySelector("gl-popover.hover-popover"),t=e?.shadowRoot?.querySelector("wa-popup");t?.reposition?.()}onTreeItemUnhover(){clearTimeout(this._hoverTimer),this._unhoverTimer=setTimeout(()=>{this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},100)}onSuspendRowTooltip(){clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1}onResumeRowTooltip(){null!=this._hoveredTooltip&&null!=this._hoveredAnchor&&(this._hoverOpen=!0)}onTreeItemActionClicked(e,t,i,o=!1){e.stopPropagation(),this.emit("gl-tree-generated-item-action-clicked",{node:t,context:t.context,action:i,dblClick:o,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey})}getFocusedTreeItemElement(){if(!this._focusedItemPath)return;let e=this.virtualizerRef.value;if(e)return[...e.querySelectorAll("gl-tree-item")].find(e=>e.id===`tree-item-${this._focusedItemPath}`)}exitTreeForward(){let e=document.activeElement;setTimeout(()=>e?.blur?.(),0)}getCurrentFocusedIndex(){if(!this.treeItems?.length)return -1;if(this._focusedItemPath){let e=this.getItemIndex(this._focusedItemPath);if(-1!==e)return e}if(this._focusedItemIndex>=0&&this._focusedItemIndex<this.treeItems.length)return this._focusedItemIndex;if(this._lastSelectedPath){let e=this.getItemIndex(this._lastSelectedPath);if(-1!==e)return e}return 0}handleTreeKey(e){let t=this.treeItems;if(null==t||0===t.length)return!1;if("ArrowLeft"===e.key||"ArrowRight"===e.key){let i,o=this.getCurrentFocusedIndex(),r=t[o];if(null==r)return!1;if(this.handleBranchToggle(e,r))return!0;if("ArrowRight"===e.key)i=Math.min(o+1,t.length-1);else if(r.parentPath){let e=this.getItemIndex(r.parentPath);i=-1!==e?e:Math.max(o-1,0)}else i=Math.max(o-1,0);if(this.focusItemAtIndex(i),this.multiSelectable){let o=t[i];if(null!=o&&!o.branch){let t=cz(o);e.shiftKey?this._selection.selectRange(t):e.ctrlKey||e.metaKey||this._selection.setSingle(t)}}return!0}return!!(!e.ctrlKey&&!e.metaKey&&!e.altKey&&this.isPrintableCharacter(e.key))&&(this.handleTypeAhead(e.key),!0)}handleItemActivation(e){e&&(this.onBeforeTreeItemSelected(e),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),e))}handleBranchToggle(e,t){if(!t?.branch)return!1;let i="ArrowRight"===e.key,o="ArrowLeft"===e.key;return(!i||!t.expanded)&&(!o||!!t.expanded)&&(e.preventDefault(),e.stopPropagation(),!!this.toggleNodeExpansion(t)&&(this.requestUpdate(),!0))}focusItemAtIndex(e){let t=this.treeItems?.[e];if(!t)return;let i=cz(t);this._focusedItemPath=i,this._focusedItemIndex=e,this._lastSelectedPath!==i&&(this._lastSelectedPath=i),this.requestUpdate(),this.scrollToItem(e)}scrollToItem(e,t=!0){this._scroll.scrollToIndex(e,{restoreFocus:t})}handleTypeAhead(e){this._typeAheadTimer&&clearTimeout(this._typeAheadTimer);let t=!this._typeAheadBuffer;this._typeAheadBuffer+=e.toLowerCase();let i=this.treeItems?.[this._focusedItemIndex],o=i?.label?.toLowerCase().startsWith(this._typeAheadBuffer),r=!1;if(t?r=!0:o||(r=!0),r){let e=this.findNextMatchingItem(this._typeAheadBuffer);-1!==e&&this.focusItemAtIndex(e)}this._typeAheadTimer=window.setTimeout(()=>{this._typeAheadBuffer="",this._typeAheadTimer=void 0},this._typeAheadTimeout)}buildPathToIndexMap(){this._index.rebuild(),this.pruneSelection()}findNextMatchingItem(e){if(!this.treeItems?.length||!e)return -1;let t=e.toLowerCase(),i=this._focusedItemIndex,o=this.treeItems.length;for(let e=1;e<o;e++){let r=(i+e)%o;if(this.treeItems[r].label?.toLowerCase().startsWith(t))return r}return -1}isPrintableCharacter(e){return 1===e.length&&cI.test(e)}setActiveDescendant(e){let t=this.treeItems?.[e];if(!t)return;let i=cz(t);this._focusedItemPath=i,this._focusedItemIndex=e,this._lastSelectedPath!==i&&(this._lastSelectedPath=i),this.requestUpdate(),this.scrollToItem(e,!1)}};function cz(e){return e.key??e.path}function cT(e,t,i,o,r,s,a){if(s&&!1===e.matched)return a??[];let c=a??[];if(r?.set(cz(e),e),c.push({...e,size:t,position:i,parentPath:o}),!1!==e.expanded&&null!=e.children&&e.children.length>0){let t=e.children.length;for(let i=0;i<t;i++)cT(e.children[i],t,i+1,cz(e),r,s,c)}return c}function cR(e,t){let i=!1;for(let o of e){let e=(o.label??"").toLowerCase(),r=o.filterText?.toLowerCase(),s=o.description?.toLowerCase(),a=t.every(t=>r?.includes(t)||e.includes(t)||null!=cM(e,t)||s?.includes(t)),c=!1;null!=o.children&&o.children.length>0&&(c=cR(o.children,t)),o.matched=a||c,o.matched&&(i=!0),o.branch&&c&&(o.expanded=!0)}return i}function cM(e,t){let i=[],o=0;for(let r=0;r<e.length&&o<t.length;r++)e[r]===t[o]&&(i.push(r),o++);return o===t.length?i:void 0}cP.styles=[rp,j`
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
		`],cA([eO()],cP.prototype,"treeItems",2),cA([ej({reflect:!0})],cP.prototype,"guides",2),cA([ej({type:Boolean,reflect:!0})],cP.prototype,"filtered",2),cA([ej({type:Boolean,reflect:!0})],cP.prototype,"filterable",2),cA([ej({type:String,attribute:"filter-placeholder"})],cP.prototype,"filterPlaceholder",2),cA([ej({type:String,attribute:"search-placeholder"})],cP.prototype,"searchPlaceholder",2),cA([ej({type:Boolean,attribute:"search-box-filter",reflect:!0})],cP.prototype,"searchBoxFilter",2),cA([ej({type:Boolean,attribute:"dim-unmatched",reflect:!0})],cP.prototype,"dimUnmatched",2),cA([ej({type:String,attribute:"empty-text"})],cP.prototype,"emptyText",2),cA([ej({type:Boolean,attribute:"tooltip-anchor-right"})],cP.prototype,"tooltipAnchorRight",2),cA([ej({type:String,attribute:"filter-text"})],cP.prototype,"filterText",1),cA([ej({type:String,attribute:"aria-label"})],cP.prototype,"ariaLabel",2),cA([ej({type:String,attribute:"focused-path"})],cP.prototype,"focusedPath",2),cA([eO()],cP.prototype,"_actionButtonHasFocus",2),cA([eO()],cP.prototype,"_hoveredTooltip",2),cA([eO()],cP.prototype,"_hoveredAnchor",2),cA([eO()],cP.prototype,"_hoverOpen",2),cA([ej({type:Boolean,attribute:"multi-selectable"})],cP.prototype,"multiSelectable",2),cA([ej({type:Boolean,attribute:"draggable-files"})],cP.prototype,"draggableFiles",2),cA([ej({type:Array,attribute:!1})],cP.prototype,"model",1),cP=cA([eM("gl-tree-view")],cP);var cB=Object.defineProperty,cj=Object.getOwnPropertyDescriptor,cO=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?cj(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&cB(t,i,s),s};let cD=class extends lit_element_i{constructor(){super(...arguments),this.collapsable=!0,this.showFileIcons=!1,this.header="Files changed",this.emptyText="No Files",this.sortByStage=!1,this.multiSelectable=!1,this.draggableFiles=!1,this._selectedFiles=[],this.checkable=!1,this.selectionBadge=!0,this.selectionAction="file-compare-previous",this._contextMatchVisibility="mixed",this._showSearchBox=!1,this._searchBoxFilter=!0,this._collapsedIds=new Set,this._modifiers=new ModifierKeysController(this),this.onContextMenuEnrichSelection=e=>{let t;if(!this.multiSelectable||this._selectedFiles.length<=1||null==this.fileContext)return;let i=e.composedPath().find(e=>e instanceof HTMLElement&&"GL-TREE-ITEM"===e.tagName&&e.hasAttribute("data-vscode-context"));if(null==i)return;let o=i.getAttribute("data-vscode-context");if(null==o)return;try{t=JSON.parse(o)}catch{return}let r=t.webviewItemValue?.path;if(null==r||!this._selectedFiles.some(e=>e.path===r))return;let s=[];for(let e of this._selectedFiles){let t=this.fileContext(e);if(null!=t)try{let e=JSON.parse(t);s.push({webviewItem:e.webviewItem,webviewItemValue:e.webviewItemValue})}catch{continue}}if(s.length<=1)return;let a={webview:t.webview,webviewInstance:t.webviewInstance,webviewItemValue:t.webviewItemValue,listMultiSelection:!0,webviewItems:function(e){if(0===e.length)return;if(1===e.length)return e[0];let t=e.map(e=>{let t=e.split("+");return{baseType:t[0],additions:t.slice(1)}}),i=t[0].baseType;if(!t.every(e=>e.baseType===i))return;let o=new Map;for(let e of t)for(let t of new Set(e.additions))o.set(t,(o.get(t)??0)+1);let r=[];for(let[t,i]of o)i===e.length&&r.push(t);return r.length>0?`${i}+${r.join("+")}`:i}(s.map(e=>e.webviewItem)),webviewItemsUnion:function(e){if(0===e.length)return;if(1===e.length)return e[0];let t=e.map(e=>{let t=e.split("+");return{baseType:t[0],additions:t.slice(1)}}),i=t[0].baseType;if(!t.every(e=>e.baseType===i))return;let o=new Set;for(let e of t)for(let t of e.additions)o.add(t);return o.size>0?`${i}+${[...o].join("+")}`:i}(s.map(e=>e.webviewItem)),webviewItemsValues:s};i.setAttribute("data-vscode-context",tz(a)),setTimeout(()=>i.setAttribute("data-vscode-context",o),100)},this.onTreeExpansionChanged=e=>{e.detail.expanded?this._collapsedIds.delete(e.detail.key):this._collapsedIds.add(e.detail.key)}}get selectedFiles(){return this._selectedFiles}connectedCallback(){super.connectedCallback?.(),this.addEventListener("contextmenu",this.onContextMenuEnrichSelection)}disconnectedCallback(){this.removeEventListener("contextmenu",this.onContextMenuEnrichSelection),super.disconnectedCallback?.()}willUpdate(e){if(e.has("files")||e.has("filesLayout")||e.has("orderBy")||e.has("sortByStage")||e.has("mixedPaths")||e.has("showFileIcons")||e.has("grouping")||e.has("checkable")||e.has("checkableStates")||e.has("checkableStateDefault")||e.has("searchContext")||e.has("agentTouchedFiles")||e.has("_contextMatchVisibility")){var t,i,o;let r=this.files??[];if(e.has("files")){let t=e.get("files");if(t?.length&&r.length){let e=new Set;for(let i of t)e.add(i.path);let i=0;for(let t of r)e.has(t.path)&&i++;if(i/Math.max(e.size,r.length)>.5){let e=this.getTreeScrollContainer();null!=e&&(this._pendingScrollRestore=e.scrollTop)}}if(this._selectedFiles.length){let e=new Map(r.map(e=>[e.path,e])),t=this._selectedFiles.map(t=>e.get(t.path)).filter(e=>null!=e);(t.length!==this._selectedFiles.length||t.some((e,t)=>e!==this._selectedFiles[t]))&&(this._selectedFiles=t)}}this._cachedTreeModel=function(e){let{files:t,isTree:i,compact:o,contextMatchVisibility:r,searchContext:s,fileToModel:a,folderToContextData:c,orderBy:h,sortByStage:p,mixedPaths:u}=e;if(!e.grouping)return nO(t,i,o,r,s,a,{level:1,...e.checkable?{checkable:!0}:{}},c,h,p,u);let g=new Map;for(let i of t){let t=e.grouping.getGroup(i),o=g.get(t);o||(o=[],g.set(t,o)),o.push(i)}let m=[];for(let t of e.grouping.groups){let e=g.get(t.key);if(!e?.length)continue;let f=nO(e,i,o,r,s,a,{level:2},c,h,p,u);!function e(t,i){for(let o of t)o.key=`${i}${o.path}`,null!=o.children&&e(o.children,i)}(f,`${t.key}:`),m.push({label:t.label,path:`/:${t.key}:/`,level:1,branch:!0,checkable:!1,expanded:!0,checked:!1,context:[t.key],children:f,actions:t.actions})}return 0===m.length?nO(t,i,o,r,s,a,void 0,c,h,p,u):m}({files:r,isTree:(t=this.fileLayout,i=r.length,o=this.filesLayout?.threshold??5,"auto"===t?i>o:"tree"===t),compact:this.filesLayout?.compact??!0,grouping:this.grouping,checkable:this.checkable,contextMatchVisibility:this._contextMatchVisibility,searchContext:this.searchContext,fileToModel:(e,t,i)=>this.fileToTreeModel(e,t,i),folderToContextData:this.folderContext,orderBy:this.orderBy,sortByStage:this.sortByStage,mixedPaths:this.mixedPaths}),this.applyCollapsedState(this._cachedTreeModel)}}applyCollapsedState(e){if(0!==this._collapsedIds.size)for(let t of e)t.branch&&this._collapsedIds.has(t.key??t.path)&&(t.expanded=!1),null!=t.children&&this.applyCollapsedState(t.children)}updated(){if(null!=this._pendingScrollRestore){let e=this.getTreeScrollContainer();null!=e&&(e.scrollTop=this._pendingScrollRestore),this._pendingScrollRestore=void 0}}getTreeScrollContainer(){let e=this.renderRoot?.querySelector("gl-tree-view");return e?.shadowRoot?.querySelector("lit-virtualizer")??void 0}get fileLayout(){return this.filesLayout?.layout??"auto"}get indentGuides(){return this.showIndentGuides??"none"}get fileCount(){return this.files?.length??0}get effectiveShowSearchBox(){return this.showSearchBox??this._showSearchBox}get effectiveSearchBoxFilter(){return this.searchBoxFilter??this._searchBoxFilter}render(){let e=this._cachedTreeModel??[],t=this.fileCount,i=this.badge??(t>0?t:void 0),o=this.buttons?.includes("layout")??!0,r=this.buttons?.includes("search")??!0,s=this.effectiveShowSearchBox;return ex`
			<webview-pane exportparts="header, content" .collapsable=${this.collapsable} expanded flexible>
				<span slot="title"
					>${this.checkable?this.renderCheckboxTitle(t,i):this.renderTitle(i)}</span
				>
				<slot name="subtitle" slot="subtitle"></slot>
				<div class="header-actions" slot="actions">
					<slot name="leading-actions" class="leading-actions"></slot>
					<action-nav>
						${null!=this.searchContext?function(e,t,i,o){let r,s;if(0===t&&0===i)return e$;switch(e){case"off":r="filter",s=`Search matched ${t} of ${i} files
Click to highlight matching files`;break;case"mixed":r="gl-filter-mixed",s=`Search matched ${t} of ${i} files
Click to show only matching files`;break;case"matched":r="filter-filled",s=`Showing ${t} of ${i} files
Click to show all files`}return ex`<gl-action-chip
		data-action="context-match-visibility"
		label="${s}"
		icon="${r}"
		@click="${o}"
	></gl-action-chip>`}(this._contextMatchVisibility,this.searchContext.matchedFiles?.length??0,t,e=>this.onCycleContextMatchVisibility(e)):e$}
						${o?function(e,t){let{value:i,icon:o,label:r}=nz(e);return ex`<gl-action-chip
		data-action="files-layout"
		data-files-layout="${i}"
		label="${r}"
		icon="${o}"
		@click="${t}"
	></gl-action-chip>`}(this.fileLayout,e=>this.onToggleFilesLayout(e)):e$}
						${r?ex`<gl-action-chip
									data-action="search"
									label="${s?"Hide Search":"Show Search"}"
									icon="search"
									class="${s?"active-toggle":""}"
									@click=${this.onToggleSearch}
								></gl-action-chip>`:e$}
						<slot name="actions"></slot>
					</action-nav>
				</div>
				<slot name="before-tree"></slot>
				${this.renderTreeFileModel(e)}
			</webview-pane>
		`}renderTitle(e){return ex`<slot name="title-content"><span class="file-tree-pane__title">${this.header}</span></slot
			>${null!=e?ex`<gl-badge appearance="filled"
						><span class="checkbox-header__badge-text">${e}</span></gl-badge
					>`:e$}<slot name="header-badge"></slot>`}renderCheckboxTitle(e,t){let i,o=new Set,r=[],s=0,a=0;if(this.files)for(let e of this.files){if(o.has(e.path))continue;o.add(e.path);let t=this.checkableStates?.get(e.path);(t?.disabled??this.checkableStateDefault?.disabled)||r.push(e.path);let i=t?.state??this.checkableStateDefault?.state;"checked"===i?s++:"mixed"===i&&a++}let c=o.size,h=c>0&&s===c&&0===a,p=0===s&&0===a,u=!h&&!p,g=0;if(this.files){let e=new Set;for(let t of this.files)!(!nI(t.status)||e.has(t.path))&&(e.add(t.path),g++)}let m=t,f="filled",b=!1;if(g>0)m=tY("conflict",g),f="warning";else if(this.selectionBadge&&this.checkable&&c>0){let e=s,t=this.selectionBadgeLabel;e<c?m=t?`${e} of ${c} ${t}`:`${e} of ${c}`:t&&(m=`${c} ${t}`),b=a>0}let v=ex`<gl-checkbox
			.checked=${nL(h)}
			.indeterminate=${nL(u)}
			@gl-change-value=${e=>{let t=e.target;this.dispatchEvent(new CustomEvent("gl-check-all",{detail:{checked:t.checked,paths:r},bubbles:!0,composed:!0}))}}
		></gl-checkbox>`,_=this.checkVerb,w=this.uncheckVerb;if(_&&w)if(h)i=`${w} All`;else if(u){let e=`${_} Remaining`,t=`${w} All`;i=this._modifiers.altKey?t:`${e}
[${ne()}] ${t}`}else i=`${_} All`;let x=b?ex`<gl-badge appearance="muted" class="checkbox-header__badge-mixed">+${a} Mixed</gl-badge>`:e$,C=null==m?ex`<span class="checkbox-header__title">${this.header}</span>`:ex`<span class="checkbox-header__title">${this.header}</span>
						<gl-badge appearance=${f}
							><span class="checkbox-header__badge-text">${m}</span>${x}</gl-badge
						>`;return ex`<span class="checkbox-header" @click=${e=>e.stopPropagation()}>
			${i?ex`<gl-tooltip placement="bottom" content=${i}>${v}</gl-tooltip>`:v}
			<span class="checkbox-header__label">${C}<slot name="header-badge"></slot></span>
		</span>`}onToggleSearch(e){e.preventDefault(),e.stopPropagation();let t=!this.effectiveShowSearchBox;this._showSearchBox=t,this.dispatchEvent(new CustomEvent("gl-show-search-box-change",{detail:t,bubbles:!0,composed:!0}))}onTreeSearchBoxFilterChanged(e){this._searchBoxFilter=e.detail,this.dispatchEvent(new CustomEvent("gl-search-box-filter-change",{detail:e.detail,bubbles:!0,composed:!0}))}onCycleContextMatchVisibility(e){e.preventDefault(),e.stopPropagation(),this._contextMatchVisibility=function(e){switch(e){case"off":return"mixed";case"mixed":return"matched";case"matched":return"off"}}(this._contextMatchVisibility)}onToggleFilesLayout(e){e.preventDefault(),e.stopPropagation();let t=nz(this.fileLayout).value;this.dispatchEvent(new CustomEvent("change-files-layout",{detail:{layout:t},bubbles:!0,composed:!0}))}getFileDecorations(e){let t=[];if(nI(e.status)){var i,o;let r,s,a=(i=e.status,o=e.conflictMarkers,r=nF(i,void 0),s=[],null!=r&&(s.push({type:"text",label:i,tooltip:r.description,kind:r.kind,position:"after"}),s.push({type:"text",label:r.label,tooltip:r.label,kind:"muted",position:"before"})),null!=o&&o>0&&s.push({type:"conflict",label:tY("conflict",o),count:o,tooltip:tY("conflict",o),kind:r?.kind??"modified",position:"before"}),s.length?s:void 0);null!=a&&t.push(...a)}if(e.stats&&t.push({type:"text",label:`+${e.stats.additions}`,kind:"added",position:"before"},{type:"text",label:`\u2212${e.stats.deletions}`,kind:"deleted",position:"before"}),this.showFileIcons&&!nI(e.status)){let i=nD(e.status);null!=i&&t.push({type:"text",label:i.letter,tooltip:i.tooltip,kind:i.kind,position:"after"})}let r=this.agentTouchedFiles?.get(e.path);return null!=r&&t.push({type:"agent",label:"Editing",tooltip:"Claude Code is editing this file",phase:r,position:"before"}),t}fileToTreeModel(e,t,i=!1,o="/"){var r,s;let a,c,h,p,u,g,m=e.path.lastIndexOf(o),f=-1!==m?e.path.substring(m+1):e.path,b=i&&-1!==m?e.path.substring(0,m):"",v=this.searchContext?.matchedFiles?.find(t=>t.path===e.path)!=null,_=this.getFileDecorations(e),w="function"==typeof this.fileActions?this.fileActions(e,t):this.fileActions??[];if(this.checkable){let t,i,o=this.checkableStates?.get(e.path),r=o?.state??this.checkableStateDefault?.state,s=o?.disabled??this.checkableStateDefault?.disabled??!1,c=o?.disabledReason??this.checkableStateDefault?.disabledReason,h=this.checkVerb,p=this.uncheckVerb;s?t=c:h&&p&&("checked"===r?t=`${p} ${f}`:"mixed"===r?(t=`${h} ${f}`,i=`${p} ${f}`):t=`${h} ${f}`),a={checked:"mixed"===r?"indeterminate":"checked"===r,disableCheck:s,checkableTooltip:t,checkableAltTooltip:i}}let x=nI(e.status),C=x?{type:"status",name:e.status}:this.showFileIcons?{type:"file-icon",filename:f}:void 0,$=x?(r=e.status,s=e.conflictMarkers,c=nF(r,void 0),h=[],null!=c&&(h.push(`**${c.label}** (${r})`),h.push(c.description)),null!=s&&s>0&&h.push(tY("conflict",s)),h.join(`

`)):(p=nD(e.status)?.tooltip,u=e.repoPath?(0,nP.join)(e.repoPath,e.path):e.path,g=[`${u}${null!=e.submodule?" (submodule)":""}`],p&&g.push(p),"R"===e.status&&e.originalPath&&g.push(`\u2190 ${e.originalPath}`),g.join(`
`));return{branch:!1,expanded:!0,path:e.path,level:1,checkable:this.checkable,checked:!1,controlledCheck:x,icon:C,label:f,description:`${!0===i?b:""}${"R"===e.status?` \u2190 ${e.originalPath}`:""}`,tooltip:$,priority:x?-1:void 0,context:[e],actions:w,decorations:_.length>0?_:void 0,contextData:this.fileContext?.(e,t),matched:v,...t,...a}}renderTreeFileModel(e){let t="matched"===this._contextMatchVisibility&&null!=this.searchContext?"No matching files":this.emptyText,i=null!=this.searchContext&&"mixed"===this._contextMatchVisibility;return ex`<gl-tree-view
			.model=${e}
			.guides=${this.indentGuides}
			.filtered=${null!=this.searchContext&&"off"!==this._contextMatchVisibility}
			.searchBoxFilter=${this.effectiveSearchBoxFilter}
			.dimUnmatched=${i}
			?filterable=${this.effectiveShowSearchBox}
			?multi-selectable=${this.multiSelectable}
			?draggable-files=${this.draggableFiles}
			filter-placeholder="Filter files..."
			search-placeholder="Search files..."
			empty-text=${t}
			@gl-tree-search-box-filter-changed=${this.onTreeSearchBoxFilterChanged}
			@gl-tree-generated-item-action-clicked=${this.onTreeItemActionClicked}
			@gl-tree-generated-item-checked=${this.onTreeItemChecked}
			@gl-tree-generated-item-selected=${this.onTreeItemSelected}
			@gl-tree-generated-selection-changed=${this.onSelectionChanged}
			@gl-tree-expansion-changed=${this.onTreeExpansionChanged}
		></gl-tree-view>`}onTreeItemActionClicked(e){if(!e.detail.action)return;let t=e.detail.context;if(t?.[0]&&"object"==typeof t[0]&&"path"in t[0]){let i=t[0],o=e.detail.action;if(this.multiSelectable&&this._selectedFiles.length>1&&"single"!==o.multiBehavior&&this._selectedFiles.some(e=>e.path===i.path)){if("batch"===o.multiBehavior)this.dispatchFileEvent(o.action,i,e.detail,this._selectedFiles);else for(let t of this._selectedFiles)this.dispatchFileEvent(o.action,t,{dblClick:!0,altKey:e.detail.altKey});return}this.dispatchFileEvent(o.action,i,e.detail)}else this.dispatchEvent(new CustomEvent(e.detail.action.action,{detail:e.detail,bubbles:!0,composed:!0}))}onTreeItemChecked(e){let t=e.detail.context?.[0]?.path;if(this.multiSelectable&&this._selectedFiles.length>1&&null!=t&&this._selectedFiles.some(e=>e.path===t)){let t=e.detail.checked;for(let i of this._selectedFiles){let o=this.checkableStates?.get(i.path)?.state??this.checkableStateDefault?.state;(t?"checked"!==o:null!=o)&&this.dispatchEvent(new CustomEvent("file-checked",{detail:{node:e.detail.node,context:[i],checked:t},bubbles:!0,composed:!0}))}return}this.dispatchEvent(new CustomEvent("file-checked",{detail:e.detail,bubbles:!0,composed:!0}))}onTreeItemSelected(e){e.detail.context&&this.dispatchFileEvent(this.selectionAction,e.detail.context[0],e.detail)}onSelectionChanged(e){let t=new Set(e.detail.paths),i=new Set,o=(this.files??[]).filter(e=>!(!t.has(e.path)||i.has(e.path))&&(i.add(e.path),!0));this._selectedFiles=o,this.dispatchEvent(new CustomEvent("file-selection-changed",{detail:{files:o,paths:e.detail.paths},bubbles:!0,composed:!0}))}dispatchFileEvent(e,t,i,o){this.dispatchEvent(new CustomEvent(e,{detail:{path:t.path,repoPath:t.repoPath,status:t.status,originalPath:t.originalPath,staged:t.staged,altKey:i?.altKey,files:o,showOptions:i?{preview:!i.dblClick,viewColumn:i.altKey?-2:void 0}:void 0},bubbles:!0,composed:!0}))}};cD.styles=[rd,nN],cO([ej({type:Array})],cD.prototype,"files",2),cO([ej({type:Boolean})],cD.prototype,"collapsable",2),cO([ej({type:Boolean,attribute:"show-file-icons"})],cD.prototype,"showFileIcons",2),cO([ej({type:Object,attribute:"search-context"})],cD.prototype,"searchContext",2),cO([ej()],cD.prototype,"header",2),cO([ej({attribute:"empty-text"})],cD.prototype,"emptyText",2),cO([ej({attribute:!1})],cD.prototype,"fileActions",2),cO([ej({attribute:!1})],cD.prototype,"fileContext",2),cO([ej({attribute:!1})],cD.prototype,"folderContext",2),cO([ej({attribute:!1})],cD.prototype,"grouping",2),cO([ej({attribute:!1})],cD.prototype,"filesLayout",2),cO([ej({attribute:!1})],cD.prototype,"orderBy",2),cO([ej({type:Boolean,attribute:"sort-by-stage"})],cD.prototype,"sortByStage",2),cO([ej({attribute:!1})],cD.prototype,"mixedPaths",2),cO([ej()],cD.prototype,"showIndentGuides",2),cO([ej()],cD.prototype,"badge",2),cO([ej({attribute:!1})],cD.prototype,"buttons",2),cO([ej({type:Boolean,attribute:"multi-selectable"})],cD.prototype,"multiSelectable",2),cO([ej({type:Boolean,attribute:"draggable-files"})],cD.prototype,"draggableFiles",2),cO([eO()],cD.prototype,"_selectedFiles",2),cO([ej({type:Boolean})],cD.prototype,"checkable",2),cO([ej({attribute:!1})],cD.prototype,"checkableStates",2),cO([ej({attribute:!1})],cD.prototype,"checkableStateDefault",2),cO([ej({attribute:"check-verb"})],cD.prototype,"checkVerb",2),cO([ej({attribute:"uncheck-verb"})],cD.prototype,"uncheckVerb",2),cO([ej({type:Boolean,attribute:"selection-badge"})],cD.prototype,"selectionBadge",2),cO([ej({attribute:"selection-badge-label"})],cD.prototype,"selectionBadgeLabel",2),cO([ej({attribute:"selection-action"})],cD.prototype,"selectionAction",2),cO([ej({attribute:!1})],cD.prototype,"agentTouchedFiles",2),cO([eO()],cD.prototype,"_contextMatchVisibility",2),cO([eO()],cD.prototype,"_showSearchBox",2),cO([eO()],cD.prototype,"_searchBoxFilter",2),cO([ej({type:Boolean,attribute:"show-search-box"})],cD.prototype,"showSearchBox",2),cO([ej({type:Boolean,attribute:"search-box-filter"})],cD.prototype,"searchBoxFilter",2),cD=cO([eM("gl-file-tree-pane")],cD);var cL=Object.defineProperty,cF=Object.getOwnPropertyDescriptor,cN=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?cF(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&cL(t,i,s),s};let GlDetailsBase=class GlDetailsBase extends lit_element_i{constructor(){super(...arguments),this._contextMenuProxy=new ContextMenuProxyController(this),this.variant="standalone",this.multiSelectable=!1,this.isUncommitted=!1,this.fileIcons=!1,this.filesCollapsable=!0,this.hasAccount=!1,this.hasIntegrationsConnected=!1,this.emptyText="No Files",this._selectedFiles=[],this._getFileActions=(e,t)=>this.getFileActions(e,t),this._getFileContext=(e,t)=>this.getFileContext(e,t),this._getFolderContext=e=>this.getFolderContext(e),this._onFileChecked=e=>this.onFileChecked(e)}static{this.styles=nw}renderChangedFiles(e,t){var i,o;let r,s=t?.multiDiff,a=t?.loading===!0&&!this.files?.length;return ex`
			<gl-file-tree-pane
				.files=${this.files}
				.filesLayout=${this.preferences?.files}
				.showIndentGuides=${this.preferences?.indentGuides}
				.collapsable=${this.filesCollapsable}
				?show-file-icons=${this.fileIcons}
				.fileActions=${this._getFileActions}
				.fileContext=${this._getFileContext}
				.folderContext=${this._getFolderContext}
				.searchContext=${this.searchContext}
				?multi-selectable=${this.multiSelectable}
				.showSearchBox=${this.showSearchBox}
				.searchBoxFilter=${this.searchBoxFilter}
				empty-text=${a?"":this.emptyText??"No Files"}
				@file-checked=${this._onFileChecked}
				@file-selection-changed=${e=>this._selectedFiles=e.detail?.files??[]}
			>
				${t?.stats?ex`<span class="commit-stats-subtitle" slot="subtitle"
							>${this.renderCommitStats(t.stats)}</span
						>`:e$}
				${null!=s&&(this.files?.length??0)>0?(r=(i={selectedCount:this._selectedFiles.length,slot:"leading-actions",onOpenAll:()=>this.onOpenMultiDiff(s),onOpenSelected:()=>this.onOpenSelectedChanges(s)}).label??"Open All Changes",i.selectedCount>1?ex`<gl-action-chip
			slot=${i.slot??e$}
			data-action="open-selected"
			icon="diff-multiple"
			label="Open Selected Changes"
			alt-label=${r}
			@click=${e=>e.altKey||e.shiftKey?i.onOpenAll(!1):i.onOpenSelected()}
		></gl-action-chip>`:ex`<gl-action-chip
		slot=${i.slot??e$}
		data-action="multi-diff"
		icon="diff-multiple"
		label=${r}
		alt-label=${i.altLabel??e$}
		@click=${e=>i.onOpenAll(e.altKey)}
	></gl-action-chip>`):e$}
				${null!=s&&!s.wip&&(this.files?.length??0)>0?(o={repoPath:s.repoPath,to:s.rhs,from:s.lhs||void 0,slot:"leading-actions"},ex`<gl-action-chip
		slot=${o.slot??e$}
		icon="copy"
		label="Copy Changes (Patch)"
		@click=${e=>e.currentTarget.dispatchEvent(new CustomEvent("copy-commit-patch",{detail:{repoPath:o.repoPath,to:o.to,from:o.from},bubbles:!0,composed:!0}))}
	></gl-action-chip>`):e$}
				${a?ex`<div slot="before-tree" class="files-loading" aria-busy="true">
							<code-icon icon="loading" modifier="spin"></code-icon>
							<span>Loading…</span>
						</div>`:e$}
				${this.renderChangedFilesSlottedContent()}
			</gl-file-tree-pane>
		`}onOpenMultiDiff(e){let t=this.files;t?.length&&this.dispatchEvent(new CustomEvent("open-multiple-changes",{detail:{files:t,repoPath:e.repoPath,lhs:e.lhs,rhs:e.rhs,wip:e.wip,title:e.title},bubbles:!0,composed:!0}))}onOpenSelectedChanges(e){let t=new Set(this._selectedFiles.map(e=>e.path)),i=(this.files??[]).filter(e=>t.has(e.path));i.length&&this.dispatchEvent(new CustomEvent("open-multiple-changes",{detail:{files:i,repoPath:e.repoPath,lhs:e.lhs,rhs:e.rhs,wip:e.wip,title:e.title},bubbles:!0,composed:!0}))}onFileChecked(e){}renderChangedFilesSlottedContent(){return e$}renderCommitStats(e){return function(e,t){if(e?.files==null)return;let i=t?.includeLineStats?e.additions??e$:e$,o=t?.includeLineStats?e.deletions??e$:e$;if("number"==typeof e.files)return ex`<commit-stats
			modified="${e.files}"
			additions="${i}"
			deletions="${o}"
			symbol="icons"
		></commit-stats>`;let{added:r,deleted:s,changed:a}=e.files;return ex`<commit-stats
		added="${r}"
		modified="${a}"
		removed="${s}"
		additions="${i}"
		deletions="${o}"
		symbol="icons"
	></commit-stats>`}(e,{includeLineStats:!0})}onShareWipChanges(e,t,i){if(!i)return;let o=new CustomEvent("share-wip",{detail:{checked:t}});this.dispatchEvent(o)}getFileActions(e,t){return[]}getFileContext(e,t){}getFolderContext(e){}};cN([ej({reflect:!0})],GlDetailsBase.prototype,"variant",2),cN([ej({type:Array})],GlDetailsBase.prototype,"files",2),cN([ej({type:Boolean,attribute:"multi-selectable"})],GlDetailsBase.prototype,"multiSelectable",2),cN([ej({type:Boolean})],GlDetailsBase.prototype,"isUncommitted",2),cN([ej({type:Object})],GlDetailsBase.prototype,"preferences",2),cN([ej({type:Object})],GlDetailsBase.prototype,"orgSettings",2),cN([ej({type:Object})],GlDetailsBase.prototype,"searchContext",2),cN([ej({type:Boolean,attribute:"file-icons"})],GlDetailsBase.prototype,"fileIcons",2),cN([ej({type:Boolean,attribute:"files-collapsable"})],GlDetailsBase.prototype,"filesCollapsable",2),cN([ej({type:Boolean})],GlDetailsBase.prototype,"hasAccount",2),cN([ej({type:Boolean})],GlDetailsBase.prototype,"hasIntegrationsConnected",2),cN([ej({attribute:"empty-text"})],GlDetailsBase.prototype,"emptyText",2),cN([ej({type:Boolean,attribute:"show-search-box"})],GlDetailsBase.prototype,"showSearchBox",2),cN([ej({type:Boolean,attribute:"search-box-filter"})],GlDetailsBase.prototype,"searchBoxFilter",2),cN([eO()],GlDetailsBase.prototype,"_selectedFiles",2);let cq=j`
	:host {
		--mode-header-bg: var(--titlebar-bg, var(--vscode-sideBar-background, var(--color-background)));
	}

	/* Split panel layout */
	:host([variant='embedded']) .split {
		flex: 1;
		min-height: 200px;
		overflow: hidden;
		--gl-split-panel-divider-width: 12px;
	}
	:host([variant='embedded']) .split--auto-size:not([dragging]) {
		--gl-split-panel-start-size: fit-content(var(--_start-size, 25%));
	}

	:host([variant='embedded']) .msg-slot {
		height: 100%;
		min-height: 4.4rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	/* File list wrapper */
	:host([variant='embedded']) .files {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		margin-top: var(--gl-space-4);
		padding-left: var(--gl-space-6);
		padding-right: var(--gl-space-6);
	}

	/* Explain input override */
	:host([variant='embedded']) .explain-input {
		flex: 1;
		width: 0;
		min-width: 0;
		max-width: none;
		margin: 0;
		padding: 0.4rem 0.7rem;
		font-size: var(--vscode-font-size);
		font-family: var(--vscode-font-family);
		color: var(--vscode-input-foreground);
		background: transparent;
		border: none !important;
		outline: none;
	}
	:host([variant='embedded']) .explain-input::placeholder {
		color: var(--vscode-input-placeholderForeground);
	}

	/* Child Shadow DOM component overrides */
	:host([variant='embedded']) webview-pane::part(header) {
		border-top: var(--gl-border-width) solid var(--vscode-sideBarSectionHeader-border);
		padding-right: calc(var(--gl-panel-padding-right) - 0.4rem);
		background-color: inherit;
	}

	:host([variant='embedded']) webview-pane [slot='title'] {
		display: inline-flex;
		align-items: center;
		gap: var(--gl-space-6);
	}

	/* Add spacing between header and tree generator */
	:host([variant='embedded']) {
		--gl-tree-view-margin-top: -0.2rem;
		--gl-tree-view-filterable-margin-top: -0.4rem;
		--action-item-foreground: var(--vscode-sideBarSectionHeader-foreground);
	}

	/* ── Zone 1: Author header (standalone fallback when panelActions=false) ── */
	:host([variant='embedded']) .author-header {
		display: flex;
		align-items: center;
		padding: 0.8rem var(--gl-panel-padding-right) 0.6rem var(--gl-panel-padding-left);
		gap: var(--gl-space-6);
		flex: none;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: var(--titlebar-bg, var(--vscode-sideBar-background, var(--color-background)));
	}

	:host([variant='embedded']) .author-header__author {
		--gl-avatar-size: 3.2rem;
		min-width: 0;
		flex: 1;
	}

	/* Mode-active title (replaces the author row in review mode). Verb on top, commit
	   message subtitle beneath. Keeps the same vertical rhythm as the author row so the
	   header doesn't jump height when entering/leaving the mode. */
	.mode-title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
		flex: 1;
		gap: var(--gl-space-2);
	}

	.mode-title__verb {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: var(--gl-font-base);
		font-weight: 600;
		color: var(--vscode-sideBarTitle-foreground, var(--vscode-foreground));
	}

	.mode-title__icon {
		flex: 0 0 auto;
		color: var(--vscode-foreground);
	}

	.mode-title__subtitle {
		font-size: var(--gl-font-md);
		color: var(--color-foreground--65);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.metadata-bar {
		color: var(--vscode-sideBarSectionHeader-foreground, var(--vscode-foreground));
	}

	/* Right-side mode-status snippet in the metadata bar (compose/review). Replaces the
	   commit-stats render when present so the bar's right side carries the mode's current
	   state rather than the static stats. */
	.metadata-bar .mode-status {
		font-size: var(--gl-font-md);
		color: var(--color-foreground--65);
		white-space: nowrap;
	}

	/* Resume affordance — the same snippet that the Graph's WIP / multi-commit panels render
	   when a back-snapshot exists. The Graph renders this panel for single-commit rows, so the
	   styles must live here too; without them the Resume button surfaces as a bare unstyled
	   button. Mirrors gl-details-wip-header.css.ts. */
	.metadata-bar .mode-status__group {
		display: inline-flex;
		align-items: center;
		gap: var(--gl-space-4);
	}

	.metadata-bar .mode-status__group code-icon {
		--code-icon-size: 1.2rem;
		--code-icon-v-align: text-bottom;
		opacity: 0.85;
	}

	.metadata-bar .mode-status__resume {
		display: inline-flex;
		align-items: center;
		gap: var(--gl-space-8);
		padding: var(--gl-space-2) var(--gl-space-6);
		font: inherit;
		color: inherit;
		background: transparent;
		border: none;
		border-radius: var(--gl-radius-sm);
		cursor: pointer;
	}

	.metadata-bar .mode-status__resume:hover {
		background: var(--vscode-toolbar-hoverBackground);
		color: var(--vscode-foreground);
	}

	.metadata-bar .mode-status__resume:focus-visible {
		background: var(--vscode-toolbar-hoverBackground);
		color: var(--vscode-foreground);
		outline: var(--gl-border-width) solid var(--vscode-focusBorder);
		outline-offset: -0.1rem;
	}

	.metadata-bar .mode-status__resume-verb {
		font-weight: 500;
	}

	.metadata-bar .mode-status__resume-arrow {
		--code-icon-size: 1.2rem;
		--code-icon-v-align: text-bottom;
		opacity: 0.85;
	}

	/* ── Zone 2: Metadata bar ── */
	:host([variant='embedded']) .metadata-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--gl-panel-padding-right) 0 var(--gl-panel-padding-left);
		gap: var(--gl-space-6);
		flex: none;
		min-width: 0;
		// Contain children's intrinsic overflow so an unwrapped SHA / branch name / date
		// can't bleed into the .commit-detail-panel's scrollWidth and trigger a phantom
		// horizontal scrollbar at narrow sidebar widths.
		overflow: hidden;
		min-height: var(--gl-metadata-bar-min-height);
		font-size: var(--gl-font-sm);
		background-color: var(--gl-metadata-bar-bg);
		border-top: var(--gl-border-width) solid var(--gl-metadata-bar-border);
		border-bottom: var(--gl-border-width) solid var(--gl-metadata-bar-border);
	}
	:host([variant='embedded']) .metadata-bar:has(+ .reachability) {
		border-bottom-color: transparent;
	}

	:host([variant='embedded']) .metadata-bar__left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
		min-width: 0;
		overflow: hidden;
	}
	:host([variant='embedded']) .metadata-bar__left > gl-tooltip,
	:host([variant='embedded']) .metadata-bar__left > gl-popover {
		display: inline-flex;
		flex-shrink: 1;
		min-width: 0;
	}

	:host([variant='embedded']) .metadata-bar__sha {
		flex-shrink: 0;
		font-size: var(--gl-font-base);
	}

	:host([variant='embedded']) .metadata-bar__branch {
		flex: 0 1 auto;
		min-width: 0;
		font-size: var(--gl-font-base);
		color: var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0);
		text-transform: lowercase;
	}
	:host([variant='embedded']) .metadata-bar__branch--tag {
		color: color-mix(in srgb, var(--vscode-editorWarning-foreground, #cca700) 70%, var(--color-foreground) 30%);
	}

	:host([variant='embedded']) .metadata-bar__branch-unreachable {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--color-foreground--65);
		font-style: italic;
	}
	:host([variant='embedded']) .metadata-bar__branch-unreachable code-icon {
		--code-icon-size: 12px;
	}

	:host([variant='embedded']) .metadata-bar__branch-indicator {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		border: none;
		background: transparent;
		cursor: pointer;
		flex-shrink: 1;
		min-width: 0;
		min-height: 2rem;
		box-sizing: border-box;
		overflow: hidden;
		padding: 0 var(--gl-space-4);
		border-radius: var(--gl-radius-sm);
		color: var(--color-foreground--65);
		font-size: inherit;
		font-family: inherit;
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator:hover {
		background: var(--vscode-toolbar-hoverBackground);
		color: var(--color-foreground);
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator:disabled {
		cursor: default;
		opacity: 0.6;
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator:disabled:hover {
		background: transparent;
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator--idle {
		color: var(--color-foreground--50);
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator--warning {
		color: var(--vscode-editorWarning-foreground, #cca700);
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator--error {
		color: var(--vscode-errorForeground, #f48771);
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator code-icon {
		--code-icon-size: 12px;
	}

	:host([variant='embedded']) .metadata-bar__branch-status {
		font-size: var(--gl-font-sm);
	}

	:host([variant='embedded']) .metadata-bar__ref-count {
		font-size: var(--gl-font-micro);
		font-weight: 500;
		color: var(--color-foreground--50);
		flex-shrink: 0;
	}

	:host([variant='embedded']) .metadata-bar__right {
		display: flex;
		align-items: center;
		gap: var(--gl-space-8);
		flex-shrink: 0;
		font-size: var(--gl-font-sm);
		font-weight: 600;
		/* Stats-only cluster (actions now live on the left): keep it inset from the right edge. */
		margin-right: 0.5rem;
	}

	/* Reachability (below metadata bar) */
	:host([variant='embedded']) .reachability {
		display: flex;
		align-items: flex-start;
		gap: var(--gl-space-6);
		padding: 0.2rem var(--gl-panel-padding-right) 0.4rem var(--gl-panel-padding-left);
		font-size: var(--gl-font-base);
		flex: none;
		background-color: var(--gl-metadata-bar-bg);
		border-bottom: var(--gl-border-width) solid var(--gl-metadata-bar-border);
	}

	:host([variant='embedded']) .reachability__load-all {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-left: auto;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: var(--gl-space-4);
		color: var(--color-foreground);
		border-radius: var(--gl-radius-sm);
	}
	:host([variant='embedded']) .reachability__load-all:hover {
		background: var(--vscode-toolbar-hoverBackground);
	}
	:host([variant='embedded']) .reachability__load-all code-icon {
		--code-icon-size: 16px;
	}

	/* ── Zone 3: Message ── */
	:host([variant='embedded']) .message {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0.8rem var(--gitlens-scrollbar-gutter-width) 0 var(--gl-panel-padding-left);
		overflow: hidden;
	}

	:host([variant='embedded']) .message .message-block {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		border: none;
		background: none;
		padding: 0;
		border-radius: 0;
	}

	:host([variant='embedded']) .message .message-block__text {
		--_fade-bg: var(--titlebar-bg, var(--color-background));

		max-height: none;
		overflow-y: auto;
		scroll-timeline: --msg-scroll block;
		flex: 1;
		min-height: 0;
		padding-bottom: var(--gl-space-6);

		/* Scrollbar: fade in on hover/focus, hidden otherwise */
		border-color: transparent;
		transition: border-color 1s linear;
	}
	:host([variant='embedded']) .message .message-block__text:hover,
	:host([variant='embedded']) .message .message-block__text:focus-within {
		border-color: var(--vscode-scrollbarSlider-background);
		transition: none;
	}

	:host([variant='embedded']) .message .message-block__text::-webkit-scrollbar-thumb {
		background-color: transparent;
		border-color: inherit;
		border-right-style: inset;
		border-right-width: calc(100vw + 100vh);
	}
	:host([variant='embedded']) .message .message-block__text::-webkit-scrollbar-thumb:hover {
		border-color: var(--vscode-scrollbarSlider-hoverBackground);
	}
	:host([variant='embedded']) .message .message-block__text::-webkit-scrollbar-thumb:active {
		border-color: var(--vscode-scrollbarSlider-activeBackground);
	}

	:host([variant='embedded']) .message .message-block__text::before,
	:host([variant='embedded']) .message .message-block__text::after {
		content: '';
		display: block;
		position: sticky;
		z-index: 1;
		pointer-events: none;
		opacity: 0;
		animation: linear both;
		animation-timeline: --msg-scroll;
	}
	:host([variant='embedded']) .message .message-block__text::before {
		top: 0;
		height: 2.4rem;
		margin-bottom: -2.4rem;
		background: linear-gradient(to bottom, var(--_fade-bg) 25%, transparent);
		animation-name: scroll-fade-in;
	}
	:host([variant='embedded']) .message .message-block__text::after {
		bottom: -0.6rem;
		height: 3.6rem;
		margin-top: -3.6rem;
		background: linear-gradient(to top, var(--_fade-bg) 25%, transparent);
		animation-name: scroll-fade-out;
	}

	:host([variant='embedded']) .message .message-block__text strong {
		font-size: var(--gl-font-lg);
		display: block;
		margin-bottom: var(--gl-space-2);
	}

	:host([variant='embedded']) .message .message-block__copy {
		position: sticky;
		top: 0;
		z-index: 2;
		display: block;
		width: fit-content;
		margin-left: auto;
		margin-right: -0.4rem;
		margin-bottom: -2.4rem;
		background: var(--vscode-sideBar-background, var(--color-background));
		padding: var(--gl-space-2);
		border-radius: var(--gl-radius-sm);
		opacity: 1;
		transition: color var(--gl-duration-fast) ease;
	}

	/* ── Zone 4: Autolinks footer ── */
	:host([variant='embedded']) .autolinks {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin: 0.2rem var(--gl-panel-padding-right) 0.4rem var(--gl-panel-padding-left);
		font-size: var(--gl-font-sm);
		flex: none;
	}
	:host([variant='embedded']) .autolinks gl-action-chip[data-action='autolink-settings'] {
		color: var(--color-foreground--65);
		--code-icon-size: 12px;
	}

	:host([variant='embedded']) .autolinks__label {
		display: flex;
		align-items: center;
		gap: var(--gl-space-4);
		font-size: var(--gl-font-sm);
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-foreground--50);
		white-space: nowrap;
	}
	:host([variant='embedded']) .autolinks__label code-icon {
		opacity: 0.5;
	}

	/* ── Zone 5: AI input ── */
	:host([variant='embedded']) gl-ai-input {
		width: calc(100% - var(--gl-panel-padding-left) - var(--gl-panel-padding-right));
		max-width: var(--gl-max-input);
		margin: 0.2rem auto;
	}

	/* ── Zone 6: Bottom section (split panel end slot) ── */
	:host([variant='embedded']) .bottom-section {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 120px;
		overflow: hidden;
	}

	/* Split panel divider */
	:host([variant='embedded']) .split::part(divider) {
		background-color: transparent !important;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--gl-space-4) 0;
	}

	/* ── Scroll fade keyframes ── */
	@keyframes scroll-fade-in {
		0% {
			opacity: 0;
		}
		1%,
		100% {
			opacity: 1;
		}
	}

	@keyframes scroll-fade-out {
		0%,
		95% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	/* Groups nav (back/forward) with the contextual jump chip into one "move around" cluster,
	   slotted into the header's right-anchored actions next to Refresh. */
	.nav-jump {
		display: inline-flex;
		align-items: center;
		gap: var(--gl-space-2);
	}

	/* Pinned cue: warning-tinted pin chip. Scopes the old full-band gl-inspect-nav warning
	   (color = automatic following is suspended) down to the single relevant control. */
	gl-action-chip.pin-action.pinned::part(base) {
		color: var(--color-alert-warningForeground);
		background-color: var(--color-alert-warningBackground);
	}
	gl-action-chip.pin-action.pinned::part(icon) {
		color: var(--color-alert-warningForeground);
	}
	gl-action-chip.pin-action.pinned:hover::part(base) {
		background-color: var(--color-alert-warningHoverBackground);
	}
`;var cU=Object.defineProperty,cW=Object.getOwnPropertyDescriptor,cH=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?cW(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&cU(t,i,s),s};try{CSS.registerProperty({name:"--angle",syntax:"<angle>",inherits:!1,initialValue:"0deg"})}catch{}let cV=class extends lit_element_i{constructor(){super(...arguments),this.busy=!1,this.disabled=!1,this.placeholder="Optional guidance for the AI explanation...",this.buttonLabel="Explain",this.busyLabel="Explaining changes…",this.eventName="gl-explain",this.multiline=!1,this.active=!1,this.appearance="default",this.floatingFooter=!1,this.rows=1,this.onFooterSlotChange=e=>{let t=e.target.assignedElements({flatten:!0}).length>0;this.toggleAttribute("has-footer",t)}}focus(e){this.inputEl?.focus(e)}render(){let e=this.rows>1?`${1.4*this.rows}em`:null,t=this.multiline?ex`<textarea
					part="input"
					rows=${this.rows}
					style=${aO({"--gl-ai-input-min-height":e})}
					aria-label=${this.placeholder}
					placeholder=${this.busy?this.busyLabel:this.placeholder}
					?disabled=${this.disabled||this.busy}
					@input=${this.onInput}
					@focus=${this.onFocusChange}
					@blur=${this.onFocusChange}
					@keydown=${this.onKeydown}
				></textarea>`:ex`<input
					type="search"
					part="input"
					size="1"
					aria-label=${this.placeholder}
					placeholder=${this.busy?this.busyLabel:this.placeholder}
					?disabled=${this.disabled||this.busy}
					@input=${this.onInput}
					@focus=${this.onFocusChange}
					@blur=${this.onFocusChange}
					@keydown=${this.onKeydown}
				/>`,i=ex`<div class="ai-input__footer" part="footer">
			<slot name="footer" @slotchange=${this.onFooterSlotChange}></slot>
		</div>`;return"detached"===this.appearance?ex`<div class="ai-input__box">
					<div class="ai-input__row">${t}</div>
					${i}
				</div>
				<div class="ai-input__actions">${this.renderDetachedButton()}<slot name="actions"></slot></div>`:ex`<div class="ai-input__row">${t}${this.renderActionButton()}</div>
			${i}`}renderActionButton(){return ex`<gl-tooltip
			content=${this.disabled&&this.disabledReason?this.disabledReason:this.buttonTooltip??this.buttonLabel}
			placement="bottom"
			><button
				class="action-btn"
				part="button"
				aria-label=${this.buttonLabel}
				aria-busy=${this.busy?"true":e$}
				aria-disabled=${this.disabled&&!this.busy?"true":e$}
				tabindex=${this.disabled&&!this.busy?-1:e$}
				?disabled=${this.busy}
				@click=${this.onSubmit}
			>
				${this.busy?ex`<code-icon icon="loading" modifier="spin"></code-icon>`:ex`<span class="icon-slider"
							><code-icon class="icon-sparkle" icon="sparkle"></code-icon
							><code-icon class="icon-send" icon="send"></code-icon
						></span>`}
				<span class="action-label">${this.buttonLabel}</span>
			</button></gl-tooltip
		>`}renderDetachedButton(){return ex`<gl-tooltip
			content=${this.disabled&&this.disabledReason?this.disabledReason:this.buttonTooltip??this.buttonLabel}
			placement="top"
			><button
				class="detached-btn"
				part="button"
				aria-label=${this.buttonLabel}
				aria-busy=${this.busy?"true":e$}
				aria-disabled=${this.disabled&&!this.busy?"true":e$}
				tabindex=${this.disabled&&!this.busy?-1:e$}
				?disabled=${this.busy}
				@click=${this.onSubmit}
			>
				${this.busy?ex`<code-icon icon="loading" modifier="spin"></code-icon>`:e$}
				<span class="action-label">${this.buttonLabel}</span>
			</button></gl-tooltip
		>`}get inputEl(){return this.shadowRoot?.querySelector("input, textarea")}firstUpdated(){let e=this.inputEl;null!=e&&null!=this.value&&(e.value=this.value,this.toggleAttribute("has-value",!!this.value))}onInput(){this.toggleAttribute("has-value",!!this.inputEl?.value)}onFocusChange(){let e=this.inputEl===this.shadowRoot?.activeElement,t=this.hasAttribute("focused");this.toggleAttribute("focused",e),!e||t||this.busy?e||this.removeAttribute("focusing"):this.toggleAttribute("focusing",!0)}onKeydown(e){if("Enter"===e.key){if(e.shiftKey)return;e.preventDefault(),this.onSubmit();return}if("ArrowUp"===e.key&&null!=this.recall&&""!==this.recall){let t=this.inputEl;if(null==t||""!==t.value)return;e.preventDefault(),t.value=this.recall,t.setSelectionRange(this.recall.length,this.recall.length),this.toggleAttribute("has-value",!0)}}onSubmit(){if(this.disabled||this.busy)return;let e=this.inputEl?.value?.trim()||void 0;this.dispatchEvent(new CustomEvent(this.eventName,{detail:{prompt:e},bubbles:!0,composed:!0}))}};cV.styles=j`
		/* The host is the unified panel: it owns the pill border + gradient treatment so the input
		   row and footer read as one rounded AI surface (children round their own outer corners to
		   match, since the tooltips can't live under an overflow:hidden ancestor). */
		:host {
			--gradient-start: var(--gl-ai-accent-1);
			--gradient-mid: var(--gl-ai-accent-2);
			--gradient-end: var(--gl-ai-accent-3);
			--ai-action-fill: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));

			position: relative;
			display: flex;
			flex: none;
			flex-direction: column;
			min-width: 0;
			background: var(--vscode-input-background);
			border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
			border-radius: var(--gl-radius-md);
			transition:
				border-color var(--gl-duration-x-slow),
				box-shadow var(--gl-duration-x-slow),
				background var(--gl-duration-x-slow);
		}

		/* The textarea/input + action button row, sitting inside the unified panel (the host). */
		.ai-input__row {
			position: relative;
			z-index: 1;
			display: flex;
			align-items: stretch;
			min-width: 0;
		}

		/* Footer — only shown when the consumer slots content (e.g. the model chip). Sits inside
		   the unified panel, set off by a hairline divider + a whisper of accent tint. The
		   has-footer host attribute is toggled by slotchange so an empty slot renders nothing. */
		.ai-input__footer {
			display: none;
			align-items: center;
			min-height: 0;
			padding: 0.2rem 0.5rem;
			color: var(--vscode-descriptionForeground);
			background: color-mix(in srgb, var(--gl-ai-accent-1) 5%, transparent);
			border-top: var(--gl-border-width) solid var(--vscode-input-border, transparent);
			border-radius: 0 0 var(--gl-radius-md) var(--gl-radius-md);
		}

		:host([has-footer]) .ai-input__footer {
			display: flex;
		}

		/* Let the slotted chip span the footer so its trailing content (consumption rate) can
		   sit at the far end. */
		.ai-input__footer slot {
			display: flex;
			flex: 1;
			min-width: 0;
		}

		.ai-input__footer ::slotted(*) {
			flex: 1;
			min-width: 0;
		}

		/* Floating footer — hangs flush off the input's bottom on focus (attached, not a detached
		   popup), overlaying content below so it never reserves a row. For compact inputs (Explain). */
		:host([floating-footer]) .ai-input__footer {
			position: absolute;
			top: calc(100% - var(--gl-border-width));
			right: 0;
			left: 0;
			z-index: 2;
			background: color-mix(in srgb, var(--gl-ai-accent-1) 5%, var(--vscode-input-background));
			border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
			border-radius: 0 0 var(--gl-radius-md) var(--gl-radius-md);
			opacity: 0;
			transform: translateY(-0.2rem);
			pointer-events: none;
			transition:
				opacity var(--gl-duration-fast),
				transform var(--gl-duration-fast);
		}

		:host([floating-footer]:focus-within) .ai-input__footer {
			opacity: 1;
			transform: none;
			pointer-events: auto;
		}

		/* While the attached footer shows, square the panel's bottom so the two read as one surface. */
		:host([floating-footer]:focus-within) {
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		}

		@media (prefers-reduced-motion: reduce) {
			:host([floating-footer]) .ai-input__footer {
				transition: none;
				transform: none;
			}
		}

		/* Hover / Focus / Active: gradient border glow on the unified panel */
		:host(:hover),
		:host([focused]),
		:host([active]) {
			background:
				linear-gradient(var(--vscode-input-background), var(--vscode-input-background)) padding-box,
				linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end)) border-box;
			border-color: transparent;
			box-shadow: 0 0 8px rgb(124 58 237 / 25%);
		}

		/* Focus-in: same spinning conic gradient as busy, one rotation */
		:host([focusing]) {
			background:
				linear-gradient(var(--vscode-input-background), var(--vscode-input-background)) padding-box,
				conic-gradient(
						from var(--angle, 0deg),
						var(--gradient-start),
						var(--gradient-mid),
						var(--gradient-end),
						var(--gradient-start)
					)
					border-box;
			border-color: transparent;
			transition: none;
			animation: ai-spin 2s linear 1;
		}

		/* Busy: spinning conic gradient border */
		:host([busy]) {
			background:
				linear-gradient(var(--vscode-input-background), var(--vscode-input-background)) padding-box,
				conic-gradient(
						from var(--angle, 0deg),
						var(--gradient-start),
						var(--gradient-mid),
						var(--gradient-end),
						var(--gradient-start)
					)
					border-box;
			border-color: transparent;
			animation: ai-spin 2s linear infinite;
		}

		@keyframes ai-spin {
			to {
				--angle: 360deg;
			}
		}

		input,
		textarea {
			flex: 1;
			width: 0;
			min-width: 0;
			max-width: none;
			padding: 0.4rem 0.7rem;
			margin: 0;
			font-family: var(--vscode-font-family);
			font-size: var(--vscode-font-size);
			color: var(--vscode-input-foreground);
			outline: none;
			background: transparent;
			border: none;
		}

		textarea {
			/* min-height comes from --gl-ai-input-min-height (set on the host via CSSOM in
		   updated()) so callers can request a 2-row default without affecting the explain
		   inputs that want a single row. */
			min-height: var(--gl-ai-input-min-height, 1.4em);
			max-height: 6em;
			line-height: 1.4;
			resize: none;
			scrollbar-color: var(--vscode-scrollbarSlider-background) transparent;
			scrollbar-width: thin;
			field-sizing: content;
		}

		textarea::-webkit-scrollbar {
			width: 6px;
		}

		textarea::-webkit-scrollbar-thumb {
			background-color: var(--vscode-scrollbarSlider-background);
			border-radius: var(--gl-radius-sm);
		}

		textarea::-webkit-scrollbar-thumb:hover {
			background-color: var(--vscode-scrollbarSlider-hoverBackground);
		}

		textarea::-webkit-scrollbar-track {
			background: transparent;
		}

		textarea::placeholder {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		input::placeholder,
		textarea::placeholder {
			color: var(--vscode-input-placeholderForeground);
		}

		input::-webkit-search-cancel-button {
			width: 16px;
			height: 16px;
			-webkit-appearance: none;
			cursor: pointer;
			background-color: var(--vscode-foreground);
			-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z'/%3E%3C/svg%3E");
			-webkit-mask-size: contain;
		}

		/* Inset floating pill — sits centered inside the panel with a small gap on all sides
		   (matches the design) rather than filling the panel's right edge. */
		.action-btn {
			z-index: 1;
			display: flex;
			flex: none;
			gap: 0.5rem;
			align-items: center;
			align-self: center;
			padding: 0.3rem 1rem 0.3rem 0.8rem;
			margin: 0.3rem;
			font-family: inherit;
			font-size: var(--vscode-font-size);
			font-weight: 500;
			color: var(--vscode-foreground);
			white-space: nowrap;
			cursor: pointer;
			background: transparent;
			border: none;
			border-radius: var(--gl-radius-md);
			transition:
				background var(--gl-duration-slow),
				color var(--gl-duration-slow),
				box-shadow var(--gl-duration-slow),
				flex-direction var(--gl-duration-x-slow);
		}

		/* Soft accent glow under the pill whenever it's filled (active / hover / focus / text / busy). */
		:host([active]) .action-btn,
		:host([busy]) .action-btn,
		.action-btn:hover:not(:disabled),
		:host(:hover) .action-btn:not(:disabled),
		.action-btn:focus:not(:disabled),
		:host([focused]) .action-btn,
		:host([has-value]) .action-btn {
			box-shadow: 0 1px 6px color-mix(in srgb, var(--gl-ai-accent-1) 30%, transparent);
		}

		/* Hovering anywhere in the row lights up the button too, so the pill responds as
	   one cohesive surface (the row's conic border already reacts to :host(:hover)). */
		.action-btn:hover:not(:disabled),
		:host(:hover) .action-btn:not(:disabled) {
			color: var(--vscode-button-foreground);
			background: var(--ai-action-fill);
		}

		.action-btn:hover:not(:disabled) .icon-sparkle,
		:host(:hover) .action-btn:not(:disabled) .icon-sparkle {
			color: var(--vscode-button-foreground);
		}

		/* Keyboard-visible focus ring on the button (fill + sparkle→send morph handled above). */
		.action-btn:focus-visible {
			${rh}
		}

		.action-btn:disabled {
			pointer-events: none;
			cursor: default;
			opacity: 0.6;
		}

		/* Unavailable state — uses aria-disabled (not native disabled) so the button stays hoverable
		   and its reason tooltip can show; onSubmit + tabindex guard activation/focus. Flat + muted,
		   no gradient / glow / send-morph. Higher specificity than the active / has-value / hover
		   fills so it wins in every state. Busy is a separate natively-disabled "working" state
		   (dimmed spinner) handled by the base rule above + the aria-busy fill. */
		:host(:not([busy])) .action-btn[aria-disabled='true'] {
			flex-direction: row;
			padding: 0.3rem 1rem 0.3rem 0.8rem;
			color: var(--vscode-disabledForeground, var(--vscode-descriptionForeground));
			background: color-mix(in srgb, var(--vscode-foreground) 8%, transparent);
			box-shadow: none;
			opacity: 1;
			cursor: default;
		}

		:host(:not([busy])) .action-btn[aria-disabled='true'] .icon-sparkle {
			color: inherit;
			opacity: 1;
			transform: translateX(0);
		}

		:host(:not([busy])) .action-btn[aria-disabled='true'] .icon-send {
			opacity: 0;
			transform: translateX(100%);
		}

		.action-btn[aria-busy='true'] {
			color: var(--vscode-button-foreground);
			background: var(--ai-action-fill);
		}

		/* Send mode: morph sparkle→send + fill when the input or the button has focus, or there's
		   text — for every AI mode. Keyed off host attributes + button focus because the button is
		   nested in gl-tooltip, so the input ~ .action-btn sibling combinator can't reach it. */
		:host([focused]) .action-btn,
		:host([has-value]) .action-btn,
		.action-btn:focus {
			flex-direction: row-reverse;
			gap: 0.5rem;
			padding-right: var(--gl-space-8);
			padding-left: var(--gl-space-10);
			color: var(--vscode-button-foreground);
			background: var(--ai-action-fill);
		}

		/* Active mode: border glow + button always active (for review/compose) */
		:host([active]) .action-btn {
			color: var(--vscode-button-foreground);
			background: var(--ai-action-fill);
		}

		:host([active]) .action-btn .icon-sparkle {
			color: var(--vscode-button-foreground);
		}

		:host([focused]) .action-btn .icon-sparkle,
		:host([has-value]) .action-btn .icon-sparkle,
		.action-btn:focus .icon-sparkle {
			opacity: 0;
			transform: translateX(-100%);
		}

		:host([focused]) .action-btn .icon-send,
		:host([has-value]) .action-btn .icon-send,
		.action-btn:focus .icon-send {
			opacity: 1;
			transform: translateX(0);
		}

		.icon-slider {
			position: relative;
			flex-shrink: 0;
			width: 16px;
			height: 16px;
			overflow: hidden;
		}

		.icon-sparkle,
		.icon-send {
			position: absolute;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			transition:
				transform var(--gl-duration-x-slow) ease,
				opacity var(--gl-duration-x-slow) ease;
		}

		.icon-sparkle {
			color: #c594ff;
			opacity: 1;
			transform: translateX(0);
		}

		.icon-send {
			opacity: 0;
			transform: translateX(100%);
		}

		.action-label {
			line-height: 1;
		}

		/* ── Detached appearance ──────────────────────────────────────────────────────
		   The submit button leaves the input and renders below (as a plain primary); the
		   pill moves from the host to an inner .ai-input__box; the slotted footer becomes
		   a tab clipped to the box's top-right edge. */
		:host([appearance='detached']),
		:host([appearance='detached']:hover),
		:host([appearance='detached'][focused]),
		:host([appearance='detached'][active]),
		:host([appearance='detached'][focusing]) {
			gap: var(--gl-space-8);
			background: transparent;
			border-color: transparent;
			box-shadow: none;
		}

		.ai-input__box {
			display: none;
		}

		:host([appearance='detached']) .ai-input__box {
			position: relative;
			display: block;
			margin-top: 0.4rem;
			background: var(--vscode-input-background);
			border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
			border-radius: var(--gl-radius-md);
		}

		:host([appearance='detached']) .ai-input__box:focus-within {
			border-color: var(--vscode-focusBorder);
		}

		/* Footer → a tab clipped to the box's top-right edge. The chip keeps its own look;
		   only its container is re-anchored. Overlapping the border by 1px removes the seam. */
		:host([appearance='detached']) .ai-input__footer {
			position: absolute;
			right: var(--gl-space-8);
			bottom: calc(100% - var(--gl-border-width));
			min-width: 0;
			padding: 0.1rem 0.4rem;
			background: color-mix(in srgb, var(--gl-ai-accent-1) 5%, var(--vscode-input-background));
			border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
			border-bottom: none;
			border-radius: var(--gl-radius-sm) var(--gl-radius-sm) 0 0;
		}

		:host([appearance='detached']) .ai-input__footer slot,
		:host([appearance='detached']) .ai-input__footer ::slotted(*) {
			flex: 0 1 auto;
		}

		.ai-input__actions {
			display: none;
		}

		:host([appearance='detached']) .ai-input__actions {
			display: flex;
			gap: var(--gl-space-8);
			align-items: stretch;
		}

		.detached-btn {
			flex: 1;
			min-width: 0;
			display: inline-flex;
			gap: var(--gl-space-6);
			align-items: center;
			justify-content: center;
			padding: 0.4rem 1rem;
			font-family: inherit;
			font-size: var(--vscode-font-size);
			font-weight: 500;
			line-height: 1.35;
			white-space: nowrap;
			color: var(--vscode-button-foreground);
			background: var(--gl-ai-submit-bg, var(--vscode-button-background));
			border: none;
			border-radius: var(--gl-radius-sm);
			cursor: pointer;
			transition: background var(--gl-duration-fast);
		}

		.detached-btn:hover:not([aria-disabled='true']) {
			background: var(
				--gl-ai-submit-hover-bg,
				var(--vscode-button-hoverBackground, var(--vscode-button-background))
			);
		}

		.detached-btn:focus-visible {
			${rh}
		}

		.detached-btn[aria-disabled='true'] {
			cursor: default;
			opacity: 0.6;
		}
	`,cH([ej({type:Boolean,reflect:!0})],cV.prototype,"busy",2),cH([ej({type:Boolean})],cV.prototype,"disabled",2),cH([ej()],cV.prototype,"value",2),cH([ej()],cV.prototype,"placeholder",2),cH([ej({attribute:"button-label"})],cV.prototype,"buttonLabel",2),cH([ej({attribute:"button-tooltip"})],cV.prototype,"buttonTooltip",2),cH([ej({attribute:"disabled-reason"})],cV.prototype,"disabledReason",2),cH([ej({attribute:"busy-label"})],cV.prototype,"busyLabel",2),cH([ej({attribute:"event-name"})],cV.prototype,"eventName",2),cH([ej({type:Boolean,reflect:!0})],cV.prototype,"multiline",2),cH([ej({type:Boolean,reflect:!0})],cV.prototype,"active",2),cH([ej({reflect:!0})],cV.prototype,"appearance",2),cH([ej({type:Boolean,reflect:!0,attribute:"floating-footer"})],cV.prototype,"floatingFooter",2),cH([ej({type:Number})],cV.prototype,"rows",2),cH([ej()],cV.prototype,"recall",2),cV=cH([eM("gl-ai-input")],cV);var cK=Object.defineProperty,cG=Object.getOwnPropertyDescriptor,cZ=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?cG(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&cK(t,i,s),s};let cY=class extends lit_element_i{constructor(){super(...arguments),this.onClick=e=>{e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("switch-model",{bubbles:!0,composed:!0}))}}render(){let e=this.model,t=null!=e?`${e.name} via ${e.provider.name}`:void 0;return ex`<gl-tooltip>
				<button class="chip" type="button" @click=${this.onClick}>
					<span class="chip__model">${e?.name??"Choose AI Model…"}</span>
					${null!=e?ex`<span class="chip__provider">${e.provider.name}</span>`:e$}
					<code-icon icon="chevron-down" class="chip__chevron" aria-hidden="true"></code-icon>
				</button>
				<span slot="content"
					>${null!=t?ex`Switch AI Model
								<hr />
								${t}`:"Choose AI Model"}</span
				>
			</gl-tooltip>
			${e?.consumptionRateLabel?ex`<span class="chip__rate"
						><code-icon icon="zap" class="chip__rate-icon" aria-hidden="true"></code-icon
						>${e.consumptionRateLabel}</span
					>`:e$}`}};function cX(e="autolink",t="merged",i=!1){let o,r;switch(e){case"issue":r="closed"===t?"issue-closed":"issue-opened",o="closed"===t?"pass":"issues";break;case"pr":switch(t){case"merged":r="pr-merged",o="git-merge";break;case"closed":r="pr-closed",o="git-pull-request-closed";break;default:r=i?"pr-draft":"pr-opened",o=i?"git-pull-request-draft":"git-pull-request"}break;default:r="",o="link"}return{icon:o,modifier:r}}cY.styles=j`
		:host {
			display: flex;
			gap: 0.4rem;
			align-items: center;
			width: 100%;
			min-width: 0;
		}

		/* gl-tooltip wraps the clickable model button; keep it shrinkable so the label ellipsizes. */
		gl-tooltip {
			min-width: 0;
		}

		.chip {
			display: inline-flex;
			gap: 0.4rem;
			align-items: center;
			max-width: 100%;
			min-width: 0;
			padding: 0.1rem 0.4rem;
			font-family: inherit;
			font-size: var(--gl-font-micro);
			line-height: 1.4;
			color: var(--vscode-descriptionForeground);
			text-align: left;
			cursor: pointer;
			background: transparent;
			border: var(--gl-border-width) solid transparent;
			border-radius: var(--gl-radius-sm);
			transition:
				color var(--gl-duration-fast),
				background var(--gl-duration-fast),
				border-color var(--gl-duration-fast);
		}

		.chip:hover,
		.chip:focus-visible {
			outline: none;
			background: var(--vscode-toolbar-hoverBackground, var(--vscode-list-hoverBackground));
			border-color: var(--vscode-toolbar-hoverOutline, transparent);
		}

		/* Model name leads (foreground); provider trails, quieter — no separator, the
		   weight/color contrast carries the split. Provider clips before the model name. */
		.chip__model {
			flex: 0 1 auto;
			min-width: 0;
			overflow: hidden;
			font-weight: 500;
			color: var(--vscode-foreground);
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.chip__provider {
			flex: 0 8 auto;
			min-width: 0;
			overflow: hidden;
			color: var(--vscode-descriptionForeground);
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.chip:hover .chip__provider,
		.chip:focus-visible .chip__provider {
			color: var(--vscode-foreground);
		}

		.chip__chevron {
			flex-shrink: 0;
			--code-icon-size: 10px;

			opacity: 0.7;
		}

		/* Consumption rate — GitKraken AI models only. Quiet, right-aligned, non-interactive info. */
		.chip__rate {
			display: inline-flex;
			flex: none;
			gap: 0.2rem;
			align-items: center;
			margin-left: auto;
			padding-left: 0.4rem;
			font-size: var(--gl-font-micro);
			color: var(--vscode-descriptionForeground);
			white-space: nowrap;
		}

		.chip__rate-icon {
			flex-shrink: 0;
			--code-icon-size: 10px;

			opacity: 0.7;
		}

		/* gl-tooltip's own hr rule only reaches its fallback content; slotted content lives in
		   this component's shadow tree, so restyle the divider here to match other tooltips. */
		[slot='content'] hr {
			margin: var(--gl-space-4) 0;
			border: none;
			border-top: var(--gl-border-width) solid var(--color-foreground--25);
		}
	`,cZ([ej({type:Object})],cY.prototype,"model",2),cY=cZ([eM("gl-ai-model-chip")],cY);let cJ=()=>({toAttribute:e=>e.getTime(),fromAttribute:(e,t)=>{let i=new Date(e);return isNaN(i.getTime())?new Date(parseInt(e,10)):i}});var cQ=Object.defineProperty,c0=Object.getOwnPropertyDescriptor,c1=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?c0(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&cQ(t,i,s),s};let c2=class extends lit_element_i{constructor(){super(...arguments),this.dateStyle="relative",this.date=new Date,this.tooltip="",this.short=!1}get absoluteDate(){return tK(this.date,this.format??"MMMM Do, YYYY h:mma")}get dateLabel(){return"relative"===this.dateStyle?tV(this.date,this.short):this.absoluteDate}render(){return ex`<gl-tooltip content="${this.tooltip} ${this.absoluteDate}"
			><time part="base" datetime="${this.date.toISOString()}">${this.dateLabel}</time></gl-tooltip
		>`}};c1([ej()],c2.prototype,"format",2),c1([ej({attribute:"date-style"})],c2.prototype,"dateStyle",2),c1([ej({converter:cJ(),reflect:!0,attribute:!1})],c2.prototype,"date",2),c1([ej()],c2.prototype,"tooltip",2),c1([ej({type:Boolean})],c2.prototype,"short",2),c2=c1([eM("formatted-date")],c2);var c5=Object.defineProperty,c3=Object.getOwnPropertyDescriptor,c4=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?c3(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&c5(t,i,s),s};let c6=class extends GlElement{constructor(){super(...arguments),this.url="",this.name="",this.status="merged",this.type="autolink",this.identifier="",this.details=!1,this.openOnRemote=!1}get typeLabel(){switch(this.type){case"issue":return"Issue ";case"pr":return"PR ";default:return""}}renderDate(){return this.date?ex`<formatted-date
			.date=${new Date(this.date)}
			.format=${this.dateFormat}
			.dateStyle=${this.dateStyle}
		></formatted-date>`:e$}render(){let{icon:e,modifier:t}=cX(this.type,this.status,this.isDraft);return this.compact?ex`
				<span class="icon icon--${t}"><code-icon icon=${e}></code-icon></span>
				<p class="title">${this.identifier}</p>
			`:ex`
			<span class="icon icon--${t}"><code-icon icon=${e}></code-icon></span>
			<p class="title">
				<a href="${this.url}">${this.name}</a>
			</p>
			<p class="date">
				${this.typeLabel}${this.identifier}${this.author?ex` by ${this.author}`:e$}
				${this.isDraft?ex` <span class="badge">Draft</span>`:e$}
				${this.status?ex` ${this.status}`:e$} ${this.renderDate()}
			</p>
			${this.renderReviewDecision()}
			${s3(!0===this.details||!0===this.openOnRemote,()=>ex`
					<p class="details">
						${this.details?ex`<gl-button
									appearance="toolbar"
									tooltip="Open Details"
									@click=${()=>this.onDetailsClicked()}
									><code-icon icon="eye"></code-icon
								></gl-button>`:e$}
						${this.openOnRemote&&this.url?ex`<gl-button appearance="toolbar" tooltip="Open on Remote" href=${this.url}
									><code-icon icon="globe"></code-icon
								></gl-button>`:e$}
					</p>
				`)}
		`}renderReviewDecision(){let e,t,i;if(!this.reviewDecision||"pr"!==this.type)return e$;switch(this.reviewDecision){case"Approved":e="Approved",t="pass",i="review--approved";break;case"ChangesRequested":e="Changes Requested",t="request-changes",i="review--changes-requested";break;case"ReviewRequired":e="Review Required",t="comment-unresolved",i="review--review-required";break;default:return e$}return ex`<p class="review ${i}"><code-icon icon=${t}></code-icon> ${e}</p>`}onDetailsClicked(){this.emit("gl-issue-pull-request-details",{id:this.itemId??"",providerId:this.providerId})}};c6.styles=j`
		:host {
			display: grid;
			grid-template-columns: min-content 1fr min-content;
			gap: 0.25rem 0.6rem;
			justify-content: start;
			font-size: var(--gl-font-base);
		}

		:host([compact]) {
			grid-template-columns: min-content 1fr;
		}

		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}

		.icon {
			grid-row: 1 / 3;
			grid-column: 1;
			padding-top: 0.1rem;
			text-align: center;
		}

		.icon--pr-opened {
			color: var(--vscode-gitlens-openPullRequestIconColor);
		}

		.icon--pr-closed {
			color: var(--vscode-gitlens-closedPullRequestIconColor);
		}

		.icon--pr-merged {
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
		}

		.icon--pr-draft {
			color: var(--vscode-descriptionForeground);
		}

		.icon--issue-opened {
			color: var(--vscode-gitlens-openAutolinkedIssueIconColor);
		}

		.icon--issue-closed {
			color: var(--vscode-gitlens-closedAutolinkedIssueIconColor);
		}

		.title {
			grid-row: 1;
			grid-column: 2;
			margin: 0;
		}

		.date {
			grid-row: 2;
			grid-column: 2;
			margin: 0;
		}

		.details {
			display: flex;
			grid-row: 1 / 3;
			grid-column: 3;
			gap: var(--gl-space-2);
			align-items: center;
			margin: 0;
		}

		.badge {
			display: inline-block;
			padding: 0.1rem 0.4rem;
			font-size: 0.9em;
			line-height: 1;
			border: var(--gl-border-width) solid var(--color-foreground--50);
			border-radius: var(--gl-radius-sm);
			opacity: 0.8;
		}

		.review {
			display: flex;
			grid-column: 2;
			gap: 0.3rem;
			align-items: center;
			margin: 0;
		}

		.review--approved {
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
		}

		.review--changes-requested {
			color: var(--vscode-gitlens-closedPullRequestIconColor);
		}

		.review--review-required {
			opacity: 0.8;
		}
	`,c4([ej()],c6.prototype,"url",2),c4([ej()],c6.prototype,"name",2),c4([ej()],c6.prototype,"date",2),c4([ej()],c6.prototype,"dateFormat",2),c4([ej()],c6.prototype,"dateStyle",2),c4([ej()],c6.prototype,"status",2),c4([ej()],c6.prototype,"type",2),c4([ej()],c6.prototype,"identifier",2),c4([ej({attribute:"item-id"})],c6.prototype,"itemId",2),c4([ej({attribute:"provider-id"})],c6.prototype,"providerId",2),c4([ej({type:Boolean,reflect:!0})],c6.prototype,"compact",2),c4([ej()],c6.prototype,"author",2),c4([ej({type:Boolean})],c6.prototype,"isDraft",2),c4([ej()],c6.prototype,"reviewDecision",2),c4([ej({type:Boolean})],c6.prototype,"details",2),c4([ej({type:Boolean})],c6.prototype,"openOnRemote",2),c6=c4([eM("issue-pull-request")],c6);var c7=Object.defineProperty,c8=Object.getOwnPropertyDescriptor,c9=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?c8(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&c7(t,i,s),s};let he=class extends lit_element_i{constructor(){super(...arguments),this.url="",this.name="",this.status="merged",this.type="autolink",this.identifier="",this.details=!1,this.openOnRemote=!1}render(){let{icon:e,modifier:t}=cX(this.type,this.status,this.isDraft);return ex`<gl-popover trigger="hover focus click">
			<gl-action-chip
				exportparts="icon"
				slot="anchor"
				icon=${e}
				overlay="none"
				label=${this.getAccessibleLabel()}
				class="chip--${t}"
				><span part="label">${this.identifier}</span></gl-action-chip
			>
			<div slot="content">
				<issue-pull-request
					type=${this.type}
					name=${this.name}
					url="${this.url}"
					identifier=${this.identifier}
					status=${this.status}
					.date=${this.date}
					.dateFormat=${this.dateFormat}
					.dateStyle=${this.dateStyle}
					.author=${this.author}
					?isDraft=${this.isDraft}
					.reviewDecision=${this.reviewDecision}
					?details=${this.details}
					?openOnRemote=${this.openOnRemote}
					.itemId=${this.itemId}
					.providerId=${this.providerId}
				></issue-pull-request>
			</div>
		</gl-popover>`}getAccessibleLabel(){let e="pr"===this.type?"Pull request":"issue"===this.type?"Issue":"Autolink";return this.name?`${e} ${this.identifier} - ${this.name}`:`${e} ${this.identifier}`}};he.styles=j`
		:host {
			display: inline-flex;
		}

		.chip--pr-opened::part(icon) {
			color: var(--vscode-gitlens-openPullRequestIconColor);
		}

		.chip--pr-closed::part(icon) {
			color: var(--vscode-gitlens-closedPullRequestIconColor);
		}

		.chip--pr-merged::part(icon) {
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
		}

		.chip--pr-draft::part(icon) {
			color: var(--vscode-descriptionForeground);
		}

		.chip--issue-opened::part(icon) {
			color: var(--vscode-gitlens-openAutolinkedIssueIconColor);
		}

		.chip--issue-closed::part(icon) {
			color: var(--vscode-gitlens-closedAutolinkedIssueIconColor);
		}
	`,c9([ej()],he.prototype,"url",2),c9([ej()],he.prototype,"name",2),c9([ej()],he.prototype,"date",2),c9([ej()],he.prototype,"dateFormat",2),c9([ej()],he.prototype,"dateStyle",2),c9([ej()],he.prototype,"status",2),c9([ej()],he.prototype,"type",2),c9([ej()],he.prototype,"identifier",2),c9([ej()],he.prototype,"author",2),c9([ej({type:Boolean})],he.prototype,"isDraft",2),c9([ej()],he.prototype,"reviewDecision",2),c9([ej({type:Boolean})],he.prototype,"details",2),c9([ej({type:Boolean})],he.prototype,"openOnRemote",2),c9([ej({attribute:"item-id"})],he.prototype,"itemId",2),c9([ej({attribute:"provider-id"})],he.prototype,"providerId",2),he=c9([eM("gl-autolink-chip")],he);var ht=Object.defineProperty,hi=Object.getOwnPropertyDescriptor,ho=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?hi(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&ht(t,i,s),s};let hr=class extends lit_element_i{constructor(){super(...arguments),this.maxRows=1,this._overflowCount=0,this._prefixEmpty=!0,this._suffixEmpty=!0,this._measurePending=!1,this._measuring=!1,this._lastVisibleCount=-1,this.handleNamedSlotChange=e=>{let t=e.target,i=t.assignedNodes({flatten:!0}).every(e=>e.nodeType===Node.TEXT_NODE&&0===(e.textContent??"").trim().length);"prefix"===t.name?this._prefixEmpty=i:"suffix"===t.name&&(this._suffixEmpty=i)}}connectedCallback(){super.connectedCallback?.(),this._resizeObserver=new ResizeObserver(()=>this.scheduleMeasure())}disconnectedCallback(){super.disconnectedCallback?.(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0}firstUpdated(){null!=this.containerEl&&this._resizeObserver?.observe(this.containerEl),this.scheduleMeasure()}updated(e){e.has("maxRows")&&(this._lastVisibleCount=-1,this.scheduleMeasure())}render(){let e=1===this.maxRows;return ex`<div class="container ${e?"is-single-row":""}" part="container">
			<span class="suffix ${this._suffixEmpty?"is-empty":""}"
				><slot name="suffix" @slotchange=${this.handleNamedSlotChange}></slot></span
			><span class="prefix ${this._prefixEmpty?"is-empty":""}"
				><slot name="prefix" @slotchange=${this.handleNamedSlotChange}></slot></span
			><slot @slotchange=${this.handleSlotChange}></slot>${this._overflowCount>0?ex`<span class="overflow-host"
						><gl-popover trigger="click" placement="bottom-start" appearance="menu">
							<button
								slot="anchor"
								class="overflow-chip"
								part="overflow-chip"
								aria-label="${this._overflowCount} more items"
							>
								+${this._overflowCount}
							</button>
							<div slot="content" class="overflow-popover scrollable" part="popover">
								<slot name="popover"></slot>
							</div> </gl-popover
					></span>`:e$}
		</div>`}handleSlotChange(){this._lastVisibleCount=-1,this.scheduleMeasure()}scheduleMeasure(){this._measurePending||this._measuring||(this._measurePending=!0,requestAnimationFrame(()=>{this._measurePending=!1,this.measureOverflow()}))}measureOverflow(){if(!this._measuring){this._measuring=!0;try{let e=this.containerEl;if(null==e)return;let t=this.defaultSlot;if(null==t)return;let i=t.assignedElements({flatten:!0});if(0===i.length){this._lastVisibleCount=0,0!==this._overflowCount&&(this._overflowCount=0);return}for(let e of i)e.removeAttribute("data-overflow-hidden");let o=1===this.maxRows?this.measureSingleRow(e,i):this.measureFloat(e,i);if(null==o)return;let{visibleCount:r,overflowCount:s}=o;if(0===r&&i.length>0&&(r=1,s=i.length-1),r===this._lastVisibleCount)return;this._lastVisibleCount=r;for(let e=r;e<i.length;e++)i[e].setAttribute("data-overflow-hidden","");this._overflowCount!==s&&(this._overflowCount=s)}finally{requestAnimationFrame(()=>{this._measuring=!1})}}}measureSingleRow(e,t){let i=t[0];if(0===i.offsetHeight)return;let o=getComputedStyle(e),r=e.clientWidth-(parseFloat(o.paddingLeft)||0)-(parseFloat(o.paddingRight)||0),s=e=>{let t=this.shadowRoot?.querySelector(e);if(null==t||0===t.offsetWidth)return 0;let i=getComputedStyle(t);return t.offsetWidth+(parseFloat(i.marginInlineStart)||0)+(parseFloat(i.marginInlineEnd)||0)},a=s(".prefix"),c=s(".suffix"),h=parseFloat(getComputedStyle(i).marginInlineEnd)||0,p=0;for(let e of t)p+=e.offsetWidth+h;let u=r-a-c;if(p<=u)return{visibleCount:t.length,overflowCount:0};let g=this.shadowRoot?.querySelector(".overflow-chip"),m=u-(null!=g&&g.offsetWidth>0?g.offsetWidth:40),f=0,b=0;for(let e of t){let t=e.offsetWidth+h;if(f+t>m)break;f+=t,b++}return{visibleCount:b,overflowCount:t.length-b}}measureFloat(e,t){let i=t[0],o=i.offsetHeight;if(0===o)return;let r=getComputedStyle(e),s=parseFloat(r.rowGap)||0,a=this.maxRows*o+(this.maxRows-1)*s;e.style.maxHeight=`${a}px`;let c=i.offsetTop,h=0;for(let e of t){if(e.offsetTop-c+1>=a)break;h++}let p=t.length-h;if(p>0&&h>0){let i=e.clientWidth-(parseFloat(r.paddingLeft)||0)-(parseFloat(r.paddingRight)||0),o=this.shadowRoot?.querySelector(".suffix"),s=null!=o&&o.offsetWidth>0?o.offsetWidth:0,a=this.shadowRoot?.querySelector(".overflow-chip"),u=null!=a?a.offsetWidth:40;for(;h>0;){let e=t[h-1];if(e.offsetLeft+e.offsetWidth+(parseFloat(getComputedStyle(e).marginInlineEnd)||0)+u<=(e.offsetTop-c==0?i-s:i))break;h--,p++}}return{visibleCount:h,overflowCount:p}}};hr.styles=[rp,j`
			:host {
				display: contents;
			}

			/* Multi-row layout (maxRows > 1): block layout (display:flow-root) lets the suffix float
   to the top-right while inline chips flow around it. Row 1 chips share the line with the
   suffix; subsequent rows reclaim full width once they pass the suffix's bottom edge.
   Pure CSS, no JS measure for the float positioning itself. */
			.container {
				display: flow-root;
				flex: 1 1 auto;
				min-width: 0;

				/* Negative bottom-margin trims the last row's gap so the container hugs its content. */
				margin-bottom: calc(-1 * var(--gl-chip-overflow-gap, 0.5rem));
			}

			/* Single-row layout (maxRows === 1): flex puts chips, "+N", and suffix on one line with
   the suffix pushed right via auto-margin. No float — so the "+N" never wraps off-line
   the way it can with floated suffix on row 1, where chips fill up to the suffix's left
   edge and any inline content past that point gets pushed to row 2. */
			.container.is-single-row {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				min-width: 0;
				margin-bottom: 0;
			}

			::slotted([data-overflow-hidden]) {
				display: none !important;
			}

			/* Chip-layout styles must only target the DEFAULT slot's content (the actual chips) —
   not the named "suffix"/"prefix"/"popover" slots, whose content (e.g. the popover's
   <div slot="popover"> wrapper) would otherwise inherit 'display: inline-flex' and lay
   its own children horizontally. */
			::slotted(:not([slot])) {
				display: inline-flex;
				margin-block-end: var(--gl-chip-overflow-gap, 0.5rem);
				margin-inline-end: var(--gl-chip-overflow-gap, 0.5rem);
				vertical-align: middle;
			}

			.container.is-single-row ::slotted(:not([slot])) {
				flex-shrink: 0;
				margin-block-end: 0;
			}

			.overflow-chip {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				height: 2rem;
				padding: var(--gl-space-2) var(--gl-space-4);
				margin-block-end: var(--gl-chip-overflow-gap, 0.5rem);
				margin-inline-end: var(--gl-chip-overflow-gap, 0.5rem);
				font: inherit;
				vertical-align: middle;
				color: inherit;
				white-space: nowrap;
				cursor: pointer;
				background: none;
				border: none;
				border-radius: var(--gl-radius-sm);
				opacity: 0.65;
				transition: opacity var(--gl-duration-fast) ease;
			}

			.overflow-chip:hover,
			.overflow-chip:focus-visible {
				background-color: var(--vscode-toolbar-hoverBackground);
				opacity: 1;
			}

			.overflow-chip:active {
				background-color: var(--vscode-toolbar-activeBackground);
			}

			.overflow-chip:focus-visible {
				outline: var(--gl-border-width) solid var(--vscode-focusBorder);
				outline-offset: 1px;
			}

			.prefix {
				display: inline-flex;
				align-items: center;
				min-width: 0;
				max-width: 100%;
				margin-block-end: var(--gl-chip-overflow-gap, 0.5rem);
				margin-inline-end: var(--gl-chip-overflow-gap, 0.5rem);
				vertical-align: middle;
			}

			/* Floated to the top-right so chips flow around it on the first row, then wrap
   beneath once they exceed the suffix's bottom edge (multi-row mode). */
			.suffix {
				float: right;
				display: inline-flex;
				gap: var(--gl-chip-overflow-gap, 0.5rem);
				align-items: center;
				min-width: 0;
				max-width: 100%;
				height: var(--gl-chip-overflow-row-height, 2rem);
				margin-block-end: var(--gl-chip-overflow-gap, 0.5rem);
				margin-inline-start: var(--gl-chip-overflow-gap, 0.5rem);
			}

			/* Single-row: drop float, push to end of the line via auto margin, drop block-end gap. */
			.container.is-single-row .suffix {
				float: none;
				flex-shrink: 0;
				order: 3;
				margin-block-end: 0;
				margin-inline-start: auto;
			}

			.container.is-single-row .prefix {
				order: 0;
				margin-block-end: 0;
			}

			/* Wraps the gl-popover so we can give the +N a flex order distinct from the chips and
   suffix. gl-popover itself is display:contents so it'd otherwise inherit no order. */
			.overflow-host {
				display: inline-flex;
				vertical-align: middle;
			}

			.container.is-single-row .overflow-host {
				flex-shrink: 0;
				order: 2;
			}

			.container.is-single-row .overflow-chip {
				margin-block-end: 0;
				margin-inline-end: 0;
			}

			/* When prefix/suffix slots have no assigned content, drop them out of layout entirely
   so the container gap does not leave a phantom inset before the first chip (or
   after the last). The empty-state class is set by handleSlotChange. */
			.prefix.is-empty,
			.suffix.is-empty {
				display: none;
			}

			.overflow-popover {
				max-width: 400px;
				max-height: 300px;
				overflow-y: auto;
			}
		`],ho([ej({type:Number,attribute:"max-rows"})],hr.prototype,"maxRows",2),ho([eO()],hr.prototype,"_overflowCount",2),ho([eO()],hr.prototype,"_prefixEmpty",2),ho([eO()],hr.prototype,"_suffixEmpty",2),ho([eL(".container")],hr.prototype,"containerEl",2),ho([eL("slot:not([name])")],hr.prototype,"defaultSlot",2),hr=ho([eM("gl-chip-overflow")],hr);var hs=Object.defineProperty,hn=Object.getOwnPropertyDescriptor,ha=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?hn(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hs(t,i,s),s};let hl=class extends lit_element_i{constructor(){super(...arguments),this.copyLabel="Copy",this.copiedLabel="Copied",this.disabled=!1,this.placement="top",this.timeout=1e3,this._isMouseDown=!1,this.onMouseDown=()=>{this._isMouseDown=!0,window.addEventListener("mouseup",()=>this._isMouseDown=!1,{once:!0})},this.onFocusIn=()=>{this._isMouseDown||this.tooltip?.show()},this.onFocusOut=()=>{this.tooltip?.hide()}}connectedCallback(){super.connectedCallback?.(),this.label=this.copyLabel,this.addEventListener("mousedown",this.onMouseDown),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}willUpdate(e){e.has("copyLabel")&&null==this._resetTimer&&(this.label=this.copyLabel)}disconnectedCallback(){this.cancelResetTimer(),this.removeEventListener("mousedown",this.onMouseDown),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),super.disconnectedCallback?.()}render(){return this.content||this.disabled?ex`<gl-tooltip
			tabindex="0"
			.content="${this.label}"
			placement="${this.placement??e$}"
			@click=${this.onClick}
			@keydown=${this.onKeydown}
		>
			<slot></slot>
		</gl-tooltip>`:e$}async onClick(e){if(this.cancelResetTimer(),this.content)try{await navigator.clipboard.writeText(this.content),this.label=this.copiedLabel}catch{this.label="Unable to Copy"}else this.label="Nothing to Copy";this.createResetTimer(),await this.updateComplete,await this.tooltip?.updateComplete,this.tooltip?.show()}onKeydown(e){("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.onClick(e))}cancelResetTimer(){null!=this._resetTimer&&(clearTimeout(this._resetTimer),this._resetTimer=void 0)}createResetTimer(){this._resetTimer=setTimeout(()=>{this._resetTimer=void 0,this.label=this.copyLabel},this.timeout)}};hl.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},hl.styles=j`
		:host {
			display: inline-block;
		}

		gl-tooltip {
			cursor: pointer;
		}

		gl-tooltip:focus-visible {
			outline: var(--gl-border-width) solid var(--vscode-focusBorder);
			outline-offset: 2px;
		}

		/* Hide focus outline on slotted copy icon - we show it on the host instead */
		::slotted(.copy-icon) {
			outline: none !important;
		}

		:host([appearance='toolbar']) {
			--copy-background: transparent;
			--copy-foreground: var(--vscode-foreground);
			--copy-hover-background: var(--vscode-toolbar-hoverBackground);
			--copy-border: transparent;
			--copy-border-radius: var(--gl-radius-sm);
			--copy-padding: 0 0.4rem;

			color: var(--copy-foreground);
			background: var(--copy-background);
			border: var(--gl-border-width) solid var(--copy-border);
			border-radius: var(--copy-border-radius);
		}

		:host([appearance='toolbar']:hover) {
			background: var(--copy-hover-background);
		}

		:host([appearance='toolbar']:focus-within) {
			outline: var(--gl-border-width) solid var(--color-focus-border);
			outline-offset: -1px;
		}

		:host([appearance='toolbar']) gl-tooltip {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 2rem;
			padding: var(--copy-padding);
		}

		:host([disabled]) {
			pointer-events: none;
			opacity: 0.5;
		}
	`,ha([ej({reflect:!0})],hl.prototype,"appearance",2),ha([ej({reflect:!1})],hl.prototype,"content",2),ha([ej()],hl.prototype,"copyLabel",2),ha([ej()],hl.prototype,"copiedLabel",2),ha([ej({type:Boolean,reflect:!0})],hl.prototype,"disabled",2),ha([ej()],hl.prototype,"placement",2),ha([ej({type:Number})],hl.prototype,"timeout",2),ha([eO()],hl.prototype,"label",2),ha([eL("gl-tooltip")],hl.prototype,"tooltip",2),hl=ha([eM("gl-copy-container")],hl);let hc=/\/EMail=([^/]+)/i,hh=/<([^>]+)>/,hd=/no public key/i;function hp(e,t){if(null==e)return"unknown";let{status:i,trustLevel:o,signer:r}=e;if("bad"===i)return"untrusted";if("good"===i&&("ultimate"===o||"full"===o)){let e=function(e){if(!e)return;let t=e.match(hc);if(t)return t[1];let i=e.match(hh);return i?i[1]:e.includes("@")&&!e.includes(" ")?e:void 0}(r);if(e&&t&&e.toLowerCase()===t.toLowerCase())return"trusted"}return"unknown"}function hu(e){switch(e){case"trusted":return"workspace-trusted";case"untrusted":return"workspace-untrusted";default:return"workspace-unknown"}}var hg=Object.defineProperty,hm=Object.getOwnPropertyDescriptor,hf=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?hm(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hg(t,i,s),s};let hb=class extends lit_element_i{render(){if(null==this.signature)return e$;let e=hp(this.signature,this.committerEmail),t=hu(e);return ex`
			<span class="badge badge--${e}">
				<code-icon icon="${t}"></code-icon>
			</span>
		`}};hb.styles=j`
		:host {
			display: inline-flex;
			align-items: center;
		}

		.badge {
			display: inline-flex;
			align-items: center;

			& code-icon {
				margin-top: 0.1rem;
			}
		}

		.badge--trusted {
			color: var(--vscode-charts-green);
		}

		.badge--unknown {
			color: var(--color-foreground--65);
		}

		.badge--untrusted {
			color: var(--vscode-charts-red);
		}
	`,hf([ej({type:String})],hb.prototype,"committerEmail",2),hf([ej({type:Object})],hb.prototype,"signature",2),hb=hf([eM("gl-signature-badge")],hb);var hv=Object.defineProperty,h_=Object.getOwnPropertyDescriptor,hy=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?h_(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hv(t,i,s),s};let hw=class extends lit_element_i{getFormatLabel(e){switch(e){case"gpg":case"openpgp":return"GPG";case"ssh":return"SSH";case"x509":return"X.509";default:return""}}renderKeyLine(){let{keyId:e,fingerprint:t,format:i}=this.signature??{};if(!e&&!t)return e$;let o=t??e,r=this.getFormatLabel(i),s=t?"Fingerprint":"Key ID",a=r?`${r} ${s}:`:`${s}:`;return ex`
			<div class="signature-key">
				<span class="signature-key-label">${a}</span>
				<span class="signature-key-value">${o}</span>
				<gl-copy-container tabindex="0" .content=${o} copyLabel="Copy ${s}">
					<code-icon icon="copy"></code-icon>
				</gl-copy-container>
			</div>
		`}render(){if(null==this.signature)return e$;let e=function(e,t){let i=hp(e,t),o=hu(i);switch(i){case"trusted":return{icon:o,text:"Signed & Verified",description:"Trusted",detail:"Signature is valid and the signer is trusted"};case"untrusted":return{icon:o,text:"Invalid Signature",description:"Untrusted",detail:"Signature does not match the commit contents — this commit may have been tampered with"};case"unknown":switch(e.status){case"good":return{icon:o,text:"Signed",description:"Unverified Signer",detail:"Signature is valid, but the signer is not in your trusted keys"};case"expired":return{icon:o,text:"Signed",description:"Expired",detail:"Signature was made with an expired key and cannot be verified"};case"revoked":return{icon:o,text:"Signed",description:"Revoked",detail:"Signature was made with a revoked key and should not be trusted"};case"error":if(e.errorMessage&&hd.test(e.errorMessage))return{icon:o,text:"Signed",description:"Missing Key",detail:"Signature cannot be verified because the public key is not available"};return{icon:o,text:"Signed",description:"Failed",detail:e.errorMessage?`Signature verification failed: ${e.errorMessage}`:"Signature verification failed"};default:return{icon:o,text:"Signed",description:"Unverified",detail:e.errorMessage??"Signature could not be verified"}}}}(this.signature,this.committerEmail);return ex`
			<div class="signature-details">
				<div class="signature-status">
					<gl-signature-badge
						.signature=${this.signature}
						.committerEmail=${this.committerEmail}
					></gl-signature-badge>
					<div class="signature-status-text">
						<div class="signature-status-message">
							${e.text}${e.description?ex`<span class="signature-status-description">${e.description}</span>`:e$}
						</div>
						${e.detail?ex`<div class="signature-status-detail">${e.detail}</div>`:e$}
						${this.renderKeyLine()}
					</div>
				</div>
			</div>
		`}};hw.styles=j`
		:host {
			display: block;
		}

		.signature-details {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.signature-status {
			display: flex;
			gap: 0.5rem;
			align-items: flex-start;
		}

		.signature-status gl-signature-badge {
			flex-shrink: 0;
		}

		.signature-status-text {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: 0.25rem;
			font-weight: 400;
		}

		.signature-status-message {
			color: var(--vscode-foreground);
		}

		.signature-status-description {
			margin-left: var(--gl-space-8);
			font-variant: small-caps;
			color: var(--vscode-descriptionForeground);
			text-transform: lowercase;
		}

		.signature-status-detail {
			color: var(--vscode-descriptionForeground);
		}

		.signature-key {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			font-size: 0.9em;
			color: var(--vscode-descriptionForeground);
		}

		.signature-key-label {
			flex-shrink: 0;
		}

		.signature-key-value {
			word-break: break-all;
			overflow-wrap: break-word;
		}

		gl-copy-container {
			flex-shrink: 0;
			margin-left: auto;
		}

		gl-copy-container code-icon {
			color: var(--vscode-descriptionForeground);
		}

		gl-copy-container:hover code-icon {
			color: var(--vscode-foreground);
		}
	`,hy([ej({type:String})],hw.prototype,"committerEmail",2),hy([ej({type:Object})],hw.prototype,"signature",2),hw=hy([eM("gl-signature-details")],hw);var hx=Object.defineProperty,hk=Object.getOwnPropertyDescriptor,hC=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?hk(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hx(t,i,s),s};let h$=class extends lit_element_i{constructor(){super(...arguments),this.avatarUrl="https://www.gravatar.com/avatar/?s=64&d=robohash",this.name="",this.showAvatar=!1,this.showSignature=!0,this.dateStyle="relative"}formatDateLabel(e){return"relative"===this.dateStyle?tV(e):tK(e,this.dateFormat??"MMMM Do, YYYY h:mma")}formatDateFull(e){return tK(e,this.dateFormat??"MMMM Do, YYYY h:mma")}get hasDistinctCommitter(){let e=this.authorName??this.name;return null!=this.committerName&&this.committerName!==e||null!=this.committerEmail&&this.committerEmail?.toLowerCase()!==this.email?.toLowerCase()}renderAvatar(){return this.showAvatar&&this.avatarUrl?.length?this.hasDistinctCommitter?ex`<span class="avatar-with-overlay">
					<img class="thumb" src="${this.avatarUrl}" alt="${this.name}" />
					${this.committerAvatarUrl?.length?ex`<img
								class="thumb-overlay"
								src="${this.committerAvatarUrl}"
								alt="${this.committerName??""}"
							/>`:ex`<code-icon
								class="thumb-overlay thumb-overlay--icon"
								icon="person"
								size="10"
							></code-icon>`}
				</span>`:ex`<img class="thumb" src="${this.avatarUrl}" alt="${this.name}" />`:ex`<code-icon icon="person" size="18"></code-icon>`}renderSignatureBadge(){return null!=this.signature&&this.showSignature?ex`<gl-signature-badge
			.signature=${this.signature}
			.committerEmail=${this.committerEmail}
		></gl-signature-badge>`:e$}renderPopoverContent(){let e=null!=this.authorDate||null!=this.committerDate,t=null!=this.authorDate&&null!=this.committerDate&&3e4>Math.abs(this.authorDate.getTime()-this.committerDate.getTime()),i=null!=this.signature&&this.showSignature;return ex`
			<div class="popover-content">
				<div class="author-info">
					${this.avatarUrl?.length?ex`<img class="author-avatar" src="${this.avatarUrl}" alt="${this.name}" />`:e$}
					<div class="author-details">
						<div class="author-name-text">${this.name}</div>
						${this.email?ex`<span class="author-email"><a href="mailto:${this.email}">${this.email}</a></span>`:e$}
					</div>
				</div>
				${this.hasDistinctCommitter?ex`<div class="author-info">
							${this.committerAvatarUrl?.length?ex`<img
										class="author-avatar"
										src="${this.committerAvatarUrl}"
										alt="${this.committerName}"
									/>`:e$}
							<div class="author-details">
								<div class="author-name-text">
									${this.committerName}
									<span class="committer-label">(committer)</span>
								</div>
								${this.committerEmail?ex`<span class="author-email"
											><a href="mailto:${this.committerEmail}">${this.committerEmail}</a></span
										>`:e$}
							</div>
						</div>`:e$}
				${i?ex`<gl-signature-details
							.signature=${this.signature}
							.committerEmail=${this.committerEmail}
						></gl-signature-details>`:e$}
				${e?ex`<div class="popover-dates">
							${t?ex`<span class="popover-date"
										>${tV(this.committerDate)}
										(${this.formatDateFull(this.committerDate)})</span
									>`:ex`${this.authorDate?ex`<span class="popover-date"
												>Authored ${tV(this.authorDate)}
												(${this.formatDateFull(this.authorDate)})</span
											>`:e$}
									${this.committerDate?ex`<span class="popover-date"
												>Committed ${tV(this.committerDate)}
												(${this.formatDateFull(this.committerDate)})</span
											>`:e$}`}
						</div>`:e$}
			</div>
		`}render(){let e=this.authorDate?this.formatDateLabel(this.authorDate):void 0;return ex`
			<gl-popover placement="bottom" trigger="hover click focus">
				<span slot="anchor" class="author" tabindex="0"
					><span class="avatar">${this.renderAvatar()}</span>${"stacked"===this.layout?ex`<span class="name-group"
								><span class="name">${this.name}${this.renderSignatureBadge()}</span>${e?ex`<span class="date">${e}</span>`:e$}</span
							>`:ex`<span class="name">${this.name}</span>${this.renderSignatureBadge()}`}</span
				>
				<div slot="content">${this.renderPopoverContent()}</div>
			</gl-popover>
		`}};h$.styles=j`
		:host {
			display: contents;
		}

		* {
			box-sizing: border-box;
		}

		.author {
			display: flex;
			flex-direction: row;
			gap: 0 var(--gl-space-6);
			align-items: center;
			cursor: pointer;
			border-radius: var(--gl-radius-sm);

			&:focus {
				outline: var(--gl-border-width) solid var(--vscode-focusBorder);
				outline-offset: 2px;
			}
		}

		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}

		.author-hover {
			display: flex;
			flex-direction: column;
			gap: var(--gl-space-6);
			align-items: center;
			justify-content: center;
			margin: var(--gl-space-6) var(--gl-space-2) var(--gl-space-2);
		}

		.author-hover img {
			max-width: 64px;
		}

		.avatar {
			width: var(--gl-avatar-size, 1.8rem);
		}

		.thumb {
			width: 100%;
			height: auto;
			vertical-align: middle;
			border-radius: var(--gl-radius-sm);
		}

		.name {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: var(--gl-font-base);
			white-space: nowrap;
		}

		.date {
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: var(--gl-font-sm);
			line-height: 1.4;
			color: var(--vscode-descriptionForeground, var(--color-foreground--50));
			white-space: nowrap;
		}

		:host([layout='stacked']) {
			display: inline-flex;
		}

		:host([layout='stacked']) .author {
			flex-wrap: wrap;
		}

		:host([layout='stacked']) .name-group {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: 0.1rem;
			min-width: 0;
		}

		gl-signature-badge {
			margin-left: var(--gl-space-4);
			vertical-align: middle;
		}

		.popover-content {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		.author-info {
			display: flex;
			gap: 0.625rem;
			align-items: center;
		}

		.author-avatar {
			flex-shrink: 0;
			width: 32px;
			height: 32px;
			border-radius: var(--gl-radius-lg);
		}

		.author-details {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: 0;
			min-width: 0;
			line-height: normal;
		}

		.author-name-text {
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: 500;
			color: var(--vscode-foreground);
			white-space: nowrap;
		}

		.author-email {
			font-weight: 400;
			color: var(--vscode-descriptionForeground);

			a {
				display: inline-block;
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				vertical-align: bottom;
				white-space: nowrap;
			}

			a:focus {
				outline: var(--gl-border-width) solid var(--vscode-focusBorder);
				outline-offset: 2px;
			}
		}

		.popover-dates {
			display: flex;
			flex-direction: column;
			gap: 0;
			font-size: 1.15rem;
			color: var(--vscode-descriptionForeground);
		}

		.popover-date {
			white-space: nowrap;
		}

		.avatar-with-overlay {
			position: relative;
			display: inline-block;
			width: var(--gl-avatar-size, 1.8rem);
			height: var(--gl-avatar-size, 1.8rem);
		}

		.avatar-with-overlay .thumb {
			width: 100%;
			height: 100%;
		}

		.thumb-overlay {
			position: absolute;
			right: -2px;
			bottom: -2px;
			width: 45%;
			height: 45%;
			object-fit: cover;
			border: 1.5px solid var(--vscode-sideBar-background, var(--color-background));
			border-radius: 50%;
		}

		.thumb-overlay--icon {
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--vscode-descriptionForeground);
			background-color: var(--vscode-sideBar-background, var(--color-background));
		}

		.committer-label {
			font-size: 0.9em;
			font-weight: 400;
			color: var(--vscode-descriptionForeground);
		}
	`,hC([ej()],h$.prototype,"avatarUrl",2),hC([ej()],h$.prototype,"committerEmail",2),hC([ej()],h$.prototype,"committerAvatarUrl",2),hC([ej()],h$.prototype,"committerName",2),hC([ej()],h$.prototype,"email",2),hC([ej()],h$.prototype,"name",2),hC([ej({attribute:"author-name"})],h$.prototype,"authorName",2),hC([ej({type:Boolean,attribute:"show-avatar",reflect:!0})],h$.prototype,"showAvatar",2),hC([ej({type:Boolean,attribute:"show-signature",reflect:!0})],h$.prototype,"showSignature",2),hC([ej({type:Object})],h$.prototype,"signature",2),hC([ej({reflect:!0})],h$.prototype,"layout",2),hC([ej({converter:cJ()})],h$.prototype,"authorDate",2),hC([ej({converter:cJ()})],h$.prototype,"committerDate",2),hC([ej()],h$.prototype,"dateFormat",2),hC([ej()],h$.prototype,"dateStyle",2),h$=hC([eM("gl-commit-author")],h$);var hS=Object.defineProperty,hE=Object.getOwnPropertyDescriptor,hA=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?hE(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hS(t,i,s),s};let hI=j`
	:host {
		display: inline-flex;
		align-items: baseline;
		max-width: 100%;
		margin-inline-end: var(--gl-space-2);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host(:focus) {
		outline: var(--gl-border-width) solid var(--vscode-focusBorder);
		outline-offset: 2px;
	}

	/* Neutral/grey counterpart to gl-branch-name's pill — same shape, muted (not branch-colored). */
	:host([appearance='pill']) {
		padding: 0.1rem 0.6rem;
		color: var(--vscode-foreground);
		background-color: color-mix(in srgb, var(--vscode-descriptionForeground) 18%, transparent);
		border-radius: var(--gl-radius-sm);
	}

	.label--uncommitted {
		cursor: default;
	}

	.icon {
		align-self: center;
		margin-right: 0.3rem;
	}
`,hP=class extends lit_element_i{constructor(){super(...arguments),this.icon="git-commit",this.size=12}get label(){return oQ(this.sha,{strings:{uncommitted:"Working",uncommittedStaged:"Staged",working:"Working"}})}render(){if(null==this.sha)return e$;if(!this.sha||oX(this.sha)){let e=oJ(this.sha)?"check":"pencil";return ex`<code-icon part="icon" class="icon" icon="${e}" size="${this.size}"></code-icon
				><span part="label" class="label--uncommitted">${this.label}</span>`}return ex`<code-icon part="icon" class="icon" icon="${this.icon}" size="${this.size}"></code-icon
			><span part="label">${this.label}</span>`}};hP.styles=hI,hA([ej({reflect:!0})],hP.prototype,"appearance",2),hA([ej({type:String})],hP.prototype,"sha",2),hA([ej({type:String})],hP.prototype,"icon",2),hA([ej({type:Number})],hP.prototype,"size",2),hP=hA([eM("gl-commit-sha")],hP);let hz=class extends lit_element_i{constructor(){super(...arguments),this.icon="git-commit",this.size=12,this.copyLabel="Copy",this.copiedLabel="Copied!",this.tooltipPlacement="top"}render(){return null==this.sha?e$:!this.sha||oX(this.sha)?ex`<gl-commit-sha .sha=${this.sha} .icon=${this.icon} .size=${this.size}></gl-commit-sha>`:ex`<gl-copy-container
			.content=${this.sha}
			placement="${this.tooltipPlacement}"
			.copyLabel=${this.copyLabel}
			.copiedLabel=${this.copiedLabel}
			.appearance=${this.appearance}
		>
			<gl-commit-sha
				exportparts="icon, label"
				.sha=${this.sha}
				.icon=${this.icon}
				.size=${this.size}
			></gl-commit-sha>
		</gl-copy-container>`}};hz.styles=[hI,j`
			:host(:focus) {
				outline: none;
			}
		`],hA([ej({type:String})],hz.prototype,"sha",2),hA([ej({type:String})],hz.prototype,"icon",2),hA([ej({type:Number})],hz.prototype,"size",2),hA([ej({reflect:!0})],hz.prototype,"appearance",2),hA([ej({type:String,attribute:"copy-label"})],hz.prototype,"copyLabel",2),hA([ej({type:String,attribute:"copied-label"})],hz.prototype,"copiedLabel",2),hA([ej({type:String,attribute:"tooltip-placement"})],hz.prototype,"tooltipPlacement",2),hz=hA([eM("gl-commit-sha-copy")],hz);let hT=j`
	/* Single accent for both compose and review chips, mirroring the unified mode-header
	   accent. Mode identity is carried by the chip icon (wand vs checklist) and overlay
	   status icon (loading / pass / etc.) — color is redundant when icons already
	   differentiate. Error and orphaned states still override for semantic colorization. */
	.mode-toggle--compose,
	.mode-toggle--review,
	.mode-toggle--resolve {
		--mode-toggle-accent: var(--color-highlight, var(--vscode-focusBorder));
	}

	.mode-toggle--has-status {
		/* --vscode-button-foreground is the contrast-paired token for --vscode-button-background
		   (which --color-highlight wraps), so it stays readable across light/dark themes — unlike
		   hardcoded white, which falls below WCAG contrast on pale-accent light themes. */
		color: var(--vscode-button-foreground, #fff) !important;
		background: var(--mode-toggle-accent) !important;
		border-radius: var(--gl-radius-sm);
	}

	.mode-toggle--has-status:hover {
		/* Mix toward currentColor (the chip's text color above) rather than hardcoded white. In
		   dark themes the text is white → mix lightens the accent; in light themes the text is
		   dark → mix darkens the accent. Either way the hover state stays visibly distinct from
		   the resting state, instead of fading into the page on light themes. */
		background: color-mix(in srgb, var(--mode-toggle-accent) 85%, currentcolor) !important;
	}

	.mode-toggle--has-status[data-state='error'] {
		--mode-toggle-accent: var(--vscode-errorForeground, var(--vscode-focusBorder));
	}

	.mode-toggle--has-status[data-state='orphaned'] {
		--mode-toggle-accent: var(--color-foreground--50, var(--vscode-descriptionForeground));
	}
`,hR=j`
	.mode-header {
		background-color: var(--mode-header-bg);

		/* Exit transition (class removed): fast fade back to base */
		transition: background-color var(--gl-duration-x-fast) var(--gl-ease-out);
	}

	.mode-header--active {
		background-color: color-mix(
			in srgb,
			var(--mode-accent, var(--vscode-focusBorder)) var(--mode-header-tint, 50%),
			var(--mode-header-bg, var(--titlebar-bg, var(--vscode-sideBar-background, var(--color-background))))
		);

		/* Enter transition (class added): slightly slower fade to tinted */
		transition: background-color var(--gl-duration-fast) var(--gl-ease-in);
	}
`,hM=j`
	:host {
		display: contents;
		color: var(--vscode-sideBarSectionHeader-foreground, var(--vscode-foreground));
	}

	.details-header {
		position: sticky;
		top: 0;
		z-index: var(--gl-z-sticky);
		display: flex;
		flex: none;
		flex-direction: column;
	}

	.details-header__row {
		display: flex;
		/* No row gap: the gap-centering math relies on the two spacers alone — a row gap would be
		   inserted around the spacers too, skewing the center and leaving phantom whitespace when a
		   spacer collapses. Separation is provided by the spacers' min-width + each cluster's own gap. */
		gap: 0;
		/* Center so the title text, the (taller, bordered) mode box, Compare, and the right-side
		   action chips share one vertical centerline — flex-start let the box's chips ride low. */
		align-items: center;
		padding: 0.7rem 1.2rem 0.5rem;
		container-name: gl-action-chip-host;
		container-type: inline-size;
	}

	.details-header__content {
		/* Natural width (was flex: 1) so the spacers can claim the free space and gap-center the
		   mode/Compare group between the title and the right-anchored actions. */
		flex: 0 1 auto;
		min-width: 0;

		/* The content box can shrink below its children's intrinsic width (min-width: 0), so clip
		   anything that would otherwise spill out and paint under the actions cluster. */
		overflow: hidden;
	}

	/* Gap-centering scaffold: two of these flank the center group so it sits in the middle of the
	   space between the title and the right anchor. They shrink symmetrically; the min-width keeps a
	   gutter so neighbors never touch once the spacers collapse at narrow widths. */
	.details-header__spacer {
		flex: 1 1 0;
		min-width: var(--gl-space-4);
	}

	/* The gap-centered group: AI mode toggles (in the accent box) + the Compare entry-point. The
	   larger gap sets Compare apart from the segmented mode box (it's a sibling, not a mode). */
	.details-header__center {
		display: flex;
		flex: 0 0 auto;
		gap: var(--gl-space-6);
		align-items: center;
	}

	/* Segmented accent box around the AI mode toggles — marks them as the panel's primary
	   "act on these changes" cluster. Uses --vscode-focusBorder (the theme's focus-blue) rather than
	   --color-highlight: the latter is --vscode-button-background, which many themes set to a DARK
	   navy — fine as a fill behind white text (its has-status use) but near-invisible as a border or
	   icon foreground on the dark panel. focusBorder is guaranteed legible against the background in
	   every theme. */
	.details-header__modes {
		display: flex;
		gap: 0;
		align-items: center;
		padding: 0.1rem var(--gl-space-2);
		background: color-mix(in srgb, var(--vscode-focusBorder) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--vscode-focusBorder) 40%, transparent);
		border-radius: var(--gl-radius-sm);
	}

	/* Accent-tint the AI mode icons only (scoped to the box; Compare keeps its default icon color).
	   Labels stay foreground. gl-action-chip exposes its code-icon as part="icon". Exclude the
	   running-op (--has-status) state: those chips are filled with --mode-toggle-accent and rely on
	   their inherited --vscode-button-foreground to stay legible — tinting the icon part here would
	   override that inheritance and paint the glyph (incl. the loading/pass status overlay)
	   accent-on-fill, i.e. invisible. */
	.details-header__modes gl-action-chip:not(.mode-toggle--has-status)::part(icon) {
		color: var(--vscode-focusBorder);
	}

	/* Accent-tint the hover background of the AI mode chips only (scoped to inside the box, so the
	   adjacent Compare chip keeps the neutral toolbar hover). Skip --has-status chips — mode.css.ts
	   owns their (filled) hover state. */
	.details-header__modes gl-action-chip:not(.mode-toggle--has-status)::part(base):hover {
		background: color-mix(in srgb, var(--vscode-focusBorder) 25%, transparent);
	}

	.details-header__actions {
		display: flex;
		flex-shrink: 0;
		gap: var(--gl-space-2);
		align-items: center;
	}

	/* The right-anchored actions cluster (nav+jump group, Refresh …). Making the slot itself the
	   flex container keeps its chips tightly spaced; separation from the centered mode group is
	   handled symmetrically by the flanking spacers, not a margin here — a leading margin would make
	   the right gutter wider than the left and skew the gap-centering. Collapsed out of flow until
	   the slot receives content (has-actions, via slotchange) so it never reserves space on the
	   right — e.g. the comparison panel, which slots no actions. flex-shrink:0 keeps the icon chips
	   from clipping when the row is tight. */
	.details-header__actions-secondary {
		display: none;
	}

	.details-header__actions-secondary.has-actions {
		display: flex;
		flex-shrink: 0;
		gap: var(--gl-space-2);
		align-items: center;
	}

	/* Mode-toggle label collapse, staggered right-to-left in display order: Compare yields
	   first, then Review, then Compose, then Resolve — the (conflict-only) Resolve chip leads
	   the cluster as the primary action, so it keeps its label longest.
	   The chip's slotted label is a normal child of <gl-action-chip> in this template,
	   so we target it via descendant selectors. Hiding the slotted span with display:none
	   cleanly removes the flex item and its surrounding gap inside the chip — yielding
	   a true icon-only state instead of clipped/ellipsed text. The active chip is exempt
	   so the selected mode keeps its label visible. Breakpoints leave room for the title
	   side's WIP stats pill, which takes priority over labels (see
	   gl-details-wip-header.css.ts); secondary actions never hide.
	   The Resolve chip makes the cluster ~one labeled chip wider, so each step fires one
	   band sooner when it's present (the :has()-scoped rules) — keeping the same number of
	   visible labels per band as the 3-chip cascade. */
	@container gl-action-chip-host (max-width: 560px) {
		.details-header__center:has(.mode-toggle--resolve) .mode-toggle--compare .mode-toggle__text {
			display: none;
		}
	}

	@container gl-action-chip-host (max-width: 500px) {
		.mode-toggle--compare .mode-toggle__text,
		.details-header__center:has(.mode-toggle--resolve)
			.mode-toggle--review:not(.mode-toggle--active)
			.mode-toggle__text {
			display: none;
		}
	}

	@container gl-action-chip-host (max-width: 440px) {
		.mode-toggle--review:not(.mode-toggle--active) .mode-toggle__text,
		.details-header__center:has(.mode-toggle--resolve)
			.mode-toggle--compose:not(.mode-toggle--active)
			.mode-toggle__text {
			display: none;
		}
	}

	@container gl-action-chip-host (max-width: 380px) {
		.mode-toggle--compose:not(.mode-toggle--active) .mode-toggle__text,
		.mode-toggle--resolve:not(.mode-toggle--active) .mode-toggle__text {
			display: none;
		}
	}
`;var hB=Object.defineProperty,hj=Object.getOwnPropertyDescriptor,hO=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?hj(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hB(t,i,s),s};let hD={compose:{icon:"wand",label:"Compose Changes",closeLabel:"Close",text:"Compose",collapsible:!0},review:{icon:"checklist",label:"Review Changes",closeLabel:"Close",text:"Review",collapsible:!0},resolve:{icon:"gl-merge",label:"Resolve Conflicts",closeLabel:"Close",text:"Resolve Conflicts",collapsible:!0}},hL=class extends lit_element_i{constructor(){super(...arguments),this.loading=!1,this.compareEnabled=!1,this.inResultsView=!1,this.hasActions=!1,this.handleCompare=()=>{this.dispatchEvent(new CustomEvent("toggle-mode",{detail:{mode:"compare"},bubbles:!0,composed:!0}))},this.handleCloseMode=()=>{null!=this.activeMode&&this.dispatchEvent(new CustomEvent("toggle-mode",{detail:{mode:this.activeMode},bubbles:!0,composed:!0}))},this.handleBack=()=>{null!=this.activeMode&&this.dispatchEvent(new CustomEvent("mode-back",{detail:{mode:this.activeMode},bubbles:!0,composed:!0}))},this.handleRefresh=()=>{null!=this.activeMode&&this.dispatchEvent(new CustomEvent("mode-refresh",{detail:{mode:this.activeMode},bubbles:!0,composed:!0}))}}render(){let e=null!=this.activeMode,t=!e&&((this.modes?.length??0)>=1||this.compareEnabled);return ex`<div class="details-header mode-header ${e?"mode-header--active":""}">
			<div class="details-header__row">
				<div class="details-header__content">
					<slot></slot>
				</div>
				${e?ex`<div class="details-header__spacer"></div>
							<div class="details-header__actions">${this.renderCloseButton()}</div>`:ex`<div class="details-header__spacer"></div>
							${t?ex`<div class="details-header__center">
											${this.modes?.length?ex`<div class="details-header__modes">
														${this.renderModeToggles()}
													</div>`:e$}${this.renderCompareToggle()}
										</div>
										${this.hasActions?ex`<div class="details-header__spacer"></div>`:e$}`:e$}
							<slot
								name="actions"
								class=${rs({"details-header__actions-secondary":!0,"has-actions":this.hasActions})}
								@slotchange=${this.onActionsSlotChange}
							></slot>`}
			</div>
			<slot name="secondary"></slot>
			<progress-indicator position="bottom" ?active=${this.loading}></progress-indicator>
		</div>`}renderModeToggles(){return this.modes?.length&&null==this.activeMode?this.modes.map(e=>{let t=hD[e],i=t.collapsible,o=this.modeStatus?.[e],r=o?.execState,s=o?.hasResult??!0,a=null!=r?function(e,t=!0){switch(e){case"generating":return"loading";case"complete":return"pass";case"backed":return t?"pass":null;case"error":return"error";case"orphaned":return"warning";default:return null}}(r,s):null,c=t.label,h=`${c}${function(e,t=!0){switch(e){case"generating":return" (Running)";case"complete":return" (Completed)";case"backed":return t?" (Completed)":"";case"error":return" (Failed)";case"orphaned":return" (Orphaned)";default:return""}}(r,s)}`,p=i&&null!=a?a:t.icon;return ex`<gl-action-chip
				icon=${p}
				label="${h}"
				overlay="tooltip"
				data-state=${r??""}
				class=${rs({"mode-toggle":!0,[`mode-toggle--${e}`]:!0,"mode-toggle--has-status":null!=r})}
				@click=${()=>this.handleToggleMode(e)}
			>
				${i?ex`<span class="mode-toggle__text">${t.text}</span>`:e$}
				${!i&&null!=a?ex`<code-icon
							slot="suffix"
							icon=${a}
							modifier=${"loading"===a?"spin":""}
						></code-icon>`:e$}
			</gl-action-chip>`}):e$}handleToggleMode(e){this.dispatchEvent(new CustomEvent("toggle-mode",{detail:{mode:e},bubbles:!0,composed:!0}))}renderCompareToggle(){return this.compareEnabled?ex`<gl-action-chip
			icon="compare-changes"
			label="Compare"
			overlay="tooltip"
			class="mode-toggle mode-toggle--compare"
			@click=${this.handleCompare}
		>
			<span class="mode-toggle__text">Compare</span>
		</gl-action-chip>`:e$}onActionsSlotChange(e){this.hasActions=e.target.assignedElements().length>0}renderCloseButton(){if(null==this.activeMode)return e$;let e=hD[this.activeMode],t=ex`<gl-action-chip
			icon="close"
			label=${e.closeLabel}
			overlay="tooltip"
			class="mode-close"
			@click=${this.handleCloseMode}
		></gl-action-chip>`;return this.inResultsView?ex`<gl-action-chip
					icon="debug-restart"
					label="Restart"
					overlay="tooltip"
					class="mode-restart"
					@click=${this.handleBack}
				></gl-action-chip
				>${t}`:this.modeStatus?.[this.activeMode]?.execState==="generating"?t:ex`<gl-action-chip
				icon="refresh"
				label="Refresh"
				overlay="tooltip"
				class="mode-refresh"
				@click=${this.handleRefresh}
			></gl-action-chip
			>${t}`}};hL.styles=[rd,hM,hR,hT],hO([ej()],hL.prototype,"activeMode",2),hO([ej({type:Boolean})],hL.prototype,"loading",2),hO([ej({type:Array})],hL.prototype,"modes",2),hO([ej({type:Boolean})],hL.prototype,"compareEnabled",2),hO([ej({attribute:!1})],hL.prototype,"modeStatus",2),hO([ej({type:Boolean,attribute:"in-results-view"})],hL.prototype,"inResultsView",2),hO([eO()],hL.prototype,"hasActions",2),hL=hO([eM("gl-details-header")],hL);var hF=Object.defineProperty,hN=Object.getOwnPropertyDescriptor;let hq=class extends lit_element_i{};hq.styles=[rd,j`
			:host {
				display: block;
				height: 0;
				margin: var(--gl-space-6);
				border-top: var(--gl-border-width) solid var(--vscode-menu-separatorBackground);
			}
		`],hq=((e,t,i,o)=>{for(var r,s=o>1?void 0:o?hN(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hF(t,i,s),s})([eM("menu-divider")],hq);var hU=Object.defineProperty,hW=Object.getOwnPropertyDescriptor,hH=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?hW(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hU(t,i,s),s};let hV=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.role="option",this.onKeydown=e=>{this.disabled||e.target!==this||("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.click())}}updateInteractiveState(){this.tabIndex=this.disabled?-1:"option"===this.role?0:-1}updated(e){(e.has("disabled")||e.has("role"))&&this.updateInteractiveState()}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}render(){return this.href?ex`<a href=${this.href}><slot></slot></a>`:ex`<slot></slot>`}};hV.styles=[rd,j`
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
		`],hH([ej({type:Boolean,reflect:!0})],hV.prototype,"disabled",2),hH([ej({reflect:!0})],hV.prototype,"href",2),hH([ej({reflect:!0})],hV.prototype,"role",2),hV=hH([eM("menu-item")],hV);var hK=Object.defineProperty,hG=Object.getOwnPropertyDescriptor;let hZ=class extends lit_element_i{render(){return ex`<slot></slot>`}};hZ.styles=[rd,j`
			:host {
				display: block;
				padding-right: var(--gl-space-6);
				padding-left: var(--gl-space-6);
				margin: 0;
				font-size: 0.84em;
				line-height: 2.2rem;
				color: var(--vscode-menu-foreground);
				text-transform: uppercase;
				user-select: none;
				opacity: 0.6;
				-webkit-font-smoothing: auto;
			}
		`],hZ=((e,t,i,o)=>{for(var r,s=o>1?void 0:o?hG(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hK(t,i,s),s})([eM("menu-label")],hZ);var hY=Object.defineProperty,hX=Object.getOwnPropertyDescriptor,hJ=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?hX(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&hY(t,i,s),s};let hQ=class extends lit_element_i{constructor(){super(...arguments),this.onBack=()=>{this.navigation?.canBack&&this.dispatchEvent(new CustomEvent("gl-nav-back",{bubbles:!0,composed:!0}))},this.onForward=()=>{this.navigation?.canForward&&this.dispatchEvent(new CustomEvent("gl-nav-forward",{bubbles:!0,composed:!0}))}}render(){let e=this.navigation;return null==e||e.count<=1?e$:ex`<gl-action-chip
				icon="chevron-left"
				label="Go Back"
				overlay="tooltip"
				?disabled=${!e.canBack}
				@click=${this.onBack}
			></gl-action-chip>
			<gl-action-chip
				icon="chevron-right"
				label="Go Forward"
				overlay="tooltip"
				?disabled=${!e.canForward}
				@click=${this.onForward}
			></gl-action-chip>`}};hQ.styles=j`
		:host {
			display: inline-flex;
			gap: var(--gl-space-2);
			align-items: center;
		}
	`,hJ([ej({attribute:!1})],hQ.prototype,"navigation",2),hQ=hJ([eM("gl-nav-buttons")],hQ);var h0=Object.defineProperty,h1=Object.getOwnPropertyDescriptor;let h2=class extends lit_element_i{render(){return ex`<slot></slot>`}};h2.styles=j`
		:host {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
		}

		::slotted(webview-pane) {
			flex: none;
		}

		:host([flexible]) ::slotted(webview-pane[flexible][expanded]) {
			flex: 1;
		}
	`,h2=((e,t,i,o)=>{for(var r,s=o>1?void 0:o?h1(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&h0(t,i,s),s})([eM("webview-pane-group")],h2);let h5=j`
	:host {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns:
			var(
				--gl-split-panel-start-size,
				min(var(--_start-size, 0%), calc(100% - var(--gl-split-panel-divider-width, 4px)))
			)
			var(--gl-split-panel-divider-width, 4px) 1fr;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	:host([orientation='vertical']) {
		grid-template-rows:
			var(
				--gl-split-panel-start-size,
				min(var(--_start-size, 0%), calc(100% - var(--gl-split-panel-divider-width, 4px)))
			)
			var(--gl-split-panel-divider-width, 4px) 1fr;
		grid-template-columns: 1fr;
	}

	/* :host { display: grid } overrides the UA [hidden] rule; re-assert it. */
	:host([hidden]) {
		display: none;
	}

	:host([dragging]) {
		user-select: none;
	}

	/*
	 * min-width / min-height must be 0 on the slotted grid items themselves.
	 * Grid items default to min-*: auto (intrinsic content size), which prevents
	 * them from shrinking in a single frame when the container narrows — causing
	 * visible multi-frame "catch-up" jank during parent panel resizes. Targeting
	 * the <slot> elements directly doesn't work because slots default to
	 * display: contents and have no box.
	 */
	::slotted(*) {
		min-width: 0;
		height: 100%;
		min-height: 0;
	}

	.divider {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		touch-action: none;
		cursor: ew-resize;
		background-color: transparent;
		transition: background-color var(--gl-duration-x-fast) var(--gl-ease-out);
	}

	:host([orientation='vertical']) .divider {
		cursor: ns-resize;
	}

	.divider:focus {
		outline: none;
	}

	.divider:focus-visible {
		background-color: var(--vscode-focusBorder);
	}

	.divider:hover {
		background-color: var(--vscode-sash-hoverBorder, var(--vscode-focusBorder));
		transition-delay: 0.2s;
	}

	:host([dragging]) .divider,
	.divider:active {
		background-color: var(--vscode-sash-hoverBorder, var(--vscode-focusBorder));
	}

	/* Invisible hit area extending beyond the divider for easier grabbing */
	.divider::after {
		position: absolute;
		left: calc(var(--gl-split-panel-divider-hit-area, 8px) / -2 + var(--gl-split-panel-divider-width, 4px) / 2);
		display: block;
		width: var(--gl-split-panel-divider-hit-area, 8px);
		height: 100%;
		content: '';
	}

	:host([orientation='vertical']) .divider::after {
		top: calc(var(--gl-split-panel-divider-hit-area, 8px) / -2 + var(--gl-split-panel-divider-width, 4px) / 2);
		left: 0;
		width: 100%;
		height: var(--gl-split-panel-divider-hit-area, 8px);
	}

	@media (forced-colors: active) {
		.divider {
			outline: solid 1px transparent;
		}
	}

	/*
	 * Overlay mode — start panel floats over the end panel instead of redistributing space.
	 * Drag/snap/percentage math is unchanged; only the layout switches from grid to absolute
	 * positioning. The end panel always fills the container; the start panel is sized via the
	 * same --_start-size custom property the grid track would have used.
	 */
	:host([mode='overlay']) {
		position: relative;
		display: block;
		grid-template-rows: unset;
		grid-template-columns: unset;
	}

	:host([mode='overlay']) ::slotted([slot='start']) {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		width: var(--_start-size, 0%);
		max-width: 100%;
		box-shadow: 0 0 0.5rem var(--vscode-widget-shadow, rgb(0 0 0 / 36%));
		transition: width var(--gl-duration-x-fast) var(--gl-ease-out);
	}

	:host([mode='overlay'][dragging]) ::slotted([slot='start']) {
		transition: none;
	}

	:host([mode='overlay']) ::slotted([slot='end']) {
		position: absolute;
		inset: 0;
		width: 100%;
	}

	:host([mode='overlay']) .divider {
		position: absolute;
		top: 0;
		bottom: 0;

		/* Sit flush against the panel's right edge — not centered on the boundary like split
		   mode — so the visible divider stays entirely outside the floating panel.
		   The ::after hit area still extends 2px into the panel, keeping it grabbable. */
		left: var(--_start-size, 0%);
		z-index: 3;
		width: var(--gl-split-panel-divider-width, 4px);
		height: auto;
		transition:
			background-color var(--gl-duration-x-fast) var(--gl-ease-out),
			left var(--gl-duration-x-fast) var(--gl-ease-out);
	}

	:host([mode='overlay'][dragging]) .divider {
		transition: none;
	}
`;var h3=Object.defineProperty,h4=Object.getOwnPropertyDescriptor,h6=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?h4(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&h3(t,i,s),s};let h7=class extends lit_element_i{constructor(){super(...arguments),this._size=0,this._position=0,this._positionBeforeCollapse=0,this._cachedPrimaryPx=0,this._lastPointerDownTime=0,this.orientation="horizontal",this.mode="split",this.disabled=!1}get position(){return this._position}set position(e){let t=this._position;this._position=h8(e),this.updateCachedPrimaryPx(),void 0!==this._closedState&&this.emitClosedIfChanged(),this.requestUpdate("position",t)}get isHorizontal(){return"vertical"!==this.orientation}reconcileOrientation(){if(null==this._observedOrientation||this._observedOrientation===this.orientation)return!1;let e=this.getBoundingClientRect(),t=Math.round(this.isHorizontal?e.width:e.height);if(t<=0)return!1;this._observedOrientation=this.orientation,this._size=t;let i=this.applySnap(this._position);return i!==this._position&&(this._position=i,this.requestUpdate()),this.updateCachedPrimaryPx(),!0}updateCachedPrimaryPx(){this._size<=0||("end"===this.primary?this._cachedPrimaryPx=(100-this._position)/100*this._size:this._cachedPrimaryPx=this._position/100*this._size)}connectedCallback(){super.connectedCallback?.(),this._resizeObserver=new ResizeObserver(e=>{let t=e[0].contentRect,i=Math.round(this.isHorizontal?t.width:t.height);if(0!==i&&!this.reconcileOrientation()&&i!==this._size){let e=this._position;if(this._size=i,this.primary&&this._cachedPrimaryPx>0){let e="end"===this.primary?h8(100-this._cachedPrimaryPx/i*100):h8(this._cachedPrimaryPx/i*100),t=this.applySnap(e),o=!0===this._closedState;this._position=!o&&this.computeClosed(t)?e:t}this._position!==e&&this.emitChange(),this.requestUpdate()}}),this.updateComplete.then(()=>{this._resizeObserver.observe(this);let e=this.getBoundingClientRect();this._size=Math.round(this.isHorizontal?e.width:e.height),this._observedOrientation=this.orientation,this._closedState=null!=this.primary&&this.computeClosed(this._position);let t=this.applySnap(this._position);t!==this._position&&(this._position=t,this.emitChange()),this.updateCachedPrimaryPx(),this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback?.(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._dragAc?.abort(),this._dragAc=void 0}willUpdate(){this.style.setProperty("--_start-size",`${this._position}%`)}updated(){this.reconcileOrientation()}render(){return ex`
			<slot name="start" part="start" class="start"></slot>

			<div
				part="divider"
				class="divider"
				tabindex=${this.disabled?-1:0}
				role="separator"
				aria-orientation=${this.orientation}
				aria-valuenow=${Math.max(0,Math.min(100,Math.round(this._position)))}
				aria-valuemin="0"
				aria-valuemax="100"
				aria-label="Resize"
				@keydown=${this.handleKeyDown}
				@pointerdown=${this.handlePointerDown}
			>
				<slot name="divider"></slot>
			</div>

			<slot name="end" part="end" class="end"></slot>
		`}applySnap(e){return this.snap?this.snap({pos:e,size:this._size}):e}emitChange(){this.dispatchEvent(new CustomEvent("gl-split-panel-change",{detail:{position:this._position}})),this.emitClosedIfChanged()}computeClosed(e){return null!=this.primary&&("end"===this.primary?e>=100:e<=0)}emitClosedIfChanged(){if(null==this.primary)return;let e=this.computeClosed(this._position);this._closedState!==e&&(this._closedState=e,this.dispatchEvent(new CustomEvent("gl-split-panel-closed-change",{detail:{closed:e,position:this._position}})))}handlePointerDown(e){if(this.disabled||0!==e.button)return;e.preventDefault();let t=e.timeStamp;if(t-this._lastPointerDownTime<400){this._lastPointerDownTime=0,this.dispatchEvent(new CustomEvent("gl-split-panel-dblclick",{bubbles:!0,composed:!0}));return}this._lastPointerDownTime=t;let i=this.isHorizontal,o=this.getBoundingClientRect(),r=i?e.clientX-o.left:e.clientY-o.top,s=this.dividerEl.getBoundingClientRect(),a=h8((i?s.left-o.left+s.width/2:s.top-o.top+s.height/2)/this._size*100);Math.abs(a-this._position)>1&&(this._position=a,this.updateCachedPrimaryPx(),this.style.setProperty("--_start-size",`${this._position}%`)),this.toggleAttribute("dragging",!0),this.dividerEl.setPointerCapture(e.pointerId),this._dragAc?.abort();let c=new AbortController;this._dragAc=c;let h=r-this._position/100*this._size,p=e=>{if(this._size<=0)return;let t=this.getBoundingClientRect(),o=((i?e.clientX-t.left:e.clientY-t.top)-h)/this._size*100;this.position=this.applySnap(o),this.emitChange()},u=()=>{this.toggleAttribute("dragging",!1),c.abort(),this._dragAc=void 0,this.dispatchEvent(new CustomEvent("gl-split-panel-drag-end",{detail:{position:this._position},bubbles:!0,composed:!0}))};this.dividerEl.addEventListener("pointermove",p,{passive:!0,signal:c.signal}),this.dividerEl.addEventListener("lostpointercapture",u,{signal:c.signal})}handleKeyDown(e){if(this.disabled)return;let t=e.shiftKey?10:1,i=this._position,o=!0,r=this.isHorizontal;switch(e.key){case"ArrowLeft":r?i-=t:o=!1;break;case"ArrowRight":r?i+=t:o=!1;break;case"ArrowUp":r?o=!1:i-=t;break;case"ArrowDown":r?o=!1:i+=t;break;case"Home":i=0;break;case"End":i=100;break;case"Enter":"end"===this.primary?this._position>=100&&this._positionBeforeCollapse<100?i=this._positionBeforeCollapse:(this._positionBeforeCollapse=this._position,i=100):this._position<=0&&this._positionBeforeCollapse>0?i=this._positionBeforeCollapse:(this._positionBeforeCollapse=this._position,i=0);break;default:o=!1}o&&(e.preventDefault(),this.position=this.applySnap(i),this.emitChange())}};function h8(e){return Math.max(0,Math.min(100,e))}h7.styles=h5,h6([ej({type:Number,reflect:!0})],h7.prototype,"position",1),h6([ej({reflect:!0})],h7.prototype,"orientation",2),h6([ej({attribute:!1})],h7.prototype,"snap",2),h6([ej({reflect:!0})],h7.prototype,"primary",2),h6([ej({reflect:!0})],h7.prototype,"mode",2),h6([ej({type:Boolean,reflect:!0})],h7.prototype,"disabled",2),h6([eL(".divider")],h7.prototype,"dividerEl",2),h7=h6([eM("gl-split-panel")],h7);var h9=Object.defineProperty,de=Object.getOwnPropertyDescriptor,dt=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?de(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&h9(t,i,s),s};let di=class extends GlDetailsBase{constructor(){super(...arguments),this.autolinksEnabled=!1,this.hasRemotes=!0,this.explainBusy=!1,this.reachabilityState="idle",this.aiEnabled=!1,this.compareEnabled=!1,this.showJumpToNearestWip=!1,this.inResultsView=!1,this.loading=!1,this.panelActions=!0,this.showPin=!1,this.pinned=!1,this.showGraphAction=!1,this._reachabilityExpanded=!1,this._modifiers=new ModifierKeysController(this),this._userAdjustedSplitter=!1,this._commitChanging=!1,this._messagePanelSnap=({pos:e})=>Math.max(5,Math.min(e,60)),this._onMessagePanelChange=e=>{this._messagePanelHeight=e.detail.position},this._onMessagePanelDragEnd=()=>{this._userAdjustedSplitter=!0},this._onDividerDblClick=()=>{this._userAdjustedSplitter=!1,this._messagePanelHeight=void 0;let e=this.renderRoot.querySelector("gl-split-panel");e&&(e.position=25),this.requestUpdate()},this.onJumpToNearestWipClick=()=>{let e=this.commit?.sha;e&&this.dispatchEvent(new CustomEvent("gl-jump-to-nearest-wip",{detail:{fromSha:e},bubbles:!0,composed:!0}))},this.onOpenInGraph=e=>{this.dispatchEvent(new CustomEvent("gl-commit-actions",{detail:{action:"graph",alt:e.altKey},bubbles:!0,composed:!0}))},this.onTogglePin=()=>{this.dispatchEvent(new CustomEvent("gl-pin",{bubbles:!0,composed:!0}))},this.onMoreActionsClick=e=>{e.preventDefault(),e.stopPropagation();let t=e.currentTarget;if(null==t)return;let i=t.getBoundingClientRect();t.dispatchEvent(new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:i.left,clientY:i.bottom,button:2}))},this.onStashApplyClick=e=>{let t=this.commit;t?.stashNumber!=null&&this.dispatchEvent(new CustomEvent("gl-stash-apply",{detail:{repoPath:t.repoPath,stashItem:{refType:"stash",sha:t.sha,ref:t.sha,repoPath:t.repoPath,name:`stash@{${t.stashNumber}}`,stashNumber:t.stashNumber,message:t.message},deleteAfter:e.altKey||e.shiftKey},bubbles:!0,composed:!0}))}}get isStash(){return this.commit?.stashNumber!=null}get isPopMode(){return this._modifiers.altKey||this._modifiers.shiftKey}disconnectedCallback(){super.disconnectedCallback?.(),this._scrollbarObserver?.disconnect(),this._scrollbarObserver=void 0,this._userAdjustedSplitter=!1,this._messagePanelHeight=void 0}willUpdate(e){if(super.willUpdate?.(e),e.has("commit")){let t=e.get("commit");t?.sha!==this.commit?.sha&&this.loading&&(this._commitChanging=!0)}e.has("loading")&&!this.loading&&(this._commitChanging=!1)}updated(e){e.has("explain")&&(this.explainBusy=!1,this.renderRoot.querySelector('[data-region="commit-explanation"]')?.scrollIntoView()),e.has("commit")&&(this.explainBusy=!1,this._reachabilityExpanded=!1,this.renderRoot.querySelector('[data-region="message"]')?.scrollTo?.(0,0)),this.observeMessageScrollbar()}observeMessageScrollbar(){let e=this.renderRoot.querySelector('[data-region="message"]');if(!e||this._scrollbarObserver)return;let t=()=>{let t=e.scrollHeight>e.clientHeight;e.closest(".message-block")?.toggleAttribute("data-has-scrollbar",t)};this._scrollbarObserver=new ResizeObserver(t),this._scrollbarObserver.observe(e),t()}render(){return null==this.commit?this.panelActions?e$:this.renderEmptyContent():this.renderEmbedded()}renderEmbedded(){if(!this.commit)return e$;let e=null!=this.subPanelContent&&this.subPanelContent!==e$,t=!this.isUncommitted,i=this.isStash?"stash":"commit",o={multiDiff:this.getMultiDiffRefs(),loading:this.loading};return ex`
			${e?e$:this.renderHiddenNotice()} ${this.renderEmbeddedAuthorHeader()}
			${e?ex`${this.renderEmbeddedMetadataBar()}
						<div class="sub-panel-enter">${this.subPanelContent}</div>`:ex`${this.renderEmbeddedMetadataBar()}
					${t?ex`<gl-split-panel
								orientation="vertical"
								primary="start"
								class="split ${this._userAdjustedSplitter?"":"split--auto-size"}"
								.position=${this._messagePanelHeight??25}
								.snap=${this._messagePanelSnap}
								@gl-split-panel-change=${this._onMessagePanelChange}
								@gl-split-panel-drag-end=${this._onMessagePanelDragEnd}
								@gl-split-panel-dblclick=${this._onDividerDblClick}
							>
								<div slot="start" class="msg-slot">${this.renderEmbeddedMessage()}</div>
								<div slot="divider" class="split__handle"></div>
								<div slot="end" class="bottom-section">
									${this.renderEmbeddedAutolinks()} ${this.renderEmbeddedExplainInput()}
									<div class="files">
										<webview-pane-group flexible>
											${this.renderChangedFiles(i,o)}
										</webview-pane-group>
									</div>
								</div>
							</gl-split-panel>`:ex`<div class="files">
								<webview-pane-group flexible>
									${this.renderChangedFiles(i,o)}
								</webview-pane-group>
							</div>`}`}
		`}getMultiDiffRefs(){let e=this.commit;if(e)return this.isUncommitted?{repoPath:e.repoPath,lhs:"HEAD",rhs:"",wip:!0,title:"Working Changes"}:{repoPath:e.repoPath,lhs:e.parents[0]??"",rhs:e.sha,title:`Changes in ${e.shortSha}`}}renderEmbeddedAuthorHeader(){var e,t;let i=this.commit;if(!i)return e$;let o=(e=i.author,t=this.preferences?.currentUserNameStyle??"you",e.current?function(e,t){switch(t){case"name":return e;case"nameAndYou":if("You"===e||e.endsWith(" (you)"))return e;return e?`${e} (you)`:"You";default:return"You"}}(e.name,t):e.name),r=ex`<gl-commit-author
			class="author-header__author"
			layout="stacked"
			.avatarUrl="${i.author.avatar??""}"
			.committerEmail="${i.committer.email}"
			.committerAvatarUrl="${i.committer.avatar}"
			.committerName="${i.committer.name}"
			email="${i.author.email}"
			name="${o}"
			author-name="${i.author.name}"
			.authorDate="${i.author.date}"
			.committerDate="${i.committer.date}"
			.dateFormat="${this.preferences?.dateFormat}"
			.dateStyle="${this.preferences?.dateStyle??"relative"}"
			.showAvatar="${this.preferences?.avatars??!0}"
			.showSignature="${this.preferences?.showSignatureBadges??!0}"
			.signature="${this.signature}"
		></gl-commit-author>`;if(!this.panelActions)return ex`<div class="author-header">${r}</div>`;let{isStash:s}=this,a="review"===this.activeMode?ex`<div class="mode-title">
						<span class="mode-title__verb">
							<code-icon class="mode-title__icon" icon="checklist"></code-icon>
							Reviewing Commit
						</span>
					</div>`:r;return ex`<gl-details-header
			.activeMode=${this.activeMode}
			.modeStatus=${this.modeStatus}
			.loading=${this.loading}
			.modes=${this.computeCommitModes()}
			.compareEnabled=${this.compareEnabled}
			?in-results-view=${this.inResultsView}
		>
			${a}
			${null==this.activeMode&&((this.navigation?.count??0)>1||this.showJumpToNearestWip&&!s&&!this.isUncommitted)?ex`<span slot="actions" class="nav-jump">
						<gl-nav-buttons .navigation=${this.navigation}></gl-nav-buttons>
						${this.showJumpToNearestWip&&!s&&!this.isUncommitted?ex`<gl-action-chip
									icon="download"
									iconFlip="block"
									label="Jump to Working Changes"
									overlay="tooltip"
									@click=${this.onJumpToNearestWipClick}
								></gl-action-chip>`:e$}
					</span>`:e$}
			${null==this.activeMode&&this.showPin?ex`<gl-action-chip
						slot="actions"
						class="pin-action${this.pinned?" pinned":""}"
						icon=${this.pinned?"gl-pinned-filled":"pin"}
						label=${this.pinned?`Unpin this Commit
Restores Automatic Following`:`Pin this Commit
Suspends Automatic Following`}
						overlay="tooltip"
						@click=${this.onTogglePin}
					></gl-action-chip>`:e$}
			${null==this.activeMode&&this.showGraphAction?ex`<gl-action-chip
						slot="actions"
						icon="gl-graph"
						label="Open in Commit Graph"
						overlay="tooltip"
						@click=${this.onOpenInGraph}
					></gl-action-chip>`:e$}
			${s3(null==this.activeMode,()=>ex`<gl-action-chip
						slot="actions"
						icon="refresh"
						label="Refresh"
						overlay="tooltip"
						@click=${()=>this.dispatchEvent(new CustomEvent("refresh-commit",{bubbles:!0,composed:!0}))}
					></gl-action-chip>`)}
		</gl-details-header>`}computeCommitModes(){return this.aiEnabled?this.isUncommitted?["compose","review"]:["review"]:[]}renderEmbeddedMetadataBar(){let e=this.commit;if(!e)return e$;let{isStash:t}=this;return ex`<div class="metadata-bar">
				<div class="metadata-bar__left">
					<gl-commit-sha-copy
						class="metadata-bar__sha"
						appearance="toolbar"
						tooltip-placement="bottom"
						copy-label="${t?"Copy Stash Number":"Copy SHA"}"
						copied-label="Copied!"
						.sha=${t?`#${e.stashNumber}`:e.sha}
						.icon=${t?"gl-stashes-view":"git-commit"}
					></gl-commit-sha-copy>
					${t?this.renderStashApplyButton():e$}
					${s3(!t&&!this.isUncommitted&&this.hasRemotes&&null==this.activeMode,()=>ex`<gl-action-chip
								class="metadata-bar__action metadata-bar__action--remote"
								icon="globe"
								label="Open Commit on Remote"
								overlay="tooltip"
								@click=${()=>this.dispatchEvent(new CustomEvent("open-on-remote",{detail:{sha:e.sha},bubbles:!0,composed:!0}))}
							></gl-action-chip>`)}
					${this.isUncommitted?e$:this.renderMoreActionsButton()}
					${t?this.branchName?ex`<gl-tooltip content="Stashed on ${this.branchName}">
									<span class="metadata-bar__branch-indicator">
										<gl-branch-name
											class="metadata-bar__branch"
											.name=${this.branchName}
										></gl-branch-name>
									</span>
								</gl-tooltip>`:e$:!this.isUncommitted?this.renderBranchIndicator():e$}
				</div>
				<div class="metadata-bar__right">
					${this.modeStatusText?ex`<span class="mode-status">${this.modeStatusText}</span>`:this.renderCommitStats(e.stats)}
				</div>
			</div>
			${this._reachabilityExpanded?ex`<div class="reachability">${this.renderReachability()}</div>`:e$}`}renderMoreActionsButton(){let e=this.isStash,t=this.getCommitOrStashContext();return null==t?e$:ex`<gl-action-chip
			class="metadata-bar__action metadata-bar__action--more"
			icon="kebab-vertical"
			label="Show ${e?"Stash":"Commit"} Actions"
			data-vscode-context=${t}
			@click=${this.onMoreActionsClick}
		></gl-action-chip>`}renderStashApplyButton(){if(this.commit?.stashNumber==null)return e$;let e=this.isPopMode;return ex`<gl-action-chip
			class="metadata-bar__action metadata-bar__action--apply"
			icon=${e?"git-stash-pop":"git-stash-apply"}
			label=${e?"Pop Stash":"Apply Stash"}
			alt-icon=${e?e$:"git-stash-pop"}
			alt-label=${e?e$:"Pop Stash"}
			@click=${this.onStashApplyClick}
		></gl-action-chip>`}getCommitOrStashContext(){let e=this.commit;if(null!=e){if(this.isStash){let t=e.stashNumber;if(null==t)return;return tz({webviewItem:"gitlens:stash",webviewItemValue:{type:"stash",ref:s4(e.sha,e.repoPath,{refType:"stash",name:`stash@{${t}}`,number:t,message:e.message,stashOnRef:e.stashOnRef})}})}return tz({webviewItem:"gitlens:commit",webviewItemValue:{type:"commit",ref:s4(e.sha,e.repoPath,{refType:"revision",message:e.message})}})}}get primaryReachableRef(){let e=this.reachability?.refs;if(e?.length)return e.find(e=>"branch"===e.refType)??e[0]}renderBranchIndicator(){let e=this.reachabilityState,t=this.reachability?.refs,i=this.primaryReachableRef,o=t?.length?t.length-!!i:0;return"loading"===e?ex`<button class="metadata-bar__branch-indicator" disabled aria-label="Loading branches and tags">
				<code-icon icon="git-branch"></code-icon>
				<code-icon icon="loading" modifier="spin" class="metadata-bar__branch-status"></code-icon>
			</button>`:"error"===e?ex`<gl-tooltip content="Unable to load branch reachability. Click to Retry">
				<button
					class="metadata-bar__branch-indicator metadata-bar__branch-indicator--error"
					@click=${()=>this.dispatchEvent(new CustomEvent("refresh-reachability"))}
				>
					<code-icon icon="git-branch"></code-icon>
					<code-icon icon="error" class="metadata-bar__branch-status"></code-icon>
				</button>
			</gl-tooltip>`:"loaded"===e&&t?.length===0?ex`<gl-tooltip content="This commit is not reachable from any branch or tag">
				<span class="metadata-bar__branch-unreachable">
					<code-icon icon="git-branch"></code-icon> Unreachable
				</span>
			</gl-tooltip>`:i?ex`<gl-tooltip
				content="${this._reachabilityExpanded?"Hide All Branches & Tags Containing this Commit":"Show All Branches & Tags Containing this Commit"}"
			>
				<button
					class="metadata-bar__branch-indicator"
					aria-expanded="${this._reachabilityExpanded}"
					@click=${this.onToggleReachability}
				>
					<gl-branch-name
						class="metadata-bar__branch${"tag"===i.refType?" metadata-bar__branch--tag":""}"
						.name=${i.name}
						.icon=${"tag"===i.refType?"tag":void 0}
					></gl-branch-name>
					${o>0?ex`<span class="metadata-bar__ref-count">+${o}</span>`:e$}
				</button>
			</gl-tooltip>`:ex`<gl-tooltip content="Show All Branches &amp; Tags Containing this Commit">
			<button
				class="metadata-bar__branch-indicator metadata-bar__branch-indicator--idle"
				aria-label="Show all branches and tags"
				@click=${this.onBranchIndicatorClick}
			>
				<code-icon icon="git-branch"></code-icon>
				<code-icon icon="ellipsis" class="metadata-bar__branch-status"></code-icon>
			</button>
		</gl-tooltip>`}onBranchIndicatorClick(){"idle"!==this.reachabilityState||this.reachability?this.onToggleReachability():this.dispatchEvent(new CustomEvent("load-reachability"))}renderEmbeddedMessage(){let e=this.commit;if(!e)return e$;let t=this.formattedMessage??e.message,i=t.indexOf(`\0
\0`),o=3;return -1===i&&(i=t.indexOf(`
`),o=1),ex`<div class="message">
			<div class="message-block">
				${s3(-1===i,()=>ex`<div class="message-block__text scrollable" data-region="message">
							<gl-copy-container
								class="message-block__copy"
								.content=${e.message.replaceAll(`\0
\0`,`
`)}
								copyLabel="Copy Message"
								copiedLabel="Copied!"
								placement="bottom"
							>
								<code-icon icon="copy"></code-icon>
							</gl-copy-container>
							<strong><gl-markdown .markdown=${t} density="compact"></gl-markdown></strong>
						</div>`,()=>ex`<div class="message-block__text scrollable" data-region="message">
							<gl-copy-container
								class="message-block__copy"
								.content=${e.message.replaceAll(`\0
\0`,`
`)}
								copyLabel="Copy Message"
								copiedLabel="Copied!"
								placement="bottom"
							>
								<code-icon icon="copy"></code-icon>
							</gl-copy-container>
							<strong
								><gl-markdown .markdown=${t.substring(0,i)} density="compact"></gl-markdown
							></strong>
							<gl-markdown
								.markdown=${t.substring(i+o)}
								density="compact"
							></gl-markdown>
						</div>`)}
			</div>
		</div>`}renderEmbeddedAutolinks(){return ex`<div class="autolinks">${this.renderAutoLinksChips()}</div>`}renderEmbeddedExplainInput(){return this.orgSettings?.ai===!1?e$:ex`<gl-ai-input
			multiline
			floating-footer
			.busy=${this.explainBusy}
			@gl-explain=${this.onExplainChanges}
		>
			<gl-ai-model-chip slot="footer" .model=${this.aiModel}></gl-ai-model-chip>
		</gl-ai-input>`}onToggleReachability(){(this._reachabilityExpanded||this.reachability?.refs?.length)&&(this._reachabilityExpanded=!this._reachabilityExpanded)}renderHiddenNotice(){return this.searchContext?.hiddenFromGraph?ex`
			<div class="section">
				<div class="alert alert--warning">
					<code-icon icon="warning"></code-icon>
					<p class="alert__content">
						This ${this.isStash?"stash":"commit"} is not currently visible in the Commit Graph.
					</p>
				</div>
			</div>
		`:e$}renderEmptyContent(){return ex`
			<div class="section section--empty" id="empty">
				<p>Rich details for commits and stashes are shown as you navigate:</p>

				<ul class="bulleted">
					<li>lines in the text editor</li>
					<li>
						commits in the <a href="command:gitlens.showGraph">Commit Graph</a>,
						<a href="command:gitlens.showTimelineView">Visual File History</a>, or
						<a href="command:gitlens.showCommitsView">Commits view</a>
					</li>
					<li>stashes in the <a href="command:gitlens.showStashesView">Stashes view</a></li>
				</ul>

				<p>Alternatively, search for or choose a commit</p>

				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button full data-action="pick-commit">Choose Commit...</gl-button>
						<gl-button density="compact" data-action="search-commit" tooltip="Search for Commit"
							><code-icon icon="search"></code-icon
						></gl-button>
					</span>
				</p>
			</div>
		`}get autolinkState(){let e=this.autolinksEnabled,t=this.isUncommitted,i=this.autolinks,o=this.autolinkedIssues,r=this.pullRequest,s=this._cachedAutolinkState;if(s?.autolinksEnabled===e&&s.isUncommitted===t&&s.autolinksRef===i&&s.autolinkedIssuesRef===o&&s.pullRequestRef===r)return s.out;let a=this.computeAutolinkState();return this._cachedAutolinkState={autolinksEnabled:e,isUncommitted:t,autolinksRef:i,autolinkedIssuesRef:o,pullRequestRef:r,out:a},a}computeAutolinkState(){if(!this.autolinksEnabled||this.isUncommitted)return;let e=new Map,t=new Map;if(null!=this.autolinks)for(let i of this.autolinks)e.set(i.id,{type:"autolink",value:i}),t.set(i.url,i.id);let i=this.autolinkedIssues;if(null!=i)for(let o of i){if(null!=o.url){let i=t.get(o.url);null!=i&&e.delete(i)}e.set(o.id,{type:"issue",value:o})}let o=this.pullRequest;if(null!=o){if(null!=o.url){let i=t.get(o.url);null!=i&&e.delete(i)}e.set(o.id,{type:"pr",value:o})}let r=[],s=[],a=[];for(let t of e.values())switch(t.type){case"autolink":r.push(t.value);break;case"issue":s.push(t.value);break;case"pr":a.push(t.value)}return{autolinks:r,issues:s,prs:a,size:e.size}}renderAutoLinksChips(){let e=this.autolinkState;if(null==e)return this._commitChanging?this.renderAutolinksLoading():ny({hasIntegrationsConnected:this.hasIntegrationsConnected,hasAccount:this.hasAccount,showLabel:!0});let{autolinks:t,issues:i,prs:o,size:r}=e;return 0===r?this._commitChanging?this.renderAutolinksLoading():ny({hasIntegrationsConnected:this.hasIntegrationsConnected,hasAccount:this.hasAccount,showLabel:!0}):ex`<gl-chip-overflow max-rows="1">
			${s3(t.length,()=>t.map(e=>{let t=e.description??e.title;return void 0===t&&(t=`Custom Autolink ${e.prefix}${e.id}`),ex`<gl-autolink-chip
						type="autolink"
						name="${t}"
						url="${e.url}"
						identifier="${e.prefix}${e.id}"
						openOnRemote
					></gl-autolink-chip>`}))}
			${s3(o.length,()=>o.map(e=>ex`<gl-autolink-chip
							type="pr"
							name="${e.title}"
							url="${e.url}"
							identifier="#${e.id}"
							status="${e.state}"
							.date=${e.updatedDate}
							.dateFormat="${this.preferences?.dateFormat}"
							.dateStyle="${this.preferences?.dateStyle}"
							.author=${e.author?.name}
							?isDraft=${e.isDraft}
							.reviewDecision=${e.reviewDecision}
							.itemId=${e.id}
							.providerId=${e.provider?.id}
							details
							openOnRemote
						></gl-autolink-chip>`))}
			${s3(i.length,()=>i.map(e=>ex`<gl-autolink-chip
							type="issue"
							name="${e.title}"
							url="${e.url}"
							identifier="#${e.id}"
							status="${e.state}"
							.date=${e.closed?e.closedDate:e.createdDate}
							.dateFormat="${this.preferences?.dateFormat}"
							.dateStyle="${this.preferences?.dateStyle}"
							openOnRemote
						></gl-autolink-chip>`))}
			${this.renderAutoLinksPopover(t,o,i)}
			${ny({hasIntegrationsConnected:this.hasIntegrationsConnected,hasAccount:this.hasAccount,slotName:"suffix"})}
		</gl-chip-overflow>`}renderAutolinksLoading(){return ex`<span class="autolinks-loading" aria-busy="true">
			<code-icon icon="loading" modifier="spin"></code-icon>
			<span>Loading autolinks…</span>
		</span>`}renderAutoLinksPopover(e,t,i){return 0===e.length&&0===t.length&&0===i.length?e$:ex`<div slot="popover">
			${t.length>0?ex`<menu-label>Pull Requests</menu-label> ${t.map(e=>ex`<menu-item href=${e.url}>
									<code-icon icon="git-pull-request"></code-icon> #${e.id}${e.title?` \u2014 ${e.title}`:""}
								</menu-item>`)}`:e$}
			${i.length>0?ex`${t.length>0?ex`<menu-divider></menu-divider>`:e$}
						<menu-label>Issues</menu-label>
						${i.map(e=>ex`<menu-item href=${e.url}>
									<code-icon icon="issues"></code-icon> #${e.id}${e.title?` \u2014 ${e.title}`:""}
								</menu-item>`)}`:e$}
			${e.length>0?ex`${t.length>0||i.length>0?ex`<menu-divider></menu-divider>`:e$}
						<menu-label>Autolinks</menu-label>
						${e.map(e=>ex`<menu-item href=${e.url}>
									<code-icon icon="link"></code-icon> ${e.prefix}${e.id}${e.title?` \u2014 ${e.title}`:""}
								</menu-item>`)}`:e$}
		</div>`}renderReachability(){if(!this.reachability?.refs?.length)return e$;let{refs:e}=this.reachability,t=e.filter(e=>"branch"===e.refType),i=e.filter(e=>"tag"===e.refType);return ex`<div class="reachability-summary">
				${this.renderReachabilityChip("branch",t)} ${this.renderReachabilityChip("tag",i)}
			</div>
			${this.reachability.partial?ex`<gl-tooltip content="Load All Branches &amp; Tags">
						<button
							class="reachability__load-all"
							aria-label="Load all branches and tags"
							@click=${()=>this.dispatchEvent(new CustomEvent("load-reachability"))}
						>
							<code-icon icon="sync"></code-icon></button
					></gl-tooltip>`:e$}`}renderReachabilityChip(e,t){if(!t.length)return e$;let i="branch"===e?"git-branch":"tag",o=t.length,[r]=t;if(1===o){let e="branch"===r.refType?r.remote?"remote branch":"branch":"tag";return ex`<gl-action-chip
				icon="${i}"
				label="Commit on 1 ${e}: ${r.name}"
				overlay="tooltip"
				class="reachability-range-chip reachability-range-chip--${"branch"===r.refType?r.remote?"remote-branch":"local-branch":"tag"}${r.current?" reachability-range-chip--current":""}"
				><span class="reachability-range-chip__label">${r.name}</span></gl-action-chip
			>`}let s=t.at(-1);return ex`<gl-popover placement="bottom" trigger="hover focus click" class="reachability-range-chip-wrapper">
			<gl-action-chip
				slot="anchor"
				class="reachability-range-chip reachability-range-chip--range reachability-range-chip--${"branch"===e?"local-branch":"tag"}"
				><span class="reachability-range-chip__label">
					<code-icon icon="${i}"></code-icon>${r.name}
					<span class="reachability-range-chip__ellipsis">...</span>
					<code-icon icon="${i}"></code-icon>${s.name}
				</span>
				<span class="reachability-range-chip__count">+${o}</span></gl-action-chip
			>
			<div slot="content" class="reachability-popover">
				<div class="reachability-popover__header">
					Commit is on ${o} ${"branch"===e?"branches":"tags"}
				</div>
				<div class="reachability-popover__list scrollable">
					${t.map(t=>ex`<div
								class="reachability-list-item${t.current?" reachability-list-item--current":""}"
							>
								<code-icon
									icon="${"branch"===e?"git-branch":"tag"}"
									class="reachability-list-item__icon"
								></code-icon>
								<span class="reachability-list-item__label">${t.name}</span>
							</div>`)}
				</div>
			</div>
		</gl-popover>`}onExplainChanges(e){if(this.explainBusy){e.preventDefault(),e.stopPropagation();return}e.stopPropagation(),this.explainBusy=!0;let t=e instanceof CustomEvent?e.detail?.prompt:void 0;this.dispatchEvent(new CustomEvent("explain-commit",{detail:{prompt:t},bubbles:!0,composed:!0}))}getFileActions(e,t){let i=[{icon:"go-to-file",label:"Open File",action:"file-open"}];return this.isUncommitted||(i.push({icon:"git-compare",label:"Open Changes with Working File",action:"file-compare-working"}),this.isStash||null!=e.submodule||i.push({icon:"globe",label:"Open on Remote",action:"file-open-on-remote"})),i}getFolderContext(e){var t=this.commit?.repoPath;if(t)return tz({webviewItem:"gitlens:folder",webviewItemValue:{type:"folder",path:e.relativePath,repoPath:t}})}getFileContext(e){if(!this.commit)return;let t=this.commit,i=null!=t.stashNumber,o=null!=e.submodule?"+submodule":"",r=!i&&t.reachableFromOtherWorktrees?"+worktree":"";return this.isUncommitted?tz({webviewItem:`gitlens:file${e.staged?"+staged":"+unstaged"}${o}`,webviewItemValue:{type:"file",path:e.path,repoPath:t.repoPath,sha:t.sha,staged:e.staged,status:e.status}}):tz({webviewItem:i?`gitlens:file+stashed${o}`:`gitlens:file+committed${o}${r}`,webviewItemValue:{type:"file",path:e.path,repoPath:t.repoPath,sha:t.sha,stashNumber:t.stashNumber,status:e.status}})}};di.styles=[...nw,cq],dt([ej({type:Object})],di.prototype,"commit",2),dt([ej({type:Boolean})],di.prototype,"autolinksEnabled",2),dt([ej({type:Array})],di.prototype,"autolinkedIssues",2),dt([ej({type:Object})],di.prototype,"pullRequest",2),dt([ej({type:Boolean})],di.prototype,"hasRemotes",2),dt([eO()],di.prototype,"isStash",1),dt([eO()],di.prototype,"explainBusy",2),dt([ej({type:Object})],di.prototype,"explain",2),dt([ej({type:Object})],di.prototype,"reachability",2),dt([ej({type:String})],di.prototype,"reachabilityState",2),dt([ej({type:Array})],di.prototype,"autolinks",2),dt([ej({type:String})],di.prototype,"formattedMessage",2),dt([ej({type:Object})],di.prototype,"signature",2),dt([ej({type:String,attribute:"branch-name"})],di.prototype,"branchName",2),dt([ej({type:Boolean})],di.prototype,"aiEnabled",2),dt([ej({type:Object})],di.prototype,"aiModel",2),dt([ej({type:Boolean,attribute:"compare-enabled"})],di.prototype,"compareEnabled",2),dt([ej({type:Boolean,attribute:"show-jump-to-nearest-wip"})],di.prototype,"showJumpToNearestWip",2),dt([ej()],di.prototype,"activeMode",2),dt([ej({attribute:!1})],di.prototype,"modeStatus",2),dt([ej({attribute:!1})],di.prototype,"subPanelContent",2),dt([ej({attribute:!1})],di.prototype,"modeStatusText",2),dt([ej({type:Boolean})],di.prototype,"inResultsView",2),dt([ej({attribute:!1})],di.prototype,"navigation",2),dt([ej({type:Boolean})],di.prototype,"loading",2),dt([ej({type:Boolean,attribute:"panel-actions"})],di.prototype,"panelActions",2),dt([ej({type:Boolean,attribute:"show-pin"})],di.prototype,"showPin",2),dt([ej({type:Boolean,reflect:!0})],di.prototype,"pinned",2),dt([ej({type:Boolean,attribute:"show-graph-action"})],di.prototype,"showGraphAction",2),dt([eO()],di.prototype,"_reachabilityExpanded",2),dt([eO()],di.prototype,"_userAdjustedSplitter",2),dt([eO()],di.prototype,"_commitChanging",2),di=dt([eM("gl-details-commit-panel")],di);var dr=Object.defineProperty,ds=Object.getOwnPropertyDescriptor,dn=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?ds(t,i):t,a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&dr(t,i,s),s};let da="0000000000000000000000000000000000000000",dl=class extends SignalWatcherWebviewApp{constructor(){super(...arguments),this._host=h??=of(),this._state=function(e){let{signal:t,persisted:i,resetAll:o,startAutoPersist:r,dispose:s}=function(e){let t,i=e?.storage,o=e?.version,r=e?.restoreKey;function s(){if(null==i)return;let t=i.get();if(null==t)return;let s=t.__v,a=t[ri];if(null==r||a===r)return null!=o&&s!==o&&(t=e?.migrate?.(t,s)??void 0),t}let a=s(),c=[],h=[],p=!1;function u(){if(p=!1,t?.getPending(),t?.watch(),null==i||0===h.length)return;let e={};for(let t of(null!=o&&(e.__v=o),null!=r&&(e[ri]=r),e[ro]=Date.now(),h))e[t.key]=t.serialize(t.signal.get());i.set(e)}function g(e){if(null!=e){for(let i of(t===e&&p&&u(),h))e.unwatch(i.signal);t===e&&(t=void 0)}}return{signal:function(e){let t=tS(e);return c.push(()=>t.set(e)),t},persisted:function(e,i,o){if(rr.has(e))throw Error(`Cannot use reserved key '${e}' for persisted signal`);let r=o?.deserialize,s=o?.serialize??(e=>e),c=t=>{if(null==t||!(e in t))return i;let o=t[e];if(null!=r){let e=r(o);return void 0!==e?e:i}return o},p=tS(c(a));return h.push({key:e,signal:p,serialize:s,reset:e=>{p.set(c(e))}}),null!=t&&t.watch(p),p},resetAll:function(){for(let e of c)e();let e=s();for(let t of h)t.reset(e)},startAutoPersist:function(){if(null==i)return()=>{};g(t);let e=new _.subtle.Watcher(()=>{p||(p=!0,queueMicrotask(u))});for(let i of(t=e,h))e.watch(i.signal);return()=>{g(e)}},dispose:function(){g(t),c.length=0,h.length=0}}}({storage:e,version:1}),a=t(!1),c=t(void 0),h=i("pinned",!1),p=i("commitRef",void 0),u=t({count:0,position:0,canBack:!1,canForward:!1}),g=t(void 0),m=t(void 0),f=t(void 0),b=t(void 0),v=rt({ai:!1,drafts:!1}),w=rt(!1),x=new SignalObjectImpl({hasIntegrationsConnected:!1,autolinksEnabled:!1}),C=t(!1),$=t(void 0),S=t(void 0),E=t(void 0),A=t(void 0),P=t(void 0),T=tE(()=>u.get().canBack),M=tE(()=>u.get().canForward),B=tE(()=>{let e=g.get();return e?.sha==="0000000000000000000000000000000000000000"});return{loading:a,error:c,pinned:h,commitRef:p,navigationStack:u,currentCommit:g,searchContext:m,preferences:f,aiModel:b,orgSettings:v,hasAccount:w,capabilities:x,hasRemotes:C,autolinks:$,formattedMessage:S,autolinkedIssues:E,pullRequest:A,signature:P,canNavigateBack:T,canNavigateForward:M,isUncommitted:B,resetAll:o,startAutoPersist:r,dispose:s}}(this._host.storage),this._rpc=new RpcController(this,{rpcOptions:{endpoint:()=>this._host.createEndpoint()},onReady:e=>this._onRpcReady(e),onError:e=>this._state.error.set(e.message)}),this._lastTelemetryContextStr="",this.indentPreference=16}createRenderRoot(){return this}connectedCallback(){super.connectedCallback?.();let e=this.context;this.context=void 0,this.initWebviewContext(e)}disconnectedCallback(){this._unsubscribeEvents?.(),this._unsubscribeEvents=void 0,this._stopAutoPersist?.(),this._stopAutoPersist=void 0,this._resources?.commit.dispose(),this._resources?.reachability.dispose(),this._resources?.explain.dispose(),this._resources=void 0,this._state.orgSettings.disconnect(),this._state.hasAccount.disconnect(),this._actions=void 0,this._state.resetAll(),super.disconnectedCallback?.()}async _onRpcReady(e){var t,i,o;let r=this._state,[s,a,c,h,p,u,g,m,f,b,v,_,w,x]=await Promise.all([e.inspect,e.repository,e.repositories,e.commands,e.config,e.storage,e.ai,e.autolinks,e.subscription,e.integrations,e.files,e.pullRequests,e.drafts,e.telemetry]),[C,$]=await Promise.all([f.orgSettingsState,f.hasAccountState]);r.orgSettings.connect(C),r.hasAccount.connect($);let S={commit:oF((e,t,i)=>s.getCommit(t,i,e)),reachability:oF(async e=>{let t=r.currentCommit.get();if(null!=t)return a.getCommitReachability(t.repoPath,t.sha,e)}),explain:oF(async(e,t)=>{let i=r.currentCommit.get();if(null!=i)try{let o=await s.explainCommit(i.repoPath,i.sha,t,e);if(o.error)return{error:{message:o.error.message??"Error retrieving content"}};return{result:o.result}}catch{return{error:{message:"Error retrieving content"}}}})};this._resources=S,this._actions=(t={inspect:s,drafts:w,repositories:c,repository:a,commands:h,config:p,storage:u,ai:g,autolinks:m,subscription:f,integrations:b,files:v,pullRequests:_,telemetry:x},new CommitDetailsActions(r,t,S)),this._stopAutoPersist=r.startAutoPersist(),this.setupDomListeners(),this._unsubscribeEvents=await (i={inspect:s,repositories:c,config:p,integrations:b,ai:g},o=this._actions,o9([()=>i.inspect.onCommitSelected(e=>{var t,i,s;return t=r,i=e,s=o,void(t.pinned.get()&&i.passive||(t.searchContext.set(i.searchContext),s.fetchCommit(i.repoPath,i.sha)))}),()=>i.repositories.onRepositoryChanged(e=>{var t,i,s;let a;return t=r,i=e,s=o,a=t.currentCommit.get(),void(a?.repoPath===i.repoPath&&i.changes.some(e=>"head"===e||"heads"===e)&&s.clearReachability())}),()=>i.config.onConfigChanged(()=>{o.fetchPreferences()}),()=>i.integrations.onIntegrationsChanged(e=>{var t,i;return t=r,i=e.hasAnyConnected,void(t.capabilities.hasIntegrationsConnected=i)}),()=>i.ai.onModelChanged(e=>r.aiModel.set(e))])),await this._actions.fetchInitialState(),this.updateDocumentProperties()}setupDomListeners(){let e=this._actions;if(null==e)return;let t=this._state,i=()=>{"visible"!==document.visibilityState?e.cancelPendingRequests():t.loading.get()||e.refetchCurrentCommit()};document.addEventListener("visibilitychange",i),this.disposables.push({dispose:()=>document.removeEventListener("visibilitychange",i)}),this.disposables.push(w.on('[data-action="pick-commit"]',"click",()=>e.pickCommit()),w.on('[data-action="search-commit"]',"click",()=>e.searchCommit()),w.on('[data-action="files-layout"]',"click",e=>this.onToggleFilesLayout(e)),w.on('[data-region="pullrequest-pane"]',"expanded-change",e=>this.onExpandedChange(e.detail,"pullrequest")),w.on('[data-action="switch-ai"]',"click",()=>e.executeCommand("gitlens.ai.switchProvider")))}updated(e){this.updateDocumentProperties(),this.pushTelemetryContext()}pushTelemetryContext(){let e=this._actions;if(null==e)return;let t=this._state,i=t.currentCommit.get(),o={"context.autolinks":t.autolinks.get()?.length??0,"context.type":i?.stashNumber!=null?"stash":null!=i?"commit":void 0,"context.uncommitted":t.isUncommitted.get()},r=JSON.stringify(o);r!==this._lastTelemetryContextStr&&(this._lastTelemetryContextStr=r,e.updateTelemetryContext(o))}updateDocumentProperties(){let e=this._state.preferences.get(),t=e?.indent;t===this.indentPreference||(this.indentPreference=t??16,document.documentElement.style.setProperty("--gitlens-tree-indent",`${this.indentPreference}px`))}render(){var e;let t=this._actions,i=this._state,o=this._resources,r=i.currentCommit.get(),s=i.preferences.get(),a=i.orgSettings.get(),c=o?.explain.value.get(),h=o?.reachability.value.get(),p="success"===(e=o?.reachability.status.get()??"idle")?"loaded":e,u=i.searchContext.get();return ex`
			<div class="commit-detail-panel scrollable">
				<gl-error-banner .error=${i.error}></gl-error-banner>
				<main id="main" tabindex="-1">
					<gl-details-commit-panel
						variant="embedded"
						file-icons
						?multi-selectable=${!0}
						.panelActions=${null!=r}
						?show-pin=${null!=r}
						?pinned=${i.pinned.get()}
						?show-graph-action=${null!=r}
						.navigation=${i.navigationStack.get()}
						.commit=${r}
						.loading=${o?.commit.loading.get()??!1}
						.files=${r?.files}
						.preferences=${s}
						.showSearchBox=${s?.showSearchBox??!0}
						.searchBoxFilter=${s?.searchBoxFilter??!0}
						.orgSettings=${a}
						.isUncommitted=${i.isUncommitted.get()}
						.filesCollapsable=${!1}
						.autolinksEnabled=${i.capabilities.autolinksEnabled}
						.autolinks=${i.autolinks.get()}
						.formattedMessage=${i.formattedMessage.get()}
						.autolinkedIssues=${i.autolinkedIssues.get()}
						.pullRequest=${i.pullRequest.get()}
						.signature=${i.signature.get()}
						.hasAccount=${i.hasAccount.get()}
						.hasIntegrationsConnected=${i.capabilities.hasIntegrationsConnected}
						.hasRemotes=${i.hasRemotes.get()}
						.explain=${c}
						.searchContext=${u}
						.reachability=${h}
						.reachabilityState=${p}
						.branchName=${r?.stashOnRef}
						.aiEnabled=${a?.ai!==!1}
						.aiModel=${i.aiModel.get()}
						@switch-model=${()=>t?.executeCommand("gitlens.ai.switchProvider")}
						@gl-pin=${()=>t?.togglePin()}
						@gl-nav-back=${()=>t?.navigateBack()}
						@gl-nav-forward=${()=>t?.navigateForward()}
						@gl-commit-actions=${e=>this.onCommitActions(e)}
						@toggle-mode=${e=>t?.openCommitInGraphMode(e.detail.mode,r)}
						@gl-stash-apply=${e=>t?.executeCommand("gitlens.stashesApply",e.detail)}
						@explain-commit=${e=>void t?.explainCommit(e.detail?.prompt)}
						@load-reachability=${()=>void t?.loadReachability()}
						@refresh-reachability=${()=>t?.refreshReachability()}
						@open-on-remote=${e=>t?.openOnRemote(r?.repoPath,e.detail.sha)}
						@refresh-commit=${()=>void t?.refetchCurrentCommit()}
						@change-files-layout=${e=>t?.changeFilesLayout(e.detail.layout)}
						@file-open-on-remote=${e=>t?.openFileOnRemote(e.detail)}
						@file-open=${e=>t?.openFile(e.detail,e.detail.showOptions)}
						@file-compare-working=${e=>t?.openFileCompareWorking(e.detail,e.detail.showOptions)}
						@file-compare-previous=${e=>t?.openFileComparePrevious(e.detail,e.detail.showOptions)}
						@file-more-actions=${e=>t?.executeFileAction(e.detail,e.detail.showOptions)}
						@open-multiple-changes=${e=>t?.openMultipleChanges(e.detail)}
						@copy-commit-patch=${e=>t?.copyCommitPatchToClipboard(e.detail.repoPath,e.detail.to,e.detail.from)}
						@gl-issue-pull-request-details=${()=>t?.openPullRequestDetails()}
						@gl-show-search-box-change=${e=>t?.updateShowSearchBox(e.detail)}
						@gl-search-box-filter-change=${e=>t?.updateSearchBoxFilter(e.detail)}
					></gl-details-commit-panel>
				</main>
			</div>
		`}onToggleFilesLayout(e){let t=e.target?.dataset.filesLayout??void 0,i=this._state.preferences.get();if(i?.files==null||t===i.files.layout)return;let o={...i.files,layout:t??"auto"};this._actions?.updateFilesLayout(o)}onExpandedChange(e,t){"pullrequest"===t&&this._actions?.updatePullRequestExpanded(e.expanded)}onCommitActions(e){null!=this._state.currentCommit.get()&&this._actions?.executeCommitAction(e.detail.action,e.detail.alt)}};dn([ej({type:String,noAccessor:!0})],dl.prototype,"context",2),dl=dn([eM("gl-commit-details-app")],dl);export{dl as GlCommitDetailsApp,da as uncommittedSha};