import { utils } from "./utils";

export class Sprite {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.useShadow = config.useShadow;
    if (this.useShadow) {
      this.shadow = new Image();
      this.shadow.src = "images/shadow.png";
      this.shadow.onload = () => {
        this.shadowIsLoaded = true;
      };
    }

    this.animations = config.animations || {
      idle_down: [[0, 0]],
      walk_down: [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      idle_right: [[0, 1]],
      walk_right: [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      idle_up: [[0, 2]],
      walk_up: [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      idle_left: [[0, 3]],
      walk_left: [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = config.currentAnimation || "idle_down";
    this.currentAnimationFrame = 0;
    this.animationFrameLimit = 4;
    this.animationFrameProgress = this.animationFrameLimit;
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  setAnimation(key) {
    if (key === this.currentAnimation) {
      return;
    }
    this.currentAnimation = key;
    this.currentAnimationFrame = 0;
    this.animationFrameProgress = this.animationFrameLimit;
  }

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + utils.widthGrid(6) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.widthGrid(9.5) - cameraPerson.y;

    this.shadowIsLoaded && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;
    this.updateAnimationProgress();
    this.isLoaded &&
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);
  }
}
