import { Web3D } from '../../web3D/index.js';
import { CameraPerspective } from '../../web3D/camera/index.js';
// import { GeometryCube } from '../../web3D/geometry/index.js';
import { MaterialPhone } from '../../web3D/material/index.js';
import { Mesh } from '../../web3D/mesh/index.js';
import { LightAmbient, LightDirectional, LightPoint } from '../../web3D/light/index.js';
import { loadObj } from '../../web3D/loader/obj.js';

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
    const geometry = await loadObj('./models/bunny.obj');
    const boxMesh = new Mesh(
        geometry,
        new MaterialPhone({ color: '#777' })
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
    ])

    camera.move({ x: 0, y: 5, z: 5 });
    camera.lookAt(0, 0, 0);

    const animated = () => {
        boxMesh.rotate({ x: 0, y: 1, z: 0, delta: 0.01 });
        web3D.draw();
        requestAnimationFrame(animated);
    };

    animated();


};

start();