precision mediump float;

// object that fetches data from texture
uniform sampler2D uSampler;

// color of pixel
uniform vec4 uPixelColor;

varying vec2 uTexCoord;

void main(void) {
    // textel color look up based on interpolated UV value in vTexCoord
    vec4 c = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));

    // tint the textured area, and leave transparent area as defined by the texture
    vec3 r = vec3(c) * (1.0-uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
    vec4 result = vec4(r, c.a);
    
    gl_FragColor = result;
}