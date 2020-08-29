import { create, translate, rotate } from '../utils/math.js';

export class Camera {
    constructor() {
        this.matrix = create();
        this.position = [0, 0, 0];
    }

    setPosition({ x, y, z }) {
        this.position = [
            x || this.position[0],
            y || this.position[1],
            z || this.position[2]
        ]
        translate(this.matrix, this.matrix, this.position.map(p => -1 * p));
    }

    rotate(delta, x, y, z) {
        rotate(this.matrix, this.matrix, delta, [x, y, z]);
    }

    getPosition() {
        return this.position;
    }

    getCameraMatrix() {
        return this.matrix;
    }
}