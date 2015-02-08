// this code is run if the user has created the project
if(!scratchext.isShared) {
  // replace share button
  scratchext.log('replacing share button');
  scratchext.addCSS(scratchext.root + 'css/share-btn.css');
  $('html').append('<div id="share-btn" class="editorOnly">Share</div>');
  $('#share-btn').on('click', JSshareProject);
  $('#share').on('click', JSshareProject);
  
  // install notification thing
  scratchext.addCSS(scratchext.root + 'css/scratchext-installed.css');
  $('.public').text('ScratchExt 2.0 is installed!');
  // TODO: in-editor scratchext 2.0 is installed
}

$('#owner').text('you');
