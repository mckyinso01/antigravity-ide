let t,o,i,r,a,n,c,h;"u">typeof __webpack_require__&&Object.defineProperty(__webpack_require__,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(t){}});let context_request_event_s=class context_request_event_s extends Event{constructor(t,o,i,r){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=o,this.callback=i,this.subscribe=r??!1}};let s=class s{constructor(t,o,i,r){(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(t,o)=>{this.unsubscribe&&(this.unsubscribe!==o&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=t,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(t,o)),this.unsubscribe=o},this.host=t,void 0!==o.context)?(this.context=o.context,this.callback=o.callback,this.subscribe=o.subscribe??!1):(this.context=o,this.callback=i,this.subscribe=r??!1),this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new context_request_event_s(this.context,this.host,this.t,this.subscribe))}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,o=!1){let i=o||!Object.is(t,this.o);this.o=t,i&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(let[t,{disposer:o}]of this.subscriptions)t(this.o,o)},void 0!==t&&(this.value=t)}addCallback(t,o,i){if(!i)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:o});let{disposer:r}=this.subscriptions.get(t);t(this.value,r)}clearCallbacks(){this.subscriptions.clear()}};let e=class e extends Event{constructor(t,o){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=o}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(t,o,i){super(void 0!==o.context?o.initialValue:i),this.onContextRequest=t=>{if(t.context!==this.context)return;let o=t.contextTarget??t.composedPath()[0];o!==this.host&&(t.stopPropagation(),this.addCallback(t.callback,o,t.subscribe))},this.onProviderRequest=t=>{if(t.context!==this.context||(t.contextTarget??t.composedPath()[0])===this.host)return;let o=new Set;for(let[t,{consumerHost:i}]of this.subscriptions)o.has(t)||(o.add(t),i.dispatchEvent(new context_request_event_s(this.context,i,t,!0)));t.stopPropagation()},this.host=t,void 0!==o.context?this.context=o.context:this.context=o,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new e(this.context,this.host))}};function u({context:t}){return(o,i)=>{let r=new WeakMap;if("object"==typeof i)return{get(){return o.get.call(this)},set(t){return r.get(this).setValue(t),o.set.call(this,t)},init(o){return r.set(this,new context_provider_i(this,{context:t,initialValue:o})),o}};{let a;o.constructor.addInitializer(o=>{r.set(o,new context_provider_i(o,{context:t}))});let n=Object.getOwnPropertyDescriptor(o,i);if(void 0===n){let t=new WeakMap;a={get(){return t.get(this)},set(o){r.get(this).setValue(o),t.set(this,o)},configurable:!0,enumerable:!0}}else{let t=n.set;a={...n,set(o){r.get(this).setValue(o),t?.call(this,o)}}}return void Object.defineProperty(o,i,a)}}}function p({context:t,subscribe:o}){return(i,r)=>{"object"==typeof r?r.addInitializer(function(){new s(this,{context:t,callback:t=>{i.set.call(this,t)},subscribe:o})}):i.constructor.addInitializer(i=>{new s(i,{context:t,callback:t=>{i[r]=t},subscribe:o})})}}let m=globalThis,g=m.ShadowRoot&&(void 0===m.ShadyCSS||m.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,b=Symbol(),f=new WeakMap;let css_tag_n=class css_tag_n{constructor(t,o,i){if(this._$cssResult$=!0,i!==b)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(g&&void 0===t){let i=void 0!==o&&1===o.length;i&&(t=f.get(o)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&f.set(o,t))}return t}toString(){return this.cssText}};let v=t=>new css_tag_n("string"==typeof t?t:t+"",void 0,b),w=(t,...o)=>new css_tag_n(1===t.length?t[0]:o.reduce((o,i,r)=>o+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]),t,b),x=g?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let o="";for(let i of t.cssRules)o+=i.cssText;return v(o)})(t):t,{is:C,defineProperty:_,getOwnPropertyDescriptor:$,getOwnPropertyNames:S,getOwnPropertySymbols:A,getPrototypeOf:E}=Object,P=globalThis,M=P.trustedTypes,O=M?M.emptyScript:"",T=P.reactiveElementPolyfillSupport,D={toAttribute(t,o){switch(o){case Boolean:t=t?O:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,o){let i=t;switch(o){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},B=(t,o)=>!C(t,o),F={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??=Symbol("metadata"),P.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=F){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,o);void 0!==r&&_(this.prototype,t,r)}}static getPropertyDescriptor(t,o,i){let{get:r,set:a}=$(this.prototype,t)??{get(){return this[o]},set(t){this[o]=t}};return{get:r,set(o){let n=r?.call(this);a?.call(this,o),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??F}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let t=E(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let t=this.properties;for(let o of[...S(t),...A(t)])this.createProperty(o,t[o])}let t=this[Symbol.metadata];if(null!==t){let o=litPropertyMetadata.get(t);if(void 0!==o)for(let[t,i]of o)this.elementProperties.set(t,i)}for(let[t,o]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(t,o);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t))for(let i of new Set(t.flat(1/0).reverse()))o.unshift(x(i));else void 0!==t&&o.push(x(t));return o}static _$Eu(t,o){let i=o.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map;for(let o of this.constructor.elementProperties.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(g)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let i of o){let o=document.createElement("style"),r=m.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,o,i){this._$AK(t,i)}_$ET(t,o){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){let a=(void 0!==i.converter?.toAttribute?i.converter:D).toAttribute(o,i.type);this._$Em=t,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,o){let i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){let t=i.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:D;this._$Em=r;let n=a.fromAttribute(o,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,o,i,r=!1,a){if(void 0!==t){let n=this.constructor;if(!1===r&&(a=this[t]),!(((i??=n.getPropertyOptions(t)).hasChanged??B)(a,o)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,o,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,o,{useDefault:i,reflect:r,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??o??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(o=void 0),this._$AL.set(t,o)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,o]of this._$Ep)this[t]=o;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[o,i]of t){let{wrapped:t}=i,r=this[o];!0!==t||this._$AL.has(o)||void 0===r||this.C(o,void 0,i,r)}}let t=!1,o=this._$AL;try{(t=this.shouldUpdate(o))?(this.willUpdate(o),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(o)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,T?.({ReactiveElement:y}),(P.reactiveElementVersions??=[]).push("2.1.2");let q=globalThis,V=t=>t,W=q.trustedTypes,j=W?W.createPolicy("lit-html",{createHTML:t=>t}):void 0,U="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,G="?"+N,K=`<${G}>`,Y=document,X=()=>Y.createComment(""),J=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Q=Array.isArray,ee=t=>Q(t)||"function"==typeof t?.[Symbol.iterator],et=`[ 	
\x0c\r]`,eo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ei=/-->/g,er=/>/g,ea=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),en=/'/g,es=/"/g,el=/^(?:script|style|textarea|title)$/i,ec=t=>(o,...i)=>({_$litType$:t,strings:o,values:i}),ed=ec(1),eh=ec(2),eu=ec(3),ep=Symbol.for("lit-noChange"),em=Symbol.for("lit-nothing"),eg=new WeakMap,eb=Y.createTreeWalker(Y,129);function ef(t,o){if(!Q(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==j?j.createHTML(o):o}let ev=(t,o)=>{let i=t.length-1,r=[],a,n=2===o?"<svg>":3===o?"<math>":"",c=eo;for(let o=0;o<i;o++){let i=t[o],h,u,p=-1,m=0;for(;m<i.length&&(c.lastIndex=m,null!==(u=c.exec(i)));)m=c.lastIndex,c===eo?"!--"===u[1]?c=ei:void 0!==u[1]?c=er:void 0!==u[2]?(el.test(u[2])&&(a=RegExp("</"+u[2],"g")),c=ea):void 0!==u[3]&&(c=ea):c===ea?">"===u[0]?(c=a??eo,p=-1):void 0===u[1]?p=-2:(p=c.lastIndex-u[2].length,h=u[1],c=void 0===u[3]?ea:'"'===u[3]?es:en):c===es||c===en?c=ea:c===ei||c===er?c=eo:(c=ea,a=void 0);let g=c===ea&&t[o+1].startsWith("/>")?" ":"";n+=c===eo?i+K:p>=0?(r.push(h),i.slice(0,p)+U+i.slice(p)+N+g):i+N+(-2===p?o:g)}return[ef(t,n+(t[i]||"<?>")+(2===o?"</svg>":3===o?"</math>":"")),r]};let lit_html_S=class lit_html_S{constructor({strings:t,_$litType$:o},i){let r;this.parts=[];let a=0,n=0,c=t.length-1,h=this.parts,[u,p]=ev(t,o);if(this.el=lit_html_S.createElement(u,i),eb.currentNode=this.el.content,2===o||3===o){let t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=eb.nextNode())&&h.length<c;){if(1===r.nodeType){if(r.hasAttributes())for(let t of r.getAttributeNames())if(t.endsWith(U)){let o=p[n++],i=r.getAttribute(t).split(N),c=/([.?@])?(.*)/.exec(o);h.push({type:1,index:a,name:c[2],strings:i,ctor:"."===c[1]?I:"?"===c[1]?L:"@"===c[1]?z:H}),r.removeAttribute(t)}else t.startsWith(N)&&(h.push({type:6,index:a}),r.removeAttribute(t));if(el.test(r.tagName)){let t=r.textContent.split(N),o=t.length-1;if(o>0){r.textContent=W?W.emptyScript:"";for(let i=0;i<o;i++)r.append(t[i],X()),eb.nextNode(),h.push({type:2,index:++a});r.append(t[o],X())}}}else if(8===r.nodeType)if(r.data===G)h.push({type:2,index:a});else{let t=-1;for(;-1!==(t=r.data.indexOf(N,t+1));)h.push({type:7,index:a}),t+=N.length-1}a++}}static createElement(t,o){let i=Y.createElement("template");return i.innerHTML=t,i}};function ew(t,o,i=t,r){if(o===ep)return o;let a=void 0!==r?i._$Co?.[r]:i._$Cl,n=J(o)?void 0:o._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t))._$AT(t,i,r),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(o=ew(t,a._$AS(t,o.values),a,r)),o}let R=class R{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:i}=this._$AD,r=(t?.creationScope??Y).importNode(o,!0);eb.currentNode=r;let a=eb.nextNode(),n=0,c=0,h=i[0];for(;void 0!==h;){if(n===h.index){let o;2===h.type?o=new k(a,a.nextSibling,this,t):1===h.type?o=new h.ctor(a,h.name,h.strings,this,t):6===h.type&&(o=new Z(a,this,t)),this._$AV.push(o),h=i[++c]}n!==h?.index&&(a=eb.nextNode(),n++)}return eb.currentNode=Y,r}p(t){let o=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,o),o+=i.strings.length-2):i._$AI(t[o])),o++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,i,r){this.type=2,this._$AH=em,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return void 0!==o&&11===t?.nodeType&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){J(t=ew(this,t,o))?t===em||null==t||""===t?(this._$AH!==em&&this._$AR(),this._$AH=em):t!==this._$AH&&t!==ep&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):ee(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==em&&J(this._$AH)?this._$AA.nextSibling.data=t:this.T(Y.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=lit_html_S.createElement(ef(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(o);else{let t=new R(r,this),i=t.u(this.options);t.p(o),this.T(i),this._$AH=t}}_$AC(t){let o=eg.get(t.strings);return void 0===o&&eg.set(t.strings,o=new lit_html_S(t)),o}k(t){Q(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,i,r=0;for(let a of t)r===o.length?o.push(i=new k(this.O(X()),this.O(X()),this,this.options)):i=o[r],i._$AI(a),r++;r<o.length&&(this._$AR(i&&i._$AB.nextSibling,r),o.length=r)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let o=V(t).nextSibling;V(t).remove(),t=o}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,i,r,a){this.type=1,this._$AH=em,this._$AN=void 0,this.element=t,this.name=o,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=em}_$AI(t,o=this,i,r){let a=this.strings,n=!1;if(void 0===a)(n=!J(t=ew(this,t,o,0))||t!==this._$AH&&t!==ep)&&(this._$AH=t);else{let r,c,h=t;for(t=a[0],r=0;r<a.length-1;r++)(c=ew(this,h[i+r],o,r))===ep&&(c=this._$AH[r]),n||=!J(c)||c!==this._$AH[r],c===em?t=em:t!==em&&(t+=(c??"")+a[r+1]),this._$AH[r]=c}n&&!r&&this.j(t)}j(t){t===em?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===em?void 0:t}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==em)}};let z=class z extends H{constructor(t,o,i,r,a){super(t,o,i,r,a),this.type=5}_$AI(t,o=this){if((t=ew(this,t,o,0)??em)===ep)return;let i=this._$AH,r=t===em&&i!==em||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==em&&(i===em||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};let Z=class Z{constructor(t,o,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ew(this,t)}};let ey=q.litHtmlPolyfillSupport;ey?.(lit_html_S,k),(q.litHtmlVersions??=[]).push("3.3.3");let ek=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,o,i)=>{let r=i?.renderBefore??o,a=r._$litPart$;if(void 0===a){let t=i?.renderBefore??null;r._$litPart$=a=new k(o.insertBefore(X(),t),t,void 0,i??{})}return a._$AI(t),a})(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ep}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,ek.litElementHydrateSupport?.({LitElement:lit_element_i});let ex=ek.litElementPolyfillSupport;ex?.({LitElement:lit_element_i}),(ek.litElementVersions??=[]).push("4.2.2");let eC=t=>(o,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,o)}):customElements.define(t,o)},e_={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:B};function e$(t){return(o,i)=>{let r;return"object"==typeof i?((t=e_,o,i)=>{let{kind:r,metadata:a}=i,n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===r){let{name:r}=i;return{set(i){let a=o.get.call(this);o.set.call(this,i),this.requestUpdate(r,a,t,!0,i)},init(o){return void 0!==o&&this.C(r,void 0,t,o),o}}}if("setter"===r){let{name:r}=i;return function(i){let a=this[r];o.call(this,i),this.requestUpdate(r,a,t,!0,i)}}throw Error("Unsupported decorator location: "+r)})(t,o,i):(r=o.hasOwnProperty(i),o.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(o,i):void 0)}}function eS(t){return e$({...t,state:!0,attribute:!1})}let eL=(t,o,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof o&&Object.defineProperty(t,o,i),i);function eA(t,o){return(i,r,a)=>{let n=o=>o.renderRoot?.querySelector(t)??null;if(o){let t,{get:o,set:c}="object"==typeof r?i:a??(t=Symbol(),{get(){return this[t]},set(o){this[t]=o}});return eL(i,r,{get(){let t=o.call(this);return void 0===t&&(null!==(t=n(this))||this.hasUpdated)&&c.call(this,t),t}})}return eL(i,r,{get(){return n(this)}})}}let ez=navigator?.userAgentData?.platform,eE=navigator.userAgent;"Linux"===ez||eE.includes("Linux");let eR="macOS"===ez||eE.includes("Macintosh");"Windows"===ez||eE.includes("Windows");var eP,eI,eM,eO,eT,eD,eB,eF,eq=Object.defineProperty,eV=(t,o,i)=>{let r;return(r="symbol"!=typeof o?o+"":o)in t?eq(t,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[r]=i,i},eW=(t,o)=>{if(Object(o)!==o)throw TypeError('Cannot use the "in" operator on this value');return t.has(o)},ej=(t,o,i)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,i)},eU=(t,o,i)=>{if(!o.has(t))throw TypeError("Cannot access private method");return i};function eN(t,o){return Object.is(t,o)}let eH=null,eG=!1,eK=1,eY=Symbol("SIGNAL");function eX(t){let o=eH;return eH=t,o}let eJ={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function eZ(t){if(eG)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===eH)return;eH.consumerOnSignalRead(t);let o=eH.nextProducerIndex++;e1(eH),o<eH.producerNode.length&&eH.producerNode[o]!==t&&e0(eH)&&eQ(eH.producerNode[o],eH.producerIndexOfThis[o]),eH.producerNode[o]!==t&&(eH.producerNode[o]=t,eH.producerIndexOfThis[o]=e0(eH)?function t(o,i,r){var a;if(e2(o),e1(o),0===o.liveConsumerNode.length){null==(a=o.watched)||a.call(o.wrapper);for(let i=0;i<o.producerNode.length;i++)o.producerIndexOfThis[i]=t(o.producerNode[i],o,i)}return o.liveConsumerIndexOfThis.push(r),o.liveConsumerNode.push(i)-1}(t,eH,o):0),eH.producerLastReadVersion[o]=t.version}function eQ(t,o){var i;if(e2(t),e1(t),"u">typeof ngDevMode&&ngDevMode&&o>=t.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${o} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(1===t.liveConsumerNode.length){null==(i=t.unwatched)||i.call(t.wrapper);for(let o=0;o<t.producerNode.length;o++)eQ(t.producerNode[o],t.producerIndexOfThis[o])}let r=t.liveConsumerNode.length-1;if(t.liveConsumerNode[o]=t.liveConsumerNode[r],t.liveConsumerIndexOfThis[o]=t.liveConsumerIndexOfThis[r],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,o<t.liveConsumerNode.length){let i=t.liveConsumerIndexOfThis[o],r=t.liveConsumerNode[o];e1(r),r.producerIndexOfThis[i]=o}}function e0(t){var o;return t.consumerIsAlwaysLive||((null==(o=null==t?void 0:t.liveConsumerNode)?void 0:o.length)??0)>0}function e1(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function e2(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function e4(t){if(function t(o){if(o.dirty||o.lastCleanEpoch!==eK){if(!o.producerMustRecompute(o)&&!function(o){e1(o);for(let i=0;i<o.producerNode.length;i++){let r=o.producerNode[i],a=o.producerLastReadVersion[i];if(a!==r.version||(t(r),a!==r.version))return!0}return!1}(o)){o.dirty=!1,o.lastCleanEpoch=eK;return}o.producerRecomputeValue(o),o.dirty=!1,o.lastCleanEpoch=eK}}(t),eZ(t),t.value===e6)throw t.error;return t.value}let e3=Symbol("UNSET"),e5=Symbol("COMPUTING"),e6=Symbol("ERRORED"),e8={...eJ,value:e3,dirty:!0,error:null,equal:eN,producerMustRecompute:t=>t.value===e3||t.value===e5,producerRecomputeValue(t){let o;if(t.value===e5)throw Error("Detected cycle in computations.");let i=t.value;t.value=e5;let r=(t&&(t.nextProducerIndex=0),eX(t)),a=!1;try{o=t.computation.call(t.wrapper),a=i!==e3&&i!==e6&&t.equal.call(t.wrapper,i,o)}catch(i){o=e6,t.error=i}finally{if(eX(r),t&&void 0!==t.producerNode&&void 0!==t.producerIndexOfThis&&void 0!==t.producerLastReadVersion){if(e0(t))for(let o=t.nextProducerIndex;o<t.producerNode.length;o++)eQ(t.producerNode[o],t.producerIndexOfThis[o]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}if(a){t.value=i;return}t.value=o,t.version++}},e7=function(){throw Error()};function e9(){return eZ(this),this.value}let te={...eJ,equal:eN,value:void 0},tt=Symbol("node");(t=>{var o,i,r,a;let State=class State{constructor(r,a={}){let n,c;ej(this,i),eV(this,o);let h=((n=Object.create(te)).value=r,(c=()=>(eZ(n),n.value))[eY]=n,c)[eY];if(this[tt]=h,h.wrapper=this,a){let o=a.equals;o&&(h.equal=o),h.watched=a[t.subtle.watched],h.unwatched=a[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return e9.call(this[tt])}set(o){var i,r;if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(eG)throw Error("Writes to signals not permitted during Watcher callback");i=this[tt],(null==eH?void 0:eH.consumerAllowSignalWrites)===!1&&e7(),i.equal.call(i.wrapper,i.value,o)||(i.value=o,r=i,r.version++,eK++,function t(o){if(void 0===o.liveConsumerNode)return;let i=eG;eG=!0;try{for(let i of o.liveConsumerNode)i.dirty||function(o){var i;o.dirty=!0,t(o),null==(i=o.consumerMarkedDirty)||i.call(o.wrapper??o)}(i)}finally{eG=i}}(r))}};o=tt,i=new WeakSet,t.isState=t=>"object"==typeof t&&eW(i,t),t.State=State;let Computed=class Computed{constructor(o,i){let n,c;ej(this,a),eV(this,r);let h=((n=Object.create(e8)).computation=o,(c=()=>e4(n))[eY]=n,c)[eY];if(h.consumerAllowSignalWrites=!0,this[tt]=h,h.wrapper=this,i){let o=i.equals;o&&(h.equal=o),h.watched=i[t.subtle.watched],h.unwatched=i[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return e4(this[tt])}};r=tt,a=new WeakSet,t.isComputed=t=>"object"==typeof t&&eW(a,t),t.Computed=Computed,(o=>{var i,r,a,n;o.untrack=function(t){let o,i=null;try{i=eX(null),o=t()}finally{eX(i)}return o},o.introspectSources=function(o){var i;if(!(0,t.isComputed)(o)&&!(0,t.isWatcher)(o))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(i=o[tt].producerNode)?void 0:i.map(t=>t.wrapper))??[]},o.introspectSinks=function(o){var i;if(!(0,t.isComputed)(o)&&!(0,t.isState)(o))throw TypeError("Called introspectSinks without a Signal argument");return(null==(i=o[tt].liveConsumerNode)?void 0:i.map(t=>t.wrapper))??[]},o.hasSinks=function(o){if(!(0,t.isComputed)(o)&&!(0,t.isState)(o))throw TypeError("Called hasSinks without a Signal argument");let i=o[tt].liveConsumerNode;return!!i&&i.length>0},o.hasSources=function(o){if(!(0,t.isComputed)(o)&&!(0,t.isWatcher)(o))throw TypeError("Called hasSources without a Computed or Watcher argument");let i=o[tt].producerNode;return!!i&&i.length>0};let Watcher=class Watcher{constructor(t){ej(this,r),ej(this,a),eV(this,i);let o=Object.create(eJ);o.wrapper=this,o.consumerMarkedDirty=t,o.consumerIsAlwaysLive=!0,o.consumerAllowSignalWrites=!1,o.producerNode=[],this[tt]=o}watch(...o){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eU(this,a,n).call(this,o);let i=this[tt];i.dirty=!1;let r=eX(i);for(let t of o)eZ(t[tt]);eX(r)}unwatch(...o){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eU(this,a,n).call(this,o);let i=this[tt];e1(i);for(let t=i.producerNode.length-1;t>=0;t--)if(o.includes(i.producerNode[t].wrapper)){eQ(i.producerNode[t],i.producerIndexOfThis[t]);let o=i.producerNode.length-1;if(i.producerNode[t]=i.producerNode[o],i.producerIndexOfThis[t]=i.producerIndexOfThis[o],i.producerNode.length--,i.producerIndexOfThis.length--,i.nextProducerIndex--,t<i.producerNode.length){let o=i.producerIndexOfThis[t],r=i.producerNode[t];e2(r),r.liveConsumerIndexOfThis[o]=t}}}getPending(){if(!(0,t.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[tt].producerNode.filter(t=>t.dirty).map(t=>t.wrapper)}};i=tt,r=new WeakSet,a=new WeakSet,n=function(o){for(let i of o)if(!(0,t.isComputed)(i)&&!(0,t.isState)(i))throw TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=t=>eW(r,t),o.Watcher=Watcher,o.currentComputed=function(){var t;return null==(t=eH)?void 0:t.wrapper},o.watched=Symbol("watched"),o.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(eO||(eO={}));let to=!1,ti=new eO.subtle.Watcher(()=>{to||(to=!0,queueMicrotask(()=>{for(let t of(to=!1,ti.getPending()))t.get();ti.watch()}))}),tr=Symbol("SignalWatcherBrand"),ta=new FinalizationRegistry(t=>{t.unwatch(...eO.subtle.introspectSources(t))}),tn=new WeakMap;function ts(t){return!0===t[tr]?t:class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new eO.State(0),this._$Si=!1}_$Sl(){var t,o;let i=[],r=[];this._$St.forEach((t,o)=>{((null==t?void 0:t.beforeUpdate)?i:r).push(o)});let a=null==(t=this.h)?void 0:t.getPending().filter(t=>t!==this._$Su&&!this._$St.has(t));i.forEach(t=>t.get()),null==(o=this._$Su)||o.get(),a.forEach(t=>t.get()),r.forEach(t=>t.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(void 0!==this.h)return;this._$Su=new eO.Computed(()=>{this._$So.get(),super.performUpdate()});let t=this.h=new eO.subtle.Watcher(function(){let t=tn.get(this);void 0!==t&&(!1===t._$Si&&(new Set(this.getPending()).has(t._$Su)?t.requestUpdate():t._$Sv()),this.watch())});tn.set(t,this),ta.register(this,t),t.watch(this._$Su),t.watch(...Array.from(this._$St).map(([t])=>t))}_$Sp(){if(void 0===this.h)return;let t=!1;this.h.unwatch(...eO.subtle.introspectSources(this.h).filter(o=>{var i;let r=!0!==(null==(i=this._$St.get(o))?void 0:i.manualDispose);return r&&this._$St.delete(o),t||(t=!r),r})),t||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(t,o){var i;this._$S_();let r=new eO.Computed(()=>{t()});return this.h.watch(r),this._$St.set(r,o),null!=(i=null==o?void 0:o.beforeUpdate)&&i?eO.subtle.untrack(()=>r.get()):this.updateComplete.then(()=>eO.subtle.untrack(()=>r.get())),()=>{this._$St.delete(r),this.h.unwatch(r),!1===this.isConnected&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{!1===this.isConnected&&this._$Sp()})}}}let tl=t=>(...o)=>({_$litDirective$:t,values:o});let directive_i=class directive_i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,i){this._$Ct=t,this._$AM=o,this._$Ci=i}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};let{I:tc}={M:U,P:N,A:G,C:1,L:ev,R,D:ee,V:ew,I:k,H,N:L,U:z,B:I,F:Z},td={},th=(t,o)=>{let i=t._$AN;if(void 0===i)return!1;for(let t of i)t._$AO?.(o,!1),th(t,o);return!0},tu=t=>{let o,i;do{if(void 0===(o=t._$AM))break;(i=o._$AN).delete(t),t=o}while(0===i?.size)},tp=t=>{for(let o;o=t._$AM;t=o){let i=o._$AN;if(void 0===i)o._$AN=i=new Set;else if(i.has(t))break;i.add(t),tb(o)}};function tm(t){void 0!==this._$AN?(tu(this),this._$AM=t,tp(this)):this._$AM=t}function tg(t,o=!1,i=0){let r=this._$AH,a=this._$AN;if(void 0!==a&&0!==a.size)if(o)if(Array.isArray(r))for(let t=i;t<r.length;t++)th(r[t],!1),tu(r[t]);else null!=r&&(th(r,!1),tu(r));else th(this,t)}let tb=t=>{2==t.type&&(t._$AP??=tg,t._$AQ??=tm)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,o,i){super._$AT(t,o,i),tp(this),this.isConnected=t._$AU}_$AO(t,o=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),o&&(th(this,t),tu(this))}setValue(t){if(void 0===this._$Ct.strings)this._$Ct._$AI(t,this);else{let o=[...this._$Ct._$AH];o[this._$Ci]=t,this._$Ct._$AI(o,this,0)}}disconnected(){}reconnected(){}};let tf=!1,tv=new eO.subtle.Watcher(async()=>{tf||(tf=!0,queueMicrotask(()=>{for(let t of(tf=!1,tv.getPending()))t.get();tv.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var t,o;void 0===this._$Sm&&(this._$Sj=new eO.Computed(()=>{var t;let o=null==(t=this._$SW)?void 0:t.get();return this.setValue(o),o}),this._$Sm=null!=(o=null==(t=this._$Sk)?void 0:t.h)?o:tv,this._$Sm.watch(this._$Sj),eO.subtle.untrack(()=>{var t;return null==(t=this._$Sj)?void 0:t.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return eO.subtle.untrack(()=>t.get())}update(t,[o]){var i;return null!=this._$Sk||(this._$Sk=null==(i=t.options)?void 0:i.host),o!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=o,this._$S_(),eO.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tw=tl(watch_r),ty=t=>(o,...i)=>t(o,...i.map(t=>t instanceof eO.State||t instanceof eO.Computed?tw(t):t));ty(ed),ty(eh),eO.State,eO.Computed;let tk=(t,o)=>new eO.State(t,o),tx=(t,o)=>new eO.Computed(t,o),{fromCharCode:tC}=String;new TextEncoder;let t_=new TextDecoder;let IpcCall=class IpcCall{constructor(t,o,i=!1){this.scope=t,this.reset=i,this.method=`${t}/${o}`}is(t){return t.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(t,o,i){super(t,o,i),this.response=new IpcNotification(this.scope,`${o}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let t$=new IpcRequest("core","webview/ready"),tS=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let tL=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let tA=new IpcCommand("core","telemetry/sendEvent"),tz=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let tE=new IpcCommand("core","webview/focus/didChange"),tR=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let tP=["rebaseEditor.enabled","currentLine.useUncommittedChangesFormat"],tI=new WeakMap;function tM(t,o){return function(i,r,a){let n=tI.get(i.constructor);null==n&&tI.set(i.constructor,n=[]),n.push({method:a.value,keys:Array.isArray(t)?t:[t],afterFirstUpdate:o?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(t,o,i){let r=new CustomEvent(t,{bubbles:!0,cancelable:!1,composed:!0,...i,detail:o});return this.dispatchEvent(r),r}update(t){let o=tI.get(this.constructor);if(null!=o)for(let{keys:i,method:r,afterFirstUpdate:a}of o){if(a&&!this.hasUpdated)continue;let o=i.filter(o=>t.has(o));o.length&&r.call(this,o)}super.update(t)}};let tO=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,tT=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,tD=new Map,tB=new Map;function tF(o){t="string"==typeof o?"system"===o||0===o.trim().length?void 0:[o]:o??void 0,tD.clear(),tB.clear()}function tq(o,i,r,a=!0){if(i=i??void 0,Number.isNaN("number"==typeof o?o:o.getTime()))return"";let n=`${r??""}:${i}`,c=tD.get(n);if(null==c){let o,h=function(t){if(null==t)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};let o=tT.exec(t);if(o?.groups!=null){let{dateStyle:t,timeStyle:i}=o.groups;return{localeMatcher:"best fit",dateStyle:t||"full",timeStyle:i||void 0}}let i={localeMatcher:"best fit"};for(let{groups:o}of t.matchAll(tO))if(null!=o){for(let[t,r]of Object.entries(o))if(null!=r)switch(t){case"year":i.year=4===r.length?"numeric":"2-digit";break;case"month":switch(r.length){case 4:i.month="long";break;case 3:i.month="short";break;case 2:i.month="2-digit";break;case 1:i.month="numeric"}break;case"day":"DD"===r?i.day="2-digit":i.day="numeric";break;case"weekday":switch(r.length){case 4:i.weekday="long";break;case 3:i.weekday="short";break;case 2:i.weekday="narrow"}break;case"hour":i.hour=2===r.length?"2-digit":"numeric",i.hour12="hh"===r||"h"===r;break;case"minute":i.minute=2===r.length?"2-digit":"numeric";break;case"second":i.second=2===r.length?"2-digit":"numeric";break;case"fractionalSecond":i.fractionalSecondDigits=3;break;case"dayPeriod":i.dayPeriod="narrow",i.hour12=!0,i.hourCycle="h12";break;case"timeZoneName":i.timeZoneName=2===r.length?"long":"short"}}return i}(i);o=null==r?t:"system"===r?void 0:[r],c=new Intl.DateTimeFormat(o,h),a&&tD.set(n,c)}if(null==i||tT.test(i))return c.format(o);let h=c.formatToParts(o);return i.replace(tO,(i,n,c,u,p,m,g,b,f,v,w,x,C,_,$)=>{if(null!=n)return n.substring(1,n.length-1);for(let[i,n]of Object.entries($)){if(null==n)continue;let c=h.find(t=>t.type===i);if("Do"===n&&c?.type==="day")return function(t){let o=t%100;return`${t}${tV[(o-20)%10]??tV[o]??tV[0]}`}(Number(c.value));if("a"===n&&c?.type==="dayPeriod"){let i=(function(o){let i=`${r??""}:time:${o}`,n=tD.get(i);if(null==n){let c;c=null==r?t:"system"===r?void 0:[r],n=new Intl.DateTimeFormat(c,{localeMatcher:"best fit",timeStyle:o}),a&&tD.set(i,n)}return n})("short").formatToParts(o).find(t=>"dayPeriod"===t.type);return` ${(i??c)?.value??""}`}return c?.value??""}return""})}let tV=["th","st","nd","rd"];function tW(o,i){o??="decimal";let r=`${i??""}:${o}`,a=tB.get(r);if(null==a){let n,c={localeMatcher:"best fit",style:o};n=null==i?t:"system"===i?void 0:[i],a=new Intl.NumberFormat(n,c),tB.set(r,a)}return a.format}function tj(t,i,r){let a;if(null==r)return o??=tW(),`${o(i)} ${t}${1===i?"":"s"}`;let n=1===i?t:r.plural??`${t}s`;return r.only?n:(0===i?a=r.zero??i:!1===r.format?a=i:null!=r.format?a=r.format(i):(o??=tW(),a=o(i)),`${a}${r.infix??" "}${n}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let tU=/T/,tN=/.*\s*?at\s(.+?)\s/,tH=/^_+/,tG=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(t,o=!1){this.#t={...t,sanitizeKeys:new Set([...tG,...t.sanitizeKeys??[]])},this.#o=o,this.#e=t.createChannel(t.name),this.#i=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(t=>{this.#i=t})}enabled(t){return!!this.isDebugging||0!==this.#i&&(null==t||this.#i<=function(t){switch(t){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(t))}#o=!1;get isDebugging(){return this.#o}#i=0;get logLevel(){var t=this.#i;switch(t){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(tU," ").slice(0,-1)}]`}trace(t,...o){let i;(0!==this.#i&&!(this.#i>1)||this.isDebugging)&&("string"==typeof t?i=t:(i=o.shift(),null!=t&&(i=`${t.prefix} ${i??""}`)),this.isDebugging,this.#e?.trace(`  ${i??""}${this.#r(!0,o)}`))}debug(t,...o){let i;(0!==this.#i&&!(this.#i>2)||this.isDebugging)&&("string"==typeof t?i=t:(i=o.shift(),null!=t&&(i=`${t.prefix} ${i??""}`)),this.isDebugging,this.#e?.debug(`  ${i??""}${this.#r(!1,o)}`))}info(t,...o){let i;(0!==this.#i&&!(this.#i>3)||this.isDebugging)&&("string"==typeof t?i=t:(i=o.shift(),null!=t&&(i=`${t.prefix} ${i??""}`)),this.isDebugging,this.#e?.info(`   ${i??""}${this.#r(!1,o)}`))}warn(t,...o){let i;(0!==this.#i&&!(this.#i>4)||this.isDebugging)&&("string"==typeof t?i=t:(i=o.shift(),null!=t&&(i=`${t.prefix} ${i??""}`)),this.isDebugging,this.#e?.warn(`${i??""}${this.#r(!1,o)}`))}error(t,o,...i){let r;if((0===this.#i||this.#i>5)&&!this.isDebugging)return;if(null==(r=null==o||"string"==typeof o?o:`${o.prefix} ${i.shift()??""}`)){let o=t instanceof Error?t.stack:void 0;if(o){let t=tN.exec(o);null!=t&&(r=t[1])}}this.isDebugging;let a=`  ${r??""}${this.#r(!1,i)}`;null!=t?this.#e?.error(String(t),a):this.#e?.error(a)}showOutputChannel(t){this.#e?.show?.(t)}toLoggable(t,o){if(null!=o){let i=this.sanitize(o,t);if(null!=i)return i}if("function"==typeof t)return"<function>";if(null==t||"object"!=typeof t||t instanceof Error)return String(t);if(Array.isArray(t)){let o=t.length>10?t.slice(0,10):t,i=t.length>10?`, \u2026+${t.length-10}`:"";return`[${o.map(t=>this.toLoggable(t)).join(", ")}${i}]`}let i=this.#t?.toLoggable,r=i?.(t);if(null!=r)return r;let a=this.#t?.sanitizeKeys;try{return JSON.stringify(t,(t,o)=>{if(95!==t.charCodeAt(0))return a?.has(t)?this.sanitize(t,o):""===t||"object"!=typeof o||null==o||Array.isArray(o)?o:o instanceof Error?String(o):i?.(o)??o})}catch{return"<error>"}}sanitize(t,o){if(null==o)return;let i=t.replace(tH,"")||t;if(this.#t?.sanitizeKeys?.has(i))return null!=this.#t.hash?`<${i}:${this.#t.hash("string"==typeof o?o:JSON.stringify(o))}>`:`<${i}>`}#r(t,o){if(0===o.length||t&&(0===this.#i||this.#i>2)&&!this.isDebugging)return"";let i=o.map(t=>this.toLoggable(t)).join(", ");return 0!==i.length?` \u2014 ${i}`:""}};let tK=new Logger,tY=new WeakMap,tX={enabled:t=>tK.enabled(t),log:(t,o,i,...r)=>{switch(t){case"error":tK.error(void 0,o,i,...r);break;case"warn":o?.warn(i,...r);break;case"info":o?.info(i,...r);break;case"debug":default:o?.debug(i,...r);break;case"trace":o?.trace(i,...r)}}},tJ=new Map;function tZ(t,o){let r=i;i=t.scopeId,tJ.set(t.scopeId,t);try{return o()}finally{i=r,tJ.delete(t.scopeId)}}function tQ(){return null!=i?tJ.get(i):void 0}let t0=0x40000000-1;function t1(){let t=0;return{get current(){return t},next:function(){return t===t0&&(t=0),++t},reset:function(){t=0}}}function t2(t){let o=.001*performance.now(),i=Math.floor(o),r=Math.floor(o%1*1e9);return void 0!==t&&(i-=t[0],(r-=t[1])<0&&(i--,r+=1e9)),[i,r]}function t4(t){let[o,i]=t2(t);return 1e3*o+Math.floor(i/1e6)}let t3=t1();function t5(t,o,i){var r;let a,n,c={scopeId:t,prevScopeId:o,prefix:i,enabled:t=>tK.enabled(t),addExitInfo:function(...t){(a??=[]).push(...t)},setFailed:function(t){n=t},getExitInfo:function(){return{details:a?.length?` \u2022 ${a.join(", ")}`:void 0,failed:n}}};return t6(c,"trace",tK.trace),t6(c,"debug",tK.debug),t6(c,"info",tK.info),t6(c,"warn",tK.warn),Object.defineProperty(r=c,"error",{configurable:!0,enumerable:!0,get:function(){let t=(t,o,...i)=>tK.error(t,r,o,...i);return Object.defineProperty(r,"error",{value:t,writable:!1,enumerable:!0}),t}}),c}function t6(t,o,i){Object.defineProperty(t,o,{configurable:!0,enumerable:!0,get:function(){let r=i.bind(tK,t);return Object.defineProperty(t,o,{value:r,writable:!1,enumerable:!0}),r}})}function t8(t,o,i){if(null!=i){let r=null==o?t.toString(16):`${o.toString(16)} \u2192 ${t.toString(16)}`;return null==r?`[${i.padEnd(13)}]`:`[${i}${r.padStart(13-i.length)}]`}return null==o?`[${t.toString(16).padStart(13)}]`:`[${o.toString(16).padStart(5)} \u2192 ${t.toString(16).padStart(5)}]`}function t7(){let t=tQ();if(null==t)return;let o=Object.create(t);return o[Symbol.dispose]=()=>{},o}function t9(t,o,i){if(null!=o&&"boolean"!=typeof o)return t5(o.scopeId,o.prevScopeId,`${o.prefix}${t}`);let r=o?tQ()?.scopeId:void 0,a=t3.next();return t5(a,r,`${t8(a,r,i)} ${t}`)}function oe(t,o,i,...r){switch(o){case"trace":tK.trace(t,i,...r);break;case"info":tK.info(t,i,...r);break;default:tK.debug(t,i,...r)}}let LoggerContext=class LoggerContext{constructor(t){this.scope=t9(t,void 0),tK.configure({name:t,createChannel:function(t){let o=tK.isDebugging?function(t){}:function(t){};return{name:t,logLevel:0,trace:o,debug:o,info:o,warn:o,error:o}}},!1)}trace(t,...o){"string"==typeof t?tK.trace(this.scope,t,...o):tK.trace(t,o.shift(),...o)}debug(t,...o){"string"==typeof t?tK.debug(this.scope,t,...o):tK.debug(t,o.shift(),...o)}info(t,...o){"string"==typeof t?tK.info(this.scope,t,...o):tK.info(t,o.shift(),...o)}};let ot=new IpcNotification("home","subscription/didChange"),oo="graph";new IpcCommand(oo,"chooseRepository"),new IpcCommand(oo,"dblclick"),new IpcCommand(oo,"avatars/get"),new IpcCommand(oo,"avatars/proxy"),new IpcCommand(oo,"refs/metadata/get"),new IpcCommand(oo,"rows/get"),new IpcCommand(oo,"pullRequest/openDetails"),new IpcCommand(oo,"row/action"),new IpcCommand(oo,"treemap/file/action"),new IpcCommand(oo,"search/openInView"),new IpcCommand(oo,"search/cancel"),new IpcCommand(oo,"columns/update"),new IpcCommand(oo,"refs/update/visibility"),new IpcCommand(oo,"refs/update/pinned"),new IpcCommand(oo,"filters/update/excludeTypes"),new IpcCommand(oo,"configuration/update"),new IpcCommand(oo,"displayMode/update"),new IpcCommand(oo,"search/update/mode"),new IpcCommand(oo,"filters/update/includedRefs"),new IpcCommand(oo,"filters/reset"),new IpcCommand(oo,"selection/update"),new IpcCommand(oo,"wipDraft/update"),new IpcRequest(oo,"jumpToHead"),new IpcRequest(oo,"chooseRef"),new IpcRequest(oo,"chooseComparison"),new IpcRequest(oo,"chooseAuthor"),new IpcRequest(oo,"chooseFile"),new IpcRequest(oo,"scope/resolve"),new IpcRequest(oo,"rows/ensure"),new IpcRequest(oo,"search/history/get"),new IpcRequest(oo,"search/history/store"),new IpcRequest(oo,"search/history/delete"),new IpcRequest(oo,"counts"),new IpcRequest(oo,"overview/get"),new IpcRequest(oo,"overview/wip/get"),new IpcRequest(oo,"overview/wip/detailed/get"),new IpcRequest(oo,"overview/enrichment/get"),new IpcRequest(oo,"agentSessions/get"),new IpcRequest(oo,"wip/stats/get"),new IpcRequest(oo,"wip/lineStats/get"),new IpcCommand(oo,"wip/watches/sync"),new IpcNotification(oo,"wip/refetch/request"),new IpcRequest(oo,"row/hover/get"),new IpcRequest(oo,"search"),new IpcNotification(oo,"overview/didChange"),new IpcNotification(oo,"agentSessions/didChange"),new IpcNotification(oo,"repositories/integration/didChange"),new IpcNotification(oo,"wipDrafts/didChange"),new IpcNotification(oo,"didChange",!0),new IpcNotification(oo,"configuration/didChange");let oi=new IpcNotification(oo,"subscription/didChange");new IpcNotification(oo,"org/settings/didChange"),new IpcNotification(oo,"avatars/didChange"),new IpcNotification(oo,"mcp/didChange"),new IpcNotification(oo,"hooks/didChange"),new IpcNotification(oo,"agents/canInstallClaudeHook/didChange"),new IpcCommand(oo,"graphWalkthrough/banner/close"),new IpcNotification(oo,"graphWalkthrough/banner/didChange"),new IpcNotification(oo,"graphWalkthrough/complete/didChange"),new IpcNotification(oo,"graphWalkthrough/started/didChange"),new IpcNotification(oo,"visualizationsButtonCallout/didChange"),new IpcCommand(oo,"visualizationsButtonCallout/dismiss"),new IpcNotification(oo,"sidebar/activePanel/didRequest"),new IpcNotification(oo,"action/didRequest"),new IpcCommand(oo,"track/overview/shown"),new IpcCommand(oo,"track/scope/changed"),new IpcCommand(oo,"track/details/reviewMode"),new IpcCommand(oo,"track/details/composeMode"),new IpcCommand(oo,"track/details/resolveMode"),new IpcCommand(oo,"track/details/compareMode"),new IpcCommand(oo,"track/details/wipShown"),new IpcNotification(oo,"branchState/didChange"),new IpcNotification(oo,"refs/didChangeMetadata"),new IpcNotification(oo,"columns/didChange"),new IpcNotification(oo,"scrollMarkers/didChange"),new IpcNotification(oo,"refs/didChangeVisibility"),new IpcNotification(oo,"refs/didChangePinned"),new IpcNotification(oo,"rows/didChange"),new IpcNotification(oo,"rows/stats/didChange"),new IpcNotification(oo,"selection/didChange"),new IpcNotification(oo,"compareMode/didRequestOpen"),new IpcNotification(oo,"timeline/didRequestOpenScope"),new IpcNotification(oo,"search/didRequest"),new IpcNotification(oo,"workingTree/didChange"),new IpcNotification(oo,"didSearch"),new IpcNotification(oo,"didFetch"),new IpcNotification(oo,"scope/anchors/didInvalidate"),new IpcNotification(oo,"treemap/didInvalidate"),new IpcNotification(oo,"featurePreview/didStart");let or=new IpcNotification("timeline","didChange");let PromosContext=class PromosContext{constructor(t){this.disposables=[],this._promos=new Map,this.ipc=t,this.disposables.push(this.ipc.onReceiveMessage(t=>{(ot.is(t)||oi.is(t)||or.is(t))&&this._promos.clear()}))}async getApplicablePromo(t,o){let i=`${t}|${o}`,r=this._promos.get(i);return null==r&&(r=this.ipc.sendRequest(tL,{plan:t,location:o}).then(t=>t.promo,()=>void 0),this._promos.set(i,r)),await r}dispose(){this.disposables.forEach(t=>t.dispose())}};let TelemetryContext=class TelemetryContext{constructor(t){this.disposables=[],this.ipc=t}sendEvent(t){this.ipc.sendCommand(tA,t)}dispose(){this.disposables.forEach(t=>t.dispose())}};function oa(t){return(t=t.toString().toLowerCase()).includes("ms")?parseFloat(t):t.includes("s")?1e3*parseFloat(t):parseFloat(t)}function on(t,o){return new Promise(i=>{t.addEventListener(o,function r(a){a.target===t&&(t.removeEventListener(o,r),i())})})}function os(t,o,i){let r,a,n,c,h,u,p,m,g,b,f=0;null!=i&&({edges:u,maxWait:p,cancellation:m,aggregator:g}=i);let v="leading"===(u??="trailing")||"both"===u,w="trailing"===u||"both"===u;function x(){if(null!=r){f=Date.now();let o=r,i=b;return b=void 0,r=void 0,n=t.apply(i,o)}}function C(){null!=c&&(clearTimeout(c),c=void 0)}function _(){null!=h&&(clearTimeout(h),h=void 0)}function $(){C(),_(),b=void 0,r=void 0,a=void 0,f=0}function S(...t){if(m?.aborted)return;let i=Date.now();null!=g&&null!=r?r=g(r,t):(b=this,r=t);let u=null==c&&null==h;a=i,C();let _=Date.now();if(a=_,c=setTimeout(()=>{c=void 0,function t(){let i,r,n=Date.now();if(i=n-(a??0),r=n-f,null==a||i>=o||i<0||null!=p&&r>=p){w&&x(),$();return}c=setTimeout(()=>{c=void 0,t()},o-(n-(a??0)))}()},o),null!=p&&!h){0===f&&(f=_);let t=p-(_-f);t>0?h=setTimeout(()=>{h=void 0,w&&null!=r&&x(),f=Date.now()},t):(w&&null!=r&&x(),$())}return v&&u?x():n}return S.cancel=$,S.flush=function(){return C(),_(),x()},S.pending=function(){return null!=c||null!=h},m?.addEventListener("abort",$,{once:!0}),S}(eT||(eT={})).on=function(t,o,i,r){let a=!1;if("string"==typeof t){let n=function(o){let r=o?.target?.closest(t);null!=r&&i(o,r)};return document.addEventListener(o,n,r??!0),{dispose:()=>{a||(a=!0,document.removeEventListener(o,n,r??!0))}}}let n=function(t){i(t,this)};return t.addEventListener(o,n,r??!1),{dispose:()=>{a||(a=!0,t.removeEventListener(o,n,r??!1))}}};var ol=Uint8Array,oc=Uint16Array,od=Int32Array,oh=new ol([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ou=new ol([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),op=new ol([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),om=function(t,o){for(var i=new oc(31),r=0;r<31;++r)i[r]=o+=1<<t[r-1];for(var a=new od(i[30]),r=1;r<30;++r)for(var n=i[r];n<i[r+1];++n)a[n]=n-i[r]<<5|r;return{b:i,r:a}},og=om(oh,2),ob=og.b,of=og.r;ob[28]=258,of[258]=28;var ov=om(ou,0),ow=ov.b;ov.r;for(var oy=new oc(32768),ok=0;ok<32768;++ok){var ox=(43690&ok)>>1|(21845&ok)<<1;ox=(61680&(ox=(52428&ox)>>2|(13107&ox)<<2))>>4|(3855&ox)<<4,oy[ok]=((65280&ox)>>8|(255&ox)<<8)>>1}for(var oC=function(t,o,i){for(var r,a=t.length,n=0,c=new oc(o);n<a;++n)t[n]&&++c[t[n]-1];var h=new oc(o);for(n=1;n<o;++n)h[n]=h[n-1]+c[n-1]<<1;if(i){r=new oc(1<<o);var u=15-o;for(n=0;n<a;++n)if(t[n])for(var p=n<<4|t[n],m=o-t[n],g=h[t[n]-1]++<<m,b=g|(1<<m)-1;g<=b;++g)r[oy[g]>>u]=p}else for(r=new oc(a),n=0;n<a;++n)t[n]&&(r[n]=oy[h[t[n]-1]++]>>15-t[n]);return r},o_=new ol(288),ok=0;ok<144;++ok)o_[ok]=8;for(var ok=144;ok<256;++ok)o_[ok]=9;for(var ok=256;ok<280;++ok)o_[ok]=7;for(var ok=280;ok<288;++ok)o_[ok]=8;for(var o$=new ol(32),ok=0;ok<32;++ok)o$[ok]=5;var oS=oC(o_,9,1),oL=oC(o$,5,1),oA=function(t){for(var o=t[0],i=1;i<t.length;++i)t[i]>o&&(o=t[i]);return o},oz=function(t,o,i){var r=o/8|0;return(t[r]|t[r+1]<<8)>>(7&o)&i},oE=function(t,o){var i=o/8|0;return(t[i]|t[i+1]<<8|t[i+2]<<16)>>(7&o)},oR=function(t,o,i){return(null==o||o<0)&&(o=0),(null==i||i>t.length)&&(i=t.length),new ol(t.subarray(o,i))},oP=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],oI=function(t,o,i){var r=Error(o||oP[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,oI),!i)throw r;return r},oM=function(t,o,i,r){var a=t.length,n=r?r.length:0;if(!a||o.f&&!o.l)return i||new ol(0);var c=!i,h=c||2!=o.i,u=o.i;c&&(i=new ol(3*a));var p=function(t){var o=i.length;if(t>o){var r=new ol(Math.max(2*o,t));r.set(i),i=r}},m=o.f||0,g=o.p||0,b=o.b||0,f=o.l,v=o.d,w=o.m,x=o.n,C=8*a;do{if(!f){m=oz(t,g,1);var _=oz(t,g+1,3);if(g+=3,_)if(1==_)f=oS,v=oL,w=9,x=5;else if(2==_){var $=oz(t,g,31)+257,S=oz(t,g+10,15)+4,A=$+oz(t,g+5,31)+1;g+=14;for(var E=new ol(A),P=new ol(19),M=0;M<S;++M)P[op[M]]=oz(t,g+3*M,7);g+=3*S;for(var O=oA(P),T=(1<<O)-1,D=oC(P,O,1),M=0;M<A;){var B=D[oz(t,g,T)];g+=15&B;var F=B>>4;if(F<16)E[M++]=F;else{var q=0,V=0;for(16==F?(V=3+oz(t,g,3),g+=2,q=E[M-1]):17==F?(V=3+oz(t,g,7),g+=3):18==F&&(V=11+oz(t,g,127),g+=7);V--;)E[M++]=q}}var W=E.subarray(0,$),j=E.subarray($);w=oA(W),x=oA(j),f=oC(W,w,1),v=oC(j,x,1)}else oI(1);else{var F=((g+7)/8|0)+4,U=t[F-4]|t[F-3]<<8,N=F+U;if(N>a){u&&oI(0);break}h&&p(b+U),i.set(t.subarray(F,N),b),o.b=b+=U,o.p=g=8*N,o.f=m;continue}if(g>C){u&&oI(0);break}}h&&p(b+131072);for(var G=(1<<w)-1,K=(1<<x)-1,Y=g;;Y=g){var q=f[oE(t,g)&G],X=q>>4;if((g+=15&q)>C){u&&oI(0);break}if(q||oI(2),X<256)i[b++]=X;else if(256==X){Y=g,f=null;break}else{var J=X-254;if(X>264){var M=X-257,Q=oh[M];J=oz(t,g,(1<<Q)-1)+ob[M],g+=Q}var ee=v[oE(t,g)&K],et=ee>>4;ee||oI(3),g+=15&ee;var j=ow[et];if(et>3){var Q=ou[et];j+=oE(t,g)&(1<<Q)-1,g+=Q}if(g>C){u&&oI(0);break}h&&p(b+131072);var eo=b+J;if(b<j){var ei=n-j,er=Math.min(j,eo);for(ei+b<0&&oI(3);b<er;++b)i[b]=r[ei+b]}for(;b<eo;++b)i[b]=i[b-j]}}o.l=f,o.p=Y,o.b=b,o.f=m,f&&(m=1,o.m=w,o.d=v,o.n=x)}while(!m)return b!=i.length&&c?oR(i,0,b):i.subarray(0,b)},oO=new ol(0),oT="u">typeof TextDecoder&&new TextDecoder;try{oT.decode(oO,{stream:!0})}catch{}var oD=function(t){for(var o="",i=0;;){var r=t[i++],a=(r>127)+(r>223)+(r>239);if(i+a>t.length)return{s:o,r:oR(t,i-1)};a?3==a?o+=String.fromCharCode(55296|(r=((15&r)<<18|(63&t[i++])<<12|(63&t[i++])<<6|63&t[i++])-65536)>>10,56320|1023&r):1&a?o+=String.fromCharCode((31&r)<<6|63&t[i++]):o+=String.fromCharCode((15&r)<<12|(63&t[i++])<<6|63&t[i++]):o+=String.fromCharCode(r)}};function oB(t,o){if(o){for(var i="",r=0;r<t.length;r+=16384)i+=String.fromCharCode.apply(null,t.subarray(r,r+16384));return i}if(oT)return oT.decode(t);var a=oD(t),n=a.s,i=a.r;return i.length&&oI(8),n}"function"==typeof queueMicrotask&&queueMicrotask;let oF=/\(([\s\S]*)\)/,oq=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,oV=/\s?=.*$/;function oW(t){var o,i;let r,a,n,c,h,u,p,m,g;return o="debug",h=!1,u=!0,null!=(i=t)&&({args:r,when:a,exit:n,prefix:c,onlyExit:h=!1,timing:u=!0}=i),p="object"==typeof u?u.warnAfter:1500,m=!1!==u||"object"==typeof h&&h.after>0,g="trace"===o?tK.trace:"debug"===o?tK.debug:tK.info,(t,i,u)=>{let b,f;if("function"==typeof u.value?(b=u.value,f="value"):"function"==typeof u.get&&(b=u.get,f="get"),null==b||null==f)throw Error("Not supported");let v=null==r?function(t){if("function"!=typeof t)throw Error("Not supported");if(0===t.length)return[];let o=Function.prototype.toString.call(t),i=(o=(o=o.replace(oq,"")||o).slice(0,o.indexOf("{"))).indexOf("("),r=o.indexOf(")");i=i>=0?i+1:0,r=r>0?r:o.indexOf("="),o=o.slice(i,r),o=`(${o})`;let a=oF.exec(o);return null!=a?a[1].split(",").map(t=>t.trim().replace(oV,"")):[]}(b):[];u[f]=function(...t){let u;if(!tK.enabled()||null!=a&&!a.apply(this,t))return b.apply(this,t);let f=tK.enabled(o),w=t7(),x=w?.scopeId,C=t3.next(),_=this!=null?function(t){let o;if("function"==typeof t){if(null==(o=t.prototype?.constructor))return t.name}else o=t.constructor;let i=o?.name??"",r=i.indexOf("_");-1!==r&&(i=i.substring(r+1));let a=o;for(;null!=a;){let o=tY.get(a);if(null!=o)return o(t,i);a=Object.getPrototypeOf(a)}return i}(this):void 0,$=_?`${t8(C,x)} ${_}.${i}`:`${t8(C,x)} ${i}`;null!=c&&($=c({id:C,instance:this,instanceName:_??"",name:i,prefix:$},...t));let S=t5(C,x,$),A=!1,E=()=>(A||(A=!0,u=function(t,o,i){if(!1===t||!o.length)return;if("function"==typeof t){let i=t(...o);if(!1===i)return;let r="";for(let[t,o]of Object.entries(i))r.length&&(r+=", "),r+=`${t}=${tK.toLoggable(o,t)}`;return r||void 0}let r="",a=-1;for(let t of o){let o=i[++a];r.length&&(r+=", "),r+=o?`${o}=${tK.toLoggable(t,o)}`:tK.toLoggable(t)}return r||void 0}(r,t,v)),u);if(!h&&f){let t=E();g.call(tK,t?`${$}(${t})`:$)}if(h||m||null!=n){let o=m?t2():void 0,i=t=>{let i=void 0!==o?` [${t4(o)}ms]`:"",r=S.getExitInfo();if(h){let o=E();tK.error(t,o?`${$}(${o})`:$,r?.details?`failed${r.details}${i}`:`failed${i}`)}else tK.error(t,$,r?.details?`failed${r.details}${i}`:`failed${i}`)},r=t=>{let i,r,a,c;null!=o?(i=t4(o))>p?(r=tK.warn,a=` [*${i}ms] (slow)`):(r=g,a=` [${i}ms]`):(a="",r=g);let u=S.getExitInfo();if(null!=n)if("function"==typeof n)try{c=n(t)}catch(t){c=`@log.exit error: ${t}`}else!0===n&&(c=`returned ${tK.toLoggable(t)}`);else u?.failed?(c=u.failed,r=(t,...o)=>tK.error(null,t,...o)):c="completed";if(f||r!==g){let t=E();h?(!0===h||0===h.after||i>h.after)&&r.call(tK,t?`${$}(${t}) ${c}${u?.details||""}${a}`:`${$} ${c}${u?.details||""}${a}`):r.call(tK,t?`${$}(${t}) ${c}${u?.details||""}${a}`:`${$} ${c}${u?.details||""}${a}`)}};return tZ(S,()=>{var o;let a;try{a=b.apply(this,t)}catch(t){throw i(t),t}return null!=a&&null!=(o=a)&&(o instanceof Promise||"function"==typeof o?.then)?a.then(r,i).catch(()=>{}):r(a),a})}return tZ(S,()=>b.apply(this,t))}}}globalThis.scheduler?.yield?.bind(globalThis.scheduler),Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(t,o,...i){let r;this._stopped=!1,this.logScope=null!=t&&"string"!=typeof t?t:t9(t??"",!1,o?.scopeLabel);let a=o?.log;if(r=null==a||!0===a?{}:!1===a||a.onlyExit?void 0:a,this.logLevel=("object"==typeof a?a.level:void 0)??"debug",this.logProvider=o?.provider??tX,this._time=t2(),null!=r){if(!this.logProvider.enabled(this.logLevel))return;i.length?this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`,...i):this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return t4(this._time)}log(t){this.logCore(t,!1)}restart(t){this.logCore(t,!0),this._time=t2(),this._stopped=!1}stop(t){this._stopped||(this.restart(t),this._stopped=!0)}logCore(t,o){if(!this.logProvider.enabled(this.logLevel))return;if(!o)return void this.logProvider.log(this.logLevel,this.logScope,`${t?.message??""}${t?.suffix??""}`);let i=t4(this._time),r=t?.message??"";this.logProvider.log(i>250?"warn":this.logLevel,this.logScope,`${r?`${r} `:""}[${i}ms]${t?.suffix??""}`)}};(()=>{let t;var o,i,r={975:t=>{function o(t){if("string"!=typeof t)throw TypeError("Path must be a string. Received "+JSON.stringify(t))}function i(t,o){for(var i,r="",a=0,n=-1,c=0,h=0;h<=t.length;++h){if(h<t.length)i=t.charCodeAt(h);else{if(47===i)break;i=47}if(47===i){if(n===h-1||1===c);else if(n!==h-1&&2===c){if(r.length<2||2!==a||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){var u=r.lastIndexOf("/");if(u!==r.length-1){-1===u?(r="",a=0):a=(r=r.slice(0,u)).length-1-r.lastIndexOf("/"),n=h,c=0;continue}}else if(2===r.length||1===r.length){r="",a=0,n=h,c=0;continue}}o&&(r.length>0?r+="/..":r="..",a=2)}else r.length>0?r+="/"+t.slice(n+1,h):r=t.slice(n+1,h),a=h-n-1;n=h,c=0}else 46===i&&-1!==c?++c:c=-1}return r}var r={resolve:function(){for(var t,r,a="",n=!1,c=arguments.length-1;c>=-1&&!n;c--)c>=0?t=arguments[c]:(void 0===r&&(r=process.cwd()),t=r),o(t),0!==t.length&&(a=t+"/"+a,n=47===t.charCodeAt(0));return a=i(a,!n),n?a.length>0?"/"+a:"/":a.length>0?a:"."},normalize:function(t){if(o(t),0===t.length)return".";var r=47===t.charCodeAt(0),a=47===t.charCodeAt(t.length-1);return 0!==(t=i(t,!r)).length||r||(t="."),t.length>0&&a&&(t+="/"),r?"/"+t:t},isAbsolute:function(t){return o(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var t,i=0;i<arguments.length;++i){var a=arguments[i];o(a),a.length>0&&(void 0===t?t=a:t+="/"+a)}return void 0===t?".":r.normalize(t)},relative:function(t,i){if(o(t),o(i),t===i||(t=r.resolve(t))===(i=r.resolve(i)))return"";for(var a=1;a<t.length&&47===t.charCodeAt(a);++a);for(var n=t.length,c=n-a,h=1;h<i.length&&47===i.charCodeAt(h);++h);for(var u=i.length-h,p=c<u?c:u,m=-1,g=0;g<=p;++g){if(g===p){if(u>p){if(47===i.charCodeAt(h+g))return i.slice(h+g+1);if(0===g)return i.slice(h+g)}else c>p&&(47===t.charCodeAt(a+g)?m=g:0===g&&(m=0));break}var b=t.charCodeAt(a+g);if(b!==i.charCodeAt(h+g))break;47===b&&(m=g)}var f="";for(g=a+m+1;g<=n;++g)g!==n&&47!==t.charCodeAt(g)||(0===f.length?f+="..":f+="/..");return f.length>0?f+i.slice(h+m):(h+=m,47===i.charCodeAt(h)&&++h,i.slice(h))},_makeLong:function(t){return t},dirname:function(t){if(o(t),0===t.length)return".";for(var i=t.charCodeAt(0),r=47===i,a=-1,n=!0,c=t.length-1;c>=1;--c)if(47===(i=t.charCodeAt(c))){if(!n){a=c;break}}else n=!1;return -1===a?r?"/":".":r&&1===a?"//":t.slice(0,a)},basename:function(t,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');o(t);var r,a=0,n=-1,c=!0;if(void 0!==i&&i.length>0&&i.length<=t.length){if(i.length===t.length&&i===t)return"";var h=i.length-1,u=-1;for(r=t.length-1;r>=0;--r){var p=t.charCodeAt(r);if(47===p){if(!c){a=r+1;break}}else -1===u&&(c=!1,u=r+1),h>=0&&(p===i.charCodeAt(h)?-1==--h&&(n=r):(h=-1,n=u))}return a===n?n=u:-1===n&&(n=t.length),t.slice(a,n)}for(r=t.length-1;r>=0;--r)if(47===t.charCodeAt(r)){if(!c){a=r+1;break}}else -1===n&&(c=!1,n=r+1);return -1===n?"":t.slice(a,n)},extname:function(t){o(t);for(var i=-1,r=0,a=-1,n=!0,c=0,h=t.length-1;h>=0;--h){var u=t.charCodeAt(h);if(47!==u)-1===a&&(n=!1,a=h+1),46===u?-1===i?i=h:1!==c&&(c=1):-1!==i&&(c=-1);else if(!n){r=h+1;break}}return -1===i||-1===a||0===c||1===c&&i===a-1&&i===r+1?"":t.slice(i,a)},format:function(t){var o,i;if(null===t||"object"!=typeof t)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return o=t.dir||t.root,i=t.base||(t.name||"")+(t.ext||""),o?o===t.root?o+i:o+"/"+i:i},parse:function(t){o(t);var i={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return i;var r,a=t.charCodeAt(0),n=47===a;n?(i.root="/",r=1):r=0;for(var c=-1,h=0,u=-1,p=!0,m=t.length-1,g=0;m>=r;--m)if(47!==(a=t.charCodeAt(m)))-1===u&&(p=!1,u=m+1),46===a?-1===c?c=m:1!==g&&(g=1):-1!==c&&(g=-1);else if(!p){h=m+1;break}return -1===c||-1===u||0===g||1===g&&c===u-1&&c===h+1?-1!==u&&(i.base=i.name=0===h&&n?t.slice(1,u):t.slice(h,u)):(0===h&&n?(i.name=t.slice(1,c),i.base=t.slice(1,u)):(i.name=t.slice(h,c),i.base=t.slice(h,u)),i.ext=t.slice(c,u)),h>0?i.dir=t.slice(0,h-1):n&&(i.dir="/"),i},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,t.exports=r}},a={};function n(t){var o=a[t];if(void 0!==o)return o.exports;var i=a[t]={exports:{}};return r[t](i,i.exports,n),i.exports}n.d=(t,o)=>{for(var i in o)n.o(o,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:o[i]})},n.o=(t,o)=>Object.prototype.hasOwnProperty.call(t,o),n.r=t=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var c={};(n.r(c),n.d(c,{URI:()=>l,Utils:()=>i}),"object"==typeof process)?t="win32"===process.platform:"object"==typeof navigator&&(t=navigator.userAgent.indexOf("Windows")>=0);let h=/^\w[\w\d+.-]*$/,u=/^\//,p=/^\/\//;function m(t,o){if(!t.scheme&&o)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t.authority}", path: "${t.path}", query: "${t.query}", fragment: "${t.fragment}"}`);if(t.scheme&&!h.test(t.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(t.path){if(t.authority){if(!u.test(t.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(t.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let g=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(t){return t instanceof l||!!t&&"string"==typeof t.authority&&"string"==typeof t.fragment&&"string"==typeof t.path&&"string"==typeof t.query&&"string"==typeof t.scheme&&"string"==typeof t.fsPath&&"function"==typeof t.with&&"function"==typeof t.toString}scheme;authority;path;query;fragment;constructor(t,o,i,r,a,n=!1){"object"==typeof t?(this.scheme=t.scheme||"",this.authority=t.authority||"",this.path=t.path||"",this.query=t.query||"",this.fragment=t.fragment||""):(this.scheme=t||n?t:"file",this.authority=o||"",this.path=function(t,o){switch(t){case"https":case"http":case"file":o?"/"!==o[0]&&(o="/"+o):o="/"}return o}(this.scheme,i||""),this.query=r||"",this.fragment=a||"",m(this,n))}get fsPath(){return x(this,!1)}with(t){if(!t)return this;let{scheme:o,authority:i,path:r,query:a,fragment:n}=t;return void 0===o?o=this.scheme:null===o&&(o=""),void 0===i?i=this.authority:null===i&&(i=""),void 0===r?r=this.path:null===r&&(r=""),void 0===a?a=this.query:null===a&&(a=""),void 0===n?n=this.fragment:null===n&&(n=""),o===this.scheme&&i===this.authority&&r===this.path&&a===this.query&&n===this.fragment?this:new d(o,i,r,a,n)}static parse(t,o=!1){let i=g.exec(t);return i?new d(i[2]||"",$(i[4]||""),$(i[5]||""),$(i[7]||""),$(i[9]||""),o):new d("","","","","")}static file(o){let i="";if(t&&(o=o.replace(/\\/g,"/")),"/"===o[0]&&"/"===o[1]){let t=o.indexOf("/",2);-1===t?(i=o.substring(2),o="/"):(i=o.substring(2,t),o=o.substring(t)||"/")}return new d("file",i,o,"","")}static from(t){let o=new d(t.scheme,t.authority,t.path,t.query,t.fragment);return m(o,!0),o}toString(t=!1){return C(this,t)}toJSON(){return this}static revive(t){if(t){if(t instanceof l)return t;{let o=new d(t);return o._formatted=t.external,o._fsPath=t._sep===b?t.fsPath:null,o}}return t}};let b=t?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=x(this,!1)),this._fsPath}toString(t=!1){return t?C(this,!0):(this._formatted||(this._formatted=C(this,!1)),this._formatted)}toJSON(){let t={$mid:1};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=b),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t}};let f={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function v(t,o,i){let r,a=-1;for(let n=0;n<t.length;n++){let c=t.charCodeAt(n);if(c>=97&&c<=122||c>=65&&c<=90||c>=48&&c<=57||45===c||46===c||95===c||126===c||o&&47===c||i&&91===c||i&&93===c||i&&58===c)-1!==a&&(r+=encodeURIComponent(t.substring(a,n)),a=-1),void 0!==r&&(r+=t.charAt(n));else{void 0===r&&(r=t.substr(0,n));let o=f[c];void 0!==o?(-1!==a&&(r+=encodeURIComponent(t.substring(a,n)),a=-1),r+=o):-1===a&&(a=n)}}return -1!==a&&(r+=encodeURIComponent(t.substring(a))),void 0!==r?r:t}function w(t){let o;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);35===r||63===r?(void 0===o&&(o=t.substr(0,i)),o+=f[r]):void 0!==o&&(o+=t[i])}return void 0!==o?o:t}function x(o,i){let r;return r=o.authority&&o.path.length>1&&"file"===o.scheme?`//${o.authority}${o.path}`:47===o.path.charCodeAt(0)&&(o.path.charCodeAt(1)>=65&&90>=o.path.charCodeAt(1)||o.path.charCodeAt(1)>=97&&122>=o.path.charCodeAt(1))&&58===o.path.charCodeAt(2)?i?o.path.substr(1):o.path[1].toLowerCase()+o.path.substr(2):o.path,t&&(r=r.replace(/\//g,"\\")),r}function C(t,o){let i=o?w:v,r="",{scheme:a,authority:n,path:c,query:h,fragment:u}=t;if(a&&(r+=a,r+=":"),(n||"file"===a)&&(r+="/",r+="/"),n){let t=n.indexOf("@");if(-1!==t){let o=n.substr(0,t);n=n.substr(t+1),-1===(t=o.lastIndexOf(":"))?r+=i(o,!1,!1):(r+=i(o.substr(0,t),!1,!1),r+=":",r+=i(o.substr(t+1),!1,!0)),r+="@"}-1===(t=(n=n.toLowerCase()).lastIndexOf(":"))?r+=i(n,!1,!0):(r+=i(n.substr(0,t),!1,!0),r+=n.substr(t))}if(c){if(c.length>=3&&47===c.charCodeAt(0)&&58===c.charCodeAt(2)){let t=c.charCodeAt(1);t>=65&&t<=90&&(c=`/${String.fromCharCode(t+32)}:${c.substr(3)}`)}else if(c.length>=2&&58===c.charCodeAt(1)){let t=c.charCodeAt(0);t>=65&&t<=90&&(c=`${String.fromCharCode(t+32)}:${c.substr(2)}`)}r+=i(c,!0,!1)}return h&&(r+="?",r+=i(h,!1,!1)),u&&(r+="#",r+=o?u:v(u,!1,!1)),r}let _=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function $(t){return t.match(_)?t.replace(_,t=>(function t(o){try{return decodeURIComponent(o)}catch{return o.length>3?o.substr(0,3)+t(o.substr(3)):o}})(t)):t}var S=n(975);let A=S.posix||S;(o=i||(i={})).joinPath=function(t,...o){return t.with({path:A.join(t.path,...o)})},o.resolvePath=function(t,...o){let i=t.path,r=!1;"/"!==i[0]&&(i="/"+i,r=!0);let a=A.resolve(i,...o);return r&&"/"===a[0]&&!t.authority&&(a=a.substring(1)),t.with({path:a})},o.dirname=function(t){if(0===t.path.length||"/"===t.path)return t;let o=A.dirname(t.path);return 1===o.length&&46===o.charCodeAt(0)&&(o=""),t.with({path:o})},o.basename=function(t){return A.basename(t.path)},o.extname=function(t){return A.extname(t.path)},eD=c})();let{URI:oj,Utils:oU}=eD;function oN(t,o){return JSON.parse(t,(t,i)=>(function(t,o){let i=function(t){if("object"!=typeof t||null==t)return;let o=t.__ipc;if(null!=o)switch(o){case"date":return"number"==typeof t.value?t:void 0;case"promise":return"object"==typeof t.value&&"string"==typeof t.value.id&&"string"==typeof t.value.method?t:void 0;case"uri":return"object"==typeof t.value&&"string"==typeof t.value?.scheme?t:void 0;default:return}}(t);if(null==i)return t;switch(i.__ipc){case"date":return new Date(i.value);case"promise":return o(i.value);case"uri":return oj.revive(i.value)}})(i,o))}let oH="__supertalk_rpc__";function oG(t){return"object"==typeof t&&null!==t&&oH in t&&!0===t[oH]}let oK=new TextEncoder,oY=new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._type="fire"}static{this._noop=function(){}}get event(){return this._event??=(t,o,i)=>{if(this._disposed)return{dispose:Emitter._noop};this._target??=new EventTarget;let r=i=>{try{t.call(o,i.detail)}catch{}};this._target.addEventListener(Emitter._type,r);let a={dispose:()=>{a.dispose=Emitter._noop,this._target?.removeEventListener(Emitter._type,r)}};return i?.push(a),a},this._event}fire(t){this._disposed||this._target?.dispatchEvent(new CustomEvent(Emitter._type,{detail:t}))}dispose(){this._disposed=!0,this._target=void 0}};var oX=Object.defineProperty,oJ=Object.getOwnPropertyDescriptor,oZ=(t,o)=>(o=Symbol[t])?o:Symbol.for("Symbol."+t),oQ=t=>{throw TypeError(t)},o0=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?oJ(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&oX(o,i,n),n};function o1(){return r??=null!=a?a():acquireVsCodeApi()}let o2=t1();function o4(){return`webview:${o2.next()}`}let o3=`wv-${Math.random().toString(36).slice(2,10)}`,o5=Date.now(),o6=class{constructor(t){this.appName=t,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=o1(),this._disposable=eT.on(window,"message",t=>this.onMessageReceived(t))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(t){var o,r,a,n,c,h,u,p,m=[];try{if(oG(t.data))return;let n=t.data,c=((t,o,i)=>{if(null!=o){var r,a;"object"!=typeof o&&"function"!=typeof o&&oQ("Object expected"),i&&(r=o[oZ("asyncDispose")]),void 0===r&&(r=o[oZ("dispose")],i&&(a=r)),"function"!=typeof r&&oQ("Object not disposable"),a&&(r=function(){try{a.call(this)}catch(t){return Promise.reject(t)}}),t.push([i,r,o])}else i&&t.push([i]);return o})(m,function(t,o,r){var a,n;let c,h,u;if(!tK.enabled())return;let p=(a=r?.scope??!0,n=r?.scopeLabel,h=tQ(),i=(u=t9(t,a,n)).scopeId,tJ.set(u.scopeId,u),u[Symbol.dispose]=()=>{let t;t=u?.scopeId??i,null!=t&&tJ.delete(t),i=h?.scopeId},u);if(!o)return p;let m="debug",g=!1;"object"==typeof o&&(m=o.level??m,c=o.message,g=!0===o.onlyExit);let b=t2();g||oe(p,m,c??"");let f=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let t=t4(b),o=` [${t}ms]`,i=p.getExitInfo(),r=i.failed??"completed";null!=i.failed?tK.error(null,p,`${r}${i.details??""}${o}`):oe(p,m,`${r}${i.details??""}${o}`),f()},p}(`(e=${n.id}|${n.method})`,void 0,{scope:t7()})),h=function(t,o,...i){let r=("object"==typeof o?.log?o.log.level:void 0)??"info";return(o?.provider??tX).enabled(r)?new Stopwatch(t,o,...i):void 0}(c,{log:{onlyExit:!0,level:"debug"}});if(n.compressed&&n.params instanceof Uint8Array){if("deflate"===n.compressed)try{n.params=oB((a=n.params,oM(a,{i:2},void 0,void 0)))}catch(t){n.params=oB(n.params)}else n.params=oB(n.params);h?.restart({message:`\u2022 decompressed (${n.compressed}) serialized params`})}if("string"==typeof n.params?(n.params=oN(n.params,t=>this.getResponsePromise(t.method,t.id)),h?.stop({message:"• deserialized params"})):null==n.params?h?.stop({message:"• no params"}):h?.stop({message:"• invalid params"}),c?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-n.timestamp}ms`),null!=n.completionId){let t=(o=n.method,r=n.completionId,`${o}|${r}`);this._pendingHandlers.get(t)?.(n);return}this._onReceiveMessage.fire(n)}catch(t){var g=t,b=!0}finally{n=g,c=b,h="function"==typeof SuppressedError?SuppressedError:function(t,o,i,r){return(r=Error(i)).name="SuppressedError",r.error=t,r.suppressed=o,r},u=t=>n=c?new h(t,n,"An error was suppressed during disposal"):(c=!0,t),(p=t=>{for(;t=m.pop();)try{var o=t[1]&&t[1].call(t[2]);if(t[0])return Promise.resolve(o).then(p,t=>(u(t),p()))}catch(t){u(t)}if(c)throw n})()}}deserializeIpcData(t){return oN(t,t=>this.getResponsePromise(t.method,t.id))}sendCommand(t,o){let i=o4();this.postMessage({id:i,scope:t.scope,method:t.method,params:o,compressed:!1,timestamp:Date.now()})}async sendRequest(t,o){let i=o4(),r=this.getResponsePromise(t.response.method,i);return this.postMessage({id:i,scope:t.scope,method:t.method,params:o,compressed:!1,timestamp:Date.now(),completionId:i}),r}getResponsePromise(t,o){return new Promise((i,r)=>{var a,n;let c,h=(a=t,n=o,`${a}|${n}`);function u(){clearTimeout(c),c=void 0,this._pendingHandlers.delete(h)}c=setTimeout(()=>{u.call(this),r(Error(`Timed out waiting for completion of ${h}`))},(tK.isDebugging?60:5)*6e4),this._pendingHandlers.set(h,t=>{if(u.call(this),t.method===tz.method){let o=t.params;"rejected"===o.status?queueMicrotask(()=>r(Error(o.reason))):queueMicrotask(()=>i(o.value))}else queueMicrotask(()=>i(t.params))})})}setPersistedState(t){this._api.setState(t)}updatePersistedState(t){let o=this._api.getState();null!=o&&"object"==typeof o?(o={...o,...t},this._api.setState(o)):o=t,this.setPersistedState(o)}postMessage(t){this._api.postMessage(t)}};function o8(t,o){let i=Math.pow(10,o);return Math.round(t*i)/i}o0([oW({args:t=>({e:`${t.data.id}|${t.data.method}`})})],o6.prototype,"onMessageReceived",1),o0([oW({args:t=>({commandType:t.method})})],o6.prototype,"sendCommand",1),o0([oW({args:t=>({requestType:t.method})})],o6.prototype,"sendRequest",1),o0([oW({args:t=>({e:`${t.id}, method=${t.method}`})})],o6.prototype,"postMessage",1),o6=o0([(eP=t=>`${t.appName}(HostIpc)`,t=>void tY.set(t,eP))],o6);let RGBA=class RGBA{constructor(t,o,i,r=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,t)),this.g=0|Math.min(255,Math.max(0,o)),this.b=0|Math.min(255,Math.max(0,i)),this.a=o8(Math.max(Math.min(1,r),0),3)}static equals(t,o){return t.r===o.r&&t.g===o.g&&t.b===o.b&&t.a===o.a}};let HSLA=class HSLA{constructor(t,o,i,r){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=o8(Math.max(Math.min(1,o),0),3),this.l=o8(Math.max(Math.min(1,i),0),3),this.a=o8(Math.max(Math.min(1,r),0),3)}static equals(t,o){return t.h===o.h&&t.s===o.s&&t.l===o.l&&t.a===o.a}static fromRGBA(t){let o=t.r/255,i=t.g/255,r=t.b/255,a=t.a,n=Math.max(o,i,r),c=Math.min(o,i,r),h=0,u=0,p=(c+n)/2,m=n-c;if(m>0){switch(u=Math.min(p<=.5?m/(2*p):m/(2-2*p),1),n){case o:h=(i-r)/m+6*(i<r);break;case i:h=(r-o)/m+2;break;case r:h=(o-i)/m+4}h*=60,h=Math.round(h)}return new HSLA(h,u,p,a)}static _hue2rgb(t,o,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?t+(o-t)*6*i:i<.5?o:i<2/3?t+(o-t)*(2/3-i)*6:t}static toRGBA(t){let o,i,r,a=t.h/360,{s:n,l:c,a:h}=t;if(0===n)o=i=r=c;else{let t=c<.5?c*(1+n):c+n-c*n,h=2*c-t;o=HSLA._hue2rgb(h,t,a+1/3),i=HSLA._hue2rgb(h,t,a),r=HSLA._hue2rgb(h,t,a-1/3)}return new RGBA(Math.round(255*o),Math.round(255*i),Math.round(255*r),h)}};let HSVA=class HSVA{constructor(t,o,i,r){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=o8(Math.max(Math.min(1,o),0),3),this.v=o8(Math.max(Math.min(1,i),0),3),this.a=o8(Math.max(Math.min(1,r),0),3)}static equals(t,o){return t.h===o.h&&t.s===o.s&&t.v===o.v&&t.a===o.a}static fromRGBA(t){let o=t.r/255,i=t.g/255,r=t.b/255,a=Math.max(o,i,r),n=a-Math.min(o,i,r);return new HSVA(Math.round(60*(0===n?0:a===o?((i-r)/n%6+6)%6:a===i?(r-o)/n+2:(o-i)/n+4)),0===a?0:n/a,a,t.a)}static toRGBA(t){let{h:o,s:i,v:r,a}=t,n=r*i,c=n*(1-Math.abs(o/60%2-1)),h=r-n,[u,p,m]=[0,0,0];return o<60?(u=n,p=c):o<120?(u=c,p=n):o<180?(p=n,m=c):o<240?(p=c,m=n):o<300?(u=c,m=n):o<=360&&(u=n,m=c),new RGBA(u=Math.round((u+h)*255),p=Math.round((p+h)*255),m=Math.round((m+h)*255),a)}};function o7(t,o){return o.getPropertyValue(t).trim()}let Color=class Color{static from(t){return t instanceof Color?t:parseColor(t)||Color.red}static fromCssVariable(t,o){return parseColor(o7(t,o))||Color.red}static fromHex(t){return parseHexColor(t)||Color.red}static equals(t,o){return!t&&!o||!!t&&!!o&&t.equals(o)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(t){if(t)if(t instanceof RGBA)this.rgba=t;else if(t instanceof HSLA)this._hsla=t,this.rgba=HSLA.toRGBA(t);else if(t instanceof HSVA)this._hsva=t,this.rgba=HSVA.toRGBA(t);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(t){return null!=t&&!!t&&RGBA.equals(this.rgba,t.rgba)&&HSLA.equals(this.hsla,t.hsla)&&HSVA.equals(this.hsva,t.hsva)}getRelativeLuminance(){return o8(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(t){let o=t/255;return o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4)}luminance(t){return luminance(this,t)}getContrastRatio(t){let o=this.getRelativeLuminance(),i=t.getRelativeLuminance();return o>i?(o+.05)/(i+.05):(i+.05)/(o+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(t){return this.getRelativeLuminance()>t.getRelativeLuminance()}isDarkerThan(t){return this.getRelativeLuminance()<t.getRelativeLuminance()}lighten(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*t,this.hsla.a))}darken(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*t,this.hsla.a))}transparent(t){let{r:o,g:i,b:r,a}=this.rgba;return new Color(new RGBA(o,i,r,a*t))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(t){let o=t.rgba,i=this.rgba.a,r=o.a,a=i+r*(1-i);return a<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*i/a+o.r*r*(1-i)/a,this.rgba.g*i/a+o.g*r*(1-i)/a,this.rgba.b*i/a+o.b*r*(1-i)/a,a))}mix(t,o){return mixColors(this,t,o)}makeOpaque(t){if(this.isOpaque()||1!==t.rgba.a)return this;let{r:o,g:i,b:r,a}=this.rgba;return new Color(new RGBA(t.rgba.r-a*(t.rgba.r-o),t.rgba.g-a*(t.rgba.g-i),t.rgba.b-a*(t.rgba.b-r),1))}flatten(...t){let o=t.reduceRight((t,o)=>Color._flatten(o,t));return Color._flatten(this,o)}static _flatten(t,o){let i=1-t.rgba.a;return new Color(new RGBA(i*o.rgba.r+t.rgba.a*t.rgba.r,i*o.rgba.g+t.rgba.a*t.rgba.g,i*o.rgba.b+t.rgba.a*t.rgba.b))}toString(){return this._toString||(this._toString=function(t){return t.isOpaque()?`#${o9(t.rgba.r)}${o9(t.rgba.g)}${o9(t.rgba.b)}`:`rgba(${t.rgba.r}, ${t.rgba.g}, ${t.rgba.b}, ${Number(t.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(t,o,i){if(t.isLighterThan(o))return t;i=i||.5;let r=t.getRelativeLuminance(),a=o.getRelativeLuminance();return i=i*(a-r)/a,t.lighten(i)}static getDarkerColor(t,o,i){if(t.isDarkerThan(o))return t;i=i||.5;let r=t.getRelativeLuminance(),a=o.getRelativeLuminance();return i=i*(r-a)/r,t.darken(i)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function o9(t){let o=t.toString(16);return 2!==o.length?`0${o}`:o}let ie=new Emitter,it=ie.event;function io(t){let o=document.documentElement,i=window.getComputedStyle(o),r=document.body.classList,a=r.contains("vscode-light")||r.contains("vscode-high-contrast-light"),n=r.contains("vscode-high-contrast")||r.contains("vscode-high-contrast-light"),c=o7("--vscode-editor-background",i),h=o7("--vscode-editor-foreground",i);return h||(h=o7("--vscode-foreground",i)),{colors:{background:c,foreground:h},computedStyle:i,isLightTheme:a,isHighContrastTheme:n,isInitializing:null==t}}var ii=Object.defineProperty,ir=Object.getOwnPropertyDescriptor,ia=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?ir(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&ii(o,i,n),n};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(t){let o=JSON.parse(t_.decode(function(t){let o=globalThis.atob(t),i=o.length,r=new Uint8Array(i),a=0,n=i-i%8;for(;a<n;a+=8)r[a]=o.charCodeAt(a),r[a+1]=o.charCodeAt(a+1),r[a+2]=o.charCodeAt(a+2),r[a+3]=o.charCodeAt(a+3),r[a+4]=o.charCodeAt(a+4),r[a+5]=o.charCodeAt(a+5),r[a+6]=o.charCodeAt(a+6),r[a+7]=o.charCodeAt(a+7);for(;a<i;a++)r[a]=o.charCodeAt(a);return r}(t))),i=o.webviewId,r=o.webviewInstanceId;this._webview={webviewId:i,webviewInstanceId:r,createCommandLink:(t,o)=>{var a;return t.endsWith(":")&&(t=`${t}${i.split(".").at(-1)}`),a=t,`command:${a}?${encodeURIComponent(JSON.stringify({webview:i,webviewInstance:r,...o}))}`}}}connectedCallback(){let t,o,i,r,a;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new o6(this.name),this.disposables.push(((t=new MutationObserver(t=>{ie.fire(io(t))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>t.disconnect()})),null!=this.onThemeUpdated&&(this.onThemeUpdated(io()),this.disposables.push(it(this.onThemeUpdated,this))),this.disposables.push(this._ipc.onReceiveMessage(t=>{switch(!0){case tE.is(t):this.onWebviewFocusChanged?.(t.params.focused),window.dispatchEvent(new CustomEvent(t.params.focused?"webview-focus":"webview-blur"));break;case tR.is(t):this.onWebviewVisibilityChanged?.(t.params.visible),window.dispatchEvent(new CustomEvent(t.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(r=0,a=os(t=>{let o=`webview:${++r}`,i=document.hasFocus();t.focused=i,i||(t.inputFocused=!1),o1().postMessage({id:o,scope:tS.scope,method:tS.method,params:t,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:t=>{let r=t.composedPath().some(t=>"INPUT"===t.tagName);(!0!==o||i!==r)&&(o=!0,i=r,a({focused:!0,inputFocused:r}))},onFocusOut:t=>{a({focused:!1,inputFocused:!1})}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(t=>{t.href===t.title&&t.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(t=>t.dispose())}render(){return ed`<slot></slot>`}};ia([e$({type:String})],GlWebviewApp.prototype,"name",2),ia([e$({type:String})],GlWebviewApp.prototype,"placement",2),ia([u({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),ia([u({context:"logger"})],GlWebviewApp.prototype,"_logger",2),ia([u({context:"promos"})],GlWebviewApp.prototype,"_promos",2),ia([u({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),ia([u({context:"webview"})],GlWebviewApp.prototype,"_webview",2);let is=ts(GlWebviewApp);let SignalWatcherWebviewApp=class SignalWatcherWebviewApp extends is{connectedCallback(){super.connectedCallback?.(),this._ipc.sendRequest(t$,{bootstrap:!1,clientId:o3,clientLoadedAt:o5})}};let VsCodeStorage=class VsCodeStorage{constructor(){this._api=o1()}get(){return this._api.getState()}set(t){this._api.setState(t)}};function il(){return{storage:new VsCodeStorage,createEndpoint:()=>{let t,o;return t=o1(),o=new Map,{postMessage:function(o,i){let r={[oH]:!0,payload:oK.encode(JSON.stringify(o))};t.postMessage(r)},addEventListener:function(t,i){if("message"!==t)return;let r=t=>{let o=t.data;if(!oG(o))return;let{payload:r}=o;i(new MessageEvent("message",{data:r instanceof Uint8Array||r instanceof ArrayBuffer?JSON.parse(oY.decode(r)):r,origin:t.origin,lastEventId:t.lastEventId,source:t.source,ports:[...t.ports]}))};o.set(i,r),window.addEventListener("message",r)},removeEventListener:function(t,i){if("message"!==t)return;let r=o.get(i);r&&(window.removeEventListener("message",r),o.delete(i))},dispose:function(){for(let t of o.values())window.removeEventListener("message",t);o.clear()}}}}}function ic(t){return null!=t&&"object"==typeof t&&(t instanceof Error||"string"==typeof t.name&&"string"==typeof t.message)}function id(t){return t.stack??`${t.name}: ${t.message}`}let ih=Symbol(),iu=Symbol(),ip=()=>{},im=Symbol(),ig=Symbol();function ib(t){if(t instanceof Error){let o={name:t.name,message:t.message};return void 0!==t.stack&&(o.stack=t.stack),o}return{name:"Error",message:String(t)}}function iv(t){let o=Error(t.message);return o.name=t.name,o.stack=t.stack,o}Symbol(),new WeakMap;let NonCloneableError=class NonCloneableError extends Error{valueType;path;constructor(t,o){super(`The nested ${t} at "${o}" cannot be cloned. Use nestedProxies: true.`),this.valueType=t,this.path=o,this.name="NonCloneableError"}};let Connection=class Connection{#a;#n;#s;#l;#c;#d=new Map;#h=0;#u=1;#p=!1;#m=new Map;#g=new WeakMap;#b=new Map;#f=new WeakMap;#v;#w=0;#y=new Map;#k=new Map;#x;#C=[];#_=!1;constructor(t,o={}){for(let i of(this.#a=t,this.#n=o.nestedProxies??!1,this.#s=o.debug??!1,this.#l=o.logger,this.#c=o.handlers??[],this.#x=o.batching??!1,this.#c))this.#d.set(i.wireType,i),"function"==typeof i.connect&&i.connect({sendMessage:t=>{this.#$(i.wireType,t)}});this.#v=new FinalizationRegistry(({id:t,session:o})=>{o===this.#w&&(this.#b.delete(t),this.#S({type:"release",id:t}))}),t.addEventListener("message",this.#L)}#S(t,o){if(!this.#p){if(!this.#x)return void this.#a.postMessage(t,o);this.#C.push({message:t,transfers:o}),this.#_||(this.#_=!0,queueMicrotask(()=>this.#A()))}}#A(){this.#_=!1;let t=this.#C;if(this.#C=[],0===t.length)return;let o=o=>{let i=o instanceof Error?o:Error(String(o));for(let{message:o}of t)if("call"===o.type&&void 0!==o.id){let t=this.#y.get(o.id);t&&(this.#y.delete(o.id),t.reject(i))}};if(1===t.length){let{message:i,transfers:r}=t[0];try{this.#a.postMessage(i,r)}catch(t){o(t)}}else{let i=[],r=[];for(let{message:o,transfers:a}of t)r.push(o),a&&i.push(...a);try{this.#a.postMessage({type:"batch",messages:r},i.length>0?i:void 0)}catch(t){o(t)}}}#$(t,o){let i=[];this.#S({type:"handler",wireType:t,payload:this.#z(o,"",i)},i)}#E(){let t=this.#h;return this.#h+=this.#u,t}expose(t){this.#u=2,this.#R(t),this.#S({type:"return",id:0,value:this.#P(t)})}#I(t){this.#C=[],this.#_=!1;let o=Error(t);for(let{reject:t}of this.#y.values())t(o);for(let{reject:t}of(this.#y.clear(),this.#k.values()))t(o);this.#k.clear()}close(){for(let t of(this.#p=!0,this.#I("Connection closed"),this.#a.removeEventListener("message",this.#L),this.#c))t.disconnect?.()}reset(t){for(let t of(this.#I("Connection reset"),this.#m.clear(),this.#g=new WeakMap,this.#b.clear(),this.#f=new WeakMap,this.#w++,this.#h=0,this.#u=1,this.#c))t.disconnect?.();for(let o of(void 0!==t&&t!==this.#a?(this.#p||this.#a.removeEventListener("message",this.#L),this.#a=t,t.addEventListener("message",this.#L)):this.#p&&this.#a.addEventListener("message",this.#L),this.#p=!1,this.#c))"function"==typeof o.connect&&o.connect({sendMessage:t=>{this.#$(o.wireType,t)}})}#M(t){if(t!==this.#w)throw Error("Stale proxy from previous session")}waitForReady(){return this.#h=1,this.#u=2,new Promise((t,o)=>{this.#y.set(0,{resolve:t,reject:o})})}#R(t){let o=this.#g.get(t);return void 0!==o||(o=this.#E(),this.#m.set(o,t),this.#g.set(t,o)),o}#O(t){return this.#m.get(t)}#T(t){return this.#b.get(t)?.deref()}#D(t){return this.#f.get(t)}#z(t,o,i){return"object"==typeof t?.[im]?{__st__:"property",...t[im]}:this.#B(t,o,i,new Map)}#P(t,o=!1){return{__st__:"proxy",id:this.#D(t)??this.#R(t),o:o}}#B(t,o,i,r,a){if(null==t||"object"!=typeof t&&"function"!=typeof t)return t;let n=r.get(t);if(void 0!==n)return n;if(t?.[iu]===!0){if(o&&this.#s&&!this.#n)throw new NonCloneableError("transfer",o);return i.includes(t.value)||i.push(t.value),r.set(t,t.value),t.value}if(t?.[ih]!==void 0){if(o&&this.#s&&!this.#n)throw new NonCloneableError("proxy",o);let i=this.#P(t[ih],t?.[ig]==="handle");return r.set(t,i),i}if("function"==typeof t){if(o&&this.#s&&!this.#n)throw new NonCloneableError("function",o);let i=this.#P(t);return r.set(t,i),i}if(void 0!==this.#D(t)){let o=this.#P(t,"__o"in t);return r.set(t,o),o}if("function"==typeof t?.then){if(o&&this.#s&&!this.#n)throw new NonCloneableError("promise",o);let i={__st__:"promise",id:this.#F(t)};return r.set(t,i),i}if(this.#c.length>0){for(let n of this.#c)if(n.canHandle(t)){let c={toWire:(t,n)=>{let c=n?o?`${o}.${n}`:n:o;return this.#B(t,c,i,r,a)},...void 0!==a&&{callId:a}},h=n.toWire(t,c);return r.set(t,h),h}}if(!(this.#n||this.#s))return t;if(Array.isArray(t)){let n=[];r.set(t,n);for(let c=0;c<t.length;c++)n.push(this.#B(t[c],`${o}[${String(c)}]`,i,r,a));return n}let c=Object.getPrototypeOf(t);if(c===Object.prototype||null===c){let n={};for(let c of(r.set(t,n),Object.keys(t)))n[c]=this.#B(t[c],o?`${o}.${c}`:c,i,r,a);return n}return t}#q(t){return{fromWire:o=>this.#V(o,t)}}#W(t){let o=t?.__st__;if("property"===o){let o=this.#O(t.targetProxyId);if(!o)throw ReferenceError(`Proxy property target ${String(t.targetProxyId)} not found`);return o[t.property]}if("thrown"===o)throw iv(t.error);return this.#V(t,new Map)}#V(t,o){if(null===t||"object"!=typeof t)return t;let i=o.get(t);if(void 0!==i)return i;if(t?.__st__==="proxy"){let i=this.#O(t.id);if(i){let r=t.o?{[ih]:i,[ig]:"handle",__nc:ip}:new Proxy(ip,{get:(t,o)=>{var r,a,n;let c;return o===ih?i:o===ig?"proxy":"then"!==o?(r=i,a=o,n=i[o],(c=(...t)=>{if("function"==typeof n)return Promise.resolve(n.apply(r,t));throw TypeError(`${String(a)} is not a function`)}).then=(t,o)=>Promise.resolve(n).then(t,o),c):void 0},set:(t,o,r)=>(i[o]=r,!0),apply(t,o,r){if("function"==typeof i)return Promise.resolve(i(...r));throw TypeError("Proxy target is not callable")}});return o.set(t,r),r}let r=this.#T(t.id)??this.#j(t.id,t.o);return o.set(t,r),r}if(t?.__st__==="promise"){let{promise:i,resolve:r,reject:a}=Promise.withResolvers();return this.#k.set(t.id,{resolve:r,reject:a}),o.set(t,i),i}let r=t.__st__;if("string"==typeof r){let i=this.#d.get(r);if(i?.fromWire){let r=i.fromWire(t,this.#q(o));return o.set(t,r),r}}if(!this.#n)return t;if(Array.isArray(t)){let i=[];for(let r of(o.set(t,i),t))i.push(this.#V(r,o));return i}if(Object.getPrototypeOf(t)!==Object.prototype)return t;let a={};for(let i of(o.set(t,a),Object.keys(t)))a[i]=this.#V(t[i],o);return a}#F(t){let o=this.#E();return t.then(t=>{try{let i=[],r=this.#z(t,"",i);this.#S({type:"resolve",id:o,value:r},i)}catch{this.#S({type:"reject",id:o,error:ib(Error("Failed to serialize resolved promise value"))})}},t=>{try{this.#S({type:"reject",id:o,error:ib(t)})}catch{}}),o}#j(t,o){let i=this.#T(t);if(void 0===i){let r=this.#w;i=o?{__o:ip}:new Proxy(ip,{apply:(o,i,a)=>(this.#M(r),this.#U(t,void 0,a)),get:(o,i)=>"string"==typeof i&&"then"!==i?this.#N(t,i,r):void 0,set:(o,i,a)=>{if("string"!=typeof i)return!1;this.#M(r);let n=[];return this.#H(this.#E(),t,"set",i,[this.#z(a,"",n)],n).catch(()=>{}),!0}}),this.#b.set(t,new WeakRef(i)),this.#f.set(i,t),this.#v.register(i,{id:t,session:this.#w})}return i}#N(t,o,i){let r=(...r)=>(this.#M(i),this.#U(t,o,r));return r.then=(r,a)=>(this.#M(i),this.#H(this.#E(),t,"get",o,[],[]).then(r,a)),r[im]={targetProxyId:t,property:o},r}#H(t,o,i,r,a,n){let{promise:c,resolve:h,reject:u}=Promise.withResolvers();this.#y.set(t,{resolve:h,reject:u});try{this.#S({type:"call",id:t,target:o,action:i,method:r,args:a},n)}catch(o){this.#y.delete(t),u(o instanceof Error?o:Error(String(o)))}return c}#U(t,o,i){let r=[],a=new Map,n=this.#E();return this.#H(n,t,"call",o,i.map(t=>this.#B(t,"",r,a,n)),r)}#L=t=>{let o=t.data;if(null!=o)if("batch"===o.type)for(let t of o.messages)this.#G(t);else this.#G(o)};#G(t){switch(t.type){case"release":{let o=this.#m.get(t.id);void 0!==o&&(this.#m.delete(t.id),this.#g.delete(o));break}case"resolve":this.#K(this.#k,t.id,t.value);break;case"reject":this.#Y(this.#k,t.id,t.error);break;case"return":this.#K(this.#y,t.id,t.value),this.#X(t.id);break;case"throw":this.#Y(this.#y,t.id,t.error),this.#X(t.id);break;case"call":this.#J(t);break;case"handler":this.#Z(t.wireType,t.payload)}}#K(t,o,i){let r=t.get(o);if(r){t.delete(o);try{r.resolve(this.#W(i))}catch(t){r.reject(t instanceof Error?t:Error(String(t)))}}}#Y(t,o,i){let r=t.get(o);r&&(t.delete(o),r.reject(iv(i)))}#X(t){for(let o of this.#c)o.onCallSettle?.(t)}#Z(t,o){try{let i=this.#d.get(t);if(i?.onMessage){let t=new Map;i.onMessage(this.#V(o,t),this.#q(t))}}catch(o){this.#l?.error?.(`Error in handler.onMessage for wireType "${t}":`,o)}}async #J(t){let{id:o,target:i,method:r,args:a,action:n}=t,c=new Map,h=a.map(t=>this.#V(t,c)),u=this.#O(i);if(!u)return this.#S({type:"throw",id:o,error:{name:"ReferenceError",message:`Proxy target ${String(i)} not found`}});let p=this.#l,m=p?.debug?performance.now():0;try{let t;if("get"===n){if(void 0===r)throw TypeError("Property name required for get action");t=u[r]}else if("set"===n){if(void 0===r)throw TypeError("Property name required for set action");u[r]=h[0],t=void 0}else if(void 0===r){if("function"!=typeof u)throw TypeError("Target is not callable");t=await u(...h)}else{let o=u[r];if("function"!=typeof o)throw TypeError(`${r} is not a function`);t=await o.apply(u,h)}let i=[],a=this.#z(t,"",i);this.#S({type:"return",id:o,value:a},i),p?.debug?.(`${n} ${r??"(direct)"} completed`,{duration:performance.now()-m})}catch(t){p?.debug?.(`${n} ${r??"(direct)"} failed`,{duration:performance.now()-m,error:t}),this.#S({type:"throw",id:o,error:ib(t)})}}};let RemoteSignal=class RemoteSignal{#Q;#ee;#et;constructor(t,o,i){this.#ee=t,this.#et=i,this.#Q=new eO.State(o,{[eO.subtle.watched]:()=>{this.#et?.(this.#ee,!0)},[eO.subtle.unwatched]:()=>{this.#et?.(this.#ee,!1)}})}get(){return this.#Q.get()}set(t){throw Error("RemoteSignal is read-only. The signal can only be modified on the sender side.")}get signalId(){return this.#ee}_update(t){this.#Q.set(t)}};let SignalHandler=class SignalHandler{wireType="signal";#eo;#ei;#er=0;#ea=1;#en=new Map;#es=new WeakMap;#el;#_=!1;#ec=new Map;#ed=new Map;#eh=new Map;#eu=new Map;#v=new FinalizationRegistry(({signalId:t,session:o})=>{o===this.#er&&(this.#eh.delete(t),this.#ei?.sendMessage({type:"signal:release",signalId:t}))});constructor(t={}){this.#eo=t.autoWatch??!1}connect(t){this.#ei=t}onMessage(t){(null!==t&&"object"==typeof t&&"type"in t?"signal:batch"!==t.type:1)?(null!==t&&"object"==typeof t&&"type"in t?"signal:release"!==t.type:1)?(null!==t&&"object"==typeof t&&"type"in t?"signal:watch"!==t.type:1)?null!==t&&"object"==typeof t&&"type"in t&&"signal:unwatch"===t.type&&this.#ep(t.signalId):this.#em(t.signalId):this.releaseSignal(t.signalId):this.#eg(t)}disconnect(){this.#ei=void 0,this.#_=!1,void 0!==this.#el&&(this.#el.unwatch(...this.#ec.values()),this.#el=void 0),this.#en.clear(),this.#ec.clear(),this.#ed.clear(),this.#eh.clear(),this.#eu.clear(),this.#er++,this.#es=new WeakMap,this.#ea=1}canHandle(t){return t instanceof eO.State||t instanceof eO.Computed}toWire(t,o){return this.#eb(t,o)}fromWire(t,o){return this.#ef(t,o)}#eb(t,o){let i=this.#es.get(t);return void 0===i&&(i=this.#ea++,this.#en.set(i,t),this.#es.set(t,i),this.#eo&&this.#em(i)),{__st__:"signal",signalId:i,value:o.toWire(t.get())}}#ef(t,o){let i=o.fromWire(t.value),r=this.#eh.get(t.signalId),a=r?.deref();if(void 0!==a)return a._update(i),a;let n=this.#eu.get(t.signalId);this.#eu.delete(t.signalId);let c=new RemoteSignal(t.signalId,void 0!==n?n:i,this.#ev);return this.#eh.set(t.signalId,new WeakRef(c)),this.#v.register(c,{signalId:t.signalId,session:this.#er}),c}#ev=(t,o)=>{void 0!==this.#ei&&(o?this.#ei.sendMessage({type:"signal:watch",signalId:t}):this.#ei.sendMessage({type:"signal:unwatch",signalId:t}))};#em(t){if(this.#ec.has(t))return;let o=this.#en.get(t);if(void 0===o)return;let i=this.#ew(),r=new eO.Computed(()=>o.get());this.#ec.set(t,r),this.#ed.set(r,t),i.watch(r);let a=r.get();this.#ei?.sendMessage({type:"signal:batch",updates:[{signalId:t,value:a}]})}#ep(t){let o=this.#ec.get(t);void 0!==o&&(this.#el?.unwatch(o),this.#ec.delete(t),this.#ed.delete(o))}#ew(){return this.#el??=new eO.subtle.Watcher(()=>{this.#_||(this.#_=!0,queueMicrotask(this.#A))})}#A=()=>{if(this.#_=!1,void 0===this.#el||void 0===this.#ei)return;let t=this.#el.getPending(),o=[];for(let i of t){let t=this.#ed.get(i);if(void 0!==t&&this.#en.has(t)){let r=i.get();o.push({signalId:t,value:r})}}this.#el.watch(),o.length>0&&this.#ei.sendMessage({type:"signal:batch",updates:o})};#eg(t){for(let o of t.updates){let t=this.#eh.get(o.signalId),i=t?.deref();void 0!==i?i._update(o.value):this.#eu.set(o.signalId,o.value)}}releaseSignal(t){let o=this.#ec.get(t);void 0!==o&&(this.#el?.unwatch(o),this.#ec.delete(t),this.#ed.delete(o)),this.#en.delete(t)}get _sentSignalCount(){return this.#en.size}get _remoteSignalCount(){return this.#eh.size}_isWatching(t){return this.#ec.has(t)}};let iw="abort-signal";let AbortSignalHandler=class AbortSignalHandler{wireType=iw;#ei;#er=0;#h=1;#es=new WeakMap;#en=new Map;#ey=new Map;#ek=new FinalizationRegistry(({id:t,session:o})=>{o!==this.#er||this.#ey.has(t)&&(this.#ey.delete(t),this.#en.delete(t),this.#ei?.sendMessage({type:"release",id:t}))});#ex=new Map;canHandle(t){return t instanceof AbortSignal}toWire(t,o){if(t.aborted)return{__st__:iw,id:0,aborted:!0,reason:t.reason};let i=this.#es.get(t);if(void 0!==i)return{__st__:iw,id:i,aborted:!1};i=this.#h++,this.#es.set(t,i),this.#en.set(i,new WeakRef(t)),this.#ek.register(t,{id:i,session:this.#er},t);let r=new WeakRef(t),a=i,n=()=>{let t=r.deref(),o=t?.reason;"completed"===o?this.#ei?.sendMessage({type:"release",id:a}):this.#ei?.sendMessage({type:"abort",id:a,reason:o}),void 0!==t&&this.#ek.unregister(t),this.#eC(a)};return t.addEventListener("abort",n,{once:!0}),this.#ey.set(i,n),{__st__:iw,id:i,aborted:!1}}fromWire(t){if(t.aborted)return AbortSignal.abort(t.reason);let o=this.#ex.get(t.id);if(void 0!==o)return o.signal;let i=new AbortController;return this.#ex.set(t.id,i),i.signal}connect(t){this.#ei=t}onMessage(t){"abort"===t.type?(this.#ex.get(t.id)?.abort(t.reason),this.#ex.delete(t.id)):"release"===t.type&&this.#ex.delete(t.id)}disconnect(){for(let t of(this.#ei=void 0,this.#ex.values()))t.abort("disconnected");for(let[t,o]of(this.#ex.clear(),this.#ey)){let i=this.#en.get(t)?.deref();void 0!==i&&(i.removeEventListener("abort",o),this.#ek.unregister(i))}this.#ey.clear(),this.#en.clear(),this.#er++,this.#es=new WeakMap,this.#h=1}#eC(t){this.#ey.delete(t),this.#en.delete(t)}get _sentCount(){return this.#en.size}get _receivedCount(){return this.#ex.size}};let iy="st-error";function ik(t){return null!=t&&"object"==typeof t&&t.__st__===iy}function ix(t){if(null==t||"object"!=typeof t)return t;if(t instanceof Error||"string"==typeof t.name&&"string"==typeof t.message){let o={__st__:iy,name:t.name,message:t.message};return"string"==typeof t.stack&&(o.stack=t.stack),o}return t}function iC(t){if(!ik(t))return t;if("AbortError"===t.name&&"u">typeof DOMException)return new DOMException(t.message,"AbortError");let o=Error(t.message);return o.name=t.name,void 0!==t.stack&&(o.stack=t.stack),o}function i_(t){return null!=t&&"object"==typeof t&&"abort"===t.type}let GlAbortSignalHandler=class GlAbortSignalHandler extends AbortSignalHandler{toWire(t,o){let i=super.toWire(t,o);return i.aborted&&void 0!==i.reason&&(i.reason=ix(i.reason)),i}fromWire(t){return t.aborted&&ik(t.reason)&&(t={...t,reason:iC(t.reason)}),super.fromWire(t)}connect(t){super.connect({sendMessage:o=>{i_(o)&&void 0!==o.reason&&(o.reason=ix(o.reason)),t.sendMessage(o)}})}onMessage(t){i_(t)&&ik(t.reason)&&(t.reason=iC(t.reason)),super.onMessage(t)}};let i$="__st__",iS=[{wireType:"date",canHandle:function(t){return t instanceof Date},toWire:function(t){return{[i$]:"date",value:t.getTime()}},fromWire:function(t){return new Date(t.value)}},{wireType:"map",canHandle:function(t){return t instanceof Map},toWire:function(t,o){let i=[];for(let[r,a]of t)i.push([o.toWire(r),o.toWire(a)]);return{[i$]:"map",entries:i}},fromWire:function(t,o){let i=new Map;for(let r of t.entries){let[t,a]=r;i.set(o.fromWire(t),o.fromWire(a))}return i}},{wireType:"set",canHandle:function(t){return t instanceof Set},toWire:function(t,o){let i=[];for(let r of t)i.push(o.toWire(r));return{[i$]:"set",values:i}},fromWire:function(t,o){let i=new Set;for(let r of t.values)i.add(o.fromWire(r));return i}},{wireType:"regexp",canHandle:function(t){return t instanceof RegExp},toWire:function(t){return{[i$]:"regexp",source:t.source,flags:t.flags}},fromWire:function(t){return new RegExp(t.source,t.flags)}}];function iL(t){return"string"==typeof t[0]?[t[0],t.slice(1)]:[t.map(String).join(" "),[]]}function iA(t){return t.map(t=>{let o;if(ic(t))return id(t);if(null==t||"object"!=typeof t||Array.isArray(t))return t;for(let[i,r]of Object.entries(t))ic(r)&&((o??={...t})[i]=id(r));return o??t})}function iz(t){let o=`[RPC:${t}]`;return{debug:(...t)=>{let[i,r]=iL(t);tK.debug(`${o} ${i}`,...iA(r))},warn:(...t)=>{let[i,r]=iL(t);tK.warn(`${o} ${i}`,...iA(r))},error:(...t)=>{let[i,r]=iL(t),a=function(t){for(let o of t){if(ic(o))return o;if(null!=o&&"object"==typeof o&&!Array.isArray(o)){for(let t of Object.values(o))if(ic(t))return t}}}(r);tK.error(a,`${o} ${i}`)}}}async function iE(t){let o,i,r="function"==typeof t?.webviewId?t.webviewId():t?.webviewId,a="function"==typeof t?.webviewInstanceId?t.webviewInstanceId():t?.webviewInstanceId,c=null==r&&null==a?"?":null==a?r:`${r??"?"}|${a}`,h=`RpcClient(${c})`,u=t?.endpoint?.()??(n??=il()).createEndpoint(),p=new Connection(u,{handlers:[...iS,new SignalHandler({autoWatch:t?.autoWatchSignals}),new GlAbortSignalHandler,...t?.handlers??[]],nestedProxies:t?.nestedProxies??!0,debug:t?.debug,batching:!0,logger:iz(`client(${c})`)}),m=t?.timeout??6e4,g=[],b=()=>{for(let t of g)clearTimeout(t);g.length=0,null!=o&&(clearTimeout(o),o=void 0),null!=i&&(t?.signal?.removeEventListener("abort",i),i=void 0)},f=()=>{b(),p.close(),u.dispose()},v=()=>{let o=t?.signal?.reason;return o instanceof Error?o:Error("RPC connection aborted")};try{let r;if(t?.signal?.aborted)throw v();tK.debug(`${h}: Connecting to host...`),2e4<m&&g.push(setTimeout(()=>tK.warn(`${h}: Connection still pending after 20000ms`),2e4)),4e4<m&&g.push(setTimeout(()=>tK.warn(`${h}: Connection still pending after 40000ms \u2014 peer may be stuck`),4e4));let a=await Promise.race([p.waitForReady(),new Promise((t,i)=>o=setTimeout(()=>i(Error(`RPC connection timed out after ${m}ms`)),m)),...t?.signal!=null?[new Promise((o,r)=>{i=()=>r(v()),t.signal.addEventListener("abort",i,{once:!0})})]:[]]);return b(),tK.debug(`${h}: Connected to host successfully`),{services:(r=new Map,new Proxy(a,{get:function(t,o,i){if(r.has(o))return r.get(o);let a=Reflect.get(t,o,i);if("function"==typeof a||null==a||"object"!=typeof a||"function"!=typeof a.then)return a;let n=Promise.resolve(a);return r.set(o,n),n}})),dispose:()=>{tK.debug(`${h}: Disposing connection...`),f()}}}catch(t){throw f(),tK.error(t,`${h}: Failed to connect to host`),t}}iz("?");let iR=new DOMException("rpc reconnect: host reconnected","AbortError"),iP=new DOMException("rpc disconnect: host disconnected","AbortError");let RpcController=class RpcController{constructor(t,o){this.host=t,this.options=o,t.addController(this)}get services(){return this._services}hostConnected(){null!=this._connectionAbort&&this._connectionAbort.abort(iR),this._connectionAbort=new AbortController,this._connect(this._connectionAbort.signal)}hostDisconnected(){this._connectionAbort?.abort(iP),this._connectionAbort=void 0,this._disposeRpc?.(),this._disposeRpc=void 0,this._services=void 0}async _connect(t){try{let{services:o,dispose:i}=await iE({...this.options?.rpcOptions,signal:t});if(t.aborted)return void i();if(this._services=o,this._disposeRpc=i,this.options?.onReady!=null)try{await this.options.onReady(o)}catch(t){throw i(),this._disposeRpc=void 0,this._services=void 0,t}}catch(h){if(t.aborted)return;let o=function(t){if(t instanceof Error)return t;if(ic(t)){let o=Error(`${t.name}: ${t.message}`);return o.cause=t,o}return Error(String(t))}(h),i=this.options?.rpcOptions?.webviewId,r=this.options?.rpcOptions?.webviewInstanceId,a="function"==typeof i?i():i,n="function"==typeof r?r():r,c=null!=n?`${a??"?"}|${n}`:a??"?";tK.error(o,`RpcController(${c}): Failed to connect`),this.options?.onError!=null&&this.options.onError(o)}}};function iI(t,o){let i=!1;for(let r of t.trim().split("&")){let[t,a,n]=function(t){let[o,i,...r]=t.trim().split(/([=+!])/);return[o.trim(),void 0!==i?i.trim():"=",r.length?r.join("").trim():void 0]}(r);switch(a){case"=":{let r=o(t);(void 0===r||null===r&&"string"!=typeof n)&&(r=!1),i=void 0!==n?n===String(r):!!r;break}case"!":{let r=o(t);(void 0===r||null===r&&"string"!=typeof n)&&(r=!1),i=void 0!==n?n!==String(r):!r;break}case"+":if(void 0!==n){let r=o(t);i=void 0!==r&&r.includes(n)}}if(!i)break}return i}function iM(t,o,i){let r=o.split("."),a=r.length,n=a-1,c=-1,h=t;for(;null!=h&&++c<a;){let t=r[c],o=i;if(c!==n){let i=h[t];o="object"==typeof i?i:{}}h[t]=o,h=h[t]}return t}function iO(t){switch(t.kind){case"autolinks":return["autolinks"];case"ai":return["ai.model","ai.defaultAgent","gitkraken.mcp.autoEnabled"];case"integrations":case"info":return[];default:return[t.key]}}function iT(t){return t.replace(/\[([^\]]*)\]\([^)]*\)/g,"$1")}let iD=[{id:"current-line",settingsSearch:"gitlens.currentLine",name:"Inline Blame",group:"Annotations",icon:"eye",hint:"Adds an unobtrusive blame annotation at the end of the current line",master:{kind:"check",key:"currentLine.enabled",label:"Inline Blame",addSettingsOff:[["hovers.currentLine.over","line"]]},command:{label:"GitLens: Toggle Line Blame Annotations",command:"gitlens.toggleLineBlame"},learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#current-line-blame",preview:"blame",controls:[{kind:"check",key:"currentLine.pullRequests.enabled",label:"Show the Pull Request (if any) that introduced the commit",enabledWhen:"currentLine.enabled"},{kind:"info",text:"Requires a connection to a supported remote service (e.g. GitHub)",visibleWhen:"currentLine.pullRequests.enabled"},{kind:"text",key:"currentLine.format",label:"Annotation format",placeholder:"${author, }${agoOrDate}${' via 'pullRequest}${ • message|50?}",defaultValue:"${author, }${agoOrDate}${' via 'pullRequest}${ • message|50?}",preview:{type:"commit",default:"${author, }${agoOrDate}${' via 'pullRequest}${ • message|50?}"},tokens:!0,enabledWhen:"currentLine.enabled"},{kind:"check",key:"currentLine.useUncommittedChangesFormat",type:"custom",label:"Override format for uncommitted changes",enabledWhen:"currentLine.enabled"},{kind:"text",key:"currentLine.uncommittedChangesFormat",label:"Uncommitted changes format",placeholder:"format for uncommitted changes",defaultValue:"",preview:{type:"commit-uncommitted",default:""},tokens:!0,enabledWhen:"currentLine.enabled",visibleWhen:"currentLine.useUncommittedChangesFormat",indent:!0},{kind:"check",key:"currentLine.scrollable",label:"Include the annotation when scrolling the editor horizontally",hint:"When enabled the annotation can be scrolled into view when it is outside the viewport.",enabledWhen:"currentLine.enabled"},{kind:"info",text:"Setting this to false will inhibit the hovers from showing over the annotation; Set gitlens.hovers.currentLine.over to line to enable the hovers to show anywhere over the line."}]},{id:"code-lens",settingsSearch:"gitlens.codeLens",name:"Git CodeLens",group:"Annotations",icon:"gl-commit-horizontal",hint:"Adds authorship CodeLens to the top of files and on code blocks",master:{kind:"check",key:"codeLens.enabled",label:"Git CodeLens"},command:{label:"GitLens: Toggle Git CodeLens",command:"gitlens.toggleCodeLens"},learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#git-codelens",preview:"codelens",controls:[{kind:"check",key:"codeLens.recentChange.enabled",label:"Add the author and date of the most recent change for the file or code block",enabledWhen:"codeLens.enabled"},{kind:"check",key:"codeLens.recentChange.command",label:"When clicked",valueOn:"gitlens.showQuickCommitFileDetails",enabledWhen:"codeLens.enabled & codeLens.recentChange.enabled",indent:!0},{kind:"select",key:"codeLens.recentChange.command",label:"When clicked",options:[{value:"gitlens.toggleFileBlame",label:"toggles the file blame"},{value:"gitlens.toggleFileHeatmap",label:"toggles the file heatmap"},{value:"gitlens.toggleFileChanges",label:"toggles the file changes since before the commit"},{value:"gitlens.toggleFileChangesOnly",label:"toggles the file changes from the commit"},{value:"gitlens.diffWithPrevious",label:"opens changes with the previous revision"},{value:"gitlens.revealCommitInView",label:"reveals the commit in the Side Bar"},{value:"gitlens.showCommitsInView",label:"shows details of the commit"},{value:"gitlens.showQuickCommitDetails",label:"shows quick details of the commit"},{value:"gitlens.showQuickCommitFileDetails",label:"shows quick file details of the commit (default)"},{value:"gitlens.showQuickFileHistory",label:"shows the current file history"},{value:"gitlens.showQuickRepoHistory",label:"shows the current branch history"},{value:"gitlens.openCommitOnRemote",label:"opens the commit on the remote service (when available)"},{value:"gitlens.copyRemoteCommitUrl",label:"copies the remote commit URL to the clipboard (when available)"},{value:"gitlens.openFileOnRemote",label:"opens the file revision on the remote service (when available)"},{value:"gitlens.copyRemoteFileUrl",label:"copies the remote file revision URL to the clipboard (when available)"}],enabledWhen:"codeLens.enabled & codeLens.recentChange.enabled & codeLens.recentChange.command !false",indent:!0},{kind:"check",key:"codeLens.authors.enabled",label:"Add the number of authors and the most prominent author of the file or code block",enabledWhen:"codeLens.enabled"},{kind:"check",key:"codeLens.authors.command",label:"When clicked",valueOn:"gitlens.toggleFileBlame",enabledWhen:"codeLens.enabled & codeLens.authors.enabled",indent:!0},{kind:"select",key:"codeLens.authors.command",label:"When clicked",options:[{value:"gitlens.toggleFileBlame",label:"toggles the file blame (default)"},{value:"gitlens.toggleFileHeatmap",label:"toggles the file heatmap"},{value:"gitlens.toggleFileChanges",label:"toggles the file changes since before the commit"},{value:"gitlens.toggleFileChangesOnly",label:"toggles the file changes from the commit"},{value:"gitlens.diffWithPrevious",label:"opens changes with the previous revision"},{value:"gitlens.revealCommitInView",label:"reveals the commit in the Side Bar"},{value:"gitlens.showCommitsInView",label:"searches for commits within the range"},{value:"gitlens.showQuickCommitDetails",label:"shows quick details of the commit"},{value:"gitlens.showQuickCommitFileDetails",label:"show quick file details of the commit"},{value:"gitlens.showQuickFileHistory",label:"shows the current file history"},{value:"gitlens.showQuickRepoHistory",label:"shows the current branch history"},{value:"gitlens.openCommitOnRemote",label:"opens the commit on the remote service (when available)"},{value:"gitlens.copyRemoteCommitUrl",label:"copies the remote commit URL to the clipboard (when available)"},{value:"gitlens.copyRemoteFileUrl",label:"copies the remote file revision URL to the clipboard (when available)"},{value:"gitlens.openFileOnRemote",label:"opens the file revision on the remote service (when available)"}],enabledWhen:"codeLens.enabled & codeLens.authors.enabled & codeLens.authors.command !false",indent:!0},{kind:"checkgroup",key:"codeLens.scopes",label:"Add CodeLens to the following scopes",options:[{value:"document",label:"File scope",hint:"At the top of the file"},{value:"containers",label:"Containers scope",hint:"At the start of modules, classes, interfaces, etc"},{value:"blocks",label:"Block scope",hint:"At the start of functions, methods, etc"}],enabledWhen:"codeLens.enabled"}]},{id:"status-bar",settingsSearch:"gitlens.statusBar",name:"Status Bar Blame",group:"Annotations",icon:"git-commit",hint:"Adds a Git blame annotation about the current line to the status bar",master:{kind:"check",key:"statusBar.enabled",label:"Status Bar Blame"},learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#status-bar-blame",preview:"statusbar",controls:[{kind:"check",key:"statusBar.pullRequests.enabled",label:"Show the Pull Request (if any) that introduced the commit",enabledWhen:"statusBar.enabled"},{kind:"info",text:"Requires a connection to a supported remote service (e.g. GitHub)",visibleWhen:"statusBar.pullRequests.enabled"},{kind:"text",key:"statusBar.format",label:"Annotation format",placeholder:"${author}, ${agoOrDate}${' via 'pullRequest}",defaultValue:"${author}, ${agoOrDate}${' via 'pullRequest}",preview:{type:"commit",default:"${author}, ${agoOrDate}${' via 'pullRequest}"},tokens:!0,enabledWhen:"statusBar.enabled"},{kind:"segmented",key:"statusBar.alignment",label:"Position the annotation on the",options:[{value:"left",label:"left"},{value:"right",label:"right"}],enabledWhen:"statusBar.enabled"},{kind:"select",key:"statusBar.command",label:"When clicked",options:[{value:"gitlens.toggleFileBlame",label:"toggles the file blame"},{value:"gitlens.toggleFileHeatmap",label:"toggles the file heatmap"},{value:"gitlens.toggleFileChanges",label:"toggles the file changes since before the commit"},{value:"gitlens.toggleFileChangesOnly",label:"toggles the file changes from the commit"},{value:"gitlens.toggleCodeLens",label:"toggles the Git CodeLens"},{value:"gitlens.diffWithPrevious",label:"opens line changes with the previous revision"},{value:"gitlens.diffWithWorking",label:"opens line changes with the working file"},{value:"gitlens.revealCommitInView",label:"reveals the commit in the Side Bar"},{value:"gitlens.showCommitsInView",label:"shows details of the commit"},{value:"gitlens.showQuickCommitDetails",label:"shows quick details of the commit (default)"},{value:"gitlens.showQuickCommitFileDetails",label:"shows quick file details of the commit"},{value:"gitlens.showQuickFileHistory",label:"shows the current file history"},{value:"gitlens.showQuickRepoHistory",label:"shows the current branch history"},{value:"gitlens.openCommitOnRemote",label:"opens the commit on the remote service (when available)"},{value:"gitlens.copyRemoteCommitUrl",label:"copies the remote commit URL to the clipboard (when available)"},{value:"gitlens.openFileOnRemote",label:"opens the file revision on the remote service (when available)"},{value:"gitlens.copyRemoteFileUrl",label:"copies the remote file revision URL to the clipboard (when available)"}],enabledWhen:"statusBar.enabled"},{kind:"check",key:"statusBar.reduceFlicker",label:"Reduce flashing when updating the annotation",hint:'Avoids clearing the previous blame information when changing lines to reduce status bar "flashing"',enabledWhen:"statusBar.enabled"}]},{id:"hovers",settingsSearch:"gitlens.hovers",name:"Hovers",group:"Annotations",icon:"comment",hint:"Adds detailed blame information accessible via hovers",master:{kind:"check",key:"hovers.enabled",label:"Hovers"},learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#hovers",preview:"hover",controls:[{kind:"check",key:"hovers.avatars",label:"Use author avatars",enabledWhen:"hovers.enabled"},{kind:"check",key:"hovers.autolinks.enabled",label:"Show autolinks in commit messages",enabledWhen:"hovers.enabled"},{kind:"check",key:"hovers.autolinks.enhanced",label:"Enhance autolinks with remote details",hint:"Requires a connection to a supported remote service (e.g. GitHub)",enabledWhen:"hovers.enabled & hovers.autolinks.enabled",indent:!0},{kind:"check",key:"hovers.pullRequests.enabled",label:"Show the Pull Request (if any) that introduced the commit",enabledWhen:"hovers.enabled"},{kind:"info",text:"Requires a connection to a supported remote service (e.g. GitHub)",visibleWhen:"hovers.pullRequests.enabled"},{kind:"check",key:"hovers.currentLine.enabled",label:"Show hovers for the current line",enabledWhen:"hovers.enabled",visibleWhen:"currentLine.enabled"},{kind:"check",key:"hovers.currentLine.enabled",label:"Show hovers for the current line",addSettingsOn:[["hovers.currentLine.over","line"]],enabledWhen:"hovers.enabled",visibleWhen:"currentLine.enabled =false"},{kind:"select",key:"hovers.currentLine.over",label:"Shown when over the",options:[{value:"annotation",label:"annotation only"},{value:"line",label:"line & annotation"}],enabledWhen:"hovers.enabled & hovers.currentLine.enabled",visibleWhen:"currentLine.enabled",indent:!0},{kind:"select",key:"hovers.currentLine.over",label:"Shown when over the",options:[{value:"annotation",label:"annotation only"},{value:"line",label:"line"}],enabledWhen:"hovers.enabled & hovers.currentLine.enabled & currentLine.enabled",visibleWhen:"currentLine.enabled =false",indent:!0},{kind:"check",key:"hovers.currentLine.details",label:"Add blame details",enabledWhen:"hovers.enabled & hovers.currentLine.enabled",indent:!0},{kind:"check",key:"hovers.currentLine.changes",label:"Add changes (diff)",enabledWhen:"hovers.enabled & hovers.currentLine.enabled",indent:!0},{kind:"check",key:"hovers.annotations.enabled",label:"Show hovers while annotating",enabledWhen:"hovers.enabled"},{kind:"select",key:"hovers.annotations.over",label:"Shown when over the",options:[{value:"annotation",label:"annotation only"},{value:"line",label:"line & annotation"}],enabledWhen:"hovers.enabled & hovers.annotations.enabled",indent:!0},{kind:"check",key:"hovers.annotations.details",label:"Add blame details",enabledWhen:"hovers.enabled & hovers.annotations.enabled",indent:!0},{kind:"check",key:"hovers.annotations.changes",label:"Add changes (diff)",enabledWhen:"hovers.enabled & hovers.annotations.enabled",indent:!0}]},{id:"file-annotations",settingsSearch:"gitlens.fileAnnotations",name:"File Annotations",group:"In-editor",icon:"eye",hint:"Customize on-demand blame, changes, or heatmap annotations for the whole file",learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#file-annotations",controls:[{kind:"check",key:"fileAnnotations.dismissOnEscape",label:"Use Esc key to dismiss the active file annotations"},{kind:"check",key:"fileAnnotations.preserveWhileEditing",label:"Preserve file annotations while editing",hint:"Annotations will be shown from the last saved version"},{kind:"number",key:"advanced.blame.delayAfterEdit",label:"After unsaved changes, pause recomputing annotations for (ms)",placeholder:"5000",defaultValue:"5000",hint:"Smaller delays will provide a better experience but will have a greater performance impact. Also applies to inline blame annotations"},{kind:"number",key:"advanced.blame.sizeThresholdAfterEdit",label:"After unsaved changes, don't recompute annotations on files with more than (lines)",placeholder:"5000",defaultValue:"5000",hint:"Files larger than the threshold will only be recomputed when saved. Also applies to inline blame annotations"}]},{id:"blame",settingsSearch:"gitlens.blame",name:"File Blame",group:"In-editor",icon:"git-commit",hint:"Adds on-demand blame annotations for the whole file",command:{label:"GitLens: Toggle File Blame Annotations",command:"gitlens.toggleFileBlame"},learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#file-blame",preview:"fileblame",controls:[{kind:"select",key:"blame.toggleMode",label:"Toggle annotations",options:[{value:"file",label:"individually for each file"},{value:"window",label:"for all files"}]},{kind:"text",key:"blame.format",label:"Annotation format",placeholder:"${message|50?} ${agoOrDate|14-}",defaultValue:"${message|50?} ${agoOrDate|14-}",preview:{type:"commit",default:"${message|50?} ${agoOrDate|14-}"},tokens:!0},{kind:"check",key:"blame.heatmap.enabled",label:"Add a heatmap (age) indicator to show how recently lines were changed",hint:"Indicator color reflects the age of the most recent change (hot or cold), while indicator brightness ranges from bright (newer) to dim (older) based on the relative age"},{kind:"segmented",key:"blame.heatmap.location",label:"Position the heatmap on the",options:[{value:"left",label:"left"},{value:"right",label:"right"}],enabledWhen:"blame.heatmap.enabled",indent:!0},{kind:"check",key:"blame.avatars",label:"Add author avatars"},{kind:"check",key:"blame.compact",label:"Use compact view",hint:"Compacts (deduplicates) matching adjacent blame annotations"},{kind:"check",key:"blame.highlight.enabled",label:"Highlight other lines changed by the same commit as the current line"},{kind:"checkgroup",key:"blame.highlight.locations",label:"",options:[{value:"gutter",label:"Add gutter indicator"},{value:"line",label:"Add line highlight"},{value:"overview",label:"Add scroll bar indicator"}],enabledWhen:"blame.highlight.enabled",indent:!0}]},{id:"changes",settingsSearch:"gitlens.changes",name:"File Changes",group:"In-editor",icon:"git-compare",hint:"Adds on-demand file changes annotations to highlight any local (unpublished) changes or lines changed by the most recent commit",command:{label:"GitLens: Toggle File Changes Annotations",command:"gitlens.toggleFileChanges"},learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#gutter-changes",preview:"filechanges",controls:[{kind:"select",key:"changes.toggleMode",label:"Toggle annotations",options:[{value:"file",label:"individually for each file"},{value:"window",label:"for all files"}]},{kind:"checkgroup",key:"changes.locations",label:"",options:[{value:"gutter",label:"Add gutter indicator"},{value:"line",label:"Add line highlight"},{value:"overview",label:"Add scroll bar indicator"}]}]},{id:"heatmap",settingsSearch:"gitlens.heatmap",name:"File Heatmap",group:"In-editor",icon:"history",hint:"Adds on-demand heatmap (age) indicators to the file to show how recently lines were changed",command:{label:"GitLens: Toggle File Heatmap Annotations",command:"gitlens.toggleFileHeatmap"},learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#gutter-heatmap",preview:"heatmap",controls:[{kind:"info",text:"Indicator color reflects the age of the most recent change (hot or cold), while indicator brightness ranges from bright (newer) to dim (older) based on the relative age"},{kind:"select",key:"heatmap.toggleMode",label:"Toggle annotations",options:[{value:"file",label:"individually for each file"},{value:"window",label:"for all files"}]},{kind:"checkgroup",key:"heatmap.locations",label:"",options:[{value:"gutter",label:"Add gutter indicator"},{value:"line",label:"Add line highlight"},{value:"overview",label:"Add scroll bar indicator"}]},{kind:"check",key:"heatmap.fadeLines",label:"Fade out older lines"},{kind:"number",key:"heatmap.ageThreshold",label:"Hot/cold threshold (days)",placeholder:"90",defaultValue:"90"}]},{id:"commit-graph",settingsSearch:"gitlens.graph",name:"Commit Graph",group:"Views",icon:"gl-graph",hint:"Adds a [Commit Graph](command:gitlens.showGraph) to visualize, explore, and manage a Git repository",pro:!0,learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-plus/#commit-graph",preview:"graph",controls:[{kind:"segmented",key:"graph.layout",label:"Prefer showing the Commit Graph in the",options:[{value:"editor",label:"editor area"},{value:"panel",label:"bottom panel"}]},{kind:"number",key:"graph.defaultItemLimit",label:"Show this many rows at first",placeholder:"500",defaultValue:"500"},{kind:"number",key:"graph.pageItemLimit",label:"Then page in this many more rows when scrolling",placeholder:"200",defaultValue:"200"},{kind:"number",key:"graph.searchItemLimit",label:"Show this many search results at first and when paging",placeholder:"0",defaultValue:"0"},{kind:"number",key:"graph.scrollRowPadding",label:"Start scrolling at this many rows from the edge",placeholder:"0",defaultValue:"0"},{kind:"check",key:"graph.scrollMarkers.enabled",label:"Show markers on the Commit Graph scrollbar"},{kind:"check",key:"graph.showGhostRefsOnRowHover",label:"Show ghost branch / tag when hovering over or selecting a commit"},{kind:"check",key:"graph.highlightRowsOnRefHover",label:"Highlight associated rows when hovering over a branch"},{kind:"check",key:"graph.dimMergeCommits",label:"Dim merge commit rows"},{kind:"check",key:"graph.showRemoteNames",label:"Show remote names on remote branches"},{kind:"check",key:"graph.showUpstreamStatus",label:"Show upstream status on local branches with remotes"},{kind:"check",key:"graph.issues.enabled",label:"Show associated issues on branches",hint:"Requires a connection to a supported issue service (e.g. GitHub)"},{kind:"check",key:"graph.pullRequests.enabled",label:"Show associated pull requests on remote branches",hint:"Requires a connection to a supported remote service (e.g. GitHub)"},{kind:"check",key:"graph.avatars",label:"Use author and remote avatars"},{kind:"check",key:"graph.dateStyle",label:"Allow relative date formatting",valueOn:"relative",valueOff:"absolute"},{kind:"info",text:"Shows some dates relatively, e.g. 1 day ago",visibleWhen:"graph.dateStyle =relative"},{kind:"info",text:"Shows some dates relatively, e.g. 1 day ago",visibleWhen:"graph.dateStyle =null & defaultDateStyle =relative"},{kind:"info",text:"Shows dates absolutely, using the date format below",visibleWhen:"graph.dateStyle =absolute"},{kind:"info",text:"Shows dates absolutely, using the date format below",visibleWhen:"graph.dateStyle =null & defaultDateStyle =absolute"},{kind:"text",key:"graph.dateFormat",label:"Date format",placeholder:"defaults to `defaultDateFormat` value",preview:{type:"date",default:"MMMM Do, YYYY h:mma",defaultLookup:"defaultDateFormat"}}]},{id:"commits-view",settingsSearch:"gitlens.views.commits or gitlens.views",name:"Commits view",group:"Views",icon:"gl-commits-view",hint:"Adds a [Commits view](command:gitlens.showCommitsView) to visualize, explore, and manage Git commits",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#commits-view",controls:[{kind:"check",key:"views.commits.showBranchComparison",label:"Show a comparison of the current branch or working tree with a user-selected reference (branch, tag, etc)",valueOn:"working"},{kind:"segmented",key:"views.commits.showBranchComparison",label:"Compare the",options:[{value:"branch",label:"current branch"},{value:"working",label:"working tree"}],enabledWhen:"views.commits.showBranchComparison !false",indent:!0},{kind:"check",key:"views.commits.pullRequests.enabled",label:"Show associated pull requests",hint:"Requires a connection to a supported remote service (e.g. GitHub)"},{kind:"check",key:"views.commits.pullRequests.showForBranches",label:"Show the pull request associated with the current branch",enabledWhen:"views.commits.pullRequests.enabled",indent:!0},{kind:"check",key:"views.commits.pullRequests.showForCommits",label:"Show the pull request that introduced each commit",enabledWhen:"views.commits.pullRequests.enabled",indent:!0},{kind:"segmented",key:"views.commits.files.layout",label:"Layout files",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}],hint:"Chooses the best layout based on the number of files at each nesting level"},{kind:"select",key:"views.commits.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}]},{kind:"check",key:"views.commits.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"},{kind:"check",key:"views.commits.avatars",label:"Use author avatars"},{kind:"text",key:"views.formats.commits.label",label:"Commit label format",placeholder:"${❰ tips ❱➤  }${message}",defaultValue:"${❰ tips ❱➤  }${message}",preview:{type:"commit",default:"${❰ tips ❱➤  }${message}"},tokens:!0},{kind:"text",key:"views.formats.commits.description",label:"Commit description format",placeholder:"${author, }${agoOrDate}",defaultValue:"${author, }${agoOrDate}",preview:{type:"commit",default:"${author, }${agoOrDate}"},tokens:!0}]},{id:"repositories-view",settingsSearch:"gitlens.views.repositories or gitlens.views",name:"Repositories view",group:"Views",icon:"gl-repositories-view",hint:"Adds a [Repositories view](command:gitlens.showRepositoriesView), hidden by default, to visualize, explore, and manage Git repositories",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#repositories-view",controls:[{kind:"info",text:"Show the following sections under each repository"},{kind:"check",key:"views.repositories.showBranchComparison",label:"Comparison of the current branch or working tree with a user-selected reference (branch, tag, etc)",valueOn:"working"},{kind:"segmented",key:"views.repositories.showBranchComparison",label:"Compare the",options:[{value:"branch",label:"current branch"},{value:"working",label:"working tree"}],enabledWhen:"views.repositories.showBranchComparison !false",indent:!0},{kind:"check",key:"views.repositories.showUpstreamStatus",label:"Current branch status"},{kind:"check",key:"views.repositories.includeWorkingTree",label:"Working tree file changes"},{kind:"check",key:"views.repositories.pullRequests.enabled",label:"Associated pull requests",hint:"Requires a connection to a supported remote service (e.g. GitHub)"},{kind:"check",key:"views.repositories.pullRequests.showForBranches",label:"Show the pull request associated with each branch",enabledWhen:"views.repositories.pullRequests.enabled",indent:!0},{kind:"check",key:"views.repositories.pullRequests.showForCommits",label:"Show the pull request that introduced each commit",enabledWhen:"views.repositories.pullRequests.enabled",indent:!0},{kind:"check",key:"views.repositories.showCommits",label:"Commits"},{kind:"check",key:"views.repositories.showBranches",label:"Branches"},{kind:"check",key:"views.repositories.showRemotes",label:"Remotes"},{kind:"check",key:"views.repositories.showStashes",label:"Stashes"},{kind:"check",key:"views.repositories.showTags",label:"Tags"},{kind:"check",key:"views.repositories.showContributors",label:"Contributors"},{kind:"check",key:"views.repositories.showIncomingActivity",label:"Incoming Activity (Experimental)"},{kind:"check",key:"views.repositories.autoRefresh",label:"Automatically refresh when a repository or the file system changes"},{kind:"check",key:"views.repositories.autoReveal",label:"Automatically reveal repository when opening files"},{kind:"check",key:"views.repositories.avatars",label:"Use author avatars"},{kind:"segmented",key:"views.repositories.branches.layout",label:"Layout branches",options:[{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}]},{kind:"segmented",key:"views.repositories.files.layout",label:"Layout files",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}],hint:"Chooses the best layout based on the number of files at each nesting level"},{kind:"select",key:"views.repositories.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}]},{kind:"check",key:"views.repositories.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"}]},{id:"branches-view",settingsSearch:"gitlens.views.branches or gitlens.views",name:"Branches view",group:"Views",icon:"gl-branches-view",hint:"Adds a [Branches view](command:gitlens.showBranchesView) to visualize, explore, and manage Git branches",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#branches-view",controls:[{kind:"check",key:"views.branches.showBranchComparison",label:"Show a comparison of the branch with a user-selected reference (branch, tag, etc)",valueOn:"branch"},{kind:"check",key:"views.branches.pullRequests.enabled",label:"Show associated pull requests",hint:"Requires a connection to a supported remote service (e.g. GitHub)"},{kind:"check",key:"views.branches.pullRequests.showForBranches",label:"Show the pull request associated with each branch",enabledWhen:"views.branches.pullRequests.enabled",indent:!0},{kind:"check",key:"views.branches.pullRequests.showForCommits",label:"Show the pull request that introduced each commit",enabledWhen:"views.branches.pullRequests.enabled",indent:!0},{kind:"segmented",key:"views.branches.branches.layout",label:"Layout branches",options:[{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}]},{kind:"segmented",key:"views.branches.files.layout",label:"Layout files",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}],hint:"Chooses the best layout based on the number of files at each nesting level"},{kind:"select",key:"views.branches.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}]},{kind:"check",key:"views.branches.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"},{kind:"check",key:"views.branches.avatars",label:"Use author avatars"}]},{id:"remotes-view",settingsSearch:"gitlens.views.remotes or gitlens.views",name:"Remotes view",group:"Views",icon:"gl-remotes-view",hint:"Adds a [Remotes view](command:gitlens.showRemotesView) to visualize, explore, and manage Git remotes and remote branches",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#remotes-view",controls:[{kind:"check",key:"views.remotes.pullRequests.enabled",label:"Show associated pull requests",hint:"Requires a connection to a supported remote service (e.g. GitHub)"},{kind:"check",key:"views.remotes.pullRequests.showForBranches",label:"Show the pull request associated with each branch",enabledWhen:"views.remotes.pullRequests.enabled",indent:!0},{kind:"check",key:"views.remotes.pullRequests.showForCommits",label:"Show the pull request that introduced each commit",enabledWhen:"views.remotes.pullRequests.enabled",indent:!0},{kind:"segmented",key:"views.remotes.branches.layout",label:"Layout branches",options:[{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}]},{kind:"segmented",key:"views.remotes.files.layout",label:"Layout files",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}],hint:"Chooses the best layout based on the number of files at each nesting level"},{kind:"select",key:"views.remotes.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}]},{kind:"check",key:"views.remotes.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"},{kind:"check",key:"views.remotes.avatars",label:"Use author avatars"}]},{id:"stashes-view",settingsSearch:"gitlens.views.stashes or gitlens.views",name:"Stashes view",group:"Views",icon:"gl-stashes-view",hint:"Adds a [Stashes view](command:gitlens.showStashesView) to visualize, explore, and manage Git stashes",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#stashes-view",controls:[{kind:"segmented",key:"views.stashes.files.layout",label:"Layout files",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}],hint:"Chooses the best layout based on the number of files at each nesting level"},{kind:"select",key:"views.stashes.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}]},{kind:"check",key:"views.stashes.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"},{kind:"text",key:"views.formats.stashes.label",label:"Stash label format",placeholder:"${message}",defaultValue:"${message}",preview:{type:"commit",default:"${message}"},tokens:!0},{kind:"text",key:"views.formats.stashes.description",label:"Stash description format",placeholder:"${stashOnRef, }${agoOrDate}",defaultValue:"${stashOnRef, }${agoOrDate}",preview:{type:"commit",default:"${stashOnRef, }${agoOrDate}"},tokens:!0}]},{id:"tags-view",settingsSearch:"gitlens.views.tags or gitlens.views",name:"Tags view",group:"Views",icon:"gl-tags-view",hint:"Adds a [Tags view](command:gitlens.showTagsView) to visualize, explore, and manage Git tags",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#tags-view",controls:[{kind:"segmented",key:"views.tags.branches.layout",label:"Layout tags",options:[{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}]},{kind:"segmented",key:"views.tags.files.layout",label:"Layout files",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}],hint:"Chooses the best layout based on the number of files at each nesting level"},{kind:"select",key:"views.tags.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}]},{kind:"check",key:"views.tags.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"},{kind:"check",key:"views.tags.avatars",label:"Use author avatars"}]},{id:"worktrees-view",settingsSearch:"gitlens.views.worktrees or gitlens.views",name:"Worktrees view",group:"Views",icon:"gl-worktrees-view",hint:"Adds a [Worktrees view](command:gitlens.showWorktreesView) to visualize, explore, and manage Git worktrees",pro:!0,learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-plus/#worktrees",controls:[{kind:"check",key:"worktrees.promptForLocation",label:"Always ask where to put new worktrees"},{kind:"text",key:"worktrees.defaultLocation",label:"Default worktree location",placeholder:"absolute path to put new worktrees into",hint:"Can be configured on a per-workspace or per-folder basis"},{kind:"check",key:"views.worktrees.showBranchComparison",label:"Show a comparison of the worktree branch with a user-selected reference (branch, tag, etc)",valueOn:"branch"},{kind:"check",key:"views.worktrees.pullRequests.enabled",label:"Show associated pull requests",hint:"Requires a connection to a supported remote service (e.g. GitHub)"},{kind:"check",key:"views.worktrees.pullRequests.showForBranches",label:"Show the pull request associated with the worktree branch",enabledWhen:"views.worktrees.pullRequests.enabled",indent:!0},{kind:"check",key:"views.worktrees.pullRequests.showForCommits",label:"Show the pull request that introduced each commit",enabledWhen:"views.worktrees.pullRequests.enabled",indent:!0},{kind:"segmented",key:"views.worktrees.files.layout",label:"Layout files",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}],hint:"Chooses the best layout based on the number of files at each nesting level"},{kind:"select",key:"views.worktrees.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}]},{kind:"check",key:"views.worktrees.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"},{kind:"check",key:"views.worktrees.avatars",label:"Use author avatars"}]},{id:"commit-details-view",settingsSearch:"gitlens.views.commitDetails or gitlens.views",name:"Inspect view",group:"Views",icon:"gl-commit-view",hint:"Adds an [Inspect view](command:gitlens.showCommitDetailsView) to see rich details for a commit",learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#commit-details-view",controls:[{kind:"check",key:"views.commitDetails.autolinks.enabled",label:"Show autolinks in commit messages"},{kind:"check",key:"views.commitDetails.autolinks.enhanced",label:"Enhance autolinks with remote details",hint:"Requires a connection to a supported remote service (e.g. GitHub)",enabledWhen:"views.commitDetails.autolinks.enabled",indent:!0},{kind:"check",key:"views.commitDetails.pullRequests.enabled",label:"Show the Pull Request (if any) that introduced the commit",hint:"Requires a connection to a supported remote service (e.g. GitHub)"},{kind:"select",key:"views.commitDetails.files.layout",label:"Layout files",hint:"Chooses the best layout based on the number of files at each nesting level",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}]},{kind:"check",key:"views.commitDetails.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"},{kind:"check",key:"views.commitDetails.avatars",label:"Use author avatars"}]},{id:"contributors-view",settingsSearch:"gitlens.views.contributors or gitlens.views",name:"Contributors view",group:"Views",icon:"gl-contributors-view",hint:"Adds a [Contributors view](command:gitlens.showContributorsView), hidden by default, to visualize, navigate, and explore contributors",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#contributors-view",controls:[{kind:"check",key:"views.contributors.showAllBranches",label:"Show commits from all branches"},{kind:"check",key:"views.contributors.pullRequests.enabled",label:"Show associated pull requests",hint:"Requires a connection to a supported remote service (e.g. GitHub)"},{kind:"check",key:"views.contributors.pullRequests.showForCommits",label:"Show the pull request that introduced each commit",enabledWhen:"views.contributors.pullRequests.enabled",indent:!0},{kind:"select",key:"views.contributors.files.layout",label:"Layout files",hint:"Chooses the best layout based on the number of files at each nesting level",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}]},{kind:"select",key:"views.contributors.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}]},{kind:"check",key:"views.contributors.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"},{kind:"check",key:"views.contributors.avatars",label:"Use author avatars"}]},{id:"file-history-view",settingsSearch:"gitlens.views.fileHistory or gitlens.views",name:"File History view",group:"Views",icon:"gl-history-view",hint:"Adds a [File History view](command:gitlens.showFileHistoryView) to visualize, navigate, and explore the revision history of the current file, a specified file or folder, or just the selected lines of the current file",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#file-history-view",controls:[{kind:"check",key:"views.fileHistory.avatars",label:"Use author avatars"},{kind:"info",text:"Applies only when showing folder history:"},{kind:"check",key:"views.fileHistory.pullRequests.enabled",label:"Show associated pull requests",hint:"Requires a connection to a supported remote service (e.g. GitHub)",indent:!0},{kind:"check",key:"views.fileHistory.pullRequests.showForCommits",label:"Show the pull request that introduced each commit",enabledWhen:"views.fileHistory.pullRequests.enabled",indent:!0},{kind:"select",key:"views.fileHistory.files.layout",label:"Layout files",hint:"Chooses the best layout based on the number of files at each nesting level",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}],indent:!0},{kind:"select",key:"views.fileHistory.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}],indent:!0},{kind:"check",key:"views.fileHistory.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts",indent:!0}]},{id:"line-history-view",settingsSearch:"gitlens.views.lineHistory or gitlens.views",name:"Line History view",group:"Views",icon:"gl-history-view",hint:"Adds a [Line History view](command:gitlens.showLineHistoryView), hidden by default, to visualize, navigate, and explore the revision history of the selected lines of current file",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#line-history-view",controls:[{kind:"check",key:"views.lineHistory.avatars",label:"Use author avatars"}]},{id:"search-compare-view",settingsSearch:"gitlens.views.searchAndCompare or gitlens.views",name:"Search & Compare view",group:"Views",icon:"gl-search-view",hint:"Adds a [Search & Compare view](command:gitlens.showSearchAndCompareView) to search and explore commit histories by message, author, files, id, etc, or visualize comparisons between branches, tags, commits, and more",learnMoreUrl:"https://help.gitkraken.com/gitlens/side-bar/#search-compare-view",controls:[{kind:"check",key:"views.searchAndCompare.pullRequests.enabled",label:"Show associated pull requests",hint:"Requires a connection to a supported remote service (e.g. GitHub)"},{kind:"check",key:"views.searchAndCompare.pullRequests.showForCommits",label:"Show the pull request that introduced each commit",enabledWhen:"views.searchAndCompare.pullRequests.enabled",indent:!0},{kind:"select",key:"views.searchAndCompare.files.layout",label:"Layout files",options:[{value:"auto",label:"automatically"},{value:"list",label:"as a list"},{value:"tree",label:"as a tree"}]},{kind:"select",key:"views.searchAndCompare.files.icon",label:"File icons",options:[{value:"type",label:"show file type (default)"},{value:"status",label:"show file status"}]},{kind:"check",key:"views.searchAndCompare.files.compact",label:"Use compact file layout",hint:"Compacts (flattens) unnecessary nesting when using a tree layouts"},{kind:"check",key:"views.searchAndCompare.avatars",label:"Use author avatars"}]},{id:"integrations",settingsSearch:"gitlens.integrations",name:"Cloud Integrations",group:"Integrations",icon:"plug",hint:"Connect hosting services like GitHub and issue trackers like Jira to track progress and take action on PRs and issues related to your branches",learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-start-here/#improve-workflows-with-integrations",controls:[{kind:"integrations",label:"Cloud integrations",hint:"GitHub, GitHub Enterprise, GitLab, Azure DevOps, Bitbucket, Jira, Linear"}]},{id:"ai",settingsSearch:"gitlens.ai",name:"AI",group:"Integrations",icon:"sparkle",hint:"Generate commit messages, explain changes, and power other AI features across GitLens",learnMoreUrl:"https://help.gitkraken.com/gitlens/gl-gk-ai/",master:{kind:"check",key:"ai.enabled",label:"AI Features"},controls:[{kind:"ai",label:"AI integrations",hint:"AI provider, model, GitKraken MCP, default coding agent, Claude Code hooks"}]},{id:"autolinks",settingsSearch:"gitlens.autolinks",name:"Autolinks",group:"Integrations",icon:"link",hint:"Use autolinks to linkify external references, like Jira issues or Zendesk tickets, in commit messages.",controls:[{kind:"autolinks",label:"Custom autolinks"}]},{id:"terminal-links",name:"Terminal Links",group:"Integrations",icon:"terminal",hint:"Adds autolinks for branches, tags, commits, and commit ranges in the integrated terminal",learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#terminal-links",master:{kind:"check",key:"terminalLinks.enabled",label:"Terminal Links"},controls:[{kind:"check",key:"terminalLinks.showDetailsView",label:"Show Inspect view for commit links",enabledWhen:"terminalLinks.enabled"}]},{id:"rebase-editor",name:"Interactive Rebase Editor",group:"Editing",icon:"git-merge",hint:"Adds a user-friendly interactive rebase editor to easily configure an interactive rebase session",learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#interactive-rebase-editor",master:{kind:"check",key:"rebaseEditor.enabled",type:"custom",label:"Interactive Rebase Editor"},controls:[{kind:"select",key:"rebaseEditor.ordering",label:"Show",enabledWhen:"rebaseEditor.enabled",options:[{value:"asc",label:"oldest commit first"},{value:"desc",label:"newest commit first (default)"}]}]},{id:"dates",settingsSearch:"gitlens.default",name:"Dates & Times",group:"General",icon:"calendar",hint:"Controls how dates and times are formatted and displayed throughout GitLens",controls:[{kind:"check",key:"defaultDateStyle",label:"Allow relative date formatting",valueOn:"relative",valueOff:"absolute"},{kind:"info",text:"Shows some dates relatively, e.g. 1 day ago",visibleWhen:"defaultDateStyle =relative"},{kind:"info",text:"Shows dates absolutely, using the date format below",visibleWhen:"defaultDateStyle =absolute"},{kind:"text",key:"defaultDateLocale",label:"Date locale",placeholder:"defaults to VS Code locale",hint:'Use "system" for the system locale, or a [locale language tag](https://en.wikipedia.org/wiki/IETF_language_tag), e.g. en-US',preview:{type:"date-locale",defaultLookup:"defaultDateFormat"}},{kind:"text",key:"defaultDateFormat",label:"Date format",placeholder:"defaults to MMMM Do, YYYY h:mma",hint:"See the [Moment.js docs](https://momentjs.com/docs/#/displaying/format/) for supported formats",preview:{type:"date",default:"MMMM Do, YYYY h:mma"}},{kind:"text",key:"defaultDateShortFormat",label:"Short date format",placeholder:"defaults to system short date format",preview:{type:"date",default:"short"}},{kind:"text",key:"defaultTimeFormat",label:"Time format",placeholder:"defaults to h:mma",preview:{type:"date",default:"h:mma"}}]},{id:"sorting",name:"Sorting",group:"General",icon:"list-ordered",hint:"Controls how repositories, branches, tags & contributors are sorted in views",controls:[{kind:"select",key:"sortRepositoriesBy",label:"Sort repositories",options:[{value:"discovered",label:"by discovery or workspace order"},{value:"lastFetched:desc",label:"by last fetched date, descending"},{value:"lastFetched:asc",label:"by last fetched date, ascending"},{value:"name:asc",label:"by name, ascending"},{value:"name:desc",label:"by name, descending"}]},{kind:"select",key:"sortBranchesBy",label:"Sort branches",options:[{value:"date:desc",label:"by recent commit date, descending"},{value:"date:asc",label:"by recent commit date, ascending"},{value:"name:asc",label:"by name, ascending"},{value:"name:desc",label:"by name, descending"}]},{kind:"select",key:"sortTagsBy",label:"Sort tags",options:[{value:"date:desc",label:"by recent commit date, descending"},{value:"date:asc",label:"by recent commit date, ascending"},{value:"name:asc",label:"by name, ascending"},{value:"name:desc",label:"by name, descending"}]},{kind:"select",key:"sortContributorsBy",label:"Sort contributors",options:[{value:"count:desc",label:"by commit count, descending"},{value:"count:asc",label:"by commit count, ascending"},{value:"date:desc",label:"by recent commit date, descending"},{value:"date:asc",label:"by recent commit date, ascending"},{value:"name:asc",label:"by name, ascending"},{value:"name:desc",label:"by name, descending"}]}]},{id:"menus",settingsSearch:"gitlens.menus",name:"Menus & Toolbars",group:"General",icon:"ellipsis",hint:"Adds many helpful commands to the built-in menus & toolbars",master:{kind:"check",key:"menus",label:"Menus & Toolbars",checkedRemoves:!0},controls:[{kind:"check",type:"object",key:"menus",path:"editor",label:"Add to the editor context menu",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"editor.compare",label:"Add an Open Changes submenu",enabledWhen:"menus.editor",indent:!0},{kind:"check",type:"object",key:"menus",path:"editor.remote",label:"Add an Open on Remote (Web) submenu",enabledWhen:"menus.editor",indent:!0},{kind:"check",type:"object",key:"menus",path:"editor.blame",label:"Add a File Annotations submenu",enabledWhen:"menus.editor",indent:!0},{kind:"check",type:"object",key:"menus",path:"editor.history",label:"Add a File History submenu",enabledWhen:"menus.editor",indent:!0},{kind:"check",type:"object",key:"menus",path:"editor.clipboard",label:"Add to the Copy As submenu",enabledWhen:"menus.editor",indent:!0},{kind:"check",type:"object",key:"menus",path:"editorGutter",label:"Add to the editor's line number (gutter) context menu",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"editorGutter.share",label:"Add a Share submenu",enabledWhen:"menus.editorGutter",indent:!0},{kind:"check",type:"object",key:"menus",path:"editorGutter.compare",label:"Add an Open Changes submenu",enabledWhen:"menus.editorGutter",indent:!0},{kind:"check",type:"object",key:"menus",path:"editorGutter.remote",label:"Add an Open on Remote (Web) submenu",enabledWhen:"menus.editorGutter",indent:!0},{kind:"check",type:"object",key:"menus",path:"editorTab",label:"Add to the editor tab context menu",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"editorTab.clipboard",label:"Add Copy Remote File URL * commands",enabledWhen:"menus.editorTab",indent:!0},{kind:"check",type:"object",key:"menus",path:"editorTab.compare",label:"Add an Open Changes submenu",enabledWhen:"menus.editorTab",indent:!0},{kind:"check",type:"object",key:"menus",path:"editorTab.remote",label:"Add an Open on Remote (Web) submenu",enabledWhen:"menus.editorTab",indent:!0},{kind:"check",type:"object",key:"menus",path:"editorTab.history",label:"Add a File History submenu",enabledWhen:"menus.editorTab",indent:!0},{kind:"check",type:"object",key:"menus",path:"editorGroup",label:"Add to the editor group toolbar",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"editorGroup.compare",label:"Add revision history navigation commands",enabledWhen:"menus.editorGroup",indent:!0},{kind:"check",type:"object",key:"menus",path:"editorGroup.blame",label:"Add a File Annotations submenu or command",enabledWhen:"menus.editorGroup",indent:!0},{kind:"select",key:"fileAnnotations.command",label:"Add",options:[{value:"null",label:"File Annotations submenu"},{value:"blame",label:"Toggle File Blame command"},{value:"heatmap",label:"Toggle File Heatmap command"},{value:"changes",label:"Toggle File Changes command"}],enabledWhen:"menus.editorGroup & menus.editorGroup.blame",indent:!0},{kind:"check",type:"object",key:"menus",path:"explorer",label:"Add to the Explorer items context menu",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"explorer.compare",label:"Add an Open Changes submenu",enabledWhen:"menus.explorer",indent:!0},{kind:"check",type:"object",key:"menus",path:"explorer.remote",label:"Add an Open on Remote (Web) submenu",enabledWhen:"menus.explorer",indent:!0},{kind:"check",type:"object",key:"menus",path:"explorer.history",label:"Add a File History submenu",enabledWhen:"menus.explorer",indent:!0},{kind:"check",type:"object",key:"menus",path:"explorer.clipboard",label:"Add Copy Remote File URL * commands",enabledWhen:"menus.explorer",indent:!0},{kind:"check",type:"object",key:"menus",path:"ghpr",label:"Add to the GitHub Pull Request and Issues' pull request context menu",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"ghpr.worktree",label:"Add an Open Worktree for Pull Request command",enabledWhen:"menus.ghpr",indent:!0},{kind:"check",type:"object",key:"menus",path:"scm",label:"Add to the Source Control context menu",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"scm.graph",label:"Add a Show Commit Graph command",enabledWhen:"menus.scm",indent:!0},{kind:"check",type:"object",key:"menus",path:"scm.visualHistory",label:"Add a Visualize Repository History command",enabledWhen:"menus.scm",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmRepositoryInline",label:"Add to the Source Control repository toolbar",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"scmRepositoryInline.stash",label:"Add a Stash All Changes command",enabledWhen:"menus.scmRepositoryInline",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmRepositoryInline.graph",label:"Add a Show Commit Graph command",enabledWhen:"menus.scmRepositoryInline",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmRepositoryInline.visualHistory",label:"Add a Visualize Repository History command",enabledWhen:"menus.scmRepositoryInline",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmRepository",label:"Add to the Source Control repository context menu",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"scmRepository.generateCommitMessage",label:"Add a Generate Commit Message (Experimental) command",enabledWhen:"menus.scmRepository",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmRepository.authors",label:"Add an Add Co-authors command",enabledWhen:"menus.scmRepository",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmRepository.graph",label:"Add a Show Commit Graph command",enabledWhen:"menus.scmRepository",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmRepository.visualHistory",label:"Add a Visualize Repository History command",enabledWhen:"menus.scmRepository",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmGroupInline",label:"Add to the Source Control groups toolbar",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"scmGroupInline.stash",label:"Add a Stash All Changes command",enabledWhen:"menus.scmGroupInline",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmGroup",label:"Add to the Source Control groups context menu",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"scmGroup.stash",label:"Add a Stash All Changes command",enabledWhen:"menus.scmGroup",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmGroup.compare",label:"Add an Open Changes submenu",enabledWhen:"menus.scmGroup",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmGroup.openClose",label:"Add Open Changed Files and Close Unchanged Files commands",enabledWhen:"menus.scmGroup",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmGroup.patch",label:"Add Copy as Patch and Share as Cloud Patch... commands",enabledWhen:"menus.scmGroup",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmItemInline",label:"Add to the Source Control items toolbar",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"scmItemInline.stash",label:"Add a Stash Changes command",enabledWhen:"menus.scmItemInline",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmItem",label:"Add to the Source Control items context menu",checkedRemoves:!0,enabledWhen:"menus"},{kind:"check",type:"object",key:"menus",path:"scmItem.compare",label:"Add an Open Changes with submenu",enabledWhen:"menus.scmItem",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmItem.remote",label:"Add an Open on Remote (Web) submenu",enabledWhen:"menus.scmItem",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmItem.history",label:"Add a File History submenu",enabledWhen:"menus.scmItem",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmItem.stash",label:"Add a Stash Changes command",enabledWhen:"menus.scmItem",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmItem.share",label:"Add a Share submenu",enabledWhen:"menus.scmItem",indent:!0},{kind:"check",type:"object",key:"menus",path:"scmItem.clipboard",label:"Add a Copy Relative Path command",enabledWhen:"menus.scmItem",indent:!0}]},{id:"shortcuts",name:"Keyboard Shortcuts",group:"General",icon:"keyboard",hint:"Controls the keyboard shortcuts GitLens registers",controls:[{kind:"select",key:"keymap",label:"Use keyboard shortcuts",options:[{value:"alternate",label:"alt-based"},{value:"chorded",label:"chorded (default)"},{value:"none",label:"user-defined"}]},{kind:"info",text:"Alt based (⌥ on macOS) shortcuts. Not great for non-English keyboard layouts",visibleWhen:"keymap =alternate"},{kind:"info",text:"Chorded shortcuts that start with Ctrl+Shift+G (⌥⌘G on macOS). Better for non-English keyboard layouts",visibleWhen:"keymap =chorded"},{kind:"info",text:"GitLens won't bind any keyboard shortcuts. Configure your own via the Keyboard Shortcuts editor",visibleWhen:"keymap =none"},{kind:"info",text:"Search for gitlens in the [Keyboard Shortcuts editor](command:workbench.action.openGlobalKeybindings?%22gitlens%22) to see the shortcuts and to customize them further"}]},{id:"modes",settingsSearch:"gitlens.modes",name:"Modes",group:"General",icon:"color-mode",hint:"Supports user-defined modes for quickly toggling between sets of settings",command:{label:"GitLens: Switch Mode",command:"gitlens.switchMode"},learnMoreUrl:"https://help.gitkraken.com/gitlens/gitlens-features/#modes",controls:[{kind:"info",text:"Use the GitLens: Toggle Review Mode command to toggle Review mode"},{kind:"info",text:"Use the GitLens: Toggle Zen Mode command to toggle Zen mode"},{kind:"check",key:"mode.statusBar.enabled",label:"Show the active mode in the status bar"},{kind:"segmented",key:"mode.statusBar.alignment",label:"Position the annotation on the",options:[{value:"left",label:"left"},{value:"right",label:"right"}],enabledWhen:"mode.statusBar.enabled",indent:!0}]}],iB={views:"sorting","views-side-bar":"commits-view"};let SettingsActions=class SettingsActions{constructor(t,o,i){this.state=t,this.services=o,this.settings=i,this._anchorNonce=0,this._servicesLoadGeneration=0}dispose(){}selectCategory(t){this.state.selectedCategoryId.set(t),this.state.anchorKey.set(void 0)}openAnchor(t){let o=function(t){let o=iB[t]??t;if(iD.some(t=>t.id===o))return{id:o};let i=t.startsWith("gitlens.")?t.substring(8):t;for(let t of iD)if(t.master?.key===i||t.controls.some(t=>iO(t).includes(i)))return{id:t.id,key:i}}(t);null!=o&&(this.selectCategory(o.id),null!=o.key&&this.state.anchorKey.set({key:o.key,nonce:++this._anchorNonce}))}setScope(t){this.state.scope.set(t)}setQuery(t){if(this.state.query.set(t),this.state.anchorKey.set(void 0),t){let t=this.state.searchResults.get();t.length&&!t.some(t=>t.category.id===this.state.selectedCategoryId.get())&&this.state.selectedCategoryId.set(t[0].category.id)}}async loadSharedServices(){let t,o,i,r=this.state,a=++this._servicesLoadGeneration;r.serviceErrors.set({subscription:!1,integrations:!1,ai:!1});let n=()=>a===this._servicesLoadGeneration,c=(...t)=>{if(!n())return;let o={...r.serviceErrors.get()};for(let i of t)o[i]=!0;r.serviceErrors.set(o)};try{[t,o,i]=await Promise.all([this.services.subscription,this.services.integrations,this.services.ai])}catch{c("subscription","integrations","ai");return}t.getSubscription().then(t=>{n()&&r.subscription.set(t)},()=>c("subscription")),o.getIntegrationStates().then(t=>{n()&&r.cloudIntegrations.set(t)},()=>c("integrations")),i.getModel().then(t=>{n()&&r.aiModel.set(t)},()=>c("ai")),i.getState().then(t=>{n()&&r.aiState.set(t)},()=>c("ai"))}async apply(t){let o={},i=[];for(let[r,a]of Object.entries(t))void 0===a?i.push(r):o[r]=a;let r=this.state.config.get(),a=this.state.customSettings.get();this.applyOptimistic(t);try{await this.settings.update({changes:o,removes:i,scope:this.state.scope.get()})}catch(t){this.state.config.set(r),this.state.customSettings.set(a),this.state.error.set(t instanceof Error?t.message:String(t))}}applyOptimistic(t){let o,i,r=this.state.config.get();for(let[a,n]of Object.entries(t)){if(tP.includes(a)){"boolean"==typeof n&&((i??={...this.state.customSettings.get()})[a]=n);continue}null!=r&&iM(o??=structuredClone(r),a,n)}null!=o&&this.state.config.set(o),null!=i&&this.state.customSettings.set(i)}async applyCheck(t,o){let i={},r=void 0===t.valueOn||t.valueOn;switch(t.type){case"custom":i[t.key]=o;break;case"object":{let a=structuredClone(this.state.getSettingValue(t.key)??{});iM(a,t.path??"",!!o&&(t.checkedRemoves?void 0:r)),i[t.key]=a;break}case"array":i[t.key]=iF(this.state.getSettingValue(t.key)??[],t.value??"",o);break;default:i[t.key]=o?t.checkedRemoves?void 0:r:void 0!==t.valueOff&&t.valueOff}let a=o?t.addSettingsOn:t.addSettingsOff;if(null!=a)for(let[t,o]of a)i[t]=o;return this.apply(i)}applyOption(t,o){var i;return this.apply({[t]:"true"===(i=o)||"false"!==i&&("null"===i?null:i)})}applyText(t,o,i){return this.apply({[t]:o||(i??null)})}applyNumber(t,o,i){return this.apply({[t]:o?Number(o):null!=i?Number(i):null})}applyValue(t,o){return this.apply({[t]:o})}applyArrayMember(t,o,i){return this.apply({[t]:iF(this.state.getSettingValue(t)??[],o,i)})}async applyAutolinkChange(t,o,i){let r=structuredClone(this.state.getSettingValue("autolinks")??[]);if((null==i||""===i)&&null==r[t])return;let a=r[t]??{prefix:"",url:"",alphanumeric:!1,ignoreCase:!1,title:null};return r[t]={...a,[o]:i},this.apply({autolinks:r.length?r:void 0})}async applyAutolinkRule(t,o){let i=structuredClone(this.state.getSettingValue("autolinks")??[]);return i[Math.min(t,i.length)]={...o},this.apply({autolinks:i})}async removeAutolink(t){let o=structuredClone(this.state.getSettingValue("autolinks")??[]);return o.splice(t,1),this.apply({autolinks:o.length?o:void 0})}generateFormatPreview(t,o,i){return this.settings.generateFormatPreview({key:t,type:o,format:i})}};function iF(t,o,i){let r=[...t],a=r.indexOf(o);return i?-1===a&&r.push(o):-1!==a&&r.splice(a,1),r}let iq=w`
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`,iV=w`
	.sr-only,
	.sr-only-focusable:not(:active, :focus-visible, :focus-within) {
		${iq}
	}
`,iW=w`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: -1px;
`,ij=w`
	outline: var(--gl-border-width) solid var(--color-focus-border);
	outline-offset: 2px;
`,iU=w`
	:focus-visible {
		${iW}
	}
`,iN=w`
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
`,iH=w`
	* {
		box-sizing: border-box;
	}
`,iG=w`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}

	a:focus {
		${iW}
	}

	a:hover {
		text-decoration: underline;
	}
`,iK=w`
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
`;w`
	.inline-code {
		padding: 0 var(--gl-space-4) var(--gl-space-2);
		font-family: var(--vscode-editor-font-family);
		background: var(--vscode-textCodeBlock-background);
		border-radius: var(--gl-radius-sm);
	}
`,w`
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
`,w`
	:host {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		overflow: hidden;
	}
`,w`
	:host {
		--gl-metadata-bar-bg: color-mix(in srgb, var(--color-background) 95%, var(--color-foreground) 5%);
		--gl-metadata-bar-border: var(--vscode-sideBarSectionHeader-border, var(--color-foreground--25));
		--gl-metadata-bar-min-height: 2.94rem;
	}
`;let iY=[iH,iU,w`
		:host {
			display: block;
			height: 100vh;
			font-family: var(--vscode-font-family);
			color: var(--color-foreground);
		}

		.app {
			display: flex;
			flex-direction: column;
			height: 100%;

			/* Lets the header respond to the panel width, not the viewport */
			container: settings-app / inline-size;
		}

		.header {
			display: flex;
			flex: none;
			gap: var(--gl-space-16);
			align-items: center;
			justify-content: space-between;
			padding: 1.2rem 1.8rem;
			border-bottom: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
		}

		.header__brand {
			display: flex;
			gap: 0.9rem;
			align-items: center;

			gl-icon-cube {
				--gl-icon-cube-size: 2rem;
			}
		}

		.header__title {
			margin: 0;
			font-size: 1.6rem;
			font-weight: 600;
			line-height: 1;
			white-space: nowrap;
		}

		.header__version {
			font-size: 1.05rem;
			color: var(--color-foreground--50);
			white-space: nowrap;
			text-decoration: none;
		}

		.header__version:hover,
		.header__version:focus-visible {
			color: var(--color-link-foreground);
			text-decoration: underline;
		}

		.header__search {
			position: relative;
			flex: 1;
			max-width: 42rem;
		}

		.header__search code-icon {
			position: absolute;
			top: 50%;
			left: 1rem;
			color: var(--color-foreground--50);
			pointer-events: none;
			transform: translateY(-50%);
		}

		.header__search input {
			width: 100%;
			padding: 0.7rem 0.9rem 0.7rem 3rem;
			font-family: var(--vscode-font-family);
			font-size: 1.25rem;
			color: var(--vscode-input-foreground);
			outline: none;
			background-color: var(--vscode-input-background);
			border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
			border-radius: var(--gl-input-border-radius);
		}

		.header__search input::placeholder {
			color: var(--vscode-input-placeholderForeground);
		}

		.header__search input:focus {
			${iW}
		}

		.header__scope {
			display: flex;
			gap: var(--gl-space-8);
			align-items: center;
			font-size: 1.2rem;
			color: var(--color-foreground--65);
			white-space: nowrap;
		}

		/* Narrow panel: drop the search onto its own full-width line below the
   title/scope row (ordered last so the title + scope share the first row) */
		@container settings-app (max-width: 768px) {
			.header {
				flex-wrap: wrap;
			}

			.header__search {
				flex-basis: 100%;
				order: 1;
				max-width: none;
			}
		}

		.body {
			flex: 1;
			min-height: 0;
		}

		/* Initial-load gate — mirrors the two-pane layout so the real UI doesn't shift in */
		.body--loading {
			display: flex;
			overflow: hidden;
		}

		.body--loading__nav {
			flex: none;
			width: 24rem;
			padding: 1.6rem 1.4rem;
			background-color: var(--vscode-sideBar-background);
			border-right: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
		}

		.body--loading__detail {
			flex: 1;
			max-width: 64rem;
			padding: 2rem 2.6rem;
		}

		/* Bootstrap failure — persists even if the error banner is dismissed */
		.body--error {
			display: flex;
			gap: var(--gl-space-8);
			align-items: flex-start;
			padding: 2.4rem 2.6rem;
			font-size: 1.3rem;
			line-height: 1.5;
		}

		.body--error code-icon {
			flex: none;
			margin-block-start: var(--gl-space-2);
			color: var(--vscode-errorForeground);
		}

		.body--error a {
			color: var(--color-link-foreground);
		}

		.body__nav {
			background-color: var(--vscode-sideBar-background);
			border-right: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
		}

		.body__detail {
			display: flex;
			flex-direction: column;
			min-width: 0;
		}

		.body__detail gl-settings-detail {
			flex: 1;
			min-height: 0;
		}
	`];var iX=((eI=iX||{}).Jira="jira",eI.Linear="linear",eI.Trello="trello",eI);let iJ="__rk",iZ="__ts",iQ=new Set(["__v",iJ,iZ]);function i0(t,o){return null==o?`command:${t}`:`command:${t}?${encodeURIComponent("string"==typeof o?o:JSON.stringify(o))}`}let i1=new Set(["http:","https:","mailto:","command:"]);function i2(t){let o=/\[([^\]]+)\]\(([^()\s]+)\)/g,i=o.exec(t);if(null==i)return t;let r=[],a=0;do{i.index>a&&r.push(t.substring(a,i.index));let[,o,n]=i;r.push(!function(t){let o=t.trim(),i=/^([a-z][a-z0-9+.-]*:)/i.exec(o);return null!=i?i1.has(i[1].toLowerCase()):!o.includes(":")}(n)?i[0]:ed`<a href=${n}>${o}</a>`),a=i.index+i[0].length}while(null!=(i=o.exec(t)))return a<t.length&&r.push(t.substring(a)),r}let i4=w`
	border: var(--gl-border-width) solid var(--gl-elevation-border-color, var(--vscode-contrastBorder));
	box-shadow: var(--gl-elevation);
`;let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(t){if(super(t),this.it=em,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===em||null==t)return this._t=void 0,this.it=t;if(t===ep)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let i3=tl(unsafe_html_e);var i5=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},i6=w`
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
`,i8=Object.defineProperty,i7=Object.getOwnPropertyDescriptor,i9=t=>{throw TypeError(t)},re=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?i7(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&i8(o,i,n),n},rt=(t,o,i)=>o.has(t)||i9("Cannot "+i),ro=w`
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
`,ri=/;\s+$/;function rr(t){let{property:o,value:i,element:r}=t;if(i){let t=r.getAttribute("style")||"";t&&(t.match(ri)||(t+=";"),t+=" ");let a=`${o}: ${i}`;if(t.includes(a))return;return`${t}${a};`}return null}var ra=class extends lit_element_i{constructor(){let t;super(),(t=eB).has(this)?i9("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(this):t.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,o)=>{if(this.internals?.states)try{o?this.internals.states.add(t):this.internals.states.delete(t)}catch(t){if(String(t).includes("must start with '--'"));else throw t}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{}for(let[t,o]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===o.default&&void 0!==o.initial&&"string"==typeof t&&this.customStates.set(`initial-${t}-${o.initial}`,!0)}static get styles(){return[ro,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))})}attributeChangedCallback(t,o,i){let r,a;if(rt(this,r=eB,"read from private field"),a?!a.call(this):!r.get(this)){let t,o;this.constructor.elementProperties.forEach((t,o)=>{t.reflect&&null!=this[o]&&this.initialReflectedProperties.set(o,this[o])}),rt(this,t=eB,"write to private field"),o?o.call(this,!0):t.set(this,!0)}super.attributeChangedCallback(t,o,i)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((o,i)=>{t.has(i)&&null==this[i]&&(this[i]=o)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(t){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=t,this.dispatchEvent(o)}throw t}}setStyle(t,o){if(!this.style){let i=rr({property:t.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`),value:o,element:this});i&&this.setAttribute("style",i);return}this.style[t]=o}setStyleProperty(t,o){if(!this.style){let i=rr({property:t,value:o,element:this});i&&this.setAttribute("style",i);return}this.style.setProperty(t,o)}relayNativeEvent(t,o){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...o}))}};eB=new WeakMap,re([e$()],ra.prototype,"dir",2),re([e$()],ra.prototype,"lang",2),re([e$({type:Boolean,reflect:!0,attribute:"did-ssr"})],ra.prototype,"didSSR",2);let rn=new Set,rs=new Map,rl="ltr",rc="en",rd="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(rd){let t=new MutationObserver(ru);rl=document.documentElement.dir||"ltr",rc=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function rh(...t){t.map(t=>{let o=t.$code.toLowerCase();rs.has(o)?rs.set(o,Object.assign(Object.assign({},rs.get(o)),t)):rs.set(o,t),c||(c=t)}),ru()}function ru(){rd&&(rl=document.documentElement.dir||"ltr",rc=document.documentElement.lang||navigator.language),[...rn.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){rn.add(this.host)}hostDisconnected(){rn.delete(this.host)}dir(){return`${this.host.dir||rl}`.toLowerCase()}lang(){return`${this.host.lang||rc}`.toLowerCase()}getTranslationData(t){var o,i;let r;try{r=new Intl.Locale(t.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let a=r.language.toLowerCase(),n=null!=(i=null==(o=r.region)?void 0:o.toLowerCase())?i:"",c=rs.get(`${a}-${n}`),h=rs.get(a);return{locale:r,language:a,region:n,primary:c,secondary:h}}exists(t,o){var i;let{primary:r,secondary:a}=this.getTranslationData(null!=(i=o.lang)?i:this.lang());return o=Object.assign({includeFallback:!1},o),!!r&&!!r[t]||!!a&&!!a[t]||!!o.includeFallback&&!!c&&!!c[t]}term(t,...o){let i,{primary:r,secondary:a}=this.getTranslationData(this.lang());if(r&&r[t])i=r[t];else if(a&&a[t])i=a[t];else{if(!c||!c[t])return String(t);i=c[t]}return"function"==typeof i?i(...o):i}date(t,o){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),o).format(t)}number(t,o){return isNaN(t=Number(t))?"":new Intl.NumberFormat(this.lang(),o).format(t)}relativeTime(t,o,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,o)}};var rp={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",captions:"Captions",chooseDate:"Choose date",chooseDecade:"Choose decade",chooseMonth:"Choose month",chooseYear:"Choose year",clearEntry:"Clear entry",close:"Close",closeCalendar:"Close calendar",createOption:t=>`Create "${t}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",date:"Date",datePickerKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",day:"Day",incompleteDate:"Enter a valid date.",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",empty:"Empty",endDate:"End date",error:"Error",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",goToSlide:(t,o)=>`Go to slide ${t} of ${o}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",month:"Month",moreOptions:"More Options",mute:"Mute",nextDecade:"Next decade",nextMonth:"Next month",nextSlide:"Next slide",nextVideo:"Next Video",nextYear:"Next year",numCharacters:t=>1===t?"1 character":`${t} characters`,numCharactersRemaining:t=>1===t?"1 character remaining":`${t} characters remaining`,numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",play:"Play",playbackSpeed:"Playback speed",playlist:"Playlist",playAnimation:"Play animation",previousDecade:"Previous decade",previousMonth:"Previous month",previousSlide:"Previous slide",previousVideo:"Previous video",previousYear:"Previous year",progress:"Progress",rangeTooLong:t=>1===t?"Select a range no longer than 1 day":`Select a range no longer than ${t} days`,rangeTooShort:t=>1===t?"Select a range at least 1 day long":`Select a range at least ${t} days long`,readonly:"Read-only",selected:"Selected",selectedDateLabel:t=>`Selected: ${t}`,selectedRangeLabel:t=>`Selected range: ${t}`,selectionCleared:"Selection cleared",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,startDate:"Start date",today:"Today",toggleColorFormat:"Toggle color format",seek:"Seek",seekProgress:(t,o)=>`${t} of ${o}`,currentlyPlaying:"currently playing",unmute:"Unmute",videoPlayer:"Video player",volume:"Volume",year:"Year",zoomIn:"Zoom in",zoomOut:"Zoom out",am:"AM",chooseTime:"Choose time",closeTimeInput:"Close time picker",dayPeriod:"AM/PM",hour:"Hour",minute:"Minute",now:"Now",pm:"PM",second:"Second",time:"Time",timeInputKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the time picker."};rh(rp);var rm=class extends LocalizeController{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||"en":super.lang()}};rh(rp);let rg=Math.min,rb=Math.max,rf=Math.round,rv=Math.floor,rw=t=>({x:t,y:t}),ry={left:"right",right:"left",bottom:"top",top:"bottom"};function rk(t,o){return"function"==typeof t?t(o):t}function rx(t){return t.split("-")[0]}function rC(t){return t.split("-")[1]}function r_(t){return"x"===t?"y":"x"}function r$(t){return"y"===t?"height":"width"}function rS(t){let o=t[0];return"t"===o||"b"===o?"y":"x"}function rL(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}let rA=["left","right"],rz=["right","left"],rE=["top","bottom"],rR=["bottom","top"];function rP(t){let o=rx(t);return ry[o]+t.slice(o.length)}function rI(t){return"number"!=typeof t?{top:0,right:0,bottom:0,left:0,...t}:{top:t,right:t,bottom:t,left:t}}function rM(t){let{x:o,y:i,width:r,height:a}=t;return{width:r,height:a,top:i,left:o,right:o+r,bottom:i+a,x:o,y:i}}function rO(t,o,i){let r,{reference:a,floating:n}=t,c=rS(o),h=r_(rS(o)),u=r$(h),p=rx(o),m="y"===c,g=a.x+a.width/2-n.width/2,b=a.y+a.height/2-n.height/2,f=a[u]/2-n[u]/2;switch(p){case"top":r={x:g,y:a.y-n.height};break;case"bottom":r={x:g,y:a.y+a.height};break;case"right":r={x:a.x+a.width,y:b};break;case"left":r={x:a.x-n.width,y:b};break;default:r={x:a.x,y:a.y}}switch(rC(o)){case"start":r[h]-=f*(i&&m?-1:1);break;case"end":r[h]+=f*(i&&m?-1:1)}return r}async function rT(t,o){var i;void 0===o&&(o={});let{x:r,y:a,platform:n,rects:c,elements:h,strategy:u}=t,{boundary:p="clippingAncestors",rootBoundary:m="viewport",elementContext:g="floating",altBoundary:b=!1,padding:f=0}=rk(o,t),v=rI(f),w=h[b?"floating"===g?"reference":"floating":g],x=rM(await n.getClippingRect({element:null==(i=await (null==n.isElement?void 0:n.isElement(w)))||i?w:w.contextElement||await (null==n.getDocumentElement?void 0:n.getDocumentElement(h.floating)),boundary:p,rootBoundary:m,strategy:u})),C="floating"===g?{x:r,y:a,width:c.floating.width,height:c.floating.height}:c.reference,_=await (null==n.getOffsetParent?void 0:n.getOffsetParent(h.floating)),$=await (null==n.isElement?void 0:n.isElement(_))&&await (null==n.getScale?void 0:n.getScale(_))||{x:1,y:1},S=rM(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:h,rect:C,offsetParent:_,strategy:u}):C);return{top:(x.top-S.top+v.top)/$.y,bottom:(S.bottom-x.bottom+v.bottom)/$.y,left:(x.left-S.left+v.left)/$.x,right:(S.right-x.right+v.right)/$.x}}let rD=async(t,o,i)=>{let{placement:r="bottom",strategy:a="absolute",middleware:n=[],platform:c}=i,h=c.detectOverflow?c:{...c,detectOverflow:rT},u=await (null==c.isRTL?void 0:c.isRTL(o)),p=await c.getElementRects({reference:t,floating:o,strategy:a}),{x:m,y:g}=rO(p,r,u),b=r,f=0,v={};for(let i=0;i<n.length;i++){let w=n[i];if(!w)continue;let{name:x,fn:C}=w,{x:_,y:$,data:S,reset:A}=await C({x:m,y:g,initialPlacement:r,placement:b,strategy:a,middlewareData:v,rects:p,platform:h,elements:{reference:t,floating:o}});m=null!=_?_:m,g=null!=$?$:g,v[x]={...v[x],...S},A&&f<50&&(f++,"object"==typeof A&&(A.placement&&(b=A.placement),A.rects&&(p=!0===A.rects?await c.getElementRects({reference:t,floating:o,strategy:a}):A.rects),{x:m,y:g}=rO(p,b,u)),i=-1)}return{x:m,y:g,placement:b,strategy:a,middlewareData:v}},rB=new Set(["left","top"]);async function rF(t,o){let{placement:i,platform:r,elements:a}=t,n=await (null==r.isRTL?void 0:r.isRTL(a.floating)),c=rx(i),h=rC(i),u="y"===rS(i),p=rB.has(c)?-1:1,m=n&&u?-1:1,g=rk(o,t),{mainAxis:b,crossAxis:f,alignmentAxis:v}="number"==typeof g?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:g.mainAxis||0,crossAxis:g.crossAxis||0,alignmentAxis:g.alignmentAxis};return h&&"number"==typeof v&&(f="end"===h?-1*v:v),u?{x:f*m,y:b*p}:{x:b*p,y:f*m}}function rq(){return"u">typeof window}function rV(t){return rU(t)?(t.nodeName||"").toLowerCase():"#document"}function rW(t){var o;return(null==t||null==(o=t.ownerDocument)?void 0:o.defaultView)||window}function rj(t){var o;return null==(o=(rU(t)?t.ownerDocument:t.document)||window.document)?void 0:o.documentElement}function rU(t){return!!rq()&&(t instanceof Node||t instanceof rW(t).Node)}function rN(t){return!!rq()&&(t instanceof Element||t instanceof rW(t).Element)}function rH(t){return!!rq()&&(t instanceof HTMLElement||t instanceof rW(t).HTMLElement)}function rG(t){return!(!rq()||"u"<typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof rW(t).ShadowRoot)}function rK(t){let{overflow:o,overflowX:i,overflowY:r,display:a}=r2(t);return/auto|scroll|overlay|hidden|clip/.test(o+r+i)&&"inline"!==a&&"contents"!==a}function rY(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}let rX=/transform|translate|scale|rotate|perspective|filter/,rJ=/paint|layout|strict|content/,rZ=t=>!!t&&"none"!==t;function rQ(t){let o=rN(t)?r2(t):t;return rZ(o.transform)||rZ(o.translate)||rZ(o.scale)||rZ(o.rotate)||rZ(o.perspective)||!r0()&&(rZ(o.backdropFilter)||rZ(o.filter))||rX.test(o.willChange||"")||rJ.test(o.contain||"")}function r0(){return null==h&&(h="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),h}function r1(t){return/^(html|body|#document)$/.test(rV(t))}function r2(t){return rW(t).getComputedStyle(t)}function r4(t){return rN(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function r3(t){if("html"===rV(t))return t;let o=t.assignedSlot||t.parentNode||rG(t)&&t.host||rj(t);return rG(o)?o.host:o}function r5(t,o,i){var r;void 0===o&&(o=[]),void 0===i&&(i=!0);let a=function t(o){let i=r3(o);return r1(i)?o.ownerDocument?o.ownerDocument.body:o.body:rH(i)&&rK(i)?i:t(i)}(t),n=a===(null==(r=t.ownerDocument)?void 0:r.body),c=rW(a);if(!n)return o.concat(a,r5(a,[],i));{let t=r6(c);return o.concat(c,c.visualViewport||[],rK(a)?a:[],t&&i?r5(t):[])}}function r6(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function r8(t){let o=r2(t),i=parseFloat(o.width)||0,r=parseFloat(o.height)||0,a=rH(t),n=a?t.offsetWidth:i,c=a?t.offsetHeight:r,h=rf(i)!==n||rf(r)!==c;return h&&(i=n,r=c),{width:i,height:r,$:h}}function r7(t){return rN(t)?t:t.contextElement}function r9(t){let o=r7(t);if(!rH(o))return rw(1);let i=o.getBoundingClientRect(),{width:r,height:a,$:n}=r8(o),c=(n?rf(i.width):i.width)/r,h=(n?rf(i.height):i.height)/a;return c&&Number.isFinite(c)||(c=1),h&&Number.isFinite(h)||(h=1),{x:c,y:h}}let ae=rw(0);function at(t){let o=rW(t);return r0()&&o.visualViewport?{x:o.visualViewport.offsetLeft,y:o.visualViewport.offsetTop}:ae}function ao(t,o,i,r){var a;void 0===o&&(o=!1),void 0===i&&(i=!1);let n=t.getBoundingClientRect(),c=r7(t),h=rw(1);o&&(r?rN(r)&&(h=r9(r)):h=r9(t));let u=(void 0===(a=i)&&(a=!1),r&&(!a||r===rW(c))&&a)?at(c):rw(0),p=(n.left+u.x)/h.x,m=(n.top+u.y)/h.y,g=n.width/h.x,b=n.height/h.y;if(c){let t=rW(c),o=r&&rN(r)?rW(r):r,i=t,a=r6(i);for(;a&&r&&o!==i;){let t=r9(a),o=a.getBoundingClientRect(),r=r2(a),n=o.left+(a.clientLeft+parseFloat(r.paddingLeft))*t.x,c=o.top+(a.clientTop+parseFloat(r.paddingTop))*t.y;p*=t.x,m*=t.y,g*=t.x,b*=t.y,p+=n,m+=c,a=r6(i=rW(a))}}return rM({width:g,height:b,x:p,y:m})}function ai(t,o){let i=r4(t).scrollLeft;return o?o.left+i:ao(rj(t)).left+i}function ar(t,o){let i=t.getBoundingClientRect();return{x:i.left+o.scrollLeft-ai(t,i),y:i.top+o.scrollTop}}function aa(t,o,i){var r;let a;if("viewport"===o)a=function(t,o){let i=rW(t),r=rj(t),a=i.visualViewport,n=r.clientWidth,c=r.clientHeight,h=0,u=0;if(a){n=a.width,c=a.height;let t=r0();(!t||t&&"fixed"===o)&&(h=a.offsetLeft,u=a.offsetTop)}let p=ai(r);if(p<=0){let t=r.ownerDocument,o=t.body,i=getComputedStyle(o),a="CSS1Compat"===t.compatMode&&parseFloat(i.marginLeft)+parseFloat(i.marginRight)||0,c=Math.abs(r.clientWidth-o.clientWidth-a);c<=25&&(n-=c)}else p<=25&&(n+=p);return{width:n,height:c,x:h,y:u}}(t,i);else if("document"===o){let o,i,n,c,h,u,p;r=rj(t),o=rj(r),i=r4(r),n=r.ownerDocument.body,c=rb(o.scrollWidth,o.clientWidth,n.scrollWidth,n.clientWidth),h=rb(o.scrollHeight,o.clientHeight,n.scrollHeight,n.clientHeight),u=-i.scrollLeft+ai(r),p=-i.scrollTop,"rtl"===r2(n).direction&&(u+=rb(o.clientWidth,n.clientWidth)-c),a={width:c,height:h,x:u,y:p}}else if(rN(o)){let t,r,n,c,h,u;r=(t=ao(o,!0,"fixed"===i)).top+o.clientTop,n=t.left+o.clientLeft,c=rH(o)?r9(o):rw(1),h=o.clientWidth*c.x,u=o.clientHeight*c.y,a={width:h,height:u,x:n*c.x,y:r*c.y}}else{let i=at(t);a={x:o.x-i.x,y:o.y-i.y,width:o.width,height:o.height}}return rM(a)}function an(t){return"static"===r2(t).position}function as(t,o){if(!rH(t)||"fixed"===r2(t).position)return null;if(o)return o(t);let i=t.offsetParent;return rj(t)===i&&(i=i.ownerDocument.body),i}function al(t,o){var i;let r=rW(t);if(rY(t))return r;if(!rH(t)){let o=r3(t);for(;o&&!r1(o);){if(rN(o)&&!an(o))return o;o=r3(o)}return r}let a=as(t,o);for(;a&&(i=a,/^(table|td|th)$/.test(rV(i)))&&an(a);)a=as(a,o);return a&&r1(a)&&an(a)&&!rQ(a)?r:a||function(t){let o=r3(t);for(;rH(o)&&!r1(o);){if(rQ(o))return o;if(rY(o))break;o=r3(o)}return null}(t)||r}let ac=async function(t){let o=this.getOffsetParent||al,i=this.getDimensions,r=await i(t.floating);return{reference:function(t,o,i){let r=rH(o),a=rj(o),n="fixed"===i,c=ao(t,!0,n,o),h={scrollLeft:0,scrollTop:0},u=rw(0);if(r||!r&&!n)if(("body"!==rV(o)||rK(a))&&(h=r4(o)),r){let t=ao(o,!0,n,o);u.x=t.x+o.clientLeft,u.y=t.y+o.clientTop}else a&&(u.x=ai(a));n&&!r&&a&&(u.x=ai(a));let p=!a||r||n?rw(0):ar(a,h);return{x:c.left+h.scrollLeft-u.x-p.x,y:c.top+h.scrollTop-u.y-p.y,width:c.width,height:c.height}}(t.reference,await o(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},ad={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:o,rect:i,offsetParent:r,strategy:a}=t,n="fixed"===a,c=rj(r),h=!!o&&rY(o.floating);if(r===c||h&&n)return i;let u={scrollLeft:0,scrollTop:0},p=rw(1),m=rw(0),g=rH(r);if((g||!g&&!n)&&(("body"!==rV(r)||rK(c))&&(u=r4(r)),g)){let t=ao(r);p=r9(r),m.x=t.x+r.clientLeft,m.y=t.y+r.clientTop}let b=!c||g||n?rw(0):ar(c,u);return{width:i.width*p.x,height:i.height*p.y,x:i.x*p.x-u.scrollLeft*p.x+m.x+b.x,y:i.y*p.y-u.scrollTop*p.y+m.y+b.y}},getDocumentElement:rj,getClippingRect:function(t){let{element:o,boundary:i,rootBoundary:r,strategy:a}=t,n=[..."clippingAncestors"===i?rY(o)?[]:function(t,o){let i=o.get(t);if(i)return i;let r=r5(t,[],!1).filter(t=>rN(t)&&"body"!==rV(t)),a=null,n="fixed"===r2(t).position,c=n?r3(t):t;for(;rN(c)&&!r1(c);){let o=r2(c),i=rQ(c);i||"fixed"!==o.position||(a=null),(n?i||a:!(!i&&"static"===o.position&&a&&("absolute"===a.position||"fixed"===a.position)||rK(c)&&!i&&function t(o,i){let r=r3(o);return!(r===i||!rN(r)||r1(r))&&("fixed"===r2(r).position||t(r,i))}(t,c)))?a=o:r=r.filter(t=>t!==c),c=r3(c)}return o.set(t,r),r}(o,this._c):[].concat(i),r],c=aa(o,n[0],a),h=c.top,u=c.right,p=c.bottom,m=c.left;for(let t=1;t<n.length;t++){let i=aa(o,n[t],a);h=rb(i.top,h),u=rg(i.right,u),p=rg(i.bottom,p),m=rb(i.left,m)}return{width:u-m,height:p-h,x:m,y:h}},getOffsetParent:al,getElementRects:ac,getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){let{width:o,height:i}=r8(t);return{width:o,height:i}},getScale:r9,isElement:rN,isRTL:function(t){return"rtl"===r2(t).direction}};function ah(t,o){return t.x===o.x&&t.y===o.y&&t.width===o.width&&t.height===o.height}let au=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(o){var i,r;let a,n,{placement:c,rects:h,platform:u,elements:p}=o,{apply:m=()=>{},...g}=rk(t,o),b=await u.detectOverflow(o,g),f=rx(c),v=rC(c),w="y"===rS(c),{width:x,height:C}=h.floating;"top"===f||"bottom"===f?(a=f,n=v===(await (null==u.isRTL?void 0:u.isRTL(p.floating))?"start":"end")?"left":"right"):(n=f,a="end"===v?"top":"bottom");let _=C-b.top-b.bottom,$=x-b.left-b.right,S=rg(C-b[a],_),A=rg(x-b[n],$),E=!o.middlewareData.shift,P=S,M=A;if(null!=(i=o.middlewareData.shift)&&i.enabled.x&&(M=$),null!=(r=o.middlewareData.shift)&&r.enabled.y&&(P=_),E&&!v){let t=rb(b.left,0),o=rb(b.right,0),i=rb(b.top,0),r=rb(b.bottom,0);w?M=x-2*(0!==t||0!==o?t+o:rb(b.left,b.right)):P=C-2*(0!==i||0!==r?i+r:rb(b.top,b.bottom))}await m({...o,availableWidth:M,availableHeight:P});let O=await u.getDimensions(p.floating);return x!==O.width||C!==O.height?{reset:{rects:!0}}:{}}}};function ap(t){var o=t;for(let t=o;t;t=am(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=am(o);t;t=am(t)){if(!(t instanceof Element))continue;let o=getComputedStyle(t);if("contents"!==o.display&&("static"!==o.position||rQ(o)||"BODY"===t.tagName))return t}return null}function am(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}let ag=tl(class extends directive_i{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(o=>t[o]).join(" ")+" "}update(t,[o]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t))),o)o[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(o)}let i=t.element.classList;for(let t of this.st)t in o||(i.remove(t),this.st.delete(t));for(let t in o){let r=!!o[t];r===this.st.has(t)||this.nt?.has(t)||(r?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return ep}});function ab(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}var af=!!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),av=class extends ra{constructor(){super(...arguments),this.localize=new rm(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let t=this.anchorEl.getBoundingClientRect(),o=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),r=0,a=0,n=0,c=0,h=0,u=0,p=0,m=0;i?t.top<o.top?(r=t.left,a=t.bottom,n=t.right,c=t.bottom,h=o.left,u=o.top,p=o.right,m=o.top):(r=o.left,a=o.bottom,n=o.right,c=o.bottom,h=t.left,u=t.top,p=t.right,m=t.top):t.left<o.left?(r=t.right,a=t.top,n=o.left,c=o.top,h=t.right,u=t.bottom,p=o.left,m=o.bottom):(r=o.right,a=o.top,n=t.left,c=t.top,h=o.right,u=o.bottom,p=t.left,m=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${a}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${m}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=af,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||ab(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=function(t,o,i,r){let a;void 0===r&&(r={});let{ancestorScroll:n=!0,ancestorResize:c=!0,elementResize:h="function"==typeof ResizeObserver,layoutShift:u="function"==typeof IntersectionObserver,animationFrame:p=!1}=r,m=r7(t),g=n||c?[...m?r5(m):[],...o?r5(o):[]]:[];g.forEach(t=>{n&&t.addEventListener("scroll",i,{passive:!0}),c&&t.addEventListener("resize",i)});let b=m&&u?function(t,o){let i,r=null,a=rj(t);function n(){var t;clearTimeout(i),null==(t=r)||t.disconnect(),r=null}return!function c(h,u){void 0===h&&(h=!1),void 0===u&&(u=1),n();let p=t.getBoundingClientRect(),{left:m,top:g,width:b,height:f}=p;if(h||o(),!b||!f)return;let v={rootMargin:-rv(g)+"px "+-rv(a.clientWidth-(m+b))+"px "+-rv(a.clientHeight-(g+f))+"px "+-rv(m)+"px",threshold:rb(0,rg(1,u))||1},w=!0;function x(o){let r=o[0].intersectionRatio;if(r!==u){if(!w)return c();r?c(!1,r):i=setTimeout(()=>{c(!1,1e-7)},1e3)}1!==r||ah(p,t.getBoundingClientRect())||c(),w=!1}try{r=new IntersectionObserver(x,{...v,root:a.ownerDocument})}catch{r=new IntersectionObserver(x,v)}r.observe(t)}(!0),n}(m,i):null,f=-1,v=null;h&&(v=new ResizeObserver(t=>{let[r]=t;r&&r.target===m&&v&&o&&(v.unobserve(o),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var t;null==(t=v)||t.observe(o)})),i()}),m&&!p&&v.observe(m),o&&v.observe(o));let w=p?ao(t):null;return p&&function o(){let r=ao(t);w&&!ah(w,r)&&i(),w=r,a=requestAnimationFrame(o)}(),i(),()=>{var t;g.forEach(t=>{n&&t.removeEventListener("scroll",i),c&&t.removeEventListener("resize",i)}),null==b||b(),null==(t=v)||t.disconnect(),v=null,p&&cancelAnimationFrame(a)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){var t,o,i,r,a,n;let c,h,u,p,m;if(!this.active||!this.anchorEl||!this.popup)return;let g=[{name:"offset",options:t={mainAxis:this.distance,crossAxis:this.skidding},async fn(o){var i,r;let{x:a,y:n,placement:c,middlewareData:h}=o,u=await rF(o,t);return c===(null==(i=h.offset)?void 0:i.placement)&&null!=(r=h.arrow)&&r.alignmentOffset?{}:{x:a+u.x,y:n+u.y,data:{...u,placement:c}}}}];this.sync?g.push(au({apply:({rects:t})=>{let o="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=o?`${t.reference.width}px`:"",this.popup.style.height=i?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.SUPPORTS_POPOVER&&!ab(this.anchor)&&"scroll"===this.boundary&&(c=r5(this.anchorEl).filter(t=>t instanceof Element)),this.flip&&g.push({name:"flip",options:o={boundary:this.flipBoundary||c,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(t){var i,r,a,n,c,h,u,p;let m,g,b,{placement:f,middlewareData:v,rects:w,initialPlacement:x,platform:C,elements:_}=t,{mainAxis:$=!0,crossAxis:S=!0,fallbackPlacements:A,fallbackStrategy:E="bestFit",fallbackAxisSideDirection:P="none",flipAlignment:M=!0,...O}=rk(o,t);if(null!=(i=v.arrow)&&i.alignmentOffset)return{};let T=rx(f),D=rS(x),B=rx(x)===x,F=await (null==C.isRTL?void 0:C.isRTL(_.floating)),q=A||(B||!M?[rP(x)]:(m=rP(x),[rL(x),m,rL(m)])),V="none"!==P;!A&&V&&q.push(...(g=rC(x),b=function(t,o,i){switch(t){case"top":case"bottom":if(i)return o?rz:rA;return o?rA:rz;case"left":case"right":return o?rE:rR;default:return[]}}(rx(x),"start"===P,F),g&&(b=b.map(t=>t+"-"+g),M&&(b=b.concat(b.map(rL)))),b));let W=[x,...q],j=await C.detectOverflow(t,O),U=[],N=(null==(r=v.flip)?void 0:r.overflows)||[];if($&&U.push(j[T]),S){let t,o,i,r,a=(h=f,u=w,void 0===(p=F)&&(p=!1),t=rC(h),i=r$(o=r_(rS(h))),r="x"===o?t===(p?"end":"start")?"right":"left":"start"===t?"bottom":"top",u.reference[i]>u.floating[i]&&(r=rP(r)),[r,rP(r)]);U.push(j[a[0]],j[a[1]])}if(N=[...N,{placement:f,overflows:U}],!U.every(t=>t<=0)){let t=((null==(a=v.flip)?void 0:a.index)||0)+1,o=W[t];if(o&&("alignment"!==S||D===rS(o)||N.every(t=>rS(t.placement)!==D||t.overflows[0]>0)))return{data:{index:t,overflows:N},reset:{placement:o}};let i=null==(n=N.filter(t=>t.overflows[0]<=0).sort((t,o)=>t.overflows[1]-o.overflows[1])[0])?void 0:n.placement;if(!i)switch(E){case"bestFit":{let t=null==(c=N.filter(t=>{if(V){let o=rS(t.placement);return o===D||"y"===o}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,o)=>t+o,0)]).sort((t,o)=>t[1]-o[1])[0])?void 0:c[0];t&&(i=t);break}case"initialPlacement":i=x}if(f!==i)return{reset:{placement:i}}}return{}}}),this.shift&&g.push({name:"shift",options:i={boundary:this.shiftBoundary||c,padding:this.shiftPadding},async fn(t){let{x:o,y:r,placement:a,platform:n}=t,{mainAxis:c=!0,crossAxis:h=!1,limiter:u={fn:t=>{let{x:o,y:i}=t;return{x:o,y:i}}},...p}=rk(i,t),m={x:o,y:r},g=await n.detectOverflow(t,p),b=rS(rx(a)),f=r_(b),v=m[f],w=m[b];if(c){let t="y"===f?"top":"left",o="y"===f?"bottom":"right",i=v+g[t],r=v-g[o];v=rb(i,rg(v,r))}if(h){let t="y"===b?"top":"left",o="y"===b?"bottom":"right",i=w+g[t],r=w-g[o];w=rb(i,rg(w,r))}let x=u.fn({...t,[f]:v,[b]:w});return{...x,data:{x:x.x-o,y:x.y-r,enabled:{[f]:c,[b]:h}}}}}),this.autoSize?g.push(au({boundary:this.autoSizeBoundary||c,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:o})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&g.push({name:"arrow",options:h={element:this.arrowEl,padding:this.arrowPadding},async fn(t){let{x:o,y:i,placement:r,rects:a,platform:n,elements:c,middlewareData:u}=t,{element:p,padding:m=0}=rk(h,t)||{};if(null==p)return{};let g=rI(m),b={x:o,y:i},f=r_(rS(r)),v=r$(f),w=await n.getDimensions(p),x="y"===f,C=x?"clientHeight":"clientWidth",_=a.reference[v]+a.reference[f]-b[f]-a.floating[v],$=b[f]-a.reference[f],S=await (null==n.getOffsetParent?void 0:n.getOffsetParent(p)),A=S?S[C]:0;A&&await (null==n.isElement?void 0:n.isElement(S))||(A=c.floating[C]||a.floating[v]);let E=A/2-w[v]/2-1,P=rg(g[x?"top":"left"],E),M=rg(g[x?"bottom":"right"],E),O=A-w[v]-M,T=A/2-w[v]/2+(_/2-$/2),D=rb(P,rg(T,O)),B=!u.arrow&&null!=rC(r)&&T!==D&&a.reference[v]/2-(T<P?P:M)-w[v]/2<0,F=B?T<P?T-P:T-O:0;return{[f]:b[f]+F,data:{[f]:D,centerOffset:T-D-F,...B&&{alignmentOffset:F}},reset:B}}});let b=this.SUPPORTS_POPOVER?t=>ad.getOffsetParent(t,ap):ad.getOffsetParent;(r=this.anchorEl,a=this.popup,n={placement:this.placement,middleware:g,strategy:this.SUPPORTS_POPOVER?"absolute":"fixed",platform:{...ad,getOffsetParent:b}},u=new Map,m={...(p={platform:ad,...n}).platform,_c:u},rD(r,a,{...p,platform:m})).then(({x:t,y:o,middlewareData:i,placement:r})=>{let a="rtl"===this.localize.dir(),n={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${t}px`,top:`${o}px`}),this.arrow){let t=i.arrow.x,o=i.arrow.y,r="",c="",h="",u="";if("start"===this.arrowPlacement){let i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r="number"==typeof o?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",c=a?i:"",u=a?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";c=a?"":i,u=a?i:"",h="number"==typeof o?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(u="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",r="number"==typeof o?"calc(50% - var(--arrow-size-diagonal))":""):(u="number"==typeof t?`${t}px`:"",r="number"==typeof o?`${o}px`:"");Object.assign(this.arrowEl.style,{top:r,right:c,bottom:h,left:u,[n]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new i5)}render(){return ed`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${ag({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${ag({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?ed`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};av.css=i6,re([eA(".popup")],av.prototype,"popup",2),re([eA(".arrow")],av.prototype,"arrowEl",2),re([e$({attribute:!1,type:Boolean})],av.prototype,"SUPPORTS_POPOVER",2),re([e$()],av.prototype,"anchor",2),re([e$({type:Boolean,reflect:!0})],av.prototype,"active",2),re([e$({reflect:!0})],av.prototype,"placement",2),re([e$()],av.prototype,"boundary",2),re([e$({type:Number})],av.prototype,"distance",2),re([e$({type:Number})],av.prototype,"skidding",2),re([e$({type:Boolean})],av.prototype,"arrow",2),re([e$({attribute:"arrow-placement"})],av.prototype,"arrowPlacement",2),re([e$({attribute:"arrow-padding",type:Number})],av.prototype,"arrowPadding",2),re([e$({type:Boolean})],av.prototype,"flip",2),re([e$({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],av.prototype,"flipFallbackPlacements",2),re([e$({attribute:"flip-fallback-strategy"})],av.prototype,"flipFallbackStrategy",2),re([e$({type:Object})],av.prototype,"flipBoundary",2),re([e$({attribute:"flip-padding",type:Number})],av.prototype,"flipPadding",2),re([e$({type:Boolean})],av.prototype,"shift",2),re([e$({type:Object})],av.prototype,"shiftBoundary",2),re([e$({attribute:"shift-padding",type:Number})],av.prototype,"shiftPadding",2),re([e$({attribute:"auto-size"})],av.prototype,"autoSize",2),re([e$()],av.prototype,"sync",2),re([e$({type:Object})],av.prototype,"autoSizeBoundary",2),re([e$({attribute:"auto-size-padding",type:Number})],av.prototype,"autoSizePadding",2),re([e$({attribute:"hover-bridge",type:Boolean})],av.prototype,"hoverBridge",2),av=re([eC("wa-popup")],av);var aw=Object.defineProperty,ay=Object.getOwnPropertyDescriptor,ak=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?ay(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&aw(o,i,n),n};let ax=0,aC=[],a_=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.showDelay=500,this.hideDelay=0,this.suppressed=!1,this.open=!1,this.bodyId=`gl-tooltip-${++ax}`,this.onAnchorSlotChange=t=>{let o=t.target.assignedElements({flatten:!0})[0];o!==this.anchorEl&&(this.detachAnchor(),this.attachAnchor(o))},this.onDocumentKeyDown=t=>{"Escape"===t.key&&this.open&&aC.at(-1)===this&&(t.preventDefault(),t.stopPropagation(),this.open=!1)},this.onMouseOver=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!0},this.showDelay))},this.onMouseOut=()=>{this.anchorEl?.matches(":hover")||this.matches(":hover")||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!1},this.hideDelay))},this.onFocusIn=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.open=!0)},this.onFocusOut=()=>{clearTimeout(this.hoverTimeout),this.open=!1},this.onMouseDown=t=>{this.suppressed=!0,this.open=!1},this.onMouseUp=t=>{this.suppressed=!1},this.onDragStart=t=>{this.suppressed=!0,this.open=!1},this.onDragEnd=t=>{this.suppressed=!1},this.onClick=t=>{this.hideOnClick&&(this.open=!1)}}connectedCallback(){super.connectedCallback?.(),this.eventController=new AbortController;let{signal:t}=this.eventController;this.addEventListener("mouseover",this.onMouseOver,{signal:t}),this.addEventListener("mouseout",this.onMouseOut,{signal:t}),this.addEventListener("focusin",this.onFocusIn,{signal:t}),this.addEventListener("focusout",this.onFocusOut,{signal:t}),this.addEventListener("mousedown",this.onMouseDown,{signal:t}),this.addEventListener("click",this.onClick,{signal:t}),window.addEventListener("mouseup",this.onMouseUp,{signal:t}),window.addEventListener("dragstart",this.onDragStart,{capture:!0,signal:t}),window.addEventListener("dragend",this.onDragEnd,{capture:!0,signal:t})}disconnectedCallback(){this.eventController?.abort(),this.eventController=void 0,this.detachAnchor(),this.unregisterDismissible(),clearTimeout(this.hoverTimeout),super.disconnectedCallback?.()}updated(t){t.has("open")&&(this.open?this.registerDismissible():this.unregisterDismissible()),t.has("disabled")&&this.disabled&&this.open&&(this.open=!1)}attachAnchor(t){null!=t&&(this.anchorEl=t,this.addAriaDescribedBy(t,this.bodyId))}detachAnchor(){null!=this.anchorEl&&(this.removeAriaDescribedBy(this.anchorEl,this.bodyId),this.anchorEl=void 0)}addAriaDescribedBy(t,o){let i=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);i.includes(o)||(i.push(o),t.setAttribute("aria-describedby",i.join(" ")))}removeAriaDescribedBy(t,o){let i=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean).filter(t=>t!==o);0===i.length?t.removeAttribute("aria-describedby"):t.setAttribute("aria-describedby",i.join(" "))}registerDismissible(){aC.includes(this)||(aC.push(this),document.addEventListener("keydown",this.onDocumentKeyDown,{signal:this.eventController?.signal}))}unregisterDismissible(){let t=aC.indexOf(this);-1!==t&&aC.splice(t,1),document.removeEventListener("keydown",this.onDocumentKeyDown)}async hide(){this.open=!1,await this.updateComplete}async show(){this.disabled||this.suppressed||(this.open=!0,await this.updateComplete)}render(){var t;return ed`<wa-popup
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
				<slot name="content">${t=this.content,t?.includes(`
`)?i3(t.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):t}</slot>
			</div>
		</wa-popup>`}};a_.styles=w`
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

			${i4}
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
	`,ak([e$()],a_.prototype,"content",2),ak([e$({reflect:!0})],a_.prototype,"placement",2),ak([e$({type:Boolean})],a_.prototype,"disabled",2),ak([e$({type:Number})],a_.prototype,"distance",2),ak([e$({type:Number,attribute:"show-delay"})],a_.prototype,"showDelay",2),ak([e$({type:Number,attribute:"hide-delay"})],a_.prototype,"hideDelay",2),ak([e$({type:Boolean,attribute:"hide-on-click"})],a_.prototype,"hideOnClick",2),ak([eA("wa-popup")],a_.prototype,"popup",2),ak([eS()],a_.prototype,"suppressed",2),ak([eS()],a_.prototype,"open",2),a_=ak([eC("gl-tooltip")],a_);var a$=Object.defineProperty,aS=Object.getOwnPropertyDescriptor,aL=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?aS(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&a$(o,i,n),n};let aA=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1,this.ariaLabel=null}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(t){if(t.has("href")&&this.setAttribute("role",this.href?"link":"button"),t.has("disabled")){let o=t.get("disabled");o?this.setAttribute("aria-disabled",o.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(t)}render(){return this.tooltip?ed`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??em}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?ed`<gl-tooltip placement=${this.tooltipPlacement??em}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?ed`<a
				class="control"
				aria-label=${this.ariaLabel??em}
				tabindex="${(!1===this.disabled?void 0:-1)??em}"
				href=${this.href}
				@keypress=${t=>this.onLinkKeypress(t)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:ed`<button
			class="control"
			role=${this.role??em}
			aria-label=${this.ariaLabel??em}
			aria-checked=${this.ariaChecked??em}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(t){" "===t.key&&this.control.click()}focus(t){this.control.focus(t)}blur(){this.control.blur()}click(){this.control.click()}};aA.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},aA.styles=[iN,w`
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
				${ij}
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
		`],aL([eA(".control")],aA.prototype,"control",2),aL([e$({reflect:!0})],aA.prototype,"appearance",2),aL([e$({reflect:!0})],aA.prototype,"variant",2),aL([e$({type:Boolean,reflect:!0})],aA.prototype,"disabled",2),aL([e$({reflect:!0})],aA.prototype,"density",2),aL([e$({type:Boolean,reflect:!0})],aA.prototype,"full",2),aL([e$()],aA.prototype,"href",2),aL([e$()],aA.prototype,"tooltip",2),aL([e$()],aA.prototype,"tooltipPlacement",2),aL([e$({type:Boolean,reflect:!0})],aA.prototype,"truncate",2),aL([e$({type:String,attribute:"aria-label"})],aA.prototype,"ariaLabel",2),aA=aL([eC("gl-button")],aA);let az=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a","add-small":"\\ec7b","remove-small":"\\ec7c","worktree-small":"\\ec7d",worktree:"\\ec7e","screen-cut":"\\ec7f",ask:"\\ec80",openai:"\\ec81",claude:"\\ec82","open-in-window":"\\ec83","new-session":"\\ec84"}),aE=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147","diff-right":"\\f11b","diff-left":"\\f12e","accept-right":"\\f12f","accept-left":"\\f130","accept-all-right":"\\f131","accept-all-left":"\\f132",continue:"\\f148",skip:"\\f149",abort:"\\f14a",pause:"\\f14b","kanban-view":"\\f14c","filter-mixed":"\\f14d","start-new":"\\f14e",merge:"\\f14f"});var aR=Object.defineProperty,aP=Object.getOwnPropertyDescriptor,aI=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?aP(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&aR(o,i,n),n};function aM(t,o=""){return v(Object.entries(t).map(([t,i])=>(function(t,o,i=""){return`:host([icon='${i}${t}'])::before { content: '${o}'; }`})(t,i,o)).join(""))}let aO=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(t){t.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(t)}};aO.styles=w`
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

		${aM(az)}

		${aM(aE,"gl-")}

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
	`,aI([e$({reflect:!0})],aO.prototype,"icon",2),aI([e$({reflect:!0})],aO.prototype,"modifier",2),aI([e$({type:Number})],aO.prototype,"size",2),aI([e$({reflect:!0})],aO.prototype,"flip",2),aI([e$({reflect:!0})],aO.prototype,"rotate",2),aO=aI([eC("code-icon")],aO);var aT=Object.defineProperty,aD=Object.getOwnPropertyDescriptor,aB=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?aD(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&aT(o,i,n),n};let aF=["top","right","bottom","left","top-left","top-right","bottom-left","bottom-right"],aq=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.autoSizeVertical=!1,this.skidding=0,this.trigger="hover focus",this.suppressed=!1,this.handleReposition=()=>{let t=this.popup?.getAttribute("data-current-placement");null!=t&&t!==this._resolvedPlacement&&(this._resolvedPlacement=t)},this.handleResizePointerDown=t=>{if(0!==t.button)return;let o=t.currentTarget,i=o.dataset.handle;if(null==i)return;t.preventDefault();let r="right"===i||"top-right"===i||"bottom-right"===i,a="left"===i||"top-left"===i||"bottom-left"===i,n="bottom"===i||"bottom-left"===i||"bottom-right"===i,c="top"===i||"top-left"===i||"top-right"===i,h=this.body,u=t.clientX,p=t.clientY,m=h.getBoundingClientRect(),g=m.width,b=m.height;o.setPointerCapture(t.pointerId),o.classList.add("popover__resizer--active"),this.toggleAttribute("dragging",!0);let f=t=>{let o=t.clientX-u,i=t.clientY-p;r?h.style.width=`${Math.max(0,g+o)}px`:a&&(h.style.width=`${Math.max(0,g-o)}px`),n?h.style.height=`${Math.max(0,b+i)}px`:c&&(h.style.height=`${Math.max(0,b-i)}px`),this.popup?.reposition()},v=()=>{this.toggleAttribute("dragging",!1),o.classList.remove("popover__resizer--active"),o.removeEventListener("pointermove",f),o.removeEventListener("lostpointercapture",v),o.removeEventListener("pointerup",v)};o.addEventListener("pointermove",f,{passive:!0}),o.addEventListener("lostpointercapture",v),o.addEventListener("pointerup",v)},this.handleTriggerBlur=t=>{this.open&&(this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&(t.relatedTarget&&this.contains(t.relatedTarget)||this.hide())},this.handleTriggerClick=t=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(t.composedPath().includes(this.body))return;this.hide()}else this._skipHideOnClick=!1,this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=t=>{let o=this.hasTrigger("focus")||this.hasTrigger("focus-visible");this.hasTrigger("click")&&o&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,!this.open||"hover"!==this._triggeredBy||this.hasTrigger("click")||t.composedPath().includes(this.body)||(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=t=>{let o=this.hasTrigger("focus"),i=this.hasTrigger("focus-visible");if(o||i){if(!o&&i){let o=t.target;if(null==o||"function"!=typeof o.matches||!o.matches(":focus-visible"))return}this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus")}},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handlePopupBlur=t=>{let o=t.composedPath();o.includes(this)||o.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=t=>{let o=t.composedPath();o.includes(this)||o.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let t=oa(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let t=oa(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),t)}}}static closeOthers(t){for(let o of aq.openPopovers)o===t||function(t,o){let i=o;for(;null!=i;){if(i===t)return!0;i=i.parentNode??(i instanceof ShadowRoot?i.host:null)}return!1}(o,t)||o.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,aq.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),this.updateResizeObserver()}updateResizeObserver(){null!=this.resize?null==this.resizeObserver&&null!=this.body&&(this.resizeObserver=new ResizeObserver(()=>this.popup?.reposition()),this.resizeObserver.observe(this.body)):null!=this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}render(){let t=this._resolvedPlacement??this.placement,o=(function(t){if(!t)return[];let o=new Set;for(let i of t.trim().split(/\s+/))switch(i){case"horizontal":o.add("right");break;case"vertical":o.add("bottom");break;case"both":o.add("right"),o.add("bottom"),o.add("bottom-right");break;case"all":for(let t of aF)o.add(t);break;default:aF.includes(i)&&o.add(i)}return[...o]})(this.resize).filter(o=>!function(t,o){let i,r;if(!o)return!1;let[a,n]=o.split("-");switch(a){case"top":i="bottom";break;case"right":i="left";break;case"bottom":i="top";break;case"left":i="right"}let c="left"===a||"right"===a;"start"===n?r=c?"top":"left":"end"===n&&(r=c?"bottom":"right");let h=o=>null!=o&&(t===o||t.startsWith(`${o}-`)||t.endsWith(`-${o}`));return h(i)||h(r)}(o,t));return ed`<wa-popup
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
				${o.map(t=>ed`<div
							class="popover__resizer popover__resizer--${t}"
							role="separator"
							aria-orientation=${"top"===t||"bottom"===t?"horizontal":"vertical"}
							aria-label="Resize"
							data-handle=${t}
							@pointerdown=${this.handleResizePointerDown}
						></div>`)}
			</div>
		</wa-popup>`}async show(t){if(this.open||this.suppressed){"click"===t&&"hover"===this._triggeredBy&&(this._triggeredBy=t);return}return(null==this._triggeredBy||"hover"!==t)&&(this._triggeredBy=t),aq.closeOthers(this),this.open=!0,aq.openPopovers.add(this),on(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,aq.openPopovers.delete(this),on(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(t){return this.trigger.split(" ").includes(t)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus")||this.hasTrigger("focus-visible"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleResizeChange(){this.updateResizeObserver()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};aq.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},aq.openPopovers=new Set,aq.styles=[iK,w`
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

				${i4}
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
		`],aB([eA("#popover")],aq.prototype,"body",2),aB([eA("wa-popup")],aq.prototype,"popup",2),aB([e$({reflect:!0})],aq.prototype,"placement",2),aB([e$({type:Object})],aq.prototype,"anchor",2),aB([e$({reflect:!0,type:Boolean})],aq.prototype,"disabled",2),aB([e$({type:Number})],aq.prototype,"distance",2),aB([e$({reflect:!0,type:Boolean})],aq.prototype,"open",2),aB([e$({reflect:!0,type:Boolean})],aq.prototype,"arrow",2),aB([e$({reflect:!0,type:Boolean,attribute:"auto-size-vertical"})],aq.prototype,"autoSizeVertical",2),aB([e$({reflect:!0})],aq.prototype,"resize",2),aB([e$({type:Number})],aq.prototype,"skidding",2),aB([e$()],aq.prototype,"trigger",2),aB([e$({reflect:!0})],aq.prototype,"appearance",2),aB([eS()],aq.prototype,"suppressed",2),aB([eS()],aq.prototype,"_resolvedPlacement",2),aB([tM("open",{afterFirstUpdate:!0})],aq.prototype,"handleOpenChange",1),aB([tM(["distance","placement","skidding"])],aq.prototype,"handleOptionsChange",1),aB([tM("resize",{afterFirstUpdate:!0})],aq.prototype,"handleResizeChange",1),aB([tM("disabled")],aq.prototype,"handleDisabledChange",1),aq=aB([eC("gl-popover")],aq);var aV=Object.defineProperty,aW=Object.getOwnPropertyDescriptor,aj=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?aW(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&aV(o,i,n),n};let aU=new Date().getTimezoneOffset()/60*100,aN=new Date(`Wed Jul 25 2018 19:18:00 GMT${aU>=0?"-":"+"}${String(Math.abs(aU)).padStart(4,"0")}`),aH=[{token:"id",label:"Commit SHA"},{token:"author",label:"Commit Author"},{token:"authorFirst",label:"Commit Author First Name"},{token:"authorLast",label:"Commit Author Last Name"},{token:"authorNotYou",label:"Commit Author (except you)"},{token:"email",label:"Commit Author E-mail"},{token:"message",label:"Commit Message"},{token:"ago",label:"Commit or Authored Date — relative"},{token:"date",label:"Commit or Authored Date — absolute"},{token:"agoOrDate",label:"Commit or Authored Date — based on date setting"},{token:"agoOrDateShort",label:"Commit or Authored Date (short)"},{token:"authorAgo",label:"Authored Date — relative"},{token:"authorDate",label:"Authored Date — absolute"},{token:"authorAgoOrDate",label:"Authored Date — based on date setting"},{token:"authorAgoOrDateShort",label:"Authored Date (short)"},{token:"committerAgo",label:"Commit Date — relative"},{token:"committerDate",label:"Commit Date — absolute"},{token:"committerAgoOrDate",label:"Commit Date — based on date setting"},{token:"committerAgoOrDateShort",label:"Commit Date (short)"},{token:"tips",label:"Branch & Tag Tips"},{token:"changes",label:"Changes Indicator, e.g. +1 ~3 -0"},{token:"changesShort",label:"Changes Indicator (short), e.g. +1~3"},{token:"pullRequest",label:"Pull Request that introduced the commit"},{token:"pullRequestState",label:"Pull Request State (open, merged, closed)"}],aG=[{token:"YYYY",label:"Year, 4-digit (2018)"},{token:"YY",label:"Year, 2-digit (18)"},{token:"MMMM",label:"Month, full (July)"},{token:"MMM",label:"Month, short (Jul)"},{token:"MM",label:"Month, 2-digit (07)"},{token:"Do",label:"Day of month, ordinal (25th)"},{token:"DD",label:"Day of month, 2-digit (25)"},{token:"D",label:"Day of month (25)"},{token:"dddd",label:"Day of week, full (Wednesday)"},{token:"ddd",label:"Day of week, short (Wed)"},{token:"HH",label:"Hour, 24-hour 2-digit (19)"},{token:"hh",label:"Hour, 12-hour 2-digit (07)"},{token:"h",label:"Hour, 12-hour (7)"},{token:"mm",label:"Minute, 2-digit (18)"},{token:"ss",label:"Second, 2-digit (00)"},{token:"a",label:"am / pm"},{token:"A",label:"AM / PM"},{token:"Z",label:"UTC offset (+01:00)"}],aK=class extends ts(lit_element_i){constructor(){super(...arguments),this.disabled=!1,this._example="",this.requestCommitPreview=os(t=>{let o=this.descriptor;if(o.preview?.type!=="commit"&&o.preview?.type!=="commit-uncommitted")return;let i=o.key;this.actions?.generateFormatPreview(i,o.preview.type,t).then(t=>{this.descriptor.key===i&&(this._example=t)}).catch(()=>{})},200)}get value(){return this._draft??String(this._state.getSettingValue(this.descriptor.key)??"")}willUpdate(){this.descriptor.key!==this._lastDescriptorKey&&(this._lastDescriptorKey=this.descriptor.key,this._draft=void 0,this._example="")}updated(){this.updateExample()}updateExample(){let t=this.descriptor.preview;if(null==t)return;let o=this.value;switch(t.type){case"commit":case"commit-uncommitted":if(o||(o=t.default??(null!=t.defaultLookup?this._state.getSettingValue(t.defaultLookup)??"":"")),!o){this._example="";return}this.requestCommitPreview(o);break;case"date":o||(o=(null!=t.defaultLookup?this._state.getSettingValue(t.defaultLookup):void 0)??t.default??"");try{this._example=tq(aN,o,void 0,!1)}catch(t){this._example=t instanceof Error?t.message:String(t)}break;case"date-locale":{let i=(null!=t.defaultLookup?this._state.getSettingValue(t.defaultLookup):void 0)??t.default??"MMMM Do, YYYY h:mma";try{this._example=tq(aN,i,o||void 0,!1)}catch(t){this._example=t instanceof Error?t.message:String(t)}}}}commit(){if(void 0===this._draft)return;let t=this._draft;this._draft=void 0,this.actions?.applyText(this.descriptor.key,t,this.descriptor.defaultValue)}handleInput(t){this._draft=t.target.value}handleKeyDown(t){"Enter"===t.key?this.commit():"Escape"===t.key&&void 0!==this._draft&&(this._draft=void 0)}handleFocusOut(t){let o=t.relatedTarget;null!=o&&(this.renderRoot.contains(o)||this.contains(o))||this.commit()}get tokenMode(){return this.descriptor.preview?.type==="date"?"date":!0===this.descriptor.tokens?"commit":void 0}insertToken(t){let o=this._input,i=o.selectionStart??o.value.length,r=o.selectionEnd??i,a=o.value;this._draft=a.substring(0,i)+t+a.substring(r),this.updateComplete.then(()=>{o.focus();let r=i+t.length;o.setSelectionRange(r,r)})}render(){let t=this.descriptor,o=this.tokenMode,i="date"===o?aG:"commit"===o?aH:void 0;return ed`<label class="label" for="input">${t.label}</label>
			<div class="field" @focusout=${this.handleFocusOut}>
				<input
					id="input"
					type="text"
					spellcheck="false"
					.value=${this.value}
					placeholder=${t.placeholder??em}
					?disabled=${this.disabled}
					@input=${this.handleInput}
					@keydown=${this.handleKeyDown}
				/>
				${null!=i?ed`<gl-popover trigger="click" placement="bottom-end">
							<button
								slot="anchor"
								type="button"
								class="tokens-trigger"
								aria-label="Insert a token"
								?disabled=${this.disabled}
							>
								<code-icon icon="chevron-down" aria-hidden="true"></code-icon>
							</button>
							<div slot="content" class="tokens" role="group" aria-label="Available tokens">
								<h3 class="tokens__title">Insert token</h3>
								${i.map(t=>{let i="date"===o?t.token:"${"+t.token+"}";return ed`<button
										type="button"
										class="token"
										@click=${()=>this.insertToken(i)}
									>
										<code>${i}</code><span>${t.label}</span>
									</button>`})}
								<span class="tokens__hint">
									<a href=${"date"===o?"https://momentjs.com/docs/#/displaying/format/":"https://github.com/gitkraken/vscode-gitlens/wiki/Custom-Formatting"} title="Open formatting docs">Learn more</a>
									about formatting options
								</span>
							</div>
						</gl-popover>`:em}
			</div>
			${null!=t.preview?ed`<p class="example" aria-live="polite" aria-atomic="true">
						<span>Example:</span>
						<span class="example__text">${this._example||"—"}</span>
					</p>`:em}`}};aK.styles=[iH,w`
			:host {
				display: block;
			}

			.label {
				display: block;
				margin-block-end: 0.7rem;
				font-size: 1.25rem;
				font-weight: 600;
				color: var(--color-foreground);
			}

			.field {
				display: flex;
				max-width: var(--gl-max-input);
				overflow: hidden;
				background-color: var(--vscode-input-background);
				border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
				border-radius: var(--gl-input-border-radius, 0.4rem);
			}

			.field:focus-within {
				${iW}
			}

			input {
				flex: 1;
				min-width: 0;
				padding: 0.7rem 0.9rem;
				font-family: var(--vscode-editor-font-family);
				font-size: 1.25rem;
				color: var(--vscode-input-foreground);
				outline: none;
				background: transparent;
				border: none;
			}

			input::placeholder {
				color: var(--vscode-input-placeholderForeground);
			}

			.tokens-trigger {
				flex: none;
				padding: 0 var(--gl-space-8);
				color: var(--color-foreground--75);
				cursor: pointer;
				background: transparent;
				border: none;
				border-left: var(--gl-border-width) solid var(--vscode-input-border, transparent);
			}

			.tokens-trigger:hover {
				background-color: var(--vscode-toolbar-hoverBackground);
			}

			.tokens-trigger:focus-visible {
				${iW}
			}

			.tokens {
				display: flex;
				flex-direction: column;
				min-width: 32rem;
				max-height: 30rem;
				overflow-y: auto;
			}

			.tokens__title {
				padding: 0.5rem 0.9rem;
				margin: 0;
				font-size: 1.05rem;
				font-weight: 400;
				color: var(--color-foreground--50);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			.token {
				display: flex;
				gap: var(--gl-space-12);
				align-items: center;
				justify-content: space-between;
				width: 100%;
				padding: 0.5rem 0.9rem;
				text-align: left;
				cursor: pointer;
				background: transparent;
				border: none;
				border-radius: var(--gl-radius-sm);
			}

			.token:hover,
			.token:focus-visible {
				background-color: var(--vscode-list-hoverBackground);
			}

			.token:focus-visible {
				${iW}
			}

			.token code {
				font-family: var(--vscode-editor-font-family);
				font-size: 1.15rem;
				color: var(--gl-chip-filtered-text-color, var(--color-link-foreground));
			}

			.token span {
				font-size: 1.1rem;
				color: var(--color-foreground--65);
			}

			.tokens__hint {
				padding: 0.6rem 0.9rem;
				font-size: 1.1rem;
				color: var(--color-foreground--65);
			}

			.example {
				display: flex;
				gap: var(--gl-space-6);
				align-items: baseline;
				margin-block-start: 0.7rem;
				font-size: 1.15rem;
				color: var(--color-foreground--65);
			}

			.example__text {
				font-style: italic;
				color: var(--color-foreground--85);
			}
		`],aj([p({context:"settingsState"})],aK.prototype,"_state",2),aj([e$({attribute:!1})],aK.prototype,"descriptor",2),aj([e$({attribute:!1})],aK.prototype,"actions",2),aj([e$({type:Boolean})],aK.prototype,"disabled",2),aj([eA("input")],aK.prototype,"_input",2),aj([eS()],aK.prototype,"_draft",2),aj([eS()],aK.prototype,"_example",2),aK=aj([eC("gl-format-input")],aK);let aY="important",aX=` !${aY}`,aJ=0-aX.length;let CspStyleMapDirective=class CspStyleMapDirective extends directive_i{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `cspStyleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return ep}update(t,[o]){let i=t.element.style,r=this._previous??=new Map;for(let t of r.keys())null==o[t]&&(r.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(let t in o){let a=o[t];if(null==a)continue;let n="string"==typeof a&&a.endsWith(aX),c=n?a.slice(0,aJ):String(a);r.get(t)!==c&&(r.set(t,c),t.includes("-")||n?i.setProperty(t,c,n?aY:""):i[t]=c)}return ep}};let aZ=tl(CspStyleMapDirective);var aQ=Object.defineProperty,a0=Object.getOwnPropertyDescriptor,a1=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?a0(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&aQ(o,i,n),n};let a2=class extends lit_element_i{constructor(){super(...arguments),this.lines=1}render(){return ed`<div class="skeleton" style=${aZ({"--skeleton-lines":String(this.lines)})}></div>`}};a2.styles=w`
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
	`,a1([e$({type:Number})],a2.prototype,"lines",2),a2=a1([eC("skeleton-loader")],a2);var a4=Object.defineProperty,a3=Object.getOwnPropertyDescriptor,a5=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?a3(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&a4(o,i,n),n};let a6=class extends ts(lit_element_i){get ai(){return this._state.aiState.get()}render(){let t=this.ai;return null==t?this._state.serviceErrors.get().ai?ed`<div class="error" role="alert">
					<code-icon icon="error" aria-hidden="true"></code-icon>
					<span>Couldn’t load AI status.</span>
					<gl-button appearance="secondary" @click=${()=>void this.actions?.loadSharedServices()}
						>Retry</gl-button
					>
				</div>`:ed`<skeleton-loader lines="4"></skeleton-loader>`:t.orgEnabled?t.enabled?ed`<ul class="rows">
			${this.renderModelRow()}${this.renderMcpRow(t)}${this.renderDefaultAgentRow(t)}${this.renderHooksRow(t)}
		</ul>`:ed`<p class="note">
				<code-icon icon="info" aria-hidden="true"></code-icon>
				<span>AI features are currently disabled — use the switch above to enable them.</span>
			</p>`:ed`<p class="note">
				<code-icon icon="org" aria-hidden="true"></code-icon>
				<span>AI features have been disabled by your GitKraken admin.</span>
			</p>`}renderModelRow(){let t=this._state.aiModel.get(),o=null==t&&this._state.serviceErrors.get().ai;return ed`<li class="row row--${null!=t?"connected":"disconnected"}">
			<code-icon
				class="row__icon"
				icon="${null!=t?"sparkle-filled":"sparkle"}"
				aria-hidden="true"
			></code-icon>
			<span class="row__content">
				<span class="row__title">${t?.provider.name??"AI Provider & Model"}</span>
				<span class="row__details"
					>${t?.name??(o?"Couldn’t load the current model":"Select an AI model to enable AI features")}</span
				>
			</span>
			<span class="row__actions">
				<gl-button
					appearance="secondary"
					href="${i0("gitlens.ai.switchProvider",{source:"settings",detail:"integrations"})}"
					tooltip="Switch AI Provider/Model"
					><code-icon icon="arrow-swap" slot="prefix" aria-hidden="true"></code-icon> Switch Model</gl-button
				>
			</span>
		</li>`}renderMcpRow(t){let{mcp:o}=t,i=o.settingEnabled&&o.installed;return ed`<li class="row row--${i?"connected":"disconnected"}">
			<code-icon class="row__icon" icon="mcp" aria-hidden="true"></code-icon>
			<span class="row__content">
				<span class="row__title">GitKraken MCP</span>
				<span class="row__details"
					>${o.settingEnabled?"Leverage Git & Integrations in AI chats":"GitKraken MCP has been disabled via settings"}</span
				>
			</span>
			<span class="row__actions">
				${!o.settingEnabled?ed`<gl-button
							appearance="secondary"
							href="${i0("gitlens.ai.mcp.install",{source:"settings",detail:"integrations"})}"
							tooltip="Re-enable GitKraken MCP"
							><code-icon icon="unlock" slot="prefix" aria-hidden="true"></code-icon> Re-enable</gl-button
						>`:o.installed?ed`<gl-button
									appearance="secondary"
									href="${i0("gitlens.ai.mcp.selectAgents",{source:"settings",detail:"integrations"})}"
									tooltip="Connect More Agents"
									><code-icon icon="plug" slot="prefix" aria-hidden="true"></code-icon> Connect
									Agents</gl-button
								>
								<gl-button
									appearance="secondary"
									href="${i0("gitlens.ai.mcp.reinstall",{source:"settings",detail:"integrations"})}"
									tooltip="Reinstall GitKraken MCP"
									><code-icon icon="sync" slot="prefix" aria-hidden="true"></code-icon>
									Reinstall</gl-button
								>
								<span class="row__status"
									><code-icon icon="check" aria-hidden="true"></code-icon> Installed${o.bundled?" (bundled)":""}</span
								>`:ed`<gl-button
								appearance="secondary"
								href="${i0("gitlens.ai.mcp.install",{source:"settings",detail:"integrations"})}"
								tooltip="Install GitKraken MCP"
								><code-icon icon="plug" slot="prefix" aria-hidden="true"></code-icon> Install</gl-button
							>`}
			</span>
		</li>`}renderDefaultAgentRow(t){let o=t.defaultAgent;return ed`<li class="row row--${null!=o?"connected":"disconnected"}">
			<code-icon class="row__icon" icon="robot" aria-hidden="true"></code-icon>
			<span class="row__content">
				<span class="row__title">Default Coding Agent</span>
				<span class="row__details">${null!=o?o.label:"No default agent selected"}</span>
			</span>
			<span class="row__actions">
				<gl-button
					appearance="secondary"
					href="${i0("gitlens.agents.switchDefaultAgent")}"
					tooltip="Switch Default Agent"
					><code-icon icon="arrow-swap" slot="prefix" aria-hidden="true"></code-icon> Switch Agent</gl-button
				>
			</span>
		</li>`}renderHooksRow(t){let o=t.hooks.claude;return o.supported&&o.detected?ed`<li class="row row--${o.installed?"connected":"disconnected"}">
			<code-icon class="row__icon" icon="search-sparkle" aria-hidden="true"></code-icon>
			<span class="row__content">
				<span class="row__title">GitKraken Claude Code Hooks</span>
				<span class="row__details"
					>${o.installed?"Installed — Claude surfaces agent status":"Configure Claude to surface agent status"}</span
				>
			</span>
			<span class="row__actions">
				${o.installed?ed`<gl-button
							appearance="secondary"
							href="${i0("gitlens.agents.uninstallClaudeHook")}"
							tooltip="Uninstall Claude Hooks"
							><code-icon icon="debug-disconnect" slot="prefix" aria-hidden="true"></code-icon>
							Uninstall</gl-button
						>`:ed`<gl-button
							appearance="secondary"
							href="${i0("gitlens.agents.installClaudeHook")}"
							tooltip="Install Claude Hooks"
							><code-icon icon="plug" slot="prefix" aria-hidden="true"></code-icon> Install</gl-button
						>`}
			</span>
		</li>`:em}};a6.styles=[iH,iG,w`
			:host {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-12);

				/* Semantic success token so custom/high-contrast themes keep contrast */
				--status-color--connected: var(--vscode-testing-iconPassed, var(--vscode-charts-green));
			}

			.note {
				display: flex;
				gap: var(--gl-space-8);
				padding: var(--gl-space-10) var(--gl-space-12);
				font-size: 1.2rem;
				line-height: 1.5;
				color: var(--color-foreground--85);
				background-color: color-mix(in srgb, var(--color-alert-infoBackground) 60%, transparent);
				border: var(--gl-border-width) solid color-mix(in srgb, var(--color-alert-infoBorder) 70%, transparent);
				border-radius: var(--gl-radius-md);
			}

			.note code-icon {
				flex: none;
				margin-block-start: var(--gl-space-2);
			}

			.rows {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-8);
				padding: 0;
				margin: 0;
				list-style: none;
			}

			.row {
				display: flex;
				gap: var(--gl-space-10);
				align-items: center;
				padding: 0.9rem 1.1rem;
				border: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
				border-radius: var(--gl-radius-md);
			}

			.row__icon {
				flex: none;
				font-size: 1.6rem;
			}

			.row--disconnected .row__icon {
				color: var(--color-foreground--25);
			}

			.row__content {
				flex: 1 1 auto;
				min-width: 0;
			}

			.row__title {
				display: block;
				font-size: 1.25rem;
				color: var(--color-foreground);
			}

			.row__details {
				display: block;
				font-size: 1.1rem;
				color: var(--color-foreground--65);
			}

			.row--disconnected .row__title,
			.row--disconnected .row__details {
				color: var(--color-foreground--50);
			}

			.row__actions {
				display: flex;
				flex: none;
				gap: var(--gl-space-6);
				align-items: center;
			}

			.row__status {
				display: flex;
				gap: 0.5rem;
				align-items: center;
				font-size: 1.15rem;
				color: var(--status-color--connected);
			}

			.error {
				display: flex;
				gap: var(--gl-space-8);
				align-items: center;
				padding: var(--gl-space-10) var(--gl-space-12);
				font-size: 1.2rem;
				line-height: 1.5;
				color: var(--color-foreground--85);
				background-color: color-mix(in srgb, var(--color-alert-errorBackground) 60%, transparent);
				border: var(--gl-border-width) solid color-mix(in srgb, var(--color-alert-errorBorder) 70%, transparent);
				border-radius: var(--gl-radius-md);
			}

			.error span {
				flex: 1;
			}
		`],a5([p({context:"settingsState"})],a6.prototype,"_state",2),a5([e$({attribute:!1})],a6.prototype,"actions",2),a6=a5([eC("gl-settings-ai")],a6);var a8=Object.defineProperty,a7=Object.getOwnPropertyDescriptor,a9=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?a7(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&a8(o,i,n),n};let ne=class extends ts(lit_element_i){constructor(){super(...arguments),this.addDraftRule=()=>{null==this._draft&&(this._draft={prefix:"",url:"",alphanumeric:!1,ignoreCase:!1,title:null},this._draftIndex=void 0),this.updateComplete.then(()=>{let t=Math.min(this.draftRowIndex??0,this.autolinks.length);this.renderRoot.querySelector(`.rule[data-index="${t}"] .rule__prefix`)?.focus()})}}get autolinks(){return this._state.getSettingValue("autolinks")??[]}willUpdate(){if(null!=this._draft&&null!=this._draftIndex){var t,o;let i=this.autolinks[this._draftIndex];null!=i&&(t=i,o=this._draft,t.prefix===o.prefix&&t.url===o.url&&(t.alphanumeric??!1)===(o.alphanumeric??!1)&&(t.ignoreCase??!1)===(o.ignoreCase??!1))&&(this._draft=void 0,this._draftIndex=void 0)}}get draftRowIndex(){if(null!=this._draft)return this._draftIndex??this.autolinks.length}commitRule(t,o,i){if(t===this.draftRowIndex){let t={...this._draft,[o]:i};if(this._draft=t,!t.prefix&&!t.url)return;this._draftIndex??=this.autolinks.length,this.actions?.applyAutolinkRule(this._draftIndex,t);return}this.actions?.applyAutolinkChange(t,o,i)}removeRule(t){if(t===this.draftRowIndex){let t=this._draftIndex;this._draft=void 0,this._draftIndex=void 0,null!=t&&this.actions?.removeAutolink(t)}else this.actions?.removeAutolink(t);this.updateComplete.then(()=>{let o=t>0?this.renderRoot.querySelector(`.rule[data-index="${t-1}"] .rule__delete`):null;(o??this._addButton)?.focus()})}renderIntegrationsBanner(){if(void 0===this._state.subscription.get()||void 0===this._state.cloudIntegrations.get())return em;let t=this._state.hasAccount.get(),o=this._state.hasConnectedJira.get(),i=this._state.hasConnectedLinear.get();if(o&&i)return ed`<p class="banner banner--connected">
				<code-icon icon="check" aria-hidden="true"></code-icon>
				<span>Jira and Linear are connected — issue keys in commit messages link automatically.</span>
			</p>`;let r=(t,o)=>ed`<a
				href=${i0("gitlens.plus.cloudIntegrations.connect",{integrationIds:[t],source:{source:"settings",detail:{action:"connect",integration:t}}})}
				>${o}</a
			>`;return ed`<p class="banner">
			<code-icon icon="info" aria-hidden="true"></code-icon>
			<span>
				${t?"Connect":"Sign up and connect"}
				${o?em:r(iX.Jira,"Jira")}
				${!o&&!i?" or ":em}
				${i?em:r(iX.Linear,"Linear")} to
				automatically link issues in commit messages.
			</span>
		</p>`}renderRule(t,o){var i;let r,a,n=(r=(i=t).prefix??"",a=i.url??"",{url:(r.length>0||a.length>0)&&!a.includes("<num>"),prefix:a.length>0&&0===r.length}),c=`autolink-${o}-prefix-error`,h=`autolink-${o}-url-error`,u=t.prefix?.trim()||"New",p=!t.ignoreCase,m=t.alphanumeric??!1;return ed`<div class="rule" data-index=${o}>
			<span class="rule__prefix-field">
				<input
					class="rule__prefix ${n.prefix?"rule__prefix--invalid":""}"
					type="text"
					placeholder="TICKET-"
					spellcheck="false"
					aria-label="${u} autolink prefix"
					aria-invalid=${n.prefix?"true":"false"}
					aria-describedby=${n.prefix?c:em}
					.value=${t.prefix??""}
					@blur=${t=>this.commitRule(o,"prefix",t.target.value)}
				/>
				<span class="rule__toggles">
					<button
						type="button"
						class="rule__toggle"
						aria-pressed=${p?"true":"false"}
						aria-label="Case-sensitive"
						title="Case-sensitive matching"
						@click=${()=>this.commitRule(o,"ignoreCase",p)}
					>
						Aa
					</button>
					<button
						type="button"
						class="rule__toggle"
						aria-pressed=${m?"true":"false"}
						aria-label="Alphanumeric"
						title="Match alphanumeric references"
						@click=${()=>this.commitRule(o,"alphanumeric",!m)}
					>
						a1
					</button>
				</span>
			</span>
			<input
				class="rule__url ${n.url?"rule__url--invalid":""}"
				type="text"
				placeholder="https://example.com/TICKET?q=&lt;num&gt;"
				spellcheck="false"
				aria-label="${u} autolink URL"
				aria-invalid=${n.url?"true":"false"}
				aria-describedby=${n.url?h:em}
				.value=${t.url??""}
				@blur=${t=>this.commitRule(o,"url",t.target.value)}
			/>
			<button
				type="button"
				class="rule__delete"
				aria-label="Delete ${u} autolink"
				title="Delete autolink"
				@click=${()=>this.removeRule(o)}
			>
				<code-icon icon="close" aria-hidden="true"></code-icon>
			</button>
			${n.prefix?ed`<span id=${c} class="rule__error">Add a prefix to match, e.g. TICKET-</span>`:em}
			${n.url?ed`<span id=${h} class="rule__error"
						>Add <code>&lt;num&gt;</code> to the URL so the reference value is linked.</span
					>`:em}
		</div>`}render(){let t=[...this.autolinks],o=this.draftRowIndex;return null!=this._draft&&null!=o&&(t[Math.min(o,t.length)]=this._draft),ed`${this.renderIntegrationsBanner()}
			<div class="rules">${t.map((t,o)=>this.renderRule(t,o))}</div>
			<p class="hint">
				Matches prefixes that are followed by a reference value within commit messages. The URL must contain a
				<code>&lt;num&gt;</code> for the reference value to be included in the link.
			</p>
			<gl-button appearance="secondary" @click=${this.addDraftRule}>
				<code-icon icon="add" slot="prefix" aria-hidden="true"></code-icon> Add autolink
			</gl-button>`}};ne.styles=[iH,iG,w`
			:host {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-12);
			}

			.banner {
				display: flex;
				gap: var(--gl-space-8);
				align-items: flex-start;
				padding: var(--gl-space-10) var(--gl-space-12);
				font-size: 1.2rem;
				line-height: 1.5;
				color: var(--color-foreground--85);
				background-color: color-mix(in srgb, var(--color-alert-infoBackground) 60%, transparent);
				border: var(--gl-border-width) solid color-mix(in srgb, var(--color-alert-infoBorder) 70%, transparent);
				border-radius: var(--gl-radius-md);
			}

			.banner code-icon {
				flex: none;
				margin-block-start: var(--gl-space-2);
			}

			.banner--connected {
				background-color: transparent;
				border-color: var(--vscode-widget-border, var(--color-foreground--25));
			}

			.rules {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-8);
			}

			.rule {
				display: flex;
				flex-wrap: wrap;
				gap: var(--gl-space-8);
				align-items: center;
			}

			input[type='text'] {
				padding: var(--gl-space-6) var(--gl-space-8);
				font-family: var(--vscode-editor-font-family);
				font-size: 1.2rem;
				color: var(--vscode-input-foreground);
				background-color: var(--vscode-input-background);
				border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
				border-radius: var(--gl-input-border-radius, 0.4rem);
			}

			input[type='text']:focus {
				${iW}
			}

			/* The prefix field embeds its match-option toggles, so the prefix + its
			   options read as one control (mirrors gl-search-input's field pattern) */
			.rule__prefix-field {
				--toggle-size: 2rem;

				position: relative;
				flex: none;
				width: 16rem;
			}

			.rule__prefix {
				width: 100%;

				/* Reserve room so typed text never runs under the toggles */
				padding-inline-end: calc(2 * var(--toggle-size) + var(--gl-space-2) + 2 * var(--gl-space-4));
			}

			.rule__url {
				flex: 1;
				min-width: 24rem;
			}

			.rule__toggles {
				position: absolute;
				inset-block: var(--gl-space-2);
				inset-inline-end: var(--gl-space-4);
				z-index: 1;
				display: inline-flex;
				gap: var(--gl-space-2);
				align-items: stretch;
			}

			.rule__toggle {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				min-width: var(--toggle-size);
				padding-inline: var(--gl-space-2);
				font-family: var(--vscode-editor-font-family);
				font-size: 1.1rem;
				line-height: 1;
				color: var(--color-foreground--65);
				cursor: pointer;
				background: transparent;
				border: var(--gl-border-width) solid transparent;
				border-radius: var(--gl-radius-sm);
			}

			.rule__toggle:hover {
				color: var(--color-foreground);
				background-color: var(--vscode-inputOption-hoverBackground);
			}

			.rule__toggle[aria-pressed='true'] {
				color: var(--vscode-inputOption-activeForeground);
				background-color: var(--vscode-inputOption-activeBackground);
				border-color: var(--vscode-inputOption-activeBorder);
			}

			.rule__toggle:focus-visible {
				${iW}
			}

			.rule__delete {
				flex: none;
				padding: var(--gl-space-4);
				color: var(--color-foreground--50);
				cursor: pointer;
				background: transparent;
				border: none;
				border-radius: var(--gl-radius-sm);
			}

			.rule__delete:hover {
				color: var(--color-foreground);
				background-color: var(--vscode-toolbar-hoverBackground);
			}

			.rule__delete:focus-visible {
				${iW}
			}

			.rule__prefix--invalid,
			.rule__url--invalid {
				border-color: var(--vscode-inputValidation-errorBorder);
			}

			.rule__error {
				flex-basis: 100%;
				font-size: 1.1rem;
				line-height: 1.5;
				color: var(--vscode-inputValidation-errorForeground, var(--vscode-errorForeground));
			}

			.rule__error code {
				font-family: var(--vscode-editor-font-family);
				font-size: 1.05rem;
			}

			.hint {
				font-size: 1.15rem;
				line-height: 1.5;
				color: var(--color-foreground--65);
			}

			.hint code {
				font-family: var(--vscode-editor-font-family);
				font-size: 1.05rem;
			}

			gl-button {
				align-self: flex-start;
			}
		`],a9([p({context:"settingsState"})],ne.prototype,"_state",2),a9([e$({attribute:!1})],ne.prototype,"actions",2),a9([eA("gl-button")],ne.prototype,"_addButton",2),a9([eS()],ne.prototype,"_draft",2),ne=a9([eC("gl-settings-autolinks")],ne);var nt=((eM=nt||{})[eM.VerificationRequired=-1]="VerificationRequired",eM[eM.Community=0]="Community",eM[eM.DeprecatedPreview=1]="DeprecatedPreview",eM[eM.DeprecatedPreviewExpired=2]="DeprecatedPreviewExpired",eM[eM.Trial=3]="Trial",eM[eM.TrialExpired=4]="TrialExpired",eM[eM.TrialReactivationEligible=5]="TrialReactivationEligible",eM[eM.Paid=6]="Paid",eM);let no=["student","pro","advanced","teams","enterprise"];let private_async_helpers_s=class private_async_helpers_s{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}};let private_async_helpers_i=class private_async_helpers_i{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(t=>this.Z=t)}resume(){this.Z?.(),this.Y=this.Z=void 0}};let ni=t=>null!==t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then;let until_c=class until_c extends async_directive_f{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new private_async_helpers_s(this),this._$CX=new private_async_helpers_i}render(...t){return t.find(t=>!ni(t))??ep}update(t,o){let i=this._$Cbt,r=i.length;this._$Cbt=o;let a=this._$CK,n=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<o.length&&!(t>this._$Cwt);t++){let c=o[t];if(!ni(c))return this._$Cwt=t,c;t<r&&c===i[t]||(this._$Cwt=0x3fffffff,r=0,Promise.resolve(c).then(async t=>{for(;n.get();)await n.get();let o=a.deref();if(void 0!==o){let i=o._$Cbt.indexOf(c);i>-1&&i<o._$Cwt&&(o._$Cwt=i,o.setValue(t))}}))}return ep}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};let nr=tl(until_c);var na=Object.defineProperty,nn=Object.getOwnPropertyDescriptor,ns=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?nn(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&na(o,i,n),n};let nl=class extends lit_element_i{constructor(){super(...arguments),this.type="info",this._hasPromo=!1}get hasPromo(){return this._hasPromo}set hasPromo(t){this._hasPromo=t}render(){return ed`${nr(this.promoPromise?.then(t=>this.renderPromo(t)),em)}`}renderPromo(t){if(!t?.content?.webview){this.hasPromo=!1;return}let o=t.content.webview;switch(this.type){case"icon":return ed`<code-icon icon="star-full" size="16"></code-icon>`;case"info":if(o.info)return this.hasPromo=!0,ed`<p class="promo" part="text">${i3(o.info.html)}</p>`;break;case"link":if(o.link)return this.hasPromo=!0,ed`<a
						class="link"
						part="link"
						href="${this.getCommandUrl(t)}"
						title="${o.link.title??em}"
						>${i3(o.link.html)}</a
					>`}return this.hasPromo=!1,em}getCommandUrl(t){let o;return t?.content?.webview?.link?.command?.startsWith("command:")&&(o=t.content.webview.link.command.substring(8)),i0(o??"gitlens.plus.upgrade",this.source)}focus(){this._focusable?.focus()}};nl.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nl.styles=[w`
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
				${iW}
			}

			.link:hover {
				color: inherit;
				text-decoration: underline;
			}
		`],ns([eA('a,button,[tabindex="0"]')],nl.prototype,"_focusable",2),ns([e$({type:Object})],nl.prototype,"promoPromise",2),ns([e$({type:Object})],nl.prototype,"source",2),ns([e$({reflect:!0,type:String})],nl.prototype,"type",2),ns([e$({type:Boolean,reflect:!0,attribute:"has-promo"})],nl.prototype,"hasPromo",1),nl=ns([eC("gl-promo")],nl);var nc=Object.defineProperty,nd=Object.getOwnPropertyDescriptor,nh=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?nd(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&nc(o,i,n),n};let nu=class extends lit_element_i{constructor(){super(...arguments),this.cloud=!1,this.placement="bottom",this.preview=!1}get daysRemaining(){var t,o;return null==this.subscription?0:(t=this.subscription,o=t.plan.effective.expiresOn,(null!=o?function(t,o,i,r){let a=("number"==typeof o?o:o.getTime())-("number"==typeof t?t:t.getTime()),n=r??Math.floor;switch(i){case"days":return n(a/864e5);case"hours":return n(a/36e5);case"minutes":return n(a/6e4);case"seconds":return n(a/1e3);default:return a}}(Date.now(),new Date(o),"days",Math.round):void 0)??0)}get state(){return this.subscription?.state}render(){return ed`
			<gl-popover placement=${this.placement}>
				<span slot="anchor" class="badge" tabindex="0">${this.renderBadge()}</span>
				<div slot="content" class="badge-popup" tabindex="-1">
					${this.renderPopoverHeader()}${this.renderPopoverContent()}
				</div>
			</gl-popover>
		`}renderBadge(){let t=this.preview?"Preview":"Pro";if(null!=this.subscription)if(this.state===nt.VerificationRequired)return ed`${t} <code-icon class="badge-icon" icon="warning" size="10"></code-icon>`;else{var o,i;if(o=this.subscription.plan.actual.id,no.includes(o)||this.cloud&&null!=this.subscription.account)return ed`${t} <code-icon class="badge-icon" icon="check" size="10"></code-icon>`;if(null!=(i=this.subscription).state?i.state===nt.Trial:i.plan.actual.id!==i.plan.effective.id)return ed`${t} <code-icon class="badge-icon" icon="clock" size="10"></code-icon>`}return t}renderPopoverHeader(){let t=ed`<span class="popup-title">${this.preview?"Preview feature":"Pro feature"}</span>`;return this.state===nt.Paid?ed`<div class="popup-header">${t}</div>`:this.cloud?this.preview?ed`<div class="popup-header">
					${t}<span class="popup-subtitle"
						>Unlock this feature with an account and may require GitLens Pro in the future</span
					>
				</div>`:ed`<div class="popup-header">
				${t}<span class="popup-subtitle"> Unlock this feature with GitLens Pro</span>
			</div>`:this.preview?ed`<div class="popup-header">
				${t}<span class="popup-subtitle">May require GitLens Pro in the future</span>
			</div>`:ed`<div class="popup-header">
			${t}<span class="popup-subtitle"> Unlock this feature for privately hosted repos with GitLens Pro</span>
		</div>`}renderPopoverContent(){let t;if(null==this.subscription)return em;switch(this.state){case nt.Paid:var o;t=ed`<p>
					Your
					<gl-tooltip content="Show Account view">
						<a href="${i0("gitlens.showAccountView")}"
							>${o=this.subscription?.plan.actual.id??"pro",`GitLens ${function(t){switch(t){case"student":return"Student";case"pro":return"Pro";case"advanced":return"Advanced";case"teams":return"Business";case"enterprise":return"Enterprise";default:return"Community"}}(o)}`}</a
						>
					</gl-tooltip>
					plan provides access to all Pro features.
				</p>`;break;case nt.VerificationRequired:t=ed`<p>You must verify your email before you can access Pro features.</p>
					<div class="actions">
						<gl-button
							density="tight"
							href="${i0("gitlens.plus.resendVerification",this.source)}"
							>Resend Email</gl-button
						>
						<gl-button
							appearance="secondary"
							density="tight"
							href="${i0("gitlens.plus.validate",this.source)}"
							><code-icon icon="refresh"></code-icon
						></gl-button>
					</div>`;break;case nt.Trial:{let o=this.daysRemaining;t=ed`<p>
						You have
						<strong>${o<1?"<1 day":tj("day",o,{infix:" more "})} left</strong>
						in your Pro trial. Once your trial ends, you will only be able to use Pro features on
						publicly-hosted repos.
					</p>
					${this.renderUpgradeActions()}`;break}case nt.TrialExpired:t=ed`<p>
						Your Pro trial has ended. You can now only use Pro features on publicly-hosted repos.
					</p>
					${this.renderUpgradeActions(ed`<p>Please upgrade for full access to all GitLens Pro features:</p>`)}`;break;case nt.TrialReactivationEligible:t=ed`<p>
						Reactivate your Pro trial and experience all the new Pro features — free for another
						${tj("day",14)}!
					</p>
					<div class="actions center">
						<gl-button
							density="tight"
							href="${i0("gitlens.plus.reactivateProTrial",this.source)}"
							tooltip="Reactivate your Pro trial for another ${tj("day",14)}"
							>Reactivate Pro Trial</gl-button
						>
					</div>`;break;default:t=ed`<p>
						You only have access to
						<gl-tooltip content="Pro features that do not require an account"
							><span class="hint">local</span></gl-tooltip
						>
						Pro features on publicly-hosted repos.
					</p>
					${this.renderStartTrialActions()}`}return ed`<div class="popup-content">${t}</div>`}renderStartTrialActions(){return ed`<div class="actions">
			<p>For access to all Pro features:</p>
			<gl-button density="tight" href="${i0("gitlens.plus.signUp",this.source)}"
				>Start ${14}-day Pro Trial</gl-button
			>
			&nbsp;or
			<a href="${i0("gitlens.plus.login",this.source)}" title="Sign In">sign in</a>
		</div>`}renderUpgradeActions(t){return ed`<div class="actions">
			${t??em}
			<gl-button
				density="tight"
				href="${i0("gitlens.plus.upgrade",{plan:"pro",...this.source??{source:"feature-badge"}})}"
				>Upgrade to Pro</gl-button
			>
			${this.renderPromo()}
		</div>`}renderPromo(){return ed`<gl-promo
			.promoPromise=${this.promos.getApplicablePromo(void 0,"badge")}
			.source=${this.source}
		></gl-promo>`}};nu.styles=[iN,iG,w`
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
				${v(iW)}
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
		`],nh([e$({type:Boolean})],nu.prototype,"cloud",2),nh([e$({reflect:!0})],nu.prototype,"placement",2),nh([e$({type:Boolean})],nu.prototype,"preview",2),nh([p({context:"promos"})],nu.prototype,"promos",2),nh([e$({type:Object})],nu.prototype,"source",2),nh([e$({attribute:!1})],nu.prototype,"subscription",2),nu=nh([eC("gl-feature-badge")],nu);var np=Object.defineProperty,nm=Object.getOwnPropertyDescriptor,ng=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?nm(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&np(o,i,n),n};let nb=class extends ts(lit_element_i){get integrations(){return this._state.cloudIntegrations.get()}get isPaidAccount(){return this._state.subscription.get()?.state===nt.Paid}get isProAccount(){var t;return null!=(t=this._state.subscription.get()?.state)&&(t===nt.Trial||t===nt.Paid)}render(){let t=this.integrations;if(null==t||void 0===this._state.subscription.get()){let t=this._state.serviceErrors.get();return t.integrations||t.subscription?ed`<div class="error" role="alert">
					<code-icon icon="error" aria-hidden="true"></code-icon>
					<span>Couldn’t load integration status.</span>
					<gl-button appearance="secondary" @click=${()=>void this.actions?.loadSharedServices()}
						>Retry</gl-button
					>
				</div>`:ed`<skeleton-loader lines="5"></skeleton-loader>`}let o=this._state.hasAccount.get()&&t.some(t=>t.connected);return ed`<ul class="rows">
				${t.map(t=>this.renderIntegrationRow(t))}
			</ul>
			<div class="panel-actions">
				${!o?ed`<gl-button
							href="${i0("gitlens.plus.cloudIntegrations.connect",{integrationIds:t.map(t=>t.id),source:{source:"settings",detail:"integrations"}})}"
							>Connect Integrations</gl-button
						>`:em}
				<gl-button
					appearance="secondary"
					href="${i0("gitlens.plus.cloudIntegrations.manage",{source:{source:"settings",detail:"integrations"}})}"
					><code-icon icon="gear" slot="prefix" aria-hidden="true"></code-icon> Manage Integrations</gl-button
				>
				<gl-button
					appearance="secondary"
					href="${i0("gitlens.plus.validate",{source:"settings",detail:"integrations"})}"
					><code-icon icon="sync" slot="prefix" aria-hidden="true"></code-icon> Synchronize Status</gl-button
				>
			</div>`}renderIntegrationRow(t){let o=t.requiresPro&&!this.isProAccount,i=t.requiresPro&&!this.isPaidAccount;return ed`<li class="row row--${t.connected&&!o?"connected":"disconnected"}">
			<code-icon class="row__icon" icon="${t.icon}" aria-hidden="true"></code-icon>
			<span class="row__content">
				<span class="row__title">
					<span>${t.name}</span>
					${i?ed`<gl-feature-badge
								placement="right"
								.source=${{source:"settings",detail:"integrations"}}
								.subscription=${this._state.subscription.get()}
								cloud
							></gl-feature-badge>`:em}
				</span>
				<span class="row__details">${function(t){let o=t.supports.map(t=>nf.get(t)??t);if(0===o.length)return"";if(1===o.length)return`Supports ${o[0]}`;if(2===o.length)return`Supports ${o[0]} and ${o[1]}`;let i=o.pop();return`Supports ${o.join(", ")}, and ${i}`}(t)}</span>
			</span>
			<span class="row__actions">
				${o?ed`<gl-button
							appearance="secondary"
							href="${i0("gitlens.plus.upgrade",{plan:"pro",source:"settings",detail:"integrations"})}"
							tooltip="Unlock ${t.name} features with GitLens Pro"
							><code-icon icon="lock" slot="prefix" aria-hidden="true"></code-icon> Unlock with
							Pro</gl-button
						>`:t.connected?ed`<span class="row__status"
									><code-icon icon="check" aria-hidden="true"></code-icon> Connected</span
								>
								<gl-button
									appearance="secondary"
									href="${i0("gitlens.plus.cloudIntegrations.manage",{source:{source:"settings",detail:"integrations"}})}"
									tooltip="Manage ${t.name}"
									aria-label="Manage ${t.name}"
									><code-icon icon="gear" slot="prefix" aria-hidden="true"></code-icon>
									Manage</gl-button
								>`:ed`<gl-button
								appearance="secondary"
								href="${i0("gitlens.plus.cloudIntegrations.connect",{integrationIds:[t.id],source:{source:"settings",detail:"integrations"}})}"
								tooltip="Connect ${t.name}"
								><code-icon icon="plug" slot="prefix" aria-hidden="true"></code-icon> Connect</gl-button
							>`}
			</span>
		</li>`}};nb.styles=[iH,iG,w`
			:host {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-12);

				/* Semantic success token so custom/high-contrast themes keep contrast */
				--status-color--connected: var(--vscode-testing-iconPassed, var(--vscode-charts-green));
			}

			.rows {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-8);
				padding: 0;
				margin: 0;
				list-style: none;
			}

			.row {
				display: flex;
				gap: var(--gl-space-10);
				align-items: center;
				padding: 0.9rem 1.1rem;
				border: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
				border-radius: var(--gl-radius-md);
			}

			.row__icon {
				flex: none;
				font-size: 1.6rem;
			}

			.row--disconnected .row__icon {
				color: var(--color-foreground--25);
			}

			.row__content {
				flex: 1 1 auto;
				min-width: 0;
			}

			.row__title {
				display: flex;
				gap: var(--gl-space-6);
				align-items: center;
				font-size: 1.25rem;
				color: var(--color-foreground);
			}

			.row__details {
				font-size: 1.1rem;
				color: var(--color-foreground--65);
			}

			.row--disconnected .row__title,
			.row--disconnected .row__details {
				color: var(--color-foreground--50);
			}

			.row__actions {
				display: flex;
				flex: none;
				gap: var(--gl-space-6);
				align-items: center;
			}

			.row__status {
				display: flex;
				gap: 0.5rem;
				align-items: center;
				font-size: 1.15rem;
				color: var(--status-color--connected);
			}

			.panel-actions {
				display: flex;
				gap: var(--gl-space-8);
				align-items: center;
			}

			.error {
				display: flex;
				gap: var(--gl-space-8);
				align-items: center;
				padding: var(--gl-space-10) var(--gl-space-12);
				font-size: 1.2rem;
				line-height: 1.5;
				color: var(--color-foreground--85);
				background-color: color-mix(in srgb, var(--color-alert-errorBackground) 60%, transparent);
				border: var(--gl-border-width) solid color-mix(in srgb, var(--color-alert-errorBorder) 70%, transparent);
				border-radius: var(--gl-radius-md);
			}

			.error span {
				flex: 1;
			}
		`],ng([p({context:"settingsState"})],nb.prototype,"_state",2),ng([e$({attribute:!1})],nb.prototype,"actions",2),nb=ng([eC("gl-settings-integrations")],nb);let nf=new Map([["prs","pull requests"],["issues","issues"]]);let ModifierKeysTracker=class ModifierKeysTracker{constructor(){this._altKey=!1,this._shiftKey=!1,this._ctrlKey=!1,this._metaKey=!1,this._hosts=new Set,this._listening=!1,this._onKey=t=>{let o=t.altKey||"keydown"===t.type&&"Alt"===t.key,i=t.shiftKey||"keydown"===t.type&&"Shift"===t.key,r=t.ctrlKey||"keydown"===t.type&&"Control"===t.key,a=t.metaKey||"keydown"===t.type&&"Meta"===t.key,n=("keyup"!==t.type||"Alt"!==t.key)&&o,c=("keyup"!==t.type||"Shift"!==t.key)&&i,h=("keyup"!==t.type||"Control"!==t.key)&&r,u=("keyup"!==t.type||"Meta"!==t.key)&&a;(this._altKey!==n||this._shiftKey!==c||this._ctrlKey!==h||this._metaKey!==u)&&(this._altKey=n,this._shiftKey=c,this._ctrlKey=h,this._metaKey=u,this._notify())},this._onPointer=t=>{(this._altKey!==t.altKey||this._shiftKey!==t.shiftKey||this._ctrlKey!==t.ctrlKey||this._metaKey!==t.metaKey)&&(this._altKey=t.altKey,this._shiftKey=t.shiftKey,this._ctrlKey=t.ctrlKey,this._metaKey=t.metaKey,this._notify())},this._onVisibilityChange=()=>{"hidden"===document.visibilityState&&this._reset()}}get altKey(){return this._altKey}get shiftKey(){return this._shiftKey}get ctrlKey(){return this._ctrlKey}get metaKey(){return this._metaKey}subscribe(t){return this._hosts.add(t),this._listening||this._start(),()=>{this._hosts.delete(t),0===this._hosts.size&&this._stop()}}_start(){this._listening=!0,window.addEventListener("keydown",this._onKey,{capture:!0}),window.addEventListener("keyup",this._onKey,{capture:!0}),window.addEventListener("mousemove",this._onPointer,{capture:!0}),window.addEventListener("mouseover",this._onPointer,{capture:!0}),document.addEventListener("visibilitychange",this._onVisibilityChange)}_stop(){this._listening=!1,window.removeEventListener("keydown",this._onKey,{capture:!0}),window.removeEventListener("keyup",this._onKey,{capture:!0}),window.removeEventListener("mousemove",this._onPointer,{capture:!0}),window.removeEventListener("mouseover",this._onPointer,{capture:!0}),document.removeEventListener("visibilitychange",this._onVisibilityChange),this._reset()}_reset(){let t=this._altKey||this._shiftKey||this._ctrlKey||this._metaKey;this._altKey=this._shiftKey=this._ctrlKey=this._metaKey=!1,t&&this._notify()}_notify(){for(let t of this._hosts)t.requestUpdate()}};let nv=new ModifierKeysTracker;let ModifierKeysController=class ModifierKeysController{constructor(t){this.host=t,t.addController(this)}get altKey(){return nv.altKey}get shiftKey(){return nv.shiftKey}get ctrlKey(){return nv.ctrlKey}get metaKey(){return nv.metaKey}hostConnected(){this._unsubscribe=nv.subscribe(this.host)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}};let nw=w`
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
`;var ny=Object.defineProperty,nk=Object.getOwnPropertyDescriptor,nx=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?nk(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&ny(o,i,n),n};let nC=class extends GlElement{constructor(){super(),this.disabled=!1,this.value="",this._defaultChecked=!1,this.checked=!1,this.indeterminate=!1,this._clickAlt=!1,this._modifiers=new ModifierKeysController(this),this._defaultChecked=this.checked}get defaultChecked(){return this._defaultChecked}handleClick(t){this._clickAlt=t.altKey}handleChange(t){let o=t.target.checked,i=this._clickAlt||this._modifiers.altKey;this.indeterminate&&i&&(o=!1,t.target.checked=!1),this._clickAlt=!1,this.checked=o,this.indeterminate=!1,this.dispatchEvent(new CustomEvent("gl-change-value"))}renderCheck(){return ed`<code-icon icon=${this.indeterminate?"dash":"check"}></code-icon>`}render(){return ed`<label ?aria-disabled=${this.disabled}
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
		</label>`}};nC.shadowRootOptions={...GlElement.shadowRootOptions,delegatesFocus:!0},nC.styles=[nw],nx([e$({type:Boolean,reflect:!0})],nC.prototype,"disabled",2),nx([e$({type:String})],nC.prototype,"value",2),nx([e$({type:Boolean})],nC.prototype,"defaultChecked",1),nx([e$({type:Boolean,reflect:!0})],nC.prototype,"checked",2),nx([e$({type:Boolean,reflect:!0})],nC.prototype,"indeterminate",2),nC=nx([eC("gl-checkbox")],nC);let n_=w`
	:host {
		display: inline-flex;
	}

	.group {
		display: inline-flex;
		gap: var(--gl-space-2);
		padding: var(--gl-space-2);
		background-color: var(--vscode-input-background);
		border: var(--gl-border-width) solid var(--vscode-input-border, var(--vscode-contrastBorder, transparent));
		border-radius: 0.5rem;
	}

	.segment {
		padding: 0.3rem 1.2rem;
		font-family: var(--vscode-font-family);
		font-size: 1.2rem;
		line-height: 1.4;
		color: var(--color-foreground--75);
		white-space: nowrap;
		appearance: none;
		cursor: pointer;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 0.3rem;
	}

	.segment:hover:not([aria-checked='true']) {
		color: var(--color-foreground);
		background-color: var(--vscode-toolbar-hoverBackground);
	}

	/* Fill + weight, not color alone, distinguish the selected segment;
	   the contrast border keeps it visible in high-contrast themes. */
	.segment[aria-checked='true'] {
		font-weight: 600;
		color: var(--vscode-button-foreground);
		background-color: var(--vscode-button-background);
		border-color: var(--vscode-contrastBorder, transparent);
	}

	.segment:focus-visible {
		outline: 1px solid var(--color-focus-border);
		outline-offset: 2px;
	}

	:host([disabled]) .segment {
		cursor: not-allowed;
		opacity: 0.5;
	}

	@media (prefers-reduced-motion: no-preference) {
		.segment {
			transition:
				background-color 0.15s,
				color 0.15s;
		}
	}
`;var n$=Object.defineProperty,nS=Object.getOwnPropertyDescriptor,nL=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?nS(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&n$(o,i,n),n};let nA=class extends GlElement{constructor(){super(...arguments),this.options=[],this.disabled=!1}select(t){this.disabled||t===this.value||(this.value=t,this.dispatchEvent(new CustomEvent("gl-change-value",{bubbles:!0,composed:!0})))}handleKeyDown(t){let o;if(this.disabled||!this.options.length)return;let i=this.options.findIndex(t=>t.value===this.value);switch(t.key){case"ArrowRight":case"ArrowDown":o=i<0?0:(i+1)%this.options.length;break;case"ArrowLeft":case"ArrowUp":o=i<0?this.options.length-1:(i-1+this.options.length)%this.options.length;break;case"Home":o=0;break;case"End":o=this.options.length-1;break;default:return}t.preventDefault();let r=this.options[o];this.select(r.value),this.updateComplete.then(()=>{this.renderRoot.querySelector(`button[data-value="${CSS.escape(r.value)}"]`)?.focus()})}render(){let t=this.options.find(t=>t.value===this.value)??this.options[0];return ed`<div
			class="group"
			role="radiogroup"
			aria-label=${this.label??"Options"}
			@keydown=${this.handleKeyDown}
		>
			${this.options.map(o=>ed`<button
						type="button"
						class="segment"
						role="radio"
						data-value=${o.value}
						aria-checked=${o.value===this.value}
						tabindex=${o===t?0:-1}
						?disabled=${this.disabled}
						@click=${()=>this.select(o.value)}
					>
						${o.label}
					</button>`)}
		</div>`}};nA.styles=[n_],nL([e$({type:Array})],nA.prototype,"options",2),nL([e$({type:String})],nA.prototype,"value",2),nL([e$({type:Boolean,reflect:!0})],nA.prototype,"disabled",2),nL([e$({type:String})],nA.prototype,"label",2),nA=nL([eC("gl-segmented-control")],nA);let nz=w`
	:host {
		display: inline-block;
		width: 100%;
	}

	/* The label names the internal combobox (aria-labelledby) but is never shown —
	   visible labels are composed outside the control */
	wa-select::part(form-control-label) {
		${iq}
	}

	gl-select wa-select {
		width: 100%;
	}

	/* Combobox (the visible select control). Use the WA tokens with VS Code fallbacks
	   so consumers can override --wa-form-control-* on the gl-select host (e.g. for
	   action-state colorization in the rebase editor) and the values cascade in. */
	wa-select::part(combobox) {
		min-height: auto;
		padding: 1px 4px;
		font-family: var(--vscode-font-family);
		font-size: inherit;
		line-height: 1.35;
		color: var(--wa-form-control-value-color, var(--vscode-dropdown-foreground));
		background-color: var(--wa-form-control-background-color, var(--vscode-dropdown-background));
		border: var(--wa-form-control-border-width, 1px) var(--wa-form-control-border-style, solid)
			var(--wa-form-control-border-color, var(--vscode-dropdown-border));
		border-radius: var(--wa-form-control-border-radius, 3px);
	}

	wa-select::part(display-input) {
		font-family: var(--vscode-font-family);
		font-size: inherit;
		color: var(--wa-form-control-value-color, var(--vscode-dropdown-foreground));
		field-sizing: content;
	}

	wa-select::part(expand-icon) {
		margin-inline-start: var(--gl-space-4);
	}

	wa-select:focus-within::part(combobox) {
		outline: var(--gl-border-width) solid var(--vscode-focusBorder);
		outline-offset: -1px;
	}

	wa-select[disabled]::part(combobox) {
		color: var(--vscode-disabledForeground);
		cursor: not-allowed;
		background-color: var(--vscode-input-background);
		opacity: 0.6;
	}

	/* Listbox (dropdown menu) */
	wa-select::part(listbox) {
		--gl-elevation: var(--gl-shadow-popover);
		--gl-elevation-border-color: var(--vscode-dropdown-border);

		padding: var(--gl-space-4) 0;
		background-color: var(--vscode-dropdown-background);
		border-radius: var(--gl-radius-sm);

		${i4}
	}

	/* VS Code-style scrollbar for the listbox (we can't apply class="scrollable",
	   so we style via ::part chained with ::-webkit-scrollbar) */
	wa-select::part(listbox)::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	wa-select::part(listbox)::-webkit-scrollbar-corner {
		background-color: transparent;
	}

	wa-select::part(listbox)::-webkit-scrollbar-thumb {
		background-color: var(--vscode-scrollbarSlider-background);
	}

	wa-select::part(listbox)::-webkit-scrollbar-thumb:hover {
		background-color: var(--vscode-scrollbarSlider-hoverBackground);
	}

	wa-select::part(listbox)::-webkit-scrollbar-thumb:active {
		background-color: var(--vscode-scrollbarSlider-activeBackground);
	}

	/* Options — wa-option has no "base" part; the host element IS the styled box.
	   wa-options live inside gl-select's shadow root, so consumer CSS targeting them
	   from outside (e.g. .action-select wa-option { ... }) can't reach them. We expose
	   CSS variables here that consumers override on the gl-select host. */
	wa-option {
		padding: var(--gl-select-option-padding, 4px 8px);
		font-family: var(--vscode-font-family);
		font-size: inherit;
		color: var(--vscode-dropdown-foreground);
		cursor: pointer;
		background-color: transparent;
	}

	wa-option:hover {
		color: var(--gl-select-option-hover-color, var(--vscode-list-hoverForeground));
		background-color: var(--gl-select-option-hover-bg, var(--vscode-list-hoverBackground));
	}

	wa-option:focus {
		color: var(--gl-select-option-focus-color, var(--vscode-list-activeSelectionForeground));
		background-color: var(--gl-select-option-focus-bg, var(--vscode-list-activeSelectionBackground));
	}

	wa-option[aria-selected='true'],
	wa-option[selected] {
		color: var(--gl-select-option-selected-color, var(--vscode-list-activeSelectionForeground));
		background-color: var(--gl-select-option-selected-bg, var(--vscode-list-activeSelectionBackground));
	}

	wa-option[disabled] {
		color: var(--vscode-disabledForeground);
		cursor: not-allowed;
		opacity: 0.6;
	}

	/* Hide the WA built-in checked-icon — we don't use it */
	wa-option::part(checked-icon) {
		display: none;
	}
`;var nE=w`
  :host {
    --tag-max-size: 10ch;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline-color: var(--wa-color-focus);
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from select to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: pointer;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  .display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* Manage spacing when tags are present */
  :host([multiple]) {
    --_padding-with-tags: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));

    & .combobox:has(.tags wa-tag) {
      padding-block: var(--_padding-with-tags);
      padding-inline-start: var(--_padding-with-tags);
    }
  }

  /* Visually hide the display input when multiple is enabled */
  :host([multiple]) .combobox:has(.tags wa-tag) .display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25em;

    &::slotted(wa-tag) {
      cursor: pointer !important;
    }

    .disabled &,
    .disabled &::slotted(wa-tag) {
      cursor: not-allowed !important;
    }
  }

  /* Start and End */

  .start,
  .end {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .combobox:has(.tags wa-tag) .start::slotted(*) {
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - var(--_padding-with-tags));
  }

  /* Clear button */
  [part~='clear-button'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) var(--wa-transition-easing);
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding: 0.25em;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  /* Space options with half the listbox's padding */
  .listbox slot:not([name]) {
    display: flex;
    flex-direction: column;
    gap: 0.125em;
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }
`;function nR(t,o,i="vertical",r="smooth"){let a={top:Math.round(t.getBoundingClientRect().top-o.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-o.getBoundingClientRect().left)},n=a.top+o.scrollTop,c=a.left+o.scrollLeft,h=o.scrollLeft,u=o.scrollLeft+o.offsetWidth,p=o.scrollTop,m=o.scrollTop+o.offsetHeight;("horizontal"===i||"both"===i)&&(c<h?o.scrollTo({left:c,behavior:r}):c+t.clientWidth>u&&o.scrollTo({left:c-o.offsetWidth+t.clientWidth,behavior:r})),("vertical"===i||"both"===i)&&(n<p?o.scrollTo({top:n,behavior:r}):n+t.clientHeight>m&&o.scrollTo({top:n-o.offsetHeight+t.clientHeight,behavior:r}))}var nP=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}},nI=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},nM=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},nO=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},nT=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}},nD=[];function nB(t){for(let o=nD.length-1;o>=0;o--)if(nD[o]===t){nD.splice(o,1);break}}function nF(t){return nD.length>0&&nD[nD.length-1]===t}var nq=w`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`,nV=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},nW=class extends ra{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new nV))},this.handleInteraction=t=>{let o=this.emittedEvents;o.includes(t.type)||o.push(t.type),o.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},"addEventListener"in this&&this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[{observedAttributes:["custom-error"],checkValidity(t){let o={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(o.message=t.customError,o.isValid=!1,o.invalidKeys=["customError"]),o}}]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let o of this.validators)if(o.observedAttributes)for(let i of o.observedAttributes)t.add(i);return[...t]}connectedCallback(){super.connectedCallback(),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.updateValidity()}):this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener?.(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")||t.has("defaultValue")){let t=this.value;this.updateFormValue(t)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(t),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>this.updateValidity()):this.updateValidity()}updateFormValue(t){if(Array.isArray(t)){if(this.name){let o=new FormData;for(let i of t)o.append(this.name,i);this.setValue(o,o)}}else this.setValue(t,t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let o=t[0],i=t[1],r=t[2];r||(r=this.validationTarget),this.internals.setValidity(o,i,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,o=this.internals.validity.valid,i=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!o),this.customStates.set("valid",o),this.customStates.set("user-invalid",!o&&i),this.customStates.set("user-valid",o&&i)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,o){this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.value=t,"restore"===o&&this.resetValidity(),this.updateValidity()}):(this.value=t,"restore"===o&&this.resetValidity(),this.updateValidity())}setValue(...t){let[o,i]=t;this.internals.setFormValue(o,i)}get allValidators(){return[...this.constructor.validators||[],...this.validators||[]]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate)return void this.resetValidity();let t=this.allValidators;if(!t?.length)return;let o={customError:!!this.customError},i=this.validationTarget||this.input||void 0,r="";for(let i of t){let{isValid:t,message:a,invalidKeys:n}=i.checkValidity(this);!t&&(r||(r=a),n?.length>=0&&n.forEach(t=>o[t]=!0))}r||(r=this.validationMessage),this.setValidity(o,r,i)}};nW.formAssociated=!0,re([e$({reflect:!0})],nW.prototype,"name",2),re([e$({type:Boolean})],nW.prototype,"disabled",2),re([e$({state:!0,attribute:!1})],nW.prototype,"valueHasChanged",2),re([e$({state:!0,attribute:!1})],nW.prototype,"hasInteracted",2),re([e$({attribute:"custom-error",reflect:!0})],nW.prototype,"customError",2),re([e$({attribute:!1,state:!0,type:Object})],nW.prototype,"validity",1);var nj={small:"s",medium:"m",large:"l"},nU=new Set;function nN(t,o){o in nj&&!nU.has(`${t}:${o}`)&&nU.add(`${t}:${o}`)}var nH=class{constructor(t,...o){this.slotNames=[],this.handleSlotChange=t=>{let o=t.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=o}hasDefaultSlot(){return!!this.host.childNodes&&[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===Node.ELEMENT_NODE){if("wa-visually-hidden"===t.tagName.toLowerCase())return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector?.(`:scope > [slot="${t}"]`)!==null}test(t,o){return o&&this.host.didSSR&&!this.host.hasUpdated?!!this.host[o]:"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){let t=this.host.shadowRoot;t&&"addEventListener"in t&&t.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){let t=this.host.shadowRoot;t&&"removeEventListener"in t&&t.removeEventListener("slotchange",this.handleSlotChange)}},nG=w`
  :host([size='xs']) {
    font-size: var(--wa-font-size-xs);
  }

  :host([size='s']),
  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='m']),
  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='l']),
  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  :host([size='xl']) {
    font-size: var(--wa-font-size-xl);
  }
`;function nK(t,o){return new Promise(i=>{t.addEventListener(o,function r(a){a.target===t&&(t.removeEventListener(o,r),i())})})}function nY(t,o){return new Promise(i=>{let r=new AbortController,{signal:a}=r;if(t.classList.contains(o))return;t.classList.add(o);let n=!1,c=()=>{n||(n=!0,t.classList.remove(o),i(),r.abort())};t.addEventListener("animationend",c,{once:!0,signal:a}),t.addEventListener("animationcancel",c,{once:!0,signal:a}),requestAnimationFrame(()=>{n||0!==t.getAnimations().length||c()})})}function nX(t,o){let i={waitUntilFirstUpdate:!1,...o};return(o,r)=>{let{update:a}=o,n=Array.isArray(t)?t:[t];o.update=function(t){n.forEach(o=>{if(t.has(o)){let a=t.get(o),n=this[o];a!==n&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[r](a,n)}}),a.call(this,t)}}}var nJ=class extends nW{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.cachedOptions=null,this.hasSlotController=new nH(this,"hint","label"),this.localize=new rm(this),this.selectionOrder=new Map,this.typeToSelectString="",this.slotChangePending=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="m",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=t=>ed`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${t.value}
          @wa-remove=${o=>this.handleTagRemove(o,t)}
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{let o=t.composedPath();this&&!o.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{let o=t.target,i=null!==o.closest('[part~="clear-button"]'),r=null!==o.closest("wa-button");if(!i&&!r){if("Escape"===t.key&&this.open&&nF(this)&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),"Enter"===t.key||" "===t.key&&""===this.typeToSelectString)return(t.preventDefault(),t.stopImmediatePropagation(),this.open)?void(this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))):void this.show();if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let o=this.getAllOptions(),i=o.indexOf(this.currentOption),r=Math.max(0,i);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;"ArrowDown"===t.key?(r=i+1)>o.length-1&&(r=0):"ArrowUp"===t.key?(r=i-1)<0&&(r=o.length-1):"Home"===t.key?r=0:"End"===t.key&&(r=o.length-1),this.setCurrentOption(o[r])}if(t.key?.length===1||"Backspace"===t.key){let o=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if("Backspace"===t.key)return;this.show()}for(let i of(t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),"Backspace"===t.key?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase(),o))if(i.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(i);break}}}},this.handleDocumentMouseDown=t=>{let o=t.composedPath();this&&!o.includes(this)&&this.hide()}}static get validators(){let t=[((t={})=>{let{validationElement:o,validationProperty:i}=t;!o&&"u">typeof document&&"createElement"in document&&(o=Object.assign(document.createElement("input"),{required:!0})),i||(i="value");let r={observedAttributes:["required"],message:o?.validationMessage,checkValidity(t){let o={message:"",isValid:!0,invalidKeys:[]};return t.required??t.hasAttribute("required")?(t[i]||(o.message="function"==typeof r.message?r.message(t):r.message||"",o.isValid=!1,o.invalidKeys.push("valueMissing")),o):o}};return r})({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(t,o){return null==t&&null==o||null!=t&&null!=o&&t.length===o.length&&t.every((t,i)=>t===o[i])}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let o=this.value;t instanceof FormData&&(t=t.getAll(this.name)),null==t||Array.isArray(t)||(t=[t]);let i=this._value;this._value=t??null,this.rawValuesEqual(i,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",o))}get value(){let t=this._value??this.defaultValue??null;null!=t&&(t=Array.isArray(t)?t:[t]),this.optionValues=new Set(this.getAllOptions().filter(t=>!t.disabled).map(t=>t.value));let o=t;return null!=t&&(o=t.filter(t=>this.optionValues.has(t)),o=(o=this.multiple?o:o[0])??null),o}handleSizeChange(){nN(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){let t=this.getAllOptions().filter(t=>t.hasAttribute("selected")||t.defaultSelected);if(t.length>0){let o=t.map(t=>t.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),nD.push(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),nB(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){let o=t.composedPath().some(t=>t instanceof Element&&"wa-button"===t.tagName.toLowerCase());this.disabled||o||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,null!==this.value&&(this.displayLabel="",this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new nT),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){let o=t.target.closest("wa-option");o&&!o.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){if(customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.didSSR&&!this.hasUpdated)return void this.updateComplete.then(()=>{this.handleDefaultSlotChange()});this.cachedOptions=null;let t=this.getAllOptions();this.updateDefaultValue();let o=this.value;if(null==o||!this.valueHasChanged&&!this.hasInteracted)return void this.selectionChanged();Array.isArray(o)||(o=[o]);let i=t.filter(t=>o.includes(t.value));this.setSelectedOptions(i)}handleTagRemove(t,o){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let i=o;if(!i){let o=t.target.closest("wa-tag[data-value]");if(o){let t=o.dataset.value;i=this.selectedOptions.find(o=>o.value===t)}}i&&(this.toggleOptionSelection(i,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(t=>{t.current=!1,t.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus({preventScroll:!0}),this.open&&!this.listbox.hidden&&nR(t,this.listbox,"vertical","auto"))}setSelectedOptions(t){let o=this.getAllOptions(),i=Array.isArray(t)?t:[t];o.forEach(t=>{i.includes(t)||(t.selected=!1)}),i.length&&i.forEach(t=>t.selected=!0),this.selectionChanged()}toggleOptionSelection(t,o){!0===o||!1===o?t.selected=o:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){let t=this.getAllOptions().filter(t=>{if(!this.hasInteracted&&!this.valueHasChanged){let o=this.defaultValue,i=Array.isArray(o)?o:[o];return t.hasAttribute("selected")||t.defaultSelected||t.selected||i?.includes(t.value)}return t.selected}),o=new Set(t.map(t=>t.value));for(let t of this.selectionOrder.keys())o.has(t)||this.selectionOrder.delete(t);let i=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let o of t)this.selectionOrder.has(o.value)||this.selectionOrder.set(o.value,i++);this.selectedOptions=t.sort((t,o)=>(this.selectionOrder.get(t.value)??0)-(this.selectionOrder.get(o.value)??0));let r=new Set(this.selectedOptions.map(t=>t.value));if(r.size>0||this._value){let t=this._value;if(null==this._value){let t=this.defaultValue??[];this._value=Array.isArray(t)?t:[t]}this._value=this._value?.filter(t=>!this.optionValues?.has(t))??null,this._value?.unshift(...r),this.requestUpdate("value",t)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{let t=this.selectedOptions[0];this.displayLabel=t?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,o)=>{if(o<this.maxOptionsVisible||this.maxOptionsVisible<=0){let i=this.getTag(t,o);return i?"string"==typeof i?i3(i):i:null}return o===this.maxOptionsVisible?ed`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-o}</wa-tag
          >
        `:null})}updated(t){super.updated(t),(t.has("value")||t.has("displayLabel"))&&this.customStates.set("blank",!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let t=this.getAllOptions(),o=Array.isArray(this.value)?this.value:[this.value],i=t.filter(t=>o.includes(t.value));this.setSelectedOptions(i),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());let t=new nP;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await nY(this.popup.popup,"show"),this.currentOption&&nR(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new nM)}else{let t=new nI;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await nY(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new nO)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,nK(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,nK(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let t=this.hasSlotController.test("label","withLabel"),o=this.hasSlotController.test("hint","withHint"),i=!!this.label||!!t,r=!!this.hint||!!o,a=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return ed`
      <div
        part="form-control"
        class=${ag({"form-control":!0,"form-control-has-label":i})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${ag({label:!0,"has-label":i})}
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${ag({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?ed`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${a?ed`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${ag({"has-slotted":r})}
          aria-hidden=${r?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};nJ.css=[nE,nq,nG],re([eA(".select")],nJ.prototype,"popup",2),re([eA(".combobox")],nJ.prototype,"combobox",2),re([eA(".display-input")],nJ.prototype,"displayInput",2),re([eA(".value-input")],nJ.prototype,"valueInput",2),re([eA(".listbox")],nJ.prototype,"listbox",2),re([eS()],nJ.prototype,"displayLabel",2),re([eS()],nJ.prototype,"currentOption",2),re([eS()],nJ.prototype,"selectedOptions",2),re([e$({reflect:!0})],nJ.prototype,"name",2),re([e$({attribute:!1})],nJ.prototype,"defaultValue",1),re([e$({attribute:"value",reflect:!1})],nJ.prototype,"value",1),re([e$({reflect:!0})],nJ.prototype,"size",2),re([nX("size")],nJ.prototype,"handleSizeChange",1),re([e$()],nJ.prototype,"placeholder",2),re([e$({type:Boolean,reflect:!0})],nJ.prototype,"multiple",2),re([e$({attribute:"max-options-visible",type:Number})],nJ.prototype,"maxOptionsVisible",2),re([e$({type:Boolean})],nJ.prototype,"disabled",2),re([e$({attribute:"with-clear",type:Boolean})],nJ.prototype,"withClear",2),re([e$({type:Boolean,reflect:!0})],nJ.prototype,"open",2),re([e$({reflect:!0})],nJ.prototype,"appearance",2),re([e$({type:Boolean,reflect:!0})],nJ.prototype,"pill",2),re([e$()],nJ.prototype,"label",2),re([e$({reflect:!0})],nJ.prototype,"placement",2),re([e$({attribute:"hint"})],nJ.prototype,"hint",2),re([e$({attribute:"with-label",type:Boolean})],nJ.prototype,"withLabel",2),re([e$({attribute:"with-hint",type:Boolean})],nJ.prototype,"withHint",2),re([e$({type:Boolean,reflect:!0})],nJ.prototype,"required",2),re([e$({attribute:!1})],nJ.prototype,"getTag",2),re([nX("disabled",{waitUntilFirstUpdate:!0})],nJ.prototype,"handleDisabledChange",1),re([nX("value",{waitUntilFirstUpdate:!0})],nJ.prototype,"handleValueChange",1),re([nX("open",{waitUntilFirstUpdate:!0})],nJ.prototype,"handleOpenChange",1),nJ=re([eC("wa-select")],nJ),nJ.disableWarning?.("change-in-update");var nZ=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}},nQ=w`
  @layer wa-component {
    :host {
      display: inline-flex;
      gap: 0.5em;
      border-radius: var(--wa-border-radius-m);
      align-items: center;
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
      border-style: var(--wa-border-style);
      border-width: var(--wa-border-width-s);
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      font-size: inherit;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      height: calc(var(--wa-form-control-height) * 0.8);
      line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      padding: 0 0.75em;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }

    :host([appearance='filled']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }

    :host([appearance='accent']) {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
  }

  .content {
    font-size: var(--wa-font-size-smaller);
  }

  [part='remove-button'] {
    line-height: 1;
  }

  [part='remove-button']::part(base) {
    padding: 0;
    height: 1em;
    width: 1em;
    color: currentColor;
  }

  @media (hover: hover) {
    :host(:hover) > [part='remove-button']::part(base) {
      background-color: transparent;
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:active) > [part='remove-button']::part(base) {
    background-color: transparent;
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /*
   * Pill modifier
   */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }
`,n0=w`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`,n1=class extends ra{constructor(){super(...arguments),this.localize=new rm(this),this.variant="neutral",this.appearance="filled-outlined",this.size="m",this.pill=!1,this.withRemove=!1}handleSizeChange(){nN(this.localName,this.size)}handleRemoveClick(){this.dispatchEvent(new nZ)}render(){return ed`
      <slot part="content" class="content"></slot>

      ${this.withRemove?ed`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};n1.css=[nQ,n0,nG],re([e$({reflect:!0})],n1.prototype,"variant",2),re([e$({reflect:!0})],n1.prototype,"appearance",2),re([e$({reflect:!0})],n1.prototype,"size",2),re([nX("size")],n1.prototype,"handleSizeChange",1),re([e$({type:Boolean,reflect:!0})],n1.prototype,"pill",2),re([e$({attribute:"with-remove",type:Boolean})],n1.prototype,"withRemove",2),n1=re([eC("wa-tag")],n1);var n2=w`
  :host {
    --current-text-color: var(--wa-color-brand-on-loud);

    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    border-radius: var(--wa-border-radius-s);
    line-height: var(--wa-line-height-condensed);
    transition: var(--wa-transition-fast) background-color var(--wa-transition-easing);
    cursor: pointer;
  }

  :host(:focus) {
    outline: none;
  }

  @media (hover: hover) {
    :host(:not(:state(disabled), :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host(:state(disabled):state(current)) {
    background-color: var(--wa-form-control-activated-color);
    color: var(--current-text-color);
    opacity: 1;
  }

  :host(:state(disabled)) {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-smaller);
    visibility: hidden;
    width: 2em;
  }

  :host(:state(selected)) .check {
    visibility: visible;
  }

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start::slotted(*) {
    margin-inline-end: 0.5em;
  }

  .end::slotted(*) {
    margin-inline-start: 0.5em;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,n4=class extends ra{constructor(){super(...arguments),this.localize=new rm(this),this.cachedDefaultLabel="",this.isInitialized=!1,this.isDefaultLabelDirty=!0,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.handleHover=t=>{"mouseenter"===t.type?this.customStates.set("hover",!0):"mouseleave"===t.type&&this.customStates.set("hover",!1)}}set label(t){let o=this._label;this._label=t||"",this._label!==o&&this.requestUpdate("label",o)}get label(){return this._label?this._label:this.defaultLabel}get defaultLabel(){return(this.isDefaultLabelDirty||!this.cachedDefaultLabel)&&this.updateDefaultLabel(),this.cachedDefaultLabel}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.isDefaultLabelDirty=!0,this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{let t=this.closest("wa-select");t&&t.handleDefaultSlotChange()}),customElements.whenDefined("wa-combobox").then(()=>{let t=this.closest("wa-combobox");t&&t.handleDefaultSlotChange()})):this.isInitialized=!0}willUpdate(t){t.has("defaultSelected")&&(this.didSSR&&this.hasUpdated||!this.didSSR)&&this.syncDefaultSelected(),super.willUpdate(t)}syncDefaultSelected(){if("closest"in this&&!this.closest("wa-combobox, wa-select")?.hasInteracted&&this.defaultSelected){let t=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",t)}}updated(t){t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected)),t.has("value")&&("string"!=typeof this.value&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current),super.updated(t)}async firstUpdated(t){if(super.firstUpdated(t),this.didSSR&&!this.hasUpdated&&await this.updateComplete,this.syncDefaultSelected(),this.selected&&!this.defaultSelected){let t=this.closest("wa-select, wa-combobox");t&&!t.hasInteracted&&(await customElements.whenDefined(t?.localName),await t.updateComplete,t.selectionChanged?.())}}updateDefaultLabel(){let t=this.cachedDefaultLabel;this.cachedDefaultLabel=(function t(o,i=0){if(!o||!globalThis.Node)return"";if("function"==typeof o[Symbol.iterator])return(Array.isArray(o)?o:[...o]).map(o=>t(o,--i)).join("");if(o.nodeType===Node.TEXT_NODE)return o.textContent??"";if(o.nodeType===Node.ELEMENT_NODE){if(o.hasAttribute("slot")||o.matches("style, script"))return"";if(o instanceof HTMLSlotElement){let r=o.assignedNodes({flatten:!0});if(r.length>0)return t(r,--i)}return i>-1?t(o,--i):o.textContent??""}return o.hasChildNodes()?t(o.childNodes,--i):""})(this).trim(),this.isDefaultLabelDirty=!1;let o=this.cachedDefaultLabel!==t;return!this._label&&o&&this.requestUpdate("label",t),o}render(){let t=this.selected;return this.didSSR&&!this.hasUpdated?(this.updateComplete.then(()=>{this.requestUpdate()}),em):ed`
      ${t?ed`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>`:ed`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};n4.css=n2,re([eA(".label")],n4.prototype,"defaultSlot",2),re([eS()],n4.prototype,"current",2),re([e$({reflect:!0})],n4.prototype,"value",2),re([e$({type:Boolean})],n4.prototype,"disabled",2),re([e$({type:Boolean,attribute:!1})],n4.prototype,"selected",2),re([e$({type:Boolean,attribute:"selected"})],n4.prototype,"defaultSelected",2),re([e$()],n4.prototype,"label",1),n4=re([eC("wa-option")],n4);var n3=()=>({checkValidity(t){let o=t.input,i={message:"",isValid:!0,invalidKeys:[]};if(!o)return i;let r=!0;if("checkValidity"in o&&(r=o.checkValidity()),r)return i;if(i.isValid=!1,"validationMessage"in o&&(i.message=o.validationMessage),!("validity"in o))return i.invalidKeys.push("customError"),i;for(let t in o.validity)"valid"!==t&&o.validity[t]&&i.invalidKeys.push(t);return i}}),n5=w`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity, transform;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    transform-origin: center;
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));

    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Hover and active transforms */
  .button:not(.disabled):not(.loading) {
    @media (hover: hover) {
      &:hover {
        transform: var(--wa-button-transform-hover);
      }
    }
    &:active {
      transform: var(--wa-button-transform-active);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover,
      &:active {
        transform: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  /* Icon buttons with a caret need to grow to fit both the icon and the caret */
  .button.is-icon-button.caret {
    width: auto;
    aspect-ratio: auto;
    min-width: var(--wa-form-control-height);
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
    justify-content: center;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      visibility: hidden;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }
`;let n6=Symbol.for(""),n8=t=>{if(t?.r===n6)return t?._$litStatic$},n7=(t,...o)=>({_$litStatic$:o.reduce((o,i,r)=>o+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+t[r+1],t[0]),r:n6}),n9=new Map,se=t=>(o,...i)=>{let r,a,n=i.length,c=[],h=[],u,p=0,m=!1;for(;p<n;){for(u=o[p];p<n&&void 0!==(r=n8(a=i[p]));)u+=r+o[++p],m=!0;p!==n&&h.push(a),c.push(u),p++}if(p===n&&c.push(o[n]),m){let t=c.join("$$lit$$");void 0===(o=n9.get(t))&&(c.raw=c,n9.set(t,o=c)),i=h}return t(o,...i)},st=se(ed);se(eh),se(eu);var so=class extends nW{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new nH(this,"[default]","start","end"),this.localize=new rm(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="m",this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,n3()]}handleSizeChange(){nN(this.localName,this.size)}constructLightDOMButton(){let t=document.createElement("button");for(let o of this.attributes)"style"!==o.name&&t.setAttribute(o.name,o.value);return t.type=this.type,t.style.position="absolute !important",t.style.width="0 !important",t.style.height="0 !important",t.style.clipPath="inset(50%) !important",t.style.overflow="hidden !important",t.style.whiteSpace="nowrap !important",this.name&&(t.name=this.name),t.value=this.value||"",t}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if("submit"!==this.type&&"reset"!==this.type||!this.getForm())return;let o=this.constructLightDOMButton();this.parentElement?.append(o),o.click(),o.remove()}handleInvalid(){this.dispatchEvent(new nV)}handleLabelSlotChange(){let t=this.labelSlot.assignedNodes({flatten:!0}),o=!1,i=!1,r=!1,a=!1;[...t].forEach(t=>{t.nodeType===Node.ELEMENT_NODE?"wa-icon"===t.localName?(i=!0,o||(o=void 0!==t.label)):a=!0:t.nodeType===Node.TEXT_NODE&&(t.textContent?.trim()||"").length>0&&(r=!0)}),this.isIconButton=i&&!r&&!a,this.customStates.set("icon-button",this.isIconButton),this.isIconButton}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set("link",this.isLink())}handleLoadingChange(){this.customStates.set("loading",this.loading)}setValue(){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){let t=this.isLink(),o=t?n7`a`:n7`button`;return st`
      <${o}
        part="base"
        class=${ag({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:"rtl"===this.localize.dir(),"has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start","withStart"),"has-end":this.hasSlotController.test("end","withEnd"),"is-icon-button":this.isIconButton})}
        ?disabled=${(t?void 0:this.disabled)??em}
        type=${(t?void 0:this.type)??em}
        title=${this.title}
        name=${(t?void 0:this.name)??em}
        value=${(t?void 0:this.value)??em}
        href=${(t?this.href:void 0)??em}
        target=${(t?this.target:void 0)??em}
        download=${(t?this.download:void 0)??em}
        rel=${(t&&this.rel?this.rel:void 0)??em}
        role=${(t?void 0:"button")??em}
        aria-disabled=${(t&&this.disabled?"true":void 0)??em}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?st`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?st`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${o}>
    `}};so.shadowRootOptions={...nW.shadowRootOptions,delegatesFocus:!0},so.css=[n5,n0,nG],re([eA(".button")],so.prototype,"button",2),re([eA("slot:not([name])")],so.prototype,"labelSlot",2),re([eS()],so.prototype,"invalid",2),re([eS()],so.prototype,"isIconButton",2),re([e$()],so.prototype,"title",2),re([e$({reflect:!0})],so.prototype,"variant",2),re([e$({reflect:!0})],so.prototype,"appearance",2),re([e$({reflect:!0})],so.prototype,"size",2),re([nX("size")],so.prototype,"handleSizeChange",1),re([e$({attribute:"with-caret",type:Boolean,reflect:!0})],so.prototype,"withCaret",2),re([e$({attribute:"with-start",type:Boolean})],so.prototype,"withStart",2),re([e$({attribute:"with-end",type:Boolean})],so.prototype,"withEnd",2),re([e$({type:Boolean})],so.prototype,"disabled",2),re([e$({type:Boolean,reflect:!0})],so.prototype,"loading",2),re([e$({type:Boolean,reflect:!0})],so.prototype,"pill",2),re([e$()],so.prototype,"type",2),re([e$({reflect:!0})],so.prototype,"name",2),re([e$({reflect:!0})],so.prototype,"value",2),re([e$({reflect:!0})],so.prototype,"href",2),re([e$()],so.prototype,"target",2),re([e$()],so.prototype,"rel",2),re([e$()],so.prototype,"download",2),re([e$({attribute:"formaction"})],so.prototype,"formAction",2),re([e$({attribute:"formenctype"})],so.prototype,"formEnctype",2),re([e$({attribute:"formmethod"})],so.prototype,"formMethod",2),re([e$({attribute:"formnovalidate",type:Boolean})],so.prototype,"formNoValidate",2),re([e$({attribute:"formtarget"})],so.prototype,"formTarget",2),re([nX("disabled",{waitUntilFirstUpdate:!0})],so.prototype,"handleDisabledChange",1),re([nX("href")],so.prototype,"handleHrefChange",1),re([nX("loading",{waitUntilFirstUpdate:!0})],so.prototype,"handleLoadingChange",1),so=re([eC("wa-button")],so),so.disableWarning?.("change-in-update");var si=w`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`,sr=class extends ra{constructor(){super(...arguments),this.localize=new rm(this)}render(){return ed`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `}};sr.css=si,sr=re([eC("wa-spinner")],sr);var sa=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},sn=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}},ss=w`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* #region Canvas — the box the icon is centered within (mirrors Font Awesome's icon canvas). Orthogonal to font-size. */

  /* Fixed width (default): 1.25em × 1em (20 × 16px) */
  :host(:not([canvas])),
  :host([canvas='fixed']) {
    width: 1.25em;
    height: 1em;
    min-width: 1.25em; /* <-- this is what Safari respects for intrinsic */
    min-height: 1em;
  }

  /* Auto: hug the icon's width. \`auto-width\` is the deprecated alias for canvas="auto". */
  :host([canvas='auto']),
  :host([auto-width]:not([canvas])) {
    width: auto;
    height: 1em;
  }

  /* Square: 1.25em × 1.25em (20 × 20px) */
  :host([canvas='square']) {
    width: 1.25em;
    height: 1.25em;
    min-width: 1.25em;
    min-height: 1.25em;
  }

  /* Roomy: 1.5em × 1.5em (24 × 24px) */
  :host([canvas='roomy']) {
    width: 1.5em;
    height: 1.5em;
    min-width: 1.5em;
    min-height: 1.5em;
  }

  /* #endregion */

  svg {
    fill: currentColor;
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* #region Animations — ported from Font Awesome 7.3 (--fa-* props mapped to wa-icon's --* names) */

  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.5s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip-360']) {
    animation-name: flip-360;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.75s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  /* spin-reverse is FA's reverse modifier expressed as a standalone value; reverse any spin via --animation-direction: reverse */
  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap']) {
    animation-name: spin-snap;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-4']) {
    animation-name: spin-snap-4;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2.4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-8']) {
    animation-name: spin-snap-8;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='buzz']) {
    animation-name: buzz;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.6s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='wag']) {
    animation-name: wag;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: bottom center;
  }

  :host([animation='float']) {
    animation-name: float;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
    will-change: transform;
  }

  :host([animation='swing']) {
    animation-name: swing;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: top center;
  }

  :host([animation='jello']) {
    animation-name: jello;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
  }

  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='flip-360']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']),
    :host([animation='spin-snap']),
    :host([animation='spin-snap-4']),
    :host([animation='spin-snap-8']),
    :host([animation='buzz']),
    :host([animation='wag']),
    :host([animation='float']),
    :host([animation='swing']),
    :host([animation='jello']) {
      animation: none !important;
      transition: none !important;
    }
  }

  /* #endregion */

  /* #region Keyframes — ported verbatim from Font Awesome 7.3 */

  @keyframes beat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    45% {
      transform: scale(calc(1.22 * var(--beat-scale, 1.22)));
    }
    65% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    90% {
      transform: scale(1);
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
      /* No fallback by design (ported from FA 7.3): the first segment uses the user's --animation-timing or the CSS
         initial ease, while the explicit cubic-beziers on later stops drive the bounce physics. */
      animation-timing-function: var(--animation-timing);
    }
    14% {
      transform: scale(var(--bounce-start-scale-x, 1.06), var(--bounce-start-scale-y, 0.94))
        translateY(var(--bounce-anticipation, 3px));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    32% {
      transform: scale(var(--bounce-jump-scale-x, 0.94), var(--bounce-jump-scale-y, 1.12))
        translateY(calc(-1 * var(--bounce-height, 0.5em)));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    52% {
      transform: scale(1, 1) translateY(calc(-1 * var(--bounce-height, 0.5em) * 1.1));
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    70% {
      transform: scale(var(--bounce-land-scale-x, 1.06), var(--bounce-land-scale-y, 0.92)) translateY(0);
      animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
    }
    85% {
      transform: scale(0.98, 1.04) translateY(calc(-2px * var(--bounce-rebound, 1)));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes fade {
    0% {
      opacity: 1;
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    40% {
      opacity: var(--fade-opacity, 0.4);
      transform: scale(0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes beat-fade {
    0% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    25% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    45% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    65% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
  }

  @keyframes flip {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    35% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: linear;
    }
    65% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.5));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    92% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes flip-360 {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    50% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    80% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(35deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    20% {
      transform: rotate(-22deg) translateX(-1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    35% {
      transform: rotate(15deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    50% {
      transform: rotate(-9deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    65% {
      transform: rotate(5deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    78% {
      transform: rotate(-3deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    90% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    12% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    16.67% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    28.67% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    33.33% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    45.33% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    62% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    66.67% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    78.67% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    83.33% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    95.33% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-4 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    15% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    40% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    65% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    90% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-8 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    9% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    12.5% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    21.5% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    34% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    37.5% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    46.5% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    59% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    62.5% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    71.5% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    84% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    87.5% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    96.5% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes buzz {
    0% {
      transform: translateX(0) rotate(0deg);
      animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
    }
    5% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.5deg);
    }
    10% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.5deg);
    }
    15% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.3deg);
    }
    20% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.3deg);
    }
    25% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.7)) rotate(0.2deg);
    }
    30% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
    }
    35% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.4)) rotate(0.1deg);
    }
    40% {
      transform: translateX(0) rotate(0deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes wag {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    12% {
      transform: rotate(var(--wag-angle, 12deg));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    24% {
      transform: rotate(2deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    36% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.85));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    48% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    58% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.6));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    15% {
      transform: translateY(calc(-0.4 * var(--float-height, 6px))) translateX(var(--float-drift, 1px))
        rotate(var(--float-tilt, 1deg)) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    35% {
      transform: translateY(calc(-1 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-stretch-x, 0.98), var(--float-stretch-y, 1.03));
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
    }
    50% {
      transform: translateY(calc(-0.92 * var(--float-height, 6px))) translateX(calc(-0.5 * var(--float-drift, 1px)))
        rotate(calc(-0.5 * var(--float-tilt, 1deg))) scale(0.995, 1.01);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    70% {
      transform: translateY(calc(-0.3 * var(--float-height, 6px))) translateX(calc(-1 * var(--float-drift, 1px)))
        rotate(calc(-1 * var(--float-tilt, 1deg))) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    90% {
      transform: translateY(calc(0.05 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
    }
  }

  @keyframes swing {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(var(--swing-angle, 22deg));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    18% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.85));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    28% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.65));
      animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
    }
    38% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.45));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    56% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.1));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    64% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes jello {
    0% {
      transform: scale(1, 1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    12% {
      transform: scale(var(--jello-scale-x, 1.15), calc(2 - var(--jello-scale-x, 1.15)));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    24% {
      transform: scale(calc(2 - var(--jello-scale-y, 1.12)), var(--jello-scale-y, 1.12));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    36% {
      transform: scale(
        calc(1 + (var(--jello-scale-x, 1.15) - 1) * 0.5),
        calc(2 - (1 + (var(--jello-scale-x, 1.15) - 1) * 0.5))
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: scale(
        calc(2 - (1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)),
        calc(1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    58% {
      transform: scale(1.02, 0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  /* #endregion */
`,sl="",sc="7.3.0",sd={solid:{backward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>',"backward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',"closed-captioning":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>',"closed-captioning-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>',compress:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>',"ellipsis-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>',expand:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',forward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"forward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>',gauge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',gear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',"picture-in-picture":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',"play-circle":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-low":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{calendar:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>',"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',clock:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},sh=[{name:"default",resolver:(t,o="classic",i="solid")=>(function(t,o,i){let r,a=(r="solid","chisel"===o&&(r="chisel-regular"),"etch"===o&&(r="etch-solid"),"graphite"===o&&(r="graphite-thin"),"jelly"===o&&(r="jelly-regular","duo-regular"===i&&(r="jelly-duo-regular"),"fill-regular"===i&&(r="jelly-fill-regular")),"jelly-duo"===o&&(r="jelly-duo-regular"),"jelly-fill"===o&&(r="jelly-fill-regular"),"notdog"===o&&("solid"===i&&(r="notdog-solid"),"duo-solid"===i&&(r="notdog-duo-solid")),"notdog-duo"===o&&(r="notdog-duo-solid"),"slab"===o&&(("solid"===i||"regular"===i)&&(r="slab-regular"),"press-regular"===i&&(r="slab-press-regular")),"slab-press"===o&&(r="slab-press-regular"),"slab-duo"===o&&(r="slab-duo-regular"),"slab-press-duo"===o&&(r="slab-press-duo-regular"),"thumbprint"===o&&(r="thumbprint-light"),"utility"===o&&(r="utility-semibold"),"utility-duo"===o&&(r="utility-duo-semibold"),"utility-fill"===o&&(r="utility-fill-semibold"),"whiteboard"===o&&(r="whiteboard-semibold"),"mosaic"===o&&(r="mosaic-solid"),"pixel"===o&&(r="pixel-regular"),"vellum"===o&&(r="vellum-solid"),"classic"===o&&("thin"===i&&(r="thin"),"light"===i&&(r="light"),"regular"===i&&(r="regular"),"solid"===i&&(r="solid")),"duotone"===o&&("thin"===i&&(r="duotone-thin"),"light"===i&&(r="duotone-light"),"regular"===i&&(r="duotone-regular"),"solid"===i&&(r="duotone")),"sharp"===o&&("thin"===i&&(r="sharp-thin"),"light"===i&&(r="sharp-light"),"regular"===i&&(r="sharp-regular"),"solid"===i&&(r="sharp-solid")),"sharp-duotone"===o&&("thin"===i&&(r="sharp-duotone-thin"),"light"===i&&(r="sharp-duotone-light"),"regular"===i&&(r="sharp-duotone-regular"),"solid"===i&&(r="sharp-duotone-solid")),"brands"===o&&(r="brands"),r),n="".replace(/\/$/,"");if(n)return`${n}/${a}/${t}.svg`;let c=function(){if(!sl){let t=document.querySelector("[data-fa-kit-code]");t&&(sl=t.getAttribute("data-fa-kit-code")||"")}return sl}();return c.length>0?`https://ka-p.fontawesome.com/releases/v${sc}/svgs/${a}/${t}.svg?token=${encodeURIComponent(c)}`:`https://ka-f.fontawesome.com/releases/v${sc}/svgs/${a}/${t}.svg`})(t,o,i),mutator:(t,o)=>{if(o?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:i,variant:r}=o;if("duotone"===i||"sharp-duotone"===i||"notdog-duo"===i||"notdog"===i&&"duo-solid"===r||"jelly-duo"===i||"jelly"===i&&"duo-regular"===r||"utility-duo"===i||"slab-duo"===i||"slab-press-duo"===i||"thumbprint"===i){let i=[...t.querySelectorAll("path")],r=i.find(t=>!t.hasAttribute("opacity")),a=i.find(t=>t.hasAttribute("opacity"));if(!r||!a)return;if(r.setAttribute("data-duotone-primary",""),a.setAttribute("data-duotone-secondary",""),o.swapOpacity&&r&&a){let t=a.getAttribute("opacity")||"0.4";r.style.setProperty("--path-opacity",t),a.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},{name:"system",resolver:(t,o="classic",i="solid")=>{let r=sd[i][t]??sd.regular[t]??sd.regular["circle-question"];if(r)return`data:image/svg+xml,${encodeURIComponent(r)}`;return""}}],su=new Set;function sp(t){return sh.find(o=>o.name===t)}function sm(t,o){var i;i=t,sh=sh.filter(t=>t.name!==i),sh.push({name:t,resolver:o.resolver,mutator:o.mutator,spriteSheet:o.spriteSheet}),su.forEach(o=>{o.library===t&&o.setIcon()})}var sg=Symbol(),sb=Symbol(),sf=new Map,sv=class extends ra{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,o)=>{let i;if(o?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=ed`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let i=this.shadowRoot.querySelector("[part='svg']");return"function"==typeof o.mutator&&o.mutator(i,this),this.svg}try{if(!(i=await fetch(t,{mode:"cors"})).ok)return 410===i.status?sg:sb}catch{return sb}try{let t=document.createElement("div");t.innerHTML=await i.text();let o=t.firstElementChild;if(o?.tagName?.toLowerCase()!=="svg")return sg;eF||(eF=new DOMParser);let r=eF.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");if(!r)return sg;return r.part.add("svg"),document.adoptNode(r)}catch{return sg}}}connectedCallback(){super.connectedCallback(),su.add(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),su.delete(this)}async getIconSource(){let t=sp(this.library),o=this.family||"classic";if(this.name&&t){let i,r="auto"===this.canvas||this.autoWidth;try{i=await t.resolver(this.name,o,this.variant,r)}catch{i=void 0}return{url:i,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:o}=await this.getIconSource(),i=o?sp(this.library):void 0;if(!t){this.svg=null;return}let r=sf.get(t);r||(r=this.resolveIcon(t,i),sf.set(t,r));let a=await r;if(a===sb&&sf.delete(t),t===(await this.getIconSource()).url){let t;if(void 0===t?void 0!==a?._$litType$:a?._$litType$===t){this.svg=a;return}switch(a){case sb:case sg:this.svg=null,this.dispatchEvent(new sa);break;default:this.svg=a.cloneNode(!0),i?.mutator?.(this.svg,this),this.dispatchEvent(new sn)}}}willUpdate(t){return this.style||this.setStyleProperty("--rotate-angle",`${this.rotate}deg`),super.willUpdate(t)}updated(t){super.updated(t);let o=sp(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let i=this.shadowRoot?.querySelector("svg");i&&o?.mutator?.(i,this)}render(){return this.hasUpdated?this.svg:ed`<svg part="svg" width="16" height="16" viewBox="0 0 16 16"></svg>`}};sv.css=ss,re([eS()],sv.prototype,"svg",2),re([e$({reflect:!0})],sv.prototype,"name",2),re([e$({reflect:!0})],sv.prototype,"family",2),re([e$({reflect:!0})],sv.prototype,"variant",2),re([e$({reflect:!0})],sv.prototype,"canvas",2),re([e$({attribute:"auto-width",type:Boolean,reflect:!0})],sv.prototype,"autoWidth",2),re([e$({attribute:"swap-opacity",type:Boolean,reflect:!0})],sv.prototype,"swapOpacity",2),re([e$()],sv.prototype,"src",2),re([e$()],sv.prototype,"label",2),re([e$({reflect:!0})],sv.prototype,"library",2),re([e$({type:Number,reflect:!0})],sv.prototype,"rotate",2),re([e$({type:String,reflect:!0})],sv.prototype,"flip",2),re([e$({type:String,reflect:!0})],sv.prototype,"animation",2),re([nX("label")],sv.prototype,"handleLabelChange",1),re([nX(["family","name","library","variant","src","autoWidth","canvas","swapOpacity"],{waitUntilFirstUpdate:!0})],sv.prototype,"setIcon",1),sv=re([eC("wa-icon")],sv);sm("default",{resolver:()=>""}),sm("system",{resolver:()=>""});var sw=Object.defineProperty,sy=Object.getOwnPropertyDescriptor,sk=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?sy(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&sw(o,i,n),n};let sx=class extends lit_element_i{constructor(){super(...arguments),this.value="",this.disabled=!1,this.options=[],this.hoist=!1,this.size="medium"}handleChange(t){let o=t.target;t.stopPropagation(),this.value=o.value;let i=new CustomEvent("gl-change-value",{detail:{value:this.value},bubbles:!0,composed:!0});this.dispatchEvent(i);let r=new Event("change",{bubbles:!0,composed:!0});this.dispatchEvent(r)}render(){return ed`
			<wa-select
				exportparts="combobox, display-input, expand-icon, listbox"
				value=${this.value}
				?disabled=${this.disabled}
				label=${this.label??em}
				placeholder=${this.placeholder??em}
				size=${this.size}
				@change=${this.handleChange}
			>
				<code-icon icon="chevron-down" slot="expand-icon"></code-icon>
				${this.options.map(t=>ed`
						<wa-option value=${t.value} ?disabled=${t.disabled??!1}>
							${t.label}
						</wa-option>
					`)}
				<slot></slot>
			</wa-select>
		`}focus(t){this.selectElement?.focus(t)}blur(){this.selectElement?.blur()}async show(){await this.selectElement?.show()}async hide(){await this.selectElement?.hide()}};sx.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sx.styles=nz,sk([eA("wa-select")],sx.prototype,"selectElement",2),sk([e$({type:String})],sx.prototype,"value",2),sk([e$({type:Boolean,reflect:!0})],sx.prototype,"disabled",2),sk([e$({type:String})],sx.prototype,"label",2),sk([e$({type:String})],sx.prototype,"placeholder",2),sk([e$({type:Array})],sx.prototype,"options",2),sk([e$({type:Boolean})],sx.prototype,"hoist",2),sk([e$({type:String})],sx.prototype,"size",2),sx=sk([eC("gl-select")],sx);let sC=w`
	:host {
		display: inline-flex;
		gap: var(--gl-space-12);
		align-items: center;
	}

	wa-slider {
		--track-size: 0.4rem;
		--thumb-width: 1.4rem;
		--thumb-height: 1.4rem;

		flex: 1;
		min-width: 12rem;
	}

	wa-slider::part(track) {
		background-color: color-mix(in srgb, var(--color-foreground) 20%, transparent);
		border: var(--gl-border-width) solid var(--vscode-contrastBorder, transparent);
	}

	wa-slider::part(indicator) {
		background-color: var(--vscode-button-background);
	}

	wa-slider::part(thumb) {
		background-color: var(--vscode-button-background);
		border: var(--gl-border-width) solid var(--vscode-contrastBorder, var(--vscode-button-background));
		box-shadow: 0 1px 2px var(--vscode-widget-shadow);
	}

	wa-slider:focus-within::part(thumb) {
		outline: var(--gl-border-width) solid var(--color-focus-border);
		outline-offset: 2px;
	}

	wa-slider[disabled] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.value {
		flex: none;
		min-width: 4.4rem;
		font-family: var(--vscode-editor-font-family);
		font-size: 1.2rem;
		color: var(--color-foreground--85);
	}

	@media (prefers-reduced-motion: reduce) {
		wa-slider::part(thumb),
		wa-slider::part(indicator) {
			transition: none;
		}
	}
`;var s_=w`
  :host {
    --track-size: 0.5em;
    --thumb-width: 1.4em;
    --thumb-height: 1.4em;
    --marker-width: 0.1875em;
    --marker-height: 0.1875em;
  }

  :host([orientation='vertical']) {
    width: auto;
  }

  #label:has(~ .vertical) {
    display: block;
    order: 2;
    max-width: none;
    text-align: center;
  }

  #description:has(~ .vertical) {
    order: 3;
    text-align: center;
  }

  /* Add extra space between slider and label, when present */
  #label.has-label ~ #slider {
    &.horizontal {
      margin-block-start: 0.5em;
    }
    &.vertical {
      margin-block-end: 0.5em;
    }
  }

  #slider {
    touch-action: none;

    &:focus {
      outline: none;
    }

    &:focus-visible:not(.disabled) #thumb,
    &:focus-visible:not(.disabled) #thumb-min,
    &:focus-visible:not(.disabled) #thumb-max {
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  #track {
    position: relative;
    border-radius: 9999px;
    background: var(--wa-color-neutral-fill-normal);
    isolation: isolate;
  }

  /* Orientation */
  .horizontal #track {
    height: var(--track-size);
  }

  .vertical #track {
    order: 1;
    width: var(--track-size);
    height: 200px;
  }

  /* Disabled */
  .disabled #track {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Indicator */
  #indicator {
    position: absolute;
    border-radius: inherit;
    background-color: var(--wa-form-control-activated-color);

    &:dir(ltr) {
      right: calc(100% - max(var(--start), var(--end)));
      left: min(var(--start), var(--end));
    }

    &:dir(rtl) {
      right: min(var(--start), var(--end));
      left: calc(100% - max(var(--start), var(--end)));
    }
  }

  .horizontal #indicator {
    top: 0;
    height: 100%;
  }

  .vertical #indicator {
    top: calc(100% - var(--end));
    bottom: var(--start);
    left: 0;
    width: 100%;
  }

  /* Thumbs */
  #thumb,
  #thumb-min,
  #thumb-max {
    z-index: 3;
    position: absolute;
    width: var(--thumb-width);
    height: var(--thumb-height);
    border: solid 0.125em var(--wa-color-surface-default);
    border-radius: 50%;
    background-color: var(--wa-form-control-activated-color);
    cursor: pointer;
  }

  .disabled #thumb,
  .disabled #thumb-min,
  .disabled #thumb-max {
    cursor: inherit;
  }

  .horizontal #thumb,
  .horizontal #thumb-min,
  .horizontal #thumb-max {
    top: calc(50% - var(--thumb-height) / 2);

    &:dir(ltr) {
      right: auto;
      left: calc(var(--position) - var(--thumb-width) / 2);
    }

    &:dir(rtl) {
      right: calc(var(--position) - var(--thumb-width) / 2);
      left: auto;
    }
  }

  .vertical #thumb,
  .vertical #thumb-min,
  .vertical #thumb-max {
    bottom: calc(var(--position) - var(--thumb-height) / 2);
    left: calc(50% - var(--thumb-width) / 2);
  }

  /* Range-specific thumb styles */
  :host([range]) {
    #thumb-min:focus-visible,
    #thumb-max:focus-visible {
      z-index: 4; /* Ensure focused thumb appears on top */
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  /* Markers */
  #markers {
    pointer-events: none;
  }

  .marker {
    z-index: 2;
    position: absolute;
    width: var(--marker-width);
    height: var(--marker-height);
    border-radius: 50%;
    background-color: var(--wa-color-surface-default);
  }

  .marker:first-of-type,
  .marker:last-of-type {
    display: none;
  }

  .horizontal .marker {
    top: calc(50% - var(--marker-height) / 2);
    left: calc(var(--position) - var(--marker-width) / 2);
  }

  .vertical .marker {
    top: calc(var(--position) - var(--marker-height) / 2);
    left: calc(50% - var(--marker-width) / 2);
  }

  /* Marker labels */
  #references {
    position: relative;

    slot {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    ::slotted(*) {
      color: var(--wa-color-text-quiet);
      font-size: 0.875em;
      line-height: 1;
    }
  }

  .horizontal {
    #references {
      margin-block-start: 0.5em;
    }
  }

  .vertical {
    display: flex;
    margin-inline: auto;

    #track {
      order: 1;
    }

    #references {
      order: 2;
      width: min-content;
      margin-inline-start: 0.75em;

      slot {
        flex-direction: column;
      }
    }
  }

  .vertical #references slot {
    flex-direction: column;
  }
`,s$="u">typeof window&&"ontouchstart"in window,sS=class{constructor(t,o){this.isActive=!1,this.isDragging=!1,this.handleDragStart=t=>{let o="touches"in t?t.touches[0].clientX:t.clientX,i="touches"in t?t.touches[0].clientY:t.clientY;this.isDragging||!s$&&t.buttons>1||(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("pointercancel",this.handleDragStop),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),document.addEventListener("touchcancel",this.handleDragStop),this.options.start(o,i))},this.handleDragStop=t=>{let o="changedTouches"in t?t.changedTouches[0].clientX:t.clientX,i="changedTouches"in t?t.changedTouches[0].clientY:t.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.options.stop(o,i)},this.handleDragMove=t=>{let o="touches"in t?t.touches[0].clientX:t.clientX,i="touches"in t?t.touches[0].clientY:t.clientY;window.getSelection()?.removeAllRanges(),this.options.move(o,i)},this.element=t,this.options={start:()=>void 0,stop:()=>void 0,move:()=>void 0,...o},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),s$&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.element.removeEventListener("pointerdown",this.handleDragStart),s$&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(t){(void 0!==t?t:!this.isActive)?this.start():this.stop()}};function sL(t,o,i){let r=t=>Object.is(t,-0)?0:t;return r(t<o?o:t>i?i:t)}let sA="important",sz=" !"+sA,sE=tl(class extends directive_i{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((o,i)=>{let r=t[i];return null==r?o:o+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[o]){let{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(o)),this.render(o);for(let t of this.ft)null==o[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(let t in o){let r=o[t];if(null!=r){this.ft.add(t);let o="string"==typeof r&&r.endsWith(sz);t.includes("-")||o?i.setProperty(t,o?r.slice(0,-11):r,o?sA:""):i[t]=r}}return ep}});var sR=class extends nW{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new nH(this,"hint","label"),this.localize=new rm(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=null==this.getAttribute("value")?this.minValue:Number(this.getAttribute("value")),this._value=null,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="m",this.min=0,this.max=100,this.step=1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,{observedAttributes:["min","max","step"],checkValidity(t){let o={message:"",isValid:!0,invalidKeys:[]},i=(t,o,i,r)=>{if("u"<typeof document)return"";let a=document.createElement("input");return a.type="range",a.min=String(o),a.max=String(i),a.step=String(r),a.value=String(t),a.checkValidity(),a.validationMessage};if(t.isRange){let r=t.minValue,a=t.maxValue;if(r<t.min)return o.isValid=!1,o.invalidKeys.push("rangeUnderflow"),o.message=i(r,t.min,t.max,t.step)||`Value must be greater than or equal to ${t.min}.`,o;if(a>t.max)return o.isValid=!1,o.invalidKeys.push("rangeOverflow"),o.message=i(a,t.min,t.max,t.step)||`Value must be less than or equal to ${t.max}.`,o;if(t.step&&1!==t.step){let n=(r-t.min)%t.step!=0,c=(a-t.min)%t.step!=0;(n||c)&&(o.isValid=!1,o.invalidKeys.push("stepMismatch"),o.message=i(n?r:a,t.min,t.max,t.step)||`Value must be a multiple of ${t.step}.`)}}else{let r=t.value;if(r<t.min)return o.isValid=!1,o.invalidKeys.push("rangeUnderflow"),o.message=i(r,t.min,t.max,t.step)||`Value must be greater than or equal to ${t.min}.`,o;if(r>t.max)return o.isValid=!1,o.invalidKeys.push("rangeOverflow"),o.message=i(r,t.min,t.max,t.step)||`Value must be less than or equal to ${t.max}.`,o;t.step&&1!==t.step&&(r-t.min)%t.step!=0&&(o.isValid=!1,o.invalidKeys.push("stepMismatch"),o.message=i(r,t.min,t.max,t.step)||`Value must be a multiple of ${t.step}.`)}return o}}]}get focusableAnchor(){return this.isRange&&this.thumbMin||this.slider}get validationTarget(){return this.focusableAnchor}get value(){return this.valueHasChanged?sL(this._value??this.minValue??0,this.min,this.max):sL(this._value??this.defaultValue,this.min,this.max)}set value(t){t=Number(t)??this.minValue,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isRange(){return this.range}handleSizeChange(){nN(this.localName,this.size)}firstUpdated(){this.isRange?(this.draggableThumbMin=new sS(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,o)=>{this.setThumbValueFromCoordinates(t,o,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new sS(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,o)=>{this.setThumbValueFromCoordinates(t,o,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new sS(this.track,{start:(t,o)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted="min"===this.activeThumb?this.minValue:this.maxValue;else{let i=this.getValueFromCoordinates(t,o),r=Math.abs(i-this.minValue),a=Math.abs(i-this.maxValue);if(r===a)if(i>this.maxValue)this.activeThumb="max";else if(i<this.minValue)this.activeThumb="min";else{let i="rtl"===this.localize.dir(),r="vertical"===this.orientation,a=r?o:t,n=this.lastTrackPosition||a;this.lastTrackPosition=a,this.activeThumb=a>n!==i&&!r||a<n&&r?"max":"min"}else this.activeThumb=r<=a?"min":"max";this.valueWhenDraggingStarted="min"===this.activeThumb?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(t,o,this.activeThumb),this.showRangeTooltips()},move:(t,o)=>{this.activeThumb&&this.setThumbValueFromCoordinates(t,o,this.activeThumb)},stop:()=>{this.activeThumb&&("min"===this.activeThumb?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new sS(this.slider,{start:(t,o)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(t,o),this.showTooltip()},move:(t,o)=>{this.setValueFromCoordinates(t,o)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}willUpdate(t){this.isRange&&(t.has("minValue")||t.has("maxValue")||t.has("min")||t.has("max"))&&(this.minValue=sL(this.minValue,this.min,this.maxValue),this.maxValue=sL(this.maxValue,this.minValue,this.max)),super.willUpdate(t)}updated(t){if(this.isRange&&(t.has("minValue")||t.has("maxValue"))&&this.updateFormValue(),t.has("disabled")||t.has("readonly")){let t=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(t),this.draggableThumbMax&&this.draggableThumbMax.toggle(t)),this.draggableTrack&&this.draggableTrack.toggle(t)}super.updated(t)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):(this._value=null,this.defaultValue=this.defaultValue??parseFloat(this.getAttribute("value")??String(this.min))),this.valueHasChanged=!1,this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(t){let o=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length,i=Number(this.step),r=Number(this.min),a=Number(this.max);return parseFloat((t=sL(t=Math.round(t/i)*i,r,a)).toFixed(o))}getPercentageFromValue(t){return(t-this.min)/(this.max-this.min)*100}getValueFromCoordinates(t,o){let i="rtl"===this.localize.dir(),r="vertical"===this.orientation,{top:a,right:n,bottom:c,left:h,height:u,width:p}=this.trackBoundingClientRect,m=r?o:t,g=r?{start:a,end:c,size:u}:{start:h,end:n,size:p},b=(r||i?g.end-m:m-g.start)/g.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*b)}handleBlur(){this.isRange?requestAnimationFrame(()=>{let t=this.shadowRoot?.activeElement;t!==this.thumbMin&&t!==this.thumbMax&&this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(t){let o=t.target;this.isRange?(o===this.thumbMin?this.activeThumb="min":o===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(t){let o="rtl"===this.localize.dir(),i=t.target;if(this.disabled||this.readonly||this.isRange&&(i===this.thumbMin?this.activeThumb="min":i===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;let r=this.isRange?"min"===this.activeThumb?this.minValue:this.maxValue:this.value,a=r;switch(t.key){case"ArrowUp":case o?"ArrowLeft":"ArrowRight":t.preventDefault(),a=this.clampAndRoundToStep(r+this.step);break;case"ArrowDown":case o?"ArrowRight":"ArrowLeft":t.preventDefault(),a=this.clampAndRoundToStep(r-this.step);break;case"Home":t.preventDefault(),a=this.isRange&&"min"===this.activeThumb?this.min:this.isRange?this.minValue:this.min;break;case"End":t.preventDefault(),a=this.isRange&&"max"===this.activeThumb?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":t.preventDefault();let n=Math.max(r+(this.max-this.min)/10,r+this.step);a=this.clampAndRoundToStep(n);break;case"PageDown":t.preventDefault();let c=Math.min(r-(this.max-this.min)/10,r-this.step);a=this.clampAndRoundToStep(c);break;case"Enter":var h;let u;h=this,u=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey,"Enter"!==t.key||u||setTimeout(()=>{t.defaultPrevented||t.isComposing||function(t){let o=null;if("form"in t&&(o=t.form),!o&&"getForm"in t&&(o=t.getForm()),!o)return;let i=[...o.elements];if(1===i.length)return o.requestSubmit(null);let r=i.find(t=>"submit"===t.type&&!t.matches(":disabled"));r&&(["input","button"].includes(r.localName)?o.requestSubmit(r):r.click())}(h)});return}a!==r&&(this.isRange?("min"===this.activeThumb?a>this.maxValue?(this.maxValue=a,this.minValue=a):this.minValue=Math.max(this.min,a):a<this.minValue?(this.minValue=a,this.maxValue=a):this.maxValue=Math.min(this.max,a),this.updateFormValue()):this.value=sL(a,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(t){t.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(t,o){let i=this.value;this.value=this.getValueFromCoordinates(t,o),this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(t,o,i){let r=this.getValueFromCoordinates(t,o),a="min"===i?this.minValue:this.maxValue;"min"===i?r>this.maxValue?(this.maxValue=r,this.minValue=r):this.minValue=Math.max(this.min,r):r<this.minValue?(this.minValue=r,this.maxValue=r):this.maxValue=Math.min(this.max,r),a!==("min"===i?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;let t=this.shadowRoot?.getElementById("tooltip-thumb-min"),o=this.shadowRoot?.getElementById("tooltip-thumb-max");"min"===this.activeThumb?(t&&(t.open=!0),o&&(o.open=!1)):"max"===this.activeThumb&&(o&&(o.open=!0),t&&(t.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;let t=this.shadowRoot?.getElementById("tooltip-thumb-min"),o=this.shadowRoot?.getElementById("tooltip-thumb-max");t&&(t.open=!1),o&&(o.open=!1)}updateFormValue(t){if(this.isRange){let t=new FormData;t.append(this.name||"",String(this.minValue)),t.append(this.name||"",String(this.maxValue)),this.setValue(t,t);return}super.updateFormValue(t)}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){if(this.isRange){for(let t of function* t(o=document.activeElement){null!=o&&(yield o,"shadowRoot"in o&&o.shadowRoot&&"closed"!==o.shadowRoot.mode&&(yield*t(o.shadowRoot.activeElement)))}())if(t===this.thumbMin){this.thumbMin.blur();break}else if(t===this.thumbMax){this.thumbMax.blur();break}}else this.slider.blur()}stepDown(){if(this.isRange){let t=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=sL(t,this.min,this.maxValue),this.updateFormValue()}else{let t=this.clampAndRoundToStep(this.value-this.step);this.value=t}}stepUp(){if(this.isRange){let t=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=sL(t,this.minValue,this.max),this.updateFormValue()}else{let t=this.clampAndRoundToStep(this.value+this.step);this.value=t}}render(){let t=this.hasSlotController.test("label","withLabel"),o=this.hasSlotController.test("hint","withHint"),i=!!this.label||!!t,r=!!this.hint||!!o,a=this.hasSlotController.test("reference"),n=ag({xs:"xs"===this.size,s:"s"===this.size||"small"===this.size,m:"m"===this.size||"medium"===this.size,l:"l"===this.size||"large"===this.size,xl:"xl"===this.size,small:"small"===this.size||"s"===this.size,medium:"medium"===this.size||"m"===this.size,large:"large"===this.size||"l"===this.size,horizontal:"horizontal"===this.orientation,vertical:"vertical"===this.orientation,disabled:this.disabled}),c=[];if(this.withMarkers)for(let t=this.min;t<=this.max;t+=this.step)c.push(this.getPercentageFromValue(t));let h=ed`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${ag({vh:!i,"has-label":i})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,u=ed`
      <div
        id="hint"
        part="hint"
        class=${ag({"has-slotted":r})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,p=this.withMarkers?ed`
          <div id="markers" part="markers">
            ${c.map(t=>ed`<span part="marker" class="marker" style=${sE({"--position":`${t}%`})}></span>`)}
          </div>
        `:"",m=a?ed`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",g=(t,o)=>this.withTooltip?ed`
            <wa-tooltip
              id=${`tooltip${"thumb"!==t?"-"+t:""}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${t}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${"function"==typeof this.valueFormatter?this.valueFormatter(o):this.localize.number(o)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){let t=sL(this.getPercentageFromValue(this.minValue),0,100),o=sL(this.getPercentageFromValue(this.maxValue),0,100);return ed`
        ${h}

        <div id="slider" part="slider" class=${n}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${sE({"--start":`${Math.min(t,o)}%`,"--end":`${Math.max(t,o)}%`})}
            ></div>

            ${p}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${sE({"--position":`${t}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${"function"==typeof this.valueFormatter?this.valueFormatter(this.minValue):this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (minimum value)`:"Minimum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style=${sE({"--position":`${o}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${"function"==typeof this.valueFormatter?this.valueFormatter(this.maxValue):this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (maximum value)`:"Maximum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>
          </div>

          ${m} ${u}
        </div>

        ${g("thumb-min",this.minValue)} ${g("thumb-max",this.maxValue)}
      `}{let t=sL(this.getPercentageFromValue(this.value),0,100),o=sL(this.getPercentageFromValue("number"==typeof this.indicatorOffset?this.indicatorOffset:this.min),0,100);return ed`
        ${h}

        <div
          id="slider"
          part="slider"
          class=${n}
          role="slider"
          aria-disabled=${this.disabled?"true":"false"}
          aria-readonly=${this.disabled?"true":"false"}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${"function"==typeof this.valueFormatter?this.valueFormatter(this.value):this.localize.number(this.value)}
          aria-valuemax=${this.max}
          aria-labelledby="label"
          aria-describedby="hint"
          tabindex=${this.disabled?-1:0}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        >
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${sE({"--start":`${o}%`,"--end":`${t}%`})}
            ></div>

            ${p}
            <span id="thumb" part="thumb" style=${sE({"--position":`${t}%`})}></span>
          </div>

          ${m} ${u}
        </div>

        ${g("thumb",this.value)}
      `}}};sR.formAssociated=!0,sR.observeSlots=!0,sR.css=[nG,nq,s_],re([eA("#slider")],sR.prototype,"slider",2),re([eA("#thumb")],sR.prototype,"thumb",2),re([eA("#thumb-min")],sR.prototype,"thumbMin",2),re([eA("#thumb-max")],sR.prototype,"thumbMax",2),re([eA("#track")],sR.prototype,"track",2),re([eA("#tooltip")],sR.prototype,"tooltip",2),re([e$()],sR.prototype,"label",2),re([e$({attribute:"hint"})],sR.prototype,"hint",2),re([e$({reflect:!0})],sR.prototype,"name",2),re([e$({type:Number,attribute:"min-value"})],sR.prototype,"minValue",2),re([e$({type:Number,attribute:"max-value"})],sR.prototype,"maxValue",2),re([e$({attribute:"value",reflect:!0,type:Number})],sR.prototype,"defaultValue",2),re([eS()],sR.prototype,"value",1),re([e$({type:Boolean,reflect:!0})],sR.prototype,"range",2),re([e$({type:Boolean})],sR.prototype,"disabled",2),re([e$({type:Boolean,reflect:!0})],sR.prototype,"readonly",2),re([e$({reflect:!0})],sR.prototype,"orientation",2),re([e$({reflect:!0})],sR.prototype,"size",2),re([nX("size")],sR.prototype,"handleSizeChange",1),re([e$({attribute:"indicator-offset",type:Number})],sR.prototype,"indicatorOffset",2),re([e$({type:Number})],sR.prototype,"min",2),re([e$({type:Number})],sR.prototype,"max",2),re([e$({type:Number})],sR.prototype,"step",2),re([e$({type:Boolean})],sR.prototype,"autofocus",2),re([e$({attribute:"tooltip-distance",type:Number})],sR.prototype,"tooltipDistance",2),re([e$({attribute:"tooltip-placement",reflect:!0})],sR.prototype,"tooltipPlacement",2),re([e$({attribute:"with-markers",type:Boolean})],sR.prototype,"withMarkers",2),re([e$({attribute:"with-tooltip",type:Boolean})],sR.prototype,"withTooltip",2),re([e$({attribute:"with-label",type:Boolean})],sR.prototype,"withLabel",2),re([e$({attribute:"with-hint",type:Boolean})],sR.prototype,"withHint",2),re([e$({attribute:!1})],sR.prototype,"valueFormatter",2),sR=re([eC("wa-slider")],sR);var sP=w`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    &::part(arrow) {
      border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
      border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    }
  }
`,sI=class extends ra{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&this.open&&nF(this)&&(t.preventDefault(),t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=t=>{if(this.hasTrigger("hover")){let o=t.relatedTarget,i=!!(o&&this.anchor?.contains(o)),r=!!(o&&this.contains(o));i||r||(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),"u">typeof document&&(this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=function(t=""){return`${t}${((t=21)=>{let o="",i=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)o+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&i[t]];return o})()}`}("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),nB(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,o){let i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);i.includes(o)||(i.push(o),t.setAttribute("aria-labelledby",i.join(" ")))}removeFromAriaLabelledBy(t,o){let i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(t=>t!==o);i.length>0?t.setAttribute("aria-labelledby",i.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let t=new nP;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),nD.push(this),this.body.hidden=!1,this.popup.active=!0,await nY(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new nM)}else{let t=new nI;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),nB(this),await nY(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new nO)}}handleForChange(){let t=this.getRootNode?.();if(!t)return;let o=this.for?t.getElementById?.(this.for):null,i=this.anchor;if(o===i)return;let{signal:r}=this.eventController;o&&(this.addToAriaLabelledBy(o,this.id),o.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),o.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),o.addEventListener("click",this.handleClick,{signal:r}),o.addEventListener("mouseover",this.handleMouseOver,{signal:r}),o.addEventListener("mouseout",this.handleMouseOut,{signal:r})),i&&(this.removeFromAriaLabelledBy(i,this.id),i.removeEventListener("blur",this.handleBlur,{capture:!0}),i.removeEventListener("focus",this.handleFocus,{capture:!0}),i.removeEventListener("click",this.handleClick),i.removeEventListener("mouseover",this.handleMouseOver),i.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=o}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,nK(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,nK(this,"wa-after-hide")}render(){return ed`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${ag({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};sI.css=sP,sI.dependencies={"wa-popup":av},re([eA("slot:not([name])")],sI.prototype,"defaultSlot",2),re([eA(".body")],sI.prototype,"body",2),re([eA("wa-popup")],sI.prototype,"popup",2),re([e$()],sI.prototype,"placement",2),re([e$({type:Boolean,reflect:!0})],sI.prototype,"disabled",2),re([e$({type:Number})],sI.prototype,"distance",2),re([e$({type:Boolean,reflect:!0})],sI.prototype,"open",2),re([e$({type:Number})],sI.prototype,"skidding",2),re([e$({attribute:"show-delay",type:Number})],sI.prototype,"showDelay",2),re([e$({attribute:"hide-delay",type:Number})],sI.prototype,"hideDelay",2),re([e$()],sI.prototype,"trigger",2),re([e$({attribute:"without-arrow",type:Boolean,reflect:!0})],sI.prototype,"withoutArrow",2),re([e$()],sI.prototype,"for",2),re([eS()],sI.prototype,"anchor",2),re([nX("open",{waitUntilFirstUpdate:!0})],sI.prototype,"handleOpenChange",1),re([nX("for")],sI.prototype,"handleForChange",1),re([nX(["distance","placement","skidding"])],sI.prototype,"handleOptionsChange",1),re([nX("disabled")],sI.prototype,"handleDisabledChange",1),sI=re([eC("wa-tooltip")],sI);var sM=Object.defineProperty,sO=Object.getOwnPropertyDescriptor,sT=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?sO(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&sM(o,i,n),n};let sD=class extends lit_element_i{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.disabled=!1,this.unit=""}handleInput(t){t.stopPropagation(),this.value=t.target.value,this.dispatchEvent(new CustomEvent("gl-input-value",{bubbles:!0,composed:!0}))}handleChange(t){t.stopPropagation(),this.value=t.target.value,this.dispatchEvent(new CustomEvent("gl-change-value",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}render(){return ed`<wa-slider
				exportparts="base, track, indicator, thumb"
				.value=${this.value}
				min=${this.min}
				max=${this.max}
				step=${this.step}
				?disabled=${this.disabled}
				label=${this.label??em}
				.valueFormatter=${t=>`${t}${this.unit}`}
				@input=${this.handleInput}
				@change=${this.handleChange}
			></wa-slider>
			<span class="value" aria-hidden="true">${this.value}${this.unit}</span>`}focus(t){this.sliderElement?.focus()}blur(){this.sliderElement?.blur()}};sD.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sD.styles=sC,sT([eA("wa-slider")],sD.prototype,"sliderElement",2),sT([e$({type:Number})],sD.prototype,"value",2),sT([e$({type:Number})],sD.prototype,"min",2),sT([e$({type:Number})],sD.prototype,"max",2),sT([e$({type:Number})],sD.prototype,"step",2),sT([e$({type:Boolean,reflect:!0})],sD.prototype,"disabled",2),sT([e$({type:String})],sD.prototype,"label",2),sT([e$({type:String})],sD.prototype,"unit",2),sD=sT([eC("gl-slider")],sD);var sB=Object.defineProperty,sF=Object.getOwnPropertyDescriptor,sq=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?sF(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&sB(o,i,n),n};let sV=class extends ts(lit_element_i){constructor(){super(...arguments),this.highlighted=!1,this.indent=!1}get visible(){if(this.highlighted)return!0;let t=this.descriptor.visibleWhen;return null==t||iI(t,t=>this._state.getSettingValue(t))}get enabled(){let t=this.descriptor;return"info"===t.kind||!("enabledWhen"in t)||null==t.enabledWhen||iI(t.enabledWhen,t=>this._state.getSettingValue(t))}willUpdate(){let t=this.descriptor,o="key"in t?t.key:t.kind;o!==this._lastDescriptorKey&&(this._lastDescriptorKey=o,this._numberDraft=void 0),this.toggleAttribute("hidden",!this.visible),this.indent="info"!==t.kind&&!0===t.indent}render(){if(!this.visible)return em;let t=this.descriptor,o=this.enabled;return ed`<div class="control ${o?"":"control--disabled"}">${this.renderControl(t,o)}</div>`}renderControl(t,o){switch(t.kind){case"check":return this.renderCheck(t,o);case"select":return ed`${this.renderRowLabel(t.label,ed`<gl-select
						label=${t.label}
						.options=${t.options}
						.value=${String(this._state.getSettingValue(t.key)??"")}
						?disabled=${!o}
						@gl-change-value=${o=>this.actions?.applyOption(t.key,o.target.value)}
					></gl-select>`)}${this.renderHint(t.hint)}`;case"segmented":return ed`${this.renderRowLabel(t.label,ed`<gl-segmented-control
						label=${t.label}
						.options=${t.options}
						.value=${String(this._state.getSettingValue(t.key)??"")}
						?disabled=${!o}
						@gl-change-value=${o=>this.actions?.applyOption(t.key,o.target.value??"")}
					></gl-segmented-control>`)}${this.renderHint(t.hint)}`;case"text":return ed`<gl-format-input
						.descriptor=${t}
						.actions=${this.actions}
						?disabled=${!o}
					></gl-format-input>
					${this.renderHint(t.hint)}`;case"number":return ed`${this.renderRowLabel(t.label,ed`<input
						type="number"
						.value=${this._numberDraft??String(this._state.getSettingValue(t.key)??"")}
						placeholder=${t.placeholder??em}
						?disabled=${!o}
						aria-label=${t.label}
						@input=${t=>{this._numberDraft=t.target.value}}
						@blur=${o=>{this.actions?.applyNumber(t.key,o.target.value,t.defaultValue),this._numberDraft=void 0}}
						@keydown=${o=>{"Enter"===o.key?this.actions?.applyNumber(t.key,o.target.value,t.defaultValue):"Escape"===o.key&&void 0!==this._numberDraft&&(this._numberDraft=void 0)}}
					/>`)}${this.renderHint(t.hint)}`;case"slider":return ed`${this.renderRowLabel(t.label,ed`<gl-slider
						label=${t.label}
						.value=${Number(this._state.getSettingValue(t.key)??t.min)}
						min=${t.min}
						max=${t.max}
						step=${t.step}
						unit=${t.unit??""}
						?disabled=${!o}
						@gl-change-value=${o=>this.actions?.applyValue(t.key,o.target.value)}
					></gl-slider>`)}${this.renderHint(t.hint)}`;case"checkgroup":{let i=this._state.getSettingValue(t.key)??[];return ed`<span class="label" id="checkgroup-label-${t.key}">${t.label}</span>
					<div class="checkgroup" role="group" aria-labelledby="checkgroup-label-${t.key}">
						${t.options.map(r=>{let a=i.includes(r.value);return ed`<div class="checkgroup__option ${a?"checkgroup__option--on":""}">
								<gl-checkbox
									.checked=${a}
									?disabled=${!o}
									@gl-change-value=${o=>this.actions?.applyArrayMember(t.key,r.value,o.target.checked)}
									>${r.label}</gl-checkbox
								>
								${r.hint?ed`<p class="hint">${r.hint}</p>`:em}
							</div>`})}
					</div>
					${this.renderHint(t.hint)}`}case"autolinks":return ed`<gl-settings-autolinks .actions=${this.actions}></gl-settings-autolinks>`;case"integrations":return ed`<gl-settings-integrations .actions=${this.actions}></gl-settings-integrations>`;case"ai":return ed`<gl-settings-ai .actions=${this.actions}></gl-settings-ai>`;case"info":return ed`<div class="info" role="note">
					<code-icon icon="info" aria-hidden="true"></code-icon>
					<span>${i2(t.text)}</span>
				</div>`}}renderCheck(t,o){let i,r=!1;switch(t.type){case"custom":i=this._state.customSettings.get()[t.key]??!1;break;case"array":i=(this._state.getSettingValue(t.key)??[]).includes(t.value??"");break;case"object":i=!!this._state.getSettingValue(`${t.key}.${t.path??""}`);break;default:{let o=this._state.getSettingValue(t.key);void 0!==t.valueOff?(i=String(t.valueOff)!==String(o),r=null===o):i=!!o}}return ed`<gl-checkbox
				.checked=${i}
				.indeterminate=${r}
				?disabled=${!o}
				@gl-change-value=${o=>{this.actions?.applyCheck(t,o.target.checked)}}
				>${t.label}</gl-checkbox
			>${this.renderHint(t.hint)}`}renderRowLabel(t,o){return ed`<div class="row"><span class="row__label">${t}</span>${o}</div>`}renderHint(t){return t?ed`<p class="hint">
			<code-icon icon="info" aria-hidden="true"></code-icon><span>${i2(t)}</span>
		</p>`:em}};sV.styles=[iH,iG,w`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}

			:host([indent]) {
				margin-inline-start: 2.6rem;
			}

			:host([highlighted]) {
				outline: 2px solid transparent;
				background-color: color-mix(
					in srgb,
					var(--vscode-editor-findMatchHighlightBackground, #ea5c0055) 60%,
					transparent
				);
				border-radius: var(--gl-radius-sm);
			}

			.control {
				display: flex;
				flex-direction: column;
				gap: 0.7rem;
			}

			.control--disabled {
				opacity: 0.5;
			}

			.row {
				display: flex;
				flex-wrap: wrap;
				gap: 1.4rem;
				align-items: center;
			}

			.row__label {
				font-size: 1.25rem;
				color: var(--color-foreground);
			}

			.label {
				font-size: 1.25rem;
				font-weight: 600;
				color: var(--color-foreground);
			}

			.hint {
				display: flex;
				gap: 0.5rem;
				align-items: flex-start;
				font-size: 1.15rem;
				line-height: 1.4;
				color: var(--color-foreground--65);
			}

			.hint code-icon {
				flex: none;
				margin-block-start: 0.1rem;
			}

			gl-checkbox {
				font-size: 1.3rem;
			}

			input[type='number'] {
				width: 8rem;
				padding: 0.5rem 0.7rem;
				font-family: var(--vscode-font-family);
				font-size: 1.25rem;
				color: var(--vscode-input-foreground);
				background-color: var(--vscode-input-background);
				border: var(--gl-border-width) solid var(--vscode-input-border, transparent);
				border-radius: var(--gl-input-border-radius, 0.4rem);
			}

			input[type='number']:focus {
				${iW}
			}

			.checkgroup {
				display: flex;
				flex-wrap: wrap;
				gap: var(--gl-space-8);
			}

			.checkgroup__option {
				flex: 1 1 0;
				min-width: 13rem;
				padding: 0.9rem 1.1rem;
				border: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
				border-radius: var(--gl-radius-md);
			}

			.checkgroup__option--on {
				background-color: color-mix(in srgb, var(--vscode-button-background) 16%, transparent);
				border-color: color-mix(in srgb, var(--vscode-button-background) 70%, transparent);
			}

			.checkgroup__option .hint {
				margin-block-start: 0.5rem;
			}

			.info {
				display: flex;
				gap: var(--gl-space-8);
				padding: var(--gl-space-10) var(--gl-space-12);
				font-size: 1.2rem;
				line-height: 1.5;
				color: var(--color-foreground--85);
				background-color: color-mix(in srgb, var(--color-alert-infoBackground) 60%, transparent);
				border: var(--gl-border-width) solid color-mix(in srgb, var(--color-alert-infoBorder) 70%, transparent);
				border-radius: var(--gl-radius-md);
			}
		`],sq([p({context:"settingsState"})],sV.prototype,"_state",2),sq([e$({attribute:!1})],sV.prototype,"descriptor",2),sq([e$({attribute:!1})],sV.prototype,"actions",2),sq([e$({type:Boolean,reflect:!0})],sV.prototype,"highlighted",2),sq([e$({type:Boolean,reflect:!0})],sV.prototype,"indent",2),sq([eS()],sV.prototype,"_numberDraft",2),sV=sq([eC("gl-setting-control")],sV);var sW=Object.defineProperty,sj=Object.getOwnPropertyDescriptor,sU=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?sj(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&sW(o,i,n),n};let sN=[{n:1,text:"export namespace Gitlens {",container:!0},{n:2,text:"  export function supercharge(code: string) {",fn:!0},{n:3,text:"    return optimize(parse(code));",current:!0},{n:4,text:"  }"},{n:5,text:"}"}],sH=[{who:"Eric Amodio",ago:"9 years ago",heat:.95},{who:"Eric Amodio",ago:"9 years ago",heat:.95,same:!0},{who:"You",ago:"3 weeks ago",heat:.05,current:!0},{who:"Keith Daulton",ago:"2 years ago",heat:.55},{who:"You",ago:"3 weeks ago",heat:.05,same:!0}],sG=["var(--vscode-gitlens-graphLane1Color, var(--vscode-charts-green))","var(--vscode-gitlens-graphLane2Color, var(--vscode-charts-blue))","var(--vscode-gitlens-graphLane3Color, var(--vscode-charts-purple))","var(--vscode-gitlens-graphLane4Color, var(--vscode-charts-orange))"],sK=[{lane:0,message:"Supercharge the parser",ref:"main",refIcon:"git-branch",who:"you"},{lane:1,message:"Add lane color tokens",who:"other",from:0},{lane:0,message:"Merge branch graph-perf",who:"other",merge:!0},{lane:2,message:"Cache the DAG layout",ref:"v15.2",refIcon:"tag",who:"other"},{lane:0,message:"Fix minimap sparkline",who:"you"}],sY=[5,9,4,12,7,3,10,6,14,8,4,11,5,9,6];function sX(t){return t<.2?"var(--vscode-charts-green)":t<.5?"var(--vscode-charts-yellow)":t<.8?"var(--vscode-charts-orange)":"var(--vscode-charts-red)"}let sJ=class extends ts(lit_element_i){constructor(){super(...arguments),this.fetchBlameAnnotation=os(t=>{this.actions?.generateFormatPreview("currentLine.format","commit",t).then(t=>{this._blameAnnotation=t}).catch(()=>{})},200),this.fetchStatusBarText=os(t=>{this.actions?.generateFormatPreview("statusBar.format","commit",t).then(t=>{this._statusBarText=t}).catch(()=>{})},200)}willUpdate(){if(null!=this.actions){if("blame"===this.kind&&this.get("currentLine.enabled")){let t=this.get("currentLine.format")??"",o=`${t}
${this.get("currentLine.pullRequests.enabled")??!1}
${this.get("defaultDateFormat")??""}`;o!==this._lastBlameKey&&(this._lastBlameKey=o,this.fetchBlameAnnotation(t))}else if("statusbar"===this.kind&&this.get("statusBar.enabled")){let t=this.get("statusBar.format")??"",o=`${t}
${this.get("statusBar.pullRequests.enabled")??!1}
${this.get("defaultDateFormat")??""}`;o!==this._lastStatusBarKey&&(this._lastStatusBarKey=o,this.fetchStatusBarText(t))}}}render(){switch(this.kind){case"blame":return this.renderBlame();case"codelens":return this.renderCodeLens();case"statusbar":return this.renderStatusBar();case"fileblame":return this.renderFileBlame();case"filechanges":return this.renderFileChanges();case"heatmap":return this.renderHeatmap();case"graph":return this.renderGraph();case"hover":return this.renderHover();default:return em}}get(t){return this._state.getSettingValue(t)}renderEditorChrome(t,o){return ed`<div class="frame">
			<div class="tabs">
				<span class="tab"><code-icon icon="file" aria-hidden="true"></code-icon> supercharge.ts</span>
			</div>
			${t}
			${o?ed`<div class="off-overlay">
						<span><code-icon icon="eye-closed" aria-hidden="true"></code-icon>${o}</span>
					</div>`:em}
		</div>`}renderCodeLine(t,o){return ed`<div class="line ${t.current?"line--current":""}">
			<span class="line__number">${t.n}</span>
			<span>${this.renderSyntax(t.text)}</span>
			${o?ed`<span class="line__annotation">${o}</span>`:em}
		</div>`}renderSyntax(t){return t.split(/(\bexport\b|\bnamespace\b|\bfunction\b|\breturn\b|\bstring\b)/).map(t=>/^(export|namespace|function|return|string)$/.test(t)?ed`<span class="syntax-keyword">${t}</span>`:ed`<span>${t}</span>`)}renderBlame(){let t=this.get("currentLine.enabled")??!1;return this.renderEditorChrome(ed`<div class="code">
				${sN.map(o=>this.renderCodeLine(o,o.current&&t?this._blameAnnotation??"…":void 0))}
			</div>`,t?void 0:"Inline Blame is off")}renderCodeLens(){let t=this.get("codeLens.enabled")??!1,o=this.get("codeLens.recentChange.enabled")??!1,i=this.get("codeLens.authors.enabled")??!1,r=this.get("codeLens.scopes")??[],a=ed`${o?ed`<span>Eric Amodio, 3 minutes ago</span>`:em}
		${i?ed`<span>1 author (Eric Amodio)</span>`:em}`,n=t&&r.includes("document");return this.renderEditorChrome(ed`<div class="code">
				${n?ed`<div class="codelens">${a}</div>`:em}
				${sN.map(o=>{let i=t&&o.container&&r.includes("containers"),c=t&&o.fn&&r.includes("blocks");return ed`${i?ed`<div class="codelens ${n?"codelens--spaced":""}">${a}</div>`:em}${c?ed`<div class="codelens codelens--block">${a}</div>`:em}${this.renderCodeLine(o)}`})}
			</div>`,t?void 0:"Git CodeLens is off")}renderStatusBar(){let t=this.get("statusBar.enabled")??!1,o=(this.get("statusBar.alignment")??"right")==="right",i=t?ed`<span class="statusbar__item"
					><code-icon icon="gl-gitlens" aria-hidden="true"></code-icon>${this._statusBarText??"…"}</span
				>`:em;return ed`<div class="frame">
			<div class="editor-placeholder">editor</div>
			<div class="statusbar">
				<span class="statusbar__item"><code-icon icon="git-branch" aria-hidden="true"></code-icon> main</span>
				${o?em:i}
				<span class="statusbar__spacer"></span>
				${o?i:em}
				<span class="statusbar__item">Ln 3, Col 12</span>
				<span class="statusbar__item">UTF-8</span>
			</div>
		</div>`}renderFileBlame(){let t=this.get("blame.avatars")??!0,o=this.get("blame.compact")??!0,i=this.get("blame.heatmap.enabled")??!0,r=(this.get("blame.heatmap.location")??"right")==="left",a=this.get("blame.highlight.enabled")??!0;return this.renderEditorChrome(ed`<div class="code">
				${sH.map((n,c)=>{let h=!(o&&n.same);return ed`<div class="line ${n.current&&a?"line--current":""}">
						<span class="blame-gutter">
							${i&&r?ed`<span
										class="blame-gutter__heat"
										style=${aZ({background:sX(n.heat)})}
									></span>`:em}
							${t&&h?ed`<span class="avatar ${"You"===n.who?"":"avatar--other"}"></span>`:em}
							${h?ed`<span class="blame-gutter__text">${n.who}, ${n.ago}</span>`:em}
						</span>
						${i&&!r?ed`<span
									class="heat-bar"
									style=${aZ({background:sX(n.heat)})}
								></span>`:em}
						<span class="line__number">${c+1}</span>
						<span>${this.renderSyntax(sN[Math.min(c,sN.length-1)].text)}</span>
					</div>`})}
			</div>`)}renderFileChanges(){let t=this.get("changes.locations")??[],o=t.includes("gutter"),i=t.includes("line"),r=t.includes("overview");return this.renderEditorChrome(ed`<div class="code code--relative">
				${sH.map((t,r)=>ed`<div
							class="line"
							style=${aZ({background:t.current&&i?"color-mix(in srgb, var(--vscode-charts-green) 12%, transparent)":null})}
						>
							${o&&t.current?ed`<span
										class="heat-bar"
										style=${aZ({background:"var(--gl-stat-modified, var(--vscode-charts-yellow))"})}
									></span>`:ed`<span
										class="heat-bar"
										style=${aZ({background:"transparent"})}
									></span>`}
							<span class="line__number">${r+1}</span>
							<span>${this.renderSyntax(sN[Math.min(r,sN.length-1)].text)}</span>
						</div>`)}
				${r?ed`<div class="overview-ruler">
							<span
								class="overview-ruler__mark"
								style=${aZ({background:"var(--gl-stat-modified, var(--vscode-charts-yellow))",marginTop:"3.4rem"})}
							></span>
						</div>`:em}
			</div>`)}renderHeatmap(){let t=this.get("heatmap.locations")??[],o=t.includes("gutter"),i=t.includes("overview"),r=this.get("heatmap.fadeLines")??!1;return this.renderEditorChrome(ed`<div class="code code--relative">
				${sH.map((t,i)=>ed`<div
							class="line"
							style=${aZ({opacity:r?String(1-.6*t.heat):null})}
						>
							${o?ed`<span
										class="heat-bar"
										style=${aZ({background:sX(t.heat)})}
									></span>`:em}
							<span class="line__number">${i+1}</span>
							<span>${this.renderSyntax(sN[Math.min(i,sN.length-1)].text)}</span>
						</div>`)}
				${i?ed`<div class="overview-ruler">
							${sH.map(t=>ed`<span
										class="overview-ruler__mark"
										style=${aZ({background:sX(t.heat)})}
									></span>`)}
						</div>`:em}
			</div>`)}renderGraph(){let t=this.get("graph.minimap.enabled")??!0,o=this.get("graph.avatars")??!0,i=this.get("graph.dimMergeCommits")??!1;return ed`<div class="frame">
			<div class="graph-header">
				<code-icon icon="gl-graph" aria-hidden="true"></code-icon>
				<span class="statusbar__item"><code-icon icon="git-branch" aria-hidden="true"></code-icon> main</span>
				<span class="statusbar__spacer"></span>
				<code-icon icon="search" aria-hidden="true"></code-icon>
				<code-icon icon="filter" aria-hidden="true"></code-icon>
			</div>
			${t?ed`<div class="graph-minimap" aria-hidden="true">
						${sY.map((t,o)=>ed`<span
									class="graph-minimap__bar"
									style=${aZ({height:`${t}px`,background:sG[o%sG.length]})}
								></span>`)}
					</div>`:em}
			<div class="graph-rows">
				<svg width="64" height=${26*sK.length} class="graph-svg" aria-hidden="true">
					${sK.map((t,o)=>{let i=12+14*t.lane,r=26*o+13,a=sK[o+1];return eh`
							${null!=a?eh`<line x1=${i} y1=${r} x2=${12+14*a.lane} y2=${r+26} stroke=${sG[t.lane]} stroke-width="2"></line>`:em}
							${null!=t.from?eh`<path d="M${12+14*t.from} ${r-26} Q ${i} ${r-26} ${i} ${r}" fill="none" stroke=${sG[t.lane]} stroke-width="2"></path>`:em}
							<circle cx=${i} cy=${r} r=${t.merge?4:5} fill=${t.merge?"var(--vscode-editor-background)":sG[t.lane]} stroke=${sG[t.lane]} stroke-width="2"></circle>`})}
				</svg>
				${sK.map((t,r)=>ed`<div
							class="graph-row ${i&&t.merge?"graph-row--dimmed":""}"
							style=${aZ({top:`${26*r}px`})}
						>
							${t.ref?ed`<span
										class="graph-row__ref"
										style=${aZ({border:`var(--gl-border-width) solid color-mix(in srgb, ${sG[t.lane]} 60%, transparent)`,background:`color-mix(in srgb, ${sG[t.lane]} 16%, transparent)`,color:sG[t.lane]})}
										><code-icon icon=${t.refIcon} size="10" aria-hidden="true"></code-icon
										>${t.ref}</span
									>`:em}
							${o?ed`<span class="avatar ${"you"===t.who?"":"avatar--other"}"></span>`:em}
							<span class="graph-row__message">${t.message}</span>
						</div>`)}
			</div>
		</div>`}renderHover(){let t=this.get("hovers.avatars")??!0,o=this.get("hovers.avatarSize")??32,i=this.get("hovers.autolinks.enabled")??!0,r=this.get("hovers.currentLine.changes")??!0;return this.get("hovers.enabled")??!0?ed`<div class="hover-card">
			<div class="hover-card__header">
				${t?ed`<span
							class="hover-card__avatar"
							style=${aZ({width:`${o}px`,height:`${o}px`})}
						></span>`:em}
				<span>
					<strong>Eric Amodio</strong>, 9 years ago via <span class="preview-link">PR #1</span>
					<span class="muted">(May 6, 2016)</span><br />
					<strong>Supercharged ${i?ed`<span class="preview-link">#1138</span>`:em}</strong>
				</span>
			</div>
			<div class="hover-card__actions" aria-hidden="true">
				<span><code-icon icon="git-commit" size="12"></code-icon> 5e7c190</span>
				<span><code-icon icon="git-pull-request" size="12"></code-icon> PR #1</span>
				<code-icon icon="git-compare" size="13"></code-icon>
				<code-icon icon="history" size="13"></code-icon>
				<code-icon icon="globe" size="13"></code-icon>
			</div>
			${r?ed`<div class="hover-card__diff">
						<div class="diff-removed">- return code;</div>
						<div class="diff-added">+ return optimize(parse(code));</div>
					</div>`:em}
		</div>`:ed`<div class="frame frame--placeholder">
				<div class="off-overlay">
					<span><code-icon icon="eye-closed" aria-hidden="true"></code-icon>Hovers are off</span>
				</div>
			</div>`}};sJ.styles=[iH,w`
			:host {
				display: block;
				font-size: 1.2rem;
				pointer-events: none;

				/* The preview is a pure illustration — none of its mock affordances
		   (autolinks, action icons, etc.) are real. Neutralize all pointer
		   interaction so nothing reads as clickable. */
				cursor: default;
			}

			/* Mimics an autolink/PR link visually without being a focusable,
	   clickable anchor (the preview is non-interactive). */
			.preview-link {
				color: var(--vscode-textLink-foreground);
			}

			.frame {
				position: relative;
				overflow: hidden;
				background-color: var(--vscode-editor-background);
				border: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
				border-radius: var(--gl-radius-md);
			}

			.tab {
				display: inline-flex;
				gap: 0.7rem;
				align-items: center;
				padding: var(--gl-space-6) var(--gl-space-12);
				font-size: 1.15rem;
				color: var(--color-foreground--85);
				background-color: var(--vscode-editor-background);
				border-top: var(--gl-border-width) solid var(--vscode-button-background);
			}

			.tabs {
				background-color: var(--vscode-sideBar-background);
				border-bottom: var(--gl-border-width) solid var(--vscode-widget-border, transparent);
			}

			.code {
				padding: 0.5rem 0 0.7rem;
				font-family: var(--vscode-editor-font-family);
				font-size: 1.2rem;
				line-height: 2.1rem;
			}

			.code--relative {
				position: relative;
			}

			.frame--placeholder {
				position: relative;
				height: 12rem;
			}

			.graph-svg {
				position: absolute;
				top: 0;
				left: 4px;
			}

			.muted {
				color: var(--color-foreground--50);
			}

			.line {
				display: flex;
				align-items: center;
				height: 2.1rem;
				white-space: pre;
			}

			.line--current {
				background-color: var(
					--vscode-editor-lineHighlightBackground,
					color-mix(in srgb, var(--color-foreground) 5%, transparent)
				);
			}

			.line__number {
				flex: none;
				width: 3.2rem;
				padding-right: var(--gl-space-12);
				color: var(--vscode-editorLineNumber-foreground, var(--color-foreground--50));
				text-align: right;
				user-select: none;
			}

			.line__annotation {
				margin-left: 1.8rem;
				overflow: hidden;
				text-overflow: ellipsis;
				font-family: var(--vscode-font-family);
				font-size: 1.1rem;
				font-style: italic;
				color: var(--vscode-gitlens-trailingLineForegroundColor, var(--color-foreground--50));
				white-space: nowrap;
			}

			.codelens {
				display: flex;
				gap: var(--gl-space-12);
				align-items: center;
				height: 2rem;
				padding-left: 4.4rem;
				font-size: 1.05rem;
				color: var(--color-foreground--65);
			}

			.codelens--block {
				padding-left: 6.2rem;
			}

			/* When the file-scope lens is also shown, separate it from the
	   container-scope lens (both sit at column 0) so they read distinctly. */
			.codelens--spaced {
				margin-top: var(--gl-space-8);
			}

			.syntax-keyword {
				color: var(--vscode-charts-blue);
			}

			.syntax-fn {
				color: var(--vscode-charts-yellow);
			}

			.blame-gutter {
				display: flex;
				flex: none;
				gap: var(--gl-space-6);
				align-items: center;
				width: 17rem;
				height: 100%;
				padding-left: var(--gl-space-8);
				overflow: hidden;
				border-right: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
			}

			.blame-gutter__heat {
				flex: none;
				width: 0.3rem;
				height: 1.6rem;
				border-radius: var(--gl-radius-xs);
			}

			.avatar {
				flex: none;
				width: 1.5rem;
				height: 1.5rem;
				background: var(--vscode-button-background);

				/* HC themes set button-background to the editor background, so a
		   borderless fill vanishes — the contrast border keeps it visible. */
				border: var(--gl-border-width) solid var(--vscode-contrastBorder, transparent);
				border-radius: 50%;
			}

			.avatar--other {
				background: var(--vscode-charts-blue);
			}

			.blame-gutter__text {
				overflow: hidden;
				text-overflow: ellipsis;
				font-family: var(--vscode-font-family);
				font-size: 1.05rem;
				color: var(--color-foreground--65);
				white-space: nowrap;
			}

			.heat-bar {
				flex: none;
				width: 0.4rem;
				height: 1.7rem;
				margin-left: var(--gl-space-6);
				border-radius: var(--gl-radius-xs);
			}

			.overview-ruler {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				display: flex;
				flex-direction: column;
				gap: 0.3rem;
				align-items: center;
				width: 1.2rem;
				padding-top: var(--gl-space-8);
				background-color: var(--vscode-editor-background);
				border-left: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
			}

			.overview-ruler__mark {
				width: 0.6rem;
				height: 0.6rem;
				border-radius: 0.1rem;
			}

			.statusbar {
				display: flex;
				gap: 1.4rem;
				align-items: center;
				height: 2.4rem;
				padding: 0 var(--gl-space-10);
				font-size: 1.1rem;
				color: var(--vscode-statusBar-foreground, var(--vscode-button-foreground));
				background-color: var(--vscode-statusBar-background, var(--vscode-button-background));
			}

			.statusbar__item {
				display: inline-flex;
				gap: 0.5rem;
				align-items: center;
				white-space: nowrap;
			}

			.statusbar__spacer {
				flex: 1;
			}

			.editor-placeholder {
				display: grid;
				place-items: center;
				height: 9rem;
				font-size: 1.1rem;
				color: var(--color-foreground--50);
			}

			.hover-card {
				max-width: 40rem;
				margin: var(--gl-space-10) auto;
				overflow: hidden;
				background-color: var(--vscode-editorHoverWidget-background, var(--vscode-editor-background));
				border: var(--gl-border-width) solid var(--vscode-editorHoverWidget-border, var(--color-foreground--25));
				border-radius: var(--gl-radius-md);
				box-shadow: 0 0.8rem 2.4rem var(--vscode-widget-shadow);
			}

			.hover-card__header {
				display: flex;
				gap: 0.9rem;
				align-items: flex-start;
				padding: 1.1rem 1.3rem 0.8rem;
				font-size: 1.2rem;
				line-height: 1.5;
			}

			.hover-card__avatar {
				flex: none;
				background: var(--vscode-button-background);
				border: var(--gl-border-width) solid var(--vscode-contrastBorder, transparent);
				border-radius: 50%;
			}

			.hover-card__actions {
				display: flex;
				gap: 1.4rem;
				padding: 0.7rem 1.3rem;
				font-family: var(--vscode-editor-font-family);
				font-size: 1.1rem;
				color: var(--color-link-foreground);
				border-top: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
			}

			.hover-card__diff {
				padding: 0.8rem 1.3rem;
				font-family: var(--vscode-editor-font-family);
				font-size: 1.1rem;
				border-top: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
			}

			.diff-removed {
				color: var(--gl-stat-removed, var(--vscode-charts-red));
			}

			.diff-added {
				color: var(--gl-stat-added, var(--vscode-charts-green));
			}

			.graph-header {
				display: flex;
				gap: var(--gl-space-8);
				align-items: center;
				padding: 0.7rem 1.1rem;
				font-size: 1.1rem;
				color: var(--color-foreground--75);
				border-bottom: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
			}

			.graph-minimap {
				display: flex;
				gap: var(--gl-space-2);
				align-items: flex-end;
				height: 2.2rem;
				padding: 0 0.8rem 0.3rem;
				border-bottom: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
			}

			.graph-minimap__bar {
				flex: 1;
				border-radius: 0.1rem;
				opacity: 0.8;
			}

			.graph-rows {
				position: relative;
				height: 13rem;
				overflow: hidden;
			}

			.graph-row {
				position: absolute;
				right: 0.8rem;
				left: 7rem;
				display: flex;
				gap: 0.7rem;
				align-items: center;
				height: 2.6rem;
			}

			.graph-row--dimmed {
				opacity: 0.45;
			}

			.graph-row__ref {
				display: inline-flex;
				flex: none;
				gap: 0.3rem;
				align-items: center;
				padding: 0.1rem 0.6rem;
				font-size: 1rem;
				border-radius: var(--gl-radius-sm);
			}

			.graph-row__message {
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 1.15rem;
				color: var(--color-foreground--85);
				white-space: nowrap;
			}

			.off-overlay {
				position: absolute;
				inset: 0;
				display: grid;
				place-items: center;
				font-size: 1.15rem;
				color: var(--color-foreground--50);
				background-color: color-mix(in srgb, var(--vscode-editor-background) 78%, transparent);
			}

			.off-overlay span {
				display: inline-flex;
				gap: var(--gl-space-6);
				align-items: center;
			}
		`],sU([p({context:"settingsState"})],sJ.prototype,"_state",2),sU([e$({type:String})],sJ.prototype,"kind",2),sU([e$({attribute:!1})],sJ.prototype,"actions",2),sU([eS()],sJ.prototype,"_blameAnnotation",2),sU([eS()],sJ.prototype,"_statusBarText",2),sJ=sU([eC("gl-settings-preview")],sJ);var sZ=Object.defineProperty,sQ=Object.getOwnPropertyDescriptor,s0=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?sQ(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&sZ(o,i,n),n};let s1=class extends lit_element_i{constructor(){super(...arguments),this.icon=""}render(){return ed`<code-icon icon=${this.icon}></code-icon>`}};s1.styles=[w`
			:host {
				--gl-icon-cube-color: var(--color-foreground);
				--gl-icon-cube-background: color-mix(in srgb, var(--gl-icon-cube-color) 10%, transparent);
				--gl-icon-cube-size: 1.6rem;

				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: calc(var(--gl-icon-cube-size) * 1.6);
				aspect-ratio: 1;
				background: var(--gl-icon-cube-background);
				border-radius: 0.6rem;
			}

			:host([appearance='brand']) {
				--gl-icon-cube-color: #fff;
				--gl-icon-cube-background: var(--gl-gradient-brand);
			}

			code-icon {
				font-size: var(--gl-icon-cube-size);
				color: var(--gl-icon-cube-color);
			}
		`],s0([e$({type:String,reflect:!0})],s1.prototype,"appearance",2),s0([e$()],s1.prototype,"icon",2),s1=s0([eC("gl-icon-cube")],s1);let s2=w`
	:host {
		display: inline-flex;
		vertical-align: middle;
	}

	/* The label-prop fallback content — names the switch without rendering a visible label */
	.sr-only {
		${iq}
	}

	wa-switch {
		/* Sizing knobs exposed by wa-switch */
		--width: 3.2rem;
		--height: 1.8rem;
		--thumb-size: 1.4rem;

		font-family: var(--vscode-font-family);
		font-size: inherit;
		color: var(--color-foreground);
	}

	:host([size='large']) wa-switch {
		--width: 4rem;
		--height: 2.2rem;
		--thumb-size: 1.8rem;
	}

	/* Track. The thumb position (left/right) is the non-color on/off cue; a contrast-safe
	   border keeps the track visible in high-contrast themes where the fill may vanish. */
	wa-switch::part(control) {
		background-color: color-mix(in srgb, var(--color-foreground) 25%, transparent);
		border: var(--gl-border-width) solid var(--vscode-contrastBorder, transparent);
	}

	/* wa-switch exposes checked as a CSS custom state (customStates.set('checked', …)),
	   not a reflected attribute — [checked] would never match */
	wa-switch:state(checked)::part(control) {
		background-color: var(--vscode-button-background);
		border-color: var(--vscode-contrastBorder, var(--vscode-button-background));
	}

	wa-switch::part(thumb) {
		background-color: var(--vscode-button-foreground, #fff);
		border: none;
		box-shadow: 0 1px 2px var(--vscode-widget-shadow);
	}

	wa-switch::part(label) {
		color: var(--color-foreground);
	}

	wa-switch:focus-within::part(control) {
		outline: var(--gl-border-width) solid var(--color-focus-border);
		outline-offset: 2px;
	}

	wa-switch[disabled] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	@media (prefers-reduced-motion: reduce) {
		wa-switch::part(control),
		wa-switch::part(thumb) {
			transition: none;
		}
	}
`;var s4=w`
  :host {
    --height: var(--wa-form-control-toggle-size);
    --width: calc(var(--height) * 1.75);
    --thumb-size: 0.75em;

    display: inline-flex;
    line-height: var(--wa-form-control-value-line-height);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    color: var(--wa-form-control-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--height);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    transition-property: translate, background, border-color, box-shadow;
    transition-duration: var(--wa-transition-normal);
    transition-timing-function: var(--wa-transition-easing);
  }

  :host([did-ssr]:not(:defined)) .switch {
    transition-property: unset;
    transition-duration: unset;
    transition-timing-function: unset;
  }

  .switch .thumb {
    aspect-ratio: 1 / 1;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--wa-form-control-border-color);
    border-radius: 50%;
    translate: calc((var(--width) - var(--height)) / -2);
    transition: inherit;
  }
  .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / 2);
  }

  .input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  label:not(.disabled) .input:focus-visible ~ .switch .thumb {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked */
  .checked .switch {
    background-color: var(--wa-form-control-activated-color);
    border-color: var(--wa-form-control-activated-color);
  }

  .checked .switch .thumb {
    background-color: var(--wa-color-surface-default);
    translate: calc((var(--width) - var(--height)) / 2);
  }
  .checked .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / -2);
  }

  /* Disabled */
  label:has(> :disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part~='label'] {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  @media (forced-colors: active) {
    :checked:enabled + .switch:hover .thumb,
    :checked + .switch .thumb {
      background-color: ButtonText;
    }
  }
`;let s3=tl(class extends directive_i{constructor(t){if(super(t),3!==t.type&&1!==t.type&&4!==t.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==t.strings)throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[o]){if(o===ep||o===em)return o;let i=t.element,r=t.name;if(3===t.type){if(o===i[r])return ep}else if(4===t.type){if(!!o===i.hasAttribute(r))return ep}else if(1===t.type&&i.getAttribute(r)===o+"")return ep;return((t,o=td)=>t._$AH=o)(t),o}});var s5=class extends nW{constructor(){super(...arguments),this.hasSlotController=new nH(this,"hint"),this.localize=new rm(this),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="m",this.disabled=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,n3()]}get value(){return this._value??"on"}set value(t){this._value=t}handleSizeChange(){nN(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(t){this._checked=!!t,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(t){let o="rtl"===this.localize.dir();"ArrowLeft"===t.key&&(t.preventDefault(),this.checked=o,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),"ArrowRight"===t.key&&(t.preventDefault(),this.checked=!o,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("checked")||t.has("defaultChecked"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.handleValueOrCheckedChange()}):(this.setValue(this.checked?this.value:null,this._value),this.updateValidity())}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}setValue(t,o){this.checked?this.internals.setFormValue(t??"on",o):this.internals.setFormValue(null,null)}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){let t=this.hasSlotController.test("hint","withHint"),o=!!this.hint||!!t,i=this.didSSR&&!this.hasUpdated?this.checked:this.defaultChecked,r=this.didSSR&&!this.hasUpdated?null:s3(this.checked);return ed`
      <label
        part="base"
        class=${ag({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${this.name??em}
          value=${this.value??em}
          .checked=${r??em}
          ?checked=${i}
          ?disabled=${this.disabled}
          ?required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${ag({"has-slotted":o})}
        aria-hidden=${o?"false":"true"}
        >${this.hint}</slot
      >
    `}};s5.shadowRootOptions={...nW.shadowRootOptions,delegatesFocus:!0},s5.css=[nq,nG,s4],re([eA('input[type="checkbox"]')],s5.prototype,"input",2),re([e$()],s5.prototype,"title",2),re([e$({reflect:!0})],s5.prototype,"name",2),re([e$({reflect:!0})],s5.prototype,"value",1),re([e$({reflect:!0})],s5.prototype,"size",2),re([nX("size")],s5.prototype,"handleSizeChange",1),re([e$({type:Boolean})],s5.prototype,"disabled",2),re([e$({type:Boolean,attribute:!1})],s5.prototype,"checked",1),re([e$({type:Boolean,attribute:"checked",reflect:!0})],s5.prototype,"defaultChecked",2),re([e$({type:Boolean,reflect:!0})],s5.prototype,"required",2),re([e$({attribute:"hint"})],s5.prototype,"hint",2),re([e$({attribute:"with-hint",type:Boolean})],s5.prototype,"withHint",2),re([nX(["checked","defaultChecked"])],s5.prototype,"handleStateChange",1),re([nX("disabled",{waitUntilFirstUpdate:!0})],s5.prototype,"handleDisabledChange",1),s5=re([eC("wa-switch")],s5),s5.disableWarning?.("change-in-update");var s6=Object.defineProperty,s8=Object.getOwnPropertyDescriptor,s7=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?s8(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&s6(o,i,n),n};let s9=class extends lit_element_i{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.size="medium"}handleChange(t){t.stopPropagation(),this.checked=t.target.checked,this.dispatchEvent(new CustomEvent("gl-change-value",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}render(){return ed`<wa-switch
			exportparts="base, control, thumb, label"
			.checked=${this.checked}
			?disabled=${this.disabled}
			hint=${this.hint??em}
			@change=${this.handleChange}
			><slot>${this.label?ed`<span class="sr-only">${this.label}</span>`:em}</slot></wa-switch
		>`}focus(t){this.switchElement?.focus(t)}blur(){this.switchElement?.blur()}};s9.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},s9.styles=s2,s7([eA("wa-switch")],s9.prototype,"switchElement",2),s7([e$({type:Boolean,reflect:!0})],s9.prototype,"checked",2),s7([e$({type:Boolean,reflect:!0})],s9.prototype,"disabled",2),s7([e$({type:String})],s9.prototype,"label",2),s7([e$({type:String})],s9.prototype,"hint",2),s7([e$({type:String,reflect:!0})],s9.prototype,"size",2),s9=s7([eC("gl-switch")],s9);var le=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,lo=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?lt(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&le(o,i,n),n};let li=class extends ts(lit_element_i){get category(){return this._state.selectedCategory.get()}willUpdate(){this._pendingCategoryId=this.category.id;let t=this._state.highlightedKeys.get(),o=this._state.anchorKey.get()?.nonce??0;this._pendingHighlight=t.length?`${o}|${t.join()}`:void 0}updated(){let t=this._renderedCategoryId!==this._pendingCategoryId,o=this._renderedHighlight!==this._pendingHighlight;if(this._renderedCategoryId=this._pendingCategoryId,this._renderedHighlight=this._pendingHighlight,null!=this._pendingHighlight){if(t||o){let o=[...this.renderRoot.querySelectorAll("gl-setting-control")].find(t=>t.highlighted);null!=o?requestAnimationFrame(()=>o.scrollIntoView({block:"center"})):t&&(this.scrollTop=0)}}else t&&(this.scrollTop=0)}get masterOn(){let t=this.category.master;return null==t||("custom"===t.type?this._state.customSettings.get()[t.key]??!1:!!this._state.getSettingValue(t.key))}get masterDisabledByOrg(){return this.category.controls.some(t=>"ai"===t.kind)&&this._state.aiState.get()?.orgEnabled===!1}isHighlighted(t,o){return"key"in t&&!!o.has(t.key)&&(this.isNaturallyVisible(t)?this.category.controls.find(o=>"key"in o&&o.key===t.key&&this.isNaturallyVisible(o))===t:!this.category.controls.some(o=>o!==t&&"key"in o&&o.key===t.key&&this.isNaturallyVisible(o)))}isNaturallyVisible(t){return null==t.visibleWhen||iI(t.visibleWhen,t=>this._state.getSettingValue(t))}render(){let t=this._state.query.get().trim();if(t&&0===this._state.searchResults.get().length){let o=t.includes(" ")||t.toLowerCase().startsWith("gitlens.")?t:`gitlens.${t}`;return ed`<section class="no-results" aria-labelledby="no-results-title">
				<h2 class="no-results__title" id="no-results-title">
					<code-icon icon="search" aria-hidden="true"></code-icon>
					No settings match “${t}”
				</h2>
				<p>Check your spelling, or try a setting name like <code>gitlens.currentLine.format</code>.</p>
				<p>
					You can also
					<a href="command:workbench.action.openSettings?${encodeURIComponent(JSON.stringify(o))}"
						>open the Settings UI</a
					>
					to search every GitLens setting.
				</p>
			</section>`}let o=this.category,i=this.masterOn,r=this.masterDisabledByOrg,a=new Set(this._state.highlightedKeys.get());return ed`
			<section aria-labelledby="category-title">
				<div class="header">
					<div class="header__row">
						<gl-icon-cube class="header__icon" icon=${o.icon} aria-hidden="true"></gl-icon-cube>
						<div class="header__text">
							<h2 class="header__title" id="category-title">
								${o.name}
								${o.pro?ed`<gl-feature-badge
											.source=${{source:"settings",detail:"header"}}
											.subscription=${this._state.subscription.get()}
										></gl-feature-badge>`:em}
							</h2>
							<p class="header__hint">${i2(o.hint)}</p>
						</div>
						${null!=o.master?ed`<gl-switch
									size="large"
									.checked=${i&&!r}
									?disabled=${r}
									label="Enable ${o.name}"
									hint=${(r?"AI features have been disabled by your GitKraken admin.":void 0)??em}
									@gl-change-value=${t=>{this.actions?.applyCheck(o.master,t.target.checked)}}
								></gl-switch>`:em}
					</div>
					${null!=o.command?ed`<p class="header__tip">
								<code-icon icon="bell" aria-hidden="true"></code-icon>
								<span
									>Tip — run
									<a href=${i0(o.command.command)}>${o.command.label}</a>
									to override this for the current window.</span
								>
							</p>`:em}
				</div>

				${null!=o.preview?ed`<div class="preview" role="region" aria-label="Live preview">
							<h3 class="preview__label">Live preview</h3>
							<gl-settings-preview
								kind=${o.preview}
								.actions=${this.actions}
							></gl-settings-preview>
						</div>`:em}

				<div class="controls">
					${o.controls.map(t=>ed`<gl-setting-control
								.descriptor=${t}
								.actions=${this.actions}
								.highlighted=${this.isHighlighted(t,a)}
							></gl-setting-control>`)}
				</div>

				<p class="footer">
					<code-icon icon="gear" aria-hidden="true"></code-icon>
					<span
						>For more options, open the
						<a
							href="command:workbench.action.openSettings?${encodeURIComponent(JSON.stringify(this.settingsSearch.split(" or ")[0]))}"
							>Settings UI</a
						>
						and search for <code>${this.settingsSearch}</code></span
					>
					${null!=o.learnMoreUrl?ed`<a href=${o.learnMoreUrl} aria-label="Learn more about ${o.name}"
								>Learn more</a
							>`:em}
				</p>
			</section>
		`}get settingsSearch(){let t=this.category;if(null!=t.settingsSearch)return t.settingsSearch;let o=t.controls.find(t=>"info"!==t.kind&&"autolinks"!==t.kind),i=t.master?.key??(null!=o&&"key"in o?o.key:t.id);return`gitlens.${i.split(".")[0]}`}};li.styles=[iH,iG,iK,w`
			:host {
				display: block;
				overflow-y: auto;
			}

			.header {
				padding: 2rem 2.6rem 1.6rem;
				border-bottom: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
			}

			.header__row {
				display: flex;
				gap: var(--gl-space-12);
				align-items: center;
			}

			.header__icon {
				--gl-icon-cube-size: 2rem;

				flex: none;
			}

			.header__text {
				flex: 1;
				min-width: 0;
			}

			.header__title {
				display: flex;
				gap: var(--gl-space-8);
				align-items: center;
				margin: 0;
				font-size: 1.6rem;
				font-weight: 600;
				color: var(--color-foreground);
			}

			.header__hint {
				margin: var(--gl-space-2) 0 0;
				font-size: 1.2rem;
				color: var(--color-foreground--65);
			}

			.header__tip {
				display: flex;
				gap: 0.7rem;
				align-items: center;
				margin: var(--gl-space-12) 0 0;
				font-size: 1.15rem;
				color: var(--color-foreground--65);
			}

			.header__tip code-icon {
				color: var(--gl-chip-scoped-color, var(--vscode-charts-yellow));
			}

			.preview {
				padding: 1.6rem 2.6rem;
				background-color: color-mix(in srgb, var(--vscode-sideBar-background) 60%, transparent);
				border-bottom: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
			}

			.preview__label {
				margin: 0 0 var(--gl-space-8);
				font-size: 1.05rem;
				font-weight: 400;
				color: var(--color-foreground--50);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}

			.controls {
				display: flex;
				flex-direction: column;
				gap: 1.8rem;
				max-width: 64rem;
				padding: 2rem 2.6rem 2.4rem;
			}

			.no-results {
				display: flex;
				flex-direction: column;
				gap: var(--gl-space-6);
				align-items: flex-start;
				max-width: 64rem;
				padding: 3.2rem 2.6rem;
				color: var(--color-foreground--65);
			}

			.no-results__title {
				display: flex;
				gap: 0.7rem;
				align-items: center;
				margin: 0;
				font-size: 1.4rem;
				font-weight: 600;
				color: var(--color-foreground);
			}

			.no-results p {
				margin: 0;
				font-size: 1.2rem;
			}

			.footer {
				display: flex;
				gap: 0.7rem;
				align-items: center;
				padding-top: var(--gl-space-16);
				margin: 0 2.6rem 2.4rem;
				font-size: 1.15rem;
				color: var(--color-foreground--65);
				border-top: var(--gl-border-width) solid var(--vscode-widget-border, var(--color-foreground--25));
			}

			.footer code {
				font-family: var(--vscode-editor-font-family);
				font-size: 1.05rem;
				color: var(--gl-chip-filtered-text-color, var(--color-link-foreground));
			}
		`],lo([p({context:"settingsState"})],li.prototype,"_state",2),lo([e$({attribute:!1})],li.prototype,"actions",2),li=lo([eC("gl-settings-detail")],li);var lr=Object.defineProperty,la=Object.getOwnPropertyDescriptor,ln=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?la(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&lr(o,i,n),n};let ls=class extends ts(lit_element_i){get searchMatches(){return this._state.searchResults.get()}isCheckOn(t){let o=this._state.getSettingValue(t.key);if(void 0!==t.valueOff){let i=String(o);return null!==o&&String(t.valueOff)!==i}return!!o}enabledCount(t){let o=0,i=0,r=new Set;for(let a of null!=t.master?[t.master,...t.controls]:t.controls)!("check"!==a.kind||"array"===a.type||"object"===a.type||r.has(a.key))&&(r.add(a.key),i++,this.isCheckOn(a)&&o++);return 0===i?void 0:{on:o,total:i}}isOn(t,o){return null!=t.master?this.isCheckOn(t.master):null!=o?o.on>0:void 0}categoryStatus(t){if(t.controls.some(t=>"integrations"===t.kind)){let t=this._state.cloudIntegrations.get();if(null==t)return{on:void 0};let o=t.filter(t=>t.connected).length;return{on:o>0,count:{label:`${o}/${t.length}`,aria:`${o} of ${t.length} connected`}}}if(t.controls.some(t=>"ai"===t.kind)&&this._state.aiState.get()?.orgEnabled===!1)return{on:!1};if(t.controls.some(t=>"autolinks"===t.kind)){let t=this._state.getSettingValue("autolinks")?.length??0;return{on:t>0,count:t>0?{label:`${t}`,aria:`${t} autolink${1===t?"":"s"}`}:void 0}}let o=this.enabledCount(t);return{on:this.isOn(t,o),count:null!=o?{label:`${o.on}/${o.total}`,aria:`${o.on} of ${o.total} on`}:void 0}}handleKeyDown(t){let o,i=[...this.renderRoot.querySelectorAll("button.item")];if(!i.length)return;let r=i.findIndex(t=>t.matches(":focus"));switch(t.key){case"ArrowDown":o=r<0?0:(r+1)%i.length;break;case"ArrowUp":o=r<0?i.length-1:(r-1+i.length)%i.length;break;case"Home":o=0;break;case"End":o=i.length-1;break;default:return}t.preventDefault();let a=i[o];a.focus(),this.onSelect?.(a.dataset.id)}willUpdate(){this._pendingSelectedId=this._state.selectedCategoryId.get()}updated(){this._pendingSelectedId!==this._scrolledSelectedId&&(this._scrolledSelectedId=this._pendingSelectedId,this.renderRoot.querySelector(`button.item[data-id="${this._pendingSelectedId}"]`)?.scrollIntoView({block:"nearest"}))}render(){let t=this.searchMatches,o=this._state.query.get().trim(),i=o?t.length?`${t.length} matching ${1===t.length?"category":"categories"}`:"No matching settings":"",r=ed`<div class="sr-only" role="status" aria-live="polite">${i}</div>`;if(!t.length){let t=o.includes(" ")||o.toLowerCase().startsWith("gitlens.")?o:`gitlens.${o}`;return ed`${r}
				<div class="empty">
					<p>No settings match “${o}”.</p>
					<p>
						<a href="command:workbench.action.openSettings?${encodeURIComponent(JSON.stringify(t))}"
							>Open in Settings UI</a
						>
						to search every GitLens setting.
					</p>
				</div>`}let a=this._state.selectedCategoryId.get(),n=t.some(t=>t.category.id===a)?a:t[0].category.id,c=new Map;for(let o of t){let t=c.get(o.category.group);null==t&&(t=[],c.set(o.category.group,t)),t.push(o)}return ed`${r}
			${o?ed`<p class="results-count">
						${t.length} ${1===t.length?"category":"categories"}
					</p>`:em}
			<div role="listbox" aria-label="Settings categories" @keydown=${this.handleKeyDown}>
				${Array.from(c.entries(),([t,o])=>ed`
						<div class="group" role="group" aria-label=${t}>
							<h2 class="group__label" aria-hidden="true">${t}</h2>
							${o.map(t=>this.renderItem(t.category,a,n))}
						</div>
					`)}
			</div>`}renderItem(t,o,i){let{on:r,count:a}=this.categoryStatus(t),n=t.id===o;return ed`<button
			type="button"
			class="item"
			role="option"
			data-id=${t.id}
			title=${t.name}
			aria-selected=${n?"true":"false"}
			tabindex=${t.id===i?0:-1}
			@click=${()=>this.onSelect?.(t.id)}
		>
			${void 0===r?ed`<span class="item__pip item__pip--placeholder" aria-hidden="true"></span>`:ed`<span class="item__pip ${r?"item__pip--on":""}" aria-hidden="true"></span>`}
			<code-icon icon=${t.icon} aria-hidden="true"></code-icon>
			<span class="item__name">${t.name}</span>
			${t.pro?ed`<gl-feature-badge
						.source=${{source:"settings",detail:"nav"}}
						.subscription=${this._state.subscription.get()}
					></gl-feature-badge>`:em}
			${a?ed`<span class="item__count" aria-label=${a.aria}>${a.label}</span>`:void 0!==r?ed`<span class="sr-only">${r?"On":"Off"}</span>`:em}
		</button>`}};ls.styles=[iH,iG,iV,w`
			:host {
				display: block;
				padding: var(--gl-space-10) 0;
				overflow-y: auto;
			}

			.group__label {
				padding: 0.6rem 1.4rem 0.5rem;
				margin: 0;
				font-size: 1.05rem;
				font-weight: 400;
				color: var(--color-foreground--50);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}

			.group {
				margin-block-end: var(--gl-space-10);
			}

			.item {
				display: flex;
				gap: var(--gl-space-10);
				align-items: center;
				width: 100%;
				padding: var(--gl-space-8) var(--gl-space-12);
				font-family: var(--vscode-font-family);
				font-size: 1.25rem;
				color: var(--color-foreground);
				text-align: left;
				cursor: pointer;
				background: transparent;
				border: none;
				border-left: 2px solid transparent;
			}

			.item:hover {
				background-color: var(--vscode-list-hoverBackground);
			}

			.item[aria-selected='true'] {
				color: var(--vscode-list-activeSelectionForeground);
				background-color: var(--vscode-list-activeSelectionBackground);
				border-left-color: var(--vscode-focusBorder, var(--vscode-button-background));
			}

			.item:focus-visible {
				${ij}
			}

			.item__pip {
				flex: none;
				width: 0.6rem;
				height: 0.6rem;
				background: transparent;
				border: var(--gl-border-width) solid var(--color-foreground--50);
				border-radius: 50%;
			}

			.item__pip--on {
				background: var(--gl-stat-added, var(--vscode-charts-green));
				border-color: var(--gl-stat-added, var(--vscode-charts-green));
			}

			.item__pip--placeholder {
				visibility: hidden;
			}

			.item__name {
				flex: 1;
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.item__count {
				flex: none;
				font-family: var(--vscode-editor-font-family);
				font-size: 1.05rem;
				color: var(--color-foreground--50);
			}

			.item[aria-selected='true'] .item__count {
				color: inherit;
			}

			.results-count {
				padding: 0.4rem 1.4rem 0.8rem;
				margin: 0;
				font-size: 1.1rem;
				color: var(--color-foreground--50);
			}

			.empty {
				padding: 1.6rem 1.4rem;
				font-size: 1.2rem;
				color: var(--color-foreground--50);
			}

			.empty p {
				margin: 0 0 var(--gl-space-8);
			}
		`],ln([p({context:"settingsState"})],ls.prototype,"_state",2),ln([e$({attribute:!1})],ls.prototype,"onSelect",2),ls=ln([eC("gl-settings-nav")],ls);let ll=w`
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
`;var lc=Object.defineProperty,ld=Object.getOwnPropertyDescriptor,lh=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?ld(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&lc(o,i,n),n};let lu=class extends lit_element_i{constructor(){super(...arguments),this.display="solid",this.dismissible=!1,this.layout="default"}get classNames(){return{banner:!0,[`banner--${this.display}`]:!0,[`banner--${this.layout}`]:"default"!==this.layout}}render(){return ed`<div part="base" class=${ag(this.classNames)}>
			<div class="banner__content">
				${"responsive"===this.layout?this.renderResponsiveContent():this.renderDefaultContent()}
			</div>
			${"responsive"!==this.layout?this.renderDismissButton():void 0}
		</div>`}renderDefaultContent(){return ed`${this.renderTitle()} ${this.renderBody()} ${this.renderButtons()}`}renderResponsiveContent(){return ed`
			<div class="banner__text">${this.renderTitle()} ${this.renderBody()}</div>
			${this.renderButtons()} ${this.renderDismissButton()}
		`}renderTitle(){if(this.bannerTitle)return ed`<div class="banner__title">${this.bannerTitle}</div>`}renderBody(){if(this.body)return ed`<div class="banner__body">${i3(this.body)}</div>`}renderButtons(){let t=this.renderPrimaryButton(),o=this.renderSecondaryButton();if(t||o)return ed`<div class="banner__buttons">${t} ${o}</div>`}renderPrimaryButton(){if(this.primaryButton)return ed`
			<gl-button
				class="banner__button banner__button--primary"
				appearance=${"gradient-purple"===this.display?"secondary":void 0}
				?full=${"gradient-purple"===this.display}
				href=${this.primaryButtonHref??em}
				truncate
				@click=${this.onPrimaryButtonClick}
			>
				${this.primaryButton}
			</gl-button>
		`}renderSecondaryButton(){if(this.secondaryButton)return ed`
			<gl-button
				class="banner__button banner__button--secondary"
				appearance="toolbar"
				href=${this.secondaryButtonHref??em}
				@click=${this.onSecondaryButtonClick}
			>
				${this.secondaryButton}
			</gl-button>
		`}renderDismissButton(){if(this.dismissible)return ed`
			<gl-button
				class="banner__dismiss"
				appearance="toolbar"
				href=${this.dismissHref??em}
				aria-label="Dismiss"
				tooltip="Dismiss"
				@click=${this.onDismissClick}
			>
				<code-icon icon="close"></code-icon>
			</gl-button>
		`}onPrimaryButtonClick(t){this.primaryButtonCommand&&t.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-primary-click",{detail:{command:this.primaryButtonCommand},bubbles:!0,composed:!0}))}onSecondaryButtonClick(t){this.secondaryButtonCommand&&t.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-secondary-click",{detail:{command:this.secondaryButtonCommand},bubbles:!0,composed:!0}))}onDismissClick(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-dismiss",{bubbles:!0,composed:!0}))}};lu.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},lu.styles=[ll],lh([e$({reflect:!0})],lu.prototype,"display",2),lh([e$({attribute:"banner-title"})],lu.prototype,"bannerTitle",2),lh([e$()],lu.prototype,"body",2),lh([e$({attribute:"primary-button"})],lu.prototype,"primaryButton",2),lh([e$({attribute:"primary-button-href"})],lu.prototype,"primaryButtonHref",2),lh([e$({attribute:"primary-button-command"})],lu.prototype,"primaryButtonCommand",2),lh([e$({attribute:"secondary-button"})],lu.prototype,"secondaryButton",2),lh([e$({attribute:"secondary-button-href"})],lu.prototype,"secondaryButtonHref",2),lh([e$({attribute:"secondary-button-command"})],lu.prototype,"secondaryButtonCommand",2),lh([e$({type:Boolean,attribute:"dismissible"})],lu.prototype,"dismissible",2),lh([e$({attribute:"dismiss-href"})],lu.prototype,"dismissHref",2),lh([e$({attribute:"layout"})],lu.prototype,"layout",2),lu=lh([eC("gl-banner")],lu);var lp=Object.defineProperty,lm=Object.getOwnPropertyDescriptor,lg=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?lm(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&lp(o,i,n),n};let lb=class extends ts(lit_element_i){render(){let t=this.error.get();return t?ed`<gl-banner
			display="solid"
			banner-title="Something went wrong"
			.body=${t}
			dismissible
			@gl-banner-dismiss=${()=>this.error.set(void 0)}
		></gl-banner>`:em}};lg([e$({attribute:!1})],lb.prototype,"error",2),lb=lg([eC("gl-error-banner")],lb);let lf=w`
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
`;var lv=Object.defineProperty,lw=Object.getOwnPropertyDescriptor,ly=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?lw(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&lv(o,i,n),n};let lk=class extends lit_element_i{constructor(){super(...arguments),this._size=0,this._position=0,this._positionBeforeCollapse=0,this._cachedPrimaryPx=0,this._lastPointerDownTime=0,this.orientation="horizontal",this.mode="split",this.disabled=!1}get position(){return this._position}set position(t){let o=this._position;this._position=lx(t),this.updateCachedPrimaryPx(),void 0!==this._closedState&&this.emitClosedIfChanged(),this.requestUpdate("position",o)}get isHorizontal(){return"vertical"!==this.orientation}reconcileOrientation(){if(null==this._observedOrientation||this._observedOrientation===this.orientation)return!1;let t=this.getBoundingClientRect(),o=Math.round(this.isHorizontal?t.width:t.height);if(o<=0)return!1;this._observedOrientation=this.orientation,this._size=o;let i=this.applySnap(this._position);return i!==this._position&&(this._position=i,this.requestUpdate()),this.updateCachedPrimaryPx(),!0}updateCachedPrimaryPx(){this._size<=0||("end"===this.primary?this._cachedPrimaryPx=(100-this._position)/100*this._size:this._cachedPrimaryPx=this._position/100*this._size)}connectedCallback(){super.connectedCallback?.(),this._resizeObserver=new ResizeObserver(t=>{let o=t[0].contentRect,i=Math.round(this.isHorizontal?o.width:o.height);if(0!==i&&!this.reconcileOrientation()&&i!==this._size){let t=this._position;if(this._size=i,this.primary&&this._cachedPrimaryPx>0){let t="end"===this.primary?lx(100-this._cachedPrimaryPx/i*100):lx(this._cachedPrimaryPx/i*100),o=this.applySnap(t),r=!0===this._closedState;this._position=!r&&this.computeClosed(o)?t:o}this._position!==t&&this.emitChange(),this.requestUpdate()}}),this.updateComplete.then(()=>{this._resizeObserver.observe(this);let t=this.getBoundingClientRect();this._size=Math.round(this.isHorizontal?t.width:t.height),this._observedOrientation=this.orientation,this._closedState=null!=this.primary&&this.computeClosed(this._position);let o=this.applySnap(this._position);o!==this._position&&(this._position=o,this.emitChange()),this.updateCachedPrimaryPx(),this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback?.(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._dragAc?.abort(),this._dragAc=void 0}willUpdate(){this.style.setProperty("--_start-size",`${this._position}%`)}updated(){this.reconcileOrientation()}render(){return ed`
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
		`}applySnap(t){return this.snap?this.snap({pos:t,size:this._size}):t}emitChange(){this.dispatchEvent(new CustomEvent("gl-split-panel-change",{detail:{position:this._position}})),this.emitClosedIfChanged()}computeClosed(t){return null!=this.primary&&("end"===this.primary?t>=100:t<=0)}emitClosedIfChanged(){if(null==this.primary)return;let t=this.computeClosed(this._position);this._closedState!==t&&(this._closedState=t,this.dispatchEvent(new CustomEvent("gl-split-panel-closed-change",{detail:{closed:t,position:this._position}})))}handlePointerDown(t){if(this.disabled||0!==t.button)return;t.preventDefault();let o=t.timeStamp;if(o-this._lastPointerDownTime<400){this._lastPointerDownTime=0,this.dispatchEvent(new CustomEvent("gl-split-panel-dblclick",{bubbles:!0,composed:!0}));return}this._lastPointerDownTime=o;let i=this.isHorizontal,r=this.getBoundingClientRect(),a=i?t.clientX-r.left:t.clientY-r.top,n=this.dividerEl.getBoundingClientRect(),c=lx((i?n.left-r.left+n.width/2:n.top-r.top+n.height/2)/this._size*100);Math.abs(c-this._position)>1&&(this._position=c,this.updateCachedPrimaryPx(),this.style.setProperty("--_start-size",`${this._position}%`)),this.toggleAttribute("dragging",!0),this.dividerEl.setPointerCapture(t.pointerId),this._dragAc?.abort();let h=new AbortController;this._dragAc=h;let u=a-this._position/100*this._size,p=t=>{if(this._size<=0)return;let o=this.getBoundingClientRect(),r=((i?t.clientX-o.left:t.clientY-o.top)-u)/this._size*100;this.position=this.applySnap(r),this.emitChange()},m=()=>{this.toggleAttribute("dragging",!1),h.abort(),this._dragAc=void 0,this.dispatchEvent(new CustomEvent("gl-split-panel-drag-end",{detail:{position:this._position},bubbles:!0,composed:!0}))};this.dividerEl.addEventListener("pointermove",p,{passive:!0,signal:h.signal}),this.dividerEl.addEventListener("lostpointercapture",m,{signal:h.signal})}handleKeyDown(t){if(this.disabled)return;let o=t.shiftKey?10:1,i=this._position,r=!0,a=this.isHorizontal;switch(t.key){case"ArrowLeft":a?i-=o:r=!1;break;case"ArrowRight":a?i+=o:r=!1;break;case"ArrowUp":a?r=!1:i-=o;break;case"ArrowDown":a?r=!1:i+=o;break;case"Home":i=0;break;case"End":i=100;break;case"Enter":"end"===this.primary?this._position>=100&&this._positionBeforeCollapse<100?i=this._positionBeforeCollapse:(this._positionBeforeCollapse=this._position,i=100):this._position<=0&&this._positionBeforeCollapse>0?i=this._positionBeforeCollapse:(this._positionBeforeCollapse=this._position,i=0);break;default:r=!1}r&&(t.preventDefault(),this.position=this.applySnap(i),this.emitChange())}};function lx(t){return Math.max(0,Math.min(100,t))}lk.styles=lf,ly([e$({type:Number,reflect:!0})],lk.prototype,"position",1),ly([e$({reflect:!0})],lk.prototype,"orientation",2),ly([e$({attribute:!1})],lk.prototype,"snap",2),ly([e$({reflect:!0})],lk.prototype,"primary",2),ly([e$({reflect:!0})],lk.prototype,"mode",2),ly([e$({type:Boolean,reflect:!0})],lk.prototype,"disabled",2),ly([eA(".divider")],lk.prototype,"dividerEl",2),lk=ly([eC("gl-split-panel")],lk);var lC=Object.defineProperty,l_=Object.getOwnPropertyDescriptor,l$=(t,o,i,r)=>{for(var a,n=r>1?void 0:r?l_(o,i):o,c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r?a(o,i,n):a(n))||n);return r&&n&&lC(o,i,n),n};function lS({pos:t,size:o}){return o<=0?t:Math.max(170,Math.min(480,t/100*o))/o*100}let lL=class extends SignalWatcherWebviewApp{constructor(){super(...arguments),this._host=n??=il(),this._state=function(t){let{signal:o,persisted:i,resetAll:r,startAutoPersist:a,dispose:n}=function(t){let o,i=t?.storage,r=t?.version,a=t?.restoreKey;function n(){if(null==i)return;let o=i.get();if(null==o)return;let n=o.__v,c=o[iJ];if(null==a||c===a)return null!=r&&n!==r&&(o=t?.migrate?.(o,n)??void 0),o}let c=n(),h=[],u=[],p=!1;function m(){if(p=!1,o?.getPending(),o?.watch(),null==i||0===u.length)return;let t={};for(let o of(null!=r&&(t.__v=r),null!=a&&(t[iJ]=a),t[iZ]=Date.now(),u))t[o.key]=o.serialize(o.signal.get());i.set(t)}function g(t){if(null!=t){for(let i of(o===t&&p&&m(),u))t.unwatch(i.signal);o===t&&(o=void 0)}}return{signal:function(t){let o=tk(t);return h.push(()=>o.set(t)),o},persisted:function(t,i,r){if(iQ.has(t))throw Error(`Cannot use reserved key '${t}' for persisted signal`);let a=r?.deserialize,n=r?.serialize??(t=>t),h=o=>{if(null==o||!(t in o))return i;let r=o[t];if(null!=a){let t=a(r);return void 0!==t?t:i}return r},p=tk(h(c));return u.push({key:t,signal:p,serialize:n,reset:t=>{p.set(h(t))}}),null!=o&&o.watch(p),p},resetAll:function(){for(let t of h)t();let t=n();for(let o of u)o.reset(t)},startAutoPersist:function(){if(null==i)return()=>{};g(o);let t=new eO.subtle.Watcher(()=>{p||(p=!0,queueMicrotask(m))});for(let i of(o=t,u))t.watch(i.signal);return()=>{g(t)}},dispose:function(){g(o),h.length=0,u.length=0}}}({storage:t,version:1}),c=i("selectedCategoryId","current-line"),h=i("navPosition",23),u=i("scope","user"),p=i("query",""),m=o(void 0),g=o({}),b=o(""),f=o([["user","User"]]),v=o(void 0),w=o(void 0),x=o(void 0),C=o(void 0),_=o({subscription:!1,integrations:!1,ai:!1}),$=o(void 0),S=o(!0),A=o(void 0),E=tx(()=>(function(t,o,i){let r=o.trim().toLowerCase();if(!r)return t.map(t=>({category:t,matchedKeys:[]}));let a=r.startsWith("gitlens.")?r.substring(8):r,n=[];for(let o of t){let t=[],c=!1;for(let n of o.controls){let o=iO(n);(0!==o.length||null==n.visibleWhen||null==i||iI(n.visibleWhen,i))&&(o.some(t=>t.toLowerCase().includes(a))||iT(function(t){switch(t.kind){case"info":return t.text;case"select":case"segmented":return`${t.label} ${t.hint??""} ${t.options.map(t=>t.label).join(" ")}`;case"checkgroup":return`${t.label} ${t.hint??""} ${t.options.map(t=>`${t.label} ${t.hint??""}`).join(" ")}`;default:return`${t.label} ${t.hint??""}`}}(n)).toLowerCase().includes(r))&&(t.push(...o),c||=0===o.length)}null!=o.master&&(o.master.key.toLowerCase().includes(a)||o.master.label.toLowerCase().includes(r))&&t.push(o.master.key),(t.length||c||iT(`${o.name} ${o.hint}`).toLowerCase().includes(r))&&n.push({category:o,matchedKeys:t})}return n})(iD,p.get(),D)),P=tx(()=>{let t=c.get();return iD.find(o=>o.id===t)??iD[0]}),M=tx(()=>{let t=$.get();if(null!=t)return[t.key];if(!p.get())return[];let o=E.get().find(t=>t.category.id===c.get());return o?.matchedKeys??[]}),O=tx(()=>v.get()?.account!=null),T=t=>w.get()?.some(o=>o.id===t&&o.connected)??!1;function D(t){let o=g.get()[t];if(null!=o)return o;let i=m.get();if(null!=i)return t.split(".").reduce((t={},o)=>null==t?void 0:t[o],i)}return{selectedCategoryId:c,navPosition:h,scope:u,query:p,config:m,customSettings:g,version:b,scopes:f,subscription:v,cloudIntegrations:w,aiState:x,aiModel:C,serviceErrors:_,anchorKey:$,loading:S,error:A,searchResults:E,selectedCategory:P,highlightedKeys:M,hasAccount:O,hasConnectedJira:tx(()=>T(iX.Jira)),hasConnectedLinear:tx(()=>T(iX.Linear)),getSettingValue:D,resetAll:r,startAutoPersist:a,dispose:n}}(this._host.storage),this._unsubscribes=[],this._rpc=new RpcController(this,{rpcOptions:{webviewId:()=>this._webview?.webviewId,webviewInstanceId:()=>this._webview?.webviewInstanceId,endpoint:()=>this._host.createEndpoint()},onReady:t=>this._onRpcReady(t),onError:t=>this._state.error.set(t.message)}),this.handleGlobalKeyDown=t=>{"f"!==t.key.toLowerCase()||t.shiftKey||t.altKey||(!t.metaKey||t.ctrlKey||!eR)&&(!t.ctrlKey||t.metaKey||eR)||(t.preventDefault(),this._search?.focus(),this._search?.select())}}connectedCallback(){super.connectedCallback?.();let t=this.context;this.context=void 0,this.initWebviewContext(t),window.addEventListener("keydown",this.handleGlobalKeyDown)}disconnectedCallback(){for(let t of(window.removeEventListener("keydown",this.handleGlobalKeyDown),this._unsubscribes))t();this._unsubscribes=[],this._stopAutoPersist?.(),this._stopAutoPersist=void 0,this._actions?.dispose(),this._actions=void 0,this._state.resetAll(),this._state.dispose(),super.disconnectedCallback?.()}async _onRpcReady(t){let o=this._state;try{let[i,r,a,n]=await Promise.all([t.settings,t.subscription,t.integrations,t.ai]),c=new SettingsActions(o,t,i);this._actions=c,this._stopAutoPersist=o.startAutoPersist();let h=await i.onConfigChanged(t=>{tF(t.config.defaultDateLocale),o.config.set(t.config),o.customSettings.set(t.customSettings)}),u=await i.onAnchorRequested(t=>{c.openAnchor(t.anchor)}),p=await r.onSubscriptionChanged(t=>{o.subscription.set(t)}),m=await a.onIntegrationsChanged(t=>{o.cloudIntegrations.set(t.integrations)}),g=await n.onModelChanged(t=>{o.aiModel.set(t)}),b=await n.onStateChanged(t=>{o.aiState.set(t)});this._unsubscribes.push(h,u,p,m,g,b);let f=await i.getInitialContext();tF(f.config.defaultDateLocale),o.config.set(f.config),o.customSettings.set(f.customSettings),o.version.set(f.version),o.scopes.set(f.scopes),f.scopes.some(([t])=>t===o.scope.get())||o.scope.set("user"),f.anchor&&c.openAnchor(f.anchor),o.loading.set(!1),c.loadSharedServices()}catch(t){o.error.set(t instanceof Error?t.message:String(t))}}handleSearchInput(t){this._actions?.setQuery(t.target.value)}handleSearchKeyDown(t){"Escape"===t.key&&this._state.query.get()&&(t.preventDefault(),this._actions?.setQuery(""),null!=this._search&&(this._search.value=""))}render(){let t=this._state,o=t.scopes.get();return ed`<gl-error-banner .error=${t.error}></gl-error-banner>
			<div class="app" aria-busy=${t.loading.get()}>
				<header class="header">
					<div class="header__brand">
						<gl-icon-cube appearance="brand" icon="gl-gitlens" aria-hidden="true"></gl-icon-cube>
						<h1 class="header__title">GitLens Settings</h1>
						${t.version.get()?ed`<a
									class="header__version"
									href="https://github.com/gitkraken/vscode-gitlens/blob/main/CHANGELOG.md"
									aria-label="GitLens ${t.version.get()} — open the CHANGELOG"
									title="Open the CHANGELOG"
									>v${t.version.get()}</a
								>`:em}
					</div>
					<div class="header__search">
						<code-icon icon="search" aria-hidden="true"></code-icon>
						<input
							id="search"
							type="search"
							placeholder="Search settings (try a name like gitlens.currentLine.format)"
							aria-label="Search settings"
							spellcheck="false"
							.value=${t.query.get()}
							?disabled=${t.loading.get()}
							@input=${this.handleSearchInput}
							@keydown=${this.handleSearchKeyDown}
						/>
					</div>
					${o.length>1?ed`<div class="header__scope">
								<span id="scope-label">Save for</span>
								<gl-segmented-control
									label="Save settings for"
									.options=${o.map(([t,o])=>({value:t,label:o}))}
									.value=${t.scope.get()}
									@gl-change-value=${t=>this._actions?.setScope(t.target.value??"user")}
								></gl-segmented-control>
							</div>`:em}
				</header>
				${t.loading.get()?null!=t.error.get()?ed`<div class="body body--error" role="alert">
								<code-icon icon="error" aria-hidden="true"></code-icon>
								<span>
									GitLens Settings couldn’t load — ${t.error.get()}.
									<a href="command:workbench.action.reloadWindow">Reload the window</a> to try again.
								</span>
							</div>`:ed`<div class="body body--loading">
								<div class="body--loading__nav" aria-hidden="true">
									<skeleton-loader lines="12"></skeleton-loader>
								</div>
								<div class="body--loading__detail" aria-hidden="true">
									<skeleton-loader lines="6"></skeleton-loader>
								</div>
							</div>`:ed`<gl-split-panel
							class="body"
							primary="start"
							.position=${t.navPosition.get()}
							.snap=${lS}
							@gl-split-panel-change=${o=>t.navPosition.set(o.detail.position)}
						>
							<gl-settings-nav
								slot="start"
								class="body__nav"
								.onSelect=${t=>this._actions?.selectCategory(t)}
							></gl-settings-nav>
							<main slot="end" class="body__detail">
								<gl-settings-detail .actions=${this._actions}></gl-settings-detail>
							</main>
						</gl-split-panel>`}
			</div>`}};lL.styles=[iY],l$([e$({type:String,noAccessor:!0})],lL.prototype,"context",2),l$([eA("#search")],lL.prototype,"_search",2),l$([u({context:"settingsState"})],lL.prototype,"_state",2),lL=l$([eC("gl-settings-app")],lL);export{lL as GlSettingsApp};