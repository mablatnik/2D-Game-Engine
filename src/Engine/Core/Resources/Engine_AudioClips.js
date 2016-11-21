"use strict";

var gEngine = gEngine || {};

gEngine.AudioClips = (function(){
    var mAudioContext = null;
    var mBgAudioNode = null;
    
    // initialize audio context to play sounds
    var initAudioContext = function () {
        try {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            mAudioContext = new AudioContext();
        } catch (e) {alert("Web Audio Is not supported."); }
    };
    
    var loadAudio = function(clipName) {
        if(!(gEngine.ResourceMap.isAssetLoaded(clipName))) {
            // update resources in load counter
            gEngine.ResourceMap.asyncLoadRequested(clipName);
            // asyncrounsly request the data from server
            var req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if ((req.readyState === 4)&&(req.status !== 200)) {
                    alert(clipName + ":loading failed!\n\
                        [Hint: you cannot double click index.html to run this\n\
                        projet." + "The index.html file must be loaded by a web-server.]");
                }
            };
            req.open('GET', clipName, true);
            // request retrieves binary data
            req.responseType = 'arraybuffer';
            req.onload = function() {
                // asynchronously decode
                mAudioContext.decodeAudioData(req.response,
                    function (bufffer) {
                        gEngine.ResourceMap.incAssetRefCount(clipName);
                    }
                );
            };
            req.send();
        } else {
            gEngine.ResourceMap.incAssetRefCount(clipName);
        }
    };
    
    var mPublic = {};
    return mPublic;
}());