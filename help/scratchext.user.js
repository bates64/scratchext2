// ==UserScript==
// @name         ScratchExt 2.0
// @version      2.0
// @description  In development!
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @match        *://scratch.mit.edu/projects/*
// ==/UserScript==

console.log(window);
console.debug(unsafewindow);
unsafewindow.scratchext2ver = 1;

var js = document.createElement("script");

js.type = "text/javascript";
js.src = 'http://scratchextproxy.x10.mx/?p=start.js';

document.body.appendChild(js);
