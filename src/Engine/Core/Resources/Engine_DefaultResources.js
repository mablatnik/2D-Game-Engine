"use strict";

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
    // path to vertex shader
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
    // Path to the simple FragmentShader
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
    // variable for SimpleShader object
    var mConstColorShader = null;
    // assessor
    var getConstColorShader = function () { return mConstColorShader; };
    
    // callback function after loadings are done
    var _createShaders = function (callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callBackFunction();
    };
    
    // initiate asynchronous loading of GLSL Shader files
    var initialize = function (callBackFunction) {
        // constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        gEngine.ResourceMap.setLoadCompleteCallback(function () { _createShaders(callBackFunction); });
    };
    
    var mPublic = {
        initialize: initialize,
        getConstColorShader: getConstColorShader
    };
    return mPublic;
}());