// this code is run if the user has created the project
scratchext.log('todo settings', 'red');

if(!scratchext.isShared) {
  // project is unshared
  scratchext.log('Project is unshared, replacing share button');
  scratchext.addCSS(scratchext.root + 'css/share-btn.css');
}
