"use strict";

var gEngine = gEngine || {};

gEngine.TextFileLoader = (function () {
    // create an immutable object
    var eTextFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1
    });

    var loadTextFile = function (fileName, fileType, callbackFunction) {
        if (!(gEngine.ResourceMap.isAssetLoaded(fileName))) {
            // update resource load counter
            gEngine.ResourceMap.asyncLoadRequested(fileName);
            // asyncrounsly request the data from server
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(fileName + ":loading failed! \n\
                    [Hint: you cannot dounle click index.html to run project." +
                        "The index.html file must be loaded by a web server.]");
                }
            };
            req.open('GET', fileName, true);
            req.setRequestHeader('Content-Type', 'text/xml');
            req.onload = function () {
                var fileContent = null;
                if (fileType === eTextFileType.eXMLFile) {
                    var parser = new DOMParser();
                    fileContent = parser.parseFromString(req.responseText, "text/xml");
                } else {
                    fileContent = req.responseText;
                }
                gEngine.ResourceMap.asyncLoadCompleted(fileName, fileContent);
                if ((callbackFunction !== null) && (callbackFunction !== undefined))
                    callbackFunction(fileName);
            };
            req.send();
        } else {
            if ((callbackFunction !== null) && (callbackFunction !== undefined))
                callbackFunction(fileName);
        }
    };

    // unloading function
    var unloadTextFile = function (fileName) {
        gEngine.ResourceMap.unloadAsset(fileName);
    };

    // public interface
    var mPublic = {
        loadTextFile: loadTextFile,
        unloadTextFile: unloadTextFile,
        eTextFileType: eTextFileType
    };

    return mPublic;
}());