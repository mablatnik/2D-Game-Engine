/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

var gGL = null;

function initializeGL() {
    var canvas = document.getElementById("GLCanvas");
            var gl = canvas.getContext("webgl") || 
                    canvas.getContext("experimental-webgl");
            if(gl !== null){
                gl.clearColor(0.0, 0.8, 0.0, 1.0);
            } else {
                document.write("<br><b>WebGL is not supported!<b>");
            }
}
