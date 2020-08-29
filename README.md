## Web3D

## 使用原生webgl打造类似three.js的简单3d框架，属于个人周末空闲时间创造的玩具，顺便练练手


## 创建一个地球、一个木块 [Demo链接](https://hhzzcc.github.io/web3D/views/public/index.html)

```javascript
// javascript index.js
import { Web3D } from './web3D/index.js';
import { CameraPerspective } from './web3D/camera/index.js';
import { GeometryCube, GeometrySphare } from './web3D/geometry/index.js';
import { MaterialBase } from './web3D/material/index.js';
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
    // 初始化
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
        new MaterialBase({ image: boxImage })
    );

    // 环境光
    const lightAmbient = new LightAmbient({ color: [1, 1, 1], strength: 0.3 });

    // 平行光
    const lightDirectional = new LightDirectional({ position: [-5, 0, 2], strength: 0.5 });

    // 点光源
    const lightPoint = new LightPoint({ position: [0, 0, 2], strength: 0.5 });


    // 将元素加入场景
    web3D.add(camera);
    web3D.add(earthMesh);
    web3D.add(boxMesh);
    web3D.add(lightAmbient);
    web3D.add(lightDirectional);
    web3D.add(lightPoint);

    // 设置位置
    camera.setPosition({ x: 0, y: 0, z: 10 });
    earthMesh.setPosition({ x: 0, y: 1, z: 2 });
    boxMesh.setPosition({ x: 0, y: -1, z: 0 });

    // 帧循环动画
    const animated = () => {
        boxMesh.rotate({ x: 1, y: 1, z: 0, delta: 0.01 });
        earthMesh.rotate({ x: 0, y: 1, z: 0, delta: 0.01 });
        web3D.draw();
        requestAnimationFrame(animated);
    };

    animated();
};

start();

```