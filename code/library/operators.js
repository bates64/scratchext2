// maths etc
scratchext.libraries.operators = {
    name:       'Operators and Maths',
    name_lower: 'operators',
    advanced:   false
};
function installExtension() {
    ScratchExtensions.unregister(scratchext.libraries.operators.name);
    
    (function(ext) {

        ext._getStatus = function() {
            return {
                status: 2,
                msg: 'Installed'
            };
        };

        var descriptor = {
            blocks: [
              ['w', 'if %b then return %s else return %s', 'if', 'true', 'false']
            ],
            
            menus: {
            },
            
            url: scratchext.getWiki(scratchext.libraries.operators.name_lower)
        };
        
        ext.if = function(bool, vrai, faux, callback) {
          if(bool) {
            callback(vrai);
          } else {
            callback(faux);
          }
        };

        scratchext.install(scratchext.libraries.operators.name, descriptor, ext);
    })({});
}
installExtension();
