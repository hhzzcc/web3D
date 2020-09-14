import { Geometry } from '../../../web3D/geometry/index.js';

// https://webglfundamentals.org/webgl/lessons/webgl-load-obj.html
const parseOBJ = (text) => {
    // because indices are base 1 let's just fill in the 0th data
    const objPositions = [[0, 0, 0]];
    const objTexcoords = [[0, 0]];
    const objNormals = [[0, 0, 0]];
  
    // same order as `f` indices
    const objVertexData = [
      objPositions,
      objTexcoords,
      objNormals,
    ];
  
    // same order as `f` indices
    let webglVertexData = [
      [],   // positions
      [],   // texcoords
      [],   // normals
      [],   //index
    ];
  
    const materialLibs = [];
    const geometries = [];
    let geometry;
    let groups = ['default'];
    let material = 'default';
    let object = 'default';
  
    const noop = () => {};
  
    function newGeometry() {
      // If there is an existing geometry and it's
      // not empty then start a new one.
      if (geometry && geometry.data.position.length) {
        geometry = undefined;
      }
    }
  
    function setGeometry() {
      if (!geometry) {
        const position = [];
        const texcoord = [];
        const normal = [];
        const index = [];
        webglVertexData = [
          position,
          texcoord,
          normal,
          index,
        ];
        geometry = {
          object,
          groups,
          material,
          data: {
            position,
            texcoord,
            normal,
            index
          },
        };
        geometries.push(geometry);
      }
    }

    const idToIndexMap = {}
    let webglIndices = [];
     
    function addVertex(vert) {
      const ptn = vert.split('/');
      // first convert all the indices to positive indices
      const indices = ptn.map((objIndexStr, i) => {
        if (!objIndexStr) {
          return;
        }
        const objIndex = parseInt(objIndexStr);
        return objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
      });
      // now see that particular combination of position,texcoord,normal
      // already exists
      const id = indices.join(',');
      let vertIndex = idToIndexMap[id];
      if (!vertIndex) {
        // No. Add it.
        vertIndex = webglVertexData[0].length / 3;
        idToIndexMap[id] = vertIndex;
        indices.forEach((index, i) => {
          if (index !== undefined) {
            webglVertexData[i].push(...objVertexData[i][index]);
          }
        })
      }
      webglIndices.push(vertIndex);
    }
  
    const keywords = {
      v(parts) {
        objPositions.push(parts.map(parseFloat));
      },
      vn(parts) {
        objNormals.push(parts.map(parseFloat));
      },
      vt(parts) {
        // should check for missing v and extra w?
        objTexcoords.push(parts.map(parseFloat));
      },
      f(parts) {
        setGeometry();
        const numTriangles = parts.length - 2;
        for (let tri = 0; tri < numTriangles; ++tri) {
          addVertex(parts[0]);
          addVertex(parts[tri + 1]);
          addVertex(parts[tri + 2]);
        }
        geometry.data.index.push(...webglIndices);
        webglIndices = [];
      },
      s: noop,    // smoothing group
      mtllib(parts, unparsedArgs) {
        // the spec says there can be multiple filenames here
        // but many exist with spaces in a single filename
        materialLibs.push(unparsedArgs);
      },
      usemtl(parts, unparsedArgs) {
        material = unparsedArgs;
        newGeometry();
      },
      g(parts) {
        groups = parts;
        newGeometry();
      },
      o(parts, unparsedArgs) {
        object = unparsedArgs;
        newGeometry();
      },
    };
  
    const keywordRE = /(\w*)(?: )*(.*)/;
    const lines = text.split('\n');
    for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
      const line = lines[lineNo].trim();
      if (line === '' || line.startsWith('#')) {
        continue;
      }
      const m = keywordRE.exec(line);
      if (!m) {
        continue;
      }
      const [, keyword, unparsedArgs] = m;
      const parts = line.split(/\s+/).slice(1);
      const handler = keywords[keyword];
      if (!handler) {
        console.warn('unhandled keyword:', keyword);  // eslint-disable-line no-console
        continue;
      }
      handler(parts, unparsedArgs);
    }
  
    // remove any arrays that have no entries.
    for (const geometry of geometries) {
      geometry.data = Object.fromEntries(
          Object.entries(geometry.data).filter(([, array]) => array.length > 0));
    }

    return {
      geometries,
      materialLibs,
    };
};


export const loadObj = async url => {
    const data = await fetch(url).then(res => res.text());
    const obj = parseOBJ(data);
    const geometries = obj.geometries.map(g => {
        const { position, normal, texcoord, index } = g.data;
        const geometry = new Geometry();
        geometry.setPosition(position);
        geometry.setNormal(normal);
        geometry.setTexture(texcoord);
        geometry.setIndex(index);
        return geometry;
    });
    return geometries;
};