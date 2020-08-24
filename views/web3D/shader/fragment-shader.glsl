precision highp float;

varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vPosition;
uniform vec3 cameraPosition;
varying vec2 vTexture;

uniform sampler2D uSampler;


void main() {
    // 环境光强度为0.3，颜色为白光
    vec3 ambientColor = vec3(1.0, 1.0, 1.0) * 0.3;
    

    // 平行光强度为1，颜色为白光
    // vec3 diffuseLightColor = vec3(1, 1, 1) * 0.6;
    // float dDotn = max(dot(vec3(-3, 0, 2), normal.rgb), 0.0);
    // vec3 dColor = diffuseLightColor * dDotn;

    // 点光源，颜色为白光
    vec3 pointLightPosition = vec3(0, 0, 3);
    vec3 pointLightColor = vec3(1.0, 1.0, 1.0) * 1.0;
    vec3 lightDirection = normalize(pointLightPosition - vPosition);
    float lDotn = max(dot(lightDirection, normalize(vNormal.xyz)), 0.0);
    vec3 pColor = pointLightColor * lDotn;

    // 点光源产生镜面高光
    vec3 reflectDir = reflect(-lightDirection, vNormal.xyz);
    float cDotr = pow(max(dot(normalize(cameraPosition), normalize(reflectDir)), 0.0), 30.0);
	vec3 sColor = pointLightColor * cDotr;

    vec3 lightColor = ambientColor + pColor + sColor;

    gl_FragColor = vec4(lightColor * vColor, 1.0) * texture2D(uSampler, vTexture);

}