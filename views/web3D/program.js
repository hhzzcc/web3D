const compileShader = (gl, type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('Error compiling shaders', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }
    return shader
}

export const initProgram = (gl, vsSource, fsSource) => {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource)

    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log(
            'Error init shader program', gl.getProgramInfoLog(shaderProgram)
        )
        return null
    }
    gl.useProgram(shaderProgram)

    return shaderProgram
}
  