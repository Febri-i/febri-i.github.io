import { Vec2 } from "../../Types";

export class Particle {
  position: Vec2 = { x: 0, y: 0 };
  velocity: number = 0;
  direction: Vec2;
  lastPos: Vec2;
  screenOffset: number = 10;
  constructor(position: Vec2, initDirection: Vec2) {
    this.position = position;
    this.direction = initDirection;
    this.lastPos = { x: position.x, y: position.y };
    this.normalizeDir();
  }

  accel(speed: number) {
    this.velocity += speed;
  }

  affect(direction: Vec2) {
    this.direction.x += direction.x * 0.5;
    this.direction.y += direction.y * 0.5;
    this.normalizeDir();
  }

  normalizeDir() {
    const mag = Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2);
    this.direction.x /= mag;
    this.direction.y /= mag;
  }

  setPosition(position: Vec2) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  update(delta: number) {
    this.lastPos.x = this.position.x;
    this.lastPos.y = this.position.y;
    this.position.x += this.direction.x * this.velocity * delta;
    this.position.y += this.direction.y * this.velocity * delta;
  }
}
