precision highp float;

varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vPosition;
varying vec2 vTexture;

uniform vec3 cameraPosition;

uniform vec3 ambientLightColor;
uniform vec3 directionalLightColor;
uniform vec3 directionalLightPosition;
uniform vec3 pointLightColor;
uniform vec3 pointLightPosition;





uniform sampler2D uSampler;


void main() {
    // 环境光
    vec3 aColor = ambientLightColor;
    

    // 平行光
    float dDotn = max(dot(directionalLightPosition, vNormal.xyz), 0.0);
    vec3 dColor = directionalLightColor * dDotn;

    // 点光源
    vec3 lightDirection = normalize(pointLightPosition - vPosition);
    float lDotn = max(dot(lightDirection, normalize(vNormal.xyz)), 0.0);
    vec3 pColor = pointLightColor * lDotn;

    // 点光源产生镜面高光
    // vec3 reflectDir = reflect(-lightDirection, vNormal.xyz);
    // float cDotr = pow(max(dot(normalize(cameraPosition), normalize(reflectDir)), 0.0), 30.0);
	// vec3 sColor = pointLightColor * cDotr;

    vec3 lightColor = aColor + dColor + pColor;

    gl_FragColor = vec4(lightColor * vColor, 1.0) * texture2D(uSampler, vTexture);

}