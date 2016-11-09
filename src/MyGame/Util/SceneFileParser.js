function SceneFileParser(sceneFilePath) {
    this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

// This is based on JavaScript XML API
SceneFileParser.prototype._getElm = function(tagElm) {
    var theElm = this.mSceneXml.getElementsByTagName(tagElm);
    if(theElm.length === 0)
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    return theElm;
};

