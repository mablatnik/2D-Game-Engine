"use strict";

var gEngine = gEngine || {};

// the VertexBuffer object
gEngine.VertexBuffer = (function () {
    // reference to the vertex positions for the square
    var mSquareVertexBuffer = null;

    // reference to the texture positions for the square verticiew in gl position
    var mTextureCoordBuffer = null;

    // verticies of the square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    // texture coordinates
    var textureCoordinates = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];

    var initialize = function () {
        var gl = gEngine.Core.getGL();
        // create buffer
        mSquareVertexBuffer = gl.createBuffer();
        // activate buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        // load verticies into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);

        // create buffer on gGL context
        mTextureCoordBuffer = gl.createBuffer();

        // activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);

        // load texture coordinates into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    };

    var getGLVertexRef = function () {
        return mSquareVertexBuffer;
    };
    var getGLTexCoordRef = function () {
        return mTextureCoordBuffer;
    };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef,
        getGLTextCoordRef: getGLTexCoordRef
    };
    return mPublic;
}());
