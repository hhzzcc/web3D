import { create, translate, rotate, multiply, lookAt } from '../utils/math.js';

export class Camera {
    constructor() {
        this.position = [0, 0, 0];
        this.view = [0, 0, 0];
        this.cameraMatrix = create();
        this.projectMatrix = create();

    }

    // 视角
    lookAt(x, y, z) {
        this.view = [x, y, z];
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

    // 平移
    move({ x, y, z }) {
        this.position = [
            (x || 0) + this.position[0],
            (y || 0) + this.position[1],
            (z || 0) + this.position[2]
        ];
    }


    // 更新所有矩阵(draw调用)
    computedCameraMatrix() {
        const viewMatrix = lookAt([], this.position, this.view, [0, 1, 0]);
        const cameraMatrix = multiply([], this.projectMatrix, viewMatrix);
        this.cameraMatrix = cameraMatrix;
    }
}