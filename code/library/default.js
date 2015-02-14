// use this when making new extensions
scratchext.libraries.default = {
    name:       'Default',
    name_lower: 'default',
    advanced:   false
};
function installExtension() {
    ScratchExtensions.unregister(scratchext.libraries.default.name);
    
    (function(ext) {

        ext._getStatus = function() {
            return {
                status: 2,
                msg: 'Installed'
            };
        };

        var descriptor = {
            blocks: [
            ],
            
            menus: {
            },
            
            url: scratchext.getWiki(scratchext.libraries.default.name_lower)
        };
        
        if(scratchext.libraries.default.advanced) {
            descriptor.blocks.push([' ', 'advanced is on!', 'nothing']);
        } else {
            descriptor.blocks.push(['!', 'advanced (test)', 'advanced']);
        }
        
        // turn advanced on and reload extension
        ext.advanced = function() {
            scratchext.libraries.default.advanced = true;
            installExtension();
        }

        scratchext.install(scratchext.libraries.default.name, descriptor, ext);
    })({});
}
installExtension();
