import { Web3D } from '../../web3D/index.js';
import { CameraPerspective } from '../../web3D/camera/index.js';
import { MaterialPhone } from '../../web3D/material/index.js';
import { Mesh } from '../../web3D/mesh/index.js';
import { LightAmbient, LightDirectional, LightPoint } from '../../web3D/light/index.js';
import { loadObj } from './utils/index.js';

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

    const [m4Geometrys, awmGeometrys] = await Promise.all([
        loadObj('./models/m4a1.obj'),
        loadObj('./models/awm.obj')
    ]);

    const hupiImage = await loadImage('./assets/texture.jpeg');
    const m4Meshs = m4Geometrys.map(geometry => {
        return new Mesh(geometry, new MaterialPhone({ image: hupiImage }));
    });

    const micaiImage = await loadImage('./assets/micai.jpg');
    const awmMeshs = awmGeometrys.map(geometry => {
        return new Mesh(geometry, new MaterialPhone({ image: micaiImage }));
    });

    // 环境光
    const lightAmbient = new LightAmbient({ color: [1, 1, 1], strength: 0.3 });

    // 平行光
    const lightDirectional = new LightDirectional({ position: [10, 0, 2], strength: 0.5 });

    // 点光源
    const lightPoint = new LightPoint({ position: [10, 10, 2], strength: 1.0 });

    web3D.add([
        camera,
        ...m4Meshs,
        ...awmMeshs,
        lightAmbient,
        lightDirectional,
        lightPoint
    ]);

    camera.move({ x: 100, y: 50, z: 100 });
    camera.lookAt(-10, 0, 0);
    m4Meshs[0].move({ x: 20 });

    const animated = () => {
        // awmMesh.rotate({ x: 0, y: 1, z: 0, delta: 0.01 });
        web3D.draw();
        requestAnimationFrame(animated);
    };

    animated();


};

start();