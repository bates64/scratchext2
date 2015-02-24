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
              [' ', 'set cursor to %m.cursor', 'set', 'none']
            ],
            
            menus: {
            },
            
            url: scratchext.getWiki(scratchext.libraries.cursor.name_lower)
        };
        
        ext.setv = function() {
            // todo
        }

        scratchext.install(scratchext.libraries.cursor.name, descriptor, ext);
    })({});
}
installExtension();
