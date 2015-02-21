function installExtensionProject() {
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
                [' ', 'change mode to %m.modes', 'changeMode', 'fullscreen'],
                ['b', '%m.modes', 'mode', 'viewer'],
                ['-'],
                //[' ', 'hide top bar and go into embed mode', 'hide'],
                ['r', 'project id', 'pID'],
                ['r', 'project notes and credits', 'notes'],
                ['r', 'project instructions', 'instructions'],
                ['b', 'is project "new"?', 'new'],
                ['-'],
                ['r', 'is user an admin?', 'admin']


            ],
            
            menus: {
                modes: ['viewer', 'fullscreen', 'editor']
            },
            
            url: scratchext.getWiki('project')
        };

        // gets "new" ness
        ext.new = function() {
            return Scratch.INIT_DATA.PROJECT.is_new;
        };

        // gets notes and credits of project
        ext.notes = function() {
            return Scratch.INIT_DATA.PROJECT.model.notes;
        };

        // gets notes and credits of project
        ext.instructions = function() {
            return Scratch.INIT_DATA.PROJECT.model.credits;
        };

        // gets adminised status of current user
        ext.admin = function() {
            return Scratch.INIT_DATA.ADMIN;
        };

        // get username
        ext.user = function() {
            return Scratch.INIT_DATA.LOGGED_IN_USER.model ? Scratch.INIT_DATA.LOGGED_IN_USER.model.username : null;
        };

        // frame blocks
        ext.trigger = function() {
            hatsComplete = totalHats;
        };
        ext.setHats = function(hats) {
            totalHats = hats;
        };
        ext.runFrame = function() {
            run = true;
            // wait until all completeFrame blocks have set their var to false
            run = false;
        };
        ext.whenFrame = function() {
            if (hatsComplete === totalHats) {
                hatsComplete = 0;
                return true;
            }
            return false;
        };
        ext.completeFrame = function() {
            hatsComplete++;
        };

        //Get viewing mode
        ext.mode = function(mode) {
            if (mode === 'fullscreen') {
                return document.URL.slice(-11) === '#fullscreen';
            } else if (mode === 'editor') {
                return Scratch.FlashApp.isEditMode;
            } else {
                return document.URL.slice(-7) != '#editor' && document.URL.slice(-11) != '#fullscreen';
            }
        };

        //Set viewing mode
        ext.changeMode = function(mode) {
            switch (mode) {
                case 'viewer':
                    Scratch.FlashApp.setEditMode(false);
                    break;
                case 'fullscreen':
                    window.location = document.URL.slice(0, 41) + '#fullscreen';
                    break;
                case 'editor':
                    Scratch.FlashApp.setEditMode(true);
                    break;
            }
        };

        //Get project ID
        ext.pID = function() {
            return document.URL.substring(32, 40);
        };

        ext.close = function() {
            document.body.innerHTML = document.body.innerHTML.replace('viewer', 'Project Closed.');
            document.body.innerHTML = document.body.innerHTML.replace('editor', 'Project Closed.');
            document.body.innerHTML = document.body.innerHTML.replace('viewer editor', 'Project Closed.');
        };

        scratchext.install('Project', descriptor, ext);
    })({});
}
installExtensionProject();
