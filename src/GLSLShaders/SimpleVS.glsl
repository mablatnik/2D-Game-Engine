uniform mat4 uModelTransform;

attribute vec3 aSquareVertexPosition;

void main(void) {
    gl_Position = 
    uModelTransform*
    vec4(aSquareVertexPosition, 1.0);
}
