import { initShader } from './shader/index.js';
import { initProgram } from './program.js';
import { Camera, CameraPerspective, CameraOrtho } from './camera/index.js';
import { Mesh } from './mesh/index.js';
import { Group } from './group/index.js';
import { LightAmbient, LightDirectional, LightPoint } from './light/index.js';
import { MaterialPhone } from './material/index.js';
import { initFramebufferObject } from './utils/fbo.js';

const SHADOW_WIDHT = 2048;
const SHADOW_HEIGHT = 2048;
export class Web3D {
    constructor() {}

    async init(options = {}) {
        const { width = 500, height = 500 } = options;
        const { canvas, gl, program, shadowProgram } = await this.initWebgl({ width, height });
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.gl = gl;
        this.gl.getExtension('WEBGL_depth_texture');
        const fbo = initFramebufferObject(this.gl, SHADOW_WIDHT, SHADOW_HEIGHT);
        this.fbo = fbo;
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.fbo.texture);
        this.program = program;
        this.shadowProgram = shadowProgram;
        this.meshs = [];
        this.camera = null;
        this.ambientLight = null;
        this.directionalLight = null;
        this.pointLight = null;
        this.shadowLightCameraMatrix = null;

        return this.canvas;

        // appendDom.appendChild(this.canvas);
    }

    async initWebgl ({ width, height }) {
        // 获取着色器代码
        const [fragmentShaderText, vertexShaderText] = await initShader('/normal/fragment-shader.glsl', '/normal/vertex-shader.glsl');
        const [shadowFragmentShaderText, shadowVertexShaderText] = await initShader('/shadow/fragment-shader.glsl', '/shadow/vertex-shader.glsl');
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.id = '__web3d';
        const gl = canvas.getContext('webgl');
        const program = initProgram(gl, vertexShaderText, fragmentShaderText);
        const shadowProgram = initProgram(gl, shadowVertexShaderText, shadowFragmentShaderText);
        return {
            canvas,
            gl,
            program,
            shadowProgram
        };
    }

    add(objs) {
        const add = obj => {
            if(obj instanceof Mesh) {
                obj.setAttributes(this.gl);
                this.meshs.push(obj);
            }
            if (obj instanceof Group) {
                const meshs = obj.getMeshs();
                meshs.forEach(mesh => {
                    mesh.setAttributes(this.gl);
                    this.meshs.push(mesh);
                });
            }
            if (obj instanceof Camera) {
                this.camera = obj;
            }
            if (obj instanceof LightAmbient) {
                this.ambientLight = obj;
            }
            if (obj instanceof LightDirectional) {
                this.directionalLight = obj;
            }
            if (obj instanceof LightPoint) {
                this.pointLight = obj;
            }
        };

        if (objs instanceof Array) {
            objs.forEach(obj => add(obj));
        } else {
            add(objs);
        }
    }

    updateCamera() {
        if (this.camera) {
            // 更新计算所有矩阵
            this.camera.computedCameraMatrix();
            // 相机变换矩阵
            const cameraMatrixLocation = this.gl.getUniformLocation(this.program, 'cameraMatrix');
            const cameraMatrix = this.camera.getCameraMatrix();
            this.gl.uniformMatrix4fv(cameraMatrixLocation, false, cameraMatrix);

            // 相机位置
            const cameraPositionLocation = this.gl.getUniformLocation(this.program, 'cameraPosition');
            const position = this.camera.getPosition();
            const cameraPosition = new Float32Array(position);
            this.gl.uniform3fv(cameraPositionLocation, cameraPosition);
        }
    }

    updateLight() {
        if (this.ambientLight) {
            const color = this.ambientLight.getColor();
            const colorLocation = this.gl.getUniformLocation(this.program, 'ambientLightColor');
            this.gl.uniform3fv(colorLocation, new Float32Array(color));
        }
        this.gl.uniform1i(
            this.gl.getUniformLocation(this.program, 'useAmbientLight'),
            this.ambientLight ? 1 : 0
        );

        if (this.directionalLight) {
            const color = this.directionalLight.getColor();
            const colorLocation = this.gl.getUniformLocation(this.program, 'directionalLightColor');
            this.gl.uniform3fv(colorLocation, new Float32Array(color));
            const position = this.directionalLight.getPosition();
            const positionLocation = this.gl.getUniformLocation(this.program, 'directionalLightPosition');
            this.gl.uniform3fv(positionLocation, new Float32Array(position));
        }
        this.gl.uniform1i(
            this.gl.getUniformLocation(this.program, 'useDirectionalLight'),
            this.directionalLight ? 1 : 0
        );

        if (this.pointLight) {
            const color = this.pointLight.getColor();
            const colorLocation = this.gl.getUniformLocation(this.program, 'pointLightColor');
            this.gl.uniform3fv(colorLocation, new Float32Array(color));
            const position = this.pointLight.getPosition();
            const positionLocation = this.gl.getUniformLocation(this.program, 'pointLightPosition');
            this.gl.uniform3fv(positionLocation, new Float32Array(position));
        }
        this.gl.uniform1i(
            this.gl.getUniformLocation(this.program, 'usePointLight'),
            this.pointLight ? 1 : 0
        );
    }

    updateShadow() {
        const program = this.shadowProgram;
        let isInitShadow = false;

        const initShadow = () => {
            if (isInitShadow) return;
            isInitShadow = true;
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
            this.gl.viewport(0, 0, SHADOW_WIDHT, SHADOW_HEIGHT);
            this.gl.useProgram(program);
            this.clear();

            const camera = new CameraOrtho({ left: -50, right: 50, bottom: -50, top: 50 });
            const nearPlaneLocation = this.gl.getUniformLocation(program, 'nearPlane');
            this.gl.uniform1i(nearPlaneLocation, camera.near);

            const farPlaneLocation = this.gl.getUniformLocation(program, 'farPlane');
            this.gl.uniform1i(farPlaneLocation, camera.far);

            const [x, y, z] = this.pointLight.position;

            camera.move({ x, y, z });
            camera.lookAt(0, 0, 0);
            camera.computedCameraMatrix();

            const cameraMatrixLocation = this.gl.getUniformLocation(program, 'cameraMatrix');
            const cameraMatrix = camera.getCameraMatrix();
            this.gl.uniformMatrix4fv(cameraMatrixLocation, false, cameraMatrix);
            this.shadowLightCameraMatrix = cameraMatrix;
        };
        
        for (let i = 0; i < this.meshs.length; i++) {
            const mesh = this.meshs[i];
            if (!mesh.isOpenShadow) {
                continue;
            }
            initShadow();
            // 更新计算所有矩阵
            mesh.computedMeshMatrix();
            const attributes = mesh.getAttributes();
            const material = mesh.getMaterial();
            const drawMode = material.getDrawMode();

            // 顶点数据
            for (const key in attributes) {
                const value = attributes[key];
                if (key === 'normal' || key === 'texture') {
                    continue;
                }
                // 顶点索引
                else if (key === 'index') {
                    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, value.buffer);
                }
                // 顶点位置、顶点颜色、顶点法线
                else if (value) {
                    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, value.buffer);
                    const location = this.gl.getAttribLocation(program, key);
                    this.gl.vertexAttribPointer(location, value.n, this.gl[value.type], false, 0, 0);
                    this.gl.enableVertexAttribArray(location);
                }
            }

            // 顶点变换矩阵
            const meshMatrixLocation = this.gl.getUniformLocation(program, 'meshMatrix');
            const meshMatrix = mesh.getMeshMatrix();
            this.gl.uniformMatrix4fv(meshMatrixLocation, false, meshMatrix);

            this.gl.drawElements(this.gl[drawMode], attributes.index.data.length, this.gl.UNSIGNED_SHORT, 0);
        }

        if (isInitShadow) {
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.viewport(0, 0, this.width, this.height);
            
        }
        this.gl.useProgram(this.program);
        this.clear();
    }

    drawMeshs() {
        // 使用阴影
        if (this.shadowLightCameraMatrix) {
            this.gl.uniform1i(this.program.uShadowSampler, 0);
            const shadowLightCameraMatrixLocation = this.gl.getUniformLocation(this.program, 'shadowLightCameraMatrix');
            const shadowLightCameraMatrix = this.shadowLightCameraMatrix;
            this.gl.uniformMatrix4fv(shadowLightCameraMatrixLocation, false, shadowLightCameraMatrix);

            const useShadowLocation = this.gl.getUniformLocation(this.program, 'useShadow');
            this.gl.uniform1i(useShadowLocation, 1);
        }

        for (let i = 0; i < this.meshs.length; i++) {
            const mesh = this.meshs[i];
            // 更新计算所有矩阵
            mesh.computedMeshMatrix();
            const attributes = mesh.getAttributes();
            const material = mesh.getMaterial();
            const image = mesh.material.getImage();
            const drawMode = material.getDrawMode();

            // 顶点数据
            for (const key in attributes) {
                const value = attributes[key];
                // 顶点索引
                if (key === 'index') {
                    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, value.buffer);
                }
                // 顶点纹理
                else if (key === 'texture') {
                    // 是否开启纹理
                    const isOpenTexture = !!value.data.length;
                    this.gl.uniform1i(this.gl.getUniformLocation(this.program, 'useTexture'), isOpenTexture ? 1 : 0);
                    if (!isOpenTexture) {
                        continue;
                    }
                    const { texture } = value;
                    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, value.buffer);
                    const location = this.gl.getAttribLocation(this.program, key);
                    this.gl.vertexAttribPointer(location, value.n, this.gl[value.type], false, 0, 0);
                    this.gl.enableVertexAttribArray(location);
                    const uSamplerLoaction = this.gl.getUniformLocation(this.program, 'uSampler');
                    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
                    this.gl.activeTexture(this.gl.TEXTURE1);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, image);
                    this.gl.uniform1i(uSamplerLoaction, 1);
                }
                // 顶点位置、顶点颜色、顶点法线
                else if (value) {
                    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, value.buffer);
                    const location = this.gl.getAttribLocation(this.program, key);
                    this.gl.vertexAttribPointer(location, value.n, this.gl[value.type], false, 0, 0);
                    this.gl.enableVertexAttribArray(location);
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

            // 使用高光
            const usePhoneMaterialLocation = this.gl.getUniformLocation(this.program, 'usePhoneMaterial');
            this.gl.uniform1i(usePhoneMaterialLocation, material instanceof MaterialPhone ? 1 : 0);

            this.gl.drawElements(this.gl[drawMode], attributes.index.data.length, this.gl.UNSIGNED_SHORT, 0);
        }
    }

    clear() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.DEPTH_TEST);
    }

    draw() {
        this.updateShadow();
        this.updateCamera();
        this.updateLight();
        this.drawMeshs();
    }
};