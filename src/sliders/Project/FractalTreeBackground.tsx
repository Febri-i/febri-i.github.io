import { FractalTree } from "./FractalTree";
import { randRange } from "../../Utils";
import Canvas2D from "../../Canvas2D";
import { useSliderCtx } from "../../Slider";
import { createEffect, onCleanup } from "solid-js";

interface TreeData {
  tree: FractalTree;
  offsetX: number;
}

export interface IFractalTreeBackgroundProps {
  totalTree: number;
  duration: number;
  autoStop?: boolean;

  getColor: (brightness: number) => string;
}

export default function FractalTreeBackground(
  props: IFractalTreeBackgroundProps
) {
  let trees: TreeData[] = [];
  let isVisible: boolean = false;
  const [sliderIndex] = useSliderCtx();
  if (props.autoStop !== false && props.autoStop !== true) {
    props.autoStop = true;
  }
  onCleanup(() => {
    trees = [];
  });
  for (let i = 0; i < props.totalTree; i++) {
    const color = props.getColor(i / props.totalTree);
    const tree = new FractalTree({
      totalChildBranch: 4,
      presistance: randRange(0.55, 0.65),
      maxLength: randRange(76, 200),
      maxSize: randRange(20, 30),
      density: randRange(0.5, 1.5),
      sizeLoss: randRange(0.3, 0.7),
      lengthTreshold: randRange(30, 50),
      woodColor: color,
      leafColor: color,
      duration: props.duration,
    });

    trees.push({ tree, offsetX: Math.random() });
  }

  createEffect(() => {
    const index = sliderIndex();
    isVisible = Math.floor(index) == 2 && Math.ceil(index) == 2;
  });

  const handleDraw = (
    delta: number,
    context: CanvasRenderingContext2D
  ): void => {
    if (!isVisible && props.autoStop) {
      return;
    }
    trees.forEach((tree) => {
      tree.tree.stepAnimation(delta * 10);
      tree.tree.renderAnimation(context, {
        x: tree.offsetX * context.canvas.width,
        y: context.canvas.height,
      });
    });
  };

  return (
    <div class="w-full h-full">
      <Canvas2D draw={handleDraw} />
    </div>
  );
}
