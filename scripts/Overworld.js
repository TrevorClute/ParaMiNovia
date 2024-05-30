import { Person } from "./Person";
import { utils } from "./utils";
import { DirectionInput } from "./DirectionInput";

import heartURL from "/images/heart.png";
import trevorURL from "/images/trevor.png";
import melanyURL from "/images/melany.png";
import newBeachURL from "/images/new-beach.png";
import shadowURL from "/images/shadow.png";

export class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.melany = null;
    this.trevor = null;
    this.map = new Image();
    this.map.src = newBeachURL;
    this.yes = false;
    this.hearts = [];
  }

  init() {
    this.melany = new Person({
      x: utils.widthGrid(30),
      y: utils.widthGrid(60),
      src: melanyURL,
      direction: "right",
      useShadow: true,
    });

    this.trevor = new Person({
      x: utils.widthGrid(16),
      y: utils.widthGrid(11),
      src: trevorURL,
      direction: "down",
      useShadow: false,
    });

    this.shadow = new Person({
      x: utils.widthGrid(16),
      y: utils.widthGrid(11),
      src: shadowURL,
      direction: "down",
      useShadow: false,
    });

    this.specialButton = document.getElementById("special");

    this.specialButton.addEventListener("click", () => {
      this.cameraPerson = this.trevor;
      this.yes = true;
    });

    this.cameraPerson = this.melany;

    this.directionInput = new DirectionInput(this.melany);
    this.directionInput.init();

    this.startGameLoop();
  }

  startGameLoop() {
    let deltatime = 0;
    let prev = 0;
    let p = 1000 / 60;
    let melanyNext = {
      x: 0,
      y: 0,
    };

    const yesArea = {
      setX: new Set([336, 352]),
      setY: new Set([192, 176]),
    };

    const step = (timestamp) => {
      //time
      deltatime = (timestamp - prev) / p;
      prev = timestamp;
      //state
      this.melany.update({ deltatime: deltatime });
      this.trevor.update({ deltatime: deltatime });
      if (this.yes) {
        if (this.trevor.y > 90) {
          this.trevor.y -= deltatime;
        } else {
          this.hearts.push(
            new Person({
              x: this.trevor.x,
              y: this.trevor.y + 8,
              src: heartURL,
              direction: "down",
              useShadow: false,
            })
          );
          for (let i = 0; i < 1000; i++) {
            this.hearts.push(
              new Person({
                x: this.trevor.x + Math.random() * 600 - 300,
                y: this.trevor.y + Math.random() * 5000,
                src: heartURL,
                direction: "down",
                useShadow: false,
              })
            );
          }
          this.yes = false;
        }
      }

      //check next tile
      const [property, change] =
        this.melany.directionUpdate[this.melany.direction];
      melanyNext.x = this.melany.x;
      melanyNext.y = this.melany.y;
      melanyNext[property] += utils.widthGrid(change);
      //check yes
      if (
        (yesArea.setX.has(Math.round(melanyNext.x)) &&
          yesArea.setY.has(Math.round(melanyNext.y))) ||
        (yesArea.setX.has(Math.round(this.melany.x)) &&
          yesArea.setY.has(Math.round(this.melany.y)))
      ) {
        this.specialButton.hidden = false;
      } else {
        this.specialButton.hidden = true;
      }

      //draw
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(
        this.map,
        utils.widthGrid(6) - this.cameraPerson.x,
        utils.widthGrid(9.5) - this.cameraPerson.y
      );
      this.melany.sprite.draw(this.ctx, this.cameraPerson);
      this.trevor.sprite.draw(this.ctx, this.cameraPerson);
      this.shadow.sprite.draw(this.ctx, this.cameraPerson);
      this.hearts.forEach((heart, i) => {
        if (i !== 0) {
          heart.y -= deltatime * 4;
        }
        heart.sprite.draw(this.ctx, this.cameraPerson);
      });
      requestAnimationFrame(step);
    };
    step();
  }
}
