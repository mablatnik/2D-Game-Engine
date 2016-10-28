"use strict";

var gSquareVertexBuffer = null;

function initSquareBuffer() {
    // define vertices for a square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    // create bubber on gGL context
    gSquareVertexBuffer = gGL.createBuffer();
    // activate buffer
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);
    // load verticies into the vertex buffer
    gGL.bufferData(gGL.ARRAY_BUFFER, new Float32Array(verticesOfSquare), 
    gGL.STATIC_DRAW);
}