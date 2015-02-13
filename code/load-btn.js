function go() {
    scratchext.log('Loaded ScratchExt 2.0');
    scratchext.log('Root folder: '+scratchext.root, 'orange');
    
    // settings button
    $.getScript(scratchext.root + 'settings-btn.js');
    
    // install buttons
    $('.stats').first().append('<div class="action tooltip bottom installscratchext"><span class="scratchexticon icon">ScratchExt</span></div>');
    
    addCSS(scratchext.css_root + '/css/scratchext-editor-btn.css');
    $('body').append("<div class=\"installscratchext editorOnly\" id=\"editorInstall-new\" onclick=\"$(this).css({'background-color':'#632D99', 'color':'#fff', 'font-weight':'bold'})\"><div></div><span>ScratchExt</span></div>");

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
    
    addCSS('http://www.stefanbates.com/scratchext2/code/icon.css');
    //The next addCSS call fixes a glitch that makes the overview scrollbar unusable. (it's a bug in Scratch's website that started today)
    addCSS('https://cdn.rawgit.com/GrannyCookies/scratchext2/master/code/css/overview-fix.css');

    // sweet prompt and sweet alert
    addJS('https://cdn.rawgit.com/gabrielederosa/SweetPrompt/master/lib/sweet-alert.min.js');
    addCSS('https://cdn.rawgit.com/TGB-Extension/TGB-Extension.github.io/master/TGB/Plugins/sweet-alert.css');
    addJS('https://cdn.rawgit.com/gabrielederosa/SweetPrompt/master/lib/sweet-prompt.min.js');
    addCSS('https://cdn.rawgit.com/gabrielederosa/SweetPrompt/master/lib/sweet-prompt.css');
    
    setTimeout("$.getScript('http://scratchextproxy.x10.mx/?p=globalVars.js')", 1000);
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
        return Scratch.FlashApp.model !== undefined && data !== undefined;
    } catch(e) {
        return false;
    }
}

waitfor(isScratchDefined, true, 250, begin);
