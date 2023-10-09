import { NoiseFunction2D, createNoise2D } from "simplex-noise";
import { IWebWorkerParameter } from "./WorkerTypes";
import { Particle } from "../Particle";
import { Vec2 } from "../../../Types";
import { randRange } from "../../../Utils";

const noiseFunc: NoiseFunction2D = createNoise2D();
const maxParticleSpeed = 100;
const accelSpeed = 20;
const angleMultiplier = Math.PI * 2;
const posScalar = 0.0005;
const canvasOffset = 100;

const getDirection = (position: Vec2): Vec2 => {
  const scaledDownPos: Vec2 = {
    x: Math.floor(position.x),
    y: Math.floor(position.y),
  };

  const angle: number =
    noiseFunc(scaledDownPos.x * posScalar, scaledDownPos.y * posScalar) *
    angleMultiplier;
  return { x: Math.cos(angle), y: Math.sin(angle) };
};

const TOTALPARTICLE = 500;
let particles: Particle[] = [];
for (let i = 0; i < TOTALPARTICLE; i++) {
  particles.push(
    new Particle({ x: 40000, y: 40000 }, getDirection({ x: 5000, y: 5000 }))
  );
}

onmessage = (e: MessageEvent<IWebWorkerParameter>) => {
  const { screenSize, delta }: IWebWorkerParameter = e.data;
  particles.forEach((particle: Particle) => {
    if (particle.velocity < maxParticleSpeed) {
      particle.accel(delta * accelSpeed);
    }
    particle.affect(getDirection(particle.position));

    particle.update(delta);

    if (
      particle.position.x > screenSize.x + canvasOffset ||
      particle.position.x < -canvasOffset ||
      particle.position.y > screenSize.y + canvasOffset ||
      particle.position.y < -canvasOffset
    ) {
      particle.position.x = randRange(
        -canvasOffset,
        screenSize.x + canvasOffset
      );
      particle.position.y = randRange(
        -canvasOffset,
        screenSize.y + canvasOffset
      );
      particle.lastPos.x = particle.position.x;
      particle.lastPos.y = particle.position.y;
      particle.direction = getDirection(particle.position);
      particle.velocity = 0;
    }
  });

  postMessage(particles);
};
