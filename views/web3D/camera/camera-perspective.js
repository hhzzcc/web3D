import { Camera } from './camera.js';
import { perspective } from '../utils/math.js';

export class CameraPerspective extends Camera {
    constructor(options = {}) {
        super();
        const { fov, aspect, near = 0.1, far = 1000.0 } = options;
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        perspective(this.projectMatrix, fov, aspect, near, far);
    }
};