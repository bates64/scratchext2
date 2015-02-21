//Powerful JSON library for objects and arrays
//Uses the dot operator syntax

function installExtensionObject() {
    (function(ext) {
        
        ext._shutdown = function() {};
        
        ext._getStatus = function() {return {status: 2, msg: 'Ready'};};
        var descriptor = {
            blocks: [
                //JSON Object functions
                [' ', 'create new object %s', 'doNew', 'obj'],
                [' ', 'set %s to %s', 'doSet', 'obj', 'value'],
                ['r', 'get %s', 'doGet', 'obj'],
                ['r', 'get property %d.listItem of %s', 'doGetProperty', '1', 'obj'],
                ['r', 'get property count of %s', 'doGetPropertyCount', 'obj'],
                ['b', '%s exists?', 'doGetExists', 'obj'],
                ['-'],
                //JSON Array functions
                [' ', 'create new array %s', 'arrNew', 'array'],
                [' ', 'add %s to array %s', 'arrItemApp', 'thing', 'array'],
                [' ', 'delete %d.arrayDeleteMenu of array %s', 'arrItemDel', '1', 'array'],
                [' ', 'insert %s at %d.arrayMenu of array %s', 'arrItemIns', 'thing', '1', 'array'],
                [' ', 'replace %d.arrayMenu of array %s with %s', 'arrItemSet', '1', 'array', 'thing'],
                ['-'],
                ['r', 'item %d.arrayMenu of array %s', 'arrItemGet', '1', 'array'],
                ['r', 'length of array %s', 'arrLen', 'array'],
                ['b', 'array %s contains %s', 'arrContains', 'array', 'thing'],
                ['-'],
                //Deletion
                [' ', 'delete %s', 'doDel', 'obj'],
                [' ', 'delete all objects', 'delAll'],
                // ['-'],
                // // Advanced
                // // Parse JSON
                // [' ', 'set %s to parse %s', 'doSetWithParse', 'obj', '{\"obj\":{}, \"one\":1, \"two\":2, \"three\":3}'],
                // // localStorage?
                // [' ', 'save %s to localstorage', 'doSave', 'obj'],
                // [' ', 'save %s to localstorage as %s', 'doSaveAs', 'obj'],
                // [' ', 'load %s from localstorage', 'doLoad', 'obj'],
                // [' ', 'load %s from localstorage as %s', 'doLoadAs', 'obj'],
                // // Import JSON from URL?
                // [' ', 'set %s to import %s', 'importJSON', 'obj', 'http://www.w3schools.com/json/myTutorials.txt'],
                ['-'],
                // //Debug
                // [' ', 'print object %s', 'printObject', 'obj'],
                // [' ', 'print objects', 'printObjects'],
                // [' ', 'print JSON objects', 'printJSONObjects', '']
            ],
            menus: {
                arrayMenu : ["1",'random',"last"],
                arrayDeleteMenu : ["1",'random',"last",{},"all"]
            }
        };
        
        //Object to store all objects
        var objectHolder = {};
        
        //Returns the object given its path
        function followPath(parentObject, objectPath){
            if(objectPath.indexOf('.') == -1){
                //Gets the variable
                //Return JSON formatted string if object
                return(parentObject[objectPath]);
            }
            else{
                var curChildName = objectPath.substring(0, objectPath.indexOf('.'));
                var nextPath = objectPath.substring(objectPath.indexOf('.') + 1);
                if(parentObject[curChildName] === undefined){
                    //Return undefined if undefined
                    return(undefined);
                }
                //Recursive call
                return(followPath(parentObject[curChildName], nextPath));
            }
        }
        
        //Return the keys of an object given its path
        function getKeys(parentObject, objectPath){
            if(objectPath.indexOf('.') == -1){
                //Gets the variable
                //Return JSON formatted string if object
                return(Object.keys(parentObject[objectPath]));
            }
            else{
                var curChildName = objectPath.substring(0, objectPath.indexOf('.'));
                var nextPath = objectPath.substring(objectPath.indexOf('.') + 1);
                if(parentObject[curChildName] === undefined){
                    //Return undefined if undefined
                    return(undefined);
                }
                //Recursive call
                return(followPath(parentObject[curChildName], nextPath));
            }
        }
        
        //Set the property of an object recursively
        function doSetter(parentObject, objectPath, value){
            // console.log('\n' + objectPath);
            if(objectPath.indexOf('.') == -1){
                //Set the variable
                // console.log(value);
                parentObject[objectPath] = value;
                return(parentObject);
            }
            else{
                var curChildName = objectPath.substring(0, objectPath.indexOf('.'));
                var nextPath = objectPath.substring(objectPath.indexOf('.') + 1);
                //Create the child object if necessary
                if(parentObject[curChildName] === undefined){
                    parentObject[curChildName] = {};
                }
                doSetter(parentObject[curChildName], nextPath, value);
            }
        }
        
        //Delete an object
        function doDelete(parentObject, objectPath){
            // console.log('\n' + objectPath);
            if(objectPath.indexOf('.') == -1){
                //Delete the object
                delete(parentObject[objectPath]);
            }
            else{
                var curChildName = objectPath.substring(0, objectPath.indexOf('.'));
                var nextPath = objectPath.substring(objectPath.indexOf('.') + 1);
                //Recursive call. Do nothing if object is undefined
                if(parentObject[curChildName] !== undefined){
                    doDelete(parentObject[curChildName], nextPath);
                }
                
            }
        }
        
        //Create functions in seperate anon functions so that may can be collapsable
        
        //Functions for JSONObjects
        (function(){
            //Create new object
            ext.doNew = function(objectPath){
                doSetter(objectHolder, objectPath, {});
            };
            
            // //Follows the objectPath and sets the variable to a value
            // ext.doSet = function(objectPath, value){doSetter(objectHolder, objectPath, value);};
            
            // //Parse a JSON formatted string prior to assignment
            // ext.doSetWithParse = function(objectPath, value){doSetter(objectHolder, objectPath, JSON.parse(value));};
            
            //Follows the objectPath and sets the variable to a value
            ext.doSet = function(objectPath, value){
                try{
                    //Attempt to parse json
                    doSetter(objectHolder, objectPath, JSON.parse(value));
                }
                catch(err){
                    //On error keep value as string
                    doSetter(objectHolder, objectPath, value);
                }
            };
            
            ext.doGet = function(objectPath){
                //Follows the objectPath and return the value
                result = followPath(objectHolder, objectPath);
                //Return as JSON if object
                if(typeof(result) == 'object'){
                    return(JSON.stringify(result));
                }
                else{
                    return(result);
                }
            };
            
            //Deletes an object given the path
            ext.doDel = function(objectPath){doDelete(objectHolder, objectPath);};
            //Deletes all objects
            ext.delAll = function(objectPath){objectHolder = {};};
            //Get property by index
            ext.doGetProperty = function(theIndex, objectPath){return(getKeys(objectHolder, objectPath)[theIndex-1])};
            //Get number of properties
            ext.doGetPropertyCount = function(objectPath){return(getKeys(objectHolder, objectPath).length)};
            //Check wether or not an object has a certain property
            ext.doGetExists = function(objectPath){return(followPath(objectHolder, objectPath) !== undefined)};
        })();
        
        //Functions for JSONArrays
        (function(){
            function doArrItemSplice(parentObject, objectPath, theIndex, nReplace, value){
                if(objectPath.indexOf('.') == -1){
                    //Insert the item
                    // console.log(theIndex);
                    if(value === undefined){
                        //Delete item if no value is specified
                        if(typeof(theIndex) != 'number'){
                            if(theIndex == "all"){
                                //Delete all
                                parentObject[objectPath] = [];
                            }
                            else if(theIndex == "random"){
                                // Delete random
                                parentObject[objectPath].splice(Math.floor(Math.random() * parentObject.length), nReplace);
                            }
                            else if(theIndex == "last"){
                                parentObject[objectPath].pop();
                            }
                        }
                        else if(0 <= theIndex && theIndex < parentObject[objectPath].length){
                            //Delete by index
                            parentObject[objectPath].splice(theIndex - 1, nReplace);
                        }
                    }
                    else{
                        //Adding and inserting items
                        if(typeof(theIndex) != 'number'){
                            if(theIndex == "random"){
                                //Insert/replace random
                                parentObject[objectPath].splice(Math.floor(Math.random() * parentObject[objectPath].length), nReplace, value);
                            }
                            else if(theIndex == "last"){
                                //Insert/replace to end
                                parentObject[objectPath].push(value);
                            }
                        }
                        else{
                            //Insert/replace by index
                            parentObject[objectPath].splice(theIndex - 1, nReplace, value);
                        }
                    }
                    return(parentObject);
                }
                else{
                    var curChildName = objectPath.substring(0, objectPath.indexOf('.'));
                    var nextPath = objectPath.substring(objectPath.indexOf('.') + 1);
                    //Return undefined if undefined
                    if(parentObject[curChildName] === undefined){
                        return(undefined);
                    }
                    //Recursive call
                    doArrItemSplice(parentObject[curChildName], nextPath, theIndex, nReplace, value);
                }
            }
            
            //Create new empty array
            ext.arrNew = function(arrPath){doSetter(objectHolder, arrPath, []);};
            //Append item to an array
            ext.arrItemApp = function(theItem, arrPath){doArrItemSplice(objectHolder, arrPath, 'last', 0, theItem);};
            //Delete an element of an array
            ext.arrItemDel = function(theIndex, arrPath){doArrItemSplice(objectHolder, arrPath, theIndex, 1, undefined);};
            //Insert item to an array
            ext.arrItemIns = function(theItem, theIndex, arrPath){doArrItemSplice(objectHolder, arrPath, theIndex, 0, theItem);};
            //Replace an item in an array
            ext.arrItemSet = function(theIndex, arrPath, theItem){doArrItemSplice(objectHolder, arrPath, theIndex, 1, theItem);};
            
            //Get item
            ext.arrItemGet = function(theIndex, arrPath){
                theArray = followPath(objectHolder, arrPath);
                if(theIndex == "random"){
                    return(theArray[Math.floor(Math.random() * theArray.length)]);
                }
                else if(theIndex == "last"){
                    return(theArray[theArray.length - 1]);
                }
                else if(0 < theIndex && theIndex <= theArray.length){
                    return(theArray[theIndex-1]);
                }
                //Default empty string
                return("");
            };
            //Get array length
            ext.arrLen = function(arrPath){return(followPath(objectHolder, arrPath).length)};
            //Get array contains
            ext.arrContains = function(arrPath, theItem){return(followPath(objectHolder, arrPath).indexOf(theItem) > -1)};
        })();
        
        //Debug
        (function(){
            ext.printObject = function(objectPath){console.log(followPath(objectHolder, objectPath));};
            ext.printObjects = function(){console.log(objectHolder);};
            ext.printJSONObjects = function(){return(console.log(JSON.stringify(objectHolder)));};
        })();
        
        scratchext.install('JSON', descriptor, ext);
    })({});
}

installExtensionObject();
