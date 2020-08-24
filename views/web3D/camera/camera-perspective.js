import { Camera } from './camera.js';
import { perspective } from '../utils/math.js';

export class CameraPerspective extends Camera {
    constructor(options = {}) {
        super();
        if (!options.fov) {
            console.error('need fov');
        }
        if (!options.aspect) {
            console.error('need aspect');
        }
        const { fov, aspect } = options;
        perspective(this.matrix, fov, aspect, 0.1, 1000.0);
    }
};