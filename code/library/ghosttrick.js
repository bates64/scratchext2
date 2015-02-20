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
                [' ', '              ', 'spacer'],
                ['R', 'character %m.char : %m.emotion', 'character', 'pico', 'sad']
            ],
            
            menus: {
                char: ['pico', 'nano'],
                emotion: ['normal', 'worried', 'sad', 'happy']
            }
        };

        ext.spacer = function() {
        };
        
        ext.character = function(char, emotion, callback) {
            callback(char + ' ' + emotion);
        };

        scratchext.install('Ghost Trick', descriptor, ext);
    })({});
}
installExtension();
