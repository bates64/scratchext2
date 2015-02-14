function installExtension() {
    (function(ext) {

        ext._getStatus = function() {
            return {
                status: 2,
                msg: 'Installed'
            };
        };

        var descriptor = {
            blocks: [
                ['R', 'user id of %s', 'userid', scratchext.username]
            ],
            
            menus: {
            },
            
            url: scratchext.getWiki('user')
        };

        ext.userid = function(user, callback) {
          $.get("http://www.stefanbates.com/api/get_userid.php#"+user, function(html) {
          	callback(html);
          });
        };

        scratchext.install('User', descriptor, ext);
    })({});
}
installExtension();
