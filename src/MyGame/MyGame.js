"use strict";

function MyGame() {
    // scene file name
    this.KSceneFile = "assets/scene.xml";
    
    // create array to hold all renderable objects
    this.mSqSet = new Array();
    
    // The camera to view the scene
    this.mCamera = null;
}

MyGame.prototype.loadScene = function() {
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, 
                                        gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function() {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
};

MyGame.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    // parse the camera
    this.mCamera = sceneParser.parseCamera();
    // parse all the squares
    sceneParser.parseSquare(this.mSqSet);
};

// update function, updates the application state
MyGame.prototype.update = function () {
    // move the white square
    var whiteXform = this.mWhiteSq.getXform();
    var deltaX = 0.05;
    // test for white square movement
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if(whiteXform.getXPos() > 30)
            whiteXform.setPosition(10,60);
        whiteXform.incXPosBy(deltaX);
    }
    // test for white square rotation
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
        whiteXform.incRotationByDegree(1);
    
    var redXform = this.mRedSq.getXform();
    // test for pulsing red square
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if(redXform.getWidth() > 5)
            redXform.setSize(2,2);
        redXform.incSizeBy(0.05);
    }
};

// draw process
MyGame.prototype.draw = function() {
    // clear the canvas
    gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
    
    // set up the view projection
    this.mCamera.setupViewProjection();
    
    // activate the white shader to draw
    this.mWhiteSq.draw(this.mCamera.getVPMatrix());
    
    // activate the red shader to draw
    this.mRedSq.draw(this.mCamera.getVPMatrix());
};