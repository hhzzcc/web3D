// 存储顶点、法线、纹理、索引
export class Geometry {
    constructor() {
        this.position = null;
        this.normal = null;
        this.texture = null;
        this.index = null;
    }

    setPosition(position) {
        this.position = position;
    }

    setNormal(normal) {
        this.normal = normal;
    }

    setTexture(texture) {
        this.texture = texture;
    }

    setIndex(index) {
        this.index = index;
    }

    getPosition() {
        return this.position;
    }

    getNormal() {
        return this.normal;
    }

    getTexture() {
        return this.texture;
    }

    getIndex() {
        return this.index;
    }
};