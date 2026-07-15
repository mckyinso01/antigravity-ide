let e,t,i,o,s,r,a;var c,h,p,u,m,g={29(e,t){!function(e){var t=/\S/,i=/\"/g,o=/\n/g,s=/\r/g,r=/\\/g,a=/\u2028/,c=/\u2029/;function h(e){return e.trim?e.trim():e.replace(/^\s*|\s*$/g,"")}function p(e,t,i){if(t.charAt(i)!=e.charAt(0))return!1;for(var o=1,s=e.length;o<s;o++)if(t.charAt(i+o)!=e.charAt(o))return!1;return!0}e.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},e.scan=function(i,o){var s,r=i.length,a=0,c=null,u=null,m="",g=[],f=!1,b=0,v=0,w="{{",x="}}";function C(){m.length>0&&(g.push({tag:"_t",text:new String(m)}),m="")}function _(i,o){if(C(),i&&function(){for(var i=!0,o=v;o<g.length;o++)if(!(i=e.tags[g[o].tag]<e.tags._v||"_t"==g[o].tag&&null===g[o].text.match(t)))return!1;return i}())for(var s,r=v;r<g.length;r++)g[r].text&&((s=g[r+1])&&">"==s.tag&&(s.indent=g[r].text.toString()),g.splice(r,1));else o||g.push({tag:`
`});f=!1,v=g.length}for(o&&(w=(o=o.split(" "))[0],x=o[1]),b=0;b<r;b++){0==a?p(w,i,b)?(--b,C(),a=1):`
`==i.charAt(b)?_(f):m+=i.charAt(b):1==a?(b+=w.length-1,"="==(c=(u=e.tags[i.charAt(b+1)])?i.charAt(b+1):"_v")?(b=function(e,t){var i="="+x,o=e.indexOf(i,t),s=h(e.substring(e.indexOf("=",t)+1,o)).split(" ");return w=s[0],x=s[s.length-1],o+i.length-1}(i,b),a=0):(u&&b++,a=2),f=b):p(x,i,b)?(g.push({tag:c,n:h(m),otag:w,ctag:x,i:"/"==c?f-w.length:b+x.length}),m="",b+=x.length-1,a=0,"{"==c&&("}}"==x?b++:"}"===(s=g[g.length-1]).n.substr(s.n.length-1)&&(s.n=s.n.substring(0,s.n.length-1)))):m+=i.charAt(b)}return _(f,!0),g};var u={_t:!0,"\n":!0,$:!0,"/":!0};e.stringify=function(t,i,o){return"{code: function (c,p,i) { "+e.wrapMain(t.code)+" },"+function e(t){var i=[];for(var o in t.partials)i.push('"'+g(o)+'":{name:"'+g(t.partials[o].name)+'", '+e(t.partials[o])+"}");return"partials: {"+i.join(",")+"}, subs: "+function(e){var t=[];for(var i in e)t.push('"'+g(i)+'": function(c,p,t,i) {'+e[i]+"}");return"{ "+t.join(",")+" }"}(t.subs)}(t)+"}"};var m=0;function g(e){return e.replace(r,"\\\\").replace(i,'\\"').replace(o,"\\n").replace(s,"\\r").replace(a,"\\u2028").replace(c,"\\u2029")}function f(e){return~e.indexOf(".")?"d":"f"}function b(e,t){var i="<"+(t.prefix||"")+e.n+m++;return t.partials[i]={name:e.n,partials:{}},t.code+='t.b(t.rp("'+g(i)+'",c,p,"'+(e.indent||"")+'"));',i}function v(e,t){t.code+="t.b(t.t(t."+f(e.n)+'("'+g(e.n)+'",c,p,0)));'}function w(e){return"t.b("+e+");"}e.generate=function(t,i,o){m=0;var s={code:"",subs:{},partials:{}};return(e.walk(t,s),o.asString)?this.stringify(s,i,o):this.makeTemplate(s,i,o)},e.wrapMain=function(e){return'var t=this;t.b(i=i||"");'+e+"return t.fl();"},e.template=e.Template,e.makeTemplate=function(e,t,i){var o=this.makePartials(e);return o.code=Function("c","p","i",this.wrapMain(e.code)),new this.template(o,t,this,i)},e.makePartials=function(e){var t,i={subs:{},partials:e.partials,name:e.name};for(t in i.partials)i.partials[t]=this.makePartials(i.partials[t]);for(t in e.subs)i.subs[t]=Function("c","p","t","i",e.subs[t]);return i},e.codegen={"#":function(t,i){i.code+="if(t.s(t."+f(t.n)+'("'+g(t.n)+'",c,p,1),c,p,0,'+t.i+","+t.end+',"'+t.otag+" "+t.ctag+'")){t.rs(c,p,function(c,p,t){',e.walk(t.nodes,i),i.code+="});c.pop();}"},"^":function(t,i){i.code+="if(!t.s(t."+f(t.n)+'("'+g(t.n)+'",c,p,1),c,p,1,0,0,"")){',e.walk(t.nodes,i),i.code+="};"},">":b,"<":function(t,i){var o={partials:{},code:"",subs:{},inPartial:!0};e.walk(t.nodes,o);var s=i.partials[b(t,i)];s.subs=o.subs,s.partials=o.partials},$:function(t,i){var o={subs:{},code:"",partials:i.partials,prefix:t.n};e.walk(t.nodes,o),i.subs[t.n]=o.code,i.inPartial||(i.code+='t.sub("'+g(t.n)+'",c,p,i);')},"\n":function(e,t){t.code+=w('"\\n"'+(e.last?"":" + i"))},_v:function(e,t){t.code+="t.b(t.v(t."+f(e.n)+'("'+g(e.n)+'",c,p,0)));'},_t:function(e,t){t.code+=w('"'+g(e.text)+'"')},"{":v,"&":v},e.walk=function(t,i){for(var o,s=0,r=t.length;s<r;s++)(o=e.codegen[t[s].tag])&&o(t[s],i);return i},e.parse=function(t,i,o){return function t(i,o,s,r){var a=[],c=null,h=null,p=null;for(h=s[s.length-1];i.length>0;){if(p=i.shift(),h&&"<"==h.tag&&!(p.tag in u))throw Error("Illegal content in < super tag.");if(e.tags[p.tag]<=e.tags.$||function(e,t){for(var i=0,o=t.length;i<o;i++)if(t[i].o==e.n)return e.tag="#",!0}(p,r))s.push(p),p.nodes=t(i,p.tag,s,r);else if("/"==p.tag){if(0===s.length)throw Error("Closing tag without opener: /"+p.n);if(c=s.pop(),p.n!=c.n&&!function(e,t,i){for(var o=0,s=i.length;o<s;o++)if(i[o].c==e&&i[o].o==t)return!0}(p.n,c.n,r))throw Error("Nesting error: "+c.n+" vs. "+p.n);return c.end=p.i,a}else`
`==p.tag&&(p.last=0==i.length||`
`==i[0].tag);a.push(p)}if(s.length>0)throw Error("missing closing tag: "+s.pop().n);return a}(t,0,[],(o=o||{}).sectionTags||[])},e.cache={},e.cacheKey=function(e,t){return[e,!!t.asString,!!t.disableLambda,t.delimiters,!!t.modelGet].join("||")},e.compile=function(t,i){i=i||{};var o=e.cacheKey(t,i),s=this.cache[o];if(s){var r=s.partials;for(var a in r)delete r[a].instance;return s}return s=this.generate(this.parse(this.scan(t,i.delimiters),t,i),t,i),this.cache[o]=s}}(t)},87(e,t,i){var o=i(29);o.Template=i(190).Template,o.template=o.Template,e.exports=o},190(e,t){!function(e){function t(e,t,i){var o;return t&&"object"==typeof t&&(void 0!==t[e]?o=t[e]:i&&t.get&&"function"==typeof t.get&&(o=t.get(e))),o}e.Template=function(e,t,i,o){e=e||{},this.r=e.code||this.r,this.c=i,this.options=o||{},this.text=t||"",this.partials=e.partials||{},this.subs=e.subs||{},this.buf=""},e.Template.prototype={r:function(e,t,i){return""},v:function(e){return c.test(e=h(e))?e.replace(i,"&amp;").replace(o,"&lt;").replace(s,"&gt;").replace(r,"&#39;").replace(a,"&quot;"):e},t:h,render:function(e,t,i){return this.ri([e],t||{},i)},ri:function(e,t,i){return this.r(e,t,i)},ep:function(e,t){var i=this.partials[e],o=t[i.name];if(i.instance&&i.base==o)return i.instance;if("string"==typeof o){if(!this.c)throw Error("No compiler available.");o=this.c.compile(o,this.options)}if(!o)return null;if(this.partials[e].base=o,i.subs){for(key in t.stackText||(t.stackText={}),i.subs)t.stackText[key]||(t.stackText[key]=void 0!==this.activeSub&&t.stackText[this.activeSub]?t.stackText[this.activeSub]:this.text);o=function(e,t,i,o,s,r){function a(){}function c(){}a.prototype=e,c.prototype=e.subs;var h,p=new a;for(h in p.subs=new c,p.subsText={},p.buf="",p.stackSubs=o=o||{},p.subsText=r,t)o[h]||(o[h]=t[h]);for(h in o)p.subs[h]=o[h];for(h in p.stackPartials=s=s||{},i)s[h]||(s[h]=i[h]);for(h in s)p.partials[h]=s[h];return p}(o,i.subs,i.partials,this.stackSubs,this.stackPartials,t.stackText)}return this.partials[e].instance=o,o},rp:function(e,t,i,o){var s=this.ep(e,i);return s?s.ri(t,i,o):""},rs:function(e,t,i){var o=e[e.length-1];if(!p(o))return void i(e,t,this);for(var s=0;s<o.length;s++)e.push(o[s]),i(e,t,this),e.pop()},s:function(e,t,i,o,s,r,a){var c;return(!p(e)||0!==e.length)&&("function"==typeof e&&(e=this.ms(e,t,i,o,s,r,a)),c=!!e,!o&&c&&t&&t.push("object"==typeof e?e:t[t.length-1]),c)},d:function(e,i,o,s){var r,a=e.split("."),c=this.f(a[0],i,o,s),h=this.options.modelGet,u=null;if("."===e&&p(i[i.length-2]))c=i[i.length-1];else for(var m=1;m<a.length;m++)void 0!==(r=t(a[m],c,h))?(u=c,c=r):c="";return(!s||!!c)&&(s||"function"!=typeof c||(i.push(u),c=this.mv(c,i,o),i.pop()),c)},f:function(e,i,o,s){for(var r=!1,a=null,c=!1,h=this.options.modelGet,p=i.length-1;p>=0;p--)if(void 0!==(r=t(e,i[p],h))){c=!0;break}return c?(s||"function"!=typeof r||(r=this.mv(r,i,o)),r):!s&&""},ls:function(e,t,i,o,s,r){var a=this.options.delimiters;return this.options.delimiters=r,this.b(this.ct(h(e.call(t,s,i)),t,o)),this.options.delimiters=a,!1},ct:function(e,t,i){if(this.options.disableLambda)throw Error("Lambda features disabled.");return this.c.compile(e,this.options).render(t,i)},b:function(e){this.buf+=e},fl:function(){var e=this.buf;return this.buf="",e},ms:function(e,t,i,o,s,r,a){var c,h=t[t.length-1],p=e.call(h);if("function"==typeof p)if(o)return!0;else return c=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(p,h,t,i,c.substring(s,r),a);return p},mv:function(e,t,i){var o=t[t.length-1],s=e.call(o);return"function"==typeof s?this.ct(h(s.call(o)),o,i):s},sub:function(e,t,i,o){var s=this.subs[e];s&&(this.activeSub=e,s(t,i,this,o),this.activeSub=!1)}};var i=/&/g,o=/</g,s=/>/g,r=/\'/g,a=/\"/g,c=/[&<>\"\']/;function h(e){return String(null==e?"":e)}var p=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}}(t)}};let f={};function b(e){let t=f[e];if(void 0!==t)return t.exports;let i=f[e]={exports:{}};return g[e](i,i.exports,b),i.exports}b.d=(e,t)=>{if(Array.isArray(t))for(var i=0;i<t.length;){var o=t[i++],s=t[i++];b.o(e,o)?0===s&&i++:0===s?Object.defineProperty(e,o,{enumerable:!0,value:t[i++]}):Object.defineProperty(e,o,{enumerable:!0,get:s})}else for(var o in t)b.o(t,o)&&!b.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},b.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),Object.defineProperty(b,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(e){}});let v=globalThis,w=v.ShadowRoot&&(void 0===v.ShadyCSS||v.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,x=Symbol(),C=new WeakMap;let n=class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==x)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(w&&void 0===e){let i=void 0!==t&&1===t.length;i&&(e=C.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&C.set(t,e))}return e}toString(){return this.cssText}};let _=e=>new n("string"==typeof e?e:e+"",void 0,x),S=(e,...t)=>new n(1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]),e,x),$=w?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return _(t)})(e):e,{is:E,defineProperty:A,getOwnPropertyDescriptor:T,getOwnPropertyNames:D,getOwnPropertySymbols:P,getPrototypeOf:M}=Object,O=globalThis,N=O.trustedTypes,B=N?N.emptyScript:"",j=O.reactiveElementPolyfillSupport,F={toAttribute(e,t){switch(t){case Boolean:e=e?B:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},q=(e,t)=>!E(e,t),U={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??=Symbol("metadata"),O.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=U){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&A(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){let{get:o,set:s}=T(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){let r=o?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??U}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=M(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...D(e),...P(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,i]of t)this.elementProperties.set(e,i)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let i of new Set(e.flat(1/0).reverse()))t.unshift($(i));else void 0!==e&&t.push($(e));return t}static _$Eu(e,t){let i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(w)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let i of t){let t=document.createElement("style"),o=v.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){let s=(void 0!==i.converter?.toAttribute?i.converter:F).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,t){let i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){let e=i.getPropertyOptions(o),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:F;this._$Em=o;let r=s.fromAttribute(t,e.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(e,t,i,o=!1,s){if(void 0!==e){let r=this.constructor;if(!1===o&&(s=this[e]),!(((i??=r.getPropertyOptions(e)).hasChanged??q)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,i]of e){let{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,j?.({ReactiveElement:y}),(O.reactiveElementVersions??=[]).push("2.1.2");let W=globalThis,V=e=>e,G=W.trustedTypes,Y=G?G.createPolicy("lit-html",{createHTML:e=>e}):void 0,X="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,J="?"+K,Q=`<${J}>`,ee=document,et=()=>ee.createComment(""),ei=e=>null===e||"object"!=typeof e&&"function"!=typeof e,eo=Array.isArray,es=e=>eo(e)||"function"==typeof e?.[Symbol.iterator],er=`[ 	
\x0c\r]`,en=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ea=/-->/g,el=/>/g,ec=RegExp(`>|${er}(?:([^\\s"'>=/]+)(${er}*=${er}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ed=/'/g,eh=/"/g,ep=/^(?:script|style|textarea|title)$/i,eu=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),em=eu(1),eg=eu(2),ef=(eu(3),Symbol.for("lit-noChange")),eb=Symbol.for("lit-nothing"),ev=new WeakMap,ey=ee.createTreeWalker(ee,129);function ew(e,t){if(!eo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Y?Y.createHTML(t):t}let ek=(e,t)=>{let i=e.length-1,o=[],s,r=2===t?"<svg>":3===t?"<math>":"",a=en;for(let t=0;t<i;t++){let i=e[t],c,h,p=-1,u=0;for(;u<i.length&&(a.lastIndex=u,null!==(h=a.exec(i)));)u=a.lastIndex,a===en?"!--"===h[1]?a=ea:void 0!==h[1]?a=el:void 0!==h[2]?(ep.test(h[2])&&(s=RegExp("</"+h[2],"g")),a=ec):void 0!==h[3]&&(a=ec):a===ec?">"===h[0]?(a=s??en,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?ec:'"'===h[3]?eh:ed):a===eh||a===ed?a=ec:a===ea||a===el?a=en:(a=ec,s=void 0);let m=a===ec&&e[t+1].startsWith("/>")?" ":"";r+=a===en?i+Q:p>=0?(o.push(c),i.slice(0,p)+X+i.slice(p)+K+m):i+K+(-2===p?t:m)}return[ew(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};let lit_html_S=class lit_html_S{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,r=0,a=e.length-1,c=this.parts,[h,p]=ek(e,t);if(this.el=lit_html_S.createElement(h,i),ey.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=ey.nextNode())&&c.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(let e of o.getAttributeNames())if(e.endsWith(X)){let t=p[r++],i=o.getAttribute(e).split(K),a=/([.?@])?(.*)/.exec(t);c.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),o.removeAttribute(e)}else e.startsWith(K)&&(c.push({type:6,index:s}),o.removeAttribute(e));if(ep.test(o.tagName)){let e=o.textContent.split(K),t=e.length-1;if(t>0){o.textContent=G?G.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],et()),ey.nextNode(),c.push({type:2,index:++s});o.append(e[t],et())}}}else if(8===o.nodeType)if(o.data===J)c.push({type:2,index:s});else{let e=-1;for(;-1!==(e=o.data.indexOf(K,e+1));)c.push({type:7,index:s}),e+=K.length-1}s++}}static createElement(e,t){let i=ee.createElement("template");return i.innerHTML=e,i}};function ex(e,t,i=e,o){if(t===ef)return t;let s=void 0!==o?i._$Co?.[o]:i._$Cl,r=ei(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e))._$AT(e,i,o),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(t=ex(e,s._$AS(e,t.values),s,o)),t}let R=class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??ee).importNode(t,!0);ey.currentNode=o;let s=ey.nextNode(),r=0,a=0,c=i[0];for(;void 0!==c;){if(r===c.index){let t;2===c.type?t=new k(s,s.nextSibling,this,e):1===c.type?t=new c.ctor(s,c.name,c.strings,this,e):6===c.type&&(t=new Z(s,this,e)),this._$AV.push(t),c=i[++a]}r!==c?.index&&(s=ey.nextNode(),r++)}return ey.currentNode=ee,o}p(e){let t=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=eb,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){ei(e=ex(this,e,t))?e===eb||null==e||""===e?(this._$AH!==eb&&this._$AR(),this._$AH=eb):e!==this._$AH&&e!==ef&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):es(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==eb&&ei(this._$AH)?this._$AA.nextSibling.data=e:this.T(ee.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=lit_html_S.createElement(ew(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{let e=new R(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=ev.get(e.strings);return void 0===t&&ev.set(e.strings,t=new lit_html_S(e)),t}k(e){eo(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,o=0;for(let s of e)o===t.length?t.push(i=new k(this.O(et()),this.O(et()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=V(e).nextSibling;V(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,s){this.type=1,this._$AH=eb,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=eb}_$AI(e,t=this,i,o){let s=this.strings,r=!1;if(void 0===s)(r=!ei(e=ex(this,e,t,0))||e!==this._$AH&&e!==ef)&&(this._$AH=e);else{let o,a,c=e;for(e=s[0],o=0;o<s.length-1;o++)(a=ex(this,c[i+o],t,o))===ef&&(a=this._$AH[o]),r||=!ei(a)||a!==this._$AH[o],a===eb?e=eb:e!==eb&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}r&&!o&&this.j(e)}j(e){e===eb?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===eb?void 0:e}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==eb)}};let z=class z extends H{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){if((e=ex(this,e,t,0)??eb)===ef)return;let i=this._$AH,o=e===eb&&i!==eb||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==eb&&(i===eb||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};let Z=class Z{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ex(this,e)}};let eC=W.litHtmlPolyfillSupport;eC?.(lit_html_S,k),(W.litHtmlVersions??=[]).push("3.3.3");let e_=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{let o=i?.renderBefore??t,s=o._$litPart$;if(void 0===s){let e=i?.renderBefore??null;o._$litPart$=s=new k(t.insertBefore(et(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ef}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,e_.litElementHydrateSupport?.({LitElement:lit_element_i});let eS=e_.litElementPolyfillSupport;eS?.({LitElement:lit_element_i}),(e_.litElementVersions??=[]).push("4.2.2");let e$=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},eE={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:q};function eI(e){return(t,i)=>{let o;return"object"==typeof i?((e=eE,t,i)=>{let{kind:o,metadata:s}=i,r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===o){let{name:o}=i;return{set(i){let s=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,s,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){let{name:o}=i;return function(i){let s=this[o];t.call(this,i),this.requestUpdate(o,s,e,!0,i)}}throw Error("Unsupported decorator location: "+o)})(e,t,i):(o=t.hasOwnProperty(i),t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0)}}function eA(e){return eI({...e,state:!0,attribute:!1})}let eT=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);function eD(e,t){return(i,o,s)=>{let r=t=>t.renderRoot?.querySelector(e)??null;if(t){let e,{get:t,set:a}="object"==typeof o?i:s??(e=Symbol(),{get(){return this[e]},set(t){this[e]=t}});return eT(i,o,{get(){let e=t.call(this);return void 0===e&&(null!==(e=r(this))||this.hasUpdated)&&a.call(this,e),e}})}return eT(i,o,{get(){return r(this)}})}}var eR=Object.defineProperty,eP=(e,t,i)=>{let o;return(o="symbol"!=typeof t?t+"":t)in e?eR(e,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[o]=i,i},eL=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},eM=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},eO=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot access private method");return i};function ez(e,t){return Object.is(e,t)}let eN=null,eH=!1,eB=1,ej=Symbol("SIGNAL");function eF(e){let t=eN;return eN=e,t}let eq={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function eU(e){if(eH)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===eN)return;eN.consumerOnSignalRead(e);let t=eN.nextProducerIndex++;eG(eN),t<eN.producerNode.length&&eN.producerNode[t]!==e&&eV(eN)&&eW(eN.producerNode[t],eN.producerIndexOfThis[t]),eN.producerNode[t]!==e&&(eN.producerNode[t]=e,eN.producerIndexOfThis[t]=eV(eN)?function e(t,i,o){var s;if(eY(t),eG(t),0===t.liveConsumerNode.length){null==(s=t.watched)||s.call(t.wrapper);for(let i=0;i<t.producerNode.length;i++)t.producerIndexOfThis[i]=e(t.producerNode[i],t,i)}return t.liveConsumerIndexOfThis.push(o),t.liveConsumerNode.push(i)-1}(e,eN,t):0),eN.producerLastReadVersion[t]=e.version}function eW(e,t){var i;if(eY(e),eG(e),"u">typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(i=e.unwatched)||i.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)eW(e.producerNode[t],e.producerIndexOfThis[t])}let o=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[o],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[o],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let i=e.liveConsumerIndexOfThis[t],o=e.liveConsumerNode[t];eG(o),o.producerIndexOfThis[i]=t}}function eV(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function eG(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function eY(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function eZ(e){if(function e(t){if(t.dirty||t.lastCleanEpoch!==eB){if(!t.producerMustRecompute(t)&&!function(t){eG(t);for(let i=0;i<t.producerNode.length;i++){let o=t.producerNode[i],s=t.producerLastReadVersion[i];if(s!==o.version||(e(o),s!==o.version))return!0}return!1}(t)){t.dirty=!1,t.lastCleanEpoch=eB;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=eB}}(e),eU(e),e.value===eJ)throw e.error;return e.value}let eX=Symbol("UNSET"),eK=Symbol("COMPUTING"),eJ=Symbol("ERRORED"),eQ={...eq,value:eX,dirty:!0,error:null,equal:ez,producerMustRecompute:e=>e.value===eX||e.value===eK,producerRecomputeValue(e){let t;if(e.value===eK)throw Error("Detected cycle in computations.");let i=e.value;e.value=eK;let o=(e&&(e.nextProducerIndex=0),eF(e)),s=!1;try{t=e.computation.call(e.wrapper),s=i!==eX&&i!==eJ&&e.equal.call(e.wrapper,i,t)}catch(i){t=eJ,e.error=i}finally{if(eF(o),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(eV(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)eW(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}if(s){e.value=i;return}e.value=t,e.version++}},e0=function(){throw Error()};function e1(){return eU(this),this.value}let e2={...eq,equal:ez,value:void 0},e3=Symbol("node");(e=>{var t,i,o,s;let State=class State{constructor(o,s={}){let r,a;eM(this,i),eP(this,t);let c=((r=Object.create(e2)).value=o,(a=()=>(eU(r),r.value))[ej]=r,a)[ej];if(this[e3]=c,c.wrapper=this,s){let t=s.equals;t&&(c.equal=t),c.watched=s[e.subtle.watched],c.unwatched=s[e.subtle.unwatched]}}get(){if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return e1.call(this[e3])}set(t){var i,o;if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(eH)throw Error("Writes to signals not permitted during Watcher callback");i=this[e3],(null==eN?void 0:eN.consumerAllowSignalWrites)===!1&&e0(),i.equal.call(i.wrapper,i.value,t)||(i.value=t,o=i,o.version++,eB++,function e(t){if(void 0===t.liveConsumerNode)return;let i=eH;eH=!0;try{for(let i of t.liveConsumerNode)i.dirty||function(t){var i;t.dirty=!0,e(t),null==(i=t.consumerMarkedDirty)||i.call(t.wrapper??t)}(i)}finally{eH=i}}(o))}};t=e3,i=new WeakSet,e.isState=e=>"object"==typeof e&&eL(i,e),e.State=State;let Computed=class Computed{constructor(t,i){let r,a;eM(this,s),eP(this,o);let c=((r=Object.create(eQ)).computation=t,(a=()=>eZ(r))[ej]=r,a)[ej];if(c.consumerAllowSignalWrites=!0,this[e3]=c,c.wrapper=this,i){let t=i.equals;t&&(c.equal=t),c.watched=i[e.subtle.watched],c.unwatched=i[e.subtle.unwatched]}}get(){if(!(0,e.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return eZ(this[e3])}};o=e3,s=new WeakSet,e.isComputed=e=>"object"==typeof e&&eL(s,e),e.Computed=Computed,(t=>{var i,o,s,r;t.untrack=function(e){let t,i=null;try{i=eF(null),t=e()}finally{eF(i)}return t},t.introspectSources=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(i=t[e3].producerNode)?void 0:i.map(e=>e.wrapper))??[]},t.introspectSinks=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called introspectSinks without a Signal argument");return(null==(i=t[e3].liveConsumerNode)?void 0:i.map(e=>e.wrapper))??[]},t.hasSinks=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called hasSinks without a Signal argument");let i=t[e3].liveConsumerNode;return!!i&&i.length>0},t.hasSources=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called hasSources without a Computed or Watcher argument");let i=t[e3].producerNode;return!!i&&i.length>0};let Watcher=class Watcher{constructor(e){eM(this,o),eM(this,s),eP(this,i);let t=Object.create(eq);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[e3]=t}watch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eO(this,s,r).call(this,t);let i=this[e3];i.dirty=!1;let o=eF(i);for(let e of t)eU(e[e3]);eF(o)}unwatch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eO(this,s,r).call(this,t);let i=this[e3];eG(i);for(let e=i.producerNode.length-1;e>=0;e--)if(t.includes(i.producerNode[e].wrapper)){eW(i.producerNode[e],i.producerIndexOfThis[e]);let t=i.producerNode.length-1;if(i.producerNode[e]=i.producerNode[t],i.producerIndexOfThis[e]=i.producerIndexOfThis[t],i.producerNode.length--,i.producerIndexOfThis.length--,i.nextProducerIndex--,e<i.producerNode.length){let t=i.producerIndexOfThis[e],o=i.producerNode[e];eY(o),o.liveConsumerIndexOfThis[t]=e}}}getPending(){if(!(0,e.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[e3].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}};i=e3,o=new WeakSet,s=new WeakSet,r=function(t){for(let i of t)if(!(0,e.isComputed)(i)&&!(0,e.isState)(i))throw TypeError("Called watch/unwatch without a Computed or State argument")},e.isWatcher=e=>eL(o,e),t.Watcher=Watcher,t.currentComputed=function(){var e;return null==(e=eN)?void 0:e.wrapper},t.watched=Symbol("watched"),t.unwatched=Symbol("unwatched")})(e.subtle||(e.subtle={}))})(sd||(sd={}));let e5=!1,e4=new sd.subtle.Watcher(()=>{e5||(e5=!0,queueMicrotask(()=>{for(let e of(e5=!1,e4.getPending()))e.get();e4.watch()}))}),e6=Symbol("SignalWatcherBrand"),e8=(new FinalizationRegistry(e=>{e.unwatch(...sd.subtle.introspectSources(e))}),new WeakMap,e=>(...t)=>({_$litDirective$:e,values:t}));let directive_i=class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let{I:e7}={M:X,P:K,A:J,C:1,L:ek,R,D:es,V:ex,I:k,H,N:L,U:z,B:I,F:Z},e9=e=>e,te=(e,t,i)=>{let o=e._$AA.parentNode,s=void 0===t?e._$AB:t._$AA;if(void 0===i)i=new e7(o.insertBefore(document.createComment(""),s),o.insertBefore(document.createComment(""),s),e,e.options);else{let t=i._$AB.nextSibling,r=i._$AM,a=r!==e;if(a){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==r._$AU&&i._$AP(t)}if(t!==s||a){let e=i._$AA;for(;e!==t;){let t=e9(e).nextSibling;e9(o).insertBefore(e,s),e=t}}}return i},tt=(e,t,i=e)=>(e._$AI(t,i),e),ti={},to=e=>{e._$AR(),e._$AA.remove()},ts=(e,t)=>{let i=e._$AN;if(void 0===i)return!1;for(let e of i)e._$AO?.(t,!1),ts(e,t);return!0},tr=e=>{let t,i;do{if(void 0===(t=e._$AM))break;(i=t._$AN).delete(e),e=t}while(0===i?.size)},tn=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),tc(t)}};function ta(e){void 0!==this._$AN?(tr(this),this._$AM=e,tn(this)):this._$AM=e}function tl(e,t=!1,i=0){let o=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(t)if(Array.isArray(o))for(let e=i;e<o.length;e++)ts(o[e],!1),tr(o[e]);else null!=o&&(ts(o,!1),tr(o));else ts(this,e)}let tc=e=>{2==e.type&&(e._$AP??=tl,e._$AQ??=ta)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),tn(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(ts(this,e),tr(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};let td=!1,th=new sd.subtle.Watcher(async()=>{td||(td=!0,queueMicrotask(()=>{for(let e of(td=!1,th.getPending()))e.get();th.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var e,t;void 0===this._$Sm&&(this._$Sj=new sd.Computed(()=>{var e;let t=null==(e=this._$SW)?void 0:e.get();return this.setValue(t),t}),this._$Sm=null!=(t=null==(e=this._$Sk)?void 0:e.h)?t:th,this._$Sm.watch(this._$Sj),sd.subtle.untrack(()=>{var e;return null==(e=this._$Sj)?void 0:e.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return sd.subtle.untrack(()=>e.get())}update(e,[t]){var i;return null!=this._$Sk||(this._$Sk=null==(i=e.options)?void 0:i.host),t!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=t,this._$S_(),sd.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tp=e8(watch_r),tu=e=>(t,...i)=>e(t,...i.map(e=>e instanceof sd.State||e instanceof sd.Computed?tp(e):e));tu(em),tu(eg),sd.State,sd.Computed;let context_request_event_s=class context_request_event_s extends Event{constructor(e,t,i,o){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=i,this.subscribe=o??!1}};let context_consumer_s=class context_consumer_s{constructor(e,t,i,o){(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,void 0!==t.context)?(this.context=t.context,this.callback=t.callback,this.subscribe=t.subscribe??!1):(this.context=t,this.callback=i,this.subscribe=o??!1),this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new context_request_event_s(this.context,this.host,this.t,this.subscribe))}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let i=t||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:o}=this.subscriptions.get(e);e(this.value,o)}clearCallbacks(){this.subscriptions.clear()}};let context_provider_e=class context_provider_e extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(e,t,i){super(void 0!==t.context?t.initialValue:i),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:i}]of this.subscriptions)t.has(e)||(t.add(e),i.dispatchEvent(new context_request_event_s(this.context,i,e,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new context_provider_e(this.context,this.host))}};function tm({context:e}){return(t,i)=>{let o=new WeakMap;if("object"==typeof i)return{get(){return t.get.call(this)},set(e){return o.get(this).setValue(e),t.set.call(this,e)},init(t){return o.set(this,new context_provider_i(this,{context:e,initialValue:t})),t}};{let s;t.constructor.addInitializer(t=>{o.set(t,new context_provider_i(t,{context:e}))});let r=Object.getOwnPropertyDescriptor(t,i);if(void 0===r){let e=new WeakMap;s={get(){return e.get(this)},set(t){o.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=r.set;s={...r,set(t){o.get(this).setValue(t),e?.call(this,t)}}}return void Object.defineProperty(t,i,s)}}}function tg({context:e,subscribe:t}){return(i,o)=>{"object"==typeof o?o.addInitializer(function(){new context_consumer_s(this,{context:e,callback:e=>{i.set.call(this,e)},subscribe:t})}):i.constructor.addInitializer(i=>{new context_consumer_s(i,{context:e,callback:e=>{i[o]=e},subscribe:t})})}}let{fromCharCode:tf}=String;new TextEncoder;let tb=new TextDecoder;function tv(e){return tb.decode(function(e){let t=globalThis.atob(e),i=t.length,o=new Uint8Array(i),s=0,r=i-i%8;for(;s<r;s+=8)o[s]=t.charCodeAt(s),o[s+1]=t.charCodeAt(s+1),o[s+2]=t.charCodeAt(s+2),o[s+3]=t.charCodeAt(s+3),o[s+4]=t.charCodeAt(s+4),o[s+5]=t.charCodeAt(s+5),o[s+6]=t.charCodeAt(s+6),o[s+7]=t.charCodeAt(s+7);for(;s<i;s++)o[s]=t.charCodeAt(s);return o}(e))}let IpcCall=class IpcCall{constructor(e,t,i=!1){this.scope=e,this.reset=i,this.method=`${e}/${t}`}is(e){return e.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(e,t,i){super(e,t,i),this.response=new IpcNotification(this.scope,`${t}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let ty=new IpcRequest("core","webview/ready"),tw=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let tk=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let tx=new IpcCommand("core","telemetry/sendEvent"),tC=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let t_=new IpcCommand("core","webview/focus/didChange"),tS=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let t$=new WeakMap;function tE(e,t){return function(i,o,s){let r=t$.get(i.constructor);null==r&&t$.set(i.constructor,r=[]),r.push({method:s.value,keys:Array.isArray(e)?e:[e],afterFirstUpdate:t?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(e,t,i){let o=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,...i,detail:t});return this.dispatchEvent(o),o}update(e){let t=t$.get(this.constructor);if(null!=t)for(let{keys:i,method:o,afterFirstUpdate:s}of t){if(s&&!this.hasUpdated)continue;let t=i.filter(t=>e.has(t));t.length&&o.call(this,t)}super.update(e)}};new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let tI=/T/,tA=/.*\s*?at\s(.+?)\s/,tT=/^_+/,tD=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(e,t=!1){this.#t={...e,sanitizeKeys:new Set([...tD,...e.sanitizeKeys??[]])},this.#i=t,this.#e=e.createChannel(e.name),this.#o=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(e=>{this.#o=e})}enabled(e){return!!this.isDebugging||0!==this.#o&&(null==e||this.#o<=function(e){switch(e){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(e))}#i=!1;get isDebugging(){return this.#i}#o=0;get logLevel(){var e=this.#o;switch(e){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(tI," ").slice(0,-1)}]`}trace(e,...t){let i;(0!==this.#o&&!(this.#o>1)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.trace(`  ${i??""}${this.#s(!0,t)}`))}debug(e,...t){let i;(0!==this.#o&&!(this.#o>2)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.debug(`  ${i??""}${this.#s(!1,t)}`))}info(e,...t){let i;(0!==this.#o&&!(this.#o>3)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.info(`   ${i??""}${this.#s(!1,t)}`))}warn(e,...t){let i;(0!==this.#o&&!(this.#o>4)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.warn(`${i??""}${this.#s(!1,t)}`))}error(e,t,...i){let o;if((0===this.#o||this.#o>5)&&!this.isDebugging)return;if(null==(o=null==t||"string"==typeof t?t:`${t.prefix} ${i.shift()??""}`)){let t=e instanceof Error?e.stack:void 0;if(t){let e=tA.exec(t);null!=e&&(o=e[1])}}this.isDebugging;let s=`  ${o??""}${this.#s(!1,i)}`;null!=e?this.#e?.error(String(e),s):this.#e?.error(s)}showOutputChannel(e){this.#e?.show?.(e)}toLoggable(e,t){if(null!=t){let i=this.sanitize(t,e);if(null!=i)return i}if("function"==typeof e)return"<function>";if(null==e||"object"!=typeof e||e instanceof Error)return String(e);if(Array.isArray(e)){let t=e.length>10?e.slice(0,10):e,i=e.length>10?`, \u2026+${e.length-10}`:"";return`[${t.map(e=>this.toLoggable(e)).join(", ")}${i}]`}let i=this.#t?.toLoggable,o=i?.(e);if(null!=o)return o;let s=this.#t?.sanitizeKeys;try{return JSON.stringify(e,(e,t)=>{if(95!==e.charCodeAt(0))return s?.has(e)?this.sanitize(e,t):""===e||"object"!=typeof t||null==t||Array.isArray(t)?t:t instanceof Error?String(t):i?.(t)??t})}catch{return"<error>"}}sanitize(e,t){if(null==t)return;let i=e.replace(tT,"")||e;if(this.#t?.sanitizeKeys?.has(i))return null!=this.#t.hash?`<${i}:${this.#t.hash("string"==typeof t?t:JSON.stringify(t))}>`:`<${i}>`}#s(e,t){if(0===t.length||e&&(0===this.#o||this.#o>2)&&!this.isDebugging)return"";let i=t.map(e=>this.toLoggable(e)).join(", ");return 0!==i.length?` \u2014 ${i}`:""}};let tR=new Logger,tP=new WeakMap,tL={enabled:e=>tR.enabled(e),log:(e,t,i,...o)=>{switch(e){case"error":tR.error(void 0,t,i,...o);break;case"warn":t?.warn(i,...o);break;case"info":t?.info(i,...o);break;case"debug":default:t?.debug(i,...o);break;case"trace":t?.trace(i,...o)}}},tM=new Map;function tO(t,i){let o=e;e=t.scopeId,tM.set(t.scopeId,t);try{return i()}finally{e=o,tM.delete(t.scopeId)}}function tz(){return null!=e?tM.get(e):void 0}let tN=0x40000000-1;function tH(){let e=0;return{get current(){return e},next:function(){return e===tN&&(e=0),++e},reset:function(){e=0}}}function tB(e){let t=.001*performance.now(),i=Math.floor(t),o=Math.floor(t%1*1e9);return void 0!==e&&(i-=e[0],(o-=e[1])<0&&(i--,o+=1e9)),[i,o]}function tj(e){let[t,i]=tB(e);return 1e3*t+Math.floor(i/1e6)}let tF=tH();function tq(e,t,i){var o;let s,r,a={scopeId:e,prevScopeId:t,prefix:i,enabled:e=>tR.enabled(e),addExitInfo:function(...e){(s??=[]).push(...e)},setFailed:function(e){r=e},getExitInfo:function(){return{details:s?.length?` \u2022 ${s.join(", ")}`:void 0,failed:r}}};return tU(a,"trace",tR.trace),tU(a,"debug",tR.debug),tU(a,"info",tR.info),tU(a,"warn",tR.warn),Object.defineProperty(o=a,"error",{configurable:!0,enumerable:!0,get:function(){let e=(e,t,...i)=>tR.error(e,o,t,...i);return Object.defineProperty(o,"error",{value:e,writable:!1,enumerable:!0}),e}}),a}function tU(e,t,i){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){let o=i.bind(tR,e);return Object.defineProperty(e,t,{value:o,writable:!1,enumerable:!0}),o}})}function tW(e,t,i){if(null!=i){let o=null==t?e.toString(16):`${t.toString(16)} \u2192 ${e.toString(16)}`;return null==o?`[${i.padEnd(13)}]`:`[${i}${o.padStart(13-i.length)}]`}return null==t?`[${e.toString(16).padStart(13)}]`:`[${t.toString(16).padStart(5)} \u2192 ${e.toString(16).padStart(5)}]`}function tV(){let e=tz();if(null==e)return;let t=Object.create(e);return t[Symbol.dispose]=()=>{},t}function tG(e,t,i){if(null!=t&&"boolean"!=typeof t)return tq(t.scopeId,t.prevScopeId,`${t.prefix}${e}`);let o=t?tz()?.scopeId:void 0,s=tF.next();return tq(s,o,`${tW(s,o,i)} ${e}`)}function tY(e,t,i,...o){switch(t){case"trace":tR.trace(e,i,...o);break;case"info":tR.info(e,i,...o);break;default:tR.debug(e,i,...o)}}let LoggerContext=class LoggerContext{constructor(e){this.scope=tG(e,void 0),tR.configure({name:e,createChannel:function(e){let t=tR.isDebugging?function(e){}:function(e){};return{name:e,logLevel:0,trace:t,debug:t,info:t,warn:t,error:t}}},!1)}trace(e,...t){"string"==typeof e?tR.trace(this.scope,e,...t):tR.trace(e,t.shift(),...t)}debug(e,...t){"string"==typeof e?tR.debug(this.scope,e,...t):tR.debug(e,t.shift(),...t)}info(e,...t){"string"==typeof e?tR.info(this.scope,e,...t):tR.info(e,t.shift(),...t)}};let tZ=new IpcNotification("home","subscription/didChange"),tX="graph";new IpcCommand(tX,"chooseRepository"),new IpcCommand(tX,"dblclick"),new IpcCommand(tX,"avatars/get"),new IpcCommand(tX,"avatars/proxy"),new IpcCommand(tX,"refs/metadata/get"),new IpcCommand(tX,"rows/get"),new IpcCommand(tX,"pullRequest/openDetails"),new IpcCommand(tX,"row/action"),new IpcCommand(tX,"treemap/file/action"),new IpcCommand(tX,"search/openInView"),new IpcCommand(tX,"search/cancel"),new IpcCommand(tX,"columns/update"),new IpcCommand(tX,"refs/update/visibility"),new IpcCommand(tX,"refs/update/pinned"),new IpcCommand(tX,"filters/update/excludeTypes"),new IpcCommand(tX,"configuration/update"),new IpcCommand(tX,"displayMode/update"),new IpcCommand(tX,"search/update/mode"),new IpcCommand(tX,"filters/update/includedRefs"),new IpcCommand(tX,"filters/reset"),new IpcCommand(tX,"selection/update"),new IpcCommand(tX,"wipDraft/update"),new IpcRequest(tX,"jumpToHead"),new IpcRequest(tX,"chooseRef"),new IpcRequest(tX,"chooseComparison"),new IpcRequest(tX,"chooseAuthor"),new IpcRequest(tX,"chooseFile"),new IpcRequest(tX,"scope/resolve"),new IpcRequest(tX,"rows/ensure"),new IpcRequest(tX,"search/history/get"),new IpcRequest(tX,"search/history/store"),new IpcRequest(tX,"search/history/delete"),new IpcRequest(tX,"counts"),new IpcRequest(tX,"overview/get"),new IpcRequest(tX,"overview/wip/get"),new IpcRequest(tX,"overview/wip/detailed/get"),new IpcRequest(tX,"overview/enrichment/get"),new IpcRequest(tX,"agentSessions/get"),new IpcRequest(tX,"wip/stats/get"),new IpcRequest(tX,"wip/lineStats/get"),new IpcCommand(tX,"wip/watches/sync"),new IpcNotification(tX,"wip/refetch/request"),new IpcRequest(tX,"row/hover/get"),new IpcRequest(tX,"search"),new IpcNotification(tX,"overview/didChange"),new IpcNotification(tX,"agentSessions/didChange"),new IpcNotification(tX,"repositories/integration/didChange"),new IpcNotification(tX,"wipDrafts/didChange"),new IpcNotification(tX,"didChange",!0),new IpcNotification(tX,"configuration/didChange");let tK=new IpcNotification(tX,"subscription/didChange");new IpcNotification(tX,"org/settings/didChange"),new IpcNotification(tX,"avatars/didChange"),new IpcNotification(tX,"mcp/didChange"),new IpcNotification(tX,"hooks/didChange"),new IpcNotification(tX,"agents/canInstallClaudeHook/didChange"),new IpcCommand(tX,"graphWalkthrough/banner/close"),new IpcNotification(tX,"graphWalkthrough/banner/didChange"),new IpcNotification(tX,"graphWalkthrough/complete/didChange"),new IpcNotification(tX,"graphWalkthrough/started/didChange"),new IpcNotification(tX,"visualizationsButtonCallout/didChange"),new IpcCommand(tX,"visualizationsButtonCallout/dismiss"),new IpcNotification(tX,"sidebar/activePanel/didRequest"),new IpcNotification(tX,"action/didRequest"),new IpcCommand(tX,"track/overview/shown"),new IpcCommand(tX,"track/scope/changed"),new IpcCommand(tX,"track/details/reviewMode"),new IpcCommand(tX,"track/details/composeMode"),new IpcCommand(tX,"track/details/resolveMode"),new IpcCommand(tX,"track/details/compareMode"),new IpcCommand(tX,"track/details/wipShown"),new IpcNotification(tX,"branchState/didChange"),new IpcNotification(tX,"refs/didChangeMetadata"),new IpcNotification(tX,"columns/didChange"),new IpcNotification(tX,"scrollMarkers/didChange"),new IpcNotification(tX,"refs/didChangeVisibility"),new IpcNotification(tX,"refs/didChangePinned"),new IpcNotification(tX,"rows/didChange"),new IpcNotification(tX,"rows/stats/didChange"),new IpcNotification(tX,"selection/didChange"),new IpcNotification(tX,"compareMode/didRequestOpen"),new IpcNotification(tX,"timeline/didRequestOpenScope"),new IpcNotification(tX,"search/didRequest"),new IpcNotification(tX,"workingTree/didChange"),new IpcNotification(tX,"didSearch"),new IpcNotification(tX,"didFetch"),new IpcNotification(tX,"scope/anchors/didInvalidate"),new IpcNotification(tX,"treemap/didInvalidate"),new IpcNotification(tX,"featurePreview/didStart");let tJ=new IpcNotification("timeline","didChange");let PromosContext=class PromosContext{constructor(e){this.disposables=[],this._promos=new Map,this.ipc=e,this.disposables.push(this.ipc.onReceiveMessage(e=>{(tZ.is(e)||tK.is(e)||tJ.is(e))&&this._promos.clear()}))}async getApplicablePromo(e,t){let i=`${e}|${t}`,o=this._promos.get(i);return null==o&&(o=this.ipc.sendRequest(tk,{plan:e,location:t}).then(e=>e.promo,()=>void 0),this._promos.set(i,o)),await o}dispose(){this.disposables.forEach(e=>e.dispose())}};let TelemetryContext=class TelemetryContext{constructor(e){this.disposables=[],this.ipc=e}sendEvent(e){this.ipc.sendCommand(tx,e)}dispose(){this.disposables.forEach(e=>e.dispose())}};function tQ(e){return(e=e.toString().toLowerCase()).includes("ms")?parseFloat(e):e.includes("s")?1e3*parseFloat(e):parseFloat(e)}function t0(e,t){return new Promise(i=>{e.addEventListener(t,function o(s){s.target===e&&(e.removeEventListener(t,o),i())})})}function t1(e,t,i){let o,s,r,a,c,h,p,u,m,g,f=0;null!=i&&({edges:h,maxWait:p,cancellation:u,aggregator:m}=i);let b="leading"===(h??="trailing")||"both"===h,v="trailing"===h||"both"===h;function w(){if(null!=o){f=Date.now();let t=o,i=g;return g=void 0,o=void 0,r=e.apply(i,t)}}function x(){null!=a&&(clearTimeout(a),a=void 0)}function C(){null!=c&&(clearTimeout(c),c=void 0)}function _(){x(),C(),g=void 0,o=void 0,s=void 0,f=0}function S(...e){if(u?.aborted)return;let i=Date.now();null!=m&&null!=o?o=m(o,e):(g=this,o=e);let h=null==a&&null==c;s=i,x();let C=Date.now();if(s=C,a=setTimeout(()=>{a=void 0,function e(){let i,o,r=Date.now();if(i=r-(s??0),o=r-f,null==s||i>=t||i<0||null!=p&&o>=p){v&&w(),_();return}a=setTimeout(()=>{a=void 0,e()},t-(r-(s??0)))}()},t),null!=p&&!c){0===f&&(f=C);let e=p-(C-f);e>0?c=setTimeout(()=>{c=void 0,v&&null!=o&&w(),f=Date.now()},e):(v&&null!=o&&w(),_())}return b&&h?w():r}return S.cancel=_,S.flush=function(){return x(),C(),w()},S.pending=function(){return null!=a||null!=c},u?.addEventListener("abort",_,{once:!0}),S}(sh||(sh={})).on=function(e,t,i,o){let s=!1;if("string"==typeof e){let r=function(t){let o=t?.target?.closest(e);null!=o&&i(t,o)};return document.addEventListener(t,r,o??!0),{dispose:()=>{s||(s=!0,document.removeEventListener(t,r,o??!0))}}}let r=function(e){i(e,this)};return e.addEventListener(t,r,o??!1),{dispose:()=>{s||(s=!0,e.removeEventListener(t,r,o??!1))}}};var t2=Uint8Array,t3=Uint16Array,t5=Int32Array,t4=new t2([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),t6=new t2([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),t8=new t2([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),t7=function(e,t){for(var i=new t3(31),o=0;o<31;++o)i[o]=t+=1<<e[o-1];for(var s=new t5(i[30]),o=1;o<30;++o)for(var r=i[o];r<i[o+1];++r)s[r]=r-i[o]<<5|o;return{b:i,r:s}},t9=t7(t4,2),ie=t9.b,it=t9.r;ie[28]=258,it[258]=28;var ii=t7(t6,0),io=ii.b;ii.r;for(var is=new t3(32768),ir=0;ir<32768;++ir){var ia=(43690&ir)>>1|(21845&ir)<<1;ia=(61680&(ia=(52428&ia)>>2|(13107&ia)<<2))>>4|(3855&ia)<<4,is[ir]=((65280&ia)>>8|(255&ia)<<8)>>1}for(var il=function(e,t,i){for(var o,s=e.length,r=0,a=new t3(t);r<s;++r)e[r]&&++a[e[r]-1];var c=new t3(t);for(r=1;r<t;++r)c[r]=c[r-1]+a[r-1]<<1;if(i){o=new t3(1<<t);var h=15-t;for(r=0;r<s;++r)if(e[r])for(var p=r<<4|e[r],u=t-e[r],m=c[e[r]-1]++<<u,g=m|(1<<u)-1;m<=g;++m)o[is[m]>>h]=p}else for(o=new t3(s),r=0;r<s;++r)e[r]&&(o[r]=is[c[e[r]-1]++]>>15-e[r]);return o},ic=new t2(288),ir=0;ir<144;++ir)ic[ir]=8;for(var ir=144;ir<256;++ir)ic[ir]=9;for(var ir=256;ir<280;++ir)ic[ir]=7;for(var ir=280;ir<288;++ir)ic[ir]=8;for(var id=new t2(32),ir=0;ir<32;++ir)id[ir]=5;var ih=il(ic,9,1),ip=il(id,5,1),iu=function(e){for(var t=e[0],i=1;i<e.length;++i)e[i]>t&&(t=e[i]);return t},im=function(e,t,i){var o=t/8|0;return(e[o]|e[o+1]<<8)>>(7&t)&i},ig=function(e,t){var i=t/8|0;return(e[i]|e[i+1]<<8|e[i+2]<<16)>>(7&t)},ib=function(e,t,i){return(null==t||t<0)&&(t=0),(null==i||i>e.length)&&(i=e.length),new t2(e.subarray(t,i))},iv=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],iy=function(e,t,i){var o=Error(t||iv[e]);if(o.code=e,Error.captureStackTrace&&Error.captureStackTrace(o,iy),!i)throw o;return o},iw=function(e,t,i,o){var s=e.length,r=o?o.length:0;if(!s||t.f&&!t.l)return i||new t2(0);var a=!i,c=a||2!=t.i,h=t.i;a&&(i=new t2(3*s));var p=function(e){var t=i.length;if(e>t){var o=new t2(Math.max(2*t,e));o.set(i),i=o}},u=t.f||0,m=t.p||0,g=t.b||0,f=t.l,b=t.d,v=t.m,w=t.n,x=8*s;do{if(!f){u=im(e,m,1);var C=im(e,m+1,3);if(m+=3,C)if(1==C)f=ih,b=ip,v=9,w=5;else if(2==C){var _=im(e,m,31)+257,S=im(e,m+10,15)+4,$=_+im(e,m+5,31)+1;m+=14;for(var E=new t2($),A=new t2(19),T=0;T<S;++T)A[t8[T]]=im(e,m+3*T,7);m+=3*S;for(var D=iu(A),P=(1<<D)-1,M=il(A,D,1),T=0;T<$;){var O=M[im(e,m,P)];m+=15&O;var N=O>>4;if(N<16)E[T++]=N;else{var B=0,j=0;for(16==N?(j=3+im(e,m,3),m+=2,B=E[T-1]):17==N?(j=3+im(e,m,7),m+=3):18==N&&(j=11+im(e,m,127),m+=7);j--;)E[T++]=B}}var F=E.subarray(0,_),q=E.subarray(_);v=iu(F),w=iu(q),f=il(F,v,1),b=il(q,w,1)}else iy(1);else{var N=((m+7)/8|0)+4,U=e[N-4]|e[N-3]<<8,W=N+U;if(W>s){h&&iy(0);break}c&&p(g+U),i.set(e.subarray(N,W),g),t.b=g+=U,t.p=m=8*W,t.f=u;continue}if(m>x){h&&iy(0);break}}c&&p(g+131072);for(var V=(1<<v)-1,G=(1<<w)-1,Y=m;;Y=m){var B=f[ig(e,m)&V],X=B>>4;if((m+=15&B)>x){h&&iy(0);break}if(B||iy(2),X<256)i[g++]=X;else if(256==X){Y=m,f=null;break}else{var K=X-254;if(X>264){var T=X-257,J=t4[T];K=im(e,m,(1<<J)-1)+ie[T],m+=J}var Q=b[ig(e,m)&G],ee=Q>>4;Q||iy(3),m+=15&Q;var q=io[ee];if(ee>3){var J=t6[ee];q+=ig(e,m)&(1<<J)-1,m+=J}if(m>x){h&&iy(0);break}c&&p(g+131072);var et=g+K;if(g<q){var ei=r-q,eo=Math.min(q,et);for(ei+g<0&&iy(3);g<eo;++g)i[g]=o[ei+g]}for(;g<et;++g)i[g]=i[g-q]}}t.l=f,t.p=Y,t.b=g,t.f=u,f&&(u=1,t.m=v,t.d=b,t.n=w)}while(!u)return g!=i.length&&a?ib(i,0,g):i.subarray(0,g)},ik=new t2(0),ix="u">typeof TextDecoder&&new TextDecoder;try{ix.decode(ik,{stream:!0})}catch{}var iC=function(e){for(var t="",i=0;;){var o=e[i++],s=(o>127)+(o>223)+(o>239);if(i+s>e.length)return{s:t,r:ib(e,i-1)};s?3==s?t+=String.fromCharCode(55296|(o=((15&o)<<18|(63&e[i++])<<12|(63&e[i++])<<6|63&e[i++])-65536)>>10,56320|1023&o):1&s?t+=String.fromCharCode((31&o)<<6|63&e[i++]):t+=String.fromCharCode((15&o)<<12|(63&e[i++])<<6|63&e[i++]):t+=String.fromCharCode(o)}};function i_(e,t){if(t){for(var i="",o=0;o<e.length;o+=16384)i+=String.fromCharCode.apply(null,e.subarray(o,o+16384));return i}if(ix)return ix.decode(e);var s=iC(e),r=s.s,i=s.r;return i.length&&iy(8),r}"function"==typeof queueMicrotask&&queueMicrotask;let iS=/\(([\s\S]*)\)/,i$=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,iE=/\s?=.*$/;function iI(e){return null!=e&&(e instanceof Promise||"function"==typeof e?.then)}function iA(e){var t,i;let o,s,r,a,c,h,p,u,m;return t="debug",c=!1,h=!0,null!=(i=e)&&({args:o,when:s,exit:r,prefix:a,onlyExit:c=!1,timing:h=!0}=i),p="object"==typeof h?h.warnAfter:1500,u=!1!==h||"object"==typeof c&&c.after>0,m="trace"===t?tR.trace:"debug"===t?tR.debug:tR.info,(e,i,h)=>{let g,f;if("function"==typeof h.value?(g=h.value,f="value"):"function"==typeof h.get&&(g=h.get,f="get"),null==g||null==f)throw Error("Not supported");let b=null==o?function(e){if("function"!=typeof e)throw Error("Not supported");if(0===e.length)return[];let t=Function.prototype.toString.call(e),i=(t=(t=t.replace(i$,"")||t).slice(0,t.indexOf("{"))).indexOf("("),o=t.indexOf(")");i=i>=0?i+1:0,o=o>0?o:t.indexOf("="),t=t.slice(i,o),t=`(${t})`;let s=iS.exec(t);return null!=s?s[1].split(",").map(e=>e.trim().replace(iE,"")):[]}(g):[];h[f]=function(...e){let h;if(!tR.enabled()||null!=s&&!s.apply(this,e))return g.apply(this,e);let f=tR.enabled(t),v=tV(),w=v?.scopeId,x=tF.next(),C=this!=null?function(e){let t;if("function"==typeof e){if(null==(t=e.prototype?.constructor))return e.name}else t=e.constructor;let i=t?.name??"",o=i.indexOf("_");-1!==o&&(i=i.substring(o+1));let s=t;for(;null!=s;){let t=tP.get(s);if(null!=t)return t(e,i);s=Object.getPrototypeOf(s)}return i}(this):void 0,_=C?`${tW(x,w)} ${C}.${i}`:`${tW(x,w)} ${i}`;null!=a&&(_=a({id:x,instance:this,instanceName:C??"",name:i,prefix:_},...e));let S=tq(x,w,_),$=!1,E=()=>($||($=!0,h=function(e,t,i){if(!1===e||!t.length)return;if("function"==typeof e){let i=e(...t);if(!1===i)return;let o="";for(let[e,t]of Object.entries(i))o.length&&(o+=", "),o+=`${e}=${tR.toLoggable(t,e)}`;return o||void 0}let o="",s=-1;for(let e of t){let t=i[++s];o.length&&(o+=", "),o+=t?`${t}=${tR.toLoggable(e,t)}`:tR.toLoggable(e)}return o||void 0}(o,e,b)),h);if(!c&&f){let e=E();m.call(tR,e?`${_}(${e})`:_)}if(c||u||null!=r){let t=u?tB():void 0,i=e=>{let i=void 0!==t?` [${tj(t)}ms]`:"",o=S.getExitInfo();if(c){let t=E();tR.error(e,t?`${_}(${t})`:_,o?.details?`failed${o.details}${i}`:`failed${i}`)}else tR.error(e,_,o?.details?`failed${o.details}${i}`:`failed${i}`)},o=e=>{let i,o,s,a;null!=t?(i=tj(t))>p?(o=tR.warn,s=` [*${i}ms] (slow)`):(o=m,s=` [${i}ms]`):(s="",o=m);let h=S.getExitInfo();if(null!=r)if("function"==typeof r)try{a=r(e)}catch(e){a=`@log.exit error: ${e}`}else!0===r&&(a=`returned ${tR.toLoggable(e)}`);else h?.failed?(a=h.failed,o=(e,...t)=>tR.error(null,e,...t)):a="completed";if(f||o!==m){let e=E();c?(!0===c||0===c.after||i>c.after)&&o.call(tR,e?`${_}(${e}) ${a}${h?.details||""}${s}`:`${_} ${a}${h?.details||""}${s}`):o.call(tR,e?`${_}(${e}) ${a}${h?.details||""}${s}`:`${_} ${a}${h?.details||""}${s}`)}};return tO(S,()=>{let t;try{t=g.apply(this,e)}catch(e){throw i(e),e}return null!=t&&iI(t)?t.then(o,i).catch(()=>{}):o(t),t})}return tO(S,()=>g.apply(this,e))}}}globalThis.scheduler?.yield?.bind(globalThis.scheduler),Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(e,t,...i){let o;this._stopped=!1,this.logScope=null!=e&&"string"!=typeof e?e:tG(e??"",!1,t?.scopeLabel);let s=t?.log;if(o=null==s||!0===s?{}:!1===s||s.onlyExit?void 0:s,this.logLevel=("object"==typeof s?s.level:void 0)??"debug",this.logProvider=t?.provider??tL,this._time=tB(),null!=o){if(!this.logProvider.enabled(this.logLevel))return;i.length?this.logProvider.log(this.logLevel,this.logScope,`${o.message??""}${o.suffix??""}`,...i):this.logProvider.log(this.logLevel,this.logScope,`${o.message??""}${o.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return tj(this._time)}log(e){this.logCore(e,!1)}restart(e){this.logCore(e,!0),this._time=tB(),this._stopped=!1}stop(e){this._stopped||(this.restart(e),this._stopped=!0)}logCore(e,t){if(!this.logProvider.enabled(this.logLevel))return;if(!t)return void this.logProvider.log(this.logLevel,this.logScope,`${e?.message??""}${e?.suffix??""}`);let i=tj(this._time),o=e?.message??"";this.logProvider.log(i>250?"warn":this.logLevel,this.logScope,`${o?`${o} `:""}[${i}ms]${e?.suffix??""}`)}};(()=>{let e;var t,i,o={975:e=>{function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,o="",s=0,r=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)i=e.charCodeAt(c);else{if(47===i)break;i=47}if(47===i){if(r===c-1||1===a);else if(r!==c-1&&2===a){if(o.length<2||2!==s||46!==o.charCodeAt(o.length-1)||46!==o.charCodeAt(o.length-2)){if(o.length>2){var h=o.lastIndexOf("/");if(h!==o.length-1){-1===h?(o="",s=0):s=(o=o.slice(0,h)).length-1-o.lastIndexOf("/"),r=c,a=0;continue}}else if(2===o.length||1===o.length){o="",s=0,r=c,a=0;continue}}t&&(o.length>0?o+="/..":o="..",s=2)}else o.length>0?o+="/"+e.slice(r+1,c):o=e.slice(r+1,c),s=c-r-1;r=c,a=0}else 46===i&&-1!==a?++a:a=-1}return o}var o={resolve:function(){for(var e,o,s="",r=!1,a=arguments.length-1;a>=-1&&!r;a--)a>=0?e=arguments[a]:(void 0===o&&(o=process.cwd()),e=o),t(e),0!==e.length&&(s=e+"/"+s,r=47===e.charCodeAt(0));return s=i(s,!r),r?s.length>0?"/"+s:"/":s.length>0?s:"."},normalize:function(e){if(t(e),0===e.length)return".";var o=47===e.charCodeAt(0),s=47===e.charCodeAt(e.length-1);return 0!==(e=i(e,!o)).length||o||(e="."),e.length>0&&s&&(e+="/"),o?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var s=arguments[i];t(s),s.length>0&&(void 0===e?e=s:e+="/"+s)}return void 0===e?".":o.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=o.resolve(e))===(i=o.resolve(i)))return"";for(var s=1;s<e.length&&47===e.charCodeAt(s);++s);for(var r=e.length,a=r-s,c=1;c<i.length&&47===i.charCodeAt(c);++c);for(var h=i.length-c,p=a<h?a:h,u=-1,m=0;m<=p;++m){if(m===p){if(h>p){if(47===i.charCodeAt(c+m))return i.slice(c+m+1);if(0===m)return i.slice(c+m)}else a>p&&(47===e.charCodeAt(s+m)?u=m:0===m&&(u=0));break}var g=e.charCodeAt(s+m);if(g!==i.charCodeAt(c+m))break;47===g&&(u=m)}var f="";for(m=s+u+1;m<=r;++m)m!==r&&47!==e.charCodeAt(m)||(0===f.length?f+="..":f+="/..");return f.length>0?f+i.slice(c+u):(c+=u,47===i.charCodeAt(c)&&++c,i.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),o=47===i,s=-1,r=!0,a=e.length-1;a>=1;--a)if(47===(i=e.charCodeAt(a))){if(!r){s=a;break}}else r=!1;return -1===s?o?"/":".":o&&1===s?"//":e.slice(0,s)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var o,s=0,r=-1,a=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var c=i.length-1,h=-1;for(o=e.length-1;o>=0;--o){var p=e.charCodeAt(o);if(47===p){if(!a){s=o+1;break}}else -1===h&&(a=!1,h=o+1),c>=0&&(p===i.charCodeAt(c)?-1==--c&&(r=o):(c=-1,r=h))}return s===r?r=h:-1===r&&(r=e.length),e.slice(s,r)}for(o=e.length-1;o>=0;--o)if(47===e.charCodeAt(o)){if(!a){s=o+1;break}}else -1===r&&(a=!1,r=o+1);return -1===r?"":e.slice(s,r)},extname:function(e){t(e);for(var i=-1,o=0,s=-1,r=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47!==h)-1===s&&(r=!1,s=c+1),46===h?-1===i?i=c:1!==a&&(a=1):-1!==i&&(a=-1);else if(!r){o=c+1;break}}return -1===i||-1===s||0===a||1===a&&i===s-1&&i===o+1?"":e.slice(i,s)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return i;var o,s=e.charCodeAt(0),r=47===s;r?(i.root="/",o=1):o=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,m=0;u>=o;--u)if(47!==(s=e.charCodeAt(u)))-1===h&&(p=!1,h=u+1),46===s?-1===a?a=u:1!==m&&(m=1):-1!==a&&(m=-1);else if(!p){c=u+1;break}return -1===a||-1===h||0===m||1===m&&a===h-1&&a===c+1?-1!==h&&(i.base=i.name=0===c&&r?e.slice(1,h):e.slice(c,h)):(0===c&&r?(i.name=e.slice(1,a),i.base=e.slice(1,h)):(i.name=e.slice(c,a),i.base=e.slice(c,h)),i.ext=e.slice(a,h)),c>0?i.dir=e.slice(0,c-1):r&&(i.dir="/"),i},sep:"/",delimiter:":",win32:null,posix:null};o.posix=o,e.exports=o}},s={};function r(e){var t=s[e];if(void 0!==t)return t.exports;var i=s[e]={exports:{}};return o[e](i,i.exports,r),i.exports}r.d=(e,t)=>{for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(r.r(a),r.d(a,{URI:()=>l,Utils:()=>i}),"object"==typeof process)?e="win32"===process.platform:"object"==typeof navigator&&(e=navigator.userAgent.indexOf("Windows")>=0);let c=/^\w[\w\d+.-]*$/,h=/^\//,p=/^\/\//;function u(e,t){if(!e.scheme&&t)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!c.test(e.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(e.path){if(e.authority){if(!h.test(e.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(e.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let m=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(e){return e instanceof l||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString}scheme;authority;path;query;fragment;constructor(e,t,i,o,s,r=!1){"object"==typeof e?(this.scheme=e.scheme||"",this.authority=e.authority||"",this.path=e.path||"",this.query=e.query||"",this.fragment=e.fragment||""):(this.scheme=e||r?e:"file",this.authority=t||"",this.path=function(e,t){switch(e){case"https":case"http":case"file":t?"/"!==t[0]&&(t="/"+t):t="/"}return t}(this.scheme,i||""),this.query=o||"",this.fragment=s||"",u(this,r))}get fsPath(){return w(this,!1)}with(e){if(!e)return this;let{scheme:t,authority:i,path:o,query:s,fragment:r}=e;return void 0===t?t=this.scheme:null===t&&(t=""),void 0===i?i=this.authority:null===i&&(i=""),void 0===o?o=this.path:null===o&&(o=""),void 0===s?s=this.query:null===s&&(s=""),void 0===r?r=this.fragment:null===r&&(r=""),t===this.scheme&&i===this.authority&&o===this.path&&s===this.query&&r===this.fragment?this:new d(t,i,o,s,r)}static parse(e,t=!1){let i=m.exec(e);return i?new d(i[2]||"",_(i[4]||""),_(i[5]||""),_(i[7]||""),_(i[9]||""),t):new d("","","","","")}static file(t){let i="";if(e&&(t=t.replace(/\\/g,"/")),"/"===t[0]&&"/"===t[1]){let e=t.indexOf("/",2);-1===e?(i=t.substring(2),t="/"):(i=t.substring(2,e),t=t.substring(e)||"/")}return new d("file",i,t,"","")}static from(e){let t=new d(e.scheme,e.authority,e.path,e.query,e.fragment);return u(t,!0),t}toString(e=!1){return x(this,e)}toJSON(){return this}static revive(e){if(e){if(e instanceof l)return e;{let t=new d(e);return t._formatted=e.external,t._fsPath=e._sep===g?e.fsPath:null,t}}return e}};let g=e?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=w(this,!1)),this._fsPath}toString(e=!1){return e?x(this,!0):(this._formatted||(this._formatted=x(this,!1)),this._formatted)}toJSON(){let e={$mid:1};return this._fsPath&&(e.fsPath=this._fsPath,e._sep=g),this._formatted&&(e.external=this._formatted),this.path&&(e.path=this.path),this.scheme&&(e.scheme=this.scheme),this.authority&&(e.authority=this.authority),this.query&&(e.query=this.query),this.fragment&&(e.fragment=this.fragment),e}};let f={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function b(e,t,i){let o,s=-1;for(let r=0;r<e.length;r++){let a=e.charCodeAt(r);if(a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||45===a||46===a||95===a||126===a||t&&47===a||i&&91===a||i&&93===a||i&&58===a)-1!==s&&(o+=encodeURIComponent(e.substring(s,r)),s=-1),void 0!==o&&(o+=e.charAt(r));else{void 0===o&&(o=e.substr(0,r));let t=f[a];void 0!==t?(-1!==s&&(o+=encodeURIComponent(e.substring(s,r)),s=-1),o+=t):-1===s&&(s=r)}}return -1!==s&&(o+=encodeURIComponent(e.substring(s))),void 0!==o?o:e}function v(e){let t;for(let i=0;i<e.length;i++){let o=e.charCodeAt(i);35===o||63===o?(void 0===t&&(t=e.substr(0,i)),t+=f[o]):void 0!==t&&(t+=e[i])}return void 0!==t?t:e}function w(t,i){let o;return o=t.authority&&t.path.length>1&&"file"===t.scheme?`//${t.authority}${t.path}`:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&90>=t.path.charCodeAt(1)||t.path.charCodeAt(1)>=97&&122>=t.path.charCodeAt(1))&&58===t.path.charCodeAt(2)?i?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,e&&(o=o.replace(/\//g,"\\")),o}function x(e,t){let i=t?v:b,o="",{scheme:s,authority:r,path:a,query:c,fragment:h}=e;if(s&&(o+=s,o+=":"),(r||"file"===s)&&(o+="/",o+="/"),r){let e=r.indexOf("@");if(-1!==e){let t=r.substr(0,e);r=r.substr(e+1),-1===(e=t.lastIndexOf(":"))?o+=i(t,!1,!1):(o+=i(t.substr(0,e),!1,!1),o+=":",o+=i(t.substr(e+1),!1,!0)),o+="@"}-1===(e=(r=r.toLowerCase()).lastIndexOf(":"))?o+=i(r,!1,!0):(o+=i(r.substr(0,e),!1,!0),o+=r.substr(e))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2)){let e=a.charCodeAt(1);e>=65&&e<=90&&(a=`/${String.fromCharCode(e+32)}:${a.substr(3)}`)}else if(a.length>=2&&58===a.charCodeAt(1)){let e=a.charCodeAt(0);e>=65&&e<=90&&(a=`${String.fromCharCode(e+32)}:${a.substr(2)}`)}o+=i(a,!0,!1)}return c&&(o+="?",o+=i(c,!1,!1)),h&&(o+="#",o+=t?h:b(h,!1,!1)),o}let C=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function _(e){return e.match(C)?e.replace(C,e=>(function e(t){try{return decodeURIComponent(t)}catch{return t.length>3?t.substr(0,3)+e(t.substr(3)):t}})(e)):e}var S=r(975);let $=S.posix||S;(t=i||(i={})).joinPath=function(e,...t){return e.with({path:$.join(e.path,...t)})},t.resolvePath=function(e,...t){let i=e.path,o=!1;"/"!==i[0]&&(i="/"+i,o=!0);let s=$.resolve(i,...t);return o&&"/"===s[0]&&!e.authority&&(s=s.substring(1)),e.with({path:s})},t.dirname=function(e){if(0===e.path.length||"/"===e.path)return e;let t=$.dirname(e.path);return 1===t.length&&46===t.charCodeAt(0)&&(t=""),e.with({path:t})},t.basename=function(e){return $.basename(e.path)},t.extname=function(e){return $.extname(e.path)},sp=a})();let{URI:iT,Utils:iD}=sp;function iR(e,t){return JSON.parse(e,(e,i)=>(function(e,t){let i=function(e){if("object"!=typeof e||null==e)return;let t=e.__ipc;if(null!=t)switch(t){case"date":return"number"==typeof e.value?e:void 0;case"promise":return"object"==typeof e.value&&"string"==typeof e.value.id&&"string"==typeof e.value.method?e:void 0;case"uri":return"object"==typeof e.value&&"string"==typeof e.value?.scheme?e:void 0;default:return}}(e);if(null==i)return e;switch(i.__ipc){case"date":return new Date(i.value);case"promise":return t(i.value);case"uri":return iT.revive(i.value)}})(i,t))}let iP="__supertalk_rpc__";new TextEncoder,new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._type="fire"}static{this._noop=function(){}}get event(){return this._event??=(e,t,i)=>{if(this._disposed)return{dispose:Emitter._noop};this._target??=new EventTarget;let o=i=>{try{e.call(t,i.detail)}catch{}};this._target.addEventListener(Emitter._type,o);let s={dispose:()=>{s.dispose=Emitter._noop,this._target?.removeEventListener(Emitter._type,o)}};return i?.push(s),s},this._event}fire(e){this._disposed||this._target?.dispatchEvent(new CustomEvent(Emitter._type,{detail:e}))}dispose(){this._disposed=!0,this._target=void 0}};var iL=Object.defineProperty,iM=Object.getOwnPropertyDescriptor,iO=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),iz=e=>{throw TypeError(e)},iN=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?iM(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&iL(t,i,r),r};function iH(){return t??=null!=i?i():acquireVsCodeApi()}let iB=tH();function ij(){return`webview:${iB.next()}`}let iF=`wv-${Math.random().toString(36).slice(2,10)}`,iq=Date.now(),iU=class{constructor(e){this.appName=e,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=iH(),this._disposable=sh.on(window,"message",e=>this.onMessageReceived(e))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(t){var i,o,s,r,a,c,h,p,u,m=[];try{if(s=t.data,"object"==typeof s&&null!==s&&iP in s&&!0===s[iP])return;let a=t.data,c=((e,t,i)=>{if(null!=t){var o,s;"object"!=typeof t&&"function"!=typeof t&&iz("Object expected"),i&&(o=t[iO("asyncDispose")]),void 0===o&&(o=t[iO("dispose")],i&&(s=o)),"function"!=typeof o&&iz("Object not disposable"),s&&(o=function(){try{s.call(this)}catch(e){return Promise.reject(e)}}),e.push([i,o,t])}else i&&e.push([i]);return t})(m,function(t,i,o){var s,r;let a,c,h;if(!tR.enabled())return;let p=(s=o?.scope??!0,r=o?.scopeLabel,c=tz(),e=(h=tG(t,s,r)).scopeId,tM.set(h.scopeId,h),h[Symbol.dispose]=()=>{let t;t=h?.scopeId??e,null!=t&&tM.delete(t),e=c?.scopeId},h);if(!i)return p;let u="debug",m=!1;"object"==typeof i&&(u=i.level??u,a=i.message,m=!0===i.onlyExit);let g=tB();m||tY(p,u,a??"");let f=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let e=tj(g),t=` [${e}ms]`,i=p.getExitInfo(),o=i.failed??"completed";null!=i.failed?tR.error(null,p,`${o}${i.details??""}${t}`):tY(p,u,`${o}${i.details??""}${t}`),f()},p}(`(e=${a.id}|${a.method})`,void 0,{scope:tV()})),h=function(e,t,...i){let o=("object"==typeof t?.log?t.log.level:void 0)??"info";return(t?.provider??tL).enabled(o)?new Stopwatch(e,t,...i):void 0}(c,{log:{onlyExit:!0,level:"debug"}});if(a.compressed&&a.params instanceof Uint8Array){if("deflate"===a.compressed)try{a.params=i_((r=a.params,iw(r,{i:2},void 0,void 0)))}catch(e){a.params=i_(a.params)}else a.params=i_(a.params);h?.restart({message:`\u2022 decompressed (${a.compressed}) serialized params`})}if("string"==typeof a.params?(a.params=iR(a.params,e=>this.getResponsePromise(e.method,e.id)),h?.stop({message:"• deserialized params"})):null==a.params?h?.stop({message:"• no params"}):h?.stop({message:"• invalid params"}),c?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-a.timestamp}ms`),null!=a.completionId){let e=(i=a.method,o=a.completionId,`${i}|${o}`);this._pendingHandlers.get(e)?.(a);return}this._onReceiveMessage.fire(a)}catch(e){var g=e,f=!0}finally{a=g,c=f,h="function"==typeof SuppressedError?SuppressedError:function(e,t,i,o){return(o=Error(i)).name="SuppressedError",o.error=e,o.suppressed=t,o},p=e=>a=c?new h(e,a,"An error was suppressed during disposal"):(c=!0,e),(u=e=>{for(;e=m.pop();)try{var t=e[1]&&e[1].call(e[2]);if(e[0])return Promise.resolve(t).then(u,e=>(p(e),u()))}catch(e){p(e)}if(c)throw a})()}}deserializeIpcData(e){return iR(e,e=>this.getResponsePromise(e.method,e.id))}sendCommand(e,t){let i=ij();this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now()})}async sendRequest(e,t){let i=ij(),o=this.getResponsePromise(e.response.method,i);return this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now(),completionId:i}),o}getResponsePromise(e,t){return new Promise((i,o)=>{var s,r;let a,c=(s=e,r=t,`${s}|${r}`);function h(){clearTimeout(a),a=void 0,this._pendingHandlers.delete(c)}a=setTimeout(()=>{h.call(this),o(Error(`Timed out waiting for completion of ${c}`))},(tR.isDebugging?60:5)*6e4),this._pendingHandlers.set(c,e=>{if(h.call(this),e.method===tC.method){let t=e.params;"rejected"===t.status?queueMicrotask(()=>o(Error(t.reason))):queueMicrotask(()=>i(t.value))}else queueMicrotask(()=>i(e.params))})})}setPersistedState(e){this._api.setState(e)}updatePersistedState(e){let t=this._api.getState();null!=t&&"object"==typeof t?(t={...t,...e},this._api.setState(t)):t=e,this.setPersistedState(t)}postMessage(e){this._api.postMessage(e)}};function iW(e,t){let i=Math.pow(10,t);return Math.round(e*i)/i}iN([iA({args:e=>({e:`${e.data.id}|${e.data.method}`})})],iU.prototype,"onMessageReceived",1),iN([iA({args:e=>({commandType:e.method})})],iU.prototype,"sendCommand",1),iN([iA({args:e=>({requestType:e.method})})],iU.prototype,"sendRequest",1),iN([iA({args:e=>({e:`${e.id}, method=${e.method}`})})],iU.prototype,"postMessage",1),iU=iN([(sc=e=>`${e.appName}(HostIpc)`,e=>void tP.set(e,sc))],iU);let RGBA=class RGBA{constructor(e,t,i,o=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,e)),this.g=0|Math.min(255,Math.max(0,t)),this.b=0|Math.min(255,Math.max(0,i)),this.a=iW(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}};let HSLA=class HSLA{constructor(e,t,i,o){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=iW(Math.max(Math.min(1,t),0),3),this.l=iW(Math.max(Math.min(1,i),0),3),this.a=iW(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.l===t.l&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,o=e.b/255,s=e.a,r=Math.max(t,i,o),a=Math.min(t,i,o),c=0,h=0,p=(a+r)/2,u=r-a;if(u>0){switch(h=Math.min(p<=.5?u/(2*p):u/(2-2*p),1),r){case t:c=(i-o)/u+6*(i<o);break;case i:c=(o-t)/u+2;break;case o:c=(t-i)/u+4}c*=60,c=Math.round(c)}return new HSLA(c,h,p,s)}static _hue2rgb(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e}static toRGBA(e){let t,i,o,s=e.h/360,{s:r,l:a,a:c}=e;if(0===r)t=i=o=a;else{let e=a<.5?a*(1+r):a+r-a*r,c=2*a-e;t=HSLA._hue2rgb(c,e,s+1/3),i=HSLA._hue2rgb(c,e,s),o=HSLA._hue2rgb(c,e,s-1/3)}return new RGBA(Math.round(255*t),Math.round(255*i),Math.round(255*o),c)}};let HSVA=class HSVA{constructor(e,t,i,o){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=iW(Math.max(Math.min(1,t),0),3),this.v=iW(Math.max(Math.min(1,i),0),3),this.a=iW(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.v===t.v&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,o=e.b/255,s=Math.max(t,i,o),r=s-Math.min(t,i,o);return new HSVA(Math.round(60*(0===r?0:s===t?((i-o)/r%6+6)%6:s===i?(o-t)/r+2:(t-i)/r+4)),0===s?0:r/s,s,e.a)}static toRGBA(e){let{h:t,s:i,v:o,a:s}=e,r=o*i,a=r*(1-Math.abs(t/60%2-1)),c=o-r,[h,p,u]=[0,0,0];return t<60?(h=r,p=a):t<120?(h=a,p=r):t<180?(p=r,u=a):t<240?(p=a,u=r):t<300?(h=a,u=r):t<=360&&(h=r,u=a),new RGBA(h=Math.round((h+c)*255),p=Math.round((p+c)*255),u=Math.round((u+c)*255),s)}};function iV(e,t){return t.getPropertyValue(e).trim()}let Color=class Color{static from(e){return e instanceof Color?e:parseColor(e)||Color.red}static fromCssVariable(e,t){return parseColor(iV(e,t))||Color.red}static fromHex(e){return parseHexColor(e)||Color.red}static equals(e,t){return!e&&!t||!!e&&!!t&&e.equals(t)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(e){if(e)if(e instanceof RGBA)this.rgba=e;else if(e instanceof HSLA)this._hsla=e,this.rgba=HSLA.toRGBA(e);else if(e instanceof HSVA)this._hsva=e,this.rgba=HSVA.toRGBA(e);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(e){return null!=e&&!!e&&RGBA.equals(this.rgba,e.rgba)&&HSLA.equals(this.hsla,e.hsla)&&HSVA.equals(this.hsva,e.hsva)}getRelativeLuminance(){return iW(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(e){let t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}luminance(e){return luminance(this,e)}getContrastRatio(e){let t=this.getRelativeLuminance(),i=e.getRelativeLuminance();return t>i?(t+.05)/(i+.05):(i+.05)/(t+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(e){return this.getRelativeLuminance()>e.getRelativeLuminance()}isDarkerThan(e){return this.getRelativeLuminance()<e.getRelativeLuminance()}lighten(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*e,this.hsla.a))}darken(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*e,this.hsla.a))}transparent(e){let{r:t,g:i,b:o,a:s}=this.rgba;return new Color(new RGBA(t,i,o,s*e))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(e){let t=e.rgba,i=this.rgba.a,o=t.a,s=i+o*(1-i);return s<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*i/s+t.r*o*(1-i)/s,this.rgba.g*i/s+t.g*o*(1-i)/s,this.rgba.b*i/s+t.b*o*(1-i)/s,s))}mix(e,t){return mixColors(this,e,t)}makeOpaque(e){if(this.isOpaque()||1!==e.rgba.a)return this;let{r:t,g:i,b:o,a:s}=this.rgba;return new Color(new RGBA(e.rgba.r-s*(e.rgba.r-t),e.rgba.g-s*(e.rgba.g-i),e.rgba.b-s*(e.rgba.b-o),1))}flatten(...e){let t=e.reduceRight((e,t)=>Color._flatten(t,e));return Color._flatten(this,t)}static _flatten(e,t){let i=1-e.rgba.a;return new Color(new RGBA(i*t.rgba.r+e.rgba.a*e.rgba.r,i*t.rgba.g+e.rgba.a*e.rgba.g,i*t.rgba.b+e.rgba.a*e.rgba.b))}toString(){return this._toString||(this._toString=function(e){return e.isOpaque()?`#${iG(e.rgba.r)}${iG(e.rgba.g)}${iG(e.rgba.b)}`:`rgba(${e.rgba.r}, ${e.rgba.g}, ${e.rgba.b}, ${Number(e.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(e,t,i){if(e.isLighterThan(t))return e;i=i||.5;let o=e.getRelativeLuminance(),s=t.getRelativeLuminance();return i=i*(s-o)/s,e.lighten(i)}static getDarkerColor(e,t,i){if(e.isDarkerThan(t))return e;i=i||.5;let o=e.getRelativeLuminance(),s=t.getRelativeLuminance();return i=i*(o-s)/o,e.darken(i)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function iG(e){let t=e.toString(16);return 2!==t.length?`0${t}`:t}let iY=new Emitter,iZ=iY.event;function iX(e){let t=document.documentElement,i=window.getComputedStyle(t),o=document.body.classList,s=o.contains("vscode-light")||o.contains("vscode-high-contrast-light"),r=o.contains("vscode-high-contrast")||o.contains("vscode-high-contrast-light"),a=iV("--vscode-editor-background",i),c=iV("--vscode-editor-foreground",i);return c||(c=iV("--vscode-foreground",i)),{colors:{background:a,foreground:c},computedStyle:i,isLightTheme:s,isHighContrastTheme:r,isInitializing:null==e}}var iK=Object.defineProperty,iJ=Object.getOwnPropertyDescriptor,iQ=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?iJ(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&iK(t,i,r),r};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(e){let t=JSON.parse(tv(e)),i=t.webviewId,o=t.webviewInstanceId;this._webview={webviewId:i,webviewInstanceId:o,createCommandLink:(e,t)=>{var s;return e.endsWith(":")&&(e=`${e}${i.split(".").at(-1)}`),s=e,`command:${s}?${encodeURIComponent(JSON.stringify({webview:i,webviewInstance:o,...t}))}`}}}connectedCallback(){let e,t,i,o,s;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new iU(this.name),this.disposables.push(((e=new MutationObserver(e=>{iY.fire(iX(e))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>e.disconnect()})),null!=this.onThemeUpdated&&(this.onThemeUpdated(iX()),this.disposables.push(iZ(this.onThemeUpdated,this))),this.disposables.push(this._ipc.onReceiveMessage(e=>{switch(!0){case t_.is(e):this.onWebviewFocusChanged?.(e.params.focused),window.dispatchEvent(new CustomEvent(e.params.focused?"webview-focus":"webview-blur"));break;case tS.is(e):this.onWebviewVisibilityChanged?.(e.params.visible),window.dispatchEvent(new CustomEvent(e.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(o=0,s=t1(e=>{let t=`webview:${++o}`,i=document.hasFocus();e.focused=i,i||(e.inputFocused=!1),iH().postMessage({id:t,scope:tw.scope,method:tw.method,params:e,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:e=>{let o=e.composedPath().some(e=>"INPUT"===e.tagName);(!0!==t||i!==o)&&(t=!0,i=o,s({focused:!0,inputFocused:o}))},onFocusOut:e=>{s({focused:!1,inputFocused:!1})}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(e=>{e.href===e.title&&e.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(e=>e.dispose())}render(){return em`<slot></slot>`}};iQ([eI({type:String})],GlWebviewApp.prototype,"name",2),iQ([eI({type:String})],GlWebviewApp.prototype,"placement",2),iQ([tm({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),iQ([tm({context:"logger"})],GlWebviewApp.prototype,"_logger",2),iQ([tm({context:"promos"})],GlWebviewApp.prototype,"_promos",2),iQ([tm({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),iQ([tm({context:"webview"})],GlWebviewApp.prototype,"_webview",2),GlWebviewApp[e6];var i0=Object.defineProperty,i1=Object.getOwnPropertyDescriptor;let GlAppHost=class GlAppHost extends GlWebviewApp{get state(){return this._stateProvider.state}connectedCallback(){super.connectedCallback();let e=this.bootstrap;this.bootstrap=void 0,this._stateProvider=this.createStateProvider(e,this._ipc,this._logger),this.initWebviewContext(e),this.disposables.push(this._stateProvider)}};((e,t,i,o)=>{for(var s,r=o>1?void 0:o?i1(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&i0(t,i,r)})([eI({type:String,noAccessor:!0})],GlAppHost.prototype,"bootstrap",2);let i2="composer",i3=new IpcCommand(i2,"generateCommits"),i5=new IpcCommand(i2,"generateCommitMessage"),i4=new IpcCommand(i2,"finishAndCommit"),i6=new IpcCommand(i2,"close"),i8=new IpcCommand(i2,"reload"),i7=new IpcCommand(i2,"cancelGenerateCommits"),i9=new IpcCommand(i2,"cancelGenerateCommitMessage");new IpcCommand(i2,"cancelFinishAndCommit");let oe=new IpcCommand(i2,"clearAIOperationError"),ot=new IpcCommand(i2,"selectAIModel"),oi=new IpcCommand(i2,"aiFeedbackHelpful"),oo=new IpcCommand(i2,"aiFeedbackUnhelpful"),os=new IpcCommand(i2,"openOnboarding"),or=new IpcCommand(i2,"dismissOnboarding"),on=new IpcCommand(i2,"advanceOnboarding"),oa=new IpcCommand("composer","chooseRepository"),ol=new IpcCommand(i2,"onAddHunksToCommit"),oc=new IpcCommand(i2,"onUndo"),od=new IpcCommand(i2,"onRedo"),oh=new IpcCommand(i2,"onReset"),op=new IpcNotification(i2,"didStartGenerating"),ou=new IpcNotification(i2,"didProgressGeneratingCommits"),om=new IpcNotification(i2,"didStartGeneratingCommitMessage"),og=new IpcNotification(i2,"didGenerateCommits"),of=new IpcNotification(i2,"didGenerateCommitMessage"),ob=new IpcNotification(i2,"didStartCommitting"),ov=new IpcNotification(i2,"didFinishCommitting"),oy=new IpcNotification(i2,"didSafetyError"),ow=new IpcNotification(i2,"didReloadComposer"),ok=new IpcNotification(i2,"didLoadingError"),ox=new IpcNotification(i2,"didWorkingDirectoryChange"),oC=new IpcNotification(i2,"didIndexChange"),o_=new IpcNotification(i2,"didCancelGenerateCommits"),oS=new IpcNotification(i2,"didCancelGenerateCommitMessage"),o$=new IpcNotification(i2,"didErrorAIOperation"),oE=new IpcNotification(i2,"didClearAIOperationError"),oI=new IpcNotification(i2,"didChangeAiEnabled"),oA=new IpcNotification(i2,"didChangeAiModel");let StateProviderBase=class StateProviderBase{constructor(e,t,i,o){this.host=e,this.ipc=i,this.logger=o,this._state=this.ipc.deserializeIpcData(tv(t)),this.logger?.debug(`bootstrap duration=${Date.now()-this._state.timestamp}ms`),this.provider=this.createContextProvider(this._state),this.onPersistState?.(this._state),this.disposable=this.ipc.onReceiveMessage(this.onMessageReceived.bind(this)),this.initializeState()}get state(){return this._state}get webviewId(){return this._state.webviewId}get webviewInstanceId(){return this._state.webviewInstanceId}get timestamp(){return this._state.timestamp}dispose(){this.disposable.dispose()}get deferBootstrap(){return!1}async initializeState(){let e={clientId:iF,clientLoadedAt:iq};if(this.deferBootstrap){let t=await this.ipc.sendRequest(ty,{bootstrap:!0,...e});if(null!=t.state){let e=iI(t.state)?await t.state:t.state;this.onDeferredBootstrapStateReceived(e)}}else this.ipc.sendRequest(ty,{bootstrap:!1,...e})}onDeferredBootstrapStateReceived(e){this._state={...e,timestamp:Date.now()},this.provider.setValue(this._state,!0),this.host.requestUpdate()}};let ComposerStateProvider=class ComposerStateProvider extends StateProviderBase{createContextProvider(e){return new context_provider_i(this.host,{context:"composer-state",initialValue:e})}onMessageReceived(e){switch(!0){case op.is(e):{let e={...this._state,generatingCommits:!0,generatingCommitsStatus:null,timestamp:Date.now()};this._state=e,this.provider.setValue(this._state,!0);break}case ou.is(e):{let t={...this._state,generatingCommitsStatus:e.params.message,timestamp:Date.now()};this._state=t,this.provider.setValue(this._state,!0);break}case om.is(e):{let t={...this._state,generatingCommitMessage:e.params.commitId,timestamp:Date.now()};this._state=t,this.provider.setValue(this._state,!0);break}case og.is(e):{let t;if(e.params.replacedCommitIds){let i=(t=[...this._state.commits]).findIndex(t=>e.params.replacedCommitIds.includes(t.id));(t=t.filter(t=>!e.params.replacedCommitIds.includes(t.id))).splice(i,0,...e.params.commits);let o=new Map(this._state.hunks.map(e=>[e.index,`${e.diffHeader}
${e.hunkHeader}`])),s=new Map(e.params.hunks.map(e=>[`${e.diffHeader}
${e.hunkHeader}`,e.index])),r=e.params.commits.map(e=>e.id);for(let e of t)if(!r.includes(e.id)){e.locked=!0;let t=e.hunkIndices.map(e=>o.get(e));e.hunkIndices=t.map(e=>s.get(e)).filter(e=>null!=e)}}else t=e.params.commits;let i={...this._state,generatingCommits:!1,generatingCommitsStatus:null,commits:t,hunks:(e.params.hunks??this._state.hunks).map(e=>({...e,assigned:!0})),hasUsedAutoCompose:!0,timestamp:Date.now(),recompose:this._state.recompose?.enabled?{...this._state.recompose,locked:!1}:this._state.recompose};this._state=i,this.provider.setValue(this._state,!0);break}case of.is(e):{let t=this._state.commits.map(t=>t.id===e.params.commitId?{...t,message:{content:e.params.message,isGenerated:!0}}:t),i={...this._state,generatingCommitMessage:null,commits:t,timestamp:Date.now()};this._state=i,this.provider.setValue(this._state,!0);break}case ob.is(e):{let e={...this._state,committing:!0,timestamp:Date.now()};this._state=e,this.provider.setValue(this._state,!0);break}case ov.is(e):{let e={...this._state,committing:!1,timestamp:Date.now()};this._state=e,this.provider.setValue(this._state,!0);break}case oy.is(e):{let t={...this._state,safetyError:e.params.error,timestamp:Date.now()};this._state=t,this.provider.setValue(this._state,!0);break}case ow.is(e):{let t={...this._state,hunks:e.params.hunks,commits:e.params.commits,baseCommit:e.params.baseCommit,loadingError:e.params.loadingError,hasChanges:e.params.hasChanges,safetyError:null,generatingCommits:!1,generatingCommitsStatus:null,generatingCommitMessage:null,committing:!1,workingDirectoryHasChanged:!1,indexHasChanged:!1,timestamp:Date.now(),hasUsedAutoCompose:!1,repositoryState:e.params.repositoryState,recompose:this._state.recompose?.enabled?{...this._state.recompose,locked:!0}:this._state.recompose};this._state=t,this.provider.setValue(this._state,!0);break}case ox.is(e):{let e={...this._state,workingDirectoryHasChanged:!0,timestamp:Date.now()};this._state=e,this.provider.setValue(this._state,!0);break}case oC.is(e):{let e={...this._state,indexHasChanged:!0,timestamp:Date.now()};this._state=e,this.provider.setValue(this._state,!0);break}case ok.is(e):{let t={...this._state,loadingError:e.params.error,timestamp:Date.now()};this._state=t,this.provider.setValue(this._state,!0);break}case o$.is(e):{let t={...this._state,aiOperationError:{operation:e.params.operation,error:e.params.error},generatingCommits:!1,generatingCommitsStatus:null,generatingCommitMessage:null,timestamp:Date.now()};this._state=t,this.provider.setValue(this._state,!0);break}case oE.is(e):{let e={...this._state,aiOperationError:null,timestamp:Date.now()};this._state=e,this.provider.setValue(this._state,!0);break}case o_.is(e):{let e={...this._state,generatingCommits:!1,generatingCommitsStatus:null,timestamp:Date.now()};this._state=e,this.provider.setValue(this._state,!0);break}case oS.is(e):{let e={...this._state,generatingCommitMessage:null,timestamp:Date.now()};this._state=e,this.provider.setValue(this._state,!0);break}case oI.is(e):{let t={...this._state,aiEnabled:{...this._state.aiEnabled,...void 0!==e.params.org&&{org:e.params.org},...void 0!==e.params.config&&{config:e.params.config}},timestamp:Date.now()};this._state=t,this.provider.setValue(this._state,!0);break}case oA.is(e):{let t={...this._state,ai:{...this._state.ai,model:e.params.model},timestamp:Date.now()};this._state=t,this.provider.setValue(this._state,!0)}}}};function oT(e,t,i){return e?t(e):i?.(e)}function oD(){return(oD=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i)({}).hasOwnProperty.call(i,o)&&(e[o]=i[o])}return e}).apply(null,arguments)}function oR(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,o)}return i}function oP(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?oR(Object(i),!0).forEach(function(t){var o,s;o=t,s=i[t],(o=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var o=i.call(e,t||"default");if("object"!=typeof o)return o;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(o))in e?Object.defineProperty(e,o,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[o]=s}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):oR(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}function oL(e){return(oL="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function oM(e){if("u">typeof window&&window.navigator)return!!navigator.userAgent.match(e)}var oO=oM(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),oz=oM(/Edge/i),oN=oM(/firefox/i),oH=oM(/safari/i)&&!oM(/chrome/i)&&!oM(/android/i),oB=oM(/iP(ad|od|hone)/i),oj=oM(/chrome/i)&&oM(/android/i),oF={capture:!1,passive:!1};function oq(e,t,i){e.addEventListener(t,i,!oO&&oF)}function oU(e,t,i){e.removeEventListener(t,i,!oO&&oF)}function oW(e,t){if(t){if(">"===t[0]&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch{}return!1}}function oV(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function oG(e,t,i,o){if(e){i=i||document;do{if(null!=t&&(">"===t[0]?e.parentNode===i&&oW(e,t):oW(e,t))||o&&e===i)return e;if(e===i)break}while(e=oV(e))}return null}var oY=/\s+/g;function oZ(e,t,i){if(e&&t)if(e.classList)e.classList[i?"add":"remove"](t);else{var o=(" "+e.className+" ").replace(oY," ").replace(" "+t+" "," ");e.className=(o+(i?" "+t:"")).replace(oY," ")}}function oX(e,t,i){var o=e&&e.style;if(o)if(void 0===i)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(i=e.currentStyle),void 0===t?i:i[t];else t in o||-1!==t.indexOf("webkit")||(t="-webkit-"+t),o[t]=i+("string"==typeof i?"":"px")}function oK(e,t){var i="";if("string"==typeof e)i=e;else do{var o=oX(e,"transform");o&&"none"!==o&&(i=o+" "+i)}while(!t&&(e=e.parentNode))var s=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return s&&new s(i)}function oJ(e,t,i){if(e){var o=e.getElementsByTagName(t),s=0,r=o.length;if(i)for(;s<r;s++)i(o[s],s);return o}return[]}function oQ(){var e=document.scrollingElement;return e||document.documentElement}function o0(e,t,i,o,s){if(e.getBoundingClientRect||e===window){if(e!==window&&e.parentNode&&e!==oQ()?(a=(r=e.getBoundingClientRect()).top,c=r.left,h=r.bottom,p=r.right,u=r.height,m=r.width):(a=0,c=0,h=window.innerHeight,p=window.innerWidth,u=window.innerHeight,m=window.innerWidth),(t||i)&&e!==window&&(s=s||e.parentNode,!oO))do if(s&&s.getBoundingClientRect&&("none"!==oX(s,"transform")||i&&"static"!==oX(s,"position"))){var r,a,c,h,p,u,m,g=s.getBoundingClientRect();a-=g.top+parseInt(oX(s,"border-top-width")),c-=g.left+parseInt(oX(s,"border-left-width")),h=a+r.height,p=c+r.width;break}while(s=s.parentNode)if(o&&e!==window){var f=oK(s||e),b=f&&f.a,v=f&&f.d;f&&(a/=v,c/=b,m/=b,u/=v,h=a+u,p=c+m)}return{top:a,left:c,bottom:h,right:p,width:m,height:u}}}function o1(e,t,i){for(var o=o6(e,!0),s=o0(e)[t];o;){var r=o0(o)[i];if(!("top"===i||"left"===i?s>=r:s<=r))return o;if(o===oQ())break;o=o6(o,!1)}return!1}function o2(e,t,i,o){for(var s=0,r=0,a=e.children;r<a.length;){if("none"!==a[r].style.display&&a[r]!==s4.ghost&&(o||a[r]!==s4.dragged)&&oG(a[r],i.draggable,e,!1)){if(s===t)return a[r];s++}r++}return null}function o3(e,t){for(var i=e.lastElementChild;i&&(i===s4.ghost||"none"===oX(i,"display")||t&&!oW(i,t));)i=i.previousElementSibling;return i||null}function o5(e,t){var i=0;if(!e||!e.parentNode)return -1;for(;e=e.previousElementSibling;)"TEMPLATE"!==e.nodeName.toUpperCase()&&e!==s4.clone&&(!t||oW(e,t))&&i++;return i}function o4(e){var t=0,i=0,o=oQ();if(e)do{var s=oK(e),r=s.a,a=s.d;t+=e.scrollLeft*r,i+=e.scrollTop*a}while(e!==o&&(e=e.parentNode))return[t,i]}function o6(e,t){if(!e||!e.getBoundingClientRect)return oQ();var i=e,o=!1;do if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var s=oX(i);if(i.clientWidth<i.scrollWidth&&("auto"==s.overflowX||"scroll"==s.overflowX)||i.clientHeight<i.scrollHeight&&("auto"==s.overflowY||"scroll"==s.overflowY)){if(!i.getBoundingClientRect||i===document.body)return oQ();if(o||t)return i;o=!0}}while(i=i.parentNode)return oQ()}function o8(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}function o7(e,t){return function(){if(!su){var i=arguments;1===i.length?e.call(this,i[0]):e.apply(this,i),su=setTimeout(function(){su=void 0},t)}}}function o9(e,t,i){e.scrollLeft+=t,e.scrollTop+=i}function se(e){var t=window.Polymer,i=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):i?i(e).clone(!0)[0]:e.cloneNode(!0)}function st(e,t,i){var o={};return Array.from(e.children).forEach(function(s){if(oG(s,t.draggable,e,!1)&&!s.animated&&s!==i){var r,a,c,h,p=o0(s);o.left=Math.min(null!=(r=o.left)?r:1/0,p.left),o.top=Math.min(null!=(a=o.top)?a:1/0,p.top),o.right=Math.max(null!=(c=o.right)?c:-1/0,p.right),o.bottom=Math.max(null!=(h=o.bottom)?h:-1/0,p.bottom)}}),o.width=o.right-o.left,o.height=o.bottom-o.top,o.x=o.left,o.y=o.top,o}var si="Sortable"+new Date().getTime(),so=[],ss={initializeByDefault:!0},sr={mount:function(e){for(var t in ss)!ss.hasOwnProperty(t)||t in e||(e[t]=ss[t]);so.forEach(function(t){if(t.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),so.push(e)},pluginEvent:function(e,t,i){var o=this;this.eventCanceled=!1,i.cancel=function(){o.eventCanceled=!0};var s=e+"Global";so.forEach(function(o){t[o.pluginName]&&(t[o.pluginName][s]&&t[o.pluginName][s](oP({sortable:t},i)),t.options[o.pluginName]&&t[o.pluginName][e]&&t[o.pluginName][e](oP({sortable:t},i)))})},initializePlugins:function(e,t,i,o){for(var s in so.forEach(function(o){var s=o.pluginName;if(e.options[s]||o.initializeByDefault){var r=new o(e,t,e.options);r.sortable=e,r.options=e.options,e[s]=r,oD(i,r.defaults)}}),e.options)if(e.options.hasOwnProperty(s)){var r=this.modifyOption(e,s,e.options[s]);void 0!==r&&(e.options[s]=r)}},getEventProperties:function(e,t){var i={};return so.forEach(function(o){"function"==typeof o.eventProperties&&oD(i,o.eventProperties.call(t[o.pluginName],e))}),i},modifyOption:function(e,t,i){var o;return so.forEach(function(s){e[s.pluginName]&&s.optionListeners&&"function"==typeof s.optionListeners[t]&&(o=s.optionListeners[t].call(e[s.pluginName],i))}),o}},sn=["evt"],sa=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.evt,s=function(e,t){if(null==e)return{};var i,o,s=function(e,t){if(null==e)return{};var i={};for(var o in e)if(({}).hasOwnProperty.call(e,o)){if(-1!==t.indexOf(o))continue;i[o]=e[o]}return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)i=r[o],-1===t.indexOf(i)&&({}).propertyIsEnumerable.call(e,i)&&(s[i]=e[i])}return s}(i,sn);sr.pluginEvent.bind(s4)(e,t,oP({dragEl:sm,parentEl:sg,ghostEl:sf,rootEl:sb,nextEl:sv,lastDownEl:sy,cloneEl:sw,cloneHidden:sk,dragStarted:sL,putSortable:sE,activeSortable:s4.active,originalEvent:o,oldIndex:sx,oldDraggableIndex:s_,newIndex:sC,newDraggableIndex:sS,hideGhostForTarget:s1,unhideGhostForTarget:s2,cloneNowHidden:function(){sk=!0},cloneNowShown:function(){sk=!1},dispatchSortableEvent:function(e){sl({sortable:t,name:e,originalEvent:o})}},s))};function sl(e){!function(e){var t=e.sortable,i=e.rootEl,o=e.name,s=e.targetEl,r=e.cloneEl,a=e.toEl,c=e.fromEl,h=e.oldIndex,p=e.newIndex,u=e.oldDraggableIndex,m=e.newDraggableIndex,g=e.originalEvent,f=e.putSortable,b=e.extraEventProperties;if(t=t||i&&i[si]){var v,w=t.options,x="on"+o.charAt(0).toUpperCase()+o.substr(1);!window.CustomEvent||oO||oz?(v=document.createEvent("Event")).initEvent(o,!0,!0):v=new CustomEvent(o,{bubbles:!0,cancelable:!0}),v.to=a||i,v.from=c||i,v.item=s||i,v.clone=r,v.oldIndex=h,v.newIndex=p,v.oldDraggableIndex=u,v.newDraggableIndex=m,v.originalEvent=g,v.pullMode=f?f.lastPutMode:void 0;var C=oP(oP({},b),sr.getEventProperties(o,t));for(var _ in C)v[_]=C[_];i&&i.dispatchEvent(v),w[x]&&w[x].call(t,v)}}(oP({putSortable:sE,cloneEl:sw,targetEl:sm,rootEl:sb,oldIndex:sx,oldDraggableIndex:s_,newIndex:sC,newDraggableIndex:sS},e))}var sc,sd,sh,sp,su,sm,sg,sf,sb,sv,sy,sw,sk,sx,sC,s_,sS,s$,sE,sI,sA,sT,sD,sR,sP,sL,sM,sO,sz,sN,sH=!1,sB=!1,sj=[],sF=!1,sq=!1,sU=[],sW=!1,sV=[],sG="u">typeof document,sY=oz||oO?"cssFloat":"float",sZ=sG&&!oj&&!oB&&"draggable"in document.createElement("div"),sX=function(){if(sG){if(oO)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto","auto"===e.style.pointerEvents}}(),sK=function(e,t){var i=oX(e),o=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),s=o2(e,0,t),r=o2(e,1,t),a=s&&oX(s),c=r&&oX(r),h=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+o0(s).width,p=c&&parseInt(c.marginLeft)+parseInt(c.marginRight)+o0(r).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?"vertical":"horizontal";if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(s&&a.float&&"none"!==a.float){var u="left"===a.float?"left":"right";return r&&("both"===c.clear||c.clear===u)?"vertical":"horizontal"}return s&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||h>=o&&"none"===i[sY]||r&&"none"===i[sY]&&h+p>o)?"vertical":"horizontal"},sJ=function(e,t,i){var o=i?e.left:e.top,s=i?e.right:e.bottom,r=i?e.width:e.height,a=i?t.left:t.top,c=i?t.right:t.bottom,h=i?t.width:t.height;return o===a||s===c||o+r/2===a+h/2},sQ=function(e,t){var i;return sj.some(function(o){var s=o[si].options.emptyInsertThreshold;if(!(!s||o3(o))){var r=o0(o),a=e>=r.left-s&&e<=r.right+s,c=t>=r.top-s&&t<=r.bottom+s;if(a&&c)return i=o}}),i},s0=function(e){function t(e,i){return function(o,s,r,a){var c=o.options.group.name&&s.options.group.name&&o.options.group.name===s.options.group.name;if(null==e&&(i||c))return!0;if(null==e||!1===e)return!1;if(i&&"clone"===e)return e;if("function"==typeof e)return t(e(o,s,r,a),i)(o,s,r,a);var h=(i?o:s).options.group.name;return!0===e||"string"==typeof e&&e===h||e.join&&e.indexOf(h)>-1}}var i={},o=e.group;o&&"object"==oL(o)||(o={name:o}),i.name=o.name,i.checkPull=t(o.pull,!0),i.checkPut=t(o.put),i.revertClone=o.revertClone,e.group=i},s1=function(){!sX&&sf&&oX(sf,"display","none")},s2=function(){!sX&&sf&&oX(sf,"display","")};sG&&!oj&&document.addEventListener("click",function(e){if(sB)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),sB=!1,!1},!0);var s3=function(e){if(sm){var t=sQ((e=e.touches?e.touches[0]:e).clientX,e.clientY);if(t){var i={};for(var o in e)e.hasOwnProperty(o)&&(i[o]=e[o]);i.target=i.rootEl=t,i.preventDefault=void 0,i.stopPropagation=void 0,t[si]._onDragOver(i)}}},s5=function(e){sm&&sm.parentNode[si]._isOutsideThisEl(e.target)};function s4(e,t){if(!(e&&e.nodeType&&1===e.nodeType))throw"Sortable: `el` must be an HTMLElement, not ".concat(({}).toString.call(e));this.el=e,this.options=t=oD({},t),e[si]=this;var i,o,s={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return sK(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==s4.supportPointer&&"PointerEvent"in window&&(!oH||oB),emptyInsertThreshold:5};for(var r in sr.initializePlugins(this,e,s),s)r in t||(t[r]=s[r]);for(var a in s0(t),this)"_"===a.charAt(0)&&"function"==typeof this[a]&&(this[a]=this[a].bind(this));this.nativeDraggable=!t.forceFallback&&sZ,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?oq(e,"pointerdown",this._onTapStart):(oq(e,"mousedown",this._onTapStart),oq(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(oq(e,"dragover",this),oq(e,"dragenter",this)),sj.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),oD(this,(o=[],{captureAnimationState:function(){o=[],this.options.animation&&[].slice.call(this.el.children).forEach(function(e){if("none"!==oX(e,"display")&&e!==s4.ghost){o.push({target:e,rect:o0(e)});var t=oP({},o[o.length-1].rect);if(e.thisAnimationDuration){var i=oK(e,!0);i&&(t.top-=i.f,t.left-=i.e)}e.fromRect=t}})},addAnimationState:function(e){o.push(e)},removeAnimationState:function(e){o.splice(function(e,t){for(var i in e)if(e.hasOwnProperty(i)){for(var o in t)if(t.hasOwnProperty(o)&&t[o]===e[i][o])return Number(i)}return -1}(o,{target:e}),1)},animateAll:function(e){var t=this;if(!this.options.animation){clearTimeout(i),"function"==typeof e&&e();return}var s=!1,r=0;o.forEach(function(e){var i,o,a,c,h=0,p=e.target,u=p.fromRect,m=o0(p),g=p.prevFromRect,f=p.prevToRect,b=e.rect,v=oK(p,!0);v&&(m.top-=v.f,m.left-=v.e),p.toRect=m,p.thisAnimationDuration&&o8(g,m)&&!o8(u,m)&&(b.top-m.top)/(b.left-m.left)==(u.top-m.top)/(u.left-m.left)&&(i=b,o=g,a=f,c=t.options,h=Math.sqrt(Math.pow(o.top-i.top,2)+Math.pow(o.left-i.left,2))/Math.sqrt(Math.pow(o.top-a.top,2)+Math.pow(o.left-a.left,2))*c.animation),o8(m,u)||(p.prevFromRect=u,p.prevToRect=m,h||(h=t.options.animation),t.animate(p,b,m,h)),h&&(s=!0,r=Math.max(r,h),clearTimeout(p.animationResetTimer),p.animationResetTimer=setTimeout(function(){p.animationTime=0,p.prevFromRect=null,p.fromRect=null,p.prevToRect=null,p.thisAnimationDuration=null},h),p.thisAnimationDuration=h)}),clearTimeout(i),s?i=setTimeout(function(){"function"==typeof e&&e()},r):"function"==typeof e&&e(),o=[]},animate:function(e,t,i,o){if(o){oX(e,"transition",""),oX(e,"transform","");var s=oK(this.el),r=s&&s.a,a=s&&s.d,c=(t.left-i.left)/(r||1),h=(t.top-i.top)/(a||1);e.animatingX=!!c,e.animatingY=!!h,oX(e,"transform","translate3d("+c+"px,"+h+"px,0)"),this.forRepaintDummy=e.offsetWidth,oX(e,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),oX(e,"transform","translate3d(0,0,0)"),"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=setTimeout(function(){oX(e,"transition",""),oX(e,"transform",""),e.animated=!1,e.animatingX=!1,e.animatingY=!1},o)}}}))}function s6(e,t,i,o,s,r,a,c){var h,p,u=e[si],m=u.options.onMove;return!window.CustomEvent||oO||oz?(h=document.createEvent("Event")).initEvent("move",!0,!0):h=new CustomEvent("move",{bubbles:!0,cancelable:!0}),h.to=t,h.from=e,h.dragged=i,h.draggedRect=o,h.related=s||t,h.relatedRect=r||o0(t),h.willInsertAfter=c,h.originalEvent=a,e.dispatchEvent(h),m&&(p=m.call(u,h,a)),p}function s8(e){e.draggable=!1}function s7(){sW=!1}function s9(e){return setTimeout(e,0)}function re(e){return clearTimeout(e)}s4.prototype={constructor:s4,_isOutsideThisEl:function(e){this.el.contains(e)||e===this.el||(sM=null)},_getDirection:function(e,t){return"function"==typeof this.options.direction?this.options.direction.call(this,e,t,sm):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,i=this.el,o=this.options,s=o.preventOnFilter,r=e.type,a=e.touches&&e.touches[0]||e.pointerType&&"touch"===e.pointerType&&e,c=(a||e).target,h=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||c,p=o.filter;if(function(e){sV.length=0;for(var t=e.getElementsByTagName("input"),i=t.length;i--;){var o=t[i];o.checked&&sV.push(o)}}(i),!(sm||/mousedown|pointerdown/.test(r)&&0!==e.button||o.disabled||h.isContentEditable||!this.nativeDraggable&&oH&&c&&"SELECT"===c.tagName.toUpperCase()||(c=oG(c,o.draggable,i,!1))&&c.animated)&&sy!==c){if(sx=o5(c),s_=o5(c,o.draggable),"function"==typeof p){if(p.call(this,e,c,this)){sl({sortable:t,rootEl:h,name:"filter",targetEl:c,toEl:i,fromEl:i}),sa("filter",t,{evt:e}),s&&e.preventDefault();return}}else if(p&&(p=p.split(",").some(function(o){if(o=oG(h,o.trim(),i,!1))return sl({sortable:t,rootEl:o,name:"filter",targetEl:c,fromEl:i,toEl:i}),sa("filter",t,{evt:e}),!0}))){s&&e.preventDefault();return}(!o.handle||oG(h,o.handle,i,!1))&&this._prepareDragStart(e,a,c)}}},_prepareDragStart:function(e,t,i){var o,s=this,r=s.el,a=s.options,c=r.ownerDocument;if(i&&!sm&&i.parentNode===r){var h=o0(i);if(sb=r,sg=(sm=i).parentNode,sv=sm.nextSibling,sy=i,s$=a.group,s4.dragged=sm,sR=(sI={target:sm,clientX:(t||e).clientX,clientY:(t||e).clientY}).clientX-h.left,sP=sI.clientY-h.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,sm.style["will-change"]="all",o=function(){(sa("delayEnded",s,{evt:e}),s4.eventCanceled)?s._onDrop():(s._disableDelayedDragEvents(),!oN&&s.nativeDraggable&&(sm.draggable=!0),s._triggerDragStart(e,t),sl({sortable:s,name:"choose",originalEvent:e}),oZ(sm,a.chosenClass,!0))},a.ignore.split(",").forEach(function(e){oJ(sm,e.trim(),s8)}),oq(c,"dragover",s3),oq(c,"mousemove",s3),oq(c,"touchmove",s3),a.supportPointer?(oq(c,"pointerup",s._onDrop),this.nativeDraggable||oq(c,"pointercancel",s._onDrop)):(oq(c,"mouseup",s._onDrop),oq(c,"touchend",s._onDrop),oq(c,"touchcancel",s._onDrop)),oN&&this.nativeDraggable&&(this.options.touchStartThreshold=4,sm.draggable=!0),sa("delayStart",this,{evt:e}),!a.delay||a.delayOnTouchOnly&&!t||this.nativeDraggable&&(oz||oO))o();else{if(s4.eventCanceled)return void this._onDrop();a.supportPointer?(oq(c,"pointerup",s._disableDelayedDrag),oq(c,"pointercancel",s._disableDelayedDrag)):(oq(c,"mouseup",s._disableDelayedDrag),oq(c,"touchend",s._disableDelayedDrag),oq(c,"touchcancel",s._disableDelayedDrag)),oq(c,"mousemove",s._delayedDragTouchMoveHandler),oq(c,"touchmove",s._delayedDragTouchMoveHandler),a.supportPointer&&oq(c,"pointermove",s._delayedDragTouchMoveHandler),s._dragStartTimer=setTimeout(o,a.delay)}}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){sm&&s8(sm),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;oU(e,"mouseup",this._disableDelayedDrag),oU(e,"touchend",this._disableDelayedDrag),oU(e,"touchcancel",this._disableDelayedDrag),oU(e,"pointerup",this._disableDelayedDrag),oU(e,"pointercancel",this._disableDelayedDrag),oU(e,"mousemove",this._delayedDragTouchMoveHandler),oU(e,"touchmove",this._delayedDragTouchMoveHandler),oU(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||"touch"==e.pointerType&&e,!this.nativeDraggable||t?this.options.supportPointer?oq(document,"pointermove",this._onTouchMove):t?oq(document,"touchmove",this._onTouchMove):oq(document,"mousemove",this._onTouchMove):(oq(sm,"dragend",this),oq(sb,"dragstart",this._onDragStart));try{document.selection?s9(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(e,t){if(sH=!1,sb&&sm){sa("dragStarted",this,{evt:t}),this.nativeDraggable&&oq(document,"dragover",s5);var i=this.options;e||oZ(sm,i.dragClass,!1),oZ(sm,i.ghostClass,!0),s4.active=this,e&&this._appendGhost(),sl({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(sA){this._lastX=sA.clientX,this._lastY=sA.clientY,s1();for(var e=document.elementFromPoint(sA.clientX,sA.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(sA.clientX,sA.clientY))!==t;)t=e;if(sm.parentNode[si]._isOutsideThisEl(e),t)do{if(t[si]&&t[si]._onDragOver({clientX:sA.clientX,clientY:sA.clientY,target:e,rootEl:t})&&!this.options.dragoverBubble)break;e=t}while(t=oV(t))s2()}},_onTouchMove:function(e){if(sI){var t=this.options,i=t.fallbackTolerance,o=t.fallbackOffset,s=e.touches?e.touches[0]:e,r=sf&&oK(sf,!0),a=sf&&r&&r.a,c=sf&&r&&r.d,h=oB&&sN&&o4(sN),p=(s.clientX-sI.clientX+o.x)/(a||1)+(h?h[0]-sU[0]:0)/(a||1),u=(s.clientY-sI.clientY+o.y)/(c||1)+(h?h[1]-sU[1]:0)/(c||1);if(!s4.active&&!sH){if(i&&Math.max(Math.abs(s.clientX-this._lastX),Math.abs(s.clientY-this._lastY))<i)return;this._onDragStart(e,!0)}if(sf){r?(r.e+=p-(sT||0),r.f+=u-(sD||0)):r={a:1,b:0,c:0,d:1,e:p,f:u};var m="matrix(".concat(r.a,",").concat(r.b,",").concat(r.c,",").concat(r.d,",").concat(r.e,",").concat(r.f,")");oX(sf,"webkitTransform",m),oX(sf,"mozTransform",m),oX(sf,"msTransform",m),oX(sf,"transform",m),sT=p,sD=u,sA=s}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!sf){var e=this.options.fallbackOnBody?document.body:sb,t=o0(sm,!0,oB,!0,e),i=this.options;if(oB){for(sN=e;"static"===oX(sN,"position")&&"none"===oX(sN,"transform")&&sN!==document;)sN=sN.parentNode;sN!==document.body&&sN!==document.documentElement?(sN===document&&(sN=oQ()),t.top+=sN.scrollTop,t.left+=sN.scrollLeft):sN=oQ(),sU=o4(sN)}oZ(sf=sm.cloneNode(!0),i.ghostClass,!1),oZ(sf,i.fallbackClass,!0),oZ(sf,i.dragClass,!0),oX(sf,"transition",""),oX(sf,"transform",""),oX(sf,"box-sizing","border-box"),oX(sf,"margin",0),oX(sf,"top",t.top),oX(sf,"left",t.left),oX(sf,"width",t.width),oX(sf,"height",t.height),oX(sf,"opacity","0.8"),oX(sf,"position",oB?"absolute":"fixed"),oX(sf,"zIndex","100000"),oX(sf,"pointerEvents","none"),s4.ghost=sf,e.appendChild(sf),oX(sf,"transform-origin",sR/parseInt(sf.style.width)*100+"% "+sP/parseInt(sf.style.height)*100+"%")}},_onDragStart:function(e,t){var i=this,o=e.dataTransfer,s=i.options;(sa("dragStart",this,{evt:e}),s4.eventCanceled)?this._onDrop():(sa("setupClone",this),s4.eventCanceled||((sw=se(sm)).removeAttribute("id"),sw.draggable=!1,sw.style["will-change"]="",this._hideClone(),oZ(sw,this.options.chosenClass,!1),s4.clone=sw),i.cloneId=s9(function(){sa("clone",i),s4.eventCanceled||(i.options.removeCloneOnHide||sb.insertBefore(sw,sm),i._hideClone(),sl({sortable:i,name:"clone"}))}),t||oZ(sm,s.dragClass,!0),t?(sB=!0,i._loopId=setInterval(i._emulateDragOver,50)):(oU(document,"mouseup",i._onDrop),oU(document,"touchend",i._onDrop),oU(document,"touchcancel",i._onDrop),o&&(o.effectAllowed="move",s.setData&&s.setData.call(i,o,sm)),oq(document,"drop",i),oX(sm,"transform","translateZ(0)")),sH=!0,i._dragStartId=s9(i._dragStarted.bind(i,t,e)),oq(document,"selectstart",i),sL=!0,window.getSelection().removeAllRanges(),oH&&oX(document.body,"user-select","none"))},_onDragOver:function(e){var t,i,o,s,r=this.el,a=e.target,c=this.options,h=c.group,p=s4.active,u=s$===h,m=c.sort,g=sE||p,f=this,b=!1;if(!sW){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),a=oG(a,c.draggable,r,!0),X("dragOver"),s4.eventCanceled)return b;if(sm.contains(e.target)||a.animated&&a.animatingX&&a.animatingY||f._ignoreWhileAnimating===a)return J(!1);if(sB=!1,p&&!c.disabled&&(u?m||(o=sg!==sb):sE===this||(this.lastPutMode=s$.checkPull(this,p,sm,e))&&h.checkPut(this,p,sm,e))){if(s="vertical"===this._getDirection(e,a),t=o0(sm),X("dragOverValid"),s4.eventCanceled)return b;if(o)return sg=sb,K(),this._hideClone(),X("revert"),s4.eventCanceled||(sv?sb.insertBefore(sm,sv):sb.appendChild(sm)),J(!0);var v=o3(r,c.draggable);if(!v||(x=e,C=s,_=this,S=o0(o3(_.el,_.options.draggable)),$=st(_.el,_.options,sf),(C?x.clientX>$.right+10||x.clientY>S.bottom&&x.clientX>S.left:x.clientY>$.bottom+10||x.clientX>S.right&&x.clientY>S.top)&&!v.animated)){if(v===sm)return J(!1);if(v&&r===e.target&&(a=v),a&&(i=o0(a)),!1!==s6(sb,r,sm,t,a,i,e,!!a))return K(),v&&v.nextSibling?r.insertBefore(sm,v.nextSibling):r.appendChild(sm),sg=r,Q(),J(!0)}else if(v&&(E=e,A=s,T=this,D=o0(o2(T.el,0,T.options,!0)),P=st(T.el,T.options,sf),A?E.clientX<P.left-10||E.clientY<D.top&&E.clientX<D.right:E.clientY<P.top-10||E.clientY<D.bottom&&E.clientX<D.left)){var w=o2(r,0,c,!0);if(w===sm)return J(!1);if(i=o0(a=w),!1!==s6(sb,r,sm,t,a,i,e,!1))return K(),r.insertBefore(sm,w),sg=r,Q(),J(!0)}else if(a.parentNode===r){i=o0(a);var x,C,_,S,$,E,A,T,D,P,M,O,N=0,B=sm.parentNode!==r,j=!sJ(sm.animated&&sm.toRect||t,a.animated&&a.toRect||i,s),F=s?"top":"left",q=o1(a,"top","top")||o1(sm,"top","top"),U=q?q.scrollTop:void 0;if(sM!==a&&(O=i[F],sF=!1,sq=!j&&c.invertSwap||B),0!==(N=function(e,t,i,o,s,r,a,c){var h,p=o?e.clientY:e.clientX,u=o?i.height:i.width,m=o?i.top:i.left,g=o?i.bottom:i.right,f=!1;if(!a){if(c&&sz<u*s){if(!sF&&(1===sO?p>m+u*r/2:p<g-u*r/2)&&(sF=!0),sF)f=!0;else if(1===sO?p<m+sz:p>g-sz)return-sO}else if(p>m+u*(1-s)/2&&p<g-u*(1-s)/2){return h=t,o5(sm)<o5(h)?1:-1}}return(f=f||a)&&(p<m+u*r/2||p>g-u*r/2)?p>m+u/2?1:-1:0}(e,a,i,s,j?1:c.swapThreshold,null==c.invertedSwapThreshold?c.swapThreshold:c.invertedSwapThreshold,sq,sM===a))){var W=o5(sm);do W-=N,M=sg.children[W];while(M&&("none"===oX(M,"display")||M===sf))}if(0===N||M===a)return J(!1);sM=a,sO=N;var V=a.nextElementSibling,G=!1,Y=s6(sb,r,sm,t,a,i,e,G=1===N);if(!1!==Y)return(1===Y||-1===Y)&&(G=1===Y),sW=!0,setTimeout(s7,30),K(),G&&!V?r.appendChild(sm):a.parentNode.insertBefore(sm,G?V:a),q&&o9(q,0,U-q.scrollTop),sg=sm.parentNode,void 0===O||sq||(sz=Math.abs(O-o0(a)[F])),Q(),J(!0)}if(r.contains(sm))return J(!1)}return!1}function X(c,h){sa(c,f,oP({evt:e,isOwner:u,axis:s?"vertical":"horizontal",revert:o,dragRect:t,targetRect:i,canSort:m,fromSortable:g,target:a,completed:J,onMove:function(i,o){return s6(sb,r,sm,t,i,o0(i),e,o)},changed:Q},h))}function K(){X("dragOverAnimationCapture"),f.captureAnimationState(),f!==g&&g.captureAnimationState()}function J(t){return X("dragOverCompleted",{insertion:t}),t&&(u?p._hideClone():p._showClone(f),f!==g&&(oZ(sm,sE?sE.options.ghostClass:p.options.ghostClass,!1),oZ(sm,c.ghostClass,!0)),sE!==f&&f!==s4.active?sE=f:f===s4.active&&sE&&(sE=null),g===f&&(f._ignoreWhileAnimating=a),f.animateAll(function(){X("dragOverAnimationComplete"),f._ignoreWhileAnimating=null}),f!==g&&(g.animateAll(),g._ignoreWhileAnimating=null)),(a!==sm||sm.animated)&&(a!==r||a.animated)||(sM=null),c.dragoverBubble||e.rootEl||a===document||(sm.parentNode[si]._isOutsideThisEl(e.target),t||s3(e)),!c.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),b=!0}function Q(){sC=o5(sm),sS=o5(sm,c.draggable),sl({sortable:f,name:"change",toEl:r,newIndex:sC,newDraggableIndex:sS,originalEvent:e})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){oU(document,"mousemove",this._onTouchMove),oU(document,"touchmove",this._onTouchMove),oU(document,"pointermove",this._onTouchMove),oU(document,"dragover",s3),oU(document,"mousemove",s3),oU(document,"touchmove",s3)},_offUpEvents:function(){var e=this.el.ownerDocument;oU(e,"mouseup",this._onDrop),oU(e,"touchend",this._onDrop),oU(e,"pointerup",this._onDrop),oU(e,"pointercancel",this._onDrop),oU(e,"touchcancel",this._onDrop),oU(document,"selectstart",this)},_onDrop:function(e){var t=this.el,i=this.options;sC=o5(sm),sS=o5(sm,i.draggable),sa("drop",this,{evt:e}),sg=sm&&sm.parentNode,sC=o5(sm),sS=o5(sm,i.draggable),s4.eventCanceled||(sH=!1,sq=!1,sF=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),re(this.cloneId),re(this._dragStartId),this.nativeDraggable&&(oU(document,"drop",this),oU(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),oH&&oX(document.body,"user-select",""),oX(sm,"transform",""),e&&(sL&&(e.cancelable&&e.preventDefault(),i.dropBubble||e.stopPropagation()),sf&&sf.parentNode&&sf.parentNode.removeChild(sf),(sb===sg||sE&&"clone"!==sE.lastPutMode)&&sw&&sw.parentNode&&sw.parentNode.removeChild(sw),sm&&(this.nativeDraggable&&oU(sm,"dragend",this),s8(sm),sm.style["will-change"]="",sL&&!sH&&oZ(sm,sE?sE.options.ghostClass:this.options.ghostClass,!1),oZ(sm,this.options.chosenClass,!1),sl({sortable:this,name:"unchoose",toEl:sg,newIndex:null,newDraggableIndex:null,originalEvent:e}),sb!==sg?(sC>=0&&(sl({rootEl:sg,name:"add",toEl:sg,fromEl:sb,originalEvent:e}),sl({sortable:this,name:"remove",toEl:sg,originalEvent:e}),sl({rootEl:sg,name:"sort",toEl:sg,fromEl:sb,originalEvent:e}),sl({sortable:this,name:"sort",toEl:sg,originalEvent:e})),sE&&sE.save()):sC!==sx&&sC>=0&&(sl({sortable:this,name:"update",toEl:sg,originalEvent:e}),sl({sortable:this,name:"sort",toEl:sg,originalEvent:e})),s4.active&&((null==sC||-1===sC)&&(sC=sx,sS=s_),sl({sortable:this,name:"end",toEl:sg,originalEvent:e}),this.save())))),this._nulling()},_nulling:function(){sa("nulling",this),sb=sm=sg=sf=sv=sw=sy=sk=sI=sA=sL=sC=sS=sx=s_=sM=sO=sE=s$=s4.dragged=s4.ghost=s4.clone=s4.active=null;var e=this.el;sV.forEach(function(t){e.contains(t)&&(t.checked=!0)}),sV.length=sT=sD=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":var t;sm&&(this._onDragOver(e),(t=e).dataTransfer&&(t.dataTransfer.dropEffect="move"),t.cancelable&&t.preventDefault());break;case"selectstart":e.preventDefault()}},toArray:function(){for(var e,t=[],i=this.el.children,o=0,s=i.length,r=this.options;o<s;o++)oG(e=i[o],r.draggable,this.el,!1)&&t.push(e.getAttribute(r.dataIdAttr)||function(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,i=t.length,o=0;i--;)o+=t.charCodeAt(i);return o.toString(36)}(e));return t},sort:function(e,t){var i={},o=this.el;this.toArray().forEach(function(e,t){var s=o.children[t];oG(s,this.options.draggable,o,!1)&&(i[e]=s)},this),t&&this.captureAnimationState(),e.forEach(function(e){i[e]&&(o.removeChild(i[e]),o.appendChild(i[e]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return oG(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var i=this.options;if(void 0===t)return i[e];var o=sr.modifyOption(this,e,t);void 0!==o?i[e]=o:i[e]=t,"group"===e&&s0(i)},destroy:function(){sa("destroy",this);var e=this.el;e[si]=null,oU(e,"mousedown",this._onTapStart),oU(e,"touchstart",this._onTapStart),oU(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(oU(e,"dragover",this),oU(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),sj.splice(sj.indexOf(this.el),1),this.el=null},_hideClone:function(){!sk&&(sa("hideClone",this),s4.eventCanceled||(oX(sw,"display","none"),this.options.removeCloneOnHide&&sw.parentNode&&sw.parentNode.removeChild(sw),sk=!0))},_showClone:function(e){if("clone"!==e.lastPutMode)return void this._hideClone();if(sk){if(sa("showClone",this),s4.eventCanceled)return;sm.parentNode!=sb||this.options.group.revertClone?sv?sb.insertBefore(sw,sv):sb.appendChild(sw):sb.insertBefore(sw,sm),this.options.group.revertClone&&this.animate(sm,sw),oX(sw,"display",""),sk=!1}}},sG&&oq(document,"touchmove",function(e){(s4.active||sH)&&e.cancelable&&e.preventDefault()}),s4.utils={on:oq,off:oU,css:oX,find:oJ,is:function(e,t){return!!oG(e,t,e,!1)},extend:function(e,t){if(e&&t)for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e},throttle:o7,closest:oG,toggleClass:oZ,clone:se,index:o5,nextTick:s9,cancelNextTick:re,detectDirection:sK,getChild:o2,expando:si},s4.get=function(e){return e[si]},s4.mount=function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];t[0].constructor===Array&&(t=t[0]),t.forEach(function(e){if(!e.prototype||!e.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat(({}).toString.call(e));e.utils&&(s4.utils=oP(oP({},s4.utils),e.utils)),sr.mount(e)})},s4.create=function(e,t){return new s4(e,t)},s4.version="1.15.7";var rt,ri,ro,rs,rr,rn,ra=[],rl=!1;function rc(){ra.forEach(function(e){clearInterval(e.pid)}),ra=[]}function rd(){clearInterval(rn)}var rh=o7(function(e,t,i,o){if(t.scroll){var s,r=(e.touches?e.touches[0]:e).clientX,a=(e.touches?e.touches[0]:e).clientY,c=t.scrollSensitivity,h=t.scrollSpeed,p=oQ(),u=!1;ri!==i&&(ri=i,rc(),rt=t.scroll,s=t.scrollFn,!0===rt&&(rt=o6(i,!0)));var m=0,g=rt;do{var f=g,b=o0(f),v=b.top,w=b.bottom,x=b.left,C=b.right,_=b.width,S=b.height,$=void 0,E=void 0,A=f.scrollWidth,T=f.scrollHeight,D=oX(f),P=f.scrollLeft,M=f.scrollTop;f===p?($=_<A&&("auto"===D.overflowX||"scroll"===D.overflowX||"visible"===D.overflowX),E=S<T&&("auto"===D.overflowY||"scroll"===D.overflowY||"visible"===D.overflowY)):($=_<A&&("auto"===D.overflowX||"scroll"===D.overflowX),E=S<T&&("auto"===D.overflowY||"scroll"===D.overflowY));var O=$&&(Math.abs(C-r)<=c&&P+_<A)-(Math.abs(x-r)<=c&&!!P),N=E&&(Math.abs(w-a)<=c&&M+S<T)-(Math.abs(v-a)<=c&&!!M);if(!ra[m])for(var B=0;B<=m;B++)ra[B]||(ra[B]={});(ra[m].vx!=O||ra[m].vy!=N||ra[m].el!==f)&&(ra[m].el=f,ra[m].vx=O,ra[m].vy=N,clearInterval(ra[m].pid),(0!=O||0!=N)&&(u=!0,ra[m].pid=setInterval((function(){o&&0===this.layer&&s4.active._onTouchMove(rr);var t=ra[this.layer].vy?ra[this.layer].vy*h:0,i=ra[this.layer].vx?ra[this.layer].vx*h:0;("function"!=typeof s||"continue"===s.call(s4.dragged.parentNode[si],i,t,e,rr,ra[this.layer].el))&&o9(ra[this.layer].el,i,t)}).bind({layer:m}),24))),m++}while(t.bubbleScroll&&g!==p&&(g=o6(g,!1)))rl=u}},30),rp=function(e){var t=e.originalEvent,i=e.putSortable,o=e.dragEl,s=e.activeSortable,r=e.dispatchSortableEvent,a=e.hideGhostForTarget,c=e.unhideGhostForTarget;if(t){var h=i||s;a();var p=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,u=document.elementFromPoint(p.clientX,p.clientY);c(),h&&!h.el.contains(u)&&(r("spill"),this.onSpill({dragEl:o,putSortable:i}))}};function ru(){}function rm(){}function rg(e,t){return t.filter(t=>e.hunkIndices.includes(t.index))}function rf(e){let t=e.filter(e=>!e.assigned);return{staged:t.filter(e=>"staged"===e.source),unstaged:t.filter(e=>"unstaged"===e.source),unassigned:t.filter(e=>"commits"===e.source||"staged"!==e.source&&"unstaged"!==e.source)}}function rb(e){return[...new Set(e.map(e=>e.fileName))]}function rv(e,t){return rb(rg(e,t)).length}function ry(e){return e.reduce((e,t)=>({additions:e.additions+t.additions,deletions:e.deletions+t.deletions}),{additions:0,deletions:0})}ru.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,i=e.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var o=o2(this.sortable.el,this.startIndex,this.options);o?this.sortable.el.insertBefore(t,o):this.sortable.el.appendChild(t),this.sortable.animateAll(),i&&i.animateAll()},drop:rp},oD(ru,{pluginName:"revertOnSpill"}),rm.prototype={onSpill:function(e){var t=e.dragEl,i=e.putSortable||this.sortable;i.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),i.animateAll()},drop:rp},oD(rm,{pluginName:"removeOnSpill"}),s4.mount(new function(){function e(){for(var e in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===e.charAt(0)&&"function"==typeof this[e]&&(this[e]=this[e].bind(this))}return e.prototype={dragStarted:function(e){var t=e.originalEvent;this.sortable.nativeDraggable?oq(document,"dragover",this._handleAutoScroll):this.options.supportPointer?oq(document,"pointermove",this._handleFallbackAutoScroll):t.touches?oq(document,"touchmove",this._handleFallbackAutoScroll):oq(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(e){var t=e.originalEvent;this.options.dragOverBubble||t.rootEl||this._handleAutoScroll(t)},drop:function(){this.sortable.nativeDraggable?oU(document,"dragover",this._handleAutoScroll):(oU(document,"pointermove",this._handleFallbackAutoScroll),oU(document,"touchmove",this._handleFallbackAutoScroll),oU(document,"mousemove",this._handleFallbackAutoScroll)),rd(),rc(),clearTimeout(su),su=void 0},nulling:function(){rr=ri=rt=rl=rn=ro=rs=null,ra.length=0},_handleFallbackAutoScroll:function(e){this._handleAutoScroll(e,!0)},_handleAutoScroll:function(e,t){var i=this,o=(e.touches?e.touches[0]:e).clientX,s=(e.touches?e.touches[0]:e).clientY,r=document.elementFromPoint(o,s);if(rr=e,t||this.options.forceAutoScrollFallback||oz||oO||oH){rh(e,this.options,r,t);var a=o6(r,!0);rl&&(!rn||o!==ro||s!==rs)&&(rn&&rd(),rn=setInterval(function(){var r=o6(document.elementFromPoint(o,s),!0);r!==a&&(a=r,rc()),rh(e,i.options,r,t)},10),ro=o,rs=s)}else{if(!this.options.bubbleScroll||o6(r,!0)===oQ())return void rc();rh(e,this.options,o6(r,!1),!1)}}},oD(e,{pluginName:"scroll",initializeByDefault:!0})}),s4.mount(rm,ru);let rw=S`
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;S`
	.sr-only,
	.sr-only-focusable:not(:active, :focus-visible, :focus-within) {
		${rw}
	}
`;let rk=S`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: -1px;
`,rx=S`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: 2px;
`,rC=S`
	:focus-visible {
		${rk}
	}
`,r_=S`
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
`,rS=S`
	* {
		box-sizing: border-box;
	}
`;S`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}

	a:focus {
		${rk}
	}

	a:hover {
		text-decoration: underline;
	}
`;let r$=S`
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
`,rE=S`
	.inline-code {
		padding: 0 var(--gl-space-4) var(--gl-space-2);
		font-family: var(--vscode-editor-font-family);
		background: var(--vscode-textCodeBlock-background);
		border-radius: var(--gl-radius-sm);
	}
`;S`
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
`,S`
	:host {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		overflow: hidden;
	}
`,S`
	:host {
		--gl-metadata-bar-bg: color-mix(in srgb, var(--color-background) 95%, var(--color-foreground) 5%);
		--gl-metadata-bar-border: var(--vscode-sideBarSectionHeader-border, var(--color-foreground--25));
		--gl-metadata-bar-min-height: 2.94rem;
	}
`;let rI={},rA;function rT(e={}){rI={animate:!0,allowClose:!0,overlayClickBehavior:"close",overlayOpacity:.7,smoothScroll:!1,disableActiveInteraction:!1,showProgress:!1,stagePadding:10,stageRadius:5,popoverOffset:10,showButtons:["next","previous","close"],disableButtons:[],overlayColor:"#000",...e}}function rD(e){return e?rI[e]:rI}let rR={};function rP(e){var t;null==(t=rR[e])||t.call(rR)}function rL(e,t,i,o){return(e/=o/2)<1?i/2*e*e+t:-i/2*(--e*(e-2)-1)+t}function rM(e){let t='a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';return e.flatMap(e=>{let i=e.matches(t),o=Array.from(e.querySelectorAll(t));return[...i?[e]:[],...o]}).filter(e=>{var t;return"none"!==getComputedStyle(e).pointerEvents&&!!((t=e).offsetWidth||t.offsetHeight||t.getClientRects().length)})}function rO(e){let t;if(!e||(t=e.getBoundingClientRect()).top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth))return;let i=rD("smoothScroll"),o=e.offsetHeight>window.innerHeight;e.scrollIntoView({behavior:!i||function(e){if(!e||!e.parentElement)return;let t=e.parentElement;return t.scrollHeight>t.clientHeight}(e)?"auto":"smooth",inline:"center",block:o?"start":"center"})}let rz={};function rN(e){return e?rz[e]:rz}function rH(e){if(!e)return;let t=e.getBoundingClientRect(),i={x:t.x,y:t.y,width:t.width,height:t.height};rz.__activeStagePosition=i,rB(i)}function rB(e){let t=rN("__overlaySvg");if(!t){var i;let t,o,s,r;return void(i=e,t=window.innerWidth,o=window.innerHeight,(s=document.createElementNS("http://www.w3.org/2000/svg","svg")).classList.add("driver-overlay","driver-overlay-animated"),s.setAttribute("viewBox",`0 0 ${t} ${o}`),s.setAttribute("xmlSpace","preserve"),s.setAttribute("xmlnsXlink","http://www.w3.org/1999/xlink"),s.setAttribute("version","1.1"),s.setAttribute("preserveAspectRatio","xMinYMin slice"),s.style.fillRule="evenodd",s.style.clipRule="evenodd",s.style.strokeLinejoin="round",s.style.strokeMiterlimit="2",s.style.zIndex="10000",s.style.position="fixed",s.style.top="0",s.style.left="0",s.style.width="100%",s.style.height="100%",(r=document.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",rj(i)),r.style.fill=rD("overlayColor")||"rgb(0,0,0)",r.style.opacity=`${rD("overlayOpacity")}`,r.style.pointerEvents="auto",r.style.cursor="auto",s.appendChild(r),document.body.appendChild(s),rG(s,e=>{"path"===e.target.tagName&&rP("overlayClick")}),rz.__overlaySvg=s)}let o=t.firstElementChild;if((null==o?void 0:o.tagName)!=="path")throw Error("no path element found in stage svg");o.setAttribute("d",rj(e))}function rj(e){let t=window.innerWidth,i=window.innerHeight,o=rD("stagePadding")||0,s=rD("stageRadius")||0,r=e.width+2*o,a=e.height+2*o,c=Math.floor(Math.max(Math.min(s,r/2,a/2),0)),h=e.x-o+c,p=e.y-o,u=r-2*c,m=a-2*c;return`M${t},0L0,0L0,${i}L${t},${i}L${t},0Z
    M${h},${p} h${u} a${c},${c} 0 0 1 ${c},${c} v${m} a${c},${c} 0 0 1 -${c},${c} h-${u} a${c},${c} 0 0 1 -${c},-${c} v-${m} a${c},${c} 0 0 1 ${c},-${c} z`}function rF(e){let{element:t}=e,i="function"==typeof t?t():"string"==typeof t?document.querySelector(t):t;i||(i=function(){let e=document.getElementById("driver-dummy-element");if(e)return e;let t=document.createElement("div");return t.id="driver-dummy-element",t.style.width="0",t.style.height="0",t.style.pointerEvents="none",t.style.opacity="0",t.style.position="fixed",t.style.top="50%",t.style.left="50%",document.body.appendChild(t),t}()),function(e,t){var i;let o,s=Date.now(),r=rN("__activeStep"),a=rN("__activeElement")||e,c=!a||a===e,h="driver-dummy-element"===e.id,p="driver-dummy-element"===a.id,u=rD("animate"),m=t.onHighlightStarted||rD("onHighlightStarted"),g=(null==t?void 0:t.onHighlighted)||rD("onHighlighted"),f=(null==r?void 0:r.onDeselected)||rD("onDeselected"),b=rD(),v=rN();!c&&f&&f(p?void 0:a,r,{config:b,state:v,driver:rA}),m&&m(h?void 0:e,t,{config:b,state:v,driver:rA});let w=!c&&u,x=!1;(o=rN("popover"))&&(o.wrapper.style.display="none"),rz.previousStep=r,rz.previousElement=a,rz.activeStep=t,rz.activeElement=e;let C=()=>{var i;let o,c,p,u,m;if(rN("__transitionCallback")!==C)return;let f=Date.now()-s,b=400-f<=200;t.popover&&b&&!x&&w&&(rY(e,t),x=!0),rD("animate")&&f<400?(c=(o=rN("__activeStagePosition"))||a.getBoundingClientRect(),p=e.getBoundingClientRect(),u=rL(f,c.x,p.x-c.x,400),m=rL(f,c.y,p.y-c.y,400),rB(o={x:u,y:m,width:rL(f,c.width,p.width-c.width,400),height:rL(f,c.height,p.height-c.height,400)}),i=o,rz.__activeStagePosition=i):(rH(e),g&&g(h?void 0:e,t,{config:rD(),state:rN(),driver:rA}),rz.__transitionCallback=void 0,rz.__previousStep=r,rz.__previousElement=a,rz.__activeStep=t,rz.__activeElement=e),window.requestAnimationFrame(C)};rz.__transitionCallback=C,window.requestAnimationFrame(C),rO(e),!w&&t.popover&&rY(e,t),a.classList.remove("driver-active-element","driver-no-interaction"),a.removeAttribute("aria-haspopup"),a.removeAttribute("aria-expanded"),a.removeAttribute("aria-controls"),(null!=(i=t.disableActiveInteraction)?i:rD("disableActiveInteraction"))&&e.classList.add("driver-no-interaction"),e.classList.add("driver-active-element"),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","true"),e.setAttribute("aria-controls","driver-popover-content")}(i,e)}function rq(){let e=rN("__activeElement"),t=rN("__activeStep");e&&(rH(e),function(){let e=rN("__activeStagePosition"),t=rN("__overlaySvg");if(!e||!t)return;let i=window.innerWidth,o=window.innerHeight;t.setAttribute("viewBox",`0 0 ${i} ${o}`)}(),rJ(e,t))}function rU(){var e;let t=rN("__resizeTimeout");t&&window.cancelAnimationFrame(t),e=window.requestAnimationFrame(rq),rz.__resizeTimeout=e}function rW(e){var t;if(!rN("isInitialized")||"Tab"!==e.key&&9!==e.keyCode)return;let i=rN("__activeElement"),o=null==(t=rN("popover"))?void 0:t.wrapper,s=rM([...o?[o]:[],...i?[i]:[]]),r=s[0],a=s[s.length-1];if(e.preventDefault(),e.shiftKey){let e=s[s.indexOf(document.activeElement)-1]||a;null==e||e.focus()}else{let e=s[s.indexOf(document.activeElement)+1]||r;null==e||e.focus()}}function rV(e){var t;(null==(t=rD("allowKeyboardControl"))||t)&&("Escape"===e.key?rP("escapePress"):"ArrowRight"===e.key?rP("arrowRightPress"):"ArrowLeft"===e.key&&rP("arrowLeftPress"))}function rG(e,t,i){let o=(t,o)=>{let s=t.target;e.contains(s)&&((!i||i(s))&&(t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()),null==o||o(t))};document.addEventListener("pointerdown",o,!0),document.addEventListener("mousedown",o,!0),document.addEventListener("pointerup",o,!0),document.addEventListener("mouseup",o,!0),document.addEventListener("click",e=>{o(e,t)},!0)}function rY(e,t){var i,o,s;let r,a,c,h,p,u,m,g,f,b,v=rN("popover");v&&document.body.removeChild(v.wrapper),(r=document.createElement("div")).classList.add("driver-popover"),(a=document.createElement("div")).classList.add("driver-popover-arrow"),(c=document.createElement("header")).id="driver-popover-title",c.classList.add("driver-popover-title"),c.style.display="none",c.innerText="Popover Title",(h=document.createElement("div")).id="driver-popover-description",h.classList.add("driver-popover-description"),h.style.display="none",h.innerText="Popover description is here",(p=document.createElement("button")).type="button",p.classList.add("driver-popover-close-btn"),p.setAttribute("aria-label","Close"),p.innerHTML="&times;",(u=document.createElement("footer")).classList.add("driver-popover-footer"),(m=document.createElement("span")).classList.add("driver-popover-progress-text"),m.innerText="",(g=document.createElement("span")).classList.add("driver-popover-navigation-btns"),(f=document.createElement("button")).type="button",f.classList.add("driver-popover-prev-btn"),f.innerHTML="&larr; Previous",(b=document.createElement("button")).type="button",b.classList.add("driver-popover-next-btn"),b.innerHTML="Next &rarr;",g.appendChild(f),g.appendChild(b),u.appendChild(m),u.appendChild(g),r.appendChild(p),r.appendChild(a),r.appendChild(c),r.appendChild(h),r.appendChild(u),v={wrapper:r,arrow:a,title:c,description:h,footer:u,previousButton:f,nextButton:b,closeButton:p,footerButtons:g,progress:m},document.body.appendChild(v.wrapper);let{title:w,description:x,showButtons:C,disableButtons:_,showProgress:S,nextBtnText:$=rD("nextBtnText")||"Next &rarr;",prevBtnText:E=rD("prevBtnText")||"&larr; Previous",progressText:A=rD("progressText")||"{current} of {total}"}=t.popover||{};v.nextButton.innerHTML=$,v.previousButton.innerHTML=E,v.progress.innerHTML=A,w?(v.title.innerHTML=w,v.title.style.display="block"):v.title.style.display="none",x?(v.description.innerHTML=x,v.description.style.display="block"):v.description.style.display="none";let T=C||rD("showButtons"),D=S||rD("showProgress")||!1,P=(null==T?void 0:T.includes("next"))||(null==T?void 0:T.includes("previous"))||D;v.closeButton.style.display=T.includes("close")?"block":"none",P?(v.footer.style.display="flex",v.progress.style.display=D?"block":"none",v.nextButton.style.display=T.includes("next")?"block":"none",v.previousButton.style.display=T.includes("previous")?"block":"none"):v.footer.style.display="none";let M=_||rD("disableButtons")||[];null!=M&&M.includes("next")&&(v.nextButton.disabled=!0,v.nextButton.classList.add("driver-popover-btn-disabled")),null!=M&&M.includes("previous")&&(v.previousButton.disabled=!0,v.previousButton.classList.add("driver-popover-btn-disabled")),null!=M&&M.includes("close")&&(v.closeButton.disabled=!0,v.closeButton.classList.add("driver-popover-btn-disabled"));let O=v.wrapper;O.style.display="block",O.style.left="",O.style.top="",O.style.bottom="",O.style.right="",O.id="driver-popover-content",O.setAttribute("role","dialog"),O.setAttribute("aria-labelledby","driver-popover-title"),O.setAttribute("aria-describedby","driver-popover-description"),v.arrow.className="driver-popover-arrow";let N=(null==(i=t.popover)?void 0:i.popoverClass)||rD("popoverClass")||"";O.className=`driver-popover ${N}`.trim(),rG(v.wrapper,i=>{var o,s,r;let a=i.target,c=(null==(o=t.popover)?void 0:o.onNextClick)||rD("onNextClick"),h=(null==(s=t.popover)?void 0:s.onPrevClick)||rD("onPrevClick"),p=(null==(r=t.popover)?void 0:r.onCloseClick)||rD("onCloseClick");return a.closest(".driver-popover-next-btn")?c?c(e,t,{config:rD(),state:rN(),driver:rA}):rP("nextClick"):a.closest(".driver-popover-prev-btn")?h?h(e,t,{config:rD(),state:rN(),driver:rA}):rP("prevClick"):a.closest(".driver-popover-close-btn")?p?p(e,t,{config:rD(),state:rN(),driver:rA}):rP("closeClick"):void 0},e=>!(null!=v&&v.description.contains(e))&&!(null!=v&&v.title.contains(e))&&"string"==typeof e.className&&e.className.includes("driver-popover")),s=v,rz.popover=s;let B=(null==(o=t.popover)?void 0:o.onPopoverRender)||rD("onPopoverRender");B&&B(v,{config:rD(),state:rN(),driver:rA}),rJ(e,t),rO(O);let j=rM([O,...e.classList.contains("driver-dummy-element")?[]:[e]]);j.length>0&&j[0].focus()}function rZ(){let e=rN("popover");if(!(null!=e&&e.wrapper))return;let t=e.wrapper.getBoundingClientRect(),i=rD("stagePadding")||0,o=rD("popoverOffset")||0;return{width:t.width+i+o,height:t.height+i+o,realWidth:t.width,realHeight:t.height}}function rX(e,t){let{elementDimensions:i,popoverDimensions:o,popoverPadding:s,popoverArrowDimensions:r}=t;return"start"===e?Math.max(Math.min(i.top-s,window.innerHeight-o.realHeight-r.width),r.width):"end"===e?Math.max(Math.min(i.top-(null==o?void 0:o.realHeight)+i.height+s,window.innerHeight-(null==o?void 0:o.realHeight)-r.width),r.width):"center"===e?Math.max(Math.min(i.top+i.height/2-(null==o?void 0:o.realHeight)/2,window.innerHeight-(null==o?void 0:o.realHeight)-r.width),r.width):0}function rK(e,t){let{elementDimensions:i,popoverDimensions:o,popoverPadding:s,popoverArrowDimensions:r}=t;return"start"===e?Math.max(Math.min(i.left-s,window.innerWidth-o.realWidth-r.width),r.width):"end"===e?Math.max(Math.min(i.left-(null==o?void 0:o.realWidth)+i.width+s,window.innerWidth-(null==o?void 0:o.realWidth)-r.width),r.width):"center"===e?Math.max(Math.min(i.left+i.width/2-(null==o?void 0:o.realWidth)/2,window.innerWidth-(null==o?void 0:o.realWidth)-r.width),r.width):0}function rJ(e,t){let i=rN("popover");if(!i)return;let{align:o="start",side:s="left"}=(null==t?void 0:t.popover)||{},r="driver-dummy-element"===e.id?"over":s,a=rD("stagePadding")||0,c=rZ(),h=i.arrow.getBoundingClientRect(),p=e.getBoundingClientRect(),u=p.top-c.height,m=u>=0,g=window.innerHeight-(p.bottom+c.height),f=g>=0,b=p.left-c.width,v=b>=0,w=window.innerWidth-(p.right+c.width),x=w>=0,C=!m&&!f&&!v&&!x,_=r;if("top"===r&&m?x=v=f=!1:"bottom"===r&&f?x=v=m=!1:"left"===r&&v?x=m=f=!1:"right"===r&&x&&(v=m=f=!1),"over"===r){let e=window.innerWidth/2-c.realWidth/2,t=window.innerHeight/2-c.realHeight/2;i.wrapper.style.left=`${e}px`,i.wrapper.style.right="auto",i.wrapper.style.top=`${t}px`,i.wrapper.style.bottom="auto"}else if(C){let e=window.innerWidth/2-(null==c?void 0:c.realWidth)/2;i.wrapper.style.left=`${e}px`,i.wrapper.style.right="auto",i.wrapper.style.bottom="10px",i.wrapper.style.top="auto"}else if(v){let e=Math.min(b,window.innerWidth-(null==c?void 0:c.realWidth)-h.width),t=rX(o,{elementDimensions:p,popoverDimensions:c,popoverPadding:a,popoverArrowDimensions:h});i.wrapper.style.left=`${e}px`,i.wrapper.style.top=`${t}px`,i.wrapper.style.bottom="auto",i.wrapper.style.right="auto",_="left"}else if(x){let e=Math.min(w,window.innerWidth-(null==c?void 0:c.realWidth)-h.width),t=rX(o,{elementDimensions:p,popoverDimensions:c,popoverPadding:a,popoverArrowDimensions:h});i.wrapper.style.right=`${e}px`,i.wrapper.style.top=`${t}px`,i.wrapper.style.bottom="auto",i.wrapper.style.left="auto",_="right"}else if(m){let e=Math.min(u,window.innerHeight-c.realHeight-h.width),t=rK(o,{elementDimensions:p,popoverDimensions:c,popoverPadding:a,popoverArrowDimensions:h});i.wrapper.style.top=`${e}px`,i.wrapper.style.left=`${t}px`,i.wrapper.style.bottom="auto",i.wrapper.style.right="auto",_="top"}else if(f){let e=Math.min(g,window.innerHeight-(null==c?void 0:c.realHeight)-h.width),t=rK(o,{elementDimensions:p,popoverDimensions:c,popoverPadding:a,popoverArrowDimensions:h});i.wrapper.style.left=`${t}px`,i.wrapper.style.bottom=`${e}px`,i.wrapper.style.top="auto",i.wrapper.style.right="auto",_="bottom"}C?i.arrow.classList.add("driver-popover-arrow-none"):function(e,t,i){let o=rN("popover");if(!o)return;let s=i.getBoundingClientRect(),r=rZ(),a=o.arrow,c=r.width,h=window.innerWidth,p=s.width,u=s.left,m=r.height,g=window.innerHeight,f=s.top,b=s.height;a.className="driver-popover-arrow";let v=t,w=e;if("top"===t?(u+p<=0?(v="right",w="end"):u+p-c<=0&&(v="top",w="start"),u>=h?(v="left",w="end"):u+c>=h&&(v="top",w="end")):"bottom"===t?(u+p<=0?(v="right",w="start"):u+p-c<=0&&(v="bottom",w="start"),u>=h?(v="left",w="start"):u+c>=h&&(v="bottom",w="end")):"left"===t?(f+b<=0?(v="bottom",w="end"):f+b-m<=0&&(v="left",w="start"),f>=g?(v="top",w="end"):f+m>=g&&(v="left",w="end")):"right"===t&&(f+b<=0?(v="bottom",w="start"):f+b-m<=0&&(v="right",w="start"),f>=g?(v="top",w="start"):f+m>=g&&(v="right",w="end")),v){a.classList.add(`driver-popover-arrow-side-${v}`),a.classList.add(`driver-popover-arrow-align-${w}`);let e=i.getBoundingClientRect(),s=a.getBoundingClientRect(),r=rD("stagePadding")||0,c=e.left-r<window.innerWidth&&e.right+r>0&&e.top-r<window.innerHeight&&e.bottom+r>0;"bottom"===t&&c&&(s.x>e.x&&s.x+s.width<e.x+e.width?o.wrapper.style.transform="translateY(0)":(a.classList.remove(`driver-popover-arrow-align-${w}`),a.classList.add("driver-popover-arrow-none"),o.wrapper.style.transform=`translateY(-${r/2}px)`))}else a.classList.add("driver-popover-arrow-none")}(o,_,e)}let rQ=S`
	border: var(--gl-border-width) solid var(--gl-elevation-border-color, var(--vscode-contrastBorder));
	box-shadow: var(--gl-elevation);
`;let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=eb,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===eb||null==e)return this._t=void 0,this.it=e;if(e===ef)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let r0=e8(unsafe_html_e);var r1=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},r2=S`
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
`,r3=Object.defineProperty,r5=Object.getOwnPropertyDescriptor,r4=e=>{throw TypeError(e)},r6=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?r5(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&r3(t,i,r),r},r8=(e,t,i)=>t.has(e)||r4("Cannot "+i),r7=S`
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
`,r9=/;\s+$/;function ne(e){let{property:t,value:i,element:o}=e;if(i){let e=o.getAttribute("style")||"";e&&(e.match(r9)||(e+=";"),e+=" ");let s=`${t}: ${i}`;if(e.includes(s))return;return`${e}${s};`}return null}var nt=class extends lit_element_i{constructor(){let e;super(),(e=p).has(this)?r4("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(this):e.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,t)=>{if(this.internals?.states)try{t?this.internals.states.add(e):this.internals.states.delete(e)}catch(e){if(String(e).includes("must start with '--'"));else throw e}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{}for(let[e,t]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===t.default&&void 0!==t.initial&&"string"==typeof e&&this.customStates.set(`initial-${e}-${t.initial}`,!0)}static get styles(){return[r7,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))})}attributeChangedCallback(e,t,i){let o,s;if(r8(this,o=p,"read from private field"),s?!s.call(this):!o.get(this)){let e,t;this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),r8(this,e=p,"write to private field"),t?t.call(this,!0):e.set(this,!0)}super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&null==this[i]&&(this[i]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(e){if(this.didSSR&&!this.hasUpdated){let t=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});t.error=e,this.dispatchEvent(t)}throw e}}setStyle(e,t){if(!this.style){let i=ne({property:e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),value:t,element:this});i&&this.setAttribute("style",i);return}this.style[e]=t}setStyleProperty(e,t){if(!this.style){let i=ne({property:e,value:t,element:this});i&&this.setAttribute("style",i);return}this.style.setProperty(e,t)}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};p=new WeakMap,r6([eI()],nt.prototype,"dir",2),r6([eI()],nt.prototype,"lang",2),r6([eI({type:Boolean,reflect:!0,attribute:"did-ssr"})],nt.prototype,"didSSR",2);let ni=new Set,no=new Map,ns="ltr",nr="en",nn="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(nn){let e=new MutationObserver(nl);ns=document.documentElement.dir||"ltr",nr=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function na(...e){e.map(e=>{let t=e.$code.toLowerCase();no.has(t)?no.set(t,Object.assign(Object.assign({},no.get(t)),e)):no.set(t,e),o||(o=e)}),nl()}function nl(){nn&&(ns=document.documentElement.dir||"ltr",nr=document.documentElement.lang||navigator.language),[...ni.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){ni.add(this.host)}hostDisconnected(){ni.delete(this.host)}dir(){return`${this.host.dir||ns}`.toLowerCase()}lang(){return`${this.host.lang||nr}`.toLowerCase()}getTranslationData(e){var t,i;let o;try{o=new Intl.Locale(e.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let s=o.language.toLowerCase(),r=null!=(i=null==(t=o.region)?void 0:t.toLowerCase())?i:"",a=no.get(`${s}-${r}`),c=no.get(s);return{locale:o,language:s,region:r,primary:a,secondary:c}}exists(e,t){var i;let{primary:s,secondary:r}=this.getTranslationData(null!=(i=t.lang)?i:this.lang());return t=Object.assign({includeFallback:!1},t),!!s&&!!s[e]||!!r&&!!r[e]||!!t.includeFallback&&!!o&&!!o[e]}term(e,...t){let i,{primary:s,secondary:r}=this.getTranslationData(this.lang());if(s&&s[e])i=s[e];else if(r&&r[e])i=r[e];else{if(!o||!o[e])return String(e);i=o[e]}return"function"==typeof i?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}};var nc={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",captions:"Captions",chooseDate:"Choose date",chooseDecade:"Choose decade",chooseMonth:"Choose month",chooseYear:"Choose year",clearEntry:"Clear entry",close:"Close",closeCalendar:"Close calendar",createOption:e=>`Create "${e}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",date:"Date",datePickerKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",day:"Day",incompleteDate:"Enter a valid date.",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",empty:"Empty",endDate:"End date",error:"Error",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",month:"Month",moreOptions:"More Options",mute:"Mute",nextDecade:"Next decade",nextMonth:"Next month",nextSlide:"Next slide",nextVideo:"Next Video",nextYear:"Next year",numCharacters:e=>1===e?"1 character":`${e} characters`,numCharactersRemaining:e=>1===e?"1 character remaining":`${e} characters remaining`,numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",play:"Play",playbackSpeed:"Playback speed",playlist:"Playlist",playAnimation:"Play animation",previousDecade:"Previous decade",previousMonth:"Previous month",previousSlide:"Previous slide",previousVideo:"Previous video",previousYear:"Previous year",progress:"Progress",rangeTooLong:e=>1===e?"Select a range no longer than 1 day":`Select a range no longer than ${e} days`,rangeTooShort:e=>1===e?"Select a range at least 1 day long":`Select a range at least ${e} days long`,readonly:"Read-only",selected:"Selected",selectedDateLabel:e=>`Selected: ${e}`,selectedRangeLabel:e=>`Selected range: ${e}`,selectionCleared:"Selection cleared",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,startDate:"Start date",today:"Today",toggleColorFormat:"Toggle color format",seek:"Seek",seekProgress:(e,t)=>`${e} of ${t}`,currentlyPlaying:"currently playing",unmute:"Unmute",videoPlayer:"Video player",volume:"Volume",year:"Year",zoomIn:"Zoom in",zoomOut:"Zoom out",am:"AM",chooseTime:"Choose time",closeTimeInput:"Close time picker",dayPeriod:"AM/PM",hour:"Hour",minute:"Minute",now:"Now",pm:"PM",second:"Second",time:"Time",timeInputKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the time picker."};na(nc);var nd=class extends LocalizeController{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||"en":super.lang()}};na(nc);let nh=Math.min,np=Math.max,nu=Math.round,nm=Math.floor,ng=e=>({x:e,y:e}),nf={left:"right",right:"left",bottom:"top",top:"bottom"};function nb(e,t){return"function"==typeof e?e(t):e}function nv(e){return e.split("-")[0]}function ny(e){return e.split("-")[1]}function nw(e){return"x"===e?"y":"x"}function nk(e){return"y"===e?"height":"width"}function nx(e){let t=e[0];return"t"===t||"b"===t?"y":"x"}function nC(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}let n_=["left","right"],nS=["right","left"],n$=["top","bottom"],nE=["bottom","top"];function nI(e){let t=nv(e);return nf[t]+e.slice(t.length)}function nA(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function nT(e){let{x:t,y:i,width:o,height:s}=e;return{width:o,height:s,top:i,left:t,right:t+o,bottom:i+s,x:t,y:i}}function nD(e,t,i){let o,{reference:s,floating:r}=e,a=nx(t),c=nw(nx(t)),h=nk(c),p=nv(t),u="y"===a,m=s.x+s.width/2-r.width/2,g=s.y+s.height/2-r.height/2,f=s[h]/2-r[h]/2;switch(p){case"top":o={x:m,y:s.y-r.height};break;case"bottom":o={x:m,y:s.y+s.height};break;case"right":o={x:s.x+s.width,y:g};break;case"left":o={x:s.x-r.width,y:g};break;default:o={x:s.x,y:s.y}}switch(ny(t)){case"start":o[c]-=f*(i&&u?-1:1);break;case"end":o[c]+=f*(i&&u?-1:1)}return o}async function nR(e,t){var i;void 0===t&&(t={});let{x:o,y:s,platform:r,rects:a,elements:c,strategy:h}=e,{boundary:p="clippingAncestors",rootBoundary:u="viewport",elementContext:m="floating",altBoundary:g=!1,padding:f=0}=nb(t,e),b=nA(f),v=c[g?"floating"===m?"reference":"floating":m],w=nT(await r.getClippingRect({element:null==(i=await (null==r.isElement?void 0:r.isElement(v)))||i?v:v.contextElement||await (null==r.getDocumentElement?void 0:r.getDocumentElement(c.floating)),boundary:p,rootBoundary:u,strategy:h})),x="floating"===m?{x:o,y:s,width:a.floating.width,height:a.floating.height}:a.reference,C=await (null==r.getOffsetParent?void 0:r.getOffsetParent(c.floating)),_=await (null==r.isElement?void 0:r.isElement(C))&&await (null==r.getScale?void 0:r.getScale(C))||{x:1,y:1},S=nT(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:C,strategy:h}):x);return{top:(w.top-S.top+b.top)/_.y,bottom:(S.bottom-w.bottom+b.bottom)/_.y,left:(w.left-S.left+b.left)/_.x,right:(S.right-w.right+b.right)/_.x}}let nP=async(e,t,i)=>{let{placement:o="bottom",strategy:s="absolute",middleware:r=[],platform:a}=i,c=a.detectOverflow?a:{...a,detectOverflow:nR},h=await (null==a.isRTL?void 0:a.isRTL(t)),p=await a.getElementRects({reference:e,floating:t,strategy:s}),{x:u,y:m}=nD(p,o,h),g=o,f=0,b={};for(let i=0;i<r.length;i++){let v=r[i];if(!v)continue;let{name:w,fn:x}=v,{x:C,y:_,data:S,reset:$}=await x({x:u,y:m,initialPlacement:o,placement:g,strategy:s,middlewareData:b,rects:p,platform:c,elements:{reference:e,floating:t}});u=null!=C?C:u,m=null!=_?_:m,b[w]={...b[w],...S},$&&f<50&&(f++,"object"==typeof $&&($.placement&&(g=$.placement),$.rects&&(p=!0===$.rects?await a.getElementRects({reference:e,floating:t,strategy:s}):$.rects),{x:u,y:m}=nD(p,g,h)),i=-1)}return{x:u,y:m,placement:g,strategy:s,middlewareData:b}},nL=new Set(["left","top"]);async function nM(e,t){let{placement:i,platform:o,elements:s}=e,r=await (null==o.isRTL?void 0:o.isRTL(s.floating)),a=nv(i),c=ny(i),h="y"===nx(i),p=nL.has(a)?-1:1,u=r&&h?-1:1,m=nb(t,e),{mainAxis:g,crossAxis:f,alignmentAxis:b}="number"==typeof m?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:m.mainAxis||0,crossAxis:m.crossAxis||0,alignmentAxis:m.alignmentAxis};return c&&"number"==typeof b&&(f="end"===c?-1*b:b),h?{x:f*u,y:g*p}:{x:g*p,y:f*u}}function nO(){return"u">typeof window}function nz(e){return nB(e)?(e.nodeName||"").toLowerCase():"#document"}function nN(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function nH(e){var t;return null==(t=(nB(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function nB(e){return!!nO()&&(e instanceof Node||e instanceof nN(e).Node)}function nj(e){return!!nO()&&(e instanceof Element||e instanceof nN(e).Element)}function nF(e){return!!nO()&&(e instanceof HTMLElement||e instanceof nN(e).HTMLElement)}function nq(e){return!(!nO()||"u"<typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof nN(e).ShadowRoot)}function nU(e){let{overflow:t,overflowX:i,overflowY:o,display:s}=nJ(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+i)&&"inline"!==s&&"contents"!==s}function nW(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}let nV=/transform|translate|scale|rotate|perspective|filter/,nG=/paint|layout|strict|content/,nY=e=>!!e&&"none"!==e;function nZ(e){let t=nj(e)?nJ(e):e;return nY(t.transform)||nY(t.translate)||nY(t.scale)||nY(t.rotate)||nY(t.perspective)||!nX()&&(nY(t.backdropFilter)||nY(t.filter))||nV.test(t.willChange||"")||nG.test(t.contain||"")}function nX(){return null==s&&(s="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),s}function nK(e){return/^(html|body|#document)$/.test(nz(e))}function nJ(e){return nN(e).getComputedStyle(e)}function nQ(e){return nj(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function n0(e){if("html"===nz(e))return e;let t=e.assignedSlot||e.parentNode||nq(e)&&e.host||nH(e);return nq(t)?t.host:t}function n1(e,t,i){var o;void 0===t&&(t=[]),void 0===i&&(i=!0);let s=function e(t){let i=n0(t);return nK(i)?t.ownerDocument?t.ownerDocument.body:t.body:nF(i)&&nU(i)?i:e(i)}(e),r=s===(null==(o=e.ownerDocument)?void 0:o.body),a=nN(s);if(!r)return t.concat(s,n1(s,[],i));{let e=n2(a);return t.concat(a,a.visualViewport||[],nU(s)?s:[],e&&i?n1(e):[])}}function n2(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function n3(e){let t=nJ(e),i=parseFloat(t.width)||0,o=parseFloat(t.height)||0,s=nF(e),r=s?e.offsetWidth:i,a=s?e.offsetHeight:o,c=nu(i)!==r||nu(o)!==a;return c&&(i=r,o=a),{width:i,height:o,$:c}}function n5(e){return nj(e)?e:e.contextElement}function n4(e){let t=n5(e);if(!nF(t))return ng(1);let i=t.getBoundingClientRect(),{width:o,height:s,$:r}=n3(t),a=(r?nu(i.width):i.width)/o,c=(r?nu(i.height):i.height)/s;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}let n6=ng(0);function n8(e){let t=nN(e);return nX()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:n6}function n7(e,t,i,o){var s;void 0===t&&(t=!1),void 0===i&&(i=!1);let r=e.getBoundingClientRect(),a=n5(e),c=ng(1);t&&(o?nj(o)&&(c=n4(o)):c=n4(e));let h=(void 0===(s=i)&&(s=!1),o&&(!s||o===nN(a))&&s)?n8(a):ng(0),p=(r.left+h.x)/c.x,u=(r.top+h.y)/c.y,m=r.width/c.x,g=r.height/c.y;if(a){let e=nN(a),t=o&&nj(o)?nN(o):o,i=e,s=n2(i);for(;s&&o&&t!==i;){let e=n4(s),t=s.getBoundingClientRect(),o=nJ(s),r=t.left+(s.clientLeft+parseFloat(o.paddingLeft))*e.x,a=t.top+(s.clientTop+parseFloat(o.paddingTop))*e.y;p*=e.x,u*=e.y,m*=e.x,g*=e.y,p+=r,u+=a,s=n2(i=nN(s))}}return nT({width:m,height:g,x:p,y:u})}function n9(e,t){let i=nQ(e).scrollLeft;return t?t.left+i:n7(nH(e)).left+i}function ae(e,t){let i=e.getBoundingClientRect();return{x:i.left+t.scrollLeft-n9(e,i),y:i.top+t.scrollTop}}function at(e,t,i){var o;let s;if("viewport"===t)s=function(e,t){let i=nN(e),o=nH(e),s=i.visualViewport,r=o.clientWidth,a=o.clientHeight,c=0,h=0;if(s){r=s.width,a=s.height;let e=nX();(!e||e&&"fixed"===t)&&(c=s.offsetLeft,h=s.offsetTop)}let p=n9(o);if(p<=0){let e=o.ownerDocument,t=e.body,i=getComputedStyle(t),s="CSS1Compat"===e.compatMode&&parseFloat(i.marginLeft)+parseFloat(i.marginRight)||0,a=Math.abs(o.clientWidth-t.clientWidth-s);a<=25&&(r-=a)}else p<=25&&(r+=p);return{width:r,height:a,x:c,y:h}}(e,i);else if("document"===t){let t,i,r,a,c,h,p;o=nH(e),t=nH(o),i=nQ(o),r=o.ownerDocument.body,a=np(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),c=np(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),h=-i.scrollLeft+n9(o),p=-i.scrollTop,"rtl"===nJ(r).direction&&(h+=np(t.clientWidth,r.clientWidth)-a),s={width:a,height:c,x:h,y:p}}else if(nj(t)){let e,o,r,a,c,h;o=(e=n7(t,!0,"fixed"===i)).top+t.clientTop,r=e.left+t.clientLeft,a=nF(t)?n4(t):ng(1),c=t.clientWidth*a.x,h=t.clientHeight*a.y,s={width:c,height:h,x:r*a.x,y:o*a.y}}else{let i=n8(e);s={x:t.x-i.x,y:t.y-i.y,width:t.width,height:t.height}}return nT(s)}function ai(e){return"static"===nJ(e).position}function ao(e,t){if(!nF(e)||"fixed"===nJ(e).position)return null;if(t)return t(e);let i=e.offsetParent;return nH(e)===i&&(i=i.ownerDocument.body),i}function as(e,t){var i;let o=nN(e);if(nW(e))return o;if(!nF(e)){let t=n0(e);for(;t&&!nK(t);){if(nj(t)&&!ai(t))return t;t=n0(t)}return o}let s=ao(e,t);for(;s&&(i=s,/^(table|td|th)$/.test(nz(i)))&&ai(s);)s=ao(s,t);return s&&nK(s)&&ai(s)&&!nZ(s)?o:s||function(e){let t=n0(e);for(;nF(t)&&!nK(t);){if(nZ(t))return t;if(nW(t))break;t=n0(t)}return null}(e)||o}let ar=async function(e){let t=this.getOffsetParent||as,i=this.getDimensions,o=await i(e.floating);return{reference:function(e,t,i){let o=nF(t),s=nH(t),r="fixed"===i,a=n7(e,!0,r,t),c={scrollLeft:0,scrollTop:0},h=ng(0);if(o||!o&&!r)if(("body"!==nz(t)||nU(s))&&(c=nQ(t)),o){let e=n7(t,!0,r,t);h.x=e.x+t.clientLeft,h.y=e.y+t.clientTop}else s&&(h.x=n9(s));r&&!o&&s&&(h.x=n9(s));let p=!s||o||r?ng(0):ae(s,c);return{x:a.left+c.scrollLeft-h.x-p.x,y:a.top+c.scrollTop-h.y-p.y,width:a.width,height:a.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},an={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:i,offsetParent:o,strategy:s}=e,r="fixed"===s,a=nH(o),c=!!t&&nW(t.floating);if(o===a||c&&r)return i;let h={scrollLeft:0,scrollTop:0},p=ng(1),u=ng(0),m=nF(o);if((m||!m&&!r)&&(("body"!==nz(o)||nU(a))&&(h=nQ(o)),m)){let e=n7(o);p=n4(o),u.x=e.x+o.clientLeft,u.y=e.y+o.clientTop}let g=!a||m||r?ng(0):ae(a,h);return{width:i.width*p.x,height:i.height*p.y,x:i.x*p.x-h.scrollLeft*p.x+u.x+g.x,y:i.y*p.y-h.scrollTop*p.y+u.y+g.y}},getDocumentElement:nH,getClippingRect:function(e){let{element:t,boundary:i,rootBoundary:o,strategy:s}=e,r=[..."clippingAncestors"===i?nW(t)?[]:function(e,t){let i=t.get(e);if(i)return i;let o=n1(e,[],!1).filter(e=>nj(e)&&"body"!==nz(e)),s=null,r="fixed"===nJ(e).position,a=r?n0(e):e;for(;nj(a)&&!nK(a);){let t=nJ(a),i=nZ(a);i||"fixed"!==t.position||(s=null),(r?i||s:!(!i&&"static"===t.position&&s&&("absolute"===s.position||"fixed"===s.position)||nU(a)&&!i&&function e(t,i){let o=n0(t);return!(o===i||!nj(o)||nK(o))&&("fixed"===nJ(o).position||e(o,i))}(e,a)))?s=t:o=o.filter(e=>e!==a),a=n0(a)}return t.set(e,o),o}(t,this._c):[].concat(i),o],a=at(t,r[0],s),c=a.top,h=a.right,p=a.bottom,u=a.left;for(let e=1;e<r.length;e++){let i=at(t,r[e],s);c=np(i.top,c),h=nh(i.right,h),p=nh(i.bottom,p),u=np(i.left,u)}return{width:h-u,height:p-c,x:u,y:c}},getOffsetParent:as,getElementRects:ar,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:i}=n3(e);return{width:t,height:i}},getScale:n4,isElement:nj,isRTL:function(e){return"rtl"===nJ(e).direction}};function aa(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}let al=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var i,o;let s,r,{placement:a,rects:c,platform:h,elements:p}=t,{apply:u=()=>{},...m}=nb(e,t),g=await h.detectOverflow(t,m),f=nv(a),b=ny(a),v="y"===nx(a),{width:w,height:x}=c.floating;"top"===f||"bottom"===f?(s=f,r=b===(await (null==h.isRTL?void 0:h.isRTL(p.floating))?"start":"end")?"left":"right"):(r=f,s="end"===b?"top":"bottom");let C=x-g.top-g.bottom,_=w-g.left-g.right,S=nh(x-g[s],C),$=nh(w-g[r],_),E=!t.middlewareData.shift,A=S,T=$;if(null!=(i=t.middlewareData.shift)&&i.enabled.x&&(T=_),null!=(o=t.middlewareData.shift)&&o.enabled.y&&(A=C),E&&!b){let e=np(g.left,0),t=np(g.right,0),i=np(g.top,0),o=np(g.bottom,0);v?T=w-2*(0!==e||0!==t?e+t:np(g.left,g.right)):A=x-2*(0!==i||0!==o?i+o:np(g.top,g.bottom))}await u({...t,availableWidth:T,availableHeight:A});let D=await h.getDimensions(p.floating);return w!==D.width||x!==D.height?{reset:{rects:!0}}:{}}}};function ac(e){var t=e;for(let e=t;e;e=ad(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=ad(t);e;e=ad(e)){if(!(e instanceof Element))continue;let t=getComputedStyle(e);if("contents"!==t.display&&("static"!==t.position||nZ(t)||"BODY"===e.tagName))return e}return null}function ad(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}let ah=e8(class extends directive_i{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let i=e.element.classList;for(let e of this.st)e in t||(i.remove(e),this.st.delete(e));for(let e in t){let o=!!t[e];o===this.st.has(e)||this.nt?.has(e)||(o?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return ef}});function ap(e){return null!==e&&"object"==typeof e&&"getBoundingClientRect"in e&&(!("contextElement"in e)||e instanceof Element)}var au=!!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),am=class extends nt{constructor(){super(...arguments),this.localize=new nd(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),o=0,s=0,r=0,a=0,c=0,h=0,p=0,u=0;i?e.top<t.top?(o=e.left,s=e.bottom,r=e.right,a=e.bottom,c=t.left,h=t.top,p=t.right,u=t.top):(o=t.left,s=t.bottom,r=t.right,a=t.bottom,c=e.left,h=e.top,p=e.right,u=e.top):e.left<t.left?(o=e.right,s=e.top,r=t.left,a=t.top,c=e.right,h=e.bottom,p=t.left,u=t.bottom):(o=t.right,s=t.top,r=e.left,a=e.top,c=t.right,h=t.bottom,p=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=au,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||ap(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=function(e,t,i,o){let s;void 0===o&&(o={});let{ancestorScroll:r=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:p=!1}=o,u=n5(e),m=r||a?[...u?n1(u):[],...t?n1(t):[]]:[];m.forEach(e=>{r&&e.addEventListener("scroll",i,{passive:!0}),a&&e.addEventListener("resize",i)});let g=u&&h?function(e,t){let i,o=null,s=nH(e);function r(){var e;clearTimeout(i),null==(e=o)||e.disconnect(),o=null}return!function a(c,h){void 0===c&&(c=!1),void 0===h&&(h=1),r();let p=e.getBoundingClientRect(),{left:u,top:m,width:g,height:f}=p;if(c||t(),!g||!f)return;let b={rootMargin:-nm(m)+"px "+-nm(s.clientWidth-(u+g))+"px "+-nm(s.clientHeight-(m+f))+"px "+-nm(u)+"px",threshold:np(0,nh(1,h))||1},v=!0;function w(t){let o=t[0].intersectionRatio;if(o!==h){if(!v)return a();o?a(!1,o):i=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==o||aa(p,e.getBoundingClientRect())||a(),v=!1}try{o=new IntersectionObserver(w,{...b,root:s.ownerDocument})}catch{o=new IntersectionObserver(w,b)}o.observe(e)}(!0),r}(u,i):null,f=-1,b=null;c&&(b=new ResizeObserver(e=>{let[o]=e;o&&o.target===u&&b&&t&&(b.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;null==(e=b)||e.observe(t)})),i()}),u&&!p&&b.observe(u),t&&b.observe(t));let v=p?n7(e):null;return p&&function t(){let o=n7(e);v&&!aa(v,o)&&i(),v=o,s=requestAnimationFrame(t)}(),i(),()=>{var e;m.forEach(e=>{r&&e.removeEventListener("scroll",i),a&&e.removeEventListener("resize",i)}),null==g||g(),null==(e=b)||e.disconnect(),b=null,p&&cancelAnimationFrame(s)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){var e,t,i,o,s,r;let a,c,h,p,u;if(!this.active||!this.anchorEl||!this.popup)return;let m=[{name:"offset",options:e={mainAxis:this.distance,crossAxis:this.skidding},async fn(t){var i,o;let{x:s,y:r,placement:a,middlewareData:c}=t,h=await nM(t,e);return a===(null==(i=c.offset)?void 0:i.placement)&&null!=(o=c.arrow)&&o.alignmentOffset?{}:{x:s+h.x,y:r+h.y,data:{...h,placement:a}}}}];this.sync?m.push(al({apply:({rects:e})=>{let t="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.SUPPORTS_POPOVER&&!ap(this.anchor)&&"scroll"===this.boundary&&(a=n1(this.anchorEl).filter(e=>e instanceof Element)),this.flip&&m.push({name:"flip",options:t={boundary:this.flipBoundary||a,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(e){var i,o,s,r,a,c,h,p;let u,m,g,{placement:f,middlewareData:b,rects:v,initialPlacement:w,platform:x,elements:C}=e,{mainAxis:_=!0,crossAxis:S=!0,fallbackPlacements:$,fallbackStrategy:E="bestFit",fallbackAxisSideDirection:A="none",flipAlignment:T=!0,...D}=nb(t,e);if(null!=(i=b.arrow)&&i.alignmentOffset)return{};let P=nv(f),M=nx(w),O=nv(w)===w,N=await (null==x.isRTL?void 0:x.isRTL(C.floating)),B=$||(O||!T?[nI(w)]:(u=nI(w),[nC(w),u,nC(u)])),j="none"!==A;!$&&j&&B.push(...(m=ny(w),g=function(e,t,i){switch(e){case"top":case"bottom":if(i)return t?nS:n_;return t?n_:nS;case"left":case"right":return t?n$:nE;default:return[]}}(nv(w),"start"===A,N),m&&(g=g.map(e=>e+"-"+m),T&&(g=g.concat(g.map(nC)))),g));let F=[w,...B],q=await x.detectOverflow(e,D),U=[],W=(null==(o=b.flip)?void 0:o.overflows)||[];if(_&&U.push(q[P]),S){let e,t,i,o,s=(c=f,h=v,void 0===(p=N)&&(p=!1),e=ny(c),i=nk(t=nw(nx(c))),o="x"===t?e===(p?"end":"start")?"right":"left":"start"===e?"bottom":"top",h.reference[i]>h.floating[i]&&(o=nI(o)),[o,nI(o)]);U.push(q[s[0]],q[s[1]])}if(W=[...W,{placement:f,overflows:U}],!U.every(e=>e<=0)){let e=((null==(s=b.flip)?void 0:s.index)||0)+1,t=F[e];if(t&&("alignment"!==S||M===nx(t)||W.every(e=>nx(e.placement)!==M||e.overflows[0]>0)))return{data:{index:e,overflows:W},reset:{placement:t}};let i=null==(r=W.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:r.placement;if(!i)switch(E){case"bestFit":{let e=null==(a=W.filter(e=>{if(j){let t=nx(e.placement);return t===M||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:a[0];e&&(i=e);break}case"initialPlacement":i=w}if(f!==i)return{reset:{placement:i}}}return{}}}),this.shift&&m.push({name:"shift",options:i={boundary:this.shiftBoundary||a,padding:this.shiftPadding},async fn(e){let{x:t,y:o,placement:s,platform:r}=e,{mainAxis:a=!0,crossAxis:c=!1,limiter:h={fn:e=>{let{x:t,y:i}=e;return{x:t,y:i}}},...p}=nb(i,e),u={x:t,y:o},m=await r.detectOverflow(e,p),g=nx(nv(s)),f=nw(g),b=u[f],v=u[g];if(a){let e="y"===f?"top":"left",t="y"===f?"bottom":"right",i=b+m[e],o=b-m[t];b=np(i,nh(b,o))}if(c){let e="y"===g?"top":"left",t="y"===g?"bottom":"right",i=v+m[e],o=v-m[t];v=np(i,nh(v,o))}let w=h.fn({...e,[f]:b,[g]:v});return{...w,data:{x:w.x-t,y:w.y-o,enabled:{[f]:a,[g]:c}}}}}),this.autoSize?m.push(al({boundary:this.autoSizeBoundary||a,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&m.push({name:"arrow",options:c={element:this.arrowEl,padding:this.arrowPadding},async fn(e){let{x:t,y:i,placement:o,rects:s,platform:r,elements:a,middlewareData:h}=e,{element:p,padding:u=0}=nb(c,e)||{};if(null==p)return{};let m=nA(u),g={x:t,y:i},f=nw(nx(o)),b=nk(f),v=await r.getDimensions(p),w="y"===f,x=w?"clientHeight":"clientWidth",C=s.reference[b]+s.reference[f]-g[f]-s.floating[b],_=g[f]-s.reference[f],S=await (null==r.getOffsetParent?void 0:r.getOffsetParent(p)),$=S?S[x]:0;$&&await (null==r.isElement?void 0:r.isElement(S))||($=a.floating[x]||s.floating[b]);let E=$/2-v[b]/2-1,A=nh(m[w?"top":"left"],E),T=nh(m[w?"bottom":"right"],E),D=$-v[b]-T,P=$/2-v[b]/2+(C/2-_/2),M=np(A,nh(P,D)),O=!h.arrow&&null!=ny(o)&&P!==M&&s.reference[b]/2-(P<A?A:T)-v[b]/2<0,N=O?P<A?P-A:P-D:0;return{[f]:g[f]+N,data:{[f]:M,centerOffset:P-M-N,...O&&{alignmentOffset:N}},reset:O}}});let g=this.SUPPORTS_POPOVER?e=>an.getOffsetParent(e,ac):an.getOffsetParent;(o=this.anchorEl,s=this.popup,r={placement:this.placement,middleware:m,strategy:this.SUPPORTS_POPOVER?"absolute":"fixed",platform:{...an,getOffsetParent:g}},h=new Map,u={...(p={platform:an,...r}).platform,_c:h},nP(o,s,{...p,platform:u})).then(({x:e,y:t,middlewareData:i,placement:o})=>{let s="rtl"===this.localize.dir(),r={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=i.arrow.x,t=i.arrow.y,o="",a="",c="",h="";if("start"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=s?i:"",h=s?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=s?"":i,h=s?i:"",c="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(h="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",o="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(h="number"==typeof e?`${e}px`:"",o="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:o,right:a,bottom:c,left:h,[r]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new r1)}render(){return em`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${ah({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${ah({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?em`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};am.css=r2,r6([eD(".popup")],am.prototype,"popup",2),r6([eD(".arrow")],am.prototype,"arrowEl",2),r6([eI({attribute:!1,type:Boolean})],am.prototype,"SUPPORTS_POPOVER",2),r6([eI()],am.prototype,"anchor",2),r6([eI({type:Boolean,reflect:!0})],am.prototype,"active",2),r6([eI({reflect:!0})],am.prototype,"placement",2),r6([eI()],am.prototype,"boundary",2),r6([eI({type:Number})],am.prototype,"distance",2),r6([eI({type:Number})],am.prototype,"skidding",2),r6([eI({type:Boolean})],am.prototype,"arrow",2),r6([eI({attribute:"arrow-placement"})],am.prototype,"arrowPlacement",2),r6([eI({attribute:"arrow-padding",type:Number})],am.prototype,"arrowPadding",2),r6([eI({type:Boolean})],am.prototype,"flip",2),r6([eI({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],am.prototype,"flipFallbackPlacements",2),r6([eI({attribute:"flip-fallback-strategy"})],am.prototype,"flipFallbackStrategy",2),r6([eI({type:Object})],am.prototype,"flipBoundary",2),r6([eI({attribute:"flip-padding",type:Number})],am.prototype,"flipPadding",2),r6([eI({type:Boolean})],am.prototype,"shift",2),r6([eI({type:Object})],am.prototype,"shiftBoundary",2),r6([eI({attribute:"shift-padding",type:Number})],am.prototype,"shiftPadding",2),r6([eI({attribute:"auto-size"})],am.prototype,"autoSize",2),r6([eI()],am.prototype,"sync",2),r6([eI({type:Object})],am.prototype,"autoSizeBoundary",2),r6([eI({attribute:"auto-size-padding",type:Number})],am.prototype,"autoSizePadding",2),r6([eI({attribute:"hover-bridge",type:Boolean})],am.prototype,"hoverBridge",2),am=r6([e$("wa-popup")],am);var ag=Object.defineProperty,af=Object.getOwnPropertyDescriptor,ab=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?af(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&ag(t,i,r),r};let av=0,ay=[],aw=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.showDelay=500,this.hideDelay=0,this.suppressed=!1,this.open=!1,this.bodyId=`gl-tooltip-${++av}`,this.onAnchorSlotChange=e=>{let t=e.target.assignedElements({flatten:!0})[0];t!==this.anchorEl&&(this.detachAnchor(),this.attachAnchor(t))},this.onDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&ay.at(-1)===this&&(e.preventDefault(),e.stopPropagation(),this.open=!1)},this.onMouseOver=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!0},this.showDelay))},this.onMouseOut=()=>{this.anchorEl?.matches(":hover")||this.matches(":hover")||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!1},this.hideDelay))},this.onFocusIn=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.open=!0)},this.onFocusOut=()=>{clearTimeout(this.hoverTimeout),this.open=!1},this.onMouseDown=e=>{this.suppressed=!0,this.open=!1},this.onMouseUp=e=>{this.suppressed=!1},this.onDragStart=e=>{this.suppressed=!0,this.open=!1},this.onDragEnd=e=>{this.suppressed=!1},this.onClick=e=>{this.hideOnClick&&(this.open=!1)}}connectedCallback(){super.connectedCallback?.(),this.eventController=new AbortController;let{signal:e}=this.eventController;this.addEventListener("mouseover",this.onMouseOver,{signal:e}),this.addEventListener("mouseout",this.onMouseOut,{signal:e}),this.addEventListener("focusin",this.onFocusIn,{signal:e}),this.addEventListener("focusout",this.onFocusOut,{signal:e}),this.addEventListener("mousedown",this.onMouseDown,{signal:e}),this.addEventListener("click",this.onClick,{signal:e}),window.addEventListener("mouseup",this.onMouseUp,{signal:e}),window.addEventListener("dragstart",this.onDragStart,{capture:!0,signal:e}),window.addEventListener("dragend",this.onDragEnd,{capture:!0,signal:e})}disconnectedCallback(){this.eventController?.abort(),this.eventController=void 0,this.detachAnchor(),this.unregisterDismissible(),clearTimeout(this.hoverTimeout),super.disconnectedCallback?.()}updated(e){e.has("open")&&(this.open?this.registerDismissible():this.unregisterDismissible()),e.has("disabled")&&this.disabled&&this.open&&(this.open=!1)}attachAnchor(e){null!=e&&(this.anchorEl=e,this.addAriaDescribedBy(e,this.bodyId))}detachAnchor(){null!=this.anchorEl&&(this.removeAriaDescribedBy(this.anchorEl,this.bodyId),this.anchorEl=void 0)}addAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);i.includes(t)||(i.push(t),e.setAttribute("aria-describedby",i.join(" ")))}removeAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean).filter(e=>e!==t);0===i.length?e.removeAttribute("aria-describedby"):e.setAttribute("aria-describedby",i.join(" "))}registerDismissible(){ay.includes(this)||(ay.push(this),document.addEventListener("keydown",this.onDocumentKeyDown,{signal:this.eventController?.signal}))}unregisterDismissible(){let e=ay.indexOf(this);-1!==e&&ay.splice(e,1),document.removeEventListener("keydown",this.onDocumentKeyDown)}async hide(){this.open=!1,await this.updateComplete}async show(){this.disabled||this.suppressed||(this.open=!0,await this.updateComplete)}render(){var e;return em`<wa-popup
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
				<slot name="content">${e=this.content,e?.includes(`
`)?r0(e.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):e}</slot>
			</div>
		</wa-popup>`}};aw.styles=S`
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

			${rQ}
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
	`,ab([eI()],aw.prototype,"content",2),ab([eI({reflect:!0})],aw.prototype,"placement",2),ab([eI({type:Boolean})],aw.prototype,"disabled",2),ab([eI({type:Number})],aw.prototype,"distance",2),ab([eI({type:Number,attribute:"show-delay"})],aw.prototype,"showDelay",2),ab([eI({type:Number,attribute:"hide-delay"})],aw.prototype,"hideDelay",2),ab([eI({type:Boolean,attribute:"hide-on-click"})],aw.prototype,"hideOnClick",2),ab([eD("wa-popup")],aw.prototype,"popup",2),ab([eA()],aw.prototype,"suppressed",2),ab([eA()],aw.prototype,"open",2),aw=ab([e$("gl-tooltip")],aw);var ak=Object.defineProperty,ax=Object.getOwnPropertyDescriptor,aC=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?ax(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&ak(t,i,r),r};let a_=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1,this.ariaLabel=null}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(e){if(e.has("href")&&this.setAttribute("role",this.href?"link":"button"),e.has("disabled")){let t=e.get("disabled");t?this.setAttribute("aria-disabled",t.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(e)}render(){return this.tooltip?em`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??eb}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?em`<gl-tooltip placement=${this.tooltipPlacement??eb}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?em`<a
				class="control"
				aria-label=${this.ariaLabel??eb}
				tabindex="${(!1===this.disabled?void 0:-1)??eb}"
				href=${this.href}
				@keypress=${e=>this.onLinkKeypress(e)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:em`<button
			class="control"
			role=${this.role??eb}
			aria-label=${this.ariaLabel??eb}
			aria-checked=${this.ariaChecked??eb}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(e){" "===e.key&&this.control.click()}focus(e){this.control.focus(e)}blur(){this.control.blur()}click(){this.control.click()}};a_.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},a_.styles=[r_,S`
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
				${rx}
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
		`],aC([eD(".control")],a_.prototype,"control",2),aC([eI({reflect:!0})],a_.prototype,"appearance",2),aC([eI({reflect:!0})],a_.prototype,"variant",2),aC([eI({type:Boolean,reflect:!0})],a_.prototype,"disabled",2),aC([eI({reflect:!0})],a_.prototype,"density",2),aC([eI({type:Boolean,reflect:!0})],a_.prototype,"full",2),aC([eI()],a_.prototype,"href",2),aC([eI()],a_.prototype,"tooltip",2),aC([eI()],a_.prototype,"tooltipPlacement",2),aC([eI({type:Boolean,reflect:!0})],a_.prototype,"truncate",2),aC([eI({type:String,attribute:"aria-label"})],a_.prototype,"ariaLabel",2),a_=aC([e$("gl-button")],a_);let aS=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a","add-small":"\\ec7b","remove-small":"\\ec7c","worktree-small":"\\ec7d",worktree:"\\ec7e","screen-cut":"\\ec7f",ask:"\\ec80",openai:"\\ec81",claude:"\\ec82","open-in-window":"\\ec83","new-session":"\\ec84"}),a$=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147","diff-right":"\\f11b","diff-left":"\\f12e","accept-right":"\\f12f","accept-left":"\\f130","accept-all-right":"\\f131","accept-all-left":"\\f132",continue:"\\f148",skip:"\\f149",abort:"\\f14a",pause:"\\f14b","kanban-view":"\\f14c","filter-mixed":"\\f14d","start-new":"\\f14e",merge:"\\f14f"});var aE=Object.defineProperty,aI=Object.getOwnPropertyDescriptor,aA=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?aI(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&aE(t,i,r),r};function aT(e,t=""){return _(Object.entries(e).map(([e,i])=>(function(e,t,i=""){return`:host([icon='${i}${e}'])::before { content: '${t}'; }`})(e,i,t)).join(""))}let aD=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(e){e.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(e)}};aD.styles=S`
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

		${aT(aS)}

		${aT(a$,"gl-")}

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
	`,aA([eI({reflect:!0})],aD.prototype,"icon",2),aA([eI({reflect:!0})],aD.prototype,"modifier",2),aA([eI({type:Number})],aD.prototype,"size",2),aA([eI({reflect:!0})],aD.prototype,"flip",2),aA([eI({reflect:!0})],aD.prototype,"rotate",2),aD=aA([e$("code-icon")],aD);var aR=Object.defineProperty,aP=Object.getOwnPropertyDescriptor,aL=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?aP(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&aR(t,i,r),r};let aM=class extends lit_element_i{constructor(){super(...arguments),this.open=!1,this.modal=!1}update(e){super.update(e),e.has("open")&&this.toggleVisibility()}render(){return em`
			<dialog part="base" closedby=${this.closedby??eb} @close=${this.onDialogClose}>
				<slot></slot>
			</dialog>
		`}onDialogClose(){this.open&&(this.open=!1,this.dispatchEvent(new CustomEvent("gl-dialog-close",{bubbles:!0,composed:!0})))}toggleVisibility(){this.open?this.dialog.open||(this.modal?this.dialog.showModal():this.dialog.show()):this.dialog.open&&this.dialog.close()}close(){this.open=!1}show(){this.open=!0}};function aO(e,t){return null==t?`command:${e}`:`command:${e}?${encodeURIComponent("string"==typeof t?t:JSON.stringify(t))}`}aM.styles=[rC,S`
			:host {
				display: contents;
			}

			dialog::backdrop {
				background-color: #0000004d;
				backdrop-filter: blur(0.4rem);
			}

			dialog {
				--gl-elevation: var(--gl-shadow-dialog);
				--gl-elevation-border-color: var(--vscode-widget-border);

				width: min-content;
				min-width: 40rem;
				max-width: 50rem;
				padding: var(--gl-space-20);
				color: var(--vscode-editorWidget-foreground);
				background: var(--vscode-editorWidget-background);
				border-radius: var(--gl-radius-sm);

				${rQ}
			}
		`],aL([eI({type:Boolean,reflect:!0})],aM.prototype,"open",2),aL([eI({type:Boolean,reflect:!0})],aM.prototype,"modal",2),aL([eI()],aM.prototype,"closedby",2),aL([eD("dialog")],aM.prototype,"dialog",2),aM=aL([e$("gl-dialog")],aM);let az=S`
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
`,aN=S`
	hr {
		border: none;
		border-top: var(--gl-border-width) solid var(--color-foreground--25);
	}
`,aH=S`
	:host {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		max-width: 100%;
	}

	* {
		box-sizing: border-box;
	}
`,aB=S`
	code-icon.picker-icon {
		/* margin-top: 0.4rem; */
		margin-right: -0.25rem;
		font-size: var(--gl-font-micro);
	}

	code-icon.picker-icon::before {
		margin-left: -0.4rem;
	}
`,aj=S`
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
`;var aF=Object.defineProperty,aq=Object.getOwnPropertyDescriptor,aU=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?aq(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&aF(t,i,r),r};let aW=["top","right","bottom","left","top-left","top-right","bottom-left","bottom-right"],aV=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.autoSizeVertical=!1,this.skidding=0,this.trigger="hover focus",this.suppressed=!1,this.handleReposition=()=>{let e=this.popup?.getAttribute("data-current-placement");null!=e&&e!==this._resolvedPlacement&&(this._resolvedPlacement=e)},this.handleResizePointerDown=e=>{if(0!==e.button)return;let t=e.currentTarget,i=t.dataset.handle;if(null==i)return;e.preventDefault();let o="right"===i||"top-right"===i||"bottom-right"===i,s="left"===i||"top-left"===i||"bottom-left"===i,r="bottom"===i||"bottom-left"===i||"bottom-right"===i,a="top"===i||"top-left"===i||"top-right"===i,c=this.body,h=e.clientX,p=e.clientY,u=c.getBoundingClientRect(),m=u.width,g=u.height;t.setPointerCapture(e.pointerId),t.classList.add("popover__resizer--active"),this.toggleAttribute("dragging",!0);let f=e=>{let t=e.clientX-h,i=e.clientY-p;o?c.style.width=`${Math.max(0,m+t)}px`:s&&(c.style.width=`${Math.max(0,m-t)}px`),r?c.style.height=`${Math.max(0,g+i)}px`:a&&(c.style.height=`${Math.max(0,g-i)}px`),this.popup?.reposition()},b=()=>{this.toggleAttribute("dragging",!1),t.classList.remove("popover__resizer--active"),t.removeEventListener("pointermove",f),t.removeEventListener("lostpointercapture",b),t.removeEventListener("pointerup",b)};t.addEventListener("pointermove",f,{passive:!0}),t.addEventListener("lostpointercapture",b),t.addEventListener("pointerup",b)},this.handleTriggerBlur=e=>{this.open&&(this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&(e.relatedTarget&&this.contains(e.relatedTarget)||this.hide())},this.handleTriggerClick=e=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(e.composedPath().includes(this.body))return;this.hide()}else this._skipHideOnClick=!1,this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=e=>{let t=this.hasTrigger("focus")||this.hasTrigger("focus-visible");this.hasTrigger("click")&&t&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,!this.open||"hover"!==this._triggeredBy||this.hasTrigger("click")||e.composedPath().includes(this.body)||(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=e=>{let t=this.hasTrigger("focus"),i=this.hasTrigger("focus-visible");if(t||i){if(!t&&i){let t=e.target;if(null==t||"function"!=typeof t.matches||!t.matches(":focus-visible"))return}this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus")}},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handlePopupBlur=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let e=tQ(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let e=tQ(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),e)}}}static closeOthers(e){for(let t of aV.openPopovers)t===e||function(e,t){let i=t;for(;null!=i;){if(i===e)return!0;i=i.parentNode??(i instanceof ShadowRoot?i.host:null)}return!1}(t,e)||t.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,aV.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),this.updateResizeObserver()}updateResizeObserver(){null!=this.resize?null==this.resizeObserver&&null!=this.body&&(this.resizeObserver=new ResizeObserver(()=>this.popup?.reposition()),this.resizeObserver.observe(this.body)):null!=this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}render(){let e=this._resolvedPlacement??this.placement,t=(function(e){if(!e)return[];let t=new Set;for(let i of e.trim().split(/\s+/))switch(i){case"horizontal":t.add("right");break;case"vertical":t.add("bottom");break;case"both":t.add("right"),t.add("bottom"),t.add("bottom-right");break;case"all":for(let e of aW)t.add(e);break;default:aW.includes(i)&&t.add(i)}return[...t]})(this.resize).filter(t=>!function(e,t){let i,o;if(!t)return!1;let[s,r]=t.split("-");switch(s){case"top":i="bottom";break;case"right":i="left";break;case"bottom":i="top";break;case"left":i="right"}let a="left"===s||"right"===s;"start"===r?o=a?"top":"left":"end"===r&&(o=a?"bottom":"right");let c=t=>null!=t&&(e===t||e.startsWith(`${t}-`)||e.endsWith(`-${t}`));return c(i)||c(o)}(t,e));return em`<wa-popup
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
				${t.map(e=>em`<div
							class="popover__resizer popover__resizer--${e}"
							role="separator"
							aria-orientation=${"top"===e||"bottom"===e?"horizontal":"vertical"}
							aria-label="Resize"
							data-handle=${e}
							@pointerdown=${this.handleResizePointerDown}
						></div>`)}
			</div>
		</wa-popup>`}async show(e){if(this.open||this.suppressed){"click"===e&&"hover"===this._triggeredBy&&(this._triggeredBy=e);return}return(null==this._triggeredBy||"hover"!==e)&&(this._triggeredBy=e),aV.closeOthers(this),this.open=!0,aV.openPopovers.add(this),t0(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,aV.openPopovers.delete(this),t0(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(e){return this.trigger.split(" ").includes(e)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleResizeChange(){this.updateResizeObserver()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};aV.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},aV.openPopovers=new Set,aV.styles=[r$,S`
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

				${rQ}
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
		`],aU([eD("#popover")],aV.prototype,"body",2),aU([eD("wa-popup")],aV.prototype,"popup",2),aU([eI({reflect:!0})],aV.prototype,"placement",2),aU([eI({type:Object})],aV.prototype,"anchor",2),aU([eI({reflect:!0,type:Boolean})],aV.prototype,"disabled",2),aU([eI({type:Number})],aV.prototype,"distance",2),aU([eI({reflect:!0,type:Boolean})],aV.prototype,"open",2),aU([eI({reflect:!0,type:Boolean})],aV.prototype,"arrow",2),aU([eI({reflect:!0,type:Boolean,attribute:"auto-size-vertical"})],aV.prototype,"autoSizeVertical",2),aU([eI({reflect:!0})],aV.prototype,"resize",2),aU([eI({type:Number})],aV.prototype,"skidding",2),aU([eI()],aV.prototype,"trigger",2),aU([eI({reflect:!0})],aV.prototype,"appearance",2),aU([eA()],aV.prototype,"suppressed",2),aU([eA()],aV.prototype,"_resolvedPlacement",2),aU([tE("open",{afterFirstUpdate:!0})],aV.prototype,"handleOpenChange",1),aU([tE(["distance","placement","skidding"])],aV.prototype,"handleOptionsChange",1),aU([tE("resize",{afterFirstUpdate:!0})],aV.prototype,"handleResizeChange",1),aU([tE("disabled")],aV.prototype,"handleDisabledChange",1),aV=aU([e$("gl-popover")],aV);let aG=S`
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
`,aY=S`
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
`;var aZ=Object.defineProperty,aX=Object.getOwnPropertyDescriptor,aK=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?aX(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&aZ(t,i,r),r};let aJ=class extends lit_element_i{constructor(){super(...arguments),this.pulse=!1}render(){return em`<slot class="indicator${this.pulse?" indicator--pulse":""}"></slot>`}};aJ.styles=[aG,aY],aK([eI({type:Boolean})],aJ.prototype,"pulse",2),aJ=aK([e$("gl-indicator")],aJ);var aQ=Object.defineProperty,a0=Object.getOwnPropertyDescriptor,a1=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?a0(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&aQ(t,i,r),r};let a2=class extends GlElement{constructor(){super(),this._truncated=!1,this.connectIcon=!0,this.disabled=!1,this.icon=!0,this.hasMultipleRepositories=!1,this.expandable=!1,this.resizeObserver=new ResizeObserver(()=>this.updateTruncated())}disconnectedCallback(){super.disconnectedCallback?.(),this.resizeObserver.disconnect(),this.observedLabelButtonEl=void 0}firstUpdated(){this.observeLabelButton(),this.updateTruncated()}updated(e){super.updated(e),(e.has("repository")||e.has("hasMultipleRepositories")||e.has("icon"))&&(this.observeLabelButton(),this.updateTruncated())}observeLabelButton(){let e=this.labelButtonEl;this.observedLabelButtonEl!==e&&(this.resizeObserver.disconnect(),this.observedLabelButtonEl=e,null!=e&&this.resizeObserver.observe(e))}updateTruncated(){let e;if(!this.hasMultipleRepositories){this.style.removeProperty("--compact-width"),this._truncated&&(this._truncated=!1);return}let t=this.labelButtonEl;if(null==t)return;let i=this.compactSizerEl?.getBoundingClientRect().width??0;if(0===i)return;let o=this.fallbackIconSizerEl?.getBoundingClientRect().width??i,s=`${i}px`;if(this.style.getPropertyValue("--compact-width")!==s&&this.style.setProperty("--compact-width",s),this._truncated)e=t.getBoundingClientRect().width<=i+o;else{let s=t.shadowRoot?.querySelector("slot.label"),r=this.icon?o:i;e=(s?.getBoundingClientRect().width??t.getBoundingClientRect().width)<=r}e!==this._truncated&&(this._truncated=e)}get displayName(){return this.repository?.name??"none selected"}render(){let e=this.icon&&!this.hasMultipleRepositories,t=this.icon&&this._truncated&&this.hasMultipleRepositories;return em`
			${this.renderProviderIcon()}
			${this.hasMultipleRepositories?em`<span class="truncated-button__sizer" aria-hidden="true">${this.displayName}</span>
						<gl-button
							class="truncated-button__compact-sizer"
							appearance="toolbar"
							aria-hidden="true"
							?disabled=${!0}
						>
							${this.icon?em`<code-icon
										slot="prefix"
										class="repo-icon-fallback"
										icon="gl-repository"
										aria-hidden="true"
									></code-icon>`:eb}
							<code-icon
								slot="suffix"
								class="picker-icon"
								icon="chevron-down"
								aria-hidden="true"
							></code-icon>
						</gl-button>`:eb}
			${e?eb:em`<gl-button
						class=${t?"truncated-button truncated-button--icon-fallback":"truncated-button"}
						part="label"
						appearance="toolbar"
						?disabled=${this.disabled}
						truncate
						@click=${e=>this.emit("gl-click",{event:e,part:"label",repository:this.repository})}
					>
						${t?em`<code-icon
									slot="prefix"
									class="repo-icon-fallback"
									icon="gl-repository"
									aria-hidden="true"
								></code-icon>`:eb}
						<span class="truncated-button__label">${this.displayName}</span>
						${this.hasMultipleRepositories?em`<code-icon
									slot="suffix"
									class="picker-icon"
									icon="chevron-down"
									aria-hidden="true"
								></code-icon>`:eb}
						<slot name="tooltip" slot="tooltip">${this.displayName}</slot>
					</gl-button>`}
		`}renderProviderIcon(){if(!this.icon)return eb;let{repository:e}=this;if(!e?.provider)return em`
				<gl-button part="provider-icon" appearance="toolbar" ?disabled=${!0}>
					<code-icon icon="gl-repository" aria-hidden="true"></code-icon>
				</gl-button>
			`;let{provider:t}=e,i=t.integration?.connected;return em`<gl-popover placement="bottom" trigger="hover click focus">
				<gl-button
					slot="anchor"
					part="provider-icon"
					appearance="toolbar"
					href=${t.url??eb}
					aria-label=${`Open Repository on ${t.name}`}
					@click=${e=>this.emit("gl-click",{event:e,part:"icon",repository:this.repository})}
				>
					<code-icon
						icon=${"cloud"===t.icon?"cloud":`gl-provider-${t.icon}`}
						aria-hidden="true"
					></code-icon>
					${oT(i,()=>em`<gl-indicator class="indicator-dot"></gl-indicator>`)}
				</gl-button>
				<div slot="content" class="provider-popover">
					<div class="provider-popover__title">Open Repository on ${t.name}</div>
					<hr />
					<div class="provider-popover__line">
						<code-icon class="popover-status-icon" icon="gl-repository" aria-hidden="true"></code-icon>
						${this.displayName}
					</div>
					${oT(i,()=>em`
							<div class="provider-popover__line">
								<code-icon class="popover-status-icon" icon="check" aria-hidden="true"></code-icon>
								Connected to ${t.name}
							</div>
						`,()=>!1!==i?eb:em`
								<div class="provider-popover__line">
									<code-icon class="popover-status-icon" icon="plug" aria-hidden="true"></code-icon>
									<a
										href=${aO("gitlens.connectRemoteProvider",{repoPath:e.path,remote:t.bestRemoteName})}
									>
										Connect to ${e.provider.name}
									</a>
									<span>&mdash; not connected</span>
								</div>
							`)}
				</div>
			</gl-popover>
			${this.renderConnectIcon()}`}renderConnectIcon(){if(!this.connectIcon)return eb;let{repository:e}=this;if(!e?.provider)return eb;let{provider:t}=e;return t.integration?.connected!==!1?eb:em`
			<gl-button
				part="connect-icon"
				appearance="toolbar"
				href=${aO("gitlens.connectRemoteProvider",{repoPath:e.path,remote:t.bestRemoteName})}
			>
				<code-icon class="connect-icon" icon="plug"></code-icon>
				<span slot="tooltip">
					Connect to ${t.name}
					<hr />
					View pull requests and issues in Home, Commit Graph, Launchpad, autolinks, and more
				</span>
			</gl-button>
		`}};a2.styles=[az,aN,aH,aj,S`
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
		`,aB],a1([eA()],a2.prototype,"_truncated",2),a1([eD(".truncated-button")],a2.prototype,"labelButtonEl",2),a1([eD(".truncated-button__compact-sizer")],a2.prototype,"compactSizerEl",2),a1([eD(".truncated-button__compact-sizer .repo-icon-fallback")],a2.prototype,"fallbackIconSizerEl",2),a1([eI({type:Boolean})],a2.prototype,"connectIcon",2),a1([eI({type:Boolean})],a2.prototype,"disabled",2),a1([eI({type:Boolean,reflect:!0})],a2.prototype,"icon",2),a1([eI({type:Object})],a2.prototype,"repository",2),a1([eI({type:Boolean,reflect:!0,attribute:"multi-repo"})],a2.prototype,"hasMultipleRepositories",2),a1([eI({type:Object})],a2.prototype,"source",2),a1([eI({type:Boolean,reflect:!0})],a2.prototype,"expandable",2),a2=a1([e$("gl-repo-button-group")],a2);let a3=S`
	.composer-item {
		--composer-item-background: var(--composer-background-05);
		--composer-item-border: transparent;
		--composer-item-radius: var(--gl-radius-xl);
		--composer-item-color: var(--vscode-foreground);
		--composer-item-icon-color: var(--vscode-icon-foreground);

		display: flex;
		flex-direction: row;
		align-items: center;
		color: var(--composer-item-color);
		cursor: pointer;
		background: var(--composer-item-background);

		/* gap: 0.8rem; */
		border: var(--gl-border-width) solid var(--composer-item-border);
		border-radius: var(--composer-item-radius);
		transition: background-color var(--gl-duration-medium) ease;
	}

	.composer-item:not(.is-selected):is(:focus-visible, :hover) {
		--composer-item-background: var(--vscode-list-hoverBackground);
	}

	.composer-item.is-selected,
	.composer-item:focus-visible {
		--composer-item-background: var(--vscode-list-activeSelectionBackground, var(--color-background));
		--composer-item-icon-color: var(--vscode-list-activeSelectionForeground, var(--vscode-foreground));
		--composer-item-color: var(--vscode-list-activeSelectionForeground);

		transition: none;
	}

	:host-context(.vscode-high-contrast) .composer-item.is-selected,
	:host-context(.vscode-high-contrast) .composer-item:focus-visible {
		--composer-item-border: var(
			--vscode-list-focusAndSelectionOutline,
			var(--vscode-contrastActiveBorder, var(--vscode-list-focusOutline))
		);
	}

	.composer-item.is-summary {
		--composer-item-border: var(--vscode-panel-border);
		--composer-item-radius: var(--gl-radius-sm);
	}

	.composer-item.is-uncommitted {
		--composer-item-background: color-mix(
			in srgb,
			var(--vscode-notificationsWarningIcon-foreground) 8%,
			transparent
		);
		--composer-item-border: color-mix(in srgb, var(--vscode-notificationsWarningIcon-foreground) 20%, transparent);
		--composer-item-radius: var(--gl-radius-sm);

		border-style: dashed;
	}

	.composer-item.is-uncommitted:not(.is-selected):is(:focus-visible, :hover) {
		--composer-item-background: color-mix(
			in srgb,
			var(--vscode-notificationsWarningIcon-foreground) 12%,
			transparent
		);
	}

	.composer-item.is-uncommitted.is-selected {
		--composer-item-background: color-mix(
			in srgb,
			var(--vscode-notificationsWarningIcon-foreground) 18%,
			transparent
		);
		--composer-item-border: color-mix(in srgb, var(--vscode-notificationsWarningIcon-foreground) 25%, transparent);
		--composer-item-color: var(--vscode-foreground);
	}

	.composer-item.is-base,
	.composer-item.is-base:focus-visible,
	.composer-item.is-base:hover {
		--composer-item-background: var(--color-background);
		--composer-item-icon-color: var(--color-foreground--65);
		--composer-item-color: var(--color-foreground--65);

		cursor: default;
	}

	.composer-item__content {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--gl-space-4);
		min-width: 0;
		padding: var(--gl-space-8) var(--gl-space-12);
	}

	.composer-item__header {
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: var(--gl-font-lg);
		white-space: nowrap;
	}

	.composer-item__header.is-placeholder,
	.composer-item__header.is-empty-state {
		font-style: italic;
		opacity: 0.65;
	}

	.composer-item__header.is-empty-state {
		text-overflow: initial;
		text-wrap: pretty;
		white-space: normal;
	}

	.composer-item__body {
		font-size: var(--gl-font-md);
	}

	.composer-item.is-base .composer-item__body {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`,a5=S`
	.composer-item__commit {
		position: relative;
		flex: none;
		align-self: stretch;
		width: 2.2rem;
		margin-inline-start: var(--gl-space-8);
	}

	.composer-item__commit::before {
		position: absolute;
		top: 0;
		left: 50%;
		width: 0;
		height: 100%;
		content: '';
		border-left: 2px dashed var(--composer-item-icon-color);
		transform: translateX(-50%);
	}

	.composer-item.is-first .composer-item__commit::before {
		top: 50%;
		height: 50%;
	}

	.composer-item.is-last .composer-item__commit::before {
		display: none;
	}

	.composer-item__commit::after {
		position: absolute;
		top: 50%;
		left: 0;
		z-index: 1;
		width: 1.8rem;
		aspect-ratio: 1;
		content: '';
		background: var(--composer-item-background);
		border: 2px dashed var(--composer-item-icon-color);
		border-radius: 50%;
		transform: translateY(-50%);
	}

	.composer-item.is-base .composer-item__commit::after {
		border-style: solid;
	}

	.composer-item.is-base .composer-item__commit::before {
		border-left-style: solid;
	}

	.composer-item.is-recompose-locked .composer-item__commit::after {
		border-style: solid;
	}

	.composer-item.is-recompose-locked .composer-item__commit::before {
		border-left-style: solid;
	}

	.composer-item.is-locked {
		cursor: default;
		opacity: 0.6;
	}

	.composer-item.is-locked .drag-handle {
		display: none;
	}

	.composer-item.is-locked .composer-item__commit::after {
		border-style: solid;
	}

	.composer-item.is-locked .composer-item__commit::before {
		border-left-style: solid;
	}

	.composer-item__commit.is-empty::before,
	.composer-item__commit.is-empty::after {
		display: none;
	}
`,a4=S`
	.change-stats {
		display: flex;
		gap: var(--gl-space-8);
		align-items: center;
	}

	.diff-stats {
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;

		/* font-size: 0.8rem; */
		font-weight: 500;
	}

	.diff-stats__additions {
		color: var(--vscode-gitDecoration-addedResourceForeground);
		color: light-dark(
			color-mix(in srgb, #fff 40%, var(--vscode-gitDecoration-addedResourceForeground)),
			var(--vscode-gitDecoration-addedResourceForeground)
		);
	}

	.diff-stats__deletions {
		color: var(--vscode-gitDecoration-deletedResourceForeground);
		color: light-dark(
			color-mix(in srgb, #fff 40%, var(--vscode-gitDecoration-deletedResourceForeground)),
			var(--vscode-gitDecoration-deletedResourceForeground)
		);
	}
`;var a6=Object.defineProperty,a8=Object.getOwnPropertyDescriptor,a7=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?a8(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&a6(t,i,r),r};let a9=class extends lit_element_i{constructor(){super(...arguments),this.selected=!1,this.multiSelected=!1,this.isPreviewMode=!1,this.isRecomposeLocked=!1,this.locked=!1,this.first=!1,this.last=!1}connectedCallback(){super.connectedCallback?.(),this.dataset.commitId=this.commitId}handleMouseDown(e){e.shiftKey&&e.preventDefault()}handleClick(e){e.target.closest(".drag-handle")||e instanceof KeyboardEvent&&"Enter"!==e.key||this.dispatchEvent(new CustomEvent("commit-selected",{detail:{commitId:this.commitId,shiftKey:e.shiftKey},bubbles:!0}))}render(){let e=!this.message||0===this.message.trim().length;return em`
			<div
				class="composer-item commit-item ${this.selected?" is-selected":""}${this.multiSelected?" multi-selected":""}${this.first?" is-first":""}${this.last?" is-last":""}${this.isRecomposeLocked?" is-recompose-locked":""}${this.locked?" is-locked":""}"
				data-commit-id=${this.commitId}
				tabindex="0"
				@click=${this.handleClick}
				@keydown=${this.handleClick}
				@mousedown=${this.handleMouseDown}
			>
				${oT(!this.isPreviewMode,()=>em`
						<div class="drag-handle">
							<code-icon icon="gripper"></code-icon>
						</div>
					`)}
				<div class="composer-item__commit"></div>
				<div class="composer-item__content">
					<div class="composer-item__header${e?" is-placeholder":""}">
						${e?"Draft commit (add a commit message)":this.message}
					</div>
					<div class="composer-item__body change-stats">
						<div class="file-count">${this.fileCount} ${1===this.fileCount?"file":"files"}</div>
						<div class="diff-stats">
							<span class="diff-stats__additions">+${this.additions}</span>
							<span class="diff-stats__deletions">-${this.deletions}</span>
						</div>
					</div>
				</div>
			</div>
		`}};a9.styles=[rS,rC,a3,a4,a5,S`
			:host {
				display: block;
				margin-bottom: var(--gl-space-2);
			}

			.commit-item.sortable-ghost {
				opacity: 0.5;
			}

			.commit-item.sortable-chosen {
				transform: scale(1.02);
			}

			.commit-item.sortable-drag {
				transform: rotate(2deg);
			}

			.commit-item.drop-target {
				background: var(--vscode-list-dropBackground);
			}

			.drag-handle {
				position: absolute;
				top: 50%;
				left: 0.4rem;
				padding: var(--gl-space-2);
				color: var(--vscode-descriptionForeground);
				cursor: grab;
				opacity: 0.3;
				transform: translateY(-50%);
				transition: opacity var(--gl-duration-medium) ease;
			}

			.drag-handle:hover,
			.commit-item:hover .drag-handle {
				opacity: 1;
			}

			.drag-handle:active {
				cursor: grabbing;
			}
		`],a7([eI()],a9.prototype,"commitId",2),a7([eI()],a9.prototype,"message",2),a7([eI({type:Number})],a9.prototype,"fileCount",2),a7([eI({type:Number})],a9.prototype,"additions",2),a7([eI({type:Number})],a9.prototype,"deletions",2),a7([eI({type:Boolean})],a9.prototype,"selected",2),a7([eI({type:Boolean})],a9.prototype,"multiSelected",2),a7([eI({type:Boolean})],a9.prototype,"isPreviewMode",2),a7([eI({type:Boolean})],a9.prototype,"isRecomposeLocked",2),a7([eI({type:Boolean})],a9.prototype,"locked",2),a7([eI({type:Boolean})],a9.prototype,"first",2),a7([eI({type:Boolean})],a9.prototype,"last",2),a9=a7([e$("gl-commit-item")],a9);let le=(e,t,i)=>{let o=new Map;for(let s=t;s<=i;s++)o.set(e[s],s);return o},lt=e8(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let o;void 0===i?i=t:void 0!==t&&(o=t);let s=[],r=[],a=0;for(let t of e)s[a]=o?o(t,a):a,r[a]=i(t,a),a++;return{values:r,keys:s}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,o]){let s=e._$AH,{values:r,keys:a}=this.dt(t,i,o);if(!Array.isArray(s))return this.ut=a,r;let c=this.ut??=[],h=[],p,u,m=0,g=s.length-1,f=0,b=r.length-1;for(;m<=g&&f<=b;)if(null===s[m])m++;else if(null===s[g])g--;else if(c[m]===a[f])h[f]=tt(s[m],r[f]),m++,f++;else if(c[g]===a[b])h[b]=tt(s[g],r[b]),g--,b--;else if(c[m]===a[b])h[b]=tt(s[m],r[b]),te(e,h[b+1],s[m]),m++,b--;else if(c[g]===a[f])h[f]=tt(s[g],r[f]),te(e,s[m],s[g]),g--,f++;else if(void 0===p&&(p=le(a,f,b),u=le(c,m,g)),p.has(c[m]))if(p.has(c[g])){let t=u.get(a[f]),i=void 0!==t?s[t]:null;if(null===i){let t=te(e,s[m]);tt(t,r[f]),h[f]=t}else h[f]=tt(i,r[f]),te(e,s[m],i),s[t]=null;f++}else to(s[g]),g--;else to(s[m]),m++;for(;f<=b;){let t=te(e,h[b+1]);tt(t,r[f]),h[f++]=t}for(;m<=g;){let e=s[m++];null!==e&&to(e)}return this.ut=a,((e,t=ti)=>e._$AH=t)(e,h),ef}});var li=Object.defineProperty,lo=Object.getOwnPropertyDescriptor,ls=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?lo(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&li(t,i,r),r};let lr=class extends lit_element_i{constructor(){super(...arguments),this.editor=!1,this.layout="shift",this.grouping="gap"}render(){return em`<div class="group"><slot></slot></div>`}};lr.styles=[r_,S`
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
		`],ls([eI({type:Boolean})],lr.prototype,"editor",2),ls([eI({reflect:!0})],lr.prototype,"layout",2),ls([eI({reflect:!0})],lr.prototype,"grouping",2),lr=ls([e$("button-container")],lr);var ln=Object.defineProperty,la=Object.getOwnPropertyDescriptor,ll=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?la(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&ln(t,i,r),r};let lc=class extends lit_element_i{constructor(){super(...arguments),this.commits=[],this.hunks=[],this.selectedCommitId=null,this.selectedCommitIds=new Set,this.selectedUnassignedSection=null,this.canFinishAndCommit=!0,this.generating=!1,this.committing=!1,this.aiEnabled=!1,this.aiDisabledReason=null,this.isPreviewMode=!1,this.recompose=null,this.canReorderCommits=!0,this.baseCommit=null,this.repoName=null,this.initialCustomInstructions="",this.customInstructions="",this.hasUsedAutoCompose=!1,this.hasChanges=!0,this.hasLockedCommits=!1,this.aiModel=void 0,this.compositionSummarySelected=!1,this.compositionFeedback=null,this.compositionSessionId=null,this.isReadyToCommit=!1,this.isDraggingHunks=!1,this.draggedHunkIds=[],this.hasScrolledToFirstNonLocked=!1,this._selectedCommitId=null,this._selectedCommitIds=new Set,this._selectedUnassignedSection=null,this._compositionSummarySelected=!1,this._pendingDispatch=0,this._commitChanges=new Map,this._commitFileCounts=new Map,this.handleDragEnter=e=>{e.preventDefault(),e.currentTarget.classList.add("drag-over")},this.handleDragLeave=e=>{e.preventDefault(),e.currentTarget.classList.remove("drag-over")}}get isRecomposeLocked(){return this.recompose?.enabled===!0&&!0===this.recompose.locked}get finishHeaderText(){return this.recompose?.enabled&&this.recompose.branchName?`Recompose ${this.recompose.branchName}`:"Finish & Commit"}get finishDescriptionText(){return this.recompose?.enabled?"The branch will be updated with the new commit structure.":"New commits will be added to your current branch."}willUpdate(e){if(e.has("selectedCommitId")&&(this._selectedCommitId=this.selectedCommitId),e.has("selectedCommitIds")&&(this._selectedCommitIds=new Set(this.selectedCommitIds)),e.has("selectedUnassignedSection")&&(this._selectedUnassignedSection=this.selectedUnassignedSection),e.has("compositionSummarySelected")&&(this._compositionSummarySelected=this.compositionSummarySelected),e.has("initialCustomInstructions")&&(this.customInstructions=this.initialCustomInstructions),e.has("commits")||e.has("hunks"))for(let e of(this._commitChanges.clear(),this._commitFileCounts.clear(),this.commits))this._commitChanges.set(e.id,ry(rg(e,this.hunks))),this._commitFileCounts.set(e.id,rv(e,this.hunks))}firstUpdated(){this.initializeSortable(),this.initializeDropZones(),this.addEventListener("hunk-drag-start",this.handleHunkDragStart.bind(this)),this.addEventListener("hunk-drag-end",this.handleHunkDragEnd.bind(this)),this.scrollToFirstNonLockedCommit()}updated(e){if(super.updated(e),(e.has("commits")||e.has("isPreviewMode"))&&(this.commitsSortable?.destroy(),this.initializeSortable(),this.initializeCommitDropZones(),e.has("commits"))){let t=e.get("commits");!t?.length&&this.commits.length>0&&this.scrollToFirstNonLockedCommit()}}disconnectedCallback(){super.disconnectedCallback?.(),this.commitsSortable?.destroy()}scrollToFirstNonLockedCommit(){if(this.hasScrolledToFirstNonLocked||!this.commits.some(e=>!0===e.locked))return;this.hasScrolledToFirstNonLocked=!0;let e=this.commits.toReversed(),t=e.findIndex(e=>!0!==e.locked);if(-1===t)return;let i=e[t];requestAnimationFrame(()=>{let e=this.shadowRoot?.querySelector(`gl-commit-item[data-commit-id="${i.id}"]`);if(!e)return;let t=this.shadowRoot?.querySelector(".container.scrollable");if(!t)return void e.scrollIntoView({block:"center"});let o=e.getBoundingClientRect(),s=t.getBoundingClientRect(),r=o.top-s.top+t.scrollTop-.1*s.height;t.scrollTo({top:Math.max(0,r),behavior:"smooth"})})}initializeSortable(){if(!this.canReorderCommits)return;let e=this.shadowRoot?.querySelector(".commits-only");e&&(this.commitsSortable=s4.create(e,{animation:150,ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",group:{name:"commits",pull:!1,put:!1},filter:(e,t)=>{let i=t.dataset.commitId;if(!i)return!1;let o=this.commits.find(e=>e.id===i);return o?.locked===!0},onMove:e=>{let t=e.dragged.dataset.commitId,i=e.related.dataset.commitId;if(!t||!i)return!0;let o=this.commits.find(e=>e.id===i);if(o?.locked===!0)return!1;let s=this.commits.findIndex(e=>e.id===t),r=this.commits.findIndex(e=>e.id===i);if(-1===s||-1===r)return!0;let a=Math.min(s,r),c=Math.max(s,r);for(let e=a;e<=c;e++)if(!0===this.commits[e].locked&&this.commits[e].id!==t)return!1;return!0},onEnd:e=>{void 0!==e.oldIndex&&void 0!==e.newIndex&&e.oldIndex!==e.newIndex&&this.dispatchCommitReorder(e.oldIndex,e.newIndex)}}))}initializeDropZones(){if(this.isPreviewMode||!this.canReorderCommits)return;let e=this.shadowRoot?.querySelector(".new-commit-drop-zone");e&&this.setupNativeDropZone(e,"new-commit");let t=this.shadowRoot?.querySelector(".unassign-drop-zone");t&&this.setupNativeDropZone(t,"unassign"),this.initializeCommitDropZones()}initializeCommitDropZones(){if(this.isPreviewMode||!this.canReorderCommits)return;let e=this.shadowRoot?.querySelectorAll("gl-commit-item");e?.forEach(e=>{this.setupNativeDropZone(e,"commit")})}setupNativeDropZone(e,t){e.addEventListener("dragover",t=>{t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move"),this.isDraggingHunks&&e.classList.add("drag-over")}),e.addEventListener("dragleave",t=>{t.preventDefault(),!e.contains(t.relatedTarget)&&this.isDraggingHunks&&e.classList.remove("drag-over")}),e.addEventListener("drop",i=>{i.preventDefault(),e.classList.remove("drag-over");let o=this.isDraggingHunks?this.draggedHunkIds:[];if(o.length>0)switch(t){case"new-commit":this.dispatchCreateNewCommit(o);break;case"unassign":this.dispatchUnassignHunks(o);break;case"commit":{let t=e.commitId;t&&this.dispatchMoveHunksToCommit(o,t)}}})}dispatchCommitReorder(e,t){this.dispatchEvent(new CustomEvent("commit-reorder",{detail:{oldIndex:e,newIndex:t},bubbles:!0}))}dispatchCreateNewCommit(e){this.dispatchEvent(new CustomEvent("create-new-commit",{detail:{hunkIds:e},bubbles:!0}))}dispatchUnassignHunks(e){this.dispatchEvent(new CustomEvent("unassign-hunks",{detail:{hunkIds:e},bubbles:!0}))}dispatchMoveHunksToCommit(e,t){this.dispatchEvent(new CustomEvent("move-hunks-to-commit",{detail:{hunkIds:e,targetCommitId:t},bubbles:!0}))}handleHunkDragStart(e){this.isDraggingHunks=!0,this.draggedHunkIds=e.detail.hunkIds||[],this.requestUpdate(),this.addDropZoneHoverEffects()}addDropZoneHoverEffects(){let e=this.shadowRoot?.querySelectorAll(".commit-item"),t=this.shadowRoot?.querySelector(".new-commit-drop-zone"),i=this.shadowRoot?.querySelector(".unassign-drop-zone");e?.forEach(e=>{e.addEventListener("dragenter",this.handleDragEnter),e.addEventListener("dragleave",this.handleDragLeave)}),t&&(t.addEventListener("dragenter",this.handleDragEnter),t.addEventListener("dragleave",this.handleDragLeave)),i&&(i.addEventListener("dragenter",this.handleDragEnter),i.addEventListener("dragleave",this.handleDragLeave))}removeDropZoneHoverEffects(){let e=this.shadowRoot?.querySelectorAll(".commit-item"),t=this.shadowRoot?.querySelector(".new-commit-drop-zone"),i=this.shadowRoot?.querySelector(".unassign-drop-zone");e?.forEach(e=>{e.removeEventListener("dragenter",this.handleDragEnter),e.removeEventListener("dragleave",this.handleDragLeave),e.classList.remove("drag-over")}),t&&(t.removeEventListener("dragenter",this.handleDragEnter),t.removeEventListener("dragleave",this.handleDragLeave),t.classList.remove("drag-over")),i&&(i.removeEventListener("dragenter",this.handleDragEnter),i.removeEventListener("dragleave",this.handleDragLeave),i.classList.remove("drag-over"))}get shouldShowUnassignZone(){if(!this.isDraggingHunks||0===this.draggedHunkIds.length)return!1;let e=this.draggedHunkIds.map(e=>parseInt(e,10)),t=new Set;return this.commits.forEach(e=>{e.hunkIndices.forEach(e=>t.add(e))}),e.some(e=>t.has(e))}get shouldShowNewCommitZone(){return this.isDraggingHunks&&this.draggedHunkIds.length>0}get firstCommitWithoutMessage(){return this.commits.find(e=>!e.message.content||0===e.message.content.trim().length)||null}get shouldShowAddToDraftButton(){return 1===this.commits.length}get aiModelDisplayName(){return this.aiModel?this.aiModel.name||"Unknown Model":"Choose AI Model"}handleHunkDragEnd(){this.isDraggingHunks=!1,this.draggedHunkIds=[],this.removeDropZoneHoverEffects(),this.requestUpdate()}dispatchCommitSelect(e,t){if(t instanceof KeyboardEvent&&"Enter"!==t.key)return;let i=t?.shiftKey??!1;if(i){if(!this.recompose?.enabled){let t=new Set(this._selectedCommitIds);this._selectedCommitId&&0===t.size&&t.add(this._selectedCommitId),t.has(e)?t.delete(e):t.add(e),1===t.size?(this._selectedCommitId=[...t][0],this._selectedCommitIds=new Set):(this._selectedCommitId=null,this._selectedCommitIds=t)}}else this._selectedCommitId=e,this._selectedCommitIds=new Set;this._selectedUnassignedSection=null,this._compositionSummarySelected=!1,this.dispatchAfterPaint(new CustomEvent("commit-select",{detail:{commitId:e,multiSelect:i},bubbles:!0}))}dispatchUnassignedSelect(e,t){t instanceof KeyboardEvent&&"Enter"!==t.key||(this._selectedCommitId=null,this._selectedCommitIds=new Set,this._selectedUnassignedSection=e,this._compositionSummarySelected=!1,this.dispatchAfterPaint(new CustomEvent("unassigned-select",{detail:{section:e},bubbles:!0})))}dispatchCombineCommits(){this.dispatchEvent(new CustomEvent("combine-commits",{bubbles:!0}))}dispatchFinishAndCommit(){this.dispatchEvent(new CustomEvent("finish-and-commit",{bubbles:!0}))}dispatchFocusCommitMessage(e){let t=e||(this.commits.length>0?this.commits[0].id:null);t&&this.dispatchEvent(new CustomEvent("focus-commit-message",{detail:{commitId:t,checkValidity:!0},bubbles:!0}))}dispatchGenerateCommitsWithAI(){this.aiEnabled&&this.dispatchEvent(new CustomEvent("generate-commits-with-ai",{detail:{customInstructions:this.customInstructions},bubbles:!0}))}handleAddAllToDraftCommit(e){let t=rf(this.hunks),i=[];switch(e){case"unstaged":i=t.unstaged;break;case"staged":i=t.staged;break;case"unassigned":i=t.unassigned}0!==i.length&&1===this.commits.length&&this.dispatchEvent(new CustomEvent("add-hunks-to-commit",{detail:{commitId:this.commits[0].id,hunkIndices:i.map(e=>e.index),source:e},bubbles:!0}))}handleGenerateCommitMessageWithAI(){1===this.commits.length&&this.dispatchEvent(new CustomEvent("generate-commit-message",{detail:{commitId:this.commits[0].id},bubbles:!0}))}handleAIModelPickerClick(){this.dispatchEvent(new CustomEvent("select-ai-model",{bubbles:!0}))}handleCompositionSummaryClick(e){e instanceof KeyboardEvent&&"Enter"!==e.key||(this._selectedCommitId=null,this._selectedCommitIds=new Set,this._selectedUnassignedSection=null,this._compositionSummarySelected=!0,this.dispatchAfterPaint(new CustomEvent("select-composition-summary",{bubbles:!0})))}dispatchAfterPaint(e){let t=++this._pendingDispatch;setTimeout(()=>{t===this._pendingDispatch&&this.isConnected&&this.dispatchEvent(e)},0)}handleCompositionFeedbackHelpful(){"helpful"!==this.compositionFeedback&&(this.compositionFeedback="helpful",this.dispatchEvent(new CustomEvent("composition-feedback-helpful",{detail:{sessionId:this.compositionSessionId},bubbles:!0})))}handleCompositionFeedbackUnhelpful(){"unhelpful"!==this.compositionFeedback&&(this.compositionFeedback="unhelpful",this.dispatchEvent(new CustomEvent("composition-feedback-unhelpful",{detail:{sessionId:this.compositionSessionId},bubbles:!0})))}handleCreateCommitsClick(){if(this.isReadyToCommit)this.dispatchFinishAndCommit();else{let e=this.firstCommitWithoutMessage;e&&this.dispatchFocusCommitMessage(e.id)}}handleCancel(){this.dispatchEvent(new CustomEvent("cancel-composer",{bubbles:!0}))}handleCustomInstructionsChange(e){let t=e.target;this.customInstructions=t.value}getIncludeButtonText(e){switch(e){case"unstaged":return"Include Unstaged Changes";case"staged":return"Include Staged Changes";case"commits":return"Include Unassigned Changes";default:return"Include Changes"}}renderUnassignedSection(){let e=rf(this.hunks),t=[];if(e.unstaged.length>0){let i=rb(e.unstaged).length,o=ry(e.unstaged);t.push({key:"unstaged",title:"Unincluded changes (unstaged)",fileCount:i,changes:o})}return t.map(e=>em`
				<div
					class="composer-item is-uncommitted${this._selectedUnassignedSection===e.key?" is-selected":""}"
					tabindex="0"
					@click=${t=>this.dispatchUnassignedSelect(e.key,t)}
					@keydown=${t=>this.dispatchUnassignedSelect(e.key,t)}
				>
					<div class="composer-item__content">
						<div class="composer-item__header">
							<code-icon icon="diff-single"></code-icon>
							${e.title}
						</div>
						<div class="composer-item__body">
							<span class="file-count"
								>${e.fileCount} ${1===e.fileCount?"file":"files"}</span
							>
							<span class="diff-stats">
								<span class="diff-stats__additions">+${e.changes.additions}</span>
								<span class="diff-stats__deletions">-${e.changes.deletions}</span>
							</span>
						</div>
						${oT(this.shouldShowAddToDraftButton,()=>em`
								<div>
									<button-container layout="editor" class="add-to-draft-button-container">
										<gl-button
											full
											appearance="secondary"
											@click=${t=>{t.stopPropagation(),this.handleAddAllToDraftCommit(e.key)}}
										>
											<code-icon icon="plus" slot="prefix"></code-icon>
											${this.getIncludeButtonText(e.key)}
										</gl-button>
									</button-container>
								</div>
							`)}
					</div>
				</div>
			`)}renderCompositionSummarySection(){return em`
			<div class="composition-summary">
				<h3 class="composition-summary__header">Composition Summary</h3>
				<div
					class="composer-item is-summary${this._compositionSummarySelected?" is-selected":""}"
					tabindex="0"
					@click=${this.handleCompositionSummaryClick}
					@keydown=${this.handleCompositionSummaryClick}
				>
					<div class="composer-item__content">
						<div class="composer-item__header">
							<code-icon icon="note"></code-icon>
							<span>Auto-composition Summary</span>
						</div>
					</div>
				</div>

				<!-- Feedback row -->
				<div class="composition-summary__feedback">
					<p class="composition-summary__feedback-label">Was this composition helpful?</p>
					<nav class="composition-summary__feedback-actions">
						<code-icon
							tabindex="0"
							icon=${"helpful"===this.compositionFeedback?"thumbsup-filled":"thumbsup"}
							class="composition-summary__feedback-action${"helpful"===this.compositionFeedback?" is-selected":""}"
							@click=${this.handleCompositionFeedbackHelpful}
						></code-icon>
						<code-icon
							tabindex="0"
							icon=${"unhelpful"===this.compositionFeedback?"thumbsdown-filled":"thumbsdown"}
							class="composition-summary__feedback-action${"unhelpful"===this.compositionFeedback?" is-selected":""}"
							@click=${this.handleCompositionFeedbackUnhelpful}
						></code-icon>
					</nav>
				</div>

				<!-- Instructions -->
				<p class="composition-summary__instructions">
					Review the auto-generated draft commits below to inspect diffs and modify commit messages.
				</p>
			</div>
		`}renderAutoComposeContainer(e=!1){let t=this.hasLockedCommits?this.commits.filter(e=>!e.locked).length:this.recompose?.enabled&&this._selectedCommitIds.size>1?this._selectedCommitIds.size:null;return em`
			<div class="auto-compose${this.hasUsedAutoCompose?" is-used":""}">
				${oT(!this.hasUsedAutoCompose&&!this.isRecomposeLocked,()=>em`
						<h4 class="auto-compose__header">Auto-Compose Commits</h4>
						<p class="auto-compose__description">
							Let AI organize your changes into well-formed commits with clear messages and descriptions
							that help reviewers.
						</p>
					`)}
				${oT(this.isRecomposeLocked,()=>em`
						<h4 class="auto-compose__header">Recompose Commits</h4>
						<p class="auto-compose__description">
							Let AI reorganize work into logical commits with clear messages and descriptions that help
							reviewers.
						</p>
					`)}

				<!-- AI Model Picker -->
				<gl-button
					class="auto-compose__model-picker"
					appearance="toolbar"
					tooltip="Select AI Model"
					@click=${this.handleAIModelPickerClick}
					?disabled=${e}
				>
					${this.aiModelDisplayName}
					<code-icon slot="suffix" icon="chevron-down" size="10"></code-icon>
				</gl-button>

				<!-- Custom instructions input -->
				<div class="auto-compose__instructions">
					<textarea
						class="auto-compose__instructions-input"
						placeholder="Include additional instructions"
						.value=${this.customInstructions}
						rows="1"
						@input=${this.handleCustomInstructionsChange}
						?disabled=${e}
					></textarea>
					<gl-popover placement="bottom" trigger="click focus" class="auto-compose__instructions-info">
						<gl-button slot="anchor" appearance="toolbar">
							<code-icon icon="info"></code-icon>
						</gl-button>
						<div slot="content">
							Providing additional instructions can help steer the AI composition for this session.
							<br /><br />
							Potential instructions include:
							<ul class="instructions-list">
								<li>conventional commits format</li>
								<li>size of commits</li>
								<li>focus on certain changes</li>
							</ul>
							<hr />
							You can also specify custom instructions that apply to all composer sessions with the
							following setting:
							<a
								href=${"command:workbench.action.openSettings?%22@id:gitlens.ai.generateCommits.customInstructions%22"}
								><code class="inline-code"
									><code-icon icon="gear" size="10"></code-icon>
									gitlens.ai.generateCommits.customInstructions</code
								></a
							>
						</div>
					</gl-popover>
				</div>

				<!-- Auto-Compose button -->
				<button-container layout="editor">
					${oT(this.aiEnabled,()=>em`
							<gl-button
								full
								appearance=${this.hasUsedAutoCompose?"secondary":eb}
								?disabled=${e||this.generating||this.committing}
								@click=${this.dispatchGenerateCommitsWithAI}
							>
								<code-icon
									modifier=${this.generating?"spin":""}
									icon=${this.generating?"loading":"sparkle"}
									slot="prefix"
								></code-icon>
								${this.generating?"Generating Commits...":this.hasUsedAutoCompose||this.recompose?.enabled?t?em`Recompose ${t}
												${1===t?"Commit":"Commits"}`:"Recompose Commits":"Auto-Compose Commits"}
							</gl-button>
						`,()=>em`
							<gl-button
								full
								appearance="secondary"
								tooltip=${this.aiDisabledReason||"Auto-Compose Commits is disabled"}
								?disabled=${e}
							>
								<code-icon icon="sparkle" slot="prefix"></code-icon>
								Auto-Compose Commits
							</gl-button>
						`)}
				</button-container>

				<!-- Review text (always visible) -->
				<p class="auto-compose__footer">You will be able to review before committing</p>
			</div>
		`}renderFinishCommitSection(e=!1){return e?em`
				<div class="finish-commit">
					<h3 class="finish-commit__header">${this.finishHeaderText}</h3>
					<p class="finish-commit__description">${this.finishDescriptionText}</p>
					<button-container layout="editor">
						<gl-button full appearance="secondary" disabled>Create Commits</gl-button>
					</button-container>
					<button-container layout="editor" class="cancel-button-container">
						<gl-button full appearance="secondary" disabled>Cancel</gl-button>
					</button-container>
				</div>
			`:this.isRecomposeLocked?em`
				<div class="finish-commit">
					<button-container layout="editor" class="cancel-button-container">
						<gl-button full appearance="secondary" @click=${this.handleCancel}>Cancel</gl-button>
					</button-container>
				</div>
			`:em`
			<!-- Finish & Commit section -->
			<div class="finish-commit">
				${oT(this._selectedCommitIds.size>1&&!this.isPreviewMode,()=>em`
						<h3 class="finish-commit__header">${this.finishHeaderText}</h3>
						<p class="finish-commit__description">
							${this.recompose?.enabled?"The branch will be updated with the new commit structure.":"New commits will be added to your current branch."}
						</p>
						<button-container layout="editor">
							<gl-button
								full
								appearance="secondary"
								?disabled=${this.generating||this.committing}
								@click=${this.dispatchCombineCommits}
							>
								Combine ${this._selectedCommitIds.size} Commits
							</gl-button>
						</button-container>

						<!-- Cancel button -->
						<button-container layout="editor" class="cancel-button-container">
							<gl-button full appearance="secondary" @click=${this.handleCancel}>Cancel</gl-button>
						</button-container>
					`,()=>em`
						<h3 class="finish-commit__header">${this.finishHeaderText}</h3>
						<p class="finish-commit__description">
							${this.isReadyToCommit?this.finishDescriptionText:"Commit the changes in this draft."}
						</p>

						<!-- Single Create Commits button -->
						<button-container layout="editor">
							<gl-button
								full
								.appearance=${!this.isReadyToCommit?"secondary":void 0}
								?disabled=${0===this.commits.length||this.generating||this.committing}
								@click=${this.handleCreateCommitsClick}
							>
								${oT(this.committing,()=>em`<code-icon modifier="spin" icon="loading" slot="prefix"></code-icon>`)}
								${this.committing?"Committing...":`Create ${this.commits.length} ${1===this.commits.length?"Commit":"Commits"}`}
							</gl-button>
						</button-container>

						<!-- Cancel button (always shown) -->
						<button-container layout="editor" class="cancel-button-container">
							<gl-button full appearance="secondary" @click=${this.handleCancel}> Cancel </gl-button>
						</button-container>
					`)}
			</div>
		`}render(){return this.hasChanges?em`
			<div class="container scrollable">
				<div class="working-section">
					<!-- Auto-Compose container at top when not used yet and not in recompose locked mode -->
					${oT(!this.hasUsedAutoCompose&&!this.isRecomposeLocked,()=>this.renderAutoComposeContainer())}
					<div class="commits-list">
						${this.hasUsedAutoCompose&&!this.isRecomposeLocked?this.renderCompositionSummarySection():!this.isRecomposeLocked?this.renderUnassignedSection():""}

						<h3 class="commits-header">${this.isRecomposeLocked?"Commits":"Draft Commits"}</h3>

						<!-- Drop zone for creating new commits (only visible when dragging hunks in interactive mode) -->
						${oT(!this.isPreviewMode&&this.canReorderCommits&&this.shouldShowNewCommitZone,()=>em`
								<div class="new-commit-drop-zone">
									<div class="drop-zone-content">
										<code-icon icon="plus"></code-icon>
										<span>Drop hunks here to create new commit</span>
									</div>
								</div>
							`)}

						<div class="commits-only">
							${lt(this.commits.toReversed(),e=>e.id,(e,t)=>{let i=this._commitChanges.get(e.id);return em`
										<gl-commit-item
											.commitId=${e.id}
											.message=${e.message.content}
											.fileCount=${this._commitFileCounts.get(e.id)??0}
											.additions=${i?.additions??0}
											.deletions=${i?.deletions??0}
											.selected=${this._selectedCommitId===e.id||this._selectedCommitIds.has(e.id)}
											.multiSelected=${this._selectedCommitIds.size>1&&this._selectedCommitIds.has(e.id)}
											.isPreviewMode=${this.isPreviewMode}
											.isRecomposeLocked=${this.isRecomposeLocked}
											.locked=${!0===e.locked}
											?first=${0===t}
											?last=${t===this.commits.length-1&&!this.baseCommit}
											@click=${t=>this.dispatchCommitSelect(e.id,t)}
											@keydown=${t=>this.dispatchCommitSelect(e.id,t)}
										></gl-commit-item>
									`})}
						</div>

						<!-- Base commit (informational only) -->
						<div class="composer-item is-base">
							<div class="composer-item__commit${this.baseCommit?"":" is-empty"}"></div>
							<div class="composer-item__content">
								<div class="composer-item__header${null==this.baseCommit?" is-placeholder":""}">
									${this.baseCommit?.message||"No commits yet"}
								</div>
								<div class="composer-item__body">
									<span class="repo-name">${this.repoName||"Repository"}</span>
									${this.baseCommit?.branchName?em`<span>/ </span
												><span class="branch-name">${this.baseCommit.branchName}</span>`:""}
								</div>
							</div>
						</div>

						<!-- Drop zone for unassigning hunks (hidden when not dragging or in AI preview mode) -->
						${oT(!this.isPreviewMode&&this.shouldShowUnassignZone,()=>em`
								<div class="unassign-drop-zone">
									<div class="drop-zone-content">
										<code-icon icon="trash"></code-icon>
										<span>Drop hunks here to unassign</span>
									</div>
								</div>
							`)}
					</div>
					<!-- Auto-Compose container in original position when already used or in recompose locked mode -->
					${oT(this.hasUsedAutoCompose||this.isRecomposeLocked,()=>this.renderAutoComposeContainer())}
				</div>
				${this.renderFinishCommitSection()}
			</div>
		`:em`
				<div class="container scrollable">
					<div class="working-section">
						${this.renderAutoComposeContainer(!0)}
						<div class="commits-list">
							<h3 class="commits-header">Draft Commits</h3>
							<div class="composer-item">
								<div class="composer-item__commit"></div>
								<div class="composer-item__content">
									<div class="composer-item__header is-empty-state">
										When working directory changes are present, draft commits will appear here.
									</div>
								</div>
							</div>

							<!-- Base commit (informational only) -->
							<div class="composer-item is-base">
								<div class="composer-item__commit${this.baseCommit?"":" is-empty"}"></div>
								<div class="composer-item__content">
									<div
										class="composer-item__header${null==this.baseCommit?" is-placeholder":""}"
									>
										${this.baseCommit?.message||"No commits yet"}
									</div>
									<div class="composer-item__body">
										<span class="repo-name">${this.repoName||"Repository"}</span>
										${this.baseCommit?.branchName?em`<span>/</span
													><span class="branch-name">${this.baseCommit.branchName}</span>`:""}
									</div>
								</div>
							</div>
						</div>
					</div>
					${this.renderFinishCommitSection(!0)}
				</div>
			`}};function ld(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}lc.styles=[rS,rC,r$,aN,rE,a3,a5,a4,S`
			:host {
				display: block;
				height: 100%;
				overflow: hidden;
			}

			.container {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-8);
				height: 100%;
				overflow: hidden auto;
			}

			.working-section {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-16);
			}

			.commits-list {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-4);
			}

			.commits-header {
				margin-block: 0 var(--gl-space-4);
				font-size: var(--gl-font-lg);
			}

			.commits-list > *:not(.commits-header) + .commits-header {
				margin-block-start: var(--gl-space-12);
			}

			.no-changes-message {
				margin-block: var(--gl-space-12);
				font-style: italic;
				color: var(--vscode-descriptionForeground);
				text-align: center;
			}

			.commits-only {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-4);
			}

			.composition-summary {
				margin-bottom: var(--gl-space-4);
			}

			.composition-summary__header {
				margin-block: 0 var(--gl-space-8);
			}

			.composition-summary__feedback {
				display: flex;
				gap: var(--gl-space-8);
				align-items: center;
				justify-content: space-between;
				margin-block: var(--gl-space-8);
				font-size: var(--gl-font-md);
			}

			.composition-summary__feedback-label {
				margin-block: 0;
			}

			.composition-summary__feedback-actions {
				display: flex;
				gap: var(--gl-space-4);
			}

			.composition-summary__feedback-action {
				padding: var(--gl-space-2);
				color: var(--vscode-foreground);
				cursor: pointer;
				border-radius: var(--gl-radius-sm);
				transition: background-color var(--gl-duration-medium) ease;
			}

			.composition-summary__feedback-action:hover,
			.composition-summary__feedback-action:focus {
				background: var(--vscode-toolbar-hoverBackground);
			}

			.composition-summary__feedback-action.is-selected {
				color: var(--vscode-button-foreground);
				background: var(--vscode-button-background);
			}

			.composition-summary__instructions {
				margin-top: var(--gl-space-8);
				font-size: var(--gl-font-md);
				line-height: 1.4;
				color: var(--vscode-descriptionForeground);
			}

			/* Finish & Commit section styles */
			.finish-commit {
				position: sticky;
				bottom: 0;
				z-index: 600;
				padding-block-start: var(--gl-space-8);
				background-color: var(--color-background);
			}

			.finish-commit__header {
				margin-block: 0 var(--gl-space-4);
				font-size: var(--gl-font-lg);
			}

			.finish-commit__description {
				margin-block: 0 var(--gl-space-8);
				font-size: var(--gl-font-md);
				color: var(--vscode-descriptionForeground);
			}

			.cancel-button-container {
				margin-top: var(--gl-space-8);
			}

			.new-commit-drop-zone {
				position: relative;
				z-index: 5; /* Lower z-index than unassign zone */
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: 60px;
				margin-top: 0.5rem;
				font-size: 0.9em;
				color: var(--vscode-descriptionForeground);
				border: 2px dashed var(--vscode-panel-border);
				border-radius: var(--gl-radius-sm);
				transition: all var(--gl-duration-medium) ease;
			}

			.new-commit-drop-zone.drag-over {
				background: var(--vscode-list-dropBackground);
				border-color: var(--vscode-focusBorder);
				box-shadow: 0 0 8px var(--vscode-focusBorder);
			}

			.sortable-ghost-hidden {
				display: none !important;
			}

			.unassign-drop-zone {
				position: relative;
				z-index: 10; /* Higher z-index to prioritize over new commit zone */
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: 60px;
				margin-top: 0.5rem;
				font-size: 0.9em;
				color: var(--vscode-errorForeground);
				background-color: var(--vscode-inputValidation-errorBackground);
				border: 2px dashed var(--vscode-errorForeground);
				border-radius: var(--gl-radius-sm);
				transition: all var(--gl-duration-medium) ease;
			}

			.unassign-drop-zone.hidden {
				display: none;
			}

			.unassign-drop-zone.drag-over {
				background-color: var(--vscode-inputValidation-errorBackground);
				border-color: var(--vscode-errorForeground);
			}

			.drop-zone-content {
				display: flex;
				gap: 0.5rem;
				align-items: center;
				justify-content: center;
			}

			gl-commit-item {
				display: block;
				cursor: grab;
			}

			gl-commit-item:active {
				cursor: grabbing;
			}

			.commit-item.sortable-chosen {
				opacity: 0.5;
			}

			.commit-item.sortable-ghost {
				opacity: 0.3;
			}

			.commit-item.drag-over {
				border: 2px solid var(--vscode-focusBorder);
				box-shadow: 0 0 8px var(--vscode-focusBorder);
			}

			.repo-name,
			.branch-name {
				color: var(--vscode-descriptionForeground);
			}

			/* Include changes button styling */
			.add-to-draft-button-container gl-button {
				color: var(--composer-item-color) !important;
				background: var(--composer-item-background) !important;
			}

			/* Auto-Compose container styles */
			.auto-compose {
				padding: var(--gl-space-12);
				background: var(--gl-gradient-brand-subtle);
				border: var(--gl-border-width) solid var(--vscode-panel-border);
				border-radius: var(--gl-radius-md);
			}

			.auto-compose.is-used {
				margin-block: var(--gl-space-12) 0;
			}

			.auto-compose__header {
				margin-block: 0 var(--gl-space-4);
				font-size: var(--gl-font-base);
				color: var(--vscode-foreground);
			}

			.auto-compose__description {
				margin-block: 0 var(--gl-space-4);
				font-size: var(--gl-font-md);
				line-height: 1.4;
				color: var(--vscode-descriptionForeground);
			}

			.auto-compose__header ~ .auto-compose__model-picker {
				margin-block-start: var(--gl-space-4);
			}

			.auto-compose__instructions {
				display: flex;
				flex-direction: row;
				gap: var(--gl-space-2);
				margin-block: var(--gl-space-8);
			}

			.auto-compose__instructions-info {
				--max-width: 37rem;

				a:has(.inline-code) {
					white-space: nowrap;
					text-decoration: none;
				}

				.inline-code code-icon {
					vertical-align: middle;
				}
			}

			.auto-compose__instructions-input {
				width: 100%;
				padding: 0.5rem;
				font-family: inherit;
				font-size: var(--gl-font-base);
				line-height: 1.8rem;
				color: var(--vscode-input-foreground);
				background: var(--vscode-input-background);
				border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
				border-radius: var(--gl-input-border-radius);
			}

			textarea.auto-compose__instructions-input {
				box-sizing: content-box;
				width: calc(100% - 1rem);
				min-height: 1lh;
				max-height: 4lh;
				resize: vertical;
				resize: none;
				field-sizing: content;
			}

			.auto-compose__instructions-input::placeholder {
				color: var(--vscode-input-placeholderForeground);
			}

			.auto-compose__footer {
				margin-block: var(--gl-space-8) 0;
				font-size: var(--gl-font-sm);
				color: var(--color-foreground--75);
				text-align: center;
			}

			.instructions-list {
				padding-inline-start: var(--gl-space-16);
				margin-block: var(--gl-space-4);
			}
		`],ll([eI({type:Array})],lc.prototype,"commits",2),ll([eI({type:Array})],lc.prototype,"hunks",2),ll([eI({type:String})],lc.prototype,"selectedCommitId",2),ll([eI({type:Object})],lc.prototype,"selectedCommitIds",2),ll([eI({type:String})],lc.prototype,"selectedUnassignedSection",2),ll([eI({type:Boolean})],lc.prototype,"canFinishAndCommit",2),ll([eI({type:Boolean})],lc.prototype,"generating",2),ll([eI({type:Boolean})],lc.prototype,"committing",2),ll([eI({type:Boolean})],lc.prototype,"aiEnabled",2),ll([eI({type:String})],lc.prototype,"aiDisabledReason",2),ll([eI({type:Boolean})],lc.prototype,"isPreviewMode",2),ll([eI({type:Object})],lc.prototype,"recompose",2),ll([eI({type:Boolean})],lc.prototype,"canReorderCommits",2),ll([eI({type:Object})],lc.prototype,"baseCommit",2),ll([eI({type:String})],lc.prototype,"repoName",2),ll([eI({type:String})],lc.prototype,"initialCustomInstructions",2),ll([eA()],lc.prototype,"customInstructions",2),ll([eI({type:Boolean})],lc.prototype,"hasUsedAutoCompose",2),ll([eI({type:Boolean})],lc.prototype,"hasChanges",2),ll([eI({type:Boolean})],lc.prototype,"hasLockedCommits",2),ll([eI({type:Object})],lc.prototype,"aiModel",2),ll([eI({type:Boolean})],lc.prototype,"compositionSummarySelected",2),ll([eI({type:String})],lc.prototype,"compositionFeedback",2),ll([eI({type:String})],lc.prototype,"compositionSessionId",2),ll([eI({type:Boolean})],lc.prototype,"isReadyToCommit",2),ll([eD(".commits-list")],lc.prototype,"changesSection",2),ll([eD(".auto-compose")],lc.prototype,"autoComposeSection",2),ll([eD(".finish-commit")],lc.prototype,"finishSection",2),ll([eA()],lc.prototype,"_selectedCommitId",2),ll([eA()],lc.prototype,"_selectedCommitIds",2),ll([eA()],lc.prototype,"_selectedUnassignedSection",2),ll([eA()],lc.prototype,"_compositionSummarySelected",2),lc=ll([e$("gl-commits-panel")],lc);var lh=ld(),lp={exec:()=>null};function lu(e){let t=[];return i=>{let o=Math.max(0,Math.min(3,i-1)),s=t[o];return s||(s=e(o),t[o]=s),s}}function lm(e,t=""){let i="string"==typeof e?e:e.source,o={replace:(e,t)=>{let s="string"==typeof t?t:t.source;return s=s.replace(lf.caret,"$1"),i=i.replace(e,s),o},getRegex:()=>new RegExp(i,t)};return o}var lg=((e="")=>{try{return!!RegExp("(?<=1)(?<!1)"+e)}catch{return!1}})(),lf={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:lu(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:lu(e=>RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:lu(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:lu(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:lu(e=>RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:lu(e=>RegExp(`^ {0,${e}}>`))},lb=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,lv=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ly=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,lw=lm(ly).replace(/bull/g,lv).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),lk=lm(ly).replace(/bull/g,lv).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),lx=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lC=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,l_=lm(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",lC).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),lS=lm(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,lv).getRegex(),l$="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lE=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,lI=lm("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lE).replace("tag",l$).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),lA=lm(lx).replace("hr",lb).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",l$).getRegex(),lT={blockquote:lm(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",lA).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:l_,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:lb,html:lI,lheading:lw,list:lS,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:lA,table:lp,text:/^[^\n]+/},lD=lm("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",lb).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",l$).getRegex(),lR={...lT,lheading:lk,table:lD,paragraph:lm(lx).replace("hr",lb).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",lD).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",l$).getRegex()},lP={...lT,html:lm("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",lE).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:lp,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:lm(lx).replace("hr",lb).replace("heading",` *#{1,6} *[^
]`).replace("lheading",lw).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lL=/^( {2,}|\\)\n(?!\s*$)/,lM=/[\p{P}\p{S}]/u,lO=/[\s\p{P}\p{S}]/u,lz=/[^\s\p{P}\p{S}]/u,lN=lm(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,lO).getRegex(),lH=/(?!~)[\p{P}\p{S}]/u,lB=lm(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",lg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),lj=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,lF=lm(lj,"u").replace(/punct/g,lM).getRegex(),lq=lm(lj,"u").replace(/punct/g,lH).getRegex(),lU="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",lW=lm(lU,"gu").replace(/notPunctSpace/g,lz).replace(/punctSpace/g,lO).replace(/punct/g,lM).getRegex(),lV=lm(lU,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,lH).getRegex(),lG=lm("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,lz).replace(/punctSpace/g,lO).replace(/punct/g,lM).getRegex(),lY=lm(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,lM).getRegex(),lZ=lm("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,lz).replace(/punctSpace/g,lO).replace(/punct/g,lM).getRegex(),lX=lm(/\\(punct)/,"gu").replace(/punct/g,lM).getRegex(),lK=lm(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),lJ=lm(lE).replace("(?:--\x3e|$)","--\x3e").getRegex(),lQ=lm("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",lJ).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),l0=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,l1=lm(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",l0).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),l2=lm(/^!?\[(label)\]\[(ref)\]/).replace("label",l0).replace("ref",lC).getRegex(),l3=lm(/^!?\[(ref)\](?:\[\])?/).replace("ref",lC).getRegex(),l5=lm("reflink|nolink(?!\\()","g").replace("reflink",l2).replace("nolink",l3).getRegex(),l4=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,l6={_backpedal:lp,anyPunctuation:lX,autolink:lK,blockSkip:lB,br:lL,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:lp,delLDelim:lp,delRDelim:lp,emStrongLDelim:lF,emStrongRDelimAst:lW,emStrongRDelimUnd:lG,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:l1,nolink:l3,punctuation:lN,reflink:l2,reflinkSearch:l5,tag:lQ,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:lp},l8={...l6,link:lm(/^!?\[(label)\]\((.*?)\)/).replace("label",l0).getRegex(),reflink:lm(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",l0).getRegex()},l7={...l6,emStrongRDelimAst:lV,emStrongLDelim:lq,delLDelim:lY,delRDelim:lZ,url:lm(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",l4).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:lm(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",l4).getRegex()},l9={...l7,br:lm(lL).replace("{2,}","*").getRegex(),text:lm(l7.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ce={normal:lT,gfm:lR,pedantic:lP},ct={normal:l6,gfm:l7,breaks:l9,pedantic:l8},ci={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},co=e=>ci[e];function cs(e,t){if(t){if(lf.escapeTest.test(e))return e.replace(lf.escapeReplace,co)}else if(lf.escapeTestNoEncode.test(e))return e.replace(lf.escapeReplaceNoEncode,co);return e}function cr(e){try{e=encodeURI(e).replace(lf.percentDecode,"%")}catch{return null}return e}function cn(e,t){let i=e.replace(lf.findPipe,(e,t,i)=>{let o=!1,s=t;for(;--s>=0&&"\\"===i[s];)o=!o;return o?"|":" |"}).split(lf.splitPipe),o=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;o<i.length;o++)i[o]=i[o].trim().replace(lf.slashPipe,"|");return i}function ca(e,t,i){let o=e.length;if(0===o)return"";let s=0;for(;s<o;){let r=e.charAt(o-s-1);if(r!==t||i)if(r!==t&&i)s++;else break;else s++}return e.slice(0,o-s)}function cl(e){let t=e.split(`
`),i=t.length-1;for(;i>=0&&lf.blankLine.test(t[i]);)i--;return t.length-i<=2?e:t.slice(0,i+1).join(`
`)}function cc(e,t,i,o,s){let r=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");o.state.inLink=!0;let h={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:r,title:a,text:c,tokens:o.inlineTokens(c)};return o.state.inLink=!1,h}var cd=class{options;rules;lexer;constructor(e){this.options=e||lh}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:cl(t[0]),i=e.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e,codeBlockStyle:"indented",text:i}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let o=e.match(i.other.indentCodeCompensation);if(null===o)return t;let s=o[1];return t.split(`
`).map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[o]=t;return o.length>=s.length?e.slice(s.length):e}).join(`
`)}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=ca(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:ca(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ca(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=ca(t[0],`
`).split(`
`),i="",o="",s=[];for(;e.length>0;){let t=!1,r=[],a;for(a=0;a<e.length;a++)if(this.rules.other.blockquoteStart.test(e[a]))r.push(e[a]),t=!0;else if(t)break;else r.push(e[a]);e=e.slice(a);let c=r.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,o=o?`${o}
${h}`:h;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,s,!0),this.lexer.state.top=p,0===e.length)break;let u=s.at(-1);if(u?.type==="code")break;if(u?.type==="blockquote"){let t=u.raw+`
`+e.join(`
`),r=this.blockquote(t);s[s.length-1]=r,i=i.substring(0,i.length-u.raw.length)+r.raw,o=o.substring(0,o.length-u.text.length)+r.text;break}if(u?.type==="list"){let t=u.raw+`
`+e.join(`
`),r=this.list(t);s[s.length-1]=r,i=i.substring(0,i.length-u.raw.length)+r.raw,o=o.substring(0,o.length-u.raw.length)+r.raw,e=t.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),o=i.length>1,s={type:"list",raw:"",ordered:o,start:o?+i.slice(0,-1):"",loose:!1,items:[]};i=o?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=o?i:"[*+-]");let r=this.rules.other.listItemRegex(i),a=!1;for(;e;){let i=!1,o="",c="";if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;o=t[0],e=e.substring(o.length);let h=function(e,t=0){let i=t,o="";for(let t of e)if("	"===t){let e=4-i%4;o+=" ".repeat(e),i+=e}else o+=t,i++;return o}(t[2].split(`
`,1)[0],t[1].length),p=e.split(`
`,1)[0],u=!h.trim(),m=0;if(this.options.pedantic?(m=2,c=h.trimStart()):u?m=t[1].length+1:(m=(m=h.search(this.rules.other.nonSpaceChar))>4?1:m,c=h.slice(m),m+=t[1].length),u&&this.rules.other.blankLine.test(p)&&(o+=p+`
`,e=e.substring(p.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(m),i=this.rules.other.hrRegex(m),s=this.rules.other.fencesBeginRegex(m),r=this.rules.other.headingBeginRegex(m),a=this.rules.other.htmlBeginRegex(m),g=this.rules.other.blockquoteBeginRegex(m);for(;e;){let f=e.split(`
`,1)[0],b;if(p=f,b=this.options.pedantic?p=p.replace(this.rules.other.listReplaceNesting,"  "):p.replace(this.rules.other.tabCharGlobal,"    "),s.test(p)||r.test(p)||a.test(p)||g.test(p)||t.test(p)||i.test(p))break;if(b.search(this.rules.other.nonSpaceChar)>=m||!p.trim())c+=`
`+b.slice(m);else{if(u||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||s.test(h)||r.test(h)||i.test(h))break;c+=`
`+p}u=!p.trim(),o+=f+`
`,e=e.substring(f.length+1),h=b.slice(m)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(o)&&(a=!0)),s.items.push({type:"list_item",raw:o,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),s.raw+=o}let c=s.items.at(-1);if(!c)return;for(let e of(c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd(),s.raw=s.raw.trimEnd(),s.items)){this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]);let t=e.tokens[0];if(e.task&&(t?.type==="text"||t?.type==="paragraph")){e.text=e.text.replace(this.rules.other.listReplaceTask,""),t.raw=t.raw.replace(this.rules.other.listReplaceTask,""),t.text=t.text.replace(this.rules.other.listReplaceTask,"");for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,"");break}let i=this.rules.other.listTaskCheckbox.exec(e.raw);if(i){let t={type:"checkbox",raw:i[0]+" ",checked:"[ ]"!==i[0]};e.checked=t.checked,s.loose?e.tokens[0]&&["paragraph","text"].includes(e.tokens[0].type)&&"tokens"in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:"paragraph",raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&(e.task=!1);if(!s.loose){let t=e.tokens.filter(e=>"space"===e.type);s.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(s.loose)for(let e of s.items)for(let t of(e.loose=!0,e.tokens))"text"===t.type&&(t.type="paragraph");return s}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=cl(t[0]);return{type:"html",block:!0,raw:e,pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:ca(t[0],`
`),href:i,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=cn(t[1]),o=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:ca(t[0],`
`),header:[],align:[],rows:[]};if(i.length===o.length){for(let e of o)this.rules.other.tableAlignRight.test(e)?r.align.push("right"):this.rules.other.tableAlignCenter.test(e)?r.align.push("center"):this.rules.other.tableAlignLeft.test(e)?r.align.push("left"):r.align.push(null);for(let e=0;e<i.length;e++)r.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:r.align[e]});for(let e of s)r.rows.push(cn(e,r.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:r.align[t]})));return r}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:"heading",raw:ca(t[0],`
`),depth:"="===t[2].charAt(0)?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=ca(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e){if(-1===e.indexOf(")"))return -1;let t=0;for(let i=0;i<e.length;i++)if("\\"===e[i])i++;else if("("===e[i])t++;else if(")"===e[i]&&--t<0)return i;return t>0?-2:-1}(t[2]);if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],o="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],o=e[3])}else o=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),cc(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return cc(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let o=this.rules.inline.emStrongLDelim.exec(e);if(!(!o||!o[1]&&!o[2]&&!o[3]&&!o[4]||o[4]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!(o[1]||o[3])||!i||this.rules.inline.punctuation.exec(i))){let i=[...o[0]].length-1,s,r,a=i,c=0,h="*"===o[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+i);null!==(o=h.exec(t));){if(!(s=o[1]||o[2]||o[3]||o[4]||o[5]||o[6]))continue;if(r=[...s].length,o[3]||o[4]){a+=r;continue}if((o[5]||o[6])&&i%3&&!((i+r)%3)){c+=r;continue}if((a-=r)>0)continue;r=Math.min(r,r+a+c);let t=[...o[0]][0].length,h=e.slice(0,i+o.index+t+r);if(Math.min(i,r)%2){let e=h.slice(1,-1);return{type:"em",raw:h,text:e,tokens:this.lexer.inlineTokens(e)}}let p=h.slice(2,-2);return{type:"strong",raw:h,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),o=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&o&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,i=""){let o=this.rules.inline.delLDelim.exec(e);if(o&&(!o[1]||!i||this.rules.inline.punctuation.exec(i))){let i=[...o[0]].length-1,s,r,a=i,c=this.rules.inline.delRDelim;for(c.lastIndex=0,t=t.slice(-1*e.length+i);null!==(o=c.exec(t));){if(!(s=o[1]||o[2]||o[3]||o[4]||o[5]||o[6])||(r=[...s].length)!==i)continue;if(o[3]||o[4]){a+=r;continue}if((a-=r)>0)continue;r=Math.min(r,r+a);let t=[...o[0]][0].length,c=e.slice(0,i+o.index+t+r),h=c.slice(i,-i);return{type:"del",raw:c,text:h,tokens:this.lexer.inlineTokens(h)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return i="@"===t[2]?"mailto:"+(e=t[1]):e=t[1],{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])i="mailto:"+(e=t[0]);else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0])e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},ch=class l{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||lh,this.options.tokenizer=this.options.tokenizer||new cd,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:lf,block:ce.normal,inline:ct.normal};this.options.pedantic?(t.block=ce.pedantic,t.inline=ct.pedantic):this.options.gfm&&(t.block=ce.gfm,this.options.breaks?t.inline=ct.breaks:t.inline=ct.gfm),this.tokenizer.rules=t}static get rules(){return{block:ce,inline:ct}}static lex(e,t){return new l(t).lex(e)}static lexInline(e,t){return new l(t).inlineTokens(e)}lex(e){e=e.replace(lf.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(lf.tabCharGlobal,"    ").replace(lf.spaceLine,""));let o=1/0;for(;e;){let s;if(e.length<o)o=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}if(this.options.extensions?.block?.some(i=>!!(s=i.call({lexer:this},e,t))&&(e=e.substring(s.raw.length),t.push(s),!0)))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=t.at(-1);1===s.raw.length&&void 0!==i?i.raw+=`
`:t.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):t.push(s);continue}if((s=this.tokenizer.fences(e))||(s=this.tokenizer.heading(e))||(s=this.tokenizer.hr(e))||(s=this.tokenizer.blockquote(e))||(s=this.tokenizer.list(e))||(s=this.tokenizer.html(e))){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},t.push(s));continue}if((s=this.tokenizer.table(e))||(s=this.tokenizer.lheading(e))){e=e.substring(s.raw.length),t.push(s);continue}let r=e;if(this.options.extensions?.startBlock){let t=1/0,i=e.slice(1),o;this.options.extensions.startBlock.forEach(e=>{"number"==typeof(o=e.call({lexer:this},i))&&o>=0&&(t=Math.min(t,o))}),t<1/0&&t>=0&&(r=e.substring(0,t+1))}if(this.state.top&&(s=this.tokenizer.paragraph(r))){let o=t.at(-1);i&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):t.push(s),i=r.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=t.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(s);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i;this.tokenizer.lexer=this;let o=e,s=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!==(s=this.tokenizer.rules.inline.reflinkSearch.exec(o));)e.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!==(s=this.tokenizer.rules.inline.anyPunctuation.exec(o));)o=o.slice(0,s.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!==(s=this.tokenizer.rules.inline.blockSkip.exec(o));)i=s[2]?s[2].length:0,o=o.slice(0,s.index+i)+"["+"a".repeat(s[0].length-i-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);o=this.options.hooks?.emStrongMask?.call({lexer:this},o)??o;let r=!1,a="",c=1/0;for(;e;){let i;if(e.length<c)c=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}if(r||(a=""),r=!1,this.options.extensions?.inline?.some(o=>!!(i=o.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if((i=this.tokenizer.escape(e))||(i=this.tokenizer.tag(e))||(i=this.tokenizer.link(e))){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let o=t.at(-1);"text"===i.type&&o?.type==="text"?(o.raw+=i.raw,o.text+=i.text):t.push(i);continue}if((i=this.tokenizer.emStrong(e,o,a))||(i=this.tokenizer.codespan(e))||(i=this.tokenizer.br(e))||(i=this.tokenizer.del(e,o,a))||(i=this.tokenizer.autolink(e))||!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let s=e;if(this.options.extensions?.startInline){let t=1/0,i=e.slice(1),o;this.options.extensions.startInline.forEach(e=>{"number"==typeof(o=e.call({lexer:this},i))&&o>=0&&(t=Math.min(t,o))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(i=this.tokenizer.inlineText(s)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(a=i.raw.slice(-1)),r=!0;let o=t.at(-1);o?.type==="text"?(o.raw+=i.raw,o.text+=i.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){if(this.options.silent);else throw Error("Infinite loop on byte: "+e)}},cp=class{options;parser;constructor(e){this.options=e||lh}space(e){return""}code({text:e,lang:t,escaped:i}){let o=(t||"").match(lf.notSpaceStart)?.[0],s=e.replace(lf.endingNewline,"")+`
`;return o?'<pre><code class="language-'+cs(o)+'">'+(i?s:cs(s,!0))+`</code></pre>
`:"<pre><code>"+(i?s:cs(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,i=e.start,o="";for(let t=0;t<e.items.length;t++){let i=e.items[t];o+=this.listitem(i)}let s=t?"ol":"ul";return"<"+s+(t&&1!==i?' start="'+i+'"':"")+`>
`+o+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let o="";for(let t=0;t<e.rows.length;t++){let s=e.rows[t];i="";for(let e=0;e<s.length;e++)i+=this.tablecell(s[e]);o+=this.tablerow({text:i})}return o&&(o=`<tbody>${o}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+o+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${cs(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let o=this.parser.parseInline(i),s=cr(e);if(null===s)return o;let r='<a href="'+(e=s)+'"';return t&&(r+=' title="'+cs(t)+'"'),r+=">"+o+"</a>"}image({href:e,title:t,text:i,tokens:o}){o&&(i=this.parser.parseInline(o,this.parser.textRenderer));let s=cr(e);if(null===s)return cs(i);e=s;let r=`<img src="${e}" alt="${cs(i)}"`;return t&&(r+=` title="${cs(t)}"`),r+=">"}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:cs(e.text)}},cu=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},cm=class l{options;renderer;textRenderer;constructor(e){this.options=e||lh,this.options.renderer=this.options.renderer||new cp,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new cu}static parse(e,t){return new l(t).parse(e)}static parseInline(e,t){return new l(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let i=0;i<e.length;i++){let o=e[i];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){t+=e||"";continue}}switch(o.type){case"space":t+=this.renderer.space(o);break;case"hr":t+=this.renderer.hr(o);break;case"heading":t+=this.renderer.heading(o);break;case"code":t+=this.renderer.code(o);break;case"table":t+=this.renderer.table(o);break;case"blockquote":t+=this.renderer.blockquote(o);break;case"list":t+=this.renderer.list(o);break;case"checkbox":t+=this.renderer.checkbox(o);break;case"html":t+=this.renderer.html(o);break;case"def":t+=this.renderer.def(o);break;case"paragraph":t+=this.renderer.paragraph(o);break;case"text":t+=this.renderer.text(o);break;default:{let e='Token with "'+o.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let i="";for(let o=0;o<e.length;o++){let s=e[o];if(this.options.extensions?.renderers?.[s.type]){let e=this.options.extensions.renderers[s.type].call({parser:this},s);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){i+=e||"";continue}}switch(s.type){case"escape":case"text":i+=t.text(s);break;case"html":i+=t.html(s);break;case"link":i+=t.link(s);break;case"image":i+=t.image(s);break;case"checkbox":i+=t.checkbox(s);break;case"strong":i+=t.strong(s);break;case"em":i+=t.em(s);break;case"codespan":i+=t.codespan(s);break;case"br":i+=t.br(s);break;case"del":i+=t.del(s);break;default:{let e='Token with "'+s.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return i}},cg=class{options;block;constructor(e){this.options=e||lh}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?ch.lex:ch.lexInline}provideParser(e=this.block){return e?cm.parse:cm.parseInline}},cf=class{defaults=ld();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=cm;Renderer=cp;TextRenderer=cu;Lexer=ch;Tokenizer=cd;Hooks=cg;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let o of e)switch(i=i.concat(t.call(this,o)),o.type){case"table":for(let e of o.header)i=i.concat(this.walkTokens(e.tokens,t));for(let e of o.rows)for(let o of e)i=i.concat(this.walkTokens(o.tokens,t));break;case"list":i=i.concat(this.walkTokens(o.items,t));break;default:{let e=o;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(o=>{let s=e[o].flat(1/0);i=i.concat(this.walkTokens(s,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];i?t.renderers[e.name]=function(...t){let o=e.renderer.apply(this,t);return!1===o&&(o=i.apply(this,t)),o}:t.renderers[e.name]=e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new cp(this.defaults);for(let i in e.renderer){if(!(i in t))throw Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=e.renderer[i],s=t[i];t[i]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=s.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new cd(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=e.tokenizer[i],s=t[i];t[i]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=s.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new cg;for(let i in e.hooks){if(!(i in t))throw Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=e.hooks[i],s=t[i];cg.passThroughHooks.has(i)?t[i]=e=>{if(this.defaults.async&&cg.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await o.call(t,e);return s.call(t,i)})();let r=o.call(t,e);return s.call(t,r)}:t[i]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await o.apply(t,e);return!1===i&&(i=await s.apply(t,e)),i})();let i=o.apply(t,e);return!1===i&&(i=s.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,o=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(o.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ch.lex(e,t??this.defaults)}parser(e,t){return cm.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let o={...i},s={...this.defaults,...o},r=this.onError(!!s.silent,!!s.async);if(!0===this.defaults.async&&!1===o.async)return r(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return r(Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return r(Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,o=await (s.hooks?await s.hooks.provideLexer(e):e?ch.lex:ch.lexInline)(i,s),r=s.hooks?await s.hooks.processAllTokens(o):o;s.walkTokens&&await Promise.all(this.walkTokens(r,s.walkTokens));let a=await (s.hooks?await s.hooks.provideParser(e):e?cm.parse:cm.parseInline)(r,s);return s.hooks?await s.hooks.postprocess(a):a})().catch(r);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer(e):e?ch.lex:ch.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let o=(s.hooks?s.hooks.provideParser(e):e?cm.parse:cm.parseInline)(i,s);return s.hooks&&(o=s.hooks.postprocess(o)),o}catch(e){return r(e)}}}onError(e,t){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e="<p>An error occurred:</p><pre>"+cs(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},cb=new cf;function cv(e,t){return cb.parse(e,t)}cv.options=cv.setOptions=function(e){return cb.setOptions(e),cv.defaults=cb.defaults,lh=cv.defaults,cv},cv.getDefaults=ld,cv.defaults=lh,cv.use=function(...e){return cb.use(...e),cv.defaults=cb.defaults,lh=cv.defaults,cv},cv.walkTokens=function(e,t){return cb.walkTokens(e,t)},cv.parseInline=cb.parseInline,cv.Parser=cm,cv.parser=cm.parse,cv.Renderer=cp,cv.TextRenderer=cu,cv.Lexer=ch,cv.lexer=ch.lex,cv.Tokenizer=cd,cv.Hooks=cg,cv.parse=cv,cv.options,cv.setOptions,cv.use,cv.walkTokens,cv.parseInline,cm.parse,ch.lex;let cy=/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi,cw=/\s*!important\s*$/i;function ck(e){return e.includes("style")?e.replace(cy," data-gl-style=$1"):e}var cx=Object.defineProperty,cC=Object.getOwnPropertyDescriptor,c_=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?cC(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&cx(t,i,r),r};let cS=class extends lit_element_i{constructor(){super(...arguments),this.markdown="",this.density="compact",this.inline=!1}render(){return em`${this.markdown?this.renderMarkdown(this.markdown):""}`}updated(e){for(let t of(super.updated(e),this.renderRoot.querySelectorAll("[data-gl-style]"))){let e=t.dataset.glStyle;e&&function(e,t){for(let i of t.split(";")){let t=i.indexOf(":");if(-1===t)continue;let o=i.slice(0,t).trim();if(!o)continue;let s=i.slice(t+1).trim();if(!s)continue;let r="";cw.test(s)&&(s=s.replace(cw,""),r="important"),e.style.setProperty(o,s,r)}}(t,e),t.removeAttribute("data-gl-style")}}renderMarkdown(e){let t,i,o,s;return this.inline?(r??=new cf({breaks:!1,gfm:!0,renderer:(i=0,o=!1,{blockquote:function({tokens:e}){return this.parser.parse(e)},code:function({text:e}){return`<code>${cI(e)}</code>`},codespan:function({text:e}){return`<code>${cI(e)}</code>`},heading:function({tokens:e}){return this.parser.parseInline(e)},hr:function(){return""},image:function({text:e}){return e||""},link:function({tokens:e}){return this.parser.parseInline(e)},list:function(e){o=e.ordered,i="number"==typeof e.start?e.start:1;let t="";for(let i of e.items)t+=s.call(this,i);return t},listitem:s=function(e){let t,s=this.parser.parse(e.tokens);return e.task?t=e.checked?"☑":"☐":o?(t=`${i}.`,i++):t="•",`${t} ${s.trim()} `},paragraph:function({tokens:e}){return this.parser.parseInline(e)},table:function(){return""},br:function(){return" "},html:function(){return""}})}),t=cO(t=r.parse(cM(e),{async:!1})),em`<span>${r0(ck(t))}</span>`):(a??=new cf({breaks:!0,gfm:!0,renderer:{image:function({href:e,title:t,text:i}){let o=[],s=[];return e&&({href:e,dimensions:o}=function(e){let t=[],i=e.split("|").map(e=>e.trim());e=i[0];let o=i[1];if(o){let e=/height=(\d+)/.exec(o),i=/width=(\d+)/.exec(o),s=e?e[1]:"",r=i?i[1]:"",a=isFinite(parseInt(r)),c=isFinite(parseInt(s));a&&t.push(`width="${r}"`),c&&t.push(`height="${s}"`)}return{href:e,dimensions:t}}(e),s.push(`src="${cN(e)}"`)),i&&s.push(`alt="${cN(i)}"`),t&&s.push(`title="${cN(t)}"`),o.length&&(s=[...s,...o]),`<img ${s.join(" ")}>`},codespan:function({text:e}){return`<code>${cI(e)}</code>`},paragraph:function({tokens:e}){let t=this.parser.parseInline(e);return`<p>${t}</p>`},html:function({text:e}){return e.match(/^(<span[^>]+>)|(<\/\s*span>)$/)?e:""}}}),r0(ck(t=cO(t=a.parse(cM(e),{async:!1})))))}};cS.styles=[aN,S`
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
=		`],c_([eI({type:String})],cS.prototype,"markdown",2),c_([eI({type:String,reflect:!0})],cS.prototype,"density",2),c_([eI({type:Boolean,reflect:!0})],cS.prototype,"inline",2),cS=c_([e$("gl-markdown")],cS);let c$={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},cE=e=>c$[e];function cI(e,t){if(t){if(/[&<>"']/.test(e))return e.replace(/[&<>"']/g,cE)}else if(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/.test(e))return e.replace(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,cE);return e}let cA="[A-Za-z0-9-]+",cT="~[A-Za-z]+",cD=RegExp(`^(${cA})(${cT})?$`),cR=RegExp(`\\$\\(${cA}(?:${cT})?\\)`,"g"),cP=RegExp(`\\\\${cR.source}`,"g"),cL=RegExp(`(\\\\)?\\$\\((${cA}(?:${cT})?)\\)`,"g");function cM(e){return e.replace(cP,e=>`\\${e}`)}function cO(e){let t,i,o=[],s=0;for(;null!==(t=cL.exec(e));){s<(i=t.index||0)&&o.push(e.substring(s,i)),s=(t.index||0)+t[0].length;let[,r,a]=t;o.push(r?`$(${a})`:function(e){let[,t,i]=cD.exec(e.id)??[void 0,"error",void 0];return t.startsWith("gitlens-")&&(t=`gl-${t.substring(8)}`),`<code-icon icon="${t}"${i?` modifier="${i}"`:""}></code-icon>`}({id:a}))}return s<e.length&&o.push(e.substring(s)),o.join("")}let cz=/"/g;function cN(e){return e.replace(cz,"&quot;")}var cH=Object.defineProperty,cB=Object.getOwnPropertyDescriptor,cj=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?cB(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&cH(t,i,r),r};let cF=/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/,cq=class extends lit_element_i{constructor(){super(...arguments),this.selected=!1,this.multiSelected=!1,this.isRename=!1,this.isPreviewMode=!1}connectedCallback(){super.connectedCallback?.(),this.dataset.hunkId=this.hunkId}handleClick(e){this.dispatchEvent(new CustomEvent("hunk-selected",{detail:{hunkId:this.hunkId,shiftKey:e.shiftKey},bubbles:!0}))}render(){return em`
			<div
				class="hunk-item ${this.selected?"selected":""} ${this.multiSelected?"multi-selected":""}"
				@click=${this.handleClick}
			>
				${oT(!this.isPreviewMode,()=>em`
						<div class="drag-handle">
							<code-icon icon="gripper"></code-icon>
						</div>
					`)}
				<div class="hunk-header">
					<div class="file-info">
						${oT(this.isRename,()=>em`<code-icon class="file-icon" icon="arrow-right"></code-icon
									><span class="file-name">File Rename</span>`,()=>em`<span class="file-name">${this.renderHunkHeader()}</span>`)}
					</div>
					<div class="hunk-stats">
						<div class="stat additions">
							<code-icon icon="add"></code-icon>
							${this.additions}
						</div>
						<div class="stat deletions">
							<code-icon icon="remove"></code-icon>
							${this.deletions}
						</div>
					</div>
				</div>
				<div class="hunk-content">
					<div class="code-block">${this.renderDiffContent()}</div>
				</div>
			</div>
		`}renderHunkHeader(){if(!this.hunkHeader)return this.fileName;let e=this.hunkHeader;if(e.startsWith("@@")){let t=e.match(cF);if(t){let[i,o,s,r,a]=t,c=parseInt(r,10),h=c+parseInt(a,10)-1;e=`Lines ${c}-${h}`}}return e}renderDiffContent(){return this.content&&"string"==typeof this.content?this.isRename?em`
				<div class="rename-info">
					<div class="rename-line">
						<code-icon icon="arrow-right"></code-icon>
						<span class="rename-text">
							<span class="original-name">${this.originalFileName}</span>
							<span class="arrow">→</span>
							<span class="new-name">${this.fileName}</span>
						</span>
					</div>
					<div class="similarity-info">
						${this.content.split(`
`).find(e=>e.includes("similarity"))}
					</div>
				</div>
			`:this.content.split(`
`).map(e=>e.startsWith("+")?em`<span class="diff-line addition">${e}</span>`:e.startsWith("-")?em`<span class="diff-line deletion">${e}</span>`:em`<span class="diff-line">${e}</span>`):em`<span class="diff-line">No content available</span>`}};cq.styles=S`
		:host {
			display: block;

			/* margin-bottom: 0.8rem; */
		}

		.hunk-item {
			position: relative;
			cursor: grab;
			user-select: none;
			background: var(--vscode-editor-background);
			border: var(--gl-border-width) solid transparent;
			border-radius: var(--gl-radius-sm);
			transition: all var(--gl-duration-medium) ease;
		}

		.hunk-item:hover {
			border-color: var(--vscode-list-hoverForeground);
			box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
		}

		.hunk-item:active {
			cursor: grabbing;
		}

		.hunk-item.sortable-ghost {
			opacity: 0.5;
			transform: scale(0.5);
		}

		.hunk-item.sortable-chosen {
			transform: scale(1.02);
		}

		.hunk-item.sortable-drag {
			box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
			opacity: 0.5;
			transform: scale(0.5);
		}

		.hunk-item.sortable-selected {
			background: var(--vscode-list-activeSelectionBackground);
			border-color: var(--vscode-focusBorder);
		}

		.hunk-item.multi-selected {
			background: var(--vscode-list-inactiveSelectionBackground);
			border-color: var(--vscode-focusBorder);
			border-style: dashed;
		}

		.hunk-item.multi-selected.selected {
			background: var(--vscode-list-activeSelectionBackground);
			border-style: solid;
		}

		.hunk-header {
			display: flex;

			/* justify-content: space-between; */
			gap: var(--gl-space-8);
			align-items: center;
			padding: var(--gl-space-8);
		}

		.file-info {
			display: flex;
			gap: var(--gl-space-6);
			align-items: center;
		}

		.file-icon {
			color: var(--vscode-symbolIcon-fileForeground);
		}

		.file-name {
			font-weight: 500;
			color: var(--vscode-foreground);
		}

		.hunk-stats {
			display: flex;
			gap: var(--gl-space-8);
			align-items: center;
			font-size: 0.9em;
		}

		.stat {
			display: flex;
			gap: var(--gl-space-2);
			align-items: center;
		}

		.additions {
			color: var(--vscode-gitDecoration-addedResourceForeground);
		}

		.deletions {
			color: var(--vscode-gitDecoration-deletedResourceForeground);
		}

		.hunk-content {
			/* padding: 1.2rem; */
			font-family: var(--vscode-editor-font-family);
			font-size: var(--vscode-editor-font-size);
			line-height: 1.4;
			background: var(--vscode-editor-background);
			border-radius: 0 0 var(--gl-radius-sm) var(--gl-radius-sm);
		}

		.code-block {
			/* border: 1px solid var(--vscode-panel-border);
		border-radius: 4px; */
			padding: var(--gl-space-8);
			overflow-x: auto;
			font-family: var(--vscode-editor-font-family);
			font-size: 0.9em;
			line-height: 1.3;
			white-space: pre-wrap;
			background: var(--vscode-textCodeBlock-background);
		}

		.diff-line {
			display: block;
		}

		.diff-line.addition {
			color: var(--vscode-gitDecoration-addedResourceForeground);
			background: var(--vscode-diffEditor-insertedTextBackground);
		}

		.diff-line.deletion {
			color: var(--vscode-gitDecoration-deletedResourceForeground);
			background: var(--vscode-diffEditor-removedTextBackground);
		}

		.drag-handle {
			position: absolute;
			top: 50%;
			left: 0.4rem;
			color: var(--vscode-descriptionForeground);
			opacity: 0;
			transform: translateY(-50%);
			transition: opacity var(--gl-duration-medium) ease;
		}

		.hunk-item:hover .drag-handle {
			opacity: 1;
		}

		/* Rename-specific styles */
		.rename-info {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.rename-line {
			display: flex;
			gap: var(--gl-space-8);
			align-items: center;
			font-weight: 500;
		}

		.rename-text {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}

		.original-name {
			color: var(--vscode-gitDecoration-deletedResourceForeground);
			text-decoration: line-through;
		}

		.arrow {
			font-weight: bold;
			color: var(--vscode-descriptionForeground);
		}

		.new-name {
			font-weight: 500;
			color: var(--vscode-gitDecoration-addedResourceForeground);
		}

		.similarity-info {
			font-size: 0.9em;
			font-style: italic;
			color: var(--vscode-descriptionForeground);
		}
	`,cj([eI()],cq.prototype,"hunkId",2),cj([eI()],cq.prototype,"fileName",2),cj([eI()],cq.prototype,"hunkHeader",2),cj([eI()],cq.prototype,"content",2),cj([eI({type:Number})],cq.prototype,"additions",2),cj([eI({type:Number})],cq.prototype,"deletions",2),cj([eI({type:Boolean})],cq.prototype,"selected",2),cj([eI({type:Boolean})],cq.prototype,"multiSelected",2),cj([eI({type:Boolean})],cq.prototype,"isRename",2),cj([eI()],cq.prototype,"originalFileName",2),cj([eI({type:Boolean})],cq.prototype,"isPreviewMode",2),cq=cj([e$("gl-hunk-item")],cq),(c=u||(u={})).INSERT="insert",c.DELETE="delete",c.CONTEXT="context",(h=m||(m={})).AUTO="auto",h.DARK="dark",h.LIGHT="light";let cU=RegExp("[-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]","g");function cW(e){return e?e.replace(/\\/g,"/"):e}function cV(e){let t=e.length,i=-1/0;for(let o=0;o<t;o++)i=Math.max(i,e[o]);return i}function cG(e,t){let i=e.split(".");return i.length>1?i[i.length-1]:t}function cY(e,t){return t.reduce((t,i)=>t||e.startsWith(i),!1)}let cZ=["a/","b/","i/","w/","c/","o/"];function cX(e,t,i){let o=void 0!==i?[...cZ,i]:cZ,[,s=""]=(t?RegExp(`^${t.replace(cU,"\\$&")} "?(.+?)"?$`):RegExp('^"?(.+?)"?$')).exec(e)||[],r=o.find(e=>0===s.indexOf(e));return(r?s.slice(r.length):s).replace(/\s+\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)? [+-]\d{4}.*$/,"")}function cK(e,t={}){let i=[],o=null,s=null,r=null,a=null,c=null,h=null,p=null,m="--- ",g="+++ ",f=/^old mode (\d{6})/,b=/^new mode (\d{6})/,v=/^deleted file mode (\d{6})/,w=/^new file mode (\d{6})/,x=/^copy from "?(.+)"?/,C=/^copy to "?(.+)"?/,_=/^rename from "?(.+)"?/,S=/^rename to "?(.+)"?/,$=/^similarity index (\d+)%/,E=/^dissimilarity index (\d+)%/,A=/^index ([\da-z]+)\.\.([\da-z]+)\s*(\d{6})?/,T=/^Binary files (.*) and (.*) differ/,D=/^GIT binary patch/,P=/^index ([\da-z]+),([\da-z]+)\.\.([\da-z]+)/,M=/^mode (\d{6}),(\d{6})\.\.(\d{6})/,O=/^new file mode (\d{6})/,N=/^deleted file mode (\d{6}),(\d{6})/,B=e.replace(/\\ No newline at end of file/g,"").replace(/\r\n?/g,`
`).split(`
`);function j(){null!==s&&null!==o&&(o.blocks.push(s),s=null)}function F(){null!==o&&(o.oldName||null===h||(o.oldName=h),o.newName||null===p||(o.newName=p),o.newName&&(i.push(o),o=null)),h=null,p=null}function q(){j(),F(),o={blocks:[],deletedLines:0,addedLines:0}}function U(e){let t;j(),null!==o&&((t=/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@.*/.exec(e))?(o.isCombined=!1,r=parseInt(t[1],10),c=parseInt(t[2],10)):(t=/^@@@ -(\d+)(?:,\d+)? -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@@.*/.exec(e))?(o.isCombined=!0,r=parseInt(t[1],10),a=parseInt(t[2],10),c=parseInt(t[3],10)):(e.startsWith("@@"),r=0,c=0,o.isCombined=!1)),s={lines:[],oldStartLine:r,oldStartLine2:a,newStartLine:c,header:e}}return B.forEach((e,a)=>{let j;if(!e||e.startsWith("*"))return;let F=B[a-1],W=B[a+1],V=B[a+2];if(e.startsWith("diff --git")||e.startsWith("diff --combined")){if(q(),(j=/^diff --git "?([a-ciow]\/.+)"? "?([a-ciow]\/.+)"?/.exec(e))&&(h=cX(j[1],void 0,t.dstPrefix),p=cX(j[2],void 0,t.srcPrefix)),null===o)throw Error("Where is my file !!!");o.isGitDiff=!0;return}if(e.startsWith("Binary files")&&!(null==o?void 0:o.isGitDiff)){if(q(),(j=/^Binary files "?([a-ciow]\/.+)"? and "?([a-ciow]\/.+)"? differ/.exec(e))&&(h=cX(j[1],void 0,t.dstPrefix),p=cX(j[2],void 0,t.srcPrefix)),null===o)throw Error("Where is my file !!!");o.isBinary=!0;return}if((!o||!o.isGitDiff&&o&&e.startsWith(m)&&W.startsWith(g)&&V.startsWith("@@"))&&q(),null==o?void 0:o.isTooBig)return;if(o&&("number"==typeof t.diffMaxChanges&&o.addedLines+o.deletedLines>t.diffMaxChanges||"number"==typeof t.diffMaxLineLength&&e.length>t.diffMaxLineLength)){o.isTooBig=!0,o.addedLines=0,o.deletedLines=0,o.blocks=[],s=null,U("function"==typeof t.diffTooBigMessage?t.diffTooBigMessage(i.length):"Diff too big to be displayed");return}if(e.startsWith(m)&&W.startsWith(g)||e.startsWith(g)&&F.startsWith(m)){if(o&&!o.oldName&&e.startsWith("--- ")&&(j=cX(e,"---",t.srcPrefix))){o.oldName=j,o.language=cG(o.oldName,o.language);return}if(o&&!o.newName&&e.startsWith("+++ ")&&(j=cX(e,"+++",t.dstPrefix))){o.newName=j,o.language=cG(o.newName,o.language);return}}if(o&&(e.startsWith("@@")||o.isGitDiff&&o.oldName&&o.newName&&!s))return void U(e);if(s&&(e.startsWith("+")||e.startsWith("-")||e.startsWith(" ")))return void function(e){if(null===o||null===s||null===r||null===c)return;let t={content:e},i=o.isCombined?["+ "," +","++"]:["+"],a=o.isCombined?["- "," -","--"]:["-"];cY(e,i)?(o.addedLines++,t.type=u.INSERT,t.oldNumber=void 0,t.newNumber=c++):cY(e,a)?(o.deletedLines++,t.type=u.DELETE,t.oldNumber=r++,t.newNumber=void 0):(t.type=u.CONTEXT,t.oldNumber=r++,t.newNumber=c++),s.lines.push(t)}(e);let G=!function(e,t){let i=t;for(;i<B.length-3&&!e.startsWith("diff");){if(B[i].startsWith(m)&&B[i+1].startsWith(g)&&B[i+2].startsWith("@@"))return!0;i++}return!1}(e,a);if(null===o)throw Error("Where is my file !!!");(j=f.exec(e))?o.oldMode=j[1]:(j=b.exec(e))?o.newMode=j[1]:(j=v.exec(e))?(o.deletedFileMode=j[1],o.isDeleted=!0):(j=w.exec(e))?(o.newFileMode=j[1],o.isNew=!0):(j=x.exec(e))?(G&&(o.oldName=j[1]),o.isCopy=!0):(j=C.exec(e))?(G&&(o.newName=j[1]),o.isCopy=!0):(j=_.exec(e))?(G&&(o.oldName=j[1]),o.isRename=!0):(j=S.exec(e))?(G&&(o.newName=j[1]),o.isRename=!0):(j=T.exec(e))?(o.isBinary=!0,o.oldName=cX(j[1],void 0,t.srcPrefix),o.newName=cX(j[2],void 0,t.dstPrefix),U("Binary file")):D.test(e)?(o.isBinary=!0,U(e)):(j=$.exec(e))?o.unchangedPercentage=parseInt(j[1],10):(j=E.exec(e))?o.changedPercentage=parseInt(j[1],10):(j=A.exec(e))?(o.checksumBefore=j[1],o.checksumAfter=j[2],j[3]&&(o.mode=j[3])):(j=P.exec(e))?(o.checksumBefore=[j[2],j[3]],o.checksumAfter=j[1]):(j=M.exec(e))?(o.oldMode=[j[2],j[3]],o.newMode=j[1]):(j=O.exec(e))?(o.newFileMode=j[1],o.isNew=!0):(j=N.exec(e))&&(o.deletedFileMode=j[1],o.isDeleted=!0)}),j(),F(),i}function cJ(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function cQ(e){return e.nodeName.toLowerCase()}function c0(e){let t=[],i=(e,o)=>{for(let s=e.firstChild;s;s=s.nextSibling)3===s.nodeType&&null!==s.nodeValue?o+=s.nodeValue.length:1===s.nodeType&&(t.push({event:"start",offset:o,node:s}),o=i(s,o),cQ(s).match(/br|hr|img|input/)||t.push({event:"stop",offset:o,node:s}));return o};return i(e,0),t}let c1={"1c":"1c",abnf:"abnf",accesslog:"accesslog",as:"actionscript",adb:"ada",ada:"ada",ads:"ada",angelscript:"angelscript",apache:"apache",applescript:"applescript",scpt:"applescript",arcade:"arcade",cpp:"cpp",hpp:"cpp",arduino:"arduino",ino:"arduino",armasm:"armasm",arm:"armasm",xml:"xml",html:"xml",xhtml:"xml",rss:"xml",atom:"xml",xjb:"xml",xsd:"xml",xsl:"xml",plist:"xml",svg:"xml",asciidoc:"asciidoc",adoc:"asciidoc",asc:"asciidoc",aspectj:"aspectj",ahk:"autohotkey",ahkl:"autohotkey",au3:"autoit",avrasm:"avrasm",awk:"awk",axapta:"axapta","x++":"axapta",bash:"bash",sh:"bash",zsh:"bash",b:"basic",bnf:"bnf",bf:"brainfuck",c:"c",h:"c",cats:"c",idc:"c",cal:"cal",capnproto:"capnproto",capnp:"capnproto",ceylon:"ceylon",clean:"clean",clj:"clojure",boot:"clojure",cl2:"clojure",cljc:"clojure",cljs:"clojure","cljs.hl":"clojure",cljscm:"clojure",cljx:"clojure",hic:"clojure","clojure-repl":"clojure-repl",cmake:"cmake","cmake.in":"cmake",coffee:"coffeescript",_coffee:"coffeescript",cake:"coffeescript",cjsx:"coffeescript",iced:"coffeescript",cson:"coffeescript",coq:"coq",cos:"cos",cls:"cos",crmsh:"crmsh",crm:"crmsh",pcmk:"crmsh",cr:"crystal",cs:"csharp",csx:"csharp",csp:"csp",css:"css",d:"d",di:"d",md:"markdown",markdown:"markdown",mdown:"markdown",mdwn:"markdown",mkd:"markdown",mkdn:"markdown",mkdown:"markdown",ronn:"markdown",workbook:"markdown",dart:"dart",dpr:"delphi",dfm:"delphi",pas:"delphi",pascal:"delphi",diff:"diff",patch:"diff",django:"django",jinja:"django",dns:"dns",zone:"dns",bind:"dns",dockerfile:"dockerfile",docker:"dockerfile",dos:"dos",bat:"dos",cmd:"dos",dsconfig:"dsconfig",dts:"dts",dust:"dust",dst:"dust",ebnf:"ebnf",ex:"elixir",exs:"elixir",elm:"elm",rb:"ruby",builder:"ruby",eye:"ruby",gemspec:"ruby",god:"ruby",jbuilder:"ruby",mspec:"ruby",pluginspec:"ruby",podspec:"ruby",rabl:"ruby",rake:"ruby",rbuild:"ruby",rbw:"ruby",rbx:"ruby",ru:"ruby",ruby:"ruby",spec:"ruby",thor:"ruby",watchr:"ruby",erb:"erb","erlang-repl":"erlang-repl",erl:"erlang","app.src":"erlang",escript:"erlang",hrl:"erlang",xrl:"erlang",yrl:"erlang",excel:"excel",xls:"excel",xlsx:"excel",fix:"fix",flix:"flix",f90:"fortran",f:"fortran",f03:"fortran",f08:"fortran",f77:"fortran",f95:"fortran",for:"fortran",fpp:"fortran",fs:"fsharp",fsx:"fsharp",gams:"gams",gms:"gams",gauss:"gauss",gss:"gauss",gcode:"gcode",nc:"gcode",gherkin:"gherkin",glsl:"glsl",fp:"glsl",frag:"glsl",frg:"glsl",fsh:"glsl",fshader:"glsl",geo:"glsl",geom:"glsl",glslv:"glsl",gshader:"glsl",shader:"glsl",tesc:"glsl",tese:"glsl",vert:"glsl",vrx:"glsl",vsh:"glsl",vshader:"glsl",gml:"gml",go:"go",bal:"go",golo:"golo",gololang:"golo",gradle:"gradle",groovy:"groovy",grt:"groovy",gtpl:"groovy",gvy:"groovy",haml:"haml","haml.deface":"haml",handlebars:"handlebars",hbs:"handlebars","html.hbs":"handlebars","html.handlebars":"handlebars",hs:"haskell",hsc:"haskell",idr:"haskell",purs:"haskell",hx:"haxe",hxsl:"haxe",hsp:"hsp",htmlbars:"htmlbars",http:"http",https:"http",hy:"hy",inform7:"inform7",i7:"inform7",ini:"ini",toml:"ini",cfg:"ini",prefs:"ini",irpf90:"irpf90",isbl:"isbl",java:"java",jsp:"java",js:"javascript",jsx:"javascript",_js:"javascript",bones:"javascript",es:"javascript",es6:"javascript",gs:"javascript",jake:"javascript",jsb:"javascript",jscad:"javascript",jsfl:"javascript",jsm:"javascript",jss:"javascript",mjs:"javascript",njs:"javascript",pac:"javascript",sjs:"javascript",ssjs:"javascript",xsjs:"javascript",xsjslib:"javascript",cfc:"javascript","jboss-cli":"jboss-cli",json:"json",avsc:"json",geojson:"json",gltf:"json","JSON-tmLanguage":"json",jsonl:"json",tfstate:"json","tfstate.backup":"json",topojson:"json",webapp:"json",webmanifest:"json",jl:"julia","julia-repl":"julia-repl",kt:"kotlin",ktm:"kotlin",kts:"kotlin",lasso:"lasso",lassoscript:"lasso",tex:"latex",ldif:"ldif",leaf:"leaf",less:"less",lisp:"lisp",factor:"lisp",livecodeserver:"livecodeserver",ls:"livescript",_ls:"livescript",llvm:"llvm",lsl:"lsl",lua:"lua",nse:"lua",p8:"lua",pd_lua:"lua",rbxs:"lua",wlua:"lua",mak:"makefile",make:"makefile",mk:"makefile",mkfile:"makefile",mathematica:"mathematica",mma:"mathematica",wl:"mathematica",matlab:"matlab",maxima:"maxima",mel:"mel",mercury:"mercury",mipsasm:"mipsasm",miz:"mizar",voc:"mizar",al:"perl",cgi:"perl",fcgi:"perl",perl:"perl",ph:"perl",plx:"perl",pl:"perl",pm:"perl",psgi:"perl",t:"perl",mojolicious:"mojolicious",monkey:"monkey",monkey2:"monkey",moonscript:"moonscript",moon:"moonscript",n1ql:"n1ql",nginxconf:"nginx",nim:"nim",nimrod:"nim",nix:"nix",nsi:"nsis",nsh:"nsis",m:"objectivec",objc:"objectivec",mm:"objectivec","obj-c":"objectivec","obj-c++":"objectivec","objective-c++":"objectivec",fun:"ocaml",sig:"ocaml",ml:"ocaml",mli:"ocaml",eliom:"ocaml",eliomi:"ocaml",ml4:"ocaml",mll:"ocaml",mly:"ocaml",openscad:"openscad",oxygene:"oxygene",parser3:"parser3",pf:"pf","pf.conf":"pf",pgsql:"pgsql",postgres:"pgsql",postgresql:"pgsql",php:"php",aw:"php",ctp:"php",inc:"php",php3:"php",php4:"php",php5:"php",phps:"php",phpt:"php","php-template":"php-template",plaintext:"plaintext",txt:"plaintext",text:"plaintext",pony:"pony",ps:"powershell",ps1:"powershell",psd1:"powershell",psm1:"powershell",pde:"processing",profile:"profile",pro:"prolog",prolog:"prolog",yap:"prolog",properties:"properties",proto:"protobuf",puppet:"puppet",pp:"puppet",purebasic:"purebasic",py:"python",bzl:"python",gyp:"python",gypi:"python",lmi:"python",py3:"python",pyde:"python",pyi:"python",pyp:"python",pyt:"python",pyw:"python",rpy:"python",tac:"python",wsgi:"python",xpy:"python","python-repl":"python-repl",pycon:"python-repl",q:"q",k:"q",kdb:"q",qml:"qml",r:"r",rd:"r",rsx:"r",reasonml:"reasonml",re:"reasonml",rib:"rib",roboconf:"roboconf",graph:"roboconf",instances:"roboconf",routeros:"routeros",rsl:"rsl",ruleslanguage:"ruleslanguage",rs:"rust","rs.in":"rust",sas:"sas",scala:"scala",kojo:"scala",sbt:"scala",sc:"scala",scm:"scheme",sch:"scheme",sld:"scheme",sls:"scheme",sps:"scheme",ss:"scheme",rkt:"scheme",scilab:"scilab",scss:"scss",shell:"shell",smali:"smali",st:"smalltalk",sml:"sml",sqf:"sqf",sql:"sql",cql:"sql",ddl:"sql",mysql:"sql",prc:"sql",tab:"sql",udf:"sql",viw:"sql",stan:"stan",stanfuncs:"stan",stata:"stata",step21:"step21",step:"step21",stp:"step21",styl:"stylus",subunit:"subunit",swift:"swift",taggerscript:"taggerscript",yml:"yaml",mir:"yaml",reek:"yaml",rviz:"yaml","sublime-syntax":"yaml",syntax:"yaml",yaml:"yaml","yaml-tmlanguage":"yaml","yml.mysql":"yaml",tap:"tap",tcl:"tcl",adp:"tcl",tm:"tcl",thrift:"thrift",tp:"tp",twig:"twig",craftcms:"twig",ts:"typescript",tsx:"typescript",vala:"vala",vbnet:"vbnet",vb:"vbnet",vbscript:"vbscript",vbs:"vbscript","vbscript-html":"vbscript-html",v:"verilog",veo:"verilog",vhdl:"vhdl",vhd:"vhdl",vhf:"vhdl",vhi:"vhdl",vho:"vhdl",vhs:"vhdl",vht:"vhdl",vhw:"vhdl",vim:"vim",x86asm:"x86asm",xl:"xl",xquery:"xquery",xpath:"xquery",xq:"xquery",zephir:"zephir",zep:"zephir"};let Diff=class Diff{diff(e,t,i={}){let o;"function"==typeof i?(o=i,i={}):"callback"in i&&(o=i.callback);let s=this.castInput(e,i),r=this.castInput(t,i),a=this.removeEmpty(this.tokenize(s,i)),c=this.removeEmpty(this.tokenize(r,i));return this.diffWithOptionsObj(a,c,i,o)}diffWithOptionsObj(e,t,i,o){var s;let r=e=>(e=this.postProcess(e,i),o)?void setTimeout(function(){o(e)},0):e,a=t.length,c=e.length,h=1,p=a+c;null!=i.maxEditLength&&(p=Math.min(p,i.maxEditLength));let u=null!=(s=i.timeout)?s:1/0,m=Date.now()+u,g=[{oldPos:-1,lastComponent:void 0}],f=this.extractCommon(g[0],t,e,0,i);if(g[0].oldPos+1>=c&&f+1>=a)return r(this.buildValues(g[0].lastComponent,t,e));let b=-1/0,v=1/0,w=()=>{for(let o=Math.max(b,-h);o<=Math.min(v,h);o+=2){let s,h=g[o-1],p=g[o+1];h&&(g[o-1]=void 0);let u=!1;if(p){let e=p.oldPos-o;u=p&&0<=e&&e<a}let m=h&&h.oldPos+1<c;if(!u&&!m){g[o]=void 0;continue}if(s=!m||u&&h.oldPos<p.oldPos?this.addToPath(p,!0,!1,0,i):this.addToPath(h,!1,!0,1,i),f=this.extractCommon(s,t,e,o,i),s.oldPos+1>=c&&f+1>=a)return r(this.buildValues(s.lastComponent,t,e))||!0;g[o]=s,s.oldPos+1>=c&&(v=Math.min(v,o-1)),f+1>=a&&(b=Math.max(b,o+1))}h++};if(o)!function e(){setTimeout(function(){if(h>p||Date.now()>m)return o(void 0);w()||e()},0)}();else for(;h<=p&&Date.now()<=m;){let e=w();if(e)return e}}addToPath(e,t,i,o,s){let r=e.lastComponent;return r&&!s.oneChangePerToken&&r.added===t&&r.removed===i?{oldPos:e.oldPos+o,lastComponent:{count:r.count+1,added:t,removed:i,previousComponent:r.previousComponent}}:{oldPos:e.oldPos+o,lastComponent:{count:1,added:t,removed:i,previousComponent:r}}}extractCommon(e,t,i,o,s){let r=t.length,a=i.length,c=e.oldPos,h=c-o,p=0;for(;h+1<r&&c+1<a&&this.equals(i[c+1],t[h+1],s);)h++,c++,p++,s.oneChangePerToken&&(e.lastComponent={count:1,previousComponent:e.lastComponent,added:!1,removed:!1});return p&&!s.oneChangePerToken&&(e.lastComponent={count:p,previousComponent:e.lastComponent,added:!1,removed:!1}),e.oldPos=c,h}equals(e,t,i){return i.comparator?i.comparator(e,t):e===t||!!i.ignoreCase&&e.toLowerCase()===t.toLowerCase()}removeEmpty(e){let t=[];for(let i=0;i<e.length;i++)e[i]&&t.push(e[i]);return t}castInput(e,t){return e}tokenize(e,t){return Array.from(e)}join(e){return e.join("")}postProcess(e,t){return e}get useLongestToken(){return!1}buildValues(e,t,i){let o,s=[];for(;e;)s.push(e),o=e.previousComponent,delete e.previousComponent,e=o;s.reverse();let r=s.length,a=0,c=0,h=0;for(;a<r;a++){let e=s[a];if(e.removed)e.value=this.join(i.slice(h,h+e.count)),h+=e.count;else{if(!e.added&&this.useLongestToken){let o=t.slice(c,c+e.count);o=o.map(function(e,t){let o=i[h+t];return o.length>e.length?o:e}),e.value=this.join(o)}else e.value=this.join(t.slice(c,c+e.count));c+=e.count,e.added||(h+=e.count)}}return s}};let CharacterDiff=class CharacterDiff extends Diff{};let c2=new CharacterDiff;function c3(e,t){let i;for(i=0;i<e.length&&i<t.length&&e[i]==t[i];i++);return e.slice(0,i)}function c5(e,t){let i;if(!e||!t||e[e.length-1]!=t[t.length-1])return"";for(i=0;i<e.length&&i<t.length&&e[e.length-(i+1)]==t[t.length-(i+1)];i++);return e.slice(-i)}function c4(e,t,i){if(e.slice(0,t.length)!=t)throw Error(`string ${JSON.stringify(e)} doesn't start with prefix ${JSON.stringify(t)}; this is a bug`);return i+e.slice(t.length)}function c6(e,t,i){if(!t)return e+i;if(e.slice(-t.length)!=t)throw Error(`string ${JSON.stringify(e)} doesn't end with suffix ${JSON.stringify(t)}; this is a bug`);return e.slice(0,-t.length)+i}function c8(e,t){return c4(e,t,"")}function c7(e,t){return t.slice(0,function(e,t){let i=0;e.length>t.length&&(i=e.length-t.length);let o=t.length;e.length<t.length&&(o=e.length);let s=Array(o),r=0;s[0]=0;for(let e=1;e<o;e++){for(t[e]==t[r]?s[e]=s[r]:s[e]=r;r>0&&t[e]!=t[r];)r=s[r];t[e]==t[r]&&r++}r=0;for(let o=i;o<e.length;o++){for(;r>0&&e[o]!=t[r];)r=s[r];e[o]==t[r]&&r++}return r}(e,t))}function c9(e,t){let i=[];for(let o of Array.from(t.segment(e))){let e=o.segment;i.length&&/\s/.test(i[i.length-1])&&/\s/.test(e)?i[i.length-1]+=e:i.push(e)}return i}function de(e,t){let i;if(t)return di(e,t)[1];for(i=e.length-1;i>=0&&e[i].match(/\s/);i--);return e.substring(i+1)}function dt(e,t){if(t)return di(e,t)[0];let i=e.match(/^\s*/);return i?i[0]:""}function di(e,t){if(!t)return[dt(e),de(e)];if("word"!=t.resolvedOptions().granularity)throw Error('The segmenter passed must have a granularity of "word"');let i=c9(e,t),o=i[0],s=i[i.length-1];return[/\s/.test(o)?o:"",/\s/.test(s)?s:""]}let ds="a-zA-Z0-9_\\u{AD}\\u{C0}-\\u{D6}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}",dr=RegExp(`[${ds}]+|\\s+|[^${ds}]`,"ug");let WordDiff=class WordDiff extends Diff{equals(e,t,i){return i.ignoreCase&&(e=e.toLowerCase(),t=t.toLowerCase()),e.trim()===t.trim()}tokenize(e,t={}){let i;if(t.intlSegmenter){let o=t.intlSegmenter;if("word"!=o.resolvedOptions().granularity)throw Error('The segmenter passed must have a granularity of "word"');i=c9(e,o)}else i=e.match(dr)||[];let o=[],s=null;return i.forEach(e=>{/\s/.test(e)?null==s?o.push(e):o.push(o.pop()+e):null!=s&&/\s/.test(s)?o[o.length-1]==s?o.push(o.pop()+e):o.push(s+e):o.push(e),s=e}),o}join(e){return e.map((e,t)=>0==t?e:e.replace(/^\s+/,"")).join("")}postProcess(e,t){if(!e||t.oneChangePerToken)return e;let i=null,o=null,s=null;return e.forEach(e=>{e.added?o=e:e.removed?s=e:((o||s)&&dn(i,s,o,e,t.intlSegmenter),i=e,o=null,s=null)}),(o||s)&&dn(i,s,o,null,t.intlSegmenter),e}};function dn(e,t,i,o,s){var r,a,c,h;if(t&&i){let[c,h]=di(t.value,s),[p,u]=di(i.value,s);if(e){let o=c3(c,p);e.value=c6(e.value,p,o),t.value=c8(t.value,o),i.value=c8(i.value,o)}if(o){let e=c5(h,u);o.value=c4(o.value,u,e),r=t.value,t.value=c6(r,e,""),a=i.value,i.value=c6(a,e,"")}}else if(i){if(e){let e=dt(i.value,s);i.value=i.value.substring(e.length)}if(o){let e=dt(o.value,s);o.value=o.value.substring(e.length)}}else if(e&&o){let i=dt(o.value,s),[r,a]=di(t.value,s),h=c3(i,r);t.value=c8(t.value,h);let p=c5(c8(i,h),a);c=t.value,t.value=c6(c,p,""),o.value=c4(o.value,i,p),e.value=c6(e.value,i,i.slice(0,i.length-p.length))}else if(o){let e=dt(o.value,s),i=c7(de(t.value,s),e);h=t.value,t.value=c6(h,i,"")}else if(e){let i=c7(de(e.value,s),dt(t.value,s));t.value=c8(t.value,i)}}new WordDiff;let WordsWithSpaceDiff=class WordsWithSpaceDiff extends Diff{tokenize(e){let t=RegExp(`(\\r?\\n)|[${ds}]+|[^\\S\\n\\r]+|[^${ds}]`,"ug");return e.match(t)||[]}};let da=new WordsWithSpaceDiff;function dl(e){return(t,i)=>{let o=e(t).trim(),s=e(i).trim();return function(e,t){let i,o;if(0===e.length)return t.length;if(0===t.length)return e.length;let s=[];for(i=0;i<=t.length;i++)s[i]=[i];for(o=0;o<=e.length;o++)s[0][o]=o;for(i=1;i<=t.length;i++)for(o=1;o<=e.length;o++)t.charAt(i-1)===e.charAt(o-1)?s[i][o]=s[i-1][o-1]:s[i][o]=Math.min(s[i-1][o-1]+1,Math.min(s[i][o-1]+1,s[i-1][o]+1));return s[t.length][e.length]}(o,s)/(o.length+s.length)}}function dc(e){return function t(i,o,s=0,r=new Map){let a=function(t,i,o=new Map){let s,r=1/0;for(let a=0;a<t.length;++a)for(let c=0;c<i.length;++c){let h,p=JSON.stringify([t[a],i[c]]);o.has(p)&&(h=o.get(p))||(h=e(t[a],i[c]),o.set(p,h)),h<r&&(s={indexA:a,indexB:c,score:r=h})}return s}(i,o,r);if(!a||i.length+o.length<3)return[[i,o]];let c=i.slice(0,a.indexA),h=o.slice(0,a.indexB),p=[i[a.indexA]],u=[o[a.indexB]],m=a.indexA+1,g=a.indexB+1,f=i.slice(m),b=o.slice(g),v=t(c,h,s+1,r),w=t(p,u,s+1,r),x=t(f,b,s+1,r),C=w;return(a.indexA>0||a.indexB>0)&&(C=v.concat(C)),(i.length>m||o.length>g)&&(C=C.concat(x)),C}}let dd={INSERTS:"d2h-ins",DELETES:"d2h-del",CONTEXT:"d2h-cntx",INFO:"d2h-info",INSERT_CHANGES:"d2h-ins d2h-change",DELETE_CHANGES:"d2h-del d2h-change"},dh={matching:"none",matchWordsThreshold:.25,maxLineLengthHighlight:1e4,diffStyle:"word",colorScheme:m.LIGHT},dp=dl(e=>e.value),du=dc(dp);function dm(e){return -1!==e.indexOf("dev/null")}function dg(e){switch(e){case u.CONTEXT:return dd.CONTEXT;case u.INSERT:return dd.INSERTS;case u.DELETE:return dd.DELETES}}function df(e){switch(e){case m.DARK:return"d2h-dark-color-scheme";case m.AUTO:return"d2h-auto-color-scheme";case m.LIGHT:default:return"d2h-light-color-scheme"}}function db(e){return e.slice(0).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")}function dv(e,t,i=!0){let o=t?2:1;return{prefix:e.substring(0,o),content:i?db(e.substring(o)):e.substring(o)}}function dy(e){let t=cW(e.oldName),i=cW(e.newName);if(t===i||dm(t)||dm(i))if(!dm(i))return i;else return t;{let e=[],o=[],s=t.split("/"),r=i.split("/"),a=s.length,c=r.length,h=0,p=a-1,u=c-1;for(;h<p&&h<u;)if(s[h]===r[h])e.push(r[h]),h+=1;else break;for(;p>h&&u>h;)if(s[p]===r[u])o.unshift(r[u]),p-=1,u-=1;else break;let m=e.join("/"),g=o.join("/"),f=s.slice(h,p+1).join("/"),b=r.slice(h,u+1).join("/");return m.length&&g.length?m+"/{"+f+" → "+b+"}/"+g:m.length?m+"/{"+f+" → "+b+"}":g.length?"{"+f+" → "+b+"}/"+g:t+" → "+i}}function dw(e){return`d2h-${(function(e){let t,i,o=0;for(t=0,i=e.length;t<i;t++)o=(o<<5)-o+e.charCodeAt(t)|0;return o})(dy(e)).toString().slice(-6)}`}function dk(e){let t="file-changed";return e.isRename||e.isCopy?t="file-renamed":e.isNew?t="file-added":e.isDeleted?t="file-deleted":e.newName!==e.oldName&&(t="file-renamed"),t}function dx(e,t,i,o={}){var s,r,a,c;let{matching:h,maxLineLengthHighlight:p,matchWordsThreshold:u,diffStyle:m}=Object.assign(Object.assign({},dh),o),g=dv(e,i,!1),f=dv(t,i,!1);if(g.content.length>p||f.content.length>p)return{oldLine:{prefix:g.prefix,content:db(g.content)},newLine:{prefix:f.prefix,content:db(f.content)}};let b="char"===m?(s=g.content,r=f.content,c2.diff(s,r,void 0)):(a=g.content,c=f.content,da.diff(a,c,void 0)),v=[];if("word"===m&&"words"===h){let e=b.filter(e=>e.removed);du(b.filter(e=>e.added),e).forEach(e=>{1===e[0].length&&1===e[1].length&&dp(e[0][0],e[1][0])<u&&(v.push(e[0][0]),v.push(e[1][0]))})}let w=b.reduce((e,t)=>{let i=t.added?"ins":t.removed?"del":null,o=v.indexOf(t)>-1?' class="d2h-change"':"",s=db(t.value);return null!==i?`${e}<${i}${o}>${s}</${i}>`:`${e}${s}`},"");return{oldLine:{prefix:g.prefix,content:w.replace(/(<ins[^>]*>((.|\n)*?)<\/ins>)/g,"")},newLine:{prefix:f.prefix,content:w.replace(/(<del[^>]*>((.|\n)*?)<\/del>)/g,"")}}}let dC="file-summary",d_={colorScheme:dh.colorScheme};let FileListRenderer=class FileListRenderer{constructor(e,t={}){this.hoganUtils=e,this.config=Object.assign(Object.assign({},d_),t)}render(e){let t=e.map(e=>this.hoganUtils.render(dC,"line",{fileHtmlId:dw(e),oldName:e.oldName,newName:e.newName,fileName:dy(e),deletedLines:"-"+e.deletedLines,addedLines:"+"+e.addedLines},{fileIcon:this.hoganUtils.template("icon",dk(e))})).join(`
`);return this.hoganUtils.render(dC,"wrapper",{colorScheme:df(this.config.colorScheme),filesNumber:e.length,files:t})}};let dS=Object.assign(Object.assign({},dh),{renderNothingWhenEmpty:!1,matchingMaxComparisons:2500,maxLineSizeInBlockForComparison:200}),d$="generic",dE="line-by-line";let LineByLineRenderer=class LineByLineRenderer{constructor(e,t={}){this.hoganUtils=e,this.config=Object.assign(Object.assign({},dS),t)}render(e){let t=e.map(e=>{let t;return t=e.blocks.length?this.generateFileHtml(e):this.generateEmptyDiff(),this.makeFileDiffHtml(e,t)}).join(`
`);return this.hoganUtils.render(d$,"wrapper",{colorScheme:df(this.config.colorScheme),content:t})}makeFileDiffHtml(e,t){if(this.config.renderNothingWhenEmpty&&Array.isArray(e.blocks)&&0===e.blocks.length)return"";let i=this.hoganUtils.template(dE,"file-diff"),o=this.hoganUtils.template(d$,"file-path"),s=this.hoganUtils.template("icon","file"),r=this.hoganUtils.template("tag",dk(e));return i.render({file:e,fileHtmlId:dw(e),diffs:t,filePath:o.render({fileDiffName:dy(e)},{fileIcon:s,fileTag:r})})}generateEmptyDiff(){return this.hoganUtils.render(d$,"empty-diff",{contentClass:"d2h-code-line",CSSLineClass:dd})}generateFileHtml(e){let t=dc(dl(t=>dv(t.content,e.isCombined).content));return e.blocks.map(i=>{let o=this.hoganUtils.render(d$,"block-header",{CSSLineClass:dd,blockHeader:e.isTooBig?i.header:db(i.header),lineClass:"d2h-code-linenumber",contentClass:"d2h-code-line"});return this.applyLineGroupping(i).forEach(([i,s,r])=>{if(s.length&&r.length&&!i.length)this.applyRematchMatching(s,r,t).map(([t,i])=>{let{left:s,right:r}=this.processChangedLines(e,e.isCombined,t,i);o+=s,o+=r});else if(i.length)i.forEach(t=>{let{prefix:i,content:s}=dv(t.content,e.isCombined);o+=this.generateSingleLineHtml(e,{type:dd.CONTEXT,prefix:i,content:s,oldNumber:t.oldNumber,newNumber:t.newNumber})});else if(s.length||r.length){let{left:t,right:i}=this.processChangedLines(e,e.isCombined,s,r);o+=t,o+=i}}),o}).join(`
`)}applyLineGroupping(e){let t=[],i=[],o=[];for(let s=0;s<e.lines.length;s++){let r=e.lines[s];(r.type!==u.INSERT&&o.length||r.type===u.CONTEXT&&i.length>0)&&(t.push([[],i,o]),i=[],o=[]),r.type===u.CONTEXT?t.push([[r],[],[]]):r.type===u.INSERT&&0===i.length?t.push([[],[],[r]]):r.type===u.INSERT&&i.length>0?o.push(r):r.type===u.DELETE&&i.push(r)}return(i.length||o.length)&&(t.push([[],i,o]),i=[],o=[]),t}applyRematchMatching(e,t,i){let o=e.length*t.length,s=cV(e.concat(t).map(e=>e.content.length));return o<this.config.matchingMaxComparisons&&s<this.config.maxLineSizeInBlockForComparison&&("lines"===this.config.matching||"words"===this.config.matching)?i(e,t):[[e,t]]}processChangedLines(e,t,i,o){let s={right:"",left:""},r=Math.max(i.length,o.length);for(let a=0;a<r;a++){let r=i[a],c=o[a],h=void 0!==r&&void 0!==c?dx(r.content,c.content,t,this.config):void 0,p=void 0!==r&&void 0!==r.oldNumber?Object.assign(Object.assign({},void 0!==h?{prefix:h.oldLine.prefix,content:h.oldLine.content,type:dd.DELETE_CHANGES}:Object.assign(Object.assign({},dv(r.content,t)),{type:dg(r.type)})),{oldNumber:r.oldNumber,newNumber:r.newNumber}):void 0,u=void 0!==c&&void 0!==c.newNumber?Object.assign(Object.assign({},void 0!==h?{prefix:h.newLine.prefix,content:h.newLine.content,type:dd.INSERT_CHANGES}:Object.assign(Object.assign({},dv(c.content,t)),{type:dg(c.type)})),{oldNumber:c.oldNumber,newNumber:c.newNumber}):void 0,{left:m,right:g}=this.generateLineHtml(e,p,u);s.left+=m,s.right+=g}return s}generateLineHtml(e,t,i){return{left:this.generateSingleLineHtml(e,t),right:this.generateSingleLineHtml(e,i)}}generateSingleLineHtml(e,t){if(void 0===t)return"";let i=this.hoganUtils.render(dE,"numbers",{oldNumber:t.oldNumber||"",newNumber:t.newNumber||""});return this.hoganUtils.render(d$,"line",{type:t.type,lineClass:"d2h-code-linenumber",contentClass:"d2h-code-line",prefix:" "===t.prefix?"&nbsp;":t.prefix,content:t.content,lineNumber:i,line:t,file:e})}};let dI=Object.assign(Object.assign({},dh),{renderNothingWhenEmpty:!1,matchingMaxComparisons:2500,maxLineSizeInBlockForComparison:200}),dA="generic";let SideBySideRenderer=class SideBySideRenderer{constructor(e,t={}){this.hoganUtils=e,this.config=Object.assign(Object.assign({},dI),t)}render(e){let t=e.map(e=>{let t;return t=e.blocks.length?this.generateFileHtml(e):this.generateEmptyDiff(),this.makeFileDiffHtml(e,t)}).join(`
`);return this.hoganUtils.render(dA,"wrapper",{colorScheme:df(this.config.colorScheme),content:t})}makeFileDiffHtml(e,t){if(this.config.renderNothingWhenEmpty&&Array.isArray(e.blocks)&&0===e.blocks.length)return"";let i=this.hoganUtils.template("side-by-side","file-diff"),o=this.hoganUtils.template(dA,"file-path"),s=this.hoganUtils.template("icon","file"),r=this.hoganUtils.template("tag",dk(e));return i.render({file:e,fileHtmlId:dw(e),diffs:t,filePath:o.render({fileDiffName:dy(e)},{fileIcon:s,fileTag:r})})}generateEmptyDiff(){return{right:"",left:this.hoganUtils.render(dA,"empty-diff",{contentClass:"d2h-code-side-line",CSSLineClass:dd})}}generateFileHtml(e){let t=dc(dl(t=>dv(t.content,e.isCombined).content));return e.blocks.map(i=>{let o={left:this.makeHeaderHtml(i.header,e),right:this.makeHeaderHtml("")};return this.applyLineGroupping(i).forEach(([i,s,r])=>{if(s.length&&r.length&&!i.length)this.applyRematchMatching(s,r,t).map(([t,i])=>{let{left:s,right:r}=this.processChangedLines(e.isCombined,t,i);o.left+=s,o.right+=r});else if(i.length)i.forEach(t=>{let{prefix:i,content:s}=dv(t.content,e.isCombined),{left:r,right:a}=this.generateLineHtml({type:dd.CONTEXT,prefix:i,content:s,number:t.oldNumber},{type:dd.CONTEXT,prefix:i,content:s,number:t.newNumber});o.left+=r,o.right+=a});else if(s.length||r.length){let{left:t,right:i}=this.processChangedLines(e.isCombined,s,r);o.left+=t,o.right+=i}}),o}).reduce((e,t)=>({left:e.left+t.left,right:e.right+t.right}),{left:"",right:""})}applyLineGroupping(e){let t=[],i=[],o=[];for(let s=0;s<e.lines.length;s++){let r=e.lines[s];(r.type!==u.INSERT&&o.length||r.type===u.CONTEXT&&i.length>0)&&(t.push([[],i,o]),i=[],o=[]),r.type===u.CONTEXT?t.push([[r],[],[]]):r.type===u.INSERT&&0===i.length?t.push([[],[],[r]]):r.type===u.INSERT&&i.length>0?o.push(r):r.type===u.DELETE&&i.push(r)}return(i.length||o.length)&&(t.push([[],i,o]),i=[],o=[]),t}applyRematchMatching(e,t,i){let o=e.length*t.length,s=cV(e.concat(t).map(e=>e.content.length));return o<this.config.matchingMaxComparisons&&s<this.config.maxLineSizeInBlockForComparison&&("lines"===this.config.matching||"words"===this.config.matching)?i(e,t):[[e,t]]}makeHeaderHtml(e,t){return this.hoganUtils.render(dA,"block-header",{CSSLineClass:dd,blockHeader:(null==t?void 0:t.isTooBig)?e:db(e),lineClass:"d2h-code-side-linenumber",contentClass:"d2h-code-side-line"})}processChangedLines(e,t,i){let o={right:"",left:""},s=Math.max(t.length,i.length);for(let r=0;r<s;r++){let s=t[r],a=i[r],c=void 0!==s&&void 0!==a?dx(s.content,a.content,e,this.config):void 0,h=void 0!==s&&void 0!==s.oldNumber?Object.assign(Object.assign({},void 0!==c?{prefix:c.oldLine.prefix,content:c.oldLine.content,type:dd.DELETE_CHANGES}:Object.assign(Object.assign({},dv(s.content,e)),{type:dg(s.type)})),{number:s.oldNumber}):void 0,p=void 0!==a&&void 0!==a.newNumber?Object.assign(Object.assign({},void 0!==c?{prefix:c.newLine.prefix,content:c.newLine.content,type:dd.INSERT_CHANGES}:Object.assign(Object.assign({},dv(a.content,e)),{type:dg(a.type)})),{number:a.newNumber}):void 0,{left:u,right:m}=this.generateLineHtml(h,p);o.left+=u,o.right+=m}return o}generateLineHtml(e,t){return{left:this.generateSingleHtml(e),right:this.generateSingleHtml(t)}}generateSingleHtml(e){let t="d2h-code-side-linenumber",i="d2h-code-side-line";return this.hoganUtils.render(dA,"line",{type:(null==e?void 0:e.type)||`${dd.CONTEXT} d2h-emptyplaceholder`,lineClass:void 0!==e?t:`${t} d2h-code-side-emptyplaceholder`,contentClass:void 0!==e?i:`${i} d2h-code-side-emptyplaceholder`,prefix:(null==e?void 0:e.prefix)===" "?"&nbsp;":null==e?void 0:e.prefix,content:null==e?void 0:e.content,lineNumber:null==e?void 0:e.number})}};var dT=b(87);let dD={};dD["file-summary-line"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<li class="d2h-file-list-line">'),this.b(`
`+i),this.b('    <span class="d2h-file-name-wrapper">'),this.b(`
`+i),this.b(this.rp("<fileIcon0",e,t,"      ")),this.b('      <a href="#'),this.b(this.v(this.f("fileHtmlId",e,t,0))),this.b('" class="d2h-file-name">'),this.b(this.v(this.f("fileName",e,t,0))),this.b("</a>"),this.b(`
`+i),this.b('      <span class="d2h-file-stats">'),this.b(`
`+i),this.b('          <span class="d2h-lines-added">'),this.b(this.v(this.f("addedLines",e,t,0))),this.b("</span>"),this.b(`
`+i),this.b('          <span class="d2h-lines-deleted">'),this.b(this.v(this.f("deletedLines",e,t,0))),this.b("</span>"),this.b(`
`+i),this.b("      </span>"),this.b(`
`+i),this.b("    </span>"),this.b(`
`+i),this.b("</li>"),this.fl()},partials:{"<fileIcon0":{name:"fileIcon",partials:{},subs:{}}},subs:{}}),dD["file-summary-wrapper"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<div class="d2h-file-list-wrapper '),this.b(this.v(this.f("colorScheme",e,t,0))),this.b('">'),this.b(`
`+i),this.b('    <div class="d2h-file-list-header">'),this.b(`
`+i),this.b('        <span class="d2h-file-list-title">Files changed ('),this.b(this.v(this.f("filesNumber",e,t,0))),this.b(")</span>"),this.b(`
`+i),this.b('        <a class="d2h-file-switch d2h-hide">hide</a>'),this.b(`
`+i),this.b('        <a class="d2h-file-switch d2h-show">show</a>'),this.b(`
`+i),this.b("    </div>"),this.b(`
`+i),this.b('    <ol class="d2h-file-list">'),this.b(`
`+i),this.b("    "),this.b(this.t(this.f("files",e,t,0))),this.b(`
`+i),this.b("    </ol>"),this.b(`
`+i),this.b("</div>"),this.fl()},partials:{},subs:{}}),dD["generic-block-header"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b("<tr>"),this.b(`
`+i),this.b('    <td class="'),this.b(this.v(this.f("lineClass",e,t,0))),this.b(" "),this.b(this.v(this.d("CSSLineClass.INFO",e,t,0))),this.b('"></td>'),this.b(`
`+i),this.b('    <td class="'),this.b(this.v(this.d("CSSLineClass.INFO",e,t,0))),this.b('">'),this.b(`
`+i),this.b('        <div class="'),this.b(this.v(this.f("contentClass",e,t,0))),this.b('">'),this.s(this.f("blockHeader",e,t,1),e,t,0,156,173,"{{ }}")&&(this.rs(e,t,function(e,t,i){i.b(i.t(i.f("blockHeader",e,t,0)))}),e.pop()),this.s(this.f("blockHeader",e,t,1),e,t,1,0,0,"")||this.b("&nbsp;"),this.b("</div>"),this.b(`
`+i),this.b("    </td>"),this.b(`
`+i),this.b("</tr>"),this.fl()},partials:{},subs:{}}),dD["generic-empty-diff"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b("<tr>"),this.b(`
`+i),this.b('    <td class="'),this.b(this.v(this.d("CSSLineClass.INFO",e,t,0))),this.b('">'),this.b(`
`+i),this.b('        <div class="'),this.b(this.v(this.f("contentClass",e,t,0))),this.b('">'),this.b(`
`+i),this.b("            File without changes"),this.b(`
`+i),this.b("        </div>"),this.b(`
`+i),this.b("    </td>"),this.b(`
`+i),this.b("</tr>"),this.fl()},partials:{},subs:{}}),dD["generic-file-path"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<span class="d2h-file-name-wrapper">'),this.b(`
`+i),this.b(this.rp("<fileIcon0",e,t,"    ")),this.b('    <span class="d2h-file-name">'),this.b(this.v(this.f("fileDiffName",e,t,0))),this.b("</span>"),this.b(`
`+i),this.b(this.rp("<fileTag1",e,t,"    ")),this.b("</span>"),this.b(`
`+i),this.b('<label class="d2h-file-collapse">'),this.b(`
`+i),this.b('    <input class="d2h-file-collapse-input" type="checkbox" name="viewed" value="viewed">'),this.b(`
`+i),this.b("    Viewed"),this.b(`
`+i),this.b("</label>"),this.fl()},partials:{"<fileIcon0":{name:"fileIcon",partials:{},subs:{}},"<fileTag1":{name:"fileTag",partials:{},subs:{}}},subs:{}}),dD["generic-line"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b("<tr>"),this.b(`
`+i),this.b('    <td class="'),this.b(this.v(this.f("lineClass",e,t,0))),this.b(" "),this.b(this.v(this.f("type",e,t,0))),this.b('">'),this.b(`
`+i),this.b("      "),this.b(this.t(this.f("lineNumber",e,t,0))),this.b(`
`+i),this.b("    </td>"),this.b(`
`+i),this.b('    <td class="'),this.b(this.v(this.f("type",e,t,0))),this.b('">'),this.b(`
`+i),this.b('        <div class="'),this.b(this.v(this.f("contentClass",e,t,0))),this.b('">'),this.b(`
`+i),this.s(this.f("prefix",e,t,1),e,t,0,162,238,"{{ }}")&&(this.rs(e,t,function(e,t,o){o.b('            <span class="d2h-code-line-prefix">'),o.b(o.t(o.f("prefix",e,t,0))),o.b("</span>"),o.b(`
`+i)}),e.pop()),this.s(this.f("prefix",e,t,1),e,t,1,0,0,"")||(this.b('            <span class="d2h-code-line-prefix">&nbsp;</span>'),this.b(`
`+i)),this.s(this.f("content",e,t,1),e,t,0,371,445,"{{ }}")&&(this.rs(e,t,function(e,t,o){o.b('            <span class="d2h-code-line-ctn">'),o.b(o.t(o.f("content",e,t,0))),o.b("</span>"),o.b(`
`+i)}),e.pop()),this.s(this.f("content",e,t,1),e,t,1,0,0,"")||(this.b('            <span class="d2h-code-line-ctn"><br></span>'),this.b(`
`+i)),this.b("        </div>"),this.b(`
`+i),this.b("    </td>"),this.b(`
`+i),this.b("</tr>"),this.fl()},partials:{},subs:{}}),dD["generic-wrapper"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<div class="d2h-wrapper '),this.b(this.v(this.f("colorScheme",e,t,0))),this.b('">'),this.b(`
`+i),this.b("    "),this.b(this.t(this.f("content",e,t,0))),this.b(`
`+i),this.b("</div>"),this.fl()},partials:{},subs:{}}),dD["icon-file-added"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"'),this.b(`
`+i),this.b('     width="14">'),this.b(`
`+i),this.b('    <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>'),this.b(`
`+i),this.b("</svg>"),this.fl()},partials:{},subs:{}}),dD["icon-file-changed"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"'),this.b(`
`+i),this.b('     viewBox="0 0 14 16" width="14">'),this.b(`
`+i),this.b('    <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>'),this.b(`
`+i),this.b("</svg>"),this.fl()},partials:{},subs:{}}),dD["icon-file-deleted"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<svg aria-hidden="true" class="d2h-icon d2h-deleted" height="16" title="removed" version="1.1"'),this.b(`
`+i),this.b('     viewBox="0 0 14 16" width="14">'),this.b(`
`+i),this.b('    <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM11 9H3V7h8v2z"></path>'),this.b(`
`+i),this.b("</svg>"),this.fl()},partials:{},subs:{}}),dD["icon-file-renamed"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<svg aria-hidden="true" class="d2h-icon d2h-moved" height="16" title="renamed" version="1.1"'),this.b(`
`+i),this.b('     viewBox="0 0 14 16" width="14">'),this.b(`
`+i),this.b('    <path d="M6 9H3V7h3V4l5 4-5 4V9z m8-7v12c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h12c0.55 0 1 0.45 1 1z m-1 0H1v12h12V2z"></path>'),this.b(`
`+i),this.b("</svg>"),this.fl()},partials:{},subs:{}}),dD["icon-file"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">'),this.b(`
`+i),this.b('    <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>'),this.b(`
`+i),this.b("</svg>"),this.fl()},partials:{},subs:{}}),dD["line-by-line-file-diff"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<div id="'),this.b(this.v(this.f("fileHtmlId",e,t,0))),this.b('" class="d2h-file-wrapper" data-lang="'),this.b(this.v(this.d("file.language",e,t,0))),this.b('">'),this.b(`
`+i),this.b('    <div class="d2h-file-header">'),this.b(`
`+i),this.b("    "),this.b(this.t(this.f("filePath",e,t,0))),this.b(`
`+i),this.b("    </div>"),this.b(`
`+i),this.b('    <div class="d2h-file-diff">'),this.b(`
`+i),this.b('        <div class="d2h-code-wrapper">'),this.b(`
`+i),this.b('            <table class="d2h-diff-table">'),this.b(`
`+i),this.b('                <tbody class="d2h-diff-tbody">'),this.b(`
`+i),this.b("                "),this.b(this.t(this.f("diffs",e,t,0))),this.b(`
`+i),this.b("                </tbody>"),this.b(`
`+i),this.b("            </table>"),this.b(`
`+i),this.b("        </div>"),this.b(`
`+i),this.b("    </div>"),this.b(`
`+i),this.b("</div>"),this.fl()},partials:{},subs:{}}),dD["line-by-line-numbers"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<div class="line-num1">'),this.b(this.v(this.f("oldNumber",e,t,0))),this.b("</div>"),this.b(`
`+i),this.b('<div class="line-num2">'),this.b(this.v(this.f("newNumber",e,t,0))),this.b("</div>"),this.fl()},partials:{},subs:{}}),dD["side-by-side-file-diff"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<div id="'),this.b(this.v(this.f("fileHtmlId",e,t,0))),this.b('" class="d2h-file-wrapper" data-lang="'),this.b(this.v(this.d("file.language",e,t,0))),this.b('">'),this.b(`
`+i),this.b('    <div class="d2h-file-header">'),this.b(`
`+i),this.b("      "),this.b(this.t(this.f("filePath",e,t,0))),this.b(`
`+i),this.b("    </div>"),this.b(`
`+i),this.b('    <div class="d2h-files-diff">'),this.b(`
`+i),this.b('        <div class="d2h-file-side-diff">'),this.b(`
`+i),this.b('            <div class="d2h-code-wrapper">'),this.b(`
`+i),this.b('                <table class="d2h-diff-table">'),this.b(`
`+i),this.b('                    <tbody class="d2h-diff-tbody">'),this.b(`
`+i),this.b("                    "),this.b(this.t(this.d("diffs.left",e,t,0))),this.b(`
`+i),this.b("                    </tbody>"),this.b(`
`+i),this.b("                </table>"),this.b(`
`+i),this.b("            </div>"),this.b(`
`+i),this.b("        </div>"),this.b(`
`+i),this.b('        <div class="d2h-file-side-diff">'),this.b(`
`+i),this.b('            <div class="d2h-code-wrapper">'),this.b(`
`+i),this.b('                <table class="d2h-diff-table">'),this.b(`
`+i),this.b('                    <tbody class="d2h-diff-tbody">'),this.b(`
`+i),this.b("                    "),this.b(this.t(this.d("diffs.right",e,t,0))),this.b(`
`+i),this.b("                    </tbody>"),this.b(`
`+i),this.b("                </table>"),this.b(`
`+i),this.b("            </div>"),this.b(`
`+i),this.b("        </div>"),this.b(`
`+i),this.b("    </div>"),this.b(`
`+i),this.b("</div>"),this.fl()},partials:{},subs:{}}),dD["tag-file-added"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<span class="d2h-tag d2h-added d2h-added-tag">ADDED</span>'),this.fl()},partials:{},subs:{}}),dD["tag-file-changed"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span>'),this.fl()},partials:{},subs:{}}),dD["tag-file-deleted"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<span class="d2h-tag d2h-deleted d2h-deleted-tag">DELETED</span>'),this.fl()},partials:{},subs:{}}),dD["tag-file-renamed"]=new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<span class="d2h-tag d2h-moved d2h-moved-tag">RENAMED</span>'),this.fl()},partials:{},subs:{}});let HoganJsUtils=class HoganJsUtils{constructor({compiledTemplates:e={},rawTemplates:t={}}){let i=Object.entries(t).reduce((e,[t,i])=>{let o=dT.compile(i,{asString:!1});return Object.assign(Object.assign({},e),{[t]:o})},{});this.preCompiledTemplates=Object.assign(Object.assign(Object.assign({},dD),e),i)}static compile(e){return dT.compile(e,{asString:!1})}render(e,t,i,o,s){let r=this.templateKey(e,t);try{return this.preCompiledTemplates[r].render(i,o,s)}catch{throw Error(`Could not find template to render '${r}'`)}}template(e,t){return this.preCompiledTemplates[this.templateKey(e,t)]}templateKey(e,t){return`${e}-${t}`}};let dR=Object.assign(Object.assign(Object.assign({},dS),dI),{outputFormat:"line-by-line",drawFileList:!0}),dP=Object.assign(Object.assign({},dR),{synchronisedScroll:!0,highlight:!0,fileListToggle:!0,fileListStartVisible:!1,highlightLanguages:new Map,smartSelection:!0,fileContentToggle:!0,stickyFileHeaders:!0});let Diff2HtmlUI=class Diff2HtmlUI{constructor(e,t,i={},o){this.hljs=null,this.currentSelectionColumnId=-1,this.config=Object.assign(Object.assign({},dP),i),this.diffHtml=void 0!==t?function(e,t={}){let i=Object.assign(Object.assign({},dR),t),o="string"==typeof e?cK(e,i):e,s=new HoganJsUtils(i),{colorScheme:r}=i;return(i.drawFileList?new FileListRenderer(s,{colorScheme:r}).render(o):"")+("side-by-side"===i.outputFormat?new SideBySideRenderer(s,i).render(o):new LineByLineRenderer(s,i).render(o))}(t,this.config):e.innerHTML,this.targetElement=e,void 0!==o&&(this.hljs=o)}draw(){this.targetElement.innerHTML=this.diffHtml,this.config.synchronisedScroll&&this.synchronisedScroll(),this.config.highlight&&this.highlightCode(),this.config.fileListToggle&&this.fileListToggle(this.config.fileListStartVisible),this.config.fileContentToggle&&this.fileContentToggle(),this.config.stickyFileHeaders&&this.stickyFileHeaders()}synchronisedScroll(){this.targetElement.querySelectorAll(".d2h-file-wrapper").forEach(e=>{let[t,i]=[].slice.call(e.querySelectorAll(".d2h-file-side-diff"));if(void 0===t||void 0===i)return;let o=e=>{null!==e&&null!==e.target&&(e.target===t?(i.scrollTop=t.scrollTop,i.scrollLeft=t.scrollLeft):(t.scrollTop=i.scrollTop,t.scrollLeft=i.scrollLeft))};t.addEventListener("scroll",o),i.addEventListener("scroll",o)})}fileListToggle(e){let t=this.targetElement.querySelector(".d2h-show"),i=this.targetElement.querySelector(".d2h-hide"),o=this.targetElement.querySelector(".d2h-file-list");if(null===t||null===i||null===o)return;let s=()=>{t.style.display="none",i.style.display="inline",o.style.display="block"},r=()=>{t.style.display="inline",i.style.display="none",o.style.display="none"};t.addEventListener("click",()=>s()),i.addEventListener("click",()=>r());let a=this.getHashTag();"files-summary-show"===a?s():"files-summary-hide"===a?r():e?s():r()}fileContentToggle(){this.targetElement.querySelectorAll(".d2h-file-collapse").forEach(e=>{e.style.display="flex";let t=t=>{var i;let o=null==(i=e.closest(".d2h-file-wrapper"))?void 0:i.querySelector(t);null!=o&&(e.classList.toggle("d2h-selected"),o.classList.toggle("d2h-d-none"))};e.addEventListener("click",i=>{e!==i.target&&(t(".d2h-file-diff"),t(".d2h-files-diff"))})})}highlightCode(){let e=this.hljs;if(null===e)throw Error("Missing a `highlight.js` implementation. Please provide one when instantiating Diff2HtmlUI.");this.targetElement.querySelectorAll(".d2h-file-wrapper").forEach(t=>{var i;let o=t.getAttribute("data-lang");this.config.highlightLanguages instanceof Map||(this.config.highlightLanguages=new Map(Object.entries(this.config.highlightLanguages)));let s=o&&this.config.highlightLanguages.has(o)?this.config.highlightLanguages.get(o):o&&null!=(i=c1[o])?i:"plaintext";void 0===e.getLanguage(s)&&(s="plaintext"),t.querySelectorAll(".d2h-code-line-ctn").forEach(t=>{var i;let o,r=t.textContent,a=t.parentNode;if(null===r||null===a||!this.isElement(a))return;let c=(i=e.highlight(r,{language:s,ignoreIllegals:!0}),o=[],i.value=i.value.split(`
`).map(e=>{let t=o.map(e=>`<span class="${e}">`).join("");return Array.from(e.matchAll(/(<span class="(.*?)">|<\/span>)/g)).forEach(e=>{"</span>"===e[0]?o.shift():o.unshift(e[2])}),t+e+"</span>".repeat(o.length)}).join(`
`),i),h=c0(t);if(h.length){let e=document.createElementNS("http://www.w3.org/1999/xhtml","div");e.innerHTML=c.value,c.value=function(e,t,i){let o=0,s="",r=[];function a(){return e.length&&t.length?e[0].offset!==t[0].offset?e[0].offset<t[0].offset?e:t:"start"===t[0].event?e:t:e.length?e:t}function c(e){if(null===e||(null==e?void 0:e.attributes)===void 0)throw Error("Node is not an Element");s+=`<${cQ(e)} ${[].map.call(e.attributes,e=>`${e.nodeName}="${cJ(e.value).replace(/"/g,"&quot;")}"`).join(" ")}>`}function h(e){s+="</"+cQ(e)+">"}function p(e){("start"===e.event?c:h)(e.node)}for(;e.length||t.length;){let t=a();if(s+=cJ(i.substring(o,t[0].offset)),o=t[0].offset,t===e){r.reverse().forEach(h);do p(t.splice(0,1)[0]),t=a();while(t===e&&t.length&&t[0].offset===o)r.reverse().forEach(c)}else"start"===t[0].event?r.push(t[0].node):r.pop(),p(t.splice(0,1)[0])}return s+cJ(i.substr(o))}(h,c0(e),r)}t.classList.add("hljs"),c.language&&t.classList.add(c.language),t.innerHTML=c.value})})}stickyFileHeaders(){this.targetElement.querySelectorAll(".d2h-file-header").forEach(e=>{e.classList.add("d2h-sticky-header")})}smartSelection(){}getHashTag(){let e=document.URL,t=e.indexOf("#"),i=null;return -1!==t&&(i=e.substr(t+1)),i}isElement(e){return null!==e&&(null==e?void 0:e.classList)!==void 0}};let dL={"generic-block-header":new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b("<tr>"),this.b(`
`+i),this.b('    <td class="'),this.b(this.v(this.f("lineClass",e,t,0))),this.b(" "),this.b(this.v(this.d("CSSLineClass.INFO",e,t,0))),this.b('"></td>'),this.b(`
`+i),this.b('    <td class="'),this.b(this.v(this.d("CSSLineClass.INFO",e,t,0))),this.b('">'),this.b(`
`+i),this.b('        <div class="'),this.b(this.v(this.f("contentClass",e,t,0))),this.b('">'),this.s(this.f("blockHeader",e,t,1),e,t,0,156,173,"{{ }}")&&(this.rs(e,t,function(e,t,i){i.b(i.t(i.f("blockHeader",e,t,0)))}),e.pop()),this.s(this.f("blockHeader",e,t,1),e,t,1,0,0,"")||this.b("&nbsp;"),this.b("</div>"),this.b(`
`+i),this.b("    </td>"),this.b(`
`+i),this.b("</tr>"),this.fl()},partials:{},subs:{}}),"line-by-line-file-diff":new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<details open id="'),this.b(this.v(this.f("fileHtmlId",e,t,0))),this.b('" class="d2h-file-wrapper" data-lang="'),this.b(this.v(this.d("file.language",e,t,0))),this.b('">'),this.b(`
`+i),this.b('    <summary class="d2h-file-header">'),this.b(`
`+i),this.b('      <code-icon class="file-icon--open" icon="chevron-down"></code-icon>'),this.b(`
`+i),this.b('      <code-icon class="file-icon--closed" icon="chevron-right"></code-icon>'),this.b(`
`+i),this.b("      "),this.b(this.t(this.f("filePath",e,t,0))),this.b(`
`+i),this.b("    </summary>"),this.b(`
`+i),this.b('    <div class="d2h-file-diff scrollable">'),this.b(`
`+i),this.b('        <div class="d2h-code-wrapper">'),this.b(`
`+i),this.b('            <table class="d2h-diff-table">'),this.b(`
`+i),this.b('                <tbody class="d2h-diff-tbody">'),this.b(`
`+i),this.b("                "),this.b(this.t(this.f("diffs",e,t,0))),this.b(`
`+i),this.b("                </tbody>"),this.b(`
`+i),this.b("            </table>"),this.b(`
`+i),this.b("        </div>"),this.b(`
`+i),this.b("    </div>"),this.b(`
`+i),this.b("</details>"),this.fl()},partials:{},subs:{}}),"side-by-side-file-diff":new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<details id="'),this.b(this.v(this.f("fileHtmlId",e,t,0))),this.b('" class="d2h-file-wrapper" data-lang="'),this.b(this.v(this.d("file.language",e,t,0))),this.b('">'),this.b(`
`+i),this.b('    <summary class="d2h-file-header">'),this.b(`
`+i),this.b('      <code-icon class="file-icon--open" icon="chevron-down"></code-icon>'),this.b(`
`+i),this.b('      <code-icon class="file-icon--closed" icon="chevron-right"></code-icon>'),this.b(`
`+i),this.b("      "),this.b(this.t(this.f("filePath",e,t,0))),this.b(`
`+i),this.b("    </summary>"),this.b(`
`+i),this.b('    <div class="d2h-files-diff">'),this.b(`
`+i),this.b('        <div class="d2h-file-side-diff">'),this.b(`
`+i),this.b('            <div class="d2h-code-wrapper">'),this.b(`
`+i),this.b('                <table class="d2h-diff-table">'),this.b(`
`+i),this.b('                    <tbody class="d2h-diff-tbody">'),this.b(`
`+i),this.b("                    "),this.b(this.t(this.d("diffs.left",e,t,0))),this.b(`
`+i),this.b("                    </tbody>"),this.b(`
`+i),this.b("                </table>"),this.b(`
`+i),this.b("            </div>"),this.b(`
`+i),this.b("        </div>"),this.b(`
`+i),this.b('        <div class="d2h-file-side-diff">'),this.b(`
`+i),this.b('            <div class="d2h-code-wrapper">'),this.b(`
`+i),this.b('                <table class="d2h-diff-table">'),this.b(`
`+i),this.b('                    <tbody class="d2h-diff-tbody">'),this.b(`
`+i),this.b("                    "),this.b(this.t(this.d("diffs.right",e,t,0))),this.b(`
`+i),this.b("                    </tbody>"),this.b(`
`+i),this.b("                </table>"),this.b(`
`+i),this.b("            </div>"),this.b(`
`+i),this.b("        </div>"),this.b(`
`+i),this.b("    </div>"),this.b(`
`+i),this.b("</details>"),this.fl()},partials:{},subs:{}}),"generic-file-path":new dT.Template({code:function(e,t,i){return this.b(i=i||""),this.b('<span class="d2h-file-name-wrapper">'),this.b(`
`+i),this.b('    <span class="d2h-file-name">'),this.b(this.v(this.f("fileDiffName",e,t,0))),this.b("</span>"),this.b(`
`+i),this.b(this.rp("<fileTag0",e,t,"    ")),this.b("</span>"),this.b(`
`+i),this.b('<label class="d2h-file-collapse" hidden>'),this.b(`
`+i),this.b('    <input class="d2h-file-collapse-input" type="checkbox" name="viewed" value="viewed">'),this.b(`
`+i),this.b("    Viewed"),this.b(`
`+i),this.b("</label>"),this.fl()},partials:{"<fileTag0":{name:"fileTag",partials:{},subs:{}}},subs:{}})},dM=S`
	.hljs {
		display: block;
		padding: 0.5em;
		overflow-x: auto;
		color: #333;
		background: #f8f8f8;
	}

	.hljs-comment,
	.hljs-quote {
		font-style: italic;
		color: #998;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-subst {
		font-weight: 700;
		color: #333;
	}

	.hljs-literal,
	.hljs-number,
	.hljs-tag .hljs-attr,
	.hljs-template-variable,
	.hljs-variable {
		color: teal;
	}

	.hljs-doctag,
	.hljs-string {
		color: #d14;
	}

	.hljs-section,
	.hljs-selector-id,
	.hljs-title {
		font-weight: 700;
		color: #900;
	}

	.hljs-subst {
		font-weight: 400;
	}

	.hljs-class .hljs-title,
	.hljs-type {
		font-weight: 700;
		color: #458;
	}

	.hljs-attribute,
	.hljs-name,
	.hljs-tag {
		font-weight: 400;
		color: navy;
	}

	.hljs-link,
	.hljs-regexp {
		color: #009926;
	}

	.hljs-bullet,
	.hljs-symbol {
		color: #990073;
	}

	.hljs-built_in,
	.hljs-builtin-name {
		color: #0086b3;
	}

	.hljs-meta {
		font-weight: 700;
		color: #999;
	}

	.hljs-deletion {
		background: #fdd;
	}

	.hljs-addition {
		background: #dfd;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: 700;
	}
`,dO=S`
	:host {
		--d2h-intrinsic-base-height: 3.5rem; /* header height */
		--d2h-intrinsic-container-offset-height: 12px; /* 10px scrollbar height + 2px vertical borders */
		--d2h-intrinsic-line-count: 50;
		--d2h-intrinsic-line-height: calc(
			var(--editor-font-size) * 1.5
		); /* 1.2rem (font) to 1.8rem (line height) ratio, but still fixed */
		--d2h-intrinsic-height: calc(
			var(--d2h-intrinsic-base-height) + (var(--d2h-intrinsic-line-height) * var(--d2h-intrinsic-line-count)) +
				var(--d2h-intrinsic-container-offset-height)
		);

		position: relative;
		display: block;
	}

	.diff-container {
		contain-intrinsic-size: auto var(--d2h-intrinsic-base-height);
		content-visibility: auto;
	}

	.diff-container:has(.d2h-file-wrapper[open]) {
		contain-intrinsic-height: var(--d2h-intrinsic-height);
	}

	.d2h-wrapper {
		color: var(--d2h-color);
		text-align: left;
	}

	.d2h-file-header {
		display: flex;
		height: 35px;
		padding: 4px 5px;
		font-family: var(--vscode-font-family);
		background-color: var(--d2h-file-header-bg-color);
		border-bottom: var(--gl-border-width) solid var(--d2h-file-header-border-color);
	}

	.d2h-file-header.d2h-sticky-header {
		position: sticky;
		top: var(--file-header-sticky-top, 0);
		z-index: 1;
	}

	.d2h-file-stats {
		display: flex;
		margin-left: auto;
		font-size: var(--gl-font-lg);
	}

	.d2h-lines-added {
		padding: var(--gl-space-2);
		vertical-align: middle;
		color: var(--d2h-ins-label-color);
		text-align: right;
		border: var(--gl-border-width) solid var(--d2h-ins-border-color);
		border-radius: var(--gl-radius-sm) 0 0 var(--gl-radius-sm);
	}

	.d2h-lines-deleted {
		padding: var(--gl-space-2);
		margin-left: 1px;
		vertical-align: middle;
		color: var(--d2h-del-label-color);
		text-align: left;
		border: var(--gl-border-width) solid var(--d2h-del-border-color);
		border-radius: 0 var(--gl-radius-sm) var(--gl-radius-sm) 0;
	}

	.d2h-file-name-wrapper {
		display: flex;
		align-items: center;
		width: 100%;
		font-size: var(--gl-font-lg);
		align-items: center;
		-ms-flex-align: center;
	}

	.d2h-file-name {
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.d2h-file-wrapper {
		margin-bottom: 1em;
		border: var(--gl-border-width) solid var(--d2h-border-color);
		border-radius: var(--gl-radius-sm);
	}

	.d2h-file-collapse {
		display: none;
		align-items: center;
		justify-content: flex-end;
		padding: var(--gl-space-4) var(--gl-space-8);
		font-size: var(--gl-font-md);
		cursor: pointer;
		border: var(--gl-border-width) solid var(--d2h-border-color);
		border-radius: var(--gl-radius-sm);
	}

	.d2h-file-collapse.d2h-selected {
		background-color: var(--d2h-selected-color);
	}

	.d2h-file-collapse-input {
		margin: 0 var(--gl-space-4) 0 0;
	}

	.d2h-diff-table {
		width: 100%;
		font-family: var(--vscode-editor-font-family);
		font-size: var(--editor-font-size);
		border-collapse: collapse;
	}

	.d2h-files-diff {
		display: flex;
		width: 100%;
	}

	.d2h-file-diff {
		overflow-y: hidden;
	}

	.d2h-file-diff.d2h-d-none,
	.d2h-files-diff.d2h-d-none {
		display: none;
	}

	.d2h-file-side-diff {
		display: inline-block;
		width: 50%;
		overflow: scroll hidden;
	}

	.d2h-code-line {
		/* width: calc(100% - 16em); */
		width: 100%;
		padding: 0 8em;
	}

	.d2h-code-line,
	.d2h-code-side-line {
		display: inline-block;
		white-space: nowrap;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.d2h-code-side-line {
		width: calc(100% - 9em);
		padding: 0 4.5em;
	}

	.d2h-code-line-ctn {
		display: inline-block;
		width: 100%;
		padding: 0;
		vertical-align: middle;
		overflow-wrap: normal;
		white-space: pre;
		-webkit-user-select: text;
		-moz-user-select: text;
		-ms-user-select: text;
		user-select: text;
		background: none;
	}

	.d2h-code-line del,
	.d2h-code-side-line del {
		background-color: var(--d2h-del-highlight-bg-color);
	}

	.d2h-code-line del,
	.d2h-code-line ins,
	.d2h-code-side-line del,
	.d2h-code-side-line ins {
		display: inline-block;
		margin-top: -1px;
		-webkit-text-decoration: none;
		text-decoration: none;
		border-radius: 0.2em;
	}

	.d2h-code-line ins,
	.d2h-code-side-line ins {
		text-align: left;
		background-color: var(--d2h-ins-highlight-bg-color);
	}

	.d2h-code-line-prefix {
		display: inline;
		padding: 0;
		overflow-wrap: normal;
		white-space: pre;
		background: none;
	}

	.line-num1 {
		float: left;
	}

	.line-num1,
	.line-num2 {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 3.5em;
		padding: 0 0.5em;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.line-num2 {
		float: right;
	}

	.d2h-code-linenumber {
		position: absolute;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		display: inline-block;
		width: 7.5em;
		color: var(--d2h-dim-color);
		text-align: right;
		cursor: pointer;
		background-color: var(--d2h-bg-color);
		border-color: transparent var(--d2h-line-border-color);
		border-style: solid;
		border-width: var(--gl-border-width);
	}

	.d2h-code-linenumber::after {
		content: '\\200b';
	}

	.d2h-code-linenumber.d2h-ins {
		border-color: transparent var(--d2h-ins-border-color);
	}

	.d2h-code-linenumber.d2h-del {
		border-color: transparent var(--d2h-del-border-color);
	}

	.d2h-code-side-linenumber {
		position: absolute;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		display: inline-block;
		width: 4em;
		padding: 0 0.5em;
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--d2h-dim-color);
		text-align: right;
		cursor: pointer;
		background-color: var(--d2h-bg-color);
		border: solid var(--d2h-line-border-color);
		border-width: 0 1px;
	}

	.d2h-code-side-linenumber::after {
		content: '\\200b';
	}

	.d2h-code-side-emptyplaceholder,
	.d2h-emptyplaceholder {
		background-color: var(--d2h-empty-placeholder-bg-color);
		border-color: var(--d2h-empty-placeholder-border-color);
	}

	.d2h-code-line-prefix,
	.d2h-code-linenumber,
	.d2h-code-side-linenumber,
	.d2h-emptyplaceholder {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.d2h-code-linenumber,
	.d2h-code-side-linenumber {
		direction: rtl;
	}

	.d2h-del {
		background-color: var(--d2h-del-bg-color);
		border-color: var(--d2h-del-border-color);
	}

	.d2h-ins {
		background-color: var(--d2h-ins-bg-color);
		border-color: var(--d2h-ins-border-color);
	}

	.d2h-info {
		color: var(--d2h-dim-color);
		background-color: var(--d2h-info-bg-color);
		border-color: var(--d2h-info-border-color);
	}

	.d2h-file-diff .d2h-del.d2h-change {
		background-color: var(--d2h-change-del-color);
	}

	.d2h-file-diff .d2h-ins.d2h-change {
		background-color: var(--d2h-change-ins-color);
	}

	.d2h-file-list-wrapper {
		margin-bottom: var(--gl-space-10);
	}

	.d2h-file-list-wrapper a {
		-webkit-text-decoration: none;
		text-decoration: none;
	}

	.d2h-file-list-wrapper a,
	.d2h-file-list-wrapper a:visited {
		color: var(--d2h-moved-label-color);
	}

	.d2h-file-list-header {
		text-align: left;
	}

	.d2h-file-list-title {
		font-weight: 700;
	}

	.d2h-file-list-line {
		display: flex;
		text-align: left;
	}

	.d2h-file-list {
		display: block;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.d2h-file-list > li {
		padding: 5px 10px;
		margin: 0;
		border-bottom: var(--gl-border-width) solid var(--d2h-border-color);
	}

	.d2h-file-list > li:last-child {
		border-bottom: none;
	}

	.d2h-file-switch {
		display: none;
		font-size: var(--gl-font-micro);
		cursor: pointer;
	}

	.d2h-icon {
		margin-right: var(--gl-space-10);
		vertical-align: middle;
		fill: currentcolor;
	}

	.d2h-deleted {
		color: var(--d2h-del-label-color);
	}

	.d2h-added {
		color: var(--d2h-ins-label-color);
	}

	.d2h-changed {
		color: var(--d2h-change-label-color);
	}

	.d2h-moved {
		color: var(--d2h-moved-label-color);
	}

	.d2h-tag {
		display: flex;
		padding: 0 3px;
		margin-left: var(--gl-space-6);
		font-size: var(--gl-font-micro);
		background-color: var(--d2h-bg-color);
		border-radius: var(--gl-radius-xs);
	}

	.d2h-deleted-tag {
		border: var(--gl-border-width) solid var(--d2h-del-label-color);
	}

	.d2h-added-tag {
		border: var(--gl-border-width) solid var(--d2h-ins-label-color);
	}

	.d2h-changed-tag {
		border: var(--gl-border-width) solid var(--d2h-change-label-color);
	}

	.d2h-moved-tag {
		border: var(--gl-border-width) solid var(--d2h-moved-label-color);
	}

	:host-context(.vscode-high-contrast) .d2h-ins .d2h-code-line {
		line-height: calc(var(--d2h-intrinsic-line-height) - 0.2rem);
		border: var(--gl-border-width) dashed var(--d2h-ins-border-color);
	}

	:host-context(.vscode-high-contrast) .d2h-del .d2h-code-line {
		line-height: calc(var(--d2h-intrinsic-line-height) - 0.2rem);
		border: var(--gl-border-width) dashed var(--d2h-del-border-color);
	}
`,dz=S`
	td {
		padding-block: 0;
		line-height: var(--d2h-intrinsic-line-height);
	}

	.d2h-code-line,
	.d2h-code-side-line {
		height: var(--d2h-intrinsic-line-height);
		overflow: hidden;
		vertical-align: top;
	}

	.d2h-file-diff {
		overflow: scroll hidden;
	}

	.d2h-file-wrapper {
		margin-block-end: 0;
	}

	tr:has(.d2h-code-linenumber) {
		position: relative;
	}

	.d2h-file-header {
		gap: var(--gl-space-4);
		align-items: center;
		cursor: pointer;
	}

	.d2h-file-wrapper:not([open]) .d2h-file-header,
	.d2h-file-header:has(.d2h-file-collapse.d2h-selected) {
		border-bottom-color: transparent;
	}

	.d2h-code-linenumber {
		background-color: color-mix(in srgb, var(--d2h-bg-color) 100%, transparent 12%) !important;
	}

	.d2h-file-wrapper:not([open]) .file-icon--open,
	.d2h-file-wrapper[open] .file-icon--closed {
		display: none;
	}
`;var dN=Object.defineProperty,dH=Object.getOwnPropertyDescriptor,dB=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?dH(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&dN(t,i,r),r};let dj=class extends lit_element_i{constructor(){super(...arguments),this.sideBySide=!1,this.defaultExpanded=!0,this.hasRendered=!1,this._isVisible=!1}get isVisible(){return this._isVisible}set isVisible(e){this._isVisible=e}get diffFile(){return this.parsedDiff?.[0]}connectedCallback(){super.connectedCallback?.(),this.setupIntersectionObserver()}disconnectedCallback(){super.disconnectedCallback?.(),this.cancelScheduledProcessing(),this.intersectionObserver?.disconnect(),this.intersectionObserver=void 0}updated(e){super.updated(e),(e.has("filename")||e.has("hunks"))&&(this.parsedDiff=void 0,this.scheduleProcessing()),e.has("parsedDiff")||e.has("sideBySide")?this.renderDiff(!0):e.has("defaultExpanded")?(this.userExpandedState=void 0,this.renderDiff()):e.has("isVisible")&&(this.isVisible&&!this.parsedDiff&&this.hunks?.length&&this.scheduleProcessing(),this.renderDiff())}scheduleProcessing(){this.cancelScheduledProcessing(),this._processingTimer=setTimeout(()=>{this._processingTimer=void 0,this.isConnected&&this.isVisible&&this.processDiff()},0)}cancelScheduledProcessing(){null!=this._processingTimer&&(clearTimeout(this._processingTimer),this._processingTimer=void 0)}render(){return em`<div id="diff" class="diff-container"></div>`}setupIntersectionObserver(){this.intersectionObserver=new IntersectionObserver(e=>{for(let t of e)this.isVisible=t.isIntersecting},{rootMargin:"100px"}),this.intersectionObserver.observe(this)}clearDiff(){if(this.targetElement){this.captureUserExpandedState(),this.removeDetailsToggleListener();let e=this.targetElement.offsetHeight;e>0&&(this.style.minHeight=`${e}px`),this.targetElement.innerHTML=""}this.diff2htmlUi=void 0,this.hasRendered=!1}renderDiff(e=!1){if(!this.isVisible||!this.parsedDiff||!this.filename)return void this.clearDiff();if(this.hasRendered&&!e)return;if(this.style.minHeight="",!this.diff2htmlUi||e){let e={colorScheme:m.AUTO,outputFormat:this.sideBySide?"side-by-side":"line-by-line",drawFileList:!1,highlight:!1,compiledTemplates:dL};this.diff2htmlUi=new Diff2HtmlUI(this.targetElement,this.parsedDiff,e)}this.diff2htmlUi.draw();let t=this.targetElement?.querySelector("details");t&&(t.open=this.userExpandedState??this.defaultExpanded,this.setupDetailsToggleListener(t)),this.hasRendered=!0}processDiff(){if(!this.filename||!this.hunks||0===this.hunks.length){this.diffText=void 0,this.parsedDiff=void 0;return}let e=this.hunks.map((e,t)=>0===t?`${e.diffHeader}
${e.hunkHeader}
${e.content}`:`
${e.hunkHeader}
${e.content}`).join(`
`);this.diffText=e.trim();let t=cK(this.diffText,{diffMaxChanges:1e4});this.parsedDiff=t;let i=this.diffFile?.blocks.reduce((e,t)=>e+1+t.lines.length,0)??-1;this.style.setProperty("--d2h-intrinsic-line-count",i>-1?`${i}`:"50")}captureUserExpandedState(){let e=this.targetElement?.querySelector("details");e&&(this.userExpandedState=e.open)}setupDetailsToggleListener(e){this.removeDetailsToggleListener(),this.detailsToggleListener=()=>{this.userExpandedState=e.open},e.addEventListener("toggle",this.detailsToggleListener)}removeDetailsToggleListener(){if(this.detailsToggleListener){let e=this.targetElement?.querySelector("details");e&&e.removeEventListener("toggle",this.detailsToggleListener),this.detailsToggleListener=void 0}}};dj.styles=[rS,r$,rC,S`
			[hidden] {
				display: none !important;
			}

			:host {
				display: block;
			}
		`,dM,dO,dz],dB([eI({type:String})],dj.prototype,"filename",2),dB([eI({type:Array})],dj.prototype,"hunks",2),dB([eI({type:Boolean,attribute:"side-by-side"})],dj.prototype,"sideBySide",2),dB([eI({type:Boolean,attribute:"default-expanded"})],dj.prototype,"defaultExpanded",2),dB([eD("#diff")],dj.prototype,"targetElement",2),dB([eA()],dj.prototype,"parsedDiff",2),dB([eA()],dj.prototype,"hasRendered",2),dB([eA()],dj.prototype,"_isVisible",2),dB([eI({type:Boolean,reflect:!0,attribute:"is-visible"})],dj.prototype,"isVisible",1),dB([eA()],dj.prototype,"userExpandedState",2),dj=dB([e$("gl-diff-file")],dj);var dF=Object.defineProperty,dq=Object.getOwnPropertyDescriptor,dU=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?dq(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&dF(t,i,r),r};let dW=class extends lit_element_i{constructor(){super(...arguments),this.aiGenerated=!1,this.explanationLabel="Auto-composition Summary:",this.placeholder="Enter commit message...",this.editable=!1,this.aiEnabled=!1,this.aiDisabledReason=null,this.generating=!1,this.isEditing=!1,this.dispatchMessageChangeDebounced=t1(this.disapatchMessageChange.bind(this),300)}updated(e){e.has("message")&&this.checkValidity()}render(){let e=(this.message??"").trim().length>0,t=this.editable&&(!e||this.isEditing);return em`<div class="commit-message">
			${oT(t,()=>this.renderEditable(),()=>this.renderReadOnly())}
			${this.renderExplanation()}
		</div>`}renderEditable(){return em`
			<div class="commit-message__field">
				<textarea
					id="focusable"
					class="commit-message__input${this.explanation?" has-explanation":""}"
					.value=${this.message??""}
					.placeholder=${this.placeholder}
					rows="3"
					aria-valid=${this.validityMessage?"false":"true"}
					?invalid=${this.validityMessage?"true":"false"}
					@focus=${()=>this.isEditing=!0}
					@input=${this.onMessageInput}
					@blur=${this.exitEditMode}
				></textarea>
				${this.renderHelpText()}
				${oT(this.aiEnabled,()=>em`<gl-button
							class="commit-message__ai-button"
							appearance="toolbar"
							?disabled=${this.generating}
							.tooltip=${this.generating?"Generating...":"Generate Commit Message"}
							@click=${()=>this.onGenerateCommitMessageClick()}
						>
							<code-icon
								.icon=${this.generating?"loading":"sparkle"}
								.modifier=${this.generating?"spin":""}
								slot="prefix"
							></code-icon>
							${this.explanation||this.aiGenerated?"Regenerate Message":"Generate Message"}
						</gl-button>`,()=>em`<gl-button
							class="commit-message__ai-button"
							appearance="toolbar"
							.tooltip=${this.aiDisabledReason||"AI features are disabled"}
						>
							<code-icon icon="sparkle" slot="prefix"></code-icon>
							${this.explanation||this.aiGenerated?"Regenerate Message":"Generate Message"}
						</gl-button>`)}
			</div>
		`}renderHelpText(){return em`<div class="message" id="help-text" aria-live="polite">${this.validityMessage}</div>`}renderReadOnly(){let{summary:e,body:t}=function(e){if(!e)return{summary:""};let t=e.trim(),i=t.indexOf(`
`);return i<0?{summary:t}:{summary:t.substring(0,i),body:t.substring(i+1).trim()}}(this.message??""),i=e.replace(/\n/g,"<br/>"),o=t?t.replace(/\n/g,"<br/>"):"";return em`
			<div class="commit-message__field">
				<p
					id="focusable"
					class="commit-message__text${this.explanation?" has-explanation":""}"
					@click=${this.editable?()=>this.enterEditMode():eb}
					tabindex=${this.editable?"0":"-1"}
				>
					<span class="scrollable">
						<span class="commit-message__summary">${r0(i)}</span>
						${t?em`<span class="commit-message__body">${r0(o)}</span>`:eb}
					</span>
				</p>
				${this.renderHelpText()}
				${oT(this.editable&&this.aiEnabled,()=>em`<gl-button
							class="commit-message__ai-button"
							appearance="toolbar"
							?disabled=${this.generating}
							.tooltip=${this.generating?"Generating...":"Generate Commit Message"}
							@click=${()=>this.onGenerateCommitMessageClick()}
						>
							<code-icon
								.icon=${this.generating?"loading":"sparkle"}
								.modifier=${this.generating?"spin":""}
								slot="prefix"
							></code-icon>
							${this.explanation||this.aiGenerated?"Regenerate Message":"Generate Message"}
						</gl-button>`,()=>this.editable?em`<gl-button
									class="commit-message__ai-button"
									appearance="toolbar"
									.tooltip=${this.aiDisabledReason||"AI features are disabled"}
									disabled
								>
									<code-icon icon="sparkle" slot="prefix"></code-icon>
									${this.explanation||this.aiGenerated?"Regenerate Message":"Generate Message"}
								</gl-button>`:eb)}
			</div>
		`}renderExplanation(){return this.explanation?em`<div tabindex="0" class="commit-message__explanation">
			<p class="commit-message__explanation-block">
				${this.explanationLabel} <span class="commit-message__explanation-text">${this.explanation}</span>
			</p>
		</div>`:eb}onGenerateCommitMessageClick(){this.aiEnabled&&this.dispatchEvent(new CustomEvent("generate-commit-message",{bubbles:!0,composed:!0,detail:{commitId:this.commitId}}))}enterEditMode(){this.isEditing=!0,this.updateComplete.then(()=>{this.focusableElement?.focus()})}exitEditMode(){this.isEditing=!1}onMessageInput(e){let t=e.target.value;this.dispatchMessageChangeDebounced(t)}disapatchMessageChange(e){this.dispatchEvent(new CustomEvent("message-change",{bubbles:!0,composed:!0,detail:{commitId:this.commitId,message:e}}))}focus(e){this.focusableElement?.focus(e)}checkValidity(e=!1){if(!this.editable){this.validityMessage=void 0;return}!(this.message&&this.message.length>0)&&e?this.validityMessage="Error: Commit message is required.":this.validityMessage=void 0}select(e=!1){this.editable&&(e&&this.checkValidity(!0),this.focusableElement?.select())}};dW.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},dW.styles=[r$,rS,rC,S`
			:host {
				position: sticky;
				top: var(--sticky-top, 0);
				z-index: 2;
				display: block;
				background: var(--vscode-editor-background);
			}

			.commit-message {
				max-width: 80rem;
			}

			.commit-message__text,
			.commit-message__input {
				font-family: inherit;
				font-size: var(--gl-font-base);
				line-height: 2rem;
				color: var(--vscode-input-foreground);
				border-radius: var(--gl-input-border-radius);
				-webkit-font-smoothing: auto;
			}

			.commit-message__text {
				margin-block: 0;
				background: var(--color-background);
				border: var(--gl-border-width) solid var(--vscode-panel-border);
			}

			.commit-message__text[tabindex='0']:hover {
				cursor: text;
				background: color-mix(in srgb, transparent 50%, var(--vscode-input-background, #3c3c3c));
				border-color: color-mix(in srgb, transparent 50%, var(--vscode-input-border, #858585));
			}

			.commit-message__text.placeholder {
				font-style: italic;
				color: var(--vscode-input-placeholderForeground);
			}

			.commit-message__text .scrollable {
				display: block;
				overflow-y: auto;
			}

			.commit-message__text .scrollable,
			.commit-message__input {
				min-height: 1lh;
				max-height: 10lh;
				padding: var(--gl-space-8) var(--gl-space-10);
			}

			.commit-message__summary {
				display: block;
			}

			p.commit-message__text .scrollable .commit-message__body {
				display: block;
				margin-top: 0.5rem;
				font-size: 1.15rem !important;
				line-height: 1.8rem !important;
				color: var(--vscode-descriptionForeground) !important;
			}

			.commit-message__field {
				position: relative;
			}

			.commit-message__input {
				box-sizing: content-box;
				width: calc(100% - 2.2rem);
				vertical-align: middle;
				resize: none;
				background: var(--vscode-input-background, #3c3c3c);
				border: var(--gl-border-width) solid var(--vscode-input-border, #858585);
				field-sizing: content;
			}

			.commit-message__input::-webkit-scrollbar {
				width: 10px;
			}

			.commit-message__input::-webkit-scrollbar-track {
				background: transparent;
			}

			.commit-message__input::-webkit-scrollbar-thumb {
				background-color: transparent;
				border-color: transparent;
				border-right-style: inset;
				border-right-width: calc(100vw + 100vh);
				border-radius: unset !important;
			}

			.commit-message__input:hover::-webkit-scrollbar-thumb,
			.commit-message__input:focus-within::-webkit-scrollbar-thumb {
				border-color: var(--vscode-scrollbarSlider-background);
			}

			.commit-message__input::-webkit-scrollbar-thumb:hover {
				border-color: var(--vscode-scrollbarSlider-hoverBackground);
			}

			.commit-message__input::-webkit-scrollbar-thumb:active {
				border-color: var(--vscode-scrollbarSlider-activeBackground);
			}

			.commit-message__input:has(~ .commit-message__ai-button) {
				width: calc(100% - 4.2rem);
				padding-right: 3rem;
			}

			.commit-message__input.has-explanation {
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
			}

			.commit-message__input::placeholder {
				color: var(--vscode-input-placeholderForeground);
				-webkit-font-smoothing: auto;
			}

			.commit-message__input:focus {
				outline: var(--gl-border-width) solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.commit-message__input[aria-valid='false'] {
				border-color: var(--vscode-inputValidation-errorBorder);
			}

			.commit-message__input:disabled {
				pointer-events: none;
				cursor: not-allowed;
				opacity: 0.4;
			}

			.commit-message__explanation {
				padding: var(--gl-space-8) var(--gl-space-16);
				margin-block: 0;
				font-size: var(--gl-font-md);
				line-height: 1.4;
				color: var(--vscode-input-foreground);
				background: var(--vscode-multiDiffEditor-headerBackground);
				border: var(--gl-border-width) solid var(--vscode-panel-border);
				border-top: none;
				border-radius: 0 0 var(--gl-input-border-radius) var(--gl-input-border-radius);
			}

			.commit-message__explanation-block {
				margin-block: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.commit-message__explanation:focus-visible,
			.commit-message__explanation:hover {
				.commit-message__explanation-block {
					overflow: visible;
					text-overflow: unset;
					white-space: normal;
				}
			}

			.commit-message__explanation-text {
				color: var(--color-foreground--75);
			}

			.message {
				z-index: 1000;

				/* position: absolute;
		top: 100%;
		left: 0;
		width: 100%; */
				padding: var(--gl-space-4);
				font-size: var(--gl-font-md);
				line-height: 1.4;
				color: var(--gl-search-input-foreground);
				background-color: var(--vscode-inputValidation-infoBackground);
				border: var(--gl-border-width) solid var(--vscode-inputValidation-infoBorder);
				transform: translateY(-0.1rem);
			}

			.message:empty {
				display: none;
			}

			.commit-message__input[aria-valid='false'] + .message {
				background-color: var(--vscode-inputValidation-errorBackground);
				border-color: var(--vscode-inputValidation-errorBorder);
			}

			.commit-message__ai-button {
				position: absolute;
				top: 0.5rem;
				right: 0.7rem;
				z-index: 1;
			}
		`],dU([eI({type:String,attribute:"commit-id",reflect:!0})],dW.prototype,"commitId",2),dU([eI({type:String})],dW.prototype,"message",2),dU([eI({type:String})],dW.prototype,"explanation",2),dU([eI({type:Boolean,attribute:"ai-generated",reflect:!0})],dW.prototype,"aiGenerated",2),dU([eI({type:String,attribute:"explanation-label"})],dW.prototype,"explanationLabel",2),dU([eI({type:String})],dW.prototype,"placeholder",2),dU([eI({type:Boolean,reflect:!0})],dW.prototype,"editable",2),dU([eI({type:Boolean,attribute:"ai-enabled",reflect:!0})],dW.prototype,"aiEnabled",2),dU([eI({type:String})],dW.prototype,"aiDisabledReason",2),dU([eI({type:Boolean,reflect:!0})],dW.prototype,"generating",2),dU([eD("#focusable")],dW.prototype,"focusableElement",2),dU([eA()],dW.prototype,"validityMessage",2),dU([eA()],dW.prototype,"isEditing",2),dW=dU([e$("gl-commit-message")],dW);var dV=Object.defineProperty,dG=Object.getOwnPropertyDescriptor,dY=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?dG(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&dV(t,i,r),r};let dZ=class extends lit_element_i{constructor(){super(...arguments),this.commits=[],this.selectedCommits=[],this.hunks=[],this.selectedUnassignedSection=null,this.commitMessageExpanded=!0,this.aiExplanationExpanded=!0,this.filesChangedExpanded=!0,this.selectedHunkIds=new Set,this.generatingCommitMessage=null,this.committing=!1,this.aiEnabled=!1,this.aiDisabledReason=null,this.isPreviewMode=!1,this.compositionSummarySelected=!1,this.hasChanges=!0,this.canEditCommitMessages=!0,this.canMoveHunks=!0,this.defaultFilesExpanded=!0,this.hunksSortables=[],this.isDraggingHunks=!1,this.draggedHunkIds=[],this.handleFilesListDragOver=e=>{e.preventDefault();let t=e.currentTarget;this.isDraggingHunks&&(t.classList.add("drag-over"),this.dragOverCleanupTimeout&&clearTimeout(this.dragOverCleanupTimeout),this.autoScrollInterval||(this.dragOverCleanupTimeout=window.setTimeout(()=>{t.classList.remove("drag-over")},150)))},this.handleFilesListDrop=e=>{e.preventDefault(),e.currentTarget.classList.remove("drag-over");let t=e.currentTarget.closest("[data-commit-id]")?.getAttribute("data-commit-id");t&&this.isDraggingHunks&&this.draggedHunkIds.length>0&&this.dispatchEvent(new CustomEvent("move-hunks-to-commit",{detail:{hunkIds:this.draggedHunkIds,targetCommitId:t},bubbles:!0})),this.dispatchHunkDragEnd()},this.handleGlobalDragEnd=()=>{this.isDraggingHunks&&this.dispatchHunkDragEnd()},this.handleDragOverForAutoScroll=e=>{if(!this.detailsPanel?.classList.contains("split-view")||!this.isDraggingHunks)return;e.preventDefault();let t=e.currentTarget,i=t.getBoundingClientRect(),o=e.clientY-i.top;this.autoScrollInterval&&(clearInterval(this.autoScrollInterval),this.autoScrollInterval=void 0),o<120&&t.scrollTop>0?this.autoScrollInterval=window.setInterval(()=>{if(t.scrollTop<=0){clearInterval(this.autoScrollInterval),this.autoScrollInterval=void 0;return}t.scrollTop=Math.max(0,t.scrollTop-25)},16):o>i.height-120&&t.scrollTop<t.scrollHeight-t.clientHeight&&(this.autoScrollInterval=window.setInterval(()=>{let e=t.scrollHeight-t.clientHeight;if(t.scrollTop>=e){clearInterval(this.autoScrollInterval),this.autoScrollInterval=void 0;return}t.scrollTop=Math.min(e,t.scrollTop+25)},16))}}updated(e){super.updated(e),(e.has("selectedCommits")||e.has("hunks")||e.has("isPreviewMode")||e.has("canMoveHunks"))&&(this.initializeHunksSortable(),this.setupAutoScroll()),e.has("selectedCommits")&&this.updateCommitMessageStickyOffset()}updateCommitMessageStickyOffset(){this.commitMessageResizeObserver||(this.commitMessageResizeObserver=new ResizeObserver(()=>{let e=this.shadowRoot?.querySelector("gl-commit-message");if(e&&this.changesList){let t=e.getBoundingClientRect().height;this.changesList.style.setProperty("--file-header-sticky-top",`${t}px`)}})),this.commitMessageResizeObserver.disconnect();let e=this.shadowRoot?.querySelector("gl-commit-message");if(e&&(this.commitMessageResizeObserver.observe(e),this.changesList)){let t=e.getBoundingClientRect().height;this.changesList.style.setProperty("--file-header-sticky-top",`${t}px`)}}disconnectedCallback(){super.disconnectedCallback?.(),this.destroyHunksSortables(),this.cleanupAutoScroll(),this.dragOverCleanupTimeout&&(clearTimeout(this.dragOverCleanupTimeout),this.dragOverCleanupTimeout=void 0),this.commitMessageResizeObserver&&(this.commitMessageResizeObserver.disconnect(),this.commitMessageResizeObserver=void 0)}destroyHunksSortables(){this.hunksSortables.forEach(e=>e.destroy()),this.hunksSortables=[]}initializeHunksSortable(){if(this.destroyHunksSortables(),this.isPreviewMode||!this.canMoveHunks)return;let e=this.shadowRoot?.querySelectorAll(".file-hunks");e?.forEach(e=>{let t=e.closest("[data-commit-id]")?.getAttribute("data-commit-id"),i=this.selectedCommits.find(e=>e.id===t),o=i?.locked===!0,s=s4.create(e,{group:{name:"hunks",pull:!o,put:!1},animation:0,dragClass:"sortable-drag",selectedClass:"sortable-selected",sort:!1,filter:o?()=>!0:void 0,onStart:e=>{let t=e.item.dataset.hunkId;t&&this.selectedHunkIds.has(t)&&this.selectedHunkIds.size>1?this.dispatchHunkDragStart([...this.selectedHunkIds]):this.dispatchHunkDragStart(t?[t]:[]),e.item.setAttribute("data-original-parent",e.from.id||"unknown")},onEnd:()=>{this.dispatchHunkDragEnd()}});this.hunksSortables.push(s)});let t=this.shadowRoot?.querySelectorAll(".files-changed");t?.forEach(e=>{e.addEventListener("dragover",this.handleFilesListDragOver),e.addEventListener("drop",this.handleFilesListDrop)})}setupAutoScroll(){this.cleanupAutoScroll(),this.detailsPanel.addEventListener("dragover",this.handleDragOverForAutoScroll),document.addEventListener("dragend",this.handleGlobalDragEnd)}cleanupAutoScroll(){this.detailsPanel.removeEventListener("dragover",this.handleDragOverForAutoScroll),document.removeEventListener("dragend",this.handleGlobalDragEnd),this.autoScrollInterval&&(clearInterval(this.autoScrollInterval),this.autoScrollInterval=void 0)}dispatchHunkDragStart(e){this.isDraggingHunks=!0,this.draggedHunkIds=e,this.dispatchEvent(new CustomEvent("hunk-drag-start",{detail:{hunkIds:e},bubbles:!0}))}dispatchHunkDragEnd(){this.isDraggingHunks=!1,this.draggedHunkIds=[],this.autoScrollInterval&&(clearInterval(this.autoScrollInterval),this.autoScrollInterval=void 0),this.dragOverCleanupTimeout&&(clearTimeout(this.dragOverCleanupTimeout),this.dragOverCleanupTimeout=void 0);let e=this.shadowRoot?.querySelectorAll(".files-changed");e?.forEach(e=>{e.classList.remove("drag-over")}),this.dispatchEvent(new CustomEvent("hunk-drag-end",{bubbles:!0}))}handleCommitMessageChange(e,t){this.dispatchEvent(new CustomEvent("update-commit-message",{detail:{commitId:e,message:t},bubbles:!0}))}handleGenerateCommitMessage(e,t){t?.preventDefault(),t?.stopPropagation();let i=this.selectedCommits.find(t=>t.id===e),o=i?.hunkIndices||[];this.dispatchEvent(new CustomEvent("generate-commit-message",{detail:{commitId:e,hunkIndices:o},bubbles:!0}))}handleCollapseAllFiles(){this.defaultFilesExpanded=!1}handleExpandAllFiles(){this.defaultFilesExpanded=!0}renderFilesChangedHeader(e){return em`
			<div class="files-headline">
				<h3 class="files-headline__title">Files Changed (${e})</h3>
				<div class="files-headline__actions">
					<gl-button appearance="toolbar" @click=${this.handleExpandAllFiles} tooltip="Expand All">
						<code-icon icon="expand-all"></code-icon>
					</gl-button>
					<gl-button appearance="toolbar" @click=${this.handleCollapseAllFiles} tooltip="Collapse All">
						<code-icon icon="collapse-all"></code-icon>
					</gl-button>
				</div>
			</div>
		`}renderFileHierarchy(e){return[...(function(e){let t=new Map;for(let i of e){let e=t.get(i.fileName);null==e&&(e=[],t.set(i.fileName,e)),e.push(i)}return t})(e).entries()].filter(([,e])=>e.length>0).map(([e,t])=>this.renderFile(e,t))}renderFile(e,t){return em`<gl-diff-file
			.filename=${e}
			.hunks=${t}
			.defaultExpanded=${this.defaultFilesExpanded}
		></gl-diff-file>`}dispatchHunkSelect(e,t=!1){this.dispatchEvent(new CustomEvent("hunk-selected",{detail:{hunkId:e,shiftKey:t},bubbles:!0}))}focusCommitMessageInput(e,t=!1){let i=this.shadowRoot?.querySelector(`[data-commit-id="${e}"] gl-commit-message`);i&&(i.focus(),i.select(t))}renderUnassignedSectionDetails(){if(!this.selectedUnassignedSection)return eb;let e=this.getHunksForSection(this.selectedUnassignedSection);return em`
			<article class="change-details">
				<gl-commit-message .message=${this.getSectionTitle(this.selectedUnassignedSection)}></gl-commit-message>

				<section>
					${this.renderFilesChangedHeader(rb(e).length)}
					<div class="files-list" data-source="${this.selectedUnassignedSection}">
						${this.renderFileHierarchy(e)}
					</div>
				</section>
			</article>
		`}renderCommitDetails(e){let t=rg(e,this.hunks);return em`
			<article class="change-details" data-commit-id=${e.id}>
				<gl-commit-message
					.message=${e.message.content}
					.commitId=${e.id}
					.explanation=${e.aiExplanation}
					?ai-generated=${e.message.isGenerated}
					?generating=${this.generatingCommitMessage===e.id}
					?ai-enabled=${this.aiEnabled}
					.aiDisabledReason=${this.aiDisabledReason}
					?editable=${this.canEditCommitMessages&&!0!==e.locked}
					@message-change=${t=>this.handleCommitMessageChange(e.id,t.detail.message)}
					@generate-commit-message=${t=>this.handleGenerateCommitMessage(e.id,t)}
				></gl-commit-message>

				<section>
					${this.renderFilesChangedHeader(rv(e,this.hunks))}
					<div class="files-list" data-commit-id=${e.id}>${this.renderFileHierarchy(t)}</div>
				</section>
			</article>
		`}getHunksForSection(e){let t=rf(this.hunks);switch(e){case"staged":return t.staged;case"unstaged":return t.unstaged;case"unassigned":return t.unassigned;default:return[]}}getSectionTitle(e){switch(e){case"staged":return"Staged Changes";case"unstaged":return"Unstaged Changes";case"unassigned":return"Unassigned Changes";default:return"Changes"}}renderCompositionSummary(){if(!this.compositionSummarySelected)return eb;let e=function(e,t,i="Generated Commits"){if(!e.length)return`# ${i}

No commits generated.`;let o=`# ${i}

`;o+=`Here's the breakdown of the commits created from the provided changes, along with explanations for each:

`;for(let t=0;t<e.length;t++){let i=e[t],s=`### Commit ${t+1}: ${i.message.content}`;i.aiExplanation?o+=`${s}

${i.aiExplanation}

`:o+=`${s}

No explanation provided.

`}return o}(this.commits,this.hunks);return em`
			<article class="change-details composition-summary">
				<gl-markdown density="document" .markdown=${e}></gl-markdown>
			</article>
		`}render(){if(!this.hasChanges)return em`
				<div class="details-panel" @click=${this.handlePanelClick}>
					<div class="changes-list scrollable">${this.renderNoChangesState()}</div>
				</div>
			`;let e=this.selectedCommits.length>1;return em`
			<div class="details-panel ${e?"split-view":""}" @click=${this.handlePanelClick}>
				<div class="changes-list scrollable">${this.renderDetails()}</div>
			</div>
		`}handlePanelClick(e){let t=e.target;if(!(["input","textarea","button","a","select","gl-button","gl-commit-message"].includes(t.tagName.toLowerCase())||t.closest("gl-commit-message, gl-button, button, a, input, textarea, select"))){let e=this.shadowRoot?.activeElement;e&&"blur"in e&&"function"==typeof e.blur&&e.blur()}}renderNoChangesState(){return em`
			<div class="no-changes-state">
				<h2 class="no-changes-title">Commit Composer Needs Something to Compose</h2>
				<p class="no-changes-description">
					Commit Composer helps you organize changes into meaningful commits before committing them and can
					leverage AI to do this automatically.
				</p>
				<p class="no-changes-description">
					Make some working directory changes and Reload or come back to this view to see how it works.
				</p>
				<!-- <nav class="no-changes-actions"> -->
				<button-container layout="editor" grouping="gap-wide">
					<gl-button full appearance="secondary" @click=${this.handleClose}>Close</gl-button>
					<gl-button full @click=${this.handleReload}>Reload</gl-button>
				</button-container>
			</div>
		`}handleClose(){this.dispatchEvent(new CustomEvent("close-composer",{bubbles:!0}))}handleReload(){this.dispatchEvent(new CustomEvent("reload-composer",{bubbles:!0}))}renderDetails(){return this.compositionSummarySelected?this.renderCompositionSummary():this.selectedUnassignedSection?this.renderUnassignedSectionDetails():0===this.selectedCommits.length?em`<p class="empty-state">
				<code-icon class="empty-state__icon" icon="list-unordered"></code-icon><br />
				Select a commit or unassigned changes to view details
			</p>`:lt(this.selectedCommits,e=>e.id,e=>this.renderCommitDetails(e))}};dZ.styles=[rS,r$,rC,S`
			[hidden] {
				display: none !important;
			}

			:host {
				display: contents;
			}

			.details-panel {
				display: flex;
				flex: 1;
				flex-direction: column;
				gap: var(--gl-space-16);
				overflow: hidden;
			}

			.details-panel.split-view {
				flex-direction: column;
				overflow-y: auto;
				scroll-behavior: smooth;
			}

			.changes-list {
				display: flex;
				flex: 1;
				flex-direction: column;
				gap: var(--gl-space-32);
				overflow-y: auto;
				--commit-message-sticky-top: 0;
			}

			.change-details gl-commit-message {
				--sticky-top: var(--commit-message-sticky-top);
			}

			.change-details {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-12);
			}

			.files-headline {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-block: 0 var(--gl-space-8);
				font-size: var(--gl-font-lg);
			}

			.files-headline__title {
				margin: 0;
			}

			.files-headline__actions {
				display: flex;
				gap: var(--gl-space-4);
			}

			.files-list {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-8);
			}

			.files-list.drag-over {
				background: var(--vscode-list-dropBackground);
				border: 2px solid var(--vscode-focusBorder);
			}

			.file-group {
				overflow: hidden;
				border: var(--gl-border-width) solid var(--vscode-panel-border);
				border-radius: var(--gl-radius-sm);
			}

			.file-group__header {
				display: flex;
				align-items: center;
				padding: 0.5rem 0.8rem;
				cursor: pointer;
				background: var(--vscode-editorGroupHeader-tabsBackground);
			}

			.file-group[open] .file-group__header {
				border-bottom: var(--gl-border-width) solid var(--vscode-panel-border);
			}

			.file-group__header:hover {
				background: var(--vscode-list-hoverBackground);
			}

			.file-group:not([open]) .file-group__icon--open,
			.file-group[open] .file-group__icon--closed {
				display: none;
			}

			.file-name {
				display: flex;
				gap: 0.5rem;
				align-items: center;
				font-size: var(--gl-font-lg);
				font-weight: 500;
				color: var(--vscode-foreground);
			}

			.file-stats {
				display: flex;
				gap: 0.5rem;
				align-items: center;
				font-size: 0.8rem;
				font-weight: 500;
			}

			.file-stats .additions {
				color: var(--vscode-gitDecoration-addedResourceForeground);
			}

			.file-stats .deletions {
				color: var(--vscode-gitDecoration-deletedResourceForeground);
			}

			.file-hunks {
				display: flex;
				flex-direction: column;
			}

			.empty-state,
			.no-changes-state {
				max-width: 80rem;
				padding: var(--gl-space-20);
				color: var(--color-foreground--85);
				background: var(--vscode-editor-background);
				border: var(--gl-border-width) solid var(--vscode-panel-border);
				border-radius: var(--gl-radius-sm);
			}

			.change-details.composition-summary {
				gap: 0;
				padding: var(--gl-space-16);
				border: var(--gl-border-width) solid var(--vscode-panel-border);
				border-radius: var(--gl-radius-sm);
			}

			.empty-state {
				margin-block: 0;
				font-weight: bold;
				text-align: center;
			}

			.empty-state__icon {
				margin-block-end: var(--gl-space-8);
				font-size: 7.2rem;
				opacity: 0.75;
			}

			.no-changes-title {
				margin-block: 0;
				font-size: 1.6rem;
				font-weight: 600;
				color: var(--color-foreground);
			}

			.no-changes-description {
				margin-block: var(--gl-space-16);
				line-height: 1.5;
				text-wrap: pretty;
			}

			.no-changes-actions {
				display: flex;
				gap: var(--gl-space-12);
				margin-block-start: var(--gl-space-16);
			}
		`],dY([eI({type:Array})],dZ.prototype,"commits",2),dY([eI({type:Array})],dZ.prototype,"selectedCommits",2),dY([eI({type:Array})],dZ.prototype,"hunks",2),dY([eI()],dZ.prototype,"selectedUnassignedSection",2),dY([eI({type:Boolean})],dZ.prototype,"commitMessageExpanded",2),dY([eI({type:Boolean})],dZ.prototype,"aiExplanationExpanded",2),dY([eI({type:Boolean})],dZ.prototype,"filesChangedExpanded",2),dY([eI({type:Object})],dZ.prototype,"selectedHunkIds",2),dY([eI({type:String})],dZ.prototype,"generatingCommitMessage",2),dY([eI({type:Boolean})],dZ.prototype,"committing",2),dY([eI({type:Boolean})],dZ.prototype,"aiEnabled",2),dY([eI({type:String})],dZ.prototype,"aiDisabledReason",2),dY([eI({type:Boolean})],dZ.prototype,"isPreviewMode",2),dY([eI({type:Boolean})],dZ.prototype,"compositionSummarySelected",2),dY([eI({type:Boolean})],dZ.prototype,"hasChanges",2),dY([eI({type:Boolean})],dZ.prototype,"canEditCommitMessages",2),dY([eI({type:Boolean})],dZ.prototype,"canMoveHunks",2),dY([eA()],dZ.prototype,"defaultFilesExpanded",2),dY([eD(".details-panel")],dZ.prototype,"detailsPanel",2),dY([eD(".changes-list")],dZ.prototype,"changesList",2),dZ=dY([e$("gl-details-panel")],dZ);var dX=Object.defineProperty,dK=Object.getOwnPropertyDescriptor,dJ=(e,t,i,o)=>{for(var s,r=o>1?void 0:o?dK(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&dX(t,i,r),r};let dQ="composer-onboarding",d0="https://github.com/gitkraken/vscode-gitlens/discussions/4530",d1=class extends lit_element_i{constructor(){super(...arguments),this.history={resetState:null,undoStack:[],redoStack:[]},this.commitMessageBeingEdited=null,this.selectedCommitId=null,this.selectedUnassignedSection=null,this.selectedCommitIds=new Set,this.anchorCommitId=null,this.selectedHunkId=null,this.selectedHunkIds=new Set,this.initialCustomInstructions="",this.compositionSummarySelected=!1,this.compositionFeedback=null,this.compositionSessionId=null,this.currentDropTarget=null,this.lastSelectedHunkId=null,this.showCommitsGeneratedModal=!1,this.onboardingStepNumber=0,this.isDragging=!1,this.autoScrollActive=!1,this.mouseTracker=e=>{this.lastMouseEvent=e},this.onboardingSteps=[{key:`${dQ}-welcome`,popover:{title:"Welcome to Commit Composer",description:`Compose your changes into organized, meaningful commits before committing them. Use AI to automatically structure your work into draft commits with clear messages and descriptions, or commit manually. <br><br> <a href="${d0}">Learn More</a>`}},{key:`${dQ}-compose`,element:()=>this.commitsPanel.autoComposeSection,popover:{title:"Auto Compose Commits",description:"Allow AI to organize your working changes into well-formed commits with clear messages and descriptions that help reviewers. <br><br> You can change which model to use and add custom instructions."}},{key:`${dQ}-changes`,element:()=>this.commitsPanel.changesSection,popover:{title:"Review and Compose Working Changes",description:"Draft Commits represent what will be committed when you're finished. You can inspect changes to add commit messages and review diffs. <br><br> Coming soon: add draft commits and easily move hunks and lines between them."}},{key:`${dQ}-finish`,element:()=>this.commitsPanel.finishSection,popover:{title:"Finish & Commit",description:"Draft commits and messages will be committed when you're finished."}}]}firstUpdated(){setTimeout(()=>this.initializeSortable(),200),this.initializeDragTracking(),this.state.commits.length>0&&this.selectCommit(this.state.commits[0].id),this.initializeResetStateIfNeeded(),this.state.onboardingDismissed||this.hasAnyError()||this.openOnboarding(),this.state.autoComposeInstructions&&(this.initialCustomInstructions=this.state.autoComposeInstructions)}updated(e){super.updated(e),this.initializeResetStateIfNeeded(),e.has("commits")&&setTimeout(()=>this.initializeCommitDropZones(),100),this.hasAnyError()&&this.onboarding&&this.dismissOnboarding(),0===e.size&&this.handleForcedUpdate()}handleForcedUpdate(){this.compositionSummarySelected||this.selectedUnassignedSection||this.selectedCommitId||this.state.commits.length>0&&this.selectCommit(this.state.commits[0].id)}connectedCallback(){super.connectedCallback?.(),this._ipc.onReceiveMessage(e=>{!0===og.is(e)&&(this.compositionSummarySelected=!0)})}disconnectedCallback(){super.disconnectedCallback?.(),this.hunksSortable?.destroy(),this.commitMessageDebounceTimer&&clearTimeout(this.commitMessageDebounceTimer),this.commitMessageBeingEdited=null,this.onboarding?.destroy()}initializeSortable(){this.initializeHunksSortable(),this.initializeAllDropZones()}initializeHunksSortable(){this.hunksSortable?.destroy();let e=this.shadowRoot?.querySelectorAll(".hunks-list");e&&e.length>0&&e.forEach(e=>{s4.create(e,{group:{name:"hunks",pull:"clone",put:!0},animation:150,ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",sort:!1,onStart:e=>{this.isDragging=!0;let t=e.item.dataset.hunkId;t&&this.selectedHunkIds.has(t)&&this.selectedHunkIds.size>1&&(e.item.dataset.multiDragHunkIds=[...this.selectedHunkIds].join(",")),this.startAutoScroll()},onEnd:()=>{this.isDragging=!1,this.stopAutoScroll()},onAdd:e=>{let t=e.item.dataset.hunkId,i=e.item.dataset.multiDragHunkIds,o=e.to.dataset.commitId;if(o)if(i&&"string"==typeof i){let e=i.split(",");this.moveHunksToCommit(e,o)}else t&&this.moveHunkToCommit(t,o);e.item.remove()}})})}initializeAllDropZones(){let e=this.shadowRoot?.querySelector(".new-commit-drop-zone");e&&s4.create(e,{group:{name:"hunks",pull:!1,put:!0},animation:150,onMove:e=>"gl-hunk-item"===e.dragged.tagName.toLowerCase(),onAdd:e=>{let t=e.item.dataset.hunkId,i=e.item.dataset.multiDragHunkIds;if(i&&"string"==typeof i){let e=i.split(",");this.createNewCommitWithHunks(e)}else t&&this.createNewCommitWithHunk(t);e.item.remove()}}),this.initializeCommitDropZones()}initializeCommitDropZones(){setTimeout(()=>{let e=this.shadowRoot?.querySelectorAll("gl-commit-item");e?.forEach(e=>{let t=e.shadowRoot?.querySelector(".drop-zone");t&&s4.create(t,{group:{name:"hunks",pull:!1,put:!0},animation:150,onMove:e=>"gl-hunk-item"===e.dragged.tagName.toLowerCase(),onAdd:t=>{let i=t.item.dataset.hunkId,o=t.item.dataset.multiDragHunkIds,s=e.dataset.commitId;if(s)if(o&&"string"==typeof o){let e=o.split(",");this.moveHunksToCommit(e,s)}else i&&this.moveHunkToCommit(i,s);t.item.remove()}})})},50)}createDataSnapshot(){return{hunks:JSON.parse(JSON.stringify(this.state?.hunks??[])),commits:JSON.parse(JSON.stringify(this.state?.commits??[])),selectedCommitId:this.selectedCommitId,selectedCommitIds:new Set([...this.selectedCommitIds]),selectedUnassignedSection:this.selectedUnassignedSection,selectedHunkIds:new Set([...this.selectedHunkIds]),hasUsedAutoCompose:this.state?.hasUsedAutoCompose??!1,recompose:this.state?.recompose?JSON.parse(JSON.stringify(this.state.recompose)):null,compositionSummarySelected:this.compositionSummarySelected}}applyDataSnapshot(e){let t={...this.state,hunks:e.hunks,commits:e.commits,hasUsedAutoCompose:e.hasUsedAutoCompose,recompose:e.recompose,timestamp:Date.now()};this.state=t,this.selectedCommitId=e.selectedCommitId,this.selectedCommitIds=e.selectedCommitIds,this.selectedUnassignedSection=e.selectedUnassignedSection,this.selectedHunkIds=e.selectedHunkIds,this.compositionSummarySelected=e.compositionSummarySelected,this.requestUpdate()}saveToHistory(){for(this.history.redoStack=[];this.history.undoStack.length>=3;)this.history.undoStack.shift();this.history.undoStack.push(this.createDataSnapshot())}initializeResetStateIfNeeded(){this.history.resetState||(this.history.resetState=this.createDataSnapshot())}resetHistory(){this.history={resetState:null,undoStack:[],redoStack:[]}}canUndo(){return this.history.undoStack.length>0}canRedo(){return this.history.redoStack.length>0}undo(){if(!this.canUndo())return;for(;this.history.redoStack.length>=3;)this.history.redoStack.shift();this.history.redoStack.push(this.createDataSnapshot());let e=this.history.undoStack.pop();this.applyDataSnapshot(e),this._ipc.sendCommand(oc,void 0)}redo(){if(!this.canRedo())return;for(;this.history.undoStack.length>=3;)this.history.undoStack.shift();this.history.undoStack.push(this.createDataSnapshot());let e=this.history.redoStack.pop();this.applyDataSnapshot(e),this._ipc.sendCommand(od,void 0)}reset(){this.history.resetState&&(this.saveToHistory(),this.applyDataSnapshot(this.history.resetState),this._ipc.sendCommand(oh,void 0))}reorderCommits(e,t){this.saveToHistory();let i=[...this.state.commits],o=i.length-1-e,s=i.length-1-t,[r]=i.splice(o,1);i.splice(s,0,r),this.state.commits=i,this.requestUpdate()}handleHunkDragStart(e){this.isDragging=!0,this.startAutoScroll();let t=this.shadowRoot?.querySelector("gl-commits-panel");t&&t.dispatchEvent(new CustomEvent("hunk-drag-start",{detail:{hunkIds:e},bubbles:!0}))}handleHunkDragEnd(){let e=this.shadowRoot?.querySelector("gl-commits-panel");e&&e.dispatchEvent(new CustomEvent("hunk-drag-end",{bubbles:!0})),this.currentDropTarget=null,this.isDragging=!1,this.stopAutoScroll()}initializeDragTracking(){document.addEventListener("dragover",e=>{e.preventDefault();let t=e.target.closest(".new-commit-drop-zone, .unassign-drop-zone, gl-commit-item");this.currentDropTarget=t}),document.addEventListener("dragleave",e=>{e.relatedTarget?.closest(".composer-container")||(this.currentDropTarget=null)}),document.addEventListener("drop",()=>{this.currentDropTarget=null,this.isDragging=!1})}handleHunkMove(e,t){let i=parseInt(e,10),o=this.state.commits.find(e=>e.hunkIndices.includes(i));o&&(o.hunkIndices=o.hunkIndices.filter(e=>e!==i));let s=this.state.commits.find(e=>e.id===t);s&&!s.hunkIndices.includes(i)&&s.hunkIndices.push(i),this.state.commits=this.state.commits.filter(e=>e.hunkIndices.length>0),this.selectedHunkIds=new Set,this.requestUpdate()}createNewCommitWithHunks(e){this.saveToHistory();let t=e.map(e=>parseInt(e,10)).filter(e=>!isNaN(e));this.state.commits.forEach(e=>{e.hunkIndices=e.hunkIndices.filter(e=>!t.includes(e))});let i={id:`commit-${Date.now()}`,message:{content:"",isGenerated:!1},hunkIndices:t};this.state.commits.push(i),this.state.commits=[...this.state.commits],this.selectedCommitId=i.id,this.selectedCommitIds=new Set,this.selectedHunkIds=new Set,this.requestUpdate()}unassignHunks(e){this.saveToHistory();let t=e.map(e=>parseInt(e,10)).filter(e=>!isNaN(e));this.state.commits.forEach(e=>{e.hunkIndices=e.hunkIndices.filter(e=>!t.includes(e))}),this.state.commits=this.state.commits.filter(e=>e.hunkIndices.length>0),this.selectedHunkIds=new Set,this.requestUpdate()}moveHunksToCommit(e,t){if(!this.canMoveHunks)return;this.saveToHistory();let i=e.map(e=>parseInt(e,10)).filter(e=>!isNaN(e));this.state.commits.forEach(e=>{e.hunkIndices=e.hunkIndices.filter(e=>!i.includes(e))});let o=this.state.commits.find(e=>e.id===t);o&&i.forEach(e=>{o.hunkIndices.includes(e)||o.hunkIndices.push(e)}),this.state.commits=this.state.commits.filter(e=>e.hunkIndices.length>0),this.selectedHunkIds=new Set,this.requestUpdate()}moveHunkToCommit(e,t){this.moveHunksToCommit([e],t)}createNewCommitWithHunk(e){this.createNewCommitWithHunks([e])}selectHunk(e,t=!1){if(t){let t=new Set(this.selectedHunkIds);if(this.selectedHunkId&&0===this.selectedHunkIds.size&&t.add(this.selectedHunkId),this.lastSelectedHunkId&&this.lastSelectedHunkId!==e){let i=this.hunksWithAssignments,o=i.findIndex(e=>e.index.toString()===this.lastSelectedHunkId),s=i.findIndex(t=>t.index.toString()===e);if(-1!==o&&-1!==s){let e=Math.min(o,s),r=Math.max(o,s);for(let o=e;o<=r;o++)t.add(i[o].index.toString());return}}t.has(e)?t.delete(e):t.add(e),this.selectedHunkIds=t,this.lastSelectedHunkId=e,this.selectedHunkIds.size>1?this.selectedHunkId=null:1===this.selectedHunkIds.size?(this.selectedHunkId=[...this.selectedHunkIds][0],this.selectedHunkIds=new Set):this.selectedHunkId=null}else this.selectedHunkIds=new Set,this.selectedHunkId=e,this.lastSelectedHunkId=e}selectCommit(e,t=!1){if(t)if(this.state?.recompose?.enabled===!0){let t=this.state.commits,i=t.findIndex(t=>t.id===e);if(-1===i)return;if(!this.anchorCommitId){this.anchorCommitId=e,this.selectedCommitId=e;return}let o=t.findIndex(e=>e.id===this.anchorCommitId);if(-1===o)return;let s=Math.min(o,i),r=Math.max(o,i),a=new Set;for(let e=s;e<=r;e++)a.add(t[e].id);this.selectedCommitIds=a,this.selectedCommitId=null}else{let t=new Set(this.selectedCommitIds);this.selectedCommitId&&0===this.selectedCommitIds.size&&t.add(this.selectedCommitId),t.has(e)?t.delete(e):t.add(e),this.selectedCommitIds=t,this.selectedCommitIds.size>1?this.selectedCommitId=null:1===this.selectedCommitIds.size?(this.selectedCommitId=[...this.selectedCommitIds][0],this.selectedCommitIds=new Set):this.selectedCommitId=null}else this.selectedCommitIds=new Set,this.selectedCommitId=e,this.anchorCommitId=e;this.selectedUnassignedSection=null,this.compositionSummarySelected=!1,this.updateComplete.then(()=>{setTimeout(()=>{this.initializeHunksSortable(),this.initializeCommitDropZones()},50)})}selectUnassignedSection(e){this.selectedCommitId=null,this.selectedCommitIds=new Set,this.selectedUnassignedSection=e,this.selectedHunkId=null,this.selectedHunkIds=new Set,this.compositionSummarySelected=!1,this.updateComplete.then(()=>{setTimeout(()=>{this.initializeHunksSortable(),this.initializeCommitDropZones()},50)})}updateCommitMessage(e,t){let i=this.state.commits.find(t=>t.id===e);i&&(this.commitMessageBeingEdited!==e&&(this.saveToHistory(),this.commitMessageBeingEdited=e),this.commitMessageDebounceTimer&&clearTimeout(this.commitMessageDebounceTimer),this.commitMessageDebounceTimer=window.setTimeout(()=>{this.commitMessageBeingEdited=null},1e3),i.message={content:t,isGenerated:!1},this.requestUpdate())}toggleCommitMessageExpanded(){this.state.detailsSectionExpanded.commitMessage=!this.state.detailsSectionExpanded.commitMessage,this.requestUpdate()}toggleAiExplanationExpanded(){this.state.detailsSectionExpanded.aiExplanation=!this.state.detailsSectionExpanded.aiExplanation,this.requestUpdate()}toggleFilesChangedExpanded(){this.state.detailsSectionExpanded.filesChanged=!this.state.detailsSectionExpanded.filesChanged,this.requestUpdate()}startAutoScroll(){this.autoScrollActive=!0,document.addEventListener("mousemove",this.mouseTracker,{passive:!1,capture:!0}),document.addEventListener("dragover",this.mouseTracker,{passive:!1,capture:!0}),document.addEventListener("pointermove",this.mouseTracker,{passive:!1,capture:!0}),this.autoScrollTimer=window.setInterval(()=>{if(this.autoScrollActive&&this.isDragging&&this.lastMouseEvent)try{this.performAutoScroll(this.lastMouseEvent.clientY)}catch{}},50)}stopAutoScroll(){this.autoScrollActive=!1,this.autoScrollTimer&&(clearInterval(this.autoScrollTimer),this.autoScrollTimer=void 0),document.removeEventListener("mousemove",this.mouseTracker,!0),document.removeEventListener("dragover",this.mouseTracker,!0),document.removeEventListener("pointermove",this.mouseTracker,!0)}performAutoScroll(e){let t=this.shadowRoot?.querySelector(".details-panel.split-view");if(t&&this.selectedCommitIds.size>=2){let i=t.getBoundingClientRect(),o=e-i.top,s=i.bottom-e;if(o>=0&&o<200&&t.scrollTop>0)return void t.scrollBy(0,-50);if(s>=0&&s<200){let e=t.scrollHeight-t.clientHeight;if(t.scrollTop<e)return void t.scrollBy(0,50)}}let i=this.shadowRoot?.querySelector(".commits-panel");if(i){let t=i.getBoundingClientRect(),o=e-t.top,s=t.bottom-e;if(o>=0&&o<200&&i.scrollTop>0)i.scrollTop=Math.max(0,i.scrollTop-30);else if(s>=0&&s<200){let e=i.scrollHeight-i.clientHeight;i.scrollTop<e&&(i.scrollTop=Math.min(e,i.scrollTop+30))}}}closeModal(){this.showCommitsGeneratedModal=!1,window.close()}get hunksWithAssignments(){if(!this.state?.hunks||!this.state?.commits)return[];let{hunks:e,commits:t}=this.state,i=this._hunksWithAssignmentsCache;if(i?.hunks===e&&i?.commits===t)return i.result;let o=function(e,t){let i=new Set;for(let e of t)for(let t of e.hunkIndices)i.add(t);return e.map(e=>({...e,assigned:i.has(e.index)}))}(e,t);return this._hunksWithAssignmentsCache={hunks:e,commits:t,result:o},o}get aiEnabled(){return this.state?.aiEnabled?.org===!0&&this.state?.aiEnabled?.config===!0}get aiDisabledReason(){return this.state?.aiEnabled?.org!==!0?"AI features are disabled by your GitKraken admin":this.state?.aiEnabled?.config!==!0?"AI features are disabled in your settings":null}hasAnyError(){return this.state?.safetyError!=null||this.state?.loadingError!=null||this.state?.aiOperationError!=null}get canFinishAndCommit(){return!this.commitsLocked&&this.state.commits.length>0}get isPreviewMode(){return this.state?.mode==="preview"}get commitsLocked(){return this.state?.recompose?.enabled===!0&&this.state?.recompose?.locked===!0}get canCombineCommits(){return!this.isPreviewMode&&!this.commitsLocked}get showHistoryButtons(){return!0}get canMoveHunks(){return!this.isPreviewMode&&!this.commitsLocked}get canEditCommitMessages(){return!this.commitsLocked}get canReorderCommits(){return!this.commitsLocked}get isReadyToFinishAndCommit(){return this.state.commits.length>0&&this.state.commits.every(e=>e.message.content.trim().length>0)}get canGenerateCommitsWithAI(){return!!this.aiEnabled&&this.getEligibleHunksForAI().length>0}getEligibleHunksForAI(){let e;if(this.isPreviewMode)e=this.hunksWithAssignments.filter(e=>e.assigned);else{let t=new Set;this.state.commits.forEach(e=>{e.hunkIndices.forEach(e=>t.add(e))}),e=this.hunksWithAssignments.filter(e=>!t.has(e.index))}return e}get canGenerateCommitMessages(){return this.aiEnabled}finishAndCommit(){this._ipc.sendCommand(i4,{commits:this.state.commits,baseCommit:this.state.baseCommit})}closeComposer(){this._ipc.sendCommand(i6,void 0)}handleCloseSafetyError(){this.closeComposer()}handleReloadComposer(){this.resetHistory(),this._ipc.sendCommand(i8,{mode:this.state.mode})}handleCloseLoadingError(){this.closeComposer()}handleCloseAIOperationError(){this._ipc.sendCommand(oe,void 0)}handleCancelGenerateCommits(){this._ipc.sendCommand(i7,void 0)}handleCancelGenerateCommitMessage(){this._ipc.sendCommand(i9,void 0)}renderLoadingDialogs(){if(this.state.generatingCommits)return this.renderLoadingDialog("Generating Commits",this.state.generatingCommitsStatus??"Commits are being generated.",this.handleCancelGenerateCommits);if(null!=this.state.generatingCommitMessage)return this.renderLoadingDialog("Generating Commit Message","A commit message is being generated.",this.handleCancelGenerateCommitMessage);if(this.state.committing){let e=this.state.commits.filter(e=>""!==e.message.content.trim()).length;return this.renderLoadingDialog("Creating Commits",`Committing ${e} commit${1===e?"":"s"}.`)}return""}renderLoadingDialog(e,t,i){return em`
			<gl-dialog class="generic-dialog" open modal>
				<div class="generic-dialog__container">
					<h2>
						<code-icon icon="loading" modifier="spin"></code-icon>
						${e}
					</h2>
					<p class="generic-dialog__secondary">${t}</p>
					${oT(i,()=>em`<nav class="generic-dialog__actions">
								<gl-button appearance="secondary" @click=${i}>Cancel</gl-button>
							</nav>`)}
				</div>
			</gl-dialog>
		`}handleGenerateCommitsWithAI(e){let t;this.compositionFeedback=null,this.compositionSessionId=`composer-${Date.now()}-${Math.random().toString(36).substring(2,11)}`;let i=this.state.commits.some(e=>e.locked),o=[];i&&(o=this.state.commits.filter(e=>!e.locked).map(e=>e.id)),o.length||(o=!this.state.recompose?.enabled||this.state.hasUsedAutoCompose||i?[]:[...this.selectedCommitIds]),1===o.length&&(o=[]),!o.length&&this.state.recompose?.commitShas?.length&&(o=this.state.commits.filter(e=>e.sha&&!e.locked&&this.state.recompose.commitShas.includes(e.sha)).map(e=>e.id));let s=o.map(e=>{let t=this.state.commits.find(t=>t.id===e);return{id:t.id,sha:t.sha,hunkIndices:t.hunkIndices}});if(s.length&&s.every(e=>e.sha)&&this.state.baseCommit?.sha){let e=this.state.commits.findIndex(e=>e.id===s[0].id);t=e>0?this.state.commits[e-1].sha:this.state.baseCommit.sha}this.selectedCommitId=null,this.selectedCommitIds=new Set,this.selectedUnassignedSection=null,this.generateCommitsWithAI(e.detail?.customInstructions,s.length?{commits:s,baseShaForNewDiff:t}:void 0)}handleAddHunksToCommit(e){this._ipc.sendCommand(ol,{source:e.detail.source})}handleCloseComposer(){this.closeComposer()}handleSelectAIModel(){this._ipc.sendCommand(ot,void 0)}handleSelectCompositionSummary(){this.selectedCommitId=null,this.selectedCommitIds=new Set,this.selectedUnassignedSection=null,this.compositionSummarySelected=!0}handleCompositionFeedbackHelpful(e){let t=e.detail?.sessionId;this.compositionFeedback="helpful",this._ipc.sendCommand(oi,{sessionId:t})}handleCompositionFeedbackUnhelpful(e){let t=e.detail?.sessionId;this.compositionFeedback="unhelpful",this._ipc.sendCommand(oo,{sessionId:t})}handleFocusCommitMessage(e){let{commitId:t,checkValidity:i}=e.detail;t&&(this.selectedCommitId=t,this.selectedCommitIds=new Set([t]),this.selectedUnassignedSection=null,setTimeout(()=>{this.detailsPanel?.focusCommitMessageInput?.(t,i)},100))}generateCommitsWithAI(e="",t){if(!this.aiEnabled)return;let i=this.getEligibleHunksForAI();0!==i.length&&(this.saveToHistory(),this._ipc.sendCommand(i3,{hunkIndices:i.map(e=>e.index),commits:this.isPreviewMode?[]:this.state.commits,baseCommit:this.state.baseCommit,customInstructions:e||void 0,commitsToReplace:t}))}generateCommitMessage(e){if(!this.canGenerateCommitMessages)return;let t=this.state.commits.find(t=>t.id===e);t&&this._ipc.sendCommand(i5,{commitId:e,commitHunkIndices:t.hunkIndices,overwriteExistingMessage:""!==t.message.content.trim()})}combineSelectedCommits(){if(this.selectedCommitIds.size<2||!this.canCombineCommits)return;this.saveToHistory();let e=this.state.commits.filter(e=>this.selectedCommitIds.has(e.id)),t=[];e.forEach(e=>{t.push(...e.hunkIndices)});let i=e.map(e=>e.message.content).filter(e=>e&&""!==e.trim()).join(`

`),o=e.map(e=>e.aiExplanation).filter(e=>e&&""!==e.trim()).join(`

`),s=e.some(e=>e.message.isGenerated),r={id:`commit-${Date.now()}`,message:{content:i||"Combined commit",isGenerated:s},hunkIndices:t,aiExplanation:o||void 0},a=[],c=!1;this.state.commits.forEach(e=>{this.selectedCommitIds.has(e.id)?c||(a.push(r),c=!0):a.push(e)}),this.state.commits=a,this.selectedCommitIds=new Set,this.selectedCommitId=r.id,this.requestUpdate()}render(){if(!this.state?.commits||!this.state?.hunks)return em`<div class="loading">Loading...</div>`;let e=new Set(this.selectedCommitIds);this.selectedCommitId&&!this.selectedUnassignedSection&&e.add(this.selectedCommitId);let t=Array.from(e,e=>this.state.commits.find(t=>t.id===e)).filter(Boolean),i=this.hunksWithAssignments,o=this.state.commits.some(e=>e.locked);return em`
			<header class="header">
				<div class="header__group">
					<h1>
						Commit Composer
						<small>${this.state?.mode==="experimental"?"Experimental":"Preview"}</small>
						<gl-button
							class="header-feedback"
							appearance="toolbar"
							href=${d0}
							tooltip="Commit Composer Feedback"
							><code-icon icon="feedback"></code-icon
						></gl-button>
					</h1>
					${oT(this.state?.repositoryState?.hasMultipleRepositories,()=>em`<gl-repo-button-group
								.icon=${!1}
								.repository=${this.state.repositoryState.current}
								.hasMultipleRepositories=${this.state.repositoryState.hasMultipleRepositories}
								@gl-click=${this.onRepositorySelectorClicked}
							></gl-repo-button-group>`)}
				</div>
				${this.renderWorkingDirectoryWarning()} ${this.renderActions()}
			</header>

			<main class="main-content">
				<gl-commits-panel
					.commits=${this.state.commits}
					.hunks=${i}
					.selectedCommitId=${this.selectedCommitId}
					.selectedCommitIds=${this.selectedCommitIds}
					.selectedUnassignedSection=${this.selectedUnassignedSection}
					.canFinishAndCommit=${this.canFinishAndCommit}
					.generating=${this.state.generatingCommits}
					.committing=${this.state.committing}
					.aiEnabled=${this.aiEnabled}
					.aiDisabledReason=${this.aiDisabledReason}
					.canCombineCommits=${this.canCombineCommits}
					.canMoveHunks=${this.canMoveHunks}
					.canGenerateCommitsWithAI=${this.canGenerateCommitsWithAI}
					.canReorderCommits=${this.canReorderCommits}
					.hasLockedCommits=${o}
					.isPreviewMode=${this.isPreviewMode}
					.baseCommit=${this.state.baseCommit}
					.repoName=${this.state.baseCommit?.repoName??this.state.repositoryState?.current.name??null}
					.initialCustomInstructions=${this.initialCustomInstructions}
					.hasUsedAutoCompose=${this.state.hasUsedAutoCompose}
					.hasChanges=${this.state.hasChanges}
					.aiModel=${this.state.ai?.model}
					.compositionSummarySelected=${this.compositionSummarySelected}
					.compositionFeedback=${this.compositionFeedback}
					.compositionSessionId=${this.compositionSessionId}
					.isReadyToCommit=${this.isReadyToFinishAndCommit}
					.recompose=${this.state.recompose}
					@commit-select=${e=>this.selectCommit(e.detail.commitId,e.detail.multiSelect)}
					@unassigned-select=${e=>this.selectUnassignedSection(e.detail.section)}
					@combine-commits=${this.combineSelectedCommits}
					@finish-and-commit=${this.finishAndCommit}
					@generate-commits-with-ai=${this.handleGenerateCommitsWithAI}
					@focus-commit-message=${this.handleFocusCommitMessage}
					@commit-reorder=${e=>this.reorderCommits(e.detail.oldIndex,e.detail.newIndex)}
					@create-new-commit=${e=>this.createNewCommitWithHunks(e.detail.hunkIds)}
					@unassign-hunks=${e=>this.unassignHunks(e.detail.hunkIds)}
					@move-hunks-to-commit=${e=>this.moveHunksToCommit(e.detail.hunkIds,e.detail.targetCommitId)}
					@add-hunks-to-commit=${this.handleAddHunksToCommit}
					@generate-commit-message=${e=>this.generateCommitMessage(e.detail.commitId)}
					@cancel-composer=${this.handleCloseComposer}
					@select-ai-model=${this.handleSelectAIModel}
					@select-composition-summary=${this.handleSelectCompositionSummary}
					@composition-feedback-helpful=${this.handleCompositionFeedbackHelpful}
					@composition-feedback-unhelpful=${this.handleCompositionFeedbackUnhelpful}
				></gl-commits-panel>

				<gl-details-panel
					.commits=${this.state.commits}
					.selectedCommits=${t}
					.hunks=${i}
					.selectedUnassignedSection=${this.selectedUnassignedSection}
					.commitMessageExpanded=${this.state.detailsSectionExpanded.commitMessage}
					.aiExplanationExpanded=${this.state.detailsSectionExpanded.aiExplanation}
					.filesChangedExpanded=${this.state.detailsSectionExpanded.filesChanged}
					.selectedHunkIds=${this.selectedHunkIds}
					.generatingCommitMessage=${this.state.generatingCommitMessage}
					.committing=${this.state.committing}
					.canEditCommitMessages=${this.canEditCommitMessages}
					.canGenerateCommitMessages=${this.canGenerateCommitMessages}
					.canMoveHunks=${this.canMoveHunks}
					.aiEnabled=${this.aiEnabled}
					.aiDisabledReason=${this.aiDisabledReason}
					.isPreviewMode=${this.isPreviewMode}
					.hasChanges=${this.state.hasChanges}
					.compositionSummarySelected=${this.compositionSummarySelected}
					@toggle-commit-message=${this.toggleCommitMessageExpanded}
					@toggle-ai-explanation=${this.toggleAiExplanationExpanded}
					@toggle-files-changed=${this.toggleFilesChangedExpanded}
					@update-commit-message=${e=>this.updateCommitMessage(e.detail.commitId,e.detail.message)}
					@generate-commit-message=${e=>this.generateCommitMessage(e.detail.commitId)}
					@hunk-selected=${e=>this.selectHunk(e.detail.hunkId,e.detail.shiftKey)}
					@hunk-drag-start=${e=>this.handleHunkDragStart(e.detail.hunkIds)}
					@hunk-drag-end=${()=>this.handleHunkDragEnd()}
					@hunk-move=${e=>this.handleHunkMove(e.detail.hunkId,e.detail.targetCommitId)}
					@move-hunks-to-commit=${e=>this.moveHunksToCommit(e.detail.hunkIds,e.detail.targetCommitId)}
					@close-composer=${this.handleCloseComposer}
					@reload-composer=${this.handleReloadComposer}
				></gl-details-panel>

				<!-- Loading overlays -->
				${this.renderLoadingDialogs()}

				<!-- Safety error overlay -->
				<gl-dialog class="generic-dialog" ?open=${null!=this.state.safetyError} modal>
					<div class="generic-dialog__container">
						<h2>
							<code-icon icon="warning"></code-icon>
							Repository State Changed
						</h2>
						<p class="generic-dialog__message is-error">${d2(this.state.safetyError)}</p>
						<p class="generic-dialog__secondary">
							The repository state has changed since Commit Composer was opened. Please reload to update
							with new changes.
						</p>
						<nav class="generic-dialog__actions">
							<gl-button appearance="secondary" @click=${this.handleCloseSafetyError}>Close</gl-button>
							<gl-button @click=${this.handleReloadComposer}>Reload</gl-button>
						</nav>
					</div>
				</gl-dialog>

				<!-- Loading error overlay -->
				<gl-dialog class="generic-dialog" ?open=${null!=this.state.loadingError} modal>
					<div class="generic-dialog__container">
						<h2>
							<code-icon icon="warning"></code-icon>
							Loading Error
						</h2>
						<p class="generic-dialog__message is-error">${d2(this.state.loadingError)}</p>
						<nav class="generic-dialog__actions">
							<gl-button appearance="secondary" @click=${this.handleCloseLoadingError}>Close</gl-button>
						</nav>
					</div>
				</gl-dialog>

				<!-- AI operation error overlay -->
				<gl-dialog class="generic-dialog" ?open=${null!=this.state.aiOperationError} modal>
					<div class="generic-dialog__container">
						<h2>
							<code-icon icon="warning"></code-icon>
							Operation Failed
						</h2>
						<p class="generic-dialog__message is-error">
							${d2(`Failed to ${this.state.aiOperationError?.operation??"perform operation"}${this.state.aiOperationError?.error?`: ${this.state.aiOperationError.error}`:""}`)}
						</p>
						<nav class="generic-dialog__actions">
							<gl-button appearance="secondary" @click=${this.handleCloseAIOperationError}>OK</gl-button>
						</nav>
					</div>
				</gl-dialog>
			</main>

			<gl-dialog ?open=${this.showCommitsGeneratedModal} modal class="modal">
				<h2>Commits Generated</h2>
				<p>${this.state.commits.length} commits have been generated successfully!</p>
				<gl-button @click=${this.closeModal}>Exit Composer</gl-button>
			</gl-dialog>
		`}renderWorkingDirectoryWarning(){let e,t,{indexHasChanged:i,workingDirectoryHasChanged:o}=this.state||{};if(!i&&!o)return eb;let s=this.hunksWithAssignments.some(e=>"unstaged"===e.source&&e.assigned);if(i)e="Index has changed. You must reload to commit.",t=!0;else if(o&&s)e="Working directory has changed. You must reload to commit.",t=!0;else{if(!o)return eb;e="Working directory has changed",t=!1}return em`
			<div class="working-directory-warning ${t?"working-directory-warning--error":""}">
				<span class="working-directory-warning__text">${e}</span>
				<gl-button @click=${this.handleReloadComposer}>Reload</gl-button>
			</div>
		`}renderActions(){return this.showHistoryButtons?em`
			<nav class="header-actions" aria-label="Composer actions">
				<gl-button
					?disabled=${!this.canUndo()}
					@click=${()=>this.undo()}
					tooltip="Undo last action"
					appearance="secondary"
					><code-icon icon="discard" slot="prefix"></code-icon>Undo</gl-button
				>
				${oT(!1,()=>em` <gl-button
							hidden
							?disabled=${!this.canRedo()}
							@click=${()=>this.redo()}
							tooltip="Redo last undone action"
							appearance="secondary"
							><code-icon icon="discard" flip="inline" slot="prefix"></code-icon>Redo</gl-button
						>`)}
				<gl-button @click=${()=>this.reset()} tooltip="Reset to initial state" appearance="secondary"
					><code-icon icon="trash" slot="prefix"></code-icon>Reset</gl-button
				>
			</nav>
		`:eb}onRepositorySelectorClicked(e){"label"===e.detail.part&&this._ipc.sendCommand(oa,void 0)}openOnboarding(){this.onboarding||(this.onboarding=function(e,t={}){return function(e={}){function t(){rD("allowClose")&&p()}function i(){let e=rD("overlayClickBehavior");if(rD("allowClose")&&"close"===e)return void p();if("function"==typeof e){let t=rN("__activeStep");e(rN("__activeElement"),t,{config:rD(),state:rN(),driver:rA});return}"nextStep"===e&&o()}function o(){let e=rN("activeIndex"),t=rD("steps")||[];if(void 0===e)return;let i=e+1;t[i]?h(i):p()}function s(){let e=rN("activeIndex"),t=rD("steps")||[];if(void 0===e)return;let i=e-1;t[i]?h(i):p()}function r(){var e;if(rN("__transitionCallback"))return;let t=rN("activeIndex"),i=rN("__activeStep"),o=rN("__activeElement");if(void 0===t||void 0===i||void 0===rN("activeIndex"))return;let r=(null==(e=i.popover)?void 0:e.onPrevClick)||rD("onPrevClick");if(r)return r(o,i,{config:rD(),state:rN(),driver:rA});s()}function a(){var e;if(rN("__transitionCallback"))return;let t=rN("activeIndex"),i=rN("__activeStep"),s=rN("__activeElement");if(void 0===t||void 0===i)return;let r=(null==(e=i.popover)?void 0:e.onNextClick)||rD("onNextClick");if(r)return r(s,i,{config:rD(),state:rN(),driver:rA});o()}function c(){rN("isInitialized")||(rz.isInitialized=!0,document.body.classList.add("driver-active",rD("animate")?"driver-fade":"driver-simple"),window.addEventListener("keyup",rV,!1),window.addEventListener("keydown",rW,!1),window.addEventListener("resize",rU),window.addEventListener("scroll",rU),rR.overlayClick=i,rR.escapePress=t,rR.arrowLeftPress=r,rR.arrowRightPress=a)}function h(e=0){var t,i,o,s,r,a,c,u,m;let g=rD("steps");if(!g||!g[e])return void p();m=document.activeElement,rz.__activeOnDestroyed=m,rz.activeIndex=e;let f=g[e],b=g[e+1],v=g[e-1],w=(null==(t=f.popover)?void 0:t.doneBtnText)||rD("doneBtnText")||"Done",x=rD("allowClose"),C=void 0!==(null==(i=f.popover)?void 0:i.showProgress)?null==(o=f.popover)?void 0:o.showProgress:rD("showProgress"),_=((null==(s=f.popover)?void 0:s.progressText)||rD("progressText")||"{{current}} of {{total}}").replace("{{current}}",`${e+1}`).replace("{{total}}",`${g.length}`),S=(null==(r=f.popover)?void 0:r.showButtons)||rD("showButtons"),$=["next","previous",...x?["close"]:[]].filter(e=>!(null!=S&&S.length)||S.includes(e)),E=(null==(a=f.popover)?void 0:a.onNextClick)||rD("onNextClick"),A=(null==(c=f.popover)?void 0:c.onPrevClick)||rD("onPrevClick"),T=(null==(u=f.popover)?void 0:u.onCloseClick)||rD("onCloseClick");rF({...f,popover:{showButtons:$,nextBtnText:b?void 0:w,disableButtons:[...v?[]:["previous"]],showProgress:C,progressText:_,onNextClick:E||(()=>{b?h(e+1):p()}),onPrevClick:A||(()=>{h(e-1)}),onCloseClick:T||(()=>{p()}),...(null==f?void 0:f.popover)||{}}})}function p(e=!0){var t,i;let o,s,r=rN("__activeElement"),a=rN("__activeStep"),c=rN("__activeOnDestroyed"),h=rD("onDestroyStarted");if(e&&h)return void h(r&&(null==r?void 0:r.id)!=="driver-dummy-element"?r:void 0,a,{config:rD(),state:rN(),driver:rA});let u=(null==a?void 0:a.onDeselected)||rD("onDeselected"),m=rD("onDestroyed");if(document.body.classList.remove("driver-active","driver-fade","driver-simple"),window.removeEventListener("keyup",rV),window.removeEventListener("resize",rU),window.removeEventListener("scroll",rU),(o=rN("popover"))&&(null==(t=o.wrapper.parentElement)||t.removeChild(o.wrapper)),null==(i=document.getElementById("driver-dummy-element"))||i.remove(),document.querySelectorAll(".driver-active-element").forEach(e=>{e.classList.remove("driver-active-element","driver-no-interaction"),e.removeAttribute("aria-haspopup"),e.removeAttribute("aria-expanded"),e.removeAttribute("aria-controls")}),(s=rN("__overlaySvg"))&&s.remove(),rR={},rz={},r&&a){let e="driver-dummy-element"===r.id;u&&u(e?void 0:r,a,{config:rD(),state:rN(),driver:rA}),m&&m(e?void 0:r,a,{config:rD(),state:rN(),driver:rA})}c&&c.focus()}rT(e);let u={isActive:()=>rN("isInitialized")||!1,refresh:rU,drive:(e=0)=>{c(),h(e)},setConfig:rT,setSteps:e=>{rz={},rT({...rD(),steps:e})},getConfig:rD,getState:rN,getActiveIndex:()=>rN("activeIndex"),isFirstStep:()=>0===rN("activeIndex"),isLastStep:()=>{let e=rD("steps")||[],t=rN("activeIndex");return void 0!==t&&t===e.length-1},getActiveStep:()=>rN("activeStep"),getActiveElement:()=>rN("activeElement"),getPreviousElement:()=>rN("previousElement"),getPreviousStep:()=>rN("previousStep"),moveNext:o,movePrevious:s,moveTo:function(e){(rD("steps")||[])[e]?h(e):p()},hasNextStep:()=>{let e=rD("steps")||[],t=rN("activeIndex");return void 0!==t&&!!e[t+1]},hasPreviousStep:()=>{let e=rD("steps")||[],t=rN("activeIndex");return void 0!==t&&!!e[t-1]},highlight:e=>{c(),rF({...e,popover:e.popover?{showButtons:[],showProgress:!1,progressText:"",...e.popover}:void 0})},destroy:()=>{p(!1)}};return rA=u,u}({showProgress:!0,...t,steps:e.map(e=>({...e,onHighlighted:null!=e.onHighlighted?(t,i,o)=>{e.onHighlighted?.(t,i,o)}:void 0})),onHighlighted:void 0})}(this.onboardingSteps,{onDestroyStarted:(e,t)=>{this.dismissOnboarding()},onNextClick:(e,t)=>{this.advanceOnboardingStep(),this.onboarding?.moveNext()},onPrevClick:(e,t)=>{this.onboarding?.movePrevious()}}),this.onboardingStepNumber=1,setTimeout(()=>{this.onboarding?.drive()},1500),this._ipc.sendCommand(os))}dismissOnboarding(){this.onboarding&&(this.onboarding.destroy(),this.onboarding=void 0,this._ipc.sendCommand(or),this.state.onboardingDismissed=!0,this.requestUpdate())}advanceOnboardingStep(){this.onboardingStepNumber++,this._ipc.sendCommand(on,{stepNumber:this.onboardingStepNumber})}reduceOnboardingStep(){this.onboardingStepNumber--}};function d2(e,t="<br>"){return e?.replaceAll(/\n/g,t)}d1.styles=[rS,rC,S`
			:host {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-16);
				height: 100vh;
				padding: var(--gl-space-16);
			}

			.header {
				display: flex;
				flex: none;
				gap: var(--gl-space-16);
				align-items: center;
				justify-content: space-between;
			}

			.header__group {
				display: flex;
				gap: var(--gl-space-16);
				align-items: center;
			}

			.header h1 {
				flex: none;
				margin-block: 0;
				font-size: 1.6rem;
			}

			.header small {
				margin-inline-start: var(--gl-space-4);
				font-size: var(--gl-font-md);
				color: var(--color-foreground--65);
				text-transform: uppercase;
			}

			.header-feedback {
				transform: translateY(2px);
			}

			.header-feedback:not(:hover, :focus) {
				opacity: 0.8;
			}

			gl-repo-button-group {
				transform: translateY(1px);
			}

			.header-actions {
				display: flex;
				flex: none;
				gap: var(--gl-space-8);
				justify-content: flex-end;
			}

			.working-directory-warning {
				display: flex;
				gap: var(--gl-space-8);
				align-items: center;
				padding: var(--gl-space-8) var(--gl-space-12);
				background-color: var(--vscode-inputValidation-warningBackground);
				border: var(--gl-border-width) solid var(--vscode-inputValidation-warningBorder);
				border-radius: var(--gl-radius-sm);
			}

			.working-directory-warning--error {
				background-color: var(--vscode-inputValidation-errorBackground);
				border-color: var(--vscode-inputValidation-errorBorder);
			}

			.working-directory-warning__text {
				font-size: var(--gl-font-base);
				color: var(--vscode-inputValidation-warningForeground);
			}

			.working-directory-warning--error .working-directory-warning__text {
				color: var(--vscode-inputValidation-errorForeground);
			}

			.main-content {
				display: flex;
				flex: 1;
				gap: var(--gl-space-24);
				min-height: 0;
			}

			gl-commits-panel {
				flex: none;
				width: clamp(30rem, 28vw, 44rem);
			}

			gl-details-panel {
				flex: 1;
				min-width: 0;
			}

			.modal::part(base) {
				min-width: 300px;
				text-align: center;
			}

			.modal h2 {
				margin: 0 0 var(--gl-space-16);
				color: var(--vscode-foreground);
			}

			.modal p {
				margin: 0 0 var(--gl-space-24);
				color: var(--vscode-descriptionForeground);
			}

			.section-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: var(--gl-space-12);
				cursor: pointer;
				user-select: none;
				background: var(--vscode-editorGroupHeader-tabsBackground);
				border-bottom: var(--gl-border-width) solid var(--vscode-panel-border);
			}

			.section-header:hover {
				background: var(--vscode-list-hoverBackground);
			}

			.section-header h4 {
				margin: 0;
				font-size: 1.1em;
				font-weight: 600;
			}

			.section-toggle {
				color: var(--vscode-descriptionForeground);
				transition: transform var(--gl-duration-medium) ease;
			}

			.section-toggle.expanded {
				transform: rotate(90deg);
			}

			.section-content {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				padding: var(--gl-space-8);
				overflow: hidden;
			}

			/* Files changed section should expand to fill space */
			.section-content.files-changed {
				flex: 1;
				min-height: 0;
			}

			/* Commit message and AI explanation should have limited height */
			.section-content.commit-message,
			.section-content.ai-explanation {
				flex: 0 0 auto;
				max-height: 200px;
			}

			.section-content.collapsed {
				display: none;
			}

			.ai-explanation {
				margin: 0;
				line-height: 1.5;
				color: var(--vscode-foreground);
			}

			.ai-explanation.placeholder {
				font-style: italic;
				color: var(--vscode-descriptionForeground);
			}

			.unassigned-changes-item {
				display: flex;
				gap: var(--gl-space-8);
				align-items: center;
				padding: var(--gl-space-12);
				margin-bottom: var(--gl-space-12);
				cursor: pointer;
				user-select: none;
				background: var(--vscode-list-inactiveSelectionBackground);
				border: var(--gl-border-width) solid var(--vscode-panel-border);
				border-radius: var(--gl-radius-sm);
				transition: all var(--gl-duration-medium) ease;
			}

			.unassigned-changes-item:hover {
				background: var(--vscode-list-hoverBackground);
			}

			.unassigned-changes-item.selected {
				background: var(--vscode-list-activeSelectionBackground);
				border-color: var(--vscode-focusBorder);
			}

			.unassigned-changes-item code-icon {
				color: var(--vscode-descriptionForeground);
			}

			.unassigned-changes-item .title {
				font-weight: 500;
				color: var(--vscode-foreground);
			}

			.unassigned-changes-item .count {
				font-size: 0.9em;
				color: var(--vscode-descriptionForeground);
			}

			.unassigned-changes-section {
				margin-bottom: 1.5rem;
			}

			.unassigned-changes-section:last-child {
				margin-bottom: 0;
			}

			.generic-dialog::part(base) {
				max-width: 500px;
			}

			.generic-dialog h2,
			.generic-dialog p {
				margin-block: 0;
			}

			.generic-dialog h2 code-icon {
				vertical-align: middle;
			}

			.generic-dialog__container {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-16);
			}

			.generic-dialog__message {
				padding: var(--gl-space-12);
				font-family: var(--vscode-editor-font-family);
				font-size: var(--gl-font-md);
				color: var(--vscode-foreground);
				background: var(--color-background);
				border: var(--gl-border-width) solid var(--vscode-panel-border);
				border-radius: var(--gl-radius-sm);
			}

			.generic-dialog__message.is-error {
				background: var(--vscode-diffEditor-removedTextBackground);
				border-color: var(--vscode-diffEditor-removedLineBackground);
			}

			.generic-dialog__secondary {
				margin: 0;
				font-size: var(--gl-font-md);
				color: var(--color-foreground--75);
			}

			.generic-dialog__actions {
				display: flex;
				gap: var(--gl-space-8);
				justify-content: flex-end;
			}
		`],dJ([tg({context:"composer-state",subscribe:!0})],d1.prototype,"state",2),dJ([tg({context:"ipc",subscribe:!0}),eA()],d1.prototype,"_ipc",2),dJ([eD("gl-commits-panel")],d1.prototype,"commitsPanel",2),dJ([eA()],d1.prototype,"selectedCommitId",2),dJ([eA()],d1.prototype,"selectedUnassignedSection",2),dJ([eA()],d1.prototype,"selectedCommitIds",2),dJ([eA()],d1.prototype,"selectedHunkId",2),dJ([eA()],d1.prototype,"selectedHunkIds",2),dJ([eA()],d1.prototype,"compositionSummarySelected",2),dJ([eA()],d1.prototype,"compositionFeedback",2),dJ([eA()],d1.prototype,"compositionSessionId",2),dJ([eA()],d1.prototype,"showCommitsGeneratedModal",2),dJ([eA()],d1.prototype,"onboardingStepNumber",2),dJ([eD("gl-details-panel")],d1.prototype,"detailsPanel",2),d1=dJ([e$("gl-composer-app")],d1);var d3=Object.defineProperty,d5=Object.getOwnPropertyDescriptor;let d4=class extends GlAppHost{createStateProvider(e,t,i){return new ComposerStateProvider(this,e,t,i)}render(){return em`<gl-composer-app></gl-composer-app>`}};d4=((e,t,i,o)=>{for(var s,r=o>1?void 0:o?d5(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o?s(t,i,r):s(r))||r);return o&&r&&d3(t,i,r),r})([e$("gl-composer-apphost")],d4);export{d4 as ComposerAppHost};