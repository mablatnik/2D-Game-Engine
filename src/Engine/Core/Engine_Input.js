var gEngine = gEngine || {};

gEngine.Input = (funtion() {
    // key codes
    var kKeys = {
        // arrows
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,

        // space bar
        Space: 32,

        // numbers 
        Zero: 48,
        One: 49,
        Two: 50,
        Three: 51,
        Four: 52,
        Five : 53,
        Six : 54,
        Seven : 55,
        Eight : 56,
        Nine : 57,

        // Alphabets
        A : 65,
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        R : 82,
        S : 83,
        W : 87,

        LastKeyCode: 222
    };
    
    // previous key state
    var mKeyPreviousState = [];
    
    // pressed keys
    var mIsKeyPressed = [];
    
    // click events
    var mIsKeyClicked = [];
    
    // event service functions
    var _onKeyDown = function (event) {
        mIsKeyPressed[event.keyCode] = true; };
    
    var _onKeyUp = function (event) {
        mIsKeyPressed[event.keyCode] = false; };
    
    var mPublic = {
        
    };
    return mPublic;
}());


