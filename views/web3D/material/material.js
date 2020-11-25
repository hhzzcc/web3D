// 颜色、纹理图片
export class Material {
    constructor() {
        this.image = null;
        this.color = null;
    }

    setColor(color) {
        this.color = color;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 2;
        canvas.height = 2;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 2, 2);
        this.setImage(canvas);
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