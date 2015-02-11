if(scratchext.projectExtensions.indexOf("– Import –") > -1) {
    if(scratchext.author) { //This setProjectBanner should be implemented in old ScratchExt too.
        JSsetProjectBanner("Please note that ScratchExt is now obsolete, you should use <a href='http://grannycookies.github.io/scratchext2/help/'>ScratchExt 2</a> blocks instead!");
        $.getScript('http://www.stefanbates.com/library/install.js');
    } else if (scratchext.projectExtensions.length > 1) { //Basic check to know if the project does anything (It's not perfect but there's no need for it to work perfectly) *Can be removed
        $.getScript('http://www.stefanbates.com/library/install.js');
    }
} else {
    // just in case
    $('.buttons').append('<a href="javascript:$.getScript(\'http://www.stefanbates.com/library/install.js\');"><div class="button" id="load-scratchext-1">ScratchExt 1.0</div></a>')
}

function createRandomWord(length) {
    var consonants = 'bcdfghjklmnpqrstvwxyz',
        vowels = 'aeiou',
        rand = function(limit) {
            return Math.floor(Math.random()*limit);
        },
        i, word='', length = parseInt(length,10),
        consonants = consonants.split(''),
        vowels = vowels.split('');
    for (i=0;i<length/2;i++) {
        var randConsonant = consonants[rand(consonants.length)],
            randVowel = vowels[rand(vowels.length)];
        word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
        word += i*2<length-1 ? randVowel : '';
    }
    return word;
}

function install() {
    (function(ext) {
        ext._getStatus = function() {
            return {
                status: lights,
                msg: comment
            };
        };
        
        window.toLoad = [];
            
        var desc = {
            blocks: [
                [' ', 'load libraries from the %m.from', 'load', 'notes and credits'],
                ['r', 'total libraries loaded', 'loaded'],
                ['-'],
                [' ', 'prepare library %m.all', 'load1', 'all'],
                [' ', 'run custom script %s', 'unsafe', 'somefile.js'],
                ['-'],
                ['b', 'scratchext is ready', 'installed'],
                //['B', 'TEMP: click to share project', 'share'],
                //[' ', 'TEMP: change project title to %s', 'title', Scratch.INIT_DATA.PROJECT.model.title]
            ],
                
            menus: {
                from: ['notes and credits', 'prepare blocks'],
                
                // every scratchext lib must go here
                all: ['all', 'web', 'project', 'keys', 'speech', 'ripple']
            },
                
            url: scratchext.getWiki('loader')
        };
        
        ext.unsafe = function(src) {
            var key = createRandomWord(4);
            //sweetPrompt('Custom Script', 'Are you sure you want to install a custom script?\nType "' + key + '" below if so.', 'No thank you', 'Done', function(result) {
                //if(key===result) {
                    $.getScript(src);
                //}
            //});
        }
        
        ext.load1 = function(lib) {
            toLoad.push(lib.toLowerCase());
        };
        
        ext.title = function(e) {
            JSeditTitle(e);
        };
        
        ext.share = function() {
            JSshareProject();
        };
        
        ext.installed = function() {
            return true;
        };
           
        ext.load = function(type) {
            if(type==='prepare blocks') {
                // todo, maybe
            } else {
                var re = /SCRATCHEXT=[A-Z]*/g,
                s = scratchext.notes().toString(),
                item;
                
                while(item = re.exec(s)) {
                    if(item[0]!=="INSTALL") {
                        toLoad.push(item[0].substring(11, item[0].length).toLowerCase());
                    }
                }
            }
            
            // actually load
            scratchext.log('Loading libaries:\n'+toLoad, 'red');
            var i = 0;
            while(i<toLoad.length) {
                $.getScript('https://rawgit.com/grannycookies/scratchext2/master/code/library/'+toLoad[i]+'.js').fail(function() {
                    lights = 3;
                    comment = 'Could not load a library.';
                    swal({
                        title: "Whoa!",
                        text: "Something went wrong while trying to load a library!",
                        type: "error",
                        confirmButtonText: 'Okay'
                    });
                });
                i++;
            }
            
            // setup error messages
            if(toLoad.length===0) {
                lights = 3;
                comment = 'No libraries to load!';
            } else {
                lights = 2;
                comment = 'Loaded '+toLoad.length+' libraries!';
            }
            
        };
        
        ext.loaded = function() {
            return scratchext.installed.length-1;
        };
            
        scratchext.install('Loader', desc, ext);
    })({});
}

var lights = 1;
var comment = 'No libraries installed...';

setTimeout(function() {
    $('.installscratchext').fadeOut(100, function(){$(this).remove()});
}, 100);

install();
