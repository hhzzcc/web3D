export class Pointer {
    start(camera) {
        const $el = document.body;

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
        camera.lookAt(e.movementX / 200, -e.movementY / 200, 0);
        
        // console.log(camera.rx);
        // if (camera.rx >= Math.PI / 2) {
        //     camera.setRotate(Math.PI / 2, 1, 0, 0);
        // }

        // if (camera.rx <= -Math.PI / 2) {
        //     camera.setRotate(-Math.PI / 2, 1, 0, 0);

        // }
    };
};