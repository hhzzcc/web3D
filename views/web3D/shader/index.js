const baseUrl = (location.href.includes('github') ? '/web3D' : '') + '/views/web3D/shader';
// 获取着色器代码
export const initShader = async () => {
    const [fragmentShaderText, vertexShaderText] = await Promise.all([
        fetch(baseUrl + '/fragment-shader.glsl').then(res => res.text()),
        fetch(baseUrl + '/vertex-shader.glsl').then(res => res.text()),
    ]);

    return {
        fragmentShaderText,
        vertexShaderText
    }
};
