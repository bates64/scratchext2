// use this when making new extensions
scratchext.libraries.cursor = {
    name:       'Cursor',
    name_lower: 'cursor'
};
function installExtension() {
    ScratchExtensions.unregister(scratchext.libraries.cursor.name);
    
    (function(ext) {

        ext._shutdown = function() {};

        ext._getStatus = function() {
            return {
                status: 2,
                msg: 'Installed'
            };
        };

        var descriptor = {
            blocks: [
              [' ', 'set cursor to %m.cursor', 'setv', 'none'],
              [' ', 'set cursor to URL %s', 'seturl', 'somecursor.png']
            ],
            
            menus: {
                cursor: ['none', 'default', 'help', 'pointer', 'wait', 'progress', 'crosshair', 'move', 'not-allowed', 'all-scroll', 'zoom-in', 'zoom-out', 'grab', 'grabbing']
            },
            
            url: scratchext.getWiki(scratchext.libraries.cursor.name_lower)
        };
        
        ext.setv = function(name) {
            $('.stage').css('cursor', name);
        };
        
        ext.seturl = function(url) {
            $('.stage').css('cursor', 'url(' + name + ')');
        };

        scratchext.install(scratchext.libraries.cursor.name, descriptor, ext);
    })({});
}
installExtension();
scratchext.log("Cursor stuffs haz been loaded yey");
