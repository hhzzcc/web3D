import { createArrayBuffer, createElementArrayBuffer } from './buffer.js';

// 返回attribute类型的数据(index也包括进去)
export const getAttributes = (gl, mesh) => {
    const geometry = mesh.getGeometry();
    const material = mesh.getMaterial();

    const position = new Float32Array(geometry.getPosition());
    const normal = new Float32Array(geometry.getNormal());
    const texture = new Float32Array(geometry.getTexture());
    const index = new Uint16Array(geometry.getIndex());
    const image = material.getImage();
    const color = new Float32Array(material.getColor());

    let parseColor = color;
    if (color && color.length === 3) {
        parseColor = position.map((_, i) => color[i % 3]);
    }

    return {
        position: {
            data: position,
            type: 'FLOAT',
            n: 3,
            buffer: createArrayBuffer(gl, position)
        },
        normal: {
            data: normal,
            type: 'FLOAT',
            n: 3,
            buffer: createArrayBuffer(gl, normal)
        },
        color: {
            data: parseColor,
            type: 'FLOAT',
            n: 3,
            buffer: createArrayBuffer(gl, parseColor)
        },
        index: {
            data: index,
            buffer: createElementArrayBuffer(gl, index)
        },
        texture: image ? {
            texture: gl.createTexture(),
            data: texture,
            type: 'FLOAT',
            n: 2,
            buffer: createArrayBuffer(gl, texture)
        } : null
    };
};

// 返回uniform类型的数据(index也包括进去)
export const getUniforms = mesh => {
    return {
    };
};

export const getOther = mesh => {
    const material = mesh.getMaterial();
    const image = material.getImage();
    return {
        image: {
            data: image,
        }
    };
};