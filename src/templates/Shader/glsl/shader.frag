precision mediump float;

uniform sampler2D uTexture;

varying vec2 vUv;
varying float vSaturation;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor = vec4(textureColor.r * vSaturation, textureColor.g * vSaturation, textureColor.b * vSaturation, textureColor.a);
    gl_FragColor = textureColor;
}