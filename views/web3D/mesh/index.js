import { getAttributes, getUniforms, getOther } from './utlis/shader-data.js';
import { create, translate, rotate, invert, transpose, multiply } from '../utils/math.js';

export class Mesh {
    constructor(geometry, material) {
        this.init(geometry, material);
    }

    init(geometry, material) {
        this.geometry = geometry;
        this.material = material;

        this.position = [0, 0, 0];
        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;
        this.delta = 0;

        this.meshMatrix = create();
        this.translateMatrix = create();
        this.rotateMatrix = create();
        this.normalMatrix = create();

        this.attributes = null;
    }

    // 设置顶点数据对应shader attribute类型数据，需要传入gl，生成相应buffer
    setAttributes(gl) {
        this.attributes = getAttributes(gl, this);
    }

    getAttributes() {
        return this.attributes;
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

    // 计算法线变换后的矩阵
    computedNormalMatrix() {
        invert(this.normalMatrix, this.meshMatrix);
        transpose(this.normalMatrix, this.normalMatrix);
    }

    // 计算并更新平移后的矩阵
    computedTranslateMatrix() {
        translate(this.translateMatrix, this.translateMatrix, this.position);
        multiply(this.meshMatrix, this.translateMatrix, this.rotateMatrix);
    }

    // 计算并更新旋转后的矩阵
    computedRotateMatrix() {
        rotate(this.rotateMatrix, this.rotateMatrix, this.delta, [this.rotateX, this.rotateY, this.rotateZ]);
        multiply(this.meshMatrix, this.translateMatrix, this.rotateMatrix);
    }

    setPosition({ x, y, z }) {
        this.position = [
            x || this.position[0],
            y || this.position[1],
            z || this.position[2]
        ]
        this.computedTranslateMatrix();
    }

    rotate({ x, y, z, delta }) {
        this.rotateX = x;
        this.rotateY = y;
        this.rotateZ = z;
        this.delta = delta;
        this.computedRotateMatrix();
        this.computedNormalMatrix();
    }

    getPosition() {
        return this.position;
    }
};