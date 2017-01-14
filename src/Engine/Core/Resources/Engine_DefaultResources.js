"use strict";

var gEngine = gEngine || {};

gEngine.DefaultResources = (function () {
    // simple shader
    // path to vertex shader
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
    // Path to the simple FragmentShader
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
    // variable for SimpleShader object
    var mConstColorShader = null;

    // texture shader
    // path to vertex shader
    var kTextureVS = "src/GLSLShaders/TextureVS.glsl";
    // path to fragment shader
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl";
    var mTextureShader = null;

    // callback function after loadings are done
    var _createShaders = function (callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callBackFunction();
    };

    // assessor
    var getConstColorShader = function () {
        return mConstColorShader;
    };
    var getTextureShader = function () {
        return mTextureShader;
    };

    // initiate asynchronous loading of GLSL Shader files
    var initialize = function (callBackFunction) {
        // constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // texture shaders
        gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        gEngine.ResourceMap.setLoadCompleteCallback(function () {
            _createShaders(callBackFunction);
        });
    };

    var mPublic = {
        initialize: initialize,
        getConstColorShader: getConstColorShader,
        getTextureShader: getTextureShader
    };
    return mPublic;
}());