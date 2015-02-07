function begin() {
    if(Scratch.INIT_DATA.LOGGED_IN_USER.model===undefined) {
        // user not logged in, log them in
        JSlogin();

        // don't allow closing of popup
        //$('.modal-backdrop').off();

        // change title
        $('.modal-header').html('<h3>Please login to use ScratchExt!</h3>');

        // hide "or join scratch"
        $('a[data-control="registration"]').remove();

        // stop below code
        throw new Error('User not logged in!');
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

    addCSS('http://www.stefanbates.com/scratchext2/code/sweet-alert.css');
    addCSS('http://www.stefanbates.com/scratchext2/code/icon.css');
    addJS('http://www.stefanbates.com/scratchext2/code/sweet-alert.min.js');

    setTimeout(function() {
        scratchext.log('Started', 'green');
        
        // install buttons
        $('.stats').first().append('<div class="action tooltip bottom installscratchext"><span class="scratchexticon icon">ScratchExt</span></div>');
        $('body').append('<div class="installscratchext" id="editorInstall"></div>');

        setInterval(function() {
            if(scratchext.editMode()) {
                $('#editorInstall').show();
            } else {
                $('#editorInstall').hide();
            }
        }, 1);

        $('.installscratchext').on('click', function() {
            if(scratchext.installed.length===0) {
                $.getScript('https://cdn.rawgit.com/grannycookies/scratchext2/master/code/library/install.js');
                swal({
                    title: "Aw, yeah!",
                    text: "ScratchExt 2.0 has been installed!",
                    type: "success",
                    confirmButtonText: 'Okay',
                    allowOutsideClick: true
                });
            } else {
                $.getScript('https://cdn.rawgit.com/grannycookies/scratchext2/master/code/library/install.js');
                swal({
                    title: "Whoa!",
                    text: "What are you doing?\nScratchExt is already installed!",
                    type: "error",
                    confirmButtonText: 'Okay',
                    allowOutsideClick: true
                });
            }
        });
    }, 500);

    // variables and functions for use with extensions
    window.scratchext = {
        username: Scratch.INIT_DATA.LOGGED_IN_USER.model.username,
        creator: Scratch.INIT_DATA.PROJECT.model.creator,
        installed: [],
        id: Scratch.INIT_DATA.PROJECT.model.id
    };

    scratchext.projectJSON = function(id, callback) {
        $.get("http://projects.scratch.mit.edu/internalapi/project/"+id.toString()+"/get/", function(data) {
            callback(data);
        });
    }

    scratchext.editMode = function() {
        return Scratch.FlashApp.isEditMode;
    };

    scratchext.notes = function() {
        var notes;
        if(scratchext.username === scratchext.creator) {
            // the current user made this project
            notes = $('textarea[name=description]').text().replace(/\s/g, "").toUpperCase();
        } else {
            // project was not shared by the current user
            notes = $('.overview:eq(1)').text().replace(/\s/g, "").toUpperCase();
        }

        return notes;
    };

    scratchext.install = function(name, descriptor, extension) {
        if(scratchext.installed.indexOf(name)===-1) {
            scratchext.installed.push(name);
            ScratchExtensions.register(name, descriptor, extension);
        }
    };

    scratchext.log = function(string, color) {
        if(color===undefined)
            color = 'white';
        
        console.log('%c[%cScratchExt%c] %c'+string, 'color: white;', 'color: #986fe6;', 'color: white;', 'color: '+color+';');
    }
}

begin();
