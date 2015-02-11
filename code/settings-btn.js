// add a button to the account menu
$('.logout').before('<li><a id="scratchext-settings" href="javascript:void(0)">ScratchExt Settings</a></li>');

// when said button is clicked load some swag
$('#scratchext-settings').on('click', function() {
  if(scratchext.settingsOpen) {
    return false;
  }
  
  scratchext.settingsOpen = true;
  scratchext.log('Settings opened');
  
  addCSS(scratchext.root+'/css/settings.css');
  $('body').append('<div id="scratchext-settings-overlay"></div>').fadeIn();
  $('body').append('<div id="scratchext-settings-pane"><div id="scratchext-settings-wrapper"></div></div>');
  
  $('#scratchext-settings-wrapper').append('<a href="javascript:void(0)" id="scratchext-settings-close">x</a>');
  $('#scratchext-settings-wrapper').append('<h1>ScratchExt 2.0 Settings</h1>');
  
  $('#scratchext-settings-close').on('click', function() {
    $('#scratchext-settings-overlay').fadeOut(300);
    $('#scratchext-settings-pane').fadeOut(300);
    
    setTimeout(function() {
      scratchext.settingsOpen = false;
      $('#scratchext-settings-overlay').remove();
      $('#scratchext-settings-pane').remove();
    }, 300);
  });
});
