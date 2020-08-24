import { Geometry } from './geometry.js';

export class GeometryCube extends Geometry {
    constructor(options = {}) {
        super();
        const { l = 1, w = 1, h = 1 } = options;
        const position = this.computedPosition(l, w, h);
        const normal = this.computedNormal();
        const texture = this.computedTexture();
        const index = this.computedIndex();
        this.setPosition(position);
        this.setNormal(normal);
        this.setTexture(texture);
        this.setIndex(index);
    }

    computedPosition(l, w, h) {
        const position = [
            // Front face
            -l / 2, -w / 2, h / 2,
            l / 2, -w / 2, h / 2,
            l / 2, w / 2, h / 2,
            -l / 2, w / 2, h / 2,

            // Back face
            -l / 2, -w / 2, -h / 2,
            -l / 2, w / 2, -h / 2,
            l / 2, w / 2, -h / 2,
            l / 2, -w / 2, -h / 2,

            // Top face
            -l / 2, w / 2, -h / 2,
            -l / 2, w / 2, h / 2,
            l / 2, w / 2, h / 2,
            l / 2, w / 2, -h / 2,

            // Bottom face
            -l / 2, -w / 2, -h / 2,
            l / 2, -w / 2, -h / 2,
            l / 2, -w / 2, h / 2,
            -l / 2, -w / 2, h / 2,

            // Right face
            l / 2, -w / 2, -h / 2,
            l / 2, w / 2, -h / 2,
            l / 2, w / 2, h / 2,
            l / 2, -w / 2, h / 2,

            // Left face
            -l / 2, -w / 2, -h / 2,
            -l / 2, -w / 2, h / 2,
            -l / 2, w / 2, h / 2,
            -l / 2, w / 2, -h / 2
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
        
            // Back
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
        
            // Top
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
        
            // Bottom
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
        
            // Right
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
        
            // Left
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0
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
            // Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Right
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];
        return texture;
    }

    computedIndex() {
        const index = [
            0, 1, 2, 0, 2, 3, // Front
            4, 5, 6, 4, 6, 7, // Back
            8, 9, 10, 8, 10, 11, // Top
            12, 13, 14, 12, 14, 15, // Bottom
            16, 17, 18, 16, 18, 19, // Right
            20, 21, 22, 20, 22, 23 // Left
        ];
        return index;
    }

    
};