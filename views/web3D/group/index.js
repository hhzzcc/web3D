export class Group {
    constructor() {
        this.meshs = [];
        this.position = [];
    }

    add(mesh) {
        this.meshs.push(mesh);
    }

    rotate() {}

    move({ x, y, z }) {
        this.position = [
            this.position[0] + (x || 0),
            this.position[1] + (y || 0),
            this.position[2] + (z || 0),
        ];
        this.meshs.forEach(mesh => {
            mesh.move({ x, y, z });
        });
    }
};