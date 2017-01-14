"use strict";

function BlueLevel() {
    // audio clips
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";

    // scene file name
    this.kSceneFile = "assets/BlueLevel.xml";

    // textures: (jpg does not support transparency)
    this.kPortal = "assets/minion_portal.jpg";
    this.kCollector = "assets/minion_collector.jpg";

    // all squares, the renderable objects
    this.mSqSet = [];

    // the camera to view the scene
    this.mCamera = null;
}

gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function () {
    // load the scene file
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);

    // load audio
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);

    // load the textures
    gEngine.Textures.loadTexture(this.kPortal);
    gEngine.Textures.loadTexture(this.kCollector);
};

BlueLevel.prototype.unloadScene = function () {
    // stop background music
    gEngine.AudioClips.stopBackgroundAudio();

    // unload the scene flie and loaded resources
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.Textures.unloadTextures(this.kPortal);
    gEngine.Textures.unloadTextures(this.kCollector);

    // load the next level
    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
};

BlueLevel.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // parse the camera
    this.mCamera = sceneParser.parseCamera();

    // parse all the squares and textureSquares
    sceneParser.parseSquares(this.mSqSet);
    sceneParser.parseTextureSquares(this.mSqSet);

    // start background music
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
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
        gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(12, 60);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 11) { // this is the left-boundary
            gEngine.GameLoop.stop();
        }
    }

    // continuously change texture tinting
    var c = this.mSqSet[1].getColor();
    var ca = c[3] + deltaX;
    if (ca > 1) {
        ca = 0;
    }
    c[3] = ca;
};
