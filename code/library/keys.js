function extKeys() {
    var keyDetection = false;
    var keysPressed = [];
    (function(ext) {

        ext._shutdown = function() {};

        ext._getStatus = function() {
            return {status: 2, msg: 'Ready'};
        };
        
        if(keyDetection === false) {
            $(document).on("keyup keydown", function(e) {
                switch(e.type) {
                    case "keydown" :
                        keysPressed[e.keyCode] = true;
                        break;
                    case "keyup" :
                        keysPressed[e.keyCode] = false;
                        break;
                }
            }).on('mousedown', function(e) {
                if(e.which === 3) {
                    keysPressed['right'] = true;
                }
                
                if(e.which === 2) {
                    keysPressed['middle'] = true;
                }
            }).on('mouseup', function(e) {
                if(e.which === 3) {
                    keysPressed['right'] = false;
                }
                
                if(e.which === 2) {
                    keysPressed['middle'] = false;
                }
            });
            
            function isKeyPressed(code) {
                return keysPressed[code];
            }
            
            function menuCheck(key) {
                switch(key) {
                    case 'shift':
                        return isKeyPressed(16);
                    case 'ctrl':
                        return isKeyPressed(17);
                    case 'enter':
                        return isKeyPressed(13);
                    case 'backspace':
                        return isKeyPressed(8);
                    case 'alt':
                        return isKeyPressed(18);
                    case 'tab':
                        return isKeyPressed(9);
                    case 'caps':
                        return isKeyPressed(20);
                    case 'esc':
                        return isKeyPressed(27);
                    case 'any':
                        return keysPressed.indexOf(true) > -1;
                    default:
                        return isKeyPressed(key_code.charCodeAt(0));
                }
            }
            keyDetection = true;
        }
        
        var descriptor = {
            blocks: [
                //['b', 'right mouse down?', 'right'],
                //['b', 'middle mouse down?', 'middle'],
                //['-'],
                ['h', 'when key %m.keys is pressed', 'h_check_key', 'shift'],
                ['b', 'key %m.keys pressed?', 'check_key', 'shift'],
                ['-'],
                //['R', '%n to keyname', 'toName', '72'],
                //['R', '%s to keycode', 'toCode', 'H'],
                //['r', 'keycode currently down', 'which_key']
            ],
                
            menus: {
                keys: ['shift', 'ctrl', 'enter', 'backspace', 'alt', 'tab', 'caps', 'esc', 'any'],
            },
            
            url: scratchext.getWiki('keys')
        };
     
        last_h_value = false;
        
        ext.right = function() {
            return isKeyPressed('right');
        };
        
        ext.middle = function() {
            return isKeyPressed('middle');
        };
        
        ext.toCode = function(key, callback) {
            callback(key.charCodeAt(0));
        };
        
        ext.toName = function(key, callback) {
            callback(String.fromCharCode(key));
        };
    
        ext.h_check_key = function(key) {
            if(!last_h_value && menuCheck(key) === true) {
                last_h_value = true;
                return true;
            } else {
                last_h_value = false;
                return false;
            }
        };
    
        ext.check_key = function(key_code) {
            if (isNaN(Number((key_code)))) {
                return menuCheck(key_code);
            } else {
                return isKeyPressed(key_code);
            }
        };

        ext.which_key = function() {
            key = keysPressed.indexOf(true);
            return key;
        };
     
        scratchext.install('Keys', descriptor, ext);
    })({});
}

extKeys();
