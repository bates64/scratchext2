// add a button to the account menu
$('.logout').before('<li><a id="scratchext-settings" href="javascript:void">ScratchExt Settings</a></li>');

// when said button is clicked load some swag
$('#scratchext-settings').on('click', function() {
  if(scratchext.settingsOpen) {
    return false;
  }
  
  scratchext.settingsOpen = true;
  scratchext.log('Settings opened');
  
  addCSS(scratchext.root+'/css/settings.css');
  $('body').append('<div id="scratchext-settings-pane"></div>').fadeIn();
  
  $('#scratchext-settings-pane').append('<h1>ScratchExt 2.0 Settings');
});
