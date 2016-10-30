"use strict";

var gEngine = gEngine || {};

// the VertexBuffer object
gEngine.VertexBuffer = (function() {
    // verticies of the square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    // reference to the vertex positions for the square
    var mSquareVertexBuffer = null;
    var getGLVertexRef = function() {return mSquareVertexBuffer;};
    var initialize = function() {
        var gl = gEngine.Core.getGL();
        // create buffer
        mSquareVertexBuffer = gl.createBuffer();
        // activate buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        // load verticies into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gGL.STATIC_DRAW);
    };
    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
    };
    return mPublic;
}());
