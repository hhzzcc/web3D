import { Web3D } from './web3D/index.js';
import { CameraPerspective } from './web3D/camera/index.js';
import { GeometryCube, GeometrySphare } from './web3D/geometry/index.js';
import { MaterialBase, MaterialPhone } from './web3D/material/index.js';
import { Mesh } from './web3D/mesh/index.js';
import { LightAmbient, LightDirectional, LightPoint } from './web3D/light/index.js';

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
    const earthImage = await loadImage('../assets/imgs/earth.jpeg');
    const earthMesh = new Mesh(
        new GeometrySphare(),
        new MaterialBase({ image: earthImage })
    );

    // 箱子
    const boxImage = await loadImage('../assets/imgs/bg.jpeg');
    const boxMesh = new Mesh(
        new GeometryCube({ l: 1, w: 1, h: 1 }),
        new MaterialPhone({ image: boxImage })
    );

    // 环境光
    const lightAmbient = new LightAmbient({ color: [1, 1, 1], strength: 0.3 });

    // 平行光
    const lightDirectional = new LightDirectional({ position: [-5, 0, 2], strength: 0.5 });

    // 点光源
    const lightPoint = new LightPoint({ position: [0, 0, 2], strength: 0.5 });


    web3D.add(camera);
    web3D.add(earthMesh);
    web3D.add(boxMesh);
    web3D.add(lightAmbient);
    web3D.add(lightDirectional);
    web3D.add(lightPoint);

    camera.setPosition({ x: 0, y: 0, z: 10 });
    earthMesh.setPosition({ x: 0, y: 1, z: 2 });
    boxMesh.setPosition({ x: 0, y: -1, z: 0 });

    const animated = () => {
        boxMesh.rotate({ x: 1, y: 1, z: 0, delta: 0.01 });
        earthMesh.rotate({ x: 0, y: 1, z: 0, delta: 0.01 });
        web3D.draw();
        requestAnimationFrame(animated);
    };

    // 设置控制变量
    const setWeb3D = () => {
        
        const $sphareTexture = document.getElementById('sphare-texture');
        $sphareTexture.addEventListener('change', async () => {
            const image = await loadImage($sphareTexture.value);
            earthMesh.material.setImage(image);
        });

        const $cubeTexture = document.getElementById('cube-texture');
        $cubeTexture.addEventListener('change', async () => {
            const image = await loadImage($cubeTexture.value);
            boxMesh.material.setImage(image);
        });

        const $ambientLightStrength = document.getElementById('ambient-light-strength');
        $ambientLightStrength.addEventListener('input', () => {
            lightAmbient.setStrength($ambientLightStrength.value);
        });

        const $directionalLightStrength = document.getElementById('directional-light-strength');
        $directionalLightStrength.addEventListener('input', () => {
            lightDirectional.setStrength($directionalLightStrength.value);
        });

        const $directionalLightPositionX = document.getElementById('directional-light-position-x');
        $directionalLightPositionX.addEventListener('input', () => {
            lightDirectional.setPosition({ x: $directionalLightPositionX.value });
        });

        const $pointLightStrength = document.getElementById('point-light-strength');
        $pointLightStrength.addEventListener('input', () => {
            lightPoint.setStrength($pointLightStrength.value);
        });

        const $pointLightPositionX = document.getElementById('point-light-position-x');
        $pointLightPositionX.addEventListener('input', () => {
            lightPoint.setPosition({ x: $pointLightPositionX.value });
        });
    };

    animated();

    setWeb3D();
};

start();