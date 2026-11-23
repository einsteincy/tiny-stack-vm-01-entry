import{mkdirSync as M,readdirSync as d,readFileSync as F,writeFileSync as W}from'node:fs';
function R(p,q){
const D=new Int32Array(256),C=new Int32Array(64),Y=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,i=0,f=0,t=0;
const n=p.length,e=v=>({b:o.subarray(0,l),c:v}),h=(a,b)=>{if(s<a)throw 2;if(s-a+b>256)throw 3};
try{for(;;){
if(t===1e6)throw 10;
if(f<0||f>=n)throw 9;
const x=p[f];
if(x>=0x10&&x<=0x22&&x!==0x17&&x!==0x1b&&x!==0x1f){
h(2,1);
const b=D[s-1],a=D[s-2];
let r;
if(x===0x10)r=(a+b)|0;
else if(x===0x11)r=(a-b)|0;
else if(x===0x12)r=Math.imul(a,b);
else if(x===0x13){if(!b)throw 4;r=a===-2147483648&&b===-1?a:(a/b)|0}
else if(x===0x14){if(!b)throw 4;r=b===-1?0:(a%b)|0}
else if(x===0x15){if(!b)throw 4;r=Math.floor((a>>>0)/(b>>>0))|0}
else if(x===0x16){if(!b)throw 4;r=((a>>>0)%(b>>>0))|0}
else if(x===0x18)r=a&b;
else if(x===0x19)r=a|b;
else if(x===0x1a)r=a^b;
else if(x===0x1c)r=a<<(b&31);
else if(x===0x1d)r=a>>(b&31);
else if(x===0x1e)r=(a>>>(b&31))|0;
else if(x===0x20)r=a===b?1:0;
else if(x===0x21)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;f++;t++;continue}
switch(x){
case 0:return e(0);
case 1:if(f+1>=n)throw 9;h(0,1);t++;D[s++]=(p[f+1]<<24)>>24;f+=2;break;
case 2:if(f+4>=n)throw 9;h(0,1);t++;D[s++]=p[f+1]|(p[f+2]<<8)|(p[f+3]<<16)|(p[f+4]<<24);f+=5;break;
case 3:h(1,0);t++;s--;f++;break;
case 4:h(1,2);t++;D[s]=D[s-1];s++;f++;break;
case 5:h(2,2);t++;{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v}f++;break;
case 6:h(2,3);t++;D[s]=D[s-2];s++;f++;break;
case 7:h(3,3);t++;{const v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v}f++;break;
case 0x17:h(1,1);t++;D[s-1]=-D[s-1]|0;f++;break;
case 0x1b:h(1,1);t++;D[s-1]=~D[s-1];f++;break;
case 0x30:case 0x31:case 0x32:{if(f+2>=n)throw 9;if(x!==0x30)h(1,0);t++;const r=((p[f+1]|(p[f+2]<<8))<<16)>>16;let k=1;if(x!==0x30){const v=D[--s];k=x===0x31?v===0:v!==0}f=k?f+3+r:f+3;break}
case 0x33:if(f+2>=n)throw 9;t++;if(c===64)throw 7;C[c++]=f+3;f=p[f+1]|(p[f+2]<<8);break;
case 0x34:t++;if(c===0)throw 8;f=C[--c];break;
case 0x40:h(1,1);t++;{const a=D[s-1];if(a<0||a>=256)throw 6;D[s-1]=Y[a]}f++;break;
case 0x41:h(2,0);t++;{const a=D[s-1],v=D[s-2];if(a<0||a>=256)throw 6;s-=2;Y[a]=v}f++;break;
case 0x50:h(1,0);t++;{const b=Buffer.from(String(D[s-1]));if(l+b.length>65536)throw 11;s--;o.set(b,l);l+=b.length}f++;break;
case 0x51:h(1,0);t++;if(l+1>65536)throw 11;o[l++]=D[--s]&255;f++;break;
case 0x52:h(0,1);t++;D[s++]=i<q.length?q[i++]:-1;f++;break;
case 0x53:h(1,0);t++;return e(D[--s]&255);
default:throw 5}
}}catch(err){return e(err)}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of d(I).sort()){const r=R(F(I+'/'+id+'/program.bin'),F(I+'/'+id+'/input.bin')),B=O+'/'+id;M(B,{recursive:true});W(B+'/stdout.bin',r.b);W(B+'/exit.txt',r.c+'\n')}
