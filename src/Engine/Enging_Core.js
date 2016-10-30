
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
        if(mGL == null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
        // initialize the VertexBuffer
        gEnging.VertexBuffer.initialize();
    };
    // contains functions and variables that will be accessible
    var mPublic = {
        getGL: getGL
    };
    return mPublic;
}());
