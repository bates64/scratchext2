// this code is run if the user has created the project

if(!scratchext.isShared) {
  // project is unshared
  scratchext.log('replacing share button');
  scratchext.addCSS(scratchext.root + 'css/share-btn.css');
  
  $('html').append('<div id="share-btn" class="editorOnly">Share</div>');
  $('#share-btn').on('click', JSshareProject);
  
  $('#share').on('click', JSshareProject);
  
  $('.public').text('ScratchExt 2.0 has overwritten the share buttons to allow you to share freely.').
}
