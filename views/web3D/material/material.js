// 颜色、纹理图片
export class Material {
    constructor() {
        this.color = null;
        this.image = null;
    }

    setColor(color) {
        if (typeof color === 'function') {
            this.color = color();
            return;
        }
        this.color = color;
    }

    setImage(image) {
        this.image = image;
    }

    getColor() {
        return this.color;
    }

    getImage() {
        return this.image;
    }
};