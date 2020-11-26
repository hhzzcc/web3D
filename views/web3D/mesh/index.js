import { getAttributes, getUniforms, getOther } from './utlis/shader-data.js';
import { create, translate, rotate, invert, transpose, multiply } from '../utils/math.js';
import { parseColor } from '../utils/parse.js';

export class Mesh {
    constructor(geometry, material, options = {}) {
        const {
            isOpenShadow = false,
            fogColor,
            fogDist,
            drawMode = 'TRIANGLES',
            drawType = 'drawElements',
            pointSize = 1 } = options;
        this.isOpenShadow = isOpenShadow;
        this.fogColor = fogColor && parseColor(fogColor);
        this.fogDist = fogDist;
        this.drawMode = drawMode;
        this.drawType = drawType;
        this.pointSize = pointSize;
        this.init(geometry, material);
    }

    init(geometry, material) {
        this.geometry = geometry;
        this.material = material;

        this.position = [0, 0, 0];

        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;
        this.rotateDelta = 0;

        this.revolutionX = 0;
        this.revolutionY = 0;
        this.revolutionZ = 0;
        this.revolutionDelta = 0;

        // 所有矩阵总和
        this.meshMatrix = create();
        // 平移矩阵
        this.translateMatrix = create();
        // 自转矩阵
        this.rotateMatrix = create();
        // 公转矩阵
        this.revolutionMatrix = create();
        // 法线矩阵
        this.normalMatrix = create();

        this.attributes = null;

        this.gl = null;
    }

    setFogColor(fogColor) {
        this.fogColor = parseColor(fogColor);
    }

    setFogDist(fogDist) {
        this.fogDist = parseColor(fogDist);
    }

    // 设置顶点数据对应shader attribute类型数据，需要传入gl，生成相应buffer
    setAttributes(gl) {
        if (!this.gl) {
            this.gl = gl;
        }
        this.attributes = getAttributes(gl, this);
    }

    getAttributes() {
        return this.attributes;
    }

    updateAttributes() {
        if (this.gl) {
            this.attributes = getAttributes(this.gl, this);
        }
    }

    setGeometry(geometry) {
        this.geometry = geometry;
    }

    getGeometry() {
        return this.geometry;
    }

    setMaterial(material) {
        this.material = material;
    }

    getMaterial() {
        return this.material;
    }

    getMeshMatrix() {
        return this.meshMatrix;
    }

    getNormalMatrix() {
        return this.normalMatrix; 
    }

    getPosition() {
        return this.position;
    }

    // 平移
    move({ x, y, z }) {
        this.position = [
            (x || 0) + this.position[0],
            (y || 0) + this.position[1],
            (z || 0) + this.position[2]
        ];
        translate(this.translateMatrix, create(), this.position);
    }

    // 自转
    rotate({ x, y, z, delta }) {
        this.rotateX = x;
        this.rotateY = y;
        this.rotateZ = z;
        this.rotateDelta += delta;
        rotate(this.rotateMatrix, create(), this.rotateDelta, [this.rotateX, this.rotateY, this.rotateZ]);
    }

    // 公转
    revolution({ x, y, z, delta }) {
        this.revolutionX = x;
        this.revolutionY = y;
        this.revolutionZ = z;
        this.revolutionDelta += delta;
        rotate(this.revolutionMatrix, create(), this.revolutionDelta, [this.revolutionX, this.revolutionY, this.revolutionZ]);
    }

    // 更新所有矩阵(draw调用)
    computedMeshMatrix() {
        const meshMatrix = create();
        multiply(meshMatrix, this.translateMatrix, this.rotateMatrix);
        multiply(meshMatrix, this.revolutionMatrix, meshMatrix);
        invert(this.normalMatrix, meshMatrix);
        transpose(this.normalMatrix, this.normalMatrix);
        this.meshMatrix = meshMatrix;
    }
};