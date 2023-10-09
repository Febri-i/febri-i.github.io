import { createEffect, onCleanup } from "solid-js";
import { Vec2 } from "./Types";

interface ICanvas2DProps {
  draw: (delta: number, context: CanvasRenderingContext2D) => void;
  sizeUpdate?: ((size: Vec2) => void) | null;
}

const Canvas2D = (props: ICanvas2DProps) => {
  // renderer.addEventListener();
  let canvasRef: HTMLCanvasElement | undefined;
  let canvasContext2d: CanvasRenderingContext2D | null;
  let animationRequestId: number = 0;
  let before: number = 0;
  let containerRef: HTMLDivElement | undefined;
  const updateSize = () => {
    if (!canvasRef) {
      return;
    }

    const { width, height } = canvasRef.getBoundingClientRect();
    canvasRef.width = width;
    canvasRef.height = height;

    if (!props.sizeUpdate) {
      return;
    }
    props.sizeUpdate({
      x: width,
      y: height,
    });
  };

  window.addEventListener("resize", updateSize);

  createEffect(() => {
    if (!canvasRef) {
      return;
    }

    updateSize();

    canvasContext2d = canvasRef.getContext("2d");

    new Promise(() => {
      const draw = (timestamp: number) => {
        if (!canvasContext2d) {
          return;
        }
        const delta = Math.min(timestamp - before, 200);

        props.draw(delta / 1000, canvasContext2d);

        before = timestamp;
        return (animationRequestId = requestAnimationFrame(draw));
      };

      animationRequestId = requestAnimationFrame(draw);
    });

    return () => {
      cancelAnimationFrame(animationRequestId);
    };
  });

  onCleanup(() => {
    cancelAnimationFrame(animationRequestId);
    window.removeEventListener("resize", updateSize);
  });

  return (
    // <div ref={containerRef}>
    <canvas ref={canvasRef} class="w-full h-full bg-transparent"></canvas>
    // </div>
  );
};

export default Canvas2D;
