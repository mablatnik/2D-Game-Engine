// vertex shader
attribute vec3 aSquareVertexPosition;
// texture coordinate attribute
attribute vec2 aTextureCoordinate;

// texture coordinate that maps image to square
varying vec2 vTexCoord;

// transform the vertex position
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

void main(void) {
    // convert the vec3 into vec4 fo scan conversion and
    // transform by uModelTransform and uViewProjTransform before
    // assign to gl_Position to pass the vertex to fragment shader
    gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0);

    // pass the texture coordinates to the fragment shader
    vTexCoord = aTextureCoordinate;
}