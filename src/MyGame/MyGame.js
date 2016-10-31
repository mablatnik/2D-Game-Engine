function MyGame(htmlCanvasID) {
    // shader for drawing
    this.mShader = null;
    gEngine.Core.initializeWebGL(htmlCanvasID);
    this.mShader = new SimpleShader("VertexShader", "FragmentShader");
    // clear the canvas
    gEngine.Core.clearCanvas([0,0.8,0,1]);
    // activate the proper shader
    this.mShader.activateShader();
    // draw with the activated geometry and shader
    var gl = gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}


