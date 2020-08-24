
// 获取着色器代码
export const initShader = async () => {
    const [fragmentShaderText, vertexShaderText] = await Promise.all([
        fetch('/views/web3D/shader/fragment-shader.glsl').then(res => res.text()),
        fetch('/views/web3D/shader/vertex-shader.glsl').then(res => res.text()),
    ]);

    return {
        fragmentShaderText,
        vertexShaderText
    }
};
