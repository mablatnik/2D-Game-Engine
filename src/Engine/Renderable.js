function Renderable(shader) {
    this.mShader = shader;
    this.mColor = [1,1,1,1];
}

Rendeable.prototye.draw = function() {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor);
    gl.drawArray(gl.TRIANGLE_STRIP,0,4)
};

Renderable.prototype.setColor = function(color) {this.mColor = color; };
Renderable.prototype.getColor = function() {return this.mColor; };



