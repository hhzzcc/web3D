import { parseColor } from '../utils/parse.js';
export class Light {
    constructor() {
        this.position = [0, 0, 0];
        this.color = '#fff';
        this.strength = 1;
    }

    move({ x, y, z }) {
        this.position = [
            this.position[0] + (x || 0),
            this.position[1] + (y || 0),
            this.position[2] + (z || 0),
        ];
    }

    getPosition() {
        return this.position;
    }

    setColor(color) {
        this.color = parseColor(color);
    }

    getColor() {
        return this.color.map(c => c * Math.min(1, this.strength));
    }

    setStrength(strength) {
        this.strength = strength;
    }

    getStrength() {
        return this.strength;
    }
}