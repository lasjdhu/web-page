import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { isWebGLAvailable } from "./isWebGLAvailable";

interface ThreeSceneOptions {
  modelPath: string;
  modelScale?: number;
  initialCameraPosition?: THREE.Vector3;
  targetPosition?: THREE.Vector3;
}

export const useThreeScene = ({
  modelPath,
  modelScale = 0.8,
  initialCameraPosition = new THREE.Vector3(20, 10, 20),
  targetPosition = new THREE.Vector3(-0.5, 1.2, 0),
}: ThreeSceneOptions) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    animationFrame: number;
  }>(null);

  const loadModel = async (
    scene: THREE.Scene,
    options = { receiveShadow: false, castShadow: false },
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
      setError("Failed to load 3D model");
      throw error;
    }
  };

  const setupScene = useCallback(
    (container: HTMLElement) => {
      if (!isWebGLAvailable()) {
        setWebGLSupported(false);
        setError("WebGL is not supported in your browser");
        setLoading(false);
        return;
      } else {
        setWebGLSupported(true);
      }

      const { clientWidth: width, clientHeight: height } = container;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          precision: "mediump",
          failIfMajorPerformanceCaveat: false,
          canvas: document.createElement("canvas"),
          preserveDrawingBuffer: true,
        });
      } catch (e) {
        console.error("WebGL renderer creation failed:", e);
        setError("Could not initialize 3D renderer");
        setLoading(false);
        return;
      }

      try {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const scale = height * 0.005 + 4.8;
        const camera = new THREE.OrthographicCamera(
          -scale,
          scale,
          scale,
          -scale,
          0.01,
          50000,
        );
        camera.position.copy(initialCameraPosition);
        camera.lookAt(targetPosition);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
        dirLight.position.set(10, 10, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.set(2048, 2048);
        scene.add(dirLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
        scene.add(hemiLight);

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

        loadModel(scene)
          .then(() => {
            setLoading(false);
            animate();
          })
          .catch((error) => {
            console.error("Failed to load model:", error);
            setError("Failed to load 3D model");
            setLoading(false);
          });
      } catch (e) {
        console.error("Error in scene setup:", e);
        setError("Failed to initialize 3D scene");
        setLoading(false);

        if (renderer && renderer.domElement) {
          try {
            renderer.dispose();
            if (renderer.domElement.parentNode) {
              renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
          } catch (cleanupError) {
            console.error("Error during cleanup:", cleanupError);
          }
        }
      }
    },
    [initialCameraPosition, targetPosition, modelScale, modelPath],
  );

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

    const scale = height * 0.005 + 4.8;
    camera.left = -scale;
    camera.right = scale;
    camera.top = scale;
    camera.bottom = -scale;
    camera.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    const container = document.getElementById("model-container");
    if (!container) {
      setError("Model container not found");
      setLoading(false);
      return;
    }

    setupScene(container);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (sceneRef.current) {
        const { renderer, scene, animationFrame } = sceneRef.current;
        cancelAnimationFrame(animationFrame);
        scene.clear();
        try {
          renderer.dispose();
          if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        } catch (e) {
          console.error("Error cleaning up renderer:", e);
        }
      }
    };
  }, [setupScene, handleResize]);

  return { loading, error, webGLSupported };
};
