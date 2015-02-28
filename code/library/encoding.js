function installExtensionEncoding() {
    //Import crypto-js libraries
    function installCrypto(){
        var externalScript;
        var links = [
                    //Hash algorithms
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha512.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha3.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/ripemd160.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/pbkdf2.js',
                    //Encryption
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/rabbit.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/rc4.js',
                    //HMAC
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-md5.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha1.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha256.js',
                    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha512.js',
                    //RSA
                    'http://www.hanewin.net/encrypt/rsa/base64.js',
                    'http://www.hanewin.net/encrypt/rsa/hex.js',
                    'http://www.hanewin.net/encrypt/rsa/rsa.js',
                    'http://www.hanewin.net/encrypt/rsa/keygen.js'];
                     
        for(var i=0; i<links.length; i++){
            externalScript = document.createElement('script'); 
            externalScript.setAttribute('src', links[i]);                 
            document.head.appendChild(externalScript);
        }
    }
    
    installCrypto();
    
    (function(ext) {
        ext._getStatus = function() {return {status: 2, msg: 'Installed'};};
        var descriptor = {
            blocks: [
                ['r', 'encode %s with %m.encoding', 'encode', 'Hello World!', 'Morse'],
                //['r', 'decode %s with %m.encoding', 'decode', '.... . .-.. .-.. --- / .-- --- .-. .-.. -.. ', 'Morse'],
                ['r', 'decode %s with %m.encoding', 'decode', '09786', 'Unicode'],
                ['-'],
                ['r', 'hash %s with %m.hash', 'hash', 'Hello world', 'MD5'],
                //['r', 'hash %s with %m.hash and salt %s', 'saltedHash', 'Hello world', 'MD5'],
                //Use the default join block instead, ie "hash(message + salt)"
                ['-'],
                ['r', 'HMAC %s with %m.hmac and key %s', 'hmac', 'Hello world', 'MD5', '12345'],
                ['-'],
                ['r', 'encrypt %s with %m.cipher and key %s', 'encrypt', 'Hello world', 'AES', '12345'],
                ['r', 'decrypt %s with %m.cipher and key %s', 'decrypt', ' ', 'AES', '12345'],
                //RSA specific blocks
                ['-'],
                [' ', 'generate new RSA key pair %m.rsaKeySize', 'rsaGenkey', '256'],
                ['r', 'RSA encryption key', 'getRSAPublicKey'],
                ['r', 'RSA decryption key', 'getRSAPrivateKey']
            ],

             menus: {
                encoding: ['Morse', 'T-ASCII', 'Unicode', 'Base64', 'Triangulum'],
                hash: ['MD5', 'SHA1', 'SHA256', 'SHA512', 'SHA3', 'RIPEMD160'],
                hmac: ['MD5', 'SHA1', 'SHA256', 'SHA512'],
                //Added an empty object to seperate symmeric and assymetric encryption
                cipher: ['AES', 'DES', 'TripleDES', 'Rabbit', 'RC4', 'RC4Drop', {}, 'RSA'],
                rsaKeySize: ['256', '512', '1024']
            }
        };
        
        //HMAC
        ext.hmac = function(theString, theAlgorithm, theKey){
            switch(theAlgorithm){
                case 'MD5':
                    return CryptoJS.HmacMD5(theString, theKey).toString();
                case 'SHA1':
                    return CryptoJS.HmacSHA1(theString, theKey).toString();
                case 'SHA256':
                    return CryptoJS.HmacSHA256(theString, theKey).toString();
                case 'SHA512':
                    return CryptoJS.HmacSHA512(theString, theKey).toString();
            }
        };
        
        //Encryption
        ext.encrypt = function(theString, theAlgorithm, theKey){
            switch(theAlgorithm){
                case 'AES':
                    return CryptoJS.AES.encrypt(theString, theKey).toString();
                case 'DES':
                    return CryptoJS.DES.encrypt(theString, theKey).toString();
                case 'TripleDES':
                    return CryptoJS.TripleDES.encrypt(theString, theKey).toString();
                case 'Rabbit':
                    return CryptoJS.Rabbit.encrypt(theString, theKey).toString();
                case 'RC4':
                    return CryptoJS.RC4.encrypt(theString, theKey).toString();
                case 'RC4Drop':
                    return CryptoJS.RC4Drop.encrypt(theString, theKey).toString();
                case 'RSA':
                    return(doRSAEncryption(theString, theKey));
            }
        };
        
        ext.decrypt = function(cipherText, theAlgorithm, theKey){
            switch(theAlgorithm){
                case 'AES':
                    return CryptoJS.AES.decrypt(cipherText, theKey).toString(CryptoJS.enc.Utf8);
                case 'DES':
                    return CryptoJS.DES.decrypt(cipherText, theKey).toString(CryptoJS.enc.Utf8);
                case 'TripleDES':
                    return CryptoJS.TripleDES.decrypt(cipherText, theKey).toString(CryptoJS.enc.Utf8);
                case 'Rabbit':
                    return CryptoJS.Rabbit.decrypt(cipherText, theKey).toString(CryptoJS.enc.Utf8);
                case 'RC4':
                    return CryptoJS.RC4.decrypt(cipherText, theKey).toString(CryptoJS.enc.Utf8);
                case 'RC4Drop':
                    return CryptoJS.RC4Drop.decrypt(cipherText, theKey).toString(CryptoJS.enc.Utf8);
                case 'RSA':
                    return(doRSADecryption(cipherText, theKey));
            }
        };
        
        //Hashing
        ext.hash = function(theString, theAlgorithm){
            switch(theAlgorithm){
                case 'MD5':
                    return CryptoJS.MD5(theString).toString();
                case 'SHA1':
                    return CryptoJS.SHA1(theString).toString();
                case 'SHA256':
                    return CryptoJS.SHA256(theString).toString();
                case 'SHA512':
                    return CryptoJS.SHA512(theString).toString();
                case 'SHA3':
                    return CryptoJS.SHA3(theString).toString();
                case 'RIPEMD160':
                    return CryptoJS.SHA3(theString).toString();
            }
        };
        
        //Encoding and decoding
        ext.encode = function(theString, theEncoding){
            theString = theString.toString();
            switch(theEncoding){
                case 'Morse':
                    return stringToMorse(theString);
                case 'ASCII':
                    return stringToASCII(theString);
                case 'T-ASCII':
                    return stringToTASCII(theString);
                case 'Unicode':
                    return stringToUnicode(theString);
                case 'Triangulum':
                    return stringToTriangulum(theString);
            }
        };
        
        ext.decode = function(theString, theEncoding){
            theString = theString.toString();
            switch(theEncoding){
                case 'Morse':
                    return morseToString(theString);
                case 'ASCII':
                    return ASCIIToString(theString);
                case 'T-ASCII':
                    return TASCIIToString(theString);
                case 'Unicode':
                    return unicodeToString(theString);
                case 'Triangulum':
                    return TriangulumToString(theString);
            }
        };
        
        
        
        var rsaPublicKey;
        var rsaPrivateKey;
        
        ext.rsaGenkey = function(keySize){
            doRSAgenkey(keySize);
        };
        
        ext.getRSAPublicKey = function(){
            return(rsaPublicKey);
        };
        
        ext.getRSAPrivateKey = function(){
            return(rsaPrivateKey);
        };
        
        function doRSAgenkey(keySize){
            rsaKeys(keySize);
            //Encode keys
            rsaPublicKey = s2r(b2mpi(rsa_pq) + b2mpi(rsa_e)).replace(/\n/,'');
            rsaPrivateKey = s2r(b2mpi(rsa_p) + b2mpi(rsa_q) + b2mpi(rsa_u) + b2mpi(rsa_d));
            while(rsaPrivateKey.indexOf('\n') > 0){
                rsaPrivateKey = rsaPrivateKey.replace(/\n/,'');
            }
            var endTime=new Date();
        }
        
        function doRSAEncryption(plainText, theKey){
             var mod = [];
             var exp = [];
             //Decode the public key: public modulo and exponent
             var s = r2s(theKey);
             var l = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);
             //Get public mod and exp
             mod = mpi2b(s.substr(0,l+2));
             exp = mpi2b(s.substr(l+2));
             
             var p = plainText + String.fromCharCode(1);
             var pl = p.length;
            
             if(pl > l-3) {
                alert('In this example plain text length must be less than modulus of '+(l-3)+' bytes');
                return;
             }
             //Encrypt
             var enc = RSAencrypt(s2b(p),exp,mod);
             return(s2hex(b2s(enc)));
        }
        
        function doRSADecryption(ciphertext, theKey){
            //Decode the key
            var s = r2s(theKey);
            
            //Decode private prime factor
            var pLen = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);
            var pDec = mpi2b(s.substr(0,pLen+2));
            s = s.substr(pLen+2);
            
            //Decode private prime factor
            var qLen = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);
            var qDec = mpi2b(s.substr(0,qLen+2));
            s = s.substr(qLen+2);
            
            //Decode private exponent
            var uLen = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);
            var uDec = mpi2b(s.substr(0, uLen+2));
            s = s.substr(uLen+2);
            
            //Decode private inverse
            var dDec = mpi2b(s);
            
            //Decrypt message
            var enc = s2b(hex2s(ciphertext));
            var dec = b2s(RSAdecrypt(enc, dDec, pDec, qDec, uDec));
            return(dec.substr(0, dec.length-1));
        }
        
        
        
        //ASCII
        function stringToASCII(theString){
            var theResult = '';
            for(var i=0; i<theString.length; i++){
                var curCode = theString.charCodeAt(i);
                if(0 < curCode && curCode < 999){
                    if(curCode > 99){
                        theResult = theResult + curCode.toString();
                    }
                    else if(curCode > 9){
                        theResult = theResult + '0' + curCode.toString();
                    }
                    else{
                        theResult = theResult + '00' + curCode.toString();
                    }
                }
            }
            return(theResult);
        }
        
        function ASCIIToString(theString){
            var theResult = '';
            for(var i=0; i<theString.length; i+=3){
                var curCode = parseInt(theString.substring(i,i+3));
                theResult = theResult + String.fromCharCode(curCode);
            }
            return(theResult);
        }
        
        //Unicode
        function stringToUnicode(theString){
            var theResult = '';
            for(var i=0; i<theString.length; i++){
                var curCode = theString.charCodeAt(i);
                if(0 < curCode && curCode < 99999){
                    if(curCode > 9999){
                        theResult = theResult + curCode.toString();
                    }
                    else if(curCode > 999){
                        theResult = theResult + '0' + curCode.toString();
                    }
                    else if(curCode > 99){
                        theResult = theResult + '00' + curCode.toString();
                    }
                    else if(curCode > 9){
                        theResult = theResult + '000' + curCode.toString();
                    }
                    else{
                        theResult = theResult + '0000' + curCode.toString();
                    }
                }
            }
            return(theResult);
        }
        
        function unicodeToString(theString){
            var theResult = '';
            for(var i=0; i<theString.length; i+=5){
                var curCode = parseInt(theString.substring(i,i+5));
                theResult = theResult + String.fromCharCode(curCode);
            }
            return(theResult);
        }
        
        //TASCII
        function stringToTASCII(theString){
            var theResult = '';
            for(var i=0; i<theString.length; i++){
                var curCode = theString.charCodeAt(i)-31;
                if(0 < curCode && curCode < 99){
                    if(curCode > 9){
                        theResult = theResult + curCode.toString();
                    }
                    else{
                        theResult = theResult + '0' + curCode.toString();
                    }
                }
            }
            return(theResult);
        }
        
        function TASCIIToString(theString){
            var theResult = '';
            for(var i=0; i<theString.length; i+=2){
                var curCode = parseInt(theString.substring(i,i+2)) + 31;
                theResult = theResult + String.fromCharCode(curCode);
            }
            return(theResult);
        }
        
        //Morse
        function stringToMorse(theString){
            theString = theString.toUpperCase();
            var theResult = '';
            for(var i=0; i<theString.length; i++){
                switch(theString.charAt(i)){
                    case 'A':
                        theResult = theResult + '.-';
                        break;
                    case 'B':
                        theResult = theResult + '-...';
                        break;
                    case 'C':
                        theResult = theResult + '-.-.';
                        break;
                    case 'D':
                        theResult = theResult + '-..';
                        break;
                    case 'E':
                        theResult = theResult + '.';
                        break;
                    case 'F':
                        theResult = theResult + '..-.';
                        break;
                    case 'G':
                        theResult = theResult + '--.';
                        break;
                    case 'H':
                        theResult = theResult + '....';
                        break;
                    case 'I':
                        theResult = theResult + '..';
                        break;
                    case 'J':
                        theResult = theResult + '.---';
                        break;
                    case 'K':
                        theResult = theResult + '-.-';
                        break;
                    case 'L':
                        theResult = theResult + '.-..';
                        break;
                    case 'M':
                        theResult = theResult + '--';
                        break;
                    case 'N':
                        theResult = theResult + '-.';
                        break;
                    case 'O':
                        theResult = theResult + '---';
                        break;
                    case 'P':
                        theResult = theResult + '.--.';
                        break;
                    case 'Q':
                        theResult = theResult + '--.-';
                        break;
                    case 'R':
                        theResult = theResult + '.-.';
                        break;
                    case 'S':
                        theResult = theResult + '...';
                        break;
                    case 'T':
                        theResult = theResult + '-';
                        break;
                    case 'U':
                        theResult = theResult + '..-';
                        break;
                    case 'V':
                        theResult = theResult + '...-';
                        break;
                    case 'W':
                        theResult = theResult + '.--';
                        break;
                    case 'X':
                        theResult = theResult + '-..-';
                        break;
                    case 'Y':
                        theResult = theResult + '-.--';
                        break;
                    case 'Z':
                        theResult = theResult + '--..';
                        break;
                    case '1':
                        theResult = theResult + '.----';
                        break;
                    case '2':
                        theResult = theResult + '..---';
                        break;
                    case '3':
                        theResult = theResult + '...--';
                        break;
                    case '4':
                        theResult = theResult + '....-';
                        break;
                    case '5':
                        theResult = theResult + '.....';
                        break;
                    case '6':
                        theResult = theResult + '-....';
                        break;
                    case '7':
                        theResult = theResult + '--...';
                        break;
                    case '8':
                        theResult = theResult + '---..';
                        break;
                    case '9':
                        theResult = theResult + '----.';
                        break;
                    case '0':
                        theResult = theResult + '-----';
                        break;
                    case ' ':
                        theResult = theResult + '/';
                        break;
                }
                theResult = theResult + ' ';
            }
            return theResult;
        }
        
        function morseToString(theString){
            var theResult = '';
            var theWords = theString.split('/');
            var theLetters;
            for(var i=0; i<theWords.length; i++){
                theLetters = theWords[i].split(' ');
                for(var j=0; j<theLetters.length; j++){
                    switch(theLetters[j]){
                        case '.-':
                            theResult = theResult + 'A';
                            break;
                        case '-...':
                            theResult = theResult + 'B';
                            break;
                        case '-.-.':
                            theResult = theResult + 'C';
                            break;
                        case '-..':
                            theResult = theResult + 'D';
                            break;
                        case '.':
                            theResult = theResult + 'E';
                            break;
                        case '..-.':
                            theResult = theResult + 'F';
                            break;
                        case '--.':
                            theResult = theResult + 'G';
                            break;
                        case '....':
                            theResult = theResult + 'H';
                            break;
                        case '..':
                            theResult = theResult + 'I';
                            break;
                        case '.---':
                            theResult = theResult + 'J';
                            break;
                        case '-.-':
                            theResult = theResult + 'K';
                            break;
                        case '.-..':
                            theResult = theResult + 'L';
                            break;
                        case '--':
                            theResult = theResult + 'M';
                            break;
                        case '-.':
                            theResult = theResult + 'N';
                            break;
                        case '---':
                            theResult = theResult + 'O';
                            break;
                        case '.--.':
                            theResult = theResult + 'P';
                            break;
                        case '--.-':
                            theResult = theResult + 'Q';
                            break;
                        case '.-.':
                            theResult = theResult + 'R';
                            break;
                        case '...':
                            theResult = theResult + 'S';
                            break;
                        case '-':
                            theResult = theResult + 'T';
                            break;
                        case '..-':
                            theResult = theResult + 'U';
                            break;
                        case '...-':
                            theResult = theResult + 'V';
                            break;
                        case '.--':
                            theResult = theResult + 'W';
                            break;
                        case '-..-':
                            theResult = theResult + 'X';
                            break;
                        case '-.--':
                            theResult = theResult + 'Y';
                            break;
                        case '--..':
                            theResult = theResult + 'Z';
                            break;
                        case '.----':
                            theResult = theResult + '1';
                            break;
                        case '..---':
                            theResult = theResult + '2';
                            break;
                        case '...--':
                            theResult = theResult + '3';
                            break;
                        case '....-':
                            theResult = theResult + '4';
                            break;
                        case '.....':
                            theResult = theResult + '5';
                            break;
                        case '-....':
                            theResult = theResult + '6';
                            break;
                        case '--...':
                            theResult = theResult + '7';
                            break;
                        case '---..':
                            theResult = theResult + '8';
                            break;
                        case '----.':
                            theResult = theResult + '9';
                            break;
                        case '-----':
                            theResult = theResult + '0';
                            break;
                        case '/':
                            theResult = theResult + ' ';
                            break;
                    }
                }
                theResult = theResult + ' ';
            }
            return(theResult.substring(0, theResult.length - 1));
        }
        
        //Triangulum
        function stringToTriangulum(theString) {
            theString = theString.toUpperCase();
            var theResult = '';
            for(var i=0; i<theString.length + 1; i++){
                switch(theString.charAt(i)){
                    case 'A':
                        theResult = theResult + 'Ñ¦';
                        break;
                    case 'B':
                        theResult = theResult + 'Æ£';
                        break;
                    case 'C':
                        theResult = theResult + 'Ô“';
                        break;
                    case 'D':
                        theResult = theResult + 'Æ';
                        break;
                    case 'E':
                        theResult = theResult + 'É¤';
                        break;
                    case 'F':
                        theResult = theResult + 'Æ¿';
                        break;
                    case 'G':
                        theResult = theResult + 'É®';
                        break;
                    case 'H':
                        theResult = theResult + 'Æª';
                        break;
                    case 'I':
                        theResult = theResult + 'Æ¾';
                        break;
                    case 'J':
                        theResult = theResult + 'É“';
                        break;
                    case 'K':
                        theResult = theResult + 'Æ¸';
                        break;
                    case 'L':
                        theResult = theResult + 'Æ¦';
                        break;
                    case 'M':
                        theResult = theResult + 'Ï ';
                        break;
                    case 'N':
                        theResult = theResult + 'É¸';
                        break;
                    case 'O':
                        theResult = theResult + 'É ';
                        break;
                    case 'P':
                        theResult = theResult + 'Ô„';
                        break;
                    case 'Q':
                        theResult = theResult + 'Ïª';
                        break;
                    case 'R':
                        theResult = theResult + 'Î¶';
                        break;
                    case 'S':
                        theResult = theResult + 'Êƒ';
                        break;
                    case 'T':
                        theResult = theResult + 'Î”';
                        break;
                    case 'U':
                        theResult = theResult + 'Ñª';
                        break;
                    case 'V':
                        theResult = theResult + 'Ð¶';
                        break;
                    case 'W':
                        theResult = theResult + 'Ò¨';
                        break;
                    case 'X':
                        theResult = theResult + 'Ï›';
                        break;
                    case 'Y':
                        theResult = theResult + 'Ê¡';
                        break;
                    case 'Z':
                        theResult = theResult + 'Í°';
                        break;
                    default: 
                        theResult = theResult + theString.charAt(i);
                }
                theResult = theResult + '';
            }
            return(theResult.substring(0, theResult.length - 1));
        }
        
        function TriangulumToString(theString) {
            theString = theString.toUpperCase();
            var theResult = '';
            for(var i=0; i<theString.length + 1; i++){
                switch(theString.charAt(i)){
                    case 'Ñ¦':
                        theResult = theResult + 'A';
                        break;
                    case 'Æ£':
                        theResult = theResult + 'B';
                        break;
                    case 'Ô“':
                        theResult = theResult + 'C';
                        break;
                    case 'Æ':
                        theResult = theResult + 'D';
                        break;
                    case 'É¤':
                        theResult = theResult + 'E';
                        break;
                    case 'Æ¿':
                        theResult = theResult + 'F';
                        break;
                    case 'É®':
                        theResult = theResult + 'G';
                        break;
                    case 'Æª':
                        theResult = theResult + 'H';
                        break;
                    case 'Æ¾':
                        theResult = theResult + 'I';
                        break;
                    case 'É“':
                        theResult = theResult + 'J';
                        break;
                    case 'Æ¸':
                        theResult = theResult + 'K';
                        break;
                    case 'Æ¦':
                        theResult = theResult + 'L';
                        break;
                    case 'Ï ':
                        theResult = theResult + 'M';
                        break;
                    case 'É¸':
                        theResult = theResult + 'N';
                        break;
                    case 'É ':
                        theResult = theResult + 'O';
                        break;
                    case 'Ô„':
                        theResult = theResult + 'P';
                        break;
                    case 'Ïª':
                        theResult = theResult + 'Q';
                        break;
                    case 'Î¶':
                        theResult = theResult + 'R';
                        break;
                    case 'Êƒ':
                        theResult = theResult + 'S';
                        break;
                    case 'Î”':
                        theResult = theResult + 'T';
                        break;
                    case 'Ñª':
                        theResult = theResult + 'U';
                        break;
                    case 'Ð¶':
                        theResult = theResult + 'V';
                        break;
                    case 'Ò¨':
                        theResult = theResult + 'W';
                        break;
                    case 'Ï›':
                        theResult = theResult + 'X';
                        break;
                    case 'Ê¡':
                        theResult = theResult + 'Y';
                        break;
                    case 'Í°':
                        theResult = theResult + 'Z';
                        break;
                    default: 
                        theResult = theResult + theString.charAt(i);
                }
                theResult = theResult + '';
            }
            return(theResult.substring(0, theResult.length - 1));
        }
        
        scratchext.install('Encoding', descriptor, ext);
        
    })({});
}

installExtensionEncoding();
