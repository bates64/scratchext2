scratchext.ghosttricklib = {
    advanced: false
};
function installExtension() {
    ScratchExtensions.unregister('Ghost Trick');
    
    (function(ext) {
        ext._getStatus = function() {
            return {
                status: 2,
                msg: 'Installed'
            };
        };

        var descriptor = {
            blocks: [
                [' ', '        ', 'spacer'],
            ],
            
            menus: {
            }
        };

        ext.spacer = function() {
        };

        scratchext.install('Ghost Trick', descriptor, ext);
    })({});
}
installExtension();
