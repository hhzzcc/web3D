const baseUrl = (location.href.includes('github') ? '/web3D' : '') + '/views/web3D/shader';
// 获取着色器代码
export const initShader = async (fragmentShaderTextSrc, vertexShaderTextSrc) => {
    const [fragmentShaderText, vertexShaderText] = await Promise.all([
        fetch(baseUrl + fragmentShaderTextSrc).then(res => res.text()),
        fetch(baseUrl + vertexShaderTextSrc).then(res => res.text()),
    ]);

    return [
        fragmentShaderText,
        vertexShaderText
    ]
};
