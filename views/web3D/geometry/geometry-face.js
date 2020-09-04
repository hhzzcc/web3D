import { Geometry } from './geometry.js';

export class GeometryFace extends Geometry {
    constructor(options = {}) {
        super();
        const { l = 1, w = 1 } = options;
        const position = this.computedPosition(l, w);
        const normal = this.computedNormal();
        const texture = this.computedTexture();
        const index = this.computedIndex();
        this.setPosition(position);
        this.setNormal(normal);
        this.setTexture(texture);
        this.setIndex(index);
    }

    computedPosition(l, w) {
        const position = [
            // Front face
            -l / 2, -w / 2, 0,
            l / 2, -w / 2, 0,
            l / 2, w / 2, 0,
            -l / 2, w / 2, 0,

        ];
        return position;
    }

    computedNormal() {
        const normal = [
            // Front
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
        
        ];
        return normal;
    }

    computedTexture() {
        const texture = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ];
        return texture;
    }

    computedIndex() {
        const index = [
            0, 1, 2, 0, 2, 3, // Front
        ];
        return index;
    }

    
};