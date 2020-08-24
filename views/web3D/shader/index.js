
// 获取着色器代码
export const initShader = async () => {
    const [fragmentShaderText, vertexShaderText] = await Promise.all([
        fetch('/web3D/shader/fragment-shader.glsl').then(res => res.text()),
        fetch('/web3D/shader/vertex-shader.glsl').then(res => res.text()),
    ]);

    return {
        fragmentShaderText,
        vertexShaderText
    }
};
