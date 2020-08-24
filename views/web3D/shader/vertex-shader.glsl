precision highp float;
attribute vec3 position;
attribute vec3 color;
attribute vec3 normal;
attribute vec2 texture;

uniform mat4 meshMatrix;
uniform mat4 normalMatrix;
uniform mat4 cameraMatrix;

varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vPosition;
varying vec2 vTexture;





void main() {
    vNormal = normalize(normalMatrix * vec4(normal, 1.0)).xyz;
    vColor = color;
    vPosition = (meshMatrix * vec4(position, 1.0)).xyz;
    vTexture = texture;

    gl_Position = cameraMatrix * meshMatrix * vec4(position, 1.0);
}