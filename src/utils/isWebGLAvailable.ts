export const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    const result = !!gl;
    return result;
  } catch (e) {
    console.error("WebGL detection failed", e);
    return false;
  }
};
