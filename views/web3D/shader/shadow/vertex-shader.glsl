precision mediump float;
attribute vec3 position;
attribute vec2 texture;

uniform mat4 meshMatrix;
uniform mat4 cameraMatrix;

void main() {
    gl_Position = cameraMatrix * meshMatrix * vec4(position, 1.0);
}