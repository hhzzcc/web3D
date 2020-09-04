export class Pointer {
    start(camera) {
        const $el = document.body;
        const fn = e => {
            const move = this.move(e, camera);
        }
        $el.addEventListener('click', () => {
            $el.requestPointerLock();
                
        });

        document.addEventListener('pointerlockchange', () => {
            if (document.pointerLockElement === $el) {
                document.addEventListener("mousemove", fn);
            } else {
                document.removeEventListener("mousemove", fn);
            }
        });
    }

    move(e, camera) {
        camera.rotate(e.movementY / 200, 1, 0, 0);
        camera.rotate(e.movementX / 200, 0, 1, 0);
        
        // console.log(camera.rx);
        if (camera.rx >= Math.PI / 2) {
            camera.setRotate(Math.PI / 2, 1, 0, 0);
        }

        if (camera.rx <= -Math.PI / 2) {
            camera.setRotate(-Math.PI / 2, 1, 0, 0);

        }
    };
};