function install() {
    (function(ext) {
        ext._getStatus = function() {
            return {
                status: lights,
                msg: comment
            };
        };
            
        var desc = {
            blocks: [
                [' ', 'load libraries', 'load'],
                ['r', 'libraries loaded', 'loaded'],
                ['-'],
                ['b', 'is scratchext loaded?', 'installed'],
                ['-'],
                ['B', 'click to share project', 'share'],
                [' ', 'change project title to %s', 'title', Scratch.INIT_DATA.PROJECT.model.title]
            ],
                
            menus: {
                
            },
                
            url: 'http://stefanbates.com/scratchext2/help/loader/'
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
           
        ext.load = function() {
            var toLoad = [],
                re = /SCRATCHEXT=[A-Z]*/g,
                s = scratchext.notes().toString(),
                item,
                i = 0;
                
            while(item = re.exec(s)) {
                if(item[0]!=="INSTALL") {
                    toLoad.push(item[0].substring(11, item[0].length).toLowerCase());
                }
            }
            
            // actually load
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

$('.installscratchext').slideUp(250);
setTimeout(function() {
    $('.installscratchext').remove();
}, 240);

install();
