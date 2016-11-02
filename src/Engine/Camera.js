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

