import { Web3D } from '../../web3D/index.js';
import { CameraPerspective } from '../../web3D/camera/index.js';
import { GeometryCube } from '../../web3D/geometry/index.js';
import { MaterialPhone } from '../../web3D/material/index.js';
import { Mesh } from '../../web3D/mesh/index.js';
import { LightAmbient, LightDirectional, LightPoint } from '../../web3D/light/index.js';

const loadImage = src => {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = src;
    });
};

const start = async () => {
    
    const web3D = new Web3D();
    const parentDom = document.querySelector('.web3d');
    const width = parentDom.offsetWidth;
    const height = parentDom.offsetHeight;
    const web3dDom = await web3D.init({ width, height });
    parentDom.appendChild(web3dDom);

    // 透视投影相机
    const camera = new CameraPerspective({ fov: Math.PI / 6, aspect: width / height });

    // 箱子
    const boxImage = await loadImage('./imgs/box.jpeg');
    const boxMesh = new Mesh(
        new GeometryCube({ l: 1, w: 1, h: 1 }),
        new MaterialPhone({ image: boxImage })
    );

    // 环境光
    const lightAmbient = new LightAmbient({ color: [1, 1, 1], strength: 0.3 });

    // 平行光
    const lightDirectional = new LightDirectional({ position: [-5, 0, 2], strength: 0.5 });

    // 点光源
    const lightPoint = new LightPoint({ position: [-1, -1, 2], strength: 1.0 });


    web3D.add([
        camera,
        boxMesh,
        lightAmbient,
        lightDirectional,
        lightPoint
    ]);
    

    camera.move({ x: 5, y: 5, z: 10 });
    camera.lookAt(0, 0, 0);

    let s = -1;
    const animated = () => {
        boxMesh.rotate({ x: 1, y: 0, z: 0, delta: 0.01 });
        boxMesh.move({ x: -Math.sin(s) / 100, y: 0, z: 0 });
        s += 0.01;
        web3D.draw();
        requestAnimationFrame(animated);
    };

    animated();
};

start();