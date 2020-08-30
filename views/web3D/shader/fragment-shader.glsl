precision highp float;

varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vPosition;
varying vec2 vTexture;

uniform vec3 cameraPosition;

uniform int useAmbientLight;
uniform vec3 ambientLightColor;

uniform int useDirectionalLight;
uniform vec3 directionalLightColor;
uniform vec3 directionalLightPosition;

uniform int usePointLight;
uniform vec3 pointLightColor;
uniform vec3 pointLightPosition;

uniform int usePhoneMaterial;


uniform sampler2D uSampler;


void main() {
    vec3 lightColor = vec3(0, 0, 0);

    // 环境光
    if (useAmbientLight == 1) {
        vec3 aColor = ambientLightColor;
        lightColor += aColor;
    }

    // 平行光
    if (useDirectionalLight == 1) {
        float dDotn = max(dot(normalize(directionalLightPosition), normalize(vNormal.xyz)), 0.0);
        vec3 dColor = directionalLightColor * dDotn;
        lightColor += dColor;
    }

    // 点光源
    if (usePointLight == 1) {
        vec3 lightDirection = pointLightPosition - vPosition;
        float lDotn = max(dot(normalize(lightDirection), normalize(vNormal.xyz)), 0.0);
        vec3 pColor = pointLightColor * lDotn;
        lightColor += pColor;
    }

    // 点光源产生镜面高光
    if (usePhoneMaterial == 1) {
        vec3 reflectDir = reflect(normalize(vPosition - pointLightPosition), normalize(vNormal.xyz));
        float cDotr = pow(max(dot(normalize(cameraPosition), normalize(reflectDir)), 0.0), 30.0);
    	vec3 sColor = pointLightColor * cDotr;
        lightColor += sColor;
    }
    

    gl_FragColor = vec4(lightColor * vColor, 1.0) * texture2D(uSampler, vTexture);

}