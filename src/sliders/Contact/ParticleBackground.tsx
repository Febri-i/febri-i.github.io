import { Particle } from "./Particle";
import { NoiseFunction2D, createNoise2D } from "simplex-noise";
import { randRange } from "../../Utils";
import Canvas2D from "../../Canvas2D";
import { Vec2 } from "../../Types";
import { createEffect, onCleanup } from "solid-js";
import { useSliderCtx } from "../../Slider";

import webworker from "./webworker/WebWorker?worker";
import { IWebWorkerParameter } from "./webworker/WorkerTypes";

export interface IParticleBGColor {
  r: number;
  g: number;
  b: number;
}

interface ParticleBackgroundProps {
  trailColor: IParticleBGColor;
  headColor: IParticleBGColor;
  autoStop?: boolean;
}

const maxParticleSpeed = 100;
const accelSpeed = 20;
const angleMultiplier = Math.PI * 2;
const posScalar = 0.0005;
const canvasOffset = 100;

const ParticleBackground = (props: ParticleBackgroundProps) => {
  const worker = new webworker();

  let particleRef: Particle[] = [];
  let noiseRef: NoiseFunction2D = createNoise2D();
  let shadowTurn: boolean = false;
  let screenSize: Vec2 = { x: 0, y: 0 };
  const [sliderIndex] = useSliderCtx();
  const trailclr = `rgba(${props.trailColor.r}, ${props.trailColor.g}, ${props.trailColor.b}, .1)`;
  const headclr = `rgba(${props.headColor.r}, ${props.headColor.g}, ${props.headColor.b}, `;

  createEffect(async () => {
    worker.onmessage = (e: MessageEvent<Particle[]>) => {
      particleRef = e.data;
    };
  });

  onCleanup(() => {
    particleRef = [];
  });

  if (props.autoStop !== false && props.autoStop !== true) {
    props.autoStop = true;
  }

  let canvasContainerRef: HTMLDivElement | undefined;
  createEffect(() => {
    const index = sliderIndex();
    if (!props.autoStop) {
      isNotVisible = false;
      return;
    }
    isNotVisible = Math.ceil(index) !== 3;
  });
  let isNotVisible: boolean = true;

  const getDirection = (position: Vec2): Vec2 => {
    const scaledDownPos: Vec2 = {
      x: Math.floor(position.x),
      y: Math.floor(position.y),
    };

    const angle: number =
      noiseRef(scaledDownPos.x * posScalar, scaledDownPos.y * posScalar) *
      angleMultiplier;
    return { x: Math.cos(angle), y: Math.sin(angle) };
  };

  const drawParticle = (
    particle: Particle,
    context: CanvasRenderingContext2D
  ) => {
    context.beginPath();

    context.moveTo(particle.lastPos.x, particle.lastPos.y);
    context.lineTo(particle.position.x, particle.position.y);

    context.stroke();

    context.closePath();
  };

  const renderParticle = (
    deltatime: number,
    context: CanvasRenderingContext2D
  ) => {
    context.strokeStyle = trailclr;

    worker.postMessage({ screenSize, delta: deltatime });

    particleRef.forEach((particle: Particle) => {
      drawParticle(particle, context);
    });
    return 0;
  };

  createEffect(() => {
    if (canvasContainerRef) {
      screenSize.x = canvasContainerRef.clientWidth;
      screenSize.y = canvasContainerRef.clientHeight;
    }
    // particleRef = [];
    // for (let i = 0; i < props.totalParticle; i++) {
    //   const position: Vec2 = {
    //     x: randRange(-canvasOffset, screenSize.x + canvasOffset),
    //     y: randRange(-canvasOffset, screenSize.y + canvasOffset),
    //   };

    //   particleRef.push(new Particle(position, getDirection(position)));
    // }
  });

  const handleDrawCanvas = (
    delta: number,
    context: CanvasRenderingContext2D
  ) => {
    if (isNotVisible && props.autoStop) {
      return;
    }
    if (shadowTurn) {
      return;
    }
    renderParticle(delta, context);
    shadowTurn = true;
  };

  const handleDrawShadowCanvas = (
    delta: number,
    context: CanvasRenderingContext2D
  ) => {
    if (isNotVisible && props.autoStop) {
      return;
    }

    if (!shadowTurn) {
      return;
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    particleRef.forEach((particle: Particle) => {
      context.fillStyle =
        headclr + particle.velocity / (maxParticleSpeed * 1.5) + ")";

      context.beginPath();
      context.arc(particle.position.x, particle.position.y, 1, 0, Math.PI * 2);
      context.fill();
      context.closePath();
    });

    shadowTurn = false;
  };

  return (
    <div>
      <div class="w-full h-full absolute inset-0" ref={canvasContainerRef}>
        <Canvas2D
          draw={handleDrawCanvas}
          sizeUpdate={(size) => {
            screenSize = size;
          }}
        />
      </div>
      <div class="w-full h-full absolute inset-0" ref={canvasContainerRef}>
        <Canvas2D draw={handleDrawShadowCanvas} />
      </div>
    </div>
  );
};

export default ParticleBackground;
