
export class Group {
    constructor() {
        this.meshs = [];
        this.position = [0, 0, 0];
        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0
        this.delta = 0;
    }

    add(mesh) {
        if (Array.isArray(mesh)) {
            mesh.forEach(m => this.meshs.push(m))
        } else {
            this.meshs.push(mesh);
        }
        
    }

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

    rotate({ x, y, z, delta }) {
        this.delta += delta;
        this.rotateX = x;
        this.rotateY = y;
        this.rotateZ = z;
        this.meshs.forEach(mesh => {
            mesh.revolution({ x, y, z, delta });
        });
    }

    getMeshs() {
        return this.meshs;
    }
};