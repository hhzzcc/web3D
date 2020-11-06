import { Web3D } from '../../web3D/index.js';
import { CameraPerspective } from '../../web3D/camera/index.js';
import { GeometryCube, GeometrySphare } from '../../web3D/geometry/index.js';
import { MaterialBase } from '../../web3D/material/index.js';
import { Mesh } from '../../web3D/mesh/index.js';
import { LightAmbient, LightPoint } from '../../web3D/light/index.js';
import { Group } from '../../web3D/group/index.js';



const start = async () => {
    
    const web3D = new Web3D();
    const parentDom = document.querySelector('.web3d');
    const width = parentDom.offsetWidth;
    const height = parentDom.offsetHeight;
    const web3dDom = await web3D.init({ width, height });
    parentDom.appendChild(web3dDom);

    // 透视投影相机
    const camera = new CameraPerspective({ fov: Math.PI / 6, aspect: width / height });


    // 方块1
    const boxMesh1 = new Mesh(
        new GeometryCube({ l: 1, w: 1, h: 1 }),
        new MaterialBase({ color: [1, 0.5, 1] })
    );
    boxMesh1.move({ x: -1.5, y: 0, z: 0 });

    // 球1
    const sphare1 = new Mesh(
        new GeometrySphare(),
        new MaterialBase({ color: [0.5, 0.5, 1] })
    );


    // 方块2
    const boxMesh2 = new Mesh(
        new GeometryCube({ l: 1, w: 1, h: 1 }),
        new MaterialBase({ color: [1, 0.5, 1] })
    );
    boxMesh2.move({ x: 1.5, y: 0, z: 0 });

    // 球2
    const sphare2 = new Mesh(
        new GeometrySphare(),
        new MaterialBase({ color: [0.5, 0.5, 1] })
    );
    sphare2.move({ x: 3, y: 0, z: 0 });

    // 环境光
    const lightAmbient = new LightAmbient({ color: [1, 1, 1], strength: 0.6 });

    // 点光源
    const lightPoint = new LightPoint({ position: [-1, -1, 2], strength: 1.0 });


    const group = new Group();
    group.add([boxMesh1, boxMesh2, sphare1, sphare2]);


    web3D.add([
        camera,
        lightAmbient,
        lightPoint,
        group
    ])

    camera.move({ x: 0, y: 0, z: 20 });
    camera.lookAt(0, 0, 0);


    let s = -1;
    const animated = () => {
        boxMesh1.rotate({ x: 0, y: 1, z: 0, delta: 0.01 });
        boxMesh2.rotate({ x: 1, y: 0, z: 0, delta: 0.01 });
        group.rotate({ x: 1, y: 1, z: 0, delta: 0.01 });
        s += 0.01;
        web3D.draw('LINE_LOOP');
        requestAnimationFrame(animated);
    };

    animated();
};

start();