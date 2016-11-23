"use strict";

function MyGame() {
    // audio clips
    this.kBgClip = "assests/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/MyGame_cue.wav";
    
    // The camera to view the scene
    this.mCamera = null;
    
    // the hero and the support objects
    this.mHero = null;
    this.mSupport = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function() {
    // load audio
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.unloadScene = function () {
    // stop background music
    gEngine.AudioClips.unloadAudio(this.kCue);
    
    // start the next level
    var nextLevel = new BlueLevel();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    // set up the camera
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),   // position of the camera
        20,                        // width of camera
        [20, 40, 600, 300]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    // create support object in red
    this.mSupport = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mSupport.setColor([0.8, 0.2, 0.2, 1]);
    this.mSupport.getXform().setPosition(20, 60);
    this.mSupport.getXform().setSize(5, 5);
    
    // create the hero object in blue
    this.mHero = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mHero.setColor([0, 0, 1, 1]);
    this.mHero.getXform().setPosition(20, 60);
    this.mHero.getXform().setSize(2, 3);
    
    // start the background music
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// draw process
MyGame.prototype.draw = function() {
    // clear the canvas
    gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
    
    // set up the view projection
    this.mCamera.setupViewProjection();
    
    // draw all the squares
    this.mSupport.draw(this.mCamera.getVPMatrix());
    this.mHero.draw(this.mCamera.getVPMatrix());
};

// update function, updates the application state
MyGame.prototype.update = function () {
    // move the white square and pulse red square
    var deltaX = 0.05;
    var xform = this.mHero.getXform();
    
    // test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(12, 60);
        }
    }
    
    // test for white square rotation
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 11) {  // this is the left-bound of the window
            gEngine.GameLoop.stop();
        }
    }
};