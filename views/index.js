import { Web3D } from './web3D/index.js';
import { CameraPerspective } from './web3D/camera/index.js';
import { GeometryCube, GeometrySphare } from './web3D/geometry/index.js';
import { MaterialBase } from './web3D/material/index.js';
import { Mesh } from './web3D/mesh/index.js';

const loadImage = src => {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = src;
    });
}


const start = async () => {
    
    const web3D = new Web3D();
    await web3D.init();

    const camera = new CameraPerspective({ fov: Math.PI / 6, aspect: window.innerWidth / window.innerHeight });

    const geometry = new GeometryCube({ l: 1, w: 1, h: 1 });
    // const geometry = new GeometrySphare();
    const image = await loadImage('../assets/imgs/bg.jpeg');
    const image1 = await loadImage('../assets/imgs/earth.jpeg');

    const material = new MaterialBase({ image });
    const mesh = new Mesh(geometry, material);

    const geometry1 = new GeometrySphare();
    const material1 = new MaterialBase({ image: image1 });
    const mesh1 = new Mesh(geometry1, material1);

    web3D.add(camera);
    web3D.add(mesh1);
    web3D.add(mesh);

    camera.translate({ x: 0, y: 0, z: 10 });

    mesh.translate({ x: 0, y: -1, z: 2 });

    mesh1.translate({ x: 0, y: 1, z: 2 });

    const animated = () => {
        mesh.rotate({ x: 1, y: 1, z: 0, delta: 0.01 });
        mesh1.rotate({ x: 0, y: 1, z: 0, delta: 0.01 });
        web3D.draw();
        requestAnimationFrame(animated);
    };

    animated();
};

start();