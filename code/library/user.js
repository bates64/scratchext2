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
                ['R', 'name of user id %n', 'username', '2406602'],
            ],
            
            menus: {
            },
            
            url: scratchext.getWiki('user')
        };

        // get userid from
        ext.userid = function(user, callback) {
            $.get("http://scratch.mit.edu/site-api/users/all/" + user + "/", function(data) {
                callback(data['user']['pk']);
            });
        };
        
        // get username from id
        ext.username = function(id, callback) {
            $.get("http://scratch.mit.edu/api/v1/user/" + user + "/?format=json", function(data) {
                callback(data['username']);
            });
        };

        scratchext.install('User', descriptor, ext);
    })({});
}
installExtension();
