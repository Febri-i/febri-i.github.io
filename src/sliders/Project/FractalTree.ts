import { Vec2 } from "../../Types";
import { lerp } from "../../Utils";

interface TreeData {
  endPosition: Vec2;
  startPosition: Vec2;
  color?: string | null | undefined;
  size: number;
  childBranch: TreeData[];
}

export class FractalTree {
  constructor(args: {
    totalChildBranch: number;
    presistance: number;
    lengthTreshold: number;
    maxLength: number;
    leafColor: string;
    woodColor: string;
    maxSize: number;
    sizeLoss: number;
    density: number;
    duration: number;
  }) {
    this.density = args.density;
    this.sizeLoss = args.sizeLoss;
    this.maxSize = args.maxSize;
    this.leafColor = args.leafColor;
    this.woodColor = args.woodColor;
    this.lengthTreshold = args.lengthTreshold;
    this.totalChildBranch = args.totalChildBranch;
    this.presistance = args.presistance;
    this.fractalData = this.recursiveCreateTree(
      args.maxLength,
      0,
      { x: 0, y: 0 },
      Math.PI / 2,
      this.totalChildBranch,
      args.maxSize
    );

    this.animationNeedStepUpdate = [this.fractalData];
    this.nextAnimation = [...this.fractalData.childBranch];
    this.animationDuration = args.duration;
    this.animationStepDone = [];
    this.step = 0;
  }

  density: number;
  sizeLoss: number;
  maxSize: number;
  leafColor: string;
  woodColor: string;
  lengthTreshold: number;
  totalChildBranch: number;
  presistance: number;
  fractalData: TreeData;
  stop: boolean = false;

  recursiveCreateTree(
    length: number,
    totalBranch: number,
    parentPosition: Vec2,
    angle: number,
    maxBranch: number,
    size: number
  ) {
    const direction: Vec2 = { x: Math.cos(angle), y: Math.sin(angle) };
    let treeData: TreeData = {
      endPosition: {
        x: parentPosition.x + direction.x * (length + size * this.presistance),
        y: parentPosition.y - direction.y * (length + size * this.presistance),
      },
      startPosition: parentPosition,
      size,
      childBranch: [],
    };

    if (length < this.lengthTreshold) {
      treeData.color = this.leafColor;
      return treeData;
    }
    const anglesize = Math.PI / maxBranch;
    for (let i = 0; i < maxBranch; i++) {
      const newangle =
        (anglesize * i - Math.PI / 2) * this.density +
        (anglesize / 2) * this.density;

      treeData.childBranch.push(
        this.recursiveCreateTree(
          length * this.presistance,
          totalBranch + maxBranch,
          {
            x: parentPosition.x + direction.x * length,
            y: parentPosition.y - direction.y * length,
          },
          angle + newangle,
          maxBranch + 1,
          size * this.sizeLoss
        )
      );
    }

    return treeData;
  }

  animationNeedStepUpdate: TreeData[] = [];
  animationDuration = 0;
  animationStepDone: TreeData[] = [];
  nextAnimation: TreeData[] = [];
  step = 0;

  stepAnimation(delta: number) {
    if (!this.animationNeedStepUpdate[0]) {
      return;
    }
    this.step += delta;
    if (this.step < this.animationDuration) {
      return;
    }
    for (let i = 0; i < this.animationNeedStepUpdate.length; i++) {
      this.animationStepDone.push(this.animationNeedStepUpdate[i]);
    }

    let newNextAnimation = [];
    this.animationNeedStepUpdate = [];
    for (let i = 0; i < this.nextAnimation.length; i++) {
      const { childBranch } = this.nextAnimation[i];
      this.animationNeedStepUpdate.push(this.nextAnimation[i]);
      if (childBranch) {
        for (let k = 0; k < childBranch.length; k++) {
          newNextAnimation.push(childBranch[k]);
        }
      }
    }
    this.nextAnimation = newNextAnimation;
    this.step = 0;
  }

  renderAnimation(context: CanvasRenderingContext2D, offset: Vec2) {
    if (!this.animationNeedStepUpdate[0]) {
      this.stop = true;
    }

    for (let x = 0; x < this.animationStepDone.length; x++) {
      let { startPosition, endPosition, size, color } =
        this.animationStepDone[x];
      context.beginPath();

      context.strokeStyle = color || this.woodColor;
      context.lineWidth = size;
      context.moveTo(startPosition.x + offset.x, startPosition.y + offset.y);
      context.lineTo(endPosition.x + offset.x, endPosition.y + offset.y);
      context.stroke();
      context.closePath();
    }
    const amount = this.step / this.animationDuration;
    for (let x = 0; x < this.animationNeedStepUpdate.length; x++) {
      let { startPosition, endPosition, size, color } =
        this.animationNeedStepUpdate[x];
      const startOffsettedx = startPosition.x + offset.x;
      const startOffsettedy = startPosition.y + offset.y;
      const endOffsettedx = endPosition.x + offset.x;
      const endOffsettedy = endPosition.y + offset.y;

      context.beginPath();
      context.strokeStyle = color || this.woodColor;
      context.lineWidth = lerp(0, size, amount);
      context.moveTo(startOffsettedx, startOffsettedy);
      context.lineTo(
        lerp(startOffsettedx, endOffsettedx, amount),
        lerp(startOffsettedy, endOffsettedy, amount)
      );
      context.stroke();
      context.closePath();
    }
  }
}
