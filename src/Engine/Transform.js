function Transform() {
    // translation operator
    this.mPosition = vec2.fromValues(0,0);
    // scaling operator
    this.mScale = vec2.fromValues(1,1);
    // rotation in radians
    this.mRotationInRad = 0.0;
};

// position getters and setters
Transform.prototype.setPosition = function (xPos, yPos) {
    this.setXPos(xPos);
    this.setYPos(yPos);
};
Transform.prototype.setPosition = function (xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); };
Transform.prototype.getPosition = function () { return this.mPosition; };
Transform.prototype.getXPos = function () { return this.mPosition[0]; };
Transform.prototype.setXPos = function (xPos) { this.mPosition[0] = xPos; };
Transform.prototype.incXPosBy = function (delta) { this.mPosition[0] += delta; };
Transform.prototype.getYPos = function () { return this.mPosition[1]; };
Transform.prototype.setYPos = function (yPos) { this.mPosition[1] = yPos; };
Transform.prototype.incYPosBy = function (delta) { this.mPosition[1] += delta; };

Transform.prototype.getPosition = function () {return this.mPosition;};

// size setters and getters
Transform.prototype.setSize = function (width, height) {
    this.setWidth(width);
    this.setHeight(height);
};

Transform.prototype.getSize = function() {return this.mScale;};

Transform.prototype.getWidth = function () { return this.mScale[0]; };
Transform.prototype.setWidth = function (width) { this.mScale[0] = width; };
Transform.prototype.getHeight = function () { return this.mScale[1]; };
Transform.prototype.setHeight = function (height) { this.mScale[1] = height; };

// rotation getters and setters
Transform.prototype.setRotationInRad = function (rotationInRadians) {
    this.mRotationInRad = rotationInRadians;
    while(this.mRotationInRad > (2*Math.PI))
        this.mRotationInRad -= (2*Math.PI);
};

Transform.prototype.setRotationInDegree = function (rotationInDegree) {
    this.setRotationInRad(rotationInDegree*Math.PI/180.0);
};

Transform.prototype.getRotationInRad = function () {  return this.mRotationInRad; };
Transform.prototype.getRotationInDegree = function () { return this.mRotationInRad * 180.0 / Math.PI; };

Transform.prototype.getXform = function() {
    // create blank identity matrix
    var matrix = mat4.create();
    // compute translation: z is zero for 2D game
    mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
    // concatenate with rotation
    mat4.rotateZ(matrix, matrix, this.getRotationInRad());
    // concatenate with scaling
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
    return matrix;
};

