"use strict";

function TextureShader(vertexShaderPath, fragmentShaderPath) {
    // call super class constructor
    SimpleShader.call(this, vertexShaderPath, fragmentShaderPath);
    
    // reference to aTextureCoordinates within the shader
    this.mShaderTexturecoordAttribute = null;
    
    // get the reference of aTextureCoordinate within the shader
    var gl = gEngine.Core.getGL();
    this.mShaderTextureCoordAttribute = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
    }
    
// get all the prototype functions from SimpleShader
gEngine.Core.inheritPrototype(TextureShader, SimpleShader);
    
// overriding the activation of the shader for rendering
TextureShader.prototype.activateShader = function (pixelColor, vpMatrix) {
    // call super class's activate
    SimpleShader.prototype.activateShader.call(this, pixelColor, vpMatrix);
    
    // enable texture coordinate array
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
};