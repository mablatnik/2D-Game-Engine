"use strict";

var gEngine = gEngine || { };

gEngine.ResourceMap = (function() {
    var MapEntry = function(rName) {
        this.mAsset = rName;
    };
    
    // resource storage
    var mResourceMap = {};
    
    // number of outstanding load operations
    var mNumOutstandingLoads = 0;
    
    // callback function when all textures are loaded
    var mLoadCompleteCallback = null;
    
    var _checkForAllLoadCompleted = function() {
        if((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)) {
            // ensures the load complete call back will only be called once
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback= null;
            funToCall();
        }
    };
    
    var setLoadCompleteCallback = function(funct) {
        mLoadcompleteCallback = funct;
        _checkForAllLoadCompleted();
    };
    
    var asyncLoadRequest = function(rName) {
        mResourceMap[rName] = new MapEntry(rName);
        ++mNumOutstandingLoads;
    };
    
    var asyncLoadCompleted = function(rName, loadedAsset) {
        if(!isAssetLoaded(rName))
            alert("gEngine.asyncLoadCompleted: [" + rName + "]not in map!");
    mResourceMap[rName].mAsset = loadedAsset;
    --mNumOutstandingLoads;
    _checkForAllLoadCompleted();
    };
    
    var mPublic = {
        
    };
    return mPublic;
}());