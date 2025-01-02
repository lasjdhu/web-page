import { useThreeScene } from "../utils/useThreeScene";

export default function Model() {
  const { loading } = useThreeScene({
    modelPath: "/duck.glb",
  });

  return (
    <div
      id="model-container"
      className={`w-16 h-16 md:w-24 md:h-24 transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
      aria-busy={loading}
    />
  );
}
