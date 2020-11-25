import { Geometry } from '../../web3D/geometry/index.js';


export class GeometryPoint extends Geometry {
    constructor() {
        super();
        const position = this.computedPosition();
        this.setPosition(position);
    }

    computedPosition() {
        const position = [];
        for (let i = -30; i < 60; i++) {
            for (let j = -30; j < 60; j++) {
                position.push(i / 3, j / 3, 0);
            }
        }
        return position;
    }
};