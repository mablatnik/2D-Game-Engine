function MyGame(htmlCanvasID) {
    // initialize webGL context and VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);
    // create the shader
    this.mConstColorShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");
    // create the renderable objects
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1,1,1,1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1,0,0,1]);
    // draw process
    // clear the canvas
    gEngine.Core.clearCanvas([0,0.8,0,1]);
    // draw renderable objects
    this.mWhiteSq.draw();
    this.mRedSq.draw();

};