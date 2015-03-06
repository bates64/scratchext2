scratchext.libraries.operators = {
    name:       'More Operators',
    name_lower: 'operators',
    advanced:   false
};
function installExtension() {
    ScratchExtensions.unregister(scratchext.libraries.operators.name);
    
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
              ['R', 'if%b then return %s else return %s', 'if', false, 'true', 'false'],
              ['-'],
              ['b', 'true', 'truth'],
              ['b', 'false', 'lie'],
              ['-'],
              ['R', '%s in uppercase', 'upper', 'hello'],
              ['R', '%s in lowercase', 'lower', 'HELLO'],
              ['-'],
              ['b', '%s is a number', 'number', 'something'],
              ['R', 'replace all %s in %s with %s', 'replaceAllOf', '!', 'hello world!', '.'],
              ['-'],
              ['R', 'first %n letters of %s', 'firstSub', '5', 'hello world'],
              ['R', 'last %n letters of %s', 'lastSub', '5', 'hello world'],
              ['R', 'letters %n through %n of %s', 'sub', '8', '12', 'scratchext 2.0']
              ['-']
              ['r', '%m.math', 'mathe', 'pi']
            ],
            
            menus: {
                math: ['e', 'pi']
            },
            
            url: scratchext.getWiki(scratchext.libraries.operators.name_lower)
        };
        
        ext.mathe = function(i){
            if(i === 'e') {return Math.e}
            if(i === 'pi') {return Math.pi}
        }
        
        ext.lastSub = function(start, str, callback) {
            var end = str.length;
            callback(str.substr(0, start+1));
        };
        
        ext.sub = function(start, end, str)
        {
            callback(str.substr(start+1, end+1));
        };
        
        ext.replaceAllOf = function(all, str, witdh, callback) {
            callback(str.replaceAll(all, witdh));
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
