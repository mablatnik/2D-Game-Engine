
"use strict";

// initialize the variable and ensure it is not redefined
var gEngine = gEngine || {};

gEngine.Core = (function() {
    // the graphic context for drawing
    var mGL = null;
    // accessor of the webgl context
    var getGL = function() {return mGL;};
    // contains functions and variables that will be accessible
    var mPublic = {
        getGL: getGL
    };
    return mPublic;
}());
