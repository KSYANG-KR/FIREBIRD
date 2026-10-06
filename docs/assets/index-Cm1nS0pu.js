var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=`attached`,r=1e3,i=1001,a=1002,o=1003,s=1004,c=1005,l=1006,u=1007,d=1008,f=1009,p=1010,m=1011,h=1012,g=1013,_=1014,v=1015,y=1016,b=1017,x=1018,S=1020,C=35902,w=35899,T=1021,E=1022,D=1023,O=1026,k=1027,A=1028,j=1029,M=1030,N=1031,P=1033,F=33776,I=33777,ee=33778,te=33779,ne=35840,re=35841,ie=35842,ae=35843,oe=36196,L=37492,se=37496,ce=37488,le=37489,R=37490,ue=37491,de=37808,fe=37809,pe=37810,me=37811,he=37812,ge=37813,_e=37814,ve=37815,ye=37816,be=37817,xe=37818,Se=37819,Ce=37820,we=37821,Te=36492,Ee=36494,De=36495,Oe=36283,ke=36284,z=36285,Ae=36286,je=2300,Me=2301,B=2302,Ne=2303,V=2400,Pe=2401,Fe=2402,Ie=2500,Le=3200,Re=`srgb`,ze=`srgb-linear`,Be=`linear`,Ve=`srgb`,He=7680,Ue=35044,We=35048,Ge=2e3;function Ke(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function qe(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Je(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ye(){let e=Je(`canvas`);return e.style.display=`block`,e}var Xe={};function Ze(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Qe(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=Qe(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=Qe(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function $e(...e){let t=e.join(` `);t in Xe||(Xe[t]=!0,H(...e))}function et(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var tt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},nt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},rt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),it=1234567,at=Math.PI/180,ot=180/Math.PI;function st(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(rt[e&255]+rt[e>>8&255]+rt[e>>16&255]+rt[e>>24&255]+`-`+rt[t&255]+rt[t>>8&255]+`-`+rt[t>>16&15|64]+rt[t>>24&255]+`-`+rt[n&63|128]+rt[n>>8&255]+`-`+rt[n>>16&255]+rt[n>>24&255]+rt[r&255]+rt[r>>8&255]+rt[r>>16&255]+rt[r>>24&255]).toLowerCase()}function ct(e,t,n){return Math.max(t,Math.min(n,e))}function lt(e,t){return(e%t+t)%t}function ut(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function dt(e,t,n){return e===t?0:(n-e)/(t-e)}function ft(e,t,n){return(1-n)*e+n*t}function pt(e,t,n,r){return ft(e,t,1-Math.exp(-n*r))}function mt(e,t=1){return t-Math.abs(lt(e,t*2)-t)}function ht(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function gt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function _t(e,t){return e+Math.floor(Math.random()*(t-e+1))}function vt(e,t){return e+Math.random()*(t-e)}function yt(e){return e*(.5-Math.random())}function bt(e){e!==void 0&&(it=e);let t=it+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xt(e){return e*at}function St(e){return e*ot}function Ct(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function wt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Tt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Et(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:H(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Dt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Ot(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var kt={DEG2RAD:at,RAD2DEG:ot,generateUUID:st,clamp:ct,euclideanModulo:lt,mapLinear:ut,inverseLerp:dt,lerp:ft,damp:pt,pingpong:mt,smoothstep:ht,smootherstep:gt,randInt:_t,randFloat:vt,randFloatSpread:yt,seededRandom:bt,degToRad:xt,radToDeg:St,isPowerOfTwo:Ct,ceilPowerOfTwo:wt,floorPowerOfTwo:Tt,setQuaternionFromProperEuler:Et,normalize:Ot,denormalize:Dt},W=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},At=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jt.copy(this).projectOnVector(e),this.sub(jt)}reflect(e){return this.sub(jt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jt=new G,Mt=new At,Nt=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return $e(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Pt.makeScale(e,t)),this}rotate(e){return $e(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Pt.makeRotation(-e)),this}translate(e,t){return $e(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Pt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Pt=new Nt,Ft=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),It=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lt(){let e={enabled:!0,workingColorSpace:ze,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=zt(e.r),e.g=zt(e.g),e.b=zt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Bt(e.r),e.g=Bt(e.g),e.b=Bt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Be:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return $e(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return $e(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[ze]:{primaries:t,whitePoint:r,transfer:Be,toXYZ:Ft,fromXYZ:It,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:r,transfer:Ve,toXYZ:Ft,fromXYZ:It,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),e}var Rt=Lt();function zt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Bt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Vt,Ht=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Vt===void 0&&(Vt=Je(`canvas`)),Vt.width=e.width,Vt.height=e.height;let t=Vt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Vt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Je(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=zt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(zt(t[e]/255)*255):t[e]=zt(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ut=0,Wt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ut++}),this.uuid=st(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Gt(r[t].image)):e.push(Gt(r[t]))}else e=Gt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Gt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Ht.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var Kt=0,qt=new G,Jt=class e extends nt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=i,a=i,o=l,s=d,c=D,u=f,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kt++}),this.uuid=st(),this.name=``,this.source=new Wt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=o,this.minFilter=s,this.anisotropy=p,this.format=c,this.internalFormat=null,this.type=u,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(qt).x}get height(){return this.source.getSize(qt).y}get depth(){return this.source.getSize(qt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){H(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case r:e.x-=Math.floor(e.x);break;case i:e.x=e.x<0?0:1;break;case a:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case r:e.y-=Math.floor(e.y);break;case i:e.y=e.y<0?0:1;break;case a:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Jt.DEFAULT_IMAGE=null,Jt.DEFAULT_MAPPING=300,Jt.DEFAULT_ANISOTROPY=1;var Yt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Xt=class extends nt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:l,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Yt(0,0,e,t),this.scissorTest=!1,this.viewport=new Yt(0,0,e,t),this.textures=[];let r=new Jt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:l,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Wt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Zt=class extends Xt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Qt=class extends Jt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=o,this.minFilter=o,this.wrapR=i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},$t=class extends Jt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=o,this.minFilter=o,this.wrapR=i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},en=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/tn.setFromMatrixColumn(e,0).length(),i=1/tn.setFromMatrixColumn(e,1).length(),a=1/tn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rn,e,an)}lookAt(e,t,n){let r=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),on.crossVectors(n,cn),on.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),on.crossVectors(n,cn)),on.normalize(),sn.crossVectors(cn,on),r[0]=on.x,r[4]=sn.x,r[8]=cn.x,r[1]=on.y,r[5]=sn.y,r[9]=cn.y,r[2]=on.z,r[6]=sn.z,r[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=tn.set(r[0],r[1],r[2]).length(),o=tn.set(r[4],r[5],r[6]).length(),s=tn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),nn.copy(this);let c=1/a,l=1/o,u=1/s;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=l,nn.elements[5]*=l,nn.elements[6]*=l,nn.elements[8]*=u,nn.elements[9]*=u,nn.elements[10]*=u,t.setFromRotationMatrix(nn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ge,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ge,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},tn=new G,nn=new en,rn=new G(0,0,0),an=new G(1,1,1),on=new G,sn=new G,cn=new G,ln=new en,un=new At,dn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-ct(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(ct(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ln.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ln,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return un.setFromEuler(this),this.setFromQuaternion(un,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};dn.DEFAULT_ORDER=`XYZ`;var fn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},pn=0,mn=new G,hn=new At,gn=new en,_n=new G,vn=new G,yn=new G,bn=new At,xn=new G(1,0,0),Sn=new G(0,1,0),Cn=new G(0,0,1),wn={type:`added`},Tn={type:`removed`},En={type:`childadded`,child:null},Dn={type:`childremoved`,child:null},On=class e extends nt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pn++}),this.uuid=st(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new G,n=new dn,r=new At,i=new G(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new en},normalMatrix:{value:new Nt}}),this.matrix=new en,this.matrixWorld=new en,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hn.setFromAxisAngle(e,t),this.quaternion.multiply(hn),this}rotateOnWorldAxis(e,t){return hn.setFromAxisAngle(e,t),this.quaternion.premultiply(hn),this}rotateX(e){return this.rotateOnAxis(xn,e)}rotateY(e){return this.rotateOnAxis(Sn,e)}rotateZ(e){return this.rotateOnAxis(Cn,e)}translateOnAxis(e,t){return mn.copy(e).applyQuaternion(this.quaternion),this.position.add(mn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xn,e)}translateY(e){return this.translateOnAxis(Sn,e)}translateZ(e){return this.translateOnAxis(Cn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_n.copy(e):_n.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),vn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(vn,_n,this.up):gn.lookAt(_n,vn,this.up),this.quaternion.setFromRotationMatrix(gn),r&&(gn.extractRotation(r.matrixWorld),hn.setFromRotationMatrix(gn),this.quaternion.premultiply(hn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wn),En.child=e,this.dispatchEvent(En),En.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tn),Dn.child=e,this.dispatchEvent(Dn),Dn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wn),En.child=e,this.dispatchEvent(En),En.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vn,e,yn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vn,bn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};On.DEFAULT_UP=new G(0,1,0),On.DEFAULT_MATRIX_AUTO_UPDATE=!0,On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=class extends On{constructor(){super(),this.isGroup=!0,this.type=`Group`}},An={type:`move`},jn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(An)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new kn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Mn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Pn={h:0,s:0,l:0};function Fn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var K=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Re){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Rt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Rt.workingColorSpace){if(e=lt(e,1),t=ct(t,0,1),n=ct(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Fn(i,r,e+1/3),this.g=Fn(i,r,e),this.b=Fn(i,r,e-1/3)}return Rt.colorSpaceToWorking(this,r),this}setStyle(e,t=Re){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Re){let n=Mn[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zt(e.r),this.g=zt(e.g),this.b=zt(e.b),this}copyLinearToSRGB(e){return this.r=Bt(e.r),this.g=Bt(e.g),this.b=Bt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Re){return Rt.workingToColorSpace(In.copy(this),e),Math.round(ct(In.r*255,0,255))*65536+Math.round(ct(In.g*255,0,255))*256+Math.round(ct(In.b*255,0,255))}getHexString(e=Re){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.workingToColorSpace(In.copy(this),t);let n=In.r,r=In.g,i=In.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Rt.workingColorSpace){return Rt.workingToColorSpace(In.copy(this),t),e.r=In.r,e.g=In.g,e.b=In.b,e}getStyle(e=Re){Rt.workingToColorSpace(In.copy(this),e);let t=In.r,n=In.g,r=In.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(Pn);let n=ft(Nn.h,Pn.h,t),r=ft(Nn.s,Pn.s,t),i=ft(Nn.l,Pn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},In=new K;K.NAMES=Mn;var Ln=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new K(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Rn=class extends On{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},zn=new G,Bn=new G,Vn=new G,Hn=new G,Un=new G,Wn=new G,Gn=new G,Kn=new G,qn=new G,Jn=new G,Yn=new Yt,Xn=new Yt,Zn=new Yt,Qn=class e{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),zn.subVectors(e,t),r.cross(zn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){zn.subVectors(r,t),Bn.subVectors(n,t),Vn.subVectors(e,t);let a=zn.dot(zn),o=zn.dot(Bn),s=zn.dot(Vn),c=Bn.dot(Bn),l=Bn.dot(Vn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Hn)!==null&&Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Hn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Hn.x),s.addScaledVector(a,Hn.y),s.addScaledVector(o,Hn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Yn.setScalar(0),Xn.setScalar(0),Zn.setScalar(0),Yn.fromBufferAttribute(e,t),Xn.fromBufferAttribute(e,n),Zn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Yn,i.x),a.addScaledVector(Xn,i.y),a.addScaledVector(Zn,i.z),a}static isFrontFacing(e,t,n,r){return zn.subVectors(n,t),Bn.subVectors(e,t),zn.cross(Bn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),zn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Un.subVectors(r,n),Wn.subVectors(i,n),Kn.subVectors(e,n);let s=Un.dot(Kn),c=Wn.dot(Kn);if(s<=0&&c<=0)return t.copy(n);qn.subVectors(e,r);let l=Un.dot(qn),u=Wn.dot(qn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Un,a);Jn.subVectors(e,i);let f=Un.dot(Jn),p=Wn.dot(Jn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Wn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Gn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Gn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Un,a).addScaledVector(Wn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},$n=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=tr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,tr):tr.fromBufferAttribute(r,t),tr.applyMatrix4(e.matrixWorld),this.expandByPoint(tr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),nr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),nr.copy(e.boundingBox)),nr.applyMatrix4(e.matrixWorld),this.union(nr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tr),tr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lr),ur.subVectors(this.max,lr),rr.subVectors(e.a,lr),ir.subVectors(e.b,lr),ar.subVectors(e.c,lr),or.subVectors(ir,rr),sr.subVectors(ar,ir),cr.subVectors(rr,ar);let t=[0,-or.z,or.y,0,-sr.z,sr.y,0,-cr.z,cr.y,or.z,0,-or.x,sr.z,0,-sr.x,cr.z,0,-cr.x,-or.y,or.x,0,-sr.y,sr.x,0,-cr.y,cr.x,0];return!pr(t,rr,ir,ar,ur)||(t=[1,0,0,0,1,0,0,0,1],!pr(t,rr,ir,ar,ur))?!1:(dr.crossVectors(or,sr),t=[dr.x,dr.y,dr.z],pr(t,rr,ir,ar,ur))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(er[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),er[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),er[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),er[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),er[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),er[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),er[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),er[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(er),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},er=[new G,new G,new G,new G,new G,new G,new G,new G],tr=new G,nr=new $n,rr=new G,ir=new G,ar=new G,or=new G,sr=new G,cr=new G,lr=new G,ur=new G,dr=new G,fr=new G;function pr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){fr.fromArray(e,a);let o=i.x*Math.abs(fr.x)+i.y*Math.abs(fr.y)+i.z*Math.abs(fr.z),s=t.dot(fr),c=n.dot(fr),l=r.dot(fr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var mr=new G,hr=new W,gr=0,_r=class extends nt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ue,this.updateRanges=[],this.gpuType=v,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyMatrix3(e),this.setXY(t,hr.x,hr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix4(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyNormalMatrix(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.transformDirection(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Dt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array),i=Ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},vr=class extends _r{constructor(e,t,n){super(new Uint16Array(e),t,n)}},yr=class extends _r{constructor(e,t,n){super(new Uint32Array(e),t,n)}},q=class extends _r{constructor(e,t,n){super(new Float32Array(e),t,n)}},br=new $n,xr=new G,Sr=new G,Cr=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?br.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xr.subVectors(e,this.center);let t=xr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(xr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xr.copy(e.center).add(Sr)),this.expandByPoint(xr.copy(e.center).sub(Sr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},wr=0,Tr=new en,Er=new On,Dr=new G,Or=new $n,kr=new $n,Ar=new G,jr=class e extends nt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wr++}),this.uuid=st(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ke(e)?yr:vr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Nt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Tr.makeRotationFromQuaternion(e),this.applyMatrix4(Tr),this}rotateX(e){return Tr.makeRotationX(e),this.applyMatrix4(Tr),this}rotateY(e){return Tr.makeRotationY(e),this.applyMatrix4(Tr),this}rotateZ(e){return Tr.makeRotationZ(e),this.applyMatrix4(Tr),this}translate(e,t,n){return Tr.makeTranslation(e,t,n),this.applyMatrix4(Tr),this}scale(e,t,n){return Tr.makeScale(e,t,n),this.applyMatrix4(Tr),this}lookAt(e){return Er.lookAt(e),Er.updateMatrix(),this.applyMatrix4(Er.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Dr).negate(),this.translate(Dr.x,Dr.y,Dr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new q(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $n);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Or.setFromBufferAttribute(n),this.morphTargetsRelative?(Ar.addVectors(this.boundingBox.min,Or.min),this.boundingBox.expandByPoint(Ar),Ar.addVectors(this.boundingBox.max,Or.max),this.boundingBox.expandByPoint(Ar)):(this.boundingBox.expandByPoint(Or.min),this.boundingBox.expandByPoint(Or.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new G,1/0);return}if(e){let n=this.boundingSphere.center;if(Or.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];kr.setFromBufferAttribute(n),this.morphTargetsRelative?(Ar.addVectors(Or.min,kr.min),Or.expandByPoint(Ar),Ar.addVectors(Or.max,kr.max),Or.expandByPoint(Ar)):(Or.expandByPoint(kr.min),Or.expandByPoint(kr.max))}Or.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Ar.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Ar));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Ar.fromBufferAttribute(a,t),o&&(Dr.fromBufferAttribute(e,t),Ar.add(Dr)),r=Math.max(r,n.distanceToSquared(Ar))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new _r(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new G,s[e]=new G;let c=new G,l=new G,u=new G,d=new W,f=new W,p=new W,m=new G,h=new G;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new G,y=new G,b=new G,x=new G;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new _r(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new G,i=new G,a=new G,o=new G,s=new G,c=new G,l=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ar.fromBufferAttribute(e,t),Ar.normalize(),e.setXYZ(t,Ar.x,Ar.y,Ar.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new _r(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Mr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ue,this.updateRanges=[],this.version=0,this.uuid=st()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=st()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=st()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Nr=new G,Pr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Nr.fromBufferAttribute(this,t),Nr.applyMatrix4(e),this.setXYZ(t,Nr.x,Nr.y,Nr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nr.fromBufferAttribute(this,t),Nr.applyNormalMatrix(e),this.setXYZ(t,Nr.x,Nr.y,Nr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nr.fromBufferAttribute(this,t),Nr.transformDirection(e),this.setXYZ(t,Nr.x,Nr.y,Nr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Dt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Dt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Dt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Dt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Dt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array),i=Ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Ze(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new _r(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ze(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Fr=new G,Ir=new G,Lr=new Nt,Rr=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Fr.subVectors(n,t).cross(Ir.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Fr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Lr.getNormalMatrix(e),r=this.coplanarPoint(Fr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},zr=0,Br=class extends nt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zr++}),this.uuid=st(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new K(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=He,this.stencilZFail=He,this.stencilZPass=He,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){H(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new K().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Rr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new W().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new W().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Vr=new G,Hr=new G,Ur=new G,Wr=new G,Gr=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Vr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Vr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Vr.copy(this.origin).addScaledVector(this.direction,t),Vr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Hr.copy(e).add(t).multiplyScalar(.5),Ur.copy(t).sub(e).normalize(),Wr.copy(this.origin).sub(Hr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ur),o=Wr.dot(this.direction),s=-Wr.dot(Ur),c=Wr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Hr).addScaledVector(Ur,d),f}intersectSphere(e,t){if(e.radius<0)return null;Vr.subVectors(e.center,this.origin);let n=Vr.dot(this.direction),r=Vr.dot(Vr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Vr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,ee=T-P*D,te=E-F*D,ne=O-P*A,re=k-F*A,ie=j-P*N,ae=M-F*N,oe=ie*re-ae*ne,L=ee*ae-te*ie,se=ne*te-re*ee;if(r){if(oe<0||L<0||se<0)return null}else if((oe<0||L<0||se<0)&&(oe>0||L>0||se>0))return null;let ce=oe+L+se;if(ce===0)return null;let le=I*(oe*D+L*A+se*N);return(ce>0?le<0:le>0)?null:this.at(le/ce,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Kr=class extends Br{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new K(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},qr=new en,Jr=new Gr,Yr=new Cr,Xr=new G,Zr=new G,Qr=new G,$r=new G,ei=new G,ti=new G,ni=new G,ri=new G,ii=class extends On{constructor(e=new jr,t=new Kr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ti.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ei.fromBufferAttribute(s,e),a?ti.addScaledVector(ei,r):ti.addScaledVector(ei.sub(t),r))}t.add(ti)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(i),Jr.copy(e.ray).recast(e.near),!(Yr.containsPoint(Jr.origin)===!1&&(Jr.intersectSphere(Yr,Xr)===null||Jr.origin.distanceToSquared(Xr)>(e.far-e.near)**2))&&(qr.copy(i).invert(),Jr.copy(e.ray).applyMatrix4(qr),(n.boundingBox===null||Jr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Jr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=oi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=oi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=oi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=oi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ai(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ri.copy(s),ri.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ri);return l<n.near||l>n.far?null:{distance:l,point:ri.clone(),object:e}}function oi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Zr),e.getVertexPosition(c,Qr),e.getVertexPosition(l,$r);let u=ai(e,t,n,r,Zr,Qr,$r,ni);if(u){let e=new G;Qn.getBarycoord(ni,Zr,Qr,$r,e),i&&(u.uv=Qn.getInterpolatedAttribute(i,s,c,l,e,new W)),a&&(u.uv1=Qn.getInterpolatedAttribute(a,s,c,l,e,new W)),o&&(u.normal=Qn.getInterpolatedAttribute(o,s,c,l,e,new G),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new G,materialIndex:0};Qn.getNormal(Zr,Qr,$r,t.normal),u.face=t,u.barycoord=e}return u}var si=new Yt,ci=new Yt,li=new Yt,ui=new Yt,di=new en,fi=new G,pi=new Cr,mi=new en,hi=new Gr,gi=class extends ii{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=n,this.bindMatrix=new en,this.bindMatrixInverse=new en,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new $n),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,fi),this.boundingBox.expandByPoint(fi)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Cr),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,fi),this.boundingSphere.expandByPoint(fi)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pi.copy(this.boundingSphere),pi.applyMatrix4(r),e.ray.intersectsSphere(pi)!==!1&&(mi.copy(r).invert(),hi.copy(e.ray).applyMatrix4(mi),(this.boundingBox===null||hi.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,hi)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Yt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():H(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;ci.fromBufferAttribute(r.attributes.skinIndex,e),li.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(si.copy(t),t.set(0,0,0,0)):(si.set(...t,1),t.set(0,0,0)),si.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=li.getComponent(e);if(r!==0){let i=ci.getComponent(e);di.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(ui.copy(si).applyMatrix4(di),r)}}return t.isVector4&&(t.w=si.w),t.applyMatrix4(this.bindMatrixInverse)}},_i=class extends On{constructor(){super(),this.isBone=!0,this.type=`Bone`}},vi=class extends Jt{constructor(e=null,t=1,n=1,r,i,a,s,c,l=o,u=o,d,f){super(null,a,s,c,l,u,r,i,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},yi=new en,bi=new en,xi=class e{constructor(e=[],t=[]){this.uuid=st(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){H(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new en)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new en;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:bi;yi.multiplyMatrices(i,t[r]),yi.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new vi(t,e,e,D,v);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(H(`Skeleton: No bone found with UUID:`,r),i=new _i),this.bones.push(i),this.boneInverses.push(new en().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},Si=class extends _r{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ci=new en,wi=new en,Ti=[],Ei=new $n,Di=new en,Oi=new ii,ki=new Cr,Ai=class extends ii{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Si(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Di)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $n),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ci),Ei.copy(e.boundingBox).applyMatrix4(Ci),this.boundingBox.union(Ei)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Cr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ci),ki.copy(e.boundingSphere).applyMatrix4(Ci),this.boundingSphere.union(ki)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Oi.geometry=this.geometry,Oi.material=this.material,Oi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ki.copy(this.boundingSphere),ki.applyMatrix4(n),e.ray.intersectsSphere(ki)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Ci),wi.multiplyMatrices(n,Ci),Oi.matrixWorld=wi,Oi.raycast(e,Ti);for(let e=0,n=Ti.length;e<n;e++){let n=Ti[e];n.instanceId=i,n.object=this,t.push(n)}Ti.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Si(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new vi(new Float32Array(r*this.count),r,this.count,A,v));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ji=new Cr,Mi=new W(.5,.5),Ni=new G,Pi=class{constructor(e=new Rr,t=new Rr,n=new Rr,r=new Rr,i=new Rr,a=new Rr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ge,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(e){return ji.center.set(0,0,0),ji.radius=.7071067811865476+Mi.distanceTo(e.center),ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ni.x=r.normal.x>0?e.max.x:e.min.x,Ni.y=r.normal.y>0?e.max.y:e.min.y,Ni.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ni)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Fi=class extends Br{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new K(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ii=new G,Li=new G,Ri=new en,zi=new Gr,Bi=new Cr,Vi=new G,Hi=new G,Ui=class extends On{constructor(e=new jr,t=new Fi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Ii.fromBufferAttribute(t,e-1),Li.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Ii.distanceTo(Li);e.setAttribute(`lineDistance`,new q(n,1))}else H(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bi.copy(n.boundingSphere),Bi.applyMatrix4(r),Bi.radius+=i,e.ray.intersectsSphere(Bi)===!1)return;Ri.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Ri);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Wi(this,e,zi,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Wi(this,e,zi,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Wi(this,e,zi,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Wi(this,e,zi,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Wi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Ii.fromBufferAttribute(s,i),Li.fromBufferAttribute(s,a),n.distanceSqToSegment(Ii,Li,Vi,Hi)>r)return;Vi.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Vi);if(!(c<t.near||c>t.far))return{distance:c,point:Hi.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Gi=new G,Ki=new G,qi=class extends Ui{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Gi.fromBufferAttribute(t,e),Ki.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Gi.distanceTo(Ki);e.setAttribute(`lineDistance`,new q(n,1))}else H(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Ji=class extends Ui{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},Yi=class extends Br{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new K(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Xi=new en,Zi=new Gr,Qi=new Cr,$i=new G,ea=class extends On{constructor(e=new jr,t=new Yi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qi.copy(n.boundingSphere),Qi.applyMatrix4(r),Qi.radius+=i,e.ray.intersectsSphere(Qi)===!1)return;Xi.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(Xi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);$i.fromBufferAttribute(l,n),ta($i,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)$i.fromBufferAttribute(l,a),ta($i,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ta(e,t,n,r,i,a,o){let s=Zi.distanceSqToPoint(e);if(s<n){let n=new G;Zi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var na=class extends Jt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ra=class extends Jt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ia=class extends Jt{constructor(e,t,n=_,r,i,a,s=o,c=o,l,u=O,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,i,a,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},aa=class extends ia{constructor(e,t=_,n=301,r,i,a=o,s=o,c,l=O){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,i,a,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},oa=class extends Jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},sa=class e extends jr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new q(c,3)),this.setAttribute(`normal`,new q(l,3)),this.setAttribute(`uv`,new q(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new G;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ca=class e extends jr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new q(u,3)),this.setAttribute(`normal`,new q(d,3)),this.setAttribute(`uv`,new q(f,2));function _(){let a=new G,_=new G,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new W,m=new G,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},la=class e extends ca{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ua=class e extends jr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new q(i,3)),this.setAttribute(`normal`,new q(i.slice(),3)),this.setAttribute(`uv`,new q(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new G,r=new G,i=new G;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new G;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new G;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new G,t=new G,n=new G,r=new G,o=new W,s=new W,c=new W;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},da=class e extends ua{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},fa=class e extends jr{constructor(e=[new W(0,-.5),new W(.5,0),new W(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=ct(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new G,d=new W,f=new G,p=new G,m=new G,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new q(a,3)),this.setAttribute(`uv`,new q(o,2)),this.setAttribute(`normal`,new q(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},pa=class e extends jr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new q(p,3)),this.setAttribute(`normal`,new q(m,3)),this.setAttribute(`uv`,new q(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ma=class e extends jr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new G,d=new G,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new q(p,3)),this.setAttribute(`normal`,new q(m,3)),this.setAttribute(`uv`,new q(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},ha=class e extends jr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new G,f=new G,p=new G;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new q(c,3)),this.setAttribute(`normal`,new q(l,3)),this.setAttribute(`uv`,new q(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function ga(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(va(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(va(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function _a(e){let t={};for(let n=0;n<e.length;n++){let r=ga(e[n]);for(let e in r)t[e]=r[e]}return t}function va(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function ya(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ba(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Rt.workingColorSpace}var xa={clone:ga,merge:_a},Sa=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ca=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,wa=class extends Br{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sa,this.fragmentShader=Ca,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ga(e.uniforms),this.uniformsGroups=ya(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new K().setHex(r.value);break;case`v2`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Yt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Nt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new en().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ta=class extends wa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ea=class extends Br{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new K(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new K(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Da=class extends Ea{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new W(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new K(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new K(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new K(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Oa=class extends Br{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new K(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new K(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ka=class extends Br{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Le,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Aa=class extends Br{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ja(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ma(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function Na(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function Pa(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function Fa(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0){if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}}var Ia=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},La=class extends Ia{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:V,endingEnd:V}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Pe:i=e,o=2*t-n;break;case Fe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Pe:a=e,s=2*n-t;break;case Fe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ra=class extends Ia{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},za=class extends Ia{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ba=class extends Ia{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Ua(n,t,g,y,r);i[p]=Va(x,o,_,b,m)}return i}};function Va(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Ha(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Ua(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Va(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Ha(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Wa=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ja(t,this.TimeBufferType),this.values=ja(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ja(e.times,Array),values:ja(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ma(e.settings)&&(n.settings={inTangents:ja(e.settings.inTangents,Array),outTangents:ja(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ra(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new La(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ba(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case je:t=this.InterpolantFactoryMethodDiscrete;break;case Me:t=this.InterpolantFactoryMethodLinear;break;case B:t=this.InterpolantFactoryMethodSmooth;break;case Ne:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return je;case this.InterpolantFactoryMethodLinear:return Me;case this.InterpolantFactoryMethodSmooth:return B;case this.InterpolantFactoryMethodBezier:return Ne}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ma(this.settings)&&(Ga(this.settings.inTangents,e),Ga(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&qe(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===B,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ma(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Ga(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Wa.prototype.ValueTypeName=``,Wa.prototype.TimeBufferType=Float32Array,Wa.prototype.ValueBufferType=Float32Array,Wa.prototype.DefaultInterpolation=Me;var Ka=class extends Wa{constructor(e,t,n){super(e,t,n)}};Ka.prototype.ValueTypeName=`bool`,Ka.prototype.ValueBufferType=Array,Ka.prototype.DefaultInterpolation=je,Ka.prototype.InterpolantFactoryMethodLinear=void 0,Ka.prototype.InterpolantFactoryMethodSmooth=void 0;var qa=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}};qa.prototype.ValueTypeName=`color`;var Ja=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}};Ja.prototype.ValueTypeName=`number`;var Ya=class extends Ia{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)At.slerpFlat(i,0,a,c-o,a,c,s);return i}},Xa=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ya(this.times,this.values,this.getValueSize(),e)}};Xa.prototype.ValueTypeName=`quaternion`,Xa.prototype.InterpolantFactoryMethodSmooth=void 0;var Za=class extends Wa{constructor(e,t,n){super(e,t,n)}};Za.prototype.ValueTypeName=`string`,Za.prototype.ValueBufferType=Array,Za.prototype.DefaultInterpolation=je,Za.prototype.InterpolantFactoryMethodLinear=void 0,Za.prototype.InterpolantFactoryMethodSmooth=void 0;var Qa=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}};Qa.prototype.ValueTypeName=`vector`;var $a=class{constructor(e=``,t=-1,n=[],r=Ie){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=st(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(to(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(Wa.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=Na(o);o=Pa(o,1,c),s=Pa(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new Ja(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function eo(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return Ja;case`vector`:case`vector2`:case`vector3`:case`vector4`:return Qa;case`color`:return qa;case`quaternion`:return Xa;case`bool`:case`boolean`:return Ka;case`string`:return Za}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function to(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=eo(e.type);if(e.times===void 0){let t=[],n=[];Fa(e.keys,t,n,`value`),e.times=t,e.values=n}let n;return n=t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e),Ma(e.settings)&&(n.settings={inTangents:ja(e.settings.inTangents,Float32Array),outTangents:ja(e.settings.outTangents,Float32Array)}),n}var no={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(ro(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!ro(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function ro(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var io=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},ao=class{constructor(e){this.manager=e===void 0?io:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ao.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var oo={},so=class extends Error{constructor(e,t){super(e),this.response=t}},co=class extends ao{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=no.get(`file:${e}`);if(i!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0);return}if(oo[e]!==void 0){oo[e].push({onLoad:t,onProgress:n,onError:r});return}oo[e]=[],oo[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&H(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=oo[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}throw new so(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{no.add(`file:${e}`,t);let n=oo[e];delete oo[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=oo[e];if(n===void 0)throw this.manager.itemError(e),t;delete oo[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},lo=new WeakMap,uo=class extends ao{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=no.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=lo.get(a);e===void 0&&(e=[],lo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Je(`img`);function s(){l(),t&&t(this);let n=lo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}lo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),no.remove(`image:${e}`);let n=lo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}lo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),no.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},fo=class extends ao{constructor(e){super(e)}load(e,t,n,r){let i=new Jt,a=new uo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},po=class extends On{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new K(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},mo=class extends po{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(On.DEFAULT_UP),this.updateMatrix(),this.groundColor=new K(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ho=new en,go=new G,_o=new G,vo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new W(512,512),this.mapType=f,this.map=null,this.mapPass=null,this.matrix=new en,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pi,this._frameExtents=new W(1,1),this._viewportCount=1,this._viewports=[new Yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;go.setFromMatrixPosition(e.matrixWorld),t.position.copy(go),_o.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_o),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){ho.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ho,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ho)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},yo=new G,bo=new At,xo=new G,So=class extends On{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new en,this.projectionMatrix=new en,this.projectionMatrixInverse=new en,this.coordinateSystem=Ge,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(yo,bo,xo),xo.x===1&&xo.y===1&&xo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yo,bo,xo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(yo,bo,xo),xo.x===1&&xo.y===1&&xo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yo,bo,xo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Co=new G,wo=new W,To=new W,Eo=class extends So{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ot*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(at*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ot*2*Math.atan(Math.tan(at*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Co.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Co.x,Co.y).multiplyScalar(-e/Co.z),Co.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Co.x,Co.y).multiplyScalar(-e/Co.z)}getViewSize(e,t){return this.getViewBounds(e,wo,To),t.subVectors(To,wo)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(at*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Do=class extends vo{constructor(){super(new Eo(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ot*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Oo=class extends po{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(On.DEFAULT_UP),this.updateMatrix(),this.target=new On,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Do}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},ko=class extends vo{constructor(){super(new Eo(90,1,.5,500)),this.isPointLightShadow=!0}},Ao=class extends po{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new ko}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},jo=class extends So{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Mo=class extends vo{constructor(){super(new jo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},No=class extends po{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(On.DEFAULT_UP),this.updateMatrix(),this.target=new On,this.shadow=new Mo}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Po=class{static extractUrlBase(e){let t=e.lastIndexOf(`/`);return t===-1?`./`:e.slice(0,t+1)}static resolveURL(e,t){return typeof e!=`string`||e===``?``:(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,`$1`)),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Fo=class extends jr{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},Io=new WeakMap,Lo=class extends ao{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>`u`&&H(`ImageBitmapLoader: createImageBitmap() not supported.`),typeof fetch>`u`&&H(`ImageBitmapLoader: fetch() not supported.`),this.options={premultiplyAlpha:`none`},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=no.get(`image-bitmap:${e}`);if(a!==void 0){if(i.manager.itemStart(e),a.then){a.then(n=>{Io.has(a)===!0?(r&&r(Io.get(a)),i.manager.itemError(e),i.manager.itemEnd(e)):(t&&t(n),i.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin===`anonymous`?`same-origin`:`include`,o.headers=this.requestHeader,o.signal=typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let s=fetch(e,o).then(function(e){return e.blob()}).then(function(e){return createImageBitmap(e,Object.assign({},i.options,{colorSpaceConversion:`none`}))}).then(function(n){return no.add(`image-bitmap:${e}`,n),t&&t(n),i.manager.itemEnd(e),n}).catch(function(t){r&&r(t),Io.set(s,t),no.remove(`image-bitmap:${e}`),i.manager.itemError(e),i.manager.itemEnd(e)});no.add(`image-bitmap:${e}`,s),i.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Ro=-90,zo=1,Bo=class extends On{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Eo(Ro,zo,e,t);r.layers=this.layers,this.add(r);let i=new Eo(Ro,zo,e,t);i.layers=this.layers,this.add(i);let a=new Eo(Ro,zo,e,t);a.layers=this.layers,this.add(a);let o=new Eo(Ro,zo,e,t);o.layers=this.layers,this.add(o);let s=new Eo(Ro,zo,e,t);s.layers=this.layers,this.add(s);let c=new Eo(Ro,zo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Vo=class extends Eo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ho=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Uo.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Uo(){this._document.hidden===!1&&this.reset()}var Wo=`\\[\\]\\.:\\/`,Go=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ko=`[^\\[\\]\\.:\\/]`,qo=`[^`+Wo.replace(`\\.`,``)+`]`,Jo=`((?:WC+[\\/:])*)`.replace(`WC`,Ko),Yo=`(WCOD+)?`.replace(`WCOD`,qo),Xo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ko),Zo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ko),Qo=RegExp(`^`+Jo+Yo+Xo+Zo+`$`),$o=[`material`,`materials`,`bones`,`map`],es=class{constructor(e,t,n){let r=n||ts.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ts=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Go,``)}static parseTrackName(e){let t=Qo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);$o.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ts.Composite=es,ts.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ts.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ts.prototype.GetterByBindingType=[ts.prototype._getValue_direct,ts.prototype._getValue_array,ts.prototype._getValue_arrayElement,ts.prototype._getValue_toArray],ts.prototype.SetterByBindingTypeAndVersioning=[[ts.prototype._setValue_direct,ts.prototype._setValue_direct_setNeedsUpdate,ts.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_array,ts.prototype._setValue_array_setNeedsUpdate,ts.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_arrayElement,ts.prototype._setValue_arrayElement_setNeedsUpdate,ts.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_fromArray,ts.prototype._setValue_fromArray_setNeedsUpdate,ts.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function ns(e,t,n,r){let i=rs(r);switch(n){case T:return e*t;case A:return e*t/i.components*i.byteLength;case j:return e*t/i.components*i.byteLength;case M:return e*t*2/i.components*i.byteLength;case N:return e*t*2/i.components*i.byteLength;case E:return e*t*3/i.components*i.byteLength;case D:return e*t*4/i.components*i.byteLength;case P:return e*t*4/i.components*i.byteLength;case F:case I:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ee:case te:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case re:case ae:return Math.max(e,16)*Math.max(t,8)/4;case ne:case ie:return Math.max(e,8)*Math.max(t,8)/2;case oe:case L:case ce:case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case se:case R:case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fe:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case pe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case me:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case _e:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ve:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ce:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case we:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Te:case Ee:case De:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*8;case z:case Ae:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function rs(e){switch(e){case f:case p:return{byteLength:1,components:1};case h:case m:case y:return{byteLength:2,components:1};case b:case x:return{byteLength:2,components:4};case _:case g:case v:return{byteLength:4,components:1};case C:case w:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function is(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function as(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var os={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
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
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
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
}`,distance_vert:`#define DISTANCE
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
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},J={common:{diffuse:{value:new K(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new K(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new K(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new K(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},ss={basic:{uniforms:_a([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.fog]),vertexShader:os.meshbasic_vert,fragmentShader:os.meshbasic_frag},lambert:{uniforms:_a([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new K(0)},envMapIntensity:{value:1}}]),vertexShader:os.meshlambert_vert,fragmentShader:os.meshlambert_frag},phong:{uniforms:_a([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new K(0)},specular:{value:new K(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:os.meshphong_vert,fragmentShader:os.meshphong_frag},standard:{uniforms:_a([J.common,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.roughnessmap,J.metalnessmap,J.fog,J.lights,{emissive:{value:new K(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:os.meshphysical_vert,fragmentShader:os.meshphysical_frag},toon:{uniforms:_a([J.common,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.gradientmap,J.fog,J.lights,{emissive:{value:new K(0)}}]),vertexShader:os.meshtoon_vert,fragmentShader:os.meshtoon_frag},matcap:{uniforms:_a([J.common,J.bumpmap,J.normalmap,J.displacementmap,J.fog,{matcap:{value:null}}]),vertexShader:os.meshmatcap_vert,fragmentShader:os.meshmatcap_frag},points:{uniforms:_a([J.points,J.fog]),vertexShader:os.points_vert,fragmentShader:os.points_frag},dashed:{uniforms:_a([J.common,J.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:os.linedashed_vert,fragmentShader:os.linedashed_frag},depth:{uniforms:_a([J.common,J.displacementmap]),vertexShader:os.depth_vert,fragmentShader:os.depth_frag},normal:{uniforms:_a([J.common,J.bumpmap,J.normalmap,J.displacementmap,{opacity:{value:1}}]),vertexShader:os.meshnormal_vert,fragmentShader:os.meshnormal_frag},sprite:{uniforms:_a([J.sprite,J.fog]),vertexShader:os.sprite_vert,fragmentShader:os.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:os.background_vert,fragmentShader:os.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:os.backgroundCube_vert,fragmentShader:os.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:os.cube_vert,fragmentShader:os.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:os.equirect_vert,fragmentShader:os.equirect_frag},distance:{uniforms:_a([J.common,J.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:os.distance_vert,fragmentShader:os.distance_frag},shadow:{uniforms:_a([J.lights,J.fog,{color:{value:new K(0)},opacity:{value:1}}]),vertexShader:os.shadow_vert,fragmentShader:os.shadow_frag}};ss.physical={uniforms:_a([ss.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new K(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new K(0)},specularColor:{value:new K(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:os.meshphysical_vert,fragmentShader:os.meshphysical_frag};var cs={r:0,b:0,g:0},ls=new en,us=new Nt;us.set(-1,0,0,0,1,0,0,0,1);function ds(e,t,n,r,i,a){let o=new K(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new ii(new sa(1,1,1),new wa({name:`BackgroundCubeMaterial`,uniforms:ga(ss.backgroundCube.uniforms),vertexShader:ss.backgroundCube.vertexShader,fragmentShader:ss.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ls.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(us),l.material.toneMapped=Rt.getTransfer(i.colorSpace)!==Ve,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new ii(new pa(2,2),new wa({name:`BackgroundMaterial`,uniforms:ga(ss.background.uniforms),vertexShader:ss.background.vertexShader,fragmentShader:ss.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Rt.getTransfer(i.colorSpace)!==Ve,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(cs,ba(e)),n.buffers.color.setClear(cs.r,cs.g,cs.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function fs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ps(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ms(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function hs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Rr,s=new Nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var gs=4,_s=6,vs=20,ys=256,bs=new jo,xs=new K,Ss=null,Cs=0,ws=0,Ts=!1,Es=new G,Ds=new G,Os=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Es}=i;Ss=this._renderer.getRenderTarget(),Cs=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel(),Ts=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ps(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ss,Cs,ws),this._renderer.xr.enabled=Ts,e.scissorTest=!1,js(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ss=this._renderer.getRenderTarget(),Cs=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel(),Ts=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:l,minFilter:l,generateMipmaps:!1,type:y,format:D,colorSpace:ze,depthBuffer:!1},r=As(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=As(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ks(r)),this._blurMaterial=Ns(r,e,t),this._ggxMaterial=Ms(r,e,t)}return r}_compileMaterial(e){let t=new ii(new jr,e);this._renderer.compile(t,bs)}_sceneToCubeUV(e,t,n,r,i){let a=new Eo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(xs),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ii(new sa,new Kr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(xs),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;js(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ps());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;js(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,bs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-gs?n-d+gs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,js(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,bs),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,js(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,bs)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];js(t,3*l*(r>this._lodMax-gs?r-this._lodMax+gs:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,bs)}};function ks(e){let t=[],n=[],r=e,i=e-gs+1+_s;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Ds.set(1,r,n):e===1?Ds.set(-n,1,-r):e===2?Ds.set(-n,r,1):e===3?Ds.set(-1,r,-n):e===4?Ds.set(-n,-1,r):Ds.set(n,r,-1),Ds.toArray(l,(e*6+t)*3)}}let u=new jr;u.setAttribute(`position`,new _r(c,3)),u.setAttribute(`outputDirection`,new _r(l,3)),n.push(new ii(u,null)),r>gs&&r--}return{lodMeshes:n,sizeLods:t}}function As(e,t,n){let r=new Zt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function js(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ms(e,t,n){return new wa({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:ys,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Is(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ns(e,t,n){return new wa({name:`SphericalGaussianBlur`,defines:{SAMPLES:vs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Is(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ps(){return new wa({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Is(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Fs(){return new wa({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Is(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ls=class extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new na(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new sa(5,5,5),i=new wa({name:`CubemapFromEquirect`,uniforms:ga(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new ii(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=l),new Bo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Rs(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Ls(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Os(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Os(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function zs(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&$e(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Bs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?yr:vr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Vs(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Hs(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Us(e,t,n){let r=new WeakMap,i=new Yt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Qt(h,p,m,u);g.type=v,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new W(p,m)},r.set(o,d);function y(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ws(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Gs={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Ks(e,t,n,r,i,a){let o=new Zt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new jr;l.setAttribute(`position`,new q([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new q([0,2,0,0,2,0],2));let u=new Ta({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ii(l,u),f=new jo(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,b=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Zt(t,n,{type:y,depthBuffer:!1,stencilBuffer:!1}),c=new Zt(t,n,{type:y,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Rt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Gs[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var qs=new Jt,Js=new ia(1,1),Ys=new Qt,Xs=new $t,Zs=new na,Qs=[],$s=[],ec=new Float32Array(16),tc=new Float32Array(9),nc=new Float32Array(4);function rc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Qs[i];if(a===void 0&&(a=new Float32Array(i),Qs[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function ic(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ac(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function oc(e,t){let n=$s[t];n===void 0&&(n=new Int32Array(t),$s[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function sc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function cc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ic(n,t))return;e.uniform2fv(this.addr,t),ac(n,t)}}function lc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(ic(n,t))return;e.uniform3fv(this.addr,t),ac(n,t)}}function uc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ic(n,t))return;e.uniform4fv(this.addr,t),ac(n,t)}}function dc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ic(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ac(n,t)}else{if(ic(n,r))return;nc.set(r),e.uniformMatrix2fv(this.addr,!1,nc),ac(n,r)}}function fc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ic(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ac(n,t)}else{if(ic(n,r))return;tc.set(r),e.uniformMatrix3fv(this.addr,!1,tc),ac(n,r)}}function pc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ic(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ac(n,t)}else{if(ic(n,r))return;ec.set(r),e.uniformMatrix4fv(this.addr,!1,ec),ac(n,r)}}function mc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function hc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ic(n,t))return;e.uniform2iv(this.addr,t),ac(n,t)}}function gc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ic(n,t))return;e.uniform3iv(this.addr,t),ac(n,t)}}function _c(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ic(n,t))return;e.uniform4iv(this.addr,t),ac(n,t)}}function vc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ic(n,t))return;e.uniform2uiv(this.addr,t),ac(n,t)}}function bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ic(n,t))return;e.uniform3uiv(this.addr,t),ac(n,t)}}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ic(n,t))return;e.uniform4uiv(this.addr,t),ac(n,t)}}function Sc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Js.compareFunction=n.isReversedDepthBuffer()?518:515,a=Js):a=qs,n.setTexture2D(t||a,i)}function Cc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Xs,i)}function wc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Zs,i)}function Tc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ys,i)}function Ec(e){switch(e){case 5126:return sc;case 35664:return cc;case 35665:return lc;case 35666:return uc;case 35674:return dc;case 35675:return fc;case 35676:return pc;case 5124:case 35670:return mc;case 35667:case 35671:return hc;case 35668:case 35672:return gc;case 35669:case 35673:return _c;case 5125:return vc;case 36294:return yc;case 36295:return bc;case 36296:return xc;case 35678:case 36198:case 36298:case 36306:case 35682:return Sc;case 35679:case 36299:case 36307:return Cc;case 35680:case 36300:case 36308:case 36293:return wc;case 36289:case 36303:case 36311:case 36292:return Tc}}function Dc(e,t){e.uniform1fv(this.addr,t)}function Oc(e,t){let n=rc(t,this.size,2);e.uniform2fv(this.addr,n)}function kc(e,t){let n=rc(t,this.size,3);e.uniform3fv(this.addr,n)}function Ac(e,t){let n=rc(t,this.size,4);e.uniform4fv(this.addr,n)}function jc(e,t){let n=rc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Mc(e,t){let n=rc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Nc(e,t){let n=rc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Pc(e,t){e.uniform1iv(this.addr,t)}function Fc(e,t){e.uniform2iv(this.addr,t)}function Ic(e,t){e.uniform3iv(this.addr,t)}function Lc(e,t){e.uniform4iv(this.addr,t)}function Rc(e,t){e.uniform1uiv(this.addr,t)}function zc(e,t){e.uniform2uiv(this.addr,t)}function Bc(e,t){e.uniform3uiv(this.addr,t)}function Vc(e,t){e.uniform4uiv(this.addr,t)}function Hc(e,t,n){let r=this.cache,i=t.length,a=oc(n,i);ic(r,a)||(e.uniform1iv(this.addr,a),ac(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Js:qs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Uc(e,t,n){let r=this.cache,i=t.length,a=oc(n,i);ic(r,a)||(e.uniform1iv(this.addr,a),ac(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Xs,a[e])}function Wc(e,t,n){let r=this.cache,i=t.length,a=oc(n,i);ic(r,a)||(e.uniform1iv(this.addr,a),ac(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Zs,a[e])}function Gc(e,t,n){let r=this.cache,i=t.length,a=oc(n,i);ic(r,a)||(e.uniform1iv(this.addr,a),ac(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ys,a[e])}function Kc(e){switch(e){case 5126:return Dc;case 35664:return Oc;case 35665:return kc;case 35666:return Ac;case 35674:return jc;case 35675:return Mc;case 35676:return Nc;case 5124:case 35670:return Pc;case 35667:case 35671:return Fc;case 35668:case 35672:return Ic;case 35669:case 35673:return Lc;case 5125:return Rc;case 36294:return zc;case 36295:return Bc;case 36296:return Vc;case 35678:case 36198:case 36298:case 36306:case 35682:return Hc;case 35679:case 36299:case 36307:return Uc;case 35680:case 36300:case 36308:case 36293:return Wc;case 36289:case 36303:case 36311:case 36292:return Gc}}var qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ec(t.type)}},Jc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Kc(t.type)}},Yc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Xc=/(\w+)(\])?(\[|\.)?/g;function Zc(e,t){e.seq.push(t),e.map[t.id]=t}function Qc(e,t,n){let r=e.name,i=r.length;for(Xc.lastIndex=0;;){let a=Xc.exec(r),o=Xc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Zc(n,l===void 0?new qc(s,e,t):new Jc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Yc(s),Zc(n,e)),n=e}}}var $c=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Qc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function el(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var tl=37297,nl=0;function rl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var il=new Nt;function al(e){Rt._getMatrix(il,Rt.workingColorSpace,e);let t=`mat3( ${il.elements.map(e=>e.toFixed(4))} )`;switch(Rt.getTransfer(e)){case Be:return[t,`LinearTransferOETF`];case Ve:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ol(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+rl(e.getShaderSource(t),r)}return i}function sl(e,t){let n=al(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var cl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function ll(e,t){let n=cl[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var ul=new G;function dl(){return Rt.getLuminanceCoefficients(ul),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${ul.x.toFixed(4)}, ${ul.y.toFixed(4)}, ${ul.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function fl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(hl).join(`
`)}function pl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function ml(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function hl(e){return e!==``}function gl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function _l(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var vl=/^[ \t]*#include +<([\w\d./]+)>/gm;function yl(e){return e.replace(vl,xl)}var bl=new Map;function xl(e,t){let n=os[t];if(n===void 0){let e=bl.get(t);if(e!==void 0)n=os[e],H(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return yl(n)}var Sl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cl(e){return e.replace(Sl,wl)}function wl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Tl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var El={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Dl(e){return El[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Ol={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function kl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Ol[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Al={302:`ENVMAP_MODE_REFRACTION`};function jl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Al[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ml={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Nl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ml[e.combine]||`ENVMAP_BLENDING_NONE`}function Pl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Fl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Dl(n),l=kl(n),u=jl(n),d=Nl(n),f=Pl(n),p=fl(n),m=pl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(hl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(hl).join(`
`),_.length>0&&(_+=`
`)):(g=[Tl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(hl).join(`
`),_=[Tl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:os.tonemapping_pars_fragment,n.toneMapping===0?``:ll(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,os.colorspace_pars_fragment,sl(`linearToOutputTexel`,n.outputColorSpace),dl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(hl).join(`
`)),o=yl(o),o=gl(o,n),o=_l(o,n),s=yl(s),s=gl(s,n),s=_l(s,n),o=Cl(o),s=Cl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=el(i,i.VERTEX_SHADER,y),S=el(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=ol(i,x,`vertex`),n=ol(i,S,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new $c(i,h),T=ml(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,tl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=nl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Il=0,Ll=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Rl(e),t.set(e,n)),n}},Rl=class{constructor(e){this.id=Il++,this.code=e,this.usedTimes=0}};function zl(e){return e===1030||e===37490||e===36285}function Bl(e,t,n,r,i,a){let o=new fn,s=new Ll,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ss[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,ee=!!x,te=!!i.aoMap,ne=!!i.lightMap,re=!!i.bumpMap&&i.wireframe===!1,ie=!!i.normalMap,ae=!!i.displacementMap,oe=!!i.emissiveMap,L=!!i.metalnessMap,se=!!i.roughnessMap,ce=i.anisotropy>0,le=i.clearcoat>0,R=i.dispersion>0,ue=i.retroreflectivity>0,de=i.iridescence>0,fe=i.sheen>0,pe=i.transmission>0,me=ce&&!!i.anisotropyMap,he=le&&!!i.clearcoatMap,ge=le&&!!i.clearcoatNormalMap,_e=le&&!!i.clearcoatRoughnessMap,ve=de&&!!i.iridescenceMap,ye=de&&!!i.iridescenceThicknessMap,be=fe&&!!i.sheenColorMap,xe=fe&&!!i.sheenRoughnessMap,Se=!!i.specularMap,Ce=!!i.specularColorMap,we=!!i.specularIntensityMap,Te=pe&&!!i.transmissionMap,Ee=pe&&!!i.thicknessMap,De=!!i.gradientMap,Oe=!!i.alphaMap,ke=i.alphaTest>0,z=!!i.alphaHash,Ae=!!i.extensions,je=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Rt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:ee,envMapMode:ee&&x.mapping,envMapCubeUVHeight:S,aoMap:te,lightMap:ne,bumpMap:re,normalMap:ie,displacementMap:ae,emissiveMap:oe,normalMapObjectSpace:ie&&i.normalMapType===1,normalMapTangentSpace:ie&&i.normalMapType===0,packedNormalMap:ie&&i.normalMapType===0&&zl(i.normalMap.format),metalnessMap:L,roughnessMap:se,anisotropy:ce,anisotropyMap:me,clearcoat:le,clearcoatMap:he,clearcoatNormalMap:ge,clearcoatRoughnessMap:_e,dispersion:R,retroreflection:ue,iridescence:de,iridescenceMap:ve,iridescenceThicknessMap:ye,sheen:fe,sheenColorMap:be,sheenRoughnessMap:xe,specularMap:Se,specularColorMap:Ce,specularIntensityMap:we,transmission:pe,transmissionMap:Te,thicknessMap:Ee,gradientMap:De,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ke,alphaHash:z,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:te&&m(i.aoMap.channel),lightMapUv:ne&&m(i.lightMap.channel),bumpMapUv:re&&m(i.bumpMap.channel),normalMapUv:ie&&m(i.normalMap.channel),displacementMapUv:ae&&m(i.displacementMap.channel),emissiveMapUv:oe&&m(i.emissiveMap.channel),metalnessMapUv:L&&m(i.metalnessMap.channel),roughnessMapUv:se&&m(i.roughnessMap.channel),anisotropyMapUv:me&&m(i.anisotropyMap.channel),clearcoatMapUv:he&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ge&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:be&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:xe&&m(i.sheenRoughnessMap.channel),specularMapUv:Se&&m(i.specularMap.channel),specularColorMapUv:Ce&&m(i.specularColorMap.channel),specularIntensityMapUv:we&&m(i.specularIntensityMap.channel),transmissionMapUv:Te&&m(i.transmissionMap.channel),thicknessMapUv:Ee&&m(i.thicknessMap.channel),alphaMapUv:Oe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ie||ce),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||Oe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ie===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Rt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:oe&&i.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ae&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ae&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ss[t];n=xa.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Fl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Vl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Hl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ul(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Wl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Hl),r.length>1&&r.sort(t||Ul),i.length>1&&i.sort(t||Ul)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Gl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Wl,e.set(t,[i])):n>=r.length?(i=new Wl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Kl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new G,color:new K};break;case`SpotLight`:n={position:new G,direction:new G,color:new K,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new K,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new K,groundColor:new K};break;case`RectAreaLight`:n={color:new K,position:new G,halfWidth:new G,halfHeight:new G}}return e[t.id]=n,n}}}function ql(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Jl=0;function Yl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Xl(e){let t=new Kl,n=ql(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new en,o=new en;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Yl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=J.LTC_FLOAT_1,r.rectAreaLTC2=J.LTC_FLOAT_2):(r.rectAreaLTC1=J.LTC_HALF_1,r.rectAreaLTC2=J.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Jl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Zl(e){let t=new Xl(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Ql(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Zl(e),t.set(n,[a])):r>=i.length?(a=new Zl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var $l=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,eu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,tu=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],nu=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],ru=new en,iu=new G,au=new G;function ou(e,t,n){let r=new Pi,i=new W,a=new W,s=new Yt,c=new ka,u=new Aa,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new wa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:$l,fragmentShader:eu}),h=m.clone();h.defines.HORIZONTAL_PASS=1;let g=new jr;g.setAttribute(`position`,new _r(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new ii(g,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,c){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=S!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){H(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;i.copy(p.mapSize);let g=p.getFrameExtents();i.multiply(g),a.copy(p.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(a.x=Math.floor(f/g.x),i.x=a.x*g.x,p.mapSize.x=a.x),i.y>f&&(a.y=Math.floor(f/g.y),i.y=a.y*g.y,p.mapSize.y=a.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||h===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Zt(i.x,i.y,{format:M,type:y,minFilter:l,magFilter:l,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new ia(i.x,i.y,v),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=O,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o}else d.isPointLight?(p.map=new Ls(i.x),p.map.depthTexture=new aa(i.x,_)):(p.map=new Zt(i.x,i.y),p.map.depthTexture=new ia(i.x,i.y,_)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=O,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=l,p.map.depthTexture.magFilter=l):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==i.x||p.map.height!==i.y)&&p.map.setSize(i.x,i.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,c);for(let t=0;t<x;t++){let i=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),iu.setFromMatrixPosition(d.matrixWorld),e.position.copy(iu),au.copy(e.position),au.add(tu[t]),e.up.copy(nu[t]),e.lookAt(au),e.updateMatrixWorld(),n.makeTranslation(-iu.x,-iu.y,-iu.z),ru.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(ru,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);s.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),m.viewport(s)}r=p.getFrustum(t),T(n,c,i,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,c),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let a=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,h.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,h.needsUpdate=!0),n.mapPass===null?n.mapPass=new Zt(i.x,i.y,{format:M,type:y}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,m,b,null),h.uniforms.shadow_pass.value=n.mapPass.texture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,h,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function su(e,t){function n(){let t=!1,n=new Yt,r=null,i=new Yt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?L(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=tt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?L(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new K(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,ee={},te=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),re=new Yt().fromArray(te),ie=new Yt().fromArray(ne);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),L(e.DEPTH_TEST),o.setFunc(3),me(!1),he(1),L(e.CULL_FACE),fe(0);function L(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function se(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ce(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function R(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ue={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ue[103]=e.MIN,ue[104]=e.MAX;let de={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function fe(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(se(e.BLEND),g=!1);return}if(g===!1&&(L(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ue[n],ue[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(de[r],de[i],de[o],de[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function pe(t,n){t.side===2?se(e.CULL_FACE):L(e.CULL_FACE);let r=t.side===1;n&&(r=!r),me(r),t.blending===1&&t.transparent===!1?fe(0):fe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),_e(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?L(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function me(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function he(t){t===0?se(e.CULL_FACE):(L(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ge(t){t!==k&&(N&&e.lineWidth(t),k=t)}function _e(t,n,r){t?(L(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):se(e.POLYGON_OFFSET_FILL)}function ve(t){t?L(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function ye(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function be(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function xe(){let t=ee[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function z(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ae(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function je(t){return d[t]===void 0?e.getParameter(t):d[t]}function Me(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function B(t){re.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),re.copy(t))}function Ne(t){ie.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ie.copy(t))}function V(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,ee={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new K(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,re.set(0,0,e.canvas.width,e.canvas.height),ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:L,disable:se,bindFramebuffer:ce,drawBuffers:le,useProgram:R,setBlending:fe,setMaterial:pe,setFlipSided:me,setCullFace:he,setLineWidth:ge,setPolygonOffset:_e,setScissorTest:ve,activeTexture:ye,bindTexture:be,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:z,texImage3D:Ae,pixelStorei:Me,getParameter:je,updateUBOMapping:V,uniformBlockBinding:Pe,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:we,texSubImage3D:Te,compressedTexSubImage2D:Ee,compressedTexSubImage3D:De,scissor:B,viewport:Ne,reset:Fe}}function cu(e,t,n,f,p,m,h){let g=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new W,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Je(`canvas`)}function T(e,t,n){let r=1,i=je(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function O(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function A(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Be:Rt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function j(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function M(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),F(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function P(e){let t=e.target;t.removeEventListener(`dispose`,P),ee(t)}function F(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&I(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function I(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=S.get(r);delete i[n.__cacheKey],h.memory.textures--}function ee(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let te=0;function ne(){te=0}function re(){return te}function ie(e){te=e}function ae(){let e=te;return e>=p.maxTextures&&H(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),te+=1,e}function oe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function L(t,r){let i=f.get(t);if(t.isVideoTexture&&z(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&i.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ge(i,t,r);return}}else t.isExternalTexture&&(i.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,i.__webglTexture,e.TEXTURE0+r)}function se(t,r){let i=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&i.__version!==t.version){ge(i,t,r);return}t.isExternalTexture&&(i.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,i.__webglTexture,e.TEXTURE0+r)}function ce(t,r){let i=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&i.__version!==t.version){ge(i,t,r);return}n.bindTexture(e.TEXTURE_3D,i.__webglTexture,e.TEXTURE0+r)}function le(t,r){let i=f.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&i.__version!==t.version){_e(i,t,r);return}n.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture,e.TEXTURE0+r)}let R={[r]:e.REPEAT,[i]:e.CLAMP_TO_EDGE,[a]:e.MIRRORED_REPEAT},ue={[o]:e.NEAREST,[s]:e.NEAREST_MIPMAP_NEAREST,[c]:e.NEAREST_MIPMAP_LINEAR,[l]:e.LINEAR,[u]:e.LINEAR_MIPMAP_NEAREST,[d]:e.LINEAR_MIPMAP_LINEAR},de={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function fe(n,r){if(r.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(r.magFilter===1006||r.magFilter===1007||r.magFilter===1005||r.magFilter===1008||r.minFilter===1006||r.minFilter===1007||r.minFilter===1005||r.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,R[r.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,R[r.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,R[r.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ue[r.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ue[r.minFilter]),r.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,de[r.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(r.magFilter===1003||r.minFilter!==1005&&r.minFilter!==1008||r.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(r.anisotropy>1||f.get(r).__currentAnisotropy){let i=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,i.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,p.getMaxAnisotropy())),f.get(r).__currentAnisotropy=r.anisotropy}}}function pe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,N));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=oe(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&I(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function me(e,t,n){return Math.floor(Math.floor(e/n)/t)}function he(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=me(n.start,r.width,4),c=me(t.start,r.width,4);n.start<=i+1&&a===c&&me(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ge(t,r,i){let a=e.TEXTURE_2D;(r.isDataArrayTexture||r.isCompressedArrayTexture)&&(a=e.TEXTURE_2D_ARRAY),r.isData3DTexture&&(a=e.TEXTURE_3D);let o=pe(t,r),s=r.source;n.bindTexture(a,t.__webglTexture,e.TEXTURE0+i);let c=f.get(s);if(s.version!==c.__version||o===!0){if(n.activeTexture(e.TEXTURE0+i),!(typeof ImageBitmap<`u`&&r.image instanceof ImageBitmap)){let t=Rt.getPrimaries(Rt.workingColorSpace),i=r.colorSpace===``?null:Rt.getPrimaries(r.colorSpace),a=r.colorSpace===``||t===i?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,a)}n.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment);let t=T(r.image,!1,p.maxTextureSize);t=Ae(r,t);let l=m.convert(r.format,r.colorSpace),u=m.convert(r.type),d=A(r.internalFormat,l,u,r.normalized,r.colorSpace,r.isVideoTexture);fe(a,r);let f,h=r.mipmaps,g=r.isVideoTexture!==!0,_=c.__version===void 0||o===!0,v=s.dataReady,y=M(r,t);if(r.isDepthTexture)d=j(r.format===k,r.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,d,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,d,t.width,t.height,0,l,u,null));else if(r.isDataTexture){if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,d,h[0].width,h[0].height);for(let t=0,r=h.length;t<r;t++)f=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,l,u,f.data):n.texImage2D(e.TEXTURE_2D,t,d,f.width,f.height,0,l,u,f.data);r.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,d,t.width,t.height),v&&he(r,t,l,u)):n.texImage2D(e.TEXTURE_2D,0,d,t.width,t.height,0,l,u,t.data)}else if(r.isCompressedTexture){if(r.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,d,h[0].width,h[0].height,t.depth);for(let i=0,a=h.length;i<a;i++)if(f=h[i],r.format!==1023){if(l!==null){if(g){if(v){if(r.layerUpdates.size>0){let t=ns(f.width,f.height,r.format,r.type);for(let a of r.layerUpdates){let r=f.data.subarray(a*t/f.data.BYTES_PER_ELEMENT,(a+1)*t/f.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,f.width,f.height,1,l,r)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,f.width,f.height,t.depth,l,f.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,d,f.width,f.height,t.depth,0,f.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,f.width,f.height,t.depth,l,u,f.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,d,f.width,f.height,t.depth,0,l,u,f.data);r.layerUpdates.size>0&&r.clearLayerUpdates()}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,d,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)f=h[t],r.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,l,u,f.data):n.texImage2D(e.TEXTURE_2D,t,d,f.width,f.height,0,l,u,f.data):l===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,l,f.data):n.compressedTexImage2D(e.TEXTURE_2D,t,d,f.width,f.height,0,f.data)}}else if(r.isDataArrayTexture){if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,d,t.width,t.height,t.depth),v){if(r.layerUpdates.size>0){let i=ns(t.width,t.height,r.format,r.type);for(let a of r.layerUpdates){let r=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,l,u,r)}r.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,l,u,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,d,t.width,t.height,t.depth,0,l,u,t.data)}else if(r.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,d,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,l,u,t.data)):n.texImage3D(e.TEXTURE_3D,0,d,t.width,t.height,t.depth,0,l,u,t.data);else if(r.isFramebufferTexture){if(_){if(g)n.texStorage2D(e.TEXTURE_2D,y,d,t.width,t.height);else{let r=t.width,i=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,d,r,i,0,l,u,null),r>>=1,i>>=1}}}else if(r.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(r),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=je(h[0]);n.texStorage2D(e.TEXTURE_2D,y,d,t.width,t.height)}for(let t=0,r=h.length;t<r;t++)f=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,l,u,f):n.texImage2D(e.TEXTURE_2D,t,d,l,u,f);r.generateMipmaps=!1}else if(g){if(_){let r=je(t);n.texStorage2D(e.TEXTURE_2D,y,d,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,l,u,t)}else n.texImage2D(e.TEXTURE_2D,0,d,l,u,t);E(r)&&D(a),c.__version=s.version,r.onUpdate&&r.onUpdate(r)}t.__version=r.version}function _e(t,r,i){if(r.image.length!==6)return;let a=pe(t,r),o=r.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+i);let s=f.get(o);if(o.version!==s.__version||a===!0){n.activeTexture(e.TEXTURE0+i);let t=Rt.getPrimaries(Rt.workingColorSpace),c=r.colorSpace===``?null:Rt.getPrimaries(r.colorSpace),l=r.colorSpace===``||t===c?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,l);let u=r.isCompressedTexture||r.image[0].isCompressedTexture,d=r.image[0]&&r.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!u&&!d?f[e]=T(r.image[e],!0,p.maxCubemapSize):f[e]=d?r.image[e].image:r.image[e],f[e]=Ae(r,f[e]);let h=f[0],g=m.convert(r.format,r.colorSpace),_=m.convert(r.type),v=A(r.internalFormat,g,_,r.normalized,r.colorSpace),y=r.isVideoTexture!==!0,b=s.__version===void 0||a===!0,x=o.dataReady,S=M(r,h);fe(e.TEXTURE_CUBE_MAP,r);let C;if(u){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let i=0;i<C.length;i++){let a=C[i];r.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,0,0,a.width,a.height,g,_,a.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,v,a.width,a.height,0,g,_,a.data):g===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,0,0,a.width,a.height,g,a.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,v,a.width,a.height,0,a.data)}}}else{if(C=r.mipmaps,y&&b){C.length>0&&S++;let t=je(f[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(d){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}E(r)&&D(e.TEXTURE_CUBE_MAP),s.__version=o.version,r.onUpdate&&r.onUpdate(r)}t.__version=r.version}function ve(t,r,i,a,o,s){let c=m.convert(i.format,i.colorSpace),l=m.convert(i.type),u=A(i.internalFormat,c,l,i.normalized,i.colorSpace),d=f.get(r),p=f.get(i);if(p.__renderTarget=r,!d.__hasExternalTextures){let t=Math.max(1,r.width>>s),i=Math.max(1,r.height>>s);o===e.TEXTURE_3D||o===e.TEXTURE_2D_ARRAY?n.texImage3D(o,s,u,t,i,r.depth,0,c,l,null):n.texImage2D(o,s,u,t,i,0,c,l,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),ke(r)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,a,o,p.__webglTexture,0,Oe(r)):(o===e.TEXTURE_2D||o>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&o<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,a,o,p.__webglTexture,s),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ye(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=j(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;ke(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Oe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Oe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=A(a.internalFormat,o,s,a.normalized,a.colorSpace);ke(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Oe(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Oe(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function be(t,r,i){let a=r.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(r.depthTexture&&r.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let o=f.get(r.depthTexture);if(o.__renderTarget=r,(!o.__webglTexture||r.depthTexture.image.width!==r.width||r.depthTexture.image.height!==r.height)&&(r.depthTexture.image.width=r.width,r.depthTexture.image.height=r.height,r.depthTexture.needsUpdate=!0),a){if(o.__webglInit===void 0&&(o.__webglInit=!0,r.depthTexture.addEventListener(`dispose`,N)),o.__webglTexture===void 0){o.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,o.__webglTexture),fe(e.TEXTURE_CUBE_MAP,r.depthTexture);let t=m.convert(r.depthTexture.format),i=m.convert(r.depthTexture.type),a;r.depthTexture.format===1026?a=e.DEPTH_COMPONENT24:r.depthTexture.format===1027&&(a=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,a,r.width,r.height,0,t,i,null)}}else L(r.depthTexture,0);let s=o.__webglTexture,c=Oe(r),l=a?e.TEXTURE_CUBE_MAP_POSITIVE_X+i:e.TEXTURE_2D,u=r.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(r.depthTexture.format===1026)ke(r)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,u,l,s,0,c):e.framebufferTexture2D(e.FRAMEBUFFER,u,l,s,0);else if(r.depthTexture.format===1027)ke(r)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,u,l,s,0,c):e.framebufferTexture2D(e.FRAMEBUFFER,u,l,s,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function xe(t){let r=f.get(t),i=t.isWebGLCubeRenderTarget===!0;if(r.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(r.__depthDisposeCallback&&r.__depthDisposeCallback(),e){let t=()=>{delete r.__boundDepthTexture,delete r.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),r.__depthDisposeCallback=t}r.__boundDepthTexture=e}if(t.depthTexture&&!r.__autoAllocateDepthBuffer){if(i)for(let e=0;e<6;e++)be(r.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?be(r.__webglFramebuffer[0],t,0):be(r.__webglFramebuffer,t,0)}}else if(i){r.__webglDepthbuffer=[];for(let i=0;i<6;i++)if(n.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[i]),r.__webglDepthbuffer[i]===void 0)r.__webglDepthbuffer[i]=e.createRenderbuffer(),ye(r.__webglDepthbuffer[i],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=r.__webglDepthbuffer[i];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let i=t.texture.mipmaps;if(i&&i.length>0?n.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer),r.__webglDepthbuffer===void 0)r.__webglDepthbuffer=e.createRenderbuffer(),ye(r.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=r.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,i)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(t,n,r){let i=f.get(t);n!==void 0&&ve(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&xe(t)}function Ce(t){let r=t.texture,i=f.get(t),a=f.get(r);t.addEventListener(`dispose`,P);let o=t.textures,s=t.isWebGLCubeRenderTarget===!0,c=o.length>1;if(c||(a.__webglTexture===void 0&&(a.__webglTexture=e.createTexture()),a.__version=r.version,h.memory.textures++),s){i.__webglFramebuffer=[];for(let t=0;t<6;t++)if(r.mipmaps&&r.mipmaps.length>0){i.__webglFramebuffer[t]=[];for(let n=0;n<r.mipmaps.length;n++)i.__webglFramebuffer[t][n]=e.createFramebuffer()}else i.__webglFramebuffer[t]=e.createFramebuffer()}else{if(r.mipmaps&&r.mipmaps.length>0){i.__webglFramebuffer=[];for(let t=0;t<r.mipmaps.length;t++)i.__webglFramebuffer[t]=e.createFramebuffer()}else i.__webglFramebuffer=e.createFramebuffer();if(c)for(let t=0,n=o.length;t<n;t++){let n=f.get(o[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&ke(t)===!1){i.__webglMultisampledFramebuffer=e.createFramebuffer(),i.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,i.__webglMultisampledFramebuffer);for(let n=0;n<o.length;n++){let r=o[n];i.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,i.__webglColorRenderbuffer[n]);let a=m.convert(r.format,r.colorSpace),s=m.convert(r.type),c=A(r.internalFormat,a,s,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),l=Oe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,i.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(i.__webglDepthRenderbuffer=e.createRenderbuffer(),ye(i.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(s){n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture),fe(e.TEXTURE_CUBE_MAP,r);for(let n=0;n<6;n++)if(r.mipmaps&&r.mipmaps.length>0)for(let a=0;a<r.mipmaps.length;a++)ve(i.__webglFramebuffer[n][a],t,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,a);else ve(i.__webglFramebuffer[n],t,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);E(r)&&D(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(c){for(let r=0,a=o.length;r<a;r++){let a=o[r],s=f.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,s.__webglTexture),fe(c,a),ve(i.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+r,c,0),E(a)&&D(c)}n.unbindTexture()}else{let o=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(o=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(o,a.__webglTexture),fe(o,r),r.mipmaps&&r.mipmaps.length>0)for(let n=0;n<r.mipmaps.length;n++)ve(i.__webglFramebuffer[n],t,r,e.COLOR_ATTACHMENT0,o,n);else ve(i.__webglFramebuffer,t,r,e.COLOR_ATTACHMENT0,o,0);E(r)&&D(o),n.unbindTexture()}t.depthBuffer&&xe(t)}function we(e){let t=e.textures;for(let r=0,i=t.length;r<i;r++){let i=t[r];if(E(i)){let t=O(e),r=f.get(i).__webglTexture;n.bindTexture(t,r),D(t),n.unbindTexture()}}}let Te=[],Ee=[];function De(t){if(t.samples>0){if(ke(t)===!1){let r=t.textures,i=t.width,a=t.height,o=e.COLOR_BUFFER_BIT,s=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,c=f.get(t),l=r.length>1;if(l)for(let t=0;t<r.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,c.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,c.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,c.__webglMultisampledFramebuffer);let u=t.texture.mipmaps;u&&u.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,c.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,c.__webglFramebuffer);for(let n=0;n<r.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(o|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(o|=e.STENCIL_BUFFER_BIT)),l){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,c.__webglColorRenderbuffer[n]);let t=f.get(r[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,i,a,0,0,i,a,o,e.NEAREST),_===!0&&(Te.length=0,Ee.length=0,Te.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Te.push(s),Ee.push(s),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ee)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Te))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),l)for(let t=0;t<r.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,c.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,c.__webglColorRenderbuffer[t]);let i=f.get(r[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,c.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,i,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,c.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Oe(e){return Math.min(p.maxSamples,e.samples)}function ke(e){let n=f.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function z(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Ae(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Rt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function je(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ae,this.resetTextureUnits=ne,this.getTextureUnits=re,this.setTextureUnits=ie,this.setTexture2D=L,this.setTexture2DArray=se,this.setTexture3D=ce,this.setTextureCube=le,this.rebindTextures=Se,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=ke,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function lu(e,t){function n(n,r=``){let i,a=Rt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var uu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,du=`
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

}`,fu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new oa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new wa({vertexShader:uu,fragmentShader:du,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ii(new pa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},pu=class extends nt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,p=null,m=null,h=typeof XRWebGLBinding<`u`,g=new fu,v={},y=t.getContextAttributes(),b=null,x=null,C=[],w=[],T=new W,E=null,A=null,j=new Eo;j.viewport=new Yt;let M=new Eo;M.viewport=new Yt;let N=[j,M],P=new Vo,F=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new jn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new jn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new jn,C[e]=t),t.getHandSpace()};function ee(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,ee),r.removeEventListener(`selectstart`,ee),r.removeEventListener(`selectend`,ee),r.removeEventListener(`squeeze`,ee),r.removeEventListener(`squeezestart`,ee),r.removeEventListener(`squeezeend`,ee),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}F=null,I=null,g.reset();for(let e in v)delete v[e];if(e.setRenderTarget(b),p=null,d=null,u=null,r=null,x=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?p:d},this.getBinding=function(){return u===null&&h&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,ee),r.addEventListener(`selectstart`,ee),r.addEventListener(`selectend`,ee),r.addEventListener(`squeeze`,ee),r.addEventListener(`squeezestart`,ee),r.addEventListener(`squeezeend`,ee),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,ne),y.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?k:O,a=y.stencil?S:_);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Zt(d.textureWidth,d.textureHeight,{format:D,type:f,depthTexture:new ia(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Zt(p.framebufferWidth,p.framebufferHeight,{format:D,type:f,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let re=new G,ie=new G;function ae(e,t,n){re.setFromMatrixPosition(t.matrixWorld),ie.setFromMatrixPosition(n.matrixWorld);let r=re.distanceTo(ie),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function oe(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),P.near=M.near=j.near=t,P.far=M.far=j.far=n,(F!==P.near||I!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,I=P.far),P.layers.mask=e.layers.mask|6,j.layers.mask=P.layers.mask&-5,M.layers.mask=P.layers.mask&-3;let i=e.parent,a=P.cameras;oe(P,i);for(let e=0;e<a.length;e++)oe(a[e],i);a.length===2?ae(P,j,M):P.projectionMatrix.copy(j.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),L(e,P,i)};function L(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ot*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(d!==null||p!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(e){return v[e]};let se=null;function ce(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let i=!1;t.length!==P.cameras.length&&(P.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=N[n];o===void 0&&(o=new Eo,o.layers.enable(n),o.viewport=new Yt,N[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(P.matrix.copy(o.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),i===!0&&P.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new oa,v[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let le=new is;le.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},mu=new en,hu=new Nt;hu.set(-1,0,0,0,1,0,0,0,1);function gu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ba(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(mu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(hu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function _u(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return U(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var vu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),yu=null;function bu(){return yu===null&&(yu=new vi(vu,16,16,M,y),yu.name=`DFG_LUT`,yu.minFilter=l,yu.magFilter=l,yu.wrapS=i,yu.wrapT=i,yu.generateMipmaps=!1,yu.needsUpdate=!0),yu}var xu=class{constructor(e={}){let{canvas:t=Ye(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1,outputBufferType:m=f}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);g=n.getContextAttributes().alpha}else g=a;let v=m,C=new Set([P,N,j]),w=new Set([f,_,h,S,b,x]),T=new Uint32Array(4),E=new Int32Array(4),D=new G,O=null,k=null,A=[],M=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,ee=!1,te=null,ne=null,re=null,ie=null;this._outputColorSpace=Re;let ae=0,oe=0,L=null,se=-1,ce=null,le=new Yt,R=new Yt,ue=null,de=new K(0),fe=0,pe=t.width,me=t.height,he=1,ge=null,_e=null,ve=new Yt(0,0,pe,me),ye=new Yt(0,0,pe,me),be=!1,xe=new Pi,Se=!1,Ce=!1,we=new en,Te=new G,Ee=new Yt,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Oe=!1;function ke(){return L===null?he:1}let z=n;function Ae(e,n){return t.getContext(e,n)}let je,Me,B,Ne,V,Pe,Fe,Ie,Le,ze,Be,Ve,He,Ue,We,Ke,qe,Je,Xe,Qe,$e,tt,nt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,at,!1),t.addEventListener(`webglcontextrestored`,ot,!1),t.addEventListener(`webglcontextcreationerror`,st,!1),z===null){let t=`webgl2`;if(z=Ae(t,e),z===null)throw Ae(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}rt()}catch(e){throw t.removeEventListener(`webglcontextlost`,at,!1),t.removeEventListener(`webglcontextrestored`,ot,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),U(`WebGLRenderer: `+e.message),e}function rt(){je=new zs(z),je.init(),$e=new lu(z,je),Me=new ms(z,je,e,$e),B=new su(z,je),Me.reversedDepthBuffer&&p&&B.buffers.depth.setReversed(!0),ne=z.createFramebuffer(),re=z.createFramebuffer(),ie=z.createFramebuffer(),Ne=new Hs(z),V=new Vl,Pe=new cu(z,je,B,V,Me,$e,Ne),Fe=new Rs(I),Ie=new as(z),tt=new fs(z,Ie),Le=new Bs(z,Ie,Ne,tt),ze=new Ws(z,Le,Ie,tt,Ne),Je=new Us(z,Me,Pe),We=new hs(V),Be=new Bl(I,Fe,je,Me,tt,We),Ve=new gu(I,V),He=new Gl,Ue=new Ql(je),qe=new ds(I,Fe,B,ze,g,s),Ke=new ou(I,ze,Me),nt=new _u(z,Ne,Me,B),Xe=new ps(z,je,Ne),Qe=new Vs(z,je,Ne),Ne.programs=Be.programs,I.capabilities=Me,I.extensions=je,I.properties=V,I.renderLists=He,I.shadowMap=Ke,I.state=B,I.info=Ne}v!==1009&&(F=new Ks(v,t.width,t.height,o,r,i));let it=new pu(I,z);this.xr=it,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let e=je.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=je.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(e){e!==void 0&&(he=e,this.setSize(pe,me,!1))},this.getSize=function(e){return e.set(pe,me)},this.setSize=function(e,n,r=!0){if(it.isPresenting){H(`WebGLRenderer: Can't change size while VR device is presenting.`);return}pe=e,me=n,t.width=Math.floor(e*he),t.height=Math.floor(n*he),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(pe*he,me*he).floor()},this.setDrawingBufferSize=function(e,n,r){pe=e,me=n,he=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(v===1009){U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}F.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(le)},this.getViewport=function(e){return e.copy(ve)},this.setViewport=function(e,t,n,r){e.isVector4?ve.set(e.x,e.y,e.z,e.w):ve.set(e,t,n,r),B.viewport(le.copy(ve).multiplyScalar(he).round())},this.getScissor=function(e){return e.copy(ye)},this.setScissor=function(e,t,n,r){e.isVector4?ye.set(e.x,e.y,e.z,e.w):ye.set(e,t,n,r),B.scissor(R.copy(ye).multiplyScalar(he).round())},this.getScissorTest=function(){return be},this.setScissorTest=function(e){B.setScissorTest(be=e)},this.setOpaqueSort=function(e){ge=e},this.setTransparentSort=function(e){_e=e},this.getClearColor=function(e){return e.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(L!==null){let t=L.texture.format;e=C.has(t)}if(e){let e=L.texture.type,t=w.has(e),n=qe.getClearColor(),r=qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,z.clearBufferuiv(z.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,z.clearBufferiv(z.COLOR,0,E))}else r|=z.COLOR_BUFFER_BIT}t&&(r|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&z.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),te=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,at,!1),t.removeEventListener(`webglcontextrestored`,ot,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),qe.dispose(),He.dispose(),Ue.dispose(),V.dispose(),Fe.dispose(),ze.dispose(),tt.dispose(),nt.dispose(),Be.dispose(),it.dispose(),it.removeEventListener(`sessionstart`,mt),it.removeEventListener(`sessionend`,ht),gt.stop()};function at(e){e.preventDefault(),Ze(`WebGLRenderer: Context Lost.`),ee=!0}function ot(){Ze(`WebGLRenderer: Context Restored.`),ee=!1;let e=Ne.autoReset,t=Ke.enabled,n=Ke.autoUpdate,r=Ke.needsUpdate,i=Ke.type;rt(),Ne.autoReset=e,Ke.enabled=t,Ke.autoUpdate=n,Ke.needsUpdate=r,Ke.type=i}function st(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ct(e){let t=e.target;t.removeEventListener(`dispose`,ct),lt(t)}function lt(e){ut(e),V.remove(e)}function ut(e){let t=V.get(e).programs;t!==void 0&&(t.forEach(function(e){Be.releaseProgram(e)}),e.isShaderMaterial&&Be.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=De);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Et(e,t,n,r,i);B.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Le.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;tt.setup(i,r,s,n,c);let h,g=Xe;if(c!==null&&(h=Ie.get(c),g=Qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(B.setLineWidth(r.wireframeLinewidth*ke()),g.setMode(z.LINES)):g.setMode(z.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),B.setLineWidth(e*ke()),i.isLineSegments?g.setMode(z.LINES):i.isLineLoop?g.setMode(z.LINE_LOOP):g.setMode(z.LINE_STRIP)}else i.isPoints?g.setMode(z.POINTS):i.isSprite&&g.setMode(z.TRIANGLES);if(i.isBatchedMesh){if(je.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ie.get(c).bytesPerElement:1,o=V.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(z,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function dt(e,t,n,r){te!==null&&e.isNodeMaterial&&te.setObject(r,e),Se===!0&&We.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,St(e,t,r),e.side=0,e.needsUpdate=!0,St(e,t,r),e.side=2):St(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),te!==null&&te.renderStart(e,t,n),k=Ue.get(n),k.init(t),M.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),te!==null&&te.updateLights(k.state.lightsArray),Ce=this.localClippingEnabled,Se=We.init(this.clippingPlanes,Ce),Se===!0&&We.setGlobalState(this.clippingPlanes,t),te!==null&&Ke.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];dt(o,n,t,e),r.add(o)}else dt(i,n,t,e),r.add(i)}}),k=M.pop(),te!==null&&te.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=V.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}je.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ft=null;function pt(e){ft&&ft(e)}function mt(){gt.stop()}function ht(){gt.start()}let gt=new is;gt.setAnimationLoop(pt),typeof self<`u`&&gt.setContext(self),this.setAnimationLoop=function(e){ft=e,it.setAnimationLoop(e),e===null?gt.stop():gt.start()},it.addEventListener(`sessionstart`,mt),it.addEventListener(`sessionend`,ht),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;te!==null&&te.renderStart(e,t);let n=it.enabled===!0&&it.isPresenting===!0,r=F!==null&&(L===null||n)&&F.begin(I,L);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(t),t=it.getCamera()),e.isScene===!0&&e.onBeforeRender(I,e,t,L),k=Ue.get(e,M.length),k.init(t),k.state.textureUnits=Pe.getTextureUnits(),M.push(k),we.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),xe.setFromProjectionMatrix(we,Ge,t.reversedDepth),Ce=this.localClippingEnabled,Se=We.init(this.clippingPlanes,Ce),O=He.get(e,A.length),O.init(),A.push(O),it.enabled===!0&&it.isPresenting===!0){let e=I.xr.getDepthSensingMesh();e!==null&&_t(e,t,-1/0,I.sortObjects)}_t(e,t,0,I.sortObjects),O.finish(),te!==null&&te.updateLights(k.state.lightsArray),I.sortObjects===!0&&O.sort(ge,_e),Oe=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Oe&&qe.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Se===!0&&We.beginShadows();let i=k.state.shadowsArray;if(Ke.render(i,e,t),Se===!0&&We.endShadows(),(r&&F.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];yt(n,r,e,a)}Oe&&qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];vt(O,e,n,n.viewport)}}else r.length>0&&yt(n,r,e,t),Oe&&qe.render(e),vt(O,e,t)}L!==null&&oe===0&&(Pe.updateMultisampleRenderTarget(L),Pe.updateRenderTargetMipmap(L)),r&&F.end(I),e.isScene===!0&&e.onAfterRender(I,e,t),tt.resetDefaultState(),se=-1,ce=null,M.pop(),M.length>0?(k=M[M.length-1],Pe.setTextureUnits(k.state.textureUnits),Se===!0&&We.setGlobalState(I.clippingPlanes,k.state.camera)):k=null,A.pop(),O=A.length>0?A[A.length-1]:null,te!==null&&te.renderEnd()};function _t(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(xe)){r&&Ee.setFromMatrixPosition(e.matrixWorld).applyMatrix4(we);let i=ze.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Ee.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(xe))){let i=ze.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ee.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ee.copy(e.boundingSphere.center)),Ee.applyMatrix4(e.matrixWorld).applyMatrix4(we)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Ee.z,s,t)}}else a.visible&&O.push(e,i,a,n,Ee.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)_t(i[e],t,n,r)}function vt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Se===!0&&We.setGlobalState(I.clippingPlanes,n),r&&B.viewport(le.copy(r)),i.length>0&&bt(i,t,n),a.length>0&&bt(a,t,n),o.length>0&&bt(o,t,n),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function yt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=je.has(`EXT_color_buffer_half_float`)||je.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new Zt(1,1,{generateMipmaps:!0,type:e?y:f,minFilter:d,samples:Math.max(4,Me.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Rt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||le;a.setSize(o.z*I.transmissionResolutionScale,o.w*I.transmissionResolutionScale);let s=I.getRenderTarget(),c=I.getActiveCubeFace(),l=I.getActiveMipmapLevel();I.setRenderTarget(a),I.getClearColor(de),fe=I.getClearAlpha(),fe<1&&I.setClearColor(16777215,.5),I.clear(),Oe&&qe.render(n);let u=I.toneMapping;I.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),Se===!0&&We.setGlobalState(I.clippingPlanes,r),bt(e,n,r),Pe.updateMultisampleRenderTarget(a),Pe.updateRenderTargetMipmap(a),je.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,xt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Pe.updateMultisampleRenderTarget(a),Pe.updateRenderTargetMipmap(a))}I.setRenderTarget(s,c,l),I.setClearColor(de,fe),p!==void 0&&(r.viewport=p),I.toneMapping=u}function bt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&xt(o,t,n,s,l,c)}}function xt(e,t,n,r,i,a){te!==null&&i.isNodeMaterial&&te.setObject(e,i),e.onBeforeRender(I,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(I,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=2):I.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(I,t,n,r,i,a)}function St(e,t,n){t.isScene!==!0&&(t=De);let r=V.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Be.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Be.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Fe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ct),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return wt(e,s),d}else s.uniforms=Be.getUniforms(e),te!==null&&e.isNodeMaterial&&te.build(e,n,s),e.onBeforeCompile(s,I),d=Be.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=We.uniform),wt(e,s),r.needsLights=Ot(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ct(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=$c.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function wt(e,t){let n=V.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Tt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function Et(e,t,n,r,i){t.isScene!==!0&&(t=De),Pe.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=L===null?I.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Rt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Fe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(h=I.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=V.get(r),y=k.state.lights;if(Se===!0&&(Ce===!0||e!==ce)){let t=e===ce&&r.id===se;We.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==We.numPlanes||v.numIntersection!==We.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=St(r,t,i),te&&r.isNodeMaterial&&te.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(B.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==se&&(se=r.id,C=!0),v.needsLights){let e=Tt(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ce!==e){B.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(z,`projectionMatrix`,e.projectionMatrix),T.setValue(z,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(z,Te.setFromMatrixPosition(e.matrixWorld)),Me.logarithmicDepthBuffer&&T.setValue(z,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(z,`isOrthographic`,e.isOrthographicCamera===!0),ce!==e&&(ce=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(z,`sunShadowMap`,y.state.sunShadowMap,Pe),y.state.directionalShadowMap.length>0&&T.setValue(z,`directionalShadowMap`,y.state.directionalShadowMap,Pe),y.state.spotShadowMap.length>0&&T.setValue(z,`spotShadowMap`,y.state.spotShadowMap,Pe),y.state.pointShadowMap.length>0&&T.setValue(z,`pointShadowMap`,y.state.pointShadowMap,Pe)),i.isSkinnedMesh){T.setOptional(z,i,`bindMatrix`),T.setOptional(z,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(z,`boneTexture`,e.boneTexture,Pe))}i.isBatchedMesh&&(T.setOptional(z,i,`batchingTexture`),T.setValue(z,`batchingTexture`,i._matricesTexture,Pe),T.setOptional(z,i,`batchingIdTexture`),T.setValue(z,`batchingIdTexture`,i._indirectTexture,Pe),T.setOptional(z,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(z,`batchingColorTexture`,i._colorsTexture,Pe));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Je.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(z,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=bu()),C){if(T.setValue(z,`toneMappingExposure`,I.toneMappingExposure),v.needsLights&&Dt(E,w),a&&r.fog===!0&&Ve.refreshFogUniforms(E,a),Ve.refreshMaterialUniforms(E,r,he,me,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}$c.upload(z,Ct(v),E,Pe)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&($c.upload(z,Ct(v),E,Pe),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(z,`center`,i.center),T.setValue(z,`modelViewMatrix`,i.modelViewMatrix),T.setValue(z,`normalMatrix`,i.normalMatrix),T.setValue(z,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];nt.update(n,x),nt.bind(n,x)}}return x}function Dt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Ot(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ae},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(e,t,n){let r=V.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),V.get(e.texture).__webglTexture=t,V.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=V.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){L=e,ae=t,oe=n;let r=null,i=!1,a=!1;if(e){let o=V.get(e);if(o.__useDefaultFramebuffer!==void 0){B.bindFramebuffer(z.FRAMEBUFFER,o.__webglFramebuffer),le.copy(e.viewport),R.copy(e.scissor),ue=e.scissorTest,B.viewport(le),B.scissor(R),B.setScissorTest(ue),se=-1;return}if(o.__webglFramebuffer===void 0)Pe.setupRenderTarget(e);else if(o.__hasExternalTextures)Pe.rebindTextures(e,V.get(e.texture).__webglTexture,V.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&V.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Pe.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=V.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Pe.useMultisampledRTT(e)===!1?V.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,le.copy(e.viewport),R.copy(e.scissor),ue=e.scissorTest}else le.copy(ve).multiplyScalar(he).floor(),R.copy(ye).multiplyScalar(he).floor(),ue=be;if(n!==0&&(r=ne),B.bindFramebuffer(z.FRAMEBUFFER,r)&&B.drawBuffers(e,r),B.viewport(le),B.scissor(R),B.setScissorTest(ue),i){let r=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=V.get(e.textures[t]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,t.__webglTexture,n)}se=-1};function kt(e){let t=V.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Me.textureFormatReadable(e.format),t.__typeReadable=Me.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){B.bindFramebuffer(z.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let u=kt(o);if(u.__formatReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&z.readPixels(t,n,r,i,$e.convert(c),$e.convert(l),a)}finally{let e=L===null?null:V.get(L).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){B.bindFramebuffer(z.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let d=kt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.bufferData(z.PIXEL_PACK_BUFFER,a.byteLength,z.STREAM_READ),z.readPixels(t,n,r,i,$e.convert(l),$e.convert(u),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let p=L===null?null:V.get(L).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,p);let m=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await et(z,m,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,a),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(f),z.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Pe.setTexture2D(e,0),z.copyTexSubImage2D(z.TEXTURE_2D,n,0,0,o,s,i,a),B.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=$e.convert(t.format),_=$e.convert(t.type),v;t.isData3DTexture?(Pe.setTexture3D(t,0),v=z.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Pe.setTexture2DArray(t,0),v=z.TEXTURE_2D_ARRAY):(Pe.setTexture2D(t,0),v=z.TEXTURE_2D),B.activeTexture(z.TEXTURE0),B.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,t.flipY),B.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),B.pixelStorei(z.UNPACK_ALIGNMENT,t.unpackAlignment);let y=B.getParameter(z.UNPACK_ROW_LENGTH),b=B.getParameter(z.UNPACK_IMAGE_HEIGHT),x=B.getParameter(z.UNPACK_SKIP_PIXELS),S=B.getParameter(z.UNPACK_SKIP_ROWS),C=B.getParameter(z.UNPACK_SKIP_IMAGES);B.pixelStorei(z.UNPACK_ROW_LENGTH,h.width),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,h.height),B.pixelStorei(z.UNPACK_SKIP_PIXELS,l),B.pixelStorei(z.UNPACK_SKIP_ROWS,u),B.pixelStorei(z.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=V.get(e),r=V.get(t),h=V.get(n.__renderTarget),g=V.get(r.__renderTarget);B.bindFramebuffer(z.READ_FRAMEBUFFER,h.__webglFramebuffer),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(e).__webglTexture,i,d+n),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(t).__webglTexture,a,m+n)),z.blitFramebuffer(l,u,o,s,f,p,o,s,z.DEPTH_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||V.has(e)){let n=V.get(e),r=V.get(t);B.bindFramebuffer(z.READ_FRAMEBUFFER,re),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,ie);for(let e=0;e<c;e++)w?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,n.__webglTexture,i),T?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,r.__webglTexture,a),i===0?T?z.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):z.copyTexSubImage2D(v,a,f,p,l,u,o,s):z.blitFramebuffer(l,u,o,s,f,p,o,s,z.COLOR_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?z.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h);B.pixelStorei(z.UNPACK_ROW_LENGTH,y),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,b),B.pixelStorei(z.UNPACK_SKIP_PIXELS,x),B.pixelStorei(z.UNPACK_SKIP_ROWS,S),B.pixelStorei(z.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&z.generateMipmap(v),B.unbindTexture()},this.initRenderTarget=function(e){V.get(e).__webglFramebuffer===void 0&&Pe.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Pe.setTextureCube(e,0):e.isData3DTexture?Pe.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Pe.setTexture2DArray(e,0):Pe.setTexture2D(e,0),B.unbindTexture()},this.resetState=function(){ae=0,oe=0,L=null,B.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ge}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Rt._getUnpackColorSpace()}},Su={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Cu=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},wu=new jo(-1,1,1,-1,0,1),Tu=new class extends jr{constructor(){super(),this.setAttribute(`position`,new q([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new q([0,2,0,0,2,0],2))}},Eu=class{constructor(e){this._mesh=new ii(Tu,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,wu)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Du=class extends Cu{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof wa?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=xa.clone(e.uniforms),this.material=new wa({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Eu(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Ou=class extends Cu{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},ku=class extends Cu{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Au=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new W);this._width=n.width,this._height=n.height,t=new Zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:y}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Du(Su),this.copyPass.material.blending=0,this.timer=new Ho}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Ou!==void 0&&(r instanceof Ou?n=!0:r instanceof ku&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new W);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},ju=class extends Cu{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new K}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Mu={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new K(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Nu=class e extends Cu{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new W(256,256):new W(e.x,e.y),this.clearColor=new K(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Zt(i,a,{type:y,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Zt(i,a,{type:y,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Zt(i,a,{type:y,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=Mu;this.highPassUniforms=xa.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new wa({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new W(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new G(1,1,1),new G(1,1,1),new G(1,1,1),new G(1,1,1),new G(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=xa.clone(Su.uniforms),this.blendMaterial=new wa({uniforms:this.copyUniforms,vertexShader:Su.vertexShader,fragmentShader:Su.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new K,this._oldClearAlpha=1,this._basic=new Kr,this._fsQuad=new Eu(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new W(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new wa({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new W(.5,.5)},direction:{value:new W(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new wa({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Nu.BlurDirectionX=new W(1,0),Nu.BlurDirectionY=new W(0,1);var Pu={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Fu=class extends Cu{constructor(){super(),this.isOutputPass=!0,this.uniforms=xa.clone(Pu.uniforms),this.material=new Ta({name:Pu.name,uniforms:this.uniforms,vertexShader:Pu.vertexShader,fragmentShader:Pu.fragmentShader}),this._fsQuad=new Eu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Rt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Iu={sparrow:{id:`sparrow`,name:`참새`,role:`회피형`,forward:13.3,lateral:10,accel:24,hp:60,radius:.5,flapHz:7.5,special:{kind:`dash`,name:`급회피 대시`,desc:`누르고 있는 방향으로 순간 가속`,cooldown:4,duration:.25,speedMult:2.8},color:`#b07a45`},magpie:{id:`magpie`,name:`까치`,role:`정보형`,forward:13.3,lateral:9,accel:22,hp:105,radius:.7,flapHz:4.2,special:{kind:`reveal`,name:`위험 감지`,desc:`3초간 막 쏘아 올린 불꽃이 터질 자리를 미리 표시`,cooldown:8,duration:3},color:`#4a6fa5`},pigeon:{id:`pigeon`,name:`비둘기`,role:`맷집형`,forward:13.3,lateral:8,accel:20,hp:205,radius:.85,flapHz:5,special:{kind:`guard`,name:`버티기`,desc:`3초간 받는 피해 절반`,cooldown:8,duration:3,damageMult:.5},color:`#8a8f99`}},Lu=[`sparrow`,`magpie`,`pigeon`],Ru={threat:15,bySize:{L:15,M:15,S:15},curtain:35,invulnTime:1.2,obstacle:10,obstacleInvuln:.6,bounceGap:.4,willow:25,crossette:25},zu={pool:12e3,hot:[2.6,2.3,1.6],dragK:25,nearCamFade:[2,3.5,.2]},Bu={bpm:120,beat:.5,bar:2,eighth:.25,sixteenth:.125,tickBefore:.5},Vu={pre:320,plan:[[875,0],[70*Math.PI/2,-90],[250,0],[60*Math.PI/4,45],[327.9,0],[48*Math.PI*2/3,120],[1450,0]],length:2405,height:[[0,8],[665,8],[725,14],[1100,14],[1290,29],[1390,29],[1560,10],[3200,10]],ellipse:{u:9,v:6},zones:[{id:`river`,name:`강 위 · 다리 A 밑`,s:[-400,543],music:1,phase:`early`},{id:`turn1`,name:`강변 → 도심 좌 90°`,s:[543,676],rest:!0,music:0,phase:`rest`},{id:`avenue`,name:`대로 진입 · 상승`,s:[676,760],music:1,phase:`mid`},{id:`canyon`,name:`빌딩 협곡`,s:[760,1100],music:2,phase:`mid`},{id:`climb`,name:`협곡 출구 상승`,s:[1100,1275],music:2,phase:`mid`},{id:`roof`,name:`옥상 우 120°`,s:[1275,1408],rest:!0,music:0,phase:`rest`},{id:`descent`,name:`강으로 하강`,s:[1408,1600],music:2,phase:`late`},{id:`lower`,name:`본류 따라`,s:[1600,2006],music:2,phase:`late`},{id:`rest3`,name:`다리 B 밑 숨 고르기`,s:[2006,2099],rest:!0,music:0,phase:`rest`},{id:`finale`,name:`본류 피날레`,s:[2099,9e3],music:3,phase:`finale`}],bridges:[{id:`A`,s:45,underside:17},{id:`B`,s:2050,underside:19}],remap:[[-400,-400],[70,555],[180,665],[276.5,915],[323.6,962.1],[485,1290],[586,1390.5],[3e3,3804.5]]};function Hu(e){let t=Vu.remap;if(e<=t[0][0])return e;for(let n=1;n<t.length;n++)if(e<=t[n][0])return t[n-1][1]+(e-t[n-1][0])*(t[n][1]-t[n-1][1])/(t[n][0]-t[n-1][0]);return e+(t[t.length-1][1]-t[t.length-1][0])}var Uu={trib:{x:30,hw:60,zTop:1700},main:{off:-40,hw:70,back:1700,ahead:1700},avenueHalf:15,canyonSetback:21,clearU:16,fill:330,rampGrade:.085,roadFar:1500},Wu={tol:.05,window:.07,gJudge:1,gAfter:[2,3],outPad:.1,centerPad:.05,foldT:[.1,.15],foldWin:.2,foldAmt:.7,foldAmtGLB:1},Y={chrysL:{label:`국화 대`,size:`L`,shape:`band`,rout:[5,5.5],rin:1.45,stars:[180,216],egg:.45,life:[1.5,1.9],look:`chrys`,whistle:{f0:700,f1:2400,wave:`sine`,q:9,gain:.11}},willowL:{label:`버드나무 대`,size:`L`,shape:`band`,rout:[5,5.4],rin:1.45,stars:[130,155],egg:.45,life:[2.4,3],look:`willow`,whistle:{f0:600,f1:2e3,wave:`sine`,q:8,gain:.12}},chrysM:{label:`국화 중`,size:`M`,shape:`band`,rout:[3.4,3.9],rin:1.3,stars:[135,162],egg:.35,life:[1.4,1.8],look:`chrys`,whistle:{f0:900,f1:2900,wave:`sine`,q:10,gain:.11}},ring:{label:`고리`,size:`M`,shape:`band`,rout:[3.6,4],rinOff:.7,stars:[90,110],egg:.35,life:[1.3,1.6],look:`ring`,whistle:{f0:1e3,f1:3100,wave:`sine`,q:10,gain:.11}},peonyS:{label:`모란 소`,size:`S`,shape:`disk`,rout:[2.2,2.6],rin:0,stars:[260,320],egg:.25,life:[1.2,1.5],look:`peony`,whistle:{hiss:!0,f0:420,f1:700,gain:.16}},dahlia:{label:`심 모란 중`,size:`M`,shape:`disk`,rout:[3.2,3.6],rin:0,stars:[120,120],core:{n:80,r:1.5},egg:.35,life:[1.4,1.8],look:`dahlia`,whistle:{f0:600,f1:2200,wave:`sine`,q:9,gain:.12}},mix:{early:{chrysL:30,chrysM:25,ring:20,peonyS:25},mid:{chrysL:25,willowL:10,chrysM:20,ring:10,peonyS:20,dahlia:15},late:{chrysL:25,willowL:10,chrysM:20,ring:5,peonyS:20,dahlia:20},finale:{chrysL:25,willowL:15,chrysM:15,peonyS:25,dahlia:20}},colors:{gold:[1,.62,.18],crimson:[1,.2,.28],orange:[1,.33,.06],silver:[.82,.88,1],teal:[.12,.95,.85],lime:[.55,1,.2],purple:[.66,.34,1],pink:[1,.4,.72]},colorLum:.75,colorDrop:[],twoTone:.3,after:[`willow`,`crossette`,`crackle`],passedFade:{delay:.1,time:.25,to:.25},nearCam:{dist:13,from:9,mult:.4,capM:.4},birdHitMult:.45,judgeAfter:.3,look:{angJit:.25,spdJit:.02,depthJit:.25,head:[.09,.13],hotT:.12,hot:2.6,hdr:[1.8,2.2],tailW:[.03,.006],inner:{frac:.3,j:[.72,.95]},tailHalf:.35,tailFloor:.35,tipDot:{a:.6,d:.07},tipCol:[1,.42,.12],clip:.05,sparkle:{frac:.15,hz:[12,20]},starGap:.2,lose:.3,embers:{n:[500,750],size:.055,col:[1,.72,.3],end:[.4,.08,.02],life:[.6,1.5],grav:[1.5,3.2],a:.6},reserve:1500,smoke:{n:[6,10],a:.15,life:[2.6,3.2],size:[1.6,4.2],spread:.35,wind:[.5,.08,.25]},willow:{life:[1.5,2.2],a:.4,col:[1,.6,.2],end:[.35,.08,.02],size:.09,drag:1.4,grav:1.1},crossette:{n:4,speed:[1.8,2.8],life:[.35,.55],size:.07,col:[1.1,.7,.25],end:[.5,.15,.03],a:.75},decorGap:4},coverCap:{wave:.45,all:.55},kick:{fov:1.5,shake:.1},light:{I:.35,radius:22,inT:.02,holdT:0,outT:.4,color:[1,.78,.5]},centerBonus:.15,graze:1,swish:3},Gu={launchToBurst:{L:1,M:.95,S:.9},infoAfterLaunch:.1,eggBefore:.45,ticks:[.25],squeeze:.12,lead:{L:.5,M:.45,S:.4},k:{L:10,M:11,S:13},infoGap:.15},Ku={descent:0,eggR:.175,glow:2.6,back:{r:4.2,a:.6},minPx:2.2,fuseR:.5,fuseW:.045,strong:[1,.6],faint:{size:.5,bright:.3},maxStrong:3,strongRanks:1,maxFaint:6,pulse:{amp:.55,width:.06},count:{scale:[1,1.3],bright:[.85,1],fuse:[[1,.72,.28],[1,.93,.82]],ease:.05},squeeze:{t:.12,to:.6,glint:.06,gain:.5},peonyCol:[1,.3,.28],peonyCore:[1,.9,.8],ringCol:[1,.78,.32],fuseCol:[1,.72,.28],range:{dashes:48,duty:.55,px:1.5,w:.035,hdr:.6,desat:.3,fadeIn:.15,judgeA:.5,fadeOut:.2,fillA:.08},aim:{dashes:16,duty:.5,hdr:.5,w:.03,px:1.5}},X={cell:.3,react:.15,humanReact:.35,reachMult:.9,ellSafe:.95,outMove:[.55,.7],moveMax:5.5,moveMin:.6,pathMix:{out:58,center:42},camp:.85,stillIn:.25,first:8,endPad:27,gap:{early:[8,9],mid:[6,7],late:[5,6],finale:[4,5],rest:[12,12]},maxWaves:110,double:{early:0,mid:.3,late:.35,rest:0},finaleMax:3,tries:60,triesMax:200,cands:12,botN:12,dTarget:{early:[1,2.5],mid:[2.5,4.5],late:[4.5,7],finale:[7,10],rest:[0,0]},los:{step:.25,hfov:40,vfov:24},map:{reach:.75,insCenter:.5,insOut:.8,overlap:.3,sep:1.565,edge:1.2,lr:.65},seq:{early:[[`zig`,[2,3]],[`wave`,[1,2]],[`zig`,[2,3]],[`chain`,[2,2]]],mid:[[`zig`,[3,4]],[`wave`,[2,3]],[`chain`,[2,3]],[`zig`,[2,3]],[`wave`,[1,2]]],late:[[`zig`,[2,3]],[`chain`,[2,3]],[`wave`,[2,3]],[`zig`,[2,3]]],finale:[[`close`,[2,3]],[`zig`,[1,2]],[`close`,[2,3]],[`wave`,[1,2]]]}},qu={kinds:{mayfly:{label:`하루살이`,size:.8},moth:{label:`나방`,size:.72},crumb:{label:`빵`,size:.62},grain:{label:`곡식`,size:.7}},fav:{sparrow:`grain`,magpie:`moth`,pigeon:`crumb`},hp:{n:[10,12],gap:[12,15],skipWaves:4,edge:[.25,.9],offGap:[2,3.5],safe:.12,collect:1,heal:.25,healMin:15,fullPts:100,ring:1.6,glow:[.5,1,.77]},roll:{n:[12,15],off:[2,4],planeGap:3,burstPad:1.5,collect:1,fullPts:200,size:.95},eatT:.12,eatGrow:1.3,fx:{col:{hp:[.5,1,.77],roll:[.37,.91,1],gold:[1,.83,.42]},css:{hp:`#7fffc4`,roll:`#5fe9ff`,gold:`#ffd36a`},ring:{r:1.6,t:.35,w:.08,hdr:1.2},sparks:{n:20,life:.5,size:.12,up:[2.5,5],side:1.8,hdr:1.2},rim:{t:.4,gain:.55}},viewFar:70},Ju={dy:50,size:28,outline:2,pop:.1,rise:.45,fade:.25,risePx:30,stack:26,judgeA:.5,ref:1080},Yu={duration:.35,push:2,invuln:.3,cooldown:.5,start:3,max:5,restRefill:1,perfectWindow:.12,lateGrace:.05,camFollowDeg:3,fovKick:3},Xu={hitStop:.07,slowmo:{scale:.35,inT:.04,holdT:.04,outT:.12,cooldown:3},trauma:{hit:.6,near:.15,maxShake:.35,decay:1.2,freq:17},graze:1.6,scorch:[1,.62,.42,.28],heavyBelow:.4,heavyAccel:.9,heavyRecover:6,trail:{perCombo:.06,max:.8},vignette:.15,smokeTime:1.5,feathers:3},Zu={lookahead:.05,volume:.5,root:220,muffleHz:600},Qu={sleep:1.8,startle:.7,rise:1.7},$u={duration:2.8,gravity:14,spin:7},ed={clearPerStage:1e3,perfect:300,graze:100,pass:50,center:200,timing:80,timingR:1.2,comboMult:[[0,1],[3,1.5],[6,2],[10,3]],hpPoint:10,noHitBonus:500},td=.3,nd={cheerRadius:60,bigCheerTime:2.6,color:460556},rd={nameMin:2,nameMax:12,keep:100,show:50},Z={distance:6,lookAhead:30,pitchDrop:3.15,followU:.45,followV:.6,upOffset:1.2,spring:6,fov:60,maxRollPathDeg:5,maxRollBirdDeg:3,maxRollDeg:8,pitchFollow:.5,maxPitchDeg:5,rollFromBird:.06,fovKick:4,fovKickDecay:7,shake:.22,shakeRange:6,shakeTime:.28,finaleBack:0,finaleFov:62,structMargin:.5,underDeck:1,sectionInset:1,fadeOpacity:.3,fadeTime:.2,near:.2},id={maxPixelRatio:1.25,lowSpecPixelRatio:1,msaaSamples:4,toneMapping:`ACESFilmic`,exposure:1,particlePool:9e3,smokePool:2500,maxSparkPx:28,maxSmokePx:90,streakTime:.05,streakMax:6,tailMax:10,sparkJitter:.3,bloom:{strength:.6,radius:.4,threshold:1},maxDt:.05,lowSpecParticleMult:.5,lowFpsThreshold:28,lowFpsSeconds:6,softwareRe:/SwiftShader|Basic Render|llvmpipe|softpipe|WARP|Software/i,softwareMaxWidth:1280,budget:{calls:100,tris:25e4}},ad={count:6,held:2,decay:3,radiusMult:3,gain:1,intensity:{threat:.9,curtain:1.1,chrysanthemum:1,willow:.8,ring:.8,peony:.7,finale:1.2},decorMult:.9},od={maxFlashesPerSecond:3,flashThreshold:.25,maxFlash:.8,proximity:240},sd={maxVoices:24,masterVolume:.7,speedOfSound:340},cd={chrysanthemum:{label:`국화`,visR:15,k:4,particles:480,size:.5,life:[1.6,2.3],gravity:1.6},peony:{label:`작은 국화`,visR:10,k:5,particles:350,size:.45,life:[1.1,1.6],gravity:1.4},willow:{label:`버드나무`,visR:16,k:2.6,particles:400,size:.45,life:[3,3.8],gravity:3.2},ring:{label:`고리`,visR:14,k:7,particles:360,size:.5,life:[1.3,1.8],gravity:.9},finale:{label:`피날레 대형`,visR:22,k:3,particles:600,size:.6,life:[2.2,3],gravity:1.2}},ld={maxRise:2.2,headSize:1.2,headColor:[1.6,1.7,2],headStreak:3.5},ud={bands:[{id:`near`,dist:[55,150],rate:[.4,.8],max:3,visR:[8,13],size:[.35,.55],particles:[220,320]},{id:`mid`,dist:[150,300],rate:[.3,.6],max:3,visR:[13,22],size:[.7,1.1],particles:[280,380]},{id:`far`,dist:[300,900],rate:[.2,.4],max:3,visR:[22,40],size:[1.6,2.6],particles:[300,420]}],margin:8,yawDeg:40,showWindow:.5,quiet:.5,showChance:.55,hdrMax:1.4,tailMax:10,lowSpecParticles:150,life:[2,3.2],rise:[1.3,2],introRate:1.6,titleRate:1.4,victoryRate:2.5,opening:{count:6,start:.4,window:1.5}},dd=[{id:1,name:`강과 도심`,duration:180,playable:!0,phases:[.12,.8],section:{u:9,v0:2,v1:14,v0Struct:2},sky:{top:198679,bottom:1054768},fog:{color:922660,density:.0021},cityGlow:5124120,groundColor:528671,landColor:1118742,lampColor:16766624,crowd:4e3,palette:[[.45,.85,1.4],[.78,.45,1.35],[.45,1.25,.6],[1.4,.75,.3],[1.4,.45,.8],[1.3,.3,.35]]},{id:2,name:`간판 골목`,duration:50,locked:!0},{id:3,name:`고가 교차로`,duration:55,locked:!0},{id:4,name:`유리 협곡`,duration:60,locked:!0},{id:5,name:`강변 불꽃축제`,duration:70,locked:!0}],fd=dd.filter(e=>e.playable).length,pd={font:`BvfSign`,texts:[`치킨`,`호프`,`노래방`,`약국`,`편의점`,`분식`,`국밥`,`커피`,`숯불갈비`,`꽃집`,`세탁`,`부동산`,`24시 해장국`,`한식뷔페`,`당구장`,`PC방`],neon:[`#4fe3ff`,`#b07dff`,`#7dff6a`,`#e8f0ff`]},md=[`오늘 밤 하늘은 아름다웠습니다. 당신만 빼고.`,`관객이 가장 크게 환호한 순간은, 당신이 떨어질 때였습니다.`,`노릇노릇하게 잘 익었습니다. 축제는 예정대로 계속됩니다.`,`사람들은 오늘을 '역대 최고의 불꽃놀이'로 기억할 겁니다.`,`{time}. 폭죽 한 발보다는 오래 버텼습니다.`],hd=`불꽃놀이 소음은 잠든 새들을 한밤중에 날아오르게 합니다.`,gd=`살아남았습니다. 축제는 내년에도 열립니다.`;function _d(){try{let e=document.createElement(`canvas`);return!!(window.WebGLRenderingContext&&(e.getContext(`webgl2`)||e.getContext(`webgl`)))}catch{return!1}}var vd={ACESFilmic:4,AgX:6};function yd(){let e=``;try{let t=document.createElement(`canvas`),n=t.getContext(`webgl2`)||t.getContext(`webgl`);if(n){let t=n.getExtension(`WEBGL_debug_renderer_info`);e=String(t&&n.getParameter(t.UNMASKED_RENDERER_WEBGL)||n.getParameter(n.RENDERER)||``);let r=n.getExtension(`WEBGL_lose_context`);r&&r.loseContext()}}catch{e=``}return{name:e,software:!!e&&id.softwareRe.test(e)}}var bd=class{constructor(e,t){this.settings=t;let n=yd();this.gpuName=n.name,this.software=n.software,this.software&&(t.lowSpec=!0),this.renderer=new xu({antialias:!this.software,powerPreference:`high-performance`}),this.renderer.toneMapping=vd[id.toneMapping]??4,this.renderer.toneMappingExposure=id.exposure,this.renderer.outputColorSpace=Re,this.renderer.shadowMap.enabled=!1,this.renderer.setClearColor(0,1),e.appendChild(this.renderer.domElement),this.canvas=this.renderer.domElement;let r=new Zt(256,256,{type:y,samples:this.software?0:id.msaaSamples});this.composer=new Au(this.renderer,r),this.renderPass=new ju(new Rn,new Eo),this.bloomPass=new Nu(new W(256,256),id.bloom.strength,id.bloom.radius,id.bloom.threshold),this.outputPass=new Fu,this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(this.outputPass),this.onResize=[],window.addEventListener(`resize`,()=>this.resize()),this.resize()}get pixelRatio(){let e=this.settings.lowSpec?id.lowSpecPixelRatio:id.maxPixelRatio,t=Math.min(window.devicePixelRatio||1,e);return this.software&&this.settings.lowSpec&&(t=Math.min(t,id.softwareMaxWidth/Math.max(1,window.innerWidth))),t}resize(){let e=window.innerWidth,t=window.innerHeight,n=this.pixelRatio;this.renderer.setPixelRatio(n),this.renderer.setSize(e,t),this.composer.setPixelRatio(n),this.composer.setSize(e,t),this.width=e,this.height=t;for(let r of this.onResize)r(e,t,n)}render(e,t,n=!0,r=null){if(n&&this.settings.bloom&&!this.settings.lowSpec?(this.renderPass.scene=e,this.renderPass.camera=t,this.composer.render()):this.renderer.render(e,t),r){let e=this.renderer,n=e.autoClear;e.autoClear=!1,e.setRenderTarget(null),e.render(r,t),e.autoClear=n}}},xd=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Space`,`PageUp`,`PageDown`]);function Sd(e){if(!e)return!1;let t=e.tagName;return t===`INPUT`||t===`TEXTAREA`||e.isContentEditable}var Cd=class{constructor(){this.down=new Set,this.pressed=new Set,window.addEventListener(`keydown`,e=>this.onKeyDown(e),{passive:!1}),window.addEventListener(`keyup`,e=>this.down.delete(e.code)),window.addEventListener(`blur`,()=>this.down.clear())}onKeyDown(e){Sd(e.target)||(xd.has(e.code)&&e.preventDefault(),e.repeat||this.pressed.add(e.code),this.down.add(e.code))}isDown(e){return this.down.has(e)}consume(...e){for(let t of e)if(this.pressed.has(t))return this.pressed.delete(t),!0;return!1}axis(){let e=this.down;return{x:(e.has(`ArrowRight`)||e.has(`KeyD`)?1:0)-(e.has(`ArrowLeft`)||e.has(`KeyA`)?1:0),y:(e.has(`ArrowUp`)||e.has(`KeyW`)?1:0)-(e.has(`ArrowDown`)||e.has(`KeyS`)?1:0)}}clearPressed(){this.pressed.clear()}endFrame(){this.pressed.clear()}},wd=class{constructor(e){this.settings=e,this.ctx=null,this.active=0,this.log=[],this.logOn=!1}get ready(){return!!this.ctx}get now(){return this.ctx?this.ctx.currentTime:0}start(){if(this.ctx){this.ctx.state===`suspended`&&this.ctx.resume();return}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t=new e;this.ctx=t,this.master=t.createGain(),this.master.gain.value=this.settings.sound?sd.masterVolume:0;let n=t.createDynamicsCompressor();n.threshold.value=-14,n.ratio.value=6,this.master.connect(n),n.connect(t.destination),this.sfx=t.createGain(),this.sfx.connect(this.master),this.musicFilter=t.createBiquadFilter(),this.musicFilter.type=`lowpass`,this.musicFilter.frequency.value=18e3,this.musicFilter.Q.value=.7,this.musicGain=t.createGain(),this.musicGain.gain.value=Zu.volume,this.musicIn=t.createGain(),this.drumGain=t.createGain(),this.musicIn.connect(this.musicFilter),this.drumGain.connect(this.musicFilter),this.musicFilter.connect(this.musicGain).connect(this.master);let r=t.sampleRate*2;this.noise=t.createBuffer(1,r,t.sampleRate);let i=this.noise.getChannelData(0);for(let e=0;e<r;e++)i[e]=Math.random()*2-1;let a=t.createBufferSource();a.buffer=this.noise,a.loop=!0;let o=t.createBiquadFilter();o.type=`bandpass`,o.frequency.value=520,o.Q.value=.7,this.murmur=t.createGain(),this.murmur.gain.value=0,a.connect(o).connect(this.murmur).connect(this.sfx),a.start();let s=t.createBufferSource();s.buffer=this.noise,s.loop=!0,this.apFilter=t.createBiquadFilter(),this.apFilter.type=`bandpass`,this.apFilter.frequency.value=2400,this.apFilter.Q.value=1.2,this.apGain=t.createGain(),this.apGain.gain.value=0,s.connect(this.apFilter).connect(this.apGain).connect(this.sfx),s.start()}setMuted(e){this.settings.sound=!e,this.master&&this.master.gain.setTargetAtTime(e?0:sd.masterVolume,this.ctx.currentTime,.05)}suspend(){this.ctx&&this.ctx.state===`running`&&this.ctx.suspend()}resume(){this.ctx&&this.ctx.state===`suspended`&&this.ctx.resume()}setMurmur(e){this.ctx&&this.murmur.gain.setTargetAtTime(e*.06,this.ctx.currentTime,.4)}_log(e,t,n=0,r=null){this.logOn&&(this.log.push({type:e,at:t,now:this.ctx.currentTime,id:n,...r||{}}),this.log.length>6e3&&this.log.splice(0,1e3))}setListener(e){if(!this.ctx)return;let t=this.ctx.listener,n=e.matrixWorld.elements,r=-n[8],i=-n[9],a=-n[10],o=n[4],s=n[5],c=n[6],l=e.position;if(t.positionX){let e=this.ctx.currentTime;t.positionX.setValueAtTime(l.x,e),t.positionY.setValueAtTime(l.y,e),t.positionZ.setValueAtTime(l.z,e),t.forwardX.setValueAtTime(r,e),t.forwardY.setValueAtTime(i,e),t.forwardZ.setValueAtTime(a,e),t.upX.setValueAtTime(o,e),t.upY.setValueAtTime(s,e),t.upZ.setValueAtTime(c,e)}else t.setPosition(l.x,l.y,l.z),t.setOrientation(r,i,a,o,s,c)}_take(e){return!this.ctx||!this.settings.sound||this.active>=sd.maxVoices?!1:(this.active++,setTimeout(()=>{this.active=Math.max(0,this.active-1)},(e+.1)*1e3),!0)}_panner(e,t,n=12){let r=this.ctx,i=r.createGain();i.gain.value=t;let a=r.createPanner();return a.panningModel=`HRTF`,a.distanceModel=`inverse`,a.refDistance=n,a.rolloffFactor=.9,a.maxDistance=3e3,a.positionX?(a.positionX.value=e.x,a.positionY.value=e.y,a.positionZ.value=e.z):a.setPosition(e.x,e.y,e.z),i.connect(a).connect(this.sfx),i.panner=a,i}_setPos(e,t){if(e.positionX){let n=this.ctx.currentTime;e.positionX.setTargetAtTime(t.x,n,.02),e.positionY.setTargetAtTime(t.y,n,.02),e.positionZ.setTargetAtTime(t.z,n,.02)}else e.setPosition(t.x,t.y,t.z)}_out(e,t){let n=this.ctx,r=n.createGain();if(r.gain.value=t,n.createStereoPanner){let t=n.createStereoPanner();t.pan.value=Math.max(-1,Math.min(1,e)),r.connect(t).connect(this.sfx)}else r.connect(this.sfx);return r}_noise(e,t){let n=this.ctx.createBufferSource();return n.buffer=this.noise,n.loop=!0,n.start(e,Math.random()*1.5,t+.05),n}launch(e,t,n){if(!this.ctx||!this.settings.sound)return null;let r=this.ctx,i=r.currentTime;if(this._log(`launch`,i,n),this._take(.4)){let e=this._panner(t,.9,10),n=r.createOscillator();n.type=`sine`,n.frequency.setValueAtTime(140,i),n.frequency.exponentialRampToValueAtTime(55,i+.18);let a=r.createGain();a.gain.setValueAtTime(1e-4,i),a.gain.exponentialRampToValueAtTime(.9,i+.008),a.gain.exponentialRampToValueAtTime(1e-4,i+.3),n.connect(a).connect(e),n.start(i),n.stop(i+.35)}if(!this._take(2.5))return null;let a=e.whistle;if(a.hiss)return this._hiss(a,t,n,i);let o=this._panner(t,a.gain*3,14),s=r.createOscillator();s.type=a.wave,s.frequency.setValueAtTime(a.f0,i);let c=r.createBiquadFilter();c.type=`bandpass`,c.frequency.setValueAtTime(a.f0*1.2,i),c.Q.value=a.q;let l=r.createGain();l.gain.setValueAtTime(1e-4,i),l.gain.exponentialRampToValueAtTime(1,i+.08);let u=r.createOscillator();u.frequency.value=22;let d=r.createGain();d.gain.value=0,u.connect(d).connect(l.gain),s.connect(c).connect(l).connect(o),s.start(i),u.start(i);let f=null;if(a.f0<200){f=this._noise(i,3);let e=r.createBiquadFilter();e.type=`highpass`,e.frequency.value=3500;let t=r.createGain();t.gain.value=.18,f.connect(e).connect(t).connect(o)}let p=this,m=!1,h=!1,g=a.f0;return{update(e,t,n){if(m)return;let i=r.currentTime,l=Math.max(g,a.f0*(a.f1/a.f0)**+Math.max(0,Math.min(1,t)));g=l,s.frequency.setTargetAtTime(l,i,.015),c.frequency.setTargetAtTime(l*1.2,i,.015),p._setPos(o.panner,e),!h&&n<.3&&(h=!0,d.gain.setTargetAtTime(.6,i,.03))},end(){if(m)return;m=!0;let e=r.currentTime;p._log(`whistleEnd`,e,n),l.gain.cancelScheduledValues(e),l.gain.setValueAtTime(Math.max(1e-4,l.gain.value),e),l.gain.exponentialRampToValueAtTime(1e-4,e+.03),s.stop(e+.05),u.stop(e+.05),f&&f.stop(e+.05)}}}_hiss(e,t,n,r){let i=this.ctx,a=this._panner(t,e.gain*3,14),o=this._noise(r,3),s=i.createBiquadFilter();s.type=`bandpass`,s.Q.value=1.4,s.frequency.setValueAtTime(e.f0,r);let c=i.createBiquadFilter();c.type=`lowpass`,c.frequency.value=1400;let l=i.createGain();l.gain.setValueAtTime(1e-4,r),l.gain.exponentialRampToValueAtTime(1,r+.1),o.connect(s).connect(c).connect(l).connect(a);let u=this,d=!1;return{update(t,n){if(d)return;let r=i.currentTime;s.frequency.setTargetAtTime(e.f0+(e.f1-e.f0)*Math.max(0,Math.min(1,n)),r,.03),u._setPos(a.panner,t)},end(){if(d)return;d=!0;let e=i.currentTime;u._log(`whistleEnd`,e,n),l.gain.cancelScheduledValues(e),l.gain.setValueAtTime(Math.max(1e-4,l.gain.value),e),l.gain.exponentialRampToValueAtTime(1e-4,e+.05),o.stop(e+.08)}}}eat(e,t,n,r=!1){if(!this._take(.35))return;let i=this.ctx,a=Math.max(i.currentTime,n);this._log(`eat`,a,0,{step:t});let o=12*Math.floor(t/5)+[0,2,4,7,9][t%5],s=2**(Math.min(19,o)/12),c=this._out(0,r?.3:.24),l=i.createOscillator();l.type=`sine`,l.frequency.setValueAtTime(1500*s,a),l.frequency.exponentialRampToValueAtTime(900*s,a+.035);let u=i.createGain();u.gain.setValueAtTime(1e-4,a),u.gain.exponentialRampToValueAtTime(.9,a+.003),u.gain.exponentialRampToValueAtTime(1e-4,a+.05),l.connect(u).connect(c),l.start(a),l.stop(a+.07);let d=a+.04,f=i.createOscillator(),p=i.createGain();p.gain.setValueAtTime(1e-4,d),e===`sparrow`?(f.type=`sine`,f.frequency.setValueAtTime(3400*Math.sqrt(s),d),f.frequency.exponentialRampToValueAtTime(5200*Math.sqrt(s),d+.05),p.gain.exponentialRampToValueAtTime(.45,d+.008),p.gain.exponentialRampToValueAtTime(1e-4,d+.07)):e===`magpie`?(f.type=`square`,f.frequency.setValueAtTime(1150*Math.sqrt(s),d),f.frequency.exponentialRampToValueAtTime(950*Math.sqrt(s),d+.08),p.gain.exponentialRampToValueAtTime(.18,d+.006),p.gain.exponentialRampToValueAtTime(1e-4,d+.09)):(f.type=`sine`,f.frequency.setValueAtTime(330*Math.sqrt(s),d),f.frequency.linearRampToValueAtTime(390*Math.sqrt(s),d+.06),f.frequency.linearRampToValueAtTime(300*Math.sqrt(s),d+.16),p.gain.exponentialRampToValueAtTime(.55,d+.02),p.gain.exponentialRampToValueAtTime(1e-4,d+.18)),f.connect(p).connect(c),f.start(d),f.stop(d+.2)}boom(e,t,n,r=0){let i=1.4+e*.6,a=t/sd.speedOfSound;if(!this._take(i+a))return;let o=this.ctx,s=o.currentTime+a;this._log(`boom`,s,r,{delay:a,dist:t});let c=this._panner(n,Math.min(1.4,.75*e),18),l=o.createOscillator();l.type=`sine`,l.frequency.setValueAtTime(95,s),l.frequency.exponentialRampToValueAtTime(36,s+.6);let u=o.createGain();u.gain.setValueAtTime(1e-4,s),u.gain.exponentialRampToValueAtTime(.9,s+.015),u.gain.exponentialRampToValueAtTime(1e-4,s+.9),l.connect(u).connect(c),l.start(s),l.stop(s+1);let d=this._noise(s,i),f=o.createBiquadFilter();f.type=`lowpass`,f.frequency.setValueAtTime(Math.max(500,4200-t*12),s),f.frequency.exponentialRampToValueAtTime(200,s+i);let p=o.createGain();p.gain.setValueAtTime(1e-4,s),p.gain.exponentialRampToValueAtTime(.75,s+.012),p.gain.exponentialRampToValueAtTime(1e-4,s+i),d.connect(f).connect(p).connect(c)}bang(e,t,n=0,r=1){if(!this._take(.9))return;let i=this.ctx,a=Math.max(i.currentTime,e);this._log(`bang`,a,n);let o=this._panner(t,Math.min(1.4,.9*r),16),s=i.createOscillator();s.type=`sine`,s.frequency.setValueAtTime(110,a),s.frequency.exponentialRampToValueAtTime(42,a+.12);let c=i.createGain();c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(1,a+.006),c.gain.exponentialRampToValueAtTime(1e-4,a+.13),s.connect(c).connect(o),s.start(a),s.stop(a+.16);let l=this._noise(a,.35),u=i.createBiquadFilter();u.type=`lowpass`,u.frequency.setValueAtTime(1800,a),u.frequency.exponentialRampToValueAtTime(240,a+.3);let d=i.createGain();d.gain.setValueAtTime(1e-4,a),d.gain.exponentialRampToValueAtTime(.55,a+.005),d.gain.exponentialRampToValueAtTime(1e-4,a+.32),l.connect(u).connect(d).connect(o);let f=i.createBiquadFilter();f.type=`highpass`,f.frequency.value=3200,f.connect(o);for(let e=0;e<6;e++){let t=a+.01+e*.022+Math.random()*.012,n=this._noise(t,.025),r=i.createGain();r.gain.setValueAtTime(.7*(1-e*.12),t),r.gain.exponentialRampToValueAtTime(1e-4,t+.025),n.connect(r).connect(f)}}heal(){if(!this._take(.8))return;let e=this.ctx,t=e.currentTime;this._log(`heal`,t);let n=this._out(0,.24);[[784,0],[1174.66,.11]].forEach(([r,i])=>{let a=e.createOscillator();a.type=`triangle`,a.frequency.setValueAtTime(r,t+i);let o=e.createGain();o.gain.setValueAtTime(1e-4,t+i),o.gain.exponentialRampToValueAtTime(.5,t+i+.006),o.gain.exponentialRampToValueAtTime(1e-4,t+i+.6),a.connect(o).connect(n),a.start(t+i),a.stop(t+i+.65)})}sizzle(e,t=.55){if(!this._take(t+.1))return;let n=this.ctx,r=n.currentTime+.03;this._log(`sizzle`,r);let i=this._panner(e,.32,14),a=this._noise(r,t),o=n.createBiquadFilter();o.type=`bandpass`,o.Q.value=.8,o.frequency.setValueAtTime(5200,r),o.frequency.exponentialRampToValueAtTime(2400,r+t);let s=n.createGain();s.gain.setValueAtTime(1e-4,r),s.gain.exponentialRampToValueAtTime(.5,r+.04),s.gain.exponentialRampToValueAtTime(1e-4,r+t),a.connect(o).connect(s).connect(i)}crackle(e,t,n=10,r=.9){let i=e/sd.speedOfSound;if(!this._take(r+i+.2))return;let a=this.ctx,o=this._panner(t,.5,14),s=a.createBiquadFilter();s.type=`highpass`,s.frequency.value=1800,s.connect(o);for(let e=0;e<n;e++){let e=a.currentTime+i+.15+Math.random()*r,t=this._noise(e,.03),n=a.createGain();n.gain.setValueAtTime(.9,e),n.gain.exponentialRampToValueAtTime(1e-4,e+.03),t.connect(n).connect(s)}}tick(e,t=0){if(!this.ctx||!this.settings.sound)return;let n=this.ctx,r=Math.max(n.currentTime,e);this._log(`tick`,r,t);let i=this._out(0,.22),a=n.createGain();a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(1,r+.003),a.gain.exponentialRampToValueAtTime(1e-4,r+.06),a.connect(i);for(let e of[2637,3951]){let t=n.createOscillator();t.type=`sine`,t.frequency.setValueAtTime(e,r),t.connect(a),t.start(r),t.stop(r+.08)}}tickAt(e,t,n=!1,r=0){if(!this.ctx||!this.settings.sound)return;let i=this.ctx,a=Math.max(i.currentTime,e);this._log(`tick`,a,r,{last:n});let o=this._panner(t,n?.75:.55,14),s=i.createBiquadFilter();s.type=`bandpass`,s.frequency.value=n?3200:2400,s.Q.value=6;let c=i.createGain();c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(1,a+.002),c.gain.exponentialRampToValueAtTime(1e-4,a+.045),this._noise(a,.06).connect(s).connect(c).connect(o);let l=i.createOscillator();l.type=`triangle`,l.frequency.setValueAtTime(n?1760:1320,a);let u=i.createGain();u.gain.setValueAtTime(1e-4,a),u.gain.exponentialRampToValueAtTime(.35,a+.002),u.gain.exponentialRampToValueAtTime(1e-4,a+.05),l.connect(u).connect(o),l.start(a),l.stop(a+.07)}chute(e,t=0){if(!this.ctx||!this.settings.sound||!this._take(.2))return;let n=this.ctx,r=n.currentTime;this._log(`chute`,r,t);let i=this._panner(e,.35,12),a=n.createBiquadFilter();a.type=`lowpass`,a.frequency.value=900;let o=n.createGain();o.gain.setValueAtTime(1e-4,r),o.gain.exponentialRampToValueAtTime(1,r+.01),o.gain.exponentialRampToValueAtTime(1e-4,r+.16),this._noise(r,.2).connect(a).connect(o).connect(i)}chime(e,t){if(!this._take(1.2))return;let n=this.ctx,r=Math.max(n.currentTime,t);this._log(`chime`,r);let i=12*Math.floor(e/5)+[0,2,4,7,9][e%5],a=1046.5*2**(Math.min(24,i)/12),o=this._out(0,.3);for(let[e,t,i]of[[1,1,.9],[2.01,.35,.45],[3.02,.15,.25]]){let s=n.createOscillator();s.type=`sine`,s.frequency.setValueAtTime(a*e,r);let c=n.createGain();c.gain.setValueAtTime(1e-4,r),c.gain.exponentialRampToValueAtTime(t,r+.004),c.gain.exponentialRampToValueAtTime(1e-4,r+i),s.connect(c).connect(o),s.start(r),s.stop(r+i+.05)}}thud(){if(!this.ctx||!this.settings.sound)return;let e=this.ctx,t=e.currentTime;this._log(`thud`,t);let n=this._out(0,.5),r=e.createOscillator();r.type=`triangle`,r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(70,t+.08);let i=e.createGain();i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(.8,t+.004),i.gain.exponentialRampToValueAtTime(1e-4,t+.1),r.connect(i).connect(n),r.start(t),r.stop(t+.12)}rollGain(){if(!this._take(.8))return;let e=this.ctx,t=e.currentTime;this._log(`rollGain`,t),this.whoosh(.45,0);let n=this._out(0,.22);[[2093,.05],[3136,.13]].forEach(([r,i])=>{let a=e.createOscillator();a.type=`sine`,a.frequency.setValueAtTime(r,t+i);let o=e.createGain();o.gain.setValueAtTime(1e-4,t+i),o.gain.exponentialRampToValueAtTime(.6,t+i+.004),o.gain.exponentialRampToValueAtTime(1e-4,t+i+.5),a.connect(o).connect(n),a.start(t+i),a.stop(t+i+.55)})}coin(){if(!this._take(.8))return;let e=this.ctx,t=e.currentTime;this._log(`coin`,t);let n=this._out(0,.2);[[1568,0],[2093,.07],[2637,.14]].forEach(([r,i])=>{let a=e.createOscillator();a.type=`sine`,a.frequency.setValueAtTime(r,t+i);let o=e.createGain();o.gain.setValueAtTime(1e-4,t+i),o.gain.exponentialRampToValueAtTime(.55,t+i+.004),o.gain.exponentialRampToValueAtTime(1e-4,t+i+.45),a.connect(o).connect(n),a.start(t+i),a.stop(t+i+.5)})}whoosh(e=1,t=0){if(!this._take(.5))return;let n=this.ctx,r=n.currentTime,i=this._out(t,.35*e),a=this._noise(r,.4),o=n.createBiquadFilter();o.type=`bandpass`,o.Q.value=1.5,o.frequency.setValueAtTime(600,r),o.frequency.exponentialRampToValueAtTime(3e3,r+.12),o.frequency.exponentialRampToValueAtTime(500,r+.38);let s=n.createGain();s.gain.setValueAtTime(1e-4,r),s.gain.exponentialRampToValueAtTime(1,r+.08),s.gain.exponentialRampToValueAtTime(1e-4,r+.38),a.connect(o).connect(s).connect(i)}zap(){if(!this._take(.7))return;let e=this.ctx,t=e.currentTime;this._log(`zap`,t);let n=this._out(0,.6),r=this._noise(t,.22),i=e.createBiquadFilter();i.type=`highpass`,i.frequency.value=2200;let a=e.createGain();a.gain.setValueAtTime(1e-4,t);for(let e=0;e<7;e++){let n=t+e*.022;a.gain.setValueAtTime(.9,n),a.gain.setValueAtTime(.05,n+.012)}a.gain.setValueAtTime(1e-4,t+.18),r.connect(i).connect(a).connect(n);let o=e.createOscillator();o.type=`sine`,o.frequency.setValueAtTime(120,t+.12),o.frequency.exponentialRampToValueAtTime(40,t+.5);let s=e.createGain();s.gain.setValueAtTime(1e-4,t+.12),s.gain.exponentialRampToValueAtTime(1,t+.13),s.gain.exponentialRampToValueAtTime(1e-4,t+.6),o.connect(s).connect(n),o.start(t+.12),o.stop(t+.65)}approach(e){if(!this.ctx)return;let t=this.ctx.currentTime,n=Math.max(0,Math.min(1,e));this.apGain.gain.setTargetAtTime(.16*n*n,t,.04),this.apFilter.frequency.setTargetAtTime(1600+2600*n,t,.05)}muffle(e,t,n=!1){if(!this.ctx)return;let r=this.ctx.currentTime,i=this.musicFilter.frequency,a=this._settled?900:18e3;if(i.cancelScheduledValues(r),i.setValueAtTime(Math.max(50,i.value),r),i.exponentialRampToValueAtTime(t,r+.03),i.setValueAtTime(t,r+e),i.exponentialRampToValueAtTime(a,r+e+.25),n){let t=this.drumGain.gain;t.cancelScheduledValues(r),t.setValueAtTime(t.value,r),t.linearRampToValueAtTime(0,r+.05),t.setValueAtTime(0,r+e),t.linearRampToValueAtTime(1,r+e+.2)}}settle(e){if(!this.ctx||this._settled===e)return;this._settled=e;let t=this.ctx.currentTime,n=this.musicFilter.frequency;n.cancelScheduledValues(t),n.setTargetAtTime(e?900:18e3,t,e?.6:.3)}cheer(e,t=1.8,n=0){if(!this._take(t))return;let r=this.ctx,i=Math.max(r.currentTime,n),a=this._out(0,.28*Math.min(1.3,e)),o=e>.8?5:3;for(let e=0;e<o;e++){let e=this._noise(i,t),n=r.createBiquadFilter();n.type=`bandpass`,n.frequency.value=700+Math.random()*250,n.Q.value=6;let o=r.createBiquadFilter();o.type=`bandpass`,o.frequency.value=1150+Math.random()*300,o.Q.value=5;let s=r.createGain(),c=i+Math.random()*.1;s.gain.setValueAtTime(1e-4,c),s.gain.exponentialRampToValueAtTime(1,c+.2),s.gain.setTargetAtTime(1e-4,c+t*.5,t*.2);let l=r.createOscillator();l.frequency.value=3+Math.random()*4;let u=r.createGain();u.gain.value=.35,l.connect(u).connect(s.gain),l.start(c),l.stop(c+t),e.connect(n),e.connect(o),n.connect(s),o.connect(s),s.connect(a)}}hit(){if(!this._take(.4))return;let e=this.ctx,t=e.currentTime,n=this._out(0,.5),r=e.createOscillator();r.type=`triangle`,r.frequency.setValueAtTime(320,t),r.frequency.exponentialRampToValueAtTime(90,t+.3);let i=e.createGain();i.gain.setValueAtTime(.8,t),i.gain.exponentialRampToValueAtTime(1e-4,t+.35),r.connect(i).connect(n),r.start(t),r.stop(t+.4)}blip(e=880,t=.12,n=.18){if(!this._take(t))return;let r=this.ctx,i=r.currentTime,a=this._out(0,n),o=r.createOscillator();o.type=`square`,o.frequency.setValueAtTime(e,i),o.frequency.exponentialRampToValueAtTime(e*1.5,i+t);let s=r.createGain();s.gain.setValueAtTime(.5,i),s.gain.exponentialRampToValueAtTime(1e-4,i+t),o.connect(s).connect(a),o.start(i),o.stop(i+t+.02)}whistle(e,t){let n=1.1;if(e>160||!this._take(n))return;let r=this.ctx,i=r.currentTime,a=this._panner(t,.25,20),o=r.createOscillator();o.type=`sine`,o.frequency.setValueAtTime(700+Math.random()*300,i),o.frequency.exponentialRampToValueAtTime(2200+Math.random()*600,i+n);let s=r.createGain();s.gain.setValueAtTime(1e-4,i),s.gain.exponentialRampToValueAtTime(1,i+.1),s.gain.exponentialRampToValueAtTime(1e-4,i+n),o.connect(s).connect(a),o.start(i),o.stop(i+n+.05)}},Td=e=>String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function Ed(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/60);return n>0?`${n}분 ${t%60}초`:`${t}초`}function Dd(e){let t=Iu[e]||Iu.sparrow;return`<span class="bird-icon" style="--c:${t.color}" title="${Td(t.name)}">${Td(t.name[0])}</span>`}function Od(e,t,n){return`<div class="stat"><span>${e}</span><div class="bar"><i style="width:${Math.round(t/n*100)}%"></i></div><b>${t}</b></div>`}var kd=class{constructor(e,t){this.root=e,this.onAction=t,e.innerHTML=`
      <div id="border"></div>
      <div id="hud" class="hidden">
        <div class="hud-tl"><div class="stage-name"></div><div class="progress"><i></i></div><div class="phase"></div></div>
        <div class="hud-tc"><div class="score"></div><div class="combo"><b class="cnum"></b><span class="cmul"></span></div><div class="near"></div><div class="judge"></div><div class="foodpop"></div></div>
        <div class="hud-bl"><div class="hp-label"></div><div class="hpbar"><i></i><em></em></div></div>
        <div class="hud-bc">
          <div class="special roll"><span class="key">Space</span><span class="roll-name">급회피 롤</span><div class="gems">${`<b></b>`.repeat(Yu.max)}</div></div>
        </div>
        <div class="hud-help">방향키/WASD 이동 · 범위 원 밖 · 가운데 구멍 · Space 롤(최대 5) · Esc/P 일시정지 · M 소리</div>
      </div>
      <div id="vignette"></div>
      <div id="pops"></div>
      <div id="edges"></div>
      <div id="hint" class="hidden"></div>
      <div id="arrows"></div>
      <div id="wow" class="hidden">와아아!</div>
      <div id="toast"></div>
      <div id="banner" class="hidden"><div class="b-title"></div><div class="b-sub"></div></div>
      <div id="intro-text" class="hidden"></div>
      <div id="fps"></div>
      <div id="loading" class="hidden"><span>그래픽 불러오는 중</span><div class="lbar"><i></i></div></div>
      <div id="dev" class="hidden"></div>
      <div id="notice" class="hidden"></div>
      <div id="screen" class="hidden"></div>
      <div id="pause" class="hidden"></div>
    `,this.$=t=>e.querySelector(t),this.hud=this.$(`#hud`),this.screen=this.$(`#screen`),this.pause=this.$(`#pause`),this.border=this.$(`#border`),this.wowEl=this.$(`#wow`),this.toastEl=this.$(`#toast`),this.arrowsEl=this.$(`#arrows`),this.fpsEl=this.$(`#fps`),this.bannerEl=this.$(`#banner`),this.introEl=this.$(`#intro-text`),this.arrowPool=[],this.hudCache={},this.popsEl=this.$(`#pops`),this.pops=[],this.popXY=null,this.clock=()=>performance.now(),e.addEventListener(`click`,t=>{let n=t.target.closest(`[data-act]`);n&&e.contains(n)&&(n.tagName===`BUTTON`&&n.blur(),this.onAction(n.dataset.act,{...n.dataset}))}),e.addEventListener(`change`,e=>{let t=e.target;t.dataset&&t.dataset.opt&&(this.onAction(`opt`,{key:t.dataset.opt,value:t.checked}),t.blur())}),e.addEventListener(`submit`,t=>{t.preventDefault();let n=e.querySelector(`#nick`);n&&this.onAction(`register`,{name:n.value})})}_show(e,t=``){this.screen.className=t,this.screen.innerHTML=e}hideGpuNotice(){let e=this.root.querySelector(`#gpu-note`);e&&e.remove()}hideScreen(){this.screen.className=`hidden`,this.screen.innerHTML=``}options(e){let t=(t,n,r)=>`<label class="opt"><input type="checkbox" data-opt="${t}" ${e[t]?`checked`:``}/> <span>${n}</span>${r?`<small>${r}</small>`:``}</label>`;return`<div class="options">
      ${t(`reduceMotion`,`흔들림 줄이기`,`화면 기울기·시야 튐·흔들림·퍼펙트 슬로모 끔`)}
      ${t(`bloom`,`빛 번짐(블룸)`,``)}
      ${t(`lowSpec`,`저사양 모드`,`블룸 끔 · 불씨 절반 · 해상도 낮춤`)}
      ${t(`sound`,`소리`,`M 키로도 켜고 끔`)}
    </div>`}showTitle({settings:e,touch:t,top:n,dev:r,gpuWarn:i=!1}){let a=n.length?n.map((e,t)=>`<li><b>${t+1}</b>${Dd(e.bird)}<span>${Td(e.name)}${(e.ver||0)>=6?``:` <small class="old">v5 이전</small>`}</span><em>${e.score.toLocaleString()}</em></li>`).join(``):`<li class="empty">아직 기록이 없어요.</li>`;this._show(`
      <div class="panel title-panel">
        <h1>Birds vs Fireworks</h1>
        <p class="sub">사람에게는 축제, 새에게는 악몽. 도심의 불꽃놀이를 피해 끝까지 날아 보세요.</p>
        <div class="warning">
          <b>광과민성 발작 경고</b>
          이 게임에는 불꽃의 빛과 밝기 변화가 나옵니다. 빛에 민감하거나 발작을 겪은 적이 있다면 플레이하지 마세요.
          하다가 어지럽거나 눈이 불편하면 바로 멈추고 쉬세요.
        </div>
        ${i?`<div class="gpu-note" id="gpu-note">
          <b>그래픽 가속이 꺼져 있습니다. 크롬 설정 → 시스템 → '가능한 경우 그래픽 가속 사용'을 켜고 크롬을 다시 시작하세요.</b>
          엣지로 열어도 됩니다.
          <div class="gpu-row"><code>chrome://settings/system</code><button data-act="gpu-copy">주소 복사</button><button data-act="gpu-close">닫기</button></div>
          <small>지금은 품질을 자동으로 낮췄어요(빛 번짐 끔 · 장식 불꽃 절반 · 물 반사 끔 · 해상도 낮춤).</small>
        </div>`:``}
        ${t?`<div class="touch-note">이 게임은 PC 키보드로 즐겨 주세요. 휴대폰·태블릿 터치 조작은 아직 없어요.</div>`:``}
        ${this.options(e)}
        <div class="buttons">
          <button class="primary" data-act="start">시작하기</button>
          <button data-act="ranking">랭킹 보기</button>
        </div>
        <div class="mini-rank"><div class="mini-title">이 브라우저의 캐주얼 랭킹 상위 10 (이어하기 없는 기록)</div><ol>${a}</ol></div>
        <div class="controls">조작: 방향키 또는 WASD 이동 — 불꽃이 올라가면 바로 점선 「범위 원」이 뜨고 약 1초 뒤 새가 닿는 순간 터집니다(원 안 = 모두 위험). 피하는 길은 둘: 원 밖으로 · 가운데 구멍으로(구멍이 있는 불꽃만, 하얀 작은 고리 = 내 새가 지날 자리, 점수 큼) · 민트 고리 먹이 = HP 회복 · 시안 깃털 = 롤 +1 · Space 급회피 롤(시작 3개 · 최대 5개, 가득일 때 먹으면 +200점) · Esc/P 일시정지 · M 소리 끄기/켜기${r?` · [개발] N 스테이지 건너뛰기, G 무적, B 판정 띠`:``}</div>
      </div>`,`screen-title`)}showSelect({selected:e}){let t=Math.max(...Lu.map(e=>Iu[e].hp)),n=Lu.map(n=>{let r=Iu[n];return r.special,`<button class="bird-card ${n===e?`sel`:``}" data-act="pick" data-bird="${n}">
        <div class="bc-head">${Dd(n)}<b>${Td(r.name)}</b><small>${Td(r.role)}</small></div>
        ${Od(`전진`,r.forward,14)}
        ${Od(`옆·위아래`,r.lateral,10)}
        ${Od(`HP`,r.hp,t)}
        ${Od(`맞는 범위`,r.radius,1)}
        <small class="fav-food">HP 먹이: ${Td(qu.kinds[qu.fav[n]].label)}(민트 고리) · 롤 먹이: 시안 깃털</small>
      </button>`}).join(``);this._show(`
      <div class="panel select-panel">
        <h2>어떤 새로 날까요?</h2>
        <div class="cards">${n}</div>
        <div class="stage-strip">${dd.map(e=>e.playable?`<div class="stage-chip open"><b>STAGE ${e.id}</b><span>${Td(e.name)}</span><small>약 ${e.duration}초</small></div>`:`<button class="stage-chip locked" data-act="locked"><b>STAGE ${e.id}</b><span>${Td(e.name)}</span><small>준비 중</small></button>`).join(``)}</div>
        <div class="hint">←/→ 로 고르고 Enter, 또는 카드를 누르세요. 맞는 범위가 작을수록 피하기 쉽습니다.</div>
        <div class="buttons">
          <button class="primary" data-act="fly">이 새로 날기</button>
          <button data-act="back">처음 화면</button>
        </div>
      </div>`,`screen-select`)}showInterlude({stage:e,rec:t,hpBefore:n,hpAfter:r,maxHp:i,next:a,total:o,isLast:s}){this._show(`
      <div class="panel interlude">
        <div class="kicker">STAGE ${e.id} 완주</div>
        <h2>${Td(e.name)}</h2>
        <table class="score-table">
          <tr><td>완주</td><td>${(1e3*e.id).toLocaleString()}</td></tr>
          <tr><td>퍼펙트 ${t.perfect??0}회 · 스침 ${t.graze??0}회 · 최대 콤보 ${t.maxChain??0}</td><td>${(t.bonus??0).toLocaleString()}</td></tr>
          <tr><td>남은 HP ${Math.ceil(t.hpEnd)}</td><td>${(Math.ceil(t.hpEnd)*10).toLocaleString()}</td></tr>
          <tr><td>무피격</td><td>${t.hits===0?`500`:`0`}</td></tr>
          <tr class="sum"><td>스테이지 점수</td><td>${t.score.toLocaleString()}</td></tr>
          <tr class="sum"><td>누적 점수</td><td>${o.toLocaleString()}</td></tr>
        </table>
        ${s?``:`<p class="heal">숨 고르기: HP ${Math.ceil(n)} → <b>${Math.ceil(r)}</b> / ${i} (최대치의 30% 회복)</p>
        <p class="next">다음: STAGE ${a.id} ${Td(a.name)} · ${a.duration}초</p>`}
        <div class="buttons"><button class="primary" data-act="next">${s?`결과 보기`:`다음 스테이지`} (Enter)</button></div>
      </div>`,`screen-interlude`)}showEnding({joke:e,fact:t,stage:n,time:r,hits:i,score:a}){this._show(`
      <div class="ending-text">
        <p class="joke">${Td(e)}</p>
        <div class="record">STAGE ${n.id} ${Td(n.name)}에서 추락 · 비행 ${Td(Ed(r))} · 맞은 횟수 ${i} · 점수 ${a.toLocaleString()}</div>
        <p class="fact">${Td(t)}</p>
        <div class="buttons">
          <button class="primary" data-act="retry">이 스테이지 다시 (그 스테이지 시작 HP로)</button>
          <button data-act="restart">처음부터</button>
        </div>
      </div>`,`screen-ending`)}showVictory({line:e,fact:t,total:n,records:r,continues:i,bird:a,time:o}){let s=r.map(e=>`<tr><td>${e.id}. ${Td(dd[e.id-1].name)}</td><td>${e.score.toLocaleString()}</td></tr>`).join(``);this._show(`
      <div class="panel victory">
        <div class="kicker">최종 클리어</div>
        <h2>${Td(e)}</h2>
        <p class="fact">${Td(t)}</p>
        <table class="score-table">${s}
          <tr class="sum"><td>합계 ${Dd(a)} 이어하기 ${i}회 · ${Td(Ed(o))}</td><td>${n.toLocaleString()}</td></tr>
        </table>
        <form class="register" autocomplete="off">
          <label>닉네임 (2~12자, 한글·영문·숫자)</label>
          <div class="row"><input id="nick" maxlength="24" placeholder="닉네임"/><button class="primary" type="submit">랭킹에 등록</button></div>
          <div class="reg-msg"></div>
          <small>캐주얼 랭킹: 이 브라우저에만 저장되는 재미용 순위입니다. 조작을 완전히 막지는 못합니다.</small>
        </form>
        <div class="buttons"><button data-act="ranking">랭킹 보기</button><button data-act="restart">처음부터</button></div>
      </div>`,`screen-victory`)}setRegisterMessage(e,t=!1){let n=this.root.querySelector(`.reg-msg`);n&&(n.textContent=e,n.className=`reg-msg ${t?`ok`:`err`}`)}showRanking({entries:e,tab:t,highlightId:n,from:r}){let i=e.length?e.map((e,t)=>`<tr class="${e.id===n?`me`:``}"><td>${t+1}</td><td>${Dd(e.bird)} ${Td(e.name)}${(e.ver||0)>=6?``:` <small class="old">v5 이전</small>`}</td><td>${e.score.toLocaleString()}</td><td>${e.continues}</td><td>${new Date(e.at).toLocaleDateString()}</td></tr>`).join(``):`<tr><td colspan="5" class="empty">아직 기록이 없어요. 5스테이지를 모두 버티면 등록할 수 있어요.</td></tr>`;this._show(`
      <div class="panel ranking">
        <h2>캐주얼 랭킹</h2>
        <p class="sub">이 브라우저에만 저장되는 재미용 순위입니다. 조작을 완전히 막지는 못합니다.</p>
        <div class="tabs">
          <button class="${t===`clean`?`on`:``}" data-act="tab" data-tab="clean">이어하기 없이</button>
          <button class="${t===`all`?`on`:``}" data-act="tab" data-tab="all">이어하기 포함</button>
        </div>
        <table class="rank-table"><tr><th>순위</th><th>닉네임</th><th>점수</th><th>이어하기</th><th>날짜</th></tr>${i}</table>
        <div class="buttons"><button class="primary" data-act="${r===`victory`?`restart`:`back`}">${r===`victory`?`처음부터`:`처음 화면`}</button></div>
      </div>`,`screen-ranking`)}showPause(e,t){if(!e){this.pause.className=`hidden`,this.pause.innerHTML=``;return}this.pause.className=``,this.pause.innerHTML=`
      <div class="panel pause-panel">
        <h2>일시정지</h2>
        ${this.options(t)}
        <div class="buttons"><button class="primary" data-act="resume">계속 (Esc)</button><button data-act="quit">처음 화면으로</button></div>
      </div>`}showHud(e){this.hud.classList.toggle(`hidden`,!e),e||this.setArrows([])}_set(e,t,n,r=`textContent`){this.hudCache[e]!==n&&(this.hudCache[e]=n,r===`width`?t.style.width=n:t[r]=n)}updateHud(e){let t=this.$;this._set(`stage`,t(`.stage-name`),`STAGE ${e.stage.id} · ${e.stage.name}`),this._set(`prog`,t(`.progress i`),`${Math.min(100,e.elapsed/e.stage.duration*100).toFixed(1)}%`,`width`),this._set(`phase`,t(`.phase`),`${[`도입`,`본공연`,`피날레`][e.phase]||``} · 남은 ${Math.max(0,Math.ceil(e.stage.duration-e.elapsed))}초`),this._set(`score`,t(`.score`),`점수 ${e.score.toLocaleString()}`),this._set(`cnum`,t(`.cnum`),e.combo>0?`콤보 ${e.combo}`:``),this._set(`cmul`,t(`.cmul`),e.mult>1?` ×${e.mult}`:``),this._set(`near`,t(`.near`),e.center===void 0?`퍼펙트 ${e.perfect} · 스침 ${e.graze} · 맞음 ${e.hits}`:`센터 ${e.center} · 타이밍 ${e.timing||0} · 스침 ${e.graze} · HP 먹이 ${e.hpFood||0} · 롤 먹이 ${e.rollFood||0} · 맞음 ${e.hits}`);let n=e.hp,r=this._hpAnim;if(r){let e=Math.min(1,(performance.now()-r.t0)/400);n=r.from+(r.to-r.from)*e,e>=1&&(this._hpAnim=null)}this._set(`hpl`,t(`.hp-label`),`${e.birdName} HP ${Math.ceil(n)} / ${e.maxHp}${e.god?` [무적]`:``}`);let i=`${Math.max(0,e.hp/e.maxHp*100).toFixed(1)}%`;this._set(`hp`,t(`.hpbar i`),i,`width`),this.hud.classList.toggle(`low-hp`,e.hp/e.maxHp<.3),e.rolls!==void 0&&this.hudCache.rolls!==e.rolls&&(this.hudCache.rolls=e.rolls,t(`.roll .gems`).querySelectorAll(`b`).forEach((t,n)=>t.classList.toggle(`on`,n<e.rolls))),this.hud.classList.toggle(`sp-ready`,!0),this.hud.classList.toggle(`roll-ready`,!e.rolling&&e.rollCd<=0&&e.rolls>0),this.hud.classList.toggle(`roll-empty`,e.rolls===0)}setLoading(e,t=[]){let n=this.root.querySelector(`#loading`);n&&(n.classList.toggle(`hidden`,e>=1),n.querySelector(`i`).style.width=`${Math.round(e*100)}%`,n.querySelector(`span`).textContent=`그래픽 불러오는 중 ${Math.round(e*100)}%`,e>=1&&t.length&&(this.notice(`일부 그래픽(${t.length}개)을 불러오지 못해 기본 그래픽으로 보여 줍니다.`),setTimeout(()=>this.notice(``),5e3)))}setFps(e,t=!0){this.fpsEl.textContent=t?`${e} FPS`:``}setDev(e){let t=this.$(`#dev`);t.className=e?``:`hidden`,t.textContent=e}setBorder(e){this.border.style.opacity=e.toFixed(3)}wow(){let e=this.wowEl;e.classList.remove(`hidden`,`pop`),e.offsetWidth,e.classList.add(`pop`),clearTimeout(this._wowT),this._wowT=setTimeout(()=>e.classList.add(`hidden`),1500)}toast(e,t=``){let n=document.createElement(`div`);n.className=`toast ${t}`,n.textContent=e,this.toastEl.appendChild(n),setTimeout(()=>n.remove(),1300)}banner(e,t,n=2400){this.bannerEl.querySelector(`.b-title`).textContent=e,this.bannerEl.querySelector(`.b-sub`).textContent=t,this.bannerEl.className=`show`,clearTimeout(this._bT),this._bT=setTimeout(()=>this.bannerEl.className=`hidden`,n)}introText(e){this.introEl.className=e?`show`:`hidden`,this.introEl.textContent=e||``}notice(e){let t=this.$(`#notice`);t.className=e?``:`hidden`,t.textContent=e||``}hint(e){let t=this.$(`#hint`);t.className=e?`show`:`hidden`,t.textContent=e||``}foodPop(e,t=``){let n=this.$(`.foodpop`);n&&(n.textContent=e,n.className=`foodpop${t?` `+t:``}`,n.offsetWidth,n.classList.add(`pop`),clearTimeout(this._fT),this._fT=setTimeout(()=>n.className=`foodpop`,700))}hpFlash(e=null,t=null,n=null){let r=this.$(`.hpbar`);if(r&&(r.classList.remove(`heal`),r.offsetWidth,r.classList.add(`heal`),clearTimeout(this._hfT),this._hfT=setTimeout(()=>r.classList.remove(`heal`),600),e!==null&&n)){let i=r.querySelector(`em`);i&&(i.style.left=`${(e/n*100).toFixed(1)}%`,i.style.width=`${((t-e)/n*100).toFixed(1)}%`,i.classList.remove(`gain`),i.offsetWidth,i.classList.add(`gain`)),this._hpAnim={from:e,to:t,t0:performance.now()}}}pop(e,t=`hp`){let n=this.popsEl;if(!n)return;let r=new Set(this.pops.map(e=>e.slot)),i=0;for(;r.has(i);)i++;let a=document.createElement(`div`);a.className=`pop`;let o=document.createElement(`span`);o.className=`pop-t ${t}`,o.textContent=e,a.appendChild(o),n.appendChild(a);let s={el:a,slot:i,t0:this.clock(),text:e,kind:t};return this.pops.push(s),(this.popLog||=[]).push({text:e,kind:t,slot:i,t:s.t0}),this._placePops(),s}updatePops(e,t,n){e!==null&&(this.popXY=[e,t]),this.popDim=n,this._placePops()}_placePops(){if(!this.pops.length)return;let e=Ju,t=e.pop+e.rise+e.fade,n=this.clock(),r=(typeof window<`u`?window.innerHeight:1080)/e.ref,i=this.popXY||[window.innerWidth/2,window.innerHeight/2],a=this.popDim?e.judgeA:1;for(let o=this.pops.length-1;o>=0;o--){let s=this.pops[o],c=(n-s.t0)/1e3;if(c>=t||c<-1){s.el.remove(),this.pops.splice(o,1);continue}let l=1,u=0,d=1;if(c<e.pop){let t=c/e.pop;l=t<.5?.6+t/.5*(1.15-.6):1.15+(1-1.15)*((t-.5)/.5)}else if(c<e.pop+e.rise){let t=(c-e.pop)/e.rise;u=e.risePx*(1-(1-t)*(1-t))}else{let t=(c-e.pop-e.rise)/e.fade;u=e.risePx+8*t,d=1-t}let f=i[1]+(e.dy+s.slot*e.stack-u)*r;s.el.style.transform=`translate(${i[0].toFixed(1)}px, ${f.toFixed(1)}px) scale(${l.toFixed(3)})`,s.el.style.fontSize=`${(e.size*r).toFixed(1)}px`,s.el.style.opacity=(d*a).toFixed(3),s.lastA=d*a}}clearPops(){for(let e of this.pops)e.el.remove();this.pops.length=0}scoreFly(e,t=`roll`){let n=t===`roll`?this.$(`.roll .gems`):this.$(`.hpbar`),r=this.$(`.hud-tc .score`);if(!n||!r)return;t===`roll`&&(n.classList.remove(`full`),n.offsetWidth,n.classList.add(`full`),clearTimeout(this._gfT),this._gfT=setTimeout(()=>n.classList.remove(`full`),450));let i=n.getBoundingClientRect(),a=r.getBoundingClientRect(),o=document.createElement(`div`);o.className=`fly`,o.textContent=`+${e}`,o.style.transform=`translate(${(i.left+i.width/2).toFixed(0)}px, ${(i.top+i.height/2).toFixed(0)}px) translate(-50%, -50%)`,this.popsEl.appendChild(o),o.offsetWidth,o.style.transform=`translate(${(a.left+a.width/2).toFixed(0)}px, ${(a.top+a.height/2).toFixed(0)}px) translate(-50%, -50%) scale(0.8)`,o.style.opacity=`0.2`,setTimeout(()=>{o.remove(),r.classList.remove(`bump`),r.offsetWidth,r.classList.add(`bump`)},500),(this.flyLog||=[]).push({pts:e,from:t,t:performance.now()})}rollGain(){let e=this.$(`.roll .gems`);if(!e)return;this.hudCache.rolls=void 0;let t=e.querySelectorAll(`b.on`),n=e.querySelectorAll(`b`),r=n[Math.min(n.length-1,t.length)];r&&(r.classList.remove(`pop`),r.offsetWidth,r.classList.add(`pop`))}rollShake(){let e=this.$(`.special.roll`);e&&(e.classList.remove(`shake`),e.offsetWidth,e.classList.add(`shake`),clearTimeout(this._rsT),this._rsT=setTimeout(()=>e.classList.remove(`shake`),400))}judge(e,t){let n=this.$(`.judge`);n.textContent=e,n.className=`judge ${t}`,n.offsetWidth,n.classList.add(`pop`),clearTimeout(this._jT),this._jT=setTimeout(()=>n.className=`judge`,900)}pulse(e){let t=this.$(`#vignette`);t.style.setProperty(`--v`,String(e)),t.classList.remove(`pop`),t.offsetWidth,t.classList.add(`pop`)}setEdges(e){let t=this.$(`#edges`);for(this.edgePool||=[];this.edgePool.length<e.length;){let e=document.createElement(`div`);e.className=`edge`,t.appendChild(e),this.edgePool.push(e)}let n=window.innerWidth,r=window.innerHeight;this.edgePool.forEach((t,i)=>{let a=e[i];if(!a){t.style.display!==`none`&&(t.style.display=`none`);return}t.style.display=`block`;let o=(a.x+1)/2*n,s=(1-a.y)/2*r,c=a.color,l=Math.max(c[0],c[1],c[2],.01),u=`${Math.round(c[0]/l*255)},${Math.round(c[1]/l*255)},${Math.round(c[2]/l*255)}`,d=n*.06;t.style.width=`${d*2}px`,t.style.height=`${d*2}px`,t.style.transform=`translate(${(o-d).toFixed(0)}px, ${(s-d).toFixed(0)}px)`,t.style.background=`radial-gradient(circle, rgba(${u},${(.55*a.a).toFixed(2)}) 0%, rgba(${u},${(.2*a.a).toFixed(2)}) 45%, rgba(${u},0) 70%)`})}setArrows(e){for(;this.arrowPool.length<e.length;){let e=document.createElement(`div`);e.className=`arrow`,this.arrowsEl.appendChild(e),this.arrowPool.push(e)}this.arrowPool.forEach((t,n)=>{let r=e[n];if(!r){t.style.display=`none`;return}t.style.display=`block`,t.style.transform=`translate(${r.x.toFixed(0)}px, ${r.y.toFixed(0)}px) rotate(${r.angle.toFixed(3)}rad)`,t.style.opacity=(.4+.6*r.urgency).toFixed(2)})}},Ad=ad.count,jd=ad.held||0,Md=`
uniform vec4 uLPos[${Ad}]; // xyz 위치, w 반경
uniform vec4 uLCol[${Ad}]; // rgb 색×세기
vec3 flashAt(vec3 p, vec3 n, float wrap) {
  vec3 s = vec3(0.0);
  for (int i = 0; i < ${Ad}; i++) {
    vec4 L = uLPos[i];
    vec3 c = uLCol[i].rgb;
    if (c.r + c.g + c.b < 0.002) continue;
    vec3 d = L.xyz - p;
    float dist = length(d);
    float a = clamp(1.0 - dist / L.w, 0.0, 1.0);
    a *= a;
    float lam = mix(max(dot(n, d / max(dist, 0.001)), 0.0), 1.0, wrap);
    s += c * a * lam;
  }
  return s;
}
// 법선 없이(연기·안개처럼 사방으로 받음)
vec3 flashVol(vec3 p) {
  vec3 s = vec3(0.0);
  for (int i = 0; i < ${Ad}; i++) {
    vec4 L = uLPos[i];
    vec3 c = uLCol[i].rgb;
    if (c.r + c.g + c.b < 0.002) continue;
    float a = clamp(1.0 - length(L.xyz - p) / L.w, 0.0, 1.0);
    s += c * a * a;
  }
  return s;
}
`,Nd=class{constructor(e){if(this.pos=Array.from({length:Ad},()=>new Yt(0,-1e3,0,1)),this.col=Array.from({length:Ad},()=>new Yt(0,0,0,0)),this.slots=Array.from({length:Ad},()=>({t0:-100,I0:0,r:0,g:0,b:0,cur:0})),this.uniforms={uLPos:{value:this.pos},uLCol:{value:this.col}},this.points=[],e)for(let t=0;t<Ad;t++){let t=new Ao(16777215,0,1,0);t.position.set(0,-1e3,0),e.add(t),this.points.push(t)}this._c=new K}clear(){for(let e=0;e<Ad;e++)this.slots[e].held=!1,this.slots[e].I0=0,this.slots[e].cur=0,this.col[e].set(0,0,0,0),this.points[e]&&(this.points[e].intensity=0)}add(e,t,n,r,i){let a=0,o=1/0;for(let e=0;e<Ad-jd;e++){let t=this.slots[e].cur;t<o&&(o=t,a=e)}let s=this.slots[a];s.t0=i,s.I0=n,s.cur=n;let c=Math.max(t[0],t[1],t[2],.001);s.r=t[0]/c,s.g=t[1]/c,s.b=t[2]/c,this.pos[a].set(e.x,e.y,e.z,r);let l=this.points[a];l&&(l.position.set(e.x,e.y,e.z),l.distance=r,l.color.setRGB(s.r,s.g,s.b))}hold(e,t,n,r,i){for(let a=Ad-jd;a<Ad;a++){let o=this.slots[a];if(o.held)continue;o.held=!0,o.key=e,o.manual=r;let s=Math.max(n[0],n[1],n[2],.001);o.r=n[0]/s,o.g=n[1]/s,o.b=n[2]/s,this.pos[a].set(t.x,t.y,t.z,i);let c=this.points[a];return c&&(c.position.set(t.x,t.y,t.z),c.distance=i,c.color.setRGB(o.r,o.g,o.b)),a}return-1}setHeld(e,t){e>=0&&this.slots[e].held&&(this.slots[e].manual=t)}release(e){if(e<0)return;let t=this.slots[e];t.held=!1,t.manual=0,t.I0=0}releaseHeld(){for(let e=Ad-jd;e<Ad;e++)this.release(e)}update(e){for(let t=0;t<Ad;t++){let n=this.slots[t],r=e-n.t0,i=n.held?n.manual:n.I0>0&&r>=0?n.I0*Math.exp(-ad.decay*r):0;n.cur=i<.004?0:i;let a=n.cur*ad.gain;this.col[t].set(n.r*a,n.g*a,n.b*a,0),this.points[t]&&(this.points[t].intensity=a*2.2)}}sampleAt(e,t){t.setRGB(0,0,0);for(let n=0;n<Ad;n++){let r=this.col[n];if(r.x+r.y+r.z<.002)continue;let i=this.pos[n],a=Math.hypot(i.x-e.x,i.y-e.y,i.z-e.z),o=Math.max(0,1-a/i.w);o*=o,t.r+=r.x*o,t.g+=r.y*o,t.b+=r.z*o}return t}},Pd=zu.dragK,Fd=.1,Id=`
attribute vec4 aPS;   // 위치 xyz, 크기(m)
attribute vec3 aVel;  // 줄무늬: 머리에서 꼬리 반대 방향 벡터(m)
attribute vec4 aCA;   // 색 rgb(HDR), 불투명도
uniform float uScale; // 깊이 1 에서 1m 가 몇 픽셀인지
uniform vec2 uViewport;
uniform float uMaxPx;
uniform float uStreakMax;
uniform vec3 uNear; // 카메라 가까움 처리: x~y m 에서 z 까지 옅게
varying vec3 vColor;
varying float vAlpha;
varying vec2 vP;
varying float vL;
varying float vR;
void main() {
  vec4 mvH = modelViewMatrix * vec4(aPS.xyz, 1.0);
  float depth = -mvH.z;
  if (depth < 0.4 || aCA.a < 0.002) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec3 v = mat3(modelViewMatrix) * aVel;
  float vl = length(v);
  float sl = min(vl, uStreakMax);
  vec3 mvT = mvH.xyz - (vl > 1e-4 ? v / vl * sl : vec3(0.0));
  if (-mvT.z < 0.4) mvT = mvH.xyz;
  vec4 cH = projectionMatrix * mvH;
  vec4 cT = projectionMatrix * vec4(mvT, 1.0);
  vec2 hv = uViewport * 0.5;
  vec2 sH = cH.xy / cH.w * hv;
  vec2 sT = cT.xy / cT.w * hv;
  float px = aPS.w * uScale / depth;
  float a = aCA.a * mix(uNear.z, 1.0, smoothstep(uNear.x, uNear.y, depth)); // 카메라 8m 안 불씨는 0.15 까지 옅게(화면 점유율·광과민 보호)
  const float minPx = 1.8; // 이보다 작으면 크기 대신 밝기를 줄여(깜빡임·계단 없이) 보이게
  if (px < minPx) { a *= px * px / (minPx * minPx); px = minPx; }
  px = min(px, uMaxPx);
  float r = px * 0.5;
  vec2 d = sH - sT;
  float L0 = length(d);
  vec2 dir = L0 > 0.001 ? d / L0 : vec2(1.0, 0.0);
  float L = min(L0, uViewport.y * 0.12); // 화면에서 줄무늬 최대 길이
  sT = sH - dir * L;
  vec2 nrm = vec2(-dir.y, dir.x);
  r = max(0.9, r * mix(1.0, 0.55, clamp(L / (8.0 * r), 0.0, 1.0))); // 긴 줄무늬는 가늘게
  float along = position.x * 0.5 + 0.5;
  vec2 s = mix(sT, sH, along) + dir * position.x * r + nrm * position.y * r;
  a *= mix(1.0, (2.0 * r) / (2.0 * r + L), 0.55); // 길게 늘어난 만큼 조금 어둡게
  gl_Position = vec4(s / hv * cH.w, cH.z, cH.w);
  vP = vec2(along * L + position.x * r, position.y * r);
  vL = L;
  vR = r;
  vColor = aCA.rgb;
  vAlpha = a;
}
`,Ld=`
varying vec3 vColor;
varying float vAlpha;
varying vec2 vP;
varying float vL;
varying float vR;
void main() {
  float dx = max(0.0, max(-vP.x, vP.x - vL));
  float d = length(vec2(dx, vP.y)) / vR;
  if (d > 1.0) discard;
  float t = vL > 0.5 ? clamp(vP.x / vL, 0.0, 1.0) : 1.0;
  float core = exp(-d * d * 12.0);          // 작고 밝은 코어
  float halo = (1.0 - d) * (1.0 - d) * (1.0 - d) * 0.22; // 옅은 후광
  float tail = mix(0.3, 1.0, t * t);        // 머리 쪽이 밝다
  vec3 col = vColor * (core + halo) + vec3(0.2) * core * core * (vColor.r + vColor.g + vColor.b) * 0.33;
  gl_FragColor = vec4(col * tail, vAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,Rd=`
attribute vec4 aPS;
attribute vec3 aVel; // x: 무늬 회전 씨앗
attribute vec4 aCA;
uniform float uScale;
uniform vec2 uViewport;
uniform float uMaxPx;
uniform float uFlashGain;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
varying float vPick;
${Md}
void main() {
  vPick = step(0.5, fract(aVel.x * 7.31));
  vec4 mv = modelViewMatrix * vec4(aPS.xyz, 1.0);
  float depth = -mv.z;
  if (depth < 0.5 || aCA.a < 0.002) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec4 c = projectionMatrix * mv;
  vec2 hv = uViewport * 0.5;
  float px = min(aPS.w * uScale / depth, uMaxPx);
  float a = aCA.a;
  if (px < 2.0) { a *= px * 0.5; px = 2.0; }
  float ang = aVel.x * 6.2831;
  float cs = cos(ang), sn = sin(ang);
  vec2 q = vec2(cs * position.x - sn * position.y, sn * position.x + cs * position.y);
  vec2 s = c.xy / c.w * hv + position.xy * px * 0.5;
  gl_Position = vec4(s / hv * c.w, c.z, c.w);
  vUv = q * 0.5 + 0.5;
  vColor = aCA.rgb + flashVol(aPS.xyz) * uFlashGain; // 폭발 순간광을 받는다
  vAlpha = a;
}
`,zd=`
uniform sampler2D uNoise;
uniform sampler2D uSmoke0; // Kenney 연기 사진 2장(CC0). 없으면 코드 노이즈
uniform sampler2D uSmoke1;
uniform float uSmokeOn;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
varying float vPick;
void main() {
  float n;
  vec3 c = vColor;
  if (uSmokeOn > 0.5) {
    n = vPick < 0.5 ? texture2D(uSmoke0, vUv).r : texture2D(uSmoke1, vUv).r;
    n = smoothstep(0.02, 0.85, n);
    c *= 0.55 + 0.75 * n; // 짙은 곳이 더 밝게 빛을 받는 덩어리 느낌
  } else {
    n = texture2D(uNoise, vUv).r;
  }
  if (n < 0.01) discard;
  gl_FragColor = vec4(c, n * vAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function Bd(e=64){let t=new Uint8Array(e*e*4),n=[];for(let e=0;e<81;e++)n.push(Math.random());let r=(e,t,r)=>{let i=e*r%8,a=t*r%8,o=Math.floor(i),s=Math.floor(a),c=i-o,l=a-s,u=c*c*(3-2*c),d=l*l*(3-2*l),f=(e,t)=>n[t%8*9+e%8],p=f(o,s)*(1-u)+f(o+1,s)*u,m=f(o,s+1)*(1-u)+f(o+1,s+1)*u;return p*(1-d)+m*d};for(let n=0;n<e;n++)for(let i=0;i<e;i++){let a=i/e,o=n/e,s=.5*r(a*8,o*8,1)+.3*r(a*8,o*8,2)+.2*r(a*8,o*8,4),c=a-.5,l=o-.5,u=Math.sqrt(c*c+l*l)*2,d=Math.max(0,1-u),f=Math.max(0,Math.min(1,d*d*(.35+s*1.1))),p=(n*e+i)*4;t[p]=t[p+1]=t[p+2]=Math.round(f*255),t[p+3]=255}let i=new vi(t,e,e,D);return i.magFilter=l,i.minFilter=l,i.needsUpdate=!0,i}function Vd(e,t,n,r,i,a,o,s,c,l,u,d,f){return e.emit(t,n,r,i,a,o,s.life[0]+c()*(s.life[1]-s.life[0]),l*(.7+c()*.5),l*.35,u[0],u[1],u[2],d[0],d[1],d[2],f,1.8,s.grav[0]+c()*(s.grav[1]-s.grav[0]),2,.6)}var Hd=class{constructor(e,{kind:t=`spark`,lights:n=null}={}){this.max=e,this.kind=t,this.pos=new Float32Array(e*3),this.vel=new Float32Array(e*3),this.org=new Float32Array(e*4),this.c0=new Float32Array(e*3),this.c1=new Float32Array(e*3),this.a0=new Float32Array(e),this.s0=new Float32Array(e),this.s1=new Float32Array(e),this.age=new Float32Array(e),this.life=new Float32Array(e),this.drag=new Float32Array(e),this.grav=new Float32Array(e),this.stk=new Float32Array(e),this.tl=new Float32Array(e),this.flags=new Uint8Array(e),this.hold=new Float32Array(e),this.zid=new Int32Array(e).fill(-1),this.grp=new Uint8Array(e),this.gdim=new Float32Array(256).fill(1),this.rejects=0,this.clip=null,this.free=new Int32Array(e);for(let t=0;t<e;t++)this.free[t]=e-1-t;this.freeTop=e,this.list=new Int32Array(e),this.alive=0,this.emitMult=1,this.limit=e,this.queue=new Float32Array(24576),this.qn=0,this.gPS=new Float32Array(e*4),this.gVel=new Float32Array(e*3),this.gCA=new Float32Array(e*4);let r=new Fo;r.setAttribute(`position`,new _r(new Float32Array([-1,-1,0,1,-1,0,-1,1,0,1,1,0]),3)),r.setIndex([0,1,2,2,1,3]),this.psAttr=new Si(this.gPS,4).setUsage(We),this.velAttr=new Si(this.gVel,3).setUsage(We),this.caAttr=new Si(this.gCA,4).setUsage(We),r.setAttribute(`aPS`,this.psAttr),r.setAttribute(`aVel`,this.velAttr),r.setAttribute(`aCA`,this.caAttr),r.instanceCount=0,r.boundingSphere=new Cr(new G,1e6),this.geometry=r;let i=t===`spark`,a={uScale:{value:400},uViewport:{value:new W(1280,720)},uMaxPx:{value:i?id.maxSparkPx:id.maxSmokePx}};if(i){a.uStreakMax={value:id.tailMax};let e=zu.nearCamFade;a.uNear={value:new G(e[0],e[1],e[2])}}else{a.uNoise={value:Bd()},a.uSmoke0={value:a.uNoise.value},a.uSmoke1={value:a.uNoise.value},a.uSmokeOn={value:0},a.uFlashGain={value:.35};let e=n?n.uniforms:{uLPos:{value:[]},uLCol:{value:[]}};a.uLPos=e.uLPos,a.uLCol=e.uLCol}this.material=new wa({vertexShader:i?Id:Rd,fragmentShader:i?Ld:zd,uniforms:a,transparent:!0,depthWrite:!1,blending:i?2:1}),this.mesh=new ii(r,this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=i?5:4,this.points=this.mesh}useSmoke(e,t){let n=this.material.uniforms;n.uSmokeOn&&e&&t&&(n.uSmoke0.value=e,n.uSmoke1.value=t,n.uSmokeOn.value=1)}setScale(e,t,n){this.material.uniforms.uScale.value=e,t&&this.material.uniforms.uViewport.value.set(t,n)}emit(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v=0,y=1){if(this.freeTop===0||this.alive>=this.limit)return this.rejects++,-1;let b=this.free[--this.freeTop];this.list[this.alive++]=b;let x=b*3;this.pos[x]=e,this.pos[x+1]=t,this.pos[x+2]=n,this.vel[x]=r,this.vel[x+1]=i,this.vel[x+2]=a,this.c0[x]=l,this.c0[x+1]=u,this.c0[x+2]=d,this.c1[x]=f,this.c1[x+1]=p,this.c1[x+2]=m,this.a0[b]=h,this.s0[b]=s,this.s1[b]=c,this.age[b]=0,this.life[b]=o,this.drag[b]=g,this.grav[b]=_,this.flags[b]=v,this.stk[b]=y;let S=b*4;return this.org[S]=e,this.org[S+1]=t,this.org[S+2]=n,this.org[S+3]=0,this.tl[b]=0,this.zid[b]=-1,this.grp[b]=0,b}emitHold(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v=0){let y=this.emit(e,t,n,r,i,a,o,c,l,u,d,f,p,m,h,g,0,_,v|64,1);return y>=0&&(this.hold[y]=s),y}setTail(e,t){e<0||(this.tl[e]=t,this.flags[e]|=32)}setGroup(e,t){e>=0&&(this.grp[e]=t)}setZone(e,t){e>=0&&(this.zid[e]=t)}setScaleMax(e){this.material.uniforms.uMaxPx.value=e}setFade(e,t){e<0||(this.org[e*4+3]=t,this.flags[e]|=16)}_queue(e,t,n,r,i,a,o,s,c,l){if(this.qn>=2048)return;let u=this.queue,d=this.qn++*12;u[d]=e,u[d+1]=t,u[d+2]=n,u[d+3]=r,u[d+4]=i,u[d+5]=a,u[d+6]=o,u[d+7]=s,u[d+8]=c,u[d+9]=l}update(e){let{pos:t,vel:n,c0:r,c1:i,a0:a,s0:o,s1:s,age:c,life:l,drag:u,grav:d,flags:f,stk:p,org:m,tl:h,list:g,gPS:_,gVel:v,gCA:y}=this,b=id.streakTime,x=id.streakMax,S=this.kind===`smoke`,C=this.clip,w=this.zid,T=0,E=this.alive;for(let D=0;D<E;D++){let E=g[D];c[E]+=e;let O=c[E]/l[E],k=f[E],A=E*3;if(O>=1){k&8&&Math.random()<.35&&this._queue(t[A],t[A+1],t[A+2],.09,o[E]*2.2,3.2,2.9,2.2,1,1),this.free[this.freeTop++]=E;continue}if(k&128){this._shellStep(E,A,k,O,T),g[T++]=E;continue}if(k&64){this._holdStep(E,A,k,O,T),g[T++]=E;continue}let j=Math.exp(-u[E]*e);if(n[A]*=j,n[A+1]=n[A+1]*j-d[E]*e,n[A+2]*=j,t[A]+=n[A]*e,t[A+1]+=n[A+1]*e,t[A+2]+=n[A+2]*e,C&&w[E]>=0&&C(w[E],t[A],t[A+1],o[E]+(s[E]-o[E])*O)){this.free[this.freeTop++]=E;continue}g[T]=E;let M,N,P,F;if(S){let e=Math.min(1,c[E]/.6);M=r[A]+(i[A]-r[A])*e,N=r[A+1]+(i[A+1]-r[A+1])*e,P=r[A+2]+(i[A+2]-r[A+2])*e,F=a[E]*Math.min(1,c[E]*4)*(1-O)*(1-O)}else{if(O<.55)M=r[A],N=r[A+1],P=r[A+2];else{let e=(O-.55)/.45;M=r[A]+(i[A]-r[A])*e,N=r[A+1]+(i[A+1]-r[A+1])*e,P=r[A+2]+(i[A+2]-r[A+2])*e}if(k&4&&c[E]<Fd){let e=1-c[E]/Fd;M+=(2.4-M)*e,N+=(2.3-N)*e,P+=(2.1-P)*e}if(F=a[E]*this.gdim[this.grp[E]],O>.7&&(F*=1-(O-.7)/.3),k&2&&O>.6&&(F*=Math.random()<.5?1:.25),k&16){let e=E*4,n=t[A]-m[e],r=t[A+1]-m[e+1],i=t[A+2]-m[e+2],a=m[e+3],o=Math.sqrt(n*n+r*r+i*i);o>a&&(F*=1-.6*Math.min(1,(o-a)/(a*.33)))}k&1&&Math.random()<6*e*this.emitMult&&this._queue(t[A],t[A+1],t[A+2],.6,o[E]*.6,M*.7,N*.5,P*.3,F*.6,0)}let I=o[E]+(s[E]-o[E])*O,ee=T*4,te=T*3;if(_[ee]=t[A],_[ee+1]=t[A+1],_[ee+2]=t[A+2],_[ee+3]=I,S)v[te]=E*.618%1,v[te+1]=0,v[te+2]=0;else{let e=p[E]*b,r=n[A]*e,i=n[A+1]*e,a=n[A+2]*e,o=Math.sqrt(r*r+i*i+a*a),s=x*p[E];if(o>s){let e=s/o;r*=e,i*=e,a*=e,o=s}if(k&32){let e=E*4,n=t[A]-m[e],s=t[A+1]-m[e+1],c=t[A+2]-m[e+2],l=Math.sqrt(n*n+s*s+c*c),u=Math.min(l*.5,h[E])*(1-O)*(1-O);if(u>o&&l>.001){let e=u/l;r=n*e,i=s*e,a=c*e}}v[te]=r,v[te+1]=i,v[te+2]=a}y[ee]=M,y[ee+1]=N,y[ee+2]=P,y[ee+3]=F,T++}this.alive=T;let D=this.queue;for(let e=0;e<this.qn;e++){let t=e*12;D[t+9]===1?this.emit(D[t],D[t+1],D[t+2],0,0,0,D[t+3],D[t+4],D[t+4]*.5,D[t+5],D[t+6],D[t+7],D[t+5],D[t+6],D[t+7],D[t+8],0,0,0):this.emit(D[t],D[t+1],D[t+2],0,-.5,0,D[t+3],D[t+4],D[t+4]*.3,D[t+5],D[t+6],D[t+7],D[t+5]*.4,D[t+6]*.2,D[t+7]*.05,D[t+8],2,1.5,0)}this.qn=0,this._upload(T)}_shellStep(e,t,n,r,i){let{pos:a,vel:o,c0:s,c1:c,a0:l,s0:u,s1:d,age:f,drag:p,grav:m,org:h,tl:g,stk:_,gPS:v,gVel:y,gCA:b}=this,x=e*4,S=f[e],C=p[e],w=Math.exp(-C*S),T=1-w;a[t]=h[x]+o[t]*T,a[t+1]=h[x+1]+o[t+1]*T-.5*m[e]*S*S,a[t+2]=h[x+2]+o[t+2]*T;let E=s[t],D=s[t+1],O=s[t+2];if(n&4&&S<.05){let e=(1-S/.05)*.7;E+=(zu.hot[0]-E)*e,D+=(zu.hot[1]-D)*e,O+=(zu.hot[2]-O)*e}if(r>.55){let e=(r-.55)/.45;E+=(c[t]-E)*e,D+=(c[t+1]-D)*e,O+=(c[t+2]-O)*e}let k=l[e]*this.gdim[this.grp[e]];S<.1&&(k*=.05+S/.1*.95*(S/.1)),r>.72&&(k*=1-(r-.72)/.28),n&2&&r>.5&&(k*=.55+.45*Math.sin(S*31+e*1.7));let A=u[e]+(d[e]-u[e])*r,j=i*4,M=i*3;v[j]=a[t],v[j+1]=a[t+1],v[j+2]=a[t+2],v[j+3]=A;let N=id.streakTime*_[e],P=o[t]*C*w*N,F=(o[t+1]*C*w-m[e]*S)*N,I=o[t+2]*C*w*N;if(n&32){let n=a[t]-h[x],i=a[t+1]-h[x+1],o=a[t+2]-h[x+2],s=Math.sqrt(n*n+i*i+o*o),c=Math.min(s*.7,g[e])*(1-r*.6);if(c>Math.sqrt(P*P+F*F+I*I)&&s>.001){let e=c/s;P=n*e,F=i*e,I=o*e}}y[M]=P,y[M+1]=F,y[M+2]=I,b[j]=E,b[j+1]=D,b[j+2]=O,b[j+3]=k}shellVel(e,t){let n=e*3,r=this.drag[e],i=Math.exp(-r*this.age[e]);return t[0]=this.vel[n]*r*i,t[1]=this.vel[n+1]*r*i-this.grav[e]*this.age[e],t[2]=this.vel[n+2]*r*i,t}part(e,t,n,r,i=3){let a=e*3,o=e*4;this.flags[e]=this.flags[e]&-161|2,this.vel[a]=t,this.vel[a+1]=n,this.vel[a+2]=r,this.org[o]=this.pos[a],this.org[o+1]=this.pos[a+1],this.org[o+2]=this.pos[a+2],this.drag[e]=2.2,this.grav[e]=1.5,this.stk[e]=i,this.life[e]=this.age[e]+.45}_holdStep(e,t,n,r,i){let{pos:a,vel:o,c0:s,c1:c,a0:l,s0:u,s1:d,age:f,life:p,grav:m,org:h,hold:g,gPS:_,gVel:v,gCA:y}=this,b=e*4,x=f[e],S=Math.exp(-Pd*x),C=1-S;a[t]=h[b]+o[t]*C,a[t+1]=h[b+1]+o[t+1]*C,a[t+2]=h[b+2]+o[t+2]*C;let w=g[e],T=s[t],E=s[t+1],D=s[t+2],O=l[e],k=u[e];if(x<.1){let e=1-x/.1;T+=(zu.hot[0]-T)*e,E+=(zu.hot[1]-E)*e,D+=(zu.hot[2]-D)*e}if(x>w){let n=Math.min(1,(x-w)/Math.max(.05,p[e]-w)),r=x-w;a[t+1]-=.5*m[e]*r*r,T+=(c[t]-T)*n,E+=(c[t+1]-E)*n,D+=(c[t+2]-D)*n,O*=(1-n)*(1-n),k=u[e]+(d[e]-u[e])*n}else n&2&&(O*=.55+.45*Math.sin(x*23+e*1.7));let A=i*4,j=i*3;_[A]=a[t],_[A+1]=a[t+1],_[A+2]=a[t+2],_[A+3]=k;let M=Pd*S*id.streakTime*1.6;v[j]=o[t]*M,v[j+1]=o[t+1]*M,v[j+2]=o[t+2]*M,y[A]=T,y[A+1]=E,y[A+2]=D,y[A+3]=O}_upload(e){this.geometry.instanceCount=e;for(let[t,n]of[[this.psAttr,4],[this.velAttr,3],[this.caAttr,4]])t.clearUpdateRanges(),e>0&&t.addUpdateRange(0,e*n),t.needsUpdate=!0}clear(){for(let e=0;e<this.alive;e++)this.free[this.freeTop++]=this.list[e];this.alive=0,this.qn=0,this._upload(0)}};function Ud(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new jr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Wd(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Wd(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Wd(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new _r(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Gd(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r!==void 0){for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));return i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`),e.setIndex(i),e.clearGroups(),e}return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}function Kd(e){let t=new Map,n=new Map,r=e.clone();return qd(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function qd(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)qd(e.children[r],t.children[r],n)}var Jd=class extends ao{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new tf(e)}),this.register(function(e){return new nf(e)}),this.register(function(e){return new ff(e)}),this.register(function(e){return new pf(e)}),this.register(function(e){return new mf(e)}),this.register(function(e){return new af(e)}),this.register(function(e){return new of(e)}),this.register(function(e){return new sf(e)}),this.register(function(e){return new cf(e)}),this.register(function(e){return new ef(e)}),this.register(function(e){return new lf(e)}),this.register(function(e){return new rf(e)}),this.register(function(e){return new df(e)}),this.register(function(e){return new uf(e)}),this.register(function(e){return new Qd(e)}),this.register(function(e){return new hf(e,Zd.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new hf(e,Zd.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new gf(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=Po.extractUrlBase(e);a=Po.resolveURL(t,this.path)}else a=Po.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new co(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===_f){try{a[Zd.KHR_BINARY_GLTF]=new bf(e)}catch(e){r&&r(e);return}i=JSON.parse(a[Zd.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new Kf(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case Zd.KHR_MATERIALS_UNLIT:a[t]=new $d;break;case Zd.KHR_DRACO_MESH_COMPRESSION:a[t]=new xf(i,this.dracoLoader);break;case Zd.KHR_TEXTURE_TRANSFORM:a[t]=new Sf;break;case Zd.KHR_MESH_QUANTIZATION:a[t]=new Cf;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function Yd(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function Xd(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var Zd={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},Qd=class{constructor(e){this.parser=e,this.name=Zd.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new K(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],ze);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new No(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new Ao(s),o.distance=c;break;case`spot`:o=new Oo(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),Rf(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},$d=class{constructor(){this.name=Zd.KHR_MATERIALS_UNLIT}getMaterialType(){return Kr}extendParams(e,t,n){let r=[];e.color=new K(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],ze),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,Re))}return Promise.all(r)}},ef=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},tf=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new W(e,e)}return Promise.all(r)}},nf=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},rf=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},af=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_SHEEN}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new K(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],ze)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,Re)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},of=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},sf=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_VOLUME}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new K().setRGB(i[0],i[1],i[2],ze),Promise.all(r)}},cf=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_IOR}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);return n===null?Promise.resolve():(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3),Promise.resolve())}},lf=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new K().setRGB(i[0],i[1],i[2],ze),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,Re)),Promise.all(r)}},uf=class{constructor(e){this.parser=e,this.name=Zd.EXT_MATERIALS_BUMP}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},df=class{constructor(e){this.parser=e,this.name=Zd.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Xd(this.parser,e,this.name)===null?null:Da}extendMaterialParams(e,t){let n=Xd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},ff=class{constructor(e){this.parser=e,this.name=Zd.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},pf=class{constructor(e){this.parser=e,this.name=Zd.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},mf=class{constructor(e){this.parser=e,this.name=Zd.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},hf=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},gf=class{constructor(e){this.name=Zd.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==Df.TRIANGLES&&e.mode!==Df.TRIANGLE_STRIP&&e.mode!==Df.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new en,n=new G,a=new At,s=new G(1,1,1),c=new Ai(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));let l=null;for(let e in o)if(e===`_COLOR_0`){let t=o[e];c.instanceColor=new Si(t.array,t.itemSize,t.normalized)}else if(e!==`TRANSLATION`&&e!==`ROTATION`&&e!==`SCALE`){if(l===null){let e=c.geometry;l=new jr,l.name=e.name;for(let t in e.attributes)l.setAttribute(t,e.attributes[t]);for(let t in e.morphAttributes)l.morphAttributes[t]=e.morphAttributes[t];e.index!==null&&l.setIndex(e.index),l.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)l.addGroup(t.start,t.count,t.materialIndex);e.boundingBox!==null&&(l.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(l.boundingSphere=e.boundingSphere.clone()),l.drawRange.start=e.drawRange.start,l.drawRange.count=e.drawRange.count,l.userData=Object.assign({},e.userData),c.geometry=l}let t=o[e];l.setAttribute(e,new Si(t.array,t.itemSize,t.normalized))}On.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},_f=`glTF`,vf=12,yf={JSON:1313821514,BIN:5130562},bf=class{constructor(e){this.name=Zd.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,vf),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==_f)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-vf,i=new DataView(e,vf),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===yf.JSON){let r=new Uint8Array(e,vf+a,t);this.content=n.decode(r)}else if(r===yf.BIN){let n=vf+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},xf=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=Zd.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=Mf[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=Mf[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=Of[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,ze,n)})})}},Sf=class{constructor(){this.name=Zd.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let t=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*t,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*t,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Cf=class{constructor(){this.name=Zd.KHR_MESH_QUANTIZATION}},wf=class extends Ia{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},Tf=new At,Ef=class extends wf{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return Tf.fromArray(i).normalize().toArray(i),i}},Df={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Of={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},kf={9728:o,9729:l,9984:s,9985:u,9986:c,9987:d},Af={33071:i,33648:a,10497:r},jf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Mf={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},Nf={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},Pf={CUBICSPLINE:void 0,LINEAR:Me,STEP:je},Ff={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function If(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new Ea({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function Lf(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function Rf(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function zf(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function Bf(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function Vf(e){let t,n=e.extensions&&e.extensions[Zd.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+Hf(n.attributes):e.indices+`:`+Hf(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+Hf(e.targets[n]);return t}function Hf(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function Uf(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function Wf(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var Gf=new en,Kf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Yd,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}this.textureLoader=typeof createImageBitmap>`u`||n&&r<17||i&&a<98?new fo(this.options.manager):new Lo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new co(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return Lf(i,a,r),Rf(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Zd.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(Po.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=jf[r.type],t=Of[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new _r(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=jf[r.type],o=Of[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new Mr(f,u/s),t.cache.add(n,c)),p=new Pr(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new _r(f,a,d);if(r.sparse!==void 0){let t=jf.SCALAR,n=Of[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new _r(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=kf[n.magFilter]||1006,t.minFilter=kf[n.minFilter]||1008,t.wrapS=Af[n.wrapS]||1e3,t.wrapT=Af[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new Jt(e);t.needsUpdate=!0,n(t)}),t.load(Po.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),Rf(e,a),e.userData.mimeType=a.mimeType||Wf(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[Zd.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[Zd.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[Zd.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Yi,Br.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Fi,Br.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return Ea}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,o={},s=i.extensions||{},c=[];if(s[Zd.KHR_MATERIALS_UNLIT]){let e=r[Zd.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),c.push(e.extendParams(o,i,t))}else{let n=i.pbrMetallicRoughness||{};if(o.color=new K(1,1,1),o.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;o.color.setRGB(e[0],e[1],e[2],ze),o.opacity=e[3]}n.baseColorTexture!==void 0&&c.push(t.assignTexture(o,`map`,n.baseColorTexture,Re)),o.metalness=n.metallicFactor===void 0?1:n.metallicFactor,o.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,`metalnessMap`,n.metallicRoughnessTexture)),c.push(t.assignTexture(o,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=2);let l=i.alphaMode||Ff.OPAQUE;if(l===Ff.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===Ff.MASK&&(o.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==Kr&&(c.push(t.assignTexture(o,`normalMap`,i.normalTexture)),o.normalScale=new W(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;o.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==Kr&&(c.push(t.assignTexture(o,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==Kr){let e=i.emissiveFactor;o.emissive=new K().setRGB(e[0],e[1],e[2],ze)}return i.emissiveTexture!==void 0&&a!==Kr&&c.push(t.assignTexture(o,`emissiveMap`,i.emissiveTexture,Re)),Promise.all(c).then(function(){let n=new a(o);return i.name&&(n.name=i.name),Rf(n,i),t.associations.set(n,{materials:e}),i.extensions&&Lf(r,n,i),n})}createUniqueName(e){let t=ts.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[Zd.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return Jf(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=Vf(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[Zd.KHR_DRACO_MESH_COMPRESSION]?i(o):Jf(new jr,o,t),o.mode===Df.TRIANGLE_STRIP?e=e.then(e=>Gd(e,1)):o.mode===Df.TRIANGLE_FAN&&(e=e.then(e=>Gd(e,2))),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?If(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(n){let o=n.slice(0,n.length-1),s=n[n.length-1],c=[];for(let n=0,l=s.length;n<l;n++){let l=s[n],u=a[n],d,f=o[n];if(u.mode===Df.TRIANGLES||u.mode===Df.TRIANGLE_STRIP||u.mode===Df.TRIANGLE_FAN||u.mode===void 0){let e=i.isSkinnedMesh===!0,t=l.hasAttribute(`skinIndex`)&&l.hasAttribute(`skinWeight`);e&&t===!1&&console.warn(`THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.`),d=e&&t?new gi(l,f):new ii(l,f),d.isSkinnedMesh===!0&&d.normalizeSkinWeights()}else if(u.mode===Df.LINES)d=new qi(l,f);else if(u.mode===Df.LINE_STRIP)d=new Ui(l,f);else if(u.mode===Df.LINE_LOOP)d=new Ji(l,f);else if(u.mode===Df.POINTS)d=new ea(l,f);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+u.mode);Object.keys(d.geometry.morphAttributes).length>0&&Bf(d,i),d.name=t.createUniqueName(i.name||`mesh_`+e),Rf(d,i),u.extensions&&Lf(r,d,u),t.assignFinalMaterial(d),c.push(d)}for(let n=0,r=c.length;n<r;n++)t.associations.set(c[n],{meshes:e,primitives:n});if(c.length===1)return i.extensions&&Lf(r,c[0],i),c[0];let l=new kn;i.extensions&&Lf(r,l,i),t.associations.set(l,{meshes:e});for(let e=0,t=c.length;e<t;e++)l.add(c[e]);return l})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn(`THREE.GLTFLoader: Missing camera parameters.`);return}return n.type===`perspective`?t=new Eo(kt.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new jo(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Rf(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new en;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new xi(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new $a(i,void 0,l);return Rf(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,Gf)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new G().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new _i:t.length>1?new kn:t.length===1?t[0]:new On,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),Rf(o,i),i.extensions&&Lf(n,o,i),i.matrix!==void 0){let e=new en;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new kn;n.name&&(i.name=r.createUniqueName(n.name)),Rf(i,n),n.extensions&&Lf(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(Kd(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof Br||e instanceof Jt)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}Nf[i.path]===Nf.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(Nf[i.path]){case Nf.weights:l=Ja;break;case Nf.rotation:l=Xa;break;case Nf.translation:case Nf.scale:l=Qa;break;default:switch(n.itemSize){case 1:l=Ja;break;default:l=Qa}}let u=r.interpolation===void 0?Me:Pf[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+Nf[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=Uf(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof Xa?Ef:wf)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function qf(e,t,n){let r=t.attributes,i=new $n;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new G(t[0],t[1],t[2]),new G(a[0],a[1],a[2])),e.normalized){let t=Uf(Of[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new G,t=new G;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=Uf(Of[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new Cr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function Jf(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=Mf[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return Rt.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Rt.workingColorSpace}" not supported.`),Rf(e,t),qf(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:zf(e,t.targets,n)})}var Yf=`./`,Xf=e=>`${Yf}assets/${e}`,Zf=[{id:`Facade011`,tile:110,cells:[24,39],dark:1},{id:`Facade013`,tile:100,cells:[32,32],dark:.16},{id:`Facade017`,tile:42,cells:[12,12],dark:.14}],Qf={family:`BvfSign`,file:`BvfSign.woff2`},$f={asph:`Asphalt031_Color.jpg`,asphR:`Asphalt031_Roughness.jpg`,pave:`PavingStones128_Color.jpg`},ep={facades:[],ground:{},smoke:[],font:!1,rooms:null,sky:[],birds:{},failed:[],done:!1},tp=null;function np(e,t){if(tp)return tp;let n=new fo,i=[],a=0,o=0,s=()=>{a++,t&&t(a/o,ep.failed)},c=(e,t=!0,i={})=>(o++,new Promise(a=>{n.load(Xf(e),e=>{e.colorSpace=t?Re:``,e.anisotropy=i.aniso||1,i.wrap&&(e.wrapS=e.wrapT=r),s(),a(e)},void 0,()=>{ep.failed.push(e),s(),a(null)})})),l=e?e.capabilities.getMaxAnisotropy():1;Zf.forEach((e,t)=>{i.push(Promise.all([c(`${e.id}_Color.jpg`,!0,{wrap:!0,aniso:Math.min(8,l)}),c(`${e.id}_Emission.jpg`,!0,{wrap:!0,aniso:Math.min(8,l)})]).then(([n,r])=>{ep.facades[t]=n&&r?{color:n,emis:r,...e}:null}))}),i.push(c($f.asph,!0,{wrap:!0,aniso:Math.min(8,l)}).then(e=>{ep.ground.asph=e})),i.push(c($f.asphR,!1,{wrap:!0,aniso:Math.min(8,l)}).then(e=>{ep.ground.asphR=e})),i.push(c($f.pave,!0,{wrap:!0,aniso:Math.min(8,l)}).then(e=>{ep.ground.pave=e})),i.push(c(`smoke_01.jpg`,!1).then(e=>{ep.smoke[0]=e})),i.push(c(`smoke_07.jpg`,!1).then(e=>{ep.smoke[1]=e})),i.push(c(`rooms/rooms_atlas.jpg`,!0).then(e=>{ep.rooms=e})),i.push(c(`sky/skyline_a.png`,!0).then(e=>{ep.sky[0]=e})),i.push(c(`sky/skyline_b.png`,!0).then(e=>{ep.sky[1]=e}));let u=new Jd;for(let e of[`sparrow`,`magpie`,`pigeon`])o++,i.push(u.loadAsync(Xf(`birds/${e}.glb`)).then(t=>{let n=null;t.scene.traverse(e=>{e.isMesh&&!n&&(n=e)}),n&&(ep.birds[e]={geometry:n.geometry,map:n.material.map,userData:n.userData||{}}),s()}).catch(()=>{ep.failed.push(`birds/${e}.glb`),s()}));return typeof document<`u`&&typeof FontFace<`u`&&(o++,i.push((async()=>{try{let e=new FontFace(Qf.family,`url(${Xf(Qf.file)}) format('woff2')`);await e.load(),document.fonts.add(e),await document.fonts.load(`64px ${Qf.family}`,`치킨`),ep.font=document.fonts.check(`64px ${Qf.family}`,`치킨`)}catch{ep.font=!1}ep.font||ep.failed.push(Qf.file),s()})())),tp=Promise.all(i).then(()=>(ep.done=!0,ep)),tp}var rp=Math.PI/180,ip=class e{constructor(t,n={x:0,z:0,th:0},r=0,i=1){this.sMin=r,this.ds=i;let a=[],o=r,s=n.x,c=n.z,l=n.th;for(let[n,r]of t){let t={a:o,b:o+n,turn:r*rp,x:s,z:c,th:l},i=e._end(t,n);a.push(t),s=i.x,c=i.z,l=i.th,o+=n}this.segs=a,this.sMax=o;let u=Math.ceil((this.sMax-this.sMin)/i)+1;this.n=u,this.X=new Float64Array(u),this.Z=new Float64Array(u),this.TH=new Float64Array(u),this.K=new Float64Array(u);let d=0;for(let t=0;t<u;t++){let n=this.sMin+t*i;for(;d<a.length-1&&n>a[d].b;)d++;let r=a[d],o=e._end(r,n-r.a);this.X[t]=o.x,this.Z[t]=o.z,this.TH[t]=o.th,this.K[t]=r.turn/(r.b-r.a)}}static _end(e,t){let n=e.b-e.a;if(Math.abs(e.turn)<1e-9)return{x:e.x+Math.sin(e.th)*t,z:e.z-Math.cos(e.th)*t,th:e.th};let r=e.turn/n,i=e.th+r*t;return{x:e.x+(Math.cos(e.th)-Math.cos(i))/r,z:e.z+(Math.sin(e.th)-Math.sin(i))/r,th:i}}at(e,t={}){let n=(e-this.sMin)/this.ds;if(n<=0||n>=this.n-1){let r=n<=0?0:this.n-1,i=e-(this.sMin+r*this.ds),a=this.TH[r];return t.x=this.X[r]+Math.sin(a)*i,t.z=this.Z[r]-Math.cos(a)*i,t.th=a,t.k=0,t}let r=Math.floor(n),i=n-r;return t.x=this.X[r]+(this.X[r+1]-this.X[r])*i,t.z=this.Z[r]+(this.Z[r+1]-this.Z[r])*i,t.th=this.TH[r]+(this.TH[r+1]-this.TH[r])*i,t.k=this.K[r],t}xz(e,t,n={}){let r=this.at(e,this._t||={});return n.x=r.x+Math.cos(r.th)*t,n.z=r.z+Math.sin(r.th)*t,n}nearest(e,t,n=null){let r=0,i=1/0;if(n!==null&&Number.isFinite(n)){let a=Math.round((n-this.sMin)/this.ds);for(let n=Math.max(0,a-300);n<=Math.min(this.n-1,a+300);n+=2){let a=(this.X[n]-e)**2+(this.Z[n]-t)**2;a<i&&(i=a,r=n)}}else for(let n=0;n<this.n;n+=6){let a=(this.X[n]-e)**2+(this.Z[n]-t)**2;a<i&&(i=a,r=n)}for(let n=Math.max(0,r-8);n<=Math.min(this.n-1,r+8);n++){let a=(this.X[n]-e)**2+(this.Z[n]-t)**2;a<i&&(i=a,r=n)}let a=this.TH[r],o=e-this.X[r],s=t-this.Z[r],c=Math.sin(a)*o-Math.cos(a)*s,l=Math.cos(a)*o+Math.sin(a)*s;return{s:this.sMin+r*this.ds+c,u:l,d:Math.hypot(c,l)}}},ap=class e extends ip{constructor(t,n,r=0){super(Vu.plan,{x:0,z:Vu.pre,th:0},-Vu.pre,1),this.stage=t,this.f=n,this.s0=r,this.length=Vu.length,this.E=Vu.ellipse;let i=Vu.height;this.H=new Float64Array(this.n),this.SL=new Float64Array(this.n);for(let t=0;t<this.n;t++)this.H[t]=e._h(i,this.sMin+t*this.ds);for(let t=0;t<this.n;t++){let n=this.sMin+t*this.ds;this.SL[t]=(e._h(i,n+.25)-e._h(i,n-.25))/.5}this.colliders=[],this.structRanges=[],this.bridges=Vu.bridges.map(e=>({...e}))}static _h(e,t){if(t<=e[0][0])return e[0][1];for(let n=0;n<e.length-1;n++){let[r,i]=e[n],[a,o]=e[n+1];if(t<=a){let e=(t-r)/(a-r);return i+(o-i)*(1-Math.cos(Math.PI*e))/2}}return e[e.length-1][1]}center(e){let t=(e-this.sMin)/this.ds;if(t<=0)return this.H[0];if(t>=this.n-1)return this.H[this.n-1];let n=Math.floor(t);return this.H[n]+(this.H[n+1]-this.H[n])*(t-n)}slope(e){let t=(e-this.sMin)/this.ds;if(t<=0)return this.SL[0];if(t>=this.n-1)return this.SL[this.n-1];let n=Math.floor(t);return this.SL[n]+(this.SL[n+1]-this.SL[n])*(t-n)}toWorld(e,t,n,r){let i=this.at(e,this._tmp||={});return r.x=i.x+Math.cos(i.th)*t,r.y=n,r.z=i.z+Math.sin(i.th)*t,r}sAt(e){return this.s0+e*this.f}yawRate(e,t=this.f){return Math.abs(this.at(e,this._yr||={}).k)*t/rp}zoneAt(e){for(let t of Vu.zones)if(e>=t.s[0]&&e<t.s[1])return t;return e<0?Vu.zones[0]:Vu.zones[Vu.zones.length-1]}isOpen(){return!0}section(e,t={}){let n=this.center(e);return t.u=this.E.u,t.v0=n-this.E.v,t.v1=n+this.E.v,t.c=n,t}banks(e,t={}){return t.l=0,t.r=0,t}};function op(e,t,n,r){let i=Math.max(e.s0-t,0,t-e.s1),a=Math.max(e.u0-n,0,n-e.u1),o=Math.max(e.v0-r,0,r-e.v1);return Math.sqrt(i*i+a*a+o*o)}function sp(e,t,n,r,i=0){return t>e.s0-i&&t<e.s1+i&&n>e.u0-i&&n<e.u1+i&&r>e.v0-i&&r<e.v1+i}function cp(e,t,n,r=0){let i=0,a=1,o=[e.s0-r,e.u0-r,e.v0-r],s=[e.s1+r,e.u1+r,e.v1+r];for(let e=0;e<3;e++){let r=n[e]-t[e];if(Math.abs(r)<1e-9){if(t[e]<o[e]||t[e]>s[e])return!1}else{let n=(o[e]-t[e])/r,c=(s[e]-t[e])/r;if(n>c&&([n,c]=[c,n]),i=Math.max(i,n),a=Math.min(a,c),i>a)return!1}}return!0}var lp=()=>Vu.length+150,up=ad.count,Q=(e,t)=>e+Math.random()*(t-e),dp=e=>e[Math.floor(Math.random()*e.length)],fp=`
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
// 5차 B0: 배경 색 보정 — 채도 −20%, 대비 −15%(기준 0.08 둘레로 눌러 줌). 불꽃·위협은 이 보정을 거치지 않는다
vec3 bgGrade(vec3 c) {
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(l), c, 0.8);
  return 0.08 * pow(max(c, vec3(0.0)) / 0.08, vec3(0.85));
}
`,pp=`
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform vec3 uCityGlow;
varying float vFogDepth;
vec3 applyFogK(vec3 c, vec3 wp, float k) {
  float hf = exp(-max(wp.y, 0.0) * 0.018);
  float dens = uFogDensity * (0.55 + 0.9 * hf) * k;
  float f = clamp(1.0 - exp(-dens * dens * vFogDepth * vFogDepth), 0.0, 1.0);
  if (f < 0.002) return c;
  vec3 fc = mix(uFogColor, uCityGlow, hf * 0.75); // 11차 배5: 낮은 층 도시광 색 비율 0.65 → 0.75
  if (f > 0.03) fc += flashVol(wp) * 0.05;
  return mix(c, fc, f);
}
vec3 applyFog(vec3 c, vec3 wp) { return applyFogK(c, wp, 1.0); }
`,mp=`
uniform vec3 uAmbient;
vec3 ambientAt(vec3 wp, vec3 n) {
  float sky = 0.5 + 0.5 * n.y;
  float moon = max(dot(n, normalize(vec3(-0.38, 0.42, -0.82))), 0.0);
  return uAmbient * (0.6 * sky + 0.5) + vec3(0.06, 0.07, 0.11) * moon + uCityGlow * 0.22 * exp(-max(wp.y, 0.0) * 0.025) * (0.6 - 0.4 * n.y);
}
// 불꽃 빛이 유리·젖은 면에 비친 반짝임
vec3 flashSpec(vec3 wp, vec3 n, float pw) {
  vec3 V = normalize(wp - cameraPosition);
  vec3 R = reflect(V, n);
  vec3 s = vec3(0.0);
  for (int i = 0; i < ${up}; i++) {
    vec3 c = uLCol[i].rgb;
    if (c.r + c.g + c.b < 0.002) continue;
    vec3 L = uLPos[i].xyz - wp;
    float d = max(length(L), 0.001);
    float x = clamp(dot(R, L / d), 0.0, 1.0);
    s += c * (x > 1e-4 ? exp2(pw * log2(x)) : 0.0) * min(1.0, 160.0 / d); // pow(0, n) 이 일부 그래픽 드라이버에서 NaN 이 되는 것을 피한다
  }
  return s;
}
`;function hp(e){let t=e.uBlank.value;return new wa({uniforms:{...e,uFacadeOn:{value:0},uFC0:{value:t},uFE0:{value:t},uFC1:{value:t},uFE1:{value:t},uFC2:{value:t},uFE2:{value:t},uFTile:{value:new G(...Zf.map(e=>e.tile))},uFDark:{value:new G(...Zf.map(e=>e.dark))},uFCells2:{value:new W(...Zf[2].cells)},uFCells1:{value:new W(...Zf[1].cells)},uRoom:{value:t},uRoomOn:{value:0}},vertexShader:`
      attribute vec4 aInfo;
      varying vec3 vWP;
      varying vec3 vN;
      varying vec3 vNL;
      varying vec3 vLocal;
      varying vec3 vScale;
      varying vec4 vInfo;
      varying float vFogDepth;
      void main() {
        mat4 m = modelMatrix * instanceMatrix;
        vec4 wp = m * vec4(position, 1.0);
        vWP = wp.xyz;
        vN = normalize(mat3(m) * normal);
        vNL = normal;
        vLocal = position;
        vScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
        vInfo = aInfo;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uFacadeOn;
      uniform sampler2D uFC0; uniform sampler2D uFE0;
      uniform sampler2D uFC1; uniform sampler2D uFE1;
      uniform sampler2D uFC2; uniform sampler2D uFE2;
      uniform vec3 uFTile; uniform vec3 uFDark; uniform vec2 uFCells2; uniform vec2 uFCells1;
      uniform sampler2D uRoom; uniform float uRoomOn;
      uniform float uTime;
      varying vec3 vWP; varying vec3 vN; varying vec3 vNL; varying vec3 vLocal; varying vec3 vScale; varying vec4 vInfo;
      ${fp}
      ${Md}
      ${pp}
      ${mp}
      // 창 칸 격자: cell 좌표, 창 사각형(lo~hi), 점등률 → (창 색, 창 마스크)
      vec4 windows(vec2 cell, vec2 lo, vec2 hi, float seed, float lit, float gain) {
        vec2 fw = fwidth(cell);
        vec2 id = floor(cell);
        vec2 f = fract(cell);
        vec2 mk = smoothstep(lo - fw, lo + fw, f) * (1.0 - smoothstep(hi - fw, hi + fw, f));
        vec2 hid = vec2(floor(id.x / 2.0), id.y); // 11차 배3: 가로 2칸 = 한 집(함께 켜고 끔)
        float h = hash(hid + seed * 13.1);
        float k2 = hash(hid + vec2(seed, 7.0));
        // 11차 배3: 색온도는 건물(단지) 단위로 치우침 — 따뜻한 2700K 단지 / 백색 LED 4000K 단지, 집마다 20% 는 다른 색
        float bt = hash(vec2(seed, 21.7));
        vec3 warm = vec3(1.0, 0.6, 0.3), led = vec3(0.92, 0.9, 0.86);
        vec3 wc = k2 < 0.8 ? (bt < 0.5 ? warm : led) : (bt < 0.5 ? led : warm);
        if (k2 > 0.97) wc = vec3(0.76, 0.86, 1.0);
        wc *= (0.35 + 0.55 * hash(id + vec2(3.0, 9.0))) * gain;
        float k3 = hash(id + vec2(11.0, seed));
        vec2 wf = (f - lo) / max(hi - lo, vec2(1e-3));
        if (k3 < 0.2) wc *= 0.5 + 0.5 * step(0.45, fract(wf.y * 7.0)); // 블라인드(가로 살)
        else if (k3 < 0.42) wc *= mix(0.35, 1.0, 1.0 - smoothstep(0.1, 0.3, abs(wf.x - 0.5))); // 커튼(양옆 어둡게)
        else if (k3 > 0.99) wc = vec3(0.45, 0.6, 1.0) * gain * (0.45 + 0.35 * sin(uTime * 6.0 + id.x * 3.1) * sin(uTime * 2.3 + id.y)); // TV
        // 아래쪽이 조금 더 밝은 실내 빛(천장등이 아래 벽을 비춤)
        wc *= 0.8 + 0.35 * (1.0 - wf.y);
        vec3 on = h < lit ? wc : vec3(0.012, 0.014, 0.02);
        // 멀어서 창이 한 픽셀보다 작으면 평균 밝기로 녹인다(무아레 방지)
        float far = smoothstep(0.3, 0.85, max(fw.x, fw.y));
        vec3 avg = vec3(0.85, 0.62, 0.4) * gain * 0.55 * lit * (hi.x - lo.x) * (hi.y - lo.y);
        return vec4(mix(on * mk.x * mk.y, avg, far), mix(mk.x * mk.y, (hi.x - lo.x) * (hi.y - lo.y), far));
      }
      // 5차 interior mapping(가짜 실내): 창 칸 하나를 폭 3.3 × 높이 2.8 × 깊이 4m 방으로 보고, 시선이 방 안 벽·바닥·천장에 닿는 곳을 그린다.
      // 방마다(칸 해시) 벽 색·가구 실루엣·천장등이 다르다. 파일 없이 셰이더로만.
      vec3 interior(vec2 f, vec2 id, float seed, vec3 N, vec3 lightCol) {
        vec3 V = normalize(vWP - cameraPosition);
        vec3 up = vec3(0.0, 1.0, 0.0);
        vec3 T = normalize(cross(N, up));
        vec3 d = vec3(dot(V, T) / 3.3, dot(V, up) / 2.8, max(dot(V, -N), 0.05) / 4.0);
        vec3 o = vec3(f, 0.0);
        float tx = d.x > 0.0 ? (1.0 - o.x) / d.x : -o.x / min(d.x, -1e-4);
        float ty = d.y > 0.0 ? (1.0 - o.y) / d.y : -o.y / min(d.y, -1e-4);
        float tz = 1.0 / d.z;
        float t = min(min(tx, ty), tz);
        vec3 p = o + d * t;
        float r = hash(id + vec2(seed * 3.7, 5.1));
        vec3 wall = r < 0.3 ? vec3(0.78, 0.7, 0.58) : (r < 0.55 ? vec3(0.62, 0.68, 0.6) : (r < 0.8 ? vec3(0.7, 0.7, 0.72) : vec3(0.56, 0.6, 0.72)));
        vec3 c;
        if (t == tz) {
          c = wall * 0.8;
          // 가구 실루엣(소파·책장·액자)
          float r2 = hash(id + vec2(9.3, seed));
          if (r2 < 0.5 && p.y < 0.32 && p.x > 0.18 && p.x < 0.78) c *= 0.25;
          else if (r2 > 0.7 && p.x > 0.72 && p.y < 0.75) c *= 0.3;
          if (r2 > 0.35 && r2 < 0.6 && p.y > 0.5 && p.y < 0.68 && p.x > 0.35 && p.x < 0.6) c = mix(c, vec3(0.3, 0.35, 0.45), 0.7);
        } else if (t == ty) {
          c = d.y < 0.0 ? vec3(0.32, 0.22, 0.14) : wall * 1.15;
          if (d.y > 0.0) c += lightCol * 0.9 * exp(-dot(p.xz - vec2(0.5, 0.45), p.xz - vec2(0.5, 0.45)) * 18.0); // 천장등
        } else {
          c = wall * 0.62;
        }
        // 안쪽일수록 어둡게(창가가 밝다)
        c *= mix(1.0, 0.5, p.z);
        return c * lightCol * 0.62;
      }
      void main() {
        float seed = floor(vInfo.x + 0.5);
        float kind = floor(vInfo.y + 0.5);
        float lit = vInfo.z;
        float gain = vInfo.w;
        bool side = abs(vNL.y) < 0.5;
        float topM = (1.0 - vLocal.y) * vScale.y;
        float hx = abs(vNL.x) > 0.5 ? vLocal.z * vScale.z * sign(vNL.x) : -vLocal.x * vScale.x * sign(vNL.z);
        float faceW = abs(vNL.x) > 0.5 ? vScale.z : vScale.x;
        vec3 amb = ambientAt(vWP, vN);
        vec3 albedo;
        vec3 col;
        if (kind < 0.5) {
          // ---- 아파트: 밝은 벽 + 층마다 발코니 창(동 번호는 간판 아틀라스로 따로) ----
          albedo = vec3(0.46, 0.45, 0.43) * (0.85 + 0.3 * hash(vec2(seed, 2.0)));
          col = albedo * amb;
          float dcam = length(vWP - cameraPosition);
          if (side && dcam > 420.0) {
            // 5차 B8 원경: 창 대신 4층×5칸 블록마다 켜진 비율을 구운 듯한 평균 빛(계산을 크게 줄임)
            vec2 bc = vec2(hx / 6.6, vWP.y / 5.6);
            vec2 blk = floor(bc);
            vec2 fwb = fwidth(bc);
            float on = step(hash(blk + seed), lit) * (0.6 + 0.4 * hash(blk + seed + 7.0));
            float bt = hash(vec2(seed, 21.7));
            vec3 wc = mix(bt < 0.5 ? vec3(1.0, 0.66, 0.36) : vec3(0.92, 0.9, 0.86), bt < 0.5 ? vec3(0.92, 0.9, 0.86) : vec3(1.0, 0.66, 0.36), step(0.8, hash(blk + seed + 3.0)));
            // 블록이 화소보다 작으면 평균으로 녹인다
            float far2 = smoothstep(0.25, 0.7, max(fwb.x, fwb.y));
            float m = mix(on, lit * 0.8, far2);
            col = mix(albedo * amb, wc * gain * 0.4, m * 0.6 * step(4.0, vWP.y) * step(1.4, topM));
          } else if (side) {
            if (faceW > 16.0) {
              vec4 w = windows(vec2(hx / 3.3 + seed, vWP.y / 2.8), vec2(0.1, 0.24), vec2(0.9, 0.9), seed, lit, gain);
              float rows = step(4.0, vWP.y) * step(1.4, topM);
              // 11차 배3: 220m 안 켜진 창은 interior mapping(190~220m 에서 평면 창으로 녹아든다)
              vec2 cell0 = vec2(hx / 3.3 + seed, vWP.y / 2.8);
              vec2 cf0 = fract(cell0);
              if (dcam < 220.0) {
                vec2 cell = cell0;
                vec2 cid = floor(cell);
                vec2 cf = cf0;
                vec2 wf = (cf - vec2(0.1, 0.24)) / vec2(0.8, 0.66);
                vec2 hid = vec2(floor(cid.x / 2.0), cid.y);
                if (hash(hid + seed * 13.1) < lit && wf.x > 0.0 && wf.x < 1.0 && wf.y > 0.0 && wf.y < 1.0) {
                  float k2 = hash(hid + vec2(seed, 7.0));
                  float bt = hash(vec2(seed, 21.7));
                  vec3 lc = k2 < 0.8 ? (bt < 0.5 ? vec3(1.0, 0.6, 0.3) : vec3(0.92, 0.9, 0.86)) : (bt < 0.5 ? vec3(0.92, 0.9, 0.86) : vec3(1.0, 0.6, 0.3));
                  lc *= (0.5 + 0.5 * hash(cid + vec2(3.0, 9.0))) * gain;
                  vec3 ic = interior(wf, cid, seed, normalize(vN), lc);
                  // 12차 배8: 실내 그림(생성 이미지 6종 중 집마다 하나) — 시선 따라 조금 밀려 깊이감, 그 집 불빛 색으로 살짝 물들임
                  if (uRoomOn > 0.5) {
                    vec3 Nn = normalize(vN), Vv = normalize(vWP - cameraPosition), Tt = normalize(cross(Nn, vec3(0.0, 1.0, 0.0)));
                    vec2 par = vec2(dot(Vv, Tt), dot(Vv, vec3(0.0, 1.0, 0.0))) * 0.12;
                    vec2 ruv = clamp(wf * 0.86 + 0.07 + par, 0.0, 1.0);
                    float ri = floor(hash(hid + vec2(seed * 5.3, 2.9)) * 5.999);
                    vec2 tl = vec2(mod(ri, 3.0), floor(ri / 3.0));
                    vec3 rc = texture2D(uRoom, vec2((tl.x + ruv.x) / 3.0, 1.0 - (tl.y + 1.0 - ruv.y) / 2.0)).rgb;
                    float lm = max(max(lc.r, lc.g), max(lc.b, 0.01));
                    ic = mix(ic, rc * (0.6 + 0.4 * hash(cid + 2.0)) * gain * 1.15 * mix(vec3(1.0), lc / lm, 0.25), 0.88);
                  }
                  float k3 = hash(cid + vec2(11.0, seed));
                  if (k3 < 0.2) ic = mix(ic, w.rgb, 0.75); // 블라인드가 내려진 창은 실내가 거의 안 보임
                  float near = 1.0 - smoothstep(190.0, 220.0, dcam);
                  w.rgb = mix(w.rgb, ic, near);
                }
              }
              // 11차 배3: 확장 발코니 새시(창마다 세로 문살 2개, 폭 0.06m) · 실외기(창 아래 20% 칸, 어두운 상자, 집마다 있거나 없음)
              {
                vec2 fwc = fwidth(cell0);
                float wx = (cf0.x - 0.1) / 0.8;
                float mull = 0.0;
                for (int q = 1; q <= 2; q++) mull = max(mull, 1.0 - smoothstep(0.0, 0.0115 + fwc.x * 1.2, abs(wx - float(q) / 3.0)));
                w.rgb *= 1.0 - 0.75 * mull * step(0.0, wx) * step(wx, 1.0) * (1.0 - smoothstep(0.3, 0.6, max(fwc.x, fwc.y)));
                float acOn = step(0.45, hash(floor(cell0) + vec2(seed * 3.7, 17.0)));
                float acx = step(0.55, cf0.x) * step(cf0.x, 0.82);
                float acy = step(0.02, cf0.y) * step(cf0.y, 0.2);
                col = mix(col, albedo * amb * 0.35, acOn * acx * acy * step(4.0, vWP.y) * step(1.4, topM) * (1.0 - smoothstep(0.3, 0.6, max(fwc.x, fwc.y))));
              }
              vec2 f = fract(vec2(hx / 3.3, vWP.y / 2.8));
              float rail = smoothstep(0.17, 0.2, f.y) * (1.0 - smoothstep(0.23, 0.26, f.y)) * rows;
              col = mix(col, w.rgb, w.a * rows) + albedo * amb * rail * 0.5;
              // 5차 B2: 층마다 슬래브 띠(밝은 콘크리트 선 + 아래 그늘)
              float fy = fract(vWP.y / 2.8);
              float slab = (smoothstep(0.0, 0.02, fy) - smoothstep(0.05, 0.08, fy)) * rows;
              float shade = (smoothstep(0.08, 0.1, fy) - smoothstep(0.1, 0.16, fy)) * rows;
              col = col + albedo * amb * slab * 0.45 - col * shade * 0.25;
            } else {
              // 옆벽: 가운데 계단실 창 한 줄
              vec4 w = windows(vec2(hx / 2.4 + 0.5, vWP.y / 2.8), vec2(0.3, 0.35), vec2(0.7, 0.8), seed + 3.0, 0.9, gain * 0.6);
              float strip = step(abs(hx), 1.2) * step(4.0, vWP.y) * step(1.4, topM);
              col = mix(col, w.rgb, w.a * strip);
              // 12차 배6: 측벽 2~3색 띠 도색(단지마다 색, 위쪽) — 가상 단지명 없이 색 띠만
              float bk = hash(vec2(seed, 31.0));
              vec3 bc1 = bk < 0.33 ? vec3(0.22, 0.52, 0.58) : (bk < 0.66 ? vec3(0.72, 0.42, 0.24) : vec3(0.3, 0.55, 0.32));
              vec3 bc2 = bk < 0.5 ? vec3(0.62, 0.62, 0.66) : vec3(0.75, 0.66, 0.42);
              float inW = step(abs(hx), faceW * 0.5 - 0.5);
              float b1 = (smoothstep(2.6, 2.75, topM) - smoothstep(4.4, 4.55, topM)) * inW;
              float b2 = (smoothstep(5.0, 5.15, topM) - smoothstep(5.6, 5.75, topM)) * inW;
              float b3 = (smoothstep(6.2, 6.35, topM) - smoothstep(6.5, 6.65, topM)) * inW * step(0.5, hash(vec2(seed, 33.0)));
              col = mix(col, bc1 * amb * 1.7, b1 * 0.85);
              col = mix(col, bc2 * amb * 1.6, max(b2, b3) * 0.8);
            }
            col *= mix(0.3, 1.0, step(3.6, vWP.y)); // 1층 필로티(어둡게)
            col = mix(col, albedo * amb * 1.25, 1.0 - smoothstep(0.4, 0.75, topM));
          } else {
            col = albedo * amb * 0.45;
          }
        } else if (kind < 2.5) {
          // ---- 업무 유리(1)·상가(2): 실사 외벽 텍스처(ambientCG). 없으면 코드 창 ----
          albedo = vec3(0.16, 0.17, 0.2);
          col = albedo * amb;
          if (side) {
            float sc = 0.7 + 0.6 * hash(vec2(seed, 5.3));
            if (uFacadeOn > 0.5) {
              float fi = kind < 1.5 ? 0.0 : (hash(vec2(seed, 1.7)) < 0.6 ? 2.0 : 1.0);
              float tile = fi < 0.5 ? uFTile.x : (fi < 1.5 ? uFTile.y : uFTile.z);
              float dark = fi < 0.5 ? uFDark.x : (fi < 1.5 ? uFDark.y : uFDark.z);
              vec2 uv = vec2(hx / (tile * sc) + hash(vec2(seed, 9.1)), vWP.y / (tile * sc) + floor(hash(vec2(seed, 1.1)) * 7.0) / 7.0);
              vec3 c0 = texture2D(uFC0, uv).rgb, e0 = texture2D(uFE0, uv).rgb;
              vec3 c1 = texture2D(uFC1, uv).rgb, e1 = texture2D(uFE1, uv).rgb;
              vec3 c2 = texture2D(uFC2, uv).rgb, e2 = texture2D(uFE2, uv).rgb;
              vec3 fc = fi < 0.5 ? c0 : (fi < 1.5 ? c1 : c2);
              vec3 fe = fi < 0.5 ? e0 : (fi < 1.5 ? e1 : e2);
              vec2 cells = fi < 1.5 ? uFCells1 : uFCells2;
              float on = hash(floor(uv * cells) + vec2(seed * 7.13, seed * 1.31)) < lit ? 1.0 : 0.06;
              albedo = fc * dark;
              col = albedo * amb * 1.6 + fe * on * gain * 0.75 * step(4.6, vWP.y);
            } else {
              vec4 w = windows(vec2(hx / 2.2, vWP.y / 3.4), vec2(0.15, 0.3), vec2(0.85, 0.85), seed, lit, gain);
              col = mix(col, w.rgb, w.a * step(4.6, vWP.y));
            }
            if (kind > 1.5) {
              // 1층 가게 유리(밝은 띠, 가게마다 색)
              float shop = step(0.5, vWP.y) * (1.0 - step(4.0, vWP.y));
              float sid = floor(hx / 6.0);
              vec3 sc2 = hash(vec2(sid, seed)) < 0.5 ? vec3(1.0, 0.85, 0.6) : vec3(0.75, 0.9, 1.0);
              float open = step(0.25, hash(vec2(sid, seed + 2.0)));
              float frame = step(0.08, fract(hx / 6.0)) * step(fract(hx / 6.0), 0.92);
              col = mix(col, sc2 * (0.25 + 0.3 * hash(vec2(sid, seed + 5.0))) * open * frame * (0.75 + 0.25 * smoothstep(0.5, 3.5, vWP.y)), shop);
            }
            if (kind < 1.5) {
              col += flashSpec(vWP, vN, 60.0) * 0.6 + vec3(0.02, 0.03, 0.05) * pow(1.0 - abs(dot(normalize(vWP - cameraPosition), vN)), 3.0);
              // 5차 B2: 유리 커튼월 멀리언(세로 1.5m)·층 띠(3.4m)
              vec2 fwm = fwidth(vec2(hx / 1.5, vWP.y / 3.4));
              float mul = 1.0 - smoothstep(0.0, fwm.x * 1.5 + 0.02, min(fract(hx / 1.5), 1.0 - fract(hx / 1.5)));
              float flr = 1.0 - smoothstep(0.0, fwm.y * 1.5 + 0.03, min(fract(vWP.y / 3.4), 1.0 - fract(vWP.y / 3.4)));
              col = mix(col, vec3(0.05, 0.055, 0.065) * amb * 4.0, max(mul * 0.6, flr * 0.8) * step(4.6, vWP.y));
            }
            col = mix(col, albedo * amb * 1.4, 1.0 - smoothstep(0.35, 0.6, topM));
          } else {
            col = albedo * amb * 0.5;
          }
        } else {
          // ---- 옥상 구조물·기둥 ----
          albedo = vec3(0.2, 0.2, 0.22);
          col = albedo * amb;
        }
        // 12차 배6: 바닥 쪽 그늘(땅에 가까울수록 어둡게, 9m 까지)
        if (side) col *= mix(0.55, 1.0, smoothstep(0.0, 9.0, vLocal.y * vScale.y));
        col = bgGrade(col);
        col += albedo * 3.0 * flashAt(vWP, vN, 0.2);
        gl_FragColor = vec4(applyFog(col, vWP), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}function gp(e){return new wa({uniforms:{...e},vertexShader:`
      attribute vec2 aFE; // 불투명도, 발광
      varying vec3 vWP;
      varying vec3 vN;
      varying vec3 vCol;
      varying vec2 vFE;
      varying float vFogDepth;
      void main() {
        mat4 m = modelMatrix * instanceMatrix;
        vec4 wp = m * vec4(position, 1.0);
        vWP = wp.xyz;
        vN = normalize(mat3(m) * normal);
        #ifdef USE_INSTANCING_COLOR
        vCol = instanceColor;
        #else
        vCol = vec3(0.5);
        #endif
        vFE = aFE;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      varying vec3 vWP; varying vec3 vN; varying vec3 vCol; varying vec2 vFE;
      ${fp}
      ${Md}
      ${pp}
      ${mp}
      float bayer(vec2 p) {
        vec2 q = mod(floor(p), 4.0);
        float i = q.x + q.y * 4.0;
        // 4×4 베이어 행렬
        float b = 0.0;
        if (i < 0.5) b = 0.0; else if (i < 1.5) b = 8.0; else if (i < 2.5) b = 2.0; else if (i < 3.5) b = 10.0;
        else if (i < 4.5) b = 12.0; else if (i < 5.5) b = 4.0; else if (i < 6.5) b = 14.0; else if (i < 7.5) b = 6.0;
        else if (i < 8.5) b = 3.0; else if (i < 9.5) b = 11.0; else if (i < 10.5) b = 1.0; else if (i < 11.5) b = 9.0;
        else if (i < 12.5) b = 15.0; else if (i < 13.5) b = 7.0; else if (i < 14.5) b = 13.0; else b = 5.0;
        return (b + 0.5) / 16.0;
      }
      void main() {
        if (vFE.x < 0.999 && bayer(gl_FragCoord.xy) > vFE.x) discard;
        vec3 amb = ambientAt(vWP, vN);
        // 다리 조명이 아래에서 비추는 느낌(낮은 곳 따뜻하게)
        vec3 col = vCol * amb * 1.3 + vCol * vec3(0.9, 0.7, 0.5) * 0.18 * (1.0 - smoothstep(4.0, 24.0, vWP.y));
        col += vCol * 3.0 * flashAt(vWP, vN, 0.25) + flashSpec(vWP, vN, 40.0) * 0.25;
        col += vCol * vFE.y;
        // 5차 B3: 아래를 보는 면(상판·고가 아랫면)은 물·강변 불빛이 올려 비춘 따뜻한 반사광을 받는다(단색 검은 아랫면 방지)
        col += (vCol * 2.0 + vec3(0.03)) * vec3(0.95, 0.72, 0.5) * (0.35 + 0.65 * max(-vN.y, 0.0)) * (1.0 - max(vN.y, 0.0)) * (1.0 - smoothstep(10.0, 26.0, vWP.y)) * 0.55;
        // 물에 닿는 부분(수면 위 1.4m 까지) 젖은 어두운 띠 + 살짝 젖은 반짝임
        float wet = 1.0 - smoothstep(0.9, 1.5, vWP.y);
        col *= 1.0 - 0.6 * wet * step(vFE.y, 0.01);
        col = bgGrade(col);
        gl_FragColor = vec4(applyFog(col, vWP), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}function _p(e){return new wa({uniforms:{...e,uMask:{value:e.uBlank.value},uMaskBox:{value:new Yt(0,0,1,1)},uWaterCol:{value:new K},uLandCol:{value:new K},uSkyLow:{value:new K},uSkyTop:{value:new K},uLamp:{value:new K},uReflect:{value:1}},vertexShader:`
      varying vec3 vWP;
      varying float vFogDepth;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWP = wp.xyz;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform sampler2D uMask; uniform vec4 uMaskBox;
      uniform vec3 uWaterCol; uniform vec3 uLandCol; uniform vec3 uSkyLow; uniform vec3 uSkyTop; uniform vec3 uLamp;
      uniform float uTime; uniform float uReflect;
      varying vec3 vWP;
      ${fp}
      ${Md}
      ${pp}
      vec3 vnoiseD(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        vec2 du = 6.0 * f * (1.0 - f);
        float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
        return vec3(a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y,
                    du * (vec2(b - a, c - a) + (a - b - c + d) * u.yx));
      }
      // 5차 B6: 물 법선 두 겹(서로 다른 방향으로 흐르는 방향성 물결의 합) — 격자 노이즈를 쓰지 않아 네모 픽셀이 없다.
      // 겹 1: 긴 바람 물결(4~9m), 겹 2: 비스듬한 잔물결(0.8~2m). 멀수록(화소보다 작은 물결) 줄여 반짝이 계단을 막는다
      vec2 waveSet(vec2 p, vec2 dir, float base, float speed, float amp, float fw) {
        vec2 g = vec2(0.0);
        for (int i = 0; i < 4; i++) {
          float fi = float(i);
          float a = fi * 0.61 - 0.9;
          vec2 d = normalize(dir + vec2(cos(a * 2.3), sin(a * 1.7)) * 0.55);
          float k = base * (1.0 + fi * 0.73);
          float lam = 6.2831 / k;
          float att = clamp(lam / (fw * 6.0) - 0.3, 0.0, 1.0); // 화소보다 짧은 물결은 끔
          float ph = dot(d, p) * k + uTime * speed * sqrt(k) * (1.0 + fi * 0.13) + fi * 1.7;
          g += d * cos(ph) * amp * k / (1.0 + fi * 0.9) * att;
        }
        return g;
      }
      vec3 waterNormal(vec2 p, float dist) {
        float fw = max(length(fwidth(p)), 0.02);
        vec2 g = waveSet(p, vec2(0.25, 1.0), 0.75, 1.1, 0.055, fw) + waveSet(p, vec2(-0.9, 0.35), 3.2, 1.7, 0.018, fw);
        g += vec2(vnoise(p * 0.07 + uTime * 0.02) - 0.5, vnoise(p.yx * 0.07 - uTime * 0.03) - 0.5) * 0.05;
        float k = 1.0 / (1.0 + dist * 0.003);
        return normalize(vec3(-g.x * k, 1.0, -g.y * k));
      }
      void main() {
        vec2 muv = (vWP.xz - uMaskBox.xy) / uMaskBox.zw;
        vec2 m = (muv.x < 0.0 || muv.y < 0.0 || muv.x > 1.0 || muv.y > 1.0) ? vec2(0.0) : texture2D(uMask, muv).rg;
        float water = smoothstep(0.35, 0.65, m.r);
        float shore = m.g; // 강가 가까움(흐리게 번진 값)
        vec3 V = normalize(vWP - cameraPosition);
        float dist = length(vWP - cameraPosition);
        // 11차 배1: 땅 = 어두운 바닥 + 저주파 얼룩(40~80m, 밝기 ±15%). 26m 격자 빛웅덩이(반복 무늬)는 없앴다 — 빛웅덩이는 실제 가로등 자리에만(바닥 무늬 인스턴스)
        float blot = 0.65 * vnoise(vWP.xz / 60.0) + 0.35 * vnoise(vWP.xz / 23.0 + 7.3);
        vec3 land = uLandCol * (0.85 + 0.3 * blot) + uLandCol * 3.0 * flashAt(vWP, vec3(0.0, 1.0, 0.0), 0.0);
        // 물
        vec3 N = waterNormal(vWP.xz, dist);
        float rip = N.z * 4.0;
        vec3 R = reflect(V, N);
        R.y = abs(R.y);
        float cosT = clamp(-dot(V, N), 0.0, 1.0);
        float fres = 0.04 + 0.96 * pow(1.0 - cosT, 5.0);
        vec3 sky = mix(mix(uSkyLow, uCityGlow, 0.45), uSkyTop, smoothstep(0.0, 0.5, R.y));
        // 강가 도시 불빛이 비친 흔들리는 띠(수평선 쪽)
        float az = atan(R.x, R.z);
        float lights = smoothstep(0.55, 1.0, vnoise(vec2(az * 140.0, 0.0)) * 0.7 + 0.5 * rip * 0.3) * exp(-R.y * 22.0);
        vec3 refl = sky * 0.7 + uLamp * lights * 0.35 * uReflect + uCityGlow * exp(-R.y * 9.0) * 0.25;
        // 프레넬: 가까운 물은 어둡게 물빛, 멀수록 하늘·도시광이 더 비친다
        vec3 wcol = uWaterCol * 0.3 + refl * mix(0.12, 1.0, fres);
        // 폭발 빛의 세로 줄무늬 반사(거울상 방향과 가까울수록)
        if (uReflect > 0.5) {
          vec2 a = normalize(V.xz);
          for (int i = 0; i < ${up}; i++) {
            vec3 c = uLCol[i].rgb;
            if (c.r + c.g + c.b < 0.01) continue;
            vec4 L = uLPos[i];
            vec3 M = vec3(L.x, -L.y, L.z);
            vec3 dm = normalize(M - cameraPosition);
            float angH = sqrt(max(0.0, 2.0 * (1.0 - dot(a, normalize(dm.xz)))));
            float dd = max(10.0, distance(cameraPosition.xz, L.xz));
            float wH = (L.w / 3.0) * 0.45 / dd + 0.004;
            float dep = V.y - dm.y;
            float s = exp(-pow(angH / wH, 2.0)) * exp(-pow(dep / (0.05 + wH * 2.5), 2.0));
            s *= 0.4 + 0.9 * smoothstep(-0.4, 0.9, rip);
            wcol += c * s * 0.9;
          }
        }
        // 강둑 가로등 불빛 줄
        float streak = smoothstep(0.6, 1.0, sin(vWP.z * 0.37 + vWP.x * 0.21 + hash(floor(vWP.xz / 7.0)) * 6.0) * 0.5 + 0.5 * rip);
        wcol += uLamp * 0.09 * shore * shore * streak;
        wcol += flashVol(vWP) * 0.05;
        vec3 col = bgGrade(mix(land, wcol, water));
        gl_FragColor = vec4(applyFogK(col, vWP, mix(1.0, 0.7, water)), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}function vp(e,t=!1){let n=e.uBlank.value;return new wa({uniforms:{...e,uLamp:{value:new K},uRoad:{value:+!!t},uTexOn:{value:0},uAsph:{value:n},uAsphR:{value:n},uPave:{value:n},uCross:{value:Array(8).fill(-1e5)},uSkyLow:{value:new K}},vertexShader:`
      attribute vec3 color;
      attribute vec2 aSU; // 경로 거리, 강둑에서 거리 (11차 도로: 도로를 따라 거리, 중심에서 거리(부호))
      attribute vec2 aRK; // 11차 도로: 차도 반폭(m), 종류(0 일반 · 1 대로 · 2 다리 거리)
      varying vec3 vWP;
      varying vec3 vCol;
      varying vec2 vSU;
      varying vec2 vRK;
      varying float vFogDepth;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWP = wp.xyz;
        vCol = color;
        vSU = aSU;
        vRK = aRK;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform vec3 uLamp; uniform float uRoad; uniform float uTexOn; uniform sampler2D uAsph; uniform sampler2D uAsphR; uniform sampler2D uPave; uniform float uCross[8]; uniform vec3 uSkyLow;
      varying vec3 vWP; varying vec3 vCol; varying vec2 vSU; varying vec2 vRK;
      ${fp}
      ${Md}
      ${pp}
      // 선 하나(중심 c, 폭 w)의 덮임(화소 크기로 부드럽게)
      float band(float x, float c, float w, float fw) { return 1.0 - smoothstep(w * 0.5 - fw, w * 0.5 + fw, abs(x - c)); }
      vec3 roadColor() {
        float off = vSU.y, ao = abs(off), al = vSU.x, H = vRK.x, kind = vRK.y;
        vec2 tuv = vWP.xz / 4.0; // 질감: 월드 4m 반복
        float tf = length(fwidth(tuv));
        float farK = smoothstep(0.12, 0.5, tf); // 멀면 평균색으로 녹임(무아레 방지)
        float fo = max(fwidth(off), 0.01);
        vec3 col;
        if (ao < H) {
          vec3 a = uTexOn > 0.5 ? texture2D(uAsph, tuv).rgb : vec3(0.36);
          a = mix(a, vec3(0.36), farK);
          col = vec3(0.034, 0.034, 0.039) * (0.45 + 1.5 * a);
          // 노면 표시(밤이라 가로등 빛을 받은 정도로 어둡게): 중앙선 황색 실선 2줄 · 차선 백색 점선(칠 3 · 빈칸 5m) · 가장자리 백색 실선
          float yel = band(ao, 0.15, 0.15, fo);
          float wht = 0.0;
          float dash = step(fract(al / 8.0), 0.375);
          for (int k = 1; k <= 3; k++) {
            float c = 0.225 + 3.3 * float(k);
            if (c < H - 1.0) wht = max(wht, band(ao, c, 0.15, fo) * dash);
          }
          wht = max(wht, band(ao, H - 0.35, 0.15, fo));
          // 횡단보도(대로 교차로): 줄 폭 0.45 · 간격 0.45, 6m 띠
          if (kind > 0.5 && kind < 1.5) {
            for (int i = 0; i < 8; i++) {
              if (abs(al - uCross[i]) < 3.0 && ao < H - 0.6) wht = max(wht, 1.0 - smoothstep(0.5 - 0.06, 0.5 + 0.06, fract(off / 0.9 + 0.25)) );
            }
          }
          col = mix(col, vec3(0.17, 0.125, 0.035), yel * 0.9);
          col = mix(col, vec3(0.15, 0.15, 0.145), wht * 0.85);
          // 젖은 노면: 웅덩이(덮는 비율 약 20%, 1.5~6m) — 하늘·도시광을 1.6배 비춘다
          float rr = uTexOn > 0.5 ? texture2D(uAsphR, tuv * 0.37).r : 0.5;
          float pm = 0.62 * vnoise(vWP.xz / 4.5) + 0.38 * vnoise(vWP.xz / 1.7 + 3.1) + (rr - 0.5) * 0.15;
          float wet = smoothstep(0.6, 0.68, pm);
          vec3 V = normalize(vWP - cameraPosition);
          float fres = 0.04 + 0.96 * pow(1.0 - clamp(-V.y, 0.0, 1.0), 5.0);
          vec3 refl = (uSkyLow * 1.3 + uCityGlow * 0.3) * 1.6;
          col = mix(col, col * 0.4 + refl * mix(0.25, 1.0, fres), wet * 0.85);
        } else if (ao < H + 0.2) {
          col = vec3(0.075, 0.074, 0.078); // 연석(콘크리트, 0.15m 높음)
        } else {
          vec3 pv = uTexOn > 0.5 ? texture2D(uPave, tuv * 1.6).rgb : vec3(0.45);
          pv = mix(pv, vec3(0.45), farK);
          col = vec3(0.07, 0.066, 0.064) * (0.5 + 1.0 * pv);
          // 보도블록 0.3m 격자(가까울 때만)
          vec2 gq = abs(fract(vec2(al, off) / 0.3) - 0.5);
          float fg = max(fwidth(al / 0.3), 0.001);
          col *= 1.0 - 0.18 * (1.0 - smoothstep(0.47 - fg, 0.5, max(gq.x, gq.y))) * (1.0 - farK);
        }
        return col;
      }
      void main() {
        if (uRoad > 0.5) {
          vec3 rc = bgGrade(roadColor());
          rc += vec3(0.08) * 3.0 * flashAt(vWP, vec3(0.0, 1.0, 0.0), 0.0);
          gl_FragColor = vec4(applyFog(rc, vWP), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          return;
        }
        vec3 col = vCol;
        // 강변도로 차선(점선)
        float b = vSU.y;
        float lane = step(abs(b - 22.5), 0.12) * step(0.5, fract(vSU.x / 9.0)) + step(abs(b - 18.0), 0.1) + step(abs(b - 27.0), 0.1);
        col = mix(col, vec3(0.55, 0.5, 0.38), clamp(lane, 0.0, 1.0) * 0.45);
        // 가로등 불빛 웅덩이(둔치 산책로·도로, 30m 마다)
        float lz = fract(vSU.x / 30.0) - 0.5;
        float p1 = exp(-pow(lz * 30.0 / 7.0, 2.0) - pow((b - 12.0) / 5.0, 2.0));
        float p2 = exp(-pow((fract(vSU.x / 30.0 + 0.5) - 0.5) * 30.0 / 8.0, 2.0) - pow((b - 28.5) / 6.0, 2.0));
        col += uLamp * (p1 * 0.16 + p2 * 0.2);
        col = bgGrade(col);
        col += vCol * 3.0 * flashAt(vWP, vec3(0.0, 1.0, 0.0), 0.0);
        gl_FragColor = vec4(applyFog(col, vWP), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}function yp(e){return new wa({uniforms:{uLPos:e.uLPos,uLCol:e.uLCol,uTime:e.uTime,uCityGlow:e.uCityGlow,uFogColor:e.uFogColor,uTop:{value:new K},uBottom:{value:new K},uMoonDir:{value:new G(-.42,.36,-.83).normalize()}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uTop; uniform vec3 uBottom; uniform vec3 uCityGlow; uniform vec3 uFogColor; uniform float uTime; uniform vec3 uMoonDir;
      uniform vec4 uLPos[${up}]; uniform vec4 uLCol[${up}];
      varying vec3 vDir;
      ${fp}
      float fbm(vec2 p) {
        return 0.55 * vnoise(p) + 0.3 * vnoise(p * 2.03 + 7.1) + 0.15 * vnoise(p * 4.1 + 3.7);
      }
      void main() {
        vec3 d = normalize(vDir);
        float el = asin(clamp(d.y, -1.0, 1.0));
        float h = clamp(d.y * 1.6 + 0.06, 0.0, 1.0);
        vec3 col = mix(uBottom, uTop, pow(h, 0.65));
        col += uCityGlow * exp(-max(el, 0.0) * 9.0) * 0.6; // 지평선 도시광
        // 11차 배5: 광공해 돔 — 고도 0~12° 에 주황·분홍 빛(도시광 세기에 비례, 배경이라 HDR 1.0 아래)
        float dome = 1.0 - smoothstep(0.0, 0.2094, max(el, 0.0));
        col += vec3(0.353, 0.227, 0.165) * (length(uCityGlow) / 0.33) * dome * dome * 0.55;
        vec3 halo = vec3(0.0);
        vec3 wide = vec3(0.0);
        for (int i = 0; i < ${up}; i++) {
          vec3 c = uLCol[i].rgb;
          if (c.r + c.g + c.b < 0.005) continue;
          vec3 lp = uLPos[i].xyz - cameraPosition;
          float dist = length(lp);
          float ang = acos(clamp(dot(d, lp / dist), -1.0, 1.0));
          float w = min((uLPos[i].w / 3.0) * 2.2 / dist, 0.35);
          halo += c * exp(-pow(ang / w, 2.0));
          wide += c * exp(-ang / (w * 3.0)) * 0.3;
        }
        vec3 sp = d * 230.0;
        vec3 sid = floor(sp);
        float sh = hash13(sid);
        if (sh > 0.988 && el > 0.05) {
          vec3 off = vec3(hash13(sid + 1.3), hash13(sid + 2.7), hash13(sid + 5.1)) - 0.5;
          float r = length(fract(sp) - 0.5 - off * 0.5);
          float tw = 0.55 + 0.45 * sin(uTime * (1.5 + sh * 40.0) + sh * 300.0);
          col += vec3(0.75, 0.82, 1.0) * smoothstep(0.16, 0.0, r) * tw * (sh - 0.988) * 40.0 * smoothstep(0.05, 0.25, el);
        }
        float md = acos(clamp(dot(d, uMoonDir), -1.0, 1.0));
        float mr = 0.016;
        float fwm = fwidth(md);
        float disc = 1.0 - smoothstep(mr - fwm, mr + fwm, md);
        vec3 moon = vec3(0.62, 0.59, 0.51);
        col += vec3(0.55, 0.55, 0.62) * (exp(-md * 14.0) * 0.06 + exp(-md * 60.0) * 0.09);
        if (el > 0.0) {
          vec2 cuv = d.xz / (d.y + 0.12) * 0.55 + vec2(uTime * 0.006, uTime * 0.002);
          float n = fbm(cuv * 1.6);
          float cloud = smoothstep(0.5, 0.82, n) * smoothstep(0.0, 0.1, el);
          vec3 cc = uTop * 1.3 + uCityGlow * 0.35 * (1.0 - h) + vec3(0.008);
          cc += vec3(0.4, 0.4, 0.46) * exp(-md * 4.0) * 0.3;
          cc += halo * 0.45 + wide * 0.3;
          col = mix(col, cc, cloud * 0.85);
          col = mix(col, moon, disc * (1.0 - cloud * 0.85));
        }
        col += halo * 0.04 + wide * 0.04;
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,side:1,depthWrite:!1,fog:!1})}function bp(e){return new wa({uniforms:{uFogColor:e.uFogColor,uCityGlow:e.uCityGlow,uBase:{value:new K(658456)}},vertexShader:`
      varying float vH;
      varying float vY;
      void main() {
        vH = uv.y;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vY = wp.y;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      uniform vec3 uFogColor; uniform vec3 uCityGlow; uniform vec3 uBase;
      varying float vH;
      varying float vY;
      void main() {
        vec3 col = mix(mix(uFogColor, uCityGlow, 0.5) * 0.9, uBase, smoothstep(0.0, 0.7, vH));
        col += uCityGlow * 0.12 * exp(-vY * 0.01);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}function xp(e){return new wa({uniforms:{uFogColor:e.uFogColor,uCityGlow:e.uCityGlow,uTime:e.uTime,uSkyA:{value:Mp},uSkyB:{value:Mp},uSkyOn:{value:0},uSkyRep:{value:1361}},vertexShader:`
      attribute vec3 aF; // 겹(0·1·2), 가로 위치(m), 높이 비율(0 바닥 ~ 1 꼭대기)
      varying vec3 vF;
      varying float vY;
      void main() {
        vF = aF;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vY = wp.y;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      uniform vec3 uFogColor; uniform vec3 uCityGlow;
      uniform sampler2D uSkyA; uniform sampler2D uSkyB; uniform float uSkyOn; uniform float uSkyRep;
      varying vec3 vF; varying float vY;
      ${fp}
      void main() {
        float layer = vF.x;
        if (layer > 2.5) {
          // 12차 배8: 원경 가상 도시 밤 띠(생성 이미지 2장, 좌우를 거울로 이어 씀). 하늘 부분은 버린다(알파)
          if (uSkyOn < 0.5) discard;
          float u = vF.y / uSkyRep;
          float k = floor(u);
          float fu = fract(u);
          if (mod(k, 2.0) > 0.5) fu = 1.0 - fu;
          vec4 t = mod(k, 4.0) < 1.5 ? texture2D(uSkyA, vec2(fu, vF.z)) : texture2D(uSkyB, vec2(fu, vF.z));
          if (t.a < 0.5) discard;
          vec3 fc2 = mix(uFogColor, uCityGlow, 0.35);
          gl_FragColor = vec4(bgGrade(mix(t.rgb * 0.75, fc2, 0.5)), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          return;
        }
        vec3 base = vec3(0.018, 0.02, 0.03);
        float fogMix = layer < 0.5 ? 0.35 : layer < 1.5 ? 0.6 : 0.8;
        vec3 fc = mix(uFogColor, uCityGlow, 0.55 * exp(-max(vY, 0.0) * 0.012));
        vec3 col = mix(base, fc, fogMix);
        if (layer < 0.5 && vY > 4.0) {
          // 1겹 창 점: 6m × 5.6m 블록마다 켜짐(점등률 0.15), 블록 평균 밝기
          vec2 bc = vec2(vF.y / 6.0, vY / 5.6);
          float on = step(hash(floor(bc) + 3.7), 0.15);
          vec2 f = fract(bc);
          float m = step(0.2, f.x) * step(f.x, 0.8) * step(0.25, f.y) * step(f.y, 0.75);
          col += vec3(0.9, 0.7, 0.45) * 0.18 * on * m * (1.0 - fogMix);
        }
        gl_FragColor = vec4(bgGrade(col), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}function Sp(e){return new wa({uniforms:{uFogDensity:e.uFogDensity},vertexShader:`
      attribute vec4 aHP;
      attribute vec4 aHC;
      varying vec2 vQ;
      varying vec4 vC;
      varying float vF;
      uniform float uFogDensity;
      void main() {
        vec4 mv = viewMatrix * vec4(aHP.xyz, 1.0);
        float d = -mv.z;
        mv.xy += position.xy * aHP.w;
        vQ = position.xy * 2.0;
        vC = aHC;
        vF = exp(-uFogDensity * uFogDensity * d * d * 0.7);
        if (aHC.a < 0.001 || d < 1.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      varying vec2 vQ;
      varying vec4 vC;
      varying float vF;
      void main() {
        float r = length(vQ);
        if (r > 1.0) discard;
        float a = exp(-r * r * 5.0) * 0.8 + (1.0 - r) * (1.0 - r) * 0.2;
        gl_FragColor = vec4(vC.rgb * vC.a * a * vF, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,transparent:!0,depthWrite:!1,blending:2})}function Cp(e,t,n){return new wa({uniforms:{uTime:e.uTime,uMask:t,uMaskBox:n,uFogDensity:e.uFogDensity},vertexShader:`
      attribute vec4 aRP;
      attribute vec4 aRC;
      varying vec2 vQ;
      varying vec4 vC;
      varying vec3 vWP;
      varying float vFogDepth;
      varying float vMode;
      void main() {
        vec2 F = aRP.xy;
        vMode = aRC.a >= 3.5 ? 2.0 : aRC.a >= 1.5 ? 1.0 : 0.0; // 0 물 · 1 젖은 도로 반사 · 2 바닥 빛웅덩이
        float yy = vMode > 1.5 ? (aRC.a - 4.0) * 4.0 : vMode > 0.5 ? (aRC.a - 2.0) * 4.0 : 0.04;
        if (vMode > 1.5) {
          // 바닥 빛웅덩이: 땅에 누운 원(반지름 aRP.w)
          vec2 p = F + position.xy * 2.0 * aRP.w;
          vWP = vec3(p.x, yy, p.y);
          vQ = position.xy * 2.0;
          vC = aRC;
          vec4 mv = viewMatrix * vec4(vWP, 1.0);
          vFogDepth = -mv.z;
          gl_Position = projectionMatrix * mv;
          return;
        }
        vec2 toCam = cameraPosition.xz - F;
        float dc = length(toCam);
        vec2 d = toCam / max(dc, 0.001);
        vec2 n = vec2(-d.y, d.x);
        float len = min(aRP.z * (0.6 + 0.004 * dc), dc * 0.8);
        vec2 p = F + d * (position.y + 0.5) * len + n * position.x * aRP.w;
        vWP = vec3(p.x, yy, p.y);
        vQ = vec2(position.x * 2.0, position.y + 0.5);
        vC = aRC;
        vec4 mv = viewMatrix * vec4(vWP, 1.0);
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uTime; uniform sampler2D uMask; uniform vec4 uMaskBox; uniform float uFogDensity;
      varying vec2 vQ; varying vec4 vC; varying vec3 vWP; varying float vFogDepth; varying float vMode;
      void main() {
        float f0 = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8);
        if (vMode > 1.5) {
          float r2 = dot(vQ, vQ);
          if (r2 > 1.0) discard;
          gl_FragColor = vec4(vC.rgb * exp(-r2 * 3.2) * (1.0 - r2) * f0, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          return;
        }
        vec2 muv = (vWP.xz - uMaskBox.xy) / uMaskBox.zw;
        float water = vMode > 0.5 ? 1.0 : texture2D(uMask, muv).r;
        if (water < 0.3) discard;
        float across = exp(-vQ.x * vQ.x * 3.0);
        float along = smoothstep(0.0, 0.08, vQ.y) * (1.0 - vQ.y) * (1.0 - vQ.y);
        // 물결에 끊기는 빛(가로 줄무늬가 천천히 흐름)
        float rip = 0.55 + 0.45 * sin(vQ.y * 38.0 + uTime * 2.3 + vC.a * 31.0) * sin(vQ.y * 13.0 - uTime * 1.1 + vQ.x * 2.0);
        float f = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8);
        gl_FragColor = vec4(vC.rgb * across * along * rip * f * smoothstep(0.3, 0.6, water), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,transparent:!0,depthWrite:!1,blending:2})}function wp(e){return new wa({uniforms:{uTime:e.uTime,uFogDensity:e.uFogDensity},vertexShader:`
      attribute vec4 aA;
      attribute vec4 aB;
      attribute vec4 aC;
      uniform float uTime;
      varying vec3 vCol;
      varying vec2 vQ;
      varying float vFogDepth;
      void main() {
        float t = fract(aA.w + uTime * aB.w);
        vec3 D = aB.xyz - aA.xyz;
        float L = max(length(D), 0.01);
        D /= L;
        vec3 P = aA.xyz + D * L * t;
        float along = position.x + 0.5; // 0 꼬리 ~ 1 머리
        vec3 W = P - D * aC.x * (1.0 - along);
        vec3 V = cameraPosition - W;
        vec3 N = cross(D, V);
        float nl = length(N);
        N = nl > 1e-4 ? N / nl : vec3(0.0, 1.0, 0.0);
        float wdist = length(cameraPosition - P);
        W += N * position.y * max(aC.y, wdist * 0.0024); // 멀어도 1.5화소 안팎 폭이 남게
        vec3 Rl = normalize(cross(D, vec3(0.0, 1.0, 0.0)));
        W += Rl * position.z * (aC.w > 0.5 ? 1.05 : 0.72); // 12차: 전조등·미등 쌍
        bool toward = dot(D, cameraPosition - P) > 0.0;
        float brake = toward ? 1.0 : 1.0 + 1.6 * smoothstep(0.82, 0.97, t); // 교차로(선분 끝) 앞에서 브레이크등
        vCol = (toward ? vec3(1.0, 0.95, 0.85) * 0.8 : vec3(1.0, 0.12, 0.06) * 0.5 * brake) * aC.z;
        vCol *= clamp(min(t, 1.0 - t) * L / 12.0, 0.0, 1.0); // 선분 끝에서 부드럽게 나타나고 사라짐
        vQ = vec2(along, position.y * 2.0);
        vec4 mv = viewMatrix * vec4(W, 1.0);
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uFogDensity;
      varying vec3 vCol; varying vec2 vQ; varying float vFogDepth;
      void main() {
        float across = 1.0 - vQ.y * vQ.y;
        float a = across * mix(0.15, 1.0, vQ.x * vQ.x);
        float f = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8);
        gl_FragColor = vec4(vCol * a * f, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,transparent:!0,depthWrite:!1,blending:2,side:2})}function Tp(e){return new wa({uniforms:{uTime:e.uTime,uFogDensity:e.uFogDensity,uFogColor:e.uFogColor},vertexShader:`
      attribute vec4 aA;
      attribute vec4 aB;
      attribute vec4 aC;
      uniform float uTime;
      varying vec3 vLoc;
      varying float vBus;
      varying float vFogDepth;
      varying float vShade;
      void main() {
        float t = fract(aA.w + uTime * aB.w);
        vec3 D = aB.xyz - aA.xyz;
        float L = max(length(D), 0.01);
        D /= L;
        vec3 P = aA.xyz + D * L * t - vec3(0.0, 0.65, 0.0);
        vec3 R = normalize(cross(D, vec3(0.0, 1.0, 0.0)));
        float bus = aC.w;
        vec3 sz = bus > 0.5 ? vec3(2.5, 3.1, 11.0) : vec3(1.8, 1.35, 4.3);
        vec3 lp = position * sz;
        vec3 W = P + R * lp.x + vec3(0.0, lp.y, 0.0) + D * lp.z;
        float fade = clamp(min(t, 1.0 - t) * L / 12.0, 0.0, 1.0);
        if (fade < 0.02) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
        vLoc = position + vec3(0.0, 0.0, 0.5);
        vBus = bus;
        vShade = 0.6 + 0.4 * max(0.0, normal.y) + 0.15 * abs(normal.x);
        vec4 mv = viewMatrix * vec4(W, 1.0);
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uFogDensity; uniform vec3 uFogColor;
      varying vec3 vLoc; varying float vBus; varying float vFogDepth; varying float vShade;
      void main() {
        vec3 col = vec3(0.028, 0.03, 0.036) * vShade;
        if (vLoc.y > 0.42) col *= 0.7; // 지붕·유리 쪽 어둡게
        if (vBus > 0.5) {
          // 버스 실내등 띠(창 높이, 기둥 사이)
          float band = step(0.48, vLoc.y) * step(vLoc.y, 0.82) * step(0.12, fract(vLoc.z * 6.0));
          col += vec3(1.0, 0.78, 0.5) * 0.28 * band;
        }
        float f = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8);
        gl_FragColor = vec4(mix(uFogColor * 0.6, col, f), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}var Ep=null;function Dp(){if(Ep)return Ep;if(typeof document>`u`)return null;let e=document.createElement(`canvas`);e.width=e.height=256;let t=e.getContext(`2d`);t.clearRect(0,0,256,256);let n=7,r=()=>(n=n*16807%2147483647,n/2147483647);for(let e=0;e<520;e++){let e=r()*Math.PI*2,n=Math.sqrt(r())*108,i=128+Math.cos(e)*n,a=122+Math.sin(e)*n*.95,o=.55+.45*r()-a/256*.25;t.fillStyle=`rgba(${Math.round(70*o)}, ${Math.round(105*o)}, ${Math.round(62*o)}, 1)`,t.beginPath(),t.ellipse(i,a,4+r()*7,3+r()*5,r()*3.14,0,Math.PI*2),t.fill()}return t.fillStyle=`rgb(40,32,26)`,t.fillRect(0,248,8,8),Ep=new ra(e),Ep.colorSpace=Re,Ep}var Op=e=>e.kind===`avenue`||e.name.includes(`강변도로`);function kp(e){return new wa({uniforms:{uFogDensity:e.uFogDensity},vertexShader:`
      attribute vec4 aCC;
      varying float vT;
      varying vec4 vC;
      varying vec3 vN;
      varying vec3 vV;
      varying float vFogDepth;
      void main() {
        mat4 m = modelMatrix * instanceMatrix;
        vec4 wp = m * vec4(position, 1.0);
        vT = -position.y; // 0 꼭대기 → 1 바닥
        vC = aCC;
        vN = mat3(m) * vec3(position.x, 0.0, position.z); // 꼭대기 점은 길이 0 — 조각에서 안전하게 나눈다
        vV = cameraPosition - wp.xyz;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uFogDensity;
      varying float vT; varying vec4 vC; varying vec3 vN; varying vec3 vV; varying float vFogDepth;
      void main() {
        float ndv = abs(dot(vN / max(length(vN), 1e-4), vV / max(length(vV), 1e-4)));
        float a = pow(ndv, 1.6) * (1.0 - vT) * smoothstep(0.0, 0.12, vT) * vC.a;
        float f = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.6);
        gl_FragColor = vec4(vC.rgb * a * f, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,transparent:!0,depthWrite:!1,blending:2,side:2})}function Ap(e,t){return new wa({uniforms:{uAtlas:{value:t},uTime:e.uTime,uFogColor:e.uFogColor,uFogDensity:e.uFogDensity},vertexShader:`
      attribute vec4 aUV;
      attribute vec4 aCol; // rgb, 깜빡임 씨앗
      varying vec2 vUv;
      varying vec4 vCol;
      varying float vFogDepth;
      void main() {
        vUv = aUV.xy + uv * aUV.zw;
        vCol = aCol;
        vec4 mv = viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform sampler2D uAtlas; uniform float uTime; uniform vec3 uFogColor; uniform float uFogDensity;
      varying vec2 vUv;
      varying vec4 vCol;
      varying float vFogDepth;
      void main() {
        vec3 t = texture2D(uAtlas, vUv).rgb;
        float fl = vCol.a > 0.5 ? (0.85 + 0.15 * step(0.12, fract(sin(floor(uTime * 9.0 + vCol.a * 7.0) * 12.9898) * 43758.5))) : 1.0;
        float f = clamp(1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8), 0.0, 1.0);
        gl_FragColor = vec4(t * vCol.rgb * fl * (1.0 - f), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,transparent:!0,depthWrite:!1,blending:2,side:2})}function jp(e){let t=[];if(typeof document>`u`)return{tex:null,entries:t,fontOk:!1};let n=2048,r=2048,i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`);a.fillStyle=`#000`,a.fillRect(0,0,n,r);let o=8,s=8,c=e=>{o+e>2040&&(o=8,s+=150);let t={x:o,y:s,w:e,h:138};return o+=e+10,t};pd.texts.forEach((i,o)=>{let s=pd.neon[o%pd.neon.length];a.font=`100px ${pd.font}`;let l=e?a.measureText(i).width:60*i.length,u=c(Math.ceil(l+70));a.save(),a.shadowColor=s,a.shadowBlur=16,a.strokeStyle=s,a.lineWidth=7,a.beginPath(),a.roundRect(u.x+8,u.y+8,u.w-16,u.h-16,18),a.stroke(),e&&(a.fillStyle=`#ffffff`,a.textBaseline=`middle`,a.textAlign=`center`,a.shadowBlur=22,a.fillText(i,u.x+u.w/2,u.y+u.h/2+6),a.shadowBlur=0,a.fillStyle=s,a.globalAlpha=.35,a.fillText(i,u.x+u.w/2,u.y+u.h/2+6)),a.restore(),t.push({kind:`neon`,text:i,color:s,uv:[u.x/n,1-(u.y+u.h)/r,u.w/n,u.h/r],aspect:u.w/u.h})});for(let i=101;i<=118;i++){let o=`${i}동`;a.font=`110px ${pd.font}`;let s=e?a.measureText(o).width:200,l=c(Math.ceil(s+30));e&&(a.fillStyle=`#e8e4da`,a.textBaseline=`middle`,a.textAlign=`center`,a.fillText(o,l.x+l.w/2,l.y+l.h/2+6)),t.push({kind:`dong`,text:o,uv:[l.x/n,1-(l.y+l.h)/r,l.w/n,l.h/r],aspect:l.w/l.h})}o=8,s+=160,[`치킨`,`약국`,`노래방`,`편의점`,`부동산`,`커피`,`호프`,`분식`,`세탁`,`국밥`,`PC방`,`당구장`].forEach((i,c)=>{let l=pd.neon[c%pd.neon.length],u=i===`PC방`?[`PC`,`방`]:[...i],d=130*u.length+30;o+140>2040&&(o=8,s+=560);let f={x:o,y:s,w:140,h:d};o+=150,a.save(),a.fillStyle=`rgba(20, 22, 30, 1)`,a.fillRect(f.x+6,f.y+6,f.w-12,f.h-12),a.shadowColor=l,a.shadowBlur=12,a.strokeStyle=l,a.lineWidth=6,a.strokeRect(f.x+8,f.y+8,f.w-16,f.h-16),e&&(a.font=`${u[0]===`PC`?72:100}px ${pd.font}`,a.fillStyle=`#ffffff`,a.textBaseline=`middle`,a.textAlign=`center`,u.forEach((e,t)=>a.fillText(e,f.x+f.w/2,f.y+15+130*(t+.5)+6))),a.restore(),t.push({kind:`vert`,text:i,color:l,uv:[f.x/n,1-(f.y+f.h)/r,f.w/n,f.h/r],aspect:f.w/f.h})});let l=new ra(i);return l.colorSpace=Re,l.anisotropy=4,l.generateMipmaps=!0,{tex:l,entries:t,fontOk:e}}var Mp=new vi(new Uint8Array([0,0,0,255]),1,1,D);Mp.needsUpdate=!0;var Np=new en,Pp=new At,Fp=new At,Ip=new G,Lp=new G,Rp=new K,zp=new G(0,1,0),Bp=new G(0,0,1),Vp=new G(1,0,0),Hp=1500,Up=2,Wp={building:14e3,struct:2200,glow:2600,sign:900,barge:16,cyl:900,halo:2200,refl:2600,cone:1200,car:Hp,tree:4200},Gp=class{constructor(e,t,n=800,r=40){this.mesh=e,this.attrs=[e.instanceMatrix,...t],this.R=n,this.step=r,this.n=0,this.last=null}snapshot(e){this.n=e,this.master=this.attrs.map(t=>t.array.slice(0,e*t.itemSize));let t=this.master[0];this.cx=new Float32Array(e),this.cz=new Float32Array(e);for(let n=0;n<e;n++)this.cx[n]=t[n*16+12],this.cz[n]=t[n*16+14];this.last=null}update(e,t,n=!1){if(!this.master||!n&&this.last&&Math.hypot(e-this.last[0],t-this.last[1])<this.step)return;this.last=[e,t];let r=this.R*this.R,i=0;for(let n=0;n<this.n;n++){let a=this.cx[n]-e,o=this.cz[n]-t;if(!(a*a+o*o>r)){for(let e=0;e<this.attrs.length;e++){let t=this.attrs[e].itemSize,r=this.master[e],a=this.attrs[e].array;for(let e=0;e<t;e++)a[i*t+e]=r[n*t+e]}i++}}this.mesh.count=i;for(let e of this.attrs)e.needsUpdate=!0;this.shown=i}},Kp=class{constructor(e,t){this.scene=e,this.group=new kn,e.add(this.group);let n=t?t.uniforms:{uLPos:{value:Array.from({length:up},()=>new Yt)},uLCol:{value:Array.from({length:up},()=>new Yt)}};this.shared={uFogColor:{value:new K},uFogDensity:{value:.002},uCityGlow:{value:new K},uAmbient:{value:new K(.05,.055,.08)},uTime:{value:0},uLPos:n.uLPos,uLCol:n.uLCol,uBlank:{value:Mp}};let r=new sa(1,1,1);r.translate(0,.5,0),this.buildingMat=hp(this.shared),this.buildings=new Ai(r,this.buildingMat,Wp.building),this.infoAttr=new Si(new Float32Array(Wp.building*4),4),r.setAttribute(`aInfo`,this.infoAttr),this.buildings.frustumCulled=!1,this.group.add(this.buildings);let i=new sa(1,1,1);this.structMat=gp(this.shared),this.structs=new Ai(i,this.structMat,Wp.struct),this.structs.instanceColor=new Si(new Float32Array(Wp.struct*3),3),this.feAttr=new Si(new Float32Array(Wp.struct*2).fill(1),2).setUsage(We),i.setAttribute(`aFE`,this.feAttr),this.structs.frustumCulled=!1,this.group.add(this.structs);let a=new ca(.5,.5,1,8,1);this.cyls=new Ai(a,this.structMat,Wp.cyl),this.cyls.instanceColor=new Si(new Float32Array(Wp.cyl*3),3),this.cylFE=new Si(new Float32Array(Wp.cyl*2).fill(1),2).setUsage(We),a.setAttribute(`aFE`,this.cylFE),this.cyls.frustumCulled=!1,this.group.add(this.cyls);let o=new pa(1,1),s=new Fo;s.index=o.index,s.setAttribute(`position`,o.attributes.position),this.haloP=new Si(new Float32Array(Wp.halo*4),4).setUsage(We),this.haloC=new Si(new Float32Array(Wp.halo*4),4).setUsage(We),s.setAttribute(`aHP`,this.haloP),s.setAttribute(`aHC`,this.haloC),s.instanceCount=0,s.boundingSphere=new Cr(new G,1e6),this.halos=new ii(s,Sp(this.shared)),this.halos.frustumCulled=!1,this.halos.renderOrder=4,this.group.add(this.halos),this.glowMat=new Kr({color:16777215}),this.glow=new Ai(new sa(1,1,1),this.glowMat,Wp.glow),this.glow.instanceColor=new Si(new Float32Array(Wp.glow*3),3),this.glow.instanceMatrix.setUsage(We),this.glow.frustumCulled=!1,this.group.add(this.glow);{let e=new pa(1,1),t=e.attributes.position.array,n=[];for(let e of[-1,1])for(let r=0;r<t.length;r+=3)n.push(t[r],t[r+1],e);let r=Array.from(e.index.array),i=new Fo;i.setIndex([...r,...r.map(e=>e+4)]),i.setAttribute(`position`,new q(n,3)),this.carA=new Si(new Float32Array(Wp.car*4),4),this.carB=new Si(new Float32Array(Wp.car*4),4),this.carC=new Si(new Float32Array(Wp.car*4),4),i.setAttribute(`aA`,this.carA),i.setAttribute(`aB`,this.carB),i.setAttribute(`aC`,this.carC),i.instanceCount=0,i.boundingSphere=new Cr(new G,1e6),this.carMesh=new ii(i,wp(this.shared)),this.carMesh.frustumCulled=!1,this.carMesh.renderOrder=3,this.group.add(this.carMesh);let a=new sa(1,1,1);a.translate(0,.5,-.5);let o=new Fo;o.setIndex(a.index),o.setAttribute(`position`,a.attributes.position),o.setAttribute(`normal`,a.attributes.normal),o.setAttribute(`aA`,this.carA),o.setAttribute(`aB`,this.carB),o.setAttribute(`aC`,this.carC),o.instanceCount=0,o.boundingSphere=new Cr(new G,1e6),this.carBody=new ii(o,Tp(this.shared)),this.carBody.frustumCulled=!1,this.carBody.renderOrder=2,this.group.add(this.carBody)}{let e=e=>{let t=new pa(5,5.4);return t.rotateY(e),t.translate(0,6.3,0),t},t=new ca(.13,.2,4.4,4,1,!0);t.translate(0,2.2,0);let n=[];for(let e=0;e<t.attributes.position.count;e++)n.push(.02,.02);t.setAttribute(`uv`,new q(n,2));let r=new jr;{let n=[],i=[];for(let r of[e(0).toNonIndexed(),e(Math.PI/2).toNonIndexed(),t.toNonIndexed()])n.push(...r.attributes.position.array),i.push(...r.attributes.uv.array);r.setAttribute(`position`,new q(n,3)),r.setAttribute(`uv`,new q(i,2))}this.treeTris=r.attributes.position.count/3;let i=new Kr({map:Dp(),alphaTest:.42,side:2,fog:!0});this.trees=new Ai(r,i,Wp.tree),this.trees.instanceColor=new Si(new Float32Array(Wp.tree*3),3),this.trees.frustumCulled=!1,this.trees.count=0,this.group.add(this.trees)}this.bargeMat=new Oa({color:1381915}),this.barges=new Ai(new sa(1,1,1),this.bargeMat,Wp.barge),this.barges.frustumCulled=!1,this.group.add(this.barges),this.groundMat=_p(this.shared),this.ground=new ii(new pa(1,1),this.groundMat),this.ground.rotation.x=-Math.PI/2,this.group.add(this.ground);{let e=new la(1,1,10,1,!0);e.translate(0,-.5,0),this.coneCC=new Si(new Float32Array(Wp.cone*4),4),e.setAttribute(`aCC`,this.coneCC),this.cones=new Ai(e,kp(this.shared),Wp.cone),this.cones.instanceMatrix.setUsage(We),this.cones.frustumCulled=!1,this.cones.renderOrder=3,this.cones.count=0,this.group.add(this.cones)}{let e=new pa(1,1),t=new Fo;t.index=e.index,t.setAttribute(`position`,e.attributes.position),this.reflP=new Si(new Float32Array(Wp.refl*4),4),this.reflC=new Si(new Float32Array(Wp.refl*4),4),t.setAttribute(`aRP`,this.reflP),t.setAttribute(`aRC`,this.reflC),t.instanceCount=0,t.boundingSphere=new Cr(new G,1e6);let n=this.groundMat.uniforms;this.refl=new ii(t,Cp(this.shared,n.uMask,n.uMaskBox)),this.refl.frustumCulled=!1,this.refl.renderOrder=2,this.group.add(this.refl)}this.ribbonMat=vp(this.shared),this.roadMat=vp(this.shared,!0),this.roadMat.polygonOffset=!0,this.roadMat.polygonOffsetFactor=-2,this.roadMat.polygonOffsetUnits=-4,this.roadMat.side=2,this.roads=null,this.ribbon=null,this.ridgeMat=bp(this.shared),this.ridge=null,this.farCardMat=xp(this.shared),this.farCards=null,this.skyMat=yp(this.shared),this.sky=new ii(new ma(1500,32,16),this.skyMat),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,e.add(this.sky),this.hemi=new mo(8425664,3153944,1.2),this.dir=new No(13160703,.45),this.dir.position.set(-.38,.42,-.82),e.add(this.hemi,this.dir),this.fog=new Ln(0,.002),e.fog=this.fog,this.signs=null,this.atlas=null,this.fontOk=!1,this.cars=[],this.launchers=[],this.lampXZ=[],this.crowdSpots=[],this.course=null,this.lowSpec=!1}useAssets(e){let t=this.buildingMat.uniforms;if(e.rooms&&(t.uRoom.value=e.rooms,t.uRoomOn.value=1),e.sky&&e.sky[0]&&e.sky[1]){let t=this.farCardMat.uniforms;t.uSkyA.value=e.sky[0],t.uSkyB.value=e.sky[1],t.uSkyOn.value=1}if(e.facades&&e.facades.length===3&&e.facades.every(Boolean)&&(e.facades.forEach((e,n)=>{t[`uFC${n}`].value=e.color,t[`uFE${n}`].value=e.emis}),t.uFacadeOn.value=1),e.ground&&e.ground.asph&&e.ground.pave){let t=this.roadMat.uniforms;t.uAsph.value=e.ground.asph,t.uAsphR.value=e.ground.asphR||e.ground.asph,t.uPave.value=e.ground.pave,t.uTexOn.value=1}this.fontOk=!!e.font,this._makeAtlas(),this.course&&this._buildSigns()}_makeAtlas(){this.atlas&&this.atlas.fontOk===this.fontOk||(this.atlas&&this.atlas.tex&&this.atlas.tex.dispose(),this.atlas=jp(this.fontOk),this.atlas.tex&&this.signs&&(this.signs.material.uniforms.uAtlas.value=this.atlas.tex))}setLowSpec(e){this.lowSpec=e,this.groundMat.uniforms.uReflect.value=+!e}makeEnv(e){if(!e||this.env)return this.env;try{let t=new Rn,n=new wa({side:1,uniforms:{uTop:{value:new K(659504)},uLow:{value:new K(6963248)}},vertexShader:`varying vec3 vD; void main(){ vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 uTop; uniform vec3 uLow; varying vec3 vD; void main(){ float h = normalize(vD).y; vec3 c = mix(uLow, uTop, smoothstep(-0.05, 0.5, h)); if (h < 0.0) c = uLow * 0.25; gl_FragColor = vec4(c, 1.0); }`});t.add(new ii(new ma(50,32,16),n));let r=new Kr({color:new K(2.2,1.5,.9)}),i=new Kr({color:new K(.9,1.2,2)});for(let e=0;e<26;e++){let n=e/26*Math.PI*2,a=new ii(new sa(Q(2,6),Q(.5,2.5),.5),e%3?r:i);a.position.set(Math.cos(n)*40,Q(.5,4),Math.sin(n)*40),a.lookAt(0,a.position.y,0),t.add(a)}let a=new Os(e);this.env=a.fromScene(t,.03).texture,a.dispose()}catch{this.env=null}return this.env}get crowdGroundY(){return 1.25}build(e,t){this.stage=e,this.course=t;let n=this.shared;n.uFogColor.value.set(e.fog.color),n.uFogDensity.value=e.fog.density,n.uCityGlow.value.set(e.cityGlow),this.fog.color.set(e.fog.color),this.fog.density=e.fog.density;let r=this.skyMat.uniforms;r.uTop.value.set(e.sky.top),r.uBottom.value.set(e.sky.bottom);let i=this.groundMat.uniforms;i.uWaterCol.value.set(e.groundColor),i.uLandCol.value.set(e.landColor).multiplyScalar(.6),i.uSkyLow.value.set(e.sky.bottom),i.uSkyTop.value.set(e.sky.top),i.uLamp.value.set(e.lampColor),this.ribbonMat.uniforms.uLamp.value.set(e.lampColor),this.roadMat.uniforms.uLamp.value.set(e.lampColor),this.roadMat.uniforms.uSkyLow.value.set(e.sky.bottom),this.launchers=[],this.crowdSpots=[],this.cars=[],this.avLights=[],this._crossN=0,this.crosses=0,this._signRefl=!1,this._bi=0,this._si=0,this._gi=0,this._bai=0,this._ci=0,this._hi=0,this._ri=0,this._ki=0,this.search=[],this.structOf=[],this.cylOf=[],this.signList=[],this.lines=[],this.lots=[],this._layout(),this._buildMask(),this._buildOcc(),this._buildRibbons(),this._buildRoads(),this._buildBridges(),this._buildCity(),this._buildFar(),this._buildRidge(),this._buildFarCards(),this._buildBarges(),this._buildLamps(),this._buildCars(),this._buildTrees(),this._makeAtlas(),this._buildSigns(),this._checkEnds(),this._dilateOcc(),this.buildings.count=this._bi,this.buildings.instanceMatrix.needsUpdate=!0,this.infoAttr.needsUpdate=!0,this.nearB=new Gp(this.buildings,[this.infoAttr],650),this.nearB.snapshot(this._bi),this.trees&&(this.nearT=new Gp(this.trees,this.trees.instanceColor?[this.trees.instanceColor]:[],420),this.nearT.snapshot(this.trees.count)),this.nearC=new Gp(this.cyls,[this.cyls.instanceColor,this.cylFE],600),this.nearC.snapshot(this._ci),this.structs.count=this._si,this.structs.instanceMatrix.needsUpdate=!0,this.structs.instanceColor.needsUpdate=!0,this.feAttr.needsUpdate=!0,this.glowStatic=this._gi,this.haloStatic=this._hi,this.coneStatic=this._ki,this.cones.count=Math.min(this._ki+Up,Wp.cone),this.cones.instanceMatrix.needsUpdate=!0,this.coneCC.needsUpdate=!0,this.refl.geometry.instanceCount=this._ri,this.reflP.needsUpdate=!0,this.reflC.needsUpdate=!0,this.cyls.count=this._ci,this.cyls.instanceMatrix.needsUpdate=!0,this.cyls.instanceColor.needsUpdate=!0,this.cylFE.needsUpdate=!0,this.barges.count=this._bai,this.barges.instanceMatrix.needsUpdate=!0;let a=Uu.trib;this.search=[{x:a.x-a.hw-8,z:120,ph:Math.random()*6.28,side:-1},{x:a.x+a.hw+8,z:-260,ph:Math.random()*6.28,side:1}],this.update(0,null,0,0)}_layout(){let e=this.course,t=Uu,n=e.segs[e.segs.length-1],r=n.th,i=Math.sin(r),a=-Math.cos(r),o=e.xz(n.a,t.main.off,{}),s={x:o.x-i*t.main.back,z:o.z-a*t.main.back,th:r};this.main={path:new ip([[t.main.back+t.main.ahead,0]],s,0,2),hw:t.main.hw,fx:i,fz:a,rx:Math.cos(r),rz:Math.sin(r)};let c=(t.trib.x-o.x)/i,l=o.z+a*c;this.tribEnd=l,this.trib={path:new ip([[t.trib.zTop-l,0]],{x:t.trib.x,z:t.trib.zTop,th:0},0,2),hw:t.trib.hw,len:t.trib.zTop-l},this.rivers=[this.trib,this.main]}_mainUV(e,t){let n=this.main,r=n.path.segs[0],i=e-r.x,a=t-r.z;return{s:i*n.fx+a*n.fz,u:i*n.rx+a*n.rz}}_mainXZ(e,t){let n=this.main.path.segs[0],r=this.main;return{x:n.x+r.fx*e+r.rx*t,z:n.z+r.fz*e+r.rz*t}}bankDist(e,t){let n=this._mainUV(e,t),r=Math.abs(n.u)-this.main.hw,i=this.trib,a=Math.max(this.tribEnd,Math.min(Uu.trib.zTop,t)),o=Math.hypot(e-Uu.trib.x,t-a)-i.hw;return t>=this.tribEnd-5&&(r=Math.min(r,o)),r}isWater(e,t){return this.bankDist(e,t)<0}terrainY(e,t){return Jp(this.bankDist(e,t))}surfaceY(e,t){let n=this.occ;if(n){let r=Math.floor((e-n.x0)/n.cell),i=Math.floor((t-n.z0)/n.cell);if(r>=0&&i>=0&&r<n.n&&i<n.n){let e=n.h[i*n.n+r];if(e>0)return e}}return Math.max(0,this.terrainY(e,t))}_buildMask(){let e=this.course,t=1/0,n=-1/0,r=1/0,i=-1/0;for(let a=0;a<e.n;a+=10)t=Math.min(t,e.X[a]),n=Math.max(n,e.X[a]),r=Math.min(r,e.Z[a]),i=Math.max(i,e.Z[a]);let a=Math.max(n-t,i-r)+2e3,o=(t+n)/2-a/2,s=(r+i)/2-a/2,c=a/768,u=new Float32Array(589824);for(let e=0;e<768;e++)for(let t=0;t<768;t++){let n=o+(t+.5)*c,r=s+(e+.5)*c;u[e*768+t]=+(this.bankDist(n,r)<0)}let d=(e,t)=>{let n=new Float32Array(589824),r=new Float32Array(589824);for(let r=0;r<768;r++){let i=0;for(let n=-t;n<=t;n++)i+=e[r*768+Math.max(0,Math.min(767,n))];for(let a=0;a<768;a++)n[r*768+a]=i/(2*t+1),i+=e[r*768+Math.min(767,a+t+1)]-e[r*768+Math.max(0,a-t)]}for(let e=0;e<768;e++){let i=0;for(let r=-t;r<=t;r++)i+=n[Math.max(0,Math.min(767,r))*768+e];for(let a=0;a<768;a++)r[a*768+e]=i/(2*t+1),i+=n[Math.min(767,a+t+1)*768+e]-n[Math.max(0,a-t)*768+e]}return r},f=d(u,1),p=d(u,7),m=new Uint8Array(2359296);for(let e=0;e<589824;e++){m[e*4]=Math.round(f[e]*255);let t=u[e]>.5?1-p[e]:0;m[e*4+1]=Math.round(Math.min(1,t*2.2)*255),m[e*4+3]=255}this.maskTex&&this.maskTex.dispose();let h=new vi(m,768,768,D);h.magFilter=l,h.minFilter=l,h.needsUpdate=!0,this.maskTex=h,this.maskInfo={ox:o,oz:s,size:a,R:768,water:u};let g=this.groundMat.uniforms;g.uMask.value=h,g.uMaskBox.value.set(o,s,a,a),this.ground.scale.set(a+3e3,a+3e3,1),this.ground.position.set(o+a/2,0,s+a/2)}_buildOcc(){let e=this.maskInfo,t=Math.ceil(e.size/10),n={x0:e.ox,z0:e.oz,cell:10,n:t,t:new Uint8Array(t*t),h:new Float32Array(t*t)};for(let e=0;e<t;e++)for(let r=0;r<t;r++){let i=n.x0+(r+.5)*10,a=n.z0+(e+.5)*10,o=this.bankDist(i,a);n.t[e*t+r]=o<0?1:o<34?4:0}this.occ=n}_dilateOcc(){let e=this.occ,t=e.n,n=e.t.slice();for(let r=0;r<t;r++)for(let i=0;i<t;i++){let a=r*t+i;if(n[a]!==0)continue;let o=!1;for(let e=-2;e<=2&&!o;e++)for(let a=-2;a<=2&&!o;a++){let s=i+a,c=r+e;if(s<0||c<0||s>=t||c>=t)continue;let l=n[c*t+s];(l===3||l===2)&&(o=!0)}o&&(e.t[a]=6)}}_occMark(e,t,n,r=0,i=0){let a=this.occ,o=a.cell;for(let s=-i;s<=i+1e-6;s+=o*.5)for(let c=-i;c<=i+1e-6;c+=o*.5){let i=Math.floor((e+s-a.x0)/o),l=Math.floor((t+c-a.z0)/o);if(i<0||l<0||i>=a.n||l>=a.n)continue;let u=l*a.n+i;(n===3||a.t[u]===0||a.t[u]===4)&&(a.t[u]=n),r>a.h[u]&&(a.h[u]=r)}}_buildRibbons(){this.ribbon&&(this.group.remove(this.ribbon),this.ribbon.geometry.dispose());let e=[],t=[],n=[],r=[],i=this.trib,a=this.main,o=i.len,s=(i,a,o,s)=>{for(let c of[-1,1]){let l=e.length/3,u=0,d={},f=[];for(let r=a;r<=o;r+=10){i.path.at(r,d);for(let[a,o,l]of qp){let u=c*(i.hw+a),p=d.x+Math.cos(d.th)*u,m=d.z+Math.sin(d.th)*u;e.push(p,o,m),t.push(l[0],l[1],l[2]),n.push(r,a),f.push(s(p,m,a))}u++}let p=qp.length;for(let e=0;e<u-1;e++)for(let t=0;t<p-1;t++){let n=l+e*p+t,i=n+p,a=e*p+t;f[a]&&f[a+1]&&f[a+p]&&f[a+p+1]&&(c>0?r.push(n,i,n+1,n+1,i,i+1):r.push(n,n+1,i,n+1,i+1,i))}}};s(a,0,a.path.sMax,(e,t)=>!(Math.abs(e-Uu.trib.x)<i.hw+1&&t>this.tribEnd-10)),s(i,0,o,(e,t)=>Math.abs(this._mainUV(e,t).u)>a.hw+qp[qp.length-1][0]-1);let c=new jr;c.setAttribute(`position`,new q(e,3)),c.setAttribute(`color`,new q(t,3)),c.setAttribute(`aSU`,new q(n,2)),c.setIndex(r),c.computeBoundingSphere(),this.ribbon=new ii(c,this.ribbonMat),this.ribbon.frustumCulled=!1,this.group.add(this.ribbon)}_addLine(e,t,n,r=`road`,i=2.5){let a={name:e,pts:t,half:n,kind:r,walk:i};return this.lines.push(a),a}_layoutRoads(){let e=this.course,t=Uu,n=this.trib,r=this.main,i=t.trib.x,a=22.5,o=i-n.hw-a,s=i+n.hw+a,c=r.hw+a,l=-(r.hw+a),u=t.roadFar,d=(e,t)=>Math.max(0,this.terrainY(e,t))+.05,f=(e,t,n=null)=>[e,n===null?d(e,t):n,t],p=e=>{let t=(e-r.path.segs[0].x-r.rx*c)/r.fx;return this._mainXZ(t,c)},m=p(o),h=p(s);this.roadPts={xW:o,xE:s,uN:c,uS:l,jW:m,jE:h},this._addLine(`지류 서쪽 강변도로`,[f(o,t.trib.zTop),f(m.x,m.z)],6.5),this._addLine(`지류 동쪽 강변도로`,[f(s,t.trib.zTop),f(h.x,h.z)],6.5);{let e=this._mainXZ(0,c),t=this._mainXZ(r.path.sMax,c);this._addLine(`본류 도심쪽 강변도로(서)`,[f(e.x,e.z),f(m.x,m.z)],6.5),this._addLine(`본류 도심쪽 강변도로(동)`,[f(h.x,h.z),f(t.x,t.z)],6.5);let n=this._mainXZ(0,l),i=this._mainXZ(r.path.sMax,l);this._addLine(`본류 건너편 강변도로`,[f(n.x,n.z),f(i.x,i.z)],6.5)}{let t=[],n=Hu(180),i=Hu(485),a=e.xz(n,0,{});t.push(f(o,a.z));for(let r=n;r<=i;r+=5){let n=e.xz(r,0,{});t.push(f(n.x,n.z))}let s=e.xz(i,0,{}),l=e.at(i,{}).th,u=Math.sin(l),d=-Math.cos(l),p=this._mainUV(s.x,s.z),m=u*r.rx+d*r.rz,h=(c-p.u)/m;for(let e=1;e<=4;e++){let n={x:s.x+u*h*(e/4),z:s.z+d*h*(e/4)};t.push(f(n.x,n.z))}this._addLine(`대로`,t,10.6,`avenue`,4.2)}{let r=e.xz(Vu.bridges[0].s,0,{}).z,a=Vu.bridges[0].underside+1.2,o=i-n.hw-15,s=i+n.hw+15,c=a/t.rampGrade,l=[f(-u-500,r),f(o-c,r),[o,a,r],[s,a,r],f(s+c,r),f(u+i,r)];this.bridgeA={z:r,xa:o,xb:s,top:a,ramp:c},this._addLine(`다리 A 와 동서 거리`,l,7,`bridge`)}{let n=e.xz(Vu.bridges[1].s,0,{}),i=this._mainUV(n.x,n.z).s,a=Vu.bridges[1].underside+1.2,s=-(r.hw+15),c=r.hw+15,l=a/.12,d=a/t.rampGrade,p=this._mainXZ(i,c+l),m=(o-p.x)/r.rx,h={x:o,z:p.z+r.rz*m},g=this._mainXZ(i,s),_=this._mainXZ(i,c),v=this._mainXZ(i,s-d),y=this._mainXZ(i,-u);this.bridgeB={s:i,ua:s,ub:c,top:a,ramp:l,rampS:d},this._addLine(`다리 B 와 남북 거리`,[f(h.x,h.z),f(p.x,p.z),[_.x,a,_.z],[g.x,a,g.z],f(v.x,v.z),f(y.x,y.z)],7,`bridge`)}{let t=this.bridgeA.z;for(let n of[400,462]){let r=Hu(n),i=e.xz(r,0,{});this._addLine(`골목 북 s${r}`,[f(i.x,i.z),f(i.x,t)],4.5)}for(let t of[250,420]){let n=Hu(t),i=e.xz(n,0,{}),a=(this._mainUV(i.x,i.z).u-c)/r.rz;this._addLine(`골목 남 s${n}`,[f(i.x,i.z),f(i.x,i.z-a)],4.5)}}}_buildRoads(){this._layoutRoads(),this.roads&&(this.group.remove(this.roads),this.roads.geometry.dispose());let e=[],t=[],n=[],r=[],i=[.028,.028,.034],a=[.05,.05,.056],o=[],s=[];for(let s of this.lines){let c=this._densify(s.pts,10),l=0,u=s.walk,d=.15,f=[[-s.half-u,d,a],[-s.half,d,a],[-s.half,0,i],[s.half,0,i],[s.half,d,a],[s.half+u,d,a]],p=s.kind===`avenue`?1:s.kind===`bridge`?2:0,m=null;for(let i=0;i<c.length;i++){let a=c[i],u=c[Math.min(c.length-1,i+1)],d=c[Math.max(0,i-1)],h=u[0]-d[0],g=u[2]-d[2],_=Math.hypot(h,g)||1;h/=_,g/=_,m&&(l+=Math.hypot(a[0]-m[0],a[2]-m[2])),m=a;let v=e.length/3;for(let[r,i,c]of f)e.push(a[0]-g*r,a[1]+.02+i,a[2]+h*r),t.push(c[0],c[1],c[2]),n.push(l,r),o.push(s.half,p);if(i>0)for(let e=0;e<f.length-1;e++){let t=v-f.length+e,n=v+e;this._raised(a)||this._raised(c[i-1])||r.push(t,n,t+1,t+1,n,n+1)}this._raised(a)?this._occMark(a[0],a[2],5,a[1],s.half):this._occMark(a[0],a[2],2,0,s.half)}}let c=new jr;c.setAttribute(`position`,new q(e,3)),c.setAttribute(`color`,new q(t,3)),c.setAttribute(`aSU`,new q(n,2)),c.setAttribute(`aRK`,new q(o,2)),c.setIndex(r),c.computeBoundingSphere();let l=this.lines.find(e=>e.kind===`avenue`);if(l){let e=this._densify(l.pts,6),t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+Math.hypot(e[n][0]-e[n-1][0],e[n][2]-e[n-1][2]));for(let n of this.lines){if(!n.name.startsWith(`골목`))continue;let r=n.pts[0],i=0,a=1/0;for(let t=0;t<e.length;t++){let n=Math.hypot(e[t][0]-r[0],e[t][2]-r[2]);n<a&&(a=n,i=t)}a<12&&s.push(t[i]-(n.half+n.walk+3),t[i]+(n.half+n.walk+3))}}let u=this.roadMat.uniforms.uCross.value;for(let e=0;e<8;e++)u[e]=e<s.length?s[e]:-1e5;this.crossAt=s.slice(0,8),this.roads=new ii(c,this.roadMat),this.roads.frustumCulled=!1,this.group.add(this.roads)}_raised(e){return e[1]-(Math.max(0,this.terrainY(e[0],e[2]))+.05)>1}_densify(e,t){let n=[];for(let r=0;r<e.length-1;r++){let i=e[r],a=e[r+1],o=Math.hypot(a[0]-i[0],a[2]-i[2]),s=Math.max(1,Math.ceil(o/t));for(let e=0;e<s;e++){let t=e/s,r=i[0]+(a[0]-i[0])*t,o=i[2]+(a[2]-i[2])*t,c=i[1]+(a[1]-i[1])*t,l=Math.max(0,this.terrainY(r,o))+.05;n.push([r,i[1]>1.6||a[1]>1.6?Math.max(c,l):l,o])}}return n.push(e[e.length-1]),n}_worldMatrix(e,t,n,r,i,a,o,s=0,c=0){return Ip.set(e,t,n),Pp.setFromAxisAngle(zp,r),s&&(Fp.setFromAxisAngle(Vp,s),Pp.multiply(Fp)),c&&(Fp.setFromAxisAngle(Bp,c),Pp.multiply(Fp)),Lp.set(i,a,o),Np.compose(Ip,Pp,Lp)}_addStructW(e,t,n,r,i,a,o,s,c=0,l=0,u=0){if(this._si>=Wp.struct)return;let d=this._si++;this.structs.setMatrixAt(d,this._worldMatrix(e,t,n,r,i,a,o,l,u)),Rp.set(s),this.structs.setColorAt(d,Rp),this.feAttr.setXY(d,1,c),this.structOf[d]=-1}_addCylW(e,t,n,r,i,a,o,s=0,c=0){if(this._ci>=Wp.cyl)return;let l=this._ci++;this.cyls.setMatrixAt(l,this._worldMatrix(e,t,n,c,r,i,a)),Rp.set(o),this.cyls.setColorAt(l,Rp),this.cylFE.setXY(l,1,s),this.cylOf[l]=-1}_addBuildingWorld(e,t,n,r,i,a,o,s,c=1,l=0,u=null){if(this._bi>=Wp.building)return-1;let d=this._bi++;return Ip.set(e,l,t),Pp.setFromAxisAngle(zp,n),Lp.set(r,a,i),this.buildings.setMatrixAt(d,Np.compose(Ip,Pp,Lp)),this.infoAttr.setXYZW(d,u===null?Math.floor(Math.random()*97):u,o,s,c),d}_addCone(e,t,n,r,i,a,o=1,s=-1,c=0,l=0){if(s<0&&this._ki>=Wp.cone-Up)return-1;let u=s>=0?s:this._ki++;return u>=Wp.cone?-1:(Ip.set(e,t,n),Pp.setFromEuler(new dn(c,0,l)),Lp.set(i,r,i),this.cones.setMatrixAt(u,Np.compose(Ip,Pp,Lp)),this.coneCC.setXYZW(u,a[0],a[1],a[2],o),u)}_addRefl(e,t,n,r,i){if(this._ri>=Wp.refl)return;let a=this._ri++;this.reflP.setXYZW(a,e,t,n,r),this.reflC.setXYZW(a,i[0],i[1],i[2],Math.random())}_addPool(e,t,n,r,i){if(this._ri>=Wp.refl)return;let a=this._ri++;this.reflP.setXYZW(a,e,n,0,r),this.reflC.setXYZW(a,i[0],i[1],i[2],4+Math.min(.99,Math.max(0,t)/4))}_addRoadRefl(e,t,n,r,i,a){if(this._ri>=Wp.refl)return;let o=this._ri++;this.reflP.setXYZW(o,e,n,r,i),this.reflC.setXYZW(o,a[0],a[1],a[2],2+Math.min(.99,Math.max(0,t)/4))}_addHalo(e,t,n,r,i,a=1,o=-1){let s=o>=0?o:this._hi++;return s>=Wp.halo?-1:(this.haloP.setXYZW(s,e,t,n,r),this.haloC.setXYZW(s,i[0],i[1],i[2],a),s)}_addGlow(e,t,n,r,i,a,o,s=0){if(this._gi>=Wp.glow)return-1;let c=this._gi++;return Ip.set(e,t,n),Pp.setFromAxisAngle(zp,s),Lp.set(r,i,a),this.glow.setMatrixAt(c,Np.compose(Ip,Pp,Lp)),Rp.setRGB(o[0],o[1],o[2]),this.glow.setColorAt(c,Rp),c}_buildBridges(){let e=[4739166,4867666],t=[[.35,.8,1.6],[.7,.45,1.5]],n=3421756,r=(r,i,a,o,s,c,l,u,d,f)=>{let p=Math.atan2(-s,o),m=e=>({x:i+o*e,z:a+s*e}),h=-s,g=o,_=l-c,v=m((c+l)/2),y=e[r],b=u+.3,x=u+8.5;this._addStructW(v.x,u-.6,v.z,p,_,1.2,14,n);for(let e of[-1,1])this._addStructW(v.x+h*e*6.8,u+.45,v.z+g*e*6.8,p,_,.25,.25,3156e3,3);for(let e of[-1,1]){let n=h*e*6.6,i=g*e*6.6;this._addStructW(v.x+n,b,v.z+i,p,_,.6,.6,y),this._addStructW(v.x+n,x,v.z+i,p,_,.6,.6,y);for(let e=c;e<l-1;e+=8){let t=m(e);this._addStructW(t.x+n,(b+x)/2,t.z+i,p,.5,x-b,.5,y);let r=Math.round((e-c)/8)%2==0?1:-1,a=Math.hypot(8,x-b),o=Math.atan2((x-b)*r,8),s=m(e+4);this._addStructW(s.x+n,(b+x)/2,s.z+i,p,a,.45,.45,y,0,0,o)}let a=t[r];this._addStructW(v.x+n,x+.42,v.z+i,p,_,.18,.18,new K(a[0]*.3,a[1]*.3,a[2]*.3).getHex(),1.6)}for(let e=c;e<l;e+=16){let t=m(e);this._addStructW(t.x,x,t.z,p,.4,.4,13.2,y)}for(let e of[-4.6,-1.6,1.6,4.6])this._addStructW(v.x+h*e,u-1.55,v.z+g*e,p,_,.7,.4,2895412);for(let e=c+3;e<l-3;e+=6){let t=m(e);this._addStructW(t.x,u-1.4,t.z,p,.35,.4,13.4,3158586)}for(let e of[-3.1,0,3.1])this._addStructW(v.x+h*e,u-1.28,v.z+g*e,p,_,.06,.16,5913624,1.6);for(let e=c+4;e<l-4;e+=9){let t=m(e);this._addHalo(t.x,u-1.6,t.z,3.2,[.32,.2,.08])}for(let e=c+22;e<l-10;e+=24){let t=m(e);this.isWater(t.x,t.z)&&(this.course.nearest(t.x,t.z).d<18||(this._addCylW(t.x,(u-1.8)/2,t.z,2.2,u-1.8,6.5,4868946,0,p),this._addStructW(t.x,u-2.2,t.z,p,2.8,1,15,3947844),this._addCylW(t.x,1.25,t.z,2.7,.25,7,2760726,.9,p)))}for(let[e,t,r]of[[c,d,-1],[l,f,1]]){let i=m(e),a=Math.max(0,this.terrainY(i.x,i.z));this._addStructW(i.x,(u+a)/2-.6,i.z,p,3,u-a,15,3816e3);let o=m(e+r*t),s=Math.max(0,this.terrainY(o.x,o.z)),c=m(e+r*t/2),l=u-s,d=Math.hypot(t,l),f=Math.atan2(l,t)*-r;this._addStructW(c.x,(u+s)/2-.6,c.z,p,d,1.2,14,n,0,0,f);for(let e of[-1,1])this._addStructW(c.x+h*e*6.7,(u+s)/2+.3,c.z+g*e*6.7,p,d,.9,.3,4540238,0,0,f);for(let n=12;n<t-6;n+=14){let i=m(e+r*n),a=u-l*n/t-1.2,o=Math.max(0,this.terrainY(i.x,i.z));a-o<1.5||this._addStructW(i.x,(a+o)/2,i.z,p,1.6,a-o,4,4079686)}}for(let e=c+6;e<l-6;e+=9){let n=m(e);if(!this.isWater(n.x,n.z))continue;let i=t[r];this._addRefl(n.x+h*6.5,n.z+g*6.5,34,1.1,[i[0]*.09,i[1]*.09,i[2]*.09])}},i=this.bridgeA;r(0,0,i.z,1,0,i.xa,i.xb,i.top,i.ramp,i.ramp);let a=this.bridgeB,o=this._mainXZ(a.s,0);r(1,o.x,o.z,this.main.rx,this.main.rz,a.ua,a.ub,a.top,a.rampS,a.ramp)}_buildCity(){let e=this.course,t=Uu;this.occ;let n=1/0,r=-1/0,i=1/0,a=-1/0;for(let t=-320;t<=lp();t+=10){let o=e.xz(t,0,{});n=Math.min(n,o.x),r=Math.max(r,o.x),i=Math.min(i,o.z),a=Math.max(a,o.z)}n-=t.fill,r+=t.fill,i-=t.fill,a+=t.fill;let o=(e,t,n)=>{for(let r of this.lines)for(let i=0;i<r.pts.length-1;i++){let a=r.pts[i],o=r.pts[i+1];if(Yp(e,t,a[0],a[2],o[0],o[2])<r.half+r.walk+.5+n)return!0}return!1},s=0;for(let c=n;c<r;c+=26)for(let n=i;n<a;n+=26){let r=c+Q(-3,3),i=n+Q(-3,3),a=e.nearest(r,i);if(a.d>t.fill+20)continue;let l=this.bankDist(r,i);if(l<36)continue;let u=Math.max(-40,Math.min(Vu.length+20,a.s)),d=e.zoneAt(u),f=e.at(u,{}),p=a.d<230?-f.th:Math.round(-f.th/(Math.PI/2))*(Math.PI/2),m=Q(14,21),h=Q(12,19),g=Math.hypot(m,h)/2;if(o(r,i,g))continue;let _=e.center(u),v=Math.abs(a.u)-g,y=300;if(a.s>-60&&a.s<Vu.length+60&&v<t.clearU&&(y=_-Vu.ellipse.v-3),y<5)continue;let b=2,x,S=Q(.25,.75),C=Math.abs(a.u);if((d.id===`canyon`||d.id===`avenue`||d.id===`climb`&&u<Hu(380))&&C<120&&a.d<125)b=1,x=Q(48,112)*(C<60?1:.8),m=Q(18,26),h=Q(16,24);else if((d.id===`climb`||d.id===`roof`)&&C<170){b=Math.random()<.3?1:2;let e=_-Vu.ellipse.v-Q(3.5,9);x=C<70?e:Q(Math.max(10,e-6),e+14),m=Q(16,24),h=Q(14,22),S=Q(.35,.6)}else if(l<140){if(b=0,x=Math.round(Q(36,66)/2.8)*2.8+1.4,m=Q(40,56),h=Q(13,15),Math.random()<.35&&(m=Q(22,26),h=Q(10,12)),o(r,i,Math.hypot(m,h)/2))continue}else if(b=Math.random()<.55?0:2,x=b===0?Math.round(Q(30,60)/2.8)*2.8+1.4:Q(10,28),b===0&&(m=Q(36,50),h=Q(13,15),o(r,i,Math.hypot(m,h)/2)))continue;if(x=Math.min(x,y),x<5)continue;let w=Math.max(0,this.terrainY(r,i)),T=Q(.85,1.15),E=this._addBuildingWorld(r,i,p,m,h,x+w,b,S,T);b===0&&m<30&&this._addBuildingWorld(r,i,p+Math.PI/2,m,h,x+w,b,S,T,0,E>=0?this.infoAttr.getX(E):null),this.lots.push({x:r,z:i,w:m,d:h,h:x+w,kind:b,yaw:p}),this._occMark(r,i,3,x+w,Math.min(m,h)/2);let D=x+w,O=Math.cos(p),k=Math.sin(p),A=(e,t)=>({x:r+O*e+k*t,z:i-k*e+O*t});if(b===0){let e=A(Q(-m*.3,m*.3),0);this._addBuildingWorld(e.x,e.z,p,Q(6,9),Math.min(h*.6,8),3.2,3,0,1,D);let t=m>30?2:1;for(let e=0;e<t;e++){let t=A((e===0?-1:1)*m*Q(.18,.36),Q(-h*.15,h*.15));this._addBuildingWorld(t.x,t.z,p,Q(4.5,6.5),Q(4.5,6),Q(4.5,6.5),3,0,1,D)}this._addBuildingWorld(r,i,p,m+.25,h+.25,1.1,3,0,1,D),this.signList.push({x:r,z:i,yaw:p,w:m,d:h,top:D,kind:`dong`,n:s++,size:8})}else if(D<45||d.id===`roof`||d.id===`climb`){let e=1+Math.floor(Math.random()*2);for(let t=0;t<e;t++){let e=A(Q(-m*.3,m*.3),Q(-h*.3,h*.3)),t=Q(1.4,2.2);this._addCylW(e.x,D+1.4,e.z,t*2,2.8,t*2,5658718),this._addCylW(e.x,D+3,e.z,t*2.05,.3,t*2.05,3948100)}let t=3+Math.floor(Math.random()*4);for(let e=0;e<t;e++){let e=A(Q(-m*.4,m*.4),Q(-h*.4,h*.4));this._addBuildingWorld(e.x,e.z,p+Q(-.1,.1),Q(1.2,1.8),Q(.8,1.2),1,3,0,1,D)}if(Math.random()<.55){let e=A(Q(-m*.3,m*.3),Q(-h*.3,h*.3)),t=Q(5,11);this._addBuildingWorld(e.x,e.z,0,.25,.25,t,3,0,1,D);let n=this._addGlow(e.x,D+t+.2,e.z,.35,.35,.35,[.55,.02,.05]);n>=0&&(this.avLights||=[]).push(n)}if(this._addBuildingWorld(r,i,p,m+.3,h+.3,.9,3,0,1,D),b===2&&Math.random()<.5&&this.signList.push({x:r,z:i,yaw:p,w:m,d:h,top:D,kind:`neon`}),b===2&&a.d>25&&(this._crossN=(this._crossN||0)+1)%8==0){let e=D+Q(4,6),t=[.6,.05,.06];this._addGlow(r,e,i,.25,3,.25,t,p),this._addGlow(r,e+.55,i,1.6,.25,.25,t,p),this._addBuildingWorld(r,i,p,.3,.3,e-1.5-D,3,0,1,D),this.crosses=(this.crosses||0)+1}}b===2&&a.d<260&&D>7&&(this.signList.push({x:r,z:i,yaw:p,w:m,d:h,top:D,kind:`band`}),D>12&&Math.random()<.6&&this.signList.push({x:r,z:i,yaw:p,w:m,d:h,top:D,kind:`vert`,side:Math.random()<.5?-1:1})),(d.id!==`canyon`||Math.random()<.3)&&this.launchers.push({x:r,y:D+.5,z:i,kind:`roof`})}let c=this.trib;for(let e=260;e>-40;e-=.6)if(!(Math.random()>.85)&&!(Math.abs(e-this.bridgeA.z)<10))for(let t of[-1,1]){if(Math.random()<.4)continue;let n=Uu.trib.x+t*(c.hw+Q(3,14));this.crowdSpots.push(n,e,Math.random())}let l=Hu(640);for(let t=0;t<Vu.length+40-l;t+=.6){if(Math.random()>.8)continue;let n=e.xz(l+t,0,{}),r=this._mainUV(n.x,n.z),i=this._mainXZ(r.s,this.main.hw+Q(3,14));this.bridgeB&&Math.abs(r.s-this.bridgeB.s)<10||this.crowdSpots.push(i.x,i.z,Math.random())}}_buildFar(){let e=this.course,t=this.maskInfo,n=t.ox+t.size/2,r=t.oz+t.size/2,i=0;for(let t=0;t<1400&&i<190;t++){let t=Q(0,Math.PI*2),a=Q(360,1350),o=n+Math.cos(t)*a,s=r+Math.sin(t)*a;if(this.bankDist(o,s)<40)continue;let c=e.nearest(o,s);if(c.d<Uu.fill+15)continue;let l=Math.random()<.5?-e.at(Math.max(e.sMin,Math.min(e.sMax,c.s)),{}).th:Q(0,Math.PI),u=Math.floor(Q(3,7)),d=Q(40,90);for(let e=0;e<u;e++){let t=(e-u/2)*Q(30,40),n=o-Math.sin(l)*t,r=s+Math.cos(l)*t;if(this.bankDist(n,r)<40)continue;let i=Math.round(d*Q(.8,1.2)/2.8)*2.8+1.4;this._addBuildingWorld(n,r,l,Q(45,70),Q(13,16),i,Math.random()<.85?0:1,Q(.25,.75),Q(.9,1.2)),this._occMark(n,r,3,i,8),Math.random()<.5&&this.launchers.push({x:n,y:i+1,z:r,kind:`roof`}),e===0&&this._addHalo(n,i*.55,r,i*.9,[.06,.045,.03])}i++}}_buildRidge(){this.ridge&&(this.group.remove(this.ridge),this.ridge.geometry.dispose());let e=this.maskInfo,t=e.ox+e.size/2,n=e.oz+e.size/2,r=[],i=[],a=[];for(let[e,o,s,c]of[[1700,60,170,.3],[1500,30,110,2.1]]){let l=r.length/3;for(let a=0;a<=220;a++){let l=a/220*Math.PI*2,u=o+(s-o)*(.5+.3*Math.sin(l*3+c)+.15*Math.sin(l*7.3+c*2)+.05*Math.sin(l*17+c)),d=t+Math.cos(l)*e,f=n+Math.sin(l)*e;r.push(d,-5,f,d,u,f),i.push(a/220,0,a/220,1)}for(let e=0;e<220;e++){let t=l+e*2;a.push(t,t+2,t+1,t+1,t+2,t+3)}}let o=new jr;o.setAttribute(`position`,new q(r,3)),o.setAttribute(`uv`,new q(i,2)),o.setIndex(a),this.ridgeMat.side=2,this.ridge=new ii(o,this.ridgeMat),this.ridge.frustumCulled=!1,this.ridge.renderOrder=-5,this.group.add(this.ridge)}_buildFarCards(){this.farCards&&(this.group.remove(this.farCards),this.farCards.geometry.dispose());let e=this.maskInfo,t=e.ox+e.size/2,n=e.oz+e.size/2,r=[],i=[],a=[];{let e=1300;for(let o=0;o<Math.PI*2-1e-6;o+=Math.PI/90){let s=o+Math.PI/90,c=[t+Math.cos(o)*e,n+Math.sin(o)*e],l=[t+Math.cos(s)*e,n+Math.sin(s)*e];if(this.course.nearest((c[0]+l[0])/2,(c[1]+l[1])/2).d<1e3)continue;let u=r.length/3;r.push(c[0],-5,c[1],l[0],-5,l[1],c[0],150,c[1],l[0],150,l[1]),i.push(3,o*e,0,3,s*e,0,3,o*e,1,3,s*e,1),a.push(u,u+1,u+2,u+2,u+1,u+3)}}[[600,0],[900,1],[1300,2]].forEach(([e,o])=>{let s=Math.random()*.05;for(;s<Math.PI*2;){let c=Q(2,5)*Math.PI/180,l=Q(40,90)*(Math.random()<.15?.55:1),u=Math.min(Math.PI*2,s+c),d=e*Q(.97,1.03),f=[t+Math.cos(s)*d,n+Math.sin(s)*d],p=[t+Math.cos(u)*d,n+Math.sin(u)*d],m=[450,700,1e3][o];if(this.course.nearest((f[0]+p[0])/2,(f[1]+p[1])/2).d<m){s=u;continue}let h=r.length/3;r.push(f[0],-5,f[1],p[0],-5,p[1],f[0],l,f[1],p[0],l,p[1]);let g=s*d,_=u*d;i.push(o,g,0,o,_,0,o,g,1,o,_,1),a.push(h,h+1,h+2,h+2,h+1,h+3),s=u}});let o=new jr;o.setAttribute(`position`,new q(r,3)),o.setAttribute(`aF`,new q(i,3)),o.setIndex(a),this.farCardMat.side=2,this.farCards=new ii(o,this.farCardMat),this.farCards.frustumCulled=!1,this.farCards.renderOrder=-4,this.group.add(this.farCards)}_buildBarges(){let e=Uu.trib;for(let[t,n,r,i]of[[e.x+38,150,12,5],[e.x+42,-110,14,5.5],[e.x-20,-230,11,4.5]]){if(this._bai>=Wp.barge)break;let e=this._bai++;this.barges.setMatrixAt(e,this._worldMatrix(t,.25,n,0,i,.5,r)),this._addGlow(t,.75,n,.25,.25,.25,[.95,.85,.6]),this._addHalo(t,.85,n,1.6,[.3,.25,.16]);for(let e=0;e<6;e++)this._addBuildingWorld(t-i*.2,n-r*.35+e*r*.12,0,.32,.32,.95,3,0,1,.5);this.launchers.push({x:t,y:1.5,z:n,kind:`barge`})}}_buildLamps(){let e=new K(this.stage.lampColor),t=[e.r*1.8,e.g*1.8,e.b*1.8];for(let n of this.lines){let r=this._densify(n.pts,30);for(let i=0;i<r.length-1;i++){let a=r[i];if(this._raised(a))continue;let o=r[i+1],s=o[0]-a[0],c=o[2]-a[2],l=Math.hypot(s,c)||1;s/=l,c/=l;let u=this.course.nearest(a[0],a[2]);if(!(u.d>900))for(let r of[-1,1]){let i=n.half+1.2,o=a[0]-c*r*i,l=a[2]+s*r*i,d=a[1]+7;if(this._addGlow(o,d,l,.6,.25,.6,t),(this.lampXZ||=[]).push([o,l]),this._addBuildingWorld(o,l,0,.22,.22,7,3,0,1,a[1]),this._addHalo(o,d,l,2.6,[e.r*.55,e.g*.45,e.b*.32]),u.d<420&&this._addCone(o,d-.1,l,6.7,3.2,[e.r*.07,e.g*.055,e.b*.035]),u.d<600){let t=a[0]-c*r*(n.half-1.5),i=a[2]+s*r*(n.half-1.5);this._addPool(t,a[1]+.2,i,5.5,[e.r*.16,e.g*.12,e.b*.08]),Math.random()<.55&&this._addRoadRefl(a[0]-c*r*(n.half-2.2),a[1]+.07,a[2]+s*r*(n.half-2.2),Q(6,10),.6,[e.r*.3,e.g*.24,e.b*.15])}}}}for(let t of this.rivers){let n={};for(let r=0;r<t.path.sMax;r+=30)if(t.path.at(r,n),!(this.course.nearest(n.x,n.z).d>700))for(let r of[-1,1]){let i=r*(t.hw-1.5),a=n.x+Math.cos(n.th)*i,o=n.z+Math.sin(n.th)*i;this.isWater(a,o)&&this._addRefl(a,o,26,.9,[e.r*.22,e.g*.18,e.b*.12])}}}_buildCars(){let e=this.course,t=[];for(let n of this.lines){let r=n.name.includes(`강변도로`)?150:n.kind===`avenue`?120:n.kind===`bridge`?60:0;if(!r)continue;let i=this._densify(n.pts,40),a=[],o=0;for(let e=1;e<i.length;e++)(Math.hypot(i[e][0]-i[o][0],i[e][2]-i[o][2])>=150||e===i.length-1)&&(a.push([i[o],i[e]]),o=e);let s=a.filter(([t,n])=>{for(let r of[0,.25,.5,.75,1]){let i=t[0]+(n[0]-t[0])*r,a=t[1]+(n[1]-t[1])*r,o=t[2]+(n[2]-t[2])*r,s=e.nearest(i,o);if(s.d>1100||s.d<40&&a+1>e.center(Math.max(e.sMin,Math.min(e.sMax,s.s)))-Vu.ellipse.v-3)return!1}return!0}),c=s.reduce((e,[t,n])=>e+Math.hypot(n[0]-t[0],n[2]-t[2]),0);if(!(!s.length||c<1))for(let[e,i]of s){let a=Math.hypot(i[0]-e[0],i[2]-e[2]),o=Math.max(1,Math.round(r*a/c));t.push({L:n,p:e,q:i,len:a,n:o})}}let n=0;for(let e of t){let t=(e.q[0]-e.p[0])/e.len,r=(e.q[2]-e.p[2])/e.len,i=e.n;for(;i>0&&n<Wp.car;){let a=Math.min(i,3+Math.floor(Math.random()*4)),o=Math.random()<.5?1:-1,s=Math.max(1,Math.floor((e.L.half-.6)/3.3)),c=o*(.225+3.3*(1+Math.floor(Math.random()*s)-.5)),l=Math.random(),u=Q(14,22);for(let i=0;i<a&&n<Wp.car;i++){let a=o>0?e.p:e.q,s=o>0?e.q:e.p,d=-r*c,f=t*c;this.carA.setXYZW(n,a[0]+d,a[1]+.65,a[2]+f,(l+i*Q(9,16)/e.len)%1),this.carB.setXYZW(n,s[0]+d,s[1]+.65,s[2]+f,u/e.len);let p=Op(e.L)&&Math.random()<.1?1:0;this.carC.setXYZW(n,Q(4,6),.35,Q(.8,1),p),n++}i-=a}}this.carMesh.geometry.instanceCount=n,this.carBody.geometry.instanceCount=n,this.carA.needsUpdate=!0,this.carB.needsUpdate=!0,this.carC.needsUpdate=!0,this.carCount=n}_buildTrees(){let e=this.course,t=0;for(let n of this.lines){if(!(n.kind===`avenue`||n.name.includes(`강변도로`)))continue;let r=this._densify(n.pts,9);for(let i=0;i<r.length-1&&t<Wp.tree;i++){let a=r[i];if(this._raised(a))continue;let o=r[i+1],s=o[0]-a[0],c=o[2]-a[2],l=Math.hypot(s,c)||1;s/=l,c/=l;for(let r of[-1,1]){let o=n.half+n.walk-1,l=a[0]-c*r*o,u=a[2]+s*r*o,d=e.nearest(l,u);if(d.d>700||this.isWater(l,u))continue;let f=Q(.85,1.2);if(d.s>-60&&d.s<Vu.length+60&&Math.abs(d.u)<Uu.clearU+2){let t=e.center(Math.max(e.sMin,Math.min(e.sMax,d.s)))-Vu.ellipse.v-3-a[1];if(t<3.5)continue;f=Math.min(f,t/6.2)}if(!(Math.abs(i*9%30-0)<3)&&(this._treeAt(t++,l,a[1]+.15,u,f),t>=Wp.tree))break}}}for(let n of this.lines){if(n.kind!==`avenue`)continue;let r=this._densify(n.pts,12);for(let n=0;n<r.length&&t<Wp.tree;n++){let i=r[n];if(this._raised(i)||n%5==0)continue;let a=e.nearest(i[0],i[2]),o=Q(.8,1.05);if(a.s>-60&&a.s<Vu.length+60&&Math.abs(a.u)<Uu.clearU+2){let t=e.center(Math.max(e.sMin,Math.min(e.sMax,a.s)))-Vu.ellipse.v-3-i[1];if(t<4)continue;o=Math.min(o,t/9)}this._treeAt(t++,i[0],i[1]+.15,i[2],o)}}this.trees.count=t,this.trees.instanceMatrix.needsUpdate=!0,this.trees.instanceColor&&(this.trees.instanceColor.needsUpdate=!0),this.treeCount=t}_treeAt(e,t,n,r,i){this.trees.setMatrixAt(e,this._worldMatrix(t,n,r,Q(0,6.28),i,i*Q(.9,1.1),i));let a=0;for(let e of this.lampXZ||[]){let n=Math.hypot(e[0]-t,e[1]-r);n<12&&(a=Math.max(a,1-n/12))}let o=Q(.85,1.15);this.trees.setColorAt(e,Rp.setRGB((.32+1.1*a)*o,(.42+.75*a)*o,(.3+.32*a)*o))}_buildSigns(){if(!this.atlas||!this.atlas.tex)return;if(!this.signs){let e=new pa(1,1);e.setAttribute(`aUV`,new Si(new Float32Array(Wp.sign*4),4)),e.setAttribute(`aCol`,new Si(new Float32Array(Wp.sign*4),4)),this.signs=new Ai(e,Ap(this.shared,this.atlas.tex),Wp.sign),this.signs.frustumCulled=!1,this.signs.renderOrder=3,this.group.add(this.signs)}this.signs.material.uniforms.uAtlas.value=this.atlas.tex;let e=this.atlas.entries.filter(e=>e.kind===`neon`),t=this.atlas.entries.filter(e=>e.kind===`dong`),n=this.atlas.entries.filter(e=>e.kind===`vert`),r=this.signs.geometry.attributes.aUV,i=this.signs.geometry.attributes.aCol,a=0;for(let o of this.signList){if(a>=Wp.sign)break;if(o.kind===`band`||o.kind===`vert`){let t=Math.cos(o.yaw),s=Math.sin(o.yaw),c=this.course.nearest(o.x,o.z).u>0?-1:1,l=o.yaw+(c>0?0:Math.PI),u=Math.max(0,this.terrainY(o.x,o.z));if(o.kind===`band`){let n=dp(e),i=.9,d=Math.min(o.w*.8,i*n.aspect*1.6),f=c*(o.d/2+.12);this.signs.setMatrixAt(a,this._worldMatrix(o.x+s*f,u+4.1,o.z+t*f,l,d,i,1)),r.setXYZW(a,n.uv[0],n.uv[1],n.uv[2],n.uv[3])}else{let e=dp(n);if(!e)continue;let i=Math.min(o.top-u-6,Q(4.5,6.5)),d=i*e.aspect,f=c*(o.d/2+.7),p=o.side*(o.w/2-1.2);this.signs.setMatrixAt(a,this._worldMatrix(o.x+t*p+s*f,u+6.5+i/2,o.z-s*p+t*f,l+Math.PI/2,d,i,1)),r.setXYZW(a,e.uv[0],e.uv[1],e.uv[2],e.uv[3])}let d=new K((o.kind,dp(pd.neon))),f=.2126*d.r+.7152*d.g+.0722*d.b,p=.5;i.setXYZW(a,(f+(d.r-f)*.8)*p+.06,(f+(d.g-f)*.8)*p+.06,(f+(d.b-f)*.8)*p+.06,0),a++;continue}let s=o.kind===`neon`?dp(e):t[o.n%t.length],c=o.kind===`neon`?Q(2.6,3.4):o.size*.42,l=c*s.aspect,u=Math.cos(o.yaw),d=Math.sin(o.yaw),f=this.course.nearest(o.x,o.z).u>0?-1:1,p=f*(o.d/2+(o.kind===`neon`?-1.2:.15)),m=o.x+d*p,h=o.z+u*p,g=o.kind===`neon`?o.top+c/2+.3:o.top-5,_=o.yaw+(f>0?0:Math.PI);if(this.signs.setMatrixAt(a,this._worldMatrix(m,g,h,_,l,c,1)),r.setXYZW(a,s.uv[0],s.uv[1],s.uv[2],s.uv[3]),o.kind===`neon`){let e=new K(s.color),t=Math.random()<.2,n=t?.62:.5,r=t?.06:.04;i.setXYZW(a,r+e.r*n,r+e.g*n,r+e.b*n,0)}else i.setXYZW(a,.42,.4,.37,0);a++}this.signs.count=a,this.signs.instanceMatrix.needsUpdate=!0,r.needsUpdate=!0,i.needsUpdate=!0}launcherNear(e,t,n){let r=null,i=n*n;for(let n of this.launchers){let a=(n.x-e)**2+(n.z-t)**2;a<i&&(i=a,r=n)}return r}_checkEnds(){let e=this.course,t=[];for(let n of this.lines)for(let r of[n.pts[0],n.pts[n.pts.length-1]]){let i=null;for(let e of this.lines)if(e!==n){for(let t=0;t<e.pts.length-1;t++){let n=e.pts[t],a=e.pts[t+1];if(Yp(r[0],r[2],n[0],n[2],a[0],a[2])<8&&Math.abs(r[1]-(n[1]+a[1])/2)<2.5+Math.abs(n[1]-a[1])){i=e.name;break}}if(i)break}let a=1/0;for(let t=-320;t<=lp();t+=5){let n=e.xz(t,0,this._ce||={});a=Math.min(a,Math.hypot(n.x-r[0],n.z-r[2]))}let o=a>Uu.roadFar-300;t.push({name:n.name,end:r.map(e=>+e.toFixed(1)),joined:i,dCourse:+a.toFixed(0),status:i?`붙음`:o?`안개 너머`:`끊김`})}return this.endReport=t,this.openEnds=t.filter(e=>e.status!==`붙음`).map(e=>e.end),t}endpointReport(){return this.endReport||this._checkEnds()}checkView(e){let t=this._cv||=new G,n=0;for(let r of this.openEnds||[])t.set(r[0],r[1],r[2]),!(t.distanceTo(e.position)>700)&&(t.project(e),t.z<1&&Math.abs(t.x)<1&&Math.abs(t.y)<1&&n++);let r=this.occ,i=this._cd||=new G;e.getWorldDirection(i);let a=Math.atan2(i.x,-i.z),o=Math.atan(Math.tan(e.fov*Math.PI/360)*e.aspect),s=0,c=0;for(let t=0;t<=20;t++){let n=a-o+2*o*t/20,i=Math.sin(n),l=-Math.cos(n),u=0;for(let t=20;t<=250;t+=5){let n=e.position.x+i*t,a=e.position.z+l*t,o=Math.floor((n-r.x0)/r.cell),d=Math.floor((a-r.z0)/r.cell);if(o<0||d<0||o>=r.n||d>=r.n){c++;break}let f=r.t[d*r.n+o];if(f===0){if(u+=5,u>=60){s++;break}}else if(f===3||f===5)break;else u=0}}return{openEnds:n,empty:s,mapEnd:c}}updateFades(){}_siCount(){return this.structs.count}update(e,t,n=0,r=0){if(this.shared.uTime.value=n,t&&this.sky.position.copy(t.position),t&&this.nearB&&(this.nearB.update(t.position.x,t.position.z),this.nearT&&this.nearT.update(t.position.x,t.position.z),this.nearC&&this.nearC.update(t.position.x,t.position.z)),!this.course)return;if(this.search&&this.search.length){let e=this.coneStatic||0;for(let t of this.search){let r=t.ph+n*.25*t.side;this._addCone(t.x,1.5,t.z,420,16,[.05,.055,.07],1,e++,Math.PI+Math.sin(r)*.45,Math.cos(r*.8)*.4)}this.cones.instanceMatrix.needsUpdate=!0}let i=this.glowStatic||0,a=this.haloStatic||0;if(this.avLights&&this.avLights.length){let e=this.calm?1:.9+.1*Math.sin(n*Math.PI);for(let t of this.avLights)Rp.setRGB(.55*e,.02*e,.05*e),this.glow.setColorAt(t,Rp)}this.glow.count=i,this.halos.geometry.instanceCount=a,this.haloP.needsUpdate=!0,this.haloC.needsUpdate=!0,this.glow.instanceMatrix.needsUpdate=!0,this.glow.instanceColor&&(this.glow.instanceColor.needsUpdate=!0)}},qp=[[-5,-.4,[.05,.05,.06]],[.5,1.2,[.07,.07,.08]],[2,1.2,[.02,.035,.025]],[16,1.2,[.022,.04,.028]],[16.5,1.3,[.03,.03,.035]],[29,1.3,[.03,.03,.035]],[30,1,[.025,.024,.03]],[60,.6,[.022,.022,.028]],[150,.02,[.02,.02,.025]]];function Jp(e){if(e<=qp[0][0])return-.4;for(let t=0;t<qp.length-1;t++){let[n,r]=qp[t],[i,a]=qp[t+1];if(e<=i)return r+(a-r)*(e-n)/(i-n)}return 0}function Yp(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s,l=c>0?((e-n)*o+(t-r)*s)/c:0;return l=Math.max(0,Math.min(1,l)),Math.hypot(e-(n+o*l),t-(r+s*l))}var Xp=8,Zp=1.35;function Qp(e,t,n,r,i,a,o,s){let c=new sa(e,t,n);c.translate(r,i,a);let l=c.attributes.position.count;return c.setAttribute(`aArm`,new _r(new Float32Array(l).fill(o),1)),c.setAttribute(`aHead`,new _r(new Float32Array(l).fill(s),1)),c.deleteAttribute(`uv`),c}function $p(){return Ud([Qp(.5,1.35,.28,0,.675,0,0,0),Qp(.3,.3,.3,0,1.55,0,0,1),Qp(.13,.66,.13,.33,1.02,0,1,0),Qp(.13,.66,.13,-.33,1.02,0,1,0)])}var em=`
attribute vec4 aInst;   // x, z: 세계 위치, y: 바라보는 방향(라디안), w: 위상
attribute vec2 aMisc;   // x: 키 배율, y: 휴대폰 불빛 여부
attribute float aArm;
attribute float aHead;
uniform float uTime;
uniform float uGroundY;
uniform float uHitTime;
uniform float uBigTime;
uniform float uMaxCheer;
uniform float uCheerR;
uniform vec4 uBursts[${Xp}];
varying float vPhone;
varying float vFogDepth;
varying float vShade;
void main() {
  vec3 base = vec3(aInst.x, uGroundY, aInst.z);
  float cy = cos(aInst.y), sy = sin(aInst.y);

  float cheer = 0.0;
  for (int i = 0; i < ${Xp}; i++) {
    vec4 b = uBursts[i];
    float age = uTime - b.w;
    if (age > 0.0 && age < 2.4) {
      float d = distance(base.xz, b.xz);
      float env = smoothstep(0.0, 0.25, age) * (1.0 - age / 2.4);
      cheer = max(cheer, exp(-d / uCheerR) * env);
    }
  }
  float hitAge = uTime - uHitTime;
  float big = (hitAge > 0.0 && hitAge < uBigTime) ? 1.0 - hitAge / uBigTime : 0.0;
  big = max(big, uMaxCheer);
  float amount = clamp(max(cheer, big), 0.0, 1.0);

  float hop = abs(sin(uTime * (5.5 + aInst.w * 2.5) + aInst.w * 6.2831));
  float jump = hop * (0.3 * cheer + 0.85 * big);

  vec3 p = position * aMisc.x;
  float sh = ${Zp.toFixed(2)} * aMisc.x;
  if (aArm > 0.5) {
    float up = clamp(amount * 1.6, 0.0, 1.0);
    p.y = mix(p.y, sh + (sh - p.y), up);
    p.x *= 1.0 + up * 0.35;
  }
  p.x += sin(uTime * 1.3 + aInst.w * 20.0) * 0.03 * p.y;
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  vec3 wp = base + p + vec3(0.0, jump, 0.0);

  vPhone = (aMisc.y > 0.5 && aArm > 0.5 && position.y < 1.0) ? amount : 0.0;
  vShade = 0.6 + 0.4 * aHead;
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,tm=`
uniform vec3 uColor;
uniform vec3 uFogColor;
uniform float uFogDensity;
varying float vPhone;
varying float vFogDepth;
varying float vShade;
void main() {
  vec3 col = uColor * vShade;
  col += vec3(1.6, 1.7, 2.0) * vPhone;
  float f = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
  col = mix(col, uFogColor, clamp(f, 0.0, 1.0) * (1.0 - vPhone * 0.6));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,nm=class{constructor(e,t){this.scene=e,this.geo=$p(),this.material=new wa({vertexShader:em,fragmentShader:tm,uniforms:{uTime:{value:0},uGroundY:{value:.6},uHitTime:{value:-100},uBigTime:{value:nd.bigCheerTime},uMaxCheer:{value:0},uCheerR:{value:nd.cheerRadius},uBursts:{value:Array.from({length:Xp},()=>new Yt(0,0,0,-100))},uColor:{value:new K(nd.color)},uFogColor:t.uFogColor,uFogDensity:t.uFogDensity}}),this.mesh=null,this.burstCursor=0}build(e,t,n=1500){this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry.dispose());let r=Math.floor(e.length/3),i=Math.max(1,Math.min(r,n)),a=this.geo.clone(),o=new Float32Array(i*4),s=new Float32Array(i*2);for(let t=0;t<i;t++){let n=Math.floor(t/i*r)*3;o[t*4]=e[n]+(Math.random()-.5)*.4,o[t*4+1]=Math.random()*Math.PI*2,o[t*4+2]=e[n+1]+(Math.random()-.5)*.4,o[t*4+3]=e[n+2],s[t*2]=.85+Math.random()*.3,s[t*2+1]=+(Math.random()<.12)}a.setAttribute(`aInst`,new Si(o,4)),a.setAttribute(`aMisc`,new Si(s,2)),this.mesh=new Ai(a,this.material,i),this.mesh.frustumCulled=!1,this.master=[o.slice(),s.slice()],this.attrs=[a.attributes.aInst,a.attributes.aMisc],this.nAll=i,this._last=null,this.scene.add(this.mesh);let c=this.material.uniforms;c.uGroundY.value=t,c.uHitTime.value=-100,c.uMaxCheer.value=0;for(let e of c.uBursts.value)e.set(0,0,0,-100)}addBurst(e,t){this.material.uniforms.uBursts.value[this.burstCursor].set(e.x,e.y,e.z,t),this.burstCursor=(this.burstCursor+1)%Xp}birdHit(e){this.material.uniforms.uHitTime.value=e}setMaxCheer(e){this.material.uniforms.uMaxCheer.value=e}update(e,t=null){if(this.material.uniforms.uTime.value=e,t&&this.mesh&&this.master){let e=t.position.x,n=t.position.z;if(this._last&&Math.hypot(e-this._last[0],n-this._last[1])<30)return;this._last=[e,n];let[r,i]=this.master,[a,o]=this.attrs,s=0;for(let t=0;t<this.nAll;t++){let c=r[t*4]-e,l=r[t*4+2]-n;if(!(c*c+l*l>78400)){for(let e=0;e<4;e++)a.array[s*4+e]=r[t*4+e];o.array[s*2]=i[t*2],o.array[s*2+1]=i[t*2+1],s++}}this.mesh.count=s,a.needsUpdate=!0,o.needsUpdate=!0,this.shown=s}}setVisible(e){this.mesh&&(this.mesh.visible=e)}},rm=.3,im=5.5,am=(e,t)=>e+Math.random()*(t-e),om=2.4,sm=Math.PI/180;function cm(e){let t,n,r,i;do t=Math.random()*2-1,n=Math.random()*2-1,r=Math.random()*2-1,i=t*t+n*n+r*r;while(i>1||i<.01);return i=Math.sqrt(i),e[0]=t/i,e[1]=n/i,e[2]=r/i,e}var lm=[[.4,.7,1.4],[.85,.4,1.4],[.4,1.3,.7],[.3,1.2,1.3]];function um(e,t,n=ud.hdrMax){let r=Math.max(e[0],e[1],e[2])*t,i=r>n?t*n/r:t;return[e[0]*i,e[1]*i,e[2]*i]}var dm=class{constructor(e,t=null){this.scene=e,this.sparks=new Hd(id.particlePool+zu.pool,{kind:`spark`}),this.smoke=new Hd(id.smokePool,{kind:`smoke`,lights:t}),e.add(this.sparks.mesh,this.smoke.mesh),this.pending=[],this.recent=[],this.glit=[],this.emitMult=1,this.lowSpec=!1,this.onBurst=null,this.onLaunch=null,this.smokeTint=[.07,.06,.08],this.palette=lm,this._dir=[0,0,0],this._v=new G,this.log={decor:0,maxHdr:0,colors:[]}}useAssets(e){this.smoke.useSmoke(e.smoke[0],e.smoke[1])}reset(){this.pending.length=0,this.recent.length=0,this.glit.length=0,this.sparks.clear(),this.smoke.clear()}setStage(e){this.palette=e.palette||lm}setLowSpec(e){this.lowSpec=e,this.emitMult=e?id.lowSpecParticleMult:1,this.sparks.emitMult=this.emitMult,this.sparks.limit=Math.floor((id.particlePool+zu.pool)*this.emitMult)}setPointScale(e,t,n){this.sparks.setScale(e,t,n),this.smoke.setScale(e,t,n),this.sparks.setScaleMax(id.maxSparkPx*(n/1080)),this.smoke.setScaleMax(id.maxSmokePx*(n/1080))}spawnDecorBand(e,t,n,r={}){if(this.bandAlive(e.id,t)>=e.max)return!1;let{camera:i,course:a,world:o}=n,s=i.position;i.getWorldDirection(this._v);let c=this._v;c.y=0,c.lengthSq()<1e-6&&c.set(0,0,-1),c.normalize();let l=e.id===`near`?[`peony`,`chrysanthemum`,`ring`,`peony`]:[`chrysanthemum`,`chrysanthemum`,`peony`,`willow`,`ring`,`finale`],u={};for(let i=0;i<16;i++){let i=l[Math.floor(Math.random()*l.length)],d=cd[i],f=am(e.dist[0],e.dist[1]),p=am(-ud.yawDeg,ud.yawDeg)*sm,m=Math.cos(p),h=Math.sin(p),g=c.x*m+c.z*h,_=-c.x*h+c.z*m,v=am(e.visR[0],e.visR[1]),y=am(ud.life[0],ud.life[1]),b=.5*d.gravity*Math.max(1,v/d.visR)*.55*y*y+(i===`willow`?v:0),x={x:s.x+g*f*.97,z:s.z+_*f*.97},S=(o&&o.launcherNear?o.launcherNear(x.x,x.z,e.id===`far`?120:45):null)||{x:x.x+am(-10,10),y:1,z:x.z+am(-10,10)},C=a?a.nearest(S.x,S.z,(n.camS||0)+f):{s:0,u:999},w=a?a.section(C.s,u):{u:16,v1:28};if(Math.abs(C.u)<w.u+ud.margin&&C.s>(n.camS||0)-20)continue;let T=Math.abs(C.u)-w.u-v*1.08-5>=ud.margin,E=S.y+am(22,55)*(e.id===`far`?1.8:e.id===`mid`?1.3:1);T||(E=Math.max(E,w.v1+ud.margin+v*1.08+b+am(0,10)));let D=new G(S.x+am(-4,4),E,S.z+am(-4,4)),O=D.distanceTo(s);if(O<e.dist[0]*.95||O>e.dist[1]*1.05)continue;let k=n.color||this.palette[Math.floor(Math.random()*this.palette.length)],A=r.flight??am(ud.rise[0],ud.rise[1]),j=t+A+(r.delay||0);return n.quiet&&n.quiet(j)?!1:(this._schedule(i,d,D,j,k,o,{launchPos:new G(S.x,S.y,S.z),flight:A,visR:v,size:am(e.size[0],e.size[1]),particles:this.lowSpec?ud.lowSpecParticles:Math.round(am(e.particles[0],e.particles[1])),life:y,band:e.id,clearS:C.s,clearU:C.u,lateral:T,drop:b}),!0)}return!1}bandAlive(e,t){let n=0;for(let t of this.pending)t.band===e&&n++;for(let r of this.recent)r.band===e&&r.until>t&&n++;return n}_schedule(e,t,n,r,i,a,o={}){let s=o.launchPos||new G(n.x,.6,n.z),c=Math.max(.25,o.flight??ld.maxRise);this.pending.push({key:e,spec:t,pos:n,time:r,color:i,visR:o.visR||t.visR||t.R,size:o.size||t.size||.5,particles:o.particles||0,life:o.life||0,launchPos:s,launchTime:r-c,flight:c,launched:!1,shellPos:s.clone(),shellVel:new G,smokeAcc:0,band:o.band||null,clearS:o.clearS,clearU:o.clearU,lateral:o.lateral,drop:o.drop||0})}update(e,t){let n=this.sparks,r=this.emitMult;for(let i=this.pending.length-1;i>=0;i--){let a=this.pending[i];if(!a.launched&&t>=a.launchTime){a.launched=!0;let e=Math.max(.05,a.time-t);a.shellVel.set((a.pos.x-a.launchPos.x)/e,(a.pos.y-a.launchPos.y+.5*im*e*e)/e,(a.pos.z-a.launchPos.z)/e),this.onLaunch&&this.onLaunch(a)}if(a.launched){a.shellVel.y-=im*e,a.shellPos.addScaledVector(a.shellVel,e);let t=a.shellVel,i=a.shellPos,o=ld.headColor,s=ld.headSize;n.emit(i.x,i.y,i.z,t.x,t.y,t.z,Math.max(.03,e*1.5),s,s,o[0],o[1],o[2],o[0],o[1],o[2],1,0,0,0,ld.headStreak);let c=um(a.color,1.1),l=Math.random()<r?2:1;for(let e=0;e<l;e++)n.emit(i.x,i.y,i.z,-t.x*.08+am(-1,1),-t.y*.08+am(-1.5,.3),-t.z*.08+am(-1,1),am(.35,.7),s*.45,s*.1,c[0],c[1],c[2],c[0]*.3,c[1]*.3,c[2]*.3,.9,2.5,2.5,2);if(a.smokeAcc+=e,a.smokeAcc>.06){a.smokeAcc=0;let e=this.smokeTint;this.smoke.emit(i.x,i.y,i.z,am(-.2,.2),am(0,.3),am(-.2,.2),am(1.6,2.4),2,7,.5,.4,.3,e[0],e[1],e[2],.22,.4,-.05,0)}}t>=a.time&&(this.pending.splice(i,1),this._burst(a,t))}for(let e=this.glit.length-1;e>=0;e--){let r=this.glit[e];if(t<r.t)continue;this.glit.splice(e,1);let i=Math.max(0,Math.min(r.n,Math.floor(n.limit*.75)-n.alive-Math.floor(zu.pool*this.emitMult*.5))),a=r.t-r.t0,o=r.visR*(1-Math.exp(-r.k*a)),s=.5*r.g*a*a,c=this._dir;for(let e=0;e<i;e++){cm(c);let e=o*(.55+Math.random()*.45);Vd(n,r.pos.x+c[0]*e,r.pos.y+c[1]*e-s,r.pos.z+c[2]*e,c[0]*.6,c[1]*.6,c[2]*.6,Y.look.embers,Math.random,r.size,r.c,r.end,.7)}}n.update(e),this.smoke.update(e)}_burst(e,t){let{key:n,spec:r,pos:i,color:a}=e,o={key:n,spec:r,pos:i.clone(),t0:t,threat:!1,color:a,visR:e.visR,band:e.band,life:e.life,clearS:e.clearS,clearU:e.clearU,lateral:e.lateral,drop:e.drop};this.recent.push({band:e.band,until:t+(e.life||2.5)}),this.recent.length>40&&this.recent.splice(0,this.recent.length-40);let s=this.sparks,c=id.sparkJitter,l=um(a,om),u=[l[0]*.35,l[1]*.35,l[2]*.35];this.log.decor++,this.log.maxHdr=Math.max(this.log.maxHdr,l[0],l[1],l[2]),this.log.colors.length<400&&this.log.colors.push(a);let d=e.visR,f=e.size,p=(t,n)=>e.life?e.life*am(.85,1.1):am(t,n),m=Math.max(1,d/(r.visR||r.R))*.55,h=e.particles||r.particles;h=Math.max(0,Math.min(h,Math.floor(s.limit*.75)-s.alive-Math.floor(zu.pool*this.emitMult*.5)));let g=Math.min(d*rm,ud.tailMax),_=this._dir,v=(e,t,n,r,a,o,l,u,d,f,p)=>{let m=am(1-c,1+c),h=s.emit(i.x,i.y,i.z,e,t,n,r,a,o,Math.min(ud.hdrMax,l[0]*m),Math.min(ud.hdrMax,l[1]*m),Math.min(ud.hdrMax,l[2]*m),u[0]*m,u[1]*m,u[2]*m,1,d,f,p,am(1-c,1+c));return h>=0&&s.setTail(h,Math.min(ud.tailMax,g*am(1-c,1+c))),h};if(s.emit(i.x,i.y,i.z,0,0,0,.1,f*3,f*5,l[0]*.5+.4,l[1]*.5+.4,l[2]*.5+.4,l[0]*.4,l[1]*.4,l[2]*.4,1,0,0,0),n===`ring`){let e=new G(am(-.45,.45),am(-.45,.45),1).normalize(),t=new G().crossVectors(e,new G(0,1,0)).normalize(),n=new G().crossVectors(e,t).normalize(),i=d*r.k;for(let e=0;e<h;e++){let a=e/h*Math.PI*2,o=Math.cos(a),s=Math.sin(a),c=am(.96,1.04);v((t.x*o+n.x*s)*i*c,(t.y*o+n.y*s)*i*c,(t.z*o+n.z*s)*i*c,p(r.life[0],r.life[1]),f,f*.4,l,u,r.k,r.gravity*m,e%2?2:0)}}else{let e=n===`willow`;for(let t=0;t<h;t++){cm(_);let n=d*r.k*am(e?.9:.95,e?1.08:1.05);v(_[0]*n,_[1]*n,_[2]*n,p(r.life[0],r.life[1]),f,f*(e?.5:.35),l,u,r.k,r.gravity*m,t%3==0?2:0)}if(n===`finale`||n===`chrysanthemum`){let e=Math.floor(h*.35),t=um([a[0]*.7+.4,a[1]*.7+.4,a[2]*.7+.45],om);for(let n=0;n<e;n++){cm(_);let e=d*.55*r.k*am(.9,1.1);v(_[0]*e,_[1]*e,_[2]*e,p(r.life[0],r.life[1])*1.1,f*.8,f*.3,t,u,r.k,1.5*m,2)}}}if(n!==`willow`&&h>0){let n=e.life||(r.life[0]+r.life[1])/2;this.glit.push({t0:t,t:t+n*.5,pos:i.clone(),visR:d,k:r.k,g:r.gravity*m,n:Math.round(h*.5),size:f*.55,c:[l[0]*.55,l[1]*.55,l[2]*.55],end:[l[0]*.15,l[1]*.15,l[2]*.15]})}let y=this.smokeTint,b=d*.3;for(let e=0;e<3;e++)this.smoke.emit(i.x+am(-b,b),i.y+am(-b,b)*.6,i.z+am(-b,b),am(-.4,.4),am(.1,.5),am(-.4,.4),am(4,6.5),d*.5,d*1.1,l[0]*.12,l[1]*.12,l[2]*.12,y[0],y[1],y[2],.25,.3,-.05,0);this.onBurst&&this.onBurst(o,e)}},fm=0,pm=1,mm=4,hm=6,gm=7,_m=`
attribute vec3 aCorner;
attribute vec4 aP; // 세계 위치 xyz, 반폭(m)
attribute vec4 aC; // 색 rgb, 불투명도(밝기)
attribute vec4 aK; // 종류, p1, p2, p3
uniform float uScale;
uniform float uMinPx;
uniform float uLinePx;
uniform vec2 uViewport;
varying vec2 vUv;
varying vec4 vC;
varying vec4 vK;
varying float vPx;
void main() {
  float t = aK.x;
  if (t > 4.5 && t < 6.5) {
    // 선분(점선 한 칸): 시작 aP.xyz, 끝 aK.yzw, 반폭 aP.w(m). 6 = 가는 선(최소 반폭 uLinePx)
    vec4 m0 = modelViewMatrix * vec4(aP.xyz, 1.0);
    vec4 m1 = modelViewMatrix * vec4(aK.yzw, 1.0);
    if (-m0.z < 0.4 || -m1.z < 0.4) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
    vec4 c0 = projectionMatrix * m0, c1 = projectionMatrix * m1;
    vec2 s0 = c0.xy / c0.w, s1 = c1.xy / c1.w;
    float along = aCorner.x * 0.5 + 0.5;
    vec4 cc = mix(c0, c1, along);
    vec2 dir = (s1 - s0) * uViewport;
    float L = length(dir);
    dir = L > 1e-6 ? dir / L : vec2(1.0, 0.0);
    vec2 nrm = vec2(-dir.y, dir.x);
    float depthM = mix(-m0.z, -m1.z, along);
    float hpx = max(aP.w * uScale / depthM, t > 5.5 ? uLinePx : uMinPx * 0.75);
    vec2 off = (nrm * aCorner.y * (hpx + 0.7) * 2.0 + dir * aCorner.x * (t > 5.5 ? 0.7 : hpx) * 2.0) / uViewport;
    gl_Position = vec4(cc.xy + off * cc.w, cc.z, cc.w);
    vUv = vec2(aCorner.x, aCorner.y * (hpx + 0.7) / max(hpx, 0.5));
    vC = aC;
    vK = aK;
    vPx = hpx;
    return;
  }
  vec4 mv = modelViewMatrix * vec4(aP.xyz, 1.0);
  float depth = -mv.z;
  if (depth < 0.4) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float px = aP.w * uScale / depth;
  // 아주 멀어도 알이 점으로 남게 최소 화소(알은 빛무리 포함 크기 기준). 채움(7)은 최소 없음
  float minPx = t < 0.5 ? uMinPx * ${Ku.glow.toFixed(2)} : t < 1.5 ? uMinPx * 2.6 : t > 6.5 ? 0.0 : uMinPx * 1.4;
  float k = px < minPx ? minPx / max(px, 1e-4) : 1.0;
  vec2 ext = vec2(aP.w * k);
  mv.xy += aCorner.xy * ext;
  gl_Position = projectionMatrix * mv;
  vUv = aCorner.xy;
  vC = aC;
  vK = aK;
  vPx = px * k;
}
`,vm=`
varying vec2 vUv;
varying vec4 vC;
varying vec4 vK;
varying float vPx;
// 결과는 미리 곱한 알파: rgb = 더할 빛, a = 뒤를 어둡게 하는 정도
void main() {
  float t = vK.x;
  float r = length(vUv);
  vec3 col = vec3(0.0);
  float a = 0.0;
  float aa = 1.5 / max(vPx, 1.0);
  if (t < 0.5) {
    // 알: 반폭 = 빛무리 끝(받침 끝). 알 반지름 = 1/back
    float rb = r * ${Ku.back.r.toFixed(2)};
    if (rb > ${Ku.back.r.toFixed(2)}) discard;
    float back = (1.0 - smoothstep(${(Ku.back.r*.75).toFixed(2)}, ${Ku.back.r.toFixed(2)}, rb)) * ${Ku.back.a.toFixed(2)} * min(1.0, vC.a * 1.6);
    float edge = aa * ${Ku.back.r.toFixed(2)};
    float core;
    vec3 cc;
    if (vK.y > 2.5) {
      // 심 모란 알: 꽉 찬 작은 심 + 바깥 고리(두 겹)
      vec2 q2 = vUv * ${Ku.back.r.toFixed(2)};
      float rr = length(q2);
      core = max(1.0 - smoothstep(0.5 - edge, 0.5 + edge, rr), (1.0 - smoothstep(1.0 - edge, 1.0 + edge, rr)) * smoothstep(0.78 - edge, 0.78 + edge, rr));
      cc = mix(vec3(${Ku.peonyCore.join(`, `)}), vC.rgb, smoothstep(0.0, 0.5, rr));
    } else if (vK.y > 1.5) {
      // 버드나무 알: 꽉 찬 알 + 아래로 처진 금빛 꼬리 셋
      float drip = 0.0;
      for (int q = -1; q <= 1; q++) {
        vec2 p = vUv * ${Ku.back.r.toFixed(2)} - vec2(float(q) * 0.55, -1.2);
        drip = max(drip, (1.0 - smoothstep(0.12 - edge, 0.12 + edge, abs(p.x))) * (1.0 - smoothstep(0.0, 0.9, abs(p.y + 0.0))) * step(-0.9, p.y) * step(p.y, 0.4));
      }
      core = max(1.0 - smoothstep(1.0 - edge, 1.0 + edge, rb), drip * 0.8);
      cc = mix(vec3(${Ku.peonyCore.join(`, `)}), vC.rgb, smoothstep(0.0, 0.85, rb));
    } else if (vK.y > 0.5) {
      // 띠(국화·고리) 알: 고리(가운데가 어둡게 빔)
      core = (1.0 - smoothstep(1.0 - edge, 1.0 + edge, rb)) * smoothstep(vK.z - edge, vK.z + edge, rb);
      cc = vC.rgb;
    } else {
      // 원판(모란) 알: 꽉 찬 알, 가운데 따뜻하게
      core = 1.0 - smoothstep(1.0 - edge, 1.0 + edge, rb);
      cc = mix(vec3(${Ku.peonyCore.join(`, `)}), vC.rgb, smoothstep(0.0, 0.85, rb));
    }
    float glow = exp(-max(0.0, rb - 0.9) * 1.6) * (1.0 - smoothstep(${(Ku.glow*.8).toFixed(2)}, ${Ku.glow.toFixed(2)}, rb)) * 0.32;
    col = (cc * core + vC.rgb * glow) * vC.a;
    a = max(back, core * min(1.0, vC.a * 1.4));
  } else if (t < 1.5) {
    // 도화선 호: 반지름 1(반폭 기준 0.8), 위에서 시계 방향으로 남은 만큼(vK.y = 0~1)
    float R0 = 0.8;
    float w = max(vK.z, aa * 1.2);
    float band = 1.0 - smoothstep(w * 0.5, w * 0.5 + aa, abs(r - R0));
    float ang = atan(vUv.x, vUv.y);
    if (ang < 0.0) ang += 6.2831853;
    float frac = ang / 6.2831853;
    float on = step(frac, vK.y);
    float ta = vK.y * 6.2831853;
    vec2 tip = vec2(sin(ta), cos(ta)) * R0;
    float spark = 1.0 - smoothstep(w * 1.2, w * 1.2 + aa * 2.0, length(vUv - tip));
    if (band * on < 0.01 && spark < 0.01) discard;
    col = vC.rgb * band * on * vC.a + vec3(1.0, 0.9, 0.7) * spark * vC.a;
    a = max(band * on, spark) * 0.5 * min(1.0, vC.a * 1.5);
  } else if (t > 4.5 && t < 5.5) {
    // 굵은 점선(옛 불티 줄)
    float d = (1.0 - smoothstep(0.35, 1.0, abs(vUv.y))) * (1.0 - smoothstep(0.55, 1.0, abs(vUv.x)));
    if (d <= 0.01) discard;
    col = vC.rgb * d * vC.a;
    a = d * 0.3 * min(1.0, vC.a);
  } else if (t > 5.5 && t < 6.5) {
    // 가는 선(범위 원·조준점 점선 한 칸): 가장자리 0.7px 부드럽게, 빛무리 없음
    float e = abs(vUv.y);
    float d = 1.0 - smoothstep(0.85, 1.0 + 0.7 / max(vPx, 0.5), e);
    if (d <= 0.01) discard;
    col = vC.rgb * d * vC.a;
    a = d * 0.25 * min(1.0, vC.a);
  } else if (t > 6.5) {
    // 원판 안쪽 옅은 채움(「다 위험」) — 둥근 가장자리
    float d = 1.0 - smoothstep(1.0 - aa, 1.0, r);
    if (d <= 0.0) discard;
    col = vC.rgb * d * vC.a;
    a = d * vC.a;
  } else {
    // 흐린 점(2번째 웨이브부터)
    float d = 1.0 - smoothstep(0.25, 1.0, r);
    if (d <= 0.0) discard;
    col = vC.rgb * d * d * vC.a;
    a = d * 0.25 * min(1.0, vC.a * 2.0);
  }
  gl_FragColor = vec4(col, a);
  #include <colorspace_fragment>
}
`,ym=class e{constructor(e=900){this.scene=new Rn,this.max=e,this.P=new Float32Array(e*4),this.C=new Float32Array(e*4),this.K=new Float32Array(e*4);let t=new Fo;t.setAttribute(`position`,new _r(new Float32Array([-1,-1,0,1,-1,0,-1,1,0,1,1,0]),3)),t.setAttribute(`aCorner`,new _r(new Float32Array([-1,-1,0,1,-1,0,-1,1,0,1,1,0]),3)),t.setIndex([0,1,2,2,1,3]),this.aP=new Si(this.P,4).setUsage(We),this.aC=new Si(this.C,4).setUsage(We),this.aK=new Si(this.K,4).setUsage(We),t.setAttribute(`aP`,this.aP),t.setAttribute(`aC`,this.aC),t.setAttribute(`aK`,this.aK),t.instanceCount=0,t.boundingSphere=new Cr(new G,1e6),this.material=new wa({vertexShader:_m,fragmentShader:vm,uniforms:{uScale:{value:900},uMinPx:{value:Ku.minPx},uLinePx:{value:Ku.range.px*.5},uViewport:{value:new W(1920,1080)}},transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,blending:5,blendSrc:201,blendDst:205,blendSrcAlpha:200,blendDstAlpha:201}),this.mesh=new ii(t,this.material),this.mesh.frustumCulled=!1,this.scene.add(this.mesh),this.n=0,this.visible=!0,this.showRange=!0,this.showAim=!0,this.resetStats(),this._w=new G}setScale(e,t,n=t*16/9){this.material.uniforms.uScale.value=e,this.material.uniforms.uViewport.value.set(n,t),this.material.uniforms.uMinPx.value=Ku.minPx*(t/1080),this.material.uniforms.uLinePx.value=Math.max(.75,Ku.range.px*.5*(t/1080))}_push(e,t,n,r,i,a,o,s,c,l=0,u=0,d=0){if(this.n>=this.max){this.stats.overflow++;return}let f=this.n*4;this.P[f]=e,this.P[f+1]=t,this.P[f+2]=n,this.P[f+3]=r,this.C[f]=i,this.C[f+1]=a,this.C[f+2]=o,this.C[f+3]=s,this.K[f]=c,this.K[f+1]=l,this.K[f+2]=u,this.K[f+3]=d,this.n++}static planeW(e,t,n,r){return r.x=e.Cw.x+e.R.x*t,r.y=e.Cw.y+n,r.z=e.Cw.z+e.R.z*t,r}_dashCircle(t,n,r,i,a,o,s,c,l,u=0){let d=this._w,f=this._q||=new G,p=Math.PI*2/a;for(let m=0;m<a;m++){let a=u+m*p,h=a+p*o;e.planeW(t,n+Math.cos(a)*i,r+Math.sin(a)*i,d),e.planeW(t,n+Math.cos(h)*i,r+Math.sin(h)*i,f),this._push(d.x,d.y,d.z,s*.5,c[0],c[1],c[2],l,hm,f.x,f.y,f.z)}}static pulse(e,t){let n=Ku.pulse,r=t-e;if(r<=0)return 1;let i=Math.round(r/Bu.beat),a=Math.abs(r-i*Bu.beat);return r<Bu.beat+.1&&(a=Math.min(a,Math.abs(r-Bu.beat*.5))),1+n.amp*Math.exp(-((a/n.width)**2))}static countdown(e,t={sc:1,br:1,fc:null}){let n=Ku.count,r=Ku.squeeze,i=Gu.ticks,a=e>i[0]?0:1,o=a===0?1e9:i[0]-e,s=a===0?0:Math.min(1,o/n.ease);t.sc=n.scale[0]+(n.scale[1]-n.scale[0])*s,t.br=n.bright[0]+(n.bright[1]-n.bright[0])*s;let c=n.fuse[0],l=n.fuse[1];if(t.fc=[c[0]+(l[0]-c[0])*s,c[1]+(l[1]-c[1])*s,c[2]+(l[2]-c[2])*s],e<r.t){let n=1-Math.max(0,e)/r.t;t.sc*=1+(r.to-1)*n*n*(3-2*n),e<r.glint&&(t.br+=r.gain)}return t}static rangeCol(e,t){let n=e.eggCol||[1,.8,.4],r=Math.max(n[0],n[1],n[2])||1,i=Ku.range,a=(n[0]+n[1]+n[2])/(3*r);for(let e=0;e<3;e++)t[e]=(n[e]/r+(a-n[e]/r)*i.desat)*i.hdr;return t}static rangeAlpha(e,t){let n=Ku.range;if(e.tInfo===void 0||t<e.tInfo)return 0;let r=Math.min(1,(t-e.tInfo)/n.fadeIn);if(e.burst){let i=e.tJudgeEnd===void 0?(e.crossT===void 0?e.tMeet:e.crossT)+Y.judgeAfter:e.tJudgeEnd;r*=t<=i?n.judgeA+(1-n.judgeA)*Math.max(0,1-(t-e.tBurst)/.1):n.judgeA*Math.max(0,1-(t-i)/n.fadeOut)}return r}update(t,n,r,i=null){this.n=0;let a=0,o=0,s=0,c=0;if(this.visible){let l=[];for(let e of t)e.shells&&e.shells.length&&n<e.tq&&l.push(e);l.sort((e,t)=>e.tq-t.tq),r&&r.position;for(let t=0;t<l.length;t++){let r=l[t],i=t<Ku.strongRanks,s=e.pulse(n,r.tq),c=e.countdown(r.tq-n,this._cd||={sc:1,br:1,fc:null});for(let e of r.shells){if(!e.opened||e.burst)continue;let r=e.eggW;if(!r)continue;let l=e.eggCol||Ku.peonyCol,u=Math.max(l[0],l[1],l[2]),d=[l[0]/u,l[1]/u,l[2]/u],f=Y[e.kind],p=e.kind===`dahlia`?3:e.kind===`willowL`?2:+(f.shape===`band`),m=f.shape===`band`?Math.max(.3,Math.min(.8,e.rin/e.rout+.15)):0;if(i&&a<Ku.maxStrong){a++;let i=Ku.strong[t]*c.br*s,o=f.egg/2*c.sc*Ku.back.r;this._push(r.x,r.y,r.z,o,d[0],d[1],d[2],i,fm,p,m);let l=Math.max(0,Math.min(1,(e.tBurst-n)/Math.max(.05,e.tBurst-e.tOpen))),u=Ku.fuseR/.8*Math.max(1,c.sc),h=c.fc;this._push(r.x,r.y,r.z,u,h[0],h[1],h[2],Ku.strong[t]*(.75+.25*s),pm,l,Ku.fuseW/u*1)}else if(o<Ku.maxFaint){o++;let e=Ku.faint;this._push(r.x,r.y,r.z,Ku.eggR*Ku.glow*e.size,d[0],d[1],d[2],e.bright*(.85+.15*s),mm)}}}let u=Ku.range,d=this._rc||=[0,0,0];if(this.showRange){for(let r of t)if(r.shells)for(let t of r.shells){let r=e.rangeAlpha(t,n);if(r<=.004)continue;s++,e.rangeCol(t,d);let i=n-t.tBurst,a=t.egg,o=Math.max(a?a.drop:0,t.burst&&this.dropAt?this.dropAt(t,i):0),c=t.oz-o,l=t.emberPh||0;if(this._dashCircle(t,t.oy,c,t.rout,u.dashes,u.duty,u.w,d,r,l),t.shape===`band`)this._dashCircle(t,t.oy,c,t.rin,Math.max(16,Math.round(u.dashes*.5)),u.duty,u.w,d,r,l);else{let n=this._w;e.planeW(t,t.oy,c,n),this._push(n.x,n.y,n.z,t.rout,d[0],d[1],d[2],u.fillA*r,gm)}}}if(this.showAim&&i&&i.spec){let e=null;for(let r of t)if(r.shells&&r.shells.length)for(let t of r.shells)t.shape!==`band`||t.crossed||t.tInfo===void 0||n<t.tInfo||i.s>t.s+.5||(!e||t.s<e.s)&&(e=t);if(e){c++;let t=Ku.aim,r=i.spec.radius*Y.birdHitMult,a=Math.min(1,(n-e.tInfo)/u.fadeIn),o=[t.hdr,t.hdr,t.hdr];this._dashCircle(e,i.u-e.uc,i.w-e.wc,r,t.dashes,t.duty,t.w,o,a,n*1.5),this.stats.aimLast={u:+i.u.toFixed(2),w:+i.w.toFixed(2),sh:e.id}}}}this.stats.strong=a,this.stats.faint=o,this.stats.ranges=s,this.stats.aims=c,this.stats.maxStrong=Math.max(this.stats.maxStrong,a),this.stats.maxFaint=Math.max(this.stats.maxFaint,o),this.stats.maxN=Math.max(this.stats.maxN,this.n);let l=this.mesh.geometry;l.instanceCount=this.n;for(let e of[this.aP,this.aC,this.aK])e.clearUpdateRanges(),this.n&&e.addUpdateRange(0,this.n*4),e.needsUpdate=!0}resetStats(){this.stats={strong:0,faint:0,maxStrong:0,maxFaint:0,ranges:0,aims:0,maxN:0,overflow:0,emberRatio:[]}}},bm=t({CGRID:()=>Nm,D_TARGET:()=>Ch,birdR:()=>Hm,clear2D:()=>Jm,clearOf:()=>Ym,clrRho:()=>qm,dropJ:()=>Wm,edt:()=>ch,eggGeom:()=>Km,fakeGap:()=>vh,infoBefore:()=>zm,infoToArrive:()=>Bm,kindK:()=>Lm,kindLead:()=>Im,kindSize:()=>Fm,launchToBurst:()=>Rm,makeEgg:()=>Gm,pathOf:()=>Qm,pathOfOne:()=>Zm,planStage:()=>Th,planStats:()=>Eh,reachOf:()=>eh,revealBefore:()=>Vm,rng:()=>xm,safeAt:()=>Xm,safeGrid:()=>lh,sideMargin:()=>Um,simHit:()=>xh,stillHit:()=>$m,waveD:()=>_h,zoneCost:()=>gh,zoneLabel:()=>hh,zones:()=>mh});function xm(e){let t=e>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Sm=Vu.ellipse,Cm=X.cell,wm=2*Math.ceil(Sm.u/Cm)+1,Tm=2*Math.ceil(Sm.v/Cm)+1,Em=wm*Tm,Dm=e=>(e%wm-(wm-1)/2)*Cm,Om=e=>((e/wm|0)-(Tm-1)/2)*Cm,km=new Float32Array(Em),Am=new Float32Array(Em),jm=new Uint8Array(Em),Mm=new Uint8Array(Em);for(let e=0;e<Em;e++){km[e]=Dm(e),Am[e]=Om(e);let t=(km[e]/Sm.u)**2+(Am[e]/Sm.v)**2;Mm[e]=+(t<=1),jm[e]=+(t<=X.ellSafe*X.ellSafe)}var Nm={NU:wm,NW:Tm,NC:Em,CELL:Cm,CU:km,CW:Am,IN_SAFE:jm,IN_BIRD:Mm},Pm=Math.PI*2,Fm=e=>Y[e].size,Im=e=>Gu.lead[Y[e].size],Lm=e=>Gu.k[Y[e].size],Rm=e=>Gu.launchToBurst[Y[e].size],zm=e=>Rm(e)-Gu.infoAfterLaunch,Bm=e=>zm(e)+Im(e),Vm=zm;function Hm(e){return e.radius*Y.birdHitMult}var Um=Hm;function Wm(e){return e>0?.5*Wu.gJudge*e*e:0}function Gm(e,t,n,r=Math.random){let i=Y[e],a=i.rout[0]+r()*(i.rout[1]-i.rout[0]),o=i.shape===`disk`?0:i.rinOff?a-i.rinOff:i.rin;return Km({kind:e,shape:i.shape,u:t,w:n,rout:a,rin:o})}function Km(e){let t=Lm(e.kind),n=Im(e.kind),r=1-Math.exp(-t*n);e.k=t,e.lead=n,e.ex=r;let i=Wu.window;return e.tw=[Math.max(.02,n-i),n,n+i],e.fw=e.tw.map(e=>(1-Math.exp(-t*e))/r),e.dw=e.tw.map(Wm),e.drop=Wm(n),e.R=e.rout/r,e.rp=e.rout,e.tipMax=e.rout*e.fw[2],e}function qm(e,t,n,r,i){let a=n-Wu.tol+i;if(r>=a)return r-a;if(e===`band`){let e=t+Wu.tol-i;if(e>0)return r<=e?e-r:-Math.min(a-r,r-e)}return-(a-r)}function Jm(e,t,n,r=0){let i=t-e.u,a=1/0;for(let t=0;t<3;t++){let o=n-(e.w-e.dw[t]),s=qm(e.shape,e.rin*e.fw[t],e.rout*e.fw[t],Math.sqrt(i*i+o*o),r);s<a&&(a=s)}return a}function Ym(e,t,n,r=0){let i=1/0;for(let a of e){let e=Jm(a,t,n,r);e<i&&(i=e)}return i}function Xm(e,t,n,r,i=!0){return i&&(t/(Sm.u*X.ellSafe))**2+(n/(Sm.v*X.ellSafe))**2>1?!1:Ym(e,t,n,r)>=0}function Zm(e,t,n){let r=Math.hypot(t,n+e.drop);return e.shape===`band`&&r<e.rin?`center`:r<e.rout?`in`:`out`}function Qm(e,t,n){let r=`out`;for(let i of e){let e=Zm(i,t-i.u,n-i.w);if(e===`center`)return`center`;e===`in`&&(r=`in`)}return r}function $m(e,t,n,r,i=.03){return Ym(e,t,n,r)<=-i}function eh(e,t,n=!0,r=X.react){let i=e.accel*(n?Xu.heavyAccel:1);return e.lateral*Math.max(0,t-r-1/i)*X.reachMult}var th=1e10,nh=Math.max(wm,Tm),rh=new Float64Array(nh),ih=new Float64Array(nh),ah=new Int32Array(nh),oh=new Float64Array(nh+1);function sh(e){let t=0;ah[0]=0,oh[0]=-1e10,oh[1]=th;for(let n=1;n<e;n++){let e=(rh[n]+n*n-(rh[ah[t]]+ah[t]*ah[t]))/(2*n-2*ah[t]);for(;e<=oh[t];)t--,e=(rh[n]+n*n-(rh[ah[t]]+ah[t]*ah[t]))/(2*n-2*ah[t]);t++,ah[t]=n,oh[t]=e,oh[t+1]=th}t=0;for(let n=0;n<e;n++){for(;oh[t+1]<n;)t++;ih[n]=(n-ah[t])**2+rh[ah[t]]}}function ch(e,t){let n=!1;for(let t=0;t<Em;t++)if(e[t]){n=!0;break}if(!n)return t.fill(1e6),t;for(let n=0;n<wm;n++){for(let t=0;t<Tm;t++)rh[t]=e[t*wm+n]?0:th;sh(Tm);for(let e=0;e<Tm;e++)t[e*wm+n]=ih[e]}for(let e=0;e<Tm;e++){for(let n=0;n<wm;n++)rh[n]=t[e*wm+n];sh(wm);for(let n=0;n<wm;n++)t[e*wm+n]=ih[n]>=th*.5?1e6:Math.sqrt(ih[n])*Cm}return t}function lh(e,t,n=new Uint8Array(Em),r=0){n.set(jm);let i=(wm-1)/2,a=(Tm-1)/2;for(let o of e){let e=o.tipMax+t+r+.3,s=o.w-o.drop,c=Math.max(0,Math.floor((o.u-e)/Cm+i)),l=Math.min(wm-1,Math.ceil((o.u+e)/Cm+i)),u=Math.max(0,Math.floor((s-e)/Cm+a)),d=Math.min(Tm-1,Math.ceil((s+e)/Cm+a));for(let e=u;e<=d;e++)for(let i=c;i<=l;i++){let a=e*wm+i;n[a]&&Jm(o,km[a],Am[a],t)<r&&(n[a]=0)}}return n}var uh=new Int32Array(Em),dh=new Int32Array(Em),fh=new Uint8Array(Em),ph=new Float32Array(Em);function mh(e,t,n){for(let t=0;t<Em;t++)fh[t]=+!e[t];ch(fh,ph),uh.fill(-1);let r=[];for(let i=0;i<Em;i++){if(!e[i]||uh[i]>=0)continue;let a=r.length,o={id:a,n:0,ins:0,M:1/0,cM:i,cIns:i,center:0},s=0;for(dh[s++]=i,uh[i]=a;s;){let t=dh[--s];o.n++;let r=ph[t]-Cm*.5;r>o.ins&&(o.ins=r,o.cIns=t);let i=Math.hypot(km[t]-n[0],Am[t]-n[1]);i<o.M&&(o.M=i,o.cM=t);let c=t%wm,l=t/wm|0;c>0&&e[t-1]&&uh[t-1]<0&&(uh[t-1]=a,dh[s++]=t-1),c<wm-1&&e[t+1]&&uh[t+1]<0&&(uh[t+1]=a,dh[s++]=t+1),l>0&&e[t-wm]&&uh[t-wm]<0&&(uh[t-wm]=a,dh[s++]=t-wm),l<Tm-1&&e[t+wm]&&uh[t+wm]<0&&(uh[t+wm]=a,dh[s++]=t+wm)}o.path=Qm(t,km[o.cIns],Am[o.cIns])===`center`?`center`:`out`,r.push(o)}return r}var hh=e=>uh[e];function gh(e,t,n){let r=e=>Math.max(0,Math.min(1,e));return .5*(e.M/Math.max(1e-6,t))+.3*r((1.3-e.ins)/.8)+.2*r((1.7-n)/.6)}function _h(e,t,n,r=null){let i=1/0,a=0,o=null;for(let s of e){if(s.M>t)continue;a++;let e=r?r[0]*(s.M/Math.max(1e-6,t))+r[1]*Math.max(0,Math.min(1,(1.3-s.ins)/.8))+r[2]*Math.max(0,Math.min(1,(1.7-n)/.6)):gh(s,t,n);e<i&&(i=e,o=s)}return a?{D:Math.min(100,100*i+(a===1?10:0)),n:a,z:o}:{D:100,n:0,z:null}}function vh(e){let t=X.map;for(let n=0;n<e.length;n++){let r=e[n];for(let i=n+1;i<e.length;i++){let n=e[i],a=Math.hypot(r.u-n.u,r.w-r.drop-(n.w-n.drop))-r.rout-n.rout;if(a>-t.overlap&&a<t.sep)return`pair`}let i=1/0,a=r.w-r.drop;if((r.u/Sm.u)**2+(a/Sm.v)**2<1){for(let e=0;e<32;e++){let t=e/32*Pm,n=Math.cos(t),o=Math.sin(t),s=(n/Sm.u)**2+(o/Sm.v)**2,c=2*(r.u*n/(Sm.u*Sm.u)+a*o/(Sm.v*Sm.v)),l=(r.u/Sm.u)**2+(a/Sm.v)**2-1,u=(-c+Math.sqrt(Math.max(0,c*c-4*s*l)))/(2*s);i=Math.min(i,u-r.rout)}if(i>0&&i<t.edge)return`edge`}}return null}var yh=(()=>{let e=Math.ceil(13/Cm),t=[];for(let n=-e;n<=e;n++)for(let r=-e;r<=e;r++){let e=Math.hypot(r,n)*Cm;e<=13&&t.push([r,n,e])}return t.sort((e,t)=>e[2]-t[2]),t})();function bh(e,t,n,r,i=.25){let a=Math.round(t/Cm),o=Math.round(n/Cm),s=X.ellSafe*X.ellSafe;for(let[t,n]of yh){let c=(a+t)*Cm,l=(o+n)*Cm;if(!((c/Sm.u)**2+(l/Sm.v)**2>s)&&Ym(e,c,l,r)>=i)return[c,l]}return[t,n]}function xh(e,t,n=12,r=Math.random,i={}){let a=Hm(e),o=1/30,s=e.forward,c=i.react??X.humanReact,l=.1,u=Math.max(t.tPrev,t.tInfo+c)+l,d=t.tq+c+l,f=Math.min(...t.eggs.map(e=>t.tq+e.lead)),p=Math.max(...t.eggs.map(e=>t.tq+e.lead))+.05,m=t.eggs.some(e=>e.shape===`band`),h=e.accel*Xu.heavyAccel,g=1-Math.exp(-h*o),_=e=>t.eggs.map(t=>{let n=r()*Pm,i=e*Math.sqrt(r());return{...t,u:t.u+Math.cos(n)*i,w:t.w+Math.sin(n)*i}}),v=0,y=0;for(let r=0;r<n;r++){let n=t.P[0],r=t.P[1],c=0,b=0,x=null,S=!1,C=new Uint8Array(t.eggs.length),w=!1,T=1/0;for(let v=Math.min(u,t.tPrev);v<=p&&!w;v+=o){!x&&v>=u&&(x=bh(_(.3),n,r,a)),x&&!S&&v>=d&&(S=!0,x=bh(_(.15),n,r,a));let p=0,y=0;if(x){let e=x[1];i.parallax!==!1&&!(m&&Qm(t.eggs,x[0],x[1])===`center`)&&(e+=1.2*Math.max(0,(f-v)*s+s*l)/6);let a=x[0]-n,o=e-r;p=Math.abs(a)>Math.abs(c)/h+.08?Math.sign(a):0,y=Math.abs(o)>Math.abs(b)/h+.08?Math.sign(o):0}c+=(p*e.lateral-c)*g,b+=(y*e.lateral-b)*g,n+=c*o,r+=b*o;let E=(n/Sm.u)**2+(r/Sm.v)**2;if(E>1){let e=1/Math.sqrt(E);n*=e,r*=e}for(let e=0;e<t.eggs.length;e++){let i=t.eggs[e];if(C[e]||v<t.tq+i.lead)continue;C[e]=1;let o=Jm(i,n,r,a);if(o<T&&(T=o),o<0){w=!0;break}}}w&&y++,v+=1/(1+Math.exp(Math.min(30,T/.08)))}return xh.hard=y/n,v/n}var Sh=e=>{for(let t of Vu.zones)if(e>=t.s[0]&&e<t.s[1])return t;return Vu.zones[Vu.zones.length-1]},Ch=X.dTarget,wh={early:[`국화 대 센터 연속 3발`,3,`chrysL`,`center`],mid:[`고리 연타`,3,`ring`,null],late:[`심 모란 벽 사이 밖 길`,1,`dahlia`,`out`],finale:[`버드나무 커튼 센터`,1,`willowL`,`center`]};function Th(e,t={}){let n=typeof performance<`u`?performance.now():Date.now(),r=Iu[e],i=r.forward,a=(t.seed??1)>>>0,o=xm(a),s=(e,t)=>e+o()*(t-e),c=t.sStart??0,l=Hm(r),u=Bu.eighth,d=Math.max(...Object.values(Gu.lead)),f=[],p={tries:0,fails:0,relaxed:0,losReject:0,losFail:0,why:{},relaxLog:[],capped:0},m=X.map,h=xm((a^1540483477)>>>0),g=(e,t)=>Math.floor(e+h()*(t-e+1)),_=Math.ceil(X.first/u)*u,v=[],y={},b=0,x=null,S=(t.length??Vu.length)-X.endPad;for(;c+(_+d)*i<=S&&v.length<X.maxWaves;){let e=c+_*i,t=Sh(e),n=t.rest?`rest`:t.phase||`mid`,r=`single`;if(v.length>0&&n!==`rest`){if(b<=0||!x||x.phase!==n){let e=X.seq[n]||X.seq.mid;y[n]=y[n]||0;let t=e[y[n]%e.length];y[n]++;let r=t;x&&x.pat===t[0]&&(r=e[y[n]%e.length],y[n]++),x={pat:r[0],phase:n},b=Math.min(3,g(r[1][0],r[1][1]))}r=x.pat,b--}else b=0,x=null;v.push({tq:_,s:e,zone:t.id,kind:n===`rest`?`rest`:n===`finale`?`finale`:`mid`,phase:n,pat:r});let a=X.gap[n]||X.gap.mid;_+=g(a[0],a[1])*u}let C={};for(let e of v){let t=C[e.phase]||(C[e.phase]=[1/0,-1/0]);t[0]=Math.min(t[0],e.tq),t[1]=Math.max(t[1],e.tq)}for(let e of v){let t=C[e.phase],n=t[1]>t[0]?(e.tq-t[0])/(t[1]-t[0]):0,r=Ch[e.phase]||Ch.mid;e.Dt=r[0]+(r[1]-r[0])*n}for(let e of v)e.nE=e.phase===`finale`?e.pat===`close`?X.finaleMax:e.pat===`single`?1:2:o()<(X.double[e.phase]||0)&&e.pat!==`single`?2:1;if(!t.noScenes)for(let[e,t]of Object.entries(wh)){let n=[];for(let t=1;t<v.length;t++)v[t].phase===e&&n.push(t);if(n.length<t[1]+2)continue;let r=Rm(t[2])-Gu.infoAfterLaunch+Gu.infoGap,i=-1;for(let e=0;e<n.length&&i<0;e++)for(let a of[1,-1]){let o=Math.floor(n.length*.5)+a*e;if(o<1||o+t[1]>=n.length)continue;let s=!0;for(let e=0;e<t[1];e++){let t=v[n[o+e]],i=v[n[o+e]-1];(t.tq-i.tq<r-1e-6||n[o+e]!==n[o]+e)&&(s=!1)}if(s){i=o;break}}if(!(i<0)){for(let e=0;e<t[1];e++){let r=v[n[i+e]];r.scene=t[0],r.forceKind=t[2],r.forceWish=t[3],r.nE=t[2]===`dahlia`?2:1,r.pat===`single`&&(r.pat=`zig`)}for(let e of[n[i]-1,n[i+t[1]-1]+1])v[e]&&!v[e].scene&&(v[e].Dt*=.6,v[e].sceneNb=!0);p.scenes=(p.scenes||0)+1}}if(t.Dfix)for(let e=0;e<v.length;e++)t.Dfix[e]!==void 0&&(v[e].Dt=t.Dfix[e]);let w=xm((a^625341585)>>>0),T=new Uint8Array(Em),E=new Float32Array(Em),D=new Float32Array(Em),O=new Uint8Array(Em),k=[0,t.startW??-1];{let e=0,t=1/0;for(let n=0;n<Em;n++)if(Mm[n]){let r=Math.hypot(km[n]-k[0],Am[n]-k[1]);r<t&&(t=r,e=n)}O[e]=1}let A=0,j=-99,M=[0,t.startW??-1],N=null,P=o()<.5?1:-1,F=1,I={out:0,center:0},ee=e=>e.w>=-7.5&&e.w<=8.5&&Math.abs(e.u)<=12.5,te=(e,t)=>{let n=Y.mix[e===`rest`?`early`:e]||Y.mix.mid,r=Object.keys(n).filter(e=>n[e]>0&&t(e));if(!r.length)return null;let i=0;for(let e of r)i+=n[e];let a=o()*i;for(let e of r)if(a-=n[e],a<=0)return e;return r[r.length-1]},ne=t.wts||null;for(let e=0;e<v.length;e++){let n=v[e],a=n.pat===`single`||n.phase===`rest`;if(n.pat===`chain`&&(!N||!v[e-1]||v[e-1].pat!==`chain`)){let e=s(30,55)*Math.PI/180;N=[Math.cos(e)*(k[0]>0?-1:1),Math.sin(e)*(k[1]>0?-1:1)]}let d=()=>{if(n.pat===`zig`||n.pat===`close`){P=Math.abs(k[0])>1?k[0]>0?-1:1:-P;let e=s(-.25,.25),t=Math.hypot(1,e);return[P/t,e/t]}if(n.pat===`wave`){F=Math.abs(k[1])>.8?k[1]>0?-1:1:-F;let e=s(-.3,.3),t=Math.hypot(1,e);return[e/t,F/t]}if(n.pat===`chain`)return N.slice();let e=s(0,Math.PI*2),t=Math.cos(e)-k[0]/Sm.u,r=Math.sin(e)-k[1]/Sm.v,i=Math.hypot(t,r)||1;return[t/i,r/i]},h=e=>n.tq-zm(e)>=j+Gu.infoGap-1e-6,g=null,_=1/0,y=null,b=[],x=f.slice(-3).filter(e=>e.kindA).map(e=>e.kindA),S=x.length===3&&x.every(e=>e===x[0])?x[0]:null,C=f.slice(-4).filter(e=>e.path).map(e=>e.path),re=C.length===4&&C.every(e=>e===C[0])?C[0]:null,ie=0,ae=0,oe=0,L=n.Dt,se=X.triesMax,ce=null;for(let e=0;e<se&&!(b.length>=X.cands||b.length>=3&&e>=X.tries);e++){e===X.tries&&!b.length&&(ae=1),e===X.tries+50&&!b.length&&(ae=2),e===X.tries+100&&!b.length&&(ae=3),ie++,p.tries++;let u=e=>{let t=n.phase+`:`+e;p.why[t]=(p.why[t]||0)+1};(!ce||e===X.tries||e===X.tries+50||e===X.tries+100)&&(ce=n.forceKind&&h(n.forceKind)&&e<X.tries+100?n.forceKind:te(n.phase,e=>h(e)&&e!==S));let f=ce;if(!f){u(`info`);continue}let g=Gm(f,0,0,o),_=g.shape===`band`&&g.rin+Wu.tol-l>0,v=`out`;if(_){let e=I.out+I.center,t=e?I.center/e:0,n=X.pathMix.center/(X.pathMix.out+X.pathMix.center);v=o()<Math.max(.1,Math.min(.9,n+(n-t)*2))?`center`:`out`,re&&(v=re===`center`?`out`:`center`)}n.forceWish&&(_||n.forceWish===`out`)&&(v=n.forceWish);let x=n.tq+g.lead-Math.max(A,n.tq-zm(f)),C=eh(r,x),w=eh(r,x,!0,X.humanReact),D=d(),j=a?s(.15,.45):s(.25,.9),N=Math.max(X.moveMin,Math.min(X.moveMax,w*j)),P=_?g.rin+Wu.tol-l+X.stillIn:0,F=g.rout-Wu.tol+l-X.stillIn,se,le=D;if(v===`out`){se=g.rout+l+Wu.outPad+.1-N,se=Math.max(P,Math.min(F,se));let e=g.rout+l+Wu.outPad+.2-se;(k[0]+D[0]*e)**2/(Sm.u*.9)**2+(k[1]+D[1]*e)**2/(Sm.v*.9)**2>1&&(le=[-D[0],-D[1]]),g.u=k[0]-le[0]*se,g.w=k[1]-le[1]*se+g.drop}else{let e=g.rin-l-Wu.centerPad;se=Math.max(P,Math.min(F,e-.1+N)),(k[0]+D[0]*se)**2/(Sm.u*.8)**2+(k[1]+D[1]*se)**2/(Sm.v*.8)**2>1&&(le=[-D[0],-D[1]]),g.u=k[0]+le[0]*se,g.w=k[1]+le[1]*se+g.drop}let R=[g],ue=n.nE;for(let e=1;e<ue;e++){let t=n.forceKind===`dahlia`&&h(`dahlia`)?`dahlia`:te(n.phase,e=>h(e));if(!t)break;let r=Gm(t,0,0,o),i=!1;for(let t=0;t<8&&!i;t++){let t=e===1?o()<.5?-1:1:-R[1].side,a=Math.atan2(le[1],le[0])+t*(s(60,150)*Math.PI)/180,c=n.forceKind===`dahlia`?s(1.8,3):o()<.7?s(-1.6,-.4):s(1.7,3),l=Math.max(.5,g.rout+r.rout+c);r.u=g.u+Math.cos(a)*l,r.w=g.w-g.drop+Math.sin(a)*l+r.drop,r.side=t,i=ee(r)}if(!i)break;R.push(r)}if(!a&&!$m(R,M[0],M[1],l,.2)&&o()<X.camp){let e=Gm(`peonyS`,0,0,o),t=s(0,Math.PI*2),n=s(0,.8);e.u=M[0]+Math.cos(t)*n,e.w=M[1]+Math.sin(t)*n+e.drop,e.camp=!0,h(`peonyS`)&&R.push(e)}if(!R.every(ee)){u(`clamp`);continue}let de=vh(R);if(de){u(`R4`+de);continue}let fe=Math.max(...R.map(e=>n.tq-zm(e.kind))),pe=Math.min(...R.map(e=>n.tq+e.lead));if(x=pe-Math.max(A,fe),C=eh(r,x),w=eh(r,x,!0,X.humanReact),!a&&!$m(R,k[0],k[1],l,X.stillIn-.05)){u(`R1`);continue}lh(R,l,T);let me=mh(T,R,k),he=e=>ae>=3?.3:e.path===`center`?m.insCenter:m.insOut,ge=me.filter(e=>e.M<=m.reach*w&&e.ins>=he(e));if(!ge.length){u(`R2`);continue}let _e=ge.filter(e=>e.M<=C*.95);if(!_e.length){u(`reach`);continue}let ve=_h(me,w,x,ne);if(ae<1&&!a){let e=ve.n;if(n.phase===`early`&&e<2){u(`R5lo`);continue}if((n.phase===`late`||n.phase===`finale`)&&e>2){u(`R5hi`);continue}}let ye=null,be=1/0;for(let e of _e){let t=gh(e,w,x)+(e.path===v?0:n.forceWish?5:.6);t<be&&(be=t,ye=e)}if(ae<2&&!a&&(n.pat===`zig`||n.pat===`wave`)){let e=km[ye.cM]-k[0],t=Am[ye.cM]-k[1];if(Math.hypot(e,t)>.8){let r=Math.abs(e)>=Math.abs(t);if(n.pat===`zig`!==r){u(`R6`);continue}}}ch(T,E);let xe=0;for(let e=0;e<Em;e++)O[e]&&E[e]>xe&&(xe=E[e]);if(xe>C){u(`chain`);continue}let Se=ye.path===`center`?.1:.15,Ce=ye.cM,we=-1/0;for(let e=0;e<Em;e++){if(!T[e]||hh(e)!==ye.id)continue;let t=Math.hypot(km[e]-k[0],Am[e]-k[1]);if(t>ye.M+(ye.path===`center`?1.2:.45))continue;let n=Ym(R,km[e],Am[e],l);if(n<Se)continue;let r=Math.min(n,.7)-.3*Math.max(0,t-ye.M);r>we&&(we=r,Ce=e)}let Te=[km[Ce],Am[Ce]],Ee=Math.hypot(Te[0]-k[0],Te[1]-k[1]);if(Ee>C*.95){u(`need`);continue}oe++;let De={eggs:R,need:Ee,target:Te,path:ye.path,wish:v,D:ve.D,nZone:ve.n,zones:me.map(e=>({M:+e.M.toFixed(2),ins:+e.ins.toFixed(2),path:e.path,n:e.n})),zT:{M:ye.M,ins:ye.ins},dir:le,pat:n.pat,T:x,Th:x,reach:C,reachH:w,worst:xe,relax:ae,tInfo:fe,tPrev:A,tArr:pe,kindA:f};if(t.los){let e={tq:n.tq,s:n.s,eggs:R,P:k.slice(),T:Te};for(let e of R)e.info=n.tq-zm(e.kind),e.s=c+(n.tq+e.lead)*i;if(!t.los(e)){p.losReject++,(!y||Math.abs(De.D-L)<Math.abs(y.D-L))&&(y=De);continue}}b.push(De)}let le=b;n.forceWish&&le.some(e=>e.path===n.forceWish)&&(le=le.filter(e=>e.path===n.forceWish)),re&&le.some(e=>e.path!==re)&&(le=le.filter(e=>e.path!==re));for(let e of le){e.Df=e.D,e.D=t.noBot?e.Df:100*xh(r,{eggs:e.eggs,P:k.slice(),tq:n.tq,tInfo:e.tInfo,tPrev:e.tPrev},X.botN,w);let i=a?e.D:Math.abs(e.D-L)+.01*Math.abs(e.Df-50);i<_&&(_=i,g=e)}!g&&y&&(g=y,g.losFail=!0,p.losFail++);let R={i:f.length,tq:n.tq,s:n.s,zone:n.zone,kind:n.kind,phase:n.phase,nE:n.nE,pat:n.pat,Dt:+L.toFixed(1),scene:n.scene||null,sceneNb:!!n.sceneNb,nCand:b.length,gapE:Math.round((n.tq-(f.length?f[f.length-1].tq:0))/u),P:k.slice(),tries:ie};if(g){Object.assign(R,g),g.relax&&(p.relaxed++,p.relaxLog.push({i:R.i,phase:n.phase,relax:[``,`R5`,`R5+R6`,`R5+R6+R3`][g.relax]})),I[g.path]=(I[g.path]||0)+1,lh(g.eggs,l,T),ch(O,D);let e=new Uint8Array(Em),t=0;for(let n=0;n<Em;n++)T[n]&&D[n]<=g.reach&&(e[n]=1,t++);R.sCount=t,O=e,k=g.target.slice()}else{p.fails++,R.failed=!0,R.eggs=[],R.target=k.slice(),R.T=0,R.reach=0,R.reachH=0,R.D=null,ch(O,D);let e=new Uint8Array(Em);for(let t=0;t<Em;t++)e[t]=jm[t]&&D[t]<=3?1:0;O=e}for(let e of R.eggs)e.tm=n.tq+e.lead,e.s=c+e.tm*i,e.info=n.tq-zm(e.kind),e.reveal=e.info,e.launch=n.tq-Rm(e.kind),e.egg=n.tq-Gu.eggBefore;R.tPass=R.eggs.length?Math.max(...R.eggs.map(e=>e.tm)):n.tq+Gu.lead.M,R.info=R.eggs.length?Math.max(...R.eggs.map(e=>e.info)):n.tq,R.reveal=R.eggs.length?Math.min(...R.eggs.map(e=>e.info)):n.tq,f.length&&R.eggs.length&&(R.infoAfterPrevBurst=+(R.reveal-j).toFixed(3),R.reveal<j+Gu.infoGap-1e-6&&(p.infoViol=(p.infoViol||0)+1)),R.eggs.length&&(A=R.tPass,j=n.tq),f.push(R)}return{bird:e,seed:a,sStart:c,waves:f,log:p,ms:(typeof performance<`u`?performance.now():Date.now())-n}}function Eh(e){let t=e.waves.filter(e=>!e.failed),n=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:0,r=e=>{let t=n(e);return Math.sqrt(n(e.map(e=>(e-t)**2)))},i={};for(let t of e.waves)i[t.phase]=(i[t.phase]||0)+1;let a={out:0,center:0};for(let e of t)a[e.path]=(a[e.path]||0)+1;let o={};for(let e of t)for(let t of e.eggs)o[t.kind]=(o[t.kind]||0)+1;let s={};for(let e of t)(s[e.phase]||(s[e.phase]=[])).push(e.D);let c={};for(let[e,t]of Object.entries(s))c[e]={n:t.length,mean:+n(t).toFixed(1),sd:+r(t).toFixed(1),min:+Math.min(...t).toFixed(1),max:+Math.max(...t).toFixed(1)};let l=0;for(let e=1;e<t.length;e++)t[e-1].phase!==`rest`&&t[e].phase!==`rest`&&(l=Math.max(l,Math.abs(t[e].D-t[e-1].D)));return{waves:e.waves.length,eggs:t.reduce((e,t)=>e+t.eggs.length,0),maxEggs:Math.max(0,...t.map(e=>e.eggs.length)),phases:i,paths:a,kinds:o,D:c,neighborMax:+l.toFixed(1),gapMin:+Math.min(...e.waves.slice(1).map(e=>e.T||99)).toFixed(2),fails:e.log.fails,relaxed:e.log.relaxed,losFail:e.log.losFail,infoViol:e.log.infoViol||0,ms:+e.ms.toFixed(1)}}var Dh=(e,t)=>e+Math.random()*(t-e),Oh=(e,t)=>Math.floor(e+Math.random()*(t-e+1));Vu.ellipse;function kh(e,t,n,r,i,a,o,s,c){let l=o-r,u=s-i,d=c-a,f=l*l+u*u+d*d,p=f>1e-9?((e-r)*l+(t-i)*u+(n-a)*d)/f:0;p=p<0?0:p>1?1:p;let m=r+l*p-e,h=i+u*p-t,g=a+d*p-n;return Math.sqrt(m*m+h*h+g*g)}var Ah=3,jh=Y.look,Mh=`
attribute vec4 aO;  // 원점 xyz(세계), R(머리 반경 상한)
attribute vec4 aD;  // 방향 xyz(세계, 깊이 흔들림 포함), k
attribute vec4 aP;  // 나이, 꼬리 끝 비율 endR, 머리 코어 반지름(m), 꼬리 폭(머리 쪽, m)
attribute vec4 aC;  // 머리 색 rgb(HDR), 불투명도
attribute vec4 aE;  // 꼬리 끝 점 색 rgb, 끝 점 밝기(0 = 없음)
attribute vec4 aG;  // 판정 처짐(m), 판정 뒤 처짐 가속, 판정 뒤 처짐 시작 나이, 꼬리 밝기 반감 길이(m)
attribute vec4 aF;  // 반짝임 Hz(0 = 없음), 위상, 꼬리 밝기 바닥, 꼬리 폭(끝 쪽, m)
attribute vec3 aQ;  // 꼬리 색 rgb(HDR, 흰빛 시작 없이 그 불꽃 색)
uniform float uScale;
uniform vec2 uViewport;
uniform float uMaxPx;
uniform vec3 uNear;
uniform vec4 uNearCam;
varying vec3 vC;
varying vec3 vT;
varying vec3 vQ;
varying float vA;
varying vec2 vP;
varying float vS;
varying float vMode;
varying float vW;
varying float vL;
varying vec4 vF;
varying float vHalf;
vec3 posAtR(float r) {
  float x = clamp(r / max(aO.w, 1e-3), 0.0, 0.999);
  float tp = -log(1.0 - x) / max(aD.w, 1e-3);
  float q = max(0.0, tp - aG.z);
  return aO.xyz + aD.xyz * r - vec3(0.0, aG.x + 0.5 * aG.y * q * q, 0.0);
}
void main() {
  float age = aP.x;
  float rH = aO.w * (1.0 - exp(-aD.w * age));
  float rE = rH * aP.y;
  vec3 H = posAtR(rH);
  vec4 mvH = modelViewMatrix * vec4(H, 1.0);
  float depth = -mvH.z;
  if (depth < 0.3 || aC.a < 0.002) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 hv = uViewport * 0.5;
  float a = aC.a * mix(uNear.z, 1.0, smoothstep(uNear.x, uNear.y, depth)); // 카메라 1.5~4.5m 안 별은 빨리 옅게
  a *= mix(uNearCam.z, 1.0, smoothstep(uNearCam.x, uNearCam.y, depth)); // 카메라 10m 안 별 밝기 ×0.5
  vC = aC.rgb;
  vT = aE.rgb;
  vQ = aQ;
  vF = aF;
  vHalf = aG.w;
  vL = rH - rE;
  vW = 0.0;
  vS = 0.0;
  if (position.z > 0.5) {
    // 머리(1) · 꼬리 끝 점(2): 화면을 보는 둥근 점
    bool tip = position.z > 1.5;
    if (tip && (aE.w <= 0.0 || vL < 0.02)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
    vec3 Pp = tip ? posAtR(rE) : H;
    vec4 mv = modelViewMatrix * vec4(Pp, 1.0);
    float d = max(0.3, -mv.z);
    float rad = tip ? 0.035 : aP.z;
    float ext = tip ? 1.6 : 2.2;
    float px = rad * uScale / d;
    if (d < uNearCam.y && px > uNearCam.w * 0.5) px = uNearCam.w * 0.5;
    if (px < 0.9) { a *= px * px / 0.81; px = 0.9; }
    px = min(px, uMaxPx);
    vec4 c = projectionMatrix * mv;
    c.xy += position.xy * ext * px / hv * c.w;
    gl_Position = c;
    vP = position.xy * ext;
    vMode = tip ? 2.0 : 1.0;
    vA = a * (tip ? aE.w : 1.0);
    return;
  }
  // 리본 꼬리: position.x = 0(머리) ~ 1(끝), position.y = ±1
  if (vL < 0.01) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float s = position.x;
  float r = rH - s * vL;
  float e = max(0.02, vL * 0.08);
  vec3 p = posAtR(r);
  vec3 pa = posAtR(min(rH, r + e));
  vec3 pb = posAtR(max(rE, r - e));
  vec4 m1 = modelViewMatrix * vec4(p, 1.0);
  vec4 ma = modelViewMatrix * vec4(pa, 1.0);
  vec4 mb = modelViewMatrix * vec4(pb, 1.0);
  if (-m1.z < 0.3) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  if (-ma.z < 0.3) ma = m1;
  if (-mb.z < 0.3) mb = m1;
  vec4 c1 = projectionMatrix * m1;
  vec4 ca = projectionMatrix * ma;
  vec4 cb = projectionMatrix * mb;
  vec2 sa = ca.xy / ca.w * hv, sb = cb.xy / cb.w * hv;
  vec2 dd = sb - sa;
  float dl = length(dd);
  vec2 dir = dl > 0.001 ? dd / dl : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float wpx = mix(aP.w, aF.w, s) * uScale / max(0.3, -m1.z);
  float aw = 1.0;
  if (wpx < 1.1) { aw = wpx / 1.1; wpx = 1.1; }
  float hw = wpx * 0.5 + 0.7; // 가장자리 부드럽게 0.7px
  vec2 sc = c1.xy / c1.w * hv + nrm * position.y * hw;
  gl_Position = vec4(sc / hv * c1.w, c1.z, c1.w);
  vP = vec2(0.0, position.y * hw);
  vW = wpx * 0.5;
  vS = s;
  vMode = 0.0;
  vA = a * aw;
}
`,Nh=`
uniform float uTime;
varying vec3 vC;
varying vec3 vT;
varying vec3 vQ;
varying float vA;
varying vec2 vP;
varying float vS;
varying float vMode;
varying float vW;
varying float vL;
varying vec4 vF;
varying float vHalf;
void main() {
  vec3 col;
  if (vMode > 1.5) {
    // 꼬리 끝 변색 점(구멍 경계를 선으로)
    float q = length(vP);
    float I = 1.0 - smoothstep(0.65, 1.35, q);
    if (I <= 0.0) discard;
    col = vT * I;
  } else if (vMode > 0.5) {
    // 머리: 가우스 빛(코어 반지름 1 에서 0.08) + 가운데 작은 뜨거운 점
    float q = length(vP);
    if (q > 2.2) discard;
    float I = exp(-2.5 * q * q) + 0.3 * (1.0 - smoothstep(0.0, 0.55, q));
    col = vC * I;
  } else {
    // 꼬리: 머리에서 멀어질수록 지수로 옅어짐(반감 길이 vHalf, 바닥 vF.z), 끝으로 갈수록 끝 색, 15% 는 반짝임
    float e = abs(vP.y);
    float prof = 1.0 - smoothstep(max(0.0, vW - 0.5), vW + 0.7, e);
    if (prof <= 0.0) discard;
    float d = vS * vL;
    float b = max(exp2(-d / max(vHalf, 0.01)), vF.z);
    if (vF.x > 0.0) b *= 0.45 + 0.55 * step(0.4, fract(sin(floor(vS * 16.0) * 12.9898 + vF.y) * 43758.5453 + uTime * vF.x));
    float hm = max(vQ.r, max(vQ.g, vQ.b));
    vec3 cc = mix(vQ, mix(vQ, vT * hm, 0.5) * 0.8, smoothstep(0.6, 1.0, vS));
    col = cc * b * (0.3 + 0.45 * exp2(-d / max(vHalf * 0.5, 0.01))) * prof; // 머리 쪽은 더 밝고 굵어 보이게(끝으로 갈수록 가는 실)
  }
  gl_FragColor = vec4(col, vA);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,Ph=class{constructor(e){this.max=e,this.n=0,this.A={};let t=new Fo,n=[];for(let e=0;e<=Ah;e++)n.push(e/Ah,-1,0,e/Ah,1,0);let r=n.length/3;n.push(-1,-1,1,1,-1,1,-1,1,1,1,1,1);let i=n.length/3;n.push(-1,-1,2,1,-1,2,-1,1,2,1,1,2);let a=[];for(let e=0;e<Ah;e++){let t=2*e;a.push(t,t+1,t+2,t+2,t+1,t+3)}a.push(r,r+1,r+2,r+2,r+1,r+3),a.push(i,i+1,i+2,i+2,i+1,i+3),t.setAttribute(`position`,new _r(new Float32Array(n),3)),t.setIndex(a),this.attrs=[];for(let n of[`aO`,`aD`,`aP`,`aC`,`aE`,`aG`,`aF`]){let r=new Float32Array(e*4);this.A[n]=r;let i=new Si(r,4).setUsage(We);t.setAttribute(n,i),this.attrs.push(i)}this.A.aQ=new Float32Array(e*3);let o=new Si(this.A.aQ,3).setUsage(We);t.setAttribute(`aQ`,o),this.attrs.push(o),t.instanceCount=0,t.boundingSphere=new Cr(new G,1e6),this.material=new wa({vertexShader:Mh,fragmentShader:Nh,uniforms:{uScale:{value:500},uViewport:{value:new W(1280,720)},uMaxPx:{value:60},uNear:{value:new G(1.5,4.5,.05)},uNearCam:{value:new Yt(8,10,.5,30)},uTime:{value:0}},transparent:!0,depthWrite:!1,side:2,blending:2}),this.mesh=new ii(t,this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=8,this.isDebug=new Uint8Array(e)}begin(e=0){this.n=0,this.material.uniforms.uTime.value=e}push(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O=p,k=m,A=h){if(this.n>=this.max)return this.over=(this.over||0)+1,-1;let j=this.n++,M=j*4,N=this.A;N.aO[M]=e,N.aO[M+1]=t,N.aO[M+2]=n,N.aO[M+3]=o,N.aD[M]=r,N.aD[M+1]=i,N.aD[M+2]=a,N.aD[M+3]=s,N.aP[M]=c,N.aP[M+1]=l,N.aP[M+2]=u,N.aP[M+3]=d,N.aC[M]=p,N.aC[M+1]=m,N.aC[M+2]=h,N.aC[M+3]=g,N.aE[M]=_,N.aE[M+1]=v,N.aE[M+2]=y,N.aE[M+3]=b,N.aG[M]=x,N.aG[M+1]=S,N.aG[M+2]=C,N.aG[M+3]=w,N.aF[M]=T,N.aF[M+1]=E,N.aF[M+2]=D,N.aF[M+3]=f;let P=j*3;return N.aQ[P]=O,N.aQ[P+1]=k,N.aQ[P+2]=A,this.isDebug[j]=0,j}dot(e,t,n,r,i,a,o,s=1){let c=this.push(e,t,n,0,0,0,1,10,1,1,r,0,0,i,a,o,s,0,0,0,0,0,0,99,1,0,0,0);return c>=0&&(this.isDebug[c]=1),c}end(){let e=this.mesh.geometry;e.instanceCount=this.n;for(let e of this.attrs)e.clearUpdateRanges(),this.n&&e.addUpdateRange(0,this.n*e.itemSize),e.needsUpdate=!0}},Fh=2654435769,Ih=()=>(Fh^=Fh<<13,Fh>>>=0,Fh^=Fh>>>17,Fh^=Fh<<5,Fh>>>=0,Fh/4294967296),$=(e,t)=>e+Ih()*(t-e),Lh=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},Rh=class e{constructor(t,n){this.root=new kn,t.add(this.root),this.lights=n,this.list=[],this.events=[],this.nextId=1,this.course=null,this.world=null,this.debug=!1,this.stars=new Ph(7e3),this.root.add(this.stars.mesh),this.sparks=new Hd(zu.pool,{kind:`spark`}),this.sparks.mesh.renderOrder=7,this.root.add(this.sparks.mesh),this.omens=new ym,this.omens.dropAt=(t,n)=>e.dropAt(t,n),this.overlay=this.omens.scene,this.emitMult=1,this.shadowOn=!1,this._c=[0,0,0],this._dbgSafe=new Uint8Array(Nm.NC),this.resetLog()}resetLog(){this.log={gen:[],fails:0,hits:0,judgeMs:[],judgeSegs:0,visOutHits:0,hitDist:[],maxActive:0,arrive:[],eggGap:[],timing:0,plan:null,maxJudging:0,burstT:[],burstLate:[],hitPart:[],headMin:1/0,decorMax:0,decorN:0,decorRej:0,embersN:0,embersCut:0,decorSafe:0,decorMoved:0,decorChecked:0},this.omens&&this.omens.resetStats()}setStage(e,t,n=null){this.stage=e,this.course=t,this.world=n,this.reset()}reset(){this.list.length=0,this.events.length=0,this.sharedSparks||this.sparks.clear(),this.stars.begin(),this.stars.end(),this.omens&&this.omens.update([],0,null),this.lights&&this.lights.releaseHeld()}setLowSpec(e,t){this.emitMult=e?t:1,this.sharedSparks||(this.sparks.limit=Math.floor(zu.pool*this.emitMult))}useSparks(e){this.root.remove(this.sparks.mesh),this.sparks=e,this.sharedSparks=!0}setPointScale(e,t,n,r){this.sharedSparks||(this.sparks.setScale(e,t,n),this.sparks.setScaleMax(r));let i=this.stars.material.uniforms;i.uScale.value=e,i.uViewport.value.set(t,n),i.uMaxPx.value=n/1080*60;let a=Y.nearCam;i.uNearCam.value.set(a.from,a.dist,a.mult,a.capM*e/a.dist),this.omens.setScale(e,n,t)}static rb(e){return e.radius*Y.birdHitMult}static starAt(t,n,r,i,a,o){let s=t.life[n];if(r<0||r>=s)return-1;let c=t.spd[n]*(1-Math.exp(-t.k*r)),l=c*t.endR[n],u=n*3,d=t.dir[u],f=t.dir[u+1],p=t.dir[u+2],m=e.dropAt(t,r);return i[o]=t.ox+d*c,i[o+1]=t.oy+f*c,i[o+2]=t.oz+p*c-m,a[o]=t.ox+d*l,a[o+1]=t.oy+f*l,a[o+2]=t.oz+p*l-m,r/s}static lumColor(e){let t=.2126*e[0]+.7152*e[1]+.0722*e[2],n=Y.colorLum/Math.max(1e-6,t);return[e[0]*n,e[1]*n,e[2]*n]}static dropAt(e,t){let n=t-e.tDrop;return Wm(t)+(n>0?.5*e.gAfter*n*n:0)}static bandClear(t,n,r,i,a,o){if(n<0)return 1/0;let s=(1-Math.exp(-t.k*n))/t.ex,c=i-t.oy,l=a-(t.oz-e.dropAt(t,n));return qm(t.shape,t.rin*s,t.rout*s,Math.sqrt(c*c+l*l),o)}static stemClear(t,n,r,i,a,o){return e.bandClear(t,n,r,i,a,o)}foldWanted(t){let n=this._lf||=[0,0,0];for(let r of this.list){if(r.shape!==`band`||!r.egg)continue;let i=(r.s-t.s)/t.forward;if(!(Math.abs(i)>Wu.foldWin)&&(e.toL(r,t.pos,n),Math.hypot(n[1]-r.oy,n[2]-(r.oz-r.egg.drop))<r.rin))return!0}return!1}static judging(e,t){return e.burst&&t<=(e.crossT===void 0?e.tMeet:e.crossT)+Y.judgeAfter}static toW(e,t,n,r,i){return i.x=e.Cw.x+e.F.x*t+e.R.x*n,i.y=e.Cw.y+r+(e.slope||0)*t,i.z=e.Cw.z+e.F.z*t+e.R.z*n,i}static toL(e,t,n){let r=t.x-e.Cw.x,i=t.y-e.Cw.y,a=t.z-e.Cw.z;return n[0]=r*e.F.x+a*e.F.z,n[1]=r*e.R.x+a*e.R.z,n[2]=i-(e.slope||0)*n[0],n}loadPlan(e,t,n){this.reset(),this.plan=e,this.birdSpec=n.spec,this.log.plan={seed:e.seed,ms:+e.ms.toFixed(1),waves:e.waves.length,fails:e.log.fails,relaxed:e.log.relaxed,losFail:e.log.losFail},this.log.fails=e.log.fails;let r=n.forward;for(let i of e.waves){let e=t+i.tq,a={id:this.nextId++,type:i.pat,wave:i,bird_r:n.radius,s:i.s,tq:e,tqE:i.tq,meetT:t+i.tPass,meetE:i.tPass,passE:i.tPass,finale:i.kind===`finale`,layers:[],shells:[],ready:!0,res:null,hit:!1,minClear:1/0,centered:!1,hasRing:!1,target:i.target,P:i.P},o={kind:`mix`,meetT:a.meetT,tBurst:e,shells:[],target:i.target,s:i.s},s=0;for(let n of i.eggs){let r=t+n.tm,i={tLaunch:t+n.launch,tBurst:e,meetT:r,s:n.s},c=this._shell(n.kind,i,n.u,n.w,n);c.ev=a,c.egg=n,c.rPassPlan=n.rout,c.rPass=n.rout,c.tInfo=t+n.info,c.tOpen=t+n.egg,c.emberPh=Math.random()*6.28,o.shells.push(c),a.shells.push(c),this.list.push(c),n.shape===`band`&&(a.hasRing=!0),s=Math.max(s,.5)}o.winStart=e,o.winEnd=(o.shells.length?Math.max(...o.shells.map(e=>e.tMeet)):a.meetT)+(s+n.radius+.6)/r,a.layers.push(o),a.shells.length&&(a.shells[0].light=!0),this.events.push(a),this.log.gen.push({id:a.id,i:i.i,pat:i.pat,tq:+i.tq.toFixed(2),n:i.eggs.length,ratio:i.ratio===void 0?null:+i.ratio.toFixed(3),need:i.need===void 0?null:+i.need.toFixed(2),reach:+i.reach.toFixed(2),worst:i.worst===void 0?null:+i.worst.toFixed(2),T:+i.T.toFixed(2),kind:i.kind,failed:!!i.failed,relaxed:!!i.relaxed,los:!i.losFail})}}_shell(t,n,r,i,a){let o=Y[t],s=this.course,c={id:this.nextId++,kind:t,K:o,tLaunch:n.tLaunch,tBurst:n.tBurst,tMeet:n.meetT,s:n.s,launched:!1,opened:!1,burst:!1,res:null,dim:1,camPassed:-1,color:[2,1.3,.5],k:a.k,droop:Wu.gJudge,ox:0,oy:0,oz:0,dimUntil:-99};c.uc=r,c.wc=i;let l=s.at(c.s,{});c.F={x:Math.sin(l.th),z:-Math.cos(l.th)},c.R={x:Math.cos(l.th),z:Math.sin(l.th)},c.Cw=s.toWorld(c.s,r,s.center(c.s)+c.wc,new G),c.slope=s.slope(c.s),c.R0=a.R,c.shape=a.shape,c.rin=a.rin,c.rout=a.rout,c.ex=a.ex,c.lead=a.lead,c.rp=a.rout,c.lam=a.shape===`band`?1-a.rin/a.rout:1,c.hole=a.shape===`band`,c.tDrop=c.tMeet-c.tBurst+Y.judgeAfter,c.gAfter=$(Wu.gAfter[0],Wu.gAfter[1])*(o.look===`willow`?1.25:1),c.look=o.look,c.dense=o.look===`peony`?.55:o.look===`dahlia`?.8:1;let u=a.ex,d=[],f=Math.ceil(2*Math.PI*a.rout*(1+2*jh.angJit)/(jh.starGap*.97)),p=(e,t)=>a.rout-t>1.2?Math.round(e*jh.inner.frac/(1-jh.inner.frac)):0;if(o.look===`peony`)d.push([Oh(o.stars[0],o.stars[1]),`sphere`,a.rout,0]);else{let e=o.look===`dahlia`?o.core.r-.1:a.rin,t=Math.max(Oh(o.stars[0],o.stars[1]),f);d.push([t,`band`,a.rout,e]);let n=p(t,e);n&&d.push([n,`inner`,a.rout,e]),o.look===`dahlia`&&d.push([o.core.n,`sphere`,o.core.r,0])}let m=0;for(let e of d)m+=e[0];c.n=m,c.nOuter=d[0][0],this._alloc(c,m);let h=o.look===`willow`,g=0;for(let[e,t,n,r]of d){let i=$(0,Math.PI*2),a=Math.PI*2/e;for(let s=0;s<e;s++,g++){let e=i+(s+.5+$(-jh.angJit,jh.angJit))*a,l=h?$(.11,.14):t===`sphere`?$(.07,.1):$(jh.head[0],jh.head[1]),f,p,m,_,v,y,b,x;if(t===`band`||t===`inner`){f=(n-.5*l)*(t===`inner`?$(jh.inner.j[0],jh.inner.j[1]):$(1-2*jh.spdJit,1));let e=r>.5&&n-r>1.2&&Ih()<.35;p=Math.min(.98,(e?r+$(.25,.6)*(f-r):Math.max(0,r))/f),m=$(0,jh.depthJit),_=Math.max(.15,(f-r)*jh.tailHalf),v=jh.tailFloor,y=h?.075:jh.tailW[0],b=h?.022:jh.tailW[1],x=+!e}else{let e=$(-1,1),t=Math.sqrt(Math.max(0,1-e*e));f=Math.max(.05,t*(n-.5*l)*$(.97,1));let r=Math.min(.35,f*.45);p=Math.max(0,1-r/f),m=e*jh.depthJit,_=.12,v=0,y=.035,b=.01,x=0}c.dir[g*3]=m/Math.max(.3,f),c.dir[g*3+1]=Math.cos(e),c.dir[g*3+2]=Math.sin(e),c.spd[g]=f/u,c.endR[g]=p,c.hr[g]=l,c.half[g]=_,c.floor[g]=v,c.tw0[g]=y,c.tw1[g]=b,c.tip[g]=x,c.spk[g]=Ih()<jh.sparkle.frac?$(jh.sparkle.hz[0],jh.sparkle.hz[1]):0,c.life[g]=$(o.life[0],o.life[1]),c.size[g]=l,c.core[g]=+(t===`sphere`&&d.length>1),c.ph[g]=$(0,6.28)}}let _=Object.keys(Y.colors).filter(e=>!Y.colorDrop.includes(e));if(c.colName=h?`gold`:_[Math.floor($(0,_.length))%_.length],c.hdr=h?1.7:$(jh.hdr[0],jh.hdr[1]),c.color=e.lumColor(Y.colors[c.colName]),!h&&Ih()<Y.twoTone){let t=_[Math.floor($(0,_.length))%_.length];t===c.colName&&(t=_[(_.indexOf(t)+1+Math.floor($(0,_.length-1)))%_.length]),c.colName2=t,c.color2=e.lumColor(Y.colors[t])}return c.eggCol=Y.colors[c.colName],c.after=h?`willow`:Y.after[Math.floor($(0,Y.after.length))%Y.after.length],this.forceColor&&(c.colName=this.forceColor,c.color=e.lumColor(Y.colors[c.colName]),c.color2=null,c.eggCol=Y.colors[c.colName]),c}_alloc(e,t){e.dir=new Float32Array(t*3),e.spd=new Float32Array(t),e.endR=new Float32Array(t),e.hr=new Float32Array(t),e.half=new Float32Array(t),e.floor=new Float32Array(t),e.tw0=new Float32Array(t),e.tw1=new Float32Array(t),e.tip=new Uint8Array(t),e.spk=new Float32Array(t),e.life=new Float32Array(t),e.size=new Float32Array(t),e.core=new Uint8Array(t),e.ph=new Float32Array(t),e.H=new Float32Array(t*3),e.T=new Float32Array(t*3),e.U=new Float32Array(t).fill(-1)}static minClear(t,n,r,i,a,o){return e.stemClear(t,n,r,i,a,o)}update(t,n,r,i,a=null,o=null){let s=performance.now(),c=this.sparks,l=0,u=0;this._up||=new G;for(let r of this.list){if(!r.launched&&n>=r.tLaunch&&(r.launched=!0,this._launchSite(r),i.push({kind:`launch`,threat:r,gate:r})),r.launched&&!r.opened&&this._rise(r,n,t),r.launched&&!r.opened&&n>=r.tOpen&&(r.opened=!0,r.eggW=r.eggW||new G,i.push({kind:`open`,threat:r})),r.opened&&!r.burst){let e=Ku.descent*Math.max(0,r.tBurst-n);r.eggW.set(r.Cw.x,r.Cw.y+e,r.Cw.z),r.headW.copy(r.eggW)}if(r.launched&&!r.burst&&n>=r.tBurst&&(r.burst=!0,this.log.burstT.push(+r.tBurst.toFixed(3)),this.log.burstLate.push(+(n-r.tBurst).toFixed(4)),r.eggW&&this.log.eggGap.push(+r.eggW.distanceTo(r.Cw).toFixed(4)),this._burstFx(r),i.push({kind:`burst`,threat:r,gate:r}),this.lights&&r.light&&(r.lightSlot=this.lights.hold(r.id,r.Cw,Y.light.color,0,Y.light.radius))),r.burst&&!r.done&&l++,e.judging(r,n)&&u++,r.burst&&a&&r.camPassed<0){let e=a.x-r.Cw.x,t=a.z-r.Cw.z;e*r.F.x+t*r.F.z>0&&(r.camPassed=n)}if(r.burst&&this.lights&&r.lightSlot!==void 0&&r.lightSlot>=0){let e=Y.light,t=n-r.tBurst,i=Math.min(1,t/e.inT),a=t<e.inT+e.holdT?1:Math.max(0,1-(t-e.inT-e.holdT)/e.outT);this.lights.setHeld(r.lightSlot,e.I*i*a),a<=0&&(this.lights.release(r.lightSlot),r.lightSlot=-1)}r.burst&&r.tJudgeEnd===void 0&&!e.judging(r,n)&&(r.tJudgeEnd=n),r.burst&&!r.embered&&r.tJudgeEnd!==void 0&&!this._judgingNear(r,n,Y.look.decorGap)&&(r.embered=!0,this._embers(r,n),i.push({kind:`fade`,threat:r})),r.burst&&n-r.tBurst>Y[r.kind].life[1]+.1&&(r.done=!0)}this.log.maxActive=Math.max(this.log.maxActive,l),this.log.maxJudging=Math.max(this.log.maxJudging,u),this._positions(n),this._nowCv=n,this._draw(n,t),r&&this._judge(n,t,r,i);for(let e=this.list.length-1;e>=0;e--){let t=this.list[e];t.done&&(t.ev.res||!r)&&(t.lightSlot>=0&&this.lights&&this.lights.release(t.lightSlot),this.list.splice(e,1))}for(let e=this.events.length-1;e>=0;e--){let t=this.events[e];t.res&&n>t.meetT+4&&this.events.splice(e,1)}this.sharedSparks||c.update(t),this.omens.update(this.events,n,o,r),this.lastMs=performance.now()-s}_positions(t){for(let n of this.list){if(!n.burst)continue;let r=t-n.tBurst;for(let t=0;t<n.n;t++)n.U[t]=e.starAt(n,t,r,n.H,n.T,t*3)}}_judge(t,n,r,i){let a=performance.now(),o=e.rb(r),s=this._l||=[0,0,0],c=this._hit||={i:-1,r:0,rh:0},l=0;for(let a of this.events){if(!a.ready||a.res||!a.layers.length)continue;let u=a.layers[0].winEnd;if(!a.shells.length){t>u+.05&&(a.res=`empty`,a.reported=!0);continue}for(let u of a.shells){e.toL(u,r.pos,s);let d=r.s-u.s;if(u.prevX!==void 0&&u.prevX<0&&d>=0&&!u.crossed){u.crossed=!0;let i=u.prevX/(u.prevX-d),c=t-n+n*i;if(u.crossT=c,this.log.arrive.push({kind:u.kind,d:+(u.tBurst-c).toFixed(4),ra:+(c-u.tOpen).toFixed(4),ev:a.id,u:+r.u.toFixed(2),w:+r.w.toFixed(2)}),u.burst){let n=Math.hypot(s[1]-u.oy,s[2]-u.oz);if(u.path=u.egg?Zm(u.egg,s[1]-u.oy,s[2]-u.oz):`out`,u.crossRho=n,(a.paths||=[]).push(u.path),!a.hit){let n=1/0;for(let i of a.shells){if(!i.burst)continue;let a=[0,0,0];e.toL(i,r.pos,a),n=Math.min(n,e.stemClear(i,t-i.tBurst,a[0],a[1],a[2],o))}n>0&&n<=ed.timingR&&(a.timing=!0)}}}if(u.prevX=d,!u.burst)continue;let f=e.judging(u,t);if(Math.abs(s[0])>3)continue;if(!u.swished&&s[0]>0){u.swished=!0;let e=0,t=0;for(let n=0;n<u.n;n++){if(u.U[n]<0)continue;let r=n*3;Math.hypot(u.H[r]-s[0],u.H[r+1]-s[1],u.H[r+2]-s[2])<Y.swish&&(u.H[r+1]<s[1]?e++:t++)}e+t&&i.push({kind:`swish`,L:e,R:t,threat:u})}if(!f||Math.abs(s[0])>r.forward*Wu.window+1e-6)continue;l++;let p=e.bandClear(u,t-u.tBurst,s[0],s[1],s[2],o);p<a.minClear&&(a.minClear=p),p<0&&(c.i=0,c.rho=Math.hypot(s[1]-u.oy,s[2]-(u.oz-e.dropAt(u,t-u.tBurst))),this._contact(a,u,0,t,r,i,p,s,c))}t>u+.05&&this._finish(a,i)}this.log.judgeSegs=Math.max(this.log.judgeSegs,l);let u=performance.now()-a;l>0&&(this.log.judgeMs.push(u),this.log.judgeMs.length>2e4&&this.log.judgeMs.shift())}_contact(t,n,r,i,a,o,s,c=null,l=null){if(t.hit||t.rolled)return;if(a.rollInv>0){t.rolled=!0;let e=i-a.rollStart;t.res=e>=-1e-6&&e<=Yu.perfectWindow+1/60?`perfect`:`dodge`,this._pierce(n,a),o.push({kind:t.res,ev:t,threat:n,gate:n,lead:e,how:`roll`});return}if(a.invuln>0){t.immune=!0;return}t.hit=!0,t.res=`hit`;let u=this._visDist(a,n),d=e.rb(a);this.log.hitDist.push(+u.toFixed(3)),u>.001&&this.log.visOutHits++,this.log.hits++,l&&this.log.hitPart.push({rho:+(l.rho||0).toFixed(3),rin:+n.rin.toFixed(2),rout:+n.rout.toFixed(2),kind:n.kind,core:0,along:0}),this._pierce(n,a,!0),o.push({kind:`hit`,ev:t,threat:n,gate:n,dmg:Ru.bySize&&Ru.bySize[Y[n.kind].size]||Ru.threat,clear:s,vis:u,rb:d})}_visDist(t,n=null){if(!n)return 0;let r=[0,0,0];e.toL(n,t.pos,r);let i=this._nowCv-n.tBurst,a=(1-Math.exp(-n.k*i))/n.ex,o=Math.hypot(r[1]-n.oy,r[2]-(n.oz-e.dropAt(n,i))),s=e.rb(t),c=n.shape===`band`?n.rin*a-.05:-1,l=n.rout*a+.065;return o+s<c?c-o-s:o-s>l?o-s-l:-Math.min(o+s-c,l-(o-s))}_finish(e,t){if(e.res){e.reported||=!0;return}e.reported=!0,e.minClear<Math.max(Y.graze,1.6*e.bird_r)&&t.push({kind:`graze`,ev:e,gap:e.minClear}),e.timing&&(this.log.timing++,t.push({kind:`timing`,ev:e}));let n=e.paths||[];e.immune?(e.res=`immune`,t.push({kind:`immune`,ev:e})):n.includes(`center`)?(e.res=`center`,t.push({kind:`center`,ev:e})):(e.res=`pass`,t.push({kind:`pass`,ev:e})),this.log.paths=this.log.paths||{center:0,out:0},this.log.paths[e.res===`center`?`center`:`out`]++}_judgingNear(t,n,r){for(let i of this.list)if(i!==t&&i.burst&&e.judging(i,n)&&Math.abs(i.s-t.s)<r+.5)return!0;return!1}burstNear(e,t){for(let n of this.list)if(Math.abs(n.tBurst-e)<t)return!0;return!1}coverage(t,n=1920,r=1080){let i=Math.max(8,Math.round(54*n/r)),a=i*54;(!this._cv||this._cv.length!==a)&&(this._cv=new Uint8Array(a),this._cw=new Uint8Array(a),this._ch=new Uint8Array(a),this._chw=new Uint8Array(a));let o=this._cv,s=this._cw,c=this._ch,l=this._chw;o.fill(0),c.fill(0);let u=Math.tan(t.fov*Math.PI/360),d=t.matrixWorldInverse.elements,f=this._cv1||=new G,p=Y.passedFade,m=new Map,h=new Map,g=0,_=0,v=new Map;for(let e of this.list)if(e.burst&&!e.done){let t=v.get(e.ev)||[];t.push(e),v.set(e.ev,t)}for(let[n,r]of v){s.fill(0),l.fill(0);let v=0,y=0;for(let n of r){let r=this._nowCv-n.tBurst,a=this._nowCv-n.tMeet-p.delay,m=a>0?1-(1-p.to)*Math.min(1,a/p.time):1,h=r/n.K.life[1];if(m*(h>.6?Math.max(0,1-(h-.6)/.4):1)<.2)continue;let b=(1-Math.exp(-n.k*r))/n.ex,x=n.rout*b,S=n.shape===`band`?n.rin*b:0;f.copy(n.Cw),f.y-=e.dropAt(n,r);let C=-(d[2]*f.x+d[6]*f.y+d[10]*f.z+d[14]);if(C<=.3)continue;f.project(t);let w=(f.x+1)/2*i,T=(1-f.y)/2*54,E=27/(C*u),D=x*E,O=S*E,k=Math.max(0,Math.floor(w-D)),A=Math.min(i-1,Math.ceil(w+D)),j=Math.max(0,Math.floor(T-D)),M=Math.min(53,Math.ceil(T+D));for(let e=j;e<=M;e++)for(let t=k;t<=A;t++){let n=t+.5-w,r=e+.5-T,a=n*n+r*r;if(a>D*D)continue;let u=e*i+t;l[u]||(l[u]=1,y++),c[u]||(c[u]=1,_++),!(a<O*O)&&(s[u]||(s[u]=1,v++),o[u]||(o[u]=1,g++))}}m.set(n.id,v/a),h.set(n.id,y/a)}return{all:g/a,byEv:m,hull:_/a,hullByEv:h}}_pierce(t,n,r=!1){let i=[0,0,0];e.toL(t,n.pos,i);let a=new G;for(let n=0;n<t.n;n++){if(t.U[n]<0)continue;let o=n*3;if(kh(i[0],i[1],i[2],t.T[o],t.T[o+1],t.T[o+2],t.H[o],t.H[o+1],t.H[o+2])>1.3)continue;e.toW(t,t.H[o],t.H[o+1],t.H[o+2],a);let s=r?[2.2,.75,.2]:[.55,1.7,2.1];for(let e=0;e<3;e++)this.sparks.emit(a.x,a.y,a.z,Dh(-4,4),Dh(-3,3),Dh(-4,4),.4,.22,.04,s[0],s[1],s[2],s[0]*.3,s[1]*.3,s[2]*.3,1,3,2,2,2);t.cut=t.cut||new Uint8Array(t.n),t.cut[n]=1}}_launchSite(e){let t=this.course.toWorld(e.s+Dh(4,9),e.uc+Dh(-1.5,1.5),0,new G);t.y=this.world&&this.world.surfaceY?this.world.surfaceY(t.x,t.z)+.4:.6,t.y>-5||(t.y=.6),e.Lw=t,e.headW=t.clone()}_rise(e,t,n){let r=Math.max(.05,e.tOpen-e.tLaunch),i=Math.max(0,Math.min(1,(t-e.tLaunch)/r)),a=1-(1-i)*(1-i),o=e.Lw,s=e.Cw,c=s.y+Ku.descent*(e.tBurst-e.tOpen),l=o.x+(s.x-o.x)*a,u=o.y+(c-o.y)*a,d=o.z+(s.z-o.z)*a,f=2*(1-i)/r,p=(s.x-o.x)*f,m=(c-o.y)*f,h=(s.z-o.z)*f;e.headW.set(l,u,d);let g=this.sparks;if(e.kind===`ring`){let r=Math.floor((t-e.tLaunch)/.07)%2==0;if(g.emit(l,u,d,p*.4,m*.4,h*.4,Math.max(.03,n*1.5),.28,.28,2.3,1.75,.8,2.3,1.75,.8,1,0,0,0,2),r){let e=Math.max(1,Math.round(3*this.emitMult));for(let t=0;t<e;t++)g.emit(l,u,d,Dh(-.6,.6),Dh(-1.2,.2),Dh(-.6,.6),Dh(.35,.6),.16,.05,2.3,1.7,.6,.6,.25,.05,1,1.5,2.5,2,1)}}else{g.emit(l,u,d,p*.5,m*.5,h*.5,Math.max(.03,n*1.5),.55,.55,2.2,1.45,.5,2.2,1.45,.5,1,0,0,0,3.5);let e=Math.max(1,Math.round(2*this.emitMult));for(let t=0;t<e;t++)g.emit(l,u,d,Dh(-.2,.2),Dh(-.6,0),Dh(-.2,.2),Dh(.45,.7),.42,.18,1.9,1.15,.35,.7,.25,.06,.85,1,.5,0,1)}}_burstFx(e){this._group(e)}useSmoke(e){this.smoke=e}_smoke(e){let t=this.smoke;if(!t)return;let n=Y.look.smoke,r=e.Cw,i=Math.max(1,Math.round($(n.n[0],n.n[1])*this.emitMult)),a=e.R0*n.spread,o=t.rejects;for(let e=0;e<i;e++)t.emit(r.x+$(-a,a),r.y+$(-a,a)*.6,r.z+$(-a,a),n.wind[0]+$(-.25,.25),n.wind[1]+$(0,.2),n.wind[2]+$(-.25,.25),$(n.life[0],n.life[1]),n.size[0]*$(.8,1.2),n.size[1]*$(.8,1.2),.32,.17,.06,.06,.055,.07,n.a,.15,-.04,0)>=0&&(this.log.smokeN=(this.log.smokeN||0)+1);this.log.smokeRej=(this.log.smokeRej||0)+t.rejects-o}_group(e){return this._gi=(this._gi||0)%255+1,e.grp=this._gi,this.sparks.gdim[e.grp]=1,e.grp}static dirW(e,t,n,r,i){return i[0]=e.F.x*t+e.R.x*n,i[1]=r+(e.slope||0)*t,i[2]=e.F.z*t+e.R.z*n,i}_embers(t,n){let r=this.sparks,i=Y.look.embers,a=n-t.tBurst,o=[];for(let e=0;e<t.n;e++)!t.core[e]&&t.U[e]>=0&&!(t.cut&&t.cut[e])&&o.push(e);if(!o.length)return;this._smoke(t);let s=Math.round($(i.n[0],i.n[1])*this.emitMult),c=t.after===`crossette`,l=t.after===`crackle`,u=Y.look.crossette,d=Y.look.willow,f=c?o.length*u.n:l?o.length*3:o.length,p=r.limit-r.alive-Y.look.reserve;if(p<f+s){let e=Math.min(f,f+s-Math.max(0,p));this.log.afterCut=(this.log.afterCut||0)+e,f-=e,p-=f,p<s&&(this.log.embersCut+=s-Math.max(0,p),s=Math.max(0,p))}let m=this._dw||=[0,0,0],h=this._w3||=new G,g=Math.exp(-t.k*a),_=t.color,v=Math.max(_[0],_[1],_[2]),y=Math.min(1.1,1.1*v)/v,b=[_[0]*y,_[1]*y,_[2]*y];for(let n=0;n<f;n++){let i=o[c?Math.floor(n/u.n):l?Math.floor(n/3)%o.length:n],a=i*3,s=t.dir[a],f=t.dir[a+1],p=t.dir[a+2];e.toW(t,t.H[a],t.H[a+1],t.H[a+2],h),e.dirW(t,s,f,p,m);let _=t.spd[i]*t.k*g,v;if(c){let a=n%u.n*(Math.PI/2)+$(-.3,.3)+t.ph[i],o=e.dirW(t,1,0,0,[0,0,0]),s=m[1]*o[2]-m[2]*o[1],c=m[2]*o[0]-m[0]*o[2],l=m[0]*o[1]-m[1]*o[0],d=Math.cos(a),f=Math.sin(a),p=$(u.speed[0],u.speed[1]);v=r.emit(h.x,h.y,h.z,(o[0]*d+s*f)*p+m[0]*_*.5,(o[1]*d+c*f)*p+m[1]*_*.5,(o[2]*d+l*f)*p+m[2]*_*.5,$(u.life[0],u.life[1]),u.size,u.size*.5,u.col[0],u.col[1],u.col[2],u.end[0],u.end[1],u.end[2],u.a,2.5,1,2,1.2)}else if(l){let e=$(1.2,2.6),t=$(-1,1),n=$(-1,1),i=$(-1,1),a=Math.hypot(t,n,i)||1;v=r.emit(h.x,h.y,h.z,t/a*e+m[0]*_*.3,n/a*e+m[1]*_*.3,i/a*e+m[2]*_*.3,$(.25,.5),.06,.03,1.25,1.15,.95,b[0]*.5,b[1]*.5,b[2]*.5,.85,3,1.2,2,1)}else v=r.emit(h.x,h.y,h.z,m[0]*_,m[1]*_,m[2]*_,$(d.life[0],d.life[1]),d.size,d.size*.4,b[0]*d.a*2,b[1]*d.a*2,b[2]*d.a*2,d.end[0],d.end[1],d.end[2],d.a,d.drag,d.grav,3,1);v>=0&&(this.log.afterN=(this.log.afterN||0)+1)}let x=r.rejects;for(let n=0;n<s;n++){let a=o[n%o.length]*3,s=.55+.45*Ih();e.toW(t,t.T[a]+(t.H[a]-t.T[a])*s,t.T[a+1]+(t.H[a+1]-t.T[a+1])*s,t.T[a+2]+(t.H[a+2]-t.T[a+2])*s,h),e.dirW(t,t.dir[a],t.dir[a+1],t.dir[a+2],m);let c=$(.2,1.1);Vd(r,h.x,h.y,h.z,m[0]*c+$(-.5,.5),m[1]*c+$(-.4,.3),m[2]*c+$(-.5,.5),i,Ih,i.size,i.col,i.end,i.a)>=0&&this.log.embersN++}this.log.decorRej+=r.rejects-x}_draw(t,n){let r=this.stars;r.begin(t);let i=Y.passedFade,a=this._dwv||=[0,0,0],o=[2.6,2.45,2.2],s=0;for(let n of this.list){if(!n.burst)continue;let c=t-n.tBurst,l=1,u=t-n.tMeet-i.delay;u>0&&(l*=1-(1-i.to)*Math.min(1,u/i.time)),n.grp&&(this.sparks.gdim[n.grp]=l);let d=e.judging(n,t)?0:t-(n.tJudgeEnd===void 0?t:n.tJudgeEnd),f=Math.min(1,c/.14)**2*.85+.15,p=c<jh.hotT?1-Lh(jh.hotT*.5,jh.hotT,c):0,m=n.color,h=n.color2,g=h?Lh(.3,.5,c):0,_=n.hdr*(n.dense||1),v=p*(n.dense||1),y=(m[0]+((h?h[0]:m[0])-m[0])*g)*_*(1-p)+o[0]*v,b=(m[1]+((h?h[1]:m[1])-m[1])*g)*_*(1-p)+o[1]*v,x=(m[2]+((h?h[2]:m[2])-m[2])*g)*_*(1-p)+o[2]*v,S=y-o[0]*v,C=b-o[1]*v,w=x-o[2]*v,T=jh.tipCol,E=jh.tipDot.a,D=Wm(c),O=c>n.tDrop?n.gAfter:0,k=n.look===`willow`,A=n.Cw;for(let t=0;t<n.n;t++){let i=n.life[t];if(c>=i||n.cut&&n.cut[t])continue;let o=c/i,u=f*l;o>.6&&(u*=Math.max(0,1-(o-.6)/.4)*(d>0?.65+.35*Math.sin(c*29+n.ph[t]):1));let p=n.endR[t];d>0&&(p=k?p+(.08-p)*Math.min(1,d/.6):1-(1-p)*Math.max(.3,1-d/.5));let m=t*3;e.dirW(n,n.dir[m],n.dir[m+1],n.dir[m+2],a);let h=n.tip[t]&&d<.15?E*(1-d/.15):0;r.push(A.x,A.y,A.z,a[0],a[1],a[2],n.spd[t],n.k,c,p,n.hr[t],n.tw0[t],n.tw1[t],y,b,x,u,T[0]*.9,T[1]*.9,T[2]*.9,h,D,O,n.tDrop,n.half[t],n.spk[t],n.ph[t],n.floor[t],S,C,w),s++}}this.log.maxStars=Math.max(this.log.maxStars||0,s),this.debug&&this._drawDebug(t),r.end()}_drawDebug(t){let n=this.stars,r=this.course,i=new G;for(let r of this.list){if(!r.burst||!e.judging(r,t))continue;let a=t-r.tBurst,o=(1-Math.exp(-r.k*a))/r.ex,s=e.dropAt(r,a);this.log.judgeDropMax=Math.max(this.log.judgeDropMax||0,s);let c=[[r.rout*o-Wu.tol,[1.6,.3,1.6]]];r.shape===`band`&&c.push([r.rin*o+Wu.tol,[.1,1.2,1.4]]);for(let[t,a]of c){let o=Math.max(24,Math.round(t*14));for(let c=0;c<o;c++){let l=c/o*Math.PI*2;e.toW(r,0,r.oy+Math.cos(l)*t,r.oz-s+Math.sin(l)*t,i),n.dot(i.x,i.y,i.z,.035,a[0],a[1],a[2],1)}}}let a=null;for(let e of this.events)e.shells.length&&t<e.tq+.3&&(!a||e.tq<a.tq)&&(a=e);if(!a||!this.birdSpec)return;let o=Um(this.birdSpec),s=a.wave.eggs,c=lh(s,o,this._dbgSafe),l=a.wave.eggs[0]?a.wave.eggs[0].s:a.s,u=r.center(l);for(let e=0;e<Nm.NC;e+=2){if(!Nm.IN_BIRD[e])continue;let t=Nm.CU[e],a=Nm.CW[e];r.toWorld(l,t,u+a,i);let o=c[e];n.dot(i.x,i.y,i.z,.04,o?.05:.5,o?.8:.04,o?.3:.04,o?.5:.25)}r.toWorld(l,a.target[0],u+a.target[1],i),n.dot(i.x,i.y,i.z,.3,.2,1.6,1.8,1)}},zh=[`mayfly`,`moth`,`crumb`,`grain`],Bh=8,Vh=(e,t)=>e+Math.random()*(t-e),Hh=(e,t)=>Math.floor(e+Math.random()*(t-e+1)),Uh=Vu.ellipse,Wh=(e,t,n=.93)=>(e/(Uh.u*n))**2+(t/(Uh.v*n))**2<=1,Gh=`
attribute vec3 aLocal; // 사각형 모서리(-1~1)
attribute vec4 aP;     // 세계 위치 xyz, 크기(지름 m)
attribute vec4 aK;     // 그림 번호, 위상, 불투명도, 크기 배율(11차 먹힘: 1 → 1.3배). 획득 고리(9~11)는 고리 반경 비율, 불투명도, 고리 반두께 비율
uniform float uTime;
varying vec2 vUv;
varying float vKind;
varying float vA;
varying float vSeed;
varying float vFlap;
varying float vW;
void main() {
  bool fx = aK.x > 8.5;
  float size = fx ? aP.w : aP.w * aK.w;
  vec3 wp = fx ? aP.xyz : aP.xyz + vec3(0.0, sin(uTime * 2.1 + aK.y) * 0.07, 0.0); // 제자리 너울
  vW = aK.w;
  vec4 mv = modelViewMatrix * vec4(wp, 1.0);
  mv.xy += aLocal.xy * size * 0.5;
  gl_Position = projectionMatrix * mv;
  vUv = aLocal.xy;
  vKind = aK.x;
  vA = aK.z;
  vSeed = aK.y;
  float km = mod(aK.x, 4.0);
  vFlap = km < 0.5 ? sin(uTime * 14.0 * 6.2831 + aK.y) : sin(uTime * 7.0 * 6.2831 + aK.y);
}
`,Kh=`
uniform float uTime;
uniform vec3 uGlowHp;
uniform vec3 uFx[3];
varying vec2 vUv;
varying float vKind;
varying float vA;
varying float vSeed;
varying float vFlap;
varying float vW;
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
float ell(vec2 p, vec2 c, vec2 r) { return length((p - c) / r) - 1.0; }
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
void main() {
  int kk = int(vKind + 0.5);
  if (kk >= 9) {
    // 11차 획득 고리: 새 중심에서 넓어지는 얇은 고리(밝기 HDR 1.2 — 위협 머리보다 어둡게, 흰 심 없음)
    vec3 fc = kk == 9 ? uFx[0] : kk == 10 ? uFx[1] : uFx[2];
    float rr = length(vUv);
    float aR = fwidth(rr) * 1.2;
    float m = 1.0 - smoothstep(vW - aR, vW + aR, abs(rr - vSeed));
    if (m * vA < 0.01) discard;
    gl_FragColor = vec4(fc * ${qu.fx.ring.hdr.toFixed(2)}, m * vA);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    return;
  }
  bool hpF = kk >= 4 && kk < 8;
  bool feather = kk == 8;
  int k = hpF ? kk - 4 : kk;
  float R = length(vUv);
  // HP 먹이: 모델은 고리 안쪽(× 1.6 작게)
  vec2 p = hpF ? vUv * ${qu.hp.ring.toFixed(2)} : vUv;
  float r = length(p);
  vec3 col = vec3(0.0);
  float a = 0.0;
  float aa = fwidth(p.x) * 1.2;
  float glow = 0.0;
  vec3 glowC = vec3(0.0);
  if (feather) {
    // 롤 깃털: 시안 깃(길쭉한 잎 모양) + 가운데 깃대 + 깃가지 줄무늬, 천천히 돈다
    vec2 q = rot(uTime * 0.9 + vSeed) * p;
    float vane = ell(q, vec2(0.04, 0.05), vec2(0.26, 0.78));
    float shaft = sdSeg(q, vec2(0.0, -0.95), vec2(0.0, 0.8)) - 0.022;
    float mv = 1.0 - smoothstep(-aa, aa, vane);
    float ms = 1.0 - smoothstep(-aa, aa, shaft);
    float barbs = 0.75 + 0.25 * sin(q.y * 46.0 - abs(q.x) * 30.0);
    col = mix(vec3(0.3, 0.86, 0.98) * barbs, vec3(0.86, 1.0, 1.0), ms);
    a = max(mv * 0.9, ms);
    glow = (1.0 - smoothstep(0.15, 1.0, R)) * 0.3;
    glowC = vec3(0.3, 0.85, 0.95);
  } else if (k == 0) {
    // 하루살이 5마리: 몸(연두) + 날개 두 장(옅은 연두) + 긴 꼬리 두 가닥
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      vec2 c = vec2(sin(fi * 2.4 + vSeed) * 0.5, cos(fi * 1.7 + vSeed * 1.3) * 0.45) + 0.05 * vec2(sin(uTime * 3.0 + fi), cos(uTime * 2.3 + fi * 1.3));
      vec2 q = rot(0.5 + fi) * (p - c);
      float body = ell(q, vec2(0.0), vec2(0.045, 0.13));
      float wing = min(ell(q, vec2(-0.08, 0.05), vec2(0.1, 0.05 + 0.03 * vFlap)), ell(q, vec2(0.08, 0.05), vec2(0.1, 0.05 + 0.03 * vFlap)));
      float tail = min(sdSeg(q, vec2(0.0, -0.12), vec2(-0.06, -0.38)), sdSeg(q, vec2(0.0, -0.12), vec2(0.06, -0.38))) - 0.008;
      float mb = 1.0 - smoothstep(-aa, aa, body);
      float mw = 1.0 - smoothstep(-aa, aa, wing);
      float mt = 1.0 - smoothstep(-aa, aa, tail);
      col = mix(col, vec3(0.62, 0.86, 0.66), mw * 0.6);
      col = mix(col, vec3(0.45, 0.82, 0.22), max(mb, mt));
      a = max(a, max(max(mb, mt), mw * 0.6));
    }
  } else if (k == 1) {
    // 나방: 앞날개 두 장(크고 크림색, 갈색 점) + 뒷날개 두 장(작게) + 갈색 몸 + 더듬이
    float f = 0.55 + 0.45 * abs(vFlap);
    vec2 q = vec2(abs(p.x) / f, p.y);
    float fw = ell(q, vec2(0.42, 0.18), vec2(0.42, 0.3));
    float hw = ell(q, vec2(0.3, -0.25), vec2(0.28, 0.22));
    float body = ell(p, vec2(0.0, 0.0), vec2(0.08, 0.38));
    float ant = min(sdSeg(p, vec2(0.02, 0.34), vec2(0.22, 0.7)), sdSeg(p, vec2(-0.02, 0.34), vec2(-0.22, 0.7))) - 0.014;
    float spot = ell(q, vec2(0.45, 0.2), vec2(0.1, 0.1));
    float mf = 1.0 - smoothstep(-aa, aa, fw), mh = 1.0 - smoothstep(-aa, aa, hw);
    float mb = 1.0 - smoothstep(-aa, aa, body), ma = 1.0 - smoothstep(-aa, aa, ant);
    float edge = smoothstep(-0.25, -0.02, max(fw * (1.0 - mh), hw * (1.0 - mf)));
    vec3 cream = vec3(0.86, 0.8, 0.62), brown = vec3(0.36, 0.24, 0.14);
    col = mix(cream, brown, max(edge * 0.8, 1.0 - smoothstep(-aa, aa, spot)));
    col = mix(col, vec3(0.75, 0.66, 0.5), mh * (1.0 - mf));
    col = mix(col, brown * 0.8, max(mb, ma));
    a = max(max(mf, mh), max(mb, ma));
  } else if (k == 2) {
    // 식빵 단면: 아래는 둥근 모서리 직육면 단면, 위는 두 봉우리 → 크림 속 + 갈색 껍질
    vec2 q = p * vec2(1.0, 1.05) + vec2(0.0, 0.05);
    vec2 bq = abs(q - vec2(0.0, -0.22)) - vec2(0.52, 0.42);
    float bottom = length(max(bq, 0.0)) + min(max(bq.x, bq.y), 0.0) - 0.1;
    float tops = min(length(q - vec2(-0.3, 0.26)) - 0.36, length(q - vec2(0.3, 0.26)) - 0.36);
    float d = min(bottom, tops);
    float m = 1.0 - smoothstep(-aa, aa, d);
    float crust = smoothstep(-0.13, -0.08, d);
    float holes = 0.0;
    for (int i = 0; i < 4; i++) { float fi = float(i); holes = max(holes, 1.0 - smoothstep(0.0, 0.03, length(q - vec2(sin(fi * 2.7 + vSeed) * 0.3, cos(fi * 1.9) * 0.25 - 0.05)) - 0.035)); }
    col = mix(vec3(0.92, 0.84, 0.62), vec3(0.55, 0.32, 0.13), crust);
    col = mix(col, vec3(0.75, 0.66, 0.45), holes * (1.0 - crust));
    a = m;
  } else {
    // 이삭: 연두 줄기(비스듬) + 낱알 7개(양쪽 번갈아, 연두빛 금색) + 끝 수염
    vec2 q = rot(-0.5) * p;
    float stem = sdSeg(q, vec2(0.0, -0.85), vec2(0.0, 0.7)) - 0.025;
    float kern = 1e3;
    for (int i = 0; i < 7; i++) {
      float fi = float(i);
      float y = -0.35 + fi * 0.15;
      float sx = mod(fi, 2.0) < 0.5 ? -1.0 : 1.0;
      vec2 kq = rot(sx * 0.5) * (q - vec2(sx * 0.09, y));
      kern = min(kern, ell(kq, vec2(0.0), vec2(0.075, 0.12)));
    }
    float awn = sdSeg(q, vec2(0.0, 0.7), vec2(0.05, 0.92)) - 0.01;
    float ms = 1.0 - smoothstep(-aa, aa, min(stem, awn));
    float mk = 1.0 - smoothstep(-aa, aa, kern);
    col = mix(vec3(0.42, 0.7, 0.2), vec3(0.78, 0.8, 0.36), mk);
    a = max(ms, mk);
  }
  if (hpF) {
    // 민트 빛무리 + 「+」 고리(천천히 맥박)
    float pulse = 0.72 + 0.28 * sin(uTime * 3.2 + vSeed);
    float aR = fwidth(R) * 1.2;
    float ringD = abs(R - 0.86) - 0.035;
    float plus = min(sdSeg(vUv, vec2(-0.13, 0.86), vec2(0.13, 0.86)), sdSeg(vUv, vec2(0.0, 0.73), vec2(0.0, 0.99))) - 0.04;
    float gap = 1.0 - smoothstep(0.17, 0.2, length(vUv - vec2(0.0, 0.86))); // 「+」 자리는 고리를 끊음
    float mr = (1.0 - smoothstep(-aR, aR, ringD)) * (1.0 - gap);
    float mp = 1.0 - smoothstep(-aR, aR, plus);
    float m = max(mr, mp);
    col = mix(col, uGlowHp * (0.85 + 0.15 * pulse), m * (1.0 - a * 0.5));
    a = max(a, m * pulse);
    glow = (1.0 - smoothstep(0.1, 0.95, R)) * 0.42 * pulse;
    glowC = uGlowHp;
  }
  vec3 outc = mix(glowC * glow, col, a);
  float oa = max(a, glow) * vA;
  if (oa < 0.01) discard;
  gl_FragColor = vec4(outc, oa);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,qh=class{constructor(e,t=64){this.max=t,this.items=[],this.P=new Float32Array(t*4),this.K=new Float32Array(t*4);let n=new Fo,r=[-1,-1,0,1,-1,0,-1,1,0,1,1,0];n.setAttribute(`position`,new _r(new Float32Array(r.length),3)),n.setAttribute(`aLocal`,new _r(new Float32Array(r),3)),n.setIndex([0,1,2,2,1,3]),this.aP=new Si(this.P,4).setUsage(We),this.aK=new Si(this.K,4).setUsage(We),n.setAttribute(`aP`,this.aP),n.setAttribute(`aK`,this.aK),n.instanceCount=0,n.boundingSphere=new Cr(new G,1e6),this.material=new wa({vertexShader:Gh,fragmentShader:Kh,uniforms:{uTime:{value:0},uGlowHp:{value:new G(...qu.hp.glow)},uFx:{value:[new G(...qu.fx.col.hp),new G(...qu.fx.col.roll),new G(...qu.fx.col.gold)]}},transparent:!0,depthWrite:!1}),this.mesh=new ii(n,this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=9,e.add(this.mesh),this.resetLog()}resetLog(){this.log={placed:0,hpPlaced:0,rollPlaced:0,eaten:0,hpEaten:0,rollEaten:0,maxVisible:0,hpFail:0,rollFail:0,hpWaves:[],hpClear:[]}}reset(){this.items.length=0,this.fx=[],this.mesh.geometry.instanceCount=0}_add(e,t,n,r,i,a={}){if(!Wh(r,i)){let e=.92/Math.sqrt((r/Uh.u)**2+(i/Uh.v)**2);r*=e,i*=e}let o=e.toWorld(n,r,e.center(n)+i,new G),s={type:t,s:n,u:r,w:i,W:o,ph:Math.random()*6.28,got:!1,eatT:-1,passed:!1,...a};return this.items.push(s),this.log.placed++,t===`hp`?this.log.hpPlaced++:this.log.rollPlaced++,s}build(){this.reset(),this.resetLog();let e=Math.random;for(let t=0;t<5;t++){e(),e();let t=Math.floor(3+e()*2);for(let n=0;n<t;n++)e(),e(),e()}e();for(let t=0;t<29;t++)e();for(let t=0;t<2;t++){e();for(let t=0;t<2;t++)e(),e(),e()}}addPlanFood(e,t,n,r=null){this.items=[];let i=Iu[t.bird],a=qu.fav[t.bird],o=t.waves.filter(e=>e.eggs.length),s=e=>Math.min(...e.eggs.map(e=>e.s)),c=e=>Math.max(...e.eggs.map(e=>e.s)),l=qu.hp,u=i.radius*Y.birdHitMult,d=e=>r?r.list.filter(t=>t.ev&&t.ev.wave===e):[],f=r?r.constructor:null,p=(e,t,n)=>{let r=d(e);if(!r.length||!f)return!0;for(let e of r)for(let r=-2;r<=2.01;r+=.25){let a=e.tMeet-e.tBurst+r/i.forward;if(!(a<0)&&f.minClear(e,a,r,t-e.uc,n-e.wc,u)<l.safe)return!1}return!0},m=Hh(l.n[0],l.n[1]),h=o.filter(e=>e.i>=l.skipWaves||o.indexOf(e)>=l.skipWaves),g=[],_=-99,v=Vh(l.gap[0],l.gap[1]);for(let e of h)e.tq-_<v||(g.push(e),_=e.tq,v=Vh(l.gap[0],l.gap[1]));let y=h.filter(e=>e.kind===`finale`);for(y.length&&!g.some(e=>e.kind===`finale`)&&g.push(y[Math.floor(y.length/2)]),g.sort((e,t)=>e.tq-t.tq);g.length<m;){let e=null,t=-1,n=[h[0]?h[0].tq-l.gap[0]:0,...g.map(e=>e.tq),h.length?h[h.length-1].tq+l.gap[0]:0];for(let r=0;r+1<n.length;r++){let i=(n[r]+n[r+1])/2,a=h.filter(e=>!g.includes(e)).sort((e,t)=>Math.abs(e.tq-i)-Math.abs(t.tq-i))[0];if(!a)continue;let o=Math.min(Math.abs(a.tq-n[r]),Math.abs(n[r+1]-a.tq));o>t&&(t=o,e=a)}if(!e)break;g.push(e),g.sort((e,t)=>e.tq-t.tq)}for(;g.length>m;){let e=-1,t=1/0;for(let n=1;n<g.length;n++){if(g[n].kind===`finale`&&!g.slice(0,n).some(e=>e.kind===`finale`)&&g.filter(e=>e.kind===`finale`).length===1)continue;let r=g[n].tq-g[n-1].tq;r<t&&(t=r,e=n)}if(e<0)break;g.splice(e,1)}let b=Nm,x=e=>{let t=o.indexOf(e),n=t>0?o[t-1]:null,r=t+1<o.length?o[t+1]:null,i=e.target,a=[];for(let t=0;t<b.NC;t++){if(!b.IN_SAFE[t])continue;let o=b.CU[t],s=b.CW[t],c=Qm(e.eggs,o,s);if(c===`gap`)continue;let d=Math.hypot(o-i[0],s-i[1]);if(c===`out`&&(d<l.offGap[0]||d>l.offGap[1]))continue;let f=Ym(e.eggs,o,s,u);f<l.edge[0]||f>l.edge[1]||n&&Math.hypot(o-n.target[0],s-n.target[1])>e.reach||r&&Math.hypot(o-r.target[0],s-r.target[1])>r.reach||a.push([o,s,f])}for(let e=a.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[a[e],a[t]]=[a[t],a[e]]}for(let[t,n,r]of a)if(p(e,t,n))return{u:t,w:n,cl:r};return null},S=new Set;for(let t of g){let n=x(t),r=t;if(!n){let e=o.indexOf(t);for(let t of[1,-1,2,-2]){let i=o[e+t];if(!(!i||S.has(i)||o.indexOf(i)<l.skipWaves)&&(n=x(i),n)){r=i;break}}}if(!n){this.log.hpFail++;continue}S.add(r),this._add(e,`hp`,s(r),n.u,n.w,{model:a,wave:r.i,clear:n.cl}),this.log.hpWaves.push(r.i),this.log.hpClear.push(+n.cl.toFixed(2))}let C=qu.roll,w=[];for(let e of o)for(let t of e.eggs)w.push(t);let T=(e,t,n)=>{if(!Wh(t,n,.9))return!1;for(let t of o)if(e>s(t)-C.planeGap&&e<c(t)+C.planeGap)return!1;for(let r of w)if(!(Math.abs(r.s-e)>r.R+C.burstPad+.5)&&Math.hypot(r.s-e,r.u-t,r.w-n)<r.R+C.burstPad)return!1;for(let r of this.items)if(Math.hypot(r.s-e,r.u-t,r.w-n)<6)return!1;return!0},E=[];for(let e=1;e<o.length;e++)E.push({a:o[e-1],b:o[e]});let D=Hh(C.n[0],C.n[1]),O=e=>{let t=c(e.a),n=s(e.b);if(n-t<2*C.planeGap+1)return null;let r=i.forward;for(let a=0;a<40;a++){let a=(t+n)/2+Vh(-.15,.15)*(n-t),o=(a-t)/(n-t),s=e.a.target[0]+(e.b.target[0]-e.a.target[0])*o,c=e.a.target[1]+(e.b.target[1]-e.a.target[1])*o,l=Math.random()*Math.PI*2,u=Vh(C.off[0],C.off[1]),d=s+Math.cos(l)*u,f=c+Math.sin(l)*u;if(T(a,d,f)&&!(Math.hypot(d-e.a.target[0],f-e.a.target[1])>eh(i,(a-t)/r))&&!(Math.hypot(d-e.b.target[0],f-e.b.target[1])>eh(i,(n-a)/r)))return{s:a,u:d,w:f}}return null},k=[];for(let e=0;e<D;e++)k.push(Math.min(E.length-1,Math.floor((e+.5)/D*E.length)));let A=new Set;for(let t of k){let n=null;for(let e of[0,1,-1,2,-2,3,-3]){let r=E[t+e];if(r&&!A.has(r)&&(n=O(r),n)){A.add(r);break}}if(!n){this.log.rollFail++;continue}this._add(e,`roll`,n.s,n.u,n.w,{})}this.items.sort((e,t)=>e.s-t.s)}update(e,t,n,r,i,a){if(this.material.uniforms.uTime.value=t,n)for(let e of this.items){if(e.got||e.passed)continue;if(n.s>e.s+1.5){e.passed=!0;continue}let t=e.type===`hp`?qu.hp.collect:qu.roll.collect;Math.abs(n.s-e.s)>t+.2||e.W.distanceTo(n.pos)<=t&&(e.got=!0,e.eatT=0,this.log.eaten++,e.type===`hp`?this.log.hpEaten++:this.log.rollEaten++,i.push({kind:`eat`,item:e}))}for(let t of this.items)t.eatT>=0&&t.eatT<=qu.eatT&&(t.eatT+=e);if(this.fx){for(let t of this.fx)t.t+=e;this.fx=this.fx.filter(e=>e.t<qu.fx.ring.t)}this._draw(a,n)}ringFx(e){(this.fx||=[]).push({t:0,col:e}),this.log.fx=(this.log.fx||0)+1}_draw(e,t=null){let n=this.P,r=this.K,i=0,a=0,o=qu.viewFar,s=e?e.position:null,c=this._f||=new G;e&&e.getWorldDirection(c);let l=e?Math.cos((e.fov*Math.max(1,e.aspect)/2+6)*(Math.PI/180)):0;for(let e of this.items){if(e.got&&e.eatT>qu.eatT)continue;let t=1;if(s){let n=e.W.x-s.x,r=e.W.y-s.y,i=e.W.z-s.z,u=Math.hypot(n,r,i);if(u>o)continue;t=Math.min(1,(o-u)/15);let d=(n*c.x+r*c.y+i*c.z)/Math.max(1e-6,u);if(d<0)continue;d>l&&t>.3&&a++}if(i>=this.max)break;let u=i*4,d=e.type===`hp`,f=d?qu.kinds[e.model].size*qu.hp.ring:qu.roll.size,p=e.eatT>=0?Math.min(1,e.eatT/qu.eatT):0,m=1+(qu.eatGrow-1)*Math.min(1,p/.6),h=p>.6?Math.max(0,1-(p-.6)/.4):1;n[u]=e.W.x,n[u+1]=e.W.y,n[u+2]=e.W.z,n[u+3]=f,r[u]=d?4+zh.indexOf(e.model):Bh,r[u+1]=e.ph,r[u+2]=t*h,r[u+3]=m,i++}if(t&&this.fx){let e=qu.fx.ring;for(let a of this.fx){if(i>=this.max)break;let o=Math.min(1,a.t/e.t),s=e.r*(1-(1-o)*(1-o)),c=s+e.w,l=i*4;n[l]=t.pos.x,n[l+1]=t.pos.y,n[l+2]=t.pos.z,n[l+3]=c*2,r[l]=9+a.col,r[l+1]=s/c,r[l+2]=(1-o)*(1-.3*o),r[l+3]=e.w*.5/c,i++}}this.visible=a,this.log.maxVisible=Math.max(this.log.maxVisible,a);let u=this.mesh.geometry;u.instanceCount=i;for(let e of[this.aP,this.aK])e.clearUpdateRanges(),i&&e.addUpdateRange(0,i*4),e.needsUpdate=!0}},Jh=Bu.sixteenth,Yh=[{root:55,notes:[220,261.63,329.63]},{root:49,notes:[196,261.63,293.66]},{root:65.41,notes:[261.63,329.63,392]},{root:73.42,notes:[293.66,392,440]}],Xh=[440,523.25,587.33,659.25,783.99,880],Zh=class{constructor(e){this.sound=e,this.on=!1,this.next=0,this.log=[],this.logOn=!1,this.clock=()=>0,this.levelAt=()=>1,this.pending=[],this._cur=null,this.accents=new Set}setAccents(e){this.accents=new Set(e.map(e=>Math.round(e/Jh)))}_track(e){return this._cur&&this._cur.push(e),e}rewind(){let e=this.sound;if(!this.on||!e.ready)return;let t=this.clock(),n=null;for(let e of this.pending)if(!(e.Tb<=t+1e-6)){for(let t of e.nodes)try{t.stop(0)}catch{}(n===null||e.Tb<n)&&(n=e.Tb)}this.pending=this.pending.filter(e=>e.Tb<=t+1e-6),n!==null&&(this.next=Math.round(n/Jh),this.logOn&&(this.log=this.log.filter(e=>e.Tb<n-1e-6)))}beatTime(){return this.clock()}start(e,t){this.clock=e,this.levelAt=t,this.next=Math.max(0,Math.ceil(e()/Jh-1e-6)),this.on=!0}stop(){this.on=!1}audioTimeOf(e,t){let n=this.sound;if(!n.ready)return 0;let r=Math.max(0,e-this.clock());return n.ctx.currentTime+(typeof t==`function`?t(r):r/Math.max(.05,t||1))}nextSixteenth(){return Math.ceil(this.clock()/Jh+1e-6)*Jh}update(e){let t=this.sound;if(!this.on||!t.ready||!t.settings.sound)return;let n=t.ctx,r=this.clock();this.pending.length>8&&(this.pending=this.pending.filter(e=>e.Tb>r-.5));for(let t=0;t<16;t++){let t=this.next*Jh,i=t>=r?e(t-r):t-r;if(i>Zu.lookahead)break;if(i>-.04){let e=n.currentTime+Math.max(0,i);this._cur=[],this._step(this.next,e,this.levelAt(t)),this.pending.push({Tb:t,nodes:this._cur}),this._cur=null,this.logOn&&(this.log.push({Tb:t,at:e}),this.log.length>3e3&&this.log.splice(0,500))}this.next++}}_step(e,t,n){let r=e%16,i=Math.floor(e/16),a=Yh[i%4];r===0&&this._pad(t,a.notes,Bu.bar,n===0?.05:.04);let o=n===0?{0:.45,8:.25}:n===1?{0:1,6:.45,8:.8,11:.4}:n===2?{0:1,3:.4,6:.55,8:.85,11:.5,14:.4}:{0:1,2:.5,4:.7,6:.6,8:1,10:.5,12:.75,13:.4,14:.7,15:.5};if(this.accents.has(e)?this._taiko(t,1.15):o[r]&&this._taiko(t,o[r]),n>=1&&(r===4||r===12)&&this._shime(t,.5),n>=2&&(this._shaker(t,r%2?.55:.3),(r===14||r===15)&&this._shime(t,.35)),n>=1&&(n>=3?[0,2,4,6,8,10,12,14]:[0,3,8,11]).includes(r)){let e=r===3||r===11||r===6||r===14?a.root*1.5:a.root;this._bass(t,e,n>=3?.22:.32)}n>=3&&r%2==0&&this._bell(t,Xh[(r/2+i*3)%Xh.length])}_taiko(e,t){let n=this.sound.ctx,r=n.createOscillator();r.type=`sine`,r.frequency.setValueAtTime(92,e),r.frequency.exponentialRampToValueAtTime(44,e+.28);let i=n.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(.9*t,e+.006),i.gain.exponentialRampToValueAtTime(1e-4,e+.45),r.connect(i).connect(this.sound.drumGain),r.start(e),r.stop(e+.5),this._track(r);let a=this._track(this.sound._noise(e,.08)),o=n.createBiquadFilter();o.type=`lowpass`,o.frequency.value=900;let s=n.createGain();s.gain.setValueAtTime(.5*t,e),s.gain.exponentialRampToValueAtTime(1e-4,e+.07),a.connect(o).connect(s).connect(this.sound.drumGain)}_shime(e,t){let n=this.sound.ctx,r=n.createOscillator();r.type=`triangle`,r.frequency.setValueAtTime(330,e),r.frequency.exponentialRampToValueAtTime(250,e+.06);let i=n.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(.35*t,e+.003),i.gain.exponentialRampToValueAtTime(1e-4,e+.1),r.connect(i).connect(this.sound.drumGain),r.start(e),r.stop(e+.12),this._track(r);let a=this._track(this.sound._noise(e,.05)),o=n.createBiquadFilter();o.type=`bandpass`,o.frequency.value=2200;let s=n.createGain();s.gain.setValueAtTime(.35*t,e),s.gain.exponentialRampToValueAtTime(1e-4,e+.05),a.connect(o).connect(s).connect(this.sound.drumGain)}_shaker(e,t){let n=this.sound.ctx,r=this._track(this.sound._noise(e,.06)),i=n.createBiquadFilter();i.type=`highpass`,i.frequency.value=6500;let a=n.createGain();a.gain.setValueAtTime(1e-4,e),a.gain.exponentialRampToValueAtTime(.16*t,e+.01),a.gain.exponentialRampToValueAtTime(1e-4,e+.055),r.connect(i).connect(a).connect(this.sound.drumGain)}_bass(e,t,n){let r=this.sound.ctx,i=r.createOscillator();i.type=`sawtooth`,i.frequency.setValueAtTime(t,e);let a=r.createBiquadFilter();a.type=`lowpass`,a.frequency.setValueAtTime(700,e),a.frequency.exponentialRampToValueAtTime(220,e+n);let o=r.createGain();o.gain.setValueAtTime(1e-4,e),o.gain.exponentialRampToValueAtTime(.32,e+.01),o.gain.exponentialRampToValueAtTime(1e-4,e+n),i.connect(a).connect(o).connect(this.sound.musicIn),i.start(e),i.stop(e+n+.02),this._track(i)}_pad(e,t,n,r){let i=this.sound.ctx,a=i.createBiquadFilter();a.type=`lowpass`,a.frequency.value=1300;let o=i.createGain();o.gain.setValueAtTime(1e-4,e),o.gain.linearRampToValueAtTime(r,e+.35),o.gain.setValueAtTime(r,e+n-.3),o.gain.linearRampToValueAtTime(1e-4,e+n+.15),a.connect(o).connect(this.sound.musicIn);for(let r of t)for(let t of[-6,6]){let o=i.createOscillator();o.type=`sawtooth`,o.frequency.value=r,o.detune.value=t,o.connect(a),o.start(e),o.stop(e+n+.2),this._track(o)}}_bell(e,t){let n=this.sound.ctx,r=n.createOscillator();r.type=`sine`,r.frequency.setValueAtTime(t*2,e);let i=n.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(.07,e+.004),i.gain.exponentialRampToValueAtTime(1e-4,e+.3),r.connect(i).connect(this.sound.musicIn),r.start(e),r.stop(e+.32),this._track(r)}},Qh=class e{constructor(e,t,n,r=!1,i={}){this.stage=e,this.course=t,this.f=n.forward,this.birdId=n.spec.id,this.lowSpec=r,this.opts=i,this.acc=ud.bands.map(()=>Math.random()*.6),this.showQ=[],this.s0=t.s0,this.events=[],this.doors=this.events,this.duration=(Vu.length-t.s0)/this.f,this.plan=null}begin(e,t,n,r=-1){this.s0=e,this.duration=(Vu.length-e)/this.f;let i=t&&t.occ?e=>this._los(e,t):null;return this.plan=Th(this.birdId,{seed:n,sStart:e,los:i,startW:r}),this.events=this.plan.waves.map(e=>({...e,type:e.pat,meetE:e.tPass,passE:e.tPass,finale:e.kind===`finale`})),this.doors=this.events,this.plan}_los(t,n){let r=this.course,i=X.los,a=this._cam||=new G,o=this._look||=new G,s=this._egg||=new G,c=new G,l=new G,u=new G,d=Math.tan(i.hfov*Math.PI/180),f=Math.tan(i.vfov*Math.PI/180),p=Math.max(.2,...t.eggs.map(e=>e.info===void 0?.9:t.tq-e.info));for(let m=t.tq-p;m<=t.tq+1e-6;m+=i.step){let i=this.s0+m*this.f-Z.distance,p=Z.followU*t.P[0],h=r.center(i)+Z.followV*t.P[1]+Z.upOffset;r.toWorld(i,p,h,a),r.toWorld(i+Z.lookAhead,p,h-Z.pitchDrop,o),c.subVectors(o,a).normalize(),l.set(-c.z,0,c.x).normalize(),u.crossVectors(l,c);for(let i of t.eggs){if(i.info!==void 0&&m<i.info)continue;r.toWorld(i.s,i.u,r.center(i.s)+i.w+0,s);let t=s.x-a.x,o=s.y-a.y,p=s.z-a.z,h=t*c.x+o*c.y+p*c.z;if(h<1||Math.abs(t*l.x+p*l.z)/h>d||Math.abs(t*u.x+o*u.y+p*u.z)/h>f||e.occluded(n,a,s))return!1}}return!0}static occluded(e,t,n){let r=e.occ;if(!r)return!1;let i=n.x-t.x,a=n.y-t.y,o=n.z-t.z,s=Math.max(1,Math.ceil(Math.hypot(i,o)/4));for(let e=1;e<s;e++){let n=e/s,c=t.x+i*n,l=t.y+a*n,u=t.z+o*n,d=Math.floor((c-r.x0)/r.cell),f=Math.floor((u-r.z0)/r.cell);if(d<0||f<0||d>=r.n||f>=r.n)continue;let p=f*r.n+d;if(r.t[p]===3&&r.h[p]>l)return!0}return!1}static zoneAt(e){for(let t of Vu.zones)if(e>=t.s[0]&&e<t.s[1])return t;return Vu.zones[Vu.zones.length-1]}sAt(e){return this.s0+e*this.f}sectionAt(t){let n=e.zoneAt(this.sAt(t));return{name:n.id,level:n.music,rest:!!n.rest,noSlowmo:n.id===`finale`,muffle:!1,zone:n}}phase(t){let n=e.zoneAt(this.sAt(t));return n.id===`finale`?2:+(n.music>=2)}update(e,t){let{now:n,elapsed:r}=t,i=this.sectionAt(r),a=i.rest?1.3:i.name===`finale`?1:.55,o=this.lowSpec?.5:1;ud.bands.forEach((n,r)=>{this.acc[r]+=(n.rate[0]+(n.rate[1]-n.rate[0])*Math.min(1,a))*(a>1?a:1)*e*o,this.acc[r]>=1&&(t.spawnDecor(r,null)?--this.acc[r]:this.acc[r]=1)});for(let e=this.showQ.length-1;e>=0;e--){let r=this.showQ[e];if(n<r.at)continue;this.showQ.splice(e,1);let i=1;for(let e=1;e<this.acc.length;e++)this.acc[e]>this.acc[i]&&(i=e);this.acc[i]>.2&&t.spawnDecor(i,r.color)&&--this.acc[i]}return this.phase(r)}onThreatLaunch(e){Math.random()<ud.showChance&&this.showQ.push({at:e+Math.random()*ud.showWindow*.8,color:null})}},$h={body:0,shoulderR:1,elbowR:2,shoulderL:3,elbowL:4,tail:5,legs:6};function eg(e,t,n={}){let r=e.length/3,i=t.span/2,a=.17*i,o=a+.45*(i-a),s=t.zTail,c=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},l=new Uint16Array(r*4),u=new Float32Array(r*4),d=new Uint8Array(r);if(n.hideLegs){let a=t.zBeak,o=t.zTail,s=Array.from({length:40},()=>[]);for(let t=0;t<r;t++){let n=e[t*3],r=e[t*3+2];Math.abs(n)>.12*i||r<a||r>o||s[Math.min(39,Math.floor((r-a)/(o-a)*40))].push(e[t*3+1])}let c=s.map(e=>(e.sort((e,t)=>e-t),e.length?e[Math.floor(e.length*.35)]:0));for(let t=0;t<r;t++){let r=e[t*3],s=e[t*3+1],l=e[t*3+2];Math.abs(r)>.12*i||l<a||l>o||s<c[Math.min(39,Math.floor((l-a)/(o-a)*40))]-n.legDrop&&(d[t]=1)}}let f=0;for(let t=0;t<r;t++){let n=e[t*3],r=e[t*3+2],i=Math.abs(n),p=t*4;if(d[t]){l[p]=$h.legs,u[p]=1,f++;continue}let m=c(a-.02,a+.05,i),h=c(o-.02,o+.05,i),g=(1-m)*c(s-.02,s+.08,r),_=n>0;l[p]=$h.body,u[p]=Math.max(0,1-m-g),l[p+1]=_?$h.shoulderR:$h.shoulderL,u[p+1]=m-h,l[p+2]=_?$h.elbowR:$h.elbowL,u[p+2]=h,l[p+3]=$h.tail,u[p+3]=g}return{si:l,sw:u,xs:a,xe:o,zt:s,nLeg:f}}var tg={};function ng(e){tg=e||{}}function rg(e,t={}){return new Oa({color:e,flatShading:!0,...t})}function ig(e,t,n=0,r=0,i=0){let a=new ii(e,t);return a.position.set(n,r,i),a}var ag={sparrow:{back:9067059,belly:14272680,head:7227948,cap:6044194,cheek:15129800,beak:3813414,cov:10119742,covStripe:3876118,sec:7029798,secStripe:3021840,secEdge:12884586,pri:4862494,priStripe:2365200,priInner:5914150,tail:5913634,tailStripe:2759182,tailLen:.36,tailW:.075,nTail:8,gloss:0,wingBar:15787728,neck:null,span:1.2},magpie:{back:855572,belly:14869218,head:526348,cap:526348,cheek:526348,beak:657930,cov:15921906,covStripe:14606046,sec:1323114,secStripe:792632,secEdge:1919626,pri:921624,priStripe:329226,priInner:15790320,tail:993864,tailStripe:529958,tailLen:1.05,tailW:.07,nTail:10,gloss:1,wingBar:null,neck:null,span:1.25},pigeon:{back:9080988,belly:10133677,head:6120564,cap:6120564,cheek:6120564,beak:3025450,cov:10133934,covStripe:9080988,sec:9080990,secStripe:8028302,secEdge:3817290,pri:3948876,priStripe:2764342,priInner:5659752,tail:6975614,tailStripe:2895928,tailLen:.38,tailW:.08,nTail:10,gloss:.3,wingBar:2764344,neck:4102776,span:1.25}},og=new K,sg=new K;function cg(e,t,n,r,i=n,a=null,o=6){let s=[],c=[],l=[],u=new K(n),d=new K(r),f=new K(i),p=a===null?null:new K(a);for(let n=0;n<=o;n++){let r=n/o,i=r*e,a=(.6+.4*Math.sin(Math.min(1,r*1.6)*Math.PI*.5))*Math.sqrt(Math.max(0,1-Math.max(0,(r-.7)/.3)**2)),m=t/2*a,h=Math.sin(r*Math.PI)*t*.12;for(let[e,t]of[[-m,f],[0,d],[m,u]])s.push(e,-h,i),og.copy(t),p&&og.lerp(p,Math.max(0,(r-.6)/.4)),c.push(og.r,og.g,og.b);if(n<o){let e=n*3;l.push(e,e+3,e+1,e+1,e+3,e+4,e+1,e+4,e+2,e+2,e+4,e+5)}}let m=new jr;return m.setAttribute(`position`,new q(s,3)),m.setAttribute(`color`,new q(c,3)),m.setIndex(l),m.computeVertexNormals(),m}function lg(e,t,n,r,i,a=0,o=0){return e.rotateX(a),e.rotateZ(o),e.rotateY(i),e.translate(t,n,r),e}function ug(e){return Ud(e.map(e=>e.index?e.toNonIndexed():e))}function dg(e,t,n,r=-.15,i=null,a=null){let o=e.attributes.normal,s=e.attributes.position,c=new Float32Array(o.count*3),l=new K(t),u=new K(n),d=new K,f=i===null?null:new K(i);for(let e=0;e<o.count;e++){let t=kt.smoothstep(o.getY(e),r-.25,r+.25);a!==null&&(t=Math.max(t,kt.smoothstep(s.getZ(e),a-.1,a+.1))),d.copy(u).lerp(l,t),f&&t>.6&&Math.sin(Math.atan2(s.getX(e),s.getY(e))*9)>.55&&d.lerp(f,.6),c[e*3]=d.r,c[e*3+1]=d.g,c[e*3+2]=d.b}return e.setAttribute(`color`,new _r(c,3)),e}function fg(e,{color:t=16777215,vertexColors:n=!0,rough:r=.75,gloss:i=0,side:a=2}={}){let o=new Ea({color:t,vertexColors:n,roughness:r,metalness:0,side:a,envMapIntensity:.6});return o.userData.gloss=i,o.onBeforeCompile=t=>{t.uniforms.uRim=e,t.uniforms.uGloss={value:i},t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
uniform vec3 uRim;
uniform float uGloss;`).replace(`#include <opaque_fragment>`,`
        float rimF = 1.0 - abs(dot(normalize(normal), normalize(vViewPosition)));
        outgoingLight += uRim * pow(rimF, 2.5) + uRim * 0.12;
        // 윤곽에 아주 옅은 달빛 테두리(어두운 배경에서도 새 모양이 읽히게) + 까치 푸른 광택
        outgoingLight += vec3(0.05, 0.06, 0.09) * pow(rimF, 3.0) + vec3(0.02, 0.06, 0.16) * uGloss * pow(rimF, 1.5);
        #include <opaque_fragment>`)},o}function pg(e,t={}){if(tg[e]&&!t.code)return mg(e,tg[e]);let n=ag[e]||ag.sparrow,r={value:new K(0,0,0)},i=new kn,a=new kn;i.add(a);let o=fg(r,{rough:n.gloss?.42:.8,gloss:n.gloss}),s=fg(r,{rough:.85,gloss:n.gloss*.6,side:0}),c=new fa([[0,-.46],[.06,-.43],[.13,-.32],[.18,-.15],[.195,0],[.185,.12],[.15,.23],[.1,.31],[0,.35]].map(([e,t])=>new W(e,t)),20);c.rotateX(-Math.PI/2),c.scale(.86,.78,1),c.computeVertexNormals(),dg(c,n.back,n.belly,-.1,e===`sparrow`?n.covStripe:null,.02),a.add(new ii(c,s));let l=new kn;l.position.set(0,.16,-.36),a.add(l);let u=dg(new ma(.14,18,12),n.cap,n.cheek,.1);u.scale(.95,.92,1.08),l.add(new ii(u,s));let d=new la(.04,.15,10);d.rotateX(-Math.PI/2);let f=new Float32Array(d.attributes.position.count*3);sg.set(n.beak);for(let e=0;e<f.length;e+=3)f[e]=sg.r,f[e+1]=sg.g,f[e+2]=sg.b;d.setAttribute(`color`,new _r(f,3)),l.add(ig(d,s,0,-.02,-.19));let p=new Kr({color:328965}),m=new ma(.024,8,6);if(l.add(ig(m,p,.1,.035,-.08)),l.add(ig(m,p,-.1,.035,-.08)),n.neck){let e=ig(dg(new ma(.15,16,10),n.neck,8014474,.2),fg(r,{rough:.35,gloss:.8,side:0}),0,-.08,.1);e.scale.set(1.08,.82,.9),l.add(e)}let h=[],g=n.nTail;for(let t=0;t<g;t++){let r=g===1?0:t/(g-1)-.5,i=e===`magpie`?.22:.55,a=cg(e===`magpie`?n.tailLen*(1-Math.abs(r)*.9):n.tailLen*(1-Math.abs(r)*.15),n.tailW,n.tail,n.tailStripe,n.tail,e===`pigeon`?1974568:null,6);lg(a,r*.07,.01+Math.abs(r)*-.008+(.5-Math.abs(r))*.004,0,r*i,-.06),h.push(a)}let _=new ii(ug(h),o);_.position.set(0,.04,.3),_.rotation.x=.5,a.add(_);let v=n.span;function y(t){let r=new kn;r.position.set(.14*t,.08,-.06),r.rotation.order=`ZYX`;let i=[];for(let e=0;e<7;e++){let t=(.02+e*.05)*v,r=cg(.25-e*.006,.075,n.sec,n.secStripe,n.sec,n.secEdge,5);i.push(lg(r,t,-.004-e*6e-4,-.02,.06+e*.03,-.05))}for(let e=0;e<8;e++){let t=(0+e*.045)*v,r=n.wingBar===null?null:n.wingBar,a=cg(.13,.06,n.cov,n.covStripe,n.cov,r,4);i.push(lg(a,t,.008,-.07,.1+e*.02,-.04))}for(let e=0;e<9;e++){let t=(0+e*.04)*v,r=cg(.08,.06,n.cov,n.cov,n.cov,null,3);i.push(lg(r,t,.014,-.095,.15,-.02))}let s=ug(i);t<0&&hg(s),r.add(new ii(s,o));let c=new kn;c.position.x=.38*v*t,r.add(c);let l=[];for(let e=0;e<8;e++){let t=e/7,r=cg((.26+.2*Math.sin(t*Math.PI*.62))*v,.07-t*.012,n.pri,n.priStripe,n.priInner,null,6),i=.35+t*1.05;l.push(lg(r,t*.07*v,-.003-t*.0015,-.03+t*.01,i,-.04))}for(let t=0;t<6;t++){let r=t/5,i=cg(.12,.06,e===`magpie`?n.pri:n.cov,n.covStripe,e===`magpie`?n.pri:n.cov,null,3);l.push(lg(i,-.02+r*.08*v,.008,-.07,.4+r*.9,-.03))}let u=ug(l);return t<0&&hg(u),c.add(new ii(u,o)),a.add(r),{pivot:r,elbow:c}}let b=y(1),x=y(-1);return{root:i,body:a,head:l,wingL:x.pivot,wingR:b.pivot,elbowL:x.elbow,elbowR:b.elbow,rim:r.value,mats:[o,s]}}function mg(e,t){let n={value:new K(0,0,0)},r=new kn,i=new kn;r.add(i);let a=t.geometry.clone();a.computeBoundingBox();let o=a.boundingBox,s=o.max.x-o.min.x,c=a.attributes.position.array,l=t.userData||{},u=eg(c,{span:s,zTail:l.zTail??.46,zBeak:l.zBeak??-.46});a.setAttribute(`skinIndex`,new vr(u.si,4)),a.setAttribute(`skinWeight`,new q(u.sw,4));let d=0,f=0;for(let e=0;e<c.length/3;e++)Math.abs(Math.abs(c[e*3])-u.xs)<.03&&(d+=c[e*3+2],f++);d=f?d/f:0;let p=(e,t,n)=>{let r=new _i;return r.position.set(e,t,n),r.rotation.order=`ZYX`,r},m=p(0,0,0),h=p(u.xs,0,d),g=p(u.xe-u.xs,0,0),_=p(-u.xs,0,d),v=p(-(u.xe-u.xs),0,0),y=p(0,0,u.zt);m.add(h,_,y),h.add(g),_.add(v);let b=[m,h,g,_,v,y,p(0,0,0)];m.add(b[6]);let x=e===`magpie`?1:e===`pigeon`?.3:0,S=fg(n,{vertexColors:!1,rough:x?.5:.8,gloss:x,side:2});S.map=t.map,S.emissive=new K(Cg,Cg,Cg),S.emissiveMap=t.map,S.envMapIntensity=.25;let C=new gi(a,S);C.add(m),C.bind(new xi(b)),C.frustumCulled=!1,i.add(C);let w=new kn;return i.add(w),{root:r,body:i,head:w,wingL:_,wingR:h,elbowL:v,elbowR:g,tail:y,rim:n.value,mats:[S],glb:!0,mesh:C,span:s}}function hg(e){e.scale(-1,1,1);let t=e.index;if(t)for(let e=0;e<t.count;e+=3){let n=t.getX(e+1);t.setX(e+1,t.getX(e+2)),t.setX(e+2,n)}else{let t=e.attributes.position,n=e.attributes.color,r=e.attributes.normal;for(let e=0;e<t.count;e+=3)for(let i of[t,n,r])if(i)for(let t=0;t<i.itemSize;t++){let n=i.array[(e+1)*i.itemSize+t];i.array[(e+1)*i.itemSize+t]=i.array[(e+2)*i.itemSize+t],i.array[(e+2)*i.itemSize+t]=n}}return e.computeVertexNormals(),e}var gg=.2,_g=.18,vg=.55;function yg(e,t,n=0,r=0,i=0){if(e.glb)return wg(e,t,n,r,i);let a=1-n,o=Math.sin(t)*.8*a+gg*a,s=Math.sin(t-.8)*.5*a;e.wingR.rotation.z=o-n*.3,e.wingL.rotation.z=-o+n*.3,e.wingR.rotation.y=n*1.3,e.wingL.rotation.y=-n*1.3,e.wingR.rotation.x=vg*a,e.wingL.rotation.x=vg*a,e.elbowR&&(e.elbowR.rotation.z=s*.9-n*.2,e.elbowL.rotation.z=-s*.9+n*.2,e.elbowR.rotation.y=n*2.2-Math.max(0,-Math.sin(t))*.25*a,e.elbowL.rotation.y=-n*2.2+Math.max(0,-Math.sin(t))*.25*a),e.body.rotation.x=r-_g*a,e.body.rotation.z=i}var bg=.12,xg=.1,Sg=[1.5,2.2,.45],Cg=.22;function wg(e,t,n,r,i){let a=1-n,o=Math.sin(t)*.7*a+bg*a,s=Math.sin(t-.8)*.45*a;e.wingR.rotation.set(xg*a,-n*Sg[0],o-n*.15);let c=1-Sg[2]*n;e.wingR.scale.set(c,1,c),e.wingL.scale.set(c,1,c),e.wingL.rotation.set(xg*a,n*Sg[0],-o+n*.15),e.elbowR.rotation.set(0,-n*Sg[1]+Math.max(0,-Math.sin(t))*.25*a,s*.9),e.elbowL.rotation.set(0,n*Sg[1]-Math.max(0,-Math.sin(t))*.25*a,-s*.9),e.tail&&(e.tail.rotation.x=.06*Math.sin(t+1.2)*a),e.body.rotation.x=r-.1*a,e.body.rotation.z=i}function Tg(){let e=new kn,t=ig(new ca(1.75,1.5,.14,18),rg(16118248));e.add(t);let n=ig(new ha(1.68,.07,4,18),rg(14274493),0,.08,0);n.rotation.x=Math.PI/2,e.add(n);let r=rg(13203500),i=rg(10836508),a=ig(new da(.8,1),r,0,.62,0);a.scale.set(1.2,.72,.95),e.add(a);let o=ig(new da(.42,0),i,0,.9,-.25);o.scale.set(1.5,.7,1.1),e.add(o);let s=rg(16248800);for(let t of[-1,1]){let n=new kn;n.position.set(.55*t,.75,-.45),n.rotation.set(-.9,0,-.35*t);let a=ig(new ca(.16,.3,.75,6),r,0,.3,0);n.add(a),n.add(ig(new da(.11,0),s,0,.72,0)),n.add(ig(new da(.09,0),s,.08,.78,0)),e.add(n);let o=ig(new da(.3,0),i,.95*t,.55,.2);o.scale.set(.6,.5,1.1),e.add(o)}let c=rg(5216826);for(let t=0;t<5;t++){let n=Math.PI*.6+t*.35,r=ig(new da(.28,0),c,Math.cos(n)*1.25,.14,Math.sin(n)*1.25);r.scale.set(1,.35,1),e.add(r)}let l=ig(new ca(.28,.28,.1,6,1,!1,0,Math.PI),rg(15913019),-1.15,.2,-.5);return l.rotation.z=Math.PI/2,e.add(l),e}var Eg=class{constructor(e){this.group=new kn,e.add(this.group),this.pos=this.group.position,this.vx=0,this.vy=0,this.phase=0,this.roll=0,this.pitch=0,this.lastDir={x:1,y:0},this.shield=new ii(new da(1,1),new Kr({color:new K(.3,.7,1.4),transparent:!0,opacity:.18,depthWrite:!1,blending:2})),this.shield.visible=!1,this.group.add(this.shield),this.shield.renderOrder=51,this.yaw=0,this.fold=0,this.foldTarget=0,this.setSpecies(`sparrow`)}setSpecies(e){this.model&&this.group.remove(this.model.root),this.spec=Iu[e],this.model=pg(e);let t=this.spec.radius*2.3;this.model.root.scale.setScalar(t),this.group.add(this.model.root),this.model.root.traverse(e=>{e.isMesh&&(e.renderOrder=50,e.material.transparent=!0)}),this.shield.scale.setScalar(this.spec.radius*1.5),this._mats=[],this.model.root.traverse(e=>{e.isMesh&&e.material&&e.material.color&&!this._mats.includes(e.material)&&this._mats.push(e.material)}),this._scorch=-1,this._applyEnv()}useAssets(e){this.env=e.env||null,e.birds&&(ng(e.birds),this.spec&&this.setSpecies(this.spec.id)),this._applyEnv()}_applyEnv(){this.env&&this.model&&this.model.root.traverse(e=>{e.isMesh&&e.material.isMeshStandardMaterial&&(e.material.envMap=this.env,e.material.needsUpdate=!0)})}get radius(){return this.spec.radius}get forward(){return this.spec.forward}reset(e,t=this.startV||16,n=0){this.startV=t,this.s=n,this.u=0,this.w=this.course?t-this.course.center(n):0,this.v=t,this.vx=0,this.vy=0,this.hp=e,this.maxHp=this.spec.hp,this.invuln=0,this.obsInvuln=0,this.cooldown=0,this.activeT=0,this.dashT=0,this.rollT=-1,this.rollInv=0,this.rollCD=0,this.rolls=Yu.start,this.rollEmpty=!1,this.rollStart=-99,this.rollDir={x:0,y:0},this.spin=0,this.fold=0,this.foldTarget=0,this.heavy=!1,this.lastHitReal=-99,this.scorchLevel=0,this.smokeT=0,this.setScorch(0),this.roll=0,this.pitch=0,this.yaw=0,this.heading=0,this.group.rotation.set(0,0,0),this.group.visible=!0,this.model.root.visible=!0,this.shield.visible=!1,this.course?this.place():this.pos.set(0,t,-n)}setCourse(e){this.course=e}place(){let e=this.course;e.center&&(this.v=e.center(this.s)+this.w),e.toWorld(this.s,this.u,this.v,this.pos);let t=e.at(this.s,this._at||={});this.heading=t.th,this.group.rotation.order=`YXZ`,this.group.rotation.y=-t.th,e.slope&&(this.group.rotation.x=Math.atan(e.slope(this.s))*.8)}syncFromWorld(){let e=this.course.nearest(this.pos.x,this.pos.z,0);this.s=e.s,this.u=e.u,this.v=this.pos.y,this.w=this.course.center?this.v-this.course.center(this.s):0}get revealing(){return this.spec.special.kind===`reveal`&&this.activeT>0}get guarding(){return this.spec.special.kind===`guard`&&this.activeT>0}get dashing(){return this.dashT>0}get damageMult(){return this.guarding?this.spec.special.damageMult:1}get rolling(){return this.rollT>=0}get rollCooldown(){return Yu.cooldown}gainRoll(e=1){let t=this.rolls;return this.rolls=Math.min(Yu.max,this.rolls+e),this.rolls-t}tryRoll(e,t){if(this.rolling||this.rollCD>0)return!1;if(this.rolls<=0)return this.rollEmpty=!0,!1;this.rolls--,this.rollT=0,this.rollInv=Yu.invuln,this.rollStart=t;let n=Math.hypot(e.x,e.y);return this.rollDir=n>0?{x:e.x/n,y:e.y/n}:{x:0,y:0},this.spinSign=e.x>0?-1:1,!0}setScorch(e){if(e===this._scorch||!this._mats)return;this._scorch=e;let t=Xu.scorch[Math.max(0,Math.min(Xu.scorch.length-1,e))];for(let e of this._mats)e.color.setRGB(t,t*.96,t*.92)}trySpecial(e){return!1}steer(e,t,n){let r=this.spec;if((t.x||t.y)&&(this.lastDir={x:t.x,y:t.y}),this.dashT>0){let t=r.lateral*r.special.speedMult;this.vx=this.dashDir.x*t,this.vy=this.dashDir.y*t,this.dashT-=e}else{let n=1-Math.exp(-r.accel*(this.heavy?Xu.heavyAccel:1)*e);this.vx+=(t.x*r.lateral-this.vx)*n,this.vy+=(t.y*r.lateral-this.vy)*n}if(this.u+=this.vx*e,this.w+=this.vy*e,this.rollT>=0){let t=Math.min(e,Math.max(0,Yu.duration-this.rollT)),n=Yu.push/Yu.duration;this.u+=this.rollDir.x*n*t,this.w+=this.rollDir.y*n*t,this.rollT+=e;let r=Math.min(1,this.rollT/Yu.duration);this.spin=this.spinSign*Math.PI*2*(r*r*(3-2*r)),this.rollT>=Yu.duration&&(this.rollT=-1,this.spin=0,this.rollCD=this.rollCooldown)}else this.rollCD=Math.max(0,this.rollCD-e);this.rollInv=Math.max(0,this.rollInv-e),this.s+=r.forward*e,this.applyBounds(e,n),this.place(),this.cooldown=Math.max(0,this.cooldown-e),this.activeT=Math.max(0,this.activeT-e),this.invuln=Math.max(0,this.invuln-e),this.obsInvuln=Math.max(0,this.obsInvuln-e),this.animate(e,1)}applyBounds(e,t){let n=this.course&&this.course.E?this.course.E:{u:t.u,v:(t.v1-t.v0)/2},r=(this.u/n.u)**2+(this.w/n.v)**2;if(r>1){let e=1/Math.sqrt(r);this.u*=e,this.w*=e;let t=this.u/(n.u*n.u),i=this.w/(n.v*n.v),a=Math.hypot(t,i)||1,o=(this.vx*t+this.vy*i)/a;o>0&&(this.vx-=o*t/a,this.vy-=o*i/a)}}setRim(e){this.model.rim.copy(e)}animate(e,t=1,n=0){this.phase+=this.spec.flapHz*Math.PI*2*e*t*(this.dashT>0?1.8:1);let r=this.spec.lateral,i=-(this.vx/r)*1.1,a=this.vy/r*.45,o=-(this.vx/r)*.4,s=1-Math.exp(-9*e);this.roll+=(i-this.roll)*s,this.pitch+=(a-this.pitch)*s,this.yaw+=(o-this.yaw)*s;let c=this.foldTarget||0;this.fold=c>this.fold?Math.min(c,this.fold+e/Wu.foldT[0]):Math.max(c,this.fold-e/Wu.foldT[1]),yg(this.model,this.phase,Math.max(n,this.fold*(this.model.glb?Wu.foldAmtGLB:Wu.foldAmt)),this.pitch,this.roll),this.model.body.rotation.y=this.yaw,this.model.root.rotation.z=this.spin||0;let l=Math.max(this.invuln,this.obsInvuln||0);this.model.root.visible=l<=0||Math.floor(l*10)%2==0,this.shield.visible=this.guarding}},Dg=Math.PI/180,Og=class{constructor(e){this.camera=e,e.near=Z.near,e.updateProjectionMatrix(),this.course=null,this.s=0,this.u=0,this.w=1.2,this.v=17,this.roll=0,this.rollExtra=0,this.pitch=0,this.kick=0,this.trauma=0,this.tt=0,this.finale=0,this.off=new G,this._p=new G,this._look=new G,this._sec={},this.colliders=[]}setCourse(e){this.course=e}_center(e){let t=this.course;if(t.center)return t.center(e);let n=t.stage.section;return(n.v0+n.v1)/2}_target(e){let t=Z.distance+Z.finaleBack*this.finale,n=e.s-t,r=e.w===void 0?e.v-this._center(e.s):e.w;return{s:n,u:Z.followU*e.u,w:Z.followV*r+Z.upOffset,v:this._center(n)+Z.followV*r+Z.upOffset}}_clamp(){let e=this.course.E||{u:9,v:6};this.u=Math.max(-e.u-1,Math.min(e.u+1,this.u)),this.w=Math.max(-e.v+.5,Math.min(e.v+1,this.w)),this.v=this._center(this.s)+this.w}reset(e){if(!this.course)return;let t=this._target(e);this.s=t.s,this.u=t.u,this.w=t.w,this.roll=0,this.rollExtra=0,this.pitch=this._pitchTarget(e.s),this.kick=0,this.trauma=0,this.off.set(0,0,0),this._clamp(),this.apply()}snap(e){let t=this._target(e);this.u=t.u,this.w=t.w}fovKick(e=Z.fovKick){this.kick=Math.max(this.kick,e)}shake(e){e<=0||this.addTrauma(.35*Math.min(1,e))}addTrauma(e){this.trauma=Math.min(1,this.trauma+e)}_pitchTarget(e){let t=this.course;if(!t.slope)return 0;let n=(t.slope(e)+t.slope(e-Z.distance)+t.slope(e+10))/3,r=Math.atan(n)*Z.pitchFollow;return kt.clamp(r,-Z.maxPitchDeg*Dg,Z.maxPitchDeg*Dg)}update(e,t,n,r=e){let i=this._target(t),a=1-Math.exp(-Z.spring*e);this.s=i.s,this.u+=(i.u-this.u)*a,this.w+=(i.w-this.w)*a,this._clamp();let o=this.course.at(t.s,this._at||={}),s=t.forward||13,c=kt.clamp(-Math.atan(s*s*o.k/9.8),-Z.maxRollPathDeg*Dg,Z.maxRollPathDeg*Dg),l=kt.clamp((t.roll||0)*Z.rollFromBird,-Z.maxRollBirdDeg*Dg,Z.maxRollBirdDeg*Dg),u=t.rollT>=0?Math.min(1,t.rollT/Yu.duration):0,d=t.rollT>=0?-(t.spinSign||1)*Yu.camFollowDeg*Dg*Math.sin(Math.PI*u):0,f=n?0:c+l;this.roll+=(f-this.roll)*Math.min(1,4*e),this.rollExtra=n?0:d;let p=Z.maxRollDeg*Dg,m=this.roll+this.rollExtra;Math.abs(m)>p&&(this.rollExtra=Math.sign(m)*p-this.roll);let h=n?0:this._pitchTarget(t.s);if(this.pitch+=(h-this.pitch)*Math.min(1,3*e),this.kick=n?0:this.kick*Math.exp(-Z.fovKickDecay*e),this.trauma=Math.max(0,this.trauma-Xu.trauma.decay*r),this.tt+=r,this.trauma>0&&!n){let e=this.trauma*this.trauma*Xu.trauma.maxShake,t=this.tt*Xu.trauma.freq,n=Math.sin(t*1+1.3)*.6+Math.sin(t*2.31+.2)*.3+Math.sin(t*4.7+2.1)*.1,r=Math.sin(t*1.17+4.1)*.6+Math.sin(t*2.73+1.7)*.3+Math.sin(t*5.3+.6)*.1;this.off.set(n*e,r*e,0)}else this.off.set(0,0,0);this.apply()}get rollDeg(){return(this.roll+(this.rollExtra||0))/Dg}apply(){let e=this.camera,t=this.course;t.toWorld(this.s,this.u+this.off.x,this.v+this.off.y,this._p),e.position.copy(this._p);let n=Z.lookAhead,r=Z.pitchDrop-Math.tan(this.pitch)*n;t.toWorld(this.s+n,this.u,this.v-r,this._look),e.up.set(0,1,0),e.lookAt(this._look),(this.roll||this.rollExtra)&&e.rotateZ(this.roll+(this.rollExtra||0));let i=Z.fov+(Z.finaleFov-Z.fov)*this.finale+this.kick;Math.abs(e.fov-i)>.001&&(e.fov=i,e.updateProjectionMatrix())}follow(e,t){let n=this.camera,r=1-Math.exp(-3*e);this.s=t.s-Z.distance-2,this.u+=(t.u*.5-this.u)*r,this.v+=(Math.max(3,t.v+5)-this.v)*r,this.w=this.v-this._center(this.s),this.roll*=Math.exp(-4*e),this.rollExtra=0,this.kick=0,this.course.toWorld(this.s,this.u,this.v,this._p),n.position.copy(this._p),n.up.set(0,1,0),n.lookAt(t.pos),Math.abs(n.fov-Z.fov)>.001&&(n.fov=Z.fov,n.updateProjectionMatrix())}},kg=class{constructor(e=od.maxFlashesPerSecond,t=od.flashThreshold){this.max=e,this.threshold=t,this.times=[]}request(e,t){let n=Math.min(e,od.maxFlash);for(;this.times.length&&t-this.times[0]>1;)this.times.shift();return n<this.threshold?n:this.times.length>=this.max?this.threshold*.8:(this.times.push(t),n)}},Ag=`bvf.ranking.v1`;function jg(e){let t=String(e??``).normalize(`NFKC`).replace(/[\s\p{P}\p{S}\p{C}]/gu,``);return/[^가-힣a-zA-Z0-9]/.test(t)?{ok:!1,reason:`한글·영문·숫자만 쓸 수 있어요.`}:t.length<rd.nameMin?{ok:!1,reason:`${rd.nameMin}자 이상 적어 주세요.`}:t.length>rd.nameMax?{ok:!1,reason:`${rd.nameMax}자까지 쓸 수 있어요.`}:{ok:!0,name:t,norm:t.toLowerCase()}}function Mg(e){return e.slice().sort((e,t)=>t.score-e.score||e.continues-t.continues||e.at-t.at)}function Ng(e,t){return Mg(t===`clean`?e.filter(e=>e.continues===0):e)}function Pg(e){let t=()=>{try{let t=e&&e.getItem(Ag),n=t?JSON.parse(t):[];return Array.isArray(n)?n:[]}catch{return[]}};return{kind:`local`,async list(){return t()},async submit(n){let r={...n,id:`${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`,at:Date.now()},i=Mg([...t(),r]).slice(0,rd.keep);try{e&&e.setItem(Ag,JSON.stringify(i))}catch{return{ok:!1,reason:`이 브라우저에 저장할 수 없어요.`,id:r.id}}return{ok:!0,id:r.id}}}}var Fg=Pg(typeof localStorage<`u`?localStorage:null),Ig=`bvf.settings.v1`,Lg={reduceMotion:typeof window<`u`&&typeof window.matchMedia==`function`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,bloom:!0,lowSpec:!1,sound:!0};function Rg(){try{let e=localStorage.getItem(Ig);if(!e)return{...Lg};let t=JSON.parse(e);return{...Lg,...t}}catch{return{...Lg}}}var zg=Rg();function Bg(){try{localStorage.setItem(Ig,JSON.stringify(zg))}catch{}}var Vg=!1,Hg={finale:1.4,chrysanthemum:1,willow:.9,ring:.8,peony:.7},Ug=Zu.lookahead,Wg=new K(.05,.16,.22),Gg=2,Kg=`bvf.gpuNoticeClosed`,qg=13;function Jg(e,t){return ed.clearPerStage*e+(t.bonus??0)+ed.hpPoint*Math.ceil(Math.max(0,t.hpEnd))+(t.hits===0?ed.noHitBonus:0)}var Yg=class{constructor({renderer:e,input:t,sound:n,ui:r,settings:i,touch:a=!1,store:o=Fg}){this.renderer=e,this.input=t,this.sound=n,this.ui=r,this.settings=i,this.touch=a,this.store=o,this.scene=new Rn;let s=e?e.width/e.height:16/9;this.camera=new Eo(Z.fov,s,Z.near,2200),this.lights=new Nd(this.scene),this.world=new Kp(this.scene,this.lights),this.crowd=new nm(this.scene,this.world.shared),this.fw=new dm(this.scene,this.lights),this.threats=new Rh(this.scene,this.lights),this.threats.useSparks(this.fw.sparks),this.threats.useSmoke(this.fw.smoke),this.Bursts=Rh,this.Choreo=bm,this.food=new qh(this.scene),this.music=new Zh(n),this.timeScale=1,this.hitStopT=0,this.slowT=-1,this.lastSlow=-99,this.realPlay=0,this.evlog=[],this.scriptOpts={},this.geo={boxDist:op,insideBox:sp,segHitsBox:cp},this.bird=new Eg(this.scene),this.rig=new Og(this.camera),this._applyLowSpec(),e&&e.onResize.push((e,t)=>{this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.endCam.aspect=e/t,this.endCam.updateProjectionMatrix()}),this.aheadCam=new Eo(Z.fov,s,.2,2e3),this.flashLimiter=new kg,this.popClock=0;try{r.clock=()=>this.popClock*1e3}catch{}this._rim=new K,this.border=0,this.lastCheer=-10,this.t=0,this.real=0,this.god=!1,this.paused=!1,this.selected=`sparrow`,this.rankTab=`clean`,this.fps=60,this._fpsAcc=0,this._fpsN=0,this._lowFpsT=0,this._lowFpsTold=!1,this.perfLog={},this.measureOn=!1,this.resetMetrics(),this.perch=new kn;let c=new Oa({color:1118486});this.perch.add(new ii(new sa(80,.06,.06),c)),this.poles=[];for(let e of[-40,40]){let t=new ii(new sa(1.2,1,1.2),new Oa({color:3816516}));t.position.x=e,this.perch.add(t),this.poles.push(t)}this.scene.add(this.perch),this.perch.visible=!1,this.endScene=new Rn,this.endScene.background=new K(15764004),this.endScene.add(new mo(16773853,9062928,2.2));let l=new No(16777215,1.4);l.position.set(2,4,3),this.endScene.add(l),this.chicken=Tg(),this.chicken.position.y=-.2,this.endScene.add(this.chicken),this.steam=[];let u=new Kr({color:16777215,transparent:!0,opacity:.5,depthWrite:!1});for(let e=0;e<10;e++){let e=new ii(new da(.14,0),u.clone());e.userData.t=Math.random()*2,this.endScene.add(e),this.steam.push(e)}this.endCam=new Eo(45,s,.1,100),this.endCam.position.set(0,2.3,5.6),this.endCam.lookAt(0,.45,0),this.cruiser={s:0,u:0,v:22,vx:0,vy:0,roll:0,radius:.5,forward:9,pos:new G},this.fw.onBurst=e=>this._onBurst(e),this.fw.onLaunch=e=>this._onLaunch(e),this.gpuSoftware=!!(e&&e.software),this.currentStageIndex=-1,this.currentForward=0,this.devFreeze=!1,this.enterTitle()}resetMetrics(){this.metrics={frames:0,camInside:0,camInsideLog:[],birdOccluded:0,bounces:0,bounceHits:0,lastBounce:-10,bursts:[],occMax:0,occWhat:``,decorIntrude:0,decorCenterIn:0,screen:{minX:1,maxX:0,minY:1,maxY:0},visViol:[],perf:{calls:[1/0,0],tris:[1/0,0],fps:[1/0,0]},scaleLog:[],clock:[],trauma:0,maxApproach:0,maxLive:0}}_applyLowSpec(){let e=this.settings.lowSpec;this.fw.setLowSpec(e),this.threats.setLowSpec(e,id.lowSpecParticleMult),this.world.setLowSpec(e),this.director&&(this.director.lowSpec=e)}useAssets(e){this.assets=e,this.world.useAssets(e),this.fw.useAssets(e);let t=this.renderer?this.world.makeEnv(this.renderer.renderer):null;if(this.bird.useAssets({env:t,birds:e.birds}),e.smoke[0]&&e.smoke[1]){let t=new pa(.42,.42);this.steam.forEach((n,r)=>{n.geometry=t,n.material.alphaMap=e.smoke[r%2],n.material.needsUpdate=!0,n.rotation.z=Math.random()*Math.PI*2})}}_useStage(e,t){let n=dd[e];this.stage=n,this.currentStageIndex=e,this.currentForward=t,this.s0=t*Qu.rise*.5,this.course=new ap(n,t,this.s0),this.world.build(n,this.course),this.crowd.build(this.world.crowdSpots,this.world.crowdGroundY,Math.round(n.crowd*(this.settings.lowSpec?.6:1))),this.fw.reset(),this.fw.setStage(n),this.threats.setStage(n,this.course,this.world),this.threats.shadowOn=!1,this.bird.setCourse(this.course),this.rig.setCourse(this.course),this.rig.finale=0;for(let e of this.course.colliders)e.fade=1;let r=new K(n.cityGlow);this.fw.smokeTint=[r.r*.55+.035,r.g*.5+.035,r.b*.45+.045],this.lights.clear()}_startV(){return this.course.center(0)-1}_resetCruiser(){let e=this.cruiser;e.s=0,e.u=0,e.v=22,this.rig.reset(e),this.decorAcc=0}async enterTitle(){this.state=`title`,this.paused=!1,this.ui.showPause(!1),this.ui.showHud(!1),this.ui.introText(``),this.ui.setBorder(0),this.crowd.setMaxCheer(0),(this.currentStageIndex!==0||this.currentForward!==qg)&&this._useStage(0,qg),this.bird.group.visible=!1,this.perch.visible=!1,this.threats.reset(),this.food.reset(),this._resetCruiser();let e=[];try{e=Ng(await this.store.list(),`clean`).slice(0,10)}catch{e=[]}this.state===`title`&&this.ui.showTitle({settings:this.settings,touch:this.touch,top:e,dev:Vg,gpuWarn:this._gpuWarnVisible()})}_gpuWarnVisible(){if(!this.gpuSoftware)return!1;try{return typeof sessionStorage>`u`||sessionStorage.getItem(Kg)!==`1`}catch{return!0}}enterSelect(){this.state=`select`,this.paused=!1,this.ui.showPause(!1),this.ui.showHud(!1),this.ui.introText(``),this.crowd.setMaxCheer(0),(this.currentStageIndex!==0||this.currentForward!==qg)&&(this._useStage(0,qg),this._resetCruiser()),this.threats.reset(),this.food.reset(),this.perch.visible=!1,this.bird.setSpecies(this.selected),this.bird.reset(Iu[this.selected].hp,this.cruiser.v,this.cruiser.s),this.bird.group.visible=!0,this.selectAngle=.6,this.ui.showSelect({selected:this.selected})}startRun(){this.run={bird:this.selected,stageIndex:0,continues:0,records:[],totalTime:0,registered:!1},this.bird.setSpecies(this.selected),this.startStage(0,Iu[this.selected].hp,!0)}startStage(e,t,n){if(this.run.stageIndex=e,this.run.stageStartHp=t,this._useStage(e,Iu[this.selected].forward),this.director=new Qh(this.stage,this.course,this.bird,this.settings.lowSpec,this.scriptOpts),this.stageDur=this.director.duration,this.bird.reset(t,this._startV(),n?0:this.s0),this.bird.group.visible=!0,this.stats={nearMiss:0,rings:0,bonus:0,chain:0,hits:0,elapsed:0,phase:0,obstacleHits:0,perfect:0,graze:0,dodge:0,maxChain:0,rolls:0,center:0,centerMult:0,pass:0,timing:0,food:0,hpFood:0,rollFood:0,healed:0},this.music.stop(),this.hitStopT=0,this.slowT=-1,this.lastSlow=-99,this.realPlay=0,this.evlog=[],this.hintBar=0,this._restZone=null,this.border=0,this.crowd.setMaxCheer(0),this.paused=!1,this.ui.showPause(!1),this.ui.hideScreen(),this.ui.setBorder(0),this.ui.clearPops&&this.ui.clearPops(),this._rimFx=null,this.rig.reset(this.bird),this.sound.setMurmur(.6),this.threats.resetLog(),this.food.resetLog(),this.food.build(this.course),this.resetMetrics(),n){this.state=`intro`,this.introT=0,this.introBoom=!1,this.perch.visible=!0,this.perch.position.set(0,this.bird.pos.y-this.bird.radius*.85,0);let e=this.perch.position.y;for(let t of this.poles)t.scale.y=e+3,t.position.y=-e+(e+3)/2;this.ui.showHud(!1),this.ui.introText(`Z z z …`)}else this._beginPlay()}_ctx(e=null){return{camera:this.camera,course:this.course,world:this.world,camS:this.rig.s,color:e,quiet:this._quietFn||=e=>this.threats.burstNear(e,ud.quiet)}}_beginPlay(){this.state===`intro`&&this.bird.syncFromWorld(),this.state=`play`,this.threats.shadowOn=!0;let e=this.scriptOpts&&this.scriptOpts.seed!==void 0?this.scriptOpts.seed>>>0:Math.floor(Math.random()*2147483647)+1;this.runSeed=e;let t=this.director.begin(this.bird.s,this.world,e,this.bird.w);this.stageDur=this.director.duration,this.threats.loadPlan(t,this.t,this.bird),this.music.setAccents(t.waves.filter(e=>e.eggs.length).map(e=>e.tq)),this.food.addPlanFood&&this.food.addPlanFood(this.course,t,this.bird,this.threats),this.planInfo={seed:e,ms:+t.ms.toFixed(1),waves:t.waves.length,fails:t.log.fails},typeof console<`u`&&console.info(`[bvf seed]`,JSON.stringify({bird:this.bird.spec.id,...this.planInfo})),this.ui.introText(``),this.ui.showHud(!0),this.ui.banner(`STAGE ${this.stage.id}`,`${this.stage.name} · 약 ${Math.round(this.stageDur)}초 · 범위 원이 뜨면 1초 뒤 쾅! 원 밖으로 · 가운데 구멍으로`),this.rig.reset(this.bird),this.stats.elapsed=0,this.realPlay=0,this.music.start(()=>this.stats.elapsed,e=>this.director.sectionAt(e).level),this.ui.hint(`점선 원 = 불꽃이 터질 범위(그 안은 모두 위험) · 원 밖으로 / 가운데 구멍으로 · 하얀 작은 고리 = 내 새가 지날 자리`);let n=ud.opening;for(let e=0;e<n.count;e++){let t=n.start+e/Math.max(1,n.count-1)*n.window+Math.random()*.15;this.fw.spawnDecorBand(ud.bands[e%3],this.t,this._ctx(),{flight:Math.min(t,ud.rise[1]),delay:Math.max(0,t-ud.rise[1])})}}stageClear(){let e=this.stage,t={id:e.id,seed:this.runSeed,nearMiss:this.stats.nearMiss,perfect:this.stats.perfect,graze:this.stats.graze,maxChain:this.stats.maxChain,bonus:Math.round(this.stats.bonus),hits:this.stats.hits,hpEnd:Math.max(0,this.bird.hp)};t.score=Jg(e.id,t),this.run.records[this.run.stageIndex]=t,this.run.totalTime+=this.stageDur||e.duration;let n=this.run.stageIndex>=fd-1,r=this.bird.maxHp,i=this.bird.hp,a=Math.min(r,i+r*td);this.run.nextHp=a,this._logPerf(),this.state=`interlude`,this.music.stop(),this.ui.hint(``),this.ui.setEdges([]),this.ui.showHud(!1),this.ui.clearPops&&this.ui.clearPops(),this.ui.setBorder(0),this.threats.shadowOn=!1,this.threats.reset(),this.food.reset(),this.sound.cheer(.7,2.2),this.cruiser.s=this.bird.s,this.cruiser.u=this.bird.u,this.cruiser.v=this.bird.v,this.ui.showInterlude({stage:e,rec:t,hpBefore:i,hpAfter:a,maxHp:r,next:dd[this.run.stageIndex+1],total:this.runTotal(),isLast:n})}runTotal(){return this.run?this.run.records.reduce((e,t)=>e+(t?t.score:0),0):0}nextFromInterlude(){this.run.stageIndex>=fd-1?this.enterVictory():this.startStage(this.run.stageIndex+1,this.run.nextHp,!1)}startFall(){this.state=`falling`,this.music.stop(),this.ui.hint(``),this.ui.setEdges([]),this.timeScale=1,this.slowT=-1,this.hitStopT=0,this.threats.shadowOn=!1,this.fallT=0,this.fallVy=3,this.fallVx=this.bird.vx*.3,this._logPerf(),this.ui.showHud(!1),this.crowd.setMaxCheer(1),this.crowd.birdHit(this.t),this.ui.wow(),this.sound.cheer(1,3.2)}enterEnding(){this.state=`ending`,this.threats.reset(),this.food.reset(),this.crowd.setMaxCheer(0),this.sound.setMurmur(0);let e=this.run.totalTime+this.stats.elapsed,t=md[Math.floor(Math.random()*md.length)].replace(`{time}`,Ed(e));this.chicken.rotation.y=0,this.ui.showEnding({joke:t,fact:hd,stage:this.stage,time:e,hits:this.run.records.reduce((e,t)=>e+(t?t.hits:0),0)+this.stats.hits,score:this.runTotal()+Math.round(this.stats.bonus)})}retryStage(){this.run.continues++,this.startStage(this.run.stageIndex,this.run.stageStartHp,!1)}enterVictory(){this.state=`victory`,this.ui.showHud(!1),this.sound.cheer(.9,3),this.ui.showVictory({line:gd,fact:hd,total:this.runTotal(),records:this.run.records,continues:this.run.continues,bird:this.run.bird,time:this.run.totalTime})}async register(e){if(!this.run||this.run.registered)return;let t=jg(e);if(!t.ok){this.ui.setRegisterMessage(t.reason);return}let n=await this.store.submit({name:t.name,norm:t.norm,score:this.runTotal(),bird:this.run.bird,continues:this.run.continues,ver:6,stages:this.run.records.map(e=>({id:e.id,score:e.score,nearMiss:e.nearMiss,hits:e.hits,hpEnd:Math.ceil(e.hpEnd)}))});if(!n.ok){this.ui.setRegisterMessage(n.reason||`저장하지 못했어요.`);return}this.run.registered=!0,this.myEntryId=n.id,this.rankTab=this.run.continues===0?`clean`:`all`,this.showRanking(`victory`)}async showRanking(e){this.rankFrom=e;let t=[];try{t=await this.store.list()}catch{t=[]}let n=Ng(t,this.rankTab).slice(0,rd.show);this.ui.showRanking({entries:n,tab:this.rankTab,highlightId:this.myEntryId,from:e})}onAction(e,t){let n=this.sound;switch(e){case`start`:n.start(),n.setMuted(!this.settings.sound),this.enterSelect();break;case`ranking`:this.showRanking(this.state===`victory`?`victory`:`title`);break;case`tab`:this.rankTab=t.tab===`all`?`all`:`clean`,this.showRanking(this.rankFrom);break;case`back`:this.enterTitle();break;case`pick`:Iu[t.bird]&&this._select(t.bird);break;case`locked`:this.ui.toast(`준비 중인 스테이지예요. 지금은 STAGE 1 만 열려 있어요.`);break;case`fly`:n.start(),this.startRun();break;case`next`:this.nextFromInterlude();break;case`retry`:this.retryStage();break;case`restart`:this.enterSelect();break;case`resume`:this.setPaused(!1);break;case`quit`:this.setPaused(!1),this.enterTitle();break;case`register`:this.register(t.name);break;case`opt`:this.setOption(t.key,t.value);break;case`gpu-copy`:{let e=`chrome://settings/system`,t=()=>this.ui.toast(`주소를 복사했어요. 크롬 주소창에 붙여넣으세요.`);try{navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(e).then(t,()=>this.ui.toast(e)):this.ui.toast(e)}catch{this.ui.toast(e)}break}case`gpu-close`:try{sessionStorage.setItem(Kg,`1`)}catch{}this.ui.hideGpuNotice()}}_select(e){this.selected=e,this.bird.setSpecies(e),this.bird.reset(Iu[e].hp,this.cruiser.v,this.cruiser.s),this.ui.showSelect({selected:e})}setOption(e,t){e in this.settings&&(this.settings[e]=!!t,Bg(),e===`sound`&&this.sound.setMuted(!t),e===`lowSpec`&&(this._applyLowSpec(),this.renderer&&this.renderer.resize()))}setPaused(e){e!==this.paused&&(this.paused=e,e?this.sound.suspend():this.sound.resume(),this.ui.showPause(e,this.settings))}get pausable(){return this.state===`play`||this.state===`intro`||this.state===`falling`}onHidden(){this.pausable&&this.setPaused(!0)}frame(e,t){let n=this.input;if(this.real=t,this._countFps(e),n.consume(`KeyM`)){let e=!this.settings.sound;this.setOption(`sound`,e);let t=typeof document<`u`?document.querySelector(`input[data-opt="sound"]`):null;t&&(t.checked=e),this.ui.toast(e?`소리 켬`:`소리 끔`)}this.pausable&&n.consume(`Escape`,`KeyP`)&&this.setPaused(!this.paused),!this.paused&&!this.devFreeze&&this._tick(Math.min(e,id.maxDt)),this.border=Math.max(0,this.border-e*1.6),this.ui.setBorder(this.border),this.render(),n.endFrame()}_tick(e){this.popClock+=e;let t=this._scaleStep(e);this.timeScale=t,this.state===`play`&&(this.realPlay+=e),this._step(e*t,e)}_scaleStep(e){if(this.state!==`play`)return 1;if(this.hitStopT>0)return this.hitStopT-=e,0;if(this.slowT>=0){let t=Xu.slowmo,n=this.slowT;return this.slowT+=e,n>=t.inT+t.holdT+t.outT-1e-9?(this.slowT=-1,this.measureOn&&this._ev(`slowEnd`,null,{}),1):n<t.inT?1+(t.scale-1)*(n/t.inT):n<t.inT+t.holdT?t.scale:t.scale+(1-t.scale)*((n-t.inT-t.holdT)/t.outT)}return 1}_realUntil(e){if(e<=0)return 0;let t=Math.max(0,this.hitStopT),n=0,r=this.slowT,i=Xu.slowmo,a=i.inT+i.holdT+i.outT,o=.002;for(;r>=0&&r<a&&n<e;){let e=r<i.inT?1+(i.scale-1)*(r/i.inT):r<i.inT+i.holdT?i.scale:i.scale+(1-i.scale)*((r-i.inT-i.holdT)/i.outT);n+=e*o,t+=o,r+=o}return n<e&&(t+=e-n),t}_step(e,t=e){if(this.t+=e,this.update(e,t),this.lights.update(this.t),this.bird.setRim(this.lights.sampleAt(this.bird.pos,this._rim).multiplyScalar(.5).add(Wg)),this._rimFx&&this._rimFx.t>0){let t=this._rimFx,n=t.t/qu.fx.rim.t*qu.fx.rim.gain;this._rim.r+=t.c[0]*n,this._rim.g+=t.c[1]*n,this._rim.b+=t.c[2]*n,this.bird.setRim(this._rim),t.t-=e}}devAdvance(e,t=1/60){}_countFps(e){if(this._fpsAcc+=e,this._fpsN++,this._fpsAcc>=.5){if(this.fps=Math.round(this._fpsN/this._fpsAcc),this._fpsAcc=0,this._fpsN=0,this.ui.setFps(this.fps),this.state===`play`){let e=this.metrics.perf.fps;e[0]=Math.min(e[0],this.fps),e[1]=Math.max(e[1],this.fps)}this.state===`play`&&!this.settings.lowSpec&&this.fps<id.lowFpsThreshold?(this._lowFpsT+=.5,this._lowFpsT>=id.lowFpsSeconds&&!this._lowFpsTold&&(this._lowFpsTold=!0,this.ui.notice(`화면이 버벅이면 Esc 로 멈춘 뒤 「저사양 모드」를 켜 보세요.`),setTimeout(()=>this.ui.notice(``),6e3))):this._lowFpsT=0}}update(e,t=e){let n=this.input;switch(this.state){case`title`:case`interlude`:case`victory`:this._cruise(e,!1),this.state===`title`&&n.consume(`Enter`)&&this.onAction(`start`,{}),this.state===`interlude`&&n.consume(`Enter`,`NumpadEnter`)&&this.nextFromInterlude();break;case`select`:this._cruise(e,!0),n.consume(`ArrowLeft`,`KeyA`)&&this._select(Lu[(Lu.indexOf(this.selected)+2)%3]),n.consume(`ArrowRight`,`KeyD`)&&this._select(Lu[(Lu.indexOf(this.selected)+1)%3]),n.consume(`Enter`,`NumpadEnter`,`Space`)&&this.onAction(`fly`,{});break;case`intro`:this._intro(e);break;case`play`:this._play(e,t);break;case`falling`:this._fall(e);break;case`ending`:this._endingAnim(e)}}_cruise(e,t){let n=this.cruiser;for(n.s+=n.forward*e,n.v=this.course.center(n.s)+4,n.s>this.course.sMax-200&&(n.s=0),this.course.toWorld(n.s,n.u,n.v,n.pos),this.decorAcc=(this.decorAcc||0)+e*(this.state===`victory`?ud.victoryRate:ud.titleRate);this.decorAcc>=1;)--this.decorAcc,this.fw.spawnDecorBand(ud.bands[Math.floor(Math.random()*3)],this.t,this._ctx());if(this.fw.update(e,this.t),this.world.update(n.s,this.camera,this.t,e),this.crowd.update(this.t,this.camera),t){let t=this.bird;t.s=n.s,t.u=n.u,t.v=n.v,t.place(),t.vx=0,t.vy=0,t.animate(e),this.selectAngle+=e*.35;let r=2.2+t.radius*3,i=Math.sin(this.selectAngle*.8)*1.05,a=this.course.at(n.s,{}),o=Math.sin(a.th),s=-Math.cos(a.th),c=Math.cos(a.th),l=Math.sin(a.th),u=n.pos.y-.25*r;this.camera.position.set(n.pos.x+(c*Math.sin(i)-o*Math.cos(i))*r,u,n.pos.z+(l*Math.sin(i)-s*Math.cos(i))*r),this.camera.up.set(0,1,0),this.camera.lookAt(n.pos.x,u+.05*r,n.pos.z),this.camera.fov!==Z.fov&&(this.camera.fov=Z.fov,this.camera.updateProjectionMatrix())}else this.bird.group.visible=this.state===`interlude`||this.state===`victory`,this.bird.group.visible&&(this.bird.s=n.s,this.bird.u=n.u,this.bird.v=n.v,this.bird.place(),this.bird.animate(e)),this.rig.update(e,n,!0)}_introDecor(e){this.decorAcc=(this.decorAcc||0)+e*ud.introRate;let t=this.bird;for(;this.decorAcc>=1;){--this.decorAcc,this._introFlip=!this._introFlip;let e=this.camera;this._introFlip&&(e=this.aheadCam,e.position.set(t.pos.x,t.pos.y+2,t.pos.z+Z.distance),e.lookAt(t.pos.x,t.pos.y,t.pos.z-100),e.updateMatrixWorld()),this.fw.spawnDecorBand(ud.bands[Math.floor(Math.random()*3)],this.t,{camera:e,course:this.course,world:this.world,camS:0})}}_intro(e){let t=this.bird;this.introT+=e;let n=this.introT,r=Qu.sleep,i=Qu.sleep+Qu.startle,a=i+Qu.rise;if(this.input.consume(`Enter`,`NumpadEnter`,`Space`)){this.perch.visible=!1,t.model.head.rotation.x=0,this.ui.introText(``),this._beginPlay();return}if(!this.introBoom){this.introBoom=!0;let n=new G(t.pos.x-30,t.pos.y+8,t.pos.z+16);this.fw._schedule(`chrysanthemum`,cd.chrysanthemum,n,this.t+r-e,[.9,.5,1.3],this.world,{launchPos:new G(t.pos.x-36,.6,t.pos.z+22),flight:1.6})}let o=t.radius*2.3,s=new G;if(n<r)yg(t.model,0,1,.35,0),t.model.head.rotation.x=.5+Math.sin(n*2)*.05,s.set(t.pos.x+2.6*o,t.pos.y+.5*o,t.pos.z-2.2*o);else if(n<i){this.ui.introEl&&this.ui.introEl.textContent!==`!!`&&this.ui.introText(`!!`),t.model.head.rotation.x=-.3;let i=(n-r)/Qu.startle;t.phase+=30*e,yg(t.model,t.phase,Math.max(0,1-i*3),-.2,0),t.pos.y=this.perch.position.y+t.radius*.85+Math.sin(Math.min(1,i)*Math.PI)*.6*o,s.set(t.pos.x+2.6*o,t.pos.y+.5*o,t.pos.z-2.2*o)}else{this.ui.introText(``),t.model.head.rotation.x=0;let r=Math.min(1,(n-i)/Qu.rise);t.pos.z-=t.forward*e*r,t.pos.y+=2.2*e,t.animate(e,1.4);let a=new G(t.pos.x+2.6*o,t.pos.y+.5*o,t.pos.z-2.2*o),c=this.rig._target({s:-t.pos.z,u:t.pos.x,v:t.pos.y,radius:t.radius}),l=this.course.toWorld(c.s,c.u,c.v,new G),u=r*r*(3-2*r);s.lerpVectors(a,l,u)}this.camera.position.lerp(s,1-Math.exp(-6*e)),n<.05&&this.camera.position.copy(s);let c=new G(t.pos.x,t.pos.y,t.pos.z);if(n>i){let e=Math.min(1,(n-i)/Qu.rise),r=new G(this.camera.position.x,this.camera.position.y-Z.pitchDrop,t.pos.z-Z.lookAhead+Z.distance);c.lerp(r,e*e*(3-2*e))}this.camera.up.set(0,1,0),this.camera.lookAt(c),this.camera.fov!==Z.fov&&(this.camera.fov=Z.fov,this.camera.updateProjectionMatrix()),this._introDecor(e),this.fw.update(e,this.t),this.world.update(-t.pos.z,this.camera,this.t,e),this.crowd.update(this.t,this.camera),n>=a&&(this.perch.visible=!1,this._beginPlay())}_play(e,t=e){let n=this.bird,r=this.stage,i=this.input,a=i.axis();i.consume(`Space`)&&(n.tryRoll(a,this.t-e)?(this.stats.rolls++,this.rig.fovKick(Yu.fovKick),this.sound.whoosh(.5,a.x*.6),this.measureOn&&this._ev(`roll`,null,{e:this.stats.elapsed,left:n.rolls})):n.rollEmpty&&(n.rollEmpty=!1,this.stats.rollEmpty=(this.stats.rollEmpty||0)+1,this.sound.ready&&this.sound.thud&&this.sound.thud(),this.ui.rollShake(),this.measureOn&&this._ev(`rollEmpty`,null,{e:this.stats.elapsed})));let o=this._zoneOf(n.s);if(o&&o.rest&&this._restZone!==o.id){this._restZone=o.id;let e=n.gainRoll(Yu.restRefill);e&&(this.ui.rollGain(),this.sound.ready&&this.sound.rollGain&&this.sound.rollGain(),this.ui.pop(`롤 +${e} (${n.rolls}/${Yu.max})`,`roll`),this._pickFx(`roll`)),this.measureOn&&this._ev(`rollRefill`,null,{e:this.stats.elapsed,got:e,zone:o.id})}let s=this.course.section(n.s,this._sec||={});n.foldTarget=+!!this.threats.foldWanted(n),n.steer(e,a,s),this.stats.elapsed+=e;let c=this.stats.elapsed,l=this.director.sectionAt(c),u=l.name===`finale`||n.s>Vu.zones.find(e=>e.id===`finale`).s[0]-30;this.rig.finale+=(+!!u-this.rig.finale)*Math.min(1,e/1.5),this.stats.phase=this.director.update(e,{threats:this.threats,bird:n,now:this.t,elapsed:c,spawnDecor:(e,t)=>this.fw.spawnDecorBand(ud.bands[e],this.t,this._ctx(t))}),this.music.update(this._aheadFn||=e=>this._realUntil(e)),this.sound.ready&&this.sound.settle(!1),this._hints(l,c),this.fw.update(e,this.t),this.world.calm=this._judgingNow(),this.world.update(n.s,this.camera,this.t,e),this.crowd.update(this.t,this.camera),this.rig.update(e,n,this.settings.reduceMotion,t),this.camera.updateMatrixWorld();let d=this._events||=[];d.length=0,this.threats.update(e,this.t,n,d,this.camera.position,this.camera);for(let e of d)this._threatEvent(e);let f=this._fev||=[];f.length=0,this.food.update(e,this.t,n,n.spec.id,f,this.camera);for(let e of f)this._eat(e);this._popFollow(),this._gateSounds(),this._feelFx(e,t),this.sound.ready&&this.sound.setListener(this.camera),this._edges(),this.measureOn&&this._measure(e,t);let p=this._mult(),m=this.stageDur;if(this.ui.updateHud({stage:{...r,duration:m},elapsed:c,phase:this.stats.phase,section:l.name,score:this.runTotal()+Math.round(this.stats.bonus),combo:this.stats.chain,mult:p,perfect:this.stats.perfect,graze:this.stats.graze,hits:this.stats.hits,center:this.stats.center,timing:this.stats.timing,food:this.stats.food,hpFood:this.stats.hpFood||0,rollFood:this.stats.rollFood||0,hp:n.hp,maxHp:n.maxHp,birdName:n.spec.name,god:this.god,rolling:n.rolling,rollCd:n.rollCD,rollFrac:n.rolling?0:1-n.rollCD/n.rollCooldown,rolls:n.rolls,rollMax:Yu.max}),n.hp<=0){n.hp=0,this.startFall();return}n.s>=Vu.length&&this.stageClear()}_zoneOf(e){for(let t of Vu.zones)if(e>=t.s[0]&&e<t.s[1])return t;return null}_hints(e,t){this.hintBar<1&&t>6.5&&(this.hintBar=1,this.ui.hint(``)),this.hintBar<2&&e.rest&&e.name===`turn1`&&(this.hintBar=2,this.ui.hint(`선회 중에는 쉬는 시간 · 낮게 날며 하루살이를 먹어 보세요`)),this.hintBar<3&&e.name===`avenue`&&(this.hintBar=3,this.ui.hint(``))}_mult(){let e=1;for(let[t,n]of ed.comboMult)this.stats.chain>=t&&(e=n);return+(e*(1+(this.stats.centerMult||0))).toFixed(2)}_ev(e,t,n={}){this.evlog.push({type:e,t:this.t,e:this.stats?this.stats.elapsed:0,real:this.realPlay,id:t?t.id:0,kind:t?t.kind:``,...n})}_gateSounds(){let e=this.stats.elapsed,t=0;for(let e of this.threats.list){if(e.whistle&&e.launched&&!e.opened){let t=Math.max(0,Math.min(1,(this.t-e.tLaunch)/Math.max(.05,e.tOpen-e.tLaunch)));e.whistle.update(e.headW,t,e.tOpen-this.t)}if(e.burst&&e.ev&&!e.ev.res){let n=e.Cw.distanceTo(this.bird.pos)-e.R0;t=Math.max(t,Math.max(0,1-Math.max(0,n)/22))}}let n=-99;for(let t of this.threats.events){if(!t.shells||!t.shells.length)continue;if(!t.banged&&e>=t.tqE-Ug*Math.max(.05,this.timeScale)){t.banged=!0;let n=t.shells[0];this.sound.ready&&this.sound.bang&&this.sound.bang(this.music.audioTimeOf(t.tqE,this._aheadFn),n.Cw,t.id,t.shells.length>1?1.15:1),this.measureOn&&this._ev(`bangSched`,null,{tq:t.tqE,id:t.id,at:e})}let r=Gu.ticks;t.ticks=t.ticks||Array(r.length).fill(!1);for(let i=0;i<r.length;i++){if(t.ticks[i])continue;let a=t.tqE-r[i];if(a<=n+.02){t.ticks[i]=!0;continue}if(e>=a-Ug*Math.max(.05,this.timeScale)){if(t.ticks[i]=!0,this.sound.ready){let e=t.shells[0].eggW||t.shells[0].Cw;this.sound.tickAt?this.sound.tickAt(this.music.audioTimeOf(a,this._aheadFn),e,i===r.length-1,t.id):this.sound.tick(this.music.audioTimeOf(a,this._aheadFn),t.id)}this.measureOn&&this._ev(`tick`,null,{tb:a,tq:t.tqE,id:t.id})}}n=t.tqE}this.sound.ready&&this.sound.approach(t*.6)}_eat(e){let t=this.stats,n=this.bird,r=e.item;t.food++;let i,a;if(r.type===`hp`){t.hpFood=(t.hpFood||0)+1;let e=qu.hp;if(n.hp>=n.maxHp-1e-6)t.bonus+=e.fullPts,i=`HP 가득 +${e.fullPts}점`,a=`gold`,this.ui.scoreFly(e.fullPts,`hp`),this.sound.ready&&this.sound.coin&&this.sound.coin();else{let r=n.hp,o=Math.max(e.healMin,Math.round(n.maxHp*e.heal));n.hp=Math.min(n.maxHp,n.hp+o);let s=Math.round(n.hp-r);t.healed+=n.hp-r,i=s<o?`HP +${s} · 가득`:`HP +${s}`,a=`hp`,this.ui.hpFlash(r,n.hp,n.maxHp),this.sound.ready&&this.sound.heal&&this.sound.heal()}}else t.rollFood=(t.rollFood||0)+1,n.gainRoll(1)?(i=`롤 +1 (${n.rolls}/${Yu.max})`,a=`roll`,this.ui.rollGain(),this.sound.ready&&this.sound.rollGain&&this.sound.rollGain()):(t.bonus+=qu.roll.fullPts,i=`롤 가득 → +${qu.roll.fullPts}점`,a=`gold`,this.ui.scoreFly(qu.roll.fullPts,`roll`),this.sound.ready&&this.sound.coin&&this.sound.coin());this.ui.pop(i,a),this._pickFx(a),this.measureOn&&this._ev(`eat`,null,{ft:r.type,rolls:n.rolls,hp:Math.round(n.hp),text:i,kind:a,judging:this._judgingNow()})}_pickFx(e){let t=qu.fx,n=e===`hp`?0:e===`roll`?1:2,r=t.col[e]||t.col.gold;this.food.ringFx(n);let i=this.bird,a=t.sparks,o=this.fw.sparks;for(let e=0;e<a.n;e++){let e=Math.random()*Math.PI*2,t=Math.random()*a.side,n=a.up[0]+Math.random()*(a.up[1]-a.up[0]);o.emit(i.pos.x,i.pos.y,i.pos.z,Math.cos(e)*t,n,Math.sin(e)*t,a.life*(.8+Math.random()*.4),a.size,a.size*.4,r[0]*a.hdr,r[1]*a.hdr,r[2]*a.hdr,r[0]*.4,r[1]*.4,r[2]*.4,1,2,3,Gg,1)}this._rimFx={t:t.rim.t,c:r}}_judgingNow(){for(let e of this.threats.list)if(Rh.judging(e,this.t))return!0;return!1}_popFollow(){if(!this.ui.updatePops||!this.ui.pops||!this.ui.pops.length)return;let e=this._popV||=new G;e.copy(this.bird.pos).project(this.camera);let t=typeof window<`u`?window.innerWidth:1920,n=typeof window<`u`?window.innerHeight:1080;this.ui.updatePops((e.x+1)/2*t,(1-e.y)/2*n,this._judgingNow())}_feelFx(e,t){let n=this.bird,r=this.fw.sparks,i=this.course.at(n.s,this._at2||={}),a=Math.cos(i.th),o=Math.sin(i.th),s=Math.sin(i.th),c=-Math.cos(i.th),l=this.stats.chain;if(l>0&&e>0){let e=Math.min(Xu.trail.max,l*Xu.trail.perCombo)+.05,t=n.radius*1.35,i=Math.cos(n.roll+(n.spin||0)),s=Math.sin(n.roll+(n.spin||0));for(let c of[-1,1]){let l=c*t*i,u=c*t*s*-1;r.emit(n.pos.x+a*l,n.pos.y+u,n.pos.z+o*l,(Math.random()-.5)*.4,(Math.random()-.5)*.4,(Math.random()-.5)*.4,e,.16,.04,.5,1.7,2.2,.15,.6,1,.9,.5,0,Gg)}}if(e>0&&Math.random()<.9){let e=n.s+8+Math.random()*14,t=n.u+(Math.random()<.5?-1:1)*(2.5+Math.random()*6),i=n.v+(Math.random()-.5)*9,a=this.course.toWorld(e,t,i,this._v3||=new G);r.emit(a.x,a.y,a.z,-s*9,0,-c*9,.7,.05,.03,.55,.62,.8,.3,.35,.5,.3,0,0,0,3.5)}n.smokeT>0&&(n.smokeT-=e,Math.random()<.8&&this.fw.smoke.emit(n.pos.x,n.pos.y,n.pos.z,(Math.random()-.5)*.5,.3,(Math.random()-.5)*.5,1.4,.4*n.radius*2,2.2*n.radius*2,.16,.14,.13,.05,.05,.05,.5,.6,-.3,0)),(n.heavy||n.scorchLevel>0)&&this.realPlay-n.lastHitReal>Xu.heavyRecover&&(n.lastHitReal=this.realPlay,n.heavy=!1,n.scorchLevel=Math.max(0,n.scorchLevel-1),n.setScorch(n.scorchLevel))}_edges(){let e=this.camera,t=this._edgeList||=[];t.length=0;let n=this._pe||=new G,r=e.matrixWorldInverse.elements;for(let i of this.threats.list){if(!i.launched||this.t>i.tMeet||i.res)continue;let a=i.burst?i.Cw:i.headW,o=r[2]*a.x+r[6]*a.y+r[10]*a.z+r[14];n.copy(a).project(e);let s=n.x,c=n.y;if(o>0&&(s=-s,c=-c),o<0&&Math.abs(s)<=.98&&Math.abs(c)<=.98)continue;let l=Math.max(0,Math.min(1,(this.t-i.tLaunch)/Math.max(.1,i.tBurst-i.tLaunch))),u=Math.max(Math.abs(s),Math.abs(c),.001);t.push({x:s/u,y:c/u,color:i.color,a:.35+.65*l,id:i.id}),this.measureOn&&!i.edgeLogged&&(i.edgeLogged=!0,this._ev(`edge`,i,{dt:this.t-i.tLaunch}))}this.ui.setEdges(t)}_camAt(e,t=this.bird.v){let n=this.bird;return this.rig._target({s:e,u:n.u,v:t,radius:n.radius})}_threatEvent(e){let t=this.bird,n=e.threat||null,r=e.ev||(n?n.ev:null);switch(this.measureOn&&this._ev(e.kind,null,{id:r?r.id:n?n.id:0,et:r?r.type:``,sk:n?n.kind:``,meetE:r?r.meetE:0,lead:e.lead,how:e.how,clear:e.clear,gap:e.gap,L:e.L,R:e.R,vis:e.vis,r:e.r,inv:t.invuln}),e.kind){case`launch`:if(n.ev&&n.ev.shells[0]!==n)return;this.director.onThreatLaunch(this.t),this.sound.ready&&(n.whistle=this.sound.launch(Y[n.kind],n.Lw,n.id));return;case`open`:n.whistle&&=(n.whistle.end(),null),this.sound.ready&&this.sound.chute&&n.ev&&n.ev.shells[0]===n&&this.sound.chute(n.eggW,n.id);return;case`burst`:if(n.whistle&&=(n.whistle.end(),null),this.measureOn&&this._eggVisEnd(n),n.ev&&n.ev.shells[0]!==n)return;this._onThreatBurst(n);return;case`fade`:this.sound.ready&&n.ev&&n.ev.shells[0]===n&&this.sound.crackle(0,n.Cw,10,1.4);return;case`swish`:{if(!this.sound.ready)return;let t=Math.min(3,e.L),n=Math.min(3,e.R);for(let e=0;e<t;e++)setTimeout(()=>this.sound.whoosh(.32,-.85),e*45);for(let e=0;e<n;e++)setTimeout(()=>this.sound.whoosh(.32,.85),20+e*45);return}case`perfect`:{let e=ed.perfect*this._mult();if(this.stats.bonus+=e,this.stats.perfect++,this.stats.nearMiss++,this.stats.chain++,this.stats.maxChain=Math.max(this.stats.maxChain,this.stats.chain),this.ui.judge(`롤 관통 퍼펙트! +${Math.round(e)}`,`perfect`),this.ui.pulse(Xu.vignette),this.sound.ready){this.sound.chime(this.stats.chain-1,this.music.audioTimeOf(this.music.nextSixteenth(),this._aheadFn)),this.sound.muffle(.2,700),setTimeout(()=>this.sound.whoosh(1),200);let e=Math.ceil(this.stats.elapsed/Bu.eighth+1e-6)*Bu.eighth;this.sound.cheer(Math.min(1.2,.3+this.stats.chain*.08),1.6,this.music.audioTimeOf(e,this._aheadFn))}this._trailBurst();let t=this.director.sectionAt(this.stats.elapsed);!this.settings.reduceMotion&&!t.noSlowmo&&this.realPlay-this.lastSlow>=Xu.slowmo.cooldown&&this.slowT<0&&(this.slowT=0,this.lastSlow=this.realPlay,this.music.rewind(),this.measureOn&&this._ev(`slowStart`,null,{}));return}case`dodge`:this.ui.judge(`롤 회피`,`dodge`);return;case`graze`:{let e=ed.graze*this._mult();if(this.stats.bonus+=e,this.stats.graze++,this.stats.nearMiss++,this.stats.chain++,this.stats.maxChain=Math.max(this.stats.maxChain,this.stats.chain),this.ui.judge(`스침 +${Math.round(e)}`,`graze`),this.sound.ready){this.sound.whoosh(.9);let e=Math.ceil(this.stats.elapsed/Bu.eighth+1e-6)*Bu.eighth;this.stats.chain>=3&&this.sound.cheer(Math.min(1,.2+this.stats.chain*.06),1.2,this.music.audioTimeOf(e,this._aheadFn))}this._trailBurst(.5);return}case`center`:case`gap`:{let t=e.kind===`gap`,n=t?Y.gapBonus:Y.centerBonus;this.stats.centerMult=+(this.stats.centerMult+n).toFixed(2);let r=(t?ed.gap:ed.center)*this._mult();this.stats.bonus+=r,t?this.stats.gap=(this.stats.gap||0)+1:this.stats.center++,this.stats.chain++,this.stats.maxChain=Math.max(this.stats.maxChain,this.stats.chain),this.ui.judge(`${t?`틈새 통과`:`센터`}! +${Math.round(r)} · 배율 +${n}`,`perfect`),this.sound.ready&&this.sound.chime(Math.min(14,this.stats.center+(this.stats.gap||0)-1),this.music.audioTimeOf(this.music.nextSixteenth(),this._aheadFn)),this._trailBurst(t?.8:.6);return}case`timing`:{this.stats.centerMult=+(this.stats.centerMult+Y.centerBonus).toFixed(2);let e=ed.timing*this._mult();this.stats.bonus+=e,this.stats.timing=(this.stats.timing||0)+1,this.ui.judge(`타이밍 퍼펙트! +${Math.round(e)}`,`perfect`),this.sound.ready&&this.sound.chime(Math.min(14,this.stats.timing-1),this.music.audioTimeOf(this.music.nextSixteenth(),this._aheadFn)),this._trailBurst(.5);return}case`pass`:{let e=ed.pass*this._mult();this.stats.bonus+=e,this.stats.pass=(this.stats.pass||0)+1,this.stats.chain++,this.stats.maxChain=Math.max(this.stats.maxChain,this.stats.chain),this.ui.judge(`통과 +${Math.round(e)}`,`dodge`);return}case`hit`:if(t.invuln>0||this.god)return;this._damage(e.dmg*t.damageMult,`burst`);return}}_trailBurst(e=1){let t=this.bird,n=this.fw.sparks,r=Math.round(26*e);for(let e=0;e<r;e++){let e=Math.random()*Math.PI*2,r=2+Math.random()*5;n.emit(t.pos.x,t.pos.y,t.pos.z,Math.cos(e)*r,Math.sin(e)*r,(Math.random()-.5)*3,.35+Math.random()*.3,.18,.04,.6,1.8,2.3,.1,.5,.9,1,3,0,Gg,2)}}_collide(){let e=this.bird,t=this.course;for(let n of t.colliders){if(n.s1<e.s-2||n.s0>e.s+2||op(n,e.s,e.u,e.v)>=e.radius)continue;let r=e.radius+Ru.bounceGap,i=t.section(e.s,{}),a=[[e.u,n.v0-r],[e.u,n.v1+r],[n.u0-r,e.v],[n.u1+r,e.v]],o=(t,n)=>Math.abs(t)<=i.u-e.radius&&n>=i.v0+e.radius-.01&&n<=i.v1-e.radius,s=(r,i)=>!t.colliders.some(t=>t!==n&&(op(t,e.s,r,i)<e.radius+.1||op(t,e.s+e.forward*.4,r,i)<e.radius+.1)),c=a.filter(([e,t])=>o(e,t)&&s(e,t));c.length||(c=a.filter(([e,t])=>o(e,t))),c.length||(c=a),c.sort((t,n)=>Math.hypot(t[0]-e.u,t[1]-e.v)-Math.hypot(n[0]-e.u,n[1]-e.v));let[l,u]=c[0],d=l-e.u,f=u-e.v;e.u=l,e.v=u;let p=Math.hypot(d,f)||1;e.vx=d/p*3,e.vy=f/p*3,e.place(),this.metrics.bounces++,this.metrics.lastBounce=this.t,this.stats.obstacleHits++,this.rig.snap(e),this.rig.shake(.8),e.obsInvuln<=0&&!this.god&&(e.hp-=Ru.obstacle*e.damageMult,this.stats.hits++,this.stats.chain=0,this.border=Math.min(1,this.border+.5),this.sound.hit(),this.ui.judge(`쿵! -${Math.round(Ru.obstacle*e.damageMult)}`,`hit`)),e.obsInvuln=Ru.obstacleInvuln,e.invuln=Math.max(e.invuln,Ru.obstacleInvuln);break}}_damage(e,t){let n=this.bird;n.hp-=e,n.invuln=Ru.invulnTime,this.stats.hits++,this.stats.chain=0,this.stats.centerMult=0,this.border=Math.min(1,this.border+.8),this.hitStopT=Xu.hitStop,this.music.rewind(),this.measureOn&&this._ev(`hitStop`,null,{}),this.rig.addTrauma(Xu.trauma.hit);let r=Math.max(0,n.hp/n.maxHp);n.scorchLevel=r>.66?1:r>.33?2:3,n.setScorch(n.scorchLevel),n.smokeT=Xu.smokeTime,n.lastHitReal=this.realPlay,r<Xu.heavyBelow&&(n.heavy=!0);for(let e=0;e<46;e++){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t),i=4+Math.random()*7;this.fw.sparks.emit(n.pos.x,n.pos.y,n.pos.z,Math.cos(e)*r*i,t*i,Math.sin(e)*r*i,.3+Math.random()*.35,.22,.05,2.4,1.1,.3,.8,.15,.03,1,4,2,Gg,1.5)}this.fw.smoke.emit(n.pos.x,n.pos.y,n.pos.z,0,.4,0,1.6,n.radius*2,n.radius*6,.35,.18,.08,.06,.05,.05,.6,.8,-.2,0);let i=new K(n.spec.color);for(let e=0;e<Xu.feathers;e++)this.fw.smoke.emit(n.pos.x,n.pos.y,n.pos.z,(Math.random()-.5)*3,1+Math.random()*2,(Math.random()-.5)*3,1.3,.22,.18,i.r*.6,i.g*.6,i.b*.6,i.r*.3,i.g*.3,i.b*.3,.9,1.5,3.5,0);this.sound.zap(),this.sound.ready&&this.sound.muffle(Bu.bar,500,!0),this.ui.judge(`-${Math.round(e)}`,`hit`),this.crowd.birdHit(this.t),this.ui.wow(),this.sound.cheer(1,2.4)}_onThreatBurst(e){let t=e.Cw,n=t.distanceTo(this.camera.position);this.sound.ready&&(this.sound.crackle(0,t,8,.6),this.sound.sizzle&&this.sound.sizzle(t)),this.rig.fovKick(Y.kick.fov),this.rig.shake(Y.kick.shake),this.measureOn&&this._ev(`boomSched`,null,{id:e.id,dist:n,delay:0}),this.crowd.addBurst(t,this.t),this.metrics.bursts.push({t:this.stats.elapsed,d:n,src:`burst`,type:e.kind});let r=Math.max(0,t.distanceTo(this.bird.pos)-e.R0);r<12&&this.rig.addTrauma(Xu.trauma.near*.5*(1-r/12))}_onLaunch(e){if(!this.sound.ready)return;let t=e.launchPos.distanceTo(this.camera.position);this.sound.whistle(t,e.launchPos)}_pan(e){let t=this.camera,n=this._right||=new G;return n.setFromMatrixColumn(t.matrixWorld,0),Math.max(-1,Math.min(1,((e.x-t.position.x)*n.x+(e.z-t.position.z)*n.z)/30))}_onBurst(e){let t=e.pos.distanceTo(this.camera.position),n=Hg[e.key]||1;this.sound.ready&&(this.sound.boom(n*.8,t,e.pos),(e.key===`willow`||e.key===`finale`)&&this.sound.crackle(t+40,e.pos,14)),this.crowd.addBurst(e.pos,this.t),this.t-this.lastCheer>1.3&&t<160&&this.state!==`ending`&&(this.lastCheer=this.t,this.sound.cheer(.35,1.4));let r=(ad.intensity[e.key]||.6)*ad.decorMult,i=r*Math.max(0,1-t/od.proximity);if(i>.001){let e=this.flashLimiter.request(i,this.real);e<i&&(r*=e/i)}if(this.lights.add(e.pos,e.color,r,(e.visR||10)*ad.radiusMult,this.t),this.state===`play`){if(this.metrics.bursts.push({t:this.stats.elapsed,d:t,src:`decor`,band:e.band}),this.course){let t=this.course.nearest(e.pos.x,e.pos.z,e.clearS??this.bird.s),n=this.course.section(t.s,{}),r=(e.visR||10)*1.05;Math.abs(t.u)<n.u+r&&e.pos.y-r-(e.drop||0)<n.v1&&e.pos.y+r>n.v0&&this.metrics.decorCenterIn++}(this._decorLive||=[]).push({pos:e.pos.clone(),visR:e.visR||10,t0:this.t,life:e.life||2.5})}}_measure(e,t){let n=this.metrics,r=this.bird,i=this.camera,a=this.rig;n.frames++,n.scaleLog.push(this.timeScale),n.scaleLog.length>2e4&&n.scaleLog.shift(),this.sound.ready&&(n.clock.push([this.stats.elapsed,this.sound.ctx.currentTime]),n.clock.length>2e4&&n.clock.shift()),n.trauma=Math.max(n.trauma,a.trauma);let o=this._pv||=new G;n.maxRoll=Math.max(n.maxRoll||0,Math.abs(a.rollDeg)),n.maxSlopePitch=Math.max(n.maxSlopePitch||0,Math.abs(a.pitch)*(180/Math.PI)),i.getWorldDirection(o);let s=Math.asin(Math.max(-1,Math.min(1,o.y)))*(180/Math.PI);n.camPitch=n.camPitch||[99,-99],n.camPitch[0]=Math.min(n.camPitch[0],s),n.camPitch[1]=Math.max(n.camPitch[1],s),n.fov=n.fov||[99,0],n.fov[0]=Math.min(n.fov[0],i.fov),n.fov[1]=Math.max(n.fov[1],i.fov),n.frames%6==0&&(n.rollLog||=[]).push([+this.stats.elapsed.toFixed(2),+a.rollDeg.toFixed(2),+s.toFixed(2),+r.s.toFixed(1)]),o.copy(r.pos).project(i);let c=(o.x+1)/2,l=(1-o.y)/2;n.screen.minX=Math.min(n.screen.minX,c),n.screen.maxX=Math.max(n.screen.maxX,c),n.screen.minY=Math.min(n.screen.minY,l),n.screen.maxY=Math.max(n.screen.maxY,l);let u=this.renderer?this.renderer.canvas.width:1920,d=0,f=i.matrixWorldInverse.elements;for(let e of this.threats.events){if(!e.ready||e.res||!e.shells||!e.shells.length)continue;let t=e.shells[0];if(!t.burst)continue;let r=f[2]*t.Cw.x+f[6]*t.Cw.y+f[10]*t.Cw.z+f[14];o.copy(t.Cw).project(i),r<0&&Math.abs(o.x)<1.1&&Math.abs(o.y)<1.1&&d++,e.m=e.m||{};let a=()=>{let e=Math.max(.5,-r);return 2*t.R0/e*(s/Math.tan(i.fov*Math.PI/360))/u},s=(this.renderer?this.renderer.canvas.height:1080)/2;e.m.s0===void 0&&this.t>=e.meetT-.8&&(e.m.s0=a()),e.m.s1===void 0&&this.t>=e.meetT-.3&&(e.m.s1=a(),(n.events||=[]).push({id:e.id,type:e.type,s:+e.s.toFixed(1),grow:+(e.m.s1/Math.max(1e-6,e.m.s0)).toFixed(2),s0:+e.m.s0.toFixed(3),s1:+e.m.s1.toFixed(3)}))}if(n.maxFood=Math.max(n.maxFood||0,this.food.visible||0),n.maxOnScreen=Math.max(n.maxOnScreen||0,d),n.frames%3==0){let e=this.renderer?this.renderer.canvas.height:1080,t=this.renderer?this.renderer.canvas.width:1920,r=this.threats.coverage(i,t,e);n.cover=n.cover||{max:0,at:0,wave:{},waveMax:0,n:0,over45:0,over55:0,hullMax:0,hullWaveMax:0,hullOver45:0,hullOver55:0},n.cover.hullMax=Math.max(n.cover.hullMax,r.hull),r.hull>.55&&n.cover.hullOver55++;for(let e of r.hullByEv.values())e>n.cover.hullWaveMax&&(n.cover.hullWaveMax=e),e>.45&&n.cover.hullOver45++;n.cover.n++,r.all>n.cover.max&&(n.cover.max=r.all,n.cover.at=+this.stats.elapsed.toFixed(2)),r.all>.55&&n.cover.over55++;for(let[e,t]of r.byEv)t>(n.cover.wave[e]||0)&&(n.cover.wave[e]=+t.toFixed(4)),t>n.cover.waveMax&&(n.cover.waveMax=t),t>.45&&n.cover.over45++}if(this._eggVis(),n.nextVis=n.nextVis||0,this.stats.elapsed>=n.nextVis&&this.world.checkView){n.nextVis=this.stats.elapsed+.5;let e=this.world.checkView(i);n.visChecks=(n.visChecks||0)+1,n.openEndSeen=(n.openEndSeen||0)+e.openEnds,n.emptySeen=(n.emptySeen||0)+e.empty,n.mapEndSeen=(n.mapEndSeen||0)+e.mapEnd,(e.openEnds||e.empty||e.mapEnd)&&(n.visViol||=[]).push({e:+this.stats.elapsed.toFixed(1),s:+r.s.toFixed(0),...e})}}_eggVis(){let e=this.camera,t=this._ev3||=new G,n=e.matrixWorldInverse.elements,r=1080/Math.tan(e.fov*Math.PI/360);for(let i of this.threats.list){if(i.burst||!i.launched)continue;let a=i.opened?i.eggW:i.headW,o=-(n[2]*a.x+n[6]*a.y+n[10]*a.z+n[14]),s=o>.5;s&&=(t.copy(a).project(e),Math.abs(t.x)<=1&&Math.abs(t.y)<=1),s&&=Ku.eggR*Ku.glow*2*r/o>=8,s&&this.world.occ&&i.tBurst-this.t<=3&&Qh.occluded(this.world,e.position,a)&&(i.occl=(i.occl||0)+1),s?((i.visSince===void 0||i.visSince===null)&&(i.visSince=this.t),i.visLast=this.t):i.visSince!==void 0&&i.visSince!==null&&((i.visRuns||=[]).push([i.visSince,i.visLast]),i.visSince=null)}let i=this.threats.omens.stats,a=this.metrics;a.omenStrong=Math.max(a.omenStrong||0,i.strong),a.omenFaint=Math.max(a.omenFaint||0,i.faint)}_eggVisEnd(e){let t=this.metrics,n=(e.visRuns||[]).slice();e.visSince!==void 0&&e.visSince!==null&&n.push([e.visSince,this.t]);let r=0,i=null;for(let[t,a]of n)a<e.tBurst-1||e.tBurst-t>r&&(r=e.tBurst-t,i=e.tBurst-a);(t.eggVis||=[]).push(+r.toFixed(3)),(t.eggVisEnd||=[]).push(i===null?null:+i.toFixed(3)),t.eggOccl=(t.eggOccl||0)+ +!!e.occl,t.eggN=(t.eggN||0)+1}_logPerf(){let e=this.metrics.perf,t={calls:e.calls,tris:e.tris,fps:e.fps,at:new Date().toISOString()};this.perfLog[`S${this.stage.id}`]=t}_fall(e){let t=this.bird;this.fallT+=e,this.fallVy-=$u.gravity*e,t.v=Math.max(.5,t.v+this.fallVy*e),t.u+=this.fallVx*e,t.s+=t.forward*.45*e,t.place(),t.group.rotation.z+=$u.spin*e,t.group.rotation.x+=$u.spin*.3*e,t.invuln=0,t.animate(e,.3);for(let e=0;e<3;e++)this.fw.smoke.emit(t.pos.x,t.pos.y,t.pos.z,(Math.random()-.5)*.6,.4,(Math.random()-.5)*.6,2.4,.6*t.radius*2,3.5,.13,.12,.12,.05,.05,.05,.55,.6,-.3,0);this.fw.update(e,this.t),this.threats.update(e,this.t,null,[],this.camera.position,this.camera),this.world.update(t.s,this.camera,this.t,e),this.crowd.update(this.t,this.camera),this.rig.follow(e,t),this.fallT>=$u.duration&&(t.group.rotation.set(0,0,0),this.enterEnding())}_endingAnim(e){this.chicken.rotation.y+=e*.6;for(let t of this.steam){t.userData.t+=e;let n=t.userData.t%2.2/2.2;n<.02&&(t.userData.x=(Math.random()-.5)*.9),t.position.set((t.userData.x||0)+Math.sin(n*6+t.userData.t)*.08,1.1+n*1.6,(Math.random()-.5)*.02),t.scale.setScalar(.6+n*1.6),t.material.opacity=.45*(1-n)}}render(){if(!this.renderer)return;if(this.state===`ending`){this.renderer.render(this.endScene,this.endCam,!1);return}let e=this.camera,t=this.renderer.pixelRatio,n=this.renderer.height*t,r=n/(2*Math.tan(kt.degToRad(e.fov)/2));this.fw.setPointScale(r,this.renderer.width*t,n),this.threats.setPointScale(r,this.renderer.width*t,n,id.maxSparkPx*(n/1080));let i=this.renderer.renderer.info;if(i.autoReset=!1,i.reset(),this.renderer.render(this.scene,e,!0,this.state===`play`||this.state===`falling`?this.threats.overlay:null),this.state===`play`){let e=this.metrics.perf;e.calls[0]=Math.min(e.calls[0],i.render.calls),e.calls[1]=Math.max(e.calls[1],i.render.calls),e.tris[0]=Math.min(e.tris[0],i.render.triangles),e.tris[1]=Math.max(e.tris[1],i.render.triangles)}this.lastInfo={calls:i.render.calls,tris:i.render.triangles}}},Xg=document.getElementById(`ui`);function Zg(){let e=window.matchMedia&&window.matchMedia(`(pointer: coarse)`).matches,t=window.matchMedia&&window.matchMedia(`(any-pointer: fine)`).matches;return!!e&&!t}if(!_d())Xg.innerHTML=`<div id="screen"><div class="panel"><h1>Birds vs Fireworks</h1>
    <p>이 브라우저(또는 컴퓨터)에서는 3D 그래픽(WebGL)을 쓸 수 없어 게임을 열 수 없습니다.</p>
    <p>최신 크롬·엣지·파이어폭스에서 열거나, 브라우저 설정의 「하드웨어 가속 사용」을 켜 보세요.</p></div></div>`;else{let e=new Cd,t=new bd(document.getElementById(`canvas-wrap`),zg),n=new wd(zg),r=null,i=new kd(Xg,(e,t)=>r&&r.onAction(e,t));r=new Yg({renderer:t,input:e,sound:n,ui:i,settings:zg,touch:Zg()}),i.setLoading(0),np(t.renderer,(e,t)=>i.setLoading(e,t)).then(e=>r.useAssets(e)),document.addEventListener(`visibilitychange`,()=>{document.hidden&&r.onHidden()}),window.addEventListener(`blur`,()=>r.onHidden());let a=performance.now(),o=e=>{let t=Math.min(.25,Math.max(0,(e-a)/1e3));a=e,r.frame(t,e/1e3),requestAnimationFrame(o)};requestAnimationFrame(o)}