import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScaleLoader from "react-spinners/ScaleLoader";
import { loadGLTFModel } from "../utils/model";

export default function Model() {
  const [loading, setLoading] = useState(true);
  const refRenderer = useRef<THREE.WebGLRenderer>();
  const url = "/assets/duck.glb";

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer;
    const container = document.getElementById("model-container");
    if (container && renderer) {
      const { clientWidth: scW, clientHeight: scH } = container;
      renderer.setSize(scW, scH);
    }
  }, []);

  useEffect(() => {
    const container = document.getElementById("model-container");
    if (container) {
      const { clientWidth: scW, clientHeight: scH } = container;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
      refRenderer.current = renderer;

      const scene = new THREE.Scene();
      const target = new THREE.Vector3(-0.5, 1.2, 0);
      const initialCameraPosition = new THREE.Vector3(20, 10, 20);

      const scale = scH * 0.005 + 4.8;
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.01,
        50000,
      );
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);

      const ambientLight = new THREE.AmbientLight(0xcccccc, Math.PI);
      scene.add(ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;

      loadGLTFModel(scene, url, {
        receiveShadow: false,
        castShadow: false,
      }).then(() => {
        animate();
        setLoading(false);
      });

      let req: number;
      const animate = () => {
        req = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      return () => {
        cancelAnimationFrame(req);
        renderer.domElement.remove();
        renderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false);
    return () => {
      window.removeEventListener("resize", handleWindowResize, false);
    };
  }, [handleWindowResize]);

  return (
    <div style={{ position: "relative" }}>
      <div
        id="model-container"
        className="relative flex items-center justify-center w-48 h-48 lg:w-96 lg:h-96 align-center"
      ></div>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScaleLoader
            color="#F1FA8C"
            loading={loading}
            aria-label="Loading Spinner"
          />
        </div>
      )}
    </div>
  );
}
