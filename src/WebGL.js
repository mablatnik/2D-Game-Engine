"use strict";

var gGL = null;

function initializeGL() {
    var canvas = document.getElementById("GLCanvas");
            gGL = canvas.getContext("webgl") || 
                    canvas.getContext("experimental-webgl");
            if(gGL !== null){
                gGL.clearColor(0.0, 0.8, 0.0, 1.0);
                // initialize the vertex buffer
                initSquareBuffer();
                // load and compile shaders
                initSimpleShader("VertexShader", "FragmentShader");
            } else {
                document.write("<br><b>WebGL is not supported!<b>");
            }
}

function drawSquare() {
    // clear canvas
    gGL.clear(gGL.COLOR_BUFFER_BIT);
    // active shader program
    gGL.useProgram(gSimpleShader);
    // enable vertex shader attributes
    gGL.enableVertexAttribArray(gShaderVertexPositionAttribute);
    // draw array
    gGL.drawArrays(gGL.TRIANGLE_STRIP, 0,4);
}

function doGLDraw() {
    // binds gGL context to WebGL functionality
    initializeGL();
    // clears the GL area and draws square
    drawSquare();
}
