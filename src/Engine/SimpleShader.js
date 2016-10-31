function SimpleShader(vertexShaderID, fragmentShaderID) {
    // instance variables
    this.mCompiledShader = null;
    this.mShaderVertexPositionAttribute = null;
    
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
    }

// performs loading and compiling functionality
SimpleShader.prototype._loadAndCompileShader = function(id, shaderType) {
    var shaderText, shaderSource, compiledShader;
    var gl = gEngine.Core.getGL();
    // get shader source from index
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;
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
