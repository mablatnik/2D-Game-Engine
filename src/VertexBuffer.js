/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var gSquareVertexBuffer = null;

function initSquareBuffer() {
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0,
    ];
    
    gSquareVertexBuffer = gGL.createBugger();
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);
    gGL.bufferData(gGL.ARRAY_BUFFER, new Fload32Array(verticesOfSquare),
    gGL.STATIC_DRAW);
}