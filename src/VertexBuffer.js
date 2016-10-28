"use strict";

var gSquareVertexBuffer = null;

function initSquareBuffer() {
    // Create buffers of data
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    
    gSquareVertexBuffer = gGL.createBuffer();
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);
    gGL.bufferData(gGL.ARRAY_BUFFER, new Float32Array(verticesOfSquare), 
    gGL.STATIC_DRAW);
}