
!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("child_process"),require("crypto")):"function"==typeof define&&define.amd?define(["child_process","crypto"],n):"object"==typeof exports?exports["electron-machine-id"]=n(require("child_process"),require("crypto")):t["electron-machine-id"]=n(t.child_process,t.crypto)}(this,function(t,n){return function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){t.exports=r(34)},function(t,n,r){var e=r(29)("wks"),o=r(33),i=r(2).Symbol,c="function"==typeof i,u=t.exports=function(t){return e[t]||(e[t]=c&&i[t]||(c?i:o)("Symbol."+t))};u.store=e},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(9);t.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},function(t,n,r){t.exports=!r(24)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n,r){var e=r(12),o=r(17);t.exports=r(4)?function(t,n,r){return e.f(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},function(t,n,r){var e=r(14);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){t.exports={}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(3),o=r(26),i=r(32),c=Object.defineProperty;n.f=r(4)?Object.defineProperty:function(t,n,r){if(e(t),n=i(n,!0),e(r),o)try{return c(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[n]=r.value),t}},function(t,n,r){var e=r(42),o=r(15);t.exports=function(t){return e(o(t))}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){var e=r(9),o=r(2).document,i=e(o)&&e(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(12).f,o=r(8),i=r(1)("toStringTag");t.exports=function(t,n,r){t&&!o(t=r?t:t.prototype,i)&&e(t,i,{configurable:!0,value:n})}},function(t,n,r){var e=r(29)("keys"),o=r(33);t.exports=function(t){return e[t]||(e[t]=o(t))}},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(11),o=r(1)("toStringTag"),i="Arguments"==e(function(){return arguments}()),c=function(t,n){try{return t[n]}catch(t){}};t.exports=function(t){var n,r,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=c(n=Object(t),o))?r:i?e(n):"Object"==(u=e(n))&&"function"==typeof n.callee?"Arguments":u}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,r){var e=r(2),o=r(6),i=r(7),c=r(5),u="prototype",s=function(t,n,r){var f,a,p,l=t&s.F,v=t&s.G,h=t&s.S,d=t&s.P,y=t&s.B,_=t&s.W,x=v?o:o[n]||(o[n]={}),m=x[u],w=v?e:h?e[n]:(e[n]||{})[u];v&&(r=n);for(f in r)a=!l&&w&&void 0!==w[f],a&&f in x||(p=a?w[f]:r[f],x[f]=v&&"function"!=typeof w[f]?r[f]:y&&a?i(p,e):_&&w[f]==p?function(t){var n=function(n,r,e){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,r)}return new t(n,r,e)}return t.apply(this,arguments)};return n[u]=t[u],n}(p):d&&"function"==typeof p?i(Function.call,p):p,d&&((x.virtual||(x.virtual={}))[f]=p,t&s.R&&m&&!m[f]&&c(m,f,p)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,r){t.exports=r(2).document&&document.documentElement},function(t,n,r){t.exports=!r(4)&&!r(24)(function(){return 7!=Object.defineProperty(r(16)("div"),"a",{get:function(){return 7}}).a})},function(t,n,r){"use strict";var e=r(28),o=r(23),i=r(57),c=r(5),u=r(8),s=r(10),f=r(45),a=r(18),p=r(52),l=r(1)("iterator"),v=!([].keys&&"next"in[].keys()),h="@@iterator",d="keys",y="values",_=function(){return this};t.exports=function(t,n,r,x,m,w,g){f(r,n,x);var b,O,j,S=function(t){if(!v&&t in T)return T[t];switch(t){case d:return function(){return new r(this,t)};case y:return function(){return new r(this,t)}}return function(){return new r(this,t)}},E=n+" Iterator",P=m==y,M=!1,T=t.prototype,A=T[l]||T[h]||m&&T[m],k=A||S(m),C=m?P?S("entries"):k:void 0,I="Array"==n?T.entries||A:A;if(I&&(j=p(I.call(new t)),j!==Object.prototype&&(a(j,E,!0),e||u(j,l)||c(j,l,_))),P&&A&&A.name!==y&&(M=!0,k=function(){return A.call(this)}),e&&!g||!v&&!M&&T[l]||c(T,l,k),s[n]=k,s[E]=_,m)if(b={values:P?k:S(y),keys:w?k:S(d),entries:C},g)for(O in b)O in T||i(T,O,b[O]);else o(o.P+o.F*(v||M),n,b);return b}},function(t,n){t.exports=!0},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e,o,i,c=r(7),u=r(41),s=r(25),f=r(16),a=r(2),p=a.process,l=a.setImmediate,v=a.clearImmediate,h=a.MessageChannel,d=0,y={},_="onreadystatechange",x=function(){var t=+this;if(y.hasOwnProperty(t)){var n=y[t];delete y[t],n()}},m=function(t){x.call(t.data)};l&&v||(l=function(t){for(var n=[],r=1;arguments.length>r;)n.push(arguments[r++]);return y[++d]=function(){u("function"==typeof t?t:Function(t),n)},e(d),d},v=function(t){delete y[t]},"process"==r(11)(p)?e=function(t){p.nextTick(c(x,t,1))}:h?(o=new h,i=o.port2,o.port1.onmessage=m,e=c(i.postMessage,i,1)):a.addEventListener&&"function"==typeof postMessage&&!a.importScripts?(e=function(t){a.postMessage(t+"","*")},a.addEventListener("message",m,!1)):e=_ in f("script")?function(t){s.appendChild(f("script"))[_]=function(){s.removeChild(this),x.call(t)}}:function(t){setTimeout(c(x,t,1),0)}),t.exports={set:l,clear:v}},function(t,n,r){var e=r(20),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){var e=r(9);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}function o(){return"win32"!==process.platform?"":"ia32"===process.arch&&process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")?"mixed":"native"}function i(t){return(0,l.createHmac)("sha256","s-x2}2n?/3@)K69*82H7kP37").update(t).digest("base64").replace('/','-').replace('=','_')}function c(t){switch(h){case"darwin":return t.split("IOPlatformUUID")[1].split("\n")[0].replace(/\=|\s+|\"/gi,"").toLowerCase();case"win32":return t.toString().split("REG_SZ")[1].replace(/\r+|\n+|\s+/gi,"").toLowerCase();case"linux":return t.toString().replace(/\r+|\n+|\s+/gi,"").toLowerCase();case"freebsd":return t.toString().replace(/\r+|\n+|\s+/gi,"").toLowerCase();default:throw new Error("Unsupported platform: "+process.platform)}}function u(t){var n=c((0,p.execSync)(y[h]).toString());return t?n:i(n)}function s(t){return new a.default(function(n,r){return(0,p.exec)(y[h],{},function(e,o,u){if(e)return r(new Error("Error while obtaining machine id: "+e.stack));var s=c(o.toString());return n(t?s:i(s))})})}Object.defineProperty(n,"__esModule",{value:!0});var f=r(35),a=e(f);n.machineIdSync=u,n.machineId=s;var p=r(70),l=r(71),v=process,h=v.platform,d={native:"%windir%\\System32",mixed:"%windir%\\sysnative\\cmd.exe /c %windir%\\System32"},y={darwin:"ioreg -rd1 -c IOPlatformExpertDevice",win32:d[o()]+"\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid",linux:"( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :",freebsd:"kenv -q smbios.system.uuid || sysctl -n kern.hostuuid"}},function(t,n,r){t.exports={default:r(36),__esModule:!0}},function(t,n,r){r(66),r(68),r(69),r(67),t.exports=r(6).Promise},function(t,n){t.exports=function(){}},function(t,n){t.exports=function(t,n,r,e){if(!(t instanceof n)||void 0!==e&&e in t)throw TypeError(r+": incorrect invocation!");return t}},function(t,n,r){var e=r(13),o=r(31),i=r(62);t.exports=function(t){return function(n,r,c){var u,s=e(n),f=o(s.length),a=i(c,f);if(t&&r!=r){for(;f>a;)if(u=s[a++],u!=u)return!0}else for(;f>a;a++)if((t||a in s)&&s[a]===r)return t||a||0;return!t&&-1}}},function(t,n,r){var e=r(7),o=r(44),i=r(43),c=r(3),u=r(31),s=r(64),f={},a={},n=t.exports=function(t,n,r,p,l){var v,h,d,y,_=l?function(){return t}:s(t),x=e(r,p,n?2:1),m=0;if("function"!=typeof _)throw TypeError(t+" is not iterable!");if(i(_)){for(v=u(t.length);v>m;m++)if(y=n?x(c(h=t[m])[0],h[1]):x(t[m]),y===f||y===a)return y}else for(d=_.call(t);!(h=d.next()).done;)if(y=o(d,x,h.value,n),y===f||y===a)return y};n.BREAK=f,n.RETURN=a},function(t,n){t.exports=function(t,n,r){var e=void 0===r;switch(n.length){case 0:return e?t():t.call(r);case 1:return e?t(n[0]):t.call(r,n[0]);case 2:return e?t(n[0],n[1]):t.call(r,n[0],n[1]);case 3:return e?t(n[0],n[1],n[2]):t.call(r,n[0],n[1],n[2]);case 4:return e?t(n[0],n[1],n[2],n[3]):t.call(r,n[0],n[1],n[2],n[3])}return t.apply(r,n)}},function(t,n,r){var e=r(11);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==e(t)?t.split(""):Object(t)}},function(t,n,r){var e=r(10),o=r(1)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(e.Array===t||i[o]===t)}},function(t,n,r){var e=r(3);t.exports=function(t,n,r,o){try{return o?n(e(r)[0],r[1]):n(r)}catch(n){var i=t.return;throw void 0!==i&&e(i.call(t)),n}}},function(t,n,r){"use strict";var e=r(49),o=r(17),i=r(18),c={};r(5)(c,r(1)("iterator"),function(){return this}),t.exports=function(t,n,r){t.prototype=e(c,{next:o(1,r)}),i(t,n+" Iterator")}},function(t,n,r){var e=r(1)("iterator"),o=!1;try{var i=[7][e]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,n){if(!n&&!o)return!1;var r=!1;try{var i=[7],c=i[e]();c.next=function(){return{done:r=!0}},i[e]=function(){return c},t(i)}catch(t){}return r}},function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},function(t,n,r){var e=r(2),o=r(30).set,i=e.MutationObserver||e.WebKitMutationObserver,c=e.process,u=e.Promise,s="process"==r(11)(c);t.exports=function(){var t,n,r,f=function(){var e,o;for(s&&(e=c.domain)&&e.exit();t;){o=t.fn,t=t.next;try{o()}catch(e){throw t?r():n=void 0,e}}n=void 0,e&&e.enter()};if(s)r=function(){c.nextTick(f)};else if(i){var a=!0,p=document.createTextNode("");new i(f).observe(p,{characterData:!0}),r=function(){p.data=a=!a}}else if(u&&u.resolve){var l=u.resolve();r=function(){l.then(f)}}else r=function(){o.call(e,f)};return function(e){var o={fn:e,next:void 0};n&&(n.next=o),t||(t=o,r()),n=o}}},function(t,n,r){var e=r(3),o=r(50),i=r(22),c=r(19)("IE_PROTO"),u=function(){},s="prototype",f=function(){var t,n=r(16)("iframe"),e=i.length,o=">";for(n.style.display="none",r(25).appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+o),t.close(),f=t.F;e--;)delete f[s][i[e]];return f()};t.exports=Object.create||function(t,n){var r;return null!==t?(u[s]=e(t),r=new u,u[s]=null,r[c]=t):r=f(),void 0===n?r:o(r,n)}},function(t,n,r){var e=r(12),o=r(3),i=r(54);t.exports=r(4)?Object.defineProperties:function(t,n){o(t);for(var r,c=i(n),u=c.length,s=0;u>s;)e.f(t,r=c[s++],n[r]);return t}},function(t,n,r){var e=r(55),o=r(17),i=r(13),c=r(32),u=r(8),s=r(26),f=Object.getOwnPropertyDescriptor;n.f=r(4)?f:function(t,n){if(t=i(t),n=c(n,!0),s)try{return f(t,n)}catch(t){}if(u(t,n))return o(!e.f.call(t,n),t[n])}},function(t,n,r){var e=r(8),o=r(63),i=r(19)("IE_PROTO"),c=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),e(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},function(t,n,r){var e=r(8),o=r(13),i=r(39)(!1),c=r(19)("IE_PROTO");t.exports=function(t,n){var r,u=o(t),s=0,f=[];for(r in u)r!=c&&e(u,r)&&f.push(r);for(;n.length>s;)e(u,r=n[s++])&&(~i(f,r)||f.push(r));return f}},function(t,n,r){var e=r(53),o=r(22);t.exports=Object.keys||function(t){return e(t,o)}},function(t,n){n.f={}.propertyIsEnumerable},function(t,n,r){var e=r(5);t.exports=function(t,n,r){for(var o in n)r&&t[o]?t[o]=n[o]:e(t,o,n[o]);return t}},function(t,n,r){t.exports=r(5)},function(t,n,r){var e=r(9),o=r(3),i=function(t,n){if(o(t),!e(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,e){try{e=r(7)(Function.call,r(51).f(Object.prototype,"__proto__").set,2),e(t,[]),n=!(t instanceof Array)}catch(t){n=!0}return function(t,r){return i(t,r),n?t.__proto__=r:e(t,r),t}}({},!1):void 0),check:i}},function(t,n,r){"use strict";var e=r(2),o=r(6),i=r(12),c=r(4),u=r(1)("species");t.exports=function(t){var n="function"==typeof o[t]?o[t]:e[t];c&&n&&!n[u]&&i.f(n,u,{configurable:!0,get:function(){return this}})}},function(t,n,r){var e=r(3),o=r(14),i=r(1)("species");t.exports=function(t,n){var r,c=e(t).constructor;return void 0===c||void 0==(r=e(c)[i])?n:o(r)}},function(t,n,r){var e=r(20),o=r(15);t.exports=function(t){return function(n,r){var i,c,u=String(o(n)),s=e(r),f=u.length;return s<0||s>=f?t?"":void 0:(i=u.charCodeAt(s),i<55296||i>56319||s+1===f||(c=u.charCodeAt(s+1))<56320||c>57343?t?u.charAt(s):i:t?u.slice(s,s+2):(i-55296<<10)+(c-56320)+65536)}}},function(t,n,r){var e=r(20),o=Math.max,i=Math.min;t.exports=function(t,n){return t=e(t),t<0?o(t+n,0):i(t,n)}},function(t,n,r){var e=r(15);t.exports=function(t){return Object(e(t))}},function(t,n,r){var e=r(21),o=r(1)("iterator"),i=r(10);t.exports=r(6).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[e(t)]}},function(t,n,r){"use strict";var e=r(37),o=r(47),i=r(10),c=r(13);t.exports=r(27)(Array,"Array",function(t,n){this._t=c(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,o(1)):"keys"==n?o(0,r):"values"==n?o(0,t[r]):o(0,[r,t[r]])},"values"),i.Arguments=i.Array,e("keys"),e("values"),e("entries")},function(t,n){},function(t,n,r){"use strict";var e,o,i,c=r(28),u=r(2),s=r(7),f=r(21),a=r(23),p=r(9),l=(r(3),r(14)),v=r(38),h=r(40),d=(r(58).set,r(60)),y=r(30).set,_=r(48)(),x="Promise",m=u.TypeError,w=u.process,g=u[x],w=u.process,b="process"==f(w),O=function(){},j=!!function(){try{var t=g.resolve(1),n=(t.constructor={})[r(1)("species")]=function(t){t(O,O)};return(b||"function"==typeof PromiseRejectionEvent)&&t.then(O)instanceof n}catch(t){}}(),S=function(t,n){return t===n||t===g&&n===i},E=function(t){var n;return!(!p(t)||"function"!=typeof(n=t.then))&&n},P=function(t){return S(g,t)?new M(t):new o(t)},M=o=function(t){var n,r;this.promise=new t(function(t,e){if(void 0!==n||void 0!==r)throw m("Bad Promise constructor");n=t,r=e}),this.resolve=l(n),this.reject=l(r)},T=function(t){try{t()}catch(t){return{error:t}}},A=function(t,n){if(!t._n){t._n=!0;var r=t._c;_(function(){for(var e=t._v,o=1==t._s,i=0,c=function(n){var r,i,c=o?n.ok:n.fail,u=n.resolve,s=n.reject,f=n.domain;try{c?(o||(2==t._h&&I(t),t._h=1),c===!0?r=e:(f&&f.enter(),r=c(e),f&&f.exit()),r===n.promise?s(m("Promise-chain cycle")):(i=E(r))?i.call(r,u,s):u(r)):s(e)}catch(t){s(t)}};r.length>i;)c(r[i++]);t._c=[],t._n=!1,n&&!t._h&&k(t)})}},k=function(t){y.call(u,function(){var n,r,e,o=t._v;if(C(t)&&(n=T(function(){b?w.emit("unhandledRejection",o,t):(r=u.onunhandledrejection)?r({promise:t,reason:o}):(e=u.console)&&e.error&&e.error("Unhandled promise rejection",o)}),t._h=b||C(t)?2:1),t._a=void 0,n)throw n.error})},C=function(t){if(1==t._h)return!1;for(var n,r=t._a||t._c,e=0;r.length>e;)if(n=r[e++],n.fail||!C(n.promise))return!1;return!0},I=function(t){y.call(u,function(){var n;b?w.emit("rejectionHandled",t):(n=u.onrejectionhandled)&&n({promise:t,reason:t._v})})},R=function(t){var n=this;n._d||(n._d=!0,n=n._w||n,n._v=t,n._s=2,n._a||(n._a=n._c.slice()),A(n,!0))},F=function(t){var n,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw m("Promise can't be resolved itself");(n=E(t))?_(function(){var e={_w:r,_d:!1};try{n.call(t,s(F,e,1),s(R,e,1))}catch(t){R.call(e,t)}}):(r._v=t,r._s=1,A(r,!1))}catch(t){R.call({_w:r,_d:!1},t)}}};j||(g=function(t){v(this,g,x,"_h"),l(t),e.call(this);try{t(s(F,this,1),s(R,this,1))}catch(t){R.call(this,t)}},e=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},e.prototype=r(56)(g.prototype,{then:function(t,n){var r=P(d(this,g));return r.ok="function"!=typeof t||t,r.fail="function"==typeof n&&n,r.domain=b?w.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&A(this,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),M=function(){var t=new e;this.promise=t,this.resolve=s(F,t,1),this.reject=s(R,t,1)}),a(a.G+a.W+a.F*!j,{Promise:g}),r(18)(g,x),r(59)(x),i=r(6)[x],a(a.S+a.F*!j,x,{reject:function(t){var n=P(this),r=n.reject;return r(t),n.promise}}),a(a.S+a.F*(c||!j),x,{resolve:function(t){if(t instanceof g&&S(t.constructor,this))return t;var n=P(this),r=n.resolve;return r(t),n.promise}}),a(a.S+a.F*!(j&&r(46)(function(t){g.all(t).catch(O)})),x,{all:function(t){var n=this,r=P(n),e=r.resolve,o=r.reject,i=T(function(){var r=[],i=0,c=1;h(t,!1,function(t){var u=i++,s=!1;r.push(void 0),c++,n.resolve(t).then(function(t){s||(s=!0,r[u]=t,--c||e(r))},o)}),--c||e(r)});return i&&o(i.error),r.promise},race:function(t){var n=this,r=P(n),e=r.reject,o=T(function(){h(t,!1,function(t){n.resolve(t).then(r.resolve,e)})});return o&&e(o.error),r.promise}})},function(t,n,r){"use strict";var e=r(61)(!0);r(27)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,r=this._i;return r>=n.length?{value:void 0,done:!0}:(t=e(n,r),this._i+=t.length,{value:t,done:!1})})},function(t,n,r){r(65);for(var e=r(2),o=r(5),i=r(10),c=r(1)("toStringTag"),u=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],s=0;s<5;s++){var f=u[s],a=e[f],p=a&&a.prototype;p&&!p[c]&&o(p,c,f),i[f]=i.Array}},function(t,n){t.exports=require("child_process")},function(t,n){t.exports=require("crypto")}])});