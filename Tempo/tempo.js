// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.apple.com.cn/shop/*
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
    setTimeout(() => {
        if(document.querySelector('.rt-storelocator-store-group input[value="R484"]:not([disabled])')){
            __notify('🚀🚀🚀');
        }
    },1000)
})();