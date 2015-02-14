// use this when making new extensions
var name = 'Default';
var name_lower = 'default';
scratchext.libraries.name = {
    name: name,
    advanced: false
};
function installExtension() {
    ScratchExtensions.unregister(name);
    
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
            
            url: scratchext.getWiki(name_lower)
        };
        
        if(scratchext.libraries.name.advanced) {
            descriptor.blocks.push([' ', 'advanced is on!', 'nothing']);
        } else {
            descriptor.blocks.push(['!', 'advanced (test)', 'advanced']);
        }
        
        // turn advanced on and reload extension
        ext.advanced = function() {
            scratchext.libraries.name.advanced = true;
            installExtension();
        }

        scratchext.install(name, descriptor, ext);
    })({});
}
installExtension();
