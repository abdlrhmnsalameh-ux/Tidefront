(()=>{var zg=Object.defineProperty;var kg=(s,t)=>{for(var e in t)zg(s,e,{get:t[e],enumerable:!0})};var On=Object.create(null);On.open="0";On.close="1";On.ping="2";On.pong="3";On.message="4";On.upgrade="5";On.noop="6";var Gr=Object.create(null);Object.keys(On).forEach(s=>{Gr[On[s]]=s});var Wr={type:"error",data:"parser error"};var Qd=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",tf=typeof ArrayBuffer=="function",ef=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s&&s.buffer instanceof ArrayBuffer,qr=({type:s,data:t},e,n)=>Qd&&t instanceof Blob?e?n(t):jd(t,n):tf&&(t instanceof ArrayBuffer||ef(t))?e?n(t):jd(new Blob([t]),n):n(On[s]+(t||"")),jd=(s,t)=>{let e=new FileReader;return e.onload=function(){let n=e.result.split(",")[1];t("b"+(n||""))},e.readAsDataURL(s)};function Jd(s){return s instanceof Uint8Array?s:s instanceof ArrayBuffer?new Uint8Array(s):new Uint8Array(s.buffer,s.byteOffset,s.byteLength)}var _h;function nf(s,t){if(Qd&&s.data instanceof Blob)return s.data.arrayBuffer().then(Jd).then(t);if(tf&&(s.data instanceof ArrayBuffer||ef(s.data)))return t(Jd(s.data));qr(s,!1,e=>{_h||(_h=new TextEncoder),t(_h.encode(e))})}var sf="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Xr=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let s=0;s<sf.length;s++)Xr[sf.charCodeAt(s)]=s;var rf=s=>{let t=s.length*.75,e=s.length,n,i=0,r,o,a,c;s[s.length-1]==="="&&(t--,s[s.length-2]==="="&&t--);let l=new ArrayBuffer(t),h=new Uint8Array(l);for(n=0;n<e;n+=4)r=Xr[s.charCodeAt(n)],o=Xr[s.charCodeAt(n+1)],a=Xr[s.charCodeAt(n+2)],c=Xr[s.charCodeAt(n+3)],h[i++]=r<<2|o>>4,h[i++]=(o&15)<<4|a>>2,h[i++]=(a&3)<<6|c&63;return l};var Vg=typeof ArrayBuffer=="function",Yr=(s,t)=>{if(typeof s!="string")return{type:"message",data:of(s,t)};let e=s.charAt(0);return e==="b"?{type:"message",data:Hg(s.substring(1),t)}:Gr[e]?s.length>1?{type:Gr[e],data:s.substring(1)}:{type:Gr[e]}:Wr},Hg=(s,t)=>{if(Vg){let e=rf(s);return of(e,t)}else return{base64:!0,data:s}},of=(s,t)=>{switch(t){case"blob":return s instanceof Blob?s:new Blob([s]);case"arraybuffer":default:return s instanceof ArrayBuffer?s:s.buffer}};var af="",cf=(s,t)=>{let e=s.length,n=new Array(e),i=0;s.forEach((r,o)=>{qr(r,!1,a=>{n[o]=a,++i===e&&t(n.join(af))})})},lf=(s,t)=>{let e=s.split(af),n=[];for(let i=0;i<e.length;i++){let r=Yr(e[i],t);if(n.push(r),r.type==="error")break}return n};function hf(){return new TransformStream({transform(s,t){nf(s,e=>{let n=e.length,i;if(n<126)i=new Uint8Array(1),new DataView(i.buffer).setUint8(0,n);else if(n<65536){i=new Uint8Array(3);let r=new DataView(i.buffer);r.setUint8(0,126),r.setUint16(1,n)}else{i=new Uint8Array(9);let r=new DataView(i.buffer);r.setUint8(0,127),r.setBigUint64(1,BigInt(n))}s.data&&typeof s.data!="string"&&(i[0]|=128),t.enqueue(i),t.enqueue(e)})}})}var bh;function Ca(s){return s.reduce((t,e)=>t+e.length,0)}function Ra(s,t){if(s[0].length===t)return s.shift();let e=new Uint8Array(t),n=0;for(let i=0;i<t;i++)e[i]=s[0][n++],n===s[0].length&&(s.shift(),n=0);return s.length&&n<s[0].length&&(s[0]=s[0].slice(n)),e}function uf(s,t){bh||(bh=new TextDecoder);let e=[],n=0,i=-1,r=!1;return new TransformStream({transform(o,a){for(e.push(o);;){if(n===0){if(Ca(e)<1)break;let c=Ra(e,1);r=(c[0]&128)===128,i=c[0]&127,i<126?n=3:i===126?n=1:n=2}else if(n===1){if(Ca(e)<2)break;let c=Ra(e,2);i=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),n=3}else if(n===2){if(Ca(e)<8)break;let c=Ra(e,8),l=new DataView(c.buffer,c.byteOffset,c.length),h=l.getUint32(0);if(h>Math.pow(2,21)-1){a.enqueue(Wr);break}i=h*Math.pow(2,32)+l.getUint32(4),n=3}else{if(Ca(e)<i)break;let c=Ra(e,i);a.enqueue(Yr(r?c:bh.decode(c),t)),n=0}if(i===0||i>s){a.enqueue(Wr);break}}}})}var wh=4;function be(s){if(s)return Gg(s)}function Gg(s){for(var t in be.prototype)s[t]=be.prototype[t];return s}be.prototype.on=be.prototype.addEventListener=function(s,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+s]=this._callbacks["$"+s]||[]).push(t),this};be.prototype.once=function(s,t){function e(){this.off(s,e),t.apply(this,arguments)}return e.fn=t,this.on(s,e),this};be.prototype.off=be.prototype.removeListener=be.prototype.removeAllListeners=be.prototype.removeEventListener=function(s,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var e=this._callbacks["$"+s];if(!e)return this;if(arguments.length==1)return delete this._callbacks["$"+s],this;for(var n,i=0;i<e.length;i++)if(n=e[i],n===t||n.fn===t){e.splice(i,1);break}return e.length===0&&delete this._callbacks["$"+s],this};be.prototype.emit=function(s){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),e=this._callbacks["$"+s],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(e){e=e.slice(0);for(var n=0,i=e.length;n<i;++n)e[n].apply(this,t)}return this};be.prototype.emitReserved=be.prototype.emit;be.prototype.listeners=function(s){return this._callbacks=this._callbacks||{},this._callbacks["$"+s]||[]};be.prototype.hasListeners=function(s){return!!this.listeners(s).length};var fi=typeof Promise=="function"&&typeof Promise.resolve=="function"?t=>Promise.resolve().then(t):(t,e)=>e(t,0),nn=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),df="arraybuffer";function Ia(s,...t){return t.reduce((e,n)=>(s.hasOwnProperty(n)&&(e[n]=s[n]),e),{})}var Wg=nn.setTimeout,qg=nn.clearTimeout;function pi(s,t){t.useNativeTimers?(s.setTimeoutFn=Wg.bind(nn),s.clearTimeoutFn=qg.bind(nn)):(s.setTimeoutFn=nn.setTimeout.bind(nn),s.clearTimeoutFn=nn.clearTimeout.bind(nn))}var Xg=1.33;function ff(s){return typeof s=="string"?Yg(s):Math.ceil((s.byteLength||s.size)*Xg)}function Yg(s){let t=0,e=0;for(let n=0,i=s.length;n<i;n++)t=s.charCodeAt(n),t<128?e+=1:t<2048?e+=2:t<55296||t>=57344?e+=3:(n++,e+=4);return e}function Pa(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function pf(s){let t="";for(let e in s)s.hasOwnProperty(e)&&(t.length&&(t+="&"),t+=encodeURIComponent(e)+"="+encodeURIComponent(s[e]));return t}function mf(s){let t={},e=s.split("&");for(let n=0,i=e.length;n<i;n++){let r=e[n].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r.slice(1).join("="))}return t}var La=class extends Error{constructor(t,e,n){super(t),this.description=e,this.context=n,this.type="TransportError"}},mi=class extends be{constructor(t){super(),this.writable=!1,pi(this,t),this.opts=t,this.query=t.query,this.socket=t.socket,this.supportsBinary=!t.forceBase64}onError(t,e,n){return super.emitReserved("error",new La(t,e,n)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(t){this.readyState==="open"&&this.write(t)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(t){let e=Yr(t,this.socket.binaryType);this.onPacket(e)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed",super.emitReserved("close",t)}pause(t){}createUri(t,e={}){return t+"://"+this._hostname()+this._port()+this.opts.path+this._query(e)}_hostname(){let t=this.opts.hostname;return t.indexOf(":")===-1?t:"["+t+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(t){let e=pf(t);return e.length?"?"+e:""}};var Zr=class extends mi{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(t){this.readyState="pausing";let e=()=>{this.readyState="paused",t()};if(this._polling||!this.writable){let n=0;this._polling&&(n++,this.once("pollComplete",function(){--n||e()})),this.writable||(n++,this.once("drain",function(){--n||e()}))}else e()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(t){let e=n=>{if(this.readyState==="opening"&&n.type==="open"&&this.onOpen(),n.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(n)};lf(t,this.socket.binaryType).forEach(e),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){let t=()=>{this.write([{type:"close"}])};this.readyState==="open"?t():this.once("open",t)}write(t){this.writable=!1,cf(t,e=>{this.doWrite(e,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){let t=this.opts.secure?"https":"http",e=this.query||{};return this.opts.timestampRequests!==!1&&(e[this.opts.timestampParam]=Pa()),!this.supportsBinary&&!e.sid&&(e.b64=1),this.createUri(t,e)}};var gf=!1;try{gf=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}var yf=gf;function Zg(){}var Mh=class extends Zr{constructor(t){if(super(t),typeof location<"u"){let e=location.protocol==="https:",n=location.port;n||(n=e?"443":"80"),this.xd=typeof location<"u"&&t.hostname!==location.hostname||n!==t.port}}doWrite(t,e){let n=this.request({method:"POST",data:t});n.on("success",e),n.on("error",(i,r)=>{this.onError("xhr post error",i,r)})}doPoll(){let t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(e,n)=>{this.onError("xhr poll error",e,n)}),this.pollXhr=t}},zi=class s extends be{constructor(t,e,n){super(),this.createRequest=t,pi(this,n),this._opts=n,this._method=n.method||"GET",this._uri=e,this._data=n.data!==void 0?n.data:null,this._create()}_create(){var t;let e=Ia(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this._opts.xd;let n=this._xhr=this.createRequest(e);try{n.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0);for(let i in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(i)&&n.setRequestHeader(i,this._opts.extraHeaders[i])}}catch{}if(this._method==="POST")try{n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{n.setRequestHeader("Accept","*/*")}catch{}(t=this._opts.cookieJar)===null||t===void 0||t.addCookies(n),"withCredentials"in n&&(n.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(n.timeout=this._opts.requestTimeout),n.onreadystatechange=()=>{var i;n.readyState===3&&((i=this._opts.cookieJar)===null||i===void 0||i.parseCookies(n.getResponseHeader("set-cookie"))),n.readyState===4&&(n.status===200||n.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof n.status=="number"?n.status:0)},0))},n.send(this._data)}catch(i){this.setTimeoutFn(()=>{this._onError(i)},0);return}typeof document<"u"&&(this._index=s.requestsCount++,s.requests[this._index]=this)}_onError(t){this.emitReserved("error",t,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=Zg,t)try{this._xhr.abort()}catch{}typeof document<"u"&&delete s.requests[this._index],this._xhr=null}}_onLoad(){let t=this._xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}};zi.requestsCount=0;zi.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",xf);else if(typeof addEventListener=="function"){let s="onpagehide"in nn?"pagehide":"unload";addEventListener(s,xf,!1)}}function xf(){for(let s in zi.requests)zi.requests.hasOwnProperty(s)&&zi.requests[s].abort()}var $g=(function(){let s=vf({xdomain:!1});return s&&s.responseType!==null})(),ki=class extends Mh{constructor(t){super(t);let e=t&&t.forceBase64;this.supportsBinary=$g&&!e}request(t={}){return Object.assign(t,{xd:this.xd},this.opts),new zi(vf,this.uri(),t)}};function vf(s){let t=s.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!t||yf))return new XMLHttpRequest}catch{}if(!t)try{return new nn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}var _f=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative",Eh=class extends mi{get name(){return"websocket"}doOpen(){let t=this.uri(),e=this.opts.protocols,n=_f?{}:Ia(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(t,e,n)}catch(i){return this.emitReserved("error",i)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t}),this.ws.onmessage=t=>this.onData(t.data),this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=!1;for(let e=0;e<t.length;e++){let n=t[e],i=e===t.length-1;qr(n,this.supportsBinary,r=>{try{this.doWrite(n,r)}catch{}i&&fi(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){let t=this.opts.secure?"wss":"ws",e=this.query||{};return this.opts.timestampRequests&&(e[this.opts.timestampParam]=Pa()),this.supportsBinary||(e.b64=1),this.createUri(t,e)}},Sh=nn.WebSocket||nn.MozWebSocket,Vi=class extends Eh{createSocket(t,e,n){return _f?new Sh(t,e,n):e?new Sh(t,e):new Sh(t)}doWrite(t,e){this.ws.send(e)}};var ks=class extends mi{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(t){return this.emitReserved("error",t)}this._transport.closed.then(()=>{this.onClose()}).catch(t=>{this.onError("webtransport error",t)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(t=>{let e=uf(Number.MAX_SAFE_INTEGER,this.socket.binaryType),n=t.readable.pipeThrough(e).getReader(),i=hf();i.readable.pipeTo(t.writable),this._writer=i.writable.getWriter();let r=()=>{n.read().then(({done:a,value:c})=>{a||(this.onPacket(c),r())}).catch(a=>{})};r();let o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this._writer.write(o).then(()=>this.onOpen())})})}write(t){this.writable=!1;for(let e=0;e<t.length;e++){let n=t[e],i=e===t.length-1;this._writer.write(n).then(()=>{i&&fi(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var t;(t=this._transport)===null||t===void 0||t.close()}};var Th={websocket:Vi,webtransport:ks,polling:ki};var Kg=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,jg=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Vs(s){if(s.length>8e3)throw"URI too long";let t=s,e=s.indexOf("["),n=s.indexOf("]");e!=-1&&n!=-1&&(s=s.substring(0,e)+s.substring(e,n).replace(/:/g,";")+s.substring(n,s.length));let i=Kg.exec(s||""),r={},o=14;for(;o--;)r[jg[o]]=i[o]||"";return e!=-1&&n!=-1&&(r.source=t,r.host=r.host.substring(1,r.host.length-1).replace(/;/g,":"),r.authority=r.authority.replace("[","").replace("]","").replace(/;/g,":"),r.ipv6uri=!0),r.pathNames=Jg(r,r.path),r.queryKey=Qg(r,r.query),r}function Jg(s,t){let e=/\/{2,9}/g,n=t.replace(e,"/").split("/");return(t.slice(0,1)=="/"||t.length===0)&&n.splice(0,1),t.slice(-1)=="/"&&n.splice(n.length-1,1),n}function Qg(s,t){let e={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(n,i,r){i&&(e[i]=r)}),e}var Ah=typeof addEventListener=="function"&&typeof removeEventListener=="function",Na=[];Ah&&addEventListener("offline",()=>{Na.forEach(s=>s())},!1);var us=class s extends be{constructor(t,e={}){var n,i;if(super(),this.binaryType=df,this.writeBuffer=[],this._prevBufferLen=0,this._upgrades=[],this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,t&&typeof t=="object"&&(e=t,t=null),t){let r=Vs(t);e.hostname=r.host,e.secure=r.protocol==="https"||r.protocol==="wss",e.port=r.port,r.query&&(e.query=r.query)}else e.host&&(e.hostname=Vs(e.host).host);if(pi(this,e),this.secure=e.secure!=null?e.secure:typeof location<"u"&&location.protocol==="https:",e.hostname&&!e.port&&(e.port=this.secure?"443":"80"),this.hostname=e.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=e.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),e.transportImplementations&&e.transports)throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");e.transportImplementations||!((n=e.transports)===null||n===void 0)&&n.length&&typeof e.transports[0]=="function"?(this.transports=[],this._transportsByName=Object.create(null),((i=e.transportImplementations)!==null&&i!==void 0?i:e.transports).forEach(r=>{let o=r.prototype.name;this.transports.push(o),this._transportsByName[o]=r})):(this.transports=e.transports?[...e.transports]:["polling","websocket","webtransport"],this._transportsByName=Th),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},e),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=mf(this.opts.query)),Ah&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Na.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(t){let e=Object.assign({},this.opts.query);e.EIO=wh,e.transport=t,this.id&&(e.sid=this.id);let n=Object.assign({},this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this._transportsByName[t](n)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}let t=this.opts.rememberUpgrade&&s.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";let e=this.createTransport(t);e.open(),this.setTransport(e)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",e=>this._onClose("transport close",e))}_probe(t){let e=this.createTransport(t),n=!1;s.priorWebsocketSuccess=!1;let i=()=>{n||(e.send([{type:"ping",data:"probe"}]),e.once("packet",d=>{if(!n)if(d.type==="pong"&&d.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",e),!e)return;s.priorWebsocketSuccess=e.name==="websocket",this.transport.pause(()=>{n||this.readyState!=="closed"&&(h(),this.setTransport(e),e.send([{type:"upgrade"}]),this.emitReserved("upgrade",e),e=null,this.upgrading=!1,this.flush())})}else{let u=new Error("probe error");u.transport=e.name,this.emitReserved("upgradeError",u)}}))};function r(){n||(n=!0,h(),e.close(),e=null)}let o=d=>{let u=new Error("probe error: "+d);u.transport=e.name,r(),this.emitReserved("upgradeError",u)};function a(){o("transport closed")}function c(){o("socket closed")}function l(d){e&&d.name!==e.name&&r()}let h=()=>{e.removeListener("open",i),e.removeListener("error",o),e.removeListener("close",a),this.off("close",c),this.off("upgrading",l)};e.once("open",i),e.once("error",o),e.once("close",a),this.once("close",c),this.once("upgrading",l),this._upgrades.indexOf("webtransport")!==-1&&t!=="webtransport"?this.setTimeoutFn(()=>{n||e.open()},200):e.open()}onOpen(){if(this.readyState="open",s.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade)for(let t=0;t<this._upgrades.length;t++)this._probe(this._upgrades[t])}_onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":let e=new Error("server error");e.code=t.data,this._onError(e);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this._upgrades=this._filterUpgrades(t.upgrades),this._pingInterval=t.pingInterval,this._pingTimeout=t.pingTimeout,this._maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);let t=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+t,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},t),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){let t=this._getWritablePackets();this.transport.send(t),this._prevBufferLen=t.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let e=1;for(let n=0;n<this.writeBuffer.length;n++){let i=this.writeBuffer[n].data;if(i&&(e+=ff(i)),n>0&&e>this._maxPayload)return this.writeBuffer.slice(0,n);e+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;let t=Date.now()>this._pingTimeoutTime;return t&&(this._pingTimeoutTime=0,fi(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),t}write(t,e,n){return this._sendPacket("message",t,e,n),this}send(t,e,n){return this._sendPacket("message",t,e,n),this}_sendPacket(t,e,n,i){if(typeof e=="function"&&(i=e,e=void 0),typeof n=="function"&&(i=n,n=null),this.readyState==="closing"||this.readyState==="closed")return;n=n||{},n.compress=n.compress!==!1;let r={type:t,data:e,options:n};this.emitReserved("packetCreate",r),this.writeBuffer.push(r),i&&this.once("flush",i),this.flush()}close(){let t=()=>{this._onClose("forced close"),this.transport.close()},e=()=>{this.off("upgrade",e),this.off("upgradeError",e),t()},n=()=>{this.once("upgrade",e),this.once("upgradeError",e)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?n():t()}):this.upgrading?n():t()),this}_onError(t){if(s.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",t),this._onClose("transport error",t)}_onClose(t,e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Ah&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){let n=Na.indexOf(this._offlineEventListener);n!==-1&&Na.splice(n,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,e),this.writeBuffer=[],this._prevBufferLen=0}}_filterUpgrades(t){let e=[];for(let n=0;n<t.length;n++)~this.transports.indexOf(t[n])&&e.push(t[n]);return e}};us.protocol=wh;var eE=us.protocol;function bf(s,t="",e){let n=s;e=e||typeof location<"u"&&location,s==null&&(s=e.protocol+"//"+e.host),typeof s=="string"&&(s.charAt(0)==="/"&&(s.charAt(1)==="/"?s=e.protocol+s:s=e.host+s),/^(https?|wss?):\/\//.test(s)||(typeof e<"u"?s=e.protocol+"//"+s:s="https://"+s),n=Vs(s)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";let r=n.host.indexOf(":")!==-1?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+r+":"+n.port+t,n.href=n.protocol+"://"+r+(e&&e.port===n.port?"":":"+n.port),n}var Lh={};kg(Lh,{Decoder:()=>Ih,Encoder:()=>Rh,PacketType:()=>$t,isPacketValid:()=>c0,protocol:()=>Tf});var e0=typeof ArrayBuffer=="function",n0=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s.buffer instanceof ArrayBuffer,wf=Object.prototype.toString,i0=typeof Blob=="function"||typeof Blob<"u"&&wf.call(Blob)==="[object BlobConstructor]",s0=typeof File=="function"||typeof File<"u"&&wf.call(File)==="[object FileConstructor]";function Kr(s){return e0&&(s instanceof ArrayBuffer||n0(s))||i0&&s instanceof Blob||s0&&s instanceof File}function $r(s,t){if(!s||typeof s!="object")return!1;if(Array.isArray(s)){for(let e=0,n=s.length;e<n;e++)if($r(s[e]))return!0;return!1}if(Kr(s))return!0;if(s.toJSON&&typeof s.toJSON=="function"&&arguments.length===1)return $r(s.toJSON(),!0);for(let e in s)if(Object.prototype.hasOwnProperty.call(s,e)&&$r(s[e]))return!0;return!1}function Mf(s){let t=[],e=s.data,n=s;return n.data=Da(e,t),n.attachments=t.length,{packet:n,buffers:t}}function Da(s,t,e){if(!s)return s;if(Kr(s)){let n={_placeholder:!0,num:t.length};return t.push(s),n}else if(Array.isArray(s)){let n=new Array(s.length);for(let i=0;i<s.length;i++)n[i]=Da(s[i],t);return n}else if(typeof s=="object"&&!(s instanceof Date)){if(s.toJSON&&typeof s.toJSON=="function"&&!e)return Da(s.toJSON(),t,!0);let n={};for(let i in s)Object.prototype.hasOwnProperty.call(s,i)&&(n[i]=Da(s[i],t));return n}return s}function Sf(s,t){return s.data=Ch(s.data,t),delete s.attachments,s}function Ch(s,t){if(!s)return s;if(s&&s._placeholder===!0){if(typeof s.num=="number"&&s.num>=0&&s.num<t.length)return t[s.num];throw new Error("illegal attachments")}else if(Array.isArray(s))for(let e=0;e<s.length;e++)s[e]=Ch(s[e],t);else if(typeof s=="object")for(let e in s)Object.prototype.hasOwnProperty.call(s,e)&&(s[e]=Ch(s[e],t));return s}var Ef=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],Tf=5,$t;(function(s){s[s.CONNECT=0]="CONNECT",s[s.DISCONNECT=1]="DISCONNECT",s[s.EVENT=2]="EVENT",s[s.ACK=3]="ACK",s[s.CONNECT_ERROR=4]="CONNECT_ERROR",s[s.BINARY_EVENT=5]="BINARY_EVENT",s[s.BINARY_ACK=6]="BINARY_ACK"})($t||($t={}));var Rh=class{constructor(t){this.replacer=t}encode(t){return(t.type===$t.EVENT||t.type===$t.ACK)&&$r(t)?this.encodeAsBinary({type:t.type===$t.EVENT?$t.BINARY_EVENT:$t.BINARY_ACK,nsp:t.nsp,data:t.data,id:t.id}):[this.encodeAsString(t)]}encodeAsString(t){let e=""+t.type;return(t.type===$t.BINARY_EVENT||t.type===$t.BINARY_ACK)&&(e+=t.attachments+"-"),t.nsp&&t.nsp!=="/"&&(e+=t.nsp+","),t.id!=null&&(e+=t.id),t.data!=null&&(e+=JSON.stringify(t.data,this.replacer)),e}encodeAsBinary(t){let e=Mf(t),n=this.encodeAsString(e.packet),i=e.buffers;return i.unshift(n),i}},Ih=class s extends be{constructor(t){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof t=="function"?{reviver:t}:t)}add(t){let e;if(typeof t=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");e=this.decodeString(t);let n=e.type===$t.BINARY_EVENT;n||e.type===$t.BINARY_ACK?(e.type=n?$t.EVENT:$t.ACK,this.reconstructor=new Ph(e)):super.emitReserved("decoded",e)}else if(Kr(t)||t.base64)if(this.reconstructor)e=this.reconstructor.takeBinaryData(t),e&&(this.reconstructor=null,super.emitReserved("decoded",e));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+t)}decodeString(t){let e=0,n={type:Number(t.charAt(0))};if($t[n.type]===void 0)throw new Error("unknown packet type "+n.type);if(n.type===$t.BINARY_EVENT||n.type===$t.BINARY_ACK){let r=e+1;for(;t.charAt(++e)!=="-"&&e!=t.length;);let o=t.substring(r,e);if(o!=Number(o)||t.charAt(e)!=="-")throw new Error("Illegal attachments");let a=Number(o);if(!Af(a)||a<1)throw new Error("Illegal attachments");if(a>this.opts.maxAttachments)throw new Error("too many attachments");n.attachments=a}if(t.charAt(e+1)==="/"){let r=e+1;for(;++e&&!(t.charAt(e)===","||e===t.length););n.nsp=t.substring(r,e)}else n.nsp="/";let i=t.charAt(e+1);if(i!==""&&Number(i)==i){let r=e+1;for(;++e;){let o=t.charAt(e);if(o==null||Number(o)!=o){--e;break}if(e===t.length)break}n.id=Number(t.substring(r,e+1))}if(t.charAt(++e)){let r=this.tryParse(t.substr(e));if(s.isPayloadValid(n.type,r))n.data=r;else throw new Error("invalid payload")}return n}tryParse(t){try{return JSON.parse(t,this.opts.reviver)}catch{return!1}}static isPayloadValid(t,e){switch(t){case $t.CONNECT:return Ba(e);case $t.DISCONNECT:return e===void 0;case $t.CONNECT_ERROR:return typeof e=="string"||Ba(e);case $t.EVENT:case $t.BINARY_EVENT:return Array.isArray(e)&&(typeof e[0]=="number"||typeof e[0]=="string"&&Ef.indexOf(e[0])===-1);case $t.ACK:case $t.BINARY_ACK:return Array.isArray(e)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}},Ph=class{constructor(t){this.packet=t,this.buffers=[],this.reconPack=t}takeBinaryData(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){let e=Sf(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}};function r0(s){return typeof s=="string"}var Af=Number.isInteger||function(s){return typeof s=="number"&&isFinite(s)&&Math.floor(s)===s};function o0(s){return s===void 0||Af(s)}function Ba(s){return Object.prototype.toString.call(s)==="[object Object]"}function a0(s,t){switch(s){case $t.CONNECT:return t===void 0||Ba(t);case $t.DISCONNECT:return t===void 0;case $t.EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&Ef.indexOf(t[0])===-1);case $t.ACK:return Array.isArray(t);case $t.CONNECT_ERROR:return typeof t=="string"||Ba(t);default:return!1}}function c0(s){return r0(s.nsp)&&o0(s.id)&&a0(s.type,s.data)}function gn(s,t,e){return s.on(t,e),function(){s.off(t,e)}}var l0=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),Hs=class extends be{constructor(t,e,n){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=t,this.nsp=e,n&&n.auth&&(this.auth=n.auth),this._opts=Object.assign({},n),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;let t=this.io;this.subs=[gn(t,"open",this.onopen.bind(this)),gn(t,"packet",this.onpacket.bind(this)),gn(t,"error",this.onerror.bind(this)),gn(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...t){return t.unshift("message"),this.emit.apply(this,t),this}emit(t,...e){var n,i,r;if(l0.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');if(e.unshift(t),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(e),this;let o={type:$t.EVENT,data:e};if(o.options={},o.options.compress=this.flags.compress!==!1,typeof e[e.length-1]=="function"){let h=this.ids++,d=e.pop();this._registerAckCallback(h,d),o.id=h}let a=(i=(n=this.io.engine)===null||n===void 0?void 0:n.transport)===null||i===void 0?void 0:i.writable,c=this.connected&&!(!((r=this.io.engine)===null||r===void 0)&&r._hasPingExpired());return this.flags.volatile&&!a||(c?(this.notifyOutgoingListeners(o),this.packet(o)):this.sendBuffer.push(o)),this.flags={},this}_registerAckCallback(t,e){var n;let i=(n=this.flags.timeout)!==null&&n!==void 0?n:this._opts.ackTimeout;if(i===void 0){this.acks[t]=e;return}let r=this.io.setTimeoutFn(()=>{delete this.acks[t];for(let a=0;a<this.sendBuffer.length;a++)this.sendBuffer[a].id===t&&this.sendBuffer.splice(a,1);e.call(this,new Error("operation has timed out"))},i),o=(...a)=>{this.io.clearTimeoutFn(r),e.apply(this,a)};o.withError=!0,this.acks[t]=o}emitWithAck(t,...e){return new Promise((n,i)=>{let r=(o,a)=>o?i(o):n(a);r.withError=!0,e.push(r),this.emit(t,...e)})}_addToQueue(t){let e;typeof t[t.length-1]=="function"&&(e=t.pop());let n={id:this._queueSeq++,tryCount:0,pending:!1,args:t,flags:Object.assign({fromQueue:!0},this.flags)};t.push((i,...r)=>n!==this._queue[0]?void 0:(i!==null?n.tryCount>this._opts.retries&&(this._queue.shift(),e&&e(i)):(this._queue.shift(),e&&e(null,...r)),n.pending=!1,this._drainQueue())),this._queue.push(n),this._drainQueue()}_drainQueue(t=!1){if(!this.connected||this._queue.length===0)return;let e=this._queue[0];e.pending&&!t||(e.pending=!0,e.tryCount++,this.flags=e.flags,this.emit.apply(this,e.args))}packet(t){t.nsp=this.nsp,this.io._packet(t)}onopen(){typeof this.auth=="function"?this.auth(t=>{this._sendConnectPacket(t)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(t){this.packet({type:$t.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},t):t})}onerror(t){this.connected||this.emitReserved("connect_error",t)}onclose(t,e){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,e),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(t=>{if(!this.sendBuffer.some(n=>String(n.id)===t)){let n=this.acks[t];delete this.acks[t],n.withError&&n.call(this,new Error("socket has been disconnected"))}})}onpacket(t){if(t.nsp===this.nsp)switch(t.type){case $t.CONNECT:t.data&&t.data.sid?this.onconnect(t.data.sid,t.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case $t.EVENT:case $t.BINARY_EVENT:this.onevent(t);break;case $t.ACK:case $t.BINARY_ACK:this.onack(t);break;case $t.DISCONNECT:this.ondisconnect();break;case $t.CONNECT_ERROR:this.destroy();let n=new Error(t.data.message);n.data=t.data.data,this.emitReserved("connect_error",n);break}}onevent(t){let e=t.data||[];t.id!=null&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){let e=this._anyListeners.slice();for(let n of e)n.apply(this,t)}super.emit.apply(this,t),this._pid&&t.length&&typeof t[t.length-1]=="string"&&(this._lastOffset=t[t.length-1])}ack(t){let e=this,n=!1;return function(...i){n||(n=!0,e.packet({type:$t.ACK,id:t,data:i}))}}onack(t){let e=this.acks[t.id];typeof e=="function"&&(delete this.acks[t.id],e.withError&&t.data.unshift(null),e.apply(this,t.data))}onconnect(t,e){this.id=t,this.recovered=e&&this._pid===e,this._pid=e,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this._drainQueue(!0)}emitBuffered(){this.receiveBuffer.forEach(t=>this.emitEvent(t)),this.receiveBuffer=[],this.sendBuffer.forEach(t=>{this.notifyOutgoingListeners(t),this.packet(t)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(t=>t()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:$t.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(t){return this.flags.compress=t,this}get volatile(){return this.flags.volatile=!0,this}timeout(t){return this.flags.timeout=t,this}onAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}prependAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}offAny(t){if(!this._anyListeners)return this;if(t){let e=this._anyListeners;for(let n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}prependAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}offAnyOutgoing(t){if(!this._anyOutgoingListeners)return this;if(t){let e=this._anyOutgoingListeners;for(let n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){let e=this._anyOutgoingListeners.slice();for(let n of e)n.apply(this,t.data)}}};function ds(s){s=s||{},this.ms=s.min||100,this.max=s.max||1e4,this.factor=s.factor||2,this.jitter=s.jitter>0&&s.jitter<=1?s.jitter:0,this.attempts=0}ds.prototype.duration=function(){var s=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),e=Math.floor(t*this.jitter*s);s=(Math.floor(t*10)&1)==0?s-e:s+e}return Math.min(s,this.max)|0};ds.prototype.reset=function(){this.attempts=0};ds.prototype.setMin=function(s){this.ms=s};ds.prototype.setMax=function(s){this.max=s};ds.prototype.setJitter=function(s){this.jitter=s};var Gs=class extends be{constructor(t,e){var n;super(),this.nsps={},this.subs=[],t&&typeof t=="object"&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.opts=e,pi(this,e),this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor((n=e.randomizationFactor)!==null&&n!==void 0?n:.5),this.backoff=new ds({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(e.timeout==null?2e4:e.timeout),this._readyState="closed",this.uri=t;let i=e.parser||Lh;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this._autoConnect=e.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(t){return arguments.length?(this._reconnection=!!t,t||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(t){return t===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}reconnectionDelay(t){var e;return t===void 0?this._reconnectionDelay:(this._reconnectionDelay=t,(e=this.backoff)===null||e===void 0||e.setMin(t),this)}randomizationFactor(t){var e;return t===void 0?this._randomizationFactor:(this._randomizationFactor=t,(e=this.backoff)===null||e===void 0||e.setJitter(t),this)}reconnectionDelayMax(t){var e;return t===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,(e=this.backoff)===null||e===void 0||e.setMax(t),this)}timeout(t){return arguments.length?(this._timeout=t,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new us(this.uri,this.opts);let e=this.engine,n=this;this._readyState="opening",this.skipReconnect=!1;let i=gn(e,"open",function(){n.onopen(),t&&t()}),r=a=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",a),t?t(a):this.maybeReconnectOnOpen()},o=gn(e,"error",r);if(this._timeout!==!1){let a=this._timeout,c=this.setTimeoutFn(()=>{i(),r(new Error("timeout")),e.close()},a);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(i),this.subs.push(o),this}connect(t){return this.open(t)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");let t=this.engine;this.subs.push(gn(t,"ping",this.onping.bind(this)),gn(t,"data",this.ondata.bind(this)),gn(t,"error",this.onerror.bind(this)),gn(t,"close",this.onclose.bind(this)),gn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){try{this.decoder.add(t)}catch(e){this.onclose("parse error",e)}}ondecoded(t){fi(()=>{this.emitReserved("packet",t)},this.setTimeoutFn)}onerror(t){this.emitReserved("error",t)}socket(t,e){let n=this.nsps[t];return n?this._autoConnect&&!n.active&&n.connect():(n=new Hs(this,t,e),this.nsps[t]=n),n}_destroy(t){let e=Object.keys(this.nsps);for(let n of e)if(this.nsps[n].active)return;this._close()}_packet(t){let e=this.encoder.encode(t);for(let n=0;n<e.length;n++)this.engine.write(e[n],t.options)}cleanup(){this.subs.forEach(t=>t()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(t,e){var n;this.cleanup(),(n=this.engine)===null||n===void 0||n.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,e),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;let t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{let e=this.backoff.duration();this._reconnecting=!0;let n=this.setTimeoutFn(()=>{t.skipReconnect||(this.emitReserved("reconnect_attempt",t.backoff.attempts),!t.skipReconnect&&t.open(i=>{i?(t._reconnecting=!1,t.reconnect(),this.emitReserved("reconnect_error",i)):t.onreconnect()}))},e);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}}onreconnect(){let t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}};var jr={};function Jr(s,t){typeof s=="object"&&(t=s,s=void 0),t=t||{};let e=bf(s,t.path||"/socket.io"),n=e.source,i=e.id,r=e.path,o=jr[i]&&r in jr[i].nsps,a=t.forceNew||t["force new connection"]||t.multiplex===!1||o,c;return a?c=new Gs(n,t):(jr[i]||(jr[i]=new Gs(n,t)),c=jr[i]),e.query&&!t.query&&(t.query=e.queryKey),c.socket(e.path,t)}Object.assign(Jr,{Manager:Gs,Socket:Hs,io:Jr,connect:Jr});var Gi=class s{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){let t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){let t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){let e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new S);let e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new S);let n=this.elements,i=t.x,r=t.y,o=t.z;return e.x=n[0]*i+n[1]*r+n[2]*o,e.y=n[3]*i+n[4]*r+n[5]*o,e.z=n[6]*i+n[7]*r+n[8]*o,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new s);let n=this.elements,i=t.elements,r=e.elements,o=n[0],a=n[1],c=n[2],l=n[3],h=n[4],d=n[5],u=n[6],f=n[7],g=n[8],y=i[0],m=i[1],p=i[2],v=i[3],_=i[4],x=i[5],M=i[6],E=i[7],C=i[8];return r[0]=o*y+a*v+c*M,r[1]=o*m+a*_+c*E,r[2]=o*p+a*x+c*C,r[3]=l*y+h*v+d*M,r[4]=l*m+h*_+d*E,r[5]=l*p+h*x+d*C,r[6]=u*y+f*v+g*M,r[7]=u*m+f*_+g*E,r[8]=u*p+f*x+g*C,e}scale(t,e){e===void 0&&(e=new s);let n=this.elements,i=e.elements;for(let r=0;r!==3;r++)i[3*r+0]=t.x*n[3*r+0],i[3*r+1]=t.y*n[3*r+1],i[3*r+2]=t.z*n[3*r+2];return e}solve(t,e){e===void 0&&(e=new S);let n=3,i=4,r=[],o,a;for(o=0;o<n*i;o++)r.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)r[o+i*a]=this.elements[o+3*a];r[3]=t.x,r[7]=t.y,r[11]=t.z;let c=3,l=c,h,d=4,u;do{if(o=l-c,r[o+i*o]===0){for(a=o+1;a<l;a++)if(r[o+i*a]!==0){h=d;do u=d-h,r[u+i*o]+=r[u+i*a];while(--h);break}}if(r[o+i*o]!==0)for(a=o+1;a<l;a++){let f=r[o+i*a]/r[o+i*o];h=d;do u=d-h,r[u+i*a]=u<=o?0:r[u+i*a]-r[u+i*o]*f;while(--h)}}while(--c);if(e.z=r[2*i+3]/r[2*i+2],e.y=(r[1*i+3]-r[1*i+2]*e.z)/r[1*i+1],e.x=(r[0*i+3]-r[0*i+2]*e.z-r[0*i+1]*e.y)/r[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";for(let n=0;n<9;n++)t+=this.elements[n]+",";return t}reverse(t){t===void 0&&(t=new s);let e=3,n=6,i=h0,r,o;for(r=0;r<3;r++)for(o=0;o<3;o++)i[r+n*o]=this.elements[r+3*o];i[3]=1,i[9]=0,i[15]=0,i[4]=0,i[10]=1,i[16]=0,i[5]=0,i[11]=0,i[17]=1;let a=3,c=a,l,h=n,d;do{if(r=c-a,i[r+n*r]===0){for(o=r+1;o<c;o++)if(i[r+n*o]!==0){l=h;do d=h-l,i[d+n*r]+=i[d+n*o];while(--l);break}}if(i[r+n*r]!==0)for(o=r+1;o<c;o++){let u=i[r+n*o]/i[r+n*r];l=h;do d=h-l,i[d+n*o]=d<=r?0:i[d+n*o]-i[d+n*r]*u;while(--l)}}while(--a);r=2;do{o=r-1;do{let u=i[r+n*o]/i[r+n*r];l=n;do d=n-l,i[d+n*o]=i[d+n*o]-i[d+n*r]*u;while(--l)}while(o--)}while(--r);r=2;do{let u=1/i[r+n*r];l=n;do d=n-l,i[d+n*r]=i[d+n*r]*u;while(--l)}while(r--);r=2;do{o=2;do{if(d=i[e+o+n*r],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(r,o,d)}while(o--)}while(r--);return t}setRotationFromQuaternion(t){let e=t.x,n=t.y,i=t.z,r=t.w,o=e+e,a=n+n,c=i+i,l=e*o,h=e*a,d=e*c,u=n*a,f=n*c,g=i*c,y=r*o,m=r*a,p=r*c,v=this.elements;return v[0]=1-(u+g),v[1]=h-p,v[2]=d+m,v[3]=h+p,v[4]=1-(l+g),v[5]=f-y,v[6]=d-m,v[7]=f+y,v[8]=1-(l+u),this}transpose(t){t===void 0&&(t=new s);let e=this.elements,n=t.elements,i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}},h0=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],S=class s{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new s);let n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,c=this.z;return e.x=a*r-c*i,e.y=c*n-o*r,e.z=o*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new s(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new s(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new Gi([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){let t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){let r=1/i;this.x*=r,this.y*=r,this.z*=r}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new s);let e=this.x,n=this.y,i=this.z,r=Math.sqrt(e*e+n*n+i*i);return r>0?(r=1/r,t.x=e*r,t.y=n*r,t.z=i*r):(t.x=1,t.y=0,t.z=0),t}length(){let t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return Math.sqrt((r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i))}distanceSquared(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return(r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new s);let n=this.x,i=this.y,r=this.z;return e.x=t*n,e.y=t*i,e.z=t*r,e}vmul(t,e){return e===void 0&&(e=new s),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new s),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new s),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){let n=this.length();if(n>0){let i=u0,r=1/n;i.set(this.x*r,this.y*r,this.z*r);let o=d0;Math.abs(i.x)<.9?(o.set(1,0,0),i.cross(o,t)):(o.set(0,1,0),i.cross(o,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){let i=this.x,r=this.y,o=this.z;n.x=i+(t.x-i)*e,n.y=r+(t.y-r)*e,n.z=o+(t.z-o)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(Cf),Cf.almostEquals(t,e)}clone(){return new s(this.x,this.y,this.z)}};S.ZERO=new S(0,0,0);S.UNIT_X=new S(1,0,0);S.UNIT_Y=new S(0,1,0);S.UNIT_Z=new S(0,0,1);var u0=new S,d0=new S,Cf=new S,yn=class s{constructor(t){t===void 0&&(t={}),this.lowerBound=new S,this.upperBound=new S,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){let r=this.lowerBound,o=this.upperBound,a=n;r.copy(t[0]),a&&a.vmult(r,r),o.copy(r);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,Rf),l=Rf),l.x>o.x&&(o.x=l.x),l.x<r.x&&(r.x=l.x),l.y>o.y&&(o.y=l.y),l.y<r.y&&(r.y=l.y),l.z>o.z&&(o.z=l.z),l.z<r.z&&(r.z=l.z)}return e&&(e.vadd(r,r),e.vadd(o,o)),i&&(r.x-=i,r.y-=i,r.z-=i,o.x+=i,o.y+=i,o.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new s().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){let e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound,o=i.x<=n.x&&n.x<=r.x||e.x<=r.x&&r.x<=n.x,a=i.y<=n.y&&n.y<=r.y||e.y<=r.y&&r.y<=n.y,c=i.z<=n.z&&n.z<=r.z||e.z<=r.z&&r.z<=n.z;return o&&a&&c}volume(){let t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){let e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound;return e.x<=i.x&&n.x>=r.x&&e.y<=i.y&&n.y>=r.y&&e.z<=i.z&&n.z>=r.z}getCorners(t,e,n,i,r,o,a,c){let l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),n.set(h.x,h.y,l.z),i.set(l.x,h.y,h.z),r.set(h.x,l.y,h.z),o.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){let n=If,i=n[0],r=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,r,o,a,c,l,h,d);for(let u=0;u!==8;u++){let f=n[u];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){let n=If,i=n[0],r=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,r,o,a,c,l,h,d);for(let u=0;u!==8;u++){let f=n[u];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){let{direction:e,from:n}=t,i=1/e.x,r=1/e.y,o=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*r,h=(this.upperBound.y-n.y)*r,d=(this.lowerBound.z-n.z)*o,u=(this.upperBound.z-n.z)*o,f=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(d,u)),g=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(d,u));return!(g<0||f>g)}},Rf=new S,If=[new S,new S,new S,new S,new S,new S,new S,new S],Va=class{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){let r=i;i=n,n=r}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:r}=e;if(r>i){let o=r;r=i,i=o}this.matrix[(i*(i+1)>>1)+r-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}},Ha=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;let n=this._listeners;if(n[t]===void 0)return this;let i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;let n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,r=n.length;i<r;i++)n[i].call(this,t)}return this}},sn=class s{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){let n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new S),this.normalize();let e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){let n=f0,i=p0;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{let n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new s);let n=this.x,i=this.y,r=this.z,o=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=n*h+o*a+i*l-r*c,e.y=i*h+o*c+r*a-n*l,e.z=r*h+o*l+n*c-i*a,e.w=o*h-n*a-i*c-r*l,e}inverse(t){t===void 0&&(t=new s);let e=this.x,n=this.y,i=this.z,r=this.w;this.conjugate(t);let o=1/(e*e+n*n+i*i+r*r);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new s),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){let t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new S);let n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,c=this.z,l=this.w,h=l*n+a*r-c*i,d=l*i+c*n-o*r,u=l*r+o*i-a*n,f=-o*n-a*i-c*r;return e.x=h*l+f*-o+d*-c-u*-a,e.y=d*l+f*-a+u*-o-h*-c,e.z=u*l+f*-c+h*-a-d*-o,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,r,o=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":let h=o*a+c*l;if(h>.499&&(n=2*Math.atan2(o,l),i=Math.PI/2,r=0),h<-.499&&(n=-2*Math.atan2(o,l),i=-Math.PI/2,r=0),n===void 0){let d=o*o,u=a*a,f=c*c;n=Math.atan2(2*a*l-2*o*c,1-2*u-2*f),i=Math.asin(2*h),r=Math.atan2(2*o*l-2*a*c,1-2*d-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=r}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");let r=Math.cos(t/2),o=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=c*o*a+r*l*h,this.y=r*l*a-c*o*h,this.z=r*o*h+c*l*a,this.w=r*o*a-c*l*h):i==="YXZ"?(this.x=c*o*a+r*l*h,this.y=r*l*a-c*o*h,this.z=r*o*h-c*l*a,this.w=r*o*a+c*l*h):i==="ZXY"?(this.x=c*o*a-r*l*h,this.y=r*l*a+c*o*h,this.z=r*o*h+c*l*a,this.w=r*o*a-c*l*h):i==="ZYX"?(this.x=c*o*a-r*l*h,this.y=r*l*a+c*o*h,this.z=r*o*h-c*l*a,this.w=r*o*a+c*l*h):i==="YZX"?(this.x=c*o*a+r*l*h,this.y=r*l*a+c*o*h,this.z=r*o*h-c*l*a,this.w=r*o*a-c*l*h):i==="XZY"&&(this.x=c*o*a-r*l*h,this.y=r*l*a-c*o*h,this.z=r*o*h+c*l*a,this.w=r*o*a+c*l*h),this}clone(){return new s(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new s);let i=this.x,r=this.y,o=this.z,a=this.w,c=t.x,l=t.y,h=t.z,d=t.w,u,f,g,y,m;return f=i*c+r*l+o*h+a*d,f<0&&(f=-f,c=-c,l=-l,h=-h,d=-d),1-f>1e-6?(u=Math.acos(f),g=Math.sin(u),y=Math.sin((1-e)*u)/g,m=Math.sin(e*u)/g):(y=1-e,m=e),n.x=y*i+m*c,n.y=y*r+m*l,n.z=y*o+m*h,n.w=y*a+m*d,n}integrate(t,e,n,i){i===void 0&&(i=new s);let r=t.x*n.x,o=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,h=this.z,d=this.w,u=e*.5;return i.x+=u*(r*d+o*h-a*l),i.y+=u*(o*d+a*c-r*h),i.z+=u*(a*d+r*l-o*c),i.w+=u*(-r*c-o*l-a*h),i}},f0=new S,p0=new S,m0={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256},Tt=class s{constructor(t){t===void 0&&(t={}),this.id=s.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}};Tt.idCounter=0;Tt.types=m0;var ue=class s{constructor(t){t===void 0&&(t={}),this.position=new S,this.quaternion=new sn,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return s.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return s.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new S),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new S),n.vsub(t,i),e.conjugate(Pf),Pf.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new S),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new S),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new S),e.w*=-1,e.vmult(n,i),e.w*=-1,i}},Pf=new sn,zh=class s extends Tt{constructor(t){t===void 0&&(t={});let{vertices:e=[],faces:n=[],normals:i=[],axes:r,boundingSphereRadius:o}=t;super({type:Tt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=r?r.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){let t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;let i=new S;for(let r=0;r!==t.length;r++){let o=t[r],a=o.length;for(let c=0;c!==a;c++){let l=(c+1)%a;e[o[c]].vsub(e[o[l]],i),i.normalize();let h=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);let e=this.faceNormals[t]||new S;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;let n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){let n=this.faces[t],i=this.vertices[n[0]],r=this.vertices[n[1]],o=this.vertices[n[2]];s.computeNormal(i,r,o,e)}static computeNormal(t,e,n,i){let r=new S,o=new S;e.vsub(t,o),n.vsub(e,r),r.cross(o,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,r,o,a,c,l){let h=new S,d=-1,u=-Number.MAX_VALUE;for(let g=0;g<n.faces.length;g++){h.copy(n.faceNormals[g]),r.vmult(h,h);let y=h.dot(o);y>u&&(u=y,d=g)}let f=[];for(let g=0;g<n.faces[d].length;g++){let y=n.vertices[n.faces[d][g]],m=new S;m.copy(y),r.vmult(m,m),i.vadd(m,m),f.push(m)}d>=0&&this.clipFaceAgainstHull(o,t,e,f,a,c,l)}findSeparatingAxis(t,e,n,i,r,o,a,c){let l=new S,h=new S,d=new S,u=new S,f=new S,g=new S,y=Number.MAX_VALUE,m=this;if(m.uniqueAxes)for(let p=0;p!==m.uniqueAxes.length;p++){n.vmult(m.uniqueAxes[p],l);let v=m.testSepAxis(l,t,e,n,i,r);if(v===!1)return!1;v<y&&(y=v,o.copy(l))}else{let p=a?a.length:m.faces.length;for(let v=0;v<p;v++){let _=a?a[v]:v;l.copy(m.faceNormals[_]),n.vmult(l,l);let x=m.testSepAxis(l,t,e,n,i,r);if(x===!1)return!1;x<y&&(y=x,o.copy(l))}}if(t.uniqueAxes)for(let p=0;p!==t.uniqueAxes.length;p++){r.vmult(t.uniqueAxes[p],h);let v=m.testSepAxis(h,t,e,n,i,r);if(v===!1)return!1;v<y&&(y=v,o.copy(h))}else{let p=c?c.length:t.faces.length;for(let v=0;v<p;v++){let _=c?c[v]:v;h.copy(t.faceNormals[_]),r.vmult(h,h);let x=m.testSepAxis(h,t,e,n,i,r);if(x===!1)return!1;x<y&&(y=x,o.copy(h))}}for(let p=0;p!==m.uniqueEdges.length;p++){n.vmult(m.uniqueEdges[p],u);for(let v=0;v!==t.uniqueEdges.length;v++)if(r.vmult(t.uniqueEdges[v],f),u.cross(f,g),!g.almostZero()){g.normalize();let _=m.testSepAxis(g,t,e,n,i,r);if(_===!1)return!1;_<y&&(y=_,o.copy(g))}}return i.vsub(e,d),d.dot(o)>0&&o.negate(o),!0}testSepAxis(t,e,n,i,r,o){let a=this;s.project(a,t,n,i,Nh),s.project(e,t,r,o,Dh);let c=Nh[0],l=Nh[1],h=Dh[0],d=Dh[1];if(c<d||h<l)return!1;let u=c-d,f=h-l;return u<f?u:f}calculateLocalInertia(t,e){let n=new S,i=new S;this.computeLocalAABB(i,n);let r=n.x-i.x,o=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*o*2*o+2*a*2*a),e.y=1/12*t*(2*r*2*r+2*a*2*a),e.z=1/12*t*(2*o*2*o+2*r*2*r)}getPlaneConstantOfFace(t){let e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,r,o,a){let c=new S,l=new S,h=new S,d=new S,u=new S,f=new S,g=new S,y=new S,m=this,p=[],v=i,_=p,x=-1,M=Number.MAX_VALUE;for(let b=0;b<m.faces.length;b++){c.copy(m.faceNormals[b]),n.vmult(c,c);let R=c.dot(t);R<M&&(M=R,x=b)}if(x<0)return;let E=m.faces[x];E.connectedFaces=[];for(let b=0;b<m.faces.length;b++)for(let R=0;R<m.faces[b].length;R++)E.indexOf(m.faces[b][R])!==-1&&b!==x&&E.connectedFaces.indexOf(b)===-1&&E.connectedFaces.push(b);let C=E.length;for(let b=0;b<C;b++){let R=m.vertices[E[b]],k=m.vertices[E[(b+1)%C]];R.vsub(k,l),h.copy(l),n.vmult(h,h),e.vadd(h,h),d.copy(this.faceNormals[x]),n.vmult(d,d),e.vadd(d,d),h.cross(d,u),u.negate(u),f.copy(R),n.vmult(f,f),e.vadd(f,f);let L=E.connectedFaces[b];g.copy(this.faceNormals[L]);let B=this.getPlaneConstantOfFace(L);y.copy(g),n.vmult(y,y);let O=B-y.dot(e);for(this.clipFaceAgainstPlane(v,_,y,O);v.length;)v.shift();for(;_.length;)v.push(_.shift())}g.copy(this.faceNormals[x]);let P=this.getPlaneConstantOfFace(x);y.copy(g),n.vmult(y,y);let T=P-y.dot(e);for(let b=0;b<v.length;b++){let R=y.dot(v[b])+T;if(R<=r&&(console.log(`clamped: depth=${R} to minDist=${r}`),R=r),R<=o){let k=v[b];if(R<=1e-6){let L={point:k,normal:y,depth:R};a.push(L)}}}}clipFaceAgainstPlane(t,e,n,i){let r,o,a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];r=n.dot(c)+i;for(let h=0;h<a;h++){if(l=t[h],o=n.dot(l)+i,r<0)if(o<0){let d=new S;d.copy(l),e.push(d)}else{let d=new S;c.lerp(l,r/(r-o),d),e.push(d)}else if(o<0){let d=new S;c.lerp(l,r/(r-o),d),e.push(d),e.push(l)}c=l,r=o}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new S);let n=this.vertices,i=this.worldVertices;for(let r=0;r!==this.vertices.length;r++)e.vmult(n[r],i[r]),t.vadd(i[r],i[r]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){let n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){let r=n[i];r.x<t.x?t.x=r.x:r.x>e.x&&(e.x=r.x),r.y<t.y?t.y=r.y:r.y>e.y&&(e.y=r.y),r.z<t.z?t.z=r.z:r.z>e.z&&(e.z=r.z)}}computeWorldFaceNormals(t){let e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new S);let n=this.faceNormals,i=this.worldFaceNormals;for(let r=0;r!==e;r++)t.vmult(n[r],i[r]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0,e=this.vertices;for(let n=0;n!==e.length;n++){let i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){let r=this.vertices,o,a,c,l,h,d,u=new S;for(let f=0;f<r.length;f++){u.copy(r[f]),e.vmult(u,u),t.vadd(u,u);let g=u;(o===void 0||g.x<o)&&(o=g.x),(l===void 0||g.x>l)&&(l=g.x),(a===void 0||g.y<a)&&(a=g.y),(h===void 0||g.y>h)&&(h=g.y),(c===void 0||g.z<c)&&(c=g.z),(d===void 0||g.z>d)&&(d=g.z)}n.set(o,a,c),i.set(l,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new S);let e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){let n=this.vertices.length,i=this.vertices;if(e){for(let r=0;r<n;r++){let o=i[r];e.vmult(o,o)}for(let r=0;r<this.faceNormals.length;r++){let o=this.faceNormals[r];e.vmult(o,o)}}if(t)for(let r=0;r<n;r++){let o=i[r];o.vadd(t,o)}}pointIsInside(t){let e=this.vertices,n=this.faces,i=this.faceNormals,r=null,o=new S;this.getAveragePointLocal(o);for(let a=0;a<this.faces.length;a++){let c=i[a],l=e[n[a][0]],h=new S;t.vsub(l,h);let d=c.dot(h),u=new S;o.vsub(l,u);let f=c.dot(u);if(d<0&&f>0||d>0&&f<0)return!1}return r?1:-1}static project(t,e,n,i,r){let o=t.vertices.length,a=y0,c=0,l=0,h=x0,d=t.vertices;h.setZero(),ue.vectorToLocalFrame(n,i,e,a),ue.pointToLocalFrame(n,i,h,h);let u=h.dot(a);l=c=d[0].dot(a);for(let f=1;f<o;f++){let g=d[f].dot(a);g>c&&(c=g),g<l&&(l=g)}if(l-=u,c-=u,l>c){let f=l;l=c,c=f}r[0]=c,r[1]=l}},Nh=[],Dh=[],g0=new S,y0=new S,x0=new S,ms=class s extends Tt{constructor(t){super({type:Tt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){let t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=S,r=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new zh({vertices:r,faces:o,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new S),s.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){let i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){let n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let r=0;r!==n.length;r++)e.vmult(n[r],n[r]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){let i=this.halfExtents,r=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let o=0;o<r.length;o++)Hi.set(r[o][0],r[o][1],r[o][2]),e.vmult(Hi,Hi),t.vadd(Hi,Hi),n(Hi.x,Hi.y,Hi.z)}calculateWorldAABB(t,e,n,i){let r=this.halfExtents;jn[0].set(r.x,r.y,r.z),jn[1].set(-r.x,r.y,r.z),jn[2].set(-r.x,-r.y,r.z),jn[3].set(-r.x,-r.y,-r.z),jn[4].set(r.x,-r.y,-r.z),jn[5].set(r.x,r.y,-r.z),jn[6].set(-r.x,r.y,-r.z),jn[7].set(r.x,-r.y,r.z);let o=jn[0];e.vmult(o,o),t.vadd(o,o),i.copy(o),n.copy(o);for(let a=1;a<8;a++){let c=jn[a];e.vmult(c,c),t.vadd(c,c);let l=c.x,h=c.y,d=c.z;l>i.x&&(i.x=l),h>i.y&&(i.y=h),d>i.z&&(i.z=d),l<n.x&&(n.x=l),h<n.y&&(n.y=h),d<n.z&&(n.z=d)}}},Hi=new S,jn=[new S,new S,new S,new S,new S,new S,new S,new S],$h={DYNAMIC:1,STATIC:2,KINEMATIC:4},Kh={AWAKE:0,SLEEPY:1,SLEEPING:2},te=class s extends Ha{constructor(t){t===void 0&&(t={}),super(),this.id=s.idCounter++,this.index=-1,this.world=null,this.vlambda=new S,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new S,this.previousPosition=new S,this.interpolatedPosition=new S,this.initPosition=new S,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new S,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new S,this.force=new S;let e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?s.STATIC:s.DYNAMIC,typeof t.type==typeof s.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=s.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new S,this.quaternion=new sn,this.initQuaternion=new sn,this.previousQuaternion=new sn,this.interpolatedQuaternion=new sn,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new S,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new S,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new S,this.invInertia=new S,this.invInertiaWorld=new Gi,this.invMassSolve=0,this.invInertiaSolve=new S,this.invInertiaWorldSolve=new Gi,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new S(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new S(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new yn,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new S,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){let t=this.sleepState;this.sleepState=s.AWAKE,this.wakeUpAfterNarrowphase=!1,t===s.SLEEPING&&this.dispatchEvent(s.wakeupEvent)}sleep(){this.sleepState=s.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){let e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===s.AWAKE&&n<i?(this.sleepState=s.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(s.sleepyEvent)):e===s.SLEEPY&&n>i?this.wakeUp():e===s.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(s.sleepEvent))}}updateSolveMassProperties(){this.sleepState===s.SLEEPING||this.type===s.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new S),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new S),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new S),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new S),this.quaternion.vmult(t,e),e}addShape(t,e,n){let i=new S,r=new sn;return e&&i.copy(e),n&&r.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(r),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){let e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){let t=this.shapes,e=this.shapeOffsets,n=t.length,i=0;for(let r=0;r!==n;r++){let o=t[r];o.updateBoundingSphereRadius();let a=e[r].length(),c=o.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){let t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,r=v0,o=_0,a=this.quaternion,c=this.aabb,l=b0;for(let h=0;h!==i;h++){let d=t[h];a.vmult(e[h],r),r.vadd(this.position,r),a.mult(n[h],o),d.calculateWorldAABB(r,o,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){let e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){let n=w0,i=M0;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new S),this.type!==s.DYNAMIC)return;this.sleepState===s.SLEEPING&&this.wakeUp();let n=E0;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new S),this.type!==s.DYNAMIC)return;let n=T0,i=A0;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===s.DYNAMIC&&(this.sleepState===s.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new S),this.type!==s.DYNAMIC)return;this.sleepState===s.SLEEPING&&this.wakeUp();let n=e,i=C0;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);let r=R0;n.cross(t,r),this.invInertiaWorld.vmult(r,r),this.angularVelocity.vadd(r,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new S),this.type!==s.DYNAMIC)return;let n=I0,i=P0;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){let t=L0;this.invMass=this.mass>0?1/this.mass:0;let e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),ms.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){let n=new S;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===s.DYNAMIC||this.type===s.KINEMATIC)||this.sleepState===s.SLEEPING)return;let i=this.velocity,r=this.angularVelocity,o=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,f=h*t;i.x+=a.x*f*u.x,i.y+=a.y*f*u.y,i.z+=a.z*f*u.z;let g=d.elements,y=this.angularFactor,m=c.x*y.x,p=c.y*y.y,v=c.z*y.z;r.x+=t*(g[0]*m+g[1]*p+g[2]*v),r.y+=t*(g[3]*m+g[4]*p+g[5]*v),r.z+=t*(g[6]*m+g[7]*p+g[8]*v),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}};te.idCounter=0;te.COLLIDE_EVENT_NAME="collide";te.DYNAMIC=$h.DYNAMIC;te.STATIC=$h.STATIC;te.KINEMATIC=$h.KINEMATIC;te.AWAKE=Kh.AWAKE;te.SLEEPY=Kh.SLEEPY;te.SLEEPING=Kh.SLEEPING;te.wakeupEvent={type:"wakeup"};te.sleepyEvent={type:"sleepy"};te.sleepEvent={type:"sleep"};var v0=new S,_0=new sn,b0=new yn,w0=new Gi,M0=new Gi,S0=new Gi,E0=new S,T0=new S,A0=new S,C0=new S,R0=new S,I0=new S,P0=new S,L0=new S,Ga=class{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!((t.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&t.collisionFilterMask)===0||((t.type&te.STATIC)!==0||t.sleepState===te.SLEEPING)&&((e.type&te.STATIC)!==0||e.sleepState===te.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){let r=N0;e.position.vsub(t.position,r);let o=(t.boundingRadius+e.boundingRadius)**2;r.lengthSquared()<o&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){let n=D0,i=B0,r=F0,o=t.length;for(let a=0;a!==o;a++)i[a]=t[a],r[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==o;a++){let c=i[a].id,l=r[a].id,h=c<l?`${c},${l}`:`${l},${c}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){let c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(r[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){let n=new S;t.position.vsub(e.position,n);let i=t.shapes[0],r=e.shapes[0];return Math.pow(i.boundingSphereRadius+r.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}},N0=new S;new S;new sn;new S;var D0={keys:[]},B0=[],F0=[];new S;var kE=new S;new S;var kh=class extends Ga{constructor(){super()}collisionPairs(t,e,n){let i=t.bodies,r=i.length,o,a;for(let c=0;c!==r;c++)for(let l=0;l!==c;l++)o=i[c],a=i[l],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){let r=t.bodies[i];r.aabbNeedsUpdate&&r.updateAABB(),r.aabb.overlaps(e)&&n.push(r)}return n}},Xs=class{constructor(){this.rayFromWorld=new S,this.rayToWorld=new S,this.hitNormalWorld=new S,this.hitPointWorld=new S,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,r,o,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=r,this.body=o,this.distance=a}},Gf,Wf,qf,Xf,Yf,Zf,$f,jh={CLOSEST:1,ANY:2,ALL:4};Gf=Tt.types.SPHERE;Wf=Tt.types.PLANE;qf=Tt.types.BOX;Xf=Tt.types.CYLINDER;Yf=Tt.types.CONVEXPOLYHEDRON;Zf=Tt.types.HEIGHTFIELD;$f=Tt.types.TRIMESH;var Ln=class s{get[Gf](){return this._intersectSphere}get[Wf](){return this._intersectPlane}get[qf](){return this._intersectBox}get[Xf](){return this._intersectConvex}get[Yf](){return this._intersectConvex}get[Zf](){return this._intersectHeightfield}get[$f](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new S),e===void 0&&(e=new S),this.from=t.clone(),this.to=e.clone(),this.direction=new S,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=s.ANY,this.result=new Xs,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||s.ANY,this.result=e.result||new Xs,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Lf),Bh.length=0,t.broadphase.aabbQuery(t,Lf,Bh),this.intersectBodies(Bh),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());let n=this.checkCollisionResponse;if(n&&!t.collisionResponse||(this.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&this.collisionFilterMask)===0)return;let i=U0,r=O0;for(let o=0,a=t.shapes.length;o<a;o++){let c=t.shapes[o];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[o],r),t.quaternion.vmult(t.shapeOffsets[o],i),i.vadd(t.position,i),this.intersectShape(c,r,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){let r=this.from;if(ty(r,this.direction,n)>t.boundingSphereRadius)return;let a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,r){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,r)}_intersectPlane(t,e,n,i,r){let o=this.from,a=this.to,c=this.direction,l=new S(0,0,1);e.vmult(l,l);let h=new S;o.vsub(n,h);let d=h.dot(l);a.vsub(n,h);let u=h.dot(l);if(d*u>0||o.distanceTo(a)<d)return;let f=l.dot(c);if(Math.abs(f)<this.precision)return;let g=new S,y=new S,m=new S;o.vsub(n,g);let p=-l.dot(g)/f;c.scale(p,y),o.vadd(y,m),this.reportIntersection(l,m,r,i,-1)}getAABB(t){let{lowerBound:e,upperBound:n}=t,i=this.to,r=this.from;e.x=Math.min(i.x,r.x),e.y=Math.min(i.y,r.y),e.z=Math.min(i.z,r.z),n.x=Math.max(i.x,r.x),n.y=Math.max(i.y,r.y),n.z=Math.max(i.z,r.z)}_intersectHeightfield(t,e,n,i,r){t.data,t.elementSize;let o=z0;o.from.copy(this.from),o.to.copy(this.to),ue.pointToLocalFrame(n,e,o.from,o.from),ue.pointToLocalFrame(n,e,o.to,o.to),o.updateDirection();let a=k0,c,l,h,d;c=l=0,h=d=t.data.length-1;let u=new yn;o.getAABB(u),t.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let f=c;f<h;f++)for(let g=l;g<d;g++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,g,u),!!u.overlapsRay(o)){if(t.getConvexTrianglePillar(f,g,!1),ue.pointToWorldFrame(n,e,t.pillarOffset,Fa),this._intersectConvex(t.pillarConvex,e,Fa,i,r,Nf),this.result.shouldStop)return;t.getConvexTrianglePillar(f,g,!0),ue.pointToWorldFrame(n,e,t.pillarOffset,Fa),this._intersectConvex(t.pillarConvex,e,Fa,i,r,Nf)}}}_intersectSphere(t,e,n,i,r){let o=this.from,a=this.to,c=t.radius,l=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-n.x)+(a.y-o.y)*(o.y-n.y)+(a.z-o.z)*(o.z-n.z)),d=(o.x-n.x)**2+(o.y-n.y)**2+(o.z-n.z)**2-c**2,u=h**2-4*l*d,f=V0,g=H0;if(!(u<0))if(u===0)o.lerp(a,u,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,r,i,-1);else{let y=(-h-Math.sqrt(u))/(2*l),m=(-h+Math.sqrt(u))/(2*l);if(y>=0&&y<=1&&(o.lerp(a,y,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,r,i,-1)),this.result.shouldStop)return;m>=0&&m<=1&&(o.lerp(a,m,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,r,i,-1))}}_intersectConvex(t,e,n,i,r,o){let a=G0,c=Df,l=o&&o.faceList||null,h=t.faces,d=t.vertices,u=t.faceNormals,f=this.direction,g=this.from,y=this.to,m=g.distanceTo(y),p=l?l.length:h.length,v=this.result;for(let _=0;!v.shouldStop&&_<p;_++){let x=l?l[_]:_,M=h[x],E=u[x],C=e,P=n;c.copy(d[M[0]]),C.vmult(c,c),c.vadd(P,c),c.vsub(g,c),C.vmult(E,a);let T=f.dot(a);if(Math.abs(T)<this.precision)continue;let b=a.dot(c)/T;if(!(b<0)){f.scale(b,ln),ln.vadd(g,ln),zn.copy(d[M[0]]),C.vmult(zn,zn),P.vadd(zn,zn);for(let R=1;!v.shouldStop&&R<M.length-1;R++){Jn.copy(d[M[R]]),Qn.copy(d[M[R+1]]),C.vmult(Jn,Jn),C.vmult(Qn,Qn),P.vadd(Jn,Jn),P.vadd(Qn,Qn);let k=ln.distanceTo(g);!(s.pointInTriangle(ln,zn,Jn,Qn)||s.pointInTriangle(ln,Jn,zn,Qn))||k>m||this.reportIntersection(a,ln,r,i,x)}}}}_intersectTrimesh(t,e,n,i,r,o){let a=X0,c=J0,l=Q0,h=Df,d=Y0,u=Z0,f=$0,g=j0,y=K0,m=t.indices;t.vertices;let p=this.from,v=this.to,_=this.direction;l.position.copy(n),l.quaternion.copy(e),ue.vectorToLocalFrame(n,e,_,d),ue.pointToLocalFrame(n,e,p,u),ue.pointToLocalFrame(n,e,v,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,u.x*=t.scale.x,u.y*=t.scale.y,u.z*=t.scale.z,f.vsub(u,d),d.normalize();let x=u.distanceSquared(f);t.tree.rayQuery(this,l,c);for(let M=0,E=c.length;!this.result.shouldStop&&M!==E;M++){let C=c[M];t.getNormal(C,a),t.getVertex(m[C*3],zn),zn.vsub(u,h);let P=d.dot(a),T=a.dot(h)/P;if(T<0)continue;d.scale(T,ln),ln.vadd(u,ln),t.getVertex(m[C*3+1],Jn),t.getVertex(m[C*3+2],Qn);let b=ln.distanceSquared(u);!(s.pointInTriangle(ln,Jn,zn,Qn)||s.pointInTriangle(ln,zn,Jn,Qn))||b>x||(ue.vectorToWorldFrame(e,a,y),ue.pointToWorldFrame(n,e,ln,g),this.reportIntersection(y,g,r,i,C))}c.length=0}reportIntersection(t,e,n,i,r){let o=this.from,a=this.to,c=o.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof r<"u"?r:-1,this.mode){case s.ALL:this.hasHit=!0,l.set(o,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case s.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c));break;case s.ANY:this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,ps),n.vsub(e,Qr),t.vsub(e,Fh);let r=ps.dot(ps),o=ps.dot(Qr),a=ps.dot(Fh),c=Qr.dot(Qr),l=Qr.dot(Fh),h,d;return(h=c*a-o*l)>=0&&(d=r*l-o*a)>=0&&h+d<r*c-o*o}};Ln.CLOSEST=jh.CLOSEST;Ln.ANY=jh.ANY;Ln.ALL=jh.ALL;var Lf=new yn,Bh=[],Qr=new S,Fh=new S,U0=new S,O0=new sn,ln=new S,zn=new S,Jn=new S,Qn=new S;new S;new Xs;var Nf={faceList:[0]},Fa=new S,z0=new Ln,k0=[],V0=new S,H0=new S,G0=new S,W0=new S,q0=new S,Df=new S,X0=new S,Y0=new S,Z0=new S,$0=new S,K0=new S,j0=new S;new yn;var J0=[],Q0=new ue,ps=new S,Ua=new S;function ty(s,t,e){e.vsub(s,ps);let n=ps.dot(t);return t.scale(n,Ua),Ua.vadd(s,Ua),e.distanceTo(Ua)}var Wa=class s extends Ga{static checkBounds(t,e,n){let i,r;n===0?(i=t.position.x,r=e.position.x):n===1?(i=t.position.y,r=e.position.y):n===2&&(i=t.position.z,r=e.position.z);let o=t.boundingRadius,a=e.boundingRadius,c=i+o;return r-a<c}static insertionSortX(t){for(let e=1,n=t.length;e<n;e++){let i=t[e],r;for(r=e-1;r>=0&&!(t[r].aabb.lowerBound.x<=i.aabb.lowerBound.x);r--)t[r+1]=t[r];t[r+1]=i}return t}static insertionSortY(t){for(let e=1,n=t.length;e<n;e++){let i=t[e],r;for(r=e-1;r>=0&&!(t[r].aabb.lowerBound.y<=i.aabb.lowerBound.y);r--)t[r+1]=t[r];t[r+1]=i}return t}static insertionSortZ(t){for(let e=1,n=t.length;e<n;e++){let i=t[e],r;for(r=e-1;r>=0&&!(t[r].aabb.lowerBound.z<=i.aabb.lowerBound.z);r--)t[r+1]=t[r];t[r+1]=i}return t}constructor(t){super(),this.axisList=[],this.world=null,this.axisIndex=0;let e=this.axisList;this._addBodyHandler=n=>{e.push(n.body)},this._removeBodyHandler=n=>{let i=e.indexOf(n.body);i!==-1&&e.splice(i,1)},t&&this.setWorld(t)}setWorld(t){this.axisList.length=0;for(let e=0;e<t.bodies.length;e++)this.axisList.push(t.bodies[e]);t.removeEventListener("addBody",this._addBodyHandler),t.removeEventListener("removeBody",this._removeBodyHandler),t.addEventListener("addBody",this._addBodyHandler),t.addEventListener("removeBody",this._removeBodyHandler),this.world=t,this.dirty=!0}collisionPairs(t,e,n){let i=this.axisList,r=i.length,o=this.axisIndex,a,c;for(this.dirty&&(this.sortList(),this.dirty=!1),a=0;a!==r;a++){let l=i[a];for(c=a+1;c<r;c++){let h=i[c];if(this.needBroadphaseCollision(l,h)){if(!s.checkBounds(l,h,o))break;this.intersectionTest(l,h,e,n)}}}}sortList(){let t=this.axisList,e=this.axisIndex,n=t.length;for(let i=0;i!==n;i++){let r=t[i];r.aabbNeedsUpdate&&r.updateAABB()}e===0?s.insertionSortX(t):e===1?s.insertionSortY(t):e===2&&s.insertionSortZ(t)}autoDetectAxis(){let t=0,e=0,n=0,i=0,r=0,o=0,a=this.axisList,c=a.length,l=1/c;for(let f=0;f!==c;f++){let g=a[f],y=g.position.x;t+=y,e+=y*y;let m=g.position.y;n+=m,i+=m*m;let p=g.position.z;r+=p,o+=p*p}let h=e-t*t*l,d=i-n*n*l,u=o-r*r*l;h>d?h>u?this.axisIndex=0:this.axisIndex=2:d>u?this.axisIndex=1:this.axisIndex=2}aabbQuery(t,e,n){n===void 0&&(n=[]),this.dirty&&(this.sortList(),this.dirty=!1);let i=this.axisIndex,r="x";i===1&&(r="y"),i===2&&(r="z");let o=this.axisList;e.lowerBound[r],e.upperBound[r];for(let a=0;a<o.length;a++){let c=o[a];c.aabbNeedsUpdate&&c.updateAABB(),c.aabb.overlaps(e)&&n.push(c)}return n}},qa=class{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}},Vh=class s{constructor(t,e,n){n===void 0&&(n={}),n=qa.defaults(n,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=t,this.bodyB=e,this.id=s.idCounter++,this.collideConnected=n.collideConnected,n.wakeUpBodies&&(t&&t.wakeUp(),e&&e.wakeUp())}update(){throw new Error("method update() not implmemented in this Constraint subclass!")}enable(){let t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!0}disable(){let t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!1}};Vh.idCounter=0;var Xa=class{constructor(){this.spatial=new S,this.rotational=new S}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}},io=class s{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=s.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Xa,this.jacobianElementB=new Xa,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){let i=e,r=t,o=n;this.a=4/(o*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(o*o*r*(1+4*i))}computeB(t,e,n){let i=this.computeGW(),r=this.computeGq(),o=this.computeGiMf();return-r*t-i*e-o*n}computeGq(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.position,o=i.position;return t.spatial.dot(r)+e.spatial.dot(o)}computeGW(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.velocity,o=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(r,a)+e.multiplyVectors(o,c)}computeGWlambda(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.vlambda,o=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(r,a)+e.multiplyVectors(o,c)}computeGiMf(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.force,o=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,h=i.invMassSolve;return r.scale(l,Bf),a.scale(h,Ff),n.invInertiaWorldSolve.vmult(o,Uf),i.invInertiaWorldSolve.vmult(c,Of),t.multiplyVectors(Bf,Uf)+e.multiplyVectors(Ff,Of)}computeGiMGt(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.invMassSolve,o=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve,l=r+o;return a.vmult(t.rotational,Oa),l+=Oa.dot(t.rotational),c.vmult(e.rotational,Oa),l+=Oa.dot(e.rotational),l}addToWlambda(t){let e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,r=this.bj,o=ey;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),r.vlambda.addScaledVector(r.invMassSolve*t,n.spatial,r.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,o),i.wlambda.addScaledVector(t,o,i.wlambda),r.invInertiaWorldSolve.vmult(n.rotational,o),r.wlambda.addScaledVector(t,o,r.wlambda)}computeC(){return this.computeGiMGt()+this.eps}};io.idCounter=0;var Bf=new S,Ff=new S,Uf=new S,Of=new S,Oa=new S,ey=new S,Hh=class extends io{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new S,this.rj=new S,this.ni=new S}computeB(t){let e=this.a,n=this.b,i=this.bi,r=this.bj,o=this.ri,a=this.rj,c=ny,l=iy,h=i.velocity,d=i.angularVelocity;i.force,i.torque;let u=r.velocity,f=r.angularVelocity;r.force,r.torque;let g=sy,y=this.jacobianElementA,m=this.jacobianElementB,p=this.ni;o.cross(p,c),a.cross(p,l),p.negate(y.spatial),c.negate(y.rotational),m.spatial.copy(p),m.rotational.copy(l),g.copy(r.position),g.vadd(a,g),g.vsub(i.position,g),g.vsub(o,g);let v=p.dot(g),_=this.restitution+1,x=_*u.dot(p)-_*h.dot(p)+f.dot(l)-d.dot(c),M=this.computeGiMf();return-v*e-x*n-t*M}getImpactVelocityAlongNormal(){let t=ry,e=oy,n=ay,i=cy,r=ly;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,r),this.ni.dot(r)}},ny=new S,iy=new S,sy=new S,ry=new S,oy=new S,ay=new S,cy=new S,ly=new S;var VE=new S,HE=new S;var GE=new S,WE=new S;new S;new S;var qE=new S,XE=new S;var YE=new S,ZE=new S,Ya=class extends io{constructor(t,e,n){super(t,e,-n,n),this.ri=new S,this.rj=new S,this.t=new S}computeB(t){this.a;let e=this.b;this.bi,this.bj;let n=this.ri,i=this.rj,r=hy,o=uy,a=this.t;n.cross(a,r),i.cross(a,o);let c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),r.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(o);let h=this.computeGW(),d=this.computeGiMf();return-h*e-t*d}},hy=new S,uy=new S,Za=class s{constructor(t,e,n){n=qa.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=s.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}};Za.idCounter=0;var $a=class s{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=s.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}};$a.idCounter=0;var $E=new S,KE=new S,jE=new S,JE=new S,QE=new S,tT=new S,eT=new S,nT=new S,iT=new S,sT=new S,rT=new S;var oT=new S,aT=new S;new S;new S;new S;var cT=new S,lT=new S,hT=new S;new Ln;new S;var uT=new S,dT=new S,fT=[new S(1,0,0),new S(0,1,0),new S(0,0,1)],pT=new S;var mT=new S,gT=new S,yT=new S;var xT=new S,vT=new S,_T=new S,bT=new S;var wT=new S,MT=new S,ST=new S;var ET=new S,TT=new S;var AT=new S,CT=new S,RT=new S,IT=new S,PT=new S,LT=new S,NT=new S;var DT=new S;var BT=new S,FT=new S,UT=new S,OT=new S,zT=new S,kT=new S,VT=new S,HT=new S,GT=new S;var WT=new S,qT=new yn;var XT=new S,YT=new yn,ZT=new S,$T=new S,KT=new S,jT=new S,JT=new S,QT=new S,tA=new S,eA=new yn,nA=new S,iA=new ue,sA=new yn,Gh=class{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){let e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}},Wh=class extends Gh{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0,i=this.iterations,r=this.tolerance*this.tolerance,o=this.equations,a=o.length,c=e.bodies,l=c.length,h=t,d,u,f,g,y,m;if(a!==0)for(let x=0;x!==l;x++)c[x].updateSolveMassProperties();let p=fy,v=py,_=dy;p.length=a,v.length=a,_.length=a;for(let x=0;x!==a;x++){let M=o[x];_[x]=0,v[x]=M.computeB(h),p[x]=1/M.computeC()}if(a!==0){for(let E=0;E!==l;E++){let C=c[E],P=C.vlambda,T=C.wlambda;P.set(0,0,0),T.set(0,0,0)}for(n=0;n!==i;n++){g=0;for(let E=0;E!==a;E++){let C=o[E];d=v[E],u=p[E],m=_[E],y=C.computeGWlambda(),f=u*(d-y-C.eps*m),m+f<C.minForce?f=C.minForce-m:m+f>C.maxForce&&(f=C.maxForce-m),_[E]+=f,g+=f>0?f:-f,C.addToWlambda(f)}if(g*g<r)break}for(let E=0;E!==l;E++){let C=c[E],P=C.velocity,T=C.angularVelocity;C.vlambda.vmul(C.linearFactor,C.vlambda),P.vadd(C.vlambda,P),C.wlambda.vmul(C.angularFactor,C.wlambda),T.vadd(C.wlambda,T)}let x=o.length,M=1/h;for(;x--;)o[x].multiplier=_[x]*M}return n}},dy=[],fy=[],py=[];var rA=te.STATIC;var qh=class{constructor(){this.objects=[],this.type=Object}release(){let t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){let e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}},Xh=class extends qh{constructor(){super(...arguments),this.type=S}constructObject(){return new S}},Me={sphereSphere:Tt.types.SPHERE,spherePlane:Tt.types.SPHERE|Tt.types.PLANE,boxBox:Tt.types.BOX|Tt.types.BOX,sphereBox:Tt.types.SPHERE|Tt.types.BOX,planeBox:Tt.types.PLANE|Tt.types.BOX,convexConvex:Tt.types.CONVEXPOLYHEDRON,sphereConvex:Tt.types.SPHERE|Tt.types.CONVEXPOLYHEDRON,planeConvex:Tt.types.PLANE|Tt.types.CONVEXPOLYHEDRON,boxConvex:Tt.types.BOX|Tt.types.CONVEXPOLYHEDRON,sphereHeightfield:Tt.types.SPHERE|Tt.types.HEIGHTFIELD,boxHeightfield:Tt.types.BOX|Tt.types.HEIGHTFIELD,convexHeightfield:Tt.types.CONVEXPOLYHEDRON|Tt.types.HEIGHTFIELD,sphereParticle:Tt.types.PARTICLE|Tt.types.SPHERE,planeParticle:Tt.types.PLANE|Tt.types.PARTICLE,boxParticle:Tt.types.BOX|Tt.types.PARTICLE,convexParticle:Tt.types.PARTICLE|Tt.types.CONVEXPOLYHEDRON,cylinderCylinder:Tt.types.CYLINDER,sphereCylinder:Tt.types.SPHERE|Tt.types.CYLINDER,planeCylinder:Tt.types.PLANE|Tt.types.CYLINDER,boxCylinder:Tt.types.BOX|Tt.types.CYLINDER,convexCylinder:Tt.types.CONVEXPOLYHEDRON|Tt.types.CYLINDER,heightfieldCylinder:Tt.types.HEIGHTFIELD|Tt.types.CYLINDER,particleCylinder:Tt.types.PARTICLE|Tt.types.CYLINDER,sphereTrimesh:Tt.types.SPHERE|Tt.types.TRIMESH,planeTrimesh:Tt.types.PLANE|Tt.types.TRIMESH},Yh=class{get[Me.sphereSphere](){return this.sphereSphere}get[Me.spherePlane](){return this.spherePlane}get[Me.boxBox](){return this.boxBox}get[Me.sphereBox](){return this.sphereBox}get[Me.planeBox](){return this.planeBox}get[Me.convexConvex](){return this.convexConvex}get[Me.sphereConvex](){return this.sphereConvex}get[Me.planeConvex](){return this.planeConvex}get[Me.boxConvex](){return this.boxConvex}get[Me.sphereHeightfield](){return this.sphereHeightfield}get[Me.boxHeightfield](){return this.boxHeightfield}get[Me.convexHeightfield](){return this.convexHeightfield}get[Me.sphereParticle](){return this.sphereParticle}get[Me.planeParticle](){return this.planeParticle}get[Me.boxParticle](){return this.boxParticle}get[Me.convexParticle](){return this.convexParticle}get[Me.cylinderCylinder](){return this.convexConvex}get[Me.sphereCylinder](){return this.sphereConvex}get[Me.planeCylinder](){return this.planeConvex}get[Me.boxCylinder](){return this.boxConvex}get[Me.convexCylinder](){return this.convexConvex}get[Me.heightfieldCylinder](){return this.heightfieldCylinder}get[Me.particleCylinder](){return this.particleCylinder}get[Me.sphereTrimesh](){return this.sphereTrimesh}get[Me.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new Xh,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,r,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new Hh(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;let c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);let l=n.material||t.material,h=i.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=r||n,a.sj=o||i,a}createFrictionEquationsFromContact(t,e){let n=t.bi,i=t.bj,r=t.si,o=t.sj,a=this.world,c=this.currentContactMaterial,l=c.friction,h=r.material||n.material,d=o.material||i.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(l=h.friction*d.friction),l>0){let u=l*(a.frictionGravity||a.gravity).length(),f=n.invMass+i.invMass;f>0&&(f=1/f);let g=this.frictionEquationPool,y=g.length?g.pop():new Ya(n,i,u*f),m=g.length?g.pop():new Ya(n,i,u*f);return y.bi=m.bi=n,y.bj=m.bj=i,y.minForce=m.minForce=-u*f,y.maxForce=m.maxForce=u*f,y.ri.copy(t.ri),y.rj.copy(t.rj),m.ri.copy(t.ri),m.rj.copy(t.rj),t.ni.tangents(y.t,m.t),y.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),m.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),y.enabled=m.enabled=t.enabled,e.push(y,m),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;let n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];fs.setZero(),Ws.setZero(),qs.setZero();let r=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==r?(fs.vadd(e.ni,fs),Ws.vadd(e.ri,Ws),qs.vadd(e.rj,qs)):(fs.vsub(e.ni,fs),Ws.vadd(e.rj,Ws),qs.vadd(e.ri,qs));let o=1/t;Ws.scale(o,n.ri),qs.scale(o,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),fs.normalize(),fs.tangents(n.t,i.t)}getContacts(t,e,n,i,r,o,a){this.contactPointPool=r,this.frictionEquationPool=a,this.result=i,this.frictionResult=o;let c=yy,l=xy,h=my,d=gy;for(let u=0,f=t.length;u!==f;u++){let g=t[u],y=e[u],m=null;g.material&&y.material&&(m=n.getContactMaterial(g.material,y.material)||null);let p=g.type&te.KINEMATIC&&y.type&te.STATIC||g.type&te.STATIC&&y.type&te.KINEMATIC||g.type&te.KINEMATIC&&y.type&te.KINEMATIC;for(let v=0;v<g.shapes.length;v++){g.quaternion.mult(g.shapeOrientations[v],c),g.quaternion.vmult(g.shapeOffsets[v],h),h.vadd(g.position,h);let _=g.shapes[v];for(let x=0;x<y.shapes.length;x++){y.quaternion.mult(y.shapeOrientations[x],l),y.quaternion.vmult(y.shapeOffsets[x],d),d.vadd(y.position,d);let M=y.shapes[x];if(!(_.collisionFilterMask&M.collisionFilterGroup&&M.collisionFilterMask&_.collisionFilterGroup)||h.distanceTo(d)>_.boundingSphereRadius+M.boundingSphereRadius)continue;let E=null;_.material&&M.material&&(E=n.getContactMaterial(_.material,M.material)||null),this.currentContactMaterial=E||m||n.defaultContactMaterial;let C=_.type|M.type,P=this[C];if(P){let T=!1;_.type<M.type?T=P.call(this,_,M,h,d,c,l,g,y,_,M,p):T=P.call(this,M,_,d,h,l,c,y,g,_,M,p),T&&p&&(n.shapeOverlapKeeper.set(_.id,M.id),n.bodyOverlapKeeper.set(g.id,y.id))}}}}}sphereSphere(t,e,n,i,r,o,a,c,l,h,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;let u=this.createContactEquation(a,c,t,e,l,h);i.vsub(n,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(t.radius,u.ri),u.rj.scale(-e.radius,u.rj),u.ri.vadd(n,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(i,u.rj),u.rj.vsub(c.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(t,e,n,i,r,o,a,c,l,h,d){let u=this.createContactEquation(a,c,t,e,l,h);if(u.ni.set(0,0,1),o.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(t.radius,u.ri),n.vsub(i,za),u.ni.scale(u.ni.dot(za),zf),za.vsub(zf,u.rj),-za.dot(u.ni)<=t.radius){if(d)return!0;let f=u.ri,g=u.rj;f.vadd(n,f),f.vsub(a.position,f),g.vadd(i,g),g.vsub(c.position,g),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(t,e,n,i,r,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,r,o,a,c,t,e,d)}sphereBox(t,e,n,i,r,o,a,c,l,h,d){let u=this.v3pool,f=Wy;n.vsub(i,ka),e.getSideNormals(f,o);let g=t.radius,y=!1,m=Xy,p=Yy,v=Zy,_=null,x=0,M=0,E=0,C=null;for(let D=0,$=f.length;D!==$&&y===!1;D++){let H=Vy;H.copy(f[D]);let j=H.length();H.normalize();let lt=ka.dot(H);if(lt<j+g&&lt>0){let pt=Hy,st=Gy;pt.copy(f[(D+1)%3]),st.copy(f[(D+2)%3]);let Qt=pt.length(),ne=st.length();pt.normalize(),st.normalize();let Z=ka.dot(pt),mt=ka.dot(st);if(Z<Qt&&Z>-Qt&&mt<ne&&mt>-ne){let ht=Math.abs(lt-j-g);if((C===null||ht<C)&&(C=ht,M=Z,E=mt,_=j,m.copy(H),p.copy(pt),v.copy(st),x++,d))return!0}}}if(x){y=!0;let D=this.createContactEquation(a,c,t,e,l,h);m.scale(-g,D.ri),D.ni.copy(m),D.ni.negate(D.ni),m.scale(_,m),p.scale(M,p),m.vadd(p,m),v.scale(E,v),m.vadd(v,D.rj),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),D.rj.vadd(i,D.rj),D.rj.vsub(c.position,D.rj),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}let P=u.get(),T=qy;for(let D=0;D!==2&&!y;D++)for(let $=0;$!==2&&!y;$++)for(let H=0;H!==2&&!y;H++)if(P.set(0,0,0),D?P.vadd(f[0],P):P.vsub(f[0],P),$?P.vadd(f[1],P):P.vsub(f[1],P),H?P.vadd(f[2],P):P.vsub(f[2],P),i.vadd(P,T),T.vsub(n,T),T.lengthSquared()<g*g){if(d)return!0;y=!0;let j=this.createContactEquation(a,c,t,e,l,h);j.ri.copy(T),j.ri.normalize(),j.ni.copy(j.ri),j.ri.scale(g,j.ri),j.rj.copy(P),j.ri.vadd(n,j.ri),j.ri.vsub(a.position,j.ri),j.rj.vadd(i,j.rj),j.rj.vsub(c.position,j.rj),this.result.push(j),this.createFrictionEquationsFromContact(j,this.frictionResult)}u.release(P),P=null;let b=u.get(),R=u.get(),k=u.get(),L=u.get(),B=u.get(),O=f.length;for(let D=0;D!==O&&!y;D++)for(let $=0;$!==O&&!y;$++)if(D%3!==$%3){f[$].cross(f[D],b),b.normalize(),f[D].vadd(f[$],R),k.copy(n),k.vsub(R,k),k.vsub(i,k);let H=k.dot(b);b.scale(H,L);let j=0;for(;j===D%3||j===$%3;)j++;B.copy(n),B.vsub(L,B),B.vsub(R,B),B.vsub(i,B);let lt=Math.abs(H),pt=B.length();if(lt<f[j].length()&&pt<g){if(d)return!0;y=!0;let st=this.createContactEquation(a,c,t,e,l,h);R.vadd(L,st.rj),st.rj.copy(st.rj),B.negate(st.ni),st.ni.normalize(),st.ri.copy(st.rj),st.ri.vadd(i,st.ri),st.ri.vsub(n,st.ri),st.ri.normalize(),st.ri.scale(g,st.ri),st.ri.vadd(n,st.ri),st.ri.vsub(a.position,st.ri),st.rj.vadd(i,st.rj),st.rj.vsub(c.position,st.rj),this.result.push(st),this.createFrictionEquationsFromContact(st,this.frictionResult)}}u.release(b,R,k,L,B)}planeBox(t,e,n,i,r,o,a,c,l,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,r,o,a,c,t,e,d)}convexConvex(t,e,n,i,r,o,a,c,l,h,d,u,f){let g=lx;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,r,i,o,g,u,f)){let y=[],m=hx;t.clipAgainstHull(n,r,e,i,o,g,-100,100,y);let p=0;for(let v=0;v!==y.length;v++){if(d)return!0;let _=this.createContactEquation(a,c,t,e,l,h),x=_.ri,M=_.rj;g.negate(_.ni),y[v].normal.negate(m),m.scale(y[v].depth,m),y[v].point.vadd(m,x),M.copy(y[v].point),x.vsub(n,x),M.vsub(i,M),x.vadd(n,x),x.vsub(a.position,x),M.vadd(i,M),M.vsub(c.position,M),this.result.push(_),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(_,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}}sphereConvex(t,e,n,i,r,o,a,c,l,h,d){let u=this.v3pool;n.vsub(i,$y);let f=e.faceNormals,g=e.faces,y=e.vertices,m=t.radius,p=!1;for(let v=0;v!==y.length;v++){let _=y[v],x=Qy;o.vmult(_,x),i.vadd(x,x);let M=Jy;if(x.vsub(n,M),M.lengthSquared()<m*m){if(d)return!0;p=!0;let E=this.createContactEquation(a,c,t,e,l,h);E.ri.copy(M),E.ri.normalize(),E.ni.copy(E.ri),E.ri.scale(m,E.ri),x.vsub(i,E.rj),E.ri.vadd(n,E.ri),E.ri.vsub(a.position,E.ri),E.rj.vadd(i,E.rj),E.rj.vsub(c.position,E.rj),this.result.push(E),this.createFrictionEquationsFromContact(E,this.frictionResult);return}}for(let v=0,_=g.length;v!==_&&p===!1;v++){let x=f[v],M=g[v],E=tx;o.vmult(x,E);let C=ex;o.vmult(y[M[0]],C),C.vadd(i,C);let P=nx;E.scale(-m,P),n.vadd(P,P);let T=ix;P.vsub(C,T);let b=T.dot(E),R=sx;if(n.vsub(C,R),b<0&&R.dot(E)>0){let k=[];for(let L=0,B=M.length;L!==B;L++){let O=u.get();o.vmult(y[M[L]],O),i.vadd(O,O),k.push(O)}if(ky(k,E,n)){if(d)return!0;p=!0;let L=this.createContactEquation(a,c,t,e,l,h);E.scale(-m,L.ri),E.negate(L.ni);let B=u.get();E.scale(-b,B);let O=u.get();E.scale(-m,O),n.vsub(i,L.rj),L.rj.vadd(O,L.rj),L.rj.vadd(B,L.rj),L.rj.vadd(i,L.rj),L.rj.vsub(c.position,L.rj),L.ri.vadd(n,L.ri),L.ri.vsub(a.position,L.ri),u.release(B),u.release(O),this.result.push(L),this.createFrictionEquationsFromContact(L,this.frictionResult);for(let D=0,$=k.length;D!==$;D++)u.release(k[D]);return}else for(let L=0;L!==M.length;L++){let B=u.get(),O=u.get();o.vmult(y[M[(L+1)%M.length]],B),o.vmult(y[M[(L+2)%M.length]],O),i.vadd(B,B),i.vadd(O,O);let D=Ky;O.vsub(B,D);let $=jy;D.unit($);let H=u.get(),j=u.get();n.vsub(B,j);let lt=j.dot($);$.scale(lt,H),H.vadd(B,H);let pt=u.get();if(H.vsub(n,pt),lt>0&&lt*lt<D.lengthSquared()&&pt.lengthSquared()<m*m){if(d)return!0;let st=this.createContactEquation(a,c,t,e,l,h);H.vsub(i,st.rj),H.vsub(n,st.ni),st.ni.normalize(),st.ni.scale(m,st.ri),st.rj.vadd(i,st.rj),st.rj.vsub(c.position,st.rj),st.ri.vadd(n,st.ri),st.ri.vsub(a.position,st.ri),this.result.push(st),this.createFrictionEquationsFromContact(st,this.frictionResult);for(let Qt=0,ne=k.length;Qt!==ne;Qt++)u.release(k[Qt]);u.release(B),u.release(O),u.release(H),u.release(pt),u.release(j);return}u.release(B),u.release(O),u.release(H),u.release(pt),u.release(j)}for(let L=0,B=k.length;L!==B;L++)u.release(k[L])}}}planeConvex(t,e,n,i,r,o,a,c,l,h,d){let u=rx,f=ox;f.set(0,0,1),r.vmult(f,f);let g=0,y=ax;for(let m=0;m!==e.vertices.length;m++)if(u.copy(e.vertices[m]),o.vmult(u,u),i.vadd(u,u),u.vsub(n,y),f.dot(y)<=0){if(d)return!0;let v=this.createContactEquation(a,c,t,e,l,h),_=cx;f.scale(f.dot(y),_),u.vsub(_,_),_.vsub(n,v.ri),v.ni.copy(f),u.vsub(i,v.rj),v.ri.vadd(n,v.ri),v.ri.vsub(a.position,v.ri),v.rj.vadd(i,v.rj),v.rj.vsub(c.position,v.rj),this.result.push(v),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(v,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(t,e,n,i,r,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,r,o,a,c,t,e,d)}sphereHeightfield(t,e,n,i,r,o,a,c,l,h,d){let u=e.data,f=t.radius,g=e.elementSize,y=wx,m=bx;ue.pointToLocalFrame(i,o,n,m);let p=Math.floor((m.x-f)/g)-1,v=Math.ceil((m.x+f)/g)+1,_=Math.floor((m.y-f)/g)-1,x=Math.ceil((m.y+f)/g)+1;if(v<0||x<0||p>u.length||_>u[0].length)return;p<0&&(p=0),v<0&&(v=0),_<0&&(_=0),x<0&&(x=0),p>=u.length&&(p=u.length-1),v>=u.length&&(v=u.length-1),x>=u[0].length&&(x=u[0].length-1),_>=u[0].length&&(_=u[0].length-1);let M=[];e.getRectMinMax(p,_,v,x,M);let E=M[0],C=M[1];if(m.z-f>C||m.z+f<E)return;let P=this.result;for(let T=p;T<v;T++)for(let b=_;b<x;b++){let R=P.length,k=!1;if(e.getConvexTrianglePillar(T,b,!1),ue.pointToWorldFrame(i,o,e.pillarOffset,y),n.distanceTo(y)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(k=this.sphereConvex(t,e.pillarConvex,n,y,r,o,a,c,t,e,d)),d&&k||(e.getConvexTrianglePillar(T,b,!0),ue.pointToWorldFrame(i,o,e.pillarOffset,y),n.distanceTo(y)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(k=this.sphereConvex(t,e.pillarConvex,n,y,r,o,a,c,t,e,d)),d&&k))return!0;if(P.length-R>2)return}}boxHeightfield(t,e,n,i,r,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,r,o,a,c,t,e,d)}convexHeightfield(t,e,n,i,r,o,a,c,l,h,d){let u=e.data,f=e.elementSize,g=t.boundingSphereRadius,y=vx,m=_x,p=xx;ue.pointToLocalFrame(i,o,n,p);let v=Math.floor((p.x-g)/f)-1,_=Math.ceil((p.x+g)/f)+1,x=Math.floor((p.y-g)/f)-1,M=Math.ceil((p.y+g)/f)+1;if(_<0||M<0||v>u.length||x>u[0].length)return;v<0&&(v=0),_<0&&(_=0),x<0&&(x=0),M<0&&(M=0),v>=u.length&&(v=u.length-1),_>=u.length&&(_=u.length-1),M>=u[0].length&&(M=u[0].length-1),x>=u[0].length&&(x=u[0].length-1);let E=[];e.getRectMinMax(v,x,_,M,E);let C=E[0],P=E[1];if(!(p.z-g>P||p.z+g<C))for(let T=v;T<_;T++)for(let b=x;b<M;b++){let R=!1;if(e.getConvexTrianglePillar(T,b,!1),ue.pointToWorldFrame(i,o,e.pillarOffset,y),n.distanceTo(y)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(R=this.convexConvex(t,e.pillarConvex,n,y,r,o,a,c,null,null,d,m,null)),d&&R||(e.getConvexTrianglePillar(T,b,!0),ue.pointToWorldFrame(i,o,e.pillarOffset,y),n.distanceTo(y)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(R=this.convexConvex(t,e.pillarConvex,n,y,r,o,a,c,null,null,d,m,null)),d&&R))return!0}}sphereParticle(t,e,n,i,r,o,a,c,l,h,d){let u=px;if(u.set(0,0,1),i.vsub(n,u),u.lengthSquared()<=t.radius*t.radius){if(d)return!0;let g=this.createContactEquation(c,a,e,t,l,h);u.normalize(),g.rj.copy(u),g.rj.scale(t.radius,g.rj),g.ni.copy(u),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(t,e,n,i,r,o,a,c,l,h,d){let u=ux;u.set(0,0,1),a.quaternion.vmult(u,u);let f=dx;if(i.vsub(a.position,f),u.dot(f)<=0){if(d)return!0;let y=this.createContactEquation(c,a,e,t,l,h);y.ni.copy(u),y.ni.negate(y.ni),y.ri.set(0,0,0);let m=fx;u.scale(u.dot(i),m),i.vsub(m,m),y.rj.copy(m),this.result.push(y),this.createFrictionEquationsFromContact(y,this.frictionResult)}}boxParticle(t,e,n,i,r,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,r,o,a,c,t,e,d)}convexParticle(t,e,n,i,r,o,a,c,l,h,d){let u=-1,f=gx,g=yx,y=null,m=mx;if(m.copy(i),m.vsub(n,m),r.conjugate(kf),kf.vmult(m,m),t.pointIsInside(m)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,r),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(r);for(let p=0,v=t.faces.length;p!==v;p++){let _=[t.worldVertices[t.faces[p][0]]],x=t.worldFaceNormals[p];i.vsub(_[0],Vf);let M=-x.dot(Vf);if(y===null||Math.abs(M)<Math.abs(y)){if(d)return!0;y=M,u=p,f.copy(x)}}if(u!==-1){let p=this.createContactEquation(c,a,e,t,l,h);f.scale(y,g),g.vadd(i,g),g.vsub(n,g),p.rj.copy(g),f.negate(p.ni),p.ri.set(0,0,0);let v=p.ri,_=p.rj;v.vadd(i,v),v.vsub(c.position,v),_.vadd(n,_),_.vsub(a.position,_),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,r,o,a,c,l,h,d){return this.convexHeightfield(e,t,i,n,o,r,c,a,l,h,d)}particleCylinder(t,e,n,i,r,o,a,c,l,h,d){return this.convexParticle(e,t,i,n,o,r,c,a,l,h,d)}sphereTrimesh(t,e,n,i,r,o,a,c,l,h,d){let u=Ty,f=Ay,g=Cy,y=Ry,m=Iy,p=Py,v=By,_=Ey,x=My,M=Fy;ue.pointToLocalFrame(i,o,n,m);let E=t.radius;v.lowerBound.set(m.x-E,m.y-E,m.z-E),v.upperBound.set(m.x+E,m.y+E,m.z+E),e.getTrianglesInAABB(v,M);let C=Sy,P=t.radius*t.radius;for(let L=0;L<M.length;L++)for(let B=0;B<3;B++)if(e.getVertex(e.indices[M[L]*3+B],C),C.vsub(m,x),x.lengthSquared()<=P){if(_.copy(C),ue.pointToWorldFrame(i,o,_,C),C.vsub(n,x),d)return!0;let O=this.createContactEquation(a,c,t,e,l,h);O.ni.copy(x),O.ni.normalize(),O.ri.copy(O.ni),O.ri.scale(t.radius,O.ri),O.ri.vadd(n,O.ri),O.ri.vsub(a.position,O.ri),O.rj.copy(C),O.rj.vsub(c.position,O.rj),this.result.push(O),this.createFrictionEquationsFromContact(O,this.frictionResult)}for(let L=0;L<M.length;L++)for(let B=0;B<3;B++){e.getVertex(e.indices[M[L]*3+B],u),e.getVertex(e.indices[M[L]*3+(B+1)%3],f),f.vsub(u,g),m.vsub(f,p);let O=p.dot(g);m.vsub(u,p);let D=p.dot(g);if(D>0&&O<0&&(m.vsub(u,p),y.copy(g),y.normalize(),D=p.dot(y),y.scale(D,p),p.vadd(u,p),p.distanceTo(m)<t.radius)){if(d)return!0;let H=this.createContactEquation(a,c,t,e,l,h);p.vsub(m,H.ni),H.ni.normalize(),H.ni.scale(t.radius,H.ri),H.ri.vadd(n,H.ri),H.ri.vsub(a.position,H.ri),ue.pointToWorldFrame(i,o,p,p),p.vsub(c.position,H.rj),ue.vectorToWorldFrame(o,H.ni,H.ni),ue.vectorToWorldFrame(o,H.ri,H.ri),this.result.push(H),this.createFrictionEquationsFromContact(H,this.frictionResult)}}let T=Ly,b=Ny,R=Dy,k=wy;for(let L=0,B=M.length;L!==B;L++){e.getTriangleVertices(M[L],T,b,R),e.getNormal(M[L],k),m.vsub(T,p);let O=p.dot(k);if(k.scale(O,p),m.vsub(p,p),O=p.distanceTo(m),Ln.pointInTriangle(p,T,b,R)&&O<t.radius){if(d)return!0;let D=this.createContactEquation(a,c,t,e,l,h);p.vsub(m,D.ni),D.ni.normalize(),D.ni.scale(t.radius,D.ri),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),ue.pointToWorldFrame(i,o,p,p),p.vsub(c.position,D.rj),ue.vectorToWorldFrame(o,D.ni,D.ni),ue.vectorToWorldFrame(o,D.ri,D.ri),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}}M.length=0}planeTrimesh(t,e,n,i,r,o,a,c,l,h,d){let u=new S,f=vy;f.set(0,0,1),r.vmult(f,f);for(let g=0;g<e.vertices.length/3;g++){e.getVertex(g,u);let y=new S;y.copy(u),ue.pointToWorldFrame(i,o,y,u);let m=_y;if(u.vsub(n,m),f.dot(m)<=0){if(d)return!0;let v=this.createContactEquation(a,c,t,e,l,h);v.ni.copy(f);let _=by;f.scale(m.dot(f),_),u.vsub(_,_),v.ri.copy(_),v.ri.vsub(a.position,v.ri),v.rj.copy(u),v.rj.vsub(c.position,v.rj),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}}},fs=new S,Ws=new S,qs=new S,my=new S,gy=new S,yy=new sn,xy=new sn,vy=new S,_y=new S,by=new S,wy=new S,My=new S;new S;var Sy=new S,Ey=new S,Ty=new S,Ay=new S,Cy=new S,Ry=new S,Iy=new S,Py=new S,Ly=new S,Ny=new S,Dy=new S,By=new yn,Fy=[],za=new S,zf=new S,Uy=new S,Oy=new S,zy=new S;function ky(s,t,e){let n=null,i=s.length;for(let r=0;r!==i;r++){let o=s[r],a=Uy;s[(r+1)%i].vsub(o,a);let c=Oy;a.cross(t,c);let l=zy;e.vsub(o,l);let h=c.dot(l);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}var ka=new S,Vy=new S,Hy=new S,Gy=new S,Wy=[new S,new S,new S,new S,new S,new S],qy=new S,Xy=new S,Yy=new S,Zy=new S,$y=new S,Ky=new S,jy=new S,Jy=new S,Qy=new S,tx=new S,ex=new S,nx=new S,ix=new S,sx=new S;new S;new S;var rx=new S,ox=new S,ax=new S,cx=new S,lx=new S,hx=new S,ux=new S,dx=new S,fx=new S,px=new S,kf=new sn,mx=new S;new S;var gx=new S,Vf=new S,yx=new S,xx=new S,vx=new S,_x=[0],bx=new S,wx=new S,Ka=class{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){let n=e;e=t,t=n}return t<<16|e}set(t,e){let n=this.getKey(t,e),i=this.current,r=0;for(;n>i[r];)r++;if(n!==i[r]){for(let o=i.length-1;o>=r;o--)i[o+1]=i[o];i[r]=n}}tick(){let t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){let n=this.current,i=this.previous,r=n.length,o=i.length,a=0;for(let c=0;c<r;c++){let l=!1,h=n[c];for(;h>i[a];)a++;l=h===i[a],l||Hf(t,h)}a=0;for(let c=0;c<o;c++){let l=!1,h=i[c];for(;h>n[a];)a++;l=n[a]===h,l||Hf(e,h)}}};function Hf(s,t){s.push((t&4294901760)>>16,t&65535)}var Uh=(s,t)=>s<t?`${s}-${t}`:`${t}-${s}`,Zh=class{constructor(){this.data={keys:[]}}get(t,e){let n=Uh(t,e);return this.data[n]}set(t,e,n){let i=Uh(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){let n=Uh(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){let t=this.data,e=t.keys;for(;e.length>0;){let n=e.pop();delete t[n]}}},ja=class extends Ha{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new S,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new S,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new kh,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new Wh,this.constraints=[],this.narrowphase=new Yh(this),this.collisionMatrix=new Va,this.collisionMatrixPrevious=new Va,this.bodyOverlapKeeper=new Ka,this.shapeOverlapKeeper=new Ka,this.contactmaterials=[],this.contactMaterialTable=new Zh,this.defaultMaterial=new $a("default"),this.defaultContactMaterial=new Za(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){let t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){let e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof Xs?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Ln.ALL,n.from=t,n.to=e,n.callback=i,Oh.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Ln.ANY,n.from=t,n.to=e,n.result=i,Oh.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Ln.CLOSEST,n.from=t,n.to=e,n.result=i,Oh.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof te&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;let e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let r=0;r!==n.length;r++)n[r].index=r;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){let e=this.bodies;for(let n=0;n<e.length;n++){let i=e[n].shapes;for(let r=0;r<i.length;r++){let o=i[r];if(o.id===t)return o}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){let e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);let n=Ue.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{let i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;let i=Ue.now(),r=0;for(;this.accumulator>=t&&r<n&&(this.internalStep(t),this.accumulator-=t,r++,!(Ue.now()-i>t*1e3)););this.accumulator=this.accumulator%t;let o=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){let c=this.bodies[a];c.previousPosition.lerp(c.position,o,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,o,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;let e=this.contacts,n=Ax,i=Cx,r=this.bodies.length,o=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,d=te.DYNAMIC,u=-1/0,f=this.constraints,g=Tx;c.length();let y=c.x,m=c.y,p=c.z,v=0;for(l&&(u=Ue.now()),v=0;v!==r;v++){let L=o[v];if(L.type===d){let B=L.force,O=L.mass;B.x+=O*y,B.y+=O*m,B.z+=O*p}}for(let L=0,B=this.subsystems.length;L!==B;L++)this.subsystems[L].update();l&&(u=Ue.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(h.broadphase=Ue.now()-u);let _=f.length;for(v=0;v!==_;v++){let L=f[v];if(!L.collideConnected)for(let B=n.length-1;B>=0;B-=1)(L.bodyA===n[B]&&L.bodyB===i[B]||L.bodyB===n[B]&&L.bodyA===i[B])&&(n.splice(B,1),i.splice(B,1))}this.collisionMatrixTick(),l&&(u=Ue.now());let x=Ex,M=e.length;for(v=0;v!==M;v++)x.push(e[v]);e.length=0;let E=this.frictionEquations.length;for(v=0;v!==E;v++)g.push(this.frictionEquations[v]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,x,this.frictionEquations,g),l&&(h.narrowphase=Ue.now()-u),l&&(u=Ue.now()),v=0;v<this.frictionEquations.length;v++)a.addEquation(this.frictionEquations[v]);let C=e.length;for(let L=0;L!==C;L++){let B=e[L],O=B.bi,D=B.bj,$=B.si,H=B.sj,j;if(O.material&&D.material?j=this.getContactMaterial(O.material,D.material)||this.defaultContactMaterial:j=this.defaultContactMaterial,j.friction,O.material&&D.material&&(O.material.friction>=0&&D.material.friction>=0&&O.material.friction*D.material.friction,O.material.restitution>=0&&D.material.restitution>=0&&(B.restitution=O.material.restitution*D.material.restitution)),a.addEquation(B),O.allowSleep&&O.type===te.DYNAMIC&&O.sleepState===te.SLEEPING&&D.sleepState===te.AWAKE&&D.type!==te.STATIC){let lt=D.velocity.lengthSquared()+D.angularVelocity.lengthSquared(),pt=D.sleepSpeedLimit**2;lt>=pt*2&&(O.wakeUpAfterNarrowphase=!0)}if(D.allowSleep&&D.type===te.DYNAMIC&&D.sleepState===te.SLEEPING&&O.sleepState===te.AWAKE&&O.type!==te.STATIC){let lt=O.velocity.lengthSquared()+O.angularVelocity.lengthSquared(),pt=O.sleepSpeedLimit**2;lt>=pt*2&&(D.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(O,D,!0),this.collisionMatrixPrevious.get(O,D)||(to.body=D,to.contact=B,O.dispatchEvent(to),to.body=O,D.dispatchEvent(to)),this.bodyOverlapKeeper.set(O.id,D.id),this.shapeOverlapKeeper.set($.id,H.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=Ue.now()-u,u=Ue.now()),v=0;v!==r;v++){let L=o[v];L.wakeUpAfterNarrowphase&&(L.wakeUp(),L.wakeUpAfterNarrowphase=!1)}for(_=f.length,v=0;v!==_;v++){let L=f[v];L.update();for(let B=0,O=L.equations.length;B!==O;B++){let D=L.equations[B];a.addEquation(D)}}a.solve(t,this),l&&(h.solve=Ue.now()-u),a.removeAllEquations();let P=Math.pow;for(v=0;v!==r;v++){let L=o[v];if(L.type&d){let B=P(1-L.linearDamping,t),O=L.velocity;O.scale(B,O);let D=L.angularVelocity;if(D){let $=P(1-L.angularDamping,t);D.scale($,D)}}}this.dispatchEvent(Sx),l&&(u=Ue.now());let b=this.stepnumber%(this.quatNormalizeSkip+1)===0,R=this.quatNormalizeFast;for(v=0;v!==r;v++)o[v].integrate(t,b,R);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=Ue.now()-u),this.stepnumber+=1,this.dispatchEvent(Mx);let k=!0;if(this.allowSleep)for(k=!1,v=0;v!==r;v++){let L=o[v];L.sleepTick(this.time),L.sleepState!==te.SLEEPING&&(k=!0)}this.hasActiveBodies=k}emitContactEvents(){let t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(gi,yi),t){for(let r=0,o=gi.length;r<o;r+=2)eo.bodyA=this.getBodyById(gi[r]),eo.bodyB=this.getBodyById(gi[r+1]),this.dispatchEvent(eo);eo.bodyA=eo.bodyB=null}if(e){for(let r=0,o=yi.length;r<o;r+=2)no.bodyA=this.getBodyById(yi[r]),no.bodyB=this.getBodyById(yi[r+1]),this.dispatchEvent(no);no.bodyA=no.bodyB=null}gi.length=yi.length=0;let n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(gi,yi),n){for(let r=0,o=gi.length;r<o;r+=2){let a=this.getShapeById(gi[r]),c=this.getShapeById(gi[r+1]);xi.shapeA=a,xi.shapeB=c,a&&(xi.bodyA=a.body),c&&(xi.bodyB=c.body),this.dispatchEvent(xi)}xi.bodyA=xi.bodyB=xi.shapeA=xi.shapeB=null}if(i){for(let r=0,o=yi.length;r<o;r+=2){let a=this.getShapeById(yi[r]),c=this.getShapeById(yi[r+1]);vi.shapeA=a,vi.shapeB=c,a&&(vi.bodyA=a.body),c&&(vi.bodyB=c.body),this.dispatchEvent(vi)}vi.bodyA=vi.bodyB=vi.shapeA=vi.shapeB=null}}clearForces(){let t=this.bodies,e=t.length;for(let n=0;n!==e;n++){let i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}};new yn;var Oh=new Ln,Ue=globalThis.performance||{};if(!Ue.now){let s=Date.now();Ue.timing&&Ue.timing.navigationStart&&(s=Ue.timing.navigationStart),Ue.now=()=>Date.now()-s}new S;var Mx={type:"postStep"},Sx={type:"preStep"},to={type:te.COLLIDE_EVENT_NAME,body:null,contact:null},Ex=[],Tx=[],Ax=[],Cx=[],gi=[],yi=[],eo={type:"beginContact",bodyA:null,bodyB:null},no={type:"endContact",bodyA:null,bodyB:null},xi={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},vi={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};var so=.03333333333333333,Nn=8,Ja=12,Kf=6.5,jf=5,ce={y:1.44,halfWidth:6.3,bow:-10,stern:14,ramp:20},qe={rifle:{name:"AK-47",damage:18,interval:.115,speed:190,fall:1.5,capacity:30,reload:1.35,life:1.55},rocket:{name:"RPG",damage:86,interval:.84,speed:83,fall:1.75,blast:6.4,capacity:1,reload:2.1,life:5},gun:{name:"Machine gun",damage:17,interval:.13,speed:211,fall:1.2,life:1.8},cannon:{name:"Main cannon",damage:116,interval:2.15,speed:156,fall:2.3,blast:8,life:4},salvo:{name:"Rocket artillery",damage:125,interval:2.3,speed:116,fall:6.5,blast:12.5,life:7},airgun:{name:"Autocannon",damage:27,interval:.095,speed:235,fall:.8,life:2},missile:{name:"Air-to-ground missile",damage:137,interval:2.7,speed:132,fall:1.35,blast:9,life:5.8},ballistic:{name:"Meridian missile",damage:198,interval:12,fall:16,blast:16,life:12}},_i={recon:{name:"Warden Recon",w:2.8,h:1.95,l:5.1,hp:180,mass:1600,speed:28,accel:10,steer:1.6,primary:"gun"},tank:{name:"Bastion Tank",w:3.55,h:2.42,l:6.9,hp:440,mass:8800,speed:17,accel:4.7,steer:1.12,primary:"cannon",secondary:"gun"},launcher:{name:"Lancer Artillery",w:3.16,h:2.8,l:7.35,hp:265,mass:5300,speed:21,accel:5.1,steer:1,primary:"salvo"},ballistic:{name:"Meridian Ballistic Launcher",w:3.45,h:3.06,l:7.98,hp:295,mass:7200,speed:18,accel:4.4,steer:.88,primary:"ballistic"},jet:{name:"Kestrel Fighter",w:8.5,h:2.5,l:12.3,hp:240,mass:4900,speed:109,accel:22,steer:1.04,primary:"airgun",secondary:"missile",rotate:34},transport:{name:"Marlin Landing Ship",w:14.6,h:4.2,l:32,hp:710,mass:15500,speed:14,accel:2.9,steer:.44,primary:"gun"}};function Jh(s=0){return{w:0,s:0,a:0,d:0,yaw:s,pitch:0,up:!1,down:!1,boost:!1,fire:!1,alt:!1,slot:0,action:0,seq:-1}}function Jf(s){if(!s||typeof s!="object"||!Number.isSafeInteger(s.seq)||s.seq<0)return null;let t=e=>Number.isFinite(e)?Math.max(0,Math.min(1,e)):0;return{w:t(s.w),s:t(s.s),a:t(s.a),d:t(s.d),yaw:Number.isFinite(s.yaw)?Math.atan2(Math.sin(s.yaw),Math.cos(s.yaw)):0,pitch:Number.isFinite(s.pitch)?Math.max(-1.45,Math.min(1.35,s.pitch)):0,boost:s.boost===!0,up:s.up===!0,down:s.down===!0,fire:s.fire===!0,alt:s.alt===!0,slot:s.slot===2?2:s.slot===1?1:0,action:Number.isSafeInteger(s.action)?s.action&7:0,seq:s.seq}}var jt={x:486,z:373,water:0},Kt=[{name:"Aster",color:"#73c6ed",side:-1,dockZ:-18},{name:"Veyra",color:"#f39467",side:1,dockZ:18}],Ce=[{id:"A",name:"Aster Command",home:0,x:-351,z:0,radius:26},{id:"B",name:"North Battery",home:0,x:-112,z:-327,radius:24},{id:"C",name:"Breakwater Camp",home:0,x:-112,z:327,radius:24},{id:"D",name:"Veyra Command",home:1,x:351,z:0,radius:26},{id:"E",name:"Ridge Station",home:1,x:112,z:-327,radius:24},{id:"F",name:"South Relay",home:1,x:112,z:327,radius:24}],fe=(s,t,e)=>Math.max(t,Math.min(e,s)),xn=(s,t,e)=>s+(t-s)*e,un=(s,t)=>Math.atan2(Math.sin(s-t),Math.cos(s-t)),ro=(s,t)=>Math.atan2(s,-t),vn=s=>[Math.sin(s),-Math.cos(s)],hn=(s,t,e)=>{let n=fe((e-s)/(t-s),0,1);return n*n*(3-2*n)};function Qh(s){return 147+hn(37,100,Math.abs(s))*(13*Math.sin(s*.037)+10*Math.cos(s*.021))}function Ut(s,t){let e=Math.abs(s),n=Math.abs(t),i=e-Qh(t),r=n-300+7*Math.sin(s*.027),o=Math.max(i,r);if(o<=0)return Math.max(-14,o*.18);let a=hn(0,57,o),c=7+7*Math.sin(s*.023+t*.013)**2+17*Math.sin(t*.016-e*.012)**4,l=hn(220,465,e)*c,h=.1+a*(.9+l)+Math.min(o,12)*.065,d=(1-hn(10,27,Math.abs(e-253)))*(1-hn(135,154,n));h=xn(h,2.1,d*hn(8,21,i));let u=1-hn(3,13,Math.abs(t));h=xn(h,Math.min(.46+o*.039,2.15),u*hn(1,19,i)*(1-d));let f=1-hn(3,16,Math.abs(n-326));if(h=xn(h,1.48,f*hn(0,22,o)),Ce.some(y=>(s-y.x)**2+(t-y.z)**2<31**2)){let y=Ce.find(m=>(s-m.x)**2+(t-m.z)**2<961);h=xn(y.z===0?2.15:1.48,h,hn(18,31,Math.hypot(s-y.x,t-y.z)))}return h}var Ys=[[[-470,-326],[470,-326]],[[-470,326],[470,326]],[[-459,0],[-146,0]],[[146,0],[459,0]],[[-351,-326],[-351,326]],[[351,-326],[351,326]]];function Wi(s){let{side:t,dockZ:e}=Kt[s];return{x:t*122,z:e,yaw:-t*Math.PI/2}}var ti=[...Ce.flatMap(s=>[{x:s.x-20,z:s.z-18,w:8,d:5.5,h:3.3,kind:"bunker",team:s.home},{x:s.x+14,z:s.z+(s.z>0?-19:19),w:7.8,d:3,h:2.5,kind:"crate",team:s.home}]),...Kt.flatMap(({side:s},t)=>[{x:s*294,z:-60,w:27,d:18,h:9,kind:"hangar",team:t},{x:s*405,z:20,w:21,d:15,h:7,kind:"hangar",team:t},{x:s*313,z:57,w:13,d:6,h:4,kind:"crate",team:t}])],Qf=Kt.flatMap(({side:s},t)=>[{type:"recon",team:t,x:s*329,z:12,yaw:-s*Math.PI/2},{type:"recon",team:t,x:s*332,z:-305,yaw:-s*Math.PI/2},{type:"tank",team:t,x:s*313,z:-12,yaw:-s*Math.PI/2},{type:"tank",team:t,x:s*321,z:306,yaw:-s*Math.PI/2},{type:"launcher",team:t,x:s*300,z:15,yaw:-s*Math.PI/2},{type:"jet",team:t,x:s*253,z:118,yaw:0},{type:"jet",team:t,x:s*253,z:-118,yaw:Math.PI},{type:"transport",team:t,...Wi(t)}]).concat(Kt.flatMap(({side:s},t)=>["recon","tank","launcher","ballistic"].map((e,n)=>({type:e,team:t,x:s*338,z:22+n*12,yaw:-s*Math.PI/2,reserve:!0}))));function qi(s){let t=s>>>0;return()=>(t=1664525*t+1013904223>>>0,t/4294967296)}var tp=24,bi=39,tu=30,Xi=Array.from({length:bi*tu},(s,t)=>{let e=(t%bi-(bi-1)/2)*tp,n=(Math.floor(t/bi)-(tu-1)/2)*tp,i=Ut(e,n),r=i>.32&&!ti.some(o=>Math.abs(e-o.x)<o.w/2+5&&Math.abs(n-o.z)<o.d/2+5);return{id:t,x:e,z:n,y:i,clear:r,edges:[]}});for(let s of Xi){if(!s.clear)continue;let t=Math.floor(s.id/bi),e=s.id%bi;for(let n=-1;n<=1;n++)for(let i=-1;i<=1;i++){if(!n&&!i||e+i<0||e+i>=bi||t+n<0||t+n>=tu)continue;let r=Xi[(t+n)*bi+e+i];!r.clear||Math.abs(r.y-s.y)>5.4||n&&i&&(!Xi[s.id+n*bi].clear||!Xi[s.id+i].clear)||s.edges.push(r)}}function ep(s,t){let e,n=1/0;for(let i of Xi){if(!i.clear)continue;let r=(i.x-s)**2+(i.z-t)**2;r>=n||(e=i,n=r)}return e}function ip(s,t,e,n){let i=ep(s,t),r=ep(e,n),o=new Float64Array(Xi.length).fill(1/0),a=new Int32Array(Xi.length).fill(-1),c=new Set([i]),l=h=>Math.hypot(h.x-r.x,h.z-r.z);for(o[i.id]=0;c.size;){let h,d=1/0;for(let u of c){let f=o[u.id]+l(u);f<d&&(h=u,d=f)}if(h===r){let u=[{x:e,z:n}];for(let f=r.id;f>=0;f=a[f])u.push(Xi[f]);return u.reverse()}c.delete(h);for(let u of h.edges){let f=Math.hypot(h.x-u.x,h.z-u.z)+Math.abs(h.y-u.y)*1.8;o[h.id]+f>=o[u.id]||(o[u.id]=o[h.id]+f,a[u.id]=h.id,c.add(u))}}return[]}function np(s,t){let e=Math.hypot(t.x-s.x,t.z-s.z),n=Math.max(1,Math.ceil(e/4)),i=Ut(s.x,s.z);for(let r=1;r<=n;r++){let o=s.x+(t.x-s.x)*r/n,a=s.z+(t.z-s.z)*r/n,c=Ut(o,a);if(c<.29||Math.abs(c-i)>2.5||ti.some(l=>Math.abs(o-l.x)<l.w/2+3.4&&Math.abs(a-l.z)<l.d/2+3.4))return!1;i=c}return!0}function eu(s,t,e,n){let i={x:s,z:t},r={x:e,z:n};if(np(i,r))return[r];let o=ip(s,t,e,n),a=[];for(;o.length;){let c=o.length-1;for(;c>0&&!np(i,o[c]);)c--;i=o[c],a.push(i),o.splice(0,c+1)}return a}function sp(s,t){let e=s.command.guide(t),n=t.vehicle?.body??t.body,{x:i,y:r,z:o}=n.position,a=e?.version??0;if(t.orderVersion!==a&&(t.nextPlan=0,t.orderVersion=a,t.path=[]),e?.stop)t.path=[],t.nextPlan=0;else if(e&&s.time>=t.nextPlan)t.path=eu(i,o,e.x,e.z),t.nextPlan=s.time+4.4+s.random()*1.3;else if(!e&&s.time>=t.nextPlan){let M=function(E){let C=t.index%2===0?-1:1;return Math.hypot(E.x-i,E.z-o)+(E.z*C<0?88:0)+(E.home===t.team?-60:0)},x=s.points.filter(E=>E.owner!==t.team).sort((E,C)=>M(E)-M(C))[0];if(t.path=x?ip(i,o,x.x,x.z):[],t.nextPlan=s.time+3.7+s.random()*1.7,!t.vehicle&&t.index%4===0){let E=s.closestVehicle(t,!0);E&&E.type!=="jet"&&E.type!=="transport"&&s.enter(t,E)}}for(;t.path.length>1&&Math.hypot(t.path[0].x-i,t.path[0].z-o)<9.5;)t.path.shift();let c=t.path[0],l,h=t.vehicle?130:82;for(let x of s.players){if(x.team===t.team||x.dead)continue;let M=(x.vehicle?.body??x.body).position,E=Math.hypot(M.x-i,M.y-r,M.z-o);E>h||Math.abs(M.y-r)>24||(l=M,h=E)}let d=c?ro(c.x-i,c.z-o):t.yaw,u=l?ro(l.x-i,l.z-o)+Math.sin(s.time*7+t.index)*.024:d,f=l?Math.atan2(l.y+.22-r,h):0,g=Math.abs(i)<jt.x-10&&Math.abs(o)<jt.z-9,y=t.path.length===1,m=y?e?.boarding?3.4:e&&t.vehicle?7.2:5.7:5.7,p=c?Math.hypot(c.x-i,c.z-o):0,v=c&&p>m,_=t.input;if(_.yaw=u,_.pitch=f,_.fire=!!(l&&Math.sin(s.time*4.7+t.index)>-.22),t.vehicle?.type==="ballistic"&&(t.vehicle.target=l&&{x:l.x,z:l.z}),_.alt=!1,_.reloading=!1,_.slot=l&&h<48&&!t.vehicle&&t.index%3===0&&t.ammo.rocket>0?2:1,_.boost=!l&&g,t.vehicle){let x=un(d,t.vehicle.yaw);_.a=x<0?fe(-x*2.3,0,1):0,_.d=x>0?fe(x*2.3,0,1):0;let M=e&&y?fe(p*.062,.28,1):1,E=e&&t.vehicle.type==="tank"&&Math.abs(x)>1.1;_.w=v&&!E?Math.max(.12,1-Math.abs(x)*.43)*M:0,_.s=0,l&&_i[t.vehicle.type].secondary&&h<35&&(_.alt=!_.fire)}else{let x=un(d,u),M=v?l&&h<17?.3:1:0;_.w=Math.max(0,Math.cos(x))*M,_.s=Math.max(0,-Math.cos(x))*M,_.d=Math.max(0,Math.sin(x))*M,_.a=Math.max(0,-Math.sin(x))*M}}var oo={min:28,max:415};function ao(s,t){if(!t||!Number.isFinite(t.x)||!Number.isFinite(t.z)||Math.abs(t.x)>jt.x-4||Math.abs(t.z)>jt.z-4)return null;let e=s.body.position,n=t.x-e.x,i=t.z-e.z,r=Math.hypot(n,i);if(r<oo.min||r>oo.max)return null;let o=e.y+2.34,a=Math.max(0,Ut(t.x,t.z)),c=fe(5+r*.0068,5,8),l=(a-o)/c+qe.ballistic.fall*c*.5;return{yaw:ro(n,i),pitch:Math.atan2(l,r/c),x:e.x,y:o,z:e.z,vx:n/c,vy:l,vz:i/c}}function rp(s,t,e){let n=t?.vehicle;return!t?.human||t.dead||n?.type!=="ballistic"||n.driver!==t||n.dead?{error:"Board a Meridian launcher to mark a missile target."}:s.winner!==null?{error:"The round has ended."}:ao(n,e)?(n.target={x:e.x,z:e.z},{message:"Target marked. Stop and fire when the launcher is aligned."}):{error:"Mark a point inside the launcher ring and away from your position."}}function op(s,t){let e=t.input,n=t.vehicle;if(n){e.fire&&(n.type==="ballistic"?Rx(s,t,n):nu(s,t,n.spec.primary,n)),e.alt&&n.spec.secondary&&nu(s,t,n.spec.secondary,n);return}e.slot&&(t.slot=e.slot);let i=t.slot===2?"rocket":"rifle";t.reloadUntil&&s.time>=t.reloadUntil&&(t.ammo[t.reloading]=qe[t.reloading].capacity,t.reloadUntil=0),!t.reloadUntil&&((e.action&4||e.fire&&t.ammo[i]===0)&&t.ammo[i]<qe[i].capacity?(t.reloading=i,t.reloadUntil=s.time+qe[i].reload):e.fire&&t.ammo[i]>0&&nu(s,t,i,t)&&t.ammo[i]--)}function Rx(s,t,e){if((e.cooldowns.ballistic??0)>s.time)return;let n=e.body.position,i=ao(e,e.target),r=Ut(n.x,n.z)>=0||!!e.supportShip;!i||!r||!e.grounded||Math.abs(e.speed)>1.4||Math.abs(e.supportShip?.speed??0)>1.4||Math.abs(un(i.yaw,e.turret))>.06||Math.abs(i.pitch-e.weaponPitch)>.06||(Qa(s,"ballistic",t,e,new S(i.x,i.y,i.z),new S(i.vx,i.vy,i.vz)),e.recoil=1,e.cooldowns.ballistic=s.time+qe.ballistic.interval,t.graceUntil=Math.min(t.graceUntil,s.time))}function nu(s,t,e,n){let i=qe[e];if((n.cooldowns[e]??0)>s.time)return!1;let{x:r,y:o,z:a}=n.body.position,c=Math.hypot(n.body.velocity.x,n.body.velocity.z),l=e==="rifle"?.012+Math.min(.03,c*.004):.006,h=(n.turret??n.yaw)+(s.random()-.5)*l,d=n.weaponPitch??n.pitch,[u,f]=vn(h),g=n.type==="infantry"?.76:n.type==="transport"?4.6:n.type==="jet"?5.7:3.05,y=n.type==="infantry"?.68:n.type==="transport"?3:n.type==="jet"?.28:n.type==="recon"?1.12:1.56,m=new S(r+u*g,o+y+Math.sin(d)*g,a+f*g),p=i.speed*(e==="rocket"?.74:1),v=new S(u*p*Math.cos(d),p*Math.sin(d),f*p*Math.cos(d)),_=n.type==="jet"?1:n.type==="infantry"?.18:.46;return v.addScaledVector(_,n.body.velocity,v),Qa(s,e,t,n,m,v),n.type!=="infantry"&&(n.recoil=e==="cannon"?1:e==="salvo"?.6:.17),n.cooldowns[e]=s.time+i.interval,t.graceUntil=Math.min(t.graceUntil,s.time),!0}function Qa(s,t,e,n,i,r){let o=qe[t],a=t==="rocket"?56:t==="salvo"?34:0;s.projectiles.push({id:++s.serial,kind:t,spec:o,owner:e,source:n,position:i,velocity:r,age:0,boost:a}),s.emit("fire",i,{kind:t,shooter:n?e.id:null})}function Ix(s,t){let e=Math.max(1,Math.ceil(Math.hypot(t.x-s.x,t.z-s.z)/2));function n(r){let o=xn(s.x,t.x,r),a=xn(s.z,t.z,r);return xn(s.y,t.y,r)-Math.max(0,Ut(o,a))}function i(r){let o=xn(s.x,t.x,r),a=xn(s.z,t.z,r);return{point:new S(o,Math.max(0,Ut(o,a)),a),t:r}}if(n(0)<=0)return i(0);for(let r=1;r<=e;r++){let o=r/e;if(n(o)>0)continue;let a=(r-1)/e;for(let c=0;c<8;c++){let l=(a+o)*.5;n(l)>0?a=l:o=l}return i(o)}return null}function ap(s,t){let e=[];for(let n of s.projectiles){let{position:i,velocity:r,spec:o}=n;if(n.age+=t,n.age>o.life)continue;if(n.boost&&n.age<.39){let u=r.length();r.scale(1+t*n.boost/Math.max(u,1),r)}let a=i.addScaledVector(t,r);a.y-=.5*o.fall*t*t,r.y-=o.fall*t;let c=Ix(i,a),l=c?.point??null,h=i.distanceTo(a)*(c?.t??1),d=null;if(s.world.raycastAll(i,a,{skipBackfaces:!0},u=>{let f=u.body.entity;f===n.owner||f===n.source||f?.dead||f?.vehicle||u.distance>h||(h=u.distance,l=u.hitPointWorld.clone(),d=f??null)}),!l){i.copy(a),e.push(n);continue}if(d){let u=!o.blast&&d.type!=="infantry"?.25:1;if(d.type==="tank"){let[f,g]=vn(d.yaw),y=-(f*r.x+g*r.z)/Math.max(1,Math.hypot(r.x,r.z));u*=xn(1.14,.6,fe((y+1)*.5,0,1))}s.damage(d,o.damage*u,n.owner)}o.blast?Px(s,l,o.blast,o.damage*.67,n.owner,d):s.emit("impact",l,{wet:Ut(l.x,l.z)<0})}s.projectiles=e}function Px(s,t,e,n,i,r=null){s.emit("blast",t,{radius:e});for(let o of[...s.vehicles,...s.players]){if(o.dead||o.vehicle||o===r)continue;let a=o.body.position.distanceTo(t);a<e&&s.damage(o,n*(1-a/e)**.68,i)}}var Lx=new S(0,1,0),_n=(s,t,e)=>s+fe(t-s,-e,e);function Zs(s){s.body.quaternion.setFromAxisAngle(Lx,-s.yaw),s.body.aabbNeedsUpdate=!0}function iu(s,t,e){let{x:n,z:i}=s.body.position,r=Math.cos(s.yaw),o=Math.sin(s.yaw);return[n+r*t-o*e,i+o*t+r*e]}function cp(s,t,e){let n=t-s.body.position.x,i=e-s.body.position.z,r=Math.cos(s.yaw),o=Math.sin(s.yaw);return[r*n+o*i,-o*n+r*i]}function su(s){let[t,e]=iu(s,0,ce.stern+ce.ramp-.8);return Ut(t,e)}function co(s,t){let{x:e,y:n,z:i}=t.body.position,r=Ut(e,i),o=null,a=r<-.12?"water":"land";a==="water"&&(r=t.type==="infantry"?-.65:-.72);for(let c of s.ships){if(c.dead)continue;let[l,h]=cp(c,e,i);if(Math.abs(l)>ce.halfWidth-t.halfWidth*.5)continue;let d=c.body.position.y+ce.y,u=h>=ce.bow&&h<=ce.stern,f=c.ramp&&h>ce.stern&&h<=ce.stern+ce.ramp;if(u&&(t.supportShip===c||n>=d+t.halfY-.92))d>r&&(r=d,o=c,a="deck");else if(f){let g=xn(d,Math.max(.06,su(c)),(h-ce.stern)/ce.ramp);g>=r&&n+.88>=g+t.halfY&&(r=g,o=c,a="ramp")}}return{ground:r,ship:o,surface:a}}function lp(s,t,e){let{w:n,s:i,a:r,d:o,boost:a,up:c,yaw:l,pitch:h}=t.input,d=t.body,u=co(s,t),f=u.surface==="water"?4.5:a?10.8:7.25,g=Math.max(1,Math.hypot(n-i,o-r)),[y,m]=vn(l),p=(y*(n-i)-m*(o-r))*f/g,v=(m*(n-i)+y*(o-r))*f/g;d.velocity.x=_n(d.velocity.x,p,e*51),d.velocity.z=_n(d.velocity.z,v,e*51),c&&!t.jumpHeld&&t.grounded&&u.surface!=="water"&&(d.velocity.y=5.5),t.jumpHeld=c,t.yaw=l,t.pitch=h,Zs(t)}function hp(s,t,e){let n=t.driver?.input,i=t.body,r=t.spec;t.recoil*=Math.exp(-e*(t.type==="tank"?5.8:8.1));let o=co(s,t);if(t.type==="jet")Nx(t,n,o,e);else{let a=(n?.w??0)-(n?.s??0)*.39,c=o.surface==="water",l=c?r.accel*.54:r.accel,h=c?4.55:r.speed*(o.ship?.36:1),d=t.speed,u=Math.abs(a)<.05||t.speed*a<-.05;t.speed=_n(t.speed,a*h,e*l*(u?2.25:1));let f=(n?.d??0)-(n?.a??0),g=t.type==="tank"?fe(.61+Math.abs(t.speed)*.023,.61,.99):Math.min(1,Math.abs(t.speed)/3.2);t.yaw+=f*r.steer*g*(t.speed<-.2?-1:1)*e;let[y,m]=vn(t.yaw),p=l*e*(t.type==="tank"?6.5:4.7);i.velocity.x=_n(i.velocity.x,y*t.speed,p),i.velocity.z=_n(i.velocity.z,m*t.speed,p);let{x:v,z:_}=i.position,x=t.halfLength*.72,M=0,E=0;if(o.surface==="land"){M=(Ut(v+y*x,_+m*x)-Ut(v-y*x,_-m*x))/(2*x);let P=t.halfWidth*.74;E=(Ut(v-m*P,_+y*P)-Ut(v+m*P,_-y*P))/(2*P)}else o.surface==="ramp"&&(M=Math.cos(un(t.yaw,o.ship.yaw))*(o.ship.body.position.y+ce.y-su(o.ship))/ce.ramp);t.roll=_n(t.roll,fe(E-f*t.speed*.0022,-.22,.22),.65*e);let C=fe((t.speed-d)/e*.006,-.08,.08);t.pitch=_n(t.pitch,fe(M+C+t.recoil*.022,-.28,.28),e*.9)}if(n){let a=t.type==="ballistic"?ao(t,t.target):null,c=a?.yaw??(t.type==="jet"?t.yaw:n.yaw),l=t.type==="tank"?1.76:2.4;t.turret+=fe(un(c,t.turret),-e*l,e*l);let h=t.type==="jet"?t.pitch:fe(n.pitch,-.55,1.08);t.weaponPitch=t.type==="ballistic"?_n(t.weaponPitch,a?.pitch??.08,e*1.45):h}Zs(t)}function Nx(s,t,e,n){let i=s.body,{spec:r}=s,o=(t?.w??0)-(t?.s??0),a=!s.airborne,c=a?o>0?.6:9.8:1.4+(s.speed/r.speed)**2*3.1;s.speed=fe(s.speed+(o*r.accel*(t?.boost?1.23:1)-c)*n,0,r.speed);let l=(t?.d??0)-(t?.a??0),h=t?.up?.34:t?.down?-.51:(t?.pitch??0)*.32;s.pitch=_n(s.pitch,fe(h,-.58,.5),n*1.08),s.roll=_n(s.roll,s.airborne?-l*.69:0,n*1.65);let d=s.airborne?-Math.sin(s.roll)/.637:l;s.yaw+=d*r.steer*n*Math.min(1,.22+s.speed/45);let[u,f]=vn(s.yaw);if(i.velocity.x=u*s.speed,i.velocity.z=f*s.speed,a&&s.speed>=r.rotate&&s.pitch>.1&&e.surface==="land"&&(s.airborne=!0,i.velocity.y=s.speed*Math.sin(s.pitch)*.63),s.airborne){let g=Math.max(0,r.rotate-7-s.speed)*.43,y=Math.max(0,i.position.y-155)*.75,m=s.speed*Math.sin(s.pitch)-g-y-Math.abs(s.roll)*2.1;i.velocity.y=_n(i.velocity.y,m+.48,n*26)}}function up(s,t){if(t.ramp){if([...s.vehicles,...s.players].some(r=>!r.dead&&r.supportShip===t&&cp(t,r.body.position.x,r.body.position.z)[1]>ce.stern+.35)){s.notice(t.driver,"Clear the ramp first.");return}t.ramp=!1,s.notice(t.driver,"Ramp secured. Transport can move.");return}let e=[Wi(0),Wi(1)];e.push(...e.map(i=>({...i,z:-Math.sign(i.z)*28})));let n=e.filter(i=>s.ships.every(r=>r===t||r.dead||Math.hypot(r.body.position.x-i.x,r.body.position.z-i.z)>25)).sort((i,r)=>{let{x:o,z:a}=t.body.position;return Math.hypot(i.x-o,i.z-a)-Math.hypot(r.x-o,r.z-a)})[0];Math.abs(t.speed)<1.7&&su(t)>.15?(t.ramp=!0,t.speed=0,s.notice(t.driver,"Ramp down. Vehicles can roll off.")):n&&Math.hypot(n.x-t.body.position.x,n.z-t.body.position.z)<64&&Math.abs(t.speed)<7?(t.berth=n,t.speed=0,s.notice(t.driver,"Berthing assist engaged.")):s.notice(t.driver,"Slow down near a marked landing beach.")}function dp(s,t,e){let n=t.body;t.recoil*=Math.exp(-e*8.1);let i=n.position.x,r=n.position.y,o=n.position.z,a=t.yaw,c=t.driver?.input,l=(c?.w??0)-(c?.s??0)*.55,h=(c?.d??0)-(c?.a??0);if(t.berth&&(Math.abs(l)>.12||Math.abs(h)>.12||!t.driver)&&(t.berth=null),t.berth){let g=t.berth,y=g.x-i,m=g.z-o,p=Math.hypot(y,m);if(t.yaw+=fe(un(g.yaw,t.yaw),-.52*e,.52*e),p>.08){let v=Math.min(5.1*e,p),_=i+y/p*v,x=o+m/p*v;s.ships.some(M=>M!==t&&!M.dead&&Math.hypot(M.body.position.x-_,M.body.position.z-x)<21)?(t.berth=null,s.notice(t.driver,"Berth obstructed. Try the other landing lane.")):(n.position.x=_,n.position.z=x)}t.berth&&p<.48&&Math.abs(un(g.yaw,t.yaw))<.05&&(t.berth=null,t.ramp=!0,s.notice(t.driver,"Ramp down. Vehicles can roll off."))}else if(!t.ramp){t.speed=_n(t.speed,l*t.spec.speed,t.spec.accel*e),t.yaw+=h*t.spec.steer*e*(.48+Math.min(.52,Math.abs(t.speed)*.15));let[g,y]=vn(t.yaw),m=i+g*t.speed*e,p=o+y*t.speed*e,v=s.ships.every(_=>_===t||_.dead||Math.hypot(_.body.position.x-m,_.body.position.z-p)>21);Ut(m,p)<-1.4&&Math.abs(m)<jt.x-13&&Math.abs(p)<jt.z-16&&v?(n.position.x=m,n.position.z=p):t.speed=_n(t.speed,0,e*15)}n.position.y=.26+Math.sin(s.time*1.6+t.team*1.6)*.07,t.turret+=fe(un(c?.yaw??t.yaw,t.turret),-e*2.2,e*2.2),t.weaponPitch=fe(c?.pitch??0,-.4,.75),Zs(t);let d=t.yaw-a,u=Math.cos(d),f=Math.sin(d);for(let g of[...s.vehicles,...s.players]){if(g.supportShip!==t||g.dead||g.vehicle)continue;let y=g.body.position,m=y.x-i,p=y.z-o;y.set(n.position.x+u*m-f*p,y.y+n.position.y-r,n.position.z+f*m+u*p),g.yaw+=d,g.turret!==void 0&&(g.turret+=d),g.body.aabbNeedsUpdate=!0}}function ru(s,t){let e=t.body,{ground:n,ship:i,surface:r}=co(s,t),o=n+t.halfY;if(t.grounded=e.position.y<=o+.075&&e.velocity.y<=.52,t.grounded){if(t.type==="jet"&&t.airborne&&(e.velocity.y<-15||r==="water")){s.damage(t,t.hp+1,null);return}e.position.y=o,e.velocity.y=0,t.type==="jet"&&(t.airborne=!1)}t.supportShip=t.grounded?i:null,e.position.x=fe(e.position.x,-jt.x+2,jt.x-2),e.position.z=fe(e.position.z,-jt.z+2,jt.z-2),e.aabbNeedsUpdate=!0}var Dx=["tank","launcher","ballistic"],pp=["rifles-1","rifles-2"],fp=s=>s.fireteam??pp[s.index%2],lo=(s,t)=>Math.hypot(s.x-t.x,s.z-t.z),ei=s=>s.body.position,$s=s=>Math.round(s*10)/10,ou=(s,t)=>Math.abs(s)<=jt.x-4&&Math.abs(t)<=jt.z-4&&Ut(s,t)>.3&&!ti.some(e=>Math.abs(s-e.x)<e.w*.5+3.2&&Math.abs(t-e.z)<e.d*.5+3.2);function Bx(s,t){let n=[],i=Math.ceil(2*Math.max(jt.x,jt.z)/19);for(let r=0;r<=i&&n.length<t;r++)for(let o=-r;o<=r&&n.length<t;o++)for(let a=-r;a<=r&&n.length<t;a++){if(Math.max(Math.abs(a),Math.abs(o))!==r)continue;let c=s.x+a*19,l=s.z+o*19;ou(c,l)&&n.push({x:c,z:l})}return n}var tc=class{constructor(t){this.game=t,this.leaders=[null,null],this.orders=[new Map,new Map],this.groups=[new Map,new Map],this.groupNumber=[0,0],this.boarding=new Map,this.serial=0,this.deployTeam=null}claim(t){this.leaders[t.team]??=t.id}leave(t){let e=t.team;this.leaders[e]===t.id&&(this.leaders[e]=this.game.players.find(n=>n.team===e&&n.human)?.id??null,this.leaders[e]===null&&(this.orders[e].clear(),this.groups[e].clear()))}crewFor(t,e){let n=new Set([...this.orders[t].values()].filter(i=>i.unit!==e).map(i=>i.crew));return this.game.players.filter(i=>i.team===t&&!i.human&&!i.dead&&!i.vehicle&&!n.has(i.id))}closestCrew(t){let e=ei(t);return this.crewFor(t.team,t.id).sort((n,i)=>lo(ei(n),e)-lo(ei(i),e))[0]}squads(t){let e=new Map(pp.map(n=>[n,[]]));for(let n of this.game.players)n.team===t&&n.fireteam&&!e.has(n.fireteam)&&e.set(n.fireteam,[]);for(let n of this.crewFor(t))e.get(fp(n)).push(n);return[...e].map(([n,i],r)=>{let o=i.reduce((a,c)=>(a.x+=ei(c).x/i.length,a.z+=ei(c).z/i.length,a),{x:0,z:0});return{id:n,label:r<2?"Rifle Squad "+(r+1):"Rifle Fireteam "+(r-1),badge:"S"+(r+1),type:"infantry",members:i,at:o,available:i.length>0}})}units(t){let e=0,n=0,i=0,r=this.game.vehicles.filter(o=>o.team===t&&!o.spawn.reserve&&Dx.includes(o.type)).map(o=>{let a=o.type==="tank",c=o.type==="ballistic",l=a?++e:c?++i:++n,h=o.type==="launcher"?"Lancer Missile Launcher":o.spec.name;return{id:o.id,label:h+(a||l>1?" "+l:""),badge:(a?"T":c?"M":"L")+l,type:o.type,vehicle:o,at:ei(o),available:!o.dead&&!o.driver?.human&&!!(o.driver||this.closestCrew(o))}});return[...this.squads(t),...r]}visible(t,e){let n=new Map(e.map(o=>[o.id,o])),i=new Set,r=[...this.groups[t].values()].map(o=>{let a=o.units.map(c=>n.get(c)).filter(Boolean);return a.forEach(c=>i.add(c.id)),{...o,members:a}});return[...e.filter(o=>!i.has(o.id)),...r]}merge(t,e){if(!Array.isArray(e)||e.length<2||new Set(e).size!==e.length)return{error:"Select at least two different units."};let n=new Map(this.visible(t,this.units(t)).map(c=>[c.id,c])),i=e.map(c=>n.get(c));if(i.some(c=>!c))return{error:"Select units under your command."};let r=i.flatMap(c=>c.units??[c.id]);for(let c of e)this.groups[t].delete(c);let o=++this.groupNumber[t],a={id:"group-"+o,label:"Command Group "+o,badge:"G"+o,units:r,order:null};return this.groups[t].set(a.id,a),{message:r.length+" units merged into "+a.label+".",selected:a.id}}orderFor(t,e,n,i=null){return{unit:t.id,kind:e,x:n.x,z:n.z,crew:i,version:++this.serial}}deploy(t){this.deployTeam=t;for(let i of this.units(t).filter(r=>r.vehicle)){let r=this.closestCrew(i.vehicle);r&&(this.game.enter(r,i.vehicle),this.orders[t].set(i.id,this.orderFor(i,"hold",i.at,r.id)))}let e=Kt[t].side,n=this.game.points.filter(i=>i.home===t&&i.z!==0);this.squads(t).forEach((i,r)=>{let o=n[r];i.members.forEach((a,c)=>{let l=o.x+e*9,h=o.z+(c-.5*(i.members.length-1))*4.1;a.body.position.set(l,Ut(l,h)+a.halfY,h),a.body.velocity.setZero(),a.body.aabbNeedsUpdate=!0}),this.orders[t].set(i.id,this.orderFor(i,"hold",o))})}send(t,e){if(e?.kind==="ballistic-target")return rp(this.game,t,e);if(!t?.human||this.leaders[t.team]!==t.id)return{error:"Only your team commander can issue orders."};if(this.game.winner!==null)return{error:"The round has ended."};if(e?.kind==="support")return this.game.support.request(t,e);let n=t.team;if(e?.kind==="merge")return this.merge(n,e.units);if(e?.kind==="split")return this.groups[n].delete(e.unit)?{message:"Group split. Its units kept their orders."}:{error:"Select one of your command groups."};if(!e||!["move","hold","release"].includes(e.kind)||typeof e.unit!="string")return{error:"Choose a unit and an order."};let i=this.visible(n,this.units(n)).find(r=>r.id===e.unit);return i?e.kind==="move"&&(!Number.isFinite(e.x)||!Number.isFinite(e.z)||!ou(e.x,e.z))?{error:"Choose clear land for this unit\u2019s destination."}:i.units?this.sendGroup(n,i,e):this.sendUnit(n,i,e,e):{error:"This unit is outside your command."}}sendUnit(t,e,n,i){let r=this.orders[t];if(n.kind==="release")return r.delete(e.id),{message:e.label+" returned to autonomous control."};if(!e.available)return{error:"This unit is unavailable."};let o=e.vehicle,a=o&&(o.driver??this.closestCrew(o));if(o&&!a)return{error:"No AI crew is available for this vehicle."};let c=n.kind==="move"?i:e.at;return r.set(e.id,this.orderFor(e,n.kind,c,a?.id)),{message:e.label+(n.kind==="move"?" ordered to move.":" ordered to hold position.")}}sendGroup(t,e,n){let i=n.kind==="release"?e.members:e.members.filter(l=>l.available);if(!i.length)return{error:"This group has no available units."};let r=n.kind==="move"?Bx(n,i.length):[];if(n.kind==="move"&&r.length!==i.length)return{error:"There is not enough clear ground for this group."};let o=0;if(i.forEach((l,h)=>{this.sendUnit(t,l,n,r[h]).error||o++}),!o)return{error:"This group has no available crews."};let a=this.groups[t].get(e.id);a.order=n.kind==="release"?null:{kind:n.kind,x:n.x,z:n.z};let c=n.kind==="move"?" moving.":n.kind==="hold"?" holding.":" released to AI.";return{message:o+" of "+e.units.length+" units"+c}}refreshCrews(){this.boarding.clear();for(let t of this.game.vehicles){this.orders[1-t.team].delete(t.id);let e=this.orders[t.team].get(t.id);if(!(!e||t.dead||t.driver?.human))if(t.driver)e.crew=t.driver.id;else{let n=this.game.players.find(i=>i.id===e.crew);(!n||n.human||n.dead||n.vehicle)&&(e.crew=this.closestCrew(t)?.id??null),e.crew&&this.boarding.set(e.crew,{vehicle:t,order:e})}}}guide(t){let e=this.orders[t.team];if(t.vehicle){let c=e.get(t.vehicle.id);return c?{...c,stop:c.kind==="hold"||t.vehicle.supportShip&&!t.vehicle.supportShip.ramp}:null}let n=this.boarding.get(t.id);if(n){let{vehicle:c,order:l}=n;if(!c.dead&&!c.driver&&c.team===t.team){let h=ei(c);return lo(h,ei(t))<5.2&&Math.abs(h.y-ei(t).y)<3&&Math.abs(c.speed)<3?(this.game.enter(t,c),{...l,stop:l.kind==="hold"}):{x:h.x,z:h.z,version:-l.version,boarding:!0}}}let i=e.get(fp(t));if(!i)return null;if(i.kind==="hold")return{...i,stop:!0};let r=t.index*Math.PI*.47,o=i.x+Math.cos(r)*6.9,a=i.z+Math.sin(r)*6.9;return ou(o,a)?{...i,x:o,z:a}:i}reset(){this.orders.forEach(t=>t.clear()),this.groups.forEach(t=>t.clear()),this.groupNumber.fill(0),this.deployTeam!==null&&this.leaders[this.deployTeam]&&this.deploy(this.deployTeam)}snapshot(){return{leaders:[...this.leaders],units:this.leaders.map((t,e)=>{let n=this.units(e).map(i=>{let r=this.orders[e].get(i.id),o=i.vehicle,a="Ready";return o?.dead?a="Respawning":o?.driver?.human?a="Player crew":i.available?o&&r&&!o.driver?a=r.crew?"Crew boarding":"Awaiting crew":o?.supportShip&&!o.supportShip.ramp&&r?.kind==="move"?a="Aboard transport":r?.kind==="hold"?a="Holding":r?.kind==="move"?a=(i.members?i.members.every(l=>lo(ei(l),r)<=13):lo(i.at,r)<=9.5)?"In position":"En route":o?.driver?a="AI crew":i.members&&(a=i.members.length+(i.members.length===1?" soldier":" soldiers")):a=o?"No AI crew":"No AI soldiers",{id:i.id,label:i.label,badge:i.badge,type:i.type,x:$s(i.at.x),z:$s(i.at.z),available:i.available,status:a,order:r&&{kind:r.kind,x:$s(r.x),z:$s(r.z)}}});return this.visible(e,n).map(i=>{if(!i.units)return i;let r=i.members.filter(c=>c.available),o=r.reduce((c,l)=>({x:c.x+l.x/r.length,z:c.z+l.z/r.length}),{x:0,z:0}),a=r.length+" of "+i.units.length+" units ready";return i.order?.kind==="hold"&&(a="Holding \xB7 "+a),i.order?.kind==="move"&&(a=(r.length&&r.every(l=>l.status==="In position")?"In position":"En route")+" \xB7 "+a),{id:i.id,label:i.label,badge:i.badge,type:"group",x:$s(o.x),z:$s(o.z),available:r.length>0,status:a,order:i.order,canRelease:i.members.some(c=>c.order)}})})}}};var ho={rifles:{label:"Rifle fireteam",cost:200},tank:{label:"Tank detachment",cost:350},launcher:{label:"Missile detachment",cost:400},ballistic:{label:"Meridian detachment",cost:625},strike:{label:"Kestrel strike squadron",cost:450}},Fx={capture:250,down:100},Ux=7.2,ec=class{constructor(t){this.game=t,this.credits=[0,0],this.hired=[{},{}],this.queue=[[],[]],this.nextArrival=0,this.strikes=[null,null]}award(t,e){this.credits[t]+=Fx[e]}request(t,e){let n=e.support;if(typeof n!="string"||!Object.hasOwn(ho,n))return{error:"Choose a support unit."};let i=ho[n],r=t.team,o=this.hired[r][n]??0;if(n==="strike"&&this.strikes[r])return{error:"The squadron is still in the air."};if(this.credits[r]<i.cost)return{error:"Earn more requisition points."};let a=i.label+" inbound.";if(n==="strike"){let{x:c,z:l}=e;if(!Number.isFinite(c)||!Number.isFinite(l)||Math.abs(c)>jt.x-12||Math.abs(l)>jt.z-12)return{error:"Mark a point inside the battlefield."};this.strikes[r]={player:t,x:c,z:l,started:this.game.time,launched:0},this.game.emit("support",{x:c,y:Math.max(0,Ut(c,l)),z:l},{team:r,label:"Kestrel squadron inbound"})}else{let c=this.queue[r].length?null:this.freePad(r);c?(this.deploy(r,n,o,c),a=i.label+" arrived at Command."):(this.queue[r].push({type:n,count:o}),a=i.label+" queued. Clear a Command pad for arrival.")}return this.credits[r]-=i.cost,this.hired[r][n]=o+1,{message:a}}freePad(t){let n=Kt[t].side*370,i=[...this.game.vehicles,...this.game.players].filter(r=>!r.dead&&!r.vehicle);for(let r of[23,38,53,68,-53,-69])if(i.every(o=>Math.hypot(o.body.position.x-n,o.body.position.z-r)>8))return{x:n,z:r};return null}deploy(t,e,n,i){let r=this.game,o=Nn+r.players.filter(u=>u.team===t&&u.index>=Nn).length,a="reinforcement-"+(n+1),c=e==="rifles"?2:1,l=[];for(let u=0;u<c;u++){let f=r.addPlayer(t,o+u);f.fireteam=e==="rifles"?a:null;let g=i.x+2.5*u;f.body.position.set(g,Ut(g,i.z)+f.halfY,i.z),f.body.aabbNeedsUpdate=!0,r.players.push(f),l.push(f)}let h=a,d=null;if(e!=="rifles"){let u=r.addVehicle({...i,type:e,team:t,yaw:-Kt[t].side*Math.PI/2,reinforcement:!0},"-support-"+t+"-"+e+"-"+n);r.vehicles.push(u),r.enter(l[0],u),h=u.id,d=l[0].id}r.command.orders[t].set(h,r.command.orderFor({id:h},"hold",i,d))}flight(t,e,n,i){let r=-Kt[e].side;return{id:"strike-"+e+"-"+n,team:e,x:t.x+r*(i*82-282-n*13),y:49+n*4+.8*Math.sin(i),z:t.z+(n-1)*13,yaw:r*Math.PI/2}}tick(){if(this.game.time>=this.nextArrival){this.nextArrival=this.game.time+.4;for(let t=0;t<2;t++){if(!this.queue[t].length)continue;let e=this.freePad(t);if(!e)continue;let{type:n,count:i}=this.queue[t].shift();this.deploy(t,n,i,e);let r=this.game.players.find(o=>o.id===this.game.command.leaders[t]);this.game.notice(r,ho[n].label+" arrived at Command.")}}for(let t=0;t<2;t++){let e=this.strikes[t];if(!e)continue;let n=this.game.time-e.started;if(n>=Ux){this.strikes[t]=null;continue}for(;e.launched<3&&n>=2.2+e.launched*.21;){let i=e.launched++,r=this.flight(e,t,i,n),o=e.x+(i-1)*5,a=e.z+(i-1)*8,c=Math.max(0,Ut(o,a)),l=1.2,h=new S(r.x,r.y-.8,r.z),d=new S((o-h.x)/l,(c-h.y)/l+qe.missile.fall*l*.5,(a-h.z)/l);Qa(this.game,"missile",e.player,null,h,d)}}}snapshot(){let t=this.strikes.flatMap((e,n)=>e?[0,1,2].map(i=>this.flight(e,n,i,this.game.time-e.started)):[]);return{credits:[...this.credits],hired:this.hired.map(e=>({...e})),queued:this.queue.map(e=>e.length),strikes:this.strikes.map(e=>e&&{x:e.x,z:e.z,inbound:e.launched<3}),flights:t}}reset(){this.credits.fill(0),this.hired=[{},{}],this.queue=[[],[]],this.nextArrival=0,this.strikes.fill(null);let t=this.game;for(let e of t.players.filter(n=>n.index>=Nn))e.vehicle&&t.exit(e,!0),t.world.removeBody(e.body);for(let e of t.vehicles.filter(n=>n.spawn.reinforcement))e.driver&&t.exit(e.driver,!0),t.world.removeBody(e.body);t.players=t.players.filter(e=>e.index<Nn),t.vehicles=t.vehicles.filter(e=>!e.spawn.reinforcement)}};var le=s=>Math.round(s*100)/100,au=s=>Math.atan2(Math.sin(s),Math.cos(s)),nc=class{constructor(t=9331){this.time=0,this.serial=0,this.round=1,this.random=qi(t),this.hold=[0,0],this.winner=null,this.finishedAt=0,this.events=[],this.projectiles=[],this.points=Ce.map(e=>({...e,owner:e.home,progress:0,claimant:null,contested:!1})),this.world=new ja({gravity:new S(0,-13,0),allowSleep:!1}),this.world.broadphase=new Wa(this.world),this.world.defaultContactMaterial.friction=.05,this.world.defaultContactMaterial.restitution=.015,this.world.solver.iterations=6;for(let e of ti)this.world.addBody(new te({position:new S(e.x,Ut(e.x,e.z)+e.h*.5,e.z),mass:0,shape:new ms(new S(e.w*.5,e.h*.5,e.d*.5))}));this.vehicles=Qf.map((e,n)=>this.addVehicle(e,n)),this.ships=this.vehicles.filter(e=>e.type==="transport"),this.players=Kt.flatMap((e,n)=>Array.from({length:Nn},(i,r)=>this.addPlayer(n,r))),this.command=new tc(this),this.support=new ec(this)}addBody(t,e,n,i,r){let o=new ms(new S(e/2,n/2,i/2)),a=new te({mass:r,shape:o,linearDamping:.035,fixedRotation:!0});return a.entity=t,this.world.addBody(a),t.body=a,t.halfWidth=e/2,t.halfY=n/2,t.halfLength=i/2,a}addVehicle(t,e){let{type:n,team:i}=t,r=_i[n],o={id:"v"+e,type:n,team:i,spec:r,spawn:t,cooldowns:{},driver:null,supportShip:null};if(n==="transport"){let a=this.addBody(o,r.w,1.38,r.l,0);a.shapeOffsets[0].y=-.51,a.addShape(new ms(new S(4.7,1.37,2.8)),new S(0,2.92,-11.2))}else this.addBody(o,n==="jet"?3.55:r.w,r.h,r.l,r.mass);return this.resetVehicle(o),o}resetVehicle(t){let{x:e,z:n,yaw:i}=t.spawn;t.body.position.set(e,t.type==="transport"?.26:Ut(e,n)+t.halfY,n),t.body.velocity.setZero(),t.body.collisionFilterMask=-1,t.yaw=t.turret=i,t.pitch=t.roll=t.speed=t.weaponPitch=t.recoil=0,t.airborne=t.dead=!1,t.grounded=!0,t.hp=t.spec.hp,t.driver=t.berth=t.supportShip=null,t.target=null,t.ramp=t.type==="transport",t.cooldowns={},Zs(t)}addPlayer(t,e){let n={id:`t${t}p${e}`,type:"infantry",team:t,index:e,human:!1,name:`${Kt[t].name} ${String(e+1).padStart(2,"0")}`,kills:0,deaths:0,score:0};return this.addBody(n,.73,1.77,.73,85),this.spawnPlayer(n,!0),n}spawnPlayer(t,e=!1){let n=this.points.filter(u=>u.home===t.team&&u.owner===t.team),i=this.points[t.team*3],r=(e&&(t.human||t.index<4)?i:n[t.index%Math.max(1,n.length)])??i,o=Kt[t.team].side,a=(t.index-Nn)%35,c=t.index<Nn?8.8+t.index%3*3.1:20+Math.floor(a/7)*3.2,l=t.index<Nn?(t.index-3.5)*3.1:(a%7-3)*3.2,h=n.length||e?r.x-o*c:o*441,d=r.z+l;t.body.position.set(h,Ut(h,d)+t.halfY,d),t.body.velocity.setZero(),t.body.collisionFilterMask=-1,t.yaw=-o*Math.PI/2,t.pitch=0,t.hp=100,t.ammo={rifle:qe.rifle.capacity,rocket:qe.rocket.capacity},t.slot=1,t.reloadUntil=0,t.cooldowns={},t.dead=!1,t.vehicle=null,t.grounded=!0,t.jumpHeld=!1,t.supportShip=null,t.graceUntil=this.time+1.7,t.pendingActions=0,t.lastInput=this.time,t.input={...Jh(t.yaw),seq:t.input?.seq??-1},t.path=[],t.nextPlan=this.time+this.random()*1.75,Zs(t)}join(t,e){let n=[0,1].map(o=>this.players.filter(a=>a.team===o&&a.human).length),i=(e===0||e===1)&&n[e]<Nn?e:n[0]<=n[1]?0:1,r=this.players.find(o=>o.team===i&&o.index<Nn&&!o.human);return r?(r.vehicle&&this.exit(r,!0),r.human=!0,r.name=t||"Operator",r.kills=r.deaths=r.score=0,r.input.seq=-1,this.spawnPlayer(r,!0),this.command.claim(r),r):null}leave(t){t.vehicle&&this.exit(t,!0),t.human=!1,t.name=`${Kt[t.team].name} ${String(t.index+1).padStart(2,"0")}`,t.kills=t.deaths=t.score=0,this.spawnPlayer(t),this.command.leave(t)}input(t,e){let n=Jf(e);!t?.human||!n||n.seq<=t.input.seq||(t.pendingActions|=n.action,t.lastInput=this.time,t.input=n)}closestVehicle(t,e=!1){let n=t.body.position,i=null,r=1/0;for(let o of this.vehicles){if(o.dead||o.driver||Math.abs(o.speed)>3.1||o.airborne||e&&(o.spawn.reserve||t.team!==o.team||o.type==="jet"||o.type==="transport"))continue;let a=Math.hypot(o.body.position.x-n.x,o.body.position.z-n.z),c=o.type==="transport"?18:o.type==="jet"?9:e?12:5.8;a>c||Math.abs(o.body.position.y-n.y)>4.2||a>=r||(i=o,r=a)}return i}enter(t,e){t.dead||t.vehicle||e.dead||e.driver||(e.driver=t,e.type==="ballistic"&&(e.target=null),e.team=t.team,t.vehicle=e,t.supportShip=null,t.body.collisionFilterMask=0,t.body.velocity.setZero(),t.body.position.copy(e.body.position),this.emit("mount",e.body.position,{who:t.id,vehicle:e.id,yaw:e.yaw}))}exit(t,e=!1){let n=t.vehicle;if(!n)return;if(!e&&(n.airborne||Math.abs(n.speed)>(n.type==="transport"?1.8:7.4))){this.notice(t,"Stop on the ground to dismount.");return}let i=t.body,[r,o]=vn(n.yaw),a=n.type==="jet"?4.2:n.halfWidth+.85,[c,l]=n.type==="transport"?iu(n,4.7,3.8):[n.body.position.x-o*a,n.body.position.z+r*a];i.position.set(c,n.body.position.y+t.halfY,l),i.position.y=co(this,t).ground+t.halfY,i.velocity.setZero(),i.collisionFilterMask=-1,i.aabbNeedsUpdate=!0,n.driver=t.vehicle=null,this.emit("dismount",i.position,{who:t.id,yaw:n.yaw})}emit(t,e,n={}){this.events.push({id:++this.serial,t:le(this.time),type:t,x:le(e.x),y:le(e.y),z:le(e.z),...n})}notice(t,e){t?.human&&this.emit("notice",t.body.position,{who:t.id,text:e})}damage(t,e,n){if(!(t.dead||n&&t.team===n.team||(t.graceUntil??0)>this.time)&&(t.hp=Math.max(0,t.hp-e),!(t.hp>0)))if(t.dead=!0,t.supportShip=null,t.body.collisionFilterMask=0,t.body.velocity.setZero(),t.respawnAt=this.time+(t.type==="infantry"?jf:19),t.type!=="infantry"){this.emit("blast",t.body.position,{radius:t.type==="transport"?12:8});let i=t.driver;i&&(this.exit(i,!0),i.graceUntil=0,this.damage(i,150,n))}else t.deaths++,n&&(n.kills++,n.score+=100,this.support.award(n.team,"down")),this.emit("down",t.body.position,{who:t.id,by:n?.name??"Impact",byId:n?.id,name:t.name})}capture(t){for(let e of this.points){let n=[[],[]];for(let r of this.players){if(r.dead||r.vehicle?.type==="transport"||r.vehicle?.airborne)continue;let{x:o,z:a}=(r.vehicle??r).body.position;(o-e.x)**2+(a-e.z)**2<e.radius**2&&n[r.team].push(r)}if(e.contested=n[0].length>0&&n[1].length>0,e.contested)continue;let i=n[0].length?0:n[1].length?1:null;if(i===null||i===e.owner)e.progress=Math.max(0,e.progress-t/10);else if(e.claimant!==i&&(e.progress=0),e.claimant=i,e.progress+=t/Kf*(1+.29*Math.min(3,n[i].length-1)),e.progress>=1){e.owner=i,e.claimant=null,e.progress=0;for(let r of n[i])r.score+=250;this.support.award(i,"capture"),this.emit("captured",{x:e.x,y:Ut(e.x,e.z),z:e.z},{point:e.id,team:i})}e.progress===0&&(e.claimant=null)}for(let e=0;e<2;e++){let n=this.points.every(i=>i.home===e||i.owner===e);this.hold[e]=n?this.hold[e]+t:0,this.hold[e]>=Ja&&this.winner===null&&(this.winner=e,this.finishedAt=this.time,this.emit("won",{x:0,y:0,z:0},{team:e}))}}restart(){this.round++,this.winner=null,this.hold.fill(0),this.projectiles=[],this.support.reset();for(let t of this.points)Object.assign(t,{owner:t.home,claimant:null,contested:!1,progress:0});for(let t of this.vehicles)t.team=t.spawn.team,this.resetVehicle(t);for(let t of this.players)t.kills=t.deaths=t.score=0,this.spawnPlayer(t,!0);this.command.reset()}step(t=so){if(this.time+=t,this.events=this.events.filter(e=>this.time-e.t<1.3),this.winner===null){this.command.refreshCrews();for(let e of this.players){if(e.dead){e.respawnAt<=this.time&&this.spawnPlayer(e);continue}if(e.human||sp(this,e),e.human&&this.time-e.lastInput>.7&&(e.input={...Jh(e.yaw),seq:e.input.seq}),e.input.action=e.pendingActions,e.pendingActions=0,e.input.action&1)if(e.vehicle)this.exit(e);else{let n=this.closestVehicle(e);n&&this.enter(e,n)}e.input.action&2&&e.vehicle?.type==="transport"&&up(this,e.vehicle),e.vehicle||lp(this,e,t),op(this,e)}for(let e of this.vehicles){if(e.dead){if(e.respawnAt<=this.time){if(e.spawn.reinforcement){let n=this.support.freePad(e.spawn.team);if(!n){e.respawnAt=this.time+.8;continue}Object.assign(e.spawn,n)}e.team=e.spawn.team,this.resetVehicle(e)}continue}e.type==="transport"?dp(this,e,t):hp(this,e,t)}this.world.step(t);for(let e of this.vehicles)!e.dead&&e.type!=="transport"&&ru(this,e);for(let e of this.players)e.dead||(e.vehicle?(e.body.position.copy(e.vehicle.body.position),e.body.velocity.setZero()):ru(this,e));ap(this,t),this.support.tick(),this.capture(t)}}snapshot(){return{time:le(this.time),round:this.round,hold:this.hold.map(le),winner:this.winner,command:this.command.snapshot(),support:this.support.snapshot(),points:this.points.map(t=>[t.owner,t.claimant,le(t.progress),t.contested]),players:this.players.map(t=>{let{x:e,y:n,z:i}=t.body.position;return[t.id,t.team,t.name,le(e),le(n),le(i),le(au(t.yaw)),le(t.pitch),Math.ceil(t.hp),t.vehicle?.id??null,t.dead?le(t.respawnAt):null,t.human,t.kills,t.deaths,t.score,t.slot,t.ammo.rifle,t.ammo.rocket,le(t.reloadUntil),le(Math.hypot(t.body.velocity.x,t.body.velocity.z)),t.body.position.y<.41,t.dead||t.vehicle?null:this.closestVehicle(t)?.id??null]}),vehicles:this.vehicles.map(t=>{let{x:e,y:n,z:i}=t.body.position;return[t.id,t.type,t.team,le(e),le(n),le(i),le(au(t.yaw)),le(t.pitch),Math.ceil(t.hp),t.driver?.id??null,t.dead,le(au(t.turret)),le(t.roll),le(t.speed),t.airborne,t.ramp,t.berth!==null,le(t.weaponPitch),t.supportShip?.id??null,le(t.recoil),t.target,t.type==="ballistic"?t.cooldowns.ballistic??0:0]}),shots:this.projectiles.map(t=>[t.id,t.kind,le(t.position.x),le(t.position.y),le(t.position.z),le(t.velocity.x),le(t.velocity.y),le(t.velocity.z)]),events:this.events}}};var Yp=0,Xu=1,Zp=2;var Yu=1,ll=2,li=3,Ri=0,Ye=1,Ze=2,Di=0,Ii=1,Tr=2,Zu=3,$u=4,$p=5,ts=100,Kp=101,jp=102,Jp=103,Qp=104,tm=200,em=201,nm=202,im=203,Pc=204,Lc=205,sm=206,rm=207,om=208,am=209,cm=210,lm=211,hm=212,um=213,dm=214,hl=0,ul=1,dl=2,ws=3,fl=4,pl=5,ml=6,gl=7,Ku=0,fm=1,pm=2,Bi=0,mm=1,gm=2,ym=3,yl=4,xm=5,vm=6,_m=7;var ju=300,Rs=301,Is=302,xl=303,vl=304,ua=306,pr=1e3,Qi=1001,Nc=1002,dn=1003,bm=1004;var da=1005;var Mn=1006,_l=1007;var rs=1008;var Yn=1009,Ju=1010,Qu=1011,Ar=1012,bl=1013,os=1014,Zn=1015,Cr=1016,wl=1017,Ml=1018,Rr=1020,td=35902,ed=1021,nd=1022,Bn=1023,mr=1026,Ir=1027,Pr=1028,Sl=1029,id=1030,El=1031;var Tl=1033,fa=33776,pa=33777,ma=33778,ga=33779,Al=35840,Cl=35841,Rl=35842,Il=35843,Pl=36196,Ll=37492,Nl=37496,Dl=37808,Bl=37809,Fl=37810,Ul=37811,Ol=37812,zl=37813,kl=37814,Vl=37815,Hl=37816,Gl=37817,Wl=37818,ql=37819,Xl=37820,Yl=37821,ya=36492,Zl=36494,$l=36495,sd=36283,Kl=36284,jl=36285,Jl=36286;var Ao=2300,Dc=2301,Ic=2302,Bu=2400,Fu=2401,Uu=2402;var wm=3200,Mm=3201;var rd=0,Sm=1,Fi="",Xe="srgb",Ms="srgb-linear",Co="linear",me="srgb";var _s=7680;var Ou=519,Em=512,Tm=513,Am=514,od=515,Cm=516,Rm=517,Im=518,Pm=519,Bc=35044,Ql=35048;var ad="300 es",Wn=2e3,Ro=2001;var Pi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},Ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mp=1234567,Mo=Math.PI/180,gr=180/Math.PI;function ii(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ke[s&255]+Ke[s>>8&255]+Ke[s>>16&255]+Ke[s>>24&255]+"-"+Ke[t&255]+Ke[t>>8&255]+"-"+Ke[t>>16&15|64]+Ke[t>>24&255]+"-"+Ke[e&63|128]+Ke[e>>8&255]+"-"+Ke[e>>16&255]+Ke[e>>24&255]+Ke[n&255]+Ke[n>>8&255]+Ke[n>>16&255]+Ke[n>>24&255]).toLowerCase()}function ee(s,t,e){return Math.max(t,Math.min(e,s))}function cd(s,t){return(s%t+t)%t}function Ox(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function zx(s,t,e){return s!==t?(e-s)/(t-s):0}function So(s,t,e){return(1-e)*s+e*t}function kx(s,t,e,n){return So(s,t,1-Math.exp(-e*n))}function Vx(s,t=1){return t-Math.abs(cd(s,t*2)-t)}function Hx(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Gx(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Wx(s,t){return s+Math.floor(Math.random()*(t-s+1))}function qx(s,t){return s+Math.random()*(t-s)}function Xx(s){return s*(.5-Math.random())}function Yx(s){s!==void 0&&(mp=s);let t=mp+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Zx(s){return s*Mo}function $x(s){return s*gr}function Kx(s){return(s&s-1)===0&&s!==0}function jx(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Jx(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Qx(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,c*d,c*u,a*l);break;case"YZY":s.set(c*u,a*h,c*d,a*l);break;case"ZXZ":s.set(c*d,c*u,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Gn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function pe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Fn={DEG2RAD:Mo,RAD2DEG:gr,generateUUID:ii,clamp:ee,euclideanModulo:cd,mapLinear:Ox,inverseLerp:zx,lerp:So,damp:kx,pingpong:Vx,smoothstep:Hx,smootherstep:Gx,randInt:Wx,randFloat:qx,randFloatSpread:Xx,seededRandom:Yx,degToRad:Zx,radToDeg:$x,isPowerOfTwo:Kx,ceilPowerOfTwo:jx,floorPowerOfTwo:Jx,setQuaternionFromProperEuler:Qx,normalize:pe,denormalize:Gn},ut=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Li=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],g=r[o+2],y=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=y;return}if(d!==y||c!==u||l!==f||h!==g){let m=1-a,p=c*u+l*f+h*g+d*y,v=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let M=Math.sqrt(_),E=Math.atan2(M,p*v);m=Math.sin(m*E)/M,a=Math.sin(a*E)/M}let x=a*v;if(c=c*m+u*x,l=l*m+f*x,h=h*m+g*x,d=d*m+y*x,m===1-a){let M=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=M,l*=M,h*=M,d*=M}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-a*f,t[e+2]=l*g+h*f+a*u-c*d,t[e+3]=h*g-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),d=a(r/2),u=c(n/2),f=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=i+c*d+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return cu.copy(this).projectOnVector(t),this.sub(cu)}reflect(t){return this.sub(cu.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},cu=new F,gp=new Li,Yt=class s{constructor(t,e,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],y=i[0],m=i[3],p=i[6],v=i[1],_=i[4],x=i[7],M=i[2],E=i[5],C=i[8];return r[0]=o*y+a*v+c*M,r[3]=o*m+a*_+c*E,r[6]=o*p+a*x+c*C,r[1]=l*y+h*v+d*M,r[4]=l*m+h*_+d*E,r[7]=l*p+h*x+d*C,r[2]=u*y+f*v+g*M,r[5]=u*m+f*_+g*E,r[8]=u*p+f*x+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*r,f=l*r-o*c,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return t[0]=d*y,t[1]=(i*l-h*n)*y,t[2]=(a*n-i*o)*y,t[3]=u*y,t[4]=(h*e-i*c)*y,t[5]=(i*r-a*e)*y,t[6]=f*y,t[7]=(n*c-l*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(lu.makeScale(t,e)),this}rotate(t){return this.premultiply(lu.makeRotation(-t)),this}translate(t,e){return this.premultiply(lu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},lu=new Yt;function ld(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Io(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Lm(){let s=Io("canvas");return s.style.display="block",s}var yp={};function Ss(s){s in yp||(yp[s]=!0,console.warn(s))}function Nm(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var xp=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vp=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tv(){let s={enabled:!0,workingColorSpace:Ms,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===me&&(i.r=Ci(i.r),i.g=Ci(i.g),i.b=Ci(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===me&&(i.r=fr(i.r),i.g=fr(i.g),i.b=fr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Fi?Co:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Ss("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Ss("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ms]:{primaries:t,whitePoint:n,transfer:Co,toXYZ:xp,fromXYZ:vp,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Xe},outputColorSpaceConfig:{drawingBufferColorSpace:Xe}},[Xe]:{primaries:t,whitePoint:n,transfer:me,toXYZ:xp,fromXYZ:vp,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Xe}}}),s}var oe=tv();function Ci(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function fr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ks,Fc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ks===void 0&&(Ks=Io("canvas")),Ks.width=t.width,Ks.height=t.height;let i=Ks.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Ks}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Io("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ci(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ci(e[n]/255)*255):e[n]=Ci(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ev=0,yr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ev++}),this.uuid=ii(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(hu(i[o].image)):r.push(hu(i[o]))}else r=hu(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function hu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Fc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var nv=0,uu=new F,on=class s extends Pi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=Qi,i=Qi,r=Mn,o=rs,a=Bn,c=Yn,l=s.DEFAULT_ANISOTROPY,h=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nv++}),this.uuid=ii(),this.name="",this.source=new yr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(uu).x}get height(){return this.source.getSize(uu).y}get depth(){return this.source.getSize(uu).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ju)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pr:t.x=t.x-Math.floor(t.x);break;case Qi:t.x=t.x<0?0:1;break;case Nc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pr:t.y=t.y-Math.floor(t.y);break;case Qi:t.y=t.y<0?0:1;break;case Nc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=ju;on.DEFAULT_ANISOTROPY=1;var Ie=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],y=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(l+1)/2,x=(f+1)/2,M=(p+1)/2,E=(h+u)/4,C=(d+y)/4,P=(g+m)/4;return _>x&&_>M?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=E/n,r=C/n):x>M?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=E/i,r=P/i):M<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(M),n=C/r,i=P/r),this.set(n,i,r,e),this}let v=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-y)/v,this.z=(u-h)/v,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Uc=class extends Pi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e);let i={width:t,height:e,depth:n.depth},r=new on(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:Mn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new yr(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},si=class extends Uc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Po=class extends on{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=dn,this.minFilter=dn,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Oc=class extends on{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=dn,this.minFilter=dn,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ri=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,kn):kn.fromBufferAttribute(r,o),kn.applyMatrix4(t.matrixWorld),this.expandByPoint(kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ic.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ic.copy(n.boundingBox)),ic.applyMatrix4(t.matrixWorld),this.union(ic)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,kn),kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(uo),sc.subVectors(this.max,uo),js.subVectors(t.a,uo),Js.subVectors(t.b,uo),Qs.subVectors(t.c,uo),Yi.subVectors(Js,js),Zi.subVectors(Qs,Js),gs.subVectors(js,Qs);let e=[0,-Yi.z,Yi.y,0,-Zi.z,Zi.y,0,-gs.z,gs.y,Yi.z,0,-Yi.x,Zi.z,0,-Zi.x,gs.z,0,-gs.x,-Yi.y,Yi.x,0,-Zi.y,Zi.x,0,-gs.y,gs.x,0];return!du(e,js,Js,Qs,sc)||(e=[1,0,0,0,1,0,0,0,1],!du(e,js,Js,Qs,sc))?!1:(rc.crossVectors(Yi,Zi),e=[rc.x,rc.y,rc.z],du(e,js,Js,Qs,sc))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},wi=[new F,new F,new F,new F,new F,new F,new F,new F],kn=new F,ic=new ri,js=new F,Js=new F,Qs=new F,Yi=new F,Zi=new F,gs=new F,uo=new F,sc=new F,rc=new F,ys=new F;function du(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ys.fromArray(s,r);let a=i.x*Math.abs(ys.x)+i.y*Math.abs(ys.y)+i.z*Math.abs(ys.z),c=t.dot(ys),l=e.dot(ys),h=n.dot(ys);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var iv=new ri,fo=new F,fu=new F,Ni=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):iv.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fo.subVectors(t,this.center);let e=fo.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(fo,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fo.copy(t.center).add(fu)),this.expandByPoint(fo.copy(t.center).sub(fu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Mi=new F,pu=new F,oc=new F,$i=new F,mu=new F,ac=new F,gu=new F,Lo=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mi.copy(this.origin).addScaledVector(this.direction,e),Mi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){pu.copy(t).add(e).multiplyScalar(.5),oc.copy(e).sub(t).normalize(),$i.copy(this.origin).sub(pu);let r=t.distanceTo(e)*.5,o=-this.direction.dot(oc),a=$i.dot(this.direction),c=-$i.dot(oc),l=$i.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*c-a,u=o*a-c,g=r*h,d>=0)if(u>=-g)if(u<=g){let y=1/h;d*=y,u*=y,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(pu).addScaledVector(oc,u),f}intersectSphere(t,e){Mi.subVectors(t.center,this.origin);let n=Mi.dot(this.direction),i=Mi.dot(Mi)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Mi)!==null}intersectTriangle(t,e,n,i,r){mu.subVectors(e,t),ac.subVectors(n,t),gu.crossVectors(mu,ac);let o=this.direction.dot(gu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$i.subVectors(this.origin,t);let c=a*this.direction.dot(ac.crossVectors($i,ac));if(c<0)return null;let l=a*this.direction.dot(mu.cross($i));if(l<0||c+l>o)return null;let h=-a*$i.dot(gu);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ve=class s{constructor(t,e,n,i,r,o,a,c,l,h,d,u,f,g,y,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,h,d,u,f,g,y,m)}set(t,e,n,i,r,o,a,c,l,h,d,u,f,g,y,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/tr.setFromMatrixColumn(t,0).length(),r=1/tr.setFromMatrixColumn(t,1).length(),o=1/tr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,g=a*h,y=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-y*l,e[9]=-a*c,e[2]=y-u*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){let u=c*h,f=c*d,g=l*h,y=l*d;e[0]=u+y*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=y+u*a,e[10]=o*c}else if(t.order==="ZXY"){let u=c*h,f=c*d,g=l*h,y=l*d;e[0]=u-y*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=y-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let u=o*h,f=o*d,g=a*h,y=a*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+y,e[1]=c*d,e[5]=y*l+u,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let u=o*c,f=o*l,g=a*c,y=a*l;e[0]=c*h,e[4]=y-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-y*d}else if(t.order==="XZY"){let u=o*c,f=o*l,g=a*c,y=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+y,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=y*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sv,t,rv)}lookAt(t,e,n){let i=this.elements;return bn.subVectors(t,e),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Ki.crossVectors(n,bn),Ki.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Ki.crossVectors(n,bn)),Ki.normalize(),cc.crossVectors(bn,Ki),i[0]=Ki.x,i[4]=cc.x,i[8]=bn.x,i[1]=Ki.y,i[5]=cc.y,i[9]=bn.y,i[2]=Ki.z,i[6]=cc.z,i[10]=bn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],y=n[6],m=n[10],p=n[14],v=n[3],_=n[7],x=n[11],M=n[15],E=i[0],C=i[4],P=i[8],T=i[12],b=i[1],R=i[5],k=i[9],L=i[13],B=i[2],O=i[6],D=i[10],$=i[14],H=i[3],j=i[7],lt=i[11],pt=i[15];return r[0]=o*E+a*b+c*B+l*H,r[4]=o*C+a*R+c*O+l*j,r[8]=o*P+a*k+c*D+l*lt,r[12]=o*T+a*L+c*$+l*pt,r[1]=h*E+d*b+u*B+f*H,r[5]=h*C+d*R+u*O+f*j,r[9]=h*P+d*k+u*D+f*lt,r[13]=h*T+d*L+u*$+f*pt,r[2]=g*E+y*b+m*B+p*H,r[6]=g*C+y*R+m*O+p*j,r[10]=g*P+y*k+m*D+p*lt,r[14]=g*T+y*L+m*$+p*pt,r[3]=v*E+_*b+x*B+M*H,r[7]=v*C+_*R+x*O+M*j,r[11]=v*P+_*k+x*D+M*lt,r[15]=v*T+_*L+x*$+M*pt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],y=t[7],m=t[11],p=t[15];return g*(+r*c*d-i*l*d-r*a*u+n*l*u+i*a*f-n*c*f)+y*(+e*c*f-e*l*u+r*o*u-i*o*f+i*l*h-r*c*h)+m*(+e*l*d-e*a*f-r*o*d+n*o*f+r*a*h-n*l*h)+p*(-i*a*h-e*c*d+e*a*u+i*o*d-n*o*u+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],y=t[13],m=t[14],p=t[15],v=d*m*l-y*u*l+y*c*f-a*m*f-d*c*p+a*u*p,_=g*u*l-h*m*l-g*c*f+o*m*f+h*c*p-o*u*p,x=h*y*l-g*d*l+g*a*f-o*y*f-h*a*p+o*d*p,M=g*d*c-h*y*c-g*a*u+o*y*u+h*a*m-o*d*m,E=e*v+n*_+i*x+r*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/E;return t[0]=v*C,t[1]=(y*u*r-d*m*r-y*i*f+n*m*f+d*i*p-n*u*p)*C,t[2]=(a*m*r-y*c*r+y*i*l-n*m*l-a*i*p+n*c*p)*C,t[3]=(d*c*r-a*u*r-d*i*l+n*u*l+a*i*f-n*c*f)*C,t[4]=_*C,t[5]=(h*m*r-g*u*r+g*i*f-e*m*f-h*i*p+e*u*p)*C,t[6]=(g*c*r-o*m*r-g*i*l+e*m*l+o*i*p-e*c*p)*C,t[7]=(o*u*r-h*c*r+h*i*l-e*u*l-o*i*f+e*c*f)*C,t[8]=x*C,t[9]=(g*d*r-h*y*r-g*n*f+e*y*f+h*n*p-e*d*p)*C,t[10]=(o*y*r-g*a*r+g*n*l-e*y*l-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*d*r-h*n*l+e*d*l+o*n*f-e*a*f)*C,t[12]=M*C,t[13]=(h*y*i-g*d*i+g*n*u-e*y*u-h*n*m+e*d*m)*C,t[14]=(g*a*i-o*y*i-g*n*c+e*y*c+o*n*m-e*a*m)*C,t[15]=(o*d*i-h*a*i+h*n*c-e*d*c-o*n*u+e*a*u)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,d=a+a,u=r*l,f=r*h,g=r*d,y=o*h,m=o*d,p=a*d,v=c*l,_=c*h,x=c*d,M=n.x,E=n.y,C=n.z;return i[0]=(1-(y+p))*M,i[1]=(f+x)*M,i[2]=(g-_)*M,i[3]=0,i[4]=(f-x)*E,i[5]=(1-(u+p))*E,i[6]=(m+v)*E,i[7]=0,i[8]=(g+_)*C,i[9]=(m-v)*C,i[10]=(1-(u+y))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=tr.set(i[0],i[1],i[2]).length(),o=tr.set(i[4],i[5],i[6]).length(),a=tr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Vn.copy(this);let l=1/r,h=1/o,d=1/a;return Vn.elements[0]*=l,Vn.elements[1]*=l,Vn.elements[2]*=l,Vn.elements[4]*=h,Vn.elements[5]*=h,Vn.elements[6]*=h,Vn.elements[8]*=d,Vn.elements[9]*=d,Vn.elements[10]*=d,e.setFromRotationMatrix(Vn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Wn,c=!1){let l=this.elements,h=2*r/(e-t),d=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),g,y;if(c)g=r/(o-r),y=o*r/(o-r);else if(a===Wn)g=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ro)g=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Wn,c=!1){let l=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i),g,y;if(c)g=1/(o-r),y=o/(o-r);else if(a===Wn)g=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ro)g=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},tr=new F,Vn=new ve,sv=new F(0,0,0),rv=new F(1,1,1),Ki=new F,cc=new F,bn=new F,_p=new ve,bp=new Li,qn=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ee(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return _p.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_p,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bp.setFromEuler(this),this.setFromQuaternion(bp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};qn.DEFAULT_ORDER="XYZ";var No=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ov=0,wp=new F,er=new Li,Si=new ve,lc=new F,po=new F,av=new F,cv=new Li,Mp=new F(1,0,0),Sp=new F(0,1,0),Ep=new F(0,0,1),Tp={type:"added"},lv={type:"removed"},nr={type:"childadded",child:null},yu={type:"childremoved",child:null},Fe=class s extends Pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ov++}),this.uuid=ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new F,e=new qn,n=new Li,i=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ve},normalMatrix:{value:new Yt}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new No,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return er.setFromAxisAngle(t,e),this.quaternion.multiply(er),this}rotateOnWorldAxis(t,e){return er.setFromAxisAngle(t,e),this.quaternion.premultiply(er),this}rotateX(t){return this.rotateOnAxis(Mp,t)}rotateY(t){return this.rotateOnAxis(Sp,t)}rotateZ(t){return this.rotateOnAxis(Ep,t)}translateOnAxis(t,e){return wp.copy(t).applyQuaternion(this.quaternion),this.position.add(wp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Mp,t)}translateY(t){return this.translateOnAxis(Sp,t)}translateZ(t){return this.translateOnAxis(Ep,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?lc.copy(t):lc.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),po.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(po,lc,this.up):Si.lookAt(lc,po,this.up),this.quaternion.setFromRotationMatrix(Si),i&&(Si.extractRotation(i.matrixWorld),er.setFromRotationMatrix(Si),this.quaternion.premultiply(er.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Tp),nr.child=t,this.dispatchEvent(nr),nr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lv),yu.child=t,this.dispatchEvent(yu),yu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Si.multiply(t.parent.matrixWorld)),t.applyMatrix4(Si),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Tp),nr.child=t,this.dispatchEvent(nr),nr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(po,t,av),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(po,cv,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Fe.DEFAULT_UP=new F(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Hn=new F,Ei=new F,xu=new F,Ti=new F,ir=new F,sr=new F,Ap=new F,vu=new F,_u=new F,bu=new F,wu=new Ie,Mu=new Ie,Su=new Ie,Ai=class s{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Hn.subVectors(t,e),i.cross(Hn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Hn.subVectors(i,e),Ei.subVectors(n,e),xu.subVectors(t,e);let o=Hn.dot(Hn),a=Hn.dot(Ei),c=Hn.dot(xu),l=Ei.dot(Ei),h=Ei.dot(xu),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(l*c-a*h)*u,g=(o*h-a*c)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,Ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ti.x),c.addScaledVector(o,Ti.y),c.addScaledVector(a,Ti.z),c)}static getInterpolatedAttribute(t,e,n,i,r,o){return wu.setScalar(0),Mu.setScalar(0),Su.setScalar(0),wu.fromBufferAttribute(t,e),Mu.fromBufferAttribute(t,n),Su.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(wu,r.x),o.addScaledVector(Mu,r.y),o.addScaledVector(Su,r.z),o}static isFrontFacing(t,e,n,i){return Hn.subVectors(n,e),Ei.subVectors(t,e),Hn.cross(Ei).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Hn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Hn.cross(Ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;ir.subVectors(i,n),sr.subVectors(r,n),vu.subVectors(t,n);let c=ir.dot(vu),l=sr.dot(vu);if(c<=0&&l<=0)return e.copy(n);_u.subVectors(t,i);let h=ir.dot(_u),d=sr.dot(_u);if(h>=0&&d<=h)return e.copy(i);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ir,o);bu.subVectors(t,r);let f=ir.dot(bu),g=sr.dot(bu);if(g>=0&&f<=g)return e.copy(r);let y=f*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(sr,a);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Ap.subVectors(r,i),a=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(Ap,a);let p=1/(m+y+u);return o=y*p,a=u*p,e.copy(n).addScaledVector(ir,o).addScaledVector(sr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Dm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},hc={h:0,s:0,l:0};function Eu(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Gt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=oe.workingColorSpace){if(t=cd(t,1),e=ee(e,0,1),n=ee(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Eu(o,r,t+1/3),this.g=Eu(o,r,t),this.b=Eu(o,r,t-1/3)}return oe.colorSpaceToWorking(this,i),this}setStyle(t,e=Xe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Xe){let n=Dm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}copyLinearToSRGB(t){return this.r=fr(t.r),this.g=fr(t.g),this.b=fr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Xe){return oe.workingToColorSpace(je.copy(this),t),Math.round(ee(je.r*255,0,255))*65536+Math.round(ee(je.g*255,0,255))*256+Math.round(ee(je.b*255,0,255))}getHexString(t=Xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(je.copy(this),e);let n=je.r,i=je.g,r=je.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=Xe){oe.workingToColorSpace(je.copy(this),t);let e=je.r,n=je.g,i=je.b;return t!==Xe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ji),this.setHSL(ji.h+t,ji.s+e,ji.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ji),t.getHSL(hc);let n=So(ji.h,hc.h,e),i=So(ji.s,hc.s,e),r=So(ji.l,hc.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},je=new Gt;Gt.NAMES=Dm;var hv=0,oi=class extends Pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hv++}),this.uuid=ii(),this.name="",this.type="Material",this.blending=Ii,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pc,this.blendDst=Lc,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ou,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_s,this.stencilZFail=_s,this.stencilZPass=_s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(n.blending=this.blending),this.side!==Ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pc&&(n.blendSrc=this.blendSrc),this.blendDst!==Lc&&(n.blendDst=this.blendDst),this.blendEquation!==ts&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ou&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_s&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_s&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_s&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Es=class extends oi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Ku,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var De=new F,uc=new ut,uv=0,Be=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:uv++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Bc,this.updateRanges=[],this.gpuType=Zn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)uc.fromBufferAttribute(this,e),uc.applyMatrix3(t),this.setXY(e,uc.x,uc.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix3(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array),r=pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Bc&&(t.usage=this.usage),t}};var Do=class extends Be{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Bo=class extends Be{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ge=class extends Be{constructor(t,e,n){super(new Float32Array(t),e,n)}},dv=0,Dn=new ve,Tu=new Fe,rr=new F,wn=new ri,mo=new ri,He=new F,Oe=class s extends Pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dv++}),this.uuid=ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ld(t)?Bo:Do)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Dn.makeRotationFromQuaternion(t),this.applyMatrix4(Dn),this}rotateX(t){return Dn.makeRotationX(t),this.applyMatrix4(Dn),this}rotateY(t){return Dn.makeRotationY(t),this.applyMatrix4(Dn),this}rotateZ(t){return Dn.makeRotationZ(t),this.applyMatrix4(Dn),this}translate(t,e,n){return Dn.makeTranslation(t,e,n),this.applyMatrix4(Dn),this}scale(t,e,n){return Dn.makeScale(t,e,n),this.applyMatrix4(Dn),this}lookAt(t){return Tu.lookAt(t),Tu.updateMatrix(),this.applyMatrix4(Tu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rr).negate(),this.translate(rr.x,rr.y,rr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ge(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];wn.setFromBufferAttribute(r),this.morphTargetsRelative?(He.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(He),He.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(He)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ni);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(wn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];mo.setFromBufferAttribute(a),this.morphTargetsRelative?(He.addVectors(wn.min,mo.min),wn.expandByPoint(He),He.addVectors(wn.max,mo.max),wn.expandByPoint(He)):(wn.expandByPoint(mo.min),wn.expandByPoint(mo.max))}wn.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)He.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(He));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)He.fromBufferAttribute(a,l),c&&(rr.fromBufferAttribute(t,l),He.add(rr)),i=Math.max(i,n.distanceToSquared(He))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Be(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new F,c[P]=new F;let l=new F,h=new F,d=new F,u=new ut,f=new ut,g=new ut,y=new F,m=new F;function p(P,T,b){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,b),u.fromBufferAttribute(r,P),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,b),h.sub(l),d.sub(l),f.sub(u),g.sub(u);let R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),a[P].add(y),a[T].add(y),a[b].add(y),c[P].add(m),c[T].add(m),c[b].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let P=0,T=v.length;P<T;++P){let b=v[P],R=b.start,k=b.count;for(let L=R,B=R+k;L<B;L+=3)p(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let _=new F,x=new F,M=new F,E=new F;function C(P){M.fromBufferAttribute(i,P),E.copy(M);let T=a[P];_.copy(T),_.sub(M.multiplyScalar(M.dot(T))).normalize(),x.crossVectors(E,T);let R=x.dot(c[P])<0?-1:1;o.setXYZW(P,_.x,_.y,_.z,R)}for(let P=0,T=v.length;P<T;++P){let b=v[P],R=b.start,k=b.count;for(let L=R,B=R+k;L<B;L+=3)C(t.getX(L+0)),C(t.getX(L+1)),C(t.getX(L+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Be(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new F,r=new F,o=new F,a=new F,c=new F,l=new F,h=new F,d=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),y=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)He.fromBufferAttribute(t,e),He.normalize(),t.setXYZ(e,He.x,He.y,He.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h),f=0,g=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?f=c[y]*a.data.stride+a.offset:f=c[y]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new Be(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cp=new ve,xs=new Lo,dc=new Ni,Rp=new F,fc=new F,pc=new F,mc=new F,Au=new F,gc=new F,Ip=new F,yc=new F,Le=class extends Fe{constructor(t=new Oe,e=new Es){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){gc.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],d=r[c];h!==0&&(Au.fromBufferAttribute(d,t),o?gc.addScaledVector(Au,h):gc.addScaledVector(Au.sub(e),h))}e.add(gc)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),dc.copy(n.boundingSphere),dc.applyMatrix4(r),xs.copy(t.ray).recast(t.near),!(dc.containsPoint(xs.origin)===!1&&(xs.intersectSphere(dc,Rp)===null||xs.origin.distanceToSquared(Rp)>(t.far-t.near)**2))&&(Cp.copy(r).invert(),xs.copy(t.ray).applyMatrix4(Cp),!(n.boundingBox!==null&&xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xs)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=u.length;g<y;g++){let m=u[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=v,M=_;x<M;x+=3){let E=a.getX(x),C=a.getX(x+1),P=a.getX(x+2);i=xc(this,p,t,n,l,h,d,E,C,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let v=a.getX(m),_=a.getX(m+1),x=a.getX(m+2);i=xc(this,o,t,n,l,h,d,v,_,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=u.length;g<y;g++){let m=u[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let x=v,M=_;x<M;x+=3){let E=x,C=x+1,P=x+2;i=xc(this,p,t,n,l,h,d,E,C,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let v=m,_=m+1,x=m+2;i=xc(this,o,t,n,l,h,d,v,_,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function fv(s,t,e,n,i,r,o,a){let c;if(t.side===Ye?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===Ri,a),c===null)return null;yc.copy(a),yc.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(yc);return l<e.near||l>e.far?null:{distance:l,point:yc.clone(),object:s}}function xc(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,fc),s.getVertexPosition(c,pc),s.getVertexPosition(l,mc);let h=fv(s,t,e,n,fc,pc,mc,Ip);if(h){let d=new F;Ai.getBarycoord(Ip,fc,pc,mc,d),i&&(h.uv=Ai.getInterpolatedAttribute(i,a,c,l,d,new ut)),r&&(h.uv1=Ai.getInterpolatedAttribute(r,a,c,l,d,new ut)),o&&(h.normal=Ai.getInterpolatedAttribute(o,a,c,l,d,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new F,materialIndex:0};Ai.getNormal(fc,pc,mc,u.normal),h.face=u,h.barycoord=d}return h}var ai=class s extends Oe{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new ge(l,3)),this.setAttribute("normal",new ge(h,3)),this.setAttribute("uv",new ge(d,2));function g(y,m,p,v,_,x,M,E,C,P,T){let b=x/C,R=M/P,k=x/2,L=M/2,B=E/2,O=C+1,D=P+1,$=0,H=0,j=new F;for(let lt=0;lt<D;lt++){let pt=lt*R-L;for(let st=0;st<O;st++){let Qt=st*b-k;j[y]=Qt*v,j[m]=pt*_,j[p]=B,l.push(j.x,j.y,j.z),j[y]=0,j[m]=0,j[p]=E>0?1:-1,h.push(j.x,j.y,j.z),d.push(st/C),d.push(1-lt/P),$+=1}}for(let lt=0;lt<P;lt++)for(let pt=0;pt<C;pt++){let st=u+pt+O*lt,Qt=u+pt+O*(lt+1),ne=u+(pt+1)+O*(lt+1),Z=u+(pt+1)+O*lt;c.push(st,Qt,Z),c.push(Qt,ne,Z),H+=6}a.addGroup(f,H,T),f+=H,u+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ps(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Qe(s){let t={};for(let e=0;e<s.length;e++){let n=Ps(s[e]);for(let i in n)t[i]=n[i]}return t}function pv(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function hd(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var th={clone:Ps,merge:Qe},mv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ge=class extends oi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mv,this.fragmentShader=gv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ps(t.uniforms),this.uniformsGroups=pv(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Fo=class extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=Wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ji=new F,Pp=new ut,Lp=new ut,Je=class extends Fo{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=gr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Mo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return gr*2*Math.atan(Math.tan(Mo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z)}getViewSize(t,e){return this.getViewBounds(t,Pp,Lp),e.subVectors(Lp,Pp)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Mo*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},or=-90,ar=1,zc=class extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Je(or,ar,t,e);i.layers=this.layers,this.add(i);let r=new Je(or,ar,t,e);r.layers=this.layers,this.add(r);let o=new Je(or,ar,t,e);o.layers=this.layers,this.add(o);let a=new Je(or,ar,t,e);a.layers=this.layers,this.add(a);let c=new Je(or,ar,t,e);c.layers=this.layers,this.add(c);let l=new Je(or,ar,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ro)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Uo=class extends on{constructor(t=[],e=Rs,n,i,r,o,a,c,l,h){super(t,e,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},kc=class extends si{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Uo(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ai(5,5,5),r=new Ge({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:Di});r.uniforms.tEquirect.value=e;let o=new Le(i,r),a=e.minFilter;return e.minFilter===rs&&(e.minFilter=Mn),new zc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},Ne=class extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}},yv={type:"move"},xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ne,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ne,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ne,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let y of t.hand.values()){let m=e.getJointPose(y,n),p=this._getHandJoint(l,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yv)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ne;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Oo=class s{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Gt(t),this.density=e}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var zo=class extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Vc=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Bc,this.updateRanges=[],this.version=0,this.uuid=ii()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},rn=new F,ko=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyMatrix4(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyNormalMatrix(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.transformDirection(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array),r=pe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Be(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},vr=class extends oi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Gt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},cr,go=new F,lr=new F,hr=new F,ur=new ut,yo=new ut,Bm=new ve,vc=new F,xo=new F,_c=new F,Np=new ut,Cu=new ut,Dp=new ut,Vo=class extends Fe{constructor(t=new vr){if(super(),this.isSprite=!0,this.type="Sprite",cr===void 0){cr=new Oe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Vc(e,5);cr.setIndex([0,1,2,0,2,3]),cr.setAttribute("position",new ko(n,3,0,!1)),cr.setAttribute("uv",new ko(n,2,3,!1))}this.geometry=cr,this.material=t,this.center=new ut(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),lr.setFromMatrixScale(this.matrixWorld),Bm.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),hr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&lr.multiplyScalar(-hr.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;bc(vc.set(-.5,-.5,0),hr,o,lr,i,r),bc(xo.set(.5,-.5,0),hr,o,lr,i,r),bc(_c.set(.5,.5,0),hr,o,lr,i,r),Np.set(0,0),Cu.set(1,0),Dp.set(1,1);let a=t.ray.intersectTriangle(vc,xo,_c,!1,go);if(a===null&&(bc(xo.set(-.5,.5,0),hr,o,lr,i,r),Cu.set(0,1),a=t.ray.intersectTriangle(vc,_c,xo,!1,go),a===null))return;let c=t.ray.origin.distanceTo(go);c<t.near||c>t.far||e.push({distance:c,point:go.clone(),uv:Ai.getInterpolation(go,vc,xo,_c,Np,Cu,Dp,new ut),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function bc(s,t,e,n,i,r){ur.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(yo.x=r*ur.x-i*ur.y,yo.y=i*ur.x+r*ur.y):yo.copy(ur),s.copy(t),s.x+=yo.x,s.y+=yo.y,s.applyMatrix4(Bm)}var _r=class extends on{constructor(t=null,e=1,n=1,i,r,o,a,c,l=dn,h=dn,d,u){super(null,o,a,c,l,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ho=class extends Be{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},dr=new ve,Bp=new ve,wc=[],Fp=new ri,xv=new ve,vo=new Le,_o=new Ni,es=class extends Le{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ho(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,xv)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ri),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,dr),Fp.copy(t.boundingBox).applyMatrix4(dr),this.boundingBox.union(Fp)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ni),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,dr),_o.copy(t.boundingSphere).applyMatrix4(dr),this.boundingSphere.union(_o)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(vo.geometry=this.geometry,vo.material=this.material,vo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_o.copy(this.boundingSphere),_o.applyMatrix4(n),t.ray.intersectsSphere(_o)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,dr),Bp.multiplyMatrices(n,dr),vo.matrixWorld=Bp,vo.raycast(t,wc);for(let o=0,a=wc.length;o<a;o++){let c=wc[o];c.instanceId=r,c.object=this,e.push(c)}wc.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ho(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new _r(new Float32Array(i*this.count),i,this.count,Pr,Zn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=i*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ru=new F,vv=new F,_v=new Yt,ni=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Ru.subVectors(n,e).cross(vv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ru),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||_v.getNormalMatrix(t),i=this.coplanarPoint(Ru).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},vs=new Ni,bv=new ut(.5,.5),Mc=new F,br=class{constructor(t=new ni,e=new ni,n=new ni,i=new ni,r=new ni,o=new ni){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Wn,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],y=r[9],m=r[10],p=r[11],v=r[12],_=r[13],x=r[14],M=r[15];if(i[0].setComponents(l-o,f-h,p-g,M-v).normalize(),i[1].setComponents(l+o,f+h,p+g,M+v).normalize(),i[2].setComponents(l+a,f+d,p+y,M+_).normalize(),i[3].setComponents(l-a,f-d,p-y,M-_).normalize(),n)i[4].setComponents(c,u,m,x).normalize(),i[5].setComponents(l-c,f-u,p-m,M-x).normalize();else if(i[4].setComponents(l-c,f-u,p-m,M-x).normalize(),e===Wn)i[5].setComponents(l+c,f+u,p+m,M+x).normalize();else if(e===Ro)i[5].setComponents(c,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(t){vs.center.set(0,0,0);let e=bv.distanceTo(t.center);return vs.radius=.7071067811865476+e,vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Mc.x=i.normal.x>0?t.max.x:t.min.x,Mc.y=i.normal.y>0?t.max.y:t.min.y,Mc.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Mc)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var wr=class extends oi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Hc=new F,Gc=new F,Up=new ve,bo=new Lo,Sc=new Ni,Iu=new F,Op=new F,Wc=class extends Fe{constructor(t=new Oe,e=new wr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Hc.fromBufferAttribute(e,i-1),Gc.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Hc.distanceTo(Gc);t.setAttribute("lineDistance",new ge(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sc.copy(n.boundingSphere),Sc.applyMatrix4(i),Sc.radius+=r,t.ray.intersectsSphere(Sc)===!1)return;Up.copy(i).invert(),bo.copy(t.ray).applyMatrix4(Up);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let y=f,m=g-1;y<m;y+=l){let p=h.getX(y),v=h.getX(y+1),_=Ec(this,t,bo,c,p,v,y);_&&e.push(_)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(f),p=Ec(this,t,bo,c,y,m,g-1);p&&e.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let y=f,m=g-1;y<m;y+=l){let p=Ec(this,t,bo,c,y,y+1,y);p&&e.push(p)}if(this.isLineLoop){let y=Ec(this,t,bo,c,g-1,f,g-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ec(s,t,e,n,i,r,o){let a=s.geometry.attributes.position;if(Hc.fromBufferAttribute(a,i),Gc.fromBufferAttribute(a,r),e.distanceSqToSegment(Hc,Gc,Iu,Op)>n)return;Iu.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Iu);if(!(l<t.near||l>t.far))return{distance:l,point:Op.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var zp=new F,kp=new F,Go=class extends Wc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)zp.fromBufferAttribute(e,i),kp.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+zp.distanceTo(kp);t.setAttribute("lineDistance",new ge(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ts=class extends on{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Wo=class extends on{constructor(t,e,n=os,i,r,o,a=dn,c=dn,l,h=mr,d=1){if(h!==mr&&h!==Ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new yr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}};var ns=class s extends Oe{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,y=[],m=n/2,p=0;v(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new ge(d,3)),this.setAttribute("normal",new ge(u,3)),this.setAttribute("uv",new ge(f,2));function v(){let x=new F,M=new F,E=0,C=(e-t)/n;for(let P=0;P<=r;P++){let T=[],b=P/r,R=b*(e-t)+t;for(let k=0;k<=i;k++){let L=k/i,B=L*c+a,O=Math.sin(B),D=Math.cos(B);M.x=R*O,M.y=-b*n+m,M.z=R*D,d.push(M.x,M.y,M.z),x.set(O,C,D).normalize(),u.push(x.x,x.y,x.z),f.push(L,1-b),T.push(g++)}y.push(T)}for(let P=0;P<i;P++)for(let T=0;T<r;T++){let b=y[T][P],R=y[T+1][P],k=y[T+1][P+1],L=y[T][P+1];(t>0||T!==0)&&(h.push(b,R,L),E+=3),(e>0||T!==r-1)&&(h.push(R,k,L),E+=3)}l.addGroup(p,E,0),p+=E}function _(x){let M=g,E=new ut,C=new F,P=0,T=x===!0?t:e,b=x===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,m*b,0),u.push(0,b,0),f.push(.5,.5),g++;let R=g;for(let k=0;k<=i;k++){let B=k/i*c+a,O=Math.cos(B),D=Math.sin(B);C.x=T*D,C.y=m*b,C.z=T*O,d.push(C.x,C.y,C.z),u.push(0,b,0),E.x=O*.5+.5,E.y=D*.5*b+.5,f.push(E.x,E.y),g++}for(let k=0;k<i;k++){let L=M+k,B=R+k;x===!0?h.push(B,B+1,L):h.push(B+1,B,L),P+=3}l.addGroup(p,P,x===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},qo=class s extends ns{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Xo=class s extends Oe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],o=[];a(i),l(n),h(),this.setAttribute("position",new ge(r,3)),this.setAttribute("normal",new ge(r.slice(),3)),this.setAttribute("uv",new ge(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let _=new F,x=new F,M=new F;for(let E=0;E<e.length;E+=3)f(e[E+0],_),f(e[E+1],x),f(e[E+2],M),c(_,x,M,v)}function c(v,_,x,M){let E=M+1,C=[];for(let P=0;P<=E;P++){C[P]=[];let T=v.clone().lerp(x,P/E),b=_.clone().lerp(x,P/E),R=E-P;for(let k=0;k<=R;k++)k===0&&P===E?C[P][k]=T:C[P][k]=T.clone().lerp(b,k/R)}for(let P=0;P<E;P++)for(let T=0;T<2*(E-P)-1;T++){let b=Math.floor(T/2);T%2===0?(u(C[P][b+1]),u(C[P+1][b]),u(C[P][b])):(u(C[P][b+1]),u(C[P+1][b+1]),u(C[P+1][b]))}}function l(v){let _=new F;for(let x=0;x<r.length;x+=3)_.x=r[x+0],_.y=r[x+1],_.z=r[x+2],_.normalize().multiplyScalar(v),r[x+0]=_.x,r[x+1]=_.y,r[x+2]=_.z}function h(){let v=new F;for(let _=0;_<r.length;_+=3){v.x=r[_+0],v.y=r[_+1],v.z=r[_+2];let x=m(v)/2/Math.PI+.5,M=p(v)/Math.PI+.5;o.push(x,1-M)}g(),d()}function d(){for(let v=0;v<o.length;v+=6){let _=o[v+0],x=o[v+2],M=o[v+4],E=Math.max(_,x,M),C=Math.min(_,x,M);E>.9&&C<.1&&(_<.2&&(o[v+0]+=1),x<.2&&(o[v+2]+=1),M<.2&&(o[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function f(v,_){let x=v*3;_.x=t[x+0],_.y=t[x+1],_.z=t[x+2]}function g(){let v=new F,_=new F,x=new F,M=new F,E=new ut,C=new ut,P=new ut;for(let T=0,b=0;T<r.length;T+=9,b+=6){v.set(r[T+0],r[T+1],r[T+2]),_.set(r[T+3],r[T+4],r[T+5]),x.set(r[T+6],r[T+7],r[T+8]),E.set(o[b+0],o[b+1]),C.set(o[b+2],o[b+3]),P.set(o[b+4],o[b+5]),M.copy(v).add(_).add(x).divideScalar(3);let R=m(M);y(E,b+0,v,R),y(C,b+2,_,R),y(P,b+4,x,R)}}function y(v,_,x,M){M<0&&v.x===1&&(o[_]=v.x-1),x.x===0&&x.z===0&&(o[_]=M/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.details)}},Yo=class s extends Xo{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new ut:new F);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new F,i=[],r=[],o=[],a=new F,c=new ve;for(let f=0;f<=t;f++){let g=f/t;i[f]=this.getTangentAt(g,new F)}r[0]=new F,o[0]=new F;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(ee(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(ee(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Mr=class extends Sn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ut){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},qc=class extends Mr{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function ud(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+n*a}}}var Tc=new F,Pu=new ud,Lu=new ud,Nu=new ud,Xc=class extends Sn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new F){let n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(Tc.subVectors(i[0],i[1]).add(i[0]),l=Tc);let d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Tc.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Tc),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),Pu.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,g,y,m),Lu.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,g,y,m),Nu.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,g,y,m)}else this.curveType==="catmullrom"&&(Pu.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Lu.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Nu.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Pu.calc(c),Lu.calc(c),Nu.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new F().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Vp(s,t,e,n,i){let r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function wv(s,t){let e=1-s;return e*e*t}function Mv(s,t){return 2*(1-s)*s*t}function Sv(s,t){return s*s*t}function Eo(s,t,e,n){return wv(s,t)+Mv(s,e)+Sv(s,n)}function Ev(s,t){let e=1-s;return e*e*e*t}function Tv(s,t){let e=1-s;return 3*e*e*s*t}function Av(s,t){return 3*(1-s)*s*s*t}function Cv(s,t){return s*s*s*t}function To(s,t,e,n,i){return Ev(s,t)+Tv(s,e)+Av(s,n)+Cv(s,i)}var Zo=class extends Sn{constructor(t=new ut,e=new ut,n=new ut,i=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ut){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(To(t,i.x,r.x,o.x,a.x),To(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Yc=class extends Sn{constructor(t=new F,e=new F,n=new F,i=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new F){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(To(t,i.x,r.x,o.x,a.x),To(t,i.y,r.y,o.y,a.y),To(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},$o=class extends Sn{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Zc=class extends Sn{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ko=class extends Sn{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Eo(t,i.x,r.x,o.x),Eo(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$c=class extends Sn{constructor(t=new F,e=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new F){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Eo(t,i.x,r.x,o.x),Eo(t,i.y,r.y,o.y),Eo(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},jo=class extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(Vp(a,c.x,l.x,h.x,d.x),Vp(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new ut().fromArray(i))}return this}},zu=Object.freeze({__proto__:null,ArcCurve:qc,CatmullRomCurve3:Xc,CubicBezierCurve:Zo,CubicBezierCurve3:Yc,EllipseCurve:Mr,LineCurve:$o,LineCurve3:Zc,QuadraticBezierCurve:Ko,QuadraticBezierCurve3:$c,SplineCurve:jo}),Kc=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new zu[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new zu[i.type]().fromJSON(i))}return this}},Jo=class extends Kc{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new $o(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Ko(this.currentPoint.clone(),new ut(t,e),new ut(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){let a=new Zo(this.currentPoint.clone(),new ut(t,e),new ut(n,i),new ut(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new jo(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,r,o,a,c),this}absellipse(t,e,n,i,r,o,a,c){let l=new Mr(t,e,n,i,r,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Sr=class extends Jo{constructor(t){super(t),this.uuid=ii(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Jo().fromJSON(i))}return this}};function Rv(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Fm(s,0,i,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=Dv(s,t,r,e)),s.length>80*e){a=1/0,c=1/0;let h=-1/0,d=-1/0;for(let u=e;u<i;u+=e){let f=s[u],g=s[u+1];f<a&&(a=f),g<c&&(c=g),f>h&&(h=f),g>d&&(d=g)}l=Math.max(h-a,d-c),l=l!==0?32767/l:0}return Qo(r,o,e,a,c,l,0),o}function Fm(s,t,e,n,i){let r;if(i===qv(s,t,e,n)>0)for(let o=t;o<e;o+=n)r=Hp(o/n|0,s[o],s[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Hp(o/n|0,s[o],s[o+1],r);return r&&Er(r,r.next)&&(ea(r),r=r.next),r}function As(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Er(e,e.next)||Re(e.prev,e,e.next)===0)){if(ea(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Qo(s,t,e,n,i,r,o){if(!s)return;!o&&r&&zv(s,n,i,r);let a=s;for(;s.prev!==s.next;){let c=s.prev,l=s.next;if(r?Pv(s,n,i,r):Iv(s)){t.push(c.i,s.i,l.i),ea(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=Lv(As(s),t),Qo(s,t,e,n,i,r,2)):o===2&&Nv(s,t,e,n,i,r):Qo(As(s),t,e,n,i,r,1);break}}}function Iv(s){let t=s.prev,e=s,n=s.next;if(Re(t,e,n)>=0)return!1;let i=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(i,r,o),d=Math.min(a,c,l),u=Math.max(i,r,o),f=Math.max(a,c,l),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&wo(i,a,r,c,o,l,g.x,g.y)&&Re(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Pv(s,t,e,n){let i=s.prev,r=s,o=s.next;if(Re(i,r,o)>=0)return!1;let a=i.x,c=r.x,l=o.x,h=i.y,d=r.y,u=o.y,f=Math.min(a,c,l),g=Math.min(h,d,u),y=Math.max(a,c,l),m=Math.max(h,d,u),p=ku(f,g,t,e,n),v=ku(y,m,t,e,n),_=s.prevZ,x=s.nextZ;for(;_&&_.z>=p&&x&&x.z<=v;){if(_.x>=f&&_.x<=y&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&wo(a,h,c,d,l,u,_.x,_.y)&&Re(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=f&&x.x<=y&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&wo(a,h,c,d,l,u,x.x,x.y)&&Re(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=y&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&wo(a,h,c,d,l,u,_.x,_.y)&&Re(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=v;){if(x.x>=f&&x.x<=y&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&wo(a,h,c,d,l,u,x.x,x.y)&&Re(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Lv(s,t){let e=s;do{let n=e.prev,i=e.next.next;!Er(n,i)&&Om(n,e,e.next,i)&&ta(n,i)&&ta(i,n)&&(t.push(n.i,e.i,i.i),ea(e),ea(e.next),e=s=i),e=e.next}while(e!==s);return As(e)}function Nv(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Hv(o,a)){let c=zm(o,a);o=As(o,o.next),c=As(c,c.next),Qo(o,t,e,n,i,r,0),Qo(c,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Dv(s,t,e,n){let i=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:s.length,l=Fm(s,a,c,n,!1);l===l.next&&(l.steiner=!0),i.push(Vv(l))}i.sort(Bv);for(let r=0;r<i.length;r++)e=Fv(i[r],e);return e}function Bv(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Fv(s,t){let e=Uv(s,t);if(!e)return t;let n=zm(e,s);return As(n,n.next),As(e,e.next)}function Uv(s,t){let e=t,n=s.x,i=s.y,r=-1/0,o;if(Er(s,e))return e;do{if(Er(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,o=e.x<e.next.x?e:e.next,d===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Um(i<l?n:r,i,c,l,i<l?r:n,i,e.x,e.y)){let d=Math.abs(i-e.y)/(n-e.x);ta(e,s)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&Ov(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function Ov(s,t){return Re(s.prev,s,t.prev)<0&&Re(t.next,s,s.next)<0}function zv(s,t,e,n){let i=s;do i.z===0&&(i.z=ku(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,kv(i)}function kv(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,e*=2}while(t>1);return s}function ku(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Vv(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Um(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function wo(s,t,e,n,i,r,o,a){return!(s===o&&t===a)&&Um(s,t,e,n,i,r,o,a)}function Hv(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Gv(s,t)&&(ta(s,t)&&ta(t,s)&&Wv(s,t)&&(Re(s.prev,s,t.prev)||Re(s,t.prev,t))||Er(s,t)&&Re(s.prev,s,s.next)>0&&Re(t.prev,t,t.next)>0)}function Re(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Er(s,t){return s.x===t.x&&s.y===t.y}function Om(s,t,e,n){let i=Cc(Re(s,t,e)),r=Cc(Re(s,t,n)),o=Cc(Re(e,n,s)),a=Cc(Re(e,n,t));return!!(i!==r&&o!==a||i===0&&Ac(s,e,t)||r===0&&Ac(s,n,t)||o===0&&Ac(e,s,n)||a===0&&Ac(e,t,n))}function Ac(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Cc(s){return s>0?1:s<0?-1:0}function Gv(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Om(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function ta(s,t){return Re(s.prev,s,s.next)<0?Re(s,t,s.next)>=0&&Re(s,s.prev,t)>=0:Re(s,t,s.prev)<0||Re(s,s.next,t)<0}function Wv(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function zm(s,t){let e=Vu(s.i,s.x,s.y),n=Vu(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Hp(s,t,e,n){let i=Vu(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ea(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Vu(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function qv(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Hu=class{static triangulate(t,e,n=2){return Rv(t,e,n)}},bs=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];Gp(t),Wp(n,t);let o=t.length;e.forEach(Gp);for(let c=0;c<e.length;c++)i.push(o),o+=e[c].length,Wp(n,e[c]);let a=Hu.triangulate(n,i);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Gp(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Wp(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var na=class s extends Oe{constructor(t=new Sr([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new ge(i,3)),this.setAttribute("uv",new ge(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:Xv,_,x=!1,M,E,C,P;p&&(_=p.getSpacedPoints(h),x=!0,u=!1,M=p.computeFrenetFrames(h,!1),E=new F,C=new F,P=new F),u||(m=0,f=0,g=0,y=0);let T=a.extractPoints(l),b=T.shape,R=T.holes;if(!bs.isClockWise(b)){b=b.reverse();for(let tt=0,K=R.length;tt<K;tt++){let nt=R[tt];bs.isClockWise(nt)&&(R[tt]=nt.reverse())}}function L(tt){let nt=10000000000000001e-36,J=tt[0];for(let ft=1;ft<=tt.length;ft++){let it=ft%tt.length,gt=tt[it],qt=gt.x-J.x,Ht=gt.y-J.y,I=qt*qt+Ht*Ht,w=Math.max(Math.abs(gt.x),Math.abs(gt.y),Math.abs(J.x),Math.abs(J.y)),G=nt*w*w;if(I<=G){tt.splice(it,1),ft--;continue}J=gt}}L(b),R.forEach(L);let B=R.length,O=b;for(let tt=0;tt<B;tt++){let K=R[tt];b=b.concat(K)}function D(tt,K,nt){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(K,nt)}let $=b.length;function H(tt,K,nt){let J,ft,it,gt=tt.x-K.x,qt=tt.y-K.y,Ht=nt.x-tt.x,I=nt.y-tt.y,w=gt*gt+qt*qt,G=gt*I-qt*Ht;if(Math.abs(G)>Number.EPSILON){let X=Math.sqrt(w),et=Math.sqrt(Ht*Ht+I*I),Y=K.x-qt/X,Lt=K.y+gt/X,dt=nt.x-I/et,Ct=nt.y+Ht/et,Rt=((dt-Y)*I-(Ct-Lt)*Ht)/(gt*I-qt*Ht);J=Y+gt*Rt-tt.x,ft=Lt+qt*Rt-tt.y;let rt=J*J+ft*ft;if(rt<=2)return new ut(J,ft);it=Math.sqrt(rt/2)}else{let X=!1;gt>Number.EPSILON?Ht>Number.EPSILON&&(X=!0):gt<-Number.EPSILON?Ht<-Number.EPSILON&&(X=!0):Math.sign(qt)===Math.sign(I)&&(X=!0),X?(J=-qt,ft=gt,it=Math.sqrt(w)):(J=gt,ft=qt,it=Math.sqrt(w/2))}return new ut(J/it,ft/it)}let j=[];for(let tt=0,K=O.length,nt=K-1,J=tt+1;tt<K;tt++,nt++,J++)nt===K&&(nt=0),J===K&&(J=0),j[tt]=H(O[tt],O[nt],O[J]);let lt=[],pt,st=j.concat();for(let tt=0,K=B;tt<K;tt++){let nt=R[tt];pt=[];for(let J=0,ft=nt.length,it=ft-1,gt=J+1;J<ft;J++,it++,gt++)it===ft&&(it=0),gt===ft&&(gt=0),pt[J]=H(nt[J],nt[it],nt[gt]);lt.push(pt),st=st.concat(pt)}let Qt;if(m===0)Qt=bs.triangulateShape(O,R);else{let tt=[],K=[];for(let nt=0;nt<m;nt++){let J=nt/m,ft=f*Math.cos(J*Math.PI/2),it=g*Math.sin(J*Math.PI/2)+y;for(let gt=0,qt=O.length;gt<qt;gt++){let Ht=D(O[gt],j[gt],it);Pt(Ht.x,Ht.y,-ft),J===0&&tt.push(Ht)}for(let gt=0,qt=B;gt<qt;gt++){let Ht=R[gt];pt=lt[gt];let I=[];for(let w=0,G=Ht.length;w<G;w++){let X=D(Ht[w],pt[w],it);Pt(X.x,X.y,-ft),J===0&&I.push(X)}J===0&&K.push(I)}}Qt=bs.triangulateShape(tt,K)}let ne=Qt.length,Z=g+y;for(let tt=0;tt<$;tt++){let K=u?D(b[tt],st[tt],Z):b[tt];x?(C.copy(M.normals[0]).multiplyScalar(K.x),E.copy(M.binormals[0]).multiplyScalar(K.y),P.copy(_[0]).add(C).add(E),Pt(P.x,P.y,P.z)):Pt(K.x,K.y,0)}for(let tt=1;tt<=h;tt++)for(let K=0;K<$;K++){let nt=u?D(b[K],st[K],Z):b[K];x?(C.copy(M.normals[tt]).multiplyScalar(nt.x),E.copy(M.binormals[tt]).multiplyScalar(nt.y),P.copy(_[tt]).add(C).add(E),Pt(P.x,P.y,P.z)):Pt(nt.x,nt.y,d/h*tt)}for(let tt=m-1;tt>=0;tt--){let K=tt/m,nt=f*Math.cos(K*Math.PI/2),J=g*Math.sin(K*Math.PI/2)+y;for(let ft=0,it=O.length;ft<it;ft++){let gt=D(O[ft],j[ft],J);Pt(gt.x,gt.y,d+nt)}for(let ft=0,it=R.length;ft<it;ft++){let gt=R[ft];pt=lt[ft];for(let qt=0,Ht=gt.length;qt<Ht;qt++){let I=D(gt[qt],pt[qt],J);x?Pt(I.x,I.y+_[h-1].y,_[h-1].x+nt):Pt(I.x,I.y,d+nt)}}}mt(),ht();function mt(){let tt=i.length/3;if(u){let K=0,nt=$*K;for(let J=0;J<ne;J++){let ft=Qt[J];zt(ft[2]+nt,ft[1]+nt,ft[0]+nt)}K=h+m*2,nt=$*K;for(let J=0;J<ne;J++){let ft=Qt[J];zt(ft[0]+nt,ft[1]+nt,ft[2]+nt)}}else{for(let K=0;K<ne;K++){let nt=Qt[K];zt(nt[2],nt[1],nt[0])}for(let K=0;K<ne;K++){let nt=Qt[K];zt(nt[0]+$*h,nt[1]+$*h,nt[2]+$*h)}}n.addGroup(tt,i.length/3-tt,0)}function ht(){let tt=i.length/3,K=0;Bt(O,K),K+=O.length;for(let nt=0,J=R.length;nt<J;nt++){let ft=R[nt];Bt(ft,K),K+=ft.length}n.addGroup(tt,i.length/3-tt,1)}function Bt(tt,K){let nt=tt.length;for(;--nt>=0;){let J=nt,ft=nt-1;ft<0&&(ft=tt.length-1);for(let it=0,gt=h+m*2;it<gt;it++){let qt=$*it,Ht=$*(it+1),I=K+J+qt,w=K+ft+qt,G=K+ft+Ht,X=K+J+Ht;Ee(I,w,G,X)}}}function Pt(tt,K,nt){c.push(tt),c.push(K),c.push(nt)}function zt(tt,K,nt){Wt(tt),Wt(K),Wt(nt);let J=i.length/3,ft=v.generateTopUV(n,i,J-3,J-2,J-1);N(ft[0]),N(ft[1]),N(ft[2])}function Ee(tt,K,nt,J){Wt(tt),Wt(K),Wt(J),Wt(K),Wt(nt),Wt(J);let ft=i.length/3,it=v.generateSideWallUV(n,i,ft-6,ft-3,ft-2,ft-1);N(it[0]),N(it[1]),N(it[3]),N(it[1]),N(it[2]),N(it[3])}function Wt(tt){i.push(c[tt*3+0]),i.push(c[tt*3+1]),i.push(c[tt*3+2])}function N(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Yv(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new zu[i.type]().fromJSON(i)),new s(n,t.options)}},Xv={generateTopUV:function(s,t,e,n,i){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new ut(r,o),new ut(a,c),new ut(l,h)]},generateSideWallUV:function(s,t,e,n,i,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],g=t[i*3+2],y=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ut(o,1-c),new ut(l,1-d),new ut(u,1-g),new ut(y,1-p)]:[new ut(a,1-c),new ut(h,1-d),new ut(f,1-g),new ut(m,1-p)]}};function Yv(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var ia=class s extends Xo{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Xn=class s extends Oe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,d=t/a,u=e/c,f=[],g=[],y=[],m=[];for(let p=0;p<h;p++){let v=p*u-o;for(let _=0;_<l;_++){let x=_*d-r;g.push(x,-v,0),y.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let _=v+l*p,x=v+l*(p+1),M=v+1+l*(p+1),E=v+1+l*p;f.push(_,x,E),f.push(x,M,E)}this.setIndex(f),this.setAttribute("position",new ge(g,3)),this.setAttribute("normal",new ge(y,3)),this.setAttribute("uv",new ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},sa=class s extends Oe{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],c=[],l=[],h=[],d=t,u=(e-t)/i,f=new F,g=new ut;for(let y=0;y<=i;y++){for(let m=0;m<=n;m++){let p=r+m/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let y=0;y<i;y++){let m=y*(n+1);for(let p=0;p<n;p++){let v=p+m,_=v,x=v+n+1,M=v+n+2,E=v+1;a.push(_,x,E),a.push(x,M,E)}}this.setIndex(a),this.setAttribute("position",new ge(c,3)),this.setAttribute("normal",new ge(l,3)),this.setAttribute("uv",new ge(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var ra=class s extends Oe{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],d=new F,u=new F,f=[],g=[],y=[],m=[];for(let p=0;p<=n;p++){let v=[],_=p/n,x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let M=0;M<=e;M++){let E=M/e;d.x=-t*Math.cos(i+E*r)*Math.sin(o+_*a),d.y=t*Math.cos(o+_*a),d.z=t*Math.sin(i+E*r)*Math.sin(o+_*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),m.push(E+x,1-_),v.push(l++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){let _=h[p][v+1],x=h[p][v],M=h[p+1][v],E=h[p+1][v+1];(p!==0||o>0)&&f.push(_,x,E),(p!==n-1||c<Math.PI)&&f.push(x,M,E)}this.setIndex(f),this.setAttribute("position",new ge(g,3)),this.setAttribute("normal",new ge(y,3)),this.setAttribute("uv",new ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ci=class extends oi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rd,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var jc=class extends oi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Jc=class extends oi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Rc(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Zv(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var Cs=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Qc=class extends Cs{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bu,endingEnd:Bu}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Fu:r=t,a=2*e-n;break;case Uu:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Fu:o=t,c=2*n-e;break;case Uu:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),y=g*g,m=y*g,p=-u*m+2*u*y-u*g,v=(1+u)*m+(-1.5-2*u)*y+(-.5+u)*g+1,_=(-1-f)*m+(1.5+f)*y+.5*g,x=f*m-f*y;for(let M=0;M!==a;++M)r[M]=p*o[h+M]+v*o[l+M]+_*o[c+M]+x*o[d+M];return r}},tl=class extends Cs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*d+o[c+u]*h;return r}},el=class extends Cs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},En=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Rc(e,this.TimeBufferType),this.values=Rc(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Rc(t.times,Array),values:Rc(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new el(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new tl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Qc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ao:e=this.InterpolantFactoryMethodDiscrete;break;case Dc:e=this.InterpolantFactoryMethodLinear;break;case Ic:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ao;case this.InterpolantFactoryMethodLinear:return Dc;case this.InterpolantFactoryMethodSmooth:return Ic}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(i!==void 0&&Zv(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ic,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(i)c=!0;else{let d=a*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let y=e[d+g];if(y!==e[u+g]||y!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};En.prototype.ValueTypeName="";En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=Dc;var is=class extends En{constructor(t,e,n){super(t,e,n)}};is.prototype.ValueTypeName="bool";is.prototype.ValueBufferType=Array;is.prototype.DefaultInterpolation=Ao;is.prototype.InterpolantFactoryMethodLinear=void 0;is.prototype.InterpolantFactoryMethodSmooth=void 0;var nl=class extends En{constructor(t,e,n,i){super(t,e,n,i)}};nl.prototype.ValueTypeName="color";var il=class extends En{constructor(t,e,n,i){super(t,e,n,i)}};il.prototype.ValueTypeName="number";var sl=class extends Cs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e),l=t*a;for(let h=l+a;l!==h;l+=4)Li.slerpFlat(r,0,o,l-a,o,l,c);return r}},oa=class extends En{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new sl(this.times,this.values,this.getValueSize(),t)}};oa.prototype.ValueTypeName="quaternion";oa.prototype.InterpolantFactoryMethodSmooth=void 0;var ss=class extends En{constructor(t,e,n){super(t,e,n)}};ss.prototype.ValueTypeName="string";ss.prototype.ValueBufferType=Array;ss.prototype.DefaultInterpolation=Ao;ss.prototype.InterpolantFactoryMethodLinear=void 0;ss.prototype.InterpolantFactoryMethodSmooth=void 0;var rl=class extends En{constructor(t,e,n,i){super(t,e,n,i)}};rl.prototype.ValueTypeName="vector";var ol=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},km=new ol,al=class{constructor(t){this.manager=t!==void 0?t:km,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};al.DEFAULT_MATERIAL_NAME="__DEFAULT";var aa=class extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},ca=class extends aa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Du=new ve,qp=new F,Xp=new F,Gu=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=Yn,this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new br,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;qp.setFromMatrixPosition(t.matrixWorld),e.position.copy(qp),Xp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Xp),e.updateMatrixWorld(),Du.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Du,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Du)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var la=class extends Fo{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Wu=class extends Gu{constructor(){super(new la(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ha=class extends aa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new Wu}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var cl=class extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var dd="\\[\\]\\.:\\/",$v=new RegExp("["+dd+"]","g"),fd="[^"+dd+"]",Kv="[^"+dd.replace("\\.","")+"]",jv=/((?:WC+[\/:])*)/.source.replace("WC",fd),Jv=/(WCOD+)?/.source.replace("WCOD",Kv),Qv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fd),t_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fd),e_=new RegExp("^"+jv+Jv+Qv+t_+"$"),n_=["material","materials","bones","map"],qu=class{constructor(t,e,n){let i=n||Se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Se=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($v,"")}static parseTrackName(t){let e=e_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);n_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[i];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Se.Composite=qu;Se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Se.prototype.GetterByBindingType=[Se.prototype._getValue_direct,Se.prototype._getValue_array,Se.prototype._getValue_arrayElement,Se.prototype._getValue_toArray];Se.prototype.SetterByBindingTypeAndVersioning=[[Se.prototype._setValue_direct,Se.prototype._setValue_direct_setNeedsUpdate,Se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_array,Se.prototype._setValue_array_setNeedsUpdate,Se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_arrayElement,Se.prototype._setValue_arrayElement_setNeedsUpdate,Se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_fromArray,Se.prototype._setValue_fromArray_setNeedsUpdate,Se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var qA=new Float32Array(1);function pd(s,t,e,n){let i=i_(n);switch(e){case ed:return s*t;case Pr:return s*t/i.components*i.byteLength;case Sl:return s*t/i.components*i.byteLength;case id:return s*t*2/i.components*i.byteLength;case El:return s*t*2/i.components*i.byteLength;case nd:return s*t*3/i.components*i.byteLength;case Bn:return s*t*4/i.components*i.byteLength;case Tl:return s*t*4/i.components*i.byteLength;case fa:case pa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ma:case ga:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Cl:case Il:return Math.max(s,16)*Math.max(t,8)/4;case Al:case Rl:return Math.max(s,8)*Math.max(t,8)/2;case Pl:case Ll:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Nl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Dl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Bl:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Fl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ul:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ol:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case zl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case kl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Vl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Hl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Gl:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Wl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case ql:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Xl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Yl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case ya:case Zl:case $l:return Math.ceil(s/4)*Math.ceil(t/4)*16;case sd:case Kl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case jl:case Jl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function i_(s){switch(s){case Yn:case Ju:return{byteLength:1,components:1};case Ar:case Qu:case Cr:return{byteLength:2,components:1};case wl:case Ml:return{byteLength:2,components:4};case os:case bl:case Zn:return{byteLength:4,components:1};case td:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"179"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="179");function hg(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function r_(s){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,d=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let h=c.array,d=c.updateRanges;if(s.bindBuffer(l,a),d.length===0)s.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],y=d[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let y=d[f];s.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}var o_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,a_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,c_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,l_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,h_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,u_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,d_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,f_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,p_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,m_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,g_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,y_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,x_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,v_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,__=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,b_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,w_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,M_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,S_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,E_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,T_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,A_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,C_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,R_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,I_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,P_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,L_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,N_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,B_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,F_="gl_FragColor = linearToOutputTexel( gl_FragColor );",U_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,O_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,z_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,k_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,V_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,H_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,G_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,W_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,q_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,X_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Y_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Z_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,K_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,j_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,J_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Q_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,eb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ib=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sb=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ob=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ab=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cb=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lb=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ub=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,db=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,mb=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_b=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,wb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Sb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Eb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ab=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Rb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ib=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Db=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Bb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ub=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ob=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Hb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Gb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Wb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Yb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$b=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ew=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,iw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,rw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ow=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,fw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,pw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,mw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_w=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ww=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Sw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ew=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Tw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Aw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Iw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Dw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Uw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ow=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jt={alphahash_fragment:o_,alphahash_pars_fragment:a_,alphamap_fragment:c_,alphamap_pars_fragment:l_,alphatest_fragment:h_,alphatest_pars_fragment:u_,aomap_fragment:d_,aomap_pars_fragment:f_,batching_pars_vertex:p_,batching_vertex:m_,begin_vertex:g_,beginnormal_vertex:y_,bsdfs:x_,iridescence_fragment:v_,bumpmap_pars_fragment:__,clipping_planes_fragment:b_,clipping_planes_pars_fragment:w_,clipping_planes_pars_vertex:M_,clipping_planes_vertex:S_,color_fragment:E_,color_pars_fragment:T_,color_pars_vertex:A_,color_vertex:C_,common:R_,cube_uv_reflection_fragment:I_,defaultnormal_vertex:P_,displacementmap_pars_vertex:L_,displacementmap_vertex:N_,emissivemap_fragment:D_,emissivemap_pars_fragment:B_,colorspace_fragment:F_,colorspace_pars_fragment:U_,envmap_fragment:O_,envmap_common_pars_fragment:z_,envmap_pars_fragment:k_,envmap_pars_vertex:V_,envmap_physical_pars_fragment:J_,envmap_vertex:H_,fog_vertex:G_,fog_pars_vertex:W_,fog_fragment:q_,fog_pars_fragment:X_,gradientmap_pars_fragment:Y_,lightmap_pars_fragment:Z_,lights_lambert_fragment:$_,lights_lambert_pars_fragment:K_,lights_pars_begin:j_,lights_toon_fragment:Q_,lights_toon_pars_fragment:tb,lights_phong_fragment:eb,lights_phong_pars_fragment:nb,lights_physical_fragment:ib,lights_physical_pars_fragment:sb,lights_fragment_begin:rb,lights_fragment_maps:ob,lights_fragment_end:ab,logdepthbuf_fragment:cb,logdepthbuf_pars_fragment:lb,logdepthbuf_pars_vertex:hb,logdepthbuf_vertex:ub,map_fragment:db,map_pars_fragment:fb,map_particle_fragment:pb,map_particle_pars_fragment:mb,metalnessmap_fragment:gb,metalnessmap_pars_fragment:yb,morphinstance_vertex:xb,morphcolor_vertex:vb,morphnormal_vertex:_b,morphtarget_pars_vertex:bb,morphtarget_vertex:wb,normal_fragment_begin:Mb,normal_fragment_maps:Sb,normal_pars_fragment:Eb,normal_pars_vertex:Tb,normal_vertex:Ab,normalmap_pars_fragment:Cb,clearcoat_normal_fragment_begin:Rb,clearcoat_normal_fragment_maps:Ib,clearcoat_pars_fragment:Pb,iridescence_pars_fragment:Lb,opaque_fragment:Nb,packing:Db,premultiplied_alpha_fragment:Bb,project_vertex:Fb,dithering_fragment:Ub,dithering_pars_fragment:Ob,roughnessmap_fragment:zb,roughnessmap_pars_fragment:kb,shadowmap_pars_fragment:Vb,shadowmap_pars_vertex:Hb,shadowmap_vertex:Gb,shadowmask_pars_fragment:Wb,skinbase_vertex:qb,skinning_pars_vertex:Xb,skinning_vertex:Yb,skinnormal_vertex:Zb,specularmap_fragment:$b,specularmap_pars_fragment:Kb,tonemapping_fragment:jb,tonemapping_pars_fragment:Jb,transmission_fragment:Qb,transmission_pars_fragment:tw,uv_pars_fragment:ew,uv_pars_vertex:nw,uv_vertex:iw,worldpos_vertex:sw,background_vert:rw,background_frag:ow,backgroundCube_vert:aw,backgroundCube_frag:cw,cube_vert:lw,cube_frag:hw,depth_vert:uw,depth_frag:dw,distanceRGBA_vert:fw,distanceRGBA_frag:pw,equirect_vert:mw,equirect_frag:gw,linedashed_vert:yw,linedashed_frag:xw,meshbasic_vert:vw,meshbasic_frag:_w,meshlambert_vert:bw,meshlambert_frag:ww,meshmatcap_vert:Mw,meshmatcap_frag:Sw,meshnormal_vert:Ew,meshnormal_frag:Tw,meshphong_vert:Aw,meshphong_frag:Cw,meshphysical_vert:Rw,meshphysical_frag:Iw,meshtoon_vert:Pw,meshtoon_frag:Lw,points_vert:Nw,points_frag:Dw,shadow_vert:Bw,shadow_frag:Fw,sprite_vert:Uw,sprite_frag:Ow},vt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},hi={basic:{uniforms:Qe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Qe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Qe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Qe([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Qe([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Qe([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Qe([vt.points,vt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Qe([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Qe([vt.common,vt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Qe([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Qe([vt.sprite,vt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Qe([vt.common,vt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Qe([vt.lights,vt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};hi.physical={uniforms:Qe([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var eh={r:0,b:0,g:0},Ls=new qn,zw=new ve;function kw(s,t,e,n,i,r,o){let a=new Gt(0),c=r===!0?0:1,l,h,d=null,u=0,f=null;function g(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?e:t).get(x)),x}function y(_){let x=!1,M=g(_);M===null?p(a,c):M&&M.isColor&&(p(M,1),x=!0);let E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(_,x){let M=g(x);M&&(M.isCubeTexture||M.mapping===ua)?(h===void 0&&(h=new Le(new ai(1,1,1),new Ge({name:"BackgroundCubeMaterial",uniforms:Ps(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,C,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ls.copy(x.backgroundRotation),Ls.x*=-1,Ls.y*=-1,Ls.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ls.y*=-1,Ls.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(zw.makeRotationFromEuler(Ls)),h.material.toneMapped=oe.getTransfer(M.colorSpace)!==me,(d!==M||u!==M.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=M,u=M.version,f=s.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Le(new Xn(2,2),new Ge({name:"BackgroundMaterial",uniforms:Ps(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=oe.getTransfer(M.colorSpace)!==me,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||u!==M.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,d=M,u=M.version,f=s.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,x){_.getRGB(eh,hd(s)),n.buffers.color.setClear(eh.r,eh.g,eh.b,x,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,x=1){a.set(_),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,p(a,c)},render:y,addToRenderList:m,dispose:v}}function Vw(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(b,R,k,L,B){let O=!1,D=d(L,k,R);r!==D&&(r=D,l(r.object)),O=f(b,L,k,B),O&&g(b,L,k,B),B!==null&&t.update(B,s.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,x(b,R,k,L),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return s.createVertexArray()}function l(b){return s.bindVertexArray(b)}function h(b){return s.deleteVertexArray(b)}function d(b,R,k){let L=k.wireframe===!0,B=n[b.id];B===void 0&&(B={},n[b.id]=B);let O=B[R.id];O===void 0&&(O={},B[R.id]=O);let D=O[L];return D===void 0&&(D=u(c()),O[L]=D),D}function u(b){let R=[],k=[],L=[];for(let B=0;B<e;B++)R[B]=0,k[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:k,attributeDivisors:L,object:b,attributes:{},index:null}}function f(b,R,k,L){let B=r.attributes,O=R.attributes,D=0,$=k.getAttributes();for(let H in $)if($[H].location>=0){let lt=B[H],pt=O[H];if(pt===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(pt=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(pt=b.instanceColor)),lt===void 0||lt.attribute!==pt||pt&&lt.data!==pt.data)return!0;D++}return r.attributesNum!==D||r.index!==L}function g(b,R,k,L){let B={},O=R.attributes,D=0,$=k.getAttributes();for(let H in $)if($[H].location>=0){let lt=O[H];lt===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(lt=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(lt=b.instanceColor));let pt={};pt.attribute=lt,lt&&lt.data&&(pt.data=lt.data),B[H]=pt,D++}r.attributes=B,r.attributesNum=D,r.index=L}function y(){let b=r.newAttributes;for(let R=0,k=b.length;R<k;R++)b[R]=0}function m(b){p(b,0)}function p(b,R){let k=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;k[b]=1,L[b]===0&&(s.enableVertexAttribArray(b),L[b]=1),B[b]!==R&&(s.vertexAttribDivisor(b,R),B[b]=R)}function v(){let b=r.newAttributes,R=r.enabledAttributes;for(let k=0,L=R.length;k<L;k++)R[k]!==b[k]&&(s.disableVertexAttribArray(k),R[k]=0)}function _(b,R,k,L,B,O,D){D===!0?s.vertexAttribIPointer(b,R,k,B,O):s.vertexAttribPointer(b,R,k,L,B,O)}function x(b,R,k,L){y();let B=L.attributes,O=k.getAttributes(),D=R.defaultAttributeValues;for(let $ in O){let H=O[$];if(H.location>=0){let j=B[$];if(j===void 0&&($==="instanceMatrix"&&b.instanceMatrix&&(j=b.instanceMatrix),$==="instanceColor"&&b.instanceColor&&(j=b.instanceColor)),j!==void 0){let lt=j.normalized,pt=j.itemSize,st=t.get(j);if(st===void 0)continue;let Qt=st.buffer,ne=st.type,Z=st.bytesPerElement,mt=ne===s.INT||ne===s.UNSIGNED_INT||j.gpuType===bl;if(j.isInterleavedBufferAttribute){let ht=j.data,Bt=ht.stride,Pt=j.offset;if(ht.isInstancedInterleavedBuffer){for(let zt=0;zt<H.locationSize;zt++)p(H.location+zt,ht.meshPerAttribute);b.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let zt=0;zt<H.locationSize;zt++)m(H.location+zt);s.bindBuffer(s.ARRAY_BUFFER,Qt);for(let zt=0;zt<H.locationSize;zt++)_(H.location+zt,pt/H.locationSize,ne,lt,Bt*Z,(Pt+pt/H.locationSize*zt)*Z,mt)}else{if(j.isInstancedBufferAttribute){for(let ht=0;ht<H.locationSize;ht++)p(H.location+ht,j.meshPerAttribute);b.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ht=0;ht<H.locationSize;ht++)m(H.location+ht);s.bindBuffer(s.ARRAY_BUFFER,Qt);for(let ht=0;ht<H.locationSize;ht++)_(H.location+ht,pt/H.locationSize,ne,lt,pt*Z,pt/H.locationSize*ht*Z,mt)}}else if(D!==void 0){let lt=D[$];if(lt!==void 0)switch(lt.length){case 2:s.vertexAttrib2fv(H.location,lt);break;case 3:s.vertexAttrib3fv(H.location,lt);break;case 4:s.vertexAttrib4fv(H.location,lt);break;default:s.vertexAttrib1fv(H.location,lt)}}}}v()}function M(){P();for(let b in n){let R=n[b];for(let k in R){let L=R[k];for(let B in L)h(L[B].object),delete L[B];delete R[k]}delete n[b]}}function E(b){if(n[b.id]===void 0)return;let R=n[b.id];for(let k in R){let L=R[k];for(let B in L)h(L[B].object),delete L[B];delete R[k]}delete n[b.id]}function C(b){for(let R in n){let k=n[R];if(k[b.id]===void 0)continue;let L=k[b.id];for(let B in L)h(L[B].object),delete L[B];delete k[b.id]}}function P(){T(),o=!0,r!==i&&(r=i,l(r.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:T,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:m,disableUnusedAttributes:v}}function Hw(s,t,e){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,d){d!==0&&(s.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function a(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function c(l,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let y=0;y<d;y++)g+=h[y]*u[y];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Gw(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==Bn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let P=C===Cr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Yn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Zn&&!P)}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),_=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),M=g>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:M,maxSamples:E}}function Ww(s){let t=this,e=null,n=0,i=!1,r=!1,o=new ni,a=new Yt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{let v=r?0:n,_=v*4,x=p.clippingState||null;c.value=x,x=h(g,u,_,f);for(let M=0;M!==_;++M)x[M]=e[M];p.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let y=d!==null?d.length:0,m=null;if(y!==0){if(m=c.value,g!==!0||m===null){let p=f+y*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,x=f;_!==y;++_,x+=4)o.copy(d[_]).applyMatrix4(v,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}function qw(s){let t=new WeakMap;function e(o,a){return a===xl?o.mapping=Rs:a===vl&&(o.mapping=Is),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===xl||a===vl)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new kc(c.height);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Nr=4,Vm=[.125,.215,.35,.446,.526,.582],Bs=20,md=new la,Hm=new Gt,gd=null,yd=0,xd=0,vd=!1,Ds=(1+Math.sqrt(5))/2,Lr=1/Ds,Gm=[new F(-Ds,Lr,0),new F(Ds,Lr,0),new F(-Lr,0,Ds),new F(Lr,0,Ds),new F(0,Ds,-Lr),new F(0,Ds,Lr),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],Xw=new F,sh=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=Xw}=r;gd=this._renderer.getRenderTarget(),yd=this._renderer.getActiveCubeFace(),xd=this._renderer.getActiveMipmapLevel(),vd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(gd,yd,xd),this._renderer.xr.enabled=vd,t.scissorTest=!1,nh(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Rs||t.mapping===Is?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gd=this._renderer.getRenderTarget(),yd=this._renderer.getActiveCubeFace(),xd=this._renderer.getActiveMipmapLevel(),vd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:Cr,format:Bn,colorSpace:Ms,depthBuffer:!1},i=Wm(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wm(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yw(r)),this._blurMaterial=Zw(r,t,e)}return i}_compileMaterial(t){let e=new Le(this._lodPlanes[0],t);this._renderer.compile(e,md)}_sceneToCubeUV(t,e,n,i,r){let c=new Je(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Hm),d.toneMapping=Bi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null));let y=new Es({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),m=new Le(new ai,y),p=!1,v=t.background;v?v.isColor&&(y.color.copy(v),t.background=null,p=!0):(y.color.copy(Hm),p=!0);for(let _=0;_<6;_++){let x=_%3;x===0?(c.up.set(0,l[_],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[_],r.y,r.z)):x===1?(c.up.set(0,0,l[_]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[_],r.z)):(c.up.set(0,l[_],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[_]));let M=this._cubeSize;nh(i,x*M,_>2?M:0,M,M),d.setRenderTarget(i),p&&d.render(m,c),d.render(t,c)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=u,t.background=v}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Rs||t.mapping===Is;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xm()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qm());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Le(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;nh(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,md)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Gm[(i-r-1)%Gm.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Le(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Bs-1),y=r/g,m=isFinite(r)?1+Math.floor(h*y):Bs;m>Bs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bs}`);let p=[],v=0;for(let C=0;C<Bs;++C){let P=C/y,T=Math.exp(-P*P/2);p.push(T),C===0?v+=T:C<m&&(v+=2*T)}for(let C=0;C<p.length;C++)p[C]=p[C]/v;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:_}=this;u.dTheta.value=g,u.mipInt.value=_-n;let x=this._sizeLods[i],M=3*x*(i>_-Nr?i-_+Nr:0),E=4*(this._cubeSize-x);nh(e,M,E,3*x,2*x),c.setRenderTarget(e),c.render(d,md)}};function Yw(s){let t=[],e=[],n=[],i=s,r=s-Nr+1+Vm.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let c=1/a;o>s-Nr?c=Vm[o-s+Nr-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,y=3,m=2,p=1,v=new Float32Array(y*g*f),_=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let E=0;E<f;E++){let C=E%3*2/3-1,P=E>2?0:-1,T=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];v.set(T,y*g*E),_.set(u,m*g*E);let b=[E,E,E,E,E,E];x.set(b,p*g*E)}let M=new Oe;M.setAttribute("position",new Be(v,y)),M.setAttribute("uv",new Be(_,m)),M.setAttribute("faceIndex",new Be(x,p)),t.push(M),i>Nr&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Wm(s,t,e){let n=new si(s,t,e);return n.texture.mapping=ua,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function nh(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Zw(s,t,e){let n=new Float32Array(Bs),i=new F(0,1,0);return new Ge({name:"SphericalGaussianBlur",defines:{n:Bs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Rd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function qm(){return new Ge({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Xm(){return new Ge({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Rd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function $w(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===xl||c===vl,h=c===Rs||c===Is;if(l||h){let d=t.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new sh(s)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new sh(s)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Kw(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Ss("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function jw(s,t,e,n){let i={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete i[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function c(d){let u=d.attributes;for(let f in u)t.update(u[f],s.ARRAY_BUFFER)}function l(d){let u=[],f=d.index,g=d.attributes.position,y=0;if(f!==null){let v=f.array;y=f.version;for(let _=0,x=v.length;_<x;_+=3){let M=v[_+0],E=v[_+1],C=v[_+2];u.push(M,E,E,C,C,M)}}else if(g!==void 0){let v=g.array;y=g.version;for(let _=0,x=v.length/3-1;_<x;_+=3){let M=_+0,E=_+1,C=_+2;u.push(M,E,E,C,C,M)}}else return;let m=new(ld(u)?Bo:Do)(u,1);m.version=y;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function Jw(s,t,e){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){s.drawElements(n,f,r,u*o),e.update(f,n,1)}function l(u,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,u*o,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,y){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/o,f[p],y[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,y,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v]*y[v];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Qw(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function tM(s,t,e){let n=new WeakMap,i=new Ie;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let T=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],_=0;f===!0&&(_=1),g===!0&&(_=2),y===!0&&(_=3);let x=a.attributes.position.count*_,M=1;x>t.maxTextureSize&&(M=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let E=new Float32Array(x*M*4*d),C=new Po(E,x,M,d);C.type=Zn,C.needsUpdate=!0;let P=_*4;for(let b=0;b<d;b++){let R=m[b],k=p[b],L=v[b],B=x*M*4*b;for(let O=0;O<R.count;O++){let D=O*P;f===!0&&(i.fromBufferAttribute(R,O),E[B+D+0]=i.x,E[B+D+1]=i.y,E[B+D+2]=i.z,E[B+D+3]=0),g===!0&&(i.fromBufferAttribute(k,O),E[B+D+4]=i.x,E[B+D+5]=i.y,E[B+D+6]=i.z,E[B+D+7]=0),y===!0&&(i.fromBufferAttribute(L,O),E[B+D+8]=i.x,E[B+D+9]=i.y,E[B+D+10]=i.z,E[B+D+11]=L.itemSize===4?i.w:1)}}u={count:d,texture:C,size:new ut(x,M)},n.set(a,u),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function eM(s,t,e,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,d=t.get(c,h);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return d}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var ug=new on,Ym=new Wo(1,1),dg=new Po,fg=new Oc,pg=new Uo,Zm=[],$m=[],Km=new Float32Array(16),jm=new Float32Array(9),Jm=new Float32Array(4);function Br(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Zm[i];if(r===void 0&&(r=new Float32Array(i),Zm[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function ze(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ke(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ah(s,t){let e=$m[t];e===void 0&&(e=new Int32Array(t),$m[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function nM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function iM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;s.uniform2fv(this.addr,t),ke(e,t)}}function sM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;s.uniform3fv(this.addr,t),ke(e,t)}}function rM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;s.uniform4fv(this.addr,t),ke(e,t)}}function oM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,n))return;Jm.set(n),s.uniformMatrix2fv(this.addr,!1,Jm),ke(e,n)}}function aM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,n))return;jm.set(n),s.uniformMatrix3fv(this.addr,!1,jm),ke(e,n)}}function cM(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,n))return;Km.set(n),s.uniformMatrix4fv(this.addr,!1,Km),ke(e,n)}}function lM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function hM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;s.uniform2iv(this.addr,t),ke(e,t)}}function uM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;s.uniform3iv(this.addr,t),ke(e,t)}}function dM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;s.uniform4iv(this.addr,t),ke(e,t)}}function fM(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function pM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;s.uniform2uiv(this.addr,t),ke(e,t)}}function mM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;s.uniform3uiv(this.addr,t),ke(e,t)}}function gM(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;s.uniform4uiv(this.addr,t),ke(e,t)}}function yM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ym.compareFunction=od,r=Ym):r=ug,e.setTexture2D(t||r,i)}function xM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||fg,i)}function vM(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||pg,i)}function _M(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||dg,i)}function bM(s){switch(s){case 5126:return nM;case 35664:return iM;case 35665:return sM;case 35666:return rM;case 35674:return oM;case 35675:return aM;case 35676:return cM;case 5124:case 35670:return lM;case 35667:case 35671:return hM;case 35668:case 35672:return uM;case 35669:case 35673:return dM;case 5125:return fM;case 36294:return pM;case 36295:return mM;case 36296:return gM;case 35678:case 36198:case 36298:case 36306:case 35682:return yM;case 35679:case 36299:case 36307:return xM;case 35680:case 36300:case 36308:case 36293:return vM;case 36289:case 36303:case 36311:case 36292:return _M}}function wM(s,t){s.uniform1fv(this.addr,t)}function MM(s,t){let e=Br(t,this.size,2);s.uniform2fv(this.addr,e)}function SM(s,t){let e=Br(t,this.size,3);s.uniform3fv(this.addr,e)}function EM(s,t){let e=Br(t,this.size,4);s.uniform4fv(this.addr,e)}function TM(s,t){let e=Br(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function AM(s,t){let e=Br(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function CM(s,t){let e=Br(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function RM(s,t){s.uniform1iv(this.addr,t)}function IM(s,t){s.uniform2iv(this.addr,t)}function PM(s,t){s.uniform3iv(this.addr,t)}function LM(s,t){s.uniform4iv(this.addr,t)}function NM(s,t){s.uniform1uiv(this.addr,t)}function DM(s,t){s.uniform2uiv(this.addr,t)}function BM(s,t){s.uniform3uiv(this.addr,t)}function FM(s,t){s.uniform4uiv(this.addr,t)}function UM(s,t,e){let n=this.cache,i=t.length,r=ah(e,i);ze(n,r)||(s.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||ug,r[o])}function OM(s,t,e){let n=this.cache,i=t.length,r=ah(e,i);ze(n,r)||(s.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||fg,r[o])}function zM(s,t,e){let n=this.cache,i=t.length,r=ah(e,i);ze(n,r)||(s.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||pg,r[o])}function kM(s,t,e){let n=this.cache,i=t.length,r=ah(e,i);ze(n,r)||(s.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||dg,r[o])}function VM(s){switch(s){case 5126:return wM;case 35664:return MM;case 35665:return SM;case 35666:return EM;case 35674:return TM;case 35675:return AM;case 35676:return CM;case 5124:case 35670:return RM;case 35667:case 35671:return IM;case 35668:case 35672:return PM;case 35669:case 35673:return LM;case 5125:return NM;case 36294:return DM;case 36295:return BM;case 36296:return FM;case 35678:case 36198:case 36298:case 36306:case 35682:return UM;case 35679:case 36299:case 36307:return OM;case 35680:case 36300:case 36308:case 36293:return zM;case 36289:case 36303:case 36311:case 36292:return kM}}var bd=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=bM(e.type)}},wd=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=VM(e.type)}},Md=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},_d=/(\w+)(\])?(\[|\.)?/g;function Qm(s,t){s.seq.push(t),s.map[t.id]=t}function HM(s,t,e){let n=s.name,i=n.length;for(_d.lastIndex=0;;){let r=_d.exec(n),o=_d.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Qm(e,l===void 0?new bd(a,s,t):new wd(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Md(a),Qm(e,d)),e=d}}}var Dr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);HM(r,o,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function tg(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var GM=37297,WM=0;function qM(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var eg=new Yt;function XM(s){oe._getMatrix(eg,oe.workingColorSpace,s);let t=`mat3( ${eg.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(s)){case Co:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function ng(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+qM(s.getShaderSource(t),a)}else return r}function YM(s,t){let e=XM(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function ZM(s,t){let e;switch(t){case mm:e="Linear";break;case gm:e="Reinhard";break;case ym:e="Cineon";break;case yl:e="ACESFilmic";break;case vm:e="AgX";break;case _m:e="Neutral";break;case xm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ih=new F;function $M(){oe.getLuminanceCoefficients(ih);let s=ih.x.toFixed(4),t=ih.y.toFixed(4),e=ih.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function KM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function jM(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function JM(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function xa(s){return s!==""}function ig(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sg(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var QM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sd(s){return s.replace(QM,e1)}var t1=new Map;function e1(s,t){let e=Jt[t];if(e===void 0){let n=t1.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Sd(e)}var n1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rg(s){return s.replace(n1,i1)}function i1(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function og(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function s1(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Yu?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ll?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===li&&(t="SHADOWMAP_TYPE_VSM"),t}function r1(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Rs:case Is:t="ENVMAP_TYPE_CUBE";break;case ua:t="ENVMAP_TYPE_CUBE_UV";break}return t}function o1(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Is:t="ENVMAP_MODE_REFRACTION";break}return t}function a1(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ku:t="ENVMAP_BLENDING_MULTIPLY";break;case fm:t="ENVMAP_BLENDING_MIX";break;case pm:t="ENVMAP_BLENDING_ADD";break}return t}function c1(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function l1(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=s1(e),l=r1(e),h=o1(e),d=a1(e),u=c1(e),f=KM(e),g=jM(r),y=i.createProgram(),m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xa).join(`
`),p.length>0&&(p+=`
`)):(m=[og(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),p=[og(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bi?"#define TONE_MAPPING":"",e.toneMapping!==Bi?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Bi?ZM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,YM("linearToOutputTexel",e.outputColorSpace),$M(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xa).join(`
`)),o=Sd(o),o=ig(o,e),o=sg(o,e),a=Sd(a),a=ig(a,e),a=sg(a,e),o=rg(o),a=rg(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ad?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ad?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=v+m+o,x=v+p+a,M=tg(i,i.VERTEX_SHADER,_),E=tg(i,i.FRAGMENT_SHADER,x);i.attachShader(y,M),i.attachShader(y,E),e.index0AttributeName!==void 0?i.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function C(R){if(s.debug.checkShaderErrors){let k=i.getProgramInfoLog(y)||"",L=i.getShaderInfoLog(M)||"",B=i.getShaderInfoLog(E)||"",O=k.trim(),D=L.trim(),$=B.trim(),H=!0,j=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(H=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,M,E);else{let lt=ng(i,M,"vertex"),pt=ng(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+O+`
`+lt+`
`+pt)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(D===""||$==="")&&(j=!1);j&&(R.diagnostics={runnable:H,programLog:O,vertexShader:{log:D,prefix:m},fragmentShader:{log:$,prefix:p}})}i.deleteShader(M),i.deleteShader(E),P=new Dr(i,y),T=JM(i,y)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(y,GM)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=WM++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=E,this}var h1=0,Ed=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Td(t),e.set(t,n)),n}},Td=class{constructor(t){this.id=h1++,this.code=t,this.usedTimes=0}};function u1(s,t,e,n,i,r,o){let a=new No,c=new Ed,l=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(T){return l.add(T),T===0?"uv":`uv${T}`}function m(T,b,R,k,L){let B=k.fog,O=L.geometry,D=T.isMeshStandardMaterial?k.environment:null,$=(T.isMeshStandardMaterial?e:t).get(T.envMap||D),H=$&&$.mapping===ua?$.image.height:null,j=g[T.type];T.precision!==null&&(f=i.getMaxPrecision(T.precision),f!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));let lt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,pt=lt!==void 0?lt.length:0,st=0;O.morphAttributes.position!==void 0&&(st=1),O.morphAttributes.normal!==void 0&&(st=2),O.morphAttributes.color!==void 0&&(st=3);let Qt,ne,Z,mt;if(j){let he=hi[j];Qt=he.vertexShader,ne=he.fragmentShader}else Qt=T.vertexShader,ne=T.fragmentShader,c.update(T),Z=c.getVertexShaderID(T),mt=c.getFragmentShaderID(T);let ht=s.getRenderTarget(),Bt=s.state.buffers.depth.getReversed(),Pt=L.isInstancedMesh===!0,zt=L.isBatchedMesh===!0,Ee=!!T.map,Wt=!!T.matcap,N=!!$,tt=!!T.aoMap,K=!!T.lightMap,nt=!!T.bumpMap,J=!!T.normalMap,ft=!!T.displacementMap,it=!!T.emissiveMap,gt=!!T.metalnessMap,qt=!!T.roughnessMap,Ht=T.anisotropy>0,I=T.clearcoat>0,w=T.dispersion>0,G=T.iridescence>0,X=T.sheen>0,et=T.transmission>0,Y=Ht&&!!T.anisotropyMap,Lt=I&&!!T.clearcoatMap,dt=I&&!!T.clearcoatNormalMap,Ct=I&&!!T.clearcoatRoughnessMap,Rt=G&&!!T.iridescenceMap,rt=G&&!!T.iridescenceThicknessMap,Mt=X&&!!T.sheenColorMap,kt=X&&!!T.sheenRoughnessMap,Nt=!!T.specularMap,bt=!!T.specularColorMap,Zt=!!T.specularIntensityMap,U=et&&!!T.transmissionMap,ct=et&&!!T.thicknessMap,yt=!!T.gradientMap,Et=!!T.alphaMap,ot=T.alphaTest>0,Q=!!T.alphaHash,It=!!T.extensions,Xt=Bi;T.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(Xt=s.toneMapping);let _e={shaderID:j,shaderType:T.type,shaderName:T.name,vertexShader:Qt,fragmentShader:ne,defines:T.defines,customVertexShaderID:Z,customFragmentShaderID:mt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:zt,batchingColor:zt&&L._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&L.instanceColor!==null,instancingMorph:Pt&&L.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ht===null?s.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Ms,alphaToCoverage:!!T.alphaToCoverage,map:Ee,matcap:Wt,envMap:N,envMapMode:N&&$.mapping,envMapCubeUVHeight:H,aoMap:tt,lightMap:K,bumpMap:nt,normalMap:J,displacementMap:u&&ft,emissiveMap:it,normalMapObjectSpace:J&&T.normalMapType===Sm,normalMapTangentSpace:J&&T.normalMapType===rd,metalnessMap:gt,roughnessMap:qt,anisotropy:Ht,anisotropyMap:Y,clearcoat:I,clearcoatMap:Lt,clearcoatNormalMap:dt,clearcoatRoughnessMap:Ct,dispersion:w,iridescence:G,iridescenceMap:Rt,iridescenceThicknessMap:rt,sheen:X,sheenColorMap:Mt,sheenRoughnessMap:kt,specularMap:Nt,specularColorMap:bt,specularIntensityMap:Zt,transmission:et,transmissionMap:U,thicknessMap:ct,gradientMap:yt,opaque:T.transparent===!1&&T.blending===Ii&&T.alphaToCoverage===!1,alphaMap:Et,alphaTest:ot,alphaHash:Q,combine:T.combine,mapUv:Ee&&y(T.map.channel),aoMapUv:tt&&y(T.aoMap.channel),lightMapUv:K&&y(T.lightMap.channel),bumpMapUv:nt&&y(T.bumpMap.channel),normalMapUv:J&&y(T.normalMap.channel),displacementMapUv:ft&&y(T.displacementMap.channel),emissiveMapUv:it&&y(T.emissiveMap.channel),metalnessMapUv:gt&&y(T.metalnessMap.channel),roughnessMapUv:qt&&y(T.roughnessMap.channel),anisotropyMapUv:Y&&y(T.anisotropyMap.channel),clearcoatMapUv:Lt&&y(T.clearcoatMap.channel),clearcoatNormalMapUv:dt&&y(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&y(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&y(T.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&y(T.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&y(T.sheenColorMap.channel),sheenRoughnessMapUv:kt&&y(T.sheenRoughnessMap.channel),specularMapUv:Nt&&y(T.specularMap.channel),specularColorMapUv:bt&&y(T.specularColorMap.channel),specularIntensityMapUv:Zt&&y(T.specularIntensityMap.channel),transmissionMapUv:U&&y(T.transmissionMap.channel),thicknessMapUv:ct&&y(T.thicknessMap.channel),alphaMapUv:Et&&y(T.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(J||Ht),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!O.attributes.uv&&(Ee||Et),fog:!!B,useFog:T.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Bt,skinning:L.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:st,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:Xt,decodeVideoTexture:Ee&&T.map.isVideoTexture===!0&&oe.getTransfer(T.map.colorSpace)===me,decodeVideoTextureEmissive:it&&T.emissiveMap.isVideoTexture===!0&&oe.getTransfer(T.emissiveMap.colorSpace)===me,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ze,flipSided:T.side===Ye,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:It&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(It&&T.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return _e.vertexUv1s=l.has(1),_e.vertexUv2s=l.has(2),_e.vertexUv3s=l.has(3),l.clear(),_e}function p(T){let b=[];if(T.shaderID?b.push(T.shaderID):(b.push(T.customVertexShaderID),b.push(T.customFragmentShaderID)),T.defines!==void 0)for(let R in T.defines)b.push(R),b.push(T.defines[R]);return T.isRawShaderMaterial===!1&&(v(b,T),_(b,T),b.push(s.outputColorSpace)),b.push(T.customProgramCacheKey),b.join()}function v(T,b){T.push(b.precision),T.push(b.outputColorSpace),T.push(b.envMapMode),T.push(b.envMapCubeUVHeight),T.push(b.mapUv),T.push(b.alphaMapUv),T.push(b.lightMapUv),T.push(b.aoMapUv),T.push(b.bumpMapUv),T.push(b.normalMapUv),T.push(b.displacementMapUv),T.push(b.emissiveMapUv),T.push(b.metalnessMapUv),T.push(b.roughnessMapUv),T.push(b.anisotropyMapUv),T.push(b.clearcoatMapUv),T.push(b.clearcoatNormalMapUv),T.push(b.clearcoatRoughnessMapUv),T.push(b.iridescenceMapUv),T.push(b.iridescenceThicknessMapUv),T.push(b.sheenColorMapUv),T.push(b.sheenRoughnessMapUv),T.push(b.specularMapUv),T.push(b.specularColorMapUv),T.push(b.specularIntensityMapUv),T.push(b.transmissionMapUv),T.push(b.thicknessMapUv),T.push(b.combine),T.push(b.fogExp2),T.push(b.sizeAttenuation),T.push(b.morphTargetsCount),T.push(b.morphAttributeCount),T.push(b.numDirLights),T.push(b.numPointLights),T.push(b.numSpotLights),T.push(b.numSpotLightMaps),T.push(b.numHemiLights),T.push(b.numRectAreaLights),T.push(b.numDirLightShadows),T.push(b.numPointLightShadows),T.push(b.numSpotLightShadows),T.push(b.numSpotLightShadowsWithMaps),T.push(b.numLightProbes),T.push(b.shadowMapType),T.push(b.toneMapping),T.push(b.numClippingPlanes),T.push(b.numClipIntersection),T.push(b.depthPacking)}function _(T,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),T.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),T.push(a.mask)}function x(T){let b=g[T.type],R;if(b){let k=hi[b];R=th.clone(k.uniforms)}else R=T.uniforms;return R}function M(T,b){let R;for(let k=0,L=h.length;k<L;k++){let B=h[k];if(B.cacheKey===b){R=B,++R.usedTimes;break}}return R===void 0&&(R=new l1(s,b,T,r),h.push(R)),R}function E(T){if(--T.usedTimes===0){let b=h.indexOf(T);h[b]=h[h.length-1],h.pop(),T.destroy()}}function C(T){c.remove(T)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:M,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:P}}function d1(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function f1(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function ag(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function cg(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,f,g,y,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:y,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=y,p.group=m),t++,p}function a(d,u,f,g,y,m){let p=o(d,u,f,g,y,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(d,u,f,g,y,m){let p=o(d,u,f,g,y,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(d,u){e.length>1&&e.sort(d||f1),n.length>1&&n.sort(u||ag),i.length>1&&i.sort(u||ag)}function h(){for(let d=t,u=s.length;d<u;d++){let f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function p1(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new cg,s.set(n,[o])):i>=r.length?(o=new cg,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function m1(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Gt};break;case"SpotLight":e={position:new F,direction:new F,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new F,halfWidth:new F,halfHeight:new F};break}return s[t.id]=e,e}}}function g1(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var y1=0;function x1(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function v1(s){let t=new m1,e=g1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);let i=new F,r=new ve,o=new ve;function a(l){let h=0,d=0,u=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,g=0,y=0,m=0,p=0,v=0,_=0,x=0,M=0,E=0,C=0;l.sort(x1);for(let T=0,b=l.length;T<b;T++){let R=l[T],k=R.color,L=R.intensity,B=R.distance,O=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=k.r*L,d+=k.g*L,u+=k.b*L;else if(R.isLightProbe){for(let D=0;D<9;D++)n.probe[D].addScaledVector(R.sh.coefficients[D],L);C++}else if(R.isDirectionalLight){let D=t.get(R);if(D.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let $=R.shadow,H=e.get(R);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=R.shadow.matrix,v++}n.directional[f]=D,f++}else if(R.isSpotLight){let D=t.get(R);D.position.setFromMatrixPosition(R.matrixWorld),D.color.copy(k).multiplyScalar(L),D.distance=B,D.coneCos=Math.cos(R.angle),D.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),D.decay=R.decay,n.spot[y]=D;let $=R.shadow;if(R.map&&(n.spotLightMap[M]=R.map,M++,$.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[y]=$.matrix,R.castShadow){let H=e.get(R);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,n.spotShadow[y]=H,n.spotShadowMap[y]=O,x++}y++}else if(R.isRectAreaLight){let D=t.get(R);D.color.copy(k).multiplyScalar(L),D.halfWidth.set(R.width*.5,0,0),D.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=D,m++}else if(R.isPointLight){let D=t.get(R);if(D.color.copy(R.color).multiplyScalar(R.intensity),D.distance=R.distance,D.decay=R.decay,R.castShadow){let $=R.shadow,H=e.get(R);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,H.shadowCameraNear=$.camera.near,H.shadowCameraFar=$.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=O,n.pointShadowMatrix[g]=R.shadow.matrix,_++}n.point[g]=D,g++}else if(R.isHemisphereLight){let D=t.get(R);D.skyColor.copy(R.color).multiplyScalar(L),D.groundColor.copy(R.groundColor).multiplyScalar(L),n.hemi[p]=D,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=vt.LTC_FLOAT_1,n.rectAreaLTC2=vt.LTC_FLOAT_2):(n.rectAreaLTC1=vt.LTC_HALF_1,n.rectAreaLTC2=vt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==y||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==v||P.numPointShadows!==_||P.numSpotShadows!==x||P.numSpotMaps!==M||P.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+M-E,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,P.directionalLength=f,P.pointLength=g,P.spotLength=y,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=v,P.numPointShadows=_,P.numSpotShadows=x,P.numSpotMaps=M,P.numLightProbes=C,n.version=y1++)}function c(l,h){let d=0,u=0,f=0,g=0,y=0,m=h.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){let _=l[p];if(_.isDirectionalLight){let x=n.directional[d];x.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(_.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(_.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){let x=n.point[u];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),u++}else if(_.isHemisphereLight){let x=n.hemi[y];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(m),y++}}}return{setup:a,setupView:c,state:n}}function lg(s){let t=new v1(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function _1(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new lg(s),t.set(i,[a])):r>=o.length?(a=new lg(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var b1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,w1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function M1(s,t,e){let n=new br,i=new ut,r=new ut,o=new Ie,a=new jc({depthPacking:Mm}),c=new Jc,l={},h=e.maxTextureSize,d={[Ri]:Ye,[Ye]:Ri,[Ze]:Ze},u=new Ge({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:b1,fragmentShader:w1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Oe;g.setAttribute("position",new Be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Le(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yu;let p=this.type;this.render=function(E,C,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let T=s.getRenderTarget(),b=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Di),k.buffers.depth.getReversed()?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let L=p!==li&&this.type===li,B=p===li&&this.type!==li;for(let O=0,D=E.length;O<D;O++){let $=E[O],H=$.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);let j=H.getFrameExtents();if(i.multiply(j),r.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/j.x),i.x=r.x*j.x,H.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/j.y),i.y=r.y*j.y,H.mapSize.y=r.y)),H.map===null||L===!0||B===!0){let pt=this.type!==li?{minFilter:dn,magFilter:dn}:{};H.map!==null&&H.map.dispose(),H.map=new si(i.x,i.y,pt),H.map.texture.name=$.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();let lt=H.getViewportCount();for(let pt=0;pt<lt;pt++){let st=H.getViewport(pt);o.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),k.viewport(o),H.updateMatrices($,pt),n=H.getFrustum(),x(C,P,H.camera,$,this.type)}H.isPointLightShadow!==!0&&this.type===li&&v(H,P),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(T,b,R)};function v(E,C){let P=t.update(y);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new si(i.x,i.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(C,null,P,u,y,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(C,null,P,f,y,null)}function _(E,C,P,T){let b=null,R=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)b=R;else if(b=P.isPointLight===!0?c:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let k=b.uuid,L=C.uuid,B=l[k];B===void 0&&(B={},l[k]=B);let O=B[L];O===void 0&&(O=b.clone(),B[L]=O,C.addEventListener("dispose",M)),b=O}if(b.visible=C.visible,b.wireframe=C.wireframe,T===li?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:d[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let k=s.properties.get(b);k.light=P}return b}function x(E,C,P,T,b){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&b===li)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);let L=t.update(E),B=E.material;if(Array.isArray(B)){let O=L.groups;for(let D=0,$=O.length;D<$;D++){let H=O[D],j=B[H.materialIndex];if(j&&j.visible){let lt=_(E,j,T,b);E.onBeforeShadow(s,E,C,P,L,lt,H),s.renderBufferDirect(P,null,L,lt,E,H),E.onAfterShadow(s,E,C,P,L,lt,H)}}}else if(B.visible){let O=_(E,B,T,b);E.onBeforeShadow(s,E,C,P,L,O,null),s.renderBufferDirect(P,null,L,O,E,null),E.onAfterShadow(s,E,C,P,L,O,null)}}let k=E.children;for(let L=0,B=k.length;L<B;L++)x(k[L],C,P,T,b)}function M(E){E.target.removeEventListener("dispose",M);for(let P in l){let T=l[P],b=E.target.uuid;b in T&&(T[b].dispose(),delete T[b])}}}var S1={[hl]:ul,[dl]:ml,[fl]:gl,[ws]:pl,[ul]:hl,[ml]:dl,[gl]:fl,[pl]:ws};function E1(s,t){function e(){let U=!1,ct=new Ie,yt=null,Et=new Ie(0,0,0,0);return{setMask:function(ot){yt!==ot&&!U&&(s.colorMask(ot,ot,ot,ot),yt=ot)},setLocked:function(ot){U=ot},setClear:function(ot,Q,It,Xt,_e){_e===!0&&(ot*=Xt,Q*=Xt,It*=Xt),ct.set(ot,Q,It,Xt),Et.equals(ct)===!1&&(s.clearColor(ot,Q,It,Xt),Et.copy(ct))},reset:function(){U=!1,yt=null,Et.set(-1,0,0,0)}}}function n(){let U=!1,ct=!1,yt=null,Et=null,ot=null;return{setReversed:function(Q){if(ct!==Q){let It=t.get("EXT_clip_control");Q?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),ct=Q;let Xt=ot;ot=null,this.setClear(Xt)}},getReversed:function(){return ct},setTest:function(Q){Q?ht(s.DEPTH_TEST):Bt(s.DEPTH_TEST)},setMask:function(Q){yt!==Q&&!U&&(s.depthMask(Q),yt=Q)},setFunc:function(Q){if(ct&&(Q=S1[Q]),Et!==Q){switch(Q){case hl:s.depthFunc(s.NEVER);break;case ul:s.depthFunc(s.ALWAYS);break;case dl:s.depthFunc(s.LESS);break;case ws:s.depthFunc(s.LEQUAL);break;case fl:s.depthFunc(s.EQUAL);break;case pl:s.depthFunc(s.GEQUAL);break;case ml:s.depthFunc(s.GREATER);break;case gl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Et=Q}},setLocked:function(Q){U=Q},setClear:function(Q){ot!==Q&&(ct&&(Q=1-Q),s.clearDepth(Q),ot=Q)},reset:function(){U=!1,yt=null,Et=null,ot=null,ct=!1}}}function i(){let U=!1,ct=null,yt=null,Et=null,ot=null,Q=null,It=null,Xt=null,_e=null;return{setTest:function(he){U||(he?ht(s.STENCIL_TEST):Bt(s.STENCIL_TEST))},setMask:function(he){ct!==he&&!U&&(s.stencilMask(he),ct=he)},setFunc:function(he,di,Kn){(yt!==he||Et!==di||ot!==Kn)&&(s.stencilFunc(he,di,Kn),yt=he,Et=di,ot=Kn)},setOp:function(he,di,Kn){(Q!==he||It!==di||Xt!==Kn)&&(s.stencilOp(he,di,Kn),Q=he,It=di,Xt=Kn)},setLocked:function(he){U=he},setClear:function(he){_e!==he&&(s.clearStencil(he),_e=he)},reset:function(){U=!1,ct=null,yt=null,Et=null,ot=null,Q=null,It=null,Xt=null,_e=null}}}let r=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap,h={},d={},u=new WeakMap,f=[],g=null,y=!1,m=null,p=null,v=null,_=null,x=null,M=null,E=null,C=new Gt(0,0,0),P=0,T=!1,b=null,R=null,k=null,L=null,B=null,O=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),D=!1,$=0,H=s.getParameter(s.VERSION);H.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(H)[1]),D=$>=1):H.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),D=$>=2);let j=null,lt={},pt=s.getParameter(s.SCISSOR_BOX),st=s.getParameter(s.VIEWPORT),Qt=new Ie().fromArray(pt),ne=new Ie().fromArray(st);function Z(U,ct,yt,Et){let ot=new Uint8Array(4),Q=s.createTexture();s.bindTexture(U,Q),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let It=0;It<yt;It++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(ct,0,s.RGBA,1,1,Et,0,s.RGBA,s.UNSIGNED_BYTE,ot):s.texImage2D(ct+It,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ot);return Q}let mt={};mt[s.TEXTURE_2D]=Z(s.TEXTURE_2D,s.TEXTURE_2D,1),mt[s.TEXTURE_CUBE_MAP]=Z(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[s.TEXTURE_2D_ARRAY]=Z(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),mt[s.TEXTURE_3D]=Z(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(s.DEPTH_TEST),o.setFunc(ws),nt(!1),J(Xu),ht(s.CULL_FACE),tt(Di);function ht(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function Bt(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Pt(U,ct){return d[U]!==ct?(s.bindFramebuffer(U,ct),d[U]=ct,U===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ct),U===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ct),!0):!1}function zt(U,ct){let yt=f,Et=!1;if(U){yt=u.get(ct),yt===void 0&&(yt=[],u.set(ct,yt));let ot=U.textures;if(yt.length!==ot.length||yt[0]!==s.COLOR_ATTACHMENT0){for(let Q=0,It=ot.length;Q<It;Q++)yt[Q]=s.COLOR_ATTACHMENT0+Q;yt.length=ot.length,Et=!0}}else yt[0]!==s.BACK&&(yt[0]=s.BACK,Et=!0);Et&&s.drawBuffers(yt)}function Ee(U){return g!==U?(s.useProgram(U),g=U,!0):!1}let Wt={[ts]:s.FUNC_ADD,[Kp]:s.FUNC_SUBTRACT,[jp]:s.FUNC_REVERSE_SUBTRACT};Wt[Jp]=s.MIN,Wt[Qp]=s.MAX;let N={[tm]:s.ZERO,[em]:s.ONE,[nm]:s.SRC_COLOR,[Pc]:s.SRC_ALPHA,[cm]:s.SRC_ALPHA_SATURATE,[om]:s.DST_COLOR,[sm]:s.DST_ALPHA,[im]:s.ONE_MINUS_SRC_COLOR,[Lc]:s.ONE_MINUS_SRC_ALPHA,[am]:s.ONE_MINUS_DST_COLOR,[rm]:s.ONE_MINUS_DST_ALPHA,[lm]:s.CONSTANT_COLOR,[hm]:s.ONE_MINUS_CONSTANT_COLOR,[um]:s.CONSTANT_ALPHA,[dm]:s.ONE_MINUS_CONSTANT_ALPHA};function tt(U,ct,yt,Et,ot,Q,It,Xt,_e,he){if(U===Di){y===!0&&(Bt(s.BLEND),y=!1);return}if(y===!1&&(ht(s.BLEND),y=!0),U!==$p){if(U!==m||he!==T){if((p!==ts||x!==ts)&&(s.blendEquation(s.FUNC_ADD),p=ts,x=ts),he)switch(U){case Ii:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Tr:s.blendFunc(s.ONE,s.ONE);break;case Zu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case $u:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ii:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Tr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Zu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $u:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,_=null,M=null,E=null,C.set(0,0,0),P=0,m=U,T=he}return}ot=ot||ct,Q=Q||yt,It=It||Et,(ct!==p||ot!==x)&&(s.blendEquationSeparate(Wt[ct],Wt[ot]),p=ct,x=ot),(yt!==v||Et!==_||Q!==M||It!==E)&&(s.blendFuncSeparate(N[yt],N[Et],N[Q],N[It]),v=yt,_=Et,M=Q,E=It),(Xt.equals(C)===!1||_e!==P)&&(s.blendColor(Xt.r,Xt.g,Xt.b,_e),C.copy(Xt),P=_e),m=U,T=!1}function K(U,ct){U.side===Ze?Bt(s.CULL_FACE):ht(s.CULL_FACE);let yt=U.side===Ye;ct&&(yt=!yt),nt(yt),U.blending===Ii&&U.transparent===!1?tt(Di):tt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let Et=U.stencilWrite;a.setTest(Et),Et&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),it(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ht(s.SAMPLE_ALPHA_TO_COVERAGE):Bt(s.SAMPLE_ALPHA_TO_COVERAGE)}function nt(U){b!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),b=U)}function J(U){U!==Yp?(ht(s.CULL_FACE),U!==R&&(U===Xu?s.cullFace(s.BACK):U===Zp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Bt(s.CULL_FACE),R=U}function ft(U){U!==k&&(D&&s.lineWidth(U),k=U)}function it(U,ct,yt){U?(ht(s.POLYGON_OFFSET_FILL),(L!==ct||B!==yt)&&(s.polygonOffset(ct,yt),L=ct,B=yt)):Bt(s.POLYGON_OFFSET_FILL)}function gt(U){U?ht(s.SCISSOR_TEST):Bt(s.SCISSOR_TEST)}function qt(U){U===void 0&&(U=s.TEXTURE0+O-1),j!==U&&(s.activeTexture(U),j=U)}function Ht(U,ct,yt){yt===void 0&&(j===null?yt=s.TEXTURE0+O-1:yt=j);let Et=lt[yt];Et===void 0&&(Et={type:void 0,texture:void 0},lt[yt]=Et),(Et.type!==U||Et.texture!==ct)&&(j!==yt&&(s.activeTexture(yt),j=yt),s.bindTexture(U,ct||mt[U]),Et.type=U,Et.texture=ct)}function I(){let U=lt[j];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function w(){try{s.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function G(){try{s.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{s.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{s.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{s.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Lt(){try{s.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{s.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ct(){try{s.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Rt(){try{s.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function rt(){try{s.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(U){Qt.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),Qt.copy(U))}function kt(U){ne.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),ne.copy(U))}function Nt(U,ct){let yt=l.get(ct);yt===void 0&&(yt=new WeakMap,l.set(ct,yt));let Et=yt.get(U);Et===void 0&&(Et=s.getUniformBlockIndex(ct,U.name),yt.set(U,Et))}function bt(U,ct){let Et=l.get(ct).get(U);c.get(ct)!==Et&&(s.uniformBlockBinding(ct,Et,U.__bindingPointIndex),c.set(ct,Et))}function Zt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},j=null,lt={},d={},u=new WeakMap,f=[],g=null,y=!1,m=null,p=null,v=null,_=null,x=null,M=null,E=null,C=new Gt(0,0,0),P=0,T=!1,b=null,R=null,k=null,L=null,B=null,Qt.set(0,0,s.canvas.width,s.canvas.height),ne.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ht,disable:Bt,bindFramebuffer:Pt,drawBuffers:zt,useProgram:Ee,setBlending:tt,setMaterial:K,setFlipSided:nt,setCullFace:J,setLineWidth:ft,setPolygonOffset:it,setScissorTest:gt,activeTexture:qt,bindTexture:Ht,unbindTexture:I,compressedTexImage2D:w,compressedTexImage3D:G,texImage2D:Rt,texImage3D:rt,updateUBOMapping:Nt,uniformBlockBinding:bt,texStorage2D:dt,texStorage3D:Ct,texSubImage2D:X,texSubImage3D:et,compressedTexSubImage2D:Y,compressedTexSubImage3D:Lt,scissor:Mt,viewport:kt,reset:Zt}}function T1(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ut,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,w){return f?new OffscreenCanvas(I,w):Io("canvas")}function y(I,w,G){let X=1,et=Ht(I);if((et.width>G||et.height>G)&&(X=G/Math.max(et.width,et.height)),X<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let Y=Math.floor(X*et.width),Lt=Math.floor(X*et.height);d===void 0&&(d=g(Y,Lt));let dt=w?g(Y,Lt):d;return dt.width=Y,dt.height=Lt,dt.getContext("2d").drawImage(I,0,0,Y,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+Y+"x"+Lt+")."),dt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){s.generateMipmap(I)}function v(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(I,w,G,X,et=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Y=w;if(w===s.RED&&(G===s.FLOAT&&(Y=s.R32F),G===s.HALF_FLOAT&&(Y=s.R16F),G===s.UNSIGNED_BYTE&&(Y=s.R8)),w===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(Y=s.R8UI),G===s.UNSIGNED_SHORT&&(Y=s.R16UI),G===s.UNSIGNED_INT&&(Y=s.R32UI),G===s.BYTE&&(Y=s.R8I),G===s.SHORT&&(Y=s.R16I),G===s.INT&&(Y=s.R32I)),w===s.RG&&(G===s.FLOAT&&(Y=s.RG32F),G===s.HALF_FLOAT&&(Y=s.RG16F),G===s.UNSIGNED_BYTE&&(Y=s.RG8)),w===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(Y=s.RG8UI),G===s.UNSIGNED_SHORT&&(Y=s.RG16UI),G===s.UNSIGNED_INT&&(Y=s.RG32UI),G===s.BYTE&&(Y=s.RG8I),G===s.SHORT&&(Y=s.RG16I),G===s.INT&&(Y=s.RG32I)),w===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),G===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),G===s.UNSIGNED_INT&&(Y=s.RGB32UI),G===s.BYTE&&(Y=s.RGB8I),G===s.SHORT&&(Y=s.RGB16I),G===s.INT&&(Y=s.RGB32I)),w===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),G===s.UNSIGNED_INT&&(Y=s.RGBA32UI),G===s.BYTE&&(Y=s.RGBA8I),G===s.SHORT&&(Y=s.RGBA16I),G===s.INT&&(Y=s.RGBA32I)),w===s.RGB&&G===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),w===s.RGBA){let Lt=et?Co:oe.getTransfer(X);G===s.FLOAT&&(Y=s.RGBA32F),G===s.HALF_FLOAT&&(Y=s.RGBA16F),G===s.UNSIGNED_BYTE&&(Y=Lt===me?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function x(I,w){let G;return I?w===null||w===os||w===Rr?G=s.DEPTH24_STENCIL8:w===Zn?G=s.DEPTH32F_STENCIL8:w===Ar&&(G=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===os||w===Rr?G=s.DEPTH_COMPONENT24:w===Zn?G=s.DEPTH_COMPONENT32F:w===Ar&&(G=s.DEPTH_COMPONENT16),G}function M(I,w){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==dn&&I.minFilter!==Mn?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function E(I){let w=I.target;w.removeEventListener("dispose",E),P(w),w.isVideoTexture&&h.delete(w)}function C(I){let w=I.target;w.removeEventListener("dispose",C),b(w)}function P(I){let w=n.get(I);if(w.__webglInit===void 0)return;let G=I.source,X=u.get(G);if(X){let et=X[w.__cacheKey];et.usedTimes--,et.usedTimes===0&&T(I),Object.keys(X).length===0&&u.delete(G)}n.remove(I)}function T(I){let w=n.get(I);s.deleteTexture(w.__webglTexture);let G=I.source,X=u.get(G);delete X[w.__cacheKey],o.memory.textures--}function b(I){let w=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(w.__webglFramebuffer[X]))for(let et=0;et<w.__webglFramebuffer[X].length;et++)s.deleteFramebuffer(w.__webglFramebuffer[X][et]);else s.deleteFramebuffer(w.__webglFramebuffer[X]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[X])}else{if(Array.isArray(w.__webglFramebuffer))for(let X=0;X<w.__webglFramebuffer.length;X++)s.deleteFramebuffer(w.__webglFramebuffer[X]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let X=0;X<w.__webglColorRenderbuffer.length;X++)w.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[X]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let G=I.textures;for(let X=0,et=G.length;X<et;X++){let Y=n.get(G[X]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(G[X])}n.remove(I)}let R=0;function k(){R=0}function L(){let I=R;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),R+=1,I}function B(I){let w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function O(I,w){let G=n.get(I);if(I.isVideoTexture&&gt(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&G.__version!==I.version){let X=I.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{mt(G,I,w);return}}else I.isExternalTexture&&(G.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+w)}function D(I,w){let G=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&G.__version!==I.version){mt(G,I,w);return}e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+w)}function $(I,w){let G=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&G.__version!==I.version){mt(G,I,w);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+w)}function H(I,w){let G=n.get(I);if(I.version>0&&G.__version!==I.version){ht(G,I,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+w)}let j={[pr]:s.REPEAT,[Qi]:s.CLAMP_TO_EDGE,[Nc]:s.MIRRORED_REPEAT},lt={[dn]:s.NEAREST,[bm]:s.NEAREST_MIPMAP_NEAREST,[da]:s.NEAREST_MIPMAP_LINEAR,[Mn]:s.LINEAR,[_l]:s.LINEAR_MIPMAP_NEAREST,[rs]:s.LINEAR_MIPMAP_LINEAR},pt={[Em]:s.NEVER,[Pm]:s.ALWAYS,[Tm]:s.LESS,[od]:s.LEQUAL,[Am]:s.EQUAL,[Im]:s.GEQUAL,[Cm]:s.GREATER,[Rm]:s.NOTEQUAL};function st(I,w){if(w.type===Zn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Mn||w.magFilter===_l||w.magFilter===da||w.magFilter===rs||w.minFilter===Mn||w.minFilter===_l||w.minFilter===da||w.minFilter===rs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,j[w.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,j[w.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,j[w.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,lt[w.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,lt[w.minFilter]),w.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,pt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===dn||w.minFilter!==da&&w.minFilter!==rs||w.type===Zn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(I,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Qt(I,w){let G=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",E));let X=w.source,et=u.get(X);et===void 0&&(et={},u.set(X,et));let Y=B(w);if(Y!==I.__cacheKey){et[Y]===void 0&&(et[Y]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,G=!0),et[Y].usedTimes++;let Lt=et[I.__cacheKey];Lt!==void 0&&(et[I.__cacheKey].usedTimes--,Lt.usedTimes===0&&T(w)),I.__cacheKey=Y,I.__webglTexture=et[Y].texture}return G}function ne(I,w,G){return Math.floor(Math.floor(I/G)/w)}function Z(I,w,G,X){let Y=I.updateRanges;if(Y.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,G,X,w.data);else{Y.sort((rt,Mt)=>rt.start-Mt.start);let Lt=0;for(let rt=1;rt<Y.length;rt++){let Mt=Y[Lt],kt=Y[rt],Nt=Mt.start+Mt.count,bt=ne(kt.start,w.width,4),Zt=ne(Mt.start,w.width,4);kt.start<=Nt+1&&bt===Zt&&ne(kt.start+kt.count-1,w.width,4)===bt?Mt.count=Math.max(Mt.count,kt.start+kt.count-Mt.start):(++Lt,Y[Lt]=kt)}Y.length=Lt+1;let dt=s.getParameter(s.UNPACK_ROW_LENGTH),Ct=s.getParameter(s.UNPACK_SKIP_PIXELS),Rt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let rt=0,Mt=Y.length;rt<Mt;rt++){let kt=Y[rt],Nt=Math.floor(kt.start/4),bt=Math.ceil(kt.count/4),Zt=Nt%w.width,U=Math.floor(Nt/w.width),ct=bt,yt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Zt),s.pixelStorei(s.UNPACK_SKIP_ROWS,U),e.texSubImage2D(s.TEXTURE_2D,0,Zt,U,ct,yt,G,X,w.data)}I.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,dt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ct),s.pixelStorei(s.UNPACK_SKIP_ROWS,Rt)}}function mt(I,w,G){let X=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(X=s.TEXTURE_3D);let et=Qt(I,w),Y=w.source;e.bindTexture(X,I.__webglTexture,s.TEXTURE0+G);let Lt=n.get(Y);if(Y.version!==Lt.__version||et===!0){e.activeTexture(s.TEXTURE0+G);let dt=oe.getPrimaries(oe.workingColorSpace),Ct=w.colorSpace===Fi?null:oe.getPrimaries(w.colorSpace),Rt=w.colorSpace===Fi||dt===Ct?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let rt=y(w.image,!1,i.maxTextureSize);rt=qt(w,rt);let Mt=r.convert(w.format,w.colorSpace),kt=r.convert(w.type),Nt=_(w.internalFormat,Mt,kt,w.colorSpace,w.isVideoTexture);st(X,w);let bt,Zt=w.mipmaps,U=w.isVideoTexture!==!0,ct=Lt.__version===void 0||et===!0,yt=Y.dataReady,Et=M(w,rt);if(w.isDepthTexture)Nt=x(w.format===Ir,w.type),ct&&(U?e.texStorage2D(s.TEXTURE_2D,1,Nt,rt.width,rt.height):e.texImage2D(s.TEXTURE_2D,0,Nt,rt.width,rt.height,0,Mt,kt,null));else if(w.isDataTexture)if(Zt.length>0){U&&ct&&e.texStorage2D(s.TEXTURE_2D,Et,Nt,Zt[0].width,Zt[0].height);for(let ot=0,Q=Zt.length;ot<Q;ot++)bt=Zt[ot],U?yt&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,bt.width,bt.height,Mt,kt,bt.data):e.texImage2D(s.TEXTURE_2D,ot,Nt,bt.width,bt.height,0,Mt,kt,bt.data);w.generateMipmaps=!1}else U?(ct&&e.texStorage2D(s.TEXTURE_2D,Et,Nt,rt.width,rt.height),yt&&Z(w,rt,Mt,kt)):e.texImage2D(s.TEXTURE_2D,0,Nt,rt.width,rt.height,0,Mt,kt,rt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){U&&ct&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Et,Nt,Zt[0].width,Zt[0].height,rt.depth);for(let ot=0,Q=Zt.length;ot<Q;ot++)if(bt=Zt[ot],w.format!==Bn)if(Mt!==null)if(U){if(yt)if(w.layerUpdates.size>0){let It=pd(bt.width,bt.height,w.format,w.type);for(let Xt of w.layerUpdates){let _e=bt.data.subarray(Xt*It/bt.data.BYTES_PER_ELEMENT,(Xt+1)*It/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,Xt,bt.width,bt.height,1,Mt,_e)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,bt.width,bt.height,rt.depth,Mt,bt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ot,Nt,bt.width,bt.height,rt.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?yt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,bt.width,bt.height,rt.depth,Mt,kt,bt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ot,Nt,bt.width,bt.height,rt.depth,0,Mt,kt,bt.data)}else{U&&ct&&e.texStorage2D(s.TEXTURE_2D,Et,Nt,Zt[0].width,Zt[0].height);for(let ot=0,Q=Zt.length;ot<Q;ot++)bt=Zt[ot],w.format!==Bn?Mt!==null?U?yt&&e.compressedTexSubImage2D(s.TEXTURE_2D,ot,0,0,bt.width,bt.height,Mt,bt.data):e.compressedTexImage2D(s.TEXTURE_2D,ot,Nt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?yt&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,bt.width,bt.height,Mt,kt,bt.data):e.texImage2D(s.TEXTURE_2D,ot,Nt,bt.width,bt.height,0,Mt,kt,bt.data)}else if(w.isDataArrayTexture)if(U){if(ct&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Et,Nt,rt.width,rt.height,rt.depth),yt)if(w.layerUpdates.size>0){let ot=pd(rt.width,rt.height,w.format,w.type);for(let Q of w.layerUpdates){let It=rt.data.subarray(Q*ot/rt.data.BYTES_PER_ELEMENT,(Q+1)*ot/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Q,rt.width,rt.height,1,Mt,kt,It)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,Mt,kt,rt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Nt,rt.width,rt.height,rt.depth,0,Mt,kt,rt.data);else if(w.isData3DTexture)U?(ct&&e.texStorage3D(s.TEXTURE_3D,Et,Nt,rt.width,rt.height,rt.depth),yt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,Mt,kt,rt.data)):e.texImage3D(s.TEXTURE_3D,0,Nt,rt.width,rt.height,rt.depth,0,Mt,kt,rt.data);else if(w.isFramebufferTexture){if(ct)if(U)e.texStorage2D(s.TEXTURE_2D,Et,Nt,rt.width,rt.height);else{let ot=rt.width,Q=rt.height;for(let It=0;It<Et;It++)e.texImage2D(s.TEXTURE_2D,It,Nt,ot,Q,0,Mt,kt,null),ot>>=1,Q>>=1}}else if(Zt.length>0){if(U&&ct){let ot=Ht(Zt[0]);e.texStorage2D(s.TEXTURE_2D,Et,Nt,ot.width,ot.height)}for(let ot=0,Q=Zt.length;ot<Q;ot++)bt=Zt[ot],U?yt&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,Mt,kt,bt):e.texImage2D(s.TEXTURE_2D,ot,Nt,Mt,kt,bt);w.generateMipmaps=!1}else if(U){if(ct){let ot=Ht(rt);e.texStorage2D(s.TEXTURE_2D,Et,Nt,ot.width,ot.height)}yt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Mt,kt,rt)}else e.texImage2D(s.TEXTURE_2D,0,Nt,Mt,kt,rt);m(w)&&p(X),Lt.__version=Y.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function ht(I,w,G){if(w.image.length!==6)return;let X=Qt(I,w),et=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+G);let Y=n.get(et);if(et.version!==Y.__version||X===!0){e.activeTexture(s.TEXTURE0+G);let Lt=oe.getPrimaries(oe.workingColorSpace),dt=w.colorSpace===Fi?null:oe.getPrimaries(w.colorSpace),Ct=w.colorSpace===Fi||Lt===dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let Rt=w.isCompressedTexture||w.image[0].isCompressedTexture,rt=w.image[0]&&w.image[0].isDataTexture,Mt=[];for(let Q=0;Q<6;Q++)!Rt&&!rt?Mt[Q]=y(w.image[Q],!0,i.maxCubemapSize):Mt[Q]=rt?w.image[Q].image:w.image[Q],Mt[Q]=qt(w,Mt[Q]);let kt=Mt[0],Nt=r.convert(w.format,w.colorSpace),bt=r.convert(w.type),Zt=_(w.internalFormat,Nt,bt,w.colorSpace),U=w.isVideoTexture!==!0,ct=Y.__version===void 0||X===!0,yt=et.dataReady,Et=M(w,kt);st(s.TEXTURE_CUBE_MAP,w);let ot;if(Rt){U&&ct&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Et,Zt,kt.width,kt.height);for(let Q=0;Q<6;Q++){ot=Mt[Q].mipmaps;for(let It=0;It<ot.length;It++){let Xt=ot[It];w.format!==Bn?Nt!==null?U?yt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,It,0,0,Xt.width,Xt.height,Nt,Xt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,It,Zt,Xt.width,Xt.height,0,Xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?yt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,It,0,0,Xt.width,Xt.height,Nt,bt,Xt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,It,Zt,Xt.width,Xt.height,0,Nt,bt,Xt.data)}}}else{if(ot=w.mipmaps,U&&ct){ot.length>0&&Et++;let Q=Ht(Mt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Et,Zt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(rt){U?yt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Mt[Q].width,Mt[Q].height,Nt,bt,Mt[Q].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Zt,Mt[Q].width,Mt[Q].height,0,Nt,bt,Mt[Q].data);for(let It=0;It<ot.length;It++){let _e=ot[It].image[Q].image;U?yt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,It+1,0,0,_e.width,_e.height,Nt,bt,_e.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,It+1,Zt,_e.width,_e.height,0,Nt,bt,_e.data)}}else{U?yt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Nt,bt,Mt[Q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Zt,Nt,bt,Mt[Q]);for(let It=0;It<ot.length;It++){let Xt=ot[It];U?yt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,It+1,0,0,Nt,bt,Xt.image[Q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,It+1,Zt,Nt,bt,Xt.image[Q])}}}m(w)&&p(s.TEXTURE_CUBE_MAP),Y.__version=et.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Bt(I,w,G,X,et,Y){let Lt=r.convert(G.format,G.colorSpace),dt=r.convert(G.type),Ct=_(G.internalFormat,Lt,dt,G.colorSpace),Rt=n.get(w),rt=n.get(G);if(rt.__renderTarget=w,!Rt.__hasExternalTextures){let Mt=Math.max(1,w.width>>Y),kt=Math.max(1,w.height>>Y);et===s.TEXTURE_3D||et===s.TEXTURE_2D_ARRAY?e.texImage3D(et,Y,Ct,Mt,kt,w.depth,0,Lt,dt,null):e.texImage2D(et,Y,Ct,Mt,kt,0,Lt,dt,null)}e.bindFramebuffer(s.FRAMEBUFFER,I),it(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,et,rt.__webglTexture,0,ft(w)):(et===s.TEXTURE_2D||et>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,et,rt.__webglTexture,Y),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Pt(I,w,G){if(s.bindRenderbuffer(s.RENDERBUFFER,I),w.depthBuffer){let X=w.depthTexture,et=X&&X.isDepthTexture?X.type:null,Y=x(w.stencilBuffer,et),Lt=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=ft(w);it(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,dt,Y,w.width,w.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,Y,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,Y,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Lt,s.RENDERBUFFER,I)}else{let X=w.textures;for(let et=0;et<X.length;et++){let Y=X[et],Lt=r.convert(Y.format,Y.colorSpace),dt=r.convert(Y.type),Ct=_(Y.internalFormat,Lt,dt,Y.colorSpace),Rt=ft(w);G&&it(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Rt,Ct,w.width,w.height):it(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Rt,Ct,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,Ct,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function zt(I,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(w.depthTexture);X.__renderTarget=w,(!X.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),O(w.depthTexture,0);let et=X.__webglTexture,Y=ft(w);if(w.depthTexture.format===mr)it(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,et,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,et,0);else if(w.depthTexture.format===Ir)it(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,et,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function Ee(I){let w=n.get(I),G=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){let X=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),X){let et=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,X.removeEventListener("dispose",et)};X.addEventListener("dispose",et),w.__depthDisposeCallback=et}w.__boundDepthTexture=X}if(I.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");let X=I.texture.mipmaps;X&&X.length>0?zt(w.__webglFramebuffer[0],I):zt(w.__webglFramebuffer,I)}else if(G){w.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[X]),w.__webglDepthbuffer[X]===void 0)w.__webglDepthbuffer[X]=s.createRenderbuffer(),Pt(w.__webglDepthbuffer[X],I,!1);else{let et=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=w.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,et,s.RENDERBUFFER,Y)}}else{let X=I.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),Pt(w.__webglDepthbuffer,I,!1);else{let et=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,et,s.RENDERBUFFER,Y)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Wt(I,w,G){let X=n.get(I);w!==void 0&&Bt(X.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&Ee(I)}function N(I){let w=I.texture,G=n.get(I),X=n.get(w);I.addEventListener("dispose",C);let et=I.textures,Y=I.isWebGLCubeRenderTarget===!0,Lt=et.length>1;if(Lt||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=w.version,o.memory.textures++),Y){G.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[dt]=[];for(let Ct=0;Ct<w.mipmaps.length;Ct++)G.__webglFramebuffer[dt][Ct]=s.createFramebuffer()}else G.__webglFramebuffer[dt]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let dt=0;dt<w.mipmaps.length;dt++)G.__webglFramebuffer[dt]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(Lt)for(let dt=0,Ct=et.length;dt<Ct;dt++){let Rt=n.get(et[dt]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&it(I)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let dt=0;dt<et.length;dt++){let Ct=et[dt];G.__webglColorRenderbuffer[dt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[dt]);let Rt=r.convert(Ct.format,Ct.colorSpace),rt=r.convert(Ct.type),Mt=_(Ct.internalFormat,Rt,rt,Ct.colorSpace,I.isXRRenderTarget===!0),kt=ft(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,kt,Mt,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+dt,s.RENDERBUFFER,G.__webglColorRenderbuffer[dt])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),Pt(G.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){e.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),st(s.TEXTURE_CUBE_MAP,w);for(let dt=0;dt<6;dt++)if(w.mipmaps&&w.mipmaps.length>0)for(let Ct=0;Ct<w.mipmaps.length;Ct++)Bt(G.__webglFramebuffer[dt][Ct],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Ct);else Bt(G.__webglFramebuffer[dt],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);m(w)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let dt=0,Ct=et.length;dt<Ct;dt++){let Rt=et[dt],rt=n.get(Rt),Mt=s.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Mt=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Mt,rt.__webglTexture),st(Mt,Rt),Bt(G.__webglFramebuffer,I,Rt,s.COLOR_ATTACHMENT0+dt,Mt,0),m(Rt)&&p(Mt)}e.unbindTexture()}else{let dt=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(dt=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(dt,X.__webglTexture),st(dt,w),w.mipmaps&&w.mipmaps.length>0)for(let Ct=0;Ct<w.mipmaps.length;Ct++)Bt(G.__webglFramebuffer[Ct],I,w,s.COLOR_ATTACHMENT0,dt,Ct);else Bt(G.__webglFramebuffer,I,w,s.COLOR_ATTACHMENT0,dt,0);m(w)&&p(dt),e.unbindTexture()}I.depthBuffer&&Ee(I)}function tt(I){let w=I.textures;for(let G=0,X=w.length;G<X;G++){let et=w[G];if(m(et)){let Y=v(I),Lt=n.get(et).__webglTexture;e.bindTexture(Y,Lt),p(Y),e.unbindTexture()}}}let K=[],nt=[];function J(I){if(I.samples>0){if(it(I)===!1){let w=I.textures,G=I.width,X=I.height,et=s.COLOR_BUFFER_BIT,Y=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Lt=n.get(I),dt=w.length>1;if(dt)for(let Rt=0;Rt<w.length;Rt++)e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);let Ct=I.texture.mipmaps;Ct&&Ct.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Rt=0;Rt<w.length;Rt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(et|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(et|=s.STENCIL_BUFFER_BIT)),dt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Lt.__webglColorRenderbuffer[Rt]);let rt=n.get(w[Rt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,rt,0)}s.blitFramebuffer(0,0,G,X,0,0,G,X,et,s.NEAREST),c===!0&&(K.length=0,nt.length=0,K.push(s.COLOR_ATTACHMENT0+Rt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(K.push(Y),nt.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,nt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,K))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),dt)for(let Rt=0;Rt<w.length;Rt++){e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.RENDERBUFFER,Lt.__webglColorRenderbuffer[Rt]);let rt=n.get(w[Rt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.TEXTURE_2D,rt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){let w=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function ft(I){return Math.min(i.maxSamples,I.samples)}function it(I){let w=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function gt(I){let w=o.render.frame;h.get(I)!==w&&(h.set(I,w),I.update())}function qt(I,w){let G=I.colorSpace,X=I.format,et=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||G!==Ms&&G!==Fi&&(oe.getTransfer(G)===me?(X!==Bn||et!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}function Ht(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=k,this.setTexture2D=O,this.setTexture2DArray=D,this.setTexture3D=$,this.setTextureCube=H,this.rebindTextures=Wt,this.setupRenderTarget=N,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Bt,this.useMultisampledRTT=it}function A1(s,t){function e(n,i=Fi){let r,o=oe.getTransfer(i);if(n===Yn)return s.UNSIGNED_BYTE;if(n===wl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ml)return s.UNSIGNED_SHORT_5_5_5_1;if(n===td)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ju)return s.BYTE;if(n===Qu)return s.SHORT;if(n===Ar)return s.UNSIGNED_SHORT;if(n===bl)return s.INT;if(n===os)return s.UNSIGNED_INT;if(n===Zn)return s.FLOAT;if(n===Cr)return s.HALF_FLOAT;if(n===ed)return s.ALPHA;if(n===nd)return s.RGB;if(n===Bn)return s.RGBA;if(n===mr)return s.DEPTH_COMPONENT;if(n===Ir)return s.DEPTH_STENCIL;if(n===Pr)return s.RED;if(n===Sl)return s.RED_INTEGER;if(n===id)return s.RG;if(n===El)return s.RG_INTEGER;if(n===Tl)return s.RGBA_INTEGER;if(n===fa||n===pa||n===ma||n===ga)if(o===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Al||n===Cl||n===Rl||n===Il)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Al)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Cl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Il)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Pl||n===Ll||n===Nl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Pl||n===Ll)return o===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Nl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Dl||n===Bl||n===Fl||n===Ul||n===Ol||n===zl||n===kl||n===Vl||n===Hl||n===Gl||n===Wl||n===ql||n===Xl||n===Yl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Dl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ul)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ol)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===kl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Hl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Gl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ql)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Xl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Yl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ya||n===Zl||n===$l)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ya)return o===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Zl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$l)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sd||n===Kl||n===jl||n===Jl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ya)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Kl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Jl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Rr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var rh=class extends on{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}},C1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,R1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ad=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new rh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ge({vertexShader:C1,fragmentShader:R1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Le(new Xn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Cd=class extends Pi{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null,y=new Ad,m={},p=e.getContextAttributes(),v=null,_=null,x=[],M=[],E=new ut,C=null,P=new Je;P.viewport=new Ie;let T=new Je;T.viewport=new Ie;let b=[P,T],R=new cl,k=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let mt=x[Z];return mt===void 0&&(mt=new xr,x[Z]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(Z){let mt=x[Z];return mt===void 0&&(mt=new xr,x[Z]=mt),mt.getGripSpace()},this.getHand=function(Z){let mt=x[Z];return mt===void 0&&(mt=new xr,x[Z]=mt),mt.getHandSpace()};function B(Z){let mt=M.indexOf(Z.inputSource);if(mt===-1)return;let ht=x[mt];ht!==void 0&&(ht.update(Z.inputSource,Z.frame,l||o),ht.dispatchEvent({type:Z.type,data:Z.inputSource}))}function O(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",D);for(let Z=0;Z<x.length;Z++){let mt=M[Z];mt!==null&&(M[Z]=null,x[Z].disconnect(mt))}k=null,L=null,y.reset();for(let Z in m)delete m[Z];t.setRenderTarget(v),f=null,u=null,d=null,i=null,_=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(v=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",O),i.addEventListener("inputsourceschange",D),p.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(E),typeof XRWebGLBinding<"u"&&(d=new XRWebGLBinding(i,e)),d!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,Bt=null,Pt=null;p.depth&&(Pt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=p.stencil?Ir:mr,Bt=p.stencil?Rr:os);let zt={colorFormat:e.RGBA8,depthFormat:Pt,scaleFactor:r};u=d.createProjectionLayer(zt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new si(u.textureWidth,u.textureHeight,{format:Bn,type:Yn,depthTexture:new Wo(u.textureWidth,u.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let ht={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,ht),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new si(f.framebufferWidth,f.framebufferHeight,{format:Bn,type:Yn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function D(Z){for(let mt=0;mt<Z.removed.length;mt++){let ht=Z.removed[mt],Bt=M.indexOf(ht);Bt>=0&&(M[Bt]=null,x[Bt].disconnect(ht))}for(let mt=0;mt<Z.added.length;mt++){let ht=Z.added[mt],Bt=M.indexOf(ht);if(Bt===-1){for(let zt=0;zt<x.length;zt++)if(zt>=M.length){M.push(ht),Bt=zt;break}else if(M[zt]===null){M[zt]=ht,Bt=zt;break}if(Bt===-1)break}let Pt=x[Bt];Pt&&Pt.connect(ht)}}let $=new F,H=new F;function j(Z,mt,ht){$.setFromMatrixPosition(mt.matrixWorld),H.setFromMatrixPosition(ht.matrixWorld);let Bt=$.distanceTo(H),Pt=mt.projectionMatrix.elements,zt=ht.projectionMatrix.elements,Ee=Pt[14]/(Pt[10]-1),Wt=Pt[14]/(Pt[10]+1),N=(Pt[9]+1)/Pt[5],tt=(Pt[9]-1)/Pt[5],K=(Pt[8]-1)/Pt[0],nt=(zt[8]+1)/zt[0],J=Ee*K,ft=Ee*nt,it=Bt/(-K+nt),gt=it*-K;if(mt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(gt),Z.translateZ(it),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Pt[10]===-1)Z.projectionMatrix.copy(mt.projectionMatrix),Z.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{let qt=Ee+it,Ht=Wt+it,I=J-gt,w=ft+(Bt-gt),G=N*Wt/Ht*qt,X=tt*Wt/Ht*qt;Z.projectionMatrix.makePerspective(I,w,G,X,qt,Ht),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function lt(Z,mt){mt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(mt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let mt=Z.near,ht=Z.far;y.texture!==null&&(y.depthNear>0&&(mt=y.depthNear),y.depthFar>0&&(ht=y.depthFar)),R.near=T.near=P.near=mt,R.far=T.far=P.far=ht,(k!==R.near||L!==R.far)&&(i.updateRenderState({depthNear:R.near,depthFar:R.far}),k=R.near,L=R.far),R.layers.mask=Z.layers.mask|6,P.layers.mask=R.layers.mask&3,T.layers.mask=R.layers.mask&5;let Bt=Z.parent,Pt=R.cameras;lt(R,Bt);for(let zt=0;zt<Pt.length;zt++)lt(Pt[zt],Bt);Pt.length===2?j(R,P,T):R.projectionMatrix.copy(P.projectionMatrix),pt(Z,R,Bt)};function pt(Z,mt,ht){ht===null?Z.matrix.copy(mt.matrixWorld):(Z.matrix.copy(ht.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(mt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(mt.projectionMatrix),Z.projectionMatrixInverse.copy(mt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=gr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(Z){c=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(R)},this.getCameraTexture=function(Z){return m[Z]};let st=null;function Qt(Z,mt){if(h=mt.getViewerPose(l||o),g=mt,h!==null){let ht=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Bt=!1;ht.length!==R.cameras.length&&(R.cameras.length=0,Bt=!0);for(let Wt=0;Wt<ht.length;Wt++){let N=ht[Wt],tt=null;if(f!==null)tt=f.getViewport(N);else{let nt=d.getViewSubImage(u,N);tt=nt.viewport,Wt===0&&(t.setRenderTargetTextures(_,nt.colorTexture,nt.depthStencilTexture),t.setRenderTarget(_))}let K=b[Wt];K===void 0&&(K=new Je,K.layers.enable(Wt),K.viewport=new Ie,b[Wt]=K),K.matrix.fromArray(N.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(N.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(tt.x,tt.y,tt.width,tt.height),Wt===0&&(R.matrix.copy(K.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),Bt===!0&&R.cameras.push(K)}let Pt=i.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){let Wt=d.getDepthInformation(ht[0]);Wt&&Wt.isValid&&Wt.texture&&y.init(Wt,i.renderState)}if(Pt&&Pt.includes("camera-access")&&(t.state.unbindTexture(),d))for(let Wt=0;Wt<ht.length;Wt++){let N=ht[Wt].camera;if(N){let tt=m[N];tt||(tt=new rh,m[N]=tt);let K=d.getCameraImage(N);tt.sourceTexture=K}}}for(let ht=0;ht<x.length;ht++){let Bt=M[ht],Pt=x[ht];Bt!==null&&Pt!==void 0&&Pt.update(Bt,mt,l||o)}st&&st(Z,mt),mt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:mt}),g=null}let ne=new hg;ne.setAnimationLoop(Qt),this.setAnimationLoop=function(Z){st=Z},this.dispose=function(){}}},Ns=new qn,I1=new ve;function P1(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,hd(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,_,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ye&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ye&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=t.get(p),_=v.envMap,x=v.envMapRotation;_&&(m.envMap.value=_,Ns.copy(x),Ns.x*=-1,Ns.y*=-1,Ns.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ns.y*=-1,Ns.z*=-1),m.envMapRotation.value.setFromMatrix4(I1.makeRotationFromEuler(Ns)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ye&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function L1(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,_){let x=_.program;n.uniformBlockBinding(v,x)}function l(v,_){let x=i[v.id];x===void 0&&(g(v),x=h(v),i[v.id]=x,v.addEventListener("dispose",m));let M=_.program;n.updateUBOMapping(v,M);let E=t.render.frame;r[v.id]!==E&&(u(v),r[v.id]=E)}function h(v){let _=d();v.__bindingPointIndex=_;let x=s.createBuffer(),M=v.__size,E=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,M,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,x),x}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let _=i[v.id],x=v.uniforms,M=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let E=0,C=x.length;E<C;E++){let P=Array.isArray(x[E])?x[E]:[x[E]];for(let T=0,b=P.length;T<b;T++){let R=P[T];if(f(R,E,T,M)===!0){let k=R.__offset,L=Array.isArray(R.value)?R.value:[R.value],B=0;for(let O=0;O<L.length;O++){let D=L[O],$=y(D);typeof D=="number"||typeof D=="boolean"?(R.__data[0]=D,s.bufferSubData(s.UNIFORM_BUFFER,k+B,R.__data)):D.isMatrix3?(R.__data[0]=D.elements[0],R.__data[1]=D.elements[1],R.__data[2]=D.elements[2],R.__data[3]=0,R.__data[4]=D.elements[3],R.__data[5]=D.elements[4],R.__data[6]=D.elements[5],R.__data[7]=0,R.__data[8]=D.elements[6],R.__data[9]=D.elements[7],R.__data[10]=D.elements[8],R.__data[11]=0):(D.toArray(R.__data,B),B+=$.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,_,x,M){let E=v.value,C=_+"_"+x;if(M[C]===void 0)return typeof E=="number"||typeof E=="boolean"?M[C]=E:M[C]=E.clone(),!0;{let P=M[C];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return M[C]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function g(v){let _=v.uniforms,x=0,M=16;for(let C=0,P=_.length;C<P;C++){let T=Array.isArray(_[C])?_[C]:[_[C]];for(let b=0,R=T.length;b<R;b++){let k=T[b],L=Array.isArray(k.value)?k.value:[k.value];for(let B=0,O=L.length;B<O;B++){let D=L[B],$=y(D),H=x%M,j=H%$.boundary,lt=H+j;x+=j,lt!==0&&M-lt<$.storage&&(x+=M-lt),k.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=$.storage}}}let E=x%M;return E>0&&(x+=M-E),v.__size=x,v.__cache={},this}function y(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let x=o.indexOf(_.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function p(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}var oh=class{constructor(t={}){let{canvas:e=Lm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,p=null,v=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,M=!1;this._outputColorSpace=Xe;let E=0,C=0,P=null,T=-1,b=null,R=new Ie,k=new Ie,L=null,B=new Gt(0),O=0,D=e.width,$=e.height,H=1,j=null,lt=null,pt=new Ie(0,0,D,$),st=new Ie(0,0,D,$),Qt=!1,ne=new br,Z=!1,mt=!1,ht=new ve,Bt=new F,Pt=new Ie,zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ee=!1;function Wt(){return P===null?H:1}let N=n;function tt(A,z){return e.getContext(A,z)}try{let A={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"179"}`),e.addEventListener("webglcontextlost",yt,!1),e.addEventListener("webglcontextrestored",Et,!1),e.addEventListener("webglcontextcreationerror",ot,!1),N===null){let z="webgl2";if(N=tt(z,A),N===null)throw tt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let K,nt,J,ft,it,gt,qt,Ht,I,w,G,X,et,Y,Lt,dt,Ct,Rt,rt,Mt,kt,Nt,bt,Zt;function U(){K=new Kw(N),K.init(),Nt=new A1(N,K),nt=new Gw(N,K,t,Nt),J=new E1(N,K),nt.reversedDepthBuffer&&u&&J.buffers.depth.setReversed(!0),ft=new Qw(N),it=new d1,gt=new T1(N,K,J,it,nt,Nt,ft),qt=new qw(x),Ht=new $w(x),I=new r_(N),bt=new Vw(N,I),w=new jw(N,I,ft,bt),G=new eM(N,w,I,ft),rt=new tM(N,nt,gt),dt=new Ww(it),X=new u1(x,qt,Ht,K,nt,bt,dt),et=new P1(x,it),Y=new p1,Lt=new _1(K),Rt=new kw(x,qt,Ht,J,G,f,c),Ct=new M1(x,G,nt),Zt=new L1(N,ft,nt,J),Mt=new Hw(N,K,ft),kt=new Jw(N,K,ft),ft.programs=X.programs,x.capabilities=nt,x.extensions=K,x.properties=it,x.renderLists=Y,x.shadowMap=Ct,x.state=J,x.info=ft}U();let ct=new Cd(x,N);this.xr=ct,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let A=K.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=K.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(A){A!==void 0&&(H=A,this.setSize(D,$,!1))},this.getSize=function(A){return A.set(D,$)},this.setSize=function(A,z,W=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=A,$=z,e.width=Math.floor(A*H),e.height=Math.floor(z*H),W===!0&&(e.style.width=A+"px",e.style.height=z+"px"),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(D*H,$*H).floor()},this.setDrawingBufferSize=function(A,z,W){D=A,$=z,H=W,e.width=Math.floor(A*W),e.height=Math.floor(z*W),this.setViewport(0,0,A,z)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(pt)},this.setViewport=function(A,z,W,q){A.isVector4?pt.set(A.x,A.y,A.z,A.w):pt.set(A,z,W,q),J.viewport(R.copy(pt).multiplyScalar(H).round())},this.getScissor=function(A){return A.copy(st)},this.setScissor=function(A,z,W,q){A.isVector4?st.set(A.x,A.y,A.z,A.w):st.set(A,z,W,q),J.scissor(k.copy(st).multiplyScalar(H).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(A){J.setScissorTest(Qt=A)},this.setOpaqueSort=function(A){j=A},this.setTransparentSort=function(A){lt=A},this.getClearColor=function(A){return A.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor(...arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha(...arguments)},this.clear=function(A=!0,z=!0,W=!0){let q=0;if(A){let V=!1;if(P!==null){let at=P.texture.format;V=at===Tl||at===El||at===Sl}if(V){let at=P.texture.type,wt=at===Yn||at===os||at===Ar||at===Rr||at===wl||at===Ml,At=Rt.getClearColor(),St=Rt.getClearAlpha(),Ot=At.r,Vt=At.g,Dt=At.b;wt?(g[0]=Ot,g[1]=Vt,g[2]=Dt,g[3]=St,N.clearBufferuiv(N.COLOR,0,g)):(y[0]=Ot,y[1]=Vt,y[2]=Dt,y[3]=St,N.clearBufferiv(N.COLOR,0,y))}else q|=N.COLOR_BUFFER_BIT}z&&(q|=N.DEPTH_BUFFER_BIT),W&&(q|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",yt,!1),e.removeEventListener("webglcontextrestored",Et,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),Rt.dispose(),Y.dispose(),Lt.dispose(),it.dispose(),qt.dispose(),Ht.dispose(),G.dispose(),bt.dispose(),Zt.dispose(),X.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Kn),ct.removeEventListener("sessionend",qd),ls.stop()};function yt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Et(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let A=ft.autoReset,z=Ct.enabled,W=Ct.autoUpdate,q=Ct.needsUpdate,V=Ct.type;U(),ft.autoReset=A,Ct.enabled=z,Ct.autoUpdate=W,Ct.needsUpdate=q,Ct.type=V}function ot(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Q(A){let z=A.target;z.removeEventListener("dispose",Q),It(z)}function It(A){Xt(A),it.remove(A)}function Xt(A){let z=it.get(A).programs;z!==void 0&&(z.forEach(function(W){X.releaseProgram(W)}),A.isShaderMaterial&&X.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,W,q,V,at){z===null&&(z=zt);let wt=V.isMesh&&V.matrixWorld.determinant()<0,At=Ng(A,z,W,q,V);J.setMaterial(q,wt);let St=W.index,Ot=1;if(q.wireframe===!0){if(St=w.getWireframeAttribute(W),St===void 0)return;Ot=2}let Vt=W.drawRange,Dt=W.attributes.position,ie=Vt.start*Ot,ye=(Vt.start+Vt.count)*Ot;at!==null&&(ie=Math.max(ie,at.start*Ot),ye=Math.min(ye,(at.start+at.count)*Ot)),St!==null?(ie=Math.max(ie,0),ye=Math.min(ye,St.count)):Dt!=null&&(ie=Math.max(ie,0),ye=Math.min(ye,Dt.count));let Pe=ye-ie;if(Pe<0||Pe===1/0)return;bt.setup(V,q,At,W,St);let we,xe=Mt;if(St!==null&&(we=I.get(St),xe=kt,xe.setIndex(we)),V.isMesh)q.wireframe===!0?(J.setLineWidth(q.wireframeLinewidth*Wt()),xe.setMode(N.LINES)):xe.setMode(N.TRIANGLES);else if(V.isLine){let Ft=q.linewidth;Ft===void 0&&(Ft=1),J.setLineWidth(Ft*Wt()),V.isLineSegments?xe.setMode(N.LINES):V.isLineLoop?xe.setMode(N.LINE_LOOP):xe.setMode(N.LINE_STRIP)}else V.isPoints?xe.setMode(N.POINTS):V.isSprite&&xe.setMode(N.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Ss("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),xe.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(K.get("WEBGL_multi_draw"))xe.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Ft=V._multiDrawStarts,Te=V._multiDrawCounts,ae=V._multiDrawCount,pn=St?I.get(St).bytesPerElement:1,zs=it.get(q).currentProgram.getUniforms();for(let mn=0;mn<ae;mn++)zs.setValue(N,"_gl_DrawID",mn),xe.render(Ft[mn]/pn,Te[mn])}else if(V.isInstancedMesh)xe.renderInstances(ie,Pe,V.count);else if(W.isInstancedBufferGeometry){let Ft=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Te=Math.min(W.instanceCount,Ft);xe.renderInstances(ie,Pe,Te)}else xe.render(ie,Pe)};function _e(A,z,W){A.transparent===!0&&A.side===Ze&&A.forceSinglePass===!1?(A.side=Ye,A.needsUpdate=!0,Aa(A,z,W),A.side=Ri,A.needsUpdate=!0,Aa(A,z,W),A.side=Ze):Aa(A,z,W)}this.compile=function(A,z,W=null){W===null&&(W=A),p=Lt.get(W),p.init(z),_.push(p),W.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),A!==W&&A.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();let q=new Set;return A.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let at=V.material;if(at)if(Array.isArray(at))for(let wt=0;wt<at.length;wt++){let At=at[wt];_e(At,W,V),q.add(At)}else _e(at,W,V),q.add(at)}),p=_.pop(),q},this.compileAsync=function(A,z,W=null){let q=this.compile(A,z,W);return new Promise(V=>{function at(){if(q.forEach(function(wt){it.get(wt).currentProgram.isReady()&&q.delete(wt)}),q.size===0){V(A);return}setTimeout(at,10)}K.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let he=null;function di(A){he&&he(A)}function Kn(){ls.stop()}function qd(){ls.start()}let ls=new hg;ls.setAnimationLoop(di),typeof self<"u"&&ls.setContext(self),this.setAnimationLoop=function(A){he=A,ct.setAnimationLoop(A),A===null?ls.stop():ls.start()},ct.addEventListener("sessionstart",Kn),ct.addEventListener("sessionend",qd),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(z),z=ct.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,z,P),p=Lt.get(A,_.length),p.init(z),_.push(p),ht.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ne.setFromProjectionMatrix(ht,Wn,z.reversedDepth),mt=this.localClippingEnabled,Z=dt.init(this.clippingPlanes,mt),m=Y.get(A,v.length),m.init(),v.push(m),ct.enabled===!0&&ct.isPresenting===!0){let at=x.xr.getDepthSensingMesh();at!==null&&xh(at,z,-1/0,x.sortObjects)}xh(A,z,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(j,lt),Ee=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Ee&&Rt.addToRenderList(m,A),this.info.render.frame++,Z===!0&&dt.beginShadows();let W=p.state.shadowsArray;Ct.render(W,A,z),Z===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=m.opaque,V=m.transmissive;if(p.setupLights(),z.isArrayCamera){let at=z.cameras;if(V.length>0)for(let wt=0,At=at.length;wt<At;wt++){let St=at[wt];Yd(q,V,A,St)}Ee&&Rt.render(A);for(let wt=0,At=at.length;wt<At;wt++){let St=at[wt];Xd(m,A,St,St.viewport)}}else V.length>0&&Yd(q,V,A,z),Ee&&Rt.render(A),Xd(m,A,z);P!==null&&C===0&&(gt.updateMultisampleRenderTarget(P),gt.updateRenderTargetMipmap(P)),A.isScene===!0&&A.onAfterRender(x,A,z),bt.resetDefaultState(),T=-1,b=null,_.pop(),_.length>0?(p=_[_.length-1],Z===!0&&dt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function xh(A,z,W,q){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ne.intersectsSprite(A)){q&&Pt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ht);let wt=G.update(A),At=A.material;At.visible&&m.push(A,wt,At,W,Pt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ne.intersectsObject(A))){let wt=G.update(A),At=A.material;if(q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Pt.copy(A.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),Pt.copy(wt.boundingSphere.center)),Pt.applyMatrix4(A.matrixWorld).applyMatrix4(ht)),Array.isArray(At)){let St=wt.groups;for(let Ot=0,Vt=St.length;Ot<Vt;Ot++){let Dt=St[Ot],ie=At[Dt.materialIndex];ie&&ie.visible&&m.push(A,wt,ie,W,Pt.z,Dt)}}else At.visible&&m.push(A,wt,At,W,Pt.z,null)}}let at=A.children;for(let wt=0,At=at.length;wt<At;wt++)xh(at[wt],z,W,q)}function Xd(A,z,W,q){let V=A.opaque,at=A.transmissive,wt=A.transparent;p.setupLightsView(W),Z===!0&&dt.setGlobalState(x.clippingPlanes,W),q&&J.viewport(R.copy(q)),V.length>0&&Ta(V,z,W),at.length>0&&Ta(at,z,W),wt.length>0&&Ta(wt,z,W),J.buffers.depth.setTest(!0),J.buffers.depth.setMask(!0),J.buffers.color.setMask(!0),J.setPolygonOffset(!1)}function Yd(A,z,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new si(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")||K.has("EXT_color_buffer_float")?Cr:Yn,minFilter:rs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace}));let at=p.state.transmissionRenderTarget[q.id],wt=q.viewport||R;at.setSize(wt.z*x.transmissionResolutionScale,wt.w*x.transmissionResolutionScale);let At=x.getRenderTarget(),St=x.getActiveCubeFace(),Ot=x.getActiveMipmapLevel();x.setRenderTarget(at),x.getClearColor(B),O=x.getClearAlpha(),O<1&&x.setClearColor(16777215,.5),x.clear(),Ee&&Rt.render(W);let Vt=x.toneMapping;x.toneMapping=Bi;let Dt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),Z===!0&&dt.setGlobalState(x.clippingPlanes,q),Ta(A,W,q),gt.updateMultisampleRenderTarget(at),gt.updateRenderTargetMipmap(at),K.has("WEBGL_multisampled_render_to_texture")===!1){let ie=!1;for(let ye=0,Pe=z.length;ye<Pe;ye++){let we=z[ye],xe=we.object,Ft=we.geometry,Te=we.material,ae=we.group;if(Te.side===Ze&&xe.layers.test(q.layers)){let pn=Te.side;Te.side=Ye,Te.needsUpdate=!0,Zd(xe,W,q,Ft,Te,ae),Te.side=pn,Te.needsUpdate=!0,ie=!0}}ie===!0&&(gt.updateMultisampleRenderTarget(at),gt.updateRenderTargetMipmap(at))}x.setRenderTarget(At,St,Ot),x.setClearColor(B,O),Dt!==void 0&&(q.viewport=Dt),x.toneMapping=Vt}function Ta(A,z,W){let q=z.isScene===!0?z.overrideMaterial:null;for(let V=0,at=A.length;V<at;V++){let wt=A[V],At=wt.object,St=wt.geometry,Ot=wt.group,Vt=wt.material;Vt.allowOverride===!0&&q!==null&&(Vt=q),At.layers.test(W.layers)&&Zd(At,z,W,St,Vt,Ot)}}function Zd(A,z,W,q,V,at){A.onBeforeRender(x,z,W,q,V,at),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),V.onBeforeRender(x,z,W,q,A,at),V.transparent===!0&&V.side===Ze&&V.forceSinglePass===!1?(V.side=Ye,V.needsUpdate=!0,x.renderBufferDirect(W,z,q,V,A,at),V.side=Ri,V.needsUpdate=!0,x.renderBufferDirect(W,z,q,V,A,at),V.side=Ze):x.renderBufferDirect(W,z,q,V,A,at),A.onAfterRender(x,z,W,q,V,at)}function Aa(A,z,W){z.isScene!==!0&&(z=zt);let q=it.get(A),V=p.state.lights,at=p.state.shadowsArray,wt=V.state.version,At=X.getParameters(A,V.state,at,z,W),St=X.getProgramCacheKey(At),Ot=q.programs;q.environment=A.isMeshStandardMaterial?z.environment:null,q.fog=z.fog,q.envMap=(A.isMeshStandardMaterial?Ht:qt).get(A.envMap||q.environment),q.envMapRotation=q.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,Ot===void 0&&(A.addEventListener("dispose",Q),Ot=new Map,q.programs=Ot);let Vt=Ot.get(St);if(Vt!==void 0){if(q.currentProgram===Vt&&q.lightsStateVersion===wt)return Kd(A,At),Vt}else At.uniforms=X.getUniforms(A),A.onBeforeCompile(At,x),Vt=X.acquireProgram(At,St),Ot.set(St,Vt),q.uniforms=At.uniforms;let Dt=q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Dt.clippingPlanes=dt.uniform),Kd(A,At),q.needsLights=Bg(A),q.lightsStateVersion=wt,q.needsLights&&(Dt.ambientLightColor.value=V.state.ambient,Dt.lightProbe.value=V.state.probe,Dt.directionalLights.value=V.state.directional,Dt.directionalLightShadows.value=V.state.directionalShadow,Dt.spotLights.value=V.state.spot,Dt.spotLightShadows.value=V.state.spotShadow,Dt.rectAreaLights.value=V.state.rectArea,Dt.ltc_1.value=V.state.rectAreaLTC1,Dt.ltc_2.value=V.state.rectAreaLTC2,Dt.pointLights.value=V.state.point,Dt.pointLightShadows.value=V.state.pointShadow,Dt.hemisphereLights.value=V.state.hemi,Dt.directionalShadowMap.value=V.state.directionalShadowMap,Dt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Dt.spotShadowMap.value=V.state.spotShadowMap,Dt.spotLightMatrix.value=V.state.spotLightMatrix,Dt.spotLightMap.value=V.state.spotLightMap,Dt.pointShadowMap.value=V.state.pointShadowMap,Dt.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=Vt,q.uniformsList=null,Vt}function $d(A){if(A.uniformsList===null){let z=A.currentProgram.getUniforms();A.uniformsList=Dr.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function Kd(A,z){let W=it.get(A);W.outputColorSpace=z.outputColorSpace,W.batching=z.batching,W.batchingColor=z.batchingColor,W.instancing=z.instancing,W.instancingColor=z.instancingColor,W.instancingMorph=z.instancingMorph,W.skinning=z.skinning,W.morphTargets=z.morphTargets,W.morphNormals=z.morphNormals,W.morphColors=z.morphColors,W.morphTargetsCount=z.morphTargetsCount,W.numClippingPlanes=z.numClippingPlanes,W.numIntersection=z.numClipIntersection,W.vertexAlphas=z.vertexAlphas,W.vertexTangents=z.vertexTangents,W.toneMapping=z.toneMapping}function Ng(A,z,W,q,V){z.isScene!==!0&&(z=zt),gt.resetTextureUnits();let at=z.fog,wt=q.isMeshStandardMaterial?z.environment:null,At=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ms,St=(q.isMeshStandardMaterial?Ht:qt).get(q.envMap||wt),Ot=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Vt=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Dt=!!W.morphAttributes.position,ie=!!W.morphAttributes.normal,ye=!!W.morphAttributes.color,Pe=Bi;q.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Pe=x.toneMapping);let we=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,xe=we!==void 0?we.length:0,Ft=it.get(q),Te=p.state.lights;if(Z===!0&&(mt===!0||A!==b)){let en=A===b&&q.id===T;dt.setState(q,A,en)}let ae=!1;q.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==Te.state.version||Ft.outputColorSpace!==At||V.isBatchedMesh&&Ft.batching===!1||!V.isBatchedMesh&&Ft.batching===!0||V.isBatchedMesh&&Ft.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Ft.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Ft.instancing===!1||!V.isInstancedMesh&&Ft.instancing===!0||V.isSkinnedMesh&&Ft.skinning===!1||!V.isSkinnedMesh&&Ft.skinning===!0||V.isInstancedMesh&&Ft.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ft.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ft.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ft.instancingMorph===!1&&V.morphTexture!==null||Ft.envMap!==St||q.fog===!0&&Ft.fog!==at||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==dt.numPlanes||Ft.numIntersection!==dt.numIntersection)||Ft.vertexAlphas!==Ot||Ft.vertexTangents!==Vt||Ft.morphTargets!==Dt||Ft.morphNormals!==ie||Ft.morphColors!==ye||Ft.toneMapping!==Pe||Ft.morphTargetsCount!==xe)&&(ae=!0):(ae=!0,Ft.__version=q.version);let pn=Ft.currentProgram;ae===!0&&(pn=Aa(q,z,V));let zs=!1,mn=!1,Hr=!1,Ae=pn.getUniforms(),In=Ft.uniforms;if(J.useProgram(pn.program)&&(zs=!0,mn=!0,Hr=!0),q.id!==T&&(T=q.id,mn=!0),zs||b!==A){J.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ae.setValue(N,"projectionMatrix",A.projectionMatrix),Ae.setValue(N,"viewMatrix",A.matrixWorldInverse);let cn=Ae.map.cameraPosition;cn!==void 0&&cn.setValue(N,Bt.setFromMatrixPosition(A.matrixWorld)),nt.logarithmicDepthBuffer&&Ae.setValue(N,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ae.setValue(N,"isOrthographic",A.isOrthographicCamera===!0),b!==A&&(b=A,mn=!0,Hr=!0)}if(V.isSkinnedMesh){Ae.setOptional(N,V,"bindMatrix"),Ae.setOptional(N,V,"bindMatrixInverse");let en=V.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),Ae.setValue(N,"boneTexture",en.boneTexture,gt))}V.isBatchedMesh&&(Ae.setOptional(N,V,"batchingTexture"),Ae.setValue(N,"batchingTexture",V._matricesTexture,gt),Ae.setOptional(N,V,"batchingIdTexture"),Ae.setValue(N,"batchingIdTexture",V._indirectTexture,gt),Ae.setOptional(N,V,"batchingColorTexture"),V._colorsTexture!==null&&Ae.setValue(N,"batchingColorTexture",V._colorsTexture,gt));let Pn=W.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&rt.update(V,W,pn),(mn||Ft.receiveShadow!==V.receiveShadow)&&(Ft.receiveShadow=V.receiveShadow,Ae.setValue(N,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(In.envMap.value=St,In.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&z.environment!==null&&(In.envMapIntensity.value=z.environmentIntensity),mn&&(Ae.setValue(N,"toneMappingExposure",x.toneMappingExposure),Ft.needsLights&&Dg(In,Hr),at&&q.fog===!0&&et.refreshFogUniforms(In,at),et.refreshMaterialUniforms(In,q,H,$,p.state.transmissionRenderTarget[A.id]),Dr.upload(N,$d(Ft),In,gt)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Dr.upload(N,$d(Ft),In,gt),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ae.setValue(N,"center",V.center),Ae.setValue(N,"modelViewMatrix",V.modelViewMatrix),Ae.setValue(N,"normalMatrix",V.normalMatrix),Ae.setValue(N,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let en=q.uniformsGroups;for(let cn=0,vh=en.length;cn<vh;cn++){let hs=en[cn];Zt.update(hs,pn),Zt.bind(hs,pn)}}return pn}function Dg(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function Bg(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(A,z,W){let q=it.get(A);q.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),it.get(A.texture).__webglTexture=z,it.get(A.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:W,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,z){let W=it.get(A);W.__webglFramebuffer=z,W.__useDefaultFramebuffer=z===void 0};let Fg=N.createFramebuffer();this.setRenderTarget=function(A,z=0,W=0){P=A,E=z,C=W;let q=!0,V=null,at=!1,wt=!1;if(A){let St=it.get(A);if(St.__useDefaultFramebuffer!==void 0)J.bindFramebuffer(N.FRAMEBUFFER,null),q=!1;else if(St.__webglFramebuffer===void 0)gt.setupRenderTarget(A);else if(St.__hasExternalTextures)gt.rebindTextures(A,it.get(A.texture).__webglTexture,it.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Dt=A.depthTexture;if(St.__boundDepthTexture!==Dt){if(Dt!==null&&it.has(Dt)&&(A.width!==Dt.image.width||A.height!==Dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");gt.setupDepthRenderbuffer(A)}}let Ot=A.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(wt=!0);let Vt=it.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Vt[z])?V=Vt[z][W]:V=Vt[z],at=!0):A.samples>0&&gt.useMultisampledRTT(A)===!1?V=it.get(A).__webglMultisampledFramebuffer:Array.isArray(Vt)?V=Vt[W]:V=Vt,R.copy(A.viewport),k.copy(A.scissor),L=A.scissorTest}else R.copy(pt).multiplyScalar(H).floor(),k.copy(st).multiplyScalar(H).floor(),L=Qt;if(W!==0&&(V=Fg),J.bindFramebuffer(N.FRAMEBUFFER,V)&&q&&J.drawBuffers(A,V),J.viewport(R),J.scissor(k),J.setScissorTest(L),at){let St=it.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+z,St.__webglTexture,W)}else if(wt){let St=z;for(let Ot=0;Ot<A.textures.length;Ot++){let Vt=it.get(A.textures[Ot]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ot,Vt.__webglTexture,W,St)}}else if(A!==null&&W!==0){let St=it.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,St.__webglTexture,W)}T=-1},this.readRenderTargetPixels=function(A,z,W,q,V,at,wt,At=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=it.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&wt!==void 0&&(St=St[wt]),St){J.bindFramebuffer(N.FRAMEBUFFER,St);try{let Ot=A.textures[At],Vt=Ot.format,Dt=Ot.type;if(!nt.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-q&&W>=0&&W<=A.height-V&&(A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+At),N.readPixels(z,W,q,V,Nt.convert(Vt),Nt.convert(Dt),at))}finally{let Ot=P!==null?it.get(P).__webglFramebuffer:null;J.bindFramebuffer(N.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(A,z,W,q,V,at,wt,At=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=it.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&wt!==void 0&&(St=St[wt]),St)if(z>=0&&z<=A.width-q&&W>=0&&W<=A.height-V){J.bindFramebuffer(N.FRAMEBUFFER,St);let Ot=A.textures[At],Vt=Ot.format,Dt=Ot.type;if(!nt.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ie=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ie),N.bufferData(N.PIXEL_PACK_BUFFER,at.byteLength,N.STREAM_READ),A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+At),N.readPixels(z,W,q,V,Nt.convert(Vt),Nt.convert(Dt),0);let ye=P!==null?it.get(P).__webglFramebuffer:null;J.bindFramebuffer(N.FRAMEBUFFER,ye);let Pe=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Nm(N,Pe,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ie),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,at),N.deleteBuffer(ie),N.deleteSync(Pe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,z=null,W=0){let q=Math.pow(2,-W),V=Math.floor(A.image.width*q),at=Math.floor(A.image.height*q),wt=z!==null?z.x:0,At=z!==null?z.y:0;gt.setTexture2D(A,0),N.copyTexSubImage2D(N.TEXTURE_2D,W,0,0,wt,At,V,at),J.unbindTexture()};let Ug=N.createFramebuffer(),Og=N.createFramebuffer();this.copyTextureToTexture=function(A,z,W=null,q=null,V=0,at=null){at===null&&(V!==0?(Ss("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=V,V=0):at=0);let wt,At,St,Ot,Vt,Dt,ie,ye,Pe,we=A.isCompressedTexture?A.mipmaps[at]:A.image;if(W!==null)wt=W.max.x-W.min.x,At=W.max.y-W.min.y,St=W.isBox3?W.max.z-W.min.z:1,Ot=W.min.x,Vt=W.min.y,Dt=W.isBox3?W.min.z:0;else{let Pn=Math.pow(2,-V);wt=Math.floor(we.width*Pn),At=Math.floor(we.height*Pn),A.isDataArrayTexture?St=we.depth:A.isData3DTexture?St=Math.floor(we.depth*Pn):St=1,Ot=0,Vt=0,Dt=0}q!==null?(ie=q.x,ye=q.y,Pe=q.z):(ie=0,ye=0,Pe=0);let xe=Nt.convert(z.format),Ft=Nt.convert(z.type),Te;z.isData3DTexture?(gt.setTexture3D(z,0),Te=N.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(gt.setTexture2DArray(z,0),Te=N.TEXTURE_2D_ARRAY):(gt.setTexture2D(z,0),Te=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,z.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,z.unpackAlignment);let ae=N.getParameter(N.UNPACK_ROW_LENGTH),pn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),zs=N.getParameter(N.UNPACK_SKIP_PIXELS),mn=N.getParameter(N.UNPACK_SKIP_ROWS),Hr=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,we.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,we.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ot),N.pixelStorei(N.UNPACK_SKIP_ROWS,Vt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Dt);let Ae=A.isDataArrayTexture||A.isData3DTexture,In=z.isDataArrayTexture||z.isData3DTexture;if(A.isDepthTexture){let Pn=it.get(A),en=it.get(z),cn=it.get(Pn.__renderTarget),vh=it.get(en.__renderTarget);J.bindFramebuffer(N.READ_FRAMEBUFFER,cn.__webglFramebuffer),J.bindFramebuffer(N.DRAW_FRAMEBUFFER,vh.__webglFramebuffer);for(let hs=0;hs<St;hs++)Ae&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,it.get(A).__webglTexture,V,Dt+hs),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,it.get(z).__webglTexture,at,Pe+hs)),N.blitFramebuffer(Ot,Vt,wt,At,ie,ye,wt,At,N.DEPTH_BUFFER_BIT,N.NEAREST);J.bindFramebuffer(N.READ_FRAMEBUFFER,null),J.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(V!==0||A.isRenderTargetTexture||it.has(A)){let Pn=it.get(A),en=it.get(z);J.bindFramebuffer(N.READ_FRAMEBUFFER,Ug),J.bindFramebuffer(N.DRAW_FRAMEBUFFER,Og);for(let cn=0;cn<St;cn++)Ae?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pn.__webglTexture,V,Dt+cn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Pn.__webglTexture,V),In?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,en.__webglTexture,at,Pe+cn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,en.__webglTexture,at),V!==0?N.blitFramebuffer(Ot,Vt,wt,At,ie,ye,wt,At,N.COLOR_BUFFER_BIT,N.NEAREST):In?N.copyTexSubImage3D(Te,at,ie,ye,Pe+cn,Ot,Vt,wt,At):N.copyTexSubImage2D(Te,at,ie,ye,Ot,Vt,wt,At);J.bindFramebuffer(N.READ_FRAMEBUFFER,null),J.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else In?A.isDataTexture||A.isData3DTexture?N.texSubImage3D(Te,at,ie,ye,Pe,wt,At,St,xe,Ft,we.data):z.isCompressedArrayTexture?N.compressedTexSubImage3D(Te,at,ie,ye,Pe,wt,At,St,xe,we.data):N.texSubImage3D(Te,at,ie,ye,Pe,wt,At,St,xe,Ft,we):A.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,at,ie,ye,wt,At,xe,Ft,we.data):A.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,at,ie,ye,we.width,we.height,xe,we.data):N.texSubImage2D(N.TEXTURE_2D,at,ie,ye,wt,At,xe,Ft,we);N.pixelStorei(N.UNPACK_ROW_LENGTH,ae),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,zs),N.pixelStorei(N.UNPACK_SKIP_ROWS,mn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Hr),at===0&&z.generateMipmaps&&N.generateMipmap(Te),J.unbindTexture()},this.copyTextureToTexture3D=function(A,z,W=null,q=null,V=0){return Ss('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,z,W,q,V)},this.initRenderTarget=function(A){it.get(A).__webglFramebuffer===void 0&&gt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?gt.setTextureCube(A,0):A.isData3DTexture?gt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?gt.setTexture2DArray(A,0):gt.setTexture2D(A,0),J.unbindTexture()},this.resetState=function(){E=0,C=0,P=null,J.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var ch=class{constructor(t){this.scene=t,this.puffs=[],this.trails=new Map,this.trailTime=0,this.random=qi(27701);let e=document.createElement("canvas");e.width=e.height=64;let n=e.getContext("2d"),i=n.createRadialGradient(32,32,3,32,32,31);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.25,"rgba(255,255,255,.86)"),i.addColorStop(.52,"rgba(255,255,255,.43)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,64,64),this.smoke=new Ts(e),this.lines=new Oe,this.positions=new Float32Array(384*6),this.colors=new Float32Array(384*6),this.lines.setAttribute("position",new Be(this.positions,3).setUsage(Ql)),this.lines.setAttribute("color",new Be(this.colors,3).setUsage(Ql));let r=new Go(this.lines,new wr({vertexColors:!0,transparent:!0,opacity:.92,blending:Tr,depthWrite:!1}));r.frustumCulled=!1,t.add(r)}puff(t,e,n,i,r,o,a,c=!1){this.puffs.length>=120&&this.release(this.puffs.shift());let l=new vr({color:r,map:this.smoke,transparent:!0,opacity:.9,depthWrite:!1,blending:c?Tr:Ii}),h=new Vo(l);h.position.set(t,e,n),h.scale.setScalar(i),this.scene.add(h),this.puffs.push({sprite:h,size:i,life:o,lift:a,age:0,dust:c?1:.62})}release(t){t.sprite.removeFromParent(),t.sprite.material.dispose()}event(t){let{x:e,y:n,z:i,type:r,kind:o}=t;if(r==="blast"){let a=t.radius??6;this.puff(e,n+.69,i,a*.65,"#ffbd65",.26,4,!0),this.puff(e,n+1.26,i,a*.37,"#fff0bf",.145,3,!0);for(let c=0;c<7;c++){let l=c/7*Math.PI*2,h=this.random()*a*.52;this.puff(e+Math.cos(l)*h,n+.3+this.random()*1.25,i+Math.sin(l)*h,a*(.39+this.random()*.23),c<3?"#6b6960":"#4f5050",1.18+this.random(),1.43)}}else r==="fire"?this.puff(e,n,i,o==="ballistic"?2.4:o==="cannon"||o==="salvo"?1.5:.47,"#ffd389",.11,.25,!0):r==="impact"&&this.puff(e,n+.14,i,t.wet?.77:.31,t.wet?"#e1f0e9":"#bbb09b",.38,.66)}update(t,e,n){this.trailTime+=t;let i=new Set;for(let o=this.puffs.length-1;o>=0;o--){let a=this.puffs[o];if(a.age+=t,a.age>=a.life){this.release(a),this.puffs.splice(o,1);continue}let c=a.age/a.life;a.sprite.material.opacity=(1-c)**1.35*a.dust,a.sprite.position.y+=t*a.lift,a.sprite.scale.setScalar(a.size*(.65+c*1.55))}let r=Math.min(384,e.length);for(let o=0;o<r;o++){let[a,c,l,h,d,u,f,g]=e[o],y=c==="rocket"||c==="salvo"||c==="missile"||c==="ballistic";if(y){i.add(a);let p=this.trails.get(a)??-1;this.trailTime-p>.056&&(this.puff(l-u*.025,h-f*.025,d-g*.025,c==="ballistic"?1.25:c==="salvo"?.93:.66,"#c9c0a5",.91,.31),this.trails.set(a,this.trailTime))}let m=y?.063:.019;this.positions.set([l+u*n,h+f*n,d+g*n,l+u*(n-m),h+f*(n-m),d+g*(n-m)],o*6),this.colors.set(y?[1,.83,.43,.32,.18,.11]:[1,.91,.56,.38,.21,.08],o*6)}for(let o of this.trails.keys())i.has(o)||this.trails.delete(o);this.lines.setDrawRange(0,r*2),this.lines.attributes.position.needsUpdate=!0,this.lines.attributes.color.needsUpdate=!0}},lh=class{constructor(){this.enabled=!0}unlock(){let t=window.AudioContext||window.webkitAudioContext;if(t){if(!this.context){let e=this.context=new t,n=Math.floor(e.sampleRate*.7);this.noise=e.createBuffer(1,n,e.sampleRate);let i=this.noise.getChannelData(0);for(let r=0;r<n;r++)i[r]=Math.random()*2-1}this.context.resume().catch(()=>{})}}sound(t,e){let n=this.context;if(!n||!this.enabled||n.state!=="running")return;let i=t.type==="blast";if(t.type!=="fire"&&!i&&t.type!=="captured")return;let r=Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z);if(r>375)return;if(t.type==="captured"){let h=n.createOscillator(),d=n.createGain();h.frequency.setValueAtTime(262,n.currentTime),h.frequency.setValueAtTime(392,n.currentTime+.13),d.gain.setValueAtTime(.09,n.currentTime),d.gain.exponentialRampToValueAtTime(.001,n.currentTime+.35),h.connect(d).connect(n.destination),h.start(),h.stop(n.currentTime+.36);return}let o=n.createBufferSource();o.buffer=this.noise;let a=n.createBiquadFilter();a.type="lowpass",a.frequency.value=i?175:t.kind==="rifle"?1400:770;let c=n.createGain(),l=i?.54:.145;c.gain.setValueAtTime(Math.max(.005,(i?.57:.26)/(1+r*.11)),n.currentTime),c.gain.exponentialRampToValueAtTime(.001,n.currentTime+l),o.connect(a).connect(c).connect(n.destination),o.start(),o.stop(n.currentTime+l)}};var hh=class{constructor(t,e){this.canvas=t,this.command=e,this.keys=new Set,this.buttons=new Set,this.touch=matchMedia("(pointer: coarse)").matches,this.yaw=0,this.pitch=0,this.slot=1,this.action=0,this.move=[0,0],this.active=!1,this.sequence=0,this.lookPointer=null,window.addEventListener("keydown",i=>this.keyboard(i,!0)),window.addEventListener("keyup",i=>this.keyboard(i,!1)),window.addEventListener("blur",()=>this.clear()),window.addEventListener("contextmenu",i=>{this.active&&i.preventDefault()}),document.addEventListener("pointerlockchange",()=>{document.pointerLockElement||this.buttons.clear()}),document.addEventListener("pointermove",i=>{this.active&&(document.pointerLockElement===t||i.pointerId===this.lookPointer)&&this.look(i.movementX,i.movementY)}),t.addEventListener("pointerdown",i=>{if(!this.active)return;let r=document.pointerLockElement===t;r||(this.lookPointer=i.pointerId,t.setPointerCapture(i.pointerId),i.pointerType==="mouse"&&i.button===0&&this.lock()),r&&i.button<3&&this.buttons.add(i.button===2?"alt":"fire")});let n=i=>{i.pointerId===this.lookPointer&&(this.lookPointer=null),i.button===0&&this.buttons.delete("fire"),i.button===2&&this.buttons.delete("alt")};window.addEventListener("pointerup",n),window.addEventListener("pointercancel",n),this.touchControls()}lock(){if(!(!this.active||this.touch||!this.canvas.requestPointerLock))try{this.canvas.requestPointerLock()?.catch?.(()=>{})}catch{}}clear(){this.keys.clear(),this.buttons.clear(),this.move=[0,0],this.lookPointer=null,this.action=0,document.querySelector("#stick i").style.transform=""}enable(t){t!==this.active&&(this.clear(),this.active=t,!t&&document.pointerLockElement===this.canvas&&document.exitPointerLock())}look(t,e){this.yaw=Math.atan2(Math.sin(this.yaw+t*.0027),Math.cos(this.yaw+t*.0027)),this.pitch=fe(this.pitch-e*.0025,-1.07,1.05)}keyboard(t,e){if(!e){this.keys.delete(t.code);return}if(!(t.target instanceof HTMLInputElement)){if(t.code==="Escape"){t.repeat||this.command("escape");return}if(t.code==="KeyM"){t.repeat||this.command("tactical");return}if(this.active&&(["Space","Tab","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t.code)&&t.preventDefault(),this.keys.add(t.code),!t.repeat))switch(t.code){case"KeyE":this.action|=1;break;case"KeyG":this.action|=2;break;case"KeyR":this.action|=4;break;case"Digit1":this.slot=1;break;case"Digit2":this.slot=2;break;case"Tab":this.command("roster");break;case"KeyC":this.command("camera");break}}}tick(t){if(!this.active)return;let e=n=>Number(this.keys.has(n));this.look((e("ArrowRight")-e("ArrowLeft"))*t*480,(e("ArrowDown")-e("ArrowUp"))*t*420)}packet(){let t=i=>Number(this.keys.has(i)),e=this.active?this.move:[0,0],n={w:Math.max(t("KeyW"),-e[1]),s:Math.max(t("KeyS"),e[1]),a:Math.max(t("KeyA"),-e[0]),d:Math.max(t("KeyD"),e[0]),yaw:this.yaw,pitch:this.pitch,up:!!(t("Space")||this.buttons.has("up")),down:!!(t("KeyQ")||this.buttons.has("down")),boost:!!(t("ShiftLeft")||t("ShiftRight")),fire:this.buttons.has("fire")||!!t("KeyF"),alt:this.buttons.has("alt")||!!t("KeyX"),slot:this.slot,seq:++this.sequence,action:this.action};return this.action=0,n}touchControls(){if(!this.touch)return;document.querySelector("#touch").hidden=!1;let t=document.querySelector("#stick"),e=t.querySelector("i"),n=null,i=o=>{if(!this.active||o.pointerId!==n)return;let a=t.getBoundingClientRect(),c=(o.clientX-a.left-a.width*.5)/(a.width*.38),l=(o.clientY-a.top-a.height*.5)/(a.height*.38),h=Math.max(1,Math.hypot(c,l));c/=h,l/=h,this.move=[c,l],e.style.transform=`translate(${c*27}px,${l*27}px)`};t.addEventListener("pointerdown",o=>{!this.active||n!==null||(n=o.pointerId,t.setPointerCapture(n),i(o))}),t.addEventListener("pointermove",i);let r=o=>{o.pointerId===n&&(n=null,this.move=[0,0],e.style.transform="")};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",r);for(let o of document.querySelectorAll("[data-hold]")){let a=o.dataset.hold;o.addEventListener("pointerdown",c=>{this.active&&(o.setPointerCapture(c.pointerId),this.buttons.add(a))});for(let c of["pointerup","pointercancel","lostpointercapture"])o.addEventListener(c,()=>this.buttons.delete(a))}document.querySelector('[data-action="interact"]').addEventListener("click",()=>{this.active&&(this.action|=1)}),document.querySelector('[data-action="special"]').addEventListener("click",()=>{this.active&&this.command("special")})}};var Id=new WeakMap,Fr=(s,t,e,n)=>[(s/jt.x+1)*e/2,(t/jt.z+1)*n/2];function N1(s){let{width:t,height:e}=s,n=document.createElement("canvas");n.width=t,n.height=e;let i=n.getContext("2d"),r=document.createElement("canvas");r.width=150,r.height=112;let o=r.getContext("2d"),a=o.createImageData(r.width,r.height);for(let c=0;c<r.height;c++)for(let l=0;l<r.width;l++){let h=(l/r.width*2-1)*jt.x,d=(c/r.height*2-1)*jt.z,u=Ut(h,d),f=Math.floor(u*.62)%3===0?3:0,g=(Ut(h+4,d-4)-u)*5,y=u>0?[48+g+f,66+g+f,57+g+f]:[23-u*.31,50-u*.2,58-u*.13];u>=0&&u<.52&&(y[0]+=20,y[1]+=17,y[2]+=2),a.data.set([...y,255],(c*r.width+l)*4)}o.putImageData(a,0,0),i.drawImage(r,0,0,t,e),i.strokeStyle="#acc6b41f",i.lineWidth=1,i.beginPath();for(let c=t/10;c<t;c+=t/10)i.moveTo(c,0),i.lineTo(c,e);for(let c=e/8;c<e;c+=e/8)i.moveTo(0,c),i.lineTo(t,c);i.stroke(),i.strokeStyle="#bdb49494",i.beginPath();for(let[c,l]of Ys)i.moveTo(...Fr(...c,t,e)),i.lineTo(...Fr(...l,t,e));i.stroke();for(let{side:c}of Kt){let[l,h]=Fr(c*253,-147,t,e),[,d]=Fr(c*253,147,t,e);i.fillStyle="#aec0b06b",i.fillRect(l-2,h,4,d-h)}return t>300&&(i.fillStyle="#bdd9e192",i.font="600 11px system-ui",i.textAlign="center",i.fillText("THE STRAITS",t/2,e*.62),i.fillStyle="#e5e1bc",i.fillText("N",t-14,17)),n}function _a(s,t,e){Id.has(s)||Id.set(s,N1(s));let n=s.getContext("2d"),{width:i,height:r}=s;n.drawImage(Id.get(s),0,0);let o=(c,l)=>Fr(c,l,i,r),a=i>500?12:8.6;for(let c=0;c<2;c++){let l=Wi(c);n.strokeStyle="#edcc8a";for(let h of[l.z,-Math.sign(l.z)*28]){let[d,u]=o(l.x,h);n.beginPath(),n.moveTo(d,u-4),n.lineTo(d+4,u),n.lineTo(d,u+4),n.lineTo(d-4,u),n.closePath(),n.stroke()}}if(t&&e){let[c,l]=o(Kt[e.team].side*338,34);n.fillStyle="#172928",n.fillRect(c-7,l-7,14,14),n.fillStyle="#ebcd8f",n.font="bold 10px system-ui",n.textAlign="center",n.textBaseline="middle",n.fillText("R",c,l);for(let h of t.players){if(h.id===e.id||h.team!==e.team||h.respawn!==null)continue;n.fillStyle=Kt[h.team].color+"b0";let[d,u]=o(h.x,h.z);n.fillRect(d-1.6,u-1.6,3.2,3.2)}}if(Ce.forEach((c,l)=>{let[h,d]=o(c.x,c.z),u=t?.points[l][0]??c.home;n.fillStyle="#142422",n.strokeStyle=Kt[u].color,n.lineWidth=1.1,t?.points[l][3]&&n.setLineDash([3,2]),n.beginPath(),n.arc(h,d,a,0,2*Math.PI),n.fill(),n.stroke(),n.setLineDash([]),n.fillStyle=n.strokeStyle,n.font=`bold ${Math.max(10,a*1.15)}px system-ui`,n.textAlign="center",n.textBaseline="middle",n.fillText(c.id,h,d+.7)}),e){let[c,l]=o(e.x,e.z);n.save(),n.translate(c,l),n.rotate(e.yaw),n.fillStyle="#f4e3a5",n.strokeStyle="#182820",n.beginPath(),n.moveTo(0,-9),n.lineTo(5,5),n.lineTo(0,2),n.lineTo(-5,5),n.closePath(),n.fill(),n.stroke(),n.restore()}}function Pd(s,t,e){return Fr(t,e,s.width,s.height)}function uh(s,t,e){return{x:(t/s.width*2-1)*jt.x,z:(e/s.height*2-1)*jt.z}}var dh=class{constructor(t){let e=n=>document.getElementById(n);this.canvas=e("full-chart"),this.list=e("command-units"),this.hold=e("hold-unit"),this.release=e("release-unit"),this.selectGroup=e("select-group"),this.mergeGroup=e("merge-group"),this.splitGroup=e("split-group"),this.hint=e("command-hint"),this.faction=e("command-faction"),this.notice=e("command-notice"),this.points=e("support-points"),this.queue=e("support-queue"),this.markBallistic=e("mark-ballistic"),this.purchases=Object.entries(ho).map(([n,i])=>{let r=document.createElement("button");r.type="button",r.className="secondary";let o=document.createElement("span");return r.textContent=i.label,o.textContent=i.cost,r.append(o),r.addEventListener("click",()=>this.buy(n)),e("support-actions").append(r),{type:n,item:i,node:r}}),this.objectives=Ce.map(n=>{let i=document.createElement("span");return i.textContent=n.id+"  "+n.name,e("objectives").append(i),i}),this.send=t,this.rows=new Map,this.reset(),this.canvas.addEventListener("click",n=>this.click(n)),this.canvas.addEventListener("keydown",n=>this.aim(n)),this.hold.addEventListener("click",()=>this.order("hold")),this.release.addEventListener("click",()=>this.order("release")),this.selectGroup.addEventListener("click",()=>{this.merging=!this.merging,this.selection.clear(),this.strikeTarget=!1,this.launcherTarget=!1,this.cursor=null,this.refresh()}),this.mergeGroup.addEventListener("click",()=>this.dispatch({kind:"merge",units:[...this.selection]})),this.splitGroup.addEventListener("click",()=>this.order("split")),this.markBallistic.addEventListener("click",()=>{this.launcherTarget=!this.launcherTarget,this.merging=this.strikeTarget=!1,this.selection.clear(),this.cursor=null,this.refresh()})}reset(){this.state=null,this.marker=null,this.selected=null,this.requestedGroup=null,this.merging=!1,this.selection=new Set,this.strikeTarget=!1,this.launcherTarget=!1,this.launcher=null,this.cursor=null,this.units=[],this.allowed=!1,this.request=(this.request??0)+1,this.pending=!1,this.routeKey="",this.path=[],this.message("")}unitRow(t){if(!this.rows.has(t.id)){let e=document.createElement("button");e.type="button",e.className="command-unit";let n=document.createElement("span");n.className="unit-badge",n.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="unit-copy";let r=document.createElement("strong"),o=document.createElement("small");i.append(r,o),e.append(n,i),e.addEventListener("click",()=>this.choose(t.id)),this.rows.set(t.id,{button:e,badge:n,name:r,status:o}),this.list.append(e)}return this.rows.get(t.id)}update(t,e,n){this.state=t,this.marker=n,this.launcher=n?.type==="ballistic"?n:null,this.launcher||(this.launcherTarget=!1),this.team=Kt[e.team],this.teamIndex=e.team,this.units=t.command?.units?.[e.team]??[],this.allowed=t.command?.leaders?.[e.team]===e.id;let i=t.points.filter(o=>o[0]===e.team).length;this.faction.textContent=this.team.name+" \xB7 "+i+" of "+Ce.length+" bases"+(this.allowed?" \xB7 You command the AI units":" \xB7 Tactical view");let r=new Set(this.units.map(o=>o.id));r.has(this.requestedGroup)&&(this.selected=this.requestedGroup,this.requestedGroup=null),r.has(this.selected)||(this.selected=null);for(let o of this.selection)r.has(o)||this.selection.delete(o);this.allowed||(this.merging=!1);for(let[o,a]of this.rows)r.has(o)||(a.button.remove(),this.rows.delete(o));for(let o of this.units){let a=this.unitRow(o);a.badge.textContent=o.badge,a.name.textContent=o.label,a.status.textContent=o.status,a.button.style.setProperty("--unit-color",this.team.color),a.button.dataset.unavailable=String(!o.available)}this.objectives.forEach((o,a)=>{o.style.color=Kt[t.points[a][0]].color}),this.refresh()}chosen(){return this.units.find(t=>t.id===this.selected)}choose(t){if(this.strikeTarget=!1,this.launcherTarget=!1,this.merging){this.selection.has(t)?this.selection.delete(t):this.selection.add(t),this.refresh();return}this.selected!==t&&(this.selected=t,this.cursor=null,this.message("")),this.refresh()}refresh(){let t=this.chosen(),e=this.allowed&&!this.merging&&!!t?.available,n=this.state?.support,i=n?.credits[this.teamIndex]??0;this.points.textContent=i+" pts";let r=n?.queued?.[this.teamIndex]??0;this.queue.hidden=r<1,this.queue.textContent=r+" queued. Move units off the Command pads to make space.";for(let{type:o,item:a,node:c}of this.purchases)c.disabled=!n||!this.allowed||this.pending||i<a.cost||o==="strike"&&!!n.strikes[this.teamIndex],o==="strike"&&c.setAttribute("aria-pressed",String(this.strikeTarget));this.hold.disabled=!e||this.pending,this.release.disabled=!this.allowed||this.merging||!(t?.canRelease??t?.order)||this.pending,this.selectGroup.disabled=!this.allowed||this.pending||this.units.length<2&&!this.merging,this.selectGroup.textContent=this.merging?"Cancel merge":"Select to merge",this.mergeGroup.hidden=!this.merging,this.mergeGroup.disabled=!this.allowed||this.pending||this.selection.size<2,this.splitGroup.hidden=this.merging||t?.type!=="group",this.splitGroup.disabled=!this.allowed||this.pending;for(let[o,a]of this.rows)a.button.setAttribute("aria-pressed",String(this.merging?this.selection.has(o):o===this.selected));this.markBallistic.hidden=!this.launcher,this.markBallistic.disabled=this.pending,this.markBallistic.setAttribute("aria-pressed",String(this.launcherTarget)),this.canvas.dataset.targeting=String(e||this.strikeTarget||this.launcherTarget),this.hint.textContent=this.launcherTarget?"Mark a missile target inside the range ring.":this.allowed?this.merging?"Select two or more units, then choose Merge selected.":this.strikeTarget?"Mark the strike location for the Kestrel squadron.":t?e?"Mark a destination for "+t.label+".":t.label+" \xB7 "+t.status:"Select a unit to give it an order.":"Your team commander can issue orders from this map.",this.state&&(_a(this.canvas,this.state,this.marker),this.overlay(t))}overlay(t){let e=this.canvas.getContext("2d"),n=(r,o)=>Pd(this.canvas,r,o);if(e.save(),this.launcher){let[r,o]=n(this.launcher.x,this.launcher.z);e.strokeStyle="#efbf74",e.lineWidth=1.25,e.setLineDash([5,4]);for(let a of[oo.min,oo.max])e.beginPath(),e.ellipse(r,o,a*this.canvas.width/(jt.x*2),a*this.canvas.height/(jt.z*2),0,0,Math.PI*2),e.stroke();if(e.setLineDash([]),this.launcher.target){let[a,c]=n(this.launcher.target.x,this.launcher.target.z);e.beginPath(),e.arc(a,c,13,0,Math.PI*2),e.stroke()}}let i=this.state.support?.strikes[this.teamIndex];if(i){let[r,o]=n(i.x,i.z);e.strokeStyle="#efbf74",e.lineWidth=2,e.setLineDash([4,3]),e.beginPath(),e.arc(r,o,21,0,Math.PI*2),e.stroke(),e.setLineDash([])}for(let r of this.units.filter(o=>o.available)){let[o,a]=n(r.x,r.z),c=this.merging?this.selection.has(r.id):r===t,l=c?"#efcb86":this.team.color;if(r.order?.kind==="move"&&c&&!this.merging){let{x:h,z:d}=r.order,u=[r.id,Math.round(r.x/16),Math.round(r.z/16),h,d].join("/");u!==this.routeKey&&(this.routeKey=u,this.path=eu(r.x,r.z,h,d));let[f,g]=n(h,d);e.strokeStyle=l,e.lineWidth=2,e.setLineDash([5,5]),e.beginPath(),e.moveTo(o,a);for(let y of this.path)e.lineTo(...n(y.x,y.z));e.stroke(),e.setLineDash([]),e.beginPath(),e.arc(f,g,9,0,Math.PI*2),e.stroke()}e.fillStyle=c?"#334237":"#172928",e.strokeStyle=l,e.lineWidth=c?2.5:1.4,e.fillRect(o-14,a-11,28,22),e.strokeRect(o-14,a-11,28,22),e.fillStyle=l,e.font="bold 12px system-ui",e.textAlign="center",e.textBaseline="middle",e.fillText(r.badge,o,a+.8)}if(this.cursor&&(this.launcherTarget||this.allowed&&(t?.available||this.strikeTarget))){let[r,o]=n(this.cursor.x,this.cursor.z);e.strokeStyle="#ffe0a2",e.lineWidth=2,e.beginPath(),e.moveTo(r-8,o),e.lineTo(r+8,o),e.moveTo(r,o-8),e.lineTo(r,o+8),e.stroke()}e.restore()}click(t){let e=this.canvas.getBoundingClientRect(),n=(t.clientX-e.left)*this.canvas.width/e.width,i=(t.clientY-e.top)*this.canvas.height/e.height;if(this.launcherTarget)return this.dispatch({kind:"ballistic-target",...uh(this.canvas,n,i)});if(this.strikeTarget)return this.buy("strike",uh(this.canvas,n,i));let r=this.units.find(o=>{if(!o.available)return!1;let[a,c]=Pd(this.canvas,o.x,o.z);return Math.abs(a-n)<=17&&Math.abs(c-i)<=14});if(r&&!t.shiftKey)this.choose(r.id);else if(!this.merging&&this.chosen()?.available&&this.allowed)return this.order("move",uh(this.canvas,n,i))}aim(t){let e=this.chosen();if(!this.launcherTarget&&(this.merging||!e?.available&&!this.strikeTarget||!this.allowed))return;if(t.key==="Enter"||t.key===" "){t.preventDefault(),this.cursor&&(this.launcherTarget?this.dispatch({kind:"ballistic-target",...this.cursor}):this.strikeTarget?this.buy("strike",this.cursor):this.order("move",this.cursor));return}let n={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(!n[t.key])return;t.preventDefault();let[i,r]=n[t.key],o=this.cursor??(this.launcherTarget?this.launcher:e??this.marker);this.cursor={x:fe(o.x+i*12,-jt.x+5,jt.x-5),z:fe(o.z+r*12,-jt.z+5,jt.z-5)},this.refresh()}async order(t,e={}){if(this.selected)return this.dispatch({...e,kind:t,unit:this.selected})}buy(t,e){if(t==="strike"&&!e){this.launcherTarget=!1,this.merging=!1,this.selection.clear(),this.strikeTarget=!this.strikeTarget,this.cursor=null,this.refresh();return}return this.dispatch({...e,kind:"support",support:t})}async dispatch(t){if(this.pending||!this.allowed&&!(this.launcher&&t.kind==="ballistic-target"))return;let e=++this.request;this.pending=!0,this.refresh();let n=await this.send(t);e===this.request&&(this.pending=!1,this.cursor=null,!n.error&&t.support==="strike"&&(this.strikeTarget=!1),!n.error&&t.kind==="ballistic-target"&&(this.launcherTarget=!1),!n.error&&t.kind==="merge"&&(this.merging=!1,this.selection.clear(),this.requestedGroup=n.selected,this.selected=n.selected),!n.error&&t.kind==="split"&&(this.selected=null),this.message(n.error??n.message,!!n.error),this.refresh())}message(t,e=!1){this.notice.textContent=t,this.notice.dataset.error=String(e)}};function mg(s){let t=s.players.map(([n,i,r,o,a,c,l,h,d,u,f,g,y,m,p,v,_,x,M,E,C,P])=>({id:n,team:i,name:r,x:o,y:a,z:c,yaw:l,pitch:h,hp:d,vehicle:u,respawn:f,human:g,kills:y,deaths:m,score:p,slot:v,rifle:_,rocket:x,reload:M,speed:E,swim:C,nearby:P})),e=s.vehicles.map(([n,i,r,o,a,c,l,h,d,u,f,g,y,m,p,v,_,x,M,E,C,P])=>({id:n,type:i,team:r,x:o,y:a,z:c,yaw:l,pitch:h,hp:d,driver:u,dead:f,turret:g,roll:y,speed:m,airborne:p,ramp:v,berth:_,aimPitch:x,cargo:M,recoil:E,target:C,weaponReadyAt:P}));return{...s,players:t,vehicles:e}}var ba=class s extends Le{constructor(){let t=s.SkyShader,e=new Ge({name:t.name,uniforms:th.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:Ye,depthWrite:!1});super(new ai(1,1,1),e),this.isSky=!0}};ba.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new F},up:{value:new F(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var Ld=new Map,Nd=new Map;function se(s,t=.05,e=.82){let n=[s,t,e].join("/");return Ld.has(n)||Ld.set(n,new ci({color:s,metalness:t,roughness:e})),Ld.get(n)}function xt(s,t,e,n,i,r,o,a,c=!0){let l=[t,e,n].join("/");return Nd.has(l)||Nd.set(l,new ai(t,e,n)),Ui(s,Nd.get(l),a,i,r,o,c)}function Ui(s,t,e,n=0,i=0,r=0,o=!0){let a=new Le(t,e);return a.position.set(n,i,r),a.castShadow=o,a.receiveShadow=!0,s.add(a),a}function We(s,t,e,n,i,r,o,a=12){return Ui(s,new ns(t,t,e,a),o,n,i,r)}function Ur(s,t,e,n,i,r,o=1,a=1,c=1){let l=Ui(s,new ra(t,12,8),r,e,n,i);return l.scale.set(o,a,c),l}function Tn(s,t,e,n,i,r=.06){let o=new Sr;o.moveTo(t[0][0],-t[0][1]);for(let[c,l]of t.slice(1))o.lineTo(c,-l);o.closePath();let a=new na(o,{depth:e,bevelEnabled:r>0,bevelThickness:r,bevelSize:r,bevelSegments:1,steps:1,curveSegments:1});return a.rotateX(-Math.PI/2),Ui(s,a,i,0,n,0)}function Dd(s=66,t=128){let e=qi(s),n=document.createElement("canvas");n.width=n.height=t;let i=n.getContext("2d"),r=i.createImageData(t,t);for(let a=0;a<t;a++)for(let c=0;c<t;c++){let l=(a*t+c)*4,h=c/t*Math.PI*2,d=a/t*Math.PI*2,u=199+20*Math.sin(h*3+Math.sin(d*2))*Math.cos(d*4-h)+11*Math.sin(h*13+d*11)+22*(e()-.5);r.data.set([u,u,u,255],l)}i.putImageData(r,0,0);let o=new Ts(n);return o.colorSpace=Xe,o.wrapS=o.wrapT=pr,o.anisotropy=4,o}var D1=new Gt("#c9b994"),B1=new Gt("#64714a"),F1=new Gt("#777568"),U1=new Gt("#315952"),Bd=new F(-.58,.67,-.47).normalize();function gg(s){s.fog=new Oo("#b7c9ca",.00125);let t=new ba;t.scale.setScalar(1450),Object.assign(t.material.uniforms.turbidity,{value:3.3}),t.material.uniforms.rayleigh.value=2.3,t.material.uniforms.mieCoefficient.value=.004,t.material.uniforms.mieDirectionalG.value=.79,t.material.uniforms.sunPosition.value.copy(Bd),s.add(t),s.add(new ca("#cbdff7","#8b8262",1.63));let e=new ha("#ffe6bc",3.05);e.castShadow=!0,e.shadow.mapSize.set(1536,1536),e.shadow.camera.left=e.shadow.camera.bottom=-73,e.shadow.camera.right=e.shadow.camera.top=73,e.shadow.camera.near=.1,e.shadow.camera.far=230,e.shadow.normalBias=.25,s.add(e,e.target),O1(s),z1(s),k1(s),V1(s);let n=H1(s);return G1(s),{update(i,r){n.uniforms.time.value=i,e.target.position.set(Math.round(r.x*.2)*5,0,Math.round(r.z*.2)*5),e.position.copy(e.target.position).addScaledVector(Bd,110)}}}function O1(s){let t=new Xn(1250,1020,220,178);t.rotateX(-Math.PI/2);let e=t.attributes.position,n=new Float32Array(e.count*3),i=new Gt;for(let a=0;a<e.count;a++){let c=e.getX(a),l=e.getZ(a),h=Ut(c,l),d=Math.sin(c*.058+l*.045)*Math.sin(l*.071)+.32*Math.cos(l*.2-c*.12),u=Math.hypot(Ut(c+3,l)-h,Ut(c,l+3)-h);if(i.copy(h<0?U1:D1),h>=0){let f=Math.abs(c)-Qh(l)<36&&Math.abs(l)<296;i.lerp(B1,f?hn(.55,1.7,h+d*.3):.88),i.lerp(F1,hn(1.2,3.6,u+h*.045))}i.multiplyScalar(.94+d*.12),e.setY(a,h),i.toArray(n,a*3)}t.setAttribute("color",new Be(n,3)),t.computeVertexNormals();let r=Dd();r.repeat.set(96,83);let o=new ci({vertexColors:!0,map:r,bumpMap:r,bumpScale:.52,roughness:.96});Ui(s,t,o,0,0,0,!1)}function Fs(s,t,e,n,i){let r=[],o=[];for(let[[c,l],[h,d]]of t){let u=Math.hypot(h-c,d-l),f=Math.max(1,Math.ceil(u/4)),g=(l-d)*e/(2*u),y=(h-c)*e/(2*u),m=(p,v)=>{let _=p/f,x=Fn.lerp(c,h,_)+v*g,M=Fn.lerp(l,d,_)+v*y;r.push(x,Ut(x,M)+i,M),o.push((v+1)*.5,_*u*.16)};for(let p=0;p<f;p++)m(p,-1),m(p+1,-1),m(p,1),m(p,1),m(p+1,-1),m(p+1,1)}let a=new Oe;a.setAttribute("position",new ge(r,3)),a.setAttribute("uv",new ge(o,2)),a.computeVertexNormals(),Ui(s,a,n,0,0,0,!1)}function z1(s){let t=Dd(99,96),e=new ci({color:"#77776d",map:t,roughness:.93,side:Ze}),n=new ci({color:"#a19a79",map:t,roughness:.91,side:Ze}),i=new ci({color:"#e6dac2",roughness:1,side:Ze});Fs(s,Ys,9.4,n,.07),Fs(s,Ys,7,e,.12);let r=[];for(let[[o,a],[c,l]]of Ys){let h=Math.hypot(c-o,l-a);for(let d=4;d<h-4;d+=12)r.push([[Fn.lerp(o,c,d/h),Fn.lerp(a,l,d/h)],[Fn.lerp(o,c,(d+3)/h),Fn.lerp(a,l,(d+3)/h)]])}Fs(s,r,.16,i,.17);for(let{side:o}of Kt){let a=o*253;Fs(s,[[[a,-145],[a,145]]],16.5,e,.14);let c=[[[a-7.2,-141],[a-7.2,141]],[[a+7.2,-141],[a+7.2,141]]];for(let d=-127;d<134;d+=17)c.push([[a,d],[a,d+6.3]]);for(let d of[-136,136])for(let u=-5;u<=5;u+=2)c.push([[a+u,d-2.5],[a+u,d+2.5]]);Fs(s,c,.28,i,.2);let l=o*338;Fs(s,[[[l,13],[l,66]]],12.6,n,.11);let h=[16,28,40,52,64].map(d=>[[l-4.3,d],[l+4.3,d]]);Fs(s,h,.2,i,.19)}}function k1(s){let t=se("#7f8174",.28,.71),e=se("#a6a58d"),n=se("#363e3a",.3),i=se("#263f4b",.5,.24);for(let r of ti){let o=new Ne;o.position.set(r.x,Ut(r.x,r.z),r.z),s.add(o);let a=se(Kt[r.team].color,.25);if(xt(o,r.w,r.h,r.d,0,r.h*.5,0,r.kind==="bunker"?e:t),xt(o,r.w+.45,.28,r.d+.38,0,r.h+.12,0,n),r.kind==="bunker")xt(o,r.w*.69,.42,.08,0,r.h*.74,r.d*.5+.025,i),xt(o,r.w*.44,.18,.1,0,r.h*.52,r.d*.5+.055,a);else{xt(o,r.w*.66,r.h*.79,.095,0,r.h*.416,r.d*.5+.037,n);for(let c=-r.w*.45;c<=r.w*.46;c+=r.kind==="crate"?.69:1.7)xt(o,.09,r.h*.9,.095,c,r.h*.47,r.d*.5+.085,t,!1);xt(o,r.w*.52,.29,.11,0,r.h*.83,r.d*.5+.101,a,!1)}}for(let r of Ce){let o=Ut(r.x,r.z);We(s,3.4,.12,r.x,o+.06,r.z,t,36),We(s,.16,7.3,r.x,o+3.65,r.z,n,14),We(s,.61,.39,r.x,o+.2,r.z,e,12)}for(let r=0;r<2;r++){let o=Wi(r);for(let a of[o.z,-Math.sign(o.z)*28])for(let c of[-11,11]){let l=We(s,.52,.77,o.x*.93,.12,a+c,se("#d58948"),12);We(l,.11,1.7,0,1.03,0,n),xt(l,.42,.31,.35,0,1.89,0,se("#f1daa0"))}}}function V1(s){let t=qi(11659),e=new es(new ns(.11,.21,3.8,6),se("#59432f"),510),n=new es(new ia(1,1),se("#596f46"),1020),i=new es(new Yo(1,0),se("#8c8673"),410),r=new es(new qo(.39,1,4,1,!0),se("#8c925e"),1300),o=new Fe,a=new Gt,c=0,l=0,h=0,d=(f,g,y)=>(Math.abs(Math.abs(f)-338)>8+y||g<11-y||g>67+y)&&Math.abs(Math.abs(f)-253)>13+y&&Math.abs(Math.abs(f)-351)>5+y&&Math.abs(g)>7+y&&Math.abs(Math.abs(g)-326)>6+y&&Ce.every(m=>Math.hypot(m.x-f,m.z-g)>26+y)&&ti.every(m=>Math.abs(m.x-f)>m.w*.5+y||Math.abs(m.z-g)>m.d*.5+y),u=(f,g,y,m,p,v,_,x,M)=>{o.position.set(y,m,p),o.rotation.set(.09*(t()-.5),t()*Math.PI*2,.09*(t()-.5)),o.scale.set(v,_,x),o.updateMatrix(),f.setMatrixAt(g,o.matrix),f.setColorAt(g,a.setScalar(M))};for(let f=0;f<9e3&&(c<510||l<410||h<1300);f++){let g=(t()*2-1)*550,y=(t()*2-1)*435,m=Ut(g,y);if(m<.22||!d(g,y,1.7))continue;let p=.66+t()*.95;c<510&&m>2.2&&t()>.43&&Math.sin(g*.09)+Math.cos(y*.08)>-.36?(u(e,c,g,m+1.8*p,y,p,p,p,.83+t()*.25),u(n,c*2,g,m+p*4.25,y,p*1.37,p*2.11,p*1.52,.68+t()*.49),u(n,c*2+1,g+.46*p,m+p*3.5,y-.48*p,p*1.35,p*1.35,p*1.31,.76+t()*.34),c++):l<410&&t()>.74?u(i,l++,g,m+p*.2,y,p*1.3,p*.58,p,.75+t()*.36):h<1300&&u(r,h++,g,m+p*.39,y,p,p*.8,p,.72+t()*.45)}e.count=c,n.count=c*2,i.count=l,r.count=h;for(let f of[e,n,i,r])f.castShadow=f!==r,f.receiveShadow=!0,s.add(f)}function H1(s){let n=new Uint8Array(49152);for(let c=0;c<192;c++)for(let l=0;l<256;l++){let h=Ut((l/255*2-1)*jt.x,(c/191*2-1)*jt.z);n[c*256+l]=Math.round(Fn.clamp(-h/16,0,1)*255)}let i=new _r(n,256,192,Pr);i.magFilter=i.minFilter=Mn,i.needsUpdate=!0;let r=new Xn(1156,865,184,138);r.rotateX(-Math.PI/2);let o=new Ge({uniforms:{time:{value:0},bathymetry:{value:i},sun:{value:Bd}},vertexShader:`
      uniform float time;
      varying vec3 wp;
      varying float swell;
      void main() {
        wp = position;
        swell = .22 * sin(dot(wp.xz,vec2(.115,.067)) - time * 1.24)
              + .13 * sin(dot(wp.xz,vec2(-.078,.167)) - time * 1.61)
              + .043 * sin(dot(wp.xz,vec2(.28,-.14)) - time * 2.12);
        wp.y += swell;
        gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.);
      }`,fragmentShader:`
      uniform float time;
      uniform vec3 sun;
      uniform sampler2D bathymetry;
      varying vec3 wp;
      varying float swell;
      float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453); }
      float waterNoise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 t = f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1.,0.)),t.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),t.x),t.y);
      }
      void main() {
        vec2 water = wp.xz;
        vec3 ray = cameraPosition - wp;
        float distanceToEye = length(ray);
        vec3 eye = normalize(ray);
        float detail = 1. - smoothstep(40.,320.,distanceToEye);
        float a = dot(water,vec2(.115,.067)) - time*1.24;
        float b = dot(water,vec2(-.078,.167)) - time*1.61;
        float c = dot(water,vec2(.55,.31)) - time*2.8;
        float chop = waterNoise(water*.108 - vec2(time*.055,time*.029));
        vec2 slope = vec2(.045,.025)*cos(a) + vec2(-.026,.041)*cos(b)
          + vec2(.062,.04)*cos(c + chop*3.);
        slope += detail * (vec2(.094,-.043)*cos(dot(water,vec2(1.9,-.8))-time*3.4)
          + vec2(.044,.086)*cos(dot(water,vec2(.79,2.77))-time*4.1));
        vec3 normal = normalize(vec3(-slope.x,1.,-slope.y));
        vec2 mapUV = water / vec2(${jt.x*2}.0, ${jt.z*2}.0) + .5;
        float depth = texture2D(bathymetry,mapUV + normal.xz*.0016).r;
        float fresnel = .025 + .975 * pow(1. - max(0.,dot(normal,eye)),5.);
        vec3 reflected = reflect(-eye, normal);
        float sky = smoothstep(-.06,.58,reflected.y);
        vec3 reflection = mix(vec3(.48,.59,.64),vec3(.126,.326,.56),sky);
        float cloud = waterNoise(reflected.xz*6.9 / max(.29,reflected.y+.31));
        reflection = mix(reflection,vec3(.74,.77,.75),smoothstep(.57,.85,cloud)*.57);
        vec3 bottom = mix(vec3(.30,.37,.228),vec3(.039,.27,.229),smoothstep(0.,.17,depth));
        vec3 tint = mix(bottom,vec3(.012,.075,.12),1.-exp(-depth*5.8));
        float glint = pow(max(0.,dot(reflected,sun)), 105.) * 1.65;
        float sandLight = detail * (1.-smoothstep(.015,.20,depth)) * (.014*cos(c*2.+b) + .014);
        vec3 color = mix(tint + sandLight,reflection,min(.94,fresnel+.13)) + glint*vec3(1.,.86,.67);
        float lace = waterNoise(water*.72 + vec2(time*.18,-time*.12));
        float wash = sin(depth*119.-time*2.6+chop*7.+swell*2.);
        float surf = (smoothstep(.58,.91,wash+lace*.37) * .64
          + smoothstep(.50,.75,lace) * (1.-smoothstep(.005,.05,depth))*.46)
          * (1.-smoothstep(.016,.117,depth));
        float crests = smoothstep(.27,.38,swell+chop*.09)*smoothstep(.66,.85,lace);
        color = mix(color,vec3(.70,.83,.81),min(.79,surf+crests*.20));
        float fog = 1. - exp(-.00000150 * dot(ray,ray));
        gl_FragColor = vec4(mix(color,vec3(.47,.56,.57),fog),1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`}),a=Ui(s,r,o,0,0,0,!1);return a.receiveShadow=!1,o}function G1(s){let t=new Xn(2500,2500);t.rotateX(Math.PI/2);let e=new Ge({transparent:!0,depthWrite:!1,side:Ze,vertexShader:`
      varying vec3 wp;
      void main() {
        wp = (modelMatrix * vec4(position, 1.)).xyz;
        gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.);
      }`,fragmentShader:`
      varying vec3 wp;
      float hash(vec2 u) { return fract(sin(dot(u,vec2(79.1,211.9)))*4375.64); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
          mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
      }
      void main() {
        vec2 u = wp.xz * .007;
        float cv = noise(u)*.55 + noise(u*2.17)*.25 + noise(u*4.7)*.12 + noise(u*10.43)*.07;
        float opacity = smoothstep(.55,.74,cv) * .68 * (1. - smoothstep(670.,1220.,length(wp.xz)));
        gl_FragColor = vec4(mix(vec3(.68,.73,.76),vec3(.97,.95,.90), smoothstep(.54,.82,cv)), opacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});Ui(s,t,e,0,223,0,!1)}var Ma=se("#202622",.05,.97),Ve=se("#414b48",.48,.65),as=se("#6b7264",.51,.62),tn=se("#202c2e",.31,.74),Oi=se("#263f49",.47,.22),Fd=se("#dfd6b7",.08),wa=se("#795b42",.08,.59),Ud=[se("#e9deb6",.2,.37),se("#a94e42",.15,.48)],mh=[se("#606d57",.33,.69),se("#8b7758",.33,.72)],W1=[se("#576956"),se("#847359")],yg=Kt.map(s=>se(s.color,.14,.57));function an(s,t,e,n,i,r,o=Ve,a=12){let c=We(s,t,e,n,i,r,o,a);return c.rotation.x=Math.PI/2,c}function fh(s,t,e,n,i,r,o=!1){let a=We(s,t,r,e,n,i,Ma,16);a.rotation.z=Math.PI*.5;let c=We(s,t*.67,r+.024,e,n,i,o?Ve:as,12);c.rotation.z=Math.PI*.5;let l=We(s,t*.28,r+.038,e,n,i,tn,8);return l.rotation.z=Math.PI*.5,a}function Or(s,t,e,n,i){We(s,.024,i,t,e+i/2,n,tn,6).rotation.z=-.065}function ph(s,t,e=0){let n=new Ne,i=new Ne;return n.position.set(0,t,e),s.add(n),n.add(i),{turret:n,gun:i}}function xg(s,t){let e=new Ne,n=mh[t],i=yg[t],r={root:e,turret:null,gun:null,wheels:[],ramp:null,gear:null,wake:null};if(s==="recon"){let o=Tn(e,[[-1.07,-2.43],[-1.32,-1.93],[-1.32,2.05],[-.94,2.41],[.94,2.41],[1.32,2.05],[1.32,-1.93],[1.07,-2.43]],.69,-.34,n);o.receiveShadow=!0,xt(e,2.22,.47,1.24,0,.41,-1.48,n),xt(e,2.22,.64,1.65,0,.55,-.1,n),xt(e,1.98,.48,.09,0,.68,-.934,Oi).rotation.x=-.17,xt(e,2.24,.12,1.83,0,.893,-.13,Ve);for(let a of[-1,1]){xt(e,.12,.39,1.18,a*1.12,.63,-.1,Oi),xt(e,.2,.44,.84,a*1.17,.13,1.55,tn),xt(e,.48,.2,.07,a*.81,.18,-2.405,Ud[0]),xt(e,.27,.17,.09,a*.86,.115,2.398,Ud[1]),xt(e,.05,.25,.53,a*1.344,.24,-.1,i);for(let c of[-1.56,1.69])r.wheels.push(fh(e,.56,a*1.22,-.384,c,.41))}xt(e,2.28,.18,.29,0,-.29,-2.54,tn),xt(e,1.59,.36,.63,0,.27,1.62,Ve),Object.assign(r,ph(e,1.01,.25)),We(r.turret,.29,.16,0,.025,0,as),xt(r.gun,.24,.21,.86,0,.22,-.28,tn),an(r.gun,.062,.78,0,.22,-.91),Or(e,1.06,.67,1.84,1.65)}else if(s==="tank"){Tn(e,[[-1.44,-2.85],[-1.07,-3.37],[1.07,-3.37],[1.44,-2.85],[1.44,3.02],[-1.44,3.02]],.87,-.53,n),Tn(e,[[-1.27,-2.44],[-.91,-2.98],[.91,-2.98],[1.27,-2.44],[1.2,.36],[-1.2,.36]],.23,.35,n),r.treads=[];for(let o of[-1,1]){xt(e,.72,1.01,6.25,o*1.46,-.6,.03,Ma);for(let a=-2.54;a<2.7;a+=.87)r.wheels.push(fh(e,.439,o*1.49,-.63,a,.66,!0));xt(e,.66,.16,6.31,o*1.49,-.06,.012,Ve);for(let a=0;a<27;a++){let c=xt(e,.74,.069,.24,o*1.48,-.07,0,as,!1);r.treads.push({link:c,offset:a/27*14})}xt(e,.11,.21,.83,o*1.48,.21,.35,i)}for(let o=1.67;o<2.84;o+=.21)xt(e,1.65,.071,.069,0,.386,o,Ve,!1);Object.assign(r,ph(e,.55,.03)),Tn(r.turret,[[-1.23,-.48],[-.76,-1.13],[.76,-1.13],[1.28,-.65],[1.26,1.11],[-1,1.19],[-1.28,.67]],.72,-.03,n,.13),We(r.turret,.48,.07,-.43,.82,.27,Ve,16),xt(r.turret,.56,.24,.411,.44,.81,-.12,Oi),xt(r.gun,.55,.43,.81,0,.31,-.94,Ve),an(r.gun,.132,2.94,0,.32,-2.34),an(r.gun,.182,.24,0,.32,-3.78,tn),an(r.gun,.062,1.1,.57,.37,-1.62,Ve),Or(r.turret,-.87,.69,.84,2.1),Or(r.turret,.83,.67,.86,1.47)}else if(s==="launcher"||s==="ballistic"){let o=s==="ballistic";xt(e,2.84,.57,7.22,0,-.53,0,Ve),xt(e,2.91,1.46,2.14,0,.16,-2.24,n),xt(e,2.52,.6,.077,0,.49,-3.339,Oi),xt(e,2.97,.1,2.28,0,.91,-2.21,mh[t]),xt(e,2.62,.23,.29,0,-.38,-3.5,tn);for(let a of[-1,1]){xt(e,.072,.46,.95,a*1.474,.46,-2.4,Oi),xt(e,.43,.28,.075,a*1,-.16,-3.34,Ud[0]),xt(e,.085,.22,.85,a*1.49,-.16,.15,i);for(let c of[-2.42,-.23,2.02,2.92])r.wheels.push(fh(e,.64,a*1.44,-.71,c,.39))}if(Object.assign(r,ph(e,.52,.94)),We(r.turret,.77,.26,0,-.03,0,Ve),o){xt(r.gun,2.48,.2,4.18,0,.16,0,Ve);for(let a of[-.59,.59]){an(r.gun,.43,4.25,a,.67,.1,n,16);for(let c of[-1.92,-.73,.94,2.12])an(r.gun,.475,.14,a,.67,c,as,16);an(r.gun,.34,.05,a,.67,-2.08,tn)}}else{xt(r.gun,2.54,1.15,3.52,0,.43,.09,n);for(let a of[.16,.62,.88])for(let c of[-.86,-.44,0,.44,.86])an(r.gun,.128,.075,c,a,-1.704,tn,8),an(r.gun,.14,.081,c,a,1.87,Ve,8)}Or(e,1.28,.87,-1.69,1.87)}else if(s==="jet"){let o=se(t===0?"#788b91":"#939083",.47,.46);Tn(e,[[0,-6.49],[-.56,-4.83],[-1.27,-1.57],[-1.28,4.34],[-.81,5.82],[.81,5.82],[1.28,4.34],[1.27,-1.57],[.56,-4.83]],.68,-.34,o),Tn(e,[[0,-5.99],[-.43,-3.5],[-.64,-1.56],[-.92,3.42],[-.53,4.92],[.53,4.92],[.92,3.42],[.64,-1.56],[.43,-3.5]],.31,.315,o,.14),Ur(e,1,0,.65,-2.51,Oi,.56,.48,1.38);for(let c of[-1,1])Tn(e,[[c*.91,-2.33],[c*4.25,1.5],[c*4.03,3.03],[c*1.28,2.22]],.14,-.075,o,.035),Tn(e,[[c*.69,3.01],[c*2.35,4.73],[c*2.22,5.55],[c*.72,5.3]],.105,.04,o,.029),We(e,.19,1.7,c*.77,.94,4.56,o,6).rotation.x=-.55,an(e,.35,.61,c*.49,-.02,5.78,tn),xt(e,.42,.044,.62,c*3.04,.112,1.84,i),an(e,.125,1.84,c*2.49,-.27,1.12,Fd,8),xt(e,.17,.3,.52,c*2.49,-.13,1.32,Ve);let a=new Ne;e.add(a);for(let[c,l]of[[0,-3.35],[-1.2,1.65],[1.2,1.65]])We(a,.079,.73,c,-.66,l,as,8),fh(a,.32,c,-.916,l,.22);r.gear=a}else if(s==="transport"){let o=se("#747c70",.22,.71),a=se("#546468",.3,.64),c=[[-7.22,14],[-7.22,-8],[-5.33,-13.68],[0,-17.2],[5.33,-13.68],[7.22,-8],[7.22,14]];Tn(e,c,2.76,-1.38,a,.08),Tn(e,c,.095,ce.y-.095,o,0),Tn(e,c.map(([d,u])=>[d*1.008,u]),.37,-.72,se("#6e5043",.17,.75),0);for(let d of[-1,1]){xt(e,.63,1.17,23.68,d*6.94,1.98,1.94,a),xt(e,.24,.14,23.56,d*6.94,2.61,1.94,as),xt(e,.105,.026,22.73,d*5.8,ce.y+.019,1.72,Fd,!1);for(let u=-7;u<=12;u+=3.8)xt(e,.27,.63,.31,d*6.69,1.79,u,tn),xt(e,.074,.14,.87,d*7.29,1.41,u,i,!1)}xt(e,9.12,2.52,4.83,0,2.71,-11.2,a),xt(e,7.58,1.34,3.51,0,4.55,-11.29,a),xt(e,7.37,.66,.083,0,4.63,-9.51,Oi),xt(e,7.41,.66,.083,0,4.63,-13.065,Oi),xt(e,8.01,.17,3.83,0,5.25,-11.29,Ve);for(let d of[-2.7,-1.34,0,1.34,2.7])xt(e,.1,.8,.1,d,4.57,-9.441,a,!1);Or(e,-1.6,5.3,-11.8,3.41),Or(e,1.7,5.3,-11.4,2.98),xt(e,3.4,.22,.37,.73,6.26,-11.6,as),Object.assign(r,ph(e,2.01,-7.58)),We(r.turret,.42,.3,0,.03,0,Ve),an(r.gun,.12,1.3,0,.27,-.73,tn);let l=new Ne;l.position.set(0,ce.y,ce.stern),e.add(l),xt(l,12.58,.23,ce.ramp,0,-.12,ce.ramp/2,o);for(let d=.48;d<ce.ramp;d+=1.12)xt(l,12.62,.036,.079,0,.016,d,as,!1);for(let d of[-5.86,5.86])xt(l,.088,.023,ce.ramp-.16,d,.034,ce.ramp/2,Fd,!1);r.ramp=l;let h=new Le(new Xn(30,64).rotateX(-Math.PI/2),new Ge({transparent:!0,depthWrite:!1,uniforms:{phase:{value:0},strength:{value:0}},vertexShader:"varying vec2 tex; void main(){ tex = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`varying vec2 tex; uniform float phase, strength;
          void main(){ float x=abs(tex.x-.5), y=tex.y;
            float edge=max(0.,1.-abs(x-(.12+.33*(1.-y)))*27.);
            float streak=max(0.,1.-x*9.)*.31;
            float ripple=.42+.58*sin(y*89.+sin(x*99.)*1.9+phase)*sin(y*89.+sin(x*99.)*1.9+phase);
            gl_FragColor=vec4(.83,.94,.93,(edge+streak)*ripple*y*strength); }`}));h.position.set(0,-.1,41),e.add(h),r.wake=h}return r}function vg(s,t=!1){if(t){let e=an(s,.071,1.01,0,.024,-.3,Ve);return an(s,.092,.11,0,.024,-.83,tn),xt(s,.075,.15,.13,0,-.069,-.22,wa),xt(s,.1,.091,.33,0,.026,-.107,wa),xt(s,.05,.071,.08,-.074,.132,-.38,tn),e}xt(s,.076,.092,.36,0,.012,-.235,Ve),xt(s,.079,.098,.207,0,.009,-.454,wa),an(s,.024,.319,0,.027,-.65,tn),xt(s,.036,.072,.037,0,.073,-.76,Ve),xt(s,.081,.159,.11,0,-.117,-.26,tn).rotation.x=-.36,xt(s,.061,.145,.072,0,-.078,-.073,wa).rotation.x=.21,xt(s,.076,.084,.28,0,-.009,.053,wa).rotation.x=-.11}function _g(s){let t=new Ne,e=new Ne;t.add(e);let n=W1[s],i=se("#494840"),r=se(s===0?"#9b765b":"#9a6d51"),o=yg[s];Tn(e,[[-.19,-.095],[.19,-.095],[.21,.09],[-.21,.09]],.43,-.12,n,.03),xt(e,.335,.305,.16,0,.095,-.1,i),xt(e,.305,.35,.17,0,.119,.126,n);for(let h of[-.11,0,.11])xt(e,.084,.151,.055,h,.064,-.196,mh[s]);Ur(e,.128,0,.455,-.014,r,.85,1.18,.92),Ur(e,.167,0,.514,-.012,mh[s],.93,.76,.99),xt(e,.222,.05,.082,0,.486,-.103,Oi),xt(e,.203,.02,.081,0,.512,-.122,i);let a=[-1,1].map(h=>{let d=new Ne;return d.position.set(h*.106,-.132,0),t.add(d),xt(d,.172,.4,.165,0,-.198,0,n),xt(d,.147,.279,.141,0,-.505,0,i),xt(d,.158,.104,.247,0,-.688,-.049,Ma),d}),c=new Ne;e.add(c);for(let h of[-1,1])xt(c,.14,.258,.15,h*.237,.073,-.066,n).rotation.x=.58,xt(c,.129,.13,.295,h*.219,-.017,-.213,i).rotation.y=h*.21,xt(c,.124,.07,.108,h*.263,.165,-.062,o),Ur(c,.06,h*.164,-.017,-.347,Ma,1.02,.85,1.16);let l=new Ne;return l.position.set(.114,.018,-.331),vg(l),c.add(l),{root:t,legs:a,arms:c}}function Od(s){let t=new Ne,e=se("#41463c"),n=s==="rocket"?.15:.06;for(let i of[-1,1]){let r=xt(t,.15,.13,.44,i*.125,-.088,-.05-i*.17,e);r.rotation.y=i*.34,Ur(t,.08,i*(n+.039),-.044,-.234-i*.151,Ma)}return vg(t,s==="rocket"),t.traverse(i=>{i.isMesh&&(i.castShadow=!1)}),t}var gh=class{constructor(t){this.canvas=t,this.renderer=new oh({canvas:t,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia("(pointer: coarse)").matches?1.25:1.6)),this.renderer.outputColorSpace=Xe,this.renderer.toneMapping=yl,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!matchMedia("(pointer: coarse)").matches,this.renderer.shadowMap.type=ll,this.scene=new zo,this.scene.add(this.camera=new Je(65,1,.055,1490)),this.camera.rotation.order="YXZ",this.desired=new F,this.look=new F,this.vector=new F,this.units=new Map,this.landscape=gg(this.scene),this.effects=new ch(this.scene),this.armory=[Od("rifle"),Od("rocket")],this.camera.add(...this.armory),this.focus=this.camera.position,this.snap=!0,this.wide=!1,this.recoil=0,this.points=Ce.map(e=>{let n=new Le(new sa(e.radius-.16,e.radius,68).rotateX(-Math.PI/2),new Es({color:Kt[e.home].color,opacity:.28,transparent:!0,depthWrite:!1,side:Ze})),i=n.geometry.attributes.position;for(let r=0;r<i.count;r++)i.setY(r,Ut(e.x+i.getX(r),e.z+i.getZ(r))+.136);return n.position.set(e.x,0,e.z),this.scene.add(n),n}),this.notches=Ce.map(e=>{let n=document.createElement("div");return n.className="flag-marker",n.textContent=e.id,document.querySelector("#world-markers").append(n),n}),this.resize(),new ResizeObserver(()=>this.resize()).observe(t)}resize(){let t=this.canvas.clientWidth,e=this.canvas.clientHeight;!t||!e||(this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix())}model(t){if(!this.units.has(t.id)){let e=t.type?xg(t.type,t.team):_g(t.team);e.yaw=t.yaw,e.root.position.set(t.x,t.y,t.z),this.units.set(t.id,e),this.scene.add(e.root)}return this.units.get(t.id)}frame(t,e,n,i,r){if(!e)return;let o=1-Math.exp(-i*15),a=1-Math.exp(-i*8.4),c=t.vehicles.find(y=>y.id===e.vehicle),l=c??e,h=(t.support?.flights??[]).map(y=>({...y,type:"jet",airborne:!0,pitch:0})),d=[...t.vehicles,...t.players,...h],u=new Set(d.map(y=>y.id));for(let[y,m]of this.units)u.has(y)||(m.root.visible=!1);for(let y of d){let m=this.model(y),p=y.type?!y.dead:y.respawn===null,v=!y.type;m.root.visible=p&&!(v&&(y.vehicle||y.id===e.id&&!this.wide))&&Math.hypot(y.x-l.x,y.z-l.z)<485;let _=m.root;if(this.snap||Math.hypot(_.position.x-y.x,_.position.z-y.z)>42?(_.position.set(y.x,y.y,y.z),m.yaw=y.yaw):(_.position.lerp(this.vector.set(y.x,y.y,y.z),o),m.yaw+=un(y.yaw,m.yaw)*o),_.rotation.set(y.pitch*(v?0:1),-m.yaw,y.roll??0,"YXZ"),m.turret&&(m.turret.rotation.y=-un(y.turret,m.yaw),m.gun.rotation.x=y.aimPitch,m.gun.position.z=(y.recoil??0)*(y.type==="tank"?.43:.11)),m.wheels?.length)for(let x of m.wheels)x.rotateY(y.speed*i/.55);if(m.treads&&_.visible){m.trackDistance=((m.trackDistance??0)+y.speed*i+14)%14;for(let{link:x,offset:M}of m.treads){let E=(m.trackDistance+M)%14,C=E<6,P=E>=7&&E<13;x.position.y=C?-1.136:P?-.075:E<7?-1.136+(E-6)*1.061:-.075-(E-13)*1.061,x.position.z=C?E-3:P?10-E:E<7?3.05:-3.05,x.rotation.x=C||P?0:Math.PI*.5}}if(m.gear&&(m.gear.visible=!y.airborne||y.y<Ut(y.x,y.z)+8),m.ramp){let[x,M]=vn(y.yaw),E=ce.stern+ce.ramp-.8,C=Math.max(.06,Ut(y.x-x*E,y.z-M*E)),P=y.ramp?Math.atan2(y.y+ce.y-C,ce.ramp):-Math.PI*.48;m.ramp.rotation.x=Fn.lerp(m.ramp.rotation.x,P,a),m.ramp.scale.z=Fn.lerp(m.ramp.scale.z,y.ramp?1:.19,a),m.wake.material.uniforms.phase.value=t.time*8.1,m.wake.material.uniforms.strength.value=Math.min(.48,Math.abs(y.speed)*.045)}if(v){let x=Math.sin(r*(y.swim?5.1:10.3)+y.x*.16),M=Math.min(.61,y.speed*.065);m.legs[0].rotation.x=x*M,m.legs[1].rotation.x=-x*M,m.arms.rotation.x=y.pitch*.64+(y.swim?x*.2:0)}}let f=this.units.get(l.id),g=!c&&!this.wide&&e.respawn===null;if(this.recoil*=Math.exp(-i*18),g){let y=Math.sin(r*9.3)*Math.min(.053,e.speed*.006);this.camera.position.copy(f.root.position).add(this.vector.set(0,.69+y,0)),this.camera.rotation.set(n.pitch+this.recoil*.27,-n.yaw,0,"YXZ")}else{let y=c?.type==="jet"?f.yaw:n.yaw,[m,p]=vn(y),v={recon:[10.5,4.4],tank:[13.5,4.8],launcher:[14,5.3],ballistic:[15,5.8],jet:[22,6.2],transport:[38,12]},[_,x]=v[c?.type]??[5.34,2.16],M=c&&this.wide?_*1.54:_;this.desired.copy(f.root.position).add(this.vector.set(-m*M,x+Math.max(-.7,n.pitch*2.1),-p*M)),this.desired.y=Math.max(this.desired.y,Ut(this.desired.x,this.desired.z)+.85),this.snap||this.camera.position.distanceTo(this.desired)>60?this.camera.position.copy(this.desired):this.camera.position.lerp(this.desired,a),this.look.copy(f.root.position).add(this.vector.set(m*12.8,.82+this.recoil+Math.sin(c?.type==="jet"?c.pitch:n.pitch)*11,p*12.8)),this.camera.lookAt(this.look)}this.armory.forEach((y,m)=>{y.visible=g&&e.slot===m+1,y.position.set(.28+Math.cos(r*5)*Math.min(.018,e.speed*.0016),-.35-(e.reload>t.time?.15:0),-.53+this.recoil*.13),y.rotation.set(e.reload>t.time?-.34:0,-.1,-.04)}),this.camera.updateMatrixWorld(),this.landscape.update(r,f.root.position),this.points.forEach((y,m)=>{let p=Ce[m],v=Math.hypot(p.x-l.x,p.z-l.z),_=t.points[m];y.material.color.set(Kt[_[0]].color),y.material.opacity=_[3]?.58+.18*Math.sin(r*7):.35,this.vector.set(p.x,Ut(p.x,p.z)+8.4,p.z);let x=this.look.copy(this.vector).sub(this.camera.position).dot(this.camera.getWorldDirection(this.desired))>0;this.vector.project(this.camera);let M=this.notches[m],E=x&&v>7&&v<510&&Math.abs(this.vector.x)<.95&&Math.abs(this.vector.y)<.88;M.hidden=!E,E&&(M.style.left=this.vector.x*50+50+"%",M.style.top=50-this.vector.y*50+"%",M.style.setProperty("--team",Kt[_[0]].color),M.title=p.name)}),this.effects.update(i,t.shots,Math.min(.06,t.renderAge??0)),this.renderer.render(this.scene,this.camera),this.snap=!1}};var _t=s=>document.getElementById(s),Sg=_t("field"),kr=new lh,q1=["manual","pause-panel","tactical","roster","result"],de=new hh(Sg,Wd),Hd=new dh(Y1),X1=Ce.map(s=>{let t=document.createElement("div");return t.className="flag",t.textContent=s.id,t.title=s.name,_t("flag-status").append(t),t}),$e,Un,Vr,ui,re,$n,Eg,fn,Rn,Tg=!1,Us=!1,Ag=0,bg=0,zd=0,kd=0,An=!1,zr=!1,Vd=100,cs=[],wg;function Cg(){if($e)return!0;try{return $e=new gh(Sg),!0}catch(s){return console.error(s),_t("launch-error").textContent="Tidefront requires a browser with WebGL 2 and graphics acceleration.",_t("launch-error").hidden=!1,!1}}function Rg(s,t,e,n=!1){Rn=s,Tg=n,Hd.reset(),$n=t,zd=e.events.at(-1)?.id??0,kd=e.round,$e.snap=!0,$e.wide=!1,cs=[],An=!0,zr=!1,Vd=100,Ea(e);let i=re.players.find(r=>r.id===$n);de.yaw=i.yaw,de.pitch=0,de.slot=1,de.sequence=0,_t("mode-label").textContent=Rn==="solo"?n?"Solo command":"Solo conquest":`Online \xB7 ${Eg}`,_t("lobby").hidden=!0,_t("hud").hidden=!1,_t("world-markers").hidden=!1,Cn(n?"tactical":null),Rn==="solo"&&!n&&!de.touch&&de.lock()}function Ig(s=!1){Us||!Cg()||(kr.unlock(),Un=new nc(Math.floor(Math.random()*1e9)),Vr=Un.join("You",0),s&&Un.command.deploy(Vr.team),Rg("solo",Vr.id,Un.snapshot(),s))}async function Y1(s){if(!An)return{error:"Start a match to give orders."};if(Rn==="solo"){let t=Un.command.send(Vr,s);return Ea(Un.snapshot()),t}return ui?.connected?new Promise(t=>{ui.timeout(3800).emit("order",s,(e,n)=>{t(e||!n?{error:"The server did not confirm this order."}:n)})}):{error:"The match server is disconnected."}}function Z1(s){if(s.preventDefault(),Us||!Cg())return;kr.unlock();let t=_t("host").value.trim(),e;try{let o=t?new URL(t):new URL(location.origin);if(!["http:","https:"].includes(o.protocol)||o.username||o.password)throw new Error("Invalid server URL");e=o.origin}catch{_t("network-note").textContent="Enter the full HTTP or HTTPS address of a Tidefront server.";return}if(location.protocol==="https:"&&e.startsWith("http:")){_t("network-note").textContent="Open the game from your Node server or enter its HTTPS address.";return}Us=!0,_t("connect").disabled=!0,_t("network-note").textContent="Connecting to the match server\u2026";let n={name:_t("callsign").value,room:_t("code").value},i=ui=Jr(e,{timeout:5e3,reconnectionAttempts:5,autoConnect:!1}),r=o=>{i.disconnect(),ui===i&&(ui=void 0),Us=!1,_t("connect").disabled=!1,_t("network-note").textContent=o};i.on("connect",()=>{i.timeout(4900).emit("join",n,(o,a)=>{if(ui===i){if(o||!a?.state){if(An){Os(a?.error??"Could not rejoin the server.");return}r(a?.error??"A Tidefront server did not respond at that address.");return}Us=!1,_t("connect").disabled=!1,Eg=a.room,Rg("online",a.id,a.state)}})}),i.on("connect_error",()=>{Us&&r("No Tidefront match server at this address. Start the Node server or enter a server address.")}),i.on("disconnect",()=>{Rn==="online"&&An&&Os("Connection lost. Trying to rejoin\u2026",9)}),i.io.on("reconnect_failed",()=>{Rn==="online"&&(Gd(),_t("network-note").textContent="The server stopped responding. Join again when it is available.")}),i.on("state",o=>{An&&Rn==="online"&&Ea(o)}),i.connect()}function Gd(){An=!1,Rn=null,Un=Vr=re=null,ui?.disconnect(),ui=void 0,_t("hud").hidden=_t("world-markers").hidden=!0,_t("lobby").hidden=!1,_t("hurt").style.opacity=0,Cn(null)}function Cn(s){fn==="tactical"&&s!=="tactical"&&$e&&($e.snap=!0),fn=s;for(let e of q1)_t(e).hidden=s!==e;if(de.enable(!!(An&&!fn&&!zr&&re?.winner===null)),!s)return;(s==="tactical"||s==="roster")&&Pg(performance.now()),_t(s).querySelector("button:not([hidden])")?.focus({preventScroll:!0})}function Os(s,t=3.8){cs.push({text:s,until:performance.now()/1e3+t}),cs=cs.slice(-3)}function Wd(s){if(s==="escape"){if(fn==="result")return;Cn(fn?null:An?"pause-panel":null)}else if(s==="camera"&&An)$e.wide=!$e.wide,$e.snap=!0;else if(s==="special"&&An){let{seat:t}=yh();t?.type==="transport"?de.action|=2:de.slot=de.slot===1?2:1}else if(s==="tactical"){if(!An||fn==="result")return;fn==="tactical"?(Cn(null),de.lock()):Cn("tactical")}else Cn(s)}function yh(){let s=re?.players.find(t=>t.id===$n);return{me:s,seat:s?.vehicle?re.vehicles.find(t=>t.id===s.vehicle):null}}function Ea(s){re=mg(s),Ag=performance.now();let{me:t,seat:e}=yh();if(!t)return;kd!==re.round&&(kd=re.round,$e.snap=!0,de.yaw=t.yaw,de.pitch=0,de.slot=1,cs=[],Hd.reset(),Cn(Tg?"tactical":null));let n=e?.hp??t.hp;n<Vd-3&&An&&!re.events.some(i=>i.type==="dismount"&&i.who===$n)&&(_t("hurt").style.opacity=".85",clearTimeout(wg),wg=setTimeout(()=>{_t("hurt").style.opacity="0"},125)),Vd=n,t.respawn!==null&&!zr&&(zr=!0,de.enable(!1)),t.respawn===null&&zr&&(zr=!1,de.enable(!fn&&re.winner===null),$e.snap=!0,de.yaw=t.yaw,de.pitch=0,de.slot=1);for(let i of re.events)if(!(i.id<=zd)){if(zd=i.id,$e.effects.event(i),kr.sound(i,e??t),i.type==="fire"&&i.shooter===$n&&($e.recoil=i.kind==="cannon"?.34:i.kind==="rocket"?.21:.12),i.type==="support"&&i.team===t.team&&Os(i.label),i.type==="notice"&&i.who===$n&&Os(i.text),i.type==="captured"){let r=i.team===t.team?" \xB7 +250 requisition":"";Os(`${Kt[i.team].name} captured ${Ce.find(o=>o.id===i.point).name}${r}`)}i.type==="down"&&i.byId===$n&&Os(`Eliminated ${i.name} \xB7 +100 requisition`,2.7),i.type==="down"&&i.who===$n&&Os(`Downed by ${i.by}`),i.type==="dismount"&&i.who===$n&&(de.yaw=i.yaw,de.pitch=0,$e.snap=!0),i.type==="mount"&&i.who===$n&&(de.yaw=i.yaw,de.pitch=0,$e.snap=!0)}re.winner!==null&&fn!=="result"&&(_t("winner").textContent=Kt[re.winner].name+" wins",_t("result-info").textContent=Rn==="solo"?"All enemy territory held.":"The next round begins shortly.",_t("rematch").hidden=Rn!=="solo",Cn("result"))}function Pg(s){let{me:t,seat:e}=yh();if(!re||!t)return;for(let f of[0,1])_t(f===0?"score-aster":"score-veyra").textContent=re.points.filter(g=>g[0]===f).length;re.points.forEach(([f,,g,y],m)=>{let p=X1[m];p.style.setProperty("--team",Kt[f].color),p.classList.toggle("contested",y),p.classList.toggle("capturing",g>0),p.style.setProperty("--capture",Math.round(g*100)+"%")});let n=re.hold.findIndex(f=>f>0);_t("hold-status").textContent=n>=0?`${Kt[n].name} hold \xB7 ${Math.max(0,Math.ceil(Ja-re.hold[n]))}s to win`:"";let i=(Math.round((e?.type==="jet"?e.yaw:de.yaw)*180/Math.PI)%360+360)%360;_t("compass").textContent=`\xB7  ${["N","NE","E","SE","S","SW","W","NW"][Math.round(i/45)%8]}  ${String(i).padStart(3,"0")}\xB0  \xB7`;let r=e?.type==="transport"?re.vehicles.filter(f=>f.cargo===e.id).length:0,o=re.vehicles.find(f=>f.id===t.nearby),a=Ce.findIndex(f=>Math.hypot(f.x-t.x,f.z-t.z)<f.radius),c="";t.respawn!==null?c=`Respawn in ${Math.max(0,Math.ceil(t.respawn-re.time))}s`:e?.type==="transport"?c=e.berth?"Berthing assist":e.ramp?"G  Secure ramp":"G  Berth / ramp":o?c=`${de.touch?"Use":"E"}  Board ${_i[o.type].name}`:a>=0&&re.points[a][3]?c=Ce[a].name+" contested":a>=0&&re.points[a][1]===t.team&&(c="Capturing "+Ce[a].name),_t("use-hint").textContent=c,_t("reticle").hidden=t.respawn!==null;let l=t.slot===2?qe.rocket:qe.rifle;_t("gear-type").textContent=e?Kt[t.team].name+" \xB7 Vehicle":t.swim?"Swimming":Kt[t.team].name+" \xB7 Infantry",_t("gear").textContent=e?_i[e.type].name:l.name,_t("ammo").textContent=e?.type==="ballistic"&&e.weaponReadyAt>re.time?"Reload "+Math.ceil(e.weaponReadyAt-re.time)+"s":e?Math.round(Math.abs(e.speed)*3.6)+" km/h":t.reload>re.time?"Reloading":`${t.slot===2?t.rocket:t.rifle} / ${l.capacity}`;let h=e?_i[e.type].hp:100,d=Math.round((e?.hp??t.hp)/h*100);_t("hp-fill").style.width=d+"%",_t("hp-fill").style.background=d>35?"#a7cba7":"#ea947a",_t("gear-tip").textContent=e?.type==="ballistic"?e.weaponReadyAt>re.time?"Reloading \xB7 "+Math.ceil(e.weaponReadyAt-re.time)+"s":e.target?"Target marked \xB7 Stop, align, then fire":"M  Open map to mark a target":e?.type==="jet"?e.airborne?`${Math.round(e.y-Ut(e.x,e.z))} m above terrain \xB7 Q nose down`:"W  Throttle \xB7 Space  Lift off":e?.type==="transport"?`${r} cargo on deck \xB7 ${d}% hull`:e?`E  Dismount \xB7 ${d}% integrity`:"1  AK-47 \xB7 2  RPG \xB7 R  Reload",_t("touch-up").textContent=e?.type==="jet"?"Nose up":"Jump",_t("touch-up").hidden=!!(e&&e.type!=="jet"),_t("touch-down").hidden=e?.type!=="jet",_t("touch-alt").hidden=!e||!_i[e.type].secondary,_t("touch-special").textContent=e?.type==="transport"?"Ramp":"Swap",_t("touch-special").hidden=!!(e&&e.type!=="transport"),_a(_t("mini-chart"),re,e??t),cs=cs.filter(f=>f.until>s/1e3);let u=cs.map(f=>{let g=document.createElement("div");return g.className="notice",g.textContent=f.text,g});_t("announcements").replaceChildren(...u),fn==="tactical"&&Hd.update(re,t,e??t),fn==="roster"&&_t("roster-body").replaceChildren(...Kt.map((f,g)=>$1(f,re.players.filter(y=>y.team===g))))}function $1(s,t){let e=document.createElement("table");e.className="roster-table";let n=e.createCaption();n.style.color=s.color,n.textContent=s.name;let i=e.createTHead().insertRow();for(let o of["Operator","Downs","Deaths","Points"]){let a=document.createElement("th");a.scope="col",a.textContent=o,i.append(a)}let r=e.createTBody();for(let o of t.sort((a,c)=>c.score-a.score)){let a=r.insertRow();o.id===$n&&(a.className="is-me");for(let c of[o.name+(o.human?"":" \xB7 AI"),o.kills,o.deaths,o.score])a.insertCell().textContent=c}return e}var Mg=performance.now(),Sa=0;function Lg(s){requestAnimationFrame(Lg);let t=Math.min(.1,Math.max(0,(s-Mg)/1e3));if(Mg=s,!An){Sa=0;return}for(de.tick(t),Rn==="solo"&&fn&&fn!=="tactical"?Sa=0:Sa+=t;Sa>=so;){Sa-=so;let e=de.packet();Rn==="solo"?(Un.input(Vr,e),Un.step(),Ea(Un.snapshot())):ui?.connected&&ui.emit("input",e)}if(re){if(s-bg>100&&(Pg(s),bg=s),fn==="tactical"){$e.effects.update(t,[],0);return}re.renderAge=(s-Ag)/1e3,$e.frame(re,yh().me,de,t,s/1e3)}}_t("lead").onclick=()=>Ig(!0);_t("solo").onclick=()=>Ig();_t("online").onclick=async()=>{if(_t("launchers").hidden=!0,_t("online-form").hidden=!1,location.protocol==="file:"){_t("network-note").textContent="Enter your Node server address, or open Tidefront from your Node server.";return}try{let s=await fetch("./api/status",{cache:"no-store"}),t=s.ok&&(await s.json()).game==="tidefront";_t("network-note").textContent=t?"Use the same room code as your teammates.":"This browser build runs solo. For online play, enter your Node server\u2019s HTTPS address."}catch{_t("network-note").textContent="Enter your Node server\u2019s HTTPS address to join an online match."}};_t("online-form").onsubmit=Z1;_t("go-back").onclick=()=>{Us||(_t("online-form").hidden=!0,_t("launchers").hidden=!1)};_t("help-lobby").onclick=()=>Cn("manual");_t("help-game").onclick=()=>Cn("manual");_t("pause").onclick=()=>Cn("pause-panel");_t("map-button").onclick=()=>Wd("tactical");_t("return-fight").onclick=()=>Wd("tactical");for(let s of document.querySelectorAll("[data-close]"))s.onclick=()=>Cn(null);_t("resume").onclick=()=>{Cn(null),de.lock()};_t("sound").onclick=()=>{kr.enabled=!kr.enabled,_t("sound").textContent=kr.enabled?"Sound on":"Sound off"};_t("leave").onclick=Gd;_t("exit-result").onclick=Gd;_t("rematch").onclick=()=>{Rn==="solo"&&(Un.restart(),Ea(Un.snapshot()),de.lock())};_a(_t("lobby-chart"));requestAnimationFrame(Lg);})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
