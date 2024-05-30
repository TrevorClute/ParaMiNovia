export class DirectionInput {
  constructor(person) {
    this.person = person;
  }
  init() {
    document.getElementById("left").addEventListener("click", () => {
      if (this.person.movementProgressRemaining > 0) {
        return;
      }
      this.person.direction = "left";
      this.person.movementProgressRemaining = 16;
    });
    document.getElementById("up").addEventListener("click", () => {
      if (this.person.movementProgressRemaining > 0) {
        return;
      }
      this.person.direction = "up";
      this.person.movementProgressRemaining = 16;
    });
    document.getElementById("right").addEventListener("click", () => {
      if (this.person.movementProgressRemaining > 0) {
        return;
      }
      this.person.direction = "right";
      this.person.movementProgressRemaining = 16;
    });
    document.getElementById("down").addEventListener("click", () => {
      if (this.person.movementProgressRemaining > 0) {
        return;
      }
      this.person.direction = "down";
      this.person.movementProgressRemaining = 16;
    });
  }
}
