"use strict";

var gEngine = gEngine || {};

gEngine.GameLoop = (function() {
    // frames per second
    var kFPS = 60;
    // Milleseconds per frame
    var kMPF = 1000 / kFPS;
    
    // variables for timing gameloop
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;
    
    // current loop state
    var mIsLoopRunning = false;
    
    // reference to game logic
    var mMyGame = null;
    
    // sub-classed from MyGame
    var _runLoop = function () {
        if(mIsLoopRunning) {
            // set up for next call and update
            requestAnimationFrame(function(){_runLoop.call(mMyGame);});
            // compute the elapsed time since last loop run
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;
            // update game appropriate number of times
            while((mLagTime >= kMPF) && mIsLoopRunning) {
                // update the game engine
                gEngine.Input.update();
                this.update();
                mLagTime -= kMPF;
            }
            this.draw();
        } else {
            // game loop has stopped, unload current scene
            mMyGame.unloadScene();
        }
    };
    
    // update and draw functions must be set before this
    var _startLoop = function () {
        // reset frame time
        mPreviousTime = Date.now();
        mLagTime = 0.0;
        
        // remember that loop is running
        mIsLoopRunning = true;
        
        // request _runLoop to start when loading is done
        requestAnimationFrame(function () { _runLoop.call(mMyGame); });
    };
    
    var start = function (myGame) {
        mMyGame = myGame;
        gEngine.ResourceMap.setLoadCompleteCallback(
            function () {
                mMyGame.initialize();
                _startLoop();
            }
        );
    };
    
    var stop = function() {
        mIsLoopRunning = false;
    };
    
    var mPublic = {
        start: start,
        stop: stop
    };
    
    return mPublic;
}());