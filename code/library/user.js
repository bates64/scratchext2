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

        // get userid
        ext.userid = function(user, callback) {
            var img;
            var data = window.location.href;
            var username = data.substring(data.match('#').index+1, data.length);
            $.get("http://scratch.mit.edu/users/"+username+'/', function(html) {
            	data = html;
            	var avatar = data.substring(data.match('<div class="avatar">').index, data.match('" width="55" height="55"').index)+'" id="avatarimagetemp">';
            	$("html").append("<div id='#avatartemp' style='display:none;'>"+avatar+"</div>");
                var src = $("#avatarimagetemp").attr("src");
                var userid = src.substr(38, 7);
                
                callback(userid);
            });
        };

        scratchext.install('User', descriptor, ext);
    })({});
}
installExtension();
