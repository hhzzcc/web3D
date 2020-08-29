import { Light } from './light.js';
export class LightAmbient extends Light {
    constructor(options = {}) {
        const {
            color = [1, 1, 1],
            strength = 1
        } = options;
        super();
        this.setStrength(strength);
        this.setColor(color);
    }
};