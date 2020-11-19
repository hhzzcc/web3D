import { Camera } from './camera.js';
import { ortho } from '../utils/math.js';

export class CameraOrtho extends Camera {
    constructor(options = {}) {
        super();
        const { left, right, bottom, top, near = 0.1, far = 100.0 } = options;
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
        this.near = near;
        this.far = far;
        ortho(this.projectMatrix, left, right, bottom, top, near, far);
    }
};