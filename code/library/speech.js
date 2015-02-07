function extSpeech() {
    (function(ext) {
        // When Scratch closes, do this
        ext._shutdown = function() {
            // Nothing here at the moment...
        };
    
        // Tell Scratch if the extension is ready to do stuff
        ext._getStatus = function() {
            if ((new webkitSpeechRecognition()) === undefined) {
                return {
                    status: 1,
                    msg: 'Your browser does not support speech recognition. Try using Google Chrome.'
                }; // Status 1 = Red, Error // Status 1 = Yellow, Not Ready // Status 2 = Green, Ready
            }
    
            return {
                status: 2,
                msg: 'Ready'
            }; // Status 1 = Red, Error // Status 1 = Yellow, Not Ready // Status 2 = Green, Ready
        };
    
        // @SzAmmi's script :)
        ext.lang = '';
    
        // Blocks to add to Scratch
        var descriptor = {
            blocks: [
                // Block type, block name, function name
                [' ', 'start recording', 'startRecording'],
                [' ', 'stop recording', 'stopRecording'],
                [' ', 'set language to %m.languages', 'setLanguage'],
                ['r', 'recognized text', 'getRecognitionText'],
                [' ', 'clear "recognized text"', 'clearText']
            ],
            menus: {
                languages: ['Afrikaans', 'Bahasa Indonesia', 'Bahasa Melayu', 'Català', 'Čeština', 'Deutsch', 'English', 'Español', 'Euskara', 'Français', 'Galego', 'Hrvatski', 'IsiZulu', 'Íslenska', 'Italiano', 'Magyar', 'Nederlands', 'Norsk bokmål', 'Polski', 'Português', 'Română', 'Slovenčina', 'Suomi', 'Svenska', 'Türkçe', 'български', 'Pусский', 'Српски', '한국어', '中文', '日本語', 'ภาษาไทย', 'Lingua latīna'],
                lang_shortcuts: ['af-ZA', 'id-ID', 'ms-MY', 'ca-ES', 'cs-CZ', 'de-DE', 'en', 'es', 'eu-ES', 'fr-FR', 'gl-ES', 'hr_HR', 'zu-ZA', 'is-IS', 'it', 'hu-HU', 'nl-NL', 'nb-NO', 'pl-PL', 'pt', 'ro-RO', 'sk-SK', 'fi-FI', 'sv-SE', 'tr-TR', 'bg-BG', 'ru-RU', 'sr-RS', 'ko-KR', 'cmn', 'ja-JP', 'th-TH', 'la']
            }
        };
    
        // What blocks do go here
        ext.startRecording = function() {
            ext.recognition = new webkitSpeechRecognition();
            ext.result = '';
    
            ext.recognition.continuous = true;
            ext.recognition.interimResults = true;
            ext.recognition.lang = 'en';
            if ((ext.lang).length > 1) {
                ext.recognition.lang = ext.lang;
            }
    
            ext.recognition.onresult = function(event) {
                if (typeof(event.results) == 'undefined') { // This line is very important!
                    ext.recognition.stop();
                    return;
                }
    
                ext.interimResult = '';
    
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        if (event.results[i][0].transcript.length > 0) {
                            ext.result += event.results[i][0].transcript;
                            console.log("[SPEECH RECOGNITION] " + ext.result);
                        }
                    } else {
                        ext.interimResult += event.results[i][0].transcript;
                    }
                }
            };
    
            ext.recognition.start();
        }
    
        ext.stopRecording = function() {
            ext.recognition.stop();
        }
    
        ext.getRecognitionText = function() {
            return ext.result;
        }
    
        ext.clearText = function() {
            ext.result = '';
        }
    
        ext.setLanguage = function(lang) {
            ext.lang = descriptor['menus']['lang_shortcuts'][descriptor['menus']['languages'].indexOf(lang)];
        }
    
        // Name of Scratch Extension goes here
        scratchext.install('Speech', descriptor, ext);
    })({});
}

extSpeech();
