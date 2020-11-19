import { Material } from "./material.js";

export class MaterialPhone extends Material {
    constructor(options = {}) {
        super();
        const { color = '#fff', image, drawMode } = options;
        color && this.setColor(color);
        image && this.setImage(image);
        drawMode && this.setDrawMode(drawMode);
    }
};