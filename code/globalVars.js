// variables and functions for use with extensions
var scratchext = {
    username: Scratch.INIT_DATA.LOGGED_IN_USER.model.username,
    creator: Scratch.INIT_DATA.PROJECT.model.creator,
    author: Scratch.INIT_DATA.LOGGED_IN_USER.model.username === Scratch.INIT_DATA.PROJECT.model.creator,
    installed: [],
    id: Scratch.INIT_DATA.PROJECT.model.id,
    root: 'https://rawgit.com/GrannyCookies/scratchext2/master/code/'
};

scratchext.getWiki = function(lib) {
    return 'http://grannycookies.github.io/scratchext2/help/' + lib + '/';
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
        scratchext.log('Installed extension "'+name+'"!');
        ScratchExtensions.register(name, descriptor, extension);
    }
};

scratchext.log = function(string, color) {
    if(color===undefined)
        color = 'white';

    // filter out MSU etc to only allow "debug" to be shown in js console
    console.debug('%c[%cScratchExt%c] %c'+string, 'color: white;', 'color: #986fe6;', 'color: white;', 'color: '+color+';');
}

// tell other file that scratchext has loaded
go();