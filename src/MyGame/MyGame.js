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
    gEngine.Core.initializeWebGL(htmlCanvasID);
    
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
    if(whiteXform.getXPos() > 30)
        whiteXform.setPosition(10,60);
    whiteXform.incXPosBy(deltaX);
    whiteXform.incRotationByDegree(1);
    // pulse the red square
    var redXform = this.mRedSq.getXform();
    if(redXform.getWidth() > 5)
        redXform.setSize(2,2);
    redXform.incSizeBy(0.05);
};
    
    // draw process
    // clear the canvas
    gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
    
    // Starts drawing and activating the camera
    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();
    
    // draw the blue square: center blue, slightly rotated
    this.mBlueSq.getXform().setPosition(20,60);
    this.mBlueSq.getXform().setRotationInRad(0.2);
    this.mBlueSq.getXform().setSize(5,5);
    this.mBlueSq.draw(vpMatrix);
    
    // draw red square: center
    this.mRedSq.getXform().setPosition(20,60);
    this.mRedSq.getXform().setSize(2,2);
    this.mRedSq.draw(vpMatrix);
    
    // top left
    this.mTLSq.getXform().setPosition(10,65);
    this.mTLSq.draw(vpMatrix);
    
    // top right
    this.mTRSq.getXform().setPosition(30,65);
    this.mTRSq.draw(vpMatrix);
    
    // bottom right
    this.mBRSq.getXform().setPosition(30,55);
    this.mBRSq.draw(vpMatrix);
    
    // bottom left
    this.mBLSq.getXform().setPosition(10,55);
    this.mBLSq.draw(vpMatrix);   
};