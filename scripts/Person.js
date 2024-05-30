import { GameObject } from "./GameObject";

export class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movementProgressRemaining = 0;
    this.directionUpdate = {
      down: ["y", 1],
      right: ["x", 1],
      left: ["x", -1],
      up: ["y", -1],
    };
  }

  update(state) {
    this.updatePosition(state.deltatime);
    this.updateSprite(state);
  }

  updatePosition(deltatime) {
    if (this.movementProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      if (this.movementProgressRemaining < deltatime) {
        this[property] += change * this.movementProgressRemaining;
        this.movementProgressRemaining = 0;
      } else {
        this[property] += change * deltatime;
        this.movementProgressRemaining -= deltatime;
      }
    }
  }

  updateSprite(state) {
    if (this.movementProgressRemaining) {
      this.sprite.setAnimation("walk_" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle_" + this.direction);
  }
}
