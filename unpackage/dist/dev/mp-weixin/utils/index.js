"use strict";var s=require("../common/vendor.js");const i=function(e){if(e==null||e=="")return"0 B";var t=new Array("B","KB","MB","GB","TB","PB","EB","ZB","YB"),n=0,r=parseFloat(e);n=Math.floor(Math.log(r)/Math.log(1024));var o=r/Math.pow(1024,n);return o=o.toFixed(2),o+t[n]},a=function(e){var t=e.lastIndexOf("."),n=e.substr(t+1);return n},m=function(e){return["png","jpg","jpeg","bmp","gif","webp","psd","svg","tiff"].indexOf(e.toLowerCase())!==-1},u=function(e){return["mp4","m2v","mkv","rmvb","wmv","avi","flv","mov","m4v"].indexOf(e)!==-1},f=function(e){var t=/\w+@[a-z0-9]+\.[a-z]{2,9}/;return t.test(e)!==!1},l=function(e){var t=/^1[23456789]\d{9}$/;return t.test(e)!==!1},d=e=>{let t=s.dayjs(new Date).format("YYYY/MM/DD HH:mm"),n=s.dayjs(e).format("YYYY/MM/DD HH:mm"),r=new Date(t).getTime(),o=new Date(n).getTime();return Math.ceil((r-o)/(1e3*60*60*24))},c=e=>s.dayjs(e).format("HH"),w=e=>s.dayjs(e).format("mm"),g=e=>{let t=s.dayjs(new Date).format("YYYY/MM/DD").toString(),n=s.dayjs(e).format("YYYY/MM/DD").toString();return t==n},D=(e,t)=>{let n=t||500,r;return function(){let o=arguments;r&&clearTimeout(r),r=setTimeout(()=>{r=null,e.apply(this,o)},n)}};exports.Debounce=D;exports.bytesToSize=i;exports.getSuffix=a;exports.isEmall=f;exports.isImage=m;exports.isVideo=u;exports.timedown=d;exports.timedownnum=g;exports.timedownshow=c;exports.timedownshowmm=w;exports.typePhone=l;