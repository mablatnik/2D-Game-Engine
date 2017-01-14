"use strict";

// constructor for camera
function Camera(wcCenter, wcWidth, viewportArray) {
    // WC and viewport position and size
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewportArray;  // [x, y, width, height]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;

    // transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();

    // background color
    this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha
}

Camera.prototype.setWCCenter = function (xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};
Camera.prototype.getWCCenter = function () {
    return this.mWCCenter;
};
Camera.prototype.setWCWidth = function (width) {
    this.mWCWidth = width;
};
Camera.prototype.setViewport = function (viewportArray) {
    this.mViewport = viewportArray;
};
Camera.prototype.getViewport = function () {
    return this.mViewport;
};
Camera.prototype.setBackgroundColor = function (newColor) {
    this.mBgColor = newColor;
};
Camera.prototype.getBackgroundColor = function () {
    return this.mBgColor;
};
Camera.prototype.getVPMatrix = function () {
    return this.mVPMatrix;
};

// initializes the camera to begin drawing
Camera.prototype.setupViewProjection = function () {
    var gl = gEngine.Core.getGL();

    // set up viewport to be drawn
    gl.viewport(this.mViewport[0], // x position bottom-left corner
        this.mViewport[1], // y position bottom-left corner
        this.mViewport[2], // width of area
        this.mViewport[3]); // height of area
    // set up corresponding scissor area
    gl.scissor(this.mViewport[0], // x position bottom-left corner
        this.mViewport[1], // y position bottom-left corner
        this.mViewport[2], // width of area
        this.mViewport[3]); // height of area
    // set the color to be clear to black
    gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);
    // enable and clear the scissor area
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    // define the view-projection matrix
    mat4.lookAt(this.mViewMatrix,
        [this.mWCCenter[0], this.mWCCenter[1], 10],   // WC center
        [this.mWCCenter[0], this.mWCCenter[1], 0],    // 
        [0, 1, 0]);     // orientation

    // define the projection matrix
    var halfWCWidth = 0.5 * this.mWCWidth;
    // WCHeight = WCWidth*viewportHeight/viewportWidth
    var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];
    mat4.ortho(this.mProjMatrix,
        -halfWCWidth, // distace to left of WC
        halfWCWidth, // distance to right of WC
        -halfWCHeight, // distance to bottom of WC
        halfWCHeight, // distance to top of WC
        this.mNearPlane, // z-distance to near plane
        this.mFarPlane); // z-distance to faar plane

    // concatenate view and project matrices
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
};