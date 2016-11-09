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

SceneFileParser.prototype.parseCamera = function () {
    var camElm = this._getElm("Camera");
    var cx = Number(camElm[0].getAttribute("CenterX"));
    var cy = Number(camElm[0].getAttribute("CenterY"));
    var w = Number(camElm[0].getAttribute("Width"));
    var viewport = camElm[0].getAttribute("Viewport").split(" ");
    var bgColor = camElm[0].getAttribute("BgColor").split(" ");
    
    // make sure viewport and color are numbers
    for(var j = 0; j<4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }
    
    var cam = new Camera(
            vec2.fromValues(cx, cy),
            w,
            viewport);
            
            cam.setBackgroundColor(bgColor);
            return cam;
};