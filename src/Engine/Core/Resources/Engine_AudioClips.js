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
        // check if audio clip is already loaded
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
            req.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                mAudioContext.decodeAudioData(req.response,
                    function (buffer) {
                        gEngine.ResourceMap.asyncLoadCompleted(clipName, buffer);
                    }
                    );
            };
            req.send();
        } else {
            gEngine.ResourceMap.incAssetRefCount(clipName);
        }
    };
    
    var unloadAudio = function(clipName) {
        gEngine.ResourceMap.unloadAsset(clipName);
    };
    
    var playACue = function(clipName) {
        var clipInfo = gEngine.ResourceMap.retrieveAsses(clipName);
        if (clipInfo !== null) {
            // SourceNodes are one use only
            var sourceNode = mAudioContext.createBufferSource();
            sourceNode.buffer = clipInfo;
            sourceNode.connect(mAudioContext.destination);
            sourceNode.start(0);
        }
    };
    
    var playBackgroundAudio = function (clipName) {
        var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
        if (clipInfo !== null) {
            // stop audio if playing
            stopBackgroundAudio();
            mBgAudioNode = mAudioContext.createBufferSource();
            mBgAudioNode.buffer = clipInfo;
            mBgAudioNode.connect(mAudioContext.destination);
            mBgAudioNode.start(0);
        }
    };
    
    var stopBackgroundAudio = function () {
        // check if the audio is playing
        if (mBgAudioNode !== null) {
            mBgAudioNode.stop(0);
            mBgAudioNode = null;
        }
    };
    
    var isBackgroundAudioPlaying = function() {
        return (mBgAudioNode !== null);
    };
    
    var mPublic = {
        initAudioContext: initAudioContext,
        loadAudio: loadAudio,
        unloadAudio: unloadAudio,
        playACue: playACue,
        playBackgroundAudio: playBackgroundAudio,
        stopBackgroundAudio: stopBackgroundAudio,
        isBackgroundAudio: isBackgroundAudioPlaying
    };
    return mPublic;
}());