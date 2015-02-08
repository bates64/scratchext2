var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;
getBrowser();

function getBrowser() {
    // In Opera 15+, the true version is after "OPR/"
    if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
     browserName = "Opera";
     fullVersion = nAgt.substring(verOffset+4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
     browserName = "Opera";
     fullVersion = nAgt.substring(verOffset+6);
     if ((verOffset=nAgt.indexOf("Version"))!=-1)
       fullVersion = nAgt.substring(verOffset+8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
     browserName = "Internet Explorer";
     fullVersion = nAgt.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
     browserName = "Chrome";
     fullVersion = nAgt.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
     browserName = "Safari";
     fullVersion = nAgt.substring(verOffset+7);
     if ((verOffset=nAgt.indexOf("Version"))!=-1)
       fullVersion = nAgt.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
     browserName = "Firefox";
     fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
              (verOffset=nAgt.lastIndexOf('/')) )
    {
     browserName = nAgt.substring(nameOffset,verOffset);
     fullVersion = nAgt.substring(verOffset+1);
     if (browserName.toLowerCase()==browserName.toUpperCase()) {
      browserName = navigator.appName;
     }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
       fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
       fullVersion=fullVersion.substring(0,ix);
    
    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
        fullVersion  = ''+parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion,10);
    }
}

function installExtensionWeb() {
    (function(ext) {
        ext._getStatus = function() {return {status: 2, msg: 'Installed'};};
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
                //['R', 'ask title %s description %s yes %s no %s type %m.types', 'ask', 'Hey there!', 'Is ScratchExt awesome?', 'Of course!', 'No way.', 'success'],
            ],

            menus: {
                types: ['info', 'success', 'warning', 'error'],
                tab: ['in a new tab', 'in this window']
            },
            
            url: scratchext.getWiki('web')
        };
        
        // browser stuff
        ext.browser = function()     {return browserName;};
        ext.version = function()     {return majorVersion;};
        ext.versionlong = function() {return fullVersion;};
        
        //External links
        ext.title = function(src)    {
            document.title = src;
        };
        
        ext.open = function(url, tab) {
            swal({
                title: 'Um...',
                text: 'Would you like to open '+url+'?\n('+tab+')',
                type: 'info',
                showCancelButton: true,
                closeOnCancel: true,
                closeOnConfirm: true,
            }, function() {
                if(tab==="in a new tab")
                    window.open(url);
                else
                    location.href = (url);
            });
        };
        
        ext.useropen = function(src, tab) {
            swal({
                title: 'Um...',
                text: 'Would you like to open '+src+'\'s profile?\n('+tab+')',
                type: 'info',
                showCancelButton: true,
                closeOnCancel: true,
                closeOnConfirm: true,
            }, function() {
                if(tab==="in a new tab")
                    window.open('http://scratch.mit.edu/users/' + src);
                else
                    location.href = ('http://scratch.mit.edu/users/' + src);
            });
        };
        ext.youtube = function(url, tab)  {
            swal({
                title: 'Um...',
                text: 'Would you like to watch a youtube video?\n('+tab+')',
                type: 'info',
                showCancelButton: true,
                closeOnCancel: true,
                closeOnConfirm: true,
            }, function() {
                if(tab==="in a new tab")
                    window.open('http://scratch.mit.edu/discuss/youtube/'+url);
                else
                    location.href = ('http://scratch.mit.edu/discuss/youtube/'+url);
            });
        };
                
        //Project ID
        ext.pID = function()         {return document.URL.substring(32,40);};
        
        //Page info
        ext.tabName = function(src)  {return document.title;};
        ext.url = function()         {return document.URL;};
        ext.net = function()         {return window.navigator.onLine();};

        
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

        scratchext.install('Web', descriptor, ext);
    })({});
}

installExtensionWeb();
