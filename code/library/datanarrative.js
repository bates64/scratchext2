/* NarrativeC is an experimental, data extension. Anyone can use NarrativeC without credit in their projects. Added narrative manually
so I could get rid of my repository. Thanks. MSH.
*/
(function () {
    var ext = this;
    ext._shutdown = function () {};
    ext._getStatus = function () {
        return {
            status: 2,
            msg: 'Ready'
        };
    };
    ext.fast = function (func) {
        switch (func) {
            case 'runner':
                return 'Usain St Leo Bolt'; // We return a string instead of just Usain St Leo Bolt.
                // No need for the break, since using return already breaks out of the case.
            case 'clapper':
                return 'Bryan Bednarek';
            case 'car':
                return 'Hennessey Venom GT';
            case 'car officially':
                return 'Bugatti Veyron Super Sport';
        }
    };
    ext.speed = function (func) {
        switch (func) {
            case 'runner':
                return '14.4 m / s';
            case 'clapper':
                return '802 claps / minute';
            case 'car':
                return '270.49 mph';
            case 'car officially':
                return '267.8 mph';
        }
    };
    ext.calories = function (func) {
        switch (func) {
            case 'banana':
                return '105';
            case 'apple':
                return '91';
            case 'milk chocolate bar':
                return '225';
        }
    };
    ext.first = function (func) {
        switch (func) {
            case 'woman in space':
                return 'Valentina Tereshkova';
            case 'man in space':
                return 'Yuri Gagarin';
        }
    };
    ext.firstime = function (func) {
       switch (func) {
            case 'woman in space':
                return '16 June 1963';
            case 'man in space':
                return '12 April 1961';
        }
    };
    ext.longword = function (func) {
        switch (func) {
            case 'Honor...ibus':
                return 'Honorificabilitudinitatibus';
            case 'Anti...tarianism':
                return 'Antidisestablishmentarianism';
            case 'Flocc...ation':
                return 'Floccinaucinihilipilification';
            case 'Pseudo...roidism':
                return 'Pseudopseudohypoparathyroidism';
            case 'Super...docious':
                return 'Supercalifragilisticexpialidocious';
            case 'Pneumo...osis':
                return 'Pneumonoultramicroscopicsilicovolcanoconiosis';
            case 'Lopado...terygon':
                return 'Lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphioparaomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygon';
        }
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'fastest %m.FAST', 'fast', 'car officially'],
            ['r', 'speed of fastest %m.FAST', 'speed', 'clapper'],
            ['r', 'calories in a %m.FOOD', 'calories', 'banana'],
            ['r', 'first %m.FIRST', 'first', 'woman in space'],
            ['r', 'date of first %m.FIRST', 'firstime', 'woman in space'],
            ['r', '%m.LONG', 'longword', 'Honor...ibus']
        ],
        menus: {
            FAST: ['runner', 'clapper', 'car', 'car officially'],
            FOOD: ['banana', 'apple', 'milk chocolate bar'],
            FIRST: ['woman in space', 'man in space'],
            LONG: ['Honor...ibus', 'Anti...tarianism', 'Flocc...ation', 'Pseudo...roidism', 'Super...docious', 'Pneumo...osis', 'Lopado...terygon']
        }
    };
    ScratchExtensions.register('NarrativeC: Data', descriptor, ext);
})();
(function () {
    var ext = this;
    ext._shutdown = function () {};
    ext._getStatus = function () {
        return {
            status: 2,
            msg: 'Ready'
        };
    };
   
    ext.ifelse = function (bool, str, str2) {
   if (bool === true) {
       return str;
   } else {
       return str2;
   }
       };
    ext.installedcheck = function () {
       return true;
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'if %b then report %s else %s', 'ifelse'],
            ['h', '@greenFlag when NarrativeC installed', 'installedcheck']
        ]
    };
    ScratchExtensions.register('NarrativeC: Developer', descriptor, ext);
})();
