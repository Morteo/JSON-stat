var JSONstatUtils=function(){"use strict";function t(t){function e(e){void 0!==t.selector?t.selector.innerHTML=c[e]:window.alert(c[e])}function n(t,e,n){var r={filter:{}};return n.forEach(function(t){"rows"===t.name||"cols"===t.name?r[t.name]=t.value:r.filter[t.name]=t.value}),"rowscols"===e&&(r.filter={},t.id.forEach(function(e,n){e!==r.rows&&e!==r.cols&&(r.filter[e]=t.Dimension(n).id[0])})),r}function r(t,e){var n,r,l={},a=[],o=t.id;if(e){var i="bigger"===e?function(t,e){return t.len<e.len?1:-1}:function(t,e){return t.len>e.len?1:-1};t.Dimension().forEach(function(t,e){a.push({id:o[e],len:t.length})}),a.sort(i),n=a[0].id,r=a[1].id}else n=o[0],r=o[1];return t.Dimension(n).length<t.Dimension(r).length&&(n=r+(r=n,"")),o.forEach(function(e){e!==n&&e!==r&&(l[e]=t.Dimension(e).id[0])}),{rows:n,cols:r,filter:l}}function l(t){var e=[],n=[].slice.call(t.querySelectorAll("select, input"));return n.forEach(function(t){e.push({name:t.name,value:t.value})}),e}function o(t,e){var n=function(t,e){return t&&"metric"===t.role&&e.unit&&e.unit.hasOwnProperty("label")?" ("+e.unit.label+")":""};return e.label.capitalize()+n(t,e)}function i(t,e,n){var r,l='<select name="'+e+'">',a=[];if(null!==n[1]){if(r=t.id,a=t.Dimension(),2===r.length)return(t.Dimension(n[0]).label||n[0]).capitalize()}else{var i=t.Dimension(e);if(r=i.id,a=i.Category(),1===r.length)return}return r.forEach(function(t,e){var r=t!==n[0]?"":'selected="selected" ';(null===n[1]||t!==n[1])&&(l+="<option "+r+'value="'+t+'">'+o(i,a[e])+"</option>")}),l+="</select>"}function s(t,e,r){var a="",u="",f="",h="",g=r.rows,p=e.Dimension(g),b=p.id,m=r.cols,y=e.Dimension(m),j=y.id,S=e.role&&e.role.metric?e.role.metric[0]:null,w=null!==S?e.Dimension(S):null,D=function(t){return t.hasOwnProperty("unit")&&t.unit&&t.unit.hasOwnProperty("decimals")?t.unit.decimals:null},E=r.filter,O=JSON.parse(JSON.stringify(E)),N=[],C="",x="",R=e.source?c.source+": "+e.source+".":"",J=null!==e.label?'<span class="label">'+e.label.capitalize()+"</span>":"";f+="<caption>"+J,f+=' <form><fieldset id="rowscols"><legend>'+c.rc+"</legend>"+i(e,"rows",[g,m])+" <a>&#x2194;</a> "+i(e,"cols",[m,g])+"</fieldset>";for(var L in E){var q=e.Dimension(L),z=q.label.capitalize();q.length>1?C+="<p>"+i(e,L,[E[L],null])+" <strong>"+z+"</strong></p>":N.push({label:z,value:o(q,q.Category(0)),name:L,id:q.id[0]})}""!==C&&(C='<fieldset id="filters"><legend>'+c.filters+"</legend>"+C+"</fieldset>"),N.forEach(function(t){x+="<p>"+t.value+" <strong>"+t.label+'</strong></p><input type="hidden" name="'+t.name+'" value="'+t.id+'" />'}),""!==x&&(x='<fieldset id="constants"><legend>'+c.constants+"</legend>"+x+"</fieldset>"),f+=C+x+"</form></caption>",h+="<tbody>";var A=Number.toLocaleString?function(t,e){return null===e?t.toLocaleString(d):t.toLocaleString(d,{minimumFractionDigits:e,maximumFractionDigits:e})}:function(t,e){return null===e?t:t.toFixed(e)};return b.forEach(function(t){O[g]=t;var n=e.Data(O),r=function(t,e){var n,r=m!==S?null===w?null:D(w.Category(O[S])):D(y.Category(e));null!==t.value?(n=A(t.value,r),v&&null!==t.status&&(n+=" ("+t.status+")")):n=t.status||c.na,h+="<td>"+n+"</td>"};return null===n?void(h="ERROR"):(h+='<tr><th scope="row">'+o(p,p.Category(t))+"</th>","[object Array]"===Object.prototype.toString.call(n)?n.forEach(function(t,e){r(t,e)}):r(n,0),void(h+="</tr>"))}),"ERROR"===h?c.dataerror:(h+="</tbody>",a+="<thead><tr><th></th>",j.forEach(function(t){a+='<th scope="col">'+o(y,y.Category(t))+"</th>"}),a+="</tr></thead>",""!==R&&(u='<tfoot><tr><td colspan="'+(j.length+1)+'">'+R+"</td></tr></tfoot>"),t.innerHTML="<table>"+f+a+u+h+"</table>",[].slice.call(t.querySelectorAll("select")).forEach(function(r){r.addEventListener("change",function(r){s(t,e,n(e,r.target.parentElement.getAttribute("id"),l(t)))},!1)}),void t.querySelector("a").addEventListener("click",function(){r.cols=g,r.rows=m,s(t,e,r)},!1))}var u,c=void 0===t.i18n||void 0===t.i18n.msgs?{selerror:'tbrowser: "selector" property is required!',urierror:'tbrowser: "jsonstat" property is required!',jsonerror:"Document is not a valid JSON-stat dataset.",dserror:"Dataset ID is not correct.",dimerror:"Only one dimension was found in the dataset. At least two are required.",dataerror:"Selection returned no data!",source:"Source",filters:"Filters",constants:"Constants",rc:"Rows &amp; Columns",na:"n/a"}:t.i18n.msgs,d=void 0===t.i18n||void 0===t.i18n.locale?"en-US":t.i18n.locale,f=t.dsid||0,v=t.status||!1;if(void 0===t.selector)return void e("selerror");if(void 0===t.jsonstat)return void e("urierror");if(u="string"==typeof t.jsonstat||void 0===t.jsonstat.length?JSONstat(t.jsonstat):t.jsonstat,0===u.length||"dataset"!==u["class"]&&"bundle"!==u["class"])return void e("jsonerror");var h="dataset"===u["class"]?u:u.Dataset(f);return a(h)?null===h?void e("dserror"):1===h.length?void e("dimerror"):void s(t.selector,h,r(h,t.preset)):void e("jsonerror")}function e(t){var e,n=t.na||"n/a",r=t.dsid||0,l="",o=0;if(void 0===t.jsonstat)return null;if(e="string"==typeof t.jsonstat||void 0===t.jsonstat.length?JSONstat(t.jsonstat):t.jsonstat,0===e.length||"dataset"!==e["class"]&&"bundle"!==e["class"])return null;var i="dataset"===e["class"]?e:e.Dataset(r);if(null===i||!a(i))return null;var s=i.toTable();return o=s[0].length-1,s.forEach(function(t,e){l+=e?'<tr><td class="value">'+e+"</td>":'<tr><th class="value">#</th>',t.forEach(function(t,r){var a=o===r?' class="value"':"",i=null===t?n:t;l+=e?"<td"+a+">"+i+"</td>":"<th"+a+">"+i+"</th>"}),l+="</tr>"}),"<table><caption>"+(t.caption||i.label)+"</caption><tbody>"+l+"</tbody></table>"}function n(t){var e=t.vlabel||"Value",n=t.slabel||"Status",r=t.type||"array",l=t.table,a=t.label||"",o=[],i=[],s=[],u=[],c={},d={},f=function(t,e){for(var n=1,r=0,l=0;m>l;l++)n*=l>0?e[m-l]:1,r+=n*t[m-l-1];return r},v=function(){var t=l[y][e];s[f(j,i)]=isNaN(t)?null:t};switch(r){case"array":l=function(t){for(var e=t[0],n=t.slice(1),r=[],l=0,a=n.length;a>l;l++){for(var o=0,i=e.length,s={};i>o;o++)s[e[o]]=n[l][o];r.push(s)}return r}(l);break;case"object":l=function(t){for(var e=t.cols.map(function(t){return t.id}),n=t.rows,r=[],l=0,a=n.length;a>l;l++){for(var o=0,i=e.length,s={};i>o;o++)s[e[o]]=n[l].c[o].v;r.push(s)}return r}(l)}var h=l.length;for(var g in l[0])if(g!==e)if(g!==n){o.push(g),c[g]=[];for(var p=0;h>p;p++){var b=l[p][g];-1===c[g].indexOf(b)&&c[g].push(b)}i.push(c[g].length),d[g]={label:g,category:{index:c[g]}}}else v=function(){var t=l[y][e];s[f(j,i)]=isNaN(t)?null:t,u[f(j,i)]=l[y][n]};for(var m=o.length,y=0;h>y;y++){for(var j=[],S=0;m>S;S++){var w=o[S];j.push(c[w].indexOf(l[y][w]))}v()}return d.id=o,d.size=i,{"class":"dataset",label:a,value:s,status:u,dimension:d}}function r(t){var e,n=[],r=t.vlabel||"Value",l=t.slabel||"Status",o=t.status||!1,i=t.na||"n/a",s=t.delimiter||",",u=";"===s?t.decimal||",":t.decimal||".",c=t.dsid||0;if(void 0===t.jsonstat)return null;if(e="string"==typeof t.jsonstat||void 0===t.jsonstat.length?JSONstat(t.jsonstat):t.jsonstat,0===e.length||"dataset"!==e["class"]&&"bundle"!==e["class"])return null;var d="dataset"===e["class"]?e:e.Dataset(c);if(null===d||!a(d))return null;for(var f=d.toTable({vlabel:r,slabel:l,status:o,type:"array"}),v=f[0].indexOf(r),h=1,g=f.length;g>h;h++)null===f[h][v]?f[h][v]=i:"."!==u&&(f[h][v]=(f[h][v]+"").replace(".",u));return f.forEach(function(t){n+=t.join(s)+"\n"}),n}function l(t){var e=t.vlabel||"Value",r=t.type||"jsonstat";if(t.table)u=t.table;else{var l,a=null,i=t.delimiter||",",s=";"===i?t.decimal||",":t.decimal||".",u=o(t.csv,i),c=u.length,l=u[0].length;if(t.vlast)a=l-1,e=u[0][a];else{for(;l--;)if(u[0][l]===e){a=l;break}if(null===a)return null}if(","===s)for(l=1;c>l;l++)u[l][a]=+u[l][a].replace(",",".");else for(l=1;c>l;l++)u[l][a]=+u[l][a]}return"table"===r?u:n({table:u,vlabel:e,slabel:t.slabel||"Status",type:"array",label:t.label})}function a(t){for(var e=t.length,n=1;e--;)n*=t.Dimension(e).length;return n!==t.n?!1:!0}function o(t,e){e=e||",";for(var n,r,l=RegExp("(\\"+e+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+e+"\\r\\n]*))","gi"),a=[[]],o=null;o=l.exec(t);)r=o[1],r.length&&r!=e&&a.push([]),n=o[2]?o[2].replace(RegExp('""',"g"),'"'):o[3],a[a.length-1].push(n);return a}return String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},{tbrowser:t,datalist:e,fromTable:n,fromCSV:l,toCSV:r,version:"1.4.1"}}();