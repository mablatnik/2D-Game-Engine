function MyGame(htmlCanvasID) {
    // shader for drawing
    this.mShader = null;
    // initialize webGL context and VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);
    this.mShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");
    // Draw
    // clear the canvas
    gEngine.Core.clearCanvas([0,0.8,0,1]);
    // activate the proper shader
    this.mShader.activateShader([0,0,1,1]);
    // draw with the activated geometry and shader
    var gl = gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}


