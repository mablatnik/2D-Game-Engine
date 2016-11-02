function SimpleShader(vertexShaderID, fragmentShaderID) {
    // instance variables
    this.mCompiledShader = null;
    this.mShaderVertexPositionAttribute = null;
    this.mPixelColor = null;
    this.mModelTransform = null;
    this.mViewProjTransform = null;
    
    var gl = gEngine.Core.getGL();
    // start of constructor code
    var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
    // create and liink shader into a program
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);
    // check for errors
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }
    // get a reference to the aSquareVertexPosition attribute
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
    // get a reference to the PixelColor uniform variables
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
    
    // activate vertex buffer loaded in Engine.Core
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    /*
    describes the characteristics of the vertex position attribute
    3: each vertex element is a 3-float
    gl.FLOAT: data is FLOAT
    false: if the content is normalized vectors
    0: number of bytes to skip between elements
    0: offsets to the first element
    */
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
};

// performs loading and compiling functionality
SimpleShader.prototype._loadAndCompileShader = function(filePath, shaderType) {
    var shaderText, shaderSource, compiledShader;
    var gl = gEngine.Core.getGL();
    // request shader source for GLSL file
    xmlReq = new XMLHttpRequest();
    
    xmlReq.open('GET', filePath, false);
    
    try {
        xmlReq.send();
    } catch(error) {
        alert("Failed to load shader:" + filePath);
        return null;
    }
    
    shaderSource = xmlReq.responseText;
    
    if(shaderSource === null) {
        alert("WARNING: Loading of:" + filePath + "Failed!");
        return null;
    }
    
    // create the shader based on shader type
    compiledShader = gl.createShader(shaderType);
    // compile the shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    // check for errors and log info
    if(!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)){
        alert("A shader compiling error occurred:" + gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
};

// activate shader for drawing
SimpleShader.prototype.activateShader = function (pixelColor, vpMatrix) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
};

SimpleShader.prototype.getShader = function() {return this.mCompiledShader;};

SimpleShader.prototype.loadObjectTransform = function(modelTransform) {
    var gl = gEngine.Core.getGL();
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};