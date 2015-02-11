if(localStorage['scratchext2ver'] !== 1) {
  alert('ScratchExt 2.0 needs updating!');
  window.open('http://grannycookies.github.io/scratchext2/help/scratchext.user.js?i='+Date.now());
} else {
  $.getScript('http://scratchextproxy.x10.mx/?p='+'load-btn.js');
}
