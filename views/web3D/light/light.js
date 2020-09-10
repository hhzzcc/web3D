export class Light {
    constructor() {
        this.position = [0, 0, 0];
        this.color = [1, 1, 1];
        this.strength = 1;
    }

    move({ x, y, z }) {
        this.position = [
            x || this.position[0],
            y || this.position[1],
            z || this.position[2],
        ];
    }

    getPosition() {
        return this.position;
    }

    setColor(color) {
        this.color = color;
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