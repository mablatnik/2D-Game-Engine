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

SceneFileParser.prototype.parseSquare = function(sqSet) {
    var elm = this._getElm("Square");
    var I,j,x,y,w,h,r,c,sq;
    for(i=0; i<elm.length; i++) {
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        w = Number(elm.item(i).attributes.getNamedItem("Width").value);
        h = Number(elm.item(i).attributes.getNamedItem("Height").value);
        r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
        c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
        sq = new Renderable(gEngine.DefaultResources.getConstColorShader());
        
        // make sure color array contains numbers
        for(j=0;j<3;j++)
            c[j] = Number(c[j]);
        sq.setColor(c);
        sq.getXform().setPosition(x,y);
        sq.getXform().seRotationInDegree(r);
        sq.getXform().setSize(w,h);
        sqSet.push(sq);
    }
};