scratchext.settings = {};

scratchext.settings.add = function(name, desc) {
  scratchext.settings.all.push(name);
  $('#scratchext-settings-wrapper').append('<p class="break"><input type="checkbox" id="' + name + '" /><label for="' + name + '"><span class="ui"></span></label>'+ '<span class="scratchext-settings-desc">' + desc + '</span></p>');
};

scratchext.settings.get = function(name) {
  var a = 0;
  while(a<scratchext.settings.all.length && scratchext.settings.all[a] !== name) {
    a++;
  }
  
  return JSON.parse(scratchext.settings.savedData())[a];
}

scratchext.settings.load = function() {
  var to;
  var isOn;
  try {
    isOn = JSON.parse(scratchext.settings.savedData()).length;
  } catch(e) {
    isOn = 0;
  }
  
  if(isOn < scratchext.settings.all.length) {
    // default values are currently all "true"
    to = [];
    var i = isOn;
    while(i<scratchext.settings.all.length) {
      to.push('true');
      i++;
    }
  } else {
    to = JSON.parse(scratchext.settings.savedData());
  }
  
  var i = 0;
  while(i<scratchext.settings.all.length) {
    scratchext.log('Setting "'+scratchext.settings.all[i]+'" has been set to '+to[i], 'orange')
    $('input#' + scratchext.settings.all[i]).attr('checked', to[i]);
    i++;
  }
};

scratchext.settings.isChecked = function(name) {
  var x = $('input#' + name).attr('checked');
  if(x==='checked')
    return true;
  return false;
};

scratchext.settings.currentData = function() {
  var settings = [];
  var i = 0;
  
  while(i<scratchext.settings.all.length) {
    settings.push(scratchext.settings.isChecked(scratchext.settings.all[i]));
    i++;
  }
  
  return JSON.stringify(settings);
};

scratchext.settings.savedData = function() {
  return localStorage["scratchext-settings"];
};

scratchext.settings.save = function() {
  scratchext.log('Settings: saved '+scratchext.settings.all.length+' settings');
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

if(scratchext.settings.savedData()===undefined) {
  // default values are currently all "true"
  var to = [];
  var i = 0;
  while(i<scratchext.settings.all.length) {
    to.push('true');
    i++;
  }
  
  localStorage['scratchext-settings'] = JSON.stringify(to);
}

function loadBtns() {
  scratchext.settings.all = [];
  scratchext.settings.add('editor-button', 'In-editor "install scratchext" button');
  scratchext.settings.add('1-0-button', '"install scratchext 1.0" button & auto-install when detected');
  scratchext.settings.add('share-button-overlay', 'Overlay share button in editor to allow you to share freely');
  scratchext.settings.add('install-notify', 'Display a popup when ScratchExt 2.0 is installed');
  scratchext.settings.load();
}

loadBtns();

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

  loadBtns();

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

// keep this here
add_scratchext_buttons();
