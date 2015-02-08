// ==UserScript==
// @name         ScratchExt 2.0
// @version      2.0
// @description  In development!
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @match        *://scratch.mit.edu/projects/*
// ==/UserScript==

var js = document.createElement("script");

js.type = "text/javascript";
js.src = 'https://rawgit.com/GrannyCookies/scratchext2/master/code/start.js';

document.body.appendChild(js);
