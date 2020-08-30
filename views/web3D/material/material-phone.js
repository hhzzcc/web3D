import { Material } from "./material.js";

export class MaterialPhone extends Material {
    constructor(options = {}) {
        super();
        const { color = [1, 1, 1], image } = options;
        this.setColor(color);
        this.setImage(image);
    }
};