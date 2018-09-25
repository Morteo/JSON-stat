/*

JSON-stat Javascript Utilities Suite v. 2.4.3 (requires JJT 0.10+)
https://json-stat.com
https://github.com/badosa/JSON-stat/tree/master/utils

Copyright 2018 Xavier Badosa (https://xavierbadosa.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied. See the License for the specific language governing
permissions and limitations under the License.

*/

//Required polyfills for old browsers: forEach, querySelector, querySelectorAll, toLocaleString (fallback: toFixed, locale ignored), trim, Array.indexOf, find, findIndex, reduce
var JSONstatUtils=function(){"use strict";function e(e,t,n){function l(e){void 0!==t?t.innerHTML=v[e]:window.alert(v[e])}function r(e,t,n){var l={filter:{}};return n.forEach(function(e){"rows"===e.name||"cols"===e.name?l[e.name]=e.value:l.filter[e.name]=e.value}),"rowscols"===t&&e.id.forEach(function(t,n){t!==l.rows&&t!==l.cols?void 0===l.filter[t]&&(l.filter[t]=e.Dimension(n).id[0]):delete l.filter[t]}),l}function a(e,t){var n,l,r={},a=[],i=e.id;if(t){var o="bigger"===t?function(e,t){return e.len<t.len?1:-1}:function(e,t){return e.len>t.len?1:-1};e.Dimension().forEach(function(e,t){a.push({id:i[t],len:e.length})}),a.sort(o),n=a[0].id,l=a[1].id}else n=i[0],l=i[1];return e.Dimension(n).length<e.Dimension(l).length&&(n=l+(l=n,"")),i.forEach(function(t){t!==n&&t!==l&&(r[t]=e.Dimension(t).id[0])}),{rows:n,cols:l,filter:r}}function i(e){var t=[],n=[].slice.call(e.querySelectorAll("select, input"));return n.forEach(function(e){t.push({name:e.name,value:e.value})}),t}function s(e,t,n){var l=function(e,t){var n,l,r="";return e&&"metric"===e.role&&t.unit&&(n=t.unit.hasOwnProperty("label")?t.unit.label:"",l=t.unit.hasOwnProperty("symbol")?t.unit.symbol:"",n+l!==""&&(r=""===l?n:""===n?l:"start"===t.unit.position?l+n:n+" "+l,r=" ("+r+")")),r},r=t.label||n;return r.capitalize()+l(e,t)}function d(e,t,n){var l,r='<select name="'+t+'">',a=[];if(null!==n[1]){if(l=e.id,a=e.Dimension(),2===l.length)return(e.Dimension(n[0]).label||n[0]).capitalize()}else{var i=e.Dimension(t);if(l=i.id,a=i.Category(),1===l.length)return}return l.forEach(function(e,t){var l=e!==n[0]?"":'selected="selected" ';(null===n[1]||e!==n[1])&&(r+="<option "+l+'value="'+e+'">'+s(i,a[t],e)+"</option>")}),r+="</select>"}function f(e,t,n,l){var a="",o="",u="",c="",p=n.rows,g=t.Dimension(p),y=g.id,S=n.cols,w=t.Dimension(S),E=w.id,x=t.role&&t.role.metric?t.role.metric[0]:null,j=null!==x?t.Dimension(x):null,D=function(e){return e.hasOwnProperty("unit")&&e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null},P=n.filter,z=JSON.parse(JSON.stringify(P)),A=[],N="",C="",R=t.source?v.source+": "+t.source:"",_=null!==t.label?'<span class="label">'+t.label.capitalize()+"</span>":"";m&&O.length&&(_='<span class="label">'+O.join(". ")+"</span>"),""!==R&&"."!==R.slice(-1)&&(R+="."),u+="<caption>"+_+"<form>";for(var T in P){var J=t.Dimension(T),L=J.label?J.label.capitalize():T.capitalize();J.length>1?N+="<p>"+d(t,T,[P[T],null])+" <strong>"+L+"</strong></p>":A.push({label:L,value:s(J,J.Category(0)),name:T,id:J.id[0]})}""!==N&&(N='<fieldset id="filters"><legend>'+v.filters+"</legend>"+N+"</fieldset>"),A.forEach(function(e){C+="<p>"+e.value+" <strong>"+e.label+'</strong></p><input type="hidden" name="'+e.name+'" value="'+e.id+'" />'}),""!==C&&(C='<fieldset id="constants"><legend>'+v.constants+"</legend>"+C+"</fieldset>"),u+=C+N+'<fieldset id="rowscols"><legend>'+v.rc+"</legend>"+d(t,"rows",[p,S])+" <a>&#x2194;</a> "+d(t,"cols",[S,p])+"</fieldset></form></caption>",c+="<tbody>";var k=Number.toLocaleString?function(e,t){return null===t?e.toLocaleString(h):e.toLocaleString(h,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)};return y.forEach(function(e){z[p]=e;var n=t.Data(z),l=function(e,t){var n,l=S!==x?null===j?null:D(j.Category(z[x])):D(w.Category(t));null!==e.value?(n=k(e.value,l),b&&null!==e.status&&(n+=" ("+e.status+")")):n=e.status||v.na,c+="<td>"+n+"</td>"};return null===n?void(c="ERROR"):(c+='<tr><th scope="row">'+s(g,g.Category(e))+"</th>","[object Array]"===Object.prototype.toString.call(n)?n.forEach(function(e,t){l(e,t)}):l(n,0),void(c+="</tr>"))}),"ERROR"===c?v.dataerror:(c+="</tbody>",a+="<thead><tr><th></th>",E.forEach(function(e){a+='<th scope="col">'+s(w,w.Category(e))+"</th>"}),a+="</tr></thead>",""!==R&&(o='<tfoot><tr><td colspan="'+(E.length+1)+'">'+R+"</td></tr></tfoot>"),e.innerHTML='<table class="'+l+'">'+u+a+o+c+"</table>",[].slice.call(e.querySelectorAll("select")).forEach(function(n){n.addEventListener("change",function(n){f(e,t,r(t,n.target.parentElement.getAttribute("id"),i(e)),l)},!1)}),void e.querySelector("a").addEventListener("click",function(){n.cols=p,n.rows=S,f(e,t,n,l)},!1))}if(void 0===e)return void l("urierror");if(void 0===t)return void l("selerror");void 0===n&&(n={});var v=void 0===n.i18n||void 0===n.i18n.msgs?{urierror:"tbrowser: A valid JSON-stat input must be specified.",selerror:"tbrowser: A valid selector must be specified.",jsonerror:"The request did not return a valid JSON-stat dataset.",dimerror:"Only one dimension was found in the dataset. At least two are required.",dataerror:"Selection returned no data!",source:"Source",filters:"Filters",constants:"Constants",rc:"Rows &amp; Columns",na:"n/a"}:n.i18n.msgs,h=void 0===n.i18n||void 0===n.i18n.locale?"en-US":n.i18n.locale,p=n.dsid||0,b=n.status||!1,g=n.tblclass||"",m=n.nonconst||!1,y=u(e,p);if(!o(y))return void l("jsonerror");if(m)var O=c(y);return 1===y.length?void l("dimerror"):void f(t,y,a(y,n.preset),g)}function t(e,t){if(void 0===e)return null;void 0===t&&(t={});var n="",l="",r=0,a=t.na||"n/a",i=t.dsid||0,s=t.vlabel||null,c=t.slabel||null,d=t.counter||!1,f=t.tblclass||"",v=t.numclass||"",h=t.valclass||"",p=t.status||!1,b=t.locale||"en-US",g=t.source||"Source",m=u(e,i),y=Number.toLocaleString?function(e){return e.toLocaleString(b)}:function(e){return e},O=d?function(e,t){n+=t?'<tr><td class="'+v+'">'+t+"</td>":'<tr><th class="'+v+'">#</th>',e.forEach(function(e,l){var r=w===l?' class="'+v+" "+h+'"':"",i=null===e?a:y(e);n+=t?"<td"+r+">"+i+"</td>":"<th"+r+">"+i+"</th>"}),n+="</tr>"}:function(e,t){n+="<tr>",e.forEach(function(e,l){var r=w===l?' class="'+v+" "+h+'"':"",i=null===e?a:y(e);n+=t?"<td"+r+">"+i+"</td>":"<th"+r+">"+i+"</th>"}),n+="</tr>"};if(!o(m))return null;var S=m.toTable({status:p,vlabel:s,slabel:c}),w=S[0].length-1;return S.forEach(function(e,t){O(e,t)}),m.source&&(r=m.length+1,d&&r++,p&&r++,g+=": "+m.source,"."!==g.slice(-1)&&(g+="."),l='<tfoot><td colspan="'+r+'">'+g+"</td></tfoot>"),'<table class="'+f+'"><caption>'+(t.caption||m.label||"")+"</caption>"+l+"<tbody>"+n+"</tbody></table>"}function n(e,t){if(void 0===e)return null;void 0===t&&(t={}),"boolean"!=typeof t.ovalue&&(t.ovalue=!1),"boolean"!=typeof t.ostatus&&(t.ostatus=!1);var n=t.vlabel||"Value",r=t.slabel||"Status",a=t.type||"array",i=t.label||"",o=t.header||null,s=[],u=[],c=[],d=[],f={},v={},h=function(e,t){for(var n=1,l=0,r=0;S>r;r++)n*=r>0?t[S-r]:1,l+=n*e[S-r-1];return l},p=function(){var t=e[w][n];c[h(E,u)]=isNaN(t)?null:t};switch(a){case"array":e=function(e){for(var t=e[0],n=e.slice(1),l=[],r=0,a=n.length;a>r;r++){for(var i=0,o=t.length,s={};o>i;i++)s[t[i]]=n[r][i];l.push(s)}return l}(e);break;case"object":e=function(e){for(var t=e.cols.map(function(e){return e.id}),n=e.rows,l=[],r=0,a=n.length;a>r;r++){for(var i=0,o=t.length,s={};o>i;i++)s[t[i]]=n[r].c[i].v;l.push(s)}return l}(e)}var b,g=e.length;for(var m in e[0])if(m!==n)if(m!==r){if(s.push(m),o)b=o.dimension[m],f[m]=b.category.index;else{f[m]=[];for(var y=0;g>y;y++){var O=e[y][m];-1===f[m].indexOf(O)&&f[m].push(O)}}u.push(f[m].length),v[m]={label:o?b.label:m,category:{index:f[m]}},o&&(v[m].category.label=b.category.label,b.category.unit&&(v[m].category.unit=b.category.unit))}else p=function(){var t=e[w][n],l=e[w][r];c[h(E,u)]=isNaN(t)?null:t,d[h(E,u)]=""===l?null:l};for(var S=s.length,w=0;g>w;w++){for(var E=[],x=0;S>x;x++){var j=s[x];E.push(f[j].indexOf(e[w][j]))}p()}var D={version:"2.0","class":"dataset",value:c,dimension:v,id:s,size:u};return i&&(D.label=i),d.length&&(D.status=d),o&&(o.label&&(D.label=o.label),o.source&&(D.source=o.source),o.updated&&(D.updated=o.updated),o.href&&(D.href=o.href),o.role&&(D.role=o.role)),t.ovalue&&(D.value=l(D,"value")),t.ostatus&&D.hasOwnProperty("status")&&(D.status=l(D,"status")),D}function l(e,t){var n={};return"[object Array]"===Object.prototype.toString.call(e[t])?(e[t].forEach(function(e,t){null!==e&&(n[t+""]=e)}),n):e[t]}function r(e,t){return-1!==e.indexOf(t)?'"'+e+'"':e}function a(e,t){if(void 0===e)return null;void 0===t&&(t={});var n="",l="jsonstat",a=t.rich===!0,i=a?"value":t.vlabel||"Value",s=a?"status":t.slabel||"Status",c=t.status===!0,d=t.na||"n/a",f=t.delimiter||",",v=t.separator||"|",h=";"===f?t.decimal||",":t.decimal||".",p=t.dsid||0,b=u(e,p);if(!o(b))return null;a&&(c=!(null===b.status));var g=b.toTable({vlabel:i,slabel:s,status:c,field:a?"id":"label",content:a?"id":"label",type:"array"}),m=g[0].indexOf(i),y=c?g[0].indexOf(s):-1;return g.forEach(function(e,t){e.forEach(function(n,l){t&&l===m?null===n?e[l]=r(d,f):"."!==h&&(e[l]=(e[l]+"").replace(".",h)):t&&l===y&&null===n?e[l]="":e[l]=r(e[l],f)}),n+=e.join(f)+"\n"}),a&&(l+=f+h+f+v+"\n",["label","source","updated","href"].forEach(function(e){b[e]&&(l+=e+f+r(b[e],f)+"\n")}),b.id.forEach(function(e,t){var n=[],a=b.Dimension(t),i=a.role,o=!1;l+="dimension"+f+r(e,f)+f+r(a.label,f)+f+a.length,"metric"===i&&a.__tree__.category.unit&&(o=!0),a.id.forEach(function(e,t){var i=[],s=a.Category(t);l+=f+r(e,f)+f+r(s.label,f),o&&(i.push(s.unit.hasOwnProperty("decimals")?s.unit.decimals:""),i.push(s.unit.label||""),s.unit.symbol&&(i.push(s.unit.symbol),i.push(s.unit.position)),n.push(r(i.join(v),f)))}),null!==i&&"classification"!==i&&(l+=f+a.role,o&&(l+=f+n.join(f))),l+="\n"}),n=l+"data\n"+n),n}function i(e,t){if(void 0===e)return null;void 0===t&&(t={});var l,r,a,i=[],o=null,u=!1,c={time:[],geo:[],metric:[]},d="jsonstat"===e.substring(0,8),f=d?"value":t.vlabel,v=d?"status":t.slabel,h=d?e.substring(8,9):t.delimiter||",",p=";"===h?t.decimal||",":t.decimal||".",b=s(e.trim(),h);if(d){for(p=b[0][1],a=b[0][2],b.shift();"data"!==b[0][0];)i.push(b.shift());b.shift();var g={dimension:{}};i.forEach(function(e,t){var t,n,l,r,i,o,s,d;switch(e[0]){case"dimension":if(g.dimension[e[1]]={},r=g.dimension[e[1]],r.label=e[2],r.category={},i=r.category,i.index=[],n={},l=2*e[3]+3,e.length>=l){for(t=4;l>t;t++)s=e[t],d=e[++t],Object.defineProperty(n,s,{value:d,writable:!0,configurable:!0,enumerable:!0}),i.label=n,i.index.push(s);"string"==typeof e[t]&&-1!==["time","geo","metric"].indexOf(e[t])&&(c[e[t]].push(e[1]),u=!0,"metric"===e[t]&&"string"==typeof e[++t]&&(i.unit={},i.index.forEach(function(n,l){var r=e[t+l].split(a);i.unit[n]={},o=i.unit[n],void 0!==r[0]&&""!==r[0]&&(o.decimals=1*r[0]),void 0!==r[1]&&""!==r[1]&&(o.label=r[1]),void 0!==r[2]&&""!==r[2]&&(o.symbol=r[2]),void 0!==r[1]&&-1!==["start","end"].indexOf(r[3])&&(o.position=r[3])})))}break;case"label":case"source":case"updated":case"href":g[e[0]]=e[1]||null}u&&(g.role=c)})}if(l=b.length,r=b[0].length,void 0!==f){for(;r--;)if(b[0][r]===f){o=r;break}if(null===o)return null}else o=r-1,f=b[0][o];if(","===p)for(r=1;l>r;r++)b[r][o]=+b[r][o].replace(",",".");else for(r=1;l>r;r++)b[r][o]=+b[r][o];return n(b,{header:g,vlabel:f,slabel:v,type:"array",label:t.label||"",ovalue:t.ovalue||!1,ostatus:t.ostatus||!1})}function o(e){if(null===e||0===e.length||"dataset"!==e["class"])return!1;for(var t=e.length,n=1;t--;)n*=e.Dimension(t).length;return n!==e.n?!1:!0}function s(e,t){t=t||",";for(var n,l,r=RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),a=[[]],i=null;i=r.exec(e);)l=i[1],l.length&&l!=t&&a.push([]),n=i[2]?i[2].replace(RegExp('""',"g"),'"'):i[3],a[a.length-1].push(n);return a}function u(e,t){return void 0===e?null:(("string"==typeof e||void 0===e.length)&&(e=JSONstat(e)),0===e.length||"dataset"!==e["class"]&&"collection"!==e["class"]&&"bundle"!==e["class"]?null:"dataset"===e["class"]?e:e.Dataset(t))}function c(e){var t=0,n=e.size.slice(0),l=[];return n.forEach(function(n,r){var a=r-t,i=e.Dimension(a);1===n&&(delete e.__tree__.dimension[e.id[a]],e.size.splice(a,1),e.id.splice(a,1),e.length--,t++,l.push(i.label.capitalize()+": "+i.Category(0).label.capitalize()))}),l}function d(e,t){if(void 0===e||"[object Array]"!==Object.prototype.toString.call(e))return null;var l=JSON.parse(JSON.stringify(e)),r=l[0];if(!r.hasOwnProperty("version")||!r.hasOwnProperty("class")||"dataset"!==r["class"])return null;void 0===t&&(t={});var a=void 0===t.label?null:t.label,i=void 0===t.by?null:t.by,o=[];if(null===i){for(var s=1,u=l.length;u>s;s++)o=o.concat(l[s].value);return r.value=o,null!==a&&(r.label=a),r}var c,d,f,v=function(e,t,n){if("[object Array]"===Object.prototype.toString.call(e))e=e.concat(t);else for(var l in t)e[l]=0===t[l]?n:t[l];return e};l.forEach(function(e,t){var n=JSONstat(e).toTable({status:!0}),l=e.dimension[i].category;0===t?(o=[n[0]],c=l.index,d=l.label,f=l.unit):(c=v(c,l.index,t),d=v(d,l.label,t),f=v(f,l.unit,t)),o=o.concat(n.slice(1))});var h=n(o);return r.value=h.value,r.size=h.size,r.status=h.status||null,r.label=a||"",r.href=null,r.dimension[i].category.index=c||null,r.dimension[i].category.label=d||null,r.dimension[i].category.unit=f||null,r}function f(e,t){if("object"!=typeof e||!e.hasOwnProperty("dataSets")||"[object Array]"!==Object.prototype.toString.call(e.dataSets))return null;if(1!==e.dataSets.length)return null;if(!e.dataSets[0].hasOwnProperty("observations"))return null;void 0===t?t={ovalue:!1,ostatus:!1}:("boolean"!=typeof t.ovalue&&(t.ovalue=!1),"boolean"!=typeof t.ostatus&&(t.ostatus=!1));var n=e.structure,l=e.dataSets[0].observations,r=n.attributes.observation,a=n.dimensions;if(!a.hasOwnProperty("observation"))return null;if(a.hasOwnProperty("series")&&(null!==a.series||Object.keys(a.series).length))return null;var i=[],o=[],s={},u=[],c={time:[],geo:[]},d=function(){},f=function(e,t){for(var n=e.size,l=n.length-t.length;l--;)t.push(0);for(var r=0,a=n.length,i=0,o=1;a>r;r++)o*=r>0?n[a-r]:1,i+=o*t[a-r-1];return i},v=function(e){if(s[e.id]={label:e.name},e.hasOwnProperty("role"))switch(e.role){case"REF_AREA":c.geo.push(e.id);break;case"TIME_PERIOD":c.time.push(e.id)}Object.defineProperty(s[e.id],"category",{value:{index:[],label:{}},writable:!0,enumerable:!0}),i.push(e.id),o.push(e.values.length);var t=s[e.id].category;e.values.forEach(function(e){t.index.push(e.id),Object.defineProperty(t.label,e.id,{value:e.name,writable:!0,enumerable:!0})})},h=e.header.links.find(function(e){return"request"===e.rel}),p=r.findIndex(function(e){return"OBS_STATUS"===e.id});-1!==p&&(r[p].values.length?u=r[p].values:p=-1),a.observation.forEach(v),a.hasOwnProperty("dataSet")&&a.dataSet.forEach(v);var b={version:"2.0","class":"dataset",updated:e.header.prepared||null,source:e.header.sender.name||null,label:n.name||null,id:i,size:o,dimension:s,value:t.ovalue?{}:[]};h&&(b.link={alternate:[{type:"application/vnd.sdmx.data+json",href:h.href}]}),c.geo.length+c.time.length>0&&(0===c.time.length&&(c.time=null),0===c.geo.length&&delete c.geo,b.role=c),-1!==p&&(b.status=t.ostatus?{}:[],b.extension={status:{label:{}}},u.forEach(function(e){b.extension.status.label[e.id]=e.name}),d=t.ostatus?function(){var e=l[g][p];null!==e&&(b.status[f(b,m)]=u[e].id)}:function(){var e=l[g][p];b.status[f(b,m)]=null===e?null:u[e].id}),p++;for(var g in l){var m=g.split(":");t.ovalue&&null===l[g][0]||(b.value[f(b,m)]=l[g][0]),d()}var y;if(!t.ovalue)for(y=o.reduce(function(e,t){return e*t})-b.value.length;y--;)b.value.push(null);if(!t.ostatus&&b.hasOwnProperty("status"))for(y=o.reduce(function(e,t){return e*t})-b.status.length;y--;)b.status.push(null);return b}return String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},{tbrowser:e,datalist:t,fromTable:n,fromCSV:i,toCSV:a,join:d,fromSDMX:f,version:"2.4.3"}}();
