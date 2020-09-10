import { Geometry } from '../geometry/index.js';

export const loadObj = async url => {
    const data = await fetch(url).then(res => res.text());
    const list = data.split('\n');

    let position = [];
    let normal = [];
    let index = [];
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        // 顶点
        if (/^v /.test(item)) {
            const [_, x, y, z] = item.split(/ /);
            position.push(+x, +y, +z);
        }
        // 法线
        if (/^vn /.test(item)) {
            const [_, x, y, z] = item.split(/ /);
            normal.push(+x, +y, +z);
        }
        // 索引
        if (/^f /.test(item)) {
            const [_, x, y, z] = item.split(/ /);
            index.push(+x.split('//')[0] - 1, +y.split('//')[0] - 1, +z.split('//')[0] - 1);
        }
    }

    const geometry = new Geometry();
    geometry.setPosition(position);
    geometry.setNormal(normal);
    geometry.setIndex(index);

    return geometry;
};