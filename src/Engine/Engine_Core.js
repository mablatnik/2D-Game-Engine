"use strict";

// initialize the variable and ensure it is not redefined
var gEngine = gEngine || {};

gEngine.Core = (function() {
    // the graphic context for drawing
    var mGL = null;
    // accessor of the webgl context
    var getGL = function() {return mGL;};
    // initialize the WebGL, buffer, and compile shaders
    var initializeWebGL = function(htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        // get WebGL and bind to canvas
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if(mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
        // initialize the VertexBuffer
        gEngine.VertexBuffer.initialize();
    };
    // clears the draw area and draws one square
    var clearCanvas = function(color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    };
    // contains functions and variables that will be accessible
    var mPublic = {
        getGL: getGL,
        initializeWebGL: initializeWebGL,
        clearCanvas: clearCanvas
    };
    return mPublic;
}());
