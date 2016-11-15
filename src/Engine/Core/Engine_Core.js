"use strict";

// initialize the variable and ensure it is not redefined
var gEngine = gEngine || {};

gEngine.Core = (function() {
    // the graphic context for drawing
    var mGL = null;
    
    // initialize the WebGL, buffer, and compile shaders
    var _initializeWebGL = function(htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        // get WebGL and bind to canvas
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if(mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
    };
    
    // accessor of the webgl context
    var getGL = function() {return mGL;};
    
    var startScene = function(scene) {
        // order of call matters
        scene.loadScene.call(scene);
        gEngine.GameLoop.start(scene);
    };
    
    // initialize all of the EngineCore components
    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        // initialize DefaultResource and invokes startScene
        gEngine.DefaultResources.initialize(function () { startScene(myGame); });
    };
    
    // clears the draw area and draws one square
    var clearCanvas = function(color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    };
    
    var inheritPrototype = function(subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };
    
    // contains functions and variables that will be accessible
    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        inheritPrototype: inheritPrototype,
        startScene: startScene
    };
    return mPublic;
}());
