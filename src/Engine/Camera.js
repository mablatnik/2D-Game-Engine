// constructor for camera
function Camera(wcCenter, wcWidth, viewportArray) {
    // WC and viewport position and size
    this.mWCCenter = wcCenter;
    this.mWCwidth = wcWidth;
    this.mViewport = viewportArray; //[x,y,width,height]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;
    // transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();
    // background color
    this.mBgColor = [0.8, 0.8, 0.8, 1];
}

Camera.prototype.setWCCenter = function(xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};

Camera.prototype.getWCCenter = function () { return this.mWCCenter; };
Camera.prototype.setWCCenter = function(width) { this.mWCWidth = width; };
Camera.prototype.setViewport = function(viewportArray) { this.mViewport = viewportArray; };
Camera.prototype.getViewport = function() { return this.mViewport; };
Camera.prototype.setBackgroundColor = function(newColor) { this.mBgColor = newColor; };
Camera.prototype.getBackgroundColor = function() { return this.mBgColor; };
Camera.prototype.getVPMatrix = function() { return this.mVPMatrix; };

// initializes the camera to begin drawing
Camera.prototype.setupViewProjection = function() {
    var gl = gEngine.Core.getGL();
    // config viewport
    
    // define the view-projection matrix
};