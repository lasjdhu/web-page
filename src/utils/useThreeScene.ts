import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ThreeSceneOptions {
  modelPath: string;
  modelScale?: number;
  initialCameraPosition?: THREE.Vector3;
  targetPosition?: THREE.Vector3;
}

interface ModelOptions {
  receiveShadow?: boolean;
  castShadow?: boolean;
}

export const useThreeScene = ({
  modelPath,
  modelScale = 1.5,
  initialCameraPosition = new THREE.Vector3(20, 10, 20),
  targetPosition = new THREE.Vector3(-0.5, 1.2, 0),
}: ThreeSceneOptions) => {
  const [loading, setLoading] = useState(true);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    animationFrame: number;
  }>(null);

  const loadModel = async (
    scene: THREE.Scene,
    options: ModelOptions = { receiveShadow: false, castShadow: false }
  ) => {
    try {
      const loader = new GLTFLoader();
      const gltf: GLTF = await new Promise((resolve, reject) => {
        loader.load(modelPath, resolve, undefined, reject);
      });

      const model = gltf.scene;
      model.name = "model";
      model.position.set(0, -2, 0);
      model.scale.setScalar(modelScale);
      model.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = options.castShadow ?? false;
          object.receiveShadow = options.receiveShadow ?? false;
        }
      });

      scene.add(model);
      return model;
    } catch (error) {
      console.error("Error loading model:", error);
      throw error;
    }
  };

  const setupScene = useCallback((container: HTMLElement) => {
    const { clientWidth: width, clientHeight: height } = container;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Initialize scene
    const scene = new THREE.Scene();
    const scale = height * 0.005 + 4.8;
    const camera = new THREE.OrthographicCamera(
      -scale,
      scale,
      scale,
      -scale,
      0.01,
      50000
    );
    camera.position.copy(initialCameraPosition);
    camera.lookAt(targetPosition);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xcccccc, Math.PI);
    scene.add(ambientLight);

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.target = targetPosition;

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      animationFrame: 0,
    };

    // Load model and start animation
    loadModel(scene)
      .then(() => {
        setLoading(false);
        animate();
      })
      .catch((error) => console.error("Failed to load model:", error));
  }, [initialCameraPosition, targetPosition, modelScale, modelPath]);

  const animate = useCallback(() => {
    if (!sceneRef.current) return;

    const { scene, camera, renderer, controls } = sceneRef.current;
    controls.update();
    renderer.render(scene, camera);
    sceneRef.current.animationFrame = requestAnimationFrame(animate);
  }, []);

  const handleResize = useCallback(() => {
    if (!sceneRef.current) return;

    const container = document.getElementById("model-container");
    if (!container) return;

    const { clientWidth: width, clientHeight: height } = container;
    const { renderer, camera } = sceneRef.current;

    renderer.setSize(width, height);

    // Update camera frustum
    const scale = height * 0.005 + 4.8;
    camera.left = -scale;
    camera.right = scale;
    camera.top = scale;
    camera.bottom = -scale;
    camera.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    const container = document.getElementById("model-container");
    if (!container) return;

    setupScene(container);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (sceneRef.current) {
        const { renderer, scene, animationFrame } = sceneRef.current;
        cancelAnimationFrame(animationFrame);
        scene.clear();
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [setupScene, handleResize]);

  return { loading };
};


