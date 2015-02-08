// this code is run if the user has created the project

if(!scratchext.isShared) {
  // project is unshared
  scratchext.log('replacing share button VER 0.1');
  scratchext.addCSS(scratchext.root + 'css/share-btn.css');
  
  $('html').append('<div id="share-btn" class="editorOnly">Share</div>');
  $('#share-btn').on('click', JSshareProject);
}
