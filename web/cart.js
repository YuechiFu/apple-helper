// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.apple.com.cn/shop/bag
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://code.jquery.com/jquery-3.6.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.__notify = (key, title,message) => {
        let img = new Image();
        img.src = `https://sctapi.ftqq.com/SCT59052TfADI9mmalajZV2rL0S8eUBQc.send?title=${title}`
    }
    
     window.onload = () => {
        if(/不可在.*Apple 深圳益田假日广场/.test(document.querySelector('.rs-pickup-quote').innerText)){
            setTimeout(() => {location.reload()}, 1000 * 10)
        }else{
           var title = document.querySelector('.rs-iteminfo-title').innerText ;
           __notify(title)
        }
     }
     

})();