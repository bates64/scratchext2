if(window.scratchext2ver===undefined) {
  alert('ScratchExt 2.0 needs updating!');
  window.open('http://grannycookies.github.io/scratchext2/help/scratchext.user.js');
} else {
  $.getScript('http://scratchextproxy.x10.mx/?p='+'load-btn.js');
}
