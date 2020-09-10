import { create, translate, rotate, multiply, lookAt } from '../utils/math.js';

export class Camera {
    constructor() {
        this.position = [0, 0, 0];
        this.rx = 0;
        this.ry = 0;
        this.rz = 0;

        this.view = [0, 0, 10];


        this.matrix = create();
        this.cameraMatrix = create();
        // this.translateMatrix = create();
        // this.rotateMatrix = create();
        this.viewMatrix = lookAt([], this.position,  this.view, [0, 1, 0]);
        
    }

    move({ x, y, z }) {
        this.position = [
            this.position[0] + x,
            this.position[1] + y,
            this.position[2] + z
        ];
        this.view = [
            this.view[0] + x,
            this.view[1] + y,
            this.view[2] + z
        ];
    }

    lookAt(x, y, z) {
        this.view = [x, y, z];
    }

    // setRotate(delta, x, y, z) {
    //     if (x > 0) this.rx = delta;
    //     if (y > 0) this.ry = delta;
    //     if (z > 0) this.rz = delta;
    //     rotate(this.rotateMatrix, create(), delta, [x, y, z]);
        
    // }

    // rotate(delta, x, y, z) {
    //     if (x > 0) this.rx += delta;
    //     if (y > 0) this.ry += delta;
    //     if (z > 0) this.rz += delta;
    //     rotate(this.rotateMatrix, this.rotateMatrix, delta, [x, y, z]);
    // }

    getPosition() {
        return this.position;
    }

    getView() {
        return this.view;
    }

    getCameraMatrix() {
        this.viewMatrix = lookAt([], this.position, this.view, [0, 1, 0]);
        return multiply([], this.cameraMatrix, this.viewMatrix);
    }
}