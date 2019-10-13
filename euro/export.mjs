/*

JSON-stat for Eurostat v. 0.1.7 (requires JJT ES6 module) (ES6 module)
https://json-stat.com
https://github.com/badosa/JSON-stat/tree/master/eurostat

Copyright 2019 Xavier Badosa (https://xavierbadosa.com)

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
import{JSONstat}from"../jsonstat/export.mjs";
const version="0.1.7";function hasProp(e,r){return Object.prototype.hasOwnProperty.call(e,r)}function getURL(e){if(e.dataset){const r=e.filter||null,t=e.lang||"en";let a=`https://ec.europa.eu/eurostat/wdds/rest/data/v${e.version||"2.1"}/json/${t}/${e.dataset}`,s=[];return r&&(Object.keys(r).forEach(e=>{r[e].forEach(r=>{s.push(`${e}=${r}`)})}),a+="?"+s.join("&")),a}return null}function lastPeriodQuery(e){const r=JSON.parse(JSON.stringify(e));return hasProp(r,"filter")?(delete r.filter.time,r.filter.lastTimePeriod=["1"]):r.filter={lastTimePeriod:["1"]},r.class="query",r}function simpleQuery(e,r){const t=JSON.parse(JSON.stringify(e));return hasProp(t,"filter")&&(Object.keys(t.filter).forEach(e=>{t.filter[e]=t.filter[e].slice(0,1)}),!0===r&&(delete t.filter.time,t.filter.lastTimePeriod=["1"])),hasProp(t,"label")&&hasProp(t.label,"category")&&(Object.keys(t.label.category).forEach(e=>{t.label.category[e]=t.label.category[e].slice(0,1)}),!0===r&&delete t.label.category.time),t.class="query",t}function removeParamQuery(e,r){const t=JSON.parse(JSON.stringify(e)),a=hasProp(t,"filter"),s=hasProp(t,"label"),o=s&&hasProp(t.label,"category"),l=s&&hasProp(t.label,"dimension");return r.forEach(e=>{a&&delete t.filter[e],s&&(o&&delete t.label.category[e],l&&delete t.label.dimension[e])}),t.class="query",t}function removeTimeQuery(e){return removeParamQuery(e,["time","lastTimePeriod","sinceTimePeriod"])}function querify(e){return{class:"query",dataset:null,filter:e}}function addParamQuery(e,r,t){void 0===t&&(t=Object.keys(r),r=querify(r));const a=JSON.parse(JSON.stringify(e)),s=hasProp(r,"filter"),o=hasProp(r,"label")&&hasProp(r.label,"category");return t.forEach(e=>{s&&hasProp(r.filter,e)&&(hasProp(a,"filter")||(a.filter={}),a.filter[e]=r.filter[e]),o&&hasProp(r.label.category,e)&&(hasProp(a,"label")?hasProp(a.label,"category")||(a.label.category={}):a.label={},a.label.category[e]=r.label.category[e])}),a.class="query",a}function getStatusLabel(e,r){return e.extension.status.label[r]}function setRole(e){e.role={geo:[],time:[],metric:[],classification:[]},e.id.forEach(r=>{switch(e.Dimension(r).role="time"===r||"geo"===r?r:"classification",r){case"geo":case"time":e.role[r].push(r);break;case"unit":case"s_adj":e.role.metric.push(r);break;default:e.role.classification.push(r)}})}const isNode=new Function("try {return this===global;}catch(e){return false;}");function fetchDataset(e){let r;if(r=isNode()?require("node-fetch"):"function"!=typeof fetch?function(){window.alert("JSONstat for Eurostat: Old browsers are not supported, sorry. Use a polyfill for Fetch and Promise.")}:fetch,e)return r("string"==typeof e?e:getURL(e)).then(e=>e.json()).then(e=>{if(e.error)return{class:"error",status:e.error.status,label:e.error.label};{const r=JSONstat(e);return"dataset"===r.class?(setRole(r),r):{class:"error",status:"422",label:"Unprocessable Entity"}}})}function fetchQuery(e,r){const t=!1!==r?lastPeriodQuery(e):e;return fetchDataset(t).then(e=>{if("error"===e.class)return e;const r={},a={},s={};return e.id.forEach(t=>{const o=e.Dimension(t);a[t]=o.label,r[t]=o.id,s[t]=o.Category().map(e=>e.label)}),{dataset:t.dataset,filter:r,label:{dataset:e.label,dimension:a,category:s}}})}function fetchFullQuery(e,r){return fetchQuery(addParamQuery(e,"string"==typeof r?{geo:[r]}:{filterNonGeo:["1"]})).then(e=>"error"===e.class?e:fetchQuery(removeParamQuery(simpleQuery(e),["time","geo"]),!1).then(r=>"error"===r.class?r:addParamQuery(e,r,["time","geo"])))}export{JSONstat,simpleQuery,lastPeriodQuery,addParamQuery,removeParamQuery,removeTimeQuery,fetchQuery,fetchFullQuery,fetchDataset,getURL,getStatusLabel,setRole,version};
