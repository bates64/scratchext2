scratchext.userlib = {
    advanced: false
};
function installExtension() {
    ScratchExtensions.unregister('User');
    
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
                ['R', 'user id of %s', 'userid', scratchext.username],
            ],
            
            menus: {
            },
            
            url: scratchext.getWiki('user')
        };

        // get userid
        ext.userid = function(user, callback) {
            $.get("http://scratch.mit.edu/site-api/users/all/" + user + "/", function(data) {
                callback(data['user']['pk']);
            });
        };

        scratchext.install('User', descriptor, ext);
    })({});
}
installExtension();
