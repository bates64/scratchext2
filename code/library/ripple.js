(function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.     
    ext.wA = function(query, callback) {
        var realquery = query.replace(" ", "+");
          window.open('http://www.wolframalpha.com/input/?i=' + realquery, '_blank').focus(); 
      callback();        
    };
    ext.sW = function(query, callback) {
        var realquery = query.replace(" ", "_");
          window.open('http://wiki.scratch.mit.edu/wiki/' + realquery, '_blank').focus(); 
      callback();        
    };
    ext.check = function() {
        return true;
    };
    ext.date = function() {
        return Date();
    };
    ext.split = function(str, callback) {
        callback(str.split(""));
    }; 
    ext.notify = function(str, callback) {
        return ScratchExtensions.notify(str);
      callback();        
    };
var descriptor = {
        blocks: [
            ['w', 'Look up %s on Wolfram|Alpha', 'wA', 'a letter'],
            ['w', 'Look up %s on Scratch Wiki', 'sW', 'stuff'],
            ['w', 'Put up banner %s', 'notify', 'Hello'],
            ['-'],
	        ['b', '@greenFlag Ripple Installed?', 'check'],
            ['-'],
            ['r', 'Date', 'date'],
            ['R', 'Split %s by letter', 'split', 'Hello World']
        ]
    };
    // Register the extension
    scratchext.install('Ripple', descriptor, ext);
})();            
