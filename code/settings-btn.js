scratchext.settings = {};

// add a button to the account menu
$('.logout').before('<li><a id="scratchext-settings" href="javascript:void(0)">ScratchExt Settings</a></li>');

// when said button is clicked load some swag
$('#scratchext-settings').on('click', function() {
  if(scratchext.settingsOpen) {
    return false;
  }
  
  scratchext.settingsOpen = true;
  scratchext.log('Settings: opened');
  
  addCSS(scratchext.css_root+'/css/settings.css');
  $('body').append('<div id="scratchext-settings-overlay"></div>').fadeIn(300);
  $('body').append('<div id="scratchext-settings-pane"><div id="scratchext-settings-wrapper"></div></div>');
  
  $('#scratchext-settings-wrapper').append('<a href="javascript:void(0)" id="scratchext-settings-close">x</a>');
  $('#scratchext-settings-wrapper').append('<h1>ScratchExt 2.0 Settings</h1>');
  
  // actual settings
  $('#scratchext-settings-wrapper').append('<br><input type="checkbox" name="test">test</input>');
  
  //scratchext.settings.load();

  // save button
  $('#scratchext-settings-wrapper').append('<br><h3><a href="javascript:scratchext.settings.save();" id="scratchext-settings-save">Save</a></h3>')

  $('#scratchext-settings-close').on('click', function() {
    if(scratchext.settings.currentData() !== scratchext.settings.savedData()) {
      swal({
        title: "Are you sure?",
        text: "You have unsaved settings.",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Discard changes",
        cancelButtonText: "Cancel",
      }, function() {
        scratchext.settings.close();
      });
    } else {
      scratchext.settings.close();
    }
  });
});

scratchext.settings.load = function() {
  var to = JSON.parse(scratchext.settings.savedData);
  
  var thing;
  if(to[0]===true) {
    thing = 'checked';
  } else {
    thing = undefined;
  }
  
  $('input[name=test]').attr('checked') = thing;
};

scratchext.settings.isChecked = function(name) {
  var x = $('input[name=' + name + ']').attr('checked');
  if(x==='checked')
    return true;
  return false;
};

scratchext.settings.currentData = function() {
  var settings = [];
  
  settings.push(scratchext.settings.isChecked('test'));
  
  return JSON.stringify(settings);
};

scratchext.settings.savedData = function() {
  return localStorage["scratchext-settings"];
};

scratchext.settings.save = function() {
  localStorage["scratchext-settings"] = scratchext.settings.currentData();
};

scratchext.settings.close = function() {
  $('#scratchext-settings-overlay').fadeOut(300);
  $('#scratchext-settings-pane').fadeOut(300);
    
  setTimeout(function() {
    scratchext.log('Settings: closed');
    scratchext.settingsOpen = false;
    $('#scratchext-settings-overlay').remove();
    $('#scratchext-settings-pane').remove();
  }, 300);
};
