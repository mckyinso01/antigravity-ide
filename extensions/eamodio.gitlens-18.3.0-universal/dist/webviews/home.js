let t,r,o,i,n,a,c,h,p,u,g,b;var m,f,v,w,_,$,x,C={518(t){function r(t){if("string"!=typeof t)throw TypeError("Path must be a string. Received "+JSON.stringify(t))}function o(t,r){for(var o,i="",n=0,a=-1,c=0,h=0;h<=t.length;++h){if(h<t.length)o=t.charCodeAt(h);else if(47===o)break;else o=47;if(47===o){if(a===h-1||1===c);else if(a!==h-1&&2===c){if(i.length<2||2!==n||46!==i.charCodeAt(i.length-1)||46!==i.charCodeAt(i.length-2)){if(i.length>2){var p=i.lastIndexOf("/");if(p!==i.length-1){-1===p?(i="",n=0):n=(i=i.slice(0,p)).length-1-i.lastIndexOf("/"),a=h,c=0;continue}}else if(2===i.length||1===i.length){i="",n=0,a=h,c=0;continue}}r&&(i.length>0?i+="/..":i="..",n=2)}else i.length>0?i+="/"+t.slice(a+1,h):i=t.slice(a+1,h),n=h-a-1;a=h,c=0}else 46===o&&-1!==c?++c:c=-1}return i}var i={resolve:function(){for(var t,i,n="",a=!1,c=arguments.length-1;c>=-1&&!a;c--)c>=0?i=arguments[c]:(void 0===t&&(t=process.cwd()),i=t),r(i),0!==i.length&&(n=i+"/"+n,a=47===i.charCodeAt(0));if(n=o(n,!a),a)if(n.length>0)return"/"+n;else return"/";return n.length>0?n:"."},normalize:function(t){if(r(t),0===t.length)return".";var i=47===t.charCodeAt(0),n=47===t.charCodeAt(t.length-1);return(0!==(t=o(t,!i)).length||i||(t="."),t.length>0&&n&&(t+="/"),i)?"/"+t:t},isAbsolute:function(t){return r(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var t,o=0;o<arguments.length;++o){var n=arguments[o];r(n),n.length>0&&(void 0===t?t=n:t+="/"+n)}return void 0===t?".":i.normalize(t)},relative:function(t,o){if(r(t),r(o),t===o||(t=i.resolve(t))===(o=i.resolve(o)))return"";for(var n=1;n<t.length&&47===t.charCodeAt(n);++n);for(var a=t.length,c=a-n,h=1;h<o.length&&47===o.charCodeAt(h);++h);for(var p=o.length-h,u=c<p?c:p,g=-1,b=0;b<=u;++b){if(b===u){if(p>u){if(47===o.charCodeAt(h+b))return o.slice(h+b+1);else if(0===b)return o.slice(h+b)}else c>u&&(47===t.charCodeAt(n+b)?g=b:0===b&&(g=0));break}var m=t.charCodeAt(n+b);if(m!==o.charCodeAt(h+b))break;47===m&&(g=b)}var f="";for(b=n+g+1;b<=a;++b)(b===a||47===t.charCodeAt(b))&&(0===f.length?f+="..":f+="/..");return f.length>0?f+o.slice(h+g):(h+=g,47===o.charCodeAt(h)&&++h,o.slice(h))},_makeLong:function(t){return t},dirname:function(t){if(r(t),0===t.length)return".";for(var o=t.charCodeAt(0),i=47===o,n=-1,a=!0,c=t.length-1;c>=1;--c)if(47===(o=t.charCodeAt(c))){if(!a){n=c;break}}else a=!1;return -1===n?i?"/":".":i&&1===n?"//":t.slice(0,n)},basename:function(t,o){if(void 0!==o&&"string"!=typeof o)throw TypeError('"ext" argument must be a string');r(t);var i,n=0,a=-1,c=!0;if(void 0!==o&&o.length>0&&o.length<=t.length){if(o.length===t.length&&o===t)return"";var h=o.length-1,p=-1;for(i=t.length-1;i>=0;--i){var u=t.charCodeAt(i);if(47===u){if(!c){n=i+1;break}}else -1===p&&(c=!1,p=i+1),h>=0&&(u===o.charCodeAt(h)?-1==--h&&(a=i):(h=-1,a=p))}return n===a?a=p:-1===a&&(a=t.length),t.slice(n,a)}for(i=t.length-1;i>=0;--i)if(47===t.charCodeAt(i)){if(!c){n=i+1;break}}else -1===a&&(c=!1,a=i+1);return -1===a?"":t.slice(n,a)},extname:function(t){r(t);for(var o=-1,i=0,n=-1,a=!0,c=0,h=t.length-1;h>=0;--h){var p=t.charCodeAt(h);if(47===p){if(!a){i=h+1;break}continue}-1===n&&(a=!1,n=h+1),46===p?-1===o?o=h:1!==c&&(c=1):-1!==o&&(c=-1)}return -1===o||-1===n||0===c||1===c&&o===n-1&&o===i+1?"":t.slice(o,n)},format:function(t){var r,o;if(null===t||"object"!=typeof t)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return r=t.dir||t.root,o=t.base||(t.name||"")+(t.ext||""),r?r===t.root?r+o:r+"/"+o:o},parse:function(t){r(t);var o,i={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return i;var n=t.charCodeAt(0),a=47===n;a?(i.root="/",o=1):o=0;for(var c=-1,h=0,p=-1,u=!0,g=t.length-1,b=0;g>=o;--g){if(47===(n=t.charCodeAt(g))){if(!u){h=g+1;break}continue}-1===p&&(u=!1,p=g+1),46===n?-1===c?c=g:1!==b&&(b=1):-1!==c&&(b=-1)}return -1===c||-1===p||0===b||1===b&&c===p-1&&c===h+1?-1!==p&&(0===h&&a?i.base=i.name=t.slice(1,p):i.base=i.name=t.slice(h,p)):(0===h&&a?(i.name=t.slice(1,c),i.base=t.slice(1,p)):(i.name=t.slice(h,c),i.base=t.slice(h,p)),i.ext=t.slice(c,p)),h>0?i.dir=t.slice(0,h-1):a&&(i.dir="/"),i},sep:"/",delimiter:":",win32:null,posix:null};i.posix=i,t.exports=i}};let S={};function P(t){let r=S[t];if(void 0!==r)return r.exports;let o=S[t]={exports:{}};return C[t](o,o.exports,P),o.exports}P.d=(t,r)=>{if(Array.isArray(r))for(var o=0;o<r.length;){var i=r[o++],n=r[o++];P.o(t,i)?0===n&&o++:0===n?Object.defineProperty(t,i,{enumerable:!0,value:r[o++]}):Object.defineProperty(t,i,{enumerable:!0,get:n})}else for(var i in r)P.o(r,i)&&!P.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:r[i]})},P.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r),Object.defineProperty(P,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(t){}});let context_request_event_s=class context_request_event_s extends Event{constructor(t,r,o,i){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=r,this.callback=o,this.subscribe=i??!1}};let s=class s{constructor(t,r,o,i){(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(t,r)=>{this.unsubscribe&&(this.unsubscribe!==r&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=t,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(t,r)),this.unsubscribe=r},this.host=t,void 0!==r.context)?(this.context=r.context,this.callback=r.callback,this.subscribe=r.subscribe??!1):(this.context=r,this.callback=o,this.subscribe=i??!1),this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new context_request_event_s(this.context,this.host,this.t,this.subscribe))}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,r=!1){let o=r||!Object.is(t,this.o);this.o=t,o&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(let[t,{disposer:r}]of this.subscriptions)t(this.o,r)},void 0!==t&&(this.value=t)}addCallback(t,r,o){if(!o)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:r});let{disposer:i}=this.subscriptions.get(t);t(this.value,i)}clearCallbacks(){this.subscriptions.clear()}};let e=class e extends Event{constructor(t,r){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=r}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(t,r,o){super(void 0!==r.context?r.initialValue:o),this.onContextRequest=t=>{if(t.context!==this.context)return;let r=t.contextTarget??t.composedPath()[0];r!==this.host&&(t.stopPropagation(),this.addCallback(t.callback,r,t.subscribe))},this.onProviderRequest=t=>{if(t.context!==this.context||(t.contextTarget??t.composedPath()[0])===this.host)return;let r=new Set;for(let[t,{consumerHost:o}]of this.subscriptions)r.has(t)||(r.add(t),o.dispatchEvent(new context_request_event_s(this.context,o,t,!0)));t.stopPropagation()},this.host=t,void 0!==r.context?this.context=r.context:this.context=r,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new e(this.context,this.host))}};function A({context:t}){return(r,o)=>{let i=new WeakMap;if("object"==typeof o)return{get(){return r.get.call(this)},set(t){return i.get(this).setValue(t),r.set.call(this,t)},init(r){return i.set(this,new context_provider_i(this,{context:t,initialValue:r})),r}};{let n;r.constructor.addInitializer(r=>{i.set(r,new context_provider_i(r,{context:t}))});let a=Object.getOwnPropertyDescriptor(r,o);if(void 0===a){let t=new WeakMap;n={get(){return t.get(this)},set(r){i.get(this).setValue(r),t.set(this,r)},configurable:!0,enumerable:!0}}else{let t=a.set;n={...a,set(r){i.get(this).setValue(r),t?.call(this,r)}}}return void Object.defineProperty(r,o,n)}}}function O({context:t,subscribe:r}){return(o,i)=>{"object"==typeof i?i.addInitializer(function(){new s(this,{context:t,callback:t=>{o.set.call(this,t)},subscribe:r})}):o.constructor.addInitializer(o=>{new s(o,{context:t,callback:t=>{o[i]=t},subscribe:r})})}}let E=globalThis,T=E.ShadowRoot&&(void 0===E.ShadyCSS||E.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),M=new WeakMap;let css_tag_n=class css_tag_n{constructor(t,r,o){if(this._$cssResult$=!0,o!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o,r=this.t;if(T&&void 0===t){let o=void 0!==r&&1===r.length;o&&(t=M.get(r)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&M.set(r,t))}return t}toString(){return this.cssText}};let D=t=>new css_tag_n("string"==typeof t?t:t+"",void 0,B),F=(t,...r)=>new css_tag_n(1===t.length?t[0]:r.reduce((r,o,i)=>r+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]),t,B),j=T?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let r="";for(let o of t.cssRules)r+=o.cssText;return D(r)})(t):t,{is:N,defineProperty:W,getOwnPropertyDescriptor:U,getOwnPropertyNames:q,getOwnPropertySymbols:G,getPrototypeOf:K}=Object,V=globalThis,Y=V.trustedTypes,J=Y?Y.emptyScript:"",X=V.reactiveElementPolyfillSupport,Q={toAttribute(t,r){switch(r){case Boolean:t=t?J:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,r){let o=t;switch(r){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},ee=(t,r)=>!N(t,r),et={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:ee};Symbol.metadata??=Symbol("metadata"),V.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=et){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(t,o,r);void 0!==i&&W(this.prototype,t,i)}}static getPropertyDescriptor(t,r,o){let{get:i,set:n}=U(this.prototype,t)??{get(){return this[r]},set(t){this[r]=t}};return{get:i,set(r){let a=i?.call(this);n?.call(this,r),this.requestUpdate(t,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??et}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let t=K(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let t=this.properties;for(let r of[...q(t),...G(t)])this.createProperty(r,t[r])}let t=this[Symbol.metadata];if(null!==t){let r=litPropertyMetadata.get(t);if(void 0!==r)for(let[t,o]of r)this.elementProperties.set(t,o)}for(let[t,r]of(this._$Eh=new Map,this.elementProperties)){let o=this._$Eu(t,r);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let r=[];if(Array.isArray(t))for(let o of new Set(t.flat(1/0).reverse()))r.unshift(j(o));else void 0!==t&&r.push(j(t));return r}static _$Eu(t,r){let o=r.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map;for(let r of this.constructor.elementProperties.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(T)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let o of r){let r=document.createElement("style"),i=E.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=o.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,r,o){this._$AK(t,o)}_$ET(t,r){let o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){let n=(void 0!==o.converter?.toAttribute?o.converter:Q).toAttribute(r,o.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,r){let o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){let t=o.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:Q;this._$Em=i;let a=n.fromAttribute(r,t.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,r,o,i=!1,n){if(void 0!==t){let a=this.constructor;if(!1===i&&(n=this[t]),!(((o??=a.getPropertyOptions(t)).hasChanged??ee)(n,r)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,o))))return;this.C(t,r,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,r,{useDefault:o,reflect:i,wrapped:n},a){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??r??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||o||(r=void 0),this._$AL.set(t,r)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,r]of this._$Ep)this[t]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,o]of t){let{wrapped:t}=o,i=this[r];!0!==t||this._$AL.has(r)||void 0===i||this.C(r,void 0,o,i)}}let t=!1,r=this._$AL;try{(t=this.shouldUpdate(r))?(this.willUpdate(r),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(r)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,X?.({ReactiveElement:y}),(V.reactiveElementVersions??=[]).push("2.1.2");let er=globalThis,eo=t=>t,ei=er.trustedTypes,en=ei?ei.createPolicy("lit-html",{createHTML:t=>t}):void 0,ea="$lit$",es=`lit$${Math.random().toFixed(9).slice(2)}$`,el="?"+es,ec=`<${el}>`,ed=document,eh=()=>ed.createComment(""),ep=t=>null===t||"object"!=typeof t&&"function"!=typeof t,eu=Array.isArray,eg=t=>eu(t)||"function"==typeof t?.[Symbol.iterator],eb=`[ 	
\x0c\r]`,em=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ef=/-->/g,ev=/>/g,ey=RegExp(`>|${eb}(?:([^\\s"'>=/]+)(${eb}*=${eb}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ew=/'/g,e_=/"/g,ek=/^(?:script|style|textarea|title)$/i,e$=t=>(r,...o)=>({_$litType$:t,strings:r,values:o}),ex=e$(1),eC=e$(2),eS=(e$(3),Symbol.for("lit-noChange")),eP=Symbol.for("lit-nothing"),eA=new WeakMap,eO=ed.createTreeWalker(ed,129);function eR(t,r){if(!eu(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==en?en.createHTML(r):r}let eI=(t,r)=>{let o=t.length-1,i=[],n,a=2===r?"<svg>":3===r?"<math>":"",c=em;for(let r=0;r<o;r++){let o=t[r],h,p,u=-1,g=0;for(;g<o.length&&(c.lastIndex=g,null!==(p=c.exec(o)));)g=c.lastIndex,c===em?"!--"===p[1]?c=ef:void 0!==p[1]?c=ev:void 0!==p[2]?(ek.test(p[2])&&(n=RegExp("</"+p[2],"g")),c=ey):void 0!==p[3]&&(c=ey):c===ey?">"===p[0]?(c=n??em,u=-1):void 0===p[1]?u=-2:(u=c.lastIndex-p[2].length,h=p[1],c=void 0===p[3]?ey:'"'===p[3]?e_:ew):c===e_||c===ew?c=ey:c===ef||c===ev?c=em:(c=ey,n=void 0);let b=c===ey&&t[r+1].startsWith("/>")?" ":"";a+=c===em?o+ec:u>=0?(i.push(h),o.slice(0,u)+ea+o.slice(u)+es+b):o+es+(-2===u?r:b)}return[eR(t,a+(t[o]||"<?>")+(2===r?"</svg>":3===r?"</math>":"")),i]};let lit_html_S=class lit_html_S{constructor({strings:t,_$litType$:r},o){let i;this.parts=[];let n=0,a=0,c=t.length-1,h=this.parts,[p,u]=eI(t,r);if(this.el=lit_html_S.createElement(p,o),eO.currentNode=this.el.content,2===r||3===r){let t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=eO.nextNode())&&h.length<c;){if(1===i.nodeType){if(i.hasAttributes())for(let t of i.getAttributeNames())if(t.endsWith(ea)){let r=u[a++],o=i.getAttribute(t).split(es),c=/([.?@])?(.*)/.exec(r);h.push({type:1,index:n,name:c[2],strings:o,ctor:"."===c[1]?I:"?"===c[1]?L:"@"===c[1]?z:H}),i.removeAttribute(t)}else t.startsWith(es)&&(h.push({type:6,index:n}),i.removeAttribute(t));if(ek.test(i.tagName)){let t=i.textContent.split(es),r=t.length-1;if(r>0){i.textContent=ei?ei.emptyScript:"";for(let o=0;o<r;o++)i.append(t[o],eh()),eO.nextNode(),h.push({type:2,index:++n});i.append(t[r],eh())}}}else if(8===i.nodeType)if(i.data===el)h.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(es,t+1));)h.push({type:7,index:n}),t+=es.length-1}n++}}static createElement(t,r){let o=ed.createElement("template");return o.innerHTML=t,o}};function eE(t,r,o=t,i){if(r===eS)return r;let n=void 0!==i?o._$Co?.[i]:o._$Cl,a=ep(r)?void 0:r._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t))._$AT(t,o,i),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(r=eE(t,n._$AS(t,r.values),n,i)),r}let R=class R{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:o}=this._$AD,i=(t?.creationScope??ed).importNode(r,!0);eO.currentNode=i;let n=eO.nextNode(),a=0,c=0,h=o[0];for(;void 0!==h;){if(a===h.index){let r;2===h.type?r=new k(n,n.nextSibling,this,t):1===h.type?r=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(r=new Z(n,this,t)),this._$AV.push(r),h=o[++c]}a!==h?.index&&(n=eO.nextNode(),a++)}return eO.currentNode=ed,i}p(t){let r=0;for(let o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,r),r+=o.strings.length-2):o._$AI(t[r])),r++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,o,i){this.type=2,this._$AH=eP,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return void 0!==r&&11===t?.nodeType&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){ep(t=eE(this,t,r))?t===eP||null==t||""===t?(this._$AH!==eP&&this._$AR(),this._$AH=eP):t!==this._$AH&&t!==eS&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):eg(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==eP&&ep(this._$AH)?this._$AA.nextSibling.data=t:this.T(ed.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=lit_html_S.createElement(eR(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(r);else{let t=new R(i,this),o=t.u(this.options);t.p(r),this.T(o),this._$AH=t}}_$AC(t){let r=eA.get(t.strings);return void 0===r&&eA.set(t.strings,r=new lit_html_S(t)),r}k(t){eu(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,i=0;for(let n of t)i===r.length?r.push(o=new k(this.O(eh()),this.O(eh()),this,this.options)):o=r[i],o._$AI(n),i++;i<r.length&&(this._$AR(o&&o._$AB.nextSibling,i),r.length=i)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let r=eo(t).nextSibling;eo(t).remove(),t=r}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,o,i,n){this.type=1,this._$AH=eP,this._$AN=void 0,this.element=t,this.name=r,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=eP}_$AI(t,r=this,o,i){let n=this.strings,a=!1;if(void 0===n)(a=!ep(t=eE(this,t,r,0))||t!==this._$AH&&t!==eS)&&(this._$AH=t);else{let i,c,h=t;for(t=n[0],i=0;i<n.length-1;i++)(c=eE(this,h[o+i],r,i))===eS&&(c=this._$AH[i]),a||=!ep(c)||c!==this._$AH[i],c===eP?t=eP:t!==eP&&(t+=(c??"")+n[i+1]),this._$AH[i]=c}a&&!i&&this.j(t)}j(t){t===eP?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===eP?void 0:t}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==eP)}};let z=class z extends H{constructor(t,r,o,i,n){super(t,r,o,i,n),this.type=5}_$AI(t,r=this){if((t=eE(this,t,r,0)??eP)===eS)return;let o=this._$AH,i=t===eP&&o!==eP||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==eP&&(o===eP||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};let Z=class Z{constructor(t,r,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){eE(this,t)}};let eT=er.litHtmlPolyfillSupport;eT?.(lit_html_S,k),(er.litHtmlVersions??=[]).push("3.3.3");let eB=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,r,o)=>{let i=o?.renderBefore??r,n=i._$litPart$;if(void 0===n){let t=o?.renderBefore??null;i._$litPart$=n=new k(r.insertBefore(eh(),t),t,void 0,o??{})}return n._$AI(t),n})(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return eS}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,eB.litElementHydrateSupport?.({LitElement:lit_element_i});let ez=eB.litElementPolyfillSupport;ez?.({LitElement:lit_element_i}),(eB.litElementVersions??=[]).push("4.2.2");let eL=t=>(r,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,r)}):customElements.define(t,r)},eM={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:ee};function eD(t){return(r,o)=>{let i;return"object"==typeof o?((t=eM,r,o)=>{let{kind:i,metadata:n}=o,a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),a.set(o.name,t),"accessor"===i){let{name:i}=o;return{set(o){let n=r.get.call(this);r.set.call(this,o),this.requestUpdate(i,n,t,!0,o)},init(r){return void 0!==r&&this.C(i,void 0,t,r),r}}}if("setter"===i){let{name:i}=o;return function(o){let n=this[i];r.call(this,o),this.requestUpdate(i,n,t,!0,o)}}throw Error("Unsupported decorator location: "+i)})(t,r,o):(i=r.hasOwnProperty(o),r.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(r,o):void 0)}}function eF(t){return eD({...t,state:!0,attribute:!1})}let ej=(t,r,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof r&&Object.defineProperty(t,r,o),o);function eN(t,r){return(o,i,n)=>{let a=r=>r.renderRoot?.querySelector(t)??null;if(r){let t,{get:r,set:c}="object"==typeof i?o:n??(t=Symbol(),{get(){return this[t]},set(r){this[t]=r}});return ej(o,i,{get(){let t=r.call(this);return void 0===t&&(null!==(t=a(this))||this.hasUpdated)&&c.call(this,t),t}})}return ej(o,i,{get(){return a(this)}})}}var eW=Object.defineProperty,eU=(t,r,o)=>{let i;return(i="symbol"!=typeof r?r+"":r)in t?eW(t,i,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[i]=o,o},eq=(t,r)=>{if(Object(r)!==r)throw TypeError('Cannot use the "in" operator on this value');return t.has(r)},eH=(t,r,o)=>{if(r.has(t))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(t):r.set(t,o)},eG=(t,r,o)=>{if(!r.has(t))throw TypeError("Cannot access private method");return o};function eK(t,r){return Object.is(t,r)}let eV=null,eY=!1,eJ=1,eX=Symbol("SIGNAL");function eZ(t){let r=eV;return eV=t,r}let eQ={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function e0(t){if(eY)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===eV)return;eV.consumerOnSignalRead(t);let r=eV.nextProducerIndex++;e5(eV),r<eV.producerNode.length&&eV.producerNode[r]!==t&&e2(eV)&&e1(eV.producerNode[r],eV.producerIndexOfThis[r]),eV.producerNode[r]!==t&&(eV.producerNode[r]=t,eV.producerIndexOfThis[r]=e2(eV)?function t(r,o,i){var n;if(e4(r),e5(r),0===r.liveConsumerNode.length){null==(n=r.watched)||n.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)r.producerIndexOfThis[o]=t(r.producerNode[o],r,o)}return r.liveConsumerIndexOfThis.push(i),r.liveConsumerNode.push(o)-1}(t,eV,r):0),eV.producerLastReadVersion[r]=t.version}function e1(t,r){var o;if(e4(t),e5(t),"u">typeof ngDevMode&&ngDevMode&&r>=t.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${r} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(1===t.liveConsumerNode.length){null==(o=t.unwatched)||o.call(t.wrapper);for(let r=0;r<t.producerNode.length;r++)e1(t.producerNode[r],t.producerIndexOfThis[r])}let i=t.liveConsumerNode.length-1;if(t.liveConsumerNode[r]=t.liveConsumerNode[i],t.liveConsumerIndexOfThis[r]=t.liveConsumerIndexOfThis[i],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,r<t.liveConsumerNode.length){let o=t.liveConsumerIndexOfThis[r],i=t.liveConsumerNode[r];e5(i),i.producerIndexOfThis[o]=r}}function e2(t){var r;return t.consumerIsAlwaysLive||((null==(r=null==t?void 0:t.liveConsumerNode)?void 0:r.length)??0)>0}function e5(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function e4(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function e6(t){if(function t(r){if(r.dirty||r.lastCleanEpoch!==eJ){if(!r.producerMustRecompute(r)&&!function(r){e5(r);for(let o=0;o<r.producerNode.length;o++){let i=r.producerNode[o],n=r.producerLastReadVersion[o];if(n!==i.version||(t(i),n!==i.version))return!0}return!1}(r)){r.dirty=!1,r.lastCleanEpoch=eJ;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=eJ}}(t),e0(t),t.value===e7)throw t.error;return t.value}let e3=Symbol("UNSET"),e8=Symbol("COMPUTING"),e7=Symbol("ERRORED"),e9={...eQ,value:e3,dirty:!0,error:null,equal:eK,producerMustRecompute:t=>t.value===e3||t.value===e8,producerRecomputeValue(t){let r;if(t.value===e8)throw Error("Detected cycle in computations.");let o=t.value;t.value=e8;let i=(t&&(t.nextProducerIndex=0),eZ(t)),n=!1;try{r=t.computation.call(t.wrapper),n=o!==e3&&o!==e7&&t.equal.call(t.wrapper,o,r)}catch(o){r=e7,t.error=o}finally{if(eZ(i),t&&void 0!==t.producerNode&&void 0!==t.producerIndexOfThis&&void 0!==t.producerLastReadVersion){if(e2(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)e1(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}if(n){t.value=o;return}t.value=r,t.version++}},te=function(){throw Error()};function tt(){return e0(this),this.value}let tr={...eQ,equal:eK,value:void 0},to=Symbol("node");(t=>{var r,o,i,n;let State=class State{constructor(i,n={}){let a,c;eH(this,o),eU(this,r);let h=((a=Object.create(tr)).value=i,(c=()=>(e0(a),a.value))[eX]=a,c)[eX];if(this[to]=h,h.wrapper=this,n){let r=n.equals;r&&(h.equal=r),h.watched=n[t.subtle.watched],h.unwatched=n[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return tt.call(this[to])}set(r){var o,i;if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(eY)throw Error("Writes to signals not permitted during Watcher callback");o=this[to],(null==eV?void 0:eV.consumerAllowSignalWrites)===!1&&te(),o.equal.call(o.wrapper,o.value,r)||(o.value=r,i=o,i.version++,eJ++,function t(r){if(void 0===r.liveConsumerNode)return;let o=eY;eY=!0;try{for(let o of r.liveConsumerNode)o.dirty||function(r){var o;r.dirty=!0,t(r),null==(o=r.consumerMarkedDirty)||o.call(r.wrapper??r)}(o)}finally{eY=o}}(i))}};r=to,o=new WeakSet,t.isState=t=>"object"==typeof t&&eq(o,t),t.State=State;let Computed=class Computed{constructor(r,o){let a,c;eH(this,n),eU(this,i);let h=((a=Object.create(e9)).computation=r,(c=()=>e6(a))[eX]=a,c)[eX];if(h.consumerAllowSignalWrites=!0,this[to]=h,h.wrapper=this,o){let r=o.equals;r&&(h.equal=r),h.watched=o[t.subtle.watched],h.unwatched=o[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return e6(this[to])}};i=to,n=new WeakSet,t.isComputed=t=>"object"==typeof t&&eq(n,t),t.Computed=Computed,(r=>{var o,i,n,a;r.untrack=function(t){let r,o=null;try{o=eZ(null),r=t()}finally{eZ(o)}return r},r.introspectSources=function(r){var o;if(!(0,t.isComputed)(r)&&!(0,t.isWatcher)(r))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(o=r[to].producerNode)?void 0:o.map(t=>t.wrapper))??[]},r.introspectSinks=function(r){var o;if(!(0,t.isComputed)(r)&&!(0,t.isState)(r))throw TypeError("Called introspectSinks without a Signal argument");return(null==(o=r[to].liveConsumerNode)?void 0:o.map(t=>t.wrapper))??[]},r.hasSinks=function(r){if(!(0,t.isComputed)(r)&&!(0,t.isState)(r))throw TypeError("Called hasSinks without a Signal argument");let o=r[to].liveConsumerNode;return!!o&&o.length>0},r.hasSources=function(r){if(!(0,t.isComputed)(r)&&!(0,t.isWatcher)(r))throw TypeError("Called hasSources without a Computed or Watcher argument");let o=r[to].producerNode;return!!o&&o.length>0};let Watcher=class Watcher{constructor(t){eH(this,i),eH(this,n),eU(this,o);let r=Object.create(eQ);r.wrapper=this,r.consumerMarkedDirty=t,r.consumerIsAlwaysLive=!0,r.consumerAllowSignalWrites=!1,r.producerNode=[],this[to]=r}watch(...r){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eG(this,n,a).call(this,r);let o=this[to];o.dirty=!1;let i=eZ(o);for(let t of r)e0(t[to]);eZ(i)}unwatch(...r){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eG(this,n,a).call(this,r);let o=this[to];e5(o);for(let t=o.producerNode.length-1;t>=0;t--)if(r.includes(o.producerNode[t].wrapper)){e1(o.producerNode[t],o.producerIndexOfThis[t]);let r=o.producerNode.length-1;if(o.producerNode[t]=o.producerNode[r],o.producerIndexOfThis[t]=o.producerIndexOfThis[r],o.producerNode.length--,o.producerIndexOfThis.length--,o.nextProducerIndex--,t<o.producerNode.length){let r=o.producerIndexOfThis[t],i=o.producerNode[t];e4(i),i.liveConsumerIndexOfThis[r]=t}}}getPending(){if(!(0,t.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[to].producerNode.filter(t=>t.dirty).map(t=>t.wrapper)}};o=to,i=new WeakSet,n=new WeakSet,a=function(r){for(let o of r)if(!(0,t.isComputed)(o)&&!(0,t.isState)(o))throw TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=t=>eq(i,t),r.Watcher=Watcher,r.currentComputed=function(){var t;return null==(t=eV)?void 0:t.wrapper},r.watched=Symbol("watched"),r.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(w||(w={}));let ti=(t=null)=>new w.State(t,{equals:()=>!1});new WeakMap;let SignalObjectImpl=class SignalObjectImpl{static fromEntries(t){return new SignalObjectImpl(Object.fromEntries(t))}#e=new Map;#t=ti();constructor(t={}){let r=Object.getPrototypeOf(t),o=Object.getOwnPropertyDescriptors(t),i=Object.create(r);for(let t in o)Object.defineProperty(i,t,o[t]);let n=this;return new Proxy(i,{get:(t,r,o)=>(n.#r(r),Reflect.get(t,r,o)),has:(t,r)=>(n.#r(r),r in t),ownKeys:t=>(n.#t.get(),Reflect.ownKeys(t)),set(t,r,o,i){let a=Reflect.set(t,r,o,i);return n.#o(r),n.#i(),a},deleteProperty:(t,r)=>(r in t&&(delete t[r],n.#o(r),n.#i()),!0),getPrototypeOf:()=>SignalObjectImpl.prototype})}#r(t){let r=this.#e.get(t);void 0===r&&(r=ti(),this.#e.set(t,r)),r.get()}#o(t){let r=this.#e.get(t);r&&r.set(null)}#i(){this.#t.set(null)}};let tn=0x40000000-1;function ta(){let t=0;return{get current(){return t},next:function(){return t===tn&&(t=0),++t},reset:function(){t=0}}}let ts=Symbol.for("CancellationError");function tl(t,r,o){let i,n,a,c,h,p,u,g,b,m,f=0;null!=o&&({edges:p,maxWait:u,cancellation:g,aggregator:b}=o);let v="leading"===(p??="trailing")||"both"===p,w="trailing"===p||"both"===p;function _(){if(null!=i){f=Date.now();let r=i,o=m;return m=void 0,i=void 0,a=t.apply(o,r)}}function $(){null!=c&&(clearTimeout(c),c=void 0)}function x(){null!=h&&(clearTimeout(h),h=void 0)}function C(){$(),x(),m=void 0,i=void 0,n=void 0,f=0}function S(...t){if(g?.aborted)return;let o=Date.now();null!=b&&null!=i?i=b(i,t):(m=this,i=t);let p=null==c&&null==h;n=o,$();let x=Date.now();if(n=x,c=setTimeout(()=>{c=void 0,function t(){let o,i,a=Date.now();if(o=a-(n??0),i=a-f,null==n||o>=r||o<0||null!=u&&i>=u){w&&_(),C();return}c=setTimeout(()=>{c=void 0,t()},r-(a-(n??0)))}()},r),null!=u&&!h){0===f&&(f=x);let t=u-(x-f);t>0?h=setTimeout(()=>{h=void 0,w&&null!=i&&_(),f=Date.now()},t):(w&&null!=i&&_(),C())}return v&&p?_():a}return S.cancel=C,S.flush=function(){return $(),x(),_()},S.pending=function(){return null!=c||null!=h},g?.addEventListener("abort",C,{once:!0}),S}ta();let tc=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,td=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,th=[["year",629856e5,31536e6,"yr"],["month",2628e6,2628e6,"mo"],["week",6048e5,6048e5,"wk"],["day",864e5,864e5,"d"],["hour",36e5,36e5,"h"],["minute",6e4,6e4,"m"],["second",1e3,1e3,"s"]],tp=new Map,tu=new Map;function tg(t,a){let c=("number"==typeof t?t:t.getTime())-Date.now();if(!Number.isFinite(c))return"";for(let[t,h,p,u]of th){let g=Math.abs(c);if(g>=h||1e3===h){if(a){if(null==r&&(r=null!=n?n.resolvedOptions().locale:null!=i?i.resolvedOptions().locale:(n=new Intl.RelativeTimeFormat(o,{localeMatcher:"best fit",numeric:"always",style:"narrow"})).resolvedOptions().locale),"en"===r||r?.startsWith("en-")){let t=Math.floor(g/p);return`${t}${u}`}return(n??=new Intl.RelativeTimeFormat(o,{localeMatcher:"best fit",numeric:"always",style:"narrow"})).format(Math.trunc(c/p),t)}return(i??=new Intl.RelativeTimeFormat(o,{localeMatcher:"best fit",numeric:"auto",style:"long"})).format(Math.trunc(c/p),t)}}return""}function tb(t,r,i,n=!0){if(r=r??void 0,Number.isNaN("number"==typeof t?t:t.getTime()))return"";let a=`${i??""}:${r}`,c=tp.get(a);if(null==c){let t,h=function(t){if(null==t)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};let r=td.exec(t);if(r?.groups!=null){let{dateStyle:t,timeStyle:o}=r.groups;return{localeMatcher:"best fit",dateStyle:t||"full",timeStyle:o||void 0}}let o={localeMatcher:"best fit"};for(let{groups:r}of t.matchAll(tc))if(null!=r){for(let[t,i]of Object.entries(r))if(null!=i)switch(t){case"year":o.year=4===i.length?"numeric":"2-digit";break;case"month":switch(i.length){case 4:o.month="long";break;case 3:o.month="short";break;case 2:o.month="2-digit";break;case 1:o.month="numeric"}break;case"day":"DD"===i?o.day="2-digit":o.day="numeric";break;case"weekday":switch(i.length){case 4:o.weekday="long";break;case 3:o.weekday="short";break;case 2:o.weekday="narrow"}break;case"hour":o.hour=2===i.length?"2-digit":"numeric",o.hour12="hh"===i||"h"===i;break;case"minute":o.minute=2===i.length?"2-digit":"numeric";break;case"second":o.second=2===i.length?"2-digit":"numeric";break;case"fractionalSecond":o.fractionalSecondDigits=3;break;case"dayPeriod":o.dayPeriod="narrow",o.hour12=!0,o.hourCycle="h12";break;case"timeZoneName":o.timeZoneName=2===i.length?"long":"short"}}return o}(r);t=null==i?o:"system"===i?void 0:[i],c=new Intl.DateTimeFormat(t,h),n&&tp.set(a,c)}if(null==r||td.test(r))return c.format(t);let h=c.formatToParts(t);return r.replace(tc,(r,a,c,p,u,g,b,m,f,v,w,_,$,x,C)=>{if(null!=a)return a.substring(1,a.length-1);for(let[r,a]of Object.entries(C)){if(null==a)continue;let c=h.find(t=>t.type===r);if("Do"===a&&c?.type==="day")return function(t){let r=t%100;return`${t}${tm[(r-20)%10]??tm[r]??tm[0]}`}(Number(c.value));if("a"===a&&c?.type==="dayPeriod"){let r=(function(t){let r=`${i??""}:time:${t}`,a=tp.get(r);if(null==a){let c;c=null==i?o:"system"===i?void 0:[i],a=new Intl.DateTimeFormat(c,{localeMatcher:"best fit",timeStyle:t}),n&&tp.set(r,a)}return a})("short").formatToParts(t).find(t=>"dayPeriod"===t.type);return` ${(r??c)?.value??""}`}return c?.value??""}return""})}let tm=["th","st","nd","rd"];function tf(t,r){t??="decimal";let i=`${r??""}:${t}`,n=tu.get(i);if(null==n){let a,c={localeMatcher:"best fit",style:t};a=null==r?o:"system"===r?void 0:[r],n=new Intl.NumberFormat(a,c),tu.set(i,n)}return n.format}let tv=/\$\{(?:'.*?[^\\]'|\W*)?(\w*?)(?:'.*?[^\\]'|[\W\d]*)\}/g,ty=new Map;function tw(t){return 95===t||t>=97&&t<=122||t>=65&&t<=90||t>=48&&t<=57}function t_(t,r,o){let i;if(null==o)return a??=tf(),`${a(r)} ${t}${1===r?"":"s"}`;let n=1===r?t:o.plural??`${t}s`;return o.only?n:(0===r?i=o.zero??r:!1===o.format?i=r:null!=o.format?i=o.format(r):(a??=tf(),i=a(r)),`${i}${o.infix??" "}${n}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let tk=/T/,t$=/.*\s*?at\s(.+?)\s/,tx=/^_+/,tC=["accessToken","password","token"];let Logger=class Logger{#n;#a;configure(t,r=!1){this.#a={...t,sanitizeKeys:new Set([...tC,...t.sanitizeKeys??[]])},this.#s=r,this.#n=t.createChannel(t.name),this.#l=this.#n.logLevel,this.#n.onDidChangeLogLevel?.(t=>{this.#l=t})}enabled(t){return!!this.isDebugging||0!==this.#l&&(null==t||this.#l<=function(t){switch(t){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(t))}#s=!1;get isDebugging(){return this.#s}#l=0;get logLevel(){var t=this.#l;switch(t){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(tk," ").slice(0,-1)}]`}trace(t,...r){let o;(0!==this.#l&&!(this.#l>1)||this.isDebugging)&&("string"==typeof t?o=t:(o=r.shift(),null!=t&&(o=`${t.prefix} ${o??""}`)),this.isDebugging,this.#n?.trace(`  ${o??""}${this.#c(!0,r)}`))}debug(t,...r){let o;(0!==this.#l&&!(this.#l>2)||this.isDebugging)&&("string"==typeof t?o=t:(o=r.shift(),null!=t&&(o=`${t.prefix} ${o??""}`)),this.isDebugging,this.#n?.debug(`  ${o??""}${this.#c(!1,r)}`))}info(t,...r){let o;(0!==this.#l&&!(this.#l>3)||this.isDebugging)&&("string"==typeof t?o=t:(o=r.shift(),null!=t&&(o=`${t.prefix} ${o??""}`)),this.isDebugging,this.#n?.info(`   ${o??""}${this.#c(!1,r)}`))}warn(t,...r){let o;(0!==this.#l&&!(this.#l>4)||this.isDebugging)&&("string"==typeof t?o=t:(o=r.shift(),null!=t&&(o=`${t.prefix} ${o??""}`)),this.isDebugging,this.#n?.warn(`${o??""}${this.#c(!1,r)}`))}error(t,r,...o){let i;if((0===this.#l||this.#l>5)&&!this.isDebugging)return;if(null==(i=null==r||"string"==typeof r?r:`${r.prefix} ${o.shift()??""}`)){let r=t instanceof Error?t.stack:void 0;if(r){let t=t$.exec(r);null!=t&&(i=t[1])}}this.isDebugging;let n=`  ${i??""}${this.#c(!1,o)}`;null!=t?this.#n?.error(String(t),n):this.#n?.error(n)}showOutputChannel(t){this.#n?.show?.(t)}toLoggable(t,r){if(null!=r){let o=this.sanitize(r,t);if(null!=o)return o}if("function"==typeof t)return"<function>";if(null==t||"object"!=typeof t||t instanceof Error)return String(t);if(Array.isArray(t)){let r=t.length>10?t.slice(0,10):t,o=t.length>10?`, \u2026+${t.length-10}`:"";return`[${r.map(t=>this.toLoggable(t)).join(", ")}${o}]`}let o=this.#a?.toLoggable,i=o?.(t);if(null!=i)return i;let n=this.#a?.sanitizeKeys;try{return JSON.stringify(t,(t,r)=>{if(95!==t.charCodeAt(0))return n?.has(t)?this.sanitize(t,r):""===t||"object"!=typeof r||null==r||Array.isArray(r)?r:r instanceof Error?String(r):o?.(r)??r})}catch{return"<error>"}}sanitize(t,r){if(null==r)return;let o=t.replace(tx,"")||t;if(this.#a?.sanitizeKeys?.has(o))return null!=this.#a.hash?`<${o}:${this.#a.hash("string"==typeof r?r:JSON.stringify(r))}>`:`<${o}>`}#c(t,r){if(0===r.length||t&&(0===this.#l||this.#l>2)&&!this.isDebugging)return"";let o=r.map(t=>this.toLoggable(t)).join(", ");return 0!==o.length?` \u2014 ${o}`:""}};let tS=new Logger,tP=new WeakMap,tA={enabled:t=>tS.enabled(t),log:(t,r,o,...i)=>{switch(t){case"error":tS.error(void 0,r,o,...i);break;case"warn":r?.warn(o,...i);break;case"info":r?.info(o,...i);break;case"debug":default:r?.debug(o,...i);break;case"trace":r?.trace(o,...i)}}},tO=!1,tR=new w.subtle.Watcher(()=>{tO||(tO=!0,queueMicrotask(()=>{for(let t of(tO=!1,tR.getPending()))t.get();tR.watch()}))}),tI=Symbol("SignalWatcherBrand"),tE=new FinalizationRegistry(t=>{t.unwatch(...w.subtle.introspectSources(t))}),tT=new WeakMap;function tB(t){return!0===t[tI]?t:class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new w.State(0),this._$Si=!1}_$Sl(){var t,r;let o=[],i=[];this._$St.forEach((t,r)=>{((null==t?void 0:t.beforeUpdate)?o:i).push(r)});let n=null==(t=this.h)?void 0:t.getPending().filter(t=>t!==this._$Su&&!this._$St.has(t));o.forEach(t=>t.get()),null==(r=this._$Su)||r.get(),n.forEach(t=>t.get()),i.forEach(t=>t.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(void 0!==this.h)return;this._$Su=new w.Computed(()=>{this._$So.get(),super.performUpdate()});let t=this.h=new w.subtle.Watcher(function(){let t=tT.get(this);void 0!==t&&(!1===t._$Si&&(new Set(this.getPending()).has(t._$Su)?t.requestUpdate():t._$Sv()),this.watch())});tT.set(t,this),tE.register(this,t),t.watch(this._$Su),t.watch(...Array.from(this._$St).map(([t])=>t))}_$Sp(){if(void 0===this.h)return;let t=!1;this.h.unwatch(...w.subtle.introspectSources(this.h).filter(r=>{var o;let i=!0!==(null==(o=this._$St.get(r))?void 0:o.manualDispose);return i&&this._$St.delete(r),t||(t=!i),i})),t||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(t,r){var o;this._$S_();let i=new w.Computed(()=>{t()});return this.h.watch(i),this._$St.set(i,r),null!=(o=null==r?void 0:r.beforeUpdate)&&o?w.subtle.untrack(()=>i.get()):this.updateComplete.then(()=>w.subtle.untrack(()=>i.get())),()=>{this._$St.delete(i),this.h.unwatch(i),!1===this.isConnected&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{!1===this.isConnected&&this._$Sp()})}}}let tz=t=>(...r)=>({_$litDirective$:t,values:r});let directive_i=class directive_i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,o){this._$Ct=t,this._$AM=r,this._$Ci=o}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};let{I:tL}={M:ea,P:es,A:el,C:1,L:eI,R,D:eg,V:eE,I:k,H,N:L,U:z,B:I,F:Z},tM=(t,r)=>{let o=t._$AN;if(void 0===o)return!1;for(let t of o)t._$AO?.(r,!1),tM(t,r);return!0},tD=t=>{let r,o;do{if(void 0===(r=t._$AM))break;(o=r._$AN).delete(t),t=r}while(0===o?.size)},tF=t=>{for(let r;r=t._$AM;t=r){let o=r._$AN;if(void 0===o)r._$AN=o=new Set;else if(o.has(t))break;o.add(t),tW(r)}};function tj(t){void 0!==this._$AN?(tD(this),this._$AM=t,tF(this)):this._$AM=t}function tN(t,r=!1,o=0){let i=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(r)if(Array.isArray(i))for(let t=o;t<i.length;t++)tM(i[t],!1),tD(i[t]);else null!=i&&(tM(i,!1),tD(i));else tM(this,t)}let tW=t=>{2==t.type&&(t._$AP??=tN,t._$AQ??=tj)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,r,o){super._$AT(t,r,o),tF(this),this.isConnected=t._$AU}_$AO(t,r=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),r&&(tM(this,t),tD(this))}setValue(t){if(void 0===this._$Ct.strings)this._$Ct._$AI(t,this);else{let r=[...this._$Ct._$AH];r[this._$Ci]=t,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}};let tU=!1,tq=new w.subtle.Watcher(async()=>{tU||(tU=!0,queueMicrotask(()=>{for(let t of(tU=!1,tq.getPending()))t.get();tq.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var t,r;void 0===this._$Sm&&(this._$Sj=new w.Computed(()=>{var t;let r=null==(t=this._$SW)?void 0:t.get();return this.setValue(r),r}),this._$Sm=null!=(r=null==(t=this._$Sk)?void 0:t.h)?r:tq,this._$Sm.watch(this._$Sj),w.subtle.untrack(()=>{var t;return null==(t=this._$Sj)?void 0:t.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return w.subtle.untrack(()=>t.get())}update(t,[r]){var o;return null!=this._$Sk||(this._$Sk=null==(o=t.options)?void 0:o.host),r!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=r,this._$S_(),w.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tH=tz(watch_r),tG=t=>(r,...o)=>t(r,...o.map(t=>t instanceof w.State||t instanceof w.Computed?tH(t):t));tG(ex),tG(eC),w.State,w.Computed;let tK=(t,r)=>new w.State(t,r),{fromCharCode:tV}=String;new TextEncoder;let tY=new TextDecoder;let IpcCall=class IpcCall{constructor(t,r,o=!1){this.scope=t,this.reset=o,this.method=`${t}/${r}`}is(t){return t.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(t,r,o){super(t,r,o),this.response=new IpcNotification(this.scope,`${r}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let tJ=new IpcRequest("core","webview/ready"),tX=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let tZ=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let tQ=new IpcCommand("core","telemetry/sendEvent"),t0=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let t1=new IpcCommand("core","webview/focus/didChange"),t2=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let t5=new WeakMap;function t4(t,r){return function(o,i,n){let a=t5.get(o.constructor);null==a&&t5.set(o.constructor,a=[]),a.push({method:n.value,keys:Array.isArray(t)?t:[t],afterFirstUpdate:r?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(t,r,o){let i=new CustomEvent(t,{bubbles:!0,cancelable:!1,composed:!0,...o,detail:r});return this.dispatchEvent(i),i}update(t){let r=t5.get(this.constructor);if(null!=r)for(let{keys:o,method:i,afterFirstUpdate:n}of r){if(n&&!this.hasUpdated)continue;let r=o.filter(r=>t.has(r));r.length&&i.call(this,r)}super.update(t)}};let t6=new Map;function t3(t,r){let o=c;c=t.scopeId,t6.set(t.scopeId,t);try{return r()}finally{c=o,t6.delete(t.scopeId)}}function t8(){return null!=c?t6.get(c):void 0}function t7(t){let r=.001*performance.now(),o=Math.floor(r),i=Math.floor(r%1*1e9);return void 0!==t&&(o-=t[0],(i-=t[1])<0&&(o--,i+=1e9)),[o,i]}function t9(t){let[r,o]=t7(t);return 1e3*r+Math.floor(o/1e6)}let re=ta();function rt(t,r,o){var i;let n,a,c={scopeId:t,prevScopeId:r,prefix:o,enabled:t=>tS.enabled(t),addExitInfo:function(...t){(n??=[]).push(...t)},setFailed:function(t){a=t},getExitInfo:function(){return{details:n?.length?` \u2022 ${n.join(", ")}`:void 0,failed:a}}};return rr(c,"trace",tS.trace),rr(c,"debug",tS.debug),rr(c,"info",tS.info),rr(c,"warn",tS.warn),Object.defineProperty(i=c,"error",{configurable:!0,enumerable:!0,get:function(){let t=(t,r,...o)=>tS.error(t,i,r,...o);return Object.defineProperty(i,"error",{value:t,writable:!1,enumerable:!0}),t}}),c}function rr(t,r,o){Object.defineProperty(t,r,{configurable:!0,enumerable:!0,get:function(){let i=o.bind(tS,t);return Object.defineProperty(t,r,{value:i,writable:!1,enumerable:!0}),i}})}function ro(t,r,o){if(null!=o){let i=null==r?t.toString(16):`${r.toString(16)} \u2192 ${t.toString(16)}`;return null==i?`[${o.padEnd(13)}]`:`[${o}${i.padStart(13-o.length)}]`}return null==r?`[${t.toString(16).padStart(13)}]`:`[${r.toString(16).padStart(5)} \u2192 ${t.toString(16).padStart(5)}]`}function ri(){let t=t8();if(null==t)return;let r=Object.create(t);return r[Symbol.dispose]=()=>{},r}function rn(t,r,o){if(null!=r&&"boolean"!=typeof r)return rt(r.scopeId,r.prevScopeId,`${r.prefix}${t}`);let i=r?t8()?.scopeId:void 0,n=re.next();return rt(n,i,`${ro(n,i,o)} ${t}`)}function ra(t,r,o,...i){switch(r){case"trace":tS.trace(t,o,...i);break;case"info":tS.info(t,o,...i);break;default:tS.debug(t,o,...i)}}let LoggerContext=class LoggerContext{constructor(t){this.scope=rn(t,void 0),tS.configure({name:t,createChannel:function(t){let r=tS.isDebugging?function(t){}:function(t){};return{name:t,logLevel:0,trace:r,debug:r,info:r,warn:r,error:r}}},!1)}trace(t,...r){"string"==typeof t?tS.trace(this.scope,t,...r):tS.trace(t,r.shift(),...r)}debug(t,...r){"string"==typeof t?tS.debug(this.scope,t,...r):tS.debug(t,r.shift(),...r)}info(t,...r){"string"==typeof t?tS.info(this.scope,t,...r):tS.info(t,r.shift(),...r)}};let rs=new IpcNotification("home","subscription/didChange"),rl="graph";new IpcCommand(rl,"chooseRepository"),new IpcCommand(rl,"dblclick"),new IpcCommand(rl,"avatars/get"),new IpcCommand(rl,"avatars/proxy"),new IpcCommand(rl,"refs/metadata/get"),new IpcCommand(rl,"rows/get"),new IpcCommand(rl,"pullRequest/openDetails"),new IpcCommand(rl,"row/action"),new IpcCommand(rl,"treemap/file/action"),new IpcCommand(rl,"search/openInView"),new IpcCommand(rl,"search/cancel"),new IpcCommand(rl,"columns/update"),new IpcCommand(rl,"refs/update/visibility"),new IpcCommand(rl,"refs/update/pinned"),new IpcCommand(rl,"filters/update/excludeTypes"),new IpcCommand(rl,"configuration/update"),new IpcCommand(rl,"displayMode/update"),new IpcCommand(rl,"search/update/mode"),new IpcCommand(rl,"filters/update/includedRefs"),new IpcCommand(rl,"filters/reset"),new IpcCommand(rl,"selection/update"),new IpcCommand(rl,"wipDraft/update"),new IpcRequest(rl,"jumpToHead"),new IpcRequest(rl,"chooseRef"),new IpcRequest(rl,"chooseComparison"),new IpcRequest(rl,"chooseAuthor"),new IpcRequest(rl,"chooseFile"),new IpcRequest(rl,"scope/resolve"),new IpcRequest(rl,"rows/ensure"),new IpcRequest(rl,"search/history/get"),new IpcRequest(rl,"search/history/store"),new IpcRequest(rl,"search/history/delete"),new IpcRequest(rl,"counts"),new IpcRequest(rl,"overview/get"),new IpcRequest(rl,"overview/wip/get"),new IpcRequest(rl,"overview/wip/detailed/get"),new IpcRequest(rl,"overview/enrichment/get"),new IpcRequest(rl,"agentSessions/get"),new IpcRequest(rl,"wip/stats/get"),new IpcRequest(rl,"wip/lineStats/get"),new IpcCommand(rl,"wip/watches/sync"),new IpcNotification(rl,"wip/refetch/request"),new IpcRequest(rl,"row/hover/get"),new IpcRequest(rl,"search"),new IpcNotification(rl,"overview/didChange"),new IpcNotification(rl,"agentSessions/didChange"),new IpcNotification(rl,"repositories/integration/didChange"),new IpcNotification(rl,"wipDrafts/didChange"),new IpcNotification(rl,"didChange",!0),new IpcNotification(rl,"configuration/didChange");let rc=new IpcNotification(rl,"subscription/didChange");new IpcNotification(rl,"org/settings/didChange"),new IpcNotification(rl,"avatars/didChange"),new IpcNotification(rl,"mcp/didChange"),new IpcNotification(rl,"hooks/didChange"),new IpcNotification(rl,"agents/canInstallClaudeHook/didChange"),new IpcCommand(rl,"graphWalkthrough/banner/close"),new IpcNotification(rl,"graphWalkthrough/banner/didChange"),new IpcNotification(rl,"graphWalkthrough/complete/didChange"),new IpcNotification(rl,"graphWalkthrough/started/didChange"),new IpcNotification(rl,"visualizationsButtonCallout/didChange"),new IpcCommand(rl,"visualizationsButtonCallout/dismiss"),new IpcNotification(rl,"sidebar/activePanel/didRequest"),new IpcNotification(rl,"action/didRequest"),new IpcCommand(rl,"track/overview/shown"),new IpcCommand(rl,"track/scope/changed"),new IpcCommand(rl,"track/details/reviewMode"),new IpcCommand(rl,"track/details/composeMode"),new IpcCommand(rl,"track/details/resolveMode"),new IpcCommand(rl,"track/details/compareMode"),new IpcCommand(rl,"track/details/wipShown"),new IpcNotification(rl,"branchState/didChange"),new IpcNotification(rl,"refs/didChangeMetadata"),new IpcNotification(rl,"columns/didChange"),new IpcNotification(rl,"scrollMarkers/didChange"),new IpcNotification(rl,"refs/didChangeVisibility"),new IpcNotification(rl,"refs/didChangePinned"),new IpcNotification(rl,"rows/didChange"),new IpcNotification(rl,"rows/stats/didChange"),new IpcNotification(rl,"selection/didChange"),new IpcNotification(rl,"compareMode/didRequestOpen"),new IpcNotification(rl,"timeline/didRequestOpenScope"),new IpcNotification(rl,"search/didRequest"),new IpcNotification(rl,"workingTree/didChange"),new IpcNotification(rl,"didSearch"),new IpcNotification(rl,"didFetch"),new IpcNotification(rl,"scope/anchors/didInvalidate"),new IpcNotification(rl,"treemap/didInvalidate"),new IpcNotification(rl,"featurePreview/didStart");let rd=new IpcNotification("timeline","didChange");let PromosContext=class PromosContext{constructor(t){this.disposables=[],this._promos=new Map,this.ipc=t,this.disposables.push(this.ipc.onReceiveMessage(t=>{(rs.is(t)||rc.is(t)||rd.is(t))&&this._promos.clear()}))}async getApplicablePromo(t,r){let o=`${t}|${r}`,i=this._promos.get(o);return null==i&&(i=this.ipc.sendRequest(tZ,{plan:t,location:r}).then(t=>t.promo,()=>void 0),this._promos.set(o,i)),await i}dispose(){this.disposables.forEach(t=>t.dispose())}};let TelemetryContext=class TelemetryContext{constructor(t){this.disposables=[],this.ipc=t}sendEvent(t){this.ipc.sendCommand(tQ,t)}dispose(){this.disposables.forEach(t=>t.dispose())}};function rh(t){return(t=t.toString().toLowerCase()).includes("ms")?parseFloat(t):t.includes("s")?1e3*parseFloat(t):parseFloat(t)}function rp(t,r){return new Promise(o=>{t.addEventListener(r,function i(n){n.target===t&&(t.removeEventListener(r,i),o())})})}(_||(_={})).on=function(t,r,o,i){let n=!1;if("string"==typeof t){let a=function(r){let i=r?.target?.closest(t);null!=i&&o(r,i)};return document.addEventListener(r,a,i??!0),{dispose:()=>{n||(n=!0,document.removeEventListener(r,a,i??!0))}}}let a=function(t){o(t,this)};return t.addEventListener(r,a,i??!1),{dispose:()=>{n||(n=!0,t.removeEventListener(r,a,i??!1))}}};var ru=Uint8Array,rg=Uint16Array,rb=Int32Array,rm=new ru([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),rf=new ru([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),rv=new ru([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ry=function(t,r){for(var o=new rg(31),i=0;i<31;++i)o[i]=r+=1<<t[i-1];for(var n=new rb(o[30]),i=1;i<30;++i)for(var a=o[i];a<o[i+1];++a)n[a]=a-o[i]<<5|i;return{b:o,r:n}},rw=ry(rm,2),r_=rw.b,rk=rw.r;r_[28]=258,rk[258]=28;var r$=ry(rf,0),rx=r$.b;r$.r;for(var rC=new rg(32768),rS=0;rS<32768;++rS){var rP=(43690&rS)>>1|(21845&rS)<<1;rP=(61680&(rP=(52428&rP)>>2|(13107&rP)<<2))>>4|(3855&rP)<<4,rC[rS]=((65280&rP)>>8|(255&rP)<<8)>>1}for(var rA=function(t,r,o){for(var i,n=t.length,a=0,c=new rg(r);a<n;++a)t[a]&&++c[t[a]-1];var h=new rg(r);for(a=1;a<r;++a)h[a]=h[a-1]+c[a-1]<<1;if(o){i=new rg(1<<r);var p=15-r;for(a=0;a<n;++a)if(t[a])for(var u=a<<4|t[a],g=r-t[a],b=h[t[a]-1]++<<g,m=b|(1<<g)-1;b<=m;++b)i[rC[b]>>p]=u}else for(i=new rg(n),a=0;a<n;++a)t[a]&&(i[a]=rC[h[t[a]-1]++]>>15-t[a]);return i},rO=new ru(288),rS=0;rS<144;++rS)rO[rS]=8;for(var rS=144;rS<256;++rS)rO[rS]=9;for(var rS=256;rS<280;++rS)rO[rS]=7;for(var rS=280;rS<288;++rS)rO[rS]=8;for(var rR=new ru(32),rS=0;rS<32;++rS)rR[rS]=5;var rI=rA(rO,9,1),rE=rA(rR,5,1),rT=function(t){for(var r=t[0],o=1;o<t.length;++o)t[o]>r&&(r=t[o]);return r},rB=function(t,r,o){var i=r/8|0;return(t[i]|t[i+1]<<8)>>(7&r)&o},rz=function(t,r){var o=r/8|0;return(t[o]|t[o+1]<<8|t[o+2]<<16)>>(7&r)},rL=function(t,r,o){return(null==r||r<0)&&(r=0),(null==o||o>t.length)&&(o=t.length),new ru(t.subarray(r,o))},rM=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],rD=function(t,r,o){var i=Error(r||rM[t]);if(i.code=t,Error.captureStackTrace&&Error.captureStackTrace(i,rD),!o)throw i;return i},rF=function(t,r,o,i){var n=t.length,a=i?i.length:0;if(!n||r.f&&!r.l)return o||new ru(0);var c=!o,h=c||2!=r.i,p=r.i;c&&(o=new ru(3*n));var u=function(t){var r=o.length;if(t>r){var i=new ru(Math.max(2*r,t));i.set(o),o=i}},g=r.f||0,b=r.p||0,m=r.b||0,f=r.l,v=r.d,w=r.m,_=r.n,$=8*n;do{if(!f){g=rB(t,b,1);var x=rB(t,b+1,3);if(b+=3,x)if(1==x)f=rI,v=rE,w=9,_=5;else if(2==x){var C=rB(t,b,31)+257,S=rB(t,b+10,15)+4,P=C+rB(t,b+5,31)+1;b+=14;for(var A=new ru(P),O=new ru(19),E=0;E<S;++E)O[rv[E]]=rB(t,b+3*E,7);b+=3*S;for(var T=rT(O),B=(1<<T)-1,M=rA(O,T,1),E=0;E<P;){var D=M[rB(t,b,B)];b+=15&D;var F=D>>4;if(F<16)A[E++]=F;else{var j=0,N=0;for(16==F?(N=3+rB(t,b,3),b+=2,j=A[E-1]):17==F?(N=3+rB(t,b,7),b+=3):18==F&&(N=11+rB(t,b,127),b+=7);N--;)A[E++]=j}}var W=A.subarray(0,C),U=A.subarray(C);w=rT(W),_=rT(U),f=rA(W,w,1),v=rA(U,_,1)}else rD(1);else{var F=((b+7)/8|0)+4,q=t[F-4]|t[F-3]<<8,G=F+q;if(G>n){p&&rD(0);break}h&&u(m+q),o.set(t.subarray(F,G),m),r.b=m+=q,r.p=b=8*G,r.f=g;continue}if(b>$){p&&rD(0);break}}h&&u(m+131072);for(var K=(1<<w)-1,V=(1<<_)-1,Y=b;;Y=b){var j=f[rz(t,b)&K],J=j>>4;if((b+=15&j)>$){p&&rD(0);break}if(j||rD(2),J<256)o[m++]=J;else if(256==J){Y=b,f=null;break}else{var X=J-254;if(J>264){var E=J-257,Q=rm[E];X=rB(t,b,(1<<Q)-1)+r_[E],b+=Q}var ee=v[rz(t,b)&V],et=ee>>4;ee||rD(3),b+=15&ee;var U=rx[et];if(et>3){var Q=rf[et];U+=rz(t,b)&(1<<Q)-1,b+=Q}if(b>$){p&&rD(0);break}h&&u(m+131072);var er=m+X;if(m<U){var eo=a-U,ei=Math.min(U,er);for(eo+m<0&&rD(3);m<ei;++m)o[m]=i[eo+m]}for(;m<er;++m)o[m]=o[m-U]}}r.l=f,r.p=Y,r.b=m,r.f=g,f&&(g=1,r.m=w,r.d=v,r.n=_)}while(!g)return m!=o.length&&c?rL(o,0,m):o.subarray(0,m)},rj=new ru(0),rN="u">typeof TextDecoder&&new TextDecoder;try{rN.decode(rj,{stream:!0})}catch{}var rW=function(t){for(var r="",o=0;;){var i=t[o++],n=(i>127)+(i>223)+(i>239);if(o+n>t.length)return{s:r,r:rL(t,o-1)};n?3==n?r+=String.fromCharCode(55296|(i=((15&i)<<18|(63&t[o++])<<12|(63&t[o++])<<6|63&t[o++])-65536)>>10,56320|1023&i):1&n?r+=String.fromCharCode((31&i)<<6|63&t[o++]):r+=String.fromCharCode((15&i)<<12|(63&t[o++])<<6|63&t[o++]):r+=String.fromCharCode(i)}};function rU(t,r){if(r){for(var o="",i=0;i<t.length;i+=16384)o+=String.fromCharCode.apply(null,t.subarray(i,i+16384));return o}if(rN)return rN.decode(t);var n=rW(t),a=n.s,o=n.r;return o.length&&rD(8),a}"function"==typeof queueMicrotask&&queueMicrotask;let rq=/\(([\s\S]*)\)/,rH=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,rG=/\s?=.*$/;function rK(t){var r,o;let i,n,a,c,h,p,u,g,b;return r="debug",h=!1,p=!0,null!=(o=t)&&({args:i,when:n,exit:a,prefix:c,onlyExit:h=!1,timing:p=!0}=o),u="object"==typeof p?p.warnAfter:1500,g=!1!==p||"object"==typeof h&&h.after>0,b="trace"===r?tS.trace:"debug"===r?tS.debug:tS.info,(t,o,p)=>{let m,f;if("function"==typeof p.value?(m=p.value,f="value"):"function"==typeof p.get&&(m=p.get,f="get"),null==m||null==f)throw Error("Not supported");let v=null==i?function(t){if("function"!=typeof t)throw Error("Not supported");if(0===t.length)return[];let r=Function.prototype.toString.call(t),o=(r=(r=r.replace(rH,"")||r).slice(0,r.indexOf("{"))).indexOf("("),i=r.indexOf(")");o=o>=0?o+1:0,i=i>0?i:r.indexOf("="),r=r.slice(o,i),r=`(${r})`;let n=rq.exec(r);return null!=n?n[1].split(",").map(t=>t.trim().replace(rG,"")):[]}(m):[];p[f]=function(...t){let p;if(!tS.enabled()||null!=n&&!n.apply(this,t))return m.apply(this,t);let f=tS.enabled(r),w=ri(),_=w?.scopeId,$=re.next(),x=this!=null?function(t){let r;if("function"==typeof t){if(null==(r=t.prototype?.constructor))return t.name}else r=t.constructor;let o=r?.name??"",i=o.indexOf("_");-1!==i&&(o=o.substring(i+1));let n=r;for(;null!=n;){let r=tP.get(n);if(null!=r)return r(t,o);n=Object.getPrototypeOf(n)}return o}(this):void 0,C=x?`${ro($,_)} ${x}.${o}`:`${ro($,_)} ${o}`;null!=c&&(C=c({id:$,instance:this,instanceName:x??"",name:o,prefix:C},...t));let S=rt($,_,C),P=!1,A=()=>(P||(P=!0,p=function(t,r,o){if(!1===t||!r.length)return;if("function"==typeof t){let o=t(...r);if(!1===o)return;let i="";for(let[t,r]of Object.entries(o))i.length&&(i+=", "),i+=`${t}=${tS.toLoggable(r,t)}`;return i||void 0}let i="",n=-1;for(let t of r){let r=o[++n];i.length&&(i+=", "),i+=r?`${r}=${tS.toLoggable(t,r)}`:tS.toLoggable(t)}return i||void 0}(i,t,v)),p);if(!h&&f){let t=A();b.call(tS,t?`${C}(${t})`:C)}if(h||g||null!=a){let r=g?t7():void 0,o=t=>{let o=void 0!==r?` [${t9(r)}ms]`:"",i=S.getExitInfo();if(h){let r=A();tS.error(t,r?`${C}(${r})`:C,i?.details?`failed${i.details}${o}`:`failed${o}`)}else tS.error(t,C,i?.details?`failed${i.details}${o}`:`failed${o}`)},i=t=>{let o,i,n,c;null!=r?(o=t9(r))>u?(i=tS.warn,n=` [*${o}ms] (slow)`):(i=b,n=` [${o}ms]`):(n="",i=b);let p=S.getExitInfo();if(null!=a)if("function"==typeof a)try{c=a(t)}catch(t){c=`@log.exit error: ${t}`}else!0===a&&(c=`returned ${tS.toLoggable(t)}`);else p?.failed?(c=p.failed,i=(t,...r)=>tS.error(null,t,...r)):c="completed";if(f||i!==b){let t=A();h?(!0===h||0===h.after||o>h.after)&&i.call(tS,t?`${C}(${t}) ${c}${p?.details||""}${n}`:`${C} ${c}${p?.details||""}${n}`):i.call(tS,t?`${C}(${t}) ${c}${p?.details||""}${n}`:`${C} ${c}${p?.details||""}${n}`)}};return t3(S,()=>{var r;let n;try{n=m.apply(this,t)}catch(t){throw o(t),t}return null!=n&&null!=(r=n)&&(r instanceof Promise||"function"==typeof r?.then)?n.then(i,o).catch(()=>{}):i(n),n})}return t3(S,()=>m.apply(this,t))}}}globalThis.scheduler?.yield?.bind(globalThis.scheduler),Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(t,r,...o){let i;this._stopped=!1,this.logScope=null!=t&&"string"!=typeof t?t:rn(t??"",!1,r?.scopeLabel);let n=r?.log;if(i=null==n||!0===n?{}:!1===n||n.onlyExit?void 0:n,this.logLevel=("object"==typeof n?n.level:void 0)??"debug",this.logProvider=r?.provider??tA,this._time=t7(),null!=i){if(!this.logProvider.enabled(this.logLevel))return;o.length?this.logProvider.log(this.logLevel,this.logScope,`${i.message??""}${i.suffix??""}`,...o):this.logProvider.log(this.logLevel,this.logScope,`${i.message??""}${i.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return t9(this._time)}log(t){this.logCore(t,!1)}restart(t){this.logCore(t,!0),this._time=t7(),this._stopped=!1}stop(t){this._stopped||(this.restart(t),this._stopped=!0)}logCore(t,r){if(!this.logProvider.enabled(this.logLevel))return;if(!r)return void this.logProvider.log(this.logLevel,this.logScope,`${t?.message??""}${t?.suffix??""}`);let o=t9(this._time),i=t?.message??"";this.logProvider.log(o>250?"warn":this.logLevel,this.logScope,`${i?`${i} `:""}[${o}ms]${t?.suffix??""}`)}};(()=>{let t;var r,o,i={975:t=>{function r(t){if("string"!=typeof t)throw TypeError("Path must be a string. Received "+JSON.stringify(t))}function o(t,r){for(var o,i="",n=0,a=-1,c=0,h=0;h<=t.length;++h){if(h<t.length)o=t.charCodeAt(h);else{if(47===o)break;o=47}if(47===o){if(a===h-1||1===c);else if(a!==h-1&&2===c){if(i.length<2||2!==n||46!==i.charCodeAt(i.length-1)||46!==i.charCodeAt(i.length-2)){if(i.length>2){var p=i.lastIndexOf("/");if(p!==i.length-1){-1===p?(i="",n=0):n=(i=i.slice(0,p)).length-1-i.lastIndexOf("/"),a=h,c=0;continue}}else if(2===i.length||1===i.length){i="",n=0,a=h,c=0;continue}}r&&(i.length>0?i+="/..":i="..",n=2)}else i.length>0?i+="/"+t.slice(a+1,h):i=t.slice(a+1,h),n=h-a-1;a=h,c=0}else 46===o&&-1!==c?++c:c=-1}return i}var i={resolve:function(){for(var t,i,n="",a=!1,c=arguments.length-1;c>=-1&&!a;c--)c>=0?t=arguments[c]:(void 0===i&&(i=process.cwd()),t=i),r(t),0!==t.length&&(n=t+"/"+n,a=47===t.charCodeAt(0));return n=o(n,!a),a?n.length>0?"/"+n:"/":n.length>0?n:"."},normalize:function(t){if(r(t),0===t.length)return".";var i=47===t.charCodeAt(0),n=47===t.charCodeAt(t.length-1);return 0!==(t=o(t,!i)).length||i||(t="."),t.length>0&&n&&(t+="/"),i?"/"+t:t},isAbsolute:function(t){return r(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var t,o=0;o<arguments.length;++o){var n=arguments[o];r(n),n.length>0&&(void 0===t?t=n:t+="/"+n)}return void 0===t?".":i.normalize(t)},relative:function(t,o){if(r(t),r(o),t===o||(t=i.resolve(t))===(o=i.resolve(o)))return"";for(var n=1;n<t.length&&47===t.charCodeAt(n);++n);for(var a=t.length,c=a-n,h=1;h<o.length&&47===o.charCodeAt(h);++h);for(var p=o.length-h,u=c<p?c:p,g=-1,b=0;b<=u;++b){if(b===u){if(p>u){if(47===o.charCodeAt(h+b))return o.slice(h+b+1);if(0===b)return o.slice(h+b)}else c>u&&(47===t.charCodeAt(n+b)?g=b:0===b&&(g=0));break}var m=t.charCodeAt(n+b);if(m!==o.charCodeAt(h+b))break;47===m&&(g=b)}var f="";for(b=n+g+1;b<=a;++b)b!==a&&47!==t.charCodeAt(b)||(0===f.length?f+="..":f+="/..");return f.length>0?f+o.slice(h+g):(h+=g,47===o.charCodeAt(h)&&++h,o.slice(h))},_makeLong:function(t){return t},dirname:function(t){if(r(t),0===t.length)return".";for(var o=t.charCodeAt(0),i=47===o,n=-1,a=!0,c=t.length-1;c>=1;--c)if(47===(o=t.charCodeAt(c))){if(!a){n=c;break}}else a=!1;return -1===n?i?"/":".":i&&1===n?"//":t.slice(0,n)},basename:function(t,o){if(void 0!==o&&"string"!=typeof o)throw TypeError('"ext" argument must be a string');r(t);var i,n=0,a=-1,c=!0;if(void 0!==o&&o.length>0&&o.length<=t.length){if(o.length===t.length&&o===t)return"";var h=o.length-1,p=-1;for(i=t.length-1;i>=0;--i){var u=t.charCodeAt(i);if(47===u){if(!c){n=i+1;break}}else -1===p&&(c=!1,p=i+1),h>=0&&(u===o.charCodeAt(h)?-1==--h&&(a=i):(h=-1,a=p))}return n===a?a=p:-1===a&&(a=t.length),t.slice(n,a)}for(i=t.length-1;i>=0;--i)if(47===t.charCodeAt(i)){if(!c){n=i+1;break}}else -1===a&&(c=!1,a=i+1);return -1===a?"":t.slice(n,a)},extname:function(t){r(t);for(var o=-1,i=0,n=-1,a=!0,c=0,h=t.length-1;h>=0;--h){var p=t.charCodeAt(h);if(47!==p)-1===n&&(a=!1,n=h+1),46===p?-1===o?o=h:1!==c&&(c=1):-1!==o&&(c=-1);else if(!a){i=h+1;break}}return -1===o||-1===n||0===c||1===c&&o===n-1&&o===i+1?"":t.slice(o,n)},format:function(t){var r,o;if(null===t||"object"!=typeof t)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return r=t.dir||t.root,o=t.base||(t.name||"")+(t.ext||""),r?r===t.root?r+o:r+"/"+o:o},parse:function(t){r(t);var o={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return o;var i,n=t.charCodeAt(0),a=47===n;a?(o.root="/",i=1):i=0;for(var c=-1,h=0,p=-1,u=!0,g=t.length-1,b=0;g>=i;--g)if(47!==(n=t.charCodeAt(g)))-1===p&&(u=!1,p=g+1),46===n?-1===c?c=g:1!==b&&(b=1):-1!==c&&(b=-1);else if(!u){h=g+1;break}return -1===c||-1===p||0===b||1===b&&c===p-1&&c===h+1?-1!==p&&(o.base=o.name=0===h&&a?t.slice(1,p):t.slice(h,p)):(0===h&&a?(o.name=t.slice(1,c),o.base=t.slice(1,p)):(o.name=t.slice(h,c),o.base=t.slice(h,p)),o.ext=t.slice(c,p)),h>0?o.dir=t.slice(0,h-1):a&&(o.dir="/"),o},sep:"/",delimiter:":",win32:null,posix:null};i.posix=i,t.exports=i}},n={};function a(t){var r=n[t];if(void 0!==r)return r.exports;var o=n[t]={exports:{}};return i[t](o,o.exports,a),o.exports}a.d=(t,r)=>{for(var o in r)a.o(r,o)&&!a.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},a.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r),a.r=t=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var c={};(a.r(c),a.d(c,{URI:()=>l,Utils:()=>o}),"object"==typeof process)?t="win32"===process.platform:"object"==typeof navigator&&(t=navigator.userAgent.indexOf("Windows")>=0);let h=/^\w[\w\d+.-]*$/,p=/^\//,u=/^\/\//;function g(t,r){if(!t.scheme&&r)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t.authority}", path: "${t.path}", query: "${t.query}", fragment: "${t.fragment}"}`);if(t.scheme&&!h.test(t.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(t.path){if(t.authority){if(!p.test(t.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(u.test(t.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let b=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(t){return t instanceof l||!!t&&"string"==typeof t.authority&&"string"==typeof t.fragment&&"string"==typeof t.path&&"string"==typeof t.query&&"string"==typeof t.scheme&&"string"==typeof t.fsPath&&"function"==typeof t.with&&"function"==typeof t.toString}scheme;authority;path;query;fragment;constructor(t,r,o,i,n,a=!1){"object"==typeof t?(this.scheme=t.scheme||"",this.authority=t.authority||"",this.path=t.path||"",this.query=t.query||"",this.fragment=t.fragment||""):(this.scheme=t||a?t:"file",this.authority=r||"",this.path=function(t,r){switch(t){case"https":case"http":case"file":r?"/"!==r[0]&&(r="/"+r):r="/"}return r}(this.scheme,o||""),this.query=i||"",this.fragment=n||"",g(this,a))}get fsPath(){return _(this,!1)}with(t){if(!t)return this;let{scheme:r,authority:o,path:i,query:n,fragment:a}=t;return void 0===r?r=this.scheme:null===r&&(r=""),void 0===o?o=this.authority:null===o&&(o=""),void 0===i?i=this.path:null===i&&(i=""),void 0===n?n=this.query:null===n&&(n=""),void 0===a?a=this.fragment:null===a&&(a=""),r===this.scheme&&o===this.authority&&i===this.path&&n===this.query&&a===this.fragment?this:new d(r,o,i,n,a)}static parse(t,r=!1){let o=b.exec(t);return o?new d(o[2]||"",S(o[4]||""),S(o[5]||""),S(o[7]||""),S(o[9]||""),r):new d("","","","","")}static file(r){let o="";if(t&&(r=r.replace(/\\/g,"/")),"/"===r[0]&&"/"===r[1]){let t=r.indexOf("/",2);-1===t?(o=r.substring(2),r="/"):(o=r.substring(2,t),r=r.substring(t)||"/")}return new d("file",o,r,"","")}static from(t){let r=new d(t.scheme,t.authority,t.path,t.query,t.fragment);return g(r,!0),r}toString(t=!1){return x(this,t)}toJSON(){return this}static revive(t){if(t){if(t instanceof l)return t;{let r=new d(t);return r._formatted=t.external,r._fsPath=t._sep===m?t.fsPath:null,r}}return t}};let m=t?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=_(this,!1)),this._fsPath}toString(t=!1){return t?x(this,!0):(this._formatted||(this._formatted=x(this,!1)),this._formatted)}toJSON(){let t={$mid:1};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=m),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t}};let f={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function v(t,r,o){let i,n=-1;for(let a=0;a<t.length;a++){let c=t.charCodeAt(a);if(c>=97&&c<=122||c>=65&&c<=90||c>=48&&c<=57||45===c||46===c||95===c||126===c||r&&47===c||o&&91===c||o&&93===c||o&&58===c)-1!==n&&(i+=encodeURIComponent(t.substring(n,a)),n=-1),void 0!==i&&(i+=t.charAt(a));else{void 0===i&&(i=t.substr(0,a));let r=f[c];void 0!==r?(-1!==n&&(i+=encodeURIComponent(t.substring(n,a)),n=-1),i+=r):-1===n&&(n=a)}}return -1!==n&&(i+=encodeURIComponent(t.substring(n))),void 0!==i?i:t}function w(t){let r;for(let o=0;o<t.length;o++){let i=t.charCodeAt(o);35===i||63===i?(void 0===r&&(r=t.substr(0,o)),r+=f[i]):void 0!==r&&(r+=t[o])}return void 0!==r?r:t}function _(r,o){let i;return i=r.authority&&r.path.length>1&&"file"===r.scheme?`//${r.authority}${r.path}`:47===r.path.charCodeAt(0)&&(r.path.charCodeAt(1)>=65&&90>=r.path.charCodeAt(1)||r.path.charCodeAt(1)>=97&&122>=r.path.charCodeAt(1))&&58===r.path.charCodeAt(2)?o?r.path.substr(1):r.path[1].toLowerCase()+r.path.substr(2):r.path,t&&(i=i.replace(/\//g,"\\")),i}function x(t,r){let o=r?w:v,i="",{scheme:n,authority:a,path:c,query:h,fragment:p}=t;if(n&&(i+=n,i+=":"),(a||"file"===n)&&(i+="/",i+="/"),a){let t=a.indexOf("@");if(-1!==t){let r=a.substr(0,t);a=a.substr(t+1),-1===(t=r.lastIndexOf(":"))?i+=o(r,!1,!1):(i+=o(r.substr(0,t),!1,!1),i+=":",i+=o(r.substr(t+1),!1,!0)),i+="@"}-1===(t=(a=a.toLowerCase()).lastIndexOf(":"))?i+=o(a,!1,!0):(i+=o(a.substr(0,t),!1,!0),i+=a.substr(t))}if(c){if(c.length>=3&&47===c.charCodeAt(0)&&58===c.charCodeAt(2)){let t=c.charCodeAt(1);t>=65&&t<=90&&(c=`/${String.fromCharCode(t+32)}:${c.substr(3)}`)}else if(c.length>=2&&58===c.charCodeAt(1)){let t=c.charCodeAt(0);t>=65&&t<=90&&(c=`${String.fromCharCode(t+32)}:${c.substr(2)}`)}i+=o(c,!0,!1)}return h&&(i+="?",i+=o(h,!1,!1)),p&&(i+="#",i+=r?p:v(p,!1,!1)),i}let C=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function S(t){return t.match(C)?t.replace(C,t=>(function t(r){try{return decodeURIComponent(r)}catch{return r.length>3?r.substr(0,3)+t(r.substr(3)):r}})(t)):t}var P=a(975);let A=P.posix||P;(r=o||(o={})).joinPath=function(t,...r){return t.with({path:A.join(t.path,...r)})},r.resolvePath=function(t,...r){let o=t.path,i=!1;"/"!==o[0]&&(o="/"+o,i=!0);let n=A.resolve(o,...r);return i&&"/"===n[0]&&!t.authority&&(n=n.substring(1)),t.with({path:n})},r.dirname=function(t){if(0===t.path.length||"/"===t.path)return t;let r=A.dirname(t.path);return 1===r.length&&46===r.charCodeAt(0)&&(r=""),t.with({path:r})},r.basename=function(t){return A.basename(t.path)},r.extname=function(t){return A.extname(t.path)},$=c})();let{URI:rV,Utils:rY}=$;function rJ(t,r){return JSON.parse(t,(t,o)=>(function(t,r){let o=function(t){if("object"!=typeof t||null==t)return;let r=t.__ipc;if(null!=r)switch(r){case"date":return"number"==typeof t.value?t:void 0;case"promise":return"object"==typeof t.value&&"string"==typeof t.value.id&&"string"==typeof t.value.method?t:void 0;case"uri":return"object"==typeof t.value&&"string"==typeof t.value?.scheme?t:void 0;default:return}}(t);if(null==o)return t;switch(o.__ipc){case"date":return new Date(o.value);case"promise":return r(o.value);case"uri":return rV.revive(o.value)}})(o,r))}let rX="__supertalk_rpc__";function rZ(t){return"object"==typeof t&&null!==t&&rX in t&&!0===t[rX]}let rQ=new TextEncoder,r0=new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._type="fire"}static{this._noop=function(){}}get event(){return this._event??=(t,r,o)=>{if(this._disposed)return{dispose:Emitter._noop};this._target??=new EventTarget;let i=o=>{try{t.call(r,o.detail)}catch{}};this._target.addEventListener(Emitter._type,i);let n={dispose:()=>{n.dispose=Emitter._noop,this._target?.removeEventListener(Emitter._type,i)}};return o?.push(n),n},this._event}fire(t){this._disposed||this._target?.dispatchEvent(new CustomEvent(Emitter._type,{detail:t}))}dispose(){this._disposed=!0,this._target=void 0}};var r1=Object.defineProperty,r2=Object.getOwnPropertyDescriptor,r5=(t,r)=>(r=Symbol[t])?r:Symbol.for("Symbol."+t),r4=t=>{throw TypeError(t)},r6=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?r2(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&r1(r,o,a),a};function r3(){return h??=null!=p?p():acquireVsCodeApi()}let r8=ta();function r7(){return`webview:${r8.next()}`}let r9=`wv-${Math.random().toString(36).slice(2,10)}`,oe=Date.now(),ot=class{constructor(t){this.appName=t,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=r3(),this._disposable=_.on(window,"message",t=>this.onMessageReceived(t))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(t){var r,o,i,n,a,h,p,u,g=[];try{if(rZ(t.data))return;let n=t.data,a=((t,r,o)=>{if(null!=r){var i,n;"object"!=typeof r&&"function"!=typeof r&&r4("Object expected"),o&&(i=r[r5("asyncDispose")]),void 0===i&&(i=r[r5("dispose")],o&&(n=i)),"function"!=typeof i&&r4("Object not disposable"),n&&(i=function(){try{n.call(this)}catch(t){return Promise.reject(t)}}),t.push([o,i,r])}else o&&t.push([o]);return r})(g,function(t,r,o){var i,n;let a,h,p;if(!tS.enabled())return;let u=(i=o?.scope??!0,n=o?.scopeLabel,h=t8(),c=(p=rn(t,i,n)).scopeId,t6.set(p.scopeId,p),p[Symbol.dispose]=()=>{let t;t=p?.scopeId??c,null!=t&&t6.delete(t),c=h?.scopeId},p);if(!r)return u;let g="debug",b=!1;"object"==typeof r&&(g=r.level??g,a=r.message,b=!0===r.onlyExit);let m=t7();b||ra(u,g,a??"");let f=u[Symbol.dispose];return u[Symbol.dispose]=()=>{let t=t9(m),r=` [${t}ms]`,o=u.getExitInfo(),i=o.failed??"completed";null!=o.failed?tS.error(null,u,`${i}${o.details??""}${r}`):ra(u,g,`${i}${o.details??""}${r}`),f()},u}(`(e=${n.id}|${n.method})`,void 0,{scope:ri()})),h=function(t,r,...o){let i=("object"==typeof r?.log?r.log.level:void 0)??"info";return(r?.provider??tA).enabled(i)?new Stopwatch(t,r,...o):void 0}(a,{log:{onlyExit:!0,level:"debug"}});if(n.compressed&&n.params instanceof Uint8Array){if("deflate"===n.compressed)try{n.params=rU((i=n.params,rF(i,{i:2},void 0,void 0)))}catch(t){n.params=rU(n.params)}else n.params=rU(n.params);h?.restart({message:`\u2022 decompressed (${n.compressed}) serialized params`})}if("string"==typeof n.params?(n.params=rJ(n.params,t=>this.getResponsePromise(t.method,t.id)),h?.stop({message:"• deserialized params"})):null==n.params?h?.stop({message:"• no params"}):h?.stop({message:"• invalid params"}),a?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-n.timestamp}ms`),null!=n.completionId){let t=(r=n.method,o=n.completionId,`${r}|${o}`);this._pendingHandlers.get(t)?.(n);return}this._onReceiveMessage.fire(n)}catch(t){var b=t,m=!0}finally{n=b,a=m,h="function"==typeof SuppressedError?SuppressedError:function(t,r,o,i){return(i=Error(o)).name="SuppressedError",i.error=t,i.suppressed=r,i},p=t=>n=a?new h(t,n,"An error was suppressed during disposal"):(a=!0,t),(u=t=>{for(;t=g.pop();)try{var r=t[1]&&t[1].call(t[2]);if(t[0])return Promise.resolve(r).then(u,t=>(p(t),u()))}catch(t){p(t)}if(a)throw n})()}}deserializeIpcData(t){return rJ(t,t=>this.getResponsePromise(t.method,t.id))}sendCommand(t,r){let o=r7();this.postMessage({id:o,scope:t.scope,method:t.method,params:r,compressed:!1,timestamp:Date.now()})}async sendRequest(t,r){let o=r7(),i=this.getResponsePromise(t.response.method,o);return this.postMessage({id:o,scope:t.scope,method:t.method,params:r,compressed:!1,timestamp:Date.now(),completionId:o}),i}getResponsePromise(t,r){return new Promise((o,i)=>{var n,a;let c,h=(n=t,a=r,`${n}|${a}`);function p(){clearTimeout(c),c=void 0,this._pendingHandlers.delete(h)}c=setTimeout(()=>{p.call(this),i(Error(`Timed out waiting for completion of ${h}`))},(tS.isDebugging?60:5)*6e4),this._pendingHandlers.set(h,t=>{if(p.call(this),t.method===t0.method){let r=t.params;"rejected"===r.status?queueMicrotask(()=>i(Error(r.reason))):queueMicrotask(()=>o(r.value))}else queueMicrotask(()=>o(t.params))})})}setPersistedState(t){this._api.setState(t)}updatePersistedState(t){let r=this._api.getState();null!=r&&"object"==typeof r?(r={...r,...t},this._api.setState(r)):r=t,this.setPersistedState(r)}postMessage(t){this._api.postMessage(t)}};function or(t,r){let o=Math.pow(10,r);return Math.round(t*o)/o}r6([rK({args:t=>({e:`${t.data.id}|${t.data.method}`})})],ot.prototype,"onMessageReceived",1),r6([rK({args:t=>({commandType:t.method})})],ot.prototype,"sendCommand",1),r6([rK({args:t=>({requestType:t.method})})],ot.prototype,"sendRequest",1),r6([rK({args:t=>({e:`${t.id}, method=${t.method}`})})],ot.prototype,"postMessage",1),ot=r6([(m=t=>`${t.appName}(HostIpc)`,t=>void tP.set(t,m))],ot);let RGBA=class RGBA{constructor(t,r,o,i=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,t)),this.g=0|Math.min(255,Math.max(0,r)),this.b=0|Math.min(255,Math.max(0,o)),this.a=or(Math.max(Math.min(1,i),0),3)}static equals(t,r){return t.r===r.r&&t.g===r.g&&t.b===r.b&&t.a===r.a}};let HSLA=class HSLA{constructor(t,r,o,i){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=or(Math.max(Math.min(1,r),0),3),this.l=or(Math.max(Math.min(1,o),0),3),this.a=or(Math.max(Math.min(1,i),0),3)}static equals(t,r){return t.h===r.h&&t.s===r.s&&t.l===r.l&&t.a===r.a}static fromRGBA(t){let r=t.r/255,o=t.g/255,i=t.b/255,n=t.a,a=Math.max(r,o,i),c=Math.min(r,o,i),h=0,p=0,u=(c+a)/2,g=a-c;if(g>0){switch(p=Math.min(u<=.5?g/(2*u):g/(2-2*u),1),a){case r:h=(o-i)/g+6*(o<i);break;case o:h=(i-r)/g+2;break;case i:h=(r-o)/g+4}h*=60,h=Math.round(h)}return new HSLA(h,p,u,n)}static _hue2rgb(t,r,o){return(o<0&&(o+=1),o>1&&(o-=1),o<1/6)?t+(r-t)*6*o:o<.5?r:o<2/3?t+(r-t)*(2/3-o)*6:t}static toRGBA(t){let r,o,i,n=t.h/360,{s:a,l:c,a:h}=t;if(0===a)r=o=i=c;else{let t=c<.5?c*(1+a):c+a-c*a,h=2*c-t;r=HSLA._hue2rgb(h,t,n+1/3),o=HSLA._hue2rgb(h,t,n),i=HSLA._hue2rgb(h,t,n-1/3)}return new RGBA(Math.round(255*r),Math.round(255*o),Math.round(255*i),h)}};let HSVA=class HSVA{constructor(t,r,o,i){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=or(Math.max(Math.min(1,r),0),3),this.v=or(Math.max(Math.min(1,o),0),3),this.a=or(Math.max(Math.min(1,i),0),3)}static equals(t,r){return t.h===r.h&&t.s===r.s&&t.v===r.v&&t.a===r.a}static fromRGBA(t){let r=t.r/255,o=t.g/255,i=t.b/255,n=Math.max(r,o,i),a=n-Math.min(r,o,i);return new HSVA(Math.round(60*(0===a?0:n===r?((o-i)/a%6+6)%6:n===o?(i-r)/a+2:(r-o)/a+4)),0===n?0:a/n,n,t.a)}static toRGBA(t){let{h:r,s:o,v:i,a:n}=t,a=i*o,c=a*(1-Math.abs(r/60%2-1)),h=i-a,[p,u,g]=[0,0,0];return r<60?(p=a,u=c):r<120?(p=c,u=a):r<180?(u=a,g=c):r<240?(u=c,g=a):r<300?(p=c,g=a):r<=360&&(p=a,g=c),new RGBA(p=Math.round((p+h)*255),u=Math.round((u+h)*255),g=Math.round((g+h)*255),n)}};function oo(t,r){return r.getPropertyValue(t).trim()}let Color=class Color{static from(t){return t instanceof Color?t:parseColor(t)||Color.red}static fromCssVariable(t,r){return parseColor(oo(t,r))||Color.red}static fromHex(t){return parseHexColor(t)||Color.red}static equals(t,r){return!t&&!r||!!t&&!!r&&t.equals(r)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(t){if(t)if(t instanceof RGBA)this.rgba=t;else if(t instanceof HSLA)this._hsla=t,this.rgba=HSLA.toRGBA(t);else if(t instanceof HSVA)this._hsva=t,this.rgba=HSVA.toRGBA(t);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(t){return null!=t&&!!t&&RGBA.equals(this.rgba,t.rgba)&&HSLA.equals(this.hsla,t.hsla)&&HSVA.equals(this.hsva,t.hsva)}getRelativeLuminance(){return or(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(t){let r=t/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}luminance(t){return luminance(this,t)}getContrastRatio(t){let r=this.getRelativeLuminance(),o=t.getRelativeLuminance();return r>o?(r+.05)/(o+.05):(o+.05)/(r+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(t){return this.getRelativeLuminance()>t.getRelativeLuminance()}isDarkerThan(t){return this.getRelativeLuminance()<t.getRelativeLuminance()}lighten(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*t,this.hsla.a))}darken(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*t,this.hsla.a))}transparent(t){let{r,g:o,b:i,a:n}=this.rgba;return new Color(new RGBA(r,o,i,n*t))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(t){let r=t.rgba,o=this.rgba.a,i=r.a,n=o+i*(1-o);return n<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*o/n+r.r*i*(1-o)/n,this.rgba.g*o/n+r.g*i*(1-o)/n,this.rgba.b*o/n+r.b*i*(1-o)/n,n))}mix(t,r){return mixColors(this,t,r)}makeOpaque(t){if(this.isOpaque()||1!==t.rgba.a)return this;let{r,g:o,b:i,a:n}=this.rgba;return new Color(new RGBA(t.rgba.r-n*(t.rgba.r-r),t.rgba.g-n*(t.rgba.g-o),t.rgba.b-n*(t.rgba.b-i),1))}flatten(...t){let r=t.reduceRight((t,r)=>Color._flatten(r,t));return Color._flatten(this,r)}static _flatten(t,r){let o=1-t.rgba.a;return new Color(new RGBA(o*r.rgba.r+t.rgba.a*t.rgba.r,o*r.rgba.g+t.rgba.a*t.rgba.g,o*r.rgba.b+t.rgba.a*t.rgba.b))}toString(){return this._toString||(this._toString=function(t){return t.isOpaque()?`#${oi(t.rgba.r)}${oi(t.rgba.g)}${oi(t.rgba.b)}`:`rgba(${t.rgba.r}, ${t.rgba.g}, ${t.rgba.b}, ${Number(t.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(t,r,o){if(t.isLighterThan(r))return t;o=o||.5;let i=t.getRelativeLuminance(),n=r.getRelativeLuminance();return o=o*(n-i)/n,t.lighten(o)}static getDarkerColor(t,r,o){if(t.isDarkerThan(r))return t;o=o||.5;let i=t.getRelativeLuminance(),n=r.getRelativeLuminance();return o=o*(i-n)/i,t.darken(o)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function oi(t){let r=t.toString(16);return 2!==r.length?`0${r}`:r}let on=new Emitter,oa=on.event;function os(t){let r=document.documentElement,o=window.getComputedStyle(r),i=document.body.classList,n=i.contains("vscode-light")||i.contains("vscode-high-contrast-light"),a=i.contains("vscode-high-contrast")||i.contains("vscode-high-contrast-light"),c=oo("--vscode-editor-background",o),h=oo("--vscode-editor-foreground",o);return h||(h=oo("--vscode-foreground",o)),{colors:{background:c,foreground:h},computedStyle:o,isLightTheme:n,isHighContrastTheme:a,isInitializing:null==t}}var ol=Object.defineProperty,oc=Object.getOwnPropertyDescriptor,od=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?oc(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ol(r,o,a),a};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(t){let r=JSON.parse(tY.decode(function(t){let r=globalThis.atob(t),o=r.length,i=new Uint8Array(o),n=0,a=o-o%8;for(;n<a;n+=8)i[n]=r.charCodeAt(n),i[n+1]=r.charCodeAt(n+1),i[n+2]=r.charCodeAt(n+2),i[n+3]=r.charCodeAt(n+3),i[n+4]=r.charCodeAt(n+4),i[n+5]=r.charCodeAt(n+5),i[n+6]=r.charCodeAt(n+6),i[n+7]=r.charCodeAt(n+7);for(;n<o;n++)i[n]=r.charCodeAt(n);return i}(t))),o=r.webviewId,i=r.webviewInstanceId;this._webview={webviewId:o,webviewInstanceId:i,createCommandLink:(t,r)=>{var n;return t.endsWith(":")&&(t=`${t}${o.split(".").at(-1)}`),n=t,`command:${n}?${encodeURIComponent(JSON.stringify({webview:o,webviewInstance:i,...r}))}`}}}connectedCallback(){let t,r,o,i,n;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new ot(this.name),this.disposables.push(((t=new MutationObserver(t=>{on.fire(os(t))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>t.disconnect()})),null!=this.onThemeUpdated&&(this.onThemeUpdated(os()),this.disposables.push(oa(this.onThemeUpdated,this))),this.disposables.push(this._ipc.onReceiveMessage(t=>{switch(!0){case t1.is(t):this.onWebviewFocusChanged?.(t.params.focused),window.dispatchEvent(new CustomEvent(t.params.focused?"webview-focus":"webview-blur"));break;case t2.is(t):this.onWebviewVisibilityChanged?.(t.params.visible),window.dispatchEvent(new CustomEvent(t.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(i=0,n=tl(t=>{let r=`webview:${++i}`,o=document.hasFocus();t.focused=o,o||(t.inputFocused=!1),r3().postMessage({id:r,scope:tX.scope,method:tX.method,params:t,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:t=>{let i=t.composedPath().some(t=>"INPUT"===t.tagName);(!0!==r||o!==i)&&(r=!0,o=i,n({focused:!0,inputFocused:i}))},onFocusOut:t=>{n({focused:!1,inputFocused:!1})}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(t=>{t.href===t.title&&t.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(t=>t.dispose())}render(){return ex`<slot></slot>`}};od([eD({type:String})],GlWebviewApp.prototype,"name",2),od([eD({type:String})],GlWebviewApp.prototype,"placement",2),od([A({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),od([A({context:"logger"})],GlWebviewApp.prototype,"_logger",2),od([A({context:"promos"})],GlWebviewApp.prototype,"_promos",2),od([A({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),od([A({context:"webview"})],GlWebviewApp.prototype,"_webview",2);let oh=tB(GlWebviewApp);let SignalWatcherWebviewApp=class SignalWatcherWebviewApp extends oh{connectedCallback(){super.connectedCallback?.(),this._ipc.sendRequest(tJ,{bootstrap:!1,clientId:r9,clientLoadedAt:oe})}};let op=F`
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;F`
	.sr-only,
	.sr-only-focusable:not(:active, :focus-visible, :focus-within) {
		${op}
	}
`;let ou=F`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: -1px;
`,og=F`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: 2px;
`,ob=F`
	:focus-visible {
		${ou}
	}
`,om=F`
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
`;F`
	* {
		box-sizing: border-box;
	}
`;let of=F`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}

	a:focus {
		${ou}
	}

	a:hover {
		text-decoration: underline;
	}
`,ov=F`
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
`;function oy(){let t=[];return{signal:function(r){let o=tK(r);return t.push(()=>o.set(r)),o},resetAll:function(){for(let r of t)r()}}}F`
	.inline-code {
		padding: 0 var(--gl-space-4) var(--gl-space-2);
		font-family: var(--vscode-editor-font-family);
		background: var(--vscode-textCodeBlock-background);
		border-radius: var(--gl-radius-sm);
	}
`,F`
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
`,F`
	:host {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		overflow: hidden;
	}
`,F`
	:host {
		--gl-metadata-bar-bg: color-mix(in srgb, var(--color-background) 95%, var(--color-foreground) 5%);
		--gl-metadata-bar-border: var(--vscode-sideBarSectionHeader-border, var(--color-foreground--25));
		--gl-metadata-bar-min-height: 2.94rem;
	}
`;let ow="__rk",o_="__ts",ok=new Set(["__v",ow,o_]);function o$(){}let VsCodeStorage=class VsCodeStorage{constructor(){this._api=r3()}get(){return this._api.getState()}set(t){this._api.setState(t)}};function ox(){return{storage:new VsCodeStorage,createEndpoint:()=>{let t,r;return t=r3(),r=new Map,{postMessage:function(r,o){let i={[rX]:!0,payload:rQ.encode(JSON.stringify(r))};t.postMessage(i)},addEventListener:function(t,o){if("message"!==t)return;let i=t=>{let r=t.data;if(!rZ(r))return;let{payload:i}=r;o(new MessageEvent("message",{data:i instanceof Uint8Array||i instanceof ArrayBuffer?JSON.parse(r0.decode(i)):i,origin:t.origin,lastEventId:t.lastEventId,source:t.source,ports:[...t.ports]}))};r.set(o,i),window.addEventListener("message",i)},removeEventListener:function(t,o){if("message"!==t)return;let i=r.get(o);i&&(window.removeEventListener("message",i),r.delete(o))},dispose:function(){for(let t of r.values())window.removeEventListener("message",t);r.clear()}}}}}function oC(t){return null!=t&&"object"==typeof t&&(t instanceof Error||"string"==typeof t.name&&"string"==typeof t.message)}function oS(t){return t.stack??`${t.name}: ${t.message}`}let oP=Symbol(),oA=Symbol(),oO=()=>{},oR=Symbol(),oI=Symbol();function oE(t){if(t instanceof Error){let r={name:t.name,message:t.message};return void 0!==t.stack&&(r.stack=t.stack),r}return{name:"Error",message:String(t)}}function oT(t){let r=Error(t.message);return r.name=t.name,r.stack=t.stack,r}Symbol(),new WeakMap;let NonCloneableError=class NonCloneableError extends Error{valueType;path;constructor(t,r){super(`The nested ${t} at "${r}" cannot be cloned. Use nestedProxies: true.`),this.valueType=t,this.path=r,this.name="NonCloneableError"}};let Connection=class Connection{#d;#h;#p;#u;#g;#b=new Map;#m=0;#f=1;#v=!1;#y=new Map;#w=new WeakMap;#_=new Map;#k=new WeakMap;#$;#x=0;#C=new Map;#S=new Map;#P;#A=[];#O=!1;constructor(t,r={}){for(let o of(this.#d=t,this.#h=r.nestedProxies??!1,this.#p=r.debug??!1,this.#u=r.logger,this.#g=r.handlers??[],this.#P=r.batching??!1,this.#g))this.#b.set(o.wireType,o),"function"==typeof o.connect&&o.connect({sendMessage:t=>{this.#R(o.wireType,t)}});this.#$=new FinalizationRegistry(({id:t,session:r})=>{r===this.#x&&(this.#_.delete(t),this.#I({type:"release",id:t}))}),t.addEventListener("message",this.#E)}#I(t,r){if(!this.#v){if(!this.#P)return void this.#d.postMessage(t,r);this.#A.push({message:t,transfers:r}),this.#O||(this.#O=!0,queueMicrotask(()=>this.#T()))}}#T(){this.#O=!1;let t=this.#A;if(this.#A=[],0===t.length)return;let r=r=>{let o=r instanceof Error?r:Error(String(r));for(let{message:r}of t)if("call"===r.type&&void 0!==r.id){let t=this.#C.get(r.id);t&&(this.#C.delete(r.id),t.reject(o))}};if(1===t.length){let{message:o,transfers:i}=t[0];try{this.#d.postMessage(o,i)}catch(t){r(t)}}else{let o=[],i=[];for(let{message:r,transfers:n}of t)i.push(r),n&&o.push(...n);try{this.#d.postMessage({type:"batch",messages:i},o.length>0?o:void 0)}catch(t){r(t)}}}#R(t,r){let o=[];this.#I({type:"handler",wireType:t,payload:this.#B(r,"",o)},o)}#z(){let t=this.#m;return this.#m+=this.#f,t}expose(t){this.#f=2,this.#L(t),this.#I({type:"return",id:0,value:this.#M(t)})}#D(t){this.#A=[],this.#O=!1;let r=Error(t);for(let{reject:t}of this.#C.values())t(r);for(let{reject:t}of(this.#C.clear(),this.#S.values()))t(r);this.#S.clear()}close(){for(let t of(this.#v=!0,this.#D("Connection closed"),this.#d.removeEventListener("message",this.#E),this.#g))t.disconnect?.()}reset(t){for(let t of(this.#D("Connection reset"),this.#y.clear(),this.#w=new WeakMap,this.#_.clear(),this.#k=new WeakMap,this.#x++,this.#m=0,this.#f=1,this.#g))t.disconnect?.();for(let r of(void 0!==t&&t!==this.#d?(this.#v||this.#d.removeEventListener("message",this.#E),this.#d=t,t.addEventListener("message",this.#E)):this.#v&&this.#d.addEventListener("message",this.#E),this.#v=!1,this.#g))"function"==typeof r.connect&&r.connect({sendMessage:t=>{this.#R(r.wireType,t)}})}#F(t){if(t!==this.#x)throw Error("Stale proxy from previous session")}waitForReady(){return this.#m=1,this.#f=2,new Promise((t,r)=>{this.#C.set(0,{resolve:t,reject:r})})}#L(t){let r=this.#w.get(t);return void 0!==r||(r=this.#z(),this.#y.set(r,t),this.#w.set(t,r)),r}#j(t){return this.#y.get(t)}#N(t){return this.#_.get(t)?.deref()}#W(t){return this.#k.get(t)}#B(t,r,o){return"object"==typeof t?.[oR]?{__st__:"property",...t[oR]}:this.#U(t,r,o,new Map)}#M(t,r=!1){return{__st__:"proxy",id:this.#W(t)??this.#L(t),o:r}}#U(t,r,o,i,n){if(null==t||"object"!=typeof t&&"function"!=typeof t)return t;let a=i.get(t);if(void 0!==a)return a;if(t?.[oA]===!0){if(r&&this.#p&&!this.#h)throw new NonCloneableError("transfer",r);return o.includes(t.value)||o.push(t.value),i.set(t,t.value),t.value}if(t?.[oP]!==void 0){if(r&&this.#p&&!this.#h)throw new NonCloneableError("proxy",r);let o=this.#M(t[oP],t?.[oI]==="handle");return i.set(t,o),o}if("function"==typeof t){if(r&&this.#p&&!this.#h)throw new NonCloneableError("function",r);let o=this.#M(t);return i.set(t,o),o}if(void 0!==this.#W(t)){let r=this.#M(t,"__o"in t);return i.set(t,r),r}if("function"==typeof t?.then){if(r&&this.#p&&!this.#h)throw new NonCloneableError("promise",r);let o={__st__:"promise",id:this.#q(t)};return i.set(t,o),o}if(this.#g.length>0){for(let a of this.#g)if(a.canHandle(t)){let c={toWire:(t,a)=>{let c=a?r?`${r}.${a}`:a:r;return this.#U(t,c,o,i,n)},...void 0!==n&&{callId:n}},h=a.toWire(t,c);return i.set(t,h),h}}if(!(this.#h||this.#p))return t;if(Array.isArray(t)){let a=[];i.set(t,a);for(let c=0;c<t.length;c++)a.push(this.#U(t[c],`${r}[${String(c)}]`,o,i,n));return a}let c=Object.getPrototypeOf(t);if(c===Object.prototype||null===c){let a={};for(let c of(i.set(t,a),Object.keys(t)))a[c]=this.#U(t[c],r?`${r}.${c}`:c,o,i,n);return a}return t}#H(t){return{fromWire:r=>this.#G(r,t)}}#K(t){let r=t?.__st__;if("property"===r){let r=this.#j(t.targetProxyId);if(!r)throw ReferenceError(`Proxy property target ${String(t.targetProxyId)} not found`);return r[t.property]}if("thrown"===r)throw oT(t.error);return this.#G(t,new Map)}#G(t,r){if(null===t||"object"!=typeof t)return t;let o=r.get(t);if(void 0!==o)return o;if(t?.__st__==="proxy"){let o=this.#j(t.id);if(o){let i=t.o?{[oP]:o,[oI]:"handle",__nc:oO}:new Proxy(oO,{get:(t,r)=>{var i,n,a;let c;return r===oP?o:r===oI?"proxy":"then"!==r?(i=o,n=r,a=o[r],(c=(...t)=>{if("function"==typeof a)return Promise.resolve(a.apply(i,t));throw TypeError(`${String(n)} is not a function`)}).then=(t,r)=>Promise.resolve(a).then(t,r),c):void 0},set:(t,r,i)=>(o[r]=i,!0),apply(t,r,i){if("function"==typeof o)return Promise.resolve(o(...i));throw TypeError("Proxy target is not callable")}});return r.set(t,i),i}let i=this.#N(t.id)??this.#V(t.id,t.o);return r.set(t,i),i}if(t?.__st__==="promise"){let{promise:o,resolve:i,reject:n}=Promise.withResolvers();return this.#S.set(t.id,{resolve:i,reject:n}),r.set(t,o),o}let i=t.__st__;if("string"==typeof i){let o=this.#b.get(i);if(o?.fromWire){let i=o.fromWire(t,this.#H(r));return r.set(t,i),i}}if(!this.#h)return t;if(Array.isArray(t)){let o=[];for(let i of(r.set(t,o),t))o.push(this.#G(i,r));return o}if(Object.getPrototypeOf(t)!==Object.prototype)return t;let n={};for(let o of(r.set(t,n),Object.keys(t)))n[o]=this.#G(t[o],r);return n}#q(t){let r=this.#z();return t.then(t=>{try{let o=[],i=this.#B(t,"",o);this.#I({type:"resolve",id:r,value:i},o)}catch{this.#I({type:"reject",id:r,error:oE(Error("Failed to serialize resolved promise value"))})}},t=>{try{this.#I({type:"reject",id:r,error:oE(t)})}catch{}}),r}#V(t,r){let o=this.#N(t);if(void 0===o){let i=this.#x;o=r?{__o:oO}:new Proxy(oO,{apply:(r,o,n)=>(this.#F(i),this.#Y(t,void 0,n)),get:(r,o)=>"string"==typeof o&&"then"!==o?this.#J(t,o,i):void 0,set:(r,o,n)=>{if("string"!=typeof o)return!1;this.#F(i);let a=[];return this.#X(this.#z(),t,"set",o,[this.#B(n,"",a)],a).catch(()=>{}),!0}}),this.#_.set(t,new WeakRef(o)),this.#k.set(o,t),this.#$.register(o,{id:t,session:this.#x})}return o}#J(t,r,o){let i=(...i)=>(this.#F(o),this.#Y(t,r,i));return i.then=(i,n)=>(this.#F(o),this.#X(this.#z(),t,"get",r,[],[]).then(i,n)),i[oR]={targetProxyId:t,property:r},i}#X(t,r,o,i,n,a){let{promise:c,resolve:h,reject:p}=Promise.withResolvers();this.#C.set(t,{resolve:h,reject:p});try{this.#I({type:"call",id:t,target:r,action:o,method:i,args:n},a)}catch(r){this.#C.delete(t),p(r instanceof Error?r:Error(String(r)))}return c}#Y(t,r,o){let i=[],n=new Map,a=this.#z();return this.#X(a,t,"call",r,o.map(t=>this.#U(t,"",i,n,a)),i)}#E=t=>{let r=t.data;if(null!=r)if("batch"===r.type)for(let t of r.messages)this.#Z(t);else this.#Z(r)};#Z(t){switch(t.type){case"release":{let r=this.#y.get(t.id);void 0!==r&&(this.#y.delete(t.id),this.#w.delete(r));break}case"resolve":this.#Q(this.#S,t.id,t.value);break;case"reject":this.#ee(this.#S,t.id,t.error);break;case"return":this.#Q(this.#C,t.id,t.value),this.#et(t.id);break;case"throw":this.#ee(this.#C,t.id,t.error),this.#et(t.id);break;case"call":this.#er(t);break;case"handler":this.#eo(t.wireType,t.payload)}}#Q(t,r,o){let i=t.get(r);if(i){t.delete(r);try{i.resolve(this.#K(o))}catch(t){i.reject(t instanceof Error?t:Error(String(t)))}}}#ee(t,r,o){let i=t.get(r);i&&(t.delete(r),i.reject(oT(o)))}#et(t){for(let r of this.#g)r.onCallSettle?.(t)}#eo(t,r){try{let o=this.#b.get(t);if(o?.onMessage){let t=new Map;o.onMessage(this.#G(r,t),this.#H(t))}}catch(r){this.#u?.error?.(`Error in handler.onMessage for wireType "${t}":`,r)}}async #er(t){let{id:r,target:o,method:i,args:n,action:a}=t,c=new Map,h=n.map(t=>this.#G(t,c)),p=this.#j(o);if(!p)return this.#I({type:"throw",id:r,error:{name:"ReferenceError",message:`Proxy target ${String(o)} not found`}});let u=this.#u,g=u?.debug?performance.now():0;try{let t;if("get"===a){if(void 0===i)throw TypeError("Property name required for get action");t=p[i]}else if("set"===a){if(void 0===i)throw TypeError("Property name required for set action");p[i]=h[0],t=void 0}else if(void 0===i){if("function"!=typeof p)throw TypeError("Target is not callable");t=await p(...h)}else{let r=p[i];if("function"!=typeof r)throw TypeError(`${i} is not a function`);t=await r.apply(p,h)}let o=[],n=this.#B(t,"",o);this.#I({type:"return",id:r,value:n},o),u?.debug?.(`${a} ${i??"(direct)"} completed`,{duration:performance.now()-g})}catch(t){u?.debug?.(`${a} ${i??"(direct)"} failed`,{duration:performance.now()-g,error:t}),this.#I({type:"throw",id:r,error:oE(t)})}}};let RemoteSignal=class RemoteSignal{#ei;#en;#ea;constructor(t,r,o){this.#en=t,this.#ea=o,this.#ei=new w.State(r,{[w.subtle.watched]:()=>{this.#ea?.(this.#en,!0)},[w.subtle.unwatched]:()=>{this.#ea?.(this.#en,!1)}})}get(){return this.#ei.get()}set(t){throw Error("RemoteSignal is read-only. The signal can only be modified on the sender side.")}get signalId(){return this.#en}_update(t){this.#ei.set(t)}};let SignalHandler=class SignalHandler{wireType="signal";#es;#el;#ec=0;#ed=1;#eh=new Map;#ep=new WeakMap;#eu;#O=!1;#eg=new Map;#eb=new Map;#em=new Map;#ef=new Map;#$=new FinalizationRegistry(({signalId:t,session:r})=>{r===this.#ec&&(this.#em.delete(t),this.#el?.sendMessage({type:"signal:release",signalId:t}))});constructor(t={}){this.#es=t.autoWatch??!1}connect(t){this.#el=t}onMessage(t){(null!==t&&"object"==typeof t&&"type"in t?"signal:batch"!==t.type:1)?(null!==t&&"object"==typeof t&&"type"in t?"signal:release"!==t.type:1)?(null!==t&&"object"==typeof t&&"type"in t?"signal:watch"!==t.type:1)?null!==t&&"object"==typeof t&&"type"in t&&"signal:unwatch"===t.type&&this.#ev(t.signalId):this.#ey(t.signalId):this.releaseSignal(t.signalId):this.#ew(t)}disconnect(){this.#el=void 0,this.#O=!1,void 0!==this.#eu&&(this.#eu.unwatch(...this.#eg.values()),this.#eu=void 0),this.#eh.clear(),this.#eg.clear(),this.#eb.clear(),this.#em.clear(),this.#ef.clear(),this.#ec++,this.#ep=new WeakMap,this.#ed=1}canHandle(t){return t instanceof w.State||t instanceof w.Computed}toWire(t,r){return this.#e_(t,r)}fromWire(t,r){return this.#ek(t,r)}#e_(t,r){let o=this.#ep.get(t);return void 0===o&&(o=this.#ed++,this.#eh.set(o,t),this.#ep.set(t,o),this.#es&&this.#ey(o)),{__st__:"signal",signalId:o,value:r.toWire(t.get())}}#ek(t,r){let o=r.fromWire(t.value),i=this.#em.get(t.signalId),n=i?.deref();if(void 0!==n)return n._update(o),n;let a=this.#ef.get(t.signalId);this.#ef.delete(t.signalId);let c=new RemoteSignal(t.signalId,void 0!==a?a:o,this.#e$);return this.#em.set(t.signalId,new WeakRef(c)),this.#$.register(c,{signalId:t.signalId,session:this.#ec}),c}#e$=(t,r)=>{void 0!==this.#el&&(r?this.#el.sendMessage({type:"signal:watch",signalId:t}):this.#el.sendMessage({type:"signal:unwatch",signalId:t}))};#ey(t){if(this.#eg.has(t))return;let r=this.#eh.get(t);if(void 0===r)return;let o=this.#ex(),i=new w.Computed(()=>r.get());this.#eg.set(t,i),this.#eb.set(i,t),o.watch(i);let n=i.get();this.#el?.sendMessage({type:"signal:batch",updates:[{signalId:t,value:n}]})}#ev(t){let r=this.#eg.get(t);void 0!==r&&(this.#eu?.unwatch(r),this.#eg.delete(t),this.#eb.delete(r))}#ex(){return this.#eu??=new w.subtle.Watcher(()=>{this.#O||(this.#O=!0,queueMicrotask(this.#T))})}#T=()=>{if(this.#O=!1,void 0===this.#eu||void 0===this.#el)return;let t=this.#eu.getPending(),r=[];for(let o of t){let t=this.#eb.get(o);if(void 0!==t&&this.#eh.has(t)){let i=o.get();r.push({signalId:t,value:i})}}this.#eu.watch(),r.length>0&&this.#el.sendMessage({type:"signal:batch",updates:r})};#ew(t){for(let r of t.updates){let t=this.#em.get(r.signalId),o=t?.deref();void 0!==o?o._update(r.value):this.#ef.set(r.signalId,r.value)}}releaseSignal(t){let r=this.#eg.get(t);void 0!==r&&(this.#eu?.unwatch(r),this.#eg.delete(t),this.#eb.delete(r)),this.#eh.delete(t)}get _sentSignalCount(){return this.#eh.size}get _remoteSignalCount(){return this.#em.size}_isWatching(t){return this.#eg.has(t)}};let oB="abort-signal";let AbortSignalHandler=class AbortSignalHandler{wireType=oB;#el;#ec=0;#m=1;#ep=new WeakMap;#eh=new Map;#eC=new Map;#eS=new FinalizationRegistry(({id:t,session:r})=>{r!==this.#ec||this.#eC.has(t)&&(this.#eC.delete(t),this.#eh.delete(t),this.#el?.sendMessage({type:"release",id:t}))});#eP=new Map;canHandle(t){return t instanceof AbortSignal}toWire(t,r){if(t.aborted)return{__st__:oB,id:0,aborted:!0,reason:t.reason};let o=this.#ep.get(t);if(void 0!==o)return{__st__:oB,id:o,aborted:!1};o=this.#m++,this.#ep.set(t,o),this.#eh.set(o,new WeakRef(t)),this.#eS.register(t,{id:o,session:this.#ec},t);let i=new WeakRef(t),n=o,a=()=>{let t=i.deref(),r=t?.reason;"completed"===r?this.#el?.sendMessage({type:"release",id:n}):this.#el?.sendMessage({type:"abort",id:n,reason:r}),void 0!==t&&this.#eS.unregister(t),this.#eA(n)};return t.addEventListener("abort",a,{once:!0}),this.#eC.set(o,a),{__st__:oB,id:o,aborted:!1}}fromWire(t){if(t.aborted)return AbortSignal.abort(t.reason);let r=this.#eP.get(t.id);if(void 0!==r)return r.signal;let o=new AbortController;return this.#eP.set(t.id,o),o.signal}connect(t){this.#el=t}onMessage(t){"abort"===t.type?(this.#eP.get(t.id)?.abort(t.reason),this.#eP.delete(t.id)):"release"===t.type&&this.#eP.delete(t.id)}disconnect(){for(let t of(this.#el=void 0,this.#eP.values()))t.abort("disconnected");for(let[t,r]of(this.#eP.clear(),this.#eC)){let o=this.#eh.get(t)?.deref();void 0!==o&&(o.removeEventListener("abort",r),this.#eS.unregister(o))}this.#eC.clear(),this.#eh.clear(),this.#ec++,this.#ep=new WeakMap,this.#m=1}#eA(t){this.#eC.delete(t),this.#eh.delete(t)}get _sentCount(){return this.#eh.size}get _receivedCount(){return this.#eP.size}};let oz="st-error";function oL(t){return null!=t&&"object"==typeof t&&t.__st__===oz}function oM(t){if(null==t||"object"!=typeof t)return t;if(t instanceof Error||"string"==typeof t.name&&"string"==typeof t.message){let r={__st__:oz,name:t.name,message:t.message};return"string"==typeof t.stack&&(r.stack=t.stack),r}return t}function oD(t){if(!oL(t))return t;if("AbortError"===t.name&&"u">typeof DOMException)return new DOMException(t.message,"AbortError");let r=Error(t.message);return r.name=t.name,void 0!==t.stack&&(r.stack=t.stack),r}function oF(t){return null!=t&&"object"==typeof t&&"abort"===t.type}let GlAbortSignalHandler=class GlAbortSignalHandler extends AbortSignalHandler{toWire(t,r){let o=super.toWire(t,r);return o.aborted&&void 0!==o.reason&&(o.reason=oM(o.reason)),o}fromWire(t){return t.aborted&&oL(t.reason)&&(t={...t,reason:oD(t.reason)}),super.fromWire(t)}connect(t){super.connect({sendMessage:r=>{oF(r)&&void 0!==r.reason&&(r.reason=oM(r.reason)),t.sendMessage(r)}})}onMessage(t){oF(t)&&oL(t.reason)&&(t.reason=oD(t.reason)),super.onMessage(t)}};let oj="__st__",oN=[{wireType:"date",canHandle:function(t){return t instanceof Date},toWire:function(t){return{[oj]:"date",value:t.getTime()}},fromWire:function(t){return new Date(t.value)}},{wireType:"map",canHandle:function(t){return t instanceof Map},toWire:function(t,r){let o=[];for(let[i,n]of t)o.push([r.toWire(i),r.toWire(n)]);return{[oj]:"map",entries:o}},fromWire:function(t,r){let o=new Map;for(let i of t.entries){let[t,n]=i;o.set(r.fromWire(t),r.fromWire(n))}return o}},{wireType:"set",canHandle:function(t){return t instanceof Set},toWire:function(t,r){let o=[];for(let i of t)o.push(r.toWire(i));return{[oj]:"set",values:o}},fromWire:function(t,r){let o=new Set;for(let i of t.values)o.add(r.fromWire(i));return o}},{wireType:"regexp",canHandle:function(t){return t instanceof RegExp},toWire:function(t){return{[oj]:"regexp",source:t.source,flags:t.flags}},fromWire:function(t){return new RegExp(t.source,t.flags)}}];function oW(t){return"string"==typeof t[0]?[t[0],t.slice(1)]:[t.map(String).join(" "),[]]}function oU(t){return t.map(t=>{let r;if(oC(t))return oS(t);if(null==t||"object"!=typeof t||Array.isArray(t))return t;for(let[o,i]of Object.entries(t))oC(i)&&((r??={...t})[o]=oS(i));return r??t})}function oq(t){let r=`[RPC:${t}]`;return{debug:(...t)=>{let[o,i]=oW(t);tS.debug(`${r} ${o}`,...oU(i))},warn:(...t)=>{let[o,i]=oW(t);tS.warn(`${r} ${o}`,...oU(i))},error:(...t)=>{let[o,i]=oW(t),n=function(t){for(let r of t){if(oC(r))return r;if(null!=r&&"object"==typeof r&&!Array.isArray(r)){for(let t of Object.values(r))if(oC(t))return t}}}(i);tS.error(n,`${r} ${o}`)}}}async function oH(t){let r,o,i="function"==typeof t?.webviewId?t.webviewId():t?.webviewId,n="function"==typeof t?.webviewInstanceId?t.webviewInstanceId():t?.webviewInstanceId,a=null==i&&null==n?"?":null==n?i:`${i??"?"}|${n}`,c=`RpcClient(${a})`,h=t?.endpoint?.()??(u??=ox()).createEndpoint(),p=new Connection(h,{handlers:[...oN,new SignalHandler({autoWatch:t?.autoWatchSignals}),new GlAbortSignalHandler,...t?.handlers??[]],nestedProxies:t?.nestedProxies??!0,debug:t?.debug,batching:!0,logger:oq(`client(${a})`)}),g=t?.timeout??6e4,b=[],m=()=>{for(let t of b)clearTimeout(t);b.length=0,null!=r&&(clearTimeout(r),r=void 0),null!=o&&(t?.signal?.removeEventListener("abort",o),o=void 0)},f=()=>{m(),p.close(),h.dispose()},v=()=>{let r=t?.signal?.reason;return r instanceof Error?r:Error("RPC connection aborted")};try{let i;if(t?.signal?.aborted)throw v();tS.debug(`${c}: Connecting to host...`),2e4<g&&b.push(setTimeout(()=>tS.warn(`${c}: Connection still pending after 20000ms`),2e4)),4e4<g&&b.push(setTimeout(()=>tS.warn(`${c}: Connection still pending after 40000ms \u2014 peer may be stuck`),4e4));let n=await Promise.race([p.waitForReady(),new Promise((t,o)=>r=setTimeout(()=>o(Error(`RPC connection timed out after ${g}ms`)),g)),...t?.signal!=null?[new Promise((r,i)=>{o=()=>i(v()),t.signal.addEventListener("abort",o,{once:!0})})]:[]]);return m(),tS.debug(`${c}: Connected to host successfully`),{services:(i=new Map,new Proxy(n,{get:function(t,r,o){if(i.has(r))return i.get(r);let n=Reflect.get(t,r,o);if("function"==typeof n||null==n||"object"!=typeof n||"function"!=typeof n.then)return n;let a=Promise.resolve(n);return i.set(r,a),a}})),dispose:()=>{tS.debug(`${c}: Disposing connection...`),f()}}}catch(t){throw f(),tS.error(t,`${c}: Failed to connect to host`),t}}oq("?");let oG=new DOMException("rpc reconnect: host reconnected","AbortError"),oK=new DOMException("rpc disconnect: host disconnected","AbortError");let RpcController=class RpcController{constructor(t,r){this.host=t,this.options=r,t.addController(this)}get services(){return this._services}hostConnected(){null!=this._connectionAbort&&this._connectionAbort.abort(oG),this._connectionAbort=new AbortController,this._connect(this._connectionAbort.signal)}hostDisconnected(){this._connectionAbort?.abort(oK),this._connectionAbort=void 0,this._disposeRpc?.(),this._disposeRpc=void 0,this._services=void 0}async _connect(t){try{let{services:r,dispose:o}=await oH({...this.options?.rpcOptions,signal:t});if(t.aborted)return void o();if(this._services=r,this._disposeRpc=o,this.options?.onReady!=null)try{await this.options.onReady(r)}catch(t){throw o(),this._disposeRpc=void 0,this._services=void 0,t}}catch(h){if(t.aborted)return;let r=function(t){if(t instanceof Error)return t;if(oC(t)){let r=Error(`${t.name}: ${t.message}`);return r.cause=t,r}return Error(String(t))}(h),o=this.options?.rpcOptions?.webviewId,i=this.options?.rpcOptions?.webviewInstanceId,n="function"==typeof o?o():o,a="function"==typeof i?i():i,c=null!=a?`${n??"?"}|${a}`:n??"?";tS.error(r,`RpcController(${c}): Failed to connect`),this.options?.onError!=null&&this.options.onError(r)}}};function oV(t,r){let o,i,n=r?.cancelPrevious??!0,a=r?.initialValue,c=tK(a),h=tK(!1),p=tK(void 0),u=tK(!1),g=new w.Computed(()=>h.get()?"loading":null!=p.get()?"error":u.get()?"success":"idle"),b=!1,m=0,f=0;function v(){null!=o&&(o.abort(new DOMException("resource: cancelled by newer fetch","AbortError")),o=void 0),h.set(!1)}async function _(...r){if(b)return;n&&v(),i=r;let a=new AbortController,g=++m;f=g,o=a,h.set(!0),p.set(void 0);try{let o=await t(a.signal,...r);if(a.signal.aborted||g!==f)return;c.set(o),u.set(!0)}catch(t){if(a.signal.aborted||g!==f)return;p.set(t instanceof Error?t.message:String(t))}finally{o===a&&(o=void 0,h.set(!1))}}async function $(){if(null!=i)return _(...i)}return{value:c,loading:h,error:p,status:{get:()=>g.get()},generationId:{get:()=>f},fetch:_,refetch:$,mutate:function(t){b||(c.set(t),p.set(void 0),u.set(!0))},cancel:v,reset:function(){v(),c.set(a),p.set(void 0),u.set(!1),i=void 0},dispose:function(){b=!0,v()}}}let oY=t=>{if(null!=t){let r=t instanceof Error?t.message:"unknown error";tS.warn(`RPC call rejected (noop handler): ${r}`)}},oJ={waiting:0,working:1,idle:2},oX={working:"working",waiting:"needs-input",idle:"idle"};function oZ(t){switch(t){case"needs-input":return"Needs input";case"working":return"Working";case"idle":return"Idle"}}function oQ(t,r){if("needs-input"!==t||null==r)return oZ(t);switch(r.kind){case"plan":return"Plan ready";case"question":return"Question";case"elicitation":return"Input needed";default:return"Permission"}}function o0(t){return t.toSorted((t,r)=>{let o=oJ[t.phase],i=oJ[r.phase];if(o!==i)return o-i;let n=t.phaseSince.getTime(),a=r.phaseSince.getTime();return n!==a?a-n:t.displayName.localeCompare(r.displayName)})}async function o1(t,r,o){let i=r=>{t.overviewFilter.set(r),o?.(r)},n=t.overviewFilter.get();i(n);try{await r.setOverviewFilter(n),i(await r.getOverviewFilterState())}catch(t){tS.error(t,"Home: Failed to restore overview filter")}}async function o2(t,r){try{let o=t.overviewRepositoryPath.get();if(null!=o){let i=await r.setOverviewRepository(o);t.overviewRepositoryPath.set(i);return}let i=await r.getOverviewRepositoryState();null!=i&&t.overviewRepositoryPath.set(i)}catch(t){tS.error(t,"Home: Failed to restore overview repository path")}}async function o5(t,r){t.launchpadLoading.set(!0);try{let o=await r.getSummary();t.launchpadSummary.set(o)}catch(r){tS.error(r,"Home: Failed to fetch launchpad summary"),t.launchpadSummary.set({error:r instanceof Error?r:Error("Failed to load")})}finally{t.launchpadLoading.set(!1)}}async function o4(t){let r=await Promise.allSettled(t.map(t=>t())),o=[];for(let t of r)"fulfilled"===t.status&&"function"==typeof t.value?o.push(t.value):"rejected"===t.status&&tS.error(t.reason,"Failed to subscribe");return()=>{for(let t of o)try{t()}catch(t){tS.error(t,"Failed to unsubscribe")}}}let o6={index:"active",pausedOp:"active",cherryPick:"active",merge:"active",rebase:"active",revert:"active",head:"both",heads:"both",worktrees:"both",remotes:"both",unknown:"both",closed:"both",opened:"both",tags:"none",stash:"none",config:"none",starred:"none",ignores:"none",remoteProviders:"none",gkConfig:"none",lastFetched:"none"},o3=F`
	* {
		box-sizing: border-box;
	}

	:not(:defined) {
		visibility: hidden;
	}

	[hidden] {
		display: none !important;
	}

	/* roll into shared focus style */
	:focus-visible {
		outline: var(--gl-border-width) solid var(--vscode-focusBorder);
		outline-offset: -1px;
	}

	b {
		font-weight: 600;
	}

	p {
		margin-top: 0;
	}

	ul {
		padding-left: 1.2em;
		margin-top: 0;
	}
`,o8=F`
	.home {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-4);
		height: 100vh;
		padding: 0;
		overflow: hidden;
	}

	.home__alerts {
		position: relative;
		flex: none;
		padding: 0 var(--gl-space-20);
	}

	.home__alerts:not([has-alerts]) {
		display: none;
	}

	.home__main {
		flex: 1;
		padding: var(--gl-space-8) var(--gl-space-12);
		overflow: auto;
	}

	.home__main > *:last-child {
		margin-bottom: 0;
	}

	.home__aux,
	.home__header {
		flex: none;
	}

	.home__header {
		padding: var(--gl-space-4);
		border-top: var(--gl-border-width) solid var(--vscode-sideBarSectionHeader-border);
		border-bottom: var(--gl-border-width) solid var(--vscode-sideBarSectionHeader-border);
	}

	.home__aux:has(gl-promo-banner:has(gl-promo:not([has-promo])):only-child) {
		display: none;
	}

	summary {
		font-size: var(--gl-font-base);
		font-weight: normal;
		color: var(--vscode-foreground);
		text-transform: uppercase;
		cursor: pointer;
	}

	details[open] summary {
		margin-block-end: var(--gl-space-8);
	}

	gl-home-header {
		margin: 0;
	}

	gl-repo-alerts:not([has-alerts]) {
		display: none;
	}
`;F`
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

	.button-container--trio > gl-button:first-child {
		margin-bottom: var(--gl-space-4);
	}

	.button-group {
		display: inline-flex;
		gap: var(--gl-space-4);
	}

	.button-group--single {
		width: 100%;
		max-width: 30rem;
	}

	.button-group gl-button {
		margin-top: 0;
	}

	.button-group gl-button:not(:first-child) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.button-group gl-button:not(:last-child) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
`;let o7=F`
	.alert {
		position: relative;
		padding: var(--gl-space-8) var(--gl-space-12);
		margin-bottom: var(--gl-space-12);
		line-height: 1.2;
		color: var(--color-alert-foreground);
		background-color: var(--color-alert-neutralBackground);
		border-left: 0.3rem solid var(--color-alert-neutralBorder);
	}

	.alert__title {
		margin: 0;
		font-size: var(--gl-font-lg);
	}

	.alert__description {
		margin: var(--gl-space-4) 0 0;
		font-size: var(--gl-font-md);
	}

	.alert__description > :first-child {
		margin-top: 0;
	}

	.alert__description > :last-child {
		margin-bottom: 0;
	}

	.alert__close {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		color: inherit;
		opacity: 0.64;
	}

	.alert__close:hover {
		color: inherit;
		opacity: 1;
	}

	.alert.is-collapsed {
		cursor: pointer;
	}

	.alert.is-collapsed:hover {
		background-color: var(--color-alert-neutralHoverBackground);
	}

	.alert.is-collapsed .alert__description,
	.alert.is-collapsed .alert__close gl-tooltip:first-child,
	.alert:not(.is-collapsed) .alert__close gl-tooltip:last-child {
		display: none;
	}

	.alert--info {
		--color-alert-foreground: var(--color-alert-infoForeground);

		background-color: var(--color-alert-infoBackground);
		border-left-color: var(--color-alert-infoBorder);
	}

	.alert--warning {
		--color-alert-foreground: var(--color-alert-warningForeground);

		background-color: var(--color-alert-warningBackground);
		border-left-color: var(--color-alert-warningBorder);
	}

	.alert--danger {
		--color-alert-foreground: var(--color-alert-errorForeground);

		background-color: var(--color-alert-errorBackground);
		border-left-color: var(--color-alert-errorBorder);
	}

	.alert a:not(:hover) {
		color: color-mix(in srgb, var(--color-alert-foreground) 50%, var(--vscode-textLink-foreground));
	}

	.alert a:hover {
		color: color-mix(in srgb, var(--color-alert-foreground) 50%, var(--vscode-textLink-activeForeground));
	}
`,o9=F`
	a,
	a:hover,
	a:focus,
	a:active {
		text-decoration: none;
	}

	.walkthrough-progress {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-2);
		align-items: stretch;
		padding: var(--gl-space-2) var(--gl-space-4) var(--gl-space-4);
		margin-top: var(--gl-space-4);
		cursor: pointer;
		border-radius: var(--gl-radius-sm);
	}

	.walkthrough-progress:focus-within,
	.walkthrough-progress:hover {
		background-color: var(--gl-walkthrough-hover-background);
	}

	.walkthrough-progress__title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--color-foreground--85);
	}

	.walkthrough-progress__button {
		--button-padding: 1px 2px 0px 2px;

		position: absolute;
		right: 0.4rem;
	}

	.walkthrough-progress__bar::-webkit-progress-bar {
		background: var(--color-alert-neutralBackground);
		border-radius: var(--gl-radius-xs);
	}

	.walkthrough-progress__bar::-webkit-progress-value {
		background: var(--vscode-progressBar-background, blue);
		border-radius: var(--gl-radius-xs);
		transition: var(--gl-duration-x-fast) var(--gl-ease-in);
	}

	.walkthrough-progress__bar {
		z-index: 2;
		flex-shrink: 0;
		width: 100%;
		height: 4px;
		pointer-events: none;
		background: unset;
		border-radius: var(--gl-radius-xs);
	}
`,ie={recent:{threshold:"OneWeek"},stale:{threshold:"OneYear",show:!1,limit:9}};function it(t,r,o){return t?r(t):o?.(t)}Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]),Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let ir="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",io=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${ir}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${ir}`,graph:`https://gitkraken.com/solutions/commit-graph?${ir}`,launchpad:`https://gitkraken.com/solutions/launchpad?${ir}`,platform:`https://gitkraken.com/devex?${ir}`,pricing:`https://gitkraken.com/gitlens/pricing?${ir}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${ir}`,security:`https://help.gitkraken.com/gitlens/security?${ir}`,workspaces:`https://gitkraken.com/solutions/workspaces?${ir}`,kepler:`https://www.gitkraken.com/kepler?${ir}`,cli:`https://gitkraken.com/cli?${ir}`,browserExtension:`https://gitkraken.com/browser-extension?${ir}`,desktop:`https://gitkraken.com/git-client?${ir}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${ir}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${ir}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${ir}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${ir}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${ir}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${ir}`,helpCenterAiHooks:`https://help.gitkraken.com/cli/cli-home/?${ir}#how-to-uninstall-gitkraken-cli-ai-hooks`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${ir}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${ir}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${ir}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${ir}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${ir}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${ir}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${ir}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${ir}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${ir}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${ir}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${ir}`});var ii=((f=ii||{})[f.VerificationRequired=-1]="VerificationRequired",f[f.Community=0]="Community",f[f.DeprecatedPreview=1]="DeprecatedPreview",f[f.DeprecatedPreviewExpired=2]="DeprecatedPreviewExpired",f[f.Trial=3]="Trial",f[f.TrialExpired=4]="TrialExpired",f[f.TrialReactivationEligible=5]="TrialReactivationEligible",f[f.Paid=6]="Paid",f);let ia=["community","community-with-account","student","pro","advanced","teams","enterprise"],is=["student","pro","advanced","teams","enterprise"];function il(t){switch(t){case"student":return"Student";case"pro":return"Pro";case"advanced":return"Advanced";case"teams":return"Business";case"enterprise":return"Enterprise";default:return"Community"}}function ic(t){return null!=t?ia.indexOf(t):-1}function id(t){return`GitLens ${il(t)}`}function ih(t,r){var o;return o=t.plan.effective.expiresOn,null!=o?function(t,r,o,i){let n=("number"==typeof r?r:r.getTime())-("number"==typeof t?t:t.getTime()),a=i??Math.floor;switch(o){case"days":return a(n/864e5);case"hours":return a(n/36e5);case"minutes":return a(n/6e4);case"seconds":return a(n/1e3);default:return n}}(Date.now(),new Date(o),r,Math.round):void 0}function ip(t){var r;return r=t.plan.actual.id,is.includes(r)}function iu(t){return null!=t.state?t.state===ii.Trial:t.plan.actual.id!==t.plan.effective.id}function ig(t){return null!=t&&(t===ii.Trial||t===ii.Paid)}function ib(t,r){return null==r?`command:${t}`:`command:${t}?${encodeURIComponent("string"==typeof r?r:JSON.stringify(r))}`}let im=F`
	:host {
		display: flex;
	}

	.chip {
		display: flex;
		gap: var(--gl-space-6);
		align-items: center;
		padding: var(--gl-space-2) var(--gl-space-4);
		cursor: pointer;
		border-radius: var(--gl-radius-sm);
	}

	.chip:focus-visible {
		${ou}
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-4);
		padding-bottom: var(--gl-space-4);
	}

	.header {
		display: flex;
		gap: var(--gl-space-6);
		align-items: center;
		width: 100%;
		padding-bottom: var(--gl-space-4);
	}

	.header__actions {
		display: flex;
		flex: none;
		flex-direction: row;
		gap: var(--gl-space-2);
		align-items: center;
		justify-content: center;
	}

	.header__title {
		flex: 1;
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.7;
		white-space: nowrap;
	}
`,iv=F`
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
`,iy=F`
	hr {
		border: none;
		border-top: var(--gl-border-width) solid var(--color-foreground--25);
	}
`,iw=F`
	border: var(--gl-border-width) solid var(--gl-elevation-border-color, var(--vscode-contrastBorder));
	box-shadow: var(--gl-elevation);
`;let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(t){if(super(t),this.it=eP,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===eP||null==t)return this._t=void 0,this.it=t;if(t===eS)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let i_=tz(unsafe_html_e);function ik(t){return t?.includes(`
`)?i_(t.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):t}var i$=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},ix=F`
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
`,iC=Object.defineProperty,iS=Object.getOwnPropertyDescriptor,iP=t=>{throw TypeError(t)},iA=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?iS(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&iC(r,o,a),a},iO=(t,r,o)=>r.has(t)||iP("Cannot "+o),iR=F`
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
`,iI=/;\s+$/;function iE(t){let{property:r,value:o,element:i}=t;if(o){let t=i.getAttribute("style")||"";t&&(t.match(iI)||(t+=";"),t+=" ");let n=`${r}: ${o}`;if(t.includes(n))return;return`${t}${n};`}return null}var iT=class extends lit_element_i{constructor(){let t;super(),(t=x).has(this)?iP("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(this):t.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,r)=>{if(this.internals?.states)try{r?this.internals.states.add(t):this.internals.states.delete(t)}catch(t){if(String(t).includes("must start with '--'"));else throw t}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{}for(let[t,r]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===r.default&&void 0!==r.initial&&"string"==typeof t&&this.customStates.set(`initial-${t}-${r.initial}`,!0)}static get styles(){return[iR,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))})}attributeChangedCallback(t,r,o){let i,n;if(iO(this,i=x,"read from private field"),n?!n.call(this):!i.get(this)){let t,r;this.constructor.elementProperties.forEach((t,r)=>{t.reflect&&null!=this[r]&&this.initialReflectedProperties.set(r,this[r])}),iO(this,t=x,"write to private field"),r?r.call(this,!0):t.set(this,!0)}super.attributeChangedCallback(t,r,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((r,o)=>{t.has(o)&&null==this[o]&&(this[o]=r)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(t){if(this.didSSR&&!this.hasUpdated){let r=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});r.error=t,this.dispatchEvent(r)}throw t}}setStyle(t,r){if(!this.style){let o=iE({property:t.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`),value:r,element:this});o&&this.setAttribute("style",o);return}this.style[t]=r}setStyleProperty(t,r){if(!this.style){let o=iE({property:t,value:r,element:this});o&&this.setAttribute("style",o);return}this.style.setProperty(t,r)}relayNativeEvent(t,r){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...r}))}};x=new WeakMap,iA([eD()],iT.prototype,"dir",2),iA([eD()],iT.prototype,"lang",2),iA([eD({type:Boolean,reflect:!0,attribute:"did-ssr"})],iT.prototype,"didSSR",2);let iB=new Set,iz=new Map,iL="ltr",iM="en",iD="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(iD){let t=new MutationObserver(ij);iL=document.documentElement.dir||"ltr",iM=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function iF(...t){t.map(t=>{let r=t.$code.toLowerCase();iz.has(r)?iz.set(r,Object.assign(Object.assign({},iz.get(r)),t)):iz.set(r,t),g||(g=t)}),ij()}function ij(){iD&&(iL=document.documentElement.dir||"ltr",iM=document.documentElement.lang||navigator.language),[...iB.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){iB.add(this.host)}hostDisconnected(){iB.delete(this.host)}dir(){return`${this.host.dir||iL}`.toLowerCase()}lang(){return`${this.host.lang||iM}`.toLowerCase()}getTranslationData(t){var r,o;let i;try{i=new Intl.Locale(t.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let n=i.language.toLowerCase(),a=null!=(o=null==(r=i.region)?void 0:r.toLowerCase())?o:"",c=iz.get(`${n}-${a}`),h=iz.get(n);return{locale:i,language:n,region:a,primary:c,secondary:h}}exists(t,r){var o;let{primary:i,secondary:n}=this.getTranslationData(null!=(o=r.lang)?o:this.lang());return r=Object.assign({includeFallback:!1},r),!!i&&!!i[t]||!!n&&!!n[t]||!!r.includeFallback&&!!g&&!!g[t]}term(t,...r){let o,{primary:i,secondary:n}=this.getTranslationData(this.lang());if(i&&i[t])o=i[t];else if(n&&n[t])o=n[t];else{if(!g||!g[t])return String(t);o=g[t]}return"function"==typeof o?o(...r):o}date(t,r){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),r).format(t)}number(t,r){return isNaN(t=Number(t))?"":new Intl.NumberFormat(this.lang(),r).format(t)}relativeTime(t,r,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,r)}};var iN={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",captions:"Captions",chooseDate:"Choose date",chooseDecade:"Choose decade",chooseMonth:"Choose month",chooseYear:"Choose year",clearEntry:"Clear entry",close:"Close",closeCalendar:"Close calendar",createOption:t=>`Create "${t}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",date:"Date",datePickerKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",day:"Day",incompleteDate:"Enter a valid date.",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",empty:"Empty",endDate:"End date",error:"Error",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",goToSlide:(t,r)=>`Go to slide ${t} of ${r}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",month:"Month",moreOptions:"More Options",mute:"Mute",nextDecade:"Next decade",nextMonth:"Next month",nextSlide:"Next slide",nextVideo:"Next Video",nextYear:"Next year",numCharacters:t=>1===t?"1 character":`${t} characters`,numCharactersRemaining:t=>1===t?"1 character remaining":`${t} characters remaining`,numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",play:"Play",playbackSpeed:"Playback speed",playlist:"Playlist",playAnimation:"Play animation",previousDecade:"Previous decade",previousMonth:"Previous month",previousSlide:"Previous slide",previousVideo:"Previous video",previousYear:"Previous year",progress:"Progress",rangeTooLong:t=>1===t?"Select a range no longer than 1 day":`Select a range no longer than ${t} days`,rangeTooShort:t=>1===t?"Select a range at least 1 day long":`Select a range at least ${t} days long`,readonly:"Read-only",selected:"Selected",selectedDateLabel:t=>`Selected: ${t}`,selectedRangeLabel:t=>`Selected range: ${t}`,selectionCleared:"Selection cleared",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,startDate:"Start date",today:"Today",toggleColorFormat:"Toggle color format",seek:"Seek",seekProgress:(t,r)=>`${t} of ${r}`,currentlyPlaying:"currently playing",unmute:"Unmute",videoPlayer:"Video player",volume:"Volume",year:"Year",zoomIn:"Zoom in",zoomOut:"Zoom out",am:"AM",chooseTime:"Choose time",closeTimeInput:"Close time picker",dayPeriod:"AM/PM",hour:"Hour",minute:"Minute",now:"Now",pm:"PM",second:"Second",time:"Time",timeInputKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the time picker."};iF(iN);var iW=class extends LocalizeController{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||"en":super.lang()}};iF(iN);let iU=Math.min,iq=Math.max,iH=Math.round,iG=Math.floor,iK=t=>({x:t,y:t}),iV={left:"right",right:"left",bottom:"top",top:"bottom"};function iY(t,r){return"function"==typeof t?t(r):t}function iJ(t){return t.split("-")[0]}function iX(t){return t.split("-")[1]}function iZ(t){return"x"===t?"y":"x"}function iQ(t){return"y"===t?"height":"width"}function i0(t){let r=t[0];return"t"===r||"b"===r?"y":"x"}function i1(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}let i2=["left","right"],i5=["right","left"],i4=["top","bottom"],i6=["bottom","top"];function i3(t){let r=iJ(t);return iV[r]+t.slice(r.length)}function i8(t){return"number"!=typeof t?{top:0,right:0,bottom:0,left:0,...t}:{top:t,right:t,bottom:t,left:t}}function i7(t){let{x:r,y:o,width:i,height:n}=t;return{width:i,height:n,top:o,left:r,right:r+i,bottom:o+n,x:r,y:o}}function i9(t,r,o){let i,{reference:n,floating:a}=t,c=i0(r),h=iZ(i0(r)),p=iQ(h),u=iJ(r),g="y"===c,b=n.x+n.width/2-a.width/2,m=n.y+n.height/2-a.height/2,f=n[p]/2-a[p]/2;switch(u){case"top":i={x:b,y:n.y-a.height};break;case"bottom":i={x:b,y:n.y+n.height};break;case"right":i={x:n.x+n.width,y:m};break;case"left":i={x:n.x-a.width,y:m};break;default:i={x:n.x,y:n.y}}switch(iX(r)){case"start":i[h]-=f*(o&&g?-1:1);break;case"end":i[h]+=f*(o&&g?-1:1)}return i}async function ne(t,r){var o;void 0===r&&(r={});let{x:i,y:n,platform:a,rects:c,elements:h,strategy:p}=t,{boundary:u="clippingAncestors",rootBoundary:g="viewport",elementContext:b="floating",altBoundary:m=!1,padding:f=0}=iY(r,t),v=i8(f),w=h[m?"floating"===b?"reference":"floating":b],_=i7(await a.getClippingRect({element:null==(o=await (null==a.isElement?void 0:a.isElement(w)))||o?w:w.contextElement||await (null==a.getDocumentElement?void 0:a.getDocumentElement(h.floating)),boundary:u,rootBoundary:g,strategy:p})),$="floating"===b?{x:i,y:n,width:c.floating.width,height:c.floating.height}:c.reference,x=await (null==a.getOffsetParent?void 0:a.getOffsetParent(h.floating)),C=await (null==a.isElement?void 0:a.isElement(x))&&await (null==a.getScale?void 0:a.getScale(x))||{x:1,y:1},S=i7(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:h,rect:$,offsetParent:x,strategy:p}):$);return{top:(_.top-S.top+v.top)/C.y,bottom:(S.bottom-_.bottom+v.bottom)/C.y,left:(_.left-S.left+v.left)/C.x,right:(S.right-_.right+v.right)/C.x}}let nt=async(t,r,o)=>{let{placement:i="bottom",strategy:n="absolute",middleware:a=[],platform:c}=o,h=c.detectOverflow?c:{...c,detectOverflow:ne},p=await (null==c.isRTL?void 0:c.isRTL(r)),u=await c.getElementRects({reference:t,floating:r,strategy:n}),{x:g,y:b}=i9(u,i,p),m=i,f=0,v={};for(let o=0;o<a.length;o++){let w=a[o];if(!w)continue;let{name:_,fn:$}=w,{x:x,y:C,data:S,reset:P}=await $({x:g,y:b,initialPlacement:i,placement:m,strategy:n,middlewareData:v,rects:u,platform:h,elements:{reference:t,floating:r}});g=null!=x?x:g,b=null!=C?C:b,v[_]={...v[_],...S},P&&f<50&&(f++,"object"==typeof P&&(P.placement&&(m=P.placement),P.rects&&(u=!0===P.rects?await c.getElementRects({reference:t,floating:r,strategy:n}):P.rects),{x:g,y:b}=i9(u,m,p)),o=-1)}return{x:g,y:b,placement:m,strategy:n,middlewareData:v}},nr=new Set(["left","top"]);async function no(t,r){let{placement:o,platform:i,elements:n}=t,a=await (null==i.isRTL?void 0:i.isRTL(n.floating)),c=iJ(o),h=iX(o),p="y"===i0(o),u=nr.has(c)?-1:1,g=a&&p?-1:1,b=iY(r,t),{mainAxis:m,crossAxis:f,alignmentAxis:v}="number"==typeof b?{mainAxis:b,crossAxis:0,alignmentAxis:null}:{mainAxis:b.mainAxis||0,crossAxis:b.crossAxis||0,alignmentAxis:b.alignmentAxis};return h&&"number"==typeof v&&(f="end"===h?-1*v:v),p?{x:f*g,y:m*u}:{x:m*u,y:f*g}}function ni(){return"u">typeof window}function nn(t){return nl(t)?(t.nodeName||"").toLowerCase():"#document"}function na(t){var r;return(null==t||null==(r=t.ownerDocument)?void 0:r.defaultView)||window}function ns(t){var r;return null==(r=(nl(t)?t.ownerDocument:t.document)||window.document)?void 0:r.documentElement}function nl(t){return!!ni()&&(t instanceof Node||t instanceof na(t).Node)}function nc(t){return!!ni()&&(t instanceof Element||t instanceof na(t).Element)}function nd(t){return!!ni()&&(t instanceof HTMLElement||t instanceof na(t).HTMLElement)}function nh(t){return!(!ni()||"u"<typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof na(t).ShadowRoot)}function np(t){let{overflow:r,overflowX:o,overflowY:i,display:n}=nw(t);return/auto|scroll|overlay|hidden|clip/.test(r+i+o)&&"inline"!==n&&"contents"!==n}function nu(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}let ng=/transform|translate|scale|rotate|perspective|filter/,nb=/paint|layout|strict|content/,nm=t=>!!t&&"none"!==t;function nf(t){let r=nc(t)?nw(t):t;return nm(r.transform)||nm(r.translate)||nm(r.scale)||nm(r.rotate)||nm(r.perspective)||!nv()&&(nm(r.backdropFilter)||nm(r.filter))||ng.test(r.willChange||"")||nb.test(r.contain||"")}function nv(){return null==b&&(b="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),b}function ny(t){return/^(html|body|#document)$/.test(nn(t))}function nw(t){return na(t).getComputedStyle(t)}function n_(t){return nc(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function nk(t){if("html"===nn(t))return t;let r=t.assignedSlot||t.parentNode||nh(t)&&t.host||ns(t);return nh(r)?r.host:r}function n$(t,r,o){var i;void 0===r&&(r=[]),void 0===o&&(o=!0);let n=function t(r){let o=nk(r);return ny(o)?r.ownerDocument?r.ownerDocument.body:r.body:nd(o)&&np(o)?o:t(o)}(t),a=n===(null==(i=t.ownerDocument)?void 0:i.body),c=na(n);if(!a)return r.concat(n,n$(n,[],o));{let t=nx(c);return r.concat(c,c.visualViewport||[],np(n)?n:[],t&&o?n$(t):[])}}function nx(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function nC(t){let r=nw(t),o=parseFloat(r.width)||0,i=parseFloat(r.height)||0,n=nd(t),a=n?t.offsetWidth:o,c=n?t.offsetHeight:i,h=iH(o)!==a||iH(i)!==c;return h&&(o=a,i=c),{width:o,height:i,$:h}}function nS(t){return nc(t)?t:t.contextElement}function nP(t){let r=nS(t);if(!nd(r))return iK(1);let o=r.getBoundingClientRect(),{width:i,height:n,$:a}=nC(r),c=(a?iH(o.width):o.width)/i,h=(a?iH(o.height):o.height)/n;return c&&Number.isFinite(c)||(c=1),h&&Number.isFinite(h)||(h=1),{x:c,y:h}}let nA=iK(0);function nO(t){let r=na(t);return nv()&&r.visualViewport?{x:r.visualViewport.offsetLeft,y:r.visualViewport.offsetTop}:nA}function nR(t,r,o,i){var n;void 0===r&&(r=!1),void 0===o&&(o=!1);let a=t.getBoundingClientRect(),c=nS(t),h=iK(1);r&&(i?nc(i)&&(h=nP(i)):h=nP(t));let p=(void 0===(n=o)&&(n=!1),i&&(!n||i===na(c))&&n)?nO(c):iK(0),u=(a.left+p.x)/h.x,g=(a.top+p.y)/h.y,b=a.width/h.x,m=a.height/h.y;if(c){let t=na(c),r=i&&nc(i)?na(i):i,o=t,n=nx(o);for(;n&&i&&r!==o;){let t=nP(n),r=n.getBoundingClientRect(),i=nw(n),a=r.left+(n.clientLeft+parseFloat(i.paddingLeft))*t.x,c=r.top+(n.clientTop+parseFloat(i.paddingTop))*t.y;u*=t.x,g*=t.y,b*=t.x,m*=t.y,u+=a,g+=c,n=nx(o=na(n))}}return i7({width:b,height:m,x:u,y:g})}function nI(t,r){let o=n_(t).scrollLeft;return r?r.left+o:nR(ns(t)).left+o}function nE(t,r){let o=t.getBoundingClientRect();return{x:o.left+r.scrollLeft-nI(t,o),y:o.top+r.scrollTop}}function nT(t,r,o){var i;let n;if("viewport"===r)n=function(t,r){let o=na(t),i=ns(t),n=o.visualViewport,a=i.clientWidth,c=i.clientHeight,h=0,p=0;if(n){a=n.width,c=n.height;let t=nv();(!t||t&&"fixed"===r)&&(h=n.offsetLeft,p=n.offsetTop)}let u=nI(i);if(u<=0){let t=i.ownerDocument,r=t.body,o=getComputedStyle(r),n="CSS1Compat"===t.compatMode&&parseFloat(o.marginLeft)+parseFloat(o.marginRight)||0,c=Math.abs(i.clientWidth-r.clientWidth-n);c<=25&&(a-=c)}else u<=25&&(a+=u);return{width:a,height:c,x:h,y:p}}(t,o);else if("document"===r){let r,o,a,c,h,p,u;i=ns(t),r=ns(i),o=n_(i),a=i.ownerDocument.body,c=iq(r.scrollWidth,r.clientWidth,a.scrollWidth,a.clientWidth),h=iq(r.scrollHeight,r.clientHeight,a.scrollHeight,a.clientHeight),p=-o.scrollLeft+nI(i),u=-o.scrollTop,"rtl"===nw(a).direction&&(p+=iq(r.clientWidth,a.clientWidth)-c),n={width:c,height:h,x:p,y:u}}else if(nc(r)){let t,i,a,c,h,p;i=(t=nR(r,!0,"fixed"===o)).top+r.clientTop,a=t.left+r.clientLeft,c=nd(r)?nP(r):iK(1),h=r.clientWidth*c.x,p=r.clientHeight*c.y,n={width:h,height:p,x:a*c.x,y:i*c.y}}else{let o=nO(t);n={x:r.x-o.x,y:r.y-o.y,width:r.width,height:r.height}}return i7(n)}function nB(t){return"static"===nw(t).position}function nz(t,r){if(!nd(t)||"fixed"===nw(t).position)return null;if(r)return r(t);let o=t.offsetParent;return ns(t)===o&&(o=o.ownerDocument.body),o}function nL(t,r){var o;let i=na(t);if(nu(t))return i;if(!nd(t)){let r=nk(t);for(;r&&!ny(r);){if(nc(r)&&!nB(r))return r;r=nk(r)}return i}let n=nz(t,r);for(;n&&(o=n,/^(table|td|th)$/.test(nn(o)))&&nB(n);)n=nz(n,r);return n&&ny(n)&&nB(n)&&!nf(n)?i:n||function(t){let r=nk(t);for(;nd(r)&&!ny(r);){if(nf(r))return r;if(nu(r))break;r=nk(r)}return null}(t)||i}let nM=async function(t){let r=this.getOffsetParent||nL,o=this.getDimensions,i=await o(t.floating);return{reference:function(t,r,o){let i=nd(r),n=ns(r),a="fixed"===o,c=nR(t,!0,a,r),h={scrollLeft:0,scrollTop:0},p=iK(0);if(i||!i&&!a)if(("body"!==nn(r)||np(n))&&(h=n_(r)),i){let t=nR(r,!0,a,r);p.x=t.x+r.clientLeft,p.y=t.y+r.clientTop}else n&&(p.x=nI(n));a&&!i&&n&&(p.x=nI(n));let u=!n||i||a?iK(0):nE(n,h);return{x:c.left+h.scrollLeft-p.x-u.x,y:c.top+h.scrollTop-p.y-u.y,width:c.width,height:c.height}}(t.reference,await r(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}},nD={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:r,rect:o,offsetParent:i,strategy:n}=t,a="fixed"===n,c=ns(i),h=!!r&&nu(r.floating);if(i===c||h&&a)return o;let p={scrollLeft:0,scrollTop:0},u=iK(1),g=iK(0),b=nd(i);if((b||!b&&!a)&&(("body"!==nn(i)||np(c))&&(p=n_(i)),b)){let t=nR(i);u=nP(i),g.x=t.x+i.clientLeft,g.y=t.y+i.clientTop}let m=!c||b||a?iK(0):nE(c,p);return{width:o.width*u.x,height:o.height*u.y,x:o.x*u.x-p.scrollLeft*u.x+g.x+m.x,y:o.y*u.y-p.scrollTop*u.y+g.y+m.y}},getDocumentElement:ns,getClippingRect:function(t){let{element:r,boundary:o,rootBoundary:i,strategy:n}=t,a=[..."clippingAncestors"===o?nu(r)?[]:function(t,r){let o=r.get(t);if(o)return o;let i=n$(t,[],!1).filter(t=>nc(t)&&"body"!==nn(t)),n=null,a="fixed"===nw(t).position,c=a?nk(t):t;for(;nc(c)&&!ny(c);){let r=nw(c),o=nf(c);o||"fixed"!==r.position||(n=null),(a?o||n:!(!o&&"static"===r.position&&n&&("absolute"===n.position||"fixed"===n.position)||np(c)&&!o&&function t(r,o){let i=nk(r);return!(i===o||!nc(i)||ny(i))&&("fixed"===nw(i).position||t(i,o))}(t,c)))?n=r:i=i.filter(t=>t!==c),c=nk(c)}return r.set(t,i),i}(r,this._c):[].concat(o),i],c=nT(r,a[0],n),h=c.top,p=c.right,u=c.bottom,g=c.left;for(let t=1;t<a.length;t++){let o=nT(r,a[t],n);h=iq(o.top,h),p=iU(o.right,p),u=iU(o.bottom,u),g=iq(o.left,g)}return{width:p-g,height:u-h,x:g,y:h}},getOffsetParent:nL,getElementRects:nM,getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){let{width:r,height:o}=nC(t);return{width:r,height:o}},getScale:nP,isElement:nc,isRTL:function(t){return"rtl"===nw(t).direction}};function nF(t,r){return t.x===r.x&&t.y===r.y&&t.width===r.width&&t.height===r.height}let nj=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(r){var o,i;let n,a,{placement:c,rects:h,platform:p,elements:u}=r,{apply:g=()=>{},...b}=iY(t,r),m=await p.detectOverflow(r,b),f=iJ(c),v=iX(c),w="y"===i0(c),{width:_,height:$}=h.floating;"top"===f||"bottom"===f?(n=f,a=v===(await (null==p.isRTL?void 0:p.isRTL(u.floating))?"start":"end")?"left":"right"):(a=f,n="end"===v?"top":"bottom");let x=$-m.top-m.bottom,C=_-m.left-m.right,S=iU($-m[n],x),P=iU(_-m[a],C),A=!r.middlewareData.shift,O=S,E=P;if(null!=(o=r.middlewareData.shift)&&o.enabled.x&&(E=C),null!=(i=r.middlewareData.shift)&&i.enabled.y&&(O=x),A&&!v){let t=iq(m.left,0),r=iq(m.right,0),o=iq(m.top,0),i=iq(m.bottom,0);w?E=_-2*(0!==t||0!==r?t+r:iq(m.left,m.right)):O=$-2*(0!==o||0!==i?o+i:iq(m.top,m.bottom))}await g({...r,availableWidth:E,availableHeight:O});let T=await p.getDimensions(u.floating);return _!==T.width||$!==T.height?{reset:{rects:!0}}:{}}}};function nN(t){var r=t;for(let t=r;t;t=nW(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=nW(r);t;t=nW(t)){if(!(t instanceof Element))continue;let r=getComputedStyle(t);if("contents"!==r.display&&("static"!==r.position||nf(r)||"BODY"===t.tagName))return t}return null}function nW(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}let nU=tz(class extends directive_i{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(r=>t[r]).join(" ")+" "}update(t,[r]){if(void 0===this.st){for(let o in this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t))),r)r[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(r)}let o=t.element.classList;for(let t of this.st)t in r||(o.remove(t),this.st.delete(t));for(let t in r){let i=!!r[t];i===this.st.has(t)||this.nt?.has(t)||(i?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return eS}});function nq(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}var nH=!!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),nG=class extends iT{constructor(){super(...arguments),this.localize=new iW(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let t=this.anchorEl.getBoundingClientRect(),r=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),i=0,n=0,a=0,c=0,h=0,p=0,u=0,g=0;o?t.top<r.top?(i=t.left,n=t.bottom,a=t.right,c=t.bottom,h=r.left,p=r.top,u=r.right,g=r.top):(i=r.left,n=r.bottom,a=r.right,c=r.bottom,h=t.left,p=t.top,u=t.right,g=t.top):t.left<r.left?(i=t.right,n=t.top,a=r.left,c=r.top,h=t.right,p=t.bottom,u=r.left,g=r.bottom):(i=r.right,n=r.top,a=t.left,c=t.top,h=r.right,p=r.bottom,u=t.left,g=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${n}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${g}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=nH,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||nq(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=function(t,r,o,i){let n;void 0===i&&(i={});let{ancestorScroll:a=!0,ancestorResize:c=!0,elementResize:h="function"==typeof ResizeObserver,layoutShift:p="function"==typeof IntersectionObserver,animationFrame:u=!1}=i,g=nS(t),b=a||c?[...g?n$(g):[],...r?n$(r):[]]:[];b.forEach(t=>{a&&t.addEventListener("scroll",o,{passive:!0}),c&&t.addEventListener("resize",o)});let m=g&&p?function(t,r){let o,i=null,n=ns(t);function a(){var t;clearTimeout(o),null==(t=i)||t.disconnect(),i=null}return!function c(h,p){void 0===h&&(h=!1),void 0===p&&(p=1),a();let u=t.getBoundingClientRect(),{left:g,top:b,width:m,height:f}=u;if(h||r(),!m||!f)return;let v={rootMargin:-iG(b)+"px "+-iG(n.clientWidth-(g+m))+"px "+-iG(n.clientHeight-(b+f))+"px "+-iG(g)+"px",threshold:iq(0,iU(1,p))||1},w=!0;function _(r){let i=r[0].intersectionRatio;if(i!==p){if(!w)return c();i?c(!1,i):o=setTimeout(()=>{c(!1,1e-7)},1e3)}1!==i||nF(u,t.getBoundingClientRect())||c(),w=!1}try{i=new IntersectionObserver(_,{...v,root:n.ownerDocument})}catch{i=new IntersectionObserver(_,v)}i.observe(t)}(!0),a}(g,o):null,f=-1,v=null;h&&(v=new ResizeObserver(t=>{let[i]=t;i&&i.target===g&&v&&r&&(v.unobserve(r),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var t;null==(t=v)||t.observe(r)})),o()}),g&&!u&&v.observe(g),r&&v.observe(r));let w=u?nR(t):null;return u&&function r(){let i=nR(t);w&&!nF(w,i)&&o(),w=i,n=requestAnimationFrame(r)}(),o(),()=>{var t;b.forEach(t=>{a&&t.removeEventListener("scroll",o),c&&t.removeEventListener("resize",o)}),null==m||m(),null==(t=v)||t.disconnect(),v=null,u&&cancelAnimationFrame(n)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){var t,r,o,i,n,a;let c,h,p,u,g;if(!this.active||!this.anchorEl||!this.popup)return;let b=[{name:"offset",options:t={mainAxis:this.distance,crossAxis:this.skidding},async fn(r){var o,i;let{x:n,y:a,placement:c,middlewareData:h}=r,p=await no(r,t);return c===(null==(o=h.offset)?void 0:o.placement)&&null!=(i=h.arrow)&&i.alignmentOffset?{}:{x:n+p.x,y:a+p.y,data:{...p,placement:c}}}}];this.sync?b.push(nj({apply:({rects:t})=>{let r="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=r?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.SUPPORTS_POPOVER&&!nq(this.anchor)&&"scroll"===this.boundary&&(c=n$(this.anchorEl).filter(t=>t instanceof Element)),this.flip&&b.push({name:"flip",options:r={boundary:this.flipBoundary||c,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(t){var o,i,n,a,c,h,p,u;let g,b,m,{placement:f,middlewareData:v,rects:w,initialPlacement:_,platform:$,elements:x}=t,{mainAxis:C=!0,crossAxis:S=!0,fallbackPlacements:P,fallbackStrategy:A="bestFit",fallbackAxisSideDirection:O="none",flipAlignment:E=!0,...T}=iY(r,t);if(null!=(o=v.arrow)&&o.alignmentOffset)return{};let B=iJ(f),M=i0(_),D=iJ(_)===_,F=await (null==$.isRTL?void 0:$.isRTL(x.floating)),j=P||(D||!E?[i3(_)]:(g=i3(_),[i1(_),g,i1(g)])),N="none"!==O;!P&&N&&j.push(...(b=iX(_),m=function(t,r,o){switch(t){case"top":case"bottom":if(o)return r?i5:i2;return r?i2:i5;case"left":case"right":return r?i4:i6;default:return[]}}(iJ(_),"start"===O,F),b&&(m=m.map(t=>t+"-"+b),E&&(m=m.concat(m.map(i1)))),m));let W=[_,...j],U=await $.detectOverflow(t,T),q=[],G=(null==(i=v.flip)?void 0:i.overflows)||[];if(C&&q.push(U[B]),S){let t,r,o,i,n=(h=f,p=w,void 0===(u=F)&&(u=!1),t=iX(h),o=iQ(r=iZ(i0(h))),i="x"===r?t===(u?"end":"start")?"right":"left":"start"===t?"bottom":"top",p.reference[o]>p.floating[o]&&(i=i3(i)),[i,i3(i)]);q.push(U[n[0]],U[n[1]])}if(G=[...G,{placement:f,overflows:q}],!q.every(t=>t<=0)){let t=((null==(n=v.flip)?void 0:n.index)||0)+1,r=W[t];if(r&&("alignment"!==S||M===i0(r)||G.every(t=>i0(t.placement)!==M||t.overflows[0]>0)))return{data:{index:t,overflows:G},reset:{placement:r}};let o=null==(a=G.filter(t=>t.overflows[0]<=0).sort((t,r)=>t.overflows[1]-r.overflows[1])[0])?void 0:a.placement;if(!o)switch(A){case"bestFit":{let t=null==(c=G.filter(t=>{if(N){let r=i0(t.placement);return r===M||"y"===r}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,r)=>t+r,0)]).sort((t,r)=>t[1]-r[1])[0])?void 0:c[0];t&&(o=t);break}case"initialPlacement":o=_}if(f!==o)return{reset:{placement:o}}}return{}}}),this.shift&&b.push({name:"shift",options:o={boundary:this.shiftBoundary||c,padding:this.shiftPadding},async fn(t){let{x:r,y:i,placement:n,platform:a}=t,{mainAxis:c=!0,crossAxis:h=!1,limiter:p={fn:t=>{let{x:r,y:o}=t;return{x:r,y:o}}},...u}=iY(o,t),g={x:r,y:i},b=await a.detectOverflow(t,u),m=i0(iJ(n)),f=iZ(m),v=g[f],w=g[m];if(c){let t="y"===f?"top":"left",r="y"===f?"bottom":"right",o=v+b[t],i=v-b[r];v=iq(o,iU(v,i))}if(h){let t="y"===m?"top":"left",r="y"===m?"bottom":"right",o=w+b[t],i=w-b[r];w=iq(o,iU(w,i))}let _=p.fn({...t,[f]:v,[m]:w});return{..._,data:{x:_.x-r,y:_.y-i,enabled:{[f]:c,[m]:h}}}}}),this.autoSize?b.push(nj({boundary:this.autoSizeBoundary||c,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:r})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&b.push({name:"arrow",options:h={element:this.arrowEl,padding:this.arrowPadding},async fn(t){let{x:r,y:o,placement:i,rects:n,platform:a,elements:c,middlewareData:p}=t,{element:u,padding:g=0}=iY(h,t)||{};if(null==u)return{};let b=i8(g),m={x:r,y:o},f=iZ(i0(i)),v=iQ(f),w=await a.getDimensions(u),_="y"===f,$=_?"clientHeight":"clientWidth",x=n.reference[v]+n.reference[f]-m[f]-n.floating[v],C=m[f]-n.reference[f],S=await (null==a.getOffsetParent?void 0:a.getOffsetParent(u)),P=S?S[$]:0;P&&await (null==a.isElement?void 0:a.isElement(S))||(P=c.floating[$]||n.floating[v]);let A=P/2-w[v]/2-1,O=iU(b[_?"top":"left"],A),E=iU(b[_?"bottom":"right"],A),T=P-w[v]-E,B=P/2-w[v]/2+(x/2-C/2),M=iq(O,iU(B,T)),D=!p.arrow&&null!=iX(i)&&B!==M&&n.reference[v]/2-(B<O?O:E)-w[v]/2<0,F=D?B<O?B-O:B-T:0;return{[f]:m[f]+F,data:{[f]:M,centerOffset:B-M-F,...D&&{alignmentOffset:F}},reset:D}}});let m=this.SUPPORTS_POPOVER?t=>nD.getOffsetParent(t,nN):nD.getOffsetParent;(i=this.anchorEl,n=this.popup,a={placement:this.placement,middleware:b,strategy:this.SUPPORTS_POPOVER?"absolute":"fixed",platform:{...nD,getOffsetParent:m}},p=new Map,g={...(u={platform:nD,...a}).platform,_c:p},nt(i,n,{...u,platform:g})).then(({x:t,y:r,middlewareData:o,placement:i})=>{let n="rtl"===this.localize.dir(),a={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${t}px`,top:`${r}px`}),this.arrow){let t=o.arrow.x,r=o.arrow.y,i="",c="",h="",p="";if("start"===this.arrowPlacement){let o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";i="number"==typeof r?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",c=n?o:"",p=n?"":o}else if("end"===this.arrowPlacement){let o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";c=n?"":o,p=n?o:"",h="number"==typeof r?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(p="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",i="number"==typeof r?"calc(50% - var(--arrow-size-diagonal))":""):(p="number"==typeof t?`${t}px`:"",i="number"==typeof r?`${r}px`:"");Object.assign(this.arrowEl.style,{top:i,right:c,bottom:h,left:p,[a]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new i$)}render(){return ex`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${nU({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${nU({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?ex`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};nG.css=ix,iA([eN(".popup")],nG.prototype,"popup",2),iA([eN(".arrow")],nG.prototype,"arrowEl",2),iA([eD({attribute:!1,type:Boolean})],nG.prototype,"SUPPORTS_POPOVER",2),iA([eD()],nG.prototype,"anchor",2),iA([eD({type:Boolean,reflect:!0})],nG.prototype,"active",2),iA([eD({reflect:!0})],nG.prototype,"placement",2),iA([eD()],nG.prototype,"boundary",2),iA([eD({type:Number})],nG.prototype,"distance",2),iA([eD({type:Number})],nG.prototype,"skidding",2),iA([eD({type:Boolean})],nG.prototype,"arrow",2),iA([eD({attribute:"arrow-placement"})],nG.prototype,"arrowPlacement",2),iA([eD({attribute:"arrow-padding",type:Number})],nG.prototype,"arrowPadding",2),iA([eD({type:Boolean})],nG.prototype,"flip",2),iA([eD({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],nG.prototype,"flipFallbackPlacements",2),iA([eD({attribute:"flip-fallback-strategy"})],nG.prototype,"flipFallbackStrategy",2),iA([eD({type:Object})],nG.prototype,"flipBoundary",2),iA([eD({attribute:"flip-padding",type:Number})],nG.prototype,"flipPadding",2),iA([eD({type:Boolean})],nG.prototype,"shift",2),iA([eD({type:Object})],nG.prototype,"shiftBoundary",2),iA([eD({attribute:"shift-padding",type:Number})],nG.prototype,"shiftPadding",2),iA([eD({attribute:"auto-size"})],nG.prototype,"autoSize",2),iA([eD()],nG.prototype,"sync",2),iA([eD({type:Object})],nG.prototype,"autoSizeBoundary",2),iA([eD({attribute:"auto-size-padding",type:Number})],nG.prototype,"autoSizePadding",2),iA([eD({attribute:"hover-bridge",type:Boolean})],nG.prototype,"hoverBridge",2),nG=iA([eL("wa-popup")],nG);var nK=Object.defineProperty,nV=Object.getOwnPropertyDescriptor,nY=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?nV(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&nK(r,o,a),a};let nJ=0,nX=[],nZ=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.showDelay=500,this.hideDelay=0,this.suppressed=!1,this.open=!1,this.bodyId=`gl-tooltip-${++nJ}`,this.onAnchorSlotChange=t=>{let r=t.target.assignedElements({flatten:!0})[0];r!==this.anchorEl&&(this.detachAnchor(),this.attachAnchor(r))},this.onDocumentKeyDown=t=>{"Escape"===t.key&&this.open&&nX.at(-1)===this&&(t.preventDefault(),t.stopPropagation(),this.open=!1)},this.onMouseOver=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!0},this.showDelay))},this.onMouseOut=()=>{this.anchorEl?.matches(":hover")||this.matches(":hover")||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!1},this.hideDelay))},this.onFocusIn=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.open=!0)},this.onFocusOut=()=>{clearTimeout(this.hoverTimeout),this.open=!1},this.onMouseDown=t=>{this.suppressed=!0,this.open=!1},this.onMouseUp=t=>{this.suppressed=!1},this.onDragStart=t=>{this.suppressed=!0,this.open=!1},this.onDragEnd=t=>{this.suppressed=!1},this.onClick=t=>{this.hideOnClick&&(this.open=!1)}}connectedCallback(){super.connectedCallback?.(),this.eventController=new AbortController;let{signal:t}=this.eventController;this.addEventListener("mouseover",this.onMouseOver,{signal:t}),this.addEventListener("mouseout",this.onMouseOut,{signal:t}),this.addEventListener("focusin",this.onFocusIn,{signal:t}),this.addEventListener("focusout",this.onFocusOut,{signal:t}),this.addEventListener("mousedown",this.onMouseDown,{signal:t}),this.addEventListener("click",this.onClick,{signal:t}),window.addEventListener("mouseup",this.onMouseUp,{signal:t}),window.addEventListener("dragstart",this.onDragStart,{capture:!0,signal:t}),window.addEventListener("dragend",this.onDragEnd,{capture:!0,signal:t})}disconnectedCallback(){this.eventController?.abort(),this.eventController=void 0,this.detachAnchor(),this.unregisterDismissible(),clearTimeout(this.hoverTimeout),super.disconnectedCallback?.()}updated(t){t.has("open")&&(this.open?this.registerDismissible():this.unregisterDismissible()),t.has("disabled")&&this.disabled&&this.open&&(this.open=!1)}attachAnchor(t){null!=t&&(this.anchorEl=t,this.addAriaDescribedBy(t,this.bodyId))}detachAnchor(){null!=this.anchorEl&&(this.removeAriaDescribedBy(this.anchorEl,this.bodyId),this.anchorEl=void 0)}addAriaDescribedBy(t,r){let o=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);o.includes(r)||(o.push(r),t.setAttribute("aria-describedby",o.join(" ")))}removeAriaDescribedBy(t,r){let o=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean).filter(t=>t!==r);0===o.length?t.removeAttribute("aria-describedby"):t.setAttribute("aria-describedby",o.join(" "))}registerDismissible(){nX.includes(this)||(nX.push(this),document.addEventListener("keydown",this.onDocumentKeyDown,{signal:this.eventController?.signal}))}unregisterDismissible(){let t=nX.indexOf(this);-1!==t&&nX.splice(t,1),document.removeEventListener("keydown",this.onDocumentKeyDown)}async hide(){this.open=!1,await this.updateComplete}async show(){this.disabled||this.suppressed||(this.open=!0,await this.updateComplete)}render(){return ex`<wa-popup
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
				<slot name="content">${ik(this.content)}</slot>
			</div>
		</wa-popup>`}};nZ.styles=F`
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

			${iw}
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
	`,nY([eD()],nZ.prototype,"content",2),nY([eD({reflect:!0})],nZ.prototype,"placement",2),nY([eD({type:Boolean})],nZ.prototype,"disabled",2),nY([eD({type:Number})],nZ.prototype,"distance",2),nY([eD({type:Number,attribute:"show-delay"})],nZ.prototype,"showDelay",2),nY([eD({type:Number,attribute:"hide-delay"})],nZ.prototype,"hideDelay",2),nY([eD({type:Boolean,attribute:"hide-on-click"})],nZ.prototype,"hideOnClick",2),nY([eN("wa-popup")],nZ.prototype,"popup",2),nY([eF()],nZ.prototype,"suppressed",2),nY([eF()],nZ.prototype,"open",2),nZ=nY([eL("gl-tooltip")],nZ);var nQ=Object.defineProperty,n0=Object.getOwnPropertyDescriptor,n1=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?n0(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&nQ(r,o,a),a};let n2=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1,this.ariaLabel=null}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(t){if(t.has("href")&&this.setAttribute("role",this.href?"link":"button"),t.has("disabled")){let r=t.get("disabled");r?this.setAttribute("aria-disabled",r.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(t)}render(){return this.tooltip?ex`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??eP}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?ex`<gl-tooltip placement=${this.tooltipPlacement??eP}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?ex`<a
				class="control"
				aria-label=${this.ariaLabel??eP}
				tabindex="${(!1===this.disabled?void 0:-1)??eP}"
				href=${this.href}
				@keypress=${t=>this.onLinkKeypress(t)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:ex`<button
			class="control"
			role=${this.role??eP}
			aria-label=${this.ariaLabel??eP}
			aria-checked=${this.ariaChecked??eP}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(t){" "===t.key&&this.control.click()}focus(t){this.control.focus(t)}blur(){this.control.blur()}click(){this.control.click()}};n2.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},n2.styles=[om,F`
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
				${og}
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
		`],n1([eN(".control")],n2.prototype,"control",2),n1([eD({reflect:!0})],n2.prototype,"appearance",2),n1([eD({reflect:!0})],n2.prototype,"variant",2),n1([eD({type:Boolean,reflect:!0})],n2.prototype,"disabled",2),n1([eD({reflect:!0})],n2.prototype,"density",2),n1([eD({type:Boolean,reflect:!0})],n2.prototype,"full",2),n1([eD()],n2.prototype,"href",2),n1([eD()],n2.prototype,"tooltip",2),n1([eD()],n2.prototype,"tooltipPlacement",2),n1([eD({type:Boolean,reflect:!0})],n2.prototype,"truncate",2),n1([eD({type:String,attribute:"aria-label"})],n2.prototype,"ariaLabel",2),n2=n1([eL("gl-button")],n2);var n5=Object.defineProperty,n4=Object.getOwnPropertyDescriptor,n6=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?n4(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&n5(r,o,a),a};let n3=class extends lit_element_i{constructor(){super(...arguments),this.editor=!1,this.layout="shift",this.grouping="gap"}render(){return ex`<div class="group"><slot></slot></div>`}};n3.styles=[om,F`
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
		`],n6([eD({type:Boolean})],n3.prototype,"editor",2),n6([eD({reflect:!0})],n3.prototype,"layout",2),n6([eD({reflect:!0})],n3.prototype,"grouping",2),n3=n6([eL("button-container")],n3);let n8=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a","add-small":"\\ec7b","remove-small":"\\ec7c","worktree-small":"\\ec7d",worktree:"\\ec7e","screen-cut":"\\ec7f",ask:"\\ec80",openai:"\\ec81",claude:"\\ec82","open-in-window":"\\ec83","new-session":"\\ec84"}),n7=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147","diff-right":"\\f11b","diff-left":"\\f12e","accept-right":"\\f12f","accept-left":"\\f130","accept-all-right":"\\f131","accept-all-left":"\\f132",continue:"\\f148",skip:"\\f149",abort:"\\f14a",pause:"\\f14b","kanban-view":"\\f14c","filter-mixed":"\\f14d","start-new":"\\f14e",merge:"\\f14f"});var n9=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,at=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ae(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&n9(r,o,a),a};function ar(t,r=""){return D(Object.entries(t).map(([t,o])=>(function(t,r,o=""){return`:host([icon='${o}${t}'])::before { content: '${r}'; }`})(t,o,r)).join(""))}let ao=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(t){t.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(t)}};ao.styles=F`
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

		${ar(n8)}

		${ar(n7,"gl-")}

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
	`,at([eD({reflect:!0})],ao.prototype,"icon",2),at([eD({reflect:!0})],ao.prototype,"modifier",2),at([eD({type:Number})],ao.prototype,"size",2),at([eD({reflect:!0})],ao.prototype,"flip",2),at([eD({reflect:!0})],ao.prototype,"rotate",2),ao=at([eL("code-icon")],ao);var ai=Object.defineProperty,an=Object.getOwnPropertyDescriptor,aa=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?an(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ai(r,o,a),a};let as=["top","right","bottom","left","top-left","top-right","bottom-left","bottom-right"],al=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.autoSizeVertical=!1,this.skidding=0,this.trigger="hover focus",this.suppressed=!1,this.handleReposition=()=>{let t=this.popup?.getAttribute("data-current-placement");null!=t&&t!==this._resolvedPlacement&&(this._resolvedPlacement=t)},this.handleResizePointerDown=t=>{if(0!==t.button)return;let r=t.currentTarget,o=r.dataset.handle;if(null==o)return;t.preventDefault();let i="right"===o||"top-right"===o||"bottom-right"===o,n="left"===o||"top-left"===o||"bottom-left"===o,a="bottom"===o||"bottom-left"===o||"bottom-right"===o,c="top"===o||"top-left"===o||"top-right"===o,h=this.body,p=t.clientX,u=t.clientY,g=h.getBoundingClientRect(),b=g.width,m=g.height;r.setPointerCapture(t.pointerId),r.classList.add("popover__resizer--active"),this.toggleAttribute("dragging",!0);let f=t=>{let r=t.clientX-p,o=t.clientY-u;i?h.style.width=`${Math.max(0,b+r)}px`:n&&(h.style.width=`${Math.max(0,b-r)}px`),a?h.style.height=`${Math.max(0,m+o)}px`:c&&(h.style.height=`${Math.max(0,m-o)}px`),this.popup?.reposition()},v=()=>{this.toggleAttribute("dragging",!1),r.classList.remove("popover__resizer--active"),r.removeEventListener("pointermove",f),r.removeEventListener("lostpointercapture",v),r.removeEventListener("pointerup",v)};r.addEventListener("pointermove",f,{passive:!0}),r.addEventListener("lostpointercapture",v),r.addEventListener("pointerup",v)},this.handleTriggerBlur=t=>{this.open&&(this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&(t.relatedTarget&&this.contains(t.relatedTarget)||this.hide())},this.handleTriggerClick=t=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(t.composedPath().includes(this.body))return;this.hide()}else this._skipHideOnClick=!1,this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=t=>{let r=this.hasTrigger("focus")||this.hasTrigger("focus-visible");this.hasTrigger("click")&&r&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,!this.open||"hover"!==this._triggeredBy||this.hasTrigger("click")||t.composedPath().includes(this.body)||(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=t=>{let r=this.hasTrigger("focus"),o=this.hasTrigger("focus-visible");if(r||o){if(!r&&o){let r=t.target;if(null==r||"function"!=typeof r.matches||!r.matches(":focus-visible"))return}this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus")}},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handlePopupBlur=t=>{let r=t.composedPath();r.includes(this)||r.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=t=>{let r=t.composedPath();r.includes(this)||r.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let t=rh(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let t=rh(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),t)}}}static closeOthers(t){for(let r of al.openPopovers)r===t||function(t,r){let o=r;for(;null!=o;){if(o===t)return!0;o=o.parentNode??(o instanceof ShadowRoot?o.host:null)}return!1}(r,t)||r.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,al.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),this.updateResizeObserver()}updateResizeObserver(){null!=this.resize?null==this.resizeObserver&&null!=this.body&&(this.resizeObserver=new ResizeObserver(()=>this.popup?.reposition()),this.resizeObserver.observe(this.body)):null!=this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}render(){let t=this._resolvedPlacement??this.placement,r=(function(t){if(!t)return[];let r=new Set;for(let o of t.trim().split(/\s+/))switch(o){case"horizontal":r.add("right");break;case"vertical":r.add("bottom");break;case"both":r.add("right"),r.add("bottom"),r.add("bottom-right");break;case"all":for(let t of as)r.add(t);break;default:as.includes(o)&&r.add(o)}return[...r]})(this.resize).filter(r=>!function(t,r){let o,i;if(!r)return!1;let[n,a]=r.split("-");switch(n){case"top":o="bottom";break;case"right":o="left";break;case"bottom":o="top";break;case"left":o="right"}let c="left"===n||"right"===n;"start"===a?i=c?"top":"left":"end"===a&&(i=c?"bottom":"right");let h=r=>null!=r&&(t===r||t.startsWith(`${r}-`)||t.endsWith(`-${r}`));return h(o)||h(i)}(r,t));return ex`<wa-popup
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
				${r.map(t=>ex`<div
							class="popover__resizer popover__resizer--${t}"
							role="separator"
							aria-orientation=${"top"===t||"bottom"===t?"horizontal":"vertical"}
							aria-label="Resize"
							data-handle=${t}
							@pointerdown=${this.handleResizePointerDown}
						></div>`)}
			</div>
		</wa-popup>`}async show(t){if(this.open||this.suppressed){"click"===t&&"hover"===this._triggeredBy&&(this._triggeredBy=t);return}return(null==this._triggeredBy||"hover"!==t)&&(this._triggeredBy=t),al.closeOthers(this),this.open=!0,al.openPopovers.add(this),rp(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,al.openPopovers.delete(this),rp(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(t){return this.trigger.split(" ").includes(t)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleResizeChange(){this.updateResizeObserver()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};al.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},al.openPopovers=new Set,al.styles=[ov,F`
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

				${iw}
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
		`],aa([eN("#popover")],al.prototype,"body",2),aa([eN("wa-popup")],al.prototype,"popup",2),aa([eD({reflect:!0})],al.prototype,"placement",2),aa([eD({type:Object})],al.prototype,"anchor",2),aa([eD({reflect:!0,type:Boolean})],al.prototype,"disabled",2),aa([eD({type:Number})],al.prototype,"distance",2),aa([eD({reflect:!0,type:Boolean})],al.prototype,"open",2),aa([eD({reflect:!0,type:Boolean})],al.prototype,"arrow",2),aa([eD({reflect:!0,type:Boolean,attribute:"auto-size-vertical"})],al.prototype,"autoSizeVertical",2),aa([eD({reflect:!0})],al.prototype,"resize",2),aa([eD({type:Number})],al.prototype,"skidding",2),aa([eD()],al.prototype,"trigger",2),aa([eD({reflect:!0})],al.prototype,"appearance",2),aa([eF()],al.prototype,"suppressed",2),aa([eF()],al.prototype,"_resolvedPlacement",2),aa([t4("open",{afterFirstUpdate:!0})],al.prototype,"handleOpenChange",1),aa([t4(["distance","placement","skidding"])],al.prototype,"handleOptionsChange",1),aa([t4("resize",{afterFirstUpdate:!0})],al.prototype,"handleResizeChange",1),aa([t4("disabled")],al.prototype,"handleDisabledChange",1),al=aa([eL("gl-popover")],al);var ac=Object.defineProperty,ad=Object.getOwnPropertyDescriptor,ah=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ad(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ac(r,o,a),a};let ap=class extends tB(lit_element_i){constructor(){super(...arguments),this._showUpgrade=!1}get showUpgrade(){return this._showUpgrade}set showUpgrade(t){this._showUpgrade=t}get accountAvatar(){return this.hasAccount&&this._subscription.avatar.get()}get accountName(){return this.subscription?.account?.name??""}get accountEmail(){return this.subscription?.account?.email??""}get hasAccount(){return this.subscription?.account!=null}get isReactivatedTrial(){return this.subscriptionState===ii.Trial&&(this.subscription?.plan.effective.trialReactivationCount??0)>0}get planId(){return this._subscription.subscription.get()?.plan.actual.id??"pro"}get effectivePlanId(){return this._subscription.subscription.get()?.plan.effective.id??"pro"}get planName(){return function(t,r,o){switch(t){case ii.Community:case ii.Trial:return`${"student"===o?id("student"):id("pro")} Trial`;case ii.TrialExpired:case ii.TrialReactivationEligible:return id("community-with-account");case ii.VerificationRequired:return`${id(r??"pro")} (Unverified)`;default:return id(r??"pro")}}(this.subscriptionState??ii.Community,this.planId,this.effectivePlanId)}get planTier(){let t=this.subscription;return null!=t&&iu(t)?"student"===t.plan.effective.id?"Student":"Pro Trial":il(this.planId)}get subscription(){return this._subscription.subscription.get()}get subscriptionState(){return this.subscription?.state}get trialDaysRemaining(){return null==this.subscription?0:ih(this.subscription,"days")??0}focus(){this._chip.focus()}render(){return void 0===this.subscription?ex`<span
				id="chip"
				class="chip chip--skeleton"
				tabindex="-1"
				aria-label="Loading account status"
				role="status"
			></span>`:ex`<gl-popover placement="bottom" trigger="hover focus click">
				<span id="chip" slot="anchor" class="chip" tabindex="0">
					${this.accountAvatar?ex`<img class="chip__media" src=${this.accountAvatar} />`:ex`<code-icon class="chip__media" icon="gl-gitlens" size="16"></code-icon>`}
					<span>${this.planTier}</span>
				</span>
				<div slot="content" class="content" tabindex="-1">
					<div class="header">
						<span class="header__title">${this.planName}</span>
						<span class="header__actions">
							${this.hasAccount?ex`<gl-button
											appearance="toolbar"
											href="${ib("gitlens.plus.validate",{source:"account"})}"
											tooltip="Synchronize Status"
											aria-label="Synchronize Status"
											><code-icon icon="sync"></code-icon
										></gl-button>
										<gl-button
											appearance="toolbar"
											href="${ib("gitlens.plus.manage",{source:"account"})}"
											tooltip="Manage Account"
											aria-label="Manage Account"
											><code-icon icon="gear"></code-icon
										></gl-button>
										<gl-button
											appearance="toolbar"
											href="${ib("gitlens.plus.logout",{source:"account"})}"
											tooltip="Sign Out"
											aria-label="Sign Out"
											><code-icon icon="sign-out"></code-icon
										></gl-button>`:eP}
						</span>
					</div>
					${this.renderAccountInfo()} ${this.renderAccountState()}
				</div>
			</gl-popover>
			${this.renderUpgradeContent()}`}show(){this._popover.show(),this.focus()}renderAccountInfo(){let t=this._subscription.subscription.get(),r=this._subscription.avatar.get(),o=this._subscription.organizationsCount.get(),i=t?.activeOrganization?.name??"";return this.hasAccount&&i?ex`<div class="account-info">
			<span class="row">
				<span class="row__media"
					>${r?ex`<img src=${r} />`:ex`<code-icon icon="gl-gitlens" size="20"></code-icon>`}</span
				>
				<span class="details"
					><p class="details__title">${this.accountName}</p>
					<p class="details__subtitle">${this.accountEmail}</p></span
				>
			</span>
			<span class="row">
				<span class="row__media"><code-icon icon="organization" size="20"></code-icon></span>
				<span class="details"><p class="details__title">${i}</p></span>
				${it(o>1,()=>ex`<div class="details__button">
							<gl-button
								appearance="toolbar"
								href="${ib("gitlens.gk.switchOrganization",{source:"account",detail:{organization:t?.activeOrganization?.id}})}"
								aria-label="Switch Active Organization"
								><span class="org__badge">+${o-1}</span
								><code-icon icon="arrow-swap"></code-icon
								><span slot="tooltip"
									>Switch Active Organization
									<hr />
									You are in
									${t_("organization",o-1,{infix:" other "})}</span
								></gl-button
							>
						</div>`)}
			</span>
			${it(ig(this.subscription?.state??ii.Community),()=>{var r;return ex`<span class="row">
						<span class="row__media"><code-icon icon="unlock" size="20"></code-icon></span>
						<span class="details"
							><p class="details__title">
								${null!=this.subscription&&iu(this.subscription)?ex`${il(this.effectivePlanId)} plan
											<span class="details__subtitle">(trial)</span>`:ex`${il(this.planId)} plan`}
							</p></span
						>
						${null!=this.subscription&&ip(this.subscription)&&0>(r=this.planId,ic(r)-ic("advanced"))?ex`<div class="details__button">
									<gl-button
										appearance="secondary"
										href="${ib("gitlens.plus.upgrade",{plan:"advanced",source:"account",detail:{location:"plan-section:upgrade-button",organization:t?.activeOrganization?.id,plan:"advanced"}})}"
										aria-label="Upgrade to Advanced"
										><span class="upgrade-button">Upgrade</span>${this.renderPromo("advanced","icon","suffix")}
										<span slot="tooltip"
											>Upgrade to the Advanced plan for access to self-hosted integrations,
											advanced AI features @ 1M tokens/week, and more
											${this.renderPromo("advanced","info")}
										</span>
									</gl-button>
								</div>`:eP}
					</span>`})}
		</div>`:eP}renderAccountState(){let t=this._subscription.subscription.get();switch(this.subscriptionState){case ii.Paid:return ex`<div class="account-status">
					${this.renderIncludesDevEx()}${this.renderReferFriend()}
				</div> `;case ii.VerificationRequired:return ex`<div class="account-status">
					<p>You must verify your email before you can access Pro features.</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ib("gitlens.plus.resendVerification",{source:"account"})}"
							>Resend Email</gl-button
						>
						<gl-button
							appearance="secondary"
							href="${ib("gitlens.plus.validate",{source:"account"})}"
							><code-icon size="20" icon="refresh"></code-icon>
						</gl-button>
					</button-container>
				</div>`;case ii.Trial:{let r=this.trialDaysRemaining;return ex`<div class="account-status">
					${this.isReactivatedTrial?ex`<p>
								<code-icon icon="megaphone"></code-icon>
								See
								<a href="${io.releaseNotes}">what's new</a>
								in GitLens.
							</p>`:eP}
					<p>
						You have
						<strong>${r<1?"<1 day":t_("day",r,{infix:" more "})} left</strong>
						in your ${"Student"===this.planTier?"Student":"Pro"} trial. Once your trial ends, you will
						only be able to use Pro features on publicly-hosted repos.
					</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ib("gitlens.plus.upgrade",{plan:"pro",source:"account",detail:{location:"upgrade-button",organization:t?.activeOrganization?.id,plan:"pro"}})}"
							>Upgrade to Pro</gl-button
						>
					</button-container>
					${this.renderPromo("pro")} ${this.renderIncludesDevEx()} ${this.renderReferFriend()}
				</div>`}case ii.TrialExpired:return ex`<div class="account-status">
					<p>Thank you for trying <a href="${io.communityVsPro}">GitLens Pro</a>.</p>
					<p>Continue leveraging Pro features and workflows for privately hosted repos by upgrading today.</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ib("gitlens.plus.upgrade",{plan:"pro",source:"account",detail:{location:"upgrade-button",organization:t?.activeOrganization?.id,plan:"pro"}})}"
							>Upgrade to Pro</gl-button
						>
					</button-container>
					${this.renderPromo("pro")} ${this.renderIncludesDevEx()} ${this.renderReferFriend()}
				</div>`;case ii.TrialReactivationEligible:return ex`<div class="account-status">
					<p>
						Reactivate your GitLens Pro trial and experience all the new Pro features — free for another
						${t_("day",14)}.
					</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ib("gitlens.plus.reactivateProTrial",{source:"account"})}"
							tooltip="Reactivate your Pro trial for another ${t_("day",14)}"
							>Reactivate GitLens Pro Trial</gl-button
						>
					</button-container>
					${this.renderReferFriend()}
				</div>`;default:return ex`<div class="account-status">
					<p>
						Unlock advanced features and workflows for private repos, accelerate reviews, and streamline
						collaboration with
						<a href="${io.communityVsPro}">GitLens Pro</a>.
					</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ib("gitlens.plus.signUp",{source:"account"})}"
							>Try GitLens Pro</gl-button
						>
						<span class="button-suffix"
							>or
							<a
								href="${ib("gitlens.plus.login",{source:"account"})}"
								>sign in</a
							></span
						>
					</button-container>
					<p>Get ${14} days of GitLens Pro for free — no credit card required.</p>
				</div>`}}renderIncludesDevEx(){return ex`<p>Includes access to <a href="${io.platform}">GitKraken's DevEx platform</a></p>`}renderReferFriend(){return null!=this.subscription&&ip(this.subscription)?ex`<p>
			<a
				href="${ib("gitlens.plus.referFriend",{source:"account"})}"
				>Refer a friend</a
			>
			&mdash; give 50% off and get up to $20
		</p>`:eP}renderUpgradeContent(){let t=this._subscription.subscription.get();return null!=t&&ip(t)?(this.showUpgrade=!1,eP):(this.showUpgrade=!0,ex`<gl-popover placement="bottom" trigger="hover focus click">
			<span slot="anchor" class="chip chip--outlined" tabindex="0">
				<span>Upgrade</span>
			</span>
			<div slot="content" class="content" tabindex="-1">
				<div class="header">
					<span class="header__title">Advantages of GitLens Pro</span>
				</div>
				<div class="upgrade">
					<button-container layout="editor">
						<gl-button
							full
							href="${ib("gitlens.plus.upgrade",{plan:"pro",source:"account",detail:{location:"upgrade-chip:upgrade-button",organization:t?.activeOrganization?.id,plan:"pro"}})}"
							>Upgrade to Pro</gl-button
						>
					</button-container>
					${this.renderPromo("pro")}

					<ul>
						<li>Unlimited cloud integrations</li>
						<li>Smart AI features &mdash; 250K tokens/week</li>
						<li>
							Powerful tools &mdash; Commit Graph, Visual History, &amp; Git Worktrees for private repos
						</li>
						<li>Streamlined workflows &mdash; start work from issues, pull request reviews</li>
					</ul>

					<br />
					<button-container>
						<gl-button
							full
							href="${ib("gitlens.plus.upgrade",{plan:"advanced",source:"account",detail:{location:"upgrade-chip:upgrade-button",organization:t?.activeOrganization?.id,plan:"advanced"}})}"
							>Upgrade to Advanced</gl-button
						>
					</button-container>
					${this.renderPromo("advanced")}

					<ul>
						<li>Self-hosted integrations</li>
						<li>Advanced AI features &mdash; 1M tokens/week</li>
					</ul>
				</div>
			</div>
		</gl-popover>`)}renderPromo(t,r="info",o){return ex`<gl-promo
			slot=${o??eP}
			.promoPromise=${this.promos.getApplicablePromo(t,"account")}
			.type=${r}
			.source="${{source:"account"}}"
		></gl-promo>`}};ap.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},ap.styles=[om,of,ob,im,iy,F`
			:host {
				display: inline-flex;
				gap: var(--gl-space-8);
				align-items: center;
			}

			:host-context(.vscode-dark),
			:host-context(.vscode-high-contrast) {
				--gl-account-chip-color: color-mix(in lab, var(--vscode-sideBar-background), #fff 10%);
				--gl-account-chip-media-color: color-mix(in lab, var(--vscode-sideBar-background), #fff 25%);
				--gl-account-account-media-color: color-mix(in lab, var(--vscode-sideBar-background), #fff 20%);
			}

			:host-context(.vscode-light),
			:host-context(.vscode-high-contrast-light) {
				--gl-account-chip-color: color-mix(in lab, var(--vscode-sideBar-background), #000 7%);
				--gl-account-chip-media-color: color-mix(in lab, var(--vscode-sideBar-background), #000 18%);
				--gl-account-account-media-color: color-mix(in lab, var(--vscode-sideBar-background), #000 15%);
			}

			.chip {
				padding-right: var(--gl-space-6);
				font-size: var(--gl-font-sm);
				font-weight: 400;
				line-height: 2rem;
				text-transform: uppercase;
				background-color: var(--gl-account-chip-color);
			}

			.chip--outlined {
				background-color: transparent;
				border: var(--gl-border-width) solid var(--gl-account-chip-color);
			}

			.chip__media {
				display: flex;
				flex: 0 0 auto;
				align-items: center;
				justify-content: center;
				padding: var(--gl-space-2);
			}

			img.chip__media {
				width: 1.6rem;
				aspect-ratio: 1 / 1;
				background-color: var(--gl-account-chip-media-color);
				border-radius: 50%;
			}

			.chip-group {
				display: inline-flex;
				flex-direction: row;
				gap: var(--gl-space-8);
				cursor: pointer;
			}

			.account-info {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-2);
			}

			.row {
				position: relative;
				display: flex;
				flex-direction: row;
				gap: 0 var(--gl-space-6);
				align-items: center;
			}

			.row:last-of-type {
				margin-bottom: var(--gl-space-6);
			}

			.row__media {
				display: flex;
				flex: 0 0 auto;
				align-items: center;
				justify-content: center;
				width: 3.4rem;
			}

			.row__media code-icon {
				color: var(--color-foreground--65);
			}

			.row__media img {
				width: 2rem;
				aspect-ratio: 1 / 1;
				background-color: var(--gl-account-account-media-color);
				border-radius: 50%;
			}

			.details {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: center;
			}

			.details__title {
				margin: 0;
				font-size: var(--gl-font-base);
				font-weight: 600;
			}

			.details__subtitle {
				margin: 0;
				font-size: var(--gl-font-sm);
				font-weight: 400;
				color: var(--color-foreground--65);
			}

			.details__button {
				display: flex;
				flex: none;
				flex-direction: row;
				gap: var(--gl-space-2);
				align-items: center;
				justify-content: center;
			}

			.org__badge {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 2.4rem;
				height: 2.4rem;
				margin-right: var(--gl-space-6);
				font-size: var(--gl-font-micro);
				font-weight: 600;
				line-height: 2.4rem;
				color: var(--color-foreground--65);
				background-color: var(--vscode-toolbar-hoverBackground);
				border-radius: 50%;
			}

			.account-status > :first-child {
				margin-block-start: 0;
			}

			.account-status > :last-child {
				margin-block-end: 0;
			}

			button-container {
				margin-bottom: 1.3rem;
			}

			button-container .button-suffix {
				display: inline-flex;
				gap: 0.2em;
				align-items: center;
				margin-left: var(--gl-space-4);
				white-space: nowrap;
			}

			.upgrade > * {
				margin-block: var(--gl-space-8) 0;
			}

			.upgrade ul {
				padding-inline-start: var(--gl-space-20);
			}

			.upgrade li {
				text-wrap: pretty;
			}

			.upgrade gl-promo::part(text) {
				margin-block-start: 0;

				/* border-radius: 0.3rem;
		padding: var(--gl-space-2) var(--gl-space-4);
		background-color: var(--gl-account-chip-color); */
			}

			.upgrade gl-promo:not([has-promo]) {
				display: none;
			}

			.upgrade-button {
				font-size: var(--gl-font-micro);
				text-transform: uppercase;
			}

			@keyframes shimmer {
				100% {
					transform: translateX(100%);
				}
			}

			.chip--skeleton {
				position: relative;
				width: 8rem;
				height: 2.4rem;
				overflow: hidden;
				cursor: default;
				background-color: var(--gl-account-chip-color);
			}

			.chip--skeleton::before {
				position: absolute;
				inset: 0;
				content: '';
				background-image: linear-gradient(
					to right,
					transparent 0%,
					var(--color-background--lighten-15) 20%,
					var(--color-background--lighten-30) 60%,
					transparent 100%
				);
				transform: translateX(-100%);
				animation: shimmer 2s var(--gl-ease-in-out) infinite;
			}
		`],ah([O({context:"subscription",subscribe:!0})],ap.prototype,"_subscription",2),ah([eD({type:Boolean,reflect:!0,attribute:"show-upgrade"})],ap.prototype,"showUpgrade",1),ah([eN("#chip")],ap.prototype,"_chip",2),ah([eN("gl-popover")],ap.prototype,"_popover",2),ah([O({context:"promos"})],ap.prototype,"promos",2),ap=ah([eL("gl-account-chip")],ap);let private_async_helpers_s=class private_async_helpers_s{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}};let private_async_helpers_i=class private_async_helpers_i{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(t=>this.Z=t)}resume(){this.Z?.(),this.Y=this.Z=void 0}};let au=t=>null!==t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then;let until_c=class until_c extends async_directive_f{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new private_async_helpers_s(this),this._$CX=new private_async_helpers_i}render(...t){return t.find(t=>!au(t))??eS}update(t,r){let o=this._$Cbt,i=o.length;this._$Cbt=r;let n=this._$CK,a=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<r.length&&!(t>this._$Cwt);t++){let c=r[t];if(!au(c))return this._$Cwt=t,c;t<i&&c===o[t]||(this._$Cwt=0x3fffffff,i=0,Promise.resolve(c).then(async t=>{for(;a.get();)await a.get();let r=n.deref();if(void 0!==r){let o=r._$Cbt.indexOf(c);o>-1&&o<r._$Cwt&&(r._$Cwt=o,r.setValue(t))}}))}return eS}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};let ag=tz(until_c);var ab=Object.defineProperty,am=Object.getOwnPropertyDescriptor,af=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?am(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ab(r,o,a),a};let av=class extends lit_element_i{constructor(){super(...arguments),this.type="info",this._hasPromo=!1}get hasPromo(){return this._hasPromo}set hasPromo(t){this._hasPromo=t}render(){return ex`${ag(this.promoPromise?.then(t=>this.renderPromo(t)),eP)}`}renderPromo(t){if(!t?.content?.webview){this.hasPromo=!1;return}let r=t.content.webview;switch(this.type){case"icon":return ex`<code-icon icon="star-full" size="16"></code-icon>`;case"info":if(r.info)return this.hasPromo=!0,ex`<p class="promo" part="text">${i_(r.info.html)}</p>`;break;case"link":if(r.link)return this.hasPromo=!0,ex`<a
						class="link"
						part="link"
						href="${this.getCommandUrl(t)}"
						title="${r.link.title??eP}"
						>${i_(r.link.html)}</a
					>`}return this.hasPromo=!1,eP}getCommandUrl(t){let r;return t?.content?.webview?.link?.command?.startsWith("command:")&&(r=t.content.webview.link.command.substring(8)),ib(r??"gitlens.plus.upgrade",this.source)}focus(){this._focusable?.focus()}};av.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},av.styles=[F`
			:host {
				display: block;
			}

			.promo {
				margin: 0;
				margin-top: var(--gl-space-8);
				text-align: center;
			}

			.header {
				margin-right: var(--gl-space-4);
			}

			.content {
				font-size: smaller;
			}

			.muted {
				opacity: 0.7;
			}

			.link {
				display: block;
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				color: inherit;
				text-align: center;
				white-space: nowrap;
				text-decoration: none;
			}

			.link:focus-visible {
				${ou}
			}

			.link:hover {
				color: inherit;
				text-decoration: underline;
			}
		`],af([eN('a,button,[tabindex="0"]')],av.prototype,"_focusable",2),af([eD({type:Object})],av.prototype,"promoPromise",2),af([eD({type:Object})],av.prototype,"source",2),af([eD({reflect:!0,type:String})],av.prototype,"type",2),af([eD({type:Boolean,reflect:!0,attribute:"has-promo"})],av.prototype,"hasPromo",1),av=af([eL("gl-promo")],av);var ay=Object.defineProperty,aw=Object.getOwnPropertyDescriptor,a_=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aw(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ay(r,o,a),a};let ak=class extends lit_element_i{constructor(){super(...arguments),this.cloud=!1,this.placement="bottom",this.preview=!1}get daysRemaining(){return null==this.subscription?0:ih(this.subscription,"days")??0}get state(){return this.subscription?.state}render(){return ex`
			<gl-popover placement=${this.placement}>
				<span slot="anchor" class="badge" tabindex="0">${this.renderBadge()}</span>
				<div slot="content" class="badge-popup" tabindex="-1">
					${this.renderPopoverHeader()}${this.renderPopoverContent()}
				</div>
			</gl-popover>
		`}renderBadge(){let t=this.preview?"Preview":"Pro";if(null!=this.subscription){if(this.state===ii.VerificationRequired)return ex`${t} <code-icon class="badge-icon" icon="warning" size="10"></code-icon>`;else if(ip(this.subscription)||this.cloud&&null!=this.subscription.account)return ex`${t} <code-icon class="badge-icon" icon="check" size="10"></code-icon>`;else if(iu(this.subscription))return ex`${t} <code-icon class="badge-icon" icon="clock" size="10"></code-icon>`}return t}renderPopoverHeader(){let t=ex`<span class="popup-title">${this.preview?"Preview feature":"Pro feature"}</span>`;return this.state===ii.Paid?ex`<div class="popup-header">${t}</div>`:this.cloud?this.preview?ex`<div class="popup-header">
					${t}<span class="popup-subtitle"
						>Unlock this feature with an account and may require GitLens Pro in the future</span
					>
				</div>`:ex`<div class="popup-header">
				${t}<span class="popup-subtitle"> Unlock this feature with GitLens Pro</span>
			</div>`:this.preview?ex`<div class="popup-header">
				${t}<span class="popup-subtitle">May require GitLens Pro in the future</span>
			</div>`:ex`<div class="popup-header">
			${t}<span class="popup-subtitle"> Unlock this feature for privately hosted repos with GitLens Pro</span>
		</div>`}renderPopoverContent(){let t;if(null==this.subscription)return eP;switch(this.state){case ii.Paid:t=ex`<p>
					Your
					<gl-tooltip content="Show Account view">
						<a href="${ib("gitlens.showAccountView")}"
							>${id(this.subscription?.plan.actual.id??"pro")}</a
						>
					</gl-tooltip>
					plan provides access to all Pro features.
				</p>`;break;case ii.VerificationRequired:t=ex`<p>You must verify your email before you can access Pro features.</p>
					<div class="actions">
						<gl-button
							density="tight"
							href="${ib("gitlens.plus.resendVerification",this.source)}"
							>Resend Email</gl-button
						>
						<gl-button
							appearance="secondary"
							density="tight"
							href="${ib("gitlens.plus.validate",this.source)}"
							><code-icon icon="refresh"></code-icon
						></gl-button>
					</div>`;break;case ii.Trial:{let r=this.daysRemaining;t=ex`<p>
						You have
						<strong>${r<1?"<1 day":t_("day",r,{infix:" more "})} left</strong>
						in your Pro trial. Once your trial ends, you will only be able to use Pro features on
						publicly-hosted repos.
					</p>
					${this.renderUpgradeActions()}`;break}case ii.TrialExpired:t=ex`<p>
						Your Pro trial has ended. You can now only use Pro features on publicly-hosted repos.
					</p>
					${this.renderUpgradeActions(ex`<p>Please upgrade for full access to all GitLens Pro features:</p>`)}`;break;case ii.TrialReactivationEligible:t=ex`<p>
						Reactivate your Pro trial and experience all the new Pro features — free for another
						${t_("day",14)}!
					</p>
					<div class="actions center">
						<gl-button
							density="tight"
							href="${ib("gitlens.plus.reactivateProTrial",this.source)}"
							tooltip="Reactivate your Pro trial for another ${t_("day",14)}"
							>Reactivate Pro Trial</gl-button
						>
					</div>`;break;default:t=ex`<p>
						You only have access to
						<gl-tooltip content="Pro features that do not require an account"
							><span class="hint">local</span></gl-tooltip
						>
						Pro features on publicly-hosted repos.
					</p>
					${this.renderStartTrialActions()}`}return ex`<div class="popup-content">${t}</div>`}renderStartTrialActions(){return ex`<div class="actions">
			<p>For access to all Pro features:</p>
			<gl-button density="tight" href="${ib("gitlens.plus.signUp",this.source)}"
				>Start ${14}-day Pro Trial</gl-button
			>
			&nbsp;or
			<a href="${ib("gitlens.plus.login",this.source)}" title="Sign In">sign in</a>
		</div>`}renderUpgradeActions(t){return ex`<div class="actions">
			${t??eP}
			<gl-button
				density="tight"
				href="${ib("gitlens.plus.upgrade",{plan:"pro",...this.source??{source:"feature-badge"}})}"
				>Upgrade to Pro</gl-button
			>
			${this.renderPromo()}
		</div>`}renderPromo(){return ex`<gl-promo
			.promoPromise=${this.promos.getApplicablePromo(void 0,"badge")}
			.source=${this.source}
		></gl-promo>`}};ak.styles=[om,of,F`
			:host {
				/* position: relative; */
				display: inline-block;
				--gl-feature-badge-color: currentcolor;
				--gl-feature-badge-border-color: var(--color-foreground--50);
				--max-width: 40rem;
			}

			a {
				color: var(--color-link);
				text-decoration: underline;
			}

			.badge {
				display: inline-block;
				padding: 0 0.8rem 0.1rem;
				font-size: var(--gl-feature-badge-font-size, x-small);
				font-weight: 600;
				font-variant: all-small-caps;
				color: var(--gl-feature-badge-color, currentColor);
				white-space: nowrap;
				cursor: help;
				border: var(--gl-border-width) solid var(--gl-feature-badge-border-color, var(--color-foreground--50));
				border-radius: 1rem;
			}

			.badge:focus-visible {
				${D(ou)}
			}

			.badge-icon {
				margin-left: var(--gl-space-4);
				font-weight: 400;
				white-space: nowrap;
			}

			.badge-popup {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-6);
				white-space: normal;
			}

			.popup-header {
				display: flex;
				flex-direction: column;
				margin-bottom: var(--gl-space-4);
			}

			.popup-title {
				font-size: var(--gl-font-base);
				font-weight: 600;
			}

			.popup-subtitle {
				margin-top: var(--gl-space-6);
				font-size: smaller;
			}

			.popup-content {
				display: flex;
				flex-direction: column;
				padding-top: var(--gl-space-6);
				border-top: var(--gl-border-width) solid var(--color-foreground--25);
			}

			.popup-content p {
				margin: 0;
			}

			.popup-content .actions {
				margin-top: var(--gl-space-8);
				margin-bottom: var(--gl-space-6);
			}

			.popup-content .actions:first-child {
				margin-bottom: var(--gl-space-8);
			}

			.popup-content .actions :not(:first-child) {
				margin-top: var(--gl-space-4);
			}

			.popup-content .actions gl-button:not(:first-child) {
				margin-top: var(--gl-space-8);
			}

			.hint {
				border-bottom: var(--gl-border-width) dashed currentcolor;
			}
		`],a_([eD({type:Boolean})],ak.prototype,"cloud",2),a_([eD({reflect:!0})],ak.prototype,"placement",2),a_([eD({type:Boolean})],ak.prototype,"preview",2),a_([O({context:"promos"})],ak.prototype,"promos",2),a_([eD({type:Object})],ak.prototype,"source",2),a_([eD({attribute:!1})],ak.prototype,"subscription",2),ak=a_([eL("gl-feature-badge")],ak);var a$=Object.defineProperty,ax=Object.getOwnPropertyDescriptor,aC=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ax(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&a$(r,o,a),a};let aS=class extends tB(lit_element_i){get hasAccount(){return this._subscription.subscription.get()?.account!=null}get isPaidAccount(){return this._subscription.subscription.get()?.state===ii.Paid}get isProAccount(){return ig(this._subscription.subscription.get()?.state)}get hasConnectedIntegrations(){return this.hasAccount&&this.integrations.some(t=>t.connected)}get ai(){return this._ai.state.get()}get aiEnabled(){return this.ai.enabled&&this.ai.orgEnabled}get integrations(){return this._integrations.integrations.get()}focus(){this._chip.focus()}render(){if(void 0===this._subscription.subscription.get())return ex`<span
				id="chip"
				class="chip chip--skeleton"
				tabindex="-1"
				aria-label="Loading integrations status"
				role="status"
			></span>`;let t=this.hasConnectedIntegrations,r=function(t){let r=new Map;for(let o of t){let t=r.get(o.icon);t&&(!o.connected||t.connected)||r.set(o.icon,o)}return t=>r.get(t.icon)===t}(this.integrations);return ex`<gl-popover placement="bottom" trigger="hover click focus">
			<span slot="anchor" class="chip" tabindex="0"
				>${!t?ex`<span class="chip__label">Connect</span>`:""}${this.integrations.filter(r).map(t=>this.renderIntegrationStatus(t))}${this.renderAIStatus()}${this.renderMcpStatus()}${this.renderDefaultAgentStatus()}${this.renderHooksStatus()}</span
			>
			<div slot="content" class="content">
				<div class="header">
					<span class="header__title">Integrations</span>
					<span class="header__actions"></span>
						<gl-button
							appearance="toolbar"
							href="${ib("gitlens.plus.validate",{source:"home",detail:"integrations"})}"
							tooltip="Synchronize Status"
							aria-label="Synchronize Status"
							><code-icon icon="sync"></code-icon
						></gl-button>
						<gl-button
							appearance="toolbar"
							href="${ib("gitlens.plus.cloudIntegrations.manage",{source:{source:"home"}})}"
							tooltip="Manage Integrations"
							aria-label="Manage Integrations"
							><code-icon icon="gear"></code-icon></gl-button
					></span>
				</div>
				<div class="integrations">${!t?ex`<p>
									Connect hosting services like <strong>GitHub</strong> and issue trackers like
									<strong>Jira</strong> to track progress and take action on PRs and issues related to
									your branches.
								</p>
								<button-container>
									<gl-button
										full
										href="${ib("gitlens.plus.cloudIntegrations.connect",{integrationIds:this.integrations.map(t=>t.id),source:{source:"home",detail:"integrations"}})}"
										>Connect Integrations</gl-button
									>
								</button-container>`:this.integrations.map(t=>this.renderIntegrationRow(t))}${this.renderAIRow()}${this.renderMcpRow()}${this.renderDefaultAgentRow()}${this.renderHooksRow()}</div>
			</div>
		</gl-popover>`}renderIntegrationStatus(t){return t.requiresPro&&!this.isProAccount?ex`<span
				class="integration status--${t.connected?"connected":"disconnected"} is-locked"
				slot="anchor"
				><code-icon icon="${t.icon}"></code-icon
			></span>`:ex`<span
			class="integration status--${t.connected?"connected":"disconnected"}"
			slot="anchor"
			><code-icon icon="${t.icon}"></code-icon
		></span>`}renderIntegrationRow(t){let r=t.requiresPro&&!this.isProAccount,o=t.requiresPro&&!this.isPaidAccount;return ex`<div
			class="integration-row status--${t.connected?"connected":"disconnected"}${r?" is-locked":""}"
		>
			<span class="integration__icon"><code-icon icon="${t.icon}"></code-icon></span>
			<span class="integration__content">
				<span class="integration__title">
					<span>${t.name}</span>
					${o?ex` <gl-feature-badge
								placement="right"
								.source=${{source:"home",detail:"integrations"}}
								cloud
							></gl-feature-badge>`:eP}
				</span>
				<span class="integration__details">${function(t){let r=t.supports.map(t=>aP.get(t));if(0===r.length)return"";if(1===r.length)return`Supports ${r[0]}`;let o=r.pop();return`Supports ${r.join(", ")}, and ${o}`}(t)}</span>
			</span>
			<span class="integration__actions">
				${r?ex`<gl-button
							appearance="toolbar"
							href="${ib("gitlens.plus.upgrade",{plan:"pro",source:"home",detail:"integrations"})}"
							tooltip="Unlock ${t.name} features with GitLens Pro"
							aria-label="Unlock ${t.name} features with GitLens Pro"
							><code-icon class="status-indicator" icon="lock"></code-icon
						></gl-button>`:t.connected?ex`<gl-tooltip
								class="status-indicator status--connected"
								placement="bottom"
								content="Connected"
								><code-icon class="status-indicator" icon="check"></code-icon
							></gl-tooltip>`:ex`<gl-button
								appearance="toolbar"
								href="${ib("gitlens.plus.cloudIntegrations.connect",{integrationIds:[t.id],source:{source:"home",detail:"integrations"}})}"
								tooltip="Connect ${t.name}"
								aria-label="Connect ${t.name}"
								><code-icon icon="plug"></code-icon
							></gl-button>`}
			</span>
		</div>`}renderAIStatus(){let t=this._ai.model.get();return ex`<span
			class="integration status--${this.aiEnabled&&null!=t?"connected":"disconnected"}"
			slot="anchor"
		>
			<code-icon icon="${this.aiEnabled&&null!=t?"sparkle-filled":"sparkle"}"></code-icon>
		</span>`}renderAIRow(){let t=this._ai.model.get(),r=this.aiEnabled&&null!=t,o=!this.aiEnabled;return ex`<div
			class="integration-row integration-row--ai status--${r?"connected":"disconnected"}${o?" is-locked":""}"
		>
			<span class="integration__icon"><code-icon icon="${r?"sparkle-filled":"sparkle"}"></code-icon></span>
			${this.aiEnabled?ex`<span class="integration__content">
							${t?.provider.name?ex`<span class="integration__title">
										<span>${t.provider.name}</span>
										${eP}
									</span>`:ex`<span class="integration_details">Select AI model to enable AI features</span>`}
							${t?.name?ex`<span class="integration__details">${t.name}</span>`:eP}
						</span>
						<span class="integration__actions">
							<gl-button
								appearance="toolbar"
								href="${ib("gitlens.ai.switchProvider",{source:"home",detail:"integrations"})}"
								tooltip="Switch AI Provider/Model"
								aria-label="Switch AI Provider/Model"
								><code-icon icon="arrow-swap"></code-icon
							></gl-button>
						</span>`:ex`<span class="integration__content">
							<span class="integration_details"
								>GitLens AI features have been
								disabled${!this.ai.enabled?" via settings":" by your GitKraken admin"}</span
							>
						</span>
						${!this.ai.enabled?ex` <span class="integration__actions">
									<gl-button
										appearance="toolbar"
										href="${ib("gitlens.ai.enable",{source:"home",detail:"integrations"})}"
										tooltip="Re-enable AI Features"
										aria-label="Re-enable AI Features"
										><code-icon icon="unlock"></code-icon
									></gl-button>
								</span>`:eP}`}
		</div>`}renderMcpStatus(){let{mcp:t}=this.ai,r=this.aiEnabled&&t.settingEnabled&&t.installed;return ex`<span class="integration status--${r?"connected":"disconnected"}" slot="anchor">
			<code-icon icon="mcp"></code-icon>
		</span>`}renderMcpRow(){let{mcp:t}=this.ai,r=this.aiEnabled&&t.settingEnabled,o=r&&t.installed;return ex`<div class="integration-row integration-row--mcp status--${o?"connected":"disconnected"}">
			<span class="integration__icon"><code-icon icon="mcp"></code-icon></span>
			${r?t.installed?ex`<span class="integration__content">
								<span class="integration__title">GitKraken MCP</span>
								<span class="integration__details">Leverage Git &amp; Integrations in AI chats</span>
							</span>
							<span class="integration__actions">
								<gl-button
									appearance="toolbar"
									href="${ib("gitlens.ai.mcp.selectAgents",{source:"home",detail:"integrations"})}"
									tooltip="Connect More Agents"
									aria-label="Connect More Agents"
									><code-icon icon="plug"></code-icon
								></gl-button>
								<gl-button
									appearance="toolbar"
									href="${ib("gitlens.ai.mcp.reinstall",{source:"home",detail:"integrations"})}"
									tooltip="Reinstall GitKraken MCP"
									aria-label="Reinstall GitKraken MCP"
									><code-icon icon="sync"></code-icon
								></gl-button>
								<gl-tooltip
									class="status-indicator status--connected"
									placement="bottom"
									content="Installed${t.bundled?" (bundled)":""}"
									><code-icon class="status-indicator" icon="check"></code-icon
								></gl-tooltip>
							</span>`:ex`<span class="integration__content">
								<span class="integration__title">GitKraken MCP</span>
								<span class="integration__details">Leverage Git &amp; Integrations in AI chats</span>
							</span>
							<span class="integration__actions">
								<gl-button
									appearance="toolbar"
									href="${ib("gitlens.ai.mcp.install",{source:"home",detail:"integrations"})}"
									tooltip="Install GitKraken MCP"
									aria-label="Install GitKraken MCP"
									><code-icon icon="plug"></code-icon
								></gl-button>
							</span>`:!this.aiEnabled?ex`<span class="integration__content">
								<span class="integration_details"
									>GitKraken MCP has been
									disabled${!this.ai.enabled?" via settings":" by your GitKraken admin"}</span
								>
							</span>
							${!this.ai.enabled?ex` <span class="integration__actions">
										<gl-button
											appearance="toolbar"
											href="${ib("gitlens.ai.enable",{source:"home",detail:"integrations"})}"
											tooltip="Re-enable AI Features"
											aria-label="Re-enable AI Features"
											><code-icon icon="unlock"></code-icon
										></gl-button>
									</span>`:eP}`:ex`<span class="integration__content">
								<span class="integration_details">GitKraken MCP has been disabled via settings</span>
							</span>
							<span class="integration__actions">
								<gl-button
									appearance="toolbar"
									href="${ib("gitlens.ai.mcp.install",{source:"home",detail:"integrations"})}"
									tooltip="Re-enable MCP"
									aria-label="Re-enable MCP"
									><code-icon icon="unlock"></code-icon
								></gl-button>
							</span>`}
		</div>`}renderDefaultAgentStatus(){if(!this.aiEnabled)return eP;let t=this.ai.defaultAgent;return ex`<span class="integration status--${null!=t?"connected":"disconnected"}" slot="anchor">
			<code-icon icon="robot"></code-icon>
		</span>`}renderDefaultAgentRow(){if(!this.aiEnabled)return eP;let t=this.ai.defaultAgent;return ex`<div
			class="integration-row integration-row--default-agent status--${null!=t?"connected":"disconnected"}"
		>
			<span class="integration__icon"><code-icon icon="robot"></code-icon></span>
			<span class="integration__content">
				<span class="integration__title">Default Coding Agent</span>
				<span class="integration__details">${null!=t?t.label:"No default agent selected"}</span>
			</span>
			<span class="integration__actions">
				<gl-button
					appearance="toolbar"
					href="${ib("gitlens.agents.switchDefaultAgent")}"
					tooltip="Switch Default Agent"
					aria-label="Switch Default Agent"
					><code-icon icon="arrow-swap"></code-icon
				></gl-button>
			</span>
		</div>`}renderHooksStatus(){return this.aiEnabled&&this.ai.hooks.canInstallClaudeHook?ex`<span class="integration status--disconnected" slot="anchor">
			<code-icon icon="search-sparkle"></code-icon>
		</span>`:eP}renderHooksRow(){if(!this.aiEnabled)return eP;let t=this.ai.hooks.claude;return t.supported&&t.detected?t.installed?ex`<div class="integration-row integration-row--hooks status--connected">
				<span class="integration__icon"><code-icon icon="search-sparkle"></code-icon></span>
				<span class="integration__content">
					<span class="integration__title">GitKraken Claude Code Hooks</span>
					<span class="integration__details">Installed — Claude surfaces agent status</span>
				</span>
				<span class="integration__actions">
					<gl-button
						appearance="toolbar"
						href="${ib("gitlens.agents.uninstallClaudeHook")}"
						tooltip="Uninstall Claude Hooks"
						aria-label="Uninstall Claude Hooks"
						><code-icon icon="debug-disconnect"></code-icon
					></gl-button>
				</span>
			</div>`:ex`<div class="integration-row integration-row--hooks status--disconnected">
			<span class="integration__icon"><code-icon icon="search-sparkle"></code-icon></span>
			<span class="integration__content">
				<span class="integration__title">GitKraken Claude Code Hooks</span>
				<span class="integration__details">Configure Claude to surface agent status</span>
			</span>
			<span class="integration__actions">
				<gl-button
					appearance="toolbar"
					href="${ib("gitlens.agents.installClaudeHook")}"
					tooltip="Install Claude Hooks"
					aria-label="Install Claude Hooks"
					><code-icon icon="plug"></code-icon
				></gl-button>
			</span>
		</div>`:eP}};aS.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},aS.styles=[om,of,im,F`
			:host-context(.vscode-dark),
			:host-context(.vscode-high-contrast) {
				--gl-chip-skeleton-bg: color-mix(in lab, var(--vscode-sideBar-background), #fff 10%);
				--status-color--connected: #0d0;
			}

			:host-context(.vscode-light),
			:host-context(.vscode-high-contrast-light) {
				--gl-chip-skeleton-bg: color-mix(in lab, var(--vscode-sideBar-background), #000 7%);
				--status-color--connected: #0a0;
			}

			.chip {
				gap: var(--gl-space-6);
				align-items: baseline;
				padding: var(--gl-space-2) var(--gl-space-4) var(--gl-space-4);
			}

			.chip__label {
				margin-right: var(--gl-space-4);
				font-size: var(--gl-font-sm);
				font-weight: 400;
				color: var(--color-foreground--75);
				text-transform: uppercase;
			}

			.integration {
				white-space: nowrap;
			}

			.content {
				gap: var(--gl-space-6);
			}

			.status--disconnected.integration {
				color: var(--color-foreground--25);
			}

			.status--connected:not(.is-locked) .status-indicator {
				color: var(--status-color--connected);
			}

			gl-tooltip.status-indicator {
				margin-right: var(--gl-space-4);
			}

			.integrations {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-8);
				width: 100%;
			}

			.integration-row {
				display: flex;
				gap: var(--gl-space-10);
				align-items: center;
			}

			.integration-row--ai {
				padding-top: var(--gl-space-6);
				border-top: var(--gl-border-width) solid var(--color-foreground--25);
			}

			.integration-row--mcp,
			.integration-row--default-agent,
			.integration-row--hooks {
				padding-top: 0;
			}

			.status--disconnected .integration__icon {
				color: var(--color-foreground--25);
			}

			.integration__content {
				display: block;
				flex: 1 1 auto;
			}

			.integration__title {
				display: flex;
				justify-content: space-between;
			}

			.integration__title gl-feature-badge {
				vertical-align: super;
			}

			.integration__details {
				display: block;
				font-size: var(--gl-font-micro);
				color: var(--color-foreground--75);
			}

			.status--disconnected .integration__title,
			.status--disconnected .integration__details {
				color: var(--color-foreground--50);
			}

			.integration__actions {
				display: flex;
				flex: none;
				flex-direction: row;
				gap: var(--gl-space-2);
				align-items: center;
				justify-content: flex-end;
			}

			button-container {
				width: 100%;
				margin-bottom: var(--gl-space-4);
			}

			p {
				margin: 0;
			}

			gl-popover::part(body) {
				--max-width: 90vw;
			}

			@keyframes shimmer {
				100% {
					transform: translateX(100%);
				}
			}

			.chip--skeleton {
				position: relative;
				width: 9rem;
				height: 2.2rem;
				overflow: hidden;
				cursor: default;
				background-color: var(--gl-chip-skeleton-bg);
			}

			.chip--skeleton::before {
				position: absolute;
				inset: 0;
				content: '';
				background-image: linear-gradient(
					to right,
					transparent 0%,
					var(--color-background--lighten-15) 20%,
					var(--color-background--lighten-30) 60%,
					transparent 100%
				);
				transform: translateX(-100%);
				animation: shimmer 2s var(--gl-ease-in-out) infinite;
			}
		`],aC([O({context:"subscription",subscribe:!0})],aS.prototype,"_subscription",2),aC([O({context:"integrations"})],aS.prototype,"_integrations",2),aC([O({context:"ai"})],aS.prototype,"_ai",2),aC([eN("#chip")],aS.prototype,"_chip",2),aS=aC([eL("gl-integrations-chip")],aS);let aP=new Map([["prs","pull requests"],["issues","issues"]]);var aA=Object.defineProperty,aO=Object.getOwnPropertyDescriptor,aR=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aO(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aA(r,o,a),a};let aI=class extends lit_element_i{render(){return ex`<div class="container" tabindex="-1">
			<span class="group"><gl-account-chip></gl-account-chip></span>
			<gl-integrations-chip></gl-integrations-chip>
		</div>`}show(){this.accountChip?.show()}};aI.styles=[om,of,F`
			:host {
				display: block;
			}

			.container {
				display: flex;
				gap: var(--gl-space-6);
				align-items: center;
				justify-content: space-between;
				color: var(--vscode-sideBar-foreground, var(--vscode-foreground));
			}

			.container:focus,
			.container:focus-within {
				outline: none;
			}

			.group {
				display: flex;
				gap: var(--gl-space-4);
				align-items: center;
			}
		`],aR([eN("gl-account-chip")],aI.prototype,"accountChip",2),aI=aR([eL("gl-account-bar")],aI);let aE={gettingStarted:"Getting Started",visualizeCodeHistory:"Visualize Code History",aiFeatures:"AI Features",gitBlame:"Inline Blame",prReviews:"Launchpad",kepler:"Kepler",mcpFeatures:"MCP Features"};var aT=Object.defineProperty,aB=Object.getOwnPropertyDescriptor,az=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aB(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aT(r,o,a),a};let aL=class extends tB(lit_element_i){constructor(){super(...arguments),this.onDismissWalkthrough=()=>{this._onboarding.walkthroughProgress.set(void 0),this._onboarding.dismissWalkthrough()}}get isWalkthroughComplete(){let t=this._onboarding.walkthroughProgress.get();return null!=t&&t.doneCount===t.allCount}render(){let t=this._onboarding.walkthroughProgress.get();if(null!=t)return ex`${this.isWalkthroughComplete?ex`<gl-button
						@click=${this.onDismissWalkthrough}
						class="walkthrough-progress__button"
						appearance="toolbar"
						tooltip="Dismiss"
						aria-label="Dismiss"
						><code-icon icon="x"></code-icon
					></gl-button>`:eP}
			<gl-tooltip placement="bottom">
				<a class="walkthrough-progress" href=${ib("gitlens.showWelcomeView")}>
					<header class="walkthrough-progress__title">
						<span>GitLens Walkthrough (${t.doneCount}/${t.allCount})</span>
					</header>
					<progress class="walkthrough-progress__bar" value=${t.progress}></progress>
				</a>
				<div slot="content">
					<div>Open Walkthrough</div>
					<hr />
					${this.renderWalkthroughProgress()}
				</div>
			</gl-tooltip>`}renderWalkthroughProgress(){let t=this._onboarding.walkthroughProgress.get();if(null!=t)return ex`<p class="walkthrough-progress__label">
				Walkthrough Progress (${t.doneCount}/${t.allCount})
			</p>
			<ul class="walkthrough-progress__steps">
				${Object.entries(aE).map(([r,o])=>{let i=t.state[r];return ex`<li class="walkthrough-progress__step ${i?"completed":""}">
						<code-icon icon="${i?"pass":"circle-large"}"></code-icon>
						<span class="walkthrough-progress__step-label">${o}</span>
					</li>`})}
			</ul>`}};aL.styles=[o3,o9,iy,F`
			.walkthrough-progress__label {
				margin-block: 0;
			}

			.walkthrough-progress__steps {
				padding-inline-start: 0;
				margin-block: 0;
			}

			.walkthrough-progress__step {
				margin-block-start: 0.3rem;
				list-style: none;
			}

			.walkthrough-progress__step-label {
				margin-inline-start: 0.3rem;
			}

			code-icon[icon='circle-large'] {
				color: var(--color-foreground--50);
			}

			code-icon[icon='pass'] {
				color: #0d0;
			}
		`],az([O({context:"onboarding"})],aL.prototype,"_onboarding",2),aL=az([eL("gl-onboarding")],aL);var aM=Object.defineProperty,aD=Object.getOwnPropertyDescriptor,aF=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aD(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aM(r,o,a),a};let aj=class extends lit_element_i{render(){return ex`
			<gl-promo
				.promoPromise=${this.promos.getApplicablePromo(void 0,"home")}
				.source="${{source:"home"}}"
				class="promo-banner promo-banner--eyebrow"
				id="promo"
				type="link"
			></gl-promo>
		`}};aj.styles=[F`
			:host {
				display: block;
			}

			.promo-banner {
				margin-bottom: var(--gl-space-10);
				text-align: center;
			}

			.promo-banner--eyebrow {
				margin-bottom: var(--gl-space-2);
				color: var(--color-foreground--50);
			}

			.promo-banner:has(gl-promo:not([has-promo])) {
				display: none;
			}
		`],aF([O({context:"promos"})],aj.prototype,"promos",2),aj=aF([eL("gl-promo-banner")],aj);var aN=Object.defineProperty,aW=Object.getOwnPropertyDescriptor,aU=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aW(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aN(r,o,a),a};let aq=class extends lit_element_i{render(){return ex`<gl-promo-banner></gl-promo-banner>
			<gl-account-bar></gl-account-bar>
			<gl-onboarding></gl-onboarding>`}show(){this.accountBar?.show()}refreshPromo(){this.promoBanner?.requestUpdate()}};aq.styles=[om,of,F`
			:host {
				display: block;
			}

			gl-promo-banner {
				margin: 0 var(--gl-space-2) var(--gl-space-6);
			}

			gl-promo-banner:has(gl-promo:not([has-promo])) {
				display: none;
			}
		`],aU([eN("gl-account-bar")],aq.prototype,"accountBar",2),aU([eN("gl-promo-banner")],aq.prototype,"promoBanner",2),aq=aU([eL("gl-home-header")],aq),((...t)=>t[0])(["mergeable","blocked","follow-up","needs-review"]);let aH=new Map([["current-branch","$(git-branch)"],["pinned","$(pinned)"],["mergeable","$(rocket)"],["blocked","$(error)"],["follow-up","$(report)"],["needs-review","$(comment-unresolved)"],["waiting-for-review","$(gitlens-clock)"],["draft","$(git-pull-request-draft)"],["other","$(ellipsis)"],["snoozed","$(bell-slash)"]]),aG=new Map([["current-branch","Current Branch"],["pinned","Pinned"],["mergeable","Ready to Merge"],["blocked","Blocked"],["follow-up","Requires Follow-up"],["needs-review","Needs Your Review"],["waiting-for-review","Waiting for Review"],["draft","Draft"],["other","Other"],["snoozed","Snoozed"]]),aK=new Map([["mergeable","mergeable"],["conflicts","blocked"],["failed-checks","blocked"],["unassigned-reviewers","blocked"],["needs-my-review","needs-review"],["code-suggestions","follow-up"],["changes-requested","follow-up"],["reviewer-commented","follow-up"],["waiting-for-review","waiting-for-review"],["draft","draft"],["other","other"]]),aV=new Map([["mergeable",["Ready to Merge","Ready to merge"]],["unassigned-reviewers",["Unassigned Reviewers","You need to assign reviewers"]],["failed-checks",["Failed Checks","You need to resolve the failing checks"]],["conflicts",["Resolve Conflicts","You need to resolve merge conflicts"]],["needs-my-review",["Needs Your Review","${author} requested your review"]],["code-suggestions",["Code Suggestions","Code suggestions have been made on this pull request"]],["changes-requested",["Changes Requested","Reviewers requested changes before this can be merged"]],["reviewer-commented",["Reviewers Commented","Reviewers have commented on this pull request"]],["waiting-for-review",["Waiting for Review","Waiting for reviewers to approve this pull request"]],["draft",["Draft","Continue working on your draft"]],["other",["Other","Opened by ${author} ${createdDateRelative}"]]]),aY={"cherry-pick":{label:"Cherry picking",conflicts:"Resolve conflicts to continue cherry picking",directionality:"into"},merge:{label:"Merging",conflicts:"Resolve conflicts to continue merging",directionality:"into"},rebase:{label:"Rebasing",conflicts:"Resolve conflicts to continue rebasing",directionality:"onto",pending:"Pending rebase of"},revert:{label:"Reverting",conflicts:"Resolve conflicts to continue reverting",directionality:"in"}},aJ=F`
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
`;var aX=Object.defineProperty,aZ=Object.getOwnPropertyDescriptor,aQ=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aZ(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aX(r,o,a),a};let a0=Object.freeze([["added",["+","add"]],["modified",["~","edit"]],["removed",["-","remove"]]]),a1=class extends lit_element_i{constructor(){super(...arguments),this.noTooltip=!1}render(){let t=a0.map(([t,r])=>this.renderStat(t,r));return this.noTooltip?ex`${t}<slot></slot>`:ex`<gl-tooltip>
			${t}<slot></slot>
			<div slot="content">${this.renderTooltipContent()}</div>
		</gl-tooltip>`}renderStat(t,r){let o=this[t];if(null==o)return eP;let[i,n]=r,a="icons"===this.symbol?ex`<code-icon class="icon" icon=${n}></code-icon>`:ex`<span class="symbol">${i}</span>`;return ex`<span class="stat ${t}" aria-label="${o} ${t}"
			><span class="label">${a}${o}</span></span
		>`}renderTooltipContent(){let t=this.added??0,r=this.modified??0,o=this.removed??0,i=t+r+o,n=[];t>0&&n.push(ex`<span class="added">${t} added</span>`),r>0&&(n.length&&n.push(", "),n.push(ex`<span class="modified">${r} modified</span>`)),o>0&&(n.length&&n.push(", "),n.push(ex`<span class="removed">${o} removed</span>`));let a=t>0||o>0?ex`${t_("file",i)} changed (${n})`:t_("file changed",i,{plural:"files changed",zero:"No files changed"}),c=[];null!=this.additions&&c.push(ex`<span class="added">${t_("addition",this.additions)}</span>`),null!=this.deletions&&(c.length&&c.push(", "),c.push(ex`<span class="removed">${t_("deletion",this.deletions)}</span>`));let h=[ex`<div>${a}</div>`];return c.length>0&&h.push(ex`<div>${c}</div>`),h}};a1.styles=F`
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
	`,aQ([eD({type:Number})],a1.prototype,"added",2),aQ([eD({type:Number})],a1.prototype,"modified",2),aQ([eD({type:Number})],a1.prototype,"removed",2),aQ([eD({type:Number})],a1.prototype,"additions",2),aQ([eD({type:Number})],a1.prototype,"deletions",2),aQ([eD()],a1.prototype,"symbol",2),aQ([eD({reflect:!0})],a1.prototype,"appearance",2),aQ([eD({type:Boolean,attribute:"no-tooltip"})],a1.prototype,"noTooltip",2),a1=aQ([eL("commit-stats")],a1);var a2=Object.defineProperty,a5=Object.getOwnPropertyDescriptor,a4=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?a5(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&a2(r,o,a),a};function a6(t){let r=[];return t.added&&r.push(`${t_("file",t.added)} added`),t.changed&&r.push(`${t_("file",t.changed)} changed`),t.deleted&&r.push(`${t_("file",t.deleted)} deleted`),r}let a3=class extends lit_element_i{constructor(){super(...arguments),this.showClean=!1,this.badge=!1,this.noTooltip=!1,this.hasConflicts=!1}render(){if(null!=this.pausedOpStatus)return this.renderPausedOp(this.pausedOpStatus);let t=this.added??0,r=this.modified??0,o=this.removed??0;if(this.dirty??t+r+o>0){let i=this.badge?ex`<span class="indicator-pill pill pill--outlined" aria-label="Working tree has changes">
						<code-icon icon="pencil"></code-icon>
					</span>`:ex`<commit-stats
						added=${t||eP}
						modified=${r||eP}
						removed=${o||eP}
						symbol="icons"
						appearance="pill"
						no-tooltip
					></commit-stats>`;if(this.noTooltip)return i;let n=a6({added:t,changed:r,deleted:o}),a=n.length?`${n.join(", ")} in the working tree`:"Working tree has changes";return ex`<gl-tooltip placement="bottom"
				>${i}<span slot="content">${a}</span></gl-tooltip
			>`}if(!this.showClean||null==this.dirty&&null==this.added&&null==this.modified&&null==this.removed)return eP;if(this.badge){let t=ex`<span class="indicator-pill pill pill--outlined" aria-label="No changes">
				<code-icon class="wip-clean-check" icon="check"></code-icon>
			</span>`;return this.noTooltip?t:ex`<gl-tooltip placement="bottom">${t}<span slot="content">No changes</span></gl-tooltip>`}let i=ex`<commit-stats class="indicator-pill" appearance="pill" no-tooltip aria-label="No changes">
			<code-icon class="wip-clean-check" icon="check"></code-icon>
		</commit-stats>`;return this.noTooltip?i:ex`<gl-tooltip placement="bottom">${i}<span slot="content">No changes</span></gl-tooltip>`}renderPausedOp(t){let r=aY[t.type],o=this.hasConflicts?t_("conflict",this.conflictsCount??1):r.label,i=ex`<span
			class="paused-op-badge${this.hasConflicts?" paused-op-badge--conflicts":""}"
			aria-label=${o}
		>
			<code-icon icon="warning"></code-icon>
			${o}
		</span>`;return this.noTooltip?i:ex`<gl-tooltip placement="bottom"
			>${i}<span slot="content">${r.label} in progress</span></gl-tooltip
		>`}};a3.styles=[aJ,F`
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
		`],a4([eD({type:Number})],a3.prototype,"added",2),a4([eD({type:Number})],a3.prototype,"modified",2),a4([eD({type:Number})],a3.prototype,"removed",2),a4([eD({type:Boolean})],a3.prototype,"dirty",2),a4([eD({type:Boolean,attribute:"show-clean"})],a3.prototype,"showClean",2),a4([eD({type:Boolean})],a3.prototype,"badge",2),a4([eD({type:Boolean,attribute:"no-tooltip"})],a3.prototype,"noTooltip",2),a4([eD({attribute:!1})],a3.prototype,"pausedOpStatus",2),a4([eD({type:Boolean,attribute:"has-conflicts"})],a3.prototype,"hasConflicts",2),a4([eD({type:Number,attribute:"conflicts-count"})],a3.prototype,"conflictsCount",2),a3=a4([eL("gl-wip-stats")],a3);var a8=Object.defineProperty,a7=Object.getOwnPropertyDescriptor,a9=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?a7(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&a8(r,o,a),a};let se=class extends lit_element_i{render(){return this.name?ex`<gl-tooltip .content=${this.name}>${this.renderAvatar()}</gl-tooltip>`:this.renderAvatar()}renderAvatar(){return this.href?ex`<a href=${this.href} class="avatar" part="avatar">${this.renderContent()}</a>`:ex`<span class="avatar" part="avatar">${this.renderContent()}</span>`}renderContent(){return this.src?ex`<img class="thumb thumb--media" src="${this.src}" alt="${this.name}" />`:ex`<slot class="thumb thumb--text"></slot>`}};se.styles=[F`
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
		`],a9([eD()],se.prototype,"src",2),a9([eD()],se.prototype,"name",2),a9([eD()],se.prototype,"href",2),se=a9([eL("gl-avatar")],se);var st=Object.defineProperty,sr=Object.getOwnPropertyDescriptor,so=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sr(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&st(r,o,a),a};let si=class extends lit_element_i{constructor(){super(...arguments),this.max=3,this.avatars=[]}render(){return ex`<gl-avatar-group exportparts="base">${this.renderList()}</gl-avatar-group>`}renderList(){let t=this.avatars.slice(0,this.max),r=this.avatars.slice(this.max);return ex`
			${t.map(t=>ex`<gl-avatar exportparts="avatar" .src=${t.src} .name=${t.name} .href=${t.href}
						>${!t.src?ex`<code-icon icon="account"></code-icon>`:""}</gl-avatar
					>`)}
			${it(r.length,()=>ex`<gl-popover>
						<gl-avatar exportparts="avatar" slot="anchor" class="overflow"
							>+${r.length}</gl-avatar
						>
						<div slot="content" class="overflow-list">
							${r.map(t=>ex`<gl-avatar .src=${t.src} .name=${t.name} .href=${t.href}
										>${!t.src?ex`<code-icon icon="account"></code-icon>`:""}</gl-avatar
									>`)}
						</div>
					</gl-popover>`)}
		`}};so([eD({type:Number})],si.prototype,"max",2),so([eD({type:Array})],si.prototype,"avatars",2),si=so([eL("gl-avatar-list")],si);let sn=class extends lit_element_i{render(){return ex`<div class="avatar-group" part="base"><slot></slot></div>`}};sn.styles=[F`
			.avatar-group {
				display: inline-flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}

			.avatar-group ::slotted(*:not(:first-child)) {
				margin-left: calc(var(--gl-avatar-size, 1.6rem) * -0.2);
			}

			.avatar-group:focus-within ::slotted(*),
			.avatar-group:hover ::slotted(*) {
				opacity: 0.5;
			}

			.avatar-group:focus-within ::slotted(*:focus),
			.avatar-group:hover ::slotted(*:hover) {
				z-index: var(--gl-avatar-selected-zindex, 1) !important;
				opacity: 1;
			}
		`],sn=so([eL("gl-avatar-group")],sn);var sa=Object.defineProperty,ss=Object.getOwnPropertyDescriptor,sl=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ss(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sa(r,o,a),a};let sc=class extends lit_element_i{constructor(){super(...arguments),this.dateStyle="relative",this.date=new Date,this.tooltip="",this.short=!1}get absoluteDate(){return tb(this.date,this.format??"MMMM Do, YYYY h:mma")}get dateLabel(){return"relative"===this.dateStyle?tg(this.date,this.short):this.absoluteDate}render(){return ex`<gl-tooltip content="${this.tooltip} ${this.absoluteDate}"
			><time part="base" datetime="${this.date.toISOString()}">${this.dateLabel}</time></gl-tooltip
		>`}};sl([eD()],sc.prototype,"format",2),sl([eD({attribute:"date-style"})],sc.prototype,"dateStyle",2),sl([eD({converter:{toAttribute:t=>t.getTime(),fromAttribute:(t,r)=>{let o=new Date(t);return isNaN(o.getTime())?new Date(parseInt(t,10)):o}},reflect:!0,attribute:!1})],sc.prototype,"date",2),sl([eD()],sc.prototype,"tooltip",2),sl([eD({type:Boolean})],sc.prototype,"short",2),sc=sl([eL("formatted-date")],sc);var sd=Object.defineProperty,sh=Object.getOwnPropertyDescriptor,sp=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sh(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sd(r,o,a),a};let su=class extends lit_element_i{constructor(){super(...arguments),this.size=12,this.worktree=!1,this.chevron=!1,this.onKeydown=t=>{"button"===this.appearance&&("Enter"===t.key||" "===t.key)&&(t.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}updated(t){t.has("appearance")&&("button"===this.appearance?(this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")):("button"===this.getAttribute("role")&&this.removeAttribute("role"),"0"===this.getAttribute("tabindex")&&this.removeAttribute("tabindex")))}render(){let t=this.icon??(this.worktree?"gl-worktree":"git-branch");return ex`<code-icon class="icon" icon="${t}" size="${this.size}"></code-icon
			><span class="label">${this.name??"<missing>"}</span>${this.chevron?ex`<code-icon class="chevron" icon="chevron-down" size="12"></code-icon>`:eP}`}};function sg(t,r){return ex`<gl-branch-name .name=${t} .size=${12} ?worktree=${r??!1}></gl-branch-name>`}su.styles=F`
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
	`,sp([eD({reflect:!0})],su.prototype,"appearance",2),sp([eD({type:String})],su.prototype,"name",2),sp([eD({type:Number})],su.prototype,"size",2),sp([eD({type:Boolean})],su.prototype,"worktree",2),sp([eD({type:Boolean})],su.prototype,"chevron",2),sp([eD()],su.prototype,"icon",2),su=sp([eL("gl-branch-name")],su);var sb=Object.defineProperty,sm=Object.getOwnPropertyDescriptor,sf=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sm(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sb(r,o,a),a};let sv=class extends lit_element_i{constructor(){super(...arguments),this.ahead=0,this.behind=0,this.working=0,this.alwaysShow=!1,this.outlined=!1,this.colorized=!1,this.missingUpstream=!1}render(){return 0===this.ahead&&0===this.behind&&0===this.working?this.alwaysShow?this.missingUpstream?ex`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
					<span class="state${this.colorized?" state--missing":""}"
						><code-icon icon="error"></code-icon></span
				></span>`:ex`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
				<span class="state${this.colorized?" state--ahead":""}"><code-icon icon="sync"></code-icon></span>
			</span>`:eP:ex`<span part="base" class="pill${this.outlined?" pill--outlined":""}"
			>${it(this.behind>0,()=>ex`<span class="state${this.colorized?" state--behind":""}"
						>${this.behind}<code-icon icon="arrow-down"></code-icon
					></span>`)}${it(this.ahead>0,()=>ex`<span class="state${this.colorized?" state--ahead":""}"
						>${this.ahead}<code-icon icon="arrow-up"></code-icon
					></span>`)}${it(this.working>0,()=>ex`<span class="state${this.colorized?" state--working":""}"
						>${this.working}<span class="working">&#177;</span></span
					>`)}</span
		>`}};sv.styles=[aJ,F`
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
		`],sf([eD({type:Number})],sv.prototype,"ahead",2),sf([eD({type:Number})],sv.prototype,"behind",2),sf([eD({type:Number})],sv.prototype,"working",2),sf([eD({type:Boolean,attribute:"always-show"})],sv.prototype,"alwaysShow",2),sf([eD({type:Boolean})],sv.prototype,"outlined",2),sf([eD({type:Boolean})],sv.prototype,"colorized",2),sf([eD({type:Boolean})],sv.prototype,"missingUpstream",2),sv=sf([eL("gl-tracking-pill")],sv);var sy=Object.defineProperty,sw=Object.getOwnPropertyDescriptor,s_=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sw(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sy(r,o,a),a};let sk=class extends lit_element_i{constructor(){super(...arguments),this.missingUpstream=!1,this.ahead=0,this.behind=0,this.working=0,this.outlined=!1,this.colorized=!1}render(){return this.branchName&&this.upstreamName?ex`<gl-tooltip class="tracking__pill" placement="bottom"
			><gl-tracking-pill
				class="pill"
				.ahead=${this.ahead}
				.behind=${this.behind}
				.working=${this.working}
				?outlined=${this.outlined}
				?colorized=${this.colorized}
				always-show
				?missingUpstream=${this.missingUpstream}
			></gl-tracking-pill>
			<span class="tracking__tooltip" slot="content">${this.renderDescription()}<slot name="extra"></slot></span
		></gl-tooltip>`:eP}renderDescription(){if(this.missingUpstream)return ex`${sg(this.branchName)} is missing its upstream
			${sg(this.upstreamName)}`;let t=[];return(this.behind&&t.push(`${t_("commit",this.behind)} behind`),this.ahead&&t.push(`${t_("commit",this.ahead)} ahead of`),t.length)?ex`${sg(this.branchName)} is ${t.join(", ")}
			${sg(this.upstreamName)}`:ex`${sg(this.branchName)} is up to date with ${sg(this.upstreamName)}`}};sk.styles=F`
		.tracking__pill {
			display: flex;
			flex-direction: row;
			gap: var(--gl-space-10);
		}

		.pill {
			--gl-pill-border: color-mix(in srgb, transparent 80%, var(--color-foreground));

			font-weight: 600;
		}

		.tracking__tooltip {
			display: contents;
			vertical-align: middle;
		}

		.tracking__tooltip p {
			margin-block: 0;
		}

		::slotted(p[slot='extra']) {
			margin-block: var(--gl-space-10) 0;
		}
	`,s_([eD({attribute:"branch-name"})],sk.prototype,"branchName",2),s_([eD({attribute:"upstream-name"})],sk.prototype,"upstreamName",2),s_([eD({type:Boolean,attribute:"missing-upstream"})],sk.prototype,"missingUpstream",2),s_([eD({type:Number})],sk.prototype,"ahead",2),s_([eD({type:Number})],sk.prototype,"behind",2),s_([eD({type:Number})],sk.prototype,"working",2),s_([eD({type:Boolean})],sk.prototype,"outlined",2),s_([eD({type:Boolean})],sk.prototype,"colorized",2),sk=s_([eL("gl-tracking-status")],sk);let s$=F`
	.issue-icon--opened {
		color: var(--vscode-gitlens-openAutolinkedIssueIconColor);
	}

	.issue-icon--closed {
		color: var(--vscode-gitlens-closedAutolinkedIssueIconColor);
	}
`;var sx=Object.defineProperty,sC=Object.getOwnPropertyDescriptor,sS=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sC(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sx(r,o,a),a};let sP=class extends lit_element_i{get icon(){let t="issues";if(this.state)switch(this.state){case"opened":t="issues";break;case"closed":t="pass"}return t}get classes(){return this.state?`issue-icon issue-icon--${this.state}`:"issue-icon"}get label(){return this.state?`Issue ${this.issueId?`#${this.issueId}`:""} is ${this.state}`:"Issue"}render(){return this.state?ex`<gl-tooltip>
			<code-icon class=${this.classes} icon=${this.icon} aria-label=${this.state??eP}></code-icon>
			<span slot="content">${this.label}</span>
		</gl-tooltip>`:ex`<code-icon
				class=${this.classes}
				icon=${this.icon}
				aria-label=${this.state??eP}
			></code-icon>`}};sP.styles=[s$],sS([eD()],sP.prototype,"state",2),sS([eD({attribute:"issue-id"})],sP.prototype,"issueId",2),sP=sS([eL("issue-icon")],sP);let sA=F`
	.pr-icon--opened {
		color: var(--vscode-gitlens-openPullRequestIconColor);
	}

	.pr-icon--closed {
		color: var(--vscode-gitlens-closedPullRequestIconColor);
	}

	.pr-icon--merged {
		color: var(--vscode-gitlens-mergedPullRequestIconColor);
	}

	.pr-icon--draft {
		color: var(--vscode-descriptionForeground);
	}
`;var sO=Object.defineProperty,sR=Object.getOwnPropertyDescriptor,sI=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sR(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sO(r,o,a),a};let sE=class extends lit_element_i{constructor(){super(...arguments),this.draft=!1}get icon(){let t=this.draft?"git-pull-request-draft":"git-pull-request";if(this.state)switch(this.state){case"merged":t="git-merge";break;case"closed":t="git-pull-request-closed"}return t}get classes(){return this.draft&&"opened"===this.state?"pr-icon pr-icon--draft":this.state?`pr-icon pr-icon--${this.state}`:"pr-icon"}get label(){let t=this.draft?"Draft pull request":"Pull request";return this.state?`${t} ${this.prId?`#${this.prId}`:""} is ${this.state}`:t}render(){return this.state?ex`<gl-tooltip>
			<code-icon class=${this.classes} icon=${this.icon} aria-label=${this.state??eP}></code-icon>
			<span slot="content">${this.label}</span>
		</gl-tooltip>`:ex`<code-icon
				class=${this.classes}
				icon=${this.icon}
				aria-label=${this.state??eP}
			></code-icon>`}};sE.styles=[sA],sI([eD()],sE.prototype,"state",2),sI([eD({type:Boolean})],sE.prototype,"draft",2),sI([eD({attribute:"pr-id"})],sE.prototype,"prId",2),sE=sI([eL("pr-icon")],sE);let sT=navigator?.userAgentData?.platform,sB=navigator.userAgent;"Linux"===sT||sB.includes("Linux");let sz="macOS"===sT||sB.includes("Macintosh");function sL(){return sz?"⌥":"Alt"}"Windows"===sT||sB.includes("Windows");let ModifierKeysTracker=class ModifierKeysTracker{constructor(){this._altKey=!1,this._shiftKey=!1,this._ctrlKey=!1,this._metaKey=!1,this._hosts=new Set,this._listening=!1,this._onKey=t=>{let r=t.altKey||"keydown"===t.type&&"Alt"===t.key,o=t.shiftKey||"keydown"===t.type&&"Shift"===t.key,i=t.ctrlKey||"keydown"===t.type&&"Control"===t.key,n=t.metaKey||"keydown"===t.type&&"Meta"===t.key,a=("keyup"!==t.type||"Alt"!==t.key)&&r,c=("keyup"!==t.type||"Shift"!==t.key)&&o,h=("keyup"!==t.type||"Control"!==t.key)&&i,p=("keyup"!==t.type||"Meta"!==t.key)&&n;(this._altKey!==a||this._shiftKey!==c||this._ctrlKey!==h||this._metaKey!==p)&&(this._altKey=a,this._shiftKey=c,this._ctrlKey=h,this._metaKey=p,this._notify())},this._onPointer=t=>{(this._altKey!==t.altKey||this._shiftKey!==t.shiftKey||this._ctrlKey!==t.ctrlKey||this._metaKey!==t.metaKey)&&(this._altKey=t.altKey,this._shiftKey=t.shiftKey,this._ctrlKey=t.ctrlKey,this._metaKey=t.metaKey,this._notify())},this._onVisibilityChange=()=>{"hidden"===document.visibilityState&&this._reset()}}get altKey(){return this._altKey}get shiftKey(){return this._shiftKey}get ctrlKey(){return this._ctrlKey}get metaKey(){return this._metaKey}subscribe(t){return this._hosts.add(t),this._listening||this._start(),()=>{this._hosts.delete(t),0===this._hosts.size&&this._stop()}}_start(){this._listening=!0,window.addEventListener("keydown",this._onKey,{capture:!0}),window.addEventListener("keyup",this._onKey,{capture:!0}),window.addEventListener("mousemove",this._onPointer,{capture:!0}),window.addEventListener("mouseover",this._onPointer,{capture:!0}),document.addEventListener("visibilitychange",this._onVisibilityChange)}_stop(){this._listening=!1,window.removeEventListener("keydown",this._onKey,{capture:!0}),window.removeEventListener("keyup",this._onKey,{capture:!0}),window.removeEventListener("mousemove",this._onPointer,{capture:!0}),window.removeEventListener("mouseover",this._onPointer,{capture:!0}),document.removeEventListener("visibilitychange",this._onVisibilityChange),this._reset()}_reset(){let t=this._altKey||this._shiftKey||this._ctrlKey||this._metaKey;this._altKey=this._shiftKey=this._ctrlKey=this._metaKey=!1,t&&this._notify()}_notify(){for(let t of this._hosts)t.requestUpdate()}};let sM=new ModifierKeysTracker;let ModifierKeysController=class ModifierKeysController{constructor(t){this.host=t,t.addController(this)}get altKey(){return sM.altKey}get shiftKey(){return sM.shiftKey}get ctrlKey(){return sM.ctrlKey}get metaKey(){return sM.metaKey}hostConnected(){this._unsubscribe=sM.subscribe(this.host)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}};var sD=Object.defineProperty,sF=Object.getOwnPropertyDescriptor,sj=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sF(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sD(r,o,a),a};let sN=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.disabled=!1,this._modifiers=new ModifierKeysController(this),this.handleLinkKeydown=t=>{this.effectiveHref||" "!==t.key&&"Enter"!==t.key||(t.preventDefault(),t.target.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,altKey:t.altKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey,shiftKey:t.shiftKey})))}}get isAltKeyPressed(){return this._modifiers.altKey||this._modifiers.shiftKey}get effectiveIcon(){return this.isAltKeyPressed&&this.altIcon?this.altIcon:this.icon}get effectiveTooltip(){if(this.label||this.altLabel)return this.altLabel?this.isAltKeyPressed?this.altLabel:`${this.label}
[${sL()}] ${this.altLabel}`:this.label}get effectiveLabel(){if(this.label||this.altLabel)return this.altLabel&&this.isAltKeyPressed?this.altLabel:this.label}get effectiveHref(){return this.isAltKeyPressed&&this.altHref?this.altHref:this.href}render(){return ex`
			<gl-tooltip content="${this.effectiveTooltip??eP}">
				<a
					role="${!this.effectiveHref?"button":eP}"
					type="${!this.effectiveHref?"button":eP}"
					aria-label="${this.effectiveLabel??eP}"
					?disabled=${this.disabled}
					href=${this.effectiveHref??eP}
					tabindex="0"
					@keydown=${this.handleLinkKeydown}
				>
					<span class="icon-wrapper">
						<code-icon part="icon" icon="${this.effectiveIcon}"></code-icon>
						<code-icon
							part="icon-outline"
							icon="${this.outlineIcon??this.effectiveIcon}"
							aria-hidden="true"
						></code-icon>
					</span>
				</a>
			</gl-tooltip>
		`}focus(t){this.defaultFocusEl.focus(t)}};sN.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sN.styles=F`
		:host {
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 2rem;
			height: 2rem;
			padding: var(--gl-space-2);
			vertical-align: text-bottom;
			color: var(--action-item-foreground, var(--vscode-icon-foreground));
			text-decoration: none;
			cursor: pointer;
			border-radius: var(--gl-radius-sm);
		}

		.icon-wrapper {
			position: relative;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		code-icon[part~='icon-outline'] {
			position: absolute;
			inset: 0;
			display: none;
			pointer-events: none;
		}

		:host(:focus-within) {
			${ou}
		}

		:host(:hover),
		:host(:focus-within) {
			background-color: var(--action-item-hover-background, var(--vscode-toolbar-hoverBackground));
		}

		:host(:active) {
			background-color: var(--action-item-active-background, var(--vscode-toolbar-activeBackground));
		}

		:host([disabled]) {
			pointer-events: none;
			opacity: 0.5;
		}

		a {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			color: inherit;
			text-decoration: none;
		}

		a:focus {
			outline: none;
		}

		a:is(:hover, :focus, :active) {
			text-decoration: none;
		}
	`,sj([eD()],sN.prototype,"href",2),sj([eD({attribute:"alt-href"})],sN.prototype,"altHref",2),sj([eD()],sN.prototype,"label",2),sj([eD({attribute:"alt-label"})],sN.prototype,"altLabel",2),sj([eD()],sN.prototype,"icon",2),sj([eD({attribute:"alt-icon"})],sN.prototype,"altIcon",2),sj([eD({attribute:"outline-icon"})],sN.prototype,"outlineIcon",2),sj([eD({type:Boolean})],sN.prototype,"disabled",2),sj([eN("a")],sN.prototype,"defaultFocusEl",2),sN=sj([eL("action-item")],sN);var sW=Object.defineProperty,sU=Object.getOwnPropertyDescriptor,sq=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sU(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sW(r,o,a),a};let sH=class extends lit_element_i{firstUpdated(){this.role="navigation"}disconnectedCallback(){this._slotSubscriptionsDisposer?.(),super.disconnectedCallback?.()}render(){return ex`<slot @slotchange=${this.handleSlotChange}></slot>`}handleSlotChange(t){if(this._slotSubscriptionsDisposer?.(),this.actionNodes.length<1)return;let r=this.handleKeydown.bind(this),o=`${this.actionNodes.length}`,i=this.actionNodes.map((t,i)=>(t.setAttribute("aria-posinset",`${i+1}`),t.setAttribute("aria-setsize",o),t.setAttribute("tabindex",0===i?"0":"-1"),this.actionNodes.length>=2&&t.addEventListener("keydown",r,!1),{dispose:()=>{t?.removeEventListener("keydown",r,!1)}}));this._slotSubscriptionsDisposer=()=>{i?.forEach(({dispose:t})=>t())}}handleKeydown(t){if(!t.target||null==this.actionNodes)return;let r=t.target,o=parseInt(r.getAttribute("aria-posinset")??"0",10);if("ArrowLeft"!==t.key&&"ArrowRight"!==t.key||this.actionNodes.length<2)return;let i=null;if("ArrowLeft"===t.key){let t=1===o?this.actionNodes.length-1:o-2;i=this.actionNodes[t]}else if("ArrowRight"===t.key){let t=o===this.actionNodes.length?0:o;i=this.actionNodes[t]}null!=i&&i!==r&&(t.preventDefault(),t.stopPropagation(),r.setAttribute("tabindex","-1"),i.setAttribute("tabindex","0"),i.focus())}};sH.styles=F`
		:host {
			display: flex;
			align-items: center;
			user-select: none;
		}
	`,sq([(v={flatten:!0},(t,r)=>{let{slot:o,selector:i}=v??{},n="slot"+(o?`[name=${o}]`:":not([name])");return ej(t,r,{get(){let t=this.renderRoot?.querySelector(n),r=t?.assignedElements(v)??[];return void 0===i?r:r.filter(t=>t.matches(i))}})})],sH.prototype,"actionNodes",2),sH=sq([eL("action-nav")],sH);var sG=Object.defineProperty,sK=Object.getOwnPropertyDescriptor,sV=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sK(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sG(r,o,a),a};let sY=class extends lit_element_i{constructor(){super(...arguments),this.hasChanges=!1,this.worktree=!1,this.isDefault=!1}render(){return ex`<gl-tooltip placement="bottom"
			>${this.renderIcon()}<span slot="content">${this.renderTooltipContent()}</span></gl-tooltip
		>`}renderIcon(){let t;if(!this.worktree&&(!this.status||"local"===this.status))return ex`<code-icon icon="git-branch"></code-icon>`;if("detached"===this.status)return ex`<code-icon icon="git-commit"></code-icon>`;let r="0.5";switch(this.status){case"diverged":t="var(--gl-icon-color-status-diverged)";break;case"behind":t="var(--gl-icon-color-status-behind)";break;case"ahead":t="var(--gl-icon-color-status-ahead)";break;case"missingUpstream":t="var(--gl-icon-color-status-missingUpstream)";break;case"upToDate":t=`var(--gl-icon-color-status-${this.hasChanges?"changes":"synced"})`;break;default:this.hasChanges?t="var(--gl-icon-color-status-changes)":(t="transparent",r="1")}return this.worktree&&!1===this.isDefault?eC`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="var(--gl-icon-color-foreground, #c5c5c5)"
					d="M13.5 4h.501v1.003h-.2a5.5 5.5 0 0 1 1.2.755V3.5l-.5-.5H13.5v1zm-4 0V3H7.713l-.852-.854L6.507 2H1.511l-.5.5v3.996L1 6.507v6.995l.5.5h6.227a5.528 5.528 0 0 1-.836-1H2V7.496h.01v-.489h4.486l.354-.146.858-.858h.014a5.51 5.51 0 0 1 1.477-1H7.5l-.353.147-.858.857H2.011V3H6.3l.853.853.353.146H9.5z"
				/>
				<path
					fill="${t}"
					stroke="var(--gl-icon-color-foreground, #c5c5c5)"
					stroke-width="${r}"
					d="M11.5 6.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z"
				/>
				<path stroke="var(--gl-icon-color-foreground, #c5c5c5)" d="M11.5 13v3M11.5 1v6" />
			</svg>`:eC`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="${t}"
				stroke="var(--gl-icon-color-foreground, #c5c5c5)"
				stroke-width="${r}"
				d="M12 10.25a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5z"
			/>
			<path
				fill="var(--gl-icon-color-foreground, #c5c5c5)"
				d="M6 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM5 5.95a2.5 2.5 0 1 0-1 0v4.1a2.5 2.5 0 1 0 1.165.04c.168-.38.383-.622.61-.78.327-.227.738-.32 1.214-.31H7c.387 0 .76.03 1.124.059l.026.002c.343.027.694.055 1.003.046.313-.01.661-.06.954-.248.29-.185.466-.466.544-.812a.756.756 0 0 1 .046-.055 2.5 2.5 0 1 0-1.03-.134c-.028.108-.07.14-.1.16-.063.04-.191.08-.446.089a8.783 8.783 0 0 1-.917-.045A14.886 14.886 0 0 0 7.005 8c-.61-.013-1.249.105-1.8.488-.07.05-.14.102-.205.159V5.95zm7-.45a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-9 7a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
			/>
		</svg>`}renderTooltipContent(){let t,r=this.branch?sg(this.branch):"Branch",o=this.upstream?sg(this.upstream):"its upstream";switch(this.status){case"diverged":t=ex`${r} has diverged from ${o}`;break;case"behind":t=ex`${r} is behind ${o}`;break;case"ahead":t=ex`${r} is ahead of ${o}`;break;case"missingUpstream":t=ex`${r} is missing its upstream ${o}`;break;case"upToDate":t=ex`${r} is up to date with ${o}`;break;case"local":t=ex`${r} is a local branch which hasn't been published`;break;case"remote":t=ex`${r} is a remote branch`;break;case"detached":t=ex`${r} is in a detached state, i.e. checked out to a commit or tag`;break;default:t=ex`${r} is in an unknown state`}return t=ex`<p>${t}</p>`,this.worktree?t=this.hasChanges?ex`${t}
					<p>Checked out in a worktree and has working (uncommitted) changes</p>`:ex`${t}
					<p>Checked out in a worktree</p>`:this.hasChanges&&(t=ex`${t}
				<p>Has working (uncommitted) changes</p>`),t}};sY.styles=F`
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
	`,sV([eD({type:String})],sY.prototype,"branch",2),sV([eD({type:String})],sY.prototype,"status",2),sV([eD({type:Boolean})],sY.prototype,"hasChanges",2),sV([eD({type:String})],sY.prototype,"upstream",2),sV([eD({type:Boolean})],sY.prototype,"worktree",2),sV([eD({type:Boolean,attribute:"is-default"})],sY.prototype,"isDefault",2),sY=sV([eL("gl-branch-icon")],sY);var sJ=Object.defineProperty,sX=Object.getOwnPropertyDescriptor,sZ=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sX(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sJ(r,o,a),a};let sQ=class extends lit_element_i{firstUpdated(){"alert"===this.appearance&&queueMicrotask(()=>this.button.focus())}render(){let t=null==this.state;if(this.hidden=t,!t)switch(this.state){case ii.VerificationRequired:return ex`
					<slot name="feature"></slot>
					<p class="actions-row-center">
						<gl-button
							class="inline"
							href="${ib("gitlens.plus.resendVerification",this.source)}"
							>Resend Email</gl-button
						>
						<gl-button
							class="inline"
							href="${ib("gitlens.plus.validate",this.source)}"
							><code-icon icon="refresh"></code-icon
						></gl-button>
					</p>
					<hr />
					<p class="centered">Check your inbox for a verification link, then refresh once you've verified.</p>
				`;case ii.Community:if(this.featurePreview&&"expired"!==function(t){let r=t?.usages;if(!r?.length)return"eligible";let o=(new Date(r.at(-1).expiresOn).getTime()-Date.now())/36e5;return r.length<=3&&o>0&&o<24?"active":"expired"}(this.featurePreview))return ex`${this.renderFeaturePreview(this.featurePreview)}`;return ex`<slot name="feature"></slot>
					<p class="centered">
						${"private-repos"===this.featureRestriction?"Unlock this feature for privately hosted repos with ":"Unlock this feature with "} <a href="${io.communityVsPro}">GitLens Pro</a>.
					</p>
					<p class="actions-row">
						<gl-button
							class="inline"
							href="${ib("gitlens.plus.signUp",this.source)}"
							>&nbsp;Try GitLens Pro&nbsp;</gl-button
						><span
							>or
							<a href="${ib("gitlens.plus.login",this.source)}" title="Sign In"
								>sign in</a
							></span
						>
					</p>
					<hr />
					<p class="centered">
						<a href="${io.communityVsPro}"
							>Get ${t_("day",14)} of GitLens Pro free</a
						>
						— no credit card required.
					</p>`;case ii.TrialExpired:return ex`<slot name="feature"></slot>
					<p class="centered">
						${"private-repos"===this.featureRestriction?"Unlock this feature for privately hosted repos with ":"Unlock this feature with "} <a href="${io.communityVsPro}">GitLens Pro</a>.
					</p>
					<p class="actions-row">
						<gl-button
							class="inline"
							href="${ib("gitlens.plus.upgrade",{plan:"pro",...this.source??{source:"feature-gate"}})}"
							>Upgrade to Pro</gl-button
						>
					</p>
					<hr />
					<p class="centered">
						Your trial has ended — upgrade to keep ${this.featureWithArticleIfNeeded??"all Pro features"}
						unlocked.
					</p>
					<p class="centered">${this.renderPromo()}</p>`;case ii.TrialReactivationEligible:return ex`<slot name="feature"></slot>
					<p class="actions-row">
						<gl-button
							class="inline"
							href="${ib("gitlens.plus.reactivateProTrial",this.source)}"
							>Continue</gl-button
						>
					</p>
					<hr />
					<p class="centered">
						Reactivate your Pro trial to experience
						${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} and `:""}all the new
						Pro features — free for another ${t_("day",14)}.
					</p> `}}renderFeaturePreview(t){let r=(this.appearance??"alert")==="alert"?"alert":void 0,o=t.usages.length;return 0===o?ex`<slot name="feature"></slot>
				<p class="actions-row">
					<gl-button href="${this.featurePreviewCommandLink??eP}">Continue</gl-button>
				</p>
				<hr />
				<p class="centered">
					Already have an account?
					<a href="${ib("gitlens.plus.login",this.source)}" title="Sign In">sign in</a
					><br />
					${"alert"!==r?ex`<br />`:""}
					<a href="${ib("gitlens.plus.signUp",this.source)}"
						>Want full access to all Pro features? Start your free ${14}-day Pro trial</a
					>
					— no credit card required.
				</p> `:ex`
			${this.renderFeaturePreviewStep(t,o)}
			<p class="actions-row">
				<gl-button class="inline" href="${this.featurePreviewCommandLink??eP}"
					>Continue Preview</gl-button
				><span
					>or
					<a href="${ib("gitlens.plus.login",this.source)}" title="Sign In"
						>sign in</a
					></span
				>
			</p>
			<hr />
			<p class="centered">
				${t_("day",3-o,{infix:" more "})} to preview
				${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} on `:""}privately hosted
				repos.<br />
				${"alert"!==r?ex`<br />`:""}
				<a href="${ib("gitlens.plus.signUp",this.source)}"
					>Want full access to all Pro features? Start your free ${14}-day Pro trial</a
				>
				— no credit card required.
			</p>
		`}renderFeaturePreviewStep(t,r){if("graph"!==t.feature)return ex`<slot name="feature"></slot>`;switch(r){case 1:return ex`<p>Try Commit Search</p>
							<p>
								Search for commits in your repo by author, commit message, SHA, file, change, or type.
								Turn on the commit filter to show only commits that match your query.
							</p>
							<p>
								<img
									class="preview-image"
									src="${this.webroot??""}/media/graph-commit-search.webp"
									alt="Graph Commit Search"
								/>
							</p> `;case 2:return ex`
							<p>Try the Graph Minimap</p>
							<p>
								Visualize the amount of changes to a repository over time, and inspect specific points
								in the history to locate branches, stashes, tags and pull requests.
							</p>
							<p>
								<img
									class="preview-image"
									src="${this.webroot??""}/media/graph-minimap.webp"
									alt="Graph Minimap"
								/>
							</p>
						`;default:return ex`<slot name="feature"></slot>`}}renderPromo(){return ex`<gl-promo
			.promoPromise=${this.promos.getApplicablePromo(void 0,"gate")}
			.source=${this.source}
		></gl-promo>`}};sQ.styles=[F`
			:host {
				--link-foreground: var(--vscode-textLink-foreground);
				--link-foreground-active: var(--vscode-textLink-activeForeground);
			}

			:host([appearance='alert']) {
				--link-decoration-default: underline;
				--link-foreground: color-mix(in srgb, var(--section-foreground) 50%, var(--vscode-textLink-foreground));
				--link-foreground-active: color-mix(
					in srgb,
					var(--section-foreground) 50%,
					var(--vscode-textLink-activeForeground)
				);
			}

			:host([appearance='default']) gl-button:only-child {
				width: 100%;
				max-width: 300px;
			}

			@container (max-width: 600px) {
				:host([appearance='default']) gl-button:not(.inline) {
					display: block;
					margin-right: auto;
					margin-left: auto;
				}
			}

			:host([appearance='alert']) gl-button:not(.inline) {
				display: block;
				margin-right: auto;
				margin-left: auto;
			}

			:host-context([appearance='alert']) p:first-child {
				margin-top: 0;
			}

			:host-context([appearance='alert']) p:last-child {
				margin-bottom: 0;
			}

			.centered {
				text-align: center;
			}

			.preview-image {
				width: 100%;
			}

			.actions-row {
				display: flex;
				gap: 0.6em;
				align-items: baseline;
				justify-content: center;
				white-space: nowrap;
			}

			/* Like .actions-row but center-aligned, for a row that mixes a text button with an
			   icon-only button: their baselines don't match (a text baseline vs the synthesized
			   bottom edge of the icon button's flex box), so centering the equal-height button
			   boxes is what lines them up. */
			.actions-row-center {
				display: flex;
				gap: 0.6em;
				align-items: center;
				justify-content: center;
				white-space: nowrap;
			}

			.hint {
				border-bottom: var(--gl-border-width) dashed currentcolor;
			}

			hr {
				border: none;
				border-top: var(--gl-border-width) solid
					color-mix(in srgb, var(--section-border-color) 20%, transparent);
			}
		`,iv],sZ([eN("gl-button")],sQ.prototype,"button",2),sZ([eD()],sQ.prototype,"appearance",2),sZ([eD({type:Object})],sQ.prototype,"featurePreview",2),sZ([eD()],sQ.prototype,"featurePreviewCommandLink",2),sZ([eD()],sQ.prototype,"featureRestriction",2),sZ([eD()],sQ.prototype,"featureWithArticleIfNeeded",2),sZ([O({context:"promos"})],sQ.prototype,"promos",2),sZ([eD({type:Object})],sQ.prototype,"source",2),sZ([eD({attribute:!1,type:Number})],sQ.prototype,"state",2),sZ([eD()],sQ.prototype,"webroot",2),sQ=sZ([eL("gl-feature-gate-plus-state")],sQ);let s0=F`
	:host {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		max-width: 100%;
	}

	* {
		box-sizing: border-box;
	}
`,s1=F`
	code-icon.picker-icon {
		/* margin-top: 0.4rem; */
		margin-right: -0.25rem;
		font-size: var(--gl-font-micro);
	}

	code-icon.picker-icon::before {
		margin-left: -0.4rem;
	}
`,s2=F`
	.truncated-button {
		min-width: 0;
		max-width: 100%;
	}

	gl-button[disabled] {
		cursor: default;
		opacity: 1;
	}

	.truncated-button__label {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;var s5=Object.defineProperty,s4=Object.getOwnPropertyDescriptor,s6=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?s4(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&s5(r,o,a),a};let s3=class extends lit_element_i{constructor(){super(...arguments),this.icon=!1,this.size=13,this.worktree=!1}render(){let t,r;if(null==this.ref)return eP;switch(this.ref.refType){case"branch":t=this.worktree?"worktree":"branch",r=this.worktree?"gl-worktree":"git-branch";break;case"tag":t="tag",r="tag";break;default:t="revision",r="git-commit"}return ex`${this.icon?ex`<code-icon
						class="icon${t?` ${t}`:""}"
						icon="${r}"
						size="${this.size}"
					></code-icon>`:eP}<span class="label">${this.ref.name}</span>`}};s3.styles=F`
		:host {
			box-sizing: border-box;
			display: grid;
			grid-template-columns: minmax(0, 1fr);
			align-items: center;
			min-width: 1.4rem;
			max-width: 100%;
		}

		:host([icon]) {
			grid-template-columns: auto minmax(0, 1fr);
			min-width: 1.6rem;
		}

		* {
			box-sizing: border-box;
		}

		.icon {
			flex-shrink: 0;
		}

		.icon.tag,
		.icon.worktree {
			margin-right: 0.1rem;
		}

		.label {
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: var(--font-weight, bold);
			white-space: nowrap;
		}

		/* Spacing between icon and label as a margin (not a grid gap) so that
	   when the label is hidden via display:none — e.g. the icon-only
	   collapse step in the graph header — the gap collapses with it. */
		:host([icon]) .label {
			margin-left: var(--gl-space-4);
		}
	`,s6([eD({type:Boolean,reflect:!0})],s3.prototype,"icon",2),s6([eD({type:Object})],s3.prototype,"ref",2),s6([eD({type:Number})],s3.prototype,"size",2),s6([eD({type:Boolean})],s3.prototype,"worktree",2),s3=s6([eL("gl-ref-name")],s3);var s8=Object.defineProperty,s7=Object.getOwnPropertyDescriptor,s9=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?s7(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&s8(r,o,a),a};let le=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.icon=!1,this.size=16,this.worktree=!1}render(){return ex`<gl-button
			part="button"
			appearance="toolbar"
			href=${this.href??eP}
			?disabled=${this.disabled}
			truncate
			>${null==this.ref?ex`<slot name="empty">&lt;missing&gt;</slot>`:ex`<gl-ref-name
						part="label"
						?icon=${this.icon}
						.ref=${this.ref}
						.size=${this.size}
						?worktree=${this.worktree}
					></gl-ref-name>`}<code-icon
				slot="suffix"
				class="picker-icon"
				icon="chevron-down"
				size="10"
			></code-icon
			><slot name="tooltip" slot="tooltip"></slot
		></gl-button>`}};le.styles=[s0,F`
			:host {
				--font-weight: normal;

				/* Use grid to force the min-content contribution of this host to 0,
			   then apply a configurable floor at icon + chevron + padding.
		   Without grid minmax(0, 1fr), the host's min-content resolves to
		   the full label width due to white-space: nowrap inside. */
				display: grid;
				grid-template-columns: minmax(0, 1fr);
				min-width: var(--gl-ref-button-min-width, 3.6rem);
			}

			gl-button {
				min-width: 0;
				max-width: 100%;
			}

			gl-ref-name:not([icon]) {
				padding-left: var(--gl-space-2);
			}
		`,s1],s9([eD({type:Boolean,reflect:!0})],le.prototype,"disabled",2),s9([eD({type:String,reflect:!0})],le.prototype,"href",2),s9([eD({type:Boolean,reflect:!0})],le.prototype,"icon",2),s9([eD({type:Object})],le.prototype,"ref",2),s9([eD({type:Number})],le.prototype,"size",2),s9([eD({type:Boolean})],le.prototype,"worktree",2),le=s9([eL("gl-ref-button")],le);var lt=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,lo=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lr(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lt(r,o,a),a};let li=F`
	.header__actions {
		margin-top: var(--gl-space-4);
		margin-left: auto;
	}

	.content {
		gap: var(--gl-space-6);
	}

	:host-context(.vscode-dark),
	:host-context(.vscode-high-contrast) {
		--color-status--in-sync: #0b0;
		--color-merge--clean: #0b0;
		--color-merge--conflict: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	:host-context(.vscode-light),
	:host-context(.vscode-high-contrast-light) {
		--color-status--in-sync: #0a0;
		--color-merge--clean: #0a0;
		--color-merge--conflict: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	.header__title > span {
		cursor: help;
	}

	.header__title code-icon:not(.info) {
		margin-bottom: 0.1rem;
	}

	.header__title code-icon.status--warning {
		color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	.header__title p {
		margin: 0.5rem 0 0;
	}

	.header__subtitle {
		margin: var(--gl-space-2) 0 0;
		font-size: var(--gl-font-base);
	}

	.status--conflict .icon,
	.status--conflict .status-indicator {
		color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	.status--behind .icon,
	.status--behind .status-indicator {
		color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	.status--merged .icon,
	.status--merged .status-indicator {
		color: var(--vscode-gitlens-mergedPullRequestIconColor);
	}

	.status--merged .icon {
		transform: rotateY(180deg);
	}

	.status--in-sync .status-indicator {
		color: var(--color-status--in-sync);
	}

	.status--loading {
		color: var(--color-foreground--50);
		cursor: default;
	}

	.status--merge-conflict {
		color: var(--color-merge--conflict);
	}

	.status--merge-clean {
		color: var(--color-merge--clean);
	}

	.status--merge-unknown {
		color: var(--color-foreground--50);
	}

	.status--upgrade {
		color: var(--color-foreground--50);
	}

	.status-indicator {
		margin-top: var(--gl-space-8);
		margin-left: -0.5rem;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-8);
		width: 100%;
	}

	.button-container {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-8);
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: var(--gl-space-4);
		margin-bottom: var(--gl-space-4);
	}

	.button-container gl-button {
		max-width: 30rem;
	}

	p {
		margin: 0 var(--gl-space-4);
	}

	p code-icon,
	gl-button code-icon {
		margin-bottom: 0.1rem;
	}

	details {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-4);
		padding: 0;
		margin: 0 var(--gl-space-2) var(--gl-space-4);
		overflow: hidden;
		color: var(--color-foreground--85);
		border: var(--gl-border-width) solid transparent;
	}

	details[open] {
		border: var(--gl-border-width) solid var(--vscode-sideBar-border);
		border-radius: var(--gl-radius-sm);
	}

	summary {
		position: sticky;
		top: 0;
		z-index: 1;
		padding: var(--gl-space-4) var(--gl-space-6);
		color: var(--color-foreground);
		cursor: pointer;
		list-style: none;
		transition: transform var(--gl-ease-in-out) var(--gl-duration-x-fast);
	}

	summary:hover {
		color: var(--vscode-textLink-activeForeground);
	}

	details[open] > summary {
		margin-left: 0;
		color: var(--vscode-textLink-foreground);
		background: var(--vscode-sideBar-background);
		border-radius: var(--gl-radius-sm) var(--gl-radius-sm) 0 0;
	}

	details[open] > summary code-icon {
		transform: rotate(90deg);
	}

	summary code-icon {
		transition: transform var(--gl-duration-medium);
	}

	.files {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-4);
		max-height: 8rem;
		padding: var(--gl-space-4) var(--gl-space-8);
		overflow-y: auto;
		background: var(--vscode-sideBar-background);
	}

	gl-popover {
		--max-width: 60rem;
	}

	.target-edit * {
		text-decoration: underline dotted;
		text-underline-offset: 0.3rem;
	}

	.target-edit gl-branch-name {
		margin: 0;
	}
`,ln=class extends lit_element_i{constructor(){super(...arguments),this.loading=!1}get target(){return this._target}get targetPromise(){return this._targetPromise}set targetPromise(t){if(this._targetPromise!==t){if(this._targetPromise=t,null==t){this._target=void 0;return}t.then(r=>{this._targetPromise===t&&(this._target=r)},()=>{this._targetPromise===t&&(this._target=void 0)})}}get conflictResult(){return this.target?.potentialConflicts}get conflicts(){let t=this.conflictResult;return t?.status==="conflicts"?t.conflict:void 0}get conflictError(){let t=this.conflictResult;return t?.status==="error"?t:void 0}get mergedStatus(){return this.target?.mergedStatus}get status(){return this.target?.status}get branchRef(){if(null!=this.branch)return{repoPath:this.branch.repoPath,branchId:this.branch.id,branchName:this.branch.name,worktree:this.branch.worktree?{name:this.branch.worktree.name,isDefault:this.branch.worktree.isDefault}:void 0}}get targetBranchRef(){if(null!=this.target)return{repoPath:this.target.repoPath,branchId:this.target.id,branchName:this.target.name}}render(){let t,r;return this.status||this.conflicts?(this.mergedStatus?.merged?(t="git-merge",r="merged"):this.conflicts?(t="warning",r="conflict"):(this.status?.behind??0)>0?(t="arrow-down",r="behind"):(t="check",r="in-sync"),ex`<gl-popover placement="bottom" trigger="hover click focus">
			<span slot="anchor" class="chip status--${r}" tabindex="0"
				><code-icon class="icon" icon="gl-merge-target" size="18"></code-icon
				><code-icon class="status-indicator icon--${r}" icon="${t}" size="12"></code-icon>
			</span>
			<div slot="content" class="content">${this.renderContent()}</div>
		</gl-popover>`):this.loading?ex`<gl-tooltip content="Checking merge target status…">
					<span class="chip status--loading" aria-busy="true">
						<code-icon class="icon" icon="gl-merge-target" size="18"></code-icon>
						<code-icon class="status-indicator" icon="sync" size="12"></code-icon>
					</span>
				</gl-tooltip>`:eP}renderContent(){let t=sg(this.target?.name),r=this.mergedStatus?.merged&&this.mergedStatus.localBranchOnly?{repoPath:this.branch.repoPath,branchId:this.mergedStatus.localBranchOnly.id,branchName:this.mergedStatus.localBranchOnly.name,branchUpstreamName:this.mergedStatus.localBranchOnly.upstream?.name}:this.target?{repoPath:this.target.repoPath,branchId:this.target.id,branchName:this.target.name,branchUpstreamName:void 0}:void 0;return this.mergedStatus?.merged?this.mergedStatus.localBranchOnly?ex`${this.renderHeader(`Branch ${"highest"!==this.mergedStatus.confidence?"Likely ":""}Merged Locally into Merge Target`,"git-merge")}
					<div class="body">
						<p>
							Your current branch ${sg(this.branch.name)} has
							${"highest"!==this.mergedStatus.confidence?"likely ":""}been merged into its merge
							target's local branch ${sg(this.mergedStatus.localBranchOnly.name)}.
						</p>
						<div class="button-container">
							<gl-button
								full
								href="${this._webview.createCommandLink("gitlens.pushBranch:",r)}"
								><span
									>Push ${sg(this.mergedStatus.localBranchOnly.name)}</span
								></gl-button
							>
							<gl-button
								full
								appearance="secondary"
								href="${this._webview.createCommandLink("gitlens.deleteBranchOrWorktree:",[this.branchRef,r])}"
								><span
									>Delete
									${null!=this.branch.worktree&&!this.branch.worktree.isDefault?"Worktree":"Branch"}
									${sg(this.branch.name,null!=this.branch.worktree)}</span
								></gl-button
							>
						</div>
					</div>`:ex`${this.renderHeader(`Branch ${"highest"!==this.mergedStatus.confidence?"Likely ":""}Merged into Merge Target`,"git-merge")}
				<div class="body">
					<p>
						Your current branch ${sg(this.branch.name)} has
						${"highest"!==this.mergedStatus.confidence?"likely ":""}been merged into its merge target
						${this.renderInlineTargetEdit(this.target)}.
					</p>
					<div class="button-container">
						<gl-button
							full
							href="${this._webview.createCommandLink("gitlens.deleteBranchOrWorktree:",[this.branchRef,r])}"
							><span
								>Delete
								${null!=this.branch.worktree&&!this.branch.worktree.isDefault?"Worktree":"Branch"}
								${sg(this.branch.name,null!=this.branch.worktree)}</span
							></gl-button
						>
					</div>
				</div>`:this.conflicts?ex`${this.renderHeader("Potential Conflicts with Merge Target","warning","warning")}
				<div class="body">
					${this.status?ex`<p>
								Your current branch ${sg(this.branch.name)} is
								${t_("commit",this.status.behind)} behind its merge target
								${this.renderInlineTargetEdit(this.target)}.
							</p>`:eP}
					<div class="button-container">
						<gl-button
							full
							href="${this._webview.createCommandLink("gitlens.rebaseCurrentOnto:",this.targetBranchRef)}"
							><span>Rebase ${sg(this.conflicts.branch)} onto ${t}</span></gl-button
						>
						<gl-button
							full
							appearance="secondary"
							href="${this._webview.createCommandLink("gitlens.mergeIntoCurrent:",this.targetBranchRef)}"
							><span>Merge ${t} into ${sg(this.conflicts.branch)}</span></gl-button
						>
					</div>
					<p class="status--merge-conflict">
						<code-icon icon="warning"></code-icon> Merging will cause conflicts in
						${t_("file",this.conflicts.files.length)} that will need to be resolved.
					</p>
					${this.renderFiles(this.conflicts.files)}
				</div>`:null!=this.status?this.status.behind>0?ex`${this.renderHeader(`${t_("Commit",this.status.behind)} Behind Merge Target`,"arrow-down","warning")}
					<div class="body">
						<p>
							Your current branch ${sg(this.branch.name)} is
							${t_("commit",this.status.behind)} behind its merge target
							${this.renderInlineTargetEdit(this.target)}.
						</p>
						<div class="button-container">
							<gl-button
								full
								href="${this._webview.createCommandLink("gitlens.rebaseCurrentOnto:",this.targetBranchRef)}"
								><span>Rebase ${sg(this.branch.name)} onto ${t}</span></gl-button
							>
							<gl-button
								full
								appearance="secondary"
								href="${this._webview.createCommandLink("gitlens.mergeIntoCurrent:",this.targetBranchRef)}"
								><span>Merge ${t} into ${sg(this.branch.name)}</span></gl-button
							>
						</div>
						${this.conflictError?ex`<p class="status--merge-unknown">
									<code-icon icon="error"></code-icon> Unable to detect conflicts.
								</p>`:ex`<p class="status--merge-clean">
									<code-icon icon="check"></code-icon> Merging will not cause conflicts.
								</p>`}
					</div>`:ex`${this.renderHeader("Up to Date with Merge Target","check")}
				<div class="body">
					<p>
						Your current branch ${sg(this.branch.name)} is up to date with its merge target
						${this.renderInlineTargetEdit(this.target)}.
					</p>
				</div>`:eP}renderHeader(t,r,o){return ex`<div class="header">
			<gl-tooltip class="header__title">
				<span>
					<code-icon
						icon="${r}"
						class="${(o?`status--${o}`:void 0)??eP}"
					></code-icon>
					${t}&nbsp;<code-icon class="info" icon="question" size="16"></code-icon>
				</span>
				<span slot="content"
					>${t}
					<p>
						The "merge target" is the branch that ${sg(this.branch.name)} is most likely to be
						merged into.
					</p>
				</span>
			</gl-tooltip>
			${this.renderHeaderActions()}
		</div>`}renderHeaderActions(){let t=this.branchRef,r=this.targetBranchRef;return ex`<span class="header__actions"
			>${t&&r?ex`<gl-button
							href="${this._webview.createCommandLink("gitlens.git.branch.setMergeTarget:",{...t,mergeTargetId:r.branchId,mergeTargetName:r.branchName})}"
							appearance="toolbar"
							><code-icon icon="pencil"></code-icon
							><span slot="tooltip"
								>Change Merge Target<br />${sg(this.target?.name)}</span
							></gl-button
						><gl-button
							href="${this._webview.createCommandLink("gitlens.openMergeTargetComparison:",{...t,mergeTargetId:r.branchId,mergeTargetName:r.branchName})}"
							appearance="toolbar"
							@click=${t=>this.onCompareClick(t,r.branchName)}
							><code-icon icon="git-compare"></code-icon>
							<span slot="tooltip"
								>Compare Branch with Merge Target<br />${sg(this.branch.name)}
								<code-icon icon="arrow-both" size="12"></code-icon> ${sg(this.target?.name)}</span
							>
						</gl-button>`:eP}<gl-button
				href="${this._webview.createCommandLink("gitlens.fetch:",this.targetBranchRef)}"
				appearance="toolbar"
				><code-icon icon="repo-fetch"></code-icon>
				<span slot="tooltip">Fetch Merge Target<br />${sg(this.target?.name)}</span>
			</gl-button></span
		>`}onCompareClick(t,r){let o=new CustomEvent("compare-with-merge-target",{detail:{leftRef:r,leftRefType:"branch"},bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(o),o.defaultPrevented&&t.preventDefault()}renderInlineTargetEdit(t){return ex`<gl-button
			class="target-edit"
			appearance="toolbar"
			density="compact"
			tooltip="Change Merge Target"
			href="${this._webview.createCommandLink("gitlens.git.branch.setMergeTarget:",{...this.branchRef,mergeTargetId:this.targetBranchRef.branchId,mergeTargetName:this.targetBranchRef.branchName})}"
			>${sg(t?.name)}</gl-button
		>`}renderFiles(t){return ex`
			<details>
				<summary>
					<code-icon icon="chevron-right"></code-icon>
					Show ${t.length} conflicting files
				</summary>
				<div class="files scrollable">${t.map(t=>this.renderFile(t.path))}</div>
			</details>
		`}renderFile(t){return ex`<span class="files__item"><code-icon icon="file"></code-icon> ${t}</span>`}};ln.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},ln.styles=[om,of,im,ov,li],lo([O({context:"webview"})],ln.prototype,"_webview",2),lo([eD({type:Object})],ln.prototype,"branch",2),lo([eD({type:Boolean,reflect:!0})],ln.prototype,"loading",2),lo([eF()],ln.prototype,"_target",2),lo([eD({type:Object})],ln.prototype,"targetPromise",1),ln=lo([eL("gl-merge-target-status")],ln);let la=class extends lit_element_i{render(){let t="upgrade";return ex`<gl-popover placement="bottom" trigger="hover click focus">
			<span slot="anchor" class="chip status--${t}" tabindex="0"
				><code-icon class="icon" icon="gl-merge-target" size="18"></code-icon
				><code-icon class="status-indicator icon--${t}" icon="${"warning"}" size="12"></code-icon>
			</span>
			<gl-feature-gate-plus-state
				slot="content"
				appearance="default"
				featureRestriction="all"
				.source=${{source:"home",detail:"marge-target"}}
				.state=${this.state}
			>
				<div slot="feature">
					<span class="header__title">Detect potential merge conflicts</span>

					<p>
						See when your current branch has potential conflicts with its merge target branch and take
						action to resolve them.
					</p>
				</div>
			</gl-feature-gate-plus-state>
		</gl-popover>`}};la.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},la.styles=[om,of,im,ov,li,F`
			gl-feature-gate-plus-state {
				display: block;
				margin-inline: 0.5rem;

				p {
					margin-block: var(--gl-space-10);
					margin-inline: 0;
				}
			}
		`],lo([eD({attribute:!1,type:Number})],la.prototype,"state",2),la=lo([eL("gl-merge-target-upgrade")],la);let ls=F`
	.agent-tool {
		display: inline-flex;
		gap: var(--gl-space-4);
		align-items: baseline;
		min-width: 0;
		font-size: 0.9em;
		color: var(--vscode-descriptionForeground);
	}

	.agent-tool__icon {
		flex: none;
		transform: translateY(0.15em);
	}

	.agent-tool__text {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		font-family: var(--vscode-editor-font-family, monospace);
		white-space: nowrap;
	}
`,ll=F`
	.agent-phase-elapsed {
		font-weight: normal;
		text-transform: none;
		letter-spacing: 0;
	}
`;var lc=P(518),ld=Object.defineProperty,lh=Object.getOwnPropertyDescriptor,lp=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lh(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ld(r,o,a),a};let lu=class extends lit_element_i{constructor(){super(...arguments),this.truncate=!1,this.overlay="tooltip",this.icon="",this.disabled=!1,this._modifiers=new ModifierKeysController(this)}get isAltKeyPressed(){return this._modifiers.altKey||this._modifiers.shiftKey}get effectiveIcon(){return this.isAltKeyPressed&&this.altIcon?this.altIcon:this.icon}get effectiveHref(){return this.isAltKeyPressed&&this.altHref?this.altHref:this.href}get effectiveLabel(){return this.isAltKeyPressed&&this.altLabel?this.altLabel:this.label}get effectiveTooltip(){if(this.label||this.altLabel)return this.altLabel?this.isAltKeyPressed?this.altLabel:`${this.label}
[${sL()}] ${this.altLabel}`:this.label}render(){return this.label&&"none"!==this.overlay?"popover"===this.overlay?ex`<gl-popover
				>${this.renderContent()}
				<div slot="content">${ik(this.label)}</div></gl-popover
			>`:ex`<gl-tooltip content="${this.effectiveTooltip}">${this.renderContent()}</gl-tooltip>`:this.renderContent()}renderContent(){let t="popover"===this.overlay?"anchor":eP,r=this.effectiveIcon,o=ex`<code-icon
				class="chip__icon"
				part="icon"
				icon="${r}"
				flip="${this.iconFlip??eP}"
				modifier="${("loading"===r?"spin":"")??eP}"
			></code-icon
			>${this.activeIcon?ex`<code-icon class="chip__icon-active" part="active-icon" icon="${this.activeIcon}"></code-icon>`:eP}`,i=this.effectiveHref,n=this.effectiveLabel;return i?ex`
				<a
					class="chip"
					part="base"
					?disabled=${this.disabled}
					href=${i}
					slot=${t}
					aria-label=${n??eP}
				>
					${o}<slot></slot><slot name="suffix"></slot>
				</a>
			`:ex`
			<button
				class="chip"
				part="base"
				type="button"
				?disabled=${this.disabled}
				slot=${t}
				aria-label=${n??eP}
			>
				${o}<slot></slot><slot name="suffix"></slot>
			</button>
		`}focus(t){this.defaultFocusEl.focus(t)}};lu.styles=[iv,iy,F`
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
				${ou}
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
		`],lp([eD({type:Boolean,reflect:!0})],lu.prototype,"truncate",2),lp([eD()],lu.prototype,"href",2),lp([eD({attribute:"alt-href"})],lu.prototype,"altHref",2),lp([eD()],lu.prototype,"label",2),lp([eD({attribute:"alt-label"})],lu.prototype,"altLabel",2),lp([eD()],lu.prototype,"overlay",2),lp([eD()],lu.prototype,"icon",2),lp([eD()],lu.prototype,"iconFlip",2),lp([eD({attribute:"alt-icon"})],lu.prototype,"altIcon",2),lp([eD()],lu.prototype,"activeIcon",2),lp([eD({type:Boolean})],lu.prototype,"disabled",2),lp([eN(".chip")],lu.prototype,"defaultFocusEl",2),lu=lp([eL("gl-action-chip")],lu);var lg=Object.defineProperty,lb=Object.getOwnPropertyDescriptor,lm=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lb(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lg(r,o,a),a};let lf=class extends lit_element_i{constructor(){super(...arguments),this.copyLabel="Copy",this.copiedLabel="Copied",this.disabled=!1,this.placement="top",this.timeout=1e3,this._isMouseDown=!1,this.onMouseDown=()=>{this._isMouseDown=!0,window.addEventListener("mouseup",()=>this._isMouseDown=!1,{once:!0})},this.onFocusIn=()=>{this._isMouseDown||this.tooltip?.show()},this.onFocusOut=()=>{this.tooltip?.hide()}}connectedCallback(){super.connectedCallback?.(),this.label=this.copyLabel,this.addEventListener("mousedown",this.onMouseDown),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}willUpdate(t){t.has("copyLabel")&&null==this._resetTimer&&(this.label=this.copyLabel)}disconnectedCallback(){this.cancelResetTimer(),this.removeEventListener("mousedown",this.onMouseDown),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),super.disconnectedCallback?.()}render(){return this.content||this.disabled?ex`<gl-tooltip
			tabindex="0"
			.content="${this.label}"
			placement="${this.placement??eP}"
			@click=${this.onClick}
			@keydown=${this.onKeydown}
		>
			<slot></slot>
		</gl-tooltip>`:eP}async onClick(t){if(this.cancelResetTimer(),this.content)try{await navigator.clipboard.writeText(this.content),this.label=this.copiedLabel}catch{this.label="Unable to Copy"}else this.label="Nothing to Copy";this.createResetTimer(),await this.updateComplete,await this.tooltip?.updateComplete,this.tooltip?.show()}onKeydown(t){("Enter"===t.key||" "===t.key)&&(t.preventDefault(),this.onClick(t))}cancelResetTimer(){null!=this._resetTimer&&(clearTimeout(this._resetTimer),this._resetTimer=void 0)}createResetTimer(){this._resetTimer=setTimeout(()=>{this._resetTimer=void 0,this.label=this.copyLabel},this.timeout)}};lf.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},lf.styles=F`
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
	`,lm([eD({reflect:!0})],lf.prototype,"appearance",2),lm([eD({reflect:!1})],lf.prototype,"content",2),lm([eD()],lf.prototype,"copyLabel",2),lm([eD()],lf.prototype,"copiedLabel",2),lm([eD({type:Boolean,reflect:!0})],lf.prototype,"disabled",2),lm([eD()],lf.prototype,"placement",2),lm([eD({type:Number})],lf.prototype,"timeout",2),lm([eF()],lf.prototype,"label",2),lm([eN("gl-tooltip")],lf.prototype,"tooltip",2),lf=lm([eL("gl-copy-container")],lf);var lv=Object.defineProperty,ly=Object.getOwnPropertyDescriptor,lw=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ly(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lv(r,o,a),a};let l_=class extends lit_element_i{render(){let t=this.permission;if(null==t)return eP;let r=this.resolveContent(t),o=r.tooltip?ex`<gl-tooltip content=${r.tooltip} placement="bottom">
					<div class=${r.blockClass}>${r.block}</div>
				</gl-tooltip>`:ex`<div class=${r.blockClass}>${r.block}</div>`;return ex` <div class="composite">${o}${this.renderCaptionRow(r)}</div> `}renderCaptionRow(t){return t.caption||null!=t.planActions?ex`
			<div class="caption-row">
				${t.caption?t.captionTooltip?ex`<gl-tooltip content=${t.captionTooltip} placement="bottom">
								<span class="caption">${t.caption}</span>
							</gl-tooltip>`:ex`<span class="caption">${t.caption}</span>`:eP}
				${null!=t.planActions?ex`<span class="caption-actions">
							<gl-action-chip
								icon="tasklist"
								label="View Plan"
								overlay="tooltip"
								href=${t.planActions.openHref}
							></gl-action-chip>
							<gl-copy-container
								class="caption-copy"
								.content=${t.planActions.copyContent}
								copyLabel="Copy Plan Path"
							>
								<code-icon icon="copy"></code-icon>
							</gl-copy-container>
						</span>`:eP}
			</div>
		`:eP}resolveContent(t){switch(t.kind){case"plan":{let r=t.planSummary??"Plan ready for review",o=null!=t.planFilePath?(0,lc.basename)(t.planFilePath):void 0,i=null!=t.planFilePath?{openHref:ib("gitlens.agents.openPlanFile",JSON.stringify(t.planFilePath)),copyContent:t.planFilePath}:void 0;return{block:r,blockClass:"block block--prose",caption:null!=o?`Plan: ${o}`:void 0,captionTooltip:t.planFilePath,planActions:i,tooltip:t.planSummary}}case"question":{let r=t.questionText??"Awaiting your answer",o=t.questionCount??0;return{block:r,blockClass:"block block--prose",caption:o>1?`1 of ${o} questions`:1===o?"1 question":void 0,captionTooltip:void 0,planActions:void 0,tooltip:t.questionText}}case"elicitation":return{block:t.toolName||"Input required",blockClass:"block block--prose",caption:"Awaiting input",captionTooltip:void 0,planActions:void 0,tooltip:void 0};default:{let r=t.toolDescription||t.toolName;return{block:r,blockClass:"block block--code",caption:t.toolInputDescription,captionTooltip:void 0,planActions:void 0,tooltip:r}}}}};l_.styles=F`
		:host {
			display: block;
			min-width: 0;
		}

		.composite {
			display: flex;
			flex-direction: column;
			gap: var(--gl-space-2);
			min-width: 0;
			padding: 0.4rem 0.5rem;
			background-color: color-mix(in srgb, var(--vscode-foreground) 8%, transparent);
			border-radius: var(--gl-radius-sm);
		}

		.block {
			display: -webkit-box;
			min-width: 0;
			overflow: hidden;
			-webkit-line-clamp: 2;
			font-size: 0.85em;
			overflow-wrap: anywhere;
			-webkit-box-orient: vertical;
		}

		.block--code {
			font-family: var(--vscode-editor-font-family, monospace);
			word-break: break-all;
		}

		.block--prose {
			font-style: italic;
			color: var(--vscode-foreground);
		}

		.caption-row {
			display: flex;
			gap: var(--gl-space-4);
			align-items: center;
			min-width: 0;
		}

		.caption {
			flex: 1 1 auto;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 0.8em;
			color: var(--vscode-descriptionForeground);
			white-space: nowrap;
		}

		.caption-actions {
			display: inline-flex;
			flex: none;
			gap: var(--gl-space-2);
			align-items: center;
		}

		/* gl-copy-container hosts a bare code-icon — give it the same hover affordance the
	   sibling gl-action-chip has so the two buttons read as a matched pair. */
		.caption-copy {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 2rem;
			height: 2rem;
			color: inherit;
			cursor: pointer;
			border-radius: var(--gl-radius-sm);
		}

		.caption-copy:hover {
			background-color: var(--vscode-toolbar-hoverBackground);
		}
	`,lw([eD({attribute:!1})],l_.prototype,"permission",2),l_=lw([eL("gl-agent-prompt-detail")],l_);var lk=Object.defineProperty,l$=Object.getOwnPropertyDescriptor,lx=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?l$(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lk(r,o,a),a};function lC(t){if(null==t)return;let r="number"==typeof t?t:t.getTime(),o=Math.floor((Date.now()-r)/1e3);if(o<60)return`${o}s`;let i=Math.floor(o/60);if(i<60)return`${i}m ${o%60}s`;let n=Math.floor(i/60);return`${n}h ${i%60}m`}let lS=class extends lit_element_i{constructor(){let t,r;super(...arguments),this.full=!1,this._stickyResolver=(t=(void 0)??7e3,r=new Map,{resolveLiveTool:o=>{let i=o.id,n=performance.now();if("working"===o.phase&&"tool_use"===o.status&&null!=o.statusDetail)return r.set(i,{detail:o.statusDetail,phase:o.phase,until:n+t}),o.statusDetail;if("working"===o.phase){let t=r.get(i);return t?.phase===o.phase&&t.until>n?t.detail:void(null!=t&&r.delete(i))}r.delete(i)},evict:t=>{r.delete(t)},prune:t=>{if(0===r.size)return;let o=t instanceof Set?t:new Set(t);for(let t of r.keys())o.has(t)||r.delete(t)},get size(){return r.size}})}onActionMouseDown(t){t.stopPropagation()}willUpdate(t){this.toggleAttribute("full-active",this.full&&null==this.summary&&null!=this.session)}updated(t){0!==this._stickyResolver.size&&(null!=this.summary?this._stickyResolver.prune(this.summary.sessions.map(t=>t.id)):null!=this.session?this._stickyResolver.prune([this.session.id]):this._stickyResolver.prune([]))}render(){if(null!=this.summary)return this.renderSummary();let t=this.session;if(null==t)return eP;let r=oX[t.phase],o=t.pendingPermission,i=oQ(r,o),n="needs-input"===r&&null!=o;return ex`
			<gl-popover placement="bottom">
				<span slot="anchor" class=${`pill ${r?`pill--${r}`:""}`.trim()} tabindex="0">
					<span class="pill__label">
						<span class="pill__dot"></span>
						${i}
					</span>
					${this.full?this.renderInlineActions(t,r,n):eP}
				</span>
				<div slot="content" class="hover-card" tabindex="-1">
					${this.renderHoverContent(t,r,this.full)}
				</div>
			</gl-popover>
		`}renderSummary(){let{category:t,sessions:r}=this.summary,o=oZ(t),i=r.length,n=i>1?`${o} \xb7 ${i}`:o;return ex`
			<gl-popover placement="bottom">
				<span slot="anchor" class=${`pill pill--${t}`} tabindex="0">
					<span class="pill__label">
						<span class="pill__dot"></span>
						${n}
					</span>
				</span>
				<div slot="content" class="hover-card" tabindex="-1">
					<div class="hover-summary">${r.map(r=>this.renderSummaryRow(r,t))}</div>
				</div>
			</gl-popover>
		`}renderSummaryRow(t,r){let o=function(t){if(null==t)return;let r="number"==typeof t?t:t.getTime(),o=Math.max(0,Math.floor((Date.now()-r)/1e3));if(o<60)return`${o}s`;let i=Math.floor(o/60);if(i<60)return`${i}m`;let n=Math.floor(i/60),a=i%60;return a>0?`${n}h ${a}m`:`${n}h`}(t.phaseSince),i=oQ(r,t.pendingPermission),n=this._stickyResolver.resolveLiveTool(t),a=null!=n?void 0:function(t,r,o,i={}){let n=i.awaitingPrefix??"long",a=i.idleFallback??"lastActive",c=t.pendingPermission;if("needs-input"===r&&null!=c){var h=c,p=n;switch(h.kind){case"plan":return h.planSummary?`${"long"===p?"Plan ready:":"Plan:"} ${h.planSummary}`:"Plan ready for review";case"question":{let t=h.questionText??"Awaiting your answer",r=h.questionCount??0;if(r>1)return`${"long"===p?"Question:":"Q:"} ${t} (1 of ${r})`;return`${"long"===p?"Question:":"Q:"} ${t}`}case"elicitation":return h.toolName?`Awaiting input: ${h.toolName}`:"Awaiting input";default:if(!h.toolName)return"Awaiting permission";return`${"long"===p?"Awaiting permission:":"Awaiting:"} ${h.toolName}${h.toolDescription?` \u2014 ${h.toolDescription}`:""}`}}return"working"===r&&"tool_use"===t.status&&t.statusDetail?t.statusDetail:"none"!==a?"lastActive"===a&&null!=o?`Last active ${o} ago`:t.lastPrompt||void 0:void 0}(t,r,o,{awaitingPrefix:"short",idleFallback:"lastPrompt"});return ex`
			<div class="hover-summary-row">
				<span class=${`hover-summary-row__dot hover-summary-row__dot--${r}`}></span>
				<gl-tooltip content=${t.displayName} placement="bottom">
					<span class="hover-summary-row__name">${t.displayName}</span>
				</gl-tooltip>
				<span class=${`hover-summary-row__phase hover-summary-row__phase--${r}`}>
					${i}${null!=o?ex` · <span class="agent-phase-elapsed">${o}</span>`:""}
				</span>
				${this.renderSummaryRowDetail(n,a)}
			</div>
		`}renderSummaryRowDetail(t,r){if(null!=t)return ex`<span class="hover-summary-row__tool">${null==t?eP:ex`<gl-tooltip content=${t} placement="bottom">
		<span class="agent-tool">
			<code-icon class="agent-tool__icon" icon="tools"></code-icon>
			<span class="agent-tool__text">${t}</span>
		</span>
	</gl-tooltip>`}</span>`;return r?ex`<gl-tooltip content=${r} placement="bottom">
				<span class="hover-summary-row__detail">${r}</span>
			</gl-tooltip>`:eP}renderHoverContent(t,r,o){switch("working"!==r&&this._stickyResolver.evict(t.id),r){case"working":return this.renderWorkingHover(t,o);case"needs-input":return this.renderNeedsInputHover(t,o);case"idle":return this.renderIdleHover(t,o)}}renderInlineActions(t,r,o){let i=ib("gitlens.agents.openSession",JSON.stringify(t.id));if("needs-input"===r&&o){let r=t.pendingPermission,o=ib("gitlens.agents.resolvePermission",{sessionId:t.id,decision:"allow"}),n=ib("gitlens.agents.resolvePermission",{sessionId:t.id,decision:"deny"}),a="tool"===r.kind&&null!=r.suggestions&&r.suggestions.length>0?ib("gitlens.agents.resolvePermission",{sessionId:t.id,decision:"allow",alwaysAllow:!0}):void 0,c="plan"===r.kind?"Approve Plan":"Allow",h="plan"===r.kind?"Reject Plan":"Deny";return ex`
				<action-nav class="pill__actions" @mousedown=${this.onActionMouseDown}>
					<action-item label=${c} icon="check" href=${o}></action-item>
					<action-item label=${h} icon="x" href=${n}></action-item>
					${this.renderMoreActionsMenu(i,a)}
				</action-nav>
			`}return ex`
			<action-nav class="pill__actions" @mousedown=${this.onActionMouseDown}>
				<action-item label="Open Session" icon="link-external" href=${i}></action-item>
			</action-nav>
		`}renderWorkingHover(t,r){let o=lC(t.phaseSince),i=ib("gitlens.agents.openSession",JSON.stringify(t.id)),n=this._stickyResolver.resolveLiveTool(t);return ex`
			<div class="hover-header">
				<span class="hover-header__dot hover-header__dot--working"></span>
				<span class="hover-header__text">${t.displayName}</span>
				${null!=o?ex`<span class="hover-header__elapsed">${o}</span>`:eP}
			</div>
			${t.lastPrompt?ex`
						<div class="hover-section">
							<span class="hover-section__label">Last Prompt</span>
							<span class="hover-prompt">${t.lastPrompt}</span>
						</div>
					`:eP}
			${null!=n?ex`
						<div class="hover-section">
							<span class="hover-section__label">Current Tool</span>
							<span class="hover-section__value">${n}</span>
						</div>
					`:eP}
			${r?eP:ex`
						<div class="hover-actions" @mousedown=${this.onActionMouseDown}>
							<gl-button appearance="secondary" full density="compact" href=${i}>
								<code-icon icon="link-external" slot="prefix"></code-icon>
								Open Session
							</gl-button>
						</div>
					`}
		`}renderNeedsInputHover(t,r){let o=lC(t.phaseSince),i=t.pendingPermission,n=ib("gitlens.agents.openSession",JSON.stringify(t.id)),a=null!=i,c=a?ib("gitlens.agents.resolvePermission",{sessionId:t.id,decision:"allow"}):void 0,h=a&&"tool"===i.kind&&null!=i.suggestions&&i.suggestions.length>0?ib("gitlens.agents.resolvePermission",{sessionId:t.id,decision:"allow",alwaysAllow:!0}):void 0,p=a?ib("gitlens.agents.resolvePermission",{sessionId:t.id,decision:"deny"}):void 0,u=a&&"plan"===i.kind?"Approve Plan":"Allow",g=a&&"plan"===i.kind?"Reject Plan":"Deny";return ex`
			<div class="hover-header">
				<span class="hover-header__dot hover-header__dot--needs-input"></span>
				<span class="hover-header__text">${t.displayName}</span>
				${null!=o?ex`<span class="hover-header__elapsed">${o}</span>`:eP}
			</div>
			${null!=i?ex`
						<div class="hover-section">
							<span class="hover-section__label">Request</span>
							<gl-agent-prompt-detail .permission=${i}></gl-agent-prompt-detail>
						</div>
					`:eP}
			${t.lastPrompt?ex`
						<div class="hover-section">
							<span class="hover-section__label">Last Prompt</span>
							<span class="hover-prompt">${t.lastPrompt}</span>
						</div>
					`:eP}
			${r?eP:a?ex`
							<div class="hover-actions" @mousedown=${this.onActionMouseDown}>
								<div class="hover-actions__row">
									<gl-button full density="compact" href=${c}>
										<code-icon icon="check" slot="prefix"></code-icon>
										${u}
									</gl-button>
									<gl-button
										appearance="secondary"
										full
										density="compact"
										variant="danger"
										href=${p}
									>
										<code-icon icon="x" slot="prefix"></code-icon>
										${g}
									</gl-button>
									${this.renderMoreActionsMenu(n,h)}
								</div>
							</div>
						`:ex`
							<div class="hover-actions" @mousedown=${this.onActionMouseDown}>
								<gl-button appearance="secondary" full density="compact" href=${n}>
									<code-icon icon="link-external" slot="prefix"></code-icon>
									Open Session
								</gl-button>
							</div>
						`}
		`}renderMoreActionsMenu(t,r){return ex`
			<gl-popover placement="bottom-end" trigger="click">
				<action-item slot="anchor" label="More actions" icon="ellipsis"></action-item>
				<div slot="content" class="more-menu" role="menu" @mousedown=${this.onActionMouseDown}>
					${null!=r?ex`<a class="more-menu__item" role="menuitem" href=${r}>
								<code-icon icon="check-all"></code-icon>
								<span>Always Allow</span>
							</a>`:eP}
					<a class="more-menu__item" role="menuitem" href=${t}>
						<code-icon icon="link-external"></code-icon>
						<span>Open Session</span>
					</a>
				</div>
			</gl-popover>
		`}renderIdleHover(t,r){let o=ib("gitlens.agents.openSession",JSON.stringify(t.id));return ex`
			<div class="hover-header">
				<span class="hover-header__dot hover-header__dot--idle"></span>
				<span class="hover-header__text">${t.displayName}</span>
			</div>
			${t.lastPrompt?ex`
						<div class="hover-section">
							<span class="hover-section__label">Last Prompt</span>
							<span class="hover-prompt">${t.lastPrompt}</span>
						</div>
					`:eP}
			${r?eP:ex`
						<div class="hover-actions" @mousedown=${this.onActionMouseDown}>
							<gl-button appearance="secondary" full density="compact" href=${o}>
								<code-icon icon="link-external" slot="prefix"></code-icon>
								Open Session
							</gl-button>
						</div>
					`}
		`}};lS.styles=[om,of,ls,ll,F`
			:host {
				display: inline-block;
				--max-width: 30rem;

				/* Phase colors — pulled from the unified --gl-agent-working-color /
		   --gl-agent-waiting-color / --gl-agent-idle-color palette in theme.scss so the
		   pill, card, sidebar leaf, tooltip, and WIP file decoration all share one
		   source of truth. Local *-bg / *-border derivations stay because the pill
		   applies different opacity envelopes than other surfaces. */
				--gl-agent-pill-working-color: var(--gl-agent-working-color);
				--gl-agent-pill-working-bg: color-mix(in srgb, var(--gl-agent-pill-working-color) 10%, transparent);
				--gl-agent-pill-working-border: color-mix(in srgb, var(--gl-agent-pill-working-color) 50%, transparent);

				/* Needs Input border is brighter than the other categories (75% vs. 50%/35%) so the
		   static state already communicates "this one's different" before the breathing
		   animation kicks in. */
				--gl-agent-pill-attention-color: var(--gl-agent-waiting-color);
				--gl-agent-pill-attention-bg: color-mix(in srgb, var(--gl-agent-pill-attention-color) 10%, transparent);
				--gl-agent-pill-attention-bg-peak: color-mix(
					in srgb,
					var(--gl-agent-pill-attention-color) 22%,
					transparent
				);
				--gl-agent-pill-attention-border: color-mix(
					in srgb,
					var(--gl-agent-pill-attention-color) 75%,
					transparent
				);

				/* Idle (muted) */
				--gl-agent-pill-idle-color: var(--gl-agent-idle-color);
				--gl-agent-pill-idle-bg: color-mix(in srgb, var(--gl-agent-pill-idle-color) 10%, transparent);
				--gl-agent-pill-idle-border: color-mix(in srgb, var(--gl-agent-pill-idle-color) 35%, transparent);
			}

			/* Pill badge */
			.pill {
				/* border-box so the 1px border counts inside the 100% width — without it the pill
		   bleeds 2px past its container in full mode. */
				box-sizing: border-box;
				display: inline-flex;
				align-items: center;
				padding: 0.1rem 0.6rem;
				font-size: 0.85em;
				font-weight: 500;
				line-height: normal;
				white-space: nowrap;
				cursor: default;
				border: var(--gl-border-width) solid transparent;
				border-radius: var(--gl-radius-sm);
				transition:
					background-color var(--gl-duration-slow) ease,
					border-color var(--gl-duration-slow) ease,
					color var(--gl-duration-slow) ease;
			}

			.pill__label {
				display: inline-flex;
				gap: var(--gl-space-4);
				align-items: center;
				min-width: 0;
			}

			.pill__dot {
				flex: none;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				transition: background-color var(--gl-duration-slow) ease;
			}

			/* Full mode — pill grows to fill its container and surfaces inline actions on the
	   right of the label. The popover anchor still wraps the whole pill so hover/focus
	   keeps surfacing the rich detail (without duplicating the action row).
	   full-active is a host-managed attribute, distinct from the public full prop, so the
	   needs-input + !canResolve fallback can still render compact even when the consumer
	   requested full. */
			:host([full-active]) {
				display: block;
				width: 100%;
			}

			:host([full-active]) gl-popover {
				display: block;
				--gl-popover-anchor-width: 100%;
			}

			:host([full-active]) .pill {
				display: flex;
				justify-content: space-between;
				width: 100%;
				padding: 0.3rem 0.6rem;
			}

			.pill__actions {
				flex: none;

				/* Tighten the inline action row so it sits flush with the pill's right padding
		   instead of stretching the pill height. action-nav is a flex container itself —
		   we just nudge gap and offset here. */
				gap: 0.1rem;
				margin-inline-end: -0.3rem;
			}

			.pill__actions action-item {
				width: 1.8rem;
				height: 1.8rem;
				color: inherit;
				border-radius: var(--gl-radius-sm);
			}

			/* Background-only animation (no box-shadow) so it doesn't get clipped by ancestors
	   with overflow: hidden. */
			.pill--working .pill__dot {
				animation: gl-agent-pill-pulse 1.5s ease 0s infinite;
			}

			@keyframes gl-agent-pill-pulse {
				0% {
					box-shadow: 0 0 0 0 var(--pill-pulse-color, transparent);
				}

				70% {
					box-shadow: 0 0 0 5px transparent;
				}

				100% {
					box-shadow: 0 0 0 0 transparent;
				}
			}

			.pill--needs-input {
				animation: gl-agent-pill-breathing 3.5s var(--gl-ease-in-out) 0s infinite;
			}

			@keyframes gl-agent-pill-breathing {
				0%,
				100% {
					background-color: var(--gl-agent-pill-attention-bg);
				}

				50% {
					background-color: var(--gl-agent-pill-attention-bg-peak);
				}
			}

			/* Working */
			.pill--working {
				color: var(--gl-agent-pill-working-color);
				background-color: var(--gl-agent-pill-working-bg);
				border-color: var(--gl-agent-pill-working-border);
			}

			.pill--working .pill__dot {
				background-color: var(--gl-agent-pill-working-color);
				--pill-pulse-color: color-mix(in srgb, var(--gl-agent-pill-working-color) 50%, transparent);
			}

			/* Needs Input */
			.pill--needs-input {
				color: var(--gl-agent-pill-attention-color);
				background-color: var(--gl-agent-pill-attention-bg);
				border-color: var(--gl-agent-pill-attention-border);
			}

			.pill--needs-input .pill__dot {
				background-color: var(--gl-agent-pill-attention-color);
			}

			/* Idle */
			.pill--idle {
				color: var(--gl-agent-pill-idle-color);
				background-color: var(--gl-agent-pill-idle-bg);
				border-color: var(--gl-agent-pill-idle-border);
			}

			.pill--idle .pill__dot {
				background-color: var(--gl-agent-pill-idle-color);
			}

			@media (prefers-reduced-motion: reduce) {
				.pill,
				.pill__dot {
					transition: none;
				}

				.pill--working .pill__dot,
				.pill--needs-input {
					animation: none;
				}
			}

			/* Popover content */
			.hover-card {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-6);
				min-width: 16rem;
				white-space: normal;
			}

			.hover-header {
				display: flex;
				gap: 0.5rem;
				align-items: center;
			}

			.hover-header__dot {
				flex: none;
				width: 8px;
				height: 8px;
				border-radius: 50%;
			}

			.hover-header__dot--working {
				background-color: var(--gl-agent-pill-working-color);
			}

			.hover-header__dot--needs-input {
				background-color: var(--gl-agent-pill-attention-color);
			}

			.hover-header__dot--idle {
				background-color: var(--gl-agent-pill-idle-color);
			}

			.hover-header__text {
				flex: 1;
				min-width: 0;
				font-weight: 500;
			}

			.hover-header__elapsed {
				flex: none;
				font-size: 0.9em;
				color: var(--vscode-descriptionForeground);
			}

			.hover-section {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-2);
			}

			.hover-section__label {
				font-size: 0.8em;
				color: var(--vscode-descriptionForeground);
				text-transform: uppercase;
				opacity: 0.7;
			}

			.hover-prompt {
				display: -webkit-box;
				overflow: hidden;
				-webkit-line-clamp: 3;
				font-size: 0.9em;
				color: var(--vscode-descriptionForeground);
				overflow-wrap: anywhere;
				-webkit-box-orient: vertical;
			}

			.hover-actions {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-4);
				margin-top: var(--gl-space-2);
			}

			.hover-actions__row {
				display: flex;
				flex-direction: row;
				gap: var(--gl-space-4);
			}

			.hover-actions__row > gl-button {
				/* min-width: max-content keeps Allow / Deny from shrinking below their icon+label
		   content when the popover is anchored in a narrow sidebar — the popover body
		   grows horizontally to fit instead. flex: 1 1 0 keeps the row evenly distributed
		   when there's slack. */
				flex: 1 1 0;
				min-width: max-content;
			}

			.hover-actions__row > gl-popover {
				flex: 0 0 auto;
			}

			/* "…" overflow menu — anchored off the third action button. */
			.more-menu {
				display: flex;
				flex-direction: column;
				min-width: 14rem;
				padding: var(--gl-space-2);
			}

			.more-menu__item {
				display: flex;
				gap: var(--gl-space-6);
				align-items: center;
				padding: var(--gl-space-4) var(--gl-space-6);
				font-size: 0.95em;
				color: var(--vscode-foreground);
				text-decoration: none;
				cursor: pointer;
				border-radius: var(--gl-radius-sm);
			}

			.more-menu__item:hover {
				color: var(--vscode-list-hoverForeground, var(--vscode-foreground));
				text-decoration: none;
				background-color: var(--vscode-list-hoverBackground);
			}

			.more-menu__item code-icon {
				flex: none;
				color: var(--vscode-descriptionForeground);
			}

			.hover-summary {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-6);
				min-width: 24rem;
				max-width: min(44rem, 60vw);
				max-height: 28rem;
				overflow-y: auto;
			}

			.hover-summary-row {
				display: grid;

				/* minmax(0, 1fr) lets the name column shrink below its min-content size, enabling
		   ellipsis on long session names. Right column auto-sizes to the phase label. */
				grid-template-columns: auto minmax(0, 1fr) auto;
				gap: 0.1rem 0.6rem;
				align-items: center;
			}

			.hover-summary-row + .hover-summary-row {
				padding-top: var(--gl-space-6);
				border-top: var(--gl-border-width) solid
					var(--vscode-widget-border, color-mix(in srgb, var(--vscode-foreground) 15%, transparent));
			}

			.hover-summary-row__dot {
				flex: none;
				width: 0.7rem;
				height: 0.7rem;
				border-radius: 50%;
			}

			.hover-summary-row__dot--working {
				background-color: var(--gl-agent-pill-working-color);
			}

			.hover-summary-row__dot--needs-input {
				background-color: var(--gl-agent-pill-attention-color);
			}

			.hover-summary-row__dot--idle {
				background-color: var(--gl-agent-pill-idle-color);
			}

			.hover-summary-row__name {
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				font-weight: 600;
				white-space: nowrap;
			}

			.hover-summary-row__phase {
				font-size: 0.85em;
				color: var(--vscode-descriptionForeground);
				text-transform: uppercase;
				letter-spacing: 0.04em;
				white-space: nowrap;
			}

			.hover-summary-row__phase--needs-input {
				font-weight: 600;
				color: var(--gl-agent-pill-attention-color);
			}

			.hover-summary-row__detail {
				grid-column: 2 / -1;
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 0.9em;
				color: var(--vscode-descriptionForeground);
				white-space: nowrap;
			}

			/* Summary-row tool detail places the shared .agent-tool composite into the row's
	   second grid cell — visual styling lives in the shared agentToolStyles. */
			.hover-summary-row__tool {
				grid-column: 2 / -1;
			}
		`],lx([eD({type:Object})],lS.prototype,"session",2),lx([eD({attribute:!1})],lS.prototype,"summary",2),lx([eD({type:Boolean,reflect:!0})],lS.prototype,"full",2),lS=lx([eL("gl-agent-status-pill")],lS);let lP=F`
	:host {
		--gl-color-mix-base: var(
			--gl-card-background,
			color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%)
		);
	}

	.card {
		position: relative;
		display: block;
		flex-direction: column;
		gap: var(--gl-space-8);
		padding: var(--gl-space-8) var(--gl-space-12);
		margin-block-end: var(--gl-space-6);

		/* border-inline-end: 0.3rem solid transparent; */
		background-color: var(--gl-card-background, color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%));
		border-inline-start: 0.3rem solid transparent;
		border-radius: var(--gl-radius-sm);
	}

	:host-context(.vscode-dark) .card.is-base,
	:host-context(.vscode-high-contrast) .card.is-base {
		border-inline-start-color: color-mix(in lab, var(--gl-color-mix-base) 100%, #fff 7%);
	}

	:host-context(.vscode-light) .card.is-base,
	:host-context(.vscode-high-contrast-light) .card.is-base {
		border-inline-start-color: color-mix(in lab, var(--gl-color-mix-base) 100%, #000 5%);
	}

	.card.is-active {
		border-inline-start-color: var(--gl-card-indicator-border, var(--vscode-gitDecoration-addedResourceForeground));
	}

	.card.is-cherry-picking,
	.card.is-merging,
	.card.is-rebasing,
	.card.is-reverting {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor)
		);
	}

	.card.is-conflict {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor)
		);
	}

	.card.is-issue-open {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-openAutolinkedIssueIconColor) 0%, transparent)
		);
	}

	.card.is-issue-closed {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-closedAutolinkedIssueIconColor) 0%, transparent)
		);
	}

	.card.is-pr-open {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-openPullRequestIconColor) 0%, transparent)
		);
	}

	.card.is-pr-closed {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-closedPullRequestIconColor) 0%, transparent)
		);
	}

	.card.is-pr-merged {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-mergedPullRequestIconColor) 0%, transparent)
		);
	}

	.card.is-mergeable {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(var(--vscode-gitlens-launchpadIndicatorMergeableColor))
		);
	}

	.card.is-blocked {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-launchpadIndicatorBlockedColor)
		);
	}

	.card.is-attention {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-launchpadIndicatorAttentionColor)
		);
	}

	.card.is-branch-merged {
		border-inline-start-color: var(--gl-card-indicator-border, var(--vscode-gitlens-mergedPullRequestIconColor));
	}

	.card.is-branch-synced {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-decorations\\.branchUpToDateForegroundColor) 20%, transparent)
		);
	}

	.card.is-branch-diverged {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-decorations\\.branchDivergedForegroundColor) 70%, transparent)
		);
	}

	.card.is-branch-behind {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.branchBehindForegroundColor)
		);
	}

	.card.is-branch-ahead {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.branchBehindForegroundColor)
		);
	}

	.card.is-info,
	.card.is-branch-changes {
		border-inline-start-color: var(--gl-card-indicator-border, color-mix(in lab, #1a79ff 80%, transparent));
	}

	.card.is-branch-missingUpstream {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.branchMissingUpstreamForegroundColor)
		);
	}

	.card--focusable {
		cursor: pointer;
	}

	.card--focusable:focus,
	.card:focus-within,
	.card:hover {
		background-color: var(
			--gl-card-hover-background,
			color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 8%)
		);
	}

	.card--focusable:focus-visible {
		outline: var(--gl-border-width) solid var(--vscode-focusBorder);
	}

	.card__actions {
		position: absolute;
		top: 0.4rem;
		right: 0.4rem;
		display: block;
	}

	.card__content {
		display: block;
	}

	.card__content::slotted(:first-child) {
		margin-block-start: 0;
	}

	.card__content::slotted(:last-child) {
		margin-block-end: 0;
	}

	:host-context(.vscode-dark) .card--grouping-item,
	:host-context(.vscode-high-contrast) .card--grouping-item {
		--gl-card-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%);
		--gl-card-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 1.5%);
	}

	:host-context(.vscode-light) .card--grouping-item,
	:host-context(.vscode-high-contrast-light) .card--grouping-item {
		--gl-card-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 8%);
		--gl-card-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 10%);
	}

	.card--grouping-item-primary {
		--gl-card-background: transparent;
		--gl-card-hover-background: transparent;
	}

	.card--density-tight {
		padding: 0;
	}
`;var lA=Object.defineProperty,lO=Object.getOwnPropertyDescriptor,lR=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lO(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lA(r,o,a),a};let lI=class extends lit_element_i{constructor(){super(...arguments),this._focusable=!1}get focusable(){return null!=this.href||this._focusable}set focusable(t){let r=this._focusable;this._focusable=t,this.requestUpdate("focusable",r)}get classNames(){return{card:!0,"card--focusable":this.focusable,[`card--grouping-${this.grouping}`]:null!=this.grouping,[`card--density-${this.density}`]:null!=this.density,[`is-${this.indicator}`]:null!=this.indicator}}render(){return null!=this.href?ex`<a part="base" class=${nU(this.classNames)} href=${this.href}
				>${this.renderContent()}</a
			>`:ex`<div part="base" tabindex=${this.focusable?0:-1} class=${nU(this.classNames)}>
			${this.renderContent()}
		</div>`}renderContent(){return ex`
			<slot class="card__content"></slot>
			<slot name="actions" class="card__actions"></slot>
		`}focus(t){null!=this.href?this.shadowRoot?.querySelector("a")?.focus(t):super.focus(t)}};lI.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},lI.styles=[lP],lR([eD({reflect:!0})],lI.prototype,"indicator",2),lR([eD({reflect:!0})],lI.prototype,"grouping",2),lR([eD({reflect:!0})],lI.prototype,"density",2),lR([eD()],lI.prototype,"href",2),lR([eD({type:Boolean,reflect:!0})],lI.prototype,"focusable",1),lI=lR([eL("gl-card")],lI);var lE=Object.defineProperty,lT=Object.getOwnPropertyDescriptor,lB=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lT(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lE(r,o,a),a};let lz=class extends lit_element_i{constructor(){super(...arguments),this.primary=!1,this.nested=!1,this.expanded=!1}render(){return ex`<gl-card
			.density=${this.primary?"tight":void 0}
			.grouping=${!1===this.nested?void 0:this.primary?"item-primary":"item"}
			.indicator=${this.indicator}
			>${this.renderContent()}</gl-card
		>`}renderContent(){let t=this.querySelectorAll('[slot="context"]').length>0||this.querySelectorAll('[slot="actions"]').length>0;return ex`
			<div class=${nU({"work-item":!0,"work-item_content-empty":!t})}>
				<header class="work-item__header">
					<slot class="work-item__main"></slot>
					${this.renderSummary()}
				</header>
				<div class="work-item__content">
					<slot class="work-item__context" name="context"></slot>
					<slot class="work-item__actions" name="actions"></slot>
				</div>
			</div>
		`}renderSummary(){return this.expanded?eP:ex`<slot class="work-item__summary" name="summary"></slot>`}};lz.styles=[F`
			.work-item {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-8);
			}

			.work-item_content-empty {
				gap: 0;
			}

			.work-item__header {
				display: flex;
				flex-direction: row;
				gap: var(--gl-space-8);
				align-items: center;
				justify-content: space-between;
			}

			.work-item__main {
				display: block;
				flex: 1;
				min-width: 0;
			}

			.work-item__summary {
				display: block;
				flex: none;
			}

			.work-item__content {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-8);
				max-height: 100px;
				transition-duration: var(--gl-duration-medium);
				transition-property: opacity, max-height, display;
				transition-behavior: allow-discrete;
			}

			:host(:not([expanded])) .work-item__content {
				display: none;
				max-height: 0;
				opacity: 0;
			}

			gl-card::part(base) {
				padding-top: var(--gl-card-vertical-padding, 0.8rem);
				padding-bottom: var(--gl-card-vertical-padding, 0.8rem);
				margin-block-end: 0;
			}
		`],lB([eD({type:Boolean,reflect:!0})],lz.prototype,"primary",2),lB([eD({type:Boolean,reflect:!0})],lz.prototype,"nested",2),lB([eD({reflect:!0})],lz.prototype,"indicator",2),lB([eD({type:Boolean,reflect:!0})],lz.prototype,"expanded",2),lz=lB([eL("gl-work-item")],lz);var lL=Object.defineProperty,lM=Object.getOwnPropertyDescriptor,lD=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lM(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lL(r,o,a),a};let lF=F`
	* {
		box-sizing: border-box;
	}

	gl-avatar-list {
		--gl-avatar-size: 2.4rem;

		margin-block: -0.4rem;
	}

	.branch-item {
		position: relative;
	}

	.branch-item__container {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-6);
	}

	.branch-item__container > * {
		margin-block: 0;
	}

	.branch-item__section {
		display: flex;
		flex-direction: column;
		gap: var(--gl-space-4);
	}

	.branch-item__section > * {
		margin-block: 0;
	}

	.branch-item__section--details {
		font-size: 0.9em;
		color: var(--vscode-descriptionForeground);
	}

	.branch-item__actions {
		display: flex;
		flex-direction: row;
		gap: var(--gl-space-8);
		align-items: center;
		justify-content: flex-end;
		font-size: 0.9em;
	}

	/* :empty selector doesn't work with lit */
	.branch-item__actions:not(:has(*)) {
		display: none;
	}

	.branch-item__icon {
		flex: none;
		color: var(--vscode-descriptionForeground);
	}

	.branch-item__name {
		flex-grow: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: bold;
		white-space: nowrap;
	}

	.branch-item__name--secondary {
		font-weight: normal;
	}

	.branch-item__identifier {
		color: var(--vscode-descriptionForeground);
		text-decoration: none;
	}

	.branch-item__grouping {
		display: inline-flex;
		gap: var(--gl-space-6);
		align-items: center;
		max-width: 100%;
		margin-block: 0;
	}

	.branch-item__agents {
		display: flex;
		flex-flow: row wrap;
		gap: var(--gl-space-4);
		align-items: center;
	}

	.branch-item__agents code-icon {
		color: var(--vscode-descriptionForeground);
	}

	.branch-item__changes {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gl-space-10);
		align-items: center;
		justify-content: flex-end;
		white-space: nowrap;
	}

	.branch-item__date {
		margin-inline-end: auto;
	}

	.branch-item__summary {
		display: flex;
		gap: var(--gl-space-6);
		align-items: center;
	}

	.branch-item__collapsed-actions {
		position: absolute;
		right: 0.4rem;
		bottom: 0.3rem;
		z-index: var(--gl-branch-card-actions-zindex, 2);
		padding: var(--gl-space-4) var(--gl-space-6);
		background-color: var(--gl-card-hover-background);
	}

	.branch-item:not(:focus-within, :hover) .branch-item__collapsed-actions {
		${op}
	}

	.work-item {
		--gl-card-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%);
		--gl-card-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 1.5%);
	}

	.work-item::part(base) {
		margin-block-end: 0;
	}

	.branch-item__section.mb-1 {
		margin-block: var(--gl-space-4);
	}

	.branch-item__merge-target {
		margin-inline-end: auto;
	}

	.branch-item__row {
		display: flex;
		gap: var(--gl-space-8);
	}

	.branch-item__row [full] {
		flex-grow: 1;
	}

	.branch-item__missing {
		--button-foreground: inherit;
	}

	:host-context(.vscode-dark) .branch-item__missing,
	:host-context(.vscode-high-contrast) .branch-item__missing {
		--button-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%);
		--button-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 1.5%);
		--button-border: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 12%);
	}

	:host-context(.vscode-light) .branch-item__missing,
	:host-context(.vscode-high-contrast-light) .branch-item__missing {
		--button-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 8%);
		--button-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 10%);
		--button-border: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 14%);
	}

	.branch-item__category {
		margin-inline-start: var(--gl-space-6);
	}

	.launchpad-grouping--mergeable {
		color: var(--vscode-gitlens-launchpadIndicatorMergeableColor);
	}

	.launchpad-grouping--blocked {
		color: var(--vscode-gitlens-launchpadIndicatorBlockedColor);
	}

	.launchpad-grouping--attention {
		color: var(--vscode-gitlens-launchpadIndicatorAttentionColor);
	}

	.wip__pill {
		display: flex;
		flex-direction: row;
		gap: var(--gl-space-10);
	}

	.wip__tooltip {
		display: contents;
		vertical-align: middle;
	}

	.wip__tooltip p {
		margin-block: 0;
	}
`,lj=tB(GlElement);let GlBranchCardBase=class GlBranchCardBase extends lj{constructor(){super(...arguments),this.showUpgrade=!1,this.busy=!1,this.expanded=!1,this.expandable=!1,this.onFocus=t=>{t.composedPath().some(t=>t.matches?.("action-item")??!1)||this.expanded||this.toggleExpanded(!0)}}static{this.styles=[iv,lF]}get branch(){return this._branch}set branch(t){this._branch=t,this.autolinksPromise=t?.autolinks,this.contributorsPromise=t?.contributors,this.issuesPromise=t?.issues,this.prPromise=t?.pr,this.mergeTargetPromise=t?.mergeTarget,this.remotePromise=t?.remote,this.wipPromise=t?.wip}get autolinks(){return this._autolinks}get autolinksPromise(){return this._autolinksPromise}set autolinksPromise(t){this._autolinksPromise!==t&&(this._autolinksPromise=t,this._autolinksPromise?.then(t=>this._autolinks=t,()=>this._autolinks=void 0))}get contributors(){return this._contributors}get contributorsPromise(){return this._contributorsPromise}set contributorsPromise(t){this._contributorsPromise!==t&&(this._contributorsPromise=t,this._contributorsPromise?.then(t=>this._contributors=t,()=>this._contributors=void 0))}get issues(){return this._issues}get issuesPromise(){return this._issuesPromise}set issuesPromise(t){this._issuesPromise!==t&&(this._issuesPromise=t,this._issuesPromise?.then(t=>this._issues=t,()=>this._issues=void 0))}get pr(){return this._pr}get prPromise(){return this._prPromise}set prPromise(t){this._prPromise!==t&&(this._prPromise=t,this._prPromise?.then(t=>{this._pr=t,this.launchpadItemPromise=t?.launchpad},()=>{this._pr=void 0,this.launchpadItemPromise=void 0}))}get launchpadItem(){return this._launchpadItem}get launchpadItemPromise(){return this._launchpadItemPromise}set launchpadItemPromise(t){this._launchpadItemPromise!==t&&(this._launchpadItemPromise=t,this._launchpadItemPromise?.then(t=>this._launchpadItem=t,()=>this._launchpadItem=void 0))}get mergeTarget(){return this._mergeTarget}get mergeTargetPromise(){return this._mergeTargetPromise}set mergeTargetPromise(t){this._mergeTargetPromise!==t&&(this._mergeTargetPromise=t,this._mergeTargetPromise?.then(t=>this._mergeTarget=t,()=>this._mergeTarget=void 0))}get remote(){return this._remote}get remotePromise(){return this._remotePromise}set remotePromise(t){this._remotePromise!==t&&(this._remotePromise=t,this._remotePromise?.then(t=>this._remote=t,()=>this._remote=void 0))}get wip(){return this._wip}get wipPromise(){return this._wipPromise}set wipPromise(t){this._wipPromise!==t&&(this._wipPromise=t,this._wipPromise?.then(t=>this._wip=t,()=>this._wip=void 0))}onExpandableChanged(){this.attachFocusListener()}get branchRef(){return{repoPath:this.repo,branchId:this.branch.id,branchName:this.branch.name,worktree:this.branch.worktree?{name:this.branch.worktree.name,isDefault:this.branch.worktree.isDefault}:void 0}}get isWorktree(){return null!=this.branch.worktree}get cardIndicator(){return lU(lW(this.pr,this.launchpadItem))??"base"}get branchCardIndicator(){if(this.branch.opened){if(this.wip?.pausedOpStatus!=null){if(this.wip?.hasConflicts)return"conflict";switch(this.wip.pausedOpStatus.type){case"cherry-pick":return"cherry-picking";case"merge":return"merging";case"rebase":return"rebasing";case"revert":return"reverting"}}if(this.wip?.workingTreeState!=null&&this.wip.workingTreeState.added+this.wip.workingTreeState.changed+this.wip.workingTreeState.deleted>0)return"branch-changes";if(this.mergeTarget?.mergedStatus?.merged)return"branch-merged";switch(this.branch.status){case"ahead":return"branch-ahead";case"behind":return"branch-behind";case"diverged":return"branch-diverged";case"upToDate":return"branch-synced";case"missingUpstream":return"branch-missingUpstream";default:return}}}connectedCallback(){super.connectedCallback?.(),this.attachFocusListener()}disconnectedCallback(){super.disconnectedCallback?.(),this.eventController?.abort()}attachFocusListener(){this.eventController?.abort(),this.eventController=void 0,this.expandable&&(this.eventController??=new AbortController,this.addEventListener("focusin",this.onFocus,{signal:this.eventController.signal}))}renderIssues(){let{autolinks:t,issues:r}=this,o=r?.length?r:t;return o?.length?ex`
			${o.map(t=>ex`
					<p class="branch-item__grouping">
						<span class="branch-item__icon">
							<issue-icon state=${t.state} issue-id=${t.id}></issue-icon>
						</span>
						<a href=${t.url} class="branch-item__name branch-item__name--secondary">${t.title}</a>
						<span class="branch-item__identifier">${isNaN(parseInt(t.id))?"":"#"}${t.id}</span>
					</p>
				`)}
		`:eP}renderWip(){let t=this.wip?.workingTreeState;if(null==t)return eP;let r=a6(t);return ex`<gl-tooltip class="wip__pill" placement="bottom"
			><commit-stats
				added=${t.added}
				modified=${t.changed}
				removed=${t.deleted}
				symbol="icons"
				no-tooltip
			></commit-stats>
			<span class="wip__tooltip" slot="content">
				<p>${r.length?`${r.join(", ")} in the working tree`:"No working tree changes"}</p>
			</span>
		</gl-tooltip>`}renderAvatars(){let{contributors:t}=this;return t?.length?ex`<gl-avatar-list
			.avatars=${t.map(t=>({name:t.name,src:t.avatarUrl}))}
			max="1"
		></gl-avatar-list>`:eP}renderTracking(t=!1){let r=this.branch.upstream;if(null==r)return eP;let o=0,i=eP;if(t){let t=this.wip?.workingTreeState;if(null!=t){o=t.added+t.changed+t.deleted;let r=a6(t);r.length&&(i=ex`<p slot="extra">${r.join(", ")} in the working tree</p>`)}}return ex`<gl-tracking-status
			.branchName=${this.branch.name}
			.upstreamName=${r.name}
			.missingUpstream=${r.missing??!1}
			.ahead=${r.state.ahead}
			.behind=${r.state.behind}
			.working=${o}
			colorized
			outlined
			>${i}</gl-tracking-status
		>`}renderBranchActions(){let t=this.getBranchActions?.();return t?.length?ex`<action-nav>${t}</action-nav>`:eP}renderPrActions(){let t=this.getPrActions?.();return t?.length?ex`<action-nav>${t}</action-nav>`:eP}renderCollapsedActions(){if(this.expanded)return eP;let t=this.getCollapsedActions?.();return t?.length?ex`<action-nav class="branch-item__collapsed-actions">${t}</action-nav>`:eP}createWebviewCommandLinkWithBranchRef(t,r){return this._webview.createCommandLink(t,r?{...r,...this.branchRef}:this.branchRef)}renderTimestamp(){let t,{timestamps:r}=this.branch;if(null==r)return eP;let{lastCommit:o,lastAccessed:i,lastModified:n}=r,a=Math.max(o??0,i??0,n??0);if(0===a)return eP;t=null!=n&&n>=(i??0)&&n>=(o??0)?"Modified":null!=i&&i>=(n??0)&&i>=(o??0)?"Accessed":"Committed";let c=(t,r)=>ex`${t} ${tg(new Date(r))} <i>(${tb(new Date(r),"MMMM Do, YYYY h:mma")})</i>`,h=[];null!=i&&null!=n&&3e4>Math.abs(i-n)?h.push(c("Modified",n)):(null!=i&&h.push(c("Accessed",i)),null!=n&&h.push(c("Modified",n))),null!=o&&h.push(c("Committed",o));let p=new Date(a);return ex`<gl-tooltip class="branch-item__date">
			<time datetime="${p.toISOString()}">${t} ${tg(p)}</time>
			<span slot="content">${h.map((t,r)=>r>0?ex`<br />${t}`:t)}</span>
		</gl-tooltip>`}renderBranchItem(t){let r=this.renderWip(),o=this.renderTracking(),i=this.renderAvatars(),n=this.branch.opened?void 0:this.renderBranchIndicator?.(),a=this.renderMergeTargetStatus(),c=this.renderTimestamp();return ex`
			<gl-work-item
				?primary=${!this.branch.opened}
				?nested=${!this.branch.opened}
				.indicator=${this.branchCardIndicator}
				?expanded=${this.expanded}
			>
				<div class="branch-item__section">
					<p class="branch-item__grouping">
						<span class="branch-item__icon"> ${this.renderBranchIcon()} </span>
						<span class="branch-item__name">${this.branch.name}</span>
					</p>
				</div>
				${it(c||n||r||o||i,()=>ex`
						<div class="branch-item__section branch-item__section--details" slot="context">
							<p class="branch-item__changes">${c}${n}${r}${o}${i}</p>
						</div>
					`)}
				${this.renderAgentPillsRow()}
				${it(t||a,()=>ex`<div class="branch-item__actions" slot="actions">
							${a??eP}${t??eP}
						</div>`)}
				<span class="branch-item__summary" slot="summary">${this.renderTracking(!0)} ${i}</span>
			</gl-work-item>
		`}renderBranchIcon(){let t=this.wip?.workingTreeState!=null&&this.wip.workingTreeState.added+this.wip.workingTreeState.changed+this.wip.workingTreeState.deleted>0;return ex`<gl-branch-icon
			branch="${this.branch.name}"
			status="${this.branch.status}"
			?hasChanges=${t}
			upstream=${this.branch.upstream?.name}
			?worktree=${null!=this.branch.worktree}
			?is-default=${this.branch.worktree?.isDefault??!1}
		></gl-branch-icon>`}renderAgentPillsRow(){let t=this.branch.worktree?.path;if(null==t)return eP;let r=function(t,r){if(null==t)return;let o=r.worktreePath??r.repoPath;if(t instanceof Map){let r=t.get(o);return null!=r&&r.length>0?r:void 0}if(!t.length)return;let i=t.filter(t=>t.worktreePath===o);return i.length>0?i:void 0}(this._homeState?.agentSessions?.get(),{repoPath:this.repo,worktreePath:t});if(null==r||0===r.length)return eP;if(this.expanded)return ex`
				<div class="branch-item__agents">
					<code-icon icon="robot"></code-icon>
					${r.map(t=>ex`<gl-agent-status-pill .session=${t}></gl-agent-status-pill>`)}
				</div>
			`;let o=[],i=[],n=[];for(let t of r){let r=oX[t.phase];"needs-input"===r?o.push(t):"working"===r?i.push(t):n.push(t)}return ex`
			<div class="branch-item__agents">
				<code-icon icon="robot"></code-icon>
				${o.map(t=>ex`<gl-agent-status-pill .session=${t}></gl-agent-status-pill>`)}
				${i.length>0?ex`<gl-agent-status-pill
							.summary=${{category:"working",sessions:i}}
						></gl-agent-status-pill>`:eP}
				${n.length>0?ex`<gl-agent-status-pill
							.summary=${{category:"idle",sessions:n}}
						></gl-agent-status-pill>`:eP}
			</div>
		`}renderPrItem(){if(!this.pr)return this.branch.upstream?.missing===!1&&this.expanded?ex`
					<div>
						<button-container grouping="split" layout="full">
							<gl-button
								class="branch-item__missing"
								appearance="secondary"
								full
								href="${this._webview.createCommandLink("gitlens.createPullRequest:",{ref:this.branchRef,describeWithAI:!1,source:{source:"home",detail:"create-pr"}})}"
							>
								<code-icon icon="git-pull-request" slot="prefix"></code-icon>
								<span>Create a Pull Request</span>
							</gl-button>
							${this._subscription.orgSettings.get().ai&&this._aiCtx.state.get().enabled&&this.remote?.provider?.supportedFeatures?.createPullRequestWithDetails?ex`<gl-button
										class="branch-item__missing"
										tooltip="Create a Pull Request with AI"
										appearance="secondary"
										href="${this._webview.createCommandLink("gitlens.createPullRequest:",{ref:this.branchRef,describeWithAI:!0,source:{source:"home",detail:"create-pr"}})}"
									>
										<code-icon icon="sparkle"></code-icon>
									</gl-button>`:eP}
						</button-container>
					</div>
				`:eP;let t=this.branch.opened?lU(lW(this.pr,this.launchpadItem))??"base":void 0,r=this.renderPrActions();return ex`
			<gl-work-item ?expanded=${this.expanded} ?nested=${!this.branch.opened} .indicator=${t}>
				<div class="branch-item__section">
					<p class="branch-item__grouping">
						<span class="branch-item__icon">
							<pr-icon ?draft=${this.pr.draft} state=${this.pr.state} pr-id=${this.pr.id}></pr-icon>
						</span>
						<a href=${this.pr.url} class="branch-item__name branch-item__name--secondary"
							>${this.pr.title}</a
						>
						<span class="branch-item__identifier">#${this.pr.id}</span>
					</p>
				</div>
				${this.renderLaunchpadItem()}
				${it(null!=r,()=>ex`<div class="branch-item__actions" slot="actions">${r}</div>`)}
			</gl-work-item>
		`}renderLaunchpadItem(){if(null==this.launchpadItem)return eP;let t=lW(this.pr,this.launchpadItem);if(null==t)return eP;let r=aG.get(t),o=aH.get(t);if(null==r||null==o)return eP;let i=o.match(/\$\((.*?)\)/)[1].replace("gitlens","gl"),n=function(t,r){if(null==t||0===t.length)return t;if(null==r)return t.replace(tv,"");let o=function(t){let r=ty.get(t);if(null!=r)return r;r=[];let o=t.length,i=0;for(;i<o;){let o=t.indexOf("${",i);if(-1===o)break;let n=t.indexOf("}",o);if(-1===n)break;let a=o+2,c="",h="",p="",u=!1,g="right",b="";if("'"===t[a]){let r=++a;if(-1===(a=t.indexOf("'",a)))break;r!==a&&(h=t.slice(r,a)),a++}else if(!tw(t.charCodeAt(a))){let r=a++;for(;a<n&&!tw(t.charCodeAt(a));)a++;r!==a&&(h=t.slice(r,a))}for(;a<n;){let r=t.charCodeAt(a);if(tw(r))c+=t[a++];else{if(124!==r)break;for(;a<n;){if((r=t.charCodeAt(++a))>=48&&r<=57){p+=t[a];continue}63===r?(u=!0,a++):45===r&&(g="left",a++);break}}}if(a<n){if("'"===t[a]){let r=++a;if(-1===(a=t.indexOf("'",a)))break;r!==a&&(b=t.slice(r,a))}else if(!tw(t.charCodeAt(a))){let r=a++;for(;a<n&&!tw(t.charCodeAt(a));)a++;r!==a&&(b=t.slice(r,a))}}i=n+1,r.push({key:c,start:o,end:i,options:{prefix:h||void 0,suffix:b||void 0,truncateTo:p?parseInt(p,10):void 0,collapseWhitespace:u,padDirection:g}})}return ty.set(t,r),r}(t);if(0===o.length)return t;let i=0,n="";for(let a of o)n+=t.slice(i,a.start)+(r[a.key]??""),i=a.end;return i<t.length&&(n+=t.slice(i)),n}(aV.get(this.launchpadItem.category)[1],{author:this.launchpadItem.author?.username??"unknown",createdDateRelative:tg(new Date(this.launchpadItem.createdDate))});return ex`<div class="branch-item__section branch-item__section--details" slot="context">
				<p class="launchpad-grouping--${lU(t)}">
					<gl-tooltip content="${n}">
						<a
							href=${ib("gitlens.showLaunchpad",{source:"home",state:{id:{uuid:this.launchpadItem.uuid,group:t}}})}
							class="launchpad__grouping"
						>
							<code-icon icon="${i}"></code-icon
							><span class="branch-item__category">${r.toUpperCase()}</span></a
						>
					</gl-tooltip>
				</p>
			</div>
			${i?ex`<span
						class="branch-item__summary launchpad-grouping--${lU(t)}"
						slot="summary"
						><gl-tooltip placement="bottom" content="${r}"
							><code-icon icon="${i}"></code-icon></gl-tooltip
					></span>`:eP}`}renderMergeTargetStatus(){return this.showUpgrade?ex`<gl-merge-target-upgrade
				class="branch-item__merge-target"
				.state=${this._subscription.subscription.get()?.state}
			></gl-merge-target-upgrade>`:this.branch.mergeTarget?ex`<gl-merge-target-status
			class="branch-item__merge-target"
			.branch=${this.branch}
			.targetPromise=${this.branch.mergeTarget}
		></gl-merge-target-status>`:eP}renderIssuesItem(){if(![...this.issues??[],...this.autolinks??[]].length)return eP;let t=this.branch.opened?"base":void 0;return ex`
			<gl-work-item ?expanded=${this.expanded} ?nested=${!this.branch.opened} .indicator=${t}>
				<div class="branch-item__section">${this.renderIssues()}</div>
			</gl-work-item>
		`}toggleExpanded(t=!this.expanded){this.expanded=t,queueMicrotask(()=>{this.emit("gl-branch-card-expand-toggled",{expanded:t})})}};lD([O({context:"subscription",subscribe:!0})],GlBranchCardBase.prototype,"_subscription",2),lD([O({context:"ai"})],GlBranchCardBase.prototype,"_aiCtx",2),lD([O({context:"webview"})],GlBranchCardBase.prototype,"_webview",2),lD([O({context:"homeState"})],GlBranchCardBase.prototype,"_homeState",2),lD([eD()],GlBranchCardBase.prototype,"repo",2),lD([eD({type:Boolean})],GlBranchCardBase.prototype,"showUpgrade",2),lD([eD({type:Object})],GlBranchCardBase.prototype,"branch",1),lD([eF()],GlBranchCardBase.prototype,"_autolinks",2),lD([eF()],GlBranchCardBase.prototype,"_contributors",2),lD([eF()],GlBranchCardBase.prototype,"_issues",2),lD([eF()],GlBranchCardBase.prototype,"_pr",2),lD([eF()],GlBranchCardBase.prototype,"_launchpadItem",2),lD([eF()],GlBranchCardBase.prototype,"_mergeTarget",2),lD([eF()],GlBranchCardBase.prototype,"_remote",2),lD([eF()],GlBranchCardBase.prototype,"_wip",2),lD([eD({type:Boolean,reflect:!0})],GlBranchCardBase.prototype,"busy",2),lD([eD({type:Boolean,reflect:!0})],GlBranchCardBase.prototype,"expanded",2),lD([eD({type:Boolean,reflect:!0})],GlBranchCardBase.prototype,"expandable",2),lD([t4("expandable")],GlBranchCardBase.prototype,"onExpandableChanged",1);let lN=class extends GlBranchCardBase{constructor(){super(...arguments),this._lazyMergeTargetLoading=!1}get mergeTarget(){return this._lazyMergeTarget}render(){return ex`
			<gl-card class="branch-item" focusable .indicator=${this.cardIndicator}>
				<div class="branch-item__container">
					${this.renderBranchItem(this.renderBranchActions())}${this.renderPrItem()}${this.renderIssuesItem()}
				</div>
				${this.renderCollapsedActions()}
			</gl-card>
		`}willUpdate(t){super.willUpdate?.(t),t.has("branch")&&this.branch?.id!==this._lazyMergeTargetFetchedFor&&(this._lazyMergeTarget=void 0,this._lazyMergeTargetPromise=void 0,this._lazyMergeTargetFetchedFor=void 0,this._lazyMergeTargetLoading=!1),this.expanded&&this.ensureMergeTargetFetched()}renderMergeTargetStatus(){if(this.showUpgrade)return super.renderMergeTargetStatus();let t=this._lazyMergeTargetPromise;return null==t?eP:ex`<gl-merge-target-status
			class="branch-item__merge-target"
			.branch=${this.branch}
			.targetPromise=${t}
			?loading=${this._lazyMergeTargetLoading}
		></gl-merge-target-status>`}async ensureMergeTargetFetched(){let t=this.branch;if(null==t||this._lazyMergeTargetFetchedFor===t.id&&null!=this._lazyMergeTargetPromise)return;let r=this._subscription.subscription.get()?.state;if(null!=r&&!ig(r))return;let o=this._homeState?.branchesService;if(null==o)return;this._lazyMergeTargetFetchedFor=t.id,this._lazyMergeTargetLoading=!0;let i=t.id,n=this.repo,a=t.name,c=(async()=>{try{let t=await o.getBranchEnrichment(n,a);return await t?.mergeTargetStatus}catch{return}})();this._lazyMergeTargetPromise=c;let h=await c;this._lazyMergeTargetFetchedFor===i&&(this._lazyMergeTarget=h,this._lazyMergeTargetLoading=!1)}getCollapsedActions(){let t=[];return this.isWorktree?t.push(ex`<action-item
					label="Open Worktree"
					alt-label="Open Worktree in New Window"
					icon="browser"
					alt-icon="empty-window"
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openWorktree:")}
					alt-href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openWorktree:",{location:"newWindow"})}
				></action-item>`):t.push(ex`<action-item
					label="Switch to Branch..."
					icon="gl-switch"
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.switchToBranch:")}
				></action-item>`),t.push(ex`<action-item
				label="Open in Commit Graph"
				icon="gl-graph"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.showInCommitGraph:",{type:"branch"})}
			></action-item>`,ex`<action-item
				label=${this.isWorktree?"Open in Worktrees View":"Open in Branches View"}
				icon="arrow-right"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openInView.branch:")}
			></action-item>`),t}getBranchActions(){let t=[],r=this._subscription.orgSettings.get()?.ai&&this._aiCtx.state.get().enabled;return this.isWorktree?(t.push(ex`<action-item
					label="Open Worktree"
					alt-label="Open Worktree in New Window"
					icon="browser"
					alt-icon="empty-window"
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openWorktree:")}
					alt-href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openWorktree:",{location:"newWindow"})}
				></action-item>`),r&&(this.wip?.workingTreeState!=null&&this.wip.workingTreeState.added+this.wip.workingTreeState.changed+this.wip.workingTreeState.deleted>0?t.push(ex`<action-item
							label="Explain Working Changes"
							icon="sparkle"
							href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainWip:")}
						></action-item>`):t.push(ex`<action-item
							label="Explain Branch Changes"
							icon="sparkle"
							href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainBranch:")}
						></action-item>`))):(t.push(ex`<action-item
					label="Switch to Branch..."
					icon="gl-switch"
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.switchToBranch:")}
				></action-item>`),r&&t.push(ex`<action-item
						label="Explain Branch Changes"
						icon="sparkle"
						href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainBranch:")}
					></action-item>`)),t.push(ex`<action-item
				label="Fetch"
				icon="repo-fetch"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.fetch:")}
			></action-item>`),t.push(ex` <action-item
				label="Visualize Branch History"
				icon="graph-scatter"
				href=${this._webview.createCommandLink("gitlens.visualizeHistory.branch:",{type:"branch",repoPath:this.repo,branchId:this.branch.id})}
			></action-item>`),t.push(ex`<action-item
				label="Open in Commit Graph"
				icon="gl-graph"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.showInCommitGraph:",{type:"branch"})}
			></action-item>`,ex`<action-item
				label=${this.isWorktree?"Open in Worktrees View":"Open in Branches View"}
				icon="arrow-right"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openInView.branch:")}
			></action-item>`),t}getPrActions(){return[ex`<action-item
				label="Open Pull Request Changes"
				icon="request-changes"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestChanges:")}
			></action-item>`,ex`<action-item
				label="Compare Pull Request"
				icon="git-compare"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestComparison:")}
			></action-item>`,ex`<action-item
				label="Open Pull Request Details"
				icon="eye"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestDetails:")}
			></action-item>`]}renderBranchIndicator(){}};function lW(t,r){if(null==r||t?.state!=="opened"||t.draft&&"unassigned-reviewers"===r.category)return;let o=aK.get(r.category);if(null!=o&&"other"!==o&&"draft"!==o&&"current-branch"!==o)return o}function lU(t){switch(t){case"mergeable":return"mergeable";case"blocked":return"blocked";case"follow-up":case"needs-review":return"attention"}}lD([eF()],lN.prototype,"_lazyMergeTarget",2),lD([eF()],lN.prototype,"_lazyMergeTargetLoading",2),lN=lD([eL("gl-branch-card")],lN);let lq=new WeakMap,lH=tz(class extends async_directive_f{render(t){return eP}update(t,[r]){let o=r!==this.G;return o&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=r,this.ht=t.options?.host,this.rt(this.ct=t.element)),eP}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){let r=this.ht??globalThis,o=lq.get(r);void 0===o&&(o=new WeakMap,lq.set(r,o)),void 0!==o.get(this.G)&&this.G.call(this.ht,void 0),o.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?lq.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),lG="important",lK=` !${lG}`,lV=0-lK.length;let CspStyleMapDirective=class CspStyleMapDirective extends directive_i{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `cspStyleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return eS}update(t,[r]){let o=t.element.style,i=this._previous??=new Map;for(let t of i.keys())null==r[t]&&(i.delete(t),t.includes("-")?o.removeProperty(t):o[t]=null);for(let t in r){let n=r[t];if(null==n)continue;let a="string"==typeof n&&n.endsWith(lK),c=a?n.slice(0,lV):String(n);i.get(t)!==c&&(i.set(t,c),t.includes("-")||a?o.setProperty(t,c,a?lG:""):o[t]=c)}return eS}};let lY=tz(CspStyleMapDirective);var lJ=Object.defineProperty,lX=Object.getOwnPropertyDescriptor,lZ=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lX(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lJ(r,o,a),a};let lQ=class extends lit_element_i{constructor(){super(...arguments),this.label="Breadcrumb",this.collapse="outer-in",this.density="normal",this._items=[],this._hiddenIndices=new Set,this.handleSlotChange=()=>{let t=this.defaultSlot.assignedElements({flatten:!0}).filter(t=>"gl-breadcrumb-item"===t.tagName.toLowerCase()),r=[];this._items=t,t.forEach((t,o)=>{r[o]=this.getEffectivePriority(t,o)});let o=r.length>0?Math.max(...r):0,i="outer-in"===this.collapse&&t.length>2;t.forEach((n,a)=>{a===t.length-1?n.setAttribute("aria-current","page"):n.removeAttribute("aria-current"),n.style.order=String(2*a),i&&r[a]!==o?n.style.flexShrink="0":n.style.flexShrink="",n.setAttribute("density",this.density)}),this.scheduleRecompute()}}connectedCallback(){super.connectedCallback?.(),this.resizeObserver=new ResizeObserver(()=>this.scheduleRecompute()),this.resizeObserver.observe(this)}disconnectedCallback(){this.resizeObserver?.disconnect(),this.resizeObserver=void 0,null!=this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=void 0),super.disconnectedCallback?.()}updated(t){t.has("collapse")&&this.scheduleRecompute(),t.has("density")&&this.applyDensityToItems()}applyDensityToItems(){for(let t of this._items)t.setAttribute("density",this.density)}scheduleRecompute(){null==this.rafId&&(this.rafId=requestAnimationFrame(()=>{this.rafId=void 0,this.recompute()}))}async recompute(){if("outer-in"!==this.collapse||this._items.length<=2){this._items.some(t=>t.hasAttribute("compact")||t.hasAttribute("hidden"))&&this.applyState(new Set,new Set);return}if(this.applyState(new Set,new Set),await this.updateComplete,this.offsetHeight,this.scrollWidth<=this.clientWidth+1)return;let t=this.getPriorityTiers();if(t.length<=1)return;let r=new Set,o=new Set;for(let i=0;i<t.length-1;i++){for(let n of t[i])this._items[n].icon?r.add(n):o.add(n);if(this.absorbFoldTargets(r,o),this.applyState(r,o),await this.updateComplete,this.offsetHeight,this.scrollWidth<=this.clientWidth+1)return}}absorbFoldTargets(t,r){for(let o of new Set(t)){if(o>=this._items.length-1||!r.has(o+1))continue;let i=this._items[o];i.foldable&&i.icon&&(t.delete(o),r.add(o))}}getPriorityTiers(){let t=new Map;return this._items.forEach((r,o)=>{let i=this.getEffectivePriority(r,o);t.has(i)||t.set(i,[]),t.get(i).push(o)}),[...t.entries()].sort(([t],[r])=>t-r).map(([,t])=>t)}getEffectivePriority(t,r){return null!=t.priority?t.priority:+(0===r||r===this._items.length-1)}applyState(t,r){this._items.forEach((o,i)=>{r.has(i)?(o.setAttribute("hidden",""),o.removeAttribute("compact")):t.has(i)?(o.setAttribute("compact",""),o.removeAttribute("hidden")):(o.removeAttribute("hidden"),o.removeAttribute("compact"))}),this._hiddenIndices=new Set(r)}getHiddenRuns(){let t=[],r=null;return this._items.forEach((o,i)=>{this._hiddenIndices.has(i)?(null==r&&(r={startIdx:i,items:[]},t.push(r)),r.items.push(o)):r=null}),t}render(){let t=this.getHiddenRuns();return ex`<nav part="base" aria-label=${this.label}>
			<ol>
				<slot @slotchange=${this.handleSlotChange}></slot>
				${t.map(t=>this.renderOverflowIndicator(t))}
			</ol>
		</nav>`}renderOverflowIndicator(t){let r=2*t.startIdx-1,o=t.items[0],i=o?.foldable&&o.icon?o.icon:void 0;return ex`<span class="overflow-wrapper" style=${lY({order:String(r)})}>
			<gl-popover appearance="menu" trigger="click focus" placement="bottom-start" .arrow=${!1} .distance=${0}>
				<gl-breadcrumb-item
					slot="anchor"
					appearance="ellipsis"
					interactive
					icon=${i??eP}
				></gl-breadcrumb-item>
				<div slot="content" class="overflow-menu">
					${t.items.map(t=>this.renderHiddenItemMenu(t))}
				</div>
			</gl-popover>
		</span>`}renderHiddenItemMenu(t){let r=t.label||t.labelText||"breadcrumb",o=t.icon||("segment"===t.appearance?"folder":void 0),i=t.tooltipNode,n=ex`<button class="overflow-menu-item" type="button" @click=${()=>t.click()}>
			${o?ex`<code-icon icon=${o}></code-icon>`:eP}
			<span class="overflow-menu-item-label">${r}</span>
		</button>`;return null==i?n:ex`<gl-tooltip placement="right" .distance=${8}>
			${n}
			<span
				slot="content"
				${lH(t=>{t instanceof HTMLElement&&t.replaceChildren(i.cloneNode(!0))})}
			></span>
		</gl-tooltip>`}};lQ.styles=F`
		* {
			box-sizing: border-box;
		}

		:host {
			display: flex;
			flex-flow: row nowrap;
			gap: 0;
			align-items: center;
			width: 100%;
			overflow: hidden;

			/* Use VS Code's default font-size by default; density="compact" shrinks it. */
			font-size: var(--vscode-font-size);
			line-height: 1.4;
			color: var(--vscode-descriptionForeground);

			--gl-breadcrumb-separator-content: '\\eab6'; /* chevron-right codicon */
			--gl-breadcrumb-separator-font: codicon;
			--gl-breadcrumb-separator-size: 1.1rem;
		}

		:host([density='compact']) {
			font-size: var(--gl-font-md);
		}

		nav {
			display: contents;
		}

		ol {
			display: contents;
			padding: 0;
			margin: 0;
			list-style: none;
		}

		.overflow-wrapper {
			display: flex;
			flex-shrink: 0;
			align-items: center;
			min-width: 0;
		}

		.overflow-menu {
			display: flex;
			flex-direction: column;
			gap: 0.1rem;
			min-width: 16rem;
			max-width: 32rem;
			padding: var(--gl-space-4) var(--gl-space-2);
		}

		/* Style the cloned tooltip content from each menu row's tooltip — the source
	   markup is text + hr + path, and the default browser hr style looks wrong
	   in our dark tooltip body. */
		.overflow-menu gl-tooltip hr {
			margin: var(--gl-space-4) 0;
			border: none;
			border-top: var(--gl-border-width) solid var(--color-foreground--25);
		}

		.overflow-menu-item {
			display: flex;
			flex-direction: row;
			gap: var(--gl-space-6);
			align-items: center;
			padding: var(--gl-space-4) var(--gl-space-8);
			overflow: hidden;
			text-overflow: ellipsis;
			font: inherit;
			color: var(--vscode-foreground);
			text-align: start;
			white-space: nowrap;
			cursor: pointer;
			background: none;
			border: none;
			border-radius: var(--gl-radius-sm);
		}

		.overflow-menu-item:hover,
		.overflow-menu-item:focus-visible {
			outline: none;
			background: var(--vscode-list-hoverBackground);
		}

		.overflow-menu-item-label {
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	`,lZ([eD()],lQ.prototype,"label",2),lZ([eD({reflect:!0})],lQ.prototype,"collapse",2),lZ([eD({reflect:!0})],lQ.prototype,"density",2),lZ([eN("slot")],lQ.prototype,"defaultSlot",2),lZ([eF()],lQ.prototype,"_items",2),lZ([eF()],lQ.prototype,"_hiddenIndices",2),lQ=lZ([eL("gl-breadcrumbs")],lQ);let l0=class extends lit_element_i{constructor(){super(...arguments),this.appearance="default",this.interactive=!1,this.foldable=!1,this._shrink=1,this._truncated=!1,this._hasTooltipSlot=!1,this._labelText="",this.onLabelSlotChange=t=>{let r=t.target.assignedNodes({flatten:!0});this._labelText=r.map(t=>t.textContent??"").join("").trim(),r.some(t=>{if(t.nodeType!==Node.ELEMENT_NODE)return!1;let r=t.tagName.toLowerCase();return"gl-repo-button-group"===r||"gl-ref-button"===r})?this.setAttribute("has-widget",""):this.removeAttribute("has-widget"),this.updateTruncated()},this.onTooltipSlotChange=t=>{let r=t.target;this._hasTooltipSlot=r.assignedNodes({flatten:!0}).some(t=>t.nodeType!==Node.TEXT_NODE||(t.textContent??"").trim().length>0)}}get shrink(){return this._shrink}set shrink(t){let r=this._shrink;this._shrink=t,this.style.setProperty("--gl-breadcrumb-item-shrink",String(t)),this.requestUpdate("shrink",r)}get labelText(){return this._labelText}get tooltipNode(){return this.querySelector(':scope > [slot="tooltip"]')}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role","listitem")}disconnectedCallback(){this.resizeObserver?.disconnect(),this.resizeObserver=void 0,super.disconnectedCallback?.()}firstUpdated(){this.labelEl&&(this.resizeObserver=new ResizeObserver(()=>this.updateTruncated()),this.resizeObserver.observe(this.labelEl),this.updateTruncated())}updateTruncated(){let t=this.labelEl;t&&(this._truncated=t.scrollWidth>t.clientWidth)}render(){let{_truncated:t,_hasTooltipSlot:r,_labelText:o,interactive:i}=this;if("ellipsis"===this.appearance){let t=this.icon?ex`<code-icon class="icon" icon=${this.icon}></code-icon>
						<span class="breadcrumb-label" aria-hidden="true">…</span>
						<span class="sr-only">Show hidden breadcrumbs</span>`:ex`<span class="breadcrumb-label" aria-hidden="true">…</span>
						<span class="sr-only">Show hidden breadcrumbs</span>`,r=ex`<span class="separator" aria-hidden="true"></span>`;return i?ex`<button class="breadcrumb-item" type="button">
					${t}${r}
				</button>`:ex`<span class="breadcrumb-item">${t}${r}</span>`}let n=ex`${this.icon?ex`<code-icon class="icon" icon=${this.icon}></code-icon>`:eP}
			<slot name="start"></slot>
			<gl-tooltip class="breadcrumb-tooltip" ?disabled=${!(r||t)} placement="bottom" .distance=${6}>
				<span class="breadcrumb-label" aria-label=${t?o:eP}>
					<slot @slotchange=${this.onLabelSlotChange}></slot>
				</span>
				<span slot="content">
					<slot name="tooltip" @slotchange=${this.onTooltipSlotChange}></slot>
					${!r&&t?o:eP}
				</span>
			</gl-tooltip>
			<slot name="end"><span class="separator" aria-hidden="true"></span></slot> `;return i?ex`<button class="breadcrumb-item" type="button">${n}</button>`:ex`<span class="breadcrumb-item"> ${n} </span>`}};l0.styles=[ob,F`
			* {
				box-sizing: border-box;
			}

			:host {
				display: flex;
				flex-shrink: var(--gl-breadcrumb-item-shrink, 1);
				flex-direction: row;
				align-items: center;
				min-width: 0;
				overflow: hidden;
				color: var(--vscode-descriptionForeground);

				/* Defensive — section headings (e.g. Home) apply uppercase to their
		   contents; reset here so crumbs always render in natural casing. */
				text-transform: none;
				white-space: nowrap;
			}

			/* density="compact" — set on the host by gl-breadcrumbs (propagated to each
	   child on slotchange / density change). Shrinks icons and caps slotted
	   toolbar widget heights so the row stays tight. The inner gl-button's
	   --button-padding/--button-line-height live in compactBreadcrumbsConsumerStyles
	   (must be in consumer scope to cross the shadow boundary). */
			:host([has-widget]) .breadcrumb-label {
				overflow: visible;
			}

			:host([has-widget]) .separator {
				margin-left: 0;
			}

			:host([density='compact']) {
				--code-icon-size: 1.3rem;
				--gl-file-icon-size: 1.3rem;
			}

			:host([density='compact']) ::slotted(gl-ref-button),
			:host([density='compact']) ::slotted(gl-repo-button-group) {
				max-height: 1.6rem;
			}

			:host([icon]) {
				min-width: calc(1.3rem + 0.6rem);
			}

			:host([hidden]) {
				display: none;
			}

			:host(:hover),
			:host(:focus-within) {
				flex-shrink: 0;
			}

			:host([aria-current='page']) {
				font-weight: 600;
				color: var(--vscode-foreground);
			}

			:host([appearance='segment']) {
				min-width: 0;
			}

			:host([appearance='ellipsis']) {
				flex-shrink: 0;
				min-width: 0;
				user-select: none;
			}

			.breadcrumb-item {
				display: flex;
				flex-direction: row;
				gap: var(--gl-space-4);
				align-items: center;
				width: 100%;
				min-width: 0;

				/* Fixed min-height keeps every crumb the same height regardless of
		   slotted content size or collapsed state — without this, a collapsed
		   icon-only crumb is shorter than a text crumb. */
				min-height: 1.8rem;

				/* Horizontal padding matches HALF the inside gap so that the visual
		   space between elements is uniform — inside a crumb, gap supplies
		   0.4rem between content and chevron; across crumbs, this item's
		   padding-right (0.2rem) plus the next item's padding-left (0.2rem)
		   sums to the same 0.4rem. */
				padding: 0.1rem 0.2rem;
				overflow: hidden;
				font: inherit;
				color: inherit;
				text-align: start;
				white-space: nowrap;
				cursor: default;
				background: none;
				border: none;
				border-radius: var(--gl-radius-sm);
			}

			button.breadcrumb-item {
				cursor: pointer;
			}

			button.breadcrumb-item:focus {
				outline: none;
			}

			:host(:hover) .breadcrumb-item,
			:host(:focus-within) .breadcrumb-item {
				color: var(--vscode-foreground);
				background: var(--vscode-toolbar-hoverBackground);
			}

			.icon {
				z-index: 2;
				flex-shrink: 0;
			}

			.breadcrumb-label {
				display: inline-block;
				min-width: 0;
				max-width: 100%;
				padding: 0;
				overflow: hidden;
				text-overflow: ellipsis;

				/* Generous line-height (1.4 ratio) ensures the label's line-box accommodates
		   both descenders for plain-text crumbs AND the natural height of slotted
		   gl-button widgets (gl-ref-button, gl-repo-button-group) without clipping
		   them at overflow: hidden. With symmetric leading, the text x-height visual
		   center sits at the line-box geometric center, aligning with centered icons
		   under align-items: center. */
				line-height: 1.4;
				white-space: nowrap;
			}

			/* Use :host(:hover) instead of .breadcrumb-item:hover so hovering anywhere on the
	   host (not just the inner button) reveals the label when [compact] is auto-set
	   by the breadcrumbs host on overflow. */
			:host([compact]:not(:hover, :focus-within)) .breadcrumb-label,
			:host([appearance='ellipsis'][icon]:not(:hover, :focus-within)) .breadcrumb-label {
				max-width: 0;
				padding: 0;
				margin: 0;
			}

			.separator {
				display: inline-flex;
				flex-shrink: 0;
				align-items: center;
				justify-content: center;
				width: var(--gl-breadcrumb-separator-size, 1rem);
				height: var(--gl-breadcrumb-separator-size, 1rem);
				margin-left: -0.2rem;

				/* No additional margin — let the breadcrumb-item's gap supply the spacing
		   on both sides (gap before the separator + the next item's padding-left
		   after). Keeps spacing uniform throughout the chain. */
				color: var(--vscode-descriptionForeground);
				-webkit-user-select: none;
				user-select: none;
				opacity: 0.5;
				transition:
					opacity var(--gl-duration-x-fast) ease,
					color var(--gl-duration-x-fast) ease;
			}

			.separator::before {
				font-family: var(--gl-breadcrumb-separator-font, codicon);
				font-size: var(--gl-breadcrumb-separator-size, 1rem);
				line-height: 1;
				content: var(--gl-breadcrumb-separator-content, '\\eab6');
			}

			:host(:hover) .separator,
			:host(:focus-within) .separator {
				color: var(--vscode-foreground);
				opacity: 1;
			}

			:host([aria-current='page']) .separator {
				display: none;
			}

			.sr-only {
				${op}
			}
		`],lZ([eD({reflect:!0})],l0.prototype,"appearance",2),lZ([eD({type:Boolean,reflect:!0})],l0.prototype,"interactive",2),lZ([eD({type:Boolean,reflect:!0})],l0.prototype,"foldable",2),lZ([eD({type:Number,reflect:!0})],l0.prototype,"priority",2),lZ([eD()],l0.prototype,"icon",2),lZ([eD()],l0.prototype,"label",2),lZ([eD({type:Number})],l0.prototype,"shrink",1),lZ([eF()],l0.prototype,"_truncated",2),lZ([eF()],l0.prototype,"_hasTooltipSlot",2),lZ([eF()],l0.prototype,"_labelText",2),lZ([eN(".breadcrumb-label")],l0.prototype,"labelEl",2),l0=lZ([eL("gl-breadcrumb-item")],l0),F`
	gl-breadcrumbs[density='compact'] gl-breadcrumb-item gl-ref-button::part(button),
	gl-breadcrumbs[density='compact'] gl-breadcrumb-item gl-repo-button-group::part(provider-icon),
	gl-breadcrumbs[density='compact'] gl-breadcrumb-item gl-repo-button-group::part(label) {
		--button-padding: 0 0.3rem;
		--button-line-height: 1.2;

		border: 0;
	}
`;var l1=Object.defineProperty,l2=Object.getOwnPropertyDescriptor,l5=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?l2(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&l1(r,o,a),a};let l4=class extends lit_element_i{constructor(){super(...arguments),this.lines=1}render(){return ex`<div class="skeleton" style=${lY({"--skeleton-lines":String(this.lines)})}></div>`}};l4.styles=F`
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
	`,l5([eD({type:Number})],l4.prototype,"lines",2),l4=l5([eL("skeleton-loader")],l4);var l6=Object.defineProperty,l3=Object.getOwnPropertyDescriptor;let l8=class extends lit_element_i{};l8.styles=[om,F`
			:host {
				display: block;
				height: 0;
				margin: var(--gl-space-6);
				border-top: var(--gl-border-width) solid var(--vscode-menu-separatorBackground);
			}
		`],l8=((t,r,o,i)=>{for(var n,a=i>1?void 0:i?l3(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&l6(r,o,a),a})([eL("menu-divider")],l8);var l7=Object.defineProperty,l9=Object.getOwnPropertyDescriptor,ce=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?l9(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&l7(r,o,a),a};let ct=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.role="option",this.onKeydown=t=>{this.disabled||t.target!==this||("Enter"===t.key||" "===t.key)&&(t.preventDefault(),this.click())}}updateInteractiveState(){this.tabIndex=this.disabled?-1:"option"===this.role?0:-1}updated(t){(t.has("disabled")||t.has("role"))&&this.updateInteractiveState()}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}render(){return this.href?ex`<a href=${this.href}><slot></slot></a>`:ex`<slot></slot>`}};ct.styles=[om,F`
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
		`],ce([eD({type:Boolean,reflect:!0})],ct.prototype,"disabled",2),ce([eD({reflect:!0})],ct.prototype,"href",2),ce([eD({reflect:!0})],ct.prototype,"role",2),ct=ce([eL("menu-item")],ct);var cr=Object.defineProperty,co=Object.getOwnPropertyDescriptor;let ci=class extends lit_element_i{render(){return ex`<slot></slot>`}};ci.styles=[om,F`
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
		`],ci=((t,r,o,i)=>{for(var n,a=i>1?void 0:i?co(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cr(r,o,a),a})([eL("menu-label")],ci);let cn=F`
	/*
	:host {
		display: inline-block;
	}
    */

	.indicator {
		box-sizing: border-box;
		display: inline-block;
		width: var(--gl-indicator-size, 0.8rem);
		aspect-ratio: 1;
		vertical-align: text-bottom;
		background-color: var(--gl-indicator-color);
		border-radius: calc(var(--gl-indicator-size, 0.8rem) * 2);
	}
`,ca=F`
	.indicator--pulse {
		animation: 1.5s ease 0s infinite normal none running pulse;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 var(--gl-indicator-pulse-color);
		}

		70% {
			box-shadow: 0 0 0 var(--gl-indicator-size, 0.8rem) transparent;
		}

		100% {
			box-shadow: 0 0 0 0 transparent;
		}
	}
`;var cs=Object.defineProperty,cl=Object.getOwnPropertyDescriptor,cc=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cl(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cs(r,o,a),a};let cd=class extends lit_element_i{constructor(){super(...arguments),this.pulse=!1}render(){return ex`<slot class="indicator${this.pulse?" indicator--pulse":""}"></slot>`}};cd.styles=[cn,ca],cc([eD({type:Boolean})],cd.prototype,"pulse",2),cd=cc([eL("gl-indicator")],cd);var ch=Object.defineProperty,cp=Object.getOwnPropertyDescriptor,cu=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cp(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ch(r,o,a),a};let cg=class extends GlElement{constructor(){super(),this._truncated=!1,this.connectIcon=!0,this.disabled=!1,this.icon=!0,this.hasMultipleRepositories=!1,this.expandable=!1,this.resizeObserver=new ResizeObserver(()=>this.updateTruncated())}disconnectedCallback(){super.disconnectedCallback?.(),this.resizeObserver.disconnect(),this.observedLabelButtonEl=void 0}firstUpdated(){this.observeLabelButton(),this.updateTruncated()}updated(t){super.updated(t),(t.has("repository")||t.has("hasMultipleRepositories")||t.has("icon"))&&(this.observeLabelButton(),this.updateTruncated())}observeLabelButton(){let t=this.labelButtonEl;this.observedLabelButtonEl!==t&&(this.resizeObserver.disconnect(),this.observedLabelButtonEl=t,null!=t&&this.resizeObserver.observe(t))}updateTruncated(){let t;if(!this.hasMultipleRepositories){this.style.removeProperty("--compact-width"),this._truncated&&(this._truncated=!1);return}let r=this.labelButtonEl;if(null==r)return;let o=this.compactSizerEl?.getBoundingClientRect().width??0;if(0===o)return;let i=this.fallbackIconSizerEl?.getBoundingClientRect().width??o,n=`${o}px`;if(this.style.getPropertyValue("--compact-width")!==n&&this.style.setProperty("--compact-width",n),this._truncated)t=r.getBoundingClientRect().width<=o+i;else{let n=r.shadowRoot?.querySelector("slot.label"),a=this.icon?i:o;t=(n?.getBoundingClientRect().width??r.getBoundingClientRect().width)<=a}t!==this._truncated&&(this._truncated=t)}get displayName(){return this.repository?.name??"none selected"}render(){let t=this.icon&&!this.hasMultipleRepositories,r=this.icon&&this._truncated&&this.hasMultipleRepositories;return ex`
			${this.renderProviderIcon()}
			${this.hasMultipleRepositories?ex`<span class="truncated-button__sizer" aria-hidden="true">${this.displayName}</span>
						<gl-button
							class="truncated-button__compact-sizer"
							appearance="toolbar"
							aria-hidden="true"
							?disabled=${!0}
						>
							${this.icon?ex`<code-icon
										slot="prefix"
										class="repo-icon-fallback"
										icon="gl-repository"
										aria-hidden="true"
									></code-icon>`:eP}
							<code-icon
								slot="suffix"
								class="picker-icon"
								icon="chevron-down"
								aria-hidden="true"
							></code-icon>
						</gl-button>`:eP}
			${t?eP:ex`<gl-button
						class=${r?"truncated-button truncated-button--icon-fallback":"truncated-button"}
						part="label"
						appearance="toolbar"
						?disabled=${this.disabled}
						truncate
						@click=${t=>this.emit("gl-click",{event:t,part:"label",repository:this.repository})}
					>
						${r?ex`<code-icon
									slot="prefix"
									class="repo-icon-fallback"
									icon="gl-repository"
									aria-hidden="true"
								></code-icon>`:eP}
						<span class="truncated-button__label">${this.displayName}</span>
						${this.hasMultipleRepositories?ex`<code-icon
									slot="suffix"
									class="picker-icon"
									icon="chevron-down"
									aria-hidden="true"
								></code-icon>`:eP}
						<slot name="tooltip" slot="tooltip">${this.displayName}</slot>
					</gl-button>`}
		`}renderProviderIcon(){if(!this.icon)return eP;let{repository:t}=this;if(!t?.provider)return ex`
				<gl-button part="provider-icon" appearance="toolbar" ?disabled=${!0}>
					<code-icon icon="gl-repository" aria-hidden="true"></code-icon>
				</gl-button>
			`;let{provider:r}=t,o=r.integration?.connected;return ex`<gl-popover placement="bottom" trigger="hover click focus">
				<gl-button
					slot="anchor"
					part="provider-icon"
					appearance="toolbar"
					href=${r.url??eP}
					aria-label=${`Open Repository on ${r.name}`}
					@click=${t=>this.emit("gl-click",{event:t,part:"icon",repository:this.repository})}
				>
					<code-icon
						icon=${"cloud"===r.icon?"cloud":`gl-provider-${r.icon}`}
						aria-hidden="true"
					></code-icon>
					${it(o,()=>ex`<gl-indicator class="indicator-dot"></gl-indicator>`)}
				</gl-button>
				<div slot="content" class="provider-popover">
					<div class="provider-popover__title">Open Repository on ${r.name}</div>
					<hr />
					<div class="provider-popover__line">
						<code-icon class="popover-status-icon" icon="gl-repository" aria-hidden="true"></code-icon>
						${this.displayName}
					</div>
					${it(o,()=>ex`
							<div class="provider-popover__line">
								<code-icon class="popover-status-icon" icon="check" aria-hidden="true"></code-icon>
								Connected to ${r.name}
							</div>
						`,()=>!1!==o?eP:ex`
								<div class="provider-popover__line">
									<code-icon class="popover-status-icon" icon="plug" aria-hidden="true"></code-icon>
									<a
										href=${ib("gitlens.connectRemoteProvider",{repoPath:t.path,remote:r.bestRemoteName})}
									>
										Connect to ${t.provider.name}
									</a>
									<span>&mdash; not connected</span>
								</div>
							`)}
				</div>
			</gl-popover>
			${this.renderConnectIcon()}`}renderConnectIcon(){if(!this.connectIcon)return eP;let{repository:t}=this;if(!t?.provider)return eP;let{provider:r}=t;return r.integration?.connected!==!1?eP:ex`
			<gl-button
				part="connect-icon"
				appearance="toolbar"
				href=${ib("gitlens.connectRemoteProvider",{repoPath:t.path,remote:r.bestRemoteName})}
			>
				<code-icon class="connect-icon" icon="plug"></code-icon>
				<span slot="tooltip">
					Connect to ${r.name}
					<hr />
					View pull requests and issues in Home, Commit Graph, Launchpad, autolinks, and more
				</span>
			</gl-button>
		`}};cg.styles=[iv,iy,s0,s2,F`
			:host {
				display: grid;
				align-items: center;
			}

			/* Single-repo (no label rendered): grid sizes exactly to the icons.
	   max-content cols keep each icon column at full content width —
	   auto cols can collapse under flex shrink pressure, hiding icons
	   behind one another. Explicit min-width: max-content prevents the
	   host itself from shrinking past the icons under flex pressure
	   (which otherwise lets the trailing chevron separator overlap). */
			:host(:not([multi-repo])) {
				grid-template-columns: max-content max-content;
				min-width: max-content;
			}

			:host(:not([multi-repo], [icon])) {
				grid-template-columns: minmax(0, 1fr);
				min-width: 0;
			}

			/* Multi-repo: include a flexible label column that can shrink
		   so the label ellipses naturally while preserving enough room for
		   the fallback repo icon + chevron compact state. */
			:host([multi-repo]) {
				--compact-width: 0px;

				position: relative;
				grid-template-columns: max-content max-content minmax(var(--compact-width), 1fr);
				min-width: min-content;
			}

			:host([multi-repo]:not([icon])) {
				grid-template-columns: minmax(var(--compact-width), 1fr);
			}

			[part='label'] {
				grid-row: 1;
				grid-column: 3;
				min-width: 0;
			}

			:host(:not([icon])) [part='label'] {
				grid-column: 1;
			}

			.truncated-button__sizer {
				visibility: hidden;
				grid-row: 1;
				grid-column: 3;
				min-width: 0;
				padding-inline: var(--gl-space-4);
				overflow-wrap: anywhere;
				pointer-events: none;
			}

			:host(:not([icon])) .truncated-button__sizer {
				grid-column: 1;
			}

			.truncated-button__compact-sizer {
				--button-gap: 0.2rem;

				position: absolute;
				inset-inline-start: 0;
				top: 0;
				visibility: hidden;
				width: max-content;
				min-width: max-content;
				pointer-events: none;
			}

			.truncated-button__label {
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.truncated-button--icon-fallback .truncated-button__label {
				display: none;
			}

			.truncated-button--icon-fallback {
				--button-gap: 0.2rem;

				min-width: max-content;
			}

			:host([multi-repo]) .truncated-button {
				width: 100%;
				min-width: 0;
			}

			:host(:not([icon])) .truncated-button {
				width: 100%;
			}

			.truncated-button .picker-icon,
			.truncated-button__compact-sizer .picker-icon {
				margin-right: 0;
			}

			.truncated-button .picker-icon::before,
			.truncated-button__compact-sizer .picker-icon::before {
				margin-left: 0;
			}

			.indicator-dot {
				--gl-indicator-color: green;
				--gl-indicator-size: 0.4rem;

				margin-left: -0.2rem;
			}

			gl-popover,
			[part='provider-icon'] {
				flex-shrink: 0;
			}

			/* Tighten the icon buttons themselves — they sit adjacent in the grid
	   and we don't want extra horizontal padding bloating the group's
	   trailing edge near the chevron separator. */
			[part='provider-icon'],
			[part='connect-icon'] {
				--button-padding: 0.2rem;
			}

			.popover-status-icon {
				margin-top: -3px;
			}

			/* Stack the provider popover's lines as a column with breathing room
	   between them (instead of relying on <br> / inline-flow which gives
	   too-tight visual spacing). */
			.provider-popover {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-6);
			}

			.provider-popover hr {
				margin: 0;
			}

			.provider-popover__line {
				display: flex;
				gap: var(--gl-space-4);
				align-items: center;
			}

			.connect-icon {
				color: var(--titlebar-fg);
			}

			/* :host([expandable]) .truncated-button {
		transition: max-width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
	} */

			:host([expandable]:not(:hover, :focus-within)) .truncated-button .picker-icon::before {
				visibility: hidden;
			}

			:host([expandable]:not(:hover, :focus-within)) .truncated-button .repo-icon-fallback {
				visibility: hidden;
			}

			:host([expandable]:not(:hover, :focus-within)) .truncated-button {
				min-width: 0 !important;
				max-width: 0;
			}

			:host([multi-repo][expandable]:not(:hover, :focus-within)) {
				grid-template-columns: max-content max-content minmax(0, 0fr);
			}

			:host([multi-repo][expandable]:not([icon], :hover, :focus-within)) {
				grid-template-columns: minmax(0, 0fr);
			}

			/* When the surrounding gl-breadcrumb-item is hovered or focused, expand the
	   truncated-button as if the gl-repo-button-group itself were hovered. This
	   lets users hover anywhere in the breadcrumb-item (e.g., the chevron
	   separator) to reveal the repo name. !important is required because the
	   collapse rule above (with :host attribute + :not) has higher specificity
	   than :host-context. */
			:host-context(gl-breadcrumb-item:hover) .truncated-button .picker-icon::before,
			:host-context(gl-breadcrumb-item:focus-within) .truncated-button .picker-icon::before {
				visibility: visible !important;
			}

			:host-context(gl-breadcrumb-item:hover) .truncated-button,
			:host-context(gl-breadcrumb-item:focus-within) .truncated-button {
				min-width: 0 !important;
				max-width: none !important;
			}

			:host-context(gl-breadcrumb-item:hover),
			:host-context(gl-breadcrumb-item:focus-within) {
				grid-template-columns: max-content max-content minmax(var(--compact-width), 1fr);
			}
		`,s1],cu([eF()],cg.prototype,"_truncated",2),cu([eN(".truncated-button")],cg.prototype,"labelButtonEl",2),cu([eN(".truncated-button__compact-sizer")],cg.prototype,"compactSizerEl",2),cu([eN(".truncated-button__compact-sizer .repo-icon-fallback")],cg.prototype,"fallbackIconSizerEl",2),cu([eD({type:Boolean})],cg.prototype,"connectIcon",2),cu([eD({type:Boolean})],cg.prototype,"disabled",2),cu([eD({type:Boolean,reflect:!0})],cg.prototype,"icon",2),cu([eD({type:Object})],cg.prototype,"repository",2),cu([eD({type:Boolean,reflect:!0,attribute:"multi-repo"})],cg.prototype,"hasMultipleRepositories",2),cu([eD({type:Object})],cg.prototype,"source",2),cu([eD({type:Boolean,reflect:!0})],cg.prototype,"expandable",2),cg=cu([eL("gl-repo-button-group")],cg);let cb="0000000000000000000000000000000000000000:",cm=/^([\w\-/]+(?:\.[\w\-/]+)*)?(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)?$/,cf=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)$/,cv=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,cy=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,cw=/(^[0-9a-f]{40}([\^@~:]\S*)?$)|(^[0]{40}(:|-)$)/,c_=/^(.*?)([\^@~:].*)?$/,ck=/^[0]{40}(?:[\^@~:]\S*)?:?$/,c$=/^[0]{40}([\^@~]\S*)?:$/;function cx(t,r){return!!r&&t.test(r)}function cC(t,r=!1){return"0000000000000000000000000000000000000000"===t||t===cb||!r&&cx(ck,t)}function cS(t,r=!1){return t===cb||!r&&cx(c$,t)}var cP=Object.defineProperty,cA=Object.getOwnPropertyDescriptor,cO=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cA(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cP(r,o,a),a};let cR=F`
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
`,cI=class extends lit_element_i{constructor(){super(...arguments),this.icon="git-commit",this.size=12}get label(){return function(t,r){if("0000000000000000000000000000000000000000-"===t)return"(deleted)";if(!t)return r?.strings?.working??"";if(cC(t))return cS(t)?r?.strings?.uncommittedStaged??"Index":r?.strings?.uncommitted??"Working Tree";if(function(t,r="any"){if(null==t)return!1;switch(r){case"qualified":return cf.test(t);case"qualified-double-dot":return cv.test(t);case"qualified-triple-dot":return cy.test(t);default:return cm.test(t)}}(t)||!cx(cw,t))return t;let o=c_.exec(t);if(null!=o){let[,t,r]=o;if(null!=r)return`${t.substring(0,7)}${r}`}return t.substring(0,7)}(this.sha,{strings:{uncommitted:"Working",uncommittedStaged:"Staged",working:"Working"}})}render(){if(null==this.sha)return eP;if(!this.sha||cC(this.sha)){let t=cS(this.sha)?"check":"pencil";return ex`<code-icon part="icon" class="icon" icon="${t}" size="${this.size}"></code-icon
				><span part="label" class="label--uncommitted">${this.label}</span>`}return ex`<code-icon part="icon" class="icon" icon="${this.icon}" size="${this.size}"></code-icon
			><span part="label">${this.label}</span>`}};cI.styles=cR,cO([eD({reflect:!0})],cI.prototype,"appearance",2),cO([eD({type:String})],cI.prototype,"sha",2),cO([eD({type:String})],cI.prototype,"icon",2),cO([eD({type:Number})],cI.prototype,"size",2),cI=cO([eL("gl-commit-sha")],cI);let cE=class extends lit_element_i{constructor(){super(...arguments),this.icon="git-commit",this.size=12,this.copyLabel="Copy",this.copiedLabel="Copied!",this.tooltipPlacement="top"}render(){return null==this.sha?eP:!this.sha||cC(this.sha)?ex`<gl-commit-sha .sha=${this.sha} .icon=${this.icon} .size=${this.size}></gl-commit-sha>`:ex`<gl-copy-container
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
		</gl-copy-container>`}};cE.styles=[cR,F`
			:host(:focus) {
				outline: none;
			}
		`],cO([eD({type:String})],cE.prototype,"sha",2),cO([eD({type:String})],cE.prototype,"icon",2),cO([eD({type:Number})],cE.prototype,"size",2),cO([eD({reflect:!0})],cE.prototype,"appearance",2),cO([eD({type:String,attribute:"copy-label"})],cE.prototype,"copyLabel",2),cO([eD({type:String,attribute:"copied-label"})],cE.prototype,"copiedLabel",2),cO([eD({type:String,attribute:"tooltip-placement"})],cE.prototype,"tooltipPlacement",2),cE=cO([eL("gl-commit-sha-copy")],cE);var cT=Object.defineProperty,cB=Object.getOwnPropertyDescriptor,cz=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cB(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cT(r,o,a),a};let cL=class extends lit_element_i{constructor(){super(...arguments),this.conflicts=!1,this.aiResolve=!1,this.readOnly=!1,this.onResolveWithAI=t=>{t.preventDefault(),this.dispatchEvent(new CustomEvent("ai-resolve-conflicts",{bubbles:!0,composed:!0}))}}get onSkipUrl(){return this.createPausedOperationCommandLink("skip")}get onContinueUrl(){return this.createPausedOperationCommandLink("continue")}get onAbortUrl(){return this.createPausedOperationCommandLink("abort")}get onOpenEditorUrl(){return this.createPausedOperationCommandLink("open")}get onShowConflictsUrl(){return this.createPausedOperationCommandLink("showConflicts")}createPausedOperationCommandLink(t){return this._webview.createCommandLink(`gitlens.pausedOperation.${t}:`,this.pausedOpStatus)}render(){return null==this.pausedOpStatus?eP:ex`
			<span class="status" part="base">
				<code-icon icon="warning" class="icon"></code-icon>
				${this.renderStatus(this.pausedOpStatus)}${this.renderActions()}
			</span>
		`}renderStatus(t){if("rebase"!==t.type){let r=aY[t.type],o=this.conflicts?r.conflicts:r.label;return ex`<span class="label"
				>${this.renderConflictsLink(o)} ${this.renderReference(t.incoming)}
				${r.directionality} ${this.renderReference(t.current)}</span
			>`}let r=t.steps.total>0,o=aY[t.type],i=this.conflicts?o.conflicts:r?o.label:o.pending;return ex`<span class="label"
				>${this.renderConflictsLink(i)} ${this.renderReference(t.incoming)}
				${o.directionality} ${this.renderReference(t.current??t.onto)}</span
			>${r?ex`<span class="steps"
						>(${t.steps.current.number}/${t.steps.total})</span
					>`:eP}`}renderConflictsLink(t){return!this.conflicts||this.readOnly?t:this.aiResolve?ex`<gl-tooltip content="Resolve Conflicts">
				<a href="#" class="link" @click=${this.onResolveWithAI}>${t}</a>
			</gl-tooltip>`:ex`<gl-tooltip content="Show Conflicts">
			<a href="${this.onShowConflictsUrl}" class="link">${t}</a>
		</gl-tooltip>`}renderReference(t){let r="branch"===t.refType,o=r?ex`<gl-branch-name .name=${t.name} .size=${12}></gl-branch-name>`:ex`<gl-commit-sha .sha=${t.ref} .size=${12}></gl-commit-sha>`;if(this.readOnly)return o;let i=this._webview.webviewId,n=this.createJumpUrl(t);return ex`<gl-tooltip content=${"gitlens.graph"===i||"gitlens.views.graph"===i?r?"Jump to Branch":"Jump to Commit":r?"Open Branch in Commit Graph":"Open Commit in Commit Graph"}>
			<a href=${n} class="ref-link">${o}</a>
		</gl-tooltip>`}createJumpUrl(t){return ib("gitlens.showInCommitGraph",{ref:t,source:{source:"merge-target"}})}renderActions(){if(null==this.pausedOpStatus||this.readOnly)return eP;let t=this.pausedOpStatus.type;return ex`<action-nav class="actions">
			${it("rebase"===t,()=>ex`<action-item
						label="Open in Rebase Editor"
						href=${this.onOpenEditorUrl}
						icon="edit"
					></action-item>`)}
			${it("revert"!==t&&!("rebase"===t&&this.conflicts),()=>ex`
					<action-item label="Continue" icon="gl-continue" href=${this.onContinueUrl}></action-item>
				`)}
			${it("merge"!==t,()=>ex`<action-item label="Skip" icon="gl-skip" href=${this.onSkipUrl}></action-item>`)}
			<action-item label="Abort" href=${this.onAbortUrl} icon="gl-abort"></action-item>
		</action-nav>`}};cL.styles=[F`
			.status {
				--action-item-foreground: #000;
				/* Blend the action hover/active states into the banner instead of the generic
				   grey toolbar hover. currentColor tracks --action-item-foreground, so the
				   conflicts variant (white foreground) tints correctly without redeclaring. */
				--action-item-hover-background: color-mix(in srgb, currentColor 12%, transparent);
				--action-item-active-background: color-mix(in srgb, currentColor 22%, transparent);

				box-sizing: border-box;
				display: flex;
				gap: var(--gl-space-6);
				align-items: center;
				width: 100%;
				max-width: 100%;
				padding: 0.1rem 0.4rem;
				margin-block: 0;
				color: #000;
				background-color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
				border-radius: var(--gl-radius-sm);
			}

			:host([conflicts]) .status {
				--action-item-foreground: #fff;

				color: #fff;
				background-color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor);
			}

			.label {
				flex: 1;
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.icon,
			.steps,
			.actions {
				flex: none;
			}

			/* Read-only (mode) banner: baseline-align so the "(N/M)" step counter lines up with the
			   status text. The branch-name chips inflate the label's line-box, so plain center-alignment
			   leaves the counter sitting too low. Keep the warning icon centered. */
			:host([readonly]) .status {
				align-items: baseline;
			}

			:host([readonly]) .icon {
				align-self: center;
			}

			.md-code {
				padding: 0 var(--gl-space-4) var(--gl-space-2);
				font-family: var(--vscode-editor-font-family);
				background: var(--vscode-textCodeBlock-background);
				border-radius: var(--gl-radius-sm);
			}

			gl-commit-sha::part(label) {
				font-weight: bold;
			}

			.link {
				color: inherit;
				text-decoration: underline dotted;
				text-underline-offset: 0.3rem;
				opacity: 0.9;

				&:hover {
					text-decoration: none;
					opacity: 1;
				}
			}

			.link--conflicts {
				margin-left: var(--gl-space-10);
			}

			.ref-link {
				color: inherit;
				text-decoration: none !important;
				cursor: pointer;
			}
		`],cz([O({context:"webview"})],cL.prototype,"_webview",2),cz([eD({type:Boolean,reflect:!0})],cL.prototype,"conflicts",2),cz([eD({type:Boolean,attribute:"ai-resolve"})],cL.prototype,"aiResolve",2),cz([eD({type:Boolean,attribute:"readonly",reflect:!0})],cL.prototype,"readOnly",2),cz([eD({type:Object})],cL.prototype,"pausedOpStatus",2),cL=cz([eL("gl-merge-rebase-status")],cL);var cM=Object.defineProperty,cD=Object.getOwnPropertyDescriptor,cF=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cD(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cM(r,o,a),a};let cj=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.minVisible=0,this.position="bottom",this._shownAt=0}willUpdate(t){if(t.has("active")){if(this.active)null!=this._hideTimer&&(clearTimeout(this._hideTimer),this._hideTimer=void 0),this._shownAt=performance.now(),this.toggleAttribute("visible",!0);else if(this.hasAttribute("visible")){let t=this.minVisible-(performance.now()-this._shownAt);t>0?this._hideTimer=setTimeout(()=>{this._hideTimer=void 0,this.toggleAttribute("visible",!1)},t):this.toggleAttribute("visible",!1)}}}firstUpdated(){this.setAttribute("role","progressbar")}disconnectedCallback(){super.disconnectedCallback?.(),null!=this._hideTimer&&(clearTimeout(this._hideTimer),this._hideTimer=void 0,this.toggleAttribute("visible",!1))}render(){return ex`<div class="progress-bar"></div>`}};cj.styles=F`
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
	`,cF([eD({reflect:!0})],cj.prototype,"mode",2),cF([eD({type:Boolean})],cj.prototype,"active",2),cF([eD({type:Number,attribute:"min-visible"})],cj.prototype,"minVisible",2),cF([eD()],cj.prototype,"position",2),cj=cF([eL("progress-indicator")],cj);var cN=Object.defineProperty,cW=Object.getOwnPropertyDescriptor,cU=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cW(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cN(r,o,a),a};let cq=class extends lit_element_i{constructor(){super(...arguments),this.loading=!1,this.headingLevel="3"}render(){return ex`
			<div class="section">
				<header class="section__header" part="header">
					<div
						class="section__heading"
						role="heading"
						aria-level=${(this.headingLevel?this.headingLevel:void 0)??eP}
					>
						<slot name="heading" class="section__headline"></slot>
					</div>
					<slot name="heading-actions" class="section__actions"></slot>
					<progress-indicator class="section__loader" ?active="${this.loading}"></progress-indicator>
				</header>
				<slot></slot>
			</div>
		`}};cq.styles=[F`
			.section {
				margin-bottom: var(--gl-space-12);
			}

			.section__header {
				position: relative;
				display: flex;
				gap: var(--gl-space-8);
				justify-content: space-between;
				margin-block: 0 var(--gl-space-8);
			}

			.section__heading {
				flex: 1;
				min-width: 0;
				font-size: var(--gl-font-base);
			}

			.section__headline {
				font-weight: normal;
				text-transform: uppercase;
			}

			.section__actions {
				margin-inline-start: auto;
			}

			.section__loader {
				position: absolute;
				bottom: 0;
				left: 0;
			}
		`],cU([eD({type:Boolean})],cq.prototype,"loading",2),cU([eD({attribute:"heading-level"})],cq.prototype,"headingLevel",2),cq=cU([eL("gl-section")],cq);let cH=class extends lit_element_i{constructor(){super(...arguments),this.isFetching=!1,this.onCardExpanded=t=>{let r=t.composedPath().find(t=>t.matches("gl-branch-card"));this.toggleSiblingCardsDebounced(r)},this.toggleSiblingCardsDebounced=tl(this.toggleSiblingCards.bind(this),100)}connectedCallback(){super.connectedCallback?.(),this.addEventListener("gl-branch-card-expand-toggled",this.onCardExpanded)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("gl-branch-card-expand-toggled",this.onCardExpanded)}toggleSiblingCards(t){t?.expanded===!0&&this.branchCards.forEach(r=>{r!==t&&(r.expanded=!1)})}renderSectionLabel(){return this.isFetching||0===this.branches.length?this.label:`${this.label} (${this.branches.length})`}render(){return ex`
			<gl-section ?loading=${this.isFetching}>
				<span slot="heading">${this.renderSectionLabel()}</span>
				<span slot="heading-actions"><slot name="heading-actions"></slot></span>
				${it(this.branches.length>0,()=>this.branches.map(t=>ex`<gl-branch-card expandable .repo=${this.repo} .branch=${t}></gl-branch-card>`),()=>ex`<p>No ${this.label} branches</p>`)}
			</gl-section>
		`}};cU([eD({type:String})],cH.prototype,"label",2),cU([eD()],cH.prototype,"repo",2),cU([eD({type:Array})],cH.prototype,"branches",2),cU([eD({type:Boolean})],cH.prototype,"isFetching",2),cU([(r,o)=>ej(r,o,{get(){return(this.renderRoot??(t??=document.createDocumentFragment())).querySelectorAll("gl-branch-card")}})],cH.prototype,"branchCards",2),cH=cU([eL("gl-branch-section")],cH);var cG=Object.defineProperty,cK=Object.getOwnPropertyDescriptor,cV=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cK(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cG(r,o,a),a};let cY=class extends tB(lit_element_i){constructor(){super(...arguments),this.repoCollapsed=!0}get isPro(){let t=this._subscription.subscription.get();return null!=t&&ig(t.state)}connectedCallback(){super.connectedCallback?.(),this._homeCtx.repositories.get().openCount>0&&this._activeOverviewState.fetch()}onBranchSelectorClicked(){this._commands.service?.executeScoped("gitlens.switchToBranch:home",{repoPath:this._activeOverviewState.value.get()?.active[0]?.repoPath})}render(){if(this._homeCtx.discovering.get())return this.renderLoader();if(0===this._homeCtx.repositories.get().openCount)return eP;if(null!=this._activeOverviewState.error.get())return ex`
				<gl-section>
					<span slot="heading">Active Branch</span>
					<span
						>Unable to load branch data.
						<a
							href="#"
							@click=${t=>{t.preventDefault(),this._activeOverviewState.fetch()}}
							>Retry</a
						>
					</span>
				</gl-section>
			`;let t=this._activeOverviewState.value.get();return null==t?this.renderLoader():this.renderComplete(t,this._activeOverviewState.loading.get())}renderLoader(){return ex`
			<gl-section>
				<skeleton-loader slot="heading" lines="1"></skeleton-loader>
				<skeleton-loader lines="3"></skeleton-loader>
			</gl-section>
		`}renderComplete(t,r=!1){let o=t?.repository,i=t?.active;if(!o||!i?.length)return ex`<span>None</span>`;let n=this._homeCtx.repositories.get().openCount>1,a=i[0];return ex`
			<gl-section ?loading=${r}>
				<gl-breadcrumbs slot="heading" label="Active Work scope">
					<gl-breadcrumb-item label="${o.name}" .shrink=${0}
						><gl-repo-button-group
							.repository=${o}
							?disabled=${!n}
							.hasMultipleRepositories=${n}
							.source=${{source:"graph"}}
							?expandable=${!0}
							@gl-click=${this.onRepositorySelectorClicked}
							><span slot="tooltip">
								Switch to Another Repository...
								<hr />
								${o.name}
							</span></gl-repo-button-group
						></gl-breadcrumb-item
					>
					<gl-breadcrumb-item icon="git-branch" label="${a.reference?.name??"Branch"}"
						><gl-ref-button .ref=${a.reference} @click=${this.onBranchSelectorClicked}
							><span slot="tooltip">Switch to Another Branch... </span></gl-ref-button
						></gl-breadcrumb-item
					>
				</gl-breadcrumbs>
				<span class="section-heading-actions" slot="heading-actions">
					<gl-button
						aria-busy="${r??eP}"
						?disabled=${r}
						class="section-heading-action"
						appearance="toolbar"
						tooltip="Fetch All"
						href=${this._webview.createCommandLink("gitlens.fetch:")}
						><code-icon icon="repo-fetch"></code-icon
					></gl-button>
					<gl-button
						aria-busy="${r??eP}"
						?disabled=${r}
						class="section-heading-action"
						appearance="toolbar"
						tooltip="Visualize Repo History"
						href=${this._webview.createCommandLink("gitlens.visualizeHistory.repo:",{type:"repo",repoPath:o.path})}
						><code-icon icon="graph-scatter"></code-icon></gl-button
					><gl-button
						aria-busy="${r??eP}"
						?disabled=${r}
						class="section-heading-action"
						appearance="toolbar"
						tooltip="Open in Commit Graph"
						href=${this._webview.createCommandLink("gitlens.showInCommitGraph:",{type:"repo",repoPath:o.path})}
						><code-icon icon="gl-graph"></code-icon
					></gl-button>
				</span>
				${i.map(t=>this.renderRepoBranchCard(t,o.path,r))}
			</gl-section>
		`}renderRepoBranchCard(t,r,o){return ex`<gl-active-branch-card
			.branch=${t}
			.repo=${r}
			?busy=${o}
			?showUpgrade=${!this.isPro}
		></gl-active-branch-card>`}onRepositorySelectorClicked(t){"label"===t.detail.part&&this._activeOverviewState.changeRepository()}};cY.styles=[iv,lF,iy,F`
			[hidden] {
				display: none;
			}

			:host {
				display: block;
				margin-bottom: var(--gl-space-24);
				color: var(--vscode-foreground);
			}

			gl-repo-button-group {
				text-transform: none;
			}

			gl-section::part(header) {
				margin-block-end: var(--gl-space-2);
			}

			.section-heading-actions {
				display: flex;
				flex: none;
				align-items: center;
			}

			.section-heading-action {
				--button-padding: 0.2rem;
				--button-line-height: 1.2rem;

				/* margin-block: -1rem; */
			}

			.section-heading-provider {
				color: inherit;
			}

			.tooltip {
				text-transform: none;
			}

			.uppercase {
				text-transform: uppercase;
			}

			gl-breadcrumbs {
				--gl-tooltip-text-transform: none;
			}

			/* Style hr inside any slotted tooltip — the default browser hr renders too
	   bright and without proper spacing inside the dark tooltip body. */
			[slot='tooltip'] hr {
				margin: var(--gl-space-4) 0;
				border: none;
				border-top: var(--gl-border-width) solid var(--color-foreground--25);
			}
		`],cV([O({context:"subscription",subscribe:!0})],cY.prototype,"_subscription",2),cV([O({context:"homeState"})],cY.prototype,"_homeCtx",2),cV([O({context:"commands"})],cY.prototype,"_commands",2),cV([O({context:"activeOverviewState"})],cY.prototype,"_activeOverviewState",2),cV([O({context:"webview"})],cY.prototype,"_webview",2),cV([eF()],cY.prototype,"repoCollapsed",2),cY=cV([eL("gl-active-work")],cY);let cJ=class extends GlBranchCardBase{connectedCallback(){super.connectedCallback?.(),this.toggleExpanded(!0)}render(){return ex`
			${this.renderBranchIndicator()}${this.renderIssuesItem()}${this.renderBranchItem(ex`${this.renderBranchStateActions()}${this.renderBranchActions()}`)}${this.renderPrItem()}
		`}renderActionsMenu(){let t=this._subscription.orgSettings.get()?.ai&&this._aiCtx.state.get().enabled,r=this.busy,o=this.wip?.workingTreeState,i=null!=o&&o.added+o.changed+o.deleted>0,n=[];if(t)i&&(n.push(ex`<menu-item
						?disabled=${r}
						href=${ib("gitlens.ai.generateCommitMessage",{repoPath:this.repo,source:"home"})}
						>Generate Commit Message</menu-item
					>`),n.push(ex`<menu-divider></menu-divider>`),n.push(ex`<menu-item
						?disabled=${r}
						href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainWip:")}
						>Explain Working Changes</menu-item
					>`)),n.push(ex`<menu-item
					?disabled=${r}
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainBranch:")}
					>Explain Branch Changes</menu-item
				>`),i&&(n.push(ex`<menu-divider></menu-divider>`),n.push(ex`<menu-item
						?disabled=${r}
						href=${this.createWebviewCommandLinkWithBranchRef("gitlens.createCloudPatch:")}
						>Share as Cloud Patch</menu-item
					>`));else if(i)return ex`
				<gl-button
					aria-busy=${r??eP}
					?disabled=${r}
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.createCloudPatch:")}
					appearance="secondary"
					tooltip="Share as Cloud Patch"
					><code-icon icon="gl-cloud-patch-share"></code-icon>
				</gl-button>
			`;if(0!==n.length)return ex`<gl-popover
			appearance="menu"
			trigger="click focus"
			placement="bottom-end"
			.arrow=${!1}
			.distance=${0}
		>
			<gl-button slot="anchor" appearance="toolbar" tooltipPlacement="top" aria-label="Additional Actions">
				<code-icon icon="ellipsis"></code-icon>
			</gl-button>
			<div slot="content">${n}</div>
		</gl-popover>`}renderBranchStateActions(){let{name:t,upstream:r}=this.branch,o=[],i=()=>0===o.length?this.renderActionsMenu():ex`<div><button-container>${o}${this.renderActionsMenu()}</button-container></div>`,n=this.busy,a=this.wip?.workingTreeState,c=null!=a&&a.added+a.changed+a.deleted>0;if(c&&o.push(ex`
				<gl-button
					aria-busy=${n??eP}
					?disabled=${n}
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.composeCommits:")}
					appearance="secondary"
					density="compact"
					><code-icon icon="wand" slot="prefix"></code-icon>Compose Commits...<span slot="tooltip"
						><strong>Compose Commits</strong><br /><i
							>Automatically or interactively organize changes into meaningful commits</i
						></span
					></gl-button
				>
			`),this.wip?.pausedOpStatus!=null)return i();if(r?.missing!==!1)return o.push(ex`
				<gl-button
					aria-busy=${n??eP}
					?disabled=${n}
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.publishBranch:")}
					appearance="secondary"
					density="compact"
				>
					<code-icon icon="cloud-upload" slot="${(c?void 0:"prefix")??eP}"></code-icon>
					${c?"":"Publish Branch"}
					<span slot="tooltip"
						>Publish (push) <strong>${t}</strong> to ${r?.name??"a remote"}</span
					>
				</gl-button>
			`),i();if(r?.state?.ahead||r?.state?.behind){let t=!!r.state.ahead,a=!!r.state.behind;if(t&&a)return o.push(ex`
					<gl-button
						aria-busy=${n??eP}
						?disabled=${n}
						href=${this._webview.createCommandLink("gitlens.pull:")}
						appearance="secondary"
						density="compact"
					>
						<code-icon icon="repo-pull" slot="${(c?void 0:"prefix")??eP}"></code-icon>
						${c?"":"Pull"}
						<gl-tracking-pill
							.ahead=${r.state.ahead}
							.behind=${r.state.behind}
							slot="suffix"
						></gl-tracking-pill>
						<span slot="tooltip"
							>Pull${r?.name?ex` from <strong>${r.name}</strong>`:""}</span
						>
					</gl-button>
					<gl-button
						aria-busy=${n??eP}
						?disabled=${n}
						href=${this._webview.createCommandLink("gitlens.push:",{force:!0})}
						appearance="secondary"
						density="compact"
					>
						<code-icon icon="repo-force-push"></code-icon>
						<span slot="tooltip"
							>Force Push${r?.name?ex` to <strong>${r.name}</strong>`:""}</span
						>
					</gl-button>
				`),i();if(a)return o.push(ex`
					<gl-button
						aria-busy=${n??eP}
						?disabled=${n}
						href=${this._webview.createCommandLink("gitlens.pull:")}
						appearance="secondary"
						density="compact"
					>
						<code-icon icon="repo-pull" slot="${(c?void 0:"prefix")??eP}"></code-icon>
						${c?"":"Pull"}
						<gl-tracking-pill
							.ahead=${r.state.ahead}
							.behind=${r.state.behind}
							slot="suffix"
						></gl-tracking-pill>
						<span slot="tooltip"
							>Pull${r?.name?ex` from <strong>${r.name}</strong>`:""}</span
						>
					</gl-button>
				`),i();t&&o.push(ex`
					<gl-button
						aria-busy=${n??eP}
						?disabled=${n}
						href=${this._webview.createCommandLink("gitlens.push:")}
						appearance="secondary"
						density="compact"
					>
						<code-icon icon="repo-push" slot="prefix"></code-icon>
						${c?"":"Push"}
						<gl-tracking-pill
							.ahead=${r.state.ahead}
							.behind=${r.state.behind}
							slot="suffix"
						></gl-tracking-pill>
						<span slot="tooltip"
							>Push${r?.name?ex` to <strong>${r.name}</strong>`:""}</span
						>
					</gl-button>
				`)}return i()}renderBranchIndicator(){let t=this.wip;if(t?.pausedOpStatus!=null)return ex`<gl-merge-rebase-status
			?conflicts=${t.hasConflicts}
			.pausedOpStatus=${t.pausedOpStatus}
		></gl-merge-rebase-status>`}getBranchActions(){return[]}getPrActions(){return[ex`<action-item
				label="Open Pull Request Changes"
				icon="request-changes"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestChanges:")}
			></action-item>`,ex`<action-item
				label="Compare Pull Request"
				icon="git-compare"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestComparison:")}
			></action-item>`,ex`<action-item
				label="Open Pull Request Details"
				icon="eye"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestDetails:")}
			></action-item>`]}getCollapsedActions(){return[]}renderIssuesItem(){return[...this.issues??[],...this.autolinks??[]].length?super.renderIssuesItem():this.expanded?ex`<div class="branch-item__row" full>
				<span class="branch-item__missing" full>Current work item</span>
				<gl-button
					class="associate-issue-action"
					appearance="toolbar"
					href=${ib("gitlens.associateIssueWithBranch",{command:"associateIssueWithBranch",branch:this.branch.reference,source:"home"})}
					tooltip="Associate Issue with Branch"
					aria-label="Associate Issue with Branch"
					><issue-icon></issue-icon>
				</gl-button>
			</div>`:eP}};cJ.styles=[iv,lF,F`
			:host {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-8);
			}

			span.branch-item__missing {
				font-style: italic;
				color: var(--vscode-descriptionForeground);
			}

			gl-work-item {
				--gl-card-vertical-padding: 0.4rem;
			}

			.associate-issue-action {
				--button-padding: 0.2rem;
				--button-line-height: 1.2rem;
			}
		`],cJ=cV([eL("gl-active-branch-card")],cJ);var cX=Object.defineProperty,cZ=Object.getOwnPropertyDescriptor,cQ=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cZ(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cX(r,o,a),a};let c0=class extends tB(lit_element_i){constructor(){super(...arguments),this.onRefreshClicked=()=>{let t=this._launchpad.service;null!=t&&o5(this._launchpad,t)}}connectedCallback(){super.connectedCallback?.();let t=this._launchpad.service;null!=t&&o5(this._launchpad,t)}get startWorkCommand(){return this._webview.createCommandLink("gitlens.startWork:")}get createBranchCommand(){return this._webview.createCommandLink("gitlens.createBranch:")}render(){let t=this._launchpad.launchpadLoading.get();return ex`
			<gl-section ?loading=${t}>
				<span slot="heading">Launchpad</span>
				<span class="section-heading-actions" slot="heading-actions">
					<gl-button
						aria-busy=${t?"true":"false"}
						?disabled=${t}
						class="section-heading-action"
						appearance="toolbar"
						tooltip="Refresh Launchpad"
						@click=${this.onRefreshClicked}
						><code-icon icon="refresh"></code-icon
					></gl-button>
				</span>
				<div class="summary">${this.renderSummaryResult()}</div>
				<button-container grouping="gap-wide">
					<gl-button full class="start-work" href=${this.startWorkCommand}>Start Work on an Issue</gl-button>
					<gl-button
						appearance="secondary"
						density="compact"
						class="start-work"
						href=${this.createBranchCommand}
						tooltip="Create New Branch"
						><code-icon icon="custom-start-work"></code-icon
					></gl-button>
				</button-container>
			</gl-section>
		`}renderSummaryResult(){if(!1===this._integrations.hasAnyIntegrationConnected.get())return ex`<ul class="menu">
				<li>
					<a
						class="launchpad-action"
						href="${ib("gitlens.plus.cloudIntegrations.connect",{source:{source:"home"}})}"
					>
						<code-icon class="launchpad-action__icon" icon="plug"></code-icon>
						<span>Connect to see PRs and Issue here</span>
					</a>
				</li>
			</ul>`;let t=this._launchpad.launchpadSummary.get();return null==t?this.renderPending():this.renderSummary(t)}renderPending(){return ex`
			<div class="loader">
				<skeleton-loader lines="1"></skeleton-loader>
				<skeleton-loader lines="1"></skeleton-loader>
			</div>
		`}renderSummary(t){if(null==t)return eP;if(!("total"in t))return ex`<ul class="menu">
				<li>Unable to load items</li>
			</ul>`;let r=[];if(null!=t.error&&r.push(ex`<li>
					<span class="launchpad-action">
						<code-icon class="launchpad-action__icon" icon="warning"></code-icon>
						<span>Some integrations failed to load</span>
					</span>
				</li>`),0===t.total)return r.push(ex`<li>You are all caught up!</li>`),ex`<ul class="menu">
				${r}
			</ul>`;if(!t.hasGroupedItems)return r.push(ex`<li>No pull requests need your attention</li>
					<li>(${t.total} other pull requests)</li>`),ex`<ul class="menu">
				${r}
			</ul>`;for(let o of t.groups){let i;switch(o){case"mergeable":{if(0===(i=t.mergeable?.total??0))continue;let o=`command:gitlens.showLaunchpad?${encodeURIComponent(JSON.stringify({source:"home",state:{initialGroup:"mergeable"}}))}`;r.push(ex`<li>
							<a href=${o} class="launchpad-action launchpad-action--mergable">
								<code-icon class="launchpad-action__icon" icon="rocket"></code-icon>
								<span>${t_("pull request",i)} can be merged</span>
							</a>
						</li>`);break}case"blocked":{if(0===(i=t.blocked?.total??0))continue;let o=[];t.blocked.unassignedReviewers&&o.push({count:t.blocked.unassignedReviewers,message:`${t.blocked.unassignedReviewers>1?"need":"needs"} reviewers`}),t.blocked.failedChecks&&o.push({count:t.blocked.failedChecks,message:`${t.blocked.failedChecks>1?"have":"has"} failed CI checks`}),t.blocked.conflicts&&o.push({count:t.blocked.conflicts,message:`${t.blocked.conflicts>1?"have":"has"} conflicts`});let n=`command:gitlens.showLaunchpad?${encodeURIComponent(JSON.stringify({source:"home",state:{initialGroup:"blocked"}}))}`;1===o.length?r.push(ex`<li>
								<a href=${n} class="launchpad-action launchpad-action--blocked">
									<code-icon class="launchpad-action__icon" icon="error"></code-icon>
									<span>${t_("pull request",i)} ${o[0].message}</span>
								</a>
							</li>`):r.push(ex`<li>
								<a href=${n} class="launchpad-action launchpad-action--blocked">
									<code-icon class="launchpad-action__icon" icon="error"></code-icon>
									<span
										>${t_("pull request",i)} ${i>1?"are":"is"} blocked
										(${o.map(t=>`${t.count} ${t.message}`).join(", ")})</span
									>
								</a>
							</li>`);break}case"follow-up":{if(0===(i=t.followUp?.total??0))continue;let o=`command:gitlens.showLaunchpad?${encodeURIComponent(JSON.stringify({source:"home",state:{initialGroup:"follow-up"}}))}`;r.push(ex`<li>
							<a href=${o} class="launchpad-action launchpad-action--attention">
								<code-icon class="launchpad-action__icon" icon="report"></code-icon>
								<span
									>${t_("pull request",i)} ${i>1?"require":"requires"}
									follow-up</span
								>
							</a>
						</li>`);break}case"needs-review":{if(0===(i=t.needsReview?.total??0))continue;let o=`command:gitlens.showLaunchpad?${encodeURIComponent(JSON.stringify({source:"home",state:{initialGroup:"needs-review"}}))}`;r.push(ex`<li>
							<a href=${o} class="launchpad-action launchpad-action--attention">
								<code-icon class="launchpad-action__icon" icon="comment-unresolved"></code-icon>
								<span
									>${t_("pull request",i)} ${i>1?"need":"needs"} your
									review</span
								>
							</a>
						</li>`)}}}return ex`<menu class="menu">${r}</menu>`}};c0.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},c0.styles=[iv,F`
			:host {
				display: block;
				margin-bottom: var(--gl-space-24);
				color: var(--vscode-foreground);
			}

			.summary {
				margin-bottom: var(--gl-space-10);
			}

			.menu {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-4);
				padding-inline-start: 0;
				margin-block-start: 0;
				list-style: none;
			}

			.launchpad-action {
				display: flex;
				gap: var(--gl-space-6);
				align-items: center;
				color: inherit;
				text-decoration: none;
			}

			.launchpad-action:hover {
				text-decoration: none;
			}

			.launchpad-action:hover:not(span) span {
				text-decoration: underline;
			}

			.launchpad-action__icon {
				color: var(--gl-launchpad-action-color, inherit);
			}

			.launchpad-action:hover .launchpad-action__icon {
				color: var(--gl-launchpad-action-hover-color, inherit);
			}

			.launchpad-action--mergable {
				--gl-launchpad-action-color: var(--vscode-gitlens-launchpadIndicatorMergeableColor);
				--gl-launchpad-action-hover-color: var(--vscode-gitlens-launchpadIndicatorMergeableHoverColor);
			}

			.launchpad-action--blocked {
				--gl-launchpad-action-color: var(--vscode-gitlens-launchpadIndicatorBlockedColor);
				--gl-launchpad-action-hover-color: var(--vscode-gitlens-launchpadIndicatorBlockedHoverColor);
			}

			.launchpad-action--attention {
				--gl-launchpad-action-color: var(--vscode-gitlens-launchpadIndicatorAttentionColor);
				--gl-launchpad-action-hover-color: var(--vscode-gitlens-launchpadIndicatorAttentionHoverColor);
			}

			.loader {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-4);
			}

			.section-heading-actions {
				display: flex;
				flex: none;
				align-items: center;
			}

			.section-heading-action {
				--button-padding: 0.2rem;
				--button-line-height: 1.2rem;
			}
		`],cQ([O({context:"launchpad"})],c0.prototype,"_launchpad",2),cQ([O({context:"integrations"})],c0.prototype,"_integrations",2),cQ([O({context:"webview"})],c0.prototype,"_webview",2),c0=cQ([eL("gl-launchpad")],c0);var c1=Object.defineProperty,c2=Object.getOwnPropertyDescriptor;let c5=class extends lit_element_i{firstUpdated(t){this.role="listbox"}render(){return ex`<slot></slot>`}};c5.styles=[om,F`
			:host {
				width: max-content;
				padding-bottom: var(--gl-space-6);
				background-color: var(--vscode-menu-background);
				border: var(--gl-border-width) solid var(--vscode-menu-border);
			}
		`],c5=((t,r,o,i)=>{for(var n,a=i>1?void 0:i?c2(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&c1(r,o,a),a})([eL("menu-list")],c5);var c4=Object.defineProperty,c6=Object.getOwnPropertyDescriptor,c3=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?c6(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&c4(r,o,a),a};let c8=class extends GlElement{constructor(){super(...arguments),this.items=[],this.placement="bottom-end",this.disabled=!1,this.keepOpenOnSelect=!1,this.handleAfterShow=()=>{requestAnimationFrame(()=>{if(this._popover?.open!==!0)return;let t=this._menuItems.filter(t=>!t.disabled),r=t.find(t=>"true"===t.getAttribute("aria-selected"));(r??t[0])?.focus()})},this.handleAfterHide=()=>{this._menuItems.some(t=>t.matches(":focus"))&&this.querySelector('[slot="anchor"]')?.focus()},this.handleKeydown=t=>{let r;if(this._popover?.open!==!0)return;let{key:o}=t;if("ArrowDown"!==o&&"ArrowUp"!==o&&"Home"!==o&&"End"!==o)return;let i=this._menuItems.filter(t=>!t.disabled);if(0===i.length)return;t.preventDefault();let n=i.findIndex(t=>t.matches(":focus"));r="Home"===o?0:"End"===o?i.length-1:"ArrowDown"===o?n<0?0:(n+1)%i.length:n<0?i.length-1:(n-1+i.length)%i.length,i[r]?.focus()}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("gl-popover-after-show",this.handleAfterShow),this.addEventListener("gl-popover-after-hide",this.handleAfterHide)}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("gl-popover-after-show",this.handleAfterShow),this.removeEventListener("gl-popover-after-hide",this.handleAfterHide),super.disconnectedCallback?.()}get _menuItems(){return[...this.shadowRoot?.querySelectorAll("menu-item")??[]]}onItemClick(t,r){!t.disabled&&(r.stopPropagation(),this.emit("gl-menu-select",{value:t.value}),this.keepOpenOnSelect||this._popover?.hide())}render(){return ex`<gl-popover
			appearance="menu"
			placement=${this.placement}
			trigger="click"
			?disabled=${this.disabled}
			.arrow=${!1}
			.distance=${2}
		>
			<slot name="anchor" slot="anchor"></slot>
			<menu-list slot="content">
				${this.items.map(t=>ex`<menu-item
							aria-selected=${t.selected?"true":"false"}
							?disabled=${t.disabled}
							@click=${r=>this.onItemClick(t,r)}
						>
							<code-icon icon=${t.selected?"check":"blank"}></code-icon>
							<span>${t.label}</span>
						</menu-item>`)}
			</menu-list>
		</gl-popover>`}};c8.styles=F`
		:host {
			display: contents;
		}

		/* Strip menu-list's standalone chrome (its own border + asymmetric bottom padding) — inside
	   the popover's menu-mode body it just needs a small symmetric vertical pad so the first/
	   last item clear the body padding. */
		menu-list {
			padding: var(--gl-space-2) 0;
			background: transparent;
			border: 0;
		}

		menu-item {
			display: flex;
			gap: var(--gl-space-4);
			align-items: center;
		}

		/* Fixed-width check column so labels align whether or not an item is selected — the
	   unselected items render a blank icon that occupies the column invisibly. */
		menu-item code-icon {
			flex: 0 0 1.4rem;
		}
	`,c3([eN("gl-popover")],c8.prototype,"_popover",2),c3([eD({type:Array})],c8.prototype,"items",2),c3([eD()],c8.prototype,"placement",2),c3([eD({type:Boolean})],c8.prototype,"disabled",2),c3([eD({type:Boolean,attribute:"keep-open-on-select"})],c8.prototype,"keepOpenOnSelect",2),c8=c3([eL("gl-menu-popover")],c8);var c7=Object.defineProperty,c9=Object.getOwnPropertyDescriptor,de=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?c9(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&c7(r,o,a),a};let dt=class extends lit_element_i{constructor(){super(...arguments),this.labelTitle="",this.labelType="workspace"}render(){return 0===this.sessions.length?eP:ex`
			<gl-card>
				<div class="content">
					<p class="header">
						<span class="header__icon"
							><code-icon
								icon=${"workspace"===this.labelType?"folder-library":"folder"}
								title=${"workspace"===this.labelType?"Workspace":"Working Directory"}
							></code-icon
						></span>
						<span class="header__name" title=${this.labelTitle}>${this.label}</span>
					</p>
					${this.renderDetails()}
					<div class="sessions">${this.sessions.map(t=>this.renderSession(t))}</div>
				</div>
			</gl-card>
		`}renderDetails(){let t=new Map;for(let r of this.sessions){let o=r.worktreePath;null==o||t.has(o)||t.set(o,{label:r.worktree?.name??(0,lc.basename)(o),cwd:r.cwd})}return 0===t.size?eP:ex`
			<div class="details">
				${Array.from(t.values(),({label:t,cwd:r})=>ex`<span class="detail" title=${r??t}
							><code-icon icon="folder-opened" title="Worktree"></code-icon>${t}</span
						>`)}
			</div>
		`}renderSession(t){return ex`
			<div class="session">
				<code-icon icon="robot" title="Agent"></code-icon>
				<gl-agent-status-pill .session=${t}></gl-agent-status-pill>
				<span class="session__name">${t.displayName}</span>
				${t.subagentCount>0?ex`<span class="session__subagents">
							<code-icon icon="organization" title="Subagents"></code-icon>
							${t.subagentCount}
						</span>`:eP}
			</div>
		`}};dt.styles=[F`
			:host {
				display: block;
			}

			.content {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-4);
				padding: var(--gl-space-4) 0;
			}

			.header {
				display: inline-flex;
				gap: var(--gl-space-6);
				align-items: center;
				max-width: 100%;
				margin-block: 0;
			}

			.header__icon {
				flex: none;
				color: var(--vscode-descriptionForeground);
			}

			.header__name {
				flex: 1;
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				font-weight: bold;
				white-space: nowrap;
			}

			.details {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-2);
				font-size: 0.9em;
				color: var(--vscode-descriptionForeground);
			}

			.detail {
				display: inline-flex;
				gap: var(--gl-space-4);
				align-items: center;
			}

			.sessions {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-4);
			}

			.session {
				display: flex;
				flex-flow: row wrap;
				gap: var(--gl-space-4);
				align-items: center;
			}

			.session code-icon {
				color: var(--vscode-descriptionForeground);
			}

			.session__name {
				font-size: 0.9em;
				color: var(--vscode-descriptionForeground);
			}

			.session__subagents {
				color: var(--vscode-descriptionForeground);
			}
		`],de([eD()],dt.prototype,"label",2),de([eD()],dt.prototype,"labelTitle",2),de([eD()],dt.prototype,"labelType",2),de([eD({type:Array})],dt.prototype,"sessions",2),dt=de([eL("gl-agent-session-card")],dt);var dr=Object.defineProperty,di=Object.getOwnPropertyDescriptor,dn=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?di(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&dr(r,o,a),a};let da=[{value:"OneDay",label:"1 day"},{value:"OneWeek",label:"1 week"},{value:"OneMonth",label:"1 month"}],ds=class extends tB(lit_element_i){constructor(){super(...arguments),this._activeTab="recent",this._agentFilter="workspace",this.onChangeRecentThresholdFilter=t=>{this._inactiveOverviewState.filter.stale&&this._inactiveOverviewState.filter.recent&&this._homeCtx.homeService?.setOverviewFilter({stale:this._inactiveOverviewState.filter.stale,recent:{...this._inactiveOverviewState.filter.recent,threshold:t.detail.value}})},this.onAgentFilterChange=t=>{this._agentFilter=t.target.value}}connectedCallback(){super.connectedCallback?.(),this._homeCtx.repositories.get().openCount>0&&this._inactiveOverviewState.fetch()}render(){return this._homeCtx.discovering.get()?this.renderLoader():0===this._homeCtx.repositories.get().openCount?eP:(this._homeCtx.agentSessions.get()?.length??0)>0?"agents"===this._activeTab?this.renderAgentsTab():this.renderRecentTab():this.renderRecentOnly()}renderTabs(){return ex`<div class="tabs" slot="heading" role="tablist">
			<button
				class="tab"
				role="tab"
				aria-selected=${"recent"===this._activeTab}
				@click=${()=>this.switchTab("recent")}
			>
				Recent
			</button>
			<button
				class="tab"
				role="tab"
				aria-selected=${"agents"===this._activeTab}
				@click=${()=>this.switchTab("agents")}
			>
				Agents
			</button>
		</div>`}switchTab(t){this._activeTab!==t&&(this._activeTab=t,"agents"===t&&this._agentOverviewState.fetch())}renderRecentOnly(){if(null!=this._inactiveOverviewState.error.get())return ex`
				<gl-section>
					<span slot="heading">Recent</span>
					<span
						>Unable to load branch data.
						<a
							href="#"
							@click=${t=>{t.preventDefault(),this._inactiveOverviewState.fetch()}}
							>Retry</a
						>
					</span>
				</gl-section>
			`;let t=this._inactiveOverviewState.value.get();return null==t?this.renderLoader():this.renderRecentOnlyComplete(t,this._inactiveOverviewState.loading.get())}renderRecentOnlyComplete(t,r=!1){if(null==t)return eP;let{repository:o}=t;return ex`
			<gl-branch-section
				label="recent"
				.isFetching=${r}
				.repo=${o.path}
				.branches=${t.recent}
			>
				${this.renderRecentThresholdFilter(r)}
			</gl-branch-section>
			${it(this._inactiveOverviewState.filter.stale?.show===!0&&t.stale,()=>ex`
					<gl-branch-section
						label="stale"
						.repo=${o.path}
						.branches=${t.stale}
					></gl-branch-section>
				`)}
		`}renderRecentThresholdFilter(t){let r=this._inactiveOverviewState.filter.recent?.threshold,o=da.find(t=>t.value===r)?.label??da[1].label;return ex`
			<gl-menu-popover
				slot="heading-actions"
				placement="bottom-end"
				?disabled=${t}
				.items=${da.map(t=>({value:t.value,label:t.label,selected:t.value===r}))}
				@gl-menu-select=${this.onChangeRecentThresholdFilter}
			>
				<button
					slot="anchor"
					class="threshold-filter"
					type="button"
					?disabled=${t}
					aria-label="Change Recent Timeframe"
				>
					${o}<code-icon icon="chevron-down"></code-icon>
				</button>
			</gl-menu-popover>
		`}renderRecentTab(){if(null!=this._inactiveOverviewState.error.get())return ex`
				<gl-section>
					${this.renderTabs()}
					<span
						>Unable to load branch data.
						<a
							href="#"
							@click=${t=>{t.preventDefault(),this._inactiveOverviewState.fetch()}}
							>Retry</a
						>
					</span>
				</gl-section>
			`;let t=this._inactiveOverviewState.value.get();return null==t?this.renderLoader():this.renderRecentTabComplete(t,this._inactiveOverviewState.loading.get())}renderRecentTabComplete(t,r=!1){if(null==t)return eP;let{repository:o}=t;return ex`
			<gl-section ?loading=${r}>
				${this.renderTabs()} ${this.renderRecentThresholdFilter(r)}
				${this.renderBranchCards(t.recent,o.path)}
			</gl-section>
			${it(this._inactiveOverviewState.filter.stale?.show===!0&&t.stale,()=>ex`
					<gl-branch-section
						label="stale"
						.repo=${o.path}
						.branches=${t.stale}
					></gl-branch-section>
				`)}
		`}renderAgentsTab(){if(null!=this._agentOverviewState.error.get())return ex`
				<gl-section>
					${this.renderTabs()}
					<span
						>Unable to load agent branch data.
						<a
							href="#"
							@click=${t=>{t.preventDefault(),this._agentOverviewState.fetch()}}
							>Retry</a
						>
					</span>
				</gl-section>
			`;let t=this._agentOverviewState.value.get();return null==t?this.renderLoader():this.renderAgentsTabComplete(t,this._agentOverviewState.loading.get())}renderAgentsTabComplete(t,r=!1){if(null==t)return eP;let{repository:o}=t,i=this.filterAgentBranches(t.recent),n="all"===this._agentFilter?this.getUnrepresentedAgentSessions(i):[];return ex`
			<gl-section ?loading=${r}>
				${this.renderTabs()}
				<select
					slot="heading-actions"
					class="select"
					.value=${this._agentFilter}
					@change=${this.onAgentFilterChange}
				>
					<option value="workspace" ?selected=${"workspace"===this._agentFilter}>workspace</option>
					<option value="all" ?selected=${"all"===this._agentFilter}>all</option>
				</select>
				${i.length>0||n.length>0?ex`${i.length>0?this.renderBranchCards(i,o.path):eP}${this.renderAgentSessionCards(n)}`:ex`<p>No agent sessions</p>`}
			</gl-section>
		`}filterAgentBranches(t){if("all"===this._agentFilter)return t;let r=this._homeCtx.agentSessions.get()??[],o=new Set;for(let r of t)r.worktree?.path!=null&&o.add(r.worktree.path);let i=new Set;for(let t of r)null!=t.worktreePath&&o.has(t.worktreePath)&&i.add(t.worktreePath);return t.filter(t=>t.worktree?.path!=null&&i.has(t.worktree.path))}getUnrepresentedAgentSessions(t){let r=this._homeCtx.agentSessions.get()??[];if(0===r.length)return[];let o=new Set;for(let r of t)r.worktree?.path!=null&&o.add(r.worktree.path);return r.filter(t=>null==t.worktreePath||!o.has(t.worktreePath))}renderAgentSessionCards(t){if(0===t.length)return eP;let r=new Map;for(let o of t){let t=o.worktreePath||o.workspacePath||o.cwd||"unknown",i=r.get(t);null==i&&(i=[],r.set(t,i)),i.push(o)}return ex`${Array.from(r,([t,r])=>ex`
				<gl-agent-session-card
					.label=${"unknown"!==t?(0,lc.basename)(t):"Unknown"}
					.labelTitle=${"unknown"!==t?t:""}
					.labelType=${r[0].worktreePath||r[0].workspacePath?"workspace":"cwd"}
					.sessions=${r}
				></gl-agent-session-card>
			`)}`}renderBranchCards(t,r){return 0===t.length?ex`<p>No branches</p>`:t.map(t=>ex`<gl-branch-card expandable .repo=${r} .branch=${t}></gl-branch-card>`)}renderLoader(){return ex`
			<gl-section>
				<skeleton-loader slot="heading" lines="1"></skeleton-loader>
				<skeleton-loader lines="3"></skeleton-loader>
			</gl-section>
		`}};ds.styles=[iv,F`
			:host {
				display: block;
				margin-bottom: var(--gl-space-24);
				color: var(--vscode-foreground);
			}

			/* Native <select> styling — used by the agents workspace/all filter. */
			.select {
				font-weight: 500;
				color: var(--color-foreground--25);
				text-decoration: none !important;
				outline: none;
				background: none;
				border: none;
			}

			.select option {
				color: var(--vscode-foreground);
				background-color: var(--vscode-dropdown-background);
			}

			.select option:checked {
				color: var(--vscode-list-activeSelectionForeground);
				background-color: var(--vscode-list-activeSelectionBackground);
			}

			.select:not(:disabled) {
				color: var(--color-foreground--50);
				cursor: pointer;
			}

			.select:not(:disabled):focus {
				outline: var(--gl-border-width) solid var(--color-focus-border);
			}

			.select:not(:disabled):hover {
				color: var(--vscode-foreground);
				text-decoration: underline !important;
			}

			/* Recent-timeframe filter — the gl-menu-popover anchor button. */
			.threshold-filter {
				display: inline-flex;
				gap: var(--gl-space-2);
				align-items: center;
				padding: 0;
				font: inherit;
				font-weight: 500;
				color: var(--color-foreground--50);
				white-space: nowrap;
				cursor: pointer;
				background: none;
				border: none;
			}

			.threshold-filter:hover:not(:disabled) {
				color: var(--vscode-foreground);
			}

			.threshold-filter:focus-visible {
				outline: var(--gl-border-width) solid var(--color-focus-border);
			}

			.threshold-filter:disabled {
				color: var(--color-foreground--25);
				cursor: default;
			}

			.threshold-filter code-icon {
				font-size: var(--gl-font-micro);
			}

			.tabs {
				display: inline-flex;
				gap: var(--gl-space-6);
			}

			.tab {
				padding: 0;
				margin: 0;
				font-family: inherit;
				font-size: inherit;
				font-weight: normal;
				color: var(--vscode-descriptionForeground);
				text-transform: uppercase;
				appearance: none;
				cursor: pointer;
				background: none;
				border: none;
			}

			.tab:hover {
				color: var(--vscode-foreground);
			}

			.tab[aria-selected='true'] {
				color: var(--vscode-foreground);
			}
		`],dn([O({context:"homeState"})],ds.prototype,"_homeCtx",2),dn([O({context:"inactiveOverviewState"})],ds.prototype,"_inactiveOverviewState",2),dn([O({context:"agentOverviewState"})],ds.prototype,"_agentOverviewState",2),dn([eF()],ds.prototype,"_activeTab",2),dn([eF()],ds.prototype,"_agentFilter",2),ds=dn([eL("gl-overview")],ds);var dl=Object.defineProperty,dc=Object.getOwnPropertyDescriptor,dd=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?dc(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&dl(r,o,a),a};let dh=class extends tB(lit_element_i){get hasAlerts(){return!0===this.alertVisibility.header||void 0}get alertVisibility(){let t={header:!1,untrusted:!1,noRepo:!1,unsafeRepo:!1};if(this._homeCtx.discovering.get())return t;let r=this._homeCtx.repositories.get();return r.trusted?0===r.openCount?(t.header=!0,t.noRepo=!0):r.hasUnsafe&&(t.header=!0,t.unsafeRepo=!0):(t.header=!0,t.untrusted=!0),t}render(){return this._homeCtx.ready.get()?this.alertVisibility.header?ex`
			${it(this.alertVisibility.noRepo,()=>ex`
					<div id="no-repo-alert" class="alert alert--info mb-0">
						<h1 class="alert__title">No repository detected</h1>
						<div class="alert__description">
							<p>
								To use GitLens, open a folder containing a git repository or clone from a URL from the
								Explorer.
							</p>
							<p class="centered">
								<gl-button class="is-basic" href="command:workbench.view.scm"
									>Open a Folder or Repository</gl-button
								>
							</p>
							<p class="mb-0">
								If you have opened a folder with a repository, please let us know by
								<a class="one-line" href="https://github.com/gitkraken/vscode-gitlens/issues/new/choose"
									>creating an Issue</a
								>.
							</p>
						</div>
					</div>
				`)}
			${it(this.alertVisibility.unsafeRepo,()=>ex`
					<div id="unsafe-repo-alert" class="alert alert--info mb-0">
						<h1 class="alert__title">Unsafe repository</h1>
						<div class="alert__description">
							<p>
								Unable to open any repositories as Git blocked them as potentially unsafe, due to the
								folder(s) not being owned by the current user.
							</p>
							<p class="centered">
								<gl-button class="is-basic" href="command:workbench.view.scm"
									>Manage in Source Control</gl-button
								>
							</p>
						</div>
					</div>
				`)}
			${it(this.alertVisibility.untrusted,()=>ex`
					<div id="untrusted-alert" class="alert alert--info mb-0" aria-hidden="true">
						<h1 class="alert__title">Untrusted workspace</h1>
						<div class="alert__description">
							<p>Unable to open repositories in Restricted Mode.</p>
							<p class="centered">
								<gl-button class="is-basic" href="command:workbench.trust.manage"
									>Manage Workspace Trust</gl-button
								>
							</p>
						</div>
					</div>
				`)}
		`:void 0:eP}};dh.styles=[of,o3,o7,F`
			.alert {
				margin-bottom: 0;
			}

			.centered {
				text-align: center;
			}

			.one-line {
				white-space: nowrap;
			}

			gl-button.is-basic {
				width: 100%;
				max-width: 300px;
			}

			gl-button.is-basic + gl-button.is-basic {
				margin-top: var(--gl-space-10);
			}
		`],dd([O({context:"homeState"})],dh.prototype,"_homeCtx",2),dd([eD({type:Boolean,reflect:!0,attribute:"has-alerts"})],dh.prototype,"hasAlerts",1),dh=dd([eL("gl-repo-alerts")],dh);let dp=F`
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
`;var du=Object.defineProperty,dg=Object.getOwnPropertyDescriptor,db=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?dg(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&du(r,o,a),a};let dm=class extends lit_element_i{constructor(){super(...arguments),this.display="solid",this.dismissible=!1,this.layout="default"}get classNames(){return{banner:!0,[`banner--${this.display}`]:!0,[`banner--${this.layout}`]:"default"!==this.layout}}render(){return ex`<div part="base" class=${nU(this.classNames)}>
			<div class="banner__content">
				${"responsive"===this.layout?this.renderResponsiveContent():this.renderDefaultContent()}
			</div>
			${"responsive"!==this.layout?this.renderDismissButton():void 0}
		</div>`}renderDefaultContent(){return ex`${this.renderTitle()} ${this.renderBody()} ${this.renderButtons()}`}renderResponsiveContent(){return ex`
			<div class="banner__text">${this.renderTitle()} ${this.renderBody()}</div>
			${this.renderButtons()} ${this.renderDismissButton()}
		`}renderTitle(){if(this.bannerTitle)return ex`<div class="banner__title">${this.bannerTitle}</div>`}renderBody(){if(this.body)return ex`<div class="banner__body">${i_(this.body)}</div>`}renderButtons(){let t=this.renderPrimaryButton(),r=this.renderSecondaryButton();if(t||r)return ex`<div class="banner__buttons">${t} ${r}</div>`}renderPrimaryButton(){if(this.primaryButton)return ex`
			<gl-button
				class="banner__button banner__button--primary"
				appearance=${"gradient-purple"===this.display?"secondary":void 0}
				?full=${"gradient-purple"===this.display}
				href=${this.primaryButtonHref??eP}
				truncate
				@click=${this.onPrimaryButtonClick}
			>
				${this.primaryButton}
			</gl-button>
		`}renderSecondaryButton(){if(this.secondaryButton)return ex`
			<gl-button
				class="banner__button banner__button--secondary"
				appearance="toolbar"
				href=${this.secondaryButtonHref??eP}
				@click=${this.onSecondaryButtonClick}
			>
				${this.secondaryButton}
			</gl-button>
		`}renderDismissButton(){if(this.dismissible)return ex`
			<gl-button
				class="banner__dismiss"
				appearance="toolbar"
				href=${this.dismissHref??eP}
				aria-label="Dismiss"
				tooltip="Dismiss"
				@click=${this.onDismissClick}
			>
				<code-icon icon="close"></code-icon>
			</gl-button>
		`}onPrimaryButtonClick(t){this.primaryButtonCommand&&t.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-primary-click",{detail:{command:this.primaryButtonCommand},bubbles:!0,composed:!0}))}onSecondaryButtonClick(t){this.secondaryButtonCommand&&t.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-secondary-click",{detail:{command:this.secondaryButtonCommand},bubbles:!0,composed:!0}))}onDismissClick(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-dismiss",{bubbles:!0,composed:!0}))}};dm.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},dm.styles=[dp],db([eD({reflect:!0})],dm.prototype,"display",2),db([eD({attribute:"banner-title"})],dm.prototype,"bannerTitle",2),db([eD()],dm.prototype,"body",2),db([eD({attribute:"primary-button"})],dm.prototype,"primaryButton",2),db([eD({attribute:"primary-button-href"})],dm.prototype,"primaryButtonHref",2),db([eD({attribute:"primary-button-command"})],dm.prototype,"primaryButtonCommand",2),db([eD({attribute:"secondary-button"})],dm.prototype,"secondaryButton",2),db([eD({attribute:"secondary-button-href"})],dm.prototype,"secondaryButtonHref",2),db([eD({attribute:"secondary-button-command"})],dm.prototype,"secondaryButtonCommand",2),db([eD({type:Boolean,attribute:"dismissible"})],dm.prototype,"dismissible",2),db([eD({attribute:"dismiss-href"})],dm.prototype,"dismissHref",2),db([eD({attribute:"layout"})],dm.prototype,"layout",2),dm=db([eL("gl-banner")],dm);var df=Object.defineProperty,dv=Object.getOwnPropertyDescriptor,dy=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?dv(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&df(r,o,a),a};let dw=class extends tB(lit_element_i){render(){let t=this.error.get();return t?ex`<gl-banner
			display="solid"
			banner-title="Something went wrong"
			.body=${t}
			dismissible
			@gl-banner-dismiss=${()=>this.error.set(void 0)}
		></gl-banner>`:eP}};dy([eD({attribute:!1})],dw.prototype,"error",2),dw=dy([eL("gl-error-banner")],dw);var d_=Object.defineProperty,dk=Object.getOwnPropertyDescriptor,d$=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?dk(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&d_(r,o,a),a};let dx=class extends lit_element_i{constructor(){super(...arguments),this.source="unknown",this.layout="default",this.collapsed=!1}render(){if(this.collapsed)return eP;let t=`Configure Claude to send status updates to GitLens so you can see and manage your parallel agent work. <a href="${io.helpCenterAiHooks}">Learn more</a>`;return ex`
			<gl-banner
				exportparts="base"
				display="gradient-purple"
				layout="${this.layout}"
				banner-title="Install Claude Code Hooks"
				body="${t}"
				primary-button="Install Hooks"
				primary-button-href="${ib("gitlens.agents.installClaudeHook")}"
				dismissible
				dismiss-href="${ib("gitlens.onboarding.dismiss",{id:"hooks:banner"})}"
			></gl-banner>
		`}};dx.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},dx.styles=[F`
			:host {
				display: block;
			}

			gl-banner {
				margin-bottom: var(--gl-space-12);
			}

			:host([layout='responsive']) gl-banner {
				width: 100%;
				margin-bottom: 0;
			}
		`],d$([eD()],dx.prototype,"source",2),d$([eD()],dx.prototype,"layout",2),d$([eD({type:Boolean})],dx.prototype,"collapsed",2),dx=d$([eL("gl-hooks-banner")],dx);var dC=Object.defineProperty,dS=Object.getOwnPropertyDescriptor,dP=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?dS(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&dC(r,o,a),a};let dA=class extends lit_element_i{constructor(){super(...arguments),this.source="unknown",this.layout="default",this.collapsed=!1,this.canAutoRegister=!1,this.canInstallClaudeHook=!1,this.showCleanupNotice=!1}render(){if(this.collapsed)return eP;let t=this.canInstallClaudeHook?ib("gitlens.agents.installClaudeHook"):void 0;if(this.canAutoRegister){let r=this.showCleanupNotice?" &mdash; <strong>Note:</strong> You may have a duplicate entry in your Cursor <code>mcp.json</code>. Remove <code>mcpServers.GitKraken</code> to clean it up.":"",o=`GitKraken MCP is active in your AI chat, leveraging Git and your integrations to provide context and perform actions. <a href="${io.helpCenterMCP}">Learn more</a>${r}`;return ex`
				<gl-banner
					exportparts="base"
					display="gradient-purple"
					layout="${this.layout}"
					banner-title="GitKraken MCP Bundled with GitLens"
					body="${o}"
					primary-button="Connect More Agents"
					primary-button-href="${ib("gitlens.ai.mcp.selectAgents",{source:this.source})}"
					secondary-button=${t?"Install Claude Hooks":eP}
					secondary-button-href=${t??eP}
					dismissible
					dismiss-href="${ib("gitlens.onboarding.dismiss",{id:"mcp:banner"})}"
				></gl-banner>
			`}let r=`Leverage Git and your integrations (issues, PRs, etc) to provide context and perform actions in AI chat. <a href="${io.helpCenterMCP}">Learn more</a>`;return ex`
			<gl-banner
				exportparts="base"
				display="gradient-purple"
				layout="${this.layout}"
				banner-title="Install GitKraken MCP for GitLens"
				body="${r}"
				primary-button="Install GitKraken MCP"
				primary-button-href="${ib("gitlens.ai.mcp.install",{source:this.source})}"
				secondary-button=${t?"Install Claude Hooks":eP}
				secondary-button-href=${t??eP}
				dismissible
				dismiss-href="${ib("gitlens.onboarding.dismiss",{id:"mcp:banner"})}"
			></gl-banner>
		`}};dA.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},dA.styles=[F`
			:host {
				display: block;
			}

			gl-banner {
				margin-bottom: var(--gl-space-12);
			}

			:host([layout='responsive']) gl-banner {
				width: 100%;
				margin-bottom: 0;
			}
		`],dP([eD()],dA.prototype,"source",2),dP([eD()],dA.prototype,"layout",2),dP([eD({type:Boolean})],dA.prototype,"collapsed",2),dP([eD({type:Boolean})],dA.prototype,"canAutoRegister",2),dP([eD({type:Boolean,attribute:"can-install-claude-hook"})],dA.prototype,"canInstallClaudeHook",2),dP([eD({type:Boolean,attribute:"show-cleanup-notice"})],dA.prototype,"showCleanupNotice",2),dA=dP([eL("gl-mcp-banner")],dA);var dO=Object.defineProperty,dR=Object.getOwnPropertyDescriptor,dI=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?dR(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&dO(r,o,a),a};let dE=class extends SignalWatcherWebviewApp{constructor(){super(...arguments),this._host=u??=ox(),this._homeState=function(t){let{signal:r,persisted:o,resetAll:i,startAutoPersist:n,dispose:a}=function(t){let r,o=t?.storage,i=t?.version,n=t?.restoreKey;function a(){if(null==o)return;let r=o.get();if(null==r)return;let a=r.__v,c=r[ow];if(null==n||c===n)return null!=i&&a!==i&&(r=t?.migrate?.(r,a)??void 0),r}let c=a(),h=[],p=[],u=!1;function g(){if(u=!1,r?.getPending(),r?.watch(),null==o||0===p.length)return;let t={};for(let r of(null!=i&&(t.__v=i),null!=n&&(t[ow]=n),t[o_]=Date.now(),p))t[r.key]=r.serialize(r.signal.get());o.set(t)}function b(t){if(null!=t){for(let o of(r===t&&u&&g(),p))t.unwatch(o.signal);r===t&&(r=void 0)}}return{signal:function(t){let r=tK(t);return h.push(()=>r.set(t)),r},persisted:function(t,o,i){if(ok.has(t))throw Error(`Cannot use reserved key '${t}' for persisted signal`);let n=i?.deserialize,a=i?.serialize??(t=>t),h=r=>{if(null==r||!(t in r))return o;let i=r[t];if(null!=n){let t=n(i);return void 0!==t?t:o}return i},u=tK(h(c));return p.push({key:t,signal:u,serialize:a,reset:t=>{u.set(h(t))}}),null!=r&&r.watch(u),u},resetAll:function(){for(let t of h)t();let t=a();for(let r of p)r.reset(t)},startAutoPersist:function(){if(null==o)return()=>{};b(r);let t=new w.subtle.Watcher(()=>{u||(u=!0,queueMicrotask(g))});for(let o of(r=t,p))t.watch(o.signal);return()=>{b(t)}},dispose:function(){b(r),h.length=0,p.length=0}}}({storage:t,version:1});return{loading:r(!1),error:r(void 0),repositories:r({count:0,openCount:0,hasUnsafe:!1,trusted:!0}),discovering:r(!1),ready:r(!1),overviewRepositoryPath:o("overviewRepositoryPath",void 0),overviewFilter:o("overviewFilter",ie),walkthroughSupported:r(!1),newInstall:r(!1),hostAppName:r(""),agentSessions:r([]),homeService:void 0,branchesService:void 0,resetAll:i,startAutoPersist:n,dispose:a}}(this._host.storage),this._integrationsState=function(){let{signal:t,resetAll:r}=oy();return{integrations:t([]),hasAnyIntegrationConnected:t(!1),resetAll:r}}(),this._aiState=function(){let{signal:t,resetAll:r}=oy();return{model:t(void 0),state:t({enabled:!1,orgEnabled:!0,mcp:{settingEnabled:!1,installed:!1,bundled:!1},hooks:{claude:{detected:!1,supported:!1,installed:!1},canInstallClaudeHook:!1},defaultAgent:void 0}),resetAll:r}}(),this._onboardingState=function(){let{signal:t,resetAll:r}=oy();return{banners:new SignalObjectImpl({integrationBanner:!1,mcpBanner:!1,hooksBanner:!1}),walkthroughProgress:t(void 0),dismiss:o$,dismissWalkthrough:o$,resetAll:r}}(),this._launchpadState=function(){let{signal:t,resetAll:r}=oy();return{launchpadSummary:t(void 0),launchpadLoading:t(!1),service:void 0,resetAll:r}}(),this._commandsState={service:void 0},this._rpc=new RpcController(this,{rpcOptions:{webviewId:()=>this._webview?.webviewId,webviewInstanceId:()=>this._webview?.webviewInstanceId,endpoint:()=>this._host.createEndpoint()},onReady:t=>this._onRpcReady(t),onError:t=>this._homeState.error.set(t.message)}),this._refreshOverviewDebounced=tl(()=>{this._fetchActiveCoalesced(),this._fetchInactiveCoalesced()},500),this._refreshActiveDebounced=tl(()=>{this._fetchActiveCoalesced()},500),this._refreshInactiveDebounced=tl(()=>{this._fetchInactiveCoalesced()},500),this._activeFetchDirty=!1,this._activeFetchGen=ta(),this._inactiveFetchDirty=!1,this._inactiveFetchGen=ta(),this._agentFetchDirty=!1,this._agentFetchGen=ta(),this.isLightTheme=!1}get _rootState(){return{home:this._homeState,integrations:this._integrationsState,ai:this._aiState,onboarding:this._onboardingState,launchpad:this._launchpadState,commands:this._commandsState}}_fetchActiveCoalesced(){let t=this._activeResource;if(null==t)return Promise.resolve();if(null!=this._activeFetchInFlight)return this._activeFetchDirty=!0,this._activeFetchInFlight;let r=this._activeFetchGen.next(),o=t.fetch().finally(()=>{this._activeFetchGen.current===r&&(this._activeFetchInFlight=void 0,this._activeFetchDirty&&(this._activeFetchDirty=!1,this._fetchActiveCoalesced()))});return this._activeFetchInFlight=o,o}_fetchInactiveCoalesced(){let t=this._inactiveResource;if(null==t)return Promise.resolve();if(null!=this._inactiveFetchInFlight)return this._inactiveFetchDirty=!0,this._inactiveFetchInFlight;let r=this._inactiveFetchGen.next(),o=t.fetch().finally(()=>{this._inactiveFetchGen.current===r&&(this._inactiveFetchInFlight=void 0,this._inactiveFetchDirty&&(this._inactiveFetchDirty=!1,this._fetchInactiveCoalesced()))});return this._inactiveFetchInFlight=o,o}_fetchAgentCoalesced(){let t=this._agentResource;if(null==t)return Promise.resolve();if(null!=this._agentFetchInFlight)return this._agentFetchDirty=!0,this._agentFetchInFlight;let r=this._agentFetchGen.next(),o=t.fetch().finally(()=>{this._agentFetchGen.current===r&&(this._agentFetchInFlight=void 0,this._agentFetchDirty&&(this._agentFetchDirty=!1,this._fetchAgentCoalesced()))});return this._agentFetchInFlight=o,o}_resetFetchGates(){this._activeFetchGen.next(),this._activeFetchInFlight=void 0,this._activeFetchDirty=!1,this._inactiveFetchGen.next(),this._inactiveFetchInFlight=void 0,this._inactiveFetchDirty=!1,this._agentFetchGen.next(),this._agentFetchInFlight=void 0,this._agentFetchDirty=!1}connectedCallback(){super.connectedCallback?.();let t=this.context;this.context=void 0,this.initWebviewContext(t),this._subscriptionCtx=new context_provider_i(this,{context:"subscription",initialValue:{subscription:tK(void 0),orgSettings:tK({ai:!1,drafts:!1}),avatar:tK(void 0),hasAccount:tK(!1),organizationsCount:tK(0)}}),this._homeStateCtx=new context_provider_i(this,{context:"homeState",initialValue:this._homeState}),new context_provider_i(this,{context:"integrations",initialValue:this._integrationsState}),new context_provider_i(this,{context:"ai",initialValue:this._aiState}),new context_provider_i(this,{context:"onboarding",initialValue:this._onboardingState}),new context_provider_i(this,{context:"commands",initialValue:this._commandsState}),new context_provider_i(this,{context:"launchpad",initialValue:this._launchpadState}),this._activeOverviewCtxProvider=new context_provider_i(this,{context:"activeOverviewState"}),this._inactiveOverviewCtxProvider=new context_provider_i(this,{context:"inactiveOverviewState"}),this._agentOverviewCtxProvider=new context_provider_i(this,{context:"agentOverviewState"})}disconnectedCallback(){this._readyAbort?.abort(new DOMException("home: disconnected","AbortError")),this._readyAbort=void 0,this._unsubscribeEvents?.(),this._unsubscribeEvents=void 0,this._wipWatchUnsubscribe?.(),this._wipWatchUnsubscribe=void 0,this._stopAutoPersist?.(),this._stopAutoPersist=void 0,this._refreshOverviewDebounced.cancel(),this._refreshActiveDebounced.cancel(),this._refreshInactiveDebounced.cancel(),this._activeResource?.dispose(),this._inactiveResource?.dispose(),this._agentResource?.dispose(),this._activeResource=void 0,this._inactiveResource=void 0,this._agentResource=void 0,this._inactiveFilter=void 0,this._homeState.resetAll(),this._integrationsState.resetAll(),this._aiState.resetAll(),this._onboardingState.resetAll(),this._launchpadState.resetAll(),this._commandsState.service=void 0,super.disconnectedCallback?.()}onThemeUpdated(t){this.isLightTheme=t.isLightTheme}async _onRpcReady(t){var r,o;let i,n;this._readyAbort?.abort(new DOMException("home: re-entering _onRpcReady","AbortError")),this._readyAbort=new AbortController;let a=this._readyAbort,c=async(t,r,o)=>{let i;try{return await Promise.race([o,new Promise((o,n)=>{i=setTimeout(()=>{a.signal.aborted||(tS.warn(`Home: _onRpcReady phase "${t}" timed out after ${r}ms`),a.abort(new DOMException(`home: phase "${t}" timed out after ${r}ms`,"AbortError")),n(Error(`Home initialization timed out in phase: ${t}`)))},r)}),new Promise((r,o)=>{a.signal.aborted?o(Error(`Home initialization aborted during phase: ${t}`)):a.signal.addEventListener("abort",()=>o(Error(`Home initialization aborted during phase: ${t}`)),{once:!0})})])}finally{null!=i&&clearTimeout(i)}},h=this._rootState,[p,u,g,b,m,f,v,w,_,$,x]=await Promise.all([t.home,t.launchpad,t.config,t.subscription,t.integrations,t.repositories,t.repository,t.ai,t.commands,t.onboarding,t.branches]),[C,S,P,A,O]=await Promise.all([b.subscriptionState,b.orgSettingsState,b.avatarState,b.hasAccountState,b.organizationsCountState]);this._subscriptionCtx?.setValue({subscription:C,orgSettings:S,avatar:P,hasAccount:A,organizationsCount:O},!0),this._stopAutoPersist=this._homeState.startAutoPersist(),await c("restoreOverviewRepositoryPath",3e4,o2(this._homeState,p));let E=t=>{null!=t&&this._homeState.overviewRepositoryPath.set(t)},T=t=>{null!=this._inactiveFilter&&(this._inactiveFilter.recent=t.recent,this._inactiveFilter.stale=t.stale)},B=oV(async t=>{let r=await p.getOverviewBranches("active",t);if(null==r)return;E(r.repository.path);let o=r.active.map(t=>t.id),i=p.getOverviewWip(o,t),n=p.getOverviewEnrichment(o,void 0,t);return{repository:r.repository,active:r.active.map(t=>dB(t,i,n))}}),M=oV(async t=>{let r=await p.getOverviewBranches("inactive",t);if(null==r)return;E(r.repository.path);let o=[...r.recent,...r.stale??[]],i=o.map(t=>t.id),n=o.filter(t=>null!=t.worktree).map(t=>t.id),a=Promise.resolve({}),c=n.length>0?p.getOverviewWip(n,t):a,h=p.getOverviewEnrichment(i,{skipMergeTarget:!0},t);return{repository:r.repository,recent:r.recent.map(t=>dB(t,c,h)),stale:r.stale?.map(t=>dB(t,c,h))}}),D=new SignalObjectImpl({}),F=oV(async t=>{let r=await p.getOverviewBranches("agents",t);if(null==r)return;E(r.repository.path);let o=r.recent.map(t=>t.id),i=r.recent.filter(t=>null!=t.worktree).map(t=>t.id),n=Promise.resolve({}),a=i.length>0?p.getOverviewWip(i,t):n,c=p.getOverviewEnrichment(o,{skipMergeTarget:!0},t);return{repository:r.repository,recent:r.recent.map(t=>dB(t,a,c))}});this._activeResource=B,this._inactiveResource=M,this._agentResource=F,this._inactiveFilter=D,this._activeOverviewCtxProvider?.setValue({value:B.value,loading:B.loading,error:B.error,fetch:()=>void B.fetch(),changeRepository:()=>void p.changeOverviewRepository()},!0),this._inactiveOverviewCtxProvider?.setValue({value:M.value,loading:M.loading,error:M.error,filter:D,fetch:()=>void M.fetch()},!0),this._agentOverviewCtxProvider?.setValue({value:F.value,loading:F.loading,error:F.error,fetch:()=>void F.fetch()},!0),h.home.homeService=p,h.home.branchesService=x,h.commands.service=_,h.launchpad.service=u;let j={integrationBanner:"home:integrationBanner"};this._onboardingState.dismiss=t=>{let r=j[t];null!=r&&(this._onboardingState.banners[t]=!1,$.dismiss(r))},this._onboardingState.dismissWalkthrough=()=>void p.dismissWalkthrough();let[N,W,U]=await Promise.all([$.isDismissed("home:integrationBanner"),$.isDismissed("mcp:banner"),$.isDismissed("hooks:banner")]);this._onboardingState.banners.integrationBanner=!N,this._onboardingState.banners.mcpBanner=!W,this._onboardingState.banners.hooksBanner=!U;let q=t=>{this._wipWatchUnsubscribe?.(),this._wipWatchUnsubscribe=void 0,i=t,null!=t&&(async()=>{let r=await v.onRepositoryWorkingChanged(t,()=>{this._refreshActiveDebounced()});if("function"==typeof r){if(i!==t)return r();this._wipWatchUnsubscribe=r}})()},G=tl(()=>{this._refreshOverviewDebounced.cancel(),this._refreshActiveDebounced.cancel(),this._refreshInactiveDebounced.cancel(),this._activeResource?.cancel(),this._inactiveResource?.cancel(),this._agentResource?.cancel(),this._resetFetchGates(),this._fetchActiveCoalesced(),this._fetchInactiveCoalesced(),this._fetchAgentCoalesced(),q(this._homeState.overviewRepositoryPath.get())},100);this.disposables.push({dispose:()=>G.cancel()}),this._unsubscribeEvents=await c("setupSubscriptions",3e4,(r={home:p,launchpad:u,config:g,subscription:b,integrations:m,repositories:f,onboarding:$,ai:w},o={refreshOverview:()=>{this._refreshOverviewDebounced()},refreshActiveOverview:()=>{this._refreshActiveDebounced()},refreshInactiveOverview:()=>{this._refreshInactiveDebounced()},replaceOverview:()=>{G()},updateOverviewFilter:t=>{this._homeState.overviewFilter.set(t),T(t)},onFocusAccount:()=>this._header?.show(),onSubscriptionChanged:()=>{this._header?.refreshPromo()},refreshLaunchpad:()=>{null!=u&&o5(h.launchpad,u)},refreshAgentOverview:()=>{this._fetchAgentCoalesced()}},o4([()=>r.subscription.onSubscriptionChanged(()=>{o.onSubscriptionChanged()}),()=>r.integrations.onIntegrationsChanged(t=>{h.integrations.hasAnyIntegrationConnected.set(t.hasAnyConnected),h.integrations.integrations.set(t.integrations),o.refreshOverview()}),()=>r.repositories.onDiscoveryCompleted(t=>{h.home.repositories.set(t),h.home.discovering.set(!1),o.refreshOverview()}),()=>r.repositories.onRepositoriesChanged(()=>{r.repositories.getRepositoriesState().then(t=>{h.home.repositories.set(t)},t=>tS.error(t,"Home: Failed to refetch repositories state")),o.refreshOverview()}),()=>r.repositories.onRepositoryChanged(t=>{let r=h.home.overviewRepositoryPath.get();if(null==r||t.repoPath!==r)return;let i=!1,n=!1;for(let r of t.changes){let t=o6[r];"active"===t?i=!0:"both"===t&&(i=!0,n=!0)}i&&o.refreshActiveOverview(),n&&o.refreshInactiveOverview()}),()=>r.home.onWalkthroughProgressChanged(t=>{h.onboarding.walkthroughProgress.set(t)}),()=>r.onboarding.onDidChange(t=>{"home:integrationBanner"===t.key?h.onboarding.banners.integrationBanner=!t.dismissed:"mcp:banner"===t.key?h.onboarding.banners.mcpBanner=!t.dismissed:"hooks:banner"===t.key&&(h.onboarding.banners.hooksBanner=!t.dismissed)}),()=>r.ai.onModelChanged(t=>{h.ai.model.set(t)}),()=>r.ai.onStateChanged(t=>{h.ai.state.set(t)}),()=>r.home.onOverviewRepositoryChanged(t=>{h.home.overviewRepositoryPath.set(t.repoPath),o.replaceOverview()}),()=>r.home.onOverviewFilterChanged(t=>{o.updateOverviewFilter(t.filter),o.refreshInactiveOverview()}),()=>r.home.onFocusAccount(()=>{o.onFocusAccount()}),()=>r.launchpad.onLaunchpadChanged(()=>{o.refreshLaunchpad()}),()=>{let t;return r.home.onAgentSessionsChanged(r=>{h.home.agentSessions.set(o0(r));let i=[...new Set(r.map(t=>t.worktreePath??""))].sort().join(`
`);i!==t&&(t=i,o.refreshAgentOverview())})}]))),q(this._homeState.overviewRepositoryPath.get());let K=()=>{if("visible"!==document.visibilityState){this._refreshOverviewDebounced.cancel(),this._refreshActiveDebounced.cancel(),this._refreshInactiveDebounced.cancel(),G.cancel();return}this._refreshOverviewDebounced(),this._fetchAgentCoalesced(),null!=u&&o5(h.launchpad,u)};document.addEventListener("visibilitychange",K),this.disposables.push({dispose:()=>document.removeEventListener("visibilitychange",K)}),await c("populateInitialState",3e4,(n=Promise.allSettled([p.getInitialContext(),o1(h.home,p,T)]).then(([t])=>{if("fulfilled"===t.status){let r=t.value;h.home.discovering.set(r.discovering),h.home.repositories.set(r.repositories),h.home.walkthroughSupported.set(r.walkthroughSupported),h.home.newInstall.set(r.newInstall),h.home.hostAppName.set(r.hostAppName),h.home.ready.set(!0)}else{let r=t.reason;tS.error(r,"Home: Failed to fetch initial context"),h.home.error.set(r instanceof Error?r.message:"Failed to load")}}),m.getIntegrationStates().then(t=>{h.integrations.integrations.set(t),h.integrations.hasAnyIntegrationConnected.set(t.some(t=>t.connected))},oY),w.getModel().then(t=>h.ai.model.set(t),oY),p.getWalkthroughProgress().then(t=>h.onboarding.walkthroughProgress.set(t),oY),p.getAgentSessions().then(t=>h.home.agentSessions.set(o0(t)),oY),w.getState().then(t=>h.ai.state.set(t),oY),n))}render(){return ex`
			<div class="home scrollable">
				<gl-error-banner .error=${this._homeState.error}></gl-error-banner>
				<gl-home-header class="home__header"></gl-home-header>
				${this.renderBanners()}
				<gl-repo-alerts class="home__alerts"></gl-repo-alerts>
				<main class="home__main scrollable" id="main">${this.renderMain()}</main>
			</div>
		`}renderBanners(){if(!this._homeState.ready.get())return eP;let t=this._aiState.state.get();return this._onboardingState.banners.mcpBanner&&!t.mcp.installed?this.renderMcpBanner():this.renderHooksBanner()}renderMcpBanner(){if(!this._onboardingState.banners.mcpBanner)return eP;let t=this._aiState.state.get();return ex`
			<gl-mcp-banner
				source="home"
				.canAutoRegister=${t.mcp.bundled}
				.canInstallClaudeHook=${t.hooks.canInstallClaudeHook}
			></gl-mcp-banner>
		`}renderHooksBanner(){if(!this._onboardingState.banners.hooksBanner)return eP;let t=this._aiState.state.get();return t.enabled&&t.orgEnabled&&t.hooks.canInstallClaudeHook?ex`<gl-hooks-banner source="home"></gl-hooks-banner>`:eP}renderMain(){return this._homeState.ready.get()?ex`
			<gl-active-work></gl-active-work>
			<gl-launchpad></gl-launchpad>
			<gl-overview></gl-overview>
		`:ex`<skeleton-loader lines="1"></skeleton-loader>`}};function dT(t){if(!(t instanceof Error&&(ts in t||"CancellationError"===t.name)||t instanceof DOMException&&"AbortError"===t.name))throw t}function dB(t,r,o){let i=r.catch(dT),n=o.catch(dT);return{...t,wip:i.then(r=>r?.[t.id]),remote:n.then(r=>r?.[t.id]?.remote),pr:n.then(r=>r?.[t.id]?.pr),autolinks:n.then(r=>r?.[t.id]?.autolinks),issues:n.then(r=>r?.[t.id]?.issues),contributors:n.then(r=>r?.[t.id]?.contributors),mergeTarget:n.then(r=>r?.[t.id]?.mergeTarget)}}dE.styles=[o3,ov,o8],dI([eD({type:String,noAccessor:!0})],dE.prototype,"context",2),dI([eD({type:String})],dE.prototype,"webroot",2),dI([eN("gl-home-header")],dE.prototype,"_header",2),dI([eF()],dE.prototype,"isLightTheme",2),dE=dI([eL("gl-home-app")],dE);export{dE as GlHomeApp};