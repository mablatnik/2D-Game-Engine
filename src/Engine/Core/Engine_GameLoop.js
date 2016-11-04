var gEngine = gEngine || {};

gEngine.GameLoop = (function() {
    // frames per second
    var kFPS = 60;
    // Milleseconds per frame
    var kMPF = 1000 / kFPS;
    
    // variables for timing gameloop
    var mPreviousTime;
    var mLagTime;
    var CurrentTime;
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
                // call MyGame.update()
                this.update();
                mLagTime -= kMPF;
            }
            this.draw();
        }
    };
    
    var mPublic = {
        
    };
    return mPublic;
}());