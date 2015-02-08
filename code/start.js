function go() {
    scratchext.log('Loaded ScratchExt 2.0');
    
    // install buttons
    $('.stats').first().append('<div class="action tooltip bottom installscratchext"><span class="scratchexticon icon">ScratchExt</span></div>');
    
    addCSS(scratchext.root + '/css/scratchext-editor-btn');
    $('body').append('<div class="installscratchext editorOnly" id="editorInstall">ScratchExt</div>');

    $('.installscratchext').on('click', function() {
        if(scratchext.installed.length===0) {
            // install install library
            $.getScript(scratchext.root + '/library/install.js');
            
            // if the author of the project is you, load the settings library
            if(scratchext.author) {
                $.getScript(scratchext.root + '/settings.js');
            }
            
            //$.getScript(scratchext.root + '/settings.js');
            
            /*swal({
                title: "Aw, yeah!",
                text: "ScratchExt 2.0 has been installed!",
                type: "success",
                confirmButtonText: 'Okay',
                allowOutsideClick: true
            });*/
        } else {
            $.getScript(scratchext.root + '/library/install.js');
            /*swal({
                title: "Whoa!",
                text: "What are you doing?\nScratchExt is already installed!",
                type: "error",
                confirmButtonText: 'Okay',
                allowOutsideClick: true
            });*/
        }
    });
}

function begin() {
    if(Scratch.INIT_DATA.LOGGED_IN_USER.model===undefined) {
        // user not logged in, log them in
        JSlogin();

        // don't allow closing of popup
        //$('.modal-backdrop').off();

        // change title
        $('.modal-header').html('<h3>Please login to use ScratchExt!</h3>');

        // stop below code
        throw new Error('User not logged in!');
    }

    addCSS('http://www.stefanbates.com/scratchext2/code/sweet-alert.css');
    addCSS('http://www.stefanbates.com/scratchext2/code/icon.css');
    addJS('http://www.stefanbates.com/scratchext2/code/sweet-alert.min.js');
    
    setTimeout("$.getScript('https://rawgit.com/GrannyCookies/scratchext2/master/code/globalVars.js')", 1000);
}

function waitfor(test, expectedValue, msec, callback) {
    while(test() !== expectedValue) {
        setTimeout(function() {
            waitfor(test, expectedValue, msec, callback);
        }, msec);
        return;
    }
    
    callback();
}

function addCSS(url) {
    var link = window.document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.getElementsByTagName("HEAD")[0].appendChild(link);
}

function addJS(url) {
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = url;
    document.body.appendChild(js);
}

function isScratchDefined() {
    try {
        return Scratch !== undefined && data !== undefined;
    } catch(e) {
        return false;
    }
}

waitfor(isScratchDefined, true, 100, begin);
