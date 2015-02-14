scratchext.libraries.operators = {
    name:       'More Operators',
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
              ['R', 'if%b then return %s else return %s', 'if', false, 'true', 'false'],
              ['-'],
              ['b', 'true', 'truth'],
              ['b', 'false', 'lie'],
              ['-'],
              ['R', '%s in uppercase', 'upper', 'hello'],
              ['R', '%s in lowercase', 'lower', 'HELLO'],
              ['-'],
              ['b', '%s is a number', 'number', 'something']
            ],
            
            menus: {
            },
            
            url: scratchext.getWiki(scratchext.libraries.operators.name_lower)
        };
        
        ext.number = function(str) {
            return isNaN(str) === false;
        };
        
        ext.lower = function(str, callback) {
            callback(str.toLowerCase());
        };
        
        ext.upper = function(str, callback) {
            callback(str.toUpperCase());
        };
        
        ext.if = function(bool, vrai, faux, callback) {
          if(bool) {
            callback(vrai);
          } else {
            callback(faux);
          }
        };
        
        ext.truth = function() {
            return true;
        };
        
        ext.lie = function() {
            return false;
        };

        scratchext.install(scratchext.libraries.operators.name, descriptor, ext);
    })({});
}
installExtension();
