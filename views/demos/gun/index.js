import { Web3D } from '../../web3D/index.js';
import { CameraPerspective } from '../../web3D/camera/index.js';
import { Geometry } from '../../web3D/geometry/index.js';
import { MaterialPhone } from '../../web3D/material/index.js';
import { Mesh } from '../../web3D/mesh/index.js';
import { LightAmbient, LightDirectional, LightPoint } from '../../web3D/light/index.js';
import { parseOBJ } from './utils/index.js';



const loadObj = async url => {
    const data = await fetch(url).then(res => res.text());
    const obj = parseOBJ(data);
    const { position, normal, index, texcoord } = obj.geometries[0].data;

    const geometry = new Geometry();
    geometry.setPosition(position);
    geometry.setNormal(normal);
    geometry.setIndex(index);
    geometry.setTexture(texcoord);

    return geometry;
};


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
    const geometry = await loadObj('./models/m4a1.obj');
    const image = await loadImage('./assets/texture.jpeg');
    const boxMesh = new Mesh(
        geometry,
        new MaterialPhone({ image })
    );

    // 环境光
    const lightAmbient = new LightAmbient({ color: [1, 1, 1], strength: 0.3 });

    // 平行光
    const lightDirectional = new LightDirectional({ position: [-5, 0, 2], strength: 0.5 });

    // 点光源
    const lightPoint = new LightPoint({ position: [10, 10, 2], strength: 1.0 });


    web3D.add([
        camera,
        boxMesh,
        lightAmbient,
        lightDirectional,
        lightPoint
    ])

    camera.move({ x: 50, y: 50, z: 40 });
    camera.lookAt(0, 0, 0);

    const animated = () => {
        boxMesh.rotate({ x: 0, y: 1, z: 0, delta: 0.01 });
        web3D.draw();
        requestAnimationFrame(animated);
    };

    animated();


};

start();