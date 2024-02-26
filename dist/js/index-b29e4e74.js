function t(t,e){for(var n=0;n<e.length;n++){const r=e[n];if("string"!=typeof r&&!Array.isArray(r))for(const e in r)if("default"!==e&&!(e in t)){const n=Object.getOwnPropertyDescriptor(r,e);n&&Object.defineProperty(t,e,n.get?n:{enumerable:!0,get:()=>r[e]})}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}const e=Object.freeze(Object.defineProperty({__proto__:null,get Base(){return uI},get Circle(){return cI},get Ellipse(){return fI},get Image(){return hI},get Line(){return gI},get Marker(){return yI},get Path(){return CI},get Polygon(){return TI},get Polyline(){return II},get Rect(){return OI},get Text(){return NI}},Symbol.toStringTag,{value:"Module"})),n=Object.freeze(Object.defineProperty({__proto__:null,get Base(){return HI},get Circle(){return qI},get Dom(){return $I},get Ellipse(){return ZI},get Image(){return KI},get Line(){return QI},get Marker(){return eO},get Path(){return nO},get Polygon(){return rO},get Polyline(){return iO},get Rect(){return oO},get Text(){return cO}},Symbol.toStringTag,{value:"Module"}));!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function i(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function o(t){if(t.__esModule)return t;var e=t.default;if("function"==typeof e){var n=function t(){return this instanceof t?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach((function(e){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(n,e,r.get?r:{enumerable:!0,get:function(){return t[e]}})})),n}var a={exports:{}},s={},u={exports:{}},c={},l=Symbol.for("react.element"),f=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),h=Symbol.for("react.strict_mode"),p=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),v=Symbol.for("react.context"),y=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),w=Symbol.iterator;var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S=Object.assign,M={};function _(t,e,n){this.props=t,this.context=e,this.refs=M,this.updater=n||E}function k(){}function C(t,e,n){this.props=t,this.context=e,this.refs=M,this.updater=n||E}_.prototype.isReactComponent={},_.prototype.setState=function(t,e){if("object"!=typeof t&&"function"!=typeof t&&null!=t)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")},_.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},k.prototype=_.prototype;var A=C.prototype=new k;A.constructor=C,S(A,_.prototype),A.isPureReactComponent=!0;var T=Array.isArray,I=Object.prototype.hasOwnProperty,O={current:null},N={key:!0,ref:!0,__self:!0,__source:!0};function P(t,e,n){var r,i={},o=null,a=null;if(null!=e)for(r in void 0!==e.ref&&(a=e.ref),void 0!==e.key&&(o=""+e.key),e)I.call(e,r)&&!N.hasOwnProperty(r)&&(i[r]=e[r]);var s=arguments.length-2;if(1===s)i.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];i.children=u}if(t&&t.defaultProps)for(r in s=t.defaultProps)void 0===i[r]&&(i[r]=s[r]);return{$$typeof:l,type:t,key:o,ref:a,props:i,_owner:O.current}}function D(t){return"object"==typeof t&&null!==t&&t.$$typeof===l}var L=/\/+/g;function j(t,e){return"object"==typeof t&&null!==t&&null!=t.key?function(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,(function(t){return e[t]}))}(""+t.key):e.toString(36)}function R(t,e,n,r,i){var o=typeof t;"undefined"!==o&&"boolean"!==o||(t=null);var a=!1;if(null===t)a=!0;else switch(o){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case l:case f:a=!0}}if(a)return i=i(a=t),t=""===r?"."+j(a,0):r,T(i)?(n="",null!=t&&(n=t.replace(L,"$&/")+"/"),R(i,e,n,"",(function(t){return t}))):null!=i&&(D(i)&&(i=function(t,e){return{$$typeof:l,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(L,"$&/")+"/")+t)),e.push(i)),1;if(a=0,r=""===r?".":r+":",T(t))for(var s=0;s<t.length;s++){var u=r+j(o=t[s],s);a+=R(o,e,n,u,i)}else if(u=function(t){return null===t||"object"!=typeof t?null:"function"==typeof(t=w&&t[w]||t["@@iterator"])?t:null}(t),"function"==typeof u)for(t=u.call(t),s=0;!(o=t.next()).done;)a+=R(o=o.value,e,n,u=r+j(o,s++),i);else if("object"===o)throw e=String(t),Error("Objects are not valid as a React child (found: "+("[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function B(t,e,n){if(null==t)return t;var r=[],i=0;return R(t,r,"","",(function(t){return e.call(n,t,i++)})),r}function z(t){if(-1===t._status){var e=t._result;(e=e()).then((function(e){0!==t._status&&-1!==t._status||(t._status=1,t._result=e)}),(function(e){0!==t._status&&-1!==t._status||(t._status=2,t._result=e)})),-1===t._status&&(t._status=0,t._result=e)}if(1===t._status)return t._result.default;throw t._result}var F={current:null},G={transition:null},U={ReactCurrentDispatcher:F,ReactCurrentBatchConfig:G,ReactCurrentOwner:O};c.Children={map:B,forEach:function(t,e,n){B(t,(function(){e.apply(this,arguments)}),n)},count:function(t){var e=0;return B(t,(function(){e++})),e},toArray:function(t){return B(t,(function(t){return t}))||[]},only:function(t){if(!D(t))throw Error("React.Children.only expected to receive a single React element child.");return t}},c.Component=_,c.Fragment=d,c.Profiler=p,c.PureComponent=C,c.StrictMode=h,c.Suspense=m,c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U,c.cloneElement=function(t,e,n){if(null==t)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=S({},t.props),i=t.key,o=t.ref,a=t._owner;if(null!=e){if(void 0!==e.ref&&(o=e.ref,a=O.current),void 0!==e.key&&(i=""+e.key),t.type&&t.type.defaultProps)var s=t.type.defaultProps;for(u in e)I.call(e,u)&&!N.hasOwnProperty(u)&&(r[u]=void 0===e[u]&&void 0!==s?s[u]:e[u])}var u=arguments.length-2;if(1===u)r.children=n;else if(1<u){s=Array(u);for(var c=0;c<u;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:l,type:t.type,key:i,ref:o,props:r,_owner:a}},c.createContext=function(t){return(t={$$typeof:v,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:g,_context:t},t.Consumer=t},c.createElement=P,c.createFactory=function(t){var e=P.bind(null,t);return e.type=t,e},c.createRef=function(){return{current:null}},c.forwardRef=function(t){return{$$typeof:y,render:t}},c.isValidElement=D,c.lazy=function(t){return{$$typeof:x,_payload:{_status:-1,_result:t},_init:z}},c.memo=function(t,e){return{$$typeof:b,type:t,compare:void 0===e?null:e}},c.startTransition=function(t){var e=G.transition;G.transition={};try{t()}finally{G.transition=e}},c.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},c.useCallback=function(t,e){return F.current.useCallback(t,e)},c.useContext=function(t){return F.current.useContext(t)},c.useDebugValue=function(){},c.useDeferredValue=function(t){return F.current.useDeferredValue(t)},c.useEffect=function(t,e){return F.current.useEffect(t,e)},c.useId=function(){return F.current.useId()},c.useImperativeHandle=function(t,e,n){return F.current.useImperativeHandle(t,e,n)},c.useInsertionEffect=function(t,e){return F.current.useInsertionEffect(t,e)},c.useLayoutEffect=function(t,e){return F.current.useLayoutEffect(t,e)},c.useMemo=function(t,e){return F.current.useMemo(t,e)},c.useReducer=function(t,e,n){return F.current.useReducer(t,e,n)},c.useRef=function(t){return F.current.useRef(t)},c.useState=function(t){return F.current.useState(t)},c.useSyncExternalStore=function(t,e,n){return F.current.useSyncExternalStore(t,e,n)},c.useTransition=function(){return F.current.useTransition()},c.version="18.2.0",u.exports=c;var W=u.exports;const Y=i(W),X=t({__proto__:null,default:Y},[W]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var V=W,H=Symbol.for("react.element"),q=Symbol.for("react.fragment"),$=Object.prototype.hasOwnProperty,Z=V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,K={key:!0,ref:!0,__self:!0,__source:!0};function Q(t,e,n){var r,i={},o=null,a=null;for(r in void 0!==n&&(o=""+n),void 0!==e.key&&(o=""+e.key),void 0!==e.ref&&(a=e.ref),e)$.call(e,r)&&!K.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps)void 0===i[r]&&(i[r]=e[r]);return{$$typeof:H,type:t,key:o,ref:a,props:i,_owner:Z.current}}s.Fragment=q,s.jsx=Q,s.jsxs=Q,a.exports=s;var J=a.exports,tt={},et={exports:{}},nt={},rt={exports:{}},it={};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!function(t){function e(t,e){var n=t.length;t.push(e);t:for(;0<n;){var r=n-1>>>1,o=t[r];if(!(0<i(o,e)))break t;t[r]=e,t[n]=o,n=r}}function n(t){return 0===t.length?null:t[0]}function r(t){if(0===t.length)return null;var e=t[0],n=t.pop();if(n!==e){t[0]=n;t:for(var r=0,o=t.length,a=o>>>1;r<a;){var s=2*(r+1)-1,u=t[s],c=s+1,l=t[c];if(0>i(u,n))c<o&&0>i(l,u)?(t[r]=l,t[c]=n,r=c):(t[r]=u,t[s]=n,r=s);else{if(!(c<o&&0>i(l,n)))break t;t[r]=l,t[c]=n,r=c}}}return e}function i(t,e){var n=t.sortIndex-e.sortIndex;return 0!==n?n:t.id-e.id}if("object"==typeof performance&&"function"==typeof performance.now){var o=performance;t.unstable_now=function(){return o.now()}}else{var a=Date,s=a.now();t.unstable_now=function(){return a.now()-s}}var u=[],c=[],l=1,f=null,d=3,h=!1,p=!1,g=!1,v="function"==typeof setTimeout?setTimeout:null,y="function"==typeof clearTimeout?clearTimeout:null,m="undefined"!=typeof setImmediate?setImmediate:null;function b(t){for(var i=n(c);null!==i;){if(null===i.callback)r(c);else{if(!(i.startTime<=t))break;r(c),i.sortIndex=i.expirationTime,e(u,i)}i=n(c)}}function x(t){if(g=!1,b(t),!p)if(null!==n(u))p=!0,N(w);else{var e=n(c);null!==e&&P(x,e.startTime-t)}}function w(e,i){p=!1,g&&(g=!1,y(_),_=-1),h=!0;var o=d;try{for(b(i),f=n(u);null!==f&&(!(f.expirationTime>i)||e&&!A());){var a=f.callback;if("function"==typeof a){f.callback=null,d=f.priorityLevel;var s=a(f.expirationTime<=i);i=t.unstable_now(),"function"==typeof s?f.callback=s:f===n(u)&&r(u),b(i)}else r(u);f=n(u)}if(null!==f)var l=!0;else{var v=n(c);null!==v&&P(x,v.startTime-i),l=!1}return l}finally{f=null,d=o,h=!1}}"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var E,S=!1,M=null,_=-1,k=5,C=-1;function A(){return!(t.unstable_now()-C<k)}function T(){if(null!==M){var e=t.unstable_now();C=e;var n=!0;try{n=M(!0,e)}finally{n?E():(S=!1,M=null)}}else S=!1}if("function"==typeof m)E=function(){m(T)};else if("undefined"!=typeof MessageChannel){var I=new MessageChannel,O=I.port2;I.port1.onmessage=T,E=function(){O.postMessage(null)}}else E=function(){v(T,0)};function N(t){M=t,S||(S=!0,E())}function P(e,n){_=v((function(){e(t.unstable_now())}),n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(t){t.callback=null},t.unstable_continueExecution=function(){p||h||(p=!0,N(w))},t.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):k=0<t?Math.floor(1e3/t):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(t){switch(d){case 1:case 2:case 3:var e=3;break;default:e=d}var n=d;d=e;try{return t()}finally{d=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var n=d;d=t;try{return e()}finally{d=n}},t.unstable_scheduleCallback=function(r,i,o){var a=t.unstable_now();switch("object"==typeof o&&null!==o?o="number"==typeof(o=o.delay)&&0<o?a+o:a:o=a,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return r={id:l++,callback:i,priorityLevel:r,startTime:o,expirationTime:s=o+s,sortIndex:-1},o>a?(r.sortIndex=o,e(c,r),null===n(u)&&r===n(c)&&(g?(y(_),_=-1):g=!0,P(x,o-a))):(r.sortIndex=s,e(u,r),p||h||(p=!0,N(w))),r},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(t){var e=d;return function(){var n=d;d=e;try{return t.apply(this,arguments)}finally{d=n}}}}(it),rt.exports=it;var ot=rt.exports,at=W,st=ot;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
/**
 * @license React
 * use-sync-external-store-with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */"function"==typeof Object.is&&Object.is,R8.useSyncExternalStore,R8.useRef,R8.useEffect,R8.useMemo,R8.useDebugValue;var B8=function(t){t()},z8=()=>B8,F8="default"in X?Y:X,G8=Symbol.for("react-redux-context"),U8="undefined"!=typeof globalThis?globalThis:{};function W8(){if(!F8.createContext)return{};const t=U8[G8]??(U8[G8]=new Map);let e=t.get(F8.createContext);return e||(e=F8.createContext(null),t.set(F8.createContext,e)),e}var Y8=W8();var X8={notify(){},get:()=>[]};function V8(t,e){let n,r=X8,i=0,o=!1;function a(){c.onStateChange&&c.onStateChange()}function s(){i++,n||(n=e?e.addNestedSub(a):t.subscribe(a),r=function(){const t=z8();let e=null,n=null;return{clear(){e=null,n=null},notify(){t((()=>{let t=e;for(;t;)t.callback(),t=t.next}))},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(t){let r=!0,i=n={callback:t,next:null,prev:n};return i.prev?i.prev.next=i:e=i,function(){r&&null!==e&&(r=!1,i.next?i.next.prev=i.prev:n=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}())}function u(){i--,n&&0===i&&(n(),n=void 0,r.clear(),r=X8)}const c={addNestedSub:function(t){s();const e=r.subscribe(t);let n=!1;return()=>{n||(n=!0,e(),u())}},notifyNestedSubs:function(){r.notify()},handleChangeWrapper:a,isSubscribed:function(){return o},trySubscribe:function(){o||(o=!0,s())},tryUnsubscribe:function(){o&&(o=!1,u())},getListeners:()=>r};return c}var H8=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement)?F8.useLayoutEffect:F8.useEffect;var q8,$8=function({store:t,context:e,children:n,serverState:r,stabilityCheck:i="once",identityFunctionCheck:o="once"}){const a=F8.useMemo((()=>{const e=V8(t);return{store:t,subscription:e,getServerState:r?()=>r:void 0,stabilityCheck:i,identityFunctionCheck:o}}),[t,r,i,o]),s=F8.useMemo((()=>t.getState()),[t]);H8((()=>{const{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),s!==t.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}}),[a,s]);const u=e||Y8;return F8.createElement(u.Provider,{value:a},n)};function Z8(t){return`Minified Redux error #${t}; visit https://redux.js.org/Errors?code=${t} for the full message or use the non-minified dev environment for full errors. `}q8=cf.unstable_batchedUpdates,B8=q8;var K8=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),Q8=()=>Math.random().toString(36).substring(7).split("").join("."),J8={INIT:`@@redux/INIT${Q8()}`,REPLACE:`@@redux/REPLACE${Q8()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${Q8()}`};function t9(t){if("object"!=typeof t||null===t)return!1;let e=t;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function e9(t,e,n){if("function"!=typeof t)throw new Error(Z8(2));if("function"==typeof e&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error(Z8(0));if("function"==typeof e&&void 0===n&&(n=e,e=void 0),void 0!==n){if("function"!=typeof n)throw new Error(Z8(1));return n(e9)(t,e)}let r=t,i=e,o=new Map,a=o,s=0,u=!1;function c(){a===o&&(a=new Map,o.forEach(((t,e)=>{a.set(e,t)})))}function l(){if(u)throw new Error(Z8(3));return i}function f(t){if("function"!=typeof t)throw new Error(Z8(4));if(u)throw new Error(Z8(5));let e=!0;c();const n=s++;return a.set(n,t),function(){if(e){if(u)throw new Error(Z8(6));e=!1,c(),a.delete(n),o=null}}}function d(t){if(!t9(t))throw new Error(Z8(7));if(void 0===t.type)throw new Error(Z8(8));if("string"!=typeof t.type)throw new Error(Z8(17));if(u)throw new Error(Z8(9));try{u=!0,i=r(i,t)}finally{u=!1}return(o=a).forEach((t=>{t()})),t}d({type:J8.INIT});return{dispatch:d,subscribe:f,getState:l,replaceReducer:function(t){if("function"!=typeof t)throw new Error(Z8(10));r=t,d({type:J8.REPLACE})},[K8]:function(){const t=f;return{subscribe(e){if("object"!=typeof e||null===e)throw new Error(Z8(11));function n(){const t=e;t.next&&t.next(l())}n();return{unsubscribe:t(n)}},[K8](){return this}}}}}function n9(t){const e=Object.keys(t),n={};for(let o=0;o<e.length;o++){const r=e[o];"function"==typeof t[r]&&(n[r]=t[r])}const r=Object.keys(n);let i;try{!function(t){Object.keys(t).forEach((e=>{const n=t[e];if(void 0===n(void 0,{type:J8.INIT}))throw new Error(Z8(12));if(void 0===n(void 0,{type:J8.PROBE_UNKNOWN_ACTION()}))throw new Error(Z8(13))}))}(n)}catch(DU){i=DU}return function(t={},e){if(i)throw i;let o=!1;const a={};for(let i=0;i<r.length;i++){const s=r[i],u=n[s],c=t[s],l=u(c,e);if(void 0===l)throw e&&e.type,new Error(Z8(14));a[s]=l,o=o||l!==c}return o=o||r.length!==Object.keys(t).length,o?a:t}}function r9(...t){return 0===t.length?t=>t:1===t.length?t[0]:t.reduce(((t,e)=>(...n)=>t(e(...n))))}var i9=Symbol.for("immer-nothing"),o9=Symbol.for("immer-draftable"),a9=Symbol.for("immer-state");function s9(t,...e){throw new Error(`[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`)}var u9=Object.getPrototypeOf;function c9(t){return!!t&&!!t[a9]}function l9(t){var e;return!!t&&(d9(t)||Array.isArray(t)||!!t[o9]||!!(null==(e=t.constructor)?void 0:e[o9])||y9(t)||m9(t))}var f9=Object.prototype.constructor.toString();function d9(t){if(!t||"object"!=typeof t)return!1;const e=u9(t);if(null===e)return!0;const n=Object.hasOwnProperty.call(e,"constructor")&&e.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===f9}function h9(t,e){0===p9(t)?Object.entries(t).forEach((([n,r])=>{e(n,r,t)})):t.forEach(((n,r)=>e(r,n,t)))}function p9(t){const e=t[a9];return e?e.type_:Array.isArray(t)?1:y9(t)?2:m9(t)?3:0}function g9(t,e){return 2===p9(t)?t.has(e):Object.prototype.hasOwnProperty.call(t,e)}function v9(t,e,n){const r=p9(t);2===r?t.set(e,n):3===r?t.add(n):t[e]=n}function y9(t){return t instanceof Map}function m9(t){return t instanceof Set}function b9(t){return t.copy_||t.base_}function x9(t,e){if(y9(t))return new Map(t);if(m9(t))return new Set(t);if(Array.isArray(t))return Array.prototype.slice.call(t);if(!e&&d9(t)){if(!u9(t)){const e=Object.create(null);return Object.assign(e,t)}return{...t}}const n=Object.getOwnPropertyDescriptors(t);delete n[a9];let r=Reflect.ownKeys(n);for(let i=0;i<r.length;i++){const e=r[i],o=n[e];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(n[e]={configurable:!0,writable:!0,enumerable:o.enumerable,value:t[e]})}return Object.create(u9(t),n)}function w9(t,e=!1){return S9(t)||c9(t)||!l9(t)||(p9(t)>1&&(t.set=t.add=t.clear=t.delete=E9),Object.freeze(t),e&&h9(t,((t,e)=>w9(e,!0)))),t}function E9(){s9(2)}function S9(t){return Object.isFrozen(t)}var M9,_9={};function k9(t){const e=_9[t];return e||s9(0),e}function C9(){return M9}function A9(t,e){e&&(k9("Patches"),t.patches_=[],t.inversePatches_=[],t.patchListener_=e)}function T9(t){I9(t),t.drafts_.forEach(N9),t.drafts_=null}function I9(t){t===M9&&(M9=t.parent_)}function O9(t){return M9={drafts_:[],parent_:M9,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function N9(t){const e=t[a9];0===e.type_||1===e.type_?e.revoke_():e.revoked_=!0}function P9(t,e){e.unfinalizedDrafts_=e.drafts_.length;const n=e.drafts_[0];return void 0!==t&&t!==n?(n[a9].modified_&&(T9(e),s9(4)),l9(t)&&(t=D9(e,t),e.parent_||j9(e,t)),e.patches_&&k9("Patches").generateReplacementPatches_(n[a9].base_,t,e.patches_,e.inversePatches_)):t=D9(e,n,[]),T9(e),e.patches_&&e.patchListener_(e.patches_,e.inversePatches_),t!==i9?t:void 0}function D9(t,e,n){if(S9(e))return e;const r=e[a9];if(!r)return h9(e,((i,o)=>L9(t,r,e,i,o,n))),e;if(r.scope_!==t)return e;if(!r.modified_)return j9(t,r.base_,!0),r.base_;if(!r.finalized_){r.finalized_=!0,r.scope_.unfinalizedDrafts_--;const e=r.copy_;let i=e,o=!1;3===r.type_&&(i=new Set(e),e.clear(),o=!0),h9(i,((i,a)=>L9(t,r,e,i,a,n,o))),j9(t,e,!1),n&&t.patches_&&k9("Patches").generatePatches_(r,n,t.patches_,t.inversePatches_)}return r.copy_}function L9(t,e,n,r,i,o,a){if(c9(i)){const a=D9(t,i,o&&e&&3!==e.type_&&!g9(e.assigned_,r)?o.concat(r):void 0);if(v9(n,r,a),!c9(a))return;t.canAutoFreeze_=!1}else a&&n.add(i);if(l9(i)&&!S9(i)){if(!t.immer_.autoFreeze_&&t.unfinalizedDrafts_<1)return;D9(t,i),e&&e.scope_.parent_||j9(t,i)}}function j9(t,e,n=!1){!t.parent_&&t.immer_.autoFreeze_&&t.canAutoFreeze_&&w9(e,n)}var R9={get(t,e){if(e===a9)return t;const n=b9(t);if(!g9(n,e))return function(t,e,n){var r;const i=F9(e,n);return i?"value"in i?i.value:null==(r=i.get)?void 0:r.call(t.draft_):void 0}(t,n,e);const r=n[e];return t.finalized_||!l9(r)?r:r===z9(t.base_,e)?(U9(t),t.copy_[e]=W9(r,t)):r},has:(t,e)=>e in b9(t),ownKeys:t=>Reflect.ownKeys(b9(t)),set(t,e,n){const r=F9(b9(t),e);if(null==r?void 0:r.set)return r.set.call(t.draft_,n),!0;if(!t.modified_){const r=z9(b9(t),e),a=null==r?void 0:r[a9];if(a&&a.base_===n)return t.copy_[e]=n,t.assigned_[e]=!1,!0;if(((i=n)===(o=r)?0!==i||1/i==1/o:i!=i&&o!=o)&&(void 0!==n||g9(t.base_,e)))return!0;U9(t),G9(t)}var i,o;return t.copy_[e]===n&&(void 0!==n||e in t.copy_)||Number.isNaN(n)&&Number.isNaN(t.copy_[e])||(t.copy_[e]=n,t.assigned_[e]=!0),!0},deleteProperty:(t,e)=>(void 0!==z9(t.base_,e)||e in t.base_?(t.assigned_[e]=!1,U9(t),G9(t)):delete t.assigned_[e],t.copy_&&delete t.copy_[e],!0),getOwnPropertyDescriptor(t,e){const n=b9(t),r=Reflect.getOwnPropertyDescriptor(n,e);return r?{writable:!0,configurable:1!==t.type_||"length"!==e,enumerable:r.enumerable,value:n[e]}:r},defineProperty(){s9(11)},getPrototypeOf:t=>u9(t.base_),setPrototypeOf(){s9(12)}},B9={};function z9(t,e){const n=t[a9];return(n?b9(n):t)[e]}function F9(t,e){if(!(e in t))return;let n=u9(t);for(;n;){const t=Object.getOwnPropertyDescriptor(n,e);if(t)return t;n=u9(n)}}function G9(t){t.modified_||(t.modified_=!0,t.parent_&&G9(t.parent_))}function U9(t){t.copy_||(t.copy_=x9(t.base_,t.scope_.immer_.useStrictShallowCopy_))}h9(R9,((t,e)=>{B9[t]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}})),B9.deleteProperty=function(t,e){return B9.set.call(this,t,e,void 0)},B9.set=function(t,e,n){return R9.set.call(this,t[0],e,n,t[0])};function W9(t,e){const n=y9(t)?k9("MapSet").proxyMap_(t,e):m9(t)?k9("MapSet").proxySet_(t,e):function(t,e){const n=Array.isArray(t),r={type_:n?1:0,scope_:e?e.scope_:C9(),modified_:!1,finalized_:!1,assigned_:{},parent_:e,base_:t,draft_:null,copy_:null,revoke_:null,isManual_:!1};let i=r,o=R9;n&&(i=[r],o=B9);const{revoke:a,proxy:s}=Proxy.revocable(i,o);return r.draft_=s,r.revoke_=a,s}(t,e);return(e?e.scope_:C9()).drafts_.push(n),n}function Y9(t){return c9(t)||s9(10),X9(t)}function X9(t){if(!l9(t)||S9(t))return t;const e=t[a9];let n;if(e){if(!e.modified_)return e.base_;e.finalized_=!0,n=x9(t,e.scope_.immer_.useStrictShallowCopy_)}else n=x9(t,!0);return h9(n,((t,e)=>{v9(n,t,X9(e))})),e&&(e.finalized_=!1),n}var V9=new class{constructor(t){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(t,e,n)=>{if("function"==typeof t&&"function"!=typeof e){const n=e;e=t;const r=this;return function(t=n,...i){return r.produce(t,(t=>e.call(this,t,...i)))}}let r;if("function"!=typeof e&&s9(6),void 0!==n&&"function"!=typeof n&&s9(7),l9(t)){const i=O9(this),o=W9(t,void 0);let a=!0;try{r=e(o),a=!1}finally{a?T9(i):I9(i)}return A9(i,n),P9(r,i)}if(!t||"object"!=typeof t){if(r=e(t),void 0===r&&(r=t),r===i9&&(r=void 0),this.autoFreeze_&&w9(r,!0),n){const e=[],i=[];k9("Patches").generateReplacementPatches_(t,r,e,i),n(e,i)}return r}s9(1)},this.produceWithPatches=(t,e)=>{if("function"==typeof t)return(e,...n)=>this.produceWithPatches(e,(e=>t(e,...n)));let n,r;return[this.produce(t,e,((t,e)=>{n=t,r=e})),n,r]},"boolean"==typeof(null==t?void 0:t.autoFreeze)&&this.setAutoFreeze(t.autoFreeze),"boolean"==typeof(null==t?void 0:t.useStrictShallowCopy)&&this.setUseStrictShallowCopy(t.useStrictShallowCopy)}createDraft(t){l9(t)||s9(8),c9(t)&&(t=Y9(t));const e=O9(this),n=W9(t,void 0);return n[a9].isManual_=!0,I9(e),n}finishDraft(t,e){const n=t&&t[a9];n&&n.isManual_||s9(9);const{scope_:r}=n;return A9(r,e),P9(void 0,r)}setAutoFreeze(t){this.autoFreeze_=t}setUseStrictShallowCopy(t){this.useStrictShallowCopy_=t}applyPatches(t,e){let n;for(n=e.length-1;n>=0;n--){const r=e[n];if(0===r.path.length&&"replace"===r.op){t=r.value;break}}n>-1&&(e=e.slice(n+1));const r=k9("Patches").applyPatches_;return c9(t)?r(t,e):this.produce(t,(t=>r(t,e)))}},H9=V9.produce;V9.produceWithPatches.bind(V9),V9.setAutoFreeze.bind(V9),V9.setUseStrictShallowCopy.bind(V9),V9.applyPatches.bind(V9),V9.createDraft.bind(V9),V9.finishDraft.bind(V9);var q9=t=>Array.isArray(t)?t:[t];function $9(t){const e=Array.isArray(t[0])?t[0]:t;return function(t,e="expected all items to be functions, instead received the following types: "){if(!t.every((t=>"function"==typeof t))){const n=t.map((t=>"function"==typeof t?`function ${t.name||"unnamed"}()`:typeof t)).join(", ");throw new TypeError(`${e}[${n}]`)}}(e,"createSelector expects all input-selectors to be functions, but received the following types: "),e}var Z9="undefined"!=typeof WeakRef?WeakRef:class{constructor(t){this.value=t}deref(){return this.value}},K9=0,Q9=1;function J9(){return{s:K9,v:void 0,o:null,p:null}}function t7(t,e={}){let n=J9();const{resultEqualityCheck:r}=e;let i,o=0;function a(){let e=n;const{length:a}=arguments;for(let t=0,n=a;t<n;t++){const n=arguments[t];if("function"==typeof n||"object"==typeof n&&null!==n){let t=e.o;null===t&&(e.o=t=new WeakMap);const r=t.get(n);void 0===r?(e=J9(),t.set(n,e)):e=r}else{let t=e.p;null===t&&(e.p=t=new Map);const r=t.get(n);void 0===r?(e=J9(),t.set(n,e)):e=r}}const s=e;let u;if(e.s===Q9?u=e.v:(u=t.apply(null,arguments),o++),s.s=Q9,r){const t=(null==i?void 0:i.deref())??i;null!=t&&r(t,u)&&(u=t,0!==o&&o--);i="object"==typeof u&&null!==u||"function"==typeof u?new Z9(u):u}return s.v=u,u}return a.clearCache=()=>{n=J9(),a.resetResultsCount()},a.resultsCount=()=>o,a.resetResultsCount=()=>{o=0},a}function e7(t,...e){const n="function"==typeof t?{memoize:t,memoizeOptions:e}:t;return(...t)=>{let e,r=0,i=0,o={},a=t.pop();"object"==typeof a&&(o=a,a=t.pop()),function(t,e="expected a function, instead received "+typeof t){if("function"!=typeof t)throw new TypeError(e)}(a,`createSelector expects an output function after the inputs, but received: [${typeof a}]`);const s={...n,...o},{memoize:u,memoizeOptions:c=[],argsMemoize:l=t7,argsMemoizeOptions:f=[],devModeChecks:d={}}=s,h=q9(c),p=q9(f),g=$9(t),v=u((function(){return r++,a.apply(null,arguments)}),...h),y=l((function(){i++;const t=function(t,e){const n=[],{length:r}=t;for(let i=0;i<r;i++)n.push(t[i].apply(null,e));return n}(g,arguments);return e=v.apply(null,t),e}),...p);return Object.assign(y,{resultFunc:a,memoizedResultFunc:v,dependencies:g,dependencyRecomputations:()=>i,resetDependencyRecomputations:()=>{i=0},lastResult:()=>e,recomputations:()=>r,resetRecomputations:()=>{r=0},memoize:u,argsMemoize:l})}}function n7(t){return({dispatch:e,getState:n})=>r=>i=>"function"==typeof i?i(e,n,t):r(i)}var r7=n7(),i7=n7;((...t)=>{const e=e7(...t)})(t7);var o7="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?r9:r9.apply(null,arguments)};function a7(t,e){function n(...n){if(e){let r=e(...n);if(!r)throw new Error(x7(0));return{type:t,payload:r.payload,..."meta"in r&&{meta:r.meta},..."error"in r&&{error:r.error}}}return{type:t,payload:n[0]}}return n.toString=()=>`${t}`,n.type=t,n.match=e=>function(t){return t9(t)&&"type"in t&&"string"==typeof t.type}(e)&&e.type===t,n}var s7=class t extends Array{constructor(...e){super(...e),Object.setPrototypeOf(this,t.prototype)}static get[Symbol.species](){return t}concat(...t){return super.concat.apply(this,t)}prepend(...e){return 1===e.length&&Array.isArray(e[0])?new t(...e[0].concat(this)):new t(...e.concat(this))}};function u7(t){return l9(t)?H9(t,(()=>{})):t}function c7(t,e,n){if(t.has(e)){let r=t.get(e);return n.update&&(r=n.update(r,e,t),t.set(e,r)),r}if(!n.insert)throw new Error(x7(10));const r=n.insert(e,t);return t.set(e,r),r}var l7=t=>e=>{setTimeout(e,t)},f7="undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:l7(10),d7=t=>function(e){const{autoBatch:n=!0}=e??{};let r=new s7(t);return n&&r.push(((t={type:"raf"})=>e=>(...n)=>{const r=e(...n);let i=!0,o=!1,a=!1;const s=new Set,u="tick"===t.type?queueMicrotask:"raf"===t.type?f7:"callback"===t.type?t.queueNotification:l7(t.timeout),c=()=>{a=!1,o&&(o=!1,s.forEach((t=>t())))};return Object.assign({},r,{subscribe(t){const e=r.subscribe((()=>i&&t()));return s.add(t),()=>{e(),s.delete(t)}},dispatch(t){var e;try{return i=!(null==(e=null==t?void 0:t.meta)?void 0:e.RTK_autoBatch),o=!i,o&&(a||(a=!0,u(c))),r.dispatch(t)}finally{i=!0}}})})("object"==typeof n?n:void 0)),r};function h7(t){const e={},n=[];let r;const i={addCase(t,n){const r="string"==typeof t?t:t.type;if(!r)throw new Error(x7(28));if(r in e)throw new Error(x7(29));return e[r]=n,i},addMatcher:(t,e)=>(n.push({matcher:t,reducer:e}),i),addDefaultCase:t=>(r=t,i)};return t(i),[e,n,r]}var p7=Symbol.for("rtk-slice-createasyncthunk");function g7(t,e){return`${t}/${e}`}function v7(t,e,n,r){function i(i,...o){let a=n.call(t,i);return void 0===a&&r&&(a=t.getInitialState()),e(a,...o)}return i.unwrapped=e,i}var y7=function({creators:t}={}){var e;const n=null==(e=null==t?void 0:t.asyncThunk)?void 0:e[p7];return function(t){const{name:e,reducerPath:r=e}=t;if(!e)throw new Error(x7(11));const i=("function"==typeof t.reducers?t.reducers(function(){function t(t,e){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...e}}return t.withTypes=()=>t,{reducer:t=>Object.assign({[t.name]:(...e)=>t(...e)}[t.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(t,e)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:e}),asyncThunk:t}}()):t.reducers)||{},o=Object.keys(i),a={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(t,e){const n="string"==typeof t?t:t.type;if(!n)throw new Error(x7(12));if(n in a.sliceCaseReducersByType)throw new Error(x7(13));return a.sliceCaseReducersByType[n]=e,s},addMatcher:(t,e)=>(a.sliceMatchers.push({matcher:t,reducer:e}),s),exposeAction:(t,e)=>(a.actionCreators[t]=e,s),exposeCaseReducer:(t,e)=>(a.sliceCaseReducersByName[t]=e,s)};function u(){const[e={},n=[],r]="function"==typeof t.extraReducers?h7(t.extraReducers):[t.extraReducers],i={...e,...a.sliceCaseReducersByType};return function(t,e){let n,[r,i,o]=h7(e);if("function"==typeof t)n=()=>u7(t());else{const e=u7(t);n=()=>e}function a(t=n(),e){let a=[r[e.type],...i.filter((({matcher:t})=>t(e))).map((({reducer:t})=>t))];return 0===a.filter((t=>!!t)).length&&(a=[o]),a.reduce(((t,n)=>{if(n){if(c9(t)){const r=n(t,e);return void 0===r?t:r}if(l9(t))return H9(t,(t=>n(t,e)));{const r=n(t,e);if(void 0===r){if(null===t)return t;throw new Error(x7(9))}return r}}return t}),t)}return a.getInitialState=n,a}(t.initialState,(t=>{for(let e in i)t.addCase(e,i[e]);for(let e of a.sliceMatchers)t.addMatcher(e.matcher,e.reducer);for(let e of n)t.addMatcher(e.matcher,e.reducer);r&&t.addDefaultCase(r)}))}o.forEach((r=>{const o=i[r],a={reducerName:r,type:g7(e,r),createNotation:"function"==typeof t.reducers};!function(t){return"asyncThunk"===t._reducerDefinitionType}(o)?function({type:t,reducerName:e,createNotation:n},r,i){let o,a;if("reducer"in r){if(n&&!function(t){return"reducerWithPrepare"===t._reducerDefinitionType}(r))throw new Error(x7(17));o=r.reducer,a=r.prepare}else o=r;i.addCase(t,o).exposeCaseReducer(e,o).exposeAction(e,a?a7(t,a):a7(t))}(a,o,s):function({type:t,reducerName:e},n,r,i){if(!i)throw new Error(x7(18));const{payloadCreator:o,fulfilled:a,pending:s,rejected:u,settled:c,options:l}=n,f=i(t,o,l);r.exposeAction(e,f),a&&r.addCase(f.fulfilled,a);s&&r.addCase(f.pending,s);u&&r.addCase(f.rejected,u);c&&r.addMatcher(f.settled,c);r.exposeCaseReducer(e,{fulfilled:a||m7,pending:s||m7,rejected:u||m7,settled:c||m7})}(a,o,s,n)}));const c=t=>t,l=new WeakMap;let f;const d={name:e,reducerPath:r,reducer:(t,e)=>(f||(f=u()),f(t,e)),actions:a.actionCreators,caseReducers:a.sliceCaseReducersByName,getInitialState:()=>(f||(f=u()),f.getInitialState()),getSelectors(e=c){const n=c7(l,this,{insert:()=>new WeakMap});return c7(n,e,{insert:()=>{const n={};for(const[r,i]of Object.entries(t.selectors??{}))n[r]=v7(this,i,e,this!==d);return n}})},selectSlice(t){let e=t[this.reducerPath];return void 0===e&&this!==d&&(e=this.getInitialState()),e},get selectors(){return this.getSelectors(this.selectSlice)},injectInto(t,{reducerPath:e,...n}={}){const r=e??this.reducerPath;return t.inject({reducerPath:r,reducer:this.reducer},n),{...this,reducerPath:r}}};return d}}();function m7(){}var b7="listenerMiddleware";function x7(t){return`Minified Redux Toolkit error #${t}; visit https://redux-toolkit.js.org/Errors?code=${t} for the full message or use the non-minified dev environment for full errors. `}a7(`${b7}/add`),a7(`${b7}/removeAll`),a7(`${b7}/remove`);const w7=y7({name:"GraphData",initialState:{jsonData:{},GData:{nodes:[],edges:[]}},reducers:{setData(t,e){t.jsonData=e.payload;const n=Object.keys(t.jsonData).map((e=>{const n={id:e,label:e,version:t.jsonData[e].version,description:t.jsonData[e].description};return"treeRoot"==e?{...n,style:{width:140,height:60,fill:"orange"}}:n})),r=[];(()=>{for(const e of Object.values(t.jsonData))for(const n of e.dependencies)n in t.jsonData&&r.push({source:e.name,target:n})})(),t.GData={nodes:n,edges:r}}}}),{setData:E7}=w7.actions;(async()=>{const t=await fetch("test.json",{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}),e=await t.json();E7(e)})();const S7=function(t){const e=function(t){const{thunk:e=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=t??{};let o=new s7;return e&&("boolean"==typeof e?o.push(r7):o.push(i7(e.extraArgument))),o},{reducer:n,middleware:r,devTools:i=!0,preloadedState:o,enhancers:a}=t||{};let s,u;if("function"==typeof n)s=n;else{if(!t9(n))throw new Error(x7(1));s=n9(n)}u="function"==typeof r?r(e):e();let c=r9;i&&(c=o7({trace:!1,..."object"==typeof i&&i}));const l=function(...t){return e=>(n,r)=>{const i=e(n,r);let o=()=>{throw new Error(Z8(15))};const a={getState:i.getState,dispatch:(t,...e)=>o(t,...e)},s=t.map((t=>t(a)));return o=r9(...s)(i.dispatch),{...i,dispatch:o}}}(...u),f=d7(l);return e9(s,o,c(..."function"==typeof a?a(f):f()))}({reducer:{GData:w7.reducer}});tt.createRoot(document.getElementById("root")).render(J.jsx($8,{store:S7,children:J.jsx(j8,{})}));