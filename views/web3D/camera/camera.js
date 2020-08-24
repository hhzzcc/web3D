import { create, translate, rotate } from '../utils/math.js';

export class Camera {
    constructor() {
        this.matrix = create();
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    translate({ x = 0, y = 0, z = 0 }) {
        this.x = x;
        this.y = y;
        this.z = z;
        translate(this.matrix, this.matrix, [-x, -y, -z]);
    }

    rotate(delta, x, y, z) {
        rotate(this.matrix, this.matrix, delta, [x, y, z]);
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }

    // translate({ x, y, z }) {
    //     this.x = x || this.x;
    //     this.y = y || this.y;
    //     this.z = z || this.z;
    //     this.computedMatrix();
    // }

    // rotate({ x, y, z, delta }) {
    //     this.rotateX = x || this.rotateX;
    //     this.rotateY = y || this.rotateY;
    //     this.rotateZ = z || this.rotateZ;
    //     this.delta = delta || this.delta;
    //     this.computedMatrix();
    // }

    getCameraMatrix() {
        return this.matrix;
    }
}