precision mediump float;
attribute vec3 position;
attribute vec3 color;
attribute vec3 normal;
attribute vec2 texture;

uniform mat4 meshMatrix;
uniform mat4 normalMatrix;
uniform mat4 cameraMatrix;
uniform mat4 shadowLightCameraMatrix;

uniform float pointSize;


varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vPosition;
varying vec2 vTexture;
varying vec4 vPositionFromLight;
varying float vDist;


void main() {
    vNormal = normalize((normalMatrix * vec4(normal, 1.0)).xyz);
    vColor = color;
    vPosition = (meshMatrix * vec4(position, 1.0)).xyz;
    vTexture = texture;
    vPositionFromLight = shadowLightCameraMatrix * meshMatrix * vec4(position, 1.0);

    if (pointSize > 0.0) {
        gl_PointSize = pointSize; 
    }

    gl_Position = cameraMatrix * meshMatrix * vec4(position, 1.0);
    vDist = gl_Position.w;
}