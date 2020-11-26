import { Web3D } from '../../web3D/index.js';
import { CameraPerspective } from '../../web3D/camera/index.js';
import { GeometryCube } from '../../web3D/geometry/index.js';
import { GeometryPoint } from './geometry-point.js';
import { MaterialBase } from '../../web3D/material/index.js';
import { Mesh } from '../../web3D/mesh/index.js';
import { LightAmbient } from '../../web3D/light/index.js';


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
    const geometry = new GeometryPoint();
    const mesh = new Mesh(
        geometry,
        new MaterialBase({ color: '#fff' }),
        { drawMode: 'POINTS', pointSize: 4 }
    );


    mesh.rotate({ x: 1, y: 0, z: 0, delta: -Math.PI / 2.5 });

    

    // 环境光
    const lightAmbient = new LightAmbient({ color: [1, 1, 1], strength: 0.6 });


    web3D.add([
        camera,
        mesh,
        lightAmbient
    ]);

    camera.move({ x: 0, y: 0, z: 15 });
    camera.lookAt(0, 0, 0);


    let s = 0
    const animated = () => {
        s += 0.01;
        const position = geometry.getPosition();
        const newPosition = position.map((p, i) => {
            if ((i + 1) % 3 === 0) {
                return Math.sin(s + i * 2) / 5;
            }
            return p;
        });
        geometry.setPosition(newPosition);
        mesh.updateAttributes();

        web3D.draw();
        requestAnimationFrame(animated);
    };

    animated();
};

start();