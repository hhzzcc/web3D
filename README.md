## Web3D

#### webgl打造简单3d渲染框架

[在线所有示例](https://hhzzcc.github.io/web3D/views/demos)<br>

#### 运行
```bash
# 安装依赖
yarn or npm i

# 运行
yarn serve or npm run serve

# 打开浏览器输入
localhost:1234/views/demos

```

#### 代码示例
```javascript
// index.js
import { Web3D } from '../../web3D/index.js';
import { CameraPerspective } from '../../web3D/camera/index.js';
import { GeometryCube } from '../../web3D/geometry/index.js';
import { MaterialBase } from '../../web3D/material/index.js';
import { Mesh } from '../../web3D/mesh/index.js';
import { LightAmbient, LightDirectional, LightPoint } from '../../web3D/light/index.js';

const start = async () => {
    
    const web3D = new Web3D();
    const parentDom = document.querySelector('.web3d');
    const width = parentDom.offsetWidth;
    const height = parentDom.offsetHeight;
    const web3dDom = await web3D.init({ width, height });
    parentDom.appendChild(web3dDom);

    // 透视投影相机
    const camera = new CameraPerspective({ fov: Math.PI / 6, aspect: width / height });

    // 物体
    const boxMesh = new Mesh(
        // 正方体
        new GeometryCube({ l: 1, w: 1, h: 1 }),
        // 普通材质
        new MaterialBase({ color: '#2254f4' })
    );

    // 环境光
    const lightAmbient = new LightAmbient({ color: '#fff', strength: 0.3 });

    // 平行光
    const lightDirectional = new LightDirectional({ position: [-5, 0, 2], strength: 0.5 });

    // 点光源
    const lightPoint = new LightPoint({ position: [-1, -1, 2], strength: 1.0 });


    // 将相机、物体、光线添加到3d场景中
    web3D.add([
        camera,
        boxMesh,
        lightAmbient,
        lightDirectional,
        lightPoint
    ])

    // 设置相机位置
    camera.move({ x: 5, y: 5, z: 10 });
    camera.lookAt(0, 0, 0);

    // 绘制3d场景
    web3D.draw();


};

start();

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0; 
        }

        body {
            overflow: hidden;
        }

        .web3d {
            width: 100%;
            height: 100vh;
        }
    </style>
</head>
<body>
    <div class="web3d"></div>
    <script src="./index.js" type="module"></script>
</body>
</html>
```

[运行结果](https://hhzzcc.github.io/web3D/views/demos/phone)<br>
