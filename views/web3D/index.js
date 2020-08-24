import { initShader } from './shader/index.js';
import { initProgram } from './program.js';
import { Camera } from './camera/index.js';
import { Mesh } from './mesh/index.js';

export class Web3D {
    constructor() {
    }

    async init(options = {}) {
        const { appendDom = document.body } = options;
        const { canvas, gl, program } = await this.initWebgl(appendDom);
        this.canvas = canvas;
        this.gl = gl;
        this.program = program;
        this.meshs = [];
        this.camera = null;

        appendDom.appendChild(this.canvas);
    }

    async initWebgl () {
        // 获取着色器代码
        const { vertexShaderText, fragmentShaderText } = await initShader();
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const gl = canvas.getContext('webgl');
        const program = initProgram(gl, vertexShaderText, fragmentShaderText);
        return {
            canvas,
            gl,
            program
        };
    }

    add(obj) {
        if(obj instanceof Mesh) {
            obj.setAttributes(this.gl);
            this.meshs.push(obj);
        }
        if (obj instanceof Camera) {
            this.camera = obj;
        }
    }

    updateCamera() {
        if (this.camera) {
            // 相机变换矩阵
            const cameraMatrixLocation = this.gl.getUniformLocation(this.program, 'cameraMatrix');
            const cameraMatrix = this.camera.getCameraMatrix();
            this.gl.uniformMatrix4fv(cameraMatrixLocation, false, cameraMatrix);

            // 相机位置
            const cameraPositionLocation = this.gl.getUniformLocation(this.program, 'cameraPosition');
            const { x, y, z } = this.camera.getPosition();
            const cameraPosition = new Float32Array([x, y, z]);
            this.gl.uniform3fv(cameraPositionLocation, cameraPosition);
        }
    }

    drawMeshs() {
        for (let i = 0; i < this.meshs.length; i++) {
            const mesh = this.meshs[i];
            const attributes = mesh.getAttributes();

            // 顶点数据
            for (const key in attributes) {
                const value = attributes[key];
                if (key === 'index') {
                    // 顶点索引
                    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, value.buffer);
                    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, value.data, this.gl.STATIC_DRAW);
                }
                else if (value) {
                    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, value.buffer);
                    const location = this.gl.getAttribLocation(this.program, key);
                    this.gl.vertexAttribPointer(location, value.n, this.gl[value.type], false, 0, 0);
                    this.gl.enableVertexAttribArray(location);
                    if (key === 'texture') {
                        const { texture, image } = value;
                        const uSamplerLoaction = this.gl.getUniformLocation(this.program, 'uSampler');
                        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
                        this.gl.activeTexture(this.gl.TEXTURE0);
                        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
                        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
                        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
                        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, image);
                        this.gl.uniform1i(uSamplerLoaction, 0);
                    }
                }
            }

            // 顶点变换矩阵
            const meshMatrixLocation = this.gl.getUniformLocation(this.program, 'meshMatrix');
            const meshMatrix = mesh.getMeshMatrix();
            this.gl.uniformMatrix4fv(meshMatrixLocation, false, meshMatrix);

            // 法线抵消矩阵
            const normalMatrixLocation = this.gl.getUniformLocation(this.program, 'normalMatrix');
            const normalMatrix = mesh.getNormalMatrix();
            this.gl.uniformMatrix4fv(normalMatrixLocation, false, normalMatrix);

            this.gl.drawElements(this.gl.TRIANGLES, attributes.index.data.length, this.gl.UNSIGNED_SHORT, 0);
        }
    }

    draw() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.updateCamera();
        this.drawMeshs();
    }
};