import { Camera } from './camera.js';
import { perspective } from '../utils/math.js';

export class CameraPerspective extends Camera {
    constructor(options = {}) {
        super();
        const { fov, aspect } = options;
        perspective(this.cameraMatrix, fov, aspect, 0.1, 10000.0);
    }
};