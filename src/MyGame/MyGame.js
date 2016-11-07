"use strict";

function MyGame(htmlCanvasID) {
    // variables for the shader
    this.mConstColorShader = null;
    
    // variables for the squares
    this.mWhiteSq = null;
    this.mRedSq = null;
    
    // The camera to view the scene
    this.mCamera = null;
    
    // initialize webGL context and VertexBuffer
    gEngine.Core.initializeEngineCore(htmlCanvasID);
    
    // initialize the game
    this.initialize();
}

MyGame.prototype.initialize = function () {
    
    
    // seetup the camera
    this.mCamera = new Camera(
            vec2.fromValues(20,60),
            20,
            [20,40,600,300]
            );
    this.mCamera.setBackgroundColor([0.8,0.8,0.8,1]);
   
    // create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl", 
        "src/GLSLShaders/SimpleFS.glsl");
    
    // create the renderable objects
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1,1,1,1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1,0,0,1]);
    
    // initialize the whiteSq: centered, 5x5, rotated
    this.mWhiteSq.getXform().setPosition(20,60);
    this.mWhiteSq.getXform().setRotationInRad(0.2);
    this.mWhiteSq.getXform().setSize(5,5);
    
    // initialize the redSq: centered 2x2
    this.mRedSq.getXform().setPosition(20,60);
    this.mRedSq.getXform().setSize(2,2);
    
    // start game loop
    gEngine.GameLoop.start(this);
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