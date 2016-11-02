function MyGame(htmlCanvasID) {
    // initialize webGL context and VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);
    var gl = gEngine.Core.getGL();
    
    // create the shader
    this.mConstColorShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");
    
    // create the renderable objects
    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1,0.25,0.25,1]);
    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1,0.1,0.1,1]);
    
    // draw process
    // clear the canvas
    gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
    // set up the viewport
    gl.viewport(20, 40, 600, 300);
    // set up the scissor area to limit clear area
    gl.scissor(20, 40, 600, 300);
    // enable the scissor area, clear, and then disable scissor area
    gl.enable(gl.SCISSOR_TEST);
    gEngine.Core.clearCanvas([0,8, 0.8, 0.8, 1.0]);
    gl.disable(gl.SCISSOR_TEST);
    
    // set up view and projection matrices
    var viewMatrix = mat4.create();
    var projMatrix = mat4.create();
    // define the view matrix
    mat4.lookAt(viewMatrix, 
        [20,60,100], // camera position
        [20, 60, 0], // view position
        [0,1,0]); // orientation
    // define the matrix projection(left, right, bottom, top, z near, z far)
    mat4.ortho(projMatrix, -10, 10, -5, 5, 0, 1000);
    // concatenate to the form the View-Projection
    var vpMatrix = mat4.create();
    mat4.multiply(vpMatrix, projMatrix, viewMatrix);
    
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