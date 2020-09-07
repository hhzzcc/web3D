export class Keyword {
    start(camera) {
        document.addEventListener('keydown', e => {
            const step = 0.1;
            let x = 0;
            let z = 0;
            switch(e.keyCode) {
                case 87:
                    z -= step;
                    break;
                case 83:
                    z += step;
                    break;
                case 65:
                    x += step;
                    break;
                case 68:
                    x -= step;
                    break;
            };
            camera.move({
                x,
                z
            });
        });
    }
};