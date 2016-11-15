"use strict";

function MyGame() {
    // scene file name
    this.kSceneFile = "assets/scene.xml";
    
    // create array to hold all renderable objects
    this.mSqSet = [];
    
    // The camera to view the scene
    this.mCamera = null;
}

MyGame.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
        gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function () {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
};

MyGame.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    // parse the camera
    this.mCamera = sceneParser.parseCamera();
    // parse all the squares
    sceneParser.parseSquares(this.mSqSet);
};

// draw process
MyGame.prototype.draw = function() {
    // clear the canvas
    gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
    
    // set up the view projection
    this.mCamera.setupViewProjection();
    
    // draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};


// update function, updates the application state
MyGame.prototype.update = function () {
    // move the white square and pulse red square
    var xform = this.mSqSet[0].getXform();
    var deltaX = 0.05;
    
    // test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(10, 60);
        }
        xform.incXPosBy(deltaX);
    }
    
    // test for white square rotation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        xform.incRotationByDegree(1);
    }
    
    xform = this.mSqSet[1].getXform();
    // test for pulsing red square
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (xform.getWidth() > 5) {
            xform.setSize(2, 2);
        }
        xform.incSizeBy(0.05);
    }
};