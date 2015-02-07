// ==UserScript==
// @name         ScratchExt 2.0
// @version      2.0
// @description  Alpha - in development!
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @match        *://scratch.mit.edu/projects/*
// ==/UserScript==

var js = document.createElement("script");

js.type = "text/javascript";
js.src = 'http://www.stefanbates.com/scratchext2/code/start.js';

document.body.appendChild(js);