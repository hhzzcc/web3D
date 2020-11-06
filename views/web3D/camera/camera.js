import { create, translate, rotate, multiply, lookAt } from '../utils/math.js';

export class Camera {
    constructor() {
        this.position = [0, 0, 0];
        this.view = [0, 0, 0];

        this.cameraMatrix = create();
        this.perspectiveMatrix = create();
        this.viewMatrix = create();
        
    }

    // 平移
    move({ x, y, z }) {
        this.position = [
            this.position[0] + x,
            this.position[1] + y,
            this.position[2] + z
        ];
        this.lookAt(this.view[0] + x, this.view[1] + y, this.view[2] + z);
    }

    // 视角
    lookAt(x, y, z) {
        this.view = [x, y, z];
        lookAt(this.viewMatrix, this.position,  this.view, [0, 1, 0]);
    }

    computedCameraMatrix() {
        multiply(this.cameraMatrix, this.perspectiveMatrix, this.viewMatrix);
    }

    getCameraMatrix() {
        return this.cameraMatrix;
    }

    getView() {
        return this.view;
    }

    getPosition() {
        return this.position;
    }
}