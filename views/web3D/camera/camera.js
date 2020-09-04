import { create, translate, rotate, multiply, lookAt } from '../utils/math.js';

export class Camera {
    constructor() {
        this.position = [0, 0, 0];
        this.rx = 0;
        this.ry = 0;
        this.rz = 0;

        this.matrix = create();
        this.cameraMatrix = create();
        this.translateMatrix = create();
        this.rotateMatrix = create();
        this.viewMatrix = lookAt([], [0, 0, 0], [0, 0, 0], [0, 1, 0]);
        
    }

    setPosition({ x, y, z }) {
        this.position = [
            x || this.position[0],
            y || this.position[1],
            z || this.position[2]
        ]
        translate(this.translateMatrix, this.translateMatrix, this.position.map(p => -1 * p));
    }

    setRotate(delta, x, y, z) {
        if (x > 0) this.rx = delta;
        if (y > 0) this.ry = delta;
        if (z > 0) this.rz = delta;
        rotate(this.rotateMatrix, create() , delta, [x, y, z]);
        
    }

    rotate(delta, x, y, z) {
        if (x > 0) this.rx += delta;
        if (y > 0) this.ry += delta;
        if (z > 0) this.rz += delta;
        rotate(this.rotateMatrix, this.rotateMatrix, delta, [x, y, z]);
    }

    getPosition() {
        return this.position;
    }

    getCameraMatrix() {
        const m = multiply([], this.rotateMatrix, this.translateMatrix);
        // const mv = multiply([], m, this.viewMatrix);
        const mvp = multiply([], this.cameraMatrix, m);
        return mvp;
    }
}