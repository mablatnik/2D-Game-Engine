"Use strict";

function SimpleShader(vertexShaderPath, fragmentShaderPath) {
    // instance variables
    this.mCompiledShader = null;
    this.mShaderVertexPositionAttribute = null;
    this.mPixelColor = null;
    this.mModelTransform = null;
    this.mViewProjTransform = null;
    
    var gl = gEngine.Core.getGL();
    // start of constructor code
    var vertexShader = this._compileShader(vertexShaderPath, gl.VERTEX_SHADER);
    var fragmentShader = this._compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);
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
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(
        this.mCompiledShader, "aSquareVertexPosition");
    
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
    
    // get a reference to the uniform variables
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
}

// access the compiled shader
SimpleShader.prototype.getShader = function() {return this.mCompiledShader;};

// activate shader for drawing
SimpleShader.prototype.activateShader = function (pixelColor, vpMatrix) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
};

// loads model transforms for each object
SimpleShader.prototype.loadObjectTransform = function(modelTransform) {
    var gl = gEngine.Core.getGL();
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

// performs loading and compiling functionality
SimpleShader.prototype._compileShader = function(filePath, shaderType) {
    var gl = gEngine.Core.getGL();
    var xmlReq, shaderSource = null, compiledShader = null;
    // request shader source for GLSL file
    xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        alert("Failed to load shader: " + filePath + " [Hint: you cannot double click index.html to run this project. " +
                "The index.html file must be loaded by a web-server.]");
        return null;
    }
    shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);

    if (shaderSource === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
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