const normalize = ([x, y, z], l = 100) => {
    const len = Math.sqrt(x * x + y * y + z * z) * l;
    return [x / len, y / len, z / len];
};

const cross = (a, b) => {
    const [x, y, z] = normalize([a[1] * b[2] - b[1] * a[2], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - b[0] * a[1]], 1);
    const len = 100;
    return [x / len, y / len, z / len];
};


const sub = (a, b) => {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export class Keyword {
    start(camera) {
        let x = 0;
        let y = 0;
        let z = 0;
        let stop = false;

        document.addEventListener('keyup', e => {
            stop = true
        });

        document.addEventListener('keydown', e => {
            stop = false;

            const fn = () => {
                if (stop) return;
                const view = camera.getView();
                const view1 = [view[0], 0, view[2]];
                const position = camera.getPosition();
                const [stepX, stepY, stepZ] = normalize(sub(view, position));
                const [stepX1, stepY1, stepZ1] = cross(view, view1);
                switch(e.keyCode) {
                    case 87:
                        x = stepX;
                        y = stepY;
                        z = stepZ;
                        break;
                    case 83:
                        x = -stepX;
                        y = -stepY;
                        z = -stepZ;
                        break;
                    case 65:
                        x = stepX1;
                        y = stepY1;
                        z = stepZ1;
                        break;
                    case 68:
                        x = -stepX1;
                        y = -stepY1;
                        z = -stepZ1;
                        break;
                };
                camera.move({ x, y, z });
                requestAnimationFrame(fn);
            };
            fn();
        });
    }
};