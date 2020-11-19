const length = (a, b) => {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
}

export class Pointer {
    start(camera) {
        const $el = document.body;
        this.rx = 0;
        this.ry = 0;

        $el.addEventListener('click', () => {
            $el.requestPointerLock();
        });

        const fn = e => this.move(e, camera);
        document.addEventListener('pointerlockchange', () => {
            if (document.pointerLockElement === $el) {
                document.addEventListener("mousemove", fn);
            } else {
                document.removeEventListener("mousemove", fn);
            }
        });
    }

    move(e, camera) {
        this.rx += e.movementX / 200;
        this.ry += -e.movementY / 200;
        if (this.ry >= Math.PI / 2) {
            this.ry = Math.PI / 2;
        }

        if (this.ry <= -Math.PI / 2) {
            this.ry = -Math.PI / 2;

        }
        const rx = this.rx;
        const ry = this.ry;
        
        const view = camera.getView();
        const position = camera.getPosition();
        const l = length(view, position);

        const x = position[0] + l * Math.sin(rx) * Math.cos(ry);
        const y = position[1] + l * Math.sin(ry);
        const z = position[2] - l * Math.cos(rx) * Math.cos(ry);
        camera.lookAt(x, y, z);

    };
};