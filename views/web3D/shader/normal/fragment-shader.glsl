precision mediump float;

// 归一化后的法线
varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vPosition;
varying vec2 vTexture;
varying vec4 vPositionFromLight;
varying float vDist;

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

uniform int useShadow;
uniform sampler2D uShadowSampler;

uniform int useFog;
uniform vec3 fogColor;
uniform vec2 fogDist;


float computeShadow(vec3 lightPosition) {
    vec3 projCoords = vPositionFromLight.xyz / vPositionFromLight.w / 2.0 + 0.5;
    // float closestDepth = 0.0;
    float closestDepth = texture2D(uShadowSampler, projCoords.xy).r;
    float currentDepth = projCoords.z;
    float bias = max(0.05 * (1.0 - dot(vNormal.xyz, normalize(lightPosition))), 0.005);
    // for(float y = -2.0; y <= 2.0; y += 1.0) {
    //     for(float x = -2.0; x <= 2.0; x += 1.0) {
    //         closestDepth += texture2D(uShadowSampler, projCoords.xy + vec2(x, y) / 2048.0).r;
    //     }
    // }
    float shadow = currentDepth - bias > (closestDepth) ? 0.6 : 0.0;
    // disable shadow outside the shadow camera
    if (projCoords.z > 1.0) shadow = 0.0;
    return 1.0 - shadow;
}

void main() {
    vec3 lightColor = vec3(0, 0, 0);

    // 环境光
    if (useAmbientLight == 1) {
        vec3 aColor = ambientLightColor;
        lightColor += aColor;
    }

    // 平行光
    if (useDirectionalLight == 1) {
        float dDotn = max(dot(normalize(directionalLightPosition), vNormal.xyz), 0.0);
        vec3 dColor = directionalLightColor * dDotn;
        lightColor += dColor;
    }

    // 点光源
    if (usePointLight == 1) {
        vec3 lightDirection = pointLightPosition - vPosition;
        float lDotn = max(dot(normalize(lightDirection), vNormal.xyz), 0.0);
        vec3 pColor = pointLightColor * lDotn;
        lightColor += pColor;
    }

    // 点光源产生镜面高光
    if (usePhoneMaterial == 1) {
        vec3 reflectDir = reflect(normalize(vPosition - pointLightPosition), vNormal.xyz);
        float cDotr = pow(max(dot(normalize(cameraPosition), normalize(reflectDir)), 0.0), 30.0);
    	vec3 sColor = pointLightColor * cDotr;
        lightColor += sColor;
    }

    // 纹理
    vec4 fragColor = vec4(lightColor, 1.0) * texture2D(uSampler, vTexture);

    // 阴影
    if (useShadow == 1) {
        float visibility = computeShadow(pointLightPosition);
        fragColor = vec4(fragColor.xyz * visibility, fragColor.w);
    }
    

    // 雾化
    if (useFog == 1) {
        float fogFacotr = clamp((fogDist.y - vDist) / (fogDist.y, fogDist.x), 0.0, 1.0);
        fragColor = vec4(mix(fogColor, vec3(fragColor), fogFacotr), fragColor.w);
    }
    
    gl_FragColor = fragColor;

}