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
    
    var mPublic = {};
    return mPublic;
}());