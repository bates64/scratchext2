// this code is run if the user has created the project
if(!scratchext.isShared) {
  if(scratchext.settings.get('share-button-overlay')) {
    // replace share button
    scratchext.log('replacing share button');
    scratchext.addCSS(scratchext.css_root + 'css/share-btn.css');
    $('html').append('<div id="share-btn" class="editorOnly">Share</div>');
    $('#share-btn').on('click', JSshareProject);
    $('#share').on('click', JSshareProject);
  }
  
  // install notification thing
  scratchext.addCSS(scratchext.css_root + 'css/scratchext-installed.css');
  $('.public').text('ScratchExt 2.0 is installed!');
  // TODO: in-editor scratchext 2.0 is installed?
}

if(scratchext.settings.get("you")) {
  $('#owner').text('you');
}