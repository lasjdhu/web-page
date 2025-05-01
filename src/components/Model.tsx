import "../styles/global.css";
import { useThreeScene } from "../utils/useThreeScene";

export default function Model() {
  const { loading, error, webGLSupported } = useThreeScene({
    modelPath: "/duck.glb",
  });

  if (!webGLSupported || error) {
    return (
      <div
        id="model-container"
        className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center transition-opacity duration-700"
      >
        <img src="/favicon.ico" />
      </div>
    );
  }

  return (
    <div
      id="model-container"
      className={`w-16 h-16 md:w-24 md:h-24 transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}
      aria-busy={loading}
    />
  );
}
