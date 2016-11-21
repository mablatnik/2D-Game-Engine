"use strict";

function BlueLevel() {
    // scene file name
    this.kSceneFile = "assets/BlueLevel.xml";
    // all squares, the renderable objects
    this.mSqSet = [];
    // the camera to view the scene
    this.mCamera = null;
}

gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function () {
    // load the scene file
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

BlueLevel.prototype.unloadScene = function () {
    // unload the scene flie
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

BlueLevel.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // parse the camera
    this.mCamera = sceneParser.parseCamera();

    // parse all the squares
    sceneParser.parseSquares(this.mSqSet);
};

// draw process
BlueLevel.prototype.draw = function () {
    // clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    
    // set up the view projection
    this.mCamera.setupViewProjection();
    
    // draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};

// update function, updates the application state
BlueLevel.prototype.update = function () {
    // move the white square and pulse red square
    var xform = this.mSqSet[1].getXform();
    var deltaX = 0.05;
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(12, 60);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 11) { // this is the left-boundary
            gEngine.GameLoop.stop();
        }
    }
};
