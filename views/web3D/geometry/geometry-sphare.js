import { Geometry } from './geometry.js';

const push = (arr, x) => { arr[arr.length] = x };

export class GeometrySphare extends Geometry {
	constructor(options = {}) {
		super();
        const { center = [ 0, 0, 0 ], radius = 0.5, latBands = 50, longBands = 50 } = options;
        const { position, normal, texture, index } = this.computed(center, radius, latBands, longBands);
		this.setPosition(position);
		this.setNormal(normal);
		this.setTexture(texture);
        this.setIndex(index);
	}

	computed(center, radius, latBands, longBands) {
		const position = [];
		const normal = [];
		const texture = [];
		const index = [];

		for (let letNum = 0; letNum <= latBands; letNum++) {
			const theta = letNum * Math.PI / latBands;
			const sinTheta = Math.sin(theta);
			const cosTheta = Math.cos(theta);

			for (let longNumber = 0; longNumber <= longBands; longNumber++) {
				const phi = longNumber * 2 * Math.PI / longBands;
				const sinPhi = Math.sin(phi);
				const cosPhi = Math.cos(phi);

				const x = cosPhi * sinTheta;
				const y = cosTheta;
				const z = sinPhi * sinTheta;

				const u = 1 - longNumber / longBands;
				const v = 1 - letNum / latBands;

				push(position, radius * x + center[0]);
				push(position, radius * y + center[1]);
				push(position, radius * z + center[2]);

				push(normal, x);
				push(normal, y);
				push(normal, z);

				push(texture, u);
				push(texture, v);
			}
		}

		for (let letNum = 0; letNum < latBands; letNum++) {
			for (let longNum = 0; longNum < longBands; longNum++) {
				const first = letNum * (longBands + 1) + longNum;
				const second = first + longBands + 1;

				push(index, first);
				push(index, second);
				push(index, first + 1);

				push(index, second);
				push(index, second + 1);
				push(index, first + 1);
			}
		}

		return {
			position,
			normal,
			texture,
			index
		};
	}
}
