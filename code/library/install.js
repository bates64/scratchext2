if(scratchext.settings.get('1-0-button')) {
    if(scratchext.projectExtensions.indexOf("– Import –") > -1) {
        scratchext.log('Found ScratchExt 1.0 trace, loading library');
        if(scratchext.author) { //This setProjectBanner should be implemented in old ScratchExt too.
            JSsetProjectBanner("Please note that ScratchExt is now obsolete, you should use <a href='http://grannycookies.github.io/scratchext2/help/'>ScratchExt 2</a> blocks instead!");
            $.getScript('http://www.stefanbates.com/library/install.js');
        } else if (scratchext.projectExtensions.length > 1) { //Basic check to know if the project does anything (It's not perfect but there's no need for it to work perfectly) *Can be removed
            $.getScript('http://www.stefanbates.com/library/install.js');
        }
    } else {
        // just in case
        scratchext.log('Could not find ScratchExt 1.0 trace, adding button');
        $('a[href=#editor]').before('<a href="javascript:$(\'#load-scratchext-1\').fadeOut();$.getScript(\'http://www.stefanbates.com/library/install.js\');"><div class="button" style="padding:0 5px" id="load-scratchext-1">ScratchExt 1.0</div></a>');
    
    }
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
        ext._shutdown = function() {};
        
        ext._getStatus = function() {
            return {
                status: lights,
                msg: comment
            };
        };
        
        window.toLoad = [];
        var advanced = scratchext.settings.get('development');
            
        var desc = {
            blocks: [
                [' ', 'prepare library %m.all', 'load1', 'web'],
                ['w', 'load libraries from the %m.from', 'load', 'prepare blocks'],
                ['-'],
                ['b', 'scratchext ready?', 'installed'],
            ],
                
            menus: {
                from: ['notes and credits', 'prepare blocks'],
                
                // every scratchext lib must go here
                all: ['web', 'project', 'keys', 'speech', 'data', 'user', 'operators'],
                
                // every custom lib must go here
                custom: ['ripple', 'datanarrative', 'ghosttrick'],
                
                // every indev scratchext lib must go here
                indev: ['json', 'cursor']
            },
                
            url: scratchext.getWiki('loader')
        };
        
        if(!advanced) {
            var block1 = [' ', 'prepare custom library %m.custom', 'custom', 'ripple'];
            desc.blocks.insert(1, block1);
            var block2 = [' ', 'prepare indev library %m.indev', 'indev', 'json'];
            desc.blocks.insert(2, block2);
        }
        
        ext.custom = function(lib) {
            toLoad.push(lib.toLowerCase());
        }
        
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
           
        ext.load = function(type, callback) {
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
            scratchext.log('Loading libaries:', 'cyan');
            var i = 0;
            while(i<toLoad.length) {
                var toInstall = toLoad[i]+'.js';
                scratchext.log(toInstall, 'cyan');
                $.getScript(scratchext.root+'/library/'+toInstall);
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
            
            toLoad = [];
            
            callback();
        };
        
        ext.loaded = function() {
            return scratchext.installed.length-1;
        };
            
        scratchext.install('Loader', desc, ext);
    })({});
}

var lights = 1;
var comment = 'No libraries installed...';

install();

$('.installscratchext').fadeOut(100, function(){$(this).remove()});

if(scratchext.settings.get('install-notify')) {
    swal({
        title: 'ScratchExt 2.0 installed!',
        desc: 'ScratchExt 2.0 has been installed into "More Blocks".',
        type: 'success'
    })
}
