import { Light } from './light.js';
export class LightPoint extends Light {
    constructor(options = {}) {
        const {
            position = [0, 0, 0],
            color = [1, 1, 1],
            strength = 1
        } = options;
        super();
        this.setPosition({
            x: position[0],
            y: position[1],
            z: position[2]
        });
        this.setStrength(strength);
        this.setColor(color);
    }
};