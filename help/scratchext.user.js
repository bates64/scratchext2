// ==UserScript==
// @name         ScratchExt 2.0
// @version      3.0
// @description  In development!
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @match        *://scratch.mit.edu/projects/*
// @run-at document-end
// ==/UserScript==
 
 function waitfor(test, expectedValue, msec, callback) {
    while (test() !== expectedValue) {
        setTimeout(function() {
            waitfor(test, expectedValue, msec, callback);
        }, msec);
        return;
    }
    callback();
}

function JSsetProjectStatsDefined() {
    return typeof JSsetProjectStats !== 'undefined';
}
 
var script = document.createElement('script');
script.textContent = '('+function() {
  var old = window.JSsetProjectStats;
  if (old) {
    var times = 0;
    window.JSsetProjectStats = function() {
      old.apply(this, arguments);
      if (times++) {
          localStorage['scratchext2ver'] = 2;

          var js = document.createElement("script");
          
          js.type = "text/javascript";
          js.src = 'http://scratchextproxy.x10.mx/?p=start.js';
          
          document.body.appendChild(js);
      }
    }
  }
}+')()';
document.body.appendChild(script);
