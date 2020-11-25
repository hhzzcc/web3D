import { createArrayBuffer, createElementArrayBuffer } from './buffer.js';

// 返回attribute类型的数据(index也包括进去)
export const getAttributes = (gl, mesh) => {
    const geometry = mesh.getGeometry();
    const material = mesh.getMaterial();

    const position = new Float32Array(geometry.getPosition());
    const normal = new Float32Array(geometry.getNormal() || position);
    const texture = new Float32Array(geometry.getTexture() || position.filter((_, i) => (i + 1) % 3 !== 0));
    const index = new Uint16Array(geometry.getIndex());
    // const color = new Float32Array(material.getColor());

    // let parseColor = color;
    // if (color && color.length === 3) {
    //     parseColor = position.map((_, i) => color[i % 3]);
    // }


    if (!texture.length) {
        console.warn('[web3D wraning] no texture');
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
        // color: {
        //     data: parseColor,
        //     type: 'FLOAT',
        //     n: 3,
        //     buffer: createArrayBuffer(gl, parseColor)
        // },
        index: {
            data: index,
            buffer: createElementArrayBuffer(gl, index)
        },
        texture: {
            texture: gl.createTexture(),
            data: texture,
            type: 'FLOAT',
            n: 2,
            buffer: createArrayBuffer(gl, texture)
        }
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