import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export function loadGLTFModel(
  scene: THREE.Scene,
  glbPath: string,
  options = { receiveShadow: true, castShadow: true },
  scale = 1.5,
) {
  const { receiveShadow, castShadow } = options;

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      glbPath,
      (gltf: GLTF) => {
        const obj = gltf.scene;
        obj.name = "duck";
        obj.position.x = 0;
        obj.position.y = -2;
        obj.scale.set(scale, scale, scale);
        obj.receiveShadow = receiveShadow;
        obj.castShadow = castShadow;
        scene.add(obj);

        obj.traverse(function (object: THREE.Object3D<THREE.Object3DEventMap>) {
          if (object instanceof THREE.Mesh) {
            object.castShadow = castShadow;
          }
        });

        resolve(obj);
      },
      undefined,
      function (error: any) {
        reject(error);
      },
    );
  });
}
