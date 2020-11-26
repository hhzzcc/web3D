import { Web3D } from '../../web3D/index.js';
import { CameraPerspective } from '../../web3D/camera/index.js';
import { GeometryCube } from '../../web3D/geometry/index.js';
import { MaterialBase } from '../../web3D/material/index.js';
import { Mesh } from '../../web3D/mesh/index.js';
import { LightAmbient, LightPoint } from '../../web3D/light/index.js';


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
    const boxMesh = new Mesh(
        new GeometryCube({ l: 1, w: 1, h: 1 }),
        new MaterialBase({ color: '#2254f4' }),
        {
            fogColor: '#000',
            fogDist:  [1, 5.5]
        }
    );

    // 环境光
    const lightAmbient = new LightAmbient({ color: [1, 1, 1], strength: 0.6 });

    // 点光源
    const lightPoint = new LightPoint({ position: [4, 2, 2], strength: 1.0 });


    web3D.add([
        camera,
        boxMesh,
        lightAmbient,
        lightPoint
    ]);

    camera.move({ x: 4, y: 2, z: 3 });
    camera.lookAt(0, 0, 0);

    web3D.draw();
};

start();