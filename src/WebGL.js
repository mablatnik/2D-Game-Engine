"use strict";

var gGL = null;

function initializeGL() {
    var canvas = document.getElementById("GLCanvas");
            gGL = canvas.getContext("webgl") || 
                    canvas.getContext("experimental-webgl");
            if(gGL !== null){
                gGL.clearColor(0.0, 0.8, 0.0, 1.0);
            } else {
                document.write("<br><b>WebGL is not supported!<b>");
            }
}

function clearCanvas() {
    gGL.clear(gGL.COLOR_BUFFER_BIT);
}

function doGLDraw() {
    initializeGL();
    clearCanvas();
}
