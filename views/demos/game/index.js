import { Web3D } from '../../web3D/index.js';
import { CameraPerspective } from '../../web3D/camera/index.js';
import { GeometryCube, GeometrySphare, GeometryFace } from '../../web3D/geometry/index.js';
import { MaterialBase, MaterialPhone } from '../../web3D/material/index.js';
import { Mesh } from '../../web3D/mesh/index.js';
import { LightAmbient, LightDirectional, LightPoint } from '../../web3D/light/index.js';

import { Pointer } from './js/pointer/index.js';
import { Keyword } from './js/keyword/index.js';


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

    // 透视投影相机
    const camera = new CameraPerspective({ fov: Math.PI / 6, aspect: window.innerWidth / window.innerHeight });


    // 地球
    const earthImage = await loadImage('./imgs/earth.jpeg');
    const earthMesh = new Mesh(
        new GeometrySphare({ radius: 1 }),
        new MaterialBase({ image: earthImage })
    );

    const faceBackMesh = new Mesh(
        new GeometryFace({ l: 10, w: 10 }),
        new MaterialPhone()
    );

    const faceBottomMesh = new Mesh(
        new GeometryFace({ l: 10, w: 10 }),
        new MaterialPhone()
    );

    const faceLeftMesh = new Mesh(
        new GeometryFace({ l: 10, w: 10 }),
        new MaterialPhone()
    );

    // 环境光
    const lightAmbient = new LightAmbient({ color: [1, 1, 1], strength: 0.3 });

    // 平行光
    const lightDirectional = new LightDirectional({ position: [-5, 0, 2], strength: 0.5 });

    // 点光源
    const lightPoint = new LightPoint({ position: [0, 0, 2], strength: 0.5 });


    web3D.add([
        camera,
        earthMesh,
        faceBackMesh,
        faceBottomMesh,
        faceLeftMesh,
        lightAmbient,
        lightDirectional,
        lightPoint
    ]);

    camera.move({ x: 0, y: 0, z: 10 });
    earthMesh.setPosition({ x: 0, y: 0, z: 0 });
    faceBackMesh.setPosition({ x: 0, y: 0, z: -5 });
    
    faceBottomMesh.rotate({ x: 1, y: 0, z: 0, delta: -Math.PI / 2 });
    faceBottomMesh.setPosition({ x: 0, y: -5, z: 0 });

    faceLeftMesh.rotate({ x: 0, y: 1, z: 0, delta: -Math.PI / 2 });
    faceLeftMesh.setPosition({ x: -5, y: 0, z: 0 });
    
    const pointer = new Pointer();
    const keyword = new Keyword();
    pointer.start(camera);
    keyword.start(camera);


    const animated = () => {
        earthMesh.rotate({ x: 0, y: 1, z: 0, delta: 0.01 });
        web3D.draw();
        requestAnimationFrame(animated);
    };

    animated();
};

start();