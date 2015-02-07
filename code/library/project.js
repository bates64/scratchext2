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
                [' ', 'open %s %m.tab', 'open', 'http://scratch.mit.edu', 'in this window'],
                [' ', 'set tab name to %s', 'title', 'Tab'],
                [' ', 'open user profile of %s %m.tab', 'useropen', 'GrannyCookies', 'in a new tab'],
                [' ', 'open youtube video https://www.youtube.com/watch?v= %s %m.tab', 'youtube', 'oHg5SJYRHA0', 'in a new tab'],
                ['-'],
                ['r', 'current URL', 'url'],
                ['r', 'tab name', 'tabName'],
                ['r', 'browser name', 'browser'],
                ['r', 'browser version', 'version'],
                ['r', 'full browser version', 'versionlong'],
                ['-'],
                ['w', 'shout title %s description %s type %m.types', 'message', 'Hello!', 'ScratchExt is awesome!', 'success'],
                ['R', 'ask title %s description %s yes %s no %s type %m.types', 'ask', 'Hey there!', 'Is ScratchExt awesome?', 'Of course!', 'No way.', 'success'],
            ],

            menus: {
                types: ['info', 'success', 'warning', 'error'],
                tab: ['in a new tab', 'in this window']
            },

            url: 'http://stefanbates.com/scratchext2/help/web/'
        };

        // browser stuff
        ext.browser = function() {
            return browserName;
        };
        ext.version = function() {
            return majorVersion;
        };
        ext.versionlong = function() {
            return fullVersion;
        };

        //External links
        ext.title = function(src) {
            document.title = src;
        };

        ext.open = function(url, tab) {
            swal({
                title: 'Um...',
                text: 'Would you like to open ' + url + '?\n(' + tab + ')',
                type: 'info',
                showCancelButton: true,
                closeOnCancel: true,
                closeOnConfirm: true,
            }, function() {
                if (tab === "in a new tab")
                    window.open(url);
                else
                    location.href = (url);
            });
        };

        ext.useropen = function(src, tab) {
            swal({
                title: 'Um...',
                text: 'Would you like to open ' + src + '\'s profile?\n(' + tab + ')',
                type: 'info',
                showCancelButton: true,
                closeOnCancel: true,
                closeOnConfirm: true,
            }, function() {
                if (tab === "in a new tab")
                    window.open('http://scratch.mit.edu/users/' + src);
                else
                    location.href = ('http://scratch.mit.edu/users/' + src);
            });
        };
        ext.youtube = function(url, tab) {
            swal({
                title: 'Um...',
                text: 'Would you like to watch a youtube video?\n(' + tab + ')',
                type: 'info',
                showCancelButton: true,
                closeOnCancel: true,
                closeOnConfirm: true,
            }, function() {
                if (tab === "in a new tab")
                    window.open('http://scratch.mit.edu/discuss/youtube/' + url);
                else
                    location.href = ('http://scratch.mit.edu/discuss/youtube/' + url);
            });
        };

        //Project ID
        ext.pID = function() {
            return document.URL.substring(32, 40);
        };

        //Page info
        ext.tabName = function(src) {
            return document.title;
        };
        ext.url = function() {
            return document.URL;
        };
        ext.net = function() {
            return window.navigator.onLine();
        };


        //Dialogs
        ext.message = function(title, text, type, callback) {
            swal({
                    title: title,
                    text: text,
                    showCancelButton: false,
                    confirmButtonText: 'Okay',
                    type: type
                },
                function(isConfirm) {
                    callback(isConfirm);
                });
        };

        ext.ask = function(title, text, yes, no, type, callback) {
            var callback2me = callback;
            swal({
                    title: title,
                    text: text,
                    showCancelButton: true,
                    cancelButtonText: no,
                    confirmButtonText: yes,
                    type: type
                },
                function(isConfirm) {
                    callback2me(isConfirm);
                });
        };

        scratchext.install('Project', descriptor, ext);
    })({});
}

installExtension();
