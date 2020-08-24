export const createArrayBuffer = (gl, list) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, list, gl.STATIC_DRAW);
    return buffer;
}

export const createElementArrayBuffer = (gl, list) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, list, gl.STATIC_DRAW);
    return buffer;
}